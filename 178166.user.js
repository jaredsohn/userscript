// ==UserScript==
// @name				arkAstralSimu
// @description	Tuning simulateur astral
// @namespace		chooz
// @author			chooz
// @version			1.12.201404
// @updateURL		http://userscripts.org/scripts/source/178166.user.js
// @include			http://astralsa*.*gicm.net:8080/astralsa/*
// @include			http://astralsapilote*.*arkea.com:8080/astralsa/*
// @include			http://wh40026-8*.*arkea.com:8080/astralsa/*
// @exclude			*infoscache.do*
// @exclude			*chargercache.do*
// @require			http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

GM_registerMenuCommand('Paramètres simulateur astral', setParametres);

GM_config.init('Parametres simulateur astral',
	{
		'atm':{'label':'Automate', 'type':'select', 'options':{
			'00005':'00005 DAB Accord',
			'00301':'00301 DAB Allianz',
			'04824':'04824 BIR CMB',
			'60111':'60111 ILS CMB',
			'60121':'60121 GAB CMB',
			'60151':'60151 GMFD CMMC',
			'60171':'60171 GAB CMB',
			'60261':'60261 GAB CMB',
			'60311':'60311 GMF CMB',
			'60361':'60361 GAB CMB',
			'60421':'60421 ILS CMB',
			'60561':'60561 ???',
			'60811':'60811 GAB BPE',
			'61111':'61111 GAB CMMC',
			'61211':'61211 GAB CMB',
			'61411':'61411 GAB BPE',
			'61421':'61421 GAB CMSO',
			'62511':'62511 DAB CMB',
			'62911':'62911 GMF CMMC',
			'63011':'63011 ???',
			'63211':'63211 GMF CMMC',
			'63811':'63811 BIR CMB',
			'67201':'67201 BIR CMB',
			'67401':'67401 BIR CMB',
			'68301':'68301 BIR CMB',
			'99999':'99999 GMF CMMC'
		}, 'default':'63211'},
		'bin':{'label':'BIN', 'type':'select', 'options':{
			'5138521000000330':'interne Mastercard CMMC clé test 5138 5210 0000 0330',
			'5138521000000322':'interne Mastercard CMMC clé test 5138 5210 0000 0322',
			'4977169000000301':'interne VISA CMMC clé test 4977 1690 0000 0301',
			'5138524000000326':'interne Mastercard sans contact CMB clé test 5138 5240 0000 0326',
			'5132300133813505':'interne Mastercard CMMC clé prod 5132 3001 3381 3505',
			'5071000201001420':'externe Mastercard clé test 5071 0002 0100 1420',
			'5071000201001479':'externe Mastercard clé test 5071 0002 0100 1479',
			'5071000201992':'externe Mastercard clé test 5071 0002 0199 2',
			'4970949059682076':'externe VISA clé prod 4970 9490 5968 2076',
			'9999982000001340000':'LINK clé test 9999 9820 0000 1340 000',
			'9999982000001000010':'LINK clé test 9999 9820 0000 1000 010',
			'4016400000000000000':'LINK MPTU clé prod 4016 4000 0000 0000 000',
			'5032022200900219633':'Accord privative clé test 5032 0222 0090 0219 633',
			'5032022200900219682':'Accord privative clé test 5032 0222 0090 0219 682',
			'4971520190005961':'Accord CB multi-appli clé test 4971 5201 9000 5961',
			'4972300099061939':'Accord VISA clé test 4972 3000 9906 1939',
			'5188102190000866':'Accord Mastercard only clé test 5188 1021 9000 0866',
			'5132830428056451':'RNCM Mastercard clé test 5132 8304 2805 6451',
			'5854830258594437':'RNCM Cirrus clé test 5854 8302 5859 4437'
		 }, 'default':'5138521000000330'}
	}
);

function setParametres(){
	GM_config.open();
}

// curseur en forme de main sur toute la surface des boutons
GM_addStyle('\
	div.btn_long, div.btn_long_2, div.btn_long_3, \
	div.btn_court, div.btn_court_2 \
		{ cursor:pointer; }\
');

