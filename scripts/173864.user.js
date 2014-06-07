// ==UserScript==
// @name        Yad2RemoveAgents
// @namespace   http://userstyles.org
// @description Remove Agents' ads
// @include     http://www.yad2.co.il/*
// @version     1
// ==/UserScript==

(function(){
  var agentsTable = document.getElementById('tiv_main_table');
  if (!agentsTable) return;
  agentsTable.parentNode.removeChild(agentsTable);
})();
