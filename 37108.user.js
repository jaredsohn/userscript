// ==UserScript==
// @name           Battle Analyser final 21/08
// @Author         MeXaon modifié par KJee
// @email          svgmail@mail.ru // kjeerox@hotmail.fr
// @namespace      Travian
// @description    Battle Analyse
// @include        http://*.travian*/berichte.php?*
// @include        http://*.travian*/warsim.php
// @include        http://*.travian*/a2b.php*
// @exclude        http://forum.travian*
// ==/UserScript==

var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch(lang){

	default:
				langfile=		["Puissance d'attaque","Pertes","Protection infanterie",
							"Protection cavalerie","Statistiques générales","Pertes","Consommation",
							"Exp du héros","Capacité","Pertes de ressources","Consomation nominal",
							"Héros non présent","Héros","Ressources pillés","Quantité maximal",
							"Attaque","Defense"];
		break;
}

var ats=new Array(0,0,0,0,0,0,0,0); //0-attack 1-lostunits 2-load 3-maxload 4-food 5-statushero 6-lostfood 7-trap
var dts=new Array(0,0,0,0,0,0); //0-def1 1-def2 2-lostunits 3-food 4-statushero 5-lostfood
var tab;
var warsim=0;
var grafpack='';

//0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
romans=new Array();
romans[0] = new Array(40,35,50,120,100,180,40,1,6,40);					// Legionnaire
romans[1] = new Array(30,65,35,100,130,160,70,1,5,20);					// Praetorian
romans[2] = new Array(70,40,25,150,160,210,80,1,7,50);					// Imperian
romans[3] = new Array(0,20,10,140,160,20,40,2,16,0);						// Equites Legati
romans[4] = new Array(120,65,50,550,440,320,100,3,14,100);			// Equites Imperatoris
romans[5] = new Array(180,80,105,550,640,800,180,4,10,70);			// Equites Caesaris
romans[6] = new Array(60,30,75,900,360,500,70,3,4,0);						// Battering Ram
romans[7] = new Array(75,60,10,950,1350,600,90,6,3,0);					// Fire catapult
romans[8] = new Array(50,40,30,30750,27200,45000,37500,4,4,0);	// Senator
romans[9] = new Array(0,80,80,5800,5300,7200,5500,1,5,1600);		// Settler
romans[10] = new Array(0,0,0,0,0,0,0,6,0,0);										// Hero
teutons=new Array();
teutons[0] = new Array(40,20,5,95,75,40,40,1,7,60);							// Clubswinger
teutons[1] = new Array(10,35,60,145,70,85,40,1,7,40);						// Spearfighter
teutons[2] = new Array(60,30,30,130,120,170,70,1,6,50);					// Axefighter
teutons[3] = new Array(0,10,5,160,100,50,50,1,9,0);							// Scout
teutons[4] = new Array(55,100,40,370,270,290,75,2,10,110);			// Paladin
teutons[5] = new Array(150,50,75,450,515,480,80,3,9,80);				// Teuton Knight
teutons[6] = new Array(65,30,80,1000,300,350,70,3,4,0);					// Ram
teutons[7] = new Array(50,60,10,900,1200,600,60,6,3,0);					// Catapult
teutons[8] = new Array(40,60,40,35500,26600,25000,27200,4,4,0);	// Chief
teutons[9] = new Array(10,80,80,7200,5500,5800,6500,1,5,1600);	// Settler
teutons[10] = new Array(0,0,0,0,0,0,0,6,0,0);										// Hero
gauls = new Array(10);
gauls[0] = new Array(15,40,50,100,130,55,30,1,7,30);						// Phalanx
gauls[1] = new Array(65,35,20,140,150,185,60,1,6,45);						// Swordfighter
gauls[2] = new Array(0,20,10,170,150,20,40,2,17,0);							// Pathfinder
gauls[3] = new Array(90,25,40,350,450,230,60,2,19,75);					// Theutates Thunder
gauls[4] = new Array(45,115,55,360,330,280,120,2,16,35);				// Druidrider
gauls[5] = new Array(140,50,165,500,620,675,170,3,13,65);				// Haeduan
gauls[6] = new Array(50,30,105,950,555,330,75,3,4,0);						// Ram
gauls[7] = new Array(70,45,10,960,1450,630,90,6,3,0);						// Trebuchet
gauls[8] = new Array(40,50,50,30750,45400,31000,37500,4,5,0);		// Chieftain
gauls[9] = new Array(0,80,80,5500,7000,5300,4900,1,5,1600);			// Settler
gauls[10] = new Array(0,0,0,0,0,0,0,6,0,0);											// Hero
nature = new Array(10)
nature[0] = new Array(10,25,10,0,0,0,0,1,20,0);									// Rat
nature[1] = new Array(20,35,40,0,0,0,0,1,20,0);									// Spider
nature[2] = new Array(60,40,60,0,0,0,0,1,20,0);									// Serpent
nature[3] = new Array(80,66,50,0,0,0,0,1,20,0);									// Bat
nature[4] = new Array(50,70,33,0,0,0,0,2,20,0);									// Wild boar
nature[5] = new Array(100,80,70,0,0,0,0,2,20,0);								// Wolf
nature[6] = new Array(250,140,200,0,0,0,0,3,20,0);							// Bear
nature[7] = new Array(450,380,240,0,0,0,0,3,20,0);							// Crocodile
nature[8] = new Array(200,170,250,0,0,0,0,3,20,0);							// Tiger
nature[9] = new Array(600,440,520,0,0,0,0,5,20,0);							// Elephant


