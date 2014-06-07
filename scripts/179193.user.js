// ==UserScript==
// @name           Video Ad Blocker
// @namespace      http://www.not-a-real-site.com
// @description    Removes video advertisements
// @include        http*://*.youtube.com/*
// @include        http*://youtube.com/*
// @include        http*://*.youtube.com/user/*
// @include        http*://youtube.com/user/*
// @copyright      John Doe
// @version        1.0.040913
// @howto_img_url  http://files.pc-gizmos.com/scripts/136519.png
// ==/UserScript==
		
// http://www.youtube.com/watch?v=0mW_OrsNP9s
// http://www.youtube.com/watch?v=iFIO7YbySSk
// http://www.youtube.com/watch?v=x1XubBw6aI0
// http://userscripts.org/scripts/review/153791

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
//----------------------------------------------------------------------------------
function remove_youtube_ads()
{
	
	// playlist
	/*
	var contextlinks = document.getElementsByClassName("yt-uix-contextlink");
	if(contextlinks&&contextlinks.length>0)
	{
		for ( var i = 0 ; i < contextlinks.length ; i++ ) 
		{		
			
			if ( contextlinks[i].tagName.toLowerCase() != "a" )
				continue;
			//GM_log("contextlinks[i].tagName="+contextlinks[i].tagName);
			//contextlinks[i].onclick = function() { remove_youtube_ads();remove_yt_ads_html5();	};
			contextlinks[i].setAttribute("onclick","remove_youtube_ads();remove_yt_ads_html5();");
		}	
	}
	*/
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
	
}
function remove_yt_ads_html5()
{
	RFA_hideClassName("annotation");
	RFA_hideClassName("annotation-shape");
	RFA_hideClassName("annotation-speech-shape");
	RFA_hideClassName("annotation-popup-shape");
	setTimeout("remove_yt_ads_html5()", 750);
}
(function()
{
	//----------------
	remove_youtube_ads();
	remove_yt_ads_html5();	
	//----------------	
	//----------------
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
	//----------------
	PCG_GA_recordEvent_IncrementActions("BYD");
	var actionPerformed = PCG_GA_recordEvent_OpenUserMsg("BYD",
						{ // params									 									 
						 "scriptDesc":"Block YouTube Ads",						 
						 "google_plus":"https://plus.google.com/117113099063817864131/posts",
						 "fb_like_url":"download.cnet.com/Block-YouTube-Ads/3000-7786_4-75742538.html"
						},
						function(daysInstalled,numOfActions_Aggr,numOfUpdates,numOfRemindMeLater,numOfShareMsgPresented)
						{
							if( daysInstalled > 2		&& 
								numOfActions_Aggr > 10  &&
								numOfUpdates < 1  		&&
								numOfRemindMeLater < 4     )
							{
								return "update1";
							}										
							else if( daysInstalled > 6 		 && 
									 numOfActions_Aggr > 20  &&
									 numOfUpdates < 2  		 &&
									 numOfRemindMeLater < 4     )
							{
								return "update2";
							}
							else if( daysInstalled > 3 		 &&
									 numOfShareMsgPresented < 1 )
							{
								return "share1";
							}
							return "";
						}
						);
	if(actionPerformed)
	{
		PCG_removeYoutubePlayerBecauseItCoverMsg();		
	}
	PCG_GA_recordEvent_OnceADay("BYD");
	/*
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
	*/
	//----------------
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	//----------------
	
	
	
})();