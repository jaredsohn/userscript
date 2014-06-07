// ==UserScript==
// @id             demo_XuiteDownloader
// @name           XuiteDownloader
// @namespace      demoshop
// @description    專為 Xuite 網路硬碟下載頁面設計可以不需要按廣告就下載
// @include        http://webhd.xuite.net/_oops/*
// @include        http://sync.hamicloud.net/_oops/*
// @exclude        http://webhd.xuite.net/*@*	
// @version        0.8
//
// ==/UserScript==
var $jq;
(function () {
    jq_wait()
})();

function jq_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(jq_wait, 100);
    } else {
        $jq = unsafeWindow.jQuery;
		createiframe();
        letsJQuery();
        trydownload();
    }
}

function letsJQuery() {
    $jq('#verify_code_value').keyup(function () {
        if ($jq(this).val().length == 6) {
            unsafeWindow.isClick = 1;
			$jq("#global").data("isClick", 1);
            to_to_aun_AD();
        }
    }).after("<span style='color:red;'>【驗證碼輸入完畢一秒後會自動跳轉】</span>");
}
function createiframe(){
$jq('#footer').after("<iframe id='showAD' width='0' height='0'></iframe>")
}

function to_to_aun_AD() {
    var adurl = $jq('#share-download-ad a').attr('href');
	$jq('#showAD').attr('src',adurl);
	window.setTimeout(function(){ $jq('#share-download-func-submit').click();},800);
}

function trydownload() {
    if ($jq('#delayTime').length > 0) {
		unsafeWindow.setTimeout(function(){ $jq("#global").data("time",10);},800);
		unsafeWindow.setTimeout(function(){unsafeWindow.history.back();},8000);
    }
}