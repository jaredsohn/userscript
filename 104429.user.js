// ==UserScript==
// @name           CS2 Select All
// @namespace      CS
// @description    Adds Two new Buttons to the Messages Inbox and Saved Messages: Select All, Clear All
// @include        http://*.chosenspace.com/index.php?go=messages_inbox*
// @include        http://*.chosenspace.com/index.php?go=messages_saved*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
//many thanks to Jez Hailwood from which i took the de/selecting code (only small adaptions made) The code has been given free to use.
	var TrashArray=document.evaluate("//input[@value='Trash Selected']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var Trash=TrashArray.snapshotItem(0);
	if(Trash) {
		var ButtonSelectAll=document.createElement('input');
		ButtonSelectAll.className='forms_btn';
		ButtonSelectAll.type='button';
		ButtonSelectAll.value='Select All';
		ButtonSelectAll.style.margin='0px 2px 0px 0px';
		ButtonSelectAll.setAttribute('onclick',"var allTags=document.getElementsByTagName('input');for(i=0;i<allTags.length;i++){var checkbox=allTags[i];checkbox.checked=true;}");
		var newTD=document.createElement('td');
		Trash.parentNode.parentNode.insertBefore(newTD,Trash.parentNode);
		newTD.appendChild(ButtonSelectAll);
		var ButtonDeselectAll=document.createElement('input');
		ButtonDeselectAll.className='forms_btn';
		ButtonDeselectAll.type='button';
		ButtonDeselectAll.value='Clear All';
		ButtonDeselectAll.style.margin='0px 2px 0px 0px';
		ButtonDeselectAll.setAttribute('onclick',"var allTags=document.getElementsByTagName('input');for(i=0;i<allTags.length;i++) {var checkbox=allTags[i];checkbox.checked=false;}");
		newTD=document.createElement('td');
		Trash.parentNode.parentNode.insertBefore(newTD,Trash.parentNode);
		newTD.appendChild(ButtonDeselectAll);
	}
