// ==UserScript==
// @name           4chan Simple Hide
// @namespace      http://userscripts.org/users/189987
// @description    Adds Show/Hide buttons to hide individual threads.
// @include        http://*.4chan.org/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	//check if greasemonkey picked it up
	if (typeof jQuery != 'undefined') {
		$(callback);
		return;
	}
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
    // Script to add simple links to [Hide]/[Show] a thread

    // Quit if we're not at an index page
    if (document.location.href.indexOf("res") != -1)
        return;

    var now = Date.now()
    var future = now + 1000*60*60*24*7;

    // Check if we have any to clean up
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var exp = localStorage.getItem(key);
        if (key.indexOf("hidePost_") === 0)
            if (exp < now)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, future);
    }

    function hidePost(node){
        var key = "hidePost_" + $(node).attr('id');
        localStorage.setItem(key, future);
        $(node).find(".hide.replylink").text("Show");
        $(node).find(".replyContainer").hide();
        $(node).find(".summary").hide();
        $(node).find(".opContainer .file").hide();
        $(node).find(".opContainer .postMessage").hide();
    }

    function showPost(node){
        var key = "hidePost_" + node.attr('id');
        localStorage.removeItem(key);
        $(node).find(".hide.replylink").text("Hide");
        $(node).find(".replyContainer").show();
        $(node).find(".summary").show();
        $(node).find(".opContainer .file").show();
        $(node).find(".opContainer .postMessage").show();
    }

    $("div.thread").each(function(){
        var id = $(this).attr('id');

        var action; // What action can be taken on the post at load
        if (localStorage.getItem("hidePost_" + id)) {
            // Was hiding
            action = "Show";
            hidePost(this);
        } else {
            action = "Hide";
        }
        // Add [Hide]/[Show] links
        $(this).find(".postInfo span.postNum a:eq(2)")
            .before(
                $("<a>")
                    .addClass("hide replylink")
                    .attr('href', "javascript:;")
                    .data('shown', action == "Show")
                    .text(action)
                    .click(function(){
                        if (localStorage.getItem("hidePost_" + id))
                            showPost($(this).closest("div.thread"));
                        else
                            hidePost($(this).closest("div.thread"));
                    })
            )
            .before("]["); // We squeeze this link in between the "[" text and "Reply" link, so clean it up a bit
    });
}

// load jQuery and execute the main function
addJQuery(main);