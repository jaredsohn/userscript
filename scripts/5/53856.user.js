// ==UserScript==
// @name           BATAVO's Dropavideo Ads Remover
// @namespace      All
// @description    Remove os 'Links Patrocinados' do Dropavideo.com
// @include        http://dropavideo.com/*   
// ==/UserScript==




// *USUÁRIO NÃO LOGADO* -> Retira as propagandas da página inicial (canto inferior direito) e 
// das páginas de exibição de videos (lado esquerdo)
//
// *USUÁRIO LOGADO* -> Retira as propagandas (lado direito) das páginas: INÍCIO (Amigos | Novas Recomendações | Todos),
// PERFIL e AMIGOS


(function() {


  var rightsidebarads = document.getElementById('right_side_ad');
  var leftsidebarads = document.getElementById('left_side_ad');
  var mainad = document.getElementsByClassName('main_ad');
     for (var i = 0; i < mainad.length; i++)
  mainad[i].parentNode.removeChild(mainad[i]);
  if (rightsidebarads) {
    rightsidebarads.parentNode.removeChild(rightsidebarads);
    }
  if (leftsidebarads) {
    leftsidebarads.parentNode.removeChild(leftsidebarads);
    }  
}
)();