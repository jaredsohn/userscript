// ==UserScript==
// @name           	Economies of Scale Enhancer
// @namespace      	http://userscripts.org/scripts/show/130269
// @include        	*ratjoy.com/eos/*
// @include			*capitalism-online.com/eos/*
// @also           	By Hargrimm, based on work by Synreal, FishBike, and Mr. Pokeylope
// @require			http://userscripts.org/scripts/source/45988.user.js
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

try{
USP.theScriptName = 'Economies of Scale Enhancer';
}
catch (ex) {
alert(ex);
return;
} 
USP.init({theName:'marketInput', theText:'Multiplier for selling B2B:', theDefault:'3'},
		 {theName:'storeInput', theText:'Multiplier for selling in store:', theDefault:'2'},
         {theName:'idleAlert', theText:'Idle alert icons?', theDefault:true},
		 {theName:'gears', theText:'Remove production gears?', theDefault:false}
    );
GM_registerMenuCommand('Preferences for '+USP.theScriptName, USP.invoke);

var market = parseFloat(USP.getValue('marketInput'));
var store = parseFloat(USP.getValue('storeInput'));

var idleAlert = USP.getValue('idleAlert');

var disable_gears = USP.getValue('gears');
	
////////////////DO NOT EDIT BELOW THIS LINE////////////////

//Fix for Chrome handling of loadInFbox
var gm_win = (function(){
    var a;
    try {
        a = unsafeWindow === window ? false : unsafeWindow;
    } finally {
        return a || (function(){
            var e = document.createElement('p');
            e.setAttribute('onclick', 'return window;');
            return e.onclick();
        }());
    }
}());

var title = document.URL;
var tText = document.title;

if (tText.indexOf("Company Info") != -1) {
	CompanyPage();
}
else {
	Shortcuts();
}

if (title.indexOf("warehouse") != -1) {
	Warehouse();
}

if (title.indexOf("factories") != -1 || title.indexOf("rnd") != -1) {
	FactRD();
}

if (title.indexOf("stores") != -1) {
	Stores();
}

function Shortcuts() {
//Adds quick shortcut links to subpages of B2B 
	
	//Inject CSS to style links
	GM_addStyle("a.info a {color:black!important;}\
	a.info a:visited {color: black!important;}\
	a.info a:hover {color: red!important;}\
	");
	
	var i = 1;
	
	while (menu = document.getElementById('eos_menu').childNodes[i].childNodes[1]) {
		if (menu.childNodes[0].innerHTML.indexOf("Warehouse") != -1) {
			menu.innerHTML = "<b>Warehouse</b><br />\
			<br />- <a href='/eos/warehouse-new.php'>New Products</a>\
			<br />- <a href='/eos/warehouse-store.php'>Products by Store</a>";
		}
		
		if (menu.childNodes[0].innerHTML.indexOf("B2B") != -1) {
			menu.innerHTML = "<b>B2B Marketplace</b><br />\
			<br />- <a href='/eos/market-my.php'>My Listings</a>\
			<br />- <a href='/eos/market-history-sales.php'>Sales History</a>\
			<br />- <a href='/eos/market-history-purc.php'>Purchase History</a>\
			<br />- <a href='/eos/market-cat.php'>Listings by Category</a>";
		
			var b2b = true;
		}
		
		if (menu.childNodes[0].innerHTML.indexOf("Quest") != -1) {
			var bkmrkloc = menu.parentNode;
		
			i = i + 2;
		}
		
		if (menu.childNodes[0].innerHTML.indexOf("Stock") != -1) {
			menu.innerHTML = "<b>Stock Market</b><br />\
			<br />- <a href='/eos/stock-portfolio.php'>Portfolio</a>\
			<br />- <a href='/eos/stock-transaction-history.php'>Transaction History</a>";
		
		}
		
		if (menu.childNodes[0].innerHTML.indexOf("City") != -1) {
			menu.innerHTML = "<b>City</b><br />\
			<br />- <a class='load_in_fbox' href='/eos/settings-f-fund.php'>Transfer Cash</a>\
			<br />- <a class='load_in_fbox' href='/eos/settings-f-loan-new.php'>Obtain Loan</a>\
			<br />- <a class='load_in_fbox' href='/eos/settings-f-loan-repay.php'>Repay Loan</a>\
			<br />- <a class='load_in_fbox' href='/eos/city-es-apply.php'>Job Listings</a>";
			
			i = i - 1;
		}
		
		i = i + 2;
	};
	
	if (b2b) {
		var c = 0;
		
		if(!document.getElementById('new_active_firm')) {
			var soloNum = document.getElementById('eos_stats_panel_firm').childNodes[0].childNodes[0].getAttribute('href')
			currentComp = soloNum.substring(soloNum.lastIndexOf("/")+1);
		} else {
			while (comps = document.getElementById('new_active_firm').childNodes[c]) {
				if (comps.getAttribute('selected') == 'selected') {
					var currentComp = comps.getAttribute('value');
				}
		
				c++;
			};
		}
	
		if(localStorage.getItem('firstRun') == '1') {
			markNum = JSON.parse(localStorage.getItem('markNum'));
			markName = JSON.parse(localStorage.getItem('markName'));
		
			localStorage.setItem('markNum' + currentComp,JSON.stringify(markNum));
			localStorage.setItem('markName' + currentComp,JSON.stringify(markName));
			localStorage.setItem('firstRun','-1');
			localStorage.setItem('firstRun' + currentComp,'1');
		}
		
		if(localStorage.getItem('firstRun' + currentComp) != '1') {
			markNum = [19,20];
			markName = ["Electricity","Water"];
			
			localStorage.setItem('markNum' + currentComp,JSON.stringify(markNum));
			localStorage.setItem('markName' + currentComp,JSON.stringify(markName));
			localStorage.setItem('firstRun' + currentComp,'1');
		}
		
		markNum = JSON.parse(localStorage.getItem('markNum' + currentComp));
		markName = JSON.parse(localStorage.getItem('markName' + currentComp));
		
		var bookmarks = document.createElement("a");
		bookmarks.setAttribute('class', 'info');
		bookmarks.setAttribute('href', 'market.php');
		genBookmarks();

		bkmrkloc.parentNode.insertBefore(bookmarks,bkmrkloc);
			
		if(document.URL.indexOf("market-prod") != -1) {
			var markBtn = document.createElement("img");
			markBtn.setAttribute('src', 'http://i.imgur.com/s4fhE.png');
			markBtn.setAttribute('width','32px');
			var prodNum = document.URL.substring(document.URL.indexOf("=")+1);
			var prodName = document.getElementById('eos_narrow_screen_padding').childNodes[29].textContent;
			prodName = prodName.charAt(1) + prodName.substring(2).toLowerCase();
			
			btnMode();
			
			var btnLoc = document.getElementById('eos_narrow_screen_padding').childNodes[30];
			btnLoc.parentNode.insertBefore(markBtn,btnLoc);
		}
	}
	
	function btnMode() {
		nameTest = "," + markName.toString() + ",";
		if(nameTest.indexOf("," + prodName + ",") != -1) {
			markBtn.onclick = function(){rmvBookmark();};
			markBtn.setAttribute('title','Remove Bookmark');
		}
		else {
			markBtn.onclick = function(){addBookmark();};
			markBtn.setAttribute('title','Add Bookmark');
		}
	}
	
	function addBookmark() {
		markNum = JSON.parse(localStorage.getItem('markNum' + currentComp));
		markName = JSON.parse(localStorage.getItem('markName' + currentComp));
		markNum.push(prodNum);
		markName.push(prodName);
		genBookmarks();
		btnMode();
		alert("Bookmark added for " + prodName + "!");
		localStorage.setItem('markNum' + currentComp,JSON.stringify(markNum));
		localStorage.setItem('markName' + currentComp,JSON.stringify(markName));
	}
	
	function rmvBookmark() {
		markNum = JSON.parse(localStorage.getItem('markNum' + currentComp));
		markName = JSON.parse(localStorage.getItem('markName' + currentComp));
		for (i = 0; i < markNum.length; i++) {
			if (markNum[i] == prodNum) {
				alert("Bookmark for " + markName[i] + " removed!");
				markNum.splice(i,1);
				markName.splice(i,1);
				localStorage.setItem('markNum' + currentComp,JSON.stringify(markNum));
				localStorage.setItem('markName' + currentComp,JSON.stringify(markName));
				genBookmarks();
				btnMode();
			}
		}
	}
	
	function genBookmarks() {
		var marks = "<b>B2B Bookmarks</b><br />";
		for (i = 0; i < markNum.length; i++) {
			marks += "<br />- <a href='/eos/market-prod.php?pid=" + markNum[i] + "'>" + markName[i] + "</a>";
		}
		
		bookmarks.innerHTML = "<img src='http://i.imgur.com/s4fhE.png' width='32px' height='32px' />\
		<span>" + marks + "</span>";
	}
	
	unsafeWindow.loadInFbox();
}

