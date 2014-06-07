// ==UserScript==
// @name           larki fix
// @namespace      namespace
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// ==/UserScript==


if(!GM_getValue("allapotjelzoRontas")) GM_setValue("allapotjelzoRontas","ok");
if(!GM_getValue("allapotjelzoMeretezes")) GM_setValue("allapotjelzoMeretezes","ok");
if(!GM_getValue("szinesharc")) GM_setValue("szinesharc","ok");
if(!GM_getValue("klanhazgorgeto")) GM_setValue("klanhazgorgeto","ok");
if(!GM_getValue("msggorgeto")) GM_setValue("msggorgeto","ok");
if(!GM_getValue("nincsbizti")) GM_setValue("nincsbizti","ok");
if(!GM_getValue("hatizsakbamindent")) GM_setValue("hatizsakbamindent","ok");
if(!GM_getValue("karikep100x100")) GM_setValue("karikep100x100","ok");
if(!GM_getValue("gombcimek")) GM_setValue("gombcimek","ok");


var body = document.getElementsByTagName('body')[0];
var objOldalTipus = searchDOM('//input[@name="oldalTipus"]').snapshotItem(0);
var oldalTipus=objOldalTipus.getAttribute('value')


// GOMBOK CÍME
if(GM_getValue("gombcimek")=="ok"){
	var inputImgs=searchDOM('//input[@type="image"]');
	for(var i=0; i<inputImgs.snapshotLength; i++){
		var img=inputImgs.snapshotItem(i);
		if(img.title=="" && img.alt!="") img.title=img.alt;
	}
}

//BEÁLLÍTÁSOKNÁL
if(oldalTipus=="otPlayerSettings"){
	//KARIKÉP ÁTMÉRETEZÉS
	if(GM_getValue("karikep100x100")=="ok"){
		var imgs = document.getElementsByTagName('img');
		imgs[1].style.maxWidth=100;
		imgs[1].style.maxHeight=100;
	}
	
	//MINDENT A HÁTIZSÁKBA GOMB RÁKÉRDEZ
	if(GM_getValue("hatizsakbamindent")=="ok"){
		var srcHatizsakba="data:image/gif,GIF89a%23%00-%00%C4%00%00%00%00%00%3Cp%93%A5L%257O_x4%16%81%A6%BB%FF%00%00%19%24*%FF%F0%00X%8A%A5%0A%0E%10%AF%C1%CCIj%7F%1F.7s%92%A4R%7B%91%5Cy%8C%2B%3FK%13%1C!%3E%5Eo%07%0A%0Cev%82%5Do%7C%0E%13%17%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%18%00%2C%00%00%00%00%23%00-%00%00%05%FF%604%3DNi%3AEq%96%E9Z%BDh%BA%CCR%C4%24k%AC%9E*%EEV%B1%D9Br%98%F8r%BBX%8E%E5%00%A2%84%87C%E4%91%80X!%89%AC6%0B%E8v%B7*%C8%04%E2%80%1E%1A%8C%07c%9Df%B3%01%86x%1C%10H%D4%13jFy%16E%E7%DD%80pr%06%00%0Cw%60f~%80%8B%82rt%87ZB%0B%7Dm%95%8C%83%84%01%9A%5B%09%92%94%09k%0F%7Fn%8Ds%9A%90%05%9Eg7%A1%A3k%5D%98%5D%9B%91%AAhY%8B%AF%98%83t%60%A9%7C%ABY%AEo%BA%84%86%A8%897%A2%B8%B9%BB%A2%CETT%C8%C1%CB%CC%C5%CF%D3O%93%AB%CEx%C2%B9%857%5By%D9%94%CF%CA%CB%E0%E1)%01l%E4g%23%AD%D0%D4%A1Z%01y%9D%BF%0D%23%E6%B7%0C%5E%FF%FF%BA%8DK%B4%0F%CF%96.%02%12*%5C(%A0%8B%9BlD%F4Q%E1%04%80%A1%C5%84%15%D3A%94%20%F1Z%C5%8B%0C%3Fj%F4%25%81%C8%00s%1FA%FF*L%D90%CD%C6%22(%15%22%40%00%F2%23%81%9B%00H%08)%D9%F1%81%97%844%05%04UH%C0%E6%CD%A2%24Hr%DC'%F2%A6%D0%99Gq%12%3DZ%E8%E5I%96%00nB%C5%89p*N%3DJ%0F%5C%C5%E8%25j%D1%8C%0B%A3VU*1%23%15%80%3F%1Bz%FD%BA%B1m%C3%B7!1%A6U%9B%94%06%91%09%FE%EE%FA%5C(%92%A1%D9%9C%7B%86%2C%F5%E7v%B0%5E%B9%7B%A9%EA%F4%2B%F6%15%C6%C0%8FY%9A-%AAg%A7I%CB%02%CE%AE%7C%9Cp%F3%DA%19%178%0ExCue%EB%D2j%D7dK%5Dy%CD%80%ACE%09%BF%3E%BC%26%81%2F%DA%AB%19%0C%18%9E%95eC%DC%B8%A9%AE%A9%E3%8B%02%05%09%AB%87%BF1NV-%B8M%BF)(%B01%D1X%D7%B9_%D9%60%A7%91%9A%7B%0AP%DE%E1%FEs%C3.%C0%C6%1A%03%EC%E1%19~%CA%D0%BC4%EC%18X%D8S%B2%86%D8%E1%00%02%B2%9A%1A%C1%A51%8Dp%16(E%9BJ%14%114(%02%15%0CL%00%18%3B%12V8A%1D%A2%8C%A1%94%04%174%E0%A1%83%11%008%00%88%24%3A8%80%84%C3%3D%90JI%17%A4%D6_%140%C6%18%23%11%FD%11qF%03%22%F8%D6%A2s-%F6%E8%E3%8F%3F%F2%08%A4%14%01%84%00%00%3B";
		addCSS('.karilap_hatizsakba{position: absolute; z-index:4; left:225px; top: 327px;}');	
		
		var hatizsakba = document.createElement('IMG');
		hatizsakba.src = srcHatizsakba;
		hatizsakba.title = "Viselt targyak a hatizsakba!";
		hatizsakba.className="karilap_hatizsakba";
		hatizsakba.addEventListener('click', function() {if(confirm("Biztos a hátizsába akarod tenni a viselt cuccaidat?")) {Submit.setAttribute("value",'svMindentHatizsakba'); urlap.submit();}}, false);
		body.appendChild(hatizsakba);	
	}
}

