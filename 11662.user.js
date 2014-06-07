// ==UserScript==
// @name          EnjoyingGodArticleLink    
// @description	  Adds a link to the menu on www.enjoyinggodministries.com to the left of the page which opens the main article as a separate page (easier to read). The link is entitled 'View article in new Window' and will show only when there is a main article displayed.
// @include       http://www.enjoyinggodministries.com/*
// @author        richardtrimble@hotmail.com
// ==/UserScript==


var text; 
var sidebar=document.getElementById('sidebar'); 
text = sidebar.innerHTML;  
//alert(text);

//alert('create a new link');
var articlepagelink = document.createElement("a");

//alert('put text inside the link');
articlepagelink.innerHTML = 'View article in new page';

//alert('insert the link');
sidebar.insertBefore(articlepagelink, sidebar.lastChild.nextSibling);


//alert('set the link to some code to extract the article');
articlepagelink.href = "javascript:var scalex=2;var scaley = 3; var text; var headtext; var content=document.getElementById('content');var title = content.getElementsByTagName('embed')[0];var flashvar = title.getAttribute('flashvars');var style = title.getAttribute('style');var width = title.getAttribute('width');var height= title.getAttribute('height');var flashtrunc = flashvar.slice(0,flashvar.search(/textcolor/));var flashvars = flashtrunc + 'textcolor=#338191&amp;w='+scalex*width+'&amp;h='+scaley*height;title.setAttribute('flashvars',flashvars);title.setAttribute('style','width: '+scalex*width+'px; height: '+scaley*height+'px;');title.setAttribute('height',scaley*height); title.setAttribute('width',scalex*width); text = content.innerHTML;  var head=document.getElementsByTagName('head');headtext = head[0].innerHTML;imgWindow=window.open('','imgWin');imgWindow.document.write('<HTML><HEAD>'+headtext+'<STYLE type=\"text/css\"> #content {   margin-left: 10%;   margin-right: 10%;}#content h3{   color: #338191;   font-size: 2.4em;}#content h4,#content h5,#content h6{   margin: 1em 0 0.5em 0;   color: #720101;   font-size: 1.6em;   font-weight: normal;}#content p,#content ul,#content ol,#content td {   margin-bottom: 1em;   color: #464646;   font-size: 1.3em;   line-height: 1.5;}blockquote p {	margin-left: 2.5em;}#content ul{   list-style: none;}#content ul#byline{   float: left;   margin-bottom: 10px;   font-size: 1.1em;}#content ul li{   padding-left: 12px;   background: url(/images/bg_content_li.gif) no-repeat left 7px;}#content ul#tools{   padding-top: 10px;   border-top: 1px dotted #BCBCBC;}#content ul#tools li{   float: left;   margin-right: 25px;   padding: 0;   background: none;   font-size: .8462em;   text-transform: uppercase;}#content ul#tools li a{   display: block;   padding: 1px 0 0 20px;   background-position: left center;   background-repeat: no-repeat;   text-decoration: none;}#content ul#tools li#tools_email a{   background-image: url(/images/bg_tools_email.gif);}#content ul#tools li#tools_print a{   background-image: url(/images/bg_tools_print.gif);}#content a{   color: #338191;}#content a:hover{   text-decoration: none;}#content img{   float: left;   margin: 5px 10px 5px 0;   border: 1px solid #22373D;}#content img#mcms_stats{   display: none;}#content #text{   clear: both;}#content #text div{   margin-bottom: 1em;}#content #text div p{   margin: 0;}#text #prodImage {   float: right;   padding:10px;}#content .sermonbox{   margin-bottom: 20px;}#content .sermonbox h4{   margin-bottom: 5px;}#content .sermonbox p{   padding: 0;   margin: 0;}#content .sermonbox p.sermonlink{   margin-top: 10px;}#content .sermonbox p.eventtime{   margin-bottom: 0;}#content #mediabox{   float: right;   width: 125px;   padding: 5px 5px 0;   border: 1px solid #F00;   font-size: 1.1em;   list-style: none;}#content #mediabox li{   margin-bottom: 5px;   font-weight: bold;}#content #mediabox li a{   display: block;   height: 16px;   padding-left: 20px;   background-repeat: no-repeat;}#content #mediabox li#mb_print a{   background-image: url(/images/mb_print.gif);}#content #mediabox li#mb_video a{   background-image: url(/images/mb_video.gif);}#content #mediabox li#mb_download a{   background-image: url(/images/mb_download.gif);}#content #mediabox li#mb_notes a{   background-image: url(/images/mb_notes.gif);}#content #mediabox li#mb_jukebox a{   background-image: url(/images/mb_jukebox.gif);}#content #mediabox li#mb_podcast a{   background-image: url(/images/mb_podcast.gif);}span.sIFR-alternate{position: absolute;left: 0;top: 0;width: 0;height: 0;display: block;overflow: hidden;}</STYLE></HEAD><BODY style=\"font-size: 10pt\"><DIV id=\"content\">'+text+'</DIV></BODY></HTML>');imgWindow.document.close();title.setAttribute('flashvars',flashvar);title.setAttribute('style', style);title.setAttribute('height',height); title.setAttribute('width',width);";





