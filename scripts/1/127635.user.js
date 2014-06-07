// ==UserScript==
// @name           Newgrounds News Section
// @namespace      allnews@snakehole.net
// @description    Restores the News section on user pages
// @include        http://*.newgrounds.com/*
// @exclude        http://www.newgrounds.com/*
// @exclude        *ads.newgrounds.com/*
// ==/UserScript==
function NGNS_addNewsSection()
{
    var newsLink = document.createElement('a');
    newsLink.textContent = 'News';
    var referenceElement = document.querySelector('.podtop > div > a');
    var regex = '^http:\/\/.*\.newgrounds\.com\/news\/$|^.*\.newgrounds\.com\/news\/$';
    var regexWS = /^[\s]*$/gi;
    var re = new RegExp(regex);
    var m = re.exec(document.location.href);
    document.querySelector('.podtop > div').insertBefore(newsLink, referenceElement.nextSibling)
    if(m == null)
    {
      newsLink.setAttribute('href','/news/');
    }
    else if (document.querySelector('#main .fatcol').innerHTML.match(regexWS))
    {
      document.querySelector('#main .fatcol').innerHTML = '<div class="two3"><div class="podcontent"><p class="emptymessage"><span style="text-transform: capitalize;">' + document.getElementById('page_username').textContent + '</span> hasn\'t posted any news yet.</p></div><div class="podbot"></div></div>';
      document.getElementById('main').innerHTML += '<br style="clear: both">';
      document.getElementById('outer').innerHTML += NGNS_footer;
    }
}

// footer

var NGNS_footer = '<div id="footer" style="height:400px">' + 
'        <div class="siteinfo">' + 
'            <div class="copyright">' + 
'                <p><strong>© Copyright 1995-2012 Newgrounds, Inc. All rights reserved. <a href="http://www.newgrounds.com/wiki/help-information/privacy-policy">Privacy Policy</a> | <a href="http://www.newgrounds.com/wiki/help-information/terms-of-use">Terms of Use</a></strong></p>' + 
'                <p>newgrounds.com — Your #1 online entertainment &amp; artist community! All your base are belong to us.</p>' + 
'            </div>' + 
'            <div class="navigation">' + 
'                <dl>' + 
'                    <dt>Main Sections</dt>' + 
'                    <dd><a href="http://www.newgrounds.com/games"><span>Games</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/movies"><span>Movies</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/art"><span>Art</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/audio"><span>Audio</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/store"><span>Store</span></a></dd>' + 
'                </dl>' + 
'                <dl>' + 
'                    <dt>Extra, Extra!</dt>' + 
'                    <dd><a href="http://www.newgrounds.com/collection/series"><span>Series</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/collection"><span>Collections</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/games/under_judgment"><span>Game Judging</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/movies/under_judgment"><span>Movie Judging</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/portal"><span>Classic Portal</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/downloads"><span>Downloads</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki/creator-resources"><span>Creator Resources</span></a></dd>' + 
'                </dl>' + 
'                <dl>' + 
'                    <dt>Community</dt>' + 
'                    <dd><a href="http://www.newgrounds.com/bbs"><span>Forums</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/calendar"><span>Calendar</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/news/artists"><span>Artist News</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/rankings"><span>Rankings</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki"><span>NG Wiki</span></a></dd>' + 
'                </dl>' + 
'                <dl>' + 
'                    <dt>NG Related</dt>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki/about-newgrounds"><span>About NG</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki/help-information"><span>Site Help</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki/about-newgrounds/staff"><span>The Staff</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki/about-newgrounds/history"><span>NG History</span></a></dd>' + 
'                    <dd><a href="http://www.newgrounds.com/wiki/help-information/rss"><span>RSS</span></a></dd>' + 
'                </dl>' + 
'            </div>' + 
'        </div>' + 
'    </div>';

NGNS_addNewsSection();