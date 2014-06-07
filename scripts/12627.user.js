// ==UserScript==
// @name          OGame - Advance Options
// @namespace     http://userscripts.org/scripts/show/12627
// @description   Agrega opciones adicionales a las de OGame
// @source        http://userscripts.org/scripts/show/12627
// @identifier    http://userscripts.org/scripts/show/12627.user.js
// @version       0.5.5
// @date          2007-10-15
// @include http://uni*.ogame.org*
// @include http://uni*.ogame.com.pt*
// @include http://uni*.ogame.de*
// @include http://uni*.ogame.com.es*
// @include http://uni*.ogame.fr*
// @include http://uni*.ogame.ba*
// @include http://s*.ogame.onet.pl*
// @include http://uni*.ogame.ru*
// @include http://uni*.ogame.nl*
// @include http://uni*.ogame.it*
// @include http://uni*.o-game.co.kr*
// @include http://uni*.ogame.gr*
// @include http://uni*.ogame.com.tr*
// @include http://uni*.ogame.com.br*
// @include http://uni*.ogame.ro*
// @include http://uni*.ogame.tw*
// @include http://uni*.ogame.dk*
// ==/UserScript==

////////////////////////////////////////////

// ********OGame - Advance options**********
////////////////22 August 2007//////////////
// visit the oficial script page for more
// information about installing and using
// this script.
// http://userscripts.org/scripts/show/12627
// http://userscripts.org/scripts/show/8938
//
// Ogame.de translated by astefk
// OGame.com.es translated by elisma and fede
// OGame.fr translated by Thanatos and symbiont
// OGame.ba translated by Kotach86
// OGame.pl translated by sero
// OGame.ru translated by ADie
// OGame.nl translated by Chassisbot and Deathstar-NL
// OGame.it translated by Emperor of Light
// O-Game.co.kr translated by stocking
// OGame.gr translated by p3tris
// OGame.com.tr translated by cagdas
// OGame.com.br translated by Zurc
// OGame.ro translated by I.Razvan
// OGame.tw translated by matrixjimmy
// OGame.dk translated by mike_dk
////////////////////////////////////////////

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
  C_nn[0] = new Array(); C_nn[0][0] ='Small cargo';C_nn[0][1] ="Large cargo"; //ogame.org
  C_nn[1] = new Array(); C_nn[1][0] ='Cargueiro pequeno';C_nn[1][1] ="Cargueiro grande"; //ogame.com.br
  C_nn[2] = new Array(); C_nn[2][0] ='Small cargo';C_nn[2][1] ="Large cargo"; //ogame.de
  C_nn[3] = new Array(); C_nn[3][0] ='Carga peque&ntilde;a';C_nn[3][1] ="Carga grande"; //ogame.com.es
  C_nn[4] = new Array(); C_nn[4][0] ='Petit trans';C_nn[4][1] ="Grand trans"; //ogame.fr
  C_nn[5] = new Array(); C_nn[5][0] ='Cargueiro pequeno';C_nn[5][1] ="Cargueiro grande"; //ogame.com.pt
  C_nn[6] = new Array(); C_nn[6][0] ='Mali trans';C_nn[6][1] ="Veliki trans"; //ogame.ba
  C_nn[7] = new Array(); C_nn[7][0] ='Small cargo';C_nn[7][1] ="Large cargo"; //ogame.pl
  C_nn[8] = new Array(); C_nn[8][0] ='&#1052;&#1072;&#1083;&#1099;&#1081; &#1090;&#1088;&#1072;&#1085;&#1089;&#1087;&#1086;&#1088;&#1090;';C_nn[8][1] ="&#1041;&#1086;&#1083;&#1100;&#1096;&#1086;&#1081; &#1090;&#1088;&#1072;&#1085;&#1089;&#1087;&#1086;&#1088;&#1090;"; //ogame.ru
  C_nn[9] = new Array(); C_nn[9][0] ='Small cargo';C_nn[9][1] ="Large cargo"; //ogame.nl
  C_nn[10] = new Array();C_nn[10][0]='Small cargo';C_nn[10][1]="Large cargo"; //ogame.it
  C_nn[11] = new Array();C_nn[11][0]='Small cargo';C_nn[11][1]="Large cargo"; //o-game.co.kr
  C_nn[12] = new Array();C_nn[12][0]='Small cargo';C_nn[12][1]="Large cargo"; //ogame.gr
  C_nn[13] = new Array();C_nn[13][0]='K&#252;&#231;&#252;k nakliye gemisi';C_nn[13][1]="B&#252;y&#252;k nakliye gemisi"; //ogame.com.tr
  C_nn[14] = new Array();C_nn[14][0]='Small cargo';C_nn[14][1]="Large cargo"; //ogame.ro
  C_nn[15] = new Array();C_nn[15][0]='Small cargo';C_nn[15][1]="Large cargo"; //ogame.tw
  C_nn[16] = new Array();C_nn[16][0]='Lille trans';C_nn[16][1]="Stor trans"; //ogame.dk

// adaptaciÃ³n de idiomas
var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var O_months=new Array();
  O_months[0] =new Array();O_months[0] [0]='January';O_months[0] [1]='February';O_months[0] [2]='March';O_months[0] [3]='April';O_months[0] [4]='May';O_months[0] [5]='June';O_months[0] [6]='July';O_months[0] [7]='August';O_months[0] [8]='September';O_months[0] [9]='October';O_months[0] [10]='November';O_months[0] [11]='December';//ogame.org
  O_months[1] =new Array();O_months[1] [0]='Janeiro';O_months[1] [1]='Fevereiro';O_months[1] [2]='Mar&#231;o';O_months[1] [3]='Abril';O_months[1] [4]='Maio';O_months[1] [5]='Junho';O_months[1] [6]='Julho';O_months[1] [7]='Agosto';O_months[1] [8]='Setembro';O_months[1] [9]='Outubro';O_months[1] [10]='Novembro';O_months[1] [11]='Dezembro';//ogame.com.br
  O_months[2] =new Array();O_months[2] [0]='January';O_months[2] [1]='February';O_months[2] [2]='March';O_months[2] [3]='April';O_months[2] [4]='May';O_months[2] [5]='June';O_months[2] [6]='July';O_months[2] [7]='August';O_months[2] [8]='September';O_months[2] [9]='October';O_months[2] [10]='November';O_months[2] [11]='December';//ogame.de
  O_months[3] =new Array();O_months[3] [0]='Enero';O_months[3] [1]='Febrero';O_months[3] [2]='Marzo';O_months[3] [3]='Abril';O_months[3] [4]='Mayo';O_months[3] [5]='Junio';O_months[3] [6]='Julio';O_months[3] [7]='Agosto';O_months[3] [8]='Septiembre';O_months[3] [9]='Octubre';O_months[3] [10]='Noviembre';O_months[3] [11]='Diciembre';//ogame.com.es
  O_months[4] =new Array();O_months[4] [0]='January';O_months[4] [1]='February';O_months[4] [2]='March';O_months[4] [3]='April';O_months[4] [4]='May';O_months[4] [5]='June';O_months[4] [6]='July';O_months[4] [7]='August';O_months[4] [8]='September';O_months[4] [9]='October';O_months[4] [10]='November';O_months[4] [11]='December';//ogame.fr
  O_months[5] =new Array();O_months[5] [0]='Janeiro';O_months[5] [1]='Fevereiro';O_months[5] [2]='Mar&#231;o';O_months[5] [3]='Abril';O_months[5] [4]='Maio';O_months[5] [5]='Junho';O_months[5] [6]='Julho';O_months[5] [7]='Agosto';O_months[5] [8]='Setembro';O_months[5] [9]='Outubro';O_months[5] [10]='Novembro';O_months[5] [11]='Dezembro';//ogame.pt
  O_months[6] =new Array();O_months[6] [0]='Sijecanj';O_months[6] [1]='Veljaca';O_months[6] [2]='Ozujak';O_months[6] [3]='Travanj';O_months[6] [4]='Svibanj';O_months[6] [5]='Lipanj';O_months[6] [6]='Srpanj';O_months[6] [7]='Kolovoz';O_months[6] [8]='Rujan';O_months[6] [9]='Listopad';O_months[6] [10]='Studeni';O_months[6] [11]='Prosinac';//ogame.ba
  O_months[7] =new Array();O_months[7] [0]='January';O_months[7] [1]='February';O_months[7] [2]='March';O_months[7] [3]='April';O_months[7] [4]='May';O_months[7] [5]='June';O_months[7] [6]='July';O_months[7] [7]='August';O_months[7] [8]='September';O_months[7] [9]='October';O_months[7] [10]='November';O_months[7] [11]='December';//ogame.pl
  O_months[8] =new Array();O_months[8] [0]='&#1071;&#1085;&#1074;&#1072;&#1088;&#1100;';O_months[8] [1]='&#1060;&#1077;&#1074;&#1088;&#1072;&#1083;&#1100;';O_months[8] [2]='&#1052;&#1072;&#1088;&#1090;';O_months[8] [3]='&#1040;&#1087;&#1088;&#1077;&#1083;&#1100;';O_months[8] [4]='&#1052;&#1072;&#1081;';O_months[8] [5]='&#1048;&#1102;&#1083;&#1100;';O_months[8] [6]='&#1048;&#1102;&#1083;&#1100;';O_months[8] [7]='&#1040;&#1074;&#1075;&#1091;&#1089;&#1090;';O_months[8] [8]='&#1057;&#1077;&#1085;&#1090;&#1103;&#1073;&#1088;&#1100;';O_months[8] [9]='&#1054;&#1082;&#1090;&#1103;&#1073;&#1088;&#1100;';O_months[8] [10]='&#1053;&#1086;&#1103;&#1073;&#1088;&#1100;';O_months[8] [11]='&#1044;&#1077;&#1082;&#1072;&#1073;&#1088;&#1100;';//ogame.ru
  O_months[9] =new Array();O_months[9] [0]='January';O_months[9] [1]='February';O_months[9] [2]='March';O_months[9] [3]='April';O_months[9] [4]='May';O_months[9] [5]='June';O_months[9] [6]='July';O_months[9] [7]='August';O_months[9] [8]='September';O_months[9] [9]='October';O_months[9] [10]='November';O_months[9] [11]='December';//ogame.nl
  O_months[10]=new Array();O_months[10][0]='January';O_months[10][1]='February';O_months[10][2]='March';O_months[10][3]='April';O_months[10][4]='May';O_months[10][5]='June';O_months[10][6]='July';O_months[10][7]='August';O_months[10][8]='September';O_months[10][9]='October';O_months[10][10]='November';O_months[10][11]='December';//ogame.it
  O_months[11]=new Array();O_months[11][0]='January';O_months[11][1]='February';O_months[11][2]='March';O_months[11][3]='April';O_months[11][4]='May';O_months[11][5]='June';O_months[11][6]='July';O_months[11][7]='August';O_months[11][8]='September';O_months[11][9]='October';O_months[11][10]='November';O_months[11][11]='December';//o-game.co.kr
  O_months[12]=new Array();O_months[12][0]='January';O_months[12][1]='February';O_months[12][2]='March';O_months[12][3]='April';O_months[12][4]='May';O_months[12][5]='June';O_months[12][6]='July';O_months[12][7]='August';O_months[12][8]='September';O_months[12][9]='October';O_months[12][10]='November';O_months[12][11]='December';//ogame.gr
  O_months[13]=new Array();O_months[13][0]='Ocak';O_months[13][1]='&#222;ubat';O_months[13][2]='Mart';O_months[13][3]='Nisan';O_months[13][4]='May&#253;s';O_months[13][5]='Haziran';O_months[13][6]='Temmuz';O_months[13][7]='A&#240;ustos';O_months[13][8]='Eyl&#252;l';O_months[13][9]='Ekim';O_months[13][10]='Kas&#253;m';O_months[13][11]='Aral&#253;k';//ogame.com.tr
  O_months[14]=new Array();O_months[14][0]='January';O_months[14][1]='February';O_months[14][2]='March';O_months[14][3]='April';O_months[14][4]='May';O_months[14][5]='June';O_months[14][6]='July';O_months[14][7]='August';O_months[14][8]='September';O_months[14][9]='October';O_months[14][10]='November';O_months[14][11]='December';//ogame.ro
  O_months[15]=new Array();O_months[15][0]='January';O_months[15][1]='February';O_months[15][2]='March';O_months[15][3]='April';O_months[15][4]='May';O_months[15][5]='June';O_months[15][6]='July';O_months[15][7]='August';O_months[15][8]='September';O_months[15][9]='October';O_months[15][10]='November';O_months[15][11]='December';//ogame.tw
  O_months[16]=new Array();O_months[16][0]='Januar';O_months[16][1]='Februar';O_months[16][2]='Marts';O_months[16][3]='April';O_months[16][4]='Maj';O_months[16][5]='Juni';O_months[16][6]='Juli';O_months[16][7]='August';O_months[16][8]='September';O_months[16][9]='Oktober';O_months[16][10]='November';O_months[16][11]='December';//ogame.dk

