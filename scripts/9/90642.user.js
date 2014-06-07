// ==UserScript==
// @name           WikiReader
// @namespace      http://www.vcarrer.com
// @author         Vladimir Carrer
// @description    Improve Wikipedia Article Reading 
// @include        */wiki/*



// ==/UserScript==


  
(function(){
var h = document.getElementsByTagName("head")[0];         
var c = document.createElement('style');
c.type = 'text/css';
c.innerHTML  = 'a.stub,a.new{color:#ba0000;text-decoration:none;}#toc{border:1px solid #aaa;background-color:#f9f9f9;padding:5px;}.tocindent{margin-left:2em;}.tocline{margin-bottom:0;}div.floatright{float:right;clear:right;margin:0;position:relative;border:.5em solid White;border-width:.5em 0 .8em 1.4em;}div.floatright p{font-style:italic;}div.floatleft{float:left;margin:.3em .5em .5em 0;position:relative;border:.5em solid White;border-width:.5em 1.4em .8em 0;}div.floatleft p{font-style:italic;}div.thumb{margin-bottom:.5em;border-style:solid;border-color:White;width:auto;overflow:hidden;}div.thumb div{border:1px solid #ccc;padding:3px!important;background-color:#f9f9f9;font-size:94%;text-align:center;}div.thumb div a img{border:1px solid #ccc;}div.thumb div div.thumbcaption{border:none;padding:.3em 0 .1em 0;}div.magnify{display:none;}div.tright{float:right;clear:right;border-width:.5em 0 .8em 1.4em;}div.tleft{float:left;margin-right:.5em;border-width:.5em 1.4em .8em 0;}img.thumbborder{border:1px solid #ddd;}table.rimage{float:right;width:1pt;position:relative;margin-left:1em;margin-bottom:1em;text-align:center;}body{background:#fff;font-size:19px;font-family:Georgia,"Times New Roman",Times,serif;color:Black;width:70%;margin:0 auto;padding:0;line-height:1.6;}.noprint,div#jump-to-nav,div.top,div#column-one,#colophon,.editsection,.toctoggle,.tochidden,div#f-poweredbyico,div#f-copyrightico,li#viewcount,li#about,li#disclaimer,li#privacy,#mw-hidden-catlinks,.siteNoticeUser,.infobox{display:none;}ul{list-style-type:square;}#content{background:none;border:none!important;padding:0!important;margin:0!important;}#footer{background:white;color:black;border-top:1px solid black;}h1,h2,h3,h4,h5,h6{font-weight:bold;}p,.documentDescription{margin:1em 0!important;line-height:1.5em;}.tocindent p{margin:0 0 0 0!important;}pre{border:1pt dashed black;white-space:pre;font-size:8pt;overflow:auto;padding:1em 0;background:white;color:black;}table.listing,table.listing td{border:1pt solid black;border-collapse:collapse;}a{color:#666!important;background:none!important;padding:0!important;}a:link,a:visited{color:#520;background:transparent;text-decoration:underline;}#content a.external.text:after,#content a.external.autonumber:after{color:#666!important;}#globalWrapper{width:100%!important;min-width:0!important;}#content{background:white;color:black;}#column-content{margin:0!important;}#column-content #content{padding:1em;margin:0!important;}a,a.external,a.new,a.stub{color:black!important;text-decoration:none!important;}a,a.external,a.new,a.stub{color:#666!important;text-decoration:inherit!important;}img{border:none;}img.tex{vertical-align:middle;}span.texhtml{font-family:serif;}#siteNotice{display:none;}div.gallerybox{border:1px solid #ccc;background-color:#f9f9f9;width:150px;}div.gallerytext{overflow:visible;}table.diff{background:white;}td.diff-otitle{background:#fff;}td.diff-ntitle{background:#fff;}td.diff-addedline{background:#cfc;font-size:smaller;border:solid 2px black;}td.diff-deletedline{background:#ffa;font-size:smaller;border:dotted 2px black;}td.diff-context{background:#eee;font-size:smaller;}.diffchange{color:silver;font-weight:bold;text-decoration:underline;}';
h.appendChild(c);
})();