//	Thanks to Lenny Domnitser for the help implementing this script with closure
//	http://mozdev.org/pipermail/greasemonkey/2005-July/004225.html

// ==UserScript==
// @name           Del.icio.us alpha sort
// @namespace      http://www.tweaksthelimbs.org/greasemonkey/
// @description    Allows you to toggle between chronological or alphabetical sorting of links on a del.icio.us page. Places a "sort by" control at the top of the page.
// @include        http://del.icio.us/*
// @exclude	 
// @version 	    0.8.1 - GM 0.3.5, FF 1.0.7
// ==/UserScript==

var debug = false;

function g(message){
	if(debug) GM_log(message);
}

function getElementsByClassName(classname,tagname){
	g('starting getElementsByClassName');
	var alltags=document.getElementsByTagName(tagname);
	g('alltags: '+alltags.length);
	var customcollection = new Array();
	for (i=0; i<alltags.length; i++){
		if (alltags[i].getAttribute('class')==classname) customcollection.push(alltags[i]);
	}
	g('customcollection: '+customcollection.length);
	if(customcollection.length == 0) return;
	return customcollection;
}

function toggleDeliciousSort(){
	g('starting toggledelicious');
	var myposts = getElementsByClassName('post','li');
	g('myposts: '+myposts.length);
	var myarray = new Array;
	if(!alpha){
		g('alpha = false');
		for(i=0;i<myposts.length;i++){
			myarray[i]=[myposts[i].getElementsByTagName('a')[0].innerHTML.toLowerCase(),myposts[i].innerHTML];
		}
		g('myarray: '+myarray.length);
		myarray.sort();
		for(i=0;i<myposts.length;i++){
			myposts[i].innerHTML=myarray[i][1];
		}
		g('myposts: '+myposts.length);
		alpha=true;
		div.innerHTML = sortAlpha;
		document.getElementById('toggleSort').addEventListener('click',toggleDeliciousSort,false);

	}
	else{
		g('alpha = true');
		for(i=0;i<myposts.length;i++){
			myposts[i].innerHTML=origDelicious[i];
		}
		alpha=false;
		div.innerHTML = sortChron;
		document.getElementById('toggleSort').addEventListener('click',toggleDeliciousSort,false);

	}
}

var post = getElementsByClassName('post','li');
if(post){
	g('post check passed');
	var origDelicious = new Array();
	
	for(i=0;i<post.length;i++){
		origDelicious[i]=post[i].innerHTML;
	}
	var sortChron = '&raquo; sort by <a href="javascript:;" id="toggleSort">alpha</a> | chron';
	var sortAlpha = '&raquo; sort by alpha | <a href="javascript:;" id="toggleSort">chron</a>';

	var div = document.createElement('div');
	div.setAttribute('class','pager');

	if(getElementsByClassName('posts','ol')){
		g('posts check passed');
		var posts = getElementsByClassName('posts','ol')[0];
		g('posts: '+posts);
		posts.parentNode.insertBefore(div,posts);
		div.innerHTML = sortChron;
		document.getElementById('toggleSort').addEventListener('click',toggleDeliciousSort,false);
		var alpha = false;
	}
}
