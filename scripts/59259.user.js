// ==UserScript==
// @name			Twitter Add Message Link To Profiles
// @author			Erik Vold
// @namespace		twitterAddMsgLinkToProfiles
// @include			http*://twitter.com/*
// @include			http*://*.twitter.com/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-04
// @lastupdated		2009-10-15
// @description		This userscripts adds a link to message a user from their profile page.
// ==/UserScript==

var twitterAddMsgLinkToProfiles={};
twitterAddMsgLinkToProfiles.user='';
twitterAddMsgLinkToProfiles.tryOne=function(){
	var actionsList=document.evaluate("//div[@id='profile_actions']/ul[contains(@class,'sidebar-actions')]",document,null,9,null).singleNodeValue;
	if(!actionsList) return false;
	var msgAct=document.evaluate("./li[contains(@class,'message-sidebar-action')]/a[1]",actionsList,null,9,null).singleNodeValue;
	if(msgAct){
		msgAct.innerHTML="direct msg";
	}

	var user=document.evaluate("//head/meta[@name='page-user-screen_name']",document,null,9,null).singleNodeValue;
	if(!user) return false;
	user=user.getAttribute("content");
	var tempLi=document.createElement('li');
	tempLi.setAttribute('class','message-sidebar-action');
	tempLi.innerHTML='<a href="/?status=@'+user+'%20">message</a> '+user;
	actionsList.insertBefore(tempLi,actionsList.childNodes[0]);

	twitterAddMsgLinkToProfiles.user=user;
	return true;
}
twitterAddMsgLinkToProfiles.tryTwo=function(){
	var user=twitterAddMsgLinkToProfiles.user;
	var icon="http://www.nextcat.com/images/icons/send_message.gif";
	var in2=document.evaluate("//div[contains(@class,'screen-name') and contains(text(),'"+user+"')]",document,null,9,null).singleNodeValue;
	if(!in2) return;
	in2=in2.parentNode;
	var newDiv=document.createElement('div');
	newDiv.setAttribute('style','line-height:15px;font-size:12px;');
	newDiv.innerHTML='<a title="Send Message" href="/?status=@'+user+'%20"><img src="'+icon+'" style="margin-right:1px;" />&nbsp;Send Message</a>';
	in2.appendChild(newDiv);
}
twitterAddMsgLinkToProfiles.run=function(){
	if(twitterAddMsgLinkToProfiles.tryOne()){
		twitterAddMsgLinkToProfiles.tryTwo();
	}
	return;
}
twitterAddMsgLinkToProfiles.run();