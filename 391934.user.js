// ==UserScript== //
// @name           Easily delete completed tasks on TickTick.
// @namespace      http://sergiyb.com/userscripts/
// @description    Adds a button to move all tasks from completed list to trash.
// @version        1.0.0
// @license        BSD License
// @include        http://ticktick.com/

// ==/UserScript==

$("#project_completed").click(function() {setTimeout(function() {
  var deleteCompletedBtn = $('<a id="deleteCompleted" class="pull-right action-btn power-tip"><i class="icon_home icon-clear icon-white"></a>');
  $("#task-action-bar").append(deleteCompletedBtn);
  var disabled = false;
  deleteCompletedBtn.click(function() {
    if (disabled)
      return;
    disabled = true;
    $("#deleteCompleted i").removeClass("icon-clear").addClass("icon-version");
    var deleteList = [];
    $("#task-list-content a").each(function(index, el) {
      deleteList.push(el);
    });
    var deleteNext = function() {
      if (deleteList.length > 0) {
        var e = deleteList.shift();
        e.click();
        setTimeout(function() {
          $("#task-delete-button").click();
          setTimeout(deleteNext, 500);
        }, 250);
      } else {
        disabled = false;
        $("#deleteCompleted i").removeClass("icon-version").addClass("icon-clear");
      }
    };
    deleteNext();
  });
}, 0)});
