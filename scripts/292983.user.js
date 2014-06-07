// ==UserScript==
// @name       JVBoost
// @namespace  
// @version    0.1
// @description  Boostez.
// @match      http://www.jeuxvideo.com/forums/*
// @match      http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @copyright  2014
// ==/UserScript==

/*
 * Ouais donc ce script (mal foutu je suis d'accord, mais je suis débutant) est censé poster (ou plutôt booster) automatiquement sur un topic.
 * Pour configurer le topic où poster faut remplir les variables en dessous.
 * Normalement c'est compatible avec des pseudos avec captcha, mais l'ocr est parfois assez lent (il est hébergé sur un serveur pas à moi, qui a une config relativement lente, donc je peux rien y faire) et cette lenteur provoque aussi parfois des résultats incorrects.
 * */

// Indiquez ici la partie "répondre" du topic où vous allez booster

var topic = 'http://www.jeuxvideo.com/forums/3-50-151680827-1-0-1-0-moderation-que-puis-je-pour-vous.htm#form_post';


if (document.URL == topic) {
    // Le message est modifiable dans la ligne suivante.
    document.getElementById('newmessage').value = 'BOOST :rire2:';
    document.getElementById('bouton_post').click();
}


if (document.URL == 'http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi') {
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://ocr.intelceleron.powa.fr/index.php?pass=public',
        data: document.getElementsByClassName('confirm')[0].getElementsByTagName('img')[0].getAttribute('src'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(egg) {
            document.getElementById('confirmation').value = egg.responseText;
            document.getElementById('bouton_post').click();
        }
    });
} else {    setTimeout(function() {
    window.location.href = topic;
}, 10000); }