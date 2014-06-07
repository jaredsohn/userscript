// ==UserScript==
// @name           FB color changer
// @namespace      Mage
// @include        http://*.facebook.com/*
// ==/UserScript==

// insert Color settings link
var bodyEl = document.getElementsByTagName('body')[0];

// insert some CSS classes and styles
var script_style_div = document.createElement('div');
script_style_div.innerHTML = 
'<style><!-- ' +  
'.invis{display: none;}' + 
'.form_color_set{margin-left: 10px; margin-top: 25px;}' + 
' .form_color_set label {margin-right: 10px;}' +  
' .color_preview {width: 230px; height: 25px; border: 1px solid black; margin-top: 10px;}' +  
' .set_link {color: black; font-size: 16px; font-weight: bold;}' +  
'--></style>';

script_style_div.innerHTML +=
'<script type="text/javascript">\n' + 

'</script>';

bodyEl.appendChild(script_style_div);

// insert link to on/off color settings menu
var inbox = document.getElementById('navAccount');
var new_li = document.createElement('li');
new_li.setAttribute('id', 'fb_menu_color_settings');
new_li.innerHTML = '<a href="#" onclick="var c = document.getElementById(\'color_settings\');  if (c.className == \'\'){c.className = \'invis\'}else{c.className = \'\'} return false;" id="nav_color_set">Color settings</a>';
inbox.parentNode.insertBefore(new_li, inbox);





var settings_div = document.createElement('div');
settings_div.setAttribute('id', 'color_settings');
settings_div.setAttribute('class', 'invis');
settings_div.setAttribute('style', 'width: 250px; height: 500px; position: absolute; top: 54px; left: 500px; z-index: 50; background: silver;');

