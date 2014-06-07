// ==UserScript==
// @name           SpamBlockerPlus!
// @namespace      http://www.andremachado.cjb.net
// @description    Acaba com os spams do Orkut
// @include        http://www.orkut.com*ook.aspx*
// @include        http://www.orkut.com/SpamConfig*
// @include        http://www.orkut.com/Community.aspx*
// @include        http://www.orkut.com/CommTopics.aspx*
// ==/UserScript==

var i;var currentLocation = document.URL; var n= new Array("fotos no meu blog","sexo","fotos sensuais","pessoas procurando prazer","gatas na webcam","créditos gratuitos","créditos grátis", "tesão","clube dos Gays","estou te provocando","fotos de bikini","encontros picantes","gatas na cam","cam ao vivo","cam aovivo","putinhas","estupros reais","garotas de programa","só pra gay","folia de","só para gay","gatas na webcam","encontros sexuais","mais gostosas","eu e minhas amigas", "tarada","vídeos de sexo","baixe musicas mp3","encontros adultos","baixe músicas mp3","safadinha","baianinhas"); var k;for (i=0; i<document.links.length; i++){if(document.links[i].text){for(k=0; k<n.length;k++){if(((document.links[i].innerHTML).toLowerCase().indexOf(n[k])) > -1){document.links[i].style.visibility="hidden";document.links[i+1].style.visibility="hidden";}}}}document.URL=currentLocation;
