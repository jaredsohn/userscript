// ==UserScript==
// @name        HackForums Hide Pending Group Membership Join Requests Alert
// @namespace   https://userscripts.org/scripts/show/133673
// @match       *://*.hackforums.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author      PyroStorm
// @version     1.0.0
// @downloadURL https://userscripts.org/scripts/source/133673.user.js
// @updateURL   https://userscripts.org/scripts/source/133673.meta.js
// ==/UserScript==
// Copyright 2012 PyroStorm
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
$('a[href="usercp.php?action=usergroups"]').parent().filter(".pm_alert").hide()