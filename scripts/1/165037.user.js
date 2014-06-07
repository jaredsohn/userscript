// ==UserScript==
// @name         貼吧簽名檔隱藏
// @version	 	 2.0
// @include      http://tieba.baidu.com/p*
// @include      http://tieba.baidu.com/f*
// @include      http://tieba.baidu.com.cn/p*
// @include      http://tieba.baidu.com.cn/f*
// @include      http://rp.baidu.com*
// @run-at       document-start
// ==/UserScript==
(function() {
    var css = "";
    if (false || (document.location.href.indexOf("http://tieba.baidu.com/f") == 0) || (document.location.href.indexOf("http://tieba.baidu.com/p") == 0) || (document.location.href.indexOf("http://tieba.baidu.com.cn/f") == 0) || (document.location.href.indexOf("http://tieba.baidu.com.cn/p") == 0))
    css += "#topic_post_thread .qp_editor_container.j_ed_container .tb-simpleeditor-wrapper .tb-editor-editarea\n{background:white !important;box-shadow:none !important;}\n\n\n.d_sign_split\n{background:none !Important;width:40px !Important;height:auto !Important;}\n.d_sign_split::before\n{content:\"签名档\" !important;color:#989898 !Important;cursor:default !Important;-moz-transition:0.3s ease all;}\n.d_sign_split + img\n{position:absolute !important;z-index:300;max-height:0px!Important;height:auto!Important;width:auto!important;\nbox-shadow: 0px 0px 4px 0px rgba(100,220,250,1) !important;-moz-transition:0.3s ease all;}\n.d_sign_split:hover + img,.d_sign_split + img:hover\n{max-height:200px !Important;-moz-transition:0.3s ease all;}";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
})();