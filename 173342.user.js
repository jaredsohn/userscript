// ==UserScript==
// @name           Facebook Album Downloader
// @namespace      John Doe
// @description    Facebook Album Downloader
// @include        http*://www.facebook.com/media/set/*
// @include        http*://www.facebook.com/*/media_set*
// @include        http*://www.facebook.com/profile.php*sk=photos*
// @include		   http://facebook-album-downloader.l.pc-gizmos.com/download-album.php
// @version        1.0.070813
// @howto_img_url http://files.pc-gizmos.com/scripts/171207.png
// ==/UserScript==
//---------------------------------------------------------------------------------
//=================================================================================
// test page : 
// -----------
// http://www.facebook.com/media/set/?set=a.10150654398527269.455817.651512268&type=3
// http://htanjo.github.io/jszip-demo/
//=================================================================================
function FDPA_post_to_url(path, params, method) 
{
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) 
	{
        if(params.hasOwnProperty(key)) 
		{
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}
//=================================================================================

function FDPA_CreateHtmlDownloadPage()
{
	var urls="";
	var FDPA_ids = document.getElementsByClassName("uiMediaThumbLarge"); 
	if( !FDPA_ids || FDPA_ids.length < 1 )
		var FDPA_ids = document.getElementsByClassName("uiMediaThumbImg");
		
	if( FDPA_ids && FDPA_ids.length > 0 )
	{		
		for ( var i = 0 ; i < FDPA_ids.length ; i++ ) 
		{		
			//GM_log("FDPA_ids[i]="+FDPA_ids[i].innerHTML);
			var FDPA_matchs = FDPA_ids[i].outerHTML.match(/url\(.*\)/);		// was innerHTML	
			if(FDPA_matchs)
			{
				var FDPA_url = FDPA_matchs[0];
				//GM_log("FDPA_url before="+FDPA_url);
				FDPA_url = FDPA_url.replace("url(","").replace(")","").replace("_a","_n").replace("&quot;","").replace("p206x206/","");					
				//GM_log("FDPA_url after="+FDPA_url);
				if(FDPA_url.indexOf("http://")!=-1||FDPA_url.indexOf("https://")!=-1)
					urls = urls + FDPA_url + " ";
			}	
		}
		if(urls!="")
		{
			GM_log("urls="+urls);
			if(BrowserDetect.browser == "Explorer")
			{
				post_url = "http://facebook-album-downloader.l.pc-gizmos.com/download-album.php?rand="+PCG_randomString();
			}
			else
			{
				post_url = "http://facebook-album-downloader.l.pc-gizmos.com/download-album.php";
			}			
			PCG_GA_recordEvent_IncrementActions("FAD");
			var actionPerformed = PCG_GA_recordEvent_OpenUserMsg("FAD",
									{ // params									 									 
									 "scriptDesc":"Facebook Album Downloader",									 
									 "google_plus":"https://plus.google.com/107937572502638119316/posts",
									 "fb_like_url":"http://download.cnet.com/FB-Album-Downloader/3000-2071_4-75938076.html"
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
			if(!actionPerformed)
			{
				FDPA_post_to_url(post_url,{"urls":urls}); 
			}
		}
	}
}

//=================================================================================
function FDPA_AddDownloadButton()
{
	var FDPA_album_id;
	
	var fbPhotoAlbumHeader = document.getElementsByClassName("fbPhotoAlbumHeader");
	if(fbPhotoAlbumHeader&&fbPhotoAlbumHeader.length>0)
		FDPA_album_id = fbPhotoAlbumHeader[0];
	else
		FDPA_album_id = document.getElementById("album_photos_pagelet");
		
	if(FDPA_album_id)
	{
		if( document.getElementById("FDPA_download_album_div") )
			return;
		var FDPA_plus_button = '<g:plusone data-size="small" href="https://plus.google.com/107937572502638119316/posts" ></g:plusone>';
		var	FDPA_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFB-Album-Downloader%2F3000-2071_4-75938076.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
		var FDPA_download_album_div = document.createElement("div");
		FDPA_download_album_div.id = "FDPA_download_album_div";	
		FDPA_download_album_div.innerHTML = "<BR><div style='color: rgb(59, 89, 152);font-size: 16px;float: right;position: relative;top: -70px;'><table><tr><td style='font-size: 13px;font-weight: bold;'>Please Share Facebook Download Album:<BR>" + FDPA_plus_button + FDPA_like_button + "</td><tr><td><a class='uiButton' style='background-color:#5871A7' onClick='FDPA_CreateHtmlDownloadPage();'>Download All Album (Original Resolution)</a></td></tr></table></div>";
		FDPA_album_id.appendChild(FDPA_download_album_div);
		
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/plusone.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	}									
}
//=================================================================================
if ( location.href.indexOf("http://facebook-album-downloader.l.pc-gizmos.com/download-album.php") != -1 )
{
	// remove all scripts in page - so we will not save them to folder as well ..
	var r = document.getElementsByTagName('script');
	for (var i = (r.length-1); i >= 0; i--) 
	{
		if(r[i].getAttribute('id') != 'a')
		{
			r[i].parentNode.removeChild(r[i]);
		}
	}
}
else
{
	document.body.addEventListener('DOMNodeInserted', FDPA_AddDownloadButton, false);
	PCG_GA_recordEvent_OnceADay("FAD");
}
//=================================================================================






/*
function FDPA_SaveAsDialogForIE(text) 
{
	if (document.execCommand) 
	{
		var oWin = window.open("about:blank", "_blank");
		oWin.document.write(text);
		oWin.document.close();
		var success = oWin.document.execCommand('SaveAs', true, "MyAlbum")
		oWin.close();
		if (!success)
		{
			alert("Sorry, your browser does not support this feature");
		}
	}
}*/
/*
function FDPA_isIE()
{
	if (navigator.userAgent.match(/MSIE/)) 
		return true;
	else
		return false;
}
function FDPA_downloadPageHeader()
{
	var FDPA_txt ="";
	if(!FDPA_isIE())
	{
		FDPA_txt = 	"please press Ctrl+S - in order to save the whole album"+"<BR>"+
					" please choose 'web page complete'"+"<BR>"+
					"you will find the images in the saved folder."+"<BR>";
	}
	return FDPA_txt;
}*/
/*
function FDPA_CreateHtmlDownloadPage()
{
	var FDPA_ids = document.getElementsByClassName("uiMediaThumbImg"); //uiMediaThumbLarge/""
	if( FDPA_ids && FDPA_ids.length > 0 )
	{
		var FDPA_HTML = FDPA_downloadPageHeader() + "<table><tbody><tr>";
		for ( var i = 0 ; i < FDPA_ids.length ; i++ ) 
		{		
			//GM_log("FDPA_ids[i]="+FDPA_ids[i].innerHTML);
			var FDPA_matchs = FDPA_ids[i].outerHTML.match(/url\(.*\)/);		// was innerHTML	
			if(FDPA_matchs)
			{
				var FDPA_url = FDPA_matchs[0];
				//GM_log("FDPA_url before="+FDPA_url);
				FDPA_url = FDPA_url.replace("url(","").replace(")","").replace("_a","_n").replace("&quot;","").replace("p206x206/","");				
				//GM_log("FDPA_url after="+FDPA_url);
				//FDPA_HTML = FDPA_HTML + "<img src='" + FDPA_url +"' height = '116' width = '149' ></img>";
				FDPA_HTML = FDPA_HTML + "<img width='100px' height='100px' src=" + FDPA_url +" style='vvisibility:hidden;' ></img>";
				//GM_log("i % 5 ="+i % 5 + ",i="+ i);
				if( i % 8 == 7 )
					FDPA_HTML = FDPA_HTML + "</tr><BR><tr>";				
			}	
		}		
		FDPA_HTML = FDPA_HTML + "</tr></tbody></table>";
		//GM_log("FDPA_HTML="+FDPA_HTML);		
		if(FDPA_isIE())
		{
			//document.body.innerHTML = document.body.innerHTML + FDPA_HTML ;
			//var success = document.execCommand('SaveAs', true, "MyAlbum.htm")
			var FDPA_iframe = document.createElement('iframe');
			FDPA_iframe.id = 'FDPA_iframe';
			document.body.appendChild(FDPA_iframe);
			FDPA_iframe.innerHTML = "<HTML><BODY>"+FDPA_HTML;
			
			FDPA_iframe.document.execCommand("SaveAs", true , "DDDD.html");
			//var fdoc = window.frames["FDPA_iframe"].document;
			//fdoc.body.appendChild(fdoc.createTextNode(FDPA_HTML));
			//fdoc.execCommand("SaveAs", true);
		
			//if (document.execCommand) 
			//{                             
			//	var oWin = window.open("about:blank", "_blank");
			//	oWin.document.write("ddddd");
			//	oWin.document.close(); 
			//	oWin.document.save="text";
			//	oWin.document.charset="UTF-8";
			//	var success = oWin.document.execCommand('SaveAs', true, "fff.html");
			//	oWin.close();             
			//	if (!success)                 
			//		alert("Sorry, your browser does not support this feature or you canceled.");         
            //}   
			
		}
		else
		{
			document.getElementsByTagName('head').innerHTML = "";
			var FDPA_HTML_htmlEl = document.getElementsByTagName("html")[0];
			FDPA_HTML_htmlEl.removeChild(document.getElementsByTagName("head")[0])		
			document.getElementsByTagName("head").innerHTML = "<title>Saved Facebook Album</title>"
			document.body.innerHTML = FDPA_HTML ;
			window.scrollTo(0, 0);
		}		
	}
}*/
