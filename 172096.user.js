// ==UserScript==
// @name           hwm_quest_10
// @namespace      Demin
// @description    HWM mod - Pokazyvaet silu kart v 10 kveste (by Demin)
// @homepage       http://userscripts.org/users/263230/scripts
// @version        1.1
// @include        http://*heroeswm.ru/quest_show_state*
// @include        http://178.248.235.15/quest_show_state*
// @include        http://209.200.152.144/quest_show_state*
// @include        http://*lordswm.com/quest_show_state*
// ==/UserScript==

// (c) 2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '1.1';

// translit.ru

// Kod skripta mozhno znachitel'no uprostit'. Vnachale ja ne pravil'no ponjal frazu "chast' monstrov poluchaet dopolnitel'noe ochko" v zavisimosti ot napitka i povyshal silu kartam. Dlja jetogo nuzhen byl massiv. V posledstvii jetot kod ja udalil.

// Kod skripta dolzhen vygljadet' sledujushhim obrazom. Poluchaem karty kotorye maksimal'ny ili minimal'ny i sohranjaem poslednjuju cifru puti izobrazhenija GM_setValue("kart", "5,7"); Gde 5 - jeto maksimum, a 7 - jeto minimum, t.k. vse karty odnogo urovnja. Na sledujushhih stranicah poluchaem vse karty i otrisovyvaem na nih poslednie cifry puti izobrazhenija. Krome goblina - emu prisvaivaem 9. I esli poslednjaja cifra jeto maksimum (v nashem sluchae 5) ili minimum (7), to na nih 8 i 0 sootvetstvenno.

// T.e. rabota s massivom sejchas v skripte lishnjaja. Perepisyvat' uzhe ne budu, t.k. kvest projden.

// Takzhe mozhno dobavit' podschet ostavshihsja kart u naemnika.


if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

var karts_now = document.querySelectorAll("img[src*='i/quest_casino/'][src$='.gif']");
var kart_now, kart_div;
var kart_mass = [];

if ( karts_now.length > 10 ) {

	for ( var i=0; i<68; i++ ) {
		var sila_karty = i.toFixed().substring(1);
		if ( sila_karty > 0 && sila_karty < 8 ) {
			kart_mass.push( i + ":" + sila_karty );
		} else {
			kart_mass.push( i );
		}
	}

//	goblin
	kart_mass[71] = "71:9";

//	alert(kart_mass);

//	samye sil'nye i slabye karty
	for ( var i=karts_now.length; i--; ) {
		kart_now = /i\/quest_casino\/(\d+).gif/.exec(karts_now[i].src)[1];
		if ( i < 6 ) {
			kart_mass[kart_now] = kart_now + ":8";
		} else {
			kart_mass[kart_now] = kart_now + ":0";
		}
	}
//	alert(kart_mass);

	GM_setValue("kart_mass", "" + kart_mass);

}

kart_mass = GM_getValue("kart_mass");

for ( var i=karts_now.length; i--; ) {
	kart_now = /i\/quest_casino\/(\d+).gif/.exec(karts_now[i].src)[1];

	kart_div = document.createElement( 'span' );
	kart_div.setAttribute( 'style', 'position:absolute; font-size: 8px; padding: 0px 2px; margin: 2px; border: 1px solid #999; text-decoration: none; background:#fff;' );
	kart_div.innerHTML = kart_mass.split( kart_now + ":")[1].split( "," )[0];

	karts_now[i].parentNode.insertBefore( kart_div, karts_now[i] );
}
