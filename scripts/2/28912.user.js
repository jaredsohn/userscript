// ==UserScript==
// @name           MySpace Alternate Music Player
// @namespace      userscripts.org
// @version        0.3
// @include        http://*.myspace.com/*
// ==/UserScript==


(function() {

	try{

		GM_addStyle('#mp3player{display:none;}');

		/***
		Code by brazil
		http://userscripts.org/scripts/show/8204
		***/
		var ID_LINK_ID = 'ctl00_cpMain_ctl01_UserBasicInformation1_hlDefaultImage';
		var XML_BASE_URL = 'http://mediaservices.myspace.com/services/media/musicplayerxml.ashx?b=';

		// -- [Application] -------------
		var id = document.getElementById(ID_LINK_ID).href.match(/friendID=(.*)/).pop();
		var url = XML_BASE_URL+id;

		/***
		End of Code by brazil
		***/

		function processResponse(text){

			var tSplit = text.split('<?xml version="1.0" encoding="iso-8859-1"?>')[1];
			var profile =  new XML(tSplit);
			/*var jsonTracklist = {

			  'title':'ZOMGBBQ!', 
			  'tracklist':[]

			}

			var i=0;
			for each(var song in profile.playlist.song){
				
				jsonTracklist.tracklist[i] = {
					
					'track':{

						'location': song.@durl,
						'image':song.@imagename,
						'title': song.@title,
						'creator':'múm',            
						'annotation':'',
						'info':'http://www.myspace.com/mumtheband'    

					}
			          
			    };
				i++;
			}
			
			jsonTracklist = jsonTracklist.toSource().toString().split('(')[1].split(')')[0];
					unsafeWindow.console.log(jsonTracklist);*/
			//var songs = profile.playlist.song;
			//unsafeWindow.console.log(songs);
			var i=0;
			var tracks = '';
			for each(var song in profile.playlist.song){

				tracks += '<track>'+
								'<title>'+profile.name+'</title>'+
								'<creator>'+song.@title+'</creator>'+
								'<location>'+song.@durl+'</location>'+
								'<image>'+song.@imagename+'</image>'+
								'<info></info>'+
								'<identifier>'+i+'</identifier>'+
							'</track>';
				i++;

			}
		
		var pathN = document.title.split('MySpace.com - ')[1];
		var tList = '<?xml version="1.0" encoding="UTF-8"?><playlist version="1" xmlns="http://xspf.org/ns/0/">'+
						'<title>'+pathN+'</title>'+
						'<creator>'+pathN+'</creator>'+
						'<annotation></annotation>'+
						'<info></info>'+
						'<location></location>'+
						'<identifier></identifier>'+
						'<image></image>'+
						'<date></date>'+
						'<trackList>'+
							tracks+
						'</trackList>'+
					'</playlist>';
				
			var newPlaya = document.createElement('embed');
			newPlaya.src="http://forboden.com/coding/flashtest/myspacealt.swf";
			newPlaya.width="438";
			newPlaya.height="283";
			newPlaya.id="newPlaya";
			newPlaya.pluginspage="http://www.macromedia.com/go/getflashplayer";
			newPlaya.type="application/x-shockwave-flash";
			newPlaya.scale="noscale";
			newPlaya.wmode="opaque";
			newPlaya.setAttribute("allowscriptaccess","always");
			newPlaya.setAttribute("allowfullscreen","true");
			newPlaya.setAttribute("flashvars","js_playlist=yes&playlist_url="+encodeURIComponent(tList)); 

			var origPlaya = document.getElementById('profile_mp3Player');
			var origPlayaC = origPlaya.firstChild;

			/*var sS = document.styleSheets;
			var newPlayaStyle = '';
			for(var i=0;i<sS.length;i++){

				if(!sS[i].href){
					var cR = sS[i].cssRules;

					for(var j=0;j<cR.length;j++){

						var o = cR[j].selectorText;
						var nR = new RegExp('object$');
						if(nR.test(o)){
						
							newPlayaStyle += cR[j].cssText.split('{')[1].split('}')[0];
							
						}

					}

				}

			}*/
			
			//http://blog.firetree.net/2005/07/04/javascript-find-position/
			  function findPosX(obj)
			  {
			    var curleft = 0;
			    if(obj.offsetParent)
			        while(1) 
			        {
			          curleft += obj.offsetLeft;
			          if(!obj.offsetParent)
			            break;
			          obj = obj.offsetParent;
			        }
			    else if(obj.x)
			        curleft += obj.x;
			    return curleft;
			  }

			  function findPosY(obj)
			  {
			    var curtop = 0;
			    if(obj.offsetParent)
			        while(1)
			        {
			          curtop += obj.offsetTop;
			          if(!obj.offsetParent)
			            break;
			          obj = obj.offsetParent;
			        }
			    else if(obj.y)
			        curtop += obj.y;
			    return curtop;
			  }
			var newStyle = 'left:'+findPosX(origPlayaC)+'px;top:'+findPosY(origPlayaC)+'px;position:absolute;';
			
			newPlaya.setAttribute('style',newStyle);
			origPlaya.removeChild(origPlayaC);
			origPlaya.appendChild(newPlaya);

		}
				
		GM_xmlhttpRequest({
			method : 'GET', 
			url : url, 
			onload : function(res){
			
				processResponse(res.responseText);
				
			}
		});

	}
	catch(e){
	
		//unsafeWindow.console.log(e);
	}
})();