var imgpack="data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP////z6/Pz+/Pz+9Pz65Pz67Pz21PTu1Pz23OzGROTSlPzqrPzuvOzivPzyzOzCROS6RNy2TNSyVPzafNS6dOTKhPzilPzinPzmpNzKlOzapPzqtPTmvPzuxPTqzPzy1PTu3Pz25PS+POS2POy+ROS2RNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOTOlOzWnPzmrPzqvOzevPzuzOy2PPS+ROSyRPzGTOy6TPTCVNyyVNSuVPTKbOS+bNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSqNPzCTOy2TNyuVNSqVPTOhOTCfOzKhPTSjPzalNzCjPzirOzatOSqPMyaPNSmVNyyZNy2dOzGhNy6fPTOjOzKjPzanOzWrOzexMyOLMSKLNyeNMySNMyWPOSuVNSmXOS2bNy6hOzavPzqzPz27MyONNSiVOzChOTKpNSiXPzy5MyORMySTOSydNSWVP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHgALAAAAAAQABAAAAfqgHiCggMhFk8gA4OLggYbKTIWPgttjHgEDkAxIiJGMys+YAKDHywsCAQENEwuVEVZEx14MBIbSDUaUxVBUkJfVFBYXBMFbDAtQD1mHwc0LypUQ2UpBSBHTkJCZ1QcGCo4JC5mKSIgIDRDP0tDQzo3JTtEZj0iBw82HFI8SiMKJSY5vLhBUe5BAw4zKChQEIGEFStbxJwokMADBwZULvjLkYRMGjhjVnDpkKBBBgwvIHA8s8VOnTd4qjR5YuMBgwsRcnSBc6dOnEFt4lx58sBDFCJyxqiZYwkEFzFEtNDJgsTSojBo5KxRtCgQADs=";
var imgpackgo="data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///xx6BESSLEyWNFyiRJTChDSGFJzGjCx+BFyePESOHGSiRDyKDESSFDyGDIS2ZJzChKTKjEySHFSaJHSqTIy6bKTGjKzOlFyaLGSeNHyuVKzKlISyXGSeLGyiNHSmPLTOlPz+9Pz65Pz21PTu1Pz23PTmtPzuvPzyzNy2TNSyVNy+ZPzehNS6dOTKhPzinPzmpNzKlOzapPzqtPTmvPzuxPzy1Pz25PS+POy+TNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOzWnPzqvOzevPzuzOSyROy6TPTCVNyyVNSuVPTKbOS+bPzWfNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSyTNyuVNSqVPTOhOTCfOzKhPzalNzCjOTKlPzirMyaPNSmVNyyZNy2dOzGhNy6fPzanOzWrOzexMyOLMSKLMySNMyWPNSmXOzavPzqzNSiXMyORP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHUALAAAAAAQABAAAAffgHWCg3UvXTeEiYJFPUUvTUSKgyxEODhWJz8raolAQCUiIkhaUGJVZWWCRCozWEcyYC5RVVJpYl5kaCsjckRBT0xuSCZGQz4xLW49IzdXXFJSWWI0MD45SUJvPTg3N0ZTTllTUyAaOkpUbkw4JClIRl9LSzkfGxlZXm483CkoNCAfPnjYgKGCgzNsdowwYcNIjA8hMHDgYEECgwNtfqCpwTCGBgwWLEDoACGCggSCtnRBkiKDBAkXEEAwwGABoTBjulCY4KCBApoDJKFhQ8UMnQcFCEgStAbOnDgHBBAKBAA7";


