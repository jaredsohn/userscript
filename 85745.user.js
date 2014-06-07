// ==UserScript==
// @name          ToodleDo Multi-Edit Tasks
// @namespace     http://someuniquevaluetoavoidnamespaceconflicts09851243241.net
// @description   basic <a href="https://addons.mozilla.org/firefox/addon/748" target="_blank">Greasemonkey</a> script
// @include       http://www.toodledo.com/tasks/*
// @include       http://*.toodledo.com/tasks/*
// @include       https://*.toodledo.com/tasks/*
// @exclude       http://*.toodledo.com/slim*
// @exclude       https://*.toodledo.com/slim*
// ==/UserScript==

var POSTPONE_DAYS = 1; // default days to postpone
var DEBUG = 0; // log messages to javascript console
var PRIORITY_NEGATIVE = -1;
var PRIORITY_LOW = 0;
var PRIORITY_MEDIUM = 1;
var PRIORITY_HIGH = 2;
var PRIORITY_TOP = 3;
var RENAME_TAG_SPLIT_STRING = "//";
var TZ_OFFSET = new Date().getTimezoneOffset();
var POST_EDIT_SELECTED_TASKS_TIMEOUT = 1000;
var messageTimer;
var log = GM_log; // convenience only
var jsobj; // Pointer to the ToodleDo window object
var $$;
var $;
var $A;
var oldUpdateStatus;
var newUpdateStatus;
var oldTaskDuplicated;
var newTaskDuplicated;
var prefs;
var oldKeyboard;
var newKeyboard;


function preferences()
{
    var map = {};
    var keys = {};
    
    
    function _loadPref(key, defaultValue)
    {
        map[key] = defaultValue;
        var savedValue = GM_getValue(key);
        if (savedValue !== undefined)
        {
            if (DEBUG) log("hit pref: " + key + "[" + savedValue + "]");
            map[key] = savedValue;
        }
        else
        {
            if (DEBUG) log("no value for pref: " + key + "[" + map[key] + "]");
        }
    }
    this.loadPref = _loadPref;
    
    
    function _getPref(key)
    {
        //if (DEBUG) for (var i=0; i<keys.length; i+=2)
        //      log(keys[i] + ": " + map[keys[i]]);
        var val = map[key];
        if (val === undefined)
            throw ("Preferences has no value for key '" + key + "'" + " " + map[key]);
        return val;
    }
    this.getPref = _getPref;
    
    
    function _savePref(key, val)
    {
        try
        {
            GM_setValue(key, val);
            map[key] = val;
            if (DEBUG) log("Saved preference (" + key + "[" + map[key] + "])");
        }
        catch (e)
        {
            alert("Failed to save preference (" + key + "[" + map[key] + "]):\n\n" + e);
            throw e;
        }
    }
    this.savePref = _savePref;
    
    function _init()
    {
        keys = [
            "SHOW_SELECT_NONE_LINK", true,
            "SHOW_SELECT_ALL_LINK", true,
            "SHOW_SELECT_NO_DUE_DATE_LINK", true,
            "SHOW_SELECT_OVERDUE_LINK", true,
            "SHOW_SELECT_TODAY_LINK", true,
            "SHOW_SELECT_TOMORROW_LINK", true,
            "SHOW_SELECT_NEGATIVE_PRI_LINK", true,
            "SHOW_SELECT_LOW_PRI_LINK", true,
            "SHOW_SELECT_MEDIUM_PRI_LINK", true,
            "SHOW_SELECT_HIGH_PRI_LINK", true,
            "SHOW_SELECT_TOP_PRI_LINK", true,
            "SHOW_SELECT_NO_TAG_LINK", true,
            "SHOW_SELECT_TAG_LINK", true,
            "SHOW_SELECT_TAG_CONTAINING_LINK", true,
            "SHOW_EDIT_POSTPONE_LINK", true,
            "SHOW_EDIT_POSTPONE_X_DAYS_LINK", true,
            "SHOW_EDIT_SET_DUE_DATE_LINK", true,
            "SHOW_EDIT_SET_START_DATE_LINK", true,
            "SHOW_EDIT_NEGATIVE_PRI_LINK", true,
            "SHOW_EDIT_LOW_PRI_LINK", true,
            "SHOW_EDIT_MEDIUM_PRI_LINK", true,
            "SHOW_EDIT_HIGH_PRI_LINK", true,
            "SHOW_EDIT_TOP_PRI_LINK", true,
            "SHOW_EDIT_CHANGE_TAGS_LINK", true,
            "SHOW_EDIT_DELETE_TAGS_LINK", true,
            //"SHOW_EDIT_RENAME_TAG_LINK", true,
            "SHOW_EDIT_ADD_TAG_LINK", true,
            "SHOW_EDIT_DELETE_TAG_LINK", true,
            "SHOW_EDIT_CLONE_TASKS_LINK", true,
            "SHOW_EDIT_DELETE_TASKS_LINK", true,
            "POSTPONE_DAYS", 1,  // default days to postpone
            "REFRESH_AFTER_EDIT_DATE", true,  // Refresh tasks after changing date?
            "REFRESH_AFTER_EDIT_PRIORITY", true,  // Refresh tasks after changing priority?
            "REFRESH_AFTER_EDIT_TAG", true,  // Refresh tasks after changing tag?
            "DEBUG", true,  // log messages to javascript console
            "OVERRIDE_KEYBOARD", true,  // set to 0 to keep original keyboard shortcuts
            "USE_POPUP_LINKS", true,  // Use standard links or popup links?
            "SHOW_EDIT_FOOTER_PREF", true,  // Show popup links by default (if USE_POPUP_LINKS)?
            "SHOW_TAG_POPUPS", true,  // Show tag popup boxes when editing tag values?
            "ADDITIVE_SELECT", false,  // Does select action clear all tasks first?
            "MESSAGES_TIMEOUT", 3000  // How long do messages display?
        ];
        
        for (var i=0; i<keys.length; i+=2)
        {
            this.loadPref(keys[i], keys[i+1]);
        }
    }
    this.init = _init;
    
    this.init();
}


function loadPreferences()
{
    prefs = new preferences();
}


function savePreferences()
{
    hidePrefs();
    showMessage("Your preferences have been saved.  Page will now refresh...");
    setTimeout("location.reload(true);", 500);
}


function editPrefs()
{
    try
    {
        var prefsDiv = $("prefsDiv");
        if (!prefsDiv) throw ("Preferences div not loaded!!!");
        prefsDiv.style["visibility"] = prefsDiv.style["visibility"] == "hidden" ? "visible" : "hidden";
    }
    catch (e)
    {
        showMessage(e);
        throw e;
    }
}


/*
 * Create a div to show messages to user
 */
