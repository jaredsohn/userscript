// ==UserScript==
// @name           CS2 user ID Browser
// @namespace      CS
// @include        http://g1.chosenspace.com/index.php?go=user_info&user_id=*
// ==/UserScript==
var alltags,thistag,newContent;
alltags=document.evaluate("//div[@style='position: relative; width: 423px; height: 15px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	var id=thistag.baseURI.split('user_id=')[1];
	id=id*1;
	newbutton=document.createElement("input");
	newbutton.setAttribute('type','button');
	newbutton.setAttribute('class','forms_btn');
	newbutton.setAttribute('value',"Previous");
	newbutton.setAttribute('style','float:left;');
	newbutton.setAttribute('onclick',"location.href='http://g1.chosenspace.com/index.php?go=user_info&user_id="+(id-1)+"'");
	thistag.appendChild(newbutton);
	newbutton=document.createElement("input");
	newbutton.setAttribute('type','button');
	newbutton.setAttribute('class','forms_btn');
	newbutton.setAttribute('value',"Next");
	newbutton.setAttribute('style','float:right;');
	newbutton.setAttribute('onclick',"location.href='http://g1.chosenspace.com/index.php?go=user_info&user_id="+(id+1)+"'");
	thistag.appendChild(newbutton);
}
