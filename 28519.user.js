// ==UserScript==
// @name          OGameTW - Advance Options 1.68
// @namespace     http://userscripts.org/scripts/show/12627
// @description   增強您的OGame體驗!
// @source        http://userscripts.org/scripts/show/12627
// @source        http://userscripts.org/scripts/show/8555
// @source        http://userscripts.org/scripts/show/13479
// @source        http://userscripts.org/scripts/show/14111
// @source        http://userscripts.org/scripts/show/20408
// @source        http://userscripts.org/scripts/show/22703
// @source        http://userscripts.org/scripts/show/22850
// @source        http://userscripts.org/scripts/show/22963
// @source        http://userscripts.org/scripts/show/23779
// @source        http://userscripts.org/scripts/show/24518
// @source        http://userscripts.org/scripts/show/24597(version 0.1)
// @source        http://board.foxgame.org/viewtopic.php?t=368
// @identifier    http://userscripts.org/scripts/show/12627.user.js
// @version       1.0~1.3 by X Tiger 1.30~1.68疊床架屋版 by chrno
// @date          2008-05-06
// @include http://uni*.ogame.tw*
// @include http://uni*.ogame.org*
// ==/UserScript==

var jump_gate_text = '空間跳躍門';
var advanced_jump_gate = true;
var sid = location.search.split('&')[1].split('=')[1];
//設置
//增加"//"符號以關閉額外功能. 或以{name:'xxxx', url:'xxxxx', color:'xxx'}, 的格式增加/修改您想要的鏈接. "Color:"可以設置鏈接顏色. '+sid'l代表當前的session id.
var internal_links = new Array(	
//	{name:'群組管理',color:'42e9fe', url:'index.php?page=allianzen&session='+sid+'&a=7&sort1=5&sort2=1'},
//	{name:'群組列表',color:'fdff05', url:'index.php?page=allianzen&session='+sid+'&a=4&sort1=3&sort2=0'},
//	{name:'群組訊息',color:'fcffaa', url:'index.php?page=allianzen&session='+sid+'&a=17'},
    {name:'空間跳躍門',color:'99ffbb', url:'index.php?page=infos&session='+sid+'&gid=43'}
	);
var external_links = new Array(
	{name:'戰鬥模擬',color:'ffc286', url:'http://websim.speedsim.net/index.php?lang=tw'},
	{name:'封鎖列表',color:'ff89cd', url:'pranger.php?'},
//	{name:'查詢星圖',color:'f4a9fe', url:'http://www.utblog.com/galaxytool/'},
//	{name:'聯盟論壇',color:'dbff80', url:'http://203.95.2.114/index.php'},
	{name:'官方論壇',color:'8fc3fe', url:'http://board.ogame.tw/'}
	);

function addCoords(event) {
	if (gala) {
		planeta = this.innerHTML;		
		coords = gala + ':' + uklad + ':' + planeta;		
	}
	else coords = prompt('加入坐標: X:XXX:XX' );	
	var desc = prompt('坐標代號/名字');
	var typ = prompt('類型:, 1 - 星球, 2 -廢墟, 3 - 月球','1');
	GM_setValue('coordList_'+server, GM_getValue('coordList_'+server )+'^'+coords+'|'+desc+'|'+typ);	
	if (typeof(ramka)!='indefinido') zarzadzaj();
	return false;
}

var loc = document.location;
var reg = /http:\/\/(.*?)\/game\/index.php\?page=(.*?)&session=(.*?)/i;
var result = reg.exec( loc );
var server = result[1];

function gid( el )
{
	return document.getElementById( el );
}

if( result[2].indexOf('galaxy')!=-1 )
{
	var gala = document.getElementsByName('galaxy')[0].value;
	var uklad = document.getElementsByName('system')[0].value;
	tagi = document.getElementById('content').getElementsByTagName('a');
	for (i in tagi)
		if (tagi[i].getAttribute && tagi[i].getAttribute('tabindex')) 
			tagi[i].addEventListener('click',addCoords,true);
}
	
	function delAll()
	{
		if (confirm ('您確定要刪除所有坐標記錄嗎?')) {
			GM_setValue('coordList_'+server,'');
			alert('所有坐標已經刪除');
			if (typeof(ramka)!='indefinido') zarzadzaj();
		}
	}
	
	function jumpmap(e) {
		adres = e.target.firstChild.nodeValue.split(':');

		reg = /(.*?)\?session=([0-9a-f]+)&*.*/;
		result = reg.exec (document.location);

        document.location.href='index.php?page=galaxy&galaxy='+adres[0]+'&system='+adres[1]+'&planet='+adres[2]+'&session=' + result[2];
		return false;
	}

	function delcoord(event) {
		adresyNowe = '';
		nr = event.target.getAttribute('nr');
		str = GM_getValue('coordList_'+server);
		adresy = str.split( '^' );
		for (i in adresy)
			if (adresy[i]!='' && i!=nr)
				adresyNowe = adresyNowe + '^' + adresy[i];
		GM_setValue('coordList_'+server, adresyNowe);
		zarzadzaj();
		return false;
	}
	
	function moveCoord(event) {
		nr = event.target.firstChild.nodeValue;
		CoordsTab = loadCoords();
		if ((poz = prompt ('移動到:')) && (poz>0) && (poz<CoordsTab.length)) {
			CoordsTabNew = new Array;
			ii = 1;
			for (i in CoordsTab) if (i > 0) {
				if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
				if (i!=nr) CoordsTabNew[ii++] = CoordsTab[i];
				if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
			}
			saveCoords(CoordsTabNew);
			zarzadzaj();
		}
	}

	function loadCoords() {
		var CoordsTab = new Array;
		str = GM_getValue('coordList_' + server);
		adresy = str.split( '^' );
		for (i in adresy)
			if (adresy[i]!='')
				CoordsTab[i] = adresy[i].split('|');
		return CoordsTab;
	}

	function saveCoords(CoordsTab) {
		str = '';
		for (i in CoordsTab) if (i > 0)
			if (typeof(CoordsTab[i]) != 'indefinido')
				str = str + '^' + CoordsTab[i][0] + '|' + CoordsTab[i][1];
		GM_setValue ('coordList_' + server, str);
	}

	function editCoord(event) {
		CoordsTab = loadCoords();
		nr = event.target.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue;
		if (coords = prompt('修改坐標. X:XXX:XX', CoordsTab[nr][0]))
			if (desc = prompt('修改代號/名字', CoordsTab[nr][1])) {
				CoordsTab[nr][0] = coords;
				CoordsTab[nr][1] = desc;
				saveCoords(CoordsTab);
				zarzadzaj();
			}
		return false;
	}

	function zarzadzaj() {
		
		body = document.getElementById('content');
		while (body.firstChild)
			body.removeChild(body.firstChild);
		tab = document.createElement('TABLE');
		tab.style.padding=30;
		tr = tab.appendChild(document.createElement('TR'));
		td = tr.appendChild(document.createElement('TD'));
		td.className='c';
		td.colSpan=4;
		td.appendChild(document.createTextNode('私人坐標列表'));
		
		str = GM_getValue('coordList_'+server);
		array1 = str.split( '^' );
	len = array1.length;		
		for( i = 0; i < len; i++ )
		{
			x = array1[i];
			if( x != '' )
			{
				arr = x.split( '|' );
				if( arr[0] != null && typeof(arr[1])!='undefined')
				{
					tr = tab.appendChild(document.createElement('TR'));
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.addEventListener('click', moveCoord, false);
					a.appendChild(document.createTextNode(i));
					th.appendChild(a);
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.addEventListener('click', jumpmap, false);
					a.appendChild(document.createTextNode(arr[0]));
					th.appendChild(a);
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.addEventListener('click', editCoord, false);
					a.appendChild(document.createTextNode(arr[1]));
					th.appendChild(a);
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.setAttribute('nr',i);
					a.addEventListener('click', delcoord, false);
					a.appendChild(document.createTextNode('刪除'));
					th.appendChild(a);
				}
			}
		}
		body.appendChild(tab);
	}

	function start1()
	{	
		x = document.createElement('DIV');
		x.setAttribute('id','addcord');
		x.style.textAlign='center';
		y = document.createElement('INPUT');
		y.setAttribute('id','addcor');
		y.setAttribute('type','button');
		y.value='加入坐標';
		y.addEventListener('click',addCoords,true);
		x.appendChild(y);
//		x.appendChild(document.createElement('TH'));
		y = document.createElement( 'INPUT' );
		y.setAttribute('type','button');
		y.setAttribute('id','addcor2');
		y.value='重置坐標';
		y.addEventListener('click',delAll,true);
		x.appendChild(y);
//		x.appendChild(document.createElement('TH'));
		y = document.createElement('INPUT');
		y.setAttribute('type','button');
		y.setAttribute('id','addcor3');
		y.value='編輯坐標';
		y.addEventListener('click',zarzadzaj,true);
		x.appendChild(y);
		document.getElementById('menu').appendChild(x);
	}
	start1();
//}
if( result[2] == 'flotten2' )
{
	function start2()
	{
		x = document.getElementById('content').getElementsByTagName( 'table' );

		y = x[0];
		z = y.getElementsByTagName( 'tr' );
		
		a = document.createElement( 'TR' );
		b = document.createElement( 'TD' );
		b.innerHTML = '私人坐標';
		b.colSpan = 2;
		b.className = 'c';
		a.appendChild( b );
		
		y.appendChild( a );

		str = GM_getValue('coordList_'+server);
		array1 = str.split('^');
		len = array1.length;
		v = document.createElement( 'TR' );
		for (i = 0; i < len; i++) {
			x = array1[i];
			
			if (x != '') {
				if ((i - 1) % 2 == 0) {
					v = document.createElement('TR');
				}
				arr = x.split('|');
								
				o = document.createElement('TH');
				arrC = arr[0].split(':');
				link = document.createElement('A');
				link.href = 'javascript:setTarget(' + arrC[0] + ',' + arrC[1] + ',' + arrC[2] + ',' + arr[2] + '); shortInfo()';
				link.appendChild(document.createTextNode(arr[1] + ' [' + arr[0] + ']'));
				
				o.appendChild(link);
				v.appendChild(o);							
			}
			if ((i - 1) % 2 == 0) {
				y.appendChild(v);				
			}
		}
	}
	start2();
}

if (advanced_jump_gate && location.search.indexOf('gid=43', 0) >= 0)
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

var elems = new Array();
var elems = ['board.', 'tutorial.', 'regeln.', 'portal'];
var td = document.getElementById('menu').getElementsByTagName('td');
for (var i = 0; i < td.length; i++) 
	for (var elem in elems) 
		if (td[i].innerHTML.indexOf(elems[elem], 0) >= 0) {
			if (elems[elem] == 'tutorial.') 
				td[i].innerHTML = '';
			else 
				if (external_links && elems[elem] == 'portal') 
					var last_item = td[i].parentNode;
				else 
					td[i].parentNode.removeChild(td[i]);
		}
