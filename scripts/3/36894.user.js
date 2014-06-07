// ==UserScript==
// @name           Penyerang Automatik
// @author         Payal
// @description    Penyerang Automatik untuk Travian my
// @include        http://*.travian.com.my/*
// @exclude        http://forum.travian.*
// @email          fazial@gmail.com
// @version        1.3
// ==/UserScript==

//"Askar Legion,   Pengawal Pertahan, Askar Empayar, Kesatria Diplomatik, Kesatria Empayar, Kesatria Jeneral,  Kerata Pelantak, Tarbil Api, Senator,  Peneroka"  --> Romans
//"Askar Belantan, Askar Lembing,     Askar Kapak,   Peninjau,            Kesatria Santo,   Kesatria Teutonik, Kerata Pelantak, Tarbil,     Penghulu, Peneroka"  --> Teutons
//"Falanks,        Askar Pedang,      Penjelajah,    Guruh Theutates,     Penunggang Druid, Haeduan,           Kereta Pelantak, Tarbil,     Pemimpin, Peneroka"  --> Gauls
var penyerang = "15,0,11,0,0,0,0,0,0,0"; // <---masukkan senarai penyerang anda di sini. sila ikut susunan askar seperti yang disenaraikan di atas.
var iWira = readCookie("AUTOFARM_WIRA"); //default xkn hantar wira sebagai penyerang auto
var iDelay = readCookie("AUTOFARM"); //set Delay checking attack
var iRace = readCookie("AUTOFARM_PUAK");
var iJenis = readCookie("AUTOFARM_TYPE");
var koordinat;

var iNewdid = ""; //id kampung yang autofarm
if(false)
{
//names can differ per race and server


troepen = new Array();

	
};

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
};

function getRace() {
	var xpathResult = xpath("//img[@class='unit']");
	if (xpathResult.snapshotLength > 0) {
		var src = xpathResult.snapshotItem(0).src;
		var iTroopType = src.match(/([0-9]{1,2})\.gif/i);
		if(!iTroopType || !iTroopType[1]) {
			return false;
		}
		iTroopType = parseInt(iTroopType[1]);
		if(iTroopType > 20) {
			return 2; //gaul
		} else if(iTroopType > 10) {
			return 1; //teutons
		} else {
			return 0; //Romans
		}
	} else {
		//alert("Puak x dpt dikenal pasti...");
		return false;
	}
};

