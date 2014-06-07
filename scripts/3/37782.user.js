// ==UserScript==
// @author         rikuo
// @name           Sort HB Comment light
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/entry/*
// @include        http://b.hatena.ne.jp/entry?mode=more&url=*
// ==/UserScript==


//--- Auto sort (true / false) ------------------------------

var ReverseHatenaBookmarkComment = true;	// 最初に並べ替えるかどうか？の設定

//-----------------------------------------------------------


var _doc = document;
var BUC = e('bookmarked_user');
if(!BUC) return;
if(BUC.childNodes[1].textContent.replace(/\s+/g, '')
	== 'ページ作者様の希望によりブックマークの一覧は非表示に設定されています。(この機能について)')return;
var icon_navi = e('main-counter');
var df = _doc.createDocumentFragment();

GM_addStyle(<><![CDATA[
	a.sort_btn{
		cursor: pointer;
		color: #fff;
	}
]]></>);

if(ReverseHatenaBookmarkComment)SortHatenaBookmarkComment();
SortCommentMessage();



function SortHatenaBookmarkComment(){
	var nodes = xpath(BUC , 'li');
	if(nodes.snapshotLength <= 1)return;
	var ul = nodes.snapshotItem(0).parentNode;
	for(var i = 1,nl = nodes.snapshotLength; i < nl; ++i) {
		ul.insertBefore(nodes.snapshotItem(i),nodes.snapshotItem(i-1));
	}
}


function SortCommentMessage(){

	var scm = c('span');
	df.appendChild(scm);
	scm.appendChild(_doc.createTextNode('\u3000['));

	var sortbtn = c('a');
	sortbtn.className = 'sort_btn';
	scm.appendChild(sortbtn);

	sortbtn.appendChild(_doc.createTextNode(SortButtonMake()));
	sortbtn.title = '\u6607\u9806/\u964d\u9806\u306E\u5207\u308A\u63db\u3048';
	sortbtn.addEventListener('click', function(e){
		if(ReverseHatenaBookmarkComment){
			ReverseHatenaBookmarkComment = false;
		}else{
			ReverseHatenaBookmarkComment = true;
		}
		this.textContent = SortButtonMake();
		SortHatenaBookmarkComment()}, false);

	scm.appendChild(_doc.createTextNode(']'));
	icon_navi.appendChild(df);
}

function SortButtonMake(){
	var button;
	if(ReverseHatenaBookmarkComment){
		button = '\u25b2';
	}else{
		button = '\u25bd';
	}
	return button;
}


function c(tag_name) {
	return _doc.createElement(tag_name);
}

function e(id) {
	return _doc.getElementById(id);
}

function xpath(context, query){
	return _doc.evaluate(query, context, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}