var xPathResCell = document.evaluate("/html/body/table/tbody/tr/td[3]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var oCell;
if (oCell = xPathResCell.singleNodeValue) {
	var sURLBoucleAttente = top.location.hostname.match(/\.rec\./) ? 'http://astralfast.rec.gicm.net:8080' : 'http://astralfast-lb.gicm.net:8080';
	sURLBoucleAttente += "/astralfast/ecransdistants/display.do/xxxxx000/1221741600421/12?category=Initialisation+des+transactions&name=En%20service%20Web&l=0&atmid=xxxxx000&f=0&LIBELLE+TRANSACTION=RETRAIT&width=800&height=600";
	sURLBoucleAttente = sURLBoucleAttente.replace(/xxxxx/g, GM_config.get('atm'));
	var sBuf = '';
	sBuf += "<a href='#' onclick='document.getElementById(&apos;ecranAutomate&apos;).src=&apos;" + sURLBoucleAttente + "&apos;;void(0);'>boucle d'attente</a> <br />";
	sBuf += "<a href='/astralsa/simulateur.jsp'>init</a> <br />";
	sBuf += "<a href='/astralsa/simulateur.jsp?action=demandemenu.jsp'>menu</a> <br />";
	sBuf += "<a href='/astralsa/releve.do'>relevé</a> <br/>";
	sBuf += "<a href='/astralsa/initMenu.do'>init menu</a> <br />";
	sBuf += "<a href='#' onclick='GM_config.open();return false;'>pref</a> <br />";
	oCell.innerHTML = sBuf;
	
	var oTableEcran = oCell.parentNode.parentNode;
	var sBuf = oTableEcran.innerHTML;
	sBuf = sBuf.replace(/onclick="appelerFonction\('key1'\);"/, 'onclick="appelerFonction(&apos;key1&apos;);" title="Shift + Alt + Q" accesskey="q"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key3'\);"/, 'onclick="appelerFonction(&apos;key3&apos;);" title="Shift + Alt + S" accesskey="s"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key5'\);"/, 'onclick="appelerFonction(&apos;key5&apos;);" title="Shift + Alt + D" accesskey="d"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key7'\);"/, 'onclick="appelerFonction(&apos;key7&apos;);" title="Shift + Alt + F" accesskey="f"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key2'\);"/, 'onclick="appelerFonction(&apos;key2&apos;);" title="Shift + Alt + J" accesskey="j"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key4'\);"/, 'onclick="appelerFonction(&apos;key4&apos;);" title="Shift + Alt + K" accesskey="k"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key6'\);"/, 'onclick="appelerFonction(&apos;key6&apos;);" title="Shift + Alt + L" accesskey="l"');
	sBuf = sBuf.replace(/onclick="appelerFonction\('key8'\);"/, 'onclick="appelerFonction(&apos;key8&apos;);" title="Shift + Alt + M" accesskey="m"');
	oTableEcran.innerHTML = sBuf;
}

//if (window == top) {
//	alert('pere');
//} else {
//	alert('fils');
//}

setTimeout(tuning, 500);  // nécessaire pour accéder au contenu de l'iframe (il faut qu'elle ait fini de charger)