function createPrefsDiv()
{
    var prefsDiv = document.createElement('div');
    prefsDiv.className = "prefsDiv";
    prefsDiv.id = "prefsDiv";
    prefsDiv.style["border"] = "1px solid #600";
    prefsDiv.style["margin"] = "75px 0 5px 0";
    prefsDiv.style["padding"] = "5px";
    prefsDiv.style["backgroundColor"] = "#ffe6e6";
    prefsDiv.style["fontWeight"] = "bold";
    prefsDiv.style["fontSize"] = "medium";
    prefsDiv.style["visibility"] = "hidden";
    
    var table = createPrefsTable(prefsDiv);
    var row = addRow(table);
    row.appendChild(createPrefsTextCol("Select links:"));
    addPrefCheckboxCol(row, "None", "SHOW_SELECT_NONE_LINK");
    addPrefCheckboxCol(row, "All", "SHOW_SELECT_ALL_LINK");
    addPrefCheckboxCol(row, "No Due Date", "SHOW_SELECT_NO_DUE_DATE_LINK");
    addPrefCheckboxCol(row, "Overdue", "SHOW_SELECT_OVERDUE_LINK");
    addPrefCheckboxCol(row, "Today", "SHOW_SELECT_TODAY_LINK");
    addPrefCheckboxCol(row, "Tomorrow", "SHOW_SELECT_TOMORROW_LINK");
    addPrefCheckboxCol(row, "Negative", "SHOW_SELECT_NEGATIVE_PRI_LINK");
    addPrefCheckboxCol(row, "Low", "SHOW_SELECT_LOW_PRI_LINK");
    addPrefCheckboxCol(row, "Medium", "SHOW_SELECT_MEDIUM_PRI_LINK");
    addPrefCheckboxCol(row, "High", "SHOW_SELECT_HIGH_PRI_LINK");
    addPrefCheckboxCol(row, "Top", "SHOW_SELECT_TOP_PRI_LINK");
    addPrefCheckboxCol(row, "No Tag", "SHOW_SELECT_NO_TAG_LINK");
    addPrefCheckboxCol(row, "Tag...", "SHOW_SELECT_TAG_LINK");
    addPrefCheckboxCol(row, "Tag Containing...", "SHOW_SELECT_TAG_CONTAINING_LINK");
            
    table = createPrefsTable(prefsDiv);
    row = addRow(table);
    row.appendChild(createPrefsTextCol("Edit links:"));
    addPrefCheckboxCol(row, "Postpone", "SHOW_EDIT_POSTPONE_LINK");
    addPrefCheckboxCol(row, "Postpone X Days", "SHOW_EDIT_POSTPONE_X_DAYS_LINK");
    addPrefCheckboxCol(row, "Set Due Date", "SHOW_EDIT_SET_DUE_DATE_LINK");
    addPrefCheckboxCol(row, "Set Start Date", "SHOW_EDIT_SET_START_DATE_LINK");
    addPrefCheckboxCol(row, "Negative", "SHOW_EDIT_NEGATIVE_PRI_LINK");
    addPrefCheckboxCol(row, "Low", "SHOW_EDIT_LOW_PRI_LINK");
    addPrefCheckboxCol(row, "Medium", "SHOW_EDIT_MEDIUM_PRI_LINK");
    addPrefCheckboxCol(row, "High", "SHOW_EDIT_HIGH_PRI_LINK");
    addPrefCheckboxCol(row, "Top", "SHOW_EDIT_TOP_PRI_LINK");
    addPrefCheckboxCol(row, "Change All Tags", "SHOW_EDIT_CHANGE_TAGS_LINK");
    addPrefCheckboxCol(row, "Delete All Tags", "SHOW_EDIT_DELETE_TAGS_LINK");
    //addPrefCheckboxCol(row, "Rename Tag", "SHOW_EDIT_RENAME_TAG_LINK");
    addPrefCheckboxCol(row, "Add Tag", "SHOW_EDIT_ADD_TAG_LINK");
    addPrefCheckboxCol(row, "Delete Tag", "SHOW_EDIT_DELETE_TAG_LINK");
    addPrefCheckboxCol(row, "Clone Tasks", "SHOW_EDIT_CLONE_TASKS_LINK");
    addPrefCheckboxCol(row, "Delete Tasks", "SHOW_EDIT_DELETE_TASKS_LINK");
    
    table = createPrefsTable(prefsDiv);
    row = addRow(table);
    row.appendChild(createPrefsTextCol("Refresh options:"));
    addPrefCheckboxCol(row, "Refresh after changing date?", "REFRESH_AFTER_EDIT_DATE");
    addPrefCheckboxCol(row, "Refresh after changing priority?", "REFRESH_AFTER_EDIT_PRIORITY");
    addPrefCheckboxCol(row, "Refresh after changing tag?", "REFRESH_AFTER_EDIT_TAG");
    
    table = createPrefsTable(prefsDiv);
    row = addRow(table);
    row.appendChild(createPrefsTextCol("Misc. options:"));
    addPrefCheckboxCol(row, "Links float at bottom of the screen?", "USE_POPUP_LINKS");
    addPrefCheckboxCol(row, "Show floating links by default?", "SHOW_EDIT_FOOTER_PREF");
    addPrefCheckboxCol(row, "Override keyboard shortcuts?", "OVERRIDE_KEYBOARD");
    addPrefCheckboxCol(row, "Additive select?", "ADDITIVE_SELECT");
    addPrefTextCol(row, "How long do messages stick around (millis)?: ", "MESSAGES_TIMEOUT");
    
    table = createPrefsTable(prefsDiv);
    row = addRow(table);
    var col = document.createElement("td");
    col.style["padding"] = "5px";
    row.appendChild(col);
    var link = document.createElement("a");
    link.href = "#";
    link.addEventListener("click", savePreferences, true);
    link.setAttribute("title", "Save preferences");
    link.style["fontWeight"] = "100";
    link.style["fontSize"] = "small";
    var linkContent = document.createTextNode("Done");
    link.appendChild(linkContent);
    col.appendChild(link);
    
    col = document.createElement("td");
    col.style["padding"] = "5px";
    row.appendChild(col);
    var warning = document.createElement("span");
    warning.style["fontWeight"] = "bold";
    warning.style["fontSize"] = "medium";
    var warningText = document.createTextNode(" NOTE: Changes will not go into effect until page is refreshed");
    warning.appendChild(warningText);
    col.appendChild(warning);
    
    //document.getElementById("viewby").parentNode.insertBefore(prefsDiv, $("viewby"));
    document.getElementById("tasks").appendChild(prefsDiv);
}


function createPrefsTable(prefsDiv)
{
    var table = document.createElement('table');
    table.style["fontWeight"] = "100";
    table.style["fontSize"] = "xx-small";
    table.style["margin"] = "5px 0 5px 0";
    prefsDiv.appendChild(table);
    return table;
}


function addPrefCheckboxCol(row, str, prefName)
{
    var col = createPrefsCol();
    row.appendChild(col);
    var colText = document.createTextNode(str);
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.setAttribute("id", prefName);
    cb.checked = prefs.getPref(prefName);
    var clickFunc = function(){prefs.savePref(prefName, cb.checked);};
    cb.addEventListener("click", clickFunc, true);
    col.appendChild(cb);
    col.appendChild(colText);
}


function addPrefTextCol(row, str, prefName)
{
    var col = createPrefsCol();
    row.appendChild(col);
    var colText = document.createTextNode(str);
    var tb = document.createElement("input");
    tb.setAttribute("id", prefName);
    tb.value = prefs.getPref(prefName);
    var clickFunc = function(){prefs.savePref(prefName, tb.value);};
    tb.addEventListener("keyup", clickFunc, true);
    col.appendChild(colText);
    col.appendChild(tb);
}


function createPrefsTextCol(txt)
{
    var col = createPrefsCol();
    col.appendChild(document.createTextNode(txt));
    return col;
}


function createPrefsCol()
{
    var col = document.createElement('td');
    col.style["padding"] = "5px";
    return col;
}


function hidePrefs()
{
    $("prefsDiv").style['visibility'] = 'hidden';
}


function addRow(table)
{
    var row = document.createElement('tr');
    table.appendChild(row);
    return row;    
}


function addTab(url, onClickHref, title, text)
{
    var parentNode = document.getElementById("tabs");
    if (parentNode)
    {
        var firstNode = parentNode.firstChild;
        if (firstNode)
        {
            var div = document.createElement("div");
            div.setAttribute("class", "tab");
         
            var img = document.createElement("img");
            img.src = "http://images.toodledo.com/t/images/ink/tlt.gif";
            img.setAttribute("class", "tl");
            img.setAttribute("width", "3");
            img.setAttribute("height", "3");
            div.appendChild(img);
         
            var link = document.createElement("a");
            link.href = url;
            link.setAttribute("onclick", onClickHref);
            link.setAttribute("title", title);
            
            var linkContent = document.createTextNode(text);
            link.appendChild(linkContent);
            
            div.appendChild(link);
         
            parentNode.insertBefore(div, firstNode);
        }
    }
}


function addDivTo(parentId, newId)
{
    var parentNode = $(parentId);
    if (parentNode)
    {  
        var div = document.createElement("div");
        div.setAttribute("id", newId);
        parentNode.insertBefore(div, null);
    }
    else
    {
        throw("Attempt to add div to non-existant node $('" + parentId + "')");
    }
}


/*
 * Add a link to the page
 */
