// ==UserScript==
// @name IC colours
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description IC colour scheme for fet. Copyable pictures.
// @include https://fetlife.*
// @include https://*.fetlife.*
// ==/UserScript==
var e = document.createElement('style');
e.innerHTML = 'body{color:#000080;background:#ffffff;}a{color:#000080 !important;background:#ffffff !important;}a:hover{background:#a7a7cc !important;}#header_v2{background:#ffffff;}h1,h2,h3{text-shadow:none !important;}#footer{background:#ffffff;}#footer h4{background:#fffff;}div.border,div.colborder,.sub_sections,article.comment,#group ul#discussions li,ul#tabnav, .tabs,ul#tabnav li a,.tabs li a,.message{border-color:#ffffff;}fieldset{background:#ffffff !important;}input{color:#000080 !important;background:#ffffff !important}input[type=button],input[type=submit]{color:#000080 !important;background:#ffffff !important;}.ad{background:#ffffff}img{background:#ffffff}.sub_sections .selected{background:#ffffff}.stickies ul li a .sticky_label{color:#ffffff;background:#e40000;}section#comments header h1{border-color:#ffffff;}.kpbox .op,.kpbox .comments,#navigation_bar,.group_personal_settings,.debos,#payment_options .plans,#payment_options .address,#place_header,aside .count_total,aside .continuous_perving{background:#ffffff;}#header_v2 .messaging li .count,#navigation_bar .messaging li .count,.count,section#comments h1 .count{color:#000080;background:#ffffff;}#your_location,.groups_search,.box.small,.empty,#main_content, #main_content_w_secondary{background:#ffffff;}.avatar, .picture,article.comment footer a.avatar img,section#pictures ul li a img{background:#ffffff}textarea{color:#00040 !important;background:#ffffff !important}#formatting_guidelines .example{background:#ffffff}form.open p,.closed p,form.one_size p{background:#ffffff}.countdown{background:#ffffff}kbd{background:#ffffff;text-shadow:none;}.highlight,#main_content .highlight{background:#bcbcbc;color:#000080;font-style:none;}#user_picture section#picture footer .caption{color:#000080}#picture a:hover img{background:#ffffff !important}';
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
