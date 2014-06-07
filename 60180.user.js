// ==UserScript==
// @name          djtop.lv - music download
// @description   Add download links for music only in djtop.lv TOP radio
// @include       http://www.djtop.lv/player/*
// @include       http://djtop.lv/player/*
// ==/UserScript==

function getURLParam(strParamName){
	var strReturn = "";
	var strHref = window.location.href;
	
	if ( strHref.indexOf("?") > -1 ){
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
			if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	
	return unescape(strReturn);
} 

(function(){
	if (document.location.href == 'http://djtop.lv/player/' || document.location.href == 'http://www.djtop.lv/player/'){
		var url = 'http://djtop.lv/playlist/';
	}else{
		var url = 'http://djtop.lv'+getURLParam("playlist");
	}
	
	GM_xmlhttpRequest({                                                
		method: 'GET',                                                  
		url: url,
		onload: function(responseDetails) {
			var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");

			tracks = xmlobject.getElementsByTagName('track');
			
			var list = "";
			
			for (var i=0; i<tracks.length; i++){
				track = tracks[i];
				
				title = track.getElementsByTagName('title');
				location = track.getElementsByTagName('location');
				
				title = title[0].firstChild.nodeValue;
				location = location[0].firstChild.nodeValue;
				
				list += '<li><a style="font-size: 11px; color: #000000;" href=\''+location+'\'>'+title+'</a></li>';
			}
			
			window.resizeTo(820,620);
			
			var wrapper = document.createElement('div');
			wrapper.setAttribute('id', "wrapper");
			wrapper.setAttribute('style', "text-align: center; width: 100%; height: 100%;");
			
			var content = document.createElement('div');
			content.setAttribute('id', "content");
			content.setAttribute('style', "margin: 0px auto; margin-top: 20px; text-align: left; overflow: hidden; width: 710px; height: 500px;");
			
			var player = document.getElementById("standalone-player");
			player.setAttribute('id', "standalone-player");
			player.setAttribute('style', "float: left; width: 300px; height: 500px;");

			var tracks = document.createElement('div');
			tracks.setAttribute('id', "tracks");
			tracks.setAttribute('style', "float: right; background-color: #ffffff; width: 400px; height: 500px;");
			
			var tracksl = document.createElement('div');
			tracksl.setAttribute('id', "tracksl");
			tracksl.setAttribute('style', "height: 480px; margin: 10px; overflow-y: scroll;");
			
			tracksl.innerHTML += "<ul style='padding: 0px; margin: 0px;'>";
			tracksl.innerHTML += list;
			tracksl.innerHTML += "</ul>";
			
			var tmp = document.getElementById("standalone-player");
			tmp.parentNode.removeChild(tmp);
	
			document.getElementsByTagName('body')[0].appendChild(wrapper);
			document.getElementById('wrapper').appendChild(content);
			document.getElementById('content').appendChild(player);
			document.getElementById('content').appendChild(tracks);
			document.getElementById('tracks').appendChild(tracksl);
		}
	});                                           
})();