function addLinkToDiv(parentId, func, title, text, addBr)
{
    var parentNode = $(parentId);
    if (parentNode)
    {
        if (!addBr)
    {
        if ($$("#" + parentId + " a").length > 0)  
                addTextToDiv(parentId, " | ");
    }

        var link = document.createElement("a");
        link.href = "javascript:void(0)";
        link.addEventListener("click", func, true);
        link.setAttribute("title", title);
        var linkContent = document.createTextNode(text);
        link.appendChild(linkContent);
    if (addBr)
        parentNode.insertBefore(document.createElement("br"), null);
        parentNode.insertBefore(link, null);

    }
    else
    {
        throw("Attempt to add link to non-existant div $('" + parentId + "')");
    }
}


function addTextToDiv(parentId, text, style)
{
    var parentNode = $(parentId);
    if (parentNode)
    {
        var span = document.createElement("span");
        span.setAttribute("style", style);
        
        var sep = document.createTextNode(text);
        span.insertBefore(sep, null);
        
        parentNode.insertBefore(span, null);
    }
    else
    {
        throw("Attempt to add text to non-existant div $('" + parentId + "')");
    }
}


/*
 * Get all selected task checkboxes
 */
function getAllSelectedTaskCheckboxes()
{
    return $$("input.doedit");
}


/*
 * Get all non-selected task checkboxes
 */
function getAllNonSelectedTaskCheckboxes()
{
    return $$("input.donotedit");
}


/*
 * Select all tasks
 */
function selectAllTasks()
{
    getAllNonSelectedTaskCheckboxes().each(function(tcb){editTaskSelectedState(tcb, true);});
    var numSelected = getAllSelectedTaskCheckboxes().length;
    showMessage(numSelected + " task" + (numSelected != 1 ? "s" : "") + " selected");
}


/*
 * De-select all tasks
 */
function clearAllTasks()
{
    getAllSelectedTaskCheckboxes().each(function(tcb){editTaskSelectedState(tcb, false);});
    showMessage("No tasks selected");
}


/*

 * Select tasks based on function
 */
function selectTasksByEachFunction(tasks, func)
{
    //GM_log("tasks" + tasks);
    if (DEBUG) log("ADDITIVE: " + prefs.getPref("ADDITIVE_SELECT"));
    if (!prefs.getPref("ADDITIVE_SELECT"))
        clearAllTasks();
    tasks.each(func);
    var numSelected = getAllSelectedTaskCheckboxes().length;
    showMessage(numSelected + " task" + (numSelected != 1 ? "s" : "") + " selected");
}


/*
 *
 */
function editTaskSelectedState(checkbox, bool)
{
    checkbox.checked = bool;
    checkbox.className = bool ? "doedit" : "donotedit";
}


function selectNegativePriorityTasks()
{
    selectTasksWithPriority(PRIORITY_NEGATIVE);
}


function selectLowPriorityTasks()
{
    selectTasksWithPriority(PRIORITY_LOW);
}


function selectMediumPriorityTasks()
{
    selectTasksWithPriority(PRIORITY_MEDIUM);
}


function selectHighPriorityTasks()
{
    selectTasksWithPriority(PRIORITY_HIGH);
}


function selectTopPriorityTasks()
{
    selectTasksWithPriority(PRIORITY_TOP);
}


function selectTasksWithPriority(priority)
{
    var targetInnerHTML = jsobj.priNum2HTML(priority);
    var ruleInFunc = function(dueSpan)
    {
        if (dueSpan.innerHTML == targetInnerHTML)
        {
            var id = dueSpan.id.replace("pri", "");
            editTaskSelectedState($("edit"+id), true);
        }
    };
    selectTasksByEachFunction($$("span[id^=pri]"), ruleInFunc);
}


function selectTasksWithNoTag()
{
    var ruleInFunc = function(dueSpan)
    {
        editTaskSelectedState($("edit"+dueSpan.id.replace("tag", "")), true);
    };
    selectTasksByEachFunction($$("span[id^=tag].dim"), ruleInFunc);
}


function promptSelectTasksWithTagMatching()
{
    var tagValue = prompt("Tag value?");
    if (tagValue && tagValue.length > 0)
        selectTasksWithTagMatching(tagValue);
}


function selectTasksWithTagMatching(tagValue)
{
    var ruleInFunc = function(tagSpan)
    {
        if (tagSpan.innerHTML.match(tagValue))
        {
            //if (tagValue == "none" && tagSpan.className == "dim")
            if (isDefaultNoneTag(tagSpan))
                return;
            var id = tagSpan.id.replace("tag", "");
            editTaskSelectedState($("edit"+id), true);
        }
    };
    selectTasksByEachFunction($$("span[id^=tag]"), ruleInFunc);
}


function promptSelectTasksWithTag()
{
    var tagValue = prompt("Tag?");
    if (tagValue && tagValue.length > 0)
        selectTasksWithTag(tagValue);
}


function selectTasksWithTag(tagValue)
{
    var ruleInFunc = function(tagSpan)
    {
        var tags = tagSpan.innerHTML.split(",");
        tagValue = trim(tagValue).toLowerCase();
        for (var i=0; i<tags.length; i++)
        {
            if (trim(tags[i]).toLowerCase() == tagValue)
            {
                //if (tagValue == "none" && dueSpan.className == "dim")
                if (isDefaultNoneTag(tagSpan))
                    return;
                var id = tagSpan.id.replace("tag", "");
                editTaskSelectedState($("edit"+id), true);
                return;
            }
        }
    };
    selectTasksByEachFunction($$("span[id^=tag]"), ruleInFunc);
}


/*
 * Select all overdue tasks
 */
function selectAllOverdueTasks()
{
    var today = new Date();
    var ruleInFunc = function(dueSpan)
    {
        var id = dueSpan.id.replace("due", "");
        //GM_log("date: " + $$("span[date!=0]"));
        var taskDueDate = getTaskDueDate(dueSpan);
        var compareDate = new Date(today.getTime());
        
        
        var time = dueSpan.getAttribute("time");
        if (!time || time.indexOf(":") < 0)
        {
            compareDate.setHours(0);
            compareDate.setMinutes(0);
            compareDate.setSeconds(0);
            compareDate.setMilliseconds(0);
        }
        
        var overdue = taskDueDate < compareDate;
        if (overdue)
            editTaskSelectedState($("edit"+id), true);
    };
    selectTasksByEachFunction($$("span[date!=0][id^=due]"), ruleInFunc);
}


/*
 * Select all no-due-date tasks
 */
function selectAllTaskWithNoDueDates()
{
    var ruleInFunc = function(dueSpan)
    {
        var id = dueSpan.id.replace("due", "");
        editTaskSelectedState($("edit"+id), true);
    };
    selectTasksByEachFunction($$("span[date=0][id^=due]"), ruleInFunc);
}


/*
 * Select all tasks due today
 */
function selectAllTasksDueToday()
{
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    var ruleInFunc = function(dueSpan)
    {
        var id = dueSpan.id.replace("due", "");
        var taskDueDate = getTaskDueDate(dueSpan);
        taskDueDate.setHours(0);
        taskDueDate.setMinutes(0);
        taskDueDate.setSeconds(0);
        taskDueDate.setMilliseconds(0);
        if (taskDueDate.getTime() == today.getTime())
            editTaskSelectedState($("edit"+id), true);
    };
    selectTasksByEachFunction($$("span[date][id^=due]"), ruleInFunc);
}


/*
 * Select all tasks due tomorrow
 */
function selectAllTasksDueTomorrow()
{
    var tomorrow = new Date();
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
    var ruleInFunc = function(dueSpan)
    {
        var id = dueSpan.id.replace("due", "");
        var taskDueDate = getTaskDueDate(dueSpan);
        taskDueDate.setHours(0);
        taskDueDate.setMinutes(0);
        taskDueDate.setSeconds(0);
        taskDueDate.setMilliseconds(0);
        if (taskDueDate.getTime() == tomorrow.getTime())
            editTaskSelectedState($("edit"+id), true);
    };
    selectTasksByEachFunction($$("span[date][id^=due]"), ruleInFunc);
}


