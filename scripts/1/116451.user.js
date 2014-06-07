// ==UserScript==
// @name           FVWM Sidekick 10-11
// @namespace      http://userscripts.org/users/414800
// @description    Assists Wall Manager with Farm Ville posts
// @include        http://userscripts.org/scripts/source/111560.user.js
// @include        http://apps.facebook.com/onthefarm/wishlist_give.php*
// @include        http://apps.facebook.com/onthefarm/gifts_send.php*
// @include        http://apps.facebook.com/onthefarm/reward_gift_send.php*
// @include        http://apps.facebook.com/onthefarm/gifts.php*
// @include        http://apps.facebook.com/onthefarm/index.php*
// @include        http://apps.facebook.com/onthefarm/reward.php*
// @include        http://apps.facebook.com/onthefarm/trading_post_order_place.php*
// @include        http://www.facebook.com/*
// @exclude        http://www.facebook.com/groups*
// @exclude        http://www.facebook.com/editaccount*
// @exclude        http://www.facebook.com/friends/*
// @exclude        http://www.facebook.com/settings*
// @exclude        http://www.facebook.com/help/*
// @exclude        http://www.facebook.com/logout*
// @exclude        http://www.facebook.com/login*
// @exclude        http://www.facebook.com/ajax/*
// @exclude        http://www.facebook.com/reqs*
// @exclude        http://www.facebook.com/campaign/*
// @exclude        http://www.facebook.com/notifications*
// @exclude        http://www.facebook.com/editprofile*
// @exclude        http://www.facebook.com/posted*
// @exclude        http://www.facebook.com/plugins*
// @exclude        http://www.facebook.com/*/posts/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.33
// @require        http://sizzlemctwizzle.com/updater.php?id=111560&days=1
// @copyright      Charlie Ewing
// ==/UserScript== 
(function() { 

	var version = "0.0.33";

	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		if (this.length>1) for (var i=this.length-1;i>0;i--) {
			for (var i2=i-1;i2>0;i2--){
				if (this[i].contains(this[i2])){
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
		unsafeWindow.top.location.hash = s;
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
		"mat_castleduckula",
		"hauntedbrick",
		"goo",
		"knockers",
		"creepycandle",
		"banquetinvitation",
		"scarydecoration",
		"blindfold",
		"partyfavor",
		"adopt_calfmilky",
		"tree_gianthalloween",
		"tree_gianthalloweencookie",
		"adopt_foalglowskeleton",
		"adopt_foalfrenchunicorn",
		"adopt_foalblackdartmoor",
		"adopt_foalhackneypalominopony",
		"adopt_foalwhiteminiunicorn",
		"adopt_foaldapplegray",
		"adopt_foalspottedappaloosa",
		"adopt_foalfairyunicorn",
		"adopt_foalminipegasus",
		"adopt_foalpurpleminiunicorn",
		"adopt_foalminibluegypsy",
		"adopt_foalwingedunicorn",
		"treats",
		"lollipop",
		"halloweenmask",
		"tree_giantcandypumpkin",
		"adopt_cowpumpkin",
		"adopt_calfpumpkin",
		"adopt_foalpumpkin",
		"adopt_foalnightmare",
		"adopt_foalminibat",
		"adopt_foalnightmarepegasus",
		"tree_giantdarkpeach",
		"tree_gianthoneycrispapple",
		"tree_giantsugarskull"
	];

	//build a menu list based on an array of text
	//add a prefix to the return word using prefix
	//automatically sorts alphabetically, set sort=false to disable
	//automatically capitalizes first letter of every word
	//fill the markAsNew array with elements you want marked green
	function createMenuFromArray(arr,prefix,sort,markAsNew){
		markAsNew=[].concat(allNewItems, (markAsNew||[]));
		sort=(sort==null)?true:sort;
		var ret={};
		if (arr) {
			//clone the array before sorting
			arr2=arr.slice(0);
			if (sort) arr2=arr2.sort();
			for (var i=0,len=arr2.length;i<len;i++){
				var keyName = (prefix||'')+arr2[i].noSpaces().toLowerCase();
				var fixedLabel=screwyTexts[arr2[i].toLowerCase()];
				ret[keyName]={type:'checkbox',label:(fixedLabel || arr2[i]).upperWords(),newitem:(markAsNew.inArray(keyName))};
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
				"darrow blackberry","chandler blueberry","cove cranberry"].fixOrder();
				
		var vegTypes=["acorn squash","artichoke","asparagus","broccoli","cabbage","cara potato","carnival squash","carrot",
				"chickpea","cucumber","english pea","field bean","heirloom carrot","long onion","onion","pattypan",
				"pea","potato","pumpkin","purple asparagus","purple pod pea","radish","red spinach","rhubarb","spinach",
				"soybean","squash","squmpkin","turnip","zucchini","rappi","swiss chard","daikon","wasabi","kennebec potato",
				"butter & sugar corn","cauliflower"].fixOrder();
				
		var grainTypes=["amaranth","barley","corn","double grain","hops","oat","posole corn","red wheat","rice","royal hops",
				"rye","wheat","whisky peat","triticale"].fixOrder();
				
		var otherBushels=["aloe vera","bamboo","basil","black tea","coffee","cotton","ginger","green tea","lemon balm","peanut",
				"peppermint","sugar cane","hay","dill","clam","lobster","seafood","tarragon"].fixOrder();
		var specialBushels=["birthday cake","crystal","cupid corn","snow cone","white pumpkin","candy cane","balloon","red toadstool",
				"purple toadstool","jack o lantern"].fixOrder();
		
		var flowerTypes=["bluebell","red tulip","purple popp","sunflower","lilac","daffodil","iris","morning glory","saffron","lavender","clover",
				"pink rose","white rose","lily","orange dais","electric lil","poinsettia","pink carnation",
				"fire & ice rose","flamingo flower","yellow rose","pink hibiscus","green hellebore","alpine rose",
				"green rose","edelweiss","lotus","daylil","golden popp","red clover","hollyhock","black rose",
				"white poinsettia","pink aster","columbine","cornflower","electric rose","star flower","chrome dais",
				"sun popp","english rose","forget me not","gardenia","spring squill","foxglove","gladiolus",
				"lilac daffy","lady slipper"].fixOrder();


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

		//this array used to clear highlights
		var allCraftBushels=[].concat(bakeryBushels,pubBushels,wineryBushels,craftshopBushels,spaBushels,restrauntBushels);

		
		//Crafting cottage items
		//define separately for easy options menu

		var craftPub=["Duke's Stout","Oliviaberry Beer","Lionhead Ale","Barley Crumpet",
				"Floral Scone","Red Currant Trifle","Rosehip Tea","Spark Rose Mead","Pink Carnation Tea","potato soup","blackberry brandy"];
		
		var craftWinery=["sweet sake","white sangria","red table wine",
				"fruit wine","spicy tomato juice","dry sake","blackberry wine","strawberry & cranberry juice","raspberry wine",
				"blueberry wine","herbal elixir","pumpkin vinegar","cucumber wine","rose petal water","melon juice","pumpkin cider",
				"green rose water","carnation vinegar","tarragon vinegar","cranberry cooler"];

		var craftSpa=["fresh sachet",
				"floral perfume","soothing herbal lotion","relaxation oil","devotion perfume","petal sachet","energizing lotion",
				"restoring candle","lily of the valley soap","iris soap","meditation candle","pick me up sachet","farmer's frenzy perfume",
				"daffodil lotion","transcendent candle","harvest candle","green potpourri","daylily perfume","dill candle"];		

		var craftBakery=["pumpkin bread","strawberry shortcake","spicy muffin","patty pan tart","triple berry pie","peanut butter cookie",
				"raspberry blondie","vegetable tart","mocha-berry cake","oatmeal cookies","baked cucumber","pizza bread","ginger snaps",
				"potato and onion bread","carrot cake","harvest casserole","green mocha cake","candied pink carnation","cornbread",
				"cauliflower gratin"];
				
		var craftRestraunt=["blackberry ice cream","cheddar cheese","creamed corn","wild blueberry pie","black raspberry wine","fruit cider",
				"dill potato skin","jonny cake","cranberry-pineapple relish","clam chowder","baked beans","cream pie","new england lager",
				"boiled dinner","lobster roll"];

		//I dont know if the craftshop does or will ever actually share an item, but if it does, add them here.
		var craftShop=["bright yellow tractor","mechanic scarecrow","sheep topiary","apple red seeder","bonsai",
				"tree house","apple red harvester","post office","evergreen train","farmhand","yellow racer tractor",
				"stone wall","fertilize all","dainty fence","shovel","watering can","iron fence","arborist",
				"lamp post","animal feed","vehicle part","swiss cabin","stone archway","milking stool","scythe",
				"horse sculpture","brick","wooden board","nail","lucky penn","fuel","bottle","love potion","pine fence i",
				"pine fence ii","modern table","puppy kibble","dog treat","moat i","moat ii","moat iii","moat iv",
				"moat corner i","moat corner ii","moat corner iii","moat corner iv","castle bridge","english postcard",
				"beach ball"];

		var craftUnidentified=["chardonnay frosted cake","chardonnay preserves","zinfandel sachet","zinfandel wine"];

		//merge craft types for searching
		var craftTypes=craftBakery.concat(craftSpa,craftWinery,craftPub,craftShop,craftRestraunt,craftUnidentified);	

		
		//only those crops that can provide crossbred seeds

		var seedTypes=["Straspberry","long onion","Squmpkin","Red Spinach","Lilac Daffy","Fire Pepper","Double Grain","Purple Tomato",
				"Sun Poppy","Whisky Peat"].fixOrder();

		//only those crops that can be of the supercrop status

		var superCrops=["strawberry","pumpkin","cotton","cranberry","pepper","grape","pink aster","watermelon","yellow melon"].fixOrder();

		//merge all crop types for actual searches
		//do not merge with seedTypes and superCrops as they are searched for differently

		var bushelTypes=[].concat(flowerTypes,fruitTypes,grainTypes,vegTypes,otherBushels,specialBushels).fixOrder();

		//trees
		//do not provide the words giant or large in front of these as that is done programatically later

		var treeTypesOld=["july balloon","july confetti",
				"july ice cream","acai","alma fig","almond","amherstia","angel red pomegranate","areca nut palm","arjuna",
				"ash","asian pear","autumn ginkgo","bahri date","balloon","banana","bird cherry","black cherry","black locust","blood orange",
				"boom","breadfruit","breadnut","bubble gum","candy apple","caramel apple","carnival","chanee durian",
				"cherry plum","chestnut","chinese lantern","chinese tamarisk","chinese strawberry","chocolate heart","chrome apple",
				"chrome cherry","cinnamon heart","cocoa","coconut","confetti","cork oak","cotton candy","crab apple","crack willow",
				"cuban banana","cupcake","damson","disco ball","dogwood","downy birch","durian","dwarf almond","elberta peach",
				"english elm","european beech","european pear","father","fleur de lis","french bread","gem fruit",
				"golden apple","gorse","golden apricot","golden malayan coconut","golden plum","golden starfruit","granny smith apple",
				"grapefruit","guava","gulmohar","hass avocado","hawthorn","hazelnut","heart candy","heirloom apple","holiday",
				"holly oak","honey locust","ice cream","indian laurel","ironwood","jacaranda","jackfruit","jewel","juniper","key lime",
				"lemon","lime","longan","lucky cookie","lychee","mac&cheese","monterey cypress","bay laurel","umbrella pine",
				"magnolia","mandarin","mango","manila mango","mardi gras","midland hawthorn","mimosa silk","mint candy","mission olive",
				"mistletoe","money","mountain ebony","oak","olive","orange","ornament","passion fruit","peach palm","peach","persimmon",
				"pink bubblegum","pink dogwood","pink gem","pink plumeria","plum","pomegranate","ponderosa lemon","purple bubble gum",
				"purple magnolia","rainbow apple","rainbow","rainier cherry","red alder","red gem","red maple","red pine","ribbon flower",
				"rowan","royal crystal","ruby guava","sartre guava","scots pine","service","shinko pear","silver birch","silver maple",
				"singapore jackfruit","sitka spruce","snowcone","sour apple","soursop","spring egg","star ruby grapefruit","starfruit",
				"strawberry","sugar plum","tamarind","vera wood","wax apple","wedding","white apple","white pine","white plumeria",
				"white walnut","wild cashew","wild cherry","wild service","wych elm","yellow maple","yellow passion fruit","yew", "ornament 2",
				"pine","apple","avocado","maple","apricot","cashew","date","fig","gem","ginkgo","walnut","cherry","french tamarisk",
				"cocoa truffle","picholine olive","purple hanging flower","bell flower","pink hanging flower"].fixOrder();

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
				"weeping birch","bradford pear","european aspen","halloween"].fixOrder();

		var treeTypes2=["balloon","bell flower","black cherry","boom","bubblegum","candy apple","caramel apple","chocolate heart",
				"chrome cherry","cocoa","cocoa truffle","cupcake","disco ball","father","fleur de lis","french bread",
				"gem","gem fruit","golden apple","heart candy","ice cream","jewel","july balloon","july confetti",
				"july ice cream","lucky cookie","mac&cheese","mardi gras","pink gem","purple bubble gum","rainbow",
				"red gem","ribbon flower","snowcone","sour apple","spring egg","wedding","magic orange","coin","star flower",
				"magic peach","fairy","halloween candy","candy corn","fire peach","jack o lantern","halloween lantern",
				"mossy","spider","dark apple","halloween","halloween cookie","candy pumpkin","dark peach","honeycrisp apple",
				"sugar skull"].fixOrder();
				
		var treeTypesRemoved=["acai","almond","areca nut palm","arjuna","apricot","asian pear","avocado","breadfruit","carnival","cashew","cherry plum","cherry","chestnut",
				"chrome apple","cinnamon heart","coconut","confetti","cotton candy","damson","dogwood","durian","english elm","fig","gorse","grapefruit",
				"guava","hawthorn","heirloom apple","holly oak","honey locust","ironwood","jacaranda","jackfruit","juniper","lychee","magnolia","mandarin",
				"maple","mistletoe","money","passion fruit","peach","persimmon","pink bubblegum","pink plumeria","plum","pomegranate","rowan","scots pine",
				"service","silver birch","sitka spruce","soursop","starfruit","strawberry","sugar plum","wax apple","white apple","walnut","wild cherry",
				"orange","lime"];	

		//material types
		//defined separately for easy options menu
		var standardMaterials=["goo","haunted brick","knockers","creepy candle","brick","wooden board","nail","harness","horseshoe",
				"aged brick","clinging vine","paned window","slate tile","weathered board","blanket","bottle","floral bracket",
				"glass sheet","green beam","irrigation pipe","white trellis","bamboo","reed thatch","smoker","beeswax","shovel", 
				"gear","axle","rope","hammer","twine","concrete","hinge","screwdriver","tin sheet","vehicle part","queen bee",
				"honeybee","wrench","clamp","pipe","shrub","grazing grass","fence post","painted wood","water pump","log","stone",
				"steel beam","wire","hay bundle","saddle","bridle"].fixOrder();

		var otherConsumables=["watering can","puppy kibble","arborist","farmhand","white truffle","coins",
				"black truffle","gold truffle","brown truffle","animal feed","fertilize all", "doggie treats",
				"mystery seedling","love potion","instagrow","fuel","mystery gift","special delivery","capital one gift"].fixOrder();
		
		var specialMaterials=["fruit cake","spring egg","valentine","gold piece","school supp","candy","holiday gift",
				"beach toy","apple","treats"];

		var craftingMaterials=["apple wood basket","walnut basket","orange basket","lemon basket","milk jug","wool bundle",
				"cherry basket","maple syrup basket","manure bag"];

		var questItems=["toadstools","racing stripe","picnic blanket","burlap sack","sheep shampoo","party favor","cheque","magnet",
				"airship patch","piggy toy","grape juice","testimonial","lemon","electric torch","old book","pint glass","mouse trap",
				"cheese culture","post card","sprinkler","grow light","work order","elbow grease","praise for henry","holiday treats",
				"holiday lights","wrapping paper","sawhorse","fuzzy dice","raffle drum","raffle poster","love potion","fairy wand",
				"storybook","eau du skunk","squirrel feeder","scritchy brush","chew toy","pet bed","catnip","scratch post","pacifier",
				"zookeeper hat","zoo tickets","monkey mask","baby bonnets","bird seed bunch","bird nest","bird whistle","wool blanket",
				"oat sack","tree fertilizer","hobby horse rake","livestock tags","farmer's boots","farmer's overalls","hay",
				"cow collar","cow treat","cow tether","salt lick","milk bucket","brass cow bell","sugar cube","horse comb","horse saddle",
				"horse tiara","carrot on a stick","horse shoe","blue ribbon","apple basket","horsehead rake","popcorn machine",
				"romantic centerpiece","candy corn","tasty fish","wrapped candy","banquet invitation","scary decoration","blindfold",
				"lollipop","halloween mask","old books"].fixOrder();

		//merge materials for searching
		var materials=[].concat(standardMaterials,otherConsumables,craftingMaterials,specialMaterials).fixOrder();
		
		//building type catcher for random materials
		var buildings=["maison","nursery barn","botanical garden","japanese barn","beehive","garage","pig pen","haunted house",
				"orchard","turkey roost","funhouse","gingerbread house","winter workshop","snowman","party barn","duck pond",
				"cupid's castle","greenhouse","Leprechaun's Cottage","sheep pen","spring garden","craftshop","bedazzled cottage",
				"water wheel","crafting silo","combine","horse stable","wildlife habitat","pet run","zoo","aviary","cove",
				"livestock pen","cow pasture","horse paddock","castle duckula"];

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
		var calfTypes=["autumn","belted","candy cane","chocolate","chrome","devon","dexter","disco",
				"english","fan","flower","galician","gelbvieh","green patch","groovy","hereford","highland","holiday",
				"irish kerry","kelly green","mohawk","neapolitan","new year","panda","pink patch bull","pink patch",
				"pink","purple valentine","purple","rainbow","red brown","robot","simmental","tuscan","valentine",
				"welsh black","western longhorn","yellow patch","green","longhorn","vineyard","fairy","fall","sailor",
				"pineywoods","blue oxen","blue","grey oxen","canadienne","black shorthorn","milking shorthorn",
				"shorthorn","b0v1n3-11","gray jersey","jersey","randall bull","irish moiled bull","irish moiled",
				"holstein bull","holstein","bull","yellow referee","referee","red heart","guernsey","ayrshire","milky",
				"brown swiss","brown","red","black angus","randall","baby","nightmare","frankenstein bride","skeleton",
				"pumpkin"].fixOrder();
				
		var yakTypes=["gray baby","black baby","baby"].fixOrder();

		var foalTypes=["appaloosa mini","appaloosa","asian wild","autumn","azteca","bedazzled","black cherry","black gypsy",
				"black mini","black percheron","black pony","black shire","black stallion","blue mane gypsy","blue ponytail",
				"blue pony","breton","brown gypsy","buckskin","camargue","camarillo","candy cane","candy corn","carnival",
				"charro","chrome","cleveland bay","clown","clydesdale stallion","clydesdale","connemara pony","cream draft",
				"cream mini","dales pony","dartmoor pony","disco","eriskay pony","exmoor pony","falabella","fjord","french mini",
				"french percheron","hackney","haflinger","hanoverian","galiceno","golden mini","golden pony","golden stallion",
				"icelandic","irish cob","king","knight","merens pony","mini candycane","mini party","miniature","mongolian",
				"new forest pony","new year","nightmare unicorn","paint","palouse","pink gypsy","pink ponytail","pink pony",
				"pink stallion","pinto pony","pottok pony","purple bedazzled","purple pony","purple ponytail","purple stallion",
				"rainbow mini","rainbow pony","rainbow stallion","red pinto","reitpony","royal","royal steed","saddle",
				"shamrock pony","shetland pony","silver","snow stallion","stallion mini","suffolk","swiss warmblood",
				"thoroughbred","valentine mini","valentine","welsh","white mustang","white shire","white thoroughbred",
				"yakut pony","zesty","american quarter","vineyard mini","vineyard","purple mini","american","fairy mini",
				"fairy pony","irish hunter","maremmano","gypsy stallion","small irish cob","white andalusian","fairy pink",
				"black n white","arabian stallion","friesian stallion","standardbred","zebra unicorn","new england pinto",
				"quarter","morgan stallion","harvest pony","bay andalusian","buckskin mini","walking pony","draft",
				"brown pinto mini","brown","black","white","gypsy","pony","pinto mini","pinto","red","shire","morgan",
				"mustang","party","percheron","grey","green","forest","harvest","fairy","andalusian","nightmare","pseudocorn",
				"skeleton unicorn","skeleton","spectator","black belgian","cream stallion","high kick","pink saddled",
				"chestnut mini stallion","mini donkey","donkey","brumby","candy corn stallion","trotter stallion","trakehner",
				"tennessee","black arabian","peruvian","candycane unicorn","candy corn unicorn","clover unicorn","pink unicorn",
				"lady gaga unicorn","mexican unicorn","nightmare unicorn","purple unicorn","white unicorn","yellow unicorn",
				"chrome pegasus","lavender pegasus","mini zebra pegasus","white pegasus","batwing","nightmare pony",
				"candy corn pegasus","black ponytail","apple","pegasus","french unicorn","dapplegray","glow skeleton",
				"black dartmoor","hackney palomino pony","white mini unicorn","spotted appaloosa","fairy unicorn",
				"mini pegasus","purple mini unicorn","mini blue gypsy","black mini unicorn","winged unicorn","pumpkin",
				"nightmare stallion","nightmare pegasus","mini bat"].fixOrder();

		var horseTypes=["brown","gray","grey","flowered","cream draft","red pinto","red","candy corn"];

		var duckTypes=["belted","party","ugly","red-billed","red","brown","yellow","aztec","blue","campbell","cayuga","chrome","crested",
				"female mandarin","male mandarin","fulvous whistling","gadwell","goldeneye","golfer","green mallard",
				"green winged teal","indian runner","kungfu","longtail","muscovy","pekin","pochard","princess","goldeneye",
				"rainbow","robin","royal guard","ruddy","scoter","tufted","valentine","warder","wizard","wood","orange"].fixOrder();

		var ducklingTypes=["ugly","red","brown","yellow","blue"].fixOrder();

		var pigTypes=["poolside","black","hot pink","ossabaw","pink pot belly","strawberry","white","ghost"];

		var sheepTypes=["miner","mouflon","polka dots","red","scuba","flower","clover","shamrock","spaghetti","vineyard",
				"scared","luv","thank","sunny","schooled"].fixOrder();

		var cowTypes=["brown","chocolate","dexter","disco","fan","groovy","irish moiled","longhorn","pink patch","pink",
				"purple valentine","purple","yellow patch","green patch","milking shorthorn","pumpkin"].fixOrder();

		//contains the main list of "other" things you can collect
		//decorations by event
		var decorApples=["autumn fireplace","harvest gnome","fall flowerbed","apple barrel"];
		
		var decorHalloween=["pumpkin topiary","candied gnome","skele-scarecrow","bat tree","pumpkin house",
				"mini jack-o'lantern","pumpkin terrier","halloween pond"];
		
		var decorThanksgiving=["harvest surprise","pilgrim gnome","harvest fountain","mayflower"];
		
		var decorChristmas=["silver nutcracker","holly arch","holiday bear","ice sculpture","snowflake pole"];
		
		var decorWinterCountdown=["white soldier","icy snowflake","frosty snowflake","blue soldier","silver ornament",
				"gold ornament","gold soldier","cocoa bear","snow drift","snow pile","gold nutcracker","cream bear"];
				
		var decorValentines=["red heart hay","yellow rose stand","fancy carriage","giant teddy","valentine ram",
				"pecking ducks","3 hearts fountain","pink patch cow","chocolate fountain","eiffel tower","pink swan"];
				
		var decorValentinesCountdown=["i love you stand","i love you sign","xoxo sign","purple hay bale","heart teddy",
				"caramel bear","fuchsia greenery","pink greenery","provencal pot","fancy topiary","flax plant","love balloon"];
				
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
		var decorTypes=[].concat(decorHalloween,decorThanksgiving,decorChristmas,decorWinterCountdown,decorValentines,
				decorValentinesCountdown,decorStPatty,decorSpringBasket,decorSpringCountdown,decorShovels,decorSchoolSupplies,
				decorTuscanWedding,decorWishingWell,decorFlowers,decorSandCastle,decorFV2Birthday,decorApples,decorOther).fixOrder();
		
		var eggTypes=["white","brown","black","cornish","golden","rhode island red","scots Grey","rainbow","candycane","english",
				"party","marans","faverolles","araucana","buttercup","candycorn","apple"];

		//two word or common animal catch all texts
		var otherAnimals=["pink lamb","brown lamb","dorking chicken","persian cat","baby turkey",
				"baby elephant","clumsy reindeer","yellow sow","lonely bull","boer goat","penguin","white kitty",
				"white-tailed buck","himalayan kitty","black kitten","turtle","clover rabbit","baby bourbon turkey",
				"english spot rabbit","rhode island red chicken","reindeer","dutch rabbit","poncho llama","white turkey",
				"black rabbit","farm goose","white goose","white llama","red goat","mouflon goat","clover chicken",
				"red toggenburg goat","baby mule","mistletoe donkey baby","baby ox","nightmare stallion"].fixOrder();

		//this animal catchall is for words that already appear earlier, and so must be searched AFTER horses, foals, materials or decorations
		var animalCatchalls=["black pony","white mustang","chicken","turkey","llama","cow","horse","sheep","pig","rabbit","boar","duckling",
				"duck","foal","calf","ram","raccoon","porcupine","goat"].fixOrder();

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
		//var t9 = createAccTextFromArray(craftTypes,"sample_"," Sample");
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
			luckypenn:"Lucky Penny",bushel:"Unknown Bushel",perfectbunch:"Perfect Bunch",pollinated:"Unknown Seeds",
			adopt_ramfloweredgreen:"Flowered Green Ram",sample:"Unknown Level Sample",sample1:"Sample Level 1-20",sample2:"Sample Level 21-40",
			sample3:"Sample Level 41-80",sample4:"Sample Level 81-100",sample5:"Sample Level 100+", schoolsupp:"School Supply",
			adopt_wildliferare:"Rare Wildlife Baby",adopt_wildlifecommon:"Common Wildlife Baby",adopt_petruncommon:"Common Mystery Baby",
			adopt_petrunrare:"Rare Mystery Baby",adopt_zoocommon:"Common Zoo Baby",adopt_zoorare:"Rare Zoo Baby",adopt_aviaryrare:"Rare Egg",
			adopt_aviarycommon:"Common Egg",adopt_livestockcommon:"Common Livestock Baby",adopt_livestockrare:"Rare Livestock Baby",
			sendwishlist:"Wishlist",sendfeed:"Animal Feed",sendbottle:"Bottle",adopt_nightmarestallion:"Nightmare Stallion"
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
			
			//code for altering link destinations before processing (unique to FV at this time)
			alterLink:{
				//find in href
				find:'next=gifts.php%3FgiftRecipient',
				
				//replace with, (note the {%1} in the replacement)
				replace:'next=gifts.php%3FselectedGift%3D{%1}%26giftRecipient',
				
				//words in the post body text
				words:["nail","wooden board","brick","honeybee","vehicle part","smoker","beeswax","blanket","bottle",
					"horseshoe","harness","training their puppy","kibble","watering can","shovels","concrete","hammer",
					"twine","tin sheet","hinge","screwdriver","wrench","pipe","clamp","stone","log","steel beam",
					"wire","water pump","painted wood","shrub","grazing grass","hay bundle","fence post",
					"special delivery","animal feed","saddle","bridle"],
				
				//change {%1} above to the value below based on found "word" above
				//the values below should be the "code" for the gift item to send
				conversionChart:{nail:"nail",woodenboard:"woodenboard",honeybee:"beehive_bee",vehiclepart:"vehiclepart",
					brick:"brick",smoker:"smoker",beeswax:"beeswax",blanket:"blanket",bottle:"bottle",horseshoe:"horseshoe",
					harness:"harness",trainingtheirpuppy:"consume_treat",kibble:"consume_kibble",wateringcan:"wateringcan",
					shovels:"shovel_item_01",concrete:"concrete",hammer:"hammer",twine:"crafting_twine",tinsheet:"tinsheet",
					hinge:"hinge",screwdriver:"screwdriver",wrench:"wrench",pipe:"pipe",clamp:"clamp",stone:"stonepart",
					log:"logpart",steelbeam:"steelbeampart",wire:"component_wire",waterpump:"component_waterpump",
					paintedwood:"component_paintedwood",fencepost:"component_fencepost",grazinggrass:"component_grazinggrass",
					haybundle:"component_haybundle",shrub:"component_shrub",animalfeed:"animalfeedtrough_feed",
					specialdelivery:"socialplumbingmysterygift",saddle:"component_saddle",bridle:"component_bridle"
				}
			},

			//merge accept texts from dynamically created lists above
			accText: mergeJSON(t1,t2,t3,t4,t5,t6,t7,t8,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t29,t27,t30,t31),

			//tests for bonuses
			//see http://fbwm.wikia.com/wiki/Sidekick_Tutorial for in depth how-to instructions
			//changing the order of some of these tests will break this script
			tests: [
				//link excludes
				{ret:"exclude", link:[
					"Play FarmVille now","View full size!","feed their chickens","fertilize their crops",
					"start trading!","visit trading","Join them now","Accept as Neighbor","send building parts",
					"visit"
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
				{body:["is so crafty!","needs your help in the Craftshop!"],ret:"bushel_random"},
				{url:"CraftingRandomLootFriendReward", ret:"bushel_random"},
				{body:"is hosting a barn raising", ret:"sendhelp"},
				{link:["Join their Co-op!","Help with the job!"], ret:"sendhelp"},
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
				{link:"get a goo",ret:"goo"},
				{body:["found some treats","is giving away treats"],ret:"treats"},
				{link:["spooky bat","get spider","claim spider","vampire teeth","ghost cupcake","carmel apple","pumpkin lollipop"],ret:"treats"},
				{link:"apple barrel",ret:"applebarrel"},
				{link:"apple wood basket",ret:"applewoodbasket"},
				{link:"get apple",ret:"apple"},
				
				//order specific crops
				{link:"place order", ret:"none",kids:[
					{body:"{%1}", subTests:bushelTypes, ret:"order_{%1}"},
				]},
				//hatch specific eggs
				{body:"found some {%1} eggs",subTests:eggTypes,ret:"egg_{%1}"},
				{link:"hatch", ret:"none", kids:[
					{body:"{%1}",subTests:eggTypes,ret:"egg_{%1}"},
				]},

				//mystery babies
				{link:["adopt a mystery baby","adopt an egg"],ret:"none",kids:[
					{body:"while harvesting the",ret:"none",kids:[
						{body:" rare ",ret:"none",kids:[
							{body:"{%1}",subTests:["wildlife","zoo","pet run","aviary","livestock"],ret:"adopt_{%1}rare"},
						]}, //end rare
						{body:"{%1}",subTests:["wildlife","zoo","pet run","aviary","livestock"],ret:"adopt_{%1}common"},
					]}, //end harvesting
				]}, //end adopt
				
				//new cow pasture/horse paddock catches
				{link:["adopt","baby"], ret:"none",kids:[
					{body:"found an adorable ",ret:"none",kids:[
						{body:"{%1} foal",subTests:foalTypes,ret:"adopt_foal{%1}"},
						{body:"{%1} calf",subTests:calfTypes,ret:"adopt_calf{%1}"},
						{body:"calf",ret:"adopt_calfbaby"},
						{body:"{%1} yak",subTests:yakTypes,ret:"adopt_yak{%1}"},
						{body:"{%1}",subTests:otherAnimals,ret:"adopt_{%1}"},
					]},
				]},
				
				//send
				{link:["give","send","lend"],ret:"none",kids:[
					{link:"{%1}",subTests:questItems,ret:"send{%1}"}, //quest items
					{link:"item to",ret:"sendwishlist"}, //send wishlists
					{link:"{%1}",subTests:["feed","bushel","help","bottle"],ret:"send{%1}"}, //specific sends
					{link:["materials","parts"],ret:"none",kids:[
						{url:["selectedGift"],ret:"sendmat"},
					]},
					{body:"{%1}",subTests:questItems,ret:"send{%1}"},
					{body:"{%1}",subTests:[].concat(materials,otherWords),ret:"sendmat"},
				]},
				{body:"{%1}",subTests:questItems,ret:"send{%1}"},

				
				//trees
				{body:"{%1}",subTests:["tree","seedling grew up "],ret:"none",kids:[
					{body:"ornament tree II",ret:"tree_ornament2"},
					{body:"{%1}",subTests:["giant","big"], ret:"none",kids:[
						{body:"{%1}",subTests:treeTypes2, ret:"tree_giant{%1}"},
					]},
					{body:"{%1}",subTests:treeTypes, ret:"tree_{%1}"},
				]},
				
				//catch special materials before building materials
				{link:["one","some","bonus"],ret:"none",kids:[
					{body:"{%1}",subTests:specialMaterials,ret:"{%1}"},
				]},
					
				//catchall for materials by link
				{link:"{%1}",subTests:materials,ret:"{%1}"},
				
				//catchall for known animal adoption
				{body:"{%1}", subTests:otherAnimals, ret:"adopt_{%1}"},
				
				//building materials by building
				{link:["materials","parts"],ret:"none",kids:[
					{body:"{%1}",subTests:materials,ret:"{%1}"},
					{body:"{%1}",subTests:buildings,ret:"mat_{%1}"},
				]},
				{body:"{%1}", ret:"none",
					subTests:["addition of a station","half-way","halfway","finished","expanding","completion of","upgrade of","progress on","built a","adding stations","adding a station"],
					kids:[{body:"{%1}",ret:"mat_{%1}",subTests:buildings}]
				},

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
				]},
				
				//dynamic adoptions when foal/calf/duckling is in the link
				{link:"foal", ret:"adopt_foal",kids:[
					{link:" {%1}", subTests:foalTypes, ret:"adopt_foal{%1}"},
					{body:" {%1}", subTests:foalTypes, ret:"adopt_foal{%1}"},
				]},
				{link:"calf", ret:"adopt_calf",kids:[
					{link:" {%1}", subTests:calfTypes, ret:"adopt_calf{%1}"},
					{body:" {%1}", subTests:calfTypes, ret:"adopt_calf{%1}"},
				]},
				{link:"duckling", ret:"adopt_duckling",kids:[
					{body:"duckling grew up to become a", ret:"adopt_duckling"},
					{link:" {%1}", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},
					{body:" {%1}", subTests:ducklingTypes, ret:"adopt_duckling{%1}"},
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
				section_main:{type:'section',label:'FarmVille Manager Options ('+version+')',kids:{

				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/108576.user.js'},
				MCA:{type:'link',label:'Install Message Center Assistant',href:'http://userscripts.org/scripts/source/108811.user.js'},

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
						fertilizeallboost:{type:'checkbox',label:"Fertilize All"},
						instagrow:{type:'checkbox',label:"Instagrow"},
						lovepotion:{type:'checkbox',label:"Love Potion"},
						fuel:{type:'checkbox',label:"Fuel"},
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
				//	decoblock:{type:'optionblock',label:"Various Decorations and Odd Animals:",kids:createMenuFromArray(decorTypes,"")},
					decoBlock01:{type:'optionblock',label:"Halloween: (event-specific animals not included)",kids:createMenuFromArray(decorHalloween,"")},
					decoBlock02:{type:'optionblock',label:"Thanksgiving:",kids:createMenuFromArray(decorThanksgiving,"")},
					decoBlock03:{type:'optionblock',label:"Christmas:",kids:createMenuFromArray(decorChristmas,"")},
					decoBlock04:{type:'optionblock',label:"Winter Countdown:",kids:createMenuFromArray(decorWinterCountdown,"")},
					decoBlock05:{type:'optionblock',label:"Valentine's Day:",kids:createMenuFromArray(decorValentines,"")},
					decoBlock06:{type:'optionblock',label:"Valentine's Day Countdown:",kids:createMenuFromArray(decorValentinesCountdown,"")},
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
						adopt_blackpony:{type:'checkbox',label:"Black Pony"},
						adopt_horsebrown:{type:'checkbox',label:"Brown"},
						adopt_horsecandycorn:{type:'checkbox',label:"Candy Corn"},
						adopt_horsecreamdraft:{type:'checkbox',label:"Cream Draft"},
						adopt_horseflowered:{type:'checkbox',label:"Flowered"},
						adopt_horsegray:{type:'checkbox',label:"Gray"},
						adopt_horsegrey:{type:'checkbox',label:"Grey"},
						adopt_nightmarestallion:{type:'checkbox',label:"Nightmare Stallion",newitem:true},
						adopt_horsered:{type:'checkbox',label:"Red"},
						adopt_horseredpinto:{type:'checkbox',label:"Red Pinto"},
						adopt_whitemustang:{type:'checkbox',label:"White Mustang"},
					}},
					adopt_horse:{type:'checkbox',label:"Unknown Horses"},
					
					foalBlock:{type:'optionblock',label:"Foals:",kids:createMenuFromArray(foalTypes,"adopt_foal")},
					otherfoalBlock:{type:'optionblock',label:"Other:",kids:{
						adopt_babymule:{type:'checkbox',label:"Baby Mule"},
						adopt_mistletoedonkeybaby:{type:'checkbox',label:"Mistletoe Donkey Baby"},
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
						adopt_sheepmouflon:{type:'checkbox',label:"Mouflon"},
						adopt_sheep:{type:'checkbox',label:"Plain White"},
						adopt_sheepred:{type:'checkbox',label:"Red"},
						adopt_sheeppolkadot:{type:'checkbox',label:"Polkadot"},
						adopt_sheepminer:{type:'checkbox',label:"Miner"},
						adopt_sheepscuba:{type:'checkbox',label:"Scuba"},
						adopt_ewethank:{type:'checkbox',label:"Thank Ewe"},
						adopt_ewescared:{type:'checkbox',label:"Scared Ewe"},
						adopt_ewesunny:{type:'checkbox',label:"Sunny Ewe"},
						adopt_eweluv:{type:'checkbox',label:"Luv Ewe"},
						adopt_eweschooled:{type:'checkbox',label:"Schooled Ewe"},
						adopt_ram:{type:'checkbox',label:"Ram"},
						adopt_ramfloweredgreen:{type:'checkbox',label:'Flowered Green Ram'},
					}},

					goatBlock:{type:'optionblock',label:"Goats:",kids:{
						adopt_boergoat:{type:'checkbox',label:"Boer"},
						adopt_redgoat:{type:'checkbox',label:"Red"},
						adopt_redtoggenburggoat:{type:'checkbox',label:"Red Toggenburg"},
						adopt_mouflongoat:{type:'checkbox',label:"Mouflon"},
					}},
					adopt_goat:{type:'checkbox',label:"Unknown Goats"},

					lambBlock:{type:'optionblock',label:"Lambs:",kids:{
						adopt_brownlamb:{type:'checkbox',label:"Brown"},
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
				}},
				
				miscanimstab:{type:'tab',label:"Other Animals",kids:{
					catBlock:{type:'optionblock',label:"Cats:",kids:{
						adopt_whitekitty:{type:'checkbox',label:"White"},
						adopt_blackkitten:{type:'checkbox',label:"Black"},
						adopt_persiancat:{type:'checkbox',label:"Persian"},
						adopt_himalayankitty:{type:'checkbox',label:"Himalayan"},
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
						adopt_penguin:{type:'checkbox',label:"Penguin"},
						adopt_turtle:{type:'checkbox',label:"Turtle"},
						adopt_raccoon:{type:'checkbox',label:"Raccoon"},
						adopt_porcupine:{type:'checkbox',label:"Porcupine"},
						"adopt_white-tailedbuck":{type:'checkbox',label:"White-tailed Buck"},
					}},
				}} 
				}}, //end adoption section

				
				farmcropssep:{type:'separator',label:"Seeds, Bushels & Flowers",kids:{
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

				flowerssep:{type:'tab',label:"Flowers",kids:{
					perfectblock1:{type:'optionblock',label:"Perfect Bunches:",kids:createMenuFromArray(flowerTypes,"perfect_")},
					perfectbunch:{type:'checkbox',label:"Unknown Bunches"},
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
		if (!node) node=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'request_form_submit')]");
		if (!node) node=selectSingleNode(".//div[contains(@class,'gift_form_buttons')]/a[contains(@class,'giftformsubmit')]");
		if (node) {click(node); window.setTimeout(sendWishGift,1000);}
		else window.setTimeout(sendWishGift,1000);
	};
	
	//main script function
	function run(){
		var href=window.location.href;
		var text = document.documentElement.textContent;			

		//check for need to dock to WM 1.5
		if (href.startsWith('http://www.facebook.com/') ) dock();

		//if not on a dockable page, start searching for reward page types

		else if (href.startsWith('http://apps.facebook.com/onthefarm/wishlist_give.php') ){
			//send wish list item
			if (text.find("Sorry, you can't give this user any more gifts")) {sendMessage('status=-1');return;}
			window.setTimeout(sendWishGift,1000);
		}

		else if (href.startsWith('http://apps.facebook.com/onthefarm/gifts_send.php')){
			//comes after sending wish gift
			sendMessage('status=1');	
		}

		else if (href.startsWith('http://apps.facebook.com/onthefarm/reward_gift_send.php') ){
			//try to send a gift with button
			if (selectSingleNode(".//input[contains(@class, 'request_form_submit')]")) window.setTimeout(sendWishGift,1000);
			else sendMessage('status=1');	
		}
		
		else if (href.startsWith('http://apps.facebook.com/onthefarm/index.php') ){
			sendMessage('status=1');	
		}

		else if (href.startsWith('http://apps.facebook.com/onthefarm/gifts.php') && href.contains('selectedGift=') ){
			//taken to specific gift sending page
			if (text.find("you can't give this user any more gifts")) {sendMessage('status=-1');return;}
			window.setTimeout(sendWishGift,1000);
		}

		else if (href.startsWith('http://apps.facebook.com/onthefarm/gifts.php') ){
			//taken to generic gift sending page
			sendMessage('status=-1');
		}

		else if (href.startsWith('http://apps.facebook.com/onthefarm/trading_post_order_place.php') ){
			//taken to place order page
			if (text.find("Congratulations! You've placed a")) sendMessage('status=1');
			if (text.find("You've reached your limit for ordering from this user")) sendMessage('status=-1');					
		}

		else if (href.startsWith('http://apps.facebook.com/onthefarm/reward.php') ){
			//standard reward page
			if (text.find("you accepted")) sendMessage('status=1');
			if (text.find("you claimed")) sendMessage('status=1');
			if (text.find("agreed to join")) sendMessage('status=1');
			if (text.find("just unlocked")) sendMessage('status=1');
			if (text.find("just collected")) sendMessage('status=1');
			if (text.find("Thanks for helping")) sendMessage('status=1');
			if (text.find("just gave you")) sendMessage('status=1');
			if (text.find("can only help your friend once")) sendMessage('status=-6');
			if (text.find("already collected")) sendMessage('status=-6');
			if (text.find("already claimed")) sendMessage('status=-6');
			if (text.find("already received your")) sendMessage('status=-6');
			if (text.find("have already been claimed")) sendMessage('status=-2');
			if (text.find("already been claimed")) sendMessage('status=-2');
			if (text.find("have been claimed")) sendMessage('status=-2');
			if (text.find("you already helped")) sendMessage('status=-6');
			if (text.find("given out all the free samples they had")) sendMessage('status=-2');
			if (text.find("event has expired")) sendMessage('status=-11');
			if (text.find("You must be level")) sendMessage('status=-13');
			if (text.find("already have a stallion")) sendMessage('status=-1');
			if (text.find("already been picked up")) sendMessage('status=-2');
			if (text.find("no longer needs help")) sendMessage('status=-11');
			if (text.find("Switch farms and try again")) sendMessage('status=-13');
			if (text.find("already received")) sendMessage('status=-3');
			if (text.find("is for your friend")) sendMessage('status=-1');
			if (text.find("not for you")) sendMessage('status=-1');
			if (text.find("you already hatched")) sendMessage('status=-2');
			if (text.find("have already hatched")) sendMessage('status=-11');
			if (text.find("wants you to have")) sendMessage('status=1');
			if (text.find("receive a reward for your own")) sendMessage('status=-1');
			if (text.find("expired")) sendMessage('status=-11');
			if (text.find("only your friends can claim")) sendMessage('status=-1');
			if (text.find("You collected")) sendMessage('status=1');
			if (text.find("aren't any more")) sendMessage('status=-2');
			if (text.find("your gift box is full")) sendMessage('status=-3');
			if (text.find("you can't claim your own")) sendMessage('status=-1');
			if (text.find("for your friends")) sendMessage('status=-1');
			if (text.find("are no more")) sendMessage('status=-2');
			if (text.find("you can't receive your own")) sendMessage('status=-1');
			if (text.find("is at max capacity")) sendMessage('status=-3');
			if (text.find("is too full")) sendMessage('status=-3');
			if (text.find("you'll need to finish building")) sendMessage('status=-13');
			if (text.find("doesn't need another")) sendMessage('status=-3');
			if (text.find("can't claim the animal")) sendMessage('status=-1');
			if (text.find("out of luck on this one")) sendMessage('status=-1');
			if (text.find("only claim one reward per feed")) sendMessage('status=-6');
			if (text.find("Thanks for helping out")) sendMessage('status=1');
			if (text.find("Only your friends can")) sendMessage('status=-1');
			if (text.find("already helped")) sendMessage('status=-6');
			if (text.find("has already received")) sendMessage('status=-2');
			if (text.find("you missed your opportunity")) sendMessage('status=-11');
			if (text.find("don't have a trough")) sendMessage('status=-13');
			if (text.find("can find it in your")) sendMessage('status=1');
			if (text.find("promotion has ended")) sendMessage('status=-11');
			if (text.find("before you can")) sendMessage('status=-13');
			if (text.find("storage is full")) sendMessage('status=-3');
			if (text.find("not open to everyone")) sendMessage('status=-13');
			if (text.find("any place to store")) sendMessage('status=-3');
			if (text.find("any room to store")) sendMessage('status=-1');
			if (text.find("Thanks for taking part")) sendMessage('status=1');
			if (text.find("fresh out of")) sendMessage('status=-2');
			if (text.find("already taken part")) sendMessage('status=-6');
			if (text.find("You just sent")) sendMessage('status=1');
			if (text.find("folks have already")) sendMessage('status=-2');
			if (text.find("only your friends can")) sendMessage('status=-1');
			if (text.find("you can't help")) sendMessage('status=-1');
			if (text.find("no longer needs")) sendMessage('status=-11');
			if (text.find("already has enough")) sendMessage('status=-2');
			if (text.find("only friends can")) sendMessage('status=-1');
			if (text.find("gift box is full")) sendMessage('status=-3');
			if (text.find("you have already tried")) sendMessage('status=-6');
			if (text.find("already on another job")) sendMessage('status=-1');
			if (text.find("You helped")) sendMessage('status=1');
			if (text.find("You can only claim one item")) sendMessage('status=1');
			if (text.find("You've already claimed this item")) sendMessage('status=1');
			if(text.find("you can't accept")) sendMessage('status=-1');
			if(text.find("has given out all of the free samples")) sendMessage('status=-1');
			if(text.find("you have already helped")) sendMessage('status=-1');
			if(text.find("Slow down there partner! You've already")) sendMessage('status=-1');			
		}
	};
			
/* translation of fvwm accept/fail regex (to be added later)

			//accept text
			
			congratulations
			congrats
			hooray
			play farmville
			they want you to have this
			you just agreed
			lucky you
			thanks for helping
			just gave you
			you've been awarded
			you've taken in
			you've already accepted
			you've already helped
			you've already collected
			you've already received
			you've already claimed
			yee-haw
			your gift box
			wants you to have
			you already have
			you already hatched
			you have already
			you collected a
			you just unlocked
			you helped
			you can only claim
			you can only help
			you to have this
			do you want to
			you can find it in your
			it will be in your gift box
			
			//fail text
			
			someone already
			only available for
			try again
			no room
			proceed to send
			slow down
			had enough help
			received plenty of help
			thanks for trying to help
			come back later
			hold on
			whoa
			woah
			sorry
*/
	
	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end

