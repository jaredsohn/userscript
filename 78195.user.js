// ==UserScript==
// @name           Mixi AshiatoFilter
// @namespace      http://userscripts.org/scripts/show/78195
// @include        http://mixi.jp/show_log.pl
// ==/UserScript==
(function() {


// 朮版xpath from http://yamanoue.sakura.ne.jp/blog/coding/68
function xpath(query) {
	var results = document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = new Array();
	for(var i=0; i<results.snapshotLength; i++){
		nodes.push(results.snapshotItem(i));
	}
	return nodes;
}

function hide_other(imgFn,btnid,state){
	var oDoc = document;
	if (oDoc != null)
	{
		var imgTags = oDoc.images;
		for( var l in oDoc.images )
		{
			var strTag = imgTags[l].src;
			if( strTag != null ){
				if( strTag.indexOf( imgFn ) > 0 )
				{
					if(imgTags[l].parentNode.id != btnid){
						var parent = imgTags[l].parentNode.parentNode;
						if(!state){
							parent.style.display = "none";
						}else{
							parent.style.display = "block";
						}

						//imgTags[l].style.visibility = "hidden";
					}
				}
			}
		}
		oDoc = null;
	}
}

var state_mymix = false;
var state_frmix = false;


var allDivs = xpath('id("bodyMainArea")/div[@class="extraWrap02 tab"]/div[@class="extraInner"]/div[@class="contents"]/div[@class="logListArea"]/div[@class="logContents clearfix"]/div[@class="logListCenter"]/p');
allDivs[0].innerHTML += '　　<label>フィルタ：</label>';


var btn_mymix = document.createElement('a');
btn_mymix.id = 'btnmymix';
btn_mymix.href="javascript:void(0);";
btn_mymix.innerHTML = "<img src='http://img.mixi.jp/img/basic/icon/log_mymixi.gif'>切替";


btn_mymix.addEventListener("click", function(){
	hide_other("log_mymixi.gif",'btnmymix',state_mymix );
	state_mymix = !state_mymix;
}, false);

var btn_frmix = document.createElement('a');
btn_frmix.id = 'btnfrmix';
btn_frmix.href="javascript:void(0);";
btn_frmix.innerHTML = "<img src='http://img.mixi.jp/img/basic/icon/log_friend002.gif'>切替";

btn_frmix.addEventListener("click", function(){
	hide_other("log_friend002.gif",'btnfrmix',state_frmix );
	state_frmix = !state_frmix;
}, false);


allDivs[0].appendChild(btn_mymix);
allDivs[0].appendChild(btn_frmix);

})();