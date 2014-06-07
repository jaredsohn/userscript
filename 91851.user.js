// ==UserScript==
// @name           vkontakte menu and newsfeed fixer
// @namespace      http://userscripts.org/scripts/show/91851
// @version        1.3
// @history 1.3 Добавление ссылки на приглашение пользователей
// @history 1.2 Обновления позиции элементов
// @history 1.1.1 Обновлена позиция кнопки Главная
// @history 1.1 С версии 1.1 ведётся история исправлений в скрипте. Пофиксена опция friends и mikroblog, также пофиксено верхнее меню.
// @history 1.0 Релиз
// @include        http://vkontakte.ru/*
// ==/UserScript==
var mikroblog=false;  //Если true - Удаляет ссылку на Главные новости в списке Мои Новости
var friends=true;  //Если true - заменяет ссылку с главной новости на ссылку на друзей (как в старом варианте)
var jscode = "var tooltip=function(){var f='tt';var g=-103;var j=-306;var k=309;var m=10;var n=20;var o=95;var p=0;var q,t,c,b,h;var r=document.all?true:false;return{show:function(v,w){if(q==null){q=document.createElement('div');q.setAttribute('id',f);t=document.createElement('div');t.setAttribute('id',f+'top');c=document.createElement('div');c.setAttribute('id',f+'cont');b=document.createElement('div');b.setAttribute('id',f+'bot');q.appendChild(t);q.appendChild(c);q.appendChild(b);document.body.appendChild(q);q.style.opacity=0;q.style.filter='alpha(opacity=0)';document.onmousemove=this.pos}q.style.display='block';c.innerHTML=v;q.style.width=w?w+'px':'auto';if(!w&&r){t.style.display='none';b.style.display='none';q.style.width=q.offsetWidth;t.style.display='block';b.style.display='block'}if(q.offsetWidth>k){q.style.width=k+'px'}h=parseInt(q.offsetHeight)+g;clearInterval(q.timer);q.timer=setInterval(function(){tooltip.fade(1)},n)},pos:function(e){var u=r?event.clientY+document.documentElement.scrollTop:e.pageY;var l=r?event.clientX+document.documentElement.scrollLeft:e.pageX;q.style.top=(u-h)+'px';q.style.left=(l+j)+'px'},fade:function(d){var a=p;if((a!=o&&d==1)||(a!=0&&d==-1)){var i=m;if(o-a<m&&d==1){i=o-a}else if(p<m&&d==-1){i=a}p=a+(i*d);q.style.opacity=p*.01;q.style.filter='alpha(opacity='+p+')'}else{clearInterval(q.timer);if(d==-1){q.style.display='none'}}},hide:function(){clearInterval(q.timer);q.timer=setInterval(function(){tooltip.fade(-1)},n)}}}();"
var csscode = "#tt{display:block;position:absolute}"+"#tttop{background:url(data:image/gif;base64,R0lGODlhkAEFAIAAAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI0jA2py+0Po5y02ouz3rz7D4YidozmiabqyrbuuyLwTNf2jed6FOz+DwwKh7Ue8YhMKpfCAgA7) top left no-repeat;display:block;height:5px;margin-left:5px;overflow:hidden}"+"#ttcont{background:#666;color:#FFF;display:block;margin-left:5px;padding:2px 12px 3px 7px}"+"#ttbot{background:url(data:image/gif;base64,R0lGODlhMAEFAJEAAAAAAP///2ZmZv///yH5BAEAAAMALAAAAAAwAQUAAAIslI+py+0Po5y02ouz3rz7D4biSJZmNJzqyrbuqw4yTNf2jZfynub+DwzedgUAOw%3D%3D) top left no-repeat;display:block;height:5px;margin-left:5px;z-index:10000}#pageheader{background-color:transparent;width:805px}"

var css = document.createElement('style');
css.setAttribute('type', 'text/css');
css.setAttribute('rel', 'stylesheet');
css.innerHTML=csscode ;
document.getElementsByTagName('head')[0].appendChild(css);
var css = document.createElement('script');
css.setAttribute('type', 'text/javascript');
css.innerHTML=jscode ;
document.getElementsByTagName('head')[0].appendChild(css);

