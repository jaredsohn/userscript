// ==UserScript==
// @name           OkCupid comment form fixer
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Makes the journal commenting layout and experience a bit less painful by rearranging page elements so they don't overlap as much and jump around as you navigate.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @include        http://www.okcupid.com/*/journal*
// @unwrap
// ==/UserScript==

GM_addStyle(<><![CDATA[
/* make the comment field inline */
div.comment_wrap div.comment_add {
  padding-bottom: 45px;
  position: static;
}

/* stuff needed to cater the reordering of DOM nodes for above */
div.comment_wrap div.own_post_actions.mini_actions p a {
  line-height: 21px;
  height: auto;
}

/* stuff needed to cater the switched position of comments and action panel */
.journal_actions {
  clear: left;
  margin-top: -5px;
}
div.comment_load_shell {
  margin-top: 10px;
}
]]></>.toString());

// fix up so the comment form gets inlined with content instead of overwriting:
$x('//div[@class="journal_actions"]').forEach(rearrange_icons);

// show the comments _before_ the panel with "Add a Comment" et c
for each (var comments in $x('//div[@class="comment_load_shell"]')) {
  var pane = $X('preceding-sibling::div[@class="journal_actions"]', comments);
  node({ tag: comments, before: pane });
}


function rearrange_icons(div) {
  var to = $X('div[@class="comment_wrap"]/ul[@class="mini_actions"]', div);
  var ul = $X('ul[@class="journalBlog mini_actions"]', div);
  node({ after: to, tag: ul });
  var me = $X('div[contains(@class,"mini_actions")]', div);
  if (me) {
    node({ after: to, tag: me });
    me.style.marginLeft = "8px";
  } else {
    hide($X('following-sibling::div[not(@class)]'));
    $X('li', ul).style.marginLeft = "8px";
  }
}

function hide(node) {
  if (node) node.style.display = "none";
}