// ==UserScript==
// @name          Quick assembly and welding in Twilight Heroes
// @namespace     http://www.nilsbakken.com
// @description   A spoilertastic script which makes it easier to assemble and weld things
// @include       http://*twilightheroes.com/assemble.php
// @include       http://*twilightheroes.com/weld.php
// ==/UserScript==

function Item(quantity, index) {
    this.quantity = quantity;
    this.index = index;
}
function Inventory() {
    this.items = new Array();
}
Inventory.prototype = {
    addItem: function(item, quantity, index) {
	this.items[item] = new Item(quantity, index);
    },
    gotItems: function(item1, item2) {
	if (!item1 || !item2) return false;
	if (item1 == item2) {
	    if (this.items[item1] && 
		this.items[item1].quantity > 1)
		return true;	    
	} else
	    if (this.items[item1] && this.items[item2])
		return true;
	return false;
    }
}
function Recipe(name, item1, item2) {
    this.name = name;
    this.item1 = item1;
    this.item2 = item2;
}
function Recipes(Inv, label) {
    this.Inv = Inv;
    this.group = new Array();
    this.recipes = new Array();
    this.labels = new Array();
    this.hasLabel = new Array();
    for (l in label) {
	this.labels.push(label[l]);
	this.hasLabel[label[l]]=true;
    }
}
Recipes.prototype = {
    menu: null,
    add: function(name, items, sep) {
	if (!items && !items[0]) return;
	items[1] = items[1]||items[0];
	sep = sep||'recipes';
	if (!this.hasLabel[sep]) {
	    this.labels.push(sep);
	    this.hasLabel[sep]=true;
	}
	if (this.Inv.gotItems(items[0], items[1])) {
	    var recipe = new Recipe(name,items[0],items[1]);
	    this.recipes[name] = recipe;
	    if (!this.group[sep])
		this.group[sep] = new Array();
	    this.group[sep].push(recipe);
	}
    },
    insert: function() {
	if (this.recipes.size < 1) return;
	var oldForm = document.getElementsByTagName('form')[0];
	if (!oldForm) return;
	var myHeader = document.createTextNode('Quick list:');
	oldForm.parentNode.insertBefore(myHeader, oldForm);
	var myForm = document.createElement('form');
	myHeader.parentNode.insertBefore(myForm, myHeader.nextSibling);
	this.menu = document.createElement('select');
	myForm.appendChild(this.menu);
	// Add recipes to drop-down menu
	for (var l in this.labels) {
	    var s = this.labels[l];
	    if (!this.group[s])
		continue;
	    myOption = document.createElement('option');
	    myOption.innerHTML = '-- '+s+' --';
	    this.menu.appendChild(myOption);
	    for (var r in this.group[s]) {
		var rec = this.group[s][r];
		myOption = document.createElement('option');
		myOption.innerHTML = rec.name;
		this.menu.appendChild(myOption);
	    }
	}
	this.menu.addEventListener('change', updateForm, true);
    }
}
function updateForm() {
    var menu = Rec.menu;
    if (!menu) return;
    var value = menu.options[menu.options.selectedIndex].innerHTML;
    if (!value) return;
    var recipe = Rec.recipes[value];
    if (!recipe) return;	
    var item1 = Inv.items[recipe.item1];
    var item2 = Inv.items[recipe.item2];
    if (!item1 || !item2) return;
    var selects = document.getElementsByTagName('select');
    selects[1].selectedIndex = item1.index;
    selects[2].selectedIndex = item2.index;
}
function populate(Inv) {
    var items = document.getElementsByTagName('select')[1];
    if (!items) return;
    for (var i = 0; i < items.options.length; i++) {
	if (items.options[i] && items.options[i].text) {
	    var matches = items.options[i].innerHTML.match(/(.+?)(?:\s\((\d+)\))?$/);
	    var currentItem = matches[1];
	    var currentNum = matches[2]||1;
	    Inv.addItem(currentItem, currentNum, i);
	}
    }
}
// Initialize objects
Inv = new Inventory();
// New categories
Rec = new Recipes(Inv,['accessory','boots','full-body suit','gloves','helmet',
	'melee','misc','offhand','pants','potions','ranged','software','shirt','transportation','talismans']);
// Populate recipe menu
populate(Inv);

