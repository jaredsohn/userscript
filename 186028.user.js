// ==UserScript==
// @name        Podio: App edit fix, make type column fixed
// @namespace   v6.nosepicking
// @description Podio: App edit fix, make type column fixed
// @include     https://podio.com/*/apps/*/edit
// @version     1
// @run-at      document-end
// @grant       GM_addStyle
// ==/UserScript==

(function(window, unsafeWindow, documetr) {
var GM_addStyle = window.GM_addStyle || function(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
};

function fix_css(){
	GM_addStyle ([''
        ,'.g30 {position:fixed;left:0px;top:0px;bottom:0px;width:30%;overflow:auto;overflow-x:hidden;scroll-y!important;z-index:999;}'
        ,'.g70 {padding-left:30%;}'
        ,'.building-blocks li[data-type="number"] {color:red; background:lightgreen!important;}'
        ,'.building-blocks li[data-type="text"] {color:red; background:lightblue!important;}'
        ,'.droparea .header input.fieldname {width:70%;}'
        // ,'.appbuilder-section-build .building-blocks .main .g30 {position:fixed;left:0px;top:0px;height:400px;width:300px;overflow:scroll-y;padding-right:30%;z-index:999;}'
        // ,'.appbuilder-section-build .building-blocks .main .g70 {padding-left:30%;}'
		].join('')
	);
}

function start(){
	fix_css();
}

start();

})(this, this.unsafeWindow || this, document);