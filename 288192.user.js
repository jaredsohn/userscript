// ==UserScript==
// @name         HackerNews collapse
// @match		 *://news.ycombinator.com/item*
// @match		 *://hackerne.ws/item*
// @author       frdmn
// @description  This userscript allows you to collapse comments on HackerNews / YCombinator submissions
// ==/UserScript==

// Dunction that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// Main function
function main() { 
    // Actual code - based on Alexander Kirk's JavaScript - http://alexander.kirk.at/js/hackernews-collapsible-threads-v4.js
    var hn = new RegExp("(news.ycombinator.com|hackerne\.ws)/item", "i");
    if (typeof domaincheck == "undefined") domaincheck = true;
    if (jQ("body").hasClass("collapsible-comments")) {
        // jQ("span.collapse").remove();
        return;
    } else if (domaincheck && !hn.test(location.href)) {
        alert("This bookmarklet only applies to the comments sections of Hacker News, at http://news.ycombinator.com/");
        return;
    }
        
        jQ("body").addClass("collapsible-comments");
    function collapse(e) {
        var $e = jQ(e.target);
        var el = $e.closest("table");
        var children = jQ("table.parent-" + el.data("comment")).closest("tr");
        var comment = el.find("span.comhead").parent().siblings();
        var visible = children.is(":visible");
        if (!children.length) visible = comment.is(":visible");
        var thread = children.add(comment).add(comment.closest("td").prev());
        if (visible) {
            $e.text("[+] (" + children.length + " child" + (children.length == 1 ? "" : "ren") + ")");
            thread.not(comment)
            .find("span.collapse").text("[-]").end()
            .find("span.comhead")
            .parent()
            .siblings().show().end()
            .closest("td").prev().show();
            thread.hide();
            comment.closest("table").css("padding-bottom", "20px");
        } else {
            $e.text("[-]");
            thread.show();
            comment.closest("table").css("padding-bottom", "auto");
        }
    }
    
    var comments = jQ("body table table").eq(2);
    var parents = [];
    jQ("table", comments).each(function() {
        var $this = jQ(this);
        var level = jQ("td img[src*=s.gif]", this)[0].width / 40;
        var comhead = jQ("span.comhead", this);
        comhead.append(" ", jQ("<span class='collapse'>[-]</span>").css({cursor: "pointer"}).click(collapse).hover(function() { this.style.textDecoration = "underline"; }, function() { this.style.textDecoration = "none"; }));
        var id = jQ("a[href*=item]", comhead);
        if (!id.length) return true;
        id = id[0].href;
        id = id.substr(id.indexOf("=") + 1);
        $this.addClass("comment-" + id).data("comment", id);
        parents[level] = id;
        if (level > 0) {
            for (var i = 0; i < level; i++) {
                $this.addClass("parent-" + parents[i]);
            }
        }
    }); 
}

// Load jQuery and execute the function
addJQuery(main);