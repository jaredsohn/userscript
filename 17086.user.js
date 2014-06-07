// Uvda Video Fix. by Amir Hardon (ahardon at gmail, http://www.hardon.co.il)
// December 22nd 2007
// Copyright (c) 2007, Amir Hardon
// Released under the GPL license
// ==UserScript==
// @name          Keshet(Uvda) Video Fix
// @namespace     http://hardon.co.il
// @description   Allows viewing Uvda(keshet) website's videos
// @include       http://www.keshet-tv.com/Uvda*
// @include       http://keshet-tv.com/Uvda*
// ==/UserScript==


function CP_Play(filename){
	if(filename){
		request=new XMLHttpRequest()
		request.open("GET", filename, false);
		request.onreadystatechange = function(){
 
                if (request.readyState == 4 && request.status == 200) {
 
                        if (request.responseText){
 
                                asx=request.responseText;
                                var Reg = /<Ref href="([^"]*)"/ig;
                                Reg.exec(asx);
										  var refs = Reg.exec(asx);
										  videoaddr=refs[1];
                                
                                videotd=getVideoTd();
                                
                                videotd.innerHTML='<embed src="' + videoaddr
                                + '" width="320" height="237" />';                             
                             
                        }
                }
        };
      request.send();
	}
}

function getVideoTd(){
	var allTds, thisTd;
	allTds = document.evaluate(
   	"//td[@height='254']",
		document,
		null,
		 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	  	null);
	
   return allTds.snapshotItem(0);
   
}

function embedFunction(s) {
	document.body.appendChild(document.createElement('script'))
	.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}


embedFunction(CP_Play);
embedFunction(getVideoTd);




