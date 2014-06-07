// ==UserScript==
// @name           RTM/Gmail create task in current list
// @namespace      http://brandt.kurowski.net/2008/12/09/listrtmgmail
// @description    When using the Remember the Milk Firefox extension for Gmail, if your view is set to a specific list, this script forces new tasks to be created in that list (instead of the default list).
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

if (document.location == top.location) {
  (function(){
    var RTM = unsafeWindow.RTM;
    if (!RTM || !RTM.getInstance() || !RTM.getInstance().getExt()) {
      setTimeout(arguments.callee, 1000); // wait 1 sec if RTM not yet available
    } else {
      var data = RTM.Data;
      var rtm = RTM.getInstance();
      var ext = rtm.getExt();

      // ideally we could do something like this to set the list on creation, but AFAICT it's not possible:
/*
      ext.taskAddWithoutListId = ext.taskAdd;
      ext.taskAdd = function(params) {
        data.lists_.forEach(function(list) {
          if (ctx == 'list:' + list[1] || ctx == 'list:"' + list[1] + '"') {
            params['l'] = list[0];
          }
        });
        unsafeWindow.console.log(params);
        this.taskAddWithoutListId(params);
      };
*/

      // so instead we set the list after creation (plus we fake the data returned to the UI to pretend the list was set from the start)
      var input = rtm.getTaskList().getInput();
      input.onAddSuccessWithoutListId = input.onAddSuccess; // yeah, we pollute their namespace, sosumi.
      input.onAddSuccess = function(task) {
        var ctx = data.prefs_.ctx;
        var params = unsafeWindow.RTM.UI.TaskCard.extractParamsFromTask(task);
        data.lists_.forEach(function(list) {
          if (ctx == ('list:' + list[1]) || ctx == ('list:"' + list[1] + '"')) {
            params["value"] = list[0]; // for call to task/set-list
            task["list_id"] = list[0]; // for old onAddSuccess
          }
        });
        if (params["value"]) {
          setTimeout(function() {
            ext.callMethod("task/set-list", params, true);
          }, 0);
        }
        this.onAddSuccessWithoutListId(task);
      }
    }
  })();
}
