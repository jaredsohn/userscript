// ==UserScript==
// @name           Muxtaster
// @namespace      bjornstar
// @description    This script creates links that will allow you to download the mp3's from a muxtape
//                 Based on the awesome muxtape downloader (http://userscripts.org/scripts/show/24382) by Nemanja Stefanovic
// @include        http://*.muxtape.com/*
// @include        http://muxtape.com/*
// ==/UserScript==

function addGlobalStyle(css) {
  var elmHead, elmStyle;
  elmHead = document.getElementsByTagName('head')[0];
  elmStyle = document.createElement('style');
  elmStyle.type = 'text/css';
  elmHead.appendChild(elmStyle);
  elmStyle.innerHTML = css;
}

if(typeof GM_xmlhttpRequest === "undefined") {
	GM_xmlhttpRequest = function(/* object */ details) {
		details.method = details.method.toUpperCase() || "GET";
		
		if(!details.url) {
			throw("GM_xmlhttpRequest requires an URL.");
			return;
		}
		
		// build XMLHttpRequest object
		var oXhr, aAjaxes = [];
		if(typeof ActiveXObject !== "undefined") {
			var oCls = ActiveXObject;
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"};
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"};
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"};
		}
		if(typeof XMLHttpRequest !== "undefined")
			 aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined};
	
		for(var i=aAjaxes.length; i--; )
			try{
				oXhr = new aAjaxes[i].cls(aAjaxes[i].arg);
				if(oXhr) break;
			} catch(e) {}
		
		// run it
		if(oXhr) {
			if("onreadystatechange" in details)
				oXhr.onreadystatechange = function() { details.onreadystatechange(oXhr) };
			if("onload" in details)
				oXhr.onload = function() { details.onload(oXhr) };
			if("onerror" in details)
				oXhr.onerror = function() { details.onerror(oXhr) };
			
			oXhr.open(details.method, details.url, true);
			
			if("headers" in details)
				for(var header in details.headers)
					oXhr.setRequestHeader(header, details.headers[header]);
			
			if("data" in details)
				oXhr.send(details.data);
			else
				oXhr.send();
		} else {
			throw ("This browser is not supported, please upgrade.");
    }
	}
}

var win = typeof unsafeWindow != "undefined" ? unsafeWindow : window;

win.downloadMP3 = function (song_key, tdelay) {
  if (!tdelay)
    tdelay=0;
  window.setTimeout(function() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://'+location.hostname+'/song_entries/'+song_key+'.json',
      headers: {'X-Muxtape-Agent': 'Bandolier',
                'X-Muxtape': 'Alive',
                'Accept-Language':'mx'
      },
      onload: function(responseDetails) {
        if (responseDetails.status == '200' && responseDetails.responseText != 'HC SVNT DRACONES') {
          var j = eval('('+responseDetails.responseText+')');
          window.location.href = j['song_entry']['aws_url'];
        } else {
          alert('Muxtaster is out of date, please go to http://muxtaster.bjornstar.com/ to download an updated version.');
        }
      }
    });
  } , tdelay );
}

var header_color = '#333333';
try {
  header_color = document.styleSheets.item(1).cssRules.item(0).style.backgroundColor;
} catch (e) {

}

