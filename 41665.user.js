// ==UserScript==
// @name           better epguides
// @namespace      better epguides
// @description    improves usability of epguides.com
// @include        http://epguides.com/*
// @include        http://www.epguides.com/*
// @version        0.21
// ==/UserScript==

footer = '<h4><a href="http://userscripts.org/scripts/show/41665">better epguides</a> greasemonkey script v0.21</h4>';

GM_addStyle('\
html, body { \
    margin:  0px; \
    padding: 0px; \
    background-color: #000; \
    color: #eef; \
    text-align: center; \
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAIAAAC1JZyVAAAAq0lEQVRIib3XywqAIBCF4bEIfP+nDSJoE5iiOZdznLXw4Wr+SfuRRT33deoff2dbYOxH1jIRQ5S/CRoqJm7MGYgxYVDGHwM0hgzW6DNwo8MwjJYhGRXDMwpDNV6GbYhI8gEmw89Yt5SHcWxCM+PbtjbGvdENTKQatEywTFRMvH7mDKSwJgyq4v4YYCkOGWyN9hl48XYYRlW3DKncK4Z3HRSGeoGkBcbLLLikHvUfY0H8023/AAAAAElFTkSuQmCC"); \
} \
body.center #container { \
    text-align: center !important; \
} \
#container { \
    margin: auto !important; \
    border-color: #09192a; \
    border-style: solid; \
    border-width: 0px 3px 3px 3px; \
    max-width: 1000px; \
    margin:  0px; \
    padding: 0.5em; \
    background-color: #012; \
    text-align: left; \
    position: relative; \
} \
#blurb { \
    display: none; \
} \
a { \
    font-weight: bold; \
    text-decoration: none; \
    color: #99f; \
} \
a:hover { \
    text-decoration: none; \
    color: #ffa; \
} \
#topnavbar, #botnavbar, #header, #footer, #homenote, #notes, #credits p, .AlexaSiteStatsWidget, \
#disclaimer, #terms, #copyright, #amazon, .prodnum, hr, h2, table, .epnum, p { \
    display: none !important; \
} \
h3 { \
    margin-left: 0em; \
} \
#title { \
    text-decoration: underline; \
} \
label { \
    color: #88a; \
} \
input { \
    border: 1px solid white; \
    margin-bottom: 1.5em; \
    background-color: #cce; \
    color: #012; \
} \
input.button:hover { \
    background-color: #012; \
    color: #eef; \
} \
img.castpic { \
    position: absolute; \
    top: 0; \
    right: 0; \
    width: 300px; \
    border-top: 0px; \
    border-right: 0px; \
    border-left: 20px solid #09192a; \
    border-bottom: 20px solid #09192a; \
} \
#summary { \
    padding-bottom: 10px; \
    border-bottom: 20px solid #08192a; \
} \
h3.season { \
    border-left: 25px solid #08192a; \
    padding-left: 40px; \
    margin-top: 2em; \
    width: 100px; \
    border-right: 250px solid #08192a; \
} \
h3.cast { \
    border-right: 25px solid #08192a; \
    width: 100px; \
    padding-left: 20px; \
    border-left: 150px solid #08192a; \
} \
tr.cast { \
    background-color: #08192a; \
    font-weight: bold; \
    font-size: 1.17em; \
    text-align: center; \
} \
ul { \
    list-style: none; \
    padding: 0px; \
    margin: 0px; \
    text-indent: 0px; \
} \
#eplist { \
    max-width: 640px; \
} \
#credits { \
    position: absolute; \
    top: 300px; \
    right: 0.5em; \
    white-space: nowrap; \
    text-align: right; \
} \
#credits table { \
    max-width: 300px; \
    display: table !important; \
} \
#credits a { \
    margin-right: 1em; \
} \
#credits ul { \
    display: block; \
    border-left: 2px solid #eef; \
} \
#credits li { \
    display: none; \
} \
#credits td { \
    white-space: nowrap; \
} \
#newNav { \
    margin-bottom: 0px; \
    margin-top: -10px; \
} \
.epcode, #newNav a { \
    background-color: #09192a; \
    display: block; \
    float: left; \
    margin-right: 1em; \
} \
li.special .epcode { \
    visibility: hidden; \
} \
.epcode { \
    width: 25px; \
} \
#newNav a:hover { \
    background-color: #ffa; \
    color: #09192a; \
} \
span.airdate { \
    display: block; \
    width: 125px; \
    float: left; \
    font-family: monospace; \
} \
span.past { \
    color: #8f8 !important; \
} \
span.future { \
    color: #f66 !important; \
} \
body.center form { \
    margin: auto; \
} \
form { \
    width: 670px; \
    height: 97px; \
    background-image: url("data:image/png;base64,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"); \
}\
input { \
    margin-top: 37px; \
}\
input.text { \
    margin-left: 280px; \
} \
label { \
    display: none; \
}\
');

