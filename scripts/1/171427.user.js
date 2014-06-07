// ==UserScript==
// @name        W-BB Quick Search
// @namespace   http://hoxxy.info
// @include     http://www.warez-bb.org/*
// @exclude     http://www.warez-bb.org/search.php
// @grant       none
// @version     1.0
// ==/UserScript==

var d = document,o = 'option value=',c = 'class=',s = 'selected',x = 'checked="checked"',
    scode = '<div id="sbox" style="display:none;"><div '+c+'"input-seperator"></div><strong '+c+'"title">Keywords:</strong><form action="search.php?mode=results" method="post"><div><input type="text" '+c+'"post" name="search_keywords" size="30" id="autofocus" /></div><div><p '+c+'"gensmall">Select forums</p></div><div '+c+'"input"><div><select '+c+'"multi" name="search_forum[]" size="10" multiple="multiple" id="search-forums-list"><'+o+' "-1">All available</'+o+'></optgroup><optgroup label="Announcements"><'+o+' "2" '+s+'> |-- Important Announcements</'+o+'><'+o+' "108" '+s+'> |---- Case Guidelines</'+o+'></optgroup><optgroup label="Public"><'+o+' "40" '+s+'> |-- Introduction</'+o+'><'+o+' "112" '+s+'> |-- Listings</'+o+'><'+o+' "3" '+s+'> |---- Apps</'+o+'><'+o+' "5" '+s+'> |---- Games</'+o+'><'+o+' "28" '+s+'> |---- Console Games</'+o+'><'+o+' "4" '+s+'> |---- Movies</'+o+'><'+o+' "57" '+s+'> |---- TV Shows</'+o+'><'+o+' "88" '+s+'> |---- Anime</'+o+'><'+o+' "6" '+s+'> |---- Music</'+o+'><'+o+' "38" '+s+'> |---- Music Videos</'+o+'><'+o+' "7" '+s+'> |---- Templates and Scripts</'+o+'><'+o+' "8" '+s+'> |---- eBooks</'+o+'><'+o+' "91" '+s+'> |---- Audiobooks</'+o+'><'+o+' "83" '+s+'> |---- Tutorials</'+o+'><'+o+' "105" '+s+'> |---- Mac</'+o+'><'+o+' "106" '+s+'> |---- Mobile</'+o+'><'+o+' "20" '+s+'> |---- Other OSes</'+o+'><'+o+' "113" '+s+'> |-- Requests</'+o+'><'+o+' "15" '+s+'> |---- Apps requests</'+o+'><'+o+' "17" '+s+'> |---- Games requests</'+o+'><'+o+' "16" '+s+'> |---- Movies & TV Shows requests</'+o+'><'+o+' "18" '+s+'> |---- Music requests</'+o+'><'+o+' "19" '+s+'> |---- All other requests</'+o+'><'+o+' "11" '+s+'> |-- Forum Comments</'+o+'><'+o+' "76" '+s+'> |---- Milestones</'+o+'><'+o+' "30" '+s+'> |-- Helpdesk</'+o+'><'+o+' "10" '+s+'> |-- Off-Topic</'+o+'><'+o+' "92" '+s+'> |---- Serious Discussions</'+o+'><'+o+' "102" '+s+'> |---- Sports</'+o+'><'+o+' "85" '+s+'> |---- News</'+o+'><'+o+' "12" '+s+'> |-- Funstuff</'+o+'><'+o+' "22" '+s+'> |-- Link Heaven</'+o+'><'+o+' "118" '+s+'> |---- Services & Giveaways</'+o+'><'+o+' "63" '+s+'> |-- Graphics</'+o+'><'+o+' "97" '+s+'> |---- Graphics Requests & Helpdesk</'+o+'><'+o+' "79" '+s+'> |-- Programming</'+o+'><'+o+' "26" '+s+'> |-- Test Me</'+o+'><'+o+' "24" > |-- Graveyard</'+o+'></optgroup></select></div></div><div style="display:none;"><select '+c+'"post" name="search_time"><'+o+' "0" '+s+'="'+s+'">All Posts</'+o+'></select><select '+c+'"post" name="return_chars"><'+o+' "200" '+s+'="'+s+'">200</'+o+'></select><select '+c+'"post" name="sort_by"><'+o+' "0" '+x+'>Post Time</'+o+'></select><input type="radio" name="search_terms" "all" '+x+' id="so-2" /><input type="radio" name="search_fields" "titleonly" id="so-5" '+x+' /><input type="radio" name="sort_dir" "DESC" id="so-8" '+x+' /><input type="radio" name="show_results" "topics" id="so-10" '+x+' /></div><input '+c+'"button" accesskey="s" type="submit" value="Search" /></div><div '+c+'"input-seperator"></div></form></div>',
    sbtn = '<li><a id="mysearch" href="#"><span '+c+'"search-icon"></span><span '+c+'"valign">Quick Search</span></a></li>';

function t(o) {
 var e = d.getElementById(o);
 e.style.display = (e.style.display != 'none' ? 'none' : '' );
}

d.body.innerHTML = d.body.innerHTML.replace(/>Search</g,'>Advanced Search<');
d.getElementById('navigation').innerHTML += sbtn;
d.getElementById('description').innerHTML += scode;

var ms = d.getElementById('mysearch');
	ms.onclick = function() { t('sbox'); g('general');return false;};