// ==UserScript==
// @author         rikuo
// @name           HatenaBookmark large comment
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/entry/*
// @include        http://b.hatena.ne.jp/entry?mode=more&url=*
// ==/UserScript==


(function(){

  var _doc = document,bu = e('bookmarked_user');
  if(!bu) return;
  if(bu.childNodes[1].textContent.replace(/\s+/g, '')
       == 'ページ作者様の希望によりブックマークの一覧は非表示に設定されています。(この機能について)')return;

	var plus_list = xpath(bu,'li[child::a[@class="plus_icon"]]');
	if(plus_list.snapshotLength==0)return;
	GM_addStyle(<><![CDATA[
		li.plused_user{
			font-size: 180%;
		}
	]]></>);
	for(var i = 0,p = plus_list.snapshotLength; i < p; ++i){
		var li = plus_list.snapshotItem(i);
		li.className += ' plused_user';
		var icon = xpath(li,'a/img[@class="profile-image"]').snapshotItem(0);
		var path = icon.src;
		icon.src = path.replace(/profile_s\.gif$/,'profile\.gif');
		icon.height = '32';
		icon.width = '32';
	}


  function e(id) {
    return _doc.getElementById(id);
  }

  function xpath(context, query){
    return _doc.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
  }

})();

