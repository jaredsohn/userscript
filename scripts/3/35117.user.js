// ==UserScript==
// @name           Tag panel
// @namespace      ru.lepra.mcm69
// @description    return the tag panel to sublepras. <irony>12k-only</irony>
// @include        http://12k.leprosorium.ru/comments/*
// ==/UserScript==
var html = "<a onclick=\"return insert_text('b');\" href=\"\"><b>Bold</b></a>&nbsp;&nbsp;"+ 
          "<a onclick=\"return insert_text('i');\" href=\"\"><i>Italic</i></a>&nbsp;&nbsp;"+ 
          "<a onclick=\"return insert_text('u');\" href=\"\"><u>Underline</u></a>&nbsp;&nbsp;"+
          "<a onclick=\"return insert_text('sup');\" href=\"\">x<sup>2</sup></a>&nbsp;&nbsp;"+
          "<a onclick=\"return insert_text('sub');\" href=\"\">x<sub>2</sub></a>&nbsp;&nbsp;"+ 
          "<a onclick=\"return insert_text('irony');\" href=\"\"><span class=\"irony\">Irony</span></a>&nbsp;&nbsp;"+        
          "<a onclick=\"insert_link(); return false;\" href=\"\"><b>Link</b></a>&nbsp;&nbsp;"+
          "<a onclick=\"insert_image(); return false;\" href=\"\"><b>Image</b></a>&nbsp;&nbsp;";
var div = document.getElementById('reply_form').getElementsByClassName("header");
div = div[0];
div.innerHTML = html; 