// ==UserScript==
// @name           threading-comments
// @namespace      stackoverflow
// @description    Show threaded comments
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://meta.serverfault.com/*
// @include        http://meta.superuser.com/*
// @include        http://stackapps.com/*
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
// http://meta.stackoverflow.com/46562
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    if (!window.StackExchange)
        return;

    // https://bitbucket.org/balpha/lyfe; MIT license
    (function(l){var q;q=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=a.length,d=0;d<c;d++)if(d in a&&a[d]===b)return d;return-1};var m={},e=function(a){if(!(this instanceof e))return new e(a);this.forEach="function"===typeof a?n(a):a.constructor===Array?u(a):v(a)},r=function(){throw m;},p=function(a){this.message=a;this.name="IterationError"};p.prototype=Error.prototype;var n=function(a){return function(b,c){var d=!1,f=0,g=function(a){if(d)throw new p("yield after end of iteration");
    a=b.call(c,a,f,r);f++;return a},x=function(a){a=a instanceof e?a:new e(a);a.forEach(function(a){g(a)})};try{a(g,x,r)}catch(k){if(k!==m)throw k;}finally{d=!0}}},u=function(a){return n(function(b){for(var c=a.length,d=0;d<c;d++)d in a&&b(a[d])})},v=function(a){return n(function(b){for(var c in a)a.hasOwnProperty(c)&&b([c,a[c]])})},h=function(a){return"string"===typeof a?function(b){return b[a]}:a};e.prototype={toArray:function(){var a=[];this.forEach(function(b){a.push(b)});return a},filter:function(a,
    b){var c=this;a=h(a);return new e(function(d){c.forEach(function(c){a.call(b,c)&&d(c)})})},take:function(a){var b=this;return new e(function(c){b.forEach(function(b,f,e){f>=a&&e();c(b)})})},skip:function(a){var b=this;return new e(function(c){b.forEach(function(b,f){f>=a&&c(b)})})},map:function(a,b){var c=this;a=h(a);return new e(function(d){c.forEach(function(c){d(a.call(b,c))})})},zipWithArray:function(a,b){"undefined"===typeof b&&(b=function(a,b){return[a,b]});var c=this;return new e(function(d){var e=
    a.length,g=0;c.forEach(function(c,k,w){for(;!(k+g in a)&&k+g<e;)g++;k+g>=e&&w();d(b(c,a[k+g]))})})},reduce:function(a,b){var c,d;2>arguments.length?c=!0:(c=!1,d=b);this.forEach(function(b){c?(d=b,c=!1):d=a(d,b)});return d},and:function(a){var b=this;return new e(function(c,d){d(b);d(a)})},takeWhile:function(a){var b=this;a=h(a);return new e(function(c){b.forEach(function(b,e,g){a(b)?c(b):g()})})},skipWhile:function(a){var b=this;a=h(a);return new e(function(c){var d=!0;b.forEach(function(b){(d=d&&
    a(b))||c(b)})})},all:function(a){var b=!0;a=h(a);this.forEach(function(c,d,e){(a?a(c):c)||(b=!1,e())});return b},any:function(a){var b=!1;a=h(a);this.forEach(function(c,d,e){if(a?a(c):c)b=!0,e()});return b},first:function(){var a;this.forEach(function(b,c,d){a=b;d()});return a},groupBy:function(a){var b=this;a=h(a);return new e(function(c,d){var f=[],g=[];b.forEach(function(b){var c=a(b),d=q(f,c);-1===d?(f.push(c),g.push([b])):g[d].push(b)});d((new e(f)).zipWithArray(g,function(a,b){var c=new e(b);
    c.key=a;return c}))})},evaluated:function(){return new e(this.toArray())},except:function(a){return this.filter(function(b){return b!==a})},sortBy:function(a){var b=this;a=h(a);return new e(function(c){var d=b.toArray(),f=s(0,d.length).toArray();f.sort(function(b,c){var e=a(d[b]),f=a(d[c]);if(typeof e===typeof f){if(e===f)return b<c?-1:1;if(e<f)return-1;if(e>f)return 1}throw new TypeError("cannot compare "+e+" and "+f);});(new e(f)).forEach(function(a){c(d[a])})})},count:function(){var a=0;this.forEach(function(){a++});
    return a}};var t=function(a,b){var c=a;"undefined"===typeof b&&(b=1);return new e(function(a){for(;;)a(c),c+=b})},s=function(a,b){return t(a,1).take(b)},y=l.Generator;l.Generator=e;e.BreakIteration=m;e.Count=t;e.Range=s;e.IterationError=p;e.noConflict=function(){l.Generator=y;return e}})(this);

    var Generator = window.Generator.noConflict();
    
    Generator.prototype.last = function () {
        var result;
        this.forEach(function (val) { result = val; })
        return result;
    };

    // taken from kip's http://userscripts.org/scripts/review/62163
    var goodletters = Array('\u00c0','\u00c1','\u00c2','\u00c3','\u00c4','\u00c5','\u00c6','\u00c7'
                             ,'\u00c8','\u00c9','\u00ca','\u00cb','\u00cc','\u00cd','\u00ce','\u00cf'
                                      ,'\u00d1','\u00d2','\u00d3','\u00d4','\u00d5','\u00d6'         
                             ,'\u00d8','\u00d9','\u00da','\u00db','\u00dc','\u00dd'                  
                             ,'\u00e0','\u00e1','\u00e2','\u00e3','\u00e4','\u00e5','\u00e6','\u00e7'
                             ,'\u00e8','\u00e9','\u00ea','\u00eb','\u00ec','\u00ed','\u00ee','\u00ef'
                                      ,'\u00f1','\u00f2','\u00f3','\u00f4','\u00f5','\u00f6'         
                             ,'\u00f8','\u00f9','\u00fa','\u00fb','\u00fc','\u00fd'         ,'\u00ff').join('');
    var good = new RegExp("^[" + goodletters + "\\w]{3}");
    var bad = new RegExp("[^" + goodletters + "\\w]", "g");

    // from my http://userscripts.org/scripts/review/68252
    function goodify(s)
    {
        var original = s;
        while (s.length >3 && !s.match(good)) {
            s = s.replace(bad, "");
        }
        if (!s.match(good))
        {
            // failed, so we might as well use the original
            s = original;
        }
        return s;
    }  
    
    function extractMention(commentText, useAlg2) {
        var match;
        if (useAlg2)
            // this is closer to the real @-reply heuristics
            match = /@(\S+)/.exec(commentText);
        else
            match = /@([^ .;:!?,()[\]{}\/\s]+)/.exec(commentText);

        if (!match)
            return null;
        if (useAlg2)
            return goodify(match[1]).toLowerCase();
        else
            return match[1].toLowerCase();
    }
    
    function matcher(username, useAlg2) {
        function fits(s) {
            return s.substring(0, username.length).toLowerCase() == username;
        }
        if (useAlg2)
            return function (candidateName) {
                return fits(goodify(candidateName));
            };
        else
            return function (candidateName) {
                return fits(candidateName.replace(/\s/g, ""));
            }
    }
    
    function userIdFromLink(link) {
        var match = /\/users\/(\d+)\//.exec(link);
        if (match)
            return parseInt(match[1]);
        else
            return null;    
    }
    
    function commenterId(jComment) {
        var userlink = $("a.comment-user", jComment).attr("href");
        return userIdFromLink(userlink);
    }


    // How far may comments be indented?
    // Note that MAX_NESTING = 3 means there are
    // up to *four* levels (including top-level)
    var MAX_NESTING = 12;

    // How many pixels of indentation for the first level?
    var INDENT = 30;
    
    // By how much does the additional indentation decrease per level?
    // Setting this to 1 means constant indentation (i.e. the original behaviour).
    var GAMMA = .95;
    
    var indent_widths = [0];
    var inc = INDENT;
    var w = 0;
    for (var i = 1; i <= MAX_NESTING; i++) {
        w += inc;
        inc *= GAMMA;
        indent_widths.push(w);
    }

    function indenter(parent) {
        for (var i = MAX_NESTING; i > 0; i--)
        {
            if (parent.hasClass("threading-" + (i-1)) || (i == MAX_NESTING && parent.hasClass("threading-" + i)))
            {
                return function(jComment) {
                    jComment.addClass("threading-" + i).find(".comment-text").css({"padding-left": indent_widths[i]});
                }
            }
        }
    
        return function(jComment) {
            jComment.addClass("threading-1").find(".comment-text").css({"padding-left": INDENT});
        };
    }
    
    function thread(jCommentDiv) {
        var opLink = jCommentDiv.closest("#question, .answer").find(".user-details:last a").attr("href"),
            opId = userIdFromLink(opLink),
            comments = [],
            commentsGen = Generator(comments),
            commenterCountExceptOp = 0,
            commenters = {};
        
        jCommentDiv.find(".comment").each(function () {
            var jComment = $(this),
                newComment = {
                    id: jComment.attr("id"),
                    userId: commenterId(jComment),
                    userName: jComment.find(".comment-user").text()
                },
                isFirstByThisUser = !commenters["u" + newComment.userId],
                commentText = jComment.find(".comment-text").text(),
                useAlg2 = false,
                mention = extractMention(commentText),
                candidates;
                
            commenters["u" + newComment.userId] = true;
            
            if (newComment.userId !== opId && isFirstByThisUser)
                commenterCountExceptOp++;
            
            if (!mention) {
                mention = extractMention(commentText, true);
                useAlg2 = true;
            }
            
            if (mention) {
                var filter = matcher(mention, useAlg2);
                candidates = commentsGen.filter(function (c) { return filter(c.userName); });
            } else {
                if (commenterCountExceptOp === 1) {
                    candidates = commentsGen.filter(function (c) { return c.userId !== newComment.userId; });
                } else if (newComment.userId !== opId) {
                    candidates = commentsGen.filter(function (c) { return c.userId === opId && c.replyUserId === newComment.userId; });
                }
            }
            
            if (candidates) {
                var conversation = candidates.filter(function (c) { return c.replyUserId === newComment.userId }),
                    replyComment = conversation.last() || candidates.last();

                if (replyComment) {
                    newComment.replyUserId = replyComment.userId;
                    newComment.replyCommentId = replyComment.id;
                    newComment.replyIsExplicit = !!mention;
                }
            }
            comments.push(newComment);
        });

        commentsGen
            .filter(function (c) { return c.replyCommentId; })
            .groupBy(function (c) { return c.replyCommentId; })
            .forEach(function (sameParentGroup) {
                var jParent = $("#" + sameParentGroup.key);
                var ind = indenter(jParent);
                var after = jParent;
                sameParentGroup.forEach(function (comment) {
                    var jComment = $("#" + comment.id);
                    ind(jComment);
                    jComment.insertAfter(after);
                    after = jComment;
                });
            });
    }
       
    function go() {
        $("div.comments:not(.nothread)").not(":has(.threaded)").each(function () { thread($(this)); }).find(".comment:first").addClass("threaded");
    }

    function undo() {
        $("#threading-menu").fadeOut("fast", function() { $(this).remove(); });
        var jComments = $(this).closest(".comments").addClass("nothread").find(".comment");
        if (jComments.length == 0)
            return;
        var orig_padding = jComments.eq(0).find(".comment-text").css("padding-left");
        var gComments = Generator(jComments.toArray()).sortBy(function (c) { return parseInt(c.id.replace("comment-", "")); });
        jComments.eq(0).parent().append(gComments.toArray());
        jComments.each(function() {
            $(this).removeClass("threaded").find(".comment-text").css("padding-left", orig_padding);
        });
    }
    
    function redo() {
        $(this).closest(".comments").removeClass("nothread");
        go();
    }
    
    var menuTimeout;
    $("body").delegate("div.comments", "mouseenter", function () {
        var that = this;
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(function () { showThreadingMenu($(that)); }, 500);
    });
    
    $("body").delegate("div.comments", "mouseleave", function () {
        $("#threading-menu").fadeOut("fast", function() { $(this).remove(); });
        clearTimeout(menuTimeout);
    });
    
    function showThreadingMenu(jCommentDiv) {
        $("#threading-menu").remove();
        var shouldUndo = !jCommentDiv.hasClass("nothread");
        $("<div>" + (shouldUndo ? "un" : "") + "thread</div>").hide().css({
            position: "absolute",
            marginTop: -20,
            color: "black",
            backgroundColor: "white",
            padding: 5,
            opacity: .6,
            boxShadow: "0 0 4px rgba(0, 0, 0, .6)",
            webkitBoxShadow: "0 0 4px rgba(0, 0, 0, .6)",
            "-moz-box-shadow": "0 0 4px rgba(0, 0, 0, .6)",
            borderRadius: 5,
            "-moz-border-radius": 5,
            cursor: "pointer"
        }).prependTo(jCommentDiv).attr("id", "threading-menu").fadeIn("fast").click(shouldUndo ? undo : redo);
    }
    
    
    if (window.MathJax) {
        var orig_go = go;
        go = function () {
            MathJax.Hub.Queue(orig_go);
        }
    }
    
    $(document).ajaxComplete(go);
    go();

});
