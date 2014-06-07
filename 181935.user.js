// ==UserScript==
// @name        GameFAQs - Private Board Userlist Link
// @namespace   http://userscripts.org/scripts/source/181935.user.js
// @description GameFAQs - Private Board Userlist Link descr
// @include     http://www.gamefaqs.com/boards/848*
// @version     1
// ==/UserScript==
//You will need to change the @include to the private board you are admin of
var adminpage = "http://www.gamefaqs.com/boards/848-hardcore/?admin=1"; //Link to the admin page.
var uls = document.getElementsByClassName("paginate user");
for (i=0;i<uls.length;i++)
{
uls[i].innerHTML += '<li><a href="'+adminpage+'">Private Board Userlist</a></li>';
}