function addHover()
{
var t1,t2,t3,t4,t5,t6,t7,t8,t9,t10;
//alert(iRace);
if(iRace != false) {
	//switch(iRace) {
		//case 0: //Romans
		if (iRace == 0){
			t1 = "Askar Legion";
			t2 = "Pengawal Pertahan";
			t3 = "Askar Empayar";
			t4 = "Kesatria Diplomatik";
			t5 = "Kesatria Empayar";
			t6 = "Kesatria Jeneral";
			t7 = "Kerata Pelantak";
			t8 = "Tarbil Api";
			t9 = "Senator";
			t10 = "Peneroka";
			//break;
		}
		//case 1: //Teutons
		if (iRace == 1){
			t1 = "Askar Belantan";
			t2 = "Askar Lembing";
			t3 = "Askar Kapak";
			t4 = "Peninjau";
			t5 = "Kesatria Santo";
			t6 = "Kesatria Teutonik";
			t7 = "Kerata Pelantak";
			t8 = "Tarbil";
			t9 = "Penghulu";
			t10 = "Peneroka";
			//break;
		}
		//case 2: //Gauls
		if (iRace == 2){
			t1 = "Falanks";
			t2 = "Askar Pedang";
			t3 = "Penjelajah";
			t4 = "Guruh Theutates";
			t5 = "Penunggang Druid";
			t6 = "Haeduan";
			t7 = "Kereta Pelantak";
			t8 = "Tarbil";
			t9 = "Pemimpin";
			t10 = "Peneroka";
			//break;
		}
	//}

	div = document.createElement ('div'); 
	div.id = "hoverpopup";
	div.class = 'handle ttq_draghandle'
	div.style.visibility = 'hidden';
	div.style.position = 'absolute';
	div.style.borderStyle = 'solid';
	div.style.borderWidth = '1px';
	div.style.top = '600px';
	div.style.left = '140px';
	div.innerHTML = '<form>'+t1+':<input type="text" size="1" value="0" id="t1"><br/>'+t2+':<input type="text" size="1" value="0" id="t2"><br/>'+t3+':<input type="text" size="1" value="0" id="t3"><br/>'+t4+':<input type="text" size="1" value="0" id="t4"><br/>'+t5+':<input type="text" size="1" value="0" id="t5"><br/>'+t6+':<input type="text" size="1" value="0" id="t6"><br/>'+t7+':<input type="text" size="1" value="0" id="t7"><br/>'+t8+':<input type="text" size="1" value="0" id="t8"><br/>'+t9+':<input type="text" size="1" value="0" id="t9"><br/>'+t10+':<input type="text" size="1" value="0" id="t10"><br/><input id="submitButton" type="submit" value="Add></form>';
	//div.innerHTML = '<form><table border="0" cellspacing="0" cellpadding="0"><tr><td>'+t1+':</td><td><input type="text" size="1" value="0" id="t1"></td><td>'+t2+':</td><td><input type="text" size="1" value="0" id="t2"></td><td>'+t3+':</td><td><input type="text" size="1" value="0" id="t3"></td><td>'+t4+':</td><td><input type="text" size="1" value="0" id="t4"></td><td>'+t5+':</td><td><input type="text" size="1" value="0" id="t5"></td></tr><tr><td>'+t6+':</td><td><input type="text" size="1" value="0" id="t6"></td><td>'+t7+':</td><td><input type="text" size="1" value="0" id="t7"></td><td>'+t8+':</td><td><input type="text" size="1" value="0" id="t8"></td><td>'+t9+':</td><td><input type="text" size="1" value="0" id="t9"></td><td>'+t10+':</td><td><input type="text" size="1" value="0" id="t10"></td></tr><tr><td colspan="10"><input type="submitButton" name="Submit" value="Add"></td></tr></table></form>';
	document.body.appendChild(div);
	document.getElementById('submitButton').addEventListener('click',voegToe,true);

}else{

	div = document.createElement ('div'); 
	div.id = "hoverpopup";
	div.class = 'handle ttq_draghandle'
	div.style.visibility = 'hidden';
	div.style.position = 'absolute';
	div.style.borderStyle = 'solid';
	div.style.borderWidth = '1px';
	div.style.top = '600px';
	div.style.left = '140px';
	div.innerHTML = 'Sila set puak anda terlebih dahulu...';
	document.body.appendChild(div);

	}
};

function showHoverPopup(hoveritem)
{
hover = document.getElementById('hoverpopup');
hover.style.visibility = "Visible";
//alert("sdjskjdk");
};

function getNumber(strA)
{
	var terug;
	//alert(strA.indexOf("'")+1+"      "+strA.lastIndexOf("'"));
	if((strA.indexOf("=")+1 ) == 0 &&  strA.lastIndexOf(";") == -1)
	{
		return 0;
	}
	else
	{
		return strA.substring(strA.indexOf("=")+1, strA.indexOf(";"));
	}
};


function Random(minimum, maximum)
{	
	if(minimum == null && maximum == null )
	{
		minimum = 1000;
		maximum = 10000;
	}
	return Math.random()*(maximum-minimum+1);
		
};

