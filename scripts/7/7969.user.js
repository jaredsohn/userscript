// ==UserScript==
// @name          Stickam FullScreen
// @namespace     http://thedarkman.altervista.org
// @description	  Watch stickam cams at full screen
// @include       http://*stickam.com/*
// @version       0.1
// ==/UserScript==

if  (window.location.href.match(/profile/i)!=null) {
      GM_xmlhttpRequest({  
        method:"GET",
        url:window.location.href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  
            for (var i = 0; i < lines.length; i++) { 
			var line = lines[i];  		
			if (line.indexOf('writeHostChat') != -1) { 
				addlinka(line.substring(line.indexOf('http'),line.indexOf('sessionType')+16).replace(/mini/g,'large').replace(/medium/g,'large').replace(/small/g,'large').replace(/large1/g,'large').replace('skinName=large&','skinName=large0&'));
				break;
			}		
	    }     
	  }
      });
}

function addlinka(linka)
 {
  var a = document.createElement('a');
  a.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
  a.href = linka;	
  a.innerHTML = '<br>FullScreen<br>';
  document.getElementById('profilePlayer').appendChild(a);  
}