// ==UserScript==
// @name           Warez-BB Quick Search
// @description    Improved search form available on every page
// @version        1.1
// @license        Public Domain
// @include        http://www.warez-bb.org/*
// @include        http://warez-bb.org/*
// ==/UserScript==

(function(){

    var html = '<form action="search.php?mode=results" method="post" class="row2" style="'+
        'display:block;'+
        'margin:0;'+
        'padding:3px 5px;'+
        'text-align:left;'+
        'font-size:11px;'+
        'font-family:tahoma,helvetica,arial,sans-serif;">'+
        '<select class="post" name="search_forum[]" size="10" multiple="multiple" style="height:265px; float:left;">'+
            '<option value="-1">All available</option>'+
            '<optgroup label="Listings">'+
                '<option value="3" selected> |-- Apps</option>'+
                '<option value="47" selected> | &nbsp; &nbsp; &nbsp; All-In-One (AIO)</option>'+
                '<option value="9" selected> | &nbsp; &nbsp; &nbsp; Freewares and Betas</option>'+
                '<option value="5" selected> |-- Games</option>'+
                '<option value="28" selected> | &nbsp; &nbsp; &nbsp; Console Games</option>'+
                '<option value="4" selected> |-- Movies</option>'+
                '<option value="57" selected> | &nbsp; &nbsp; &nbsp; TV Shows</option>'+
                '<option value="88" selected> | &nbsp; &nbsp; &nbsp; Anime</option>'+
                '<option value="6" selected> |-- Music</option>'+
                '<option value="38" selected> | &nbsp; &nbsp; &nbsp; Music Videos</option>'+
                '<option value="7" selected> |-- Templates and Scripts</option>'+
                '<option value="29" selected> | &nbsp; &nbsp; &nbsp; Template Rips</option>'+
                '<option value="8" selected> |-- eBooks</option>'+
                '<option value="83" selected> | &nbsp; &nbsp; &nbsp; Tutorials</option>'+
                '<option value="91" selected> | &nbsp; &nbsp; &nbsp; Audio</option>'+
                '<option value="105" selected> |-- Mac</option>'+
                '<option value="106" selected> |-- Mobile</option>'+
                '<option value="20" selected> |-- Other OSes</option>'+
            '</optgroup>'+
            '<optgroup label="Requests">'+
                '<option value="15" selected> |-- Apps requests</option>'+
                '<option value="17" selected> |-- Games requests</option>'+
                '<option value="16" selected> |-- Movies & TV Shows requests</option>'+
                '<option value="18" selected> |-- Music requests</option>'+
                '<option value="19" selected> |-- All other requests</option>'+
            '</optgroup>'+
            '<optgroup label="Announcements">'+
                '<option value="2" selected> |-- Important Announcements</option>'+
            '</optgroup>'+
            '<optgroup label="General">'+
                '<option value="40" selected> |-- Introduction</option>'+
                '<option value="11" selected> |-- Forum Comments</option>'+
                '<option value="76" selected> | &nbsp; &nbsp; &nbsp; Milestones</option>'+
                '<option value="30" selected> |-- Helpdesk</option>'+
                '<option value="10" selected> |-- Off-Topic</option>'+
                '<option value="92" selected> | &nbsp; &nbsp; &nbsp; Serious Discussions</option>'+
                '<option value="102" selected> | &nbsp; &nbsp; &nbsp; Sports</option>'+
                '<option value="85" selected> | &nbsp; &nbsp; &nbsp; News</option>'+
                '<option value="82" selected> |-- Wadio</option>'+
                '<option value="94" selected> |-- The Scene</option>'+
                '<option value="12" selected> |-- Funstuff</option>'+
                '<option value="22" selected> |-- Link Heaven</option>'+
                '<option value="63" selected> |-- Graphics</option>'+
                '<option value="97" selected> | &nbsp; &nbsp; &nbsp; Graphics Requests & Helpdesk</option>'+
                '<option value="79" selected> |-- Programming</option>'+
                '<option value="26" selected> |-- Test Me</option>'+
                '<option value="24" > |-- Graveyard</option>'+
            '</optgroup>'+
        '</select>'+
        '<div style="float:left; margin:10px 0 0 15px;">'+
            '<input type="text" style="width: 300px" class="post" name="search_keywords" size="30"> '+
            '<input class="button" accesskey="s" type="submit" value="Search">'+
            '<br>'+
            '<br>'+
            '<label><input type="radio" name="search_terms" value="any"> Any terms or use query as entered</label><br>'+
            '<label><input type="radio" name="search_terms" value="all" checked="checked"> All terms</label><br>'+
            '<br>'+
            '<br>'+
            '<label><input type="radio" name="search_fields" value="titleonly" checked="checked"> Title only</label><br>'+
            '<label><input type="radio" name="search_fields" value="all"> Title and message text</label><br>'+
            '<label><input type="radio" name="search_fields" value="msgonly"> Message text only</label><br>'+
            '<label><input type="radio" name="search_fields" value="firstpost"> First post of topics only</label><br>'+
            '<br>'+
            '<span class="explaintitle">Display results as:</span> '+
            '<label><input type="radio" name="show_results" value="posts"> Posts</label>'+
            '<label><input type="radio" name="show_results" value="topics" checked="checked"> Topics</label>'+
            '<br>'+
            '<br>'+
        '</div>'+
        '<div style="float:left; margin:43px 0 0 15px;">'+
            '<span class="explaintitle">Time:</span> '+
            '<select class="post" name="search_time">'+
                '<option value="0" selected="selected">All Posts</option>'+
                '<option value="1">1 Day</option>'+
                '<option value="7">7 Days</option>'+
                '<option value="14">2 Weeks</option>'+
                '<option value="30">1 Month</option>'+
                '<option value="90">3 Months</option>'+
                '<option value="180">6 Months</option>'+
                '<option value="364">1 Year</option>'+
            '</select>'+
            '<br>'+
            '<br>'+
            '<span class="explaintitle">Sort by:</span> '+
            '<select class="post" name="sort_by">'+
                '<option value="0">Post Time</option>'+
                '<option value="1">Author</option>'+
                '<option value="2">Forum</option>'+
            '</select>'+
            '<label><input type="radio" name="sort_dir" value="ASC"> Ascending</label>'+
            '<label><input type="radio" name="sort_dir" value="DESC" checked="checked"> Descending</label>'+
            '<br>'+
            '<br>'+
            '<span class="explaintitle">Return first:</span> '+
            '<select class="post" name="return_chars">'+
                '<option value="-1">All available</option>'+
                '<option value="0">0</option>'+
                '<option value="25">25</option>'+
                '<option value="50">50</option>'+
                '<option value="100">100</option>'+
                '<option value="200" selected="selected">200</option>'+
                '<option value="300">300</option>'+
                '<option value="400">400</option>'+
                '<option value="500">500</option>'+
                '<option value="600">600</option>'+
                '<option value="700">700</option>'+
                '<option value="800">800</option>'+
                '<option value="900">900</option>'+
                '<option value="1000">1000</option>'+
            '</select> characters of posts<br>'+
            '<br>'+
            '<span class="explaintitle">Author:</span> '+
            '<input type="text" style="width: 150px" class="post" name="search_author" size="30"><br>'+
            '<br>'+
        '</div>'+
        '<div style="clear:both; height:1px;"></div>'+
    '</form>',
    document = (unsafeWindow || window).document,
    topnav, tr, span = document.createElement('span'),
    $ = function(path, context) {
        return document.evaluate('.//'+path, context || document, null, 9, null).singleNodeValue;
    },
    toggle = function(event) {
        event.stopPropagation();
        if (tr && tr.style.display !== 'none') {
            tr.style.display = 'none';
            return;
        }
        if (!tr) {
            var td = document.createElement('td');
            td.innerHTML = html;
            tr = document.createElement('tr');
            tr.appendChild(td);
            topnav.parentNode.parentNode.appendChild(tr);
        }
        tr.style.display = 'table-row';
        $("input[@name='search_keywords']", tr).focus();
    };
    if ((topnav = $("td[@class='topnav']"))) {
        span.innerHTML = '<a href="javascript:;"><b>QuickSearch</b> (F2)</a>\u00a0 \u2022\u00a0';
        topnav.insertBefore(span, topnav.firstChild);
        $("a", span).addEventListener('click', toggle, false);
        document.addEventListener('keyup', function(event) {
            if (event.keyCode === 113) {
                toggle(event);
            }
        }, false);
    }
    
}());
