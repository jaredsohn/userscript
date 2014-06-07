// ==UserScript==
// @name           dh3zv4
// @namespace      http://indohogwarts.co.nr
// @description    made by Francis MacManus, Substitution Text for Zetaboards
// ==/UserScript==


<script>function guestText(inValue){
var custom = inValue+" ";
var area = document.getElementById("top_info");
var text = area.innerHTML.replace("Guest", custom);
document.getElementById("top_info").innerHTML = text;
}</script>

<script>function logoutText(inValue){
var custom = inValue+" ";
var area = document.getElementById("top_info");
var text = area.innerHTML.replace("Sign Out", custom);
document.getElementById("top_info").innerHTML = text;
}</script>

<script>function loginText(inValue){
var custom = inValue+" ";
var area = document.getElementById("top_info");
var text = area.innerHTML.replace("Log In", custom);
document.getElementById("top_info").innerHTML = text;
}</script>

<script>function inboxText(inValue){
var custom = inValue+" ";
var area = document.getElementById("top_menu");
var text = area.innerHTML.replace("Inbox", custom);
document.getElementById("top_menu").innerHTML = text;
}</script>


<script>function memberText(inValue){
var custom = inValue+" ";
var area = document.getElementById("submenu");
var text = area.innerHTML.replace("Members", custom);
document.getElementById("submenu").innerHTML = text;
}</script>
