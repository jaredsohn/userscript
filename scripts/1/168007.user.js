// ==UserScript==
// @name           Facebook Link Blocker Remover
// @namespace      http://screepts.com
// @version        1.50.0
// @date           2012-01-02
// @description    Removes facebook link checker. Makes all links available to be clicked
// @include https://www.facebook.com/*
// @include http://www.facebook.com/*
// @match  https://www.facebook.com/*
// @match  http://www.facebook.com/*
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////////////////
//Updated version
(function(){       

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.text = 'try{UntrustedLink.bootstrap = function(){}}catch(err){}';
headID.appendChild(newScript);


function removeUntrust(){
    log('Remove Unblock Checking');
	var Untrust = document.getElementsByTagName("a");
        
	for(var i=0; i<Untrust.length; i++){
		if(/(ht|f)tp:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+/.exec(Untrust[i].href)){
                    
			Untrust[i].setAttribute("onmousedown","");
                        //Untrust[i].setAttribute("onclick","");
                    
		}
	}
}






function log(msg) {
//For us to debug out to browser java console
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}


try{
document.addEventListener('DOMContentLoaded', removeUntrust(), false);
}catch(err){}
})();