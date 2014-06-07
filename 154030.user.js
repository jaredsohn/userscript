// ==UserScript==
// @name        Unpede Tallinna Sõiduplaan
// @namespace   v6.nosepicking
// @include     http://soiduplaan.tallinn.ee/*
// @version     1.1
// @run-at      document-end
// @grant       GM_addStyle
// ==/UserScript==

(function(window, unsafeWindow, documetr) {
var GM_addStyle = window.GM_addStyle || function(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
};

function fix_css(){
	GM_addStyle ([''
		,'.trol, .tram, .commercialbus, .regionalbus, .bus {background-color: #000000!important; text-shadow: none!important;}' // v2rgiline pedemajandus
		,'.icon.icon_bus, .icon.icon_tram, .icon.icon_trol {display: none!important;}' // m2rgiline pedemajandus 1
		,'.icon.icon_commercialbus, .icon.icon_train, .icon.icon_regionalbus {display: none!important;}' // m2rgiline pedemajandus 2
		,'#divHeader {background: none!important;}' // puhta pedemajandus
		,'#divLogo {display: none!important;}' // edgari pedemajandus
		,'#city .icon, #region .icon {display: none!important;}' // asukoha pedemajandus
		,'.icon.icon_tickets, .icon.icon_plan, .icon.icon_news, .icon.icon_stops {display: none!important;}' // pileti ja kaardi pedemajandus
		,'#programmedBy {display: none!important;}' // shameless product placement pedemajandus
		,'#webcounter {display: none!important;}' // tillipikendus pedemajandus
		,'#aTicketsHarju .icon, #aTransportNewsHarju .icon {display: none!important;}'
		,'#spanTicketsHarju span, #spanTransportNewsHarju span {visibility: visible!important;}' // pedejoondamise pedefix
		,'.highlighted, .highlighted2 {background: none!important; border-width: 0!important;}' // madalp6hja pedemajandus

		// my custom - valitud peatuste ja aegad parem esiletoomine
		// ,'#divScheduleLeft a.current, #divScheduleRight a.current, #divScheduleLeft a.current0, #divScheduleRight a.current0, #divScheduleLeft a.current1, #divScheduleRight a.current1, #divScheduleLeft a.current2, #divScheduleRight a.current2, #divScheduleLeft a.current3, #divScheduleRight a.current3 {background-color: green!important;}'
		// ,'.timetable a.clicked {background-color: green!important;}'
		].join('')
	);
}

function start(){
	fix_css();
}

start();

})(this, this.unsafeWindow || this, document);