var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}
function elem(tag,class,content){
	var ret=document.createElement(tag);
	ret.innerHTML=content;
	if(class!="")ret.className=class;
	return ret;
}

function imgp(src){
	if(grafpack!=''){
		return grafpack+src;
	}else return src;
}

function main(){
	//
	var gp=find('//link[@rel="stylesheet"]',XPList);
	for(var i=0;i<gp.snapshotLength;i++){
		var csspos=gp.snapshotItem(i).href.indexOf('unx.css');
		if (csspos!=-1){
			grafpack=gp.snapshotItem(i).href.substring(0,csspos);
		}
	};
	//
	if (window.location.href.match(/a2b.php/)){
		genreporta2b();
		document.addEventListener('keyup',a2b,false);
		document.addEventListener('click',a2b,false);
		return;
	}
	tab=find("//table[@class='tbg']/tbody",XPList);
	if (window.location.href.match(/warsim.php/)){
		warsim=1;
	}else{
		if (tab.snapshotItem(1).getElementsByTagName("td")[0].textContent.charCodeAt(0)==160) return;
	}

	table=tab.snapshotItem(1-warsim).getElementsByTagName("td");
	attacktable();
	for(var i=(2-warsim);i<tab.snapshotLength;i++){
		table=tab.snapshotItem(i).getElementsByTagName("td");
		deftable();
	}
	generatereport();
}

function attacktable(){
	var statushero=0;
	var statustrap=0;
	var troops=0; //1-romans 2-teutons 3-gauls
	var lostres=new Array(0,0,0,0);
	var atstemp=new Array(0,0,0,0,0,0,0,0);
	var renttemp=new Array(0); //0-rentabilite
	if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
	if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
	if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		default:tm=null;break;
	}
	var rescell=find("//tr[@class='cbg1']/td[@class='s7']",XPFirst);
	if(tm!=null){
		if(table[13-warsim*2].innerHTML.indexOf("img")>0) {statushero=1;ats[5]=1;}
		var tda=14+statushero-warsim*2;
		var tdl=25+statushero*2-warsim*2;
		var tdt=0;
		if(!warsim&&(table.rows>4)){
			if(table[36+statushero*3].getAttribute('colspan')==null)tdt=36+statushero*3;
		}
		for(var i=0;i<=(9+statushero);i++){
			atstemp[0]=atstemp[0]+table[tda+i].textContent*tm[i][0];
			lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
			lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
			lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
			lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
			atstemp[4]=atstemp[4]+table[tda+i].textContent*tm[i][7];
			atstemp[6]=atstemp[6]+table[tdl+i].textContent*tm[i][7];
			if(tdt!=0){
				atstemp[7]=atstemp[7]+table[tdt+i].textContent*tm[i][7];
				atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent-table[tdt+i].textContent)*tm[i][9];
			}else{
				atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent)*tm[i][9];
			}
		}
		atstemp[1]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
		if (rescell!=null){
			res=rescell.textContent.split(" ");
			atstemp[2]=parseInt(res[0])+parseInt(res[1])+parseInt(res[2])+parseInt(res[3]);
			
			if (atstemp[3] == 0) renttemp[0] = 0;
			


		else
					

			renttemp[0]=(atstemp[2]/atstemp[3])*100;
			
			
			
				

			rescell.appendChild(elem('span','f9',' = '+atstemp[2]+' <b>('+Math.round(renttemp[0]*10)/10+'%)</b>'));	
}







		table[2-warsim*2].innerHTML='<img title="'+langfile[0]+'" src="'+imgp('img/un/a/att_all.gif')+'" align="absmiddle" height="15" width="15">&nbsp;<font class="f8"><FONT COLOR="#0000FF">'+atstemp[0]+'</color></font>';
		rowi=document.createElement("tr");
		cell1=document.createElement("td");
		cell1.innerHTML='<font class="f10">'+langfile[1]+'</font>';
		cell2=document.createElement("td");
		cell2.setAttribute("align","left");
		cell2.setAttribute("colspan",10+statushero);
		cell2.innerHTML='<font class="f8"><img src="'+imgp('img/un/r/1.gif')+'">'+lostres[0]+'&nbsp;<img src="'+imgp('img/un/r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+imgp('img/un/r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+imgp('img/un/r/4.gif')+'">'+lostres[3]+'&nbsp; (-'+atstemp[1]+')</font>';
		rowi.appendChild(cell1);
		rowi.appendChild(cell2);
		table[0].parentNode.parentNode.appendChild(rowi);
	};
	for(var i=0;i<ats.length;i++){
		ats[i]=ats[i]+atstemp[i];
	};
};

