// ==UserScript==
// @name       Basecamp (bcx) todo number handling
// @namespace  http://git@github.com:apkudo/bcy.git
// @version    0.4.2
// @description  Used to using story numbers in your workflow from an alternative project management system (e.g. AgileZen), and having trouble adjusting to Basecamp's todo system? This userscript adds a display of the unique todo id next to each todo, and a jump box next to the top search box to allow you to jump to any todo by id. Additionally, V0.2 pulls out "[pri *]" and [orig *]" and appends with additional styling.
// @match      https://basecamp.com/*
// @require    http://d3js.org/d3.v2.min.js
// @copyright  2012+, Apkudo Inc.
// @grant      none
//
// Remove the @ from @require below if using with Firefox/greasemonkey
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var priorityColor1 = "#ff8888"
var priorityColor2 = "#ffbb88"
var priorityColor3 = "#eeff88"
var priorityColor4 = "#88ee66"
var statusColor = "#ff8888"
var todoColor = "#c0ffc0"
var originColor = "#c0c0ff"
var color = d3.scale.category20c();

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}

addTodoJump();

waitForKeyElements("span.content", addTodoId);

function todoUrl(curpath, tid) {

    var url = null;

    /* We can only jump to todo urls if we're in a project. */
    var m = /^\/([0-9]+)\/projects\/([0-9]+)\-(.+)$/.exec(curpath);
    if (m) {
        var cid = m[1];
        var pid = m[2];
        url = "/" + cid + "/projects/" + pid + "/todos/" + tid;
    }

    return url;
}

function addTodoJump() {

    /* Add todo jump box. */
    $("#jumpto input").attr("id", "jumptoi");
    $("#jumpto input").after($("<div id='jumptoid'><input type='text' data-behavior='placeholder' placeholder='#todo' data-hotkey='t'></div>"));
    $("#jumptoid").css("position", "absolute");
    $("#jumptoid").css("top", "0");
    $("#jumptoid").css("right", "0");
    $("#jumptoid").css("width", "70px");
    $("#jumptoi").css("right", "35px");
    $("#jumptoi").css("width", "200px");

    /* Jump to todo when requested. */
    $("#jumptoid").bind("keypress", function(e) {
        if (e.which == 13) {
            url = todoUrl(window.location.pathname, $("#jumptoid input").val());
            if (url) {
                window.location = url;
            }
        }
    });
}

