// ==UserScript==
// @name           SK Forum tema
// @namespace      http://userscripts.org/users/96101
// @description    Menja podrazumevanu temu SK foruma
// @include        http://www.sk.rs/forum/*
// @exclude        http://www.sk.rs/forum/modcp/*
// @exclude        http://www.sk.rs/forum/archive/*
// ==/UserScript==
// Licence: GNU GPL v3
// Author: Aleksandar Urosevic, urke@users.sourceforge.net
// Latest update: 07-07-2009
//---------------//
// Version : 0.7 //
//---------------//
// 0.7 [07-07-2009] dodata dugmad po temama i resen problem promene dugmadi kod promene korisnicke teme 
// 0.6 [24-06-2009] dodati avatari u odgovarajucoj boji za redakciju, saradnike i moderatore
// 0.5 [22-06-2009] promenjena funkcija za primenu stila sa GM_setStyle i dodata paleta Servis, vracen originalni logo i bocna traka
// 0.4 [05-05-2008] sredjeno horizontalno centriranje tabela, pozadine u celijama i okviri unutar tabela, dodate palete za izbor u GM meni
// 0.3 [04-05-2008] centrirana tabela, uklonjene horizontalne trake iz pozadine i postavljen nezvanicni logo foruma
// 0.2 [03-05-2008] ugradjena mogucnost izbora palete boja. dostupne palete: lp, gray i web20 (default)
// 0.1 [02-05-2008] prototip definicija nalik bojama rubrike Laki pingvini

skft_version = "0.7";
skft_av_url = "http://www.sk.rs/forum/images/skft/";

// http://www.codingforums.com/showthread.php?t=63796
Array.prototype.in_array = function ( obj ) {
	var len = this.length;
	for ( var x = 0 ; x <= len ; x++ ) {
		if ( this[x] == obj ) return true;
	}
	return false;
}

