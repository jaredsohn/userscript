// ==UserScript==
// @name             RGK3
// @namespace        VSOPGW
// @description      Удобная продажа ргк3
// @include          http://*ganjawars.ru/items.php*
// @version          1.0
// @author           VSOP_juDGe (модифицированно pestO)
// ==/UserScript==

(function rgk3() 
{
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var doc = root.document;
	var $ = root.$;
	var $A = root.$A;
	
	var tlist = $("itemsbody").getElementsByTagName("table");
	
	// Вставим кнопку
	var alist = tlist[3].getElementsByTagName("a");
	var a = $A(alist).find(function(a) { return a.innerHTML == "Комплекты"; });
	var td = a.parentNode;
	
	//добавляю галочку для цикла (pest)
	var p=document.createElement('input')
	p.id = 'rgk3_mfilter'
	if(getCookie('is_ch_rgk')=='true')
		p.checked=true;
	p.addEventListener("click", f_click_rgk3, false)
	p.setAttribute('TYPE','checkbox')

	var bRgd = doc.createElement("b");
	bRgd.innerHTML = '<input type="button" name="bRgk" value="Продать РГК-3" id="bRgk" onclick = "">'
	td.insertBefore(bRgd, a)
	//галку до кнопки
	td.insertBefore(p, a)

	// Поищем грены
	var aRgd = $A(tlist[7].getElementsByTagName("a")).find(function(a) { return a.href.indexOf('item.php?item_id=rkg3') > 0; });
	
	if(aRgd == null)
	{
		bRgd.childNodes[0].setAttribute('disabled','disabled');
	}
	else // Нашли
	{
		var alist = aRgd.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName("a");
		var a = $A(alist).find(function(a) { return a.innerHTML == "Продать"; });
		if(a == null)
			a = $A(aRgd.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName("a")).find(function(a) { return a.innerHTML == "Продать"; });
		
		var sellstring = a.getAttribute('onclick');
		sellstring = sellstring.replace(/item_[0-9][0-9]?_td/, 'bRgk');
		sellstring = sellstring.replace('return false;','var aa = $A($(\'js_window\').getElementsByTagName(\'a\')).find(function(a) { return a.innerHTML == \'<b>Да</b>\'; }); run_sell_submit() ;return false;')
		bRgd.childNodes[0].setAttribute('onclick',sellstring);
		//если стоит галочка продать к чертям собачим =)
		if(document.getElementById ( 'rgk3_mfilter' ).checked==true)
			{
			document.getElementById("bRgk").click()
			}
	}
	
	bRgd.childNodes[0].focus();
})();

//ф-ция обарботки нажатия галки
function f_click_rgk3()
{
var q = document.getElementById ( 'rgk3_mfilter' );
setCookie('is_ch_rgk',q.checked,'','','','')
}

function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
//для кукей
function getCookie(name) {
try
{
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
	if(setStr == null) return 'false'
	return setStr;
}
catch(err) { return 'false' }
}