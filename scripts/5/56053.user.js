// ==UserScript==
// @name           TempMSRankFix
// @namespace      http://maplecave.com.br
// @description    Fix temporária para as imagens do ranking do MapleStory Brasileiro.
// @include        http://games.levelupgames.uol.com.br/maplestory/comunidade/ranking/*
// ==/UserScript==

var images = document.getElementsByTagName('img');
for(var i=0;i<images.length;i++)
{
images[i].setAttribute('src', images[i].getAttribute('src').replace(/avatar.maplestory.com.br/i, 'msavatar1.nexon.net'));
}