//HÁZBAN
if(oldalTipus=="otSajathaz"){	
	//MINDENT A HÁTIZSÁKBA GOMB RÁKÉRDEZ
	if(GM_getValue("hatizsakbamindent")=="ok"){
		var srcHatizsakbaHazban="data:image/gif,GIF89a1%00%1F%00%C4%00%00%E9%D3%24%BF%BF%BE%A6%9C%98%89%89%8D%C5va~%7F%84wx~iio%A2M(WW%5CIIMBBFy2%16G%3D7A%3D%3D%3A%3B%3E%F2%07%07722S%25%11.%2C-%26%23%23%17%17%19%00%00%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%17%00%2C%00%00%00%001%00%1F%00%00%05%FF%E0%25%8Edi%9EhZZ%15%E5%BE%F0%3BE%D14GM%F38K%AF%24%BF%84pH%14%1EF%15%9B%8D%86c%D2r%D0hpx%A8Z%0F%86%EC%D5%8A%9CPn8%07S%E9t%3A%1C%8A%DF%D6%80%CD%BA%DB%D8%EE%B2%DCP%C6%606tb%9D-d%07%80~YH_%6094%13%16%14%11%0F%8D%8D%0B%7B.%13%90UZ%05%05%03lX~W%843%0D8%0A%A0%16%16%08%08%04%A8%A9%A8%02%05%026%0A%95%06%98%03%05%07FU%40%3F%5DO%0Di%0D%A5%A6%C1%C2%A7%04%07%01%02%8C%7B%07%B3%B4%15%40%7B%16%11%06%02%0B%BB%A1i%16%0C%C3%DB%08%15%04%02%AE%93%9B%80%03%16%10B%14%E6%10%DF%D5%22ILh%D9%DA%DC%C1%C0%04%C73%09%B2%98%EA%3D%10%FF%EB%A8%ED%22%93%CD%14%00%00%F4%80!%10%80O%C1%3Eu%00%23%12(%D0%EEB%85%08b%12%912%C8Q%18%03%60%0C%18%7CC%B6%A7%00%C4%88%00%8B%FFU%AC%00IAAy%08%0E%02%08ISa%C8%85%03%26%240%89%B2'%84%05%0A%90%E8%83%89%40%DE%C1%9A%1B%83%DD%240%E0%C1%81l%3E%01%92%12%82%C4%409m%A4H%D1%0C%B9Q!%82%A5%05%1E%98%0C%19%D5%02%11%24%AD%B2Y8%98%B5-0%9B%60%A5%05%90%87r*%15%B4%02%2CHX%0B%C0kQS%5Ei%9E%CA%99%80%A1%D6%7Fvo%1Dq%97v%2F%5Bao%87%09f%3A%A9%40%80%CB%A4%20X%00%AAx%B1%C5%B4j%1F%03%1E%ED%11%EC%84%07%09%06%80%3B%96%B8%08%92%03%86%25%7C%EC%5B%8F%B4%A9%AD%A7%0C%9C%86e%15%5C%81%22g%DD%A5%9E%2B%FB%A3%C2%C8J'%1F%D8%3DD%0B%F0!H%9C%C6%96%7D%BCf%F2y%0A%BE%3C%00%9A%A6H%F7%E0%16'8%9C%EEU%DE%C7%DB%82k0J%A3%80%3B%FB%F7%EC%09E%D8%19%BB%60%3Dy%E6%B9%CE%D8%D1%BE%11%FC%FFA%B9%E3B%04%0A%B4%92%17Q%F7mE%0AZ%3C%3D%2C%F0H%83%FF%F5%40%88%24%05%82CJq!I%A0%A1%86%1F%ED%E7%C8%87%8E4(%A2%83%2B%C10_o%E5%B8%E5%96z%8C%80%E8%E2%8B%0FL%F8%02%81%9B%D4b%8Bw%2C%D2%D0%08%130%BA(%A3%0C%0FL%F1%9C%025%CC%C1%08%8F%3D~%A8%C2%92L6%E9%E4%93P%A6%10%02%00%3B";
		addCSS('.haz_hatizsakba{position: absolute; z-index:4; left:301px; top: 242px; cursor: pointer;}');	

		var hatizsakba = document.createElement('IMG');
		hatizsakba.src = srcHatizsakbaHazban;
		hatizsakba.title = "Viselt cuccok a hatizsakba!";
		hatizsakba.className="haz_hatizsakba";
		hatizsakba.addEventListener('click', function() {if(confirm("Biztos a hátizsába akarod tenni a viselt cuccaidat?")) {Submit.setAttribute("value",'svMindentHatizsakba'); urlap.submit();}}, false);
		body.appendChild(hatizsakba);	
	}	
}

