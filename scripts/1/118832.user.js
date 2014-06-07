// ==UserScript==
// @name           SQL
// @namespace      a
// @include        http://www.2chan.net/oe/*
// ==/UserScript==

// "～", "～", "～", ....の～の部分に除外するコテを追加する
var excludes =　["ヤゴ１", "ヤゴ1", "外販梅干", "458072", "ヘパイストス", "sql仙人"];

var forms =　document.getElementsByTagName("form");

for (i = 0; i < forms.length; i++) {
	var hidden =　false;
	// 参照だと削除時にインデックスがずれるのでコピーしておく
    var children =　[];
    for (j = 0; j < forms[i].children.length; j++) {
        children.push(forms[i].children[j]);
    }
	var preAs =　[];
	var preTables =　[]
	
	for (k =　0; k < children.length; k++) {
		var tagName =　children[k].tagName;
		if (hidden) {
			if (tagName == "TABLE") {
				// tableタグはhidden=trueにしても消えないので削除する。
				forms[i].removeChild(children[k]);
			} else {
				children[k].hidden =　true;
			}
		} else if (tagName == "TABLE") {
			// delだけのコメントがあれば表示しない
			var blockquotes =　children[k].getElementsByTagName("blockquote");
			if (blockquotes.length >　0) {
				for (var l =　0; l < blockquotes.length; l++) {
					var delCheckStr = blockquotes[l].textContent;
					if (delCheckStr.length > 3) {
						delCheckStr = delCheckStr.substr(0, 3);
					}
					if (delCheckStr ==　"del" || delCheckStr ==　"DEL") {
						hidden =　true;
						for (var z =　0; z < preAs.length; z++) {
						    // 返信は残しておく　(意味ないかも・・・)
							if (preAs[z].href.indexOf("htm") < 0) {
								preAs[z].hidden =　true;
							}
						}
						for (var z =　preTables.length - 1; z >= 0; z--) {
							forms[i].removeChild(preTables[z]);
						}
					}
				}
			}
			preTables.push(children[k]);
		}
		
		if (tagName ==　"FONT") {
			var text =　children[k].textContent;
			for (j =　0; j < excludes.length; j++) {
				if (text.indexOf(excludes[j]) >= 0) {
					hidden =　true;
					for (var z =　0; z < preAs.length; z++) {
						preAs[z].hidden =　true;
					}
				}
			}
		}
		// HRまでが一つのデータ
		if (tagName == "HR" || tagName == "hr") {
			children[k].hidden =　false;
			hidden =　false;
			preAs = [];
			preTables =　[];
		}
		if (tagName == "A")　{
			preAs.push(children[k]);
		}
	}
} 