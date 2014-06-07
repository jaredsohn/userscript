// ==UserScript==
// @name           EZThumbz
// @namespace      tsuto
// @description	 adds a helpful tab to the dAmn when the user is in ThumbShare allowing them to post their thumbs faster and easier
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==


/*

EZThumbz Script Version 2.0
By: Tsuto (Jacob Elliott)
Date: 22/01/09

Changes in version 2.0
-----------------------
- Completely recoded the EZThumbz script using the 
  basic framework from the original release.
  
- Usable in any dAmn channel.

- Detect user priviledge level and limit thumb selection.

- Preloads images in a cleaner, asyncronous, more bandwidth friendly way.
  
- Integrated better with the existing dAmn page to avoid bugs.

*/



//*** Global Vars ***//


//Deviant Info
var dAUser = unsafeWindow.deviantART.deviant.username;

//RSS Feed
var dAFeed;

var initialized = false;





//*** Functions ***//

//Loads the RSS feed for the gallery of the specified user
getDAFeed=function(dAUser)
{
	//Preload all of the gallery data with AJAX
	var userURL = 'http://backend.deviantart.com/rss.xml?q=gallery%3A'+escape(dAUser);


	//Load the xml with the fancy greasemonkey http request function
	GM_xmlhttpRequest({
		method:	'GET',
		url:	userURL,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8.2',
			'Referer': 'http://www.deviantart.com/',
		},
		onload: function(req) {
			dAFeed=req.responseText;
			
			if(!initialized)
			EZThumbz();
		}
	});
}