function sendtroops() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var aantal = GM_getValue("teller"+tekst,0);
	var pagina = document.getElementById("lmid2").innerHTML;	
	if(pagina.indexOf("There isn't a Village on these coördinates.") > -1)
	{
		setTimeout( 'window.location.replace( "a2b.php")', Random(1000, 5000));//ditukar oleh coolD
		//alert("jalan");
	}else{
	if( pagina.indexOf("kid") > -1)
	{
		//alert("masih jalan lagi");
		var e = document.getElementsByTagName('form');
		e[0].submit();

	}else{
		var code = document.getElementById('lmid2').innerHTML;
		//alert (code.substr(code.lastIndexOf("t1.value"), 20));
		var type1 = getNumber(code.substr(code.lastIndexOf("t1.value"), 20));
		var type2 = getNumber(code.substr(code.lastIndexOf("t2.value"), 20));
		var type3 = getNumber(code.substr(code.lastIndexOf("t3.value"), 20));
		var type4 = getNumber(code.substr(code.lastIndexOf("t4.value"), 20));
		var type5 = getNumber(code.substr(code.lastIndexOf("t5.value"), 20));
		var type6 = getNumber(code.substr(code.lastIndexOf("t6.value"), 20));
		var type7 = getNumber(code.substr(code.lastIndexOf("t7.value"), 20));
		var type8 = getNumber(code.substr(code.lastIndexOf("t8.value"), 20));
		var type9 = getNumber(code.substr(code.lastIndexOf("t9.value"), 20));
		var type10 = getNumber(code.substr(code.lastIndexOf("t10.value"), 20));
		//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
		
		intevullen = new Array();
		//alert("fermos"+tekst+''+getEigen());
		intevullen = GM_getValue("fermos"+tekst+''+getEigen(),"").split("\n");
		//alert(GM_getValue("fermos"+tekst+''+getEigen(),""));
		if(intevullen == "")	{
			
			veranderDorp();
		}else{
		
		
			if(aantal < intevullen.length-1)
			{
				aantal = aantal+1;
			}else
			{
				aantal = 1;
			}
			
			//alert(aantal);
			
			intevullen[aantal] = intevullen[aantal].split("|");
			intevullen[aantal][0] = intevullen[aantal][0].split(",");
			intevullen[aantal][1] = intevullen[aantal][1].split(","); 		
			//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
			if(		parseInt(intevullen[aantal][1][0]) > parseInt(type1) ||
					parseInt(intevullen[aantal][1][1]) > parseInt(type2) ||
					parseInt(intevullen[aantal][1][2]) > parseInt(type3) ||
					parseInt(intevullen[aantal][1][3]) > parseInt(type4) ||
					parseInt(intevullen[aantal][1][4]) > parseInt(type5) ||
					parseInt(intevullen[aantal][1][5]) > parseInt(type6) ||
					parseInt(intevullen[aantal][1][6]) > parseInt(type7) ||
					parseInt(intevullen[aantal][1][7]) > parseInt(type8) ||
					parseInt(intevullen[aantal][1][8]) > parseInt(type9) ||
					parseInt(intevullen[aantal][1][9]) > parseInt(type10) )
			{
				//alert ("Not enough troops!");
				/*alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
				alert(intevullen[aantal][1][0]+","+intevullen[aantal][1][1]+","+intevullen[aantal][1][2]+","+intevullen[aantal][1][3]+","+intevullen[aantal][1][4]+","+intevullen[aantal][1][5]+","+intevullen[aantal][1][6]+","+intevullen[aantal][1][7]+","+intevullen[aantal][1][8]+","+intevullen[aantal][1][9]);*/
				veranderDorp();
			}else{
				
				//alert ("vul in");
				

				
				document.forms.namedItem("snd").elements.namedItem('t1').value= intevullen[aantal][1][0];
				document.forms.namedItem("snd").elements.namedItem('t2').value= intevullen[aantal][1][1];
				document.forms.namedItem("snd").elements.namedItem('t3').value= intevullen[aantal][1][2];
				document.forms.namedItem("snd").elements.namedItem('t4').value= intevullen[aantal][1][3];
				//document.forms.namedItem("snd").elements.namedItem('t4').value= 23; //oleh payal... emergency testing
				document.forms.namedItem("snd").elements.namedItem('t5').value= intevullen[aantal][1][4];
				document.forms.namedItem("snd").elements.namedItem('t6').value= intevullen[aantal][1][5];
				document.forms.namedItem("snd").elements.namedItem('t7').value= intevullen[aantal][1][6];
				document.forms.namedItem("snd").elements.namedItem('t8').value= intevullen[aantal][1][7];
				document.forms.namedItem("snd").elements.namedItem('t9').value= intevullen[aantal][1][8];
				document.forms.namedItem("snd").elements.namedItem('t10').value= intevullen[aantal][1][9];
				if (iWira!=0){
				  document.forms.namedItem("snd").elements.namedItem('t11').value= iWira; //oleh payal - sertakn hntr heroes dlm autofarm
				}
				//held  document.forms.namedItem("snd").elements.namedItem('t1').value= "10";
				
				//if (iJenis!=0){
				  document.forms.namedItem("snd").elements.namedItem('c').value = 4;
				//}else{
				  //document.forms.namedItem("snd").elements.namedItem('c').value = 3;
				//}
				document.forms.namedItem("snd").elements.namedItem('x').value = intevullen[aantal][0][0];
				document.forms.namedItem("snd").elements.namedItem('y').value = intevullen[aantal][0][1];
				
				GM_setValue("teller"+tekst,aantal);
				document.forms.namedItem("snd").submit(); 
				//	document.namedItem("s1").submit();
			}
		}
	}
	}
};


