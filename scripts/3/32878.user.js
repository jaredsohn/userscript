// ==UserScript==
// @name           Hb secret comment viewer
// @namespace      http://d.hatena.ne.jp/Lhankor_Mhy/
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

( function(){

window.addEventListener(
'load',
function() {
	if(document.getElementById("bookmarked_user").innerHTML.match(/ページ作者様の希望によりブックマークの一覧は非表示に設定されています/)){
		document.getElementById("bookmarked_user").innerHTML = '<li>ページ作者様の希望によりブックマークの一覧は非表示に設定されています。&nbsp;<span id="viewer" style="color:#00f;text-decoration:underline;cursor:pointer;">表示</span></li>';
		document.getElementById('viewer').addEventListener('click', function(event) {
			viewComment();
		}, true);
	}
},
true);

})();



function viewComment(){
	document.getElementById("bookmarked_user").innerHTML ="";
	var l=location.href;
	if(l.match(/^http:\/\/b.hatena.ne.jp\/entry\//)){
		var b=document.getElementsByTagName('H1')[0].firstChild.firstChild.href;
		b.replace(/#/,'%23');
	}
	var bURL = 'http://b.hatena.ne.jp/bookmarklist?url=' + b;
	loadComment(bURL);
}

function loadComment(bURL){
	GM_xmlhttpRequest({ method: 'GET',
			url: bURL,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var re = responseDetails.responseText;
				var timeStamp = re.match(/<dd class="timestamp">.*<\/dd>/g);
				var bookmarkerIcon = re.match(/<dt class="bookmarker">.*<span class="label">ブックマークしたユーザー<\/span><\/dt>/g);
				var bookmarkerName = re.match(/<dd class="bookmarker">.*<\/dd>/g);
				var comment = re.match(/<dd class="comment">.*<\/dd>/g);
				var str = "";
				for (var i in timeStamp){
					if (timeStamp[i].match(/<dd class="timestamp">(.*)<\/dd>/)) timeStamp[i]=RegExp.$1;
					if (bookmarkerIcon[i].match(/<dt class="bookmarker">(.*)<span class="label">ブックマークしたユーザー<\/span><\/dt>/)) bookmarkerIcon[i]=RegExp.$1;
					if (bookmarkerName[i].match(/<dd class="bookmarker">(.*)<\/dd>/)) bookmarkerName[i]=RegExp.$1;
					bookmarkerName[i] = bookmarkerName[i].replace(/(#bookmark-\d*")>/, '$1 class="hatena-id">');
					if (bookmarkerName[i].match(/>(.*)</)) bookmarker=RegExp.$1;
					if (comment[i].match(/<dd class="comment">(.*)<\/dd>/)) comment[i]=RegExp.$1;
					var userTag = comment[i].match(/<span class="tag">\[.*?\]<\/span>/g)
					var userTags = "";
					if (userTag){
						for (var j in userTag){
							if (userTag[j].match(/\[(.*)\]/)) userTag[j]=RegExp.$1;
							userTag[j] = userTag[j].replace(/(href=".*")/, '$1  rel="tag" class="user-tag"');
						}
						userTags = '<span class="user-tag">' + userTag.join(", ")+ '</span>';
						comment[i] = comment[i].replace(/<span class="tag">.*?<\/span>/g, '');
					}
					str += '<li id="bookmark-user-'
						+ bookmarker
						+ '"><span class="timestamp">'
						+ timeStamp[i]
						+ '</span>'
						+ " " + bookmarkerIcon[i] + " " 
						+ bookmarkerName[i] + " "
						+ userTags + " "
						+ '<span class="comment">'
						+ comment[i]
						+ '</span></li>';
				}
				var insObj = document.getElementById("bookmarked_user");
				insObj.innerHTML += str;
				if (re.match(/<a href="(.*)">次の25件/)) {
					loadComment("http://b.hatena.ne.jp" + RegExp.$1);
				}else{
					var s = document.createElement('script');
					s.innerHTML = "new Hatena.Star.EntryLoader();"
					document.body.appendChild(s);
				}
			}
	});
}
