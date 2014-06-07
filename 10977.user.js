// ==UserScript==
// @name          hop 2ch for gikonavi
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  helps to make link to gikonavi[2ch browser] at firefox with mozex[firefox extension].
// @include       *
// @exclude       http://menu.2ch.net/bbsmenu.html
// @version       1.1
// ==/UserScript==
(function(){
	if(location.host.match(/\.2ch\.net$|\.bbspink\.com$|machi\.to$/)){
		if(location.host.match(/^info\.|^find\.|^be\.|^epg\.|^shop\.|^watch\.|^irc\./)){}
		else{
			var linktojs = document.createElement("a");
			var Strboardorthread;
			linktojs.setAttribute('href',location.href);
			linktojs.protocol='h2chb:';
			if(is2chboard(location.pathname)){
				Strboardorthread = '\u677f';//板
			}
			else{
				Strboardorthread = '\u30b9\u30ec\u30c3\u30c9';//スレッド
			}
			linktojs.innerHTML='<span style="color:#000000;font-weight:bold;">\u3053\u306e' + Strboardorthread + '\u3092\u30ae\u30b3\u30ca\u30d3\u3067\u8868\u793a\u3059\u308b</span><br>';
			//この(スレッド|板)をギコナビで表示する
			document.body.insertBefore(linktojs,document.body.firstChild);
		}
	}
	for(i=0;i<document.links.length;i++){
		var link = document.links[i];
		if(link.host.match(/\.2ch\.net$|\.bbspink\.com$|machi\.to$/)){
			if(link.host.match(/^info\.|^find\.|^be\.|^epg\.|^shop\.|^watch\.|^irc\./)){}
			else{
				link.protocol='h2chb:';
				link.innerHTML = link.innerHTML.replace(/^http:/,"h2chb:");
			}
		}
	}
})();
function is2chboard(Strpathname){
	return Strpathname.match(/^\/.*\/$/);
}