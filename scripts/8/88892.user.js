{\rtf1\ansi\ansicpg1252\cocoartf949\cocoasubrtf540
{\fonttbl\f0\fswiss\fcharset0 ArialMT;\f1\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green3\blue153;}
\paperw11900\paperh16840\margl1440\margr1440\vieww23520\viewh17360\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs22 \cf0 // ==UserScript==
\f1\fs32 \

\f0\fs22 // @name \'a0\'a0\'a0\'a0\'a0\'a0	Milicia DP
\f1\fs32 \

\f0\fs22 // @namespace \'a0	www.erepublik.com
\f1\fs32 \

\f0\fs22 // @description	Ultimas Noticias Milicia DP
\f1\fs32 \

\f0\fs22 // @date \'a0\'a0\'a0\'a0\'a0\'a0	2010-10-25
\f1\fs32 \

\f0\fs22 // @version \'a0\'a0	1.0
\f1\fs32 \

\f0\fs22 // @Author \'a0\'a0	ispencer
\f1\fs32 \

\f0\fs22 // @include \'a0\'a0\'a0	http://www.erepublik.com/*
\f1\fs32 \

\f0\fs22 // By Isidro L. Spencer
\f1\fs32 \

\f0\fs22 // Under LGPL License
\f1\fs32 \

\f0\fs22 // No modification/copy without author's con-sentiment
\f1\fs32 \

\f0\fs22 // ==/UserScript==
\f1\fs32 \
\

\f0\fs22 (function(undefined)
\f1\fs32 \

\f0\fs22 \{
\f1\fs32 \

\f0\fs22 	var VERSION = '1';
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0var botProfileName = document.getElementById('miniprofile').getElementsByTagName('a')[1].innerHTML;
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0var botName = '';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0botName = botProfileName;
\f1\fs32 \
\
\

\f0\fs22 var url = 'https://docs.google.com/document/edit?id=1VxXiBxw4DiXzM5PmWixTOIvfoI-DGHOcManWnjdz3J4&hl=en&authkey=CJXQ0ls';\
\

\f1\fs32 \
\

\f0\fs22 var updateUrl = \cf2 \ul \ulc2 'http://userscripts.org/scripts/show/86523';\
\
\pard\pardeftab720\ql\qnatural

\f1\fs32 \cf0 \ulnone \
\
\pard\pardeftab720\ql\qnatural

\f0\fs22 \cf0 var images = ["http://forum.erepublik.com/images/statusicon/thread_new-30.png", "/images/parts/icon_military_134.gif", "/images/parts/icon_military_93.gif", "/images/parts/info-ico.gif", "/images/parts/invalid-round.gif"];\
\pard\pardeftab720\ql\qnatural

\f1\fs32 \cf0 \
\
\pard\pardeftab720\ql\qnatural

\f0\fs22 \cf0 var toplogo = 'data:image/jpg;base64,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';\
\pard\pardeftab720\ql\qnatural

\f1\fs32 \cf0 \
\
\pard\pardeftab720\ql\qnatural

\f0\fs22 \cf0 	var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
\f1\fs32 \

\f0\fs22 	var isOp = window.opera?true:false;
\f1\fs32 \

\f0\fs22 	var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;
\f1\fs32 \
\
\

\f0\fs22 	function parseData(s)
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	function splitLinks(s)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var slinks = '';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var c = s.split('#');
\f1\fs32 \

\f0\fs22 			 for(var i=0; i<c.length; ++i)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	vv = c[i].split('|');
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	slinks += '<span style="font-size: 13px; font-weight: bold;"><a href="'+vv[1]+'" target="_blank">'+vv[0]+'</a></span>&nbsp;&nbsp;&nbsp;';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	if(i%2 == 1)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	slinks += '<br/>';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	return slinks;
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	try
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var d=s;
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var date \'a0\'a0= d.match(/Date:\\s*(.+?)##/)[1];
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var mon	= d.match(/Newspaper:\\s*(.+?)##/)[1];
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var links \'a0= d.match(/Links:\\s*(.+?)#/)[1];
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var party_news = d.match(/News:\\s*(.+?##)/)[1];
\f1\fs32 \

\f0\fs22  \'a0\'a0		 var img = party_news.match(/\\\{([1-5])\\\}:\\s*(.+?)##/)[1];
\f1\fs32 \
\

\f0\fs22  \'a0\'a0		 party_news = party_news.match(/\\\{([1-5])\\\}:\\s*(.+?)##/)[2];
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	mon = '<a href="'+mon+'" target="_blank">Boletin Oficial Democracia-Plural</a>';
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	var slinks = splitLinks(links);
\f1\fs32 \

\f0\fs22  \'a0\'a0		 
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	adds = '';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	for(var i=1; i<=5; ++i)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	var alinks \'a0= (new RegExp('Links\\\\('+i+'\\\\):\\s*(.+?)##')).exec(d);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	var aparty_news = (new RegExp('News\\\\('+i+'\\\\):\\s*(.+?)##')).exec(d);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	if(alinks == null || aparty_news == null)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	break;
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	adds += '<p style="color: #000000; border-top: 1px solid gray;">';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	adds += aparty_news[1] + '<br/>';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	adds += splitLinks(alinks[1]);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	adds += '</p>';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	displayFrame(party_news, slinks, adds, date, mon, images[img-1]);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	catch(e)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{\
\pard\pardeftab720\ql\qnatural

\f1\fs32 \cf0 \
\
\pard\pardeftab720\ql\qnatural

\f0\fs22 \cf0  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	displayErrFrame("Ha ocurrido un error contacta al admin del Script en el Foro de Democracia-Plural");
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	throw e;
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \
\

\f0\fs22 	function displayFrame(party_news, links, additional, date, mon, im)
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(im == undefined)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	im = images[0];
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	if(links == undefined) links = "";
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(additional == undefined) additional = "";
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(date == undefined) date = "";
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(mon == undefined) mon = "";
\f1\fs32 \

\f0\fs22  \'a0\'a0	 
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	var party_newsDiv = document.createElement('div');
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	party_newsDiv.className = 'box';
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	party_newsDiv.innerHTML = '\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	<div class="title" align="center"><img class="topimg" src="'+toplogo+'" alt=""/>\\
\f1\fs32 \

\f0\fs22  \'a0\'a0	 <h2 style="font-size: x-large;" id="PartyLN">Noticias de la Milicia</h2></div>\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	<div class="shouts box">\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	<div class="item elem">\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	<div class="iconholder"><img class="test" src="'+im+'" alt=""/></div>\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	<div class="holder">\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	<p style="color: #000000; "><b>Estimado '+botName+', <br/>'+party_news+'</b><br/>'
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	+links+
\f1\fs32 \

\f0\fs22  \'a0\'a0				 '</p>'
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	+additional+
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	'<p style="border-top: 1px solid gray;"><a href="http://www.erepublik.com/en/newspaper/boletin-democracia-plural-230680/1" target="_blank">Boletin Oficial Democracia-Plural</a></p>'
\f1\fs32 \

\f0\fs22  \'a0\'a0				 'Dia '+date+
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	'</div>\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	</div>\\
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	</div>';
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	latestNews = document.getElementById('shouts');
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	latestNews.parentNode.insertBefore(party_newsDiv, latestNews);
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	function genFlash()
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	if(typeof(sIFR) == 'function')
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	sIFR.replaceElement(named(\{sSelector:"#PartyLN", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"textalign=center", sWmode:"transparent"\}));
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \
\
\

\f0\fs22  \'a0\'a0\'a0	var script = document.createElement('script');
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	script.setAttribute("type", "application/javascript");
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	script.textContent = '(' + genFlash + ')();'
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	document.body.appendChild(script);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	document.body.removeChild(script);
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \
\

\f0\fs22 	function displayErrFrame(party_news, links, additional, date, mon)
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	displayFrame(party_news, links, date, additional, mon, images[4])
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \
\

\f0\fs22 	function loadURL_GM(url, xhr)
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	url+="&sid="+Math.random();
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(xhr == undefined)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	xhr = GM_xmlhttpRequest;
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	xhr(\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	method: "GET",
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	url: url,
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	onload: function(response)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0	 //alert(response.responseText);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	parseData(response.responseText);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\},
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	onerror: function(response)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	displayErrFrame("Error "+response.status+" ("+response.statusText+")");
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\});
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \
\

\f0\fs22 	function loadURL_XHR(url, xhr)
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(xhr == undefined)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	xhr = new XMLHttpRequest();
\f1\fs32 \
\

\f0\fs22  \'a0\'a0\'a0	xhr.onreadystatechange = function()
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	if(xhr.readyState == 4)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	if(xhr.status == 200)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	parseData(xhr.responseText);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	else
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	displayErrFrame("Error "+xhr.status+" ("+xhr.statusText+")");
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\};
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	xhr.timeout = 15000;
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	xhr.ontimeout = function()
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	displayErrFrame("Ha ocurrido un error");
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\};
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	xhr.open('GET', url, true);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	xhr.send(null);
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \

\f0\fs22 	try
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	if(isFF)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	loadURL_GM(url);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	else if(isOp)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	if(typeof(opera.XMLHttpRequest)=='undefined')
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	displayErrFrame("Ha ocurrido un error");
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0	return;
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	loadURL_XHR(url, new opera.XMLHttpRequest());
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	else if(isIE)
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	loadURL_XHR(url, PRO_xmlhttpRequest());
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	else
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0\'a0\'a0\'a0\'a0	loadURL_XHR(url);
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	\}
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \

\f0\fs22 	catch(e)
\f1\fs32 \

\f0\fs22 	\{
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	displayErrFrame("Ha ocurrido un error");
\f1\fs32 \

\f0\fs22  \'a0\'a0\'a0	throw e;
\f1\fs32 \

\f0\fs22 	\}
\f1\fs32 \

\f0\fs22 \})();}