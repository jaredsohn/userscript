// ==UserScript==
// @name           Neopets : Shops : Smart Block
// @namespace      http://www.gamingire.com/
// @author         Backslash
// @description    Hides items that are not in the restock list
// @include        http://www.neopets.com*
// ==/UserScript==
var layout = '\
<div class="contentModule" style="height: 100%"><table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable">\
				<tr>\
					<td class="contentModuleHeader"> Smart Block</td>\
				</tr>\
				<tr>\
					<td align="left" valign="top" class="contentModuleContent">\
						<div align="center">\
						<input type="checkbox" name="team" id="team" value="team" '+GM_getValue('team', 'true')+'> <label for="team">Use the Smart Block Feature</label><br>\
						<div id="rsList" style="">Enter a list of items that you don\'t want the script to block.<br><textarea id="listBox" style="width:80%;height:125px;">'+GM_getValue('rsList', 'No Items Listed')+'</textarea><br><Br></div><button id="saveButton">Save Settings</button>\
						</div><br />\
					</td>\
				</tr></table></div>\
';
document.body.innerHTML = document.body.innerHTML.replace('<td align="left" valign="top" width="304">', '<td align="left" valign="top" width="304">'+layout);

document.getElementById('team').addEventListener('click', sBlockClick, false);
function sBlockClick()
{
if (document.getElementById('team').checked == true)
{
document.getElementById('rsList').setAttribute("style", "");
}
else
{
document.getElementById('rsList').setAttribute("style", "display:none;");
}
}

document.getElementById('saveButton').addEventListener('click', saveSettings, false);

function saveSettings()
{
GM_setValue('rsList', document.getElementById('listBox').value);

	if (document.getElementById('team').checked == true) {
		GM_setValue('team', 'checked');
	} else {
		GM_setValue('team', '0');
	}

window.location.reload();
}

function GetBetween(zStr, zStart, zEnd, zPos) {
    var z1 = zStr.indexOf(zStart, (zPos === undefined ? 0 : zPos)); var z2 = zStr.indexOf(zEnd, z1);
    return z2 > z1 && z1 > -1 ? zStr.substring(z1 + zStart.length, z2) : '';
}


function AdBlock(c){
 a = document.evaluate("//table[@align = 'center' and @cellpadding = '4']/tbody//td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 b = a.snapshotLength;
 h = new Array();
 if(b > 0){
  hiddenItems = document.evaluate("//table[@align = 'center' and @cellpadding = '4']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).innerHTML;
  for(i=0; i<b; i++){
   if(a.snapshotItem(i).getElementsByTagName('a')[0].getAttribute("onclick") != null){
    itemName = GetBetween(a.snapshotItem(i).getElementsByTagName('a')[0].getAttribute("onclick"), "you wish to purchase ", " at ");
    for(j=0; j<c.length; j++){
     if(c[j].toLowerCase() == itemName.toLowerCase()){
      h.push(a.snapshotItem(i));
      break;
     }
    }
    a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i));
   }
  }
  if(h.length >0){
   for(i=0; i<(h.length/6)+1; i++){
    f = document.evaluate("//table[@align = 'center' and @cellpadding = '4']/tbody/tr",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(i);
    for(j=0; j<6 ; j++){
     if(typeof h[0] != 'undefined'){
      f.appendChild(h[0]);
      h.splice(0,1);
     }
    }
   }
  }
  document.evaluate("//td[@class = 'contentModuleHeader']/b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).innerHTML = "Shop Inventory currently contains <b><font color=#3BB9FF>" + b + "</font></b> items (click <u><div style='cursor:pointer; display:inline;' id='hiddenItems'>here</div></u> to view full shop stock)";
  document.getElementById('hiddenItems').addEventListener('click',function(){document.evaluate("//table[@align = 'center' and @cellpadding = '4']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).innerHTML = hiddenItems;},false);
 }
}

if(GM_getValue('team', 'true') == "checked")
{
var items = GM_getValue('rsList').split('\n');
AdBlock(items);
}
else
{
}