// funkcija za citanje izbora i definisanje CSS teme
function skft()
{
	// uzima izabranu temu iz baze (ako nije izabrana, podrazumevana je paleta servis)
	var tema = GM_getValue("tema", "servis");

	// na osnovu izbora postavlja predefinisane boje
	switch (tema)
	{
	case "lp":
		// laki pingvini
		var b1 = "#711B6C"; // tamna pozadina zaglavlja + okviri
		var b2 = "#91238B"; // svetla pozadina zaglavlja
		var b3 = "#E9A2E5"; // tekst zaglavlja + pozadina info boxa
		var b4 = "#FCECFB"; // pozadina poruke
		var t1 = "#400F3D"; // tekst
		var t2 = "#95268F"; // link
		var t3 = "#FF00FC"; // aktivan link
		break;
	case "gray":
		// siva
		var b1 = "#444"; // tamna pozadina zaglavlja + okviri
		var b2 = "#555"; // svetla pozadina zaglavlja
		var b3 = "#DDD"; // tekst zaglavlja + pozadina info boxa
		var b4 = "#EEE"; // pozadina poruke
		var t1 = "#222"; // tekst
		var t2 = "#000"; // link
		var t3 = "#FF7400"; // aktivan link
		break;
	case "web20":
		// WEB 2.0 boje
		var b1 = "#3F4C6B"; // tamna pozadina zaglavlja + okviri
		var b2 = "#356AA0"; // svetla pozadina zaglavlja
		var b3 = "#C3D9FF"; // tekst zaglavlja + pozadina info boxa
		var b4 = "#F9F7ED"; // pozadina poruke
		var t1 = "#36393D"; // tekst
		var t2 = "#4096EE"; // link
		var t3 = "#008C00"; // aktivan link
		break;
	default:
		// servis (podrazumevana)
		var b1 = "#004000"; // tamna pozadina zaglavlja + okviri
		var b2 = "#008000"; // svetla pozadina zaglavlja
		var b3 = "#D0F3B6"; // tekst zaglavlja + pozadina info boxa
		var b4 = "#F9F7ED"; // pozadina poruke
		var t1 = "#008000"; // tekst
		var t2 = "#004000"; // link
		var t3 = "#800040"; // aktivan link
	}

	// definise selektore sa predefinisanom temom boja
	var css = "body, .page { color: "+t1+"; }" +
		"a:link, a:visited { color: "+t2+"; }" +
		"a:hover, a:active { color: "+t3+"; }" +
		".tborder { background: white; color: "+b1+"; border: 1px solid "+b1+"; }" +
		".thead { background: "+b1+"; color: "+b4+"; }" +
		".tcat, .vbmenu_control, .tfoot { background: "+b2+"; color: "+b4+"; }" +
		".alt1, .alt1Active, .panelsurround, .wysiwyg { background: "+b4+" !important; color: "+t1+" !important; border: none !important; }" +
		".alt2, .controlbar, .imagebutton, .panel { background: "+b3+"; color: "+t1+"; border: none !important; }" +
		"div.page {width: 100% !important; padding: 0; margin: 0;}" +
		"input, textarea {color: "+t2+"}";

	// primenjuje CSS na stranu
	GM_addStyle(css);
	
	// nizovi sa IDovima redakcije, saradnika i moderatora
	var skft_red = new Array("1", "3", "5", "6", "8", "10", "14", "19", "115", "242"); // redakcija
	var skft_sar = new Array("4", "7", "15", "18", "21", "22", "62", "113", "128", "268", "312", "321", "353", "1734", "2486", "2526", "4049", "21855"); // saradnici
	var skft_mod = new Array("121", "123", "169", "185", "192", "216", "222", "245", "395", "452", "589", "600", "624", "773", "990", "1365", "1756", "1945", "2243", "2588", "2833", "3052", "4029", "5035", "10390"); // moderator

	// procesiram sve slike na strani
	var slike = document.getElementsByTagName('img');

	for (i = 0; i < slike.length; i++)
	{
		// debug → GM_log("i = " + i + ": src = " + slike[i].src);
		// ako profil ima avatar
		if ( slike[i].alt.match("Avatar") ) {
			// vidi da li je promenjen SRC slike ili je original
			if ( slike[i].src.match("u=") ) {
				// odredi status clana (cin) na osnovu uzmi UID-a iz URL-a slike avatara
				skft_uid = slike[i].src.split("=")[1].split("&")[0];
				if ( skft_red.in_array(skft_uid) ) { // redakcija
					skft_cin = "redakcija";
				} else if ( skft_sar.in_array(skft_uid) ) { // saradnici
					skft_cin = "saradnik";
				} else if ( skft_mod.in_array(skft_uid) ) { // moderator
					skft_cin = "moderator";
				}
			} else if ( slike[i].src.match("AVATAR-") ) {
				// odredi status clana (cin) na osnovu uzmi UID-a iz URL-a slike avatara
				skft_uid = slike[i].src.split("-")[1];
				if ( skft_red.in_array(skft_uid) ) { // redakcija
					skft_cin = "redakcija";
				} else if ( skft_sar.in_array(skft_uid) ) { // saradnici
					skft_cin = "saradnik";
				} else if ( skft_mod.in_array(skft_uid) ) { // moderator
					skft_cin = "moderator";
				}
			} else {
				// posto je SRC promenjen, uzmi cin iz URL-a slike avatara
				skft_cin = slike[i].src.split("-")[2];
			}
			// promeni avatar
			skft_avatar = skft_av_url + "AVATAR-sk-" + skft_cin + "-" + tema + ".png";
			// debug → GM_log("Menjam sliku avatara: "+skft_avatar);
			slike[i].src = skft_avatar;
		} else if ( slike[i].src.match("lastpost.gif") || slike[i].src.match("/lastpost-") ) {
			slike[i].src = skft_av_url + "lastpost-" + tema + ".gif";
		} else if ( slike[i].src.match("firstnew.gif") || slike[i].src.match("/firstnew-") ) {
			slike[i].src = skft_av_url + "firstnew-" + tema + ".gif";
		} else if ( slike[i].src.match("trashcan_small.gif") || slike[i].src.match("/trashcan_small-") ) {
			slike[i].src = skft_av_url + "trashcan_small-" + tema + ".gif";
		// dugmad
		} else if ( slike[i].src.match("edit.gif") || slike[i].src.match("/edit-") ) {
			slike[i].src = skft_av_url + "edit-" + tema + ".gif";
		} else if ( slike[i].src.match("multiquote_off.gif") || slike[i].src.match("/multiquote_off-") ) {
			slike[i].src = skft_av_url + "multiquote_off-" + tema + ".gif";
		} else if ( slike[i].src.match("post_thanks.gif") || slike[i].src.match("/post_thanks-") ) {
			slike[i].src = skft_av_url + "post_thanks-" + tema + ".gif";
		} else if ( slike[i].src.match("quickreply.gif") || slike[i].src.match("/quickreply-") ) {
			slike[i].src = skft_av_url + "quickreply-" + tema + ".gif";
		} else if ( slike[i].src.match("quote.gif") || slike[i].src.match("/quote-") ) {
			slike[i].src = skft_av_url + "quote-" + tema + ".gif";
		} else if ( slike[i].src.match("reply.gif") || slike[i].src.match("/reply-") ) {
			slike[i].src = skft_av_url + "reply-" + tema + ".gif";
		}
		
	}
}

// formiranje GM menija
GM_registerMenuCommand( "Gray", function() { GM_setValue("tema", "gray"); skft(); }, "g" );
GM_registerMenuCommand( "Servis", function() { GM_setValue("tema", "servis"); skft(); }, "s" );
GM_registerMenuCommand( "Web 2.0", function() { GM_setValue("tema", "web20"); skft(); }, "w" );
GM_registerMenuCommand( "Laki pingvini", function() { GM_setValue("tema", "lp"); skft(); }, "l" );

// inicijalizacija skripte
skft();