var ad=document.getElementById('top_links');
if(!ad){var ad=document.getElementById('topNav');}
tltxt="'Если Вы считаете, что у Вас сбиты счётчики с показателем количества друзей, заявок на добавление в друзья, <b>приглашений в группы</b>, новых сообщений или непросмотренных фотографий с Вами - нажмите на эту кнопку.'";
var srchsp=ad.getElementsByClassName('fl_r')[0]
if(!srchsp){var srchsp=ad.getElementsByTagName('div')[0]}
srchsp.setAttribute('style','padding-left: 0px; padding-right: 6px;')
/*var srchpos=document.getElementById('quick_search')
srchpos.setAttribute('style','margin-right: 9px;')*/
if(ad)  {
         var ml=document.createElement("a");
	 ml.setAttribute("href","http://vkontakte.ru/");
	 if(ad.id=="topNav"){ml.setAttribute("style","float:left;margin-left:153px");
	 ml.setAttribute("class","fl_l topNavLink")}
	 if(ad.id=="top_links"){ml.setAttribute("style","margin-right:153px");
	 ml.setAttribute("class","fl_l top_nav_link")}
	 ml.innerHTML="Главная"
         ad.appendChild(ml)
         var q=document.createElement("a");
	 q.setAttribute("href","http://vkontakte.ru/settings.php?act=recount");
if(ad.id=="topNav"){q.setAttribute("class","fl_r topNavLink")
	 q.setAttribute("style","float:right!important;")}
if(ad.id=="top_links"){q.setAttribute("class","fl_r top_nav_link")}
	 q.setAttribute("onmouseover","tooltip.show("+tltxt+");");
	 q.setAttribute("onmouseout","tooltip.hide();");
         q.innerHTML='Пересчёт';
         ad.appendChild(q)

if(srchsp==ad.getElementsByTagName('div')[0]){if(ad.getElementsByTagName('a')[5].href=='http://vkontakte.ru/feed'){ad.getElementsByTagName('a')[5].parentNode.removeChild(ad.getElementsByTagName('a')[5])}}
if(srchsp!=ad.getElementsByTagName('div')[0]){
if(ad.getElementsByTagName('a')[4].href=='http://vkontakte.ru/feed'){ad.getElementsByTagName('a')[4].parentNode.removeChild(ad.getElementsByTagName('a')[4])}
	 ad.getElementsByTagName('a')[4].innerHTML = 'поиск'
	 ad.getElementsByTagName('a')[4].setAttribute('class','fl_r top_nav_link')
	 ad.getElementsByTagName('a')[3].innerHTML = 'новости'
	 ad.getElementsByTagName('a')[2].innerHTML = 'диалоги'
	 ad.getElementsByTagName('a')[1].innerHTML = 'пригласить'
	 ad.getElementsByTagName('a')[0].innerHTML = 'выйти'
	 ad.getElementsByTagName('a')[0].setAttribute('style','padding-left: 6px; padding-right: 6px;')}
	}
	 if(ad.id=="topNav")document.getElementById('qsearch_link').setAttribute('style','float:right!important;margin-left:0px!important;')

if(friends){
var nav=document.getElementById('l_nws')
if(!nav)var nav=document.getElementById('nav')
var links=nav.getElementsByTagName('a')
for (var i=0; i<links.length; i++)
{
  var href=links[i].getAttribute('href')
  if(href=="/feed"){links[i].setAttribute('href','/newsfeed.php?section=friends');links[i].removeAttribute('onclick')}
}}
if(mikroblog){if(location.href.search(/^http:\/\/(www\.)?vkontakte\.ru\/newsfeed\.php/i)!=-1)
{
	var zlo=document.getElementById('feed_tabs')
	var zlo_del=zlo.getElementsByTagName('div')[0]
	if(zlo_del)zlo_del.parentNode.removeChild(zlo_del)
}}
var n='0'
while(n<4){
var recl_block=document.getElementById('ad_box_ad_'+n);
if(recl_block)recl_block.parentNode.removeChild(recl_block);
n++}