// ==UserScript==
// @name           Another Facebook Ad Remover
// @namespace      http://www.pc-gizmos.com
// @description       Hides Facebook ads in sidebar and timeline (sponsored posts). Using the great work done in Facebook AdRemover by code-bude.net
// @updateURL       http://userscripts.org/scripts/source/153974.meta.js
// @downloadURL       http://userscripts.org/scripts/source/153974.user.js
// @version        1.0.2
// @grant            metadata
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*.facebook.com/ajax/*
// ==/UserScript==

var FAR_savedSeconds ;
function FAR_removeSponsoredPosts() 
{
	//-------------------------------------------
	// don't trigger on each DOMNodeInserted ... do it each 1 second ...
	var FAR_curSeconds = new Date().getSeconds(); 	
	if(FAR_savedSeconds == FAR_curSeconds )
	{		
		return;
	}	
	FAR_savedSeconds = FAR_curSeconds;
	//-------------------------------------------
	
    var nodes = document.body.getElementsByClassName('clearfix storyContent');
    if (nodes != null && typeof nodes !== "undefined" ) 
	{        
		for (var i = 0; i < nodes.length; i++) {            
            if (nodes[i].innerHTML.indexOf("href=\"/about/ads\"") != -1)
            {                
                var adText = '<div style="border:2px dashed #3B5897;">' + nodes[i].innerHTML.replace("href=\"/about/ads\"","").replace("Empfohlener Beitrag","").replace("Suggested Donation","") + '</div>';                
                var ts = 'adRemoved_' + (new Date().getTime());
                var adRemovedDiv = '<div id="'+ts+'" style="font-family:\'Helvetica\',sans-serif;font-size:12px;text-align:center;background-color:#E0E4EE; border:2px dashed #3B5897;margin-top: 15px;margin-bottom:5px;padding:3px;">';
                adRemovedDiv += '<table><tbody><tr><td>Ad removed by <a href="http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html" target="_blank">Block Facebook Ads </a>&nbsp;&nbsp;</td>';
				adRemovedDiv += '<td><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2Fwindows%2Fpc-gizmos%2F3260-20_4-10209477.html&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=recommend&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe></td>';
                adRemovedDiv += '<td>&nbsp;&nbsp;<input type="button" value="Show Ad" onClick="var adEl = document.getElementById(\''+ts+'_orig\'); if (this.value == \'Show Ad\'){this.value=\'Hide Ad\'; adEl.style.display=\'block\';}else{this.value=\'Show Ad\'; adEl.style.display=\'none\';}" style="cursor:pointer;background:#3B5998;background:-moz-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3B5998),color-stop(100%,#29447E));background:-webkit-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-o-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-ms-linear-gradient(top,#3B5998 0%,#29447E 100%);background:linear-gradient(top,#3B5998 0%,#29447E 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#3B5998\',endColorstr=\'#29447E\',GradientType=0);padding:3px 8px;color:#fff;font-family:\'Helvetica\',sans-serif;font-size:11px;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;border:1px solid #29447E"/></td></tr></table>'
                adRemovedDiv += '</div><div id="'+ts+'_orig" style="display:none;">'+adText+'</div>';
                
                nodes[i].innerHTML = adRemovedDiv;             
            }
		}
	}
    
	var uiStreamAdditionalLogging = document.body.getElementsByClassName('uiStreamAdditionalLogging');
	if (uiStreamAdditionalLogging != null && typeof uiStreamAdditionalLogging !== "undefined" ) 
	{
        for (var i = 0; i < uiStreamAdditionalLogging.length; i++) 
		{
            if(uiStreamAdditionalLogging[i].innerHTML.indexOf('Sponsored')!=-1)
			{				
				var parentStory = PCG_searchParentNodeClass(uiStreamAdditionalLogging[i],"clearfix storyContent",50)
				if(!parentStory)
					continue;
				GM_log("parentStory[0].innerHTML="+parentStory.innerHTML);
				var adText = '<div style="border:2px dashed #3B5897;">' + parentStory.innerHTML.replace("Sponsored","sponsored") + '</div>';                
                var ts = 'adRemoved_' + (new Date().getTime());
                var adRemovedDiv = '<div id="'+ts+'" style="font-family:\'Helvetica\',sans-serif;font-size:12px;text-align:center;background-color:#E0E4EE; border:2px dashed #3B5897;margin-top: 15px;margin-bottom:5px;padding:3px;">';
                adRemovedDiv += '<table><tbody><tr><td>Ad removed by <a href="http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html" target="_blank">Block Facebook Ads </a>&nbsp;&nbsp;</td>';
				adRemovedDiv += '<td><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2Fwindows%2Fpc-gizmos%2F3260-20_4-10209477.html&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=recommend&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe></td>';
                adRemovedDiv += '<td>&nbsp;&nbsp;<input type="button" value="Show Ad" onClick="var adEl = document.getElementById(\''+ts+'_orig\'); if (this.value == \'Show Ad\'){this.value=\'Hide Ad\'; adEl.style.display=\'block\';}else{this.value=\'Show Ad\'; adEl.style.display=\'none\';}" style="cursor:pointer;background:#3B5998;background:-moz-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3B5998),color-stop(100%,#29447E));background:-webkit-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-o-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-ms-linear-gradient(top,#3B5998 0%,#29447E 100%);background:linear-gradient(top,#3B5998 0%,#29447E 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#3B5998\',endColorstr=\'#29447E\',GradientType=0);padding:3px 8px;color:#fff;font-family:\'Helvetica\',sans-serif;font-size:11px;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;border:1px solid #29447E"/></td></tr></table>'
                adRemovedDiv += '</div><div id="'+ts+'_orig" style="display:none;">'+adText+'</div>';
                
                parentStory.innerHTML = adRemovedDiv;  
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

document.addEventListener("DOMNodeInserted", FAR_removeSponsoredPosts, true);