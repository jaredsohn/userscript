// ==UserScript==
// @name           TA Sim Adddon
// @description    Mirror army
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        0.9
// @author         Mister X
// @require        http://sizzlemctwizzle.com/updater.php?id=138212
// ==/UserScript==
window.TASuite.main.getInstance().mirrorArmy = function() {
	var army = window.TASuite.main.getInstance().J.V;
	
	for (var i = 0; i < army.length; i++) {
		var unit = army[i];
		unit.MoveBattleUnit(8 - unit.get_CoordX(), unit.get_CoordY())
	}
}