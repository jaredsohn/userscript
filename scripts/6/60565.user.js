// ==UserScript==
// @author         rikuo
// @name           filter for tweet in Hatenabookmark
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/entry/*
// @include        http://b.hatena.ne.jp/entry?mode=more&url=*
// ==/UserScript==

var _doc = document;
var BUC = e('bookmarked_user');
if(!BUC) return;
if(BUC.childNodes[1].textContent.replace(/\s+/g, '')
	== 'ページ作者様の希望によりブックマークの一覧は非表示に設定されています。(この機能について)')return;
var icon_navi = e('main-counter');
var df = _doc.createDocumentFragment();
var showhide = GM_getValue( 'tweet_mode', 1);
var btnId = 'twittertoComment';

var tweetCss = [];
tweetCss[0] = 'list-item';
tweetCss[1] = 'none';
var btnImg = [];
btnImg[0] = 'data:image/gif;base64,R0lGODlhDgAOAPIAAAD4ADPM/1/V/33b/pHf/u3x/QAAAAAAACH5BAEAAAAALAAAAAAOAA4AAAMzCLrcWtCxMsIo8okgoG/FZg0kgS1hoK7dJK6D6XJeNHc1SKgCGZ+oFw+IqqxkjpotI0kAADs=';
btnImg[1] = 'http://b.hatena.ne.jp/images/icon-twitter-entry.gif';

var btnText = 'Twitterから投稿したコメントを非表示/表示の切り替え';

GM_addStyle(<><![CDATA[
	#entryinfo h2 span.twitter_btn img{
		cursor: pointer;
		margin: 0;
	}
	#entryinfo h2 span.twitter_btn span{
		font-size: 90%;
	}
]]></>);

MakeBtn();
if(showhide)ShowHideTweet();


function ShowHideTweet(){
	var nodes = xpath(BUC , 'li[child::span[contains(concat(" ",@class," ")," twitter ")]]');
	if(!nodes.snapshotLength)return;
	var liCSS = tweetCss[showhide];
	for(var i = 0,nl = nodes.snapshotLength; i < nl; ++i) {
		var li = nodes.snapshotItem(i);
		li.style.display = liCSS;
	}
	e(btnId).src = btnImg[showhide];
}


function MakeBtn(){

	var tbn = c('span');
	df.appendChild(tbn);
	tbn.className = 'twitter_btn'
	tbn.appendChild(_doc.createTextNode('\u3000['));

	var tweetBtn = c('img');
	tbn.appendChild(tweetBtn);
	tweetBtn.src = btnImg[showhide];

	tweetBtn.width = '14';
	tweetBtn.height = '14';
	tweetBtn.alt = btnText;
	tweetBtn.title = btnText;
	tweetBtn.id = btnId;
	tweetBtn.addEventListener('click', function(e){
		if(showhide){
			showhide = 0;
		}else{
			showhide = 1;
		}
		GM_setValue('tweet_mode', showhide);
		ShowHideTweet()}, false);
	var count = c('span');
	tbn.appendChild(count);
	var t = xpath(BUC , 'li[child::span[contains(concat(" ",@class," ")," twitter ")]]');
	var num = t.snapshotLength;
	count.appendChild(_doc.createTextNode(' - ' + num));
	count.title = 'Twitterから投稿したコメントの数 : '+num;
	
	tbn.appendChild(_doc.createTextNode(']'));
	icon_navi.appendChild(df);
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