function veranderDorp()
{

	var teller = 0 ;
	var linklijst = new Array();
	var doel;
	var plaats;
	dorplink = document.getElementById("lright1").innerHTML;
	//alert (dorplink);
	while(dorplink.indexOf("?newdid=") != -1)
	{
		linklijst[teller] = dorplink.substr(dorplink.indexOf("?newdid=")+8,8);
		linklijst[teller] = linklijst[teller].substring(0,linklijst[teller].indexOf("\""));
		teller++;
		dorplink = dorplink.substr(dorplink.indexOf("?newdid=")+15);
	}
	plaats = Math.round(Random(0, teller-1 )-0.5);
	//alert (plaats);
	doel = linklijst[plaats]; 
	doel = iNewdid; //ditukar oleh coolD
	//alert ("id: "+doel);
	//window.location.replace( "a2b.php?newdid="+doel+"");
	setTimeout( 'window.location.replace( "a2b.php?newdid='+doel+'")', Random(15000, 50000));
	//alert (dorplink);
	//stringObject.substr(start,length)
	
};

function getEigen() {
	/*if (document.getElementById('lright1')) {
		var code = document.getElementById('lright1').innerHTML;
		code = code.substring(code.indexOf("class=\"active_vl\"")+1);
		//alert (code.substr(code.indexOf(">("),code.indexOf("center dlist2")));
		var x = code.substring(code.indexOf(">(")+2, code.indexOf("center dlist2")-17);
		var y = code.substring(code.indexOf("left dlist3")+13, code.indexOf(")"));;
		return (x+y);
	}
	else {
	*/
		var x = -94;
		var y = 185;
	//}
	return (x+"|"+y); 
};

function voegToe() {
	var code = document.getElementById('lmid2').innerHTML;
	var x = code.substring(code.indexOf("(")+1,code.indexOf("|"));
	var y = code.substring(code.indexOf("|")+1,code.indexOf(")"));
	var dorpnaam = code.substring(code.indexOf("<h1>")+4,code.indexOf("("));
	var t1 = parseInt(document.getElementById('t1').value);
	var t2 = parseInt(document.getElementById('t2').value);
	var t3 = parseInt(document.getElementById('t3').value);
	var t4 = parseInt(document.getElementById('t4').value);
	var t5 = parseInt(document.getElementById('t5').value);
	var t6 = parseInt(document.getElementById('t6').value);
	var t7 = parseInt(document.getElementById('t7').value);
	var t8 = parseInt(document.getElementById('t8').value);
	var t9 = parseInt(document.getElementById('t9').value);
  	var t10 = parseInt(document.getElementById('t10').value);
  	addList(x+","+y+"|"+t1+","+t2+","+t3+","+t4+","+t5+","+t6+","+t7+","+t8+","+t9+","+t10+"|"+dorpnaam);
	//addList(x+","+y+"|0,0,0,25,0,0,0,0,0,0|"+dorpnaam);
	//addList(x+","+y+"|"+penyerang+"|"+dorpnaam);
	//alert('Added: '+dorpnaam+"(x:"+x+"|y:"+y+")"); //opslaan moet nog gemaakt worden. afhankelijk van coordinatan van geselecteerd dorp -> eerst coordinaten ophalen.
	alert("Koordinat ("+x+"|"+y+") telah ditambah ke dalam senarai...");
};

