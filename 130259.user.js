// ==UserScript==
// @name			Block HTML5
// @version			2012-04-06
// @namespace		http://my.opera.com/community/forums/topic.dml?id=1081282
// @author			crapshark
// @copyright		crapshark... kinda :)
// @description		This should stop HTML5 Videos from autoplaying on all sites. This has two purposes. Firstly it should save bandwidth (as the media doesn't download) and second it prevents annoying audio from playing
// @note			crapshark did not upload this script here (I'm not crapshark) but I put his script here because I'm sure others will wish to use it.
// @note2			For Opera only (untested in Firefox/Chrome) and I'm not even sure if those browsers will need this. They may have other workarounds.
// @updateURL		http://userscripts.org/scripts/show/130259
// @include			*
// ==/UserScript==

(function ()  {
    var okToPlay;
    var play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function()
    {
        if (typeof okToPlay === 'undefined')
            okToPlay = confirm("Play multimedia?");
        if (okToPlay)
            play.call(this);
    };
    HTMLMediaElement.prototype.load = function()
    {
    };
})();