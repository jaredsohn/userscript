// ==UserScript==
// @name          Orkut Community Manager for Orkut
// @author        Sharath
// @namespace     http://technowise.blogspot.com
// @description   Mass-delete spam, mass ban members and mass-report spammers from orukt forums (aka communities).
// @version       1.93
// @include       http://*orkut.*/*CommTopics*
// @include       http://*orkut.*/*CommMemberManage*
// @include       http://*orkut.*/*CommSpamFolder*
// ==/UserScript==

    // Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    // Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') 
		{ 
			window.setTimeout(GM_wait,100); 
		}
        else 
        { 
            $ = unsafeWindow.jQuery; 
			initMassModeration(); 
        }
    }

    GM_wait();	

	
function initMassModeration()
{
    var SIG="";
    var POST="";
    var uidIndex=0;cmmIndex=0,actionIndex=0;
    var	spamUserIds;
    var modActionValues=new Array('ban+doDeletePosts','boot+doDeletePosts','ban','doDeletePosts','boot', 'report_topics', 'report_topics+ban');
    var modActionLabels=new Array('Ban & delete posts','Remove & delete posts','Ban members','Delete posts','Remove members', 'Report spam', 'Report spam and ban');
    var modActionStatus=new Array('Banning and deleting post(s)...','Removing and deleting post(s)...','Banning member(s)...','Deleting post(s)...','Removing member(s)...', 'Reporting spam...', 'Reporting spam and banning member(s)');
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
	ajaxBusyIcon.id = 'mmBusyIcon';
    var communityIds = new Array();
    var communityIdsStr="";

    getSigAndPost();
    
    function getSigAndPost()
    {	
		$.get("Scrapbook", function(data)
		{
	    		if(!data.indexOf('textPanel') > -1)
    			{
    				SIG=data.match(/signature. value="(.+)"/i)[1];
    				POST=data.match(/name="POST_TOKEN" value="([^"]+)/i)[1];
    			}
    			else
    			{
    				getSigAndPost();
    			}	  
		});
    }
    

    function startModeration(statusMsg,spamUserIds,currentActionList)
    {

		communityIdsStr = GM_getValue("SavedModCmmList", null );
		if(communityIdsStr == null || communityIdsStr == "")
		{
			alert("The community list is empty. \nPlease add a list of communities to include by clicking on the 'Settings' button.");
			return;
		}

		communityIds=communityIdsStr.split(",");

		uidIndex=0;
		cmmIndex=0;
		actionIndex=0;
		$('#statusMsg').css('display','block');
		$('#statusMsgBody').parent().css({'display':'block', 'border': '#D3BE96 1px solid', 'background-color': '#FCF0D8'});
		messageNode = document.createTextNode(statusMsg);	
		$('#statusMsgBody').append(messageNode)		
		.append(ajaxBusyIcon);		
		actionIndex=0;
		performModerationAction(currentActionList,spamUserIds);

    }
    
    function performModerationAction(actionList,spamUserIds)
    {	
		send_data="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action."+actionList[actionIndex];
		
		GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'http://'+document.domain+'/CommMemberManage?cmm='+communityIds[cmmIndex]+'&uid='+spamUserIds[uidIndex],
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type' : 'application/x-www-form-urlencoded'},
			data: send_data,
			onload: function(rd) 
			{
				//rd.responseText
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
				else //Current actions finished! Remove the busy icon and refresh the display.
				{							
					var areaToRefresh = '.displaytable'; //item to Refresh in community topics page.
					if( /CommMemberManage/.test(document.location.href) ) 
					{
						areaToRefresh = '.listitem h3:first'; //item to Refresh in member-manage page.
					}							
					
					$.get(document.location, function(data)
					{
						$(data).find(areaToRefresh).each( function()
						{
							$(document).contents().find(areaToRefresh).html($(this).html() );	
							$('#mmBusyIcon').remove();
							$('#statusMsgBody').append(document.createTextNode("Done!"));		
							$('#statusMsgBody').append(document.createElement("br"));											
						});				
					});
							
				}
			},
			onerror: function (XMLHttpRequest, textStatus, errorThrown) 
			{
				$('#mmBusyIcon').remove();
				$('#statusMsgBody').append(document.createTextNode("There was an error, please try again later!"));		
				$('#statusMsgBody').append(document.createElement("br"));
			}						
			
			
		});			
		
	}
    
    if( /CommTopics/.test(document.location.href) ) //For community topics page.
    {      
		var i=0    

		if( $('.icnmanage').length == 0 ) //if no no manage previlage is there, return
			return;
    
    	spamUserIds=new Array();
    	  	
    	var actionSelect= createModerationDropDown();
    	
    	var k=0;
		$(actionSelect)[0].addEventListener('change', function()
    	{ 	   
			$("#mboxfull :checkbox ").each( function()
			{
				if (this.checked ==  true)
				{
					spamUserIds[k] = $(this).parent().parent().html().match(/uid=([^"]+)/i)[1];
					k++;
				}
			});

			if (k > 0 )
    		{
				 
				if(confirm("Are you sure you want to "+$("#modSelect option:selected").text()+"?") )
				{
					var currentActionList = $('#modSelect').val().split("+");
					statusMsg = modActionStatus[ $('#modSelect')[0].selectedIndex - 1 ];
	    			startModeration(statusMsg,spamUserIds,currentActionList);
				}
    		}
    		else
    		{
    			alert("No topic selected!");		
    		}
			
			$('#modSelect')[0].selectedIndex=0;
			
    	}, false);

		//Add the select menu and the settings button at the top of forum
		var targetElement = $(document.getElementsByName("topicsForm")[0]).children(".parabtns:first");
		//document.getElementsByName("topicsForm")[0].childNodes[6].appendChild(actionSelect);
		//document.getElementsByName("topicsForm")[0].childNodes[6].appendChild(moderationSettingsButton());        	
		targetElement[0].appendChild(actionSelect);
		targetElement[0].appendChild(moderationSettingsButton());
    }
    else //for member manage page
    if( /CommMemberManage/.test(document.location.href) ) 
    {
    
    	var userId=document.location.href.split("=")[2];
    	var actionSelect= createModerationDropDown();
		$(actionSelect)[0].addEventListener('change', function()    	
    	{ 	
			if(confirm("Are you sure you want to "+$("#modSelect option:selected").text()+"?") )
			{
				spamUserIds= new Array(userId);
				var currentActionList = $('#modSelect').val().split("+");
				statusMsg = modActionStatus[ $('#modSelect')[0].selectedIndex - 1 ];
	    		startModeration(statusMsg,spamUserIds,currentActionList);
			}
			$('#modSelect')[0].selectedIndex=0;			
    	}, false);

		$('.para').append(actionSelect);        
		$('.para').append(moderationSettingsButton());        		
    }
	else
    if( /CommSpamFolder/.test(document.location.href) ) 
    {
  		var i=0    

		if( $('.icnmanage').length == 0 ) //if no no manage previlage is there, return
			return;
    
    	spamUserIds=new Array();
    	  	
    	var actionSelect= createModerationDropDown();
    	
    	var k=0;
		$(actionSelect)[0].addEventListener('change', function()
    	{ 	   
			$("#mboxfull :checkbox ").each( function()
			{
				if (this.checked ==  true)
				{
					spamUserIds[k] = $(this).parent().parent().html().match(/uid=([^"]+)/i)[1];
					k++;

				}
			});

			if (k > 0 )
    		{
				 
				if(confirm("Are you sure you want to "+$("#modSelect option:selected").text()+"?") )
				{
					var currentActionList = $('#modSelect').val().split("+");
					statusMsg = modActionStatus[ $('#modSelect')[0].selectedIndex - 1 ];
	    			startModeration(statusMsg,spamUserIds,currentActionList);
				}
    		}
    		else
    		{
    			alert("No topic selected!");		
    		}
			
			$('#modSelect')[0].selectedIndex=0;
			
    	}, false);

		//Add the select menu and the settings button at the top of forum		
		document.getElementsByName("spamFolderForm")[0].childNodes[6].appendChild(actionSelect);
		document.getElementsByName("spamFolderForm")[0].childNodes[6].appendChild(moderationSettingsButton());   
  
    }
	
	
	function createModerationDropDown()
	{
		var modDropDown = document.createElement('select');
    	modDropDown.value='Moderation action:';
    	modDropDown.id='modSelect';
    	var modDisOption=new Option("Mass-Moderation Action...");
    	modDisOption.disabled="disabled";
    	modDisOption.selected="selected";
    	modDropDown.options.add(modDisOption);
    
    	for(i=0;i<modActionValues.length;i++)
    	{
    		var modOption=new Option(modActionLabels[i]);
    		modOption.value=modActionValues[i];
    		modDropDown.options.add(modOption);
    	}    
		return modDropDown;
	}	
	
	
}




	function moderationSettingsButton() //Returns a moderation settings button :)
	{
		//Create the moderation settings button
		modSettingsButton=document.createElement('input');
		modSettingsButton.type='button';
		modSettingsButton.value='Settings';

		//create span for settings panel
		mySpan=document.createElement('span');
		mySpan.id='settingsSpan';

		//Create the script settings-page to accept list of communities.	
		modSettingsButton.addEventListener('click', function()	
		{	
			document.body.appendChild(mySpan);
			mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index: 1; left: 0; top: 0; background-color: #D9E6F7; opacity:.75; display:none;");			
			
			var myDiv = document.createElement('div');
			myDiv.id = 'settingsDiv';
			myDiv.setAttribute("style","position:absolute; width:750px; height: 500px; z-index: 2; background-color: #5888C6; border:2px solid #0ad; text-align:center; display:none;-moz-border-radius: 10px;-webkit-border-radius: 10px;");
			document.body.appendChild(myDiv);
			myDiv.innerHTML="<h3>Orkut Mass Community Manager Settings</h3>\
			<div style='padding-left:100px; height:430px;'>\
				<div style='float:left;'> <h4>Your Communities:</h4> <select id='allCmmList' style='width: 220px; height:360px;' multiple></select></div>\
				<div style='float:left; margin-top:180px;'> <input type='button' id='addCmm' value='Add >>'> <br/> <input type='button' id='removeCmm' value='<< Remove'></div>\
				<div style='float:left;'> <h4> Selected Communities:</h4> <select id='cmmList' style='width: 220px; height:360px;' multiple></select></div><br/>\
			</div>\
			<div style='text-align:center;'><input type='button' value='Cancel' onclick='javascript:$(\"#settingsSpan\").remove(); $(\"#settingsDiv\").remove();'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='SaveCmmList' value='Save and Exit'></div>\
			";


			$.get('http://'+document.domain+'/Communities', function(data){
				$(data).find('#subPage0 a').each( function()
				{
					var elOption = document.createElement('option');
					$( elOption).val( $(this).attr('href').split('=')[1] ); //Only take the community id as value.										
					$( elOption).text( $(this).text() );					
					$('#allCmmList').append(elOption);
				});				
			});
			
			communityIdsStr = GM_getValue("SavedModCmmList", null );
			communityNamesStr = GM_getValue("SavedModCmmNames", null );


			
			var i=0;
			
			if(communityIdsStr!= null && communityIdsStr != "")
			{		
				//Add list of existing communities to the select list
				communityIds=communityIdsStr.split(",");

				if(communityNamesStr == null )
				{
					GM_setValue("SavedModCmmNames", communityIds.join("|||") ); //Save the existing community ids as names.
					communityNames = communityIds;
				}
				else
				{
					communityNames = communityNamesStr.split("|||");
				}				
				
				$(communityIds).each( function()
				{
					var elOptNew = document.createElement('option');
					$(elOptNew).val( this );					
					$(elOptNew).text( communityNames[i++] );					
					$('#cmmList').append(elOptNew);			
				});
			}

			//Add Selected community ID for mass moderation
			$('#addCmm').bind('click',function()
			{
			
				if( $('#allCmmList option:selected').length == 0 )
				{
					alert("Please select one or more communities from the list");
				}
				else
				{
					$('#allCmmList option:selected').each( function () {					
						$('#cmmList').append( $(this).clone() );					
					});
				
				}
				
			});


			$('#removeCmm').bind('click',function removeOptionSelected()
			{
				$('#cmmList option:selected').remove();
			});

			
			document.getElementById('SaveCmmList').addEventListener('click',function removeOptionSelected()
			{
				var cmmList = new Array();			
				var cmmNames = new Array();			
				$('#cmmList option').each( function()
				{	
					//Commenting out below line because 
					//Jquery val() function is broken for FF 3.5
				//	cmmList.push( $(this).val() );			
					cmmList.push( $(this)[0].value );
					cmmNames.push( $(this).text());			
				});						
				//Save list of communities with our greasemonkey.
				GM_setValue("SavedModCmmList", cmmList.join() );
				GM_setValue("SavedModCmmNames", cmmNames.join("|||") );
				$("#settingsSpan").remove(); 
				$("#settingsDiv").remove();

			},false);
			
			$('#settingsDiv').css('top', parseInt( ($(window).height() - $('#settingsDiv').height() ) / 2) );
			$('#settingsDiv').css('left', parseInt( ($(window).width() - $('#settingsDiv').width() ) / 2) );
			$('#settingsSpan').show();
			$('#settingsDiv').show();				
			

		}, false);
		
		return modSettingsButton;	
	}