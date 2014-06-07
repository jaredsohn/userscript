// ==UserScript==
// @name        Google Code Project Filter
// @description Will filter projects that hosting on google code by activity level.
// @namespace   g2w.userjs.gcfilter
// @include     http://code.google.com/hosting/search*
// @version     0.2
// @author      greatghoul
// ==/UserScript==

// Add Styles
GM_addStyle('#google-code-filter { position:fixed; list-style:none; margin: 0; '
    + 'padding: 3px; background:#EBEFF9; border:1px outset #6B90DA; top:25px; right:8px;}');
GM_addStyle('#google-code-filter li { display:inline; color:#676767; }');

// GM_setValue, GM_getValue Chrome emulation
if (!this.GM_getValue || !this.GM_getValue.toString 
        || this.GM_getValue.toString().indexOf('not supported') > -1) {
    this.GM_getValue = function(key, defaultValue) {
        return localStorage[key] || defaultValue;
    };
    this.GM_setValue = function(key, value) {
        return localStorage[key] = value;
    };
}

var projectTags = [];

// Activity configurations
var activities = [
    { level: 'High',   state: '1' },
    { level: 'Medium', state: '1' },
    { level: 'Low',    state: '1' },
    { level: 'None',   state: '1' }
];

// Load the saved configuration on startup.
function loadFilterStates() {
    for (var i = 0; i < activities.length; i++) {
        activities[i].state = GM_getValue(activities[i].level, '1');
    }
}

// Save the current filter configurations.
function saveFilterStates() {
    for (var i = 0; i < activities.length; i++) {
        GM_setValue(activities[i].level, activities[i].state);
    }
}

function filterProjects(index, activity, checked) {
    for (var i = 0; i < projectTags.length; i++) {
        var projectTag = projectTags[i];
        if (projectTag.innerHTML.indexOf('class="' + activity + '"') != -1) {
            projectTag.style.display = (checked ? 'block' : 'none');
        }
    }
    
    activities[index].state = checked ? '1' : '0';
    saveFilterStates();
}

// Collect project list.
function collectProjects() {
    // Get layout mode
    var mode = document.getElementsByName('mode')[0].value;

    var serp = document.getElementById('serp');
    if (mode == 'grid') {
        projectTags = serp.firstElementChild.children;
    } else {
        projectTags = serp.children;
    }
}

// Initialize the extension.
function initialization() {
    loadFilterStates();
    createFilterPanel();
    collectProjects();
    executeDefaultFilters();
}

// Create Style Sheet
function createStyleSheet() {
    var css = [];
}

function executeDefaultFilters() {
    for (var i = 0; i < activities.length; i++) {
        var activity = 'activity-level-' + activities[i].level;
        var filterNode = document.getElementById(activity);
        filterProjects(i, activity, filterNode.checked);
    }
}

function createFilterPanel() {
    // create filter panel.
    var html = [];
    html.push('<ul id="google-code-filter" onselectstart="return false;">');
    for (var i = 0; i < activities.length; i++) {
        var activity = activities[i];
        var level = 'activity-level-' + activity.level;
        var label = activity.level;
        var state = activity.state == '1' ? 'checked' : '';

        var tpl = '<li><input type="checkbox" value="%level" id="%level" %state /><label for="%level"><img src="http://www.gstatic.com/codesite/ph/images/cleardot.gif" class="%level"> %label</label></li>';
        html.push(tpl.replace(/%level/g, level).replace(/%state/g, state).replace(/%label/g, label));
    }
    html.push('</ul>');
    document.body.innerHTML += html.join('');

    // Filter event bindings.
    for (var i = 0; i < activities.length; i++) {
        var level = 'activity-level-' + activities[i].level;
        var filterNode = document.getElementById(level);
        filterNode.setAttribute('index', i);
        filterNode.addEventListener('click', function() { 
            var index = parseInt(this.getAttribute('index'));
            var activity = this.value;
            var checked = this.checked;
            filterProjects(index, activity, checked); 
        });

    }
}

initialization();
