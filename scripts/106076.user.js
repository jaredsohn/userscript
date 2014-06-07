// ==UserScript==
// @name           CS2 Re-Design
// @namespace      CS
// @description    Alternative Design
// @include        http://*.chosenspace.com/*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
/****************************************************
/ option: true enables the jumpbox, false disables it
****************************************************/
var jumpbox=true;
/***************************************************
/ No changes beyond this point. thank you.
****************************************************/
var a,newdiv,alltags,thistag,oldTR,botbarstart,clonedTag;
newdiv=document.createElement('div');
newdiv.setAttribute('style','position:fixed;');
alltags=document.evaluate("//input[@style='width: 85px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
a=false;
for(var i=0;i < 14;i++){
	thistag=alltags.snapshotItem(i);
	clonedTag=thistag.cloneNode(true);
	clonedTag.setAttribute('style',(clonedTag.getAttribute('style')+'margin:2px'));
	newdiv.appendChild(clonedTag);
	if (a) { newdiv.appendChild(document.createElement('br')); a=false; }
	else a=true;
}
oldTR=thistag.parentNode.parentNode;
oldTR.style.display='none';
a=false;
botbarstart=alltags.snapshotLength-14;
for(var i=botbarstart;i < alltags.snapshotLength;i++){
	thistag=alltags.snapshotItem(i);
	clonedTag=thistag.cloneNode(true);
	clonedTag.setAttribute('style',(clonedTag.getAttribute('style')+'margin:2px'));
	newdiv.appendChild(clonedTag);
	if (a) { newdiv.appendChild(document.createElement('br')); a=false; }
	else a=true;
}
oldTR=thistag.parentNode.parentNode;
oldTR.style.display='none';
/***************************************************
/ Added Improved Jump Box
****************************************************/
if(jumpbox){
var alltags,thistag,newContent,getsys,system,sector,grid;
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	var sysnames={
		133:{'n':'Arcas Expanse'},
		147:{'n':'Asterion Expanse'},
		148:{'n':'Regulus Expanse'},
		149:{'n':'Hathor Expanse'},
		150:{'n':'Nespian System'},
		151:{'n':'Newhope Expanse'},
		152:{'n':'Polaris Expanse'},
		153:{'n':'Basian System'},
		168:{'n':'Tyrian System'},
		169:{'n':'Memorial Expanse'},
		170:{'n':'Midway Expanse'},
		171:{'n':'Perennis Expanse'},
		172:{'n':'Raxian System'},
		173:{'n':'Ursa Expanse'},
		188:{'n':'Iota Expanse'},
		189:{'n':'Altian System'},
		190:{'n':'Solian System'},
		191:{'n':'Atra Expanse'},
		192:{'n':'Jexian System'},
		193:{'n':'Antares Expanse'},
		208:{'n':'Zarian System'},
		209:{'n':'Allansia Expanse'},
		210:{'n':'Veranza Expanse'},
		211:{'n':'Casian System'},
		212:{'n':'Wartorn Expanse'},
		213:{'n':'Farian System'},
		228:{'n':'Lyrian System'},
		229:{'n':'Pulsar Expanse'},
		230:{'n':'Genian System'},
		231:{'n':'Exile Expanse'},
		232:{'n':'Volian System'},
		233:{'n':'Imperial Expanse'},
		248:{'n':'Meridian Expanse'},
		249:{'n':'Omnian System'},
		250:{'n':'Darkened Expanse'},
		251:{'n':'Adarian System'},
		252:{'n':'Cephalus Expanse'},
		253:{'n':'Desian System'},
		254:{'n':'Heavenly Expanse'},
		268:{'n':'Utopian Expanse'}
	}
	var itrans="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAACcAAAAnASoJkU8AAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";
	function button(off,width,height,btitle,value,backgroundcolor,backgroundpicture,onclick){
		var newButton=document.createElement('input');
		newButton.type='button';
		if(width!='')width+='px';
		else width='auto';
		if(height!='')height+='px';
		else height='auto';
		var bgc='width:'+width+';height:'+height+';';
		var bakb='background:url(data:image/png;base64,';
		var bake=') no-repeat center;background-size:'+width+' '+height+';-moz-background-size:'+width+' '+height+';-o-background-size:'+width+' '+height+';-webkit-background-size:'+width+' '+height+';-khtml-background-size:'+width+' '+height+';';
		if(backgroundpicture!='')bgc+=bakb+backgroundpicture+bake;
		else bgc+=bakb+itrans+bake;
		if(backgroundcolor!='')bgc+='background-color:#'+backgroundcolor+'!important;'
		newButton.value=value;
		if(off){
			if(onclick=='')bgc+='border:1px solid transparent!important;';
			else newButton.className='forms_btn_off';
		}else{
			newButton.className='forms_btn';
			newButton.setAttribute('onclick',onclick);
		}
		newButton.setAttribute('style','margin:2px 2px;'+bgc);
		if(btitle!='')newButton.setAttribute('title',btitle);
		return newButton; 
	}
	function checkopen(s){
		if(s==133)return true;
		if(s>=147&&s<=153)return true;
		if(s>=168&&s<=173)return true;
		if(s>=188&&s<=193)return true;
		if(s>=208&&s<=213)return true;
		if(s>=228&&s<=233)return true;
		if(s>=248&&s<=254)return true;
		if(s==268)return true;
		return false;
	}
	getsys=thistag.getAttribute('onclick');
	system=(getsys.split("system_id=")[1].split("&")[0])*1;
	sector=(getsys.split("sector_id=")[1].split("&")[0])*1;
	grid=(getsys.split("grid_id=")[1].split("'")[0])*1;
	var newRef=location.href.split('/');
		newRef=newRef[0]+"//"+newRef[2]+"/";
	var subdiv=document.createElement('div');
	newdiv.appendChild(subdiv);

	var subspan=document.createElement('span');
	subspan.setAttribute('style','height:auto;width:auto;float:left;text-align:center;margin:10px 0px 0px 0px');
	subdiv.appendChild(subspan);
	var jbsel=document.createElement('select');
	jbsel.id='rjsys';
	jbsel.className='forms';
	jbsel.style.margin='0px 2px 0px 0px';
	var jsys=1;
	while(jsys<=400){
		if(checkopen(jsys)){
			var jbselopt=document.createElement('option');
			if(jsys==system)jbselopt.selected="selected";
			jbselopt.value=jsys;
			if(jsys in sysnames&&'n' in sysnames[jsys])jbselopt.textContent=sysnames[jsys]['n'];
			else jbselopt.textContent=jsys;
			jbsel.appendChild(jbselopt);
		}
		jsys++;
	}
	subspan.appendChild(jbsel);
	subspan.appendChild(document.createElement('br'));
	var text=document.createElement('span');
	text.setAttribute('style',"font:10px Tahoma,Verdana,Arial,Helvetica;color:#cccccc;");
	text.appendChild(document.createTextNode('Sector:'));
	subspan.appendChild(text);
	var child=document.createElement('input');
		child.type='text';
		child.id='rjsec';
		child.className='forms_txt';
		child.style.width='22px';
		child.style.margin='2px 4px 0px 0px';
		child.maxLength=3;
		child.setAttribute('onKeyPress',"var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);
	text=document.createElement('span');
	text.setAttribute('style',"font:10px Tahoma,Verdana,Arial,Helvetica;color:#cccccc;");
	text.appendChild(document.createTextNode('Grid:'));
	subspan.appendChild(text);
	child=document.createElement('input');
		child.type='text';
		child.id='rjgrid';
		child.className='forms_txt';
		child.style.width='22px';
		child.style.margin='2px 0px 0px 2px';
		child.maxLength=3;
		child.setAttribute('onKeyPress',"var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);

	subspan=document.createElement('span');
	subspan.setAttribute('style',"height:auto;width:auto;float:right;margin:10px 0px 0px 0px;");
	subdiv.appendChild(subspan);
	var ishow="iVBORw0KGgoAAAANSUhEUgAAAAsAAAAjCAYAAABCU/B9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAfklEQVQ4T71TgQ3AIAjT/5/is20mM3GMQhU3E6PBim3BUn4ZInLoaT7cQNaBGUdgKImmgTJM0YD00jS+sy4v0BLXYy/eW8qd57z0B0ahboIbWBvo2le3L9LNv8cNnSX8arQbtNfLvTFeDN2gwR2o14ceBKJL7vo8XRTa6wh4Ao0Z+zcpAaPjAAAAAElFTkSuQmCC"
	var view="if(document.getElementById('rjsec').value==''||document.getElementById('rjgrid').value==''){alert('Please fill all fields');return false}location.href='index.php?view=sector&system_id='+parseFloat(document.getElementById('rjsys').value)+'&sector_id='+parseFloat(document.getElementById('rjsec').value)+'&grid_id='+parseFloat(document.getElementById('rjgrid').value);";
	subspan.appendChild(button(false,'11','35','Show Target Location','','',ishow,view));

	subspan=document.createElement('span');
	subspan.setAttribute('style','height:auto;width:auto;float:right;margin:10px 0px 0px 0px');
	subdiv.appendChild(subspan);
	var jls="if(document.getElementById('rjsec').value==''||document.getElementById('rjgrid').value==''){alert('Please fill all fields');return false}location.href='functions/lightspeed.php?system_id='+parseFloat(document.getElementById('rjsys').value)+'&sector_id='+parseFloat(document.getElementById('rjsec').value)+'&grid_id='+parseFloat(document.getElementById('rjgrid').value);";
	subspan.appendChild(button(false,'35','','Lightspeed','LS','','',jls));
	subspan.appendChild(document.createElement('br'));
	var jhj="if(document.getElementById('rjsec').value==''||document.getElementById('rjgrid').value==''){alert('Please fill all fields');return false}location.href='functions/hyperjump.php?system_id='+parseFloat(document.getElementById('rjsys').value)+'&sector_id='+parseFloat(document.getElementById('rjsec').value)+'&grid_id='+parseFloat(document.getElementById('rjgrid').value);";
	subspan.appendChild(button(false,'35','','Hyperjump','HJ','','',jhj));
	subspan=document.createElement('span');
	subspan.setAttribute('style','clear:both');
	subdiv.appendChild(subspan);
}
}
/***************************************************
/ Put stuff on the page now
****************************************************/
var insertion=document.getElementsByTagName('body')[0];
insertion.firstChild.setAttribute('style',(insertion.firstChild.getAttribute('style')+'margin-left:178px'));
insertion.insertBefore(newdiv,insertion.firstChild);
