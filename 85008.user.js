// ==UserScript==
// @name           ArsTechnica: Link to comment in forum
// @namespace      tag:brainonfire.net,2010-08-30:arstechnicalinktoforum
// @description    Add a forum permalink to each comment in a page's discussion thread
// @include        http://arstechnica.com/*comments=*
// @license        GPL
// @version        1.0
// ==/UserScript==

/** Run entire script inside page. From http://wiki.greasespot.net/Content_Scope_Runner */
if(typeof __PAGE_SCOPE_RUN__ == 'undefined') {
   (function page_scope_runner() {
      var script = document.createElement('script');
      script.setAttribute("type", "application/javascript");
      script.textContent = "(function() { var __PAGE_SCOPE_RUN__ = 'yes'; (" + page_scope_runner.caller.toString() + ")(); })();";
      document.documentElement.appendChild(script);
//      document.documentElement.removeChild(script);
   })();
   return;
}

var $comments = $('#comments');
if(comments.size() == 0) return;

var forumID = Number($comments.attr('data-forum-id'));
var topicID = Number($comments.attr('data-topic-id'));

$comments.children('.comment').each(function oneComment(i,el) {
   var $el = $(el);
   var postID = Number($(el).attr('data-post-id'));
   $el.children('.byline').append(' | <a href="/civis/viewtopic.php?f='+forumID+'&t='+topicID+'&p='+postID+'#p'+postID+'">in forum</a>');
});
