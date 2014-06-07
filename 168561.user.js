// ==UserScript==
// @name        Link Only Answers
// @namespace   https://gist.github.com/burn123/5650628
// @description Adds a self navigating "Link-Only Answer" button
// @include     http://*stackoverflow.com/questions*
// @include     http://*stackoverflow.com/review*
// @include     http://*stackoverflow.com/admin/dashboard*
// @include     http://*stackoverflow.com/tools*
// @include     http://*serverfault.com/questions*
// @include     http://*serverfault.com/review*
// @include     http://*serverfault.com/admin/dashboard*
// @include     http://*serverfault.com/tools*
// @include     http://*superuser.com/questions*
// @include     http://*superuser.com/review*
// @include     http://*superuser.com/admin/dashboard*
// @include     http://*superuser.com/tools*
// @include     http://*stackexchange.com/questions*
// @include     http://*stackexchange.com/review*
// @include     http://*stackexchange.com/admin/dashboard*
// @include     http://*stackexchange.com/tools*
// @include     http://*askubuntu.com/questions*
// @include     http://*askubuntu.com/review*
// @include     http://*askubuntu.com/admin/dashboard*
// @include     http://*askubuntu.com/tools*
// @include     http://*answers.onstartups.com/questions*
// @include     http://*answers.onstartups.com/review*
// @include     http://*answers.onstartups.com/admin/dashboard*
// @include     http://*answers.onstartups.com/tools*
// @include     http://*mathoverflow.net/questions*
// @include     http://*mathoverflow.net/review*
// @include     http://*mathoverflow.net/admin/dashboard*
// @include     http://*mathoverflow.net/tools*
// @include     http://discuss.area51.stackexchange.com/questions/*
// @include     http://discuss.area51.stackexchange.com/review*
// @include     http://discuss.area51.stackexchange.com/admin/dashboard*
// @include     http://discuss.area51.stackexchange.com/tools*
// @include     http://stackapps.com/questions*
// @include     http://stackapps.com/review*
// @include     http://stackapps.com/admin/dashboard*
// @include     http://stackapps.com/tools*
// @version     1
// ==/UserScript==

function jquery(e) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + e.toString() + ")(jQuery)";
    document.body.appendChild(script);
}

(function ($) {
    $.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
        var found = 'found';
        var $this = $(this.selector);
        var $elements = $this.not(function () {
            return $(this).data(found);
        }).each(handler).data(found, true);
        if (!isChild) {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () {
                $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
            }, 500);
        }
        else if (shouldRunHandlerOnce && $elements.length) {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }
        return $this;
    }
}(jQuery)); // Function to wait until an element exists, provided by http://stackoverflow.com/a/13709125/1470950

jquery(function ($) {
    $('document').ready(function () {
        $('<span class="lsep">|</span>').appendTo('.answer .post-menu');
        $('.answer .post-menu a:last').clone().attr({ // Targets the flag button and duplicates it
            class: "link-only",
            title: "Flag as a Link Only Answer"
        })
            .text("Link Only").appendTo('.answer .post-menu');

        $(".link-only").each(function () { // Have to use the each function so that it doesn't click everything with this class
            var $this = $(this),
                aID = $this.closest(".answer").attr('data-answerid');
            $this.attr("id", "link-only-" + aID); // Gives each link the id of the answer

            $this.on("click", function (e) {
                e.preventDefault(); // Prevents from jumping to the top of the page on click

                $this.siblings("a[id^='flag-post']").click(); // Clicks the flag button to open the flagging UI
                $("div.action-subform ul li:first-child label input.flag-prefilled").waitUntilExists(function () { // Bug where if you click on normal flag button, it still navigates to NAA flag
                    $(this).attr("id", "NAA");
                    setTimeout(function () {
                        $('#NAA').click();
                    }, 1000);
                });

                $this.closest('.answer').find('a.vote-down-off').not("a.vote-down-on").click(); // Clicks the vote down button, but not if it has already been clicked

                $('#comments-link-' + aID).click(); // Targets the "add comment" link below the answer in order to open up the comment dialogue
                setTimeout(function () {
                    linkonlyanswer = "Link Only Answers are not helpful on this site. If you are going to link to a post, then you need to summarize it in your answer. That way, if the link ever dies, this answer will still be useful. See [this](http://goo.gl/wQTjc) answer for clarification."; // Change this if you want different comment text
                    var comment = $('#add-comment-' + aID)
                    comment.find('textarea').val(linkonlyanswer);
                    setTimeout(function () {
                        comment.find('input[type=submit]').click(); // Clicks the button that submits the comment
                    }, 1000);
                }, 10);
            });
        });
    });
});