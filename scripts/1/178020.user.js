// ==UserScript==
// @id             ebay-ui-tweaked@spiralx.org
// @name           eBay UI tweaked for sanity and profit
// @version        0.0.2
// @namespace      http://spiralx.org/ebay-ui-tweaked
// @author         James Skinner
// @description    Just a few small things to make using the site less awful before I poke my own eyes out one day.
// @icon           data:image/gif;base64,R0lGODlhEAAQAPcAAAAAnAAAzjEAYzFjADFjzjGcAGMxnGNjzmPOMZwAMZwxMZxjzpyc/84Avc5jMff39/8AAP9jY/+cMf/OMf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAA0ALAAAAAAQABAAAAiLABsEGEiwYMEGBR4oXMiQIYSEFCJKnBjxwcMHFDNSsAhRIoADEQsgoICgwMWJAQ44cCBhAAWRFyHIXBDgI4UJDgokfCgzogEBDBSwlCCSo8yjBCgomECB6EaeECJGEEAhwNACT3dCSGAgAAMAErFyxCixJgOKYzWiPalW4tiGcBVCaDChrt27dxsEBAA7
// @icon64         data:image/png;base64,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
// @match          *://www.ebay.co.uk/*
// @match          *://www.ebay.com/*
// @match          *://stores.ebay.co.uk/*
// @match          *://stores.ebay.com/*
// @match          *://recommendations.ebay.co.uk/*
// @match          *://recommendations.ebay.com/*
// @match          *://cgi.ebay.co.uk/ws/eBayISAPI.dll?ViewItem*
// @match          *://cgi.ebay.com/ws/eBayISAPI.dll?ViewItem*
// @run-at         document-end
// @priority       -1
// @require        http://code.jquery.com/jquery.min.js
// @resource       loadIcon http://dl.dropboxusercontent.com/u/222841/img/ajax-loader.gif
// ==/UserScript==

// @match          *://*.ebaydesc.co.uk/ws/eBayISAPI.dll*


