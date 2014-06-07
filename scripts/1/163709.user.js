// ==UserScript==
// @name          NoFish
// @namespace     http://www.jeuxvideo.com/nofish
// @description   Remplace les smileys poisson par de vrais smileys
// @include       http://ww.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/*
// @include       http://www1.jeuxvideo.com/*
// @include       http://193.36.45.139/*
// @include       http://193.36.45.149/*
// @version       1.0
// ==/UserScript==

var smilies = {':snif:':'20',':gba:':'17',':g)':'3',':snif2:':'13',':bravo:':'69',':hap:':'18',':ouch:':'22',':pacg:':'9',':cd:':'5',':ouch2:':'57',':pacd:':'10',':cute:':'nyu',':content:':'24',':noel:':'11',':oui:':'37',':peur:':'47',':question:':'2',':cool:':'26',':coeur:':'54',':mort:':'21',':rire:':'39',':fou:':'50',':sleep:':'27',':-D':'40',':nonnon:':'25',':fier:':'53',':honte:':'30',':rire2:':'41',':non2:':'33',':sarcastic:':'43',':monoeil:':'34',':nah:':'19',':doute:':'28',':rouge:':'55',':ok:':'36',':non:':'35',':malade:':'8',':fete:':'66',':sournois:':'67',':hum:':'68',':ange:':'60',':diable:':'61',':gni:':'62',':play:':'play',':desole:':'65',':spoiler:':'63',':merci:':'58',':svp:':'59',':sors:':'56',':salut:':'42',':rechercher:':'38',':hello:':'29',':up:':'44',':bye:':'48',':gne:':'51',':lol:':'32',':dpdr:':'49',':dehors:':'52',':hs:':'64',':banzai:':'70',':bave:':'71',':pf:':'pf',':loveyou:':'loveyou',':hapoelparty:':'hapoelparty',':mac:':'16',':globe:':'6',':)':'1',':(':'45',':d)':'4',':-)))':'23',':-)':'46',':-p':'31',':-((':'15',':-(':'14',':p)':'7',':o))':'12'};

var imgs = document.body.getElementsByTagName('img');

for(var i = 0; i < imgs.length; i++) {
	if(smilies[imgs[i].alt] !== undefined) {
		imgs[i].src = 'http://image.jeuxvideo.com/smileys_img/' + smilies[imgs[i].alt] + '.gif';
	}
}