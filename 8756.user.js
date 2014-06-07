if (location.href.indexOf('collect') != -1)
 {
gobut = document.createElement('input');
gobut.type = 'button';
gobut.id = 'gobut';
gobut.setAttribute('onclick', 'location.href="http://www.neopets.com/games/pyramids/pyramids.phtml"');
document.body.appendChild(gobut);
document.getElementById('gobut').click();
 }

var board = document.getElementsByTagName('table')[8]; // table containing the game
var cur = board.getElementsByTagName('img')[1].src.split('mcards/')[1].split('_')[0] * 1; // current card to play on
var face = new Array(); // array that will contain information about the playable cards
var vis = new Array();

for (x = 2; x < board.getElementsByTagName('img').length; x++)
 {
if (board.getElementsByTagName('img')[x].src.indexOf('pyramid') == -1 && board.getElementsByTagName('img')[x].src.indexOf('blank') == -1)
 {
face[face.length] = board.getElementsByTagName('img')[x].src.split('mcards/')[1].split('_')[0] * 1;
vis[vis.length] = board.getElementsByTagName('img')[x].src.split('mcards/')[1].split('.gif')[0];
 }
 }

for (x = 0; x < face.length; x++)
 {
if (face[x] == cur - 1 || face[x] == cur + 1 || face[x] == cur - 12 || face[x] == cur + 12)
 {
clickCard(vis[x]);
end;
 }
 }

function clickCard(w)
 {
for (x = 0; x < board.getElementsByTagName('img').length; x++)
 {
if (board.getElementsByTagName('img')[x].src.indexOf(w) != -1)
 {
gobut = document.createElement('input');
gobut.type = 'button';
gobut.id = 'gobut';
gobut.setAttribute('onclick', 'location.href="' + board.getElementsByTagName('img')[x].parentNode.href + '"');
document.body.appendChild(gobut);
document.getElementById('gobut').click();
 }
 }
 }

if (document.body.innerHTML.indexOf('Collect Points') == -1)
 {
gobut = document.createElement('input');
gobut.type = 'button';
gobut.id = 'gobut';
gobut.setAttribute('onclick', 'location.href="http://www.neopets.com/games/pyramids/pyramids.phtml?action=draw"');
document.body.appendChild(gobut);
document.getElementById('gobut').click();
 }
else
 {
gobut = document.createElement('input');
gobut.type = 'button';
gobut.id = 'gobut';
gobut.setAttribute('onclick', 'location.href="http://www.neopets.com/games/pyramids/pyramids.phtml?action=collect"');
document.body.appendChild(gobut);
document.getElementById('gobut').click();
 }