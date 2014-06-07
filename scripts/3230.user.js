/*
 * Author : Lee, Joon (alogblog.com at gmail.com)
 * Link : http://alogblog.com/movabletype/plugins/greasemonkey_script_google_reader_blogthis2me/
 * Version : 1.0
 * Date : 2006/02/15
 */
 
// ==UserScript==
// @name           Google Reader's BlogThis2Me
// @namespace      http://alogblog.com/greasemonkey/BlogThis2Me
// @description    Blog a current feed's entry to my blog(not default Blogger.com's).
// @include        http://www.google.tld/reader/*
// ==/UserScript==

(function () {

  var w = unsafeWindow;
  var varTitle;
  var varHref;
  var varText;
  var winWidth;
  var winHeight;
  var myURL;

/***************************************************** MovableType 3,2
  varTitle = 'link_title';
  varHref = 'link_href';
  varText = 'text';
  winWidth = 540;
  winHeight = 750;


  // Customize 'myURL' variable.
  // bm_show=t(trackback),c(category),ac(allow comments),ap(allow pings),
  //      cb(convert breaks),e(excerpt),m(more text),k(keywords),b(basename)


  myURL = 'http://example.com/mt/mt.cgi?is_bm=1&__mode=view&_type=entry&bm_show=t,c,ac,ap,cb,e,m,k,b';
*********************************************************************/


/********************************************************** WordPress
  varTitle = 'popuptitle';
  varHref = 'popupurl';
  varText = 'text';
  winWidth = 600;
  winHeight = 540;


  // Customize 'myURL' variable.
  myURL = 'http://example.com/wp-admin/bookmarklet.php?';
*********************************************************************/


/************************************************* General Blog System
  If your blog's bookmarklet URL is
    'http://example.com/blog.cgi?...foo=bar&XXX=TITLE...&YYY=URL...&ZZZ=TEXT...',
  then your settings will be like

    varTitle = 'XXX';
    varHref = 'YYY';
    varText = 'ZZZ';
    winWidth = 600;
    winHeight = 540;
    myURL = 'http://example.com/blog.cgi?...foo=bar';

*********************************************************************/


  // Don't edit below lines unless you know what those mean.
  function _ac_(a,b,c) {

    if(!myURL) { alert("You didn't configure this in Tool/Manage User Scripts..."); exit; }
    return [myURL, '&' , varTitle, '=', w.z(a), '&', varHref, '=', w.z(b), '&', varText, '=', w.z(c)].join("");
  }

  w.q.prototype.ac = function() {
    w.sc(_ac_(this.Ya(),this.Za(),this.jc()),"readerblogthis",winWidth,winHeight,true,true,false,w._MSG_POPUP_BLOCKED);
  }

})();
