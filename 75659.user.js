// ==UserScript==
// @name           Travian: Battle Analyse v2.0
// @Author         MeXaon
// @email          svgmail@mail.ru
// @namespace      Travian
// @description    Battle Analyse
// @include        http://*.travian.*/berichte.php?*
// @include        http://*.travian.*/warsim.php
// @exclude        http://forum.travian.*
// ==/UserScript==

var lang=window.location.href.match(/travian\.([a-zA-Z]{2,3})+/ ).pop();
var langfile=new Array();

switch(lang){
	case "ro":
		langfile=["Marimea atacului","Pierderi totale","Valoarea protectiei impotriva infanteriei",
							"Valoarea protectiei impotriva cavaleriei","Statistica generala","Evaluare pierderi","Consum",
							"Exp Erou","Capacitate","Pierderile echivalente in grane","Consum de grane al armatei din acest atac",
							"Eroul nu a participat la atac","Erou","Cantitatea de resurse capturata","Capacitatea maxima disponibila",
							"Atacator","Aparator"];
		break;
	case "dk":
		langfile=["Totale angrebsstyrke","Tab af troppeomkostninger","Totale forsvarsstyrke mod infanteri",
							"Totale forsvarsstyrke mod kavalleri","Generel statistik","Totale tab","Forbrug",
							"Helte erfaring","kapacitet","Totalt antal rรฅstoffer tabt","Hรฆrens totale kornforbrug",
							"Der var ikke nogen helt","Helt","Antal stjรฅlne rรฅstoffer","Maksimal kapacitet",
							"Angriber","Forsvarer"];
		break;
	case "de":
		langfile=["Gesamte Angriffsstรคrke","Verluste durch Truppenkosten","Gesamte Verteidigungsstรคrke gegen Infanterie",
							"Gesamte Verteidigungsstรคrke gegen Kavalerie","Die Gesamtstatistik","Differenz der Verluste","Nahrungsverbrauch",
							"Erf. fรผr den Helden","Capacity","Equivalent lost in grain","Nominal consumption of grain by army",
							"kein Held","Held","Quantity of the carried away raw material","The maximal capacity survived",
							"Angriff","Verteidigung"];
		break;
	case "ru":
		langfile=["Cั�ผะผะฐั€ะฝะฐั�ะฒะตะปะธั�ธะฝะฐ ะฐั�ฐะบะธ","ะญะบะฒะธะฒะฐะปะตะฝั�ะฟะพั�ตั€ั�,"ั��ผะผะฐั€ะฝะฐั�ะฒะตะปะธั�ธะฝะฐ ะทะฐั�ธั��ะพั�ะฟะตั…ะพั��,
							"ั��ผะผะฐั€ะฝะฐั�ะฒะตะปะธั�ธะฝะฐ ะทะฐั�ธั��ะพั�ะบะฐะฒะฐะปะตั€ะธะธ","ะ�ฑั�ฐั�ั��ฐั�ธั��ธะบะฐ","ะ ะฐะทะฝะธั�ฐ ะฟะพั�ตั€ั�,"ะ�พั�€ะตะฑะปะตะฝะธะต",
							"ะ�ฟั��ะณะตั€ะพะตะฒ","ะ’ะผะตั��ธะผะพั���,"ั�บะฒะธะฒะฐะปะตะฝั�ะฟะพั�ตั€ั�ฝะฝะพะณะพ ะฒ ะทะตั€ะฝะต","ะฝะพะผะธะฝะฐะปั�ฝะพะต ะฟะพั�€ะตะฑะปะตะฝะธะต ะทะตั€ะฝะฐ ะฐั€ะผะธะตะน",
							"ะณะตั€ะพั�ะฝะต ะฑั�ปะพ","ะณะตั€ะพะน","ะบะพะปะธั�ตั��ฒะพ ั�ฝะตั�ตะฝะฝะพะณะพ ั��€ั��,"ะผะฐะบั�ธะผะฐะปั�ฝะฐั�ะฒะผะตั��ธะผะพั���ะฒั�ถะธะฒั�ธั…",
							"ะ�ฐะฟะฐะดะฐั��ธะต","ะ�ฑะพั€ะพะฝั���ธะตั��];
		break;
	case "hu":
		langfile=["ร–ssz tรกmadรณรฉrtรฉk","Nyersanyag vesztesรฉg","Vรฉdelem gyalogsรกg ellen",
							"Vรฉdelem lovassรกg ellen","ร�talรกnos statisztika","ร–ssz nyersanyag","ร�elemfelhasznรกlรกs",
							"Hล‘s tapasztalat","Teherbรญrรกs","Bรบzavesztesรฉg","Hadsereg bรบzafogyasztรกsa",
							"Nincs hล‘s","Hล‘s","ร–ssz zsรกkmรกny","Maximรกlisan elhozhatรณ zsรกkmรกny",
							"Tรกmadรณ","Vรฉdล‘"];
		break;
	default:
		langfile=["Total size of attack","Equivalent of losses","Total size of protection against infantry",
							"Total size of protection against a cavalry","The general statistics","Difference of losses","Consumption",
							"Exp of heroes","Capacity","Equivalent lost in grain","Nominal consumption of grain by army",
							"The hero was not","Hero","Quantity of the carried away raw material","The maximal capacity survived",
							"Attacking","Defending"];
		break;
}

var ats=new Array(0,0,0,0,0,0,0,0); //0-attack 1-lostunits 2-load 3-maxload 4-food 5-statushero 6-lostfood 7-trap
var dts=new Array(0,0,0,0,0,0); //0-def1 1-def2 2-lostunits 3-food 4-statushero 5-lostfood
var tab;
var warsim=0;

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


var imgpack="data:image/gif;base64,R0lGODdhEAAQAPcAAMSKLOzGROTKpNSqRNSubPTmtOTGfPzWdPTm1Oy2POzGhOS2PMyaPNS6dPz21PzyzOzWnPTmvOSqNOzapOzOhOS+bOy+RPz27PzejMyOROTOjPzirOzavOzOjNSyVNyeNNy6fPzuvPzCTMySNPzmpPTu1PzajOy+TPz+9NyuVOSydNzKlNy2TNSiVOSuVOzivPzmtPTKbNSqVPzehNy6bPz25PzqvPTOfOTCfPS+PPz6/PzinOTSnPTOjPzy1NSmVMyOLPzGTNy2dOTKhPzafOy2TOzKhOS6RPTWjOSyRPTerPz67PzilNSWVOTSlOzevNzCjPzuzMyWPPzqrPzanNy+dPTSfOzGTOzWrNSuTNyyZOTGhPzWfPTq1OS2RPz23Pz2zPTqzOSqPOzatOTCdOzCRPzelMySTOTOlOzSlNyyVOSmRNy6hPzuxMySPPzmrPTu3PzalPTCVPz+/OS2bOTKlNy2VNSiXOSyTOzixPzqtNSuVNy+ZPz65PzqzPTOhOzChPzy5PTSjOy6TPS+RNSmXMyONOzKjPTWlPz69OzexAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAI+ADnCBwIZwgOHwMTDlwywQ6EIXucXFA4B8WLCmhq1FDypsoeLDoGhjFgoAQKFDZSINmASIuHCHPSsJjQ5ckKKA1oxLlBZYORHyA89PGThkIFNVLCOLBh5sAGEyPs9PEB48+NGy426NlxgNACJFLs1PDhw4aJGEVMmAiSwMKgDlLU1HDwIIqeOHJE5AhgwUuSQ4ayjH0QQs8bIgECHFkgRowCIAP6fGmjZ8oGJnyTSPhABxCAKiAifAlBYoeZMppdKFBxpsWcMTJwRHkwhcmRJD0ANTkjIJHACwIY4HjQRlCHOwDYBKLoAwSQDkIyaOlCMaGiQnc4UAwIADs=";
var imgpackgo="data:image/gif;base64,R0lGODdhEAAQAPcAABx6BMSKLJzGjOTGfPTmtMyOLOTSnNSqRFyaLOy2PPzWdPTq1NS6dPTKbHyuVPz21DyGDPTerNyyZPTmvGSmTNSyVOzGhESSFPT27NSiXPTWjNy6fOTOjGyiNPS+PPzuvOzOhPzanFyiPOzevKzKlMyWPOzatOS+bIS2ZOSyRFSaJPz+9PzejNzKlPzmpNyuVPzy1DyOFHSmPPzCTPTOhJS+dMyOROzapNSqVGSeLNy6bPz25PzqvNyyVESSLPz27PzajOy+TPzuzOzivPzmtCx+BKTGjOTKhMySNOzWnOy2TPzehPTu1PTSfISyXDyKHPzinOS2bGymPOzKhNSmVNzCjOTSlOzSlGSiRLTOlIy6bJzChNy+dNy2TPz6/OTGhMyONNSuTFyePPzWfPTOfPz23DyKDNy2dPTqzEySHPTWlOTOlPS+RPzuxOzOjFyiROzexKzOlMyaPOzavOTCdIS2bOSyTFSaLPz+/PzelOTKlPzqrPzy5ESOHHSqTPTSjJTChDSGFOTCfEyWNPTCVPzqzOzWrPzirNy+ZNSuVPz65Pz67PzyzPzqtKTKjOy6TGSeNPzalOzixPTu3ISyZGymROzKjNSmXNy2VAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAI+gDxCByI4YggGAMTDlyUBFOSI4mu/FAocAiiKzt2RCDApYKhhGgGDGCyYoWQF2MOqZEgYQSeK11uLBjRogoDHWrIhDg0hcqGCooKXQFxogcSIWV45FHgYgkSTIpgEKFBhoydQ42gKPCQQkMJTDtgwOABpIEdIEBkQAryyA2SHjseMBLCIxIhQh46OEBgZwqSMGEZfWgko0OHHA7i+LlgocABRWXa8HDRIUscEiS0OMISKACXDRMiu4AUR4sWFE5QbBFTBI8JHIKEMELgyJERASgAYemDQeAPPXIEqUhzwYwY3T68KISxoYCbMzYgvBlEcSCcSxnmBAKQMCAAOw==";


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


function main(){
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
			rescell.appendChild(elem('span','f8','<i><b> ('+atstemp[2]+')</b></i>'));
		}
		table[2-warsim*2].innerHTML='<img title="'+langfile[0]+'" src="img/un/a/att_all.gif" align="absmiddle" height="15" width="15"> <font class="f8"><i>'+atstemp[0]+'</i></font>';
		rowi=document.createElement("tr");
		cell1=document.createElement("td");
		cell1.innerHTML='<font class="f8"><i>'+langfile[1]+'</i></font>';
		cell2=document.createElement("td");
		cell2.setAttribute("align","left");
		cell2.setAttribute("colspan",10+statushero);
		cell2.innerHTML='<font class="f8"><i><img src="img/un/r/1.gif">'+lostres[0]+' <img src="img/un/r/2.gif">'+lostres[1]+' <img src="img/un/r/3.gif">'+lostres[2]+' <img src="img/un/r/4.gif">'+lostres[3]+'  <b>(-'+atstemp[1]+')</b></i></font>';
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
		table[2-warsim*2].innerHTML='<img title="'+langfile[2]+'" src="img/un/a/def_i.gif" align="absmiddle" height="15" width="15"> <font class="f8"><i>'+dtstemp[0]+'</i></font><br><img title="'+langfile[3]+'" src="img/un/a/def_c.gif" align="absmiddle" height="15" width="15"> <font class="f8"><i>'+dtstemp[1]+'</i></font>';
	rowi=document.createElement("tr");
	cell1=document.createElement("td");
	cell1.innerHTML='<font class="f8"><i>'+langfile[1]+'</i></font>';
	cell2=document.createElement("td");
	cell2.setAttribute("align","left");
	cell2.setAttribute("colspan",10+statushero);
	cell2.innerHTML='<font class="f8"><i><img src="img/un/r/1.gif">'+lostres[0]+' <img src="img/un/r/2.gif">'+lostres[1]+' <img src="img/un/r/3.gif">'+lostres[2]+' <img src="img/un/r/4.gif">'+lostres[3]+'  <b>(-'+dtstemp[2]+')</b></i></font>';
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
	cell1.innerHTML=" ";
	cell2=document.createElement("td");
	cell2.appendChild(elem("font","f8","<i>"+langfile[5]+"</i>"));
	cell3=document.createElement("td");
	cell3.appendChild(elem("font","f8","<i>"+langfile[6]+"</i>"));
	cell4=document.createElement("td");
	cell4.appendChild(elem("font","f8","<i>"+langfile[7]+"</i>"));
	cell5=document.createElement("td");
	cell5.appendChild(elem("font","f8","<i>"+langfile[8]+"</i>"));
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
	cell2.innerHTML=lostA+'*<img src="'+imgpack+'" title="'+langfile[9]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML=ats[4]+'*<img src="img/un/r/5.gif" title="'+langfile[10]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	if(ats[5]==0){
			cell4.innerHTML='0*<img src="img/un/a/del.gif" title="'+langfile[11]+'">';
	}else cell4.innerHTML=dts[5]+'*<img src="img/un/u/hero.gif" title="'+langfile[12]+'">';
	cell5=document.createElement("td");
	cell5.setAttribute("align","right");
	cell5.setAttribute("rowspan","2");
	cell5.innerHTML=ats[2]+'*<img src="'+imgpackgo+'" title="'+langfile[13]+'"><br>'+ats[3]+'*<img src="'+imgpack+'" title="'+langfile[14]+'">';
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
	cell2.innerHTML=(-lostB)+'*<img src="'+imgpack+'" title="'+langfile[9]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML=dts[3]+'*<img src="img/un/r/5.gif" title="'+langfile[10]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	if(dts[4]==0){
			cell4.innerHTML='0*<img src="img/un/a/del.gif" title="'+langfile[11]+'">';
	}else cell4.innerHTML=ats[6]+'*<img src="img/un/u/hero.gif" title="'+langfile[12]+'">';
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
		ats[0]=ats[0]+val*tm[unit][0];
		ats[3]=ats[3]+val*tm[unit][9];
		ats[4]=ats[4]+val*tm[unit][7];
	}
	eats0=document.getElementById('ats0');
	eats3=document.getElementById('ats3');
	eats4=document.getElementById('ats4');
	eats0.textContent=ats[0];
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
	cell.setAttribute("colspan","3");
	row1.className="cbg1";
	row1.appendChild(cell);

	cell1=document.createElement("td");
	cell1.style.width='33%';
	cell1.appendChild(elem("font","f8","<i>"+langfile[15]+"</i>"));
	cell3=document.createElement("td");
	cell3.style.width='33%';
	cell3.appendChild(elem("font","f8","<i>"+langfile[6]+"</i>"));
	cell5=document.createElement("td");
	cell5.style.width='34%';
	cell5.appendChild(elem("font","f8","<i>"+langfile[8]+"</i>"));
	row2.appendChild(cell1);
	row2.appendChild(cell3);
	row2.appendChild(cell5);
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML='<span id="ats0">'+ats[0]+'</span>*<img src="img/un/a/att_all.gif" title="'+langfile[0]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML='<span id="ats4">'+ats[4]+'</span>*<img src="img/un/r/5.gif" title="'+langfile[10]+'">';
	cell5=document.createElement("td");
	cell5.setAttribute("align","right");
	cell5.setAttribute("rowspan","2");
	cell5.innerHTML='<span id="ats3">'+ats[3]+'</span>*<img src="'+imgpack+'" title="'+langfile[14]+'">';
	row3.appendChild(cell1);
	row3.appendChild(cell3);
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