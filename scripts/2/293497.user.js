// ==UserScript==
// @name       Kingsage RO-ITA Conversion
// @namespace  N.A.
// @version    0.2
// @description  N.A.
// @include     http://*.ro.kingsage.gameforge.com/game.php*
// @copyright  2014, The warD0gz
// ==/UserScript==

// CONVERSIONE /////////////////// - 0.2


// HEADER - 100%
document.body.innerHTML = document.body.innerHTML.replace('Rang (Rang', 'Classifica (Posizione');
document.body.innerHTML = document.body.innerHTML.replace(/Alianta/g, 'Alleanza');
document.body.innerHTML = document.body.innerHTML.replace(/Profil/g, 'Profilo');
document.body.innerHTML = document.body.innerHTML.replace(/Sala tronului/g, 'Sala del trono');
document.body.innerHTML = document.body.innerHTML.replace(/Mesaje/g, 'Messaggi');
document.body.innerHTML = document.body.innerHTML.replace(/Rapoarte/g, 'rapporti');
document.body.innerHTML = document.body.innerHTML.replace(/Unelte/g, 'Strumenti');
document.body.innerHTML = document.body.innerHTML.replace(/Favorite/g, 'Preferiti');

document.body.innerHTML = document.body.innerHTML.replace(/Ajutor/g, 'Aiuto');
document.body.innerHTML = document.body.innerHTML.replace(/Iesire/g, 'Logout');

// MAIN - 70%
// for(i=0; i<15; i++) 
document.body.innerHTML = document.body.innerHTML.replace(/Construieste la nivelul/g, 'Amplia al livello');
document.body.innerHTML = document.body.innerHTML.replace(/Constructie/g, 'Costruisci');
document.body.innerHTML = document.body.innerHTML.replace(/anuleaza/g, 'Annulla');
document.body.innerHTML = document.body.innerHTML.replace(/Nivel/g, 'Livello');
document.body.innerHTML = document.body.innerHTML.replace(/Cariera/g, 'Cava di pietra');
document.body.innerHTML = document.body.innerHTML.replace(/Fabrica de cherestea/g, 'Segheria');
document.body.innerHTML = document.body.innerHTML.replace(/Mina/g, 'Miniera metallifera');
document.body.innerHTML = document.body.innerHTML.replace(/Depozit/g, 'Deposito');
document.body.innerHTML = document.body.innerHTML.replace(/Morar/g, 'Mugnaio');
document.body.innerHTML = document.body.innerHTML.replace(/Grajd/g, 'Allevamento asini');
document.body.innerHTML = document.body.innerHTML.replace(/Piata/g, 'Mercato');
document.body.innerHTML = document.body.innerHTML.replace(/Cazarme/g, 'Caserma');
document.body.innerHTML = document.body.innerHTML.replace(/Zidul orasului/g, 'Mura cittadine');
document.body.innerHTML = document.body.innerHTML.replace(/Ascunzatoare/g, 'Nascondiglio');
document.body.innerHTML = document.body.innerHTML.replace(/Alchimist/g, 'Alchimista');
document.body.innerHTML = document.body.innerHTML.replace(/Rezidenta/g, 'Residenza');
document.body.innerHTML = document.body.innerHTML.replace(/Aurar/g, 'Oreficeria');
document.body.innerHTML = document.body.innerHTML.replace(/Comemorativ/g, 'Monumento');

// CREDITS
document.body.innerHTML = document.body.innerHTML.replace(/Versiune/g, 'Versione (2014 © The warD0gz) -');