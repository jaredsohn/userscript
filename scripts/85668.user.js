// ==UserScript==
// @name          AltLUG — Unread posts missing icons fix.
// @namespace     http://userscripts.org/users/sharkman
// @description   Adds small icons to unread posts on AltLUG
// @copyright     2010+, Sharkman (http://userscripts.org/users/sharkman)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.2
// @include http://altlug.ru/phpbb/search.php?search_id=unreadposts*
// @require  http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

window.addEvent('domready', function() {
  $$('#wrapcentre form table.tablebg tbody tr td p.gensmall').each(function(el, idx) {
    $(el).getParent().getFirst().adopt(
      new Element('img', {
        'height': 9,
        'width': 11,
        'title': 'Перейти к первому непрочитанному сообщению',
        'alt': 'Перейти к первому непрочитанному сообщению',
        'src': './styles/prosilver/imageset/icon_topic_newest.gif'
      })
    );
  });
});
