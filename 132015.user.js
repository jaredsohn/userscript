// ==UserScript==
// @name Fetfix
// @version 0.2
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description [FetLife.com] Black text on white background. Copyable pictures.
// @include https://fetlife.*
// @include https://*.fetlife.*
// ==/UserScript==
var e = document.createElement('style');
e.innerHTML = 'body{color:#4d4d4d;background:#f0f0f0;}a{color:#4d4d4d !important;background:#f0f0f0 !important;}a:hover{background:#e3e3e3 !important;}#header_v2{background:#f0f0f0;}h1,h2,h3{text-shadow:none !important;}#footer{background:#f0f0f0;}#footer h4{background:#e3e3e3;}div.border,div.colborder,.sub_sections,article.comment,#group ul#discussions li,ul#tabnav, .tabs,ul#tabnav li a,.tabs li a,.message{border-color:#d6d6d6;}fieldset{background:#f0f0f0 !important;}input{color:#4d4d4d !important;background:#f0f0f0 !important}input[type=button],input[type=submit]{color:#4d4d4d !important;background:#e3e3e3 !important;}.ad{background:#f0f0f0}img{background:#f0f0f0}.sub_sections .selected{background:#a2a2a2}.stickies ul li a .sticky_label{color:#e3e3e3;background:#e40000;}section#comments header h1{border-color:#bcbcbc;}.kpbox .op,.kpbox .comments,#navigation_bar,.group_personal_settings,.debos,#payment_options .plans,#payment_options .address,#place_header,aside .count_total,aside .continuous_perving{background:#f0f0f0;}#header_v2 .messaging li .count,#navigation_bar .messaging li .count,.count,section#comments h1 .count{color:#f0f0f0;background:#e40000;}#your_location,.groups_search,.box.small,.empty,#main_content, #main_content_w_secondary{background:#f0f0f0;}.avatar, .picture,article.comment footer a.avatar img,section#pictures ul li a img{background:#d6d6d6}textarea{color:#4d4d4d !important;background:#f0f0f0 !important}#formatting_guidelines .example{background:#e3e3e3}form.open p,.closed p,form.one_size p{background:#d6d6d6}.countdown{background:#e3e3e3}kbd{background:#e3e3e3;text-shadow:none;}.highlight,#main_content .highlight{background:#bcbcbc;color:#fff;font-style:italic;}#user_picture section#picture footer .caption{color:#4d4d4d}#picture a:hover img{background:#e3e3e3 !important}';
document.getElementsByTagName('head')[0].appendChild(e);
if (document.URL.match(/pictures\/\d+$/)) {
  e = $('.fake_img');
  if (e.size() == 1) {
    var img = document.createElement('img');
    var url = e.css('background-image');
    img.src = url.substring(5, url.length - 2);
    img.height = e.height();
    img.width = e.width();
    var p = e.parent();
    e.remove();
    p.append(img);
  }
}
