// ==UserScript==
// @name           Remember the Milk - Ordered Task Cloud
// @namespace      com.rememberthemilk.orderedtaskcloud
// @include        http://www.rememberthemilk.com/home/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { unsafeWindow.jQuery.noConflict(); withJQuery(unsafeWindow.jQuery); }
}
GM_wait();

// Option: Regex
var regex, REGEX_GMVAR = 'com.rememberthemilk.orderedtaskcloud.regex';
function restoreRegex() { regex = eval('('+GM_getValue(REGEX_GMVAR, '/^\\+/')+')'); }
restoreRegex();

GM_registerMenuCommand("Ordered Task Cloud: Change regex", function () {
    var newRegex = prompt(
        "Enter the regular expression to match the tags agains, include slashes", 
        GM_getValue(REGEX_GMVAR, '/^\\+/')
    );
    if (newRegex == null) return;
    GM_setValue(REGEX_GMVAR, newRegex);
    restoreRegex();
    unsafeWindow.taskCloud.update();
});

// Option: List name
var listName, LIST_NAME_GMVAR = 'com.rememberthemilk.orderedtaskcloud.listName';
function restoreListName() { listName = GM_getValue(LIST_NAME_GMVAR, '+Projects'); }
restoreListName();

GM_registerMenuCommand("Ordered Task Cloud: Change list name", function () {
    var newListName = prompt(
        "Enter the list name", 
        GM_getValue(LIST_NAME_GMVAR, '+Projects')
    );
    if (newListName == null) return;
    GM_setValue(LIST_NAME_GMVAR, newListName);
    restoreListName();
    unsafeWindow.taskCloud.update();
});


