// ==UserScript==
// @name           CS2 Add Scan Button on mine
// @namespace      CS
// @include        http://g1.chosenspace.com/index.php?go=asteroid_mine
// ==/UserScript==
alltags=document.evaluate("//input[@value[contains(.,'Mine')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var thistag=alltags.snapshotItem(0);
if(thistag){
	alltags=document.evaluate("//a[contains(text(),' Ore')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var linktag=alltags.snapshotItem(0);
	var text=linktag.parentNode.textContent;
	var reavailturns=/\d*\,*\d*\sturns/ig;
	var reisatons=/\d*\,*\d*\,*\d*\sisatons/ig;
	var recargohold=/hold\s\(\d*\,*\d*\/\d*\,*\d*\)/ig;
	var reoreperturn=/per\s\d*\sore/ig;
	var matches,availturns,isatons,cargoholdfill,cargoholdmax,oreperturn,maxminecargo,maxmineturns,maxmineisaton,minethis;
		availturns=(reavailturns.exec(text)[0].split(' ')[0].split(',').join(''))*1;
		isatons=(reisatons.exec(text)[0].split(' ')[0].split(',').join(''))*1;
		isatons=isatons/10;
		oreperturn=(reoreperturn.exec(text)[0].split(' ')[1].split(' ')[0])*1;
	matches = recargohold.exec(text);
		cargoholdfill=(matches[0].split('(')[1].split('/')[0].split(',').join(''))*1;
		cargoholdmax=(matches[0].split('/')[1].split(')')[0].split(',').join(''))*1;
		cargoholdfreeforore=(cargoholdmax-cargoholdfill)/10;
	maxminecargo=Math.floor(cargoholdfreeforore/oreperturn)*oreperturn;
	maxmineturns=availturns*oreperturn;
	maxmineisaton=Math.floor(isatons/oreperturn)*oreperturn;
	var warning="cccccc";var desc="";
	if(maxmineisaton==0){maxmineisaton=isatons;warning="FFAE00";desc+=" Asteroid will be Finished. ";}
	if(maxminecargo==0){maxminecargo=cargoholdfreeforore;warning="FC2A0F";desc+=" Cargohold will be full. ";}
	if(maxmineturns==0){warning="00B2EE";desc+=" You're out of turns. ";}
	minethis=Math.floor((maxmineturns<=maxminecargo)?((maxmineturns<=maxmineisaton)?maxmineturns:maxmineisaton):((maxminecargo<=maxmineturns)?((maxminecargo<=maxmineisaton)?maxminecargo:maxmineisaton):(-1)));
	
	alltags=document.evaluate("//input[@name='amount']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var minetag=alltags.snapshotItem(0);
	minetag.setAttribute('value',minethis);
	minetag.setAttribute('style',"border-color:#"+warning+"!important;");
	minetag.setAttribute('title',desc);
	var newbutton=document.createElement("input");
	newbutton.setAttribute('type','button');
	newbutton.setAttribute('class','forms_btn');
	newbutton.setAttribute('value','Scan');
	newbutton.setAttribute('style','margin-left:5px;');
	newbutton.setAttribute('onclick',"location.href=('index.php?go=asteroid_scan')");
	thistag.setAttribute('style','margin-left:5px;');
	thistag.parentNode.appendChild(newbutton);
}
else{
	var content=document.getElementsByTagName('body')[0].textContent;
	var gone=/Asteroid\sGone/i;
	var roid=/Asteroid\sMined.*\d*\sx\s.*\sOre/i;
	if(gone.test(content)){
		var subject="Asteroid @ ";
		var msgcontent="All gone.";
		if(roid.test(content)){
			var mined=roid.exec(content)[0];
			subject=(mined.split('x ')[1].split(' Ore')[0])+" roid @ ";
			msgcontent+="\nI got the last "+(mined.split(' x')[0].split(': ')[1])+" ores of the Asteroid.";
		}
		var thistak,getsys,system,sector,grid;
		alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var thistak=alltags.snapshotItem(0);
		if(thistak){
			getsys=thistak.getAttribute('onclick');
			subject+=(getsys.split("system_id=")[1].split("&")[0])+'.';
			subject+=(getsys.split("sector_id=")[1].split("&")[0])+'.';
			subject+=(getsys.split("grid_id=")[1].split("'")[0])+' GONE';
			
			var main=document.createElement("div");
			main.setAttribute('style','align:center');
			var newbutton=document.createElement("hr");
			newbutton.setAttribute('width','80%');
			main.appendChild(newbutton);
			var newform=document.createElement("form");
			newform.setAttribute('action','functions/message_all.php');
			newform.setAttribute('method','post');
			newform.setAttribute('style','display:inline;');
			newform.setAttribute('name','preview');
			newform.appendChild(document.createTextNode('Subject: '));
			newbutton=document.createElement("input");
			newbutton.setAttribute('type','text');
			newbutton.setAttribute('style','width:20%;');
			newbutton.setAttribute('maxlength','50');
			newbutton.setAttribute('class','forms_txt');
			newbutton.setAttribute('name','msg_subject');
			newbutton.setAttribute('value',subject);
			newform.appendChild(newbutton);
			newform.appendChild(document.createTextNode(' ::: '));
			newbutton=document.createElement("input");
			newbutton.setAttribute('type','radio');
			newbutton.setAttribute('name','chooser');
			newbutton.setAttribute('checked','checked');
			newbutton.setAttribute('onclick',"document.preview.action='functions/message_all.php'; document.preview.user_name.disabled=true; document.preview.user_name.setAttribute('class','forms_txt_off');");
			newform.appendChild(newbutton);
			newform.appendChild(document.createTextNode('All '));
			newbutton=document.createElement("input");
			newbutton.setAttribute('type','radio');
			newbutton.setAttribute('name','chooser');
			newbutton.setAttribute('onclick',"document.preview.action='functions/message_group.php'; document.preview.user_name.disabled=true; document.preview.user_name.setAttribute('class','forms_txt_off');");
			newform.appendChild(newbutton);
			newform.appendChild(document.createTextNode('Group '));
			newbutton=document.createElement("input");
			newbutton.setAttribute('type','radio');
			newbutton.setAttribute('name','chooser');
			newbutton.setAttribute('onclick',"document.preview.action='functions/messages_send.php?user_id=&reply_id='; document.preview.user_name.disabled=false; document.preview.user_name.setAttribute('class','forms_txt');");
			newform.appendChild(newbutton);
			newform.appendChild(document.createTextNode('Captain: '));
			newbutton=document.createElement("input");
			newbutton.setAttribute('type','text');
			newbutton.setAttribute('style','width:10%;');
			newbutton.setAttribute('maxlength','20');
			newbutton.setAttribute('class','forms_txt_off');
			newbutton.setAttribute('name','user_name');
			newbutton.setAttribute('disabled','disabled');
			newform.appendChild(newbutton);
			newform.appendChild(document.createTextNode(' ::: '));
			newbutton=document.createElement("input");
			newbutton.setAttribute('type','submit');
			newbutton.setAttribute('class','forms_btn');
			newbutton.setAttribute('value',"Send");
			newform.appendChild(newbutton);
			var message=document.createElement("textarea");
			message.setAttribute('class','forms');
			message.setAttribute('cols','110');
			message.setAttribute('rows','8');
			message.setAttribute('name','text');
			message.setAttribute('id','text');
			message.appendChild(document.createTextNode(msgcontent));
			newform.appendChild(message);
			main.appendChild(newform);
			
			alltags=document.evaluate("//text()[contains(.,'Asteroid Gone')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			thistag=alltags.snapshotItem(0);
			thistag.parentNode.appendChild(main);
		}
	}
}