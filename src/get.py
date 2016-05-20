#!/usr/bin/python
from urllib2 import urlopen
import re
from sys import argv, stderr
import json
import HTMLParser
class SWParser(HTMLParser.HTMLParser):
    def __init__(self, *args, **kwargs):
        HTMLParser.HTMLParser.__init__(self, *args, **kwargs)
        self.coming = False
        self.onPrevious = False
        self.link = ''
        self.title = ""
        self.number = -1
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        attrs = {i.encode("ascii", "ignore"): j.encode("ascii", "ignore") for i, j in attrs.iteritems()}
        if tag == "div" and attrs.get("id") == "comicimg":
            self.coming = True
        elif tag == "img" and self.coming:
            self.link = attrs.get("src")
            self.title = attrs.get("title")
            self.coming = False
        elif tag == "div" and attrs.get("id") == "previous":
            self.onPrevious = True
        elif tag == "a" and self.onPrevious:
            regex = re.compile(r"index[.]php[?]id=(?P<number>[0-9]+)")
            print >> stderr, "attrs is %s" % attrs
            self.number = int(regex.search(attrs.get("href")).group("number")) + 1
            self.onPrevious = False
parser = SWParser()
f = urlopen(argv[1])
parser.feed(f.read().decode("UTF-8", "ignore"))
if parser.link:
    output = {}
    output["url"] = parser.link
    output["number"] = parser.number
    output["title"] = parser.title
    print json.dumps(output, ensure_ascii=True)
else:
    print json.dumps({"error": "Something bad happened. Don't know what"})