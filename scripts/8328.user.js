// ==UserScript==
// @name          Cipher's Hotmail Companion 1.2
// @description   Removes ads from Hotmail, shows the sender's email address when mouse is over the senders name, fixes selected rows colors, fixes tooltips, & removes the "Join Windows Live Mail Beta" button.
// @author        Cipher
// @version       1.2
// @include       http://*.hotmail.msn.com/*
// ==/UserScript==


/////////////// Removing ads

var approxNum=document.getElementsByTagName("iframe").length;

for(j=0;j<approxNum;j++)
{
	var hAds=document.getElementsByTagName("iframe");

	for(i=0;i<hAds.length;i++)
	{
		if(hAds[i].src.indexOf("rad.msn.com")>=0)
			hAds[i].parentNode.removeChild(hAds[i]);
	}
	
}



/////////////// Removing the "Join Windows Live Mail Beta" button

var liveButton=document.getElementById("GB");

if(liveButton!=null)
	liveButton.parentNode.removeChild(liveButton);




/////////////// Showing email addresses

if(document.getElementById('MsgTable')!=null)
{
	var hRows=document.getElementsByTagName("tr");


	for(i=0;i<hRows.length;i++)
	{
		nameLocation=getAttributeLocation("name",hRows[i]);
		
		if(nameLocation>=0)
			hRows[i].childNodes[5].title=hRows[i].attributes[nameLocation].value;
		
	}
}



/////////////// Fixing colors of selected rows


var hChkbxs=document.getElementsByTagName("input");


for(i=0;i<hChkbxs.length;i++)
{

	onclickLocation=getAttributeLocation("onclick",hChkbxs[i]);
	
	
	if(hChkbxs[i].type=="checkbox" && onclickLocation>=0)
	{
		if(hChkbxs[i].attributes[onclickLocation].value=="CCA(this)") //checkbox that selects one row
		{
			bgcolorLocation=getAttributeLocation("bgcolor",hChkbxs[i].parentNode.parentNode);
		
			if(bgcolorLocation>=0)
				oldColor=hChkbxs[i].parentNode.parentNode.attributes[bgcolorLocation].value;
			else
				oldColor="#FFFFFF";
		
			hChkbxs[i].attributes[onclickLocation].value="CCA(this); if(this.checked) this.parentNode.parentNode.style.backgroundColor='#C1CDD8'; else this.parentNode.parentNode.style.backgroundColor='"+oldColor+"'";
		}
		else if(hChkbxs[i].attributes[onclickLocation].value=="CA()" || hChkbxs[i].attributes[onclickLocation].value=="CA();") //checkbox that selects all rows
		{
			hChkbxs[i].attributes[onclickLocation].value="CA(); var hChkbxs=document.getElementsByTagName('input'); for(elmntCntr=0;elmntCntr<hChkbxs.length;elmntCntr++){ if((hChkbxs[elmntCntr].name != 'allbox') && (hChkbxs[elmntCntr].type=='checkbox')){ if(this.checked){hChkbxs[elmntCntr].checked=false; hChkbxs[elmntCntr].click();} else{hChkbxs[elmntCntr].checked=true; hChkbxs[elmntCntr].click();}} }";
		}
	}
}



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