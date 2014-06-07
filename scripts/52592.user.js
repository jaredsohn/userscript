// ==UserScript==
// @name            ShowPhotoThumbnail
// @namespace       http://rilakkuma.moe.hm/
// @description     Wassr検索で投稿画像のサムネイルを表示する
// @include         http://labs.ceek.jp/wassr/*
// @author          betoneto http://wassr.jp/user/betoneto
// @version         0.2
// ==/UserScript==


function addPhotos(){
    var aElements = document.getElementsByTagName("a");
    for (i=0; i<aElements.length; i++){
        if (aElements[i].parentNode.className == 'postdate' && aElements[i].parentNode.innerHTML.indexOf("img") == -1){
            aElements[i].parentNode.innerHTML = aElements[i].parentNode.innerHTML + '<br><a href="' + aElements[i].getAttribute("href") + '/photo"><img src="' + aElements[i].getAttribute("href") + '/photo_thumbnail"></a>';
        }
    }
}

addPhotos();

/* AutoPageRizeのフックに登録 */
setTimeout(function(unsafeWindow){
    if (window.AutoPagerize && window.AutoPagerize.addFilter){
        window.AutoPagerize.addFilter(addPhotos);
    }
},0, this.unsafeWindow || window);

