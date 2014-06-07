// ==UserScript==
// @name           rutracker_tooltip_adder
// @version        2.3.1
// @history        2.3.1 Убраны ненужные переменные
// @history        2.3 Поставлено время до загрузки скрипта и соответсвующая опция.
// @history        2.2 Добавлена стыковка с AutoPagerize
// @history        2.1 Добавлен пункт временная
// @history        2.0 Изменён код, добавлена кроссбраузерность. 
// @history        1.0 Уменьшен и отклиброван код.
// @namespace      tooltips
// @include        http://rutracker.org/*
// ==/UserScript==

var lang='rus' //Language selector, type eng - for english language or type rus for russian language.

var jscode="var tooltip=function(){\nvar id = 'tt';\n var top = 3;\n var left = 3;\n var maxw = 300;\n var speed = 10;\n var timer = 20;\n var endalpha = 95;\n var alpha = 0;\n var tt,t,c,b,h;\n var ie = document.all ? true : false;\n return{\n show:function(v,w){\n if(tt == null){\n tt = document.createElement('div');\n tt.setAttribute('id',id);\n t = document.createElement('div');\n t.setAttribute('id',id + 'top');\n c = document.createElement('div');\n c.setAttribute('id',id + 'cont');\n b = document.createElement('div');\n b.setAttribute('id',id + 'bot');\n tt.appendChild(t);\n tt.appendChild(c);\n tt.appendChild(b);\n document.body.appendChild(tt);\n tt.style.opacity = 0;\n tt.style.filter = 'alpha(opacity=0)';\n document.onmousemove = this.pos;\n }\n tt.style.display = 'block';\n c.innerHTML = v;\n tt.style.width = w ? w + 'px' : 'auto';\n if(!w && ie){\n t.style.display = 'none';\n b.style.display = 'none';\n tt.style.width = tt.offsetWidth;\n t.style.display = 'block';\n b.style.display = 'block';\n }\n if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}\n h = parseInt(tt.offsetHeight) + top;\n clearInterval(tt.timer);\n tt.timer = setInterval(function(){tooltip.fade(1)},timer);\n },\n pos:function(e){\n var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;\n var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;\n tt.style.top = (u - h) + 'px';\n tt.style.left = (l + left) + 'px';\n },\n fade:function(d){\n var a = alpha;\n if((a != endalpha && d == 1) || (a != 0 && d == -1)){\n var i = speed;\n if(endalpha - a < speed && d == 1){\n i = endalpha - a;\n }else if(alpha < speed && d == -1){\n i = a;\n }\n alpha = a + (i * d);\n tt.style.opacity = alpha * .01;\n tt.style.filter = 'alpha(opacity=' + alpha + ')';\n }else{\n clearInterval(tt.timer);\n if(d == -1){tt.style.display = 'none'}\n }\n },\n hide:function(){\n clearInterval(tt.timer);\n tt.timer = setInterval(function(){tooltip.fade(-1)},timer);\n }\n };\n }()"

var csscode="#tt{background:url(data:image/gif;base64,R0lGODlhBQCWAIABAGZmZv///yH5BAEAAAEALAAAAAAFAJYAAAIgjG8AqaH9opy02ouz3rz7D4biSJbmiabqyrbuC8eyWgAAOw%3D%3D) top left no-repeat;display:block;position:absolute}\n#tttop{background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI0hI+py+0Po5y02ouz3rz7XwWiCJbmiabqyrauOr7yTNf2jecPqff+DwwKZ4Gh8YhMKoWBAgA7) top right no-repeat;display:block;height:5px;margin-left:5px;overflow:hidden}\n#ttcont{background:#666;color:#FFF;display:block;margin-left:5px;padding:2px 12px 3px 7px}\n#ttbot{background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI1hI+py+0Po5y02ouz3rz7nwXgSJbmiabqyqpiC8fyTNf27QQvzvf+DwyydDuh8YhMKm9EXQEAOw%3D%3D) top right no-repeat;display:block;height:5px;margin-left:5px;overflow:hidden}"

