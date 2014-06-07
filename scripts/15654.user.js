// ==UserScript==
// @name          Mass Moderation Script for Orkut V1.6
// @author        Sharath
// @namespace     http://www.orkut.com/Community.aspx?cmm=42397345
// @description   Mass-delete and mass ban members from orukt forums.
// @include       http://*orkut.com/CommTopics.aspx*
// @include       http://*orkut.com/CommMemberManage.aspx*
// ==/UserScript==


//Add to this javascript:alert(document.topicsForm.childNodes[6]);

window.addEventListener("load", function(e) 
{

    var SIG="";
    var POST="";
    var uidIndex=0;cmmIndex=0,actionIndex=0;
    var	spamUserIds;
    var modActionValues=new Array('ban+doDeletePosts','boot+doDeletePosts','ban','doDeletePosts','boot');
    var modActionLabels=new Array('Mass Ban & delete posts','Mass Remove & delete posts','Mass ban members','Mass delete posts','Mass remove members');
    var modActionStatus=new Array('Banning and deleting post(s)...','Removing and deleting post(s)...','Banning member(s)...','Deleting post(s)...','Removing member(s)...');
    var ajaxBusyIcon = document.createElement('img');
    ajaxBusyIcon.setAttribute("src","data:image/gif;base64,R0lGODlhEAAQAPQAAP///7Vnzfz6/MWI19q15rZqzr991PLm9uXK7bt00dat49Kj4Pbu+ODB6u3c\
88mR2s2a3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F\
VFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/hVNYWRlIGJ5\
IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAABAAEAAABVAgII5kaZ6lMBRsISqEYKqtmBTGkRo1\
gPAG2YiAW40EPAJphVCREIUBiYWijqwpLIBJWviiJGLwukiSkDiEqDUmHXiJNWsgPBMU8nkdxe+P\
QgAh+QQJCgAAACwAAAAAEAAQAAAFaCAgikfSjGgqGsXgqKhAJEV9wMDB1sUCCIyUgGVoFBIMwcAg\
QBEKTMCA8GNRR4MCQrTltlA1mCA8qjVVZFG2K+givqNnlDCoFq6ioY9BaxDPI0EACzxQNzAHPAkE\
gDAOWQY4Kg0JhyMhACH5BAkKAAAALAAAAAAQABAAAAVgICCOI/OQKNoUSCoKxFAUCS2khzHvM4EK\
OkPLMUu0SISC4QZILpgk2bF5AAgQvtHMBdhqCy6BV0RA3A5ZAKIwSAkWhSwwjkLUCo5rEErm7QxV\
PzV3AwR8JGsNXCkPDIshACH5BAkKAAAALAAAAAAQABAAAAVSICCOZGmegCCUAjEUxUCog0MeBqwX\
xmuLgpwBIULkYD8AgbcCvpAjRYI4ekJRWIBju22idgsSIqEg6cKjYIFghg1VRqYZctwZDqVw6ynz\
Zv+AIQAh+QQJCgAAACwAAAAAEAAQAAAFYCAgjmRpnqhADEUxEMLJGG1dGMe5GEiM0IbYKAcQigQ0\
AiDnKCwYpkYhYUgAWFOYCIFtNaS1AWJESLQGAKq5YWIsCo4lgHAzFmPEI7An+A3sIgc0NjdQJipY\
L4AojI0kIQAh+QQJCgAAACwAAAAAEAAQAAAFXyAgjmRpnqhIFMVACKZANADCssZBIkmRCLCaoWAI\
Pm6FBUkwJIgYjR5LN7INSCwHwYktdIMqgoNFGhQQpMMt0WCoiGDAAvkQMYkIGLCXQI8OQzdoCC8x\
BGYFXCmLjCYhADsAAAAAAAAAAAA=");
    var communityIds = new Array();
    var communityIdsStr="";

    getSigAndPost();
    
    function isUnsignedInteger(s) /*Used for checking if given community ID is valid*/
    {
    	return (s.toString().search(/^[0-9]+$/) == 0);
    }


    function createXMLHttpRequest()
    {
    	try{ return new XMLHttpRequest(); }catch(e){}
    	try{ return new ActiveXObject("Msxml2.XMLHTTP"); }catch(e){}
    	try{ return new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){}
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
    

    function initModeration(statusMsg,spamUserIds,currentActionList)
    {

	communityIdsStr=GM_getValue("SavedModCmmList", null );
	if(communityIdsStr == null || communityIdsStr == "")
	{
		alert("The community list is empty. \nPlease add a list of communities to include by clicking on the 'Settings' button.");
		return;
	}

	communityIds=communityIdsStr.split(",");

    	uidIndex=0;
    	cmmIndex=0;
	actionIndex=0;
    	document.getElementById('statusMsg').style.display = 'block';
    	document.getElementById('statusMsgBody').parentNode.setAttribute('style', 'display:block; border: #D3BE96 1px solid; background-color: #FCF0D8');
    	messageNode = document.createTextNode(statusMsg);	
    	document.getElementById('statusMsgBody').appendChild(messageNode);		
    	document.getElementById('statusMsgBody').appendChild(ajaxBusyIcon);		
    	actionIndex=0;
	performModerationAction(currentActionList,spamUserIds);

    }
    
    
    function performModerationAction(actionList,spamUserIds)
    {
    	send_data="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action."+actionList[actionIndex];
    	var xmlObj= createXMLHttpRequest();
    	xmlObj.open('POST','http://www.orkut.com/CommMemberManage.aspx?cmm='+communityIds[cmmIndex]+'&uid='+spamUserIds[uidIndex], true);
    	xmlObj.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    	xmlObj.send(send_data);
        xmlObj.onreadystatechange=function()
    	{
    		if(xmlObj.readyState==4)
    		{
    			var xmlrtr=xmlObj.responseText;
    			cmmIndex++;
    			if( cmmIndex < communityIds.length )
    			{
    				performModerationAction(actionList,spamUserIds);
    			}
    			else
    			if(uidIndex < spamUserIds.length-1)
    			{
    				uidIndex++;	
    				cmmIndex=0;
    				performModerationAction(actionList,spamUserIds);
    			}
    			else
    			if( actionIndex < actionList.length-1)
    			{
    				actionIndex++;
    				uidIndex=0;	
    				cmmIndex=0;
    				performModerationAction(actionList,spamUserIds);						
    			}
    			else //Current actions finished! Remove the busy icon.
    			{
    				document.getElementById('statusMsgBody').removeChild(document.getElementById('statusMsgBody').lastChild);				
    				document.getElementById('statusMsgBody').appendChild(document.createTextNode("Done!"));		
    				document.getElementById('statusMsgBody').appendChild(document.createElement("br"));		
    			}
    		}
    	}
    }
    
    
    
    if(document.location.href.indexOf("CommTopics.aspx") != -1) //For community topics page.
    {
    
    
    	/*Remove the above list of ID's and add the list of community ID's. 
    	Make sure to put it in single quotes and saparate it with commas.
    	DO NOT EDIT ANYTHING BELOW THIS LINE (Unless you know Javascript language)*/
    
    
    	//Find if manage link is available(to know if user has moderator rights to this community).
    	for(var i=0;i<document.links.length;i++)
    	{
    		var linkIsProfile=/Profile/.test(document.links[i]);
    		if(linkIsProfile)
    		{
    			var moderatorRightsAvailable=/manage/.test(document.links[i+1].innerHTML);
    			if(  !  moderatorRightsAvailable )
    				return;
    		}
    	}
    
    	spamUserIds=new Array();
    	  	
    	var actionSelect= document.createElement('select');
    	actionSelect.value='Moderation action:';
    	actionSelect.id='modSelect';
    	var modDisOption=new Option("Action...");
    	modDisOption.disabled="disabled";
    	modDisOption.selected="selected";
    	actionSelect.options.add(modDisOption);
    
    	for(i=0;i<modActionValues.length;i++)
    	{
    		var modOption=new Option(modActionLabels[i]);
    		modOption.value=modActionValues[i];
    		actionSelect.options.add(modOption);
    	}

    
    	actionSelect.addEventListener('change', function()
    	{ 	    
    		el=document.getElementsByTagName('input');
    		var k=0;
    		for(i=0;i<el.length;i++)
    		{
    			if(el[i].type=='checkbox' && el[i].checked == true  )
    			{
    				spamUserIds[k]=el[i].parentNode.parentNode.innerHTML.match(/uid=([^"]+)/i)[1]
    				k++;
    			}
    
    		}
    	
    		if (k > 0 )
    		{
			if(confirm("Are you sure you want to "+modActionLabels[document.getElementById('modSelect').selectedIndex - 1 ]+"?") )
			{
    		
				var currentActionList=document.getElementById('modSelect').value.split("+");
    				statusMsg=modActionStatus[document.getElementById('modSelect').selectedIndex - 1];
	    			initModeration(statusMsg,spamUserIds,currentActionList);
			}
    		}
    		else
    		{
    			alert("No topic selected!");		
    		}
		document.getElementById('modSelect').selectedIndex=0;
    	},false);
    


	//Create the moderation settings button
	modSettingsButton=document.createElement('input');
	modSettingsButton.type='button';
	modSettingsButton.value='Settings';

	//create span for settings panel
	mySpan=document.createElement('span');
	mySpan.id='settingsSpan';

	//Create the script settings-page to accept list of communities.
	modSettingsButton.addEventListener('click',function()
	{	
		document.body.appendChild(mySpan);
		mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index: 1; left: 0; top: 0; background-color: #D9E6F7;");			
		mySpan.innerHTML="<h3>Mass Moderation Script settings</h3><bold>Community Id:<input id='cmmInput' type=text size=10><input type='button' id='addCmm' value='Add'><br>\
		<select size=7 id='cmmList' style='width: 180px;' multiple></select><br>\
		<input type='button' id='removeCmm' value='Remove'><input type='button' id='SaveCmmList' value='Save'><input type='button' value='Exit' onclick='javascript:document.body.removeChild(document.getElementById(\"settingsSpan\"));'>";

		communityIdsStr=GM_getValue("SavedModCmmList", null );

		if(communityIdsStr!= null && communityIdsStr != "")
		{
		
			communityIds=communityIdsStr.split(",");
			//Add list of existing communities to the select list
			for(i=0;i < communityIds.length;i++)
			{
				var elOptNew = document.createElement('option');
				elOptNew.text = communityIds[i];
				elOptNew.value = communityIds[i];
				var elSel = document.getElementById('cmmList');
				elSel.add(elOptNew, null);
			}
		}


			
		//Add a new community ID
		document.getElementById('addCmm').addEventListener('click',function()
		{
			var cmmInputVal=document.getElementById('cmmInput').value;

			if( isUnsignedInteger(cmmInputVal) )
			{
				var elOptNew = new Option(cmmInputVal);
				var elSel = document.getElementById('cmmList');
				elSel.add(elOptNew, null);
			}
			else
			{
				alert("Community ID is invalid, it should be a number");
			}
			document.getElementById('cmmInput').value="";
				
		},false);


		document.getElementById('removeCmm').addEventListener('click',function removeOptionSelected()
		{
			var elSel = document.getElementById('cmmList');
			var i;
			for (i = elSel.length - 1; i>=0; i--) 
			{
				if (elSel.options[i].selected) 
				{
					elSel.remove(i);
				}
			}
		},false);

		document.getElementById('SaveCmmList').addEventListener('click',function removeOptionSelected()
		{
			var elSel = document.getElementById('cmmList');
			var i;
			var cmmList=new Array();
			for (i=0;i< elSel.length; i++) 
			{
				cmmList[i]=elSel.options[i].value;

			}
			//Save list of communities with our greasemonkey.
			GM_setValue("SavedModCmmList",cmmList.join() );

		},false);


	},false);


	//Add the select menu and the settings button at the top of forum
	document.getElementsByName("topicsForm")[0].childNodes[6].appendChild(actionSelect);
	document.getElementsByName("topicsForm")[0].childNodes[6].appendChild(modSettingsButton);


    }
    else //for member manage page
    if(document.location.href.indexOf("CommMemberManage.aspx") != -1) 
    {
    
    	var userId=document.location.href.split("=")[2];
    	var actionSelect= document.createElement('select');
    	actionSelect.value='Moderation action:';
    	actionSelect.id='modSelect';
    	var modDisOption=new Option("Action...");
    	modDisOption.disabled="disabled";
    	modDisOption.selected="selected";
    	actionSelect.options.add(modDisOption);
    
    	for(i=0;i<modActionValues.length;i++)
    	{
    		var modOption=new Option(modActionLabels[i]);
    		modOption.value=modActionValues[i];
    		actionSelect.options.add(modOption);
    	}
    
    	actionSelect.addEventListener('change', function()
    	{ 	

		if(confirm("Are you sure you want to "+modActionLabels[document.getElementById('modSelect').selectedIndex - 1 ]+"?"))
		{
   			spamUserIds= new Array(userId);
    			var currentActionList=document.getElementById('modSelect').value.split("+");
    			statusMsg=modActionStatus[document.getElementById('modSelect').selectedIndex - 1];
			initModeration(statusMsg,spamUserIds,currentActionList);
		}
		document.getElementById('modSelect').selectedIndex=0;

    	},false);

	document.getElementById('mboxfull').appendChild(actionSelect);    
    
    }

},false);
