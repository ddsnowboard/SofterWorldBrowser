#!/usr/bin/python
from urllib.request import urlopen
import re
from sys import argv, stderr
import json
from html.parser import HTMLParser

class SWParser(HTMLParser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.coming = False
        self.onPrevious = False
        self.link = ''
        self.title = ""
        self.number = -1
    def handle_starttag(self, tag, attrs):
        attrs = {i: j for i, j in attrs if i and j}
        if tag == "div" and attrs.get("id") == "comicimg":
            self.coming = True
        elif tag == "img" and self.coming:
            self.link = attrs.get("src")
            self.title = attrs.get("title")
            self.coming = False
        elif tag == "div" and attrs.get("id") == "previous":
            self.onPrevious = True
        elif tag == "a" and self.onPrevious:
            # By finding the link to the previous comic and adding 1, we can find out 
            # what number the current comic is.
            regex = re.compile(r"index[.]php[?]id=(?P<number>[0-9]+)")
            self.number = int(regex.search(attrs.get("href")).group("number")) + 1
            self.onPrevious = False

def parse(url):
    parser = SWParser()
    f = urlopen(url)
    text = f.read().decode("UTF-8", "ignore")
    parser.feed(text)
    return parser

if __name__ == "__main__":
    parser = parse(argv[1])
    if parser.link:
        output = {}
        output["url"] = parser.link
        output["number"] = parser.number
        output["title"] = parser.title
        print(json.dumps(output, ensure_ascii=True))
    else:
        print(json.dumps({"error": "Something bad happened. Don't know what"}))
