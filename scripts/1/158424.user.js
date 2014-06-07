// ==UserScript==
// @name           Pinny 
// @description    Pinny
// @version        1.0.200813
// @author         John Doe 
// @include        * 
// ==/UserScript==
//----------------------------------------------------------------------------------
var SAI_url="";
var SAI_url_alt="";
var SAI_type = "pin"; // like/pin
//----------------------------------------------------------------------------------
/*
function SAI_press_key(o,code,type)
{ 
	if(!o)
		{return;}
	type=type||"keypress";
	var e=document.createEvent('KeyboardEvent'); 
	if(typeof code=="string")
		{code=code.charCodeAt(0);} 
	if (e.initKeyboardEvent) 
	{
		e.initKeyboardEvent(type,true,true,window,code,null,null);
	}
	else if (e.initKeyEvent) 
	{
		e.initKeyEvent(type,true,true,window,false,false,false,false,false,code);  
	}
	o.dispatchEvent(e);
}*/
//----------------------------------------------------------------------------------
function SAI_getUrlParam ( sname )
{
  var params = location.href.substr(location.href.indexOf("?")+1);
  var sval = "";
  params = params.split("&");
    // split param and value into individual pieces
    for (var i=0; i<params.length; i++)
       {
         temp = params[i].split("=");
         if ( [temp[0]] == sname ) { sval = temp[1]; }
       }
  return sval;
}
//----------------------------------------------------------------------------------
function SAI_hideClassName(className,justFirstElement)
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
function SAI_hideId(idName)
{
	var id = document.getElementById(idName);
	if(id)
	{	
		id.style.display = "none";	
	}
}
//----------------------------------------------------------------------------------
function SAI_hideTagName(tagName)
{
	var tags = document.getElementsByTagName(tagName);
	if(tags&&tags.length>0)
	{	
		tags[0].style.display = "none";	
	}
}
//----------------------------------------------------------------------------------
if(location && location.href && location.href.indexOf("//m.facebook.com/home.php") != -1 )
{	
	document.body.innerHTML = "<br><br><br><center>Thanks !<BR>Please Close this window</center>";
	window.close();
}
//----------------------------------------------------------------------------------
if(location && location.href && location.href.indexOf("//m.facebook.com/#SAI") != -1 )
{	
	document.body.style.fontSize = "12px";
	document.body.style.fontFamily = "'lucida grande',tahoma,verdana,arial,sans-serif";
	//-----
	SAI_hideClassName("marquee");
	SAI_hideClassName("fbNuxMissionsBar");
	SAI_hideClassName("mHomeNewsfeed");
	SAI_hideClassName("fbBorderBottom");
	SAI_hideClassName("composerText");			
	SAI_hideId("__m_notifications__");
	SAI_hideId("footer");
	SAI_hideClassName("inv");
	SAI_hideClassName("acw apm");
	SAI_hideTagName("table");
	
	var h4 = document.getElementsByTagName("h4");
	if(h4&&h4.length>0)
	{
		for(var i = 0 ; i < h4.length ; i ++)
			h4[i].parentNode.style.display = "none";
	}
	
	var pymkLargeTitle = document.getElementsByClassName("pymkLargeTitle");
	if(pymkLargeTitle&&pymkLargeTitle.length>0)
		pymkLargeTitle[0].parentNode.style.display = "none";
	//-----
	var arr = document.getElementsByClassName("btn btnC");
	if( arr && arr.length > 0 )
	{
		arr[0].value = "Like"
	}	
	//-----
	var pic_link = decodeURIComponent(SAI_getUrlParam("pic_link"));	
	var text = "\n\n\nPicture Link:" + pic_link + "\n[ I used 'LikeInAnySite' : Download Now @ http://cnet.co/AgTSs ]" ;	
	//-----
	var composer_form = document.getElementById("composer_form");
	composer_form.innerHTML = composer_form.innerHTML.replace("What's on your mind?",
			"<span style='font-size:13px;'>Please Click the Like Button :</span> <BR><img id='pic_link' src='"+pic_link+"'><BR><span style='font-size:13px;'>You can add your own text:</span>");
	var img = document.getElementById("pic_link");
	if(img)
	{
		var s = window.getComputedStyle(img);
		var width = parseInt(s.getPropertyValue('width'), 10);
		var height = parseInt(s.getPropertyValue('height'), 10);		    		
		if(width>200 || height>200)
		{			
			img.style.width = "200px";
			img.style.height = "200px";
		}
	}	
	//-----
	var composerInput = document.getElementById("composerInput");
	if(composerInput)
	{
		composerInput.value = text;
		//window.onunload=function(){alert("ddd");window.close();};
	}
}
//----------------------------------------------------------------------------------
var lastElem;
function SAI_onMouseOver(e)
{	
	var firstElementChild=false;
	
	if(typeof e == 'object') 
	{
		if( !(window.getSelection(0).toString() && typeof document.activeElement.selectionStart == 'undefined') )
		{
			var curElm = e.target;
			//GM_log("curElm="+curElm+",curElm.tagName="+curElm.tagName+",curElm.id="+curElm.id);
			if( ( curElm.tagName == 'A' || curElm.tagName == 'DIV') && 
					curElm.firstElementChild && 
					curElm.firstElementChild.tagName == 'IMG' )				
			{
				curElm = curElm.firstElementChild;			
				firstElementChild = true;
			}
			if(curElm.tagName=="IMG")
			{
				//GM_log("IMG curElm="+curElm+",curElm.tagName="+curElm.tagName+",url="+curElm.src.substr(0,100));
				//GM_log("e.clientX="+e.clientX+",e.clientY="+e.clientY);
				//GM_log("naturalHeight="+curElm.naturalHeight+",clientHeight="+curElm.clientHeight);
				//GM_log("naturalWidth="+curElm.naturalWidth+",clientWidth="+curElm.clientWidth);
				//GM_log("style.bottom="+curElm.style.bottom+",style.right="+curElm.style.right);
				//GM_log("x="+curElm.x+",y="+curElm.y);
				//GM_log(	" curElm.offsetTop="+curElm.offsetTop+",curElm.offsetLeft="+curElm.offsetLeft+
						//",curElm.offsetWidth="+curElm.offsetWidth+",curElm.offsetHeight="+curElm.offsetHeight);			
				
				var largest = curElm, nodes = curElm.querySelectorAll('*');
				for(var i = nodes.length, n; i-- && (n = nodes[i]);) 
				{
					if(!largest || n.clientHeight > largest.clientHeight)
					largest = n;
				}
				var rect = largest.getBoundingClientRect();
				//GM_log(" rect.right="+rect.right+",rect.left="+rect.left+",rect.bottom="+rect.bottom+",rect.top="+rect.top);
						
				// very small image
				if ( (rect.bottom - rect.top ) < 50 || (rect.right - rect.left ) < 50 )
					return;
							
				var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
				var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;				
				//GM_log("x="+x+",y="+y);
				//GM_log("curElm.offsetWidth="+curElm.offsetWidth+",curElm.clientHeight="+curElm.clientHeight);
				var share_left = parseInt(rect.left,10) + parseInt(x,10) + parseInt(curElm.offsetWidth,10) - 19;
				var share_top = parseInt(rect.top,10) + parseInt(y,10) + parseInt(curElm.clientHeight,10) - 19;
				var share = document.getElementById("SAI_icon");				
				share.style.display = "";
				share.style.left = share_left+"px";
				share.style.top = share_top+"px";				
				/*if( SAI_url != curElm.src) // new image
				{
					var share_win = document.getElementById("shareAllImages_win");				
					share_win.style.display = "none";
				}*/				
				//if(firstElementChild)
				//	lastElem = curElm.parentNode;
				//else
					lastElem = curElm;
					
				SAI_url = curElm.src;				
				SAI_url_alt = curElm.alt;				
			}			
			if(lastElem&&lastElem.style/*&&lastElem.style.display/*&&lastElem.style.display=="none"*/)
			{
				//GM_log("lastElem.style.top="+lastElem.style.top+",lastElem.style.left="+lastElem.style.left);
				//GM_log("lastElem.src="+lastElem.src+",lastElem.alt="+lastElem.alt);
				
				//GM_log("lastElem.offsetWidth="+lastElem.offsetWidth+",lastElem.clientHeight="+lastElem.clientHeight);
				//GM_log("lastElem.tagName="+lastElem.tagName);
				//GM_log("e.target.tagName="+e.target.tagName+",e.target.offsetWidth="+e.target.offsetWidth+",e.target.clientHeight="+e.target.clientHeight);
				if( e.target.id != "SAI_icon")
				{
					if(e.target.offsetWidth != lastElem.offsetWidth || 
					   e.target.clientHeight != lastElem.clientHeight )
					{
						var share = document.getElementById("SAI_icon");				
						share.style.display = "none";
					}
				}
			}
		}		
		
	}
}
//----------------------------------------------------------------------------------
function SAI_popupWindow(url, title, w, h) 
{
	// USE: popupwindow('http://www.google.com/', 'hello', 400, 400);
	var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
	var wTop = window.screenTop ? window.screenTop : window.screenY;

	var left = wLeft + (window.innerWidth / 2) - (w / 2);
	var top = wTop + (window.innerHeight / 2) - (h / 2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}
//----------------------------------------------------------------------------------
function SAI_facebookShare(obj)
{
	var share_url = "http://m.facebook.com/#SAI"+
					"&pic_link="+encodeURIComponent(SAI_url)+
					"&title="+encodeURIComponent(document.title)+
					"&pic_alt="+encodeURIComponent(SAI_url_alt)+
					"&link="+encodeURIComponent(location.href);
					
	PCG_GA_recordEvent_IncrementActions("LIKE");

	SAI_popupWindow(share_url, "Share on Facebook", 700, 400);	
}
//----------------------------------------------------------------------------------
/*
function SAI_facebookShare(obj)
{
	var link_url = "https://developers.facebook.com/docs/reference/dialogs/";
	
	if(	SAI_url.match(/\/\/(fbcdn-[\w\.-]+akamaihd|[\w\.\-]+?fbcdn)\.net\//) )
	{		
		link_url = SAI_url;
		SAI_url = "";  //SAI_url = "http://www.google.com/gwt/x/i?u="+SAI_url;
	}
				
	var share_url = "https://www.facebook.com/dialog/feed?app_id=458358780877780"+
					"&link="+link_url+
					"&picture="+encodeURIComponent(SAI_url)+
					"&name="+encodeURIComponent(document.title)+
					"&caption="+encodeURIComponent(SAI_url_alt)+
					"&description="+encodeURIComponent("Using http://www.LikeEverything.com/")+
					"&redirect_uri=https://mighty-lowlands-6381.herokuapp.com/";
	SAI_popupWindow(share_url, "Share on Facebook", 1000, 540);	
}*/
//----------------------------------------------------------------------------------
function SAI_pinterestShare(obj)
{
	var share_url = "http://pinterest.com/pin/create/button/?url="+encodeURIComponent(location.href)+
					"&media="+encodeURIComponent(SAI_url)+
					"&description="+ //encodeURIComponent(document.title)+ encodeURIComponent("\n")+
					//encodeURIComponent(SAI_url_alt)+ 
					encodeURIComponent("\n\n\n\n\n\n")+
					encodeURIComponent("\n\n\nPinning made easy! http://www.pinny.co Pin any photo in any website with a click.");
	
	PCG_GA_recordEvent_IncrementActions("PIN");
	PCG_GA_recordEvent_OpenUserMsg("PIN",
									{ // params									 									 
									 "scriptDesc":"Pinny",
									 //"google_plus":"https://plus.google.com/105192158605821336878/posts",
									 //"fb_like_url":"http://download.cnet.com/Soundcloud-Downloader/3000-2381_4-75738300.html"
									},
								    function(daysInstalled,numOfActions_Aggr,numOfUpdates,numOfRemindMeLater,numOfShareMsgPresented)
									{
										if( daysInstalled > 3		&& 
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
										/*else if( daysInstalled > 5 		 &&
												 numOfShareMsgPresented < 1 )
										{
											return "share1";
										}*/
										return "";
									}
									);
	
	SAI_popupWindow(share_url, "pin"+(new Date).getTime(), 900, 480);		
}
//----------------------------------------------------------------------------------
function SAI_addImageHoverMenu()
{
	var div = document.createElement("div");
	
	div.style.display = "none";
	div.setAttribute("id","SAI_icon");
	if(SAI_type=="like")
	{
		div.setAttribute("class","SAI_like_icon");
		div.onclick = function () { SAI_facebookShare(this);};	
	}
	else if(SAI_type=="pin")
	{
		div.setAttribute("class","SAI_pin_icon");
		div.onclick = function () { SAI_pinterestShare(this);};	
	}
	document.body.appendChild(div);	
	
GM_addStyle(" \
.SAI_like_icon \
{ \
    background-attachment: scroll;\
    background-clip: border-box;\
    background-color: transparent;\
	background-image: url(data:image/png;base64,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); \
    background-origin: padding-box;\
    background-repeat: no-repeat;\
    background-size: auto auto;\
    height: 19px;\
	width: 19px;\
    position: absolute;\
    z-index: 99999;\
}");

GM_addStyle(" \
.SAI_pin_icon \
{ \
    background-attachment: scroll;\
    background-clip: border-box;\
    background-color: transparent;\
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTUyRUVDMEEyRjc4MTFFMUFGREFCNzg2OTRBNzBDMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTUyRUVDMEIyRjc4MTFFMUFGREFCNzg2OTRBNzBDMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTJFRUMwODJGNzgxMUUxQUZEQUI3ODY5NEE3MEMyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTJFRUMwOTJGNzgxMUUxQUZEQUI3ODY5NEE3MEMyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po9U8JcAAAI/SURBVHjajFNNSBRhGH5m5ttxdtR2dnVtk7TdNvXQD2q0HoIOSR26dCgMidBLSEEQHbz1IxR0EIRAFjJW2yioY5foB+pSif2wWh2CcsVtddHKNSR31fmm75v93zXYF54Z3u97nvd73m/mFT60tCGyvNwL4ByDD+XFBIO/wWYbI0x8pYKQAU1RIEtSWeo1XffFEwkf0zaK/GSHVYVFlGAYKAucyzVcS9jDxasYfCcdolXBtvNnYT9yGGKlCkEQsBKaQnTwFhIzsylOiuoi5qtAbEXTqB/UZsPjy9ew+H0ado8bnf2X0PwggK9dPUhGfuT4SJ+egbP3NCxeDwLHjsOr2XHQuwu2t+/x8NQZgDmru9CX5WYLUJZkUNN9EuMjozjUsAP7h4fg7r+IWomgfQOYm/oMx9HOLJcHQVH/BiGoSiRBt1Sb+fTHkLnPiVUOO/4sLBTeV3EL78aCaOo6gQ12cTzmnjwz1+Xt9ahtaca3p88LWkg7oNmKs8O3EQtNYl/rXjPf2daK5O843NevYn11FeHgfTTm8UsceAwB8qvXqD7Qjl/hMJzsU+5+dA/UriHY3QNHZH4zB7meuHGXWglnhw8TgbsYHxyCuLUOifkY9hAZKrvQfH5JAdNWjQNEVbH04iU6SAWSP5egyFazeAmXIarntcCxxlbfjNwBJj9BYLnCpUUcPVUoygv4/1LKFnL/+spMBF8GbkITNp8PzuUariWaKN6IUyqtGzofZ1fGWj2xIE71/w1kjIu59p8AAwCfyjcduQHvUQAAAABJRU5ErkJggg==); \
    background-origin: padding-box;\
    background-repeat: no-repeat;\
    background-size: auto auto;\
    height: 20px;\
	width: 20px;\
    position: absolute;\
    z-index: 99999;\
}");
}
//----------------------------------------------------------------------------------
function main()
{
	if(location && location.href && location.href.indexOf("//m.facebook.com/#SAI") == -1 )
	{
		if(document&&document.body&&document.body.addEventListener!=undefined)
		{
			SAI_addImageHoverMenu();
			document.body.addEventListener('mouseover', SAI_onMouseOver, false);
		}
	}
}
//----------------------------------------------------------------------------------
// for slient mode
*
var PIN_ScriptEnable = GM_getValue("PIN_ScriptEnable",false);
//GM_log("PIN_ScriptEnable="+PIN_ScriptEnable);
if(PIN_ScriptEnable)
{	
	main();
}
else
{	
	if(location && location.href && location.href.indexOf("//pinterest.com") != -1 )
	{
		GM_setValue("PIN_ScriptEnable",true);
		PCG_GA_recordEvent_SpecificEvent("PIN","ChangedFromSlient");
		main();
	}
}
*
//----------------------------------------------------------------------------------
// non slient mode
//main();
//----------------------------------------------------------------------------------
if(SAI_type == "pin")
{
	PCG_GA_recordEvent_OnceADay("PIN");
}
else if(SAI_type == "like")
{
	PCG_GA_recordEvent_OnceADay("LIKE");
}
//----------------------------------------------------------------------------------














	/*
	var marquee_arr = document.getElementsByClassName("marquee");
	if(marquee_arr&&marquee_arr.length>0)
	{
		for(var i = 0 ; i < marquee_arr.length ; i ++ )
			marquee_arr[i].style.display = "none";
	}

	var fbNuxMissionsBar_arr = document.getElementsByClassName("fbNuxMissionsBar");
	if(fbNuxMissionsBar_arr&&fbNuxMissionsBar_arr.length>0)
		fbNuxMissionsBar_arr[0].style.display = "none";

	var mHomeNewsfeed_arr = document.getElementsByClassName("mHomeNewsfeed");
	if(mHomeNewsfeed_arr&&mHomeNewsfeed_arr.length>0)
		mHomeNewsfeed_arr[0].style.display = "none";

	var fbLargeTitle_arr = document.getElementsByClassName("fbBorderBottom");
	if(fbLargeTitle_arr&&fbLargeTitle_arr.length>0)
	{
		for(var i = 0 ; i < fbLargeTitle_arr.length ; i ++ )
			fbLargeTitle_arr[i].style.display = "none";
	}
		
		acw apm abt
		 */

/*
	var leftCol = document.getElementById("leftCol");
	if(leftCol)
		leftCol.style.opacity = "0";
	var rightCol = document.getElementById("rightCol");
	if(rightCol)
		rightCol.style.opacity = "0";
	var pagelet_home_stream = document.getElementById("pagelet_home_stream");
	if(pagelet_home_stream)
		pagelet_home_stream.style.opacity = "0";
	
	var fbDockChat = document.getElementById("fbDockChat");
	if(fbDockChat)
		fbDockChat.style.opacity = "0";
	
	//-----
	var pagelet_composer = document.getElementById("pagelet_composer");
	if(pagelet_composer)
	{
		var ta_arr = document.getElementsByClassName("DOMControl_placeholder uiTextareaAutogrow input mentionsTextarea textInput");
		if(ta_arr&&ta_arr.length>0)
		{
			ta=ta_arr[0];
			ta.focus();
			SAI_press_key(ta,' ','keydown');
			ta.focus();
		
			var title = decodeURIComponent(SAI_getUrlParam("title"));
			if(title.trim()!="")
				title = title + "\n";			
			var pic_alt = decodeURIComponent(SAI_getUrlParam("pic_alt"));
			if(pic_alt.trim()!="")
				pic_alt = pic_alt + "\n";
			var pic_link = decodeURIComponent(SAI_getUrlParam("pic_link"));
			var link = decodeURIComponent(SAI_getUrlParam("link"));
			//GM_log(location.href);GM_log(title);GM_log(pic_alt);GM_log(pic_link);GM_log(link);
			//var text = title + pic_alt + "\nPicture Link:" + pic_link + "\nWebsite:" + link + "\n\n" + "By http://www.LikeIt.com/ " ;
			var text = title + pic_alt + "\nPicture Link:" + pic_link + "\n[ I used 'Share InAnySite' : Download Now at http://cnet.co/AgTSs ]" ;
			ta.value = text;
			//ta.value = ta.value+"\n\n ffsdfsd sdsd fsd \n\n\n asddf \n\n http://www.ynet.co.il/PicServer2/13062011/3821686/382167701000100396220.jpg"+"\n\nby http://www.cnn.com";
		}
	}
*/





/*
try 
{
	window.Bootloader.loadComponents(["control-textarea"], 
		function() 
		{ 
			press_key(ta,' ','keydown');
			window.TextAreaControl.getInstance(ta) ;
			ta.value = ta.value+"prefix"+"text";
			ta.focus();
			SAI_setCaretToPos(ta,ta.value.length);
			press_key(ta,' ','keydown');
		}.bind(ta)); 
}
catch(e) 
{
	alert(e);
	//if (ta.offsetHeight && ta.offsetHeight<20) 
	//{
		//ta.style.height="80px";
	//}
}
*/
/*
http://adf.ly/2196632/banner/www.clickzs.com/

( curElm.querySelector('img, i') ||  hasBg(curElm) ||   hasBg(curElm.parentNode) ||   hasBg(curElm.firstElementChild))    ) 
function SAI_hasBg(node) 
{
	if(!node) 
		return false;
	return window.getComputedStyle(node).getPropertyValue('background-image') != 'none';
}
/*
	var bgImage = window.getComputedStyle(curElm).getPropertyValue('background-image');
	if ( bgImage.indexOf("url(") != -1 )
	{
		GM_log("fefe");
		var url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
		if( url.indexOf("http") == -1 ) // not a full url
		{
			url = location.href.replace(/\?.*$/, "")
								.replace(/\/[^\/]*\.[^\/]*$/, "")
								.replace(/\/$/, "") + 
								"/" + url ;
		}
		SAI_url = url;				
		SAI_url_alt = curElm.innerHTML;	
		return;
}
*/