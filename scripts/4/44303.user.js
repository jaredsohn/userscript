// ==UserScript==
// @name           vkPatch
// @namespace      http://klinifini.livejournal.com/
// @description    Расширение функционала ВКонтакте.ру
// @include        http://vkontakte.ru/*
// ==/UserScript==
// Author: Сергей Третьяк
// Version: 6
// Site: klinifini.livejournal.com

// ====== Script Info BEGIN
// === Version
// 6
// === Changelog
// 6
// Переписан код полностью под jQuery
// Прямые ссылки теперь на всех страницах стены
// Управление c клавиатуры
// Заменять двойной пробел на длинный, который не будет вырезан сайтом, что позволяет красиво форматировать текст.
// Открывать список друзей он-лайн по ctrl-click на «Мои друзья» в меню.
// Разворачивание поля рисования граффити во всё окно
// Фиксирование меню (не прокручивать вместе со страницей)
// Новая ф-ия Стабилизация - отслежывание ошибочных ф-ий vkPatch
// ----------
// 5.02
// Диалоговое окно проверки обновления
// Исправление ошибок.
// ----------
// 5.01
// Исправление ошибок.
// ----------
// 5
// Запрашивать подтверждение при переходе со странички рисования граффити.
// Выравнивать пункты меню по правой стороне.
// Настраиваемая периодичность проверки обновлений.
// Перегруппированы настройки и вынесены в отдельную вкладку.
// Исправлено позиционарование всплывающего окна.
// Вывод групп вертикальным списком.
// Очистка названий групп.
// Поиск видео в группах.
// Звуковое оповещение о новых входящих сообщениях.
// Встроен widescreen vkontakte mod 0.0.2 - Растягивание интерфейса.
// Кнопки для быстрого удаления отметки о себе на фотографии или видео.
// Периодическая проверка новых сообщений в фоне.
// Убирать невидимые фреймы, которые периодически появляются и содержат рекламу.
// Всплывающее окно с уведомлением о количестве новых сообщений.
// Всплывающее окно при новом сообщении с быстрым ответом.
// ----------
// 4.4
// Пригласить всех теперь можно и на встречу.
// Расположить боковое меню справа.
// Подтверждать переход со страницы во время проигрывания аудио.
// При проверке комментариев теперь используется асинхронный XMLHttpRequest.
// ----------
// 4.3
// Исправлена функция "Пропустить версию".
// ----------
// 4.2
// Опция горизонтального расположения ссылок на разделы пользователей.
// ----------
// 4.1
// Пригласить всех друзей в группу.
// Исправление некоторых ошибок.
// ----------
// 4.0
// Ссылки для скачивания mp3.
// Ссылка для скачивания видео.
// Убирать в результатах поиска ссылки на профили людей, выложивших аудиозапись.
// Убирать повторяющиеся аудиозаписи.
// Показывать кол-во дубликатов mp3.
// Всегда открывать поле для отправки сообщения на стену.
// Проверять наличие новых версий vkPatch. 
// Автоматическая проверка новых версий.
// ----------
// 3.0
// Убирать промежуточную страницу при переходе по внешней ссылке.
// Убирать слова "Мои" в боковом меню.
// Затенять слова "Мои" в боковом меню.
// Запрашивать подтверждение перед отправкой анонимного мнения.
// Добавление в боковое меню ссылки на комментарии с оповещением, если есть новые.
// ====== Script Info END
	
var vkpathVersion = 6;

var gmWindow = window;
var $head,$body,$wall,$sound,onTheSite=false,onPostEvent,resources={},commentsCount,end_static_functions=false;
var event,events,aalert_lastAlertTime,aalert_count,aalert_freeze,__alert,GET,here_page,params=new Array(),par=new Array();
var GLOBAL=new Array(),stack=new Array();

/*
	Определение параметров
*/

newCategory('Меню');
addParam('shadeMy').inSett('Затенить «Мои»','Затенить слова «Мои» в боковом меню.').ok();
addParam('menuRightAlignment').def(false).inSett('Магнитное меню','Выравнивать пункты меню по правой стороне.').ok();
addParam('removeMy').def(false).inSett('Убрать «Мои»','Убрать слова «Мои» в боковом меню.').ok();
addParam('addSearchLink').def(false).inSett('Поиск','Добавить ссылку на поиск.').ok();
addParam('addCommentsLink').inSett('Комментарии','Добавить ссылку на комменнатрии.').ok();
addParam('fixedMenu').def(false).inSett('Фиксировано','Зафиксировать меню').ok();


newCategory('Внешний вид');
addParam('correctGroups').def(false).inSett('Названия групп','Очистить названия групп на страницах пользователей.').ok();
addParam('columnGroups').inSett('Группы столбиком','Показывать группы пользователей вертикальным списком.').ok();
addParam('invertTitle').def(false).inSett('Заголовок','Поменять в заголовке текущий раздел и имя сайта местами.').ok();
addParam('removeBanners').inSett('Реклама','Вырезать рекламу с сайта.').ok();
addParam('removeHeader').def(false).inSett('Скрыть шапку','Скрыть шапку сайта.').ok();

newCategory('Изменения');
addParam('directLinks').def(false).inSett('Прямые ссылки','Переходять по внешним ссылкам без промежуточной страницы.').ok();
addParam('showReply').def(false).inSett('Сообщение на стену','Автоматически раскрывать поле для отправки сообщения на стену.').ok();
addParam('moreWall').def(false).inSett('Все функции','Раскрывать дополнительные виды сообщений на стену («Все функции»).').ok();
addParam('showPhotosVideos').def(false).inSett('Фото/видео на стене','Автоматически раскрывать фотографии и видео на стене.').ok();
addParam('inviteAll').inSett('Пригласить всех','Добавить кнопку для приглашения всех друзей в группу или на встречу (ограничение сайта: не более 40 человек в сутки).').ok();
addParam('confirmOpinion').def(false).inSett('Подтверждение мнения','Запрашивать подтверждение перед отправкой анонимного мнения.').ok();
addParam('confirmGraffiti').inSett('Подтверждение граффити','Запрашивать подтверждение при переходе со странички рисования граффити.').ok();
addParam('multilineStatus').inSett('Статус','Изменить поле ввода статуса на многострочное.').ok();
addParam('longSpaces').def(false).inSett('Пробелы','Заменять двойной пробел на длинный, который не будет вырезан сайтом, что позволяет красиво форматировать текст.').ok();
addParam('expandGraff').inSett('Развернуть граффити','Добавить кнопку для разворачивания поля рисования граффити во всё окно.').ok();

newCategory('Клавиатура');
addParam('keyPageswitch').inSett('Листать страницы','Листать страницы клавишами Ctrl+left и Ctrl+right.').ok();
addParam('keyTabswitch').inSett('Листать вкладки','Листать вкладки (категории) клавишами Ctrl+Shift+left и Ctrl+Shift+right.').ok();
addParam('ctrlOnline').inSett('Друзья он-лайн','Открывать список друзей он-лайн по ctrl-click на «Мои друзья» в меню.').def(false).ok();

newCategory('Комментарии');
addParam('newComments').inSett('Новые комментарии','Отображать кол-во новых коментариев в меню.').ok();
addParam('commCheckTimeout').def(30).min(0).max(30*60).inSett('Не чаще чем','Минимальный интервал, между запросами новых комментариев в секундах.').ok();
addParam('highlightNewComments').inSett('Подсветка новых','Выделять новые комментарии среди остальных.').ok();
addParam('newCommentsEvery').inSett('Фоновая проверка','Проверять наличие новых комментариев периодически и без обновления окна.').ok();
addParam('commCheckEvery').def(60).min(15).max(30*60).inSett('Периодичность','Задержка, между запросами новых комментариев в секундах.').ok();


newCategory('Звуки');
addParam('soundWhenNewComments').def(false).inSett('Комментарии','Проигрывать звук при наличии новых комментариев').ok();

newCategory('Внутренние');
addParam('checkUpdate').inSett('Обновление','Периодически проверять обновления vkPatch.').ok();
addParam('checkCrashes').inSett('Стабилизация','Выявлять ошибки и предлагать отключить ошибочные функции.').ok();

addParam('skipVersion').def(0).ok();
addParam('lastUpdateCheck').def(0).ok();
addParam('consoleActive').def(false).ok();
addParam('consoleLeft').def(0).min(0).ok();
addParam('consoleTop').def(0).min(0).ok();

// ############################################################################################
// ###
// ###									Обновления
// ###
// #############################################################################################


/*
 * Необходимо подменить текущий документ основным.
 */
document = unsafeWindow.document;

