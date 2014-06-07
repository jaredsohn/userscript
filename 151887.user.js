// ==UserScript==
// @name           ikariam test
// @version        0.0.2
// @date           2012-11-06
// @author         denis.omsk@bk.ru 
// @description    Test script
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.6/jquery-ui.min.js
//
// @include        http://s*.ru.ikariam.com/index.php*
// ==/UserScript==

var simv=jQuery.noConflict();
simv(document).ready(function()
{
	simv("#js_CityPosition0Link").click(function()
	{
		simv('<div id="divBut"><input class="button" title="" id="" value="Добавить в очередь на постройку" type="submit"></div>').appendTo("#city");
		simv("#divBut").css({"top":"410px","left":"100px","position":"relative","z-index":"9999999999999"});
	}
);
});