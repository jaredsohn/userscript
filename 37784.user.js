// ==UserScript==
// @author         rikuo
// @name           Sort HB Comment
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/entry/*
// @include        http://b.hatena.ne.jp/entry?mode=more&url=*
// ==/UserScript==


//--- Auto sort & hide (true / false)------------------------

var ReverseHatenaBookmarkComment = true;	// 最初に並べ替えるかどうか？の設定
var HatenaBookmark_NoComment = true;		// 最初にコメントが無いものを非表示にするか？の設定

//-----------------------------------------------------------


var _doc = document;
var BUC = e('bookmarked_user');
if(!BUC) return;
if(BUC.childNodes[1].textContent.replace(/\s+/g, '')
	== 'ページ作者様の希望によりブックマークの一覧は非表示に設定されています。(この機能について)')return;
var icon_navi = e('main-counter');
var df = _doc.createDocumentFragment();

GM_addStyle(<><![CDATA[
	img.showhidebtn{
		margin: 0 1px 0 1px !important;
		cursor: pointer;
	}
	a.sort_btn{
		cursor: pointer;
		color: #fff;
	}
	span.nocommentnumber{
		font-size: 90%;
	}
]]></>);

if(ReverseHatenaBookmarkComment)SortHatenaBookmarkComment();
var NoCommentNum = xpath(BUC ,'li[contains(concat(" ",@class," "),"nocomment")]').snapshotLength;
SortCommentMessage();



function SortHatenaBookmarkComment(){
	var nodes = xpath(BUC , 'li');
	if(nodes.snapshotLength <= 1)return;
	var ul = nodes.snapshotItem(0).parentNode;
	for(var i = 1,nl = nodes.snapshotLength; i < nl; ++i) {
		ul.insertBefore(nodes.snapshotItem(i),nodes.snapshotItem(i-1));
	}
}

function ShowHideBookmarkComment(){
	if(HatenaBookmark_NoComment){
		GM_addStyle(<><![CDATA[
			li.nocomment{display: none !important}
			span.nocommentnumber{display: inline !important;}
		]]></>);
	}else{
		GM_addStyle(<><![CDATA[
			li.nocomment{display: list-item !important}
			span.nocommentnumber{display: none !important;}
		]]></>);
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

	scm.appendChild(_doc.createTextNode(']['));
	var comment = c('img');

	scm.appendChild(comment);

	comment.className = 'showhidebtn';
	comment.title = '\u30b3\u30e1\u30F3\u30c8\u306e\u7121\u3044\u3082\u306e\u3092\u8868\u793a/\u975E\u8868\u793a';
	comment.width = '14';
	comment.height = '11';

	comment.src = ShowHideButtonMake();
	ShowHideBookmarkComment();
	comment.addEventListener('click', function(c){
		if(HatenaBookmark_NoComment){
			HatenaBookmark_NoComment = false;
		}else{
			HatenaBookmark_NoComment = true;
		}
		this.src = ShowHideButtonMake();
		ShowHideBookmarkComment()}, false);

	var count = c('span');
	scm.appendChild(count);
	count.appendChild(_doc.createTextNode('+' + NoCommentNum));
	count.className = 'nocommentnumber';

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

function ShowHideButtonMake(){
	var ShowHideButton;
	if(HatenaBookmark_NoComment){
		ShowHideButton = [
			'data:image/gif;base64,R0lGODlhDgAMAPABAP///8DAwCH5BAEAA',
			'AEALAAAAAAOAAwAAAIeTICpduwM2pvI1IhtnK9y52WX9oHStx2J5nUnmjoFADs='
		].join("");

	}else{
		ShowHideButton = [
			'data:image/gif;base64,R0lGODlhDgAMAPABAP///8DAwCH5BAEAAAEAL',
			'AAAAAAOAAwAAAIaTICpduwM2pto0mhdzRDz43FRSHXbUpKXVQAAOw=='
		].join("");
	}
	return ShowHideButton;
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

