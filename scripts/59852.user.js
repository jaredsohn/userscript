// Real-time search to Google - Powered by Collecta [bottom] user script
// version 0.1 
// 2009-10-08
// Copyright (c) 2009, Jai Ganesh. http://www.ajaxdump.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Real-time search to Google - Powered by Collecta [bottom]", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Real-time search to Google - Powered by Collecta [bottom]
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Add real time search results to Google - Powered by Collecta [Add to bottom of Google search results]
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// ==/UserScript==

var search='';
var comment='';
var commentCnt=0;
var update='';
var updateCnt=0;
var story='';
var storyCnt=0;
var photo='';
var photoCnt=0;
var maxEntries=10;

var scriptObj= document.createElement('script');
scriptObj.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
scriptObj.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scriptObj);

function jQueryLoadCheck(){
	if (typeof unsafeWindow.jQuery == 'undefined'){
		window.setTimeout(jQueryLoadCheck, 100);
	} else {
		$ = unsafeWindow.jQuery;
		jQueryLoaded();
	}
}

function jQueryLoaded() {
	search = getSearch();
	$.ajax({
		url: 'http://api.collecta.com/search/',
		data: {
			q: search,
			format: 'json',
			rpp: '10',
			api_key: 'f0f4a7ae0430f2ce6ac6f367426f4216',
		},
		dataType: 'jsonp',
		success: parseData,
	});
}

function formatTimeConverter(time){
	var result = '';
	var diff = ((new Date()).getTime() - (new Date(time)).getTime());
	$.each({
		"day":(1000 * 60 * 60 * 24),
		"hour":(1000 * 60 * 60),
		"minute":(1000 * 60),
		"second":1000}, function(stamp, value){
			if(result == '')
			{
				if(diff > (1.5 * value))
				{
					result = Math.floor(diff / value) + " " + stamp + "s ago";
				}
				else if(diff > value)
				{
					result = "1 " + stamp + " ago";
				}
			}
		});
	return result;
}

function convert_datetime(str) {
	if (str){
		 str=str.toString();
		 t = str.split('T');
		 date = t[0].split('-');
		 time=0;
		 if (t[1]) {
			 time = t[1].split(':');
		 }

		 datum= date[1] +" " + date[2] +" " + date[0] +" " + time[0]+":" +time[1]+ ":00";
		 return formatTimeConverter(datum);
	} else{
		return 0;
	}
}

