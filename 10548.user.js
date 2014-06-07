// ==UserScript==
// @name           GMail Contact List
// @description    Add a list of contacts near the To: box on gmail
// @namespace      http://magicrobotmonkey.com
// @include        *mail.google.com/mail/*
// ==/UserScript==
function getContacts(){
	//look for the add CC link 
	var toID = 'to_compose'
	var toBox = document.getElementById(toID);
	if(!toBox)
	{
		toID = 'to_0'
		toBox = document.getElementById(toID);
	}
	var contactList = document.getElementById('gmail_contact_list');
	if(toBox && !contactList)
	{
		//add event to body to hide the contacts
		document.body.setAttribute('onclick',"document.getElementById('GM_CONTACT_LIST').style.display='none';");
		
		if(window.location.toString().charAt(4) == 's')
			http = 'https';
		else
			http = 'http';
		//get contacts
		GM_xmlhttpRequest({
				method: 'GET',
				url: http+'://mail.google.com/mail/?view=cl&search=contacts&pnl=a',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					 contactPage = responseDetails.responseText;
					 contactLink = "<span class='l' onClick=\"comp = document.getElementById('"+toID+"'); comp.value=comp.value+'{{EMAIL}},';event.cancelBubble=true;\">{{NAME}} &lt;{{EMAIL}}&gt;</span><br>";
					 contactHTML='';
					 contacts = contactPage.match(/D\(\[\"cl\"[\s\S]*?\)\;/g);
					 for(var i=0;i<contacts.length;i++)
					 {
						 eval(contacts[i].replace('D(','contactArray=').replace(');',';')); 
						 for(var j = 0;j<contactArray.length;j++)
						 {
							 name=contactArray[j][2];
							 email=contactArray[j][4];
							 
							 if(name&&email)
								 contactHTML = contactHTML+contactLink.replace('{{NAME}}',name).replace(/{{EMAIL}}/g,email);
						 }
					 }
					 contactContainer = document.createElement('div');
					 contactContainer.innerHTML="<span class='l' onClick=\"document.getElementById('GM_CONTACT_LIST').style.display='';event.cancelBubble=true;\">all contacts</span>"+
								"<div id='GM_CONTACT_LIST' style='overflow:scroll;height:300;display:none;position:absolute;border:1px solid black;background-color:white;'>"+contactHTML+'</div>';
					toBox.parentNode.appendChild(contactContainer);
					toBox.parentNode.align='left';
				} //end onload function
		});//end GM_xmlhttpRequest
	}
}
getContacts();