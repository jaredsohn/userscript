// ==UserScript==
// @name           CS2 Scan Trails & Scan Grid (show x) pages buttons
// @namespace      CS
// @include        http://*.chosenspace.com/index.php?go=scan_trails
// @include        http://*.chosenspace.com/index.php?go=scan_grid&sortnum=*
// ==/UserScript==
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	function button(off,width,height,btitle,value,backgroundcolor,backgroundpicture,onclick){
		var newButton=document.createElement('input');
		newButton.type='button';
		var bgc='';
		if(width!='')bgc+='width:'+width+';';
		if(height!='')bgc+='height:'+height+';';
		newButton.value=value;
		if(off){
			if(onclick=='')bgc+='border:1px solid transparent!important;';
			else newButton.className='forms_btn_off';
		}else{
			newButton.className='forms_btn';
			newButton.setAttribute('onclick',onclick);
		}
		if(bgc!='')newButton.setAttribute('style',bgc);
		if(btitle!='')newButton.setAttribute('title',btitle);
		return newButton; 
	}
	getsys=thistag.getAttribute('onclick');
	system=getsys.split("system_id=")[1].split("&")[0];
	sector=getsys.split("sector_id=")[1].split("&")[0];
	var scangrid=button(false,'49px!important','','','S-Grid','','',"location.href=('index.php?go=scan_grid&sortnum=999')");
	var scantrails=button(false,'49px!important','','','S-Trail','','',"location.href=('index.php?go=scan_trails')");
	scantrails.style.margin="0px 9px";
	var scansector=button(false,'49px!important','','','S-Sec','','',"location.href=('index.php?go=scan_sector&view=sector&system_id="+system+"&sector_id="+sector+"')");
	var div=document.createElement('div');
	div.setAttribute('style','height:auto;width:auto;margin:2px 0px 0px 0px');
	thistag.parentNode.offsetParent.parentNode.appendChild(div);
	div.appendChild(scansector);
	div.appendChild(scantrails);
	div.appendChild(scangrid);
}