// ==UserScript==
// @name           Browser Ponies
// @namespace      ShadowBlaze
// @description    Adds Javascript to create browser ponies on all pages.
// @include        *
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==




// All settings are stored under about:config, search for "greasemonkey.scriptvals.ShadowBlaze"

if (top == self) { // Don't execute in frames

var ponies = {
	"aloe":"aloe", // Pink coat, blue mane
	"applebloom":"apple bloom",
	"applejack":"applejack",
	"berry_punch":"berry punch (oppp)",
	"bonbon":"bon-bon",
	"candy_mane":"candy mane",
	"cheerilee":"cheerilee",
	"colgate":"colgate",
	"derpy_hooves":"derpy hooves",
	"fluttershy":"fluttershy",
	"lightning_bolt":"lightning bolt",
	"lotus":"lotus", // Blue coat, pink mane
	"lyra":"lyra",
	"nightmare_moon":"nightmare moon",
	"octavia":"octavia",
	"princess_celestia":"princess celestia",
	"princess_luna_s1":"princess luna",
	"princess_luna_s2":"princess luna (season 2)",
	"rainbow_dash":"rainbow dash",
	"raindrops":"raindrops",
	"rarity":"rarity",
	"roseluck":"roseluck",
	"spitfire":"spitfire",
	"spitfire_suitless":"suitless spitfire",
	"vinyl_scratch":"vinyl scratch",
	"trixie_capeless":"capeless trixie",
	"trixie":"trixie",
	"twilight":"twilight sparkle"
};


// If it's less than zero or doesn't exist, set to zero.
// Need this because later on, these values are pulled and used directly in the config, to tell the Browser Ponies script how many of each pony to create.
for (name in ponies) {
	if (GM_getValue("browserPonies."+name, -1) < 0) {
		try {
			GM_setValue("browserPonies."+name, 0);
		}
		catch(e) {
			alert("Unable to set value for " + name + " to zero:\n\n" + e);
		}
	}
}

GM_deleteValue("browserPonies.0");  // It just sort of appears, so I added these lines.
GM_deleteValue("browserPonies.1");  // Still trying to figure out why it shows up.

function setSpawn() {
	var tmp = {};
	for (name in ponies) {
		var id = ponies[name];
		tmp[id] = GM_getValue("browserPonies." + name, 0);
	}
	return tmp;
}
var spawn = setSpawn();



// Have to use unsafeWindow here to make it work. As a side effect, it overwrites any existing Browser Ponies.
(function (srcs, cfg) {
	var cbcount = 1;
	var callback = function () {
		--cbcount;
		if (cbcount === 0) {
			unsafeWindow.BrowserPonies.setBaseUrl(cfg.baseurl);
			if (!unsafeWindow.BrowserPoniesBaseConfig.loaded) {
				unsafeWindow.BrowserPonies.loadConfig(unsafeWindow.BrowserPoniesBaseConfig);
				unsafeWindow.BrowserPoniesBaseConfig.loaded = true;
			}
			unsafeWindow.BrowserPonies.loadConfig(cfg);
			if (!unsafeWindow.BrowserPonies.running()) {
				unsafeWindow.BrowserPonies.start();
			}
		}
	};
	if (typeof(unsafeWindow.BrowserPoniesConfig) === "undefined") {
		unsafeWindow.BrowserPoniesConfig = {};
	}
	if (typeof(unsafeWindow.BrowserPoniesBaseConfig) === "undefined") {
		++cbcount;
		unsafeWindow.BrowserPoniesConfig.onbasecfg = callback;
	}
	if (typeof(unsafeWindow.BrowserPonies) === "undefined") {
		++cbcount;
		unsafeWindow.BrowserPoniesConfig.oninit = callback;
	}
	var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]);
	for (var id in srcs) {
		if (document.getElementById(id)) {
			continue;
		}
		if (node) {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.id = id;
			s.src = srcs[id];
			node.appendChild(s);
		}
		else {
			document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e');
		}
	}
	callback();
})(
	{"browser-ponies-script":"http://web.student.tuwien.ac.at/~e0427417/browser-ponies/browserponies.js","browser-ponies-config":"http://web.student.tuwien.ac.at/~e0427417/browser-ponies/basecfg.js"},
	{"baseurl":"http://web.student.tuwien.ac.at/~e0427417/browser-ponies/","fadeDuration":500,"fps":25,"speed":3,"audioEnabled":false,"showLoadProgress":true,"speakProbability":0,"spawn":setSpawn()}
);




var start = function () {
	unsafeWindow.BrowserPonies.start();
};
var stop = function () {
	unsafeWindow.BrowserPonies.stop();
};
var pause = function () {
	unsafeWindow.BrowserPonies.pause();
};
var resume = function () {
	unsafeWindow.BrowserPonies.resume();
};
var settings = function () {
	GM_config.open();
};
var onsave = function () {
	var data = GM_config.read();
	for (name in ponies) {
		try {
			GM_setValue("browserPonies."+name, data[name]);
		}
		catch(e) {
			alert("Unable to save data for " + name + ":\n\n" + e);
		}
	}
	if (data.reload) {
		window.location.reload();
	}
	else {
		alert("Reload page manually to see changes.");
		GM_config.close();
	}
};


