// ==UserScript==
// @name           RTM List Names and Links
// @description    Small enhancements for Remember the Milk- adds lists to task names, and makes list name in details pane a link
// @author         Alexis Janson
// @version        0.2
// @include        http://www.rememberthemilk.com/*
// @include        https://www.rememberthemilk.com/*
// @match          http://www.rememberthemilk.com/*
// @match          https://www.rememberthemilk.com/*
// ==/UserScript==

/*----------------------------------------------------------------------------*/

// v0.1: Initial release. List names on tasks and list names as links in details pane.
// v0.2: Added modified priority/due/overdue styles. Fixed bug where wrong list name associated with task in list when reprioritizing tasks, etc.

/* ADD LIST NAMES TO RIGHT OF TASKS */

var AddListNamesToTasks = function () {
  ListenForTasks(false);
  // brief delay in case of multiple updates
  setTimeout(function () {
    // run in page context to access globals ie stateMgr
    contentEval(function () {
      if (typeof stateMgr != 'object') {
        return;
      }

      var all = document.all ? document.all : document.getElementsByTagName('*');
      var row = 0;
      for (var i = 0; i < all.length; i++) {
        if (all[i].className == 'xtd xtd_check') {
          var task_check = all[i].firstChild.id;
          if (task_check.substr(0, 15) == 'tasks_row_form_') {
            // ID of task
            var task_id = taskList.list.reverseMap[row];
            ++row;

            // Turn ID of task into desired info
            var text_to_show = '';
            var task = stateMgr.tasks[task_id];
            if (typeof task == 'object') {
              var list_id = stateMgr.tasks[task_id].list_id;
              // If list is same as "current list", just don't show anything
              if (list_id != stateMgr.currentList) {
                var list = stateMgr.lists[list_id];
                if (typeof list == 'object') {
                  text_to_show = list.name;
                }
              }
            }

            // Locate where to display info
            var task_text_node = all[i].nextSibling;
            var info_span;
            if (task_text_node.lastChild.id == 'list_name') {
              info_span = task_text_node.lastChild;
              while (info_span.hasChildNodes()) {
                info_span.removeChild(info_span.firstChild);
              }
            }
            else {
              info_span = document.createElement("span");
              task_text_node.appendChild(info_span);
            }

            // Display that info
            info_span.id = 'list_name';
            info_span.style.color = '#888888';
            info_span.style.fontSize = '.95em';
            info_span.style.fontFamily = 'arial,sans-serif';
            info_span.style.paddingLeft = '5px';
            var content = document.createTextNode(text_to_show);
            info_span.appendChild(content);
          }
        }
      }
    });

    ListenForTasks(true);
  }, 50);
}

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

var ListenForTasks = function(listen)
{
	var tasks = document.getElementById("tasks");
	if (tasks)
	{
		if (listen)
		{
		  tasks.addEventListener("DOMSubtreeModified", AddListNamesToTasks, false);
		}
		else
		{
		  tasks.removeEventListener("DOMSubtreeModified", AddListNamesToTasks, false);
		}
	}
}

window.addEventListener('unload', function() { ListenForTasks(false)},false);

/* MAKE LIST NAMES INTO LINKS IN DETAILS PANE */

var TurnListNameIntoLink = function () {
  ListenForDetails(false);

  // run in page context to access globals ie stateMgr
  contentEval(function () {
    if (typeof stateMgr != 'object') {
      return;
    }
    var listSpan = document.getElementById("detailslist_span");
    if (listSpan) {
      var listName = listSpan.innerHTML;
      for (var list_id in stateMgr.lists) {
        if (stateMgr.lists[list_id].name == listName) {
          listSpan.innerHTML = "<a onclick=\"taskCloud.showList('" + list_id + "'); return false;\" title=\"Show list '" + listName + "'\" href=\"#section.tasks\">" + listName + "</a>";
          break;
        }
      }
    }
  });

  ListenForDetails(true);
}

var ListenForDetails = function (listen) {
  var listName = document.getElementById("detailslist");
  if (listName) {
    if (listen) {
      listName.addEventListener("DOMSubtreeModified", TurnListNameIntoLink, false);
    }
    else {
      listName.removeEventListener("DOMSubtreeModified", TurnListNameIntoLink, false);
    }
  }
}

window.addEventListener('unload', function () { ListenForDetails(false) }, false);

/* CHANGE COLOR OF PRIORITIES */

function UpdatePriorityColors()
{
  AddStyle(".taskoverdue { color: #AA0000 !important; font-weight: bold !important; text-decoration: none; }");
  AddStyle(".taskduetoday { color: black; font-weight: bold !important; }");
  AddStyle(".prio1 { background-color: #00EE00 !important; }");
  AddStyle(".prio2 { background-color: #008800 !important; }");
  AddStyle(".prio3 { background-color: #000066 !important; }");
}

function AddStyle(css) {
  if (typeof GM_addStyle != "undefined") {
	  GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
	  PRO_addStyle(css);
  } else if (typeof addStyle != "undefined") {
	  addStyle(css);
  } else {
	  var heads = document.getElementsByTagName("head");
	  if (heads.length > 0) {
		  var node = document.createElement("style");
		  node.type = "text/css";
		  node.appendChild(document.createTextNode(css));
		  heads[0].appendChild(node); 
	  }
  }
}

/* ENABLE FEATURES */

ListenForTasks(true);
ListenForDetails(true);
// UpdatePriorityColors();