; (function($, document, window, undefined) {

  var Keys = {
    BKSP: 8,
    TAB: 9,
    RET: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    BREAK: 19,
    CAPSLOCK: 20,
    ESC: 27,
    SPACE: 32,
    PGUP: 33,
    PGDN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INS: 45,
    DEL: 46,
    "1": 49,
    "2": 50,
    D: 68,
    N: 78,
    O: 79,
    Q: 81,
    T: 84,
    WIN: 91,
    CTXMENU: 93,
    F1: 112,
    BACKTICK: 192,
    BACKSLASH: 220
  };
  // Lots of utility functions.

  var fmt_operators = {
    u: encodeURIComponent,
    f: function(s) { return s.replace(/:/g, "%3A"); },
    t: function(s) { return s.trim(); }
  };

  function fmt(format, data) {
    data = arguments.length == 2 && typeof data === "object"
      ? data
      : [].slice.call(arguments, 1);

    return format
      .replace(/\{\{/g, String.fromCharCode(0))
      .replace(/\}\}/g, String.fromCharCode(1))
      .replace(/\{([^{}!]+)(?:!([a-z]))?\}/g, function(match, key_name, operator_id) {
        if (!data.hasOwnProperty(key_name)) {
          return "#ERR(" + key + ")";
        }
        var repl = String(data[key_name]),
          oper_func = fmt_operators[operator_id];
        return typeof oper_func === "function" ? oper_func(repl) : repl;
      })
      .replace(/\x00/g, "{")
      .replace(/\x01/g, "}");
  }


  var std_uri_parse = (function() {
    var parser = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;
    var queryKeyParser = /(?:^|&)([^&=]*)=?([^&]*)/g;
    var keys = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];

    return function uri_parse(url) {
      var href = url || location.href,
        m = parser.exec(href),
        urlinfo = { href: href },
        i = keys.length + 1;

      while (--i) {
        urlinfo[keys[i]] = m[i] || "";
      }

      urlinfo.queryKeys = urlinfo.keys = {};
      urlinfo.query.replace(queryKeyParser, function(match, name, value) {
        if (name)
          urlinfo.queryKeys[name] = value;
      });

      if (urlinfo.path == "") {
        urlinfo.path = urlinfo.directory = urlinfo.relative = "/";
      }

      //urlinfo.dirs = urlinfo.directory == "/" ? [] : urlinfo.directory.substr(1).replace(/\/$/, "").split("/"));
      urlinfo.dirs = urlinfo.directory.split("/").filter(function(v) { return v; });
      //urlinfo.firstdir = urlinfo.dirs.length ? urlinfo.dirs[0] : null

      return urlinfo;
    };
  })();

  // Adds sub-domain and tld from host name.
  function url_parse(url) {
    var ui = std_uri_parse(url),
      m = ui.host.match(/(?:(\w.*)\.)?ebay\.(.*)/);

    if (m) {
      ui.subdomain = m[1] || "www",
      ui.tld = m[2];
      return ui;
    }

    throw new Error("Problem parsing url '{0}'".fmt(url));
  }

  var cur_url_info = url_parse();


  var alnums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";

  function wildcard_to_regex(p) {
    return RegExp(p.split("").map(function(v) {
      if (v == "*") {
        return ".*";
      }
      else if (v == "?") {
        return ".";
      }
      else {
        return alnums.indexOf(v) == -1 ? "\\" + v : v;
      }
    }).join(""), "i");
  }


  // --------------------------------------------------------------------


  // $.fn.scrollTo=function(){return this.length>0&&this.get(0).scrollIntoView(),this};
  // $.fn.isOnscreen=function(){var a=$(this),b=a.offset().top,c=b+a.height();return c>scrollY&&scrollY+innerHeight>b};
  $.fn.extend({
    scrollTo: function() {
      if (this.length > 0) {
        this.get(0).scrollIntoView();
      }
      return this;
    },
    isOnscreen: function() {
      var $el = $(this),
        t = $el.offset().top,
        b = t + $el.height();
      return b > scrollY && t < (scrollY + innerHeight);
    }
  });


  jQuery.make_batch_func = function(method) {
    var original_method = method,
      batch_method = original_method + "s";

    if (method.contains("=")) {
      method = method.split("=");
      original_method = method[0];
      batch_method = method[1];
    }

    if (jQuery.fn[original_method] && !jQuery.fn[batch_method]) {
      jQuery.fn[batch_method] = function() {
        var args = arguments,
          $self = $(this),
          method = $self[original_method],
          results = [];

        this.each(function() {
          results.push(method.apply($self, args));
        });

        return results;
      }
    }
  }

  //" innerWidth innerHeight outerWidth outerHeight scrollLeft scrollTop"
  "attr css=styles data html offset position prop text val width height scrollTop".split(" ")
    .forEach(jQuery.make_batch_func);


  // ----------------------------------


  /**
   * Given an eBay URL, tries to extract an item ID out of it.
   */
  function get_id(url) {
    var ui = url_parse(url);

    // if ((ui.host == "www.ebay.co.uk" || ui.host == "ebay.co.uk") && ui.path.startsWith("/itm/")) {
    if (ui.subdomain == "www" && ui.dirs[0] == "itm") {
      return parseInt(ui.file);
    }
    //else if (ui.host == "cgi.ebay.co.uk" && ui.path.startsWith("/ws/")) {
    else if (ui.subdomain == "cgi" && ui.dirs[0] == "ws") {
      return parseInt(ui.keys.item);
    }
    return null;
  }


  function Item($el) {
    this.$el = $el;

    this.$t = $el.find("*[itemprop=name]");
    this.$i = $el.find("*[itemprop=image]");
    this.$p = $el.find("*[itemprop=price]");
    this.$s = $el.find(".fee");

    this.url = this.$t.attr("href");
    this.url_info = url_parse(this.url);
    this.id = this.url_info.file;

    this.name = this.$t.attr("title");
    this.thumbnail = this.$i.attr("src");

    this.price = parseFloat(this.$p.text().substr(1));
    this.shipping = this.$s.length ? parseFloat(this.$s.text().substr(2)) : 0.0;
    this.total = this.price + this.shipping;

    this.addAnchor = function(text, url) {
      this.$el.find(".mi div, .mi-l div")
        .append(fmt('<a href="{0}" class="pll ppr" style="z-index: 0;">{1}</a>', url, text));
    };
  }


  /**
   * Given an item id, generate a link to a "more like this" page for it.
   */
  function get_more_like_this_url(id, category_id, show_price) {
    if (typeof category_id === "number") {
      show_price = typeof show_price === "boolean" ? show_price : true;
    }
    else {
      show_price = typeof category_id === "boolean" ? category_id : true;
      category_id = null;
    }

    // _hprc  _aspects=LH_ItemFormat~1 (auc)  _aspects=LH_ItemFormat~1 (bin)
    var url = fmt("http://www.ebay.co.uk/mlt/IS/-/{0}?_src=1&_pvtid={0}&_spoi={1}&_hprc=8", id, show_price ? "1" : "0");

    //console.info("get_more_like_this_url(%s, %s, %s): %s", id, category_id, show_price, url);
    return url;
  }

  _MLT_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACVklEQVR42pTSTUiTARgH8P/7MX330VvaHCaWuJzmpoEVFUFRlyRobVaShNjBDhkF0aljB2kUHSSDDh26FBFBM6EgpUsfEgYqFKTp9m5zS5uzttR8v59OQekW9of/7eHHw8PDEBF67z3lmw/ubI4kZgPx5Fx9bmHRlZnPOgSrdaLGs6PnjN/bjwJhiAiDr8euTkrTwcpKV51NFAVYBUSiKUSjCUyNS/O8hbv06NaV+3mBk+euVRzY7Q37tlXvatzuYXWWg6wbyMomkukcRobHMPTylUaG7h14eHNqJcB2tR/pLi0VvbWeKtZWZIGdY+HgeFg5BuvsDtQ0NsHtrbPIqt6RbwP209T0nlJniaPYZgWBAccy4BkGHBiwRLDwRSjb7AYRczEvEImnvKLLiUXdhKybUA2CbJhQdBOGSdA1DRbeAY5jN+QD+PWiGI0l0m5BLIFiEDiGgawZWFBMLCkGZEVH9ttXKLI6mhcgMt9OfI5VuLZ6hCWFABBUw8SyaiD3U0M6nUVKimDLRrU2L5DO/LiczkgBscwpVNX6wDMsFMPEsqwhM5fD5McRzE3H0LnftBf8g9au0GFF1cLlVZW2TdVuWO0lyMwm8SUmYUaaREtDHB1te/F8MILTF+4yqwAAaO0KNdV46s4Pv3/XqMiaTxCKHU5neWIxPnB7eSZ5o7vTRP2h9tUIERXsqaM+hogQCPqPB4J+Grrjo+/jIXrQe5Z+z/wT+LOFEBZrSJu/ge0L9z8BcOL6CzfePHuM0Q/S3zdYa4Itx/YB6AEQ6gv3h/8bWJlfAwA3sVCEXC8oZwAAAABJRU5ErkJggg==";


  function get_similar_items_url(id) {
    // http://www.ebay.co.uk/sch/sis.html?_kw=Sexy+Lingerie+Ladies+Black+Faux+Leather+Erotic+Gothic+Fetish+ClubWear+Teddy+D03&_id=200911974047
  }


  /**
   * Look for description iframe in item page, get content via AJAX and replace iframe.
   */
  function unwrap_description_iframe() {
    var $ifr = $("#desc_ifr"), $d,
      src = $ifr.attr("src");

    if (!src) {
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url: $ifr.attr("src"),

      onerror: function(resp) {
        console.warn("Error loading frame src: ", src);
        console.warn("error %d: %s", resp.status, resp.statusText);
        console.log(resp.responseHeaders);
      },

      onload: function(resp) {
        // console.info("ok %d: %s: %d bytes received", resp.status, resp.statusText, r.length);

        var doc = GM_safeHTMLParser(resp.responseText);

        $("<div id='desc_div'>")
          .css("width", $ifr.width())
          .append(doc.body)
          .insertBefore($ifr);
        $ifr.hide();

        console.info("Loaded frame src: ", src);
      }
    });
  }


  // --------------------------------------------------------------------


  // For standard item pages.
  if (cur_url_info.subdomain == "www" && cur_url_info.dirs[0] == "itm" ||
    cur_url_info.subdomain == "cgi" && cur_url_info.dirs[0] == "ws") {

    // Add "More like this" link next to share buttons
    var iid = get_id(),
      mlt = get_more_like_this_url(iid),
      a = fmt("<a class='vi-VR-spl-lnk' href='{0}'><img src='{1}'></a>", mlt, _MLT_ICON);

    $("#RightSummaryPanel .share tr")
      .append("<td><div class='watchLnk'>&nbsp;|&nbsp;" + a + "</div></td>");

    // Replace description iframe with its content.
    unwrap_description_iframe();
  }


  else if (cur_url_info.subdomain == "stores") {
    GM_addStyle("span.pll, a.pll { margin-right: 12px; }");

    jQuery("table[itemscope=itemscope]")
      .each(function() {
        var item = new Item($(this));

        // Add total price value to items listed in stores with P&P specified.
        if (item.shipping > 0) {
          item.$p
            .removeClass("g-b")
            .html(fmt("<b>£{0}</b> (£{1})", item.total.toFixed(2), item.price));
        }

        // Add "More like this" link next to items.
        item.$el.find("a[onmouseover_nbt]").hide();
        item.addAnchor("More like this", get_more_like_this_url(item.id));
      });
  }


  // Click header of "See what other people are watching" to expand all items.

  GM_addStyle(".nume_vrc.nume_header:hover { cursor: pointer; }\
               .nume_vrc.sx-expanded .nume_header:hover { cursor: inherit; }");


  $("body").on("click", ".nume_vrc:not(.sx-expanded) .nume_header", function(ev) {
    var loader_src = GM_getResourceURL("loadIcon");

    $(this).parent()
      .addClass("sx-expanded")
      .find(".viewport")
        .each(function() {
          var $viewport = $(this),
            $top_table = $viewport.find(".toptable"),
            $hidden_rows = $top_table.nextAll(".remtable").find("tr");

          $hidden_rows
            .appendTo($top_table)
            .find("td[value]")
              .each(function() {
                var $td = $(this), src = $td.attr("value");

                $td
                  .find("img:not(src)")
                    .attr("src", src)
                    .end()
                  .find("div.nume_b_format:contains(Buy)")
                    .html("Buy it now")
                    .css({
                      font: "normal 14px Verdana",
                      color: "red"
                    });
              });

          $viewport.css("height", 290 * (1 + $hidden_rows.length));
        })
        .end()
      .find(".ileftArrow, .irightArrow")
        .hide();

    $("#FootPanel .nume_header").scrollTo();
  });

})(jQuery, document, window);
