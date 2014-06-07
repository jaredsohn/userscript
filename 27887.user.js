// web3 persian Social Bookmark 4 Wordpress.com
// version 0.1 BETA
// Date Of Release 2008.5
// If you have a wordpress.com blog then this user script will let you insert the social bookmarking buttons on each of your 
// wordpress.com blog posts which your blog readers would click to save your posts to their favourite social bookmarking sites 
// like balatarin, donbaleh, de.icio.us, digg etc. This was possible previously in wordpress.com posts but the methods used were
// tedious and time taking. Infact this script is the first & only code which automates placement of bookmark links in
// wordpress.com posts to maximum extent by using the power of GreaseMonkey & Javascript. Currently it's BETA  i'll modify
// it if you request. Currently it supports balatarin, donbaleh, mohandes, del.icio.us, digg and more than  50 other bookmark managers.
// for more information go to http://web3b.wordpress.com or http://web3b.blogspot.com
// ---------------------------------------------------------------------------
// Copyright (c) 2008, web3beta
// http://web3b.wordpress.com
// http://web3b.wordpress.com
// ---------------------------------------------------------------------------
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// this code based on Social Bookmarking Helper 4 Wordpress.com 
// You are free to modify it and redistribute but should inform 
// public that this script was created by web3 that based on 
// Social Bookmarking Helper 4 Wordpress.com by xyz and i have modified it.

// ---------------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need 
// Mozilla Firefox or Firefox Based Browsers Like Flock AND
// Greasemonkey Firefox Extension 0.3 or Later 
// Install  From http://greasemonkey.mozdev.org
// Then restart Firefox and again visit this script page and install this user script.
// Under Tools, there will be a new menu item  "Install User Script".
// Accept the default configuration and install it.
//
//
// --------------------------------------Code Starts From Here-------------------------------------
// ==UserScript==
// @name          web3 persian Social Bookmark 4 wp
// @namespace     http://web3b.wordpress.com
// @description   web3 persian Social Bookmark 4 Wordpress.com version 0.1 BETA adding more than  50 social bookmarking links (like balatarin, donbaleh, del.icio.us, digg etc..) to your wordpress.com blog post for more information go to  http://web3b.wordpress.com or http://web3b.blogspot.com
// @include       http://*.wordpress.com/wp-admin/post.php?action=edit&post=*
// @include       http://*.wordpress.com/wp-admin/post-new.php
// @include       https://*.wordpress.com/wp-admin/post.php?action=edit&post=*
// @include       https://*.wordpress.com/wp-admin/post-new.php
// ==/UserScript==


var t11=document.location.href;
var urlp = /(\w+):\/\/([\w.]+)\/(\w*)/;
var result = t11.match(urlp);
var host='';
if (result != null) {

host = result[2];
}
var tpt="http://"+host;

function createurl(t)
{
var now=new Date();
var t1=tpt+"/";
var yr=now.getFullYear();
var mn=now.getMonth(); mn++;
var day=now.getDate();
var premon=''; var preday='';  
if(mn<10){premonth='0';} if(day<10){preday='0';}
t1=t1+yr+"/"+premonth+mn+"/"+preday+day+"/"+t;
return(t1);
}

function gencode(){
var st=document.getElementById("post_name").value;
var POSTTITLE=document.getElementById("title").value;
if(st){
var POSTURL=createurl(st);
var op="<!-- web3 persian social bookmark for wordpress.com ver:1b --><p></br></p><span style='font-size: 10pt;' >&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607;:&nbsp;</span><strong><p style='font-size: 7pt;  padding:0px' ><a href='https://balatarin.com/links/submit?phase=2&url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1576;&#1575;&#1604;&#1575;&#1578;&#1585;&#1740;&#1606;' target='_blank'><img  src='http://web3beta.googlepages.com/balatarin.gif' alt='Balatarin' width='16' height='16'/></a> :: <a href='https://donbaleh.com/submit.php?url="+POSTURL+"&subject="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1583;&#1606;&#1576;&#1575;&#1604;&#1607;' target='_blank'><img src='http://web3beta.googlepages.com/donbaleh.gif' alt='Donbaleh' width='16' height='16'/></a> :: <a href='http://www.mohand.es/submit?phase=1&url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1605;&#1607;&#1606;&#1583;&#1587;' target='_blank'><img src='http://web3beta.googlepages.com/mohandes.gif' alt='Mohandes' width='16' height='16' /></a> :: <a href='http://delicious.com/post?url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1582;&#1608;&#1588;&#1605;&#1586;&#1607;' target='_blank'><img src='http://web3beta.googlepages.com/delicious.gif' alt='Del.icio.us' width='16' height='16' /></a> :: <a href='http://www.digg.com/submit?phase=2&url="+POSTURL+".html&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1583;&#1740;&#1711;' target='_blank'><img src='http://web3beta.googlepages.com/digg.gif'  alt='Digg' width='16' height='16' /></a> :: <a href='http://www.stumbleupon.com/submit?url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1575;&#1587;&#1578;&#1575;&#1605;&#1576;&#1604;' target='_blank'><img src='http://web3beta.googlepages.com/stumbleupon.gif'  alt='Stumble' width='16' height='16' /></a> :: <a href='http://furl.net/storeIt.jsp?t="+POSTTITLE+"&u="+POSTURL+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1601;&#1585;&#1604;' target='_blank'><img src='http://web3beta.googlepages.com/furl.gif' alt='Furl' width='16' height='16' /></a> :: </a><a href='http://friendfeed.com/share?url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1601;&#1585;&#1606;&#1583;&#1601;&#1740;&#1583;' target='_blank'><img src='http://web3beta.googlepages.com/friendfeed.gif' alt='Friendfeed' width='16' height='16' /></a> :: <a href='http://twitthis.com/twit?url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1578;&#1608;&#1740;&#1578;&#1585;' target='_blank'><img src='http://web3beta.googlepages.com/twitter.gif' alt='Twitthis' width='16' height='16' /></a> :: <a href='http://www.facebook.com/sharer.php?u="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1601;&#1740;&#1587;&#1576;&#1608;&#1705;' target='_blank'><img src='http://web3beta.googlepages.com/facebook.gif' alt='Facebook' width='16' height='16' /></a> :: <a href='http://www.addthis.com/bookmark.php?pub=web3socialbookmark&url="+POSTURL+"&title="+POSTTITLE+"' title='&#1575;&#1585;&#1587;&#1575;&#1604; &#1576;&#1607; &#1587;&#1585;&#1608;&#1740;&#1587;&#1607;&#1575;&#1740; &#1583;&#1740;&#1711;&#1585;' target='_blank'><img src='http://web3beta.googlepages.com/addthis.gif'  alt='Addthis to other' width='16' height='16' /></a> :: <a href='http://feeds.feedburner.com/web3b' title='&#1575;&#1588;&#1578;&#1585;&#1575;&#1705; &#1583;&#1585; &#1582;&#1608;&#1585;&#1575;&#1705;' target='_blank'><img src='http://web3beta.googlepages.com/feed.gif' alt='Subscribe to Feed' width='16' height='16' /></a></strong></p></b><!-- End of persian social bookmark for wordpress.com ver:1b , Check http://web3b.wordpress.com or http://web3b.blogspot.com for updates -->";
op+="</p>";
prompt('Paste the code above at the last of post',op);
}
else{exit;}
}
var autosave=document.getElementById("autosave");

autosave.innerHTML="<br>Your Blog :"+tpt+"<br>";
GM_registerMenuCommand( 'Generate Social Code' , gencode);