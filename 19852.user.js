// Mass community moderation script 1.2
// Release date: 4-May-2007
//
//----------------------U S E R G U I D E----------------------------
//------------------------------------------------------------------------
//________________How To add the list of communities to manage?______________
//
// Below in the code section, you will find a declaration as follows:
//
// var communityIds = ['419822','6413141','1027'];
//
// You just have to remove all the ID's there and put your own community ID's
// in the same manner. Make sure you put them in single quotes and saparate
// them using commas.
//
// If you do not know what the community ID is, it is the unique number
// of your community that you can find in the address bar when you visit
// your community.
//
// Example: 
// http://www.orkut.com/Community.aspx?cmm=419822
//
// In the above address, 419822 is the community ID.	
//
//----------------------------------------------------------------------
//______________________How To Install____________________________________
//
// You need to have Firefox browser with the Greasemonkey plugin to install this.
// You can install Greasemonkey from: http://www.greasespot.net/
// After install, you will have to restart Firefox and then open this script
// script again in Firefox, you will get a dialog box install the script automatically.
//
//
//-----------------------------------------------------------------------
//______________________How To Use This Script______________________________
//
// To use this script, simply visit the "manage" link of any member, there you
// along with the other options, you will find the options to:
//		#"Remove member from all communities",
//		#"Ban member from all communities", and
//		#"Delete all posts from all communities".
//
// -----------------------------------------------------------------------
// ==UserScript==
// @name          Mass Community Moderation Script V1.2
// @namespace     http://technowise.blogspot.com
// @description   Adds mass community moderation features for orkut community owners and moderators.
// @include       http://*orkut.com/CommMemberManage.aspx*
// ==/UserScript==

window.addEventListener("load", function(e) 
{

	var communityIds = ['42480003','6413141','1027'];

	/*Remove the above list of ID's and add the list of community ID's. 
	Make sure to put it in single quotes and saparate it with commas.
	DO NOT EDIT ANYTHING BELOW THIS LINE (Unless you know Javascript language)*/


	var userId=document.location.href.split("=")[2];
	var SIG="";
	var POST="";
	var i=0;
	getSigAndPost();

	function createXMLHttpRequest()
	{
		try{ return new ActiveXObject("Msxml2.XMLHTTP"); }catch(e){}
		try{ return new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){}
		try{ return new XMLHttpRequest(); }catch(e){}
		return null;
	}

	function getSigAndPost()
	{	
		var xml=createXMLHttpRequest();
		xml.open("GET","Scrapbook.aspx",true);
		xml.onreadystatechange=function()
		{
			if(xml.readyState==4)
			{
				var xmlr1=xml.responseText;
				if(!xmlr1.indexOf('textPanel') > -1)
				{
					SIG=xmlr1.match(/signature. value="(.+)"/i)[1];
					POST=xmlr1.match(/name="POST_TOKEN" value="([^"]+)/i)[1];
				}
				else
				{
					getSigAndPost();
				}	
			}
		}
		xml.send(null);
	}


	function performModerationAction(actionType)
	{
		messageNode = document.createTextNode(communityIds[i]+"...");
		document.getElementById('statusMsgBody').appendChild(messageNode);
		send_data="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action."+actionType;
		var xmlObj= createXMLHttpRequest();
		xmlObj.open('POST','http://www.orkut.com/CommMemberManage.aspx?cmm='+communityIds[i]+'&uid='+userId ,true);
		xmlObj.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlObj.send(send_data);
	        xmlObj.onreadystatechange=function()
		{
			if(xmlObj.readyState==4)
			{
				var xmlrtr=xmlObj.responseText;
				i++;
				if( i < communityIds.length )
				{
					performModerationAction(actionType);
				}
				else
				{
					messageNode = document.createTextNode("Done!");	
					document.getElementById('statusMsgBody').appendChild(messageNode);
					document.getElementById('statusMsgBody').appendChild(messageNode = document.createElement("br"));		
				}
			}
		}
	}



	//Add a button to remove user from all communities.
	var removeButton=document.createElement('input');
	removeButton.type='button';
	removeButton.value="Remove from all my communities"; 
	removeButton.setAttribute('style', 'font-size:12; color:#334f90; width:90%; height:20px;');
	removeButton.addEventListener("click",function(e)
	{ 
		i=0; 
		removeButton.disabled=true;
		document.getElementById('statusMsg').style.display = 'block';
		document.getElementById('statusMsgBody').parentNode.setAttribute('style', 'display:block; border: #D3BE96 1px solid; background-color: #FCF0D8');
		messageNode = document.createTextNode("Removing member from community ID: ");	
		document.getElementById('statusMsgBody').appendChild(messageNode);		
		performModerationAction('boot'); 
	}, true );


	//Add a button to Ban user from all communities.
	var banButton=document.createElement('input');
	banButton.type='button';
	banButton.value="Ban from all my communities"; 
	banButton.setAttribute('style', 'font-size:12; color:#334f90; width:90%; height:20px;');
	banButton.addEventListener("click",function(e)
	{ 
		i=0;
		banButton.disabled=true;
		document.getElementById('statusMsg').style.display = 'block';
		document.getElementById('statusMsgBody').parentNode.setAttribute('style', 'display:block; border: #D3BE96 1px solid; background-color: #FCF0D8');
		messageNode = document.createTextNode("Banning member from community ID: ");	
		document.getElementById('statusMsgBody').appendChild(messageNode);		
		performModerationAction('ban'); 
	}, true );

	
	//Add a button to delete all posts from all communities.
	var delButton=document.createElement('input');
	delButton.type='button';
	delButton.value="Delete posts from all my communities"; 
	delButton.setAttribute('style', 'font-size:12; color:#334f90; width:90%; height:20px;');
	delButton.addEventListener("click",function(e)
	{
		i=0;
		delButton.disabled=true;
		document.getElementById('statusMsg').style.display = 'block';
		document.getElementById('statusMsgBody').parentNode.setAttribute('style', 'display:block; border: #D3BE96 1px solid; background-color: #FCF0D8');
		messageNode = document.createTextNode("Deleting posts from community ID: ");	
		document.getElementById('statusMsgBody').appendChild(messageNode);		
		performModerationAction('doDeletePosts'); 
	}, true );


	
	//Create a division to display mass community manage buttons
	var massDiv=document.createElement('div');
	massDiv.id="massModDiv";
	massDiv.style.float='right';
	massDiv.style.padding='4px 8px 2px 8px';
	massDiv.style.width='35%';
	massDiv.style.background="#E5ECF4";
	massDiv.style.border="1px solid #0c0c0a";
	divHeader=document.createElement('h4');
	divHeader.innerHTML='Mass Community Moderation:';
	massDiv.appendChild(divHeader);
	massDiv.appendChild(removeButton);
	massDiv.appendChild(document.createElement('br'));
	massDiv.appendChild(document.createElement('br'));
	massDiv.appendChild(banButton);
	massDiv.appendChild(document.createElement('br'));
	massDiv.appendChild(document.createElement('br'));
	massDiv.appendChild(delButton);	
	document.getElementsByTagName('table')[5].appendChild(massDiv);


},false);

