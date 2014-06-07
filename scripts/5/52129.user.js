// ==UserScript==
// @author         rikuo
// @name           hidden long sentence for HatenaHaiku
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://h.hatena.ne.jp/*
// @exclude        http://h.hatena.ne.jp/keyword/*?mode=album*
// @exclude        http://h.hatena.ne.jp/album*
// ==/UserScript==
//
// http://userscripts.org/scripts/show/52129
// cf. http://niconail.info/


// 閾値の設定（半角数字で）

var limit_characters = 650;	// 文字数の閾値
var limit_lines = 30;		// 段落数の閾値


//-------------------------------------------------------


var _doc = document;
var df = document.createDocumentFragment();

var url = location.href;
var userid;

if(userid = url.match(/^http:\/\/h.hatena.ne.jp\/([a-zA-Z][\w-]{1,30}[a-zA-Z0-9])\/\d+/)){
	if(userid[1] != 'keyword')return;
}


GM_addStyle(<><![CDATA[
	a.rko_seemore{
		padding: 1px 5px 0;
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: #c9a0af;
		color: #fff;
		font-weight: bold;
		font-size: 90%;
		-moz-border-radius:8px 8px 0 0;
		
	}
	a.rko_seemore:link,a.rko_seemore:visited{
		text-decoration: none;
		color: #fff;
	}
	a.rko_seemore:hover{
		text-decoration: underline;
	}
]]></>);


var hiddenLongSentence = function(){

	var nodes = xpath(_doc, 'descendant::div[@class="entries"]/div[@class="entry"]/div/div[@class="body" and not(descendant::div[@class="entry"]) and not(descendant::a[@class="rko_seemore"])]');

	for(var i = 0,n = nodes.snapshotLength; i < n; ++i){
		var entry = nodes.snapshotItem(i);
		const syntaxRE = /[\s]{2,}/g;
		var textLength = entry.textContent.replace(syntaxRE, '').length;
		var lines = xpath(entry,'child::text()');
		var chk_script = xpath(entry,'descendant::script');
		var chk_nico = false;
		if(chk_script.snapshotLength){
			textLength = 0;
			var entryChild = xpath(entry,'descendant::text()[name(..)!="SCRIPT"]');
			chk_nico = true;
			for(var j=0,ecl=entryChild.snapshotLength; j<ecl;++j){
				var txt = entryChild.snapshotItem(j).textContent.replace(syntaxRE, '');
				textLength += txt.length;
			}
		}
		if(textLength > limit_characters || lines.snapshotLength > limit_lines ){

			if(chk_nico){
				var nicovideo = xpath(entry,'child::div/embed[starts-with(@id,"external_nico_")]');
				var nl = nicovideo.snapshotLength;
				if(nl){
					for(var k=0; k<nl; ++k){
						var video = nicovideo.snapshotItem(k);
						var videoParent = video.parentNode;
						var videoVars = video.getAttribute('flashvars');
						var s = videoVars.match(/v=([a-zA-Z\d]+)&/);
						var videoID = s[1];
						var nail = c('img');
						nail.id = 'rko_nail_' + video.id;
						if(videoID.match(/^\d+$/)){//ニコニコ公式チャネル配信動画の場合
							var thumbID = videoVars.match(/wv_id=[a-zA-Z]+(\d+)&thumb/);
							nail.width = '128';
							nail.height = '96';
							nail.src = 'http://tn-skr3.smilevideo.jp/smile?i='+thumbID[1];
							
						}else{
							var videoWidth = video.width;
							var videoHeight = video.height;
							nail.width = videoWidth;
							nail.height = videoHeight;
							nail.src = 'http://niconail.info/'+videoID+'?w='+videoWidth+'&h='+videoHeight;
						}
						var videoTitle = videoVars.match(/&thumbTitle=([^&]+?)&/);
						nail.title = decodeURIComponent(videoTitle[1]);
						videoParent.appendChild(nail);
						video.style.display = 'none';
					}
				}

			}
			entry.style.cssText = 'border-bottom: 8px solid #c9a0af; overflow: hidden; height: 8em; position: relative;';
			var link = c('a');
			link.appendChild(_doc.createTextNode('続きを読む ( ' + textLength +'文字 )'));
			link.href = 'javascript:/* 続きを表示します */;void(0);';
			link.className = 'rko_seemore';

			link.setAttribute('onclick', 'this.style.cssText="display:none;";var body=this.parentNode;body.style.cssText="";var elm = document.evaluate("descendant::img[starts-with(@id,\'rko_nail_external_nico_\')]", body, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);var el=elm.snapshotLength;if(el){for(var i=0;i<el;++i){var t=elm.snapshotItem(i);var v = t.id.replace(/^rko_nail_/,\'\');t.parentNode.removeChild(t);document.getElementById(v).style.display=\'\';}}this.setAttribute("onclick","");');


			entry.appendChild(link);
		}
	}

}

hiddenLongSentence();

unsafeWindow.Hatena.Haiku.Pager.addEventListener('loadedEntries', function(){
	hiddenLongSentence();
});

function xpath(context, query){
	return _doc.evaluate(
		query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	)
}

function c(tag_name) {
	return _doc.createElement(tag_name);
}



