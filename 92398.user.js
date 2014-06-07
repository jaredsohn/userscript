// ==UserScript==
// @name           Twilight Heroes Plushies
// @description    Satan's thing, but with Felt molecules'
// @include        twilightheroes.com/
// ==/UserScript==

function stepToNextCombat() {
var searchy = find('.//td[contains(.,"Patrol again")]');
if (searchy != null) {
var linkk = find('.//a',searchy);
var strat = document.getElementById('Strat');
if(strat[strat.SelectedIndex])
GM_setValue('selectedStrat',strat[strat.SelectedIndex].value);
window.location = linkk;}
searchy = find('.//td[contains(.,"Back to inventory")]');
if (searchy != null)
{
GM_xmlhttpRequest({
method: "GET",
url: "http://www.twilightheroes.com/use.php",
headers: {"User-Agent": navigator.userAgent },
onload: function(r) {
var rsp = r.responseText;
var pat = /(use\.php\?which=1425&pwd=.{40,40})/; //replace 1425 with item number if not molecule
if (!r.responseXML)
r.responseXML = new DOMParser().parseFromString(rsp,"text/xml");
var cfv = pat(rsp);
window.location = cfv[1];}});
}
GM_setValue('roundNumber',-1);}

function endOfTurn() {
var searchy = find('.//td[contains(.,"Patrol again")]');
if (searchy != null) {
var linkk = find('.//a',searchy);
if (linkk != null) {
return true;}}
searchy = find('.//td[contains(.,"Back to inventory")]');
if(searchy != null)
{
return true;
}
return false;}