// ==UserScript==
// @name           Neopets : Neomail : Send to Multiple Users
// @namespace      http://www.darkztar.com/
// @description    Send one neomail to multiple users.
// @include        http://www.neopets.com/neomessages.phtml*
// ==/UserScript==
if(document.body.innerHTML.match('The character counter for measuring the length'))
{
	var sendButton = document.createElement('input');
	sendButton.type = "button";
	sendButton.id = "sendNMs";
	sendButton.value = 'Send Multiple NeoMails';
	
	var note = document.createElement('div');
	note.innerHTML = 'If you wish to send to multiple users, seperate the usernames with a comma (",")';
	
	var logTR = document.createElement('tr');
	
	var logTD1 = document.createElement('td');
	logTD1.style.backgroundColor = "#C8E3FF";
	logTD1.setAttribute('valign', 'top');
	
	var logTD1B1 = document.createElement('b');
	logTD1B1.setAttribute('class', 'medText');
	logTD1B1.innerHTML = 'Neomail Log:';
	logTD1.appendChild(logTD1B1);
	
	var logTD2 = document.createElement('td');
	logTD2.style.backgroundColor = "#F6F6F6";
	logTD2.setAttribute('class', 'medText');
	logTD2.innerHTML = '<div id="nmLog"></div>';
	
	logTR.appendChild(logTD1);
	logTR.appendChild(logTD2);
	
	var nmForm = document.getElementsByName('neomessage')[0];
	nmForm.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].style.backgroundColor = "#F6F6F6";
	nmForm.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML = '<textarea id="message_box" style="width:99%;height:150px;"></textarea>';
	var nmButton = getElementsByAttribute(document.getElementsByName('neomessage')[0], 'div', 'align', 'center')[0].getElementsByTagName('input')[0];
	insertAfter(nmButton, sendButton);
	document.getElementById('block_frame').parentNode.insertBefore(note, document.getElementById('block_frame'));
	document.getElementById('block_frame').style.display = "none";
	document.getElementById('sendNMs').addEventListener('click', sendNeomails, false);
	document.getElementsByName('recipient')[0].setAttribute('maxlength', '999');
	
}


function sendNeomails()
{
insertAfter(nmForm.getElementsByTagName('tr')[2], logTR);
	var users = document.getElementsByName('recipient')[0].value.replace(/ /g,'').split(',');
	var validUsers = [];
	document.getElementById('nmLog').innerHTML += '<font color="black"><b><u>Validating usernames...</b></u></font><br>';
	for(i = 0; i < users.length; i++)
		{
			var user = users[i];
			var strHTML = loadURL("get", "http://www.neopets.com/neomail_block_check.phtml?background=%23F6F6F6&recipient="+user);
			if(strHTML.match('You should have no problem'))
				{
					validUsers.push(user);
					document.getElementById('nmLog').innerHTML += '<font color="green"><b>'+user+'</b> is valid.</font><br>';
				}
				else
				{
					document.getElementById('nmLog').innerHTML += '<font color="red"><b>'+user+'</b> is an invalid username.</font><br>';
				}
		}
		document.getElementById('nmLog').innerHTML += '<br><font color="black"><b><u>Sending Neomails...</b></u></font><br>';
		var strHTML = loadURL("post", "http://www.neopets.com/neomail_block_check.phtml?background=%23F6F6F6&recipient="+user);
		var body = document.getElementById('message_box').value;
		var subject = document.getElementsByName('subject')[0].value;
		for(a = 0; a < validUsers.length; a++)
		{
		var validUser = validUsers[a];
			var strHTML = loadURL("post", 'http://www.neopets.com/process_neomessages.phtml?recipient='+validUser+'&neofriends=&subject='+subject+'&message_type=notitle&message_body='+escape(body));
			document.getElementById('nmLog').innerHTML += '<font color="green">Successfully sent neomail to <b>'+validUser+'</b>.</font><br>';
		}
		
		document.getElementById('nmLog').innerHTML += '<br><br><font color="black" style="font-size:15pt;">Done.</font><br>';
		
}













































































function GetBetween(zStr, zStart, zEnd){
	var zStr = zStr;
	var zStart = zStart;
	var zEnd = zEnd;
	var z1 = zStr.indexOf(zStart);
	var z2 = zStr.indexOf(zEnd, z1);
	if(z2 > z1 && z1 > -1){
		return zStr.substring(z1 + zStart.length,z2);
	}else{
		return "";
	}
}

function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

	function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}


			
			function loadURL(method, url)
			{
			var request = null;
				if (window.XMLHttpRequest) 
				{
					request = new XMLHttpRequest();
				}
				else if (window.ActiveXObject)
				{
					request = new ActiveXObject("Microsoft.XMLHTTP");
				}
				

				if (request)
				{
					// Set up synchronous request
					request.open(method.toUpperCase(), url, false);
					
					// Send synchronous request
					request.send(null);
					
					// Check the status
					if (request.status == 200)
					{
						// Success
						return request.responseText;
						
					}
					else
					{
						// Error
						content = 'Error: ' + request.status + ' ' + request.statusText;
					}
				}
				
				// Set the contents of the div

				
			}
