// ==UserScript==
// @name           hatebu2_entry_cleaner
// @namespace      http://d.hatena.ne.jp/y-kawaz/20081130/1228049312
// @version        1.2
// @author         y-kawaz
// @description    はてブの閲覧済みエントリを隠す
// @include        http://b.hatena.ne.jp/
// @include        http://b.hatena.ne.jp/entrylist*
// @include        http://b.hatena.ne.jp/hotentry*
// ==/UserScript==
(function(){
var storage = window.localStorage || window.globalStorage[location.hostname] || unsafeWindow.globalStorage[location.hostname];
var visitedColor = 'rgb(136, 51, 136)';
var delclick = function(e) {
	var li = e.target.parentNode.parentNode.parentNode;
	li.className += ' deleted';
	li.style.display = 'none';
	storage.deleted_entries += e.target.parentNode.getElementsByClassName('entry_link')[0].href + "\n";
	e.target.style.color = 'red';
};
var linkclick = function(e) {
	var li = e.target.parentNode.parentNode.parentNode;
	li.className += ' visited';
	li.style.display = document.getElementById('hide_visited').checked ? 'none' : '';
};
var hideEntries = function() {
	var hide_visited = document.getElementById('hide_visited').checked;
	var hide_deleted = document.getElementById('hide_deleted').checked;
	var el = document.getElementsByClassName('entry_li');
	for(var i=0; i<el.length; i++) {
		var classes = el[i].className.split(/\s+/);
		el[i].style.display = ((hide_visited && 0 <= classes.indexOf('visited')) || (hide_deleted && 0 <= classes.indexOf('deleted'))) ? 'none' : '';
	}
};
var init = function() {
	//削除リストのクリーンナップ(直近500件を残す)
	if(!storage.deleted_entries) storage.deleted_entries = '';
	var dels = storage.deleted_entries.value.split(/\n+/);
	dels = dels.slice(Math.max(dels.length-500, 0));
	storage.deleted_entries = dels.join("\n");
	//エントリーリスト改造
	var entries = document.getElementsByClassName('entry-body');
	for(var i=0; i<entries.length; i++) {
		var entry = entries[i];
		var entry_li = entry.parentNode;
		entry_li.className += ' entry_li';
		entry_li.style.marginBottom = 0;
		var link = entry.getElementsByTagName('h3')[0].getElementsByTagName('a')[0];
		link.className += ' entry_link';
		link.addEventListener('click', linkclick, true);
		//既読をマーク
		if(document.defaultView.getComputedStyle(link, null).getPropertyValue('color') === visitedColor) {
			entry_li.className += ' visited';
		}
		//削除済みをマーク
		if(0 <= dels.indexOf(link.href)) {
			entry_li.className += ' deleted';
		}
		//削除ボタン作成
		var del = document.createElement('a');
		del.href = 'javascript:void(0)';
		del.appendChild(document.createTextNode('  [X]'));
		del.addEventListener('click', delclick, true);
		del.style.color = (0 <= dels.indexOf(link.href)) ? 'red' : '';
		entry.getElementsByTagName('h3')[0].insertBefore(del, entry.getElementsByTagName('h3')[0].firstChild);
	}
	//トグルボタン作成
	var div = document.createElement('div');
	div.innerHTML += " <label><input type='checkbox' id='hide_visited' checked='checked'>HideVisited</label>";
	div.innerHTML += " <label><input type='checkbox' id='hide_deleted' checked='checked'>HideDeleted</label>";
	div.getElementsByTagName('input')[0].addEventListener('change', hideEntries, true);
	div.getElementsByTagName('input')[1].addEventListener('change', hideEntries, true);
	var ul = document.getElementsByClassName('entry_li')[0].parentNode;
	ul.parentNode.insertBefore(div, ul);
	//非表示実行
	hideEntries();
};
init();
})();
