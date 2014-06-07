// ==UserScript==
// @name           Travian TroopSaver
// @namespace      travian_troop_saver
// @author         x3ak
// @email          pavel.galaton@gmail.com
// @description    Save/Delete button's added at troops send page. 
// @version        0.1.6a
// @include        http://*.travian.*/a2b.php*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://x3akscripts.googlecode.com/files/jQuery.JSON.min.js
// @exclude        http://forum.travian.*
// ==/UserScript==


var version = '0.1.6a';

var TroopConf = {villID:0,troops:[],attackType:0,villName:'',coords:{x:0,y:0}};
var Village = {
	villID:0,
	getID:function() {
		if(this.villID == 0)
			this.villID = Number(window.location.search.substring(3));

		return this.villID;
	}
};
var Troops = {
	isTroopsPage : function() {
		return (window.location.pathname == '/a2b.php' && window.location.search.indexOf( '?z=' ) > -1);
	},
	GUI : {
		addButtons: function () {
			$('<div id="x3_saved_msg" style="color: #666;font-size: 11px;"></div>').insertAfter("#btn_ok");
			this.addSaveBtn();
		},
		addSaveBtn: function () {
			var btn_obj = $('<input type="image" alt="" class="dynamic_img btn_effects" src="img/x.gif" name="s1" id="btn_save" style="margin-left: 7px;"/>');
			btn_obj.insertAfter("#btn_ok");
			btn_obj.bind('click',     function(){  return Troops.storeData();  });
			this.bindEffects(btn_obj);
		},
		addDeleteBtn: function () {
			if($("#btn_delete").length > 0) return;
			var btn_obj = $('<input type="image" alt="" class="dynamic_img btn_effects" src="img/x.gif" name="del" id="btn_delete" style="margin-left: 7px;"/>');
			btn_obj.insertAfter("#btn_save");
			btn_obj.bind('click',     function(){ return Troops.deleteTroop();  });
			this.bindEffects(btn_obj);
		},
		bindEffects: function (objToBindAt) {
			objToBindAt.bind('mouseover', function(){ $(this).toggleClass( 'over' );    });
			objToBindAt.bind('mousedown', function(){ $(this).addClass( 'clicked' );    });
			objToBindAt.bind('mouseup',   function(){ $(this).removeClass( 'clicked' ); });
			objToBindAt.bind('mouseout',  function(){ $(this).removeClass( 'clicked' ); $(this).removeClass( 'over' );});
		}
	},
	loadTroop: function () {
		var villId = Village.getID();
		if(GM_getValue('x3_troops_'+villId) != undefined) {
			var troopObj = $.parseJSON(GM_getValue('x3_troops_'+villId));
			
			for(var i=1;i<11;i++)
				$('form[name="snd"] #troops input[name="t'+i+'"]').val(troopObj.troops[i-1]);
			
			$('form[name="snd"] #coords .sel input.radio[value="'+troopObj.attackType+'"]')[0].checked=true;
			$('form[name="snd"] #coords .target input[name="x"]').val(troopObj.coords.x);
			$('form[name="snd"] #coords .target input[name="y"]').val(troopObj.coords.y);
			$('form[name="snd"] #coords .vil input[name="dname"]').val(troopObj.villName);
			this.GUI.addDeleteBtn();
		}
	},
	deleteTroop: function () {
		var villId = Village.getID();
		GM_deleteValue('x3_troops_'+villId);
		$('#x3_saved_msg').html("<i>Troop configuration was deleted, refreshing...</i>");
		window.location = window.location;
		return false;
	},
	collectData: function () {
		for(var i=1;i<11;i++)
			TroopConf.troops.push(Number($('form[name="snd"] #troops input[name="t'+i+'"]').val()));
		
		TroopConf.villID = Village.getID();
		TroopConf.attackType = Number($('form[name="snd"] #coords .sel input.radio[name="c"]:checked').val());
		TroopConf.coords.x   = Number($('form[name="snd"] #coords .target input[name="x"]').val());
		TroopConf.coords.y   = Number($('form[name="snd"] #coords .target input[name="y"]').val());
		TroopConf.villName   = String($('form[name="snd"] #coords .vil input[name="dname"]').val());
		return TroopConf;
	},
	storeData: function () {
		var objToSave = this.collectData();
		GM_setValue('x3_troops_'+objToSave.villID,$.toJSON(objToSave));
		$('#x3_saved_msg').html("<i>Troop configuration was saved!</i>");
		this.GUI.addDeleteBtn();
		return false;
	}
};

$(document).ready(function() {
	try {
		if(Troops.isTroopsPage()) {
			Troops.GUI.addButtons();
			Troops.loadTroop();
		}
	} catch (e) {
		console.log(e);
	}
});