// ==UserScript==
// @name           Notebook
// @namespace      Travian.co.uk
// @description    A notebook is on the side so you can write infomation down and save it quick and easy.
// @include        http://*travian*
// ==/UserScript==
var sidebar = document.getElementById('side_info');var saves = GM_getValue("notepadlog");sidebar.innerHTML = '<div align="center" width="100"><span style="font-size: 36px; font-weight: bold; color: #00CC33;">Notepad</span><br /><span style="font-size: 9px;">V.1 written by <a target="_blank" href="http://www.apx.comlu.com">ApocalypeX</a></span><hr /></div>'+'<br /><div><textarea style="background-image:url(http://apx.comlu.com/Images/flybmedium.jpg);background-position:right;background-repeat:no-repeat;" id="textbox" cols="50" rows="10"></textarea><br /><div align="right"><input type="button" id="save" value="Save"></div></div>';var savebutton = document.getElementById('save');savebutton.addEventListener("click", savelog, true);function savelog(){var writtentext = document.getElementById('textbox').value;GM_setValue("notepadlog", writtentext);alert("Notepad saved");}var textboxy= document.getElementById('textbox').value = saves;
//Oops I did it again! ApocalypeX FLYB