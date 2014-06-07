?// ==UserScript==
// @name          OGame - AO za ogame.ba New 20x sped uni http://xnova.danubis.eu/u1/
// @namespace     http://www.game.danubis.eu
// @description   Advanced Options modifikovano za ogame.ba servere Powered By Karamba
// @date          02.08.2008.
// @include http://uni*.ba.ogame.org*
// @exclude	
// ==/UserScript==

(function(){
	if (document.location.href.indexOf('overview') != -1) {
		/* Montrer les flottes a l'aller */
		GM_addStyle('body center table tr.flight th span a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 11px;}');

		/* Montrer les flottes au retour */
		GM_addStyle('body center table tr.return th span a[title]:after {content:" ("attr(title)")"; color: #FFCC66; font-size: 11px;}');
	}
	
	if (document.location.href.indexOf('phalanx') != -1) {
		/* Montrer les flottes protegees par phalange */
		GM_addStyle('body center table tr th font a[title]:after {content:" ("attr(title)")"; color: #FFA500; font-size: 11px;}');
	}
})();
// 
// 
(function()
{
	if (document.location.href.indexOf('overview') != -1)
	{
		/* Montrer les flottes a l'aller */
		GM_addStyle('body center table tr.flight th span a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 11px;}');
		/* Montrer les flottes au retour */
		GM_addStyle('body center table tr.return th span a[title]:after {content:" ("attr(title)")"; color: #FFCC66; font-size: 11px;}');
	}
	else if (document.location.href.indexOf('phalanx') != -1)
	{
		/* Montrer les flottes protegees par phalange */
		GM_addStyle('body center table tr th font a[title]:after {content:" ("attr(title)")"; color: #FFA500; font-size: 11px;}');
	}
})();

var listaElementos, elementoActual; //nos sirven para recorrer
var espionajeSound = "http://www.ilovewavs.com/Effects/Beeps/HyprBlip.wav";
var ataqueSound    = "http://www.ilovewavs.com/Effects/Beeps/HyprBlip.wav";
var mensajeSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
var confedeSound   = "http://www.ilovewavs.com/Effects/Beeps/HyprBlip.wav";

var sonido=0;

//Ajusta el volumen, si tienen una flota numerosa y reciben muchos mensajes pueden bajarle el vol.
var volMensajes = "50";   // "0"=desactivado "100" =activado completamente
var volEspionaje= "70";
var volAtaque   = "100";
// Funcion de aleatorio...........
var MIN = 800;  // segundos (MINIMO)
var MAX = 1500; // segundos (MAXIMO)

//---------------- EN VISTA GENERAL ---------------------EN VISTA GALAXIA-----------------
//---La mision:-------- Color en RGB --------Tipo de jugador:---------- Color en RGB -----

var esAtacar       = "rgb(255,255,000)";      var normal        = "rgb(255,255,240)";
var eraAtacar      = "rgb(255,102,0)";        var debil         = "rgb(021,189,0)";
var vieneAtaque    = "rgb(255,000,000)";      var fuerte        = "rgb(255,70,70)";
                                             
var esConfed       = "rgb(000,220,159)";      var inactivo      = "rgb(230,235,20)";
var eraConfed      = "rgb(150,150,150)";      var muyInactivo   = "rgb(255,255,000)";
var vieneConfed    = "rgb(200,000,000)";      var vacaciones    = "rgb(0,159,236)";

var esRecolectar   = "rgb(77,255,45)";      var suspendido    = "rgb(000,000,000)";
var eraRecolectar  = "rgb(77,255,78)";

var esTransportar  = "rgb(255,255,255)";
var eraTransportar = "rgb(244,163,62)";
var vieneTransporte= "rgb(120,244,244)";

var esEspionaje    = "rgb(245,160,075)";
var eraEspionaje   = "rgb(190,120,025)";
var vieneEspionaje = "rgb(255,083,083)";

var esDesplegar    = "rgb(009,244,244)";


var esColonizar    = "rgb(255,255,255)";
var eraColonizar   = "rgb(150,150,150)";

var esMantener     = "rgb(000,255,000)";
var eraMantener    = "rgb(150,150,150)";


//  comienza el codigo del script....

function aleatorio()
{
	aleat = Math.random() * (MAX-MIN);
	aleat = Math.round(aleat);
	return parseInt(MIN) + aleat;
} 

function playSound()
{
	body = document.getElementsByTagName("body")[0];
	var emb = document.createElement("embed");
	emb.src = sonido;
	emb.setAttribute("autostart", "true");
	emb.setAttribute("loop", "false");
	emb.setAttribute("hidden", "true");
	emb.setAttribute("volume", volMensajes);
	body.appendChild(emb);
}

function autoReload()
{
	sonido=0;
	var tiempo=aleatorio();
	var timeID = setTimeout("location.href= document.URL", tiempo*1000);
	var publi = document.getElementsByTagName ('th');
	
	for (var i = publi.length - 1; i >= 0; i--)
	{
		htmldentro = publi[i].innerHTML;
		if (htmldentro.indexOf('?page=messages') != -1)
			sonido=mensajeSound;
	}

	listaElementos = document.getElementsByTagName('span');
    for (var i = 0; i < listaElementos.length; i++)
	{
		elementoActual = listaElementos[i];

		if (elementoActual.className.substring(0,20)=='flight ownfederation')//La mision es: Confederacion
			elementoActual.style.color = esConfed;
		else if (elementoActual.className.substring(0,20)=='return ownfederation')//La mision era: Confederacion
            elementoActual.style.color = eraConfed;
		else if (elementoActual.className.substring(0,17)=='flight federation')//viene ataque de Confederacion
        {
			elementoActual.style.color = vieneConfed;
            if (sonido!=espionajeSound)
				sonido=confedeSound;
		}
        else if (elementoActual.className.substring(0,16)=='flight ownattack')//La mision es: Atacar
			elementoActual.style.color = esAtacar;
        else if (elementoActual.className.substring(0,16)=='return ownattack')//La mision era:Atacar
			elementoActual.style.color = eraAtacar;
        else if (elementoActual.className.substring(0,13)=='flight attack')//Una flota enemiga te va a atacar
		{
			if (sonido!=espionajeSound)
				sonido=ataqueSound;
            elementoActual.style.color = vieneAtaque;
		}
        else if (elementoActual.className.substring(0,17)=='flight ownharvest')//La mision es: Recolectar
			elementoActual.style.color = esRecolectar;
        else if (elementoActual.className.substring(0,17)=='return ownharvest')//La mision era:Recolectar 
			elementoActual.style.color = eraRecolectar;
        else if (elementoActual.className.substring(0,19)=='flight owntransport')//La mision es: Transportar
			elementoActual.style.color = esTransportar;
        else if (elementoActual.className.substring(0,19)=='return owntransport')//La mision era:Transportar
			elementoActual.style.color = eraTransportar;
        else if (elementoActual.className.substring(0,16)=='flight transport')//una flota pacifica transporta
			elementoActual.style.color = vieneTransporte;
        else if (elementoActual.className.substring(0,19)=='flight ownespionage')//La mision es: Espionaje
			elementoActual.style.color = esEspionaje;
        else if (elementoActual.className.substring(0,19)=='return ownespionage')//La mision era:Espionaje
			elementoActual.style.color = eraEspionaje;
        else if (elementoActual.className.substring(0,16)=='flight espionage')//Flota enemiga te Espia
		{
			sonido=espionajeSound;
			elementoActual.style.color = vieneEspionaje;
        }
        else if (elementoActual.className.substring(0,16)=='flight owndeploy')//La mision es: Desplegar
			elementoActual.style.color = esDesplegar;
        else if (elementoActual.className.substring(0,16)=='return owndeploy')//La mision era:Desplegar
			elementoActual.style.color = eraDesplegar;
        else if (elementoActual.className.substring(0,16)=='flight owncolony')//La mision es: Colonizar
			elementoActual.style.color = esColonizar;
        else if (elementoActual.className.substring(0,16)=='return owncolony')//La mision era:Colonizar
			elementoActual.style.color = eraColonizar;
        else if (elementoActual.className.substring(0,15)=='holding ownhold')//La flota esta en orbita
			elementoActual.style.color = esMantener;
        else if (elementoActual.className.substring(0,14)=='flight ownhold')//La mision es: Mantener posision
			elementoActual.style.color = esMantener;
        else if (elementoActual.className.substring(0,14)=='return ownhold')//La mision era:Mantener posicion
			elementoActual.style.color = eraMantener;
    } //fin del ciclo

	if (sonido!=0)
		playSound();
}// fin de la funcion

///// Esta parte es para la galaxia
if (document.baseURI.indexOf("index.php?page=galaxy") != -1)
{ //Si esta abierta la parte de galaxia...
	listaElementos = document.getElementsByTagName('span');

    for (var i = 0; i < listaElementos.length; i++)
	{
		elementoActual = listaElementos[i];
        if (elementoActual.className.substring(0,6)=='normal')
        	elementoActual.style.color = normal;
        else if (elementoActual.className.substring(0,8)=='inactive')
        	elementoActual.style.color = inactivo;
        else if (elementoActual.className.substring(0,12)=='longinactive')
        	elementoActual.style.color = muyInactivo;
        else if (elementoActual.className.substring(0,6)=='strong')
        	elementoActual.style.color = fuerte;
        else if (elementoActual.className.substring(0,4)=='noob')
        	elementoActual.style.color = debil;
        else if (elementoActual.className.substring(0,8)=='vacation')
        	elementoActual.style.color = vacaciones;
        else if (elementoActual.className.substring(0,6)=='banned')
        	elementoActual.style.color = suspendido;
    }
}
else  //En caso contrario solo recargamos la pagina de vision General
	autoReload();

// ==/UserScript==

var sid = location.search.split('&')[1].split('=')[1];
// Begin of Configuration
var menu = false;
var external_links = false;
var internal_links = false;
var external_links = new Array(
	{name:'Drago-Sim', url:'http://drago-sim.com/index.php?lang=bosnian&style=gw&template=Standard', color:'#FFFF00'},
	{name:'Speed Sim', url:'http://websim.speedsim.net/index.php', color:'#FFFF00'},
	{name:'Takana-Konvertor', url:'http://www.takanacity.com/main.php?tag=crconverter', color:'#FFFF00'}
	);
var internal_links = new Array(
	{name:'Kruzna Poruka', url:'index.php?page=allianzen&session='+sid+'&a=17', color:'#FF4500'},
	{name:'Clanovi Saveza', url:'index.php?page=allianzen&session='+sid+'&a=4&sort1=3&sort2=0', color:'#FF4500'},
	{name:'Uredi Savez', url:'index.php?page=allianzen&session='+sid+'&a=5', color:'#FF1CAE'},
	{name:'Uredi Clanove', url:'index.php?page=allianzen&session='+sid+'&a=7&sort1=5&sort2=1', color:'#FF1CAE'},
	{name:'Odskocna Vrata', url:'index.php?page=infos&session='+sid+'&gid=43', color:'lime'}
	);

// End of Configuration