// Загружаем jQuery!
/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
 * $Rev: 5685 $
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(H(){J w=1b.4M,3m$=1b.$;J D=1b.4M=1b.$=H(a,b){I 2B D.17.5j(a,b)};J u=/^[^<]*(<(.|\\s)+>)[^>]*$|^#(\\w+)$/,62=/^.[^:#\\[\\.]*$/,12;D.17=D.44={5j:H(d,b){d=d||S;G(d.16){7[0]=d;7.K=1;I 7}G(1j d=="23"){J c=u.2D(d);G(c&&(c[1]||!b)){G(c[1])d=D.4h([c[1]],b);N{J a=S.61(c[3]);G(a){G(a.2v!=c[3])I D().2q(d);I D(a)}d=[]}}N I D(b).2q(d)}N G(D.1D(d))I D(S)[D.17.27?"27":"43"](d);I 7.6Y(D.2d(d))},5w:"1.2.6",8G:H(){I 7.K},K:0,3p:H(a){I a==12?D.2d(7):7[a]},2I:H(b){J a=D(b);a.5n=7;I a},6Y:H(a){7.K=0;2p.44.1p.1w(7,a);I 7},P:H(a,b){I D.P(7,a,b)},5i:H(b){J a=-1;I D.2L(b&&b.5w?b[0]:b,7)},1K:H(c,a,b){J d=c;G(c.1q==56)G(a===12)I 7[0]&&D[b||"1K"](7[0],c);N{d={};d[c]=a}I 7.P(H(i){R(c 1n d)D.1K(b?7.V:7,c,D.1i(7,d[c],b,i,c))})},1g:H(b,a){G((b==\'2h\'||b==\'1Z\')&&3d(a)<0)a=12;I 7.1K(b,a,"2a")},1r:H(b){G(1j b!="49"&&b!=U)I 7.4E().3v((7[0]&&7[0].2z||S).5F(b));J a="";D.P(b||7,H(){D.P(7.3t,H(){G(7.16!=8)a+=7.16!=1?7.76:D.17.1r([7])})});I a},5z:H(b){G(7[0])D(b,7[0].2z).5y().39(7[0]).2l(H(){J a=7;1B(a.1x)a=a.1x;I a}).3v(7);I 7},8Y:H(a){I 7.P(H(){D(7).6Q().5z(a)})},8R:H(a){I 7.P(H(){D(7).5z(a)})},3v:H(){I 7.3W(19,M,Q,H(a){G(7.16==1)7.3U(a)})},6F:H(){I 7.3W(19,M,M,H(a){G(7.16==1)7.39(a,7.1x)})},6E:H(){I 7.3W(19,Q,Q,H(a){7.1d.39(a,7)})},5q:H(){I 7.3W(19,Q,M,H(a){7.1d.39(a,7.2H)})},3l:H(){I 7.5n||D([])},2q:H(b){J c=D.2l(7,H(a){I D.2q(b,a)});I 7.2I(/[^+>] [^+>]/.11(b)||b.1h("..")>-1?D.4r(c):c)},5y:H(e){J f=7.2l(H(){G(D.14.1f&&!D.4n(7)){J a=7.6o(M),5h=S.3h("1v");5h.3U(a);I D.4h([5h.4H])[0]}N I 7.6o(M)});J d=f.2q("*").5c().P(H(){G(7[E]!=12)7[E]=U});G(e===M)7.2q("*").5c().P(H(i){G(7.16==3)I;J c=D.L(7,"3w");R(J a 1n c)R(J b 1n c[a])D.W.1e(d[i],a,c[a][b],c[a][b].L)});I f},1E:H(b){I 7.2I(D.1D(b)&&D.3C(7,H(a,i){I b.1k(a,i)})||D.3g(b,7))},4Y:H(b){G(b.1q==56)G(62.11(b))I 7.2I(D.3g(b,7,M));N b=D.3g(b,7);J a=b.K&&b[b.K-1]!==12&&!b.16;I 7.1E(H(){I a?D.2L(7,b)<0:7!=b})},1e:H(a){I 7.2I(D.4r(D.2R(7.3p(),1j a==\'23\'?D(a):D.2d(a))))},3F:H(a){I!!a&&D.3g(a,7).K>0},7T:H(a){I 7.3F("."+a)},6e:H(b){G(b==12){G(7.K){J c=7[0];G(D.Y(c,"2A")){J e=c.64,63=[],15=c.15,2V=c.O=="2A-2V";G(e<0)I U;R(J i=2V?e:0,2f=2V?e+1:15.K;i<2f;i++){J d=15[i];G(d.2W){b=D.14.1f&&!d.at.2x.an?d.1r:d.2x;G(2V)I b;63.1p(b)}}I 63}N I(7[0].2x||"").1o(/\\r/g,"")}I 12}G(b.1q==4L)b+=\'\';I 7.P(H(){G(7.16!=1)I;G(b.1q==2p&&/5O|5L/.11(7.O))7.4J=(D.2L(7.2x,b)>=0||D.2L(7.34,b)>=0);N G(D.Y(7,"2A")){J a=D.2d(b);D("9R",7).P(H(){7.2W=(D.2L(7.2x,a)>=0||D.2L(7.1r,a)>=0)});G(!a.K)7.64=-1}N 7.2x=b})},2K:H(a){I a==12?(7[0]?7[0].4H:U):7.4E().3v(a)},7b:H(a){I 7.5q(a).21()},79:H(i){I 7.3s(i,i+1)},3s:H(){I 7.2I(2p.44.3s.1w(7,19))},2l:H(b){I 7.2I(D.2l(7,H(a,i){I b.1k(a,i,a)}))},5c:H(){I 7.1e(7.5n)},L:H(d,b){J a=d.1R(".");a[1]=a[1]?"."+a[1]:"";G(b===12){J c=7.5C("9z"+a[1]+"!",[a[0]]);G(c===12&&7.K)c=D.L(7[0],d);I c===12&&a[1]?7.L(a[0]):c}N I 7.1P("9u"+a[1]+"!",[a[0],b]).P(H(){D.L(7,d,b)})},3b:H(a){I 7.P(H(){D.3b(7,a)})},3W:H(g,f,h,d){J e=7.K>1,3x;I 7.P(H(){G(!3x){3x=D.4h(g,7.2z);G(h)3x.9o()}J b=7;G(f&&D.Y(7,"1T")&&D.Y(3x[0],"4F"))b=7.3H("22")[0]||7.3U(7.2z.3h("22"));J c=D([]);D.P(3x,H(){J a=e?D(7).5y(M)[0]:7;G(D.Y(a,"1m"))c=c.1e(a);N{G(a.16==1)c=c.1e(D("1m",a).21());d.1k(b,a)}});c.P(6T)})}};D.17.5j.44=D.17;H 6T(i,a){G(a.4d)D.3Y({1a:a.4d,31:Q,1O:"1m"});N D.5u(a.1r||a.6O||a.4H||"");G(a.1d)a.1d.37(a)}H 1z(){I+2B 8J}D.1l=D.17.1l=H(){J b=19[0]||{},i=1,K=19.K,4x=Q,15;G(b.1q==8I){4x=b;b=19[1]||{};i=2}G(1j b!="49"&&1j b!="H")b={};G(K==i){b=7;--i}R(;i<K;i++)G((15=19[i])!=U)R(J c 1n 15){J a=b[c],2w=15[c];G(b===2w)6M;G(4x&&2w&&1j 2w=="49"&&!2w.16)b[c]=D.1l(4x,a||(2w.K!=U?[]:{}),2w);N G(2w!==12)b[c]=2w}I b};J E="4M"+1z(),6K=0,5r={},6G=/z-?5i|8B-?8A|1y|6B|8v-?1Z/i,3P=S.3P||{};D.1l({8u:H(a){1b.$=3m$;G(a)1b.4M=w;I D},1D:H(a){I!!a&&1j a!="23"&&!a.Y&&a.1q!=2p&&/^[\\s[]?H/.11(a+"")},4n:H(a){I a.1C&&!a.1c||a.2j&&a.2z&&!a.2z.1c},5u:H(a){a=D.3k(a);G(a){J b=S.3H("6w")[0]||S.1C,1m=S.3h("1m");1m.O="1r/4t";G(D.14.1f)1m.1r=a;N 1m.3U(S.5F(a));b.39(1m,b.1x);b.37(1m)}},Y:H(b,a){I b.Y&&b.Y.2r()==a.2r()},1Y:{},L:H(c,d,b){c=c==1b?5r:c;J a=c[E];G(!a)a=c[E]=++6K;G(d&&!D.1Y[a])D.1Y[a]={};G(b!==12)D.1Y[a][d]=b;I d?D.1Y[a][d]:a},3b:H(c,b){c=c==1b?5r:c;J a=c[E];G(b){G(D.1Y[a]){2U D.1Y[a][b];b="";R(b 1n D.1Y[a])1X;G(!b)D.3b(c)}}N{1U{2U c[E]}1V(e){G(c.5l)c.5l(E)}2U D.1Y[a]}},P:H(d,a,c){J e,i=0,K=d.K;G(c){G(K==12){R(e 1n d)G(a.1w(d[e],c)===Q)1X}N R(;i<K;)G(a.1w(d[i++],c)===Q)1X}N{G(K==12){R(e 1n d)G(a.1k(d[e],e,d[e])===Q)1X}N R(J b=d[0];i<K&&a.1k(b,i,b)!==Q;b=d[++i]){}}I d},1i:H(b,a,c,i,d){G(D.1D(a))a=a.1k(b,i);I a&&a.1q==4L&&c=="2a"&&!6G.11(d)?a+"2X":a},1F:{1e:H(c,b){D.P((b||"").1R(/\\s+/),H(i,a){G(c.16==1&&!D.1F.3T(c.1F,a))c.1F+=(c.1F?" ":"")+a})},21:H(c,b){G(c.16==1)c.1F=b!=12?D.3C(c.1F.1R(/\\s+/),H(a){I!D.1F.3T(b,a)}).6s(" "):""},3T:H(b,a){I D.2L(a,(b.1F||b).6r().1R(/\\s+/))>-1}},6q:H(b,c,a){J e={};R(J d 1n c){e[d]=b.V[d];b.V[d]=c[d]}a.1k(b);R(J d 1n c)b.V[d]=e[d]},1g:H(d,e,c){G(e=="2h"||e=="1Z"){J b,3X={30:"5x",5g:"1G",18:"3I"},35=e=="2h"?["5e","6k"]:["5G","6i"];H 5b(){b=e=="2h"?d.8f:d.8c;J a=0,2C=0;D.P(35,H(){a+=3d(D.2a(d,"57"+7,M))||0;2C+=3d(D.2a(d,"2C"+7+"4b",M))||0});b-=29.83(a+2C)}G(D(d).3F(":4j"))5b();N D.6q(d,3X,5b);I 29.2f(0,b)}I D.2a(d,e,c)},2a:H(f,l,k){J e,V=f.V;H 3E(b){G(!D.14.2k)I Q;J a=3P.54(b,U);I!a||a.52("3E")==""}G(l=="1y"&&D.14.1f){e=D.1K(V,"1y");I e==""?"1":e}G(D.14.2G&&l=="18"){J d=V.50;V.50="0 7Y 7W";V.50=d}G(l.1I(/4i/i))l=y;G(!k&&V&&V[l])e=V[l];N G(3P.54){G(l.1I(/4i/i))l="4i";l=l.1o(/([A-Z])/g,"-$1").3y();J c=3P.54(f,U);G(c&&!3E(f))e=c.52(l);N{J g=[],2E=[],a=f,i=0;R(;a&&3E(a);a=a.1d)2E.6h(a);R(;i<2E.K;i++)G(3E(2E[i])){g[i]=2E[i].V.18;2E[i].V.18="3I"}e=l=="18"&&g[2E.K-1]!=U?"2F":(c&&c.52(l))||"";R(i=0;i<g.K;i++)G(g[i]!=U)2E[i].V.18=g[i]}G(l=="1y"&&e=="")e="1"}N G(f.4g){J h=l.1o(/\\-(\\w)/g,H(a,b){I b.2r()});e=f.4g[l]||f.4g[h];G(!/^\\d+(2X)?$/i.11(e)&&/^\\d/.11(e)){J j=V.1A,66=f.65.1A;f.65.1A=f.4g.1A;V.1A=e||0;e=V.aM+"2X";V.1A=j;f.65.1A=66}}I e},4h:H(l,h){J k=[];h=h||S;G(1j h.3h==\'12\')h=h.2z||h[0]&&h[0].2z||S;D.P(l,H(i,d){G(!d)I;G(d.1q==4L)d+=\'\';G(1j d=="23"){d=d.1o(/(<(\\w+)[^>]*?)\\/>/g,H(b,a,c){I c.1I(/^(aK|4f|7E|aG|4T|7A|aB|3n|az|ay|av)$/i)?b:a+"></"+c+">"});J f=D.3k(d).3y(),1v=h.3h("1v");J e=!f.1h("<au")&&[1,"<2A 7w=\'7w\'>","</2A>"]||!f.1h("<ar")&&[1,"<7v>","</7v>"]||f.1I(/^<(aq|22|am|ak|ai)/)&&[1,"<1T>","</1T>"]||!f.1h("<4F")&&[2,"<1T><22>","</22></1T>"]||(!f.1h("<af")||!f.1h("<ad"))&&[3,"<1T><22><4F>","</4F></22></1T>"]||!f.1h("<7E")&&[2,"<1T><22></22><7q>","</7q></1T>"]||D.14.1f&&[1,"1v<1v>","</1v>"]||[0,"",""];1v.4H=e[1]+d+e[2];1B(e[0]--)1v=1v.5T;G(D.14.1f){J g=!f.1h("<1T")&&f.1h("<22")<0?1v.1x&&1v.1x.3t:e[1]=="<1T>"&&f.1h("<22")<0?1v.3t:[];R(J j=g.K-1;j>=0;--j)G(D.Y(g[j],"22")&&!g[j].3t.K)g[j].1d.37(g[j]);G(/^\\s/.11(d))1v.39(h.5F(d.1I(/^\\s*/)[0]),1v.1x)}d=D.2d(1v.3t)}G(d.K===0&&(!D.Y(d,"3V")&&!D.Y(d,"2A")))I;G(d[0]==12||D.Y(d,"3V")||d.15)k.1p(d);N k=D.2R(k,d)});I k},1K:H(d,f,c){G(!d||d.16==3||d.16==8)I 12;J e=!D.4n(d),40=c!==12,1f=D.14.1f;f=e&&D.3X[f]||f;G(d.2j){J g=/5Q|4d|V/.11(f);G(f=="2W"&&D.14.2k)d.1d.64;G(f 1n d&&e&&!g){G(40){G(f=="O"&&D.Y(d,"4T")&&d.1d)7p"O a3 a1\'t 9V 9U";d[f]=c}G(D.Y(d,"3V")&&d.7i(f))I d.7i(f).76;I d[f]}G(1f&&e&&f=="V")I D.1K(d.V,"9T",c);G(40)d.9Q(f,""+c);J h=1f&&e&&g?d.4G(f,2):d.4G(f);I h===U?12:h}G(1f&&f=="1y"){G(40){d.6B=1;d.1E=(d.1E||"").1o(/7f\\([^)]*\\)/,"")+(3r(c)+\'\'=="9L"?"":"7f(1y="+c*7a+")")}I d.1E&&d.1E.1h("1y=")>=0?(3d(d.1E.1I(/1y=([^)]*)/)[1])/7a)+\'\':""}f=f.1o(/-([a-z])/9H,H(a,b){I b.2r()});G(40)d[f]=c;I d[f]},3k:H(a){I(a||"").1o(/^\\s+|\\s+$/g,"")},2d:H(b){J a=[];G(b!=U){J i=b.K;G(i==U||b.1R||b.4I||b.1k)a[0]=b;N 1B(i)a[--i]=b[i]}I a},2L:H(b,a){R(J i=0,K=a.K;i<K;i++)G(a[i]===b)I i;I-1},2R:H(a,b){J i=0,T,2S=a.K;G(D.14.1f){1B(T=b[i++])G(T.16!=8)a[2S++]=T}N 1B(T=b[i++])a[2S++]=T;I a},4r:H(a){J c=[],2o={};1U{R(J i=0,K=a.K;i<K;i++){J b=D.L(a[i]);G(!2o[b]){2o[b]=M;c.1p(a[i])}}}1V(e){c=a}I c},3C:H(c,a,d){J b=[];R(J i=0,K=c.K;i<K;i++)G(!d!=!a(c[i],i))b.1p(c[i]);I b},2l:H(d,a){J c=[];R(J i=0,K=d.K;i<K;i++){J b=a(d[i],i);G(b!=U)c[c.K]=b}I c.7d.1w([],c)}});J v=9B.9A.3y();D.14={5B:(v.1I(/.+(?:9y|9x|9w|9v)[\\/: ]([\\d.]+)/)||[])[1],2k:/75/.11(v),2G:/2G/.11(v),1f:/1f/.11(v)&&!/2G/.11(v),42:/42/.11(v)&&!/(9s|75)/.11(v)};J y=D.14.1f?"7o":"72";D.1l({71:!D.14.1f||S.70=="6Z",3X:{"R":"9n","9k":"1F","4i":y,72:y,7o:y,9h:"9f",9e:"9d",9b:"99"}});D.P({6W:H(a){I a.1d},97:H(a){I D.4S(a,"1d")},95:H(a){I D.3a(a,2,"2H")},91:H(a){I D.3a(a,2,"4l")},8Z:H(a){I D.4S(a,"2H")},8X:H(a){I D.4S(a,"4l")},8W:H(a){I D.5v(a.1d.1x,a)},8V:H(a){I D.5v(a.1x)},6Q:H(a){I D.Y(a,"8U")?a.8T||a.8S.S:D.2d(a.3t)}},H(c,d){D.17[c]=H(b){J a=D.2l(7,d);G(b&&1j b=="23")a=D.3g(b,a);I 7.2I(D.4r(a))}});D.P({6P:"3v",8Q:"6F",39:"6E",8P:"5q",8O:"7b"},H(c,b){D.17[c]=H(){J a=19;I 7.P(H(){R(J i=0,K=a.K;i<K;i++)D(a[i])[b](7)})}});D.P({8N:H(a){D.1K(7,a,"");G(7.16==1)7.5l(a)},8M:H(a){D.1F.1e(7,a)},8L:H(a){D.1F.21(7,a)},8K:H(a){D.1F[D.1F.3T(7,a)?"21":"1e"](7,a)},21:H(a){G(!a||D.1E(a,[7]).r.K){D("*",7).1e(7).P(H(){D.W.21(7);D.3b(7)});G(7.1d)7.1d.37(7)}},4E:H(){D(">*",7).21();1B(7.1x)7.37(7.1x)}},H(a,b){D.17[a]=H(){I 7.P(b,19)}});D.P(["6N","4b"],H(i,c){J b=c.3y();D.17[b]=H(a){I 7[0]==1b?D.14.2G&&S.1c["5t"+c]||D.14.2k&&1b["5s"+c]||S.70=="6Z"&&S.1C["5t"+c]||S.1c["5t"+c]:7[0]==S?29.2f(29.2f(S.1c["4y"+c],S.1C["4y"+c]),29.2f(S.1c["2i"+c],S.1C["2i"+c])):a==12?(7.K?D.1g(7[0],b):U):7.1g(b,a.1q==56?a:a+"2X")}});H 25(a,b){I a[0]&&3r(D.2a(a[0],b,M),10)||0}J C=D.14.2k&&3r(D.14.5B)<8H?"(?:[\\\\w*3m-]|\\\\\\\\.)":"(?:[\\\\w\\8F-\\8E*3m-]|\\\\\\\\.)",6L=2B 4v("^>\\\\s*("+C+"+)"),6J=2B 4v("^("+C+"+)(#)("+C+"+)"),6I=2B 4v("^([#.]?)("+C+"*)");D.1l({6H:{"":H(a,i,m){I m[2]=="*"||D.Y(a,m[2])},"#":H(a,i,m){I a.4G("2v")==m[2]},":":{8D:H(a,i,m){I i<m[3]-0},8C:H(a,i,m){I i>m[3]-0},3a:H(a,i,m){I m[3]-0==i},79:H(a,i,m){I m[3]-0==i},3o:H(a,i){I i==0},3S:H(a,i,m,r){I i==r.K-1},6D:H(a,i){I i%2==0},6C:H(a,i){I i%2},"3o-4u":H(a){I a.1d.3H("*")[0]==a},"3S-4u":H(a){I D.3a(a.1d.5T,1,"4l")==a},"8z-4u":H(a){I!D.3a(a.1d.5T,2,"4l")},6W:H(a){I a.1x},4E:H(a){I!a.1x},8y:H(a,i,m){I(a.6O||a.8x||D(a).1r()||"").1h(m[3])>=0},4j:H(a){I"1G"!=a.O&&D.1g(a,"18")!="2F"&&D.1g(a,"5g")!="1G"},1G:H(a){I"1G"==a.O||D.1g(a,"18")=="2F"||D.1g(a,"5g")=="1G"},8w:H(a){I!a.3R},3R:H(a){I a.3R},4J:H(a){I a.4J},2W:H(a){I a.2W||D.1K(a,"2W")},1r:H(a){I"1r"==a.O},5O:H(a){I"5O"==a.O},5L:H(a){I"5L"==a.O},5p:H(a){I"5p"==a.O},3Q:H(a){I"3Q"==a.O},5o:H(a){I"5o"==a.O},6A:H(a){I"6A"==a.O},6z:H(a){I"6z"==a.O},2s:H(a){I"2s"==a.O||D.Y(a,"2s")},4T:H(a){I/4T|2A|6y|2s/i.11(a.Y)},3T:H(a,i,m){I D.2q(m[3],a).K},8t:H(a){I/h\\d/i.11(a.Y)},8s:H(a){I D.3C(D.3O,H(b){I a==b.T}).K}}},6x:[/^(\\[) *@?([\\w-]+) *([!*$^~=]*) *(\'?"?)(.*?)\\4 *\\]/,/^(:)([\\w-]+)\\("?\'?(.*?(\\(.*?\\))?[^(]*?)"?\'?\\)/,2B 4v("^([:.#]*)("+C+"+)")],3g:H(a,c,b){J d,1t=[];1B(a&&a!=d){d=a;J f=D.1E(a,c,b);a=f.t.1o(/^\\s*,\\s*/,"");1t=b?c=f.r:D.2R(1t,f.r)}I 1t},2q:H(t,o){G(1j t!="23")I[t];G(o&&o.16!=1&&o.16!=9)I[];o=o||S;J d=[o],2o=[],3S,Y;1B(t&&3S!=t){J r=[];3S=t;t=D.3k(t);J l=Q,3j=6L,m=3j.2D(t);G(m){Y=m[1].2r();R(J i=0;d[i];i++)R(J c=d[i].1x;c;c=c.2H)G(c.16==1&&(Y=="*"||c.Y.2r()==Y))r.1p(c);d=r;t=t.1o(3j,"");G(t.1h(" ")==0)6M;l=M}N{3j=/^([>+~])\\s*(\\w*)/i;G((m=3j.2D(t))!=U){r=[];J k={};Y=m[2].2r();m=m[1];R(J j=0,3i=d.K;j<3i;j++){J n=m=="~"||m=="+"?d[j].2H:d[j].1x;R(;n;n=n.2H)G(n.16==1){J g=D.L(n);G(m=="~"&&k[g])1X;G(!Y||n.Y.2r()==Y){G(m=="~")k[g]=M;r.1p(n)}G(m=="+")1X}}d=r;t=D.3k(t.1o(3j,""));l=M}}G(t&&!l){G(!t.1h(",")){G(o==d[0])d.4s();2o=D.2R(2o,d);r=d=[o];t=" "+t.6v(1,t.K)}N{J h=6J;J m=h.2D(t);G(m){m=[0,m[2],m[3],m[1]]}N{h=6I;m=h.2D(t)}m[2]=m[2].1o(/\\\\/g,"");J f=d[d.K-1];G(m[1]=="#"&&f&&f.61&&!D.4n(f)){J p=f.61(m[2]);G((D.14.1f||D.14.2G)&&p&&1j p.2v=="23"&&p.2v!=m[2])p=D(\'[@2v="\'+m[2]+\'"]\',f)[0];d=r=p&&(!m[3]||D.Y(p,m[3]))?[p]:[]}N{R(J i=0;d[i];i++){J a=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];G(a=="*"&&d[i].Y.3y()=="49")a="3n";r=D.2R(r,d[i].3H(a))}G(m[1]==".")r=D.5m(r,m[2]);G(m[1]=="#"){J e=[];R(J i=0;r[i];i++)G(r[i].4G("2v")==m[2]){e=[r[i]];1X}r=e}d=r}t=t.1o(h,"")}}G(t){J b=D.1E(t,r);d=r=b.r;t=D.3k(b.t)}}G(t)d=[];G(d&&o==d[0])d.4s();2o=D.2R(2o,d);I 2o},5m:H(r,m,a){m=" "+m+" ";J c=[];R(J i=0;r[i];i++){J b=(" "+r[i].1F+" ").1h(m)>=0;G(!a&&b||a&&!b)c.1p(r[i])}I c},1E:H(t,r,h){J d;1B(t&&t!=d){d=t;J p=D.6x,m;R(J i=0;p[i];i++){m=p[i].2D(t);G(m){t=t.8r(m[0].K);m[2]=m[2].1o(/\\\\/g,"");1X}}G(!m)1X;G(m[1]==":"&&m[2]=="4Y")r=62.11(m[3])?D.1E(m[3],r,M).r:D(r).4Y(m[3]);N G(m[1]==".")r=D.5m(r,m[2],h);N G(m[1]=="["){J g=[],O=m[3];R(J i=0,3i=r.K;i<3i;i++){J a=r[i],z=a[D.3X[m[2]]||m[2]];G(z==U||/5Q|4d|2W/.11(m[2]))z=D.1K(a,m[2])||\'\';G((O==""&&!!z||O=="="&&z==m[5]||O=="!="&&z!=m[5]||O=="^="&&z&&!z.1h(m[5])||O=="$="&&z.6v(z.K-m[5].K)==m[5]||(O=="*="||O=="~=")&&z.1h(m[5])>=0)^h)g.1p(a)}r=g}N G(m[1]==":"&&m[2]=="3a-4u"){J e={},g=[],11=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.2D(m[3]=="6D"&&"2n"||m[3]=="6C"&&"2n+1"||!/\\D/.11(m[3])&&"8q+"+m[3]||m[3]),3o=(11[1]+(11[2]||1))-0,d=11[3]-0;R(J i=0,3i=r.K;i<3i;i++){J j=r[i],1d=j.1d,2v=D.L(1d);G(!e[2v]){J c=1;R(J n=1d.1x;n;n=n.2H)G(n.16==1)n.4q=c++;e[2v]=M}J b=Q;G(3o==0){G(j.4q==d)b=M}N G((j.4q-d)%3o==0&&(j.4q-d)/3o>=0)b=M;G(b^h)g.1p(j)}r=g}N{J f=D.6H[m[1]];G(1j f=="49")f=f[m[2]];G(1j f=="23")f=6u("Q||H(a,i){I "+f+";}");r=D.3C(r,H(a,i){I f(a,i,m,r)},h)}}I{r:r,t:t}},4S:H(b,c){J a=[],1t=b[c];1B(1t&&1t!=S){G(1t.16==1)a.1p(1t);1t=1t[c]}I a},3a:H(a,e,c,b){e=e||1;J d=0;R(;a;a=a[c])G(a.16==1&&++d==e)1X;I a},5v:H(n,a){J r=[];R(;n;n=n.2H){G(n.16==1&&n!=a)r.1p(n)}I r}});D.W={1e:H(f,i,g,e){G(f.16==3||f.16==8)I;G(D.14.1f&&f.4I)f=1b;G(!g.24)g.24=7.24++;G(e!=12){J h=g;g=7.3M(h,H(){I h.1w(7,19)});g.L=e}J j=D.L(f,"3w")||D.L(f,"3w",{}),1H=D.L(f,"1H")||D.L(f,"1H",H(){G(1j D!="12"&&!D.W.5k)I D.W.1H.1w(19.3L.T,19)});1H.T=f;D.P(i.1R(/\\s+/),H(c,b){J a=b.1R(".");b=a[0];g.O=a[1];J d=j[b];G(!d){d=j[b]={};G(!D.W.2t[b]||D.W.2t[b].4p.1k(f)===Q){G(f.3K)f.3K(b,1H,Q);N G(f.6t)f.6t("4o"+b,1H)}}d[g.24]=g;D.W.26[b]=M});f=U},24:1,26:{},21:H(e,h,f){G(e.16==3||e.16==8)I;J i=D.L(e,"3w"),1L,5i;G(i){G(h==12||(1j h=="23"&&h.8p(0)=="."))R(J g 1n i)7.21(e,g+(h||""));N{G(h.O){f=h.2y;h=h.O}D.P(h.1R(/\\s+/),H(b,a){J c=a.1R(".");a=c[0];G(i[a]){G(f)2U i[a][f.24];N R(f 1n i[a])G(!c[1]||i[a][f].O==c[1])2U i[a][f];R(1L 1n i[a])1X;G(!1L){G(!D.W.2t[a]||D.W.2t[a].4A.1k(e)===Q){G(e.6p)e.6p(a,D.L(e,"1H"),Q);N G(e.6n)e.6n("4o"+a,D.L(e,"1H"))}1L=U;2U i[a]}}})}R(1L 1n i)1X;G(!1L){J d=D.L(e,"1H");G(d)d.T=U;D.3b(e,"3w");D.3b(e,"1H")}}},1P:H(h,c,f,g,i){c=D.2d(c);G(h.1h("!")>=0){h=h.3s(0,-1);J a=M}G(!f){G(7.26[h])D("*").1e([1b,S]).1P(h,c)}N{G(f.16==3||f.16==8)I 12;J b,1L,17=D.1D(f[h]||U),W=!c[0]||!c[0].32;G(W){c.6h({O:h,2J:f,32:H(){},3J:H(){},4C:1z()});c[0][E]=M}c[0].O=h;G(a)c[0].6m=M;J d=D.L(f,"1H");G(d)b=d.1w(f,c);G((!17||(D.Y(f,\'a\')&&h=="4V"))&&f["4o"+h]&&f["4o"+h].1w(f,c)===Q)b=Q;G(W)c.4s();G(i&&D.1D(i)){1L=i.1w(f,b==U?c:c.7d(b));G(1L!==12)b=1L}G(17&&g!==Q&&b!==Q&&!(D.Y(f,\'a\')&&h=="4V")){7.5k=M;1U{f[h]()}1V(e){}}7.5k=Q}I b},1H:H(b){J a,1L,38,5f,4m;b=19[0]=D.W.6l(b||1b.W);38=b.O.1R(".");b.O=38[0];38=38[1];5f=!38&&!b.6m;4m=(D.L(7,"3w")||{})[b.O];R(J j 1n 4m){J c=4m[j];G(5f||c.O==38){b.2y=c;b.L=c.L;1L=c.1w(7,19);G(a!==Q)a=1L;G(1L===Q){b.32();b.3J()}}}I a},6l:H(b){G(b[E]==M)I b;J d=b;b={8o:d};J c="8n 8m 8l 8k 2s 8j 47 5d 6j 5E 8i L 8h 8g 4K 2y 5a 59 8e 8b 58 6f 8a 88 4k 87 86 84 6d 2J 4C 6c O 82 81 35".1R(" ");R(J i=c.K;i;i--)b[c[i]]=d[c[i]];b[E]=M;b.32=H(){G(d.32)d.32();d.80=Q};b.3J=H(){G(d.3J)d.3J();d.7Z=M};b.4C=b.4C||1z();G(!b.2J)b.2J=b.6d||S;G(b.2J.16==3)b.2J=b.2J.1d;G(!b.4k&&b.4K)b.4k=b.4K==b.2J?b.6c:b.4K;G(b.58==U&&b.5d!=U){J a=S.1C,1c=S.1c;b.58=b.5d+(a&&a.2e||1c&&1c.2e||0)-(a.6b||0);b.6f=b.6j+(a&&a.2c||1c&&1c.2c||0)-(a.6a||0)}G(!b.35&&((b.47||b.47===0)?b.47:b.5a))b.35=b.47||b.5a;G(!b.59&&b.5E)b.59=b.5E;G(!b.35&&b.2s)b.35=(b.2s&1?1:(b.2s&2?3:(b.2s&4?2:0)));I b},3M:H(a,b){b.24=a.24=a.24||b.24||7.24++;I b},2t:{27:{4p:H(){55();I},4A:H(){I}},3D:{4p:H(){G(D.14.1f)I Q;D(7).2O("53",D.W.2t.3D.2y);I M},4A:H(){G(D.14.1f)I Q;D(7).4e("53",D.W.2t.3D.2y);I M},2y:H(a){G(F(a,7))I M;a.O="3D";I D.W.1H.1w(7,19)}},3N:{4p:H(){G(D.14.1f)I Q;D(7).2O("51",D.W.2t.3N.2y);I M},4A:H(){G(D.14.1f)I Q;D(7).4e("51",D.W.2t.3N.2y);I M},2y:H(a){G(F(a,7))I M;a.O="3N";I D.W.1H.1w(7,19)}}}};D.17.1l({2O:H(c,a,b){I c=="4X"?7.2V(c,a,b):7.P(H(){D.W.1e(7,c,b||a,b&&a)})},2V:H(d,b,c){J e=D.W.3M(c||b,H(a){D(7).4e(a,e);I(c||b).1w(7,19)});I 7.P(H(){D.W.1e(7,d,e,c&&b)})},4e:H(a,b){I 7.P(H(){D.W.21(7,a,b)})},1P:H(c,a,b){I 7.P(H(){D.W.1P(c,a,7,M,b)})},5C:H(c,a,b){I 7[0]&&D.W.1P(c,a,7[0],Q,b)},2m:H(b){J c=19,i=1;1B(i<c.K)D.W.3M(b,c[i++]);I 7.4V(D.W.3M(b,H(a){7.4Z=(7.4Z||0)%i;a.32();I c[7.4Z++].1w(7,19)||Q}))},7X:H(a,b){I 7.2O(\'3D\',a).2O(\'3N\',b)},27:H(a){55();G(D.2Q)a.1k(S,D);N D.3A.1p(H(){I a.1k(7,D)});I 7}});D.1l({2Q:Q,3A:[],27:H(){G(!D.2Q){D.2Q=M;G(D.3A){D.P(D.3A,H(){7.1k(S)});D.3A=U}D(S).5C("27")}}});J x=Q;H 55(){G(x)I;x=M;G(S.3K&&!D.14.2G)S.3K("69",D.27,Q);G(D.14.1f&&1b==1S)(H(){G(D.2Q)I;1U{S.1C.7V("1A")}1V(3e){3B(19.3L,0);I}D.27()})();G(D.14.2G)S.3K("69",H(){G(D.2Q)I;R(J i=0;i<S.4W.K;i++)G(S.4W[i].3R){3B(19.3L,0);I}D.27()},Q);G(D.14.2k){J a;(H(){G(D.2Q)I;G(S.3f!="68"&&S.3f!="1J"){3B(19.3L,0);I}G(a===12)a=D("V, 7A[7U=7S]").K;G(S.4W.K!=a){3B(19.3L,0);I}D.27()})()}D.W.1e(1b,"43",D.27)}D.P(("7R,7Q,43,85,4y,4X,4V,7P,"+"7O,7N,89,53,51,7M,2A,"+"5o,7L,7K,8d,3e").1R(","),H(i,b){D.17[b]=H(a){I a?7.2O(b,a):7.1P(b)}});J F=H(a,c){J b=a.4k;1B(b&&b!=c)1U{b=b.1d}1V(3e){b=c}I b==c};D(1b).2O("4X",H(){D("*").1e(S).4e()});D.17.1l({67:D.17.43,43:H(g,d,c){G(1j g!=\'23\')I 7.67(g);J e=g.1h(" ");G(e>=0){J i=g.3s(e,g.K);g=g.3s(0,e)}c=c||H(){};J f="2P";G(d)G(D.1D(d)){c=d;d=U}N{d=D.3n(d);f="6g"}J h=7;D.3Y({1a:g,O:f,1O:"2K",L:d,1J:H(a,b){G(b=="1W"||b=="7J")h.2K(i?D("<1v/>").3v(a.4U.1o(/<1m(.|\\s)*?\\/1m>/g,"")).2q(i):a.4U);h.P(c,[a.4U,b,a])}});I 7},aL:H(){I D.3n(7.7I())},7I:H(){I 7.2l(H(){I D.Y(7,"3V")?D.2d(7.aH):7}).1E(H(){I 7.34&&!7.3R&&(7.4J||/2A|6y/i.11(7.Y)||/1r|1G|3Q/i.11(7.O))}).2l(H(i,c){J b=D(7).6e();I b==U?U:b.1q==2p?D.2l(b,H(a,i){I{34:c.34,2x:a}}):{34:c.34,2x:b}}).3p()}});D.P("7H,7G,7F,7D,7C,7B".1R(","),H(i,o){D.17[o]=H(f){I 7.2O(o,f)}});J B=1z();D.1l({3p:H(d,b,a,c){G(D.1D(b)){a=b;b=U}I D.3Y({O:"2P",1a:d,L:b,1W:a,1O:c})},aE:H(b,a){I D.3p(b,U,a,"1m")},aD:H(c,b,a){I D.3p(c,b,a,"3z")},aC:H(d,b,a,c){G(D.1D(b)){a=b;b={}}I D.3Y({O:"6g",1a:d,L:b,1W:a,1O:c})},aA:H(a){D.1l(D.60,a)},60:{1a:5Z.5Q,26:M,O:"2P",2T:0,7z:"4R/x-ax-3V-aw",7x:M,31:M,L:U,5Y:U,3Q:U,4Q:{2N:"4R/2N, 1r/2N",2K:"1r/2K",1m:"1r/4t, 4R/4t",3z:"4R/3z, 1r/4t",1r:"1r/as",4w:"*/*"}},4z:{},3Y:H(s){s=D.1l(M,s,D.1l(M,{},D.60,s));J g,2Z=/=\\?(&|$)/g,1u,L,O=s.O.2r();G(s.L&&s.7x&&1j s.L!="23")s.L=D.3n(s.L);G(s.1O=="4P"){G(O=="2P"){G(!s.1a.1I(2Z))s.1a+=(s.1a.1I(/\\?/)?"&":"?")+(s.4P||"7u")+"=?"}N G(!s.L||!s.L.1I(2Z))s.L=(s.L?s.L+"&":"")+(s.4P||"7u")+"=?";s.1O="3z"}G(s.1O=="3z"&&(s.L&&s.L.1I(2Z)||s.1a.1I(2Z))){g="4P"+B++;G(s.L)s.L=(s.L+"").1o(2Z,"="+g+"$1");s.1a=s.1a.1o(2Z,"="+g+"$1");s.1O="1m";1b[g]=H(a){L=a;1W();1J();1b[g]=12;1U{2U 1b[g]}1V(e){}G(i)i.37(h)}}G(s.1O=="1m"&&s.1Y==U)s.1Y=Q;G(s.1Y===Q&&O=="2P"){J j=1z();J k=s.1a.1o(/(\\?|&)3m=.*?(&|$)/,"$ap="+j+"$2");s.1a=k+((k==s.1a)?(s.1a.1I(/\\?/)?"&":"?")+"3m="+j:"")}G(s.L&&O=="2P"){s.1a+=(s.1a.1I(/\\?/)?"&":"?")+s.L;s.L=U}G(s.26&&!D.4O++)D.W.1P("7H");J n=/^(?:\\w+:)?\\/\\/([^\\/?#]+)/;G(s.1O=="1m"&&O=="2P"&&n.11(s.1a)&&n.2D(s.1a)[1]!=5Z.al){J i=S.3H("6w")[0];J h=S.3h("1m");h.4d=s.1a;G(s.7t)h.aj=s.7t;G(!g){J l=Q;h.ah=h.ag=H(){G(!l&&(!7.3f||7.3f=="68"||7.3f=="1J")){l=M;1W();1J();i.37(h)}}}i.3U(h);I 12}J m=Q;J c=1b.7s?2B 7s("ae.ac"):2B 7r();G(s.5Y)c.6R(O,s.1a,s.31,s.5Y,s.3Q);N c.6R(O,s.1a,s.31);1U{G(s.L)c.4B("ab-aa",s.7z);G(s.5S)c.4B("a9-5R-a8",D.4z[s.1a]||"a7, a6 a5 a4 5N:5N:5N a2");c.4B("X-9Z-9Y","7r");c.4B("9W",s.1O&&s.4Q[s.1O]?s.4Q[s.1O]+", */*":s.4Q.4w)}1V(e){}G(s.7m&&s.7m(c,s)===Q){s.26&&D.4O--;c.7l();I Q}G(s.26)D.W.1P("7B",[c,s]);J d=H(a){G(!m&&c&&(c.3f==4||a=="2T")){m=M;G(f){7k(f);f=U}1u=a=="2T"&&"2T"||!D.7j(c)&&"3e"||s.5S&&D.7h(c,s.1a)&&"7J"||"1W";G(1u=="1W"){1U{L=D.6X(c,s.1O,s.9S)}1V(e){1u="5J"}}G(1u=="1W"){J b;1U{b=c.5I("7g-5R")}1V(e){}G(s.5S&&b)D.4z[s.1a]=b;G(!g)1W()}N D.5H(s,c,1u);1J();G(s.31)c=U}};G(s.31){J f=4I(d,13);G(s.2T>0)3B(H(){G(c){c.7l();G(!m)d("2T")}},s.2T)}1U{c.9P(s.L)}1V(e){D.5H(s,c,U,e)}G(!s.31)d();H 1W(){G(s.1W)s.1W(L,1u);G(s.26)D.W.1P("7C",[c,s])}H 1J(){G(s.1J)s.1J(c,1u);G(s.26)D.W.1P("7F",[c,s]);G(s.26&&!--D.4O)D.W.1P("7G")}I c},5H:H(s,a,b,e){G(s.3e)s.3e(a,b,e);G(s.26)D.W.1P("7D",[a,s,e])},4O:0,7j:H(a){1U{I!a.1u&&5Z.9O=="5p:"||(a.1u>=7e&&a.1u<9N)||a.1u==7c||a.1u==9K||D.14.2k&&a.1u==12}1V(e){}I Q},7h:H(a,c){1U{J b=a.5I("7g-5R");I a.1u==7c||b==D.4z[c]||D.14.2k&&a.1u==12}1V(e){}I Q},6X:H(a,c,b){J d=a.5I("9J-O"),2N=c=="2N"||!c&&d&&d.1h("2N")>=0,L=2N?a.9I:a.4U;G(2N&&L.1C.2j=="5J")7p"5J";G(b)L=b(L,c);G(c=="1m")D.5u(L);G(c=="3z")L=6u("("+L+")");I L},3n:H(a){J s=[];G(a.1q==2p||a.5w)D.P(a,H(){s.1p(3u(7.34)+"="+3u(7.2x))});N R(J j 1n a)G(a[j]&&a[j].1q==2p)D.P(a[j],H(){s.1p(3u(j)+"="+3u(7))});N s.1p(3u(j)+"="+3u(D.1D(a[j])?a[j]():a[j]));I s.6s("&").1o(/%20/g,"+")}});D.17.1l({1N:H(c,b){I c?7.2g({1Z:"1N",2h:"1N",1y:"1N"},c,b):7.1E(":1G").P(H(){7.V.18=7.5D||"";G(D.1g(7,"18")=="2F"){J a=D("<"+7.2j+" />").6P("1c");7.V.18=a.1g("18");G(7.V.18=="2F")7.V.18="3I";a.21()}}).3l()},1M:H(b,a){I b?7.2g({1Z:"1M",2h:"1M",1y:"1M"},b,a):7.1E(":4j").P(H(){7.5D=7.5D||D.1g(7,"18");7.V.18="2F"}).3l()},78:D.17.2m,2m:H(a,b){I D.1D(a)&&D.1D(b)?7.78.1w(7,19):a?7.2g({1Z:"2m",2h:"2m",1y:"2m"},a,b):7.P(H(){D(7)[D(7).3F(":1G")?"1N":"1M"]()})},9G:H(b,a){I 7.2g({1Z:"1N"},b,a)},9F:H(b,a){I 7.2g({1Z:"1M"},b,a)},9E:H(b,a){I 7.2g({1Z:"2m"},b,a)},9D:H(b,a){I 7.2g({1y:"1N"},b,a)},9M:H(b,a){I 7.2g({1y:"1M"},b,a)},9C:H(c,a,b){I 7.2g({1y:a},c,b)},2g:H(k,j,i,g){J h=D.77(j,i,g);I 7[h.36===Q?"P":"36"](H(){G(7.16!=1)I Q;J f=D.1l({},h),p,1G=D(7).3F(":1G"),46=7;R(p 1n k){G(k[p]=="1M"&&1G||k[p]=="1N"&&!1G)I f.1J.1k(7);G(p=="1Z"||p=="2h"){f.18=D.1g(7,"18");f.33=7.V.33}}G(f.33!=U)7.V.33="1G";f.45=D.1l({},k);D.P(k,H(c,a){J e=2B D.28(46,f,c);G(/2m|1N|1M/.11(a))e[a=="2m"?1G?"1N":"1M":a](k);N{J b=a.6r().1I(/^([+-]=)?([\\d+-.]+)(.*)$/),2b=e.1t(M)||0;G(b){J d=3d(b[2]),2M=b[3]||"2X";G(2M!="2X"){46.V[c]=(d||1)+2M;2b=((d||1)/e.1t(M))*2b;46.V[c]=2b+2M}G(b[1])d=((b[1]=="-="?-1:1)*d)+2b;e.3G(2b,d,2M)}N e.3G(2b,a,"")}});I M})},36:H(a,b){G(D.1D(a)||(a&&a.1q==2p)){b=a;a="28"}G(!a||(1j a=="23"&&!b))I A(7[0],a);I 7.P(H(){G(b.1q==2p)A(7,a,b);N{A(7,a).1p(b);G(A(7,a).K==1)b.1k(7)}})},9X:H(b,c){J a=D.3O;G(b)7.36([]);7.P(H(){R(J i=a.K-1;i>=0;i--)G(a[i].T==7){G(c)a[i](M);a.7n(i,1)}});G(!c)7.5A();I 7}});J A=H(b,c,a){G(b){c=c||"28";J q=D.L(b,c+"36");G(!q||a)q=D.L(b,c+"36",D.2d(a))}I q};D.17.5A=H(a){a=a||"28";I 7.P(H(){J q=A(7,a);q.4s();G(q.K)q[0].1k(7)})};D.1l({77:H(b,a,c){J d=b&&b.1q==a0?b:{1J:c||!c&&a||D.1D(b)&&b,2u:b,41:c&&a||a&&a.1q!=9t&&a};d.2u=(d.2u&&d.2u.1q==4L?d.2u:D.28.5K[d.2u])||D.28.5K.74;d.5M=d.1J;d.1J=H(){G(d.36!==Q)D(7).5A();G(D.1D(d.5M))d.5M.1k(7)};I d},41:{73:H(p,n,b,a){I b+a*p},5P:H(p,n,b,a){I((-29.9r(p*29.9q)/2)+0.5)*a+b}},3O:[],48:U,28:H(b,c,a){7.15=c;7.T=b;7.1i=a;G(!c.3Z)c.3Z={}}});D.28.44={4D:H(){G(7.15.2Y)7.15.2Y.1k(7.T,7.1z,7);(D.28.2Y[7.1i]||D.28.2Y.4w)(7);G(7.1i=="1Z"||7.1i=="2h")7.T.V.18="3I"},1t:H(a){G(7.T[7.1i]!=U&&7.T.V[7.1i]==U)I 7.T[7.1i];J r=3d(D.1g(7.T,7.1i,a));I r&&r>-9p?r:3d(D.2a(7.T,7.1i))||0},3G:H(c,b,d){7.5V=1z();7.2b=c;7.3l=b;7.2M=d||7.2M||"2X";7.1z=7.2b;7.2S=7.4N=0;7.4D();J e=7;H t(a){I e.2Y(a)}t.T=7.T;D.3O.1p(t);G(D.48==U){D.48=4I(H(){J a=D.3O;R(J i=0;i<a.K;i++)G(!a[i]())a.7n(i--,1);G(!a.K){7k(D.48);D.48=U}},13)}},1N:H(){7.15.3Z[7.1i]=D.1K(7.T.V,7.1i);7.15.1N=M;7.3G(0,7.1t());G(7.1i=="2h"||7.1i=="1Z")7.T.V[7.1i]="9m";D(7.T).1N()},1M:H(){7.15.3Z[7.1i]=D.1K(7.T.V,7.1i);7.15.1M=M;7.3G(7.1t(),0)},2Y:H(a){J t=1z();G(a||t>7.15.2u+7.5V){7.1z=7.3l;7.2S=7.4N=1;7.4D();7.15.45[7.1i]=M;J b=M;R(J i 1n 7.15.45)G(7.15.45[i]!==M)b=Q;G(b){G(7.15.18!=U){7.T.V.33=7.15.33;7.T.V.18=7.15.18;G(D.1g(7.T,"18")=="2F")7.T.V.18="3I"}G(7.15.1M)7.T.V.18="2F";G(7.15.1M||7.15.1N)R(J p 1n 7.15.45)D.1K(7.T.V,p,7.15.3Z[p])}G(b)7.15.1J.1k(7.T);I Q}N{J n=t-7.5V;7.4N=n/7.15.2u;7.2S=D.41[7.15.41||(D.41.5P?"5P":"73")](7.4N,n,0,1,7.15.2u);7.1z=7.2b+((7.3l-7.2b)*7.2S);7.4D()}I M}};D.1l(D.28,{5K:{9l:9j,9i:7e,74:9g},2Y:{2e:H(a){a.T.2e=a.1z},2c:H(a){a.T.2c=a.1z},1y:H(a){D.1K(a.T.V,"1y",a.1z)},4w:H(a){a.T.V[a.1i]=a.1z+a.2M}}});D.17.2i=H(){J b=0,1S=0,T=7[0],3q;G(T)ao(D.14){J d=T.1d,4a=T,1s=T.1s,1Q=T.2z,5U=2k&&3r(5B)<9c&&!/9a/i.11(v),1g=D.2a,3c=1g(T,"30")=="3c";G(T.7y){J c=T.7y();1e(c.1A+29.2f(1Q.1C.2e,1Q.1c.2e),c.1S+29.2f(1Q.1C.2c,1Q.1c.2c));1e(-1Q.1C.6b,-1Q.1C.6a)}N{1e(T.5X,T.5W);1B(1s){1e(1s.5X,1s.5W);G(42&&!/^t(98|d|h)$/i.11(1s.2j)||2k&&!5U)2C(1s);G(!3c&&1g(1s,"30")=="3c")3c=M;4a=/^1c$/i.11(1s.2j)?4a:1s;1s=1s.1s}1B(d&&d.2j&&!/^1c|2K$/i.11(d.2j)){G(!/^96|1T.*$/i.11(1g(d,"18")))1e(-d.2e,-d.2c);G(42&&1g(d,"33")!="4j")2C(d);d=d.1d}G((5U&&(3c||1g(4a,"30")=="5x"))||(42&&1g(4a,"30")!="5x"))1e(-1Q.1c.5X,-1Q.1c.5W);G(3c)1e(29.2f(1Q.1C.2e,1Q.1c.2e),29.2f(1Q.1C.2c,1Q.1c.2c))}3q={1S:1S,1A:b}}H 2C(a){1e(D.2a(a,"6V",M),D.2a(a,"6U",M))}H 1e(l,t){b+=3r(l,10)||0;1S+=3r(t,10)||0}I 3q};D.17.1l({30:H(){J a=0,1S=0,3q;G(7[0]){J b=7.1s(),2i=7.2i(),4c=/^1c|2K$/i.11(b[0].2j)?{1S:0,1A:0}:b.2i();2i.1S-=25(7,\'94\');2i.1A-=25(7,\'aF\');4c.1S+=25(b,\'6U\');4c.1A+=25(b,\'6V\');3q={1S:2i.1S-4c.1S,1A:2i.1A-4c.1A}}I 3q},1s:H(){J a=7[0].1s;1B(a&&(!/^1c|2K$/i.11(a.2j)&&D.1g(a,\'30\')==\'93\'))a=a.1s;I D(a)}});D.P([\'5e\',\'5G\'],H(i,b){J c=\'4y\'+b;D.17[c]=H(a){G(!7[0])I;I a!=12?7.P(H(){7==1b||7==S?1b.92(!i?a:D(1b).2e(),i?a:D(1b).2c()):7[c]=a}):7[0]==1b||7[0]==S?46[i?\'aI\':\'aJ\']||D.71&&S.1C[c]||S.1c[c]:7[0][c]}});D.P(["6N","4b"],H(i,b){J c=i?"5e":"5G",4f=i?"6k":"6i";D.17["5s"+b]=H(){I 7[b.3y()]()+25(7,"57"+c)+25(7,"57"+4f)};D.17["90"+b]=H(a){I 7["5s"+b]()+25(7,"2C"+c+"4b")+25(7,"2C"+4f+"4b")+(a?25(7,"6S"+c)+25(7,"6S"+4f):0)}})})();',62,669,'|||||||this|||||||||||||||||||||||||||||||||||if|function|return|var|length|data|true|else|type|each|false|for|document|elem|null|style|event||nodeName|||test|undefined||browser|options|nodeType|fn|display|arguments|url|window|body|parentNode|add|msie|css|indexOf|prop|typeof|call|extend|script|in|replace|push|constructor|text|offsetParent|cur|status|div|apply|firstChild|opacity|now|left|while|documentElement|isFunction|filter|className|hidden|handle|match|complete|attr|ret|hide|show|dataType|trigger|doc|split|top|table|try|catch|success|break|cache|height||remove|tbody|string|guid|num|global|ready|fx|Math|curCSS|start|scrollTop|makeArray|scrollLeft|max|animate|width|offset|tagName|safari|map|toggle||done|Array|find|toUpperCase|button|special|duration|id|copy|value|handler|ownerDocument|select|new|border|exec|stack|none|opera|nextSibling|pushStack|target|html|inArray|unit|xml|bind|GET|isReady|merge|pos|timeout|delete|one|selected|px|step|jsre|position|async|preventDefault|overflow|name|which|queue|removeChild|namespace|insertBefore|nth|removeData|fixed|parseFloat|error|readyState|multiFilter|createElement|rl|re|trim|end|_|param|first|get|results|parseInt|slice|childNodes|encodeURIComponent|append|events|elems|toLowerCase|json|readyList|setTimeout|grep|mouseenter|color|is|custom|getElementsByTagName|block|stopPropagation|addEventListener|callee|proxy|mouseleave|timers|defaultView|password|disabled|last|has|appendChild|form|domManip|props|ajax|orig|set|easing|mozilla|load|prototype|curAnim|self|charCode|timerId|object|offsetChild|Width|parentOffset|src|unbind|br|currentStyle|clean|float|visible|relatedTarget|previousSibling|handlers|isXMLDoc|on|setup|nodeIndex|unique|shift|javascript|child|RegExp|_default|deep|scroll|lastModified|teardown|setRequestHeader|timeStamp|update|empty|tr|getAttribute|innerHTML|setInterval|checked|fromElement|Number|jQuery|state|active|jsonp|accepts|application|dir|input|responseText|click|styleSheets|unload|not|lastToggle|outline|mouseout|getPropertyValue|mouseover|getComputedStyle|bindReady|String|padding|pageX|metaKey|keyCode|getWH|andSelf|clientX|Left|all|visibility|container|index|init|triggered|removeAttribute|classFilter|prevObject|submit|file|after|windowData|inner|client|globalEval|sibling|jquery|absolute|clone|wrapAll|dequeue|version|triggerHandler|oldblock|ctrlKey|createTextNode|Top|handleError|getResponseHeader|parsererror|speeds|checkbox|old|00|radio|swing|href|Modified|ifModified|lastChild|safari2|startTime|offsetTop|offsetLeft|username|location|ajaxSettings|getElementById|isSimple|values|selectedIndex|runtimeStyle|rsLeft|_load|loaded|DOMContentLoaded|clientTop|clientLeft|toElement|srcElement|val|pageY|POST|unshift|Bottom|clientY|Right|fix|exclusive|detachEvent|cloneNode|removeEventListener|swap|toString|join|attachEvent|eval|substr|head|parse|textarea|reset|image|zoom|odd|even|before|prepend|exclude|expr|quickClass|quickID|uuid|quickChild|continue|Height|textContent|appendTo|contents|open|margin|evalScript|borderTopWidth|borderLeftWidth|parent|httpData|setArray|CSS1Compat|compatMode|boxModel|cssFloat|linear|def|webkit|nodeValue|speed|_toggle|eq|100|replaceWith|304|concat|200|alpha|Last|httpNotModified|getAttributeNode|httpSuccess|clearInterval|abort|beforeSend|splice|styleFloat|throw|colgroup|XMLHttpRequest|ActiveXObject|scriptCharset|callback|fieldset|multiple|processData|getBoundingClientRect|contentType|link|ajaxSend|ajaxSuccess|ajaxError|col|ajaxComplete|ajaxStop|ajaxStart|serializeArray|notmodified|keypress|keydown|change|mouseup|mousedown|dblclick|focus|blur|stylesheet|hasClass|rel|doScroll|black|hover|solid|cancelBubble|returnValue|wheelDelta|view|round|shiftKey|resize|screenY|screenX|relatedNode|mousemove|prevValue|originalTarget|offsetHeight|keyup|newValue|offsetWidth|eventPhase|detail|currentTarget|cancelable|bubbles|attrName|attrChange|altKey|originalEvent|charAt|0n|substring|animated|header|noConflict|line|enabled|innerText|contains|only|weight|font|gt|lt|uFFFF|u0128|size|417|Boolean|Date|toggleClass|removeClass|addClass|removeAttr|replaceAll|insertAfter|prependTo|wrap|contentWindow|contentDocument|iframe|children|siblings|prevAll|wrapInner|nextAll|outer|prev|scrollTo|static|marginTop|next|inline|parents|able|cellSpacing|adobeair|cellspacing|522|maxLength|maxlength|readOnly|400|readonly|fast|600|class|slow|1px|htmlFor|reverse|10000|PI|cos|compatible|Function|setData|ie|ra|it|rv|getData|userAgent|navigator|fadeTo|fadeIn|slideToggle|slideUp|slideDown|ig|responseXML|content|1223|NaN|fadeOut|300|protocol|send|setAttribute|option|dataFilter|cssText|changed|be|Accept|stop|With|Requested|Object|can|GMT|property|1970|Jan|01|Thu|Since|If|Type|Content|XMLHTTP|th|Microsoft|td|onreadystatechange|onload|cap|charset|colg|host|tfoot|specified|with|1_|thead|leg|plain|attributes|opt|embed|urlencoded|www|area|hr|ajaxSetup|meta|post|getJSON|getScript|marginLeft|img|elements|pageYOffset|pageXOffset|abbr|serialize|pixelLeft'.split('|'),0,{}));

// Плагины
/*
 * Javascript jQuery Hotkeys Plugin
 * http://code.google.com/p/js-hotkeys/
 */
(function(B){B.fn.__bind__=B.fn.bind;B.fn.__unbind__=B.fn.unbind;B.fn.__find__=B.fn.find;var A={version:"0.7.8",override:/keydown|keypress|keyup/g,triggersMap:{},specialKeys:{27:"esc",9:"tab",32:"space",13:"return",8:"backspace",145:"scroll",20:"capslock",144:"numlock",19:"pause",45:"insert",36:"home",46:"del",35:"end",33:"pageup",34:"pagedown",37:"left",38:"up",39:"right",40:"down",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},newTrigger:function(E,D,F){var C={};C[E]={};C[E][D]={cb:F,disableInInput:false};return C}};if(B.browser.mozilla){A.specialKeys=B.extend(A.specialKeys,{96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"})}B.fn.find=function(C){this.query=C;return B.fn.__find__.apply(this,arguments)};B.fn.unbind=function(H,E,G){if(B.isFunction(E)){G=E;E=null}if(E&&typeof E==="string"){var F=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();var D=H.split(" ");for(var C=0;C<D.length;C++){delete A.triggersMap[F][D[C]][E]}}return this.__unbind__(H,G)};B.fn.bind=function(J,F,K){var H=J.match(A.override);if(B.isFunction(F)||!H){return this.__bind__(J,F,K)}else{var N=null,I=B.trim(J.replace(A.override,""));if(I){N=this.__bind__(I,F,K)}if(typeof F==="string"){F={combi:F}}if(F.combi){for(var M=0;M<H.length;M++){var D=H[M];var G=F.combi.toLowerCase(),E=A.newTrigger(D,G,K),L=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();E[D][G].disableInInput=F.disableInInput;if(!A.triggersMap[L]){A.triggersMap[L]=E}else{if(!A.triggersMap[L][D]){A.triggersMap[L][D]=E[D]}}var C=A.triggersMap[L][D][G];if(!C){A.triggersMap[L][D][G]=[E[D][G]]}else{if(C.constructor!==Array){A.triggersMap[L][D][G]=[C]}else{A.triggersMap[L][D][G][C.length]=E[D][G]}}this.each(function(){var O=B(this);if(O.attr("hkId")&&O.attr("hkId")!==L){L=O.attr("hkId")+";"+L}O.attr("hkId",L)});N=this.__bind__(H.join(" "),F,A.handler)}}return N}};A.findElement=function(C){if(!B(C).attr("hkId")){if(B.browser.opera||B.browser.safari){while(!B(C).attr("hkId")&&C.parentNode){C=C.parentNode}}}return C};A.handler=function(E){var O=A.findElement(E.currentTarget),I=B(O),D=I.attr("hkId");if(D){D=D.split(";");var G=E.which,Q=E.type,P=A.specialKeys[G],N=!P&&String.fromCharCode(G).toLowerCase(),H=E.shiftKey,C=E.ctrlKey,M=E.altKey||E.originalEvent.altKey,F=null;for(var R=0;R<D.length;R++){if(A.triggersMap[D[R]][Q]){F=A.triggersMap[D[R]][Q];break}}if(F){var J;if(!H&&!C&&!M){J=F[P]||(N&&F[N])}else{var L="";if(M){L+="alt+"}if(C){L+="ctrl+"}if(H){L+="shift+"}J=F[L+P];if(!J){if(N){J=F[L+N]||F[L+A.shiftNums[N]]||(L==="shift+"&&F[A.shiftNums[N]])}}}if(J){var S=false;for(var R=0;R<J.length;R++){if(J[R].disableInInput){var K=B(E.target);if(I.is("input")||I.is("textarea")||K.is("input")||K.is("textarea")){return true}}S=S||J[R].cb.apply(this,[E])}return S}}}};window.hotkeys=A;return B})(jQuery);

/* Copyright (c) 2008, Three Dub Media (http://threedubmedia.com) 
 * Drags
 */
(function(H){H.fn.drag=function(K,J,I){if(J){this.bind("dragstart",K)}if(I){this.bind("dragend",I)}return !K?this.trigger("drag"):this.bind("drag",J?J:K)};var D=H.event,B=D.special,F=B.drag={not:":input",distance:0,setup:function(I){I=H.extend({distance:F.distance,not:F.not},I||{});I.distance=G(I.distance);D.add(this,"mousedown",E,I)},teardown:function(){D.remove(this,"mousedown",E);if(this===F.dragging){F.dragging=F.proxy=null}C(this,true)}};function E(K){var J=this,I,L=K.data||{};if(J===document){K.dragTarget=J=L.elem;K.dragProxy=F.proxy||J;K.cursorOffsetX=L.pageX-L.left;K.cursorOffsetY=L.pageY-L.top;K.offsetX=K.pageX-K.cursorOffsetX;K.offsetY=K.pageY-K.cursorOffsetY}else{if(F.dragging||K.which!=1||H(K.target).is(L.not)){return }}switch(K.type){case"mousedown":H.extend(L,H(J).offset(),{elem:J,target:K.target,pageX:K.pageX,pageY:K.pageY});D.add(document,"mousemove mouseup",E,L);C(J,false);return false;case !F.dragging&&"mousemove":if(G(K.pageX-L.pageX)+G(K.pageY-L.pageY)<L.distance){break}K.target=L.target;I=A(K,"dragstart",J);if(I!==false){F.dragging=J;F.proxy=K.dragProxy=H(I)[0]||J}case"mousemove":if(F.dragging){I=A(K,"drag",J);if(B.drop){B.drop.allowed=(I!==false);B.drop.handler(K)}if(I!==false){break}K.type="mouseup"}case"mouseup":D.remove(document,"mousemove mouseup",E);if(F.dragging){if(B.drop){B.drop.handler(K)}A(K,"dragend",J)}C(J,true);F.dragging=F.proxy=null;break}}function A(K,I,J){K.type=I;return D.handle.call(J,K)}function G(I){return Math.pow(I,2)}function C(J,I){if(!J){return }J.unselectable=I?"off":"on";J.onselectstart=function(){return I};if(J.style){J.style.MozUserSelect=I?"":"none"}}})(jQuery);



$head = document.getElementsByTagName('head')[0];
$body = document.getElementsByTagName('body')[0];
// Подмена алерта
__alert = alert;


//alert = function (message,name) { return aalert(message,name) };



String.prototype.repeat = function(n) {return strRepeat(this,n)};
String.prototype.serialize = function() {return serialize(this+'')};		// +'' чтобы получился String, а не Object
String.prototype.unserialize = function() {return unserialize(this+'')};
String.prototype.upFirst = function() {return fUpper(this+'')};
String.prototype.clear = function() {return clearString(this+'')};

Number.prototype.serialize = function() {return serialize(this+0)};			// +0 чтобы получился Number, а не Object


Array.prototype.toString = function() {return formatArray(this,0)};
Array.prototype.like = function(arr) {return arrayCompare(this,arr)};
Array.prototype.exists = function(obj) {return existsArray(this,obj)};
Array.prototype.find = function(obj) {return findArray(this,obj)};
Array.prototype.subtract = function(arr) {return subtractArray(this,arr)};
Array.prototype.serialize = function() {return serialize(this)};


Function.prototype.bind = function(context) {
   var fn = this;
   return function() {
      return fn.apply(context, arguments);
   };
}

// Расширяем jQuery
$.fn.extend({ 
	whenChange: function(callback) {
							whenChange(this,callback)
							}
	});

GET = parseGET();
here_page = location.pathname.substring(1);

// Запись и чтение параметров
// params - их описания



getParams(params);

setParams(params);

// Проверяем, успешно ли завершился скрипт?
if(par['checkCrashes'])
	checkLastFunc();	

// Инициализация консоли
/*
 * Создаем консоль только, если страница распознана как страница контакта,
 * т.к. если этого не делать то консоль будет добавляться во все фреймы
 * включая поля ввода
 */
if ( document.getElementById('vkontakte') && document.getElementById('vkontakte').tagName == 'HTML') {
	onTheSite = true;
	initConsole();
	$('<div>').attr('id','notify_sound').appendTo($body);
}

GLOBAL['consoleTxt'] = $('#ConsoleTXT');
GLOBAL['commentsData'] = getValue('commentsData','').unserialize();
GLOBAL['userId'] = getCookie('remixmid');

console('location: '+location.href);
// Стена — место расположения сообщений и комменатриев
$wall = $('#wall,#videocomment,#photocomment');
$sound = $('#notify_sound');

// Система событий!!

/* убожество!!

events = {handlers:Array(),titles:Array(),count:0,raiseEvent:function(ev) {console('event: '+events.titles[ev]);for(var i in events.handlers[ev]) {events.handlers[ev][i]()}}};
 
event = function(title) {
		name = 'ev'+events.count++;
		events.handlers[name] = Array();
		events.titles[name] = title;
		this.addHandler = new Function('func','events.handlers.'+name+'.push(func)');
		this.raise = new Function('events.raiseEvent(\"'+name+'\")');
		};
*/

events = {};		// в новой версии events это просто контейнер
event = function(title) {
			var _title = title;
			var _handlers = new Array();
			
			this.addHandler = function(func) {
				_handlers.push(func);
			}.bind(this);
			
			this.raise = function() {
				console('event: '+_title);
				for(var i=0;i<_handlers.length;i++){
					_handlers[i]();
				}

			}.bind(this);
	
		}
		

events.turnWallPageBegin = new event('turn wall page begin');		// клик на смену страницы на стене

events.turnWallPage = new event('turn wall page ok');				// страница сменена
events.postOnWallBegin = new event('post on wall begin');			// клик по кнопке «Отправить»
events.postOnWall = new event('post on wall ok');					// сообщение отправлено
events.deleteWallMessage = new event('delete wall message');			// сообщение удалено
events.restoreWallMessage = new event('restore wall message');		// сообщение восстановлено

events.wallChanged = new event('wall changed');						// стена изменена (это или удалено сообщение или изменена страница и т.д.)
events.changingWall = new event('changing wall');					// начало изменение страницы (вызвано действие, меняющее стену)


events.commentsChanged = new event('comments changed');						// комментарии изменены
events.changingComments = new event('changing comments');	
events.turnCommentsPageBegin = new event('changing comments page begin');	// клик на смену страницы комментариев
events.turnCommentsPage = new event('changing comments page ok');			// страница сменена
events.postCommentBegin = new event('post comment begin');			
events.postComment = new event('post comment ok');							// сообщение отправлено
events.deleteComment = new event('delete comment');							// сообщение удалено
events.restoreComment = new event('restore comment');						// сообщение восстановлено

events.newComments = new event('new comments');						// новые комментарии

// добавляем обработчики на события, влекущие за собой изменение стены
events.turnWallPage.raise();

events.turnWallPageBegin.addHandler(new waitChangingWall(events.turnWallPage.raise));
events.postOnWallBegin.addHandler(new waitChangingWall(events.postOnWall.raise));
events.deleteWallMessage.addHandler(new waitChangingWall());
events.restoreWallMessage.addHandler(new waitChangingWall());
//events.changingWall.addHandler(new waitChangingWall()); - нет нужен такой хендлер, потому что это событие вызывается при waitChangingWall
//events.wallChanged.addHandler(setWallHandlers);	// восстанавливаем onclick для всех элементов стены при изменении


// добавляем обработчики на события, влекущие за собой изменение комментариев
events.turnCommentsPageBegin.addHandler(new waitChangingComments(events.turnCommentsPage.raise));
events.postCommentBegin.addHandler(new waitChangingComments(events.postComment.raise));
events.deleteComment.addHandler(new waitChangingComments());
events.restoreComment.addHandler(new waitChangingComments());

//setWallHandlers(); - не используется. Нажатия теперь перехватываются с помощью анализа document.onClick
/*
 * Определяем, что произойдёт, если будет отправка сообщения
 * будет ли это комментарий к видео или фотографии
 * или сообщение на стену
 * 
 */
var reply_field = $('#reply_field,#commentArea');
switch(reply_field.parent().attr('id')) {
	case('postMessage'):
		//alert('Сообщение на стену');
		onPostEvent = events.postOnWallBegin.raise;
	break;
	case('comment'):
		//alert('Комментарий');
		onPostEvent = events.postCommentBegin.raise;
	break;
}
$('#postIt,#photoaddcomment a').click(onPostEvent);
reply_field.keypress(function(event) {
	if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {onPostEvent()}
});
	
$(document).click(documentClickHook);

// stackChecker
/*
stackChecker = setInterval(checkStack,500);
*/

// resources
resources.groupIcon = 'data:image/gif;base64,R0lGODlhEQAOAMQAAJSUlHp6eq2trfb29rm5ufr6+u3t7ebm5rKystbW1vT09PDw8O7u7t3d3b+/v/Ly8qSkpISEhMjIyPz8/Pj4+IiIiJCQkP7+/o+Pj4mJifv7+4uLi46Ojo2NjZmZmf///yH5BAAAAAAALAAAAAARAA4AAAW24HVlW/ddXJd9X9dV15kNiqQaR8Jly9JwnwmG0ZBwNj5JBLBIOCKsSgISqGAkDoxF6thgWCqOBXPcVDIWTmrzqUgICEHkMtHQOwqNprDhEAgaDh16QRoWExcUEyUCjQgbFBqKExyRBRpeEAIDBBsaAxd6GKB7fRYQCARWFJEkFAsFACsZVB4WeAYDaTgGACwcHgEQHRwDCQMqBxIPXxMAEQEeKTkLXg0EBiYfEcQVLilH3hZ9HyEAOw==';
resources.bunny = 'data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAL41JREFUeNq0vHeUZOd53vn70r23QueZntCTI2YGM4hEIAECohiULCpwaVorH9Oyoi17vZbkI29Qoml5JYuUfHbt1SpQkpW8kkjKsijSlEwRAgEGJCIOwgxmMLF7OlVX1U1f2j9udQMgBsRA52zNqek603eq6nvv+73heZ73Ex/60Z/i7jtuwGea3/6bT/I7f/YxGEsBATEijeabt0yyTW/CyxSICAFlHrC2ef23eQghqCrHww+8hPORr30bhyPMwFv//s2EGCG+9j0CMCGgePa0OHd+MUopqFzJO4+8l3vmvo2TwycQGvbdeJjzC33OnL5EtyWZmh6nk2oIlk7a4mNf+CT//dEv8c3HYc8k2ABy/UOstRzedZC33HwH1BZs9bqLCqF5fq1R3pSRxBv9WlAOKgYrBdqo132LKAStThZjCNS24u4T386N++/G+ooYI8556tqSpgk75rbpublt461WZpxzr/qsr33o9ReVqzm4fS+f//DH+eSDn+Znf//f8ez5Z4hi/Ss0/znGgHMR719tCCHA+siwCtdkF6kkvSs51gfkVb6YQFJVloc+8QS3fddxups6uNq/5roIxBCoasv3vP/7uXHXO7l88jTeGUAxu302u+GmG49Nz87co4j3elvssZVffeap5//Niy++8GkhweFBglx/vtIwAkFla1zwfOst76Q1DHz26fv5L8/dR1X3qGOJSAyttINTgSIfoKXcuHO1jwzKQIjX7jHORyLxdd1HIRmulXz540/wlpFx/NcYJ8aItRXf9s7384H3/gCPfOEJirxkZmzKfNd3f/B901viDyxenL/5yYcenCjzIXVZkWWGsanpX0V13jJwcuHsi5dgBYZrsKLA+VcYZt04IUbyMqd2NW/dfxNvvfmtnHr+EaYTg2IMYxKUgsefepxnTz9LkiQAlHUkxDfcIS97jIRwldjyWpcW5GslX/mTxjjpdIK3fiPG6BC45cg3cueN30peDNl9eDe7d+3afOC67f9xoT//3Q98+glWLy/gfA0+MBwWSKnYdby1a2y8862ri6sf2ze9jQtnz/Pwk4gnE2J8pcdEIiGG5lWE4AN5XTAlxzi091bmNo1z4cXzFNUQKQInjt5EVAmPPvk4WimE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';
resources.sound = 'data:audio/mpeg;base64,SUQzAwAAAAAHdlRDT04AAAAGAAAAT3RoZXJHRU9CAAAAGQAAAAAAU2ZNYXJrZXJzAAwAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAP/7ksD/gAAAASwAAAAAAAAlgAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAABUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA==';


// ############################################################################################
// ###
// ###									Обновления
// ###
// #############################################################################################


var update = {
	checkNow: false,
	
	check: function() {
		if (update.checkNow) {
			showDialog('Обновление vkPatch','<center><h1><font color="#444444"><b>Проверка обновления…</b></font></h1></center>','Скрыть',hideBox);
		}
		
		console('getting update information');
		
		simpleGet('note7416945?oid=278966',update.parse,update.error_dialog);
	},
	
	checknow: function() {
		update.checkNow = true;
		update.check();
	},
	
	parse: function(data) {
		console('parsing update information');
		data = data.split("// ====== Script Info BEGIN")[1].split("// ====== Script Info END")[0].replace(/<br\/>\/\/ /g,"\n");
		var version = parseFloat(data.split("=== Version")[1].split("=== Changelog")[0]);
		var clog = data.split("=== Changelog")[1].split("----------");
		var changelog = new Array();
		    	
		var strings;
		var vers;	    
		var changes;
		for(i=0;i<=clog.length-1;i++) {
			strings = clog[i].split("\n");
			strings.pop();
			vers = parseFloat(strings[1]);
			changes = strings.slice(2);
			changelog.push(new Array(vers,changes));
		}  // ченжлог есть
		
		if (version > vkpathVersion && (version > par['skipVersion'] || update.checkNow)) {
			console('have new version');
			update.newVersion_dialog(version,changelog)
		} else if (update.checkNow) {
			console('no new version');
			update.noNewVersion_dialog(vkpathVersion);
		}
		
		setValue('lastUpdateCheck',nowTime().toString());
	},
	
	newVersion_dialog: function(version,changelog) {
			var title = "Обновление vkPatch";
		var text = '<h1><font color="#444444"><b>Доступна новая версия vkPatch '+version+'</b></font></h1><br><br>Изменения в новой версии:<ul>';
		for (i=0;i<=changelog[0][1].length-1;i++) {
			text += "<li>"+changelog[0][1][i]+"</li>";
		}
		text += "</ul><div align='right'><a href='javascript: void(0)' id='skipVersion'>Пропустить версию</a></div>";
		showDialog(title,text,"Обновить",function() {hideBox();location.href='http://userscripts.org/scripts/source/29327.user.js'},'Отмена',hideBox);
		$('#skipVersion').click(function(){hideBox();setValue('skipVersion',version)});
	},
	
	noNewVersion_dialog: function(version) {
		var title = "Обновление vkPatch";
		var text = '<center><h1><font color="#444444"><b>Ваша версия vkPatch '+version+' является самой последней</b></font></h1></center>';
		showDialog(title,text,"Ок",hideBox);
	},
	
	error_dialog: function(version) {
		if (!update.checkNow) return;
		var title = "Обновление vkPatch";
		var text = '<center><h1><font color="#444444"><b>Произошла ошибка при получении информации об обновлениях.</b></font></h1></center>';
		showDialog(title,text,"Ок",hideBox,"Повторить",update.checknow);
	}
}

// #############################################################################################
// ###
// ###									  Комментарии
// ###
// #############################################################################################


var comments = {
	oldData: [],
	newData: [],
	unreadData: [],
	newCount: 0,

	setCount: function(num) {
		console('set comments num: '+num);
		if (num == 0)
			$('#commentsCount').hide();
		else
			$('#commentsCount').show();
		
		$('#commentsCountNum').text(num);
		comments.newCount = num;
	},
	
	addLink: function() {
		var lnk;
		if (lnk = addLinkToMenu('Комментарии ','news.php?act=bookmarks')) 
			lnk.append($('<span>').hide().attr('id','commentsCount').html('(<b id="commentsCountNum"></b>)'));
	},
	
	onLoad: function (responseText, textStatus) {
		if (notAuthOnPage(responseText)) {
			console('unauthorized on comments page');
			return;
		}
		if (textStatus == 'success') {
			setValue('lastCommentsTime',nowTime().toString());

			comments.newData = comments.parse(responseText);
			/*
			 * Непрочитанные комментарии это Текущие минус старые
			 */
			var unread = comments.newData.subtract(comments.oldData);
			/*
			 * Новые это непрочитанные сейчас минус непрочитанные ранее
			 */
			var newCommentsCount = unread.subtract(comments.unreadData).length;
			var unreadCommentsCount = unread.length;
			comments.unreadData = unread;
			
			setValue('lastCommentCount',unreadCommentsCount);
			setValue('commentsUnreadData',unread.serialize());
			console('unread comments: '+unreadCommentsCount+' / new: '+newCommentsCount);
			
			/*
			 * Событие о новых только если есть именно новые, а не непрочитанные
			 */
			if (newCommentsCount > 0)
				events.newComments.raise();
			
			/*
			 * Но в меню утсанавливаем кол-во непрочитанных
			 */
			comments.setCount(unreadCommentsCount);
		}
	},
	
	parseCommPage: function() {
		comments.oldData = getValue('commentsData','').unserialize();
		var data = comments.parse($body);
		comments.unreadData = data.subtract(comments.oldData);
		
		setValue('commentsData',data.serialize());
		setValue('commentsUnreadData','');
		setValue('lastCommentCount',0);
		console('comments data saved');
	},
	
	
	highlight: function() {

		$('td.feedStory td[id="startQuote"] small').each(function() {
			var obj = Array();
			obj['id'] = $('a',this).attr('href').substr(2);
			obj['tm'] = $('b',this).text();

			if (comments.unreadData.exists(obj)) {
				$(this).parent().css('border','1px dashed grey');
			}
		});
	},
	
	getComments: function() {
		var elTime = elapsedTime(parseInt(getValue('lastCommentsTime',0)));

		if (elTime < 0) {
			setValue('lastCommentsTime',nowTime().toString());
		}
		
		if (elTime/1000 > par['commCheckTimeout']) {
			comments.getNow();
		} else {
			console('get new comments from memory (elaps:'+(elTime/1000)+'s / min:'+par['commCheckTimeout']+'s)');
			comments.setCount(getValue('lastCommentCount',0));
		}
	},
	
	getNow: function() {
		comments.oldData = getValue('commentsData','').unserialize();
		comments.unreadData = getValue('commentsUnreadData','').unserialize();
		console('loading comments');
		$.ajax({
			url: 'news.php?act=bookmarks',
			success:  comments.onLoad,
		});
	},
	parse: function(element) {
		console('parsing comments');
		var comments = Array();
		
		/*
		 * Получаем все группы новых комментариев, т.е. 
		 * все блоки комментариев, относящихся к одному элементу
		 */
		var commentBlock = $('#mainFeed table.feedTable',element);
		commentBlock.each(function(n) {
			/*
			 * В каждом блоке надим id автора и время комментария
			 * и складываем в массив 
			 */
			var elements = $('td.feedStory td[id="startQuote"] small',this);
			var commentsTmp = Array();
			
			$(elements).each( function(i) {
				commentsTmp[i] = Array();
				commentsTmp[i]['id'] =  $(this).find('a').attr('href').substr(2);
				commentsTmp[i]['tm'] =  $(this).find('b').text();
			});
	
			
			/*
			 * Пробегаемся складываем комментарии, которые позже ваших,
			 * т.е. комментарии, после которых нет ваших
			 */
			for (var i=commentsTmp.length-1;i>=0;i--) {
				if (commentsTmp[i].id == GLOBAL['userId']) break;
				
				comments.push(commentsTmp[i]);
			}
	
		});
	
		return comments;
	}
	
	
}

/*
$(go);
//////////////////////////////////////////////////
function go() {
//////////////////////////////////////////////////
*/
// ########## Добавление ссылки
$('#bFooter ul.bNav')
		.append(
			$('<li>').append(
				$('<a>').attr('href','http://klinifini.livejournal.com/tag/vkpatch').attr('target','_blank').text('vkPatch')
			)
		);

// ########## Прямые ссылки
if (par['directLinks']) {
	correctLinks();
	events.wallChanged.addHandler(function() {correctLinks($wall)});		// Добавляем ее к событию "стена изменена"
	events.commentsChanged.addHandler(correctLinks);
}
function correctLinks(element) {
		nowFunc('directLinks');
		element = element || document;
		
		$('a[href^="http://vkontakte.ru/away.php?to="]',element).each( function() {
			this.href = decodeURIComponent(this.href.substring(32));
		});
}
	
// ########## Раскрыть фотографии
if (par['showPhotosVideos']) {
	showPhotosVideos();
	events.wallChanged.addHandler(function() {showPhotosVideos($wall)});		// Добавляем ее к событию "стена изменена"
	/*
	 * Наверное был пьяный, когда писал строчку ниже.
	 * Какие фото и видео в комментариях…
	 */
	/*
	events.commentsChanged.addHandler(function() {
										showPhotosVideos($('#photocomment,#videocomment'))
									  });	// Добавляем ее к событию "комментарии изменены"
	*/
}
function showPhotosVideos(element) {
	nowFunc('showPhotosVideos');
	element = element || document;
	
	
	
	
	$wall.find('div.feedVideos a',element).append( 
		$('<div>').css( {position:'relative',top:-193,left:-113,height:0} ).append(
			 $('<img>').addClass('videoIcon').attr('src','http://vkontakte.ru/images/icons/movie_icon.gif').css({backgroundColor:'transparent',borderWidth:0})
			)
	).each(function() {
		var text = $(this).parent().prev().find('a').text();
		$(this).append(
			$('<center>').append($('<div>').css( {position:'relative',top:-190,height:0,textAlign: 'center',color:'white',width:200} ).text(text))
		)
		this.title = text;
	});
	
	$wall.find('div.feedPhotos,div.feedVideos',element).css({textAlign:'center'}).show()
		.prev().remove().end()
		.find('img:not(.videoIcon)').css({width:250,height:'auto'});
} 

// ########## Сообщение на стену и Все функции
if( pageIs('profile.php') || pageIs(/^id[0-9]*/) ) {
	
	if (par['showReply']) {
		nowFunc('showReply');
		$('#r,#br').show();
	}
	
	if (par['moreWall']) {
		nowFunc('moreWall');
		$('#moreWall').show();
		$('#wRaquo').text('«');	// Меняем значочек)
	}
	
}

// ########## Проверка обновления
if (par['checkUpdate']) {
	nowFunc('checkUpdate');
	var lastUpdatesCheck = parseInt(par['lastUpdateCheck']);
	var updatePeriod = 24*60*60*1000;
	if (elapsedTime(lastUpdatesCheck) > updatePeriod) {
		update.check();
	}
}

// ########## Группы
var groups = $('#groups div.flexBox a');
if (par['correctGroups'] && ( pageIs('profile.php') || pageIs(/^id[0-9]*/) )) {
	nowFunc('correctGroups');
	groups.each(function() {
		this.title = $.trim(this.innerHTML.replace(/(<br>)+/g,"\n"));
		this.innerHTML = ' '+this.innerHTML.clear().upFirst();
	});
}

if (par['columnGroups'] && ( pageIs('profile.php') || pageIs(/^id[0-9]*/) ) ) {
	nowFunc('columnGroups');
	//groups.append('<br>').before( $('<img>').attr('src',resources.groupIcon) );
	
	groups = groups.wrap( 
		$('<li>').css({
			padding: '0 3px 3px 22px',
			background: 'transparent url('+resources.groupIcon+') no-repeat scroll 0 center',
			verticalAlign: 'middle'
			}) 
		).parent();	
	
	$('#groups div.flexBox').html( groups ).wrapInner( $('<ul>').addClass('notes_titles') );
}


// ########## Настройки
if (pageIs('settings.php')) {
	nowFunc('Вывод настроек vkPatch');
	var isactive = (GET['act'] == 'vkPatch') ? true : false;
	setSettingsTab(isactive);
	if (isactive) {
		var display = $('div.editorPanel');
		var button = $('#cname div:last').find('a').attr('href','javascript:document.vkPatch.submit()').text('Сохранить').end();
		var category = $('#content>div.editorPanel>div.settingsPanel:eq(2)').clone().removeAttr('id').find('table').empty().end();
		var textLine = $('#password table:eq(0) tr').eq(0).clone();
		var boolVal = $('#cname table.editor:eq(0) tr:eq(0)').clone();
		var strVal = $('#changeNickname tr:eq(0)').clone().find('td:eq(1) input').css('width','200px').end().find('td:eq(1)').attr('colspan','2').end();
		function newCat(title) {
			return category.clone().find('h4').html(title).end().find('table').empty();
		}
		
		function newTextLine(title,value) {
			var el = textLine.clone().find('td:eq(0)').empty().end().find('td:eq(1)').empty();
			if (value instanceof jQuery) 
				el = el.html('<font color="#777777">'+title+':</font> ').append(value).end();
			else
				el = el.html('<font color="#777777">'+title+':</font> '+value).end();
			return el;
		}
		function newBoolVal(title,name,checked,desc) {
			var b = boolVal.clone()
					.find('td:eq(0)').text(title).end()
					.find('td:eq(1) input').attr('name',name);
			checked ? b.attr('checked','checked') : b.removeAttr('checked');
			return b.end()
					.find('td:eq(2) small').text(desc).end();
		}
		function newStrVal(title,name,value,desc) {
			return strVal.clone()
					.find('td:eq(0)').text(title+':').end()
					.find('td:eq(1)').find('input').attr('name',name).val(value).end()
					.find('small').text(desc).end().end();
		}
		
		display.empty().append( 
			$('<form>').attr('method','get').attr('action','settings.php').attr('name','vkPatch')
			.append(
				$('<input type="hidden" name="act" value="vkPatch">')
			)
			.append(
				$('<input type="hidden" name="vkpatch_save">')
			)
		);
		
		display = display.find('form');

		
		var lastCatId = -1;
		var lastCat = newCat('vkPatch <small style="color: #98A7B5;">версия '+vkpathVersion+'</small>');
		lastCat.css({background: 'url('+resources.bunny+') 25px center no-repeat'});
		//lastCat.appnd(newTextLine('Обновление','<a href="mailto: pochemuto@gmail.com">проверить</a>'));
		lastCat.append(newTextLine('Автор','<a href="http://vkontakte.ru/id278966">Сергей Третьяк</a>'));
		lastCat.append(newTextLine('Обновление',$('<a>').attr('href','javascript: void(0)').click(update.checknow).text('Проверить')));
		
		lastCat.append(newTextLine('Сайт','<a target="_blank" href="http://klinifini.livejournal.com/tag/vkpatch">http://klinifini.livejournal.com</a>'));
		lastCat.append(newTextLine('e-Mail','<a href="mailto: pochemuto@gmail.com">pochemuto@gmail.com</a>'));
		lastCat.append('<tr><td colspan="2" style="width: 120px;text-align:center;padding-top:10px;"><b><a href="http://vkontakte.ru/rate.php?act=vote&id=278966" title="Отдать голос за автора vkPatch">Проголосовать за автора</a></b></td></tr>');
		

		var element;
		for(var name in params) {
			if (typeof(params[name]) == 'function')	continue;		// отсеиваем ф-ии
			if (isUndef(params[name]['cat']))
				continue;
			
			if(params[name]['cat'] != lastCatId) {
				if (!isUndef(lastCat))
					lastCat.end().appendTo(display);
				lastCatId = params[name]['cat'];
				lastCat = newCat(GLOBAL['categories'][ lastCatId ]);
			}
			if (isBool(params[name]['default']))
				element = newBoolVal(params[name]['title'],name,par[name],params[name]['desc']);
			else
				element = newStrVal(params[name]['title'],name,par[name],params[name]['desc']);
			lastCat.append(element);			
		}
		
		if (!isUndef(lastCat))
			lastCat.end().appendTo(display);

		
		button.appendTo(lastCat.end());
		
		if (!isUndef(GET['vkpatch_save']))
			$('div.clearFix:eq(0)').after('<div id="messageWrap"><div id="message">Настройки vkPatch сохранены.</div></div>');
	}
}

// ########## Ссылка поиск
if (par['addSearchLink']) {
	nowFunc('addSearchLink');
	addLinkToMenu('Поиск людей','http://vkontakte.ru/search.php?act=mixed');
}

// ########## Комментарии
if (par['addCommentsLink']) {
	nowFunc('addCommentsLink');
	comments.addLink();
}

if (pageIs('news.php') && GET['act'] == 'bookmarks') {
	comments.parseCommPage();
	if (par['highlightNewComments']) {
			nowFunc('highlightNewComments');
			comments.highlight();
	}
} else if (par['newComments']) {
	nowFunc('newComments');
	comments.getComments();
}

if (par['newCommentsEvery'] && par['addCommentsLink']) {
	var checkCommentsEvery = setInterval(function(){nowFunc('newCommentsEvery');comments.getComments();},par['commCheckEvery']*1000);
}


// ######### Удалить шапку
if (par['removeHeader']) {
	nowFunc('removeHeader');
	$('#pageHeader').remove();
}
// ########## Затенить Мои или удалить
if (par['shadeMy'] || par['removeMy']) {
	var elements = $('#nav>li');
	for (var i=0;i<elements.length;i++) {
		var a = $('a:eq(0)',elements.eq(i));
		if (par['removeMy'] && $(a).parent().attr('id') != 'myprofile') {
			nowFunc('removeMy');
			a.html( a.html().replace(/^([^ ]+) /,'') );
		} else if (par['shadeMy']) {
			nowFunc('shadeMy');
			a.html( a.html().replace(/^([^ ]+) /,'<font color="silver">$1</font> ') );
		}
	}
}

// ######### Фиксированное меню
if (par['fixedMenu']) {
	nowFunc('fixedMenu');
	$('#sideBar').css('position','fixed');
}


// ########## Магнитное меню
if(par['menuRightAlignment']) {
	nowFunc('menuRightAlignment');
	$('#sideBar').attr('align','right');
}	

// ########## Удалить баннеры
if(par['removeBanners']) {
	nowFunc('removeBanners');
	var banners = $('div[id^="banner"]');
	
	/*
	 * Долго боролся с рекламой и самым удачным вариантом оказалась подмена ф-ии загрузчика рекламы.
	 */
	if (!isUndef(unsafeWindow.BannerLoader))
		unsafeWindow.BannerLoader.init = function(id) {console('vkontakte load banner "'+id+'"')};
	
	/*
	 * А это предыдущие попытки скрить рекламу. В принципе, работают все, так пусть работают)
	 */
	banners.css({position:'absolute',top:'-9000000px',left:'-9000000px'}); //-улётайте нафиг
	banners.css({display:'none',visibility :'hidden'});
	banners.wrap( $('<div>').css({display:'none',visibility :'hidden'}) );
	banners.remove();
}

// ########## Подтверждение мнения
if(par['confirmOpinion'] && ( pageIs('profile.php') || pageIs(/^id[0-9]*/) ) ) {
	nowFunc('confirmOpinion');
	var elements = $('#opinions');
	if (elements.length) {
		elements.find('span.ncc a').click(function() {
				return confirm('Вы действительно хотите отправить анонимное сообщение?')
			});
	}
}

// ########## Листать табы
if (par['keyTabswitch']) {
	nowFunc('keyTabswitch');
	
	function findTabAndGo(next) {
		var pageList,link;
		if( (pageList = $('ul.tabs')).length ) {
				target = pageList.find('li.activeLink');
				
				if (next) {
					target = target.next();
				} else {
					target = target.prev();
				}
				
				link = target.find('a').attr('href');
		}
		
		if (!isUndef(link)) 
			location.href = link;
	}
	
	/*
	 * Вешаю обработчики на клавиши
	 */
	 
	
	$(document).bind('keydown','Ctrl+Shift+left',function() {console('hotkey: prev tab');findTabAndGo(false)});
	$(document).bind('keydown','Ctrl+Shift+right',function() {console('hotkey: next tab');findTabAndGo(true)});
}
	
// ########## Листать страницы
if(par['keyPageswitch']) {
	nowFunc('keyPageswitch');
	
	
	/*
	 * Функции для обработки нажатий горячих клавиш
	 */
	var nextFunc,prevFunc;
	
	/*
	 * На всяческих стенах
	 * Отдельно для обработки события смены странички стены
	*/
	if ( pageIs('profile.php') || pageIs(/^id[0-9]*/) || pageIs(/^club[0-9]*/) ) {
		nextFunc = function() {
				console('hotkey: next wall page');
				var link = $('#fBox2 div.dArrow a').attr('href');
				if (!isUndef(link)) {
					location.href = link
					events.turnWallPageBegin.raise();
				}
			};
		prevFunc = function() {
				console('hotkey: prev wall page');
				var link = $('#fBox2 div.upArrow a').attr('href');
				if (!isUndef(link)) {
					location.href = link
					events.turnWallPageBegin.raise();
				}
			};
	}
		
	
	
	/*
	 * Универсальная функция для поиска 
	 * ссылки на след/пред страницу и перехода
	 */
	function findPageAndGo(next) {
		var pageList;
		var target,link;
		
		
		if ( (pageList = $('ul.pageList,ul.commentsPages').slice(0,1) ).length  ) {
			
			if ( ( target = pageList.find('li.current:first') ).length) {
				
				if (next) {
					target = target.next();
				} else {
					target = target.prev();
				}
				
				link = target.find('a').attr('href');
				
			} else {		
				
				if (next) {
					link = pageList.find('#nextp').attr('href');
				} else {
					link = pageList.find('#prevp').attr('href');
				}
				
			}
			
		} else if($('div.dArrow, div.upArrow').length) {
			if (next) {
				target = $('div.dArrow a');
			} else {
				target = $('div.upArrow a');
			}
			link = target.attr('href');
		} 
		
		if (!isUndef(link) && link != '#') 
			location.href = link;
	}
	
	if (isUndef(nextFunc)) {
		nextFunc = function() {
				console('hotkey: next page');
				findPageAndGo(true);
			};
		prevFunc = function() {
				console('hotkey: prev page');
				findPageAndGo(false);
			};
	}
	
	/*
	 * Вешаю обработчики на клавиши
	 */
	 
	
	$(document).bind('keydown','Ctrl+left',prevFunc);
	$(document).bind('keydown','Ctrl+right',nextFunc);
	
}

// ########## Обработчик для «Мои друзья»
$('#myfriends').click(function(e) {
	if (e.ctrlKey && par['ctrlOnline']) {
		location.href='http://vkontakte.ru/friend.php?act=online';
		return false;
	}
});

// ########## Заголовок
if(par['invertTitle']) {
	nowFunc('invertTitle');
	document.title = document.title.split(' | ').reverse().join(' | ');
}

// ######### Пригласить всех
if(par['inviteAll'] && (pageIs('groups.php') || pageIs('events.php'))) {
	nowFunc('inviteAll');
	var menuItem = $('div.iPanel table tr[id^="friendtr"]:first');
	if(menuItem.length) {
	
		var action = "ge('toinvitemembers').innerHTML='';"
		$('div.iPanel table div[id^="friend"]').each(function() {
			var id = this.id.match(/([0-9]*)$/)[0];
			action += 'addToInvite('+id+');';
		});
		menuItem.clone().removeAttr('id').find('div').removeAttr('id').attr('onClick',action).text('Пригласить всех').wrapInner('<b>').end().insertBefore(menuItem);
		
	}
}
// ######### Покинуть граффити, Развернуть граффити
if(pageIs('graffiti.php') && GET['act'] == 'draw') {

	if (par['confirmGraffiti']) {
		nowFunc('confirmGraffiti');
		document.getElementsByTagName('body')[0].setAttribute('onbeforeunload','return "Возможно вы случайно закрываете эту вкладку. В случае закрытия ваше нарисованное граффити восстановить не удастся."');
	}
	
	if (par['expandGraff']) {
		nowFunc('expandGraff');
		
		var container = $('#flash_player_container');
		var flPlayer = $('#player');
		var offset = container.offset();
		var pageLayout = $('#pageLayout');
		
		/*
		 * Всё это шамантсво с предварительной заменой
		 * position на absolute  и последующим позиционированием обратно
		 * это подготовка к развёртыванию, потому что при смене position 
		 * flash-ролик обновляется и граффити сотрётся
		 */
		var expandBack = function() {
			container.css({
					position: 'absolute',
					top: offset.top,
					left: 0,
					width: '100%',
					height: '387px',
					backgroundColor: '',
					zIndex: -1
				})
				.parent().css('height','387px');
			flPlayer.css({
				height: '',
				width: '',
				marginLeft: 129
			});
			
			/*
			 * Подгатавливаем страницу, чтобы потом сжать её
			 * и избежать прокрутки
			 */
			
			pageLayout.css({
				overflow: 'hidden',
				height: ''
			});
			
			$('#expandBack').hide();
		}
		expandBack();
		
		/*
		 * Кнопка свёртывни
		 */
		$('<div>').css({
				position: 'fixed',
				top: '0px',
				right: '0px',
				overflow: 'auto',
				display: 'none',
				zIndex: 9999
			}).append(
				$('<div>').append( 
					$('<a>').css('font-weight','bold').attr('href','javascript:void(0)').text('Свернуть').click(expandBack)
				).css({
					borderLeft: '1px solid #777',
					borderBottom: '1px solid #777',
					padding: '1px'
				})
			).attr('id','expandBack').prependTo('body');
			
	
		$('<span>').css('float','right').append(
			$('<a>').attr('href','javascript:void(0);').text('Развернуть').click(function() {
				// Функция развёртывания

				container.css({
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundColor: 'white'
				});
				flPlayer.css({
					height: '100%',
					width: '100%',
					marginLeft: 0
				});
				
				pageLayout.css({
					height: '0px'
				});
				
				$('#expandBack').show();
				// конец
			})
		).prependTo('#header');
	}
}

// ######### Многострочный статус
if(par['multilineStatus'] && (pageIs('profile.php') || pageIs(/^id[0-9]*/))) {
	nowFunc('multilineStatus');
	var actTable = $('#activity_editor table');
	if(actTable.length > 0) {
	/*
	 * Перемещение ссылок «Удалить статус» и «Отмена» вправо. 
	 */
	actTable.find('td:last').find('nobr').appendTo( actTable.find('td:first').append('<br>') ).end().remove();
	actTable.find('td:first').append('<br><a href="#" id="setActivity">Установить</a>');
	$('#setActivity').click(function() {
		var val = $('#edit_activity_text').val();
		if (val == '')
			unsafeWindow.activity_editor.submit_activity_clear();
		else
			unsafeWindow.activity_editor.submit_activity_set(val);
		});
	var value = actTable.find('td:last div:first input').val();
	actTable.find('td:last div:first').html('<textarea id="edit_activity_text" class="inputtext" type="text" onblur="return activity_editor.blur();" name="edit_activity_text" style="background-position: center center;margin-bottom:0px;margin-right:0px;border-right:0px;"></textarea><a id="edit_activity_toggle" onclick="return false;" onmousedown="return activity_editor.toggle_menu(event);" href="#"> </a>').find('textarea').val(value)
		.css({
				display: 'inline',
				float: 'left',
				width: 201,
				height: 70
		}).end().find('a')
		.css({
				height: 73,
				backgroundPosition: '3px 68px',
				float: 'right',
				margin: '1px 0 0'
		});
	$('#edit_activity_select').css({
			width: 221
		})
		.find('a').css({
			width: 215
		});
	}
}

// ######### Замена пробелов в инпутах
var spacesFunc = function(e){
		if (e.keyCode != 32) return;	// если нажат не пробел, то делать тут нечего
		if ( !(
			(e.target.tagName == 'INPUT' && e.target.type == 'text') || e.target.tagName == 'TEXTAREA')
			) return;
		
		var form = e.target;
		
		var s = form.selectionStart;
		var end = form.selectionEnd;
		var lastScroll = form.scrollTop;
		var plus = 0;
		if (s<2) return;
		
		var text = form.value.substring(s-2,s);
		if (text == '  ') {
			text = '　';
			plus = 1;	// если произошла замена, то каретку надо сдвинуть на символ назад
		}
		
		/*
		 * Заменяем текст
		 * и переводим каретку в то-же место
		 */
		form.value = form.value.substr(0,s-2)+text+form.value.substring(s);
		form.selectionStart = s-plus;
		form.selectionEnd = end-plus;
		form.scrollTop = lastScroll;
		//form.value = form.value.replace(/  /g,'　');
	};
	if(par['longSpaces']) {
		nowFunc('longSpaces');
		/*
		 * Вешаем обработчик на весь документ потому, что
		 * на сайте есть динамичски создаваемые поля
		 */
		$(document).keyup(spacesFunc);
	}


// ######### Звуковое сообщение когда есть Новые комментарии

if (par['soundWhenNewComments']) {
	nowFunc('soundWhenNewComments');
	function newCommentsPlaySound() {
		console('play sound New Comments');
		playSound(resources.sound);
	}
	events.newComments.addHandler(newCommentsPlaySound);
}
nowFunc('end');
/*
//////////////////////////////////////////////////
}
//////////////////////////////////////////////////   end function go()
*/
function setSettingsTab(isactive) {
	var active = $('div.tBar li.activeLink');
	var inactive = $('div.tBar li:not(.activeLink):eq(0)').clone();
	var inactive_b = inactive.children('a').children('b').clone();
	var active_b = active.children('a').children('b').clone();
	var activeLink = active.find('a');
	var activeWidth = activeLink.css('width');
	var activeText = activeLink.text();
	var activeLink = activeLink.attr('href');

	function frmtMyTab(el,el_b) {
		return el.find('a').css('width','5em').attr('href','settings.php?act=vkPatch').text('vkPatch').prepend(el_b).end();
	}

	if (isactive) {
		frmtMyTab(active.clone(),active_b).appendTo('div.tBar ul');
		active.removeClass('activeLink').html( inactive.find('a').css('width',activeWidth).attr('href',activeLink).text(activeText).prepend(inactive_b) );
	} else {
		frmtMyTab(inactive.clone(),inactive_b).appendTo('div.tBar ul');
	}
}


// #############################################################################################
// ###
// ###									Новые сообщения
// ###
// #############################################################################################

//setNewMessCount(500);

// Получить кол-во новых сообщений из строки меню
function getMessCountFromPage() {
	var element = $('#sideBar a[href^="mail.php"] b');
	if (element.length != 0)
		return element.text();
	else
		return 0;
}
// Установить кол-во новых сообещний в меню
function setNewMessCount(num) {
	var messCount = $('#messageCount');
	
	if (messCount.length == 0) {		// строка не подготовлена к использованию
		$('#sideBar a[href^="mail.php"]')
			.find('b').remove().end()
			.append(' ')
			.append( 
				$('<span>').attr('id','messageCount').html('(<b id="messageCountNum"></b>)') 
			);
		
		messCount = $('#messageCount');
	}
	
	if (num == 0)
		messCount.hide();
	else
		messCount.show();
	
	$('#messageCountNum').text(num);
}

// #############################################################################################
// ###
// ###									Splash
// ###
// #############################################################################################
var lastVersion = getValue('vkVersion',0);
if (lastVersion < vkpathVersion || GET['vksplash']) {
	setValue('vkVersion',vkpathVersion);
	showSplash();
}

function showSplash() {
	var title = 'vkPatch '+vkpathVersion+' успешно установлен!';
	var text = '<img align="left" style="margin:5px 20px 0px 6px;" src="'+resources.bunny+'">Благодарю Вас за использование моего скрипта. vkPatch распространяется свободно, т.е. Вы его можете изменять и дополнять. Если Вы обнаружите в скрипте ошибку, пожалуйста, сообщите мне о ней любым удобным для вас способом: по почте <a href="mailto:pochemuto@gmail.com">pochemuto@gmail.com</a>, в блоге <a href="http://klinifini.livejournal.com">http://klinifini.livejournal.com</a> или по ICQ 172368044.<br><br>Если Вам понравился скрипт, пожалуйста, проголосуйте за меня на сайте, нажав кпопочку ниже. Спасибо.';
	showDialog(title,text,'Закрыть',hideBox,'Проголосовать за автора',function() {hideBox();location.href='http://vkontakte.ru/rate.php?act=vote&id=278966'});
	
}

// #############################################################################################
// ###
// ###										Функции
// ###
// #############################################################################################

/**
*
*  Распарсивание URI для получения аналога массива GET в PHP
*  с какого-то сайта, модифицированная по Windows-1251
*
**/
function parseGET(str){  

	var anchor = "";
	var GET = Array(); 
	
    var str = location.search.substring(1);
    if(str.indexOf('#')!=-1)    
    {    
        anchor = str.substr(str.indexOf('#')+1); 
        str = str.substr(0,str.indexOf('#'));
    }

    var params = str.split('&');
    for (i=0; i<params.length; i++)
    {
        var keyval = params[i].split('=');
        if (!isUndef(keyval[1]))
        	GET[keyval[0]]=win2unicode(unescape(keyval[1].replace(/\+/g,' ')));
    }
	return (GET); 
};
	
/**
*
*  Перекодировка из Windows-1251 в Unicode
*  http://xpoint.ru/know-how/JavaScript/PoleznyieFunktsii?38#EscapeSovmestimyiySRusskimiBuk
*
**/
function win2unicode(str) {
   var charmap   = unescape(
      "%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
      "%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
      "%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
      "%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")
   var code2char = function(code) {
               if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)
               if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)
               return String.fromCharCode(code)
            }
   var res = ""
   for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))
   return res
}

/**
*
*  Получение значения cookies
*  http://www.codenet.ru/webmast/js/Cookies.php
*
**/
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

// сериализация
function serialize(obj) {
	var result = '';
	if (isArray(obj)) {
		for (var i in obj) {
			if (isString(obj[i]) || isNumber(obj[i]) || isArray(obj[i]) || isBool(obj[i]))
				result += serialize(i)+serialize(obj[i]);
		}
		result = 'd'+result+'e';
		
	} else if (isNumber(obj)) {
		result = 'i'+obj+'e';
	} else if (isString(obj)) {
		result = obj.length+':'+obj;
	} else if (isBool(obj)) {
		result = 'b'+(obj ? '1':'0');
	}
	
	return result;
}
// десериализация
function unserialize(str) {
	if(isUndef(str) || str.length == 0)
		return;
		
	var pos = 0;
	function readNext() {
		var chr = str[pos];
		var result;
		pos++;
		switch (chr) {
			case 'd':
				result = Array();
				while (str[pos] != 'e') {
					result[readNext()] = readNext();
				}
				pos++;
			break;
			case 'i':
				result = '';
				while (str[pos] != 'e') {
					result += str[pos];
					pos++;
				}
				pos++;
				result = parseFloat(result);
			break;
			case 'b':
				result = (str[pos] == '1') ? true : false;
				pos++;
			break;
			default:
				result = '';
				len = chr;
				while (str[pos] != ':') {
					len += str[pos];
					pos++;
				}
				len = parseFloat(len);
				pos++;
				while (len > 0) {
					result += str[pos];
					pos++;
					len--;
				}
		}		
		return result;
	}
	return readNext();
}

/*
 * Добавление ссылки в боковое меню
 */
function addLinkToMenu(text,href) {
	if (pageIs('login.php'))
		return false;
	var el = $('#sideBar ol[id="nav"]:eq(1)');
	if (el.length == 0)
		el = $('<div>').addClass('moreDiv').append( $('<ol>').attr('id','nav').css('margin-bottom','0px') ).appendTo('#nav');
	
	var newLink = $('<a>').toggleClass('more').attr('href',href).text(text);
	
	$('#sideBar ol[id="nav"]:eq(1)').prepend($('<li>').append(newLink));
	return newLink;
}

//#################
//#################        Массивы
//#################
// рекурсивное сравнение друх массивов
function arrayCompare(arr1,arr2) {
	if (isUndef(arr1) && isUndef(arr2))
		return true;

	if (isUndef(arr1) || isUndef(arr2))
		return false;

	if (arr1.length != arr2.length)
		return false;
	
	for (var i=0;i<arr1.length;i++) {
		if (isUndef(arr2[i]))
			return false;
		if (!compareObj(arr1[i],arr2[i]))
			return false;
	}
	return true;
}
// Поиск ключа соотв. элементу массива
function findArray(arr,obj) {
	for (var i=0;i<arr.length;i++) {
		if (compareObj(arr[i],obj,true))
			return i;
	}
	return -1;
}
// Существование элемента в массиве
function existsArray(arr,obj) {
	if (findArray(arr,obj) > -1)
		return true;
	else
		return false;
}
// сравнение двух объектов
// lite - не жесткое соответствие типов
function compareObj(obj1,obj2,lite) {
	lite = lite || false;
	if (typeof(obj1) != typeof(obj2) )
		if (!lite || (!isNumber(obj1) && !isString(obj1)) || (!isNumber(obj1) && !isString(obj1)))
			return false;
	if (typeof(obj1) == 'object' && obj1.toString() != obj2.toString()) {
		return false;
	}
	if (isArray(obj1)) {
		if (!arrayCompare(obj1,obj2))
			return false;
	} else if (obj1 != obj2)
		return false;
	
	return true;
}
function subtractArray(arr1,arr2) {
	result = arr1;
	var result = new Array();
	if (arrayCompare(arr1,arr2))
		return new Array();
	
	if (isUndef(arr2))
		return arr1;
	
	if (isUndef(arr1)) 
		return new Array();
	
	for (var i=0;i<arr1.length;i++) {
		if (!arr2.exists(arr1[i])) {
			result.push(arr1[i]);
		}
	}
	return result;
}
//#################
//#################        showDialog
//#################
//showDialog('[[TITLE]]','[[MESSAGE]]','[[BUTT 1]]',function() {hideBox();alert('OK')},'[[BUTT 2]]',hideBox);
function showDialog(title,message,butt1_label,butt1_func,butt2_label,butt2_func,width) {
	console('show box, title: '+title);
	butt1_func = butt1_func || hideBox;
	butt2_func = butt2_func || hideBox;
	
	
	width = width || 400;
	var butt2='';
	if (!isUndef(butt2_label)) {
		butt2 = $('<table align="right"><tbody><tr><td>' +
				'<div onmouseout="b2(this)" onmouseover="b2_hover(this)" class="button2" id="button2Cont">' +
				'<div class="button2Line"><div id="button2">' +
				butt2_label +
				'</div></div></div></td></tr></tbody></table>');
	}
	
	left = getLeftBoxPos(width);
	var boxHolder = $('#boxHolder');
	boxHolder.hide();
	boxHolder.empty();
	$('<div style="display:block;left: '+left+'px; top: 60px;opacity: 1;" id="boxFader"><div id="boxWrap" style="width: '+width+'px;"><div id="boxBody" style="display: block;"><div id="nameLabel"><div id="boxTitle">'+
		title+
		'</div></div><div id="boxMessage">'+
		message+
		'</div><div class="buttons"><table align="right"><tbody><tr><td><div onmouseout="b1(this)" onmouseover="b1_hover(this)" class="button1" id="button1Cont"><div class="button1Line"><div id="button1">'+
		butt1_label+
		'</div></div></div></td></tr></tbody></table></div></div></div><iframe style="display: none; width: 1000px; height: 1000px;" id="boxGoodFrame_vkpatch"/></div>')
		.find('div.buttons').append(butt2).end().appendTo(boxHolder);
	
	boxHolder.find('div[id="button1Cont"]').click(butt1_func);
	boxHolder.find('div[id="button2Cont"]').click(butt2_func);

	
	boxHolder.show();
	loadScript('http://vkontakte.ru/js/box.js');
	loadScript('http://vkontakte.ru/js/box2.js');	
	loadCSS('http://vkontakte.ru/css/box.css');
}
$(window).resize(function() {
	var boxFader = $('#boxHolder div[id="boxFader"]');
	if (boxFader.length) {
		var width = parseInt(boxFader.css('width'));
		boxFader.css('left',getLeftBoxPos(width));
	}
});
function getLeftBoxPos(width) {
	// из js/box.js
	var sctop = 0;
	var fw = 0, fh = 0;
	var left,top;
	if (self.innerWidth)
	{
		fw = self.innerWidth;
		fh = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
	{
		de = document.documentElement;
		fw = de.clientWidth;
		fh = de.clientHeight;		
		sctop = document.documentElement.scrollTop;		
	}
	// end
	return fw / 2 - width / 2;
}

function hideBox() {
	console('close box');
	faderTimer = setInterval(fadeBox( $('#boxHolder div[id="boxFader"]').get(0) ), 5);
	fadeBox($('#boxHolder div[id="boxFader"]').get(0));
	return false;
}
function fadeBox(boxfader) {
	return function() {
	if (boxfader.style.opacity <= 0.0) {
		$('#boxHolder div[id="boxFader"]').hide();
		$('#boxHolder div[id="boxGoodFrame"]').hide();
		clearInterval(faderTimer);
		faderTimer = 0;
	}
	boxfader.style.opacity = boxfader.style.opacity - 0.08;
	boxfader.style.filter = 'alpha(opacity='+boxfader.style.opacity*100+')';		
	}	
}
	
// очистка строки от припадков 	
function clearString(str) {
			return str.replace(/<br>/g,'')	
			.replace(/\s+/g,' ')
			.replace(/([,.!?]) \1/,'$1')
			.replace(/([^0-9])([,.!?])(?=[^ ,.!?])/g,'$1$2 ')
			.replace(/([^a-zA-Z0-9а-яА-ЯёЁ])(?:\1+)/g,'$1')
			.replace(/[^a-zA-Z0-9а-яА-ЯёЁ(),.!?%№\-+|\\\/ ]+/g,'')
			.replace(/^\s+/g,'')
			.replace(/ $/g,'');
}	
// Преобразование в верхний регистр первых букв каждого слова в предложении кроме однобуквенных слов
function fUpper(str) {
	var words = str.split(' ');
	for (j in words) {
		if (words[j].length > 1) { 
			words[j] = words[j].substr(0,1).toLocaleUpperCase()+words[j].substr(1).toLocaleLowerCase();
		} 
	}
	return words.join(' ');
}


/*
function setValue_s(name,value) {
	setStack('GM_setValue',name,value);
}

function setStack(func) {

	var tmp = {func: '',args: ''};
	var args = new Array();

	for(var i=1;i<arguments.length;i++) {
		args.push(arguments[i]);
	}
	tmp.func = func;
	tmp.args = args;
	
	stack.push(tmp);
	
}
function checkStack() {
	if (stack.length == 0) return;
	for(var i=0;i<stack.length;i++) {
		var func;
		if (typeof(stack[i].func) == 'string')
			func = eval(stack[i].func);
		else
			func = stack[i].func;
		console('call func from stack “'+stack[i].func+'('+stack[i].args.join(',')+')”');
		
		func.apply(null ,stack[i].args);
	}

	stack = [];
}	
*/


function setValue(name,value) {
	par[name] = value;
	window.setTimeout(function(name,value){
			//console('save value '+name+'='+value);
			if (typeof(value) == 'number')
				value = value.toString();
							
			GM_setValue(name,value);

	},0,name,value);
}


//#################
//#################        События
//#################
// Обработчики для событий стены
function setWallHandlers() {
	/*
	var arrows = $wall.find('div.dArrow a').add(
			$wall.find('div.upArrow a')
		).unbind('click',events.turnWallPageBegin.raise).one('click',events.turnWallPageBegin.raise);
		*/
}

function waitChangingWall(func) {
	
	return waitChanging(func,'events.wallChanged.raise()','events.changingWall.raise()','$wall.find(\'div[id="fBox2"]\')');	
	
	/*
	var fn = new Function("function fn(){GLOBAL['whenWallChangeArray']['" + name + "']();events.wallChanged.raise()};events.changingWall.raise();$wall.find('div[id=\"fBox2\"]').whenChange(fn)");
	return fn;
	*/
}

function waitChangingComments(func) {
	return waitChanging(func,'events.commentsChanged.raise()','events.changingComments.raise()','$("#videocomment,#photocomment")');	
}

function waitChanging(func,changed,changing,obj) {
	GLOBAL['whenChangeCount'] = GLOBAL['whenChangeCount'] || 0;
	GLOBAL['whenChangeArray'] = GLOBAL['whenChangeArray'] || Array();
	GLOBAL['whenChangeCount']++;
	name = 'fn'+GLOBAL['whenChangeCount'];

	if(isUndef(func))
		func = function() {void(0)};

	GLOBAL['whenChangeArray'][name] = func;
	
	var fn = new Function("function fn(){GLOBAL['whenChangeArray']['" + name + "']();" + changed + "};" + changing + ";" + obj + ".whenChange(fn)");
	return fn;
}


// Хук клика по документу
function documentClickHook(e) {
	var el = e.target;
	var button = e.button;
	if (button == 2) return;
	
	if (el.parentNode.className  == 'upArrow' || el.parentNode.className == 'dArrow')	// переход на след страницу на стене
		events.turnWallPageBegin.raise();
	
	if(/^javascript:(\s|%20)*deletePost\(/.test(el.parentNode.href)) 
		events.deleteWallMessage.raise();
	
	if(/^javascript:(\s|%20)*getPageContent\(/.test(el.href)) 
		events.turnCommentsPageBegin.raise();
	
	if (/^javascript:(\s|%20)*restorePost\(/.test(el.href))
		events.restoreWallMessage.raise();
		
	if (/comments\.deleteComment/.test(el.parentNode.onclick) ||
		/^javascript:(\s|%20)*deleteComment/.test(el.parentNode.href))
		events.deleteComment.raise();
	
	if (/comments\.restoreComment/.test(el.onclick) ||
		/^javascript:(\s|%20)*restoreComment/.test(el.href))
		events.restoreComment.raise();	
}

//#################
//#################        Параметры
//#################

// Добавление параметра
// addParam('example').isFloat().max(3).ok();
// addParam('example').min(4).max(8).ok();
// addParam('example').def('nothings').ok();
function addParam(name) {
	var a = {
		name: '',
		arr: new Array(),
		isFloat: function() {this.arr['isFloat'] = true;return this;},
		def: function(defval) {this.arr['default'] = defval;return this;},
		min: function(min) {this.arr['min'] = min;return this;},
		max: function(max) {this.arr['max'] = max;return this;},
		inSett: function(title,desc) {this.arr['title'] = title;this.arr['desc'] = desc;this.arr['cat'] = GLOBAL['nowCategory'];return this;},
		ok: function() {params[this.name] = this.arr;}
	};
	a.name = name;
	a.arr['isFloat'] = false;
	a.arr['default'] = true;
	return a;
}
function newCategory(title) {
	isUndef(GLOBAL['nowCategory']) ? GLOBAL['nowCategory'] = -1 : void(0);
	isUndef(GLOBAL['categories']) ? GLOBAL['categories'] = new Array() : void(0);
	GLOBAL['nowCategory']++;
	GLOBAL['categories'].push(title);
}
// Читаем параметры из GET и сохраняем в памяти
// arr - массив описаний параметров
function setParams(arr) {
	for (var name in arr) {
		if (typeof(arr[name]) == 'function')	continue;		// в массивах теперь есть и функции
		if (isUndef(arr[name])) continue;					// в опере появляются какие-то бредовые элементы
		if (isUndef(arr[name]['title'])) continue;			// пропускаем параметры, которые не в настройках

		if (isBool(arr[name]['default'])) {
			
			if (!isUndef(GET['vkpatch_save'])) 
				setValue(name,GET[name]?true:false);
			
		} else {

			// число
			var tmpValue = GET[name];
			if (arr[name]['default'] == '' && GET[name] == '') {
				tmpValue = '';
			} else if ( !isUndef(arr[name]['min']) || !isUndef(arr[name]['max']) ) {
				if (arr[name]['isFloat'])
					tmpValue = parseFloat(tmpValue);
				else
					tmpValue = parseInt(tmpValue);
				
				if (isNaN(tmpValue)) {
					tmpValue = arr[name]['default'];
				}
				if (!isUndef(arr[name]['min']) && tmpValue < arr[name]['min']) {
					tmpValue = arr[name]['min'];
				}
				if (!isUndef(arr[name]['max']) && tmpValue > arr[name]['max']) {
					tmpValue = arr[name]['max'];
				}	
			}
			if (arr[name]['isFloat'] && GET[name] != undefined)
				tmpValue = tmpValue.toString();
			
			if (!isUndef(GET[name])) 
				setValue(name,!isUndef(tmpValue)?tmpValue:arr[name]['default']);
						
		}
	}
}
// Читаем параметры из памяти
// arr - массив описаний параметров
function getParams(arr) {
	var tmpValue;
	for (var name in arr) {
		if (typeof(arr[name]) == 'function')	continue;		// в массивах теперь есть и функции
		if (isUndef(arr[name])) continue;					// в опере появляются какие-то бредовые элементы
		
		tmpValue = getValue(name,arr[name]['default']);	
		if (arr[name]['isFloat'])
				tmpValue = parseFloat(tmpValue);
		par[name] = tmpValue;
	}
}

// Чтение и запись значения в память (обертки)
function getValue(name,def) {
	if(typeof(GM_getValue) == 'undefined') return def;
	return GM_getValue(name,def);
}
/*
function setValue(name,value) {
	if (isUndef(GM_setValue)) return;
	GM_setValue(name,value);
}*/
// На странице?
function pageIs(find) {
	if (find instanceof RegExp)
		return find.test(here_page);
	else
		return here_page.indexOf(find) == 0;
}
// Подключение скрипта
function loadScript(url) {
	var js = document.createElement('script');
	js.src = url;
	$head.appendChild(js);
}

// Воспроизвести звук
function playSound(file,volume) {
	volume = volume || 100;
	$sound.html("<EMBED SRC='"+file+"' autostart='true' enablejavascript='true' hidden='true' volume="+volume+" MASTERSOUND>");
}

// Подключение стилей
function loadCSS(url) {
	$head.innerHTML += "<link rel='stylesheet' href='"+url+"' type='text/css'>";
}

// Обозначает начало выполнения функции
function nowFunc(fname) {
	
	if (!end_static_functions) {
		setValue('lastFunction',fname);
	}
	
	if (fname !== 'end') 
		console('func: '+fname);
	else {
		end_static_functions = true;	// закончилось вполнение статических операций
		console('end of static script');
	}
	

}
// Проверка корректного завершения скрипта в прошлый раз
function checkLastFunc() {
	var lFuncName = getValue('lastFunction','end');
	if (lFuncName == 'end')
		return true;
	else if( isUndef(params[lFuncName]) ) {
		alert('В прошлый раз выполнение скрипта vkPatch завершилось при выполнении операции «'+lFuncName+'»\nПожалуйста, сообщите об этой ошибке разработчику.')
	} else if(confirm('В прошлый раз выполнение скрипта vkPatch завершилось на функции «'+params[lFuncName]['title']+'».\nОтключить это функцию?')) {
			setValue(lFuncName,false);
			par[lFuncName] = false;
	}
}
/**
*
*  Получение значения cookies
*  http://www.codenet.ru/webmast/js/Cookies.php
*
**/
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

// Получить файл. Не использую $.get(), потому что вызывается в другом контексте
function simpleGet(url,callback,errorBack) {
	function ok() {

			try {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						callback(xmlhttp.responseText);
					} else {
						if (errorBack != undefined)
							errorBack(xmlhttp);
	        		}
	    		}
	  		} catch( e ) {
	  			if (errorBack != undefined)
	  				errorBack(xmlhttp);
	  		}
	}
	var xmlhttp = getXMLhttp();
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = ok;
	xmlhttp.send(null);
}
// получить xmlhttp. Пока только для FF
function getXMLhttp() {
	return new XMLHttpRequest();
}

// Вызвать событие при изменении содержимого
function whenChange(element,func) {
	element = $(element);
	oldContent = element.html();
	
	function checkChanges() {
		console('check changes for #'+element.attr('id'));
		if (oldContent != element.html()) {
			func(element);
			clearInterval(checkChangesInterval);
		}	
	}
	
	var checkChangesInterval = setInterval(checkChanges,500);
}

// Девелоперский алерт;
function aalert(message,name) {
	var maxAlerts = 10;	// максимально количество сообщений, всплывающих подряд
	var timeOut = 1000;	// максимальный промежуток, чтобы сообщения считались идущими подряд
	
	aalert_lastAlertTime = aalert_lastAlertTime || 0;
	
	
	if (elapsedTime(aalert_lastAlertTime) < timeOut)
		aalert_count++;
	else {
		aalert_count = 0;
		aalert_freeze = false;
	}
	
	if (aalert_freeze) {aalert_lastAlertTime = nowTime(); return;}
	
	if (aalert_count >= maxAlerts) {
		if (!confirm('Продолжить показ алертов?')) {
			aalert_freeze = true;
		} else
			aalert_count = 0;
	}
	if (aalert_count < maxAlerts) {
		if (isArray(message))		// преобразуем массив
			message = message.toString();
		
		if (name != undefined) {
			message = "{ "+name+" }\n"+message;
		}
		__alert(message);
	}
	
	aalert_lastAlertTime = nowTime();
}

// Повтор строки
function strRepeat(str,n) {
	var s = '';
	while (n > 0) {
		s += str;
		n--;
	}
	return s;
}

// Преобразовывает многомерный массив в строку
function formatArray(arr,level) {
	if (isUndef(level)) {
		level = 0;
	}
	var str="";
	for (var key in arr) {
		if (isArray(arr[key])) {
			str += "\n"+strRepeat("\t",level)+"["+key+"]: "+formatArray(arr[key],level+1);
		} else {
			if (isArray(arr[key]) || isNumber(arr[key]) || isBool(arr[key]))
				str += "\n"+strRepeat("\t",level)+"["+key+"]: "+arr[key];
			if (isString(arr[key]))
				str += "\n"+strRepeat("\t",level)+"["+key+"]: \u201C"+arr[key]+"\u201D";
		}
	}
	if (level == 0) {
		str = str.substr(1);
	}
	return str;
}

function isArray(obj) {
	return (typeof(obj) == 'object' && obj instanceof Array);
}
function isString(obj) {
	return (typeof(obj) == 'string');
}
function isNumber(obj) {
	return (typeof(obj) == 'number');
}
function isBool(obj) {
	return (typeof(obj) == 'boolean');
}
function isUndef(obj) {
	return (typeof(obj) == 'undefined');
}
// Прошло миилсекунд с old по now
function elapsedTime(old,now) {
	now = now || nowTime();
	return (now - old);
}
// Добавление текста в консоль
function console(txt) {
	GLOBAL['consoleTxt'].append((new Date()).toLocaleTimeString()+' | '+txt+"\n");
	var consoleTXTBody = document.getElementById('consoleTXTBody');
	if (consoleTXTBody !== null)
		consoleTXTBody.scrollTop = consoleTXTBody.scrollHeight;
}

// Инициализация консоли
function initConsole() {
		// Создаем консоль
		$('<div style="display:block;position:fixed;z-index:9999;cursor:pointer;width: 15px;height: 15px;" id="vkShowConsole"></div><div style="overflow:auto;border: 1px dotted black;border-color: black; border-width: 1px; color: black; font-family: monospace, sans-serif, courier; font-size: 8pt; opacity: 0.9; z-index: 10000; background-color: rgb(239, 239, 239); display: none; position: fixed;" id="vkPatchConsole"><div style="float: right; margin-right: 8px;"><a id="vkHideConsole" href="javascript: void(0)">x</a> </div><div style="float: left; margin-left: 5px;"><a onclick="document.write(\'<pre>\'+document.getElementById(\'ConsoleTXT\').innerHTML+\'</pre>\')" href="javascript: void(0)" title="Развернуть">□</a></div><div class="vkConsoleTitle" style="cursor: default;font-weight: bold;text-align:center">vkPatch консоль</div><div style="overflow:auto;width: 500px;height: 400px;background-color: rgb(253, 253, 253);" id="consoleTXTBody"><pre id="ConsoleTXT"></pre></div></div>')
		.prependTo($body);
		
		
		var toggleConsole = function() {
			$('#vkPatchConsole').toggle();
			setValue('consoleActive',$('#vkPatchConsole:hidden').length==0);
			return false;
		}
		
		$(document).bind('keydown','f9',toggleConsole);
		$('#vkShowConsole').dblclick(toggleConsole);
		$('#vkHideConsole').click(toggleConsole);
		
		$('#vkPatchConsole').bind('dragstart',function( event ){
				$('#vkPatchConsole').css('opacity','1');
                return $(event.target).is('.vkConsoleTitle');
                })
        	.bind('drag',function( event ){
        		var _top = event.offsetY-document.documentElement.scrollTop;
        		var _left = event.offsetX-document.documentElement.scrollLeft;
        		_top = (_top >= 0) ? _top : 0;
        		_left = (_left >= 0) ? _left : 0;
                $( this ).css({
                        top: _top,
                        left: _left
                        });
                })
			.bind('dragend',function( event ){
				var cons = $('#vkPatchConsole');
				cons.css('opacity','0.9');
                setValue('consoleTop',cons.css('top'));
                setValue('consoleLeft',cons.css('left'));
                });
        if (par['consoleActive'])
        	$('#vkPatchConsole').show();
        
        $('#vkPatchConsole').css({
				top: par['consoleTop'],
				left: par['consoleLeft']
			});
		
}

// Возвращает текущее время (милисек)
function nowTime() {
	return (new Date().getTime());
}

// На странице требуется ввод пароля
function notAuthOnPage(page_content) {
	return ($('form[id="login"]',page_content).length > 0);
}
