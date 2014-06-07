// ==UserScript==
// @name           Ikariam Military Tooltip Changer
// @namespace      IkariamMilitaryTooltipChanger
// @author         Martynius
// @version        0.2.1
// @description    Shows the Miltiary Fleet view with Tooltips always showing and changes column widths.
// @downloadURL    https://userscripts.org/scripts/source/133235.user.js
// @updateURL      https://userscripts.org/scripts/source/133235.meta.js
// @include        http://s*.*.ikariam.gameforge.com/index.php?*
// @exclude        http://support.*.ikariam.gameforge.com/index.php?*
//
//
// @history	0.2.1	Smaller icons.
// @history	0.2.0	Updated for version 0.5.0 and changed to manipulate CSS only.
// @history	0.1.1a	Bugfix: Updated Dependency.
// @history	0.1.1	Updated to show number of ships sent by other players.
// @history	0.1.0	Original Version (developed from <a href="http://userscripts.org/scripts/show/34766">Ikariam Pulldown Changer</a>).
// ==/UserScript==

GM_addStyle(
	'table.military_event_table th:nth-child(1) { width: 25px !important; }' +
	'table.military_event_table th:nth-child(3) { width: 50px !important; }' +
	'table.military_event_table th:nth-child(4), table.military_event_table td:nth-child(5) { width: 210px !important; }' +
	'table.military_event_table th:nth-child(6), table.military_event_table td:nth-child(7) .mission_icon { width: 50px !important; }' +
	'table.military_event_table th:nth-child(8) { width: 40px !important; }' +
	'table.military_event_table td:nth-child(4) { width: 0px !important; }' +
	'table.military_event_table td:nth-child(4) * { display: none; }' +
	'table.military_event_table td { padding: 0px !important; }' +
	'table.military_event_table td.magnify_icon { background-image: none; cursor: default; }' +
	'table.military_event_table td.magnify_icon>div { display: inline; position: relative; margin: 0px; background-color: transparent; border: none; padding: 0px; }' +
	'table.military_event_table td.magnify_icon>div h5 { display: none; }' +
	'table.military_event_table .infoTip { margin: 0px !important; }' +
	'table.military_event_table .icon40 { background-size: 28px 28px; background-position: center top; padding: 31px 3px 0px 3px; min-width: 28px; width: auto; }' +
	'table.military_event_table .icon40.resource_icon { background-size: 35px 28px; }' +
	'table.military_event_table a.abort { display: block; width: 100%; }'
);