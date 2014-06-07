// ==UserScript==
// @name           baka-updates.com plus animenfo.com = heaven
// @namespace      baka-nfo
// @description    Clicking on a title in the releases page of baka-updates.com leads to the description on the animenfo.com site.
// @include        http://baka-updates.com/*
// @include        http://www.baka-updates.com/*
// ==/UserScript==

// ChangeLog
// 9/28/07: added smartsearch, has a better chance of searching
// 9/28/07: strips exclaimation points which can confuse the search
// 9/28/07: added a link in that lets you view the series list, and search with "NFO" link
// 9/30/07: remove 'TV' from the search keywords to improve search results
// 10/3/07: remove '(DVD)' from search to improve results
// 10/7/07: added alternate website include to handle 'www'
// 10/7/07: remove 'no', 'ni', 'the', 'densetsu' from search, too common
// 10/12/07: removed 'to', 'sama', 'kun' from search, too common... added spacing
// 10/13/07: removed 'animation' from search, too commmon
// 10/14/07: fixed Mushiuta and MAR Heaven and removed 'futari', and 'wa', too common
// 10/16/07: removed 'OVA', 'wo', too common.. 'to' removal now case insensitive
// 10/18/07: removed numbers 0-9, they confused the search engine
// 10/19/07: now keeps the page on the NFO you clicked when refreshed, search.php now supported
// 10/21/07: now stays on the title NFO you clicked properly, lines are now numbered
// 10/25/07: fixed Ranma 1/2
// 10/25/07: NFO labels now pop up after performing a typed Search on the site
// 10/26/07: resolved the window.find issue, page now post-processes after rendering properly
// 01/18/09: corrected to work with new website layout, simplified code, removed cookie handling

var loc;
var animenfo;
var selflink;
var links;
var td;
var givenName;

function correctName(ani) {
        ani = ani.replace('!', '');
        ani = ani.replace('TV', '');
        ani = ani.replace('(DVD)', '');
        ani = ani.replace(/%20no/g, '');
        ani = ani.replace(/%20ni/g, '');
        ani = ani.replace(/the%20/gi, '');
        ani = ani.replace(/densetsu/gi, '');
        ani = ani.replace(/%20to/gi, '');
        ani = ani.replace(/-sama/g, '');
        ani = ani.replace(/-kun/g, '');
        ani = ani.replace(/animation/gi, '');
        ani = ani.replace(/mushiuta/gi, 'mushi uta');
        ani = ani.replace(/futari/gi, '');
        ani = ani.replace(/%20wa/g, '');
        ani = ani.replace('Marchen%20Awakens%20Romance', 'MAR Heaven');
        ani = ani.replace('OVA', '');
        ani = ani.replace(/%20wo/g, '');
        ani = ani.replace('/', '');
        ani = ani.replace(/%20[\d]+/g, '');
        ani = ani.replace('OverDrive', 'Over Drive');
        ani = ani.replace(/season/gi, '');
        ani = ani.replace(/kimi%20e/gi, '');
        return ani;
}

// post process the page after rendering
window.addEventListener(
    'load', 
    function() {
        // set up globals
        loc = decodeURI(window.location);
        animenfo = "http://www.animenfo.com/search.php?query=%s&queryin=anime_titles&option=smart";
        selflink = "http://baka-updates.com/search?searchitem=%s&submit.y=0&submit=submit&searchradio=releases";
        links = document.getElementsByTagName('a');
        td = document.getElementsByTagName('td');

  if (loc.indexOf('search') >= 0) {

        var nname = "";
    if (loc.indexOf('=') < 0) {
        if (loc.indexOf('/title/') >= 0) {
            var npos = loc.indexOf("/title/");
            nname = loc.substr(npos + "/title/".length);
        }
    } else {
        nname = loc.substr(loc.indexOf("=")+1);
        nname = nname.substr(0, nname.indexOf("&"));
    }

    nname = correctName(nname);

        var url = (animenfo.replace(/%s/, nname))

        for(var k = 0; k < td.length; k++) {

            if (td[k].innerHTML.indexOf('script') < 0 &&
                  td[k].innerHTML.indexOf('<a') < 0 &&
                   td[k].innerHTML.indexOf('<input') < 0 &&
                    td[k].innerHTML.toLowerCase().indexOf(nname.toLowerCase()) >= 0) {

                    td[k].innerHTML = td[k].innerHTML + "<a href=\"" +
                      url + "\" target=\"_blank\">  <small>[NFO]</small></a>";
            }
        }

    } else {
       var linkCount = 0;

       for (var i = 0; i < links.length; i++) {
          var href = links[i].href;

          // only alter the anime title links
          if (href.indexOf("/title/") > 0) {

             // finds the name of the anime
             var npos = href.indexOf("/title/");
             var anime = href.substr(npos + "/title/".length);

             anime = correctName(anime);

             var link = document.createElement('a');
                 link.href=    (animenfo.replace(/%s/, anime));
                 link.title=   "search animenfo";
                 link.target=  "_blank"; // launches in a new tab

             // normal size was causing flash ad to overlap the list
             link.style['fontSize'] = '0.9em';

             link.appendChild( document.createTextNode('' + (++linkCount) + ') NFO | ') );

             // let's put the NFO link in front of the release title's link
             links[i].insertBefore(link, links[i].firstChild);
          }
       }


    }

    },
    true);