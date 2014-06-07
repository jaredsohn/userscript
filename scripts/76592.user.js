// ==UserScript==
// @name           Yoji's Gmail talk chatframe
// @namespace      http://www.yojimbo.fr
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==
// /!\ Compatible uniquement pour ceux qui ont le Labs "Pictures in chat"

// Ajout d'une bordure entre 2 échanges
	GM_addStyle(".km { font-size:12px !important; line-height: 14px !important; padding-left:25px !important;margin-left:0 !important; border-top: 1px dashed #DDD !important; padding-top: 4px !important; }");
// Decalage de l'image pour la bordure	
	GM_addStyle(".kj { padding-top: 4px !important; }");
// Marge constante sur la gauche (sous l'image)
	//GM_addStyle(".kl { margin-left: 30px !important; }");
// Cachage du pseudo sur chaque échange
	GM_addStyle(".kn { display: none !important; }");
// Marge gauche pour "sent at xx on xx" + réduction taille texte
	GM_addStyle(".kq { margin-left:25px !important; }");
	GM_addStyle(".kp { margin-left:0px !important;text-indent:0 !important;font-size:10px !important; }");
// Reduction de l'avatar
	GM_addStyle(".kh { width:16px !important;height:16px !important;margin:0 !important }");