// ==UserScript==
// @name           Sonora Bug
// @namespace      http://userscripts.org/user/vipseixas
// @description    Resolve o problema de o Sonora não funcionar com versões > 1.0 do Moonlight
// @include        http://sonora.terra.com.br/*
// ==/UserScript==

// O JS abaixo substitui o método sl_GetCurrentPlaySequenceIndex do código original do Sonora
var scriptCode = new Array();
scriptCode.push('function sl_GetCurrentPlaySequenceIndex2(){var playSequence=this.currentPlaylist.getPlaySequence();');
scriptCode.push('if(playSequence!=null){');
scriptCode.push('for(i=0;i<playSequence.length;i++){');
scriptCode.push('var url=playSequence[i].mediaUrls[this.quality];url=url.substring(url.indexOf("://")+3);var playerUrl=this.getMediaObject().Source;');
scriptCode.push('if(this.getMediaObject()&&playerUrl!=null&&playerUrl.indexOf(url)>0){');
scriptCode.push('return i;}}}return-1;}');
scriptCode.push('sonora.player.player.getCurrentPlaySequenceIndex=sl_GetCurrentPlaySequenceIndex2;');
    
// Adiciona o elemento script no HEAD da página
var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
document.getElementsByTagName('head')[0].appendChild(script); 
scriptCode.length = 0;