var muxtape_ico = 'data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADv7Ov/9PLy//Xz8v/i2db/6uXj/9rQzv/l397/x8PC/9LOzf/n4eD/2tDN/+vl4//i2NX/9PHx//Ty8f/u6+v/2s3K/+zi3//s4d7/4tPP//bw7//Wy8j/29HQ/8/Hxv/UzMv/29HQ/9XJxv/w6un/18nF/+TZ1v/k29j/29DM/8i3sP/Bta7/n5GJ/6OWj//Cta//4tTP/+TX1P/bz8v/283K/9zQzP/g1dH/5dzZ/+fe2//q4+D/7OXj/8u+uv9AMir/JBoQ/x0UDP8ZEAf/HxYO/1dNRv+zqKL/2cvF/9DBvP/Wy8b/2c7J/9rPyv/c0s7/3NHO/9jNyf/Owr7/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/EA4N/6+npf/49PL/9O3s//Tt7P/07u3/9fDu//fw7//07uz/9/Lw/wAAAP8AAAD/FBYV/wwNDf8AAAD/AAAA/wAAAP8fHBr/5+Lg//fz8v/07+7/9fDv/+zo5//p5eT/8e3s//Tw7/8MDAz/gYOC/7W3t/+wsrH/VldX/wAAAP8AAAD/AAAA/46Ihv//+vj/8u3r/9TR0f++v7//vL29/8rJyf/p5eT/bG1s/9DS0f/Z29r/2NnZ/8fIx/8zNDP/AAAA/wAAAP9KR0X///r4/+Hc2/+xs7X/zc/Q/9ze3v/ExMT/zMrK/5qbmv/R0tL///////z8/P/IyMj/amxr/wcHBf8KCQf/PDk3/+vj4//Szs7/vL6+//n5+f//////1NTU/728vP91dXT/z87O/+np6f/g4eD/srW2/zg6Ov8DAwL/BAQD/0pGQ//38e//3djX/7y7u//c3Nz/7Ozs/8XGxv/Hxsb/FBUV/5ycnP/JyMj/x8fH/2hrbP8AAAD/AAAA/wAAAP+DfXn///v6//Hs6//Szs3/wL+//8DAwP/DwsH/4t/d/wAAAP8HCAf/MzU0/ycpKP8AAAD/AAAA/wAAAP8SDwz/1dDN//Tw7//w7Ov/7uno/+Dc2//b2Nf/5uLh//Dr6P8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/oZuV//76+f/y7u3/8u3s//Pu7f/18fD/9fDv//Pv7f/y7ev/FxQO/wAAAP8AAAD/AAAA/wAAAP8mIyH/pqGf///////69vX/+fX0//j09P/49PP/+PTz//f08v/48/P/+PLy/+Db1/+gm5b/fHhy/4N+ev+yrqr/7uvo///////59fT/+fX0//j08//49PP/+PTz//fz8v/38/L/9/Py//fy8f/79fT///z7///8+v///Pr//vj3//fx7v/z7er/8+zq//Ps6v/y7Or/8Oro//Hq6P/y6+n/8uvp//Lr6f/x6+n/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
var muxtaster_style = 'background-image:url('+muxtape_ico+'); background-repeat:no-repeat; background-position:6px 0px; padding-left:28px; line-height:18px; float:right;';

addGlobalStyle('.muxtaster {'+muxtaster_style+'}');
addGlobalStyle('.muxtaster a {text-transform: uppercase;}');

var songs = document.getElementsByTagName('li');

//alert('Muxtaster is loaded, enjoy your freedom.');

window.setTimeout(function() {
  for(var i=0; i<songs.length; i++) {
    if(songs[i].id.indexOf('song') >= 0) {
      var song_key = songs[i].id.replace('song_','');		
      var song = songs[i];
      var tname = song.getElementsByTagName('div');
      var trackname = tname[0].innerHTML;
      var dl_a = document.createElement('a');
      var dl_div = document.createElement('span');

      trackname = trackname.replace(/^\s+|\s+$/g, '');
      trackname = trackname.replace(/(<([^>]+)>)/ig, '');
      trackname = trackname.replace(/–/ig, ' - ');

      dl_div.setAttribute('class','muxtaster duration');

      dl_a.setAttribute('href', "javascript:downloadMP3('"+song_key+"');");
      dl_a.setAttribute('style', 'color: '+header_color+';');
      dl_a.innerHTML="Download this mp3";
      tname[1].insertBefore(dl_div, tname[1].firstChild);
      dl_div.appendChild(dl_a);
    }
  }
}, 0);