// ==UserScript==
// @name           RSI Chatroll Tools for TamperMonky (Chrome)
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://WWW.VSAlpha.com/
// @description    Adds +Better Name Visibility (Never Miss Staff/Mods again)
// @include        http://chatroll-cloud-1.com/embed/chat/roberts-space-industries*
// @grant          GM_addStyle
// @version        3.12.14.1611
// @copyright      Void Singer 2013 [ http://Forum.VSAlpha.com/ ]
// @license        CC0 [ http://creativecommons.org/publicdomain/zero/1.0 ]
// @licesne.ext    Public Domain, w/ thanks to John Tennyson, Koros, Rod Sterling, Sansom, SnowCrash, and many others.
// ==/UserScript==

/*//-- ToDo:
	add code for hilight mute/nuke that TM will actually use
	add code for pm detection, try to distinguish between opening and responding
	add code for autocomplete
	add code for cowbell detection
	add code for user joins
	fix Banner
--//*/


//-- set up a temporary cache to hold our muted and hilighted users keys
var gMarkList = {};

var gLstStaff = [
//-- confirmed CIG staff markers: "Moniker" (Handle) Full Name - Position
	'-VK2Hc5Zudh', //-- Hannes (Hannes) Hannes Appell - ???
	'_7m3gIE7Lsw', //-- Alway (Alway) Joshua ??? - ???
	'51hKuNIp8QX', //-- Drast (Drast) ??? ??? - "Staff"
	'BXigdyZwWCk', //-- devoinc (devoninc) Nate Blaisdell - Senior Designer
	'C5FxpoXT6Iq', //-- Rock (TwentyGrams) ??? ??? - ???
	'CR3l4ZwwdIF', //-- Zamzoph (czamzow_cig) ??? ??? - "Developer"
	'Dtkj2AJjirv', //-- Rocktavious (Rocktavious) Kyle Rockman - Tools Programmer
	'dANTJ1ksnVF', //-- Ron "The Producer" LaJoie (Ronnies) Ron LaJoie - Producer
	'ERXbFX3RGD9', //-- Chelsea (chelsea) Chelsea ??? - Customer Support
	'fqGL3C7R95L', //-- Alexis (patterned) Alexis ??? - ???
	'gYBI-cRjPwm', //-- . (scitaborea) ??? ??? - ???
	'H14AOdBNqrr', //-- kozmiq (kozmiq) ??? ??? - UI Designer @ Behaviour Interactive
	'HmNCJtFCcIH', //-- Prestidigitorium (DanielC) ??? ??? - ???
	'I_FLL8gvkeF', //-- Void Spider (jarred-jacobs-cig) Jarred Jacobs - ???
	'Jg0_q7_zcFX', //-- holoKitten (holoKitten) Pete Mackay - designer
	'JR907j_2_IV', //-- ItchyNick (ItchyNick) Ted  Beargeon - ???
	'JRQcTFTFPl9', //-- Forrest (fstephan) Forrest Stephen - CTO
	'jzs6-JpFLBN', //-- Huntokar CIG(bevans_cig) ??? ??? - ???
	'NBcLvBJrezN', //-- Martin_Galway (Martin_Galway) Martin Galway - Director Of Audio 
	'NEqpH3ym0Pa', //-- Rico.CIG (Rico) Rico Acosta - IT Director
	'NPqaaaYrKoU', //-- -Starlight- (-Starlight-) ??? ??? - ???
	'ohHst-DdIrG', //-- Designopotamus (RobIrving) Rob Irving - Lead Designer
	'p028ta5NcIN', //-- Stormwind (Stormwind) Jason Spangler - Chief Technical Officer
	'PkE5qDDMUuR', //-- Zane Bien (zanebien) Zane Bien - Web/Interface
	'pvFlfBRzXe_', //-- Travis Day (MightyMonkey) Travis Day - Associate Producer
	'rxFxhzbqEPx', //-- Yakaru Dezaki (Yakaru) Yakaru Dezaki - ???
	's3RPni2kR2A', //-- WingMan (WingMan) Eric Peterson - President Development / Production
	'sWNKELzt1-R', //-- Jeff Uriarte (LastCall) Jeff Uriarte - ???
	'v5mKcwAKM2l', //-- Mark (mabent_cig) ??? ??? - ???
	'WqU1UVtM7wl', //-- SuperMoof (tdavies-cig) ??? ??? - ???
	'XqaTY4y7j-p', //-- EL1J4H (EL1J4H) Elijah McNeal - Concept Artist
	'xnx4GPsqtvN', //-- Viewmaster (Viewmaster) Michael Morlan - Media Project Manager
	'xTUcIKdIZ9U', //-- Maz (Mazerati) Tom Sawyer - Network Programmer
	'Y61bWEMqhan', //-- Ben Lesnick (wcloaf) Ben Lesnick - Community Manager
	'Ybflm5zyOfo', //-- Jeffery.Zhu (JefferyZhu) Jeffery Zhu - ???
	'YWa8z2mZ4l4', //-- DavidOPreska (DaveOP) David Opreska - ???
	//-- Sumasshu () Tom Oliphant - Gameplay Programmer
	//-- PixelPunisher () Brendan Jackson - Graphics Programmer
	//-- Mark Skelton () Mark Skelton - 3D Artist
	//-- LiquidMesh3D () Bryan Brewer - Lead Animator
	//-- chrismsmith () Chris Smith - 3D Artist
	//-- MaximusOlivia () Chris Olivia - Chief Visual Officer
	//-- Adam Poole () Adam Poole - Art Associate Producer
//-- confirmed "new site" Turbulent staff markers
	'jmFwde82VeA', //-- Baulthus (Bault) Benoit Beausejour - CTO
	'EdwhxNvAK-j', //-- Void (void42) Felix Courtemanche - Turbulent Senior Programmer
	'V38kPj3gIRO' //-- Garatth (Garatth) Ben F - ???
];

