// ==UserScript==
// @name			Twitter Display Extra Profile Information
// @author			Erik Vold
// @namespace		twitterDisplayExtraProfileInfo
// @include			http*://twitter.com/*
// @version			0.1.2
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-05
// @lastupdated		2009-09-06
// @description		This userscript will add display extra profile information on twitter accounts.
// ==/UserScript==

if (!ev_twitXML) {
	var ev_twitXML = {};
	ev_twitXML.getXML=function(callback){
		// chk if the xml div has already been saved
		if(ev_twitXML.xmlDiv) return;
		var user=document.evaluate("//head/meta[@name='page-user-screen_name']",document,null,9,null).singleNodeValue;
		if (!user) return;
		// chk if the user xml is in the document
		var userNode=document.evaluate("//user",document,null,9,null).singleNodeValue;
		if(userNode){
			ev_twitXML.xmlDiv=userNode.parentNode;
			callback();
			return;
		}
		user=user.getAttribute("content");
		var url="http://twitter.com/users/"+user+".xml";
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				// create to xml div
				var newDiv = document.createElement('div');
				newDiv.setAttribute('style','display:none;');
				newDiv.id = 'userXMLDivID';
				newDiv.innerHTML = response.responseText;
				document.body.appendChild(newDiv);
				ev_twitXML.xmlDiv=newDiv;
				callback();
				return;
			}
		});
		return;
	}
}

var twitterDisplayExtraProfileInfo={};
twitterDisplayExtraProfileInfo.callback=function(){
	var id=document.evaluate(".//id",ev_twitXML.xmlDiv,null,9,null).singleNodeValue.innerHTML;
	var timeZone=document.evaluate(".//time_zone",ev_twitXML.xmlDiv,null,9,null).singleNodeValue.innerHTML;
	var createdAt=document.evaluate(".//created_at",ev_twitXML.xmlDiv,null,9,null).singleNodeValue.innerHTML;
	var profileList=document.evaluate("//.[@id='profile']/ul[contains(@class,'about')]",document,null,9,null).singleNodeValue;
	if(!profileList) return;

	var formatNumWithCommas=function(num){
		num+='';
		var numAry=num.split(''), returnAry=[], addCom, len=num.length;
		switch((len%3).toString()){
			case '1':
				addCom=1;
				break;
			case '2':
				addCom=2;
				break;
			default:
				addCom=3;
		}
		for(var i=0;i<num.length;i++){
			if(addCom==0){
				returnAry.push(',');
				addCom=2;
			}
			else addCom--;
			returnAry.push(numAry[i]);
		}
		return returnAry.join('');
	}
	var profileIDLi=document.createElement("li");
	var temp=document.createElement('span');
	temp.id='twitter_profile_id_SPANID';
	temp.setAttribute('commaformatted','no');
	temp.setAttribute('class','label');
	temp.innerHTML="ID";
	profileIDLi.appendChild(temp);

	temp=document.createElement('span');
	var idValue=temp;
	var unformatEvt=function(){
		idValue.parentNode.innerHTML='<span id="twitter_profile_id_SPANID" class="label" commaformatted="no">ID</span><span>&nbsp;'+id+'</span>';
	}
	temp.innerHTML='&nbsp;'+formatNumWithCommas(id);
	temp.addEventListener('click',unformatEvt,false);
	profileIDLi.appendChild(temp);

	profileList.insertBefore(profileIDLi,profileList.childNodes[0]);

	newLi=document.createElement("li");
	newLi.innerHTML='<span class="label">Date Created:</span><span>&nbsp;'+(new Date(createdAt)).toLocaleDateString()+'</span>';
	profileList.appendChild(newLi);
	if(timeZone){
		newLi=document.createElement("li");
		newLi.innerHTML='<span class="label">Time Zone:</span><span>&nbsp;'+timeZone+'</span>';
		profileList.appendChild(newLi);
	}
}
twitterDisplayExtraProfileInfo.run=function(){
	var temp=function(){
		ev_twitXML.getXML( twitterDisplayExtraProfileInfo.callback );
		return;
	}
	setTimeout(temp,1000);
}
twitterDisplayExtraProfileInfo.run();