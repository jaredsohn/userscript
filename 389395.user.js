// ==UserScript==
// @name            Xiami
// @description     Show the direct xiami link, optimized for xunlei downloader
// @source          http://userscripts.org/scripts/show/82838
// @identifier      http://userscripts.org/scripts/source/82838.user.js
// @version         0.4
// @date            2012-12-23
// @author          zoopigzoo
// @namespace       liu
// @include         http://www.xiami.com/*
// @exclude	    http://www.xiami.com/renren/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==


function removeId(id)
{
	var ad = document.getElementById(id);
	if(ad) ad.parentNode.removeChild(ad);
}

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? 

xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, 

null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

function removeClass(cls)
{
	var ads = document.getElementsByClassName(cls);
	if(!ads) return;

	for(var i=0;i<ads.length;i++){
		if(ads[i]) ads[i].parentNode.removeChild(ads[i]);
	}
}


function normalizeUlr(orgStr)
{
	var newStr = orgStr;
	newStr = newStr.replace(/%3F/g,"?");
	newStr = newStr.replace(/%3D/g,"=");
	newStr = newStr.replace(/%2C/g,",");
	newStr = newStr.replace(/%26/g,"&");
	newStr = newStr.replace(/%3A/g,":");
	newStr = newStr.replace(/%2F/g,"/");
	newStr = newStr.replace(/%26/g,"&");
	newStr = newStr.replace(/%26/g,"&");

	return newStr;
}

function urldecode( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir
    // %          note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    
    var histogram = {};
    var ret = str.toString();
    
    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };
    
    // The histogram is identical to the one in urlencode.
    histogram["'"]   = '%27';
    histogram['(']   = '%28';
    histogram[')']   = '%29';
    histogram['*']   = '%2A';
    histogram['~']   = '%7E';
    histogram['!']   = '%21';
    histogram['%20'] = '+';
 
    for (replace in histogram) {
        search = histogram[replace]; // Switch order when decoding
        ret = replacer(search, replace, ret) // Custom replace. No regexing   
    }
    
    // End with decodeURIComponent, which most resembles PHP's encoding functions
    ret = decodeURIComponent(ret);
 
    return ret;
}

function jiemi(code)
{
	var _loc9 = parseInt(code.substr(0, 1));
	var _loc7 = code.substr(1);
    var _loc5 = Math.floor(_loc7.length / _loc9);
    var _loc6 = _loc7.length % _loc9;

    var _loc2 = new Array();
	for (var _loc3 = 0; _loc3 < _loc6; _loc3++)
	{
		_loc2.push(_loc7.substr((_loc5 + 1) * _loc3, _loc5 + 1));
	}

	for (var _loc3 = _loc6; _loc3 < _loc9; ++_loc3)
	{
		_loc2.push(_loc7.substr(_loc5 * (_loc3 - _loc6) + (_loc5 + 1) * _loc6, _loc5));
	} // end of for

	var _loc4 = "";
	for (var _loc3 = 0; _loc3 < _loc2[0].length; _loc3++)
	{
		for (var _loc1 = 0; _loc1 < _loc2.length; ++_loc1)
		{
			if (_loc3 >= _loc2[_loc1].length)
				continue;
			_loc4 = _loc4 + _loc2[_loc1][_loc3];
		} // end of for
	}

	_loc4 = urldecode(_loc4);
	var _loc8 = "";
	for (var _loc3 = 0; _loc3 < _loc4.length; ++_loc3)
	{
		if (_loc4[_loc3] == '^')
		{
			_loc8 = _loc8 + "0";
			continue;
		} // end if
		_loc8 = _loc8 + _loc4[_loc3];
	} // end of for

	_loc8 = _loc8.replace(/ /g, "%20");
	
	return _loc8;
}

function getNodeCDATA(node)
{
	return node.childNodes[1].nodeValue;
} 

function dataHandler(data) {
	var xml = null;
	// Inject responseXML into existing Object (only appropriate for XML content).
	if (!data.responseXML) {
		xml = new DOMParser().parseFromString(data.responseText, "text/xml");
	} else {
		xml = data.responseXML;
	}	
	
	if(!xml) {
		console.log("NULL Return!");
      
		return;
	}
	
	var trackList = xml.getElementsByTagName("track");

	var innerString = "<div style='color:blue'>";
	for(var i=0;i<trackList.length;i++) {
		var track = trackList[i];
		var mp3Title = track.getElementsByTagName('title')[0].childNodes[0].data;
		console.log("Mp3Title:" + mp3Title);

		var artist = track.getElementsByTagName('artist')[0].childNodes[0].data;
		//console.log("artist:" + artist);

		var locationWhere = track.getElementsByTagName('location')[0].childNodes[0].data;
		//var lyrics = track.getElementsByTagName('lyric')[0].childNodes[0].data;	
		
		var jiemiUrl = jiemi(locationWhere);
        console.log(jiemiUrl);
        innerString += "<a href=\""+jiemiUrl+"\">" + mp3Title + "_" + artist +"</a>";
	    
		innerString += "<BR>";
        console.log(i);
        }
    innerString += "</div>";
	var downloadArea = document.createElement("div");
	downloadArea.id = 'zoopigzoo';
	downloadArea.style.position = 'absolute';
	downloadArea.style.top = '1000px';
	downloadArea.style.padding = '10px';
	downloadArea.style.margin = '0 15px 0 0';
	downloadArea.style.background = '#DDDDDD';
	downloadArea.innerHTML = innerString;
	//var x=document.getElementById("player-main");
    //alert(x.innerHTML);
    document.getElementById('player-main').appendChild(downloadArea);
    document.getElementById('player-main').style.overflow = 'scroll';
    
}

var currentURL = window.location.href;

//in the play mode
if(currentURL.indexOf("http://www.xiami.com/play?ids") == 0){
	var url_vars = currentURL.split("=")[1];
	var namelist_url = 'http://www.xiami.com' + normalizeUlr(url_vars);
    
    //alert(namelist_url);
  //http://www.xiami.com/song/playlist/id/29005222/type/3
	GM_xmlhttpRequest({
		method : 'get',
		url : namelist_url,
		onload : function(data) {
			dataHandler(data);
		}
	});

/*
	removeClass('blank10');
	removeClass('play_ad blank10');
	removeId('player_ad');	
    */
} else {
	//first generate url_vars
	var downloadElements = getElementsByClassName("song_download","a",document);
	var normalizedURL = "/song/playlist/id/";
	var idsInURL = "";
	var elementArray = new Array();
	for(var i=0;i<downloadElements.length;i++){
		//download('1769888606');
		var onclicktext = downloadElements[i].getAttribute('onclick');
		var stIdx = onclicktext.indexOf("'");
		if(stIdx != -1) {
			var endIdx = onclicktext.indexOf("'",stIdx+1);
			var idStr = onclicktext.substr(stIdx+1, endIdx - stIdx - 1);
			idsInURL += idStr + ",";
			
			elementArray[idStr] = downloadElements[i];
		}
	}
	if(idsInURL.length != 0) {
		idsInURL = idsInURL.substr(0,idsInURL.length - 1);
	} else {
		return;
	}
	
	normalizedURL = "/song/playlist/id/" + idsInURL + "/object_name/default/object_id/0";
	var namelist_url = 'http://www.xiami.com' + normalizedURL;
   
	GM_xmlhttpRequest({
		method : 'get',
		url : namelist_url,
		onload : function(data) {
			dataHandler(data);
		}
	});
}