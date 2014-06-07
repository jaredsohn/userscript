// ==UserScript==
// @name            Hacker News keyboard friendly
// @description     Only article and comment link are TAB-navigable. They also open in the new tab on ENTER. Also some CSS additions for better readability.
// @icon            http://ycombinator.com/favicon.ico
// @version         0.1.2
// @namespace       http://jakub-g.github.com/
// @author          http://jakub-g.github.com/
// @downloadURL     https://raw.github.com/jakub-g/greasemonkey-userscripts/master/hackernews/keyboardFriendly.js
// @userscriptsOrg  http://userscripts.org/scripts/show/150620
// @grant           none
// @include         http*://news.ycombinator.com/
// @include         http*://news.ycombinator.com/news*
// @include         http*://news.ycombinator.com/over*
// @include         http*://hackerne.ws/
// @include         http*://hackerne.ws/over*
// @include         http*://hackerne.ws/news*
// ==/UserScript==

/*
* Features:
* 1. Only the item link and the comments link are tab-navigable.
* 2. All links have target=_blank added.
*
* Use flow:
* 1. TAB-navigate (browser's default) to find interesting stories.
* 2. Click ENTER, you'll open in a new page (CTRL-ENTER works even without this script).
* 3. When you're done, CTRL-W to close the tab.
* 4. Go to 1 (you still have the focus on the last active link).
* 5. SHIFT-TAB to navigate backwards (browser's default).
*
* Side hints for keyboard usage in Firefox:
* 1. Use UP and DOWN arrows to scroll (or SPACE / SHIFT-SPACE).
* 2. You can also enable caret browsing (F7) and then use the arrows to move over the page
*    just like in the text editor.
*    The links will be highlighted as you go, click ENTER to open a link in the new tab.
*    You can also use CTRL+(LEFT|RIGHT), or END, to quickly reach the "comment" link in caret mode.
* 3. Firefox has a not so widespread but cool feature "Search (in links only)".
*    You can save a few TAB presses by clicking ' (apostrophe) and typing a text from the link.
*    Then, press ESC (or wait a few seconds) to get the focus on the link.
*    Unfortunately, this finds the first link (starting from the current caret position),
*    and there's no option of continuing the search to the next match.
*
* Compatibility:
* 1. I only test with Firefox-newest and GreaseMonkey-newest (stable).
*    Feel free to fork and port (or contact me, open an issue/pull request on GitHub)
*    if it doesn't work in Chrome/Opera etc.
* 2. If new Fx/GM (or PG;) break the script, I'll try to update the script ASAP.
*
* Known issues:
* 1. Outlines are not pixel-perfect laying around the links in Firefox,
*    and borders look nicer, but I wanted to keep it simple (borders
*    affect the whole layout, outlines are placed on top and do not interfere
*    with anything; the CSS to add borders only to a subset of links will be
*    more complicated, since HN doesn't use much semantics in the markup).
* 2. If you drag a link from mouse, and then TAB-navigate to the other link,
*    you will have two links highlighted. I believe this is a bug in Firefox.
*    I've opened a ticket in Bugzilla: https://bugzilla.mozilla.org/show_bug.cgi?id=776173
*    However, other browsers are also quite inconsistent in the behavior.
*    Chrome is the only consistent browser, but it treats :focus and :active
*    slightly different than Firefox does.
*/

(function(){
   function _addCss(sCss){
      var dStyle = document.createElement('style');
      dStyle.type = 'text/css';
      dStyle.appendChild(document.createTextNode(sCss));
      document.getElementsByTagName('head')[0].appendChild(dStyle);
   }

   function addStyles(){
      // make activated links more visible
      var sCss = '\
         a:link:focus     {background-color:lime !important; color:black !important; outline: 2px solid black !important;}\
         a:link:active    {background-color:red  !important; color:white !important; outline: 2px solid white !important;}\
         a:visited:focus  {background-color:#999 !important; color:#666  !important;}\
         a:visited:active {background-color:#666 !important; color:#999  !important;}\
      '; // note: we can set a color/bgcolor value for :visited only by overriding an existing value for :link.
         // we can't override anything else (security reasons)

      // make visited links even less eye-catching
      // I prefer either #0d0 (light green) or #828282 (gray)
      sCss += '\
         a:visited{color:#aaa !important;}\
      ';

      // make the domain of currently highlighted item more visible
      sCss += '\
         a:link:focus  + span.comhead,\
         a:link:active + span.comhead {background-color:black !important; color:lime !important; border:2px solid black; margin-left:5px;}\
      '; // sadly, sibling selector with 'a:visited' doesn't work also (security reasons)
      _addCss(sCss);
   }
   function deTabIndex(selector){
      var aLinks = document.querySelectorAll(selector);
      for(nIdx in aLinks){
         dLink = aLinks[nIdx];
         dLink.tabIndex = -1;
      }
   }
   function deTabIndexOne(selector){
      var dLink = document.querySelector(selector);
      dLink.tabIndex = -1;
   }
   function addLinkTargetBlank(selector){
      var aLinks = document.querySelectorAll(selector);
      for(nIdx in aLinks){
         dLink = aLinks[nIdx];
         dLink.target = "_blank";
      }
   }

   deTabIndex('a[href^="user"], a[href^="vote"], .pagetop > a');
   deTabIndexOne('.pagetop > b > a');
   deTabIndexOne('a[href="http://ycombinator.com"]');
   addLinkTargetBlank('a');
   addStyles();
})();
