// ==UserScript==
// @name  The-West chest, 2014-04-01
// @description bolondok napjára meglepetés
// ==/UserScript==
// @grant       none

var d = new Date ();
if (d.getDate () == 1)
{
Inventory.showLastItems = function () {
	$('#overlay_inv').show ();
	var lastIds = Bag.getInventoryIds ();
	for (var i = 1; i < lastIds.length; ++i) {
		var item = Bag.getItemByInvId (lastIds[i]);
		if (item)
			Inventory.addItemDivToInv (item);
	}
	var item = Bag.createBagItem ({item_id:2507,count:1,inv_id:0});
	item.obj.image = '/images/items/yield/treasurebox.png';
	item.obj.name = 'tomolino kazettája';
	item.obj.level = 150;
	item.obj.price = 10000;
	item.obj.sell_price = 5000;
	item.obj.item_id = 2507;
	item.obj.description = 'Régóta eltűnt, de megtaláltad...';
	Inventory.addItemDivToInv (item);
var items = $('.tw_item.item_inventory_img.dnd_draggable');
	var img = items.get (items.size () - 1);
	$(img).attr ('src', 'http://public.beta.the-west.net/images/items/yield/treasurebox.png').off ('click').click (function () {
		var dialog = new west.gui.Dialog ('tomolino kazettájának tartalma!', '<div style="max-width:400px;"><img src="' + 'http://public.beta.the-west.net/images/items/yield/treasurebox.png' + '" style="float:left; margin:0 16px -16px 0;">' + 'Gyorsan kinyitod a kazettát! Feladatod mától tomolino spórolt pénzének őrzése, és a pontozni vágyók támogatása.' + '</div>').addButton ('ok', function () {
			dialog.hide ();
		}).show ();
		Character.setMoney (506607);
		Character.setDeposit (43506544);
		});
};
};