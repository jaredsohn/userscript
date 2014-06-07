// ==UserScript==
// @name        ddizi.org
// @author	ayhanabi
// @namespace   http://userscripts.org/users/539079
// @description ddizi.org sitesindeki reklamları kaldırır, sade arkaplan sunar. videoyu indirmek için banner link ekler.
// @match       http://www.ddizi.org/izle/*
// @version     1
// @copyright   ayhanabi
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){

    document.getElementById('reklami').style.display = "none";
    document.getElementById('kendisi').style.display = "block";
    $(".header").remove();
    $(".reklam1").remove();
    $(".video-alti").remove();
    $("#solreklam").remove();
    $("iframe").remove();
    $('#yorum-kutu').remove();
    $('#backkapat').remove();
    $('.sik-ekle').remove();
    $('.guvenlik-kutu').remove();
    $('.ozet').remove();
    $('.soc').remove();
    $('.social-like').remove();  
    $(".yorumlar-baslik").remove();
    $(".tumu").remove();
    $(".yorumlar").remove();
    $(".yorum-yap").remove();
    $(".error").remove();
    $(".sag-blok").remove();
    $(".twitter-follow-button").remove();
    $(".list-orta-baslik").remove();
    $(".dizi-box").remove();
    $(".dizi-adi").remove();
    $(".diziler").remove();
    $(".blok-baslik").remove();
    $(".footer-bg").remove();   
    $(".reklam1").remove();
    $(".div.orta-ust").remove();
    $("#toolbar").remove();
    $("body").attr("style","background-image: url() !important; background-color: #000000 !important");
 
    downloadURL =  s1.getVariable('file');
    if (downloadURL !== undefined && downloadURL !== null && downloadURL.length && downloadURL !== 'undefined') {
		dddlBox(downloadURL);
	}
});


function dddlBox(url) {
		$('head').append('<style type="text/css">#dirtyDDL{position:fixed;z-index:0100100100100000010011000110111101110110011001010010000001001101011110010010000001010111011010010110011001100101;bottom:0;right:5px;width:100%;height:30px;text-align:center;background-color:#000;color:#FFF;padding-top:5px;opacity:.9;border-top:2px groove red}#dirtyDDL a{word-spacing:1em;letter-spacing:.5em;text-transform:uppercase;font-weight:600;font-size:11px;font-family:Verdana;color:#FFF;text-align:center;outline:0;display:block;text-decoration:none;padding:4px}#dirtyDDL a:hover{text-decoration:none}#dirtyDDL img{background:0;border:0;vertical-align:middle;margin:0;padding:0}</style>');

		$('body').append('<div id="dirtyDDL"><a title="Download" target="_blank" href="' + decodeURIComponent(url) + '" onclick="window.location.reload(true);">Bilgisayara Indir!</a></div>');
}