function deftable(){
	var statushero=0;
	var troops=0; //1-romans 2-teutons 3-gauls 4-nature
	var lostres=new Array(0,0,0,0);
	var dtstemp=new Array(0,0,0,0,0,0);
	if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
	if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
	if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;
	if(table[3-warsim*2].innerHTML.indexOf("u/31.gif")>0) troops=4;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		case 4:tm=nature;break;
		default:tm=null;break;
	}
	if(tm!=null){
		if(table[13].innerHTML.indexOf("img")>0) {statushero=1;dts[4]=1;}
		var tda=14+statushero-warsim*2;
		var tdl=25+statushero*2-warsim*2;
		for(var i=0;i<=(9+statushero);i++){
			dtstemp[0]=dtstemp[0]+table[tda+i].textContent*tm[i][1];	// def1
			dtstemp[1]=dtstemp[1]+table[tda+i].textContent*tm[i][2];	// def2
			dtstemp[3]=dtstemp[3]+table[tda+i].textContent*tm[i][7];
			if (table[tdl]!=null){
				lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
				lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
				lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
				lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
				dtstemp[5]=dtstemp[5]+table[tdl+i].textContent*tm[i][7];
			}
		}
		dtstemp[2]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
		table[2-warsim*2].innerHTML='<img title="'+langfile[2]+'" src="'+imgp('img/un/a/def_i.gif')+'" align="absmiddle" height="15" width="15">&nbsp;<font class="f8"><FONT COLOR="#FF0000">'+dtstemp[0]+'</color></font><br><img title="'+langfile[3]+'" src="'+imgp('img/un/a/def_c.gif')+'" align="absmiddle" height="15" width="15">&nbsp;<font class="f8"><FONT COLOR="#FF0000">'+dtstemp[1]+'</color></font>';
	rowi=document.createElement("tr");
	cell1=document.createElement("td");
	cell1.innerHTML='<font class="f10">'+langfile[1]+'</font>';
	cell2=document.createElement("td");
	cell2.setAttribute("align","left");
	cell2.setAttribute("colspan",10+statushero);
	cell2.innerHTML='<font class="f8"><img src="'+imgp('img/un/r/1.gif')+'">'+lostres[0]+'&nbsp;<img src="'+imgp('img/un/r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+imgp('img/un/r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+imgp('img/un/r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+dtstemp[2]+')</b></font>';
	rowi.appendChild(cell1);
	rowi.appendChild(cell2);
	table[0].parentNode.parentNode.appendChild(rowi);
	};
	for(var i=0;i<dts.length;i++){
		dts[i]=dts[i]+dtstemp[i];
	}
}

