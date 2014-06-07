// ==UserScript==
// @name           eBuddy Cleaner
// @author         aeniGma aka Eremita Solitario - http://www.thekey.it
// @namespace      eBuddy_Cleaner
// @description    Clean the eBuddy webmessanger window
// @include        http://web.ebuddy.com/*
// ==/UserScript==

/*
<div id="container-banner" class="panel" style="display: block;">
        <!--<div id="wrapper-banner">
            <div id="skip"></div>
        </div>-->
</div>
<iframe id="banner" style="width:160px; height:600px; border:0;" src=""></iframe>
*/

var container_banner = document.getElementById('container-banner');
if (container_banner) { container_banner.parentNode.removeChild(container_banner); }

var iframe_banner = document.getElementById('banner');
if (iframe_banner) { iframe_banner.parentNode.removeChild(iframe_banner); }

var container_app = document.getElementById('container-app');
if (container_app) { container_app.style.right = '0px'; }

var dialog_container = document.getElementById('dialog-container');
if (dialog_container) { dialog_container.etyle.right = '0px'; }

// alert('eBuddy Cleaner');

