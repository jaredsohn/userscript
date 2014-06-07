// ==UserScript==
// @name           KOC Account Manager
// @description    Easily Login Accounts
// @include        http://www.kingsofchaos.com/
// @include        http://www.kingsofchaos.com/error.php
// @include        http://www.kingsofchaos.com/logout.php
// ==/UserScript==


/*
Here you can create an array of your koc accounts. If you have more than one account, copy/paste this:
new Array("username","email","password")
onto the line below the current one, and add a comma (,) onto the one above. it will then look like this:
new Array("username","email","password"),
new Array("username","email","password")
For each account, there will be a button below login. one-click login.
*/


// ---------- CHANGE THIS -------- //
var logins = new Array(
new Array("username","email","password")
);
// -------------------------------- //


var hiddens = new Array();
var logins2 = new Array();
var register;
var forgot;
var eles = document.getElementsByTagName("input");
for(i=0;i<eles.length;i++)
{
ele = eles[i];
if(ele.className=="login_input"&&ele.type=="text")
{
logins2[logins.length] = ele;
}
if(ele.type=="hidden")
{
hiddens[hiddens.length] = ele;
}
}
var eles = document.getElementsByTagName("a");
for(i=0;i<eles.length;i++)
{
ele = eles[i];
if(ele.href=="http://www.kingsofchaos.com/index.php?register=true")
{
register = ele;
}
if(ele.href=="http://www.kingsofchaos.com/forgotpass.php")
{
forgot = ele;
}
}


forgot.parentNode.parentNode.parentNode.removeChild(forgot.parentNode.parentNode);

var par = register.parentNode;
par.removeChild(register);

var div = document.createElement("div");

for(i=0;i<logins.length;i++)
{
login = logins[i];
username = login[0];
email = login[1];
pass = login[2];

var form = document.createElement("form");
form.action="login.php";
form.method="post";
form.enctype="multipart/form-data";

var ih1 = document.createElement("input");
ih1.type="hidden";
ih1.name="username";

var ih2 = document.createElement("input");
ih2.type="hidden";
ih2.name="pword";

var ih3 = document.createElement("input");
ih3.type="hidden";
ih3.name="hash";
ih3.value="";

var ih4 = document.createElement("input");
ih4.type="hidden";
ih4.name="usrname";
ih4.value=username;

var ih5 = document.createElement("input");
ih5.type="hidden";
ih5.name="uemail";
ih5.value=email;

var ih6 = document.createElement("input");
ih6.type="hidden";
ih6.name="peeword";
ih6.value=pass;

var i1 = document.createElement("input");
i1.type="submit";
i1.value=username;

form.appendChild(ih1);
form.appendChild(ih2);
form.appendChild(ih3);
form.appendChild(ih4);
form.appendChild(ih5);
form.appendChild(ih6);
form.appendChild(i1);

div.appendChild(form);

}
par.appendChild(div);