function generatereport(){
	if(ats[3]==0)ats[2]=0;
	var lostA=ats[2]-ats[1];
	var lostB=dts[2]+ats[2];

	trep=document.createElement("table");
	row1=document.createElement("tr");
	row2=document.createElement("tr");
	row3=document.createElement("tr");
	row4=document.createElement("tr");
	row5=document.createElement("tr");
	
	cell=document.createElement("td");
	cell.appendChild(elem("b","c1 b",langfile[4]));
	cell.setAttribute("colspan","5");
	row1.className="cbg1";
	row1.appendChild(cell);
	
	cell1=document.createElement("td");
	cell1.innerHTML="&nbsp;";
	cell2=document.createElement("td");
	cell2.appendChild(elem("font","f8",""+langfile[5]+""));
	cell3=document.createElement("td");
	cell3.appendChild(elem("font","f8",""+langfile[6]+""));
	cell4=document.createElement("td");
	cell4.appendChild(elem("font","f8",""+langfile[7]+""));
	cell5=document.createElement("td");
	cell5.appendChild(elem("font","f8",""+langfile[8]+""));
	row2.appendChild(cell1);
	row2.appendChild(cell2);
	row2.appendChild(cell3);
	row2.appendChild(cell4);
	row2.appendChild(cell5);

	cell1=document.createElement("td");
	cell1.className="c2 b";
	cell1.innerHTML=langfile[15];
	cell2=document.createElement("td");
	cell2.setAttribute("align","right");
	cell2.innerHTML=lostA+'<img src="'+imgp('img/un/r/4.gif')+'" title="'+langfile[9]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML=ats[4]+'<img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	if(ats[5]==0){
			cell4.innerHTML='0<img src="'+imgp('img/un/a/del.gif')+'" title="'+langfile[11]+'">';
	}else cell4.innerHTML=dts[5]+'<img src="'+imgp('img/un/u/hero.gif')+'" title="'+langfile[12]+'">';
	cell5=document.createElement("td");
	cell5.setAttribute("align","right");
	cell5.setAttribute("rowspan","2");
	cell5.innerHTML=ats[2]+'<img src="'+imgpackgo+'" title="'+langfile[13]+'"><br>'+ats[3]+'<img src="'+imgpack+'" title="'+langfile[14]+'">';
	row3.appendChild(cell1);
	row3.appendChild(cell2);
	row3.appendChild(cell3);
	row3.appendChild(cell4);
	row3.appendChild(cell5);
	
	cell1=document.createElement("td");
	cell1.className="c1 b";
	cell1.innerHTML=langfile[16];
	cell2=document.createElement("td");
	cell2.setAttribute("align","right");
	cell2.innerHTML=(-lostB)+'<img src="'+imgp('img/un/r/4.gif')+'" title="'+langfile[9]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML=dts[3]+'<img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	if(dts[4]==0){
			cell4.innerHTML='0<img src="'+imgp('img/un/a/del.gif')+'" title="'+langfile[11]+'">';
	}else cell4.innerHTML=ats[6]+'<img src="'+imgp('img/un/u/hero.gif')+'" title="'+langfile[12]+'">';
	row4.appendChild(cell1);
	row4.appendChild(cell2);
	row4.appendChild(cell3);
	row4.appendChild(cell4);


	trep.setAttribute("cellpadding","2");
	trep.setAttribute("cellspacing","1");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row2);
	trep.appendChild(row3);
	trep.appendChild(row4);

	tab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(elem("p","",""));
	if(warsim==0){
		tab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(trep);
	}else{
		tab.snapshotItem(1).parentNode.parentNode.insertBefore(trep,tab.snapshotItem(1).parentNode.nextSibling);
		tab.snapshotItem(1).parentNode.parentNode.insertBefore(elem('p','',''),tab.snapshotItem(1).parentNode.nextSibling);
	};
};

