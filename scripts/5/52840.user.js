// ==UserScript==
// @name           Always view your menu on pixiv
// @namespace      avymop
// @description    他の人のページを見てるときも、トップページを見てるときと同様に、自分のブックマークなどへのリンクを表示します。When you watch other people's page, this userscript views links to your bookmark, illust, and so on as you watch the top page.  
// @include        http://www.pixiv.net/*
// ==/UserScript==

(function(){
	var naviDiv = document.getElementById("navi_user");
	if(!naviDiv) return;

	naviDiv.style.marginTop = 0;

	var naviHTML = <>
<ul id="gNav">
<li class="navi_home"><a href="mypage.php" title="ホーム">ホーム</a></li>
<li class="navi_upload"><a href="illust_upload.php" title="作品の投稿">作品の投稿</a></li>
<li class="navi_illust"><a href="member_illust.php" title="作品の管理">作品の管理</a></li>
<li class="navi_bookmark"><a href="bookmark.php" title="ブックマーク管理">ブックマーク管理</a></li>
<li class="navi_msgbox"><a href="msgbox.php" title="メッセージ">メッセージ</a></li>
<li class="navi_edit"><a href="edit.php" title="設定変更">設定変更</a></li>

</ul>
</>;
	var yournavi = document.createElement('div');
	yournavi.id = "navi";
	yournavi.innerHTML = naviHTML;

yournavi.style.marginBottom = 0;
	
	naviDiv.parentNode.insertBefore(yournavi, naviDiv);
//	naviDiv.insertBefore(yournavi, naviDiv.firstChild)

	return;

//ナビメニューの分スクロールする場合
	var height = yournavi.offsetHeight;
	//setTimeout(function(){
	if(document.scrollTop == height) return;
	window.scrollBy(0,height);
	//},500);

})();
