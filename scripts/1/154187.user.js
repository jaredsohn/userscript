// ==UserScript==
// @name       Make Stinto Suck Less
// @namespace  http://somewhere/
// @version    0.32
// @description  Makes Stinto Suck Less. This software comes with NO WARRANTY if it sets your cat on fire TOO BAD!
// @match      http://stinto.net/*
// @copyright  2012+, Some Guy On The Interbutts / bits of original javascript from stinto.net people
// ==/UserScript==
//unsafeWindow.replaceEmoticons = function (msgText,staticResPath) {
//    msgText=" "+msgText+" ";
//   
//    return msgText.substr(1,msgText.length-2);
//}

pad = function(num, size) {
    var s = "00" + num;
    return s.substr(s.length-size);
}

uw = unsafeWindow;    
    
unsafeWindow.processServerData = function (data, textStatus) {
    var realActualDate = new Date();
    var realDate = pad(realActualDate.getHours(),2) + ":" + pad(realActualDate.getMinutes(),2);
	uw.getDataInProgress=false;
	uw.log(textStatus);
	uw.log(data);
	uw.$('#connectionProblem').modal('hide');
	
//	alert(data);
	var doNotification="";
	if (uw.thisUserId==-1)
	{
				uw.getUserList();
	}
	else
	{
	
	var titleToSet="";
		
  	var lines = data.split("\n");
  	for (var i in lines)
  	{
  		var line=lines[i];
  		var args = line.split("\t");
		var i=0
		var msgId = parseInt(args[i++]);
		if (msgId<=uw.lastMessageId)
			continue;
		
		
  		var cmd=args[i++];
  		if (cmd=='M')
  		{
			var userId = parseInt(args[i++]);
			var user=uw.id2user[userId];
			
						if (!user || !user.ignored)
			{
				var userName = args[i++];
				var date =args[i++];
				var msgText = args[i++];
				if (msgText!="")
				{
										titleToSet='"' + uw.$('<div/>').html(msgText).text().substr(0,33) + '"';
					
										
					var neuSpan = uw.document.createElement('div');
					var isSysMsg=(parseInt(userId)<=0);
					var cn = isSysMsg?"sysmessage":"message";
					if (uw.alt)
					{
						cn+=" alt";
					}
					uw.alt=!uw.alt;
					neuSpan.setAttribute('class',cn);
					neuSpan.setAttribute('className',cn); //for IE
                    var dateNode=uw.document.createElement('span');
                    dateNode.setAttribute('class','sysmessage');
                    dateNode.setAttribute('className','sysmessage'); // "for IE"
                    dateNode.innerHTML="[" + realDate + "] ";
                    neuSpan.appendChild(dateNode);
                    
					var nameDate = uw.document.createElement('div');
					nameDate.setAttribute('class','name');
					nameDate.setAttribute('className','name'); //for IE
					if (!isSysMsg)
					{
						var nameLink=uw.document.createElement('a');
						nameLink.setAttribute('href','#');
                        nameLink.innerHTML="&lt;" + userName + "&gt;";
						nameDate.appendChild(nameLink);
						nameLink.style.color = uw.getUserColor(user);
					}
					else
					{
						nameDate.appendChild(document.createTextNode(""));
					}
					neuSpan.appendChild(nameDate);
					var neuNachricht = uw.document.createElement('span');
					neuNachricht.setAttribute('class','text');
					neuNachricht.setAttribute('className','text'); //for IE
                    msgText = " " + msgText;
                    msgText = msgText.replace(/(http[s]*:\/\/\S+)/gi,"<a href='$1' target='_blank'>$1</a>");
					
                    neuNachricht.innerHTML=msgText;
					neuSpan.appendChild(neuNachricht);
					neuSpan.appendChild(document.createElement('br'));
					
					uw.$(neuSpan).css('display','none');
					var showEntry = uw.document.getElementById("messages");
					showEntry.appendChild(neuSpan);
					uw.$(neuSpan).fadeIn(333);
					uw.$(neuSpan).find('div.name').animate({backgroundColor:'#FAFAFA'},3333);
					
				}
				//latestID = msgId;
				var objDiv = uw.document.getElementById("messages");
				uw.scroll(objDiv);
				
				
			}
  		}
  		else if (cmd=='UJ')
  		{
  			var userId = args[i++];
			var userName = args[i++];
  			if (userId!=uw.thisUserId)
  			{
  				uw.addSysMessage(realDate,uw.getUserNameHtml(userId,userName)+" joined the chat.");
  				uw.doGetUserList=true;
  				doNotification="userJoined";
  			}
  		}
  		else if (cmd=='UQ')
  		{
  			var userId = (args[i++]);
			var userName = args[i++];
  			//requestUserList();
  			uw.addSysMessage(realDate,uw.getUserNameHtml(userId,userName)+" left the chat." );
  			uw.doGetUserList=true;
  			
  			if (uw.users.length<=2 && uw.roomLocked)
  			{
  				uw.addSysMessage(realDate,"Attention: this chat is currently locked, so nobody can (re-)enter it at the moment. To keep using this chat, it has to be <a href=\"#\" onclick=\"toolbar('toggleRoomLocked');return false;\">unlocked</a>.");
  			}
  		}
  		else if (cmd=='RL')
  		{
  			var userId = (args[i++]);
			var userName = args[i++];
			var locked = args[i++];
			if ("true"==locked)
			{
				uw.roomLocked=true;
  				uw.addSysMessage(realDate,uw.getUserNameHtml(userId,userName)+" has locked the chat.");
			}
			else
			{
				uw.roomLocked=false;
				uw.addSysMessage(realDate,uw.getUserNameHtml(userId,userName)+" has unlocked the chat.");
			}
			uw.updateToolbar();
  		}
  		else if (cmd=='PC')
  		{
  			var sourceId = (args[i++]);
			var targetId = args[i++];
			var state = args[i++];
			
			var chatRefId="p:" + sourceId + "-" + targetId;
			
			if ("requested"==state)
			{
								if (sourceId==uw.thisUserId)
					uw.addSysMessage(realDate,"You have invited "+uw.getUserNameHtml(targetId)+" to a Private Chat.");
				else
				{
					var msg="<div class='requested'><img src='"+uw.staticResPath+"/img/spc.gif' class='msgIcon' />"+uw.getUserNameHtml(sourceId)+" has invited you to a Private Chat. <a href='?refId="+chatRefId+"' target='p_"+chatRefId+"' onclick='sendPrivateChatRequest("+sourceId+",\""+"accepted"+"\");closeParentGrowl(this);return true;'>Accept</a> | <a href='#' onclick='sendPrivateChatRequest("+sourceId+",\""+"declined"+"\");closeParentGrowl(this);return false;'>Decline</a></div>";
					uw.addSysMessage(realDate,msg);
									}
			}
			else if ("accepted"==state)
			{
				if (sourceId!=uw.thisUserId)
				{
					var msg="<div class='accepted'><img src='"+uw.staticResPath+"/img/spc.gif' class='msgIcon' />"+ uw.getUserNameHtml(sourceId)+" accepted your invitation to a Private Chat. <a href='?refId="+chatRefId+"' target='p_"+chatRefId+"'>Go to Private Chat</a></div>";
					uw.addSysMessage(realDate,msg);
									}
			}
			else if ("declined"==state)
			{
				if (sourceId!=uw.thisUserId)
				{
					var msg="<div class='declined'><img src='"+uw.staticResPath+"/img/spc.gif' class='msgIcon' />"+ uw.getUserNameHtml(sourceId)+" declined your invitation to a Private Chat.</div>";
					uw.addSysMessage(realDate,msg);
									}
				else
					uw.addSysMessage(realDate,"You declined the Private Chat invitation of "+uw.getUserNameHtml(targetId)+".");
			}
			uw.updateToolbar();
  		}
  		else if (cmd=='SM')
  		{
			var date =args[i++];
			var msgText = args[i++];
  			uw.addSysMessage(date,msgText);
  	  	}
  	  	else if (cmd=='N')
  		{
  			var notificationType = (args[i++]);
  			var userId = args[i++];
  			var userName = args[i++];
  			
  			if (notificationType=="FU")
  			{
  				var fileId = args[i++];
  	  			uw.doGetFiles=true;
  	  			var link = uw.$("<a>").attr({"href":"javascript:showFile('"+fileId+"')" });
  	  			var img=uw.$("<img>").attr({
	  		  		"src":"/api/chat?channel=p:578780-579216&action=getThumb&img="+fileId,
	  		  		"width":"32",
	  		  		"height":"32"}).css('margin','0 1em');
  	  		    uw.addSysMessage(realDate,link.append(img).clone().wrap('<p>').parent().html()+uw.getUserNameHtml(userId,userName)+" has uploaded a new photo.");
  			}
  			else if (notificationType=="FD")
  			{
  	  			uw.doGetFiles=true;
  	  		    uw.addSysMessage(realDate,uw.getUserNameHtml(userId,userName)+" has deleted a photo.");
  			}
  			else if (notificationType=="UI")
  			{
  	  			uw.doGetUserList=true;
  			}
  		}
  	  if (msgId>uw.lastMessageId)
  	  	  uw.lastMessageId=msgId;
	} // for
	if (titleToSet!="")
	{
		uw.document.title = titleToSet;
		if (!uw.windowHasfocus) uw.setAlertFavIcon();
	}
	
	if (uw.doGetFiles)
	{
		uw.doGetFiles=false;
		uw.getFiles();
	}
	if (uw.doGetUserList)
	{
		uw.doGetUserList=false;
		uw.getUserList();
	}
	
	if (!uw.firstRequest)
	{
		if (doNotification!="")
		{
			if (doNotification="userJoined")
			{
				uw.playSound('userJoined');
			}
		}
	}
	
	uw.firstRequest=false;
	} // is thisUserId==-1
			
	uw.scheduleNextGetData();
}
    
uw.addSysMessage = function(date, text)
{
	var neuSpan = uw.document.createElement('div');
	var cn = "sysmessage scrollLockOverride";
	neuSpan.setAttribute('class',cn);
	neuSpan.setAttribute('className',cn); //for IE
	var nameDate = uw.document.createElement('span');
	nameDate.setAttribute('class','name');
	nameDate.setAttribute('className','name'); //for IE
	if (date!="")
	{
		nameDate.appendChild(uw.document.createTextNode('['+ date + '] ' ));
		nameDate.appendChild(uw.document.createTextNode(""));
		neuSpan.appendChild(nameDate);
	}
	var neuNachricht = uw.document.createElement('span');
	neuNachricht.setAttribute('class','text');
	neuNachricht.setAttribute('className','text'); //for IE
		neuNachricht.innerHTML=" " + text;
	neuSpan.appendChild(neuNachricht);
	
	var showEntry = uw.document.getElementById("messages");
	showEntry.appendChild(neuSpan);
	//if (!scrollLock)
	//	showEntry.scrollTop = showEntry.scrollHeight;
	uw.scroll(showEntry);
}    