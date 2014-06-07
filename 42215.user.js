// ==UserScript==
// @name           baka-updates.com and animenewsnetwork.com = win
// @namespace      baka-nfo
// @description    Clicking on a title in the releases page of baka-updates.com leads to the description on the 

animenewsnetwork.com site.
// @include        http://*.baka-updates.com/*
// @include        http://baka-updates.com/*
// ==/UserScript==

// ChangeLog
// 2/10/09: reimplemented script for use with animenewsnetwork.com
// 6/22/09: fixed includes

var loc;
var site;
var selflink;
var links;
var td;
var givenName;

// post process the page after rendering
window.addEventListener(
    'load', 
    function() {
        // set up globals
        loc = decodeURI(window.location);
        site = "http://www.animenewsnetwork.com/search?q=%s&type=all";
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

        var url = (site.replace(/%s/, nname))

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

             var link = document.createElement('a');
                 link.href=    (site.replace(/%s/, anime));
                 link.title=   "search animenewsnetwork";
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