/*
 * Get the Date from the duedate span
 */
function getTaskDueDate(dueSpan)
{
    var dateLong = dueSpan.getAttribute("date");
    if (DEBUG) log("dateLong: " + dateLong);
    if (!dateLong || dateLong == 0)
        return null;
    dateLong = parseInt(dateLong) + ((TZ_OFFSET - 240) * 60); // Correct for ToodleDo sending times in EST
    var taskDueDate = new Date(dateLong*1E3);
    var time = dueSpan.getAttribute("time");
    if (time.toLowerCase() != "no time" && time.indexOf(":") > -1)
    {
        time = jsobj.reformatTime(time,2);
        var times = time.split(":");
        var timeLong = times[0] * 60 * 60 * 1000;
        timeLong += times[1] * 60 * 1000;
        taskDueDate.setTime(taskDueDate.getTime() + timeLong);
    }
    return taskDueDate;
}


function promptAddTagValueForSelectedTasks()
{
    promptForTagValue(false);
}


function promptChangeTagValueForSelectedTasks()
{
    promptForTagValue(true);
}


function promptForTagValue(replace)
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        var tagValue = prompt("Tag value?");
        if (tagValue && tagValue.length > 0)
        {
            var editTagFunc = function(tagDiv)
            {
                var oldValue = tagDiv.innerHTML;
                log("CN: " + tagDiv.className);
                if (replace || isDefaultNoneTag(tagDiv)) oldValue = "";
                if (oldValue.length > 0) oldValue += ", ";
                return oldValue + escapeTags(tagValue);
            };
            setTagValueForSelectedTasks(editTagFunc);
        }
    }
    else showMessage("Please select tasks to change tag value");
}


function isDefaultNoneTag(tagDiv)
{
    return tagDiv.innerHTML == "none" && tagDiv.className == "dim";
}


function removeTags()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        if (confirm("Delete tags from selected tasks?"))
        {
            var editTagFunc = function(tagDiv)
            {
                return "";
            };
            setTagValueForSelectedTasks(editTagFunc);
        }
    }
    else showMessage("Please select tasks from which to delete tags");  
}



/*
function promptRenameTag()

{
    try
    {
        if (getAllSelectedTaskCheckboxes().length > 0)
        {
            var tmp = prompt("Rename what to what?\n\nEnter in form of \"Rename me" + RENAME_TAG_SPLIT_STRING + "To me\"");
            var strs = tmp.split(RENAME_TAG_SPLIT_STRING);
            if (strs.length != 2)
                throw ("Invalid rename-tag string.  Enter in form of \"Rename me" + RENAME_TAG_SPLIT_STRING + "To me\"");
            strs[0] = trim(strs[0]);
            strs[1] = trim(strs[1]);
            if (strs[0].length < 1 || strs[1].length < 1)

                throw ("Invalid rename-tag string.  Neither string can have 0 length");
            
            var setTagValueFunc = function(oldValue)
            {
                var tags = oldValue.split(",");
                for (var i=0, tag; tag=tags[i];i++)
                {
                    tag = trim(tag.toLowerCase());
                    if (DEBUG) log("looking at tag value '" + tag + "'");
                    if (tag != tagValue)
                    {
                        if (DEBUG) log("not a match");
                        newTags.push(tag);
                    }
                return escapeTags(oldValue.replace(strs[0], strs[1]));
            }
            setTagValueForSelectedTasks(setTagValueFunc);
            
        }
        else showMessage("Please select tasks to rename tags");
    }
    catch (e)
    {
        showMessage(e);
        throw e;
    }
    }
*/


function promptRemoveTag()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        var tagValue = prompt("Tag to remove?");
        if (tagValue && tagValue.length > 0)
        {
            tagValue = trim(tagValue.toLowerCase());
            var removeTagFunc = function(tagDiv)
            {
                var oldValue = tagDiv.innerHTML;
                var tags = oldValue.split(",");
                var newTags = new Array();
                for (var i=0, tag; tag=tags[i];i++)
                {
                    tag = trim(tag.toLowerCase());
                    if (DEBUG) log("looking at tag value '" + tag + "'");
                    if (tag != tagValue)
                    {
                        if (DEBUG) log("not a match");
                        newTags.push(tag);
                    }
                    else
                    {
                        if (DEBUG) log("'" + tag + "' is a match for '" + tagValue + "'.  Not including in new tag string");
                    }
                }
                return newTags.toString();
            };
            setTagValueForSelectedTasks(removeTagFunc);
        }
    }
    else showMessage("Please select tasks from which to remove a tag.");
}


function cloneSelectedTasks()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        var cloneTagFunc = function(checkbox)
        {
            var id = checkbox.id.replace("edit", "");
            jsobj.duplicateTask(id);
        };
        showMessage("Page will refresh...");
        editSelectedTasks(cloneTagFunc, prefs.getPref("REFRESH_AFTER_EDIT_TAG"));
        //editSelectedTasks(cloneTagFunc, true);
    }
    else showMessage("Please select tasks to clone.");
}


function deleteSelectedTasks()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        if (confirm("Are you sure you want to delete all of the selected tasks? This CANNOT be undone.\r\n\r\nPlease wait for screen to refresh after deleting tasks."))
        {
            var deleteTagFunc = function(checkbox)
            {
                var id = checkbox.id.replace("edit", "");
                var c=$("tasks").getAttribute("user");
                new jsobj.Ajax.Request("/ajax/delete_task.php",{method:"post",postBody:"id="+id+"&u="+c,onSuccess:jsobj.taskDeleted});
                $$(".parent"+id).invoke("remove");
                XPCNativeWrapper.unwrap($("row"+id)).remove;
            };
            editSelectedTasks(deleteTagFunc, prefs.getPref("REFRESH_AFTER_EDIT_TAG"));
            //editSelectedTasks(deleteTagFunc, true);
        }
    }
    else showMessage("Please select tasks to delete.");
}

function setTagValueForSelectedTasks(setTagValueFunc)
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        var editTagFunc = function(checkbox)
        {
            var id = checkbox.id.replace("edit", "");
            
            if(!$("tagdiv"))
                createTagDiv();
            $("tagdiv").setAttribute("tid", id);
            $("tagdiv").setAttribute("prefix", $("tag" + id).innerHTML.match("Tag:"));
            $("edtag").value = setTagValueFunc($("tag" + id));
            jsobj.saveTag(id, $("tag" + id).innerHTML);
            jsobj.closeTag();
        };
        editSelectedTasks(editTagFunc, prefs.getPref("REFRESH_AFTER_EDIT_TAG"));
    }
    else showMessage("Please select tasks to rename tags");
}


function createTagDiv()
{
    if (DEBUG) log("creating tagdiv");
    new jsobj.Insertion.After($("hiddenarea"),"<div id='tagdiv'><input type='text' class='inplace' maxlength='64' id='edtag' style='visiblility: hidden;' />");
}


function callPostponeAllSelectedTasksByOneDay()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        POSTPONE_DAYS = 1;
        setSelectedDueDates(postponeAllSelectedTasks);
    }
    else
    {
        showMessage("Please select tasks to postpone");
    }
}


function callPostponeAllSelectedTasksByXDays()
{
    try
    {
        if (getAllSelectedTaskCheckboxes().length > 0)
        {
            var tmp = prompt("How many days?");
            if (tmp)
            {
                if (isNaN(tmp))
                    throw ("Value is not a number ('" + tmp + "')");
                POSTPONE_DAYS = tmp;
                setSelectedDueDates(postponeAllSelectedTasks);
            }
        }
        else
        {
            showMessage("Please select tasks to postpone");
        }
    }
    catch (e)
    {
        alert(e);
    }
}


/*
 * Set the Due Date to the value in the duedate span + days
 */
