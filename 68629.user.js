// ==UserScript==
// @name           Kiss the Mortog Auto Player
// @description	   Plays Kiss the Mortog until desired amount reached.
// @author         Backslash
// @include        http://www.neopets.com/medieval/kissthemortog*
// ==/UserScript==


/* Notice this code actually isn't obfuscated. This is so you inspiring scripters can learn a thing or two from my scripts.
   I still however, request that you DO NOT directly steal code from my scripts!

This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

if (GM_getValue('play', '') == 'yes'){
playGame();
}
else
{
}

function buildLayout() {

if (document.body.innerHTML.match('Simply click on the Mortog')){

document.body.innerHTML = document.body.innerHTML.replace("<b>Kiss The Mortog</b>","<b>Kiss The Mortog Auto Player</b><div style=\"display:none;\">");

document.body.innerHTML = document.body.innerHTML.replace("<br><b>","</div><br><div style='text-align:center;border:1px solid grey;padding:10px;'>This autoplayer is brought to you by <a href=\"http://www.darkztar.com\">Backslash</a>.<HR noshade size=\"1\"><br>Wait Between Pages: <input type=text id='waitTime' value='"+GM_getValue('waitTime', '0')+"' size='3' /> <br>Stop When <select id=\"maxNP\"><option value=\"100\">100</option><option value=\"300\">300</option><option value=\"1,150\">1,150</option><option value=\"5,900\">5,900</option><option value=\"35,000\">35,000</option><option value=\"250,000\">250,000</option><option value=\"2,000,000\">2,000,000</option></select> NP is in the pot.<div id='saveButton'></div></div><br><br><center>");
}

if (document.body.innerHTML.match('Keep Going')){

document.body.innerHTML = document.body.innerHTML.replace("<b>Kiss The Mortog</b>","<b>Kiss The Mortog Auto Player</b><div style=\"display:none;\">");

document.body.innerHTML = document.body.innerHTML.replace("<br><b>","</div><br><div style='text-align:center;border:1px solid grey;padding:10px;'>This autoplayer is brought to you by <a href=\"http://www.darkztar.com\">Backslash</a>.<HR noshade size=\"1\"><br>Wait Between Pages: <input type=text id='waitTime' value='"+GM_getValue('waitTime', '0')+"' size='3' /> <br>Stop When <select id=\"maxNP\"><option value=\"100\">100</option><option value=\"300\">300</option><option value=\"1,150\">1,150</option><option value=\"5,900\">5,900</option><option value=\"35,000\">35,000</option><option value=\"250,000\">250,000</option><option value=\"2,000,000\">2,000,000</option></select> NP is in the pot.<div id='saveButton'></div></div><br><br><center>");
}

if (document.body.innerHTML.match('At least you only')){

document.body.innerHTML = document.body.innerHTML.replace("<b>Kiss The Mortog</b>","<b>Kiss The Mortog Auto Player</b><div style=\"display:none;\">");

document.body.innerHTML = document.body.innerHTML.replace("</b><br>","</b><br></div><br><div style='text-align:center;border:1px solid grey;padding:10px;'>This autoplayer is brought to you by <a href=\"http://www.darkztar.com\">Backslash</a>.<HR noshade size=\"1\"><br>Wait Between Pages: <input type=text id='waitTime' value='"+GM_getValue('waitTime', '0')+"' size='3' /> <br>Stop When <select id=\"maxNP\"><option value=\"100\">100</option><option value=\"300\">300</option><option value=\"1,150\">1,150</option><option value=\"5,900\">5,900</option><option value=\"35,000\">35,000</option><option value=\"250,000\">250,000</option><option value=\"2,000,000\">2,000,000</option></select> NP is in the pot.<div id='saveButton'></div></div><br><br><center>");
}

if (document.body.innerHTML.match('You have won')){

document.body.innerHTML = document.body.innerHTML.replace("<b>Kiss The Mortog</b>","<b>Kiss The Mortog Auto Player</b><div style=\"display:none;\">");

document.body.innerHTML = document.body.innerHTML.replace("<br><center><b>","</div><br><div style='text-align:center;border:1px solid grey;padding:10px;'>This autoplayer is brought to you by <a href=\"http://www.darkztar.com\">Backslash</a>.<HR noshade size=\"1\"><br>Wait Between Pages: <input type=text id='waitTime' value='"+GM_getValue('waitTime', '0')+"' size='3' /> <br>Stop When <select id=\"maxNP\"><option value=\"100\">100</option><option value=\"300\">300</option><option value=\"1,150\">1,150</option><option value=\"5,900\">5,900</option><option value=\"35,000\">35,000</option><option value=\"250,000\">250,000</option><option value=\"2,000,000\">2,000,000</option></select> NP is in the pot.<div id='saveButton'></div></div><br><br><center>");
}
document.getElementById('maxNP').selectedIndex = GM_getValue('sID','3');
}

function saveSettings()
{
GM_setValue('waitTime', document.getElementById('waitTime').value);
GM_setValue('maxNP', document.getElementById('maxNP').value);
var maximumNP = document.getElementById('maxNP').selectedIndex;

if (maximumNP == '0')
{
GM_setValue('maxNP','100');
GM_setValue('sID','0');
}

if (maximumNP == '1')
{
GM_setValue('maxNP','300');
GM_setValue('sID','1');
}

if (maximumNP == '2')
{
GM_setValue('maxNP','1,150');
GM_setValue('sID','2');
}

if (maximumNP == '3')
{
GM_setValue('maxNP','5,900');
GM_setValue('sID','3');
}

if (maximumNP == '4')
{
GM_setValue('maxNP','35,000');
GM_setValue('sID','4');
}

if (maximumNP == '5')
{
GM_setValue('maxNP','250,000');
GM_setValue('sID','5');
}

if (maximumNP == '6')
{
GM_setValue('maxNP','2,000,000');
GM_setValue('sID','6');
}

GM_setValue('play', 'no');
document.location = location.href;
}

function startClick() {
GM_setValue('play', 'yes');
playGame()
}

function stopClick() {
GM_setValue('play', 'no');
}



buildLayout();
var saveButton = document.createElement("div");
	saveButton.innerHTML = "<button style='width:200px;'>Save</button>";
	saveButton.addEventListener('click', saveSettings, false);
	saveButton.setAttribute("style", "text-align:center;margin-bottom:10px;");
	document.getElementById('saveButton').appendChild(saveButton);
	
	
	var start = document.createElement("button");
	start.innerHTML = "<b>START</b>";
	start.addEventListener('click', startClick, false);
	start.setAttribute("style", "width:100px;height:50px;color:green;");
	document.getElementById('saveButton').appendChild(start);
	
	var stop = document.createElement("button");
	stop.innerHTML = "<b>STOP</b>";
	stop.addEventListener('click', stopClick, false);
	stop.setAttribute("style", "width:100px;height:50px;color:red;");
	document.getElementById('saveButton').appendChild(stop);


function playGame() {
function delay() {
if(document.body.innerHTML.indexOf(GM_getValue('maxNP','5,900')+' NP') != -1){
document.forms[2].submit();
GM_setValue('play', 'no');
return
}
if(document.body.innerHTML.indexOf('Continue') != -1){
  var button = document.evaluate('//form[contains(@action,"kissthemortog.phtml")]/input[@type = "submit" and @value = "Continue"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}
if (document.body.innerHTML.indexOf('Try again...') != -1){
  var button = document.evaluate('//form[contains(@action,"kissthemortog.phtml")]/input[@type = "submit" and @value = "Try again..."]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if (document.body.innerHTML.indexOf('Select your Mortog') != -1){
var links = document.evaluate("//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; ++i)
{
    flip = links.snapshotItem(i);

    if (flip.href.match('kissthemortog.phtml.type=frogprince&num=1'))
    {
	document.location=flip.href;						
	return;
    }
}
}
}
window.setTimeout(delay, GM_getValue('waitTime', '0'))
}
