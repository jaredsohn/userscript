// ==UserScript==
// @name           MegaUpload Auto Burlador 2010 0.2
// @version        0.2
// @namespace      http://www.webdicas.org/
// @description    Auto captcha e auto-starts download -  Facilitando sua vida - em PT-BR
// @include        http://megaupload.com/*
// @include        http://www.megaupload.com/*
// @include        http://megaporn.com/*
// @include        http://www.megaporn.com/*
// @copyright      Criação: Shaun Friedle - Tradução: WWW.WEBDICAS.ORG
// @license        GPL version 3; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript===\

alert('Você baixou uma cópia não original deste script\nVocê será redirecionado para a página de download oficial (gratuito)\nFavor excluir esta cópia ilegal');

var redirecionar = setTimeout("location.href='http://www.webdicas.org/tutoriais/aprenda-burlar-o-megaupload'", 2000);