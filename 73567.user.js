// ==UserScript==
// @name	Instapaper Threestyled Narrow
// @version	1.0
// @description Applies a modern interface to the Instapaper website. Provides supports for a folders view. 
// @description Optimized for a Fluid style menu bar app
// @include     http://www.instapaper.com/*
// @contributor 2009+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @contributor	2009+, Florian Holstein (http://www.unttld.co.uk/labs/instapaper-restyled)
// @contributor Javascript and CSS help: Michael Bayer (http://twitter.com/_embee)
// @contributor Original CSS replacement userscript: Jon Hicks (http://www.hicksdesign.co.uk)
// @contributor Idea to create a userstyle for Instapaper: Tim Van Damme (http://www.madebyelephant.com)
//
// ==/UserScript==
(function(){
	var b="body{background: white !important;width:300;}\
	a,a:visited,a:hover{color:rgb(68,68,68);text-decoration:none;}\
	#right_column{width:120px;float:left;position:fixed;left:12px;top:140px;}\
	#left_column{display:none;}\
	#folder_container{width:110px;font-size:10px;font-family: helvetica, sans-serif;}\
	#folders div{margin-bottom:2px !important;padding-top:1px !important;background-color:inherit !important;border-style:none !important;}\
	#folders b{display:none;}\
	#header div,.logos,.logo{display:none;}\
	#userpanel{display:none;}\
	#footer{display:none;}\
	#bookmarkListDeckAd, #download_as,#tools_container,h3.section_header{display: none;}",
a="*{margin:0;padding:0;font-size:1em;text-decoration:none;text-shadow:none;}\
body{overflow-x:hidden;margin:0 0 ;width:100%;font:13px/18px 'Helvetica Neue','Helvetica',Arial;color:#333;background-color:#b6babe;}\
#left_column{position:relative;top:18px;}\
label{display:block;}\
a[title='Read Later'], #auto_mark_as_read_container, #logo{display:none;}\
#content div a{text-shadow:1px 1px 0 #dbdbdb;color:#555555;}\
#content a[title='Read Later']{display:inline !important;}\
#content div a, #content div img a, #content div a img{border:none;}\
#content{text-shadow:#fff 0 1px 1px !important;}\
#content form{padding:30px 20px 30px 20px !important;width:90% !important;}\
#content form label{color:#343434;margin-bottom:5px;font-weight:bold;}\
#bookmark_selection{height:200px !important;}\
#content form input, #bookmark_selection{color:#262626;}\
#header{margin-bottom:0;border:none;}\
#header div{padding:0px !important;display:none;}\
#right_column{display:none;}\
#bookmarkListDeckAd, #download_as,#tools_container,h3.section_header{display: none;}\
#userpanel{width:550px !important;display:block !important;position:absolute;left:0px;background:#2E2E2E; padding:0px !important;color:#c0c0c0;margin:0;text-shadow:none; font-size:10px; font-family:'Lucida Grande',Helvetica,Arial;}\
#navigation{position:absolute;top:4px;left:10px;font:9px/12px 'Lucida Grande';}\
#header a[href='/make_printable']{display:block;position:absolute;top:0px !important;float:right;z-index:40;font-weight:bold !important;color:#737373;font:9px/12px 'Lucida Grande';left:60px;padding-top:4px !important;}\
#header div span{display:none;}\
#header a[href='/make_printable']:hover{color:#c7c7c7 !important;text-decoration:none !important;}\
#navigation a{text-shadow:none;color:#787878;font-weight:bold;}\
#content div div{margin:0 !important;padding:0;font-size:10px;color:#393939;line-height:14px;font-family:'Lucida Grande',Helvetica,Arial;}\
#content form #password_explanation, #content form #registration_explanation{text-align:center;font:10px/14px 'Lucida Grande';margin-top:10px !important;}\
#register{margin:10px 0 0 0;}\
div.tableViewCell a, #fusionad a{text-shadow:none !important;}\
.tableViewCell .titleRow{width:78%;}\
#content div.tableViewCellLast, #content div.tableViewCellFirst{-moz-border-radius-topleft:0px;-moz-border-radius-topright:0px;-moz-border-radius-bottomleft:0px;-moz-border-radius-bottomright:0px;-webkit-border-radius:0px !important;padding:0px;}\
#deckad{display:none;}\
.fusionentire{width:100%;position:relative;}\
#fusionad br, #ad_notice{display:none;}\
span.fusiontext{text-shadow:none !important;display:block;right:20px; min-width:170px;position:absolute;left:165px;top:15px;}\
span.fusionentire{position:relative;margin-top:auto;}\
.fusionentire  a{position:absolute;left:15px;width:130px;height:130px;top:15px;}\
#fusionad  a{text-shadow:none !important;text-transform:uppercase !important;color:#afafaf !important;display:block;position:absolute;left:165px;top:103px;text-decoration:none;}\
span.fusiontext a:link, span.fusiontext a:visited, span.fusiontext a:active{color:#171717 !important;font-family:'Helvetica Neue',Helvetica,Arial;font-size:14px !important;font-weight:bold; line-height:16px;}\
span.fusiontext a:hover{text-shadow:0 1px 1px #BDBDBD;text-decoration:none !important;}\
a.tableViewCellTitleLink{color:#171717 !important;font-size:14px !important;line-height:16px;font-weight:bold;font-family:'Helvetica Neue',Helvetica,Arial;}\
div.titleRow a:hover{text-shadow:0 1px 1px #BDBDBD;text-decoration:none !important;}\
#categoryHeader{width:inherit !important;position:relative !important;color:#383b35;background-color:#bde389 !important;display:block;text-shadow:0 1px 1px #eaffcb !important;font-size:12px;margin:0px !important;padding:10px 0 10px 0;text-align:center;text-transform:uppercase;}\
#categoryHeader a{color:#e8ffd7 !important;font-weight:bold !important; -moz-border-radius-topleft:4px;-moz-border-radius-topright:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius-bottomright:4px;text-shadow:0 1px 1px #333333 !important; -webkit-border-radius:4px !important;background-color:#637555;border:1px solid #5c734a;padding:5px 10px;margin:0px 7px 0 7px;}\
#categoryHeader a:hover{color: #EB282B !important;text-decoration:none !important;}\
#paginationTop{position:absolute;top:7px;left:498px;z-index:100 !important;}\
h2 span{display:none;}\
body #footer{bottom:0;font:9px/12px 'Lucida Grande';position:fixed;height:16px;right:0;padding:0px 10px 0 10px;margin:0 0 0 0;width:100%;text-align:right;z-index:99;}\
body #footer div{bottom:0;font:9px/15px 'Lucida Grande';height:16px;padding:0px 10px 0 10px;position:fixed;right:0;margin:0 0 0 0;width:100%;text-align:right;z-index:99;border-top:1px solid #8d8d8d;background:#9fa5ac;}\
#footer a{color:#555555;}\
#footer div:after{content:'Restyled by @unttld';}\
.host{color:#939393 !important;}\
.bottomRow{font-size:0px !important;margin:0 4px 0 0;}\
.bottomRow a{margin-right:5px;margin-left:10px;color:#686868;}\
div.summary{font-family:Arial,Helvetica !important;font-size:11px !important;line-height:15px !important;color:#737a81 !important;padding:10px 0 0 0 !important;}\
.sm{color:#749349 !important;margin-left:20px !important;margin-right:20px !important;font-size:11px !important;}\
.bar a{color:#e8ffd7 !important;display:block;font-weight:bold !important;-moz-border-radius-topleft:4px;-moz-border-radius-topright:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius-bottomright:4px;text-shadow:0 1px 1px #333333 !important;-webkit-border-radius:4px !important;background-color:#637555;border:1px solid #5c734a;padding:5px 10px;margin:0px 20px 0 20px;}\
.bar div{color:#bde389;}\
.bar div a{-moz-border-radius-bottomleft:4px; -moz-border-radius-bottomright:4px;-moz-border-radius-topleft:4px; -moz-border-radius-topright:4px;background-color:#637555;border:1px solid #5C734A;margin:0;padding:10px 20px 6px 20px;display:inline;}\
.bar div a:hover{color:#FFFFFF !important;text-decoration:none !important;}\
div.error, div.errors{color:#FF0000 !important;background:#ffcdba !important; -moz-border-radius-bottomleft:0px; -moz-border-radius-bottomright:0px; -moz-border-radius-topleft:0px; -moz-border-radius-topright:0px; -webkit-border-radius:0px !important;}\
div.error a{color:#FF0000 !important;}\
#story h2, #story h2 span, #story h2 a, #story h1, #story h1 span, #story h1 a, #story h3, #story h3 span, #story h3 a, #story h4 span, #story h4, #story h4 a{border:none;margin:20px 0 0 0 !important;background:none !important;padding:0px !important;text-align:left; text-transform:uppercase;text-decoration:none; font-size:13px;text-shadow:none !important;color:#333 !important;}\
#story h1{font-size:20px;line-height:22px; display:block;width:90%;}\
#story ul,#story li{list-style:none;}\
.tableViewCell .controls{width:35px !important;}\
#content div a span{font-size:12px;text-shadow:1px 1px 0 #dbdbdb;font-weight:bold;color:#555555 !important;line-height:25px;text-decoration:none !important;}\
div.tableViewCell{padding:15px !important;padding-bottom:10px !important;border-bottom:1px solid #ffffff;border-top:1px solid #b4b9bf;font-family:'Helvetica Neue','Helvetica','Arial' !important;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#d7d7d7),color-stop(0.91, #e7e7e7),color-stop(0.87, #f2f2f2),color-stop(0.75, #ffffff),color-stop(0.09, #ffffff),color-stop(0.05,  #f2f2f2),color-stop(0, #ebebeb));text-shadow:none;}\
#fusionad{position:relative !important;top:0 !important;border-top:1px solid #b4b9bf;left:0 !important;width:auto !important;height:140px;background:#FFFFFF !important;}\
.bar{width:auto !important;padding:12px 0px 7px 0px !important;margin:0px !important;background:#bde389 !important;}\
#story p{margin-top:25px;}\
#story{padding-left:100px;padding-right:100px;padding-bottom:30px;padding-top:30px;background:#FFFFFF !important;top repeat-x;font-size: 18px;line-height:22px;}\
.tableViewCell .controls .deleteButton[href^='/skip/']{background:#626262 !important}\
.tableViewCell .controls .deleteButton[href^='/delete/']{background:#626262 !important;}\
.tableViewCell .controls .ajaxActivityButton{height:20px;width:21px;margin:3px 0 0 0;}\
.tableViewCell .controls .textButton{background:#cacaca !important;}\
.tableViewCell .controls .markUnreadButton{background:#cacaca !important;}\
a,span a,a:visited{color:rgb(68,68,68) !important;text-decoration:none !important;font-weight:bold !important;text-shadow:none;}\
a:hover{color: #EB282B !important;text-decoration:none !important;}", d=String(window.location.href), c="";
if(d=="http://www.instapaper.com/u/folder"){
	c=b;
	b=document.createElement("div");
	b.setAttribute("style","visibility:visible !important;margin-bottom: 5px;margin-left: -8px;font-weight: bold;padding: 2px 8px;position:fixed !important;top:142px !important;left:12px !important;background-color: none !important;");
	a=document.createElement("img");
	a.setAttribute("src","/images/folder-tiny.png");
	a.setAttribute("style","width: 12px; height: 9px; margin-right: 6px;");
	b.appendChild(a);
a=document.createElement("a");
a.setAttribute("href","http://www.instapaper.com/");
a.appendChild(document.createTextNode("Read Later"));
b.appendChild(a);document.getElementById("folders").appendChild(b)
}else if((d!="http://www.instapaper.com/")&&(d!="http://www.instapaper.com/user")&&(d!="http://www.instapaper.com/extras")){
c=a;
}
b=document.getElementsByTagName("head");
if(b.length>0){
	a=document.createElement("style");
	a.type="text/css";
	a.appendChild(document.createTextNode(c));
	b[0].appendChild(a);
	c=document.createElement("div");
	c.id="mylink";c.innerHTML="\t\t<a href='http://www.marco.org/'>Marco Arment.</a> Restyled by <a href='http://unttld.co.uk/labs/instapaper-restyled/'>@unttld</a>. ThreeStyled by <a href='http://elasticthreads.tumblr.com'>ElasticThreads</a>";
document.getElementById("footer").appendChild(c)
}
}
)();