function postponeAllSelectedTasks(dueSpan)
{
    var MONTH_NAMES = 
    [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    if (dueSpan && dueSpan.getAttribute("date"))
    {
        var date = getTaskDueDate(dueSpan);
        if (DEBUG) log("date " + date);
        if (!date) date = new Date();
        var newDate = new Date(date.getTime() + (POSTPONE_DAYS * 24 * 60 * 60 * 1000));
        var newDateStr = newDate.getDate() + " " + MONTH_NAMES[newDate.getMonth()] + " " + (newDate.getYear() + 1900);
        var time = dueSpan.getAttribute("time");
        if (time && time.length > 0 && time != "no time")
        {
            time = newDate.getHours() + ":" + (newDate.getMinutes() < 10 ? ("0" + newDate.getMinutes()) : newDate.getMinutes());
        }
        else time = 0;
        setDueDateString(newDateStr, time);
    }
}


/*
 *
 */
function callSetDueDatePrompt()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        var tmp = prompt("Due Date?");
        if (tmp && typeof tmp == "string")
        {
            var date = getDateFromString(tmp);
            if (date)
                tmp = tmp.replace(date, "");
            else
                date = "today";
            
            var time = getTimeFromString(tmp);
            if (time)
                NEW_TIME_STRING = time;
            else
                NEW_TIME_STRING = "";
                
            NEW_DATE_STRING = date;
            setSelectedDueDates(setDueDatePrompt);
        }
    }
    else
    {
        showMessage("Please select tasks to set Due Date");
    }
}


/*
 *
 */
function callSetStartDatePrompt()
{
    if (getAllSelectedTaskCheckboxes().length > 0)
    {
        var tmp = prompt("Start Date?");
        if (tmp && typeof tmp == "string")
        {
            var date = getDateFromString(tmp);
            if (date)
                tmp = tmp.replace(date, "");
            else
                date = "today";

            var time = getTimeFromString(tmp);
            if (time)
                NEW_TIME_STRING = time;
            else
                NEW_TIME_STRING = "";

            NEW_DATE_STRING = date;
            setSelectedStartDates(setStartDatePrompt);
        }
    }   
    else
    {
        showMessage("Please select tasks to set Start Date");
    }
}


/*
 * Shamelessly borrowed from Rememberthemilk.com
 */
function getDateFromString(str)
{
    var dateRE1 = /([0-9]{1,4})(?:\-|\/|\.|\u5e74|\u6708|\u65e5)([0-9]{1,2})(?:\-|\/|\.|\u5e74|\u6708|\u65e5)*([0-9]{1,4})*/i;
    var dateRE2 = /(on)?\s*(([0-9]*)(?:st|th|rd|nd)*(?:\s|of|\-a|\-|,|\.)*(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec)(?:\s|\-|\.)*([0-9]*))/i;
    var dateRE3 = /(on)?\s*((january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec)(?:\s|,|\.|\-)*([0-9]+)(?:st|th|rd|nd)*(?:\s|,|\.|\-a|\-)*([0-9]*))/i;
    var dateRE4 = /(on)?\s*((next)?\s*(monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun))/i;
    var dateRE5 = /(in)?\s*(one|two|three|four|five|six|seven|eight|nine|ten|[0-9]+)\s*(years|year|yrs|yr|months|month|mons|mon|weeks|week|wks|wk|days|day)/i;
    var dateRE6 = /end\s*of\s*(?:the)*\s*(week|w|month|m)/i;
    var dateRE7 =/(on)?\s*([0-9]+)(?:st|th|rd|nd)/i;
    var dateRE8 = /\s*(yesterday|tod|today|tom|tomorrow)/i;
    
    
    if (DEBUG) log("getDateFromString: Looking for date in '" + str + "'");
    var dateRE1match = dateRE1.exec(str);
    var dateRE2match = dateRE2.exec(str);
    var dateRE3match = dateRE3.exec(str);
    var dateRE4match = dateRE4.exec(str);
    var dateRE5match = dateRE5.exec(str);
    var dateRE6match = dateRE6.exec(str);
    var dateRE7match = dateRE7.exec(str);
    var dateRE8match = dateRE8.exec(str);
    
    if (dateRE1match)
    {
        if (DEBUG) log("dateRE1 match for '" + str + "' = '" + dateRE1match[0] + "'");
        return dateRE1match[0];
    }
        
    if (dateRE2match)
    {
        if (DEBUG) log("dateRE2 match for '" + str + "' = '" + dateRE2match[0] + "'");
        return dateRE2match[0];
    }
        
    if (dateRE3match)
    {
        if (DEBUG) log("dateRE3 match for '" + str + "' = '" + dateRE3match[0] + "'");
        return dateRE3match[0];
    }
    
    if (dateRE4match)
    {
        if (DEBUG) log("dateRE4 match for '" + str + "' = '" + dateRE4match[0] + "'");
        return dateRE4match[0];
    }
        
    if (dateRE5match)
    {
        if (DEBUG) log("dateRE5 match for '" + str + "' = '" + dateRE5match[0] + "'");
        return dateRE5match[0];
    }
        
    if (dateRE6match)
    {
        if (DEBUG) log("dateRE6 match for '" + str + "' = '" + dateRE6match[0] + "'");
        return dateRE6match[0];
    }
        
    if (dateRE7match)
    {
        if (DEBUG) log("dateRE7 match for '" + str + "' = '" + dateRE7match[0] + "'");
        return dateRE7match[0];
    }
        
    if (dateRE8match)
    {
        if (DEBUG) log("dateRE8 match for '" + str + "' = '" + dateRE8match[0] + "'");
        return dateRE8match[0];
    }
    
    if (DEBUG) log("NO MATCH FOR DATE STRING '" + str + "'!!!!!");
    return;
}


/*
 * Shamelessly borrowed from Rememberthemilk.com
 */
function getTimeFromString(str)
{
    var timeRE1 = /(@|at|,)?\s*([0-9]+)(?::|\.|\u0020\u0068\u0020|\u6642|h)([0-9]+)(?:\u5206)?\s*(am|a|pm|p|\u4e0a|\u4e0b|\u5348\u524d|\u5348\u5f8c|\uc624\uc804|\uc624\ud6c4)?/i;
    var timeRE2 = /(@|at)?\s*([^\/][0-9]{3,4})\s*(a|p|\u4e0a|\u4e0b|\u5348\u524d|\u5348\u5f8c|\uc624\uc804|\uc624\ud6c4)?/i;
    var timeRE3 = /(@|at)?\s*([0-9]{1,2})\s*(a|p|\u4e0a|\u4e0b|\u5348\u524d|\u5348\u5f8c|\uc624\uc804|\uc624\ud6c4)?/i;
    
    if (DEBUG) log("getTimeFromString: Looking for time in '" + str + "'");
    var timeRE1match = timeRE1.exec(str);
    var timeRE2match = timeRE2.exec(str);
    var timeRE3match = timeRE3.exec(str);
    
    if (timeRE1match)
    {
        if (DEBUG) log("timeRE1 match for '" + str + "' = '" + timeRE1match[0] + "'");
        return timeRE1match[0];
    }
        
    if (timeRE2match)
    {
        if (DEBUG) log("timeRE2 match for '" + str + "' = '" + timeRE2match[0] + "'");
        return timeRE2match[0];
    }
        
    if (timeRE3match)
    {
        if (DEBUG) log("timeRE3 match for '" + str + "' = '" + timeRE3match[0] + "'");
        return timeRE3match[0];
    }
    if (DEBUG) log("NO MATCH FOR TIME STRING '" + str + "'!!!!!");
    return;
}


/*
 *
 */
function setDueDatePrompt(dueSpan)
{
    setDueDateString(NEW_DATE_STRING, NEW_TIME_STRING);
}


/*
 * Set the task due date to a specific string
 */
function setDueDateString(dateStr, timeStr)
{
    try
    {
        if (DEBUG) log("setDueDateString\tdateStr: '" + dateStr + "'\ttime: '" + timeStr);
        var eud = document.getElementById("eud");
        if (eud)
        {
            eud.value = dateStr;
            
        }
        else throw ("Attempting to set due date with no $('eud')");
        
        if (timeStr)
        {
            if ($("mit"))
            {
                $("mit").value = timeStr;
                if (DEBUG) log("set mit to '" + timeStr + "'");
            }
            else
            {
                throw("Failed to set time '" + timeStr + "' for task.  Most likely your preferences are set to not display 'due time'");
            }
        }
        else if ($("mit"))
        {
            $("mit").value = ""; // User wants a time, and we don't have one to give
        }
        jsobj.saveDueDateTime();
    }
    catch (e)
    {
        showMessage(e);
        throw e;
    }
}


