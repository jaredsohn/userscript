// ==UserScript==
// @name       kuai.xunlei.com.fix
// @namespace   http://userscripts.org/users/tumuyan
// @author tumuyan
// @version    0.2 B
// @description  kuai.xunlei.fix
// @include    http://kuai.xunlei.com/d/*
// @include    http://kuai.xunlei.com/s/*
// ==/UserScript==

  var css = document.createElement("style");
                css.type="text/css";
                css.innerHTML = 'ul#kuaidbox{ padding:45px !important; position:fixed !important; width:700px !important;height:450px !important; background:#fcfdfd !important; bottom:0px !important; top:80px !important; overflow:scroll !important;  }  .download_w_new{position:fixed !important;right:0px !important;width:150px !important} .download_w_new a.general_btn{position:fixed !important;right:0px !important;top:95px !important} .download_w_new a.high_btn{position:fixed !important;right:0px !important;top:150px !important} .download_w_new  .operation{position:fixed !important;right:10px !important;top:180px !important;z-index:999 !important}   a[href^="http://record.kuai.xunlei.com/r"] , .file_right .r_img, .adpic,.ad_side, .file_left .l_img, a.rep_ico ,.hot_list,.kc_tips,div[class^="adv"] {display:none !important;}  .file_tr > span[class="c4 status"]{display:none !important} .file_tr > span.c_2{width:520px !important}  .main > .file_left >.file_w >div[class="file_src file_list liebiao"] > ul, .main > .file_left >.file_w > ul[class="fList_area file_list"]{ padding: 100px 45px !important;  position:fixed !important;  width:700px !important;height:410px !important;  background:transparent !important;  bottom:0px !important;  top:80px !important;  overflow:scroll !important; }  .file_src {border-bottom:none !important} .footer{ display:none !important}';
                document.head.appendChild(css);