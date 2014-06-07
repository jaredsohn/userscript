// ==UserScript==
// @name        Stacks: Due Today Badge
// @version     2.0.0
// @namespace   http://usestacks.com/
// @description Adds a badge displaying the number of tasks that are due today.
// @include     *usestacks.com*
// @author      Taylor Smith of Imulus
// ==/UserScript==

$(document).ready(function () {
  if (!window.fluid) {
    return;
  };

  function updateBadge() {
    var $taskRows = $('#task_table_body tr'),
        dueCount = 0;

    $taskRows.each(function () {
      var $dueDate = $(this).children('td').eq(4).children('span').eq(0);
      if (($dueDate.text() == "Today") || ($dueDate.hasClass("overdue"))) {
        dueCount++;
      }
    });

    window.fluid.dockBadge = (dueCount > 0) ? dueCount.toString() : "";
    setTimeout(updateBadge, 1000);
  };

  function checkLoadedTasks () {
    var $taskRows = $('#task_table_body tr');
    if ($taskRows.eq(0).children('td').eq(0).text() == "Loading...") {
      setTimeout(checkLoadedTasks, 25);
    } else {
      updateBadge();
    }
  };

  checkLoadedTasks();
});