var gLstMods = [
//-- Moderators
	'\\30 r7pwq-M3OE', //-- RpTheHotrod "Logante" (Logante)
	'\\32 J4IBcV2Fix', //-- Slavik (WarpDust)
	'APB82Tp1g6R', //-- AllGamer (Captain_Harlock)
	'BHDNFymwMan', //-- Valkyrie (Valkyrie)
	'Ff0BTZT5Ze-', //-- Xelfer Wols (slowreflex)
	'gYBI-cRjPwm', //-- Lala
	'IB8F3_Gdtye', //-- Manic (Manic)
	'KuAkPl9VKeH', //-- Toast (Toast)
	'MV60qLK5vER', //-- Risembool (Risembool)
	'pzhPskxpYPv', //-- Choctah Armstrong (Choctah)
	'UzrccA025zD', //-- Sophine (Sophine)
	'v7S_Xdqw0wc', //-- Boraxx (Boraxx)
	'vkOVMFxCsni', //-- AD (AwesomeAD)
	'wgf7975yWzx' //-- Atom (JohnnyAtom)
//	'Y6H6B1APR_I' //-- Void Singer (Void-Singer)
];

var vBaseCSS = '.message-profile-name{ color: #AACAE1; }\n' +
 '.chat-sticky-message { margin: 0px -9px 0px -7px !important; }\n';

gLstStaff.forEach( function( vStaff ){ //-- Go through list of staff an highlight name and text
	vBaseCSS += '.' + vStaff + ' .message-text { color: orangered; }\n';
	vBaseCSS += '.' + vStaff + ' .message-profile-name a{ color: gold; }\n';
});
gLstMods.forEach( function( vMod ){ //-- go through list of moderators and highlight name
	vBaseCSS += '.' + vMod + ' .message-profile-name a{ color: goldenrod; }\n';
});

GM_addStyle( vBaseCSS );