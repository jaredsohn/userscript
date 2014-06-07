// ==UserScript==
// @namespace flabdablet/tdwtf
// @name unpersons
// @homepage http://userscripts.org/scripts/show/173435
// @updateURL https://userscripts.org/scripts/source/173435.meta.js
// @downloadURL https://userscripts.org/scripts/source/173435.user.js
// @match *://forums.thedailywtf.com/forums/*
// @grant none
// @version 1.0.7
// ==/UserScript==

ignore('(Ronald|PJH|Aeolun)');

function ignore(users) {
    threadsStartedBy(users).concat(quotesFrom(users)).concat(lastPostLinks(users)).forEach(remove);

    function threadsStartedBy(users) {
        var collation = [];
        var comments = commentsBy(users);
        while (comments.length) {
            collation = collation.concat(comments);
            comments = repliesTo(comments).filter(uncollated);
        }
        return collation;
        
        function uncollated(comment) {
            return collation.indexOf(comment) < 0;
        }
    }

    function quotesFrom(users) {
        return select('blockquote<div<strong>' + users + ':');
    }

    function lastPostLinks(users) {
        return select('table<tbody<tr<td.ForumSubListCellLeftMost ForumLastPost<a>' + users).
        concat(select('div.CommonDescription>Last post .*<a>' + users));
    }
    
    function commentsBy(users) {
        return select(
            'li<div.ForumPostArea<table<tbody<tr<td.ForumPostUserArea<' +
            'div.ForumPostUserContent<ul.ForumPostUserPropertyList<li.ForumPostUserName<a>' + users
        );
    }

    function repliesTo(comments) {
        return select(
            'li<div.ForumPostArea<h4.ForumPostHeader<table<tbody<tr<td<a^.*#(' +
            comments.map(getCommentID).join('|') + ')>In reply to'
        );
    }

    function getCommentID(comment) {
        return comment.firstElementChild.name;
    }

    function select(path) {
        var selector = parse(path);
        return Array.filter(document.getElementsByTagName(selector.tag), test, selector);
 
        function parse(path) {
            if (path) {
                var matches = path.match(/^([^.^><]*)\.?([^^><]*)\^?([^><]*)>?([^<]*)<?(.*)$/);
                if (matches) return {
                    tag: matches[1],
                    head: {tagName: re(1, 'i'), className: re(2), href: re(3, 'i'), innerHTML: re(4)},
                    tail: parse(matches[5])
                };
            }
            return null;

            function re(i, flags) {
                return matches[i]? new RegExp('^' + matches[i] + '$', flags): null;
            }
        }

        function test(element) {
            for (var prop in this.head) {
                if (this.head[prop] && !this.head[prop].test(element[prop])) return false;
            }
            return !this.tail || Array.some(element.children, test, this.tail);
        }
    }

    function remove(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
    }
}
