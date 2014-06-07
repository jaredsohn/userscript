// ==UserScript==
// @name		Re-Title
// @namespace	http://userscripts.org/people/14536
// @description	Cleans up a webpage's title by removing the name of the site
// @include		*
// @author		Vaughan Chandler
// ==/UserScript==

// Last updates June 8 2007

var matches = {
"^http://(www\.)?answers\.com/": ": information from answers\.com$",
"^https://affiliate-program\.amazon\.com/": " - amazon.com associates central$",
"^http://affiliate-program\.amazon\.com/": "^amazon.com associates: ",
"^http://(www\.)?amazon\.(ca|com|co\.uk)/": "^amazon\.(ca|com|co\.uk): ",
"^http://(www\.)?digg\.com/": "^digg - ",
"^http://([a-z]+\.)?facebook\.com/": "^facebook \\\| ",
"^http://(www\.)?flickr\.com/": "^flickr: |^flickr photo download: | on Flickr - Photo Sharing!$",
"^http://(www\.)?flixster\.com/": "^flixster - ",
"^http://(www\.)?freshmeat\.net/": "^freshmeat\.net: ",
"^http://images\.google(\.[a-z]{1,3}){1,2}/": " - google image search$",
"^http://news\.google(\.[a-z]{1,3}){1,2}/": " - google news$",
"^http://video\.google(\.[a-z]{1,3}){1,2}/": " - google video$",
"^https?://(docs|spreadsheets)\.google\.com/": " - (google )?docs & spreadsheets$",
"^http://(www\.)?google(\.[a-z]{1,3}){1,2}/": " - google search$",
"^http://([a-z]+\.)?linux\.com/": "^linux\.com \\\| ",
"^http://search\.live\.com/": "^live search( (books|feeds|images|news|videos))?: ",
"^http://products\.live\.com/": "^live product search: ",
"^http://localsearch\.live\.com/": "^live search local: ",
"^http://(www\.)?newegg\.com/": "^newegg.com - | at newegg.com$",
"^http://([a-z]+\.)?newsforge\.com/": "^newsforge \\\| ",
"^http://([a-z]+\.)?slashdot\.org/": "^slashdot \\\| ",
"^http://(www\.)?sourceforge\.net/": "^sourceforge\.net: ",
"^http://(www\.)?tigerdirect\.com/": " at tigerdirect\.com$",
"^http://(www\.)?thinkgeek\.com/": "^thinkgeek :: ",
"^http://(www\.)?userscripts\.org/": " [^a-z0-9\s] userscripts\.org$",
"^http://[a-z]+\.wikipedia\.org/": " - wikipedia, the free encyclopedia$",
"^http://([a-z]+\.search|shopping)\.yahoo\.com/": "^yahoo! ((audio|image|news|shopping) )?search results for",
"^http://search\.yahoo\.com/": " - yahoo! search results$",
"^http://answers\.yahoo\.com/": "^yahoo! answers - ",
"^http://(www\.)?youtube\.com/": "^youtube - "
};

for (var url in matches) {
    if (location.href.match(new RegExp(url))) {
        document.title = document.title.replace(new RegExp(matches[url],'i'),'');
        break;
    }
}