if(oldalTipus=="otVilag"){	
	var fonts = document.getElementsByTagName('font');
	var objMsg=fonts[3]; 
	
	//BIZTOSÍTÁS HIÁNYÁT JELZI
	if(GM_getValue("nincsbizti")=="ok"){
		var vanBizti=false;
		var imgs = document.getElementsByTagName('img');
		for(var i=0; i<imgs.length; i++){
			var img=imgs[i];
			if(img.src.indexOf("bizt_van.gif")>-1) {vanBizti=true; break;}
		}	
		if(!vanBizti){objMsg.innerHTML+="<br><br>Nincs biztosításod!";}
	}
	
	//GÖRGETHETÖ ÜZENET	
	if(GM_getValue("msggorgeto")=="ok"){
		objMsg.setAttribute("class","msg");
		addCSS('.msg{display: block; height: 355px; overflow: auto;}');
	}else{
		objMsg.setAttribute("class","msgnormal");
		addCSS('.msgnormal{display: inline; overflow: visible;}');
	}
}

//KLÁNHÁZ
if(GM_getValue("klanhazgorgeto")=="ok"){
	//KLANSZABÁLYZAT GÖRGETÖSÁV NÉLKÜL
	if(oldalTipus=="otKlanhazPage"){
		var divs = document.getElementsByTagName('div');
		addCSS('body{font: normal 13px "Comic sans MS";}');
		divs[20].setAttribute("style","position: absolute; width: 340px;  z-index: 4; left: 195px; top: 110px; background-color: rgb(102, 153, 204); oveflow: auto; padding: 10px;");
	}
	//SZAVAZÁSOK GÖRGETÖSÁV NÉLKÜL
	if(oldalTipus=="otKlanhazBurokraciaPage"){
		var divs = document.getElementsByTagName('div');
		var table = document.getElementsByTagName('table')[0];
		table.width=550;
		table.className="szavazasok";
		table.setAttribute("align","center");
		addCSS('.szavazasok td{border-bottom: 1px #9bb solid; width: 50%; vertical-align:top;}');
		divs[19].setAttribute("style","overflow: auto; position: absolute; width: 575px; height: 528px; z-index: 3; left: 25px; top: 385px; background-color: rgb(170, 194, 204);");
	}
	//VEZÉREK TERME
	if(oldalTipus=="otKlanhazVezerekPage"){
		var divs = document.getElementsByTagName('div');
		var table = document.getElementsByTagName('table')[2];
		table.width=250;
		table.setAttribute("align","center");
		table.getElementsByTagName('td').width="50%";
		divs[16].setAttribute("style","position: absolute; width: 575px; height: 150px; z-index: 3; left: 25px; top: 309px; background-color: rgb(170, 194, 204);overflow: auto;");
		divs[17].setAttribute("style","position:absolute; width:294px; height:384px; z-index:3; left: 25px; top: 466px; background-color: #AAC2CC; border: 0px none #000000; overflow: auto; ");
		divs[18].setAttribute("style","position:absolute; width:275px; height:384px; z-index:3; left: 325px; top: 466px; background-color: #AAC2CC; border: 0px none #000000; overflow: auto;");
		divs[19].setAttribute("style","position:absolute; width:6; height:384px; z-index:6; left: 319px; top: 466px; background-image: url(/keret/csikfug.jpg); border: 0px none #000000");
		divs[20].setAttribute("style","position:absolute; width:575; height:20; z-index:6; left: 25; top: 452px; background-image: url(/keret/csikviz.gif); border: 0px none #000000");
	}
}