function addList(add) {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var tekst = tekst+''+getEigen();
	var doel = GM_getValue("fermos"+tekst,"");
	//var doel = readList();
	doel = doel+"\n"+add;
	//alert(doel);
	GM_setValue("fermos"+tekst,doel);

};

function readList() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var tekst = tekst+''+getEigen();
	var doel = GM_getValue("fermos"+tekst,"");
	alert(doel);
	return doel;

};

addHover();
function addForm() {
	
	var addButton = document.createElement('a');
	addButton.href = 'javascript:void(0)';
	addButton.innerHTML = "» Tambah ke senarai Serangan Automatik";
	//addButton.addEventListener('click',voegToe,true);
	addButton.addEventListener('click',function(){showHoverPopup(this)},true);
	
	var cont = document.getElementById("lmid2");	

	var tbody = cont.getElementsByTagName("tbody")[2];
	var row = document.createElement("TR");
	var cell1 = document.createElement("TD");
	cell1.appendChild(addButton);
	row.appendChild(cell1);
	tbody.appendChild(row);

};

function geefOverzicht() {

	//Button for removing farm
	var addButton = document.createElement('a');
	addButton.href = 'javascript:void(0)';
	addButton.addEventListener('click',removeFarm,true);
	var img = document.createElement('img');
	img.addEventListener('click',removeFarm,true);
	img.src = 'http://'+document.domain+'/img/un/a/del.gif';
	img.setAttribute('height','12'); 
	img.setAttribute('width','12');	
	img.style.height = '12px';
	img.style.width = '12px';
	addButton.appendChild(img);

	//button ON or OFF
	var onoffButton = document.createElement('a');
	onoffButton.href = 'javascript:void(0)';
	//onoffButton.id = 'a12';
	//onoffButton.title = 'test';
	if(GM_getValue("valaan"+document.domain,0) == 0){
		onoffButton.innerHTML = "Mulakan Serangan!!!";
	}
	else {
		onoffButton.innerHTML = "Serangan Auto Dilaksanakan";
	}
	onoffButton.addEventListener('click',startenstop,true);
	
	var aaa = document.createElement('a');
	aaa.href = '#';
	aaa.innerHTML = '~ ©coolD(MarshaLL) ~';
	aaa.title = 'Jgn guna script ni kalo xsuka aku';
	
	var tekst = document.domain+''+getEigen();
	var doel = GM_getValue("fermos"+tekst,"");
	var farms = new Array;
	farms = doel.split("\n");
	
	var cont = document.getElementById("lmid2");	

	var table = cont.getElementsByTagName("table")[0];
	
	var ntable = document.createElement("table");
	ntable.className = "tbg";
	ntable.setAttribute('cellpadding', 2);	//cellpadding="2"
	ntable.setAttribute('cellspacing', 1);	//cellspacing="1"
	ntable.style.marginBottom = "14px";
	
	var ntbody = document.createElement("tbody");
	ntable.appendChild(ntbody);
	
	var ntr = document.createElement("tr");
	ntr.className = "cbg1";
	
	var ntd = document.createElement("td");
	ntd.width = "20%";
	ntd.appendChild(onoffButton);
	
	var ntd1 = document.createElement("td");
	ntd1.width = "20%";
	ntd1.setAttribute('colspan', 10);
	//ntd1.innerHTML = "<span class='c0'><a href='http://userscripts.org/scripts/source/25482.user.js'>Update AutoFarm script</a></span>";
	//ntd1.innerHTML = "©coolD(MarshaLL)";
	ntd1.appendChild(aaa);
	
	ntr.appendChild(ntd);
	ntr.appendChild(ntd1);
	ntbody.appendChild(ntr);
	
	if (farms.length > 0) {
		for (b=1;b<farms.length;b++) {
			var ntr = document.createElement("tr");
			ntr.className = "unit";
			
			//alert(farms[b].split("|")[2]);
		
			var ntd = document.createElement("td");
			ntd.classname = 'r7';
			ntd.appendChild(addButton);
			//Vilage
			ntd.addEventListener('click',removeFarm,true);
			ntd.innerHTML += farms[b].split("|")[2]+' ('+(farms[b].split("|")[0]).replace(',','|')+')';
			ntr.appendChild(ntd);
			
			for (i=0;i<=9;i++) {
				var ntd = document.createElement("td");
				var troops = farms[b].split("|")[1];
				if (farms.length > 1) {
					troops = troops.split(',');
					ntd.innerHTML = parseInt(troops[i]);
				}
				ntr.appendChild(ntd);
			}
			
			ntbody.appendChild(ntr);
		}
	}
	
	cont.insertBefore(ntable,table);
	//var aaa = document.createElement('a');
	//aaa.innerHTML = 'test';
	//aaa.title = t('don't use this if u don't like me.');
	//aaa.href = '#';
	//aaa.addEventListener('click',testA, false);
	
};

