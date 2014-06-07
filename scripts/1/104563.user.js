// ==UserScript==
// @name        CS2 Asteroid Scan Enhancement
// @namespace   CS
// @description changes the asteroid scan page. also includes possibility to directly message the whole faction or group. no preview available on the message. 
// @include     http://*.chosenspace.com/index.php?go=asteroid_scan
// ==/UserScript==
function format(n){n=n.toString();result="";len=n.length;while(len>3){result=","+n.substr(len-3,3)+result;len-=3;}return n.substr(0,len)+result;}
function row(){
	var ret=document.createElement("div");
	ret.setAttribute('style','overflow:hidden;display:table;');
	return ret;
}
function cell(content,width,align){
	var ret=document.createElement("span");
	if(width==undefined)width="auto";
	if(align==undefined)align="center";
	ret.setAttribute('style','float:left;width:'+width+';text-align:'+align);
	ret.appendChild(content);
	return ret;
}
function cellspan(color,content){
	var newspan=document.createElement('span');
	newspan.setAttribute('style','color:#'+color);
	newspan.appendChild(content);
	return newspan;
}
function perc(x) {
	if((x*1)==0)return "0";
	var k = (Math.round(x * 10) / 10).toString();
	k += (k.indexOf('.') == -1)? '.0' : '0';
	k=k.substring(0, k.indexOf('.') + 2);
	return (k=='100.0')?'100':k;
}
var alltags,thistag,arro,arri,arr,scan,scantmp,scanwork;
alltags=document.evaluate("//a[@href[contains(.,'index.php?go=item_info&item_id=')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	thistag=thistag.parentNode;
	scan=thistag.textContent;
	alltags=document.evaluate("//input[@value='Mine']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var thistak=alltags.snapshotItem(0);
	var mining=thistak.cloneNode(true);
	while(thistag.childNodes.length>=1){
		thistag.removeChild(thistag.lastChild);
	}
	var message=document.createElement("textarea");
	message.setAttribute('class','forms');
	message.setAttribute('cols','110');
	message.setAttribute('rows','8');
	message.setAttribute('name','text');
	message.setAttribute('id','text');
	arri=0;arro=0;
	arr=new Array();
	scantmp=scan.split("\n");
	while(arri<30){
		scanwork=scantmp[arri];
		if(scanwork==undefined){
			break;
		}
		if(scanwork!=""){
			arr[arro]=scanwork;
			arro++;
		}
		arri++;
	}
	var thistak,getsys,ret,retlink,system,sector,grid;
	alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	thistak=alltags.snapshotItem(0);
	if(thistak){
		getsys=thistak.getAttribute('onclick');
		ret=getsys.split("?")[1].split("'")[0];
		system=getsys.split("system_id=")[1].split("&")[0];
		sector=getsys.split("sector_id=")[1].split("&")[0];
		grid=getsys.split("grid_id=")[1].split("'")[0];
		retlink="["+ret+"]Location: "+system+"."+sector+"."+grid+" (click me)[/view]";
		message.appendChild(document.createTextNode("[LEFT]"+retlink));
		message.appendChild(document.createTextNode('\n'));
		message.appendChild(document.createTextNode('\n'));
	}
	var main=document.createElement("div");
	main.setAttribute('style','align:center');
	main.appendChild(document.createTextNode(arr[0]));
	main.appendChild(document.createTextNode(': '));
	main.appendChild(document.createTextNode(arr[1]));
	main.appendChild(document.createElement('br'));
	main.appendChild(document.createElement('br'));
	main.appendChild(document.createTextNode(arr[3]));
	main.appendChild(document.createElement('br'));
	var	layeramount=arr.length-5;
	var roidtype=arr[1].split(" ")[0];
	var	turnsmb=new Array();
	turnsmb[0]=0;
	turnsmb[1]=0;
	turnsmb[2]=0;
	turnsmb[3]=0;
	turnsmb[4]=0;
	var	turnsoff=0;
	var	layeri=0;
	var	ore=0;
	var coloro=" - [color=#";
	var colore="]";
	var retcolor=new Array();
	retcolor[0]="f55454";
	retcolor[1]="f5f525";
	retcolor[2]="ef49f5";
	retcolor[3]="4ee6e1";
	retcolor[4]="15e83f";
	retcolor[5]="101010";
	var	endcolor="[/color]";
	var layermb=new Array();
	var wholeroid=arr[2].split(" ")[0].split(",").join("");
	wholeroid=wholeroid*1;
	var goodore=0;
	var badore=0;
	var percents;
	while(layeri<layeramount){
		if(arr[layeri+4]!="Scanner cannot penetrate this Layer"){
			var layer=arr[layeri+4].split(" - ")[1].split(" ")[0].split(",").join("");
			layer=layer*1;
			var oretype=arr[layeri+4].split(" Ore")[0];
			percents=perc((layer/wholeroid)*100);
			if(oretype!="Iridium")goodore+=(percents*1);
			else badore+=(percents*1);
			layermb[0]=Math.ceil(layer/200);
			layermb[1]=Math.ceil(layer/250);
			layermb[2]=Math.ceil(layer/300);
			layermb[3]=Math.ceil(layer/350);
			layermb[4]=Math.ceil(layer/400);
			ore+=layer;
			var newrow=row();
			var desc=arr[layeri+4].split(" - ")[0];
			var size=arr[layeri+4].split(" - ")[1];
			newrow.appendChild(cell(document.createTextNode(desc),'120px','left'));
			newrow.appendChild(cell(document.createTextNode(' - ')));
			newrow.appendChild(cell(document.createTextNode(size),'100px','right'));
			var ex=0;
			while(ex<5){
				turnsmb[ex]+=layermb[ex];
				arr[layeri+4]+=coloro+retcolor[ex]+colore+layermb[ex]+endcolor;
				newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode(' - '))));
				newrow.appendChild(cell(cellspan(retcolor[ex],document.createTextNode(format(layermb[ex]))),'35px','right'));
				ex++;
			}
			arr[layeri+4]+=" - "+percents+"%";
			newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode(' - '))));
			newrow.appendChild(cell(document.createTextNode(percents+'%'),'30px','right'));
			main.appendChild(newrow);
		}
		else{
			turnsoff++;
			main.appendChild(document.createTextNode(arr[layeri+4]));
			main.appendChild(document.createElement('br'));
		}
		layeri++;
	}
	main.appendChild(document.createTextNode(arr[layeri+4]));
	main.appendChild(document.createElement('br'));
	main.appendChild(document.createElement('br'));
	var wholeroidmb=new Array();
	if(turnsoff>0){
		wholeroidmb[0]=Math.ceil((wholeroid-ore)/200);
		wholeroidmb[1]=Math.ceil((wholeroid-ore)/250);
		wholeroidmb[2]=Math.ceil((wholeroid-ore)/300);
		wholeroidmb[3]=Math.ceil((wholeroid-ore)/350);
		wholeroidmb[4]=Math.ceil((wholeroid-ore)/400);
		newrow=row();
		var one="";
		var two="";
		if(turnsoff>1){
			one="s";
			two="them"
		}
		else{
			two="it"
		}
		arr[arr.length]="unknown Layer"+one+" - "+turnsoff+" of "+two;
		newrow.appendChild(cell(document.createTextNode("unknown Layer"+one),'120px','left'));
		newrow.appendChild(cell(document.createTextNode(' - ')));
		newrow.appendChild(cell(document.createTextNode(turnsoff+" of "+two),'100px','right'));
		var ex=0;
		while(ex<5){
			turnsmb[ex]=format(turnsmb[ex]+wholeroidmb[ex]+turnsoff);
			arr[arr.length-1]+=coloro+retcolor[ex]+colore+turnsmb[ex]+endcolor;
			newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode(' - '))));
			newrow.appendChild(cell(cellspan(retcolor[ex],document.createTextNode(wholeroidmb[ex])),'35px','right'));
			ex++;
		}
		percents=perc(((wholeroid-ore)/wholeroid)*100);
		arr[arr.length-1]+=" - "+percents+"%";
		newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode(' - '))));
		newrow.appendChild(cell(document.createTextNode(percents+"%"),'30px'));
		main.appendChild(newrow);
		main.appendChild(document.createElement('br'));
	}
	else{
		turnsmb[0]=format(turnsmb[0]);
		turnsmb[1]=format(turnsmb[1]);
		turnsmb[2]=format(turnsmb[2]);
		turnsmb[3]=format(turnsmb[3]);
		turnsmb[4]=format(turnsmb[4]);
	}
	newrow=row();
	newrow.appendChild(cell(document.createTextNode("Complete Asteroid"),'120px','left'));
	newrow.appendChild(cell(document.createTextNode(' - ')));
	newrow.appendChild(cell(document.createTextNode(arr[2]),'100px','right'));
	var ex=0;
	while(ex<5){
		newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode(' - '))));
		newrow.appendChild(cell(cellspan(retcolor[ex],document.createTextNode(turnsmb[ex])),'35px','right'));
		ex++;
	}
	newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode(' - '))));
	newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode("http://g1.chosenspace.com/index.php?view=sector&system_id="+system+"&sector_id="+sector+"&grid_id="+grid)),'30px','right;max-height:1em;overflow:hidden;'));
	main.appendChild(newrow);
	arr[arr.length]="";
	goodore=perc(goodore);
	arr[arr.length-1]+=(goodore=="0")?"":goodore+"% "+roidtype;
	badore=perc(badore);
	arr[arr.length-1]+=(badore=="0")?"":" - "+badore+"% Iridium";
	var tmpunk=100-(1*goodore)-(1*badore);
	arr[arr.length-1]+=(tmpunk<=0.1)?"":" - "+perc(tmpunk)+"% unknown";
	main.appendChild(document.createTextNode(arr[arr.length-1]));
	main.appendChild(document.createElement('br'));
	main.appendChild(document.createElement('br'));
	main.appendChild(mining);
	main.appendChild(document.createElement('br'));
	main.appendChild(document.createElement('br'));
	arr[2]+=coloro+retcolor[0]+colore+turnsmb[0]+endcolor+coloro+retcolor[1]+colore+turnsmb[1]+endcolor+coloro+retcolor[2]+colore+turnsmb[2]+endcolor+coloro+retcolor[3]+colore+turnsmb[3]+endcolor+coloro+retcolor[4]+colore+turnsmb[4]+endcolor;

	message.appendChild(document.createTextNode(arr[0]));
	message.appendChild(document.createTextNode(': '));
	layeri=1;
	while(layeri<arr.length){
		message.appendChild(document.createTextNode(arr[layeri]));
		message.appendChild(document.createTextNode('\n'));
		if(layeri==2||arr[layeri]=="Asteroid Core")message.appendChild(document.createTextNode('\n'));
		layeri++;
	}
	message.appendChild(document.createTextNode('\n'));
	message.appendChild(document.createTextNode("Legend:"));
	message.appendChild(document.createTextNode('\n'));
	message.appendChild(document.createTextNode("Turn usage for"+coloro+retcolor[0]+colore+"Mining Bay 1"+endcolor+coloro+retcolor[1]+colore+"Mining Bay 2"+endcolor+coloro+retcolor[2]+colore+"Mining Bay 3"+endcolor+coloro+retcolor[3]+colore+"Mining Bay 4"+endcolor+coloro+retcolor[4]+colore+"Mining Bay 5"+endcolor));
	message.appendChild(document.createTextNode('\n'));
	message.appendChild(document.createTextNode("[/LEFT]"));
	thistag.appendChild(main);
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
	newbutton.setAttribute('value',roidtype+" @ "+system+"."+sector+"."+grid);
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
	newform.appendChild(message);
	main.appendChild(newform);
	thistag.appendChild(main);
}
else{
	var content=document.getElementsByTagName('body')[0].textContent;
	var gone=/Asteroid\sGone/i;
	var roid=/Asteroid\sMined.*\d*\sx\s.*\sOre/i;
	if(gone.test(content)){
		var subject="Asteroid @ ";
		var msgcontent="All gone.";
		if(roid.test(content)){
			var mined=roid.exec(content);
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
