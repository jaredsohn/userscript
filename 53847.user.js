// ==UserScript==
// @name ClickableNow
// @description Make Twitter Background Images Clickable.
// @match http://twitter.com/*
// @include http://twitter.com/*
// @run-at document-start
// ==/UserScript==


var clickableNow = function () {
	return {
		init : function () {
				var loc = document.location.href;
				if(loc.toLowerCase().indexOf('://twitter.com/') > 0)
				{
					clickableNow.run();
				}
		
		},
		run : function () {
			var username = "";
			var meta = document.getElementsByTagName("meta");
			for( var i = 0; i < meta.length; i++ )
			{
				if( meta[i].name == "session-user-screen_name" )
				{
					username = meta[i].content;
				}

				if( meta[i].name == "page-user-screen_name" )
				{
					username = meta[i].content;
				}
			}
			if(username.length > 0)
			{
				JsonP('http://s3.amazonaws.com/wmcp/'+username+'.jsonp?cache='+parseInt(new Date().getTime().toString().substring(0, 10)),"clickableNowHandle");
			}
		}
	};
}();
		

window.addEventListener("load", clickableNow.init, false);


function JsonP(url,callback) {
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.innerHTML += 'function  clickableNowHandle(parms){';
				newScript.innerHTML += 'var r = parms.value.items[0];';
				newScript.innerHTML += 'if( r.areas.area && r.areas.area.length > 0 )';
				newScript.innerHTML += '{';
				newScript.innerHTML += 'for(var ndx = 0;ndx < r.areas.area.length; ndx++)';
				newScript.innerHTML += '{';
				newScript.innerHTML += 'var coords = r.areas.area[ndx].coords.split(",");';
				newScript.innerHTML += 'var anr = document.createElement("a");';
				newScript.innerHTML += 'var left = parseInt(coords[0]);';
				newScript.innerHTML += 'var top = parseInt(coords[1]);';
				newScript.innerHTML += 'var width = parseInt(coords[2]) - left;';
				newScript.innerHTML += 'var height = parseInt(coords[3]) - top;';
				newScript.innerHTML += 'anr.setAttribute("style","position:fixed;left:"+left+"px;top:"+top+"px;width:"+width+"px;height:" + height+"px;");';
				newScript.innerHTML += 'var color = "#0000FF";if(r.areas.area[ndx].color){color=r.areas.area[ndx].color}';
				newScript.innerHTML += 'anr.setAttribute("onmouseover","this.style.backgroundColor= \'" + color + "\';this.style.opacity=\'0.4\';");';
				newScript.innerHTML += 'anr.setAttribute("onmouseout","this.style.opacity=\'0\'");';				
				newScript.innerHTML += 'anr.setAttribute("class","cplink");';
				newScript.innerHTML += 'anr.setAttribute("target","_blank");';
				newScript.innerHTML += 'anr.href = r.areas.area[ndx].href;';
				newScript.innerHTML += 'anr.title = anr.href;';
				newScript.innerHTML += 'document.getElementById("profile").appendChild(anr);';
				newScript.innerHTML += '}';
				newScript.innerHTML += 'var div = document.createElement("div");';
				newScript.innerHTML += 'div.style.position = "fixed";';
				newScript.innerHTML += 'div.style.left = "0px";';
				newScript.innerHTML += 'div.style.top = "0px";';
				newScript.innerHTML += 'div.innerHTML = "Clickable";';
				newScript.innerHTML += 'div.style.color = "#FFFFFF";';
				newScript.innerHTML += 'div.style.backgroundColor = "#000000";';
				newScript.innerHTML += 'div.style.fontFamily = "Arial";';
				newScript.innerHTML += 'div.style.fontSize = "10px";';
				newScript.innerHTML += 'div.style.padding = "2px";';
				newScript.innerHTML += 'document.getElementById("profile").appendChild(div);';
				newScript.innerHTML += '}}';
				document.getElementsByTagName("head")[0].appendChild(newScript);
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = url;
				document.getElementsByTagName("head")[0].appendChild(newScript);
}


var SUC_script_num = 53847; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
