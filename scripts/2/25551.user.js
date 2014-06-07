// ==UserScript==
// @name           tolvajok szovegroviditoje (csetes verzió)
// @namespace      namespace
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// ==/UserScript==

var objMsg, msg="", konvmsg="";
var fonts = document.getElementsByTagName('font');
var jatekos=fonts[1].innerHTML;
var body = document.getElementsByTagName('body')[0];
var objOldalTipus = searchDOM('//input[@name="oldalTipus"]').snapshotItem(0);
var oldalTipus=objOldalTipus.getAttribute('value')

if(oldalTipus=="otVilag"){
	objMsg=fonts[104]; 
	objMsg.setAttribute("class","msg");
	msg=objMsg.innerHTML;
	
	
	var chatbox=document.getElementById("mydiv");
	addCSS(".chatbox{padding: 10px 5px 0;position: absolute; z-index: 1000 !important; left: 790px !important; top: 100px !important; width: 200px !important; height: 500px !important;  background-color: #fff !important;}"); 
	chatbox.className="chatbox";

	
	
	var plusz=false, aktPlusz=false, elozoPlusz=false;
	
	var div = document.createElement('DIV');
	div.className = "none";
	body.appendChild(div);	
	
	var navbar = document.createElement('DIV');
	navbar.className = "nav";
	body.appendChild(navbar);
	
	var elozo=newNavItem("<font color='#5566aa'>&laquo;</font>","elozo");
		elozo.addEventListener('click', function() {elozo.style.display="none";kovetkezo.style.display="inline"; aktPlusz=plusz; plusz=elozoPlusz;}, true);
	var kovetkezo=newNavItem("<font color='#5566aa'>&raquo;</font>","mostani");
		kovetkezo.addEventListener('click', function() {elozo.style.display="inline";kovetkezo.style.display="none"; elozoPlusz=plusz; plusz=aktPlusz;}, true);
		kovetkezo.style.display="none";
	newSpace(2);
	newNavItem("<font color='#bbccdd'>&sum;</font>","szovegtar");
	newSpace(2);
	newNavItem("<font color='#d1553f'>x</font>","x");
	newSpace(2);
	newNavItem("<font color='#008080'>&hellip;</font>","plusz");
	newSpace(2);
	newNavItem("<font color='#999999'>?</font>","info");	
		
	if(GM_getValue(jatekos+"mostani")) GM_setValue(jatekos+"elozo", GM_getValue(jatekos+"mostani"));
	if(msg) GM_setValue(jatekos+"mostani", charconv(msg,false));
	
}

function newNavItem(nev, item){
	navitem = document.createElement('SPAN');
	navitem.innerHTML=nev;
	navitem.className = "bgnone";
	navitem.addEventListener('click', function() {nav(item);}, true);
	navitem.addEventListener('mouseover', function() {this.className="bgFFF";}, true);
	navitem.addEventListener('mouseout', function() {this.className="bgnone";}, true);
	navbar.appendChild(navitem);
	return navitem;
}
function newSpace(db){
	var space="";
	for(var k=0; k<db; k++) space+="&nbsp;";
	navitem = document.createElement('B');
	navitem.innerHTML=space;
	navbar.appendChild(navitem);
}