/*
 *
 */
function setStartDatePrompt(startSpan)
{
    setStartDateString(NEW_DATE_STRING, NEW_TIME_STRING);
}


/*
 * Set the task due date to a specific string
 */
function setStartDateString(dateStr, timeStr)
{
    try
    {
        if (DEBUG) log("setStartDateString\tdateStr: '" + dateStr + "'\ttime: '" + timeStr);
        var dts = document.getElementById("dts");
        if (dts)
            dts.value = dateStr;
        else throw ("Attempting to set start date with no $('dts')");

        if (timeStr)
        {
            if ($("tts"))
            {
                $("tts").value = timeStr;
                if (DEBUG) log("set tts to '" + timeStr + "'");
            }   
            else
            {
                throw("Failed to set time '" + timeStr + "' for task.  Most likely your preferences are set to not display 'start time'");
            }
        }
        else if ($("tts"))
        {
            $("tts").value = ""; // User wants a time, and we don't have one to give
        }
        jsobj.saveStartDateTime();
    }
    catch (e)
    {
        showMessage(e);
        throw e;
    }
}



/*
 * Postpone all the selected tasks
 */
function setSelectedDueDates(func)
{
    var updateFunction = function(task)
    {
        var id = task.id.replace("edit", "");
        if (id)
        {
            var dueSpan = jsobj.document.getElementById("due" + id);
            if (dueSpan)
            {
                var duediv = jsobj.document.getElementById("duediv");
                duediv.setAttribute("prefix", "0");
                duediv.setAttribute("did", id);
                func(dueSpan);
            }  
        }
    };
    editSelectedTasks(updateFunction, prefs.getPref("REFRESH_AFTER_EDIT_DATE"));
}


/*
 * Postpone(startdate) all the  selected tasks
 */
function setSelectedStartDates(func)
{
    var updateFunction = function(task)
    {
        var id = task.id.replace("edit", "");
        if (id)
        {
            var startSpan = jsobj.document.getElementById("std" + id);
            if (startSpan)
            {
                var startdiv = jsobj.document.getElementById("startdiv");
                startdiv.setAttribute("prefix", "0");
                startdiv.setAttribute("did", id);
                func(startSpan);
            }
        }
    };
    editSelectedTasks(updateFunction, prefs.getPref("REFRESH_AFTER_EDIT_DATE"));
}


function changePriorityToNegativeForSelectedTasks()
{
    changePriorityToXForSelectedTasks(PRIORITY_NEGATIVE);
}


function changePriorityToLowForSelectedTasks()
{
    changePriorityToXForSelectedTasks(PRIORITY_LOW);
}


function changePriorityToMediumForSelectedTasks()
{
    changePriorityToXForSelectedTasks(PRIORITY_MEDIUM);
}


function changePriorityToHighForSelectedTasks()
{
    changePriorityToXForSelectedTasks(PRIORITY_HIGH);
}


function changePriorityToTopForSelectedTasks()
{
    changePriorityToXForSelectedTasks(PRIORITY_TOP);
}


function changePriorityToXForSelectedTasks(priNum)
{
    var selectedTasks = getAllSelectedTaskCheckboxes();
    if (selectedTasks.length > 0)
    {
        var func = function(task)
        {
            var id = task.id.replace("edit", "");
            if (id)
            {
                var pri = $("pri" + id);
                jsobj.editPri(pri, id);
                var irp = $("irp" + id);
                irp.value = priNum;
                irp.blur();
                //jsobj.savePri(id, pri.innerHTML.match("Priority:"));
            }
        };
        editSelectedTasks(func, prefs.getPref("REFRESH_AFTER_EDIT_PRIORITY"));
    }
    else
        showMessage("Please select tasks to change priority");
}


/*
 * Perform the function on all the selected tasks
 */
function editSelectedTasks(func, refresh)
{
    var tasks = getAllSelectedTaskCheckboxes();
    var numSelected = tasks.length;
    if (numSelected < 1)
    {
        showMessage("Please select tasks to update");
    }
    else
    { 
        tasks.each(func);
        var message = numSelected + " task" + (numSelected != 1 ? "s" : "") + " updated";
        if (refresh)
        {
            message +=". Refreshing tab...";
            setTimeout(refreshCurrentTab, POST_EDIT_SELECTED_TASKS_TIMEOUT);
        }
        showMessage(message);
    }
}


/*
 * Code adapted from http://userscripts.org/scripts/review/78253
 */
function handleKeyPress(a)
{
    //var Event = jsobj.Event;
    //var b = Event.element(a), c = a.charCode ? a.charCode : a.which ? a.which : a.keyCode;
    var b = a.target, c = a.charCode ? a.charCode : a.which ? a.which : a.keyCode;
    c = a.keyCode;
    if (DEBUG) log("keypressed: " + c + "\tchar: " + String.fromCharCode(c));// + "\na: " + a + "\nb: " + b + "(" + b.tagName + ")");
    if (a.ctrlKey && a.altKey && !a.metaKey && b.descendantOf("addtask"))
    {
        if (c == 56)
        {
            newStar(a);
            Event.stop(a);
        }
    }
    else
    {
        c == 8226 && b.descendantOf("addtask");
    }
    
    if (!a.metaKey)
    {
        if (!a.ctrlKey)
        {
            if (!a.altKey)
            {
                if (b.tagName.toUpperCase() == "HTML" || b.tagName.toUpperCase() == "BODY" || b.tagName.toUpperCase() == "DIV" || b.tagName.toUpperCase() == "A" || b.type.toUpperCase() == "CHECKBOX")
                {
                    switch (c)
                    {
                        case 27: // ESC
                            jsobj.keyboard(a);
                            clearAllTasks();
                            break;
                        case 48: // '0'
                            break;
                        case 49: // '1'
                            break;
                        case 50: // '2'
                            break;
                        case 51: // '3'
                            break;
                        case 65: // a
                            selectAllTasks();
                            break;
                        case 67: // c
                            clearAllTasks();
                            break;
                        case 68: // d
                            callSetDueDatePrompt();
                            break;
                        case 69: // 'e'
                            toggleEditFooter();
                            break;
                        case 77: // m
                            if (!window.location.toString().match("/views/duedate.php"))
                                window.location="/views/duedate.php";
                            break;
                        case 79: // o
                            selectAllOverdueTasks();
                            break;
                        case 80: // p
                            callPostponeAllSelectedTasksByOneDay();
                            break;
                        case 88: // x
                            callPostponeAllSelectedTasksByXDays();
                            break;
                        default:
                            //alert("default");
                            jsobj.keyboard(a);
                            break;
                    }
                }
            }
        }
    }
}


/*
 * Override the swap_tabs function to insert checkboxes
 */
function newUpdateStatus(a,b)
{
    GM_log("a: " + a + "\tb: " + b);
    oldUpdateStatus(a,b);
    insertCustomElements(false);
}


/*
 * Call swap_tabs on the current tab
 */
function refreshCurrentTab()
{
    jsobj.swap_tabs(XPCNativeWrapper.unwrap($("tabs")).down(".tabon").getAttribute("val"));
}


/*
 * Show a message in the messages div
 */
function showMessage(message)
{
    $("messagesDiv").innerHTML = message;    
    $("messagesDiv").style["visibility"] = "visible";
    if (messageTimer) clearTimeout(messageTimer);
    messageTimer = setTimeout(clearMessages, prefs.getPref("MESSAGES_TIMEOUT"));
}


/*
 * Clear the messages shown to the user
 */
function clearMessages()
{
    $("messagesDiv").style["visibility"] = "hidden";
}


/*
 * What happens when the user clicks the footer
 */