var js = document.createElement('script');
js.setAttribute('type', 'text/javascript');
//js.setAttribute('src',"http://dl.dropbox.com/u/3053245/script.js"); //disabled because slow
js.innerHTML=jscode;
document.getElementsByTagName('head')[0].appendChild(js);
var css = document.createElement('style');
css.setAttribute('type', 'text/css');
css.setAttribute('rel', 'stylesheet');
//css.setAttribute('href',"http://dl.dropbox.com/u/3053245/style.css"); //disabled because slow
css.innerHTML=csscode;
document.getElementsByTagName('head')[0].appendChild(css);
var ad=document.getElementsByTagName('span');
function isBottom() {return window.pageYOffset >= window.scrollMaxY;}

function draw(){ 
if(this.opera){window.opera.addEventListener('BeforeScript', function () 
{

var ad=document.getElementsByTagName('span');
if(lang=='rus')
{
approved="'Проверено'";
approved2="'Сомнительно'";
close="'Закрыто'";
closedcp="'Закрыто по просьбе правообладателей'";
consumed="'Поглощено'";
dup="'Повтор'";
tmp="'Временная'";
dup2="'Премодерация'";
neededit="'Недооформленно'";
nodesc="'Не верно оформленно'";
notapproved="'Не проверено'";
checking="'Проходит проверку'";
for(var i=0;i<ad.length;i++)
	{
	 if(ad[i].innerHTML=='#')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+close+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed-cp')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+closedcp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-consumed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+consumed+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='∏')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='T')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+tmp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-dup')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-need-edit')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+neededit+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-no-desc')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+nodesc+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-not-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+notapproved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-checking')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+checking+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
	}
}
if(lang=='eng')
{
approved="'Approved'";
approved2="'Doubtful'";
close="'Closed'";
closedcp="'Closed by copyright holder'";
consumed="'Consumed'";
dup="'Repeat'";
tmp="'Temporary'";
dup2="'Premoderation'";
neededit="'It is not up to the end issued'";
nodesc="'It is not truly issued'";
notapproved="'Not approved'";
checking="'Checking now'";
for(var i=0;i<ad.length;i++)
	{
	 if(ad[i].innerHTML=='#')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
	 else if(ad[i].className=='tor-icon tor-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+close+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed-cp')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+closedcp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-consumed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+consumed+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='∏')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='T')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+tmp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-dup')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-need-edit')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+neededit+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-no-desc')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+nodesc+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-not-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+notapproved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-checking')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+checking+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
	}
}
}, false);}

if(lang=='rus')
{
approved="'Проверено'";
approved2="'Сомнительно'";
close="'Закрыто'";
closedcp="'Закрыто по просьбе правообладателей'";
consumed="'Поглощено'";
dup="'Повтор'";
tmp="'Временная'";
dup2="'Премодерация'";
neededit="'Недооформленно'";
nodesc="'Не верно оформленно'";
notapproved="'Не проверено'";
checking="'Проходит проверку'";
for(var i=0;i<ad.length;i++)
	{
	 if(ad[i].innerHTML=='#')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+close+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed-cp')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+closedcp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-consumed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+consumed+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='∏')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='T')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+tmp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-dup')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-need-edit')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+neededit+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-no-desc')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+nodesc+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-not-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+notapproved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-checking')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+checking+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
	}
}
if(lang=='eng')
{
approved="'Approved'";
approved2="'Doubtful'";
close="'Closed'";
closedcp="'Closed by copyright holder'";
consumed="'Consumed'";
dup="'Repeat'";
tmp="'Temporary'";
dup2="'Premoderation'";
neededit="'It is not up to the end issued'";
nodesc="'It is not truly issued'";
notapproved="'Not approved'";
checking="'Checking now'";
for(var i=0;i<ad.length;i++)
	{
	 if(ad[i].innerHTML=='#')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
	 else if(ad[i].className=='tor-icon tor-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+approved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+close+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-closed-cp')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+closedcp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-consumed')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+consumed+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='∏')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup2+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].innerHTML=='T')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+tmp+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-dup')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+dup+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-need-edit')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+neededit+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-no-desc')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+nodesc+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-not-approved')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+notapproved+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
else if(ad[i].className=='tor-icon tor-checking')
		{
		 ad[i].setAttribute('onmouseover', 'tooltip.show('+checking+')');
		 ad[i].setAttribute('onmouseout', 'tooltip.hide()');
		}
	}
}
}
setInterval(function(){if(isBottom()){setTimeout(function(){draw()},2000)}}, 250);
setTimeout(function(){draw()},2000)