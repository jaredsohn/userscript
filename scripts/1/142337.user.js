// ==UserScript==
// @name        zhwmDailyNews
// @namespace   z
// @include     http://www.heroeswm.ru/home.php
// @description HWMDaily news at homepage
// @version     1.11
// ==/UserScript==


var maxstringlength = 25;
var SUC_script_num = 135387; 
_GM_init();try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('zwt_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('zwt_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('zwt_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('zwt_target_script_name', script_name);if (remote_version > local_version){if(confirm('Есть обновление для скрипта "'+script_name+'."\nПерейти к странице обновления?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('zwt_current_version', remote_version);}}else if (forced)alert('Нет обновлений для скрипта "'+script_name+'."');}else GM_setValue('zwt_current_version', remote_version+'');}});}catch (err){if (forced)alert('Ошибка проверки обновления:\n'+err);}}}GM_registerMenuCommand(GM_getValue('zwt_target_script_name', 'zhwmguidNews') + ' - Проверить наличие обновлений', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var topics = {};topics["1"] = {title:"Новости", link:"hhttp://hwmguide.ru/articles/lenta-heroeswm/"};topics["2"] = {title:"Горячие новости", link:"http://hwmguide.ru/articles/lenta-heroeswm/?page=1#comm"};topics["3"] = {title:"Зеркало", link:"http://hwmguide.ru/articles/lenta-heroeswm/?page=1#comm"};

var els = getI( "//td[@width=290 and @rowspan=2]" ) ;
if (els.snapshotLength == 1) {
	el = els.snapshotItem(0);
	divOuter = document.createElement( 'div' );
	divOuter.setAttribute( 'style' , 'margin: 8 auto; padding: 10px; overflow: hidden; width: 86%;' );
	divOuter.innerHTML += '<span id="switcher" opened="1" style="cursor: pointer"></span>&nbsp;<a href="http://hwmguide.ru/"><center style="display: inline"><h2 style="display: inline;font-size: 12px; font-weight: bold;">Геройская новостная лента</h2></center></a><br/>';
	divInner = document.createElement( 'div' );
	divInner.innerHTML = getwheelimg() +'&nbsp;&nbsp;Загрузка списка новостей...';	
	divOuter.className="wblight";
	divOuter.appendChild(divInner);
	el.appendChild(divOuter);
	var switcher = document.getElementById('switcher');
	switcher.addEventListener
	(
		"click" ,
		function( event )
		{
			var d = 1-Number(switcher.getAttribute("opened"));
			GM_setValue( "hwmdsw", d );
			flick(d);
		},
		false
	);
	flick(GM_getValue( "hwmdsw", 1 ));
	
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function flick(opened) {
	if (opened != 1) {
		switcher.innerHTML = "(+)";
		divInner.style.display = "none";
		switcher.setAttribute("opened", "0");
	} else {
		do_req();
		switcher.innerHTML = "(-)";
		divInner.style.display = "block";
		switcher.setAttribute("opened", "1");
	}
}
function _GM_init() {
	if (typeof GM_deleteValue == 'undefined') {
		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}
		GM_registerMenuCommand = function(name, funk) {;}
		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
}
function trimming(string, l) {
	var s = string;
	if (string.length > l) {
	for (var i = l; i >=0; i--)
		if (string.charAt(i) == ' ')
			s = string.substr(0, i)+'...';
	s = string.substr(0, l)+'...';
	}
	return s.replace(/&[^#]/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
;}
