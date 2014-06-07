// ==UserScript==
// @name           JQuery Tag Helper
// @namespace      http://code.jquery.com/
// @description    Alows selection of multiple tags on e-shuushuu
// @include        http://e-shuushuu.net/*
// ==/UserScript==


// Add jQuery
(function() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://code.jquery.com/jquery.min.js';
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
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {

    $("#tag_list li a").wrap("<span class='tag'></span>")

    $(".tag").prepend("<input type='checkbox' class='tagCheckbox' />").find("input").css("visibility", "hidden");
    $(".tag").append("<a class='findMulti' href='http://e-shuushuu.net'><img style='float:right;display:none' src='/common/image/icon/search.png' alt='find' /></a>");
    $(".tag").hover(function() { $(this).not(".checkedMulti").find("input").css("visibility", "visible") }, function() { $(this).not(".checkedMulti").find("input").css("visibility", "hidden") });
    $(".tag").css("display", "block");
    $(".tag input").css("margin", "0px 2px");
    $(".tag input").click(function() {
        $(this).parent().toggleClass("checkedMulti");
        $(this).parent().find(".findMulti img").toggle();
        var tagList = "";
        $(".checkedMulti a").not(".findMulti").each(function() { tagList += $(this).attr("href").substr($(this).attr("href").lastIndexOf("/") + 1) + "+" })
        tagList = tagList.substr(0, tagList.length - 1);
        $(".findMulti").attr("href", "http://e-shuushuu.net/search/results/?tags=" + tagList);
    });

    $(".quicktag").each(function() {
        $(this).attr("fullHeight", $(this).height());
        if ($(this).height() < 32)
            $(this).attr("smallHeight", $(this).height());
        else
            $(this).attr("smallHeight", "32");
        $(this).css(
        {
            'height': $(this).attr("smallHeight") + "px",
            'overflow': 'hidden'
        });
    });

    $(".quicktag").parent().hover(
      function(e) {
    $(this).find(".quicktag").each(function() {
        $(this).stop(true).animate({
                height: $(this).attr("fullHeight")
            }, 500, function() {
          })});
      },
      function() {
      $(this).find(".quicktag").each(function() {
          $(this).stop(true).animate({
                height: $(this).attr("smallHeight")
            }, 500, function() {
          })});
      }
    );

}