// ==UserScript==
// @name HbFavorite_Pinnizer
// @namespace      http://d.hatena.ne.jp/Lhankor_Mhy/
// @description はてブお気に入りのキーボードショートカットに「ピンをつける」を付加します
// @include        http://b.hatena.ne.jp/*/favorite*
// @include        http://b.hatena.ne.jp/*/starfriends*
// ==/UserScript==

( function(){

window.addEventListener(
	'load',
	function() {
		var pinStyleInit = '{background-color:#cf8;font-weight:bold;}' //ピン済エントリのスタイル
		var pinNoStyleInit = '{background-color:inherit;font-weight:inherit;}' //↑を解除するスタイル
		var pinKey = "p".charCodeAt(0); //ピンをつける
		var openKey = "@".charCodeAt(0); //ピンをつけたエントリを開く
		var clearKey = "c".charCodeAt(0); //クリア
		var numOpenPage = 3; //一度に開くエントリ数
		
		var pinList = getPinList();
		var pinStyle = pinList.length ? 'a[href="'+
		
			pinList.join( '"],a[href="' )+
			'"]' + pinStyleInit
			: '';
		addGlobalStyle(pinStyle);
		
		var numPinnedObj = document.createElement("li");
		numPinnedObj.appendChild( document.createTextNode(pinList.length) );
		numPinnedObj.setAttribute( "id", "numPinned" );
		var numPinnedTarget = document.getElementById("navigation").getElementsByTagName("ul")
		numPinnedTarget[0].appendChild(numPinnedObj)
		addGlobalStyle('#numPinned'+pinStyleInit);
		
		document.addEventListener(
			'keypress',
			 function(e){
				if (e.charCode==pinKey){
					var currentElement = document.evaluate('//h3[@class="entry current-element"]/a[position()=1]/@href',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					if (currentElement) {
						var pinnedURL = currentElement.snapshotItem(0).nodeValue;
						pinList = getPinList();
						var f = true;
						for (var i=0; i<pinList.length; i++){
							if (pinnedURL == pinList[i]){
								pinList = pinList.slice(0,i).concat(pinList.slice(i+1));
								addGlobalStyle( 'a[href="'+pinnedURL+'"]' + pinNoStyleInit );
								setPinList(pinList);
								f = false;
								break;
							}
						}
						if (f) {
							pinList.push(pinnedURL);
							setPinList(pinList);
							addGlobalStyle( 'a[href="'+pinnedURL+'"]' + pinStyleInit );
						}
						document.getElementById("numPinned").firstChild.nodeValue = pinList.length;
					}
				}
				if (e.charCode==openKey){
					pinList = getPinList();
					for (var i=0; (i<numOpenPage)&&(pinList.length>0); i++){
						var openURL = pinList.shift();
						window.open( openURL, openURL + new Date().toString());
						addGlobalStyle( 'a[href="'+openURL+'"]' + pinNoStyleInit );
						document.getElementById("numPinned").firstChild.nodeValue = pinList.length;
					}
					setPinList(pinList);
				}
				if (e.charCode==clearKey){
					if (confirm("ピンしたエントリを全て破棄します")){
						GM_setValue( 'pinList', '[]' );
						alert('破棄しました');
						document.getElementById("numPinned").firstChild.nodeValue = pinList.length;
					}
				}
			},
			false); 
		},
	true);

})();

function getPinList(){
	try{
		return eval( '('+GM_getValue('pinList', '[]')+')' );
	}
	catch(e){
		return ([]);
	}
}

function setPinList(pinList){
	GM_setValue('pinList', pinList.length ? '["'+pinList.join('","')+'"]': '[]' );
}

function addGlobalStyle(css) { var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; } style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