function handleEditFooterClick(a)
{
    //var Event = jsobj.Event;
    //var b = Event.element(a), c = a.charCode ? a.charCode : a.which ? a.which : a.keyCode;
    //var b = Event.element(a), c = a.charCode ? a.charCode : a.which ? a.which : a.keyCode;
    if (a.target.tagName.toUpperCase() != "A")
        toggleEditFooter();
}


/*
 * Insert a style tag for the header/footer
 */
function createDivStyle()
{
    var style = document.createElement("style");
    style.innerHTML = "#editFooter{position:fixed; bottom:0; height:30px; width:100%; backgroundColor:#ffe6e6; }  #messagesDiv{position:fixed; top:0; height:20px; width:100%; background-color:#ffe6e6;}  #prefsDiv{position:fixed; top:0; height:200px; width:100%; background-color:#ffe6e6;}";
    document.getElementsByTagName('head')[0].appendChild(style);
}


/*
 * Create footer to hold links
 */
function createLinksDiv(addStaticLinks)
{
    // @TODO MOVE THIS CODE TO WHEREEVER IT BELONGS
    if (addStaticLinks)
    {
        if (prefs.getPref("USE_POPUP_LINKS"))
            addLinkToDiv("left_side", toggleEditFooter, "Toggle Edit Links (e)", "Toggle Select/Edit Links", true);
        addLinkToDiv("left_side", editPrefs, "MultiEdit Preferences", "MultiEdit Preferences", true);
    }
    
    if (prefs.getPref("USE_POPUP_LINKS"))
    {
        var editFooter = document.createElement('div');
        editFooter.className = "editFooter";
        editFooter.id = "editFooter";
        editFooter.style["border"] = "1px solid #600";
        editFooter.style["margin"] = "5px 0 5px 0";
        editFooter.style["padding"] = "5px";
        editFooter.style["backgroundColor"] = "#ffe6e6";
        document.getElementById("tasks").appendChild(editFooter);
        //var show = (prefs.getPref("SHOW_EDIT_FOOTER_PREF")) ? prefs.getPref("SHOW_EDIT_FOOTER_PREF") : "visible";
        editFooter.style["visibility"] = prefs.getPref("SHOW_EDIT_FOOTER_PREF") ? "visible" : "hidden";
        editFooter.addEventListener("click", handleEditFooterClick, true);
        return "editFooter";
    }
    else
    {
        return "left_side";
    }
}


/*
 * Create a div to show messages to user
 */
function createMessagesDiv()
{


    var messagesDiv = document.createElement('div');
    messagesDiv.className = "messagesDiv";
    messagesDiv.id = "messagesDiv";
    messagesDiv.style["border"] = "1px solid #600";
    messagesDiv.style["margin"] = "75px 0 5px 0";
    messagesDiv.style["padding"] = "5px";
    messagesDiv.style["backgroundColor"] = "#ffe6e6";
    messagesDiv.style["fontWeight"] = "bold";
    messagesDiv.style["fontSize"] = "medium";
    messagesDiv.setAttribute("onclick", "$(\"messagesDiv\").style['visibility'] = 'hidden';");
    messagesDiv.style["visibility"] = "hidden";
    //document.getElementById("viewby").parentNode.insertBefore(messagesDiv, $("viewby"));
    document.getElementById("tasks").appendChild(messagesDiv);
}


/*
 * Insert links to select all or no tasks
 */
function insertSelectAllOrNoneTaskLinks(divId)
{
    if (prefs.getPref("SHOW_SELECT_NONE_LINK"))
        addLinkToDiv(divId, clearAllTasks, "Clear All Tasks (esc)", "None");
    if (prefs.getPref("SHOW_SELECT_ALL_LINK"))
        addLinkToDiv(divId, selectAllTasks, "Select All Tasks (a)", "All");
}


/*
 * Links to select tasks based on due date
 */
function insertSelectTasksByDueDate(divId)
{
    if (prefs.getPref("SHOW_SELECT_NO_DUE_DATE_LINK"))
        addLinkToDiv(divId, selectAllTaskWithNoDueDates, "Select All Tasks With No Due Date", "No Due Date");
    if (prefs.getPref("SHOW_SELECT_OVERDUE_LINK"))
        addLinkToDiv(divId, selectAllOverdueTasks, "Select All Overdue Tasks", "Overdue");
    if (prefs.getPref("SHOW_SELECT_TODAY_LINK"))
        addLinkToDiv(divId, selectAllTasksDueToday, "Select All Tasks Due Today", "Today");
    if (prefs.getPref("SHOW_SELECT_TOMORROW_LINK"))
        addLinkToDiv(divId, selectAllTasksDueTomorrow, "Select All Tasks Due Tomorrow", "Tomorrow");
}


/*
 * Links to select tasks based on priority
 */
function insertSelectTasksByPriority(divId)
{
    if (prefs.getPref("SHOW_SELECT_NEGATIVE_PRI_LINK"))
        addLinkToDiv(divId, selectNegativePriorityTasks, "Select All Tasks With Negative Priority", "Negative");
    if (prefs.getPref("SHOW_SELECT_LOW_PRI_LINK"))
        addLinkToDiv(divId, selectLowPriorityTasks, "Select All Tasks With Low Priority (0)", "Low");
    if (prefs.getPref("SHOW_SELECT_MEDIUM_PRI_LINK"))
        addLinkToDiv(divId, selectMediumPriorityTasks, "Select All Tasks With Medium Priority (1)", "Medium");
    if (prefs.getPref("SHOW_SELECT_HIGH_PRI_LINK"))
        addLinkToDiv(divId, selectHighPriorityTasks, "Select All Tasks With High Priority (2)", "High");
    if (prefs.getPref("SHOW_SELECT_TOP_PRI_LINK"))
        addLinkToDiv(divId, selectTopPriorityTasks, "Select All Tasks With Top Priority (3)", "Top");
}


/*
 * Links to select tasks by tag
 */
function insertSelectTasksByTag(divId)
{
    if (prefs.getPref("SHOW_SELECT_NO_TAG_LINK"))
        addLinkToDiv(divId, selectTasksWithNoTag, "Select All Tasks With No Tag", "No Tag");
    if (prefs.getPref("SHOW_SELECT_TAG_LINK"))
        addLinkToDiv(divId, promptSelectTasksWithTag, "Select All Tasks With Tag...", "Tag...");
    if (prefs.getPref("SHOW_SELECT_TAG_CONTAINING_LINK"))
        addLinkToDiv(divId, promptSelectTasksWithTagMatching, "Select All Tasks With Tag Containing...", "Tag Containing...");
}


/*
 * Insert links to edit task due dates
 */
function insertEditTaskDueDateLinks(divId)
{
    if (prefs.getPref("SHOW_EDIT_POSTPONE_LINK"))
        addLinkToDiv(divId, callPostponeAllSelectedTasksByOneDay, "Postpone (p)", "Postpone");
    if (prefs.getPref("SHOW_EDIT_POSTPONE_X_DAYS_LINK"))
        addLinkToDiv(divId, callPostponeAllSelectedTasksByXDays, "Postpone x Days (x)", "Postpone x Days");
    if (prefs.getPref("SHOW_EDIT_SET_DUE_DATE_LINK"))
        addLinkToDiv(divId, callSetDueDatePrompt, "Set Due Date (d)", "Set Due Date");
}


/*
 * Insert links to edit task due dates
 */
function insertEditTaskStartDateLinks(divId)
{
    if (prefs.getPref("SHOW_EDIT_SET_START_DATE_LINK"))
        addLinkToDiv(divId, callSetStartDatePrompt, "Set Start Date (d)", "Set Start Date");
}



/*
 * Insert links to edit task priority
 */
function insertEditTaskPriorityLinks(divId)
{
    if (prefs.getPref("SHOW_EDIT_NEGATIVE_PRI_LINK"))
        addLinkToDiv(divId, changePriorityToNegativeForSelectedTasks, "Change Priority to Negative", "Negative");
    if (prefs.getPref("SHOW_EDIT_LOW_PRI_LINK"))
        addLinkToDiv(divId, changePriorityToLowForSelectedTasks, "Change Priority to Low", "Low");
    if (prefs.getPref("SHOW_EDIT_MEDIUM_PRI_LINK"))
        addLinkToDiv(divId, changePriorityToMediumForSelectedTasks, "Change Priority to Medium", "Medium");
    if (prefs.getPref("SHOW_EDIT_HIGH_PRI_LINK"))
        addLinkToDiv(divId, changePriorityToHighForSelectedTasks, "Change Priority to High", "High");
    if (prefs.getPref("SHOW_EDIT_TOP_PRI_LINK"))
        addLinkToDiv(divId, changePriorityToTopForSelectedTasks, "Change Priority to Top", "Top");
}


