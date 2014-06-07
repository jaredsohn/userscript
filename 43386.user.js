// ==UserScript==
// @name           better isohunt
// @namespace      better isohunt
// @include        http://isohunt.com/
// @include        http://isohunt.com/torrents/*
// @include        http://www.isohunt.com/
// @include        http://www.isohunt.com/torrents/*
// ==/UserScript==

// linkback to userscripts homepage - remove it if you hate it, it's just there so people can easily update
// because I haven't written/borrowed an autoupdate function yet and don't know if I will
footer = '<h4><a href="http://userscripts.org/scripts/show/43386">better isohunt</a> greasemonkey script v0.1</h4>';

// if we're being called by ajax, just dive out now
if (document.location.href.indexOf('nofollow') > 0)
{
    return;
}


// the ordering of some of these styles is important
GM_addStyle('\
html, body { \
    margin:  0px; \
    padding: 0px; \
    background-color: #000; \
    color: #eef; \
    text-align: center; \
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAIAAAC1JZyVAAAAq0lEQVRIib3XywqAIBCF4bEIfP+nDSJoE5iiOZdznLXw4Wr+SfuRRT33deoff2dbYOxH1jIRQ5S/CRoqJm7MGYgxYVDGHwM0hgzW6DNwo8MwjJYhGRXDMwpDNV6GbYhI8gEmw89Yt5SHcWxCM+PbtjbGvdENTKQatEywTFRMvH7mDKSwJgyq4v4YYCkOGWyN9hl48XYYRlW3DKncK4Z3HRSGeoGkBcbLLLikHvUfY0H8023/AAAAAElFTkSuQmCC"); \
} \
#container, .bodyline { \
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
a { \
    font-weight: bold; \
    text-decoration: none; \
    color: #99f; \
} \
a:hover { \
    text-decoration: none; \
    color: #ffa; \
} \
a img, p, #textAd, .topBar, .gensmall, iframe, i, br, #ihaTorrents, #ihDisclaimer, td:first-child, th:first-child { \
    display: none; \
} \
table { \
    background-color: #cad9ea; \
    width: 100%; \
} \
tr.odd, tr.odd td { \
    background-color: #bbb; \
    border-top: 2px solid #bbb; \
    border-bottom: 2px solid #bbb; \
} \
tr.even, tr.even td { \
    background-color: #ddd; \
    border-top: 2px solid #ddd; \
    border-bottom: 2px solid #ddd; \
} \
tr:hover, tr:hover td { \
    background-color: #09192a !important; \
    border-top: 2px solid yellow; \
    border-bottom: 2px solid yellow; \
    color: #ffa; \
    cursor: pointer; \
} \
tr:hover, tr:hover a { \
    color: #ffa; \
} \
th { \
    border-bottom: 2px solid black; \
} \
th:hover { \
    background-color: #069 !important; \
} \
td { \
    padding: 2px 2px 2px 5px; \
} \
#logo { \
    float: left; \
} \
#serps { \
    border: 2px solid red !important; \
    clear: both; \
} \
#header { \
    background-color: #036; \
    width: 100%; \
    margin-bottom: 4px; \
    padding: 10px 0px 0px 0px; \
    height: 60px; \
} \
form { \
    margin: 1px 0px 0px 20px; \
    background-repeat: no-repeat; \
    background-image: url(/img/logo.gif); \
    padding: 15px 0px 0px 215px; \
    height: 45px; \
    display: block; \
} \
div.splash_page { \
    margin: 1px 0px 0px 0px !important; \
} \
input { \
    border: 1px solid white; \
    margin-bottom: 1.5em; \
    background-color: #cce; \
    color: #012; \
} \
input.mainoption:hover { \
    background-color: #012; \
    color: #eef; \
} \
#status { \
    float:right; \
    margin: 18px 90px 0px 0px; \
    font-weight: bold; \
    font-size: medium; \
    color: #f05; \
} \
#spinner { \
    float:right; \
    margin: 0px; \
    margin-top: -8px; \
    margin-right: 2px; \
} \
td { \
    white-space: nowrap; \
    font-family: monospace; \
} \
th:first-child { \
    width: 150px; \
} \
th { \
    border-right: 2px solid black; \
} \
th:last-child { \
    width: 30px; \
    border-right: 0px; \
} \
.bottom_nav { \
    border-top: 2px solid black !important; \
} \
.odd span.dim { \
    color: #bbb !important; \
} \
.even span.dim { \
    color: #ddd !important; \
} \
.odd span.ext { \
    color: #666 !important; \
} \
.even span.ext { \
    color: #666 !important; \
} \
.pager { \
    display: block !important; \
    width: 100% !important; \
    height: 20px; \
    background-color: #012 !important; \
    margin-bottom: 3px !important; \
} \
.pager_cell, .pager, .pager tbody, .pager tr, pager tr.even, pager tr.even td, .pager td { \
    background-color: #012 !important; \
    margin: 0px; \
    height: 20px; \
    padding: 0px; \
    border-width: 0px !important; \
    border-collapse: collapse; \
} \
.pager tr:hover, .pager tr:hover td { \
    background-color: #012 !important; \
} \
.pager td { \
    display: table-cell !important; \
    font-size: normal !important; \
    color: #069 !important; \
} \
.pager u { \
    text-decoration: none !important; \
} \
.pager b { \
    font-weight: normal !important; \
} \
.pager a { \
    border: none !important; \
    color: white !important; \
} \
.pager a:hover { \
    border: none !important; \
    color: white;\
    background-color: #069;\
} \
.pager_cell { \
    cursor: default !important; \
} \
.pager_cell a { \
    cursor: pointer !important; \
} \
');

