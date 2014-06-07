// ==UserScript==
// @name         Travian Delete All IGM
// @namespace    Travian
// @author	 ww_start_t
// @version 	 6.0
// @description	 Add filter messages and reports
// @copyright	 © Travian
// @license  	 K.S.A
// @include      http://*.travian.*/nachrichten.*
// @include      http://*.travian.*/berichte.*
// ==/UserScript==

function ID(id) { return document.getElementById(id) };

var CB = '<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';

ID("overview").getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML = CB;