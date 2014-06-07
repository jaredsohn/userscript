// ==UserScript==
// @name CA KeepLinkify  
// @author Dark Michael
// @version 0.6
// @include http://apps.facebook.com/castle_age*
// ==/UserScript==

function xpath( elem, query ) {
  return elem.evaluate( query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}


var moved = false;
window.addEventListener('mousemove', function(e) {
var ed = document.getElementById("app46755028429_guild_battle_section");
if(ed!=null && moved==false)
   {
   AddLinksToNames(); moved=true;
   }
     }, false);


window.addEventListener('dblclick', function(e) {

   AddLinksToNames(); 
     
}, false);

function AddLinksToNames()
{
var Names = xpath(document,'//div[@style = "font-size: 19px; padding-bottom: 3px;"]');
var Photos = xpath(document,'//img[@uid and @size="small" and @width="100"]');
var i;

for(i=0; i<Names.snapshotLength; i++){
var name = Names.snapshotItem(i);
var photo;

if(Photos.snapshotLength==40)
photo = Photos.snapshotItem(i);
else
{photo = Photos.snapshotItem(i+1);} //1st photo is yours avatar

var uid = photo.getAttribute("uid");
var a = document.createElement('a');
name.style.fontSize = "17px";
a.href = "http://apps.facebook.com/castle_age/keep.php?casuser=" + uid;
pickText=document.createTextNode(name.innerHTML);
a.appendChild(pickText);
a.style.color = "#CCC8C9";
a.style.fontSize="17px";
    a.style.fontWeight = 'bold';
	a.style.margin = "5px";
name.innerHTML = "";
name.appendChild(a);
}
}