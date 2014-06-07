// ==UserScript==
// @name           Lepra Tools
// @namespace      http://www.leprosorium.ru/lepratools
// @icon http://leprosorium.ru/favicon.ico
// @description    Tools for leprosorium.ru browsing
// @include        http://*.leprosorium.ru/comments/*
// @include        http://leprosorium.ru/comments/*
// @version 0.2.7
// ==/UserScript==

(function() {


    var GM_log = typeof GM_log != undefined ? GM_log : null;
    if (typeof(unsafeWindow) != 'undefined' && unsafeWindow.console) {
        GM_log = unsafeWindow.console.log;
    } else if (typeof(console) != 'undefined') {
        GM_log = console.log; 
    }

    function Comment(div) {
        this.div = div;

        this.indent = indent(this);
        this.userId = userId(this);
        this.rating = rating(this);
        this.content = content(this);
        this.date = date(this);

        this.children = new Array();
        this.display = div.style.display;

        function indent(comment) {
            var regex = RegExp("\\indent_(\\d*)\\b");
            var match = regex.exec(comment.div.className);
            if (match && match.length > 1) {
                return parseInt(match[1]);
            }
            return -1;
        }

        function userId(comment) {
            var regex = RegExp("\\u(\\d*)\\b");
            var match = regex.exec(comment.div.className);
            if (match && match.length > 1) {
                return parseInt(match[1]);
            }
            return -1;
        }

        function rating(comment) {
            var spans = comment.div.getElementsByTagName('span');
            for (var i = 0; i < spans.length; i++) {
                var span = spans[i];
                if (span.className.indexOf('rating') > -1) {
                    var em = span.firstChild;
                    if (em.tagName == 'EM' || em.tagName == 'em') {
                        return parseInt(em.textContent);
                    }
                }
            }
            return 0;
        }

        function date(comment) {
            var regex = RegExp("\\.*(\\d+).(\\d+).(\\d+).*\\s(\\d+).(\\d+)\\b");
            var divs = comment.div.getElementsByTagName('div');
            for (var i = 0; i < divs.length; i++) {
                var div = divs[i];
                if (div.className == 'p') {
                    var nodes = div.childNodes;
                    for (var j = 0; j < nodes.length; j++) {
                        var match = regex.exec(nodes[j].nodeValue); 
                        if (match && match.length > 5) {
                            return new Date(match[3], match[2], match[1], match[4], match[5], 0, 0);
                        }
                    }
                }
            }
            return null;
        }

        function content(comment) {
            var divs = comment.div.getElementsByTagName('div');
            for (var i = 0; i < divs.length; i++) {
                var div = divs[i];
                if (div.className == 'dt') {
                    return div.innerHTML;
                }
            }
            return null;
        }
    }

    Comment.HIDE = 'hide';
    Comment.SORT_DATE = 'date';
    Comment.SORT_RATING = 'rating';
    Comment.ASC = 'asc';
    Comment.DSC = 'dsc';

    Comment.prototype.getDiv = function() {
        return this.div;
    }

    Comment.prototype.getId = function() {
        return this.div.id;
    }

    Comment.prototype.getIndent = function() {
        return this.indent;
    }

    Comment.prototype.getUserId = function() {
        return this.userId;
    }

    Comment.prototype.hide = function() {
        if (this.children.length > 0) {
            this.show_link.style['display'] = 'inline';
            this.hide_link.style['display'] = 'none';
        }
        this.children.forEach(function(comment) {
            comment.div.style.display = 'none';
            comment.hide();
        });
    }

    Comment.prototype.show = function() {
        if (this.children.length > 0) {
            this.show_link.style['display'] = 'none';
            this.hide_link.style['display'] = 'inline';
        }
        this.children.forEach(function(comment) {
            comment.div.style.display = comment.display;
            comment.show();
        });
    }

    Comment.prototype.childrenCount = function() {
        var count = this.children.length; 
        this.children.forEach(function(comment) {
            count += comment.childrenCount();
        });
        return count;
    }

    Comment.prototype.childrenRating = function() {
        var rating = 0;
        this.children.forEach(function(comment) {
            rating += comment.rating + comment.childrenRating();
        });
        return rating;
    }

    Comment.prototype.updateSpans = function() {

        modifyDiv(this);
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].updateSpans();
        }

        if (this.children.length > 0) {
            if (localStorage) {
                if (localStorage.getItem('lt_hide#' + this.div.id) == Comment.HIDE) {
                    this.hide();
                }
                if (localStorage.getItem('lt_sort#' + this.div.id) == Comment.SORT_RATING) {
                    this.sort(Comment.SORT_RATING, Comment.DSC);
                }
            }
        }

        function modifyDiv(comment) {
            var divs = comment.div.getElementsByTagName('div');
            for (var i = 0; i < divs.length; i++) {
                var d = divs[i];
                if (d.className.indexOf('p') > -1) {

                    comment.hide_link = document.createElement('a');
                    comment.hide_link.textContent = LABEL_HIDE;
                    comment.hide_link.href="#";

                    comment.show_link = document.createElement('a');
                    comment.show_link.textContent = LABEL_SHOW;
                    comment.show_link.href="#";
                    comment.show_link.style.display = 'none';

                    comment.rating_link = document.createElement('a');
                    comment.rating_link.textContent = LABEL_RATING;
                    comment.rating_link.href="#";

                    comment.date_link = document.createElement('a');
                    comment.date_link.textContent = LABEL_DATE;
                    comment.date_link.href="#";
                    comment.date_link.style.display = 'none';

                    comment.sep_span = document.createElement('span');
                    comment.sep_span.textContent = ' ';

                    comment.num_span = document.createElement('span');
                    comment.num_span.title = TITLE_NUMBER; 
                    comment.num_span.textContent = ' (' + comment.childrenCount() + ')';

                    comment.rating_span = document.createElement('span');
                    comment.rating_span.title = TITLE_RATING; 
                    comment.rating_span.textContent = ' [' + comment.childrenRating() + ']';

                    comment.indent_span = document.createElement('span');
                    comment.indent_span.title = TITLE_INDENT; 
                    comment.indent_span.textContent += ' {' + comment.indent + '}';


                    var span = document.createElement('span');
                    span.style.paddingRight = '3px';
                    if (comment.children.length > 0) {
                        span.appendChild(comment.hide_link);
                        span.appendChild(comment.show_link);
                        span.appendChild(comment.sep_span);
                        span.appendChild(comment.rating_link);
                        span.appendChild(comment.date_link);
                        span.appendChild(comment.num_span);
                        span.appendChild(comment.rating_span);
                    }
                    if (comment.indent > 8) {
                        span.appendChild(comment.indent_span);
                    }

                    d.appendChild(span);

                    function onShow(event) {
                        comment.show(); 
                        if (localStorage) {
                            localStorage.removeItem('lt_hide#' + comment.div.id);
                        }
                        event.preventDefault(); 
                        return false; 
                    }

                    function onHide(event) { 
                        comment.hide(); 
                        if (localStorage) {
                            localStorage.setItem('lt_hide#' + comment.div.id, Comment.HIDE);
                        }
                        event.preventDefault(); 
                        return false; 
                    }

                    function onRating(event) {
                        comment.sort(Comment.SORT_RATING, Comment.DSC);
                        if (localStorage) {
                            localStorage.setItem('lt_sort#' + comment.div.id, Comment.SORT_RATING);
                        }
                        event.preventDefault(); 
                        return false; 
                    }

                    function onDate(event) {
                        comment.sort(Comment.SORT_DATE, Comment.DSC);
                        if (localStorage) {
                            localStorage.removeItem('lt_sort#' + comment.div.id);
                        }
                        event.preventDefault(); 
                        return false; 
                    }

                    comment.hide_link.addEventListener('click', onHide, true);
                    comment.show_link.addEventListener('click', onShow, true);
                    comment.rating_link.addEventListener('click', onRating, true);
                    comment.date_link.addEventListener('click', onDate, true);

                    break;
                }
            }
        }

    }

    Comment.prototype.sort = function(what, order) {

        var div = document.getElementById("js-commentsHolder");
        if (div) {
            sort(this);
        }

        function sort(comment) {

            if (comment.children.length > 0) {
                comment.rating_link.style.display = what == Comment.SORT_DATE ? 'inline' : 'none';
                comment.date_link.style.display = what == Comment.SORT_RATING ? 'inline' : 'none';
            }

            comment.children.sort(sortFunc);

            var last = comment;
            for (var i = 0; i < comment.children.length; i++) {
                var child = comment.children[i];
                insertAfter(div, child.div, last.div.parentNode == div ? last.div : null);
                last = sort(child);
            }
            return last;
        }

        function insertAfter(div, newNode, refNode) {
            div.insertBefore(newNode, refNode ? refNode.nextSibling : refNode);
        }

        function sortFunc(a, b) {
            var mul = order == Comment.ASC ? -1 : 1;
            var ret = 0;
            switch (what) {
                case Comment.SORT_RATING: 
                    ret = b.rating - a.rating; 
                    break;
                case Comment.SORT_DATE: 
                    ret = a.date > b.date ? 1 : (a.date < b.date ? -1 : 0); 
                    break;
            }
            return ret * mul;
        }
    }

    var post = null;
    var comments = new Array();

    function hide_show() {
        var divs = document.getElementsByTagName('div');
        var stack = new Array();
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];

            if (div.className.indexOf('post') > -1) {
                if (div.className.indexOf('ord') > -1) {
                    post = new Comment(div);
                } else if (div.className.indexOf('tree') > -1) {
                    var comment = new Comment(div);
                    var prev = stack.pop();
                    if (comment.getIndent() == 0) {
                        comments.push(comment);
                    }
                    if (prev) {
                        if (comment.getIndent() > prev.getIndent()) {
                            prev.children.push(comment);
                            stack.push(prev);
                        } else {
                            while (prev && comment.getIndent() <= prev.getIndent()) {
                                prev = stack.pop();
                            }
                            if (prev) {
                                prev.children.push(comment);
                                stack.push(prev);
                            }
                        }
                    }
                    stack.push(comment);
                }
            }
        }

        if (post) {
            post.children = comments;
            post.updateSpans();
        }
    }

    var LABEL_HIDE = 'скрыть';
    var LABEL_SHOW = 'показать';
    var LABEL_DATE= 'по дате';
    var LABEL_RATING = 'по рейтингу';

    var TITLE_NUMBER = 'общее количесто комментариев под данным';
    var TITLE_RATING = 'общий рейтинг комментариев под данным';
    var TITLE_INDENT = 'уровень этого комментария';

    function onLoad() {
        hide_show();
    }

    /*window.addEventListener('load', onLoad, false);*/
    try { 
        onLoad(); 
    } catch (err) {
        if (GM_log !== null) {
            GM_log(err);
        }
    }

})();
