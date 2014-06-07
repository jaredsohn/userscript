// ==UserScript==
// @name        The West - Set
// @namespace   http://userscripts.org/users/501971
// @author 	    [Italiano] – tw81 , [En] jojok
// @description Show Sets Owned
// @include     http://*.the-west.*/game.php*
// @include     http://*.public.beta.the-west.net/game.php*
// @version     1.01
// @grant       none
// ==/UserScript==

(function(func) {
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = "(" + func.toString() + ")();";
	document.body.appendChild(script);
	document.body.removeChild(script);
}(function() {
	var TW_Widgets = new Object();

	TW_Widgets.MenuButton = function(image, title, onclick) {
		var self = this;

		this.isHovered = false;
		this.onClick = onclick;

		var clicked = function(e) {
			if (self.onClick)
				self.onClick(self, e);
		}

		var repaint = function() {
			var x = !self.isHovered ? 0 : -25;
			self.obj.css("background-position", x + "px 0px");
		}

		var mouseIn = function() {
			self.isHovered = true;
			repaint();
		}

		var mouseOut = function() {
			self.isHovered = false;
			repaint();
		}

		this.obj = $("<div class='menulink' title='" + title + "' />").css("background-image", "url(" + image + ")");
		this.obj.hover(mouseIn, mouseOut);
		this.obj.click(clicked);

		$("div#ui_menubar").append($("<div class='ui_menucontainer' />").append(this.obj).append("<div class='menucontainer_bottom' />"));
	}

     var TW_Sets = [{
            name: "Golden set",
            items: [858, 50, 136]
        }, {
            name: "Greenhorn set",
            items: [569, 262, 11118, 438, 40000, 10148, 859, 52, 607]
        }, {
            name: "Holiday set",
            items: [567, 258, 437, 10181, 856, 137, 609, 1759, 40200]
        }, {
            name: "Dancer's set",
            items: [566, 259, 11138, 433, 368, 10149, 1772, 665]
        }, {
            name: "Farmer's set",
            items: [41045, 219, 11005, 409, 321, 10025, 797]
        }, {
            name: "Gentleman's set",
            items: [537, 235, 11077, 427, 354, 10075, 1715, 664]
        }, {
            name: "Indian's set",
            items: [512, 253, 11137, 429, 369, 10094, 602, 904, 96]
        }, {
            name: "Mexican's set",
            items: [561, 254, 428, 312, 10054, 600, 792, 903, 95]
        }, {
            name: "Pilgrim's dress set",
            items: [528, 256, 11035, 431, 372, 723, 10218]
        }, {
            name: "Pilgrim's set",
            items: [529, 257, 11034, 432, 373, 768, 10219]
        }, {
            name: "Charlatan's set",
            items: [527, 224, 11085, 435, 340, 10085, 854, 794, 191]
        }, {
            name: "Sleepyhead",
            items: [261, 436, 375, 47, 132, 1717, 11207]
        }, {
            name: "TW-Times set",
            items: [40031, 185146, 185145]
        }, {
            name: "Collector's set",
            items: [575, 264, 11139, 439, 40002, 10150, 863, 58, 140, 611, 2409]
        }, {
            name: "Easter bunny set",
            items: [265, 11140, 440, 40003, 63]
        }, {
            name: "Firefighter set",
            items: [1762]
        }, {
            name: "Chingachgook",
            items: [589, 276, 11151, 451, 40016, 10161, 878, 67, 151]
        }, {
            name: "Natty Bumppo",
            items: [590, 277, 11152, 452, 40017, 10162, 879, 68, 152]
        }, {
            name: "Allan Quatermain",
            items: [591, 278, 11153, 453, 40018, 10163, 880, 69, 153]
        }, {
            name: "Walker set",
            items: [592, 279, 11154, 454, 40019, 10164, 154]
        }, {
            name: "Cupid's set",
            items: [41003, 290, 11165, 465, 40030, 10175, 887, 165, 637]
        }, {
            name: "Freeman",
            items: [41004, 291, 11166, 466, 40032, 10176, 638, 2189]
        }, {
            name: "Doc",
            items: [41005, 292, 11167, 467, 40033, 10177, 639, 2190]
        }, {
            name: "Cartwright",
            items: [41006, 293, 11168, 468, 40034, 10178, 640, 2191]
        }, {
            name: "Fair set",
            items: [41007, 294, 11169, 469, 40035, 10179, 642, 2223]
        }, {
            name: "Party set",
            items: [41008, 295, 11170, 470, 40036, 10180]
        }, {
            name: "Soap opera set",
            items: [41019, 42007, 11181, 481, 40048, 10192]
        }, {
            name: "Christopher' s parade set",
            items: [41020, 42008, 11182, 482, 40049, 10193]
        }, {
            name: "Wood magician's set",
            items: [185151, 185152, 185148, 185150, 185149, 185147]
        }, {
            name: "Will Munny",
            items: [41028, 42016, 11190, 490, 40057, 10201, 895, 87, 183]
        }, {
            name: "Jeremiah Johnson",
            items: [41029, 42017, 11191, 491, 40058, 10202, 896, 88, 184]
        }, {
            name: "Elfego Baca",
            items: [41030, 42018, 11192, 492, 40059, 10203, 897, 89, 185]
        }, {
            name: "Clothing of Independence",
            items: [41032, 42020, 11193, 494, 40061, 10205, 661, 2301]
        }, {
            name: "Frank Eaton",
            items: [41033, 42021, 11195, 495, 40063, 10206, 899, 91, 187]
        }, {
            name: "George McJunkin",
            items: [41034, 42022, 11196, 496, 40064, 10207, 900, 92, 188]
        }, {
            name: "King Fisher",
            items: [41035, 42023, 11197, 497, 40065, 10208, 901, 93, 189]
        }, {
            name: "Bavarian Outfit",
            items: [41036, 42024, 11198, 498, 40066, 10209, 663, 2363]
        }, {
            name: "Prairie Set",
            items: [42025, 41037, 40067, 499, 11199, 10210]
	    }, {
            name: "Fire and Ice",
            items: [90, 898, 186]
		}, {
            name: "Eight-hour day supply",
            items: [2352, 40062]
		}, {
            name: "Adventurer Set",
            items: [41040, 42028, 40070, 10213, 11202, 43002]
		}, {
            name: "Duel Set",
            items: [41041, 42029, 40071, 10214, 11203, 43003]
		}, {
            name: "Worker Set",
            items: [41042, 42030, 40072, 10215, 11204, 43004]
		}, {
            name: "Soldier Set",
            items: [41043, 42031, 40073, 10216, 11205, 43005]
		}, {
            name: "Thunder and lightning",
            items: [902, 94, 190]
		}, {
            name: "Nightmare set",
            items: [41044, 42032, 40074, 10217, 11206, 43006]
        }, {
            name: "Confederate Set",
            items: [41038, 42026, 40068, 10211, 11200, 43000]
        }, {
            name: "The Set with no name",
            items: [41039, 42027, 40069, 10212, 11201, 43001]
        }, {
            name: "Winter Gear",
            items: [41200, 42201, 40202, 10261, 11273, 43200]
        }, {
            name: "Winter Tools",
            items: [905, 97, 191, 667, 2539]
        }, {
            name: "Lover's Set",
            items: [41205, 42205, 40206, 43204, 10303, 11277]
        }, {
            name: "Items for Energy",
            items: [2358, 2356, 2296, 2294, 2235, 2130, 2129, 2128, 1997, 1969, 1970, 1943, 1937, 1928, 1892, 1890, 1971, 1985, 12704, 12706, 13704, 13706, 16100, 185203, 185205]
        }, {
            name: "Items for Health point",
            items: [1883, 1898, 1892, 1946, 1974, 1991, 2116, 2117, 2235, 2253, 2254, 2255, 2256, 2257, 2295, 2296, 2357, 2358, 12705, 12706, 13705, 13706, 16100, 185204, 185205]
        }, {
            name: "Items for Speed",
            items: [1918, 1919, 1926, 1934, 1937, 1952, 1968, 1987, 2135, 2229, 2262, 2263, 2264, 2284, 2292, 2354, 12702, 13702, 185201]
        }, {
            name: "Items for Duell",
            items: [1882, 1934, 1938, 1939, 1952, 1985, 1988, 2128, 2129, 2130, 2268, 2293, 2355, 2391, 12703, 13703, 185202]
        }, {
            name: "Item for Labbor",
            items: [1879, 1891, 1928, 1934, 1939, 1940, 1981, 1984, 1997, 1998, 2100, 2101, 2102, 2103, 2104, 2105, 2118, 2126, 2128, 2129, 2130, 2164, 2206, 2207, 2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2225, 2268, 2291, 2353, 2391, 12701, 13701, 185200]
        }, {
            name: "Items for Skills",
            items: [1863, 1864, 1871, 1872, 1873, 1879, 1946, 1977, 1978, 1979, 1981, 1982, 1984, 1988, 2285, 2286, 2287, 2288, 2289]
        }, {
            name: "Items for Fort",
            items: [1900, 1901, 1908, 1909, 1910, 1916, 1949, 1990, 1991, 2106, 2107, 2108, 2109, 2110, 2111, 2112, 2113, 2114, 2115, 2119, 2120, 2121, 2122, 2123, 2124, 2127, 2258, 2259, 2260, 2261, 2269]
        }, {
            name: "Items for Luck",
            items: [2247, 2248, 2249, 2250, 2251, 2270]
        }, {
            name: "Items for Perm",
            items: [21340, 21341, 21342, 21343]
        },
                   
    ];

    var TW_QuickSearch = new Object();
    TW_QuickSearch.name = "Set e Bonus";
    TW_QuickSearch.gui = {};
    TW_QuickSearch.gui.popupMenu = null;

    TW_QuickSearch.init = function() {
		TW_QuickSearch.gui.menuButton = new TW_Widgets.MenuButton(
			"data:image/png;base64,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",
            TW_QuickSearch.name,
			TW_QuickSearch.popup
		);
    }

    TW_QuickSearch.popup = function(button, e) {
        if (!TW_QuickSearch.gui.popupMenu) {
            TW_QuickSearch.gui.popupMenu = new west.gui.Selectbox().setWidth(200);
            TW_QuickSearch.gui.popupMenu.addListener(TW_QuickSearch.findSet);

            for (var i = 0; i < TW_Sets.length; i++)
                TW_QuickSearch.gui.popupMenu.addItem(i, TW_Sets[i].name);
        }
        TW_QuickSearch.gui.popupMenu.show(e);
    }

    TW_QuickSearch.findSet = function(id) {
        var items, invItems = [];

        try {
            items = TW_Sets[id].items;
        } catch (e) {
            return;
        }

        for (var i = 0; i < items.length; i++) {
            var invItem = Bag.getItemByItemId(items[i]);
            if (invItem)
                invItems.push(invItem);
        }

        if (invItems.length > 0) {
            if (!Bag.loaded) {
                var f = function(res) {
                    EventHandler.listen('inventory_loaded', function() {
                        Wear.open();
                        Inventory.showSearchResult(res);
                        return EventHandler.ONE_TIME_EVENT;
                    });
                    return Bag.loadItems();
                }(invItems);
            } else {
                Wear.open();
                Inventory.showSearchResult(invItems);
            }
        } else {
            var dlg = new west.gui.Dialog("Search for Set", "Not Found !!");
            dlg.addButton("ok");
            dlg.setIcon(west.gui.Dialog.SYS_WARNING);
            dlg.show();
        }
    }

	$(document).ready(TW_QuickSearch.init);
}));