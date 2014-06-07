
/*
//
// ==UserScript==
// @name          Hide Craigslist Categories
// @namespace     http://jkk.us/scripts
// @description     Hide Craigslist Categories with a Click. Link to reset filter at bottom of page.
// @include       http://*.craigslist.tld/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//
*/

/*
A craigslist row:

<p class="row">
<span>
<a href="article url">
             (article title)
         (separator dash)
<font>
             (city)
<small class="gc">
<a href="category url">
                 (category title)
<br class="c">
*/

(function() {
  var __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $(document).ready(function() {
    var append_hide_button_to_category_link, clear_omitted_hrefs, get_all_category_links_on_page, get_omitted_hrefs, hide_category, insert_omitted_href, reset_link, scan_page_and_hide_rows;
    get_omitted_hrefs = function() {
      var refs, val;
      val = GM_getValue("omitted_hrefs");
      refs = val != null ? val.split("\n") : [];
      return refs;
    };
    insert_omitted_href = function(href) {
      var hrefs;
      href = href.split('craigslist.org')[1];
      hrefs = get_omitted_hrefs();
      if ((href != null) && href !== "" && __indexOf.call(hrefs, href) < 0) {
        hrefs.push(href);
        return GM_setValue("omitted_hrefs", hrefs.join('\n'));
      }
    };
    clear_omitted_hrefs = function() {
      return GM_deleteValue("omitted_hrefs");
    };
    append_hide_button_to_category_link = function(link) {
      var hide_button;
      hide_button = $("<button>(Hide)</button>");
      hide_button.on("click", function() {
        insert_omitted_href(link.href);
        return scan_page_and_hide_rows();
      });
      return hide_button.insertAfter(link);
    };
    get_all_category_links_on_page = function() {
      return $("p small.gc a");
    };
    hide_category = function(category_href) {
      var af, href_selector;
      href_selector = "[href='" + category_href + "']";
      af = $(href_selector);
      return af.closest('p').hide();
    };
    scan_page_and_hide_rows = function() {
      var omits;
      omits = get_omitted_hrefs();
      $.each(omits, function(n, category_href) {
        return hide_category(category_href);
      });
      return null;
    };
    reset_link = $("<button>(reset hide list)</button>");
    reset_link.on("click", function() {
      clear_omitted_hrefs();
      return get_all_category_links_on_page().closest('p').show();
    });
    reset_link.appendTo('body');
    get_all_category_links_on_page().each(function(n, link) {
      return append_hide_button_to_category_link(link);
    });
    return scan_page_and_hide_rows();
  });

}).call(this);
