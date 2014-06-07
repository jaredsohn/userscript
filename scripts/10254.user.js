// ==UserScript==
// @name           YouTube SMF Forum
// @namespace      http://www.mailson.net/
// @description    Add on YouTube.com a embed code for SMF Foruns
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// ==/UserScript==

var re = /=(.*)$/
var s = document.getElementById('vidFacetsTable');

link = document.getElementsByName('video_link')[0].value;
var matrix = re.exec(link);

inputValue = "[youtube]"+ matrix[1] +"[/youtube][br]"+ link;

s.innerHTML += "<tr><td class='smallLabel'>Forum</td><td><input name='forum_code' type='text' value='"+ inputValue +"' class='vidURLField' onClick='javascript:document.urlForm.forum_code.focus();document.urlForm.forum_code.select();' readonly='true'></td></tr>";