function trim(str, chars) {
	str = str.replace(/&(lt|gt);/g, function (strMatch, p1){
		return (p1 == "lt")? "<" : ">";
	});
	str=str.replace(/<\/?[^>]+(>|$)/g,"");
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";

	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


function parseObj(obj){
	var key;
	var currentvalue = "";
	var cat="";
	var tmp;

	var commentLink="#";
	var storyLink="#";
	var updateLink="#";
	var photoLink="#";

	var commentTitle="-";
	var storyTitle="-";
	var updateTitle="-";
	var photoTitle="-";

	var commentPublished="-";
	var storyPublished="-";
	var updatePublished="-";

	var storySummary="-";
	var commentContent="-";
	var updateAuthor="-";
	var updateIcon="-";

	try{
		for (i=0; i<obj.length; i++){
			if (obj[i].length>2){
				if (obj[i][0]=="category"){
					tmp=obj[i][2];
					if(tmp=="story"){cat="story";}
					if(tmp=="comment"){cat="comment";}
					if(tmp=="update"){cat="update";}
					if(tmp=="photo"){cat="photo";}
				}
			}
			if (cat=="story"){
				tmp=obj[i][0];
				if (tmp=="title"){storyTitle=obj[i][2];}
				if (tmp=="published"){storyPublished=obj[i][2];}
				if (tmp=="link"){storyLink=obj[i][1].href;}
				if (tmp=="summary"){storySummary=truncate(String(obj[i][2]),storyLink);}
			}

			if (cat=="photo"){
				tmp=obj[i][0];
				if (tmp=="link"){if(obj[i][1].type.indexOf("image")>=0){photoLink=obj[i][1].href; }}
				if (tmp=="title"){photoTitle=obj[i][2]; }
			}

			if (cat=="update"){
				tmp=obj[i][0];
				if (tmp=="title"){updateTitle=obj[i][2];}
				if (tmp=="published"){updatePublished=obj[i][2];}
				if (tmp=="link"){updateLink=obj[i][1].href;}
				if (tmp=="source"){updateAuthor=String(obj[i][2][3][2][0][2]);}
				if (tmp=="icon"){updateIcon=obj[i][2][4][2];}
			}
			if (cat=="comment"){
				tmp=obj[i][0];
				if (tmp=="title"){commentTitle=String(obj[i][2]);}
				if (tmp=="published"){commentPublished=obj[i][2];}
				if (tmp=="link"){commentLink=obj[i][1].href;}
				if (tmp=="content"){
					if (obj[i][2]!="undefined" || obj[i][2]!="object"){
						commentContent=truncate(String(obj[i][2]),commentLink);
					}else{
						commentContent=truncate(String(obj[i][2][3][2][0][2]),commentLink);
					}
				}
			}
		}
		if (cat=="story"){
			if (storyCnt<maxEntries){
				storyCnt=storyCnt+1;
				story = story + '<div style="border-bottom:1px dashed #ccc;padding-bottom:2px;"></div><table class="ts"><tr><td class="tResItem" valign="top" style="padding-top:3px"><a href="' + storyLink + '">'+storyTitle + '</a> - '+convert_datetime(storyPublished) + '<br/>'+storySummary+'</td></tr></table>';
			}
		}
		if (cat=="comment"){
			if (commentCnt<maxEntries){
				commentCnt=commentCnt+1;
				comment = comment+ '<div style="border-bottom:1px dashed #ccc;padding-bottom:2px;"></div><table class="ts"><tr><td class="tResItem" valign="top" style="padding-top:3px"><a href="' + commentLink + '">'+commentTitle + '</a> - '+convert_datetime(commentPublished) + '<br/>'+commentContent+'</td></tr></table>';
			}
		}
		if (cat=="update"){
			if (updateCnt<maxEntries){
				updateCnt=updateCnt+1;
				update = update + '<div style="border-bottom:1px dashed #ccc;padding-bottom:2px;"></div><table class="ts"><tr><td class="tResItem" valign="top" style="padding-top:3px"><a href="' + updateLink + '" target="_blank">'+ updateTitle+'</a><br/>by '+ updateAuthor+ ' '+convert_datetime(updatePublished)+'</td></tr></table>';			
			}
		}
		if (cat=="photo"){
			if (photoCnt<5){
				photoCnt=photoCnt+1;
				photo = photo + '<td valign="top" style="padding-top:5px;padding-right:10px;font-size:78%;line-height:normal;width:75px;text-align:center"><a href="' + photoLink + '" target="_blank"><img style="border:none;" src="' + photoLink + '" height="75" alt="' + photoTitle + '" /></a></td>';			
			}
		}

	}catch(e){
		//ignore
		//alert("alert");
	}
}

function truncate(trunc,link){
	var len = 140;
	trunc = trim(trunc);
	if (trunc.length>0) {
	  if (trunc.length > len) {
		trunc = trunc.substring(0, len);
		trunc = trunc.replace(/\w+$/, '');
		trunc += '<a href="' + link +'" target="_blank">' +'...<\/a>';
		return trunc;
	  }else{
		return trunc;
	  }
	}
}

function parseData(obj)	{
	var results = obj.results;
	var alreadypresent = false;

	while(results.length==2){
		parseObj(results[0]);
		results = results[1];
	}

	var theRes = document.getElementById('res');
	if (theRes) {
		var tp = document.createElement("ol");
		tp.id="realtimeSearch";
//		theRes.insertBefore(tp, theRes.firstChild);
		theRes.insertBefore(tp, theRes.lastChild);
		var realtimeResults = tp.appendChild(document.createElement("li"));
		realtimeResults.className = "g";
		realtimeResults.innerHTML ="";
		realtimeResults.innerHTML = '<div id="collectaResults" style="padding:10px; border:1px solid #ccf; background:#F0F7F9; -moz-border-radius: 4px;"><h3><a href="http://www.collecta.com/#q='+search+'" target="_blank">Real time search results for <em>'+search+'</em> <img src="http://developer.collecta.com/collecta-16x184.png" alt="Powered by Collecta" style="border:0px"/></a></h3> <br/><div class="tabcontent" id="cont-1-1">'+ update +'</div><div class="tabcontent hide" id="cont-2-1"> '+ comment +'</div> <div class="tabcontent hide" id="cont-3-1">'+ story +'</div> <div class="tabcontent hide" id="cont-3-1"> <div style="border-bottom:1px dashed #ccc;padding-bottom:2px;"></div><table class="ts"><tr>'+ photo +'</tr></table></div><br /><a href="http://www.collecta.com/#q='+search+'" target="_blank">>> See more real-time search results'+'</a></div></div>';				
	}
}


function getRealtimeresults(search) {
	var prevRes = document.getElementById('realtimeSearch');
	if (prevRes){
		prevRes.innerHTML=""; 
		comment='';
		update='';
		story='';
		photo='';
		commentCnt=0;
		updateCnt=0;
		photoCnt=0;
		storyCnt=0;
	}
	jQueryLoadCheck();
}

function getURL() {
  var tld = new RegExp("https?://www\.google\.[a-z\.]*/.*");
  return tld.test(document.location.href) && document.getElementById('res');
}

function searchDecode (search) {
  search = decodeURIComponent(search.replace(/\+/g,  " "));
  return search;
}

function urlParser(url){
	var variables=(url.slice(1));

	var valPairs = variables.split("&");
	var tVar = "q";

	for(var i = 0; i < valPairs.length; i++){
		var pos = valPairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = valPairs[i].substring(0,pos);
		var val = valPairs[i].substring(pos+1);
		if (argname == tVar){
			var str = val
			{break}
		}
	}
	return str;
}

function getSearch(){
	var url=window.location.href;
	var str = urlParser(url);
	if (typeof str == 'undefined'){
		url = window.location.search;
		str = urlParser(url);
	}
	return(searchDecode(str));
}

var addRealtimesearch = false;
function updateRealtimesearch() {
  if (addRealtimesearch) return;
  if (!getURL()) return;

  search = getSearch();
  getRealtimeresults(search);
  addRealtimesearch = true;
}

(function() {
  document.addEventListener('DOMAttrModified', function (event) {
    if (event.target.id == 'foot') {
      if (document.getElementById('foot').style.visibility == 'visible' ) {
        updateRealtimesearch();
      } else {
        addRealtimesearch = false;
      }
    }
  }, false);

  updateRealtimesearch();
})();



