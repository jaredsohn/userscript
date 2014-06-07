// ==UserScript==
// @name        Removedor de comentarios
// @description Esconde os comentarios de varios sites de noticias
// @include     http://*.em.com.br/*
// @include     http://*.globo.com/*
// @include     http://veja.abril.com.br/*
// @include     http://*.yahoo.com/*
// @include     http://*.uol.com.br/*
// @include     http://whiplash.net/*
// @include     http://*.cartacapital.com.br/*
// @include     http://*.terra.com.br/*
// @include     http://www.brasil247.com/*
// @include     http://www.pragmatismopolitico.com.br/*
// @grant       none
// @version     1.72
// ==/UserScript==

if (/em\.com\.br/i.test (location.hostname) ) { 
    // EM
    var comments = document.getElementById('div_comentarios');
    if (comments)
        comments.style.display = 'none';
} else if (/globo\.com/i.test (location.hostname) ) { 
    // G1
    comments = document.getElementById('boxComentarios');
    if (comments)
        comments.style.display = 'none';
    // o globo
    comments = document.getElementById('comments');
    if (comments)
        comments.style.display = 'none';
} else if (/veja\.abril\.com/i.test (location.hostname) ) { 
    // Veja
    comments = document.getElementById('comments_list');
    if (comments)
        comments.style.display = 'none';
} else if (/yahoo\.com/i.test (location.hostname) ) { 
    // yahoo
    comments = document.getElementById('mediacommentsugc_container');
    if (comments)
        comments.style.display = 'none';
} else if (/whiplash\.net/i.test (location.hostname) ) { 
    //Whiplash
    comments = document.getElementsByClassName('comentarios')[0];
    if (comments)
        comments.style.display = 'none';
} else if (/cartacapital\.com\.br/i.test (location.hostname) ) {
    //Carta Capital
    comments = document.getElementById('disqus_thread');
    if (comments)
        comments.style.display = 'none';
} else if (/terra\.com\.br/i.test (location.hostname) ) {
    //Terra
    comments = document.getElementById('divAnnotatio');
    if (comments)
        comments.style.display = 'none';
} else if (/brasil247\.com/i.test (location.hostname) ) {
    //Brasil247
    comments = document.getElementById('comments');
    if (comments)
        comments.style.display = 'none';
} else if (/pragmatismopolitico\.com\.br/i.test (location.hostname) ) {
    //Pragmatismo Politico
    comments = document.getElementById('comments');
    if (comments)
        comments.style.display = 'none';
} else if (/uol\.com\.br/i.test (location.hostname) ) {
    // remove FSP
    comments = document.getElementById('article-comments');
    if (comments)
        comments.style.display = 'none';
    
    //UOL
    comments = document.getElementById('comentarios');
    if (comments)
        comments.style.display = 'none';
    
    //Blog do Sakamoto
    comments = document.getElementById('comentarios');
    if (comments)
        comments.style.display = 'none';
}