function a2b(){
	ats=[0,0,0,0,0,0,0,0];
	var list=find('//table[@class="p1"]/tbody/tr/td/table[@class="f10"]/tbody/tr/td/input',XPList);
	if(list.snapshotLength==0){alert('Error:Find Table,a2b');return;}
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/1.gif")>0) troops=1;
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/11.gif")>0) troops=2;
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/21.gif")>0) troops=3;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		default:tm=null;break;
	}
	if(tm==null){alert('Error:Bad troops,a2b');return;}
	for(var i=0;i<list.snapshotLength;i++){
		unit=parseInt(list.snapshotItem(i).getAttribute('name').match(/(\d+)/).pop())-1;
		val=parseInt(list.snapshotItem(i).value);
		if(isNaN(val))val=0;
		ats[0]=ats[0]+val*tm[unit][0];	// attack
		ats[1]=ats[1]+val*tm[unit][1];	// def1
		ats[2]=ats[2]+val*tm[unit][2];	// def2
		ats[3]=ats[3]+val*tm[unit][9];	// load
		ats[4]=ats[4]+val*tm[unit][7];	// food
	}
	eats0=document.getElementById('ats0');
	eats1=document.getElementById('ats1');
	eats2=document.getElementById('ats2');
	eats3=document.getElementById('ats3');
	eats4=document.getElementById('ats4');
	eats0.textContent=ats[0];
	eats1.textContent=ats[1];
	eats2.textContent=ats[2];
	eats3.textContent=ats[3];
	eats4.textContent=ats[4];
};

function genreporta2b(){
	trep=document.createElement("table");
	row1=document.createElement("tr");
	row2=document.createElement("tr");
	row3=document.createElement("tr");
	
	cell=document.createElement("td");
	cell.appendChild(elem("b","c1 b",langfile[4]));
	cell.setAttribute("colspan","5");
	row1.className="cbg1";
	row1.appendChild(cell);

	cell1=document.createElement("td");
	cell1.style.width='60%';
	cell1.setAttribute('colspan','3');
	cell1.appendChild(elem("font","f8",""+langfile[15]+""));
	cell3=document.createElement("td");
	cell3.style.width='20%';
	cell3.appendChild(elem("font","f8",""+langfile[6]+""));
	cell5=document.createElement("td");
	cell5.style.width='20%';
	cell5.appendChild(elem("font","f8",""+langfile[8]+""));
	row2.appendChild(cell1);
	row2.appendChild(cell3);
	row2.appendChild(cell5);
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML='<span id="ats0">'+ats[0]+'</span><img src="'+imgp('img/un/a/att_all.gif')+'" title="'+langfile[0]+'">';
	cell2=document.createElement("td");
	cell2.setAttribute("align","right");
	cell2.innerHTML='<span id="ats1">'+ats[1]+'</span><img src="'+imgp('img/un/a/def_i.gif')+'" title="'+langfile[2]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML='<span id="ats2">'+ats[2]+'</span><img src="'+imgp('img/un/a/def_c.gif')+'" title="'+langfile[3]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	cell4.innerHTML='<span id="ats4">'+ats[4]+'</span><img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	cell5=document.createElement("td");
	cell5.setAttribute("align","right");
	cell5.setAttribute("rowspan","2");
	cell5.innerHTML='<span id="ats3">'+ats[3]+'</span><img src="'+imgpack+'" title="'+langfile[14]+'">';
	row3.appendChild(cell1);
	row3.appendChild(cell2);
	row3.appendChild(cell3);
	row3.appendChild(cell4);
	row3.appendChild(cell5);
		
	trep.setAttribute("cellpadding","2");
	trep.setAttribute("cellspacing","1");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row2);
	trep.appendChild(row3);
	
	var t=find('//div[@id="lmid2"]/table[@class="f10"]',XPList);
	t.snapshotItem(0).parentNode.insertBefore(trep,t.snapshotItem(0));
	t.snapshotItem(0).parentNode.insertBefore(elem('p','',''),t.snapshotItem(0));
}

main();