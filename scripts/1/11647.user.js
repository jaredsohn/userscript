// ==UserScript==
// @name          Mass Moderation Script for Orkut V1.3
// @namespace     http://technowise.blogspot.com
// @description   Mass-delete and mass ban members from orukt forums.
// @include       http://*orkut.com/CommTopics.aspx*
// @include       http://*orkut.com/CommMemberManage.aspx*
// ==/UserScript==

window.addEventListener("load", function(e) 
{
    var communityIds = ['419822','6413141','1027'];
    var SIG="";
    var POST="";
    var uidIndex=0;cmmIndex=0,actionIndex=0;
    var	spamUserIds;
    var modActionValues=new Array('ban+doDeletePosts','boot+doDeletePosts','ban','doDeletePosts','boot');
    var modActionLabels=new Array('Mass Ban & delete posts','Mass Remove & delete posts','Mass ban members','Mass delete posts','Mass remove members');
    var modActionStatus=new Array('Banning and deleting post(s)...','Removing and deleting post(s)...','Banning member(s)...','Deleting post(s)...','Removing member(s)...');
    var ajaxBusyIcon = document.createElement('img');
    ajaxBusyIcon.setAttribute("src","http://avsharath.googlepages.com/ajax-loader.gif");

    getSigAndPost();
    
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
    
    
    	//Add the checkboxes to select individual topics.

	
	if(document.getElementById('selecionar1') == null)//If chckboxes are not already created by 'Orkut Mass Delete Tool'
	{
	    	for(i=2;i<document.forms.length;i++)
    		{
	    		var myChBox=document.createElement("input");
			myChBox.type='checkbox';
			myChBox.id='chBox'+i;
			folderPic = document.forms[i].parentNode.parentNode.childNodes[1];
			document.forms[i].parentNode.parentNode.insertBefore(myChBox, folderPic);   
    		}
	}
  	
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
    		if(document.getElementById('modSelect').selectedIndex == 0)
    			return;
    
    		el=document.getElementsByTagName('input');
    		var k=0;
    		for(i=0;i<el.length;i++)
    		{
    			if(el[i].type=='checkbox' && el[i].checked == true  )
    			{
    				spamUserIds[k]=el[i].parentNode.innerHTML.match(/uid=([^"]+)/i)[1]
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
    
    
    	var selectAllButton=document.createElement('button');
    	selectAllButton.innerHTML="All";
    	var selectNoneButton=document.createElement('button');
    	selectNoneButton.innerHTML="None";
    	selectAllButton.addEventListener("click",function(e){ selectCheckBoxes(true);},true);
    	selectNoneButton.addEventListener("click",function(e){ selectCheckBoxes(false);},true);
    
    	function selectCheckBoxes(status)
    	{
    		el=document.getElementsByTagName('input');
    		for(i=0;i<el.length;i++)
    		{
    			if(el[i].type=='checkbox')
    			{
    				el[i].checked = status;
    			}
    		}
    	}
    
    	document.forms[1].parentNode.appendChild(document.createTextNode("Select:"));		
    	document.forms[1].parentNode.appendChild(selectAllButton);
    	document.forms[1].parentNode.appendChild(selectNoneButton);
    	document.forms[1].parentNode.appendChild(actionSelect);	
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
    		if(document.getElementById('modSelect').selectedIndex == 0)
    			return;
		if(confirm("Are you sure you want to "+modActionLabels[document.getElementById('modSelect').selectedIndex - 1 ]+"?"))
		{
    
    			spamUserIds= new Array(userId);
    			var currentActionList=document.getElementById('modSelect').value.split("+");
    			statusMsg=modActionStatus[document.getElementById('modSelect').selectedIndex - 1];
	    		initModeration(statusMsg,spamUserIds,currentActionList);
		}
		document.getElementById('modSelect').selectedIndex=0;
    	},false);
    
	document.getElementsByTagName('table')[5].appendChild(actionSelect);
    
    }

},false);