//SZINES ADATOK HARCBAN
if(GM_getValue("szinesharc")=="ok"){
	if(oldalTipus=="otHarc"){
		var fonts = document.getElementsByTagName('font');
		var objMsg=fonts[3]; 
		msg=objMsg.innerHTML;
		
		strNyito='Aurád felszív <font color="red">'; indexNyito=msg.indexOf(strNyito);
		strUjNyito='Aurád felszív <font color="darkred">';
		if(indexNyito>-1) msg=msg.substring(0,indexNyito)+strUjNyito+msg.substring(indexNyito+strNyito.length);
		strNyito='Aurád felszív <font color="red">'; indexNyito=msg.indexOf(strNyito);
		strUjNyito='Aurád felszív <font color="darkred">';
		if(indexNyito>-1) msg=msg.substring(0,indexNyito)+strUjNyito+msg.substring(indexNyito+strNyito.length);
		
		msg=szincsere(msg, '<font color="red">', '</font> életpontot gyógyulsz!', '<font color="#bc12f7">', '', true);
		msg=szincsere(msg, '<font color="red">', '</font> varázspontot regenerálsz!', '<font color="#06A28A">', '', true);
		msg=szincsere(msg, '<font color="red">', '</font> életpontja maradt.', '<font color="black"><b>', '</b>', true);
		msg=szincsere(msg, 'regenerálódik!', ' életpontot gyógyult!', '<font color="darkred">', '</font>', false);
		msg=szincsere(msg, ' ', ' varázspontot szív', ' <font color="blue"> ', '</font>', false);
		
		objMsg.innerHTML=msg; 
	}
	if(oldalTipus=="otDuel"){
		var fonts = document.getElementsByTagName('font');
		var objMsg=fonts[3]; 
		msg=objMsg.innerHTML;
		
		str2='</font> életpontja maradt.';  index2=msg.indexOf(str2);
		str='<font color="red">'; index=msg.lastIndexOf(str,index2);
		if(index>-1){newmsg=msg.substring(0,index)+'<font color="black"><b>'+msg.substring(index+str.length,index2)+'</b>'+msg.substring(index2); msg=newmsg;	}
		
		objMsg.innerHTML=msg; 
	}
}