var body = document.getElementsByTagName('body')[0];
var searchForm = document.getElementsByTagName('form')[0].innerHTML;

// if we're on the main page, display a pretty form and exit
if (document.location.href.indexOf('?') < 0)
{
    body.innerHTML = '<div id="container"><div class="splash_page" id="header"><form method="get" action="/torrents/" name="ihSearch">' + searchForm + '</form></div></div>' + footer;
    return;
}

// if it's a failed search page, do the same but with a message
if (body.innerHTML.indexOf('Search returned 0 results') > 0)
{
    body.innerHTML = '<div id="container"><div class="splash_page" id="header"><div id="status">Oops! Search returned no results...</div><form method="get" action="/torrents/" name="ihSearch">' + searchForm + '</form></div></div>' + footer;
    return;
}

// handles clicks of column headers
function ajaxRefresh(url)
{
   // add a spinner
   document.getElementById('spinner').innerHTML = '<img alt="please wait" src="data:image/gif;base64,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" />';
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", url + "&nofollow"); 
   xmlhttp.onreadystatechange = function()
   { 
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
       {
           ajaxBuffer = document.getElementById('ajax_buffer');
           ajaxBuffer.innerHTML = "";
           pagerEl = document.getElementsByTagName('table')[0];
           ajaxBuffer = document.getElementById('ajax_buffer');
           ajaxBuffer.innerHTML = xmlhttp.responseText;
           document.getElementById('main_table').innerHTML = rebuildMainTable();
           styleRows();
           pager = rebuildPager(ajaxBuffer);
           ajaxBuffer.innerHTML = "";
           pagerEl.innerHTML = pager;
           // remove the spinner
           document.getElementById('spinner').innerHTML = "";
       } 
   } 
    xmlhttp.send(null);
}

