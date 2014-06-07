// ==UserScript==
// @name        mlmb
// @namespace   http://thinkingoutquiet.wordpress.com/
// @description Media Lens Message Board - add-on to improve the usability of the board 
// @include     http://members5.boardhost.com/medialens/
// @include     http://members5.boardhost.com/medialens/index*
// @include     http://members5.boardhost.com/medialens/thread*
// @include     http://members5.boardhost.com/medialens/msg*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @version     4
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==


// Global variables

var url = window.location.href;
var indexPage = (url == "http://members5.boardhost.com/medialens/" || url.substr(0,45) == "http://members5.boardhost.com/medialens/index");
var threadPage = (url.substr(0,46) == "http://members5.boardhost.com/medialens/thread");
var msgPage = (url.substr(0,43) == "http://members5.boardhost.com/medialens/msg");

var threadName = '';
var threadSubList = '';
var threadList = '';
var filter = GM_getValue("var-filter","all");
var option_filter_enabled = GM_getValue("var-option-filter-enabled",true);
GM_setValue("var-option-filter-enabled",option_filter_enabled);
var option_markers_enabled = GM_getValue("var-option-markers-enabled",true);
GM_setValue("var-option-markers-enabled",option_markers_enabled);
var option_hide_quoted_text = GM_getValue("var-option-hide-quoted-text",true);
GM_setValue("var-option-hide-quoted-text",option_hide_quoted_text);
var option_collapse_threads = GM_getValue("var-option-collapse-threads",true);
GM_setValue("var-option-collapse-threads",option_collapse_threads);
var option_collapse_sub_threads = GM_getValue("var-option-collapse-sub-threads",true);
GM_setValue("var-option-collapse-sub-threads",option_collapse_sub_threads);
var option_collapse_read_messages = GM_getValue("var-option-collapse-read-messages",true);
GM_setValue("var-option-collapse-read-messages",option_collapse_read_messages);
var option_highlight_all_read = GM_getValue("var-option-highlight-all-read",true);
GM_setValue("var-option-highlight-all-read",option_highlight_all_read);
var option_view_thread_link = GM_getValue("var-option-view-thread-link",true);
GM_setValue("var-option-view-thread-link",option_view_thread_link);

// Styles

var styles = '<style>' +
'div#mlmb_options {display:none; position:fixed; left:50%; width:450px; margin-left:-225px; top:100px; border:2px solid #000; background-color:#cef; padding:5px; font-family:sans-serif;}' +
'div#mlmb_options a.close {padding:2px 4px; float:right; text-decoration:none; border:1px solid #000; font-weight:bold;}' +
'div#mlmb_options p {margin:0 0 4px 0;}' +
'div#mlmb_options p.sub {margin-left:16px;}' +
'div#mlmb_options a.reload {font-weight:bold;}' +
'div#mlmb_options a:visited.reload {color:#00f;}';

if (indexPage) {
  styles += 'body {background-color:#eee; margin-left:30px; }' +
    'table#linkstable table td {vertical-align:top;}' +
    'span.collapseButton {font-size:12px; margin-right:8px; padding: 0 5px; background-color:#f88; border:1px solid #000; cursor:pointer;}' +
    'span.expandButton {font-size:12px; margin-right:8px; padding: 0 5px; background-color:#8f8; border:1px solid #000; cursor:pointer;}' +
    'form.threadFilter {margin-right:8px;}' +
    'div.threadButtons {position:absolute; left:-74px; width:62px;}' +
    'div.threadButtons span {float:right; margin-right:4px; padding:0 5px;}' +
    'span.toggleButton {background-color:#8f8; border:1px solid #000; cursor:pointer; font-weight:bold;}' +
    'span.markRead {color:#fff;}' +
    'span.closed {background-color:#f88;}' +
    'span.viewThreadLink {padding-left:20px; display:none;}' +
    'span.starButton {color:#999; width:10px; text-align:center; background-color:#fff; border:1px solid #777; cursor:pointer;}' +
    'span.starred {background-color:#07f; color:#fff; border-color:#000;}' +
    'span.ignored {background-color:#999; color:#fff;}' +
    'table#linkstable + ul > li {position:relative; list-style: none; background-color:#fff; margin-bottom:8px; padding:6px; border-left:8px solid #fff; border-right:8px solid #fff;}' +
    'table#linkstable + ul > li.posted {border-left-color: #f00; border-right-color: #f00;}' +
    'table#linkstable + ul > li.starred {border-left-color: #07f;}' +
    'table#linkstable + ul > li.ignored {border-left-color:#eee; border-right-color:#eee; background-color:#eee;}';

}

