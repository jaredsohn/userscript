// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Simple eCritters Eemail Tools
// @namespace tag:JGunter1992@gmail.com,2006-03-08 
// @description    Highlight or block eemails by certain users (eCritters.biz eemail). Not very well done.
// @include        http://ecritters.biz/eemail.php*
// ==/UserScript==

(function ()
{
	var hide = new Array();
	/********************************
	* List here the ids of users by whom you wish not to see eemails.
	* EXAMPLE:
	*  hide[28] = 1;	// Hide eemails by General Wesc (user id 28).
	*
	* Below is a working example that won't hurt anything because the user
	* id does not (and cannot) exist:
	********************************/
	hide[0] = 1;	// 0:[Not a real user]
	//hide[28] = 1;	// 28:General Wesc

	var background_change = new Array();
	/****************************************************************
	* List here the ids of user whose topics you want recoloured.
	* EXAMPLE:
	*  background_change[28] = 'red';	// Colour eemails by General Wesc.
	* Here's a working example that won't hurt anything because the user
	* id does not (and cannot) exist:
	****************************************************************/
background_change[0] = '#000000';// 0:[Not a real user]/ #000000 (Black)
background_change[0] ='#000000';// 0:[Not a real user]/ #000000 (Black)
background_change[28] ="#6A5ACD";// 28:General Wesc (user id 28) / #6A5ACD (purple)
background_change[4990]="#808080";// 4990:rad / #808080 (gray)	
background_change[519] ="#FFA500";// 519:Draega	/ #FFA500 (Orange)
background_change[3] ="#fffcc0";// 3:eurleif / #? (Peach)
background_change[21380] = "#FF0000";// 21380:AaronW / #FF0000 (red)
background_change[26825]="#0000ff";// 26825:Spirit of Death / #0000ff(Blue)
background_change[3333] = "#00008B";// 3333:moosh / #00008B (Dark Blue)
background_change[24944] = "#DC143C";// 24944:quait / #DC143C (crimsom)
background_change[2026] = "#32CD32";// 2026:nerdzrool / #32CD32 (green)
background_change[14795] = "#228B22";// 14795:Max / #228B22 (green)		

var trNodeList = document.evaluate('//tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < trNodeList.snapshotLength; i++)
	{
		var tr = trNodeList.snapshotItem(i);
		var s = tr.innerHTML;
		var tds = s.split("<td");
		if(tds.length == 3)
		{
s = tds[2].replace(/.*userlookup.php.user=([0-9]*)" style="text-decoration: none;.*/g, "$1");
s = s.replace(/\n/, "");
			if(hide[s])
			{
				//GM_log('Hid eemail by ' + s);
				tr.style.display = 'none';
			}
			else if(background_change[s] != undefined)
			{
				//GM_log('Changed background of eemail by ' + s);
				tr.style.background = background_change[s];
			}
			// Uncomment the following line to colour all eemails, based on user id;
			// tr.style.background = '#' + GM_LKBM_d2h(parseInt('FFFFFF', 16) - s);
		}
	}

})();

function GM_LKBM_d2h(d)
{
	var hD="0123456789ABCDEF";
	var h = hD.substr(d&15,1);
	while(d>15)
	{
		d>>=3;
		h=hD.substr(d&15,1) + h;
	}
	return h;
}