if (menu && location.search.indexOf('gid=43', 0) >= 0)
{
	var tables = document.getElementById('content').getElementsByTagName('table');
	if (tables.length > 4)
	{
		var regexp = /(\([0-9]+)/;
		var trs = tables[3].getElementsByTagName('tr');
		for (var i = 1; i < (trs.length - 1); i++)
		{
			var ths = trs[i].getElementsByTagName('th');
			ths[1].innerHTML += '<input id="buttonMax'+i+'" type="button" value="max" onclick="this.previousSibling.value='+ths[0].innerHTML.match(regexp)[0].substr(1)+'">';
		}
		trs[i].getElementsByTagName('th')[0].innerHTML += '&nbsp;<input type="button" value="All" onclick="for (var i = 1; i < '+(trs.length - 1)+'; i++)document.getElementById(\'buttonMax\'+i).click();">&nbsp;<input type="reset">';
	}
}
var elems = [''];
var td = document.getElementById('menu').getElementsByTagName('td');
for (var i = 0; i < td.length; i++)
	for (var elem in elems)
		if (td[i].innerHTML.indexOf(elems[elem], 0) >= 0)
		{
			if (elems[elem] == 'tutorial.')
				td[i].innerHTML = '<div style="text-align:left;"><a href="index.php?page=infos&session='+sid+'&gid=43">'+jump_gate_text+'</a></div>';
			else if (external_links && elems[elem] == 'ogame.com.hr','impressum.')
				var last_item = td[i].parentNode;
			else
				td[i].parentNode.removeChild(td[i]);
		}
if (external_links || internal_links)
{
	if (external_links)
		for (var key in external_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div style="text-align:center;"><a target="_blank" href="'+external_links[key].url+'" style="color:'+external_links[key].color+';">'+external_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
	if (internal_links)
		for (var key in internal_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');

			td.innerHTML = '<div style="text-align:center;"><a href="'+internal_links[key].url+'" style="color:'+internal_links[key].color+';">'+internal_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
	last_item.parentNode.removeChild(last_item);
};
var elems = new Array();
var elems = ['page=trader','page=commander', 'page=offiziere', 'page=micropayment', 'board.', 'tutorial.', 'regeln.', 'impressum.'];
if (obj) obj.parentNode.removeChild(obj);
var obj = document.getElementById('combox_container');
if (obj) obj.parentNode.removeChild(obj);
var td = document.getElementById('menu').getElementsByTagName('td');
for (var i = 0; i < td.length; i++)
	for (var elem in elems)
		if (td[i].innerHTML.indexOf(elems[elem], 0) >= 0)
		{
			if (elems[elem] == '');
			else if (external_links && elems[elem] == 'impressum.')
				var last_item = td[i].parentNode;
			else
				td[i].parentNode.removeChild(td[i]);
		};


function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function del(query){
	var elem = xpath(query);
	if(elem.snapshotLength > 0){
		try{
		  elem.snapshotItem(0).setAttribute('style', 'display: none;');
		}catch(err){
		  elem.snapshotItem(0).parentNode.removeChild(elem.snapshotItem(0));
		}
	}
}

function delall(query){
	var allelem = xpath(query);
	if(allelem.snapshotLength > 0){
		for (var i = 0; i < allelem.snapshotLength; i++ ) {
			var elem = allelem.snapshotItem(i);
			try{
			  elem.setAttribute('style', 'display: none;');
			}catch(err){
			  elem.parentNode.removeChild(elem);
			}
		}
	}
}

function togglecheck(str){
	if(str == "1"){
		return "checked=\"checked\"";
	} else if(str == "0"){
		return "";
	} 
}

/*convertToEntities()
This is to convert special characters to Unicode numbers
*/

function convertToEntities(strSP) {
  var strUNI = '';
  for(i=0; i<strSP.length; i++)
  {
    if(strSP.charCodeAt(i)>127)
    {
      strUNI += '&#' + strSP.charCodeAt(i) + ';';
    }
    else
    {
      strUNI += strSP.charAt(i);
    }
  }
  return (strUNI);
}

function mystr2num(str){
	var temp = str+"";
	var allnums = temp.split(".");
	var mystr = "";

	for(var i=0; i<allnums.length; i++){
		mystr = mystr +allnums[i];
	}

	return parseInt(mystr);
}

function addDots(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function reder(str){
	if(/font/.test(str) == true){
		var clean = />([0-9\.]+)</.exec(str);
		if(clean != null){ clean = RegExp.$1; return clean;} else {return "0";}	
	} else {
	return str;
	}
}

function resizer(w,h,c){
	if(Math.max(w,h) == c){ 
		return 52;
	} else {
		return (Math.round((Math.min(w,h)/Math.max(w,h))*52));
	}
}

function calcmaxnum(m,c,d,nm,nc,nd){ 
	var valor = Math.min(Math.floor(m/nm),Math.floor(c/nc),Math.floor(d/nd));
	return valor;
} 

function calctime(m,c,d,nm,nc,nd,mf,cf,df){
	var mmax = Math.floor(((nm - m)*3600)/mf);
	if(mmax>0){mmax=mmax;} else {mmax=0;}
	var cmax = Math.floor(((nc - c)*3600)/cf);
	if(cmax>0){cmax=cmax;} else {cmax=0;}
	var dmax = Math.floor(((nd - d)*3600)/df);
	if(dmax>0){dmax=dmax;} else {dmax=0;}
	return Math.max(mmax,cmax,dmax);
}

function hidemenu(){
    var exi = true;
    switch(this.height){
        case 40:
            var alltopleftmenu = xpath("//img[@height='19']/parent::td/parent::tr/preceding::tr/td/div/../..");
        break;
        case 19:
            var alltopleftmenu = xpath("//img[@height='19']/parent::td/parent::tr/following::tr[count(td/parent::tr/following-sibling::tr/td/img)>0]");
        break;
        case 35:
            var alltopleftmenu = xpath("//img[@height='35']/parent::td/parent::tr/following::tr/td/div/../..");
        break;
        default:
            var exi = false;
    }
    if(exi){
        for (var i = 0; i < alltopleftmenu.snapshotLength; i++ ) {
            if(alltopleftmenu.snapshotItem(i).style.display != "none"){alltopleftmenu.snapshotItem(i).style.display = "none";
            }else{alltopleftmenu.snapshotItem(i).style.display = "";}
        }
    }
}

function saver(){
	var server = document.getElementById('hiddenserver').value;
	GM_setValue((server+"colorm"), (document.getElementById('metalcolor').value));
	GM_setValue((server+"colorc"), (document.getElementById('crystalcolor').value));
	GM_setValue((server+"colord"), (document.getElementById('deuteriumcolor').value));
	GM_setValue((server+"colore"), (document.getElementById('energycolor').value));
	
  GM_setValue((server+"missioncolors"), (document.getElementById('missioncolors').value));
	GM_setValue((server+"colorat"), (document.getElementById('attackcolor').value));
	GM_setValue((server+"colores"), (document.getElementById('spycolor').value));
	GM_setValue((server+"colorha"), (document.getElementById('harvestcolor').value));
	GM_setValue((server+"colorotr"), (document.getElementById('owntransportcolor').value));
	GM_setValue((server+"colortr"), (document.getElementById('transportcolor').value));
	
	GM_setValue((server+"standardads"), (document.getElementById('standard').value));
	//GM_setValue((server+"cilink"), (document.getElementById('CIlink').value));
	GM_setValue((server+"darkmatter"), (document.getElementById('darkmatter').value));
	GM_setValue((server+"oclink"), (document.getElementById('OClink').value));
	GM_setValue((server+"topicons"), (document.getElementById('TOPicons').value));
	
	GM_setValue((server+"harvest"), (document.getElementById('recycler').value));
	GM_setValue((server+"moonspy"), (document.getElementById('moonspy').value));
	GM_setValue((server+"relvl"), (document.getElementById('relvl').value));
	GM_setValue((server+"maxships"), (document.getElementById('maxships').value));
	GM_setValue((server+"readytime"), (document.getElementById('readytime').value));
	GM_setValue((server+"calcships"), (document.getElementById('calcships').value));
	GM_setValue((server+"collapsedesc"), (document.getElementById('collapsedesc').value));
	GM_setValue((server+"localtime"), (document.getElementById('localtime').value));
	GM_setValue((server+"advstor"), (document.getElementById('advstor').value));
	GM_setValue((server+"advmess"), (document.getElementById('advmess').value));
	GM_setValue((server+"lemenu"), (document.getElementById('lemenu').value));
	
	if(notdetected){GM_setValue((server+"langloca"), (document.getElementById('selectlocation').selectedIndex)); GM_setValue((server+"langstr"), (document.getElementById('selectlocation').options[document.getElementById('selectlocation').selectedIndex].value));}
	//window.parent.frames[0].location.href = window.parent.frames[0].location.href;
	window.location.href = window.location.href;
	
}

function checker(vartitle, vardefault){
	var temp = GM_getValue(vartitle);
	if (temp == undefined){ 
		return vardefault;
	} else {
		return temp;
	}
}

function barcolor(col){
	if(col == 100){
		return "rgb(255, 0, 0);";
	} else {
		return "rgb("+Math.floor(2.55*col)+", "+Math.floor((1.27*(100-col))+128)+", 0);";
	}
}

function HSBtoRGB(hu, sa, br) {
  var r = 0;
  var g = 0;
  var b = 0;

  if (sa == 0) {
    r = parseInt(br * 255.0 + 0.5);
	  g = r;
    b = r;
	}
	else {
      var h = (hu - Math.floor(hu)) * 6.0;
      var f = h - Math.floor(h);
      var p = br * (1.0 - sa);
      var q = br * (1.0 - sa * f);
      var t = br * (1.0 - (sa * (1.0 - f)));

      switch (parseInt(h)) {
         case 0:
            r   = (br * 255.0 + 0.5);
            g = (t * 255.0 + 0.5);
            b  = (p * 255.0 + 0.5);
            break;
         case 1:
            r   = (q * 255.0 + 0.5);
            g = (br * 255.0 + 0.5);
            b  = (p * 255.0 + 0.5);
            break;
         case 2:
            r   = (p * 255.0 + 0.5);
            g = (br * 255.0 + 0.5);
            b  = (t * 255.0 + 0.5);
            break;
         case 3:
            r   = (p * 255.0 + 0.5);
            g = (q * 255.0 + 0.5);
            b  = (br * 255.0 + 0.5);
            break;
         case 4:
            r   = (t * 255.0 + 0.5);
            g = (p * 255.0 + 0.5);
            b  = (br * 255.0 + 0.5);
            break;
          case 5:
            r   = (br * 255.0 + 0.5);
            g = (p * 255.0 + 0.5);
            b  = (q * 255.0 + 0.5);
            break;
	    }
	}
  var arrRGB = new Array(parseInt(r), parseInt(g), parseInt(b));
  return arrRGB;
}

//function RGBtoHSB(r, g, b) {
function RGBtoHSB(r, g, b) {
  var hu;
  var sa;
  var br;

   var cmax = (r > g) ? r : g;
   if (b > cmax) cmax = b;

   var cmin = (r < g) ? r : g;
   if (b < cmin) cmin = b;

   br = cmax / 255.0;
   if (cmax != 0) sa = (cmax - cmin)/cmax;
   else sa = 0;

   if (sa == 0) hu = 0;
   else {
      var redc   = (cmax - r)/(cmax - cmin);
    	var greenc = (cmax - g)/(cmax - cmin);
    	var bluec  = (cmax - b)/(cmax - cmin);

    	if (r == cmax) hu = bluec - greenc;
    	else if (g == cmax) hu = 2.0 + redc - bluec;
      else hu = 4.0 + greenc - redc;

    	hu = hu / 6.0;
    	if (hu < 0) hu = hu + 1.0;
   }
   
   var arrHSB = new Array(hu, sa, br);
   return arrHSB;   
}

function darken(hexCode) {
  if (hexCode.indexOf('#') == 0) hexCode = hexCode.substring(1);
 
  var RGBHSB = new Array(); //4. 
  RGBHSB[0] = parseInt(hexCode.substring(0,2), 16);
  RGBHSB[1] = parseInt(hexCode.substring(2,4), 16);
  RGBHSB[2] = parseInt(hexCode.substring(4,6), 16);
  RGBHSB[3] = 0;
  RGBHSB[4] = 0;
  RGBHSB[5] = 0;
  
  var red   = parseInt(hexCode.substring(0,2), 16);
  var green = parseInt(hexCode.substring(2,4), 16);
  var blue  = parseInt(hexCode.substring(4,6), 16);
  
  var arrCol = RGBtoHSB(red, green, blue);
  arrCol = HSBtoRGB(arrCol[0], arrCol[1], Math.max(arrCol[2] - 0.19, 0));  
  return "rgb(" + arrCol[0] + "," + arrCol[1] + "," + arrCol[2] + ")";
}

var C_nn= new Array();

  C_nn[0] = new Array(); C_nn[0][0] ='Mali trans';C_nn[0][1] ="Veliki trans"; //ogame.ba
 

// adaptaciA3n de idiomas
var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var O_months=new Array();

  O_months[0] =new Array();O_months[0] [0]='Sijecanj';O_months[0] [1]='Veljaca';O_months[0] [2]='Ozujak';O_months[0] [3]='Travanj';O_months[0] [4]='Svibanj';O_months[0] [5]='Lipanj';O_months[0] [6]='Srpanj';O_months[0] [7]='Kolovoz';O_months[0] [8]='Rujan';O_months[0] [9]='Listopad';O_months[0] [10]='Studeni';O_months[0] [11]='Prosinac';//ogame.ba



var O_days=new Array();

  O_days[0] =new Array();O_days[0] [0]='Nedjelja,';O_days[0] [1]='Ponedjeljak,';O_days[0] [2]='Utorak,';O_days[0] [3]='Srijeda,';O_days[0] [4]='Cetvrtak,';O_days[0] [5]='Petak,';O_days[0] [6]='Subota,';//ogame.ba


//Funcion para buscar dentro de un array un valor y devolver su posicion.
function findPos(array, id) {
   for(var i = 0; i < array.length; i++) if(array[i] == id) return i;
   return -1;
}

//Funcion para verificar si un anio es bisiesto o no.
function anoBisiesto(ano) {
   return (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0)) ? 1 : 0;
}

//Funcion para calcular la cantidad de dias que tiene el mes.
function DiasMes(mes, ano) {
   if(mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7|| mes == 9 || mes == 11)
      return 31;
   if(mes == 3 || mes == 5 || mes == 8 || mes == 10)
      return 30;
   if(mes == 1 && anoBisiesto(ano) == 0)
      return 28;
   else
      return 29;
}

function clock() {
   nodeLocal = document.getElementById("ClockLocal");
   nodeServer = document.getElementById("ClockServer");
   var date = new Date();
   var ano = date.getFullYear();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();
   var fecha = nodeServer.innerHTML.match(/(\S+) (\d+) - (\S+) - (\d{2}):(\d{2}):(\d{2})/);
   nodeLocal.innerHTML = convertToEntities(O_days[langloca][dia]) + ' ' + diaNum + ' - ' + convertToEntities(O_months[langloca][mes]) + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   dia = findPos(O_days[langloca], convertToEntities(fecha[1]));
   diaNum = fecha[2] * 1;
   mes = findPos(O_months[langloca], convertToEntities(fecha[3]));
   hora = fecha[4] * 1;
   mins = fecha[5] * 1;
   segs = fecha[6] * 1;
   if(++segs > 59) {
      segs = 0;
      if(++mins > 59) {
         mins = 0;
         if(++hora == 23) {
            hora = 0;
            if(++dia > 6) dia = 0;
            diaNum++;
            if(diaNum > DiasMes(mes, ano)) {
               diaNum = 1;
               if(++mes > 11) mes = 0;
            }
         }
      }
   }
   nodeServer.innerHTML = convertToEntities(O_days[langloca][dia]) + ' ' + diaNum + ' - ' + convertToEntities(O_months[langloca][mes]) + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   //Actualizaremos dentro de un 1 segundo si no cambió la pagina.
   if(/page=overview/.test(ogtitle) == true) setTimeout(clock, 1000);
}


const DEBUG = false;

var notdetected = false;

var ogtitle = window.location.href;
var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }

var langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);
if(langstr != null){ langstr = RegExp.$1; } else { langstr = checker((ogserver+"langstr"),"not"); notdetected = true; }
	
var X_mlg,X_clg,X_dlg,X_elg,X_lvl,langloca;

switch(langstr){

	case "org":
		langloca = "0"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Kristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterij: )<b>([\.0-9]+)/; X_elg = /(Energija: )<b>([\.0-9]+)/; X_lvl = /\(Level (\d+)/;
	break;

	default:
		langloca = checker((ogserver+"langloca"),"0");
		notdetected = true;
		X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
}
					
if(DEBUG){GM_log(ogtitle+" "+ogserver+" "+langloca);}
					
var color_m = checker((ogserver+"colorm"),"#F1531E");
var color_c = checker((ogserver+"colorc"),"#54B0DC");
var color_d = checker((ogserver+"colord"),"#9AACCB");
var color_e = checker((ogserver+"colore"),"#F2D99D");

var mission_colors = checker((ogserver+"missioncolors"),"1");
var color_attack = checker((ogserver+"colorat"),"#00ff00");
var color_spy = checker((ogserver+"colores"),"#ffa500");
var color_otransport = checker((ogserver+"colorotr"),"#52a2dc");
var color_transport = checker((ogserver+"colortr"),"#a401ff");
var color_harvest = checker((ogserver+"colorha"),"#20d0bc");

var standardads = checker((ogserver+"standardads"),"1");
//var cilink = checker((ogserver+"cilink"),"0");
var darkmatter = checker((ogserver+"darkmatter"),"0");
var oclink = checker((ogserver+"oclink"),"0");
var topicons = checker((ogserver+"topicons"),"0");

var relvl = checker((ogserver+"relvl"),"1");
var harvest = checker((ogserver+"harvest"),"1");
var moonspy = checker((ogserver+"moonspy"),"1");
var readytime = checker((ogserver+"readytime"),"1");
var maxships = checker((ogserver+"maxships"),"1");
var calcships = checker((ogserver+"calcships"),"1");
var collapsedesc = checker((ogserver+"collapsedesc"),"0");
var localtime = checker((ogserver+"localtime"),"1");
var advstor = checker((ogserver+"advstor"),"1");
var advmess = checker((ogserver+"advmess"),"0");
var lemenu = checker((ogserver+"lemenu"),"1");

var res = xpath("//font[@color='#ffffff']/parent::b/parent::i/b/font");
if(res.snapshotLength > 0){
	res.snapshotItem(0).color = (color_m);
	res.snapshotItem(1).color = (color_c);
	res.snapshotItem(2).color = (color_d);
	res.snapshotItem(4).color = (color_e);
}
//if((/game\/options\.php/.test(ogtitle) == true) || (/mode.Forschung/.test(ogtitle) == true) || (/game.resources.php/.test(ogtitle) == true) || (/buildings.php.+mode.Flotte/.test(ogtitle) == true) || (/buildings.php.+mode.Verteidigung/.test(ogtitle) == true) || (/game.b_building.php/.test(ogtitle) == true) || (/\/game\/flotten..php/.test(ogtitle) == true)){
//alert(/page=buildings.*mode=Flotte/.test(ogtitle));
if((/page=options/.test(ogtitle) == true) || (/mode=Forschung/.test(ogtitle) == true) || (/page=resources/.test(ogtitle) == true) || (/page=buildings.*mode=Flotte/.test(ogtitle) == true) || (/page=buildings.*mode=Verteidigung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true) || (/page=flotten./.test(ogtitle) == true)){
	var planetname = xpath("//select[@size='1']/option[@selected]");
	if(planetname.snapshotLength > 0){
		var planetcoords = planetname.snapshotItem(0).innerHTML;
			planetcoords = /\[\d+:\d+:\d+\]/.exec(planetcoords);
	}
	
	var L_res= new Array(); //1.
		L_res[0] = "Ukupan broj istrazivanja"; //ogame.ba

		
	var L_ret= new Array(); //16.

		L_ret[0] = "Preostalo vrijeme do mogucnosti izgradnje"; //ogame.ba

		
	var T_cs = new Array(); //26.

		T_cs[0] = "Kalkulator transportera"; //ogame.ba

		
	var T_pc = new Array(); //28.

		T_pc[0] = "Izracun proizvodnje"; //ogame.ba

}

//if((/buildings.php.+mode.Flotte/.test(ogtitle) == true) || (/buildings.php.+mode.Verteidigung/.test(ogtitle) == true) || (/mode.Forschung/.test(ogtitle) == true) || (/game.b_building.php/.test(ogtitle) == true)){
if((/mode=Flotte/.test(ogtitle) == true) || (/mode=Verteidigung/.test(ogtitle) == true) || (/mode=Forschung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true)){
	if((readytime == "1") || (maxships == "1") || (relvl == "1") || (color_m.length > 0) || (color_c.length > 0) || (color_d.length > 0) || (color_e.length > 0)){

		//var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@width,'100%')]/tbody/tr[3]/td[position()<5 and position()>1]");
		var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@id,'resources')]/tbody/tr[3]/td[position()<4 and position()>0]");
		if(allcurres.snapshotLength > 0){
			var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
			var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
			var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
		}
		var shipstd = xpath("//td[@class='k']");
		var F_scriptinjection = document.createElement('script');
			F_scriptinjection.type = 'text/javascript';
			
		var J_mon= new Array(); //20.

    	J_mon[0] = 'var mymonth = new Array(); mymonth[0]="Sij"; mymonth[1]="Velj"; mymonth[2]="Ozu"; mymonth[3]="Tra"; mymonth[4]="Svi"; mymonth[5]="Lip"; mymonth[6]="Srp"; mymonth[7]="Kol"; mymonth[8]="Ruj"; mymonth[9]="Lis"; mymonth[10]="Stu"; mymonth[11]="Pro";'; //ogame.ba

		
		var J_rel= new Array(); //21.

			J_rel[0] = "Spremno, ponovo pokretanje stranice..."; //ogame.ba

			
		var F_head = document.getElementsByTagName('head')[0];
		var F_script = document.createElement('script');
			F_script.type = 'text/javascript';
			F_script.innerHTML = 'function changeval(name,valor){'+
							'document.getElementsByName(name)[0].value=valor} '+
							'function moreships(name){'+
							'var valor=parseInt(document.getElementsByName(name)[0].value); '+
							'document.getElementsByName(name)[0].value=(valor+1); } '+
							'function lessships(name){'+
							'var valor=parseInt(document.getElementsByName(name)[0].value); '+
							'if(valor > 0){document.getElementsByName(name)[0].value=(valor-1); }} '+
							'function hourexec(hid,hdata){'+
							'hdata = hdata - 1; '+
							'var hhor = Math.floor(hdata/3600); '+
							'var hmin = Math.floor((hdata-(hhor*3600))/60); '+
							'var hsec = hdata-(hhor*3600)-(hmin*60); '+
							'var whentime = new Date(); '+
							J_mon[langloca]+
							'whentime.setSeconds(whentime.getSeconds()+hdata); '+
							'document.getElementById(hid).innerHTML = "'+L_ret[langloca]+': "+hhor+"h "+hmin+"m "+hsec+"s  &nbsp;|&nbsp; "+whentime.getDate()+"&nbsp;"+mymonth[whentime.getMonth()]+"&nbsp;-&nbsp;"+whentime.getHours()+":"+whentime.getMinutes()+":"+whentime.getSeconds(); '+
							'if(hdata == 0){document.getElementById(hid).innerHTML = "'+J_rel[langloca]+'"; window.setTimeout("window.location.reload();",2000);} '+
							'if(hdata > 0){ window.setTimeout(("hourexec(\'"+hid+"\',"+hdata+");"), 999); } '+
							'}';
			F_head.appendChild(F_script);

		var alltds = xpath("//td[@class='l']/br/parent::td");
		var rsval = 0;
		//alert(alltds.snapshotLength);
		for (var i = 0; i < alltds.snapshotLength; i++ ) {
			var thistd = alltds.snapshotItem(i).innerHTML;	
			
			if((relvl == "1") && (/page=buildings.*mode=Forschung/.test(ogtitle))){
				if  (X_lvl.test(thistd) == true){
					var thislvl = X_lvl.exec(thistd);
						thislvl = RegExp.$1;
						rsval += parseInt(thislvl);
				}
			}
			
			var thismet = X_mlg.exec(thistd);
			if(thismet!= null){ thismet = mystr2num(RegExp.$2); } else {thismet = 0;}
			var thiscry = X_clg.exec(thistd);
			if(thiscry!= null){ thiscry = mystr2num(RegExp.$2); } else {thiscry = 0;}
			var thisdeu = X_dlg.exec(thistd);
			if(thisdeu!= null){ thisdeu = mystr2num(RegExp.$2); } else {thisdeu = 0;}
			
			if((maxships == "1") && ((/page=buildings.*mode=Flotte/.test(ogtitle) == true) || (/page=buildings.*mode=Verteidigung/.test(ogtitle) == true))){
				//var notpos = xpath("//form/preceding-sibling::br/preceding-sibling::font[@color='#ff0000']/preceding-sibling::br/following-sibling::font[@color='#ff0000']");
				/*var notpos = xpath("//preceding-sibling::br/preceding-sibling");//::font[@color='#ff0000']/preceding-sibling::br/following-sibling::font[@color='#ff0000']");
				if (i == 0) {
				  alert(i + '-' + notpos.snapshotLength);
				  for (var k = 1; k < notpos.snapshotLength; k++)
				    alert(notpos.snapshotItem(k).innerHTML);
				}
				if(notpos.snapshotLength > 0){var cando = false;} else {var cando = true;}
				*/
				var cando = true;
				var maxval = calcmaxnum(curmet,curcry,curdeu,thismet,thiscry,thisdeu);
				if((maxval > 0) && (/font\>/.test(shipstd.snapshotItem(i).innerHTML) == false) && cando){
					var thisshipstd = shipstd.snapshotItem(i);
					
					var thisimgid = /fmenge.(\d+)/.exec(thisshipstd.innerHTML);
						thisimgid = RegExp.$1;
						
					if((thisimgid == "407") || (thisimgid == "408")){ maxval = 1;}
				
					var maxtable = document.createElement('table');
						maxtable.width = "100%";
						maxtable.innerHTML = "<tr><td style='text-align:center;'><a href='javascript:changeval(\"fmenge["+thisimgid+"]\","+maxval+");'>max:&nbsp;"+maxval+"</a><br><a href='javascript:lessships(\"fmenge["+thisimgid+"]\");'>&laquo;</a>&nbsp;&nbsp;<a href='javascript:changeval(\"fmenge["+thisimgid+"]\",0);'>&reg;</a>&nbsp;&nbsp;<a href='javascript:moreships(\"fmenge["+thisimgid+"]\");'>&raquo;</a></td></tr>";
					thisshipstd.appendChild(maxtable);
				}
			}
			
			if(readytime == "1"){
				var R_np= new Array(); //22.

					R_np[0] = "Ne proizvode se svi potrebni resursi!"; //ogame.ba

					
				var metfact = parseInt(checker((ogserver+planetcoords+"met"),"0"));
				var cryfact = parseInt(checker((ogserver+planetcoords+"cry"),"0"));
				var deufact = parseInt(checker((ogserver+planetcoords+"deu"),"0"));
				if(DEBUG){GM_log(metfact+" "+cryfact+" "+deufact);}
				var timeval = calctime(curmet,curcry,curdeu,thismet,thiscry,thisdeu,metfact,cryfact,deufact);
				if((timeval > 0) && (timeval != Infinity)){
					thistd = thistd + "<div id='hor"+i+"'></div>";
					F_scriptinjection.innerHTML += "hourexec('hor"+i+"',"+timeval+"); ";
				}
				if(timeval == Infinity){
					thistd = thistd + "<div>"+R_np[langloca]+"</div>";
				}
			}	
			
			thistd = thistd.replace(X_mlg, ("$1<b style='color:"+color_m+";'>$2"));
			if (thismet > curmet) thistd += RegExp.$1 + "<b style='color:"+color_m+";'>" + addDots(thismet - curmet) + "</b>&nbsp;";
			thistd = thistd.replace(X_clg, ("$1<b style='color:"+color_c+";'>$2"));
			if (thiscry > curcry) thistd += RegExp.$1 + "<b style='color:"+color_c+";'>" + addDots(thiscry - curcry) + "</b>&nbsp;";
			thistd = thistd.replace(X_dlg, ("$1<b style='color:"+color_d+";'>$2"));
			if (thisdeu > curdeu) thistd += RegExp.$1 + "<b style='color:"+color_d+";'>" + addDots(thisdeu - curdeu) + "</b>&nbsp;";
			thistd = thistd.replace(X_elg, ("$1<b style='color:"+color_e+";'>$2"));  
			
			var allres = Math.max(thismet - curmet, 0) + Math.max(thiscry - curcry, 0) + Math.max(thisdeu - curdeu, 0);
			if (allres != 0) {
			  thistd += "<br>" + 
			    C_nn[langloca][1] + ": <b>" + Math.ceil(allres / 25000) + "</b>&nbsp;&nbsp;" + 
          C_nn[langloca][0] + ": <b>" + Math.ceil(allres / 5000) + "</b>";
      }
			
			alltds.snapshotItem(i).innerHTML = thistd;
		}
		if((relvl == "1") && (/page=buildings.*mode=Forschung/.test(ogtitle))){
			var rstable = xpath("//table[contains(@align,'top')]//table").snapshotItem(0);
			var rsoutput = document.createElement('table');
				rsoutput.width = '530px';
				rsoutput.innerHTML = "<tr><td class='c'>"+L_res[langloca]+": "+rsval+"</td></tr>";
				rstable.parentNode.insertBefore(rsoutput, rstable);
		}		
		if(collapsedesc == "1"){
			delall("//td[@class='l']/br[1]/following-sibling::text()[1]");
			delall("//td[@class='l']/br[2]");
			var allimgs = xpath("//td[@class='l']/a/img");
			for (var j = 0; j < allimgs.snapshotLength; j++ ) {
				var imgw = allimgs.snapshotItem(j).width;
				var imgh = allimgs.snapshotItem(j).height;
				var imgsw = allimgs.snapshotItem(j).style.width;
				var imgsh = allimgs.snapshotItem(j).style.height;
				allimgs.snapshotItem(j).width = resizer(imgw,imgh,imgw);
				allimgs.snapshotItem(j).height = resizer(imgw,imgh,imgh);
				allimgs.snapshotItem(j).style.width = resizer(imgsw,imgsh,imgsw);
				allimgs.snapshotItem(j).style.height = resizer(imgsw,imgsh,imgsh);
			}
		}
		if(readytime == "1"){
			var F_body = document.getElementsByTagName('body')[0];
				F_body.appendChild(F_scriptinjection);
		}
	}
}