// Rest of the GM code
function withJQuery($) {
    
    var importFromUnsafeWindow = [
        '_T',
        'stateMgr',
        'tagMgr',
        'tagList',
        'is',
        'control',
        'el',
        'String.prototype.escapeForAttr',
        'String.prototype.replaceStr'
    ];
    for (var importKey in importFromUnsafeWindow) {
        eval(importFromUnsafeWindow[importKey] + ' = unsafeWindow.' + importFromUnsafeWindow[importKey]);
    }
    
    /**
= Ordered Task Cloud

Takes certain tags (by regex) and matches them to tasks in a specified list.
The tags are displayed into the tag cloud with the following properties inherited:
 • Priority (and ordered by priority)
 • Name
    */

    /** Task cloud showTag */
    var oldTaskCloudShowTag = unsafeWindow.TaskCloud.prototype.showTag;
    unsafeWindow.TaskCloud.prototype.showTag = function(A, B) {
        if (B != undefined) {
            el('listFilter').value = 'tag:' + A + ' NOT list:' + B; 
            control.updateListFilter();
        } else {
            oldTaskCloudShowTag(A);
        }
    };
	
    /** Task cloud update */
    var oldTaskCloudUpdate = unsafeWindow.TaskCloud.prototype.update;
    unsafeWindow.TaskCloud.prototype.update = function () {
        var s = {};
        var Z = [];
        var a = true;
        var W = 0,
        AA = null,
        m = 0,
        M = null,
        X = 0,
        AB = null, 
        orderList;
        var R = 9;
        for (var j in stateMgr.lists) {
            a = false;
            var U = stateMgr.lists[j];
            if (!U.archived && !U.deleted && U.filter === null) {
                if (U.name == listName) orderList = U;
            }
        }
        if (a) {
            return false
        }
        var A = {};
        var d = {};
        var orderTasks = {}, orderTagsToTask = {};
        for (var K in stateMgr.tasks) {
            if (!is(stateMgr.tasks[K])) {
                continue
            }
            var f = stateMgr.tasks[K];
            if (! (f.series_id in d)) {
                d[f.series_id] = f.date_completed ? [0, 1] : [1, 0]
            } else {
                if (f.date_completed) {
                    d[f.series_id][1]++
                } else {
                    d[f.series_id][0]++
                }
            }
            if (f.date_completed) {
                continue
            }
            
            if (orderList && f.list_id == orderList.id) {
                orderTasks[f.series_id] = f;
            }

            if (!is(A[f.series_id])) {
                A[f.series_id] = 1
            } else {
                A[f.series_id]++
            }
        }
        for (var p in tagMgr.index) {
            if (!is(tagMgr.index[p])) {
                continue
            }
            var z = 0,
            V = 0,
            Y = 0;
            for (var v = 0; v < tagMgr.index[p].length; v++) {
                if (tagMgr.index[p][v] in d) {
                    var H = d[tagMgr.index[p][v]];
                    V += H[0];
                    Y += H[1]
                }
                if (!is(A[tagMgr.index[p][v]])) {
                    continue
                } else {
                    z += A[tagMgr.index[p][v]]
                }
                if (tagMgr.index[p][v] in orderTasks) {
                    orderTagsToTask[p.toLowerCase()] = orderTasks[tagMgr.index[p][v]];
                }
            }
            s[p.toLowerCase()] = [V, Y];
            if (z == 0) {
                continue
            }
            Z.push([1, p.toLowerCase(), z]);
            if (M === null || z < M) {
                M = z
            }
            if (z > m) {
                m = z
            }
        }
        setTimeout(function() {
            tagList.onDataUpdated(s)
            }, 0);
		
        Z.sort(function(A, B) {
            var D = "PN";
            var Dn = A[1];
            if (orderTagsToTask[A[1]]) {
                D = orderTagsToTask[A[1]].priority;
                Dn = orderTagsToTask[A[1]].name;
            }
            var E = "PN";
            var En = B[1];
            if (orderTagsToTask[B[1]]) {
                E = orderTagsToTask[B[1]].priority;
                En = orderTagsToTask[B[1]].name;
            }
            
            if (D == E) {
                if (Dn > En) {
                    return 1
                } else if (Dn < En) {
                    return -1
                }
                return 0
            }
            if (D > E) {
                return 1
            } else if (D < E) {
                return - 1
            }
        });
        
// RENDERING
        var D = [];
        var E = "tasktag";
        var F = "0";
        var O = "";
        if (AA === null) {
            AA = 0
        }
        if (M === null) {
            M = 0
        }
        if (AB === null) {
            AB = 0
        }
        var u;
        for (var v = 0; v < Z.length; v++) {
            var p = Z[v];
            var q,
            I;

            if (!p[1].match(regex)) continue;
            if (p[0] == 1) {
                E = "tasktag";
                q = 1 + parseInt(p[2] / m * (R - 1), 10);
                I = "onclick=\"taskCloud.showTag('" + String(p[1]).escapeForAttr() + "', '" + listName + "'); return false;\""
            }
            if (p[2] == 0) {
                u = "INTERFACE_TASKS_LIST_DETAILS_ZERO_TASKS"
            } else {
                if (p[2] == 1) {
                    u = "INTERFACE_TASKS_LIST_DETAILS_ONE_TASK"
                } else {
                    u = "INTERFACE_TASKS_LIST_DETAILS_NUM_TASKS"
                }
            }
            O = _T(u, {
                "NUM": p[2]
                });
            var orderTagName = p[1];
            var orderTagPriority = "PN";
            if (orderTagsToTask[p[1]]) {
                orderTagName = orderTagsToTask[p[1]].name;
                orderTagPriority = orderTagsToTask[p[1]].priority;
            }
            D.push('<span class="' + E + ' ' + orderTagPriority + '"><a href=" " ' + I + ' title="' + O + '">' + orderTagName + "</a></span>")
            }
        O = D.join("\n");
        this.div.innerHTML = O;
        if (this.copyDiv) {
            this.copyDiv.innerHTML = O
        }
    }
    unsafeWindow.taskCloud.update();
}

window.addEventListener('load', function() {
        var style = <r><![CDATA[
            #taskcloudcontent_copy { padding: 0 8px; }
			#taskcloudcontent_copy .tasktag { 
			    display: block; 
			    border-left: 4px solid transparent;
			    padding-left: 4px;
			    margin-bottom: 2px;
			}
			#taskcloudcontent_copy a {
			    line-height: 120%;
			}
			#taskcloudcontent_copy .tasktag.P1 { border-left-color: #EA5200; }
			#taskcloudcontent_copy .tasktag.P2 { border-left-color: #0060BF; }
			#taskcloudcontent_copy .tasktag.P3 { border-left-color: #359AFF; }
        ]]></r>.toString();
        var head = document.getElementsByTagName("head")[0];
        var el = window.document.createElement('link');
        el.rel = 'stylesheet';
        el.type = 'text/css';
        el.href = 'data:text/css;charset=utf-8,' + escape(style);
        head.appendChild(el);
    }, true);
