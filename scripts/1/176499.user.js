// ==UserScript==
// @name        AddFilter
// @namespace   http://d.hatena.ne.jp/ku__ra__ge/
// @include     http://www.loglesslove.net/pad_status/
// @include     http://www.loglesslove.net/pad_material/
// @include     http://www.loglesslove.net/pad_graph/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// ==/UserScript==

$("#input_area").prepend("filter:<input id='monsterFilter'><br>").keyup(function(){
	var filterString = $("#monsterFilter").val();
	$("#monster option, #monster1 option, #monster2 option").each(function(){
		if ($(this).text().match(filterString)) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
});

