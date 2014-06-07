// ==UserScript==
// @name       Kaskus Quote like Spoiler
// @icon           http://s3.amazonaws.com/uso_ss/icon/173890/large.png
// @namespace  http://userscripts.org/scripts/show/173890
// @updateURL      https://userscripts.org/scripts/source/173890.meta.js
// @version    0.2.5.7
// @license        (CC) by-nc-sa 3.0
// @description  Change each Quote in Kaskus to Spoiler Style
// @author         ngengs; ngeng_2
// @include        *://www.kaskus.co.id/post/*
// @include        *://www.kaskus.co.id/thread/*
// @include        *://www.kaskus.co.id/show_post/*
// @include        *://www.kaskus.co.id/pm/view/*
// @include        *://www.kaskus.co.id/lastpost/*
// @include        *://kaskus.co.id/post/*
// @include        *://kaskus.co.id/thread/*
// @include        *://kaskus.co.id/show_post/*
// @include        *://kaskus.co.id/pm/view/*
// @include        *://www.kaskus.co.id/lastpost/*
// @copyright  		2013, @ngengs
// @contributor		@anggiedimasta, LouCypher
// ==/UserScript==
/**
 * Credits: 
 *  - jQuery <http://jquery.com/>.
 *  - Kaskus Quote  Spoiler by anggiedimasta <http://userscripts.org/scripts/show/173958>.
 *  - Kaskus Auto Hide User Style by s4nji <http://userstyles.org/styles/90800/kaskus-quote-autohide>.
 *  - LouCypher
 * 
 * Changelog:
 * ==========
 * 0.2.5.7 (7/29/13)
 * - Update Include URL /lastpost/
 * 
 * 0.2.5.5 (7/24/13)
 * - Update include URL
 * 
 * 0.2.5.4 (7/24/13)
 * - More like spoiler
 * 
 * 0.2.5.3 (7/24/13)
 * - Optimize code
 * 
 * 0.2.5 (7/24/13)
 * - change code for work with firefox, special thanks for LouCypher
 * 
 * 0.2.4 (7/23/13)
 * - work with firefox
 * 
 * 0.2.3.7 (7/23/13)
 * - wrong upload (-_-")
 * 
 * 0.2.3.1 (7/23/13)
 * - make code more efficient
 *
 * 0.2.3 (7/23/13)
 * - give hide button
 * - change slideToggle to slideUp and slideDown to handle show all and hide all button (with slideToggle showed quote is closed when click show all button)
 * 
 * 0.2.2 (7/22/13)
 * - first fixed release
 */
function KQLS(win) {
    $ = win.$;
    //hide all quote
    $(".post-quote > span:last-child").addClass("in-quote").css({ 'background' : '', 'border' : '','padding': '','width':'' }).wrap("<div class='this-quote' style='margin: 0px;padding: 6px;border: 1px inset;background: #E1E4F2;color: #000;border-color: #CCC;border-radius: 3px;'></div>").hide();
    //insert button
    $(".post-quote > span:first-child").append("<input type='button' value='Show All' class='btn btn-quote-all' style='margin:2px;font-size:10px;padding:2px;width:60px!important;cursor:pointer;border-radius:3px'/> <input type='button' value='Show' class='btn btn-quote' style='margin:2px;font-size:10px;padding:2px;width:60px!important;cursor:pointer;border-radius:3px'/>");
    //button show / hide single quote
    $(".btn-quote").click(function(){
        changeShowHide($(this),$(this).val()=="Show", $(this).parent("span").next(".this-quote").children('span.in-quote'))
    });
    //button show /hide all quote
    $(".btn-quote-all").click(function(){
        changeShowHide($(this),$(this).val()=="Show All",$(".post-quote > .this-quote > span.in-quote"))
    });
    //manage show/hide
    function changeShowHide(cliked,showed,slide){
        showed?slide.slideDown("slow"):slide.slideUp("slow");
        var textBtn=cliked.val()=="Show"||cliked.val()=="Show All"?"Hide":"Show";
        if(cliked.val()=="Show"||cliked.val()=="Hide"){
            cliked.val(textBtn);
            cliked.prev(".btn-quote-all").val(textBtn+" All")
        }
        else{
            $(".post-quote .btn-quote").val(textBtn);
            $(".post-quote .btn-quote-all").val(textBtn+" All")
        }
    }
}


KQLS((typeof unsafeWindow === "object") ? unsafeWindow : window);