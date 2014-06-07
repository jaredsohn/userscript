// ==UserScript==
// @name          Cipher's Live Hotmail Companion 1.52
// @description   Removes ads from Hotmail, fixes selected rows colors, fixes tooltips, fixes From & Subject Widths, adds From & Subject tooltips to view full text.
// @author        Cipher
// @version       1.52
// @include       http://*.mail.live.com/*
// ==/UserScript==





//////////////// registering classes

var headTag = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';

styleCode=".selectedEmail *, .selectedEmail{ background-color: #C3EBF9 !important;  }\n";
styleCode+=".selectedUnreadEmail *, .selectedUnreadEmail{ font-weight: bold; background-color: #C3EBF9 !important;  }\n";

cssNode.innerHTML=styleCode;

headTag.appendChild(cssNode);





/////////////// Removing Hotmail Classic ads

var topAd=document.getElementById("adHeader");

if(topAd!=null)
	topAd.parentNode.removeChild(topAd);



var sideAd=document.getElementById("dSideAdsDiv");
if(sideAd!=null)
{
	var sideAdParent=sideAd.parentNode;
	sideAdParent.removeChild(sideAd);
	sideAdParent.parentNode.removeChild(sideAdParent);
}



/////////////// Removing Hotmail Full ads

var topAd=document.getElementById("RadAd_TodayPage_Banner");

if(topAd!=null)
	topAd.parentNode.removeChild(topAd);
	
	
	
topAd=document.getElementById("RadAd_Banner");

if(topAd!=null)
	topAd.parentNode.removeChild(topAd);



var sideAd=document.getElementById("cRadAdsToday");
if(sideAd!=null)
{
	var sideAdParent=sideAd.parentNode;
	sideAdParent.removeChild(sideAd);	
}


var sentEmailAd=document.getElementById("RadAd_SMC600");
if(sentEmailAd!=null)
{
	var sentEmailAdParent=sentEmailAd.parentNode;
	sentEmailAdParent.removeChild(sentEmailAd);	
}


var todayContent=document.getElementById("ContentColumnInner");
if(todayContent!=null)
{
	todayContent.setAttribute("style",'width:99%');
}





/////////////// Fixing From & Subject column widths for Hotmail Classic

var mailColgroup=document.getElementsByTagName("colgroup");

if(mailColgroup.length>0)
{
	mailCols=mailColgroup[0].childNodes;
	
	for(i=0;i<mailCols.length;i++)
	{
		if(mailCols[i].className=="dInboxContentTableImportanceCol" || mailCols[i].className=="dInboxContentTableSentStateCol" || mailCols[i].className=="dInboxContentTableAttachmentCol" || mailCols[i].className=="dInboxContentTableCheckBoxCol")
		{
			mailCols[i].className="";
			mailCols[i].style.width="20px";
		}
		else if(mailCols[i].className=="dInboxContentTableFromCol")
		{
			mailCols[i].className="";
			mailCols[i].style.width="400px";
		}
		else if(mailCols[i].className=="dInboxContentTableTitleCol")
		{
			mailCols[i].className="";
			mailCols[i].style.width="40%";
		}
	}
}





/////////////// Fixing From & Subject column widths for Hotmail Full

//to be implemented







/////////////// Fixing colors of selected rows & adding tooltips for From & Subject feilds for Hotmail Classic


var hChkbxs=document.getElementsByTagName("input");


for(i=0;i<hChkbxs.length;i++)
{

	onclickLocation=getAttributeLocation("onclick",hChkbxs[i]);
	
	
	if(hChkbxs[i].type=="checkbox" && onclickLocation>=0)
	{
		if(hChkbxs[i].attributes[onclickLocation].value=="selectone(event)" || hChkbxs[i].attributes[onclickLocation].value=="selectOne();") //checkbox that selects one row
		{
			classLocation=getAttributeLocation("class",hChkbxs[i].parentNode.parentNode);
		
			if(classLocation>=0)
				oldClass=hChkbxs[i].parentNode.parentNode.attributes[classLocation].value;
			else
				{
					oldClass="";
					
					hChkbxs[i].parentNode.parentNode.setAttribute("class",'');
					
					classLocation=getAttributeLocation("class",hChkbxs[i].parentNode.parentNode);
				}
				
			var selectedClass="selectedEmail";
			
			if(oldClass=="InboxContentItemUnread")
				selectedClass="selectedUnreadEmail";
				
				
		
			hChkbxs[i].attributes[onclickLocation].value=hChkbxs[i].attributes[onclickLocation].value+"; if(this.checked){ this.parentNode.parentNode.attributes["+classLocation+"].value='"+selectedClass+"';} else {this.parentNode.parentNode.attributes["+classLocation+"].value='"+oldClass+"'}";
			
			
			// adding tooltips for From & Subject feilds for Hotmail Classic
			fromTD=hChkbxs[i].parentNode.nextSibling.nextSibling;
			subjectTD=fromTD.nextSibling.nextSibling;
			
			tempObject=fromTD;
			while(tempObject.firstChild!=null)
				tempObject=tempObject.firstChild;
			fromTD.title=tempObject.parentNode.innerHTML;
			
			
			
			tempObject=subjectTD;
			while(tempObject.firstChild!=null)
				tempObject=tempObject.firstChild;
			subjectTD.title=tempObject.parentNode.innerHTML;
			
		}
		else if(hChkbxs[i].attributes[onclickLocation].value=="selectall()" || hChkbxs[i].attributes[onclickLocation].value=="selectAll();") //checkbox that selects all rows
		{
			hChkbxs[i].attributes[onclickLocation].value=hChkbxs[i].attributes[onclickLocation].value+"; var hChkbxs=document.getElementsByTagName('input'); for(elmntCntr=0;elmntCntr<hChkbxs.length;elmntCntr++){ if((hChkbxs[elmntCntr].name != 'SelectAllMessages') && (hChkbxs[elmntCntr].name != 'SelectAllContacts') && (hChkbxs[elmntCntr].type=='checkbox')){ if(this.checked){hChkbxs[elmntCntr].checked=false; hChkbxs[elmntCntr].click();} else{hChkbxs[elmntCntr].checked=true; hChkbxs[elmntCntr].click();}} }";
		}
	}
}




/////////////// Adding tooltips for From & Subject feilds for Hotmail Full

//to be implemented



/////////////// Fixing tooltips

var hImgs=document.getElementsByTagName("img");

for(i=0;i<hImgs.length;i++)
{
	
	if(hImgs[i].alt!=null)
		hImgs[i].title=hImgs[i].alt;
	
}




/////////////// Functions used

function getAttributeLocation(attribute,element) //gets the array location of the name attribute of an element, returns -1 if not found
{ 
	for(attribCounter=0;attribCounter<element.attributes.length;attribCounter++)
	{
		if(element.attributes[attribCounter].name==attribute)
			return attribCounter;
	}
	
	return -1;
}