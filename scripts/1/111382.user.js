// ==UserScript==
// @name             Refresh War [GW]
// @namespace        s3kat0r.com
// @description      Позволяет задать свой таймер для обновления лога боя. Работае в javascript и AJAX типе боях.
// @include          http://www.ganjawars.ru/b0/b.php*
// @include          http://www.ganjawars.ru/b0/btl.php*
// @include          http://ganjawars.ru/b0/b.php*
// @include          http://ganjawars.ru/b0/btl.php*
// @version          0.1
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==


(function() {
var timer = 10;
var root  = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('ganjawars.ru/b0/btl.php') >= 0) {
	root['updatedata'] = function () {
		if (root.DataTimer >= 0) {
			clearTimeout(root.DataTimer);
		}
		root.DataTimer = setTimeout('updatedata()', timer*1000);
		root.frames.bsrc.window.location.href = 'btk.php?bid='+root.bid+'&turn='+root.turn+'&lines='+root.LinesCounter+'&btime='+root.BattleTime+'&ctime='+root.ChatTime;
	}
	root.DataTimer = setTimeout('updatedata()', timer*1000);
}

if (root.location.href.indexOf('ganjawars.ru/b0/b.php') >= 0) {
	root.BattleChatDelay = timer;
	root.BattleChatTimer = setTimeout('BattleRefreshChat()', timer*1000);
}



})();
