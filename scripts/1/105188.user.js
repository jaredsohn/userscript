// ==UserScript==
// @name           CS2 Message Asteroid Scan Enhancement
// @namespace      CS
// @description    if we find a Asteroid scan in a message we will display an info box with more details in it. If we find a Ship scan, we will do the same with the ship. If you hover with your mouse over the sector button, it will show a direct jump form box below (shifts messages a bit)
// @include        http://g1.chosenspace.com/index.php?go=messages_read&msg_id=*
// ==/UserScript==
/****************************************************
/ option: true enables the jumpbox, false disables it
****************************************************/
var jumpbox=false;
/***************************************************
/ No changes beyond this point. thank you.
****************************************************/
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
alltags=document.evaluate("//a[@href[contains(.,'index.php?go=user_info&user_id=')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	thistag=thistag.parentNode;
	scan=thistag.textContent;
	var main=document.createElement("div");
	main.setAttribute('class','forms_txt_fade');
	main.setAttribute('style','height:auto;margin:10px 0px 0px 0px;padding:5px;');
	/***************************************************
	/ Asteroids & Ships top level ressources
	****************************************************/
	var asteroidsurface=/asteroid\ssurface/ig;
	var asteroidcore=/asteroid\score/ig;
	var shipname=/ship\sname/ig;
	var designname=/design\sname/ig;
	var retcolor=new Array();
	retcolor[0]="f55454";
	retcolor[1]="f5f525";
	retcolor[2]="ef49f5";
	retcolor[3]="4ee6e1";
	retcolor[4]="15e83f";
	retcolor[5]="101010";
	/***************************************************
	/ Ships - Calculations made by Nihilant. Thank you!
	****************************************************/
	if(shipname.test(scan)||designname.test(scan)){
		// variables for calculations
		var hullMod=0;
		var hull=0;
		var shield=0;
		var shieldLvl=0;
		var shieldPercent=100;
		var armor=0;
		var armorLvl=0;
		var armorPercent=100;
		var integrityPercent=100;
		var totalDMG=-1;
		var condition=1;
		// stats grabber from the page
		var risa1=/Isatons:.*/;
		var risa2=/Size:.*/;
		var rhull=/Hull:.*/;
		var rshield=/Shield\sGen:.*/;
		var rsperc=/Shield:.*%/;
		var rarmor=/Armor.*Armor/;
		var raperc=/Armor.*%/;
		var riperc=/Integrity:.*%/;
		var rdamage=/Damage:.*/;
		var rcondition=/Condition:.*/;
		var outpost=false;
		var rop=/Outpost Core:.*/;
		function stripit(thing){
			var ret=thing+"";
			ret=ret.replace(/\D/g,"");
			return (ret)*1;
		}
		var result,isa;
		if(risa1.test(scan)){
			result=risa1.exec(scan);
			isa=stripit(result);
		}else if(risa2.test(scan)){
			result=risa2.exec(scan);
			isa=stripit(result);
		}
		if(rhull.test(scan)){
			result=rhull.exec(scan);
			hull=stripit(result);
		}
		if(rshield.test(scan)){
			result=rshield.exec(scan);
			shield=stripit(result);
		}
		if(rsperc.test(scan)){
			result=rsperc.exec(scan);
			shieldPercent=stripit(result);
		}
		if(rarmor.test(scan)){
			result=rarmor.exec(scan);
			armor=stripit(result);
		}
		if(raperc.test(scan)){
			result=raperc.exec(scan);
			armorPercent=stripit(result);
		}
		if(riperc.test(scan)){
			result=riperc.exec(scan);
			integrityPercent=stripit(result);
		}
		if(rdamage.test(scan)){
			result=rdamage.exec(scan);
			totalDMG=stripit(result);
		}
		if(rop.test(scan)){
			outpost=true;
		}
		if(rcondition.test(scan)){
			result=rcondition.exec(scan);
			result+='';
			if(result.search(/New/)>=0)condition=1;
			else if(result.search(/Excellent/)>=0)condition=1.05;
			else if(result.search(/Very\sGood/)>=0)condition=1.1;
			else if(result.search(/Good/)>=0)condition=1.15;
			else if(result.search(/Fair/)>=0)condition=1.2;
			else if(result.search(/Poor/)>=0)condition=1.25;
			else if(result.search(/Very\sPoor/)>=0)condition=1.3;
			else if(result.search(/Unstable/)>=0)condition=1.35;
		}
		switch(shield){	
			case 286:shieldLvl=1;break;
			case 667:shieldLvl=2;break;
			case 1147:shieldLvl=3;break;
			case 1714:shieldLvl=4;break;
			case 2381:shieldLvl=5;break;
			case 3143:shieldLvl=6;break;
			case 4000:shieldLvl=7;break;
			case 4952:shieldLvl=8;break;
			case 6000:shieldLvl=9;break;
			case 7143:shieldLvl=10;break;
		}
		switch(armor){
			case 1:hullMod=0.01;armorLvl=1;break;
			case 5:hullMod=0.01;armorLvl=2;break;
			case 9:hullMod=0.01;armorLvl=3;break;
		}
		// weapons damage
		var ruptor1=2.88;
		var ion=3.24;
		var ruptor2=3.6*condition;
		// actual calculations for turns
		shieldPercent/=100;
		armorPercent/=100;
		integrityPercent/=100;
		var chassisSize=isa/(1+((hull+400)/20000)+hullMod);
		if(totalDMG!=-1){}
		else{totalDMG=Math.round(((chassisSize/20)*(hull/1000))+((chassisSize/100)*armorLvl)+(shieldLvl*500));}
		if(hullMod!=0){totalDMGcurrent=Math.round(((chassisSize/20)*(hull/1000))+((chassisSize/100)*armorLvl*armorPercent)+(shieldLvl*500*shieldPercent));}
		else{totalDMGcurrent=Math.round(((chassisSize/20)*(hull/1000))+(shieldLvl*500*shieldPercent));}
		var turns2undock=(isa*0.05)/ruptor1;
		var turns2shields=shieldLvl*500*shieldPercent;
		var turns2armor=(chassisSize/100)*armorLvl*armorPercent;
		var integrity=Math.round((totalDMG-((chassisSize/100)*armorLvl)-(shieldLvl*500))*integrityPercent);
		var totalTurns=turns2shields/ion+turns2armor/ruptor2+integrity/ruptor1;
		var totalTurnsUndocking=totalTurns+turns2undock;
		// printing stuff on CS page
		newrow=row();
		newrow.appendChild(cell(cellspan(retcolor[0],document.createTextNode('Total Damage (by design):')),'200px','left'));
		newrow.appendChild(cell(cellspan(retcolor[0],document.createTextNode(format(totalDMG))),'50px','right'));
		main.appendChild(newrow);	
		newrow=row();
		newrow.appendChild(cell(cellspan(retcolor[1],document.createTextNode('Total Damage (current):')),'200px','left'));
		newrow.appendChild(cell(cellspan(retcolor[1],document.createTextNode(format(totalDMGcurrent))),'50px','right'));
		main.appendChild(newrow);
		if(outpost){
			newrow=row();
			newrow.appendChild(cell(cellspan(retcolor[2],document.createTextNode('To Destroy Integrity (100% accuracy):')),'200px','left'));
			newrow.appendChild(cell(cellspan(retcolor[2],document.createTextNode(format(Math.round(integrity/ruptor2)))),'50px','right'));
			main.appendChild(newrow);
		}else{
			newrow=row();
			newrow.appendChild(cell(document.createTextNode('To Undock (accuracy is always 100%):'),'200px','left'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2undock))),'50px','right'));
			main.appendChild(newrow);	
			newrow=row();
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('Turns/Accuracy:')),'110px','left'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('100%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('90%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('80%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('70%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('60%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('50%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('40%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('30%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('20%')),'50px','right'));
			newrow.appendChild(cell(cellspan(retcolor[4],document.createTextNode('10%')),'50px','right'));
			main.appendChild(newrow);	
			newrow=row();
			newrow.appendChild(cell(document.createTextNode('To Destroy Shields:'),'110px','left'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/ion))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.9)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.8)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.7)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.6)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.5)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.4)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.3)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.2)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2shields/(ion*0.1)))),'50px','right'));
			main.appendChild(newrow);		
			newrow=row();
			newrow.appendChild(cell(document.createTextNode('To Destroy Armor:'),'110px','left'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/ruptor2))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.9)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.8)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.7)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.6)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.5)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.4)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.3)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.2)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(turns2armor/(ruptor2*0.1)))),'50px','right'));
			main.appendChild(newrow);
			newrow=row();
			newrow.appendChild(cell(document.createTextNode('To Destroy Integrity:'),'110px','left'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/ruptor1))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.9)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.8)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.7)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.6)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.5)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.4)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.3)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.2)))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(integrity/(ruptor1*0.1)))),'50px','right'));
			main.appendChild(newrow);
			newrow=row();
			newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode('----------'))));
			main.appendChild(newrow);
			newrow=row();
			var prettyprint=cellspan(retcolor[0],document.createTextNode('Total Turns Space:'));
			prettyprint.setAttribute('title','Total Turns without undocking');
			newrow.appendChild(cell(prettyprint,'110px','left'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.9))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.8))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.7))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.6))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.5))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.4))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.3))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.2))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.1))),'50px','right'));
			main.appendChild(newrow);	
			newrow=row();
			var prettyprint=cellspan(retcolor[1],document.createTextNode('Total Turns Dock:'));
			prettyprint.setAttribute('title','Total Turns with undocking');
			newrow.appendChild(cell(prettyprint,'110px','left'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.9+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.8+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.7+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.6+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.5+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.4+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.3+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.2+turns2undock))),'50px','right'));
			newrow.appendChild(cell(document.createTextNode(format(Math.round(totalTurns/0.1+turns2undock))),'50px','right'));
			main.appendChild(newrow);
		}
		newrow=row();
		newrow.appendChild(cell(cellspan(retcolor[5],document.createTextNode('----------'))));
		main.appendChild(newrow);
		newrow=row();
		newrow.appendChild(cell(cellspan(retcolor[3],document.createTextNode('*All turns calculated with 0.9 cannons. For 0.3 cannons multiply turns by 3, for 0.1 cannons multiply by 9*'))));
		main.appendChild(newrow);
		thistag.appendChild(main);		
	}
	/***************************************************
	/ Asteroids
	****************************************************/
	if(asteroidsurface.test(scan)&&asteroidcore.test(scan)){
		var	turnsmb=new Array();
		turnsmb[0]=0;
		turnsmb[1]=0;
		turnsmb[2]=0;
		turnsmb[3]=0;
		turnsmb[4]=0;
		var layermb=new Array();
		var myformat=/location.\s\d{1,3}\.\d{1,3}\.\d{1,3}/i;
		var layers=/(iridium|quadrium|fullerite|gold|tetrium|zirconium)\sOre\sLayer\s-\s(\d*,*)*\sIsatons/ig;
		var whole=/(quadrium|fullerite|gold|tetrium|zirconium)\sOre(\r\n|\r|\n)(\d*,*)*\sIsatons/i;
		var temp,oretype,size,newrow,roidtype;
		var fullsize=false;
		if(whole.test(scan)){
			temp=whole.exec(scan);
			fullsize=(temp[0].split(' Isatons')[0].split(/\r\n|\r|\n/)[1].split(',').join(''))*1;
			roidtype=temp[0].split(' Ore')[0];
		}
		var shell=0;
		var real=0;
		while(matches=layers.exec(scan)){
			temp=matches[0].split(' Ore Layer - ');
			oretype=temp[0];
			layer=(temp[1].split(' Isatons')[0].split(',').join(''))*1;
			if(oretype=='Iridium')shell+=layer;
			else real+=layer;
			layermb[0]=Math.ceil(layer/200);
			layermb[1]=Math.ceil(layer/250);
			layermb[2]=Math.ceil(layer/300);
			layermb[3]=Math.ceil(layer/350);
			layermb[4]=Math.ceil(layer/400);
			newrow=row();
			newrow.appendChild(cell(document.createTextNode(oretype+' Ore Layer'),'120px','left'));
			newrow.appendChild(cell(document.createTextNode(' - ')));
			newrow.appendChild(cell(document.createTextNode(format(layer)),'100px','right'));
			for(var l=0;l<=4;l++){
				turnsmb[l]+=layermb[l];
				newrow.appendChild(cell(cellspan(retcolor[l],document.createTextNode(format(layermb[l]))),'35px','right'));
			}
			if(fullsize){
				newrow.appendChild(cell(document.createTextNode(perc((layer/fullsize)*100)+'%'),'35px','right'));
			}
			main.appendChild(newrow);
		}
		if(fullsize){
			var rest=fullsize-shell-real;
			if(rest>0){
				layermb[0]=Math.ceil(rest/200);
				layermb[1]=Math.ceil(rest/250);
				layermb[2]=Math.ceil(rest/300);
				layermb[3]=Math.ceil(rest/350);
				layermb[4]=Math.ceil(rest/400);
				newrow=row();
				newrow.appendChild(cell(document.createTextNode('unknown'),'120px','left'));
				newrow.appendChild(cell(document.createTextNode(' - ')));
				newrow.appendChild(cell(document.createTextNode(format(rest)),'100px','right'));
				for(var m=0;m<=4;m++){
					turnsmb[m]+=layermb[m];
					newrow.appendChild(cell(cellspan(retcolor[m],document.createTextNode(format(layermb[m]))),'35px','right'));
				}
				newrow.appendChild(cell(document.createTextNode('~'+perc((rest/fullsize)*100)+'%'),'35px','right'));
				main.appendChild(newrow);
			}
			newrow=row();
			var percnode="";
			var goodore=perc((real/fullsize)*100);
			percnode+=(goodore=="0")?"":goodore+"% "+roidtype;
			var badore=perc((shell/fullsize)*100);
			percnode+=(badore=="0")?"":" - "+badore+"% Iridium";
			var tmpunk=100-(1*goodore)-(1*badore);
			percnode+=(tmpunk<=0.1)?"":" - "+perc(tmpunk)+"% unknown";
			newrow.appendChild(cell(document.createTextNode(percnode)));
			main.appendChild(newrow);
			newrow=row();
			newrow.appendChild(cell(document.createTextNode('Complete Asteroid'),'120px','left'));
			newrow.appendChild(cell(document.createTextNode(' - ')));
			newrow.appendChild(cell(document.createTextNode(format(fullsize)),'100px','right'));
			for(var n=0;n<=4;n++){
				newrow.appendChild(cell(cellspan(retcolor[n],document.createTextNode(turnsmb[n])),'35px','right'));
			}
			newrow.appendChild(cell(document.createTextNode(' '),'35px','right'));
			main.appendChild(newrow);
		}
		var link=document.createElement('a');
		if(myformat.test(scan)){
			alltags=document.evaluate("//a[text()[contains(.,'Location')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var thistak=alltags.snapshotItem(0);
			link.setAttribute('href',thistak.href);
			link.textContent=thistak.textContent;
			newrow=row();
			newrow.appendChild(cell(link));
			newrow.setAttribute('style',newrow.getAttribute('style')+'padding:3px 0px;')
			main.appendChild(newrow);
		}
		else{
			var secheck=/sector\s\d{1,3}/i;
			var gicheck=/grid\s\d{1,3}/i;
			if(secheck.test(scan)&&gicheck.test(scan)){
				alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var thistak=alltags.snapshotItem(0);
				if(thistak){
					getsys=thistak.getAttribute('onclick');
					system=getsys.split('system_id=')[1].split('&')[0];
					var sector,grid;
					temp=secheck.exec(scan);
					sector=temp[0].split(' ')[1];
					temp=gicheck.exec(scan);
					grid=temp[0].split(' ')[1];
					link.setAttribute('href',getsys.split("'")[1].split("&")[0]+'&system_id='+system+'&sector_id='+sector+'&grid_id='+grid);
					link.textContent='Roid may be @ '+system+'.'+sector+'.'+grid+' (link is correct *only* when you are in the same system!)';
					newrow=row();
					newrow.appendChild(cell(link));
					newrow.setAttribute('style',newrow.getAttribute('style')+'padding:3px 0px;')
					main.appendChild(newrow);
				}
			}
		}
		thistag.appendChild(main);
	}
}
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
	var newtr=document.createElement("tr");
		var main=document.createElement("td");
			main.setAttribute("colspan",3);
			main.setAttribute("align","left");
		newtr.appendChild(main);
	thistag.parentNode.parentNode.parentNode.insertBefore(newtr,thistag.parentNode.parentNode.parentNode.nextSibling);
	var subdiv=document.createElement('div');
	subdiv.setAttribute('style','display:none');
	subdiv.setAttribute('id','jumpbox');
	thistag.setAttribute('onmouseover',"document.getElementById('jumpbox').style.display='block'");
	main.appendChild(subdiv);
	var subspan=document.createElement('span');
	subspan.setAttribute('style','height:auto;width:auto;float:left;text-align:center;margin:10px 0px 0px 0px');
	subdiv.appendChild(subspan);
	var jbsel=document.createElement('select');
	jbsel.id='jsys';
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
	subspan.appendChild(document.createTextNode('Sector:'));
	var child=document.createElement('input');
		child.type='text';
		child.id='jsec';
		child.className='forms_txt';
		child.style.width='22px';
		child.style.margin='2px 4px 0px 0px';
		child.maxLength=3;
		child.setAttribute('onKeyPress',"var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);
	subspan.appendChild(document.createTextNode('Grid:'));
	child=document.createElement('input');
		child.type='text';
		child.id='jgrid';
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
	var view="if(document.getElementById('jsec').value==''||document.getElementById('jgrid').value==''){alert('Please fill all fields');return false}location.href='index.php?view=sector&system_id='+parseFloat(document.getElementById('jsys').value)+'&sector_id='+parseFloat(document.getElementById('jsec').value)+'&grid_id='+parseFloat(document.getElementById('jgrid').value);";
	subspan.appendChild(button(false,'11','35','Show Target Location','','',ishow,view));

	subspan=document.createElement('span');
	subspan.setAttribute('style','height:auto;width:auto;float:right;margin:10px 0px 0px 0px');
	subdiv.appendChild(subspan);
	var jls="if(document.getElementById('jsec').value==''||document.getElementById('jgrid').value==''){alert('Please fill all fields');return false}location.href='functions/lightspeed.php?system_id='+parseFloat(document.getElementById('jsys').value)+'&sector_id='+parseFloat(document.getElementById('jsec').value)+'&grid_id='+parseFloat(document.getElementById('jgrid').value);";
	subspan.appendChild(button(false,'25','','Lightspeed','LS','','',jls));
	subspan.appendChild(document.createElement('br'));
	var jhj="if(document.getElementById('jsec').value==''||document.getElementById('jgrid').value==''){alert('Please fill all fields');return false}location.href='functions/hyperjump.php?system_id='+parseFloat(document.getElementById('jsys').value)+'&sector_id='+parseFloat(document.getElementById('jsec').value)+'&grid_id='+parseFloat(document.getElementById('jgrid').value);";
	subspan.appendChild(button(false,'25','','Hyperjump','HJ','','',jhj));
	subspan=document.createElement('span');
	subspan.setAttribute('style','clear:both');
	subdiv.appendChild(subspan);
}
}