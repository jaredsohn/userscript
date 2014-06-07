// ==UserScript==
// @name           Halo 3 Login
// @namespace      Jonathan Peterson | http://www.myspace.com/joequincy
// @description    Simplifies login to bungie.net by automatically filling out the Windows Live ID login and submitting it after 3 seconds. You need to edit the script to use your own email and password before it will work.
// @include        http://login.live.com/login.srf?wa=wsignin1.0&rpsnv=10&ct=*
// ==/UserScript==

/* In order for this script you work, you must:
A)replace "email@domain.com" with your own email address (in quotations)
B)replace "yourpassword" with your own password (in quotations)
I cannot stress enough that you must place quotations around each
of these items. If you do not, the script will not fill out the form
correctly, and you will get caught in a neverending loop unless you
temporarily disable greasemonkey and add the quotations.
Remember to use the Windows Live ID associated with your Bungie.net
account. */
loginEmail = "email@domain.com";
loginPass = "yourpassword";

mumboJumbo = document.getElementsByName("f1")[0].innerHTML;
filterOutEmail = /i0116" maxlength="113" autocomplete="off" value=".{0,113}" style="" class="css0034" type="text"/;
filterOutPaswd = /i0118" maxlength="16" autocomplete="off" value=".{0,16}" style="" class="css0034" type="password"/;
emailBit = filterOutEmail.exec(mumboJumbo);
passBit = filterOutPaswd.exec(mumboJumbo);
newEmail = 'i0116" maxlength="113" autocomplete="off" value="' +loginEmail+ '" style="" class="css0034" type="text"';
newPaswd = 'i0118" maxlength="16" autocomplete="off" value="' +loginPass+ '" style="" class="css0034" type="password"';

html = '<html dir="ltr">';
html = html + document.body.parentNode.innerHTML;
html = html + '</html';
withNe = html.replace(filterOutEmail, newEmail);

withNa = withNe.replace(filterOutPaswd, newPaswd);

document.write(withNa);


wait = setTimeout('document.f1.submit();', 3000);