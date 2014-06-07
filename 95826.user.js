// ==UserScript==
// @name           Altes Menu - oldstyle.css - CH
// @namespace      DS-Skripte by Merik
// @include        http://ch*.staemme.ch/game.php?*
// ==/UserScript==

if(document.getElementById('open_groups')!=undefined) {
	var menu=new Array();
	var items=new Array("Uslogge","Forum","Hilfe","Istellige","Premium","Ranglischte"," P\\)","Stamm","Bricht","Nachrichte","Notize","Freunde","brsichte");
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
	menu[1].innerHTML='<a href="http://forum.staemme.ch/index.php" target="_blank">Forum</a>';
	menu[1].className='menu-item';
	menu[2].innerHTML='<a href="/help2.php" target="_blank">Hiuf</a>';
	menu[2].className='menu-item';
	var aa=document.getElementById('footer_left').getElementsByTagName('a');
	if(aa[aa.length-1].innerHTML=='Freunde') {
		menu[11]=document.createElement('td');
		menu[11].innerHTML='<a href="'+aa[aa.length-1].href+'">Freunde</a>';
		menu[11].className='menu-item';
	} else menu[11]=null;
	var b=document.getElementById('menu_row');
	b.innerHTML='';
	for(var i=0;i<items.length-1;i++) if(menu[i]!=null) b.appendChild(menu[i]);
	document.getElementById('ds_body').removeChild(document.getElementById('footer'));
	if(menu[7].getElementsByTagName('a')[menu[7].getElementsByTagName('a').length-1].innerHTML=='Stammesforum') {
		menu[7].getElementsByTagName('a')[menu[7].getElementsByTagName('a').length-1].target='_blank';
		menu[7].getElementsByTagName('a')[menu[7].getElementsByTagName('a').length-1].href='forum.php';
	}
	menu[12].className='menu-item firstcell';
	menu[12].getElementsByTagName('a')[0].accessKey='s';

	document.getElementById('menu_row2').insertBefore(menu[12],document.getElementById('menu_row2').firstChild);
	document.getElementById('menu_row2_map').className='box-item';
}