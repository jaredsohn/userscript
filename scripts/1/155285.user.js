// ==UserScript==
// @name        Mangafox directory
// @description Click on Manga directory. Browse every manga from a single web page.

// @author	manga_sites

// @include     http://mangafox.me/directory/*
// @version     0.01
//
// @grant		none
// ==/UserScript==

var s_info  = document.getElementsByClassName('manga_text');
var s_title = [];
var s_chapter=[];
for (i = 0; i < s_info.length; i += 1) {
  s_title.push( s_info[i].childNodes[1].textContent );
};
for (i = 0; i < s_title.length; i += 1) {
  var div = document.getElementsByClassName('manga_text')[0];
  var chapter = div.childNodes[9].textContent.split(' ');
  s_chapter.push( chapter[chapter.length - 1] );
  div.parentNode.removeChild( div );
  //s_info[i].parentNode.removeChild( s_info[i] );
};

function popup() {
  document.getElementById('blanket').style.display = '';
};

var s_manga_img  = document.getElementsByClassName('manga_img');
for (i = 0; i < s_manga_img.length; i += 1) {
  var a_ref   = s_manga_img[i].rel;
  var textbox = '<input style="position:absolute; left: -50px; width: 20px;" id="input_' + a_ref + '" type="number" value="' + s_chapter[i] + '" max="4">';
  var textbox = '<select style="position: relative; width: 120px; left: -50px;" id="input_' + a_ref + '"></select>';
  s_manga_img[i].parentNode.innerHTML += textbox;
  var content = 'for (var i = 0; i < chapter_list.length; i++) {\
  document.getElementById("input_' + a_ref + '").options[i] = new Option(chapter_list[i][0], chapter_list[i][1] );\
  }';
  var li = s_manga_img[i].parentNode;
  var a_html = s_manga_img[i].innerHTML;
  li.innerHTML   = li.innerHTML.substring( 0, li.innerHTML.indexOf('>') ) + ' onclick="xmlhttp=new XMLHttpRequest(); xmlhttp.onreadystatechange=function() { from = xmlhttp.responseText.indexOf(\'img src\'); to = xmlhttp.responseText.indexOf(\' \', from+4); document.getElementById(\'fast_render\').src = xmlhttp.responseText.substring(from+9, to-1); document.getElementById(\'blanket\').style.display = \'\'; window.current_page = 1; window.current_href = \''+ s_manga_img[i].href +'\' + document.getElementById(\'input_'+ a_ref + '\').value + \'/\'; }; xmlhttp.open(\'GET\', \'' + s_manga_img[i].href + '\' + document.getElementById(\'input_'+ a_ref + '\').value + \'/1.html\'); xmlhttp.send(); " ' + li.innerHTML.substring( li.innerHTML.indexOf('>') );
  s_manga_img[i].innerHTML = '<em style="position: absolute; top: 50px; left: 5px; width: 100px; color: #FFF; background-color: rgba(0,0,0,0.25);"><b>' + s_title[i] + '</b></em>' + a_html; //+ s_manga_img[i].innerHTML;
  while (s_manga_img[i].childNodes.length > 2) s_manga_img[i].removeChild( s_manga_img[i].childNodes[2] );
    script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.id  = 'script_c_' + a_ref;
    script.textContent = 'function script_c_onload_' + a_ref + '() {' + content + '};\
        script = document.createElement("script");\
    script.setAttribute("type", "text/javascript");\
    script.src = "http://mangafox.me/media/js/list.' + a_ref + '.js";\
    script.id  = "script_' + a_ref + '";\
    script.onload = eval("script_c_onload_' + a_ref + '");\
    document.body.appendChild( script ); ';

    s_manga_img[i].parentNode.appendChild(script); // run the script

  s_manga_img[i].className = "manga_img series_preview";
  s_manga_img[i].style.left = '200px';
  s_manga_img[i].href       = '#';
};

document.body.innerHTML = '<script type="text/javascript">\
function jump_to(page) {  }\
</script>\
<div id="blanket" style="display:none; background-color:#FFF; position:absolute; z-index: 2; top:0px; left:0px; width:100%; height:1200px">\
<div id=popUpDiv style="position:absolute; background-color:#FFF; width:100%; height:1200px; z-index: 3;">\
<table style="width:100%"><tr><td style="width: 150px;"><a href="#" onclick="document.getElementById(\'blanket\').style.display = \'none\';">Click Me To Close</a>\
</td><td style="text-align: center;"><a id="go_back" onclick="xmlhttp=new XMLHttpRequest(); xmlhttp.onreadystatechange=function() { from = xmlhttp.responseText.indexOf(\'img src\'); to = xmlhttp.responseText.indexOf(\' \', from+4); document.getElementById(\'fast_render\').src = xmlhttp.responseText.substring(from+9, to-1); }; xmlhttp.open(\'GET\',  window.current_href  + (window.current_page -= 1) + \'.html\'); xmlhttp.send();\
if (window.current_page == 1) { document.getElementById(\'go_back\').innerHTML = \'\'; } else { document.getElementById(\'go_back\').innerHTML = \'Previous\'; };"\
 ></a></td></tr></table>\
<p style="text-align: center;"><img onclick="xmlhttp=new XMLHttpRequest(); xmlhttp.onreadystatechange=function() { from = xmlhttp.responseText.indexOf(\'img src\'); to = xmlhttp.responseText.indexOf(\' \', from+4); document.getElementById(\'fast_render\').src = xmlhttp.responseText.substring(from+9, to-1); }; xmlhttp.open(\'GET\',  window.current_href  + (window.current_page += 1) + \'.html\'); xmlhttp.send();\
if (window.current_page == 1) { document.getElementById(\'go_back\').innerHTML = \'\'; } else { document.getElementById(\'go_back\').innerHTML = \'Previous\'; };"\
 id="fast_render"></p>\
<iframe id="keyhole" src="" style="width:1000px; height:1200px; display: none;"></iframe></div></div>' + document.body.innerHTML;