if(/page=flotten1/.test(ogtitle) == true){
if(calcships == "1"){
		
	var cargname = new Array();

		cargname[0] = "Kapacitet tereta"; //ogame.ba

		
	var fuelname = new Array(); //32.

		fuelname[0] = "Trosak deuterija"; //ogame.ba

		
	var speedname = new Array(); //33.

		speedname[6] = "Brzina"; //ogame.ba

		
	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function addship(id,val){'+
							'if((parseInt(document.getElementsByName(id)[0].value)>0) || (val>=0)){document.getElementsByName(id)[0].value = parseInt(document.getElementsByName(id)[0].value)+parseInt(val); } calccap();} '+
							'function changeship(id,val){'+
							'document.getElementsByName(id)[0].value = val; calccap();} '+
							'function getStorageFaktor(){ return 1}'+
							'function checkmval(ress,carg){ '+
							'var tempval = (Math.ceil(ress/carg));'+
							'if(tempval < 0){return 0;} else {return tempval;}'+
							'}'+
							'function doter(str){'+
							'var tempval = (""+str).split(""); '+
							'var tempval2 = ""; '+
							'for(var i=0;i<tempval.length;i++){ '+
							'if(((tempval.length-(i+1))%3 == 0) && ((i+1)!=tempval.length)){tempval2 = tempval2+tempval[i]+"."; '+
							'} else { tempval2 = tempval2+tempval[i]; } } return tempval2; } '+
							'function calccap(){'+
							'var capa = storage();'+
							'var fuel = consumption();'+
							'var curmet = parseInt(document.getElementById("curmet").value); if(!curmet){curmet=0;}'+
							'var curcry = parseInt(document.getElementById("curcry").value); if(!curcry){curcry=0;}'+
							'var curdeu = parseInt(document.getElementById("curdeu").value); if(!curdeu){curdeu=0;}'+							
							'if((capa)>0){var fontcarg = "<font color=\'lime\'>"+doter(capa)+"</font>";} else {var fontcarg = "<font color=\'red\'>"+doter(capa)+"</font>";}'+
							'if((fuel)>0){var fontfuel = "<font color=\'red\'>"+doter(fuel)+"</font>";} else {var fontfuel = "<font color=\'lime\'>"+doter(fuel)+"</font>";}'+
							'document.getElementById("calczone").innerHTML = "'+cargname[langloca]+': "+fontcarg+"<input type=\'hidden\' id=\'hicar\' value=\'"+capa+"\'><br>'+fuelname[langloca]+': "+fontfuel+"<br><br>'+C_nn[langloca][1]+': <font color=\'lime\'>"+checkmval((curmet+curcry+curdeu-capa), 25000)+"</font><br>'+C_nn[langloca][0]+': <font color=\'lime\'>"+checkmval((curmet+curcry+curdeu-capa), 5000)+"</font>";'+
							'for(i = 200; i < 220; i++){ '+
							'if(document.getElementById("moreship" + i)){'+
							'var valor = checkmval((curmet+curcry+curdeu-capa),document.getElementById("moreship" + i).getAttribute("capa"));'+
							'document.getElementById("moreship" + i).innerHTML = "<a style=\'cursor:pointer; -moz-user-select:none;\' onclick=\'addship(\\\"ship"+i+"\\\","+Math.min(valor,(document.getElementById("moreship" + i).getAttribute("maxip")-parseInt(document.getElementsByName("ship" + i)[0].value)))+");\'>+"+Math.min(valor,(document.getElementById("moreship" + i).getAttribute("maxip")-parseInt(document.getElementsByName("ship" + i)[0].value)))+"</a>";'+
							//'document.getElementById("totalship" + i).innerHTML = checkmval((curmet+curcry+curdeu),document.getElementById("moreship" + i).getAttribute("capa"));;}'+
							';;}'+
							'}}';
		F_head.appendChild(F_script);
	
	var warnmax = xpath("//th[@colspan='4']/font[@color='red']");
	if(warnmax.snapshotLength > 0){warnmax = '<tr height="20"><th colspan="6"><font color="red">'+warnmax.snapshotItem(0).innerHTML+'</font></th></tr>';} else {warnmax = "";}
	var cl_tbtitle = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/table/tbody/tr/td[@class='c']").snapshotItem(0).innerHTML;
	var cl_sptitle = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/table/tbody/tr/th[not(@colspan)]").snapshotItem(0).innerHTML;
	var cl_maxtitle = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/table/tbody/tr/th[not(@colspan)]").snapshotItem(1).innerHTML;
	var cl_sbvalue = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]//input[@type='submit']");
	if(cl_sbvalue.snapshotLength > 0){cl_sbvalue = '<tr height="20"><th colspan="6"><input type="submit" value="'+cl_sbvalue.snapshotItem(0).value+'" /></th></tr>';} else {cl_sbvalue = ""}
	var noxipbut = xpath("//a[contains(@href,'noShips(')]").snapshotItem(0).innerHTML;
	var allxipbut = xpath("//a[contains(@href,'maxShips(')]").snapshotItem(0).innerHTML; 
	
	var allhidden = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/descendant::input[@type='hidden']");
	var hiddenholder = "";
	for(var i=0;i<allhidden.snapshotLength;i++){
		hiddenholder += '<input type="hidden" name="'+allhidden.snapshotItem(i).name+'" value="'+allhidden.snapshotItem(i).value+'">';
	}
	var allhdmaxs = xpath("//input[@type='hidden' and contains(@name,'maxship')]");
	var allhdspee = xpath("//input[@type='hidden' and contains(@name,'speed')]");
	var allhdcapa = xpath("//input[@type='hidden' and contains(@name,'capacity')]");
	var allhdcons = xpath("//input[@type='hidden' and contains(@name,'consumption')]");
	var allxipsname = xpath("//input[contains(@name,'ship') and @size and @alt]/parent::th/parent::tr/parent::tbody//a[@title]");
	var allxipinp = xpath("//input[contains(@name,'ship') and @size and @alt]");
	var xiphold = "";
	var solfix = 0;
	for(var i=0;i<allxipsname.snapshotLength;i++){
    if(parseInt(allhdspee.snapshotItem(i).value) == 0){
    xiphold += '<tr><th>'+allxipsname.snapshotItem(i).innerHTML+'</th><th>-</th><th>'+allhdmaxs.snapshotItem(i).value+'</th><th>-</th><th>-</th></tr>'; //<th>-</th>
    solfix--; continue;}
		xiphold += '<tr><th>'+allxipsname.snapshotItem(i).innerHTML+'</th><td class="k">'+allhdspee.snapshotItem(i).value+'</td><th><a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',-1);">&laquo;</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="changeship(\''+allxipinp.snapshotItem(i+solfix).name+'\',0);">&reg;</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="changeship(\''+allxipinp.snapshotItem(i+solfix).name+'\','+allhdmaxs.snapshotItem(i).value+');">[max: '+allhdmaxs.snapshotItem(i).value+']</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',1);">&raquo;</a></th><th><input onchange="calccap();" onkeyup="calccap();" name="'+allxipinp.snapshotItem(i+solfix).name+'" size="'+allxipinp.snapshotItem(i+solfix).size+'" value="'+allxipinp.snapshotItem(i+solfix).value+'" alt="'+allxipinp.snapshotItem(i+solfix).alt+'"/></th><th id="more'+allxipinp.snapshotItem(i+solfix).name+'" maxip="'+allhdmaxs.snapshotItem(i).value+'" capa="'+allhdcapa.snapshotItem(i).value+'">-</th></tr>'; //<td class="k" id="total'+allxipinp.snapshotItem(i+solfix).name+'">-</td>
	}
	
	var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@id,'resources')]/tbody/tr[3]/td[position()<4 and position()>0]");
	if(allcurres.snapshotLength > 0){
		var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
		var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
		var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
	}
	
	var planetname = xpath("//select[@size='1']/option[@selected]");
	if(planetname.snapshotLength > 0){
		var planetcoords = planetname.snapshotItem(0).innerHTML;
			planetcoords = /\[(\d+):(\d+):(\d+)\]/.exec(planetcoords);
		var curgal = RegExp.$1;
		var cursys = RegExp.$2;
		var curpla = RegExp.$3;
	}
	
	var resname = xpath("//font/parent::b/parent::i/b/font");
	var metname = resname.snapshotItem(0).innerHTML;
	var cryname = resname.snapshotItem(1).innerHTML;
	var deuname = resname.snapshotItem(2).innerHTML;
	var targetname = xpath("//table[@width='519' and position()=1]/tbody/tr[2]/th[6]").snapshotItem(0).innerHTML;
	var transpcalc = new Array(); 

		transpcalc[0] = "Transport calculator"; //ogame.ba

	
	var calcinjection = '<br>'+hiddenholder+'<table width="519" border="0" cellpadding="0" cellspacing="1">'+
						'<tr height="20"><td class="c" colspan="3">'+transpcalc[langloca]+':</td></tr>'+
						'<tr height="20"><th>'+metname+'</th><th><input id="curmet" value="'+curmet+'" onchange="calccap();" onkeyup="calccap();"></th><th rowspan="5" id="calczone"><script>calccap();</script></th></tr>'+
						'<tr height="20"><th>'+cryname+'</th><th><input id="curcry" value="'+curcry+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
						'<tr height="20"><th>'+deuname+'</th><th><input id="curdeu" value="'+curdeu+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
						'<tr height="20"><th>'+targetname+'</th><th><input size="2" name="galaxy" value="'+curgal+'" onchange="calccap();" onkeyup="calccap();"> : <input size="2" name="system" value="'+cursys+'" onchange="calccap();" onkeyup="calccap();"> : <input size="2" name="planet" value="'+curpla+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
						'<tr height="20"><th>'+speedname[langloca]+'</th><th><select name="speed" onchange="calccap();"><option value="10">100</option><option value="9">90</option><option value="8">80</option><option value="7">70</option><option value="6">60</option><option value="5">50</option><option value="4">40</option><option value="3">30</option><option value="2">20</option><option value="1">10</option></select> %</th>'+
						'</table>';
	
	var formzone = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]");
	var calcsholder = document.createElement('form');
		calcsholder.action = formzone.snapshotItem(0).action;
		calcsholder.method = formzone.snapshotItem(0).method;
		calcsholder.innerHTML = '<input name="speedfactor" type="hidden" value="1"><input name="thisgalaxy" type="hidden" value="'+curgal+'"><input name="thissystem" type="hidden" value="'+cursys+'"><input name="thisplanet" type="hidden" value="'+curpla+'">'+
								'<table width="519" border="0" cellpadding="0" cellspacing="1">'+warnmax+
								'<tr height="20"><td colspan="6" class="c">'+cl_tbtitle+'</td></tr>'+
								'<tr height="20"><th>'+cl_sptitle+'</th><th>'+speedname[langloca]+'</th><th>'+cl_maxtitle+'</th><th>-</th><th>-</th></tr>'+xiphold+ //<th>-</th>
								'<tr height="20"><th colspan="3"><a href="javascript:noShips(); calccap();" >'+noxipbut+'</a></th>'+
								'<th colspan="3"><a href="javascript:maxShips(); calccap();" >'+allxipbut+'</a></th></tr>'+cl_sbvalue+
								'</table>'+calcinjection;
	formzone.snapshotItem(0).parentNode.insertBefore(calcsholder, formzone.snapshotItem(0));
	formzone.snapshotItem(0).parentNode.removeChild(formzone.snapshotItem(0));

}
}