function Warehouse() {
//Adds handy price indicators to Warehouse screen
	x=1;
	colhead = document.evaluate('/html/body/div[3]/div/div[2]/div/table/thead/tr[1]/td[1]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;
	colhead.innerHTML += '<br />B2B Price, Store Price';
	
	while (iterator = document.evaluate('/html/body/div[3]/div/div[2]/div/table/tbody/tr['+x+']/td[2]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue) {
		basePrice = 0;
		type = "reg";
		if (iterator.textContent == "Action Figure") {basePrice = 1200;};
		if (iterator.textContent == "Air Conditioner") {basePrice = 100000;};
		if (iterator.textContent == "Almonds") {basePrice = 200;};
		if (iterator.textContent == "Aluminum") {basePrice = 3000;};
		if (iterator.textContent == "Apple") {basePrice = 50;};
		if (iterator.textContent == "Apple Cider") {basePrice = 300;};
		if (iterator.textContent == "Apple Juice") {basePrice = 250;};
		if (iterator.textContent == "Apple Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Apple Pie") {basePrice = 500;};
		if (iterator.textContent == "Apple Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Aquarium") {basePrice = 15000;};
		if (iterator.textContent == "Artificial Leather") {basePrice = 1000;};
		if (iterator.textContent == "Artificial Vanilla Extract") {basePrice = 200;};
		if (iterator.textContent == "Athletic Jacket") {basePrice = 2500;};
		if (iterator.textContent == "Bacon") {basePrice = 1000;};
		if (iterator.textContent == "Balloons") {basePrice = 250;};
		if (iterator.textContent == "Banana") {basePrice = 50;};
		if (iterator.textContent == "Banana Chips") {basePrice = 400;};
		if (iterator.textContent == "Banana Cream Pie") {basePrice = 600;};
		if (iterator.textContent == "Banana Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Banana Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Banana Split") {basePrice = 600;};
		if (iterator.textContent == "Barley") {basePrice = 50;};
		if (iterator.textContent == "Baseball") {basePrice = 2500;};
		if (iterator.textContent == "Baseball Bat") {basePrice = 6500;};
		if (iterator.textContent == "Basketball") {basePrice = 1500;};
		if (iterator.textContent == "Batter") {basePrice = 100;};
		if (iterator.textContent == "Bauxite") {basePrice = 1500; type="nostore";};
		if (iterator.textContent == "Bed") {basePrice = 35000;};
		if (iterator.textContent == "Beef (Roast)") {basePrice = 500;};
		if (iterator.textContent == "Beef (Steak)") {basePrice = 800;};
		if (iterator.textContent == "Beef Patty") {basePrice = 700;};
		if (iterator.textContent == "Beef Sausage") {basePrice = 250;};
		if (iterator.textContent == "Beef Snack Sticks") {basePrice = 1250;};
		if (iterator.textContent == "Beer") {basePrice = 300;};
		if (iterator.textContent == "Belt") {basePrice = 1800;};
		if (iterator.textContent == "Bicycle") {basePrice = 10000;};
		if (iterator.textContent == "Bicycle Helmet") {basePrice = 2000;};
		if (iterator.textContent == "Black Licorice") {basePrice = 250;};
		if (iterator.textContent == "Blanket") {basePrice = 1500;};
		if (iterator.textContent == "Blueberry") {basePrice = 100;};
		if (iterator.textContent == "Blueberry Cheesecake") {basePrice = 600;};
		if (iterator.textContent == "Blueberry Muffin") {basePrice = 200;};
		if (iterator.textContent == "Blueberry Pie") {basePrice = 500;};
		if (iterator.textContent == "Bonsai") {basePrice = 1000;};
		if (iterator.textContent == "Bonsai Plant") {basePrice = 300;};
		if (iterator.textContent == "Bonsai Pot") {basePrice = 300;};
		if (iterator.textContent == "Bottled Cappuccino") {basePrice = 400;};
		if (iterator.textContent == "Bottled Water") {basePrice = 200;};
		if (iterator.textContent == "Bow Set") {basePrice = 2500;};
		if (iterator.textContent == "Bow Tie") {basePrice = 1300;};
		if (iterator.textContent == "Bread") {basePrice = 200;};
		if (iterator.textContent == "Bread Roll") {basePrice = 100;};
		if (iterator.textContent == "Breakfast Cereal") {basePrice = 250;};
		if (iterator.textContent == "Broccoli") {basePrice = 50;};
		if (iterator.textContent == "Buffalo Wings") {basePrice = 800;};
		if (iterator.textContent == "Buns") {basePrice = 200;};
		if (iterator.textContent == "Business Jet") {basePrice = 200000000;};
		if (iterator.textContent == "Business Jet Body") {basePrice = 90000000; type="nostore";};
		if (iterator.textContent == "Business Jet Wing") {basePrice = 25000000; type="nostore";};
		if (iterator.textContent == "Butter") {basePrice = 200;};
		if (iterator.textContent == "Caffeine") {basePrice = 50;};
		if (iterator.textContent == "Can") {basePrice = 5;};
		if (iterator.textContent == "Candy") {basePrice = 100;};
		if (iterator.textContent == "Canned Cherries") {basePrice = 250;};
		if (iterator.textContent == "Canned Coffee") {basePrice = 200;};
		if (iterator.textContent == "Canned Mango") {basePrice = 250;};
		if (iterator.textContent == "Canned Oranges") {basePrice = 250;};
		if (iterator.textContent == "Canned Pineapple") {basePrice = 250;};
		if (iterator.textContent == "Cap") {basePrice = 1200;};
		if (iterator.textContent == "Cappuccino") {basePrice = 200;};
		if (iterator.textContent == "Car") {basePrice = 1150000;};
		if (iterator.textContent == "Car Body") {basePrice = 650000;};
		if (iterator.textContent == "Caramel") {basePrice = 100;};
		if (iterator.textContent == "Caramel Candy") {basePrice = 300;};
		if (iterator.textContent == "Caramel Ice Cream") {basePrice = 250;};
		if (iterator.textContent == "Carbon Fiber") {basePrice = 20000;};
		if (iterator.textContent == "Carpet") {basePrice = 1000;};
		if (iterator.textContent == "Carrot") {basePrice = 50;};
		if (iterator.textContent == "Casual Dress") {basePrice = 3000;};
		if (iterator.textContent == "Cattle") {basePrice = 80000; type="nostore";};
		if (iterator.textContent == "Cement") {basePrice = 500;};
		if (iterator.textContent == "Ceramic Pot") {basePrice = 500;};
		if (iterator.textContent == "Ceramic Tile") {basePrice = 1000;};
		if (iterator.textContent == "CFRP") {basePrice = 30000;};
		if (iterator.textContent == "Chair") {basePrice = 3000;};
		if (iterator.textContent == "Charcoal") {basePrice = 600; type="nostore";};
		if (iterator.textContent == "Cheese") {basePrice = 100;};
		if (iterator.textContent == "Cheeseburger") {basePrice = 300;};
		if (iterator.textContent == "Chemicals") {basePrice = 100;};
		if (iterator.textContent == "Cherry") {basePrice = 50;};
		if (iterator.textContent == "Cherry Cheesecake") {basePrice = 600;};
		if (iterator.textContent == "Cherry Cola") {basePrice = 300;};
		if (iterator.textContent == "Cherry Cola Concentrate") {basePrice = 150; type="nostore";};
		if (iterator.textContent == "Cherry Gelatin") {basePrice = 350;};
		if (iterator.textContent == "Cherry Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Cherry Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Chicken") {basePrice = 600; type="nostore";};
		if (iterator.textContent == "Chicken Breast") {basePrice = 450;};
		if (iterator.textContent == "Chicken Breast Patty") {basePrice = 750;};
		if (iterator.textContent == "Chicken Burger") {basePrice = 260;};
		if (iterator.textContent == "Chicken Drumsticks") {basePrice = 150;};
		if (iterator.textContent == "Chicken Nuggets") {basePrice = 1000;};
		if (iterator.textContent == "Chicken Wings") {basePrice = 150;};
		if (iterator.textContent == "Chocolate Bars") {basePrice = 500;};
		if (iterator.textContent == "Chocolate Cake") {basePrice = 1250;};
		if (iterator.textContent == "Chocolate Chip Cookies") {basePrice = 250;};
		if (iterator.textContent == "Chocolate Chips") {basePrice = 100;};
		if (iterator.textContent == "Chocolate Ice Cream") {basePrice = 250;};
		if (iterator.textContent == "Chocolate Milk") {basePrice = 300;};
		if (iterator.textContent == "Chocolate Truffles") {basePrice = 700;};
		if (iterator.textContent == "Clay") {basePrice = 500; type="nostore";};
		if (iterator.textContent == "Clock") {basePrice = 1000; type="nostore";};
		if (iterator.textContent == "Coal") {basePrice = 800; type="nostore";};
		if (iterator.textContent == "Cocoa Beans") {basePrice = 100;};
		if (iterator.textContent == "Cocoa Butter") {basePrice = 200;};
		if (iterator.textContent == "Cocoa Powder") {basePrice = 100;};
		if (iterator.textContent == "Coconut") {basePrice = 200;};
		if (iterator.textContent == "Coconut Juice") {basePrice = 250;};
		if (iterator.textContent == "Coconut Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Coconut Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Coffee Beans") {basePrice = 50;};
		if (iterator.textContent == "Cola") {basePrice = 300;};
		if (iterator.textContent == "Cola Concentrate") {basePrice = 150; type="nostore";};
		if (iterator.textContent == "Comforter") {basePrice = 4000;};
		if (iterator.textContent == "Common Beans") {basePrice = 50;};
		if (iterator.textContent == "Conventional Oven") {basePrice = 35000;};
		if (iterator.textContent == "Cookie Dough") {basePrice = 100;};
		if (iterator.textContent == "Cookies N Cream Ice Cream") {basePrice = 250;};
		if (iterator.textContent == "Cooking Oil") {basePrice = 500;};
		if (iterator.textContent == "Copper") {basePrice = 8000;};
		if (iterator.textContent == "Copper Ore") {basePrice = 4000; type="nostore";};
		if (iterator.textContent == "Corn") {basePrice = 50;};
		if (iterator.textContent == "Corn Flakes") {basePrice = 250;};
		if (iterator.textContent == "Cotton") {basePrice = 200;};
		if (iterator.textContent == "Cotton Thread") {basePrice = 500;};
		if (iterator.textContent == "Country Fried Steak") {basePrice = 750;};
		if (iterator.textContent == "CPU") {basePrice = 5000;};
		if (iterator.textContent == "Cream") {basePrice = 100;};
		if (iterator.textContent == "Cruiser Body") {basePrice = 10000000; type="nostore";};
		if (iterator.textContent == "Crystal Earrings") {basePrice = 10000;};
		if (iterator.textContent == "Crystal Pendant") {basePrice = 15000;};
		if (iterator.textContent == "Designer Belt") {basePrice = 18000;};
		if (iterator.textContent == "Designer Dress") {basePrice = 120000;};
		if (iterator.textContent == "Designer Hand Bag") {basePrice = 100000;};
		if (iterator.textContent == "Designer Shoes") {basePrice = 80000;};
		if (iterator.textContent == "Desktop Computer") {basePrice = 50000;};
		if (iterator.textContent == "Diamond") {basePrice = 500000; type="nostore";};
		if (iterator.textContent == "Diamond Earrings") {basePrice = 50000;};
		if (iterator.textContent == "Diamond Necklace") {basePrice = 100000;};
		if (iterator.textContent == "Diamond Ring") {basePrice = 150000;};
		if (iterator.textContent == "Diamond Watch") {basePrice = 150000;};
		if (iterator.textContent == "Digital Camera") {basePrice = 30000;};
		if (iterator.textContent == "Dog House") {basePrice = 3000;};
		if (iterator.textContent == "Doll") {basePrice = 1200;};
		if (iterator.textContent == "Donut") {basePrice = 100;};
		if (iterator.textContent == "Dress Shirt") {basePrice = 4000;};
		if (iterator.textContent == "Dress Shoes") {basePrice = 6000;};
		if (iterator.textContent == "Dress Suit") {basePrice = 10000;};
		if (iterator.textContent == "Dresser") {basePrice = 12500;};
		if (iterator.textContent == "Dryer") {basePrice = 50000;};
		if (iterator.textContent == "DVD Player") {basePrice = 5000;};
		if (iterator.textContent == "Egg") {basePrice = 25;};
		if (iterator.textContent == "Electricity") {basePrice = 10; type="nostore";};
		if (iterator.textContent == "Energy Drink") {basePrice = 300;};
		if (iterator.textContent == "Engine") {basePrice = 250000; type="nostore";};
		if (iterator.textContent == "Espresso") {basePrice = 150;};
		if (iterator.textContent == "Executive Chair") {basePrice = 6000;};
		if (iterator.textContent == "Fan") {basePrice = 2000;};
		if (iterator.textContent == "Feather") {basePrice = 1000; type="nostore";};
		if (iterator.textContent == "Fiberglass") {basePrice = 600;};
		if (iterator.textContent == "Fishing Rod") {basePrice = 2000;};
		if (iterator.textContent == "Flax Seeds") {basePrice = 300;};
		if (iterator.textContent == "Flight Management System") {basePrice = 20000000; type="nostore";};
		if (iterator.textContent == "Floor Lamp") {basePrice = 2000;};
		if (iterator.textContent == "Flour") {basePrice = 100;};
		if (iterator.textContent == "Football") {basePrice = 1500;};
		if (iterator.textContent == "Fried Drumsticks") {basePrice = 650;};
		if (iterator.textContent == "Frozen Beef") {basePrice = 700;};
		if (iterator.textContent == "Frozen Chicken") {basePrice = 1250;};
		if (iterator.textContent == "Frozen Pizza") {basePrice = 420;};
		if (iterator.textContent == "Frozen Pork") {basePrice = 600;};
		if (iterator.textContent == "Fruit Salad") {basePrice = 400;};
		if (iterator.textContent == "Fur") {basePrice = 10000; type="nostore";};
		if (iterator.textContent == "Fur Coat") {basePrice = 25000;};
		if (iterator.textContent == "Fur Hat") {basePrice = 10000;};
		if (iterator.textContent == "Gaming Console") {basePrice = 20000;};
		if (iterator.textContent == "Gasoline") {basePrice = 1000;};
		if (iterator.textContent == "Gelatin") {basePrice = 100;};
		if (iterator.textContent == "Glass") {basePrice = 100;};
		if (iterator.textContent == "Glass Bottle") {basePrice = 20;};
		if (iterator.textContent == "Gloves") {basePrice = 500;};
		if (iterator.textContent == "Gold") {basePrice = 30000;};
		if (iterator.textContent == "Gold Bracelet") {basePrice = 60000;};
		if (iterator.textContent == "Gold Necklace") {basePrice = 20000;};
		if (iterator.textContent == "Gold Ore") {basePrice = 20000; type="nostore";};
		if (iterator.textContent == "Gold Watch") {basePrice = 40000;};
		if (iterator.textContent == "Golf Ball") {basePrice = 90;};
		if (iterator.textContent == "Golf Club Set") {basePrice = 15000;};
		if (iterator.textContent == "Golf Gloves") {basePrice = 1200;};
		if (iterator.textContent == "Golf Stand Bag") {basePrice = 4000;};
		if (iterator.textContent == "Gown") {basePrice = 7000;};
		if (iterator.textContent == "Granola Bar") {basePrice = 300;};
		if (iterator.textContent == "Grape Juice") {basePrice = 250;};
		if (iterator.textContent == "Grape Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Grape Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Grapes") {basePrice = 100;};
		if (iterator.textContent == "Grilled Chicken Breast") {basePrice = 900;};
		if (iterator.textContent == "Grilled Steak") {basePrice = 1000;};
		if (iterator.textContent == "Ground Beef") {basePrice = 350;};
		if (iterator.textContent == "Ground Pork") {basePrice = 350;};
		if (iterator.textContent == "Halite") {basePrice = 100; type="nostore";};
		if (iterator.textContent == "Ham") {basePrice = 2000;};
		if (iterator.textContent == "Ham Sandwich") {basePrice = 250;};
		if (iterator.textContent == "Hamburger") {basePrice = 250;};
		if (iterator.textContent == "Hand Bag") {basePrice = 3000;};
		if (iterator.textContent == "Hat") {basePrice = 1800;};
		if (iterator.textContent == "Helicopter") {basePrice = 80000000;};
		if (iterator.textContent == "Helicopter Body") {basePrice = 50000000; type="nostore";};
		if (iterator.textContent == "Helicopter Rotor") {basePrice = 1000000; type="nostore";};
		if (iterator.textContent == "Honey") {basePrice = 200;};
		if (iterator.textContent == "Hot Chocolate") {basePrice = 270;};
		if (iterator.textContent == "Hot Dog") {basePrice = 200;};
		if (iterator.textContent == "Integrated Circuit") {basePrice = 1000;};
		if (iterator.textContent == "Iron Ore") {basePrice = 300; type="nostore";};
		if (iterator.textContent == "Jeans") {basePrice = 4000;};
		if (iterator.textContent == "Jet Ski") {basePrice = 900000;};
		if (iterator.textContent == "Jet Ski Body") {basePrice = 120000; type="nostore";};
		if (iterator.textContent == "Khaki Pants") {basePrice = 3000;};
		if (iterator.textContent == "Laptop Computer") {basePrice = 60000;};
		if (iterator.textContent == "Leather") {basePrice = 8000; type="nostore";};
		if (iterator.textContent == "Leather Gloves") {basePrice = 2000;};
		if (iterator.textContent == "Leather Jacket") {basePrice = 18000;};
		if (iterator.textContent == "Lemon") {basePrice = 50;};
		if (iterator.textContent == "Lemon Gelatin") {basePrice = 350;};
		if (iterator.textContent == "Lemon Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Lemon Pie") {basePrice = 500;};
		if (iterator.textContent == "Lemon Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Lemon-Lime") {basePrice = 300;};
		if (iterator.textContent == "Lemon-Lime Concentrate") {basePrice = 150; type="nostore";};
		if (iterator.textContent == "Lemonade") {basePrice = 250;};
		if (iterator.textContent == "Lettuce") {basePrice = 50;};
		if (iterator.textContent == "Licorice Roots") {basePrice = 100;};
		if (iterator.textContent == "Light Bulb") {basePrice = 100;};
		if (iterator.textContent == "Lime") {basePrice = 50;};
		if (iterator.textContent == "Lime Gelatin") {basePrice = 350;};
		if (iterator.textContent == "Lime Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Lime Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Limeade") {basePrice = 250;};
		if (iterator.textContent == "Limestone") {basePrice = 150; type="nostore";};
		if (iterator.textContent == "Linen Thread") {basePrice = 600;};
		if (iterator.textContent == "Lumber") {basePrice = 5000; type="nostore";};
		if (iterator.textContent == "Malt Vinegar") {basePrice = 50;};
		if (iterator.textContent == "Mango") {basePrice = 100;};
		if (iterator.textContent == "Mango Juice") {basePrice = 250;};
		if (iterator.textContent == "Mango Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Mango Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Mattress") {basePrice = 8000;};
		if (iterator.textContent == "Mayonnaise") {basePrice = 300;};
		if (iterator.textContent == "Microprocessor") {basePrice = 200;};
		if (iterator.textContent == "Microwave Oven") {basePrice = 8000;};
		if (iterator.textContent == "Milk") {basePrice = 50;};
		if (iterator.textContent == "Milk Chocolate Bar") {basePrice = 550;};
		if (iterator.textContent == "Milk in a Carton") {basePrice = 200;};
		if (iterator.textContent == "Milk in a Jug") {basePrice = 250;};
		if (iterator.textContent == "Mineral") {basePrice = 50; type="nostore";};
		if (iterator.textContent == "Mirror") {basePrice = 12500;};
		if (iterator.textContent == "Monitor") {basePrice = 10000;};
		if (iterator.textContent == "Motherboard") {basePrice = 15000;};
		if (iterator.textContent == "Motorcycle") {basePrice = 700000;};
		if (iterator.textContent == "Motorcycle Body") {basePrice = 400000;};
		if (iterator.textContent == "Mustard") {basePrice = 300;};
		if (iterator.textContent == "Mustard Seeds") {basePrice = 100;};
		if (iterator.textContent == "Natural Gas") {basePrice = 100; type="nostore";};
		if (iterator.textContent == "Neapolitan Ice Cream") {basePrice = 250;};
		if (iterator.textContent == "Necktie") {basePrice = 1200;};
		if (iterator.textContent == "Nightstand") {basePrice = 4000;};
		if (iterator.textContent == "Nylon") {basePrice = 200;};
		if (iterator.textContent == "Nylon Thread") {basePrice = 400;};
		if (iterator.textContent == "Oat") {basePrice = 50;};
		if (iterator.textContent == "Oatmeal") {basePrice = 100;};
		if (iterator.textContent == "Oatmeal Raisin Cookie") {basePrice = 250;};
		if (iterator.textContent == "Orange") {basePrice = 50;};
		if (iterator.textContent == "Orange Gelatin") {basePrice = 350;};
		if (iterator.textContent == "Orange Juice") {basePrice = 250;};
		if (iterator.textContent == "Orange Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Orange Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Paper") {basePrice = 200;};
		if (iterator.textContent == "Paper Carton") {basePrice = 10;};
		if (iterator.textContent == "Paper Napkin") {basePrice = 100;};
		if (iterator.textContent == "Paper Towel") {basePrice = 200;};
		if (iterator.textContent == "Passenger Jet") {basePrice = 3000000000;};
		if (iterator.textContent == "Passenger Jet Body") {basePrice = 1600000000; type="nostore";};
		if (iterator.textContent == "Passenger Jet Wing") {basePrice = 300000000; type="nostore";};
		if (iterator.textContent == "Pastry Dough") {basePrice = 100;};
		if (iterator.textContent == "Peanut Butter") {basePrice = 200;};
		if (iterator.textContent == "Peanuts") {basePrice = 50;};
		if (iterator.textContent == "Pepper") {basePrice = 500;};
		if (iterator.textContent == "Personal Jet") {basePrice = 120000000;};
		if (iterator.textContent == "Personal Jet Body") {basePrice = 50000000; type="nostore";};
		if (iterator.textContent == "Personal Jet Wing") {basePrice = 15000000; type="nostore";};
		if (iterator.textContent == "Petroleum") {basePrice = 5000;};
		if (iterator.textContent == "Pig") {basePrice = 7000; type="nostore";};
		if (iterator.textContent == "Pillow") {basePrice = 1500;};
		if (iterator.textContent == "Pi"+String.fromCharCode(241) +"a Colada") {basePrice = 400;};
		if (iterator.textContent == "Pineapple") {basePrice = 100;};
		if (iterator.textContent == "Pineapple Gelatin") {basePrice = 350;};
		if (iterator.textContent == "Pineapple Juice") {basePrice = 250;};
		if (iterator.textContent == "Pineapple Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Pineapple Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Pizza") {basePrice = 800;};
		if (iterator.textContent == "Plastic") {basePrice = 500;};
		if (iterator.textContent == "Plastic Bottle") {basePrice = 10;};
		if (iterator.textContent == "Plastic Jar") {basePrice = 10;};
		if (iterator.textContent == "Plastic Jug") {basePrice = 20;};
		if (iterator.textContent == "Polyester") {basePrice = 200;};
		if (iterator.textContent == "Polyester Thread") {basePrice = 350;};
		if (iterator.textContent == "Pork") {basePrice = 400;};
		if (iterator.textContent == "Pork Chop") {basePrice = 500;};
		if (iterator.textContent == "Pork Sausage") {basePrice = 250;};
		if (iterator.textContent == "Pork Skin") {basePrice = 60; type="nostore";};
		if (iterator.textContent == "Portable Heater") {basePrice = 6000;};
		if (iterator.textContent == "Pot Roast") {basePrice = 650;};
		if (iterator.textContent == "Potato") {basePrice = 50;};
		if (iterator.textContent == "Power Boat") {basePrice = 2500000;};
		if (iterator.textContent == "Power Boat Body") {basePrice = 1000000; type="nostore";};
		if (iterator.textContent == "Power Cruiser") {basePrice = 18000000;};
		if (iterator.textContent == "Printer") {basePrice = 12000;};
		if (iterator.textContent == "Propeller") {basePrice = 100000; type="nostore";};
		if (iterator.textContent == "Pumpkin") {basePrice = 400;};
		if (iterator.textContent == "Pumpkin Pie") {basePrice = 500;};
		if (iterator.textContent == "Quartz") {basePrice = 500; type="nostore";};
		if (iterator.textContent == "Radio") {basePrice = 2000;};
		if (iterator.textContent == "Raisin") {basePrice = 200;};
		if (iterator.textContent == "Remote Controlled Car") {basePrice = 3500;};
		if (iterator.textContent == "Rice") {basePrice = 50;};
		if (iterator.textContent == "Roast Beef") {basePrice = 750;};
		if (iterator.textContent == "Roast Beef Sandwich") {basePrice = 250;};
		if (iterator.textContent == "Roasted Pork Chop") {basePrice = 800;};
		if (iterator.textContent == "Root Beer") {basePrice = 300;};
		if (iterator.textContent == "Root Beer Concentrate") {basePrice = 150; type="nostore";};
		if (iterator.textContent == "Rotisserie Chicken") {basePrice = 900;};
		if (iterator.textContent == "Row Boat") {basePrice = 70000;};
		if (iterator.textContent == "Rubber") {basePrice = 500;};
		if (iterator.textContent == "Rubber Duck") {basePrice = 500;};
		if (iterator.textContent == "Rubik's Cube") {basePrice = 800;};
		if (iterator.textContent == "Rug") {basePrice = 5000;};
		if (iterator.textContent == "Rum") {basePrice = 200;};
		if (iterator.textContent == "Sailboat") {basePrice = 800000;};
		if (iterator.textContent == "Sails") {basePrice = 150000; type="nostore";};
		if (iterator.textContent == "Salami") {basePrice = 750;};
		if (iterator.textContent == "Salt") {basePrice = 200;};
		if (iterator.textContent == "Sapphire") {basePrice = 2000; type="nostore";};
		if (iterator.textContent == "Scanner") {basePrice = 12000;};
		if (iterator.textContent == "Scarf") {basePrice = 1800;};
		if (iterator.textContent == "Seats") {basePrice = 30000;};
		if (iterator.textContent == "Sheet") {basePrice = 1500;};
		if (iterator.textContent == "Shorts") {basePrice = 1500;};
		if (iterator.textContent == "Side-By-Side Refrigerator") {basePrice = 100000;};
		if (iterator.textContent == "Silica Sand") {basePrice = 100; type="nostore";};
		if (iterator.textContent == "Silicon") {basePrice = 1000;};
		if (iterator.textContent == "Silk") {basePrice = 500; type="nostore";};
		if (iterator.textContent == "Silk Thread") {basePrice = 1000;};
		if (iterator.textContent == "Silver") {basePrice = 10000;};
		if (iterator.textContent == "Silver Bracelet") {basePrice = 25000;};
		if (iterator.textContent == "Silver Necklace") {basePrice = 10000;};
		if (iterator.textContent == "Silver Ore") {basePrice = 5000; type="nostore";};
		if (iterator.textContent == "Skirt") {basePrice = 1500;};
		if (iterator.textContent == "Sleeping Bag") {basePrice = 3000;};
		if (iterator.textContent == "Snorkel") {basePrice = 1500;};
		if (iterator.textContent == "Soccer Ball") {basePrice = 1800;};
		if (iterator.textContent == "Socks") {basePrice = 1000;};
		if (iterator.textContent == "Sport Shoes") {basePrice = 3000;};
		if (iterator.textContent == "Sport Watch") {basePrice = 1500;};
		if (iterator.textContent == "Steak Taco") {basePrice = 350;};
		if (iterator.textContent == "Steel") {basePrice = 5000;};
		if (iterator.textContent == "Stockings") {basePrice = 1200;};
		if (iterator.textContent == "Strawberry") {basePrice = 50;};
		if (iterator.textContent == "Strawberry Banana Cake") {basePrice = 1250;};
		if (iterator.textContent == "Strawberry Banana Smoothie") {basePrice = 500;};
		if (iterator.textContent == "Strawberry Gelatin") {basePrice = 350;};
		if (iterator.textContent == "Strawberry Ice Cream") {basePrice = 250;};
		if (iterator.textContent == "Strawberry Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Strawberry Milk") {basePrice = 300;};
		if (iterator.textContent == "Strawberry Pie") {basePrice = 500;};
		if (iterator.textContent == "Strawberry Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Stuffed Animal") {basePrice = 1000;};
		if (iterator.textContent == "Sugar") {basePrice = 200;};
		if (iterator.textContent == "Sugar Cane") {basePrice = 150;};
		if (iterator.textContent == "Sunglasses") {basePrice = 1800;};
		if (iterator.textContent == "Surfboard") {basePrice = 20000;};
		if (iterator.textContent == "SUV") {basePrice = 1200000;};
		if (iterator.textContent == "SUV Body") {basePrice = 700000;};
		if (iterator.textContent == "Sweater") {basePrice = 2000;};
		if (iterator.textContent == "Swim Fin") {basePrice = 2500;};
		if (iterator.textContent == "Swim Goggle") {basePrice = 1500;};
		if (iterator.textContent == "Swim Suit") {basePrice = 6000;};
		if (iterator.textContent == "T-Shirt") {basePrice = 1000;};
		if (iterator.textContent == "Table") {basePrice = 15000;};
		if (iterator.textContent == "Table Lamp") {basePrice = 1000;};
		if (iterator.textContent == "Tennis Ball") {basePrice = 150;};
		if (iterator.textContent == "Tennis Racquet") {basePrice = 2000;};
		if (iterator.textContent == "Tiramisu") {basePrice = 1250;};
		if (iterator.textContent == "Titanium") {basePrice = 20000;};
		if (iterator.textContent == "Titanium Alloy") {basePrice = 30000;};
		if (iterator.textContent == "Titanium Ore") {basePrice = 3000; type="nostore";};
		if (iterator.textContent == "Toilet") {basePrice = 15000;};
		if (iterator.textContent == "Toilet Bowl") {basePrice = 5000;};
		if (iterator.textContent == "Toilet Tank") {basePrice = 2500;};
		if (iterator.textContent == "Toilet Tissue") {basePrice = 1000;};
		if (iterator.textContent == "Tomato") {basePrice = 70;};
		if (iterator.textContent == "Tomato Ketchup") {basePrice = 200;};
		if (iterator.textContent == "Top-Freezer Refrigerator") {basePrice = 50000;};
		if (iterator.textContent == "Tortilla") {basePrice = 200;};
		if (iterator.textContent == "Tortilla Chips") {basePrice = 400;};
		if (iterator.textContent == "Towel") {basePrice = 700;};
		if (iterator.textContent == "Toy Keyboard") {basePrice = 2500;};
		if (iterator.textContent == "Truck") {basePrice = 1400000;};
		if (iterator.textContent == "Truck Body") {basePrice = 850000;};
		if (iterator.textContent == "Tungsten Ore") {basePrice = 12000; type="nostore";};
		if (iterator.textContent == "Tungsten Powder") {basePrice = 250;};
		if (iterator.textContent == "Turbine Engine") {basePrice = 1000000; type="nostore";};
		if (iterator.textContent == "TV") {basePrice = 30000;};
		if (iterator.textContent == "Van") {basePrice = 1350000;};
		if (iterator.textContent == "Van Body") {basePrice = 750000;};
		if (iterator.textContent == "Vanilla Beans") {basePrice = 900;};
		if (iterator.textContent == "Vanilla Cake") {basePrice = 1250;};
		if (iterator.textContent == "Vanilla Extract") {basePrice = 1000;};
		if (iterator.textContent == "Vanilla Ice Cream") {basePrice = 250;};
		if (iterator.textContent == "Vanilla Milk") {basePrice = 300;};
		if (iterator.textContent == "Vinyl") {basePrice = 250;};
		if (iterator.textContent == "Vinyl Thread") {basePrice = 500;};
		if (iterator.textContent == "Wallet") {basePrice = 1600;};
		if (iterator.textContent == "Washer") {basePrice = 42000;};
		if (iterator.textContent == "Water") {basePrice = 10; type="nostore";};
		if (iterator.textContent == "Water Gun") {basePrice = 1500;};
		if (iterator.textContent == "Watermelon") {basePrice = 400;};
		if (iterator.textContent == "Watermelon Juice") {basePrice = 250;};
		if (iterator.textContent == "Watermelon Juice Concentrate") {basePrice = 125; type="nostore";};
		if (iterator.textContent == "Watermelon Sorbet") {basePrice = 150;};
		if (iterator.textContent == "Wedding Dress") {basePrice = 10000;};
		if (iterator.textContent == "Wheat") {basePrice = 50;};
		if (iterator.textContent == "Wheel") {basePrice = 8000;};
		if (iterator.textContent == "Whipped Cream") {basePrice = 100;};
		if (iterator.textContent == "White Vinegar") {basePrice = 100;};
		if (iterator.textContent == "Whole Chicken") {basePrice = 1000;};
		if (iterator.textContent == "Wig") {basePrice = 1500;};
		if (iterator.textContent == "Window AC") {basePrice = 15000;};
		if (iterator.textContent == "Wine") {basePrice = 1000;};
		if (iterator.textContent == "Wood Floor") {basePrice = 2000;};
		if (iterator.textContent == "Wool") {basePrice = 400; type="nostore";};
		if (iterator.textContent == "Wool Coat") {basePrice = 11000;};
		if (iterator.textContent == "Wool Yarn") {basePrice = 900;};
		if (iterator.textContent == "Yogurt") {basePrice = 200;};

			if (basePrice!=0) {
			itQuality = document.evaluate('/html/body/div[3]/div/div[2]/div/table/tbody/tr['+x+']/td[3]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;
			
			//Add $ to sell price field
			z = 0;
			sellField = iterator.nextSibling;
			while (z < 4) {
				sellField = sellField.nextSibling;
				z++;
			}
			sellField.innerHTML = "$" + sellField.innerHTML;
			
			if (type=="nostore"){
			iterator.innerHTML += '<br /> $'+ Math.round(((itQuality.textContent*.02+1)*(basePrice/100)*market)*100)/100 + ', N/A';
			}
			
			if (type=="reg") {
			iterator.innerHTML += '<br /> $'+ Math.round(((itQuality.textContent*.02+1)*(basePrice/100)*market)*100)/100 + ', $' + Math.round(((itQuality.textContent*.02+1)*(basePrice/100)*store)*100)/100;
			}
		}
		x++;
	};
};

function FactRD() {
	// Based on FishTime by FishBike and Mr. Pokeylope
	// http://userscripts.org/scripts/show/130193

	// Opera doesn't define unsafeWindow
	if (!window.unsafeWindow) {
		window.unsafeWindow = window;
	}
	
	function FishTime()
	{
		setTimeout(FishTime, 1000);

		var cd_on = unsafeWindow.cd_on;
		if (cd_on) {
			var statuses = unsafeWindow.fact_status;
			if (!statuses) {
				statuses = unsafeWindow.rnd_status;
			}
			if (!statuses) {
				statuses = unsafeWindow.store_status;
			}

		for (i = 1; i < cd_on.length; i++) {
			if (cd_on[i]) {
				var color;
				var shadow_color;
				var remaining = unsafeWindow.cd_remaining[i];
				if (remaining < 600) {
					color = "#FF0000";
					shadow_color = "black";
				} else if (remaining < 3600) {
					color = "#FFFF00";
					shadow_color = "black";
				} else {
					color = "#000000";
					shadow_color = "white";
				}
				var shadow = "-2px 0 5px "+shadow_color+", 2px 0 5px "+shadow_color+", 0 2px 5px "+shadow_color+", 0 -2px 5px "+shadow_color+";";
				document.getElementById("timer_"+i).innerHTML = "<span style='color: "+color+"; text-shadow: "+shadow+"'>"+unsafeWindow.sec2hms(remaining)+"</span>";

				var status = document.getElementById("status_"+i);
				status.innerHTML = statuses[i].replace(/^(Producing|Researching) /, "");
				var img = status.firstElementChild;
				if (img) {
					img.style.verticalAlign = "middle";
				}
			} else {
			if (document.URL.indexOf("factories") != -1) {
				var title = unsafeWindow.fact_title[i];
			} else {
				var title = unsafeWindow.rnd_title[i];
			}
			
			if (document.URL.indexOf("stores") != -1) {
				title = unsafeWindow.store_title[i];
			}
			
			if (statuses[i] == "Ready" && idleAlert) {
				document.getElementById("timer_"+i).innerHTML = "<img src='http://i.imgur.com/1UKYC.png' />";
			} else {
				document.getElementById("timer_"+i).innerHTML = "";
			}
			document.getElementById("status_"+i).innerHTML = "";
			}
		}
		}
	}

	(function () {

	for (i = 1; i < unsafeWindow.cd_on.length; i++) {
		var icon = document.getElementById("building_icon_"+i);

		if (disable_gears) {
			icon.firstChild.innerHTML="";
		}

		icon.firstChild.innerHTML += "<div id='timer_"+i+"' style='font-size:16px; font-family:sans-serif; font-weight:bold; position: relative; left: -12px; top: 3px; z-index: 800'/>";
		icon.firstChild.innerHTML += "<div id='status_"+i+"' style='text-shadow: -2px 0 10px white, 2px 0 10px white, 0 2px 10px white, 0 -2px 10px white; font-size:14px; font-family:sans-serif; font-weight: bold; white-space: nowrap; position:relative; left: -30px; z-index: 800'/>";

		if (disable_gears) {
			icon.firstChild.innerHTML+="<div id='cd_icon_"+i+"' style='display: none'/>";
			icon.firstChild.innerHTML+="<div id='cd_icon_back_"+i+"' style='display: none'/>";
		}
	}
	
	FishTime();
	})();
};

function Stores() {
	setTimeout(Stores, 1000);
	
	sellStats = document.getElementsByClassName('store_sell_module_stats');
	
	if(sellStats[0].childNodes[1].childNodes[7].textContent) {
		var sellTick = sellStats[0].childNodes[1].childNodes[10];
		
		sellStats[0].childNodes[1].childNodes[9].style.fontWeight = 'bold';

		var tickSales = numConvert(sellTick.textContent);
		
		var availStats = document.getElementsByClassName('sspi_details');
		
		var available = availStats[1].childNodes[0].getAttribute('title');
		
		var availTot = parseInt(available.substr(10).replace(/\,/g,""));
		
		var ticks = Math.ceil(availTot / tickSales);
		var hours = Math.round((ticks / 4)*100)/100;
		
		try{document.getElementsByClassName('store_sell_module_prod')[0].childNodes[1].innerHTML = "	Est. Ticks to Sell: " + ticks + " (" + hours + " Hours)";}
		catch(e){alert(e);}
	}
	
	function numConvert(input) {
		if (input.indexOf("k") != -1) {
			output = input.substr(0,input.length - 2) * 1000;
		} 
		else if (input.indexOf("m") != -1) {
			output = input.substr(0,input.length - 2) * 1000000;
		}
		else {
			output = input;
		}
		
		return output;
	}
}
