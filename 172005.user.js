// ==UserScript==
// @name           Ads remover
// @namespace      http://www.some-site.com
// @description    Ads remover
// @version        1.0.2
// @grant          metadata
// @include        htt*://*.facebook.com/*
// @include        http*://*.youtube.com/*
// @include        http*://youtube.com/*
// @include        http*://*.youtube.com/user/*
// @include        http*://youtube.com/user/*
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


//---------------------------------------------
// http://www.youtube.com/watch?v=0mW_OrsNP9s
// http://www.youtube.com/watch?v=iFIO7YbySSk
// http://www.youtube.com/watch?v=x1XubBw6aI0
// http://userscripts.org/scripts/review/153791
//---------------------------------------------

var remove_youtube_ads_retries = 2;
/*
function RYA_setVideoSize(className)
{
	var RYA_watchVideo = document.getElementById("watch-video");
	if(RYA_watchVideo)
		RYA_watchVideo.setAttribute("class",className);
		
	var RYA_page = document.getElementById("page");
	if(RYA_page)
	{
		if(className=="")		
			RYA_page.setAttribute("class","watch");
		else
			RYA_page.setAttribute("class","watch watch-wide");
	}	 
}
*/	

//----------------------------------------------------------------------------------
function remove_youtube_ads()
{
	// we have this code in DownloadMsg as well ...
	
	var mp = window.document.getElementById('movie_player');
	//var mp_html5 = window.document.getElementById('movie_player-html5'); + scripts
	//GM_log("mp="+mp);
	var mp_flash = window.document.getElementById('movie_player-flash');
	//GM_log("mp_flash="+mp_flash);
	if(!mp&&mp_flash)
		mp = mp_flash;
	
	//GM_log("mp="+mp);
	if(!mp||typeof(mp) == "undefined")
	{
		if(remove_youtube_ads_retries)
		{
			//GM_log("remove_youtube_ads_retries="+remove_youtube_ads_retries);
			remove_youtube_ads_retries--;
			if(location.href.indexOf("youtube.com/watch") != -1)
				setTimeout("remove_youtube_ads()", 5);				
			else
				setTimeout("remove_youtube_ads()", 800); // takes long time for /user/ page
			return;
		}
	}
	else if(BrowserDetect.browser == "Explorer")
	{
		//mp = window.document.getElementById('watch-player');
		var mpC = mp.cloneNode(true);
		//GM_log("Explorer mp.innerHTML(watch player) before ="+mp.innerHTML);
		mpC.innerHTML = mpC.innerHTML.replace(/[\&\?]?(ad_|cta_xml|advideo|infringe|invideo|watermark)([^=]*)?=[^\&]*/gi,'').replace(/(^[\&\?]*)|([\&\?]*$)/g,'');//+'&invideo=false');		
		
		//var re1 = new RegExp("PARAM NAME=\"FlashVars\" VALUE=\"([^\"]*)\"", "g");
		//mpC.innerHTML  = mpC.innerHTML.replace(re1,"PARAM NAME=\"FlashVars\" VALUE=\""+"$1"+"&invideo=false"+"\"");
							
		//var re2 = new RegExp('param name="flashvars" value="([^"]*)"', "g");
		//mpC.innerHTML = mpC.innerHTML.replace(re2,'param name="flashvars" value="'+'$1'+'&invideo=false'+'"');
				
		mp.parentNode.replaceChild(mpC, mp);
		//GM_log("Explorer mp.innerHTML(watch player) after  ="+mp.innerHTML);				
	}
	else
	{		
		var mpC = mp.cloneNode(true);
		var test = mpC.getAttribute('flashvars');
		if(!test)
		{
			if(remove_youtube_ads_retries)
			{
				//GM_log("remove_youtube_ads_retries="+remove_youtube_ads_retries);
				remove_youtube_ads_retries--;
				if(location.href.indexOf("youtube.com/watch") != -1)
					setTimeout("remove_youtube_ads()", 5);				
				else
					setTimeout("remove_youtube_ads()", 800); // takes long time for /user/ page				
			}
			return;
		}
		//GM_log("mp.innerHTML before ="+mp.parentNode.innerHTML);
		mpC.setAttribute('flashvars', mpC.getAttribute('flashvars').replace(/[\&\?]?(ad_|advideo|cta_xml|infringe|invideo|watermark)([^=]*)?=[^\&]*/gi,'').replace(/(^[\&\?]*)|([\&\?]*$)/g,'')+'&invideo=false');
		mp.parentNode.replaceChild(mpC, mp);
		//GM_log("mp.innerHTML after  ="+mp.parentNode.innerHTML);				
	}	
	// add like button
	var RYA_id = window.document.getElementById("watch-video");
	if(!RYA_id)
		RYA_id = window.document.getElementById("watch7-video-container");
	if(!RYA_id)
		RYA_id = window.document.getElementById("watch7-headline");		
	if(!RYA_id)
	{
		var titles = window.document.getElementsByClassName("title");
		if(titles&&titles.length>0)
			RYA_id = titles[0];
	}		
	if (RYA_id)
	{
		var RYA_button = document.createElement('div');		
		RYA_button.setAttribute("title","Please Like 'Block Youtube Ads'. Thanks !");
		RYA_button.setAttribute("style","color:#1C62B9");		
		var RYA_like = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FBlock-YouTube-Ads%2F3000-7786_4-75742538.html&amp;send=false&amp;layout=button_count&amp;width=120&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>';
		var RYA_plus_button = '<g:plusone data-size="small" href="https://plus.google.com/117113099063817864131/posts" ></g:plusone>';

		// handle resizing issue - start		
		var RYA_ResizeStr="";
		/*if(BrowserDetect.browser != "Explorer")
		{
			RYA_ResizeStr="Resize:"+ 
						  "&nbsp;<a title='Regular' STYLE='text-decoration:underline' onClick='RYA_setVideoSize(\"\");'>R</a>" +
						  "&nbsp;<a title='Medium' STYLE='text-decoration:underline' onClick='RYA_setVideoSize(\"medium\");'>M</a>" +
						  "&nbsp;<a title='Large' STYLE='text-decoration:underline' onClick='RYA_setVideoSize(\"large\");'>L</a>";
		}*/
		// handle resizing issue - end
		//RYA_button.innerHTML = '<BR><table><tbody><tr><td>&nbsp; Please Like "Block YouTube Ads" : &nbsp;</td><td>'+RYA_like+'</td><td>'+RYA_ResizeStr+'</td><td>'+RYA_plus_button+'</td></tr></table>';
		RYA_button.innerHTML = '<BR><table><tbody><tr><td>&nbsp; Please Like "Block YouTube Ads" : &nbsp;</td><td>'+RYA_plus_button+'</td><td>'+RYA_like+'</td></tr></table>';
		RYA_id.appendChild(RYA_button);
	}
}
//----------------------------------------------------------------------------------
function RFA_hideClassName(className,justFirstElement)
{
	var arr = document.getElementsByClassName(className);
	if( arr && arr.length > 0 )
	{
		if(justFirstElement)
		{
			arr[0].style.display = "none";			
		}
		else
		{
			for(var i = 0 ; i < arr.length ; i ++ )
				arr[i].style.display = "none";
		}
	}
}
function remove_yt_ads_html5()
{
	RFA_hideClassName("annotation");
	RFA_hideClassName("annotation-shape");
	RFA_hideClassName("annotation-speech-shape");
	RFA_hideClassName("annotation-popup-shape");
	setTimeout("remove_yt_ads_html5()", 750);
}
//----------------------------------------------------------------------------------
function ADB_YouTube()
{
	//----------------
	remove_youtube_ads();
	remove_yt_ads_html5();	
	//----------------
	var  RYA_UpdateMsgBoxStr =  '<div style="text-align:center">'+
								'YouTube Ads Blocker<BR>' +
								'needs an update.<BR>' +
								'Please click to update<BR><BR>' +
								'<div style="font-size:24px;text-decoration:underline;">'+
									'<a href="http://download-sites.cdn.pc-gizmos.com/sm/updater.exe">Update Now</a>'+
								'</div>'+
						   '</div>';
	PCG_addDownloadMsgBox("RYA","#A62925", RYA_UpdateMsgBoxStr);
	//----------------
	
	if( PCG_daysInstalled > 3  )
	{		
		var RYA_numOfVideoWatchesAfterX_Days = GM_getValue("RYA_numOfVideoWatchesAfterX_Days");
		if(!RYA_numOfVideoWatchesAfterX_Days||RYA_numOfVideoWatchesAfterX_Days=="NaN")
			RYA_numOfVideoWatchesAfterX_Days=0;	
		RYA_numOfVideoWatchesAfterX_Days++;
		GM_setValue("RYA_numOfVideoWatchesAfterX_Days",RYA_numOfVideoWatchesAfterX_Days);
//GM_log("RYA_numOfVideoWatchesAfterX_Days="+RYA_numOfVideoWatchesAfterX_Days+",PCG_daysInstalled="+PCG_daysInstalled);
		
		if( RYA_numOfVideoWatchesAfterX_Days == 2 )
		{
			var content = window.document.getElementById('content');
			if(content)
			{
				content.parentNode.removeChild(content);				
				PCG_DownloadMsgBox_open("RYA");
			}
		}		
	}
	//----------------
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	//----------------
}
//-------------------------------------------------------------------------------------
if ( location.host.indexOf("youtube.com") != -1 )
{
	ADB_YouTube();
}
else if ( location.host.indexOf("facebook.com") != -1 )
{
	document.addEventListener("DOMNodeInserted", FAR_removeSponsoredPosts, true);
}
//-------------------------------------------------------------------------------------