// ==UserScript==
// @name           DelGameButton
// @namespace      klavogonki
// @include        http://klavogonki.ru/g/*
// @author         Fenex
// @version        2.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function checkFinished(youid) {
	if(game.players[youid].info.finished!=false) {
		clearInterval(fnxtm);
		var el = document.getElementById('place'+youid);
		if ((game.params.competition!=0)&&(game.params.competition!=null)) {
			var str = document.createElement('div');
			str.setAttribute('class', 'delresult');
			str.innerHTML = ' <a original-title="Отменить результат (только для Премиум)" href="javascript:game.delresult();"><img src="/img/delete-16.gif"></a>';
			el.parentNode.insertBefore(str, el.nextSibling);
		}
	}
}
function chek_game() {
	if((game.params)&&(game.players)) {
		clearInterval(fnxtm);
		var youid;
		for(i=0;i<game.players.length;i++) {
			if((game.players[i].you=='you')||(game.players[i].you==true)) {
				youid = game.players[i].info.id;
				break;
			}
		}
		fnxtm = setInterval('checkFinished('+youid+')', 1000);
	}
}
var s = document.createElement('script');
s.innerHTML = chek_game+checkFinished+"var fnxtm = setInterval('chek_game()', 1000);";
document.body.appendChild(s);