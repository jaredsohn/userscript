// ==UserScript==
// @name       Kaskus Smooth Go to Top Bottom
// @icon           http://s3.amazonaws.com/uso_ss/icon/173890/large.png
// @namespace  http://userscripts.org/scripts/show/174088
// @updateURL      https://userscripts.org/scripts/source/174088.meta.js
// @version    0.1.5
// @license        (CC) by-nc-sa 3.0
// @description  Give smooth scrool for go to top and bottom in Kaskus
// @author         @ngengs; ngeng_2
// @include        *://www.kaskus.co.id/*
// @include        *://kaskus.co.id/*
// @include        http://support.kaskus.co.id/*
// @copyright  		2013, @ngengs
// ==/UserScript==
/**
 * Credits: 
 *  - jQuery <http://jquery.com/>.
 * 
 * Changelog:
 * ==========
 * 0.1.5 (7/29/13)
 * - change little code for scroll timing and just shake if scroll when in top or bottom page
 * - add include link for support.kaskus.co.id
 * 
 * 0.1.4 (7/23/13)
 * - add hotkey shift+up for scroll to top shift+down to scroll to bottom
 * - add shake effect after finish scroll
 * 
 * 0.1.3 (7/22/13)
 * - first fixed release
 */
function KGTB(win) {
    var $=win.$;
    
    //add style
    GM_addStyle( "#Ntopbottom span:hover{bottom:25px}#Ntopbottom{position:fixed;bottom:-25px;right:0;z-index:2013}#Ntopbottom span{position:relative;transition:all .2s linear;-o-transition:all .2s linear;-moz-transition:all .2s linear;-webkit-transition:all .2s linear;padding:10px;text-align:center;font-weight:bold;min-width:60px;border-bottom-left-radius:0;border-bottom-right-radius:0}"+
                ".Nbtn{display:inline-block;padding:5px 15px 6px;color:#FFF;font-size:13px;font-weight:bold;text-decoration:none;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;text-shadow:-1px -1px rgba(0,0,0,0.3);position:relative;cursor:pointer;overflow:visible;width:auto;line-height:18px;font-family:Sans-serif;box-sizing:content-box;margin:0;font-weight:700;vertical-align:middle;text-decoration:none !important;overflow:hidden;-webkit-appearance:none}"+
                "#Ntop{background-color:#1793e6;filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='#FF1793E6',endColorstr='#FF0F639B');background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0,#1793e6),color-stop(100%,#0f639b));background-image:-webkit-linear-gradient(top,#1793e6 0,#0f639b 100%);background-image:-moz-linear-gradient(top,#1793e6 0,#0f639b 100%);background-image:-o-linear-gradient(top,#1793e6 0,#0f639b 100%);background-image:linear-gradient(top,#1793e6 0,#0f639b 100%);border:solid 1px #0a4166;box-shadow:0 1px 0 #0a4166,0 1px 0 rgba(255,255,255,0.5) inset}"+
                "#Nbottom{background-color:#e68317;filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='#FFE69B17',endColorstr='#FF9B630F');background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0,#e69b17),color-stop(100%,#9b630f));background-image:-webkit-linear-gradient(top,#e69b17 0,#9b630f 100%);background-image:-moz-linear-gradient(top,#e69b17 0,#9b630f 100%);background-image:-o-linear-gradient(top,#e69b17 0,#9b630f 100%);background-image:linear-gradient(top,#e69b17 0,#9b630f 100%);border:solid 1px #66490a;box-shadow:0 1px 0 #66450a,0 1px 0 rgba(255,255,255,0.5) inset}"
               );
    //give bottom position
    $("body").append("<span id='NGoBottom'></span>");
    //insert button
    $("body").append('<div id="Ntopbottom"><span id="Ntop" class="Nbtn"><i class="icon-chevron-up"></i> Top</span><span id="Nbottom" class="Nbtn"><i class="icon-chevron-down"></i> Bottom</span></div>');
    //go to top function (prevent default kaskus go to top)
    $("#Ntop,#back-to-top").click(function(a){
        a.preventDefault();//stop kaskus default link back to top
        $("html,body").scrollIt().shake();scrollIt("body");
    });
    //go to bottom function
    $("#Nbottom").click(function(){
        $("html,body").scrollIt({"to":"#NGoBottom"}).shake({'shakes': 3});
    });
    //key press
    $(document.documentElement).keyup(function (e) {
        //key shift+up
        if (e.shiftKey && e.keyCode == 38 && !$("textarea, input").is(":focus")){
            $("html,body").scrollIt().shake();
        }
        //key shift+down
        if (e.shiftKey && e.keyCode == 40&& !$("textarea, input").is(":focus")){
            $("html,body").scrollIt({"to":"#NGoBottom"}).shake({'shakes': 3});
        }
    });
    
    //scroll function
    $.fn.scrollIt = function (options) {
    	// defaults
        var settings = {'to': 'body'};
        // merge options
        if (options) {
            $.extend(settings, options);
        }
    	return this.each(function () {
            var timeScroll=((settings.to=="body"&&$(document).scrollTop()<=($(document).height()*(1/4))||(settings.to!="body"&&$(document).scrollTop()>=($(document).height()*(3/4))-$(window).height())))?1000:2000;
            //scroll to top if not at top
            if($(document).scrollTop()>0&&settings.to=="body"){
                $(this).animate({scrollTop:$(settings.to).offset().top},timeScroll);
            }
            //scroll to bottom if not in bottom
            else if(($(window).scrollTop() + $(window).height() < $(document).height()-50)&&settings.to!="body"){
                $(this).animate({scrollTop:$(settings.to).offset().top},timeScroll);
            }          
        });
    }
   
    
    
    //shake effect function get from http://jsfiddle.net/Webveloper/HjFUK/
    $.fn.shake = function (options) {
        // defaults
        var settings = {'shakes': 1,'distance': 5,'duration': 200};
        // merge options
        if (options) {
            $.extend(settings, options);
        }
        // make it so
        var pos;
        return this.each(function () {
            // position if necessary
            pos = $(this).css('position');
            if (!pos || pos === 'static') {
                $(this).css('position', 'relative');
            }
            // shake it
            for (var x = 1; x <= settings.shakes; x++) {
                $(this).animate({ top: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
                .animate({ top: settings.distance }, (settings.duration / settings.shakes) / 2)
                .animate({ top: 0 }, (settings.duration / settings.shakes) / 4);
            }
        });
    };
}
KGTB((typeof unsafeWindow === "object") ? unsafeWindow : window);