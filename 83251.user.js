// ==UserScript==
// @name           fakeAttacker
// @namespace      menelgame.pl
// @description    Script created by xtc.
// @include        http://*menelgame.pl/fight/*
// ==/UserScript==

var emek = document.getElementsByTagName("me")[0];
emek.innerHTML = "<form method=\"post\" action=\"/fight/attack/\"><br /><div style=\"background-color:#2A2A2A; width:300px; padding: 6px; margin-left:70px; -moz-border-radius: 4px;\"><span class=\"tiername\">Zacznij atak:</span><br /><center><div id=\"holder\"><span>ProszÄ� kliknij na <b>liczbÄ�</b></span><span class=\"captcha\"><input  id=\"captcha_img\" type=\"image\" src=\"\" name=\"captchacheck\" style=\"width:205;height:200px\" alt=\"Loading...\" /><input type=\"button\" class=\"cancel\" value=\"Anuluj\" onclick=\"javascript:setupForm('cancel')\"></span></div></center>Nazwa menela:<input name=\"f_toid\" type=\"text\" value=\"\" /><input name=\"Submit2\" type=\"button\" value=\"&nbsp;&nbsp;Atak&nbsp;&nbsp;\" onclick=\"javascript:setupForm('/attack/')\" /><br /><a href=\"/highscore/user/?min=3773&max=7074\">PokaĹź graczy do zaatakowania</a></div><br /></form>";