// ==UserScript==
// @name           Fixdapプロジェクトのタスク件数を表示:
// @namespace      http://masao.jpn.org
// @description    Fixdapに登録されているタスク一覧の残り件数を表示する:
// @include        http://fixdap.com/p/*/
// ==/UserScript==
(function(){
	//Fetch the table element.
	var tables = document.getElementsByTagName( "table" );
	var tasklist = tables[0];
	//Process if the table is available.
	if(tasklist){
		if (tasklist.hasAttribute( "class" ) && tasklist.getAttribute( "class" ) == "tasklist") {
			rows = tasklist.getElementsByTagName( "tr" );
			//Create HTML elements.
			var trHTML = '<tr><td colspan="2" style="text-align:left"><strong>'+ ( rows.length - 1 ) +'件 表示します</strong></td></tr>';
			tasklist.innerHTML = trHTML + tasklist.innerHTML;
		}
	}
})();

