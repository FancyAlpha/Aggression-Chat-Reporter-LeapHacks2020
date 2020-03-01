import requests
import json
from classify_one_comment import classify

URL = "http://aggression-detector.herokuapp.com/comments"

reqs = json.loads(requests.get(URL).content)


for r in reqs:
    print(r)

for r in reqs:
    if not r['processed']:
        tags, severity = classify(r['message'])
        if severity > 0:
            post = requests.post(URL, json={'userName': r['userName'], 'message': r['message'], 'channel': r['channel'],
                                            "processed": 0, 'tags': tags, 'severity': severity})