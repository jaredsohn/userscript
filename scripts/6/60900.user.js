// ==UserScript==
// @name        Stacks: Actionable Today Badge
// @version     2.0.0
// @namespace   http://usestacks.com/
// @description Adds a badge displaying the number of tasks that are actionable today.
// @include     *usestacks.com*
// @author      Taylor Smith of Imulus
// ==/UserScript==

$(document).ready(function () {
  if (!window.fluid) {
    return;
  };

  function updateBadge() {
    var $taskRows = $('#task_table_body tr'),
        actionCount = 0;

    $taskRows.each(function () {
      var $actionableDate = $(this).children('td').eq(3).children('span').eq(0);
      if ($actionableDate.text() == "Today") {
        actionCount++;
      }
    });

    window.fluid.dockBadge = (actionCount > 0) ? actionCount.toString() : "";
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
