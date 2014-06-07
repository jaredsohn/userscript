// ==UserScript==
// @name          Message auto activation
// @namespace     http://www.blablabla.fr
// @description   Messages auto pour les activations
// @include       http://www.kraland.org/order.php?p1=7310*
// ==/UserScript==


var $;
var ajout = '<tr><td class="tdf">Message : </td><td class="tdf"><select id="chgmsg"><option value="-1">Je veux :</option></select></td></tr>';

//donnees
var msg_all = new Array();
msg_all.push(["Smartphone/proxy/console", "Bonjour,\n\nL'activation de ton personnage a été refusée pour la raison suivante :\n\n- demande d'activation depuis un proxy/smartphone/console/assimilés.\n\nDans un soucis de lutte contre le multicompte, nous n'activons plus les personnages si la demande d'activation a été faite depuis un système dissimulant leur IP. \n\nMerci de refaire une demande depuis un ordinateur relié à une connexion internet standard et de veille à ne pas te connecter depuis un autre moyen de connexion avant que ta demande ait été acceptée.\n\nCordialement, "]);
msg_all.push(["A cause du nom","Bonjour,\n\nL'activation de ton personnage a été refusée pour la raison suivante :\n\n- pseudonyme non-conforme : merci d'utiliser plus tard le statut RP pour les indications additionnelles à un grade/titre+prénom+nom.\n\nUne fois ces informations complétées, tu pourras redemander l'activation (attention à bien vérifier tous les choix),\n\nCordialement,"]);
msg_all.push(["Profil incomplet","Bonjour,\n\nL'activation de ton personnage a été refusée pour la raison suivante :\n\n- profil incomplet (absence d'avatar, etc.)\n\nUne fois ces informations complétées, tu pourras redemander l'activation (attention à bien vérifier tous les choix),\n\nCordialement, "]);
msg_all.push(["Même IP","Bonjour,\n\nTon activation a été refusée pour la raison suivante :\n\n- il y a déjà un personnage sur cette IP.\n\nConnais-tu des personnages avec lesquels tu pourrais être considéré comme un multi (si oui, pourquoi) ?\n\nBien sûr, n'hésite pas à nous communiquer tout élément que tu jugeras utile pour éclaircir cette situation. A noter que si les noms des autres personnages ne sont pas mentionnés, c'est tout à fait volontaire.\n\nCordialement,"]);


// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {

$('#order731001 table tr').first().after(ajout);
var sel = $('#chgmsg');
sel.on('change', chgtxt);
for (var i = 0; i < msg_all.length;i++) {
	sel.append('<option value="'+i+'">'+msg_all[i][0]+'</option>');
}

}

function chgtxt() {
var val = $(this).val();
var text;
if(val != -1)
	text = msg_all[val][1];
else
	text = "";
	
$('textarea[name="message"]').val(text);

}