if(/page=galaxy/.test(ogtitle) == true){
if((moonspy == "1") || (harvest == "1")){
	var fontinf = xpath("//a[contains(@onmouseover, '#808080')]");
	if(fontinf.snapshotLength > 0){
		
		var thisgal = xpath("//input[@name='galaxy']").snapshotItem(0).value;
		var thissis = xpath("//input[@name='system']").snapshotItem(0).value;
		
		for(var i=0; i < fontinf.snapshotLength; i++){
		  //alert(fontinf.snapshotItem(i).parentNode.innerHTML.search('planettype'));
			var fontinflen = fontinf.snapshotItem(i).parentNode.childNodes.length;
			var isMoon = fontinf.snapshotItem(i).parentNode.innerHTML.search('planettype') != -1;
			//alert(isMoon);
			
			//if(DEBUG){GM_log("if > 1 is moonspy; if = 1 is recycler --> "+fontinflen);}
			if(DEBUG){GM_log("is it a moon? --> " + isMoon);}
			
			//if((fontinflen == 1) && (harvest == "1")){
			if(!(isMoon == true) && (harvest == "1")){
				
				var L_har= new Array(); //23.

					L_har[0] = "Vaditi"; //ogame.ba

				var harvres = fontinf.snapshotItem(i).parentNode.parentNode.childNodes[1].childNodes[3].attributes[0].nodeValue;
				var mySplitResult = harvres.split(",");
				var thisharvresmet = mystr2num(mySplitResult[0].split(":")[2]);
				var thisharvrescry = mystr2num(mySplitResult[1].split(":")[1]);
				//var thisharvresmet = fontinf.snapshotItem(i).parentNode.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML
				//var thisharvrescry = fontinf.snapshotItem(i).parentNode.parentNode.parentNode.childNodes[2].childNodes[1].innerHTML
				//var plan = /.+\[\d+\:\d+\:(\d+).+/.exec((fontinf.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML));
				var thispla = fontinf.snapshotItem(i).parentNode.parentNode.childNodes[1].childNodes[1].innerHTML;
				
				fontinf.snapshotItem(i).parentNode.innerHTML = 
          fontinf.snapshotItem(i).parentNode.innerHTML.replace(
            L_har[langloca], 
            "<a style=\\'cursor:pointer\\' onclick=\\'doit(8, "+thisgal+", "+thissis+", "+thispla+", 2, "+Math.ceil((thisharvresmet+thisharvrescry)/20000)+")\\'>" + L_har[langloca] + "</a>");
			}
			//if((fontinflen > 1) && (moonspy == "1")){
			if((isMoon == true) && (moonspy == "1")){
		
				var L_spy= new Array(); //24.

					L_spy[0] = "Spijuniranje"; //ogame.ba

					
        var thispla = fontinf.snapshotItem(i).parentNode.parentNode.childNodes[1].childNodes[1].innerHTML;
        fontinf.snapshotItem(i).parentNode.innerHTML = 
          fontinf.snapshotItem(i).parentNode.innerHTML.replace(
            L_spy[langloca], 
            "<a style=\\'cursor:pointer\\' onclick=\\'doit(6, "+thisgal+", "+thissis+", "+thispla+", 3, 4)\\'>" + L_spy[langloca] + "</a>");
			}
		}
	}
}
}

