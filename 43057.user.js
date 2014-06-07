// ==UserScript==
// @name        Hatena::Bookmark hide users in favorite
// @namespace   http://tomatomax.net/
// @description hide users in favorite view of Hatena bookmark
// @include     http://b.hatena.ne.jp/*/favorite*
// ==/UserScript==

hideUser();
setTimeout(function(unsafeWindow) {
	if (
		unsafeWindow.Hatena &&
		unsafeWindow.Hatena.Bookmark &&
		unsafeWindow.Hatena.Bookmark.AutoPagerize &&
		unsafeWindow.Hatena.Bookmark.AutoPagerize.instance
	) {
		var autopager = unsafeWindow.Hatena.Bookmark.AutoPagerize.instance;
		autopager.oldAddEventListener('complete',function(){
			// サイト側のイベントからGreasemonkey側の関数を呼ぶ場合はsetTimeoutを挟む
			setTimeout(hideUser,10);
		});
	}
},10, this.unsafeWindow || this);

function hideUser() {
  var elem = document.getElementsByClassName('curvebox-body comment');
  var length = elem.length;
  for(var i = 0; i < length; i++) {
    if(elem[i].getAttribute("already_hiding") != "true") {
      var s = document.createElement('span');
      s.addEventListener('click', expandUser, true);
      s.style.fontSize = '10px';
      s.innerHTML = 'ブックマークしているユーザを見る';
      elem[i].parentNode.insertBefore(s, elem[i]);
      elem[i].style.display = "none";
      elem[i].setAttribute("already_hiding", "true");
    }
  }
}

function expandUser(e) {
  this.style.display = "none";
  this.nextSibling.style.display = "block";
}

