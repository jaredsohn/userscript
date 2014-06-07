// ==UserScript==
// @name Taha'$ Automatic Orkut Fake Profile Creator
// @author Dj aka Taha | Org by Taha
// @description Creates fake accounts in ORKUT, just enter how many accounts you want to create and the word verification
// @version 1.1
// @include *

// ==/UserScript==



var cmmid="40266689"; /*cmm id which u want ur fake to join*/
var uid="typetheidofthepersonuwanttoadd"; /*uid of the profile which u want to add*/
var fname="Taha "; /*first name*/
var lname="Tariq"; /*last name*/
var email1="djrulx"; /*first past of ur email id*/
var email2="taha.com"; /*last past of ur email id*/
var password="tahataha"; /*password(atleast 8 characters)*/
var c="154"; /*COUNTRY,91 for india,154 for pakistan */

/* dont edit anything below*/

if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0&hl=en-US&rm=false&passive=true" || window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.com%252F&hl=en-US&rm=false&passive=true")
{
window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en";
}

if(window.location=="http://www.orkut.com/Terms.aspx?mode=signup")
{
var nbb=document.forms[0].elements[2].click();void(0)
}

if(window.location=="https://www.google.com/accounts/CreateAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
{
window.location=window.document.links[4].href;
}

if(window.location=="http://www.orkut.com/EditSummary.aspx?mode=signup")
{
document.forms[2].elements[6].checked="true";document.forms[2].elements[36].checked="true";var newOption = document.createElement('option');newOption.selected="selected";newOption.value 