//*** Adds all of the EZThumbz functions to the head of the page ***//
EZThumbz = function()
{

unsafeWindow.feed_data=dAFeed;

thumbScript= document.createElement('script');
thumbScript.appendChild(document.createTextNode((<r><![CDATA[


//dAFeed
var dAFeed=(new DOMParser().parseFromString(feed_data,"text/xml"));

//Gallery Name
var galleryName = dAFeed.getElementsByTagName('title')[0].textContent;
var gallerySize=0;
var galleryLoaded=0;


//After 15 seconds the button will pop up regardless of if the gallery has fully loaded or not
var galleryTimer = 0;

//Keep count of the number of selected Thumbs
var thumbCount=0;


//Gallery Element
var galleryArea=document.createElement('div');
galleryArea.style.overflowY='auto';
galleryArea.style.width='590px';
galleryArea.style.height='415px';
galleryArea.style.position='absolute';
galleryArea.style.top='30px';
galleryArea.style.left='5px';

//*** Images ***//
thumbsrc = "data:image/png;base64,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";
thumbButton = new Image();
thumbButton.src=thumbsrc;


//Inserts the thumbBox element into the page
ezBox=Tree.createFragment("<div style='width:600px; height:500px; background-color:#4d4d4d;' id='thumbBox'><b><span style='position:relative; top:5px; left:5px; color:white'>"+galleryName+"</span> <span id='thumbButton'></span></div>",true);

//Thumb button
submit_el=document.createElement('a');
submit_el.style.position='absolute';
submit_el.style.top='450px';
submit_el.style.left='450px';
submit_el.style.cursor="pointer";
submit_el.style.display="block";
submit_el.style.width="147px";
submit_el.style.height="46px";
submit_el.onclick=function(){insertThumbz();};
submit_el.appendChild(thumbButton);

//EZButton element
button_el = document.createElement('a');
button_el.innerHTML='EZThumbz';
button_el.id='EZButton';
button_el.style.cursor="pointer";
button_el.style.border="1px solid gray";
button_el.style.marginRight="50px";
button_el.style.textDecoration="none";
button_el.style.fontWeight="bold";
button_el.title="EZThumbz"

button_el.onclick=function()
{
Modals.push(ezBox);
Tree.get("img.modal-shadow").style.display="block";
document.getElementById('thumbBox').appendChild(galleryArea);
document.getElementById('thumbButton').appendChild(submit_el);
};



//Check if the user has opened up any new windows and add a button to it
checkButtons = function()
{
	
	//Make sure that the tab stack has something in it before trying to add the button
	if((dAmnChatTab_active && galleryLoaded==gallerySize) || (dAmnChatTab_active && galleryTimer==150))
	{
	var iconBar=dAmnChats[dAmnChatTab_active].channels.main.iconbar_el.firstChild;
	iconBar.insertBefore(button_el,iconBar.firstChild);
	}
	
	galleryTimer++;
	window.setTimeout(checkButtons,500);
}


function selectThumb(code)
{
	var thumb = document.getElementById(code);
	
	if(thumb.class=='thumbDeselected')
	{
		
		
		//Set the proper level of maxThumbs depending on the room and user level
		privClass=dAmnChats[dAmnChatTab_active].members.members[deviantART.deviant.username].info.pc;
		
		if(dAmnChatTab_active=='chat:ImageShare' && privClass=='Guests')
		var maxThumbs=5;
		
		else if(dAmnChatTab_active=='chat:ImageShare' && privClass!='Guests')
		var maxThumbs=7;
		
		else
		maxThumbs=99;
		
		if(thumbCount>=maxThumbs)
		alert("Sorry you can only post a maximum of "+maxThumbs+" thumbs in this room!");
		
		else
		{
		thumb.class='thumbSelected';
		thumb.style.MozOpacity='1.0';
		thumbCount++;
		}
		
	}
	
	else
	{
	thumb.class='thumbDeselected';
	thumb.style.MozOpacity='0.5';
	thumbCount--;
	}
}



function insertThumbz()
{

	//Check to see which items in the gallery table are currently selected
	var gt = document.getElementById('galleryTable');
	
	var thumbString="";
	//Search each row
	for(y=0; y<gt.rows.length; y++)
	{
		for(x=0; x<gt.rows[y].cells.length; x++)
		{
			var thumb = gt.tBodies[0].rows[y].cells[x].firstChild.firstChild;
			
			thumbId = thumb.getAttribute('id');
			
			
			
			
			
			if(thumb.class=='thumbSelected')
			{
				thumbString+=":thumb"+thumbId+": ";
			}
		}
	}
		//alert(thumbString);
		dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el.value=thumbString;
		
		dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el.focus();
		
		
		//Fixed - 1/27/09 5:20 PM
		//thumbCount=0;
		
		Modals.pop('cancel');

}



//Parses the gallery info and constructs the html elements
parseGallery=function()
{
	
	var gt=document.createElement('table');
	gt.style.width='100%';
	gt.align='center';
	gt.id='galleryTable';
	
	var galleryItems = dAFeed.getElementsByTagName('item');
	gallerySize=galleryItems.length;
	
	
	var imageArray= new Array();
	
	var curRow = gt.insertRow(-1);
	
	//Load the gallery into the image array
	for(i=0; i<galleryItems.length; i++)
	{
		var img = new Image();
		
		
		var itemName = galleryItems[i].getElementsByTagName('title')[0].textContent;
		
		if(galleryItems[i].getElementsByTagName('media:thumbnail')[1])
		var thumbSrc = galleryItems[i].getElementsByTagName('media:thumbnail')[1].getAttribute('url');

		else
		var thumbSrc = galleryItems[i].getElementsByTagName('media:thumbnail')[0].getAttribute('url');

		var thumbLink = galleryItems[i].getElementsByTagName('guid')[0].textContent;

		var temp = thumbLink.split("-");
				
		var thumbCode = temp[temp.length-1];
		
		img.src = thumbSrc;
		img.title=itemName;
		img.id=thumbCode;
		img.border='0';
		img.style.width='125px';
		img.class='thumbDeselected';
		
		
		imageArray.push(img);
	
	}
	
	var curRow = gt.insertRow(-1);
	
	for(i=0; i<imageArray.length; i++)
	{
		var curCell = curRow.insertCell(-1);
		
	
		var thumbA = document.createElement('a');
		thumbA.onclick=Function('selectThumb('+imageArray[i].id+'); return false;');
		
		curCell.appendChild(thumbA);
		
		thumbA.appendChild(imageArray[i]);
		
		imageArray[i].style.MozOpacity='0.5';
		
		//Notify when the image is loaded
		thumbA.firstChild.onload=function(){galleryLoaded++;};
		
		if((i+1)%4==0)
		{
		curRow = gt.insertRow(-1);
		}
		
		
	
	}
	
	galleryArea.appendChild(gt);
	
	checkButtons();
	
		
}

//Begin parsing the gallery data
parseGallery();


]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(thumbScript);

initialized=true;


}






//*** Init Function ***//

initThumbz = function()
{
	//Load the RSS Feed
	getDAFeed(dAUser);
	
}


initThumbz();





