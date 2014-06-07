// ==UserScript==
// @name             RGD2M [GW]
// @namespace        VSOPGW
// @description      Удобная продажа ргд2м
// @include          http://*ganjawars.ru/items.php*
// @version          1.0
// @author           VSOP_juDGe
// ==/UserScript==

(function() 
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
	
	var bRgd = doc.createElement("b");
	bRgd.innerHTML = '<input type="button" name="bRgd" value="Эконом" id="bRgd" onclick = "">';
	td.insertBefore(bRgd, a);

	// Поищем грены
	var aRgd = $A(tlist[7].getElementsByTagName("a")).find(function(a) { return a.href.indexOf('item.php?item_id=rgd2m') > 0; });
	
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
		sellstring = sellstring.replace(/item_[0-9][0-9]?_td/, 'bRgd');
		sellstring = sellstring.replace('return false;','var aa = document.getElementsByTagName(\'a\'); for(var i=0; i<aa.length; i++) {if(aa[i].href == \'javascript:run_sell_submit()\') aa[i].focus();} return false;')

		bRgd.childNodes[0].setAttribute('onclick',sellstring);
	}
	
	bRgd.childNodes[0].focus();
})();