// Social Bookmarking Helper 4 Wordpress.com
// version 0.1 BETA
// Date Of Release 07-07-07
// If you have a wordpress.com blog then this user script will let you insert the social bookmarking buttons on each of your 
// wordpress.com blog posts which your blog readers would click to save your posts to their favourite social bookmarking sites 
// like de.icio.us, digg etc. This was possible previously in wordpress.com posts but the methods used were tedious and time
// taking. Infact this script is the first & only code which automates placement of bookmark links in wordpress.com posts to
// maximum extent by using the power of GreaseMonkey & Javascript. Currently it's BETA b'coz i'll add more icons to it and
// also users are requested to test it for every social bookmark sites suported. Currently it supports 23 bookmark managers.
// ---------------------------------------------------------------------------
// Copyright (c) 2007, Satya Narayan Pujapanda
// http://targetlife.wordpress.com
// http://fun4mobilesblog.targetlife.com
// ---------------------------------------------------------------------------
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// You are free to modify it and redistribute but should inform 
//public that this script was created by xyz and i have modified it.
// ---------------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need 
// Mozilla Firefox or Firefox Based Browsers Like Flock AND
// Greasemonkey Firefox Extension 0.3 or Later 
// Install  From http://greasemonkey.mozdev.org/
// Then restart Firefox and again visit this script page and install this user script.
// Under Tools, there will be a new menu item  "Install User Script".
// Accept the default configuration and install it.
//
//
// --------------------------------------Code Starts From Here-------------------------------------
// ==UserScript==
// @name            Social Bookmarking Helper 4 Wordpress.com
// @namespace    http://targetlife.wordpress.com
// @description   Generates pure html code for adding many social bookmarking links (with favicons) to your wordpress.com blog post which users can click to add the blog post page to their favourite bookmarking sites like del.icio.us, digg etc..
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
var op="<a href='http://www.stumbleupon.com/submit?url="+POSTURL+"' title='Stumble Upon This Post' target='_blank'><img src='http://farm2.static.flickr.com/1370/733440891_50ed247070_m.jpg' title='Stumble Upon This Page' alt='Bookmarking Tools'/></a> <a href='http://www.digg.com/submit?phase=2&url="+POSTURL+"&title="+POSTTITLE+"' title='Submit Post to Digg' target='_blank'><img src='http://farm2.static.flickr.com/1221/733437537_ebf30b1720_m.jpg' title='Post To Digg' alt='Bookmarking Tools'/></a> <a href='http://www.netscape.com/submit/?U="+POSTURL+"&T="+POSTTITLE+"'  title='Save to Netscape' target='_blank'><img src='http://farm2.static.flickr.com/1389/733438859_5e8ee7339d_m.jpg' title='Submit To Netscape' alt='Bookmarking Tools'/></a> <a href='http://del.icio.us/post?url="+POSTURL+"&title="+POSTTITLE+"' title='Save to Del.icio.us' target='_blank'><img src='http://farm2.static.flickr.com/1246/733437281_0e295fe3bf_m.jpg' title='Submit To Del.icio.us' alt='Bookmarking Tools'/></a> <a href='http://myweb2.search.yahoo.com/myresults/bookmarklet?t="+POSTTITLE+"&u="+POSTURL+"' title='Save to Yahoo MyWeb2' target='_blank'><img src='http://farm2.static.flickr.com/1201/734299460_6de5c28c9c_m.jpg' title='Submit To Yahoo My Web 2.0' alt='Bookmarking Tools'/></a> <a href='http://reddit.com/submit?url="+POSTURL+"&title="+POSTTITLE+"' title='Save to Reddit' target='_blank'><img src='http://farm2.static.flickr.com/1181/733439565_85006a99e8_m.jpg' title='Submit To Reditt' alt='Bookmarking Tools'/></a> <a href='http://furl.net/storeIt.jsp?t="+POSTTITLE+"&u="+POSTURL+"' title='Save to Furl' target='_blank'><img src='http://farm2.static.flickr.com/1289/734296228_0b667448d6_m.jpg' title='Submit To Furl' alt='Bookmarking Tools'/></a> <a href='http://www.spurl.net/spurl.php?title="+POSTTITLE+"&url="+POSTURL+"' title='Save to Spurl' target='_blank'><img src='http://farm2.static.flickr.com/1356/734298584_48b9005700_m.jpg' title='Submit To Spurl' alt='Bookmarking Tools'/></a> <a href='http://technorati.com/faves?add="+POSTURL+"' title='Save to Technorati' target='_blank'><img src='http://farm2.static.flickr.com/1128/733441131_4254d74789_m.jpg' title='Save This Post As Technorati Favourites' alt='Bookmarking Tools'/></a> <a href='http://ma.gnolia.com/bookmarklet/add?%20url="+POSTURL+"&title="+POSTTITLE+"' title='Save to ma.gnolia' target='_blank'><img src='http://farm2.static.flickr.com/1172/733438665_91cd23063e_m.jpg' title='Submit To Ma.Gnolia' alt='Bookmarking Tools'/></a> <a href='http://blogmarks.net/my/new.php?mini=1&title="+POSTTITLE+"&url="+POSTURL+"' title='Add to Blogmarks' target='_blank'><img src='http://farm2.static.flickr.com/1012/733436865_f1b4875864_m.jpg' title='Submit To Blogmarks' alt='Bookmarking Tools'/></a> <a href='http://www.netvouz.com/action/submitBookmark?url="+POSTURL+"&title="+POSTTITLE+"' title='Save to Netvouz' target='_blank'><img src='http://farm2.static.flickr.com/1114/734297368_2c4eccacb0_m.jpg' title='Submit To Netvouz' alt='Bookmarking Tools'/></a> <a href='http://www.rawsugar.com/pages/tagger.faces?turl="+POSTURL+"&tttl="+POSTTITLE+"' title='Save to RawSugar' target='_blank'><img src='http://farm2.static.flickr.com/1053/733439335_64e86b6780_m.jpg' title='Submit To RawSugar' alt='Bookmarking Tools'/></a> <a href='http://www.simpy.com/simpy/LinkAdd.do?href="+POSTURL+"&title="+POSTTITLE+"' title='Save to Simpy' target='_blank'><img src='http://farm2.static.flickr.com/1373/734298318_16f27ba6d5_m.jpg' title='Submit To Simpy' alt='Bookmarking Tools'/></a> <a href='http://www.shadows.com/features/tcr.htm?url="+POSTURL+"&title="+POSTTITLE+"' title='Save to Shadows' target='_blank'><img src='http://farm2.static.flickr.com/1141/734298118_bc3297c62e_m.jpg' title='Submit To Shadows' alt='Bookmarking Tools'/></a> <a href='http://blinklist.com/index.php?Action=Blink/addblink.php&Description="+POSTTITLE+"&Url="+POSTURL+"' title='Save to BlinkList' target='_blank'><img src='http://farm2.static.flickr.com/1085/734294848_41430f5df5_m.jpg' title='Submit To BlinkList' alt='Bookmarking Tools'/></a> <a href='http://www.squidoo.com/lensmaster/bookmark?"+POSTURL+"'  title='Save to Squidoo' target='_blank'><img src='http://farm2.static.flickr.com/1145/734298766_b0c7bc3e05_m.jpg' title='Submit To Squidoo' alt='Bookmarking Tools'/></a> <a href='http://www.diigo.com/post?url="+POSTURL+"&title="+POSTTITLE+"'  title='Save to Diigo' target='_blank'><img src='http://farm2.static.flickr.com/1138/734295998_e5153ce1ca_m.jpg' title='Submit To Diigo' alt='Bookmarking Tools'/></a> <a href='http://bluedot.us/Authoring.aspx?u="+POSTURL+"&title="+POSTTITLE+"'  title='Save to Blue.Dot' target='_blank'><img src='http://farm2.static.flickr.com/1012/733437053_7cf4a03739_m.jpg' title='Submit To Bluedot' alt='Bookmarking Tools'/></a> <a href='http://www.google.com/bookmarks/mark?op=add&bkmk="+POSTURL+"&title="+POSTTITLE+"' title='Save to Google Bookmarks' target='_blank'><img src='http://farm2.static.flickr.com/1200/733438253_08e4b40f2c_m.jpg' title='Submit To Google Bookmarks' alt='Bookmarking Tools'/></a>  <a href='https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url="+POSTURL+"&title="+POSTTITLE+"&top=1' title='Save to Windows Live Favourites' target='_blank'><img src='http://farm2.static.flickr.com/1353/733438457_f91a3c7bc0_m.jpg' title='Submit To Windows Live Favourites' alt='Bookmarking Tools'/></a> <a href='http://www.newsvine.com/_tools/seed&save? u="+POSTURL+"&h="+POSTTITLE+"' title='Post To Newsvine' target='_blank'><img src='http://farm2.static.flickr.com/1283/736940019_59ffc35368_m.jpg' title='Add To Newsvine' alt='Bookmarking Tools'/></a> <a href=' http://tailrank.com/share/?text=&link_href="+POSTURL+"&title="+POSTTITLE+"' title='Add To Tailrank' target='_blank'><img src='http://farm2.static.flickr.com/1096/736940265_541007200e_m.jpg' title='Add To TailRank' alt='BookmarkingTools'/></a>";
op+="</p>";
prompt('Paste the code above at the last of post',op);

}
else{exit;}
}
var autosave=document.getElementById("autosave");

autosave.innerHTML="<br>Your Blog :"+tpt+"<br>";
GM_registerMenuCommand( 'Generate Social Code' , gencode);