function embedFunction(s)
{
    document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(ajaxRefresh);
embedFunction(rebuildPager);
embedFunction(rebuildMainTable);
embedFunction(styleRows);

function rebuildMainTable()
{
    mainTable = document.getElementById('serps').innerHTML;
    
    // clearer text
    mainTable = mainTable.replace(/Torrent Tags, Name/,'Name');

    // rewrite links to direct downloads
    mainTable = mainTable.replace(/torrent_details\/(.*)\'/g,'download/$1.torrent\'');
    mainTable = mainTable.replace(/torrent_details\/(.*)\?tab=summary/g,'download/$1.torrent');

    // remove those godawful mouseover effects
    mainTable = mainTable.replace(/onmouseo(ver|ut)/gi,'dummyAttribute');
    mainTable = mainTable.replace(/rgb\(150,\s*49,\s*0\)/g,'#668');

    // remove link to comments because we don't link to them anymore
    mainTable = mainTable.replace(/torrent\"\>0\<img/g, 'torrent"><img');
    mainTable = mainTable.replace(/1px;\"\>\s\d+\<img/g, '1px;"><img');

    // rewrite anchor clicks to be direct downloads
    mainTable = mainTable.replace(/\/torrent_details\//g, '/download/');

    // remove keyword bolding because it's not visible with this style
    mainTable = mainTable.replace(/<\/?b>/g, '');

    // remove line breaks because they're not visible with this style
    mainTable = mainTable.replace(/<br\s*\/?>/g, '');

    // remove span tags because they're pointless
    mainTable = mainTable.replace(/<\/?span.*?>/g, '');

    // remove images because they're not visible with this style
    // has to be done after comment link removal!
    mainTable = mainTable.replace(/<img[^>]*>/g, '');
    
    // remove incomprehensible inline styles from hell
    mainTable = mainTable.replace(/rgb\(.*?\)/g, '');
  
    // expand ages into more readable format - drop everything after the decimal and use a word for the units
    mainTable = mainTable.replace(/>\s*(\d+)(\.\d+)?d\s*</g, '><span style="text-align: right; float: right; padding-right: 1em;">$1 &nbsp;&nbsp;days</span><');
    mainTable = mainTable.replace(/>\s*(\d+)(\.\d+)?w\s*</g, '><span style="text-align: right; float: right; padding-right: 1em;">$1 &nbsp;weeks</span><');

    
    // swap out sorting methods to AJAX
    mainTable = mainTable.replace(/onclick="document\.location=('.*?')"/g, 'onclick="ajaxRefresh($1)"');

    return mainTable;
}

function rebuildPager(el)
{
    var pager = /<table class=['"]pager.*?table/i.exec(el.innerHTML);
    if (pager)
    {
        pager = pager[0];
        
        // override our alternating-row style
        pager = pager.replace(/<td/g, '<td class="pager_cell"');
        
        // fit width
        pager = pager.replace(/"500"/, '"100%"');
        pages = /Page (\d+) of (\d+)/i.exec(pager);
        if (pages)
        {
            // hide navigation we can't use
            if (pages[1] == '1')
            {
                pager = pager.replace(/«/g, '');
            }
            if (pages[1] == pages[2])
            {
                pager = pager.replace(/»/g, '');
            }
            // replace navigation arrows with cleaner symbols
            pager = pager.replace(/>««.*?</, '> &nbsp;|&lt;&nbsp;<');
            pager = pager.replace(/>«.*?</, '>&nbsp;&lt;&lt;&nbsp;<');
            pager = pager.replace(/>[^>]*»»</, '>&nbsp;&gt;|&nbsp; <');
            pager = pager.replace(/>[^>]*»</, '>&nbsp;&gt;&gt;&nbsp;<');
        }

        // swap out paging methods to AJAX
        pager = pager.replace(/href="(.*?)"/g, 'onclick="ajaxRefresh(\'$1\')"');
    }
    else
    {
        pager = '';
    }
    return pager;
}

// make the rows pretty alternating colours
function styleRows()
{
    rows = document.getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++)
    {
        rows[i].className = (i % 2) ? "odd" : "even";

        // prettify torrent names by dimming out stupid uploader's space-replacements
        tds = rows[i].getElementsByTagName('td');
        if (tds.length > 2)
        {
            // remove distinction betweek downloads and release information
            tds[2].innerHTML = tds[2].innerHTML.replace(/\[DL\]/g, '');
            tds[2].innerHTML = tds[2].innerHTML.replace(/\[REL\].*/, '');
            
            anchors = tds[2].getElementsByTagName('a');
            for (j = 0; j < anchors.length; j++)
            {
                if (anchors[j].innerHTML.indexOf('Almost') > 0) { alert (anchors[j].innerHTML); return; }

                // dim _ and .
                anchors[j].innerHTML = anchors[j].innerHTML.replace(/([\._])/g, '<span class="dim">$1</span>');
                // then reverse the dimming if it's actually the start of a file extension
                anchors[j].innerHTML = anchors[j].innerHTML.replace(/\.<\/span>(divx|jpg|jpeg|mpg|mpeg|mp2|mp3|mp4|avi|mov|mkv|ogg|vob|zip|rar|r00|bin|iso|daa|tar|tgz|tar\.gz|bz|arj|arc)$/gi, '</span><span class="ext">.$1</span>');
            }
        }
    }
}

mainTable = rebuildMainTable();
pager = rebuildPager(body);

// rebuild the entire page, it's so hideously broken.
body.innerHTML = '<div id="ajax_buffer" style="display: none"></div><div id="container"><div id="header"><div id="spinner"></div><form method="get" action="/torrents/" name="ihSearch">' + searchForm + '</form></div>' + pager + '<table id="main_table" cellspacing="0">' + mainTable + '</table></div>' + footer;

styleRows();


