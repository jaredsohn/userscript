// ==UserScript==
	// @name		   Atiki Feed Collector
	// @namespace	   http://www.atiki.com
	// @description   This script enables you to collect feeds "on the fly" and then create a reading list from them
	// @include	   http://*
	// ==/UserScript==

signsp=  "*+-./_@";

function remplace(text,find,repl){
  var found = text.indexOf(find);
  var retVal= ""; var start = 0;
  while(found != -1){
    retVal +=text.substring(start,found) +repl;
    start = found+find.length;
    found =text.indexOf(find,start);
  }
  retVal +=text.substring(start,text.length);
  return retVal;
}

function sauvevaleur(entree) {
  var a=escape(entree);
  for(var i=0;i<signsp.length;i++)
    a=remplace(a,signsp.charAt(i),"%X"+i);
  a=remplace(a,"%","_");
  GM_setValue('FeedList',a);
  GM_setValue('TotalFeeds',GM_getValue('TotalFeeds',0)+1);
}

function sortvaleur() {
  var b=""+GM_getValue('FeedList',"");
  b=remplace(b,"_","%");
  for(var i=0;i<signsp.length;i++)
    b=remplace(b,"%X"+i,signsp.charAt(i));
  b=unescape(b);
  return b;
}

function detect_feeds() {
added = 0;
detected = 0;
el=document.getElementsByTagName('link');
for(i=0;i<el.length;i++) {
if (el[i].getAttribute('rel').indexOf('alternate')!=-1 && (el[i].getAttribute('type').indexOf('application/rss+xml')!=-1 || el[i].getAttribute('type').indexOf('application/atom+xml')!=-1) ) {
detected = 1;
url = el[i].getAttribute('href');
title = el[i].getAttribute('title');

if (url.substring(0,3) == 'www' ) {
url = 'http://' + url;
                               }

if (url.substring(0,1) == '/' ) {
url = 'http://' + document.location.hostname + url;

                               }

if (url.substring(0,1) != 'h') {
if (document.location.href.substring(document.location.href.length-1,document.location.href.length) == '/') {
url = document.location.href + url;
} else {
url = document.location.href + '/' + url;
}
}

if (confirm('Would you like to add this feed to your feedList ?\n\ntitle: '+title+'\nurl: '+url)) {
added = added+1;
if (sortvaleur() =='') {
sauvevaleur(url);
                       } else {
sauvevaleur(sortvaleur()+'\n'+url);
                                }
}
                                                   }
}

if (detected == 0) {
alert('No feed was detected on this page. Please try to locate it manually.');
}  else {
if (added == 0) {
alert('No feed was added to your feedList.'); }
else if (added==1)  {
alert('Added one feed to your feedList');  } else {
alert('Added '+added+' feeds to your feedList');
}
}

}

function clear_feeds() {
GM_setValue('FeedList','');
alert('The list of collected feeds has been cleared.');	
}

function create_feed() {
document.location.href = 'http://www.atiki.com/create';  
}

if (document.location.href == 'http://www.atiki.com/create') {
document.getElementById("feeds_list").innerHTML = document.getElementById("feeds_list").innerHTML + sortvaleur();
GM_setValue('FeedList','');
alert('Your list of feeds has been pasted, you can now create your Atiki reading list !'); 
}

var elmWrapper = document.createElement('div');
	elmWrapper.id = 'feedcollector';
	elmWrapper.innerHTML = '<div style="position: fixed; bottom: 0; ' +
		'right: 0; padding: 1px 4px 3px 4px; background-color: #ddd; ' +
		'color: #000; border-top: 1px solid #bbb; border-left: 1px ' +
		'solid #bbb; font-family: sans-serif; font-size: x-small;">Atiki >' +
		'[<a href="#" title="Collect feeds on this page" ' +
		'id="collectfeed" style="background-color: transparent; ' +
		'color: black; font-size: x-small; font-family: sans-serif; ' +
		'text-decoration: none;">Collect</a>] &middot;' +
		'[<a href="#" title="Create an Atiki feed from your collected feeds" ' +
		'id="createfeed" style="background-color: transparent; ' +
		'color: black; font-size: x-small; font-family: sans-serif; ' +
		'text-decoration: none;">Create</a>] &middot;'+
		'[<a href="#" title="Clear list of collected feeds" ' +
		'id="clearfeeds" style="background-color: transparent; ' +
		'color: black; font-size: x-small; font-family: sans-serif; ' +
		'text-decoration: none;">Clear</a>]</div>';
	document.body.insertBefore(elmWrapper, document.body.firstChild);
	document.getElementById('collectfeed').addEventListener(
		'click', detect_feeds, true);
	document.getElementById('createfeed').addEventListener(
		'click', create_feed, true);
	document.getElementById('clearfeeds').addEventListener(
		'click', clear_feeds, true);