// this search form replaces the normal search with google's "I'm feeling lucky" :)
searchForm = '\
<form action="http://www.google.com/search" method="get"> \
    <input type="hidden" name="hl" value="en" /> \
    <input type="hidden" name="q" value="allintitle:" /> \
    <input type="hidden" name="q" value="site:epguides.com" /> \
    <label for="q"><em>epguides.com</em> search:</label> \
    <input class="text" type="text" name="q" value="" size="40" /> \
    <input class="button" type="submit" name="btnI" value="search" /> \
</form> \
';

siteLogo = '<h1>- epguides.com -</h1>';

body = document.getElementsByTagName('body')[0];

// replace the 404-page and the main (splash) page
if (body.innerHTML.match(/Page\ cannot\ be\ found/i) || body.className == 'center')
{
    body.className = 'center';
    body.innerHTML = '<div id="container">' + siteLogo + '' + searchForm + '</div>' + footer;
    return;
}

// the rest of the code is devoted to changing the actual listing pages:

// wrap everything in a nice container DIV
body.innerHTML = '<div id="container">' + body.innerHTML + '</div>';

// redirect search to "I'm feeling lucky"
body.innerHTML = body.innerHTML.replace(/btnG/, 'btnI');

// convert credits list into a table
credits = document.getElementById('credits');
credits.innerHTML = credits.innerHTML.replace(/<ul>/g,'<table><tr class="cast"><td colspan="2">Cast</td></tr>');
credits.innerHTML = credits.innerHTML.replace(/<\/ul>/g,'</table>');
credits.innerHTML = credits.innerHTML.replace(/<li>/g,'<tr><td>');
credits.innerHTML = credits.innerHTML.replace(/<\/li>/g,'</td></tr>');
credits.innerHTML = credits.innerHTML.replace(/\ as\ /g,'</td><td>');
// remove season indicator on cast credits
credits.innerHTML = credits.innerHTML.replace(/\s\[.*\]/g,'');

// extract show summary
var summary='';
tmp = credits.getElementsByTagName('p');
if (tmp[0]!=undefined)
{
    summary = tmp[0].innerHTML;
}

// extract show title
tmp = document.getElementsByTagName('h1');
tmp = tmp[0].getElementsByTagName('a');
title = tmp[0].innerHTML;

// extract URL to IMDB page
imdbURL = tmp[0].href;

// construct URLs for links to other sites
wikipediaURL = "http://en.wikipedia.org/wiki/" + title;
// torrent sites often don't do well with punctuation, so these get theirs stripped:
isohuntURL = "http://isohunt.com/torrents/?ihq=" + title.replace(/[^a-zA-Z0-9\s]/g,"");
btjunkieURL = "http://btjunkie.org/search?f=1&q=" + title.replace(/[^a-zA-Z0-9\s]/g,"");

