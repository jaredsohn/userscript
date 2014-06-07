// ==UserScript==
// @name			Diaporama Bonjour Madame
// @namespace		http://www.bonjourmadame.fr
// @description		Display diaporama for Bonjour Madame
// @include			http://www.bonjourmadame.fr/page/*
// @include			http://www.bonjourmadame.fr/
// @grant			none
// ==/UserScript==

var joue = false;
var temps = 3000;

var prmstr = window.location.search.substr(1);
var prmarr = prmstr.split ("&");
var params = {};

for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}

if(params['joue'] && params['joue'] == 1)
{
    joue = true;
}

if(params['vitesse'])
{
    temps = params['vitesse'];
}


var lienPrecedent = $('.prev').attr('href');
var lienSuivant = $('.next').attr('href');
if(!lienPrecedent)
    lienPrecedent = '#';
var img = $('div#page.right-sidebar div#content div.post-panel div.media div.photo-panel img');
var body = $('body');
var html = $('html');


body.children().remove();
body.append(img);
html.css('height', '100%');

body.css(
{
    'min-height' : '100%',
    'margin' : '0',
    'padding' : '0',
    'position' : 'relative',
    'background-color' : 'black'
});
img.css(
{
    'display' : 'block',
    'height' : body.height() + 'px',
    'margin' : 'auto'
});



body.append('<div id="player"></div>');
var player = body.find('#player');
player.append('<input type="button" id="precedent" value="Previous"/>');
player.append('<input type="button" id="play" value="Play"/>');
player.append('<input type="button" id="stop" value="Stop"/>');
player.append('<input type="button" id="suivant" value="suivant"/>');
player.append('<label for="vitesse"><span id="ms">' + temps + '</span> millisecondes</label><input size="4" value="' + temps + '" id="vitesse" type="number" step="10" name="points" min="10" max="4000">');

player.css(
{
    'position' : 'absolute',
    'bottom' : '0'
});




var vitesse = $('#vitesse');
var ms = $('#ms');
vitesse.keyup(function()
{
    ms.html(vitesse.val());
});

$('#precedent').click(function()
{
    if(lienPrecedent == '/page/1')
        window.location = 'http://www.bonjourmadame.fr';
    else if(lienPrecedent != '#')
        window.location = lienPrecedent + '?vitesse=' + vitesse.val();
});
$('#suivant').click(function()
{
    var lien = lienSuivant + '?vitesse=' + vitesse.val();
    if(joue)
        lien = lien + "&joue=" + 1;
    window.location = lien;
    
});

var diapo;
$('#play').click(function()
{
    joue = true;
    diapo = setTimeout("$('#suivant').click()", vitesse.val());
});
$('#stop').click(function()
{
    joue = false;
    window.clearTimeout(diapo);
});

if(joue)
    $('#play').click();