function nav(item){
	var newmsg="";
	
	if(item=="konv"){	
		var iNyito=0, iZaro=0,  ertek="", nev="", csapik="", sikertelen="", szajre="";	
		var tp="", haz="", megerzes="", gyszeg="", lakik="";	
		var zsebel1="", zsebel2="", kitol="", mennyit="", tpzseb1="", tpzseb2="";	
		
		/****RABLÁS*****/		
		msg2=msg;
		while(iNyito>-1 && iZaro>-1){
			iNyito=msg2.indexOf('(');
			iZaro=msg2.indexOf(')');
			ertek=kozte('(', ')', msg2);
			nev=msg2.substring(0,iNyito).match("manadémon|hurokzár|pengegép|tüskeköp"+String.fromCharCode(337)+"|zombi!|zuhanórács"); 
			if(nev && ertek!=""){ 
				nev+=""; nev=nev.replace("!","");
				csapik+=nev+"("+ertek+") ";
			}
						
			msg2=msg2.substring(iZaro+1);
		}
		sikertelen=msg.match("Hiába bogozgatod|egy penge eltalált|A démon teste körbefon|nem tudsz kiszabadulni|egy tüske így is eltalált|fogoly maradsz"); 
		if(sikertelen) {
			sikertelen+=""; sikertelen=sikertelen.replace("így is",""); sikertelen=sikertelen.toLowerCase();
			csapik+=" ..."+sikertelen;
		}
		if(csapik.length>0) csapik="<br>"+csapik;
		
		iNyito=0; iZaro=0; msg2=msg; 
		while(iNyito>-1 && iZaro>-1){
			iNyito=msg2.indexOf('hátizsákodba:');
			iZaro=msg2.indexOf('.');
			ertek=kozte('hátizsákodba:', '.', msg2);
			if(ertek.length>0) szajre='<br>hátizsákodba:'+ertek;			
			msg2=msg2.substring(iZaro+1);
		}
		
		ertek=kozte('Megérzésed jutalma', '</font>.', msg);
		if(ertek.length>0) megerzes="<br>Megérzésed jutalma "+ertek+"</font>.";		
		
		ertek=kozte('megcsillan ', ' darab gyémántszeg', msg);
		ertek=ertek.replace("valami,","");
		if(ertek.length>0) gyszeg="<br>+ "+ertek+"db gyémántszeg";
		
		ertek=kozte('kiderül, hogy ', ' lakik itt!', msg);
		if(ertek.length>0) lakik="<br>"+ertek+" lakik itt";
		
		if(msg.match("a ház üres")) haz=" (üres ház)";
		
		/**ZSEBELÉS**/
		ertek=kozte('Sikeresen zsebeltél', 'nev'+String.fromCharCode(369)+' áldozatodtól', msg);
		if(ertek.length>0) kitol=ertek;
		mennyit=kozte('áldozatodtól', 'ezüstöt!', msg);
		if(mennyit.length>0){
			tp="";		
			msg2=msg.substring(msg.indexOf('áldozatodtól'));
			ertek=kozte('<font color="red">', '</font>  tapasztalati pontot kaptál', msg2);
			if(ertek.length>0) tpzseb1=' <font color="red">'+ertek+'</font>tp';	
			
			zsebel1="<br>"+kitol+" - "+mennyit+"ezüst - "+tpzseb1;	
		}
		
		
		ertek=kozte('', ' megpróbált lopni', msg);
		if(ertek.length>0) kitol=ertek;
		mennyit=kozte('te lopod meg!', 'ezüstöt szereztél', msg);
		if(mennyit.length>0){
			tp="";	
			msg2=msg.substring(msg.indexOf(' megpróbált lopni'));	
			ertek=kozte('<font color="red">', '</font>  tapasztalati pontot kaptál', msg2);
			if(ertek.length>0) tpzseb2=' <font color="red">'+ertek+'</font>tp';	
			
			zsebel2="<br>"+kitol+" - "+mennyit+"ezüst - "+tpzseb2+" (lopni próbált)";	
		}
		
		/**RABLÁS TP**/	
		msg2=(zsebel2.length>0 || zsebel1.length>0 )? msg.substring(msg.indexOf('</font>  tapasztalati pontot kaptál')+1) : msg;
		ertek=kozte('<font color="red">', '</font>  tapasztalati pontot kaptál', msg2);
		if(ertek.length>0) tp='<br> <font color="red">'+ertek+'</font>tp';	
		
		konvmsg=zsebel2+zsebel1+csapik+szajre+lakik+tp+haz+gyszeg+megerzes;
		konvmsg=konvmsg.substring(4);
	}
	
	
	if(item=="szovegtar"){		
		if(GM_getValue(jatekos+"szovegtar")){
			szovegtar=GM_getValue(jatekos+"szovegtar");
			szovegtar=charconv(szovegtar,true);
		}else{
			szovegtar="Még nem rövidítettél egy szöveget sem!";
		}
		newmsg=szovegtar;		
	}
	
	
	if(item=="plusz"){
		nav("konv");
		if(konvmsg.length>0){
			if(GM_getValue(jatekos+"szovegtar")){
				br="<br><br>";
				szovegtar=GM_getValue(jatekos+"szovegtar");				
			}else {
				br="";
				szovegtar="";
			}
			newmsg=konvmsg;
			konvmsg=charconv(konvmsg,false);
			if(!plusz) GM_setValue(jatekos+"szovegtar", szovegtar+br+konvmsg);
			plusz=true;
		}else newmsg="Nincs értékelhet"+String.fromCharCode(337)+" adat.";
	}
	
	
	if(item=="x"){	
		nav("szovegtar");	
		if(GM_getValue(jatekos+"szovegtar")){
			if(confirm("Biztos törölni akarod az eddig lerövidített szövegeket?")){
				GM_setValue(jatekos+"szovegtar", "");
				newmsg="Törölve!";
			}else{
				newmsg=div.innerHTML;
			}
		}else 
				newmsg="Nincs mit törölni!";
	}
	
	if(item=="info"){	
		newmsg="<h2>Tolvajok szövegrövidít&#337;je</h2>";
		newmsg+="Segítségével lerövidíthetjük az aktuális rablás és zsebelés szövegét.<br><br>";
		newmsg+="<u>Jelmagyarázat:</u><br>";
		newmsg+="<font color='#008080' class='ikon'>&hellip; </font> lerövidíti az aktuális szöveget<br>";
		newmsg+="<font color='#bbccdd' class='ikon'>&sum; </font> megmutatja az eddig lerövidített szövegeket<br>";
		newmsg+="<font color='#d1553f' class='ikon'>x </font> törli az eddig lerövidített szövegeket<br>";
		newmsg+="<font color='#5566aa' class='ikon'>&laquo; </font> az el&#337;z&#337; oldal szövegét mutatja (nem lép vissza valójában)<br>";
		newmsg+="<font color='#5566aa' class='ikon'>&raquo; </font> a következ&#337; oldal szövegét mutatja (el&#337;z&#337; gombbal felváltva jelenik meg)<br>";
		newmsg+="<br> Ha a karakterkódolás valami oknál fogva nem ISO-8859-2, akkor a helyes m&#369;ködés  érdekében a böngész&#337 <i>Nézet->Karakterkódolás</i> menüpontja alatt állítsd át!";
		newmsg+="<br> Probléma esetén bátran írj a <a href='mailto:glinka@citromail.hu'>glinka@citromail.hu</a> címre, vagy kommentelj a <a href='http://userscripts.org/users/43962/scripts' target='_blank'>userscripts.org</a>on.";
	}
	
	if(item=="elozo"){	
		objMsg.innerHTML=charconv(GM_getValue(jatekos+"elozo"),true);
		msg=charconv(GM_getValue(jatekos+"elozo"),true);
	}
	if(item=="mostani"){	
		objMsg.innerHTML=charconv(GM_getValue(jatekos+"mostani"),true);
		msg=charconv(GM_getValue(jatekos+"mostani"),true);
	}
	
	if(newmsg.length>0){div.innerHTML=newmsg; div.className="plusz";}else div.className="none";
}

