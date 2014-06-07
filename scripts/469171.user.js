// ==UserScript==
// @name        [743049] Quick Link Bar
// @namespace   http://www.torn.com/profiles.php?XID=743049
// @description Adds a bar at top of screen to quickly perform multiple actions. This is in ALPHA Stage. Expect bugs. Expect issues.
// @updateURL   http://userscripts.org/scripts/source/469171.user.js
// @include     https://www.torn.com/*
// @include     http://www.torn.com/*
// @version     0.0.1
// @grant       none
// ==/UserScript==
var storage = localStorage;
function AddHotBar() {
	if ($('#XORScriptQuickLinkBar').length == 0 && (top === self)) {
		// Prevent iFrames ^
		// Add our custom CSS Styles.
		$('head').append($(document.createElement('style')).attr('id','XORScriptQuickLinkBarCSS'));
		
		$('#XORScriptQuickLinkBarCSS').append(".QLB_Button { font-size:14px; font-weight:bold; color:#333333; height:22px; font-family:helvetica,arial, geneva, sans-serif; line-height:20px; text-align:center; background-color:#b7b7b7; background:url(images/linear_bg_2.png); background-repeat:repeat-x; background:-moz-linear-gradient(100% 100% 90deg, #b7b7b7, #dddddd); -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px; border:1px solid #b0b0b0; text-decoration:none; padding:3px 7px; margin:0 3px 0px 6px; display:inline-block; _display:inline; cursor:pointer; }\n");
		$('#XORScriptQuickLinkBarCSS').append(".QLB_Button:hover { border:1px solid #818181; text-decoration:none; }\n");
		
		$('#XORScriptQuickLinkBarCSS').append("#XORScriptQLB_Menu { display:block; margin:0; padding:0; position:absolute; list-style:none; }\n");
		$('#XORScriptQuickLinkBarCSS').append("#XORScriptQLB_Menu li { padding:3px; background:#efefef; border:1px solid #9d9d9d; border-bottom:0; width:180px; }\n");
		$('#XORScriptQuickLinkBarCSS').append("#XORScriptQLB_Menu li ul { display:none; list-style:none; margin:0 0 0 183px; padding:0; position:absolute; top:0; }\n");
		$('#XORScriptQuickLinkBarCSS').append("#XORScriptQLB_Menu li:hover { background:#dedede; }\n");
		$('#XORScriptQuickLinkBarCSS').append("#XORScriptQLB_Menu li:last-child { border-bottom:1px solid #9d9d9d; }\n");
		$('#XORScriptQuickLinkBarCSS').append("#XORScriptQLB_Menu, #XORScriptQLB_Menu * { cursor:pointer; z-index:9001; }\n");
		
		var btop = $(document.createElement('div')).css({
			'width':'100%',
			'height':'3px',
			'margin-top':'10px',
			'background':'url(data:image/png;base64,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)'
		});
		var bbot = $(document.createElement('div')).css({
			'width':'100%',
			'height':'3px',
			'clear':'both',
			'background':'url(data:image/png;base64,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)'
		});
		var bmid = $(document.createElement('div')).css({'width':'100%','height':'30px','background':'#6c6c6c','padding':'3px 0'}).attr({'id':'XORScriptQuickLinkBar'});
		var badd = $(document.createElement('span')).text('[ + ]').click(function () {
			showAddMenu();
		}).attr({'id':'XORScriptQLB_MB','class':'QLB_Button'});
		if ($('#announceWrapper').length > 0) {
			$('#announceWrapper').after(bbot).after(bmid.append(badd)).after(btop);
		} else {
			$('#banner').next().after(bbot).after(bmid.append(badd)).after(btop);
		} /* If the announcement bar is shown - put the QLB beneath that. Otherwise, drop it below the banner! */
	
	
		
		// Add our buttons!
		loadSavedButtons();
	}
}
function showAddMenu () {
	if ($('#XORScriptQLB_Menu').length < 1) {
		// Find our Menu Button. This is where we will make the menu appear.
		var offset = $('#XORScriptQLB_MB').position().top;  // int
			offset += $('#XORScriptQLB_MB').height(); //int
			offset += parseInt($('#XORScriptQLB_MB').css('padding-top').replace(/[^0-9]/g,''));
			offset += parseInt($('#XORScriptQLB_MB').css('padding-bottom').replace(/[^0-9]/g,''));
		
		// Make the main menu start to happen!
		var menu = $(document.createElement('ul')).css({
			'top': offset,
			'left':parseInt($('#XORScriptQLB_MB').position().left + 6) + "px"
		}).attr({'id':'XORScriptQLB_Menu'});
		
		// Add random links: One for XOR, another for PG.
		var _r = Math.floor(Math.random()*3);
		if (_r < 2) {
			var _r_link = $(document.createElement('li')).text('Developer: XOR').css('font-weight','bold').click(function () { window.location = "//www.torn.com/profiles.php?XID=743049"; });
		} else {
			var _r_link = $(document.createElement('li')).text('#PlayGround IRC Rawkz!').css('font-weight','bold').click(function () { window.location = "//www.torn.com/profiles.php?XID=1175219"; });
		}
		// Add all the links!
		$(menu).append($(document.createElement('li'))
			.hover(function () {addMenuItems(this,1);})
			.text('Add Item Market')
			.attr('id','XORScriptQLB_IMList')
		).append($(document.createElement('li'))
			.hover(function () {addMenuItems(this,2);})
			.text('Add Quick Buy')
			.attr('id','XORScriptQLB_AQB')
		).append($(document.createElement('li')).text('Add Quick Use').attr('id','XORScriptQLB_QUB').hover(function () {addMenuItems(this,3);})
		).append($(document.createElement('li')).text('Add Quick Fly').attr('id','XORScriptQLB_QFB')
			.append($(document.createElement('ul'))
				.append($(document.createElement('li')).text('Torn'))
				.append($(document.createElement('li')).text('Standard').append($(document.createElement('ul'))))
				.append($(document.createElement('li')).text('Airstrip').append($(document.createElement('ul'))))
				.append($(document.createElement('li')).text('Private').append($(document.createElement('ul'))))
				.append($(document.createElement('li')).text('Business').append($(document.createElement('ul'))))
			)
			.hover(function () {addMenuItems(this,4);})
		
		).append($(document.createElement('li')).text('Add Quick Vault').attr('id','XORScriptQLB_AQV').hover(function () {addMenuItems(this,5);})
		).append(_r_link
		).append($(document.createElement('li')).text('Change Button Text').hover(function () {addMenuItems(this,998);})
		).append($(document.createElement('li')).text('Remove Button').hover(function () {addMenuItems(this,999);})
		);
		$('body').append(menu);
		fixMenuLayout();
	} else {
		// The menu is already showing. Let's hide it.
		$('#XORScriptQLB_Menu').fadeOut('slow',function () { $(this).remove(); });
	}

}
function fixMenuLayout() {
// Force all UL to be hidden
		$('#XORScriptQLB_Menu ul').css({'display':'none'});
		// Force all LI to show their sub-menu on hover
		$('#XORScriptQLB_Menu li').hover(function(){
			$('> ul',this).css({'display':'block','top':$(this).position().top});
		},function(){
			$('> ul',this).css({'display':'none'});
		});
		$('#XORScriptQLB_Menu > li').hover(function(){},function(){
			//$('> ul',this).remove();
		});
}
function addMenuItems(menu_item,menu_id) {
	var menu = $('#XORScriptQLB_IMList');
	if (menu_id == 1) {
		if ($('#XORScriptQLB_IMList > ul').length == 0) {
			$('#XORScriptQLB_IMList ').append($(document.createElement('ul')));
		} else {
			$('#XORScriptQLB_IMList > ul').empty();
		}
		var last = "";
		for (var prop in allitems) {
			if (isNumber(allitems[prop][0])) {
				// Add the items to the last UL.
				$('#XORScriptQLB_IMList ul li:contains("'+last+'") > ul').append($(document.createElement('li')).text(allitems[prop][1]).attr('id','si_'+allitems[prop][0]).click(function () { 
					saveButton('Shop: '+$(this).text(),'goToMarket('+$(this).attr('id').split('_')[1]+');');
				}));
			} else {
				// Make the UL...
				last = allitems[prop][1];
				$('#XORScriptQLB_IMList > ul').append($(document.createElement('li')).text(last).append($(document.createElement('ul'))));
			}
		}
	}
	else if (menu_id == 2) {
		// Quick Buy
		if ($('#XORScriptQLB_AQB > ul').length == 0) {
			$('#XORScriptQLB_AQB ').append($(document.createElement('ul')));
		} else {
			$('#XORScriptQLB_AQB > ul').empty();
		}
		$('#XORScriptQLB_AQB > ul').append($(document.createElement('li')).text('Torn').append($(document.createElement('ul'))));
		// Add all the TC shops Items
		for (var i=0; i<tcshops.data.length; i++) {
			var shop = tcshops.data[i];
			var shopmenu = $(document.createElement('li')).text(shop[0]).append($(document.createElement('ul')));
			for (var j=0; j<shop[2].length; j++) {
				var itm = readAllItems(shop[2][j]);
				$('ul',shopmenu).append($(document.createElement('li')).text(itm[1]).attr('iid',itm[0]).click(function () {
					var itemid = $(this).attr('iid');
					var name = $(this).text();
					var qty = prompt("Please enter how many " + name + " you would like to buy:").replace(/[^0-9]/g,'');
					while (qty == "") {
						qty = prompt("An error occured. You must type a number.\n\nPlease enter how many " + $(this).text() + " you would like to buy:").replace(/[^0-9]/g,'');
					}
					saveButton('Buy: '+ qty +'x '+name,'buyItem('+itemid+','+qty+');');
				}));
			}
			$('#XORScriptQLB_AQB > ul:eq(0) li:eq(0) > ul').append(shopmenu);
		}
		// Add all the country items
		for (var i=0; i<flyingdata.data.length; i++) {
			var cntry = flyingdata.data[i];
			var countrymenu = $(document.createElement('li')).text(cntry[1]).append($(document.createElement('ul')));
			for (var j=0; j<cntry[3].length; j++) {
				var itm = readAllItems(cntry[3][j]);
				$('ul',countrymenu).append($(document.createElement('li')).text(itm[1]).attr('iid',itm[0]).click(function () {
					var itemid = $(this).attr('iid');
					var name = $(this).text();
					var qty = prompt("Please enter how many " + name + " you would like to buy:").replace(/[^0-9]/g,'');
					while (qty == "") {
						qty = prompt("An error occured. You must type a number.\n\nPlease enter how many " + $(this).text() + " you would like to buy:").replace(/[^0-9]/g,'');
					}
					saveButton('Buy: '+ qty +'x '+name,'buyItem('+itemid+','+qty+');');
				}));
			}
			$('#XORScriptQLB_AQB > ul').append(countrymenu);
		}
	}
	else if (menu_id == 3) {
		// Add Quick Use
		if ($('#XORScriptQLB_QUB > ul').length == 0) {
			$('#XORScriptQLB_QUB ').append($(document.createElement('ul')));
		} else {
			$('#XORScriptQLB_QUB > ul').empty();
		}
		$('#XORScriptQLB_QUB > ul').append($(document.createElement('li')).text('Loading Items. Please wait.'));
		$.get('/item.php', function (html) {
			if (html.indexOf("<h1>Items</h1>") === -1) {
				$('#XORScriptQLB_QUB > ul').empty().append($(document.createElement('li')).text('Error: Be In Torn'));;
				showNotification("Please make sure you are in Torn for this menu item!");
			} else {
				$('#XORScriptQLB_QUB > ul').append($(document.createElement('li')).text('Item not listed?').click(function () { alert("Only the items in your items list is shown.\n\nThis is to try and make the system dynaic!\n(Well, this bit is, anyway!)"); }));
				$('#XORScriptQLB_QUB > ul').empty();
				var consumables = $("a[href*='itemuse.php'] > font:contains('Use')",$(html)).
						add("a[href*='itemuse.php'] > font:contains('Play')",$(html)).
						add("a[href*='itemuse.php'] > font:contains('Open')",$(html)).
						add("a[href*='itemuse.php'] > font:contains('Drink')",$(html)).
						add("a[href*='itemuse.php'] > font:contains('Eat')",$(html)).
						add("a[href*='itemuse.php'] > font:contains('Take')",$(html)).
						add("a[href*='itemuse.php'] > font:contains('Watch')",$(html)).
						add("a[href*='usemedical.php'] > font",$(html)).parent().parent();
				$(consumables).each(function () {
					var consumeName = $(this).children(":first").children(":first").html();
					var consumeID = $(this).children(":first").children(":first").attr('href').split('=')[1];
					$('#XORScriptQLB_QUB > ul').append($(document.createElement('li')).text(consumeName).click(function () {
						var _amount = prompt('How many items would you like to use?');
						while (_amount == "") {
							_amount = prompt('How many items would you like to use?\n\nAn error occurred. Try again.');
						}
						saveButton('Use: '+ _amount + 'x ' +consumeName,'consumeItem('+consumeID+',0,'+_amount+');');
					}));
				});
			}
		});
	}
	else if (menu_id == 4) {
		// Quick Flying
		$('#XORScriptQLB_QFB > ul > li > ul').empty();
		for (var i=0; i<flyingdata.data.length; i++) {
			var cntry = flyingdata.data[i];
			$('#XORScriptQLB_QFB > ul > li > ul').append($(document.createElement('li')).text(cntry[1]).click(function () {
				var country = $(this).attr('flyid');
				var plane_initial = $(this).parent().parent().text().substr(0,1);
				switch (plane_initial) {
					case 'S': plane=1; break; // Standard
					case 'A': plane=2; break; // Air Strip
					case 'P': plane=3; break; // Private
					case 'B': plane=4; break; // Business
					default: plane=1; // Not sure! New plane? Go with standard!
				}
				saveButton('Fly: '+ flyingdata.data[country][1],'flyBabyFly('+plane+','+flyingdata.data[country][2]+');');
				})
				.attr('flyid',i)
			);
		
		}
	}
	else if (menu_id == 5) {
		// Quick Vault
		if ($('#XORScriptQLB_AQV > ul').length == 0) {
			$('#XORScriptQLB_AQV ').append($(document.createElement('ul')));
		} else {
			$('#XORScriptQLB_AQV > ul').empty();
		}
		$('#XORScriptQLB_AQV > ul').append($(document.createElement('li')).text('Deposit').click(function () {
			var _amount = prompt('How much would you like to deposit?\nTo deposit the max available, type: max');
			if (_amount != "max") _amount = _amount.replace(/[^0-9]/g,'');
			while (_amount == "") {
				_amount = prompt('How much would you like to deposit?\nTo deposit the max available, type: max\n\nAn error occurred. Try again.');
				if (_amount != "max") _amount = _amount.replace(/[^0-9]/g,'');
			}
			saveButton('Vault: + '+(_amount=="max"?'Max':'$'+ addCommas(_amount)),'vaultMoney("+",'+_amount+');');
		})
		).append($(document.createElement('li')).text('Withdraw').click(function () {
			var _amount = prompt('How much would you like to withdraw?\nTo withdraw the max available, type: max');
			if (_amount != "max") _amount = _amount.replace(/[^0-9]/g,'');
			while (_amount == "") {
				_amount = prompt('How much would you like to withdraw?\nTo withdraw the max available, type: max\n\nAn error occurred. Try again.');
				if (_amount != "max") _amount = _amount.replace(/[^0-9]/g,'');
			}
			saveButton('Vault: - '+(_amount=="max"?'Max':'$'+ addCommas(_amount)),'vaultMoney("-",'+_amount+');');
		}));
	}
	else if (menu_id == 998) {
		var buttons = readButtons();
		$('ul',$(menu_item)).remove();
		$(menu_item).append($(document.createElement('ul')));
		for (var prop in buttons) {
			var x = prop;
			$('ul',$(menu_item)).append($(document.createElement('li')).text(buttons[x][2]).attr('bid',x).click(function () {
				var name = prompt("Please enter new text for this button:",$(this).text());
				showNotification("Changed button:- " + $(this).text());
				changeButton($(this).attr('bid'),name);
			}));
		}
	}
	else if (menu_id == 999) {
		// Remove Button
		var buttons = readButtons();
		$('ul',$(menu_item)).remove();
		$(menu_item).append($(document.createElement('ul')));
		for (var prop in buttons) {
			var x = prop;
			$('ul',$(menu_item)).append($(document.createElement('li')).text(buttons[x][2]).attr('bid',x).click(function () {
				removeButton($(this).attr('bid'));
				showNotification("Removed button:- " + $(this).text());
			}));
		}
	}
	fixMenuLayout();
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
var allitems = {
		// id(Non-numeric!):[ID, Name]
		'iMelee':['Melee','Melee Weapons'],'i8':['8','Axe'],'i2':['2','Baseball Bat'],'i539':['539','Blood Spattered Sickle'],'i245':['245','Bo Staff'],'i173':['173','Butterfly Knife'],'i234':['234','Chain Whip'],'i10':['10','Chainsaw'],'i217':['217','Claymore Sword'],'i438':['438','Cricket Bat'],'i3':['3','Crow Bar'],'i7':['7','Dagger'],'i600':['600','Devils Pitchfork'],'i614':['614','Diamond Bladed Knife'],'i605':['605','Diamond Icicle'],'i289':['289','Dual Axes'],'i290':['290','Dual Hammers'],'i292':['292','Dual Samurai Swords'],'i291':['291','Dual Scimitars'],'i359':['359','Fine Chisel'],'i560':['560','Fruitcake'],'i439':['439','Frying Pan'],'i599':['599','Golden Broomstick'],'i400':['400','Guandao'],'i1':['1','Hammer'],'i387':['387','Handbag'],'i402':['402','Ice Pick'],'i360':['360','Ivory Walking Cane'],'i236':['236','Kama'],'i247':['247','Katana'],'i6':['6','Kitchen Knife'],'i4':['4','Knuckle Dusters'],'i237':['237','Kodachi Swords'],'i401':['401','Lead Pipe'],'i110':['110','Leather Bull Whip'],'i391':['391','Macana'],'i397':['397','Mace'],'i615':['615','Naval Cutlass Sword'],'i111':['111','Ninja Claws'],'i395':['395','Nunchakas'],'i346':['346','Pair of High Heels'],'i604':['604','Pair of Ice Skates'],'i5':['5','Pen Knife'],'i632':['632','Petrified Humerus'],'i440':['440','Pillow'],'i147':['147','Rusty Sword'],'i238':['238','Sai'],'i11':['11','Samurai Sword'],'i9':['9','Scimitar'],'i227':['227','Spear'],'i224':['224','Swiss Army Knife'],'i175':['175','Taser'],'i250':['250','Twin Tiger Hooks'],'i170':['170','Wand of Destruction'],'i235':['235','Wooden Nunchucks'],'i251':['251','Wushu Double Axes'],'i146':['146','Yasukuni Sword'],'iSecondary':['Secondary','Secondary Weapons'],'i17':['17','Beretta 92FS'],'i244':['244','Blowgun'],'i490':['490','Blunderbuss'],'i233':['233','BT MP9'],'i177':['177','Cobra Derringer'],'i218':['218','Crossbow'],'i20':['20','Desert Eagle'],'i21':['21','Dual 96G Berettas'],'i246':['246','Fireworks'],'i18':['18','Fiveseven'],'i255':['255','Flame Thrower'],'i230':['230','Flare Gun'],'i12':['12','Glock 18'],'i613':['613','Harpoon'],'i253':['253','Lorcin 380'],'i489':['489','Luger'],'i15':['15','M-9'],'i19':['19','Magnum'],'i248':['248','Qsz-92'],'i13':['13','Raven MP25'],'i109':['109','RPG Launcher'],'i14':['14','Ruger 22/45'],'i254':['254','S&W M29'],'i189':['189','S&W Revolver'],'i393':['393','Slingshot'],'i99':['99','Springfield 1911-A1'],'i243':['243','Taurus'],'i16':['16','USP'],'iPrimary':['Primary','Primary Weapons'],'i108':['108','9mm Uzi'],'i26':['26','AK-47'],'i484':['484','AK74u'],'i240':['240','Anti Tank'],'i399':['399','ArmaLite M-15A4 Rifle'],'i23':['23','Benelli M1 Tactical'],'i28':['28','Benelli M4 Super'],'i241':['241','Bushmaster Carbon 15 Type 21s'],'i546':['546','Dual Bushmasters'],'i547':['547','Dual MP5s'],'i548':['548','Dual P90s'],'i545':['545','Dual TMPs'],'i549':['549','Dual Uzis'],'i100':['100','Egg Propelled Launcher'],'i219':['219','Enfield SA-80'],'i382':['382','Gold Plated AK-47'],'i231':['231','Heckler & Koch SL8'],'i252':['252','Ithaca 37'],'i223':['223','Jackhammer'],'i29':['29','M16 A2 Rifle'],'i31':['31','M249 PARA LMG'],'i27':['27','M4A1 Colt Carbine'],'i225':['225','Mag 7'],'i63':['63','Minigun'],'i488':['488','MP 40'],'i24':['24','MP5 Navy'],'i483':['483','MP5k'],'i98':['98','Neutrilux 2000'],'i25':['25','P90'],'i388':['388','Pink Mac-10'],'i22':['22','Sawed-Off Shotgun'],'i232':['232','Sig 550'],'i485':['485','Skorpian'],'i249':['249','Sks Carbine'],'i76':['76','Snow Cannon'],'i30':['30','Steyr AUG'],'i398':['398','Swiss Army SG 550'],'i612':['612','Tavor TAR-21'],'i487':['487','Thompson'],'i486':['486','TMP'],'i228':['228','Vektor CR-21'],'i174':['174','XM8 Rifle'],'iDefensive':['Defensive','Armour'],'i624':['624','Bikini'],'i34':['34','Bulletproof Vest'],'i101':['101','Bunny Fur'],'i176':['176','Chain Mail'],'i430':['430','Coconut Bra'],'i178':['178','Flak Jacket'],'i334':['334','Flexible Body Armour'],'i49':['49','Full Body Armour'],'i348':['348','Hazmat Suit'],'i332':['332','Improved Interceptor Vest'],'i107':['107','Kevlar Trench Coat'],'i32':['32','Leather Vest'],'i333':['333','Liquid Body Armour'],'i50':['50','Outer Tactical Vest'],'i33':['33','Riot Gear'],'i609':['609','Santa Jacket'],'i538':['538','Silver Armour'],'i623':['623','Speedo'],'i562':['562','Sweater'],'i592':['592','Undefined 4'],'i625':['625','Wetsuit'],'iMedical':['Medical','Medical Items'],'i699':['699','Antidote'],'i67':['67','First Aid Kit'],'i66':['66','Morphine'],'i361':['361','Neumune Tablet'],'i68':['68','Small First Aid Kit'],'iDrug':['Drug','Drugs'],'i196':['196','Cannabis'],'i197':['197','Ecstasy'],'i198':['198','Ketamine'],'i199':['199','LSD'],'i200':['200','Opium'],'i201':['201','PCP'],'i203':['203','Shrooms'],'i204':['204','Speed'],'i205':['205','Vicodin'],'i206':['206','Xanax'],'iTemporary':['Temporary','Temporary Items'],'i581':['581','Book'],'i394':['394','Brick'],'i229':['229','Claymore Mine'],'i463':['463','Epinephrine'],'i222':['222','Flash Grenade'],'i220':['220','Grenade'],'i242':['242','HEG'],'i464':['464','Melatonin'],'i239':['239','Ninja Stars'],'i392':['392','Pepper Spray'],'i465':['465','Serotonin'],'i226':['226','Smoke Grenade'],'i611':['611','Snowball'],'i221':['221','Stick Grenade'],'i256':['256','Tear Gas'],'i257':['257','Throwing Knife'],'i616':['616','Trout'],'iEnhancer':['Enhancer','Enhancers'],'i570':['570','Advanced Driving Tactics'],'i569':['569','Balaclava'],'i576':['576','Chloroform'],'i567':['567','Cut-Throat Razor'],'i578':['578','Duct Tape'],'i571':['571','Ergonomic Keyboard'],'i574':['574','Fanny Pack'],'i577':['577','Heavy Duty Padlock'],'i565':['565','High-Speed DVD Drive'],'i421':['421','Large Suitcase'],'i420':['420','Medium Suitcase'],'i566':['566','Mountain Bike'],'i564':['564','Pair of Glasses'],'i573':['573','Screwdriver'],'i568':['568','Slim Crowbar'],'i419':['419','Small Suitcase'],'i386':['386','Sports Sneakers'],'i572':['572','Tracking Device '],'i575':['575','Tumble Dryer'],'i544':['544','Wind Proof Lighter'],'i579':['579','Wireless Dongle'],'iEnergy Drink':['Energy Drink','Energy Drinks'],'i530':['530','Can of Munster'],'i532':['532','Can of Red Cow'],'i554':['554','Can of Rockstar Rudolph'],'i553':['553','Can of Santa Shooters'],'i533':['533','Can of Tourine Elite'],'i555':['555','Can of X-MASS'],'iAlcohol':['Alcohol','Alcohol'],'i180':['180','Bottle of Beer'],'i181':['181','Bottle of Champagne'],'i638':['638','Bottle of Christmas Cocktail'],'i550':['550','Bottle of Kandy Kane'],'i551':['551','Bottle of Minty Mayhem'],'i552':['552','Bottle of Mistletoe Madness'],'i531':['531','Bottle of Pumpkin Brew'],'i294':['294','Bottle of Sake'],'i541':['541','Bottle of Stinky Swamp Punch'],'i426':['426','Bottle of Tequila'],'i542':['542','Bottle of Wicked Witch'],'iCandy':['Candy','Candy'],'i634':['634','Bag of Bloody Eyeballs'],'i37':['37','Bag of Bon Bons'],'i527':['527','Bag of Candy Kisses'],'i210':['210','Bag of Chocolate Kisses'],'i529':['529','Bag of Chocolate Truffles'],'i556':['556','Bag of Reindeer Droppings'],'i587':['587','Bag of Sherbet'],'i528':['528','Bag of Tootsie Rolls'],'i36':['36','Big Box of Chocolate Bars'],'i477':['477','Black Easter Egg'],'i472':['472','Blue Easter Egg'],'i38':['38','Box of Bon Bons'],'i35':['35','Box of Chocolate Bars'],'i39':['39','Box of Extra Strong Mints'],'i209':['209','Box of Sweet Hearts'],'i583':['583','Brown Easter Egg'],'i478':['478','Gold Easter Egg'],'i473':['473','Green Easter Egg'],'i586':['586','Jawbreaker'],'i310':['310','Lollipop'],'i584':['584','Orange Easter Egg'],'i585':['585','Pink Easter Egg'],'i151':['151','Pixie Sticks'],'i474':['474','Red Easter Egg'],'i476':['476','White Easter Egg'],'i475':['475','Yellow Easter Egg'],'iBooster':['Booster','Other boosters'],'i561':['561','Book of Carols'],'i330':['330','Boxing Gloves'],'i331':['331','Dumbbells'],'i366':['366','Erotic DVD'],'i367':['367','Feathery Hotel Coupon'],'i563':['563','Gift Card'],'i106':['106','Parachute'],'i329':['329','Skateboard'],'iElectronic':['Electronic','Electronic Items'],'i65':['65','Big TV Screen'],'i43':['43','CD Player'],'i41':['41','DVD Player'],'i381':['381','Gold Laptop'],'i45':['45','Hard Drive'],'i154':['154','Laptop'],'i62':['62','Microwave'],'i42':['42','MP3 Player'],'i44':['44','Pack of Blank CDs'],'i40':['40','Pack of Music CDs'],'i61':['61','Personal Computer'],'i383':['383','Platinum PDA'],'i104':['104','Playstation'],'i417':['417','RS232 Cable'],'i105':['105','Xbox'],'i145':['145','Xbox 360'],'iClothes':['Clothes','Clothes'],'i404':['404','Bandana'],'i703':['703','Festive Socks'],'i48':['48','Jacket'],'i47':['47','Pair of Trainers'],'i46':['46','Tank Top'],'iJewelry':['Jewelry','Jewelry'],'i54':['54','Diamond Ring'],'i57':['57','Gold Necklace'],'i53':['53','Gold Ring'],'i60':['60','Gold Watch'],'i55':['55','Pearl Necklace'],'i51':['51','Plain Silver Ring'],'i58':['58','Plastic Watch'],'i52':['52','Sapphire Ring'],'i56':['56','Silver Necklace'],'i59':['59','Stainless Steel Watch'],'iCar':['Car','Cars'],'i502':['502','Alfa Romeo 156'],'i517':['517','Aston Martin One-77'],'i518':['518','Audi R8'],'i507':['507','Audi S3'],'i87':['87','Audi S4'],'i79':['79','Audi TT Quattro'],'i80':['80','BMW M5'],'i503':['503','BMW X5'],'i81':['81','BMW Z8'],'i519':['519','Bugatti Veyron'],'i92':['92','Chevrolet Cavalier'],'i82':['82','Chevrolet Corvette Z06'],'i494':['494','Citroen Saxo'],'i495':['495','Classic Mini'],'i83':['83','Dodge Charger'],'i520':['520','Ferrari 458'],'i496':['496','Fiat Punto'],'i84':['84','Firebird'],'i511':['511','Ford Cosworth'],'i508':['508','Ford Focus RS'],'i85':['85','Ford GT40'],'i93':['93','Ford Mustang'],'i95':['95','Holden SS'],'i89':['89','Honda Accord'],'i90':['90','Honda Civic'],'i88':['88','Honda Integra R'],'i78':['78','Honda NSX'],'i509':['509','Honda S2000'],'i86':['86','Hummer H3'],'i521':['521','Lamborghini Gallardo'],'i522':['522','Lexus LFA'],'i512':['512','Lotus Exige'],'i523':['523','Mercedes SLR'],'i510':['510','Mini Cooper S'],'i513':['513','Mitsubishi Evo X'],'i524':['524','Nissan GT-R'],'i497':['497','Nissan Micra'],'i498':['498','Peugeot 106'],'i514':['514','Porsche 911 GT3'],'i94':['94','Reliant Robin'],'i499':['499','Renault Clio'],'i504':['504','Seat Leon Cupra'],'i515':['515','Subaru Impreza STI'],'i77':['77','Toyota MR2'],'i516':['516','TVR Sagaris'],'i505':['505','Vauxhall Astra GSI'],'i500':['500','Vauxhall Corsa'],'i91':['91','Volkswagen Beetle'],'i506':['506','Volkswagen Golf GTI'],'i501':['501','Volvo 850'],'iVirus':['Virus','Viruses'],'i72':['72','Armored Virus'],'i103':['103','Firewalk Virus'],'i70':['70','Polymorphic Virus'],'i69':['69','Simple Virus'],'i73':['73','Stealth Virus'],'i71':['71','Tunnelling Virus'],'iArtifact':['Artifact','Artifacts'],'i461':['461','Black Senet Pawn'],'i459':['459','Egyptian Amulet'],'i451':['451','Florin Coin'],'i453':['453','Ganesha Sculpture'],'i452':['452','Gold Noble Coin'],'i450':['450','Leopard Coin'],'i457':['457','Script from the Quran: Ali'],'i455':['455','Script from the Quran: Ibn Masud'],'i456':['456','Script from the Quran: Ubay Ibn Kab'],'i462':['462','Senet Board'],'i458':['458','Shabti Sculpture'],'i454':['454','Vairocana Buddha Sculpture'],'i460':['460','White Senet Pawn'],'iFlower':['Flower','Flowers'],'i282':['282','African Violet'],'i617':['617','Banana Orchid'],'i184':['184','Bunch of Black Roses'],'i97':['97','Bunch of Flowers'],'i271':['271','Ceibo Flower'],'i277':['277','Cherry Blossom'],'i263':['263','Crocus'],'i260':['260','Dahlia'],'i129':['129','Dozen Roses'],'i435':['435','Dozen White Roses'],'i272':['272','Edelweiss'],'i267':['267','Heather'],'i264':['264','Orchid'],'i276':['276','Peony'],'i183':['183','Single Red Rose'],'i385':['385','Tribulus Omanense'],'iPlushie':['Plushie','Plushies'],'i384':['384','Camel Plushie'],'i273':['273','Chamois Plushie'],'i258':['258','Jaguar Plushie'],'i215':['215','Kitten Plushie'],'i281':['281','Lion Plushie'],'i269':['269','Monkey Plushie'],'i266':['266','Nessie Plushie'],'i274':['274','Panda Plushie'],'i268':['268','Red Fox Plushie'],'i186':['186','Sheep Plushie'],'i618':['618','Stingray Plushie'],'i187':['187','Teddy Bear Plushie'],'i261':['261','Wolverine Plushie'],'iSupply Pack':['Supply Pack','Supply Packs'],'i364':['364','Box of Grenades'],'i365':['365','Box of Medical Supplies'],'i283':['283','Donator Pack'],'i370':['370','Drug Pack'],'i588':['588','Goodie Bag'],'iSpecial':['Special','Special items'],'i396':['396','Business Class Ticket'],'i428':['428','Casino Pass'],'i336':['336','Cesium-137'],'i337':['337','Dirty Bomb'],'i627':['627','Dog Poop'],'i283':['283','Donator Pack'],'i580':['580','Horses Head'],'i368':['368','Lawyer Business Card'],'i369':['369','Lottery Voucher'],'i380':['380','Small Explosive Device'],'i628':['628','Stink Bombs'],'i629':['629','Toilet Paper'],'iCollectible':['Collectible','Collectibles'],'i133':['133','10 Ton Pacifier'],'i471':['471','Admin Portrait 2009'],'i351':['351','Amazon Doll'],'i166':['166','Annoying Man'],'i343':['343','Backstage Pass'],'i353':['353','Bag of Cheetos'],'i144':['144','Banana Phone'],'i169':['169','Barbie Doll'],'i352':['352','BBQ Smoker'],'i692':['692','Bear Skin Rug'],'i448':['448','Bl0ndies Dictionary'],'i161':['161','Black Unicorn'],'i442':['442','Blow-Up Doll'],'i126':['126','Blue Dragon'],'i302':['302','Blue Ornament'],'i444':['444','Breadfan Doll'],'i688':['688','Brewery Key'],'i480':['480','Bronze Dog Tag'],'i284':['284','Bronze Paint Brush'],'i214':['214','Brutus Keychain'],'i447':['447','Burmese Flag'],'i153':['153','Case of Whiskey'],'i445':['445','Chaos Man'],'i344':['344','Chemis Magic Potion'],'i127':['127','China Tea Set'],'i165':['165','Chocobo Flute'],'i102':['102','Chocolate Egg 2005'],'i470':['470','Christmas Card 2009'],'i75':['75','Christmas Cracker 2004'],'i468':['468','Christmas Stocking 2009'],'i355':['355','Citrus Squeezer'],'i142':['142','Cookie Jar'],'i313':['313','Cookie Launcher'],'i188':['188','Cracked Crystal Ball'],'i211':['211','Crazy Cow'],'i150':['150','Crystal Carousel'],'i314':['314','Cursed Moon Pendant'],'i148':['148','Dance Toy'],'i371':['371','Dark Doll'],'i312':['312','Devil Toy'],'i342':['342','Dollar Bill Collectible'],'i213':['213','Dreamcatcher'],'i350':['350','Dunkins Donut'],'i687':['687','Egotistical Bear'],'i123':['123','Elite Action Man'],'i118':['118','Evil Doll'],'i349':['349','Flea Collar'],'i686':['686','Friendly Bot Guide'],'i300':['300','Gibals Dragonfly'],'i482':['482','Gold Dog Tag'],'i286':['286','Gold Paint Brush'],'i303':['303','Green Ornament'],'i193':['193','Hamster Toy'],'i134':['134','Horse'],'i340':['340','Hunny Pot'],'i449':['449','Hydroponic Grow Tent'],'i152':['152','Ice Sculpture'],'i299':['299','Jesters Cap'],'i446':['446','Karate Man'],'i357':['357','Kevlar Helmet'],'i441':['441','Khinkeh P0rnStar Doll'],'i212':['212','Legends Urn'],'i131':['131','Lego Hurin'],'i164':['164','Leukaemia TeddyBear'],'i137':['137','Locked Teddy'],'i149':['149','Lucky Dime'],'i690':['690','Mafia Kit'],'i311':['311','Mardi Gras Beads'],'i479':['479','Metal Dog Tag'],'i207':['207','Miss Torn 2007 Crown'],'i363':['363','Miss Torn 2008 Crown'],'i390':['390','Miss Torn 2009 Crown'],'i526':['526','Miss Torn 2010 Crown'],'i594':['594','Miss Torn 2011 Crown'],'i631':['631','Miss Torn 2012 Crown'],'i695':['695','Miss Torn 2013 Crown'],'i298':['298','Monkey Cuffs'],'i354':['354','Motorbike'],'i122':['122','Mouser Doll'],'i288':['288','Mr Brownstone Doll'],'i202':['202','Mr Torn 2007 Crown'],'i362':['362','Mr Torn 2008 Crown'],'i389':['389','Mr Torn 2009 Crown'],'i525':['525','Mr Torn 2010 Crown'],'i593':['593','Mr Torn 2011 Crown'],'i630':['630','Mr Torn 2012 Crown'],'i694':['694','Mr Torn 2013 Crown'],'i128':['128','Mufasa Toy'],'i132':['132','Mystical Sphere'],'i114':['114','Non-Anon Doll'],'i691':['691','Octopus Toy'],'i163':['163','Official Ninja Kit'],'i287':['287','Pand0ras Box'],'i157':['157','Patriot Whip'],'i113':['113','Pet Rock'],'i115':['115','Poker Doll'],'i140':['140','Pouncer Doll'],'i304':['304','Purple Bell'],'i155':['155','Purple Frog Doll'],'i339':['339','Puzzle piece'],'i192':['192','Rainbow Stud Earring'],'i301':['301','Red Ornament'],'i704':['704','Respo Hoodie'],'i138':['138','Riddles Bat'],'i121':['121','RockerHead Doll'],'i125':['125','Royal Doll'],'i119':['119','Rubber Ducky of Doom'],'i74':['74','Santa Hat 2004'],'i341':['341','Seductive Stethoscope'],'i338':['338','Sh0rtys Surfboard'],'i689':['689','Signed Jersey'],'i481':['481','Silver Dog Tag'],'i285':['285','Silver Paint Brush'],'i130':['130','Skanky Doll'],'i156':['156','Skeleton Key'],'i139':['139','Soup Nazi Doll'],'i141':['141','Spammer Doll'],'i705':['705','Staff Haxx Button'],'i158':['158','Statue Of Aeolus'],'i443':['443','Strawberry Milkshake'],'i136':['136','Strife Clown'],'i356':['356','Superman Shades'],'i120':['120','Teppic Bear'],'i582':['582','Tin Foil Hat'],'i685':['685','Torn Bible'],'i124':['124','Toy Reactor'],'i693':['693','Tractor Toy'],'i117':['117','Trojan Horse'],'i135':['135','Uriels Speakers'],'i143':['143','Vanity Mirror'],'i162':['162','WarPaint Kit'],'i116':['116','Yoda Figurine'],'i297':['297','YouYou Yo Yo'],'iOther':['Other','Miscellaneous'],'i557':['557','Advent Calendar'],'i406':['406','Afro Comb'],'i167':['167','Article on Crime'],'i179':['179','Birthday Cake 2005'],'i374':['374','Birthday Present'],'i377':['377','Birthday Wrapping Paper'],'i328':['328','Blank Credit Cards'],'i327':['327','Blank Tokens'],'i159':['159','Bolt Cutters'],'i403':['403','Box of Tissues'],'i185':['185','Bunch of Balloons 2005'],'i190':['190','C4 Explosive'],'i540':['540','Cauldron'],'i429':['429','Chopsticks'],'i700':['700','Christmas Angel'],'i637':['637','Christmas Express'],'i308':['308','Christmas Gnome'],'i601':['601','Christmas Lights'],'i376':['376','Christmas Present'],'i195':['195','Christmas Tree 2005'],'i379':['379','Christmas Wrapping Paper'],'i636':['636','Cinnamon Ornament'],'i96':['96','Coat Hanger'],'i407':['407','Compass'],'i432':['432','Crazy Straw'],'i467':['467','Dancing Santa Claus 2009'],'i431':['431','Dart Board'],'i543':['543','Deputy Star'],'i626':['626','Diving Gloves'],'i701':['701','Eggnog'],'i535':['535','Electronic Pumpkin'],'i280':['280','Elephant Statue'],'i372':['372','Empty Box'],'i410':['410','Fire Hydrant'],'i622':['622','Flippers'],'i172':['172','Gas Can'],'i378':['378','Generic Wrapping Paper'],'i309':['309','Gingerbread House'],'i602':['602','Gingerbread Man'],'i437':['437','Glow stick'],'i597':['597','Gold Nugget'],'i639':['639','Golden Candy Cane'],'i603':['603','Golden Wreath'],'i262':['262','Hockey Stick'],'i492':['492','Human Head'],'i536':['536','Jack O Lantern Lamp'],'i171':['171','Jack-O-Lantern 2005'],'i275':['275','Jade Buddha'],'i293':['293','Japanese/English Dictionary'],'i278':['278','Kabuki Mask'],'i633':['633','Latex Gloves'],'i405':['405','Loaf of Bread'],'i279':['279','Maneki Neko'],'i259':['259','Mayan Statue'],'i493':['493','Medal of Honor'],'i191':['191','Memory Locket'],'i306':['306','Mini Sleigh'],'i305':['305','Mistletoe'],'i411':['411','Model Space Ship'],'i413':['413','Mountie Hat'],'i620':['620','Nodding Turtle'],'i295':['295','Oriental Log'],'i296':['296','Oriental Log Translation'],'i64':['64','Pack of Cuban Cigars'],'i345':['345','Pack of Trogins'],'i416':['416','Paper Weight'],'i373':['373','Parcel'],'i698':['698','Peg Leg'],'i265':['265','Pele Charm'],'i160':['160','Photographs'],'i696':['696','Piece of Cake'],'i595':['595','Pile of Vomit'],'i423':['423','Poker Chip'],'i559':['559','Polar Bear Toy'],'i375':['375','Present'],'i326':['326','Printing Paper'],'i414':['414','Proda Sunglasses'],'i424':['424','Rabbit Foot'],'i358':['358','Raw Ivory'],'i697':['697','Rotten Eggs'],'i596':['596','Rusty Dog Tag'],'i606':['606','Santa Boots'],'i607':['607','Santa Gloves'],'i608':['608','Santa Hat'],'i610':['610','Santa Trousers'],'i469':['469','Santas Elf 2009'],'i558':['558','Santas Snot'],'i433':['433','Sensu'],'i408':['408','Sextant'],'i415':['415','Ship in a Bottle'],'i216':['216','Single White Rose'],'i621':['621','Snorkel'],'i466':['466','Snow Globe 2009'],'i436':['436','Snowboard'],'i194':['194','Snowflake 2005'],'i307':['307','Snowman'],'i182':['182','Soap on a Rope'],'i270':['270','Soccer Ball'],'i537':['537','Spooky Paper Weight'],'i412':['412','Sports Shades'],'i702':['702','Sprig of Holly'],'i619':['619','Steel Drum'],'i335':['335','Stick of Dynamite'],'i635':['635','Straitjacket'],'i427':['427','Sumo Doll'],'i418':['418','Tailors Dummy'],'i347':['347','Thong'],'i422':['422','Vanity Hand Mirror'],'i425':['425','Voodoo Doll'],'i534':['534','Witches Cauldron'],'i598':['598','Witches Hat'],'i434':['434','Yakitori Lantern'],'i409':['409','Yucca Plant'],'i491':['491','Zombie Brain']
	};

function readAllItems(id) {
	return allitems['i'+id];
}
function showNotification (html) {
	var notifybar = $(document.createElement('div')).css({'width':'100%','height':'30px','background':'#7d7d7d','padding':'3px 0','border-top':'1px solid #5b5b5b','text-align':'center','font-size':'14pt'}).slideDown(300).delay( 800 ).fadeIn( 400 ).html(html).delay(4000).slideUp(100,function () {$(this).remove();});
	$('#XORScriptQuickLinkBar').after(notifybar);
}
var tcshops = {data:[
	// Name, URL, [Items]
	["Big Al's Gun Shop"	,'bigalgunshop.php',			['1','2','3','12','13','392','14','5','6','173','15','7','22','32','16','176','23','17','483','9','25','18','33','174','10','27','19','28','34','29','49','30']],
	["Sally's Sweet Shop"	,'shops.php?step=candy',		['562','102','310']],
	["TC Clothing"			,'shops.php?step=clothes',		['404']],
	["Bits 'n' Bobs"		,'shops.php?step=bitsnbobs',	['181','184','64','129','216','183','368','182','215','256','186','403','394','97']],
	["Jewelry Shop"			,'shops.php?step=jewelry',		['54','53','52','151']],
	["Torn Super Store"		,'shops.php?step=super',		['61','25']],
	["Cyber Force"			,'shops.php?step=cyberforce',	['417']],
	["Torn City Docks"		,'shops.php?step=docks',		['517','521','85','518','514','79','82','515','508','509','512','93','503','504','502','506','499','495','500','498']],
	["Post Office"			,'shops.php?step=postoffice',	['377','379','378','372']],
	["Pharmacy"				,'shops.php?step=pawnshop',		['463','464','465','66','67','68']],
	["Nikeh Sports"			,'shops.php?step=pawnshop',		['330','331','106','329']]
]};
var flyingdata = {'data':[
	// Short Name, Long name, Fly ID, [Items in Country]
	['mexico',		'Mexico',			'2',	["260", "26", "31", "108", "63", "231", "232", "399", "20", "21", "99", "177", "230", "8", "11", "110", "111", "175", "50", "107", "178", "159", "259", "258", "327", "409", "229", "426", "432"]],
	['canada',		'Canada',			'9',	["263", "206", "205", "196", "197", "201", "252", "253", "254", "402", "410", "413", "261", "262", "328"]],
	['cayman',		'Cayman Islands',	'12',	["617", "612", "613", "614", "615", "616", "618", "619", "620", "621", "622", "623", "624", "625", "626"]],
	['hawaii',		'Hawaii',			'3',	["264", "241", "240", "243", "430", "242", "421", "420", "419"]],
	['argentina',	'Argentina',		'7',	["271", "255", "391", "333", "269", "270", "256", "257"]],
	['switzerland',	'Switzerland',		'8',	["272", "196", "198", "199", "201", "203", "223", "398", "224", "436", "273", "435", "222", "361"]],
	['uk',			'United Kingdom',	'10',	["267", "206", "205", "196", "197", "198", "201", "203", "219", "218", "217", "397", "438", "439", "268", "221", "220", "407", "408", "411", "415", "416", "418", "431", "266"]],
	['japan',		'Japan',			'5',	["277", "206", "205", "197", "204", "203", "200", "198", "233", "234", "235", "238", "236", "237", "395", "334", "427", "429", "433", "434", "278", "279", "294", "239"]],
	['china',		'China',			'6',	["276", "197", "199", "200", "201", "204", "249", "244", "246", "248", "245", "247", "250", "251", "400", "274", "275", "326", "335"]],
	['dubai',		'Dubai',			'11',	["385", "382", "388", "387", "386", "381", "383", "412", "414", "384"]],
	['africa',		'South Africa',		'4',	["282", "206", "203", "199", "200", "201", "281", "280", "228", "225", "227", "4", "332", "406", "226"]]
]};
function consumeItem(ID, c, m) {
	var itemID = ID;
	var current = c;
	var max = m;
	if (max <= current) {
		showNotification('All done!\nUsed '+max+' '+readAllItems(itemID)[1]+' items...');
		 window.setTimeout(function () { window.location = window.location; },1200);
	} else {
		$.get('item.php', function (html) {
			if ($('a[href="iteminfo.php?XID='+ID+'"]', $(html)).length == 0) {
				showNotification('Ran out of (Item ID:'+itemID+') items!\nUsed '+current+' items...');
			} else {
				var row = $('a[href="iteminfo.php?XID='+ID+'"]', $(html)).parent().parent();
				if ($('a[href*="itemuse.php"]', $(row)).length != 0) {
					var linky = $('a[href*="itemuse.php"]', $(row)).attr('href') + '&action=2&fac=';
				} else if ($('a[href*="usemedical.php"]', $(row)).length != 0) {
					var linky = $('a[href*="usemedical.php"]', $(row)).attr('href');
				}
				$.get(linky, function (htmlB) {
					if(htmlB.split("not in the hospital").length == 2) {
						max = current;
					} else if (htmlB.split("already under the effect of a drug").length == 2) {
						max = current+1;
					} else if (htmlB.split("had enough").length == 2) {
						max = current+1;
					} else if (htmlB.split("You're full").length == 2) {
						max = current+1;
					}
					consumeItem(ID, current+1, max)
				});
			}
		});
	}
}
function goToMarket(id) {
	window.location = "//www.torn.com/imarket.php?step=shop&submit=Go&type=" + id;
}
function buyItem(ID,qty) {
	var theID = ID;
	var theqty = qty;

	$.get('//www.torn.com/includes/lightbox/buyItem.php?action=confirm2&ID2=&value=&ID=' + theID, function (stage1_pt) {
		var url = $('form:last',$(stage1_pt)).attr('action');
			url += '&case=buyItem';
			url += '&amount' + theID + '=' + theqty;
		$.get('//www.torn.com/includes/lightbox/'+url,function (stage2_pt) {
			if ($('span[class="popupBox"]',$(stage2_pt)).length > 0) {
				$('span[class="popupBox"]',$(stage2_pt)).each(function () {
					showNotification($(this).html());
				});
			} else {
				alert(stage2_pt);
			}
		});
	});
}
function flyBabyFly (plane,country) {
	var url = '//www.torn.com/includes/lightbox/travelAgency.php?ID='+country+'&action=travel'+(country==332?'back2':'')+'&ID2='+plane+'&value=';
	$.get(url,function (plaintext) {
		$('span[class="popupBox"]',$(plaintext)).each(function () {
			showNotification($(this).html());
		});
	});
}
function removeButton (button_id) {
	var buttons = readButtons();
	delete buttons[button_id];
	// Save our new buttons to local storage.
	storage["743049_QLB_Buttons"] = JSON.stringify(buttons);
	// Reload our menu bar!
	loadSavedButtons();
}
function changeButton(button_id,new_text) {
	var buttons = readButtons();
	buttons[button_id][2] = new_text;
	// Save our new buttons to local storage.
	storage["743049_QLB_Buttons"] = JSON.stringify(buttons);
	// Reload our menu bar!
	loadSavedButtons();
}
function saveButton(title,on_click) {
	var buttons = readButtons();
	var buttons_array = Object.keys(buttons);
	// Work out our next button id.
	if (buttons_array.length !== 0) {
		var nextid = parseInt(buttons_array[buttons_array.length-1].substr(1)) + 1;
	} else {
		var nextid = 0;
	}
	// Add our new button to the buttons list.
	buttons['b'+nextid] = [on_click,title,title];
	// Save our new buttons to local storage.
	storage["743049_QLB_Buttons"] = JSON.stringify(buttons);
	// Reload our menu bar!
	loadSavedButtons();
	
	/* Button FORMAT:
	buttonID:['button_on_click', 'button_title', 'button_text'],
	*/
}
function readButtons() {
	var json = storage["743049_QLB_Buttons"];
	var buttons;
	if(!json) {
		 buttons = {
			'b0':['flyBabyFly("", "332");',		'Fly: Torn',				'Fly: Torn'],
			'b1':['flyBabyFly("2","4");',		'Fly: Africa',				'Fly: Africa'],
			'b2':['buyItem(206,19);',			'Buy: 19x Xanax',			'Buy: 19x Xanax'],
			'b3':['buyItem(282,19);',			'Buy: 19x African Violet',	'Buy: 19x Afr-Violet'],
			'b4':['consumeItem(67,0,666);',		'Use: 666x First Aid Kit',	'Use: 666x FAKs'],
			'b5':['buyItem(394,50);',			'Buy: 50x Brick',			'Buy: 50x Brick'],
			'b6':['buyItem(180,50);',			'Buy: 50x Bottle of Beer',	'Buy: 50x Beer'],
			'b7':['vaultMoney("+","max");',		'Vault: + Max',				'Vault: + Max'],
			'b8':['vaultMoney("-","20000000");','Vault: - $20,000,000',		'Vault: - $20,000,000']
			
		};
	}
	else {
		buttons = eval("(" + json + ")");
	}

	return buttons;
}
function loadSavedButtons() {
	var buttons = readButtons();
	while ($('#XORScriptQuickLinkBar > span').length > 1) {
		$('#XORScriptQuickLinkBar > span:eq(1)').remove();
	}
	for (var prop in buttons) {
		var x = prop;
		if ($('#XORScript_QLB_'+x).length != 0) { $('#XORScript_QLB_'+x).remove(); }
		$('#XORScriptQuickLinkBar').append($(document.createElement('span'))
			.attr({'class':'QLB_Button','id':'XORScript_QLB_'+x,'title':buttons[x][1]})
			.text(buttons[x][2])
			.click(function () {
				var id = $(this).attr('id').split('_')[2];
				eval(buttons[id][0]);
			})
		);
		
	}
}
function vaultMoney(action, amount) {
	var _action = action;
	var _amount = amount;
	$.get('//www.torn.com/properties.php', function (propertiesHTML) {
		if ($('a[title="View the vault"]',$(propertiesHTML)).length > 0) {
			var vaultlink = "/" + $('a[title="View the vault"]',$(propertiesHTML)).attr('href');
			$.get(vaultlink, function (vaultHTML) {
				// Get the URL with the RFC tag.
				var _rfc = "/" + $('input[name="withdraw"]',$(vaultHTML)).parent().attr('action');
				// Get the current investment
				var _cur = $('input[name="withdraw"]',$(vaultHTML)).val().replace(/[^0-9]/g,'');
				// FInd out vault size. 100,300,500.
				if (vaultHTML.indexOf('<b>$500,000,000</b>') !== -1) {
					var _max = 500000000;
				} else if (vaultHTML.indexOf('<b>$300,000,000</b>') !== -1) {
					var _max = 300000000;
				} else {
					var _max = 100000000;
				}
				// our Cash On Had
				var _coh = $('#FtcMA',$(vaultHTML)).text().replace(/[^0-9]/g,'');
				// Work out Maximum withdrawal/deposit.
				if (_amount == "max") {
					if (_action == "+") {
						_amount = _max - _cur;
						if(_amount > _coh) _amount = _coh;
					} else {
						_amount = _cur;
					}
				}
				// Change our action into one Torn understands.
				if (_action == "+") {
					var _post = {'deposit':_amount};
				} else {
					var _post = {'withdraw':_amount};
				}
				// Make the withdraw/deposit.
				$.post(_rfc,_post, function (vaultresultHTML) {
					var _sS = vaultresultHTML.indexOf('<br>You have withdrawn ');
					if (_sS === -1) { _sS = vaultresultHTML.indexOf('<br>You have deposited '); }
					if (_sS === -1) { _sS = vaultresultHTML.indexOf('<br>No withdraw/deposit '); }
					_sS+=4;
					var _sE = vaultresultHTML.indexOf('<br>',_sS);
					var _s = vaultresultHTML.substr(_sS,_sE-_sS);
					showNotification(_s);
					// Torn function: Reload money on current page.
					_refreshTopOfSidebar();
				});
			});
		}
		else {
			showNotification("Sorry, could not load vault. Possible reasons: Flying, No Vault, Jail, Hospital.");
		}
	});
}
function _refreshTopOfSidebar() {
    url = "/includes/sidebar/info-box2.php";
    $.get(url, function(data) {
        $('#player-stats-refresh').html(data);
		startCountdowns();
		tooltip();
    });
}
$('document').ready(function () {
	AddHotBar();
});