function szincsere(strAlap, strNyito, strZaro, strUjNyito, strUjZaro, csereStrNyito){
	indexZaro=strAlap.indexOf(strZaro);
	indexNyito=strAlap.lastIndexOf(strNyito,indexZaro-1);
	L=csereStrNyito?0:strNyito.length; 
	if(indexNyito>-1 && indexZaro>indexNyito){
		var newAlap=strAlap.substring(0,indexNyito+L)+strUjNyito+strAlap.substring(indexNyito+strNyito.length,indexZaro)+strUjZaro+strAlap.substring(indexZaro);
		var elvalaszto=newAlap.indexOf(strZaro)+strZaro.length;
		return newAlap.substring(0,elvalaszto)+szincsere2(newAlap.substring(elvalaszto), strNyito, strZaro, strUjNyito, strUjZaro, csereStrNyito);
	} else return strAlap;
}
function szincsere2(strAlap, strNyito, strZaro, strUjNyito, strUjZaro, csereStrNyito){
	indexZaro=strAlap.indexOf(strZaro);
	indexNyito=strAlap.lastIndexOf(strNyito,indexZaro-1);
	L=csereStrNyito?0:strNyito.length; 
	if(indexNyito>-1 && indexZaro>indexNyito){
		return strAlap.substring(0,indexNyito+L)+strUjNyito+strAlap.substring(indexNyito+strNyito.length,indexZaro)+strUjZaro+strAlap.substring(indexZaro);
	} else return strAlap;
}

//ÁLLAPOTJELZÖ ÁTMÉRETEZÉS
if(GM_getValue("allapotjelzoMeretezes")=="ok"){
	if(oldalTipus=="otHarc" || oldalTipus=="otDuel"){
		var divs = document.getElementsByTagName('div');
		divs[26].setAttribute("style",divs[26].getAttribute("style")+";  font-size: 13.5px; top: 419px; width: 250px;");
		divs[26].innerHTML=divs[26].innerHTML.replace(/&nbsp;/g," ");
	}
	if(oldalTipus=="otVilag"){
		var divs = document.getElementsByTagName('div');
		divs[31].setAttribute("style",divs[31].getAttribute("style")+"; font-size: 13.5px; top: 342px; width: 250px;");
		divs[31].innerHTML=divs[31].innerHTML.replace(/&nbsp;/g," ");
	}	
	if(oldalTipus=="otArena"){
		var divs = document.getElementsByTagName('div');
		divs[21].setAttribute("style",divs[21].getAttribute("style")+"; font-size: 13.5px; top: 366px; width: 250px;");
		divs[21].innerHTML=divs[21].innerHTML.replace(/&nbsp;/g," ");
	}	
}

//RONTÁS MÖGÉ ÍRJA  A MÉRTÉKÉT
if(GM_getValue("allapotjelzoRontas")=="ok"){
	if(oldalTipus=="otHarc" || oldalTipus=="otDuel" || oldalTipus=="otVilag" || oldalTipus=="otArena"){			
		var imgs = document.getElementsByTagName('img');
		for(var i=0; i<imgs.length; i++){
			var img=imgs[i];
			if (rontas(img, "fert")) continue;
			if (rontas(img, "méreg")) continue;
			if	(rontas(img, "paralízis")) continue;
			if	(rontas(img, "átok")) break;
		}
	}
}

function rontas(img, str){
	index=img.title.indexOf(" "+str);
	if(index>-1){
		span=document.createElement('span');
		span.style.fontSize="11px";
		span.style.fontWeight="normal";
		span.innerHTML=":"+img.title.substring(0,index);
		img.parentNode.insertBefore(span, img.nextSibling);
		return  true;
	} else 
		return  false;
}

