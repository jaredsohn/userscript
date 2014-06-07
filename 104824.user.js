// ==UserScript==
// @name           es-diary-enhanced
// @namespace      es-internal-web-plugin
// @include        http://webapps.es.gk-software.com:8080/web-work-diary/webDiary/entryForm
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        http://cdn.jquerytools.org/1.2.5/tiny/jquery.tools.min.js
// ==/UserScript==

jQuery.noConflict();
jQuery(document).ready(function ($) {
  // tooltip part
  $('head').append('<style>.tooltip {display:none; background-color:white; color:black; padding:4px; font-size:13px; -moz-box-shadow: 2px 2px 11px #666; -webkit-box-shadow: 2px 2px 11px #666;}</style>');
  $('head').append('<style>.mark {background-color:#ffa; border:1px solid #cc9;}</style>');
  $('option').each( function() {
    $(this).attr('title', $(this).text().replace(/^(\(\d* ?\)) ?(.*)/, '$2 $1'));
    $(this).tooltip({
      effect: 'toggle',
      delay: 0,
      position: 'center right',
      offset: [0, 10],
    });
  });
  $('option').mouseenter( function() {
    $(this).addClass('mark');
  });
  $('option').mouseleave( function() {
    $(this).removeClass('mark');
  });
  
  // filtering part
  $('head').append('<style>option {padding-left: 10px; padding-top: 2px; padding-bottom: 2px; border:1px solid white;}</style>');
  $('head').append('<style>#rightContent {position: absolute; top: 0px; bottom: 0px; left: 325px; right: 0px; width: auto; height: auto; padding: 5px; margin-right: -85px;}</style>');
  // changing width of taskName div
  $('#taskName').width($('#taskName').width() + 80);
  $('#rightContent').width($('#rightContent').width() - 80);
  $('#taskNameSelect').before('<label id="filterLabel" for="filter">Filter:</label> <input id="filter" value="" autocomplete="off"/>');
  $('#filter').width($('#taskNameSelect').width() - $('#filterLabel').width() - 10);
  $('#taskNameSelect').height($('#taskNameSelect').height() - $('#filter').height() + 13);
  var filterTaskList = [];
  var selectedIndex = 0;
  var index;
  $('#taskNameSelect option').each(function() {
    var id = this.value;
    var optionId = 'task_' + id;
    var text = $(this).text().replace(/^(\(\d* ?\)) ?(.*)/, '$2 $1');
    $(this).text(text); // switch the number
    index = filterTaskList.length;
    filterTaskList[index] = {
      id: id,
      optionId: optionId,
      text: text,
      isShown: true
    };
    $(this).attr('id', optionId);
  });
  
  function escapeRegex(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  
  function replaceWildcards(value) {
    return value.replace(/\\([\*\?])/g, '.$1');
  }
  
  $('#filter').keyup(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code != 13 && code != 37 && code != 38 && code != 39 && code != 40) {
      var term = this.value;
      if (term.length > 0) {
        var matcher = new RegExp('(' + replaceWildcards(escapeRegex(term)) + ')', 'i');
        
        for (var i in filterTaskList) {
          var task = filterTaskList[i];
  
          if (matcher.test(task.text)) {
            if (!task.isShown) {
              $('#' + task.optionId).show();
              task.isShown = true;
            }
          } else if (task.isShown) {
            $('#' + task.optionId).hide();
            task.isShown = false;
          }
        }
      } else {
        for (var i in filterTaskList) {
          var task = filterTaskList[i];
  
          if (!task.isShown) {
            $('#' + task.optionId).show();
            task.isShown = true;
          }
        }
      }
    }
  });
  $('#filter').keypress(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      return false;
    } else if (code == 38) {
      getNextPrev(false);
    } else if (code == 40) {
      getNextPrev(true);
    }
  });
  
  var visibleQuery = 'option[id^=task_]:visible';
  var selectedQuery = visibleQuery + ':selected';
  function getNextPrev(next) {
    var selected = $(selectedQuery);
    var elem;
    if (selected.length === 0) {
      elem = $(visibleQuery);
      elem = (next === true ? elem.first() : elem.last());
    } else {
      elem = (next === true ? selected.nextAll(visibleQuery) : selected.prevAll(visibleQuery)).first();
      if (elem.length === 0) {
        elem = (next === true ? selected.parent().next() : selected.parent().prev());
        elem = (next === true ? elem.children(visibleQuery).first() : elem.children(visibleQuery).last());
      }
    }
    if (elem.length !== 0) {
      selectTask(elem.attr('id'));
    }
  }
  
  function selectTask(id) {
    $('#' + id).attr('selected', 'selected');
    $('#newTaskId').val(id);
	  $('#taskNameShow').val($('#' + id).text());
  }
});