function tuning(){
	var oFrEcran = document.getElementById('ecranAutomate');
	if (oFrEcran) {
		// ici, le simu est embarqué dans une frame ecranAutomate

		if (oFrEcran.contentDocument.getElementsByName('context').length > 0) {
		}

		if (oFrEcran.src.match(/demandemenu.jsp/)) {
			if (oFrEcran.contentDocument.forms[0].action.match(/initMenu.do/)) {
				oFrEcran.contentDocument.forms[0].submit();
			}
		}

	} else {
		// ici page entière = simu

		var sBuf = document.body.innerHTML;
		// redéfinition des touches d'accessibilité
		sBuf = sBuf.replace(/accesskey="F1"/, 'accesskey="q"');
		sBuf = sBuf.replace(/accesskey="F3"/, 'accesskey="s"');
		sBuf = sBuf.replace(/accesskey="F5"/, 'accesskey="d"');
		sBuf = sBuf.replace(/accesskey="F7"/, 'accesskey="f"');
		sBuf = sBuf.replace(/accesskey="F2"/, 'accesskey="j"');
		sBuf = sBuf.replace(/accesskey="F4"/, 'accesskey="k"');
		sBuf = sBuf.replace(/accesskey="F6"/, 'accesskey="l"');
		sBuf = sBuf.replace(/accesskey="F8"/, 'accesskey="m"');
		document.body.innerHTML = sBuf;

		if (typeof(unsafeWindow.resetTimeout) == typeof(Function)) {
			// shunte le timeout session
			var keepalive = setInterval('resetTimeout();', 20000);
		}

		// permettre l'utilisation du bouton [Retour]
		document.body.innerHTML = document.body.innerHTML.replace(/javascript:appelerLien\('RETOUR'\);/, "/astralsa/initMenu.do");

		// permettre l'utilisation du bouton [Non]
		if (document.body.innerHTML.match(/Voulez-vous continuer \?/) && !document.forms[0].action.match(/sortirTimeout/)) {
			document.body.innerHTML = document.body.innerHTML.replace(/valider\('net\.gicm\.astral\.KO'\);/, "window.location='/astralsa/initMenu.do';");
		}

		// rendre toute la surface des boutons cliquable
		document.body.innerHTML = document.body.innerHTML.replace(/id="button(.)"/g, "id=\"button$1\" onclick=\"javascript:document.getElementById('key$1').click();void(0);\"");

		var sURL = window.location.href;
		if (sURL.match(/insertioncarte.jsp/)) {
			if (document.getElementsByName('context').length > 0) {
				var oTxtBox = document.getElementsByName('context')[0];
				var sBuf = oTxtBox.innerHTML;
				// tout afficher sur une ligne (trim)
				sBuf = sBuf.replace(/[\t ][\t ]+/g, '');
				// remplacer BIN origine par celui pré enregistré en config
				sBuf = sBuf.replace(/\.Numero" value='5132300133813505'/g, '.Numero" value=\'' + GM_config.get('bin').substr(0, 16) + '\'');
				sBuf = sBuf.replace(/\.Numero" value='5132670191344621'/g, '.Numero" value=\'0000000000000000\'');
				// remplacer ATM origine par celui pré enregistré en config
				sBuf = sBuf.replace(/atm-id='04711000'/, 'atm-id=\'' + GM_config.get('atm') + '000\'');
				// remplacer codeservice 101 par 201 (paiement = rechargement mobile + billetique)
				sBuf = sBuf.replace(/\.CodeService" value='101'/g, '.CodeService" value=\'201\'');
				oTxtBox.innerHTML = sBuf;
				// agrandir l'objet textarea pour un affichage complet des données à l'écran
				oTxtBox.rows = 33;
			}
			// donner le focus au bouton valider
			document.forms[0].childNodes[3].focus();
		} else if (sURL.match(/initialiserPorteur.do/)) {
			// forcer le lancement de l'URL initMenu.do
			var envoiMenu = setTimeout(function (){window.location = "/astralsa/initMenu.do";}, 1000);
		} else if (sURL.match(/initMenu.do/)) {
			// complèter l'action du bouton rechargement mobile pour passer à la page de rechargement pour les porteur LINK MPTU sur le menu principal
			document.body.innerHTML = document.body.innerHTML.replace(/javascript:flag\('MPTU'\);exit\('Paiement'\);/, "javascript:flag('MPTU');sleep(500);window.location='/astralsa/mptu/mptu.do';void(0);");
		} else if (sURL.match(/verifierTicket.do/)) {
			// complèter l'action des boutons opérateurs mobiles pour passer à la page de saisie de no téléphone
			document.body.innerHTML = document.body.innerHTML.replace(/javascript:validerAjax\('(.*)'\);void\(0\);/g, "javascript:validerAjax('$1');sleep(500);alert('ok');window.location='/astralsa/rechargement/preSaisieTelephone.do';void(0);");
		} else if (sURL.match(/preSaisieTelephone.do/)) {
			// renseigner automatiquement le no de téléphone sur l'écran de saisi
			[].map.call("0654321000", function(digit, index) { document.getElementById('telephone' + (index + 1)).innerHTML = digit.charAt(0); } );
			document.getElementById('inputTelephone').value = '0654321000';
			document.body.innerHTML = document.body.innerHTML.replace(/javascript:validerAvecChangementFond\('(.*)'\);void\(0\);/g, "javascript:document.forms[0].submit();sleep(500);window.location='/astralsa/rechargement/preListeDesOffres.do';void(0);");
		} else if (sURL.match(/postListeDesRecharges.do/)) {
			// insèrer le no de téléphone sur le recapitulatif de commande de recharge
			if (document.getElementById('confirm2').innerHTML.match(/Numéro de mobile/)) {
				document.getElementById('corps').innerHTML = document.getElementById('corps').innerHTML + "<div id='confirm3' class='confirm3 couleur2'><font>0654321000</font></div>";
			}
		} else if (sURL.match(/preedition.do/) || window.location.href.match(/relevesituationglobale.do/)) {
			// forcer le lancement de l'impression sur les pages de relevé
			var oDiv;
			if (oDiv = document.getElementById('animationbas')) {
				if (oDiv.innerHTML.match(/prenez_feuillet.swf/)) {
					var envoiImpression = setTimeout( function (){ window.location = "/astralsa/releve.do"; }, 1000 );
				}
			}
		} else {
			//alert(sURL);
		}
	}
	return;
}