if (external_links || internal_links)
{
	if (internal_links)
		for (var key in internal_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div align="center"><a href="'+internal_links[key].url+'" style="color:'+internal_links[key].color+';">'+internal_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
		if (external_links)
		for (var key in external_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div align="center"><a target="_blank" href="'+external_links[key].url+'" style="color:'+external_links[key].color+';">'+external_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
	last_item.parentNode.removeChild(last_item);
}

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
var leftMenuItems = document.getElementById('menu').getElementsByTagName('a');
for(var i in leftMenuItems)
{
	if(leftMenuItems[i].innerHTML == "<font color=\"#ff8900\">的商人</font>")
		leftMenuItems[i].innerHTML = "<font color=\"#ff8900\">“新”的商人</font>"
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
	GM_setValue((server+"colorotr"), (document.getElementById('owntransportcolor').value));
	GM_setValue((server+"coloroha"), (document.getElementById('ownharvestcolor').value));
	GM_setValue((server+"colorode"), (document.getElementById('owndeploycolor').value));
	
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
  C_nn[15] = new Array();C_nn[15][0]='小型運輸艦';C_nn[15][1]="大型運輸艦"; //ogame.tw
//New Time Display Begin
// adaptaciÃ³n de idiomas
var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var O_months=new Array();
  O_months[0] =new Array();O_months[0] [0]='January';O_months[0] [1]='February';O_months[0] [2]='March';O_months[0] [3]='April';O_months[0] [4]='May';O_months[0] [5]='June';O_months[0] [6]='July';O_months[0] [7]='August';O_months[0] [8]='September';O_months[0] [9]='October';O_months[0] [10]='November';O_months[0] [11]='December';//ogame.org
  O_months[15]=new Array();O_months[15][0]='January';O_months[15][1]='February';O_months[15][2]='March';O_months[15][3]='April';O_months[15][4]='May';O_months[15][5]='June';O_months[15][6]='July';O_months[15][7]='August';O_months[15][8]='September';O_months[15][9]='October';O_months[15][10]='November';O_months[15][11]='December';//ogame.tw

var O_days=new Array();
  O_days[0] =new Array();O_days[0] [0]='Sunday,';O_days[0] [1]='Monday,';O_days[0] [2]='Tuesday,';O_days[0] [3]='Wednesday,';O_days[0] [4]='Thursday,';O_days[0] [5]='Friday,';O_days[0] [6]='Saturday';//ogame.org
  O_days[15]=new Array();O_days[15][0]='Sunday';O_days[15][1]='Monday';O_days[15][2]='Tuesday';O_days[15][3]='Wednesday';O_days[15][4]='Thursday';O_days[15][5]='Friday';O_days[15][6]='Saturday';//ogame.tw

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
//New Time Display End

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
	case "tw":
		langloca = "15"; X_mlg = /(金屬: )<b>([\.0-9]+)/; X_clg = /(晶體: )<b>([\.0-9]+)/; X_dlg = /(重氫: )<b>([\.0-9]+)/; X_elg = /(能量: )<b>([\.0-9]+)/; X_lvl = /\(等級 (\d+)/;
	break;
	default:
		langloca = checker((ogserver+"langloca"),"0");
		notdetected = true;
		X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
}
//Mission And Mission Colors Reset Variables Begin					
if(DEBUG){GM_log(ogtitle+" "+ogserver+" "+langloca);}

var color_m = checker((ogserver+"colorm"),"#F1531E");
var color_c = checker((ogserver+"colorc"),"#54B0DC");
var color_d = checker((ogserver+"colord"),"#9AACCB");
var color_e = checker((ogserver+"colore"),"#F2D99D");

var mission_colors = checker((ogserver+"missioncolors"),"1");
//Mission And Mission Colors Reset Variables End
var color_attack = checker((ogserver+"colorat"),"#00ff00");
var color_spy = checker((ogserver+"colores"),"#ffa500");
var color_otransport = checker((ogserver+"colorotr"),"#52a2dc");
var color_owndeploy = checker((ogserver+"colorode"),"#a401ff");
var color_ownharvest = checker((ogserver+"coloroha"),"#20d0bc");

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
//Mission And Mission Colors Reset Variables Begin
var res = xpath("//font[@color='#ffffff']/parent::b/parent::i/b/font");
if(res.snapshotLength > 0){
	res.snapshotItem(0).color = (color_m);
	res.snapshotItem(1).color = (color_c);
	res.snapshotItem(2).color = (color_d);
	res.snapshotItem(4).color = (color_e);
}
//Mission And Mission Colors Reset Variables End
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
		L_res[15] = "研究等級之積分"; //ogame.tw
		
	var L_ret= new Array(); //16.
		L_ret[0] = "Time to be available"; //ogame.org
		L_ret[15] = "資源需求預估"; //ogame.tw
		
	var T_cs = new Array(); //26.
		T_cs[0] = "Cargo ships calculator"; //ogame.org
		T_cs[15] = "計算運輸船艦數量"; //ogame.tw
		
	var T_pc = new Array(); //28.
		T_pc[0] = "Production calculator"; //ogame.org
		T_pc[15] = "計算資源數量"; //ogame.tw
}

//if((/buildings.php.+mode.Flotte/.test(ogtitle) == true) || (/buildings.php.+mode.Verteidigung/.test(ogtitle) == true) || (/mode.Forschung/.test(ogtitle) == true) || (/game.b_building.php/.test(ogtitle) == true)){
if((/mode=Flotte/.test(ogtitle) == true) || (/mode=Verteidigung/.test(ogtitle) == true) || (/mode=Forschung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true)){
	if((readytime == "1") || (maxships == "1") || (relvl == "1") || (color_m.length > 0) || (color_c.length > 0) || (color_d.length > 0) || (color_e.length > 0)){

		//var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@width,'100%')]/tbody/tr[3]/td[position()<5 and position()>1]");
		var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@id,'resources')]/tbody/tr[3]/td[position()<4 and position()>0]");
		if (allcurres.snapshotLength > 0) {
			var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
			var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
			var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
		}
		var shipstd = xpath("//td[@class='k']");
		var F_scriptinjection = document.createElement('script');
			F_scriptinjection.type = 'text/javascript';
			
		var J_mon= new Array(); //20.
    	J_mon[0] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="May"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.org
    	J_mon[15] = 'var mymonth = new Array(); mymonth[0]="1月"; mymonth[1]="2月"; mymonth[2]="3月"; mymonth[3]="4月"; mymonth[4]="5月"; mymonth[5]="6月"; mymonth[6]="7月"; mymonth[7]="8月"; mymonth[8]="9月"; mymonth[9]="10月"; mymonth[10]="11月"; mymonth[11]="12月";'; //ogame.tw
		
		var J_rel= new Array(); //21.
			J_rel[0] = "Ready, reloading page..."; //ogame.org
			J_rel[15] = "資源準備完成!"; //ogame.tw
			
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
							'document.getElementById(hid).innerHTML = "<font color=#E7FFAC>經過</font><font color=#D49BFE style=font-weight:bolder>[</font><font color=#A7FFDD>"+hhor+"時"+hmin+"分"+hsec+"秒</font><font color=#D49BFE style=font-weight:bolder>]</font><font color=#E7FFAC>於</font><font color=#D49BFE style=font-weight:bolder>[</font><font color=#4EFFAB>"+mymonth[whentime.getMonth()]+whentime.getDate()+"日"+whentime.getHours()+"時"+whentime.getMinutes()+"分"+whentime.getSeconds()+"秒</font><font color=#D49BFE style=font-weight:bolder>]</font><font color=#E7FFAC>可建造</font>"; '+
							'if(hdata == 0){document.getElementById(hid).innerHTML = "'+J_rel[langloca]+'"; window.setTimeout("window.location.reload();",2000);} '+
							'if(hdata > 0){ window.setTimeout(("hourexec(\'"+hid+"\',"+hdata+");"), 999); } '+
							'}';
			F_head.appendChild(F_script);
        
		var obj = document.evaluate('//a[contains(@href,"gid=113")]//following-sibling::br/parent::td',
                                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (obj.snapshotLength != 0) {
			thistd = obj.snapshotItem(0).innerHTML;
			if (X_lvl.test(thistd) == true) {
				var thislvl = X_lvl.exec(thistd);
				thislvl = RegExp.$1;
				var Energylvl = parseInt(thislvl);
				GM_setValue((ogserver+"elv"), Energylvl);
			}
			else {
				var Energylvl = 0
				GM_setValue((ogserver+"elv"), Energylvl);
			}
		}
		
		var alltds = xpath("//td[@class='l']/br/parent::td");
		var rsval = 0;
		//alert(alltds.snapshotLength);
		for (var i = 0; i < alltds.snapshotLength; i++) {
			var thistd = alltds.snapshotItem(i).innerHTML;
			
			if ((relvl == "1") && (/page=buildings.*mode=Forschung/.test(ogtitle))) {
				if (X_lvl.test(thistd) == true) {
					var thislvl = X_lvl.exec(thistd);
					thislvl = RegExp.$1;
					rsval += parseInt(thislvl);
				}
			}
			
			var thismet = X_mlg.exec(thistd);
			if (thismet != null) {
				thismet = mystr2num(RegExp.$2);
			}
			else {
				thismet = 0;
			}
			var thiscry = X_clg.exec(thistd);
			if (thiscry != null) {
				thiscry = mystr2num(RegExp.$2);
			}
			else {
				thiscry = 0;
			}
			var thisdeu = X_dlg.exec(thistd);
			if (thisdeu != null) {
				thisdeu = mystr2num(RegExp.$2);
			}
			else {
				thisdeu = 0;
			}
			
			if ((maxships == "1") && ((/page=buildings.*mode=Flotte/.test(ogtitle) == true) || (/page=buildings.*mode=Verteidigung/.test(ogtitle) == true))) {
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
				var maxval = calcmaxnum(curmet, curcry, curdeu, thismet, thiscry, thisdeu);
				if ((maxval > 0) && (/font\>/.test(shipstd.snapshotItem(i).innerHTML) == false) && cando) {
					var thisshipstd = shipstd.snapshotItem(i);
					
					var thisimgid = /fmenge.(\d+)/.exec(thisshipstd.innerHTML);
					thisimgid = RegExp.$1;
					
					if ((thisimgid == "407") || (thisimgid == "408")) {
						maxval = 1;
					}
					
					var maxtable = document.createElement('table');
					maxtable.width = "100%";
					maxtable.innerHTML = "<tr><td style='text-align:center;'><a href='javascript:changeval(\"fmenge[" + thisimgid + "]\"," + maxval + ");'>max:&nbsp;" + maxval + "</a><br><a href='javascript:lessships(\"fmenge[" + thisimgid + "]\");'>&laquo;</a>&nbsp;&nbsp;<a href='javascript:changeval(\"fmenge[" + thisimgid + "]\",0);'>&reg;</a>&nbsp;&nbsp;<a href='javascript:moreships(\"fmenge[" + thisimgid + "]\");'>&raquo;</a></td></tr>";
					thisshipstd.appendChild(maxtable);
				}
			}
			
			if (readytime == "1") {
				var R_np = new Array(); //22.
				R_np[0] = "Not all necessary resources are being produced!"; //ogame.org
				R_np[15] = "尚需資源"; //ogame.tw
				
				var metfact = parseInt(checker((ogserver + planetcoords + "met"), "0"));
				var cryfact = parseInt(checker((ogserver + planetcoords + "cry"), "0"));
				var deufact = parseInt(checker((ogserver + planetcoords + "deu"), "0"));
				if (DEBUG) {
					GM_log(metfact + " " + cryfact + " " + deufact);
				}
				var timeval = calctime(curmet, curcry, curdeu, thismet, thiscry, thisdeu, metfact, cryfact, deufact);
				if ((timeval > 0) && (timeval != Infinity)) {
					thistd = thistd + "<div id='hor" + i + "'></div>";
					F_scriptinjection.innerHTML += "hourexec('hor" + i + "'," + timeval + "); ";
				}
				if (timeval == Infinity) {
					thistd = thistd + "<div>" + R_np[langloca] + "</div>";
				}
				
				
				thistd = thistd.replace(X_mlg, ("$1<b style='color:" + color_m + ";'>$2"));
				if (thismet > curmet) 
					thistd += RegExp.$1 + "<b style='color:" + color_m + ";'>" + addDots(thismet - curmet) + "</b>&nbsp;";
				thistd = thistd.replace(X_clg, ("$1<b style='color:" + color_c + ";'>$2"));
				if (thiscry > curcry) 
					thistd += RegExp.$1 + "<b style='color:" + color_c + ";'>" + addDots(thiscry - curcry) + "</b>&nbsp;";
				thistd = thistd.replace(X_dlg, ("$1<b style='color:" + color_d + ";'>$2"));
				if (thisdeu > curdeu) 
					thistd += RegExp.$1 + "<b style='color:" + color_d + ";'>" + addDots(thisdeu - curdeu) + "</b>&nbsp;";
				thistd = thistd.replace(X_elg, ("$1<b style='color:" + color_e + ";'>$2"));
				
				var allres = Math.max(thismet - curmet, 0) + Math.max(thiscry - curcry, 0) + Math.max(thisdeu - curdeu, 0);
				if (allres != 0) {
					thistd += "<br>運輸需求:(<font color=#5487FE>" +
					C_nn[langloca][1] +
					":</font><b>" +
					Math.ceil(allres / 25000) +
					"</b>&nbsp;)或(&nbsp;<font color=#AFB2FE>" +
					C_nn[langloca][0] +
					":</font><b>" +
					Math.ceil(allres / 5000) +
					"</b>&nbsp;)";
				}
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
if((/page=buildings.*mode=Forschung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true)){
//Adds graphic display of building / research progres (Real-Time) Begin
(function(){
    if (!document.getElementById('bxx')) return;

	var intervalTime = 1; // seconds
	
	function progress() {
		try {
			pro = new String((totalTime - time) * 100 / totalTime)
			pro = pro.replace(/(\d+\.[\d]{0,2})\d+/, '$1');
			divIn.innerHTML = '&nbsp;' + pro + '%';
			divIn.style.cssText = 'width:' + pro + '%; height:13px;\
                             font-size:10px; font-weight:700;\
			    			 line-height:13px;\
			   				  -moz-border-radius:15px;\
			   				  text-align:center; color:#000;\
                             background-color:rgb('+(100 - pro)+'%,' + pro +'%,'+(pro - 60)+'%);';
			time -= intervalTime;
			if (time <= 0) {
				divIn.innerHTML = '^^完成囉~';				
				window.clearInterval(intervalID);
			}
		} 
		catch (e) {
			alert('productionPercent:' + e + '\n' + (e.stack || ''));
		}
	}

    var m, td, td2, pro, divOut, divIn, time = 0, totalTime = 0;
    var reTimeLeftBuilding = /pp\=\'(\d+)\'\;/g;
	var reTimeLeftResearch = /ss\=(\d+)\;/g;

    var scripts = document.getElementsByTagName('script');
   for(var i=scripts.length-1;i>=0;i--){
      m = scripts[i].innerHTML.match(reTimeLeftBuilding);
      if(m){ time = m[0].replace(reTimeLeftBuilding,'$1'); break; }
	  m = scripts[i].innerHTML.match(reTimeLeftResearch);
      if(m){ time = m[0].replace(reTimeLeftResearch,'$1'); break; }
    }

    td = document.getElementById('bxx').parentNode.previousSibling;

	scripts = document.getElementsByTagName('td');
	for(var i=scripts.length-1;i>=0;i--){
		if (scripts[i].innerHTML.match(m)) {
			td2 =scripts[i];
			break;
		}
	}
    
    m = td.innerHTML.split(/<br>/i);
    for (var i=m.length-2;i>=0;i--)
      if(m[i].indexOf(':')!=-1){
        totalTime = m[i].split(':')[1];
        break;
      }
    m = totalTime.match(/(\d+)/g);
         if(m.length==4) totalTime=(m[0]*24*3600)+(m[1]*3600)+(m[2]*60)+(m[3]*1);
    else if(m.length==3) totalTime=(m[0]*3600)+(m[1]*60)+(m[2]*1);
    else if(m.length==2) totalTime=(m[0]*60)+(m[1]*1);
    else if(m.length==1) totalTime=(m[0]*1);
    if (totalTime<time){ // missing seconds in total time
           if(m.length==3) totalTime=(m[0]*24*3600)+(m[1]*3600)+(m[2]*60);
      else if(m.length==2) totalTime=(m[0]*3600)+(m[1]*60);
      else if(m.length==1) totalTime=(m[0]*60);
    }
   // totalTime=500000;

    if(td && totalTime && time) {
		divTop = document.createElement('div');
		divIn = document.createElement('div');
		divTop.appendChild(divIn);
		td.appendChild(divTop);
		divTop.style.cssText = 'width:98%; height:13px;\
                              border:2px #bdffd4 solid;\
                              -moz-border-radius:15px;\
			      			background-color:transparent;';
		progress();
		var intervalID = window.setInterval(progress, intervalTime * 1000);
    }
})();
//Adds graphic display of building / research progres (Real-Time) End
}
if(/page=flotten1/.test(ogtitle) == true){
if(calcships == "1"){
		
	var cargname = new Array();
		cargname[0] = "Cargo Capacity"; //ogame.org
		cargname[15] = "航行艦隊總裝載量"; //ogame.tw
		
	var fuelname = new Array(); //32.
		fuelname[0] = "Deuterium consumption"; //ogame.org
		fuelname[15] = "航行艦隊消耗重氫量"; //ogame.tw
		
	var speedname = new Array(); //33.
		speedname[0] = "Speed"; //ogame.org
		speedname[15] = "航行速度"; //ogame.tw
		
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
	var allxipsname = xpath("//input[@type='hidden' and contains(@name,'maxship')]/parent::th/parent::tr/parent::tbody//a[@title]");
	var allxipinp = xpath("//input[contains(@name,'ship') and @size and @alt]");
	var xiphold = "";
	var solfix = 0;
	for(var i=0;i<allxipsname.snapshotLength;i++){
    if(parseInt(allhdspee.snapshotItem(i).value) == 0){
    xiphold += '<tr><th title=船艦速度:'+allhdspee.snapshotItem(i).value+'><a>'+allxipsname.snapshotItem(i).innerHTML+'</a></th><th>'+allhdmaxs.snapshotItem(i).value+'</th><th><font color="#FF64A1">移動選擇不可≧△≦</font></th><th><font color="#FF6277">資源負載不能≧△≦</font></th></tr>'; //<th>-</th>
    solfix--; continue;}
		xiphold += '<tr><th title=船艦速度:'+allhdspee.snapshotItem(i).value+'><a>'+allxipsname.snapshotItem(i).innerHTML+'</a></th><th><a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',-1);">&laquo;</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="changeship(\''+allxipinp.snapshotItem(i+solfix).name+'\',0);">&reg;</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="changeship(\''+allxipinp.snapshotItem(i+solfix).name+'\','+allhdmaxs.snapshotItem(i).value+');">[max: '+allhdmaxs.snapshotItem(i).value+']</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',1);">&raquo;</a></th><th><input style="text-align:center;" onchange="calccap();" onkeyup="calccap();" name="'+allxipinp.snapshotItem(i+solfix).name+'" size="'+allxipinp.snapshotItem(i+solfix).size+'" value="'+allxipinp.snapshotItem(i+solfix).value+'" alt="'+allxipinp.snapshotItem(i+solfix).alt+'"/></th><th id="more'+allxipinp.snapshotItem(i+solfix).name+'" maxip="'+allhdmaxs.snapshotItem(i).value+'" capa="'+allhdcapa.snapshotItem(i).value+'">-</th></tr>'; //<td class="k" id="total'+allxipinp.snapshotItem(i+solfix).name+'">-</td>
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
		transpcalc[15] = "艦隊航行計算資訊"; //ogame.tw
	
	var calcinjection = '<br>'+hiddenholder+'<table width="519" border="0" cellpadding="0" cellspacing="1">'+
						'<tr height="20"><td class="c" colspan="3">'+transpcalc[langloca]+':</td></tr>'+
						'<tr height="20"><th>'+metname+'</th><th><input style="text-align:center;" id="curmet" value="'+curmet+'" onchange="calccap();" onkeyup="calccap();"></th><th rowspan="5" id="calczone"><script>calccap();</script></th></tr>'+
						'<tr height="20"><th>'+cryname+'</th><th><input style="text-align:center;" id="curcry" value="'+curcry+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
						'<tr height="20"><th>'+deuname+'</th><th><input style="text-align:center;" id="curdeu" value="'+curdeu+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
						'<tr height="20"><th>'+targetname+'</th><th><input style="text-align:center;" size="2" name="galaxy" value="'+curgal+'" onchange="calccap();" onkeyup="calccap();"> : <input style="text-align:center;" size="2" name="system" value="'+cursys+'" onchange="calccap();" onkeyup="calccap();"> : <input style="text-align:center;" size="2" name="planet" value="'+curpla+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
						'<tr height="20"><th>'+speedname[langloca]+'</th><th><select name="speed" onchange="calccap();"><option value="10">100</option><option value="9">90</option><option value="8">80</option><option value="7">70</option><option value="6">60</option><option value="5">50</option><option value="4">40</option><option value="3">30</option><option value="2">20</option><option value="1">10</option></select> %</th>'+
						'</table>';
	
	var formzone = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]");
	var calcsholder = document.createElement('form');
		calcsholder.action = formzone.snapshotItem(0).action;
		calcsholder.method = formzone.snapshotItem(0).method;
		calcsholder.innerHTML = '<input name="speedfactor" type="hidden" value="1"><input name="thisgalaxy" type="hidden" value="'+curgal+'"><input name="thissystem" type="hidden" value="'+cursys+'"><input name="thisplanet" type="hidden" value="'+curpla+'">'+
								'<table width="519" border="0" cellpadding="0" cellspacing="1">'+warnmax+
								'<tr height="20"><td colspan="6" class="c">'+cl_tbtitle+'</td></tr>'+
								'<tr height="20"><th>'+cl_sptitle+'</th><th>'+cl_maxtitle+'</th><th>船艦已選擇數</th><th>資源負載消耗數</th></tr>'+xiphold+ //<th>-</th>
								'<tr height="20"><th colspan="3"><a href="javascript:noShips(); calccap();" >'+noxipbut+'</a></th>'+
								'<th colspan="3"><a href="javascript:maxShips(); calccap();" >'+allxipbut+'</a></th></tr>'+cl_sbvalue+
								'</table>'+calcinjection;
	formzone.snapshotItem(0).parentNode.insertBefore(calcsholder, formzone.snapshotItem(0));
	formzone.snapshotItem(0).parentNode.removeChild(formzone.snapshotItem(0));

}
}
//Directly spy a moon and send recyclers Begin
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
					L_har[15] = "回收"; //ogame.tw
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
					L_spy[15] = "間諜"; //ogame.tw
					
        var thispla = fontinf.snapshotItem(i).parentNode.parentNode.childNodes[1].childNodes[1].innerHTML;
        fontinf.snapshotItem(i).parentNode.innerHTML = 
          fontinf.snapshotItem(i).parentNode.innerHTML.replace(
            L_spy[langloca], 
            "<a style=\\'cursor:pointer\\' onclick=\\'doit(6, "+thisgal+", "+thissis+", "+thispla+", 3, 4)\\'>" + L_spy[langloca] + "</a>");
			}
		}
	}
}
//Directly spy a moon and send recyclers End
}
	//Marqueur Galaxie Begin
	var colorn = '#FFFFFF';
	var color = '#FF0000';
	
	var loc = document.location;
	var reg = /http:\/\/(.*?)\/game\/(.*?)/i;
	var result = reg.exec(loc);
	var server = result[1];
	var reg1 = /javascript:doit\(([0-9]*), ([0-9]*), ([0-9]*), ([0-9]*), 1, [0-9]*\);/i;
	
	
	var bunk = GM_getValue('bunk_' + server);
	if (bunk == null) {
		bunk = '';
	}
	
	var farm = GM_getValue('farm_' + server);
	if (farm == null) {
		farm = '';
	}
	
	var angr = GM_getValue('angr_' + server);
	if (angr == null) {
		angr = '';
	}
	
	var spio = GM_getValue('spio_' + server);
	if (spio == null) {
		spio = '';
	}
	
	
	String.prototype.trim = function(){
		return this.replace(/^\s*|\s*$/, '');
	};
	
	var th = document.getElementById("content").getElementsByTagName('a');
	for (i = 0; i < th.length; i++) {
		oc = th[i].getAttribute('onclick')
		if (oc != undefined && oc.indexOf('javascript:doit') != -1) {
			planet = reg1.exec(oc);
			liste = planet[2] + ':' + planet[3] + ':' + planet[4];
			
			y = document.createElement('input');
			y.setAttribute('type', 'button');
			y.setAttribute('liste', liste);
			y.value = '敵';
			y.title = '標示『敵對』用按鈕~^o^~';
			y.style.width = '16px';
			y.addEventListener('click', f_bunk, true);
			if (bunk.indexOf(liste) != -1) {
				y.style.color = color;
			}
			th[i].parentNode.appendChild(y);
			
			y = document.createElement('input');
			y.setAttribute('type', 'button');
			y.setAttribute('liste', liste);
			y.value = '農';
			y.title = '標示『農夫』用按鈕~^o^~';
			y.style.width = '16px';
			y.addEventListener('click', f_farm, true);
			if (farm.indexOf(liste) != -1) {
				y.style.color = color;
			}
			th[i].parentNode.appendChild(y);
			
			y = document.createElement('input');
			y.setAttribute('type', 'button');
			y.setAttribute('liste', liste);
			y.value = '攻';
			y.title = '標示『攻擊』用按鈕~^o^~';
			y.style.width = '16px';
			y.addEventListener('click', f_angr, true);
			if (angr.indexOf(liste) != -1) {
				y.style.color = color;
			}
			th[i].parentNode.appendChild(y);
			
			y = document.createElement('input');
			y.setAttribute('type', 'button');
			y.setAttribute('liste', liste);
			y.value = '監';
			y.title = '標示『監視』用按鈕~^o^~';
			y.style.width = '16px';
			y.addEventListener('click', f_spio, true);
			if (spio.indexOf(liste) != -1) {
				y.style.color = color;
			}
			th[i].parentNode.appendChild(y);
		}
	}
	
	function f_bunk(){
		a = this.getAttribute('liste');
		if (bunk.indexOf(a) != -1) {
			bunk = bunk.replace(a, '');
			this.style.color = colorn;
		}
		else {
			bunk += '|' + a;
			this.style.color = color;
		}
		GM_setValue('bunk_' + server, bunk);
	}
	
	function f_farm(){
		a = this.getAttribute('liste');
		if (farm.indexOf(a) != -1) {
			farm = farm.replace('|' + a, '');
			this.style.color = colorn;
		}
		else {
			farm += '|' + a;
			this.style.color = color;
		}
		GM_setValue('farm_' + server, farm);
	}
	
	function f_angr(){
		a = this.getAttribute('liste');
		if (angr.indexOf(a) != -1) {
			angr = angr.replace('|' + a, '');
			this.style.color = colorn;
		}
		else {
			angr += '|' + a;
			this.style.color = color;
		}
		GM_setValue('angr_' + server, angr);
	}
	
	function f_spio(){
		a = this.getAttribute('liste');
		if (spio.indexOf(a) != -1) {
			spio = spio.replace('|' + a, '');
			this.style.color = colorn;
		}
		else {
			spio += '|' + a;
			this.style.color = color;
		}
		GM_setValue('spio_' + server, spio);
	}
	//Marqueur Galaxie End
	//Highlight Top 300 players in galaxy view Begin
	(function(){
		function dec2hex(dec){
			var hex = "";
			var H = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
			var number = dec;
			var quotient;
			var remainder;
			while (number >= 16) {
				quotient = Math.floor(number / 16);
				remainder = number - 16 * quotient;
				hex = H[remainder] + hex;
				number = quotient;
			}
			hex = H[number] + hex;
			return hex;
		}
		
		var catch_line = /<td[^>]*>([^<]*)<\/td>/;
		var catch_rank = /\s(\d+)\D*$/;
		if (window.location.hostname.search(/\.com\.tr/) != -1) 
			catch_rank = /^\s(\d+)\s/;
		
		var links = document.getElementById("content").getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			if (links[i].getAttribute('onmouseover') != null) {
				var omo_attr = links[i].getAttributeNode('onmouseover').nodeValue;
				if (omo_attr.indexOf('page=writemessages') != -1) {
					catch_line.exec(omo_attr);
					var line = " " + RegExp.$1;
					catch_rank.exec(line);
					var rank = parseInt(RegExp.$1);
					if (rank <= 300 && rank != 0) {
						var GBcolor = dec2hex(Math.ceil(rank / 2) + 15);
						var color = "#FF" + GBcolor + GBcolor;
						links[i].getElementsByTagName("span")[0].style.color = color;
					}
				}
			}
		}
	})();
	//Highlight Top 300 players in galaxy view End

