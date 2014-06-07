// ==UserScript==
// @name            WassrNoIineExtractor
// @namespace       http://rilakkuma.moe.hm/
// @description     Wassrでイイネのないヒトコトを抽出する
// @include         http://wassr.jp/*
// @exclude         http://wassr.jp/favorite/*
// @exclude         http://wassr.jp/user/*/statuses/*
// @exclude         http://wassr.jp/my/users_reply/*
// @exclude         http://wassr.jp/ranking/favorite/*
// @exclude         http://wassr.jp/user/*/favorites*
// @exclude         http://wassr.jp/user/*/received_favorites*
// @author          betoneto http://wassr.jp/user/betoneto
// @version         0.1
// ==/UserScript==


function extract(){
  var divElements = document.getElementsByTagName("div");
  for(i=0; i<divElements.length; i++){
    if(divElements[i].className == 'favorite_list'){
      divElements[i].parentNode.parentNode.style.display = 'none';
    }
  }
}

extract();

/* AutoPageRizeのフックに登録 */
setTimeout(function(unsafeWindow){
	if (window.AutoPagerize && window.AutoPagerize.addFilter){
		window.AutoPagerize.addFilter(extract);
	}
},0, this.unsafeWindow || window);