function removeFarm() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	GM_setValue("fermos"+tekst+getEigen(),'');
	GM_setValue("valaan"+tekst,0);
	alert('Senarai akan dikosongkan, dan serangan automatik juga akan OFF.');
	window.location.reload();
	//return;
};

function startenstop() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );

	if(GM_getValue("valaan"+tekst,0) == 0) {
		GM_setValue("valaan"+tekst,1);
		GM_addStyle("body { color:red; }");
		//alert("start");
	}else{
		GM_setValue("valaan"+tekst,0);
		GM_addStyle("body { color:black; }");
		//alert("stop");
	}
	window.location.reload(); 
	
};

function testA(event){};

function valAan()
{
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	
	if(GM_getValue("valaan"+tekst,0) == 1)
	{
		GM_addStyle("body { color:red; }");
		
		addButton = document.createElement('input');
		addButton.type = "button"; // type bepalen
		addButton.value = "Tekan sini untuk menghentikan serangan automatik.";
	
		addButton.addEventListener('click',startenstop,true);
		addButton.style.position = "absolute";
		addButton.style.top = "5px";
		addButton.style.left = "650px";
		addButton.style.zIndex = "999";
		addButton.style.width = "400px";
		addButton.style.height = "22px";
		addButton.style.background = "#FF0000";
	
		document.body.appendChild(addButton);
		
		var url = document.URL;
		url = url.substring(url.lastIndexOf("/")+1);
		
		switch(url)
		{
				case "a2b.php":
					 //setTimeout( sendtroops, Random());
					 if(iDelay>0)
					    setTimeout( sendtroops, iDelay);
					 else
					    setTimeout( sendtroops, Random());
					 //setTimeout( sendtroops, 50000);
					 //alert("jalan");
	 				 break;
				default:
					 //setTimeout( 'window.location.replace( "a2b.php" )', Random());
					 if (iDelay>0)
					    setTimeout( 'window.location.replace( "a2b.php" )', iDelay);
					 else
					    setTimeout( 'window.location.replace( "a2b.php" )', Random());
					 //setTimeout( 'window.location.replace( "a2b.php" )', 50000);
	
		}

		
	}
	//else GM_addStyle("body { color:red; }");
	
};

function isInt(x) {
   var y = parseInt(x);
   if (isNaN(y)) {return false;}
   return x==y && x.toString()==y.toString();
};

function setJenis(){
   var newJenis = false;
   var sJenis = 'Normal';
   while(!isInt(newJenis)){
   	if (iJenis != 0){sJenis = 'Serbuan';}
   	newJenis = prompt("Pilih jenis serangan yang akan dilakukan. \nSekarang, askar-askar anda melakukan Serangan: "+sJenis+" \n0 - Normal \n1 - Serbuan");
   	if(isInt(newJenis)){
   		newJenis = parseInt(newJenis);
   		if((newJenis == 0)||(newJenis == 1)){
   		   createCookie("AUTOFARM_TYPE",newJenis,365);
   		   location.reload();
   		   break;
   		}else{
   		   newJenis = false;
   		}
   	}
   }
};

function setPuak(){
   var newPuak = false;
   while(!isInt(newPuak)){
   	newPuak = prompt("Sila nyatakan jenis Puak anda. \nSekarang, anda Puak: "+iRace+" \n0 - Roman \n1 - Teuton \n2 - Gaul");
   	if(isInt(newPuak)){
   		newPuak = parseInt(newPuak);
   		if((newPuak >- 1)&&(newPuak <= 2)){
   		   createCookie("AUTOFARM_PUAK",newPuak,365);
   		   location.reload();
   		   break;
   		}else{
   		   newPuak = false;
   		}
   	}
   }
};