settings_div.innerHTML = 
'<script type="text/javascript">' +
'function getCookie(c_name)\n' +
'{\n' +
' if (document.cookie.length>0)\n' +
' {\n' +
'   c_start=document.cookie.indexOf(c_name + "=");\n' +
'   if (c_start!=-1)\n' +
'   {\n' +
'     c_start=c_start + c_name.length+1;\n' +
'     c_end=document.cookie.indexOf(";",c_start);\n' +
'     if (c_end==-1) c_end=document.cookie.length;\n' +
'     return unescape(document.cookie.substring(c_start,c_end));\n' +
'   }\n' +
' }\n' +
' return "";\n' +
'}\n' +
' function set_preview(e, id, color)\n' +
' {\n' +
'   var prev_el = document.getElementById(id);\n' +
'   if (color[0] != \'#\') {color = \'#\' + color}\n' + 
'   prev_el.style.backgroundColor = color + String.fromCharCode(e.which);\n' +
' }\n\n' +
' function set_bkg_color(id)\n' +
' {\n' +
'   var date = new Date();\n' +
'		date.setTime(date.getTime()+(1000*24*60*60*1000));\n' +
'		var expires = "; expires="+date.toGMTString();\n' +
'   var color = document.getElementById(id).style.backgroundColor;\n' +
'   var css_div = document.getElementById(\'new_css\');\n' +
'   css_div.innerHTML += "<style><!-- body, #contentCol, .commentable_item .ufi_section,  .lightblue_box, .UIIntentionalStory, .profile .box .box_header, .profile .box h4.box_header, .UIRecentActivityStory { background-color: " + color + ";} --></style>";\n' +
'   document.cookie = "bkgC=" + color + expires ;\n' + 
' }\n\n' +      
' function set_name_color(id)\n' +
' {\n' +
'   var date = new Date();\n' +
'		date.setTime(date.getTime()+(1000*24*60*60*1000));\n' +
'		var expires = "; expires="+date.toGMTString();\n' +
'   var color = document.getElementById(id).style.backgroundColor;\n' +
'   var css_div = document.getElementById(\'new_css\');\n' +
'   css_div.innerHTML += "<style><!-- .GenericStory_Name { color: " + color + ";} --></style>";\n' + 
'   document.cookie = "nameC=" + color + expires ;\n' + 
' }\n\n' +
' function set_link_color(id)\n' +
' {\n' +
'   var date = new Date();\n' +
'		date.setTime(date.getTime()+(1000*24*60*60*1000));\n' +
'		var expires = "; expires="+date.toGMTString();\n' +
'   var color = document.getElementById(id).style.backgroundColor;\n' +
'   var css_div = document.getElementById(\'new_css\');\n' +
'   css_div.innerHTML += "<style><!-- a { color: " + color + ";} --></style>";\n' + 
'   document.cookie = "linkC=" + color + expires ;\n' + 
' }\n\n' +
' function set_text_color(id)\n' +
' {\n' +
'   var date = new Date();\n' +
'		date.setTime(date.getTime()+(1000*24*60*60*1000));\n' +
'		var expires = "; expires="+date.toGMTString();\n' +
'   var color = document.getElementById(id).style.backgroundColor;\n' +
'   var css_div = document.getElementById(\'new_css\');\n' +
'   css_div.innerHTML += "<style><!-- body, .GenericStory_Body  .commentable_item, .GenericStory_Message, h3 .UIStory_Message{ color: " + color + ";} --></style>";\n' +
'   document.cookie = "textC=" + color + expires ;\n' + 
' }\n\n' + 
' function set_top_bar_color(id)\n' +
' {\n' +
'   var date = new Date();\n' +
'		date.setTime(date.getTime()+(1000*24*60*60*1000));\n' +
'		var expires = "; expires="+date.toGMTString();\n' +
'   var color = document.getElementById(id).style.backgroundColor;\n' +
'   var css_div = document.getElementById(\'new_css\');\n' +
'   css_div.innerHTML += "<style><!-- #blueBar { background-color: " + color + ";} --></style>";\n' +
'   document.cookie = "topC=" + color + expires ;\n' + 
' }\n\n' + 
' function set_default()\n' +
' {\n' +
'   var date = new Date();\n' +
'		date.setTime(date.getTime()+(1000*24*60*60*1000));\n' +
'		var expires = "; expires="+date.toGMTString();\n' +
'   document.cookie = "nameC=#3B5998" + expires ;\n' +
'   document.cookie = "textC=#333333" + expires ;\n' +
'   document.cookie = "linkC=#3B5998" + expires ;\n' +
'   document.cookie = "topC=#3B5998" + expires ;\n' +
'   window.location.reload();' +  
' }\n\n' + 
'function check_colors()\n' +
'{' +
'  var css_div = document.getElementById(\'new_css\');\n' +
'  var bkgC = getCookie(\'bkgC\');\n' +
'  var nameC = getCookie(\'nameC\');\n' +
'  var linkC = getCookie(\'linkC\');\n' +
'  var textC = getCookie(\'textC\');\n' +
'  var topC = getCookie(\'topC\');\n' +
'  if (bkgC != \'\')' +
'  {' +
'   css_div.innerHTML += "<style><!-- body, #contentCol, .commentable_item .ufi_section,  .lightblue_box, .UIIntentionalStory, .profile .box .box_header, .profile .box h4.box_header, .UIRecentActivityStory { background-color: " + bkgC + ";} --></style>";\n' +
'  }' +
'  if (nameC != \'\')' +
'  {' +
'   css_div.innerHTML += "<style><!-- .GenericStory_Name { color: " + nameC + ";} --></style>";\n' + 
'  }' +
'  if (linkC != \'\')' +
'  {' +
'   css_div.innerHTML += "<style><!-- a { color: " + linkC + ";} --></style>";\n' + 
'  }' +
'  if (textC != \'\')' +
'  {' +
'   css_div.innerHTML += "<style><!-- body, .GenericStory_Body  .commentable_item, .GenericStory_Message, h3 .UIStory_Message{ color: " + textC + ";} --></style>";\n' +
'  }' +
'  if (topC != \'\')' +
'  {' +
'   css_div.innerHTML += "<style><!--  #blueBar{ background-color: " + topC + ";} --></style>";\n' +
'  }' +
'}\n\n' +
'window.onload = check_colors();\n' + 
'</script>' + 
'<form class="form_color_set"><div> ' + 
'  <label for="background">Background:</label><input type="text" id="background" value="#" onkeypress="set_preview(event, \'bkg\', this.value);" />' + 
'  <div class="color_preview" id="bkg"></div><a href="#" onclick="set_bkg_color(\'bkg\'); return false;" class="set_link">SET</a>' + 
'  <br /><br />' + 
'  <label for="name_color">Name color:</label><input type="text" id="name_color" value="#" onkeypress="set_preview(event, \'nmclr\', this.value);" />' + 
'  <div class="color_preview" id="nmclr"></div><a href="#" onclick="set_name_color(\'nmclr\'); return false;" class="set_link">SET</a>' +
'  <br /><br />' + 
'  <label for="link_color">Link color:</label><input type="text" id="link_color" value="#" onkeypress="set_preview(event, \'lnkclr\', this.value);" />' + 
'  <div class="color_preview" id="lnkclr"></div><a href="#" onclick="set_link_color(\'lnkclr\'); return false;" class="set_link">SET</a>' +
'  <br /><br />' + 
'  <label for="text_color">Text color:</label><input type="text" id="text_color" value="#" onkeypress="set_preview(event, \'txtclr\', this.value);" />' + 
'  <div class="color_preview" id="txtclr"></div><a href="#" onclick="set_text_color(\'txtclr\'); return false;" class="set_link">SET</a>' +
'  <br /><br />' + 
'  <label for="top_bar_color">Top Bar color:</label><input type="text" id="top_bar_color" value="#" onkeypress="set_preview(event, \'tpbclr\', this.value);" />' + 
'  <div class="color_preview" id="tpbclr"></div><a href="#" onclick="set_top_bar_color(\'tpbclr\'); return false;" class="set_link">SET</a>' +

'  <div id="def_color"><a href="#" onclick="set_default(); return false;" class="set_link">Default</a> <a href="#" onclick="var c = document.getElementById(\'color_settings\');  if (c.className == \'\'){c.className = \'invis\'}else{c.className = \'\'} return false;" class="set_link">OK</a></div>' +
'</div></form>' + 
'<div id="new_css"></div>';

bodyEl.appendChild(settings_div);