// ==UserScript==
// @name           Alternatief Menu W6
// @namespace      Pieter J
// @include        http://nl*.tribalwars.nl/game.php*
// ==/UserScript==

if(document.getElementById('open_groups')!=undefined) {
	var menu=new Array();
	var items=new Array("Uitloggen","Forum","Help","Instellingen","Premium","Ranglijst"," P\\)","Stam","Berichten","Mededelingen","Notitie","Vrienden","Overzicht");
	var tds=document.getElementById('menu_row').getElementsByTagName('td');
	for(var a=0;a<items.length;a++) {
		for(var i=0;i<tds.length;i++) {
			var c=tds[i].getElementsByTagName('a');
			if(c.length>0) {
				if(c[0].innerHTML.match(items[a])) {
					menu[a]=tds[i].cloneNode(true);
					break;
				}
			}
			else if(tds[i].innerHTML.match(items[a])) {
				menu[a]=tds[i].cloneNode(true);
				break;
			}
		}
	}
	menu[1]=document.createElement('td');menu[2]=document.createElement('td');menu[11]=document.createElement('td');
	menu[1].innerHTML='<a href="http://forum.tribalwars.nl/index.php" target="_blank">Forum</a>';
	menu[2].innerHTML='<a href="/help2.php" target="_blank">Help</a>';
	menu[11].innerHTML=document.getElementById('footer_right').innerHTML;
	var b=document.getElementById('menu_row');
	b.innerHTML='';
	for(var i=0;i<items.length-1;i++) if(menu[i]!=null) b.appendChild(menu[i]);
	document.getElementById('ds_body').removeChild(document.getElementById('footer'));
	if(menu[7].getElementsByTagName('a')[menu[7].getElementsByTagName('a').length-1].innerHTML=='Stammenforum') {
		menu[7].getElementsByTagName('a')[menu[7].getElementsByTagName('a').length-1].target='_blank';
		menu[7].getElementsByTagName('a')[menu[7].getElementsByTagName('a').length-1].href='forum.php';
	}
	menu[12].className='menu_column firstcell';
	menu[12].getElementsByTagName('a')[0].accessKey='s';
	var style=document.createElement('style');
	style.innerHTML ='#menu_row2 td table.menu_column { background: transparent url(/graphic/index/dropdown-bottomright.png) scroll right bottom no-repeat; display: table; z-index:100; position:absolute; min-width: 92px; max-width: 250px;  margin-left: 15px; margin-top: 4px; padding: 0; height: auto; visibility: hidden; }';
	style.innerHTML+='#menu_row2 td table.menu_column tr td { height: auto; text-align: left; padding: 0; white-space: normal; line-height: 12px; width: auto; display: table-cell; float: none; z-index: 999; background: transparent url(/graphic/index/dropdown-itemright.png) scroll right top repeat-y; }';
	style.innerHTML+='#menu_row2 td table.menu_column tr td a{ font-size:10px;display: block; position: relative; left: -20px; padding: 3px 12px 3px 20px; margin: 0 -10px 0 0; background: transparent url(/graphic/index/dropdown-itemleft.png) scroll left top no-repeat; color: #ffffff; float: none; height: auto; text-align: left; }';
	style.innerHTML+='#menu_row2 td table.menu_column tr td a:hover{ color: #f0d49a; }';
	style.innerHTML+='#menu_row2 td table.menu_column tr:first-child td { background: transparent url(/graphic/index/dropdown-topright.png) scroll right top no-repeat; }';
	style.innerHTML+='#menu_row2 td table.menu_column tr:first-child td a{ padding: 6px 12px 3px 20px; background: transparent url(/graphic/index/dropdown-topleft.png) scroll left top no-repeat; }';
	style.innerHTML+='#menu_row2 td table.menu_column tr:first-child td a:hover{ }';
	style.innerHTML+='#menu_row2 td table.menu_column tr td.bottom { background: transparent none; }';
	style.innerHTML+='div.decoration { position: relative; width: 23px; height: 25px; margin: -25px 0 0 -25px; left: 50%; top: 0; background: transparent url(/graphic/index/dropdown-decoration.png) scroll left 12px no-repeat; }';
	style.innerHTML+='div.corner { position: relative; width: 20px; height: 25px; margin: 0; left: -20px; top: 0; background: transparent url(/graphic/index/dropdown-bottomleft.png) scroll left top no-repeat; }';
	style.innerHTML+='#menu_row2 td:hover table.menu_column, #menu_row2 td.hover table.menu_column { visibility: visible; z-index: 999; }';
	document.getElementsByTagName('head')[0].appendChild(style);
	document.getElementById('menu_row2').insertBefore(menu[12],document.getElementById('menu_row2').firstChild);
}