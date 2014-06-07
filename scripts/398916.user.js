// ==UserScript==
// @name        preenster
// @namespace   keep.com
// @include     http://keep.com/
// @version     1
// @grant       none
// ==/UserScript==
var _preensterConfig = _preensterConfig || {};
_preensterConfig.scriptsPath = 'http://web.preenster.com/webpreenster';
_preensterConfig.version = 0.4;

_preensterConfig.loadScript = function (url, onLoadCallback) {
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = url;
    if (onLoadCallback) {
        scriptTag.onload = onLoadCallback;
    }

    var scS = document.getElementsByTagName('script')[0];
    scS.parentNode.insertBefore(scriptTag, scS);
};
_preensterConfig.loadStyle = function (url) {
    var linkTag = document.createElement('link');
    linkTag.type = 'text/css';
    linkTag.rel = 'stylesheet';
    linkTag.href = url;

    document.getElementsByTagName("head")[0].appendChild(linkTag);
};

_preensterConfig.loadSources = function(){
    _preensterConfig.loadScript(_preensterConfig.scriptsPath + '/v' + _preensterConfig.version +'/core.js', false);
    _preensterConfig.loadStyle(_preensterConfig.scriptsPath + '/style_core.css');
}

if(typeof jQuery == 'undefined') {
    _preensterConfig.loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', _preensterConfig.loadSources);
}
else {
    _preensterConfig.loadSources();
}