function addTodoId(node) {

    /* Obtain todo node and associated url. */
    link = node.children("a").get(0);
    url = link.href;
    text = $(link).text(); //link.text didn't work on Chrome

    /* Extract the customer, project, and todo ids. */
    var m = /^https:\/\/basecamp.com\/([0-9]+)\/projects\/([0-9]+)\-(.+)\/todos\/([0-9]+)\-(.+)$/.exec(url);
    var cid = m[1];
    var pid = m[2];
    var tid = m[4];

    list = node.closest("article").find("span.unlinked_title").text();
    node.attr("list", list);

    completed = node.closest("div").hasClass("complete");
    node.attr("completed", completed);

    /* Do processing to add priority, origin tags */
    originStart = text.indexOf("[orig");
    origin = null;
    if (originStart != -1) {
        start = originStart + 6; /* orig tag + space */
        end = text.indexOf("]", start);
        origin = text.substring(start, end);
        text = text.substring(0, originStart - 1) + text.substring(end + 1);
        $(link).text(text);
    }

    priorityStart = text.indexOf("[pri");
    priority = null;
    if (priorityStart != -1) {
        start = priorityStart + 5; /* pri tag + space */
        end = text.indexOf("]", start);
        priority = text.substring(start, end);
        text = text.substring(0, priorityStart - 1) + text.substring(end + 1);
        $(link).text(text);
    }

    stsStart = text.indexOf("[sts");
    sts = null;
    if (stsStart != -1) {
        start = stsStart + 5; /* sts tag + space */
        end = text.indexOf("]", start);
        sts = text.substring(start, end);
        text = text.substring(0, stsStart - 1) + text.substring(end + 1);
        $(link).text(text);
    }

    /* Insert todo id node after todo node. */

    if (origin != null) {
        node.after($("<span class='pill origin' style='margin-left: 2px; background-color: " + color(origin) + "; color: " + (brightness(d3.rgb(color(origin))) < 125 ? "#eee;" : "#000;") + "'>" + origin + "</span>"));
    }

    if (priority != null) {
      var pc = priorityColor4;
      switch (priority) {
        case "1":
          pc = priorityColor1;
          break;
        case "2":
          pc = priorityColor2;
          break;
        case "3":
          pc = priorityColor3;
          break;
      }
      node.after($("<span class='pill priority' style='margin-left: 2px; background-color: " + pc + "'>" + priority + "</span>"));
    }

    if (sts != null) {
        node.after($("<span class='pill status' style='margin-left: 2px; background-color: " + statusColor + "'>" + sts + "</span>"));
    }

    if (list != null) {
        node.after($("<span class='pill list' style='margin-left: 2px; background-color: " + color(list) + "; color: " + (brightness(d3.rgb(color(list))) < 125 ? "#eee;" : "#000;") + "'>" + list + "</span>"));
    }

    node.after($("<span class='pill todoid' style='margin-left: 2px; background-color: " + todoColor + "'>#" + tid + "</span>"));

    sprintStart = text.indexOf("[sprint");
    sprint = null;
    if (sprintStart != -1) {
        start = sprintStart + 8; /* orig tag + space */
        end = text.indexOf("]", start);
        sprint = text.substring(start, end);
        text = text.substring(0, sprintStart - 1) + text.substring(end + 1);
        $(link).text(text);
    }
    
    if( sprint != null ) {
        /* Create New Section for Sprint */
        sprint_section = $("#sprint_" + sprint);

        if( !sprint_section || sprint_section.length < 1 ) {
            sprint_section = $("<li id='sprint_" + sprint + "'></li>");
            sprint_article = $("<article class='todolist'></article>");
            header_collapsed = $("<header class='collapsed_content'><h3>Sprint " + sprint + "</h3></header>");
            sprint_article.append( header_collapsed );
            sprint_section.append( sprint_article );
            ul_todos = $("<ul class='todos sprint'></ul>");
            sprint_article.append( ul_todos );
            $("ul.todolists").prepend( sprint_section );
        }

        sprint_section.find("ul.sprint").append(node.parent().parent().parent());
    }
}

function sortList( list ) {
    var items = list.find("li");
    items.sort(function(a,b){
        textA = $(a).find("span.content").find("a").text();
        textB = $(b).find("span.content").find("a").text();

        priorityPillA = $(a).find("span.pill.priority");
        priorityA = (priorityPillA && priorityPillA.length == 1) ? parseInt(priorityPillA.text()) : 0;

        priorityPillB = $(b).find("span.pill.priority");
        priorityB = (priorityPillB && priorityPillB.length == 1) ? parseInt(priorityPillB.text()) : 0;

        statusA = $(a).find("span.pill.status").text();
        statusB = $(b).find("span.pill.status").text();

        completedA = ($(a).find("span.content").attr("completed") == "true");
        completedB = ($(b).find("span.content").attr("completed") == "true");

        if( completedA < completedB ) return -1;
        if( completedA > completedB ) return 1;

        if( priorityA < priorityB ) return -1;
        if( priorityA > priorityB ) return 1;

        if( textA < textB ) return -1;
        if( textA > textB ) return 1;

        return 0;
    });

    $.each(items, function(i, li){
      list.append(li);
    });
}

/* Shamelessly clagged from http://stackoverflow.com/questions/8281441/fire-greasemonkey-script-on-ajax-request. */
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that specifies the desired element(s). */
    actionFunction, /* Required: The code to run when elements are found. It is passed a jNode to the matched element. */
    bWaitOnce,      /* Optional: If false, will continue to scan for new elements even after the first match is found. */
    iframeSelector  /* Optional: If set, identifies the iframe to search. */
)
{
    var targetNodes, btargetsFound;
    var bnewTargetsFound = false;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
        .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they are new. */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                bnewTargetsFound = true;
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );

        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }
    
    if( btargetsFound && bnewTargetsFound ) {
        $(".todos.sprint").each( function() {
            sortList($(this));
        });
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                waitForKeyElements (    selectorTxt,
                                        actionFunction,
                                        bWaitOnce,
                                    iframeSelector
                                   );
            },
                                       500
                                      );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}