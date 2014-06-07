// ==UserScript==
// @name           Facebook  Video Downloader
// @namespace      http://www.not-a-real-site.com
// @description    Facebook  Video Downloader
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @copyright      John Doe
// @version        1.0.070813
// @howto_img_url http://files.pc-gizmos.com/scripts/171208.png
// ==/UserScript==

//--------------------------------------------------------------------------
var FDV_downloadLinkId = "FDV_downloadLink";
//--------------------------------------------------------------------------
function FDV_addDownloadLinkToPage(link)
{
	// don't add the link again
	var FDV_downloadLinkId = document.getElementById("FDV_downloadLinkId");
	if(FDV_downloadLinkId)
		return;
	
	// parse video name
	//-----------------
	var defaultVideoName = "";	
	// for black page
	var fbPhotoSnowliftVideoTitle = document.getElementsByClassName("fbPhotoSnowliftVideoTitle");
	if(fbPhotoSnowliftVideoTitle&&fbPhotoSnowliftVideoTitle.length)
	{
		defaultVideoName = fbPhotoSnowliftVideoTitle[0].innerHTML.replace(/^\s+|\s+$/g, "").replace(/\W/g, '_');		
	}
	// for white page
	if(defaultVideoName=="")
	{
		var fbPhotoPageHeader = document.getElementById("fbPhotoPageHeader"); 
		if(fbPhotoPageHeader)
		{
			var uiHeaderTitles = fbPhotoPageHeader.getElementsByClassName("uiHeaderTitle");
			if(uiHeaderTitles&&uiHeaderTitles.length)
			{
				defaultVideoName = uiHeaderTitles[0].innerHTML.replace(/^\s+|\s+$/g, "").replace(/\W/g, '_');		
			}
		}
	}
	if(defaultVideoName=="")
		defaultVideoName="FacebookVideo";
	
	// add link to black page	
	//-----------------------
	var fbPhotoSnowliftButtons = document.getElementById("fbPhotoSnowliftButtons");
	if(fbPhotoSnowliftButtons)
	{
		var a = document.createElement("a");
			a.setAttribute("id","FDV_downloadLinkId");
			a.setAttribute("class","buttonLink");
			a.setAttribute("style","color:#3B5998;background-color:#F6F6F6");
			a.setAttribute("href", PCG_GetFileSaveAs(link,defaultVideoName,"mp4") );
			a.innerHTML = 'Download Video';
			a.onclick = function() { FDV_onDownloadEvent(); return true; };
			
		var bottomButtonsBar = fbPhotoSnowliftButtons.getElementsByClassName("bottomButtonsBar");
		if(bottomButtonsBar&&bottomButtonsBar.length>0)
		{
			bottomButtonsBar[0].appendChild(a);			
		}
		else
		{
			fbPhotoSnowliftButtons.appendChild(a);
		}
	}	
	// add link to regular white page
	//------------------------------
	var fbPhotoPageActions = document.getElementById("fbPhotoPageActions");
	if(fbPhotoPageActions)
	{		
		var a = document.createElement("a");
		a.setAttribute("id","FDV_downloadLinkId");
		a.setAttribute("class","fbPhotosPhotoActionsItem");
		a.setAttribute("href", PCG_GetFileSaveAs(link,defaultVideoName,"mp4") );
		a.innerHTML = "<strong>Download Video</strong>";
		a.onclick = function() { FDV_onDownloadEvent(); return true; };

		fbPhotoPageActions.appendChild(a);
	}
}
//--------------------------------------------------------------------------
function FDV_main()
{
	// &type=2&theater
	var videoStages = document.getElementsByClassName("videoStage");
	if(videoStages&&videoStages.length>0)
	{
		//GM_log("videoStages[0]="+videoStages[0].innerHTML);	
		var embeds = videoStages[0].getElementsByTagName("embed");
		if(embeds&&embeds.length>0)
		{
			var flashvars = embeds[0].getAttribute("flashvars");
			//GM_log("flashvars="+flashvars);	
			flashvars = unescape(flashvars);
			//GM_log("flashvars unescape="+flashvars);	
			
			var pattern = /"sd_src":"([^"]*)"/i;
			if(flashvars.match(pattern))
			{			
				var sd_src = flashvars.match(pattern)[1];
				sd_src = sd_src.replace(/\\/g,'');	
				//GM_log("sd_src="+sd_src);	
				
				FDV_addDownloadLinkToPage(sd_src);								
			}			
		}
	}
	setTimeout("FDV_main()", 1000);	
}
//--------------------------------------------------------------------------
FDV_main();
PCG_GA_recordEvent_OnceADay("FDV");
//--------------------------------------------------------------------------
function FDV_onDownloadEvent()
{
	PCG_GA_recordEvent_IncrementActions("FDV");
	var actionPerformed = PCG_GA_recordEvent_OpenUserMsg("FDV",
									{ // params									 									 
									 "scriptDesc":"Facebook  Video Downloader",									 
									 "google_plus":"https://plus.google.com/111962950154623902377/posts",
									 "fb_like_url":"http://download.cnet.com/FB-Video-Downloader/3000-2071_4-75938077.html"
									},
								    function(daysInstalled,numOfActions_Aggr,numOfUpdates,numOfRemindMeLater,numOfShareMsgPresented)
									{
										if( daysInstalled > 0		&& 
											numOfActions_Aggr > 3   &&
											numOfUpdates < 1  		&&
											numOfRemindMeLater < 4     )
										{
											return "update1";
										}										
										else if( daysInstalled > 6 		 && 
												 numOfActions_Aggr > 6   &&
												 numOfUpdates < 2  		 &&
												 numOfRemindMeLater < 4     )
										{
											return "update2";
										}
										else if( daysInstalled > 1 		 &&
												 numOfShareMsgPresented < 1 )
										{
											return "share1";
										}
										return "";
									}
									);
}
//--------------------------------------------------------------------------