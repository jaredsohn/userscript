// The West Show All Jobs on Map
// version 1
// Copyright (C) 2010 Peter Ward (x.peter.ward.x@gmail.com)
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name				The West Show All Jobs on Map
// @namespace		www.the-west.net
// @description		Enables ALL jobs on the map - even ones you shouldn't be able to see
// @include			http://*.the-west.*/game.php*
// ==/UserScript==



function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}



function main() {
	addEndDiv('WMap.initialize();');
	addEndDiv('Character.skills = {"build":999,"punch":150,"tough":150,"endurance":150, "health":150, "ride":150,"reflex":150,"dodge":150,"hide":150,"swim":150,"aim":150,"shot":150,"pitfall":150,"finger_dexterity":150,"repair":150,"leadership":150,"tactic":150,"trade":150,"animal":150,"appearance":150};');
	addEndDiv('Character.recalc_skill_attr();');
	addEndDiv('WEvent.register("level", Character.redraw_level_box.store(Character));');
	addEndDiv('WEvent.register("character_values_changed", Character.recalc_skill_attr.store(Character));');
	addEndDiv('WEvent.register("character_values_changed", WMap.mapData.update_all_jobs.store(WMap.mapData));');
	addEndDiv('AjaxWindow.show("skill");');
	addEndDiv('AjaxWindow.close("skill");');
}

window.setTimeout(main, 2000);


/////////////////////////////////
// Monkey Updater /////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_62', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_62', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=62&version=0.4.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();