// The West DB Menu Icon
// version 0.1 BETA!
// 9.3.2010
// Copyright (C) 2009 The WEST DB <tw-db.info>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name           The West DB Menu Icon
// @namespace      www.the-west.sk
// @description    TW-DB.INFO
// @include        http://*.the-west.*
// @exclude        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://*innogames.*
// @exclude        http://w1.public.beta.the-west.net/game.php#
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==


var actual_world = window.location.host.substr(0,3);
var actual_region = window.location.host.substr(0,2);

var tw_db_link = document.createElement("li");
tw_db_link.id="tw_db_link";
tw_db_link.innerHTML = '<a style="background:url(http://img214.imageshack.us/img214/8919/twdb.png) no-repeat" href="http://www.tw-db.info/" target="_blank"></a>';
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_64', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_64', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=64&version=0.2';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();