/*
 * Insert links to edit task tag
 */
function insertEditTaskTagLinks(divId)
{
    if (prefs.getPref("SHOW_EDIT_CHANGE_TAGS_LINK"))
        addLinkToDiv(divId, promptChangeTagValueForSelectedTasks, "Change ALL Tag Values", "Change All Tags");
    if (prefs.getPref("SHOW_EDIT_DELETE_TAGS_LINK"))
        addLinkToDiv(divId, removeTags, "Clear All Tags", "Clear All Tags");
    //if (prefs.getPref("SHOW_EDIT_RENAME_TAG_LINK"))
    //    addLinkToDiv(divId, promptRenameTag, "Rename Tag", "Rename Tag");
    if (prefs.getPref("SHOW_EDIT_ADD_TAG_LINK"))
        addLinkToDiv(divId, promptAddTagValueForSelectedTasks, "Add Tag Value", "Add Tag");
    if (prefs.getPref("SHOW_EDIT_DELETE_TAG_LINK"))
        addLinkToDiv(divId, promptRemoveTag, "Remove Tag", "Remove Tag");
}


/*
 * Insert link to clone tasks
 */
function insertEditTaskCloneLink(divId)
{
    if (prefs.getPref("SHOW_EDIT_CLONE_TASKS_LINK"))
        addLinkToDiv(divId, cloneSelectedTasks, "Clone tasks", "Clone Tasks");
}


/*
 * Insert link to delete tasks
 */
function insertEditTaskDeleteLink(divId)
{
    if (prefs.getPref("SHOW_EDIT_DELETE_TASKS_LINK"))
        addLinkToDiv(divId, deleteSelectedTasks, "Delete tasks", "Delete Tasks");
}


function toggleEditFooter()
{
    var editFooter = document.getElementById("editFooter");
    if (editFooter)
    {
    
        var visible = (editFooter.style["visibility"] == "visible") ? false : true;
        editFooter.style["visibility"] = visible ? "visible" : "hidden";
        //prefs.savePref("SHOW_EDIT_FOOTER_PREF", visible);
    }
}


function insertCustomElements(addStaticLinks)
{
    insertEditCheckboxes();
    createDivStyle();
    createMessagesDiv();
    createPrefsDiv();
    var linksDivId = createLinksDiv(addStaticLinks);
    insertLinks(linksDivId);
}
    

/*
 * Insert links for editing tasks
 */
function insertLinks(divId)
{
    var bufferDivId = "bufferDivId";
    addDivTo("tasks", bufferDivId);
    $("bufferDivId").innerHTML = "<p>&nbsp;<p>&nbsp;";
    insertSelectLinks(divId);
    insertEditLinks(divId);
}


/*
 * Insert links to select tasks
 */
function insertSelectLinks(divId)
{
    if(!$("selectTasksDiv"))
    {
        var selectTasksDivId = "selectTasksDiv";
        addDivTo(divId, selectTasksDivId);
        addTextToDiv(selectTasksDivId, "Select:", "padding-right: 5px; font-weight: bold;");
        // Comment out the following lines to change which links appear.
        insertSelectAllOrNoneTaskLinks(selectTasksDivId);
        insertSelectTasksByDueDate(selectTasksDivId);
        insertSelectTasksByPriority(selectTasksDivId);
        insertSelectTasksByTag(selectTasksDivId);
    }
}
    

/*
 * Insert links to edit tasks
 */
function insertEditLinks(divId)
{
    if(!$("editTasksDiv"))
    {
        var editTasksDivId = "editTasksDiv";
        addDivTo(divId, editTasksDivId);
        addTextToDiv(editTasksDivId, "  Edit:", "padding-right: 20px; font-weight: bold;");
        // Comment out the following lines to change which links appear.
        insertEditTaskDueDateLinks(editTasksDivId);
        insertEditTaskStartDateLinks(editTasksDivId);
        insertEditTaskPriorityLinks(editTasksDivId);
        insertEditTaskTagLinks(editTasksDivId);
        insertEditTaskCloneLink(editTasksDivId);
        insertEditTaskDeleteLink(editTasksDivId);
    }
}


/*
 *
 */
function insertEditCheckboxes()
{
    $$("div.row[id] span.task").each(function(taskSpan)
    {
        insertEditCheckbox(taskSpan);
    });
    
}


function insertEditCheckbox(taskSpan)
{
    if (taskSpan !== undefined)
    {
        var id = taskSpan.id.replace("tsk", "");
        new jsobj.Insertion.Before(taskSpan,"<input type=checkbox style='border:none;margin:0;padding:0;float:left;' id='edit" + id + "' class='dett donotedit' onclick=\"this.className=this.checked?'doedit':'donotedit';\"/>&nbsp;");
    }
    else
    {
        showMessage("Error: no task for which to add an 'edit checkbox'.  Please contact the developer of this script.");
    }
}


function newGotSubs(a)
{
    oldGotSubs(a);
    $$("div.subtasks[id=subtasks" + a + "] span.task").each(function(subtaskSpan)
    {
        insertEditCheckbox(subtaskSpan);
    });
    /*
    oldGotSubs(a);
    $("row" + a).getElementsBySelector("div.subtasks[id=subtasks" + a + "]").each(function(rowDiv)
    {
        if (rowDiv.getElementsBySelector("input[id^='edit']").size() == 0)
        {
            rowDiv.getElementsBySelector("span.task").each(function(taskSpan)
            {
                insertEditCheckbox(taskSpan);
            });
        }
    });
    */
}


function newTaskDuplicated(a)
{
    oldTaskDuplicated(a);
    var respText = a.responseText;
    var tskStartIdx = respText.indexOf("span id=\"tsk") + "span id=\"".length;
    var tskEndIdx = respText.indexOf("\"", tskStartIdx);
    var newTaskId = respText.substr(tskStartIdx, tskEndIdx - tskStartIdx);
    var newTskSpan = $(newTaskId);
    insertEditCheckbox(newTskSpan);
}


function trim(str)
{
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
}


function escapeTags(str)
{
    return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"");
}


/**
 * Override Prototype scripts.  DO NOT USE!  BROKEN!
 */
function importPrototypeScripts()
{
    var scripts = 
    [
    'https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js'
    ];
    
    for (i in scripts)
    {
        var script = document.createElement('script');
        script.src = scripts[i];
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}


/*
 * This is the main function.  Execution of the script begins here.
 */
try
{
    String.prototype.trim = function(str) {return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");};
    
    //jsobj = window.wrappedJSObject;
    jsobj = unsafeWindow;
    //jsobj = window.wrappedJSObject;
    //$$ = jsobj.$$;
    $$ = jsobj['$$'];
    $ = jsobj.$;
    $A = jsobj.$A;

    oldGotSubs = jsobj.gotSubs;
    jsobj.gotSubs = newGotSubs;
    
    oldTaskDuplicated = jsobj.taskDuplicated;
    jsobj.taskDuplicated = newTaskDuplicated;
    
    oldKeyboard = jsobj.keyboard;
    
    var onload = function()
    {
        if (prefs.getPref("OVERRIDE_KEYBOARD"))
        {
        	jsobj.window.removeEventListener("keydown", jsobj.keyboard, false);
            jsobj.window.addEventListener("keydown", handleKeyPress, false);
        }
        oldUpdateStatus = jsobj.updateStatus;
        jsobj.updateStatus = newUpdateStatus;
        
    };
    window.addEventListener("load", onload, false);

    loadPreferences();
    
    if ($("tasks"))
        insertCustomElements(true);
}
catch(e){alert(e);throw e;};

