// ==UserScript==
// @name       Title shortener for roblox
// @namespace  julienmauriemort
// @version    0.1
// @description  Helps deal with the 60 char limit
// @match      *.roblox.com/Forum/AddPost.aspx?PostID*
// @copyright  2012+, You
// ==/UserScript==
document.getElementById("ctl00_cphRoblox_Createeditpost1_PostForm_PostSubject").value = ".";