if (document.location.pathname == "/assemble.php") {
    
    Rec.add('age pill',['aqua melior','green residue'],'potions');
    Rec.add('archron\'s staff',['larchwood staff','Xelor watch'],'melee');
    Rec.add('armored pegasus',['pegasus','xentrium barding'],'transportation');
    Rec.add('Astral Monkey\'s Paw Necklace',
	    ['Schrodinger\'s Box','Thunder in a Bottle'],'talismans');
    Rec.add('Astral Stock Exchange software',
	    ['signal processing code','financial spreadsheet code'],'software');
    Rec.add('bat out of Hell',['smoldering ash','baseball bat'],'melee');
    Rec.add('berry pills',['aqua melior','russet lump'],'potions');
    Rec.add('black gloves',['gloveless fingers', 'fingerless gloves'],'gloves');
    Rec.add('blockheaded hat',['pile of bricks','black hood'],'helmet');
    Rec.add('box pill',['aqua melior','golden powder'],'potions');
    Rec.add('brick wall',['pile of bricks','lead pipe'],'offhand');
    Rec.add('bug pill',['aqua melior','greyish scobs'],'potions');
    Rec.add('Clegg\'s elixir',['tincture of tail','red claw'],'potions');
    Rec.add('control arm',['handle','servomotor'],'misc');
    Rec.add('control frame',['control arm','one-armed harness'],'misc');
    Rec.add('control software',['signal processing code','physiology scan code'],'misc');
    Rec.add('control unit',['PDA','control software'],'misc');
    Rec.add('cordial of cogitation',['lustrous liquid','russet lump'],'potions');
    Rec.add('databelt',['silver comPutty','scriptlet Nineveh'],'accessory');
    Rec.add('databoots',['silver comPutty','scriptlet Iram'],'boots');
    Rec.add('datachoker',['silver comPutty','scriptlet Sidon'],'accessory');
    Rec.add('dataclub',['silver comPutty','scriptlet Beth-zur'],'melee');
    Rec.add('datagloves',['silver comPutty','scriptlet Kadesh'],'gloves');
    Rec.add('datagun',['silver comPutty','scriptlet Ekron'],'ranged');
    Rec.add('datahat',['silver comPutty','scriptlet Ur'],'helmet');
    Rec.add('datapants',['silver comPutty','scriptlet Hebron'],'pants');
    Rec.add('datashield',['silver comPutty','scriptlet Jericho'],'offhand');
    Rec.add('datashirt',['sivler comPutty','scriptlet Antioch'],'shirt');       
    Rec.add('demolition derby',['the bomb','bowler'],'helmet');
    Rec.add('Destitute Dick\'s Penny-Pincher Program',
	    ['financial spreadsheet code','statistical analysis code'],'software');
    Rec.add('digital rapier',['rapier','gyro stabilizer'],'melee');
    Rec.add('discount pants',['baggy cargo pants','electronic cabling'],'pants');
    Rec.add('double plus good draught',['tincture of tooth','lizard tail'],'potions');
    Rec.add('draft of dexterity',['lustrous liquid','green residue'],'potions');
    Rec.add('dulce de diamante',['uncut diamond','transparent tincture'],'potions');
    Rec.add('elixir of experience',['lustrous liquid','greyish scobs'],'potions');
    Rec.add('Exigen-C cocktail',['Rainbow\'s Ark pill','Blue Oxford drink'],'misc');
    Rec.add('feather fluid',['transparent tincture','eagle feather'],'potions');
    Rec.add('filter',['padded tights','webbed sand'],'misc');
    Rec.add('fortified coffee',['caffeine pill','cup of coffee'],'misc');
    Rec.add('fuel',['fire bladder','filter'],'misc');
    Rec.add('fuel tank',['fuel','empty tank'],'misc');
    Rec.add('Garcia\'s Traffic Avoider software',
            ['city map code','signal processing code'],'software');
    Rec.add('gauze rifle',['needler','smart bandages'],'ranged');
    Rec.add('GigantoFirm LookOut Calendar',
	    ['city map code','physiology scan code'],'software');
    Rec.add('Gingerette hard candy',['peacekeeping baton','pinata'],'misc');
    Rec.add('golden ticket',['golden apple','lottery ticket'],'misc');
    Rec.add('golden ticket',['golden powder','lottery ticket'],'misc');
    Rec.add('goo bomb',['glob of goo','shell casing'],'misc');
    Rec.add('grim pill',['aqua melior','black flakes'],'potions');
    Rec.add('guidance system',['control unit','gyro stabilizer'],'misc');
    Rec.add('hammer time',['big honkin\' hammer','Xelor watch'],'melee');
    Rec.add('handle',['control unit','gyro stabilizer'],'melee');
    Rec.add('harness',['trylon strap'],'shirt');
    Rec.add('high-jump boots',['taut sinew','army boots'],'boots');
    Rec.add('hot pockets',['newt leather','denim pants'],'pants');
    Rec.add('hot potato',['smoldering ash','pocket van de graf generator']);
    Rec.add('iMyself blog software',
	    ['city map code','statistical analysis code'],'software');
    Rec.add('Ivory Coast ginger beer',['can of Gingerelle','Ivory Coast spices'],'misc');
    Rec.add('jury-rigged splatter',['glob of goo','laser cannon'],'ranged');
    Rec.add('kindling',['shattered protest sign'],'misc');
    Rec.add('leached liquid',['feather fluid','red claw'],'potions');
    Rec.add('longbow of the law',['taut sinew','long arm of the law'],'ranged');
    Rec.add('lover\'s locket',
	    ['lover\'s locket, left half','lover\'s locket, right half'],'accessory');
    Rec.add('low-jump boots',['pile of bricks','army boots'],'boots');
    Rec.add('lupine liquor',['tincture of tooth','red claw'],'potions');
    Rec.add('MacRuff\'s Mercantile Monitor software',
            ['city map code','financial spreadsheet code'],'software');
    Rec.add('mangled data plate',['data plate','hammer'],'misc');
    Rec.add('morning star',['bag of throwing starfish','long arm of the law']);
    Rec.add('motor',['gears','transformer'],'misc');
    Rec.add('mourning star',['teardrop gem','the whole nine yards'],'melee');
    Rec.add('mysterious machine',['unbranded jalopy','glob of goo'],'transportation');
    Rec.add('newt leather jacket',['newt leather','denim jacket'],'shirt');
    Rec.add('night cap',['pathway imager','knit cap'],'helmet');
    Rec.add('night club',['night cap','long arm of the law'],'melee');
    Rec.add('one-armed harness',['control arm','sturdy harness'],'misc');
    Rec.add('Orb of Insight',
	    ['Schrodinger\'s Box','Astral Monkey\'s Paw Necklace'],'talismans');
    Rec.add('Pachelbel\'s cannon',['harmonica','laser cannon'],'ranged');
    Rec.add('paper mache (#1)',['outraged political flyer','rave flyer'],'misc');
    Rec.add('paper mache (#2)',['outraged political flyer'],'misc');
    Rec.add('paper mache (#3)',['rave flyer','rave flyer'],'misc');
    Rec.add('paper mache (#4)',
            ['Pax Verde life-time membership card',
            'Pax Verde life-time membership card'],'misc');
    Rec.add('paper machete',['baseball bat','paper mache'],'misc');
    Rec.add('PDA',['nanoprocessor','underpowered PDA'],'misc');
    Rec.add('pearl jam',['pearl of wisdom','pearl of wisdom'],'misc');
    Rec.add('pearl necklace',['pearl of wisdom','platinum necklace'],'accessory');
    Rec.add('philtre of fortune',['lustrous liquid','golden powder'],'potions');
    Rec.add('pinata',['paper mache','paper mache'],'misc');
    Rec.add('potion of invisibility',['feather fluid','red tooth'],'potions');
    Rec.add('potion of the indoors',['tincture of tail','eagle feather'],'potions');
    Rec.add('propulsion system',['guidance system','fuel tank'],'misc');
    Rec.add('Quijote\'s spear',['the whole nine yards','quill blade'],'melee');
    Rec.add('robin\' hood',['capo cap-o','eagle feather'],'helmet');
    Rec.add('ruby treacle',['uncut ruby','transparent tincture'],'potions');
    Rec.add('S.M.A.R.T. software',
	    ['physiology scan code','statistical analysis code'],'software');
    Rec.add('S.U.I.T. Software',
	    ['signal processing code','statistical analysis code'],'software');
    Rec.add('sapphire syrup',['uncut sapphire','transparent tincture'],'potions');
    Rec.add('scale mail',['reptile tile','taut sinew'],'shirt');
    Rec.add('scarlet powder',['uncut ruby','transparent tincture'],'potions');
    Rec.add('scriptlet Antioch',['subscript alpha','subscript alpha'],'misc');
    Rec.add('scriptlet Beth-zur',['subscript beta','subscript beta'],'misc');
    Rec.add('scriptlet Ekron',['subscript gamma','subscript gamma'],'misc');
    Rec.add('scriptlet Hebron',['subscript gamma','subscript iota'],'misc');
    Rec.add('scriptlet Iram',['subscript beta','subscript gamma'],'misc');
    Rec.add('scriptlet Jericho',['subscript alpha','subscript iota'],'misc');
    Rec.add('scriptlet Kadesh',['subscript iota','subscript omicron'],'misc');
    Rec.add('scriptlet Nineveh',['subscript omicron','subscript omicron'],'misc');
    Rec.add('scriptlet Sidon',['subscript beta','subscript iota'],'misc');
    Rec.add('scriptlet Ur',['subscript alpha','subscript omicron'],'misc');
    Rec.add('seltzer of sturdiness',['lustrous liquid','black flakes'],'potions');
    Rec.add('sensor mechanism',['pressure plate','electronic cabling'],'misc');
    Rec.add('serpentskin vest',['serpent skin','denim jacket'],'shirt');
    Rec.add('servomotor',['sensor mechanism','motor'],'misc');
    Rec.add('shamrock powder',['uncut emerald','aqua melior'],'potions');
    Rec.add('shooting stars',['bag of throwing starfish','smoldering ash'],'ranged');
    Rec.add('shortbow of the stick',['taut sinew','short end of the stick'],'ranged');
    Rec.add('smalt powder',['uncut sapphire','aqua melior'],'potions');
    Rec.add('smoky pack',['backpack','roman candle wand'],'misc');
    Rec.add('sticky gloves',['duct tape','leather gloves'],'gloves');
    Rec.add('suspicious trench coat',['lab coat','flashlight'],'full-body suit');
    Rec.add('Swedish Navy Wrench',['Schrodinger\'s Box','Orb of Insight'],'talismans');
    Rec.add('teardrop gem',['glob of goo','Spice Coast gold'],'misc');
    Rec.add('teardrop necklace',['teardrop gem','platinum necklace'],'accessory');
    Rec.add('the whole nine yards',
	    ['short end of the stick','long arm of the law'],'melee');
    Rec.add('Thor\'s bolts',['fusion pack','pronged javelin'],'ranged');
    Rec.add('Thunder in a Bottle',
	    ['Schrodinger\'s Box','Swedish Navy Wrench'],'talismans');
    Rec.add('tincture of tail',['transparent tincture','lizard tail'],'potions');
    Rec.add('tincture of tooth',['transparent tincture','red tooth'],'potions');
    Rec.add('transparent tincture',['foul spirits','lump of carmot'],'potions');
    Rec.add('tropical fleece',['smoldering ash','smudged sweater'],'shirt');
    Rec.add('Underpowered PDA',['broken PDA','memory tube'],'accessory');
    Rec.add('viscount pants',['pearl jam','discount pants'],'pants');
    Rec.add('wand of compensation',
            ['embiggening tonic','short end of the stick'],'melee');
    Rec.add('weird sculpture',['badly bent knife','shattered protest sign'],'misc');
    Rec.add('zapper',['fusion pack','taser'],'ranged');
    Rec.add('Zeno\'s bow',['bow of hazard','Xelor watch'],'ranged');
    		
} else if (document.location.pathname == "/weld.php") {

    Rec.add('Abyssinian exosuit',['byzantium','smart suit'],'full-body suit');
    Rec.add('antique shield',['malkamite','targe vert with human rampant'],'offhand');
    Rec.add('antsy pants',['pentium','docker\'s pants'],'pants');
    Rec.add('armpit britches',['malkamite','snug breeches'],'pants');
    Rec.add('B.L.ighT. gun',['illuminum','B.L.T.'],'ranged');
    Rec.add('ball bearing cannon',['titanium plating','beanbag cannon'],'ranged');
    Rec.add('black robot',['plasteel plating','robotics kit'],'sidekick');
    Rec.add('blunderbuss',['malkamite Aaron Burr\'s flintlock'],'ranged');
    Rec.add('Bombayer jacket',['byzantium','smart shirt'],'shirt');
    Rec.add('boom box',['music box','squawking radio'],'accessory');
    Rec.add('boots of the cold feet',['cryonite','army boots'],'boots');
    Rec.add('boogaloo boots',['illuminum','chip loafers'],'boots');
    Rec.add('bun\'s blade',['enerbun globule','large knife'],'melee');
    Rec.add('Burma razor',['byzantium','saw glove'],'melee');
    Rec.add('canary bonnet',['illuminum','robo cap'],'helmet');
    Rec.add('Cape Kennedy cape',['byzantium','bodice'],'shirt');
    Rec.add('Cathay ray',['byzantium','rail gun'],'ranged');
    Rec.add('cavorite cap',['cavorite','plasteel helmet'],'helmet');
    Rec.add('cavorite cover',['cavorite','plasteel shield'],'offhand');
    Rec.add('cloak of desanguination',['pentium','hooded cloak'],'shirt');
    Rec.add('clockwork ant',['clockwork core','irrhodium socket set'],'sidekick');
    Rec.add('clockwork armadillo',['clockwork core','irrhodium plate'],'sidekick');
    Rec.add('clockwork falcon',['clockwork core','xentrium axe'],'sidekick');
    Rec.add('clockwork kangaroo',['clockwork core','xentrium crossbow'],'sidekick');
    Rec.add('clockwork owl',['clockwork core','irrhodium helm'],'sidekick');
    Rec.add('clockwork spider',['clockwork core','irrhodium gauntlets'],'sidekick');
    Rec.add('cold shoulder shirt',['cryonite','ballistic vest'],'shirt');
    Rec.add('cold-blooded axe',['cryonite','xentrium axe'],'melee');
    Rec.add('coldfinger gloves',['cryonite','reinforced gloves'],'gloves');
    Rec.add('cranky old bastard sword',['malkamite','telekinetic katana'],'melee');
    Rec.add('cryonite club',['cryonite','peacekeeping baton'],'melee');
    Rec.add('cryonite corduroys',['cryonite','BDU pants'],'pants');
    Rec.add('cryonite darts',['cryonite','dark arts'],'ranged');
    Rec.add('cryonite shield',['cryonite','riot shield'],'offhand');
    Rec.add('dashing shoes',['paladinum','sturdy boots'],'boots');
    Rec.add('dateless gloves',['malkamite','work gloves'],'gloves');
    Rec.add('defender of the crown',['paladinum','threeinforced cap'],'helmet');
    Rec.add('desert eagle',['paladinum','military sidearm'],'ranged');
    Rec.add('dragoon\'s lance',['paladinum','astral spline'],'melee');
    Rec.add('double canister',['shell casing','shell casing'],'misc');
    Rec.add('electric slide whistle',['illuminum','titanium pipe'],'accessory');
    Rec.add('empty tank',['double canister','titanium plating'],'misc');
    Rec.add('epic flail',['paladinum','morning star'],'melee');
    Rec.add('Erdrick\'s plate',['paladinum','camouflage dungarees'],'full-body suit');
    Rec.add('fire drill',['saw glove','infernium slab'],'melee');
    Rec.add('five-finger discount gloves',['pentium','white gloves'],'gloves');
    Rec.add('flinty beret',['malkamite','robo cap'],'helmet');
    Rec.add('frostbite whip',['cryonite','extension cord'],'melee');
    Rec.add('frosty mug helmet',['cryonite','flak helmet'],'helmet');
    Rec.add('Gaul blatter',['byzantium','B.L.T.'],'ranged');
    Rec.add('Gallagher\'s mallet',['plasteel plating','hedge slammer'],'melee');
    Rec.add('Gilligan\'s gold club',['polysteel','Gallagher\'s mallet'],'melee');
    Rec.add('grandpa\'s flannel shirt',['malkamite','illuminum blouse'],'shirt');
    Rec.add('grey robot',['titanium plating','robotics kit'],'sidekick');
    Rec.add('Gulliver\'s maul',['cavorite','Gallagher\'s mallet'],'melee');
    Rec.add('heart of ice',['cryonite','lover\'s locket'],'accessory');
    Rec.add('heavy, heavy plate',['pentium','polyester suit'],'full-body suit');
    Rec.add('heavy duty jacket',['paladinum','xentrium breastplate'],'shirt');
    Rec.add('holy hand grenade launcher',['paladinum','U.R.L.'],'ranged');
    Rec.add('hot pants',['infernium slab','security slacks'],'pants');
    Rec.add('hot rodimus',['unbranded jalopy','Paddlebot logo'],'transportation');
    Rec.add('illuminated shield',['illuminum','roboto shield'],'offhand');
    Rec.add('illuminum blouse',['illuminum','smart shirt'],'shirt');
    Rec.add('illuminum gloves',['illuminum','paper cut gloves'],'gloves');
    Rec.add('illuminum skirt',['illuminum','smarty pants'],'pants');
    Rec.add('imperial diadem',['royal crown','monarch butterfly pin'],'helmet');
    Rec.add('infernal pinata',['infernium slab','pinata'],'misc');
    Rec.add('infernium gloves',['infernium slab','armored gloves'],'gloves');
    Rec.add('infernium slab',['smoldering ash','plasteel plating'],'misc');
    Rec.add('iron-toe boots',['pentium','Hike boots'],'boots');
    Rec.add('jetpack',['control frame','propulsion system'],'transportation');
    Rec.add('laser saber',['digital saber','laser macrodiode'],'melee');
    Rec.add('light cycle',['illuminum','tri-cycle'],'transportation');
    Rec.add('lightning rod',['illuminum','smart axe'],'melee');
    Rec.add('lion-hearted shield',['paladinum','xentrium shield'],'offhand');
    Rec.add('metaphoric shoes',['malkamite','tormented soles'],'boots');
    Rec.add('mechapinata',['infernal pinata','robotics kit']);
    Rec.add('medieval plate',['malkamite','Erdrick\'s plate'],'full-body suit');
    Rec.add('Model T-1000',['unbranded jalopy','Fordbot logo'],'transportation');
    Rec.add('music box',['verse of the dodo','Schrodinger\'s box'],'accessory');
    Rec.add('New Amsterdam gloves',['byzantium','paper cut gloves'],'gloves');
    Rec.add('numbchucks',['cryonite','frostbite whip'],'melee');
    Rec.add('pants valiant',['paladinum','xentrium breeches'],'pants');    
    Rec.add('Paradime device',['bicycle','super-stable gizmo'],'transportation');
    Rec.add('pent-a-gram',['pentium','dented hubcap'],'accessory');
    Rec.add('pentacle',['pentium','horrid tentacle'],'accessory');
    Rec.add('pentagon buckler',['pentium','shield of Zion'],'offhand');
    Rec.add('pentameter',['pentium','verse of the dodo'],'ranged');
    Rec.add('Petrograd pants',['byzantium','smarty pants'],'ranged');
    Rec.add('pingerang',['titanium plating','boomerang'],'ranged');
    Rec.add('plague buster',['astral spline','fish whiskas'],'melee');
    Rec.add('plasteel helmet',['plasteel plating','flak helmet'],'helmet');
    Rec.add('plasteel shield',['plasteel plating','riot shield'],'offhand');
    Rec.add('plasteel shirt',['plasteel plating','ballistic vest'],'shirt');
    Rec.add('plasteel trousers',['plasteel plating','BDU pants'],'pants');
    Rec.add('poly shorts',['polysteel','plasteel trousers'],'pants');
    Rec.add('poly stilettos',['polysteel','sneakiers'],'boots');
    Rec.add('polydactyl gloves',['polysteel','black gloves'],'gloves');
    Rec.add('polygon pavise',['polysteel','plasteel shield'],'offhand');
    Rec.add('polyphonic spree-gin',['polysteel','needler'],'ranged');
    Rec.add('polysteel panama',['polysteel','plasteel helmet'],'helmet');
    Rec.add('polytechnic tunic',['polysteel','plasteel shirt'],'shirt');
    Rec.add('provocative helmet',['pentium','football helmet'],'helmet');
    Rec.add('quint-barreled rifle',['pentium','repeating rifle'],'ranged');
    Rec.add('red robot',['infernium slab','robotics kit'],'sidekick');
    Rec.add('reinforced helmet',['titanium plating','baseball cap'],'helmet');
    Rec.add('reinforced shirt',['titanium plating','denim jacket'],'shirt');
    Rec.add('Rhodesian ridged helm',['byzantium','robo cap'],'helmet');
    Rec.add('righteous hook',['paladinum','big left hook'],'melee');
    Rec.add('righteous shades',['paladinum','smoky goggles'],'accessory');
    Rec.add('robot with a heart of gold',['cybertronium','robotics kit']);
    Rec.add('roboto shield',['strut bar','cybertronium'],'offhand');
    Rec.add('rock-salt gun',['malkamite','your little friend'],'ranged');
    Rec.add('safety pants',['titanium plating','denim pants'],'pants');
    Rec.add('Schrodinger\'s Box',['xentrium breastplate','quantum hopper'],'misc');
    Rec.add('Scythian crook',['byzantium','smart axe'],'melee');
    Rec.add('shaking cane',['malkamite','short end of the stick'],'melee');
    Rec.add('shrapnel gun',['cavorite','needler'],'ranged');
    Rec.add('Siamese dreamcatcher',['byzantium','roboto shield'],'offhand');
    Rec.add('smart axe',['cybertronium','the whole nine yards'],'melee');
    Rec.add('smart shirt',['lab coat','cybertronium'],'shirt');
    Rec.add('smarty pants',['cybertronium','snug breeches'],'pants');
    Rec.add('spark saw',['illuminum','spark saw'],'melee');
    Rec.add('sparkle bomb',['illuminum','fusion pack'],'misc');
    Rec.add('stabilized gyros',['gyro stabilizer','gyro stabilizer'],'misc');
    Rec.add('stovepipe hat',['shell casing','reinforced helmet'],'helmet');
    Rec.add('sturdy harness',['harness','plasteel plating'],'shirt');
    Rec.add('sub-ma-car',['unbranded jalopy','Aquasson logo'],'transportation');
    Rec.add('sun dress',['illuminum','smart suit'],'full-body suit');
    Rec.add('super-stable gizmo',['stailized gyros','stabilized gyros'],'misc');
    Rec.add('the 3-erang',['tritanium','pingerang'],'ranged');
    Rec.add('TheK3vin\'s Kh4k1s',['tritanium','BDU pants'],'pants');
    Rec.add('third rail gun',['illuminum','rail gun'],'ranged');
    Rec.add('three-fingered gloves',['tritanium','reinforced gloves'],'gloves');
    Rec.add('threeinforced cap',['tritanium','flak helmet'],'helmet');
    Rec.add('threeinforced vest',['tritanium','ballistic vest'],'shirt');
    Rec.add('titanium lump',['titanium plating','pocket van de graf generator'],'misc');
    Rec.add('titanium mace',['titanium lump','titanium pipe'],'melee');
    Rec.add('titanium pipe',['titanium plating','lead pipe'],'melee');
    Rec.add('titanium shield',['titanium plating','trash can lid'],'offhand');
    Rec.add('tri-cycle',['tritanium','motorcycle'],'transportation');
    Rec.add('triangle triptych',['tritanium','riot shield'],'offhand');
    Rec.add('tritanium treads',['tritanium','army boots'],'boots');
    Rec.add('tritanium trident',['tritanium','peacekeeping baton'],'melee');
    Rec.add('UltraSport boxing gloves',['cavorite','black gloves'],'gloves');
    Rec.add('UltraSport jersey',['cavorite','plasteel shirt'],'shirt');
    Rec.add('UltraSport slacks',['cavorite','plasteel trousers'],'pants');
    Rec.add('UltraSport socks',['cavorite','sneakers'],'boots');
    Rec.add('unbalanced club',['pentium','big honkin\' hammer'],'melee');
    Rec.add('vicious cycle',['infernium slab','tri-cycle'],'transportation');
    Rec.add('vindaloo boots',['Vinlands\'s End hiking boots','boogaloo boots'],'boots');
    Rec.add('Vinlands\'s End hiking boots',['byzantium','chip loafers'],'boots');
    Rec.add('xentrium boots',['xentrium ingot','jack boots'],'boots');
    Rec.add('xentrium breeches',['xentrium ingot','plasteel trousers'],'pants');
    Rec.add('xentrium gauntlets',['xentrium ingot','irrhodium gauntlets'],'gloves');
    Rec.add('xentrium helm',['xentrium ingot','irrhodium helm'],'helmet');
    Rec.add('xentrium shield',['xentrium ingot','plasteel shield'],'offhand');
}
// Insert into menu
Rec.insert();