if(/page=resources/.test(ogtitle) == true){
if((readytime == "1") || (advstor == "1")){
	var resfact = xpath("//th[@height='4']//parent::tr/following-sibling::tr/td");
	if(resfact.snapshotLength > 0){
		var metfact = />([0-9\.]+)</.exec(resfact.snapshotItem(0).innerHTML);
		if(metfact != null){var metfact = RegExp.$1; metfact = mystr2num(metfact);} else {metfact = 0;}
		var cryfact = />([0-9\.]+)</.exec(resfact.snapshotItem(1).innerHTML);
		if(cryfact != null){var cryfact = RegExp.$1; cryfact = mystr2num(cryfact);} else {cryfact = 0;}
		var deufact = />([0-9\.]+)</.exec(resfact.snapshotItem(2).innerHTML);
		if(deufact != null){var deufact = RegExp.$1; deufact = mystr2num(deufact);} else {deufact = 0;}
	
		GM_setValue((ogserver+planetcoords+"met"), metfact);
		GM_setValue((ogserver+planetcoords+"cry"), cryfact);
		GM_setValue((ogserver+planetcoords+"deu"), deufact);
	}
}
if(advstor == "1"){
	
	var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@id,'resources')]/tbody/tr[3]/td[position()<4 and position()>0]");
	if(allcurres.snapshotLength > 0){
		var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
		var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
		var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
	}
	
	var L_pch = new Array(); //29.

		L_pch[0] = "sati proizvodnje"; //ogame.ba

		
	var L_pcd = new Array(); //30.

		L_pcd[0] = "dani proizvodnje"; //ogame.ba


		
	var L_stoc = new Array(); //31.

		L_stoc[0] = "Skladiste"; //ogame.ba

		
	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function doter(str){'+
							'var tempval = (""+str).split(""); '+
							'var tempval2 = ""; '+
							'for(var i=0;i<tempval.length;i++){ '+
							'if(((tempval.length-(i+1))%3 == 0) && ((i+1)!=tempval.length)){tempval2 = tempval2+tempval[i]+"."; '+
							'} else { tempval2 = tempval2+tempval[i]; } } return tempval2; } '+
							'function hourly(){ '+
							'var metfact = '+metfact+'; var cryfact = '+cryfact+'; var deufact = '+deufact+';'+
							'var hourfact = document.getElementsByName("hourfact")[0].value; if(!hourfact){hourfact=0;}'+
							'document.getElementsByName("methour")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(metfact*parseInt(hourfact))+"</font>";'+
							'document.getElementsByName("cryhour")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(cryfact*parseInt(hourfact))+"</font>";'+
							'document.getElementsByName("deuhour")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(deufact*parseInt(hourfact))+"</font>";'+
							'} '+
							'function daily(){ '+
							'var metfact = ('+metfact+'*24); var cryfact = ('+cryfact+'*24); var deufact = ('+deufact+'*24);'+
							'var dayfact = document.getElementsByName("dayfact")[0].value; if(!dayfact){dayfact=0;}'+
							'document.getElementsByName("metday")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(metfact*parseInt(dayfact))+"</font>";'+
							'document.getElementsByName("cryday")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(cryfact*parseInt(dayfact))+"</font>";'+
							'document.getElementsByName("deuday")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(deufact*parseInt(dayfact))+"</font>";'+
							'}'+
							'function restot(){ '+
							'var hourfact = document.getElementsByName("hourfact")[0].value; if(!hourfact){hourfact=0;}'+
							'var dayfact = document.getElementsByName("dayfact")[0].value; if(!dayfact){dayfact=0;}'+
							'document.getElementsByName("totalmet")[0].innerHTML = "<font color=\'#1090FF\'>"+doter((24*'+metfact+'*parseInt(dayfact))+('+metfact+'*parseInt(hourfact)))+"</font>";'+
							'document.getElementsByName("totalcry")[0].innerHTML = "<font color=\'#1090FF\'>"+doter((24*'+cryfact+'*parseInt(dayfact))+('+cryfact+'*parseInt(hourfact)))+"</font>";'+
							'document.getElementsByName("totaldeu")[0].innerHTML = "<font color=\'#1090FF\'>"+doter((24*'+deufact+'*parseInt(dayfact))+('+deufact+'*parseInt(hourfact)))+"</font>";'+
							'}'+
							'function xlet(val,let){ '+
							'if(val > 0){return (val+let);} else return "";'+
							'}'+
							'function hourexec(hid,hdata){'+
							'hdata = hdata - 1; '+
							'if(hdata < 0){return;}'+
							'var hday = Math.floor(hdata/86400); '+
							'var hhor = Math.floor((hdata-(hday*86400))/3600); '+
							'var hmin = Math.floor((hdata-(hday*86400)-(hhor*3600))/60); '+
							'var hsec = hdata-(hday*86400)-(hhor*3600)-(hmin*60); '+
							'hday = xlet(hday,"d "); hhor = xlet(hhor,"h "); hmin = xlet(hmin,"m "); hsec = xlet(hsec,"s");'+
							'document.getElementById(hid).innerHTML = hday+hhor+hmin+hsec; '+
							'if(hdata == 0){document.getElementById(hid).innerHTML = "-"; window.setTimeout("window.location.reload();",2000);} '+
							'if(hdata > 0){ window.setTimeout(("hourexec(\'"+hid+"\',"+hdata+");"), 999); } '+
							'}';
		F_head.appendChild(F_script);
		
	var resname = xpath("//font/parent::b/parent::i/b/font");
	var metname = resname.snapshotItem(0).innerHTML;
	var cryname = resname.snapshotItem(1).innerHTML;
	var deuname = resname.snapshotItem(2).innerHTML;
	var totname = xpath("//th[@height='4']//parent::tr/following-sibling::tr/th").snapshotItem(0).innerHTML;
	
	var storxp = xpath("//input[@type='submit']/parent::td/parent::tr/td/font");
	var stormet = Math.floor(curmet / (mystr2num(storxp.snapshotItem(0).innerHTML.replace('k', ''))*1000)*100);
	if(stormet > 100){stormet = 100;}
	var storcry = Math.floor(curcry / (mystr2num(storxp.snapshotItem(1).innerHTML.replace('k', ''))*1000)*100);
	if(storcry > 100){storcry = 100;}
	var stordeu = Math.floor(curdeu / (mystr2num(storxp.snapshotItem(2).innerHTML.replace('k', ''))*1000)*100);
	if(stordeu > 100){stordeu = 100;}
	GM_log("metal: "+stormet+" "+(storxp.snapshotItem(0).innerHTML)+" "+curmet);
	
	if(curmet < ((mystr2num(storxp.snapshotItem(0).innerHTML)*1000)*100)){var storsecmet = calctime(curmet,curcry,curdeu,(mystr2num(storxp.snapshotItem(0).innerHTML)*1000),0,0,metfact,cryfact,deufact);} else {var storsecmet = 0;}
	var storseccry = calctime(curmet,curcry,curdeu,0,(mystr2num(storxp.snapshotItem(1).innerHTML)*1000),0,metfact,cryfact,deufact);
	var storsecdeu = calctime(curmet,curcry,curdeu,0,0,(mystr2num(storxp.snapshotItem(2).innerHTML)*1000),metfact,cryfact,deufact);
	
	var storzone = xpath("//form/table").snapshotItem(0);
	var stortab = document.createElement('table');
		stortab.width = "550";
		stortab.innerHTML = "<tr><td></td><td class='c' colspan='3'>"+T_pc[langloca]+":</td></tr>"+
							"<tr><td></td><th width='105'>"+metname+"</td><th width='105'>"+cryname+"</td><th width='105'>"+deuname+"</td></tr>"+
							"<tr><td class='c'><input type='text' size='2' name='hourfact' value='24' onkeyup='hourly();restot();' onchange='hourly();'> "+L_pch[langloca]+"</td><td class='k' name='methour'><script type='text/javascript'>hourly();restot();</script></td><td class='k' name='cryhour'></td><td class='k' name='deuhour'></td></tr>"+
							"<tr><td class='c'><input type='text' size='2' name='dayfact' value='7' onkeyup='daily();restot();' onchange='daily();'> "+L_pcd[langloca]+"</td><td class='k' name='metday'><script type='text/javascript'>daily();</script></td><td class='k' name='cryday'></td><td class='k' name='deuday'></td></tr>"+
							"<tr><th colspan='4'></th></tr>"+
							"<tr><td class='c'>"+totname+"</td><td class='k' name='totalmet'></td><td class='k' name='totalcry'></td><td class='k' name='totaldeu'></td></tr>"+
							"<tr><td></td><th colspan='3'></th></tr>"+
							"<tr><td></td><td class='c' colspan='3'>"+L_stoc[langloca]+"</td></tr>"+							
							"<tr><td></td><td class='k'><table cellspacing='0' style='cursor:help;' title='"+stormet+"%' cellpadding='0' height='11' width='"+stormet+"%'><tr height='11'><td style='background-color:"+barcolor(stormet)+"'></td></tr></table></td><td class='k'><table cellspacing='0' style='cursor:help;' title='"+storcry+"%' cellpadding='0' height='11' width='"+storcry+"%'><tr height='11'><td style='background-color:"+barcolor(storcry)+"'></td></tr></table></td><td class='k'><table cellspacing='0' style='cursor:help;' title='"+stordeu+"%' cellpadding='0' height='11' width='"+stordeu+"%'><tr height='11'><td style='background-color:"+barcolor(stordeu)+"'></td></tr></table></td></tr>"+
							"<tr><td></td><th><div id='metstortime'><script type='text/javascript'>hourexec(\"metstortime\","+storsecmet+");</script></div></th><th><div id='crystortime'><script type='text/javascript'>hourexec(\"crystortime\","+storseccry+");</script></div></th><th><div id='deustortime'><script type='text/javascript'>hourexec(\"deustortime\","+storsecdeu+");</script></div></th></tr>";
	storzone.parentNode.insertBefore(stortab, storzone.nextSibling);
}	
}

