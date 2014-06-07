// Yes, I know this is full of evil regexp hacks and the like
// It's just a demo, get over it.
//
// This script requires the following in your prefs.js:
// user_pref("capability.principal.codebase.p0.granted", "UniversalBrowserRead");
// user_pref("capability.principal.codebase.p0.id", "http://www.bbc.co.uk");
// user_pref("signed.applets.codebase_principal_support", true);
//
// ==UserScript==
// @name           PIPstag
// @namespace      http://hackdiary.com/greasemonkey
// @description    deliciousifies BBC Programme Information Pages on radio3
// @include        http://www.bbc.co.uk/radio3/*/pip/*
// ==/UserScript==
//
// (c) 2005 Matt Biddulph

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

function tagit() {
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
    var findtag = /<a class="delNav" href="\/sekrit\/.*">(.*)<\/a>/g;
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
    
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", post_url,true,"sekrit","biddulph");
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4) {
            posted(xmlhttp);
        }
    }
    xmlhttp.send(null)
}

function posted(xmlhttp) {
    document.getElementById('tags').value = "";
    tagbutton.value = "tag";
    document.getElementById('deli').innerHTML = '';
    read_tags(location.href);
}

function read_tags(url) {
    durl = delicious_url(url);
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", durl,true);
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4) {
            add_basic_html_structure();
            document.getElementById('placeholder').innerHTML = '';
            got_durl_content(xmlhttp.responseText);
        }
    }

    xmlhttp.send(null)
}

function get_urls_for_tag(tag) {
    rss_url = 'http://del.icio.us/rss/sekrit/'+tag;
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", rss_url,false);
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4) {
            rss(tag,xmlhttp);
        }
    }

    xmlhttp.send(null)
    rss(tag,xmlhttp);
}

function rss(tag,xmlhttp) {
    var findtitle = /<title>(.*)<\/title>/g;
    content = xmlhttp.responseText;
    titles = Array();
    while(ar = findtitle.exec(content)) {
        titles[titles.length] = ar[1];
    }

    var findlink = /<link>(.*)<\/link>/g;
    content = xmlhttp.responseText;
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
    prepend_to_html("linklist","<li id='tag_"+tag+"'><!-- <a href='http://del.icio.us/sekrit/"+tag+"'>-->"+tag+"<!-- </a> --></li>");
    get_urls_for_tag(tag);
}

tagplaceholder();
read_tags(location.href);
