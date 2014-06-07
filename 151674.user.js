// ==UserScript==
// @name        TMD comments hider
// @description hide comments of specific users
// @include     *torrentsmd.com/*
// @include     *torrentsmd.*
// @include     *torrentsmoldova.*
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

//dacă apar buguri cu funcționarea unor butoane pe pagini, ștergeți rândul cu ”@require” de mai sus 
//iar apoi decomentați rândul următor de mai jos, prin ștergerea celor două slash-uri

//var $ = unsafeWindow.jQuery;

jQuery(function($)
{
    var ignoreUser = ['username1', 'username2']; //username here
    $('#forumPosts .forumPostName a[href*="userdetails.php?id"] b').each(function (i, v)
    {
        ($.inArray(v.innerHTML, ignoreUser) + 1) && $(v).closest('.forumPostName').css('background-color', 'rgba(247, 12, 12, 0.16)').next('.main').empty();
    });
});

//pentru a ascunde pe forum și rândul cu autorul comentariului ascuns, înlocuiți mai sus rândul ce începe cu ($.inArray cu acest cod, fără bare
//        ($.inArray(v.innerHTML, ignoreUser) + 1) && $(v).closest('.forumPostName').empty().next('.main').empty();


//autor idee: drakulaboy
//autor script inițial: flienteen
//autor script dezvoltat: XXN
