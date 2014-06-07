// version 0.1 BETA!
// 2005-05-01
// Copyright (c) 2005, Matt Biddulph, Jeremy Dunck
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MyPIPstag", and click Uninstall.
//
// --------------------------------------------------------------------
//
//Originally written by Matt Biddulph:
//http://www.hackdiary.com/archives/000067.html
//
//His implementation had two limitations: 
//1) it hard-coded his user name (sekrit), 
//whereas you might want to use your own name.
//2) it required specially configured javascript security
//in order to make cross-domain requests for the del.icio.us data.
//
//In his defense, it was a demo, and it was written before
//Greasemonkey introduced the GM_xmlhttpRequest function.
//
//This version has neither limitation.  All you need is GM 0.2.6 or later.
//
//The first time it runs, you'll be prompted for a user name.
//This is the username used to select tags from del.icio.us.
//
//If you want to change it later, go to about:config and 
//search for greasemonkey.scriptvals.http://dunck.us/code/greasemonkey/MyPIPstag.username.
//Change this to whatever you want.
//More info here:
//http://dunck.us/anabasis/archives/2005/05/01/bbc-radio-3-now-with-delicious-navigation/
//
// ==UserScript==
// @name           MyPIPstag
// @namespace      http://dunck.us/code/greasemonkey
// @description    deliciousifies BBC Programme Information Pages on radio3
// @include        http://www.bbc.co.uk/radio3/*/pip/*
// ==/UserScript==
//

if (!GM_xmlhttpRequest) {
  alert('Please upgrade to Greasemonkey 0.2.6 or later: http://greasemonkey.mozdev.org');   
  return;
}

function replace_in_html(id,txt) {
    elt = document.getElementById(id);
    elt.innerHTML = txt;
}; 

function prepend_to_html(id,txt) {
    elt = document.getElementById(id);
    elt.innerHTML = txt+elt.innerHTML; 
} 

function add_basic_html_structure() {
    prepend_to_html("teasers","<div id='deli'><div id='links'></div><div id='edit'><form onsubmit='tagit(); return false;'><input type='text' id='tags' /><input id='tagbutton' type='button' onclick='tagit()' value='tag' /></form></div></div><div class='hdots-1'>&nbsp;</div>");
}

window.tagit = function() {
    tagbox = document.getElementById('tags');
    tagbutton = document.getElementById('tagbutton');

    title = document.title;
    var radio3 = /BBC - Radio 3 - /;
    title = title.replace(radio3,"");
    post_to_del(location.href,title,tagbox.value);
    tagbutton.value = "posting...";
    tagbutton.disabled = true;
    return false;
}

function delicious_url(url) {
    return 'http://del.icio.us/url/?url='+escape(url);
}

function got_durl_content(content) {
    var findtag = new RegExp('<a class="delNav" href="\/' + username + '\/.*">(.*)<\/a>', 'g');
    tagged = 0;
    tagintro();
    while(ar = findtag.exec(content)) {
        tag = ar[1];
        if(!(tag.match(/^200/))) {
            tagged = 1;
            maketag(tag);
        }
    }
    if(!tagged) {
        saysnothing();
    }
}

function tagplaceholder() {
    prepend_to_html("teasers","<div id='placeholder'>consulting del.icio.us...</div>");
}

function tagintro() {
    replace_in_html("links","<p><b>del.icio.us says:<!-- <a href='"+durl+"'>(info)</a>--></b></p><ul style='list-style-type: none' id='linklist'></ul><br />");
}

function getCorrectedYear(year) {
    year = year - 0; /* converting to a number */ 
    if (year < 70) return (2000 + year);
    if (year < 1900) return (1900 + year);
    return year; 
}

function post_to_del(url,title,tags) {
    var today = new Date();
    
    var d  = today.getDate();
    if(d < 10) d = '0' + d;
    var m = today.getMonth() + 1;
    if(m < 10) m = '0' + m;
    var y = getCorrectedYear(today.getYear());
    var dateString = y + '-' + m + '-' + d;

    post_url = "http://del.icio.us/api/posts/add?url="+escape(url)+"&description="+escape(title)+"&tags="+escape(tags)+"&dt="+dateString+"T00:00:00Z&extended=";
    

		GM_xmlhttpRequest({
			method:"GET",
			url:post_url,
			onreadystatechange:function(details) {
        if (details.readyState==4) {
            posted(details);
        }
      }
		})
}

function posted(details) {
    document.getElementById('tags').value = "";
    tagbutton.value = "tag";
    document.getElementById('deli').innerHTML = '';
    read_tags(location.href);
}

function read_tags(url) {
    durl = delicious_url(url);

		GM_xmlhttpRequest({
			method:"GET",
			url:durl,
			onreadystatechange:function(details) {
        if (details.readyState==4) {
            add_basic_html_structure();
            document.getElementById('placeholder').innerHTML = '';
            got_durl_content(details.responseText);
        }
    	}
		})

}

function get_urls_for_tag(tag) {
    rss_url = 'http://del.icio.us/rss/' + username + '/'+tag;

		GM_xmlhttpRequest({
			method:"GET",
			url:rss_url,
			onreadystatechange:function(details) {
        if (details.readyState==4) {
            rss(tag,details);
        }
		  }
		})
}

function rss(tag,details) {
    var findtitle = /<title>(.*)<\/title>/g;
    content = details.responseText;
    titles = Array();
    while(ar = findtitle.exec(content)) {
        titles[titles.length] = ar[1];
    }

    var findlink = /<link>(.*)<\/link>/g;
    content = details.responseText;
    links = Array();
    while(ar = findlink.exec(content)) {
        links[links.length] = ar[1];
    }

    if(titles.length>2) {
        tag_li = document.getElementById("tag_"+tag);
        tag_li.innerHTML += "<ul style='list-style-type: none' id='tag_"+tag+"_list'></ul>";
        tag_ul = document.getElementById("tag_"+tag+"_list");
        for(var i = 1; i<titles.length; i++) {
            if(links[i] != location.href) {
                tag_ul.innerHTML += "<li><a href='"+links[i]+"'>"+titles[i]+"</a></li>";
            }
        }
    }
}

function saysnothing() {
    prepend_to_html("linklist","<li>no tags yet</li>");
}

function maketag(tag) {
    document.getElementById('tags').value += tag + " ";
    prepend_to_html("linklist","<li id='tag_"+tag+"'><!-- <a href='http://del.icio.us/" + username + "/"+tag+"'>-->"+tag+"<!-- </a> --></li>");
    get_urls_for_tag(tag);
}

var username = '';

if (!GM_getValue('username')) {
	username = prompt("What user name would you like to use with del.icio.us?");
	GM_setValue('username', username);
} else {
	username = GM_getValue('username');
}

tagplaceholder();
read_tags(location.href);


