// ==UserScript==
// @name         YouTrack Agile Board ReStyle
// @version      0.1
// @description  Fixes some style-issues of YouTrack by JetBrains and beautifies + minifies the layout.
// @license      CC 1.0 (Public Domain) - http://creativecommons.org/publicdomain/zero/1.0/
// @namespace    http://userscripts.org/scripts/show/314315
// @updateURL    http://userscripts.org/scripts/source/314315.meta.js
// @downloadURL  http://userscripts.org/scripts/source/314315.user.js
// @match        https://*.myjetbrains.com/youtrack/rest/agile/*
// @match        http://*.myjetbrains.com/youtrack/rest/agile/*
// @include      https://*.myjetbrains.com/youtrack/rest/agile/*
// @include      http://*.myjetbrains.com/youtrack/rest/agile/*
// @grant        none
// ==/UserScript==

// TODO downlight resolved swimlanes
// TODO update resolved-state of swimlanes on task-movement

(function() {
  
  var style = document.createElement('style');
  style.textContent =
    // fix column-header
    '#boardTitle { width: 100% !important; }' +
    '.sb-column-title-short .sb-column-title-divider { background: none; }' +
    
    // fix hover-effects
    '.sb-add-task-link:hover>span { background-position: -25px -427px; }' +
    '.sb-swimline-edit:hover>span { background-position: -82px -707px; }' +
    '.sb-swimline-delete:hover>span { background-position: -5px -658px; }' +
    '.sb-swimlane-collapse:hover { posision: relative; top: -1px; left: -1px; cursor: pointer; height: 15px; }' +
    
    // common
    '.sb-is-resolved, .sb-swimline-title-summary-editor_resolved { color: rgba(0,0,0,0.36) !important; }' +
    '.sb-swimline.ui-sortable-helper { opacity: 0.8; }' + // ?
    '.sb-row-divider, .sb-column-estimate { background: none; }' +
    
    // style search
    '.search-west { width: 250px; }' +
    '.search-center { margin-left: 218px; }' +
    
    // style backlog
    '.sb-backlog-toggler { max-height: 500px; }' +
    '.sb-backlog-toggler-ico { width: 14px; height: 18px; }' +
    
    // style swimlane
    // style swimlane / title
    '.sb-swimline-title-container { padding: 0 6px; margin-left: -41px; margin-right: 9px; }' +
    '.sb-swimline-title-content { padding: 0; border-top: 1px solid #ABABAB;' +
    '  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(91,136,145,0.25)), to(rgb(91,136,145))); }' +
    '.sb-swimline-title-id { padding-left: 8px; }' +
    '.sb-swimline-title-summary-editor { font-size: 12pt; }' +
    '.sb-swimline-title-summary-editor>form>input { border: none; font-size: 12pt;' +
    '  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(0,0,0,0.05)), to(rgba(0,0,0,0.2)));}' +
    '.sb-swimline-dropdown { opacity: 0.2; margin: 0; width: 255px; text-align: right; position: absolute; right: 47px;' +
    '  background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(transparent), to(black)); }' +
    '.sb-row:hover .sb-swimline-dropdown { opacity: 0.5; }' +
    '.sb-row-selected .sb-swimline-dropdown { opacity: 1 !important; }' +
    '.sb-swimlane-btn { line-height: 22px; height: 18px; }' +
    // style swimlane / title / collapse-img
    '.sb-swimlane-collapse { margin: 3px 8px 0 -16px; height: 14px; }' +
    // style swimlane / columns
    '.sb-swimline-content { height: 45px; }' + // min-height
    '.sb-column { padding: 2px 0; background: rgba(104,157,185,0.04); border-left: 1px dashed rgba(139,182,216,0.5); }' +
    '.sb-row:hover .sb-column { background: rgba(104,157,185,0.1); }' +
    '.sb-row-selected .sb-column { background: rgba(104,157,185,0.16) !important; }' +
    '.sb-task { margin-top: 0; }' +
    // style swimlane / draggable
    '.sb-row:hover .sb-draggable { background: rgba(91,136,145,0.1); }' +
    '.sb-row-selected .sb-draggable { background: rgba(91,136,145,0.3) !important; }' +
    // style swimlane / drop-placeholder
    '.sb-row.ui-sortable-placeholder { background-color: rgba(110,160,200,0.8) !important; display: block; }' +
    '.sb-el-placeholder { background-color: transparent !important; }' +
    
    // style orphans (untitled swimlane on bottom of page)
    '.sb-orphans .sb-column { background: #B18F8F; border-color: #7A6565; }' +
    '.sb-orphans:hover .sb-column { background: #997070; border-color: #614B4B; }' +
    '.sb-row-selected.sb-orphans .sb-column { background: #8D6D6D !important; border-color: #513B3B; }' +
    
    // style tasks
    '.sb-task-in { padding: 0; margin: 0 4px 2px; }' +
    '.sb-task-in-minimal { padding: 0 4px; }' +
    '.sb-task-title { padding: 0 20px; margin: 0 4px; }' +
    '.sb-task-summary { margin: 4px 7px 2px 4px; }' +
    '.sb-task-description { margin: 0 0 0 14px; }' +
    '.sb-task-header-assignee { margin: 0; }' +
    'div.sb-task-header-assignee { display: none; }' + // hide if not an anchor
    // style tasks / drop-placeholder
    '.sb-el-placeholder.sb-task { background-color: rgba(104,157,185,0.6) !important; }' +
    // style tasks / title
    '.c17 { background-color: transparent !important; }' + // fix bg-color of title-properties
    '.sb-task-title { background: rgba(227,238,209,0.5); }' +
    '.jt-prop-title.c0 { color: #64992C; }' +
    '.sb-task:hover .sb-task-title{ background-color: rgb(223,236,196); }' +
    '.sb-task-focused .sb-task-title { background-color: rgb(202,226,153) !important; border-color: red red #B4B4B4 !important; }' +
    // style tasks / content
    '.sb-task-in { background-color: rgba(255,255,255,0.5); }' +
    '.sb-task:hover .sb-task-in { background-color: rgba(255,255,255,0.75); }' +
    '.sb-task-focused .sb-task-in { background-color: white !important; }' +
    '.sb-task-focused .sb-task-in { border-color: red !important; }' +
    // style tasks / details
    '.sb-task-details { display: none; }';
  document.head.appendChild(style);
  
  var moveTypeToTitle = function(task) {
    if (typeof task == 'string')
      task = document.querySelector(task);
    var into = task.querySelector('.sb-task-title');
    var type = task.querySelector('.jt-prop-title[title="Type"]');
    if (!type || into.querySelector('.jt-prop-title[title="Type"]'))
      return;
    typeDropBox = type.nextElementSibling;
    into.appendChild(type.previousElementSibling); // separator
    into.appendChild(type); // type
    into.appendChild(typeDropBox); // dropbox
    task.addEventListener('DOMNodeRemovedFromDocument', function() {
      var id = this.getAttribute('id');
      setTimeout(function(){ moveTypeToTitle('#'+id); }, 50);
    });
  };
  
  var tasks = document.querySelectorAll('.sb-task');
  for (var i = 0; i < tasks.length; i ++)
    moveTypeToTitle(tasks[i]);
  
})();