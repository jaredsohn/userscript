// ==UserScript==
// @name           Film1 IMDb-rating
// @version        2.2.1
// @author         ErikMorres
// @description    Add ratings to the Film1 site using third party IMDb API.
// @match          *://*.film1.nl/film_kijken/*
// @uso:script     129991
// @namespace      http://userscripts.org/scripts/show/129991
// @require        http://userscripts.org/scripts/source/49700.user.js
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @history        2.2.1 Fixed issues with iMDbAPI/OMDbAPI. Default back to iMDbAPI/OMDbAPI.
// @history        2.2.0 Removed some 'required' scripts that where no longer functioning and crashing the script. Added @grant tags. Default back to iMDb.com, due to issues with iMDbAPI/OMDbAPI.
// @history        2.1.2 Set default configuration to IMDb API, since IMDb reports various results.
// @history        2.1.1 Some improvements in IMDb searching.
// @history        2.1.0 Made some small improvements.
// @history        2.0.0 Rewritten the script and added a configuration screen.
// @history        1.0.0 Initial version, uses very basic means to add IMDb-ratings to the Film1-page.
// ==/UserScript==

if(!GM_config) {return;}

GM_config.init("IMDb-rating Highlighting", {
	"idxCaptionSize": {
		"section": ["IMDb-rating Caption"],
		"label":"Caption size",
		"title": "Provide a size for the IMDb-rating caption.",
		"type":"select",
		"options": ["default", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
		"default": 0
	},
	"bColourEnabled": {
		"label": "Enable highlighting",
		"title": "Toggle highlighting of IMDb-ratings.",
		"type": "checkbox",
		"default": true
	},
	"flLow": {
		"section": ["Low-rating Highlight"],
		"label":"Low-rating",
		"title": "Provide the maximum rating a movie can have to qualify for a \"Low-rating\".",
		"type":"float",
		"default": 5.0
	},
	"idxLowFore": {
		"label":"Text-colour",
		"title": "Provide a colour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 119 
	},
	"idxLowBack": {
		"label":"Background-colour",
		"title": "Provide a backgroundcolour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 143
	},
	"flMedium": {
		"section": ["Medium-rating Highlight"],
		"label":"Medium-rating",
		"title": "Provide the maximum rating a movie can have to qualify for a \"Medium-rating\".",
		"type":"float",
		"default": 6.5
	},
	"idxMediumFore": {
		"label":"Text-colour",
		"title": "Provide a colour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 105
	},
	"idxMediumBack": {
		"label":"Background-colour",
		"title": "Provide a backgroundcolour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 143 
	},
	"flHigh": {
		"section": ["High-rating Highlight"],
		"label":"High-rating",
		"title": "Provide the maximum rating a movie can have to qualify for a \"High-rating\". This value is only used when \"Must See!\" highlighting has been enabled.",
		"type":"float",
		"default": 8.0
	},
	"idxHighFore": {
		"label":"Text-colour",
		"title": "Provide a colour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 55 
	},
	"idxHighBack": {
		"label":"Background-colour",
		"title": "Provide a backgroundcolour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 143 
	},
	"bMustSee": {
		"section": ["Must See!-rating Highlight"],
		"title": "Toggle \"Must See!\" highlighting.",
		"label": "Must See!",
		"type": "checkbox",
		"default": true
	},
	"idxMustSeeFore": {
		"label":"Text-colour",
		"title": "Provide a colour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 143 
	},
	"idxMustSeeBack": {
		"label":"Background-colour",
		"title": "Provide a backgroundcolour for highlighting text.",
		"type":"select",
		"options": ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
		"default": 55
	},
	"rbOMDbAPI": {
		"section": ["Advanced options"],
		"label": "IMDb-rating source",
		"title": "Select the source that should be used for fetching IMDb-rating data.",
		"type": "radio",
		"options": ["IMDb.com", "OMDbAPI.com"],
		"default": "OMDbAPI.com"
	}
},
	GM_config.eCSS,
	{
		save: function() { location.reload(); }
	}
);

// ========================================================================= //
//  Class classIMDb
// ------------------------------------------------------------------------- //
function classIMDb(strMovieTitle, intMovieYear, onLoadCallback, bOMDbAPI) {
	this.movieID			= -1;
	this.movieRating	= -1;
	this.movieVotes		= -1;

	this.movieLoaded	= false;
	this.movieResult	= false;

	// ----------------------------------------------------------------------- //
	//  Class initialization
	
	if (strMovieTitle.length > 0) {
		var that = this;

		if (bOMDbAPI) {
		  if (intMovieYear > 1900) {
		  	var searchURLOMDbAPI = "http://www.omdbapi.com/?t=" + strMovieTitle + "&y=" + intMovieYear;
		  } else {
		  	var searchURLOMDbAPI = "http://www.omdbapi.com/?t=" + strMovieTitle;
		  }
		  GM_xmlhttpRequest({
		      method: "GET",
		      url:  searchURLOMDbAPI,
                      timeout: 0,
		      onload: function (XHR) {
		          that.movieResult = that.parseOMDbAPIResponse(XHR.responseText);
		      		that.movieLoaded = true;
		      		
		      		onLoadCallback();
		      }
		  });
		} else {		
		  if (intMovieYear) {
		  	var searchURLIMDb = "http://www.imdb.com/search/title?sort=num_votes,desc&title_type=feature,tv_movie,tv_series,mini_series&view=simple&title=" + strMovieTitle + "&release_date=" + intMovieYear + ",";
		  } else {
		  	var searchURLIMDb = "http://www.imdb.com/search/title?sort=num_votes,desc&title_type=feature,tv_movie,tv_series,mini_series&view=simple&title=" + strMovieTitle;
		  }

		  GM_xmlhttpRequest({
		      method: "GET",
		      url:  searchURLIMDb,
                      timeout: 0,
		      onload: function (XHR) {
		          that.movieResult = that.parseIMDbResponse(XHR.responseText);
		      		that.movieLoaded = true;
		      		
		      		onLoadCallback();
		      }
		  });
		}
	}
	// End initialization
	// ----------------------------------------------------------------------- //
}

// ------------------------------------------------------------------------- //
// Prototype parseOMDbAPIResponse
classIMDb.prototype.parseOMDbAPIResponse = function(OMDbAPIResponse) {
	var gotResult			= false;
	var resultOMDbAPI	= JSON.parse(OMDbAPIResponse);

	this.movieID 			= -1;
	this.movieRating		= -1;
	this.movieVotes			= -1;
	
	if (resultOMDbAPI.Response == "True") {
		if (resultOMDbAPI.imdbID 		!== null)																																										{ this.movieID 			= resultOMDbAPI.imdbID; gotResult = true; }
		if ((resultOMDbAPI.imdbRating !== null) && (!isNaN(parseFloat(resultOMDbAPI.imdbRating)) && isFinite(resultOMDbAPI.imdbRating))) 	{ this.movieRating 	= resultOMDbAPI.imdbRating; this.movieVotes 	= resultOMDbAPI.imdbVotes; }
	}
			
	return gotResult;
};

// ------------------------------------------------------------------------- //
// Prototype parseIMDbResponse
classIMDb.prototype.parseIMDbResponse = function(imdbResponse) {
	var gotResult						= false;
	
	var reIMDbMoviesResult 	= /<table class="results">((?:.|\n|\r)*)<\/table>/mi;
	var reIMDbMovieResult		= /<tr class="even">\s*?<td class="number">1\.<\/td>((?:.|\s)*)<\/tr>/im;
	
	var reIMDbMovieID				= /\/title\/(tt\d+)\//i;
	var reIMDbMovieRating		= /<td>\s*?<b>([0-9]*\.?[0-9]+)<\/b>/im;
	var reIMDbMovieVotes		= /<td>\s*?((?:[0-9]|,)+)\s*?<\/td>/im;
	
	if (imdbResponse.match(/\d+\s*?titles\./im)) {
  	var resultIMDbMatch = reIMDbMoviesResult.exec(imdbResponse);
		if (resultIMDbMatch !== null) {
			var resultIMDbMatch = reIMDbMovieResult.exec(resultIMDbMatch[1]);
	
			if (resultIMDbMatch !== null) {
				resultIMDbMovieID			=	reIMDbMovieID.exec(resultIMDbMatch[1]);
				resultIMDbMovieRating	=	reIMDbMovieRating.exec(resultIMDbMatch[1]);
				resultIMDbMovieVotes	=	reIMDbMovieVotes.exec(resultIMDbMatch[1]);

				if (resultIMDbMovieVotes 	!== null) { resultIMDbMovieVotes[1] = resultIMDbMovieVotes[1].replace(",", ""); }
					
				if (resultIMDbMovieID 		!== null) 																																													{ this.movieID 			= resultIMDbMovieID[1]; gotResult = true; }
				if ((resultIMDbMovieRating !== null) && (!isNaN(parseFloat(resultIMDbMovieRating[1])) && isFinite(resultIMDbMovieRating[1]))) { this.movieRating 	= resultIMDbMovieRating[1]; }
				if ((resultIMDbMovieVotes 	!== null) && (!isNaN(parseFloat(resultIMDbMovieVotes[1])) && isFinite(resultIMDbMovieVotes[1]))) 	{ this.movieVotes 	= resultIMDbMovieVotes[1]; }
			} 
		} 
	}
	
	return gotResult;
};
// End classIMDb
// ========================================================================= //

// ========================================================================= //
//  Class classMovie
// ------------------------------------------------------------------------- //
function classMovie(strMovieTitle, intMovieYear, elMovieElement) {
	this.movieElement = elMovieElement;
	this.movieDetails	= null;
	
	if (strMovieTitle.length > 0) {
		this.movieTitle = strMovieTitle;
	} else {
		this.movieTitle = "";
	}
	
	if (!isNaN(parseFloat(intMovieYear)) && isFinite(intMovieYear)){
		this.movieYear = intMovieYear;
	} else {
		this.movieYear = -1;
	}

	this.populateMovieDetails = function(onLoadCallback, bOMDbAPI) {
		var that = this;
		
		this.movieDetails = new classIMDb(this.movieTitle, this.movieYear, function(){ onLoadCallback(that) }, bOMDbAPI);
	};
}
// End classMovie
// ========================================================================= //

// ========================================================================= //
//  Class classPageHandler
// ------------------------------------------------------------------------- //
function classPageHandler() {
	var intPageType		= -1;
	
	if (document.URL.match(/\/film_kijken\/film1_programmagids\//i)) {
		intPageType = 0;
	} else if (document.URL.match(/\/film_kijken\/(alle_films_op_tv|verwacht_op_film1|film1_on_demand|film1_a_tot_z|filmarchief)\//i)) {
		intPageType = 1;
	}

	if (intPageType == 0) {
	// ----------------------------------------------------------------------- //
	// Film1 Programmagids

	  this.parsePage = function() {
				var reMovieYear	= /(19|20)\d\d/i;
				var arrMovies		= new Array();
				
				var elMovieContainers = document.getElementsByTagName("H3");
				
				for (var intLinkCounter = 0; intLinkCounter < elMovieContainers.length; intLinkCounter++) {
					if (elMovieContainers[intLinkCounter].childElementCount >= 1) {
						var strMovieTitle			= "";
						var intMovieYear			= -1;
					
						if (elMovieContainers[intLinkCounter].childElementCount == 1) {
							strMovieTitle = elMovieContainers[intLinkCounter].textContent.replace(/\((19|20)\d\d\)$/i, "");
						} else {
							strMovieTitle = elMovieContainers[intLinkCounter].firstElementChild.textContent.replace(/\((19|20)\d\d\)$/i, "");
						}

						strMovieTitle = strMovieTitle.replace(/(^\s*)|(\s*$)/gi,"");
						strMovieTitle = strMovieTitle.replace(/[ ]{2,}/gi," ");
						strMovieTitle = strMovieTitle.replace(/\n /,"\n");

						
						var movieYear = reMovieYear.exec(elMovieContainers[intLinkCounter].lastElementChild.textContent);
				    if (movieYear) {
				      intMovieYear = movieYear[0];
				    } else {
				      intMovieYear = -1;
				    }
	
						var movie = new classMovie(strMovieTitle, intMovieYear, elMovieContainers[intLinkCounter]);
						arrMovies.push(movie);
					}
				}
	      return arrMovies;
	  };
	  
	  this.populateMovieRating = function(arrMovies) {
	  		var bOMDbAPI = (GM_config.get("rbOMDbAPI") == "OMDbAPI.com");
	  	
				for (var intMovieCounter = 0; intMovieCounter < arrMovies.length; intMovieCounter++) {
					arrMovies[intMovieCounter].populateMovieDetails(this.onLoadCallback, bOMDbAPI);
				}
		};
		
	  this.onLoadCallback = function(movie) {
	  	var availableCaptionSizes	= ["inherit", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
	  	var availableColors				= ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
	  	var movieContainer				= movie.movieElement.parentElement.appendChild(document.createElement("span"));
	  	var imdbCaption						= "";
	  	
	  	if (movie.movieDetails.movieRating < 0) {
				imdbCaption = "IMDb:&nbsp;N/A";
	  	} else {
				imdbCaption = "IMDb:&nbsp;" + movie.movieDetails.movieRating + "&nbsp;(" + movie.movieDetails.movieVotes + ")";
				
				if (GM_config.get("bColourEnabled")) {
					if (movie.movieDetails.movieRating <= GM_config.get("flLow")) {
						movieContainer.style.color 						= availableColors[GM_config.get("idxLowFore")];
						movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxLowBack")];
					} else if (movie.movieDetails.movieRating <= GM_config.get("flMedium")) {
						movieContainer.style.color 						= availableColors[GM_config.get("idxMediumFore")];
						movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxMediumBack")];
					} else if (GM_config.get("bMustSee")) {
							if (movie.movieDetails.movieRating <= GM_config.get("flHigh")) {
							movieContainer.style.color 						= availableColors[GM_config.get("idxHighFore")];
							movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxHighBack")];
						} else if (movie.movieDetails.movieRating > GM_config.get("flHigh")) {
							movieContainer.style.color 						= availableColors[GM_config.get("idxMustSeeFore")];
							movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxMustSeeBack")];
						}
					} else {
						movieContainer.style.color 						= availableColors[GM_config.get("idxHighFore")];
						movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxHighBack")];
					}
				}
	  	}
	  	
	  	if ((movie.movieDetails.movieID !== -1) && (movie.movieDetails.movieID !== undefined)) {
				movieContainer.setAttribute("onClick", "javascript:window.open(\"http://www.imdb.com/title/" + movie.movieDetails.movieID + "/\");");
				movieContainer.style.cursor		= "pointer";
			}
			
			movieContainer.style.fontSize		= availableCaptionSizes[GM_config.get("idxCaptionSize")];
			movieContainer.innerHTML				= imdbCaption;
		};
		
	// End Film1 Programmagids
	// ----------------------------------------------------------------------- //
	} else if (intPageType == 1) {
	// ----------------------------------------------------------------------- //
	// Film1 Other Pages

	  this.parsePage = function() {
	  		var bListView					= (document.getElementById("lv-tbl-head") !== null);
				var reMovieYear				= /(19|20)\d\d/i;
				var reMovieTitle			= /((?:.|\n|\r)*\))/im;
				var reMainMovieTitle	= /(.*)/i;
				var arrMovies					= new Array();

				if (bListView) {
					var elMovieContainers = document.getElementsByTagName("TD");

					for (var intLinkCounter = 0; intLinkCounter < elMovieContainers.length; intLinkCounter++) {
						if ((elMovieContainers[intLinkCounter].className == "lv-film-title") && (elMovieContainers[intLinkCounter].parentElement.id.length <= 0)) {
							var strMovieTitle			= "";
							var intMovieYear			= -1;

							strMovieTitle = reMovieTitle.exec(elMovieContainers[intLinkCounter].textContent);
							strMovieTitle = strMovieTitle[0].replace(/\((19|20)\d\d\)/i, "");

							strMovieTitle = strMovieTitle.replace(/(^\s*)|(\s*$)/gi,"");
							strMovieTitle = strMovieTitle.replace(/[ ]{2,}/gi," ");
							strMovieTitle = strMovieTitle.replace(/\n /,"\n");

							strMovieTitle = reMainMovieTitle.exec(strMovieTitle);

							var movieYear = reMovieYear.exec(elMovieContainers[intLinkCounter].textContent);
					    if (movieYear) {
					      intMovieYear = movieYear[0];
					    } else {
					      intMovieYear = -1;
					    }
							
							var movie = new classMovie(strMovieTitle[0], intMovieYear, elMovieContainers[intLinkCounter]);
							arrMovies.push(movie);
						}
					}
				}
	      return arrMovies;
	  };
	  
	  this.populateMovieRating = function(arrMovies) {
	  		var bOMDbAPI 			= (GM_config.get("rbOMDbAPI") == "OMDbAPI.com");
	  		var tableHeaders 	= document.getElementsByClassName("listview");
	  		
	  		for (var intHeaderCounter = 0; (intHeaderCounter < tableHeaders.length); intHeaderCounter++) {
		  		var tableHeader 	= tableHeaders[intHeaderCounter].getElementsByTagName("TR");

				if (tableHeader[0] !== undefined) {
  					var columnHeader	= tableHeader[0].insertCell(1);

			  		columnHeader.className	= "lv-rating";
			  		columnHeader.innerHTML	= "IMDb";
				}
				}
	  	
				for (var intMovieCounter = 0; intMovieCounter < arrMovies.length; intMovieCounter++) {
					arrMovies[intMovieCounter].populateMovieDetails(this.onLoadCallback, bOMDbAPI);
				}
		};
		
	  this.onLoadCallback = function(movie) {
	  	var availableCaptionSizes	= ["inherit", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
	  	var availableColors				= ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
	  	var movieContainer				= movie.movieElement.parentElement.insertCell(1);
	  	var imdbCaption						= "";
	  	
	  	if (movie.movieDetails.movieRating < 0) {
				imdbCaption = "IMDb:&nbsp;N/A";
	  	} else {
				imdbCaption = "IMDb:&nbsp;" + movie.movieDetails.movieRating + "&nbsp;(" + movie.movieDetails.movieVotes + ")";
				
				if (GM_config.get("bColourEnabled")) {
					if (movie.movieDetails.movieRating <= GM_config.get("flLow")) {
						movieContainer.style.color 						= availableColors[GM_config.get("idxLowFore")];
						movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxLowBack")];
					} else if (movie.movieDetails.movieRating <= GM_config.get("flMedium")) {
						movieContainer.style.color 						= availableColors[GM_config.get("idxMediumFore")];
						movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxMediumBack")];
					} else if (GM_config.get("bMustSee")) {
							if (movie.movieDetails.movieRating <= GM_config.get("flHigh")) {
							movieContainer.style.color 						= availableColors[GM_config.get("idxHighFore")];
							movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxHighBack")];
						} else if (movie.movieDetails.movieRating > GM_config.get("flHigh")) {
							movieContainer.style.color 						= availableColors[GM_config.get("idxMustSeeFore")];
							movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxMustSeeBack")];
						}
					} else {
						movieContainer.style.color 						= availableColors[GM_config.get("idxHighFore")];
						movieContainer.style.backgroundColor 	= availableColors[GM_config.get("idxHighBack")];
					}
				}
	  	}
	  	
	  	if ((movie.movieDetails.movieID !== -1) && (movie.movieDetails.movieID !== undefined)) {
				movieContainer.setAttribute("onClick", "javascript:window.open(\"http://www.imdb.com/title/" + movie.movieDetails.movieID + "/\");");
				movieContainer.style.cursor		= "pointer";
			}
			
			movieContainer.style.fontSize				= availableCaptionSizes[GM_config.get("idxCaptionSize")];
			movieContainer.style.verticalAlign	= "middle";
			movieContainer.innerHTML						= imdbCaption;
		};
		
	// End Film1 Other Pages
	// ----------------------------------------------------------------------- //
	}
}
// End classPageHandler
// ========================================================================= //

function doConfig () 						{ GM_config.open(); }
function toggleColourEnabled () { GM_config.set("bColourEnabled", (!GM_config.get("bColourEnabled"))); location.reload(); }
function toggleMustSee () 			{ GM_config.set("bMustSee", (!GM_config.get("bMustSee"))); location.reload(); }

(function () {
	GM_registerMenuCommand("Film1 IMDb-rating Options...", doConfig);
	GM_registerMenuCommand("Toggle IMDb-rating highlighting", toggleColourEnabled);
	GM_registerMenuCommand("Toggle Must See!-rating highlighting", toggleMustSee);

	var film1Handler	= new classPageHandler();
	var film1Movies		= film1Handler.parsePage();

	film1Handler.populateMovieRating(film1Movies);
})();