styles += 'span.subCollapse {background-color:#8f8;padding-left:4px;padding-right:4px;cursor:pointer;}' +
'span.subClosed {background-color:#f88;}'; 

if (threadPage || msgPage) {
  styles += 'div.toggleQuotedButton {font-size: 11px; cursor:pointer; background-color:#f88; display:inline-block; border:1px solid #000; padding: 2px 4px; margin: 4px 0 8px 0;}' +
    '.quoteBlock {display:none;}';
}

if (threadPage) {
  styles += 'div#fullThreadControls {font-family:sans-serif; position:fixed; top:10px; right: 10px;}' +
    'div.collapseButton {font-size:14px; margin-bottom:6px; padding: 0 5px; background-color:#f88; border:1px solid #000; cursor:pointer;}' +
    'div.expandButton {font-size:14px; margin-bottom:6px; padding: 0 5px; background-color:#8f8; border:1px solid #000; cursor:pointer;}';
}

styles += '</style>';


// Functions

function getThreadInfo(t) { // t is a button span
  threadName = t.parent().next('a').attr('name');
  threadSubList = t.parent().parent().children("ul");
  threadList = t.parent().parent();
}

function toggleThread(t) {
  getThreadInfo(t);
  threadSubList.toggle();  
  t.toggleClass("closed");
  t.parent().parent().find("span.viewThreadLink").toggle();
  GM_setValue(threadName, !t.hasClass("closed"));
}

function restoreMarkers(t) { 
  getThreadInfo(t);

  var star = GM_getValue(threadName + "-star", "");

  switch (star) { // restores starred & ignored threads
    case "*":
      t.addClass("starred");
      t.html("*");
      threadList.addClass('starred');
      break;
    case "i":
      t.addClass("ignored");
      t.html("i");
      threadList.addClass('ignored');
      break;
  }
}

function restoreThread(t) { 
  getThreadInfo(t);
  if (!GM_getValue(threadName, true)) { // assumes thread is open, and (potentially) closes it
    threadSubList.toggle();  
    t.toggleClass("closed");
    t.parent().parent().find("span.viewThreadLink").toggle();
  };
}

function collapseThread(t) {
  getThreadInfo(t);
  threadSubList.hide();  
  t.addClass("closed");
  t.parent().parent().find("span.viewThreadLink").show();
  GM_setValue(threadName, false);
}

function expandThread(t) {
  getThreadInfo(t);
  threadSubList.show();  
  t.removeClass("closed");
  t.parent().parent().find("span.viewThreadLink").hide();
  GM_setValue(threadName, true);
}

function cycleStarred(t) {
  getThreadInfo(t);
  if (t.hasClass("starred")) { // cycle to ignored
    threadList.addClass('ignored').removeClass('starred');
    t.addClass('ignored').removeClass('starred');
    t.html("i");
    GM_setValue(threadName + "-star", "i");
  }
  else if (t.hasClass("ignored")) { // cycle to neutral
    threadList.removeClass('ignored');
    t.removeClass('ignored');
    t.html("&nbsp;");
    GM_deleteValue(threadName + "-star");
  }
  else { // cycle to starred
    threadList.addClass('starred');
    t.addClass('starred');
    t.html("*");
    GM_setValue(threadName + "-star", "*");
  }
}

function changeFilter(t) {
  filter = t.attr("value");
  GM_setValue("var-filter", filter);
  $("span.starButton").each(function() {applyFilter($(this))});
  $("form.threadFilter select").blur();
}

