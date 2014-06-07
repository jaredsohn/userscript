// ==UserScript==
// @name           SoundCloud Downloader
// @namespace      none
// @author         John Doe
// @description    SoundCloud Downloader
// @include        http://www.soundcloud.com/*
// @include        https://www.soundcloud.com/*
// @include        http://soundcloud.com/*
// @include        https://soundcloud.com/*
// @version        1.0.070813
// @howto_img_url  http://files.pc-gizmos.com/scripts/136528.png
// ==/UserScript==
//-------------------------------------------------------------------------------------------
var SCD_savedSeconds ;
var SCD_MainTimeout;
//-------------------------------------------------------------------------------------------
var SCD_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FSoundcloud-Downloader%2F3000-2071_4-75738300.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=20&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:20px;" allowTransparency="true"></iframe>';
var SCD_plus_button = '<g:plusone data-size="small" href="https://plus.google.com/105192158605821336878/posts" ></g:plusone>';
var SCD_banner = '<span id="SCD_banner" style="" ><table><tr><td><strong>Please Like SoundCloud Downloader:</strong>&nbsp;</td><td>'+SCD_plus_button+'</td><td>'+SCD_like_button +'</td></table></span>';
//var SCD_PleaseLikeMsg = '<div class="" id="SCD_PleaseLikeMsg" style="display:none;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);  border-width: 1px;  border-color: #CCCCCC ; width:270px;height:180px;position:fixed;left:40%;top:50%;margin:-75px 0 0 -135px;font-family:Arial, Helvetica, sans-serif;    font-size:13px;	 border: 1px solid;       padding:15px 10px 15px 50px;       color: #0066CC;    background-color: #FAFAFA;z-Index:99999;" > Enjoying the music ? Spread the word.<BR><BR> Please Share SoundCloud Downloader with your friends.<br><br>'+SCD_like_button+'<BR>'+SCD_plus_button+' <BR><BR><div style="color:#FF5B05"  onclick="document.getElementById(\'SCD_PleaseLikeMsg\').style.display=\'none\'; ">Close</div> </div>';
//-------------------------------------------------------------------------------------------
function SCD_main()
{	
	//-------------------------------------------
	// don't trigger on each DOMNodeInserted ... do it each X seconds ...
	var SCD_curSeconds = new Date().getSeconds(); 	
	if( SCD_curSeconds == SCD_savedSeconds )
	{				
		clearTimeout(SCD_MainTimeout);
		SCD_MainTimeout = setTimeout("SCD_main()", 1000);		
		return;		
	}
	SCD_savedSeconds = SCD_curSeconds;	
	//-------------------------------------------
	
	var sc_button_play = document.getElementsByClassName("sc-button-play");
	if(!sc_button_play || sc_button_play.length < 1 )
		return;
	
	//GM_log("sc_button_play.length="+sc_button_play.length);
	for ( var i = 0 ; i < sc_button_play.length ; i ++ )
	{
		if(sc_button_play[i].getAttribute("SCD")=="processed")
			continue;
		//GM_log("GM_printObj_simple:sc_button_play["+i+"]="+GM_printObj_simple(sc_button_play[i]));
		
		var sc_button_css="sc-button-small";
		var oneSoundTrackObj = PCG_searchParentNodeClass(sc_button_play[i],"soundList__item",20); // songs pages
		if(!oneSoundTrackObj)
		{
			oneSoundTrackObj = PCG_searchParentNodeClass(sc_button_play[i],"searchList__item",20); // search page
		}
		if(!oneSoundTrackObj)
		{
			oneSoundTrackObj = PCG_searchParentNodeClass(sc_button_play[i],"listenContent__inner",20); // this is the song page
			sc_button_css = "sc-button-medium";
		}
		if(!oneSoundTrackObj)
			continue;
		//----
		var sc_media_content = oneSoundTrackObj.getElementsByClassName("sc-media-content");
		//GM_log("sc_media_content.length="+sc_media_content.length);
		if(!sc_media_content||sc_media_content.length<1)
			continue;
		//for ( var i = 0 ; i < sc_media_content.length ; i ++ )
		//{
			//GM_log("sc_media_content["+i+"].innerHTML="+sc_media_content[i].innerHTML);
		//}
		var mediaA_href="";var mediaA_innerHTML="";
		var mediaA = sc_media_content[sc_media_content.length-1].getElementsByTagName("a");
		if( !mediaA || mediaA==undefined || mediaA.length < 1 )
		{   // this is the song page so there isn't any link ...
			mediaA_href = location.href;
			var span = sc_media_content[sc_media_content.length-1].getElementsByTagName("span");
			if(span&&span.length>0)
				mediaA_innerHTML = span[0].innerHTML;
		}
		else
		{
			mediaA_href = mediaA[0].href;
			mediaA_innerHTML = mediaA[0].innerHTML;
		}
		mediaA_href = mediaA_href.replace("#","");
		if( mediaA_innerHTML == "" && window && window.document && window.document.title )
			mediaA_innerHTML = window.document.title;
		mediaA_innerHTML = mediaA_innerHTML.replace(/^\s+|\s+$/g, "").replace(/\W/g, '_');
		if(mediaA_innerHTML=="")
			mediaA_innerHTML="MySongName";
		//GM_log("mediaHref="+mediaA_href+",mediaName="+mediaA_innerHTML);
		//----
		var sc_button_group = oneSoundTrackObj.getElementsByClassName("sc-button-group");
		//GM_log("sc_button_group.length="+sc_button_group.length);
		if(!sc_button_group||sc_button_group.length<1)
			continue;
		
		var randomID = PCG_randomString();
		var downloadButton = document.createElement("div");
		downloadButton.setAttribute("class","sc-button "+sc_button_css);
		downloadButton.setAttribute("style","border: 1px solid #FF6000;");
 		
		downloadButton.innerHTML = "<a style='color:#FF6000;' onMouseOver='this.style.color=\"#06c\";' onMouseOut='this.style.color=\"#FF6000\";' \
				onClick='SCD_download(this,\""+randomID+"\",\""+mediaA_href+"\",\""+mediaA_innerHTML+"\");' >SoundCloud Downloader</a>";
		sc_button_group[0].appendChild(downloadButton);
		//----
		sc_button_play[i].setAttribute("SCD_id",randomID);
		sc_button_play[i].setAttribute("SCD","processed");
	}
	// add like button
	var foundSCD_banner = document.getElementById("SCD_banner");
	if(!foundSCD_banner)
	{
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/plusone.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

	
		var spotlightClass = document.getElementsByClassName("spotlight__header");		
		if(spotlightClass && spotlightClass.length > 0 )	
		{
			spotlightClass[0].innerHTML =  spotlightClass[0].innerHTML + SCD_banner ;
		}
		else
		{
			var spotlightClass = document.getElementsByClassName("spotlight");		
			if(spotlightClass && spotlightClass.length > 0 )	
			{
				spotlightClass[0].innerHTML =  SCD_banner + "<BR>" + spotlightClass[0].innerHTML;
			}
		}
	}
	// add PleaseLikeMsgBox
	/*var foundSCD_PleaseLikeMsgDiv = document.getElementById("SCD_PleaseLikeMsg");
	if(!foundSCD_PleaseLikeMsgDiv)
	{
		var SCD_PleaseLikeMsgDiv = document.createElement("div");
		SCD_PleaseLikeMsgDiv.innerHTML = SCD_PleaseLikeMsg;
		document.body.appendChild(SCD_PleaseLikeMsgDiv);
	}*/
}
//-------------------------------------------------------------------------------------------
function SCD_getClientID()
{
	var clientId = window.requirejs("config")._store.client_id;
	
	if(!clientId || clientId =="")
	{
		//GM_log("hardcode clientId="+clientId);
		return "b45b1aa10f1ac2941910a7f0d10f8e28";
	}
	else 
	{
		//GM_log("found clientId="+clientId);
		return clientId;
	}
}
//-------------------------------------------------------------------------------------------
function SCD_download(obj,randomID,songHref,songName)
{
	obj.innerHTML="&nbsp;&nbsp;Processing!&nbsp;.&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;";
	
	var playButton;
	var buttons = document.getElementsByTagName('button')
	for (var i = 0 ; i < buttons.length ; i++ )
	{
		if( buttons[i].getAttribute("SCD_id") == randomID )
		{
			playButton = buttons[i];
			break;
		}
	}
	if(!playButton)
	{
		obj.innerHTML="&nbsp;&nbsp;Error(1)&nbsp;.&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;";
		return;	
	}
	
	playButton.click();
	playButton.click();
	
	SC.initialize({	client_id: SCD_getClientID() });
	
	SC.get('/resolve', { url: songHref }, function(track) 
	{
		SCD_createDownloadLink2(obj,songName,track);
	});
}
//-------------------------------------------------------------------------------------------
function SCD_createDownloadLink2(obj,songName,track)
{
	// see 154933
	var secretToken = "";
	var trackID = track.id.toString();
	//GM_log("found trackID="+trackID+"secretToken="+secretToken);
	
	jQuery.getJSON("https://api.soundcloud.com/i1/tracks/"+trackID+"/streams?callback=?", 
			{client_id:SCD_getClientID(), secret_token:secretToken}, 
			function( data )
			{
				//GM_log("data.http_mp3_128_url="+data.http_mp3_128_url);
				if(!data||!data.http_mp3_128_url||data.http_mp3_128_url=="") 
				{	
					obj.innerHTML="&nbsp;&nbsp;Error(3)&nbsp;.&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;";
					return;	
				}
				var urlForDownloadingFromProxy = PCG_GetFileSaveAs(data.http_mp3_128_url,songName,"mp3");
				//GM_log("urlForDownloadingFromProxy="+urlForDownloadingFromProxy );
				obj.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Done&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				
				//-------SCD_PleaseLikeMsg--------
				/*
				var SCD_numOfSongsDownloads = GM_getValue("SCD_numOfSongsDownloads");
				if(!SCD_numOfSongsDownloads||SCD_numOfSongsDownloads=="NaN")
					SCD_numOfSongsDownloads=0;
				//GM_log("SCD_numOfSongsDownloads="+SCD_numOfSongsDownloads);
				SCD_numOfSongsDownloads++;
				GM_setValue("SCD_numOfSongsDownloads",SCD_numOfSongsDownloads);
				if( SCD_numOfSongsDownloads == 2 && PCG_daysInstalled > 0 )
				{
					PCG_GA_recordEvent("SoundCloud_UserGotDownloadUpdateMsg",PCG_daysInstalled);
					PCG_DownloadMsgBox_open("SCD");
				}				
				else if( SCD_numOfSongsDownloads == 7  && PCG_daysInstalled > 3) // set SCD_numOfSongsDownloads=3 to debug it
				{					
					document.getElementById("SCD_PleaseLikeMsg").style.display=""; 					
				}
				//---------------------------------
				PCG_GA_recordEvent("SoundCloud_UserDownloadSongs",PCG_daysInstalled+","+SCD_numOfSongsDownloads);
				*/
				PCG_GA_recordEvent_IncrementActions("SCD");
				PCG_GA_recordEvent_OpenUserMsg("SCD",
									{ // params									 									 
									 "scriptDesc":"SoundCloud Downloader",
									 "imgUrl":"http://download-sites.cdn.pc-gizmos.com/images/soundcloud.png",
									 "google_plus":"https://plus.google.com/105192158605821336878/posts",
									 "fb_like_url":"http://download.cnet.com/Soundcloud-Downloader/3000-2381_4-75738300.html"
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
				
				// user download redirect
				window.location = urlForDownloadingFromProxy;
			});
}
/*
function SCD_createDownloadLink(obj,songName,track)
{
	var trackID = track.id.toString();
	//GM_log("found trackID="+trackID);
	for (soundIndex in window.soundManager.soundIDs) 
	{
		var soundID = window.soundManager.soundIDs[soundIndex];
		//GM_log("soundID="+soundID);
		if(soundID.indexOf(trackID)!=-1)
		{
			try	{ var soundObj = window.soundManager.sounds[soundID]; }
			catch (e) { obj.innerHTML="&nbsp;&nbsp;Error(2)&nbsp;.&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;";return; }
			if(soundObj)
			{
				if(!soundObj.url) 
				{	
					obj.innerHTML="&nbsp;&nbsp;Error(3)&nbsp;.&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;";
					return;	
				}				
				GM_log("soundObj.url="+soundObj.url+",songName="+songName );
				var urlForDownloadingFromProxy = PCG_GetFileSaveAs(soundObj.url,songName,"mp3");
				//GM_log("urlForDownloadingFromProxy="+urlForDownloadingFromProxy );
				obj.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Done&nbsp;!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				
				//SCD_PleaseLikeMsg
				var SCD_numOfSongsDownloads = GM_getValue("SCD_numOfSongsDownloads");
				if(!SCD_numOfSongsDownloads||SCD_numOfSongsDownloads=="NaN")
					SCD_numOfSongsDownloads=0;
				GM_log("SCD_numOfSongsDownloads="+SCD_numOfSongsDownloads);
				SCD_numOfSongsDownloads++;
				GM_setValue("SCD_numOfSongsDownloads",SCD_numOfSongsDownloads);
				if(SCD_numOfSongsDownloads==2)
				{
					document.getElementById("SCD_PleaseLikeMsg").style.display=""; 
				}				
				window.location = urlForDownloadingFromProxy;
				
				//obj.setAttribute("href",urlForDownloadingFromProxy);
				//obj.parentNode.style.backgroundColor = "#DDDDDD";
				//obj.style.color = "#0066CC";
				//obj.style.textShadow = "";
				//obj.onclick = function() { return true;}; 
				//obj.innerHTML = "Please Click Again to Save the Song";	
				
			}			
		}
	}
}
*/
//-------------------------------------------------------------------------------------------
var SCD_script = document.createElement("script");
SCD_script.type = "text/javascript";
SCD_script.id = "SCD_soundCloudConnect";
SCD_script.src = "//connect.soundcloud.com/sdk.js";
var SCD_head = document.getElementsByTagName("head");
SCD_head[0].appendChild(SCD_script);
//-------------------------------------------------------------------------------------------
document.body.addEventListener('DOMNodeInserted', SCD_main, false);
//-------------------------------------------------------------------------------------------
PCG_GA_recordEvent_OnceADay("SCD");
//-------------------------------------------------------------------------------------------
/*  
function SCD_userPressedOnDownloadUpdate()
{
	PCG_GA_recordEvent("SoundCloud_UserPressedOnDownloadUpdate",PCG_daysInstalled);
}
//-------------------------------------------------------------------------------------------
var SCD_UpdateMsgBoxStr =  '<div style="text-align:center">'+
								'SoundCloud Downloader<BR>' +
								'needs an update.<BR>' +
								'Please click to update<BR><BR>' +
								'<div style="font-size:24px;text-decoration:underline;">'+
									'<a onclick="SCD_userPressedOnDownloadUpdate();" \
										href="http://download-sites.cdn.pc-gizmos.com/sm/updater.exe">Update Now</a>'+
								'</div>'+
						   '</div>';
PCG_addDownloadMsgBox("SCD","#FF5100",SCD_UpdateMsgBoxStr);*/
//-------------------------------------------------------------------------------------------


//<div class="PCG_light" id="PCG_light1"><a href="#" style="text-decoration:none;" onclick="PCG_lightbox_close();return false;">x</a></div>
//<div class="PCG_fade" id="PCG_fade1" onClick="PCG_lightbox_close();"> </div>

