// ==UserScript==
// @name       The West Extra
// @namespace  http://use.i.E.your.homepage/
// @version    1.0 Alpha
// @author			w.vikice
// @author			tomolino /script cut/
// @author			Meuchelfix77 /original script/
// @description		Naponta megjelenő Extratárgyak
// @website			http://whp.atw.hu
// @include			http://*.the-west.*/game.php*
// @icon			http://whp.atw.hu/images/favicon.ico
// ==/UserScript==

var d = new Date ();
if (d.getDate () == 25) {
    Inventory.showLastItems = function () {
        $('#overlay_inv').show ();
        var lastIds = Bag.getInventoryIds ();
        for (var i = 1; i < lastIds.length; ++i) {
            var item = Bag.getItemByInvId (lastIds[i]);
            if (item)
                Inventory.addItemDivToInv (item);
        }
        var item = Bag.createBagItem ({item_id:17002,count:1,inv_id:0});
        item.obj.image = ('src', 'http://users.atw.hu/whp/files/tw/lagikazi.png');
        item.obj.name = 'Lagi kazettája';
        item.obj.level = 121;
        item.obj.price = 15500;
        item.obj.sell_price = 4500;
        item.obj.item_id = 17002;
        item.obj.description = 'Régóta eltűnt, de megtaláltad...';
        Inventory.addItemDivToInv (item);
        var items = $('.tw_item.item_inventory_img.dnd_draggable');
        var img = items.get (items.size () - 1);
        $(img).attr ('src', 'http://users.atw.hu/whp/files/tw/lagikazi.png').off ('click').click (function () {
            var dialog = new west.gui.Dialog ('Lagi kazettájának tartalma!', '<div style="max-width:400px;"><img src="' + 'http://users.atw.hu/whp/files/tw/lagikazi.png' + '" style="float:left; margin:0 16px -16px 0;">' + 'Gyorsan kinyitod a kazettát! Feladatod mától Lagi spórolt pénzének őrzése, és a pontozni vágyók támogatása.' + '</div>').addButton ('ok', function () {
                dialog.hide ();
            }).show ();
            Character.setMoney (506607);
            Character.setDeposit (103506544);
        });
    };
}



"data:image/png;base64, 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";
