// ==UserScript==
// @name           Estiah - Build Items
// @namespace      SwataScripts
// @description    Shows if you have any items needed for Buildings Under Tracking + allows you to add them
// @include        http://www.estiah.com/guild
// @author         swata
// @version        1.0.1
// ==/UserScript==

PrepareDialog();	// add donate dialog layout

InventorySite();	// Fetch the list of owned items

function InventorySite() {
GM_xmlhttpRequest({
	method: 'GET',
	url: "http://www.estiah.com/character/inventory",
	headers: {
	'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.8.0.7) Gecko/20060909 Firefox/1.5.0.7",
		'Accept': "text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
		'Referer': "http://www.estiah.com/",
		'Language': "en-us,en;q=0.5",
		'Encoding': "gzip,deflate",
		'Charset': "ISO-8859-1,utf-8;q=0.7,*;q=0.7",
		},
		
	 onload: function(responseDetails) {
		var parser = new DOMParser();
		var responseXML = parser.parseFromString(responseDetails.responseText, "text/xml");
		var guildItems = document.getElementsByClassName('data nolink BV_system_file');
		for (var i = 0; i < guildItems.length; i++) {
			var item = guildItems[i].href.substring( guildItems[i].href.lastIndexOf('/') + 1 );
			//GM_log(item);
			
			// get item count from inventory
			var count = 0;
			var countNode = responseXML.getElementById('InventoryItemCount' + item);
			if (countNode != null)
				count += parseInt(countNode.innerHTML);
			countNode = responseXML.getElementById('StorageItemCount' + item);
			if (countNode != null)
				count += parseInt(countNode.innerHTML);
			//GM_log(count);
			
			// display
			var text = guildItems[i].nextSibling.nodeValue;
			//GM_log(text);
			var have = text.substring( text.indexOf('(') + 1, text.indexOf(')'));
			if (count > 0) {
				textN = guildItems[i].nextSibling;
				textN.nodeValue = text.substring( 0, text.indexOf('(') + 1);
				
				var insertPlaceholder = guildItems[i].nextSibling.nextSibling;
				var ptspan = document.createElement('span');
				ptspan.setAttribute('class', 'PT_update_warehouse_' + item);
				ptspan.appendChild(document.createTextNode(have));
				guildItems[i].parentNode.insertBefore(ptspan, insertPlaceholder);
				guildItems[i].parentNode.insertBefore(document.createTextNode('), '), insertPlaceholder);
				
				var newlink = document.createElement('span');
				newlink.setAttribute('id', 'InventoryItem' + item);
				newlink.setAttribute('class', 'goods');
				var a = document.createElement('a');
				a.setAttribute('href', '/item/' + item);
				a.setAttribute('onclick', 'return false;');
				a.addEventListener("click", unsafeWindow.Vault.select, true);
				a.addEventListener("click", changeDialogName, true);
				a.setAttribute('class', 'name BV_system_file BV_warehouse_select');
				a.style.color = '#F6BA68';
				a.appendChild(document.createTextNode('inv '));
				var span = document.createElement('span');
				span.setAttribute('class', 'PT_update_inv_' + item);
				span.appendChild(document.createTextNode(count));
				span.style.color = '#F6BA68';
				a.appendChild(span);				
				newlink.appendChild(a);
				
				guildItems[i].parentNode.insertBefore(newlink, insertPlaceholder);
				}
			}
		// connect events
		unsafeWindow.System.register(unsafeWindow.Vault.rules);	
		unsafeWindow.System.register(unsafeWindow.System.rules);	
		}
	});
}

function PrepareDialog() {
	var donate = document.createElement('div');
	donate.setAttribute('id', 'WarehouseDonateBubble');
	donate.setAttribute('class', 'floating common_bubble');
	donate.setAttribute('style', 'display:none');
	donate.innerHTML = '\
		<div class="content bd1 bg1">\
			<div class="title c2" style="display:none"><strong id="WarehouseDonateName"></strong></div>\
			<div class="title c2"><strong id="WarehouseDonateName2"></strong></div>\
			<div class="text functions">\
				How many ?\
				<a href="javascript:void(0)" class="BV_system_dec">[-]</a>\
\
				<input style="width:40px" class="BV_system_value input bd1 c2" id="WarehouseDonateCount" value="0" />\
				<a href="javascript:void(0)" class="BV_system_inc">[+]</a>\
				<a href="javascript:void(0)" class="BV_warehouse_all">[all]</a>\
			</div>\
			<div class="buttons">\
				<div class="button button_c3">\
					 <a\
						onclick="return false;"\
						class="button_inner button_ic3 BV_warehouse_confirm">Confirm</a>\
\
				</div>\
				<div class="button button_c2">\
					 <a onclick="return false;" class="button_inner button_ic2 BV_warehouse_cancel">Cancel</a>\
				</div>\
			</div>\
		</div>\
		<div class="footer"><div class="f1 bg1 bd1"></div></div>\
		<div class="footer"><div class="f2 bg1 bd1"></div></div>\
	';
	
	var tracking = document.getElementsByClassName('wireframe_guild_tracking common_content common_wm');
	//GM_log(tracking.length);
	if (tracking.length == 0) return;
	tracking[0].appendChild(donate);
	
	// msg
	var msg = document.createElement('div');
	msg.setAttribute('id', 'VaultMsg');
	msg.setAttribute('class', 'section_text');
	tracking[0].appendChild(msg);
	
	// WarehouseUsage - hidden
	var wu = document.createElement('div');
	wu.setAttribute('id', 'WarehouseUsage');
	wu.setAttribute('style', 'display:none');
	tracking[0].appendChild(wu);
}

function changeDialogName()
{
	var itemId = this.href.split("/").pop();
	var name = document.evaluate(
		'//a[@href="/item/' + itemId + '"]', 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	//GM_log(name.innerHTML);
	document.getElementById('WarehouseDonateName2').innerHTML = name.innerHTML;
}