eplist = document.getElementById('eplist');
// replace PRE tag with UL
eplist.innerHTML = eplist.innerHTML.replace(/<(\/?)pre>/g,'<$1ul>');
// make Season lines into headings
eplist.innerHTML = eplist.innerHTML.replace(/Season\s(\d+)/g,'<div class="season"><a name="season_$1"></a><h3 class="season">Season $1</h3><span class="season"></span></div>');
// remove underscore "lines"
eplist.innerHTML = eplist.innerHTML.replace(/\s_+\s/g,'');
eplist.innerHTML = eplist.innerHTML.replace(/\s*Original\s*/,'');
// stop links opening in new windows
eplist.innerHTML = eplist.innerHTML.replace(/target=\"_blank\"/g, '');
// remove the "Prod #" column 
eplist.innerHTML = eplist.innerHTML.replace(/.{12}(.{12})<a/g,'$1<a');
//eplist.innerHTML = eplist.innerHTML.replace(/\/span>\s.+\s<span\ class=\"air/g,'');
// tag the epidode-number column 
eplist.innerHTML = eplist.innerHTML.replace(/\s(\d+\.|Pilot|Special)\s/g,'<li><span class="epnum">$1</span>');
// wrap lines in LI tags
eplist.innerHTML = eplist.innerHTML.replace(/a>/g,'a></li>');
// tag the airdate column 
eplist.innerHTML = eplist.innerHTML.replace(/\s(\d+)\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d+)\s/g,'<span class="airdate">$1 $2 $3</span>');
// tag the epidode-code column 
eplist.innerHTML = eplist.innerHTML.replace(/\s([^\s]+-\s*)(\d+)\s/g,'<span class="epcode">$2</span>');
// add missing airdate columns
eplist.innerHTML = eplist.innerHTML.replace(/"epcode">(\d*)<\/span>\s*<a/g,'"epcode">$1</span><span class="airdate">-- --- --</span><a');
// replace the header with the show's title 
eplist.innerHTML = eplist.innerHTML.replace(/.*_{10}/,'<h3 id="title">' + title + '</h3><span id="blurb">' + summary + '</span><br /><div id="newNav"></div><br /><ul>');
//eplist.innerHTML = eplist.innerHTML.replace(/\s$/,'</ul>');

// flag entire lines that are for "specials"
eplist.innerHTML = eplist.innerHTML.replace(/<li>(.*<\/li>)/ig,'<li class="normal">$1');
eplist.innerHTML = eplist.innerHTML.replace(/<li>/g,'<li class="special">');

// remove more dross
eplist.innerHTML = eplist.innerHTML.replace(/\(unaired\)/g, '');

// put a new copy of the picture in, under CSS control
castpic = document.createElement('img');
castpic.src = 'cast.jpg';
castpic.className = 'castpic';
header = document.getElementById('header');
header.parentNode.insertBefore(castpic, header);

// parse all the episode data
today = new Date().getTime();
spans = eplist.getElementsByTagName('span');
for (i = 0; i < spans.length; i++)
{
    tmp = spans[i].innerHTML

    // check to see if an episode has already aired or not
    if (spans[i].className == 'airdate')
    {
        airdate = Date.parse(tmp);
        // kludge for 2-digit years
        if (!airdate)
        {
            year = tmp.substr(-2);
            tmp = tmp.substr(0, tmp.length - 2);
            if (year > 30)
            {
                tmp += '19' + year;
            }                
            else
            {
                tmp += '20' + year;
            }
            airdate = Date.parse(tmp);
        }
        if (airdate > today)
        {
            spans[i].className += ' future';
        }
        else
        {
            spans[i].className += ' past';
        }
        // left-pad it for neatness if day < 10
        if (tmp.length == 8 || tmp.length == 10)
        {
            spans[i].innerHTML = '&nbsp;' + spans[i].innerHTML;
        }
    }
    // remove .s from epnums (currently not displayed anyway)
    else if (spans[i].className == 'epnum')
    {
        spans[i].innerHTML = tmp.replace(/\./, '');
    }
    // check in case we've mistakenly got an extra epcode
    else if (spans[i].className == 'epcode')
    {
        if (tmp.length > 2) // no more than 99 episodes in a series, surely? :)
        {
            spans[i].className = 'prodnum';
        }
    }
}

// remove duplicate season subsection headings
seasonNav = '';
seasonCount = 0;
divs = eplist.getElementsByTagName('div');
lastSeason = '';
for (i = 0; i < divs.length; i++)
{
    if (divs[i].className == 'season')
    {
        if (divs[i].innerHTML == lastSeason)
        {
            divs[i].style.display = 'none';
        }
        else
        {
            seasonCount++;
            seasonNav += '<a class="epcode" href="#season_' + seasonCount + '">' + seasonCount + '</a>';
        }
       lastSeason = divs[i].innerHTML;
    }
}

// construct and insert search bar
searchNav = document.createElement('div');
searchNav.innerHTML = searchForm;
header.parentNode.insertBefore(searchNav, header);

// construct and insert navigation bar
seasonNav += '\
<a href="' + imdbURL + '">imdb</a> \
<a href="' + wikipediaURL + '">wikipedia</a> \
<a href="' + isohuntURL + '">isohunt</a> \
<a href="' + btjunkieURL + '">btjunkie</a> \
';
// one at the top...
document.getElementById('newNav').innerHTML = seasonNav;
// and one at the bottom
eplist.innerHTML += '<br /><br />' + seasonNav;
body.innerHTML += footer;