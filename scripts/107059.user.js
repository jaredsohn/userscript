// ==UserScript==
// @name           4chan SJIS art fixer
// @namespace      http://userscripts.org/users/33432
// @description    Makes SJIS art posted on 4chan imageboards looks all right
// @include        http://boards.4chan.org/*
// ==/UserScript==

var detector=/[　、。，．・：；？！゛゜｀¨＾￣＿ヽヾゝゞ〃〆〇ー―‐／\～｜‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋−±×÷＝≠＜＞≦≧∞∴′″]/

function get(s){
	var res=[];
	
	var list=document.evaluate(s,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i=0;i<list.snapshotLength;i++){
		res.push(list.snapshotItem(i));
	}

	return res;
}

var elems=get("//blockquote");
for(var i in elems){
	var elem=elems[i];
	
	if(elem.textContent.match(detector)){
		elem.style.fontFamily="Mona,'MS PGothic'";
	}
}
