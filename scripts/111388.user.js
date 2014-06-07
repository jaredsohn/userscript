// ==UserScript==
// @name             Restyled Menu [GW]
// @namespace        http://gwscripts.net
// @include			 http://www.ganjawars.ru/*
// @version          1.0.180920091701
// @author           Bick
// ==/UserScript==


(function f123() {
function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (1) {
            curtop+=obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.y) {
        curtop+=obj.y;
    }
    return curtop;
}

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (1) {
            curleft+=obj.offsetLeft;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.x) {
        curleft+=obj.x;
    }
    return curleft;
}

	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var a=root.document.getElementsByTagName('a');
	for (var i=0;i<a.length;i++){		if (/\/info\.php\?id=(\d+)/i.test(a[i].href)){			id=/\/info\.php\?id=(\d+)/i.exec(a[i].href);
			id=id[1];
			break;
		}
	}
	var a=root.document.getElementsByTagName('div');
	for (var i=0;i<a.length;i++){		var s=a[i].innerHTML;
		if (s.indexOf('/items.php')>=0){			if (s.indexOf('Ваш синдикат заявлен на бой')>=0){				var btstyle='color:red;font-weight:bold;text-decoration:none';
			} else {				var btstyle='text-decoration: none';
			}
			if (s.indexOf('/i/sms.gif')>=0) var sms=true; else sms=false;
            if (s.indexOf('woodbox')>=0) var wood=true; else wood=false;			a[i].innerHTML='';
			var menu=a[i];
		}
	}
	var items=root.document.createElement('a');
	items.href='/items.php';
	items.innerHTML='<img src=http://images.ganjawars.ru/i/hi.gif width=18 height=11 border=0 alt=\'На страницу вооружения\'>';
	menu.appendChild(items);
	if (wood){		var woodbox=document.createElement('a');
		woodbox.href='/items.php';
		woodbox.innerHTML="<img src=http://images.ganjawars.ru/i/woodbox.gif height=11 width=11 border=0 title='Пришла посылка!'>";
		menu.appendChild(woodbox);
	}
	var me=root.document.createElement('a');
	me.href='/me/';
	me.innerHTML="<b style='color:#990000'>Персонаж</b>";
	me.setAttribute('style','text-decoration: none');
	menu.appendChild(me);
	if (sms){
		menu.appendChild(document.createTextNode(' '));
		var mail=document.createElement('a');
		mail.href='/sms.php';
		mail.innerHTML="<img src=http://images.ganjawars.ru/i/sms.gif width=18 height=11 border=0 alt='Вам пришла почта!'>";
		menu.appendChild(mail);	}
	menu.appendChild(document.createTextNode(' | '));
	var map=root.document.createElement('a');
	map.href='/map.php';
	map.innerHTML="<b>Карта острова</b>";
	map.setAttribute('style','text-decoration: none');
	menu.appendChild(map);
	menu.appendChild(document.createTextNode(' | '));
	var rou=root.document.createElement('a');
	rou.href='/roulette.php';
	rou.innerHTML="<b>Рулетка</b>";
	rou.setAttribute('style','text-decoration: none');
	menu.appendChild(rou);
	menu.appendChild(document.createTextNode(' | '));
	var btl=root.document.createElement('a');
	btl.href='/war/';
	btl.innerHTML="Бой";
	btl.setAttribute('style',btstyle);
	menu.appendChild(btl);
	menu.appendChild(document.createTextNode(' | '));
	var rate=root.document.createElement('a');
	rate.href='/ratings.php';
	rate.innerHTML="Рейтинги";
	rate.setAttribute('style','text-decoration: none');
	menu.appendChild(rate);
	menu.appendChild(document.createTextNode(' | '));
	var site=root.document.createElement('a');
	site.href='/sites.php';
	site.innerHTML="Сайты";
	site.setAttribute('style','text-decoration: none');
	menu.appendChild(site);
	menu.appendChild(document.createTextNode(' | '));
	var ug=root.document.createElement('a');
	ug.href='http://chat.ganjawars.ru';
	ug.target='_blank';
	ug.innerHTML="<b>Чат</b>";
	ug.setAttribute('style','text-decoration: none; color: #990000');
	menu.appendChild(ug);
	var bick=root.document.createElement('a');
	bick.setAttribute('style','text-decoration:none;cursor:pointer;opacity:0.3;font-size:8;position:absolute;top:'+(findPosY(me)+2)+'px;left:10px;z-index:0;');
	bick.href='http://gwscripts.net';
	bick.innerHTML='powered by <b><font color=#990000>Bick</font><b>';
	bick.onmouseover=function(){		this.innerHTML='<b><font color=#990000>GW</font>scripts.net</b>';
	}
	menu.appendChild(bick);

   	me2=root.document.createElement('div');
    me.onmouseover=function(){	   	me2.setAttribute('style','position:absolute;top:'+(findPosY(me)+13)+'px;left:'+(findPosX(me)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/info.realty.php?id='+id+'\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td><img src=http://images.ganjawars.ru/i/home/realty.gif></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/info.realty.php?id='+id+'>Недвижимость</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/shop.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td><img src=http://images.ganjawars.ru/i/home/shop.gif></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/shop.php>Гос. магазин</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/sms.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td><img src=http://images.ganjawars.ru/i/home/mail.gif></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/sms.php>Личная почта</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/usertransfers.php?id='+id+'\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td><img src=http://images.ganjawars.ru/i/home/cashlog.gif></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/usertransfers.php?id='+id+'>Протокол денег</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/info.warstats.php?id='+id+'\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td><img src=http://images.ganjawars.ru/i/home/warlog.gif></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/info.warstats.php?id='+id+'>Протокол боёв</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/logout.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/logout.php>Выход</a></td></tr>';
    	s+='</table></td></tr></table>';
    	me2.innerHTML=s;
    	root.document.body.appendChild(me2);
    	me2.onmouseover=function(){	    	me2.setAttribute('style','position:absolute;top:'+(findPosY(me)+13)+'px;left:'+(findPosX(me)-5)+'px');
    	}
    	me2.onmouseout=function(){
    		me2.setAttribute('style','display:none');
    	}
    }
    me.onmouseout=function(){    	me2.setAttribute('style','display:none');
    }

   	map2=root.document.createElement('div');
    map.onmouseover=function(){
	   	map2.setAttribute('style','position:absolute;top:'+(findPosY(map)+13)+'px;left:'+(findPosX(map)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/map.php?st=work\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/map.php?st=work>Рабочие места</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/map.php?st=shops\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/map.php?st=shops>Магазины</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/map.php?st=destroyed\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/map.php?st=destroyed>Сломаное</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/stats-premiums.php?type=1\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/stats-premiums.php?type=1>Макс. зарплата</a></td></tr>';
	   	s+='</table></td></tr></table>';
	   	map2.innerHTML=s;
    	menu.appendChild(map2);
    	map2.onmouseover=function(){
	    	map2.setAttribute('style','position:absolute;top:'+(findPosY(map)+13)+'px;left:'+(findPosX(map)-5)+'px');
    	}
    	map2.onmouseout=function(){
    		map2.setAttribute('style','display:none');
    	}
    }
    map.onmouseout=function(){
    	map2.setAttribute('style','display:none');
    }

   	rou2=root.document.createElement('div');
    rou.onmouseover=function(){
	   	rou2.setAttribute('style','position:absolute;top:'+(findPosY(rou)+13)+'px;left:'+(findPosX(rou)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/roulist.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/roulist.php>Прошлые игры</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/realty.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/realty.php>Лотерея</a></td></tr>';
    	s+='</table></td></tr></table>';
    	rou2.innerHTML=s;
    	menu.appendChild(rou2);
    	rou2.onmouseover=function(){
	    	rou2.setAttribute('style','position:absolute;top:'+(findPosY(rou)+13)+'px;left:'+(findPosX(rou)-5)+'px');
    	}
    	rou2.onmouseout=function(){
    		rou2.setAttribute('style','display:none');
    	}
    }
    rou.onmouseout=function(){
    	rou2.setAttribute('style','display:none');
    }

   	btl2=root.document.createElement('div');
    btl.onmouseover=function(){
	   	btl2.setAttribute('style','position:absolute;top:'+(findPosY(btl)+13)+'px;left:'+(findPosX(btl)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/warlist.php?war=armed\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/warlist.php?war=armed>Одиночные</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/warlist.php?war=rogatki\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/warlist.php?war=rogatki>Спецоружие</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/wargroup.php?war=armed\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/wargroup.php?war=armed>Общие</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/wargroup.php?war=gwars\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/wargroup.php?war=gwars>Графические</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/wargroup.php?war=street\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/wargroup.php?war=street>Уличные</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/wargroup.php?war=attacks\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/wargroup.php?war=attacks>Нападения</a></td></tr>';
    	s+='</table></td></tr></table>';
    	btl2.innerHTML=s;
    	menu.appendChild(btl2);
    	btl2.onmouseover=function(){
	    	btl2.setAttribute('style','position:absolute;top:'+(findPosY(btl)+13)+'px;left:'+(findPosX(btl)-5)+'px');
    	}
    	btl2.onmouseout=function(){
    		btl2.setAttribute('style','display:none');
    	}
    }
    btl.onmouseout=function(){
    	btl2.setAttribute('style','display:none');
    }

   	rate2=root.document.createElement('div');
    rate.onmouseover=function(){
	   	rate2.setAttribute('style','position:absolute;top:'+(findPosY(rate)+13)+'px;left:'+(findPosX(rate)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/srating.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/srating.php>Синдикаты</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/ratings.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/ratings.php>Персонажи</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/cup.php\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/cup.php>Чемпионат</a></td></tr>';
    	s+='</table></td></tr></table>';
    	rate2.innerHTML=s;
    	menu.appendChild(rate2);
    	rate2.onmouseover=function(){
	    	rate2.setAttribute('style','position:absolute;top:'+(findPosY(rate)+13)+'px;left:'+(findPosX(rate)-5)+'px');
    	}
    	rate2.onmouseout=function(){
    		rate2.setAttribute('style','display:none');
    	}
    }
    rate.onmouseout=function(){
    	rate2.setAttribute('style','display:none');
    }

   	site2=root.document.createElement('div');
    site.onmouseover=function(){
	   	site2.setAttribute('style','position:absolute;top:'+(findPosY(site)+13)+'px;left:'+(findPosX(site)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawiki.ru\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawiki.ru>GanjaWiki.ru</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://gwscripts.net\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://gwscripts.net>GWscripts.net</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://ganjabash.ru\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://ganjabash.ru/>GanjaBash.ru</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://GanjaStats.ru/'+id+'\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://GanjaStats.ru/'+id+'>GanjaStats.ru</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://gwscripts.net/index.php?option=com_jumi&fileid=4&step=1&id='+id+'\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://gwscripts.net/index.php?option=com_jumi&fileid=4&step=1&id='+id+'>Расчёт опыта</a></td></tr>';
    	s+='</table></td></tr></table>';
    	site2.innerHTML=s;
    	menu.appendChild(site2);

    	site2.onmouseover=function(){
	    	site2.setAttribute('style','position:absolute;top:'+(findPosY(site)+13)+'px;left:'+(findPosX(site)-5)+'px');
    	}
    	site2.onmouseout=function(){
    		site2.setAttribute('style','display:none');
    	}
    }
    site.onmouseout=function(){
    	site2.setAttribute('style','display:none');
    }


   	ug2=root.document.createElement('div');
    ug.onmouseover=function(){
	   	ug2.setAttribute('style','position:absolute;top:'+(findPosY(ug)+13)+'px;left:'+(findPosX(ug)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=130px border=0 cellspacing=2 cellpadding=2>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/threads.php?fid=27\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/threads.php?fid=27>Общий игровой</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/threads.php?fid=8\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/threads.php?fid=8>Открытый клуб</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/threads.php?fid=49\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/threads.php?fid=49>ВиП</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/threads.php?fid=22\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/threads.php?fid=22>Оффтоп</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/threads.php?fid=55\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/threads.php?fid=55>Клуб Нытиков</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/threads.php?fid=3\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/threads.php?fid=3>Конкурсы</a></td></tr>';
    	s+='<tr onclick="location.href=\'http://www.ganjawars.ru/forum.php?gid=2\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td width=13></td><td><a style="text-decoration:none" href=http://www.ganjawars.ru/forum.php?gid=2>Торговые</a></td></tr>';
    	s+='</table></td></tr></table>';
    	ug2.innerHTML=s
    	menu.appendChild(ug2);
    	ug2.onmouseover=function(){
	    	ug2.setAttribute('style','position:absolute;top:'+(findPosY(ug)+13)+'px;left:'+(findPosX(ug)-5)+'px');
    	}
    	ug2.onmouseout=function(){
    		ug2.setAttribute('style','display:none');
    	}
    }
    ug.onmouseout=function(){
    	ug2.setAttribute('style','display:none');
    }


})();