function setDelay(){
   var newDelay = false;
   while(!isInt(newDelay)){
	   newDelay = prompt("Sila masukkan Delay yang anda kehendaki dlm milisecond (5000ms = 5seconds). \nSekarang, Delay adalah: "+iDelay);
	   if(isInt(newDelay)){
		newDelay = parseInt(newDelay);
		if(newDelay > -1){
		   //iDelay = newDelay;
		   createCookie("AUTOFARM",newDelay,365);
		   location.reload();
		   break;
		}else{
		   newDelay = false;
		}
	   }
   }
};

function setWira(){
   var Wira = false;
   var sWira = "TIDAK";
   while(!isInt(Wira)){
      if(iWira!=0) sWira = "";
      Wira = prompt("Anda ingin menyertakan sekali Wira anda \ndalam pasukan Penyerang Automatik ini? Sekarang anda "+ sWira + " MENYERTAKAN Wira Anda. \n1 - YA\n0 - TIDAK");
      if(isInt(Wira)){
      	Wira = parseInt(Wira);
      	if((Wira == 1)||(Wira == 0)){
      	   createCookie("AUTOFARM_WIRA",Wira,365);
      	   location.reload();
	   break;
      	}else{
      	   Wira = false;
      	}
      }
   }
};

function readCookie(name) {
	if(!name) {var name = "AUTOFARM";}
	var reg = new RegExp(name + "=([^;\n\r]*);?", "i");
	var data = reg.exec(document.cookie);
	if (data == null || data.length <= 1) {
		return '';	
	}	
	return data[1];
};

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	
	document.cookie = name+"="+value+expires+"; path=/";
	
	return true;
};

function hoofdfunctie() {
	tekst = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
	if(tekst.indexOf(" <!-- ERROR ITEM CONTAINER") != -1)
	{
		window.location.reload();
	}
	
	//GM_registerMenuCommand("Penyerang Automatik: Jenis Serangan", setJenis);
	GM_registerMenuCommand("Penyerang Automatik: Set Puak", setPuak);
	GM_registerMenuCommand("Penyerang Automatik: Set Delay", setDelay);
	GM_registerMenuCommand("Penyerang Automatik: Hantar Wira", setWira);
	var data = readCookie("AUTOFARM");
	var data1 = readCookie("AUTOFARM_WIRA");
	var data2 = readCookie("AUTOFARM_PUAK");
	var data3 = readCookie("AUTOFARM_TYPE");
	//alert(data);
	if(data==''||data1==''||data2==''||data3==''){  //jika cookie tidak wujud, create new one
		createCookie("AUTOFARM",60000,365);
		createCookie("AUTOFARM_WIRA",0,365);
		createCookie("AUTOFARM_PUAK",0,365);
		createCookie("AUTOFARM_TYPE",0,365);
		//alert("Setting pertama kali untuk skrip Penyerang Automatik \ntelah berjaya dilaksanakan.");
		
		data = readCookie("AUTOFARM");
		data1 = readCookie("AUTOFARM_WIRA");
		data2 = readCookie("AUTOFARM_PUAK");
		data3 = readCookie("AUTOFARM_TYPE");
	}
	iDelay = data;
	iWira = data1;
	iRace = data2;
	iJenis = data3;
	
	getEigen()
	var url = document.URL;
	url = url.substring(url.lastIndexOf("/")+1);
	//alert (url);
	switch(url)
	{
	case "build.php?gid=16":
	 	geefOverzicht();
                valAan();
	  	break;
        case "build.php?id=39":
                geefOverzicht();
                valAan();
	  	break;
	default:
		valAan();
	  	break;
	}
	if (url.indexOf('karte.php?d=') > -1) {
		addForm();
	}
};


//addhover();
window.addEventListener('DOMContentLoaded', hoofdfunctie, false);
if (document.body) hoofdfunctie();