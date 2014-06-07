// ==UserScript==
// @name            OG  Lista farmi
// @namespace       http://www.ogame.ba
// @description     Lista farmi .BA
// @source          http://mapaogame.net/farmlist
// @identifier      http://mapaogame.net/farmlist/farmlist.user.js
// @version         0.2.1
// @date            2006-04-02
// @creator         Staszek Jemiola <ogame@krzysiek.org>  translate by someone
// @include         http://*/game/*.php*
// ==/UserScript==

// Skrypt bazuje na operowych "Pomocnych Linkach" by xard4s

// Instrukcja:
// Skrypt dla Firefox, wymaga rozszerzenia Greasemonkey, kt?re mo?na pobra?
// ze strony http://greasemonkey.mozdev.org
// Po zainstalowaniu skryptu w menu OGame pojawi� si� dodatkowe opcje.
// Aby doda? wsp?rz?dne poza u�yciem opcji "Dodaj kordy" mo�na klikn�� na numer 
// oznaczaj�cy pozycj� planety w uk�adzie (1-15) w wybranym uk�adzie na mapie galaktyki
// Na stronie Zarz�dzanie klikni�cie na:
// - numer pozwala przenie�� wsp�rz�dne na inne miejsce
// - wsp�rz�dne przenosi do danego uk�adu na mapie galaktyki
// - opisie umo�liwia edycj� wpisu
// Przy wysy�aniu floty z zapisanych wsp�rz�dnych mo�na korzysta� tak jak z link�w
// do w�asnych kolonii.

function addCoords(event) {
	if (gala) {
		planeta = event.target.childNodes[0].nodeValue
		coords = gala + ':' + uklad + ':' + planeta;
	}
	else coords = prompt('Upisi koordinate u obliku X:XXX:XX' );
	var desc = prompt('Upisi ime za odabrane koordinate.');
	GM_setValue('coordList_'+server, GM_getValue('coordList_'+server )+'^'+coords+'|'+desc);
	if (typeof(ramka)!='undefined') zarzadzaj();
	return false;
}

var loc = document.location;
var reg = /http:\/\/(.*?)\/game\/(.*?)\?session=(.*?)/i;
var result = reg.exec( loc );
var server = result[1];

function gid( el )
{
	return document.getElementById( el );
}

if( result[2] == 'galaxy.php' )
{
	var gala = document.getElementsByName('galaxy')[0].value;
	var uklad = document.getElementsByName('system')[0].value;
	tagi = document.getElementsByTagName('A');
	for (i in tagi)
		if (tagi[i].getAttribute && tagi[i].getAttribute('tabindex')) 
			tagi[i].addEventListener('click',addCoords,true);
}

if( result[2] == 'leftmenu.php' )
{
	
	function delAll()
	{
		GM_setValue('coordList_'+server,'');
		alert('Podaci izbrisani');
		if (typeof(ramka)!='undefined') zarzadzaj();
	}
	
	function jumpmap(e) {
		adres = e.target.firstChild.nodeValue.split(':');
		form = document.createElement('FORM');
		galaxy = form.appendChild(document.createElement('INPUT'));
		galaxy.type = 'hidden';
		galaxy.name = 'galaxy';
		galaxy.value = adres[0];
		system = form.appendChild(document.createElement('INPUT'));
		system.type = 'hidden';
		system.name = 'system';
		system.value = adres[1];
		reg = /(.*?)\?session=([0-9a-f]+)/;
		result = reg.exec (document.location);
		form.action='galaxy.php?session=' + result[2];
		form.method='POST';
		body.appendChild(form);
		form.submit();
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
		if ((poz = prompt ('Premjesti  koordinate na poziciju:')) && (poz>0) && (poz<CoordsTab.length)) {
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
			if (typeof(CoordsTab[i]) != 'undefined')
				str = str + '^' + CoordsTab[i][0] + '|' + CoordsTab[i][1];
		GM_setValue ('coordList_' + server, str);
	}

	function editCoord(event) {
		CoordsTab = loadCoords();
		nr = event.target.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue;
		if (coords = prompt('Upisi posmatrane koordinate u obliku X:XXX:XX', CoordsTab[nr][0]))
			if (desc = prompt('Upisi ime  za koordinate.', CoordsTab[nr][1])) {
				CoordsTab[nr][0] = coords;
				CoordsTab[nr][1] = desc;
				saveCoords(CoordsTab);
				zarzadzaj();
			}
		return false;
	}

	function zarzadzaj() {
		ramka = window.parent.frames[1].document;
		body = ramka.getElementsByTagName('BODY')[0];
		while (body.firstChild)
			body.removeChild(body.firstChild);
		tab = document.createElement('TABLE');
		tab.style.padding=30;
		tr = tab.appendChild(document.createElement('TR'));
		td = tr.appendChild(document.createElement('TD'));
		td.className='c';
		td.colSpan=4;
		td.appendChild(document.createTextNode('Hvala za podrsku !!!'));
		
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
					a.appendChild(document.createTextNode('USUN'));
					th.appendChild(a);
				}
			}
		}
		
		
		body.appendChild(tab);
	}

	function start1()
	{	
		x = document.createElement('DIV');
		x.style.textAlign='center';
		y = document.createElement('INPUT');
		y.setAttribute('type','button');
		y.value='Dodaj koordiinate';
		y.addEventListener('click',addCoords,true);
		x.appendChild(y);
		x.appendChild(document.createElement('BR'));
		y = document.createElement( 'INPUT' );
		y.setAttribute('type','button');
		y.value='Sve izbrisati';
		y.addEventListener('click',delAll,true);
		x.appendChild(y);
		x.appendChild(document.createElement('BR'));
		y = document.createElement('INPUT');
		y.setAttribute('type','button');
		y.value='Podrska';
		y.addEventListener('click',zarzadzaj,true);
		x.appendChild(y);
		document.body.appendChild(x);
	}
	start1();

}
if( result[2] == 'flotten2.php' )
{
	function start2()
	{
		x = document.getElementsByTagName( 'table' );

		y = x[4];
		z = y.getElementsByTagName( 'tr' );
		
		a = document.createElement( 'TR' );
		b = document.createElement( 'TD' );
		b.innerHTML = 'Zapisane koordinate';
		b.colSpan = 2;
		b.className = 'c';
		a.appendChild( b );
		
		y.appendChild( a );

		str = GM_getValue('coordList_'+server);
		array1 = str.split('^');
		len = array1.length;
		v = document.createElement( 'TR' );
		for( i = 0; i < len; i++ )
		{
			x = array1[i];

			if( x != '' )
			{
				if( ( i - 1 ) % 2 == 0 )
				{
					v = document.createElement( 'TR' );
				}
				arr = x.split( '|' );
				
				
				o = document.createElement( 'TH' );
				arrC = arr[0].split( ':' );
				link = document.createElement( 'A' );
				link.href = 'javascript:setTarget('+arrC[0]+','+arrC[1]+','+arrC[2]+',1); shortInfo()';				
				link.appendChild(document.createTextNode(arr[1]+' ['+arr[0]+']'));
				
				o.appendChild( link );
				v.appendChild( o );
			

			}
			if( ( i - 1 ) % 2 == 0 )
			{
				y.appendChild( v );
			
			}
		}

	
	}

	start2();
}