if(/page=overview/.test(ogtitle) == true){
if (localtime == "1") {
  var LT_loc = new Array(); 

		LT_loc[0] = "Lokalno vrijeme"; //ogame.ba

  var nodo = xpath('//div[@id="content"]/center/table[1]/tbody').snapshotItem(0);
	if (nodo.childNodes[2].innerHTML.search('colspan="3"') != -1) nodo = nodo.childNodes[2]
	else nodo = nodo.childNodes[4];
	
	var date = new Date();
	var mes = date.getMonth();
	var dia = date.getDay();
	var diaNum = date.getDate();
	var hora = date.getHours();
	var mins = date.getMinutes();
	var segs = date.getSeconds();
	
	var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
	var fechaLocal = O_days[langloca][dia] + " " + diaNum + " - " + O_months[langloca][mes] + " - " + ((hora < 10) ? "0" : "") + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;
	var fechaServer = O_days[langloca][findPos(days,fecha[1])] + " " + fecha[3] + " - " + O_months[langloca][findPos(months, fecha[2])] + " - " + ((fecha[4] < 10) ? "0" : "") + fecha[4] + fecha[5];
	
	var nodoLocal = document.createElement("tr");
	nodo.parentNode.insertBefore(nodoLocal, nodo.nextSibling);
	nodoLocal.innerHTML = "<th>"+LT_loc[langloca]+"</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
	nodo.childNodes[3].setAttribute('id', 'ClockServer');
	nodo.childNodes[3].innerHTML = fechaServer;

	setTimeout(clock, 1000);
}

if (mission_colors == "1") {
  
  const	lng_ownattack     = 'flight ownattack';
  const	lng_rownattack    = 'return ownattack';
  const lng_ownespionage  = 'flight ownespionage';
  const	lng_rownespionage = 'return ownespionage';
  const	lng_owntransport  = 'flight owntransport';
  const	lng_rowntransport = 'return owntransport';
  const	lng_ftransport    = 'flight transport';
  const	lng_rtransport    = 'return transport';
  const	lng_fownharvest   = 'flight ownharvest';
  const	lng_rownharvest   = 'return ownharvest';
  
  //alert(color_harvest + '-' + darken(color_harvest));
  
  //coloreado vision general
  var publi = document.getElementsByTagName ('span');
  for (var i = publi.length - 1; i >= 0; i--) {
    if(publi[i].className == lng_ownattack)           publi[i].style.color=color_attack
  	else if(publi[i].className == lng_rownattack)     publi[i].style.color=darken(color_attack)
  	else if(publi[i].className == lng_ownespionage)   publi[i].style.color=color_spy
  	else if(publi[i].className == lng_rownespionage)  publi[i].style.color=darken(color_spy)
  	else if(publi[i].className == lng_owntransport)   publi[i].style.color=color_otransport
  	else if(publi[i].className == lng_rowntransport)  publi[i].style.color=darken(color_otransport)
  	else if(publi[i].className == lng_ftransport)     publi[i].style.color=color_transport
  	else if(publi[i].className == lng_rtransport)     publi[i].style.color=darken(color_transport)
  	else if(publi[i].className == lng_fownharvest)    publi[i].style.color=color_harvest
  	else if(publi[i].className == lng_rownharvest)    publi[i].style.color=darken(color_harvest)
  }
}
}

