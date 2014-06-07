// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://huaban.com/bookmarklet/*
// @copyright  2012+, You
// ==/UserScript==


var $;

// Add jQuery
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
    GM_JQ = document.createElement('script');

    GM_JQ.src = 'http://code.jquery.com/jquery-1.10.1.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery.noConflict(true);
    letsJQuery();
  }
}

// All your GM code must be inside this function
function letsJQuery() {
//        alert($); // check if the dollar (jquery) function works
//
  //      alert($().jquery); // check jQuery version


$('body').append("<div style='position:fixed; left:325px; top:262px;'><a id='press-this' class='btn   btn18 rbtn btn-wp ' >wordpress</a><a id='press-this-ppt' class='btn   btn18 rbtn btn-wp ' >pptfans</a></div>");


/*
http://huaban.com/bookmarklet/?media=http5_EzFw.jpg&url=http%3A%ing&w=450&h=338&alt=&title=8C%BA&description=&media_type=&video=&

$.urlParam('media'); // image
$.urlParam('url');        // url
$.urlParam('w');   // width
$.urlParam('h');   // height
$.urlParam('title');   // title
$.urlParam('alt');   // image alt
$.urlParam('desccription');   // description
$.urlParam('media_type');   //
$.urlParam('video');   //
*/

$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

var windowSizeArray = [ "width=600,height=600","width=300,height=400,scrollbars=yes" ];


var urlpress = 'http://www.meizihao.com/wp-admin/press-this-to.php?u='+($.urlParam('url'))+'&t='+($.urlParam('title'))+'&s='+($.urlParam('media')) ;

var url_pptfans_press = 'http://www.pptfans.cn/wp-admin/press-this-to.php?u='+($.urlParam('url'))+'&t='+($.urlParam('title'))+'&s='+($.urlParam('media')) ;

                $('a#press-this').click(function (event){

                    var url = urlpress;
                    var windowName = "popUp";//$(this).attr("name");
                    var windowSize = windowSizeArray[$(this).attr("rel")];

                    window.open(url, windowName, windowSize);

                    event.preventDefault();

                });
                $('a#press-this-ppt').click(function (event){

                    var url = url_pptfans_press;
                    var windowName = "popUp";//$(this).attr("name");
                    var windowSize = windowSizeArray[$(this).attr("rel")];

                    window.open(url, windowName, windowSize);

                    event.preventDefault();

                });



}