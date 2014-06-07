// ==UserScript==
// @name             Extended Menu [GW]
// @include			 http://www.ganjawars.ru/*
// @version          1.0
// @author           Zorx
// ==/UserScript==


(function f() {
var link= new Array();
link[0] = ['http://www.ganjawars.ru/shop.php','› Магазин']; // Первая строка - ссылка, вторая - текст, выводимый в меню
link[1] = ['http://www.ganjawars.ru/sms.php','› Почта']; // что бы добавить больше ссылок, скопируйте строку и смените номер - link[х]
link[2] = ['http://www.ganjawars.ru/realty.php','› Лотерея']; // все номара должны идти по возростанию

var menuWidth = 150; // Ширина меню

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

	var a=root.document.getElementsByTagName('div');
	for (var i=0;i<a.length;i++){		var s=a[i].innerHTML;
		if (s.indexOf('/items.php')>=0){			var menu=a[i];
		}
	}

    menu.appendChild(document.createTextNode(' | '));

	var me=root.document.createElement('a');
	me.href='';
	me.innerHTML="<b>Меню</b>";
	me.setAttribute('style','text-decoration: none');
	menu.appendChild(me);

   	me2=root.document.createElement('div');
    me.onmouseover=function(){	   	me2.setAttribute('style','position:absolute;top:'+(findPosY(me)+13)+'px;left:'+(findPosX(me)-5)+'px');
    	s='<table bgcolor=#d0eed0 border=0 cellspacing=0 cellpadding=0 align=center><tr><td class=txt><table width=' + menuWidth + 'px border=0 cellspacing=2 cellpadding=2>';
     	for (var i=0;i<link.length;i++) {
			s += '<tr onclick="location.href=\'' + link[i][0] + '\'" bgcolor=#f0fff0 OnMouseOut="setAttribute(\'bgColor\',\'#f0fff0\')" OnMouseOver="setAttribute(\'bgColor\',\'#d0eed0\')")><td><a style="text-decoration:none" href=' + link[i][0] + '>' + link[i][1] + '</a></td></tr>';
		}	
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













})();