if(/page=messages/.test(ogtitle) == true){
if(advmess == "1"){
	var I_collapse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6%2BR8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAANhJREFUeNqc0i8LwkAcxvHvZB6cbUbBZDTKsBlE8AXYBV%2BBQavvQMOib8MXIKhJxoxGEQSDZcmdfyazTJlz4OFTfnDHJ%2FyeO8iO3DycCJBoRs6u3Wh6rkazazcT5tLAvTnBQXmc1I6D8nBvTpCGX8gW%2FXY%2BLHK%2FGOTDIrbot9PITCEF%2BBXRQoQWZVEDVn58%2Fo6RsVMJsON5BNx4fiA5nMwD3ZbGg2bBBCwAb738CWr1BoBlvpbcbxe6SOb4I%2B%2F2Or2RNjISbVnAV72v90vcu0biQOefKcB%2FDgACSjw86tNwSQAAAABJRU5ErkJggg%3D%3D";
	var I_expande = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6%2BR8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAPdJREFUeNqckbFqAlEQRc8LizBLCtfS2NkmBMwHLKTxN%2FQDrBLSSnqttvJTAklgP8AqVkEhjZIq%2BxY3Gt3ipXl5bMQVkwtTzGUOM9xRxhj%2BqhP%2BIQXI7fB5dSwwuLn2FVADmkBwBJMAMwWIBQSQeH3%2FMt%2BO3dRZ5YpQ%2BhfA2lbiFRqA%2BttyzGv26KD8FIAPYPHjeTvrJf3UbDLljFRp7BV705NYR9Mk1Xwtlask1cQ6mhbBX1BY7bUbfgsvD9hk4OUBDb9FWO21d7c5CDgHOqNJ19w9XZrRpGuAjvWlLFIHPrxHpYAqAZtA3SY2K6R7UGKfvvek7wEApilNKx1ZMQ0AAAAASUVORK5CYII%3D";
	
	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function collexp(id){ '+
							'var dispopt = document.getElementById(id); '+
							'if(dispopt.style.display == "none"){dispopt.style.display = "inline";} else {dispopt.style.display = "none";}'+
							'}';
		F_head.appendChild(F_script);
		
	var mestitle = xpath("//td[@class='c']").snapshotItem(0).innerHTML;
	var mescaptions = xpath("//th/parent::tr/preceding-sibling::tr/td[@class='c']/parent::tr/following-sibling::tr[position()=1]/th");
	var mesact = mescaptions.snapshotItem(0).innerHTML;
	var mesdat = mescaptions.snapshotItem(1).innerHTML;
	var mesfro = mescaptions.snapshotItem(2).innerHTML;
	var messub = mescaptions.snapshotItem(3).innerHTML;
	
	var allchk = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th");
	var alldat = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/following-sibling::th[position()=1]");
	var allfro = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/following-sibling::th[position()=2]");
	var allsub = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/following-sibling::th[position()=3]");
	var alltxt = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/parent::tr/following-sibling::tr[position()=1]/*[2]");
	
	var batholder = "";
	var spyholder = "";
	var userholder = "";
	var allyholder = "";
	var othersholder = "";
	
	for(var i=0;i<allchk.snapshotLength;i++){
		if(/span class..combatreport/.test(allsub.snapshotItem(i).innerHTML) == true){
			batholder += "<tr><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>S</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr>";
		} else if(/javascript\:showGalaxy/.test(allsub.snapshotItem(i).innerHTML) == true){
			spyholder += "<tr><th><a href='javascript:collexp(\"spyo"+i+"\")'><img src='"+I_expande+"'></a></th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>S</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td></td><th colspan='2'></th><td colspan='3' class='b'><div id='spyo"+i+"' style='display: none;'>"+alltxt.snapshotItem(i).innerHTML+"</div></td></tr>";
		} else if((/\[.+\]/.test(allfro.snapshotItem(i).innerHTML) == true) && (/\<a href/.test(allfro.snapshotItem(i).innerHTML) != true)){
			allyholder += "<tr><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>S</th><th>R</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><th colspan='3'></th><td colspan='3' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
		} else if(/writemessages.php.session/.test(allsub.snapshotItem(i).innerHTML) == true){
			userholder += "<tr><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>S</th><th>R</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><th colspan='3'></th><td colspan='3' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
		} else {
			othersholder += "<tr><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>S</th><th>R</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><th colspan='3'></th><td colspan='3' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
		}
	}
	
	if(batholder.length>0){
		batholder = "<table width='100%'><tr><td class='c' colspan='5'>Battle Reports</td></tr><tr><th colspan='2'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+batholder+"</table><br>";
	}	
	if(spyholder.length>0){
		spyholder = "<table width='100%'><tr><td></td><td class='c' colspan='5'>Espionage Reports</td></tr><tr><td></td><th colspan='2'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+spyholder+"</table>";
	}
	if(allyholder.length>0){
		allyholder = "<table width='100%'><tr><td class='c' colspan='6'>Alliance Messages</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+allyholder+"</table><br>";
	}	
	if(userholder.length>0){
		userholder = "<table width='100%'><tr><td class='c' colspan='6'>User Messages</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+userholder+"</table><br>";
	}
	if(othersholder.length>0){
		othersholder = "<table width='100%'><tr><td class='c' colspan='6'>Others Messages</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+othersholder+"</table>";
	}
	
	var formact = xpath("//form").snapshotItem(0);
	var formsel = xpath("//select[@name='deletemessages']").snapshotItem(0).innerHTML;
	var formsub = xpath("//select[@name='deletemessages']/following-sibling::input[position()=1]").snapshotItem(0);
	
	if((batholder.length+spyholder.length)>0){var leftcol = batholder+spyholder;} else {var leftcol = "<table width='100%'><tr><td class='c'>No reports at the moment</td></tr></table>";}
	if((allyholder.length+userholder.length+othersholder.length)>0){var rightcol = allyholder+userholder+othersholder;} else {var rightcol = "<table width='100%'><tr><td class='c'>No messages at the moment</td></tr></table>";}
	
	var meszone = xpath("//center/script").snapshotItem(0);
	var mestable = document.createElement('form');
		mestable.action = formact.action;
		mestable.method = formact.method;
		mestable.innerHTML = "<table><tr><td class='c' colspan='2'>"+mestitle+"</td></tr><tr><th colspan='2'><select name='deletemessages'>"+formsel+"</select> <input type='submit' value='"+formsub.value+"'></th></tr><tr><td valign='top' width='50%'>"+leftcol+"</td><td valign='top' width='50%'>"+rightcol+"</td></tr><tr><th colspan='2'><select name='deletemessages'>"+formsel+"</select> <input type='submit' value='"+formsub.value+"'><input type='hidden' name='messages' value='1' /></th></tr><table>";
		formact.parentNode.removeChild(formact);
		meszone.parentNode.insertBefore(mestable, meszone.nextSibling);
}
}

//if(/game\/leftmenu\.php/.test(ogtitle) == true){
if(lemenu == "1"){
  xpath("//img[@height='40']").snapshotItem(0).addEventListener("click", hidemenu, false);
  xpath("//img[@height='19']").snapshotItem(0).addEventListener("click", hidemenu, false);
  xpath("//img[@height='35']").snapshotItem(0).addEventListener("click", hidemenu, false);
//}
}

if(/page=options/.test(ogtitle) == true){
	var T_rc= new Array(); //2.

		T_rc[0] = "Boje resursa"; //ogame.ba

		
	var L_mc = new Array(); //3.

		L_mc[0] = "Boja metala"; //ogame.ba

		
	var L_cc = new Array(); //4.

		L_cc[0] = "Boja kristala"; //ogame.ba

		
	var L_dc = new Array(); //5.

		L_dc[0] = "Boja deuterija"; //ogame.ba

		
	var L_ec = new Array(); //6.

		L_ec[0] = "Boja energije"; //ogame.ba

		
	var R_rt = new Array(); //7.

		R_rt[0] = "Jedan klik za resetiranje boje, dupli klik za brisanje boje"; //ogame.ba

		
	var T_ar = new Array(); //8.

		T_ar[0] = "Uklanjanje reklama"; //ogame.ba

		
	var L_sa = new Array(); //9.

		L_sa[0] = "Normalno"; //ogame.ba

		
	/*var L_coa = new Array(); //10.

		L_coa[0] = "Commander Info link"; //ogame.ba

	*/
	
	var L_dm = new Array(); //10.

		L_dm[0] = "Ikona crne materij"; //ogame.ba

		
	var L_ica = new Array(); //11.

		L_ica[0] = "Officer's Casino link"; //ogame.ba

		
	var L_topa = new Array(); //12.

		L_topa[0] = "Top upgrade ikone"; //ogame.ba

		
	var T_ut = new Array(); //13.

		T_ut[0] = "Alati"; //ogame.ba

		
	var L_rs = new Array(); //14.

		L_rs[0] = "Link za recikliranje rusevina"; //ogame.ba

		
	var L_sp = new Array(); //15.

		L_sp[0] = "Link za spijuniranje mjeseca"; //ogame.ba

		
	var L_mxs = new Array(); //16.

		L_mxs[0] = "Maximum brodova i obrane"; //ogame.ba

		
	var L_cdesc = new Array(); //17.

		L_cdesc[0] = "Smanji opise"; //ogame.ba

		
	var L_loct = new Array(); //17.

		L_loct[0] = "Prikazi lokalno vrijeme"; //ogame.ba

		
	var T_misc= new Array(); //18.

		T_misc[0] = "Boje misija"; //ogame.ba

		
	var L_miscchk= new Array(); //19.

		L_miscchk[0] = "Promjeni boje misija"; //ogame.ba

		
	var L_atc= new Array(); //19.

		L_atc[0] = "Napad"; //ogame.ba

		
	var L_esc= new Array(); //20.

		L_esc[0] = "Spijuniranje"; //ogame.ba

		
	var L_trc= new Array(); //21.

		L_trc[0] = "Transport"; //ogame.ba

		
	var L_hac= new Array(); //22.

		L_hac[0] = "Recikliranje"; //ogame.ba

		
	var L_otrc= new Array(); //23.

		L_otrc[0] = "Vlastiti transport"; //ogame.ba

		
	var B_sv = xpath("//input[@type='submit']");
	if(B_sv.snapshotLength > 0){B_sv = B_sv.snapshotItem(0).value;} else {B_sv = "?????? SAVE ??????";}
	
	if(notdetected){
		
		var T_lang= new Array(); //18.

			T_lang[0] = "<a href='http://userscripts.org/scripts/show/8938'>[Jezik nije odabran: MORATE izabrati prikladan jezik dobro radi]</a>"; //ogame.ba

			
		var L_cl = new Array(); //19.

			L_cl[0] = "Odaberi lokaciju"; //ogame.ba

			
		var languages = new Array;
			languages[0] = "org";
			languages[0] = "ba";

		
		var languageoptions = "";
		for(var i=0;i<languages.length;i++){
			if(i==parseInt(langloca)){
				languageoptions = languageoptions + "<option value='"+languages[i]+"' selected>OGame "+languages[i]+"</option>";
			} else {
				languageoptions = languageoptions + "<option value='"+languages[i]+"'>OGame "+languages[i]+"</option>";
			}
		}
	
		var langtable = "<tr><td class=\"c\" colspan=\"2\">"+T_lang[langloca]+"</td></tr>"+
						"<tr><th>"+L_cl[langloca]+"</th><th><select id=\"selectlocation\">"+languageoptions+"</select></th><tr>";
	} else {
		var langtable = "";
	}
	
	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function resetbut(id,color){ '+
							'var theinp = document.getElementById(id); '+
							'theinp.value = color; '+
							'theinp.style.color = color; '+
							'} '+
							'function changer(id){ '+
							'var theinp = document.getElementById(id); '+
							'theinp.style.color = theinp.value; '+
							'} ';
		F_head.appendChild(F_script);
	
	var butjava = "\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"";
	
	//var optionszone = xpath("/html/body/center[2]").snapshotItem(0);
	var optionszone = xpath("//div[@id='content']/center").snapshotItem(0);
	var optionstable = document.createElement('table');
		optionstable.width = "519px";
		optionstable.innerHTML = 
		"<tr><td class=\"c\" colspan=\"2\">"+T_rc[langloca]+"</td></tr>"+
		"<tr><th>"+L_mc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('metalcolor','#F1531E')\" ondblclick=\"resetbut('metalcolor','')\"><input type=\"text\" onkeyup=\"changer('metalcolor')\" style=\"color:"+color_m+";\" id=\"metalcolor\" maxlength=\"18\" size =\"20\" value=\""+color_m+"\"></th></tr>"+
		"<tr><th>"+L_cc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('crystalcolor','#54B0DC')\" ondblclick=\"resetbut('crystalcolor','')\"><input type=\"text\" onkeyup=\"changer('crystalcolor')\" style=\"color:"+color_c+";\" id=\"crystalcolor\" maxlength=\"18\" size =\"20\" value=\""+color_c+"\"></th></tr>"+
		"<tr><th>"+L_dc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('deuteriumcolor','#9AACCB')\" ondblclick=\"resetbut('deuteriumcolor','')\"><input type=\"text\" onkeyup=\"changer('deuteriumcolor')\" style=\"color:"+color_d+";\" id=\"deuteriumcolor\" maxlength=\"18\" size =\"20\" value=\""+color_d+"\"></th></tr>"+
		"<tr><th>"+L_ec[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('energycolor','#F2D99D')\" ondblclick=\"resetbut('energycolor','')\"><input type=\"text\" onkeyup=\"changer('energycolor')\" style=\"color:"+color_e+";\" id=\"energycolor\" maxlength=\"18\" size =\"20\" value=\""+color_e+"\"></th></tr>"+
		"<tr><td class=\"c\" colspan=\"2\">"+T_misc[langloca]+"</td></tr>"+
		"<tr><th>"+L_miscchk[langloca]+"</th><th><input type=\"checkbox\" id=\"missioncolors\" value=\""+mission_colors+"\" "+togglecheck(mission_colors)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_atc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('attackcolor','"+color_attack+"')\" ondblclick=\"resetbut('attackcolor','')\"><input type=\"text\" onkeyup=\"changer('attackcolor')\" style=\"color:"+color_attack+";\" id=\"attackcolor\" maxlength=\"18\" size =\"20\" value=\""+color_attack+"\"></th></tr>"+
		"<tr><th>"+L_esc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('spycolor','"+color_spy+"')\" ondblclick=\"resetbut('spycolor','')\"><input type=\"text\" onkeyup=\"changer('spycolor')\" style=\"color:"+color_spy+";\" id=\"spycolor\" maxlength=\"18\" size =\"20\" value=\""+color_spy+"\"></th></tr>"+
		"<tr><th>"+L_otrc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('harvestcolor','"+color_otransport+"')\" ondblclick=\"resetbut('harvestcolor','')\"><input type=\"text\" onkeyup=\"changer('harvestcolor')\" style=\"color:"+color_otransport+";\" id=\"harvestcolor\" maxlength=\"18\" size =\"20\" value=\""+color_otransport+"\"></th></tr>"+
		"<tr><th>"+L_hac[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('owntransportcolor','"+color_harvest+"')\" ondblclick=\"resetbut('owntransportcolor','')\"><input type=\"text\" onkeyup=\"changer('owntransportcolor')\" style=\"color:"+color_harvest+";\" id=\"owntransportcolor\" maxlength=\"18\" size =\"20\" value=\""+color_harvest+"\"></th></tr>"+
		"<tr><th>"+L_trc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('transportcolor','"+color_transport+"')\" ondblclick=\"resetbut('transportcolor','')\"><input type=\"text\" onkeyup=\"changer('transportcolor')\" style=\"color:"+color_transport+";\" id=\"transportcolor\" maxlength=\"18\" size =\"20\" value=\""+color_transport+"\"></th></tr>"+
		"<tr><td class=\"c\" colspan=\"2\">"+T_ar[langloca]+"</td></tr>"+
		"<tr><th>"+L_sa[langloca]+"</th><th><input type=\"checkbox\" id=\"standard\" value=\""+standardads+"\" "+togglecheck(standardads)+" onclick="+butjava+"></th></tr>"+
		//"<tr><th>"+L_coa[langloca]+"</th><th><input type=\"checkbox\" id=\"CIlink\" value=\""+cilink+"\" "+togglecheck(cilink)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_dm[langloca]+"</th><th><input type=\"checkbox\" id=\"darkmatter\" value=\""+darkmatter+"\" "+togglecheck(darkmatter)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_ica[langloca]+"</th><th><input type=\"checkbox\" id=\"OClink\" value=\""+oclink+"\" "+togglecheck(oclink)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_topa[langloca]+"</th><th><input type=\"checkbox\" id=\"TOPicons\" value=\""+topicons+"\" "+togglecheck(topicons)+" onclick="+butjava+"></th></tr>"+
		"<tr><td class=\"c\" colspan=\"2\">"+T_ut[langloca]+"</td></tr>"+
		"<tr><th>"+L_rs[langloca]+"</th><th><input type=\"checkbox\" id=\"recycler\" value=\""+harvest+"\" "+togglecheck(harvest)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_sp[langloca]+"</th><th><input type=\"checkbox\" id=\"moonspy\" value=\""+moonspy+"\" "+togglecheck(moonspy)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_res[langloca]+"</th><th><input type=\"checkbox\" id=\"relvl\" value=\""+relvl+"\" "+togglecheck(relvl)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_mxs[langloca]+"</th><th><input type=\"checkbox\" id=\"maxships\" value=\""+maxships+"\" "+togglecheck(maxships)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_ret[langloca]+"</th><th><input type=\"checkbox\" id=\"readytime\" value=\""+readytime+"\" "+togglecheck(readytime)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+T_cs[langloca]+"</th><th><input type=\"checkbox\" id=\"calcships\" value=\""+calcships+"\" "+togglecheck(calcships)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_cdesc[langloca]+"</th><th><input type=\"checkbox\" id=\"collapsedesc\" value=\""+collapsedesc+"\" "+togglecheck(collapsedesc)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_loct[langloca]+"</th><th><input type=\"checkbox\" id=\"localtime\" value=\""+localtime+"\" "+togglecheck(localtime)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+T_pc[langloca]+"</th><th><input type=\"checkbox\" id=\"advstor\" value=\""+advstor+"\" "+togglecheck(advstor)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>Collapsible left menu</th><th><input type=\"checkbox\" id=\"lemenu\" value=\""+lemenu+"\" "+togglecheck(lemenu)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>Advance messages (BETA)</th><th><input type=\"checkbox\" id=\"advmess\" value=\""+advmess+"\" "+togglecheck(advmess)+" onclick="+butjava+"></th></tr>"+langtable+
		"<tr><th colspan=\"2\"><input type=\"button\" id=\"saveall\" value=\""+B_sv+"\"><input id=\"hiddenserver\" type=\"hidden\" value=\""+ogserver+"\"></th></tr>";
		
		optionszone.appendChild(optionstable);
		document.getElementById("saveall").addEventListener("click", saver, false);
}

//---------del ads start
if(standardads == "1"){
	del("//script[contains(@src,'googlesyndication')]/parent::center/parent::td/parent::tr");
	delall("//iframe[@name=@id]");
	del("//div[@id='combox_container']");
	del("//img[contains(@src,'ads')]/parent::a[contains(@href,'referer')]/parent::center");
	del("//a[contains(@href,'www.darkpirates')]/parent::center/parent::td/parent::tr");
}
//if(cilink == "1"){
if(darkmatter == "1"){
  del("//table[@id='resources']/tbody/tr[1]/td[4]");
  del("//table[@id='resources']/tbody/tr[2]/td[4]");
  del("//table[@id='resources']/tbody/tr[3]/td[4]");
}
if(oclink == "1"){
	//del("//a[contains(@href, 'offiziere.php')]/parent::font/parent::div/parent::td/parent::tr");
	del("//a[contains(@id, 'darkmatter2')]"); 
}
if(topicons == "1"){
	del("//td[@align='center' and @width='35']/parent::tr/parent::tbody/parent::table/parent::td");
}
//---------del ads end
//******************************************************************************************************************************************************
(function ()
{
	if (!((document.URL.indexOf('page=') + 1 && document.URL.indexOf('session=') + 1) || document.URL.indexOf('renameplanet') + 1)) { return; }

	var Datei = document.URL.match(/\/game\/index.php\?page=([a-zA-Z0-9_\-\/]+)&/)[1]; 
	var OGameVersion = '';
//******************************************************************************************************************************************************
//--------------
// OGame-Skript
//--------------
	(function ()
	{
//-------
// Daten
//-------
// einige Konstanten
		var StartZeit = new Date();

// Default-Einstellungen
		var Default_commander = false;
		var Default_max_tab_breite = 520;
		var Default_skriptcolor = '#000000';


		var Default_tausenderpkt = false;

		var Default_bewegteress = true;

		var Default_left_menu_fix = false;


// Daten laden
		var Server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1]; // aktueller OGame-Server
		var SID = document.URL.match(/session=([0-9a-zA-Z]+)/); // Session-ID des Users
		SID = SID ? SID[1] : ''; // falls es eine gibt, speichern
		var PHPSIDStr = document.URL.match(/PHPSESSID=([0-9a-zA-Z]+)/);
		PHPSIDStr = PHPSIDStr ? '&PHPSESSID=' + PHPSIDStr[1] : '';
// wird noch geladen
		var HP_ID = 0; // zum Speichern der HP-ID
		var PlaniListe = 0, Planis = 0; // zum Speichern der Planiliste
		var DefPlani = 0, AktPlani = 0;
		var HatCommander = Default_commander;
		var TextCol = Default_skriptcolor;


		function FindeXPath(XPath)
		{
			var Wurzel = document;
			if (FindeXPath.arguments.length > 1) // weitere Argumente der Funktion
			{
				Wurzel = FindeXPath.arguments[1];
			}
			var Erg = document.evaluate(XPath, Wurzel, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var Arr = new Array();
			var AktKnoten = Erg.iterateNext();
			while (AktKnoten)
			{
				Arr[Arr.length] = AktKnoten;
				AktKnoten = Erg.iterateNext();
			}
			return Arr;
		}


		function NeuesElement(Tag, Inhalt)
		{
			var Neu = document.createElement(Tag); // erste Zelle (Titel)
			if (Inhalt.indexOf('<') + 1 || Inhalt.indexOf('&') + 1) // falls Tags oder &;-Umschreibungen im Text sind
			{
				Neu.innerHTML = Inhalt; // Text als HTML-Code
			}
			else
			{
				if (Inhalt.length > 0) // ansonsten, und falls es ueberhaupt einen Text gibt
				{
					Neu.appendChild(document.createTextNode(Inhalt)); // Text als Attribut
				}
			}
			if (NeuesElement.arguments.length > 2) // weitere Argumente der Funktion
			{
				for (var i = 2; i < NeuesElement.arguments.length - 1; i += 2) // alle diese Argumente
				{
					if (!NeuesElement.arguments[i + 1].length) { continue; }
					Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i + 1]); // dem Tag zuweisen
				}
			}
			return Neu; // zurueckgeben
		}


		function Loesche(element)
		{
			element.parentNode.removeChild(element); // Da nur Kindelemente geloescht werden koennen, wird vom Elternknoten her geloescht
		}

		function LeseZeit(Str)
		{
			var Monate = new Array();
			Monate['Jan'] = 0; Monate['Feb'] = 1; Monate['Mar'] = 2; Monate['Apr'] = 3; Monate['May'] = 4; Monate['Jun'] = 5; Monate['Jul'] = 6; Monate['Aug'] = 7; Monate['Sep'] = 8; Monate['Okt'] = 9; Monate['Nov'] = 10; Monate['Dec'] = 11;
			var ZeitStr = Str.match(/[a-zA-Z]{3} ([a-zA-Z]{3}) ([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
			var Zeit = new Date(); // das ist noetig
			Zeit = new Date(Zeit.getYear() + 1900, Monate[ZeitStr[1]], ZeitStr[2], ZeitStr[3], ZeitStr[4], ZeitStr[5]);
			return Zeit;
		}

		function LadeAccEinst(Name, Default)
		{
			Default = (Default == undefined) ? eval('Default_' + Name) : Default;
			if (!HP_ID) { return Default; } // falls es nicht bekannt ist, welches der Account ist, den Defaultwert zurueckgeben
			return GM_getValue(Server + '_' + HP_ID + '_' + Name, Default); // Einstellung laden
		}

		function SpeichAccEinst(Name, Wert)
		{
			if (!HP_ID) { return; } // falls der Account unbekannt ist, Abbruch
			GM_setValue(Server + '_' + HP_ID + '_' + Name, Wert); // Wert speichern
		}

		function Trim(Str)
		{
			while (Str.substring(0, 1) == ' ')
			{
				Str = Str.substring(1, Str.length);
			}
			while (Str.substring(Str.length - 1, Str.length) == ' ')
			{
				Str = Str.substring(0, Str.length - 1);
			}
			return Str;
		}

		function HoleRessourcen() 
		{
			var Zellen = FindeXPath('//table[@id="resources"]/tbody/tr[3]/td');
			var Arr = new Array(); // zum Speichern der Zahlen
			for (var i = 0; i < 3; i++) // Zellen 0-2
			{
				Arr[i] = InInt(Zellen[i].innerHTML); 
			}
			var Werte = TagsRaus(Zellen[3].innerHTML).split('/');
			Arr[4] = InInt(Werte[0]); // und jeweils als Ganzzahl speichern, die Gesamtmenge zuerst, da sie fuer die Gebaeude und Forschungen benoetigt wird
			Arr[3] = InInt(Werte[1]);
			return Arr; // Zahlen zurueckgeben
		}

		function LadePlanis(PlaniListe)
		{

			var HP_Nummer = 0;

			if (!HP_Nummer) { return 0; }


			var HPNachOben = LadeAccEinst('hp_oben');
			var KeinePlaniNamen = LadeAccEinst('keine_planinamen');
			var Planis = new Array(new Array()); 
			Planis[0]['HP'] = HP_Nummer;
			function FuegeHinzu(Plani)
			{

				Plani['Nr'] = Planis.length;
				if (Plani['Aktiv']) { Planis[0]['Aktiv'] = Plani['Nr']; }
				Planis[Planis.length] = Plani;

			}

			return Planis;
		}

// Differenz Serverzeit <-> lokale Zeit bestimmen
		function LeseZeitDiff()
		{
			var ZeitZelle = FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
			var ServerZeit = LeseZeit(ZeitZelle.firstChild.nodeValue);
			return StartZeit - ServerZeit;
		}

// Tausenderpunkte
		function TausenderZahl(z)
		{
			z = String(Number(z));
			var i = z.length % 3;
			if (!i) { i = 3; }
			var erg = z.substr(0, i);
			for (; i < z.length; i += 3)
			{
				erg += '.' + z.substr(i, 3);
			}
			return erg;
		}
// Zahl mit Tausenderpunkten als String formatieren
		function TausenderString(s)
		{
			if (s.length < 4) { return s; } // da gibts ohnehnin keine Tausenderpunkte
			var erg = '', zahl = ''; // das Ergbenis; die zwischengespeicherte Zahl
			var akt = '', vor = ''; // das aktuelle und das vorherige Zeichen
			var i = -1;
			while (i++ < s.length) // ueber alle Zeichen
			{
				akt = s.charAt(i);
				if (akt.match(/[\d]/)) // wenn es eine Zahl ist
				{
					zahl = akt;
					while (i++ < s.length && s.charAt(i).match(/[\d]/))
					{
						zahl += s.charAt(i); // die Zahl zusammensetzen
					}
					akt = (i == s.length) ? 0 : s.charAt(i); // das Zeichen nach der Zahl ist jetzt aktuell
					if (zahl.length < 4 || isNaN(vor) || isNaN(akt))
					{
						erg += zahl; 
					}
					else
					{
						erg += TausenderZahl(zahl); 
					}
					if (!akt) { break; } 
				}
				erg += (vor = akt);
			}
			return erg;
		}




		function ogameskript()
		{

// Ersatz fuer fruehere Body Var
			var ContDiv = FindeXPath('//div[@id="content"]')[0];

// Loeschen von <br><br><br><br> im oGame v0.77b Design, geht nicht ueber DOM wegen Formdaten
			var ContDivBr = FindeXPath('//div[@id="content"]/center/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
			ContDivBr = FindeXPath('//div[@id="content"]/center/center/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
			ContDivBr = FindeXPath('//div[@id="content"]/center/center/form/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }

// Tausenderpunkte im gesamten HTML-Dokument einfuegen mit Ausnahme Allianzseite
			if (LadeAccEinst('tausenderpkt') && Datei != 'allianzen')
			{
				FindeKinder(document.getElementsByTagName('body')[0], PunkteKorrekturHF, -1);
			}
// herausfinden, ob der Spieler Commander ist
			var InfoLink = FindeXPath('//center/a[contains(@href, "page=commander/info")]').length;
			SpeichAccEinst('commander', !InfoLink);
			HatCommander = LadeAccEinst('commander');


// In der Uebersicht
			if (Datei == 'overview')
			{
				if (SID)
				{


					var AktPlaniBau = FindeXPath('//table[@width="519"]/tbody/tr/th[@colspan>=2]/center')[0];
					AktPlaniBau.insertBefore(NeuesElement('a', Trim(AktPlaniBau.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&session=' + SID + '&cp=' + AktPlani['ID'] + PHPSIDStr), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
					AktPlaniBau.removeChild(AktPlaniBau.childNodes[1]); // den Text loeschen
				}
				function getElementsByClassName(clsName, htmltag, what)
				{
					var arr = new Array();
					var elems = document.getElementsByTagName(htmltag);
					var mmm = 0;
					for (var i = 0; i < elems.length; i++)
					{
						if (elems[i].className == clsName)
						{
							if (elems[i].getAttribute('onmouseover', 0).indexOf(what) + 1)
							{
								arr[mmm] = elems[i];
								mmm++;
							}
						}
					}
					return arr;
				}

				if (LadeAccEinst('bewegteress') == true)
				{
					function RessEval(a, b)
					{
						var c = eval('/' + a + ': ([\.0-9]+)/');
						return parseInt(b.match(c)[1].replace(/\./g, ''), 10);
					}
					function RessLoop(a, b)
					{
						var s = getElementsByClassName(a, 'a', 'Metal');
						var c = d = e = 0, t = '';
						for (var i = 0; i < s.length; i++)
						{
							t = s[i].getAttribute('onmouseover');
							c += RessEval('Metal', t);
							d += RessEval('Kristal', t);
							e += RessEval('Deuterij', t);
						}
						if (c != 0 || d != 0 || e != 0)
						{
							code += '<tr><th>' + b + '</th><th>' + TausenderZahl(c) + '</th><th>' + TausenderZahl(d) + '</th><th>' + TausenderZahl(e) + '</th></tr>';
						}
						return new Array(c, d, e);
					}
					code = '<center><table width="' + LadeAccEinst('max_tab_breite') + '" border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;">';
					code += '<tr><td class="c" colspan="4"><span style="color:lime;">Pregled Resorsa Flote - Powered By Karamba</td></tr>';
					code += '<tr><th><b>Misija</b></th><th><b>Metal</b></th><th><b>Kristal</b></th><th><b>Deuterij</b></th></tr>';
					var typ = new Array('owntransport', 'Transport', 'owndeploy', 'Stacioniranje', 'owncolony', 'Kolonizovanje', 'ownhold', 'Hold', 'ownharvest', 'Recikliranje', 'ownattack', 'Napad', 'ownfederation', 'Savez');
					var mkd = new Array();
					for (var i = 0; i < typ.length; i += 2) { mkd = mkd.concat(RessLoop(typ[i], typ[i + 1])); }
					var met = kris = deut = 0;
					for (var i = 0; i < mkd.length; i += 3) { met += mkd[i]; kris += mkd[i + 1]; deut += mkd[i + 2]; }
					code += '<tr><th><span style="color:lime;">Ukupno:</span></th><th><span style="color:lime;">' + TausenderZahl(met) + '</span></th><th><span style="color:lime;">' + TausenderZahl(kris) + '</span></th><th><span style="color:lime;">' + TausenderZahl(deut) + '</span></th></tr>';
					code += '</table></center><br>';
					aa4 = document.createElement('div');
					ContDiv.appendChild(aa4);
					var ttt = FindeXPath('//div[@id="content"]/div[last()]');
					ttt[0].innerHTML = code;
				}

			} // Ende Uebersichtsteil


		}

		function startup()
		{

// Hinweis in der Navi
			OGameVersion = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden


				ogameskript();
				Versuche = MaxVers + 1;

			if (Versuche <= MaxVers) { window.setTimeout(startup, VersWart); } // falls es keine HP-ID gibt und noch nicht genuegend Versuche gemacht wurden, nochmal versuchen
		}
		startup(); // Daten kontrollieren und Skript ausfuehren
	})();
//******************************************************************************************************************************************************
})();
//******************************************************************************************************************************************************
