// ==UserScript==
// @name           Highlight stale tasks in RTM
// @description    Tasks that are a week stale are highlighted with a yellow background; those two weeks stale - a red background
// @author         Leonid Shevtsov
// @version        0.2
// @namespace      http://leonid.shevtsov.me
// @include        http://www.rememberthemilk.com/home/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//
// change this to disable highlighting in some of your lists, i.e. the Someday/Maybe list
var ignoredListNames = new Array('&gt;&gt; MAYBE');

var ignoredLists = new Array();

Array.prototype.index = function(val) {
  for(var i = 0, l = this.length; i < l; i++) {
    if(this[i] == val) return i;
  }
  return null;
}

Array.prototype.include = function(val) {
  return this.index(val) !== null;
}

function compileIgnoredLists() {
  $.each(ignoredListNames, function() {
    var name = this;
    $.each(unsafeWindow.listList.list.entries, function() {
      if (this[1] == name) {
        ignoredLists.push(parseInt(this[0]));
        return false;
      };
      return true;
    });
    return true;
  });
}


function highlightOldTasks() {
  var now_seconds = (new Date()).getTime()/1000;
  var entries = jQuery.extend(true, {}, unsafeWindow.taskList.list.hashMap);

  $('#tasks table.xtable tr.xtr').removeClass('old_1 old_2');

  $('#tasks table.xtable tr.xtr').each(function() {
    var date_due = $(this.wrappedJSObject).data('entry_date_due');

    if (typeof(date_due) == 'undefined') {
      var entry_id = parseInt(/_(\d+)$/.exec($(this).find('td.xtd_check form').attr('id'))[1]);
      if (entry_id>0) {
        var entry = entries[entry_id];
        if ((entry.date_completed != null) || ignoredLists.include(entry.list_id)) {
          date_due = -1;
        } else {
          date_due = entry.date_due==null ? (entry.date_last_modified==null ? entry.date_created : entry.date_last_modified) : entry.date_due;
        }
        $(this.wrappedJSObject).data('entry_date_due',date_due);

      }
      console.log(date_due);
    }

    if (date_due != -1) {
      var days_old = (now_seconds - date_due)/86400;
      if (days_old > 14) {
        $(this).addClass('old_2');
      } else if (days_old > 7) {
        $(this).addClass('old_1');
      }    
    };
  });
};

$(window).load(function() {
  $('head').append('<style>'+
    'tr.xtr.old_1 td.xtd_check, tr.xtr.old_1 td.xtd_text, tr.xtr.old_1 td.xtd_date, tr.xtr.old_1 td.xtd_ico, tr.xtr.old_1 td.xtd.prioN, tr.xtr.old_1 td.xtd_arr { background-color: #FFF08B !important}'+
    'tr.xtr.old_2 td.xtd_check, tr.xtr.old_2 td.xtd_text, tr.xtr.old_2 td.xtd_date, tr.xtr.old_2 td.xtd_ico, tr.xtr.old_2 td.xtd.prioN, tr.xtr.old_2 td.xtd_arr { background-color: #FFA894 !important}'+
  '</style>');
  compileIgnoredLists();
  setInterval(highlightOldTasks, 1000);

});