if (/page=resources/.test(ogtitle) == true) {
	if(readytime == "1"){
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
if (advstor == "1") {
	//Misc functions Begin!
	function locate(xpath, xpres, where){
		if (where == null) 
			return document.evaluate(xpath, document, null, xpres, null);
		return document.evaluate(xpath, where, null, xpres, null);
	}
	
	function locateFirst(xpath, where){
		return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE, where).singleNodeValue;
	}
	
	function locateSnapshot(xpath, where){
		return locate(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, where);
	}
	const c_emptyingStore = '異常狀況≧０≦';
	function tiempo2str(max, cur, prod){
		if (prod == 0) 
			return '(/≧▽≦)/~┴┴ <br>沒有產量啦!';
		if (prod < 0) {
			var result = "<font color=red title='" +c_emptyingStore+ "'>-";
			var negative = true;
			var totalSecs = Math.floor(-(max - cur) / prod * 3600);
		}
		else {
			if (cur > max) 
				return '儲存槽慘遭推倒￣▽￣|||';
			var result = "";
			var totalSecs = Math.floor((max - cur) / prod * 3600);
		}

		var secs = Math.floor(totalSecs % 60);
		var mins = Math.floor((totalSecs / 60) % 60);
		var hours = Math.floor((totalSecs / 3600) % 24);
		var days = Math.floor(totalSecs / (3600 * 24));
		
		if (days > 0) 
			result += days + '日 ';
		if (hours > 0 || days > 0) 
			result += hours + '時 ';
		if (mins > 0 || hours > 0 || days > 0) 
			result += mins + '分 ';
		if (secs > 0 || mins > 0 || hours > 0 || days > 0) 
			result += secs + '秒';
		if (negative) 
			result += "</font>";
		return result;
	}
	
	function puntuar(numero, separador){
		if (!separador) 
			var separador = '.';
		var strNum = String(parseInt(numero, 10));
		var strNum2 = '';
		var i = 0;
		for (i = strNum.length - 4; i >= 0; i -= 3) {
			strNum2 = (strNum[i] == '-' ? '' : separador) + strNum.substring(i + 1, i + 4) + strNum2;
		}
		strNum2 = strNum.substr(0, i + 4) + strNum2;
		return strNum2;
	}
	
	function formatNmb(numero){
		var nNmb = String(numero);
		var sRes = "";
		for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++) 
			sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + sRes;
		return sRes;
	}
	
	function SetCookie(name, value){
		var argv = SetCookie.arguments;
		var argc = SetCookie.arguments.length;
		//var expires = (2 < argc) ? argv[2] : null;
		var ahora = new Date(); //fecha actual
		var unAño = new Date(ahora.getTime() + 1000 * 60 * 60 * 24 * 365); //le sumamos un año 
		var expires = unAño;//expira en un año
		var path = (3 < argc) ? argv[3] : null;
		var domain = (4 < argc) ? argv[4] : null;
		var secure = (5 < argc) ? argv[5] : false;
		
		document.cookie = name + "=" + escape(value) +
		((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
	}
	
	function getCookieVal(offset){
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) 
			endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	}
	
	function GetCookie(name){
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) 
				return getCookieVal(j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) 
				break;
		}
		return null;
	}
	
	
	// save planet resources
	var resources = locateSnapshot("//table[@id='resources']//tr/td/font");
	var metal = parseInt(resources.snapshotItem(0).innerHTML.replace(/\./g, ''), 10);
	var cristal = parseInt(resources.snapshotItem(1).innerHTML.replace(/\./g, ''), 10);
	var deuterio = parseInt(resources.snapshotItem(2).innerHTML.replace(/\./g, ''), 10);
	var energia = parseInt(resources.snapshotItem(4).innerHTML.replace(/\./g, ''), 10);
	var energiaTotal = parseInt(resources.snapshotItem(4).nextSibling.nodeValue.replace(/[\.\/]/g, ''), 10);
	
	var T_Recursos = locateSnapshot("//div[@id='content']//font[@color]");
	
	var PMetal = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 12).innerHTML.replace(/\./g, '');
	var PCristal = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 11).innerHTML.replace(/\./g, '');
	var PDeut = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 10).innerHTML.replace(/\./g, '');
	
	var AlmM = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 16).innerHTML.replace(/k/, '000').replace(/\./g, '');
	var AlmC = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 15).innerHTML.replace(/k/, '000').replace(/\./g, '');
	var AlmD = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 14).innerHTML.replace(/k/, '000').replace(/\./g, '');
	
	// buscamos los satelites para indicar la energia aportada por cada uno
	try {
		var satEnergy = document.getElementsByName("last212")[0].parentNode.parentNode.getElementsByTagName('th');
		var satCount = satEnergy[0].innerHTML.match(/\d+/);
		var satProdEnergy = satEnergy[satEnergy.length - 2].lastChild.lastChild.innerHTML.replace(/[\s\.]/g, '');
		var satFactor = 10 - satEnergy[satEnergy.length - 1].childNodes[1].selectedIndex;
		var individualEnergy = satEnergy[satEnergy.length - 2].lastChild.appendChild(document.createElement('font'));
		individualEnergy.color = '#00ffaa';
		individualEnergy.innerHTML = ' (' + Math.round((satProdEnergy * 10 / satFactor) / satCount) + ')';
		individualEnergy.title = '￣◇￣||| 本星球每個太陽能衛星供應的能量';
		individualEnergy.style['cursor'] = 'pointer';
	} 
	catch (e) {
	}
	
	var XMetal = new Array(3);
	var XCristal = new Array(3);
	var XDeut = new Array(3);
	
	// producción diaria
	XMetal[0] = PMetal * 24;
	XCristal[0] = PCristal * 24;
	XDeut[0] = PDeut * 24;
	// producción semanal
	XMetal[1] = PMetal * 168;
	XCristal[1] = PCristal * 168;
	XDeut[1] = PDeut * 168;
	// producción mensual
	XMetal[2] = PMetal * 720;
	XCristal[2] = PCristal * 720;
	XDeut[2] = PDeut * 720;
	
	// Buscar Formulario de Recursos
	var ResForm = locateFirst('//table[@width=550]');
	
	// Buscar Factor de Produccion
	var Factor = 0;
	try {
		Factor = parseFloat(document.body.innerHTML.match(/生產要素(.)*\:(.)*[0-9.]/gi)[0].split(':')[1]) * 100;
	} 
	catch (e) {
	}
	var FactorPorc = parseInt(parseFloat(Factor) * 2.5, 10);
	
	//Ampliacion
	var header_top = document.getElementById('header_top');
	var planeta_coord = header_top.getElementsByTagName("select");
	
	//Obtenemos las coordenadas de los planetas actuales
	var planetas_actuales = planeta_coord[0].options;
	var tmp = new Array(planetas_actuales.length);
	for (var i = 0; i < planetas_actuales.length; i++) {
		tmp[i] = planeta_coord[0].options[i].text;
		tmp[i] = tmp[i].split("[");
		tmp[i] = tmp[i][1].split("]");
		tmp[i] = tmp[i][0].split(",");
	}
	planetas_actuales = tmp;
	planetas_actuales = planetas_actuales.sort();
	
	//Obtenemos el planeta seleccionado, las coordenadas
	var planeta = new Array(2);
	planeta = planeta_coord[0].options[planeta_coord[0].selectedIndex].text;
	planeta = planeta.split("[");
	planeta = planeta[1].split("]");
	planeta = planeta[0].split(",");
	var tmppp = planeta;
	planeta = new Array(2);
	planeta[0] = 1;
	planeta[1] = tmppp;
	
	//Produccion por hora del planeta seleccionado
	var recurso = new Array(3);
	recurso[0] = 1;
	recurso[1] = PMetal;
	recurso[2] = PCristal;
	recurso[3] = PDeut;
	
	//Almacenes del planeta seleccionado
	var almacen = new Array(3);
	almacen[0] = 1;
	almacen[1] = AlmM;
	almacen[2] = AlmC;
	almacen[3] = AlmD;
	
	var planetas; //valor de la cookie planetas con un array con todos los planetas añadidos
	var recursos; //array con los recursos de produccion hora de los planetas añadidos
	var almacenes; //array con los almacenes de los planetas añadidos
	//Si no exiten las cookies, las creamos y añadimos el planeta si este no es una luna
	if (GetCookie("planetas") == null) {
		// comprobamos que no sea una luna, metal y deuterio a cero
		if (recurso[1] != "0" && recurso[2] != "0") {
			SetCookie('planetas', planeta);
			SetCookie('recursos', recurso);
			SetCookie('almacenes', almacen);
		}
	}
	else {
	
		planetas = GetCookie("planetas");
		planetas = planetas.split(",");
		recursos = GetCookie("recursos");
		recursos = recursos.split(",");
		almacenes = GetCookie("almacenes");
		almacenes = almacenes.split(",");
		
		// varibles temporales para la comparacion de planetas actuales con los guardados en las cookies
		var tmp_planetas;
		var tmp_recursos_planetas;
		var tmp_almacenes_planetas;
		// las cookie comienza con un 1, para qeu siempre se tenga en als cookies arrays
		tmp_planetas = new Array();
		tmp_planetas[0] = 1;
		tmp_recursos_planetas = new Array(recursos.length - 3);
		tmp_recursos_planetas[0] = 1;
		tmp_almacenes_planetas = new Array(almacenes.length - 3);
		tmp_almacenes_planetas[0] = 1;
		
		//Poner a los planetas eliminados una cadena eliminar.
		for (var i = 1; i < planetas.length; i++) {
			for (var j = 0; j < planetas_actuales.length; j++) {
				if (planetas[i] == planetas_actuales[j]) {
					j = planetas_actuales.length;
				}
				else {
					//si no existe el planeta y ya ha terminado de pasar por todo el array, borramos el planeta
					if ((j + 1) == planetas_actuales.length) {
						planetas[i] = "eliminar"; // cambia las coordenas por una cadena con el contenido "elimiar"
					}
				}
			}
		}
		
		//Nuevo array con los planetas correctos y sus recursos correctos
		var cont = 1;
		for (var i = 1; i < planetas.length; i++) {
			if (planetas[i] != "eliminar") {
				tmp_planetas[cont] = planetas[i];
				tmp_recursos_planetas[cont + ((cont - 1) * 2)] = recursos[i + ((i - 1) * 2)];
				tmp_recursos_planetas[cont + ((cont - 1) * 2) + 1] = recursos[i + ((i - 1) * 2) + 1];
				tmp_recursos_planetas[cont + ((cont - 1) * 2) + 2] = recursos[i + ((i - 1) * 2) + 2];
				tmp_almacenes_planetas[cont + ((cont - 1) * 2)] = almacenes[i + ((i - 1) * 2)];
				tmp_almacenes_planetas[cont + ((cont - 1) * 2) + 1] = almacenes[i + ((i - 1) * 2) + 1];
				tmp_almacenes_planetas[cont + ((cont - 1) * 2) + 2] = almacenes[i + ((i - 1) * 2) + 2];
				cont++;
			}
		}
		
		
		// actualizamos los array planetas y recursos
		planetas = tmp_planetas;
		recursos = tmp_recursos_planetas;
		almacenes = tmp_almacenes_planetas;
		
		// Comprobamos los cambios del a producion del planeta seleccionado para una posible actualizacion.
		for (var t = 1; t < planetas.length; t++) {
			if (planetas[t] == planeta[1]) {
				// comprobamos que no sea una luna , metal y cristal a cero
				if (recurso[1] != "0" && recurso[2] != "0") {
					if (recursos[t + ((t - 1) * 2)] != recurso[1]) {
						recursos[t + ((t - 1) * 2)] = recurso[1];
					}
					if (recursos[t + ((t - 1) * 2) + 1] != recurso[2]) {
						recursos[t + ((t - 1) * 2) + 1] = recurso[2];
					}
					if (recursos[t + ((t - 1) * 2) + 2] != recurso[3]) {
						recursos[t + ((t - 1) * 2) + 2] = recurso[3];
					}
				}
			}
		}
		
		for (var t = 1; t < almacenes.length; t++) {
			if (planetas[t] == planeta[1]) {
				// comprobamos que no sea una luna , metal y cristal a cero
				if (recurso[1] != "0" && recurso[2] != "0") {
					if (almacenes[t + ((t - 1) * 2)] != almacen[1]) {
						almacenes[t + ((t - 1) * 2)] = almacen[1];
					}
					if (almacenes[t + ((t - 1) * 2) + 1] != almacen[2]) {
						almacenes[t + ((t - 1) * 2) + 1] = almacen[2];
					}
					if (almacenes[t + ((t - 1) * 2) + 2] != almacen[3]) {
						almacenes[t + ((t - 1) * 2) + 2] = almacen[3];
					}
				}
			}
		}
		
		// guardamos los cambios
		SetCookie('planetas', planetas);
		SetCookie('recursos', recursos);
		SetCookie('almacenes', almacenes);
		
		planetas = GetCookie("planetas");
		planetas = planetas.split(",");
		recursos = GetCookie("recursos");
		recursos = recursos.split(",");
		almacenes = GetCookie("almacenes");
		almacenes = almacenes.split(",");
		
		//Para añadir un nuevo planeta
		for (var i = 1; i < planetas.length; i++) {
			//si exite el planeta finalizamos el for
			if (planetas[i] == planeta[1]) {
				i = planetas.length;
			}
			else {
				//si no existe el planeta y ya ha terminado de pasar por todo el array, añadimos el planeta
				if ((i + 1) == planetas.length) {
					// comprobamos que no sea una luna, metal y deuterio a cero
					if (recurso[1] != "0" && recurso[2] != "0") {
						planetas[i + 1] = planeta[1];
						recursos[i + 1 + (i * 2)] = recurso[1];
						recursos[i + 1 + (i * 2) + 1] = recurso[2];
						recursos[i + 1 + (i * 2) + 2] = recurso[3];
						almacenes[i + 1 + (i * 2)] = almacen[1];
						almacenes[i + 1 + (i * 2) + 1] = almacen[2];
						almacenes[i + 1 + (i * 2) + 2] = almacen[3];
						SetCookie('planetas', planetas);
						SetCookie('recursos', recursos);
						SetCookie('almacenes', almacenes);
					}
				}
			}
		}
		
		
	}
	
	// Agregar tabla de factor de produccion
	if (ResForm) {
		// Buscar Produccion Real
		
		// Procesar Tablas
		var ProdFact = document.createElement('div');
		ProdFact.innerHTML = '<table width="550"><tr>' +
		'<td class="c" style="text-align:center;">☆資源建築運作效率☆</td>' +
		'<th>' +
		Factor +
		'%</th>' +
		'<th width="250"><div style="border: 1px solid #9999FF; width: 250px;"><div id="prodBar" style="background-color: 		' +
		(Factor < 100 ? '#C00000' : '#00C000') +
		'; width: 0px;">&nbsp;</div></div></th>' +
		'</tr></table><br />';
		
		var EAlmM = (metal / AlmM) * 100;
		var EAlmMPorc = parseInt((metal / AlmM) * 250, 10);
		var EAlmC = (cristal / AlmC) * 100;
		var EAlmCPorc = parseInt((cristal / AlmC) * 250, 10);
		var EAlmD = (deuterio / AlmD) * 100;
		var EAlmDPorc = parseInt((deuterio / AlmD) * 250, 10);
		
		EAlmM = Math.round(EAlmM);
		EAlmC = Math.round(EAlmC);
		EAlmD = Math.round(EAlmD);
		
		unsafeWindow.puntuar = puntuar;
		
		var CuentaRec = document.createElement('div');
		CuentaRec.innerHTML = '<br /><table width="550">' +
		'<tr><td class="c" colspan="4">☆資源產量資訊☆</td></tr>' +
		'<tr><th width=22%>資源類別</th>' +
		'<td width=26% class="c" align=center>金屬</td>' +
		'<td width=26% class="c" align=center>晶體</td>' +
		'<td width=26% class="c" align=center>重氫</td>' +
		'</tr><tr>' +
		
		
		'<td class="c" colspan="4">☆資源產量統計☆</td>' +
		'</tr><tr>' +
		'<td class="c" align=center>每日</td>' +
		'<th><font color="#00ff00">' +
		puntuar(XMetal[0]) +
		'</font></th>' +
		'<th><font color="#00ff00">' +
		puntuar(XCristal[0]) +
		'</font></th>' +
		'<th><font color="#00ff00">' +
		puntuar(XDeut[0]) +
		'</font></th>' +
		'</tr><tr>' +
		'<td class="c" align=center>每週</td>' +
		'<th><font color="#00ff00">' +
		puntuar(XMetal[1]) +
		'</font></th>' +
		'<th><font color="#00ff00">' +
		puntuar(XCristal[1]) +
		'</font></th>' +
		'<th><font color="#00ff00">' +
		puntuar(XDeut[1]) +
		'</font></th>' +
		'</tr><tr>' +
		'<td class="c" align=center>每月</td>' +
		'<th><font color="#00ff00">' +
		puntuar(XMetal[2]) +
		'</font></th>' +
		'<th><font color="#00ff00">' +
		puntuar(XCristal[2]) +
		'</font></th>' +
		'<th><font color="#00ff00">' +
		puntuar(XDeut[2]) +
		'</font></th>' +
		'</tr><tr>' +
		
		
		'<td class="c" colspan="4">☆資源產量計算☆</td>' +
		'</tr><tr>' +
		'<td class="c" title="請輸入時間╯﹏╰" align=center onkeyup="' +
		'var dias = 0;' +
		'if (this.childNodes[0].value != \'\') ' +
		'dias = parseInt(this.childNodes[0].value,10);' +
		'var horas = 0;' +
		'if (this.childNodes[2].value != \'\') ' +
		'horas = parseInt(this.childNodes[2].value,10);' +
		'if (horas>=24) {' +
		'this.childNodes[2].value=horas%24;' +
		'this.childNodes[0].value=Math.floor(dias+horas/24); } ' +
		
		'this.parentNode.childNodes[1].firstChild.innerHTML=puntuar((dias*24+horas)*' +
		PMetal +
		');this.parentNode.childNodes[2].firstChild.innerHTML=puntuar((dias*24+horas)*' +
		PCristal +
		');this.parentNode.childNodes[3].firstChild.innerHTML=puntuar((dias*24+horas)*' +
		PDeut +
		');"><input style="text-align:center;" value="0" size="1%" type=text />&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;<input style="text-align:center;" value="0" size="1%" type=text /> 時</td>' +
		'<th><font color="#00ff00">0</font></th>' +
		'<th><font color="#00ff00">0</font></th>' +
		'<th><font color="#00ff00">0</font></th>' +
		'</tr><tr>' +
		
		
		'<td class="c" colspan="4">☆儲存器資訊☆</td>' +
		'</tr><tr>' +
		'<td class="c" align=center title="儲存器現已使用之容量">－ －"已使用容量</td>' +
		'<th><div title="' +
		EAlmM +
		'%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmMBar" style="background-color: ' +
		(EAlmM > 100 ? '#C00000' : '#00C000') +
		'; width: 0%;"><b><font color=#3852FE>' +
		EAlmM +
		'%</font></b></div></div></th>' +
		'<th><div title="' +
		EAlmC +
		'%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmCBar" style="background-color: ' +
		(EAlmC > 100 ? '#C00000' : '#00C000') +
		'; width: 0%;"><b><font color=#3852FE>' +
		EAlmC +
		'%</font></b></div></div></th>' +
		'<th><div title="' +
		EAlmD +
		'%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmDBar" style="background-color: ' +
		(EAlmD > 100 ? '#C00000' : '#00C000') +
		'; width: 0%;"><b><font color=#3852FE>' +
		EAlmD +
		'%</font></b></div></div></th>' +
		'</tr><tr>' +
		'<td class="c" align=center title="推倒儲存器還差多少時間￣▽￣|||">距破表O_o，剩餘</td>' +
		'<th><font color=ffaa8e>' +
		tiempo2str(AlmM, metal, PMetal) +
		'</font></th>' +
		'<th><font color=87c1fe>' +
		tiempo2str(AlmC, cristal, PCristal) +
		'</font></th>' +
		'<th><font color=ffcc45>' +
		tiempo2str(AlmD, deuterio, PDeut) +
		'</font></th>' +
		'</tr></table><br />';
		
		//Tabla de la ampliacion con los recursos totales de los planetas sumados
		
		if (GetCookie("planetas") == null) {
		
			// comprobamos que no sea una luna, metal y deuterio a cero
			if (recurso[1] != "0" && recurso[2] != "0") {
				CuentaRec.innerHTML += '<table width="550">' + '<tr><td class="c" colspan="4">☆人工產量統計☆ (已統計的星球數: 0 )</td></tr><tr><td  class="c" colspan="4">統計中￣□￣|||</td></tr></table><br />';
			}
			else {
				CuentaRec.innerHTML += '<table width="550">' + '<tr><td class="c" colspan="4">☆人工產量統計☆(無法統計)</td></tr><tr><td  class="c" colspan="4">月球並無資源產量╯︿╰或統計發生錯誤</td></tr></table><br />';
			}
			
		}
		else {
		
			planetas_format = GetCookie("planetas");
			planetas_format = planetas_format.split(",");
			planetas_format = planetas_format.sort();
			planetas_format_final = "";
			
			for (var i = 1; i < planetas_format.length; i++) {
				if (i == 5) {
					planetas_format_final += '[' + planetas_format[i] + ']<br>';
					continue;
				}
				if (i == 9) {
					planetas_format_final += '[' + planetas_format[i] + ']';
					continue;
				}
				planetas_format_final += '[' + planetas_format[i] + ']<font color="#FEFF8A"><b>|</b></font>';
			}
			
			planetas_recursos = GetCookie("recursos");
			planetas_recursos = planetas_recursos.split(",");
			planetas_recursos_metal = 0;
			planetas_recursos_cristal = 0;
			planetas_recursos_deuterio = 0;
			
			// Suma de los recuros diarios de cada planeta
			for (var i = 1; i < planetas_recursos.length; i++) {
				if (i % 3 == 1) {
					planetas_recursos_metal = planetas_recursos_metal + parseInt(planetas_recursos[i]);
				}
				if (i % 3 == 2) {
					planetas_recursos_cristal = planetas_recursos_cristal + parseInt(planetas_recursos[i]);
				}
				if (i % 3 == 0) {
					planetas_recursos_deuterio = planetas_recursos_deuterio + parseInt(planetas_recursos[i]);
				}
			}
			
			
			CuentaRec.innerHTML += '<table width="550">' + '<tr><td class="c" colspan="4">☆人工產量統計☆ (已統計的星球數: ' + (planetas_format.length - 1) + ' )</td></tr><tr><td class="c" style="width:40%;text-align:center;color:#EAFF9C"><(￣︶￣)/ 星球位置</td><td style="width:60%;text-align:center;" class="c" colspan="3">' + planetas_format_final + '</td></tr>' + '<tr>' + '<td class="c" style="text-align:center;"><s>(正太)</s>類別</td>' + '<th style="width:20%;">每日</th>' + '<th style="width:20%;">每週</th>' + '<th style="width:20%;">每月</th>' + '</tr>' + '<tr>' + '<td class="c" style="text-align:center;"><font color="#F1531E" style="margin-right:15px;"> o(≧v≦)o <s>(傳說級)</s>金屬</font></td>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_metal * 24) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_metal * 168) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_metal * 720) + '</font></th>' + '</tr>' + '<tr>' + '<td class="c" style="text-align:center;"><font color="#54B0DC" style="margin-right:15px;"> o(≧v≦)o <s>(夢幻級)</s>晶體</font></td>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_cristal * 24) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_cristal * 168) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_cristal * 720) + '</font></th>' + '</tr>' + '<tr>' + '<td class="c" style="text-align:center;"><font color="#9AACCB" style="margin-right:15px;"> o(≧v≦)o <s>(灰飛湮滅級)</s>重氫</td>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_deuterio * 24) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_deuterio * 168) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb(planetas_recursos_deuterio * 720) + '</font></th>' + '</tr>' + '<tr>' + '<td class="c" style="text-align:center;"><font color="#A7FFC2">o(≧v≦)o<s>(失落級)</s>資源總計</td>' + '<th><font color="#00ff00">' + formatNmb((planetas_recursos_metal * 24) + (planetas_recursos_cristal * 24) + (planetas_recursos_deuterio * 24)) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb((planetas_recursos_metal * 168) + (planetas_recursos_cristal * 168) + (planetas_recursos_deuterio * 168)) + '</font></th>' + '<th><font color="#00ff00">' + formatNmb((planetas_recursos_metal * 720) + (planetas_recursos_cristal * 720) + (planetas_recursos_deuterio * 720)) + '</font></th>' + '</tr></table><br />';
			
			
		}
		
		ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
		ResForm.parentNode.insertBefore(ProdFact, ResForm);
		document.body.innerHTML = document.body.innerHTML.replace(/生產要素(.)*\:(.)*[0-9.]/gi, '');
		
		function colorBar(porcentaje){
			if (porcentaje >= 100) {
				return "rgb(255, 0, 0);";
			}
			else {
				var fstColor = Math.floor(2.55 * porcentaje);
				var sndColor = Math.floor(2.55 * (100 - porcentaje));
				return "rgb(" + fstColor + ", " + sndColor + ", 0);";
			}
		}
		function fillBar(ids, percents){
			idList = ids.split(':');
			perList = percents.split(':');
			var continuar = false;
			for (var i = 0; i < idList.length; i++) {
				var bar = document.getElementById(idList[i]);
				var width = parseInt(bar.style['width'].split('%')[0], 10);
				if (width < perList[i]) {
					bar.style['width'] = String(width + Math.max(perList[i] / 50, 1)) + '%';
					if (i == 0) 
						width = 100 - width;
					bar.style['background'] = colorBar(width);
					continuar = true;
				}
			}
			if (continuar) 
				setTimeout('fillBar("' + ids + '", "' + percents + '")', 40);
		}
		unsafeWindow.fillBar = fillBar;
		setTimeout('fillBar("' +["prodBar","AlmMBar","AlmCBar","AlmDBar"] .join(":") + '", "' +[Math.min(Factor,100),Math.min(EAlmM,100),Math.min(EAlmC,100),Math.min(EAlmD,100)] .join(":") + '")', 100);
	}
}
}
//New Time Display Begin
if (/page=overview/.test(ogtitle) == true) {
	if (localtime == "1") {
		var LT_loc = new Array();
		LT_loc[0] = "Local time"; //ogame.org
		LT_loc[15] = "本地時間"; //ogame.tw
		var nodo = xpath('//div[@id="content"]/center/table[1]/tbody').snapshotItem(0);
		if (nodo.childNodes[2].innerHTML.search('colspan="3"') != -1) 
			nodo = nodo.childNodes[2]
		else 
			nodo = nodo.childNodes[4];
		
		var date = new Date();
		var mes = date.getMonth();
		var dia = date.getDay();
		var diaNum = date.getDate();
		var hora = date.getHours();
		var mins = date.getMinutes();
		var segs = date.getSeconds();
		
		var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
		var fechaLocal = O_days[langloca][dia] + " " + diaNum + " - " + O_months[langloca][mes] + " - " + ((hora < 10) ? "0" : "") + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;
		var fechaServer = O_days[langloca][findPos(days, fecha[1])] + " " + fecha[3] + " - " + O_months[langloca][findPos(months, fecha[2])] + " - " + ((fecha[4] < 10) ? "0" : "") + fecha[4] + fecha[5];
		
		var nodoLocal = document.createElement("tr");
		nodo.parentNode.insertBefore(nodoLocal, nodo.nextSibling);
		nodoLocal.innerHTML = "<th>" + LT_loc[langloca] + "</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
		

		nodo.childNodes[3].setAttribute('id', 'ClockServer');
		nodo.childNodes[3].innerHTML =  fechaServer ;
		
		setTimeout(clock, 1000);
	}
//New Time Display End	
//Misssion Colors Reset Begin
	if (mission_colors == "1") {
	
		const lng_ownattack = 'flight ownattack';
		const lng_rownattack = 'return ownattack';
		const lng_ownespionage = 'flight ownespionage';
		const lng_rownespionage = 'return ownespionage';
		const lng_owntransport = 'flight owntransport';
		const lng_rowntransport = 'return owntransport';
		const lng_fowndeploy = 'flight owndeploy';
		const lng_rowndeploy = 'return owndeploy';
		const lng_fownharvest = 'flight ownharvest';
		const lng_rownharvest = 'return ownharvest';
		
		//alert(color_ownharvest + '-' + darken(color_ownharvest));
		
		//coloreado vision general
		var publi = document.getElementsByTagName('span');
		for (var i = publi.length - 1; i >= 0; i--) {
			if (publi[i].className == lng_ownattack) 
				publi[i].style.color = color_attack
			else 
				if (publi[i].className == lng_rownattack) 
					publi[i].style.color = darken(color_attack)
				else 
					if (publi[i].className == lng_ownespionage) 
						publi[i].style.color = color_spy
					else 
						if (publi[i].className == lng_rownespionage) 
							publi[i].style.color = darken(color_spy)
						else 
							if (publi[i].className == lng_owntransport) 
								publi[i].style.color = color_otransport
							else 
								if (publi[i].className == lng_rowntransport) 
									publi[i].style.color = darken(color_otransport)
								else 
									if (publi[i].className == lng_fowndeploy) 
										publi[i].style.color = color_owndeploy
									else 
										if (publi[i].className == lng_rowndeploy) 
											publi[i].style.color = darken(color_owndeploy)
										else 
											if (publi[i].className == lng_fownharvest) 
												publi[i].style.color = color_ownharvest
											else 
												if (publi[i].className == lng_rownharvest) 
													publi[i].style.color = darken(color_ownharvest)
		}
	}
}
//Misssion Colors Reset End
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
		batholder = "<table width='100%'><tr><td class='c' colspan='5'>戰鬥報告</td></tr><tr><th colspan='2'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+batholder+"</table><br>";
	}	
	if(spyholder.length>0){
		spyholder = "<table width='100%'><tr><td></td><td class='c' colspan='5'>間諜報告</td></tr><tr><td></td><th colspan='2'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+spyholder+"</table>";
	}
	if(allyholder.length>0){
		allyholder = "<table width='100%'><tr><td class='c' colspan='6'>聯盟訊息</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+allyholder+"</table><br>";
	}	
	if(userholder.length>0){
		userholder = "<table width='100%'><tr><td class='c' colspan='6'>玩家訊息</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+userholder+"</table><br>";
	}
	if(othersholder.length>0){
		othersholder = "<table width='100%'><tr><td class='c' colspan='6'>雜項訊息</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+othersholder+"</table>";
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
		T_rc[15] = "☆資源字的顏色☆"; //ogame.tw
		
	var L_mc = new Array(); //3.
		L_mc[0] = "Metal color"; //ogame.org
		L_mc[15] = "金屬顏色"; //ogame.tw
		
	var L_cc = new Array(); //4.
		L_cc[0] = "Crystal color"; //ogame.org
		L_cc[15] = "晶體顏色"; //ogame.tw
		
	var L_dc = new Array(); //5.
		L_dc[0] = "Deuterium color"; //ogame.org
		L_dc[15] = "重氫顏色"; //ogame.tw
		
	var L_ec = new Array(); //6.
		L_ec[0] = "Energy color"; //ogame.org
		L_ec[15] = "能量顏色"; //ogame.tw
		
	var R_rt = new Array(); //7.
		R_rt[0] = "One click to reset the color, double-click to erase the color"; //ogame.org
		R_rt[15] = "單擊滑鼠左鍵重置顏色!雙擊滑鼠左鍵消除顏色!"; //ogame.tw
		
	var T_ar = new Array(); //8.
		T_ar[0] = "Advertisement Remover"; //ogame.org
		T_ar[15] = "☆廣告移除設置☆(警告!使用此設置必須承擔風險!)"; //ogame.tw
		
	var L_sa = new Array(); //9.
		L_sa[0] = "Normal ads"; //ogame.org
		L_sa[15] = "一般正常廣告"; //ogame.tw
		
	/*var L_coa = new Array(); //10.
		L_coa[0] = "Commander Info ad link"; //ogame.org
		L_coa[15] = "指揮官資訊廣告鏈結"; //ogame.tw
	*/
	
	var L_dm = new Array(); //10.
	    L_dm[0] = "Dark Matter Icon"; //ogame.org
		L_dm[15] = "黑暗物質圖示(建議保留)"; //ogame.tw
		
	var L_ica = new Array(); //11.
		L_ica[0] = "Officer's Casino ad link"; //ogame.org
		L_ica[15] = "事務官廣告鏈結"; //ogame.tw
		
	var L_topa = new Array(); //12.
		L_topa[0] = "Top upgrade icons ads"; //ogame.org
		L_topa[15] = "事務官圖示(建議保留)"; //ogame.tw
		
	var T_ut = new Array(); //13.
		T_ut[0] = "Utilities"; //ogame.org
		T_ut[15] = "☆實用的設置☆(警告!使用此設置必須承擔風險!)"; //ogame.tw
		
	var L_rs = new Array(); //14.
		L_rs[0] = "Debris harvest link"; //ogame.org
		L_rs[15] = "殘骸回收超連結"; //ogame.tw
		
	var L_sp = new Array(); //15.
		L_sp[0] = "Moon spy link"; //ogame.org
		L_sp[15] = "間諜探測月球"; //ogame.tw
		
	var L_mxs = new Array(); //16.
		L_mxs[0] = "Maximum ships and defenses"; //ogame.org
		L_mxs[15] = "船艦與防禦數量最大化"; //ogame.tw
		
	var L_cdesc = new Array(); //17.
		L_cdesc[0] = "Minimize descriptions"; //ogame.org
		L_cdesc[15] = "註解最小化(不建議使用)"; //ogame.tw
		
	var L_loct = new Array(); //17.
		L_loct[0] = "Show local time"; //ogame.org
		L_loct[15] = "顯示本地時間"; //ogame.tw
		
	var T_misc= new Array(); //18.
		T_misc[0] = "Mision Colors"; //ogame.org
		T_misc[15] = "☆艦隊任務顏色置換☆"; //ogame.tw
		
	var L_miscchk= new Array(); //19.
		L_miscchk[0] = "Activate Mission Colors"; //ogame.org
		L_miscchk[15] = "使用置換後的艦隊任務顏色"; //ogame.tw
		
	var L_atc= new Array(); //19.
		L_atc[0] = "Attack"; //ogame.org
		L_atc[15] = "艦隊攻擊"; //ogame.tw
		
	var L_esc= new Array(); //20.
		L_esc[0] = "Espionage"; //ogame.org
		L_esc[15] = "間諜探測"; //ogame.tw
		
	var L_dec= new Array(); //21.
		L_dec[0] = "Transport"; //ogame.org
		L_dec[15] = "艦隊派遣"; //ogame.tw
		
	var L_hac= new Array(); //22.
		L_hac[0] = "Harvest"; //ogame.org
		L_hac[15] = "戰場廢墟回收"; //ogame.tw
		
	var L_otrc= new Array(); //23.
		L_otrc[0] = "Own Transport"; //ogame.org
		L_otrc[15] = "艦隊運輸"; //ogame.tw
		
	var B_sv = xpath("//input[@type='submit']");
	if(B_sv.snapshotLength > 0){B_sv = B_sv.snapshotItem(0).value;} else {B_sv = "?????? SAVE ??????";}
	
	if(notdetected){
		
		var T_lang= new Array(); //18.
			T_lang[0] = "<a href='http://userscripts.org/scripts/show/8938'>[Language not detected: you MUST choose the right one to work properly]</a>"; //ogame.org
			T_lang[15] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x672A;&#x6B63;&#x78BA;&#x5075;&#x6E2C;&#x5230;&#x60A8;&#x7684;&#x8A9E;&#x8A00;&#xFF1A;&#x60A8;&#x5FC5;&#x9808;&#x9078;&#x64C7;&#x4E00;&#x500B;&#x6B63;&#x78BA;&#x7684;&#x8A9E;&#x8A00;&#x624D;&#x80FD;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;]</a>"; //ogame.tw
			
		var L_cl = new Array(); //19.
			L_cl[0] = "Choose location"; //ogame.org
			L_cl[15] = "&#x9078;&#x64C7;&#x4F4D;&#x7F6E;"; //ogame.tw
			
		var languages = new Array;
			languages[0] = "org";
			languages[15] = "tw";
		
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
		"<tr><th>"+L_otrc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('owntransportcolor','"+color_otransport+"')\" ondblclick=\"resetbut('owntransportcolor','')\"><input type=\"text\" onkeyup=\"changer('owntransportcolor')\" style=\"color:"+color_otransport+";\" id=\"owntransportcolor\" maxlength=\"18\" size =\"20\" value=\""+color_otransport+"\"></th></tr>"+
		"<tr><th>"+L_hac[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('ownharvestcolor','"+color_ownharvest+"')\" ondblclick=\"resetbut('ownharvestcolor','')\"><input type=\"text\" onkeyup=\"changer('ownharvestcolor')\" style=\"color:"+color_ownharvest+";\" id=\"ownharvestcolor\" maxlength=\"18\" size =\"20\" value=\""+color_ownharvest+"\"></th></tr>"+
		"<tr><th>"+L_dec[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('owndeploycolor','"+color_owndeploy+"')\" ondblclick=\"resetbut('owndeploycolor','')\"><input type=\"text\" onkeyup=\"changer('owndeploycolor')\" style=\"color:"+color_owndeploy+";\" id=\"owndeploycolor\" maxlength=\"18\" size =\"20\" value=\""+color_owndeploy+"\"></th></tr>"+
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
		"<tr><th>可伸縮式左側選單(部份面板有Bug)</th><th><input type=\"checkbox\" id=\"lemenu\" value=\""+lemenu+"\" "+togglecheck(lemenu)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>進階訊息頁面(BATE與Foxgametw有衝突)</th><th><input type=\"checkbox\" id=\"advmess\" value=\""+advmess+"\" "+togglecheck(advmess)+" onclick="+butjava+"></th></tr>"+langtable+
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
	var menutable = document.getElementById('menu').getElementsByTagName('table')[0];
	if (menutable) {
		var menurows = menutable.getElementsByTagName('tr');
		for (var i = 0; i < menurows.length; i++) {
			if(menurows[i].innerHTML.indexOf('page=micropayment') != -1){
				menutable.deleteRow(i);											
			}
		}
	}
	//document.getElementById('darkmatter2').parentNode.parentNode.style['display']='none';
	//var obj = document.getElementById('darkmatter2');
    //if (obj) obj.parentNode.removeChild(obj);
}
if(topicons == "1"){
	del("//td[@align='center' and @width='35']/parent::tr/parent::tbody/parent::table/parent::td");
}
//---------del ads end
if ((/page=buildings.*mode=Forschung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true)) {
	if (readytime == "1") {
		//Calcula RSND Begin
		// constantes de contrucciones
		const br = "<br>";
		const sp = "&nbsp;";
		const cRequiereComandante = "<span class=\"noresources\">"
		const cBarraB = "</b>";
		const cBarraSpan = "</span>";
		
		var sMetalName = "金屬";
		var sCristName = "晶體";
		var sDeutName = "重氫";
		
		var strHTML;
		var strTemp;
		var strTempNec;
		var bComandante;
		var iReqM;
		var iReqC;
		var iReqD;
		var iReqTotal;
		var iDispM;
		var iDispC;
		var iDispD;
		//var regexCom   = '<a style="cursor: pointer" title="\-\b(\d{1,3}\.)?(\d{3,3}\.){0,2}\d{1,3}\b"><span class="noresources">';
		var regexCom1 = /<span [^>]*>/g;
		var regexCom2 = /<a [^>]*>/g;
		var regexCom3 = /<\/span><\/a>/g;
		var regexCom4 = /<font[^>]*>/g;
		
		//Funcao para arredondar
		function roundNumber(num, dec){
			var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
			return result;
		}
		
		function LZ(x){
			return (x < 0 || x > 9 ? "" : "0") + x
		};
		
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
		
		function locate(xpath, xpres){
			return document.evaluate(xpath, document, null, xpres, null);
		}
		
		function locateFirst(xpath){
			// gracias SpitFire: http://userscripts.org/scripts/show/8555
			return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
		}
		
		function get_from_to(strLine, begin, end){
			var strTemp;
			
			strTemp = strLine.substring(strLine.indexOf(begin) + begin.length, strLine.length);
			return strTemp.substring(0, strTemp.indexOf(end));
		}
		
(function(){
			var table;
			
			//recursos actuales
			table = document.getElementById('resources').childNodes[1].childNodes[4];
			for (i = 0; i < table.childNodes.length; i++) {
				switch (i) {
					case 1:
						//Metal
						iDispM = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g, ''));
						break;
					case 3:
						//Cristal
						iDispC = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g, ''));
						break;
					case 5:
						//Deuterio
						iDispD = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g, ''));
						break;
				};
							}
			
			if (location.href.search("building") != -1) {
				for (i = 0; i < document.getElementsByTagName("td").length; i++) {
				
					//alert(iDispM + '-' + iDispC + '-' + iDispD);
					if (document.getElementsByTagName("td").item(i).className == "l") {
						strHTML = document.getElementsByTagName("td").item(i).innerHTML;
						
						//if (i == 53) alert(i + '$$' + strHTML);
						strHTML = strHTML.replace(regexCom1, '');
						strHTML = strHTML.replace(regexCom2, '<b>');
						strHTML = strHTML.replace(regexCom3, cBarraB);
						
						iReqM = parseInt(get_from_to(strHTML, cRequiereComandante, cBarraSpan).replace(/[.]/g, ''));
						iReqM = parseInt(get_from_to(strHTML, sMetalName + ': <b>', cBarraB).replace(/[.]/g, ''));
						iReqC = parseInt(get_from_to(strHTML, sCristName + ': <b>', cBarraB).replace(/[.]/g, ''));
						iReqD = parseInt(get_from_to(strHTML, sDeutName + ': <b>', cBarraB).replace(/[.]/g, ''));
						
						iReqTotal = 0;
						strTemp = "";
						
						//Tempo Necessário - Metal
						if (!(isNaN(iReqM))) {
							var MFM = iReqM - iDispM;
							strTempNec = "";
						}
						//Tempo Necessário - Metal
						
						//Tempo Necessário - Cristal
						if (!(isNaN(iReqC))) {
							var MFC = iReqC - iDispC;
							strTempNec = "";
						}
						//Tempo Necessário - Cristal
						
						//Tempo Necessário - Deutério
						if (!(isNaN(iReqD))) {
							var MFD = iReqD - iDispD;
							strTempNec = "";
						}
						//Tempo Necessário - Deutério
						
						if (!(isNaN(iReqM))) {
							if (iReqM < iDispM) {
								strTemp = strTemp + sMetalName + ": <b>0</b>" + sp;
							}
							else {
								iReqTotal += MFM;
								strTemp = strTemp + "<font color=ffafd4>" + sMetalName + ":</font> <b><i>" + addDots(MFM) + "</i></b></font> " + strTempNec + sp;
							};
													};
						if (!(isNaN(iReqC))) {
							if (iReqC < iDispC) {
								strTemp = strTemp + sCristName + ": <b>0</b>" + sp;
							}
							else {
								strTemp = strTemp + "<font color=ffa7b1>" + sCristName + ":</font> <b><i>" + addDots(MFC) + "</i></b></font> " + strTempNec + sp;
								iReqTotal += MFC;
							};
													};
						if (!(isNaN(iReqD))) {
							//alert(iReqD + "-" + iDispD);
							if (iReqD < iDispD) {
								strTemp = strTemp + sDeutName + ": <b>0</b>" + sp;
							}
							else {
								strTemp = strTemp + "<font color=ff8e84>" + sDeutName + ":</font> <b><i>" + addDots(MFD) + "</i></b></font> " + strTempNec + sp;
								iReqTotal += MFD;
							};
													};
						if (strTemp.length != 0) {
							strTemp = document.getElementsByTagName("td").item(i).innerHTML +
							br +
							"<font color=ffe7ae>預估資源差距: </font>" +
							strTemp;
							strTemp = strTemp.replace(/<br><br>/g, br);
							document.getElementsByTagName("td").item(i).innerHTML = strTemp;
						}
					}
				}
			}
		})();
		//Calcula RSND End
	}
}
if (/page=b_building/.test(ogtitle) == true) {
		if (window.opera) 
			dump = window.opera.postError; // let us support opera ;)
		//*****************************************************************************************
		function anon_energystatus(document){
			try {
				// retrives energy - dark mater safe
				var obj = document.evaluate('//table[@id="resources"]/child::tbody/child::tr[3]/child::td', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var fdm = obj.snapshotLength >= 5; // [>=] if they add something else ...
				var energy = parseInt(obj.snapshotItem((fdm ? 4 : 3)).textContent.replace(/([\-\d\.]{1,})\/([\d\.]{1,})/i, '$1').replace(/[\.]/gi, ''));
				
				// retrive buildings
				var obj = document.evaluate('//tr/child::td[2]/child::a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
				for (var i = 0; i < obj.snapshotLength; i++) {
					var obj2 = obj.snapshotItem(i); // building row
					var gid = obj2.href.replace(/.*gid=([\d]{1,}).*/i, '$1'); // building id
					var text = obj2.parentNode.textContent; // building text
					var level = 0; // will be filled with level
					var result = null; // result energy
					var researchEnergyLevel = parseInt(checker((ogserver + "elv"), "0"));
					
					if (text.indexOf('(') > 0) // read level
						level = parseInt(text.substring(text.indexOf('('), text.indexOf(')')).replace(/[\D]/gi, '')) ||
						0;
					
					switch (parseInt(gid)) { // calculate energy status
						case 1:
						case 2:
							result = energy // metal & crystal mine
 -
							parseInt((10 * (level + 1) * Math.pow(1.1, (level + 1))) -
							(10 * level * Math.pow(1.1, level)));
							break;
						case 3:
							result = energy // deut
 -
							parseInt((20 * (level + 1) * Math.pow(1.1, (level + 1))) -
							(20 * level * Math.pow(1.1, level)));
							break;
						case 4:
							result = energy // solar
 +
							parseInt((20 * (level + 1) * Math.pow(1.1, (level + 1))) -
							(20 * level * Math.pow(1.1, level)));
							break;
						case 12:
							result = energy // fusion
 +
							parseInt((30 * (level + 1) * Math.pow(1.05 + (researchEnergyLevel / 100), (level + 1))) -
							(30 * level * Math.pow(1.05 + (researchEnergyLevel / 100), level)));
					};
					
					if (result != null) { // if result, add energy status
						var font = document.createElement("regular");
						font.innerHTML = '<font color=ffa98a>☆人工預估☆能量剩餘：</font><b><font color="' +
						(result > 0 ? 'lime' : 'red') +
						'">' +
						(result > 0 ? '+' : '') +
						result +
						'</font></b>';
						var node = obj2.parentNode;
						node.insertBefore(font, node.getElementsByTagName("br")[0]);
					}
					if (gid == 12) 
						break; // no more buildings needed
				};// end if
							} 
			catch (e) {
				alert(e);
			};
					};
		
		if (window.opera) {
			document.addEventListener('DOMContentLoaded', function(ev){
				anon_energystatus(document);
			}, false);
		}
		else {
			anon_energystatus(document);
		};
}