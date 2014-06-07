// ==UserScript==
// @name           Facebook AdRemover by code-bude.net
// @namespace      http://www.code-bude.net
// @description	   Hides Facebook ads in sidebar and timeline (sponsored posts).
// @icon		   http://code-bude.net/downloads/facebookadremover/facebook_ad_remover_logo.png
// @updateURL	   http://userscripts.org/scripts/source/153077.meta.js
// @downloadURL	   http://userscripts.org/scripts/source/153077.user.js
// @version        2.0
// @grant 		   metadata
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*.facebook.com/ajax/*
// ==/UserScript==


function removeSponsoredPosts() {
    
    var nodes = document.body.getElementsByClassName('clearfix storyContent');
    if (nodes != null && typeof nodes !== "undefined" ) 
	{        
		for (var i = 0; i < nodes.length; i++) {            
            if (nodes[i].innerHTML.indexOf("href=\"/about/ads\"") != -1)
            {                
                var adText = '<div style="border:2px dashed #FA5858;">' + nodes[i].innerHTML.replace("href=\"/about/ads\"","").replace("Empfohlener Beitrag","") + '</div>';                
                var ts = 'adRemoved_' + (new Date().getTime());
                var adRemovedDiv = '<div id="'+ts+'" style="font-family:\'Helvetica\',sans-serif;font-size:12px;text-align:center;background-color:#F6CECE; border:2px dashed #FA5858;margin-top: 15px;margin-bottom:5px;padding:3px;">';
                adRemovedDiv += 'This ad was removed by <a href="http://code-bude.net" target="_blank">Facebook AdRemover by code-bude.net</a>&nbsp;&nbsp;';
                adRemovedDiv += '<input type="button" value="Show Ad" onClick="var adEl = document.getElementById(\''+ts+'_orig\'); if (this.value == \'Show Ad\'){this.value=\'Hide Ad\'; adEl.style.display=\'block\';}else{this.value=\'Show Ad\'; adEl.style.display=\'none\';}" style="cursor:pointer;background:#3B5998;background:-moz-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3B5998),color-stop(100%,#29447E));background:-webkit-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-o-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-ms-linear-gradient(top,#3B5998 0%,#29447E 100%);background:linear-gradient(top,#3B5998 0%,#29447E 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#3B5998\',endColorstr=\'#29447E\',GradientType=0);padding:3px 8px;color:#fff;font-family:\'Helvetica\',sans-serif;font-size:11px;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;border:1px solid #29447E"/>'
                adRemovedDiv += '</div><div id="'+ts+'_orig" style="display:none;">'+adText+'</div>';
                
                nodes[i].innerHTML = adRemovedDiv;             
            }
		}
	}
    
    
    var nodesSide = document.body.getElementsByClassName('ego_column');
    if (nodesSide != null && typeof nodesSide !== "undefined" ) 
	{
        for (var i = 0; i < nodesSide.length; i++) {
            nodesSide[i].style.display = "none";
        }
    }

}

document.addEventListener("DOMNodeInserted", removeSponsoredPosts, true);