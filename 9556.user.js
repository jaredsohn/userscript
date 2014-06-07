// ==UserScript==
// @name          Flickr - RSS feeds for individual threads in the forum or groups
// @description	  Adds a link to an RSS feed for the thread you are looking at in any group or forum
// @version       1.1 03-Jun-2008
// @namespace     http://steeev.freehostia.com
// @author        Stephen Fernandez aka Steeev http://steeev.freehostia.com
// @include       http://www*.flickr.com/help/forum/*
// @include       http://flickr.com/help/forum/*
// @include       http://www*.flickr.com/groups/*/discuss/*
// @include       http://flickr.com/groups/*/discuss/*
// ==/UserScript==


/*
Known Issues 
------------
The title of the RSS feed doesnt match the title of the thread, this is a limitation of yahoo pipes
*/

(function () {


atomrssdiv=document.getElementById('AtomRSS');
if(!atomrssdiv)
  return;
   
if (location.href.match('/groups/')) {
  threadid=document.location.href.split('/')[6];
  groupid=atomrssdiv.getElementsByTagName('a')[0].getAttribute('href').split('id=')[1].split('\&amp')[0];
  rssfeed='http://pipes.yahoo.com/pipes/pipe.run?_id=MFnCl_kN3BGQqo58JxOy0Q&_render=rss&_run=1&GroupID=' + groupid + '&ThreadID=' + threadid + '&GroupOrForum=groups_discuss.gne';
}
else {
  threadid=document.location.href.split('/')[5];
  rssfeed='http://pipes.yahoo.com/pipes/pipe.run?_id=MFnCl_kN3BGQqo58JxOy0Q&_render=rss&_run=1&GroupID=&ThreadID=' + threadid + '&GroupOrForum=forums.gne';
}

arspan=document.createElement('span');
arspan.innerHTML = '&nbsp;&nbsp;<a href="' + rssfeed + '" title="RSS 2.0 feed"><img src="http://l.yimg.com/www.flickr.com/images/feed-icon-16x16.png" alt="Subscribe to a feed of stuff on this page..." align="absmiddle" height="16" width="16"></a>';
arspan.innerHTML += '<a href="' + rssfeed + '" title="RSS 2.0 feed">Feed</a> – Subscribe to This Thread';

atomrssdiv.appendChild(arspan);


/*
atomas=atomrssdiv.getElementsByTagName('a');
for(i=0;i<atomas.length;i++)
  if(atomas[i].textContent=='Feed')
    atomas[i].setAttribute('onclick','feedflare(this,"' + atomas[i].href + '");return false;');


unsafeWindow.feedflare = function (node, rssfeed)  {
  rssfeedenc=encodeURIComponent(rssfeed);
  feeddiv=document.createElement('div');
  feeddiv.innerHTML="<h2 id='subactions' class='subactions'><img src='http://us.i1.yimg.com/us.yimg.com/i/us/ext/rss3.gif'' />Subscribe<ul class='subscribe'><li><a href='" + rssfeed + "'><img src='http://us.i1.yimg.com/us.yimg.com/i/us/ext/rss3.gif'></a><a href='" + rssfeed + "'>Get as RSS</a></li><li><a href='http://add.my.yahoo.com/rss?url=" + rssfeedenc + "'><img src='http://us.i1.yimg.com/us.yimg.com/i/us/my/addtomyyahoo4.gif'></a></li><li><a href='http://fusion.google.com/add?feedurl=" + rssfeedenc + "'><img src='http://buttons.googlesyndication.com/fusion/add.gif'></a></li><li><a href='http://www.bloglines.com/sub?url=" + rssfeedenc + "'><img src='http://www.bloglines.com/images/sub_modern5.gif'></a></li><li><a href='http://www.rojo.com/add-subscription?resource=" + rssfeedenc + "'><img src='http://www.rojo.com/corporate/images/rojowidered.gif'></a></li><li><a href='http://www.netvibes.com/subscribe.php?url=" + rssfeedenc + "'><img src='http://www.netvibes.com/img/add2netvibes.gif'></a></li><li><a href='http://www.newsgator.com/ngs/subscriber/subext.aspx?url=" + rssfeedenc + "'><img src='http://www.newsgator.com/images/ngsub1.gif'></a></li><li><a href='http://feeds.my.aol.com/add.jsp?url=" + rssfeedenc + "'><img src='http://o.aolcdn.com/myfeeds/vis/myaol_cta1.gif'></a></li><li><a href='http://alerts.yahoo.com/main.php?url=" + rssfeedenc + "&view=blogs'><img src='http://us.i1.yimg.com/us.yimg.com/i/nt/ic/ut/bsc/alrt16_1.gif'></a><a href='http://alerts.yahoo.com/main.php?url=" + rssfeedenc + "&view=blogs'>Get results by Email or Phone</a></li><li><a href='" + rssfeed.replace('_render=rss','_render=json') + "'><img src='http://us.i1.yimg.com/us.yimg.com/i/nt/ic/ut/bsc/tip16_1.gif'></a><a href='" + rssfeed.replace('_render=rss','_render=json') + "'>Get as JSON</a></li></ul></h2>";
  node.innerHTML=feeddiv.innerHTML;
  return false;
}
atomrssdiv.appendChild(arspan);
*/

/*
GM_addStyle(".subactions{position:relative;display:block;float:right;padding-right:12px;background:transparenturl(http://l.yimg.com/us.yimg.com/i/us/pps/e/nav_aro_r_1.png)no-repeat scroll right 3px;cursor:pointer;}");
GM_addStyle(".subactions.active{padding-right:12px;background:transparenturl(http://l.yimg.com/us.yimg.com/i/us/pps/e/nav_aro_d_1.png)no-repeat scroll right 8px;}");
GM_addStyle(".subactions img {	vertical-align:top;	padding-right:2px;}");
GM_addStyle(".subscribe{position:absolute;display:block;background-color:white;z-index:1000;border-top:1px solid #b0b0b0;border-left:1px solid #b0b0b0;	border-right:2px solid #707070;	border-bottom:2px solid #707070;text-align:left; list-style:none; }");
GM_addStyle(".subscribe li{padding:0px;background-color:white;display:block;font-size:97%;white-space:nowrap;overflow:hidden;margin:2px;}");
GM_addStyle(".subscribe li * {display:inline;}");
GM_addStyle(".subscribe li:hover {background-color:#d0d0d0;}");
GM_addStyle(".subscribe li img { vertical-align:middle;padding-right:8px; }");
GM_addStyle(".subscribe a {	text-decoration:none;}");
GM_addStyle(".subscribe a:hover { background-color:#d0d0d0;}");
GM_addStyle(".subscribe {list-style:none;}");
arspan.innerHTML="<h2 id='subactions' class='subactions'><img src='http://us.i1.yimg.com/us.yimg.com/i/us/ext/rss3.gif'' />Subscribe<ul class='subscribe'><li><a href='" + rssfeedunenc + "'><img src='http://us.i1.yimg.com/us.yimg.com/i/us/ext/rss3.gif'></a><a href='" + rssfeedunenc + "'>Get as RSS</a></li><li><a href='http://add.my.yahoo.com/rss?url=" + rssfeed + "'><img src='http://us.i1.yimg.com/us.yimg.com/i/us/my/addtomyyahoo4.gif'></a></li><li><a href='http://fusion.google.com/add?feedurl=" + rssfeed + "'><img src='http://buttons.googlesyndication.com/fusion/add.gif'></a></li><li><a href='http://www.bloglines.com/sub?url=" + rssfeed + "'><img src='http://www.bloglines.com/images/sub_modern5.gif'></a></li><li><a href='http://www.rojo.com/add-subscription?resource=" + rssfeed + "'><img src='http://www.rojo.com/corporate/images/rojowidered.gif'></a></li><li><a href='http://www.netvibes.com/subscribe.php?url=" + rssfeed + "'><img src='http://www.netvibes.com/img/add2netvibes.gif'></a></li><li><a href='http://www.newsgator.com/ngs/subscriber/subext.aspx?url=" + rssfeed + "'><img src='http://www.newsgator.com/images/ngsub1.gif'></a></li><li><a href='http://feeds.my.aol.com/add.jsp?url=" + rssfeed + "'><img src='http://o.aolcdn.com/myfeeds/vis/myaol_cta1.gif'></a></li><li><a href='http://alerts.yahoo.com/main.php?url=" + rssfeed + "&view=blogs'><img src='http://us.i1.yimg.com/us.yimg.com/i/nt/ic/ut/bsc/alrt16_1.gif'></a><a href='http://alerts.yahoo.com/main.php?url=" + rssfeed + "&view=blogs'>Get results by Email or Phone</a></li><li><a href='" + rssfeedunenc.replace('_render=rss','_render=json') + "'><img src='http://us.i1.yimg.com/us.yimg.com/i/nt/ic/ut/bsc/tip16_1.gif'></a><a href='" + rssfeedunenc.replace('_render=rss','_render=json') + "'>Get as JSON</a></li></ul></h2>";
atomrssdiv.appendChild(arspan);
YAHOO.util.Event.addListener(window,"load",function() {
  new YAHOO.pipes.site.subscribe(document.getElementById('subactions'));
});
*/


}) ();