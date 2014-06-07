// ==UserScript==
// @name           Wall Manager Sidekick (FV)
// @description    Assists Wall Manager with Farm Ville posts
// @include        http://apps.facebook.com/onthefarm/*
// @include        https://apps.facebook.com/onthefarm/*
// @include        http://*.farmville.com/*
// @include        https://*.farmville.com/*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @include        https://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.70
// @require        http://sizzlemctwizzle.com/updater.php?id=111560&days=1
// @copyright      Charlie Ewing & Donald Mapes
// ==/UserScript== 

(function() { 

	var version = "0.0.70";
	
	var defaultTO=null;

	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	String.prototype.getUrlParam = function(s) {
		try{return this.split(s+"=")[1].split("&")[0];} catch(e){return "";}
	};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		if (this.length>1) for (var i=this.length-1;i>0;i--) {
			for (var i2=i-1;i2>0;i2--){
				if (this[i].toLowerCase().contains(this[i2].toLowerCase())){
					var b=this[i];
					this[i]=this[i2];
					this[i2]=b;
					b=null;
				}
			}
		}
		return this;
	};

	//reconstruct an array, turning it into definitions using a prefix
	Array.prototype.toDefinitions = function(prefix){
		if (this) for (var i=0;(this[i]);i++) this[i]=prefix+this[i].noSpaces().toLowerCase();
		return this;
	};


	//returns the merge of any number of JSON objects
	//pass JSON objects as comma separated parameters
	//var newJSON = mergeJSON(a,b,c...n)
	//note: overwrites preexisting entries from earlier passed objects
	function mergeJSON () {
		var ret = {};
		for (var a=0,len=arguments.length;a<len;a++) for (var v in arguments[a]) ret[v] = arguments[a][v];
      		return ret;
	};

	//short form for evaluate
	//returns a snapshot object
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	};

	//short form for evaluate with single node return
	//returns the actual node, not the snapshot
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	};

	//clicks an object using the mouse
	//does not run default actions like opening links
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	};

	//sidekick ability to pass information via hash parameter
	function sendMessage(s){
		try {
			top.location.hash = s;
		} catch (e) {
			if (window != top) top.location.href = "http://dummy.facebook.com/?#"+s;			
		}
	};

	//use this array to replace texts for purposely screwed up test texts below
	//this allows to search correctly yet not display stuff wrong in recognition
	//or in the options menu when using quick arrays and the createMenuFromArray function below
	//keep all the text here in lowercase
	var screwyTexts = {"purple popp":"purple poppy","orange dais":"orange daisy","electric lil":"electric lily","daylil":"daylily",
		"golden popp":"golden poppy","chrome dais":"chrome daisy","sun popp":"sun poppy","lucky penn":"lucky penny",
		"school supp":"school supply","gold piece":"gold"};

	//mark all these as new while building the menus
	//this array is accessed directly by createmenufromarray so you dont need to pass it each time.
	
	var allNewItems=[
		"sendrunningshoes",
		"senddumbbell",
		"sendyogamat",
		"sendscrubbrush",
		"sendskinnyclothes",
		"sendcookbook",
		"sendresolution",
		"sendstring",
		"sendalarmclock",
		"tree_moon"
	];
	
	var allNewItems2=[
		"sendskis",
		"sendskipants",
		"sendslalomflag",
		"sendsportsdrink",
		"sendfansign",
		"sendtoboggan",
		"sendpenguinhelmet",
		"sendpenguingoggles",
		"sendmagiccleaningdust",
		"sendliftpass",
		"sendsnowsweeper",
		"sendsnowboard"
	];
	
	var allNewItems3=[
		"sendhotsoup",
		"sendmagnifyingglass",
		"sendcarrierpigeon",
		"sendclassifiedad",
		"sendicicletoothpick",
		"sendmissingposter",
		"sendmittens",
		"sendyetiflakes",
		"sendyetisidedshoes",
		"sendpartywhistle",
		"sendyetibait",
		"sendtestimonial",
		"sendsculptureplan",
		"sendicebrush",
		"sendwhittledanimal",
		"sendsculptbynumberskit",
		"sendchisel",
		"sendblockofice",
		"sendjudgegavel",
		"sendpodium",
		"sendscorecard",
		"sendinspirationalphoto",
		"sendwonderice",
		"sendsmocksandberets",
		"sendfairribbon",
		"tree_giantpartyhat",
		"tree_giantnewyearlantern",
		"tree_giantfrostedfairy",
		"tree_gianticesculpture",
		"tree_gianticypeach",
		"tree_giantprism",
		"tree_giantwhitegoldenapple",
		"tree_giantwinterspirit",
		"tree_giantfirework",
		"tree_schreink'sspruce",
		"egg_newyear",
		"adopt_calfnewyear",
		"adopt_calffrostyfairy",
		"adopt_calffrozen",
		"adopt_calficicle",
		"adopt_calfsnowblading",
		"adopt_calfsportfan",
		"adopt_calfjudge",
		"adopt_foalauroraunicorn",
		"adopt_foalfrozenpegasus",
		"adopt_foalice",
		"adopt_foalsnowflakepegasus",
		"mat_icepalace",
		"snowbrick",
		"snowflake",
		"icenail",
		"snowglobe",
		"iceboard",
		"frozenbeam",
		"snowmanparts",
		"egg_snowflake"
	];

	//build a menu list based on an array of text
	//add a prefix to the return word using prefix
	//automatically sorts alphabetically, set sort=false to disable
	//automatically capitalizes first letter of every word
	//fill the markAsNew array with elements you want marked green
	function createMenuFromArray(arr,prefix,sort,markAsNew){
		markAsNew=[].concat(allNewItems, allNewItems2, allNewItems3, (markAsNew||[]));
		sort=(sort==null)?true:sort;
		var ret={};
		if (arr) {
			//clone the array before sorting
			arr2=arr.slice(0);
			if (sort) arr2=arr2.sort();
			for (var i=0,len=arr2.length;i<len;i++){
				var keyName = (prefix||'')+arr2[i].noSpaces().toLowerCase();
				var fixedLabel=screwyTexts[arr2[i].toLowerCase()];
				ret[keyName]={type:'checkbox',label:(fixedLabel || arr2[i]).upperWords()};
				//determine array to determine color
				if (markAsNew.inArray(keyName)){
					if (allNewItems2.inArray(keyName)) ret[keyName]["newitem"]=2;
					else if (allNewItems3.inArray(keyName)) ret[keyName]["newitem"]=3;
					else ret[keyName]["newitem"]=1;
				}
			}
			arr2=null;
		}
		return ret;
	};
	
	//build Accept Text object from an array
	//add a prefix to the return key using keyPrefix, ie "cow_"
	//add a suffix to the return value using textSuffix, id " Cow"	
	function createAccTextFromArray(arr,keyPrefix,textSuffix){
		var ret={};
		if (arr) {
			for (var i=0,len=arr.length;i<len;i++){
				ret[(keyPrefix||'')+arr[i].noSpaces().toLowerCase()]=arr[i].upperWords()+(textSuffix||'');
			}
		}
		return ret;
	};


	//try to dock with WM 1.5 main script
	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app102452128776');
		if (doorMark) return; //already posted to door


		//define types here
		//provide text as it appears in the post body/link, even if spelled wrong (ie. cirtus = citrus for FV collection items)
		//search texts do not need to be in proper case as the search engine in WM 1.5 sets everything to lowercase anyway
		//you cannot search for specific case text via a WM sidekick
		//texts are case corrected later when they are added to the options menu
		//add text entires in any order and use .fixOrder() to make sure order does not cause issues during searching


		//bushel types are grouped as they were in FVWM	
		//types are defined in separate arrays for easier use in options menu	

		var fruitTypes=["bell pepper","black berry","blueberry","fire pepper","chardonnay","cranberry","eggplant","elderberry",
				"ghost chili","grape","jalapeno","leek","pepper","pineapple","purple tomato","raspberry","red currant",
				"square melon","straspberry","strawberry","tomato","watermelon","white grape","yellow melon","zinfandel",
				"darrow blackberry","chandler blueberry","cove cranberry","red iceberry","frozen grapes"].fixOrder();
				
		var vegTypes=["acorn squash","artichoke","asparagus","broccoli","cabbage","cara potato","carnival squash","carrot",
				"chickpea","cucumber","english pea","field bean","heirloom carrot","long onion","onion","pattypan",
				"pea","potato","pumpkin","purple asparagus","purple pod pea","radish","red spinach","rhubarb","spinach",
				"soybean","squash","squmpkin","turnip","zucchini","rappi","swiss chard","daikon","wasabi","kennebec potato",
				"butter & sugar corn","cauliflower","candied yam","carrotcicle","iceberg lettuce"].fixOrder();
				
		var grainTypes=["amaranth","barley","corn","double grain","hops","oat","posole corn","red wheat","rice","royal hops",
				"rye","wheat","whisky peat","triticale","iced rice"].fixOrder();
				
		var otherBushels=["aloe vera","bamboo","basil","black tea","coffee","cotton","ginger","green tea","lemon balm","peanut",
				"peppermint","sugar cane","hay","dill","clam","lobster","seafood","tarragon","candy corn",
				"gingerbread","holly","gummi bear","mint candy"].fixOrder();
				
		var specialBushels=["birthday cake","crystal","cupid corn","snow cone","white pumpkin","candy cane","balloon","red toadstool",
				"purple toadstool","jack o lantern","green peppermint","snow carnation"].fixOrder();
		
		var flowerTypes=["bluebell","red tulip","purple popp","sunflower","lilac","daffodil","iris","morning glory","saffron","lavender","clover",
				"pink rose","white rose","daylil","lily","orange dais","electric lil","poinsettia","pink carnation",
				"fire & ice rose","flamingo flower","yellow rose","pink hibiscus","green hellebore","alpine rose",
				"green rose","edelweiss","lotus","golden popp","red clover","hollyhock","black rose",
				"white poinsettia","pink aster","columbine","cornflower","electric rose","star flower","chrome dais",
				"sun popp","english rose","forget me not","gardenia","spring squill","foxglove","gladiolus",
				"lilac daffy","lady slipper","black tulip","snow tulip","glacial rose"].fixOrder();
				
		//list of bushels needed per crafting cottage

		var bakeryBushels=["pumpkin","wheat","strawberry","carrot","pepper","ghost chili","pattypan","onion","rice",
				"blueberry","black berry","raspberry","peanut","sugar cane","pea","broccoli","asparagus",
				"coffee","oat","cucumber","basil","tomato","ginger","posole corn","potato","red wheat","cranberry",
				"white pumpkin","green rose","pink carnation","butter & sugar corn","cauliflower"].toDefinitions("bushel_");
				
		var pubBushels=["hops","barley","red currant","royal hops","english rose","english pea","bluebell","spring squill",
				"cornflower","black tea","pink aster","field bean","electric rose","pink carnation","kennebec potato",
				"radish","turnips","darrow blackberry"].toDefinitions("bushel_");
				
		var wineryBushels=["rice","cranberry","white grape","sugar cane","strawberry","grape","raspberry","blueberry","tomato",
				"pepper","carrot","green tea","lilac","black berry","basil","ginger","pumpkin","acorn squash","cucumber",
				"squash","pink rose","lavender","morning glory","sunflower","yellow melon","watermelon","white pumpkin",
				"greeen rose","pink carnation","cove cranberry","tarragon"].toDefinitions("bushel_");
				
		var craftshopBushels=["cotton","soybean","carrot","chickpea","sunflower","barley","tomato","aloe vera","jalapeno",
				"pink aster","rhubarb","peanut","leek","wheat","strawberry","lilac","cranberry","double grain","morning glory",
				"coffee","black tea","spring squill","cornflower","rice","rye","spinach","pattypan","field bean",
				"pepper","red tulip","foxglove","golden popp","grape","red currant","radish","hops","english pea",
				"bluebell","cranberry"].toDefinitions("bushel_");
				
		var spaBushels=["pumpkin","cranberry","sunflower","blueberry","morning glory","aloe vera","green tea","black berry","lilac",
				"basil","iris","sunflower","pepper","red tulip","ghost chili","lily","lemon balm","ginger","coffee",
				"purple popp","daffodil","strawberry","pink rose","lavender","white pumpkin","green rose",
				"daylily","dill"].toDefinitions("bushel_");
				
		var restrauntBushels=["darrow blackberry","chandler blueberry","strawberry","red clover","hay","rhubarb","butter & sugar corn",
				"tarragon","pepper","wheat","raspberry","white grape","cove cranberry","red currant","green tea","dill",
				"lady slipper","field beans","cauliflower","tomato","pumpkin","hops","daylily","black tea","peppermint",
				"pineapple","kennebec potato","clam","leeks","red clover","basil","lobster","seafood"].toDefinitions("bushel_");
				
		var sweetshoppeBushels=["gingerbread","iced rice","sunflower","gummi bear","candied yam","wheat","glacial rose","cranberry",
				"peanut","holly","red iceberry","chickpea","mint candy","coffee","snow tulip","sugar cane","iceberg lettuce",
				"pumpkin","frozen grapes","blueberry","rye","iceberg lettuce","carrotcicle","pattypan","leeks","black berry"].toDefinitions("bushel_");

		//this array used to clear highlights
		var allCraftBushels=[].concat(bakeryBushels,pubBushels,wineryBushels,craftshopBushels,spaBushels,restrauntBushels,sweetshoppeBushels);

		
		//Crafting cottage items
		//define separately for easy options menu
		var craftPub=["duke's stout","oliviaberry beer","lionhead ale","barley crumpet","floral scone","red currant trifle",
				"rosehip tea","spark rose mead","pink carnation tea","potato soup","blackberry brandy"];
		
		var craftWinery=["sweet sake","white sangria","red table wine",
				"fruit wine","spicy tomato juice","dry sake","blackberry wine","strawberry & cranberry juice","raspberry wine",
				"blueberry wine","herbal elixir","pumpkin vinegar","cucumber wine","rose petal water","melon juice","pumpkin cider",
				"green rose water","carnation vinegar","tarragon vinegar","cranberry cooler","daiquiri","ice wine",
				"snowflake cocktail"];

		var craftSpa=["fresh sachet","floral perfume","soothing herbal lotion","relaxation oil","devotion perfume","petal sachet",
				"energizing lotion","restoring candle","lily of the valley soap","iris soap","meditation candle","pick me up sachet",
				"farmer's frenzy perfume","daffodil lotion","transcendent candle","harvest candle","green potpourri","daylily perfume",
				"dill candle","gingerbread candle","mint lotion","snowflake soap"];		

		var craftBakery=["pumpkin bread","strawberry shortcake","spicy muffin","patty pan tart","triple berry pie","peanut butter cookie",
				"raspberry blondie","vegetable tart","mocha-berry cake","oatmeal cookies","baked cucumber","pizza bread","ginger snaps",
				"potato and onion bread","carrot cake","harvest casserole","green mocha cake","candied pink carnation","cornbread",
				"cauliflower gratin","gingerbread cake","ice cream carrot cake","snowflake cookie"];
				
		var craftRestraunt=["blackberry ice cream","cheddar cheese","creamed corn","wild blueberry pie","black raspberry wine","fruit cider",
				"dill potato skin","jonny cake","cranberry-pineapple relish","clam chowder","baked beans","cream pie","new england lager",
				"boiled dinner","lobster roll"];

		var craftSweetShoppe=["candied apple","candied yam pie","candy cane","daiquiri","frozen fruit tart","ginger s'more",
				"gingerbread candle","gingerbread house","healthy donut","holly wreath","ice cream sundae","ice wine",
				"lollipop","mint lotion","orange taffy","peanut brittle","peppermint fudge","rock candy","sorbet","sugar snowflake"];
		
		//I dont know if the craftshop does or will ever actually share an item, but if it does, add them here.
		var craftShop=["bright yellow tractor","mechanic scarecrow","sheep topiary","apple red seeder","bonsai",
				"tree house","apple red harvester","post office","evergreen train","farmhand","yellow racer tractor",
				"stone wall","fertilize all","dainty fence","shovel","watering can","iron fence","arborist",
				"lamp post","animal feed","vehicle part","swiss cabin","stone archway","milking stool","scythe",
				"horse sculpture","brick","wooden board","nail","lucky penn","fuel","bottle","love potion","pine fence i",
				"pine fence ii","modern table","puppy kibble","dog treat","moat i","moat ii","moat iii","moat iv",
				"moat corner i","moat corner ii","moat corner iii","moat corner iv","castle bridge","england postcard",
				"beach ball","magic snowflake"].fixOrder();

		var craftUnidentified=["chardonnay frosted cake","chardonnay preserves","zinfandel sachet","zinfandel wine"];

		//merge craft types for searching
		var craftTypes=craftBakery.concat(craftSpa,craftWinery,craftPub,craftShop,craftRestraunt,craftSweetShoppe,craftUnidentified);	
		
		//only those crops that can provide crossbred seeds

		var seedTypes=["straspberry","long onion","squmpkin","red spinach","lilac daffy","fire pepper","double grain","purple tomato",
				"sun poppy","whisky peat"].fixOrder();

		//only those crops that can be of the supercrop status

		var superCrops=["strawberry","pumpkin","cotton","cranberry","pepper","grape","pink aster","watermelon","yellow melon"].fixOrder();

		//merge all crop types for actual searches
		//do not merge with seedTypes and superCrops as they are searched for differently

		var bushelTypes=[].concat(flowerTypes,fruitTypes,grainTypes,vegTypes,otherBushels,specialBushels).fixOrder();

		//trees
		//do not provide the words giant or large in front of these as that is done programatically later
		var treeTypes=["alma fig","amherstia","angel red pomegranate","apple","ash","autumn ginkgo","bahri date","banana",
				"bay laurel","bird cherry","black locust","blood orange","boom","breadnut","bubble gum","cashew",
				"chanee durian","chinese lantern","chinese strawberry","chinese tamarisk","chrome cherry","cork oak",
				"crab apple","crack willow","cuban banana","date","disco ball","downy birch","dwarf almond","elberta peach",
				"european beech","european pear","gem","ginkgo","golden apple","golden apricot","golden malayan coconut",
				"golden plum","golden starfruit","granny smith apple","gulmohar","hass avocado","hazelnut","heart candy",
				"holiday","indian laurel","jackfruit","key lime","lemon","longan","mango","manila mango","midland hawthorn",
				"mimosa silk","mint candy","mission olive","monterey cypress","mountain ebony","oak","olive","ornament",
				"ornament 2","peach palm","picholine olive","pine","pink dogwood","ponderosa lemon","purple hanging flower",
				"purple magnolia","rainbow apple","rainier cherry","red alder","red maple","red pine","royal crystal",
				"ruby guava","sartre guava","shinko pear","silver maple","singapore jackfruit","star ruby grapefruit",
				"tamarind","umbrella pine","vera wood","walnut","white pine","white plumeria","white walnut","wild cashew",
				"wild service","wych elm","yellow maple","yellow passion fruit","african tulip","chicle","candelabra",
				"japanese maple","melaleuca","lombardy poplar","white cedar","speckled alder","umbrella bamboo","pin oak",
				"weeping birch","bradford pear","european aspen","halloween","dahurian birch","gold tinsel","montmorency cherry",
				"paperbark maple","bitternut hickory","shagbark hickory","pistachio","purple holiday","golden bell",
				"winter spruce","ice crystal","radiant sun","starry night","a sweater","schreink's spruce","yellow rowan",
				"moon","pink magnolia","poinsettia","lychee","durian","white apple"].fixOrder();

		var treeTypes2=["bell flower","black cherry","boom","bubblegum","candy apple","caramel apple","chocolate heart",
				"chrome cherry","cocoa","cocoa truffle","cupcake","disco ball","father","fleur de lis","french bread",
				"gem fruit","golden apple","heart candy","jewel","july balloon","balloon","july confetti",
				"july ice cream","ice cream","lucky cookie","mac&cheese","mardi gras","pink gem","purple bubble gum","rainbow",
				"red gem","ribbon flower","snowcone","sour apple","spring egg","wedding","magic orange","coin","star flower",
				"magic peach","fairy","halloween candy","candy corn","fire peach","jack o lantern","halloween lantern",
				"mossy","spider","dark apple","trick or treat","halloween cookie","candy pumpkin","dark peach","honeycrisp apple",
				"sugar skull","halloween candle","fall ribbon flower","golden fairy","forbidden gem","purple crystal","gem",
				"butterfly","gnarled","labyrinth","speaker","cornucopia","santa hat","bowtie","golden holiday","stocking",
				"snowy gumdrop","borealis","snowflake","snowflake ii","holiday cookie","candy cane","gingerbread",
				"holiday candle","holiday chocolate","holiday corn","nutcracker","spiral crystal","gum drop","fraiser fir",
				"poinsettia","teddy bear","present","party hat","frozen apple","holiday lantern","noir","snowball",
				"jingle bell","firework","new year lantern","prism","white golden apple","icy peach","ice sculpture",
				"amethyst gem","frosted fairy","winter spirit","whittled","sculpted"].fixOrder();

		//material types
		//defined separately for easy options menu
		var standardMaterials=["goo ","haunted brick","knockers","creepy candle","brick","wooden board","nail","harness","horseshoe",
				"aged brick","clinging vine","paned window","slate tile","weathered board","blanket","bottle","floral bracket",
				"glass sheet","green beam","irrigation pipe","white trellis","bamboo","reed thatch","smoker","beeswax","shovel", 
				"gear","axle","rope","hammer","twine","concrete","hinge","screwdriver","tin sheet","vehicle part","queen bee",
				"honeybee","wrench","clamp","pipe","shrub","grazing grass","fence post","painted wood","water pump","log","stone",
				"steel beam","wire","hay bundle","saddle","bridle","punch","snacks","paint","red beam","screw","aluminum siding",
				"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer","milk and cookies",
				"gps","silver bell","holiday lights","reindeer treat","holiday cheer","snow axle","snow chain","snow gear","sack ",
				"scoop ","belt ","snow brick","snowflake","ice nail","snow globe","ice board","frozen beam"].fixOrder();

		var otherConsumables=["watering can","puppy kibble","arborist","farmhand","white truffle","coins",
				"black truffle","gold truffle","brown truffle","animal feed","fertilize all", "dog treat",
				"mystery seedling","love potion","instagrow","fuel","mystery gift","special delivery","unwither",
				"capital one gift","turbo charge"].fixOrder();
		
		var specialMaterials=["fruit cake","beach toys","apple","treats","tricks","bonfire supplies","holiday gifts",
				"stocking stuffer","snowman parts"].fixOrder();

		var craftingMaterials=["apple wood basket","walnut basket","orange basket","lemon basket","milk jug","wool bundle",
				"cherry basket","maple syrup basket","manure bag","poplar wood basket"].fixOrder();

		var questItems=[				
				"hot soup","magnifying glass","carrier pigeon","classified ad","icicle toothpick","missing poster","mittens",
				"yeti flakes","yeti sided shoes","party whistle","yeti bait","snow sweeper","testimonial","sculpture plan",
				"ice brush","whittled animal","sculpt by numbers kit","chisel","block of ice","judge gavel","podium","score card",
				"inspirational photo","wonder ice","smocks and berets","fair ribbon","skis","ski pants","slalom flag","sports drink",
				"fan sign","toboggan","penguin helmet","penguin goggles","magic cleaning dust","lift pass","running shoes","dumbbell",
				"yoga mat","scrub brush","skinny clothes","cookbook","resolution","string","alarm clock","snowboard",
				"rabbit ear warmer","duck beanie","hoof warmer","horse rug","pig tail cover","cow sweater","insulated boots",
				"warm pet bed","heat lamp","stake","sturdy tarp","burlap screen","warm bird house","heated bird bath","windbreak fence",
				"pinecone feeder","warm thermos","winter chili","wreath","string of lights","stockings","jack in the box","teddy bear",
				"frannie farm doll","toy fire truck","model train","nutcracker","roasted chestnuts","glass of eggnog","cookie",
				"bough of holly","mistletoe","song book","gift box","gift tag","fancy bow","fire log","hot spark","colorful light",
				"brass knob","crystal whatzit","wooden gear","spinning whirl","flange flinger","polarized goggles","hot chocolate",
				"snow polish","gold pocketwatch","jingle bells","egg nog","arctic beach ball","snow shoe","holiday tune",
				"perfect snowflake","pen and paper","farmville stamp","souvenir","water bottle","suitcase","bow tie","gravy boat",
				"fresh bread","warm sweater","lantern","fire pit stones","stump","baked potato","marshmallow fork","fire spade",
				"cook book","potato masher","corn basket","guitar","fiddle","banjo","stand up bass","mandolin","kick drum",
				"mermaid tales","spyglass","sea shell","sweet butter","nectar","honey tea","fairy slippers","flower petals","twig",
				"thread","bucket","strong rope","light stick","jack-o-lantern flashlight","candy map","confetti bomb","map pieces",
				"jack-o-lantern","halloween mask","lollipop","party favors","old books","banquet invitation","scary decoration",
				"blindfold","party favors","candy corn","tasty fish","wrapped candy","apple basket","horsehead rake","popcorn machine",
				"romantic centerpiece","horse comb","horse saddle","horse tiara","carrot on a stick","horse shoe","blue ribbon",
				"cow treat","cow tether","sugar cube","cow collar","salt lick","milk bucket","brass cow bell","hay","farmer's boots",
				"farmer's overalls","hay","livestock tags","oat sack","tree fertilizer","hobby horse rake","wool blanket",
				"bird seed bunch","bird nest","bird whistle","zookeeper hat","zoo tickets","monkey mask","baby bonnets","pet bed",
				"chew toy","catnip","scratch post","pacifier","eau du skunk","squirrel feeder","scritchy brush","raffle drum",
				"raffle poster","sawhorse","fuzzy dice","racing stripe","picnic blanket","toadstools","fairy wand","storybook",
				"burlap sack","holiday treats","holiday lights","wrapping paper","sheep shampoo","cheque","magnet","airship patch",
				"piggy toy","grape juice","testimonial","lemon","electric torch","pint glass","mouse trap","cheese culture","post card",
				"sprinkler","grow light","work order","elbow grease","praise for henry","love potion"
			].fixOrder();

		//merge materials for searching
		var materials=[].concat(standardMaterials,otherConsumables,craftingMaterials,specialMaterials).fixOrder();
		
		//building type catcher for random materials
		var buildings=["maison","nursery barn","botanical garden","japanese barn","beehive","garage","pig pen","haunted house",
				"orchard","turkey roost","funhouse","gingerbread house","winter workshop","party barn","duck pond",
				"cupid's castle","greenhouse","leprechaun's cottage","sheep pen","spring garden","craftshop","bedazzled cottage",
				"water wheel","crafting silo","combine","horse stable","wildlife habitat","pet run","zoo","aviary","cove",
				"livestock pen","cow pasture","horse paddock","castle duckula","harvest hoedown","winter animal pen",
				"winter wonderland train station","snow treasure","santa's sleigh","winter water wheel",
				"winter pasture","winter paddock","animal feed mill","ice palace"].fixOrder();

		//collectibles for menu
		var colBerries=["fruit bar","sorbet","preserves","dried berry","berry basket"];
		var colCitrus=["bubble gum","juicer","sherbet","fruit wedge","cirtus peel"];
		var colCows=["cow bell","milking bucket","milking stool","milk bottle","more cowbell"];
		var colFlowers=["corsage","hummingbird","dried petals","butterfly","pollen"];
		var colGrains=["grindstone","scythe","bran","chaff","flour"];
		var colSquash=["pumpkin seeds","stuffed pasta","decorative gourds","yerba mate","sitar"];


		//merge collectibles for searching
		var colTypes=[].concat(colBerries,colCitrus,colCows,colFlowers,colGrains,colSquash).fixOrder();

		//collectible set names for collecting random items
		var colGroups=["Berries","Citrus","Cows","Flowers","Grains","Squash"];

		//getting back to animals
		var calfTypes=["autumn","belted","candy cane","chocolate","chrome","devon","dexter","disco","english","fan",
				"flower","galician","gelbvieh","green patch","groovy","hereford","highland","holiday wreath",
				"irish kerry","kelly green","mohawk","neapolitan","new year","panda","pink patch bull","pink patch",
				"pink","purple valentine","purple","rainbow","red brown","robot","simmental","tuscan","valentine",
				"welsh black","western longhorn","yellow patch","green","longhorn","vineyard","fall fairy","fall","sailor",
				"pineywoods","blue oxen","blue","grey oxen","canadienne","black shorthorn","milking shorthorn",
				"shorthorn","b0v1n3-11","gray jersey","jersey","randall bull","irish moiled bull","irish moiled",
				"holstein bull","holstein","bull","yellow referee","referee","red heart","guernsey","ayrshire","milky",
				"brown swiss","brown","red","black angus","randall","nightmare","frankenstein bride","skeleton",
				"pumpkin","tourist","fairy","dragonfly","maple wreath","charolais","plush","flannel","pilgrim",
				"belgian blue","red devon ox","cornucopia","criollo","snowflake","santa","telemark","holiday light",
				"holiday top hat","holiday","caroling","snow blading","sport fan","lion dance","frosty fairy",
				"icicle","sweater","frozen","judge","baby"].fixOrder();
				
		var yakTypes=["gray baby","black baby","baby"].fixOrder();

		var foalTypes=[
				//multiple words
				"appaloosa mini","asian wild","azteca","bedazzled","black cherry","black gypsy","black mini",
				"black percheron","black pony","black shire","black stallion","blue mane gypsy","blue ponytail",
				"blue pony","brown gypsy","candy cane","candy corn","cleveland bay","clydesdale stallion","connemara pony",
				"cream draft","cream mini","dales pony","dartmoor pony","disco pony","eriskay pony","exmoor pony","french mini",
				"french percheron","golden mini","golden pony","golden stallion","irish cob","merens pony","mini candycane",
				"mini party","new forest pony","new year","nightmare blue unicorn","pink gypsy","pink ponytail","pink pony",
				"pink stallion","pinto pony","pottok pony","purple bedazzled","purple pony","purple ponytail","purple stallion",
				"rainbow mini","rainbow pony","rainbow stallion","red pinto","reitpony","royal steed","shamrock pony",
				"shetland pony","snow stallion","stallion mini","suffolk","swiss warmblood","valentine mini","white mustang",
				"white shire","white thoroughbred","yakut pony","zesty","american quarter","vineyard mini","purple mini",
				"fairy mini","fairy pony","irish hunter","gypsy stallion","white andalusian","fairy pink","black n white",
				"arabian stallion","friesian stallion","zebra unicorn","new england pinto","morgan stallion","harvest pony",
				"bay andalusian","buckskin mini","walking pony","brown pinto mini","harvest mini","skeleton unicorn",
				"fire skeleton","black belgian","cream stallion","high kick","pink saddled","chestnut mini stallion",
				"mini donkey","candy corn stallion","trotter stallion","black arabian","peruvian","candycane unicorn",
				"candy corn unicorn","clover unicorn","pink unicorn","lady gaga unicorn","mexican unicorn","nightmare unicorn",
				"purple unicorn","white unicorn","yellow unicorn","chrome pegasus","lavender pegasus","mini zebra pegasus",
				"white pegasus","nightmare pony","candy corn pegasus","black ponytail","french unicorn","glow skeleton",
				"black dartmoor","hackney palomino pony","white mini unicorn","spotted appaloosa","fairy unicorn",
				"nightmare mini pegasus","purple mini unicorn","mini blue gypsy","black mini unicorn","winged unicorn",
				"nightmare pegasus","mini bat","black unicorn","flowered","candycorn unicorn","candy corn pony","mini pegasus",
				"fall fairy mini","hollow fairy","purple pegacorn","maple leaf","dragonfly unicorn","dragonfly pony",
				"autumn stallion","butterfly unicorn","butterfly pony","fall lantern","tinsel mini","spotted draft","black paint",
				"harvest unicorn","maple pegasus","icy blue unicorn","icy blue pegacorn","palomino quarter","tinsel pony",
				"jingle bells","frosty mini","nightmare mini","silver bell","golden unicorn","fairy zebra","candy pegacorn",
				"snowflake mini","sugar plum fairy","holiday tinsel unicorn","holiday wreath pony","icy blue pegasus",
				"icy blue pony","white arabian","toy soldier donkey","mini gold bell","winter pegacorn","poinsettia",
				"holiday pony","golden bell pony","rainbow pegasus","frosted fairy mini","frosted fairy unicorn",
				"frosty fairy","crystal unicorn","white snow fantasy","black snow fantasy","a winter rug","icy pink",
				"snowflake pony","snowflake pegasus","frozen pegasus","aurora unicorn","green caroling",
				
				//single words
				"appaloosa","breton","brown","black","white","gypsy","pony","pinto mini","pinto","red","shire","morgan","fairy",
				"pegasus","mustang","party","percheron","grey","green","forest","camargue","camarillo","carnival","charro","chrome",
				"clown","clydesdale","buckskin","falabella","fjord","hackney","haflinger","hanoverian","galiceno","icelandic",
				"king","knight","miniature","mongolian","paint","palouse","royal","saddle","silver","thoroughbred","valentine",
				"welsh","vineyard","american","maremmano","standardbred","quarter","draft","andalusian","nightmare","pseudocorn",
				"spectator","donkey","brumby","trakehner","tennessee","batwing","comtois","apple","dapplegray","pumpkin","skeleton",
				"dragonfly","autumn","canadian","butterfly","reindeer","santa","harvest","plush","icy","armored","holiday","dole",
				"ornament","snowflake","wreath","caroling","glitter","tinsel","rainbow","nutcracker","disco","crystal","ice","bird"
			].fixOrder();
				
		var horseTypes=["brown","gray","grey","flowered","cream draft","red pinto","red ","candy corn",
				"white snow fantasy","black snow fantasy"].fixOrder();

		var duckTypes=["belted","party","ugly","red-billed","red","brown","yellow","aztec","blue","campbell","cayuga",
				"chrome","crested","female mandarin","male mandarin","fulvous whistling","gadwell","goldeneye","golfer",
				"green mallard","green winged teal","indian runner","kungfu","longtail","muscovy","pekin","pochard",
				"princess","goldeneye","rainbow","robin","royal guard","ruddy","scoter","tufted","valentine","warder",
				"wizard","wood","orange","banjo"].fixOrder();

		var ducklingTypes=["ugly","red","brown","yellow","blue"].fixOrder();

		var pigTypes=["poolside","black","hot pink","ossabaw","pink pot belly","strawberry","white","ghost"];

		var sheepTypes=["miner","mouflon","polka dots","red","scuba","flower","clover","shamrock","spaghetti","vineyard",
				"scared","luv","thank","sunny","schooled","caroling","star bright"].fixOrder();

		var cowTypes=["brown","chocolate","dexter","disco","fan","groovy","irish moiled","longhorn","pink patch",
				"pink","purple valentine","purple","yellow patch","green patch","milking shorthorn","pumpkin",
				"flannel","caroling"].fixOrder();

		//contains the main list of "other" things you can collect
		//decorations by event
		var decorApples=["autumn fireplace","harvest gnome","fall flowerbed","apple barrel"];
		
		var decorHalloween=["pumpkin topiary","candied gnome","skele-scarecrow","bat tree","pumpkin house",
				"mini jack-o'lantern","pumpkin terrier","halloween pond","headless horseman gnome","cobwebbed tree"];
		
		var decorThanksgiving=["harvest surprise","pilgrim gnome","harvest fountain","mayflower",
				"railroad tie bench","bare tree decoration","iron fire pit","corn maze fence"];
		
		var decorChristmas=["silver nutcracker","holly arch","holiday bear","ice sculpture","snowflake pole",
				"snow drift","horse snowglobe","lighted hedge","caroling snowman","teddy bear snowglobe","giant candy",
				"white soldier","icy snowflake","frosty snowflake","blue soldier","silver ornament","gold ornament",
				"gold soldier","cocoa bear","snow drift","snow pile","gold nutcracker","cream bear","luminary fence",
				"frozen fountain","string lights","holly fence"].fixOrder();
		
		var decorHolidayHearth=["forest snowglobe","holiday carousel","gift giving gnome","north pole gnome","cupcake factory"];
		
		var decorMagicSnowman=["aurora fence","starry pond"];
		
		var decorWinterWonderland=["candy cane decoration","single candle","ice cube","lighted fence","holiday planter",
				"giant snowflake 1","reindeer balloon","snowy track i","snowy track ii","snowy track iii","snowy track iv",
				"snowy track v","snowy forest","winter cafe","santa's sleigh","gift mountain","winter cottage","ice castle",
				"toy factory"];
		
		var decorValentines=["red heart hay","yellow rose stand","fancy carriage","giant teddy","valentine ram",
				"pecking ducks","3 hearts fountain","pink patch cow","chocolate fountain","eiffel tower","pink swan",
				"i love you stand","i love you sign","xoxo sign","purple hay bale","heart teddy","caramel bear",
				"fuchsia greenery","pink greenery","provencal pot","fancy topiary","flax plant","love balloon"].fixOrder();
				
		var decorStPatty=["kelly green hay","clover gnome","lucky fountain","green lighthouse",
				"spring flower cart","spring pond","shamrock castle"];
				
		var decorSpringBasket=["mystery egg","bunny gnome","gilded egg","dutch windmill"];
		
		var decorSpringCountdown=["pastel hay bale","flower bucket","little wagon","spring flowers","milk crate",
				"azalea","stone archway","spring balloon arch","weather vane","fruit crate","bouncing horse"];
				
		var decorShovels=["mole","crystal rock","cave gnome","antique tractor"];
		
		var decorSchoolSupplies=["haiti flag","student gnome","tap tap bus","school seesaw","school house"];
		
		var decorTuscanWedding=["wedding cake","pig high art","apollo butterfly","bella fountain","leaning tower"];
		
		var decorWishingWell=["nightingale","leprechaun gnome","irish cottage","double-deck tractor"];
		
		var decorFlowers=["spring arch","flower fountain","flower tower"];
		
		var decorSandCastle=["beach umbrella","beach chair","beach hut","lifeguard tower"];
		
		var decorFV2Birthday=["doghouse","cowprint balloon arch","lamppost","blue bird","bird bath fountain","garden shelter",
				"bicycle planter","ivy archway","bench planter","FV haybale"];
				
		var decorOther=["chef gnome","bacchus gnome","spa gnome","japanese relief flag","elf gnome","fireworks","english hat",
				"hanging flowers","japanese trellis","pot of english rose","aster flower fence","flowerbed","picnic set",
				"white willow","animated butterfly","green gazing ball","small pond","french air balloon","lunchbox"];
				
		// merge decorations for searching
		var decorTypes=[].concat(decorHalloween,decorThanksgiving,decorChristmas,decorValentines,decorStPatty,
				decorSpringBasket,decorSpringCountdown,decorShovels,decorSchoolSupplies,decorTuscanWedding,
				decorWishingWell,decorFlowers,decorSandCastle,decorFV2Birthday,decorApples,decorOther,
				decorWinterWonderland,decorHolidayHearth,decorMagicSnowman).fixOrder();
		
		var eggTypes=["white","brown","black","cornish","golden","rhode island red","scots grey","rainbow","candycane",
				"english","party","marans","faverolles","araucana","buttercup","candycorn","apple","fall fairy","new year",
				"tourist","snowflake"].fixOrder();

		//two word or common animal catch all texts
		var otherAnimals=["pink lamb","baby lamb","dorking chicken","persian cat","baby turkey","baby elephant",
				"clumsy reindeer","yellow sow","lonely bull","boer goat","penguin","white kitty","white-tailed buck",
				"himalayan kitty","black kitten","turtle","clover rabbit","baby bourbon turkey","english spot rabbit",
				"rhode island red chicken","reindeer","dutch rabbit","poncho llama","white turkey","black rabbit","farm goose",
				"white goose","white llama","red goat","mouflon goat","clover chicken","red toggenburg goat","baby mule",
				"mistletoe donkey baby","baby ox","halloween tutu hippo","trick or treat donkey baby","nightmare stallion",
				"candycorn unicorn","black pony","white mustang","arctic rabbit","winter fox","mistletoe penguin",
				"winter polar bear","elf penguin","red nose sheep","caroling goat","nutcracker stallion","aurora cat",
				"aurora unicorn"].fixOrder();

		//this animal catchall is for words that already appear earlier, and so must be searched AFTER horses, foals, materials or decorations
		var animalCatchalls=["chicken","turkey","llama","cow","horse","sheep","pig",
				"rabbit","boar","duckling","duck","foal","calf","ram","raccoon","porcupine","goat"].fixOrder();

		//catchall for other items not listed as materials
		var otherWords=["lucky penn","raffle ticket"];

		//dynamically build accept texts from the arrays above
		var t1 = createAccTextFromArray([].concat(otherWords,decorTypes,materials),"","");
		var t2 = createAccTextFromArray(calfTypes,"adopt_calf"," Calf");
		var t3 = createAccTextFromArray(foalTypes,"adopt_foal"," Foal");
		var t31 = createAccTextFromArray(yakTypes,"adopt_yak"," Yak");
		var t4 = createAccTextFromArray(horseTypes,"adopt_horse"," Horse");
		var t5 = createAccTextFromArray(bushelTypes,"bushel_"," Bushel");
		var t6 = createAccTextFromArray(flowerTypes,"perfect_"," Bunch");
		var t7 = createAccTextFromArray(treeTypes,"tree_"," Tree");
		var t8 = createAccTextFromArray(treeTypes2,"tree_giant"," Tree (Giant)");
		var	t9 = createAccTextFromArray(craftShop,"join"," Team");
	//	var t9 = createAccTextFromArray(craftTypes,"sample_"," Sample");
		var t10 = createAccTextFromArray(colTypes,"col_"," Collectible");
		var t11 = createAccTextFromArray(colGroups,"colX_"," Collectible");
		var t12 = createAccTextFromArray(duckTypes,"adopt_duck"," Duck");
		var t13 = createAccTextFromArray(ducklingTypes,"adopt_duckling"," Duckling");
		var t14 = createAccTextFromArray(pigTypes,"adopt_pig"," Pig");
		var t15 = createAccTextFromArray(sheepTypes,"adopt_sheep"," Sheep");
		var t30 = createAccTextFromArray(sheepTypes,"adopt_ewe"," Ewe");
		var t16 = createAccTextFromArray(cowTypes,"adopt_cow"," Cow");
		var t17 = createAccTextFromArray(eggTypes,"egg_"," Mystery Egg");
		var t18 = createAccTextFromArray([].concat(otherAnimals,animalCatchalls),"adopt_","");
		var t19 = createAccTextFromArray(buildings,"mat_"," Parts");
		var t20 = createAccTextFromArray(questItems,"send","");

		//use t21 below to create your own accTexts for non-arrayed items or for other special needs
		var t21 = {
			sendmat:"Material",sendbushel:"Bushel",order:"Unknown Bushel Order",sendhelp:"Help",bushel_random:"Random Bushel",
			grabbag:"Grab Bag","100xp":"XP",adopt_lambewe:"Lamb (Ewe)",adopt_lambram:"Lamb (Ram)",tree_ornament2:"Ornament Tree II",
			wanderingstallion:"Wandering Stallion",adopt_lamb:"Lamb (Unknown Sex)",adopt_piglet:"Piglet", tree:"Unknown Tree",
			luckypenn:"Lucky Penny",bushel:"Unknown Bushel",perfectbunch:"Perfect Bunch",pollinated:"Unknown Seeds",sendbasket:"Basket",
			adopt_ramfloweredgreen:"Flowered Green Ram",sample:"Unknown Level Sample",sample1:"Sample Level 1-20",sample2:"Sample Level 21-40",
			sample3:"Sample Level 41-80",sample4:"Sample Level 81-100",sample5:"Sample Level 100+", schoolsupp:"School Supply",
			adopt_wildliferare:"Wildlife Baby (Rare)",adopt_wildlifecommon:"Wildlife Baby (Common)",adopt_petruncommon:"Mystery Baby (Common)",
			adopt_petrunrare:"Mystery Baby (Rare)",adopt_zoocommon:"Zoo Baby (Common)",adopt_zoorare:"Zoo Baby (Rare)",adopt_aviaryrare:"Egg (Rare)",
			adopt_aviarycommon:"Egg (Common)",adopt_livestockcommon:"Mystery Baby (Common)",adopt_livestockrare:"Mystery Baby (Rare)",
			sendwishlist:"Wishlist",sendfeed:"Animal Feed",sendbottle:"Bottle",adopt_wintercommon:"Winter Baby (Common)",
			adopt_winterrare:"Winter Baby (Rare)",adopt_baby:"Unknown Baby"
		};

		var t22 = createAccTextFromArray(seedTypes,"seeds_"," Seeds");
		var t23 = createAccTextFromArray(bushelTypes,"polseeds_"," Pollinated Seeds");
		var t29 = createAccTextFromArray(bushelTypes,"order_"," Bushel Orders");

		//use t27 to repair accTexts for screwy test texts before converting to accept texts
		var t27 = {"polseeds_purplepopp":"Purple Poppy Pollinated Seeds",
			"polseeds_orangedais":"Orange Daisy Pollinated Seeds",
			"polseeds_electriclil":"Electric Lily Pollinated Seeds",
			"polseeds_daylil":"Daylily Pollinated Seeds",
			"polseeds_goldenpopp":"Golden Poppy Pollinated Seeds",
			"polseeds_chromedais":"Chrome Daisy Pollinated Seeds",
			"polseeds_sunpopp":"Sun Poppy Pollinated Seeds",
			"bushel_purplepopp":"Purple Poppy Bushel",
			"bushel_orangedais":"Orange Daisy Bushel",
			"bushel_electriclil":"Electric Lily Bushel",
			"bushel_daylil":"Daylily Bushel",
			"bushel_goldenpopp":"Golden Poppy Bushel",
			"bushel_chromedais":"Chrome Daisy Bushel",
			"bushel_sunpopp":"Sun Poppy Bushel",
			"polseeds_purplepopp":"Purple Poppy Perfect Bunch",
			"polseeds_orangedais":"Orange Daisy Perfect Bunch",
			"polseeds_electriclil":"Electric Lily Perfect Bunch",
			"polseeds_daylil":"Daylily Perfect Bunch",
			"polseeds_goldenpopp":"Golden Poppy Perfect Bunch",
			"polseeds_chromedais":"Chrome Daisy Perfect Bunch",
			"polseeds_sunpopp":"Sun Poppy Perfect Bunch",
			"order_purplepopp":"Purple Poppy Bushel Order",
			"order_orangedais":"Orange Daisy Bushel Order",
			"order_electriclil":"Electric Lily Bushel Order",
			"order_daylil":"Daylily Bushel Order",
			"order_goldenpopp":"Golden Poppy Bushel Order",
			"order_chromedais":"Chrome Daisy Bushel Order",
			"order_sunpopp":"Sun Poppy Bushel Order",
		};

		//create the actual attachment
		var attachment={
			appID:'102452128776',
			alias:'FV',
			hrefKey:'key',
			name:'FarmVille',
			thumbsSource:'farmville.zgncdn.com',
			flags:{httpsTrouble:true,requiresTwo:false,skipResponse:false,alterLink:true},
			icon:"http://photos-g.ak.fbcdn.net/photos-ak-snc1/v43/144/102452128776/app_2_102452128776_416.gif",
			desc:"FarmVille Sidekick",
			
			//code for altering link destinations before processing (unique to FV at this time)
			alterLink:{
				//find in href
				find:'next=gifts.php%3FgiftRecipient',
				
				//replace with, (note the {%1} in the replacement)
				replace:'next=gifts.php%3FselectedGift%3D{%1}%26giftRecipient',
				
				//words in the post body text
				words:["nail","wooden board","brick","honeybee","vehicle part","smoker","beeswax","blanket","bottle",
					"horseshoe","harness","training their puppy","kibble","watering can","shovels","concrete","hammer",
					"twine","tin sheet","hinge","screwdriver","wrench","pipe","clamp","stone","log","steel beam","wire",
					"water pump","painted wood","shrub","grazing grass","hay bundle","fence post","special delivery",
					"animal feed","saddle","bridle","punch","snacks","paint","red beam","screw","aluminum siding",
					"candy cane beam","conifer dust","ice post","rail spike","rail tie","coal","pickaxe","hair dryer",
					"milk and cookies","gps","silver bell","holiday lights","reindeer treat","holiday cheer","snow brick",
					"snowflake","ice nail","snow globe","ice board","frozen beam",
					
					"nursery barn","horse paddock","cow pasture","livestock pen","wildlife habitat","aviary","pet run",
					"zoo","winter animal pen","crafting silo","sheep pen","pig pen","orchard","garage","duck pond",
					"horse stable","beehive","cove","winter wonderland train station","santa's sleigh","combine",
					"count duckula's castle","harvest hoedown","winter water wheel","winter pasture","winter paddock",
					"ice palace"
				].fixOrder(),
				
				//change {%1} above to the value below based on found "word" above
				//the values below should be the "code" for the gift item to send
				conversionChart:{
					nail:"nail",woodenboard:"woodenboard",honeybee:"beehive_bee",vehiclepart:"vehiclepart",
					brick:"brick",smoker:"smoker",beeswax:"beeswax",blanket:"blanket",bottle:"bottle",horseshoe:"horseshoe",
					harness:"harness",trainingtheirpuppy:"consume_treat",kibble:"consume_kibble",wateringcan:"wateringcan",
					shovel:"shovel_item_01",concrete:"concrete",hammer:"hammer",twine:"crafting_twine",tinsheet:"tinsheet",
					hinge:"hinge",screwdriver:"screwdriver",wrench:"wrench",pipe:"pipe",clamp:"clamp",stone:"stonepart",
					log:"logpart",steelbeam:"steelbeampart",wire:"component_wire",waterpump:"component_waterpump",
					paintedwood:"component_paintedwood",fencepost:"component_fencepost",grazinggrass:"component_grazinggrass",
					haybundle:"component_haybundle",shrub:"component_shrub",animalfeed:"animalfeedtrough_feed",
					specialdelivery:"socialplumbingmysterygift",saddle:"component_saddle",bridle:"component_bridle",
					punch:"part_punch",snacks:"part_snacks",paint:"part_paint",redbeam:"redbeam",screw:"screws",
					aluminumsiding:"aluminumsiding",candycanebeam:"candy_cane_beam",coniferdust:"ww_fairy_dust",
					icepost:"ww_ice_post",railspike:"railspikepart",railtie:"railtiepart",coal:"coalpart",pickaxe:"pickaxepart",
					hairdryer:"hairdryerpart",milkandcookies:"task_milkandcookies",gps:"task_gps",silverbell:"task_jinglebells",
					holidaylights:"task_holidaylights",reindeertreat:"task_reindeertreat",holidaycheer:"task_holidaycheer",
					goo:"goo",hauntedbrick:"haunted_brick",knockers:"door_knockers",belt:"feedbelt",sack:"feedsack",scoop:"feedscoop",
					snowbrick:"parts_snowbrick",snowflake:"parts_magicsnowflake",icenail:"parts_icenail",
					snowglobe:"parts_snowglobe",iceboard:"parts_iceboard",frozenbeam:"parts_frozenbeam",
					
					nurserybarn:"woodenboard,nail,brick,blanket,bottle",craftingsilo:"tinsheet,hinge,screwdriver",
					beehive:"woodenboard,nail,brick,beeswax,smoker",horsestable:"woodenboard,brick,nail,horseshoe,harness",
					cove:"logpart,stonepart,steelbeampart",winterwonderlandtrainstation:"coalpart,railtiepart,railspikepart",
					"santa'ssleigh":"task_holidaylights,task_jinglebells,task_gps,task_holidaycheer,task_reindeertreat,task_milkandcookies",
					orchard:"woodenboard,brick,nail",sheeppen:"woodenboard,brick,nail",zoo:"component_shrub,wrench,pipe",
					winteranimalpen:"ww_ice_post,ww_fairy_dust,candy_cane_beam",pigpen:"woodenboard,brick,nail",
					horsepaddock:"logpart,component_bridle,component_saddle",cowpasture:"component_haybundle,tinsheet,stonepart",
					petrun:"component_paintedwood,component_waterpump,compoent_fencepost",duckpond:"shovel_item_01,wateringcan",
					wildlifehabitat:"component_fencepost,component_shrub,component_grazinggrass",aviary:"clamp,hinge,screwdriver",
					livestockpen:"component_waterpump,component_wire,steelbeampart",combine:"vehiclepart",garage:"woodenboard,brick,nail",
					harvesthoedown:"part_punch,part_snacks,part_paint","countduckula'scastle":"goo,haunted_brick,door_knockers",
					winterwaterwheel:"task_snowgear,task_snowchains,task_snowaxle",winterpaddock:"logpart,component_bridle,component_saddle",
					winterpasture:"component_haybundle,tinsheet,stonepart",animalfeedmill:"feedsack,feedscoop,feedbelt",
					icepalace:"parts_snowbrick,parts_magicsnowflake,parts_icenail,parts_snowglobe,parts_iceboard,parts_frozenbeam"
					
				}
			},

			//merge accept texts from dynamically created lists above
			accText: mergeJSON(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t29,t27,t30,t31),

			//tests for bonuses
			//see http://fbwm.wikia.com/wiki/Sidekick_Tutorial for in depth how-to instructions
			//changing the order of some of these tests will break this script
			tests: [
				//link excludes
				{ret:"exclude", link:[
					"Play FarmVille now","View full size!","feed their chickens","fertilize their crops",
					"start trading!","visit trading","Join them now","Accept as Neighbor",
					"visit","Join their Co-op","Help with the job","donate"
				]},
				
				//just say no to scam posts
				{ret:"exclude",url:[
					"www.facebook.com/pages/","Farmville.Nation","Farmville.Universe","Farmville.INC","Fv.Help","bit.ly",
					"FarmPrizes","Fv.Avg.Plane","FvWorld","zFarmvilleHelper","bit.ly","FarmvilleLatestHelpers"
				]},

				//body excludes
				{ret:"exclude", body:[
					"just planted their mystery tree seedling and could use help watering them",
					"found some extra bags of fertilizer","just Unwithered your crops!","posted a new comment on your farm",
					"wants to help you farm faster","just posted a note on your farm","gave up city livin' to become a farmer",
					"opened a Mystery Box and found","wants you to be their neighbor","has created a fantastic farm",
					"could use some gifts","is having a great time playing","is playing FarmVille on the iPhone",
					"is playing FarmVille on the iPad","has a new look!","found a lost pig with your name on her collar",
					"needs help harvesting a Bumper Crop",
				]},

				//specific text/url tests
				{body:"Big Candy Pumpkin",ret:"tree_giantcandypumpkin"},
				{url:["animal_mastery"],ret:"bottle"},
				{link:["get a bonus from them","Get a Job reward!"],ret:"coins"},
				{url:["AchievementFriendReward","MasteryFriendReward","FertilizeThankFriendReward"], ret:"coins"},
				{body:["needs your help in the Craftshop!"],ret:"bushel_random"},
				{body:"is hosting a barn raising", ret:"sendhelp"},
				{body:"needs more Turkeys for their Turkey Roost", ret:"sendturkey"},
				{body:"ram up for adopt", ret:"adopt_lambram"},
				{body:"ewe up for adopt", ret:"adopt_lambewe"},
				{link:"adopt {%1}", subTests:["piglet","lamb"], ret:"adopt_{%1}"},
				{body:"wandering stallion", ret:"wanderingstallion"},
				{body:["helped find a lost rabbit","is helping the bunnies"], ret:"adopt_rabbit"},
				{body:"yellow cattle", ret:"adopt_calfgelbvieh"},
				{body:"finished building their Zoo", ret:"adopt_babyelephant"},
				{body:"share this Black Tabby Cat", ret:"adopt_blackkitten"},
				{body:"has a free Himalayan Cat", ret:"adopt_himalayankitty"},
				{body:"finished building their Wildlife Habitat", ret:"adopt_porcupine"},
				{body:"has completed a Maison", ret:"provencalpot"},
				{body:"has completed their Botanical Garden", ret:"hangingflowers"},
				{body:"has completed their Japanese Barn", ret:"japanesetrellis"},
				{body:"has finished expanding their Nursery Barn", ret:"adopt_calfbaby"},
				{body:["has built a Horse Stable","has finished expanding their horse stable"], ret:"adopt_horse"},
				{body:"just finished building their Sheep Pen", ret:"adopt_ram"},
				{body:"just finished building their Aviary", ret:"adopt_farmgoose"},
				{body:"has a free Red Goat that they want to share", ret:"adopt_redgoat"},
				{body:"finished building their Cow Pasture",ret:"adopt_cowirishmoiled"},
				{body:"finished building their Horse Paddock",ret:"adopt_horsecreamdraft"},
				{body:"has built a Nursery Barn in FarmVille",ret:"adopt_foalgrey"},
				{link:"longtail duck", ret: "adopt_ducklongtail"},
				{body:"just completed this week's raffle and has extra tickets for you!",ret:"raffleticket"},
				{body:"Ram (Flowered Green)",ret:"adopt_ramfloweredgreen"},
				{body:"Flowered Horse",ret:"adopt_horseflowered"},
				{body:"was able to get {%1}", subTests:["arborist","farmhand","100 xp"], ret:"{%1}"},
				{body:"of the following items: {%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				{body:"is farming with fewer clicks", ret:"vehiclepart"},
				{body:"special Greenhouse crops and just surpassed", ret:"specialdelivery"},
				{body:"is harvesting cross-bred crops", ret:"treehouse"},
				{body:"found some mixed bouquets", ret:"flowerbouquet"},
				{body:"has some Flowers to share", ret:"flowers"},
				{body:"your crops are no longer withered", ret:"fuel"},
				{body:"is entered in a Sweepstakes to win a trip to England", ret:"postcard"},
				{body:"is getting ready for the Village Faire", ret:"tree_lemon"},
				{body:"just sent you an extra special present", ret:"present"},
				{body:["Just click below to collect it!","Here's a little something you might find useful!"], ret:"grabbag"},
				{body:"celebration by claiming Animal Feed",ret:"animalfeed"},
				{body:"sharing the Milking Shorthorn",ret:"adopt_cowmilkingshorthorn"},
				{link:"reward",ret:"coins"},
				{link:["get a goo","claim goo"],ret:"goo"},
				{body:["found some treats","is giving away treats"],ret:"treats"},
				{link:["spooky bat","get spider","claim spider","vampire teeth","ghost cupcake","carmel apple","pumpkin lollipop"],ret:"treats"},
				{link:["wieners","weiners","s'more","kindling","matches","plaid blanket","lumber"],ret:"bonfiresupplies"},
				{link:["magic snowflake","magic top hat","shooting star","mound of snow","aurora dust","starry scarf"],ret:"snowmanparts"},
				{link:"apple barrel",ret:"applebarrel"},
				{link:"apple wood basket",ret:"applewoodbasket"},
				{link:"get apple",ret:"apple"},
				{link:["get a trick",],ret:"tricks"},
				{link:["get rope","claim rope"],ret:"rope"},
				{link:"send lemon",ret:"sendlemon"},
				{link:"get lemon basket",ret:"lemonbasket"},
				{link:"raffle ticket",ret:"raffleticket"},
				{link:["get saddle","claim saddle"],ret:"saddle"},
				{body:"is done collecting all the Saddle",ret:"saddle"},
				{link:"adopt saddle foal",ret:"adopt_foalsaddle"},
				{body:"found an adorable Saddle foal",ret:"adopt_foalsaddle"},
				{body:["uncovered","trapped in ice"],ret:"mat_snowtreasure"},
				{link:"get materials",ret:"none",kids:[{body:"{%1} ",subTests:buildings,ret:"mat_{%1}"},]},
				{link:"get {%1}",subTests:otherConsumables,ret:"{%1}"},
				{link:"screwdriver",ret:"screwdriver"},
				{body:"is done collecting all the Screwdriver",ret:"screwdriver"},
				{body:"grew up into a Cow in their Nursery Barn",ret:"adopt_calfbaby"},
				{body:["supplies and just surpassed","is stocking their Harvest Bonfire with supplies","to help stock their friends' Harvest Bonfires!"], ret:"bonfiresupplies"},
				{link:["get log","claim log"],ret:"log"},
				{link:"send fire log",ret:"sendfirelog"},
				{body:"pink patch calf bull",ret:"adopt_calfpinkpatchbull"},
				{link:["send materials","send building parts","send parts"],ret:"sendmat"},
				{link:["holiday gift","get gifts"],ret:"holidaygifts",kids:[{body:"magic snowflake",ret:"snowmanparts"},]},
				{link:"get gift",ret:"holidaygifts",kids:[{body:"stocking stuffer",ret:"stockingstuffer"},]},
				{body:"found an adorable calf",ret:"adopt_calfbaby"},
				{body:"filled their Holiday Tree to earn a special gift",ret:"holidaygifts"},
				{link:"north-polarized goggles",ret:"sendpolarizedgoggles"},
				{link:"help and get one",ret:"sendhelp"},
				{link:"get one",ret:"none",kids:[{body:"Magic Snowman",ret:"snowmanparts"},]},
				{link:"vote now",ret:"stockingstuffer"},
				{img:"e3593e5c7c796def3e734cdc82e3b854",ret:"sendwarmthermos"},
				{img:"252a7c266ba8f9274db69e6b77d610a1",ret:"sendwinterchili"},
				{link:"claim {%1}",subTests:["goo","sack","scoop","belt"],ret:"{%1}"},
				
				//holiday tree 2011 items
				{link:"claim it",ret:"none",kids:[
					{img:"2057bb48e6218f7872275a5f598f3dbe",ret:"tree_giantpoinsettia"},
					{img:"1daac2a32f3cff1e9d1e6be36d1ccb00",ret:"snowdrift"},
					{img:"f0bb0874eebe3f8b82f2cfa08fbaf7d2",ret:"horsesnowglobe"},
					{img:"a1fba272cce026483331d5a3b51da743",ret:"lightedhedge"},
					{img:"9ef18f3747eaedc97e8b12ded42ff7b9",ret:"carolingsnowman"},
					{img:"2d0fb731d3219e543b031dbd6ed17062",ret:"teddybearsnowglobe"},
					{img:"386facd490ae76cf31876845a0893ab7",ret:"adopt_carolinggoat"},
					{img:"afa8195c0a7a49514464a45faa1b6132",ret:"luminaryfence"},
					{img:"c27998b5e780e9363db27db71a10c73d",ret:"coal"},
					{img:"b42c0a157197ceb896afe22ec4c0e48f",ret:"animalfeed"},
					{img:"417d2412991bdc6c5941e876b617071f",ret:"railspike"},
					{img:"77bc73ef224bd9b0bd70e53a51c11d47",ret:"railtie"},
					{img:"18bb508499a8369017208586170d3cf0",ret:"wateringcan"},
					{img:"890e543735401b5e5325d214805aa029",ret:"arborist"},
					{img:"4b8cc80501cc6d433b47b19bf3512337",ret:"farmhand"},
					{img:"83162ebbc9e06677ef8121ef01906efe",ret:"fertilizeall"},
					{img:"eba8a91b33b34f0f6505aad21a367990",ret:"frozenfountain"},
					{img:"0e79859e7349415c5592bbc9bd9b1d58",ret:"log"},
					{img:"b2144f972c0354950e7633b4bc3bc20a",ret:"stone"},
					{img:"669e1eb90c73dfcc6342375aa2db67a1",ret:"steelbeam"},
					{img:"3744842e1fd51242cc9b7c0da72f212e",ret:"hairdryer"},
					{img:"aad46346769a3e818e5b3d233dc1443c",ret:"pickaxe"},
					{img:"faf5bc0d1a4fef592f4b47b25ccc5196",ret:"stringlights"},
					{img:"9db417e17c47331f0175b7abc0116838",ret:"hollyfence"},
					{img:"cc77d40e3812adc785bfcdd2b2ff007d",ret:"giantcandy"},
				]},
				
				{body:"making good progress",ret:"none",kids:[
					{img:"f77442b5256ee2bf9374ea0572441f0a",ret:"holidaylights"},
					{img:"31a21629cef1a7ee9d048fbdcdd2300d",ret:"silverbell"},
					{img:"27a8b5c7730f0aff50da3aeca3e21a56",ret:"gps"},
					{img:"69f5031238453052f285d00d1538a9ca",ret:"snowflake"},
					{img:"2b2e8ba2c576a3a672d5d440e9e58cde",ret:"snowbrick"},
					{img:"cae16ae007e478c63228b8a3198bf1a2",ret:"icenail"},
					{img:"e2938eba8c6400466b0f5fd1d51ee504",ret:"snowglobe"},
					{img:"f360c4422127142e7d441b7c01a3495b",ret:"frozenbeam"},
					{img:"88e8dfabdd00d14cf62fbeae6a8f24e8",ret:"iceboard"},
				]},
				
				//search icon & stork images to distinguish animals with same body texts
				{link:"adopt",ret:"none",kids:[
					{img:["a3296aaf1c2f6ab5235f41038646aa0b","52531c423fa31d46978c5a5404966efa"],ret:"adopt_foalcandycorn"},
					{img:["6c4f8f10802946b4d1c51755548809d9","c0601163daac553e141923dcdc48e0b6"],ret:"adopt_foalcandycornpony"},
					{img:"6f82eb77932eff007e6a955467355681",ret:"adopt_foalnightmaremini"},
					{img:["3809a8b10346e4b290ecfec94ad8da8e","ee48ca0cabfd337abddb077dddd9209d"],ret:"adopt_foalnightmare"},
					{img:["a7a3d17cfd8add6e4cb5bd6198f694b3","a6fd6ad586ac5fb37bd5aba83524f279"],ret:"adopt_calfholidaywreath"},
					{img:["ee174fe3388734c7a21cecee560cd30d","d8d444ea83aa160162e4fa59acc19835"],ret:"adopt_calfholiday"},
					{img:["8829e58a2c7e39fc8e5012d0c8c2f679","7ea063c8cac4c65354366f00ddf58d50"],ret:"adopt_foalwhitepegasus"},
					{img:["fd885b15f91752e200c0ebf0b58d6c5d","7e01d7f3c6e6940d4b98cc74321be3e3"],ret:"adopt_foalgypsystallion"},
					{link:"Items:foal_gypsy_st",ret:"adopt_foalgypsystallion"},
					{img:["57408b56ed20ae7f71e15f1036489160","c4daef35af7f7256226a7c7680dd9692"],ret:"adopt_foaldiscopony"},
					{img:["9155daa26714cf89f5abeaf706bb6d4c","869cff415e74ac29dfd61c61d7f351a3"],ret:"adopt_foaldisco"},
					{img:["727a79da46ba46d34e6d120d70eeb062","e43bf2f2e70ac9289290020d2e40fbeb"],ret:"adopt_calfnewyear"},
					{img:["5dad5998d9f543dbb4675ef0ac44076c","4f478aa8e1a7c489795a25c5bcec0fac"],ret:"adopt_calfliondance"},
				]},
				
				//search calves/foals by link text before materials
				{link:"{%1} foal",subTests:foalTypes,ret:"adopt_foal{%1}"},
				{body:"{%1}-foal",subTests:foalTypes,ret:"adopt_foal{%1}"},
				{link:"{%1} calf",subTests:calfTypes,ret:"adopt_calf{%1}"},
				{link:"adopt the calf",ret:"none",kids:[
					{body:"found a {%1} calf",subTests:calfTypes,ret:"adopt_calf{%1}"},
				]},
				
				//trees
				{body:"{%1}",subTests:["tree","seedling grew up "],ret:"none",kids:[
					{body:"ornament tree II",ret:"tree_ornament2"},
					{body:"{%1}",subTests:["giant","big"], ret:"none",kids:[
						{body:"{%1}",subTests:treeTypes2, ret:"tree_giant{%1}"},
					]},
					{body:"{%1}",subTests:treeTypes, ret:"tree_{%1}"},
				]},
				
				//send
				{link:["give","send","lend"],ret:"none",kids:[
					{link:"{%1}",subTests:questItems,ret:"send{%1}"}, //quest items
					{link:"item to",ret:"sendwishlist"}, //send wishlists
					{link:"{%1}",subTests:["feed","bushel","help","bottle"],ret:"send{%1}"}, //specific sends
					{link:"{%1}",subTests:craftingMaterials,ret:"sendbasket"},
					{link:["materials","building parts","parts"],ret:"sendmat"},
					{body:"{%1}",subTests:questItems,ret:"send{%1}"},
					{body:"{%1}",subTests:[].concat(materials,otherWords),ret:"sendmat"},
				]},
				{link:["get","get a","get an"],ret:"none",kids:[
					{link:"{%1}",subTests:questItems,ret:"send{%1}"},
				]},

				
				//building materials by building
				{link:["materials","parts"],ret:"none",kids:[
					{link:"{%1}",subTests:materials,ret:"{%1}"}, //<---- added this to avoid marking vehicle parts as goo
					{body:"{%1}",subTests:materials,ret:"{%1}"},
					{body:"{%1}", ret:"none",
						subTests:["upgrading","good progress","addition of a station","half-way","halfway","finished","expanding","completion of","upgrade of","progress on","built a","adding stations","adding a station"],
						kids:[{body:"{%1}",ret:"mat_{%1}",subTests:buildings}]
					},
					{body:"{%1}",subTests:buildings,ret:"mat_{%1}"},
				]}, 
				
				//crafted samples
				{body:"{%1}", subTests:["improved their","offering some free sample","now a master","bought some"], ret:"none",kids:[
					//this entry may seem redundant but it actually prevents misidentification mistakes
					{body:"{%1}", subTests:craftTypes, ret:"sample",kids:[
						{body:"level {%1} ", subNumRange:"1,20", ret:"sample1"},
						{body:"level {%1} ", subNumRange:"21,40", ret:"sample2"},
						{body:"level {%1} ", subNumRange:"41,80", ret:"sample3"},
						{body:"level {%1} ", subNumRange:"81,100", ret:"sample4"},
						{body:"level {%1} ", subNumRange:"100,140", ret:"sample5"},						
					]},
					{link:"grab a good",ret:"sample2"},
				]},
				{link:"sample",ret:"sample"}, // prevents "goods" being mistaken for "goo" after other samples have been identified
				
				//simply by link texts
				//here we create an array on the fly for special words, then we add other predefined arrays, then we fix the order before searching
				{link:"{%1}", subTests:[].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				
				//order specific crops
				{link:"place order", ret:"order",kids:[
					{body:"{%1}", subTests:bushelTypes, ret:"order_{%1}"},
				]},
				
				//hatch specific eggs
				{body:"found some {%1} eggs",subTests:eggTypes,ret:"egg_{%1}"},
				{link:"hatch", ret:"none", kids:[
					{body:"{%1}",subTests:eggTypes,ret:"egg_{%1}"},
				]},

				//mystery babies
				{link:["adopt a mystery baby","adopt an egg","adopt a winter baby"],ret:"none",kids:[
					{body:"rare",ret:"none",kids:[
						{body:"{%1}",subTests:["wildlife","zoo","pet run","aviary","livestock","winter"],ret:"adopt_{%1}rare"},
					]}, //end rare
					{body:"{%1}",subTests:["wildlife","zoo","pet run","aviary","livestock","winter"],ret:"adopt_{%1}common"},
					{body:"{%1}",ret:"adopt_baby"}, //unknown
				]}, //end adopt

				
				//new cow pasture/horse paddock catches
				{link:"adopt a baby",ret:"none",kids:[
					{body:"found an adorable ",ret:"none",kids:[
						{body:"foal",ret:"adopt_foal",kids:[
							{body:"{%1} ",subTests:foalTypes,ret:"adopt_foal{%1}"},
							{body:"{%1}-",subTests:foalTypes,ret:"adopt_foal{%1}"},
						]},
						{body:"calf",ret:"adopt_calf",kids:[
							{body:"{%1} ",subTests:calfTypes,ret:"adopt_calf{%1}"},
						]},
						{body:"{%1} yak",subTests:yakTypes,ret:"adopt_yak{%1}"},
						{body:"{%1}",subTests:otherAnimals,ret:"adopt_{%1}"},
					]},
				]},
				
				
				//catch special materials before building materials
				{link:["one","some","bonus"],ret:"none",kids:[
					{body:"{%1}",subTests:specialMaterials,ret:"{%1}"},
				]},
					
				//catchall for materials by link
				{link:"{%1}",subTests:materials,ret:"{%1}"},
				
				//join crafting teams
				{url:["CraftingRandomLootFriendReward","CraftingRandomLootCrewFriendReward"],ret:"none",kids:[
					{body:"{%1}",subTests:craftShop,ret:"join{%1}"},
				]},
				
				//collectibles and collection tradeins
				{body:"{%1}", subTests:["noticed you could use a","has completed the","collect"], ret:"none",kids:[
					{body:"{%1}", subTests:colTypes, ret:"col_{%1}"},
					{body:"{%1}", subTests:colGroups, ret:"colX_{%1}"},
				]},

				//catchall for bushels. here we use body text because link text is sometimes wrong or truncated.
				{body:"bushel", ret:"bushel", kids:[
					{body:"{%1}", subTests:bushelTypes, ret:"bushel_{%1}"},
				]},

				//perfect bunches
				{body:"perfect bunch", ret:"perfectbunch", kids:[
					{body:"{%1}", subTests:flowerTypes, ret:"perfect_{%1}"},
				]},

				//seeds
				{body:"seed",ret:"none",kids:[
					{link:"honeybee", ret:"honeybee"},
					{body:"pollinated", ret:"pollinated",kids:[
						{body:"{%1}", subTests:bushelTypes, ret:"polseeds_{%1}"},
					]},
					{body:"{%1}", subTests:seedTypes, ret:"seeds_{%1}"},
				]},

				//dynamic adoptions when foal/calf/duckling is in the link
				{link:"foal", ret:"adopt_foal",kids:[
					{either:" {%1}", subTests:foalTypes, ret:"adopt_foal{%1}"},
				]},
				{link:"calf", ret:"adopt_calf",kids:[
					{either:" {%1}", subTests:calfTypes, ret:"adopt_calf{%1}"},
				]},
				{link:"duckling", ret:"adopt_duckling",kids:[
					{body:"duckling grew up to become a", ret:"adopt_duckling"},
					{either:" {%1}", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},
				]},

				//catchalls for missed foal/calf/ducklings by link
				{body:"{%1} foal", subTests:foalTypes, ret:"adopt_foal{%1}"},
				{body:"{%1} calf", subTests:calfTypes, ret:"adopt_calf{%1}"},
				{body:"{%1} duckling", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},

				//catchalls for other known animals sets
				{body:"{%1} duck", subTests:duckTypes, ret:"adopt_duck{%1}"},
				{body:"{%1} pig", subTests:pigTypes, ret:"adopt_pig{%1}"},
				{body:"{%1} sheep", subTests:sheepTypes, ret:"adopt_sheep{%1}"},
				{body:"{%1} ewe", subTests:sheepTypes, ret:"adopt_ewe{%1}"},
				{body:"{%1} cow", subTests:cowTypes, ret:"adopt_cow{%1}"},
				{body:"{%1} horse", subTests:horseTypes, ret:"adopt_horse{%1}"},
				
				//catchall for known animal adoption
				{body:"{%1}", subTests:otherAnimals, ret:"adopt_{%1}"},

				//simply by link texts
				//here we create an array on the fly for special words, then we add other predefined arrays, then we fix the order before searching
				{link:"{%1}", subTests:["coins","bushel","perfect bunch","tree"].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},
				
				//simply by body text
				{body:"{%1}", subTests:["coins","bushel","perfect bunch","tree"].concat(decorTypes,materials,otherWords).fixOrder(), ret:"{%1}"},

				//animal catchalls
				//these need to run after ALL other tests because they have text that may be misidentified earlier
				{body:"{%1}", subTests:animalCatchalls, ret:"adopt_{%1}"},

			],

			//build the menu just as you would for FVWM except omit default values
			//if this script moves, be sure to change the userscripts source id for the link below
			//it should be the same number as in the @require line on top of this script

			menu: {
				section_main:{type:'section',label:'FarmVille ('+version+')',kids:{

				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/111560.user.js'},

				basicsep:{type:'separator',label:'Basics',kids:{
				basictab:{type:'tab',label:'Basics',kids:{
					coins:{type:'checkbox',label:"Bonuses (Coins)"},
					"100xp":{type:'checkbox',label:"XP"},
					doUnknown:{type:'checkbox',label:"Process Unrecognized Posts"},
					dontsteal:{type:'checkbox',label:"Don't Process W2W Posts"},
				}},

				animalfeedsep:{type:'tab',label:"Animal Feed",kids:{
					feedblock:{type:'optionblock',label:"Feed Types:",kids:{
						animalfeed:{type:'checkbox',label:"Animal Feed"},
						puppykibble:{type:'checkbox',label:"Puppy Kibble"},
						dogtreat:{type:'checkbox',label:"Dog Treat"},
					}}
				}},

				boostssep:{type:'tab',label:"Consumables",kids:{
					boostblock:{type:'optionblock',label:"Consumables:",kids:{
						arborist:{type:'checkbox',label:"Arborist"},
						farmhand:{type:'checkbox',label:"Farmhand"},
						fertilizeall:{type:'checkbox',label:"Fertilize All"},
						instagrow:{type:'checkbox',label:"Instagrow"},
						lovepotion:{type:'checkbox',label:"Love Potion"},
						fuel:{type:'checkbox',label:"Fuel"},
						turbocharge:{type:'checkbox',label:"Turbo Charge"},
						unwither:{type:'checkbox',label:"Unwither"},
					}},

					sampleblock:{type:'optionblock',label:"Crafting Samples (for fuel) By Level:", kids:{
						sample1:{type:'checkbox',label:"1-20"},
						sample2:{type:'checkbox',label:"21-40"},
						sample3:{type:'checkbox',label:"41-80"},
						sample4:{type:'checkbox',label:"80-100"},
						sample5:{type:'checkbox',label:"100+"},
						sample:{type:'checkbox',label:"??"},
					}},					
		
					mysteryblock:{type:'optionblock',label:"Other:",kids:{
						mysterygift:{type:'checkbox',label:"Mystery Gift"},
						specialdelivery:{type:'checkbox',label:"Special Delivery"},
						capitalonegift:{type:'checkbox',label:"Capital One Gift"},
					}}
				}},

				eggsep:{type:'tab',label:"Mystery Eggs",kids:{
					eggblock:{type:'optionblock',label:"Mystery Eggs:",kids:createMenuFromArray(eggTypes,'egg_')},
				}},

				trufflesep:{type:'tab',label:"Truffles",kids:{
					truffleblock:{type:'optionblock',label:"Truffles",kids:{
						browntruffle:{type:'checkbox',label:"Brown"},
						blacktruffle:{type:'checkbox',label:"Black"},
						whitetruffle:{type:'checkbox',label:"White"},
						goldtruffle:{type:'checkbox',label:"Gold"},
					}}
				}},

				//here we make use of the new function createMenuFromArray
				//we can make whole menu blocks from a single array
				//that function sorts the array by alphabetical order for you
				//and also capitalizes words for better display with the menu

				/*craftsep:{type:'tab',label:"Craft Samples",kids:{
					craftbakeryblock:{type:'optionblock',label:"Bakery:",kids:createMenuFromArray(craftBakery,'sample_')},
					craftspablock:{type:'optionblock',label:"Spa:",kids:createMenuFromArray(craftSpa,'sample_')},
					craftwineryblock:{type:'optionblock',label:"Winery:",kids:createMenuFromArray(craftWinery,'sample_')},
					craftpubblock:{type:'optionblock',label:"Pub:",kids:createMenuFromArray(craftPub,'sample_')},
					craftrestrauntblock:{type:'optionblock',label:"Restraunt",kids:createMenuFromArray(craftRestraunt,'sample_')},
				}},*/
		
				helpsep:{type:'tab',label:"Tasks",kids:{
					helpblock:{type:'optionblock',label:"Participate in:",kids:{
						sendhelp:{type:'checkbox',label:"Barn Raisings & Send Help"},
						bushel_random:{type:'checkbox',label:"Crafting Workshops (random bushel)"},
					}},
					sendall:{type:'checkbox',label:"Send All Requested Items or Select From Below (also does barn raisings)"},
					sendblock:{type:'optionblock',label:"Send Neighbors:",kids:{
						sendmat:{type:'checkbox',label:"Consumables/Materials"},
						sendwishlist:{type:'checkbox',label:"Wishlists"},
						sendfeed:{type:'checkbox',label:"Animal Feed"},
						sendbottle:{type:'checkbox',label:"Bottles"},
						sendbushel:{type:'checkbox',label:"Bushels"},
						sendbasket:{type:'checkbox',label:"Baskets"},
						sendturkey:{type:'checkbox',label:"Turkeys"},
					}},
					questblock:{type:'optionblock',label:"Send-One-Get-One Goal Items:",kids:createMenuFromArray(questItems,"send")},
				}},

				matsep:{type:'tab',label:"Materials",kids:{
					matBlock:{type:'optionblock',label:"Standard:",kids:createMenuFromArray(standardMaterials,"")},
					matBlock2:{type:'optionblock',label:"Special:",kids:createMenuFromArray(specialMaterials,"")},
					matBlock3:{type:'optionblock',label:"Crafing:",kids:createMenuFromArray(craftingMaterials,"")},
					matBlock4:{type:'optionblock',label:"Other:",kids:createMenuFromArray(otherWords,"")},				
					matbybuilding:{type:'optionblock',label:'Random Materials by Building: (does not automatically include items above)',kids:createMenuFromArray(buildings,'mat_')},
				}}

				}}, //end basics section

				orchardsep:{type:'separator',label:"Orchard",kids:{
					mysteryseedling:{type:'checkbox',label:"Mystery Seedlings"},
					wateringcan:{type:'checkbox',label:"Watering Cans"},
					treestab1:{type:'tab',label:"Standard Trees",kids:{
						trees:{type:'optionblock',label:"Normal:",kids:createMenuFromArray(treeTypes,'tree_')},
					}},
					treestab2:{type:'tab',label:"Giant Trees",kids:{
						treeslg:{type:'optionblock',label:"Giant:",kids:createMenuFromArray(treeTypes2,'tree_giant')},
					}},
					tree:{type:'checkbox',label:"Unknown Trees"},
				}},
				
				colsep:{type:'separator',label:"Collectibles",kids:{
					colBlock1:{type:'optionblock',label:"Berries:",kids:createMenuFromArray(colBerries,"col_")},
					colBlock2:{type:'optionblock',label:"Citrus:",kids:createMenuFromArray(colCitrus,"col_")},
					colBlock3:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(colCows,"col_")},
					colBlock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(colFlowers,"col_")},				
					colBlock5:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(colGrains,"col_")},				
					colBlock6:{type:'optionblock',label:"Squash:",kids:createMenuFromArray(colSquash,"col_")},				
					colBlockX:{type:'optionblock',label:"Unknown Collectibles by Collection:",kids:createMenuFromArray(colGroups,"colX_")},
				}},

				decosep:{type:'separator',label:"Decorations",kids:{
				decortab:{type:'tab',label:'Decorations',kids:{
				//	decoblock:{type:'optionblock',label:"Various Decorations and Odd Animals:",kids:createMenuFromArray(decorTypes,"")},
					decoBlock01:{type:'optionblock',label:"Halloween: (event-specific animals not included)",kids:createMenuFromArray(decorHalloween,"")},
					decoBlock02:{type:'optionblock',label:"Thanksgiving:",kids:createMenuFromArray(decorThanksgiving,"")},
					decoBlock03:{type:'optionblock',label:"Christmas:",kids:createMenuFromArray(decorChristmas,"")},
					decoBlock19:{type:'optionblock',label:"Winter Wonderland:",kids:createMenuFromArray(decorWinterWonderland,"")},
					decoBlock20:{type:'optionblock',label:"Holiday Hearth:",kids:createMenuFromArray(decorHolidayHearth,"")},
					decoBlock21:{type:'optionblock',label:"Magic Snowman:",newitem:true,kids:createMenuFromArray(decorMagicSnowman,"")},
					decoBlock05:{type:'optionblock',label:"Valentine's Day:",kids:createMenuFromArray(decorValentines,"")},
					decoBlock07:{type:'optionblock',label:"St. Patrick's Day:",kids:createMenuFromArray(decorStPatty,"")},
					decoBlock08:{type:'optionblock',label:"Wishing Well:",kids:createMenuFromArray(decorWishingWell,"")},
					decoBlock09:{type:'optionblock',label:"Spring Basket:",kids:createMenuFromArray(decorSpringBasket,"")},
					decoBlock10:{type:'optionblock',label:"Spring Countdown:",kids:createMenuFromArray(decorSpringCountdown,"")},
					decoBlock11:{type:'optionblock',label:"Shovels:",kids:createMenuFromArray(decorShovels,"")},
					decoBlock12:{type:'optionblock',label:"School Supplies:",kids:createMenuFromArray(decorSchoolSupplies,"")},				
					decoBlock13:{type:'optionblock',label:"Tuscan Wedding:",kids:createMenuFromArray(decorTuscanWedding,"")},
					decoBlock14:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(decorFlowers,"")},
					decoBlock15:{type:'optionblock',label:" Birthday 2:",kids:createMenuFromArray(decorFV2Birthday,"")},
					decoBlock16:{type:'optionblock',label:"Sand Castle:",kids:createMenuFromArray(decorSandCastle,"")},
					decoBlock17:{type:'optionblock',label:"Bobbing For Apples:",kids:createMenuFromArray(decorApples,"")},
					decoBlock18:{type:'optionblock',label:"Other:",kids:createMenuFromArray(decorOther,"")},		
				}},
				
				flowerssep:{type:'tab',label:"Flowers",kids:{
					perfectblock1:{type:'optionblock',label:"Perfect Bunches:",kids:createMenuFromArray(flowerTypes,"perfect_")},
					perfectbunch:{type:'checkbox',label:"Unknown Bunches"},
				}},
				
				}}, // end decorations
				
				adoptsep:{type:'separator',label:"Adopt Specific Animals",kids:{
				bovinetab:{type:'tab',label:"Cows & Calves",kids:{
					adopt_lonelybull:{type:'checkbox',label:"Lonely Bull"},
					cowBlock:{type:'optionblock',label:"Cows:",kids:createMenuFromArray(cowTypes,"adopt_cow")},			
					calfBlock:{type:'optionblock',label:"Calves:",kids:createMenuFromArray(calfTypes,"adopt_calf")},
					adopt_babyox:{type:'checkbox',label:"Baby Ox"},
					adopt_calf:{type:'checkbox',label:"Unknown Calves"},
				}},
				equinetab:{type:'tab',label:"Horses & Foals",kids:{
					wanderingstallion:{type:'checkbox',label:"Help Wandering Stallions"},
					horseBlock:{type:'optionblock',label:"Horses:",kids:{
						adopt_auroraunicorn:{type:'checkbox',label:"Aurora Unicorn",newitem:true},
						adopt_blackpony:{type:'checkbox',label:"Black Pony"},
						adopt_horseblacksnowfantasy:{type:'checkbox',label:"Black Snow Fanstasy"},
						adopt_horsebrown:{type:'checkbox',label:"Brown"},
						adopt_horsecandycorn:{type:'checkbox',label:"Candy Corn"},
						adopt_candycornunicorn:{type:'checkbox',label:"Candycorn Unicorn"},
						adopt_horsecreamdraft:{type:'checkbox',label:"Cream Draft"},
						adopt_horseflowered:{type:'checkbox',label:"Flowered"},
						adopt_horsegray:{type:'checkbox',label:"Gray"},
						adopt_horsegrey:{type:'checkbox',label:"Grey"},
						adopt_nightmarestallion:{type:'checkbox',label:"Nightmare Stallion"},
						adopt_nutcrackerstallion:{type:'checkbox',label:"Nutcracker Stallion"},
						adopt_horsered:{type:'checkbox',label:"Red"},
						adopt_horseredpinto:{type:'checkbox',label:"Red Pinto"},
						adopt_whitemustang:{type:'checkbox',label:"White Mustang"},
						adopt_horsewhitesnowfantasy:{type:'checkbox',label:"White Snow Fantasy"},
					}},
					adopt_horse:{type:'checkbox',label:"Unknown Horses"},
					
					foalBlock:{type:'optionblock',label:"Foals:",kids:createMenuFromArray(foalTypes,"adopt_foal")},
					otherfoalBlock:{type:'optionblock',label:"Other:",kids:{
						adopt_babymule:{type:'checkbox',label:"Baby Mule"},
						adopt_mistletoedonkeybaby:{type:'checkbox',label:"Mistletoe Donkey Baby"},
						adopt_trickortreatdonkeybaby:{type:'checkbox',label:"Trick Or Treat Donkey Baby"},
					}},
					adopt_foal:{type:'checkbox',label:"Unknown Foals"},
				}},
				porcinetab:{type:'tab',label:"Pigs & Piglets",kids:{				
					pigBlock:{type:'optionblock',label:"Pigs:",kids:{
						adopt_boar:{type:'checkbox',label:"Boar"},
						adopt_yellowsow:{type:'checkbox',label:"Yellow Sow"},
						adopt_pig:{type:'checkbox',label:"Plain Pink"},
						adopt_pigblack:{type:'checkbox',label:"Black"},
						adopt_pigwhite:{type:'checkbox',label:"White"},
						adopt_pigstrawberry:{type:'checkbox',label:"Strawberry"},
						adopt_pighotpink:{type:'checkbox',label:"Hot Pink"},
						adopt_pigossabaw:{type:'checkbox',label:"Ossabaw"},
						adopt_pigpinkpotbelly:{type:'checkbox',label:"Pink Pot Belly"},
						adopt_pigpoolside:{type:'checkbox',label:"Poolside"},
						adopt_pigghost:{type:'checkbox',label:"Ghost"},
					}},	
					pigletblock:{type:'optionblock',label:"Pig Pen Piglets:",kids:{
						adopt_piglet:{type:'checkbox',label:"Indeterminate"},
					}},
				}},
				sheepistab:{type:'tab',label:"Goats, Sheep & Lambs",kids:{				
					sheepBlock:{type:'optionblock',label:"Sheep:",kids:{
						adopt_sheepcaroling:{type:'checkbox',label:"Caroling"},
						adopt_ramfloweredgreen:{type:'checkbox',label:'Flowered Green Ram'},
						adopt_eweluv:{type:'checkbox',label:"Luv Ewe"},
						adopt_sheepminer:{type:'checkbox',label:"Miner"},
						adopt_sheepmouflon:{type:'checkbox',label:"Mouflon"},
						adopt_sheep:{type:'checkbox',label:"Plain White"},
						adopt_sheeppolkadot:{type:'checkbox',label:"Polkadot"},
						adopt_ram:{type:'checkbox',label:"Ram"},
						adopt_sheepred:{type:'checkbox',label:"Red"},
						adopt_rednosesheep:{type:'checkbox',label:"Red Nose"},
						adopt_sheepscuba:{type:'checkbox',label:"Scuba"},
						adopt_ewescared:{type:'checkbox',label:"Scared Ewe"},
						adopt_sheepstarbright:{type:'checkbox',label:"Star Bright",newitem:true},
						adopt_ewesunny:{type:'checkbox',label:"Sunny Ewe"},
						adopt_eweschooled:{type:'checkbox',label:"Schooled Ewe"},
						adopt_ewethank:{type:'checkbox',label:"Thank Ewe"},
					}},

					goatBlock:{type:'optionblock',label:"Goats:",kids:{
						adopt_boergoat:{type:'checkbox',label:"Boer"},
						adopot_carolinggoat:{type:'checkbox',label:"Caroling"},
						adopt_redgoat:{type:'checkbox',label:"Red"},
						adopt_redtoggenburggoat:{type:'checkbox',label:"Red Toggenburg"},
						adopt_mouflongoat:{type:'checkbox',label:"Mouflon"},
					}},
					adopt_goat:{type:'checkbox',label:"Unknown Goats"},

					lambBlock:{type:'optionblock',label:"Lambs:",kids:{
						adopt_babylamb:{type:'checkbox',label:"Brown"},
						adopt_pinklamb:{type:'checkbox',label:"Pink"},
					}},

					lambBlock2:{type:'optionblock',label:"Sheep Pen Lambs:",kids:{
						adopt_lamb:{type:'checkbox',label:"Indeterminate Sex"},
						adopt_lambram:{type:'checkbox',label:"Known Male"},
						adopt_lambewe:{type:'checkbox',label:"Known Female"},
					}},
				}},
				duckustab:{type:'tab',label:"Ducks & Ducklings",kids:{				
					duckBlock:{type:'optionblock',label:"Ducks:",kids:{
						adopt_duckbanjo:{type:'checkbox',label:"Banjo"},
						adopt_duckbelted:{type:'checkbox',label:"Belted"},
						adopt_duckgoldeneye:{type:'checkbox',label:"Goldeneye"},
						adopt_ducklongtail:{type:'checkbox',label:"Longtail"},
						adopt_duckparty:{type:'checkbox',label:"Party"},
						adopt_duckugly:{type:'checkbox',label:"Ugly"},
						adopt_duckwarder:{type:'checkbox',label:"Warder"},
					}},
					adopt_duck:{type:'checkbox',label:"Unknown Ducks"},

					ducklingBlock:{type:'optionblock',label:"Ducklings:",kids:{
						adopt_ducklingbrown:{type:'checkbox',label:"Brown"},
						adopt_ducklingblue:{type:'checkbox',label:"Blue"},
						adopt_ducklingred:{type:'checkbox',label:"Red"},
						adopt_ducklingyellow:{type:'checkbox',label:"Yellow"},
						adopt_ducklingugly:{type:'checkbox',label:"Ugly"},
					}},
					adopt_duckling:{type:'checkbox',label:"Unknown Ducklings"},
				}},
				
				mysterybabytab:{type:'tab',label:"Mystery Babies",kids:{
					wildlifeblock:{type:'optionblock',label:"Wildlife Habitat:",kids:{
						adopt_wildlifecommon:{type:'checkbox',label:"Common"},
						adopt_wildliferare:{type:'checkbox',label:"Rare"},
					}},
					
					petrunblock:{type:'optionblock',label:"Pet Run:",kids:{
						adopt_petruncommon:{type:'checkbox',label:"Common"},
						adopt_petrunrare:{type:'checkbox',label:"Rare"},
					}},

					zooblock:{type:'optionblock',label:"Zoo:",kids:{
						adopt_zoocommon:{type:'checkbox',label:"Common"},
						adopt_zoorare:{type:'checkbox',label:"Rare"},
					}},
					
					aviaryblock:{type:'optionblock',label:"Aviary:",kids:{
						adopt_aviarycommon:{type:'checkbox',label:"Common"},
						adopt_aviaryrare:{type:'checkbox',label:"Rare"},
					}},
					
					livestockblock:{type:'optionblock',label:"Livestock Pen:",kids:{
						adopt_livestockcommon:{type:'checkbox',label:"Common"},
						adopt_livestockrare:{type:'checkbox',label:"Rare"},
					}},
					
					winterpenblock:{type:'optionblock',label:"Winter Animal Pen:",kids:{
						adopt_wintercommon:{type:'checkbox',label:"Common"},
						adopt_winterrare:{type:'checkbox',label:"Rare"},
					}},
					
					adopt_baby:{type:'checkbox',label:"Unknown Babies"},
				}},
				
				miscanimstab:{type:'tab',label:"Other Animals",kids:{
					catBlock:{type:'optionblock',label:"Cats:",kids:{
						adopt_auroracat:{type:'checkbox',label:"Aurora",newitem:true},
						adopt_blackkitten:{type:'checkbox',label:"Black"},
						adopt_himalayankitty:{type:'checkbox',label:"Himalayan"},
						adopt_persiancat:{type:'checkbox',label:"Persian"},
						adopt_whitekitty:{type:'checkbox',label:"White"},
					}},

					chickenBlock:{type:'optionblock',label:"Chickens:",kids:{
						adopt_cloverchicken:{type:'checkbox',label:"Clover"},
						adopt_dorkingchicken:{type:'checkbox',label:"Dorking"},
						adopt_rhodeislandredchicken:{type:'checkbox',label:"Rhode Island Red"},
						adopt_chicken:{type:'checkbox',label:"White"},
					}},
					
					gooseBlock:{type:'optionblock',label:"Geese:",kids:{
						adopt_farmgoose:{type:'checkbox',label:"Farm Goose"},
						adopt_whitegoose:{type:'checkbox',label:"White Goose"},
					}},
					
					llamaBlock:{type:'optionblock',label:"Llamas:",kids:{
						adopt_llama:{type:'checkbox',label:"Llama"},
						adopt_ponchollama:{type:'checkbox',label:"Poncho Llama"},
						adopt_whitellama:{type:'checkbox',label:"White Llama"},
					}},
					
					bunnyBlock:{type:'optionblock',label:"Rabbits:",kids:{
						adopt_arcticrabbit:{type:'checkbox',label:"Arctic"},
						adopt_blackrabbit:{type:'checkbox',label:"Black"},
						adopt_cloverrabbit:{type:'checkbox',label:"Clover"},
						adopt_dutchrabbit:{type:'checkbox',label:"Dutch"},
						adopt_englishspotrabbit:{type:'checkbox',label:"English Spot"},
						adopt_rabbit:{type:'checkbox',label:"White"},
					}},

					reindeerBlock:{type:'optionblock',label:"Reindeer:",kids:{
						adopt_reindeer:{type:'checkbox',label:"Reindeer"},
						adopt_clumsyreindeer:{type:'checkbox',label:"Clumsy Reindeer"},
					}},
					
					turklingBlock:{type:'optionblock',label:"Turkeys:",kids:{
						adopt_turkey:{type:'checkbox',label:"Turkey"},
						adopt_babyturkey:{type:'checkbox',label:"Baby Turkey"},
						adopt_whiteturkey:{type:'checkbox',label:"White Turkey"},
						adopt_babybourbonturkey:{type:'checkbox',label:"Baby Bourbon Turkey"},
					}},

					yakBlock:{type:'optionblock',label:"Yaks:",kids:createMenuFromArray(yakTypes,"adopt_yak")},
					
					otheranimalsBlock:{type:'optionblock',label:"Other Animals:",kids:{
						adopt_babyelephant:{type:'checkbox',label:"Baby Elephant"},
						adopt_elfpenguin:{type:'checkbox',label:"Elf Penguin"},
						adopt_halloweentutuhippo:{type:'checkbox',label:"Halloween Tutu Hippo"},
						adopt_mistletoepenguin:{type:'checkbox',label:"Mistletoe Penguin"},
						adopt_penguin:{type:'checkbox',label:"Penguin"},
						adopt_turtle:{type:'checkbox',label:"Turtle"},
						adopt_raccoon:{type:'checkbox',label:"Raccoon"},
						adopt_porcupine:{type:'checkbox',label:"Porcupine"},
						"adopt_white-tailedbuck":{type:'checkbox',label:"White-tailed Buck"},
						adopt_winterfox:{type:'checkbox',label:"Winter Fox"},
						adopt_winterpolarbear:{type:'checkbox',label:"Winter Polar Bear"},
					}},
				}} 
				}}, //end adoption section

				
				farmcropssep:{type:'separator',label:"Seeds, Bushels & Crafting",kids:{
				seedsep:{type:'tab',label:"Seeds",kids:{
					seedblock1:{type:'optionblock',label:"Pollinated Fruit:",kids:createMenuFromArray(fruitTypes,"polseeds_")},
					seedblock2:{type:'optionblock',label:"Pollinated Vegetables:",kids:createMenuFromArray(vegTypes,"polseeds_")},
					seedblock3:{type:'optionblock',label:"Pollinated Grains:",kids:createMenuFromArray(grainTypes,"polseeds_")},
					seedblock4:{type:'optionblock',label:"Pollinated Flowers:",kids:createMenuFromArray(flowerTypes,"polseeds_")},
					seedblock5:{type:'optionblock',label:"Pollinated Other:",kids:createMenuFromArray(otherBushels,"polseeds_")},
					seedblock6:{type:'optionblock',label:"Pollinated Special:",kids:createMenuFromArray(specialBushels,"polseeds_")},
					seedblock8:{type:'optionblock',label:"Crossbred Seeds:",kids:createMenuFromArray(seedTypes,"seeds_")},

					pollinated:{type:'checkbox',label:"Unknown Seeds"},
				}},

				bushelsep:{type:'tab',label:"Bushels",kids:{
					hlbushelblock:{type:'optionblock',label:"Highlight Bushels By Crafting Cottage",hideSelectAll:true,kids:{
						btnbakery:{type:'button_highlight',label:"Bakery",options:bakeryBushels,clearfirst:allCraftBushels},
						btnwinery:{type:'button_highlight',label:"Winery",options:wineryBushels,clearfirst:allCraftBushels},
						btnspa:{type:'button_highlight',label:"Spa",options:spaBushels,clearfirst:allCraftBushels},
						btnpub:{type:'button_highlight',label:"Pub",options:pubBushels,clearfirst:allCraftBushels},
						btnrestraunt:{type:'button_highlight',label:"Restraunt",options:restrauntBushels,clearfirst:allCraftBushels},
						btncraftshop:{type:'button_highlight',label:"Craftshop",options:craftshopBushels,clearfirst:allCraftBushels},
						btnsweetshoppe:{type:'button_highlight',label:"Sweet Shoppe",options:sweetshoppeBushels,clearfirst:allCraftBushels},
						btnhlnone:{type:'button_highlight',label:"None",clearfirst:allCraftBushels},
					}},

					bushelblock1:{type:'optionblock',label:"Fruit:",kids:createMenuFromArray(fruitTypes,"bushel_")},
					bushelblock2:{type:'optionblock',label:"Vegetables:",kids:createMenuFromArray(vegTypes,"bushel_")},
					bushelblock3:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(grainTypes,"bushel_")},
					bushelblock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(flowerTypes,"bushel_")},
					bushelblock5:{type:'optionblock',label:"Other:",kids:createMenuFromArray(otherBushels,"bushel_")},
					bushelblock6:{type:'optionblock',label:"Special:",kids:createMenuFromArray(specialBushels,"bushel_")},

					bushel:{type:'checkbox',label:"Unknown Bushels"},
				}},

				preordersep:{type:'tab',label:"Order Crops", kids:{
					preorderblock1:{type:'optionblock',label:"Fruit:",kids:createMenuFromArray(fruitTypes,"order_")},
					preorderblock2:{type:'optionblock',label:"Vegetables:",kids:createMenuFromArray(vegTypes,"order_")},
					preorderblock3:{type:'optionblock',label:"Grains:",kids:createMenuFromArray(grainTypes,"order_")},
					preorderblock4:{type:'optionblock',label:"Flowers:",kids:createMenuFromArray(flowerTypes,"order_")},
					preorderblock5:{type:'optionblock',label:"Other:",kids:createMenuFromArray(otherBushels,"order_")},
					preorderblock6:{type:'optionblock',label:"Special:",kids:createMenuFromArray(specialBushels,"order_")},

					order:{type:'checkbox',label:"Order Unknown Crops"},
				}},
				
				jointeamsep:{type:'tab',label:"Join Teams",kids:{
					jointeamblock:{type:'optionblock',label:"Join Teams:",kids:createMenuFromArray(craftShop,"join")},
				}}
				
				}} //end farms separator

				}} //end farmville section
			} //end menu
		};

		//this converts the menu above to a text string
		//it erases all functions, preventing sidekicks from making destructive changes to the WM script
		//it also provides an early error checking stage before the menu is attached to the WM script
		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app102452128776','data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);

		//cleanup
		doorMark=null;calfTypes=null;foalType=null;horseTypes=null;bushelTypes=null;flowerTypes=null;
		treeTypes=null;craftPub=null;craftWinery=null;craftSpa=null;craftBakery=null;craftTypes=null;
		standardMaterials=null;otherConsumables=null;specialMaterials=null;
		craftingMaterials=null;materials=null;colBerries=null;colCitrus=null;colCows=null;colFlowers=null;
		colGrains=null;colSquash=null;colTypes=null;colGroups=null;questItems=null;duckTypes=null;
		pigTypes=null;sheepTypes=null;cowTypes=null;decorTypes=null;eggTypes=null;otherAnimals=null;
		otherWords=null;buildings=null;attachment=null;attString=null;seedTypes=null;animalCatchalls=null;
		craftRestraunt=null;
		
		t1=null;t2=null;t3=null;t4=null;t5=null;t6=null;t7=null;t8=null;t10=null;t11=null;
		t12=null;t13=null;t14=null;t15=null;t16=null;t17=null;t18=null;t19=null;t20=null;t21=null;
		t22=null;t23=null;t27=null;t29=null;t30=null;t31=null;
	};

	//a function similar to Facebook Auto Publisher for some FV reward pages autopub does not see
	function sendWishGift(){
		var node = selectSingleNode(".//input[@name='sendit']");
		var vote=Math.floor(Math.random()*2);
		var waitForMore=true; //use this to keep trying or keep looking for more buttons to click

		//check for bluebutton page with image buttons
		if (!node) {
			var itemID = location.search.getUrlParam("selectedGift");
			//alert(itemID);
			if (itemID) {
				//check that selectedGift is not a comma delimited list. If it is, separate and choose one
				var items = itemID.split(",");
				itemID = items[Math.floor(Math.random()*items.length)];
			}
			node = $("add_"+itemID);
			//if (node) alert(itemID);
			waitForMore = false; //prevent hammering buttons
		}

		//check for multiple send radio buttons like on a normal gift page
		if (!node) {
			//check for gift page buttons
			var nodes=selectNodes(".//*[contains(@class,'giftLi')]//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
			if (nodes.snapshotLength) {
				//pick one randomly
				node = nodes.snapshotItem( Math.floor(Math.random()*nodes.snapshotLength) );
				node.style.backgroundColor="green";
			}
			waitForMore = false; //prevent hammering buttons
		}

		//check for single send buttons for pages like send bushel
		if (!node) node=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
		if (!node) node=selectSingleNode(".//div[contains(@class,'gift_form_buttons')]/a[contains(@class,'giftformsubmit')]");
		if (!node) node=selectSingleNode(".//div[@class='rfloat']/input[@name='try_again_button']");
		if (!node) node=selectSingleNode(".//input[@name='acceptReward']");
		if (!node) node=selectSingleNode(".//input[@class='input"+vote+"submit']");

		if (node) setTimeout(function(){click(node); if (waitForMore=true) window.setTimeout(sendWishGift,500);},500);
		else window.setTimeout(sendWishGift,1000); 
	};
	
	//main script function
	function run(){
		var href=window.location.href;
		var text = document.documentElement.textContent;
		var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/");

		//check for need to dock to WM 1.5
		if (href.startsWith('http://www.facebook.com/') ) dock();

		//if not on a dockable page, start searching for reward page types

		else if (text.find("Error while loading page from")) {
			sendMessage('status=-5');
			//window.location.reload();
			return;
		}
		
		else if (href.startsWith(thisLoc+'/wishlist_give.php') ){
			//send wish list item
			if (text.find("Sorry, you can't give this user any more gifts") || text.find("Sorry, you can't send this gift")) {sendMessage('status=-1');return;}
			window.setTimeout(sendWishGift,1000);
			return;
		}

		else if (href.startsWith(thisLoc+'/gifts_send.php')){
			//comes after sending wish gift
			window.setTimeout(function(){sendMessage('status=1');},5000);
			return;
		}

		else if (href.startsWith(thisLoc+'/reward_gift_send.php') ){
			//try to send a gift with button
			window.setTimeout(sendWishGift,1000);
			//sendMessage('status=1'); <---dont want to do that here
			return;
		}
		
		else if (href.startsWith(thisLoc+'/index.php') || href.startsWith(thisLoc+'/?' )){
			sendMessage('status=1');
			return;
		}

		else if ( href.startsWith(thisLoc+'/gifts.php') && href.contains('giftRecipient=') ){
			var node; 
			//taken to specific gift sending page
			if (text.find("you can't give this user any more gifts")) {sendMessage('status=-1');return;}
			if (node=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]")) window.setTimeout(sendWishGift,1000);
			if (node=selectSingleNode(".//li[contains(@class,'giftLi')]")) window.setTimeout(sendWishGift,1000);
			else if (node=selectSingleNode(".//iframe[contains(@src,'farmville.com/gifts.php')]")){
				//break it out of iframes and add the gift names to the url
				//alert(location.href);
				var itemID = location.search.getUrlParam('selectedGift');
				//alert(itemID);
				location.href = node.src+"&selectedGift="+itemID;
			}
			//else sendMessage('status=-1'); //not here anymore with new blue buttons
			return;
		}
		
		else if (href.contains('redirecting_zy_session_expired')){
			sendMessage('status=1');
			return;
		}
		
		else if (href.startsWith(thisLoc+'/gifts.php') ){
			//taken to generic gift sending page
			sendMessage('status=-1');
			return;
		}

		else if (href.startsWith(thisLoc+'/trading_post_order_place.php') ){
			//taken to place order page
			if (text.find("Congratulations! You've placed a")) sendMessage('status=1');
			if (text.find("You've reached your limit for ordering from this user")) sendMessage('status=-1');
			if (text.find("Sorry Farmer! You don't have an order pending with this friend")) sendMessage('status=-1');
			return;
		}

		else if (href.startsWith(thisLoc+'/reward.php') && text.find("Would you like a ") && text.find("Bushel") ){
			//bushel acceptance stage 1
			//alert('path set');
			window.setTimeout(sendWishGift,1000);
			return;
		}
		
		else if (href.startsWith(thisLoc+'/performfriendvote.php') && text.find("been Naughty or Nice?")){
			window.setTimeout(sendWishGift,1000);
			return;
		}
				
		//else if (href.find('reward.php') ){
		else if (href.startsWith(thisLoc+'/reward.php') || href.contains('holiday_countdown_reward.php') || href.contains('performfriendvote.php')){
		
		//*************************************************************************************
		//***** this section must be tailored to fit your specific needs                  *****
		//***** below is a list of searches for text pertaining to various messages       *****
		//***** the list below is not generic and targets Empires and Allies specifically *****
		//***** you will need to find the specific texts for the game you selected        *****
		//*************************************************************************************
		//***** The WM script can recieve and act on the following statusCode values:     *****
		/*
			  1: Acceptance, no stipulations
			  0: Unknown return, use this only if your script encounters unplanned results and can still communicate a result
			 -1: Failure, generic
			 -2: Failure, none left
			 -3: Over Gift Limit failure
			 -4: Over Gift Limit, still allows sending gift, marked as accepted
			 -5: Identified server error
			 -6: Already got, failure marked as accepted
			 -7: Identified server down for repairs
			 -8: Problem finding a required action link
			 -9: reserved for WM functions
			-10: reserved for WM functions
			-11: Identified as expired
			-12: Post source is not a neighbor and neighbor status is required. Future WM version will auto-add neighbor if possible.

			//additional codes may now exist, please check the wiki support site for information
		*/
		//*************************************************************************************
						
			//all out
			if (text.match(
				/(enough votes|there aren't any more items|been (claimed|picked up)|given out all the free samples they had|are('nt)? (no|any) more|has already received|fresh out of|someone already|isn't yours|got here too late|folks have already|already has enough|already has all the)/gi
			)) sendMessage('status=-2');

			//over limit
			else if (text.match(
				/(already have a stallion)/gi
			)) sendMessage('status=-4');
			
			//expired
			else if (text.match(
				/((event|promotion) has (expired|ended)|no longer needs|missed your oppor|expired)/gi
			)) sendMessage('status=-11');

			//requirements not met
			else if (text.match(
				/(You must be level|switch farms and try|need to finish building|don't have a trough|before you can|not open to everyone|you can't send)/gi
			)) sendMessage('status=-13');

			//not a neighbor
			else if (text.match(
				/(only neighbors|only friends can|have to be a neigh|just for your friends)/gi
			)) sendMessage('status=-12');
			
			//gift box full
			else if (text.match(
				/((gift box|storage) is full|at max cap|doesn't need another|is too full|any(place| room) to store)/gi
			)) sendMessage('status=-3');

			//generic fail
			else if (text.match(
				/(is for your friend|not for you|(reward for|can't claim) your own|only your friends|can't claim the animal|out of luck|you can't (help|accept)|try again next time|sorry( (par(t|d)ner|farmer)))/gi
			)) sendMessage('status=-1');

			//already accepted
			else if (text.match(
				/(whoa there|slow down there partner|can only help your friend once|already (clicked|claimed|collected|received|hatched|taken part|helping)|you('ve| have)? already (helped|tried|accepted|clicked)|claim one (reward|item)|already on another job)/gi
			)) sendMessage('status=-6');

			//accepted
			if (text.match(
				/(congrat(ulations|s)|yee-haw|hooray|lucky you|you (helped|claimed|collected)|agreed to join|(you )?just (sent|unlocked|collected|gave you)|(thanks|thank you) for (helping|taking part|your interest)|wants you to have|can find it in your|play farmville)/gi
			)) sendMessage('status=1');
		}
		else if (!defaultTO) defaultTO=window.setTimeout(function(){
			var html=document.documentElement.innerHTML;
			if (html.find("app102452128776_giftsTab")) sendMessage('status=-15');
		},5000);
	};

	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end