// ==UserScript==
// @name           stackoverflow-comment-reply
// @namespace      stackoverflow
// @description    Add "reply" links to comments
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://meta.serverfault.com/*
// @include        http://meta.superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @include        http://meta.answers.onstartups.com/*
// @include        http://mathoverflow.net/*
// @include        http://area51.stackexchange.com/proposals/*
// @author         Benjamin Dumke
// ==/UserScript==

// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
        
    $(document).ajaxComplete(function(){
        setTimeout(function () {
            $(".comments").each(put_reply_links);
        }, 100);
    });
        
    // event handler for a click on the reply links
    function reply() {
        var commentlink = $(this).closest(".comments").next().click();
        var commentlinkId = commentlink.attr("id");
        var username = goodify($(this).prev().text().replace(/♦/, ""))
        var formid = commentlinkId.replace(/^.*-(\d+)$/, "add-comment-$1");
        var ta = $("#" + formid + " textarea")[0];
        var start = ta.selectionStart;
        var end = ta.selectionEnd;
        var shift = username.length + 3;
        ta.value = "@" + username + ": " + ta.value;
        ta.focus();
        ta.selectionStart = start + shift;
        ta.selectionEnd = end + shift;
    };

    function put_reply_links() {
        $(this).find(".comment:not(:has(.reply-link)) .comment-user").each(function () {
            $("<span class='reply-link' style='cursor:pointer;' title='reply'> &crarr;</span>").click(reply).insertAfter(this);
        });
    }
            
    $(".comments").each(put_reply_links);
    
    function goodify(s) {
        return s.replace(/ +/g, "");
    }  
    
});