//BEÁLLÍTÁSOK
if(oldalTipus=="otVilag"){
	var ctrlBox = document.createElement('DIV');
	ctrlBox.className = "ctrlBox"; addCSS('.ctrlBox{position: absolute; z-index:4; left:30px; top: 433px;width: 200px;}');
	body.appendChild(ctrlBox);

	var tolarkifix = document.createElement('SPAN');
	tolarkifix.className = "ctrl"; addCSS('.ctrl{cursor:pointer;font: normal 13px "Comic sans MS"; color: #016;}');
	tolarkifix.innerHTML="Larki Fix beállítások"
	tolarkifix.addEventListener('click',settings, false);
	tolarkifix.addEventListener('mouseover', function() {this.style.color="#fff";}, false);
	tolarkifix.addEventListener('mouseout', function() {this.style.color="#016";}, false);
	ctrlBox.appendChild(tolarkifix);
		
	var latszik=false;
	var kesz=false;
	
	var ctrlLarkiFix=newChild('DIV',body,'');
	ctrlLarkiFix.className="larkifix"; 
	ctrlLarkiFix.style.display="none"; 	
	addCSS('.larkifix{'+
		   'position: absolute; z-index:4; left: 100px; top: 100px; width: 400px;'+
		   'font: normal 13px "Comic sans MS"; '+
		   'border: 5px solid #e6dac3; background-color: #fff; color:#333;'+
		   'padding: 0 20px 20px;'+
		   '}');
}
function settings(){
	if(latszik){
		tolarkifix.innerHTML="Larki Fix beállítások";
		ctrlLarkiFix.style.display="none";
		latszik=false;
	}else{
		if(!kesz){
			newChild("h3", ctrlLarkiFix, "<u>Larki Fix beállítások:</u>");	
			newCheckbox(ctrlLarkiFix,"hatizsakbamindent"," a házban és a karakterkapon a \"Viselt targyak a hatizsakba!\" gomb  kérdez, miel&#337;tt cselekszik<br>");
			newCheckbox(ctrlLarkiFix,"szinesharc"," harcban a fontosabb adatok különböz&#337; színnel jelennek meg<br>");
			newCheckbox(ctrlLarkiFix,"nincsbizti"," figyelmeztetés, ha nincs biztosítás<br>");	
			newCheckbox(ctrlLarkiFix,"allapotjelzoRontas"," rontások mértékét kijelzi<br>");
			newCheckbox(ctrlLarkiFix,"allapotjelzoMeretezes"," az állapotjelz&#337; bet&#369;mérete kisebb<br>");
			newCheckbox(ctrlLarkiFix,"karikep100x100"," a karakterlapon a karikép nem nyúlik túl a keretén<br>");
			newCheckbox(ctrlLarkiFix,"msggorgeto"," plusz görget&#337;sáv a larkis üzenetekhez, ha szükséges<br>");
			newCheckbox(ctrlLarkiFix,"klanhazgorgeto"," klánházban a fölösleges görget&#337;sávok elt&#369;nnek<br>");
			newCheckbox(ctrlLarkiFix,"gombcimek"," klánházban megjelenik a gombok címe rámutatáskor<br>");
			newChild("div",ctrlLarkiFix,"<br>A módosítások a következ&#337; kattintáskor lépnek érvénybe.<br>&nbsp;");
			var ok=newChild("input",ctrlLarkiFix,"");
			ok.type="button";
			ok.value="OK";		
			ok.addEventListener('click',settings, false);	
			kesz=true;
		}
		tolarkifix.innerHTML="";
		ctrlLarkiFix.style.display="block";
		latszik=true;
	}
}
function newChild(tag, parent, content){
	var child = document.createElement(tag);  
	child.innerHTML = content;  
	parent.appendChild(child);
	return child;
}
function newCheckbox(parent, gmName, content){
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = GM_getValue(gmName)=="ok";
	checkbox.addEventListener('click', function() {GM_setValue(gmName, this.checked?"ok":"no");}, false);
	parent.appendChild(checkbox);
	newChild("SPAN", parent, content);
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