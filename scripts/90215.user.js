// ==UserScript==
// @name	Ruten Images Autoloader
// @namespace	http://blog.gslin.org/plugins/autoload-images-ruten
// @description Autoload Images in ruten.com.tw
// @homepage	http://blog.gslin.org/plugins/autoload-images-ruten
// @version	20110208.0
// @include	http://goods.ruten.com.tw/item/show?*
// ==/UserScript==

(function(){
    unsafeWindow.second_stage_image_loader();
    var a = document.getElementById('arrow_detail');
    if (a) {
        a.style.display = 'none';
    }
})();