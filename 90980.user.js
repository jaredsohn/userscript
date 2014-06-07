// ==UserScript==
// @name          Kleverig Convert Names to Links
// @namespace     http://www.userscripts.org
// @description   Converts names in wiki format into links to popular engines.
// @include       http://www.kleverig.nl/showthread.php?*
// ==/UserScript==

function generateBinSearch(search, link_section) {
    link = "<a href='http://www.binsearch.info/?q=" + escape(search) + "&max=100&adv_age=900&server='>";
    if (link_section) return link + "Binsearch: " + search + "</a><br />";
    else return link + search + "</a>";
}

function generateNZBIndex(search, link_section) {
    link = "<a href='http://nzbindex.nl/search/?q=" + escape(search) + "&age=&max=25&sort=agedesc&minsize=&maxsize=&dq=&poster=&nfo=&hidespam=0&hidespam=1&more=0'>";
    if (link_section) return link + "NZBIndex: " + search + "</a><br />";
    else return link + search + "</a>";
}

function generateNZBClub(search, link_section) {
    link = "<a href='http://www.nzbclub.com/nzbsearch.aspx?ss=" + escape(search) + "&rpp=25&rs=1&sa=1'>";
    if (link_section) return link + "NZBClub: " + search + "</a><br />";
    else return link + search + "</a>";
}

function generateYabsearch(search, link_section) {
    link = "<a href='https://www.yabsearch.nl/search/" + escape(search) + "'>";
    if (link_section) return link + "Yabsearch: " + search + "</a><br />";
    else return link + search + "</a>";
}

//GM_setValue('default_engine', 'nzbindex');

name = document.evaluate('//td[@class="alt2"][@style="border: 1px inset;"]/div[@style="font-style: italic;"]', document,  null, XPathResult.ANY_TYPE, null);

try {
    var thisNode = name.iterateNext();
    links_found = false;
    while (thisNode) {
        working_string = thisNode.innerHTML.trim();
        if (working_string.search("images/misc/unlocked.gif") != -1) {

            links = working_string.match(/\[(\s*?.*?)*?\]/g);
            if (links.length > 0) links_found = true;

            while(true) {
                if (working_string.search(/\[(\s*?.*?)*?\]/) == -1) break;

                temp = "";
                for(i in links) {
                    temp = links[i].toString();
                    temp = temp.replace("[", "");
                    temp = temp.replace("]", "");
                    if (GM_getValue('default_engine') == "nzbindex") {
                        working_string = working_string.replace(/\[(\s*?.*?)*?\]/, generateNZBIndex(temp, false));
                    } else if (GM_getValue('default_engine') == "binsearch") {
                        working_string = working_string.replace(/\[(\s*?.*?)*?\]/, generateBinSearch(temp, false));
                    } else if (GM_getValue('default_engine') == "nzbclub") {
                        working_string = working_string.replace(/\[(\s*?.*?)*?\]/, generateNZBClub(temp, false));
                    } else if (GM_getValue('default_engine') == "yabsearch") {
                        working_string = working_string.replace(/\[(\s*?.*?)*?\]/, generateYabsearch(temp, false));
                    } else {
                        GM_setValue('default_engine', 'nzbindex');
                        working_string = working_string.replace(/\[(\s*?.*?)*?\]/, generateNZBIndex(temp, false));
                    }
                }
            }

            if (links_found) {
                working_string += "<br />";
                working_string += "<b>Search Engines</b><br>";
                temp = "";
                for(i in links) {
                    temp = links[i].toString();
                    temp = temp.replace("[", "");
                    temp = temp.replace("]", "");
                    working_string += generateBinSearch(temp, true);
                    working_string += generateNZBIndex(temp, true);
                    working_string += generateNZBClub(temp, true);
                    working_string += generateYabsearch(temp, true);
                    working_string += "<br />";
                }
            }

            thisNode.innerHTML = working_string;
        }
        thisNode = name.iterateNext();
    }
}
catch (e) {
    dump( 'Error: Document tree modified during iteration ' + e );
}
