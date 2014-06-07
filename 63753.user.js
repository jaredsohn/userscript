// ==UserScript==
// @name           Datacenter
// @namespace      http://userscripts.org/users/snc
// @description    Add Quick logon links to Datacenter query results.
// @include        https://*.service-now.com/cmdb_ci_service_list.do?*sysparm_view=data_center*
// ==/UserScript==


function init(){
    (function(){document.body.appendChild(document.createElement('script')).src='http://<IP ADDRESS>:81/all/scripts/datacenter.js';})();
  }
  init();