function kozte(strNyito, strZaro, str){
	iNyito=str.indexOf(strNyito);
	iZaro=str.indexOf(strZaro); 
	r=str.substring(iNyito+strNyito.length,iZaro);
	return (iZaro>-1 && iNyito>-1 && iNyito<iZaro)?r:"";
}
function isNum(str) {
   var test = "0123456789"
   for (i=0; i <= str.length-1; i++) {
      if (test.indexOf(str.charAt(i)) == -1) return false;
   }
   return true;
}
function charconv(str,toISO88592){
	if(toISO88592){
			str=replaceGlobal(String.fromCharCode(245),String.fromCharCode(337),str); 
			str=replaceGlobal(String.fromCharCode(213),String.fromCharCode(336),str); 
			str=replaceGlobal(String.fromCharCode(251),String.fromCharCode(369),str); 
			str=replaceGlobal(String.fromCharCode(219),String.fromCharCode(368),str); 
	}else{
			str=replaceGlobal(String.fromCharCode(337),String.fromCharCode(245),str); //ö 
			str=replaceGlobal(String.fromCharCode(336),String.fromCharCode(213),str); //Ö
			str=replaceGlobal(String.fromCharCode(369),String.fromCharCode(251),str); //ü
			str=replaceGlobal(String.fromCharCode(368),String.fromCharCode(219),str); //Ü
	}
	return str;
}

function replaceGlobal(s1, s2, str){
	var tmpStr=str, newStr="", i;
	while(tmpStr.length>0){
		i=tmpStr.indexOf(s1);
		newStr+=tmpStr.substring(0,i);
		if(i==-1) {newStr+=tmpStr;tmpStr="";}
		else{newStr+=s2;}
		tmpStr=tmpStr.substring(i+s1.length);
	}
	return newStr;
}

function searchDOM(X){return document.evaluate(X,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function addCSS(cssString) {
	var style, head;
	head = document.getElementsByTagName('HEAD')[0]; if (!head) { return; }
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	head.appendChild(style);
}
addCSS('.none{display: none;}');
addCSS('.bgnone{background: none;}');
addCSS('.bgFFF{background: #fff;}');
addCSS('.plusz, .nav, .szovegtar{'+
	'display: block;'+
	'font: normal 13px "Comic sans MS"; '+
	'position: absolute; z-index:3; left:5;'+
	'width: 600px;'+
	'padding: 5px;margin: 0px;}');
addCSS('.plusz{top: 510px; border: 2px solid #e6dac3; background-color: #fff; color:#333;}');
addCSS('.nav{top: 465px;}');
addCSS('.ikon, .nav span{ font: bold 22px "Comic sans MS";}');
addCSS('.nav span{ cursor: pointer; padding: 0 5px;}');
addCSS('.msg{'+
	'display: block;'+
	'height: 355px;'+
	'overflow: auto;'+
	'}');