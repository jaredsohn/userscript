// ==UserScript==
// @author         Shyangs
// @name           wasabii登入頁密碼框可打字
// @namespace      http://zh.wikipedia.org/wiki/User:Shyangs
// @description    wasabii旗下網頁遊戲，登入頁密碼框改為可打字狀態
// @include        https://member.wasabii.com.tw/Login.aspx*
// @version        0.1
// @license        MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==

var pw=document.getElementById("Password");
pw.outerHTML='<input name="Password" maxlength="12" id="Password" class="Login_box" style="width:115px;border-width:1px;cursor:pointer;" type="password">';