var O_days=new Array();
  O_days[0] =new Array();O_days[0] [0]='Sunday,';O_days[0] [1]='Monday,';O_days[0] [2]='Tuesday,';O_days[0] [3]='Wednesday,';O_days[0] [4]='Thursday,';O_days[0] [5]='Friday,';O_days[0] [6]='Saturday';//ogame.org
  O_days[1] =new Array();O_days[1] [0]='Domingo,';O_days[1] [1]='Segunda,';O_days[1] [2]='Ter&#231;a,';O_days[1] [3]='Quarta,';O_days[1] [4]='Quinta,';O_days[1] [5]='Sexta,';O_days[1] [6]='S&#225;bado,';//ogame.com.br
  O_days[2] =new Array();O_days[2] [0]='Sunday,';O_days[2] [1]='Monday,';O_days[2] [2]='Tuesday,';O_days[2] [3]='Wednesday,';O_days[2] [4]='Thursday,';O_days[2] [5]='Friday,';O_days[2] [6]='Saturday,';//ogame.de
  O_days[3] =new Array();O_days[3] [0]='Domingo,';O_days[3] [1]='Lunes,';O_days[3] [2]='Martes,';O_days[3] [3]='Mi&#233;rcoles,';O_days[3] [4]='Jueves,';O_days[3] [5]='Viernes,';O_days[3] [6]='S&#225;bado,';//ogame.com.es
  O_days[4] =new Array();O_days[4] [0]='Sunday,';O_days[4] [1]='Monday,';O_days[4] [2]='Tuesday,';O_days[4] [3]='Wednesday,';O_days[4] [4]='Thursday,';O_days[4] [5]='Friday,';O_days[4] [6]='Saturday,';//ogame.fr
  O_days[5] =new Array();O_days[5] [0]='Domingo,';O_days[5] [1]='Segunda,';O_days[5] [2]='Ter&#231;a,';O_days[5] [3]='Quarta,';O_days[5] [4]='Quinta,';O_days[5] [5]='Sexta,';O_days[5] [6]='S&#225;bado,';//ogame.com.pt
  O_days[6] =new Array();O_days[6] [0]='Nedjelja,';O_days[6] [1]='Ponedjeljak,';O_days[6] [2]='Utorak,';O_days[6] [3]='Srijeda,';O_days[6] [4]='Cetvrtak,';O_days[6] [5]='Petak,';O_days[6] [6]='Subota,';//ogame.ba
  O_days[7] =new Array();O_days[7] [0]='Sunday,';O_days[7] [1]='Monday,';O_days[7] [2]='Tuesday,';O_days[7] [3]='Wednesday,';O_days[7] [4]='Thursday,';O_days[7] [5]='Friday,';O_days[7] [6]='Saturday,';//ogame.pl
  O_days[8] =new Array();O_days[8] [0]='&#1042;&#1086;&#1089;&#1082;&#1088;&#1077;&#1089;&#1077;&#1085;&#1100;&#1077;,';O_days[8] [1]='&#1055;&#1086;&#1085;&#1077;&#1076;&#1077;&#1083;&#1100;&#1085;&#1080;&#1082;,';O_days[8] [2]='&#1042;&#1090;&#1086;&#1088;&#1085;&#1080;&#1082;,';O_days[8] [3]='&#1057;&#1088;&#1077;&#1076;&#1072;,';O_days[8] [4]='&#1063;&#1077;&#1090;&#1074;&#1077;&#1088;&#1075;,';O_days[8] [5]='&#1055;&#1103;&#1090;&#1085;&#1080;&#1094;&#1072;,';O_days[8] [6]='&#1057;&#1091;&#1073;&#1073;&#1086;&#1090;&#1072;,';//ogame.ru
  O_days[9] =new Array();O_days[9] [0]='Sunday,';O_days[9] [1]='Monday,';O_days[9] [2]='Tuesday,';O_days[9] [3]='Wednesday,';O_days[9] [4]='Thursday,';O_days[9] [5]='Friday,';O_days[9] [6]='Saturday,';//ogame.nl
  O_days[10]=new Array();O_days[10][0]='Sunday,';O_days[10][1]='Monday,';O_days[10][2]='Tuesday,';O_days[10][3]='Wednesday,';O_days[10][4]='Thursday,';O_days[10][5]='Friday,';O_days[10][6]='Saturday,';//ogame.it
  O_days[11]=new Array();O_days[11][0]='Sunday,';O_days[11][1]='Monday,';O_days[11][2]='Tuesday,';O_days[11][3]='Wednesday,';O_days[11][4]='Thursday,';O_days[11][5]='Friday,';O_days[11][6]='Saturday,';//o-game.co.kr
  O_days[12]=new Array();O_days[12][0]='Sunday,';O_days[12][1]='Monday,';O_days[12][2]='Tuesday,';O_days[12][3]='Wednesday,';O_days[12][4]='Thursday,';O_days[12][5]='Friday,';O_days[12][6]='Saturday,';//ogame.gr
  O_days[13]=new Array();O_days[13][0]='Pazar,';O_days[13][1]='Pazartesi,';O_days[13][2]='Sal&#253;,';O_days[13][3]='&#199;ar&#254;amba,';O_days[13][4]='Per&#254;embe,';O_days[13][5]='Cuma,';O_days[13][6]='Cumartesi,';//ogame.com.tr
  O_days[14]=new Array();O_days[14][0]='Sunday,';O_days[14][1]='Monday,';O_days[14][2]='Tuesday,';O_days[14][3]='Wednesday,';O_days[14][4]='Thursday,';O_days[14][5]='Friday,';O_days[14][6]='Saturday,';//ogame.ro
  O_days[15]=new Array();O_days[15][0]='Sunday,';O_days[15][1]='Monday,';O_days[15][2]='Tuesday,';O_days[15][3]='Wednesday,';O_days[15][4]='Thursday,';O_days[15][5]='Friday,';O_days[15][6]='Saturday,';//ogame.tw
  O_days[16]=new Array();O_days[16][0]='S&#248;ndag,';O_days[16][1]='Mandag,';O_days[16][2]='Tirsdag,';O_days[16][3]='Onsdag,';O_days[16][4]='Torsdag,';O_days[16][5]='Fredag,';O_days[16][6]='L&#248;rdag,';//ogame.dk

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
		langloca = "0"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
	break;
	case "br":
		langloca = "1"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deut.rio: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(N.vel (\d+)/;
	break;
	case "de":
		langloca = "2"; X_mlg = /(Metall: )<b>([\.0-9]+)/; X_clg = /(Kristall: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(Stufe (\d+)/;
	break;
	case "es":
		langloca = "3"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterio: )<b>([\.0-9]+)/; X_elg = /(Energ.a: )<b>([\.0-9]+)/; X_lvl = /\(Nivel (\d+)/;
	break;
	case "fr":
		langloca = "4"; X_mlg = /(M.tal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deut.rium: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(Niveau (\d+)/;
	break;
	case "pt":
		langloca = "5"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deut.rio: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(N.vel (\d+)/;
	break;
	case "ba":
		langloca = "6"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Kristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterij: )<b>([\.0-9]+)/; X_elg = /(Energija: )<b>([\.0-9]+)/; X_lvl = /\(Level (\d+)/;
	break;
	case "pl":
		langloca = "7"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Kryszta.: )<b>([\.0-9]+)/; X_dlg = /(Deuter: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(wybudowano (\d+)/;
	break;
	case "ru":
		langloca = "8"; X_mlg = /(\u041C\u0435\u0442\u0430\u043B\u043B: )<b>([\.0-9]+)/; X_clg = /(\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B: )<b>([\.0-9]+)/; X_dlg = /(\u0414\u0435\u0439\u0442\u0435\u0440\u0438\u0439: )<b>([\.0-9]+)/; X_elg = /(\u042D\u043D\u0435\u0440\u0433\u0438\u044F: )<b>([\.0-9]+)/; X_lvl = /\(\u0443\u0440\u043E\u0432\u0435\u043D\u044C (\d+)/;
	break;
	case "nl":
		langloca = "9"; X_mlg = /(Metaal: )<b>([\.0-9]+)/; X_clg = /(Kristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(Niveau (\d+)/;
	break;
	case "it":
		langloca = "10"; X_mlg = /(Metallo: )<b>([\.0-9]+)/; X_clg = /(Cristallo: )<b>([\.0-9]+)/; X_dlg = /(Deuterio: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(Livello (\d+)/;
	break;
	case "kr":
		langloca = "11"; X_mlg = /(\uBA54\uD0C8: )<b>([\.0-9]+)/; X_clg = /(\uD06C\uB9AC\uC2A4\uD0C8: )<b>([\.0-9]+)/; X_dlg = /(\uB4C0\uD14C\uB968: )<b>([\.0-9]+)/; X_elg = /(\uC5D0\uB108\uC9C0: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
	break;
	case "gr":
		langloca = "12"; X_mlg = /(\u039C\u03AD\u03C4\u03B1\u03BB\u03BB\u03BF: )<b>([\.0-9]+)/; X_clg = /(\u039A\u03C1\u03CD\u03C3\u03C4\u03B1\u03BB\u03BB\u03BF: )<b>([\.0-9]+)/; X_dlg = /(\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B9\u03BF: )<b>([\.0-9]+)/; X_elg = /(\u0395\u03BD\u03AD\u03C1\u03B3\u03B5\u03B9\u03B1: )<b>([\.0-9]+)/; X_lvl = /\(\u03B5\u03C0\u03AF\u03C0\u03B5\u03B4\u03BF (\d+)/;
	break;
	case "tr":
		langloca = "13"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Kristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Enerji: )<b>([\.0-9]+)/; X_lvl = /\(Kademe (\d+)/;
	break;
	case "ro":
		langloca = "14"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deuteriu: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(nivel (\d+)/;
	break;
	case "tw":
		langloca = "15"; X_mlg = /(\u91D1\u5C6C: )<b>([\.0-9]+)/; X_clg = /(\u6676\u9AD4: )<b>([\.0-9]+)/; X_dlg = /(\u91CD\u6C2B: )<b>([\.0-9]+)/; X_elg = /(\u80FD\u91CF: )<b>([\.0-9]+)/; X_lvl = /\(\u7B49\u7D1A (\d+)/;
	break;
	case "dk":
		langloca = "16"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Krystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energi: )<b>([\.0-9]+)/; X_lvl = /\(Level (\d+)/;
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
		L_res[0] = "Total number of researches"; //ogame.org
		L_res[1] = "N&#xFA;mero total de pesquisas"; //ogame.com.br
		L_res[2] = "Anzahl gesamter Forschungen"; //ogame.de
		L_res[3] = "N&#xFA;mero total de investigaciones"; //ogame.com.es
		L_res[4] = "Nombre total de recherches "; //ogame.fr
		L_res[5] = "N&#xFA;mero total de pesquisas"; //ogame.com.pt
		L_res[6] = "Ukupan broj istrazivanja"; //ogame.ba
		L_res[7] = "Ca&#x0142;kowita liczba recykler&oacute;w"; //ogame.pl
		L_res[8] = "&#x412;&#x441;&#x435;&#x433;&#x43E;&#x20;&#x438;&#x441;&#x441;&#x43B;&#x435;&#x434;&#x43E;&#x432;&#x430;&#x43D;&#x438;&#x439;"; //ogame.ru
		L_res[9] = "Totaal aantal onderzoeken"; //ogame.nl
		L_res[10] = "Numero totale delle ricerche"; //ogame.it
		L_res[11] = "&#xC804;&#xCCB4;&#x20;&#xC5F0;&#xAD6C;&#x20;&#xC810;&#xC218;"; //o-game.co.kr
		L_res[12] = "&#x3A3;&#x3C5;&#x3BD;&#x3BF;&#x3BB;&#x3B9;&#x3BA;&#x3CC;&#x3C2;&#x20;&#x3B1;&#x3C1;&#x3B9;&#x3B8;&#x3BC;&#x3CC;&#x3C2;&#x20;&#x3B5;&#x3C1;&#x3B5;&#x3C5;&#x3BD;&#x3CE;&#x3BD;"; //ogame.gr
		L_res[13] = "Toplam ara&#x15F;t&#x131;rmalar"; //ogame.com.tr
		L_res[14] = "Numar total de cercetari"; //ogame.ro
		L_res[15] = "&#x7814;&#x7A76;&#x7E3D;&#x6578;"; //ogame.tw
		L_res[16] = "Total antal forskere"; //ogame.dk
		
	var L_ret= new Array(); //16.
		L_ret[0] = "Time to be available"; //ogame.org
		L_ret[1] = "Tempo at&eacute; estar dispon&iacute;vel"; //ogame.com.br
		L_ret[2] = "Zeit bis n&ouml;tige Ress vorhanden sind"; //ogame.de
		L_ret[3] = "Tiempo hasta estar disponible"; //ogame.com.es
		L_ret[4] = "Temps pour &ecirc;tre disponible"; //ogame.fr
		L_ret[5] = "Tempo at&eacute; estar dispon&iacute;vel"; //ogame.com.pt
		L_ret[6] = "Preostalo vrijeme do mogucnosti izgradnje"; //ogame.ba
		L_ret[7] = "Pozosta&#x0142;y czas do gotowo&#x015B;ci"; //ogame.pl
		L_ret[8] = "&#x41E;&#x441;&#x442;&#x430;&#x43B;&#x43E;&#x441;&#x44C;&#x20;&#x434;&#x43E;&#x20;&#x434;&#x43E;&#x441;&#x442;&#x443;&#x43F;&#x43D;&#x43E;&#x441;&#x442;&#x438;"; //ogame.ru
		L_ret[9] = "Tijd wanneer beschikbaar"; //ogame.nl
		L_ret[10] = "Disponibile fra"; //ogame.it
		L_ret[11] = "&#xAC1C;&#xBC1C;&#xAC00;&#xB2A5;&#x20;&#xC2DC;&#xAC04;"; //o-game.co.kr
		L_ret[12] = "&#x38F;&#x3C1;&#x3B1;&#x20;&#x3BC;&#x3AD;&#x3C7;&#x3C1;&#x3B9;&#x20;&#x3B4;&#x3B9;&#x3B1;&#x3B8;&#x3B5;&#x3C3;&#x3B9;&#x3BC;&#x3CC;&#x3C4;&#x3B7;&#x3C4;&#x3B1;"; //ogame.gr
		L_ret[13] = "Ger&ccedil;ekle&#x15F;ebilecek s&uuml;re"; //ogame.com.tr
		L_ret[14] = "Timpul cand e disponibil"; //ogame.ro
		L_ret[15] = "&#x9810;&#x8A08;&#x53EF;&#x5EFA;&#x9020;&#x6642;&#x9593;"; //ogame.tw
		L_ret[16] = "Vil v&#xE6;re tilg&#xE6;ngelig kl"; //ogame.dk
		
	var T_cs = new Array(); //26.
		T_cs[0] = "Cargo ships calculator"; //ogame.org
		T_cs[1] = "Calculadora de cargueiros"; //ogame.com.br
		T_cs[2] = "Transporter berechnen"; //ogame.de
		T_cs[3] = "Calculadora de naves de carga"; //ogame.com.es
		T_cs[4] = "Calculateur de Transporteurs"; //ogame.fr
		T_cs[5] = "Calculadora de cargueiros"; //ogame.com.pt
		T_cs[6] = "Kalkulator transportera"; //ogame.ba
		T_cs[7] = "Kalkulator transportowc&oacute;w"; //ogame.pl
		T_cs[8] = "&#x41A;&#x430;&#x43B;&#x44C;&#x43A;&#x443;&#x43B;&#x44F;&#x442;&#x43E;&#x440;&#x20;&#x432;&#x43C;&#x435;&#x441;&#x442;&#x438;&#x442;&#x435;&#x43B;&#x44C;&#x43D;&#x43E;&#x441;&#x442;&#x438;&#x20;&#x43A;&#x43E;&#x440;&#x430;&#x431;&#x43B;&#x435;&#x439;"; //ogame.ru
		T_cs[9] = "Vrachtschipcalculator"; //ogame.nl
		T_cs[10] = "Calcolatore delle Navi Cargo"; //ogame.it
		T_cs[11] = "&#xCE74;&#xACE0;&#x20;&#xD654;&#xBB3C;&#xC120;&#x20;&#xACC4;&#xC0B0;&#xAE30;"; //o-game.co.kr
		T_cs[12] = "&#x3A5;&#x3C0;&#x3BF;&#x3BB;&#x3BF;&#x3B3;&#x3B9;&#x3C3;&#x3BC;&#x3CC;&#x3C2;&#x20;&#x3BC;&#x3B5;&#x3C4;&#x3B1;&#x3C6;&#x3BF;&#x3C1;&#x3B9;&#x3BA;&#x3CE;&#x3BD;&#x20;&#x3C0;&#x3BB;&#x3BF;&#x3AF;&#x3C9;&#x3BD;"; //ogame.gr
		T_cs[13] = "Ta&#x15F;&#x131;ma gemisi kapasiteleri"; //ogame.com.tr
		T_cs[14] = "Calculator transportoare"; //ogame.ro
		T_cs[15] = "&#x8CA8;&#x8239;&#x7E3D;&#x8F09;&#x8CA8;&#x91CF;&#x8A08;&#x7B97;"; //ogame.tw
		T_cs[16] = "Transport regner"; //ogame.dk
		
	var T_pc = new Array(); //28.
		T_pc[0] = "Production calculator"; //ogame.org
		T_pc[1] = "Calculadora de produ&ccedil;&atilde;o"; //ogame.com.br
		T_pc[2] = "Produktion berechnen"; //ogame.de
		T_pc[3] = "Calculadora de producci&oacute;n"; //ogame.com.es
		T_pc[4] = "Calculateur de production"; //ogame.fr
		T_pc[5] = "Calculadora de produ&ccedil;&atilde;o"; //ogame.com.pt
		T_pc[6] = "Izracun proizvodnje"; //ogame.ba
		T_pc[7] = "Obliczanie produkcji"; //ogame.pl
		T_pc[8] = "&#x41A;&#x430;&#x43B;&#x44C;&#x43A;&#x443;&#x43B;&#x44F;&#x442;&#x43E;&#x440;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x441;&#x442;&#x432;&#x430;"; //ogame.ru
		T_pc[9] = "Productiecalculator"; //ogame.nl
		T_pc[10] = "Calcolatore di produzione"; //ogame.it
		T_pc[11] = "&#xC790;&#xC6D0;&#xC0DD;&#xC0B0;&#x20;&#xACC4;&#xC0B0;&#xAE30;"; //o-game.co.kr
		T_pc[12] = "&#x3A5;&#x3C0;&#x3BF;&#x3BB;&#x3BF;&#x3B3;&#x3B9;&#x3C3;&#x3BC;&#x3CC;&#x3C2;&#x20;&#x3A0;&#x3B1;&#x3C1;&#x3B1;&#x3B3;&#x3C9;&#x3B3;&#x3AE;&#x3C2;"; //ogame.gr
		T_pc[13] = "&Uuml;retim hesaplanmas&#x131;"; //ogame.com.tr
		T_pc[14] = "Calculator productie"; //ogame.ro
		T_pc[15] = "&#x7E3D;&#x7522;&#x80FD;&#x8A08;&#x7B97;"; //ogame.tw
		T_pc[16] = "Produktions regner"; //ogame.dk
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
    	J_mon[0] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="May"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.org
    	J_mon[1] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Fev"; mymonth[2]="Mar"; mymonth[3]="Abr"; mymonth[4]="Mai"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Ago"; mymonth[8]="Set"; mymonth[9]="Out"; mymonth[10]="Nov"; mymonth[11]="Dez";'; //ogame.com.br
    	J_mon[2] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="M&auml;r"; mymonth[3]="Apr"; mymonth[4]="Mai"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Okt"; mymonth[10]="Nov"; mymonth[11]="Dez";'; //ogame.de
    	J_mon[3] = 'var mymonth = new Array(); mymonth[0]="Ene"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Abr"; mymonth[4]="May"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Ago"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dic";'; //ogame.com.es
    	J_mon[4] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="F&eacute;v"; mymonth[2]="Mar"; mymonth[3]="Avr"; mymonth[4]="Mai"; mymonth[5]="Juin"; mymonth[6]="Juil"; mymonth[7]="Aou"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="D&eacute;c";'; //ogame.fr
    	J_mon[5] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Fev"; mymonth[2]="Mar"; mymonth[3]="Abr"; mymonth[4]="Mai"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Ago"; mymonth[8]="Set"; mymonth[9]="Out"; mymonth[10]="Nov"; mymonth[11]="Dez";'; //ogame.com.pt
    	J_mon[6] = 'var mymonth = new Array(); mymonth[0]="Sij"; mymonth[1]="Velj"; mymonth[2]="Ozu"; mymonth[3]="Tra"; mymonth[4]="Svi"; mymonth[5]="Lip"; mymonth[6]="Srp"; mymonth[7]="Kol"; mymonth[8]="Ruj"; mymonth[9]="Lis"; mymonth[10]="Stu"; mymonth[11]="Pro";'; //ogame.ba
    	J_mon[7] = 'var mymonth = new Array(); mymonth[0]="Sty"; mymonth[1]="Lut"; mymonth[2]="Mar"; mymonth[3]="Kwi"; mymonth[4]="Maj"; mymonth[5]="Cze"; mymonth[6]="Lip"; mymonth[7]="Sie"; mymonth[8]="Wrz"; mymonth[9]="Pa&#x017A;"; mymonth[10]="Lis"; mymonth[11]="Gru";'; //ogame.pl
    	J_mon[8] = 'var mymonth = new Array(); mymonth[0]="&#x42F;&#x43D;&#x432;"; mymonth[1]="&#x424;&#x435;&#x432;"; mymonth[2]="&#x41C;&#x430;&#x440;"; mymonth[3]="&#x410;&#x43F;&#x440;"; mymonth[4]="&#x41C;&#x430;&#x439;"; mymonth[5]="&#x418;&#x44E;&#x43D;"; mymonth[6]="&#x418;&#x44E;&#x43B;"; mymonth[7]="&#x410;&#x432;&#x433;"; mymonth[8]="&#x421;&#x435;&#x43D;"; mymonth[9]="&#x41E;&#x43A;&#x442;"; mymonth[10]="&#x41D;&#x43E;&#x44F;"; mymonth[11]="&#x414;&#x435;&#x43A;";'; //ogame.ru
    	J_mon[9] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mrt"; mymonth[3]="Apr"; mymonth[4]="Mei"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Okt"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.nl
    	J_mon[10] = 'var mymonth = new Array(); mymonth[0]="Gen"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="Mag"; mymonth[5]="Giu"; mymonth[6]="Lug"; mymonth[7]="Ago"; mymonth[8]="Set"; mymonth[9]="Ott"; mymonth[10]="Nov"; mymonth[11]="Dic";'; //ogame.it
    	J_mon[11] = 'var mymonth = new Array(); mymonth[0]="1&#xC6D4;"; mymonth[1]="2&#xC6D4;"; mymonth[2]="3&#xC6D4;"; mymonth[3]="4&#xC6D4;"; mymonth[4]="5&#xC6D4;"; mymonth[5]="6&#xC6D4;"; mymonth[6]="7&#xC6D4;"; mymonth[7]="8&#xC6D4;"; mymonth[8]="9&#xC6D4;"; mymonth[9]="10&#xC6D4;"; mymonth[10]="11&#xC6D4;"; mymonth[11]="12&#xC6D4;";'; //o-game.co.kr
    	J_mon[12] = 'var mymonth = new Array(); mymonth[0]="&#x399;&#x3B1;&#x3BD;"; mymonth[1]="&#x3A6;&#x3B5;&#x3B2;"; mymonth[2]="&#x39C;&#x3B1;&#x3C1;"; mymonth[3]="&#x391;&#x3C0;&#x3C1;"; mymonth[4]="&#x39C;&#x3B1;&#x3B9;"; mymonth[5]="&#x399;&#x3BF;&#x3C5;&#x3BD;"; mymonth[6]="&#x399;&#x3BF;&#x3C5;&#x3BB;"; mymonth[7]="&#x391;&#x3C5;&#x3B3;"; mymonth[8]="&#x3A3;&#x3B5;&#x3C0;"; mymonth[9]="&#x39F;&#x3BA;&#x3C4;"; mymonth[10]="&#x39D;&#x3BF;&#x3B5;"; mymonth[11]="&#x394;&#x3B5;&#x3BA;";'; //ogame.gr
    	J_mon[13] = 'var mymonth = new Array(); mymonth[0]="Oca"; mymonth[1]="&#x15E;ub"; mymonth[2]="Mar"; mymonth[3]="Nis"; mymonth[4]="May"; mymonth[5]="Haz"; mymonth[6]="Tem"; mymonth[7]="A&#x11F;u"; mymonth[8]="Eyl"; mymonth[9]="Eki"; mymonth[10]="Kas"; mymonth[11]="Ara";'; //ogame.com.tr
    	J_mon[14] = 'var mymonth = new Array(); mymonth[0]="Ian"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="Mai"; mymonth[5]="Iun"; mymonth[6]="Iul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.ro
    	J_mon[15] = 'var mymonth = new Array(); mymonth[0]="&#x4E00;&#x6708;"; mymonth[1]="&#x4E8C;&#x6708;"; mymonth[2]="&#x4E09;&#x6708;"; mymonth[3]="&#x56DB;&#x6708;"; mymonth[4]="&#x4E94;&#x6708;"; mymonth[5]="&#x516D;&#x6708;"; mymonth[6]="&#x4E03;&#x6708;"; mymonth[7]="&#x516B;&#x6708;"; mymonth[8]="&#x4E5D;&#x6708;"; mymonth[9]="&#x5341;&#x6708;"; mymonth[10]="&#x5341;&#x4E00;&#x6708;"; mymonth[11]="&#x5341;&#x4E8C;&#x6708;";'; //ogame.tw
    	J_mon[16] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="Maj"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Okt"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.dk
		
		var J_rel= new Array(); //21.
			J_rel[0] = "Ready, reloading page..."; //ogame.org
			J_rel[1] = "Pronto, atualizando a p&aacute;gina..."; //ogame.com.br
			J_rel[2] = "Fertig, seite neu laden..."; //ogame.de
			J_rel[3] = "Listo, recargando la p&aacute;gina..."; //ogame.com.es
			J_rel[4] = "Pr&ecirc;t, rechargement de la page..."; //ogame.fr
			J_rel[5] = "Pronto, a actualizar p&aacute;gina..."; //ogame.com.pt
			J_rel[6] = "Spremno, ponovo pokretanje stranice..."; //ogame.ba
			J_rel[7] = "Gotowe, od&#x015B;wie&#x017C;anie strony..."; //ogame.pl
			J_rel[8] = "&#x413;&#x43E;&#x442;&#x43E;&#x432;&#x43E;&#x2C;&#x20;&#x43E;&#x431;&#x43D;&#x43E;&#x432;&#x43B;&#x44F;&#x435;&#x43C;&#x20;&#x441;&#x442;&#x440;&#x430;&#x43D;&#x438;&#x447;&#x43A;&#x443;..."; //ogame.ru
			J_rel[9] = "Klaar, laden van de pagina..."; //ogame.nl
			J_rel[10] = "Pronto, ricaricando la pagina..."; //ogame.it
			J_rel[11] = "&#xC900;&#xBE44;&#xC644;&#xB8CC;&#x2C;&#x20;&#xD398;&#xC774;&#xC9C0;&#xB97C;&#x20;&#xC0C8;&#xB85C;&#xACE0;&#xCE69;&#xB2C8;&#xB2E4;&#x2E;&#x2E;&#x2E;"; //o-game.co.kr
			J_rel[12] = "&#x388;&#x3C4;&#x3BF;&#x3B9;&#x3BC;&#x3BF;&#x2C;&#x20;&#x3B1;&#x3BD;&#x3B1;&#x3BD;&#x3B5;&#x3CE;&#x3BD;&#x3B5;&#x3C4;&#x3B1;&#x3B9;&#x20;&#x3B7;&#x20;&#x3C3;&#x3B5;&#x3BB;&#x3AF;&#x3B4;&#x3B1;&#x2E;&#x2E;&#x2E;"; //ogame.gr
			J_rel[13] = "Haz&#x131;r, sayfa y&uuml;kleniyor..."; //ogame.com.tr
			J_rel[14] = "Gata, reincarcare pagina..."; //ogame.ro
			J_rel[15] = "&#x6E96;&#x5099;&#x5B8C;&#x6210;&#xFF0C;&#x91CD;&#x65B0;&#x5728;&#x5165;&#x9801;&#x9762;..."; //ogame.tw
			J_rel[16] = "FÃƒÆ’Ã‚Â¦rdig, genindlÃƒÆ’Ã‚Â¦ser siden..."; //ogame.dk
			
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
					R_np[0] = "Not all necessary resources are being produced!"; //ogame.org
					R_np[1] = "Nem todos os recursos necess&aacute;rios est&atilde;o sendo produzidos!"; //ogame.com.br
					R_np[2] = "Nicht alle n&ouml;tigen Ressis vorhanden"; //ogame.de
					R_np[3] = "No todos los recursos necesarios est&aacute;n siendo producidos!"; //ogame.com.es
					R_np[4] = "Toutes les ressources n&eacute;cessaires n'ont pas &eacute;t&eacute; produites!"; //ogame.fr
					R_np[5] = "Nem todos os recursos necess&aacute;rios est&atilde;o a ser produzidos!"; //ogame.com.pt
					R_np[6] = "Ne proizvode se svi potrebni resursi!"; //ogame.ba
					R_np[7] = "Brak wszystkich niezb&#x0119;dnych surowc&oacute;w!"; //ogame.pl
					R_np[8] = "&#x41D;&#x435;&#x20;&#x432;&#x441;&#x435;&#x20;&#x43D;&#x443;&#x436;&#x43D;&#x44B;&#x435;&#x20;&#x440;&#x435;&#x441;&#x443;&#x440;&#x441;&#x44B;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x44F;&#x442;&#x441;&#x44F;&#x21;"; //ogame.ru
					R_np[9] = "Je hebt niet genoeg grondstoffen!"; //ogame.nl
					R_np[10] = "Non tutte le risorse necessarie possono essere prodotte!"; //ogame.it
					R_np[11] = "&#xAC1C;&#xBC1C;&#xC5D0;&#x20;&#xD544;&#xC694;&#xD55C;&#x20;&#xC790;&#xC6D0;&#xC774;&#x20;&#xBD80;&#xC871;&#xD569;&#xB2C8;&#xB2E4;&#x21;"; //o-game.co.kr
					R_np[12] = "&#x394;&#x3B5;&#x3BD;&#x20;&#x3C0;&#x3B1;&#x3C1;&#x3AC;&#x3B3;&#x3BF;&#x3BD;&#x3C4;&#x3B1;&#x3B9;&#x20;&#x3CC;&#x3BB;&#x3BF;&#x3B9;&#x20;&#x3BF;&#x3B9;&#x20;&#x3B1;&#x3BD;&#x3B1;&#x3B3;&#x3BA;&#x3B1;&#x3AF;&#x3BF;&#x3B9;&#x20;&#x3C0;&#x3CC;&#x3C1;&#x3BF;&#x3B9;&#x21;"; //ogame.gr
					R_np[13] = "Gerekli malzemeler i&#x15F;lenemiyor!"; //ogame.com.tr
					R_np[14] = "Nu sunt toate resursele necesare!"; //ogame.ro
					R_np[15] = "&#x4E26;&#x975E;&#x6240;&#x6709;&#x5FC5;&#x9808;&#x8CC7;&#x6E90;&#x90FD;&#x5DF2;&#x6E96;&#x5099;&#x5B8C;&#x7562;"; //ogame.tw
					R_np[16] = "Ikke alle n&#248;dvendige ressourcer bliver produceret!"; //ogame.dk
					
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
		cargname[0] = "Cargo Capacity"; //ogame.org
		cargname[1] = "Capacidade de transporte"; //ogame.com.br
		cargname[2] = "Ladekapazit&#xE4;t"; //ogame.de
		cargname[3] = "Capacidad de carga"; //ogame.com.es
		cargname[4] = "Capacit&#xE9; de fret"; //ogame.fr
		cargname[5] = "Capacidade de transporte"; //ogame.com.pt
		cargname[6] = "Kapacitet tereta"; //ogame.ba
		cargname[7] = "&#x141;adowno&#x15B;&#x107;"; //ogame.pl
		cargname[8] = "&#x413;&#x440;&#x443;&#x437;&#x43E;&#x43F;&#x43E;&#x434;&#x44A;&#x451;&#x43C;&#x43D;&#x43E;&#x441;&#x442;&#x44C;"; //ogame.ru
		cargname[9] = "Opslagcapaciteit"; //ogame.nl
		cargname[10] = "Stiva"; //ogame.it
		cargname[11] = "&#xC120;&#xC801;&#x20;&#xACF5;&#xAC04;"; //o-game.co.kr
		cargname[12] = "&#x3A7;&#x3C9;&#x3C1;&#x3B7;&#x3C4;&#x3B9;&#x3BA;&#x3CC;&#x3C4;&#x3B7;&#x3C4;&#x3B1;&#x20;&#x3A6;&#x3BF;&#x3C1;&#x3C4;&#x3AF;&#x3BF;&#x3C5;"; //ogame.gr
		cargname[13] = "Y&#xFC;k kapasitesi"; //ogame.com.tr
		cargname[14] = "Capacitatea Cargo"; //ogame.ro
		cargname[15] = "Cargo Capacity"; //ogame.tw
		cargname[16] = "Fragtkapacitet"; //ogame.dk
		
	var fuelname = new Array(); //32.
		fuelname[0] = "Deuterium consumption"; //ogame.org
		fuelname[1] = "Consumo de deut&eacute;rio"; //ogame.com.br
		fuelname[2] = "Deuteriumverbrauch"; //ogame.de
		fuelname[3] = "Consumo de deuterio"; //ogame.com.es
		fuelname[4] = "Consommation de deut&eacute;rium"; //ogame.fr
		fuelname[5] = "Consumo de deut&eacute;rio"; //ogame.com.pt
		fuelname[6] = "Trosak deuterija"; //ogame.ba
		fuelname[7] = "Deuterium consumption"; //ogame.pl
		fuelname[8] = "Deuterium consumption"; //ogame.ru
		fuelname[9] = "Deuterium verbruik"; //ogame.nl
		fuelname[10] = "Consumo deuterio"; //ogame.it
		fuelname[11] = "Deuterium consumption"; //o-game.co.kr
		fuelname[12] = "Deuterium consumption"; //ogame.gr
		fuelname[13] = "Deuterium consumption"; //ogame.com.tr
		fuelname[14] = "Deuteriul consumat"; //ogame.ro
		fuelname[15] = "Deuterium consumption"; //ogame.tw
		fuelname[16] = "Deuterium consumption"; //ogame.dk
		
	var speedname = new Array(); //33.
		speedname[0] = "Speed"; //ogame.org
		speedname[1] = "Velocidade"; //ogame.com.br
		speedname[2] = "Geschwindigkeit"; //ogame.de
		speedname[3] = "Velocidad"; //ogame.com.es
		speedname[4] = "Vitesse"; //ogame.fr
		speedname[5] = "Velocidade"; //ogame.com.pt
		speedname[6] = "Brzina"; //ogame.ba
		speedname[7] = "Speed"; //ogame.pl
		speedname[8] = "Speed"; //ogame.ru
		speedname[9] = "Snelheid"; //ogame.nl
		speedname[10] = "Velocit&agrave;"; //ogame.it
		speedname[11] = "Speed"; //o-game.co.kr
		speedname[12] = "Speed"; //ogame.gr
		speedname[13] = "H&#253;z"; //ogame.com.tr
		speedname[14] = "Viteza"; //ogame.ro
		speedname[15] = "Speed"; //ogame.tw
		speedname[16] = "Speed"; //ogame.dk
		
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
		transpcalc[0] = "Transport calculator"; //ogame.org
		transpcalc[1] = "Transport calculator"; //ogame.com.br
		transpcalc[2] = "Transport calculator"; //ogame.de
		transpcalc[3] = "Calculadora de transporte"; //ogame.com.es
		transpcalc[4] = "Calculateur de transport"; //ogame.fr
		transpcalc[5] = "Transport calculator"; //ogame.com.pt
		transpcalc[6] = "Transport calculator"; //ogame.ba
		transpcalc[7] = "Transport calculator"; //ogame.pl
		transpcalc[8] = "Transport calculator"; //ogame.ru
		transpcalc[9] = "Transport calculator"; //ogame.nl
		transpcalc[10] = "Transport calculator"; //ogame.it
		transpcalc[11] = "Transport calculator"; //o-game.co.kr
		transpcalc[12] = "Transport calculator"; //ogame.gr
		transpcalc[13] = "Nakliye Hesaplay&#253;c&#253;s&#253;"; //ogame.com.tr
		transpcalc[14] = "Transport calculator"; //ogame.ro
		transpcalc[15] = "Transport calculator"; //ogame.tw
		transpcalc[16] = "Transport calculator"; //ogame.dk
	
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
					L_har[0] = "Harvest"; //ogame.org
					L_har[1] = "Recolher"; //ogame.com.br
					L_har[2] = "Tr&uuml;mmerfeld"; //ogame.de
					L_har[3] = "Recolectar"; //ogame.com.es
					L_har[4] = "Recycler"; //ogame.fr
					L_har[5] = "Recolher"; //ogame.com.pt
					L_har[6] = "Vaditi"; //ogame.ba
					L_har[7] = "Zbieraj"; //ogame.pl
					L_har[8] = "&#x421;&#x43E;&#x431;&#x440;&#x430;&#x442;&#x44C;"; //ogame.ru
					L_har[9] = "Opruimen"; //ogame.nl
					L_har[10] = "Raccogli"; //ogame.it
					L_har[11] = "&#xC218;&#xD655;"; //o-game.co.kr
					L_har[12] = "&#x3A3;&#x3C5;&#x3B3;&#x3BA;&#x3BF;&#x3BC;&#x3B9;&#x3B4;&#x3AE;"; //ogame.gr
					L_har[13] = "Toplamak"; //ogame.com.tr
					L_har[14] = "Colectare"; //ogame.ro
					L_har[15] = "&#x6536;&#x7A6B;"; //ogame.tw
					L_har[16] = "Recycle"; //ogame.dk
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
					L_spy[0] = "Espionage"; //ogame.org
					L_spy[1] = "Espiar"; //ogame.com.br
					L_spy[2] = "Spioneren"; //ogame.de
					L_spy[3] = "Espiar"; //ogame.com.es
					L_spy[4] = "Espionner"; //ogame.fr
					L_spy[5] = "Espiar"; //ogame.com.pt
					L_spy[6] = "Spijuniranje"; //ogame.ba
					L_spy[7] = "Szpiegowanie"; //ogame.pl
					L_spy[8] = "&#x428;&#x43F;&#x438;&#x43E;&#x43D;&#x430;&#x436;"; //ogame.ru
					L_spy[9] = "Spioneren"; //ogame.nl
					L_spy[10] = "Spia"; //ogame.it
					L_spy[11] = "&#xC815;&#xD0D0;"; //o-game.co.kr
					L_spy[12] = "&#x39A;&#x3B1;&#x3C4;&#x3B1;&#x3C3;&#x3BA;&#x3BF;&#x3C0;&#x3AF;&#x3B1;"; //ogame.gr
					L_spy[13] = "Casusluk"; //ogame.com.tr
					L_spy[14] = "Spionaj"; //ogame.ro
					L_spy[15] = "&#x9593;&#x8ADC;"; //ogame.tw
					L_spy[16] = "Spioner"; //ogame.dk
					
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
		L_pch[0] = "hours of production"; //ogame.org
		L_pch[1] = "horas de produ&ccedil;&atilde;o"; //ogame.com.br
		L_pch[2] = "Produktion in Stunden"; //ogame.de
		L_pch[3] = "Horas de producci&oacute;n"; //ogame.com.es
		L_pch[4] = "Heures de production"; //ogame.fr
		L_pch[5] = "horas de produ&ccedil;&atilde;o"; //ogame.com.pt
		L_pch[6] = "sati proizvodnje"; //ogame.ba
		L_pch[7] = "Godzinna produkcja"; //ogame.pl
		L_pch[8] = "&#x447;&#x430;&#x441;&#x43E;&#x432;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x441;&#x442;&#x432;&#x430;"; //ogame.ru
		L_pch[9] = "uur inkomsten produceert"; //ogame.nl
		L_pch[10] = "ore di produzione"; //ogame.it
		L_pch[11] = "&#xC2DC;&#xAC04;&#x20;&#xB3D9;&#xC548;&#xC758;&#x20;&#xC0DD;&#xC0B0;&#xB7C9;"; //o-game.co.kr
		L_pch[12] = "&#x38F;&#x3C1;&#x3B5;&#x3C2;&#x20;&#x3A0;&#x3B1;&#x3C1;&#x3B1;&#x3B3;&#x3C9;&#x3B3;&#x3AE;&#x3C2;"; //ogame.gr
		L_pch[13] = "Saatlik &uuml;retim"; //ogame.com.tr
		L_pch[14] = "ore de productie"; //ogame.ro
		L_pch[15] = "&#x5C0F;&#x6642;&#x7522;&#x91CF;"; //ogame.tw
		L_pch[16] = "timers produktion"; //ogame.dk
		
	var L_pcd = new Array(); //30.
		L_pcd[0] = "days of production"; //ogame.org
		L_pcd[1] = "dias de produ&ccedil;&atilde;o"; //ogame.com.br
		L_pcd[2] = "Produktion in Tagen"; //ogame.de
		L_pcd[3] = "D&iacute;as de producci&oacute;n"; //ogame.com.es
		L_pcd[4] = "Jours de production"; //ogame.fr
		L_pcd[5] = "dias de produ&ccedil;&atilde;o"; //ogame.com.pt
		L_pcd[6] = "dani proizvodnje"; //ogame.ba
		L_pcd[7] = "Dzienna produkcja"; //ogame.pl
		L_pcd[8] = "&#x434;&#x43D;&#x435;&#x439;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x441;&#x442;&#x432;&#x430;"; //ogame.ru
		L_pcd[9] = "dagen inkomsten produceert"; //ogame.nl
		L_pcd[10] = "giorni di produzione"; //ogame.it
		L_pcd[11] = "&#xC77C;&#x20;&#xB3D9;&#xC548;&#xC758;&#x20;&#xC0DD;&#xC0B0;&#xB7C9;"; //o-game.co.kr
		L_pcd[12] = "&#x39C;&#x3AD;&#x3C1;&#x3B5;&#x3C2;&#x20;&#x3A0;&#x3B1;&#x3C1;&#x3B1;&#x3B3;&#x3C9;&#x3B3;&#x3AE;&#x3C2;"; //ogame.gr
		L_pcd[13] = "G&uuml;nl&uuml;k &uuml;retim"; //ogame.com.tr
		L_pcd[14] = "zile de productie"; //ogame.ro
		L_pcd[15] = "&#x65E5;&#x7522;&#x91CF;"; //ogame.tw
		L_pcd[16] = "dages produktion"; //ogame.dk
		
	var L_stoc = new Array(); //31.
		L_stoc[0] = "Storage"; //ogame.org
		L_stoc[1] = "Armazenamento"; //ogame.com.br
		L_stoc[2] = "Lagerkapazit&auml;t"; //ogame.de
		L_stoc[3] = "Almacenamiento"; //ogame.com.es
		L_stoc[4] = "Stockage"; //ogame.fr
		L_stoc[5] = "Armazenamento"; //ogame.com.pt
		L_stoc[6] = "Skladiste"; //ogame.ba
		L_stoc[7] = "Magazyn"; //ogame.pl
		L_stoc[8] = "&#x425;&#x440;&#x430;&#x43D;&#x438;&#x43B;&#x438;&#x449;&#x435;"; //ogame.ru
		L_stoc[9] = "Opslag"; //ogame.nl
		L_stoc[10] = "Deposito"; //ogame.it
		L_stoc[11] = "&#xC800;&#xC7A5;&#xD0F1;&#xD06C;"; //o-game.co.kr
		L_stoc[12] = "&#x391;&#x3C0;&#x3BF;&#x3B8;&#x3AE;&#x3BA;&#x3B7;"; //ogame.gr
		L_stoc[13] = "Depo"; //ogame.com.tr
		L_stoc[14] = "Depozitare"; //ogame.ro
		L_stoc[15] = "&#x5132;&#x5B58;&#x91CF;"; //ogame.tw
		L_stoc[16] = "Opbevaring"; //ogame.dk
		
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
		LT_loc[0] = "Local time"; //ogame.org
		LT_loc[1] = "Hora local"; //ogame.com.br
		LT_loc[2] = "Local time"; //ogame.de
		LT_loc[3] = "Hora local"; //ogame.com.es
		LT_loc[4] = "Temps local"; //ogame.fr
		LT_loc[5] = "Hora local"; //ogame.com.pt
		LT_loc[6] = "Lokalno vrijeme"; //ogame.ba
		LT_loc[7] = "Local time"; //ogame.pl
		LT_loc[8] = "&#1084;&#1077;&#1089;&#1090;&#1085;&#1086;&#1077; &#1074;&#1088;&#1077;&#1084;&#1103;"; //ogame.ru
		LT_loc[9] = "Local time"; //ogame.nl
		LT_loc[10] = "Local time"; //ogame.it
		LT_loc[11] = "Local time"; //o-game.co.kr
		LT_loc[12] = "Local time"; //ogame.gr
		LT_loc[13] = "Local time"; //ogame.com.tr
		LT_loc[14] = "Local time"; //ogame.ro
		LT_loc[15] = "Local time"; //ogame.tw
		LT_loc[16] = "Lokal Tid"; //ogame.dk

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
		T_rc[0] = "Resources Colors"; //ogame.org
		T_rc[1] = "Cores dos Recursos"; //ogame.com.br
		T_rc[2] = "Farben der Rohstoffe"; //ogame.de
		T_rc[3] = "Color de los recursos"; //ogame.com.es
		T_rc[4] = "Couleurs des ressources"; //ogame.fr
		T_rc[5] = "Cores dos Recursos"; //ogame.com.pt
		T_rc[6] = "Boje resursa"; //ogame.ba
		T_rc[7] = "Kolor szcz&#x0105;t&oacute;w"; //ogame.pl
		T_rc[8] = "&#x426;&#x432;&#x435;&#x442;&#x430;&#x20;&#x440;&#x435;&#x441;&#x443;&#x440;&#x441;&#x43E;&#x432;"; //ogame.ru
		T_rc[9] = "Kleur voor de grondstoffen"; //ogame.nl
		T_rc[10] = "Colori delle risorse"; //ogame.it
		T_rc[11] = "&#xC790;&#xC6D0;&#x20;&#xC0C9;&#xAE54;"; //o-game.co.kr
		T_rc[12] = "&#x3A7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;&#x3C4;&#x3B1;&#x20;&#x3C0;&#x3CC;&#x3C1;&#x3C9;&#x3BD;"; //ogame.gr
		T_rc[13] = "Kaynak renkleri"; //ogame.com.tr
		T_rc[14] = "Culorile resurselor"; //ogame.ro
		T_rc[15] = "&#x8CC7;&#x6E90;&#x5B57;&#x578B;&#x984F;&#x8272;"; //ogame.tw
		T_rc[16] = "Ressource Farver"; //ogame.dk
		
	var L_mc = new Array(); //3.
		L_mc[0] = "Metal color"; //ogame.org
		L_mc[1] = "Cor do metal"; //ogame.com.br
		L_mc[2] = "Farbe Metall"; //ogame.de
		L_mc[3] = "Color del metal"; //ogame.com.es
		L_mc[4] = "Couleur du m&eacute;tal"; //ogame.fr
		L_mc[5] = "Cor do metal"; //ogame.com.pt
		L_mc[6] = "Boja metala"; //ogame.ba
		L_mc[7] = "Kolor metalu"; //ogame.pl
		L_mc[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x43C;&#x435;&#x442;&#x430;&#x43B;&#x43B;&#x430;"; //ogame.ru
		L_mc[9] = "Kleur voor metaal"; //ogame.nl
		L_mc[10] = "Colore del Metallo"; //ogame.it
		L_mc[11] = "&#xBA54;&#xD0C8;&#x20;&#xC0C9;&#xAE54;"; //o-game.co.kr
		L_mc[12] = "&#x3A7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;&#x20;&#x39C;&#x3B5;&#x3C4;&#x3AC;&#x3BB;&#x3BB;&#x3BF;&#x3C5;"; //ogame.gr
		L_mc[13] = "Metal rengi"; //ogame.com.tr
		L_mc[14] = "Culoarea metalului"; //ogame.ro
		L_mc[15] = "&#x91D1;&#x5C6C;&#x984F;&#x8272;"; //ogame.tw
		L_mc[16] = "Metal farve"; //ogame.dk
		
	var L_cc = new Array(); //4.
		L_cc[0] = "Crystal color"; //ogame.org
		L_cc[1] = "Cor do cristal"; //ogame.com.br
		L_cc[2] = "Farbe Kristall"; //ogame.de
		L_cc[3] = "Color del cristal"; //ogame.com.es
		L_cc[4] = "Couleur du cristal"; //ogame.fr
		L_cc[5] = "Cor do cristal"; //ogame.com.pt
		L_cc[6] = "Boja kristala"; //ogame.ba
		L_cc[7] = "Kolor kryszta&#x0142;u "; //ogame.pl
		L_cc[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x43A;&#x440;&#x438;&#x441;&#x442;&#x430;&#x43B;&#x43B;&#x430;"; //ogame.ru
		L_cc[9] = "Kleur voor kristal"; //ogame.nl
		L_cc[10] = "Colore del Cristallo"; //ogame.it
		L_cc[11] = "&#xD06C;&#xB9AC;&#xC2A4;&#xD0C8;&#x20;&#xC0C9;&#xAE54;"; //o-game.co.kr
		L_cc[12] = "&#x3A7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;&#x20;&#x39A;&#x3C1;&#x3C5;&#x3C3;&#x3C4;&#x3AC;&#x3BB;&#x3BB;&#x3BF;&#x3C5;"; //ogame.gr
		L_cc[13] = "Kristal rengi"; //ogame.com.tr
		L_cc[14] = "Culoarea cristalului"; //ogame.ro
		L_cc[15] = "&#x6676;&#x9AD4;&#x984F;&#x8272;"; //ogame.tw
		L_cc[16] = "Krystal farve"; //ogame.dk
		
	var L_dc = new Array(); //5.
		L_dc[0] = "Deuterium color"; //ogame.org
		L_dc[1] = "Cor do deut&eacute;rio"; //ogame.com.br
		L_dc[2] = "Farbe Deuterium"; //ogame.de
		L_dc[3] = "Color del deuterio"; //ogame.com.es
		L_dc[4] = "Couleur du deut&eacute;rium"; //ogame.fr
		L_dc[5] = "Cor do deut&eacute;rio"; //ogame.com.pt
		L_dc[6] = "Boja deuterija"; //ogame.ba
		L_dc[7] = "Kolor deuteru"; //ogame.pl
		L_dc[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x434;&#x435;&#x439;&#x442;&#x435;&#x440;&#x438;&#x44F;"; //ogame.ru
		L_dc[9] = "Kleur voor deuterium"; //ogame.nl
		L_dc[10] = "Colore del Deuterio"; //ogame.it
		L_dc[11] = "&#xB4C0;&#xD14C;&#xB968;&#x20;&#xC0C9;&#xAE54;"; //o-game.co.kr
		L_dc[12] = "&#x3A7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;&#x20;&#x394;&#x3B5;&#x3C5;&#x3C4;&#x3AD;&#x3C1;&#x3B9;&#x3BF;&#x3C5;"; //ogame.gr
		L_dc[13] = "Deuterium rengi"; //ogame.com.tr
		L_dc[14] = "Culoarea deuteriului"; //ogame.ro
		L_dc[15] = "&#x91CD;&#x6C2B;&#x984F;&#x8272;"; //ogame.tw
		L_dc[16] = "Deuterium farve"; //ogame.dk
		
	var L_ec = new Array(); //6.
		L_ec[0] = "Energy color"; //ogame.org
		L_ec[1] = "Cor da energia"; //ogame.com.br
		L_ec[2] = "Farbe Energie"; //ogame.de
		L_ec[3] = "Color de la energ&iacute;a"; //ogame.com.es
		L_ec[4] = "Couleur de l'&eacute;nergie"; //ogame.fr
		L_ec[5] = "Cor da energia"; //ogame.com.pt
		L_ec[6] = "Boja energije"; //ogame.ba
		L_ec[7] = "Kolor energii"; //ogame.pl
		L_ec[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x44D;&#x43D;&#x435;&#x440;&#x433;&#x438;&#x438;"; //ogame.ru
		L_ec[9] = "Kleur voor energie"; //ogame.nl
		L_ec[10] = "Colore dell'Energia"; //ogame.it
		L_ec[11] = "&#xC5D0;&#xB108;&#xC9C0;&#x20;&#xC0C9;&#xAE54;"; //o-game.co.kr
		L_ec[12] = "&#x3A7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;&#x20;&#x395;&#x3BD;&#x3AD;&#x3C1;&#x3B3;&#x3B5;&#x3B9;&#x3B1;&#x3C2;"; //ogame.gr
		L_ec[13] = "Enerji rengi"; //ogame.com.tr
		L_ec[14] = "Culoarea energiei"; //ogame.ro
		L_ec[15] = "&#x80FD;&#x91CF;&#x984F;&#x8272;"; //ogame.tw
		L_ec[16] = "Energi farve"; //ogame.dk
		
	var R_rt = new Array(); //7.
		R_rt[0] = "One click to reset the color, double-click to erase the color"; //ogame.org
		R_rt[1] = "Um clique para reiniciar a cor, duplo-clique para apagar a cor"; //ogame.com.br
		R_rt[2] = "Einfach-klick setzt die Farbe zur&uuml;ck, doppel-klick l&ouml;scht die Farbe"; //ogame.de
		R_rt[3] = "Un click para restaurar el color, doble-click para borrar color"; //ogame.com.es
		R_rt[4] = "Un clic pour r&eacute;initialiser la couleur, double-clic pour effacer la couleur"; //ogame.fr
		R_rt[5] = "Um clique para reiniciar a cor, duplo-clique para apagar a cor"; //ogame.com.pt
		R_rt[6] = "Jedan klik za resetiranje boje, dupli klik za brisanje boje"; //ogame.ba
		R_rt[7] = "Jedno klikni&#x0119;cie spowoduje reset kolor&oacute;w, podw&oacute;jne klikni&#x0119;cie zresetuje je"; //ogame.pl
		R_rt[8] = "&#x41E;&#x434;&#x438;&#x43D;&#x20;&#x43A;&#x43B;&#x438;&#x43A;&#x20;&#x434;&#x43B;&#x44F;&#x20;&#x441;&#x431;&#x440;&#x43E;&#x441;&#x430;&#x20;&#x446;&#x432;&#x435;&#x442;&#x430;&#x2C;&#x20;&#x434;&#x432;&#x43E;&#x439;&#x43D;&#x43E;&#x439;&#x20;&#x43A;&#x43B;&#x438;&#x43A;&#x20;&#x434;&#x43B;&#x44F;&#x20;&#x443;&#x434;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x44F;&#x20;&#x446;&#x432;&#x435;&#x442;&#x430;"; //ogame.ru
		R_rt[9] = "Klik &eacute;&eacute;nmaal om de kleur te resetten, tweemaal om de kleur te wissen"; //ogame.nl
		R_rt[10] = "Un click per ripristinare il colore, doppio click per cancellare il colore"; //ogame.it
		R_rt[11] = "&#xD074;&#xB9AD;&#xD558;&#xBA74;&#x20;&#xCD08;&#xAE30;&#xC124;&#xC815;&#xC73C;&#xB85C;&#x20;&#xB418;&#xB3CC;&#xB9AC;&#xACE0;&#x2C;&#x20;&#xB354;&#xBE14;&#x2D;&#xD074;&#xB9AD;&#xD558;&#xBA74;&#x20;&#xC0C9;&#xAE54;&#xC744;&#x20;&#xC9C0;&#xC6C1;&#xB2C8;&#xB2E4;"; //o-game.co.kr
		R_rt[12] = "&#x388;&#x3BD;&#x3B1;&#x20;&#x3BA;&#x3BB;&#x3B9;&#x3BA;&#x20;&#x3B3;&#x3B9;&#x3B1;&#x20;&#x3B5;&#x3C0;&#x3B1;&#x3BD;&#x3B1;&#x3C6;&#x3BF;&#x3C1;&#x3AC;&#x20;&#x3C3;&#x3C4;&#x3BF;&#x20;&#x3B1;&#x3C1;&#x3C7;&#x3B9;&#x3BA;&#x3CC;&#x20;&#x3C7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;&#x2C;&#x20;&#x3B4;&#x3CD;&#x3BF;&#x20;&#x3B3;&#x3B9;&#x3B1;&#x20;&#x3BD;&#x3B1;&#x20;&#x3B4;&#x3B9;&#x3B1;&#x3B3;&#x3C1;&#x3AC;&#x3C6;&#x3B5;&#x3B9;&#x20;&#x3C4;&#x3BF;&#x20;&#x3C7;&#x3C1;&#x3CE;&#x3BC;&#x3B1;"; //ogame.gr
		R_rt[13] = "Tek t&#x131;klama renkleri s&#x131;f&#x131;rla, &ccedil;ift t&#x131;klama rengi iptal etmek"; //ogame.com.tr
		R_rt[14] = "Un click pentru reset, dublu click pentru stergerea culorii"; //ogame.ro
		R_rt[15] = "&#x55AE;&#x9EDE;&#x5247;&#x91CD;&#x7F6E;&#x984F;&#x8272;&#xFF0C;&#x5FEB;&#x9EDE;&#x5169;&#x4E0B;&#x5247;&#x6D88;&#x9664;&#x984F;&#x8272;"; //ogame.tw
		R_rt[16] = "Et klik nulstiller farven, dobbelt-klik fjerner farven"; //ogame.dk
		
	var T_ar = new Array(); //8.
		T_ar[0] = "Advertisement Remover"; //ogame.org
		T_ar[1] = "Removedor de publicidade"; //ogame.com.br
		T_ar[2] = "Werbung deaktivieren"; //ogame.de
		T_ar[3] = "Removedor de publicidad"; //ogame.com.es
		T_ar[4] = "Supprimeur de publicit&eacute;s"; //ogame.fr
		T_ar[5] = "Removedor de publicidade"; //ogame.com.pt
		T_ar[6] = "Uklanjanje reklama"; //ogame.ba
		T_ar[7] = "Usuwanie reklam"; //ogame.pl
		T_ar[8] = "&#x423;&#x434;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x435;&#x20;&#x440;&#x435;&#x43A;&#x43B;&#x430;&#x43C;&#x44B;"; //ogame.ru
		T_ar[9] = "Advertenties verwijderen"; //ogame.nl
		T_ar[10] = "Elimina Pubblicit&agrave;"; //ogame.it
		T_ar[11] = "&#xAD11;&#xACE0;&#x20;&#xC81C;&#xAC70;"; //o-game.co.kr
		T_ar[12] = "&#x391;&#x3C6;&#x3B1;&#x3AF;&#x3C1;&#x3B5;&#x3C3;&#x3B7;&#x20;&#x394;&#x3B9;&#x3B1;&#x3C6;&#x3B7;&#x3BC;&#x3AF;&#x3C3;&#x3B5;&#x3C9;&#x3BD;"; //ogame.gr
		T_ar[13] = "Reklamlar&#x131;n yokedilmesi"; //ogame.com.tr
		T_ar[14] = "Fara publicitate"; //ogame.ro
		T_ar[15] = "&#x5EE3;&#x544A;&#x79FB;&#x9664;"; //ogame.tw
		T_ar[16] = "Reklame fjerner"; //ogame.dk
		
	var L_sa = new Array(); //9.
		L_sa[0] = "Normal ads"; //ogame.org
		L_sa[1] = "Publicidades normais"; //ogame.com.br
		L_sa[2] = "Normale Werbung"; //ogame.de
		L_sa[3] = "Publicidad normal"; //ogame.com.es
		L_sa[4] = "Publicit&eacute;s normales"; //ogame.fr
		L_sa[5] = "Pubs normais"; //ogame.com.pt
		L_sa[6] = "Normalno"; //ogame.ba
		L_sa[7] = "Zwyk&#x0142;e reklamy"; //ogame.pl
		L_sa[8] = "&#x41E;&#x431;&#x44B;&#x43A;&#x43D;&#x43E;&#x432;&#x435;&#x43D;&#x43D;&#x430;&#x44F;&#x20;&#x440;&#x435;&#x43A;&#x43B;&#x430;&#x43C;&#x430;"; //ogame.ru
		L_sa[9] = "Normale advertenties"; //ogame.nl
		L_sa[10] = "Annunci normali"; //ogame.it
		L_sa[11] = "&#xC77C;&#xBC18;&#x20;&#xAD11;&#xACE0;"; //o-game.co.kr
		L_sa[12] = "&#x39A;&#x3B1;&#x3BD;&#x3BF;&#x3BD;&#x3B9;&#x3BA;&#x3AD;&#x3C2;&#x20;&#x394;&#x3B9;&#x3B1;&#x3C6;&#x3B7;&#x3BC;&#x3AF;&#x3C3;&#x3B5;&#x3B9;&#x3C2;"; //ogame.gr
		L_sa[13] = "Normal reklam"; //ogame.com.tr
		L_sa[14] = "Adaugari normale"; //ogame.ro
		L_sa[15] = "&#x6B63;&#x5E38;&#x5EE3;&#x544A;"; //ogame.tw
		L_sa[16] = "Normale reklamer"; //ogame.dk
		
	/*var L_coa = new Array(); //10.
		L_coa[0] = "Commander Info ad link"; //ogame.org
		L_coa[1] = "Link de publicidade Informa&ccedil;&atilde;o comandante"; //ogame.com.br
		L_coa[2] = "Commander-Links im Men&uuml;"; //ogame.de
		L_coa[3] = "Enlace Info Comandante"; //ogame.com.es
		L_coa[4] = "Lien de pub Info Commandant"; //ogame.fr
		L_coa[5] = "Link de pub Informa&ccedil;&atilde;o comandante"; //ogame.com.pt
		L_coa[6] = "Commander Info link"; //ogame.ba
		L_coa[7] = "Link do informacji o komandorze"; //ogame.pl
		L_coa[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x22;&#x418;&#x43D;&#x444;&#x43E;&#x440;&#x43C;&#x430;&#x446;&#x438;&#x44F;&#x20;&#x43E;&#x20;&#x441;&#x442;&#x430;&#x442;&#x443;&#x441;&#x435;&#x20;&#x43A;&#x43E;&#x43C;&#x430;&#x43D;&#x434;&#x438;&#x440;&#x430;&#x22;"; //ogame.ru
		L_coa[9] = "Commander advertentielink"; //ogame.nl
		L_coa[10] = "Pubblicit&agrave; Commander Info"; //ogame.it
		L_coa[11] = "&#xC0AC;&#xB839;&#xAD00;&#x20;&#xC635;&#xC158;&#x20;&#xB9C1;&#xD06C;"; //o-game.co.kr
		L_coa[12] = "&#x394;&#x3B9;&#x3B1;&#x3C6;&#x3B7;&#x3BC;&#x3B9;&#x3C3;&#x3C4;&#x3B9;&#x3BA;&#x3CC;&#x20;&#x39A;&#x3BF;&#x3C5;&#x3BC;&#x3C0;&#x3AF;&#x20;&#x3A0;&#x3BB;&#x3B7;&#x3C1;&#x3BF;&#x3C6;&#x3BF;&#x3C1;&#x3AF;&#x3B5;&#x3C2;&#x20;&#x394;&#x3B9;&#x3BF;&#x3B9;&#x3BA;&#x3B7;&#x3C4;&#x3AE;"; //ogame.gr
		L_coa[13] = "Commander bilgi ve linki"; //ogame.com.tr
		L_coa[14] = "Adauga link-ul Commander Info"; //ogame.ro
		L_coa[15] = "&#x6307;&#x63EE;&#x5B98;&#x5EE3;&#x544A;&#x9023;&#x7D50;&#x79FB;&#x9664;"; //ogame.tw
		L_coa[16] = "Commander Info reklame"; //ogame.dk
	*/
	
	var L_dm = new Array(); //10.
	  L_dm[0] = "Dark Matter Icon"; //ogame.org
		L_dm[1] = "Icone Materia Oscura"; //ogame.com.br
		L_dm[2] = "Dark Matter Icon"; //ogame.de
		L_dm[3] = "Icono de Materia Oscura"; //ogame.com.es
		L_dm[4] = "Ic&#244;ne Antimati&#232;re"; //ogame.fr
		L_dm[5] = "Icone Materia Oscura"; //ogame.com.pt
		L_dm[6] = "Ikona crne materij"; //ogame.ba
		L_dm[7] = "Dark Matter Icon"; //ogame.pl
		L_dm[8] = "&#1048;&#1082;&#1086;&#1085;&#1082;&#1072; &#1058;&#1077;&#1084;&#1085;&#1086;&#1081; &#1052;&#1072;&#1090;&#1077;&#1088;&#1080;&#1080;"; //ogame.ru
		L_dm[9] = "Dark Matter Icon"; //ogame.nl
		L_dm[10] = "Dark Matter Icon"; //ogame.it
		L_dm[11] = "Dark Matter Icon"; //o-game.co.kr
		L_dm[12] = "Dark Matter Icon"; //ogame.gr
		L_dm[13] = "Dark Matter Icon"; //ogame.com.tr
		L_dm[14] = "Dark Matter Icon"; //ogame.ro
		L_dm[15] = "Dark Matter Icon"; //ogame.tw
		L_dm[16] = "M&#248;rk Materie"; //ogame.dk
		
	var L_ica = new Array(); //11.
		L_ica[0] = "Officer's Casino ad link"; //ogame.org
		L_ica[1] = "Link de publicidade de Oficiais"; //ogame.com.br
		L_ica[2] = "Offiziers-Links im Men&uuml;"; //ogame.de
		L_ica[3] = "Enlace Casino de los Oficiales"; //ogame.com.es
		L_ica[4] = "Lien de pub Casino d'Officiers"; //ogame.fr
		L_ica[5] = "Link de pub Casino de Oficiais"; //ogame.com.pt
		L_ica[6] = "Officer's Casino link"; //ogame.ba
		L_ica[7] = "Link do informacji o oficerach"; //ogame.pl
		L_ica[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x22;&#x41E;&#x444;&#x438;&#x446;&#x435;&#x440;&#x441;&#x43A;&#x43E;&#x433;&#x43E;&#x20;&#x43A;&#x430;&#x437;&#x438;&#x43D;&#x43E;&#x22;"; //ogame.ru
		L_ica[9] = "Officierscasino advertentielink"; //ogame.nl
		L_ica[10] = "Pubblicit&agrave; Officiers"; //ogame.it
		L_ica[11] = "&#xC7A5;&#xAD50;&#xC758;&#x20;&#xCE74;&#xC9C0;&#xB178;&#x20;&#xB9C1;&#xD06C;"; //o-game.co.kr
		L_ica[12] = "&#x394;&#x3B9;&#x3B1;&#x3C6;&#x3B7;&#x3BC;&#x3B9;&#x3C3;&#x3C4;&#x3B9;&#x3BA;&#x3CC;&#x20;&#x39A;&#x3BF;&#x3C5;&#x3BC;&#x3C0;&#x3AF;&#x20;&#x39B;&#x3AD;&#x3C3;&#x3C7;&#x3B7;&#x20;&#x391;&#x3BE;&#x3B9;&#x3C9;&#x3BC;&#x3B1;&#x3C4;&#x3B9;&#x3BA;&#x3CE;&#x3BD;"; //ogame.gr
		L_ica[13] = "Officer bilgi ve linki"; //ogame.com.tr
		L_ica[14] = "Adauga link-ul Officer's Casino"; //ogame.ro
		L_ica[15] = "Officer's Casino ad link"; //ogame.tw
		L_ica[16] = "Officer's Casino reklame"; //ogame.dk
		
	var L_topa = new Array(); //12.
		L_topa[0] = "Top upgrade icons ads"; //ogame.org
		L_topa[1] = "Publicidade &iacute;cones de upgrade"; //ogame.com.br
		L_topa[2] = "Offizier Icons"; //ogame.de
		L_topa[3] = "Iconos de oficiales de arriba"; //ogame.com.es
		L_topa[4] = "Ic&ocirc;nes de publicit&eacute; sup&eacute;rieures"; //ogame.fr
		L_topa[5] = "Pub &iacute;cones de upgrade"; //ogame.com.pt
		L_topa[6] = "Top upgrade ikone"; //ogame.ba
		L_topa[7] = "Ikony z reklamami"; //ogame.pl
		L_topa[8] = "&#x418;&#x43A;&#x43E;&#x43D;&#x43A;&#x438;&#x20;&#x430;&#x43F;&#x433;&#x440;&#x435;&#x439;&#x434;&#x43E;&#x432;&#x20;&#x432;&#x432;&#x435;&#x440;&#x445;&#x443;"; //ogame.ru
		L_topa[9] = "Bovenste icoonadvertenties"; //ogame.nl
		L_topa[10] = "Icone in alto dell'aggiornamento"; //ogame.it
		L_topa[11] = "&#xC704;&#xCABD;&#x20;&#xC5C5;&#xADF8;&#xB808;&#xC774;&#xB4DC;&#x20;&#xAD11;&#xACE0;&#x20;&#xC544;&#xC774;&#xCF58;"; //o-game.co.kr
		L_topa[12] = "&#x394;&#x3B9;&#x3B1;&#x3C6;&#x3B7;&#x3BC;&#x3B9;&#x3C3;&#x3C4;&#x3B9;&#x3BA;&#x3AC;&#x20;&#x39A;&#x3BF;&#x3C5;&#x3BC;&#x3C0;&#x3B9;&#x3AC;&#x20;&#x3C0;&#x3B1;&#x3C1;&#x3B1;&#x3B3;&#x3B3;&#x3B5;&#x3BB;&#x3B9;&#x3CE;&#x3BD;&#x20;&#x3C0;&#x3AC;&#x3BD;&#x3C9;"; //ogame.gr
		L_topa[13] = "Top upgrade icons ads"; //ogame.com.tr
		L_topa[14] = "Icon-uri superioare pentru upgrade"; //ogame.ro
		L_topa[15] = "&#x9867;&#x554F;&#x5EE3;&#x544A;&#x9023;&#x7D50;&#x79FB;&#x9664;"; //ogame.tw
		L_topa[16] = "De &#xF8;verste opdaterings ikoner"; //ogame.dk
		
	var T_ut = new Array(); //13.
		T_ut[0] = "Utilities"; //ogame.org
		T_ut[1] = "Utilit&aacute;rios"; //ogame.com.br
		T_ut[2] = "Zus&auml;tzliches"; //ogame.de
		T_ut[3] = "Utilidades"; //ogame.com.es
		T_ut[4] = "Utilitaires"; //ogame.fr
		T_ut[5] = "Utilidades"; //ogame.com.pt
		T_ut[6] = "Alati"; //ogame.ba
		T_ut[7] = "Dodatki"; //ogame.pl
		T_ut[8] = "&#x423;&#x442;&#x438;&#x43B;&#x438;&#x442;&#x44B;"; //ogame.ru
		T_ut[9] = "Hulpmiddelen"; //ogame.nl
		T_ut[10] = "Utilit&agrave;"; //ogame.it
		T_ut[11] = "&#xC720;&#xC6A9;&#xD55C;&#x20;&#xAE30;&#xB2A5;"; //o-game.co.kr
		T_ut[12] = "&#x395;&#x3C1;&#x3B3;&#x3B1;&#x3BB;&#x3B5;&#x3AF;&#x3B1;"; //ogame.gr
		T_ut[13] = "Ara&ccedil;lar"; //ogame.com.tr
		T_ut[14] = "Utilitati"; //ogame.ro
		T_ut[15] = "&#x5BE6;&#x7528;&#x7A0B;&#x5F0F;"; //ogame.tw
		T_ut[16] = "V&#xE6;rkt&#xF8;j"; //ogame.dk
		
	var L_rs = new Array(); //14.
		L_rs[0] = "Debris harvest link"; //ogame.org
		L_rs[1] = "Link de reciclagem de destro&ccedil;os"; //ogame.com.br
		L_rs[2] = "TF abbau in Galaansicht"; //ogame.de
		L_rs[3] = "Enlace para recogida de escombros"; //ogame.com.es
		L_rs[4] = "Lien d'exploitation des champs de d&eacute;bris"; //ogame.fr
		L_rs[5] = "Link de reciclagem de destro&ccedil;os"; //ogame.com.pt
		L_rs[6] = "Link za recikliranje rusevina"; //ogame.ba
		L_rs[7] = "Link do zbierania szcz&#x0105;tk&oacute;w"; //ogame.pl
		L_rs[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x441;&#x431;&#x43E;&#x440;&#x430;&#x20;&#x43E;&#x431;&#x43B;&#x43E;&#x43C;&#x43A;&#x43E;&#x432;"; //ogame.ru
		L_rs[9] = "Puinveld opruimen link"; //ogame.nl
		L_rs[10] = "Link di raccoglimento dei detriti"; //ogame.it
		L_rs[11] = "&#xC554;&#xC11D;&#xC9C0;&#xB300;&#x20;&#xC218;&#xD655;&#x20;&#xB9C1;&#xD06C;"; //o-game.co.kr
		L_rs[12] = "&#x39A;&#x3BF;&#x3C5;&#x3BC;&#x3C0;&#x3AF;&#x20;&#x3C3;&#x3C5;&#x3B3;&#x3BA;&#x3BF;&#x3BC;&#x3B9;&#x3B4;&#x3AE;&#x3C2;&#x20;&#x3C0;&#x3B5;&#x3B4;&#x3AF;&#x3C9;&#x3BD;&#x20;&#x3C3;&#x3C5;&#x3BD;&#x3C4;&#x3C1;&#x3B9;&#x3BC;&#x3BC;&#x3B9;&#x3CE;&#x3BD;"; //ogame.gr
		L_rs[13] = "Gerid&ouml;n&uuml;&#x15F;&uuml;mc&uuml; k&#x131;sayolu"; //ogame.com.tr
		L_rs[14] = "Link colectare camp de ramasite"; //ogame.ro
		L_rs[15] = "&#x6B98;&#x9AB8;&#x56DE;&#x6536;"; //ogame.tw
		L_rs[16] = "Recycle ruinmark link"; //ogame.dk
		
	var L_sp = new Array(); //15.
		L_sp[0] = "Moon spy link"; //ogame.org
		L_sp[1] = "Link para espiar luas"; //ogame.com.br
		L_sp[2] = "Monde spionieren in Galaansicht"; //ogame.de
		L_sp[3] = "Enlace de espionaje de lunas"; //ogame.com.es
		L_sp[4] = "Lien d'espionnage de lune"; //ogame.fr
		L_sp[5] = "Link de espiar luas"; //ogame.com.pt
		L_sp[6] = "Link za spijuniranje mjeseca"; //ogame.ba
		L_sp[7] = "Link do szpiegowania ksi&#x0119;zyc&oacute;w"; //ogame.pl
		L_sp[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x448;&#x43F;&#x438;&#x43E;&#x43D;&#x430;&#x436;&#x430;&#x20;&#x43B;&#x443;&#x43D;&#x44B;"; //ogame.ru
		L_sp[9] = "Maanspionagelink"; //ogame.nl
		L_sp[10] = "Spionaggio diretto delle lune"; //ogame.it
		L_sp[11] = "&#xB2EC;&#x20;&#xC815;&#xD0D0;&#x20;&#xB9C1;&#xD06C;"; //o-game.co.kr
		L_sp[12] = "&#x39A;&#x3BF;&#x3C5;&#x3BC;&#x3C0;&#x3AF;&#x20;&#x3BA;&#x3B1;&#x3C4;&#x3B1;&#x3C3;&#x3BA;&#x3BF;&#x3C0;&#x3AF;&#x3B1;&#x3C2;&#x20;&#x3C6;&#x3B5;&#x3B3;&#x3B3;&#x3B1;&#x3C1;&#x3B9;&#x3BF;&#x3CD;"; //ogame.gr
		L_sp[13] = "Ay a sonda k&#x131;sayolu"; //ogame.com.tr
		L_sp[14] = "Link spionare luna"; //ogame.ro
		L_sp[15] = "&#x9593;&#x8ADC;&#x6708;&#x4EAE;"; //ogame.tw
		L_sp[16] = "M&#xE5;ne spionage link"; //ogame.dk
		
	var L_mxs = new Array(); //16.
		L_mxs[0] = "Maximum ships and defenses"; //ogame.org
		L_mxs[1] = "M&aacute;ximo de naves e defesas"; //ogame.com.br
		L_mxs[2] = "Gesamtanzahl von baubaren Schiffen und Verteidigung"; //ogame.de
		L_mxs[3] = "M&aacute;ximos naves y defensas"; //ogame.com.es
		L_mxs[4] = "Vaisseaux et d&eacute;fenses maximum"; //ogame.fr
		L_mxs[5] = "M&aacute;ximo de naves e defesas"; //ogame.com.pt
		L_mxs[6] = "Maximum brodova i obrane"; //ogame.ba
		L_mxs[7] = "Maksimum statk&oacute;w i obrony"; //ogame.pl
		L_mxs[8] = "&#x41C;&#x430;&#x43A;&#x441;&#x438;&#x43C;&#x443;&#x43C;&#x20;&#x43A;&#x43E;&#x440;&#x430;&#x431;&#x43B;&#x435;&#x439;&#x20;&#x438;&#x20;&#x437;&#x430;&#x449;&#x438;&#x442;&#x44B;"; //ogame.ru
		L_mxs[9] = "Maximum aantal schepen en verdediging"; //ogame.nl
		L_mxs[10] = "Difese e Navi massime"; //ogame.it
		L_mxs[11] = "&#xC27D;&#xC57C;&#xB4DC;&#xC640;&#x20;&#xBC29;&#xC5B4;&#xC2DC;&#xC124;&#xC5D0;&#x20;&#xCD5C;&#xB300;&#x20;&#xC218;&#xB7C9;&#x20;&#xC785;&#xB825;&#xBC84;&#xD2BC;"; //o-game.co.kr
		L_mxs[12] = "&#x39C;&#x3AD;&#x3B3;&#x3B9;&#x3C3;&#x3C4;&#x3BF;&#x3C2;&#x20;&#x3B1;&#x3C1;&#x3B9;&#x3B8;&#x3BC;&#x3CC;&#x3C2;&#x20;&#x3C0;&#x3BB;&#x3BF;&#x3AF;&#x3C9;&#x3BD;&#x20;&#x3BA;&#x3B1;&#x3B9;&#x20;&#x3AC;&#x3BC;&#x3C5;&#x3BD;&#x3B1;&#x3C2;"; //ogame.gr
		L_mxs[13] = "T&uuml;m gemi ve savunma"; //ogame.com.tr
		L_mxs[14] = "Maximum nave si aparare"; //ogame.ro
		L_mxs[15] = "&#x8266;&#x968A;&#x53CA;&#x9632;&#x79A6;&#x6700;&#x5927;&#x6578;&#x91CF;"; //ogame.tw
		L_mxs[16] = "Maksimal fl&#xE5;de og forsvar"; //ogame.dk
		
	var L_cdesc = new Array(); //17.
		L_cdesc[0] = "Minimize descriptions"; //ogame.org
		L_cdesc[1] = "Minimizar descri&ccedil;&otilde;es"; //ogame.com.br
		L_cdesc[2] = "Beschreibungen minimieren"; //ogame.de
		L_cdesc[3] = "Descripciones reducidas"; //ogame.com.es
		L_cdesc[4] = "Minimizer de description"; //ogame.fr
		L_cdesc[5] = "Minimizar descri&ccedil;&otilde;es"; //ogame.com.pt
		L_cdesc[6] = "Smanji opise"; //ogame.ba
		L_cdesc[7] = "Ukryj opis"; //ogame.pl
		L_cdesc[8] = "&#x421;&#x43E;&#x43A;&#x440;&#x430;&#x442;&#x438;&#x442;&#x44C;&#x20;&#x43E;&#x43F;&#x438;&#x441;&#x430;&#x43D;&#x438;&#x44F;"; //ogame.ru
		L_cdesc[9] = "Minimaliseer beschrijvingen"; //ogame.nl
		L_cdesc[10] = "Minimizza le descrizioni"; //ogame.it
		L_cdesc[11] = "&#xC124;&#xBA85;&#xC744;&#x20;&#xAC04;&#xC18C;&#xD558;&#xAC8C;&#x20;&#xBCF4;&#xC774;&#xAE30;"; //o-game.co.kr
		L_cdesc[12] = "&#x395;&#x3BB;&#x3B1;&#x3C7;&#x3B9;&#x3C3;&#x3C4;&#x3BF;&#x3C0;&#x3BF;&#x3AF;&#x3B7;&#x3C3;&#x3B7;&#x20;&#x3C0;&#x3B5;&#x3C1;&#x3B9;&#x3B3;&#x3C1;&#x3B1;&#x3C6;&#x3CE;&#x3BD;"; //ogame.gr
		L_cdesc[13] = "A&ccedil;&#x131;klamalar&#x131; k&uuml;&ccedil;&uuml;lt"; //ogame.com.tr
		L_cdesc[14] = "Minimizare descriptii"; //ogame.ro
		L_cdesc[15] = "&#x5C07;&#x8A3B;&#x89E3;&#x6700;&#x5C0F;&#x5316;"; //ogame.tw
		L_cdesc[16] = "Minimer beskrivelser"; //ogame.dk
		
	var L_loct = new Array(); //17.
		L_loct[0] = "Show local time"; //ogame.org
		L_loct[1] = "Mostrar hora local"; //ogame.com.br
		L_loct[2] = "Show local time"; //ogame.de
		L_loct[3] = "Mostrar hora local"; //ogame.com.es
		L_loct[4] = "Afficher temps local"; //ogame.fr
		L_loct[5] = "Mostrar hora local"; //ogame.com.pt
		L_loct[6] = "Prikazi lokalno vrijeme"; //ogame.ba
		L_loct[7] = "Show local time"; //ogame.pl
		L_loct[8] = "&#1055;&#1086;&#1082;&#1072;&#1079;&#1072;&#1090;&#1100; &#1084;&#1077;&#1089;&#1090;&#1085;&#1086;&#1077; &#1074;&#1088;&#1077;&#1084;&#1103;"; //ogame.ru
		L_loct[9] = "Show local time"; //ogame.nl
		L_loct[10] = "Show local time"; //ogame.it
		L_loct[11] = "Show local time"; //o-game.co.kr
		L_loct[12] = "Show local time"; //ogame.gr
		L_loct[13] = "Yerel saati g&#246;ster"; //ogame.com.tr
		L_loct[14] = "Show local time"; //ogame.ro
		L_loct[15] = "Show local time"; //ogame.tw
		L_loct[16] = "Lokal Tid"; //ogame.dk
		
	var T_misc= new Array(); //18.
		T_misc[0] = "Mision Colors"; //ogame.org
		T_misc[1] = "Colorir Missoes"; //ogame.com.br
		T_misc[2] = "Mision Colors"; //ogame.de
		T_misc[3] = "Color de las misiones"; //ogame.com.es
		T_misc[4] = "Couleurs de mission"; //ogame.fr
		T_misc[5] = "Colorir Missoes"; //ogame.com.pt
		T_misc[6] = "Boje misija"; //ogame.ba
		T_misc[7] = "Mision Colors"; //ogame.pl
		T_misc[8] = "&#1062;&#1074;&#1077;&#1090;&#1072; &#1079;&#1072;&#1076;&#1072;&#1085;&#1080;&#1081;"; //ogame.ru
		T_misc[9] = "Mision Colors"; //ogame.nl
		T_misc[10] = "Mision Colors"; //ogame.it
		T_misc[11] = "Mision Colors"; //o-game.co.kr
		T_misc[12] = "Mision Colors"; //ogame.gr
		T_misc[13] = "G&#246;rev Renkleri"; //ogame.com.tr
		T_misc[14] = "Mision Colors"; //ogame.ro
		T_misc[15] = "Mision Colors"; //ogame.tw
		T_misc[16] = "Mission Farver"; //ogame.dk
		
	var L_miscchk= new Array(); //19.
		L_miscchk[0] = "Activate Mission Colors"; //ogame.org
		L_miscchk[1] = "Ativar Colorir Missoes"; //ogame.com.br
		L_miscchk[2] = "Activate Mission Colors"; //ogame.de
		L_miscchk[3] = "Activar Color de las Misiones"; //ogame.com.es
		L_miscchk[4] = "Activer couleurs de mission"; //ogame.fr
		L_miscchk[5] = "Ativar Colorir Missoes"; //ogame.com.pt
		L_miscchk[6] = "Promjeni boje misija"; //ogame.ba
		L_miscchk[7] = "Activate Mission Colors"; //ogame.pl
		L_miscchk[8] = "&#1062;&#1074;&#1077;&#1090;&#1072; &#1072;&#1082;&#1090;&#1080;&#1074;&#1085;&#1099;&#1093; &#1079;&#1072;&#1076;&#1072;&#1085;&#1080;&#1081;"; //ogame.ru
		L_miscchk[9] = "Activate Mission Colors"; //ogame.nl
		L_miscchk[10] = "Activate Mission Colors"; //ogame.it
		L_miscchk[11] = "Activate Mission Colors"; //o-game.co.kr
		L_miscchk[12] = "Activate Mission Colors"; //ogame.gr
		L_miscchk[13] = "Aktiv G&#246;rev Renkleri"; //ogame.com.tr
		L_miscchk[14] = "Activate Mission Colors"; //ogame.ro
		L_miscchk[15] = "Activate Mission Colors"; //ogame.tw
		L_miscchk[16] = "Aktiver Mission Farver"; //ogame.dk
		
	var L_atc= new Array(); //19.
		L_atc[0] = "Attack"; //ogame.org
		L_atc[1] = "Ataque"; //ogame.com.br
		L_atc[2] = "Attack"; //ogame.de
		L_atc[3] = "Ataque"; //ogame.com.es
		L_atc[4] = "Attaque"; //ogame.fr
		L_atc[5] = "Ataque"; //ogame.com.pt
		L_atc[6] = "Napad"; //ogame.ba
		L_atc[7] = "Attack"; //ogame.pl
		L_atc[8] = "&#1040;&#1090;&#1072;&#1082;&#1086;&#1074;&#1072;&#1090;&#1100;"; //ogame.ru
		L_atc[9] = "Attack"; //ogame.nl
		L_atc[10] = "Attack"; //ogame.it
		L_atc[11] = "Attack"; //o-game.co.kr
		L_atc[12] = "Attack"; //ogame.gr
		L_atc[13] = "Sald&#253;rmak"; //ogame.com.tr
		L_atc[14] = "Attack"; //ogame.ro
		L_atc[15] = "Attack"; //ogame.tw
		L_atc[16] = "Angrib"; //ogame.dk
		
	var L_esc= new Array(); //20.
		L_esc[0] = "Espionage"; //ogame.org
		L_esc[1] = "Espionagem"; //ogame.com.br
		L_esc[2] = "Espionage"; //ogame.de
		L_esc[3] = "Espionaje"; //ogame.com.es
		L_esc[4] = "Espionnage"; //ogame.fr
		L_esc[5] = "Espionagem"; //ogame.com.pt
		L_esc[6] = "Spijuniranje"; //ogame.ba
		L_esc[7] = "Espionage"; //ogame.pl
		L_esc[8] = "&#1064;&#1087;&#1080;&#1086;&#1085;&#1072;&#1078;"; //ogame.ru
		L_esc[9] = "Espionage"; //ogame.nl
		L_esc[10] = "Espionage"; //ogame.it
		L_esc[11] = "Espionage"; //o-game.co.kr
		L_esc[12] = "Espionage"; //ogame.gr
		L_esc[13] = "Casusluk"; //ogame.com.tr
		L_esc[14] = "Espionage"; //ogame.ro
		L_esc[15] = "Espionage"; //ogame.tw
		L_esc[16] = "Spioner"; //ogame.dk
		
	var L_trc= new Array(); //21.
		L_trc[0] = "Transport"; //ogame.org
		L_trc[1] = "Transport"; //ogame.com.br
		L_trc[2] = "Transport"; //ogame.de
		L_trc[3] = "Transporte"; //ogame.com.es
		L_trc[4] = "Transport"; //ogame.fr
		L_trc[5] = "Nakliye"; //ogame.com.pt
		L_trc[6] = "Transport"; //ogame.ba
		L_trc[7] = "Transport"; //ogame.pl
		L_trc[8] = "&#1058;&#1088;&#1072;&#1085;&#1089;&#1087;&#1086;&#1088;&#1090;"; //ogame.ru
		L_trc[9] = "Transport"; //ogame.nl
		L_trc[10] = "Transport"; //ogame.it
		L_trc[11] = "Transport"; //o-game.co.kr
		L_trc[12] = "Transport"; //ogame.gr
		L_trc[13] = "Transport"; //ogame.com.tr
		L_trc[14] = "Transport"; //ogame.ro
		L_trc[15] = "Transport"; //ogame.tw
		L_trc[16] = "Transport"; //ogame.dk
		
	var L_hac= new Array(); //22.
		L_hac[0] = "Harvest"; //ogame.org
		L_hac[1] = "Farm"; //ogame.com.br
		L_hac[2] = "Harvest"; //ogame.de
		L_hac[3] = "Recolecci&oacute;n"; //ogame.com.es
		L_hac[4] = "Recyclage"; //ogame.fr
		L_hac[5] = "Farm"; //ogame.com.pt
		L_hac[6] = "Recikliranje"; //ogame.ba
		L_hac[7] = "Harvest"; //ogame.pl
		L_hac[8] = "&#1055;&#1077;&#1088;&#1077;&#1088;&#1072;&#1073;&#1086;&#1090;&#1072;&#1090;&#1100;"; //ogame.ru
		L_hac[9] = "Harvest"; //ogame.nl
		L_hac[10] = "Harvest"; //ogame.it
		L_hac[11] = "Harvest"; //o-game.co.kr
		L_hac[12] = "Harvest"; //ogame.gr
		L_hac[13] = "Toplamak"; //ogame.com.tr
		L_hac[14] = "Harvest"; //ogame.ro
		L_hac[15] = "Harvest"; //ogame.tw
		L_hac[16] = "Recycle"; //ogame.dk
		
	var L_otrc= new Array(); //23.
		L_otrc[0] = "Own Transport"; //ogame.org
		L_otrc[1] = "Transporte Propio"; //ogame.com.br
		L_otrc[2] = "Own Transport"; //ogame.de
		L_otrc[3] = "Transporte Propio"; //ogame.com.es
		L_otrc[4] = "Mes propres transports"; //ogame.fr
		L_otrc[5] = "Transporte Propio"; //ogame.com.pt
		L_otrc[6] = "Vlastiti transport"; //ogame.ba
		L_otrc[7] = "Own Transport"; //ogame.pl
		L_otrc[8] = "&#1057;&#1086;&#1073;&#1089;&#1090;&#1074;&#1077;&#1085;&#1085;&#1099;&#1081; &#1090;&#1088;&#1072;&#1085;&#1089;&#1087;&#1086;&#1088;&#1090;"; //ogame.ru
		L_otrc[9] = "Own Transport"; //ogame.nl
		L_otrc[10] = "Own Transport"; //ogame.it
		L_otrc[11] = "Own Transport"; //o-game.co.kr
		L_otrc[12] = "Own Transport"; //ogame.gr
		L_otrc[13] = "Konu&#254;land&#253;rmak"; //ogame.com.tr
		L_otrc[14] = "Own Transport"; //ogame.ro
		L_otrc[15] = "Own Transport"; //ogame.tw
		L_otrc[16] = "Egen Transport"; //ogame.dk
		
	var B_sv = xpath("//input[@type='submit']");
	if(B_sv.snapshotLength > 0){B_sv = B_sv.snapshotItem(0).value;} else {B_sv = "?????? SAVE ??????";}
	
	if(notdetected){
		
		var T_lang= new Array(); //18.
			T_lang[0] = "<a href='http://userscripts.org/scripts/show/8938'>[Language not detected: you MUST choose the right one to work properly]</a>"; //ogame.org
			T_lang[1] = "<a href='http://userscripts.org/scripts/show/8938'>[Linguagem n&atilde;o detectada: Escolha a certa para funcionar corretamente]</a>"; //ogame.com.br
			T_lang[2] = "<a href='http://userscripts.org/scripts/show/8938'>[Sprache nicht erkannt, bitte richtige Sprache nutzen]</a>"; //ogame.de
			T_lang[3] = "<a href='http://userscripts.org/scripts/show/8938'>[Idioma no detectado: DEBES elegir el correcto para que funcione adecuadamente]</a>"; //ogame.com.es
			T_lang[4] = "<a href='http://userscripts.org/scripts/show/8938'>[Langue non d&eacute;tect&eacute;e : vous DEVEZ choisir la bonne pour fonctionner correctement]</a>"; //ogame.fr
			T_lang[5] = "<a href='http://userscripts.org/scripts/show/8938'>[Linguagem n&atilde;o detectada: TEM de escolher a certa para funcionar correctamente]</a>"; //ogame.com.pt
			T_lang[6] = "<a href='http://userscripts.org/scripts/show/8938'>[Jezik nije odabran: MORATE izabrati prikladan jezik dobro radi]</a>"; //ogame.ba
			T_lang[7] = "<a href='http://userscripts.org/scripts/show/8938'>[Nie znaleziono pliku j&#x0119;zykowego: MUSISZ wybra&#x0107; poprwany, aby wszystko dzia&#x0142;a&#x0142;o poprawnie]</a>"; //ogame.pl
			T_lang[8] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x42F;&#x437;&#x44B;&#x43A;&#x20;&#x43D;&#x435;&#x43E;&#x43F;&#x440;&#x435;&#x434;&#x435;&#x43B;&#x435;&#x43D;&#x3A;&#x20;&#x412;&#x44B;&#x20;&#x414;&#x41E;&#x41B;&#x416;&#x41D;&#x42B;&#x20;&#x432;&#x44B;&#x431;&#x440;&#x430;&#x442;&#x44C;&#x20;&#x43F;&#x440;&#x430;&#x432;&#x438;&#x43B;&#x44C;&#x43D;&#x44B;&#x439;&#x20;&#x44F;&#x437;&#x44B;&#x43A;&#x20;&#x434;&#x43B;&#x44F;&#x20;&#x43D;&#x43E;&#x440;&#x43C;&#x430;&#x43B;&#x44C;&#x43D;&#x43E;&#x439;&#x20;&#x440;&#x430;&#x431;&#x43E;&#x442;&#x44B;]</a>"; //ogame.ru
			T_lang[9] = "<a href='http://userscripts.org/scripts/show/8938'>[Taal niet gevonden: je MOET de juiste kiezen om het script te kunnen laten werken]</a>"; //ogame.nl
			T_lang[10] = "<a href='http://userscripts.org/scripts/show/8938'>[Lingua non rilevata: DOVETE scegliere quella giusta per lavorare correttamente]</a>"; //ogame.it
			T_lang[11] = "<a href='http://userscripts.org/scripts/show/8938'>[&#xC5B8;&#xC5B4;&#xB97C;&#x20;&#xCC3E;&#xC744;&#x20;&#xC218;&#x20;&#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;&#x3A;&#x20;&#xC81C;&#xB300;&#xB85C;&#x20;&#xB3D9;&#xC791;&#xD558;&#xB824;&#xBA74;&#x20;&#xBC18;&#xB4DC;&#xC2DC;&#x20;&#xC62C;&#xBC14;&#xB978;&#x20;&#xC5B8;&#xC5B4;&#xB97C;&#x20;&#xC120;&#xD0DD;&#xD574;&#xC57C;&#x20;&#xD569;&#xB2C8;&#xB2E4;]</a>"; //o-game.co.kr
			T_lang[12] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x393;&#x3BB;&#x3CE;&#x3C3;&#x3C3;&#x3B1;&#x20;&#x3B4;&#x3B5;&#x3BD;&#x20;&#x3B1;&#x3BD;&#x3B9;&#x3C7;&#x3BD;&#x3B5;&#x3CD;&#x3B8;&#x3B7;&#x3BA;&#x3B5;&#x3A;&#x20;&#x3A0;&#x3A1;&#x395;&#x3A0;&#x395;&#x399;&#x20;&#x3BD;&#x3B1;&#x20;&#x3B4;&#x3B9;&#x3B1;&#x3BB;&#x3AD;&#x3BE;&#x3B5;&#x3C4;&#x3B5;&#x20;&#x3C4;&#x3B7;&#x20;&#x3C3;&#x3C9;&#x3C3;&#x3C4;&#x3AE;&#x20;&#x3B3;&#x3BB;&#x3CE;&#x3C3;&#x3C3;&#x3B1;&#x20;&#x3B3;&#x3B9;&#x3B1;&#x20;&#x3BD;&#x3B1;&#x20;&#x3BB;&#x3B5;&#x3B9;&#x3C4;&#x3BF;&#x3C5;&#x3C1;&#x3B3;&#x3AE;&#x3C3;&#x3B5;&#x3B9;]</a>"; //ogame.gr
			T_lang[13] = "<a href='http://userscripts.org/scripts/show/8938'>[Dil deste&#x11F;i tan&#x131;mlanamad&#x131;, do&#x11F;ru &ccedil;al&#x131;&#x15F;t&#x131;&#x11F;&#x131;ndan emin olun]</a>"; //ogame.com.tr
			T_lang[14] = "<a href='http://userscripts.org/scripts/show/8938'>[Limba nu e detectata: TREBUIE sa o alegeti pe cea corecta pentru a functiona normal]</a>"; //ogame.ro
			T_lang[15] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x672A;&#x6B63;&#x78BA;&#x5075;&#x6E2C;&#x5230;&#x60A8;&#x7684;&#x8A9E;&#x8A00;&#xFF1A;&#x60A8;&#x5FC5;&#x9808;&#x9078;&#x64C7;&#x4E00;&#x500B;&#x6B63;&#x78BA;&#x7684;&#x8A9E;&#x8A00;&#x624D;&#x80FD;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;]</a>"; //ogame.tw
			T_lang[16] = "<a href='http://userscripts.org/scripts/show/8938'>[Sprog ikke fundet: du SKAL vÃƒÆ’Ã‚Â¦lge det rigtige for at dette virker]</a>"; //ogame.dk
			
		var L_cl = new Array(); //19.
			L_cl[0] = "Choose location"; //ogame.org
			L_cl[1] = "Escolha a localiza&ccedil;&atilde;o"; //ogame.com.br
			L_cl[2] = "Ort ausw&auml;hlen"; //ogame.de
			L_cl[3] = "Escoge localizaci&oacute;n"; //ogame.com.es
			L_cl[4] = "Choisissez le lieu"; //ogame.fr
			L_cl[5] = "Escolhe localiza&ccedil;&atilde;o"; //ogame.com.pt
			L_cl[6] = "Odaberi lokaciju"; //ogame.ba
			L_cl[7] = "Wybierz lokacje"; //ogame.pl
			L_cl[8] = "&#x412;&#x44B;&#x431;&#x435;&#x440;&#x438;&#x442;&#x435;&#x20;&#x43C;&#x435;&#x441;&#x442;&#x43E;&#x43F;&#x43E;&#x43B;&#x43E;&#x436;&#x435;&#x43D;&#x438;&#x435;"; //ogame.ru
			L_cl[9] = "Kies locatie"; //ogame.nl
			L_cl[10] = "Scegli la lingua"; //ogame.it
			L_cl[11] = "&#xC5B8;&#xC5B4;&#x20;&#xC120;&#xD0DD;"; //o-game.co.kr
			L_cl[12] = "&#x394;&#x3B9;&#x3AC;&#x3BB;&#x3B5;&#x3BE;&#x3B5;&#x20;&#x3C4;&#x3BF;&#x3C0;&#x3BF;&#x3B8;&#x3B5;&#x3C3;&#x3AF;&#x3B1;"; //ogame.gr
			L_cl[13] = "B&ouml;lge seciniz"; //ogame.com.tr
			L_cl[14] = "Alege locatia"; //ogame.ro
			L_cl[15] = "&#x9078;&#x64C7;&#x4F4D;&#x7F6E;"; //ogame.tw
			L_cl[16] = "V&#xE6;lg lokation"; //ogame.dk
			
		var languages = new Array;
			languages[0] = "org";
			languages[1] = "br";
			languages[2] = "de";
			languages[3] = "es";
			languages[4] = "fr";
			languages[5] = "pt";
			languages[6] = "ba";
			languages[7] = "pl";
			languages[8] = "ru";
			languages[9] = "nl";
			languages[10] = "it";
			languages[11] = "kr";
			languages[12] = "gr";
			languages[13] = "tr";
			languages[14] = "ro";
			languages[15] = "tw";
			languages[16] = "dk";
			//languages[2] = "ogame.com.cn";
			//languages[9] = "ogame.jp";
			//languages[15] = "ogame.se";
		
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
