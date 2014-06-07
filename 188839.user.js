// ==UserScript==
// @name       nicki wykopowiczów na kurniku
// @version    0.1
// @description Jeśli dany kurnikowicz jest także wykopowiczem, to po najechaniu na jego nick na kurniku zobaczysz jego wykopowy nick
// @updateURL  http://userscripts.org/scripts/source/188839.user.js
// @match      http://www.kurnik.pl/*
// @copyright  Public domain 
// ==/UserScript==

// przestrzen nazw
if(typeof window._mk == "undefined")
{
    window._mk = {};
}

_mk.nicknames = {
    zordziu:		'zordziu',
    jan3d:		'ThatFeel',
    codeart:		'code_art',
    ldicarlo:		'L_DiCarlo',
    killthesystem:	'KillTheSystem',
    ecl:		'zacmiony',
    speerpre:		'speerpre',
    zemnagrasz:		'damiinho',
    grabkaman:		'GrabkaMan',
    chomichomchom: 	'chomi',
    kolakao: 		'kolakao',
    msurma: 		'surma',
    famina: 		'Famina',
    nexice: 		'nexice',
    kerly: 		'kerly',
    kuki1988: 		'kuki_1988',
    bladi89:		'Bladi89',
    wyrewrewolwer:	'Wyrewolwerowanyrewolwer',
    cholernick:		'cholernik',
    cherrycoke2l:	'cherrycoke2l',
    edwardzie:		'SScherzo',
    abc333:		'InformacjaNieprawdziwa',
    plysiek:            'Plysiek',
    kamdz:              'kamdz',
    pannamgotka:        'omgyolk',
    movikun:            'InzMovi',
    nomson:             'ziemniaczana_krolewna'
};

_mk.convert_kurnik_names = function()
{
    var nicknames = document.getElementsByClassName("ulnm");
    for(i in nicknames)
    {
        if(!nicknames[i] || !nicknames[i].childNodes)
        {
            continue;
        }
        var nickname = nicknames[i].childNodes[1].data.trim();
        console.log("["+nickname+"]");
        if(_mk.nicknames[nickname])
        {
            nicknames[i].childNodes[2].innerHTML = _mk.nicknames[nickname];
        }
    }
}

setInterval(_mk.convert_kurnik_names, 500); // freq = 500 ms