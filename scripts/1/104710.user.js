// ==UserScript==
// @name           CS2 faction ID Browser
// @namespace      CS
// @include        http://g1.chosenspace.com/index.php?go=faction_info&faction_id=*
// ==/UserScript==
var alltags,thistag,newContent;
alltags=document.evaluate("//div[@style='position: relative; width: 423px; height: 15px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	var id=(thistag.baseURI.split('faction_id=')[1])*1;
	var pid=id-1;
	var nid=id+1;
	newbutton=document.createElement("input");
	newbutton.setAttribute('type','button');
	newbutton.setAttribute('value',"Previous");
	newbutton.setAttribute('style','float:left;');
	if(pid<1000)pid=1;
	if((id-1)<1&&pid==1){
		newbutton.setAttribute('class','forms_btn_off');
		newbutton.setAttribute('disabled','disabled');}
	else{
		newbutton.setAttribute('class','forms_btn');
		newbutton.setAttribute('onclick',"location.href='http://g1.chosenspace.com/index.php?go=faction_info&faction_id="+pid+"'");}
	thistag.appendChild(newbutton);
	newbutton=document.createElement("input");
	newbutton.setAttribute('type','button');
	newbutton.setAttribute('class','forms_btn');
	newbutton.setAttribute('value',"Next");
	newbutton.setAttribute('style','float:right;');
	if(nid<1000)nid=1000;
	newbutton.setAttribute('onclick',"location.href='http://g1.chosenspace.com/index.php?go=faction_info&faction_id="+nid+"'");
	thistag.appendChild(newbutton);
}
