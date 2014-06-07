// ==UserScript==
// @name           Add name to WellsFargo
// @namespace      https://online.wellsfargo.com/
// @description    Add your name to your online wellsfargo statement. I made this script to facilitate reimbursements at UCLA. They required our name to appear on our statements. 
// @include        https://online.wellsfargo.com/*
// ==/UserScript==

window.addEventListener('load',insertName, true);
function updateName()
{
	var myName = prompt('Please enter your name. It will be autofilled in the future.');
	if( myName ) {
		GM_setValue('name', myName);
		//window.location.reload();
		var nameObj = document.getElementById('myName');
		nameObj.parentNode.removeChild( nameObj );
		insertName();
	}
}
function insertName()
{
	var myName = GM_getValue('name', false);
	if( !myName ){
		var myName = "Click on this above your account to change it!";
	}
	
	//insert name before your account
	var h2Tag = document.evaluate("//h2",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);		
	h2Tag.singleNodeValue.innerHTML = "<font size=+1 id=myName>"+myName+"<br><br></font>"+h2Tag.singleNodeValue.innerHTML;
		
	document.getElementById('myName').addEventListener("click", updateName, true);

	//insert name after the the phrase sign off
	var aTagList = document.evaluate("//a",document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
	
	if(aTagList != null){
		var aTag = aTagList.iterateNext();
		while( aTag ) {
			if(aTag.innerHTML=="Sign Off")
				aTag.innerHTML = aTag.innerHTML+" "+myName;
			aTag = aTagList.iterateNext();
		}
	}	
}
