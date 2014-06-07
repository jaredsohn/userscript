// ==UserScript==
// @name           StopShare
// @namespace      stopshare
// @description    Regarder les vidéos sans partager sur Facebook !
// @include        http://www.stopandbuzz.fr/*
// @include        http://buzzbook.tv/*
// @include        http://www.video-buzz-fb.fr/*
// @include        http://www.videos2ouf.biz/*
// @include        http://www.lejournalduweb.fr/*
// @include        http://info-deroutante.info/*
// @include        http://boom-buzzz.com/*
// @include        http://buzzzzzz-the-star.info/*
// @include        http://docteur-lol.net/*
// @include        http://megavideoz.net/*
// @include        http://www.buzzfever.fr/*
// @include        http://www.dracaufeu.com/*
// @include        http://www.salameche.com/*
// @include        http://www.humha.info/*
// @include        http://www.devilbuzz.net/*
// @include        http://www.2424buzz.com/*
// @include        http://www.funnybuzz.fr/*
// @include        http://www.poumpoum.info/*
// @include        http://buzz.affiliacademie.fr/*
// @version        1.5.5
// ==/UserScript==

if (document.getElementById('boutonsvideobuzz') && unsafeWindow.playMovie) {
    var boutons = document.getElementById('boutonsvideobuzz');
    if (boutons) {
        unsafeWindow._variableAntiSeb = 1;
        unsafeWindow._try = 1;
        unsafeWindow.playMovie();
    }
}

if (document.location.href.match(/buzzbook\.tv/)) {
    var body = document.getElementsByTagName('body')[0];
    if (body.getAttribute('onload')) {
        var redirection = body.getAttribute('onload').match(/redirection\([0-9]+, '([^']*)'\);/)
        if (redirection) {
            self.location.href = redirection[1];
        }
    }
    
}
if (document.getElementById('f_video')) {
    var head = document.getElementsByTagName('head')[0];
    var video = head.innerHTML.match(/var video = '([^']*)';/)[1];
    if (video) {
        unsafeWindow.$("#f_video").remove();
        unsafeWindow.$("#r_video").html(video);
    }
}

if (unsafeWindow.getIt) {
    unsafeWindow.l1OK = true;
    unsafeWindow.l2OK = true;
    unsafeWindow.getIt();
}

if (unsafeWindow.afficher_lecteur2) {
    unsafeWindow.var_fb2_like = true;
    unsafeWindow.var_fb2_share = true;
    unsafeWindow.afficher_lecteur2();
}

if (unsafeWindow.load_moviebuzzzzzzz) {
    unsafeWindow.load_moviebuzzzzzzz();
}

if (unsafeWindow.playvideo) {
    unsafeWindow.playvideo();
}

if (unsafeWindow.load_vid) {
    unsafeWindow.load_vid();
}

if (unsafeWindow.merci && unsafeWindow.load_vid2) {
    unsafeWindow.merci();
    unsafeWindow.load_vid2();
} else if (unsafeWindow.load_vid2) {
    unsafeWindow.load_vid2();
}

if (unsafeWindow.done) {
    unsafeWindow.done();
}

if (document.getElementById('go_jaime') && document.getElementById('lecteur')) {
	document.getElementById('go_jaime').style.display = 'none';
	document.getElementById('lecteur').style.display = 'block';
}


