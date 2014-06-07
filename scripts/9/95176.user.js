// ==UserScript==
// @name           [Master Key] Youtube Dynamique
// @namespace       MK
// @description		Recharge automatiquement la page toutes les 4 minutes
// @version			1.0.0
// @include        http://www.youtube.com/watch/?v=DPrpmn-_Uow&feature=related
// @copyright		Basé sur script de sofea
// @license			GPL version 3 or any later version;
// @license			http://www.gnu.org/copyleft/gpl.html
// @resource		licence	http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

var time = 240000 // temps en millisecondes
window.setTimeout(function() {location.reload();}, time);