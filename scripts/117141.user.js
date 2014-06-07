// ==UserScript==
// @name           NXIcom
// @namespace      Mihashi
// @version        0.21
// @updateURL      https://userscripts.org/scripts/source/117141.user.js
// @description    Mise en forme des commentaires de Next Inpact v5 - par Mihashi - mihashi@inpactien.com
// @include        http://www.nextinpact.com/*
// @include        https://www.nextinpact.com/*
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle("#content_left {min-height: 0 !important} #bloc_commentaires {width: 984px !important; margin-left: 8px !important} #titre_commentaire {width: 960px !important} #commentaires_list > #pager, div#pager.pager.bg_url_title-gradient {width: 984px !important} .commentaire {min-height: 145px !important} .commentaire_image .commentaire_status {width: 120px !important} .commentaire_avatar {height: 120px !important; line-height: 120px !important; width: 120px !important} .commentaire_avatar img {line-height: 120px !important; max-height: 120px !important; max-width: 120px !important} .commentaire_entete, .commentaire_entete_team {padding-left: 138px !important; width: 844px !important} .commentaire_supprime > div {width: 844px !important} .commentaire_content {margin-left: 137px !important; width: 840px !important} .acceuiltest_separateur {width: 984px !important} #commentaireFrm_entete {width: 960px !important} #commentaireFrm_form {width: 810px !important; height: inherit !important; min-height: 282px !important} #commentaire_Frm textarea {width: 776px !important} .commentaire_content textarea {width: 782px !important} #commentaire_Frm_button {margin-bottom: 7px !important} .depliant_comment fieldset {width: 825px !important; margin-left: 137px !important} .comment_alert_arrow {left: 933px !important} .slide_comment .editor-row {max-width: inherit !important; width: 825px !important} .slide_comment .editor-row .editor-field {width: 617px !important} .slide_comment .editor-row .editor-field textarea {width: 600px !important} .actu {padding-top: 6px !important; padding-bottom: 2px !important; margin-bottom: 0px !important} .actu_type {top: -36px !important} .actu_ico {margin-top: -2px !important} .list_ico {margin-top: 10px !important} .list_actu {padding-top: 0} .list_actu li:nth-child(2n+1) {background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAngAAAABCAQAAADnLBuRAAAAAXNSR0IArs4c6QAAACZJREFUOMtjZKABmG6Mwv2PVdF/HJoHu+pR/4y6cDTEh5h/MuHiAGHKNAKZzahoAAAAAElFTkSuQmCC')}");

(function () {
	var bloc_commentaires = document.getElementById('bloc_commentaires');
	var content_left = document.getElementById('content_left');
	var layout = document.getElementById('content');
	content_left.removeChild(bloc_commentaires);
	layout.appendChild(bloc_commentaires);
})()