// The GM menu has a User Script Commands section. That's where these go.
GM_registerMenuCommand("Start Browser Ponies", start);
GM_registerMenuCommand("Stop Browser Ponies", stop);
GM_registerMenuCommand("Pause Browser Ponies", pause);
GM_registerMenuCommand("Resume Browser Ponies", resume);
GM_registerMenuCommand("Browser Ponies settings...", settings);

// For the simple GUI. Set a number for each pony, and the default is the curent settings. May extend this in the future, might make a custom interface.
var init = {
	aloe: {
		label: "Aloe",
		type: "int",
		default: GM_getValue("browserPonies.aloe")
	},
	applebloom: {
		label: "Applebloom",
		type: "int",
		default: GM_getValue("browserPonies.applebloom")
	},
	applejack: {
		label: "Applejack",
		type: "int",
		default: GM_getValue("browserPonies.applejack")
	},
	berry_punch: {
		label: "Berry Punch",
		type: "int",
		default: GM_getValue("browserPonies.berry_punch")
	},
	bonbon: {
		label: "Bonbon",
		type: "int",
		default: GM_getValue("browserPonies.bonbon")
	},
	candy_mane: {
		label: "Candy Mane",
		type: "int",
		default: GM_getValue("browserPonies.candy_mane")
	},
	cheerilee: {
		label: "Cheerilee",
		type: "int",
		default: GM_getValue("browserPonies.cheerilee")
	},
	colgate: {
		label: "Colgate",
		type: "int",
		default: GM_getValue("browserPonies.colgate")
	},
	derpy_hooves: {
		label: "Derpy Hooves",
		type: "int",
		default: GM_getValue("browserPonies.derpy_hooves")
	},
	fluttershy: {
		label: "Fluttershy",
		type: "int",
		default: GM_getValue("browserPonies.fluttershy")
	},
	lightning_bolt: {
		label: "Lightning Bolt",
		type: "int",
		default: GM_getValue("browserPonies.lightning_bolt")
	},
	lotus: {
		label: "Lotus",
		type: "int",
		default: GM_getValue("browserPonies.lotus")
	},
	lyra: {
		label: "Lyra",
		type: "int",
		default: GM_getValue("browserPonies.lyra")
	},
	nightmare_moon: {
		label: "Nightmare Moon",
		type: "int",
		default: GM_getValue("browserPonies.nightmare_moon")
	},
	octavia: {
		label: "Octavia",
		type: "int",
		default: GM_getValue("browserPonies.octavia")
	},
	princess_celestia: {
		label: "Princess Celestia",
		type: "int",
		default: GM_getValue("browserPonies.princess_celestia")
	},
	princess_luna_s1: {
		label: "Princess Luna (season 1)",
		type: "int",
		default: GM_getValue("browserPonies.princess_luna_s1")
	},
	princess_luna_s2: {
		label: "Princes Luna (season 2)",
		type: "int",
		default: GM_getValue("browserPonies.princess_luna_s2")
	},
	rainbow_dash: {
		label: "Rainbow Dash",
		type: "int",
		default: GM_getValue("browserPonies.rainbow_dash")
	},
	raindrops: {
		label: "Raindrops",
		type: "int",
		default: GM_getValue("browserPonies.raindrops")
	},
	rarity: {
		label: "Rarity",
		type: "int",
		default: GM_getValue("browserPonies.rarity")
	},
	roseluck: {
		label: "Roseluck",
		type: "int",
		default: GM_getValue("browserPonies.roseluck")
	},
	spitfire: {
		label: "Spitfire",
		type: "int",
		default: GM_getValue("browserPonies.spitfire")
	},
	spitfire_suitless: {
		label: "Spitfire (suitless)",
		type: "int",
		default: GM_getValue("browserPonies.spitfire_suitless")
	},
	vinyl_scratch: {
		label: "Vinyl Scratch",
		type: "int",
		default: GM_getValue("browserPonies.vinyl_scratch")
	},
	trixie: {
		label: "Trixie",
		type: "int",
		default: GM_getValue("browserPonies.trixie")
	},
	trixie_capeless: {
		label: "Trixie (capeless)",
		type: "int",
		default: GM_getValue("browserPonies.trixie_capeless")
	},
	twilight: {
		label: "Twilight Sparkle",
		type: "int",
		default: GM_getValue("browserPonies.twilight")
	},
	reload: {
		label: "Reload page",
		type: "checkbox",
		default: false
	}
};

GM_config.init("Select ponies", init, {save: onsave});

} // end of "if (top == self)", added to prevent execution in frames