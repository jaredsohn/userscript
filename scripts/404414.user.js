// ==UserScript==
// @name        Rally Style Improvements
// @namespace   http://xiaan.com
// @include     https://rally1.rallydev.com/*
// @description UI improvements to make Rally easier to use
// @grant       none
// @copyright   2014 Christiaan van Woudenberg
// @version     1.0
// @licence     MIT
// ==/UserScript==

(function () {

  function addGlobalStyle(css) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
  }

  var styles = [
    'th select { width:80px; }', // Make all column filter selects small to start
    'td.cn_owner0 select { width:80px; }',
    'td.cn_rank0, td.cn_estimate0, td.cn_state0 { width:50px; }', // Make small fields smaller
    'td.cn_name0 { width:300px; }', // Make name field larger 
    'td.cn_name0 input[type="text"] { width:400px; }', // Make name field larger in multi-edit view
    'select[name=featureOid] { width:160px; }',
    'img.card-owner-img { display:none; }', // Hide Kanban user images
    '.x-menu a.x-menu-item { font-size:11px; }', // Make dropdowns in custom grid settings smaller  
  ].join('\n');

  addGlobalStyle(styles);

}());
