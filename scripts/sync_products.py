import csv, json, os, urllib.request
from datetime import datetime

SHEET_CSV_URL = os.environ.get("SHEET_CSV_URL", "").strip()
OUT_JSON = "data/products.json"

def fetch_csv(url: str) -> list[dict]:
    with urllib.request.urlopen(url) as r:
        text = r.read().decode("utf-8", errors="ignore")
    rows = list(csv.DictReader(text.splitlines()))
    # 清理：去空 id、active 轉 int、price 轉 float
    out = []
    for row in rows:
        if not row.get("id"):
            continue
        row["active"] = int(row.get("active", "1") or "1")
        row["price"] = float(row.get("price", "0") or "0")
        out.append(row)
    return out

def main():
    if not SHEET_CSV_URL:
        raise SystemExit("Missing SHEET_CSV_URL")

    products = fetch_csv(SHEET_CSV_URL)

    payload = {
        "updated_at": datetime.utcnow().isoformat() + "Z",
        "products": products
    }

    os.makedirs("data", exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"✅ wrote {OUT_JSON} with {len(products)} items")

if __name__ == "__main__":
    main()
