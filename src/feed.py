from get import parse
import random
from datetime import date, timedelta
max_id = parse("http://www.asofterworld.com/").number
n_days = 10

def item_for_day(day):
    r = random.Random((day - date(1970, 1, 1)).days)
    idx = r.randint(1, max_id)
    url = "http://www.asofterworld.com/index.php?id={}".format(idx)
    parser = parse(url)
    return """
<item>
			<title>{idx}</title>
			<description><![CDATA[<a href="http://softerworld.casualvegetables.duckdns.org/?comic={idx}">
					<img src="{url}" />				</a> <br />
                                        {title}
					]]>
			</description>
			<link>https://www.asofterworld.com/index.php?id={idx}</link>
			<guid>{idx}</guid>
		</item>
    """.format(title=parser.title, idx=idx, url=parser.link)

items = [item_for_day(date.today() - timedelta(days=n_days_before)) for n_days_before in range(n_days)]

print("""
<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>A Softer World</title>
		<link>http://softerworld.casualvegetables.duckdns.org/</link>
		<description>A Softer World Comic</description>
		<language>en-us</language>
        {}
	</channel>
</rss>
""".format("\n".join(items)))
