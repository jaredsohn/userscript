// ==UserScript==
// @name        The West - Skills Calc
// @author      neversleep1911
// @description Calculates and displays sum of skills obtained from items
// @include     http://*.the-west.*/game.php*
// @grant		none
// @version     1.0
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

		var clicked = function() {
			if (self.onClick)
				self.onClick(self);
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

	TW_Widgets.Group = function(title, parent) {
		var self = this;

		this.content = $("<div style='height: 310px;'></div>");
		this.scrollPanel = $("<div style='height: 280px; margin-top: 4px;'></div>");
		this.scrollPane = new west.gui.Scrollpane();
		this.scrollPane.appendTo(this.scrollPanel);

		this.content.append("<h2>" + title + "</h2><hr />");
		this.content.append(this.scrollPanel);

		this.obj = new west.gui.Groupframe("");
		this.obj.appendToContentPane(this.content);

		this.setLeft = function(x) {
			$(this.obj.getMainDiv()).css("left", x + "px");
			return self;
		}
		this.setTop = function(y) {
			$(this.obj.getMainDiv()).css("top", y + "px");
			return self;
		}
		this.setRight = function(x) {
			$(this.obj.getMainDiv()).css("right", x + "px");
			return self;
		}
		this.setBottom = function(y) {
			$(this.obj.getMainDiv()).css("bottom", y + "px");
			return self;
		}
		this.setWidth = function(w) {
			$(this.obj.getMainDiv()).css("width", w + "px");
			return self;
		}
		this.setHeight = function(h) {
			this.content.css("height", h + "px");
			this.scrollPanel.css("height", (h - 30) + "px");
			return self;
		}

		$(this.obj.getMainDiv()).css("position", "absolute");
		if (parent)
			this.obj.appendTo(parent);
	}

	TW_Widgets.Button = function(title, onclick, parent) {
		this.obj = new west.gui.Button(title, onclick);
		$(this.obj.getMainDiv()).css("position", "absolute");

		if (parent)
			this.obj.appendTo(parent);
	}

	var TW_Skills = function() {
		this.attributes = {};

		this.attributes.strength = {
			build: 0,
			punch: 0,
			tough: 0,
			endurance: 0,
			health: 0
		};
		this.attributes.flexibility = {
			ride: 0,
			reflex: 0,
			dodge: 0,
			hide: 0,
			swim: 0
		};
		this.attributes.dexterity = {
			aim: 0,
			shot: 0,
			pitfall: 0,
			finger_dexterity: 0,
			repair: 0
		};
		this.attributes.charisma = {
			leadership: 0,
			tactic: 0,
			trade: 0,
			animal: 0,
			appearance: 0
		};

		var self = this;
		var calc = function(item, sum) {
			for (var k in item.bonus.attributes) {
				if (!item.bonus.attributes.hasOwnProperty(k))
					continue;

				for (var s in self.attributes[k]) {
					if (self.attributes[k].hasOwnProperty(s)) {
						var i = parseInt(item.bonus.attributes[k]);
						if (!sum)
							i = -i;

						self.attributes[k][s] += i;
					}
				}
			}

			for (var k in item.bonus.skills) {
				if (!item.bonus.skills.hasOwnProperty(k))
					continue;

				for (var a in self.attributes) {
					if (self.attributes.hasOwnProperty(a)) {
						var ok = false;
						for (var s in self.attributes[a]) {
							if (self.attributes[a].hasOwnProperty(s) && s == k) {
								var i = parseInt(item.bonus.skills[k]);
								if (!sum)
									i = -i;

								self.attributes[a][s] += i;
								ok = true;
								break;
							}
						}
						if (ok)
							break;
					}
				}
			}
		}

		this.sum = function(item) {
			calc(item, true);
		}

		this.sub = function(item) {
			calc(item, false);
		}
	}

	TW_WearSets = [{
		name: "Farmer's set",
		items: [219, 321, 10025, 11005, 409, 797],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1
			},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1
			},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1,
				charisma: 1
			},
			skills: {},
		}, {
			attributes: {
				strength: 2,
				flexibility: 2,
				dexterity: 2,
				charisma: 2
			},
			skills: {},
		}, {
			attributes: {
				strength: 2,
				flexibility: 2,
				dexterity: 2,
				charisma: 2
			},
			skills: {},
		}]
	}, {
		name: "Gentleman's set",
		items: [537, 235, 354, 10075, 11077, 427, 1715],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				charisma: 1
			},
			skills: {
				appearance: 8
			},
		}, {
			attributes: {
				charisma: 3
			},
			skills: {
				leadership: 8,
				appearance: 8
			},
		}, {
			attributes: {
				charisma: 6
			},
			skills: {
				leadership: 8,
				trade: 8,
				appearance: 8
			},
		}, {
			attributes: {
				charisma: 10
			},
			skills: {
				leadership: 8,
				trade: 8,
				appearance: 16
			},
		}, {
			attributes: {
				charisma: 15
			},
			skills: {
				leadership: 8,
				trade: 8,
				appearance: 25
			},
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				leadership: 8,
				trade: 20,
				appearance: 25
			},
		}, ]
	}, {
		name: "Charlatan's set",
		items: [527, 224, 340, 10085, 11085, 435, 794, 854],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				dexterity: 1
			},
			skills: {
				endurance: 5,
				trade: 5
			},
		}, {
			attributes: {
				dexterity: 2
			},
			skills: {
				endurance: 10,
				trade: 10
			},
		}, {
			attributes: {
				dexterity: 4
			},
			skills: {
				endurance: 15,
				trade: 15
			},
		}, {
			attributes: {
				dexterity: 6
			},
			skills: {
				endurance: 20,
				trade: 20
			},
		}, {
			attributes: {
				dexterity: 9
			},
			skills: {
				tough: 18,
				endurance: 20,
				reflex: 18,
				aim: 18,
				shot: 18,
				trade: 20
			},
		}, {
			attributes: {
				dexterity: 12
			},
			skills: {
				tough: 18,
				endurance: 20,
				reflex: 18,
				dodge: 18,
				aim: 18,
				shot: 18,
				tactic: 18,
				trade: 20,
				appearance: 18
			},
		}, {
			attributes: {
				dexterity: 16
			},
			skills: {
				tough: 18,
				endurance: 20,
				reflex: 18,
				dodge: 18,
				aim: 18,
				shot: 18,
				tactic: 18,
				trade: 20,
				appearance: 18
			},
		}]
	}, {
		name: "Mexican's set",
		items: [561, 254, 312, 10054, 428, 792, 600],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1
			},
			skills: {},
		}, {
			attributes: {
				strength: 2
			},
			skills: {},
		}, {
			attributes: {
				strength: 4
			},
			skills: {},
		}, {
			attributes: {
				strength: 6
			},
			skills: {},
		}, {
			attributes: {
				strength: 9
			},
			skills: {},
		}, {
			attributes: {
				strength: 12
			},
			skills: {},
		}]
	}, {
		name: "Indian's set",
		items: [512, 253, 369, 10094, 11137, 429, 602, 11057, 806],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				flexibility: 2
			},
			skills: {
				hide: 8
			},
		}, {
			attributes: {
				flexibility: 5
			},
			skills: {
				hide: 8,
				swim: 8
			},
		}, {
			attributes: {
				flexibility: 8
			},
			skills: {
				hide: 8,
				swim: 8,
				pitfall: 8
			},
		}, {
			attributes: {
				flexibility: 12
			},
			skills: {
				hide: 8,
				swim: 8,
				pitfall: 8,
				animal: 8
			},
		}, {
			attributes: {
				flexibility: 16
			},
			skills: {
				hide: 8,
				swim: 8,
				shot: 8,
				pitfall: 8,
				animal: 8
			},
		}, {
			attributes: {
				flexibility: 21
			},
			skills: {
				tough: 8,
				hide: 8,
				swim: 8,
				shot: 8,
				pitfall: 8,
				animal: 8
			},
		}]
	}, {
		name: "Dancer's set",
		items: [566, 259, 368, 10149, 11138, 433, 1772],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				charisma: 2
			},
			skills: {
				appearance: 10
			}
		}, {
			attributes: {
				charisma: 5
			},
			skills: {
				animal: 10,
				appearance: 10
			}
		}, {
			attributes: {
				charisma: 9
			},
			skills: {
				finger_dexterity: 12,
				animal: 10,
				appearance: 10
			}
		}, {
			attributes: {
				charisma: 11
			},
			skills: {
				endurance: 6,
				finger_dexterity: 12,
				animal: 10,
				appearance: 16
			}
		}, {
			attributes: {
				charisma: 15
			},
			skills: {
				endurance: 6,
				finger_dexterity: 12,
				animal: 10,
				appearance: 25
			}
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				endurance: 18,
				finger_dexterity: 12,
				animal: 10,
				appearance: 25
			}
		}]
	}, {
		name: "Gold set",
		items: [50, 858, 136],
		bonuses: [{
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {
				health: 10
			}
		}]
	}, {
		name: "Greenhorn set",
		items: [569, 262, 40000, 10148, 11118, 438, 607, 859, 52],
		bonuses: [{
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {}
		}, {
			attributes: {
				strength: 1,
				charisma: 1
			},
			skills: {}
		}]
	}, {
		name: "Natty Bumppo's set",
		items: [590, 277, 40017, 10162, 11152, 452],
		bonuses: [{
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {
				endurance: 10,
				hide: 10
			}
		}, {
			attributes: {},
			skills: {
				endurance: 10,
				health: 30,
				hide: 10
			}
		}, {
			attributes: {},
			skills: {
				endurance: 10,
				health: 30,
				hide: 10,
				leadership: 35
			}
		}, {
			attributes: {
				strength: 20
			},
			skills: {
				endurance: 10,
				health: 30,
				hide: 10,
				leadership: 35
			}
		}, {
			attributes: {
				strength: 20
			},
			skills: {
				endurance: 10,
				health: 30,
				hide: 10,
				leadership: 35
			}
		}]
	}, {
		name: "Allan Quatermain's set",
		items: [591, 278, 40018, 10163, 11153, 453],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				hide: 10,
				pitfall: 10
			}
		}, {
			attributes: {},
			skills: {
				hide: 10,
				pitfall: 10,
				finger_dexterity: 30
			}
		}, {
			attributes: {},
			skills: {
				hide: 10,
				pitfall: 10,
				finger_dexterity: 30,
				trade: 35
			}
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				hide: 10,
				pitfall: 10,
				finger_dexterity: 30,
				trade: 35
			}
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				hide: 10,
				pitfall: 10,
				finger_dexterity: 30,
				trade: 35
			}
		}]
	}, {
		name: "Chingachgook's set",
		items: [589, 276, 40016, 10161, 11151, 451],
		bonuses: [{
			attributes: {},
			skills: {}
		}, {
			attributes: {},
			skills: {
				tactic: 10,
				appearance: 10
			}
		}, {
			attributes: {},
			skills: {
				dodge: 20,
				aim: 20,
				tactic: 10,
				appearance: 10
			}
		}, {
			attributes: {},
			skills: {
				health: 25,
				dodge: 20,
				aim: 20,
				tactic: 10,
				appearance: 10
			}
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				health: 25,
				dodge: 20,
				aim: 20,
				tactic: 10,
				appearance: 10
			}
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				health: 25,
				dodge: 20,
				aim: 20,
				tactic: 10,
				appearance: 10
			}
		}]
	}, {
		name: "Freeman's set",
		items: [41004, 291, 40032, 10176, 11166, 466],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				punch: 15,
				appearance: 15
			},
		}, {
			attributes: {},
			skills: {
				punch: 30,
				tough: 5,
				reflex: 5,
				appearance: 15
			},
		}, {
			attributes: {},
			skills: {
				punch: 30,
				tough: 20,
				reflex: 20,
				appearance: 15
			},
		}, {
			attributes: {
				strength: 20
			},
			skills: {
				punch: 30,
				tough: 20,
				reflex: 20,
				appearance: 15
			},
		}, {
			attributes: {
				strength: 20
			},
			skills: {
				punch: 30,
				tough: 20,
				reflex: 20,
				appearance: 15
			}
		}]
	}, {
		name: "Freeman's horse and saddle",
		items: [638, 2189],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 3
			},
			skills: {
				punch: 10,
				appearance: 10
			}
		}]
	}, {
		name: "Doc's set",
		items: [41005, 292, 40033, 10177, 11167, 467],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				shot: 15,
				tactic: 15
			}
		}, {
			attributes: {},
			skills: {
				dodge: 5,
				aim: 5,
				shot: 30,
				tactic: 15
			}
		}, {
			attributes: {},
			skills: {
				dodge: 20,
				aim: 20,
				shot: 30,
				tactic: 15
			}
		}, {
			attributes: {
				dexterity: 20
			},
			skills: {
				dodge: 20,
				aim: 20,
				shot: 30,
				tactic: 15
			}
		}, {
			attributes: {
				dexterity: 20
			},
			skills: {
				dodge: 20,
				aim: 20,
				shot: 30,
				tactic: 15
			}
		}]
	}, {
		name: "Doc's horse and saddle",
		items: [639, 2190],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				dexterity: 3
			},
			skills: {
				shot: 10,
				tactic: 10
			}
		}]
	}, {
		name: "Cartwright's set",
		items: [41006, 293, 40034, 10178, 11168, 468],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				shot: 20
			},
		}, {
			attributes: {},
			skills: {
				build: 20,
				shot: 20,
				appearance: 20
			},
		}, {
			attributes: {},
			skills: {
				build: 20,
				shot: 20,
				tactic: 25,
				appearance: 20
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				build: 20,
				shot: 20,
				tactic: 25,
				appearance: 20
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				build: 20,
				shot: 20,
				tactic: 25,
				appearance: 20
			}
		}]
	}, {
		name: "Cartwright's horse and saddle",
		items: [640, 2191],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1,
				charisma: 3
			},
			skills: {
				repair: 10
			}
		}]
	}, {
		name: "Soap opera set",
		items: [41019, 42007, 40048, 10192, 11181, 481],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				charisma: 1
			},
			skills: {
				appearance: 5
			},
		}, {
			attributes: {
				charisma: 3
			},
			skills: {
				tactic: 10,
				appearance: 5
			},
		}, {
			attributes: {
				charisma: 8
			},
			skills: {
				pitfall: 20,
				tactic: 10,
				appearance: 5
			},
		}, {
			attributes: {
				charisma: 13
			},
			skills: {
				pitfall: 20,
				tactic: 10,
				trade: 6,
				appearance: 20
			},
		}, {
			attributes: {
				charisma: 23
			},
			skills: {
				pitfall: 20,
				tactic: 10,
				trade: 20,
				appearance: 40
			},
		}]
	}, {
		name: "Will Munny's clothing",
		items: [41028, 42016, 40057, 10201, 490, 11190],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				endurance: 10,
				hide: 10
			},
		}, {
			attributes: {},
			skills: {
				endurance: 20,
				hide: 20,
				aim: 15
			},
		}, {
			attributes: {},
			skills: {
				endurance: 20,
				hide: 20,
				aim: 15,
				leadership: 30
			},
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				endurance: 20,
				hide: 20,
				aim: 15,
				leadership: 30
			},
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				endurance: 20,
				hide: 20,
				aim: 15,
				leadership: 30
			},
		}]
	}, {
		name: "Will Munny's weapons",
		items: [87, 895, 183],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				charisma: 3
			},
			skills: {
				aim: 10,
				leadership: 10
			},
		}]
	}, {
		name: "Jeremiah Johnson's clothing",
		items: [41029, 42017, 40058, 10202, 491, 11191],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				endurance: 10,
				hide: 10
			},
		}, {
			attributes: {},
			skills: {
				endurance: 25,
				hide: 25,
				leadership: 15
			},
		}, {
			attributes: {},
			skills: {
				endurance: 25,
				dodge: 20,
				hide: 25,
				leadership: 15
			},
		}, {
			attributes: {
				flexibility: 10,
				dexterity: 10
			},
			skills: {
				endurance: 25,
				dodge: 20,
				hide: 25,
				leadership: 15
			},
		}, {
			attributes: {
				flexibility: 10,
				dexterity: 10
			},
			skills: {
				endurance: 25,
				dodge: 20,
				hide: 25,
				leadership: 15
			},
		}]
	}, {
		name: "Jeremiah Johnson's weapons",
		items: [88, 896, 184],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				flexibility: 1,
				dexterity: 1,
				charisma: 1
			},
			skills: {
				dodge: 10,
				leadership: 10
			},
		}]
	}, {
		name: "Elfego Baca's clothing",
		items: [41030, 42018, 40059, 10203, 492, 11192],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				punch: 10,
				shot: 10
			},
		}, {
			attributes: {},
			skills: {
				punch: 10,
				endurance: 10,
				shot: 10,
				trade: 10
			},
		}, {
			attributes: {},
			skills: {
				punch: 10,
				endurance: 10,
				hide: 20,
				swim: 10,
				shot: 10,
				leadership: 15,
				trade: 10
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				punch: 10,
				endurance: 10,
				hide: 20,
				swim: 10,
				shot: 10,
				leadership: 15,
				trade: 10
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				punch: 10,
				endurance: 10,
				hide: 20,
				swim: 10,
				shot: 10,
				leadership: 15,
				trade: 10
			},
		}]
	}, {
		name: "Elfego Baca's weapons",
		items: [89, 897, 185],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1,
				charisma: 1
			},
			skills: {
				shot: 5,
				leadership: 23,
				trade: 11
			},
		}]
	}, {
		name: "Clothing of Independence",
		items: [41032, 42020, 40061, 10205, 11193, 494, 2301, 661],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1,
				charisma: 1
			},
			skills: {
				tough: 2,
				endurance: 2,
				ride: 2,
				reflex: 2,
				finger_dexterity: 2,
				repair: 2,
				trade: 2,
				animal: 2
			},
		}, {
			attributes: {
				strength: 2,
				flexibility: 2,
				dexterity: 2,
				charisma: 2
			},
			skills: {
				tough: 4,
				endurance: 4,
				ride: 4,
				reflex: 4,
				finger_dexterity: 4,
				repair: 4,
				trade: 4,
				animal: 4
			},
		}, {
			attributes: {
				strength: 3,
				flexibility: 3,
				dexterity: 3,
				charisma: 3
			},
			skills: {
				tough: 6,
				endurance: 6,
				ride: 6,
				reflex: 6,
				finger_dexterity: 6,
				repair: 6,
				trade: 6,
				animal: 6
			},
		}, {
			attributes: {
				strength: 4,
				flexibility: 4,
				dexterity: 4,
				charisma: 4
			},
			skills: {
				tough: 8,
				endurance: 8,
				ride: 8,
				reflex: 8,
				finger_dexterity: 8,
				repair: 8,
				trade: 8,
				animal: 8
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				tough: 10,
				endurance: 10,
				ride: 10,
				reflex: 10,
				finger_dexterity: 10,
				repair: 10,
				trade: 10,
				animal: 10
			},
		}, {
			attributes: {
				strength: 6,
				flexibility: 6,
				dexterity: 6,
				charisma: 6
			},
			skills: {
				tough: 12,
				endurance: 12,
				ride: 12,
				reflex: 12,
				finger_dexterity: 12,
				repair: 12,
				trade: 12,
				animal: 12
			},
		}, {
			attributes: {
				strength: 8,
				flexibility: 8,
				dexterity: 8,
				charisma: 8
			},
			skills: {
				tough: 16,
				endurance: 16,
				ride: 16,
				reflex: 16,
				finger_dexterity: 16,
				repair: 16,
				trade: 16,
				animal: 16
			},
		}]
	}, {
		name: "Frank Eaton's Set",
		items: [40063, 10206, 41033, 42021, 11195, 495],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				tactic: 10,
				appearance: 10
			},
		}, {
			attributes: {},
			skills: {
				dodge: 15,
				tactic: 20,
				appearance: 20
			},
		}, {
			attributes: {},
			skills: {
				dodge: 15,
				aim: 30,
				appearance: 20,
				tactic: 20
			},
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				dodge: 15,
				aim: 30,
				tactic: 20,
				appearance: 20
			},
		}, {
			attributes: {
				charisma: 20
			},
			skills: {
				dodge: 15,
				aim: 30,
				tactic: 20,
				appearance: 20
			},
		}]
	}, {
		name: "George McJunkin's Set",
		items: [40064, 10207, 41034, 42022, 11196, 496],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				health: 10,
				hide: 10
			},
		}, {
			attributes: {},
			skills: {
				endurance: 15,
				health: 20,
				hide: 25
			},
		}, {
			attributes: {},
			skills: {
				endurance: 25,
				health: 20,
				hide: 25
			},
		}, {
			attributes: {
				strength: 10,
				flexibility: 10
			},
			skills: {
				endurance: 25,
				health: 20,
				hide: 25
			},
		}, {
			attributes: {
				strength: 10,
				flexibility: 10
			},
			skills: {
				endurance: 25,
				health: 20,
				hide: 25
			},
		}]
	}, {
		name: "King Fisher's Set",
		items: [40065, 10208, 41035, 42023, 11197, 497],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {},
			skills: {
				build: 10,
				ride: 10
			},
		}, {
			attributes: {},
			skills: {
				build: 10,
				ride: 10,
				shot: 10,
				leadership: 10
			},
		}, {
			attributes: {},
			skills: {
				build: 10,
				punch: 15,
				ride: 10,
				shot: 10,
				repair: 20,
				leadership: 10,
				trade: 10
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				build: 10,
				punch: 15,
				ride: 10,
				shot: 10,
				repair: 20,
				leadership: 10,
				trade: 10
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				build: 10,
				punch: 15,
				ride: 10,
				shot: 10,
				repair: 20,
				leadership: 10,
				trade: 10
			},
		}]
	}, {
		name: "Traditional Bavarian Outfit",
		items: [41036, 42024, 40066, 10209, 11198, 498, 2363, 663],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1,
				charisma: 1
			},
			skills: {
				build: 2,
				tough: 2,
				endurance: 2,
				health: 2,
				reflex: 2,
				hide: 2,
				leadership: 2,
				trade: 2
			},
		}, {
			attributes: {
				strength: 2,
				flexibility: 2,
				dexterity: 2,
				charisma: 2
			},
			skills: {
				build: 4,
				tough: 4,
				endurance: 4,
				health: 4,
				reflex: 4,
				hide: 4,
				leadership: 4,
				trade: 4
			},
		}, {
			attributes: {
				strength: 3,
				flexibility: 3,
				dexterity: 3,
				charisma: 3
			},
			skills: {
				build: 6,
				tough: 6,
				endurance: 6,
				health: 6,
				reflex: 6,
				hide: 6,
				leadership: 6,
				trade: 6
			},
		}, {
			attributes: {
				strength: 4,
				flexibility: 4,
				dexterity: 4,
				charisma: 4
			},
			skills: {
				build: 8,
				tough: 8,
				endurance: 8,
				health: 8,
				reflex: 8,
				hide: 8,
				leadership: 8,
				trade: 8
			},
		}, {
			attributes: {
				strength: 5,
				flexibility: 5,
				dexterity: 5,
				charisma: 5
			},
			skills: {
				build: 10,
				tough: 10,
				endurance: 10,
				health: 10,
				reflex: 10,
				hide: 10,
				leadership: 10,
				trade: 10
			},
		}, {
			attributes: {
				strength: 6,
				flexibility: 6,
				dexterity: 6,
				charisma: 6
			},
			skills: {
				build: 12,
				tough: 12,
				endurance: 12,
				health: 12,
				reflex: 12,
				hide: 12,
				leadership: 12,
				trade: 12
			},
		}, {
			attributes: {
				strength: 7,
				flexibility: 7,
				dexterity: 7,
				charisma: 7
			},
			skills: {
				build: 14,
				tough: 14,
				endurance: 14,
				health: 14,
				reflex: 14,
				hide: 14,
				leadership: 14,
				trade: 104
			},
		}]
	}, {
		name: "Frank Eaton's Weapons",
		items: [899, 91, 187],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				charisma: 3
			},
			skills: {
				dodge: 10,
				aim: 10
			},
		}]
	}, {
		name: "George McJunkin's Weapons",
		items: [900, 92, 188],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1
			},
			skills: {
				health: 10,
				dodge: 10
			},
		}]
	}, {
		name: "King Fisher's Weapons",
		items: [901, 93, 189],
		bonuses: [{
			attributes: {},
			skills: {},
		}, {
			attributes: {
				strength: 1,
				flexibility: 1,
				dexterity: 1,
				charisma: 1
			},
			skills: {
				punch: 23,
				leadership: 5,
				trade: 11
			},
		}]
	}, ];

	var TW_SkillsCalc = new Object();

	TW_SkillsCalc.langs = {
		ru_RU: {
			s1: "Skills Calc",
			s2: "Навыки",
			s3: "Предметы",
			s4: "Добавить предмет",
			s5: "Введите id предмета:",
			s6: "Добавить",
			s7: "Сбросить",
			s8: "Показывать мои навыки",
			s9: "Показывать бонусы"
		},

		en_US: {
			s1: "Skills Calc",
			s2: "Skills",
			s3: "Items",
			s4: "Add item",
			s5: "Enter item id:",
			s6: "Add",
			s7: "Reset",
			s8: "Show my skills",
			s9: "Show bonuses"
		}
	}

	TW_SkillsCalc.lang = undefined;
	//TW_SkillsCalc.items = [];
	//TW_SkillsCalc.skills = undefined;
	TW_SkillsCalc.keys = [];

	TW_SkillsCalc.gui = {
		window: {},
		windowData: {},
		menuButton: null/*,
		images: [],
		checkBoxSkills: null,
		checkBoxBonuses: null*/
	}

	TW_SkillsCalc.init = function() {
		TW_SkillsCalc.lang = function() {
			for (var lang in TW_SkillsCalc.langs) {
				if (Game.locale.toLowerCase() == lang.toLowerCase())
					return TW_SkillsCalc.langs[lang];
			}
			return TW_SkillsCalc.langs.en_US;
		}
		();

		$(document).keydown(function(e) {
			TW_SkillsCalc.keys[e.which] = true;
		}).keyup(function(e) {
			TW_SkillsCalc.keys[e.which] = false;
		});

		TW_SkillsCalc.gui.menuButton = new TW_Widgets.MenuButton(
			"data:image/png;base64,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",
			TW_SkillsCalc.lang.s1,
			TW_SkillsCalc.showMainWindow);
	}

	TW_SkillsCalc.showMainWindow = function() {
		var wnd;
		var wndData;
		var wndId;

		do {
			wndId = Math.floor(Math.random() * 1000 + 1);
		} while (TW_SkillsCalc.gui.window[wndId]);

		wnd = wman.open("tw-skillscalc-window-" + [wndId], null, "noreload")
			.setTitle(TW_SkillsCalc.lang.s1)
			.setMiniTitle(TW_SkillsCalc.lang.s1)
			.addEventListener("WINDOW_DESTROY", function() {
				return function(id) {
					delete TW_SkillsCalc.gui.window[id];
					delete TW_SkillsCalc.gui.windowData[id];
				}(wndId);
			});

		wndData = {};
		wndData.items = [];
		wndData.skills = new TW_Skills();
		wndData.images = [];
		wndData.price = 0;

		wndData.groupSkills = new TW_Widgets.Group(TW_SkillsCalc.lang.s2, wnd.getContentPane());
		wndData.groupItems = new TW_Widgets.Group(TW_SkillsCalc.lang.s3, wnd.getContentPane());

		wndData.groupSkills.setWidth(402);
		wndData.groupItems.setWidth(294).setLeft(400);

		//$(TW_SkillsCalc.gui.window[wndId].groupSkills.obj.getMainDiv()).css("width", "402px");
		//$(TW_SkillsCalc.gui.window[wndId].groupSkills.scrollPane.getMainDiv()).css("margin-top", "15px");

		//$(TW_SkillsCalc.gui.window[wndId].groupItems.obj.getMainDiv()).css("width", "294px").css("left", "400px");

		var attrs = wndData.skills.attributes;
		for (var a in attrs) {
			if (attrs.hasOwnProperty(a)) {
				var div = $("<div style='height: 52px;' />");
				for (var s in attrs[a]) {
					if (attrs[a].hasOwnProperty(s)) {
						var skill = new Skill(s);
						var img = skill.getSkillImage();

						img.removeAttr("class").css({
							"display": "inline-block",
							"text-align": "center",
							"font-weight": "bold",
							"width": "70px",
							"height": "41px",
							"margin-left": "2px"
						});

						$("img.skillicon", img).removeAttr("class").css({
							"width": "70px",
							"height": "41px"
						});

						$("span.skillpoints_label", img).attr("class", "skillscalc-skillpoints_label").css({
							"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMZJREFUeNqMUm0OwyAIBecJdvDuTLvKsr9bOmtXTT8ciCTGtUlJTREejwcRAeBGB+mk5g91DLuue8IJs5fX/VoxKMs/0PnwaJK7RTbExSUyJDsCct76b3zvdKrqCuMwxr4OpEQTIpiqQoCfITgN5E8yLSEBfSCNcjEENAZNQbGPpQtYP8ZpS6K4FcpAFWv7IUxHS9b+3ImHiXIRjcqSSgcejl3a4zwrPQM5obtTMeu2JbusolCrKZYRa3YET25eTzzzKH4CDACumn805EpYLAAAAABJRU5ErkJggg==)",
							"position": "relative",
							"display": "inline-block",
							"top": "-16px",
							"width": "70px",
							"height": "12px",
							"text-align": "center",
							"font-size": "9pt",
							"color": "rgb(255, 255, 255)",
							"text-shadow": "1px 1px 1px rgb(0, 0, 0)"
						});

						div.append(img);
						wndData.images[s] = img;
					}
				}
				wndData.groupSkills.scrollPane.appendContent(div);
				wndData.groupSkills.scrollPane.appendContent($("<hr />").css("margin-bottom", "15px"));
			}
		}

		var addItem = function() {
			return function(wid) {
				var dlg = new west.gui.Dialog(TW_SkillsCalc.lang.s4);
				var content = $("<div style='margin-top: 10px; text-align: center;'><div id='skillscalc-preview-item' style='height: 60px; width: 60px; float: right; border: 1px solid black; border-radius: 4px;' /></div>");
				var edtItemId = new west.gui.Textfield().setSize(25).maxlength(8).setLabel($("<span>" + TW_SkillsCalc.lang.s5 + "</span>"));
				var invItem = null;
				var item = null;

				var add = function() {
					if (invItem) {
						/*for (var i = 0; i < TW_SkillsCalc.gui.windowData[wid].items.length; i++)
							if (TW_SkillsCalc.gui.windowData[wid].items[i] == item.item_id)
								return false;*/

						/*TW_SkillsCalc.gui.windowData[wid].price += Math.floor(item.price / 2);
						wndData.checkBoxSkills.setLabel(TW_SkillsCalc.gui.windowData[wid].price);*/

						TW_SkillsCalc.gui.windowData[wid].groupItems.scrollPane.appendContent($(invItem.getMainDiv()).css("display", "inline-block"));

						if (TW_SkillsCalc.gui.windowData[wid].checkBoxBonuses.isSelected())
							TW_SkillsCalc.UpdateBonuses(false, wid);

						TW_SkillsCalc.gui.windowData[wid].items.push(item.item_id);
						TW_SkillsCalc.gui.windowData[wid].skills.sum(item);

						if (TW_SkillsCalc.gui.windowData[wid].checkBoxBonuses.isSelected())
							TW_SkillsCalc.UpdateBonuses(true, wid);

						TW_SkillsCalc.UpdateSkills(wid);
						return true;
					}
					return false;
				}

				edtItemId.getField().keydown(function(e) {
					if (e.which == 13 && add())
						dlg.hide();
				}).keyup(function(e) {
					if (invItem) {
						$(invItem.getMainDiv()).remove();
						invItem = null;
					}

					var id = parseInt(edtItemId.getValue());
					if (!isNaN(id)) {
						item = ItemManager.get(id);
						if (item) {
							invItem = new tw2widget.InventoryItem(item);
							$(invItem.getMainDiv()).css("float", "none").click(function(it) {
									return function() {
										if (!TW_SkillsCalc.keys[16]) {
											if (TW_SkillsCalc.gui.windowData[wid].checkBoxBonuses.isSelected())
												TW_SkillsCalc.UpdateBonuses(false, wid);

											for (var i = 0; i < TW_SkillsCalc.gui.windowData[wid].items.length; i++)
												if (TW_SkillsCalc.gui.windowData[wid].items[i] == it.item_id) {
													TW_SkillsCalc.gui.windowData[wid].items.splice(i, 1);
													break;
												}

											TW_SkillsCalc.gui.windowData[wid].skills.sub(it);
											if (TW_SkillsCalc.gui.windowData[wid].checkBoxBonuses.isSelected())
												TW_SkillsCalc.UpdateBonuses(true, wid);

											TW_SkillsCalc.UpdateSkills(wid);
											$(this).remove();
										}
									}
								}
								(item));

							$("div#skillscalc-preview-item", content).append(invItem.getMainDiv());
						}
					}
				});
				content.append(edtItemId.getMainDiv());

				dlg.setText(content).addButton("ok", add).addButton("cancel").show();
				edtItemId.getField().focus();
			}(wndId);
		};

		var resetItems = function() {
			return function(wid) {
				TW_SkillsCalc.gui.windowData[wid].groupItems.scrollPane.getContentPane().empty();
				TW_SkillsCalc.gui.windowData[wid].checkBoxSkills.setSelected(false, true);
				TW_SkillsCalc.gui.windowData[wid].checkBoxBonuses.setSelected(false, true);
				TW_SkillsCalc.gui.windowData[wid].items = [];
				TW_SkillsCalc.gui.windowData[wid].skills = new TW_Skills();
				TW_SkillsCalc.gui.windowData[wid].price = 0;
				TW_SkillsCalc.UpdateSkills(wid);
			}(wndId);
		};

		var showCharacterSkills = function(state) {
			return function(state, wid) {
				var item = {
					bonus: {
						attributes: {},
						skills: {}
					}
				};

				for (var k in CharacterSkills.skills) {
					if (CharacterSkills.skills.hasOwnProperty(k))
						item.bonus.skills[k] = CharacterSkills.getSkill(k).getPoints();
				}

				TW_SkillsCalc.gui.windowData[wid].skills[state ? "sum" : "sub"](item);
				TW_SkillsCalc.UpdateSkills(wid);
			}(state, wndId);
		}

		var showWearSetBonuses = function(state) {
			return function(state, wid) {
				TW_SkillsCalc.UpdateBonuses(state, wid);
				TW_SkillsCalc.UpdateSkills(wid);
			}(state, wndId);
		}

		wndData.checkBoxSkills = new west.gui.Checkbox(TW_SkillsCalc.lang.s8, "", showCharacterSkills);
		$(wndData.checkBoxSkills.getMainDiv()).css("left", "2px").css("top", "342px").css("position", "absolute");
		wndData.checkBoxSkills.appendTo(wnd.getContentPane());

		wndData.checkBoxBonuses = new west.gui.Checkbox(TW_SkillsCalc.lang.s9, "", showWearSetBonuses);
		$(wndData.checkBoxBonuses.getMainDiv()).css("left", "192px").css("top", "342px").css("position", "absolute");
		wndData.checkBoxBonuses.appendTo(wnd.getContentPane());

		var button = new TW_Widgets.Button(TW_SkillsCalc.lang.s6, addItem, wnd.getContentPane());
		$(button.obj.getMainDiv()).css("left", "592px").css("top", "342px");

		button = new TW_Widgets.Button(TW_SkillsCalc.lang.s7, resetItems, wnd.getContentPane());
		$(button.obj.getMainDiv()).css("left", "490px").css("top", "342px");

		TW_SkillsCalc.gui.window[wndId] = wnd;
		TW_SkillsCalc.gui.windowData[wndId] = wndData;
	}

	TW_SkillsCalc.UpdateBonuses = function(state, wid) {
		var sets = {}, // indexes of sets
			itemId,
			set,
			items;

		items = TW_SkillsCalc.gui.windowData[wid].items;

		for (var i = 0; i < items.length; i++) {
			itemId = items[i];

			for (var j = 0; j < TW_WearSets.length; j++) {
				set = TW_WearSets[j];
				for (var c = 0; c < set.items.length; c++) {
					if (itemId == set.items[c]) {
						if (sets[j] === undefined)
							sets[j] = 1;
						else
							sets[j]++;
						break;
					}
				}
			}
		}

		for (var k in sets) {
			if (sets.hasOwnProperty(k)) {
				var bonuses = TW_WearSets[k].bonuses;
				if (bonuses === undefined)
					continue;

				bonuses = bonuses[sets[k] - 1];
				var item = {
					bonus: {
						attributes: bonuses.attributes,
						skills: bonuses.skills
					}
				};

				TW_SkillsCalc.gui.windowData[wid].skills[state ? "sum" : "sub"](item);
			}
		}
	}

	TW_SkillsCalc.UpdateSkills = function(wid) {
		var attrs = TW_SkillsCalc.gui.windowData[wid].skills.attributes;
		for (var a in attrs) {
			if (attrs.hasOwnProperty(a)) {
				for (var s in attrs[a]) {
					if (attrs[a].hasOwnProperty(s)) {
						var img = TW_SkillsCalc.gui.windowData[wid].images[s];
						$("span.skillscalc-skillpoints_label", img).text(attrs[a][s]);
					}
				}
			}
		}
	}

	$(document).ready(TW_SkillsCalc.init);
}));