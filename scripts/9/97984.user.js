// ==UserScript==
// @name           Wall Manager Sidekick (PT)
// @description    Assists Wall Manager with Pioneer Trail posts
// @include        /^http(s)?:\/\/(.*?)\.frontier.zynga.com/(.*?)\.php\?/
// @include        /^http(s)?:\/\/apps\.facebook\.com\/(frontierville|pioneertrail)\//
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        3.0.1.2
// @require        http://userscripts.org/scripts/source/123889.user.js
// @copyright      Charlie Ewing & Joe Simmons
// @include        file:///C:/FB-Wall-Manager/*
// ==/UserScript== 

(function() { 

	//special events for window.top but not during docking
	if ((window.top==window.self) && !(
		window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )
		|| window.location.href.startsWith("file:///C:/FB-Wall-Manager/")
	)) {
		if (window.top==window.self) Sidekick.listen();
		window.addEventListener("onBeforeUnload", Sidekick.unlisten, false);	
		return; 
	}
	
	var version = "3.0.1.2";
	
	function linkTo(s) {try{
		var link=document.body.appendChild(createElement("a",{href:s,target:"_top"}));
		click(link);
	}catch(e){log("ptSidekick.linkTo: "+e);}};
	
	function wrapMsg(s, hwnd) {try{
		if (!isChrome || (window.top==window.self)) sendMessage(s,hwnd);
		else linkTo("http://apps.facebook.com/?#"+s);
	}catch(e){log("ptSidekick.wrapMsg: "+e);}};

	function dText(s) {
		return document.documentElement.textContent.find(s);
	};

	//gets the location pathname without the file name
	//ie http://apps.facebook.com/onthefarm/reward.php?asdjpasodjfasoidfjaosidjfasdfjasdif 
	//becomes just http://apps.facebook.com/onthefarm
	function getDir() {
		var thisLoc; (thisLoc=(window.location.protocol+"//"+window.location.host+window.location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/"); return thisLoc;
	};

	//reconstruct an array, turning it into definitions using a prefix
	Array.prototype.toDefinitions = function(prefix){
		if (this) for (var i=0;(this[i]);i++) this[i]=prefix+this[i].noSpaces().toLowerCase();
		return this;
	};

	function buildBlock(params){
		params=params||{};
		if (!params.arr) return;
		var block={
			type:"optionblock",
			label:params.label||"",
			kids:{},
			backgroundColor:(params.backgroundColor||null),
			fontColor:(params.fontColor||null),
			newitem:(params.newitem||null),
			css:(params.css||null),
		};
		for (var k=0,klen=params.arr.length;k<klen;k++){
			var item=params.arr[k];
			var id=(params.prefix||"")+(item.noSpaces().toLowerCase())+(params.suffix||"");
			var name=(params.accText||null)?params.accText[id]:item.upperWords();
			block.kids[id]={
				type:"checkbox",
				label:name,
			};
		}
		return block;
	};

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var thisApp = '266989143414';
		var doorMark=$('wmDoor_app'+thisApp);
		if (doorMark) return; //already posted to door

//ARRAYS
		var sendWords =[
			"needs","send","looking fer","looking for","get one too","get one in return","get some too","could sure use some","could use some",
			"want to get","You'll get a","lookin' fer","lookin' for","Will you share some","With yer help","and that requires","got any?",
			"could really use some","can you share some","how about sharin' some","Can ya help with some","wants a bunch","is desperate for",
			"got any spare","share the goods?","an you spare","get some in return",
		];

		var materials = ["snack","tool","carrot","fire","critter milk","fuzzy blanket","sharp axe","maple syrup",
			"lemonade","rivet","lunch","ribbon","hammer","chalk","nail","cement","peg","present","batter",
			"butter","cake","milking bucket","braiding ribbon","slate","spitball","breakfast","lunch","dinner","downy feather",
			"paint bucket","eggplant","powder keg","land grant","wagon trailer","glue","recommendation","scouting permit","bear trap",
			"iced tea","trinket","guestbook signature","potty paper","fries","clothes","tootin' jug","shaving lather","shampoo",
			"whittlin' knife","swing rope","bear hug","baby name","loggin permit","cardboard box","crowbar","fancy clothes",
			"missing persons poster","false mustache","decoder ring","chunky chow","pet brush","groundhog decoy","tin sheet",
			"screw","bait","juicy berries","sardine","care package","hand drill","brick","shingle","window","mallet","mystery gift",
			"chicken wire","molding","whitewash","bag of gravel","elbow grease","measuring tape","wooden coffin","grave flower",
			"beeswax candle","seed scoop","detail saw","hanger","shelves","bins","screwdriver","coal","chocolate bar",
			"gingerbread slab","frosting","gum drop","candy cane","sink","spackle","plaster","hope","dreams","wishes",
			"dog bone","dog door","dog blanket","padlock","carpenter's pencil","level","survey authorization","baby clothes",
			"fair ticket","critter clothes","measurements","building plans","canning jar","buckets of water","snakebite kit",
			"shipping label","metal bar","birch bark","jigs","love ballad","trail marker","love letter","silverware",
			"charm bracelet","body-building magazine","silver needle","poster","insurance waiver","ground pole","horse bedding",
			"salt lick","hay net","stone grit","mounting block","arrowhead","rabbit steak","handkerchief","scrap metal",
			"self-improvement book","jackalope rsvp","paving stone","triangle","scrub brush","marrow bone snack","scratching post",
			"litter box","aquarium","pet crate","lucky talisman","charter agreement","pamphlet","bloody cannonball",
			"hardwood","milking stool","trade permit","trading post tile","trading post awl","trading post beam","mask",
			"antiseptic","hospital bed","prescription","blacksmith hammer","iron ore","leather square","glass vial",
			"blacksmith apron","ash dump","junk metal","planter box","hand rake","fertilizer","desk","curtain","large hinge",
			"stamp roll","rusty faucet","bath robe","towel rack","dowsing rod","hand crank","shovel","pulley","mule kick mix",
			"green lightning","bartending guide","banister","barstool","lucky dice","cue ball","varmint julep","Granny's No. 5",
			"iced tea","filtered water","quick draw quaff","oat syrup","fire water","fruit punch","ginger beer","loyal pioneer",
			"butterscotch tonic","raging buffalo","weenie","tent stake","scary campfire story","preserving salt",
			"stinky herb","shipping manifest","7-Course","breath mint","apple treat","sugar cube","herding permit",
			"hunting permit","digging permit","stuffed rabbit","wags","muddy paw","ledger","rope and bucket","pink rose",
			"newsprint","shocking photo","weather report","breaking news","dead bugs","prospectin' gear","heavy boots","soap dish",
			"goat hat","wooden post","woven wire","feeding trough","stable stall","muck boots","toolbox","fruit decal",
			"insect spray","pruner","fencing","spring water","box of sweets","red rosebud","silver candle","gem polisher",
			"cloth","shears","saddle oil","silver bell","engagement present","white linen","silk thread","silver button",
			"sequin","ruffles","silver","white roses","aniversary present","wedding cake","sugar rose","gold leaf","flour",
			"eternity","black velvet","jewelry","wedding favor","stagecoach ticket","flax rope","sheet steel","pond scum kit",
			"green algae","pre-formed pond","beam","dealing box","green felt","poker card","gamblin' case","marker",
			"matches","pyrotechnic star","scrap wood","banner","small flag","lift charge","gold certificate",
			"abacus","safe","gold bullion","loan paper","teller's window","safe key","chute","barrel","clown chaps","dirt",
			"bronco tonic","rodeo poster","heavy rope","axle grease","iron bolt","tent stitching","hot sauce","wild berries",
			"wood door frame","buffalo grass","cedar pole","tail fin","cranky gearbox","hand crank","rusty drive shaft",
			"support beam","prairie dog decoy","curious critter net","long underwear","spruce lumber","muddy caulk",
			"trail soup","plunger instructions","blasting powder","small generator","dynamite fuse","Giganterous Paw-Print",
			"yarn ball","meat","medicine","parts","carrot juice","funnel","hot coals","pot belly stove","red eye","after burner",
			"Hair o' The Dog","comfy bed","snuggly blanket","bluegrass songbook","Granny's Gut Punch","hoedown banjo",
			"buckshot ball","forge hinge","forge gear","forge chain","golden hammer","medical degree","anatomy book",
			"stethoscope","medical scale","hypodermic needle","tootin' fruit","graniteware","cast iron pan","branding iron",
			"ground chuck","cornbread","water canteen","doggie treat","barn nail","cinnamon stick","botany trowel",
			"training saddle","fluffy biscuit","spiked wheel","tarp","silo beam","roof tile","ladder","bacon drippin's",
			"wooden plank","rafter beam","latticed wood","ribbon spool","prize ticket"," iou","silo",
			"salami","small pitchfork","ice cream sandwich","school bell","leather strap","text book","school desk",
			"pair of shoes","denim cloth","clay pot","bean pole","whirleygig","push handle","spring","pineapple cuttings",
			"sittin' stool","warm gloves","tempered rivet","milk jug","sheet metal","band merchandise","banjo pick",
			"mother of pearl inlay","guitar strings","bass strings","concert wristband","stage lights","wildberries",
			"hide glue","tuning peg","monsterbane arrow","leather strip","bone pin","plant food","mulch","ladybugs",
			"country sunshine","buttermilk","mutant magnifier","care package","large cedar pole", "skull",

			"ghostly pots","tangy sauce bottle","eyes of newt","shrunken head","mighty trunk","deathcap mushroom",
			"power pruner","farmin' hoes","composter","loam","melons","scythes","super clover","super melon","super rose",
			"super eggplant","super corn","super grape","super pineapple","super wheat","super strawberry", "super potato",
			"charm","potion","spirit","hide","freaky fertilizer","plant fiddle","green spirit","big oak fertilizer",
			"spice rack","metal filing","rusty handle","coyote decoy","hoary handcuffs","blackbird house","gumption",
			"hand stitches","burnin' berries","fat sack","big gnarly nuts","trowel","super baby gro", "mega baby gro",

			"family portrait","wolfnut butter","vampire potion","confession letter","hank loves fanny card","shelves",
			"grimoire","preserved lizard","bloodberry juice","sparkle juice","glitter powder","hairy beaker","werewolf fur",
			"alchemy shelves", 

			"ghost town map","Trick-or-Treat Sack","pottery clay","frontier living","candy bag","honey pot","map fragment",
			"ghostly chain key","red rose","pink rose","saltwater taffy","Whoopie Cushion","Popcorn Ball","Tarot Card",
			"sandstone","broom handle","Pumpkin Lantern",
		
			"bone pillar","treats","ghost catcher","tricks","frankenflour","steel hoe","pine board","cow fertilizer",
			"ivy starter","construction permit","handsaw","used nails","large nails","metal bracket","smooth rock",
			"masonry ruler","metal clamp","chisel","pails of water","actuator","copper ore","gear",

			"Wild Bayberry","Mustang Blanket","Dream Catcher","Kachina Doll","Hickory Wall","Beaded String","Lariat Weight",
			"sugar cane","fire brick","fire stone","flint spark","whipped yolk","heavy cream","baking chocolate","cocoa powder",
			"cream cheese","chocolate shavings","milk chocolate","Frontier's Finest","playground instructions",

			"nutmeg", "Buckets o' Sugar","Potato Masher","Roasted Turkey","Cajun Seasoning","Dinner Plate",
			"Baking Sheet","Casserole Dish","Butter Dish","Carvin' Knives","Turkey Baster",
			
			"ration","firewater","golden feather",

			"poppy flowers","buffalo sighting","buffalo hooves","polished stone","spirit lure",
			"songbirds","daydreams","childhood memories","guard bears","shady spot",
			
			"picket fence","bags of walnuts","ice cubes",
			"cedar incense","spiritual vision","ceremonial fire","kippy's belt","otter milk",
			"leather hide","colored bead","white lightning",
						
			"flaming branch","jalapenos","slop",

			"holiday cloth","glass cutter","sugar plum","spindle","Whittling Knives","truffles",
			"jingle harness","oiled runner","gift sack",
			"home decoration",
			"chipped board","rusty screw","bent nail",
			"silver chain","polished cedar","iron gear",
			"holiday egg","stocking coal","fragrant insole","dark chocolate",
			"vindication axe","stale fruitcake","lemon extract","pink carnation",
			"reindeer trough","ragdoll beady eyes","bow","tiny uniform","paintin' paper",
			"key mold","miniature pillow","cookie dough","cheer",
			"candy cane","fir wood","decor","gear","cocoa milk",
			"candied walnuts","sugared leaves",
			"tree trimmer","snow slinger","decorator",

			"Wikiwah Blanket","Wikiwah Bead","Bay Leaves","Garlic Yogurt",
			"Stocking Stuffer","Eggnog","Colorful Tassel","Pine Branches","Bow Ribbon","Yo-yo","Invigorating Brew","Long Stem Rose",
			"Festive Lights","Fine-Tuned Fiddle","Decorative Haybales","Decorative Paper","Festive Paint","Pet Combs","Red Satin","Long Candlewick",
			"Granny's Digest","Friendship Trinket",

			"Nursing Pot","Windstruments","Large Bags of Soil", "Plant Guide", "Maize Basket","Buttercorn", "Cocoa Graft","Tomato Vine",
			"Corn Root",

			"Loverly Cow","Refined Iron Ore","Swan Feather","Romance","Sugar and Spice","Chocolate Heart","Pomegranate Tree","Pine Wood",
			"Badger Felt","Fluffy Stuffing","White Rose Bud","Oyster",

			"Tiny Bow","White Peach Tree","Toolbelt","House Blueprint","Hardwood Flooring","Garden Rake","Galvanized Nail","Lime Powder",
			"Geranium Cluster","Metal Sheet",

			"Tough Nails","Giant Wood Plank","Window Frame","Measuring Rope","Emporium Flyer","Emporium Mystery Crate","Baby Doll",
			"Homestead Layout Plans",

			"gold valve","shiny faucet","iron grate","circulation pump",
			
			"push pin","teamwork","cork board","colored paper",

			"flowered hedge","lake flower","pearl necklace","blue cloth", "pink lily","elegant ribbon","february calendar","saucy spices",
			"fancy bead","place setting",

			"wooden groundhog","potbelly keg","canadian spruce","noisemakers","rock bustin' hammer","large gravel","rail","iron rail spike",
			"tunnel beam","lamp post","platform slat","lunch pail",

			"snare","expansion permit","signature","ranch mystery crate",
			"rustic fence","push plow","harvesting basket","land survey","pulley part",

			"nugget","handpick edge",
			"red lace swing", "6x1 planks","pistol lubricant",

			"boot polish","shoes","fancy stitchin'","stylish suspenders","french doilies","new lasso","part casting","wagon tie","sudsy bucket",
			"scrubbin brush","smoky salt","country map","bloomin' agave","spicebush","saguaro",

			"flower spore","cactus spike","bone fragment","chunks of stone","knotted thorn","wildflowers",

			"train photo", "sour cherry tree","thorns",

			"well wishes","shower decor","doll crib","cupcake batter","baby blocks","mesh wrapping","oak twig","bear stuffing",

			"gold rose seed","steel blade","wire mesh","pup wrap","wild pup care",

			"ox shoe","rosemary sprig","echinacea","rock",

			"wooden flatbed","crane shaft","baggage net","sliding door","shatter proof window","steam valve","down feathers",
			"iron fastenings","molding wax","steel forge","blazing star","pronghorn","norther bayberry",

			"gold nugget","rough sand","pure water","fortified milk","silver wool","redwood log","golden egg","boysenberry",
			"grub","cantaloupe","molten alloy","acidic sludge","blast tube","dynamite","pumpkin",

			"mining certificate","love bullet","massage coupon","clothespin","clobberin' gloves","slim pants","pyrite testing kit",
			"family memory","determination","secret safe",
			"wooden ATM","gold pen","bedroom curtain","silver spoon","down mattress","package scale","packaging tape","flagpole",
			"furry rug","sticky tar","silver nail","waterproof bolt","power shovel","wall whitewash","plaster bucket",
			
			"coach curtain","strapping rein","golden screw","polished wood","shiny iron",

			"orange tree","baby blankie","mobile","rattle","puzzle piece", "cotton stuffing","decorative thread",
			"vegetable broth","linen cloth",

			"habanero seeds", "willow tree","rhubarb seeds",
			"coarse rock", "compass needle","orange dye","hair bristle","sweet lemon","raw leather","willow branch",
			"cappy glue","rhubarb stalk","roasting rod","secret spice","ripe walnut","raw pith","brass plate",
			"bright candle","liquid smoke","steak seasoning","iced pitcher","small yoke","crude lathe","thin oil",
			"heavy press","pie crust","walnut cracker","pith helmet","mining helmet","portrait frame","granny's lemonade",

			"auction podium","tomato seedling","pressure plate","tense spring","snake skin","silver star","sharpened plow",
			"gun oil","heavy duty beam","barter tariff",
			"bison horn","valley oak","yellow mustard",

			"pole pine","works mystery crate",
			"foundation rod","stacked chimney","iron camshaft","knotty board","rigid pole","unstuffed glove",

			"telegraph key","rubber","electric circuit","cable tape","timesheet","frontier batteries","telegram",
			"bronze pig",

			"kidney beans","celery seed",
			"side dish","serving spoon","sauteed veggie","name tag","black bean","ground cumin","colored chalk","bbq bib",
			"chopped chives","family harmony","exercise strap","wild berries","opals",

			"coarse wool","wax coating","blackberry root","panther butter","large floodbag","panther chow",
			"sandbag","flood puddle","mastery boost",

			"knitting needle","blue pacifier","cool water","mitt leather","bonnet cap","teddy dress","stroller wheel",
			"sterile gloves","doctor's mask","diaper cream","baby booties",

			"cotton","chamomile","pink beets",

			"pink lily","imported artichoke",
			"ornate vase","floral fabric","sweet honey","sharp scissors","imported goods","starch solution","price tag","exotic fabric","appraisal certificate",

			"coat conditioner","ranch gloves","tossed salad","cowgirl spice","saddle plans","guitar glue","cowgirl terrets",
			"prickly pear","horseradish",
			
			"crib mobile","woolen sheep","frontier wallpaper","number blocks","sand box frame","shovel and pail","paper dolls","kids books",
			"safety ties","swan ornament","leather straps","silk doll parts","sanded wood","step ladder","polished slide",
			
			"cherry tomato",
			
			"Triple Mastery 1H boost","wine grapes","pearly cow","estate mystery crate","resource crate",
			"clipped bush","pristine gutter","overpriced wood","door stain","spotless pane","kingly curtain","stable cobble",
			
			"steel handcuffs","creaky floorboard","wanted board","porch chair","sheriff's seal","sugar crystal","office blueprint","book pages","wicker basket",
			
			"marigold","aloe vera","cocoa tree",
			"baby bird feed",
			"machete handle","hiking boot","wooden mallet","iron stake","clean cloth","spray nozzle","cool spring water","monstrous match","spooky story",
			
			"red clover","speedy hands",
			"frame boards","chandelier candle","town emblem","iron bell","paint brush","support bar","boost permit","thin chain","construction sign","trash picker","iron plumbing","wood column","stone steps","potluck dish",
			
			"cave truffle","huckleberry","rhode island red",
			"cooling rack","bread pantries","pie plate","sifted flour","refined sugar","shredded coconut","chocolate sprinkles",
			
			"guilty confessions","secret recipes","spyglass lens","warm water","maplewood handle","footprints","horse tracks","torn fabric",
			
			"creek map","beaver distraction","hard hat","lemonade","rod rings","mixed nuts","reinforced wheel","beaver bed","fish hook","rubber padding","fishing score card",
			"blueberry bush","wiggly worm",
			
			"potato seed",
			"bowl of water","chunk o' chicken","gate schematic","fence sign","warm oven mitt","pie tin","indigestion pill",
			
			"muffin","picnic sheet","smellbetter soap","mounting bolt","fingerboard","warm milk",
			
			"blue corn","honeydew","beef jerky","giant madrone tree",
			
			"prisoner calendar","mouth organ","spotlight","food tray","iron bar","cryptography book","iron ball","encrypted message",
			
			"brass forge",
			"marble pedestal","chisel kit","glass plate","large clock spring","metal frame beam","chime tuner","clock winder","mechanism blueprint",
			
			"hog chow","corndog","corn dog",
			"horseshoe nail","organizer","spoonful of sugar","doc's secret stuff","long board","pig massage","duster handle","sugary shortening",
			
			"vibrant flowers","small fuse","rockin' horse","party balloon","large ridin' saddle","huge flowerbed","pink handcuffs","confetti tree",
			"festive balloon","party popper tree",
			"judge's gavel","scales of justice","the book","lock pin kit","armed escort","bandit stash",
			
			"starfruit","white oak",
			"speaking trumpet","drill whistle","range target","skid marks","shiny stars","cadet hat","red wool","thief","wagon tracks","cadet exam","cadets",
			
			"fresh grass","town coin",
			"hole auger","grip wrench","work towels","coin press","hedge trimmers","mail slot","pipe form","frosted glass","wish list",
			
			"large haybale","horse chow","leather patch","grilled steak","silver clasp","grilled chicken",
			
			"mixed tulip","poinsettia","holiday crate",
			"kissin' memories","hidden attic schematic","rustic candelabra","bottomless basket","romantic vanity","decorations","aroma therapy","xtra wide chimney","glittery ball","resolution list","jack-o-lantern pattern","old candy corn","creepy crawly costume","sparkling water","cubed caramel",
			
			"leather binding","spine threading",
			
			"catalog drawer","wood lathe kit","basement beam",
			"dewey decimal label","end table","frontier anecdote",
			"local legend","rough sandpaper","second-hand book",
			"sunny window",
			
			"styling mirror","hair sweeper","sheep smock","master plaster",
			"sprung springs","loose lace","carvin' blade","softness soap",
			
			"sheep shampoo","lemon mint","nectarine tree","lemon tree",
			
			"stage plank","firework fuse","firework launcher","frontier firecracker",
			"firework tubing","red rocket","multicolor rocket","bag of flour",
			"super-sweet icing","safety bucket","firework stand",
			
			"sparkling rose",
			
			"expedition chronicle","pioneer portrait","fancy hat",
			"tiny antlers","toolbox",
			
			"cherry tomato","frontier almanac",
			
			"animal nametag","massage oil","stylin' shades","squeaky slippers",
			"sensitive trigger","loft blueprints","facial mud","inspired pattern",
			"sheep scissors","salad dressing","drink sword","velvet fabric",
			
			"choco cow","floppy fair hare","kitty cough syrup","warming blanket",
			
			"tent pole","hearty trailmix","chicken chunk","soft fabric",
			"strong bandage","sugary syrup",
			
			"bow limb","bow grip",
			
			"leather seating","parasol ribbing","mystery meat",
			"frozen yogurt","mood candle","flyswatter",
			
			"basil","spinach",
			
			"animal decoy","owl decoy","owl call","small collar",
			"strong leash","rabbit jerky","wooden rabbit",
			
			"tamin' treat","bleeding heart",
			
			"games ticket","silver dart","shootin' gallery duck",
			"gold ball",
			
			"carnival flyer","thirsty pioneer","wooden duck",
			"water pump","marconi bulb","carnival stamp",
			
			"claw stepper","clown barrel","barbell",
			"wood wheel","log weight","soothin' salt",
			"peg hook","beef cake",
			
			"muscle mix","bull thistle",
			
			"cotton candy",
			
			"soft material","fine sand paper","ferris wheel flyer",
			"metal rim","safety net","candy dispenser","safety belt",
			"display rack","funny munny",
			
			"broccoli","habanero","blueberry",
			
			"female bear decoy","large trout","monkey proof lid",
			"red ribbon","essense of bunyan","string stitching",
			"pouch of glitter","iron shavings","massage iou",
			
			"marigold",
			
			"morse keys","well diggin' kit","posse poster",
			"empty flower box","party placemat","wooden skeleton",
			"dewey card","librarian glasses","head measurement",
			"bounty board","writing surface","voting booth",
			"shiny badge",
			
			//mummy
			"mummy wrap","uncurse charm",
			"Khol Mascara","colorful gem","mob torch",
			"spooky beaker","linen skirt","spray bottle",
			"lapiz lazuli","garlic amulet","limb strap",
			"essence jar",
			
			"ancient lily",
			
			//fire2
			"cooling gel",
			
			"hard water","spring water",
			"brass tubing","forged bolt","water barrel",
			"brass trim","brass bits","smotherin' tarp",
			"tender bandage","shoulder strap","pick tip",
			
			//rel5
			"dog violet","puppy nutrients",
			
			"doodoo claw","beefy bits","stage pin",
			"puppy pillar","big bar","lickin' cream",
			"rough turf","identity tag","scratchin cone",
			
			//fire1
			"station siding","critter salve","crystal water",
			"pump handle","steel case","oak puller",
			"cross beams","elastic loops","brass pole",
			"fire station sign","bag of sand",
			
			//rel4
			"horsey punch","oat crop","parade shoes",
			"horse course","sweet oils","balance spring",
			"sturdy base","side saddle","practice prancer",
			
			//lookout perch
			"flexible straps","pink flag","beautiful basket",
			"long blade","meat hook","snack mix","viewin' scope",
			
			//rel8-9
			"green apple tree",
						
			//hero3
			"soothing serum","printed fabric","bed legs",
			"round rungs","party glass","get well card",
			"house plans","well wishes",
			
			"lavender crop","adult cow",
			
			//tannery
			"cord thread","leather punch","braided popper",
			"boot silver","tanning lime","glove pattern",
			"broken bridle","cracked collar","sole sealant",
			"flint knife","leather guide",
			
			"cattle lead","sieve station",
			
			//hero2
			"drawing chalk","thumb screw","dolly eyes",
			"military patches","bird seed","bird canteen",
			"soldier's journal","child's paint","tin cup",
			"cherry woodstain","hollowed tube",
			"lantern candles",
			
			"fully grown willow","fancy steak dinner",
			
			//bonfire
			"chili bib","wood utensil","bug spray",
			"hook clasp","cheese cloth","melted butter",
			"torn ticket stub","fryin' oil",
			"ruined sheets","canning lid","wood staple",
			"mattress patch",
			
			"olive tree",
			
			//hero1
			"red wax","draggin slayor","small zipper",
			"open envelope","graphite mold",
			"fanny's writing guide",
			
			//applefest
			"sittin' plank","granny's old fashioned cider",
			"cross bow","unstamped ticket","sweet apple butter",
			"apple fritter","apple festival invitation",
			"apple festival flag","cider glass","apple stamp",
			
			"barley","child scarecrow","leaf-barrow",
			"fall flower bed",
			
			//ancestry3
			"lychee tree","red onion",
			
			"amaranth herb","cutting razor","claw head",
			"love letter","metal saw","chain cutters",
			"metal wedge",
			
			//redemption
			"old shoe","chipping knife","sparklin' hat",
			"practice post","bed post","encyclopedia",
			"dictionary","activated yeast","ground cinnamon",
			"lock pick",
			
			"rye","baby carrots",
			
			//payday3
			"brass mallet","burn plate","molasses base",
			"long pole","wax string","brush base",
			"sun glasses","bathing suit","gold certificate",
			"mane conditioner","tail ribbon",
			
			//payday2
			"heavy screw","heavy head","lilting chimes",
			"calcium carbide","rubble movin' glove",
			"tight corset","hull reinforcement","bat trap",
			
			"miner cat","the crop whisperer",
			
			//lost memory
			"precise lens","sugar water","iron banding",
			"slice of cake","brass handle","chore list",
			"friend portrait","old clothes","spouse story",
			"scrap book",
			
			"tough hands tonic",
			
			//payday1
			"unsprung spring","double axe head",
			"solid spikes","sturdy wheels","root breaker",
			"liquid courage","sun mirror","diggin' pick",
			"missin' jack poster","miner hat",
			
			"canary",
			
			//pumpkin12
			"super soil","pumpkin plumper","mini pumpkin",
			"ghost pumpkin",
			
			"strong oak board","caliper","wagon axle",
			"pulp bowl","pumpkin scooper","small trowel",
			"gardening hose","drawin' charcoal",
			"weavin' needle","clean water",
			
			//halloween12
			"leather pattern","ghost tree",
			"garlic necklace",
			
			"chain breaker","leather fraying","simple thread",
			"sugar mixture","wax candle","metal spike",
			"cupcake mix","broccoli floret",
			
			//romance5
			"binoculars","catnip","red huckleberry",
			
			"habitat blueprint","magnified lens",
			"goat flank","wooden platform","panko bread crumbs",
			"squeaker","leather thread","bouncy ball",
			"cleaning supplies","water dish",
			
			//cdl
			"cowpoke","black bean",
			
			"birthing kit","solid post","unpainted dummy",
			"sewin' thread","pile of alfalfa","rake dowel",
			
			//romance4
			"squirrel decoy","blackbear cub","cute bear topiary",
			"colorado pinyon",
			
			"trap blueprint","tamin' whip","bear net","long leash",
			"catfish fillet","large pulley","hefty rope",
			"large salmon","deer jerky","fluffy pillow",
			"calming leaves","wooden pole",
			
			//summer games
			"heavy weight","frontier megaphone","construction certificate",
			"simple pulley","durable saw","fancy red ribbon","rock hammer",
			"gold medal mold","large pitcher","green wreath",
			"runnin' shoes",
			
			"frontier spirit","frontier flower",
			
			
			
			" hat", " ink"," pen"].optimize();

		var decor = ["stool","log","rocking chair","rocking horse","canteen","oak tree","apple tree","loom","lovely card",
			"trough","sledge hammer","barbed wire","stuffed groundhog","grass","cactus","path","peach tree","pine tree",
			"apricot tree","cherry tree","peppermint","pansies","daisies","carnations","tulips","lily","iris","lovebirds",
			"gold chest","blackberry bush","wild lupine","persimmon tree","prairie lavender","banjo","cocoa tree","pear tree",
			"candycane fence","Hogknocker Crate","Poinsettia","Frozen Orange Tree","nectarine tree"].optimize();

		var collectibles = ["welcome mat","saddle","hoof pick","skillet","goat stew","goat milk","bear pelt","diary","bear meat",
			"tips","prairie pile","cotton seed","milk","snake fang","ribeye","hymnal","grain sack","old book","beaver pelt",
			"mug","bandage","hoof pad","12 red roses","wormy apple","globe","book strap","money bag"].optimize();

		var animals =["chicken","pig","cow","sheep","goat","goose","duck","ox","mule","grey sheep","black pig","white pig",
			"black sheep","white goat","black goat","white swan","black swan","pink swan","kissing swan","pregnant bunny",
			"white buffalo","moose","horse","white horse","brown sox horse","red ox","white ox","jersey cow","black cow",
			"green frog","cream cow","snow mole","snowshoe chipmunk","forest fawn","holiday porcupine","holiday rabbit",
			"holiday mouse","otter","pygmy goat","black moose","wild pup","pronghorn","baby hawk","raccoon",
			"mummy sheep","mummy pig","charred chipmunk",
			"burnt bunny","ghost horse","canary","miner cat",
			
		].optimize();

		var allWords = [].concat(materials,decor,collectibles,animals).optimize();

		var preAccText1 = createAccTextFromArray(materials,"send","");
		var preAccText2 = createAccTextFromArray(allWords,"","");
		var preAccText3 = {
			send:"Unknown",varmintsurprise:"Varmint Surprise",randomdrink:"Random Drink or Ingredient",
			sendweddinginvitation:"Wedding Invitation",sendraindancer:"Rain Dancer",sendrodeoflag:"Rodeo Flag",
			"xp0-24":"1-24 XP","xp25-49":"25-49 XP","xp50-99":"50-99 XP","xp100-199":"100-199 XP",
			"xp200-499":"200-499 XP","xp500-999":"500-999 XP","xp1000+":"1000+ XP",
			"coins0-24":"1-24 Coins","coins25-49":"25-49 Coins","coins50-99":"50-99 Coins","coins100-199":"100-199 Coins",
			"coins200-499":"200-499 Coins","coins500-999":"500-999 Coins","coins1000+":"1000+ Coins",
			"food0-24":"1-24 Food","food25-49":"25-49 Food","food50-99":"50-99 Food","food100-199":"100-199 Food",
			"food200-499":"200-499 Food","food500-999":"500-999 Food","food1000+":"1000+ Food",
			"wood0-24":"1-24 Wood","wood25-49":"25-49 Wood","wood50-99":"50-99 Wood","wood100-199":"100-199 Wood",
			"wood200-499":"200-499 Wood","wood500-999":"500-999 Wood","wood1000+":"1000+ Wood",
			cloth5:"1-5 Cloth",cloth10:"6-24 Cloth",cloth25:"25+ Cloth",
			ticket1:"1 Prize Ticket",ticket2:"2 Prize Tickets",ticket3:"3 Prize Tickets",ticket5:"5 Prize Tickets",
			rep24:"1-24 Reputation",rep99:"25-99 Reputation",rep100:"100+ Reputation",
			brownmule:"Brown Mule",chicken:"Chicken",chinchillapink:"Pink Chinchilla",
			ferrettan:"Spring Ferret",bearcubbrown:"Spring Bear Cub", robinblack:"Spring Robin",
			quailyellow:"Spring Quail",turtleblack:"Black Turtle",deerblack:"Black Deer",
			duckmallard:"Mallard Duck",duckpurple:"Purple Duck",duckyellow:"Yellow Duck",
			swangorgeous:"Gorgeous Swan",peppermintcandy:"Peppermint Candy",whiterosepetal:"White Rose Petals",
			cherrycandy:"Cherry Candy",piggypoop:"Piggy Poop",foxcollection:"Random Fox Collection Item",
			peapod:"Pea Pod",prairiepile:"Prairie Pile",groundhogcollection:"Random Groundhog Collection Item",
			poopcollection:"Random Poop Collection Item",groundchuck:"Ground Chuck",col:"Random Collection Item",
			tailorshopcollection:"Random Tailor Shop Collection Item",oldbook:"Old Book",
			ribeye:"Rib Eye",roadkill:"Roadkill",familycollection:"Random Family Collection Item",
			boosthorse:"Horse Ready Boost",boostchicken:"Chicken Ready Boost",sharpaxe:"Sharp Axe",
			boostgoose:"Goose Ready Boost",boostmoose:"Moose Ready Boost",boostbadger:"Badger Ready Boost",
			boostpig:"Pig Ready Boost",boostcherry:"Cherry Ready Boost",boostgoat:"Goat Ready Boost",
			boostcorn:"Corn Ready Boost",boostclover:"Clover Ready Boost",energy5:"5 Energy",
			boostcow:"Cow Ready Boost",boostflax:"Flax Ready Boost",boostpeanut:"Peanut Ready Boost",
			boostwheat:"Wheat Ready Boost",boostunwither:"Unwither Boost",boostfasthands:"Fast Hands Boost",
			boostredrose:"Red Rose Ready Boost",boostwitherprotect:"Wither Protection Boost",
			boostacceleratecrops:"Accelerate Crops Boost",boostsheep:"Sheep Ready Boost",boostlemon:"Lemon Ready Boost",
			boostanimal:"Animal Ready Boost",boostcotton:"Cotton Ready Boost",boostox:"Ox Ready Boost",
			flowerpotrect:"Rectangle Flower Bed",floweringcactus:"Flowering Cactus",boostapricot:"Apricot Ready Boost",
			booststrawberry:"Strawberry Ready Boost",boostmelon:"Melon Ready Boost",boostgrapes:"Grapes Ready Boost",
			boostpotato:"Potato Ready Boost",boosteggplant:"Eggplant Ready Boost",boostpineapple:"Pineapple Ready Boost",
			boostpinkrose:"Pink Rose Ready Boost",boostwhiterose:"White Rose Ready Boost",
			boostsheep:"Sheep Ready Boost",boostorange:"Orange Ready Boost",boostpear:"Pear Ready Boost",
			boostpeach:"Peach Ready Boost",boostpeas:"Peas Ready Boost",boostbuffalo:"Buffalo Ready Boost",
			"boostchoco-nutsquash":"Choco-nut Ready Boost","boosttomatopepper":"Tomato Pepper Ready Boost",
			boostfasttrees:"Accelerate Trees Boost",boostcabbage:"Cabbage Ready Boost",northerbayberry:"Northern Bayberry",
			sendbbqbib:"BBQ Bib",boostfig:"Fig Ready Boost",boostzucchini:"Zucchini Ready Boost",
			pine2:"Pine Tree",oak2:"Oak Tree",fishhook:"Fishing Hook",boostsunflower:"Sunflower Ready Boost",
			massageiou:"Massage IOU",aloe:"Aloe Vera",
			boostfruit:"Fruit Ready Boost",boostpumpkin:"Pumpkin Ready Boost",
		};

		var allAccTexts=mergeJSON(preAccText1,preAccText2,preAccText3)

		var attachment={
			appID:thisApp,
			name:'Pioneer Trail',
			thumbsSource:'assets.frontier.zgncdn.com',
			flags:{requiresTwo:true,postMessageCompatible:true},
			icon:"http://photos-e.ak.fbcdn.net/photos-ak-snc1/v85005/210/266989143414/app_2_266989143414_6660.gif",
			desc:"Pioneer Trail/FrontierVille Sidekick (ver"+version+")",

			accText: allAccTexts,

			tests: [
//EXCLUDES---------------------------------------------------------------------------
				{ret:"exclude", body:[
					"wants to Axe you a question!","needs your help with withered crops!",
					"is looking for the following items"
				]},
				{ret:"exclude", link:[
					"get mystery gift + xp", "claim land title","go to frontierVille",
					"go play","send thank you gift","send mighty cheers","join crew",
					"go see my gift","hire"
				]},

//SEND---------------------------------------------------------------------------
				//catch sends where link and body do not represent the item, or items that claim send that are not
				{body:["Plumpin' Pumpkins, but needs to keep Plumpin"],ret:"supersoil"},
				{body:["is going to win big at Apple Bobbin', but they gotta keep bobbin"],ret:"sendapplestamp"},
				{body:["is lookin' fer a way to stop them fires! Here's a Hard Water to help stop 'em.","is going to be the best Crossbow Shooter"],ret:"hardwater"},
				{body:"is lookin' fer a way to make the Show Dogs",ret:"loyalpioneer"},
				{body:"is lookin' fer a way to make the Beautiful Horses",ret:"horseypunch"},
				
				{body:"pulled some Prairie Lavender",ret:"prairielavender"},
				{body:["needs special flour to make Crazier Cake"],ret:"sendbagofflour"},
				{body:["getting steak for the most amazin' meat pies"],ret:"sendgrilledsteak"},
				{body:["turnin' leather into gold, or boots"],ret:"sendleatherpatch"},
				{body:["is gettin' horses they food they love"],ret:"sendhorsechow"},
				{body:["is gatherin' hay into haybales!"],ret:"sendlargehaybale"},
				{body:"needs some Panther Butter",ret:"sendpantherbutter"},
				{body:"Tough Nails",ret:"sendtoughnails"},
				{body:"Would you some Fast Tree boosts",ret:"boostfasttrees"},
				{body:"needs to frame the world in something beautiful",ret:"sendwindowframe"},
				{body:"pushed a whole buncha buildings into an Emporium",ret:"sendemporiumflyer"},
				{body:"but a buncha rulers ain't equal",ret:"sendmeasuringrope"},
				{body:"needs to frame the world in something beautiful",ret:"sendwindowframe"},
				{body:"loverly cow",ret:"loverlycow",kids:[
					{body:"need to sell some",ret:"sendloverlycow"},
				]},
				{body:"needs a home",ret:"none",kids:[
					{body:"{%1}",ret:"{%1}",subTests:animals},
				]},
				{body:["proved to the Wikiwah that cowgirl's do it best","fast hand"],ret:"boostfasthands"},
				{body:"hogknocker crate",ret:"hogknockercrate"},
				{link:"super melon",ret:"supermelon"},
				{body:"needs to sparkle!",ret:"sendglitterpowder"},
				{body:"needs shelves in order to complete a Halloween Hutch!",ret:"sendalchemyshelves"},
				{body:"finalize Hank and Fanny's",ret:"sendweddinginvitation"},
				{body:"do a Prairie Rain Dance",ret:"sendraindancer"},
				{body:"Cheer On Bess",ret:"sendrodeoflag"},
				{link:"flax me",ret:"sendflaxrope"},
				
				//catch all w2w materials
				{ret:"none",body:"stopped by your homestead with",kids:[
					{body:"{%1}",subTests:materials,ret:"{%1}"},
				]},

				//catch all sends where either link or body DO represent the item
				{ret:"send",either:sendWords,kids:[
					//catch those posts where item in body does not match item in link, and body contains the proper item
					{body:"{%1}",ret:"send{%1}",subTests:[
						"hairy beaker","werewolf fur","carpenter's pencil","blacksmith hammer","holiday cloth","marrow bone snack","crib mobile",
					]},
					//find send links and bodies normally. Do all links first, then do bodies, but do not use either here
					{link:"{%1}",ret:"send{%1}",subTests:materials},
					{body:"{%1}",ret:"send{%1}",subTests:materials},
				]},
//BOOSTS----------------------------------------------------------------------------
				{link:["corn boost"],ret:"boostcorn"},
				{link:["horseradish"],ret:"horseradish"},
				{body:["horse ready","horse boost"],ret:"boosthorse"},
				{body:"has saved a family of Panthers",ret:"masteryboost"},
				{body:"Give a White Lightning",ret:"whitelightning"},
				{body:"Calamity Jane shoot apples",ret:"boostchicken"},
				{ret:"boostapple",body:[
					"Johnny Appleseed plant and tend",		"Elsa McBaggins",
					"pair of pussy cats",				"McBagginses frontier munchies",
				]},
				{body:"storm with Cordwood Pete",ret:"sharpaxe"},
				{ret:"boostpig",body:["Silas McBaggins"]},
				{ret:"boostox",body:["helped Frontier Sam create an amazing Amphitheater"]},
				{ret:"boostcherry",body:[
					"Pa McBaggins",					"McBagginses' chest o' duds",
					"real straight shooter",			"secret to growing great cherries",
				]},
				{ret:"boostgoat",body:[
					"McBagginses' puppy",				"McBagginses' oxen",
					"Oink, Squealer & Stink",			
				]},
				{ret:"boostclover",body:["future of the McBaggins","McBaggins Family's pharmacy"]},
				{body:"just made a nice cup o' tea",ret:"energy5"},
				{ret:"boostcow",body:[
					"has put together an even better Amphitheater",
					"Belongs in a Kennel","most delectable chocolate treat basket"
				]},
				{ret:"boostunwither",body:[
					"Timmy's Fallen Down a Well",			"unwither boost",
					"unwither crop boost",				"has got a new hardwood",
				]},
				{body:"fast hands",ret:"boostfasthands"},
				{ret:"boostwitherprotect",body:"wither protection boost"},
				{ret:"boostacceleratecrops",body:"fertilizer beneath some buzzard"},

				{body:["helped get ready for their big first date"],ret:"boosthorse"},
				{body:["Bess into going on a date with that handsome Thunder Moon","hard to find Bess the perfect match"],ret:"boostcow"},
				{body:["is lookin' to set Bess up with the perfect ma"],ret:"boostsheep"},
				{body:["Flintlock collect some tokens of affection for his date","Bess' mind off her romantic whirlwind"],ret:"boostfasthands"},
				{body:["Bess on a date with Granny's nephew"],ret:"boostcorn"},

				{ret:"none",body:["boost"],kids:[
					{ret:"boost{%1}",body:"{%1}",subTests:[
						"lemon","orange","apricot","strawberry","melon","grapes","eggplant","wheat","peanut","flax","potato",
						"tomato","pineapple","badger","moose","chicken","cotton","animal","sheep","red rose","pink rose","ox","cow","goat",
						"horse","corn","clover","cherry","apple","goose","pig","peach","pear","sheep","choco-nut squash","white rose",
						"tomato pepper","peas","buffalo","cabbage","fig","zucchini","sunflower","blue corn","potato",
						"pumpkin"
					].optimize()}
				]},
				{ret:"boostfruit",body:["Cracked Open Gramp's Lost Crate"]},
//MATERIALS---------------------------------------------------------------------------
				{ret:"carnivalticket",body:["finished the game with the highest score"]},
				{body:["aloe crop","aloe"],ret:"aloevera"},
				{body:["Grab some Bull Thistle to make some Muscle Mix"],ret:"bullthistle"},
				{body:["finished the game with the highest score"],ret:"gameticket"},
				{body:["will do anything to help Bess find the right man"],ret:"warmingblanket"},
				{body:["why not start planting an attractive lawn"],ret:"freshgrass"},
				{body:["date with that dashingly mysterious Flintlock"],ret:"pinkrose"},
				{body:["Some folks need to learn how to park their wagons"],ret:"whiteoak"},
				{body:["Fully Grown Oak Tree"],ret:"oak2"},
				{body:"fully grown pine",ret:"pine2"},
				
				{body:["Werewolves rule and vampires drool","vants to suck joor blood"],ret:"wolfnutbutter"},
				{body:"Kid out to the ol' Fishin' Pond to catch up all sorts",ret:"fishhook"},
				{body:" seeds",ret:"none",kids:[				
					{body:"super {%1}",ret:"super{%1}",subTests:[
						"clover","corn","wheat","pineapple","strawberry","melon","rose","grape","potato",
						"tomato","eggplant","peanut","flax","pea"
					]},
				]},
				{body:"defeated the Ghost of Huge Hugh",ret:"spirit"},
				{body:"unlocked the Mansion!",ret:"charm"},
				{body:["has some leftover berries","hospital is now full of critters"],ret:"juicyberries"},
				{body:"is blowin' up the woods",ret:"powderkeg"},
				{body:"gettin' the outskirts of the homestead",ret:"varmintsurprise"},
				{body:"published a new edition",ret:"tool"},
				{ret:"randomdrink",body:[
					"Poker Pioneer",				"Poker Practitioner",
					"Poker Phenomenon",				"Poker Pro"
				]},
				{body:"calm down the Mysterious Stranger",ret:"fruitpunch"},
				{body:"fully-grown Pine Tree",ret:"pine2"},
				{body:"baked a bunch of Cherry Creamcakes",ret:"oak2"},
//XP---------------------------------------------------------------------------
				{ret:"xp0-24", body:[
					"sheep will be safe now",			"wanted to let you know they left",
					"earned from beaver-wrasslin",			"good time on the Pioneer",
					"Bess has the opportunity to find 'the one",
					"must be a natural at old-fashioned games of skill",
				]},
				{ret:"xp25-49", body:[
					"first FrontierVille adventure",		"Rich and powerful people",
					"crops - all nice an' legal-like",		"invited a schoolmarm",
					"homemade medicine cures",			"everything about sunflowers",
					"planted oaks and pines",			"a Spud Stud",
					"s Making Babies",				"building a Pony Express",
					"horse is now Level",				"just bought a new pony named",
					"got a brand-new dog",				"Extra! Extra!",
					"has tamed a baby bat",				"just got a brand-new cat",
					"helped make some dolls",			"rare Reindeer Prince",
					"has a wee little yeti",			"Bess will be happy with any one",
				]},
				{ret:"xp50-99", body:[
					"knocked a snake",				"scared a bear",
					"fowl watch was a good",			"got the post holes dug",
					"is Horsin' Around",				"Is that a heart on",
					"Bears ain't easy to scare",			"cleared some nasty prickers",
					"The game is afoot",				"Hank is impressing Fanny",
					"tamed a beautiful wild stallion",		"things nice and hot",
					"Happy birthday, kid",				"happy with the decorating experience",
					"just burned it down",				"Land Grant was stolen",
					"just smoked 'em out",				"saving a baby Mule from a mud pit",
					"has been plucked",				"go into business with",
					"whole new crop: cabbages",			"looking to have a fifth",
					"got some fine schoolin",			"wants to be a Jackalope",
					"Buildin' a Chapel of Love",			"Is it YOUR Grave",
					"has crafted some fine tools",			"finished the Pony Express",
					"visited by a Pony Express",			"Casual Clicker",
					"Sufficient Spender",				"Varmint Vandal",
					"Talented Teamwork",				"Rowdy Rancher",
					"Controlled Consumption",			"Dandy Decorator",
					"Cool Cultivator",				"Excellent Employer",
					"Easy Energy",					"Horseshoe Handler",
					"Naive Neighbor",				"Able Repeater",
					"Patient Player",				"Clever Trader",
					"Groundhog Menace",				"Decent Deliveries",
					"Coyote Tracker",				"Apprentice Feeder",
					"Accidental Veterinarian",			"Copper Private Eye",
					"Newsie badge",					"Helpful Donator",
					"Head of the Class",				"is makin' it rain",
					"Busy Barfly",					"is fixin' to win big",
					"gettin' a Dancing Bear",			"throwin' down on the frontier",
					"got a new crew member",			"needs your help on the Pioneer",
					"coop for the McBagginses",			"needs your help rebuilding a bridge",
					"help stuff dynamite into a pile",		"help putting out a wild fire",
					"lookin' fer some friends to git some restless ghosts",
					"Now you are ready to clean up your Ghost Town together",
					"stood up to the Headless Horseman and drove him away",
					"made a load of action-packed toy soldiers",	"is Artsy-Fartsy!",
					"makin' piles of wreaths",			"Holiday Hollow Crew is Growin",
					"steppin' up the good Samaritan factor",	"claim jumper won't be botherin",
					"Cattle Rustler won't be comin",		"Greedy Bandit won't be botherin",
					"has completed five Favors",			"has completed 20 Favors",
					"has completed 50 Favors",			"has completed 1000 Favors",
					"needs your help rebuilding a bridge",	"red-handed!", "Bess have a great time and had a great time",
					"has provided food for all the cowpokes",
					"has gotten the homestead all ready for the Great Cattle Drive",
				]},	
				{ret:"xp100-199", body:[
					"greased a groundhog",				"successfully united Fanny and Hank",
					"Frontier wisdom to share",			"getting bigger - the homestead",
					"evicted some freeloaders",			"solved an ENORMOUS mystery",
					"Poop Scoopin' Crew",				"needs a few clever Dicks",
					"a Critter Rescue Crew",			"new Snake Cannon is primed",
					"'s Retainin' Water",				"baked the cakes for an overseas",
					"a Real Packrat",				"Swimmin' Hole in a Storage Shed",
					"unlocked the \"Second Kid\"",			"looking to have a SIXTH",
					"candy is dandy",				"new general store manager",
					"fueled by Adonis DNA",				"#1 private dick",
					"Brand New Puppy",				"git along little doggies",
					"Help out at the barber shop",			"\"Unstoppable\" level",
					"around the Pony Express",			"knows the Pony Express",
					"Capricious Clicker",				"Crazy Clicker",
					"Super Spender",				"Sophisticated Spender",
					"Varmint Vanquisher",				"Varmint Vaporizer",
					"Thoughtful Teamwork",				"Thankful Teamwork",
					"Responsible Rancher",				"Respectable Rancher",
					"Crazy Consumption",				"Costly Consumption",
					"Delightful Decorator",				"Detailed Decorator",
					"Competent Cultivator",				"Clever Cultivator",
					"Engaging Employer",				"Exceptional Employer",
					"Edible Energy",				"Enormous Energy",
					"Horseshoe Honcho",				"Horseshoe Hustler",
					"Noble Neighbor",				"Needy Neighbor",
					"Stubborn Repeater",				"Amazing Repeater",
					"Proud Player",					"Passionate Player",
					"Cunning Trader",				"Wily Trader",
					"Groundhog Slayer",				"Groundhog Bane",
					"Hopeless Romantic",				"Delightful Deliveries",
					"Delightful Deliveries",			"Rotisserie Rancher",
					"Journeyman Feeder",				"Master Feeder",
					"Dedicated Veterinarian",			"Vigorous Veterinarian",
					"Silver Private Eye",				"Gold Private Eye",
					"Publishing Giant",				"Philanthropic Donator",
					"Daffy Digger",					"Teacher's Pet",
					"Bright-eyed Barback",				"dog is all growed up",
					"got animal instincts",				"blew up their Fireworks Stand",
					"servin' up mudbugs",				"bring yer rump roast",
					"scored high on the Pioneer Trail",		"some extra hands in the Chuck Wagon",
					"is calmin' the shaman",			"platinum gardener",
					"gold gardener",				"silver gardener",
					"bronze gardener",				"shared a Thanksgivin' feast with Hank and Fanny",
					"built an Energy Makin' Machine",		"helpin' Hank get ready for the big date",
					"ain't talkin' 'bout the weather",		"Those Feather Dusters done did the job",
					"Candles an' Cocoa!",				"been so tired lately, the neighbors are wonderin",
					"just built a right pretty swing",		"found all the Fool's Gold veins",
					"is needin' your help to build a shelter for a traveler they just came across",
					
				]},
				{ret:"xp200-499", body:[
					"becomin' a master farmer",			"visiting the Pony Express",
					"become a master farmer",			"loves Pony Express",
					"Courageous Clicker",				"Stunning Spender",
					"Varmint Vigilante",				"Terrific Teamwork",
					"Radical Rancher",				"Concentrated Consumption",
					"Devoted Decorator",				"Coordinated Cultivator",
					"Experienced Employer",				"Expensive Energy",
					"Horseshoe Hero",				"Noteworthy Neighbor",
					"Resolute Pioneer",				"Illustrious Repeater",
					"Perfect Player",				"Ingenious Trader",
					"Groundhog Conqueror",				"Starry-Eyed Romantic",
					"Daunting Deliveries",				"Supreme Feeder",
					"Virtuous Veterinarian",			"Platinum Private Eye",
					"Straight A Student",				"Best in Show",
					"Bubbly Bartender",				"Bodacious Barkeep",
					"McBaggins had a mighty fine Thankgiving",	"Farmer McDinkle had a proper Thanksgivin",
					"Burtons a mighty fine Thanksgiving",		"Bess found some great shoes",
					"Fanny needed a new outfit",			"With these new blankets, it's a wonder",
					"homestead's startin' to look mighty nice",	"homestead is startin' to look so nice",
					"made some cookies while their spouse took",	"an' family are enjoyin' Molten Cake",
					"is helpin' couples get closer",	"finished constructing a nursery for Hank's newborns",
					"and Stafford are building a Museum",
					"always keeps extra spurs and other",
				]},
				{ret:"xp500-999", body:[
					"Delirious Digger",				"Laughing Bear Family put on a Thanksgivin",
				]},
				{ret:"xp1000+", body:[
					"from Grandma's chicken soup",			"Exotic Vet",
				]},
//FOOD---------------------------------------------------------------------------
				{ret:"food0-24", body:[
					"laid in some food",				"homesteads and helped with the harvest",
					"smote a snake",				"land to make room for crops",
					"crops are ripe and ready",			"has its first cabin",
					"Snakes make good eatin",			"big profit on crops",
					"poppin down some serious",			"neighbors and tendin' their crops",
					"decided to open the school",			"plantin' a bumper crop of potatoes",
				]},
				{ret:"food25-49", body:[
					"clobbered a groundhog",			"enjoying a pleasant breakfast",
					"great care of the baby",			"putting the pie in the oven",
					"five servings of vegetables",			"ate two servings of fruit",
					"went varmint huntin",				"get goosed but good",
					"gettin' a bigger homestead",			"is a Food Snob",
					"This old thing?",				"merveilleux batch of rubaboo",
				]},
				{ret:"food50-99", body:[
					"blasted a bear",				"Wildcat is some passionate cook",
					"helping Hank impress Fanny",			"Fanny Wildcat in winning the heart of Bess",
					"three square meals",				"slithery cakes",
					"eatin' some tasty cabbage",			"your help making babies",
					"Farmhand is Durned Cute",			"in the Doghouse",
					"partied like a Jackalope",			"Tools are Seeing a Lot",
					"has a big package",				"Apprentice Harvester",
					"got new critters",
				]},
				{ret:"food100-199", body:[
					"caught the eye of Captain Flintlock",		"is a Frontier Foodie",
					"Got a Big Cannon",				"Juciest Meat in Town",
					"batter for a relative's wedding",		"basket for yet ANOTHER baby",
					"Old Dogs New Tricks",				"Mark on Your Homestead",
					"Saloon with a Duck",				"Journeyman Harvester",
					"Master Harvester",				"training a dog to hunt varmints",
					"taught a dog how to dig up debris",		"done finished up the Hoedown",
					
				]},
				{ret:"food200-499", body:[
					"some fine birch beer for",			"has been dancin' up a storm",
					"Supreme Harvester",				"groovin' out in the grove",
				]},
				{ret:"food500-999", body:[
				]},
				{ret:"food1000+", body:[
				]},
//WOOD---------------------------------------------------------------------------
				{ret:"wood0-24", body:[
					"ground for a new homestead",			"pruned their wood",
					"building a crib",				"fire to get you through the winter",
					"brand-spankin' new Doctor's",
				]},
				{ret:"wood25-49", body:[
					"made a comfy feather",
				]},
				{ret:"wood50-99", body:[
					"pulled up a ton of stumps",			"ready to build a sawmill",
					"wood on a daily basis",			"is making progress towards expanding the Homestead",
					"is Mooovin' on up",				"wants to be a good neighbor",
					"is Pumpin' Iron",
				]},
				{ret:"wood100-199", body:[
					"get Lt. Flinklock wet",
				]},
				{ret:"wood200-499", body:[
					"forest has been cleared",
				]},
				{ret:"wood500-999", body:[
				]},
				{ret:"wood1000+", body:[
				]},
//COINS---------------------------------------------------------------------------
				{ret:"coins0-24", body:[
					"is now Level",
				]},
				{ret:"coins25-49", body:[
					"is Highly Classified",
				]},
				{ret:"coins50-99", body:[
					"Fanny and Bess are really an item",		"Pigs in Blankets are the Bomb",
					"learning about bonus streaks",
				]},
				{ret:"coins100-199", body:[
					"finished decorating a lovely cabin",		"found a little lost sheep",
					"time to think about a spouse",			"wilderness at bay",
					"spouse just did some chores",			"neighbors' big animals satisfied",
					"family of teeny avatars",			"few trees with ribbon",
					"nailed the bed",				"Cold, Wet Nose",
					"found a chunk of coins",			"Ghosts Tremble at the Sight",
					"Acute Accumulation",				"purchased the special Kobe Cow",
					"Cub Reporter",					"Generous Donator",
					"Dapper Digger",				"News that Gives You Fits",
					"bright 'n' shiny bank",			"you a hot tip",
					"just finished plantin' Party Torches",		"ol' Uncle Sam swung",
					
				]},
				{ret:"coins200-499", body:[
					"flogged the hogs",				"everyone in the Spelling Bee",
					"bringin' home strangers",			"thinks bigger is better",
					"Size Matters!",				"Adequate Accumulation",
					"City Desk Editor",				"Lavish Donator",
					"Mortar Packer",
				]},
				{ret:"coins500-999", body:[
					"all there is to know 'bout chickens",		"Ample Accumulation",
					"Diligent Digger",				"Pyro Boss",
					
				]},
				{ret:"coins1000+", body:[
					"is a Canning Champ",//5000			"special supplies from Back East",//1000
					"Advanced Accumulation",			"Coyote Whisperer",
				]},
//CLOTH---------------------------------------------------------------------------
				{ret:"cloth10",body:[
					"trying to get a colossal",			"SIXTH new baby has arrived",
					"gettin' wrapped in silk",
				]},
				{ret:"cloth25",body:[
					"good lather for a shave",			"join a quartet",
					"wrapped in a hot towels",			"Grew a grand mustache",
					"is in the mood",
				]},
				{ret:"cloth5",body:[
					"Howling at the Moon",				"Flintlock have their hands full",
					"batch of chili for some trailside",
					"having lots of neighbors",			"readying some fancy duds",
					"new baby has arrived", //2,2,3,5
					"is a GIANT land owner",			"Wrapmaster",
					"keeps the wood dry",				"world-class trader",
					"Hank his proposin' suit",
				]},
//PRIZE TICKETS---------------------------------------------------------------------------
				{ret:"ticket5",body:[
					"tracking down kidnappers",			"cuddly critters out on the Trail",
					"is really diggin' the Pioneer",		"doctor is keepin' everybody healthy",
					"hunter bagged a big ol' turkey",		"flipped you the birdie",
					"out o' Beaver Valley",				"bridge over Beaver Creek",
					"departing the High Plains",			"gigantic wild fire in High Plains",
					"gatherin' on High Plains",			"restocked the McBaggins",
					"conquered the prairie dogs",			"blasted out of Avalanch",
					"buried alive on Avalanche",			"back on the Trail to Fort",
					"found a remedy for frostbite",			"thriving in Avalanche",
					"built a winter storm shelter",			"goin' ice fishin",
					"Trout-N-Berry Bisque",				"fought off a pack of hungry wolves",
					"caught off-guard on Avalanch",			"Pioneer Demolition Squad",
					"almost the main course",			"cuddlin' up to some wiley rascals",
					"has a pimped out wagon",			"fresh jug of apple squeez",
					"is sendin' love home",				"Lynxes in Avalanche",
					"got a little Swallowtail",			"met a big ol' sucker",
					"tryin' the local cuisine",			"chased a moth into the campfire",
					"Yee-Haw! We Did It!",
				]},
				{ret:"ticket1",body:[
					"built a blazin' campfire",			"jim-dandy campsite",
					"fixin' up the High Plains",			"McBaggins new shelter",
					"trade with Trader Bart!",			"asked for some Prize Tickets",
				]},
				{ret:"ticket2",body:[
					"wants you to pet this beaver",			"best hardwood around",
					"just loves that pie",				"thinks you're swell",
					"well an' savin' crops",
				]},
				{ret:"ticket3",body:[
					"levellin' up on the Pioneer",
				]},
//REPUTATION---------------------------------------------------------------------------
				{ret:"rep24", body:["exploding with love","is a regular swinger"]},
				{ret:"rep99", body:[
					"Fanny is a Stern Disciplinarian",		"Fanny Wildcat would",
					"has helped the chained ghost become free of his chains",
				]},
				{ret:"rep100", body:["Will Love You Tender"]},
//ANIMALS---------------------------------------------------------------------------
				{ret:"mummysheep",body:"poor Mummy Sheep"},
				{ret:"mummypig",body:"poor Mummy Pig"},
				{ret:"charredchipmunk",body:"poor Charred Chipmunk"},
				{ret:"burntbunny",body:"poor Burn Bunny"},
				{ret:"ghosthorse",body:"poor ghost horse"},
				
				{ret:"chicken", body:[
					"clobbered a fox",				"clobbered a coyote",
					"ways of the chicken business",			"showed those coyotes once and for all",
					"Pet of the Month",				"thinks you need a chick",
					"savin' a family's chicken coop",		"is one hot biscuit",
				]},
				{ret:"chococow",body:"made use of those Frontier skills to find tent making materials"},
				{body:"is willin' to give up their ass",ret:"brownmule"},
				{link:"calf",ret:"cow"},
				{body:"poor shy Spring Chinchilla",ret:"chinchillapink"},
				{body:"poor shy Spring Ferret",ret:"ferrettan"},
				{body:"poor shy Spring Bear Cub",ret:"bearcubbrown"},
				{body:"poor injured Robin",ret:"robinblack"},
				{body:"poor injured Quail",ret:"quailyellow"},
				{body:"poor injured Turtle",ret:"turtleblack"},
				{body:"poor injured black deer",ret:"deerblack"},
				{body:"poor injured mallard duck",ret:"duckmallard"},
				{body:"poor injured purple duck",ret:"duckpurple"},
				{body:"poor injured yellow duck",ret:"duckyellow"},
				{body:"poor ugly gorgeous swan",ret:"swangorgeous"},
				{body:"crafted Penny the Bullfrog a new banjo",ret:"greenfrog"},
//COLLECTIBLES---------------------------------------------------------------------------
				{body:"horses are all grown up and ready",ret:"peppermintcandy"},
				{body:"enormous number of pies",ret:"applepie"},
				{body:"Smoothing the Course of True",ret:"whiterosepetal"},
				{body:["Cupid for Bess and Fanny","taking candy from babies"],ret:"cherrycandy"},
				{body:"piggy poop to diagnose",ret:"piggypoop"},
				{body:"spying on foxes",ret:"foxcollection"},
				{body:"Gets Big by Clobbering Groundhogs",ret:"peapod"},
				{body:["fragged a fox","hatched a poopie plan"],ret:"prairiepile"},
				{body:"1, Groundhog 0",ret:"groundhogcollection"},
				{body:"has Cast Iron Balls",ret:"poopcollection"},
				{body:"s got Beef",ret:"groundchuck"},
				{body:["junk is better than your junk","got exceptional junk"],ret:"col"},
				{body:"butt look big",ret:"tailorshopcollection"},
				{body:"books on making babies",ret:"oldbook"},
				{body:"Rockin' the Oxen",ret:"ribeye"},
				{body:"ugly ol' toll troll",ret:"roadkill"},
				{body:["Frontier Family","Favorable Family"],ret:"familycollection"},
//DECOR---------------------------------------------------------------------------
				{body:"served up a pre-concert feast for the Wild Animal Band",ret:"banjo"},
				{body:"make a homestead look inviting",ret:"flowerpotrect"},
				{body:"seeking a sawmill site",ret:"cherrytree"},
				{link:"gimme an oak",ret:"oaktree"},
				{body:"is coming out of the weeds",ret:"pinetree"},
				{body:"Coyote Clobberer",ret:"barbedwire"},
				{body:"is gunnin' for you",ret:"floweringcactus"},
				{body:"finally found the Holiday Hogknocker",ret:"hogknockercrate"},
//MASS COLLECTION---------------------------------------------------------------------------------
				//do animals first because many special animals have mismatched link to body text, such as pig to white pig
				{link:animals,ret:"none",kids:[
					{body:"{%1}",ret:"{%1}",subTests:animals}
				]},

				//mass by-word collection MUST follow by-specific-text collection
				{link:"{%1}",ret:"{%1}",subTests:allWords},
				{body:"{%1}",ret:"{%1}",subTests:allWords},


			],

			menu: {
				section:{type:"section",label:"Pioneer Trail ("+version+")",kids:{
					updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/97984.user.js"},
					donatePT:{type:"link",label:"Donate for PT Sidekick via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=PTSK&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},
					sepbasics:{type:"separator",label:"Get Materials & Resources",kids:{
											
					tabbasics:{type:"tab",label:"Coins, Wood & Gifts",kids:{
						blockbasics:{type:"optionblock",label:"Basics",kids:{
							mysterygift:{type:"checkbox",label:"Mystery Gift"},
							carepkg:{type:"checkbox",label:"Care Package"},
							pokercard:{type:"checkbox",label:"Poker Card"},
						}},
						coinblock:{type:"optionblock",label:"Coins",kids:{
							"coins1000+":{type:"checkbox",label:"1000+"},
							"coins500-999":{type:"checkbox",label:"500-999"},
							"coins200-499":{type:"checkbox",label:"200-499"},
							"coins100-199":{type:"checkbox",label:"100-199"},
							"coins50-99":{type:"checkbox",label:"50-99"},
							"coins25-49":{type:"checkbox",label:"25-49"},
							"coins0-24":{type:"checkbox",label:"1-24"},
						}},
						woodblock:{type:"optionblock",label:"Wood",kids:{
							"wood1000+":{type:"checkbox",label:"1000+"},
							"wood500-999":{type:"checkbox",label:"500-999"},
							"wood200-499":{type:"checkbox",label:"200-499"},
							"wood100-199":{type:"checkbox",label:"100-199"},
							"wood50-99":{type:"checkbox",label:"50-99"},
							"wood25-49":{type:"checkbox",label:"25-49"},
							"wood0-24":{type:"checkbox",label:"1-24"},
						}},
						ticketblock:{type:"optionblock",label:"Prize Tickets",kids:{
							ticket5:{type:"checkbox",label:"5"},
							ticket3:{type:"checkbox",label:"3"},
							ticket2:{type:"checkbox",label:"2"},
							ticket1:{type:"checkbox",label:"1"},
							prizeticket:{type:"checkbox",label:"??"},
						}},
						doUnknown:{type:"checkbox",label:"Process Unknown Links"},
					}},

					tabxp:{type:"tab",label:"XP & Reputation",kids:{
						xpblock:{type:"optionblock",label:"XP",kids:{
							"xp1000+":{type:"checkbox",label:"1000+"},
							"xp500-999":{type:"checkbox",label:"500-999"},
							"xp200-499":{type:"checkbox",label:"200-499"},
							"xp100-199":{type:"checkbox",label:"100-199"},
							"xp50-99":{type:"checkbox",label:"50-99"},
							"xp25-49":{type:"checkbox",label:"25-49"},
							"xp0-24":{type:"checkbox",label:"1-24"},
						}},
						repblock:{type:"optionblock",label:"Reputation",kids:{
							rep100:{type:"checkbox",label:"100+"},
							rep99:{type:"checkbox",label:"25-99"},
							rep24:{type:"checkbox",label:"1-24"},
						}},
					}},
	
					tabfood:{type:"tab",label:"Food, Meals & Energy",kids:{
						foodblock:{type:"optionblock",label:"Food",kids:{
							"food1000+":{type:"checkbox",label:"1000+"},
							"food500-999":{type:"checkbox",label:"500-999"},
							"food200-499":{type:"checkbox",label:"200-499"},
							"food100-199":{type:"checkbox",label:"100-199"},
							"food50-99":{type:"checkbox",label:"50-99"},
							"food25-49":{type:"checkbox",label:"25-49"},
							"food0-24":{type:"checkbox",label:"1-24"},
						}},
						mealblock:{type:"optionblock",label:"Meals",kids:{
							snack:{type:"checkbox",label:"Light Snack"},
							breakfast:{type:"checkbox",label:"Breakfast"},
							lunch:{type:"checkbox",label:"Lunch"},				
							fries:{type:"checkbox",label:"Fries"},
							dinner:{type:"checkbox",label:"Dinner"},				
							icecreamsandwich:{type:"checkbox",label:"Ice Cream Sandwich"},				
							"7-course":{type:"checkbox",label:"7-Course Meal"},
							varmintsurprise:{type:"checkbox",label:"Varmint Surprise"},
							fancysteakdinner:{type:"checkbox",label:"Fancy Steak Dinner", newitem:true},
						}},
						energy5:{type:"checkbox",label:"5 Energy"},
						ration:{type:"checkbox",label:"Rations"},
						grub:{type:"checkbox",label:"Grub",backgroundColor:"gold",fontColor:"black"},
					}},

					tabmat:{type:"tab",label:"Materials & Goals",kids:{
						matblockbasic:{type:"optionblock",label:"Basics",kids:{
							brick:{type:"checkbox",label:"Bricks"},
							nail:{type:"checkbox",label:"Nails"},
							hammer:{type:"checkbox",label:"Hammers"},
							paintbucket:{type:"checkbox",label:"Paint"},
							handdrill:{type:"checkbox",label:"Drills"},
							cement:{type:"checkbox",label:"Cement"},
							mallet:{type:"checkbox",label:"Mallet"},
							peg:{type:"checkbox",label:"Pegs"},
							window:{type:"checkbox",label:"Window"},
							shingle:{type:"checkbox",label:"Shingles"},
							measuringtape:{type:"checkbox",label:"Measuring Tape"},
							level:{type:"checkbox",label:"Level"},
						}},
						matblockother:{type:"optionblock",label:"Other",kids:{
							metalbar:{type:"checkbox",label:"Metal Bar"},
							charteragreement:{type:"checkbox",label:"Charter Agreement"},
							prescription:{type:"checkbox",label:"Prescription"},
							glassvial:{type:"checkbox",label:"Glass Vial"},
							rivet:{type:"checkbox",label:"Rivets"},
							ropeandbucket:{type:"checkbox",label:"Rope and Bucket"},
							toolbox:{type:"checkbox",label:"Toolbox"},
							silo:{type:"checkbox",label:"Silo"},
							trinket:{type:"checkbox",label:"Inn Trinkets"},
							hotsauce:{type:"checkbox",label:"Hot Sauce"},
							mustangblanket:{type:"checkbox",label:"Mustang Blanket"},
							lariatweight:{type:"checkbox",label:"Lariat Weight"},
							canningjar:{type:"checkbox",label:"Canning Jar"},
							decorativepaper:{type:"checkbox",label:"Decorative Paper"},
							refinedironore:{type:"checkbox",label:"Refined Iron Ore"},
							nugget:{type:"checkbox",label:"Mysterious Nugget"},
							chocolateheart:{type:"checkbox",label:"Chocolate Heart"},
							hedgetrimmers:{type:"checkbox",label:"Hedge Trimmers"},
							
							leatherbinding:{type:"checkbox",label:"Leather Binding"},
							spinethreading:{type:"checkbox",label:"Spine Threading"},
							warmingblanket:{type:"checkbox",label:"Warming Blanket"},
							kittycoughsyrup:{type:"checkbox",label:"Kitty Cough Syrup"},
							frontieralmanac:{type:"checkbox",label:"Frontier Almanac"},
							sheepshampoo:{type:"checkbox",label:"Sheep Shampoo"},
						
							"tamin'treat":{type:"checkbox",label:"Tamin' Treat"},
							gamesticket:{type:"checkbox",label:"Games Ticket"},
							silverdart:{type:"checkbox",label:"Silver Dart"},
							"shootin'galleryduck":{type:"checkbox",label:"Shootin' Gallery Duck"},
							goldball:{type:"checkbox",label:"Gold Ball"},
							musclemix:{type:"checkbox",label:"Muscle Mix"},

							toughhandstonic:{type:"checkbox",label:"Tough Hands Tonic",newitem:true},

							thecropwhisperer:{type:"checkbox",label:"The Crop Whisperer",newitem:true},

							squirreldecoy:{type:"checkbox",label:"Squirrel Decoy",newitem:true},

							cattlelead:{type:"checkbox",label:"Cattle Lead",newitem:true},

							beefcakes:{type:"checkbox",label:"Beef Cakes",newitem:true},

							horseypunch:{type:"checkbox",label:"Horsey Punch",newitem:true},

							hardwater:{type:"checkbox",label:"Hard Water",newitem:true},
							coolinggel:{type:"checkbox",label:"Cooling Gel",newitem:true},

							binoculars:{type:"checkbox",label:"Binoculars",newitem:true},

							garlicnecklace:{type:"checkbox",label:"Garlic Necklace",newitem:true},
							chainbreaker:{type:"checkbox",label:"Chain Breaker",newitem:true},

							mummywrap:{type:"checkbox",label:"Mummy Wrap",newitem:true},

						}},
						matblockschool:{type:"optionblock",label:"School Supplies",kids:{
							chalk:{type:"checkbox",label:"Chalk"},
							spitball:{type:"checkbox",label:"Spitballs"},
							slate:{type:"checkbox",label:"Slates"},
							pen:{type:"checkbox",label:"Ink Pens"},
							ink:{type:"checkbox",label:"Ink Wells"},
						}},
						cropblock:{type:"optionblock",label:"Crops/Seeds",kids:{
							pumpkin:{type:"checkbox",label:"Pumpkin"},
							eggplant:{type:"checkbox",label:"Eggplant"},
							pinkrose:{type:"checkbox",label:"Pink Roses"},	
							whiterose:{type:"checkbox",label:"White Roses"},
							redrose:{type:"checkbox",label:"Red Roses"},	
							sugarcane:{type:"checkbox",label:"Sugar Cane"},	
							sugarplum:{type:"checkbox",label:"Sugar Plum"},	
							buttercorn:{type:"checkbox",label:"Buttercorn"},
							pinklily:{type:"checkbox",label:"Pink Lily"},	
							whiteorchid:{type:"checkbox",label:"White Orchid"},
							goldroseseed:{type:"checkbox",label:"Gold Rose"},
							poinsettia:{type:"checkbox",label:"Poinsettia"},
							"bloomin'agave":{type:"checkbox",label:"Bloomin Agave"},
							blazingstar:{type:"checkbox",label:"Blazing Star"},
							boysenberry:{type:"checkbox",label:"Boysenberry"},
							cantaloupe:{type:"checkbox",label:"Cantaloupe"},
							habaneroseeds:{type:"checkbox",label:"Habanero"},
							rhubarbseeds:{type:"checkbox",label:"Rhubarb"},
							yellowmustard:{type:"checkbox",label:"Yellow Mustard"},
							celeryseed:{type:"checkbox",label:"Celery"},
							kidneybeans:{type:"checkbox",label:"Kidney Beans"},
							cotton:{type:"checkbox",label:"Cotton"},
							chamomile:{type:"checkbox",label:"Chamomile"},
							pinkbeets:{type:"checkbox",label:"Pink Beets"},
							importedartichoke:{type:"checkbox",label:"Imported Artichoke"},
							horseradish:{type:"checkbox",label:"Horseradish"},
							cherrytomato:{type:"checkbox",label:"Cherry Tomato"},
							winegrapes:{type:"checkbox",label:"Wine Grapes"},
							marigold:{type:"checkbox",label:"Marigold"},
							aloevera:{type:"checkbox",label:"Aloe Vera"},
							redclover:{type:"checkbox",label:"Red Clover"},
							cavetruffle:{type:"checkbox",label:"Cave Truffle"},
							huckleberry:{type:"checkbox",label:"Huckleberry"},
							potatoseed:{type:"checkbox",label:"Potato"},
							corndog:{type:"checkbox",label:"Corn Dog"},
							bluecorn:{type:"checkbox",label:"Blue Corn"},
							honeydew:{type:"checkbox",label:"Honeydew"},
							freshgrass:{type:"checkbox",label:"Fresh Grass"},
							
							broccoli:{type:"checkbox",label:"Broccoli"},
							habanero:{type:"checkbox",label:"Habanero"},
							blueberry:{type:"checkbox",label:"Blueberry"},
							cottoncandy:{type:"checkbox",label:"Cotton Candy"},

							lemonmint:{type:"checkbox",label:"Lemon Mint"},
							basil:{type:"checkbox",label:"Basil"},
							spinach:{type:"checkbox",label:"Spinach"},
							bleedingheart:{type:"checkbox",label:"Bleeding Heart"},
							bullthistle:{type:"checkbox",label:"Bull Thistle"},

							frontierflower:{type:"checkbox",label:"Frontier Flower",newitem:true},
							sparklingrose:{type:"checkbox",label:"Sparkling Rose",newitem:true},
							
							catnip:{type:"checkbox",label:"Catnip",newitem:true},
							redhuckleberry:{type:"checkbox",label:"Red Huckleberry",newitem:true},

							marigold:{type:"checkbox",label:"Marigold"},

							blackbean:{type:"checkbox",label:"Black Bean",newitem:true},

							babycarrots:{type:"checkbox",label:"Baby Carrots",newitem:true},
							rye:{type:"checkbox",label:"Rye",newitem:true},
							redonion:{type:"checkbox",label:"Red Onion",newitem:true},

							barley:{type:"checkbox",label:"Barley",newitem:true},

							lavendercrop:{type:"checkbox",label:"Lavender",newitem:true},

							fiddleheadferns:{type:"checkbox",label:"Fiddlehead Ferns",newitem:true},
							dogviolet:{type:"checkbox",label:"Dog Violet",newitem:true},
							oatcrop:{type:"checkbox",label:"Oats",newitem:true},

							minipumpkin:{type:"checkbox",label:"Mini Pumpkin",newitem:true},
							ghostpumpkin:{type:"checkbox",label:"Ghost Pumpkin",newitem:true},
							ancientlily:{type:"checkbox",label:"Ancient Lily",newitem:true},

						}},
						superseedsblock:{type:"optionblock",label:"Super Seeds",kids:{
							supergrape:{type:"checkbox",label:"Grape"},
							superrose:{type:"checkbox",label:"Rose"},
							supermelon:{type:"checkbox",label:"Melon"},
							superstrawberry:{type:"checkbox",label:"Strawberry"},
							supercorn:{type:"checkbox",label:"Corn"},
							superwheat:{type:"checkbox",label:"Wheat"},
							superclover:{type:"checkbox",label:"Clover"},
							superpineapple:{type:"checkbox",label:"Pineapple"},
						}},
						matblockevents:{type:"optionblock",label:"Events",kids:{
							goldenhammer:{type:"checkbox",label:"Golden Hammers"},
							tarotcard:{type:"checkbox",label:"Tarot Card"},
							tricks:{type:"checkbox",label:"Tricks"},
							treats:{type:"checkbox",label:"Treats"},
							hogchow:{type:"checkbox",label:"Hog Chow"},
							towncoin:{type:"checkbox",label:"Town Coin"},
						}},
						matblockprospectfalls:{type:"optionblock",label:"Prospect Falls",backgroundColor:"gold",fontColor:"black", kids:{
							goldnugget:{type:"checkbox",label:"Gold Nugget"},
							roughsand:{type:"checkbox",label:"Rough Sand"},
							purewater:{type:"checkbox",label:"Pure Water"},
							fortifiedmilk:{type:"checkbox",label:"Fortified Milk"},
							silverwool:{type:"checkbox",label:"Silver Wool"},
							redwoodlog:{type:"checkbox",label:"Redwood Log"},
							goldenegg:{type:"checkbox",label:"Golden Egg"},
							moltenalloy:{type:"checkbox",label:"Molten Alloy"},
							acidicsludge:{type:"checkbox",label:"Acidic Sludge"},
							blasttube:{type:"checkbox",label:"Blast Tube"},
							dynamite:{type:"checkbox",label:"Dynamite"},
						}},

					}},

					tabcraft:{type:"tab",label:"Crafting Supplies",kids:{
						craftblock:{type:"optionblock",label:"Resources",kids:{
							ribbon:{type:"checkbox",label:"Ribbon"},
							tool:{type:"checkbox",label:"Tools"},
							fire:{type:"checkbox",label:"Fire"},
							downyfeather:{type:"checkbox",label:"Downy Feathers"},
							batter:{type:"checkbox",label:"Batter"},
							saltpeter:{type:"checkbox",label:"Salt Peter"},
							present:{type:"checkbox",label:"Present"},
							clothes:{type:"checkbox",label:"Clothes"},
							fancyclothes:{type:"checkbox",label:"Fancy Clothes"},
							pamphlet:{type:"checkbox",label:"Pamphlet"},
							cake:{type:"checkbox",label:"Cake"},
							coal:{type:"checkbox",label:"Coal"},
							powderkeg:{type:"checkbox",label:"Powder Keg"},
							silkthread:{type:"checkbox",label:"Silk Thread"},
							matches:{type:"checkbox",label:"Matches"},
							pyrotechnicstar:{type:"checkbox",label:"Pyrotechnic Stars"},
							landgrant:{type:"checkbox",label:"Land Grant"},
							potion:{type:"checkbox",label:"Potion"},
							spirit:{type:"checkbox",label:"Spirit"},
							hide:{type:"checkbox",label:"Hide"},
							wolfnutbutter:{type:"checkbox",label:"Wolfnut Butter"},
							vampirepotion:{type:"checkbox",label:"Vampire Potion"},
							bloodberryjuice:{type:"checkbox",label:"Bloodberry Juice"},
							sparklejuice:{type:"checkbox",label:"Sparkle Juice"},
							pineboard:{type:"checkbox",label:"Pine Board"},
							grassseed:{type:"checkbox",label:"Grass Seed"},
							usednails:{type:"checkbox",label:"Used Nails"},
							milkchocolate:{type:"checkbox",label:"Milk Chocolate"},
							candycane:{type:"checkbox",label:"Candy Cane"},
							firwood:{type:"checkbox",label:"Fir Wood"},
							decor:{type:"checkbox",label:"Decor"},
							gear:{type:"checkbox",label:"Gear"},
							cocoamilk:{type:"checkbox",label:"Cocoa Milk"},
							gunoil:{type:"checkbox",label:"Gun Oil"},
							bisonhorn:{type:"checkbox",label:"Bison Horn"},
							wigglyworm:{type:"checkbox",label:"Wiggly Worm"},

							frontierspirit:{type:"checkbox",label:"Frontier Spirit",newitem:true},
							rockhammer:{type:"checkbox",label:"Rock Hammer",newitem:true},
							unstampedticket:{type:"checkbox",label:"Unstamped Ticket",newitem:true},
							puppynutrients:{type:"checkbox",label:"Puppy Nutrients",newitem:true},
							supersoil:{type:"checkbox",label:"Super Soil",newitem:true},
							leatherpattern:{type:"checkbox",label:"Leather Pattern",newitem:true},
						}},
	
						clothblock:{type:"optionblock",label:"Cloth",kids:{
							cloth25:{type:"checkbox",label:"25+"},
							cloth10:{type:"checkbox",label:"6-24"},
							cloth5:{type:"checkbox",label:"1-5"},
						}},
						drinkingredsblock:{type:"optionblock",label:"Drinks",kids:{
							loyalpioneer:{type:"checkbox",label:"Loyal Pioneer"},
							mulekickmix:{type:"checkbox",label:"Mule Kick Mix"},
							greenlightning:{type:"checkbox",label:"Green Lightning"},
							quickdrawquaff:{type:"checkbox",label:"Quick Draw Quaff"},
							redeye:{type:"checkbox",label:"Red Eye"},
							"granny'sgutpunch":{type:"checkbox",label:"Granny's Gut Punch"},
							ragingbuffalo:{type:"checkbox",label:"Raging Buffalo"},
						}},
						drinkblock:{type:"optionblock",label:"Ingredients",kids:{
							oatsyrup:{type:"checkbox",label:"Oat Syrup"},
							varmintjuleps:{type:"checkbox",label:"Varmint Juleps"},
							"granny'sno.5":{type:"checkbox",label:"Granny's No. 5"},
							filteredwater:{type:"checkbox",label:"Filtered Water"},
							icedtea:{type:"checkbox",label:"Iced Tea"},
							firewater:{type:"checkbox",label:"Fire Water"},
							fruitpunch:{type:"checkbox",label:"Fruit Punch"},
							butterscotchtonic:{type:"checkbox",label:"Butterscotch Tonic"},
							afterburner:{type:"checkbox",label:"Afterburner"},
						}},
						randomdrink:{type:"checkbox",label:"Random Drink or Ingredient"},
					}},

					tabfeed:{type:"tab",label:"Pet Supplies",kids:{
						feedtypes:{type:"optionblock",label:"Supplies",kids:{
							crittermilk:{type:"checkbox",label:"Critter Milk"},
							fuzzyblanket:{type:"checkbox",label:"Fuzzy Blanket"},
							juicyberries:{type:"checkbox",label:"Juicy Berry"},
							chunkychow:{type:"checkbox",label:"Chunky Chow"},
							sardine:{type:"checkbox",label:"Sardine Snack"},
							carrotjuice:{type:"checkbox",label:"Carrot Juice"},
							ottermilk:{type:"checkbox",label:"Otter Milk"},
							candiedwalnuts:{type:"checkbox",label:"Candied Walnuts"},
							sugaredleaves:{type:"checkbox",label:"Sugared Leaves"},
							babybirdfood:{type:"checkbox",label:"Baby Bird Food"},
							crittersalve:{type:"checkbox",label:"Critter Salve",newitem:true},
							soothingserum:{type:"checkbox",label:"Soothing Serum",newitem:true},
							uncursecharm:{type:"checkbox",label:"Uncurse Charm",newitem:true},
						}},
					}},

					tabboosts:{type:"tab",label:"Boosts",kids:{
						boosttreeblock:{type:"optionblock",label:"Trees",kids:{
							boostapple:{type:"checkbox",label:"Apple Ready"},
							boostcherry:{type:"checkbox",label:"Cherry Ready"},
							boostpear:{type:"checkbox",label:"Pear Ready"},
							boostpeach:{type:"checkbox",label:"Peach Ready"},
							boostapricot:{type:"checkbox",label:"Apricot Ready"},
							boostlemon:{type:"checkbox",label:"Lemon Ready"},
							boostorange:{type:"checkbox",label:"Orange Ready"},
							boostfig:{type:"checkbox",label:"Fig Ready"},
							boostfasttrees:{type:"checkbox",label:"Accelerate Trees"},
							boostfruit:{type:"checkbox",label:"Fruit Ready"},
						}},
						boostcropblock:{type:"optionblock",label:"Crops",kids:{
							boostcabbage:{type:"checkbox",label:"Cabbage Ready"},
							boostclover:{type:"checkbox",label:"Clover Ready"},
							boosttomato:{type:"checkbox",label:"Tomato Ready"},
							boostwheat:{type:"checkbox",label:"Wheat Ready"},
							boostflax:{type:"checkbox",label:"Flax Ready"},
							boostpeas:{type:"checkbox",label:"Peas Ready"},
							boostpeanut:{type:"checkbox",label:"Peanut Ready"},
							boostclover:{type:"checkbox",label:"Clover Ready"},
							boostredrose:{type:"checkbox",label:"Red Rose Ready"},
							boostpinkrose:{type:"checkbox",label:"Pink Rose Ready"},
							boostwhiterose:{type:"checkbox",label:"White Rose Ready"},
							boostcorn:{type:"checkbox",label:"Corn Ready"},
							boostcotton:{type:"checkbox",label:"Cotton Ready"},
							boostgrapes:{type:"checkbox",label:"Grapes Ready"},
							booststrawberry:{type:"checkbox",label:"Strawberry Ready"},
							boostmelon:{type:"checkbox",label:"Melon Ready"},
							boosteggplant:{type:"checkbox",label:"Eggplant Ready"},
							boostpineapple:{type:"checkbox",label:"Pineapple Ready"},
							boosttomatopepper:{type:"checkbox",label:"Tomato-Pepper Ready"},
							"boostchoco-nutsquash":{type:"checkbox",label:"Choco-Nut Squash Ready"},
							boostzucchini:{type:"checkbox",label:"Zucchini Ready"},
							boostsunflower:{type:"checkbox",label:"Sunflower Ready"},
							boostpotato:{type:"checkbox",label:"Potato Ready"},
							boostpumpkin:{type:"checkbox",label:"Pumpkin Ready"},
							boostacceleratecrops:{type:"checkbox",label:"Accelerate Crops"},
							boostunwither:{type:"checkbox",label:"Unwither"},
							boostwitherprotect:{type:"checkbox",label:"Wither Protection"},
							pumpkinplumper:{type:"checkbox",label:"Pumpkin Plumper",newitem:true},
						}},
						boostanimblock:{type:"optionblock",label:"Animals",kids:{
							boostchicken:{type:"checkbox",label:"Chicken Ready"},
							boosthorse:{type:"checkbox",label:"Horse Ready"},
							boostpig:{type:"checkbox",label:"Pig Ready"},
							boostcow:{type:"checkbox",label:"Cow Ready"},
							boostgoat:{type:"checkbox",label:"Goat Ready"},
							boostgoose:{type:"checkbox",label:"Goose Ready"},
							boostmoose:{type:"checkbox",label:"Moose Ready"},
							boostsheep:{type:"checkbox",label:"Sheep Ready"},
							boostbuffalo:{type:"checkbox",label:"Buffalo Ready"},
							boostbadger:{type:"checkbox",label:"Badger Ready"},
							boostanimal:{type:"checkbox",label:"Animal Ready"},
							boostox:{type:"checkbox",label:"Ox Ready"},
						}},
						boostotherblock:{type:"optionblock",label:"Other",kids:{
							sharpaxe:{type:"checkbox",label:"Sharp Axe"},
							boostfasthands:{type:"checkbox",label:"Fast Hands"},
							speedyhands:{type:"checkbox",label:"Speedy Hands"},
							weddingcake:{type:"checkbox",label:"Wedding Cake"},
							whitelightning:{type:"checkbox",label:"White Lightning"},
							masteryboost:{type:"checkbox",label:"Mastery Boost"},
							triplemastery1hboost:{type:"checkbox",label:"Triple Mastery 1H Boost"},
							beefjerky:{type:"checkbox",label:"Beef Jerky"},
						}},
						boosthorseblock:{type:"optionblock",label:"Horse Treats",kids:{
							carrot:{type:"checkbox",label:"Carrot"},
							appletreat:{type:"checkbox",label:"Apple"},
							sugarcube:{type:"checkbox",label:"Sugar Cube"},
						}},
					}},

					//}},//end tabs

					}},//end separator
	
					animalseparator:{type:"separator",label:"Adopt Animals",kids:{

						chickenblock:{type:"optionblock",label:"Chickens",kids:{
							chicken:{type:"checkbox",label:"Chicken"},
							rhodeislandred:{type:"checkbox",label:"Rhode Island Red"},
						}},

						sheepblock:{type:"optionblock",label:"Sheep",kids:{
							sheep:{type:"checkbox",label:"Sheep"},
							greysheep:{type:"checkbox",label:"Grey Sheep"},
							blacksheep:{type:"checkbox",label:"Black Sheep"},
							mummysheep:{type:"checkbox",label:"Mummy Sheep",newitem:true},
						}},
		
						goatblock:{type:"optionblock",label:"Goats",kids:{
							goat:{type:"checkbox",label:"Goats"},
							whitegoat:{type:"checkbox",label:"White Goat"},
							blackgoat:{type:"checkbox",label:"Black Goat"},
							pygmygoat:{type:"checkbox",label:"Pygmy Goat"},
						}},

						pigblock:{type:"optionblock",label:"Pigs",kids:{
							pig:{type:"checkbox",label:"Pig"},
							whitepig:{type:"checkbox",label:"White Pig"},
							blackpig:{type:"checkbox",label:"Black Pig"},
							bronzepig:{type:"checkbox",label:"Bronze Pig"},
							mummypig:{type:"checkbox",label:"Mummy Pig",newitem:true},
						}},
		
						oxblock:{type:"optionblock",label:"Oxen",kids:{
							ox:{type:"checkbox",label:"Ox"},
							whiteox:{type:"checkbox",label:"White Ox"},
							redox:{type:"checkbox",label:"Red Ox"},
						}},

						cowblock:{type:"optionblock",label:"Cows",kids:{
							cow:{type:"checkbox",label:"Cow"},
							adultcow:{type:"checkbox",label:"Adult Cow",newitem:true},
							jerseycow:{type:"checkbox",label:"Jersey Cow"},
							blackcow:{type:"checkbox",label:"Black Cow"},
							loverlycow:{type:"checkbox",label:"Loverly Cow"},
							creamcow:{type:"checkbox",label:"Cream Cow"},
							pearlycow:{type:"checkbox",label:"Pearly Cow"},
							chococow:{type:"checkbox",label:"Chocolate Cow"},
						}},
		
						muleblock:{type:"optionblock",label:"Mules",kids:{
							mule:{type:"checkbox",label:"Mule"},
							whitemule:{type:"checkbox",label:"White Mule"},
							blackmule:{type:"checkbox",label:"Black Mule"},
							brownmule:{type:"checkbox",label:"Brown Mule"},
						}},

						horseblock:{type:"optionblock",label:"Horses",kids:{
							horse:{type:"checkbox",label:"Horse"},
							horsewhite:{type:"checkbox",label:"White Horse"},
							brownsockshorse:{type:"checkbox",label:"Brown Socks Horse"},
							ghosthorse:{type:"checkbox",label:"Ghost Horse"},
						}},

						duckblock:{type:"optionblock",label:"Ducks",kids:{
							duck:{type:"checkbox",label:"Duck"},
							duckpurple:{type:"checkbox",label:"Purple Duck"},
							duckyellow:{type:"checkbox",label:"Yellow Duck"},
							duckmallard:{type:"checkbox",label:"Mallard Duck"},
						}},

						gooseblock:{type:"optionblock",label:"Geese",kids:{
							goose:{type:"checkbox",label:"Goose"},
						}},

						swanblock:{type:"optionblock",label:"Swans",kids:{
							swanwhite:{type:"checkbox",label:"White Swan"},
							swanblack:{type:"checkbox",label:"Black Swan"},
							swanpink:{type:"checkbox",label:"Pink Swan"},
							swankiss:{type:"checkbox",label:"Kissing Swan"},
							swangorgeous:{type:"checkbox",label:"Ugly Duckling/Gorgeous Swan"},
						}},
	
						birdblock:{type:"optionblock",label:"Birds",kids:{
							robinblack:{type:"checkbox",label:"Spring Robin"},
							quailyellow:{type:"checkbox",label:"Spring Quail"},
						}},

						mooseblock:{type:"optionblock",label:"Moose",kids:{
							moose:{type:"checkbox",label:"Moose"},
							blackmoose:{type:"checkbox",label:"Black Moose"},
						}},

						otherblock:{type:"optionblock",label:"Other",kids:{
							lynx:{type:"checkbox",label:"Brown Lynx"},
							deerblack:{type:"checkbox",label:"Black Deer"},
							ferrettan:{type:"checkbox",label:"Spring Ferret"},
							whitebuffalo:{type:"checkbox",label:"White Buffalo"},
							bearcubbrown:{type:"checkbox",label:"Spring Bear Cub"},
							turtleblack:{type:"checkbox",label:"Black Turtle"},
							chinchillapink:{type:"checkbox",label:"Pink Chinchilla"},
							pregnantbunny:{type:"checkbox",label:"Pregnant Bunny"},
							greenfrog:{type:"checkbox",label:"Green Frog"},
							otter:{type:"checkbox",label:"Otter"},
							wildpup:{type:"checkbox",label:"Wild Pup"},
							pronghorn:{type:"checkbox",label:"Pronghorn"},
							babyhawk:{type:"checkbox",label:"Baby Hawk"},							
							raccoon:{type:"checkbox",label:"Raccoon"},							
							floppyfairhare:{type:"checkbox",label:"Floppy Fair Hare"},							

							canary:{type:"checkbox",label:"Canary",newitem:true},
							minercat:{type:"checkbox",label:"Miner Cat",newitem:true},

							charredchipmunk:{type:"checkbox",label:"Charred Chipmunk",newitem:true},
							burntbunny:{type:"checkbox",label:"Burnt Bunny",newitem:true},
							blackbearcub:{type:"checkbox",label:"Blackbear Cub",newitem:true},

						}},

						holidayanimalsblock:{type:"optionblock",label:"Holiday",kids:{
							holidaymouse:{type:"checkbox",label:"Holiday Mouse"},
							holidayrabbit:{type:"checkbox",label:"Holiday Rabbit"},
							forestfawn:{type:"checkbox",label:"Forest Fawn"},
							snowmole:{type:"checkbox",label:"Snow Mole"},
							snowshoechipmunk:{type:"checkbox",label:"Snowshoe Chipmunk"},
							holidayporcupine:{type:"checkbox",label:"Holiday Porcupine"},
						}},
					}},

					collectseparator:{type:"separator",label:"Get Collection Items",kids:{
						colblock:{type:"optionblock",label:"Known Specific Items",kids:{
							goatmilk:{type:"checkbox",label:"Goat Milk"},
							ribeye:{type:"checkbox",label:"Ribeye"},
							applepie:{type:"checkbox",label:"Apple Pie"},
							diary:{type:"checkbox",label:"Diary"},
							prairiepile:{type:"checkbox",label:"Prairie Pile"},
							peppermintcandy:{type:"checkbox",label:"Candy"},
							milk:{type:"checkbox",label:"Cow Milk"},
							oldbook:{type:"checkbox",label:"Old Book"},
							grainsack:{type:"checkbox",label:"Grain Sack"},
							hymnal:{type:"checkbox",label:"Hymnal"},
							cherrycandy:{type:"checkbox",label:"Cherry Candy"},
							groundchuck:{type:"checkbox",label:"Ground Chuck"},						
							snakefang:{type:"checkbox",label:"Snake Fangs"},
							skillet:{type:"checkbox",label:"Skillet"},
							saddle:{type:"checkbox",label:"Saddle"},
							hoofpick:{type:"checkbox",label:"Hoof Pick"},
							bearpelt:{type:"checkbox",label:"Bear Pelt"},
							bandage:{type:"checkbox",label:"Bandage"},
							mug:{type:"checkbox",label:"Frothy Mug"},
							goatstew:{type:"checkbox",label:"Goat Stew"},
							hoofpad:{type:"checkbox",label:"Hoof Pad"},
							"12redroses":{type:"checkbox",label:"12 Red Roses"},
							bearmeat:{type:"checkbox",label:"Bear Meat"},
							tips:{type:"checkbox",label:"Tips"},
							whiterosepetal:{type:"checkbox",label:"White Rose"},
							welcomemat:{type:"checkbox",label:"Welcome Mat"},
							beaverpelt:{type:"checkbox",label:"Beaver Pelt"},
							wormyapple:{type:"checkbox",label:"Wormy Apple"},
							globe:{type:"checkbox",label:"Globe"},
							bookstrap:{type:"checkbox",label:"Book Strap"},
							moneybag:{type:"checkbox",label:"Money Bag"},
							familyportrait:{type:"checkbox",label:"Family Portrait"},
							saltwatertaffy:{type:"checkbox",label:"Saltwater Taffy"},
							whoopiecushion:{type:"checkbox",label:"Whoopie Cushion"},
							popcornball:{type:"checkbox",label:"Popcorn Ball"},

						}},
						colblock2:{type:"optionblock",label:"Only Collection Name Known",kids:{
							groundhogcollection:{type:"checkbox",label:"Groundhog"},
							foxcollection:{type:"checkbox",label:"Fox"},
							tailorshopcollection:{type:"checkbox",label:"Tailor Shop"},
							familycollection:{type:"checkbox",label:"Family"},
							poopcollection:{type:"checkbox",label:"Poop"},
						}},

						col:{type:"checkbox",label:"Unknown Collectibles"},
					}},

					decorationseparator:{type:"separator",label:"Collect Decoration Items",kids:{
						decoblock:{type:"optionblock",label:"Decorations",kids:{
							stool:{type:"checkbox",label:"Stool"},
							loom:{type:"checkbox",label:"Loom"},
							barbedwire:{type:"checkbox",label:"Barbwire Fence"},
							trough:{type:"checkbox",label:"Feed Trough"},
							sledgehammer:{type:"checkbox",label:"Sledge Hammer"},
							path:{type:"checkbox",label:"Path"},
							lovelycard:{type:"checkbox",label:"Lovely Card"},
							canteen:{type:"checkbox",label:"Canteen"},
							rockinghorse:{type:"checkbox",label:"Rocking Horse"},
							rockingchair:{type:"checkbox",label:"Rocking Chair"},
							log:{type:"checkbox",label:"Log"},
							lovebirds:{type:"checkbox",label:"Love Birds"},
							stuffedgroundhog:{type:"checkbox",label:"Stuffed Groundhog"},
							goldchest:{type:"checkbox",label:"Gold Hope Chest"},
							floweringcactus:{type:"checkbox",label:"Flowering Cactus"},
							candycanefence:{type:"checkbox",label:"Candycane Fence"},
							sandbag:{type:"checkbox",label:"Sandbag"},
							floodpuddle:{type:"checkbox",label:"Flood Puddle"},
							festiveballoon:{type:"checkbox",label:"Festive Balloon"},
							childscarecrow:{type:"checkbox",label:"Child Scarecrow",newitem:true},
							"leaf-barrow":{type:"checkbox",label:"Leaf-barrow",newitem:true},
							fallflowerbed:{type:"checkbox",label:"Fall Flower Bed",newitem:true},
							cutebeartopiary:{type:"checkbox",label:"Cute Bear Topiary",newitem:true},
						}},
						functional:{type:"optionblock",label:"Functional Placeables",kids:{
							steelforge:{type:"checkbox",label:"Steel Forge"},
							brassforge:{type:"checkbox",label:"Brass Forge"},
							sievestation:{type:"checkbox",label:"Sieve Station",newitem:true},
						}},
						nonstandarddebris:{type:"optionblock",label:"Non-local Debris",kids:{
							wildlupine:{type:"checkbox",label:"Wild Lupine"},
							treeblackberry:{type:"checkbox",label:"Blackberry Bush"},
							saguaro:{type:"checkbox",label:"Saguaro Cactus"},
							lavender:{type:"checkbox",label:"Prairie Lavender"},
						}},
						pottedplants:{type:"optionblock",label:"Potted Plants",kids:{
							pansies:{type:"checkbox",label:"Pansies"},
							daisies:{type:"checkbox",label:"Daisies"},
							carnations:{type:"checkbox",label:"Carnations"},
							tulips:{type:"checkbox",label:"Tulips"},
							lily:{type:"checkbox",label:"Lilies"},
							iris:{type:"checkbox",label:"Iris"},
							pinklily:{type:"checkbox",label:"Pink Lily"},
							mixedtulip:{type:"checkbox",label:"Pink Orchid/Mixed Tulip"},
							poinsettia:{type:"checkbox",label:"Poinsettia"},
						}},
						decodebris:{type:"optionblock",label:"Debris",kids:{
							grass:{type:"checkbox",label:"Grass"},
							skull:{type:"checkbox",label:"Skull"},
							cactus:{type:"checkbox",label:"Cactus"},
							wildflowers:{type:"checkbox",label:"Wildflowers"},
							rock:{type:"checkbox",label:"Rocks"},
							thorns:{type:"checkbox",label:"Thorns"},
						}},
						woodlottrees:{type:"optionblock",label:"Woodlot",kids:{
							oaktree:{type:"checkbox",label:"Oak Sapling"},
							oak2:{type:"checkbox",label:"Oak Tree"},
							pinetree:{type:"checkbox",label:"Pine Sapling"},
							pine2:{type:"checkbox",label:"Pine Tree"},
							willowtree:{type:"checkbox",label:"Willow Sapling"},
							fullygrownwillow:{type:"checkbox",label:"Willow Tree",newitem:true},
							valleyoak:{type:"checkbox",label:"Valley Oak"},
							polepine:{type:"checkbox",label:"Pole Pine"},
							giantmadronetree:{type:"checkbox",label:"Giant Madrone Tree"},
							whiteoak:{type:"checkbox",label:"White Oak"},
							coloradopinyon:{type:"checkbox",label:"Colorado Pinyon",newitem:true},
						}},
						orchardtrees:{type:"optionblock",label:"Orchard",kids:{
							cherrytree:{type:"checkbox",label:"Cherry"},
							appletree:{type:"checkbox",label:"Apple"},
							peachtree:{type:"checkbox",label:"Peach"},
							whitepeachtree:{type:"checkbox",label:"White Peach"},
							peartree:{type:"checkbox",label:"Pear"},
							apricottree:{type:"checkbox",label:"Apricot"},
							peppermint:{type:"checkbox",label:"Peppermint"},
							persimmontree:{type:"checkbox",label:"Persimmon"},
							cocoatree:{type:"checkbox",label:"Cocoa"},
							pomegranatetree:{type:"checkbox",label:"Pomegranate"},
							sourcherrytree:{type:"checkbox",label:"Sour Cherry"},
							frozenorangetree:{type:"checkbox",label:"Frozen Orange"},
							spicebush:{type:"checkbox",label:"Spicebush"},
							northerbayberry:{type:"checkbox",label:"Northern Bayberry"},
							orangetree:{type:"checkbox",label:"Orange"},
							pricklypear:{type:"checkbox",label:"Prickly Pear"},
							blueberrybush:{type:"checkbox",label:"Blueberry Bush"},
							nectarinetree:{type:"checkbox",label:"Nectarine"},
							confettitree:{type:"checkbox",label:"Confetti"},
							partypoppertree:{type:"checkbox",label:"Party Popper"},
							starfruit:{type:"checkbox",label:"Starfruit"},
							lemontree:{type:"checkbox",label:"Lemon"},
							olivetree:{type:"checkbox",label:"Olive",newitem:true},
							greenappletree:{type:"checkbox",label:"Green Apple",newitem:true},
							lycheetree:{type:"checkbox",label:"Lychee",newitem:true},
							ghosttree:{type:"checkbox",label:"Ghost Tree",newitem:true},
						}},
						decocrates:{type:"optionblock",label:"Crates",kids:{
							hogknockercrate:{type:"checkbox",label:"Hogknocker Crate"},
							emporiummysterycrate:{type:"checkbox",label:"Emporium Mystery Crate"},
							ranchmysterycrate:{type:"checkbox",label:"Ranch Mystery Crate"},
							worksmysterycrate:{type:"checkbox",label:"Works Mystery Crate"},
							estatemysterycrate:{type:"checkbox",label:"Estate Mystery Crate"},
							resourcecrate:{type:"checkbox",label:"PF Resource Crate",fontColor:"black", backgroundColor:"gold"},
							holidaycrate:{type:"checkbox",label:"Holiday Crate"},
						}},
					}},

					helpseparator:{type:"separator",label:"Help Friends",kids:{
						sendall:{type:"checkbox",label:"Send ALL gifts on give item links? (or select individuals below)"},
						send:{type:"checkbox",label:"Send Unknown Items? (Already included in sendall)"},
						sendsnack:{type:"checkbox",label:"Send Light Snack"},

					sephomestead:{type:"separator",label:"Homestead",kids:{

						
						buildingMaterialsA:{type:"optionblock",label:"Building Materials A",kids:{
							sendbrick:{type:"checkbox",label:"Brick"},
							sendnail:{type:"checkbox",label:"Nails"},
							sendhammer:{type:"checkbox",label:"Hammers"},
							sendpaintbucket:{type:"checkbox",label:"Paint"},
							sendhanddrill:{type:"checkbox",label:"Drills"},
						}},
						bm1:{type:"optionblock",label:"Building Materials B",kids:{
							sendcement:{type:"checkbox",label:"Cement"},
							sendmallet:{type:"checkbox",label:"Mallet"},
							sendpeg:{type:"checkbox",label:"Pegs"},
							sendwindow:{type:"checkbox",label:"Window"},
							sendshingle:{type:"checkbox",label:"Shingles"},
						}},
						bm2:{type:"optionblock",label:"Building Materials C",kids:{
							sendelbowgrease:{type:"checkbox",label:"Elbow Grease"},
							sendmeasuringtape:{type:"checkbox",label:"Measuring Tape"},
							sendlevel:{type:"checkbox",label:"Level"},
							sendscrewdriver:{type:"checkbox",label:"Screwdriver"},
							sendscrapmetal:{type:"checkbox",label:"Scrap Metal"},
							"sendcarpenter'spencil":{type:"checkbox",label:"Carpenter Pencil"},
						}},
						bm3:{type:"optionblock",label:"Documents/Other",kids:{
							sendsurveyauthorization:{type:"checkbox",label:"Survey Authorization"},
							sendinsurancewaiver:{type:"checkbox",label:"Insurance Waiver"},
							sendjackalopersvp:{type:"checkbox",label:"RSVP"},
							sendcharteragreement:{type:"checkbox",label:"Charter Agreement"},
							sendshippinglabel:{type:"checkbox",label:"Shipping Label"},
							sendmilkbucket:{type:"checkbox",label:"Milking Bucket"},
							sendbraidingribbon:{type:"checkbox",label:"Braiding Ribbon"},
							sendcanningjar:{type:"checkbox",label:"Canning Jar"},
							sendblastingpowder:{type:"checkbox",label:"Blasting Powder"},
							sendwildberries:{type:"checkbox",label:"Wild Berries"},
						}},
						docs:{type:"optionblock",label:"School Supplies",kids:{
							sendspitball:{type:"checkbox",label:"Spitballs"},
							sendchalk:{type:"checkbox",label:"Chalk"},
							sendslate:{type:"checkbox",label:"Slates"},
							sendpen:{type:"checkbox",label:"Ink Pens"},
							sendink:{type:"checkbox",label:"Ink Wells"},
						}},
						generalstore:{type:"optionblock",label:"General Store",kids:{
							sendbins:{type:"checkbox",label:"Bins"},
							sendbuildingplan:{type:"checkbox",label:"Plans"},
							sendshelves:{type:"checkbox",label:"Shelves"},
						}},
						tradingpost:{type:"optionblock",label:"Trading Post",kids:{
							sendtradingposttile:{type:"checkbox",label:"Tile"},
							sendtradingpostawl:{type:"checkbox",label:"Awl"},
							sendtradingpostbeam:{type:"checkbox",label:"Beam"},
						}},
						babystuff:{type:"optionblock",label:"Baby Stuff",kids:{
							sendbabyclothes:{type:"checkbox",label:"Baby Clothes"},
							sendbabyname:{type:"checkbox",label:"Baby Names"},
							sendcabbageseed:{type:"checkbox",label:"Cabbage Seeds"},
						}},
						tailorshop:{type:"optionblock",label:"Tailor Shop",kids:{
							sendmeasurement:{type:"checkbox",label:"Measurements"},
							sendhanger:{type:"checkbox",label:"Hangers"},
						}},
						barbershop:{type:"optionblock",label:"Barber Shop",kids:{
							sendsink:{type:"checkbox",label:"Sink"},
							sendplaster:{type:"checkbox",label:"Plaster"},
							sendspackle:{type:"checkbox",label:"Spackle"},
							sendshavinglather:{type:"checkbox",label:"Shaving Lather"},
						}},
						graveyard:{type:"optionblock",label:"Graveyard",kids:{
							sendwoodencoffin:{type:"checkbox",label:"Wooden Coffin"},
							sendgraveflower:{type:"checkbox",label:"Grave Flower"},
							sendbeeswaxcandle:{type:"checkbox",label:"Wax Candle"},
						}},
						weddingchapel:{type:"optionblock",label:"Wedding Chapel",kids:{
							sendhope:{type:"checkbox",label:"Hope"},
							senddreams:{type:"checkbox",label:"Dreams"},
							sendwishes:{type:"checkbox",label:"Wishes"},
							sendpavingstone:{type:"checkbox",label:"Paving Stone"},
							sendtriangle:{type:"checkbox",label:"Triangle"},
						}},
						residents:{type:"optionblock",label:"Residents Series",kids:{
							sendmilkingstool:{type:"checkbox",label:"Milking Stool"},
							"sendself-helpbook":{type:"checkbox",label:"Self-Help Book"},
							sendbirchbark:{type:"checkbox",label:"Birch Bark"},
							sendjigs:{type:"checkbox",label:"Jig Music"},
						}},
						ponyexpress:{type:"optionblock",label:"Pony Express",kids:{
							sendbagofgravel:{type:"checkbox",label:"Gravel"},
							sendmolding:{type:"checkbox",label:"Molding"},
							sendwhitewash:{type:"checkbox",label:"Whitewash"},
							sendstamproll:{type:"checkbox",label:"Stamp Roll"},
						}},
						expansions:{type:"optionblock",label:"Expansion Series",kids:{
							sendwagontrailer:{type:"checkbox",label:"Wagon Trailer"},
							sendglue:{type:"checkbox",label:"Glue"},
							sendrecommendation:{type:"checkbox",label:"Recommendation"},
							sendscoutingpermit:{type:"checkbox",label:"Scouting Permit"},
							sendbeartrap:{type:"checkbox",label:"Bear Trap"},
							sendhomesteadlayoutplans:{type:"checkbox",label:"Homestead Layout Plans"},

							sendsnare:{type:"checkbox",label:"Snare"},
							sendexpansionpermit:{type:"checkbox",label:"Expansion Permit"},
							sendsignature:{type:"checkbox",label:"Volunteer Signature"},

						}},
						groundhogtrap:{type:"optionblock",label:"Groundhog Trap",kids:{
							sendswingrope:{type:"checkbox",label:"Rope"},
							sendtinsheet:{type:"checkbox",label:"Tin Sheet"},
							sendscrew:{type:"checkbox",label:"Screws"},
							sendbait:{type:"checkbox",label:"Bait"},
							sendgroundhogdecoy:{type:"checkbox",label:"Decoy"},
						}},
						romances:{type:"optionblock",label:"Romance Series",kids:{
							sendbearhug:{type:"checkbox",label:"Bear Hug"},
							sendloveletter:{type:"checkbox",label:"Love Letters"},
							sendloveballad:{type:"checkbox",label:"Love Ballad"},
							"sendbody-buildingmagazine":{type:"checkbox",label:"Body-building Magazine"},
							sendcharmbracelet:{type:"checkbox",label:"Bracelet"},
							sendsilverneedle:{type:"checkbox",label:"Silver Needle"},
							"sendwhittlin'knife":{type:"checkbox",label:"Whittling Knife"},
							sendsilverware:{type:"checkbox",label:"Silverware"},
						}},
						chickencoop:{type:"optionblock",label:"Chicken Coop",kids:{
							sendposter:{type:"checkbox",label:"Coyote Poster"},
							sendchickenwire:{type:"checkbox",label:"Chicken Wire"},
							sendrabbitsteak:{type:"checkbox",label:"Bunny Steak"},
							sendarrowhead:{type:"checkbox",label:"Turq Arrowhead"},
						}},
						hospital:{type:"optionblock",label:"Hospital",kids:{
							sendglassvial:{type:"checkbox",label:"Glass Vial"},
							sendprescription:{type:"checkbox",label:"Prescription"},
							sendhospitalbed:{type:"checkbox",label:"Hospital Bed"},
							sendantiseptic:{type:"checkbox",label:"Antiseptic"},
							sendmask:{type:"checkbox",label:"Mask"},
						}},
						flowershop:{type:"optionblock",label:"Flower Shop",kids:{
							sendplanterbox:{type:"checkbox",label:"Planter Box"},
							sendfertilizer:{type:"checkbox",label:"Fertilizer"},
							sendhandrake:{type:"checkbox",label:"Hand Rake"},
						}},
						blacksmith:{type:"optionblock",label:"Blacksmith",kids:{
							sendjunkmetal:{type:"checkbox",label:"Junk Metal"},
							sendrivet:{type:"checkbox",label:"Rivet"},
							sendashdump:{type:"checkbox",label:"Ash Dump"},
							sendironore:{type:"checkbox",label:"Iron Ore"},
							sendblacksmithhammer:{type:"checkbox",label:"Smithy Hammer"},
							sendblacksmithapron:{type:"checkbox",label:"Smithy Apron"},
						}},
						detective:{type:"optionblock",label:"Detective",kids:{
							sendcurtain:{type:"checkbox",label:"Curtain"},
							senddesk:{type:"checkbox",label:"Desk"},
							sendlargehinge:{type:"checkbox",label:"Hinge"},
							sendmissingpersonsposter:{type:"checkbox",label:"Missing Poster"},
							senddecoderring:{type:"checkbox",label:"Decoder Ring"},
							sendfalsemustache:{type:"checkbox",label:"False Mustache"},
						}},
						doghouse:{type:"optionblock",label:"Dog House",kids:{
							sendchunkychow:{type:"checkbox",label:"Chunky Chow"},
							senddogbone:{type:"checkbox",label:"Dog Bone"},
							senddogdoor:{type:"checkbox",label:"Dog Door"},
							senddogblanket:{type:"checkbox",label:"Dog Blanket"},
							sendscrubbrush:{type:"checkbox",label:"Scrub Brush"},
						}},
						animalrescue:{type:"optionblock",label:"Animal Rescue",kids:{
							sendcrittermilk:{type:"checkbox",label:"Critter Milk"},
							sendfuzzyblanket:{type:"checkbox",label:"Fuzzy Blanket"},
							sendjuicyberries:{type:"checkbox",label:"Juicy Berry"},
							sendpottypaper:{type:"checkbox",label:"Potty Paper"},
							sendsardine:{type:"checkbox",label:"Sardine Snack"},
							sendcarrotjuice:{type:"checkbox",label:"Carrot Juice"},
						}},

						horsestable:{type:"optionblock",label:"Corral",kids:{
							sendhaynet:{type:"checkbox",label:"Hay Net"},
							sendsaltlick:{type:"checkbox",label:"Salt Lick"},
							sendhorsebedding:{type:"checkbox",label:"Horse Bedding"},
							sendhorseblanket:{type:"checkbox",label:"Horse Blanket"},
							sendstonegrit:{type:"checkbox",label:"Stone Grit"},
							sendmountingblock:{type:"checkbox",label:"Mounting Block"},
							sendgroundpole:{type:"checkbox",label:"Ground Pole"},
							sendtrailmarker:{type:"checkbox",label:"Trail Marker"},
							sendleathersquare:{type:"checkbox",label:"Leather Square"},
						}},
		
						newsstand:{type:"optionblock",label:"News Stand",kids:{
							sendshockingphoto:{type:"checkbox",label:"Shocking Photo"},
							sendweatherreport:{type:"checkbox",label:"Weather Report"},
							sendbreakingnews:{type:"checkbox",label:"Breaking News"},
							sendnewsprint:{type:"checkbox",label:"Newsprint"},
						}},

						cabinexp:{type:"optionblock",label:"Ponderosa Lodge",kids:{
							sendbanister:{type:"checkbox",label:"Banister"},
							sendelegantpainting:{type:"checkbox",label:"Elegant Painting"},
							sendplunger:{type:"checkbox",label:"Throne Plunger"},
						}},

						petshop:{type:"optionblock",label:"Pet Shop",kids:{
							sendscratchingpost:{type:"checkbox",label:"Scratching Post"},
							sendaquarium:{type:"checkbox",label:"Aquarium"},
							sendlitterbox:{type:"checkbox",label:"Litter Box"},
							sendmarrowbonesnack:{type:"checkbox",label:"Marrow Bone Snack"},
							sendpetcrate:{type:"checkbox",label:"Pet Crate"},
						}},

						well:{type:"optionblock",label:"Well",kids:{
							senddowsingrod:{type:"checkbox",label:"Dowsing Rod"},
							sendpulley:{type:"checkbox",label:"Pulley"},
							sendhandcrank:{type:"checkbox",label:"Hand Crank"},
						}},

						otTeaser:{type:"optionblock",label:"Oregon Trail Teasers/Mc Baggins",kids:{
							sendsnakebitekit:{type:"checkbox",label:"Snake Bite Kit"},
							senddeadbugs:{type:"checkbox",label:"Dead Bugs"},
							sendgnawedbone:{type:"checkbox",label:"Gnawed Bone"},
							"sendprospectin'gear":{type:"checkbox",label:"Prospecting Gear"},
							sendheavyboots:{type:"checkbox",label:"Heavy Boots"},				
						}},

						kennel:{type:"optionblock",label:"Kennel",kids:{
							sendscrubbrush:{type:"checkbox",label:"Scrub Brush"},
							sendwags:{type:"checkbox",label:"Wags"},
							sendmuddypaw:{type:"checkbox",label:"Muddy Paws"},
							sendstuffedrabbit:{type:"checkbox",label:"Stuffed Rabbits"},
							sendhuntingpermit:{type:"checkbox",label:"Hunting Permit"},
							sendherdingpermit:{type:"checkbox",label:"Herding Permit"},
							senddiggingpermit:{type:"checkbox",label:"Digging Permit"},
						}},

						lspen:{type:"optionblock",label:"Livestock Pen",kids:{
							sendwoodenpost:{type:"checkbox",label:"Wooden Post"},
							sendwovenwire:{type:"checkbox",label:"Woven Wire"},
							sendfeedtrough:{type:"checkbox",label:"Feed Trough"},
							sendgoathat:{type:"checkbox",label:"Goat Hat"},
						}},

						ftcourage:{type:"optionblock",label:"Fort Courage",kids:{
							sendrustyfaucet:{type:"checkbox",label:"Rusty Faucet"},
							sendbathrobe:{type:"checkbox",label:"Bath Robe"},
							sendtowelrack:{type:"checkbox",label:"Towel Rack"},
							sendsoapdish:{type:"checkbox",label:"Soap Dish"},
						}},

						saloon:{type:"optionblock",label:"Saloon & Poker Table",kids:{
							sendcueball:{type:"checkbox",label:"Cue Ball"},
							sendluckydice:{type:"checkbox",label:"Lucky Dice"},
							sendbarstool:{type:"checkbox",label:"Barstool"},
							sendbartendingguide:{type:"checkbox",label:"Bartendering Guide"},
							sendoatsyrup:{type:"checkbox",label:"Oat Syrup"},
							sendicedtea:{type:"checkbox",label:"Iced Tea"},
							sendfilteredwater:{type:"checkbox",label:"Filtered Water"},
							sendmulekickmix:{type:"checkbox",label:"Mule Kick Mix"},
							sendgreenfelt:{type:"checkbox",label:"Green Felt"},
							sendmarker:{type:"checkbox",label:"Marker"},
							sendiou:{type:"checkbox",label:"IOU"},
							sendfirewater:{type:"checkbox",label:"Fire Water"},
							sendfruitpunch:{type:"checkbox",label:"Fruit Punch"},
							"sendgranny'sno.5":{type:"checkbox",label:"Granny's No. 5"},
							senddealingbox:{type:"checkbox",label:"Dealing Box"},
						}},


						orchard:{type:"optionblock",label:"Orchard",kids:{
							sendpruner:{type:"checkbox",label:"Pruner"},
							sendfencing:{type:"checkbox",label:"Fencing"},
							sendinsectspray:{type:"checkbox",label:"Insect Spray"},
							sendfruitdecal:{type:"checkbox",label:"Fruit Decal"},
							sendspringwater:{type:"checkbox",label:"Spring Water"},
						}},

						bigbarn:{type:"optionblock",label:"Big Barn",kids:{
							sendstablestall:{type:"checkbox",label:"Stable Stall"},
							sendsilo:{type:"checkbox",label:"Barn Silo"},
							sendmuckboots:{type:"checkbox",label:"Muck Boots"},
						}},

						fannywedding:{type:"optionblock",label:"Fanny's Wedding",kids:{
							sendsilvercandle:{type:"checkbox",label:"Silver Candle"},
							sendcloth:{type:"checkbox",label:"Cloth"},
							sendredrosebud:{type:"checkbox",label:"Red Rosebuds"},
							sendgempolisher:{type:"checkbox",label:"Gem Polisher"},
							sendshears:{type:"checkbox",label:"Shears"},
							sendsaddleoil:{type:"checkbox",label:"Saddle Oil"},
							sendboxofsweets:{type:"checkbox",label:"Box of Sweets"},

							sendengagementpresent:{type:"checkbox",label:"Engagement Present"},
							sendsequin:{type:"checkbox",label:"Sequins"},
							sendsilverbell:{type:"checkbox",label:"Silver Bells"},
							sendruffles:{type:"checkbox",label:"Ruffles"},
							sendweddinginvitation:{type:"checkbox",label:"Wedding Invitation"},
							sendwhitelinen:{type:"checkbox",label:"White Linen"},
							sendsilkthread:{type:"checkbox",label:"Silk Thread"},
							sendsilverbutton:{type:"checkbox",label:"Silver Buttons"},
							sendribbon:{type:"checkbox",label:"Ribbon"},
							sendsilver:{type:"checkbox",label:"Silver"},
	
							sendjewelry:{type:"checkbox",label:"Jewelry"},
							sendblackvelvet:{type:"checkbox",label:"Black Velvet"},
							sendgoldleaf:{type:"checkbox",label:"Gold Leaf"},
							sendweddingcake:{type:"checkbox",label:"Wedding Cake"},
							sendweddingfavor:{type:"checkbox",label:"Wedding Favor"},
							sendeternity:{type:"checkbox",label:"Eternity"},
							sendsugarrose:{type:"checkbox",label:"Sugar Roses"},
							sendflour:{type:"checkbox",label:"Flour"},
						}},

						campsite:{type:"optionblock",label:"Pioneer Campsite",kids:{
							sendtentstake:{type:"checkbox",label:"Tent Stake"},
							sendscarycampfirestory:{type:"checkbox",label:"Scary Campfire Story"},
							sendweenie:{type:"checkbox",label:"Weenie"},
							sendpreservingsalt:{type:"checkbox",label:"Preserving Salt"},
							sendstinkyherbs:{type:"checkbox",label:"Stinky Herbs"},
							sendshippingmanifest:{type:"checkbox",label:"Shipping Manifest"},
						}},

						rodeo:{type:"optionblock",label:"Rodeo",kids:{
							sendclownchaps:{type:"checkbox",label:"Chaps"},
							sendbarrel:{type:"checkbox",label:"Barrel"},
							senddirt:{type:"checkbox",label:"Dirt"},
							sendchute:{type:"checkbox",label:"Chute"},
							sendrodeoflag:{type:"checkbox",label:"Go-Go Flag"},
							sendbroncotonic:{type:"checkbox",label:"Bronco Tonic"},
							sendrodeoposter:{type:"checkbox",label:"Poster"},
						}},

						fowlpond:{type:"optionblock",label:"Fowl Pond",kids:{
							sendpondscumkit:{type:"checkbox",label:"Pond Skum Kit"},
							sendgreenalgae:{type:"checkbox",label:"Green Algae"},
							"sendpre-formedpond":{type:"checkbox",label:"Pre-formed Pond"},
						}},


						fireworksstand:{type:"optionblock",label:"Fireworks Stand",kids:{
							sendpyrotechnicstar:{type:"checkbox",label:"Pyrotechnic Stars"},
							sendmatches:{type:"checkbox",label:"Matches"},
							sendliftcharge:{type:"checkbox",label:"Lift Charges"},
							sendbanner:{type:"checkbox",label:"Banner"},
							sendscrapwood:{type:"checkbox",label:"Scrap Wood"},
							sendsmallflag:{type:"checkbox",label:"Small Flag"},
						}},

						still:{type:"optionblock",label:"Still",kids:{
							sendhotcoal:{type:"checkbox",label:"Hot Coals"},
							sendpotbellystove:{type:"checkbox",label:"Pot Belly Stove"},
							"sendhairo'thedog":{type:"checkbox",label:"Dog Hair"},
							sendbutterscotchtonic:{type:"checkbox",label:"Butterscotch Tonic"},
							sendfunnel:{type:"checkbox",label:"Funnel"},
							sendgroundhogguts:{type:"checkbox",label:"Gopher Guts"},
						}},

						otTeaser2:{type:"optionblock",label:"Oregon Trail Teasers/Hammer Forge",kids:{					
							sendbuckshotball:{type:"checkbox",label:"Buckshot Balls"},
							sendmedicaldegree:{type:"checkbox",label:"Medical Degree"},
							sendgoldenhammer:{type:"checkbox",label:"Golden Hammer"},
							sendforgechain:{type:"checkbox",label:"Forge Chain"},
							sendforgehinge:{type:"checkbox",label:"Forge Hinge"},
							sendforgegear:{type:"checkbox",label:"Forge Gear"},
						}},

						otTeaser3:{type:"optionblock",label:"Oregon Trail Teasers/Music Video & Hoedown",kids:{					
							sendhoedownbanjo:{type:"checkbox",label:"Banjo"},
							"sendtootin'jug":{type:"checkbox",label:"Jug"},
							sendbluegrasssongbook:{type:"checkbox",label:"Songbook"},
							"sendcookin'gear":{type:"checkbox",label:"Cookin' Gear"},
						}},

						animalhospital:{type:"optionblock",label:"Hospital Upgrade/Animal Hospital",kids:{					
							sendstethoscope:{type:"checkbox",label:"Stethoscope"},
							sendhypodermicneedle:{type:"checkbox",label:"Hypodermic Needle"},
							sendanatomybook:{type:"checkbox",label:"Animal Anatomy Book"},
							sendmedicalscale:{type:"checkbox",label:"Medical Scale"},
						}},

						innupgrade:{type:"optionblock",label:"Inn Upgrade",kids:{					
							sendcomfybed:{type:"checkbox",label:"Bed"},
							sendguestbooksignature:{type:"checkbox",label:"Guestbook Signature"},
							sendsnugglyblanket:{type:"checkbox",label:"Blanket"},
						}},

						honeymoon:{type:"optionblock",label:"Yosemite Honeymoon",kids:{					
							sendbait:{type:"checkbox",label:"Bait"},
							sendflaxrope:{type:"checkbox",label:"Flax Rope"},
							sendsheetsteel:{type:"checkbox",label:"Sheet Steel"},
							sendstagecoachticket:{type:"checkbox",label:"Stagecoach Ticket"},
						}},

						questathon:{type:"optionblock",label:"Quest-a-thon",kids:{					
							sendwatercanteen:{type:"checkbox",label:"Canteen"},
							senddoggietreat:{type:"checkbox",label:"Dog Treat"},
							senddoggietoy:{type:"checkbox",label:"Dog Toy"},
							sendbarnnail:{type:"checkbox",label:"Barn Nail"},
							sendhaybundle:{type:"checkbox",label:"Hay Bundle"},
							sendcinnamonstick:{type:"checkbox",label:"Cinnamon Stick"},
							sendbotanytrowel:{type:"checkbox",label:"Botany Trowel"},
							sendtrainingsaddle:{type:"checkbox",label:"Training Saddle"},
							sendtrainingharness:{type:"checkbox",label:"Training Harness"},
						}},

						flintlockset:{type:"optionblock",label:"Flintlock's Ride",kids:{					
							sendsaddlesoap:{type:"checkbox",label:"Saddle Soap"},
							sendfluffybiscuit:{type:"checkbox",label:"Biscuit"},
							sendsteelplate:{type:"checkbox",label:"Steel Plate"},
							sendspikedwheel:{type:"checkbox",label:"Spiked Wheel"},
							sendgatlingparts:{type:"checkbox",label:"Gatling Parts"},
						}},
						grainsilo:{type:"optionblock",label:"Grain Silo",kids:{					
							sendladder:{type:"checkbox",label:"Ladder"},
							sendrooftile:{type:"checkbox",label:"Tile"},
							sendtarp:{type:"checkbox",label:"Tarp"},
							sendsilobeam:{type:"checkbox",label:"Beam"},
						}},

	
						"4fMasteryClub":{type:"optionblock",label:"Mastery Club",kids:{
							sendwoodenplank:{type:"checkbox",label:"Wooden Plank"},
							sendrafterbeam:{type:"checkbox",label:"Rafter Beam"},
							sendlatticedwood:{type:"checkbox",label:"Lattice Wood"},
							sendribbonspool:{type:"checkbox",label:"Ribbon Spool"},
							"sendfarmin'hoes":{type:"checkbox",label:"Hoes"},
							sendcomposter:{type:"checkbox",label:"Composter"},
							sendloam:{type:"checkbox",label:"Loam"},
							sendmelons:{type:"checkbox",label:"Melons"},
							sendscythes:{type:"checkbox",label:"Scythes"},
							sendsuperbabygro:{type:"checkbox",label:"Super Baby Gro"},
							sendmegababygro:{type:"checkbox",label:"Mega Baby Gro"},
						}},
						pennybank:{type:"optionblock",label:"Penny Bank",kids:{
							sendabacus:{type:"checkbox",label:"Abacus"},
							sendloanpaper:{type:"checkbox",label:"Loan Papers"},
							sendsafe:{type:"checkbox",label:"Safe"},
							sendsafekey:{type:"checkbox",label:"Safe Key"},
							sendgoldbullion:{type:"checkbox",label:"Gold Bullion"},
							sendgoldcertificate:{type:"checkbox",label:"Gold Certificate"},
							"sendteller'swindow":{type:"checkbox",label:"Teller's Window"},
						}},
						schoolupgrade:{type:"optionblock",label:"School Upgrade",kids:{
							sendtextbook:{type:"checkbox",label:"Text Book"},
							sendschoolbell:{type:"checkbox",label:"School Bell"},
							sendleatherstrap:{type:"checkbox",label:"Leather Strap"},
							sendschooldesk:{type:"checkbox",label:"School Desk"},
							sendsalami:{type:"checkbox",label:"Salami"},
							sendsmallpitchfork:{type:"checkbox",label:"Small Pitchfork"},
							sendpairofshoes:{type:"checkbox",label:"Pair of Shoes"},
							senddenimcloth:{type:"checkbox",label:"Denim Cloth"},
						}},
						pottingshed2:{type:"optionblock",label:"Potting Shed/Multi-Planter",kids:{
							"sendsittin'stool":{type:"checkbox",label:"Sittin' Stool"},
							sendclaypot:{type:"checkbox",label:"Clay Pot"},
							sendbeanpole:{type:"checkbox",label:"Bean Pole"},
							sendspring:{type:"checkbox",label:"Spring"},
							sendpushhandle:{type:"checkbox",label:"Push Handle"},
							sendwhirleygig:{type:"checkbox",label:"Whirleygig"},
							sendpineapplecuttings:{type:"checkbox",label:"Pineapple Cuttings"},
						}},
						iceshed:{type:"optionblock",label:"Ice Shed",kids:{
							sendwarmgloves:{type:"checkbox",label:"Warm Gloves"},
							sendtemperedrivet:{type:"checkbox",label:"Tempered Rivet"},
							sendmilkjug:{type:"checkbox",label:"Milk Jug"},
							sendsheetmetal:{type:"checkbox",label:"Sheet Metal"},
						}},

						concert:{type:"optionblock",label:"Concert",kids:{
							sendconcertwristband:{type:"checkbox",label:"Wristband"},
							sendbanjopick:{type:"checkbox",label:"Banjo Pick"},
							sendguitarstrings:{type:"checkbox",label:"Guitar String"},
							sendbassstrings:{type:"checkbox",label:"Bass String"},
							sendbandmerchandise:{type:"checkbox",label:"Merchandise"},
							sendmotherofpearlinlay:{type:"checkbox",label:"Mother of Pearl Inlay"},
							sendstagelights:{type:"checkbox",label:"Stage Lights"},
							sendhideglue:{type:"checkbox",label:"Hide Glue"},
							sendtuningpeg:{type:"checkbox",label:"Tuning Peg"},
						}},

						shamanstuff:{type:"optionblock",label:"Shaman",kids:{
							sendlargecedarpole:{type:"checkbox",label:"Large Cedar Pole"},
							sendmonsterbanearrow:{type:"checkbox",label:"Monsterbane Arrows"},
							sendbonepin:{type:"checkbox",label:"Bone Pin"},
							sendleatherstrip:{type:"checkbox",label:"Leather Strip"},
							sendmutantmagnifier:{type:"checkbox",label:"Mutant Magnifier"},
						}},

						greenhousestuff:{type:"optionblock",label:"Greenhouse",kids:{
							sendmulch:{type:"checkbox",label:"Mulch"},
							sendbuttermilk:{type:"checkbox",label:"Buttermilk"},
							sendladybugs:{type:"checkbox",label:"Ladybugs"},
							sendcountrysunshine:{type:"checkbox",label:"Country Sunshine"},
							sendplantfood:{type:"checkbox",label:"Plant Food"},
						}},


						familysecretstuff:{type:"optionblock",label:"Family Secret",kids:{
							sendconfessionletter:{type:"checkbox",label:"Confession Letter"},
							sendhanklovesfannycard:{type:"checkbox",label:"Hank Loves Fanny Card"},
							sendalchemyshelves:{type:"checkbox",label:"Alchemy Shelves"},
							sendgrimoire:{type:"checkbox",label:"Grimoire"},
							sendpreservedlizard:{type:"checkbox",label:"Preserved Lizard"},
							sendglitterpowder:{type:"checkbox",label:"Glitter Powder"},
							sendhairybeaker:{type:"checkbox",label:"Hairy Beaker"},
							sendwerewolffur:{type:"checkbox",label:"Werewolf Fur"},
						}},

						hauntedhomestead:{type:"optionblock",label:"Haunted Homestead",kids:{
							"sendtrick-or-treatsack":{type:"checkbox",label:"Treat Sack"},
							sendpotteryclay:{type:"checkbox",label:"Pottery Clay"},
							sendfrontierliving:{type:"checkbox",label:"Frontier Living Mag"},
							sendcandybag:{type:"checkbox",label:"Candy Bag"},
							sendhoneypot:{type:"checkbox",label:"Honey Pot"},
							sendmapfragment:{type:"checkbox",label:"Map Fragment"},
							sendghostlychainkey:{type:"checkbox",label:"Ghostly Chain Key"},
							sendbroomhandle:{type:"checkbox",label:"Broom Handle"},
							sendsandstone:{type:"checkbox",label:"Sandstone"},
							sendpumpkinlantern:{type:"checkbox",label:"Pumpkin Lantern"},
						}},

						hwloststallion:{type:"optionblock",label:"Oct-Nov",kids:{
							sendghosttownmap:{type:"checkbox",label:"Ghost Town Map"},
							sendfrankenflour:{type:"checkbox",label:"Frankenflour"},
							sendsteelhoe:{type:"checkbox",label:"Steel Hoe"},
							sendflamingbranch:{type:"checkbox",label:"Flaming Branch"},
							sendjalapenos:{type:"checkbox",label:"Jalapenos"},
						}},

						craftingworkshop:{type:"optionblock",label:"Crafting Workshop",kids:{
							sendcowfertilizer:{type:"checkbox",label:"Cow Fertilizer"},
							sendivystarter:{type:"checkbox",label:"Ivy Starter"},
							sendsteelhoe:{type:"checkbox",label:"Steel Hoe"},
							sendhandsaw:{type:"checkbox",label:"Handsaw"},
							sendpineboard:{type:"checkbox",label:"Pine Board"},
							sendusednails:{type:"checkbox",label:"Used Nails"},
							sendlargenails:{type:"checkbox",label:"Large Nails"},
							sendmetalbracket:{type:"checkbox",label:"Metal Bracket"},
							sendsmoothrock:{type:"checkbox",label:"Smooth Rock"},
							sendmasonryruler:{type:"checkbox",label:"Masonry Ruler"},
							sendmetalclamp:{type:"checkbox",label:"Metal Clamp"},
							sendchisel:{type:"checkbox",label:"Chisel"},
							sendpailsofwater:{type:"checkbox",label:"Pail of Water"},
							sendactuator:{type:"checkbox",label:"Actuator"},
							sendcopperore:{type:"checkbox",label:"Copper Ore"},
							sendgear:{type:"checkbox",label:"Gear"},
						}},

						native01:{type:"optionblock",label:"Native American",kids:{
							sendwildbayberry:{type:"checkbox",label:"Wild Bayberry"},
							sendmustangblanket:{type:"checkbox",label:"Mustang Blanket"},
							senddreamcatcher:{type:"checkbox",label:"Dream Catcher"},
							sendkachinadoll:{type:"checkbox",label:"Kachina Doll"},
							sendhickorywall:{type:"checkbox",label:"Hickory Wall"},
							sendbeadedstring:{type:"checkbox",label:"Beaded String"},
							sendlariatweight:{type:"checkbox",label:"Lariat Weight"},
						}},

						bakeoven:{type:"optionblock",label:"Brick Oven/Bake Sale",kids:{
							sendfirebrick:{type:"checkbox",label:"Fire Bricks"},
							sendfirestone:{type:"checkbox",label:"Fire Stone"},
							sendflintspark:{type:"checkbox",label:"Flint Spark"},
							sendwhippedyolk:{type:"checkbox",label:"Whipped Yolk"},
							sendheavycream:{type:"checkbox",label:"Heavy Cream"},
							sendbakingchocolate:{type:"checkbox",label:"Baking Chocolate"},
							sendcocoapowder:{type:"checkbox",label:"Cocoa Powder"},
							sendcreamcheese:{type:"checkbox",label:"Cream Cheese"},
							sendchocolateshavings:{type:"checkbox",label:"Chocolate Shavings"},
							"sendfrontier'sfinest":{type:"checkbox",label:"Frontier's Finest"},
							sendplaygroundinstructions:{type:"checkbox",label:"Playground Instructions"},
						}},

						tg2011:{type:"optionblock",label:"Thanksgiving 2011",kids:{
							sendnutmeg:{type:"checkbox",label:"Nutmeg"},
							"sendbucketso'sugar":{type:"checkbox",label:"Sugar Buckets"},
							sendpotatomasher:{type:"checkbox",label:"Potato Masher"},
							sendroastedturkey:{type:"checkbox",label:"Roasted Turkey"},
							sendcajunseasoning:{type:"checkbox",label:"Cajun Seasoning"},
							senddinnerplate:{type:"checkbox",label:"Dinner Plate"},
							sendbakingsheet:{type:"checkbox",label:"Baking Sheet"},
							sendcasseroledish:{type:"checkbox",label:"Casserole Dish"},
							sendbutterdish:{type:"checkbox",label:"Butter Dish"},
							"sendcarvin'knives":{type:"checkbox",label:"Carving Knife"},
							sendturkeybaster:{type:"checkbox",label:"Turkey Baster"},
							sendgoldenfeather:{type:"checkbox",label:"Golden Feather"},
						}},

						shamanlodge:{type:"optionblock",label:"Shaman Lodge",kids:{
							sendcedarincense:{type:"checkbox",label:"Cedar Incense"},
							sendspiritualvision:{type:"checkbox",label:"Spiritual Vision"},
							sendceremonialfire:{type:"checkbox",label:"Ceremonial Fire"},
							"sendkippy'sbelt":{type:"checkbox",label:"Kippy's Belt"},
							sendottermilk:{type:"checkbox",label:"Otter Milk"},
							sendleatherhide:{type:"checkbox",label:"Leather Hide"},
							sendcoloredbead:{type:"checkbox",label:"Colored Bead"},
						}},

						treemastery:{type:"optionblock",label:"Tree Mastery",kids:{
							sendpicketfence:{type:"checkbox",label:"Picket Fence"},
							sendbagsofwalnuts:{type:"checkbox",label:"Walnuts"},
							sendicecubes:{type:"checkbox",label:"Ice Cubes"},
						}},

						thinkingtree:{type:"optionblock",label:"Thinking Tree",kids:{
							sendsongbirds:{type:"checkbox",label:"Songbirds"},
							senddaydreams:{type:"checkbox",label:"Daydreams"},
							sendchildhoodmemories:{type:"checkbox",label:"Memories"},
							sendguardbears:{type:"checkbox",label:"Guard Bears"},
							sendshadyspot:{type:"checkbox",label:"Shady Spot"},
						}},

						whitebuffaloshrine:{type:"optionblock",label:"White Buffalo Shrine",kids:{
							sendpoppyflowers:{type:"checkbox",label:"Poppies"},
							sendbuffalosighting:{type:"checkbox",label:"Sightings"},
							sendbuffalohooves:{type:"checkbox",label:"Hooves"},
							sendpolishedstone:{type:"checkbox",label:"Polished Stone"},
							sendspiritlure:{type:"checkbox",label:"Spirit Lure"},
						}},

						sickhorse:{type:"optionblock",label:"Sick Horse",kids:{
							sendwikiwahblanket:{type:"checkbox",label:"Wikiwah Blanket"},
							sendwikiwahbead:{type:"checkbox",label:"Wikiwah Beads"},
							sendbayleaves:{type:"checkbox",label:"Bay Leaves"},
							sendgarlicyogurt:{type:"checkbox",label:"Garlic Yogurt"},
						}},

						tenpresents:{type:"optionblock",label:"Holiday 2011 Presents",kids:{
							sendstockingstuffer:{type:"checkbox",label:"Stocking Stuffer"},
							sendeggnog:{type:"checkbox",label:"Eggnog"},
							sendcolorfultassel:{type:"checkbox",label:"Colorful Tassels"},
							sendpinebranches:{type:"checkbox",label:"Pine Branches"},
							sendbowribbon:{type:"checkbox",label:"Bow Ribbon"},
							"sendyo-yo":{type:"checkbox",label:"Yo-yo"},
							sendinvigoratingbrew:{type:"checkbox",label:"Invigorating Brew"},
							sendlongstemrose:{type:"checkbox",label:"Long Stem Rose"},
						}},

						ny2012:{type:"optionblock",label:"New Years 2012",kids:{
							sendfestivelights:{type:"checkbox",label:"Festive Lights"},
							"sendfine-tunedfiddle":{type:"checkbox",label:"Fiddle"},
							senddecorativehaybales:{type:"checkbox",label:"Haybales"},
							senddecorativepaper:{type:"checkbox",label:"Decorative Paper"},
							sendfestivepaint:{type:"checkbox",label:"Festive Paint"},
							sendpetcombs:{type:"checkbox",label:"Pet Combs"},
							sendredsatin:{type:"checkbox",label:"Red Satin"},
							sendlongcandlewick:{type:"checkbox",label:"Candlewicks"},
							"sendgranny'sdigest":{type:"checkbox",label:"Digest"},
							sendfriendshiptrinket:{type:"checkbox",label:"Friendship Trinket"},
						}},

						plantnursery:{type:"optionblock",label:"Crop Nursery",kids:{
							sendnursingpot:{type:"checkbox",label:"Nursing Pot"},
							sendwindstruments:{type:"checkbox",label:"Windstruments"},
							sendlargebagofsoil:{type:"checkbox",label:"Large Bag of Soil"},
							sendplantguide:{type:"checkbox",label:"Plant Guide"},
							sendmaizebasket:{type:"checkbox",label:"Maize Basket"},
							sendcocoagraft:{type:"checkbox",label:"Cocoa Graft"},
							sendtomatovine:{type:"checkbox",label:"Tomato Vine"},
							sendcornroot:{type:"checkbox",label:"Corn Root"},
						}},

						lovetunnel:{type:"optionblock",label:"Tunnel of Love",kids:{
							sendloverlycow:{type:"checkbox",label:"Loverly Cow"},
							sendswanfeather:{type:"checkbox",label:"Swan Feather"},
							sendromance:{type:"checkbox",label:"Romance"},
							sendsugarandspice:{type:"checkbox",label:"Sugar and Spice"},
							sendchocolateheart:{type:"checkbox",label:"Chocolate Heart"},
							sendpomegranatetree:{type:"checkbox",label:"Pomegranate Tree"},
							sendpinewood:{type:"checkbox",label:"Pine Wood"},
							sendbadgerfelt:{type:"checkbox",label:"Badger Felt"},
							sendfluffystuffing:{type:"checkbox",label:"Fluffy Stuffing"},
							sendwhiterosebud:{type:"checkbox",label:"White Rose Buds"},
							sendoyster:{type:"checkbox",label:"Oysters"},
						}},

						hankfannyhouse:{type:"optionblock",label:"Hank and Fanny's House",kids:{
							sendtinybow:{type:"checkbox",label:"Tiny Bow"},
							sendtoolbelt:{type:"checkbox",label:"Toolbelt"},
							sendhouseblueprint:{type:"checkbox",label:"House Blueprints"},
							sendhardwoodflooring:{type:"checkbox",label:"Hardwood Flooring"},
							sendgardenrake:{type:"checkbox",label:"Garden Rake"},
							sendgalvanizednail:{type:"checkbox",label:"Galvanized Nails"},
							sendlimepowder:{type:"checkbox",label:"Lime Powder"},
							sendgeraniumcluster:{type:"checkbox",label:"Geranium Cluster"},
							sendmetalsheet:{type:"checkbox",label:"Metal Sheet"},
						}},

						emporium:{type:"optionblock",label:"Emporium",kids:{
							sendtoughnails:{type:"checkbox",label:"Tough Nails"},
							sendgiantwoodplank:{type:"checkbox",label:"Giant Wood Plank"},
							sendwindowframe:{type:"checkbox",label:"Window Frame"},
							sendmeasuringrope:{type:"checkbox",label:"Measuring Rope"},
							sendemporiumflyer:{type:"checkbox",label:"Emporium Flyer"},
						}},

						irrstation:{type:"optionblock",label:"Irrigation Station",kids:{
							sendgoldvalve:{type:"checkbox",label:"Gold Valve"},
							sendshinyfaucet:{type:"checkbox",label:"Shiny Faucet"},
							sendirongrate:{type:"checkbox",label:"Iron Grate"},
							sendcirculationpump:{type:"checkbox",label:"Circulation Pump"},
						}},

						bboard:{type:"optionblock",label:"Bulletin Board",kids:{
							sendpushpin:{type:"checkbox",label:"Push Pin"},
							sendteamwork:{type:"checkbox",label:"Teamwork"},
							sendcorkboard:{type:"checkbox",label:"Cork Board"},
							sendcoloredpaper:{type:"checkbox",label:"Colored Paper"},
						}},

						romance8:{type:"optionblock",label:"Hank & Fanny's Date",kids:{
							sendfloweredhedge:{type:"checkbox",label:"Flowered Hedges"},
							sendlakeflower:{type:"checkbox",label:"Lake Flower"},
							sendpearlnecklace:{type:"checkbox",label:"Pearl Necklace"},
							sendbluecloth:{type:"checkbox",label:"Blue Cloth"},
							sendelegantribbon:{type:"checkbox",label:"Elegant Ribbon"},
							sendfebruarycalendar:{type:"checkbox",label:"February Calendar"},
							sendsaucyspices:{type:"checkbox",label:"Saucy Spices"},
							sendfancybead:{type:"checkbox",label:"Fancy Beads"},
							sendplacesetting:{type:"checkbox",label:"Place Setting"},
						}},

						railstation:{type:"optionblock",label:"Train Station",kids:{
							sendwoodengroundhog:{type:"checkbox",label:"Wooden Groundhog"},
							sendpotbellykeg:{type:"checkbox",label:"Potbelly Keg"},
							sendcanadianspruce:{type:"checkbox",label:"Canadian Spruce"},
							sendnoisemakers:{type:"checkbox",label:"Noise Makers"},
							"sendrockbustin'hammer":{type:"checkbox",label:"Rock Bustin' Hammer"},
							sendlargegravel:{type:"checkbox",label:"Large Gravel"},
							sendrail:{type:"checkbox",label:"Rail"},
							sendironrailspike:{type:"checkbox",label:"Iron Rail Spike"},
							sendtunnelbeam:{type:"checkbox",label:"Tunnel Beam"},
							sendlamppost:{type:"checkbox",label:"Lamp Post"},
							sendplatformslat:{type:"checkbox",label:"Platform Slat"},
							sendlunchpail:{type:"checkbox",label:"Lunch Pail"},
						}},

						ranch:{type:"optionblock",label:"Ranch", kids:{
							sendrusticfence:{type:"checkbox",label:"Rustic Fence"},
							sendpushplow:{type:"checkbox",label:"Push Plow"},
							sendharvestingbasket:{type:"checkbox",label:"Harvesting Basket"},
							sendlandsurvey:{type:"checkbox",label:"Land Survey"},
							sendpulleypart:{type:"checkbox",label:"Pulley Part"},
						}},

						goldrush:{type:"optionblock",label:"Gold Rush, Bed & Breakfast and related", kids:{
							sendnugget:{type:"checkbox",label:"Mysterious Nugget"},
							sendhandpickedge:{type:"checkbox",label:"Handpick Edge"},

							sendbootpolish:{type:"checkbox",label:"Boot Polish"},
							sendshoes:{type:"checkbox",label:"Shoes"},
							"sendfancystitchin'":{type:"checkbox",label:"Fancy Stitching"},
							sendstylishsuspenders:{type:"checkbox",label:"Stylish Suspenders"},
							sendfrenchdoilies:{type:"checkbox",label:"French Doily"},
							sendnewlasso:{type:"checkbox",label:"New Lasso"},
							sendpartcasting:{type:"checkbox",label:"Part Casting"},
							sendwagontie:{type:"checkbox",label:"Wagon Tie"},
							sendsudsybucket:{type:"checkbox",label:"Sudsy Bucket"},
							sendscrubbinbrush:{type:"checkbox",label:"Scrubbin Brush"},
							sendsmokysalt:{type:"checkbox",label:"Smoky Salt"},
							sendcountrymap:{type:"checkbox",label:"Country Map"},

							sendsteelblade:{type:"checkbox",label:"Steel Blade"},
							sendwiremesh:{type:"checkbox",label:"Wire Mesh"},
							sendpupwrap:{type:"checkbox",label:"Pup Wrap"},
							sendwildpupcare:{type:"checkbox",label:"Wild Pup Care"},
						}},

						spousechores:{type:"optionblock",label:"Rekindling the Flame", kids:{
							sendredlaceswing:{type:"checkbox",label:"Red Lace Swing"},
							"send6x1plank":{type:"checkbox",label:"6x1 Plank"},
							sendpistollubricant:{type:"checkbox",label:"Pistol Lubricant"},
						}},

						debrisgen:{type:"optionblock",label:"Debris Generator", kids:{
							sendflowerspore:{type:"checkbox",label:"Flower Spore"},
							sendcactusspike:{type:"checkbox",label:"Cactus Spike"},
							sendbonefragment:{type:"checkbox",label:"Bone Fragment"},
							sendchunksofstone:{type:"checkbox",label:"Chunks of Stone"},
							sendknottedthorn:{type:"checkbox",label:"Knotted Thorn"},
						}},

						littlecrow:{type:"optionblock",label:"Little Crow",kids:{
							sendbabydoll:{type:"checkbox",label:"Baby Doll"},
							sendtrainphoto:{type:"checkbox",label:"Train Photo"},
						}},

						babyshower:{type:"optionblock",label:"Fanny's Surprise Baby Shower", kids:{
							sendwellwishes:{type:"checkbox",label:"Well Wishes"},
							sendshowerdecor:{type:"checkbox",label:"Shower Decor"},
							senddollcrib:{type:"checkbox",label:"Doll Crib"},
							sendcupcakebatter:{type:"checkbox",label:"Cupcake Batter"},
							sendbabyblocks:{type:"checkbox",label:"Baby Blocks"},
							sendmeshwrapping:{type:"checkbox",label:"Mesh Wrapping"},
							sendoaktwig:{type:"checkbox",label:"Oak Twig"},
							sendbearstuffing:{type:"checkbox",label:"Bear Stuffing (or try fluffy stuffing above)"},
						}},

						longhaul:{type:"optionblock",label:"Long Haul",kids:{
							sendoxshoe:{type:"checkbox",label:"Oxen Shoe"},
							sendrosemarysprig:{type:"checkbox",label:"Rosemary Sprig"},
							sendechinacea:{type:"checkbox",label:"Echinacea"},
						}},

						trainworks:{type:"optionblock",label:"Trainworks", kids:{
							sendwoodenflatbed:{type:"checkbox",label:"Wooden Flatbed"},
							sendcraneshaft:{type:"checkbox",label:"Crane Shaft"},
							sendbaggagenet:{type:"checkbox",label:"Baggage Net"},
							sendslidingdoor:{type:"checkbox",label:"Sliding Door"},
							sendshatterproofwindow:{type:"checkbox",label:"Shatter Proof Window"},
							sendsteamvalve:{type:"checkbox",label:"Steam Valve"},
							senddownfeathers:{type:"checkbox",label:"Down Feathers"},
							sendironfastenings:{type:"checkbox",label:"Iron Fastenings"},
							sendmoldingwax:{type:"checkbox",label:"Molding Wax"},
						}},

						stagecoachpf:{type:"optionblock",label:"Stage Coach",kids:{
							sendcoachcurtain:{type:"checkbox",label:"Coach Curtain"},
							sendstrappingrein:{type:"checkbox",label:"Strapping Reins"},
							sendgoldenscrew:{type:"checkbox",label:"Golden Screw"},
							sendpolishedwood:{type:"checkbox",label:"Polished Wood"},
							sendshinyiron:{type:"checkbox",label:"Shiny Iron"},
						}},

						fannybaby:{type:"optionblock",label:"Fanny's Baby",kids:{
							sendbabyblankie:{type:"checkbox",label:"Baby Blankie"},
							sendmobile:{type:"checkbox",label:"Mobile"},
							sendrattle:{type:"checkbox",label:"Rattle"},
							sendpuzzlepiece:{type:"checkbox",label:"Puzzle Piece"},
							sendcottonstuffing:{type:"checkbox",label:"Cotton Stuffing"},
							senddecorativethread:{type:"checkbox",label:"Decorative Thread"},
							sendvegetablebroth:{type:"checkbox",label:"Vegetable Broth"},
							sendlinencloth:{type:"checkbox",label:"Linen Cloth"},
						}},

						familytreeev:buildBlock({
							arr:["coarse rock", "compass needle","orange dye","hair bristle","sweet lemon","raw leather","willow branch","cappy glue","rhubarb stalk","roasting rod","secret spice","ripe walnut","raw pith","brass plate","bright candle","liquid smoke","steak seasoning","iced pitcher","small yoke","crude lathe","thin oil","heavy press","pie crust","walnut cracker","pith helmet","mining helmet","portrait frame","granny's lemonade"],
							label:"Family Tree",
							prefix:"send",
							accText:allAccTexts,
						}),

						barterdepot:buildBlock({
							arr:["auction podium","tomato seedling","pressure plate","tense spring","snake skin","silver star","sharpened plow","gun oil","heavy duty beam","barter tariff"],
							label:"Barter Depot",
							prefix:"send",
							accText:allAccTexts,
						}),

						frontierworks:buildBlock({
							arr:["foundation rod","stacked chimney","iron camshaft","knotty board","rigid pole","unstuffed glove"],
							label:"Frontier Works",
							prefix:"send",
							accText:allAccTexts,
						}),

						telegraphstation:buildBlock({
							arr:["telegraph key","rubber","electric circuit","cable tape","timesheet","frontier batteries","telegram"],
							label:"Telegraph Station",
							prefix:"send",
							accText:allAccTexts,
						}),

						familyreunion:buildBlock({
							arr:["side dish","serving spoon","sauteed veggie","name tag","black bean","ground cumin","colored chalk","bbq bib","chopped chives","family harmony","exercise strap","opals"],
							label:"Family Reunion",
							prefix:"send",
							accText:allAccTexts,
						}),

						springflood:buildBlock({
							arr:["coarse wool","wax coating","blackberry root","panther butter","large floodbag","panther chow"],
							label:"Spring Flood / Panicking Panthers",
							prefix:"send",
							accText:allAccTexts,
						}),

						fannybaby3:buildBlock({
							arr:["knitting needle","blue pacifier","cool water","mitt leather","bonnet cap","teddy dress","stroller wheel",	"sterile gloves","doctor's mask","diaper cream","baby booties"],
							label:"Fanny's Baby is Coming",
							prefix:"send",
							accText:allAccTexts,
						}),

						bertsimports:buildBlock({
							arr:["ornate vase","floral fabric","sweet honey","sharp scissors","imported goods","starch solution","price tag","exotic fabric","appraisal certificate"],
							label:"Bert's Imports",
							prefix:"send",
							accText:allAccTexts,
						}),

						cowgirltraining:buildBlock({
							arr:["coat conditioner","ranch gloves","tossed salad","cowgirl spice","saddle plans","guitar glue","cowgirl terrets"],
							label:"Cowgirl Training",
							prefix:"send",
							accText:allAccTexts,
						}),

						hankstwins:buildBlock({
							arr:["crib mobile","woolen sheep","frontier wallpaper","number blocks","sand box frame","shovel and pail","paper dolls","kids books","safety ties","swan ornament","leather straps","silk doll parts","sanded wood","step ladder","polished slide"],
							label:"The Twin's Nursery",
							prefix:"send",
							accText:allAccTexts,
						}),

						statelyestate:buildBlock({
							arr:["clipped bush","pristine gutter","overpriced wood","door stain","spotless pane","kingly curtain","stable cobble"],
							label:"Stately Estate",
							prefix:"send",
							accText:allAccTexts,
						}),
			
						sheriffoffice:buildBlock({
							arr:["steel handcuffs","creaky floorboard","wanted board","porch chair","sheriff's seal","sugar crystal","office blueprint","book pages","wicker basket"],
							label:"Sheriff's Office",
							prefix:"send",
							accText:allAccTexts,
						}),

						familyouting:buildBlock({
							arr:["baby bird food","machete handle","hiking boot","wooden mallet","iron stake","clean cloth","spray nozzle","cool spring water","monstrous match","spooky story"],
							label:"Family Outing",
							prefix:"send",
							accText:allAccTexts,
						}),
						
						townhall:buildBlock({
							arr:["frame boards","chandelier candle","town emblem","iron bell","paint brush","support bar","boost permit","thin chain","construction sign","trash picker","iron plumbing","wood column","stone steps","potluck dish"],
							label:"Town Hall",
							prefix:"send",
							accText:allAccTexts,
						}),

						buildbakery:buildBlock({
							arr:["cooling rack","bread pantries","pie plate","sifted flour","refined sugar","shredded coconut","chocolate sprinkles"],
							label:"Dream Bakery",
							prefix:"send",
							accText:allAccTexts,
						}),
						
						hmstdmystery:buildBlock({
							arr:["guilty confessions","secret recipes","spyglass lens","warm water","maplewood handle","footprints","horse tracks","torn fabric"],
							label:"Mystery on the Homestead",
							prefix:"send",
							accText:allAccTexts,
						}),

						hbcountyfair:buildBlock({
							arr:["bowl of water","chunk o' chicken","gate schematic","fence sign","warm oven mitt","pie tin","indigestion pill"],
							label:"Humble Bob's County Fair",
							prefix:"send",
							accText:allAccTexts,
						}),
						gofishing:buildBlock({
							arr:["creek map","beaver distraction","hard hat","lemonade","rod rings","mixed nuts","reinforced wheel","beaver bed","fish hook","rubber padding","fishing score card"],
							label:"Time To Go Fishing",
							prefix:"send",
							accText:allAccTexts,
						}),
						jailhouse:buildBlock({
							arr:["prisoner calendar","mouth organ","spotlight","food tray","iron bar","cryptography book","iron ball","encrypted message"],
							label:"Jailhouse",
							prefix:"send",
							accText:allAccTexts,
						}),
						babysittingtime:buildBlock({
							arr:["muffin","picnic sheet","smellbetter soap","mounting bolt","fingerboard","warm milk"],
							label:"Babysitting Time",
							prefix:"send",
							accText:allAccTexts,
						}),
						countryfair2:buildBlock({
							arr:["horseshoe nail","organizer","spoonful of sugar","doc's secret stuff","long board","pig massage","duster handle","sugary shortening"],
							label:"County Fair 2",
							prefix:"send",
							accText:allAccTexts,
						}),
						clocktower:buildBlock({
							arr:["marble pedestal","chisel kit","glass plate","large clock spring","metal frame beam","chime tuner","clock winder","mechanism blueprint"],
							label:"Clocktower",
							prefix:"send",
							accText:allAccTexts,
						}),

						courthouse:buildBlock({
							arr:["judge's gavel","scales of justice","the book","lock pin kit","armed escort","bandit stash"],
							label:"Court House",
							prefix:"send",
							accText:allAccTexts,
						}),
						twoyear:buildBlock({
							arr:["vibrant flowers","small fuse","rockin' horse","party balloon","large ridin' saddle","huge flowerbed","pink handcuffs","confetti tree"],
							label:"2nd Aniversary",
							prefix:"send",
							accText:allAccTexts,
						}),
						cadetacademy:buildBlock({
							arr:["speaking trumpet","drill whistle","range target","skid marks","shiny stars","cadet hat","red wool","thief","wagon tracks","cadet exam","cadets"],
							label:"Cadet Academy",
							prefix:"send",
							accText:allAccTexts,
						}),
						bestforbess:buildBlock({
							arr:["large haybale","horse chow","leather patch","grilled steak","silver clasp","grilled chicken"],
							label:"Best for Bess",
							prefix:"send",
							accText:allAccTexts,
						}),
						countyfair3:buildBlock({
							arr:[
								"female bear decoy","large trout","monkey proof lid",
								"red ribbon","essense of bunyan","string stitching",
								"pouch of glitter","iron shavings","massage iou"
							],
							label:"County Fair 3",
							prefix:"send",
							accText:allAccTexts,
						}),
						wishingwell:buildBlock({
							arr:["hole auger","grip wrench","work towels","coin press","hedge trimmers","mail slot","pipe form","frosted glass","wish list"],
							label:"Wishing Well",
							prefix:"send",
							accText:allAccTexts,
						}),
						holidayhall:buildBlock({
							arr:["kissin' memories","hidden attic schematic","rustic candelabra","bottomless basket","romantic vanity","decorations","aroma therapy","xtra wide chimney","glittery ball","resolution list","jack-o-lantern pattern","old candy corn","creepy crawly costume","sparkling water","cubed caramel"],
							label:"Holiday Hall",
							prefix:"send",
							accText:allAccTexts,
						}),

						countyfair4:buildBlock({
							arr:[
								"soft material","fine sand paper","ferris wheel flyer",
								"metal rim","safety net","candy dispenser","safety belt",
								"display rack","funny munny"
							],
							label:"County Fair 4",
							prefix:"send",
							accText:allAccTexts,
						}),
						
						libraryblock:buildBlock({
							arr:[
								"catalog drawer","wood lathe kit","basement beam",
								"dewey decimal label","end table","frontier anecdote",
								"local legend","rough sandpaper","second-hand book",
								"sunny window"
							],
							label:"Library",
							prefix:"send",							newitem:true,
							accText:allAccTexts,
						}),
						museumblock:buildBlock({
							arr:[
								"expedition chronicle","pioneer portrait","fancy hat",
								"tiny antlers","toolbox"
							],
							label:"Museum",
							prefix:"send",
							accText:allAccTexts,
						}),
						dinerblock:buildBlock({
							arr:[
								"leather seating","parasol ribbing","mystery meat",
								"frozen yogurt","mood candle","flyswatter"
							],
							label:"Country Diner",
							prefix:"send",
							accText:allAccTexts,
						}),
						sheepspa:buildBlock({
							arr:[
								"styling mirror","hair sweeper","sheep smock","master plaster",
								"sprung springs","loose lace","carvin' blade","softness soap",
							],
							label:"Shearin' Salon",
							prefix:"send",
							accText:allAccTexts,
						}),
						fourth2012:buildBlock({
							arr:[
								"stage plank","firework fuse","firework launcher","frontier firecracker",
								"firework tubing","red rocket","multicolor rocket","bag of flour",
								"super-sweet icing","safety bucket","firework stand"
							],
							label:"2012 July 4th Celebration",
							prefix:"send",
							accText:allAccTexts,
						}),
						showpen:buildBlock({
							arr:[
								"animal nametag","massage oil","stylin' shades","squeaky slippers",
								"sensitive trigger","loft blueprints","facial mud","inspired pattern",
								"sheep scissors","salad dressing","drink sword","velvet fabric"
							],
							label:"Show Pen",
							prefix:"send",
							accText:allAccTexts,
						}),
						bromance2:buildBlock({
							arr:[
								"tent pole","hearty trailmix","chicken chunk","soft fabric",
								"strong bandage","sugary syrup"
							],
							label:"Meet Ted",
							prefix:"send",
							accText:allAccTexts,
						}),
						summergames:buildBlock({
							arr:["bow limb","bow grip"],
							label:"Summer Games",
							prefix:"send",
							accText:allAccTexts,
						}),
						bromance3:buildBlock({
							arr:[
								"animal decoy","owl decoy","owl call","small collar",
								"strong leash","rabbit jerky","wooden rabbit"
							],
							label:"Wild Animal Tamin'",
							prefix:"send",
							accText:allAccTexts,
						}),
						countyfairsummer:buildBlock({
							arr:[
								"carnival flyer","thirsty pioneer","wooden duck",
								"water pump","marconi bulb","carnival stamp"
							],
							label:"Carnival Games",
							prefix:"send",
							accText:allAccTexts,
						}),
						burlybullsblock:buildBlock({
							arr:[
								"claw stepper","clown barrel","barbell",
								"wood wheel","log weight","soothin' salt",
								"peg hook","beef cake"
							],
							label:"Burly Bulls",
							prefix:"send",
							accText:allAccTexts,
						}),
						civiccenter:buildBlock({
							arr:[
								"morse keys","well diggin' kit","posse poster",
								"empty flower box","party placemat","wooden skeleton",
								"dewey card","librarian glasses","head measurement",
								"bounty board","writing surface","voting booth",
								"shiny badge"
							],
							label:"Civic Center",
							prefix:"send",
							accText:allAccTexts,
						}),						

						thefrontiergames:buildBlock({
							arr:[
			"heavy weight","frontier megaphone","construction certificate",
			"simple pulley","durable saw","fancy red ribbon","rock hammer",
			"gold medal mold","large pitcher","green wreath",
			"runnin' shoes",
							],
							label:"The Frontier Games",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						themysteriouslostcrate:buildBlock({
							arr:[
			"amaranth herb","cutting razor","claw head",
			"love letter","metal saw","chain cutters",
			"metal wedge",
							],
							label:"The Mysterious Lost Crate",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						asoldierspenpal:buildBlock({
							arr:[
			"red wax","draggin slayor","small zipper",
			"open envelope","graphite mold",
			"fanny's writing guide",
							],
							label:"A Soldier's Pen Pal",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						jacksmineshaft:buildBlock({
							arr:[
			"unsprung spring","double axe head",
			"solid spikes","sturdy wheels","root breaker",
			"liquid courage","sun mirror","diggin' pick",
			"missin' jack poster","miner hat",
							],
							label:"Jack's Mineshaft",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						whitegrizzlytamin:buildBlock({
							arr:[
			"trap blueprint","tamin' whip","bear net","long leash",
			"catfish fillet","large pulley","hefty rope",
			"large salmon","deer jerky","fluffy pillow",
			"calming leaves","wooden pole",
							],
							label:"White Grizzly Tamin'",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						bonfire12:buildBlock({
							arr:[
			"chili bib","wood utensil","bug spray",
			"hook clasp","cheese cloth","melted butter",
			"torn ticket stub","fryin' oil",
			"ruined sheets","canning lid","wood staple",
			"mattress patch",
							],
							label:"Family Bonfire",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						prettyponies:buildBlock({
							arr:[
			"horsey punch","oat crop","parade shoes",
			"horse course","sweet oils","balance spring",
			"sturdy base","side saddle","practice prancer",
							],
							label:"Pretty Ponies",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						fireonthefrontier:buildBlock({
							arr:[
			"station siding","critter salve","crystal water",
			"pump handle","steel case","oak puller",
			"cross beams","elastic loops","brass pole",
			"fire station sign","bag of sand",
							],
							label:"Fire on the Frontier",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						applefest:buildBlock({
							arr:[
			"sittin' plank","granny's old fashioned cider",
			"cross bow","unstamped ticket","sweet apple butter",
			"apple fritter","apple festival invitation",
			"apple festival flag","cider glass","apple stamp",
							],
							label:"Apple Festival",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						greatcattledrive:buildBlock({
							arr:[
			"birthing kit","solid post","unpainted dummy",
			"sewin' thread","pile of alfalfa","rake dowel",
							],
							label:"Great Cattle Drive",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						gratredemption:buildBlock({
							arr:[
			"old shoe","chipping knife","sparklin' hat",
			"practice post","bed post","encyclopedia",
			"dictionary","activated yeast","ground cinnamon",
			"lock pick",
							],
							label:"Gratchett's Redemption",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						penpalpack:buildBlock({
							arr:[
			"drawing chalk","thumb screw","dolly eyes",
			"military patches","bird seed","bird canteen",
			"soldier's journal","child's paint","tin cup",
			"cherry woodstain","hollowed tube",
			"lantern candles",
							],
							label:"Pen Pal Package",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						caveconundrum:buildBlock({
							arr:[
			"heavy screw","heavy head","lilting chimes",
			"calcium carbide","rubble movin' glove",
			"tight corset","hull reinforcement","bat trap",
							],
							label:"Cave Conundrum",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						animalhabitat:buildBlock({
							arr:[
			"habitat blueprint","magnified lens",
			"goat flank","wooden platform","panko bread crumbs",
			"squeaker","leather thread","bouncy ball",
			"cleaning supplies","water dish",
							],
							label:"Animal Habitat",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						dogshow:buildBlock({
							arr:[
			"doodoo claw","beefy bits","stage pin",
			"puppy pillar","big bar","lickin' cream",
			"rough turf","identity tag","scratchin cone",
							],
							label:"Dog Show",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						leatherworks:buildBlock({
							arr:[
			"cord thread","leather punch","braided popper",
			"boot silver","tanning lime","glove pattern",
			"broken bridle","cracked collar","sole sealant",
			"flint knife","leather guide",
							],
							label:"Leather Works",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						lostmemory:buildBlock({
							arr:[
			"precise lens","sugar water","iron banding",
			"slice of cake","brass handle","chore list",
			"friend portrait","old clothes","spouse story",
			"scrap book",
							],
							label:"Lost Memory",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						countdowntoween12:buildBlock({
							arr:[
			"chain breaker","leather fraying","simple thread",
			"sugar mixture","wax candle","metal spike",
			"cupcake mix","broccoli floret",
							],
							label:"Countdown to Halloween",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						burninup:buildBlock({
							arr:[
			"hard water","spring water",
			"brass tubing","forged bolt","water barrel",
			"brass trim","brass bits","smotherin' tarp",
			"tender bandage","shoulder strap","pick tip",
							],
							label:"Burnin' Up",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						helpasoldier:buildBlock({
							arr:[
			"soothing serum","printed fabric","bed legs",
			"round rungs","party glass","get well card",
			"house plans","well wishes",
							],
							label:"Help a Soldier",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						curseofmummy:buildBlock({
							arr:[
			"mummy wrap","uncurse charm",
			"Khol Mascara","colorful gem","mob torch",
			"spooky beaker","linen skirt","spray bottle",
			"lapiz lazuli","garlic amulet","limb strap",
			"essence jar",
							],
							label:"Curse of the Mummy",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						pumpkincarving:buildBlock({
							arr:[
			"strong oak board","caliper","wagon axle",
			"pulp bowl","pumpkin scooper","small trowel",
			"gardening hose","drawin' charcoal",
			"weavin' needle","clean water",
							],
							label:"Pumpkin Carving",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						expansion8:buildBlock({
							arr:[
			"flexible straps","pink flag","beautiful basket",
			"long blade","meat hook","snack mix","viewin' scope",
							],
							label:"Homestead Expansion 8",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
						auctionblock:buildBlock({
							arr:[
			"brass mallet","burn plate","molasses base",
			"long pole","wax string","brush base",
			"sun glasses","bathing suit","gold certificate",
			"mane conditioner","tail ribbon",
								],
							label:"Auction Block",
							prefix:"send",
							accText:allAccTexts,
							newitem:true
						}),						
					}},
			

					seppioneertrail:{type:"separator",label:"Pioneer Trail",kids:{

						otthankyou:{type:"optionblock",label:"PT Thankyou Gifts",kids:{
							sendmeat:{type:"checkbox",label:"Meat"},
							sendprizeticket:{type:"checkbox",label:"Prize Ticket"},
							sendparts:{type:"checkbox",label:"Parts"},
							sendmedicine:{type:"checkbox",label:"Medicine"},
							sendration:{type:"checkbox",label:"Rations"},
						}},				
						otwagonupgrade:{type:"optionblock",label:"PT Wagon Upgrades",kids:{
							sendironbolt:{type:"checkbox",label:"Iron Bolts"},
							sendheavyrope:{type:"checkbox",label:"Heavy Rope"},
							sendaxlegrease:{type:"checkbox",label:"Axle Grease"},
						}},								
						otbeaver:{type:"optionblock",label:"PT Beaver Valley",kids:{
							sendtentstiching:{type:"checkbox",label:"Tent Stitching"},
						}},				
						otplains:{type:"optionblock",label:"PT High Plains",kids:{
							sendsodbrick:{type:"checkbox",label:"Sod Brick"},
							sendtarpaper:{type:"checkbox",label:"Tar Paper"},
							sendbuffalograss:{type:"checkbox",label:"Buffalo Grass"},
							sendwooddoorframe:{type:"checkbox",label:"Wooden Door Frame"},
							sendwindowpeg:{type:"checkbox",label:"Window Peg"},
							sendcedarpole:{type:"checkbox",label:"Cedar Pole"},
							sendraindancer:{type:"checkbox",label:"Rain Dancer"},	
							sendlambkin:{type:"checkbox",label:"Lambkin"},
							sendspicejar:{type:"checkbox",label:"Spice Jar"},
							sendwheelfan:{type:"checkbox",label:"Wheel Fan"},
							sendcrankygearbox:{type:"checkbox",label:"Cranky Gear Box"},
							sendrustydriveshaft:{type:"checkbox",label:"Rusty Driveshaft"},
							sendtailfin:{type:"checkbox",label:"Rooster Tailfin"},
							sendgrindstone:{type:"checkbox",label:"Grindstone"},
							sendsupportbeam:{type:"checkbox",label:"Support Beam"},
							sendprairiedogdecoy:{type:"checkbox",label:"Prairie Dog Decoy"},
							sendcuriouscritternet:{type:"checkbox",label:"Curious Critter Net"},
						}},				
						otpass:{type:"optionblock",label:"PT Avalanche Pass",kids:{
							sendlongunderwear:{type:"checkbox",label:"Long Underwear"},
							sendsprucelumber:{type:"checkbox",label:"Spruce Logs"},
							sendmuddycaulk:{type:"checkbox",label:"Muddy Caulk"},
							sendwoolsheets:{type:"checkbox",label:"Wool Sheets"},
							sendtwistingtwine:{type:"checkbox",label:"Twisting Twine"},
							sendrustyhatchet:{type:"checkbox",label:"Rusty Hatchet"},
							sendtrailsoup:{type:"checkbox",label:"Trail Soup"},
							sendplungerinstructions:{type:"checkbox",label:"Plunger Instructions"},
							sendsmallgenerator:{type:"checkbox",label:"Small Generator"},
							senddynamitefuse:{type:"checkbox",label:"Dynamite Fuse"},
							"sendgiganterouspaw-print":{type:"checkbox",label:"Mysterious Tracks"},
							sendyarnball:{type:"checkbox",label:"Yarn Ball"},
						}},
					}},

					sepghosttown:{type:"separator",label:"Ghost Town",kids:{
						ghosthuntingstuff:{type:"optionblock",label:"Haunted Garden/Shagbark Tree/Cauldron",kids:{
							sendcharm:{type:"checkbox",label:"Charm"},
							sendghostlypot:{type:"checkbox",label:"Ghostly Pot"},
							sendfreakyfertilizer:{type:"checkbox",label:"Freaky Fertilizer"},
							sendplantfiddle:{type:"checkbox",label:"Plant Fiddle"},
							sendmightytrunk:{type:"checkbox",label:"Mighty Trunk"},
							sendgreenspirit:{type:"checkbox",label:"Green Spirit"},
							sendbigoakfertilizer:{type:"checkbox",label:"Big Oak Fertilizer"},
							sendspicerack:{type:"checkbox",label:"Spice Rack"},
							sendmetalfiling:{type:"checkbox",label:"Metal Filing"},
							sendrustyhandle:{type:"checkbox",label:"Rusty Handle"},
							sendeyesofnewt:{type:"checkbox",label:"Eyes of Newt"},
							sendcoyotedecoy:{type:"checkbox",label:"Coyote Decoy"},
							sendhandtrowel:{type:"checkbox",label:"Trowel"},
							sendhoaryhandcuffs:{type:"checkbox",label:"Hoary Handcuffs"},
							sendblackbirdhouse:{type:"checkbox",label:"Blackbird House"},
							sendpowerpruner:{type:"checkbox",label:"Power Pruner"},
							sendtangysaucebottle:{type:"checkbox",label:"Tangy Sauce Bottle"},
							sendgumption:{type:"checkbox",label:"Gumption"},
							sendhide:{type:"checkbox",label:"Hide"},
							sendspirit:{type:"checkbox",label:"Spirit"},
							sendpotion:{type:"checkbox",label:"Potion"},
							sendhandstitches:{type:"checkbox",label:"Hand Stitches"},
							"sendburnin'berries":{type:"checkbox",label:"Burnin' Berries"},
							sendfatsack:{type:"checkbox",label:"Fat Sack"},
							sendbiggnarlynuts:{type:"checkbox",label:"Big Gnarly Nuts"},
							sendshrunkenhead:{type:"checkbox",label:"Shrunken Head"},
							senddeathcapmushroom:{type:"checkbox",label:"Deathcap Mushroom"},

							sendtricks:{type:"checkbox",label:"Tricks"},
							sendtreats:{type:"checkbox",label:"Treats"},
							sendbonepillar:{type:"checkbox",label:"Bone Pillar"},
							sendghostcatcher:{type:"checkbox",label:"Ghost Catcher"},
						}},

					}},

					sepholidayhallow:{type:"separator",label:"Holiday Hallow",kids:{
						holidayhallow:{type:"optionblock",label:"Holiday 2011 (Holiday Hollow, Hogknocker, various timed)",kids:{
							sendholidaycloth:{type:"checkbox",label:"Holiday Cloth"},
							sendglasscutter:{type:"checkbox",label:"Glass Cutter"},
							sendwhittlingknives:{type:"checkbox",label:"Whittling Knives"},
							sendspindle:{type:"checkbox",label:"Spindle"},
							sendslop:{type:"checkbox",label:"Slop"},
							sendtruffles:{type:"checkbox",label:"Truffles"},

							sendjingleharness:{type:"checkbox",label:"Jingle Harness"},
							sendoiledrunner:{type:"checkbox",label:"Oiled Runner"},
							sendgiftsack:{type:"checkbox",label:"Gift Sack"},
							sendhomedecoration:{type:"checkbox",label:"Home Decoration"},
							sendchippedboard:{type:"checkbox",label:"Chipped Board"},
							sendrustyscrew:{type:"checkbox",label:"Rusty Screw"},
							sendbentnail:{type:"checkbox",label:"Bent Nail"},
							sendsilverchain:{type:"checkbox",label:"Silver Chain"},
							sendpolishedcedar:{type:"checkbox",label:"Polished Cedar"},
							sendirongear:{type:"checkbox",label:"Iron Gear"},
							sendholidayegg:{type:"checkbox",label:"Holiday Egg"},
							sendstockingcoal:{type:"checkbox",label:"Stocking Coal"},
							sendfragrantinsole:{type:"checkbox",label:"Fragrant Insole"},
							senddarkchocolate:{type:"checkbox",label:"Dark Chocolate"},
							sendvindicationaxe:{type:"checkbox",label:"Vindication Axe"},
							sendstalefruitcake:{type:"checkbox",label:"Stale Fruitcake"},
							sendlemonextract:{type:"checkbox",label:"Lemon Extract"},
							sendpinkcarnation:{type:"checkbox",label:"Pink Carnation"},
							sendreindeertrough:{type:"checkbox",label:"Reindeer Trough"},
							sendragdollbeadyeyes:{type:"checkbox",label:"Beady Eyes"},
							sendbow:{type:"checkbox",label:"Bow"},
							sendtinyuniform:{type:"checkbox",label:"Tiny Uniform"},
							"sendpaintin'paper":{type:"checkbox",label:"Painting Paper"},
							sendkeymold:{type:"checkbox",label:"Key Mold"},
							sendminiaturepillow:{type:"checkbox",label:"Minature Pillow"},
							sendcookiedough:{type:"checkbox",label:"Cookie Dough"},
							sendcheer:{type:"checkbox",label:"Holiday Cheer"},
							sendcandiedwalnuts:{type:"checkbox",label:"Candied Walnuts"},
							sendsugaredleaves:{type:"checkbox",label:"Sugared Leaves"},
							sendtreetrimmer:{type:"checkbox",label:"Hire Tree Trimmer"},
							sendsnowslinger:{type:"checkbox",label:"Hire Snow Slinger"},
							senddecorator:{type:"checkbox",label:"Hire Hall Decker"},
						}},
					}},

					sepprospectfalls:{type:"separator",label:"Prospect Falls",fontColor:"black",kids:{
						prospectfalls:{type:"optionblock",label:"Prospect Falls (to be sorted later)",backgroundColor:"gold",fontColor:"black",kids:{
							sendminingcertificate:{type:"checkbox",label:"Mining Certificate"},
							sendlovebullet:{type:"checkbox",label:"Love Bullet"},
							sendmassagecoupon:{type:"checkbox",label:"Massage Coupon"},
							sendclothespin:{type:"checkbox",label:"Clothespin"},
							"sendclobberin'gloves":{type:"checkbox",label:"Clobberin' Gloves"},
							sendslimpants:{type:"checkbox",label:"Slim Pants"},
							sendpyritetestingkit:{type:"checkbox",label:"Pyrite Testing Kit"},
							sendfamilymemory:{type:"checkbox",label:"Family Memory"},
							senddetermination:{type:"checkbox",label:"Determination"},
							sendsecretsafe:{type:"checkbox",label:"Secret Safe"},
							sendwoodenatm:{type:"checkbox",label:"Wooden ATM"},
							sendgoldpen:{type:"checkbox",label:"Gold Pen"},
							sendbedroomcurtain:{type:"checkbox",label:"Bedroom Curtain"},
							sendsilverspoon:{type:"checkbox",label:"Silver Spoon"},
							senddownmattress:{type:"checkbox",label:"Down Mattress"},
							sendpackagescale:{type:"checkbox",label:"Package Scale"},
							sendpackagingtape:{type:"checkbox",label:"Packaging Tape"},
							sendflagpole:{type:"checkbox",label:"Flagpole"},
							sendfurryrug:{type:"checkbox",label:"Furry Rug"},
							sendstickytar:{type:"checkbox",label:"Sticky Tar"},
							sendsilvernail:{type:"checkbox",label:"Silver Nail"},
							sendwaterproofbolt:{type:"checkbox",label:"Waterproof Bolt"},
							sendpowershovel:{type:"checkbox",label:"Power Shovel"},
							sendwallwhitewash:{type:"checkbox",label:"Wall Whitewash"},
							sendplasterbucket:{type:"checkbox",label:"Plaster Bucket"},
						}},
					}},

					}},
				}},
			}
		};

		//console.log(attachment);
		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisApp,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};


	var read = function (){	
	
			Sidekick.listen();
	
			try{
				var statusCode=0;
				var doc=document.documentElement;
				var text=doc.textContent;
				var html=doc.innerHTML;
				var gameLoaded = window.location.href===(window.location.href.match(/http(s)?:\/\/apps\.facebook\.com\/(frontierville|pioneertrail)\//));
			} catch(e){window.setTimeout(read,500);return;}

			//check page for various texts
			if (dText('Remaining: 0')){
				if(dText('Help out and receive')){statusCode=-4;} //over limit: send
				else {statusCode=-3;} //over limit: get
			}
			else if (doc.textContent=="")statusCode=-5; //no document body
			else if (text.find('An error has occured , please refresh your page'))statusCode=-1; //page error
			else if (text.find('All Outta Rewards'))statusCode=-2; //out of rewards
			else if (text.find('No Reward Left Behind'))statusCode=-2; //out of rewards
			else if (text.find('hat are you trying to do'))statusCode=-6; //already in crew
			else if (text.find('are already in'))statusCode=-6; //already in crew
			else if (text.find('crew is already full'))statusCode=-2; //crew full
			else if (text.find('looks like your neighbor is done with this here event'))statusCode=-2; //event over
			else if (text.find('Remaining:'))statusCode=1; //success assumption
			else if (text.find('yer wagon is all full'))statusCode=-3; //wagon full
			else if (text.find('yer neighbor\'s wagon is all full'))statusCode=-2; //neighbor wagon full
			else if (text.find('Sorry, Pardner! You\'ve collected all the'))statusCode=-3; //item limit reached
			else if (text.find('This crew is full'))statusCode=-2; //crew full
			else if (text.find('some of our bits may have gone missin'))statusCode=-5; //server error

			else if (gameLoaded) {statusCode=1; }
			
			//get the final href
			var link,linkOld;
			if ((statusCode>0) || (statusCode==-4)) {
				var yes=selectSingleNode(".//form[contains(@action,'.zynga.com/reward.php?inner_iframe=1')]/input[(contains(@type,'submit') or contains(@name,'action')) and (contains(@value,'Yes') or contains(@value,'yes') or contains(@value,'Play Pioneer Trail'))]");
				if (yes){
					link=(yes.parentNode.getAttribute("action"));
					var input=selectNodes(".//input[@name] | .//textarea[@name]",{node:yes.parentNode});
					for (i=0;i<input.snapshotLength;i++){var e=input.snapshotItem(i); link+="&"+(e.getAttribute("name"))+"="+(e.getAttribute("value"));}
					linkOld="&link=["+link+"]";
				} //else alert("no form found");
			}
			
			if (statusCode!=0) {
				//do stuff for WM 3
				Sidekick.sendStatus(statusCode,link);
				//do stuff for WM 2
				wrapMsg("status="+statusCode+"&link="+(linkOld?linkOld:''));
			} else window.setTimeout(read,500);
	};

	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/') 
		|| href.startsWith('file:///C:/FB-Wall-Manager/')) 
	{
		dock();
		Sidekick.openChannel();
	} else read();




})(); // anonymous function wrapper end
