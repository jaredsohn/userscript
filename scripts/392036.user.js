// ==UserScript==
// @name       getYTCC
// @namespace  http://userscripts.org/scripts/show/392036
// @version    0.1
// @description  Get the youtube CC subtitle
// @match http://www.youtube.com/watch*
// @match https://www.youtube.com/watch*
// @require http://code.jquery.com/jquery-2.1.0.min.js
// @copyright  2012+, You
// ==/UserScript==


if( $('#watch-like-dislike-buttons').length!==0 ){
    var baseurl = ytplayer.config.args.ttsurl;
    var url = baseurl +  "&type=track&lang=en&name&kind=asr&fmt=1"
	var title = ytplayer.config.args.title
    var fileName = title + ".xml";
    
    console.log('================================== #watch-like-dislike-buttons');
    $('#watch-like-dislike-buttons').before('<a href="' + url + '" id="YTCC" download="' +fileName +
                                            '" class = "yt-uix-button yt-uix-button-text yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip"><b>Donwload CC</b></a>');
    
}