function applyFilter(t) {
  var list = t.parent().parent();
  switch (filter) {
    case "all":
      list.show();
      break;
    case "hide_ignored":
      if (list.hasClass("ignored")) {
        list.hide();
      }
      else {
        list.show();
      }
      break;
    case "starred":
      if (list.hasClass("starred")) {
        list.show();
      }
      else {
        list.hide();
      }
      break;
    case "contributed":
      if (list.hasClass("posted")) {
        list.show();
      }
      else {
        list.hide();
      }
      break;
  } 
}


// Main code

$(document).ready(function() { 

  // Add global styles
  $("head").append(styles);

  // Options
  $("body center font[size=2]").html($("body center font[size=2]").html().replace(']','| <a href="" id="mlmb_options_link">add-on options</a> ]'));
  $("a#mlmb_options_link").click(function() {$("#mlmb_options").toggle(); return false;});
  var options = '<div id="mlmb_options"><form><a href="" class="close">X</a>' +
  '<p><b>mlmb script v4 options</b> | <a href="http://thinkingoutquiet.wordpress.com/mlmb-add-on/" target="_blank">see website for details</a></p><hr>' +
  '<p><input type="checkbox" name="collapse-threads"> Enable thread collapsing</p>' +
  '<p class="sub"><input type="checkbox" name="collapse-sub-threads"> Enable sub-thread collapsing</p>' +
  '<p class="sub"><input type="checkbox" name="view-thread-link"> Add \'View thread\' link when collapsed</p>' +
  '<p class="sub"><input type="checkbox" name="highlight-all-read"> Highlight when thread is fully read</p><hr>' +
  '<p><input type="checkbox" name="markers-enabled"> Enable thread markers (star/ignore/author)</p>' +
  '<p class="sub"><input type="checkbox" name="filter-enabled"> Enable thread filtering</p><hr>' +
  '<p><input type="checkbox" name="hide-quoted-text"> Hide quoted text</p><hr>' +
  '<p><input type="checkbox" name="collapse-read-messages"> Collapse read messages in thread view</p><hr>' +
  '<p><a href="" class="reload">Reload page to see changes</a></p>' +
  '</form></div>';

$("body").append(options);

$("#mlmb_options input").change(function() {
  setting = ($(this).attr("checked") == "checked");
  GM_setValue("var-option-" + $(this).attr("name"), setting);

  if ($(this).attr("name") == "collapse-threads" && setting == false && $('input[name="collapse-sub-threads"]').attr("checked") == "checked") {
    $('input[name="collapse-sub-threads"]').trigger("click");
  }
  if ($(this).attr("name") == "collapse-sub-threads" && setting == true && $('input[name="collapse-threads"]').attr("checked") != "checked") {
    $('input[name="collapse-threads"]').trigger("click");
  }

  if ($(this).attr("name") == "collapse-threads" && setting == false && $('input[name="view-thread-link"]').attr("checked") == "checked") {
    $('input[name="view-thread-link"]').trigger("click");
  }
  if ($(this).attr("name") == "view-thread-link" && setting == true && $('input[name="collapse-threads"]').attr("checked") != "checked") {
    $('input[name="collapse-threads"]').trigger("click");
  }

  if ($(this).attr("name") == "collapse-threads" && setting == false && $('input[name="highlight-all-read"]').attr("checked") == "checked") {
    $('input[name="highlight-all-read"]').trigger("click");
  }
  if ($(this).attr("name") == "highlight-all-read" && setting == true && $('input[name="collapse-threads"]').attr("checked") != "checked") {
    $('input[name="collapse-threads"]').trigger("click");
  }

  if ($(this).attr("name") == "markers-enabled" && setting == false && $('input[name="filter-enabled"]').attr("checked") == "checked") {
    $('input[name="filter-enabled"]').trigger("click");
  }
  if ($(this).attr("name") == "filter-enabled" && setting == true && $('input[name="markers-enabled"]').attr("checked") != "checked") {
    $('input[name="markers-enabled"]').trigger("click");
  }
});

$("#mlmb_options input").each(function() {
  if (GM_getValue("var-option-" + $(this).attr("name"),false) == true) {$(this).attr("checked","checked");}
});
$("#mlmb_options a.close").click(function() {$("#mlmb_options").hide(); return false;});
$("#mlmb_options a.reload").click(function() {location.reload(true);});


// Delete old saved thread states, to avoid filling up Firefox store
var numKeysToSave = 3000;
var keys = GM_listValues();
keys.sort();
for (var i = 0; i < (keys.length - numKeysToSave); i++) {
  GM_deleteValue(keys[i]);
}

if (indexPage) {

  // Insert thread toggle buttons & star buttons

  $("table#linkstable + ul > li").each(function() {
    var starButton = '';
    var toggleButton = '';
    var length;
    var markRead = '';
    length = $(this).find('li').length + 1;
    if (option_collapse_threads) {
      if (option_highlight_all_read) {
        if ($(this).find('a[style="color: #999999;"]').length == length) {
          markRead = " markRead";
        } 
      }
      toggleButton = '<span class="toggleButton' + markRead + '">' + length + '</span>';
      if (option_view_thread_link) {
        viewThread = '<span class="viewThreadLink"><font size="1"><a style="text-decoration: none;" href="thread/' + $(this).find('a').first().attr('name') + '.html"><font color="#000080">View thread</font></a> <font color="999999">»</font></font></span>';
        $(this).find('i').first().after(viewThread);
      }
    }
    if (option_markers_enabled) {
      starButton = '<span class="starButton">&nbsp;</span>';
    }
    $(this).prepend('<div class="threadButtons">' + toggleButton + starButton + '</div>');
  });

  if (option_collapse_threads) {
    // Insert 'collapse all' & 'expand all' buttons
    $("table#linkstable table tr").prepend('<td><span class="expandButton">Expand all</span></td>');
    $("table#linkstable table tr").prepend('<td><span class="collapseButton">Collapse all</span></td>');

    // Enable 'collapse all' and 'expand all' buttons click events
    $("span.collapseButton").click(function() {
      $("span.toggleButton").each(function() {collapseThread($(this))})
    });
    $("span.expandButton").click(function() {
      $("span.toggleButton").each(function() {expandThread($(this))})
    });

    // Enable toggle button click event
    $("span.toggleButton").click(function() {toggleThread($(this))});

    // Restore saved thread collapse states
    $("span.toggleButton").each(function() {restoreThread($(this))});
  }

  // Star, etc markers

  if (option_markers_enabled) {
    // Enable starred button click event
    $("span.starButton").click(function() {cycleStarred($(this))});
    // Flag threads with contributions from user
    var username1 = $("table#logininfo div#cookiegreeting b").html();
    var username2 = $("table#logininfo a[target=user_info] font").html();
    $("li b:contains('" + username1 + "')").closest('table#linkstable + ul > li').addClass('posted');
    $("li b:contains('" + username2 + "')").closest('table#linkstable + ul > li').addClass('posted');
    // Restore saved thread marker states
    $("span.starButton").each(function() {restoreMarkers($(this))});
  }


  // Filter

  if (option_filter_enabled) {
    // Insert filter drop-down
    var filterOptions = '<option value="all">Show All Threads</option>' +
      '<option value="hide_ignored">All Except Ignored</option>' +
      '<option value="starred">Only Starred *</option>' +
      '<option value="contributed">Only Contributed</option>';
    $("table#linkstable table tr").prepend('<td><form class="threadFilter"><select>' + filterOptions + '</select></form></td>');
    // Enable filter drop-down change event
    $("form.threadFilter select").change(function() {changeFilter($(this))});
    // Apply filter
    $("form.threadFilter select").attr("value",filter);
    $("span.starButton").each(function() {applyFilter($(this))});
  }

} // end of if indexPage


// Collapse sub-threads

if (indexPage && option_collapse_sub_threads) { // Ideally want this on msg page, but click event not working... ??
  if (indexPage) {selector = $("table#linkstable + ul > li li > ul > li");}
  if (msgPage) {selector = $("ul ul").first().find("li > ul > li");}
  selector.parent().parent().each(function() {
    var subThreadId = $(this).children("a").first().attr('href').replace(/[^0-9]/g,'');
    if (GM_getValue(subThreadId, true)) {
      $closed = '">-';
    }
    else {
      $closed = ' subClosed">+';  
    $(this).find("ul").first().hide();
    }
  $(this).prepend('<span name="' + subThreadId +'" class="subCollapse' + $closed + '</span>&nbsp;');
  $(this).css('list-style-type','none');
  $(this).css('margin-left','-18px');
  });
  $("span.subCollapse").click(function() {
    $(this).parent().find("ul").first().toggle();
    $(this).toggleClass("subClosed");
    if ($(this).hasClass("subClosed")) {
      $(this).html('+');
      GM_setValue($(this).attr('name'), false);
    }
    else {
      $(this).html('-');
      GM_setValue($(this).attr('name'), true);
    }
  });
} // End of Collapse Sub Threads


// Hide Quoted Text

if ((threadPage || msgPage) && (option_hide_quoted_text)) {
  $("td > font").each(function() {
    var a = $(this).html();
    if (!a.match(/<object/)) { // don't process text with embedded video
      a = a.replace('<p></p>','<br>'); // Make line-break before signature in br
      var htmlArray = a.split('<br>');
      var inQuoteBlock = false;
      var quoteCount = 0;
      var finishOnQuote = false;
      var inSignature = false;

      for (var i = 0; i < htmlArray.length; i++) {
        if (htmlArray[i].match(/<hr/)) { inSignature = true; }
        if (htmlArray[i].charAt(0) == ":") {
          if (!inQuoteBlock) { // First line of a quote block
            quoteCount += 1;
            htmlArray[i] = '<span class="dummyQuoteBlock' + quoteCount + '">' + htmlArray[i];
            inQuoteBlock = true;
            finishOnQuote = true;
            inSignature = false;
          }
        } 
        else {
          if (inQuoteBlock) { // End of a quote block
            if ((htmlArray[i].length > 2) && (inSignature == false)) {
              finishOnQuote = false;
            }
            htmlArray[i] = '</span>' + htmlArray[i];
            inQuoteBlock = false;
          }
          else {
            if (inSignature == false) { finishOnQuote = false; }
            inQuoteBlock = false;
          }
        }
      }
      var htmlDone;
      if (finishOnQuote) { // Hide final quote
        htmlDone = htmlArray.join('<br>');
        htmlDone = htmlDone.replace('<span class="dummyQuoteBlock' + quoteCount + '">', '<div class="toggleQuotedButton">: Show Quoted Text</div><span class="quoteBlock"><br>');
      }
      else { // Don't hide any quotes
        htmlDone = a;
      }
      $(this).html(htmlDone);
    }
  });

  // Enable Show/Hide Quote buttons
  $("div.toggleQuotedButton").click(function() {
    var block = $(this).next();
    block.toggleClass("quoteBlock");
    if (block.hasClass("quoteBlock")) {
      $(this).html(": Show Quoted Text");
      $(this).css("background-color","#f88");
    }
    else {
      $(this).html(": Hide Quoted Text");
      $(this).css("background-color","#8f8");
    }
  });
} // End of Hide Quoted Text


// Message Collapsing in Full Thread View
if (threadPage && option_collapse_read_messages) {
  $("body").append('<div id="fullThreadControls"><div class="collapseButton">Collapse all</div><div class="expandButton">Expand all</div><div style="font-size:14px;"><i>Click titles to<br>toggle individual<br>messages</i></div></div>');
  $("body").css("background-color","#eee");
  $("table p font[size=4]").parent().parent().css("background-color","#fff");
  $("table p font[size=4]").parent().parent().css("padding","5px");

  $("table p font[size=4][color=#999999]").parent().parent().find("p:eq(1)").nextAll().hide();

  $("table p font[size=4]").css("cursor","pointer");
  $("table p font[size=4]").click(function() {
    $(this).parent().parent().find("p:eq(1)").nextAll().toggle();
  });

  // Enable 'collapse all' and 'expand all' buttons click events
  $("div.collapseButton").click(function() { $("table p font[size=4]").parent().parent().find("p:eq(1)").nextAll().hide(); });
  $("div.expandButton").click(function() { $("table p font[size=4]").parent().parent().find("p:eq(1)").nextAll().show(); });

} // End of Message Collapsing in Full Thread View

});
