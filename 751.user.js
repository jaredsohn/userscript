// StumbleUpon + del.icio.us integration user script
// version 0.2
// 2005-05-19
// Copyright (c) 2005, Korakot Chaovavanich
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Stulicious", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Stulicious
// @namespace     http://larndham.net/service/
// @description   Allow tagging on SU by intergrating SU with del.icio.us
// @include       http://www.stumbleupon.com/url*
// @exclude     
// ==/UserScript==

var del_user = '';	// put your del.icio.us username here. Or it will ask you the first time
if (! del_user) {
	if (GM_getValue('del_user'))	{
		del_user = GM_getValue('del_user')
	} else {
		del_user = prompt("What is your del.icio.us username? \n(you may set this manually by editing the Stulicious script)")
		GM_setValue('del_user', del_user)
	}
}

var src_url = document.getElementsByTagName('a')[1].href;
var my_url = 'http://del.icio.us/' + del_user + '?url=' + encodeURIComponent(src_url);
var my_link = '<a href="' + my_url + '">#</a>';
var pop_url = 'http://del.icio.us/url?url=' + encodeURIComponent(src_url);
var pop_link = '<a href="' + my_url + '">#</a>';

var ta = document.getElementById('searchtext');
var divtag = document.createElement('div');
divtag.innerHTML = pop_link+ ' <span class=text1>Popular:</span> <span id=poptags class=text2>loading...</span><br>' +
									my_link + ' <span class=text1>My tags:</span> <input id=mytags size=70 value="loading...">' +
									'<input type=button value=update onclick=\'alert("Wait till next version")\'/><br>';
ta.parentNode.insertBefore(divtag, ta);		// insert a div contain tags before the textarea
var span_pop = document.getElementById('poptags');
var input_my = document.getElementById('mytags');


// retrieve my tags for this page
GM_xmlhttpRequest({
	method: 'GET',
	url: my_url,
	onload: function(res){
		html = res.responseText;
		var tags = html.match(/"tags" value="([^"]*)/)[0].substr(14)
		input_my.value = tags
	}
});

// retrieve popular tags for this page
GM_xmlhttpRequest({
	method: 'GET',
	url: pop_url,
	onload: function(res){
		html = res.responseText;
		var tags = html.match(/tag\/\w+/g);
		if (tags) {
			var taglist = '';
			for(var i=0; i<Math.min(10,tags.length); i++){
				taglist += tags[i].substr(4)+' ';
			}
			span_pop.innerHTML = taglist;
		} else {
			span_pop.innerHTML = 'no-tag'
		}
	}
});

