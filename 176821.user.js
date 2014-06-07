// ==UserScript==
// @name       S8FU
// @namespace  
// @version    1.0
// @description  Pripyat
// @include      http://*.storm8.com/upgrade_latest.php*
// @copyright  2013
// ==/UserScript==

var game = String(location).split('/')[2].split('.')[0];

if (game == "wwar") {
document.location = "http://wwar.storm8.com/home.php"; }

if (game == "im") {
document.location = "http://im.storm8.com/home.php"; }

if (game == "rl") {
document.location = "http://rl.storm8.com/home.php"; }

if (game == "vl") {
document.location = "http://vl.storm8.com/home.php"; }

if (game == "nl") {
document.location = "http://nl.storm8.com/home.php"; }

if (game == "kl") {
document.location = "http://kl.storm8.com/home.php"; }

if (game == "pl") {
document.location = "http://pl.storm8.com/home.php"; }

if (game == "zl") {
document.location = "http://zl.storm8.com/home.php"; }

if (game == "rol") {
document.location = "http://rol.storm8.com/home.php"; }