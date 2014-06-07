// ==UserScript==
// @name           Metafilter favorites browser
// @include        http://*.metafilter.com/*
// @exclude        http://*.metafilter.com/
// @version        1.0
// @grant          GM_addStyle
// @icon           http://www.metafilter.com/favicon.ico
// ==/UserScript==

Global =  {
  last_tr: null        // Reference to the last TR tag in the select table that a user clicked on.
  , table_bg_color: "gray"   // Background color for the table rows.
  , table_selected_color: "green"     // BG color for the selected table row.
  , post_count_color: "white"
  , fav_count_color: "#BBD"
  , max_count: 100     // Largest possible # of favourites
  , posts: []		// Stores info about each post
  , max_favourites: 0   // Highest favourite count so far.
}

/**
 * ----------------------------------
 * Util
 * ----------------------------------
 * Various utility functions
 */
Util = {
  /**
   * Returns an array of DOM elements that match a given XPath expression.
   *
   * @param path string - Xpath expression to search for
   * @param from DOM Element - DOM element to search under. If not specified, document is used
   * @return Array - Array of selected nodes (if any)
   */
  getNodes: function(path, from) {
    from = from || document;
    var item, ret = [];
    var iterator = document.evaluate(path, from, null, XPathResult.ANY_TYPE, null);
    while(item = iterator.iterateNext()) {
      ret.push(item);
    }
    return ret;
  }

  /**
   * Deletes a DOM element
   * @param DOM element - DOM element to remove
   * @return DOM element - the removed element
   */
  , removeElement: function(element) {
     return element.parentNode.removeChild(element);
  }

  /**
   * Binds an event handler function to an object context, so that the handler can be executed as if it
   * was called using "this.<methodname>(event)", i.e. it can use "this.foo" inside it.
   *
   * @param function method - a function to execute as an event handler
   * @param Object context - the object that will be used as context for the function, as if the function had been
   *          called as context.method(event);
   * @return function - the function to pass to addEventListener
   */
  , bindAsEventHandler: function(method, context) {
    var __method = method;
    return function (event) {
      return __method.apply(context, [event]);
    }
  }
}

/*
 * Event handler for when user clicks on a row
 */
function filterPosts(evt) {
  // Find the parent <TR> tag.
  var t = evt.target;
  while(t.tagName != "TR") {
    t = t.parentNode;
  }

  // Determine its ID and extract the number from it.
  /(\d+)$/.exec(t.id);
  var max_cnt = parseInt(RegExp.$1);

  // Hide/unhide all posts that don't match the chosen fav count.
  var i = Global.posts.length;
  while(i--) {
    var is_showing = (Global.posts[i].div.style.display !== "none");
    var show = (Global.posts[i].num_favs >= max_cnt);
    if(show != is_showing) {
      Global.posts[i].div.style.display = (show ? "" : "none");
    }
  }

  // Reset the color of the previous row to be clicked on.
  if(Global.last_tr !== null) {
    Global.last_tr.style.background = Global.table_bg_color;
  }
  // Set the color of the row we just clicked on
  t.style.background = Global.table_selected_color;
  Global.last_tr = t;
}

// ---------------------------

function init() {
  // Prepare array for storing counts of how many posts have been favourited this many times.
  var counts = [];
  for(i = 0; i <= Global.max_count; i++) {
    counts[i] = 0;
  }

  // Get posts and compile them into arrays
  var re = /^\d+$/, fav_re = /\[(\d+) favorite/;
  var comments = Util.getNodes('.//div[@class="comments"]');
  var total_posts = 0;
  for(var i = 0; i < comments.length; i++) {
    var comment_div = comments[i];
    var smallcopy = Util.getNodes('.//span[@class="smallcopy"]', comment_div);
    if(smallcopy.length === 0) {
      break;
    }
    smallcopy = smallcopy[0];
    var fav_count = (fav_re.exec(smallcopy.textContent) !== null) ? Math.min(parseInt(RegExp.$1), Global.max_count) : 0;
    counts[fav_count]++;
    Global.max_favourites = Math.max(fav_count, Global.max_favourites);
    Global.posts.push({
      div: comment_div
      , num_favs: fav_count
    });

    // Remove the 2 <br>'s following this comment into the div itself and add a style so that this
    // whitespace is preserved when we hide divs.

    var first_br = comment_div.nextElementSibling;
    Util.removeElement(first_br.nextElementSibling);
    Util.removeElement(first_br);
    total_posts++;
  }

  GM_addStyle('.comments { margin-bottom: 1em; }'
              + ' .td1 {cursor: pointer; border: 1px solid white; background: ' + Global.table_bg_color+'; }'
              + ' .myhr {height: 7px ; margin-top: 2px; margin-bottom: 2px; }'
              + ' .hr1 {color:'+Global.post_count_color+'; background-color: '+Global.post_count_color+'; }'
              + ' .hr2 {color:'+Global.fav_count_color+'; background-color: '+Global.fav_count_color+'; }'
              );

  initTable(counts, total_posts);
}

/**
 * Generates the table at the top of the page
 * @param Array counts - post counts, from 0 to Global.max_total. [fav_count => # of posts]
 * @param integer total_posts - Total number of posts.
 * @return void
 */
function initTable(counts, total_posts) {
  var dummyDiv = document.createElement('div');
  var table_html = '';
  var m = Global.max_count+1, cum_total = 0;
  // Generate the table rows
  while(m-- >= 0) {
    if(counts[m] > 0 || m == 0) {
      cum_total += counts[m];
      table_html += '<tr id="filter'+ m +'" class="td1">'
        + '<td style="color: '+Global.fav_count_color+'">'
        + ((m == 0) ? "All" : m)
        + '</td><td style="color: '+Global.post_count_color+'">'
        + cum_total
        + '</td><td>'
        + '<hr noshade align="left" class="myhr hr1" width="'
        + Math.ceil(100*cum_total/total_posts)
        + '%"/>'
        + '<hr noshade align="left" class="myhr hr2" width="'
        + Math.ceil(100*(m / Global.max_favourites))
        + '%"/>'
        + '</td></tr>';
    }
  }

  // Insert table into page
  dummyDiv.innerHTML = '<table id="favs_table"'
    + ' style="margin-left:3em;width:80%;border:1px solid white;border-collapse:collapse;">'
    + '<thead><tr><th style="width:4em;">Fav count</th><th style="width:4em;"># visible posts</th><th></th></thead>'
    + '<tbody>'
    + table_html
    + '</tbody></table>';
  var page_div = document.getElementById("page");
  page_div.insertBefore(dummyDiv.firstChild, page_div.firstChild);

  // Add the event listeners.
  var rows = Util.getNodes('.//table[@id="favs_table"]/tbody/tr');
  var m = rows.length;
  while(m--) {
    rows[m].addEventListener('click', filterPosts, false);
  }
}

init();

