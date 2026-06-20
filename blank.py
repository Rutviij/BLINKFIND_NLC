import requests, json

url = "http://127.0.0.1:4000/api/items"
payload = {
    "name":"TEST ITEM - PY",
    "category":"Other",
    "location":"Test Lab",
    "date_found":"2026-01-25",
    "description":"Created by Python requests for testing",
    "finder_name":"Tester",
    "finder_email":"tester@example.com",
    "image_url": None,
    "image_filename": None,
    "status": "pending"
}

r = requests.post(url, json=payload)
print("Status:", r.status_code)
print(r.text)