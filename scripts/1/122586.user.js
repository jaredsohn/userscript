// ==UserScript==
// @name          roundshopper
// @namespace     http://www.rawimadinosaur.com/gmscripts
// @description   Rounds prices on amazon.com to beat pricing mind tricks.
// @include       http://www.amazon.com/*
// @require       jquery.min.js
// @require       http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @version       1.1.1
// @icon          http://www.rawrimadinosaur.com/gmscripts/icon.png
// ==/UserScript==

GM_addStyle((<><![CDATA[
   #GM_config { width:500px !important; height:625px !important; }
]]></>).toString());

GM_config.init('roundShopper preferences' /* Script title */,
/* Settings object */ 
{
	'bound1': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 1', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '1' // Default value if user doesn't change it
	},
	'amt1': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '0.1' // Default value if user doesn't change it
	},
	'bound2': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 2', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '5' // Default value if user doesn't change it
	},
	'amt2': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '0.25' // Default value if user doesn't change it
	},
	'bound3': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 3', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '10' // Default value if user doesn't change it
	},
	'amt3': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '0.50' // Default value if user doesn't change it
	},
	'bound4': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 4', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '25' // Default value if user doesn't change it
	},
	'amt4': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '1' // Default value if user doesn't change it
	},
	'bound5': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 5', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '50' // Default value if user doesn't change it
	},
	'amt5': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '5' // Default value if user doesn't change it
	},
	'bound6': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 6', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '100' // Default value if user doesn't change it
	},
	'amt6': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '10' // Default value if user doesn't change it
	},
	'bound7': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 7', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '250' // Default value if user doesn't change it
	},
	'amt7': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '25' // Default value if user doesn't change it
	},
	'bound8': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 8', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '500' // Default value if user doesn't change it
	},
	'amt8': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '50' // Default value if user doesn't change it
	},
	'bound9': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Upper limit 9', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '1000' // Default value if user doesn't change it
	},
	'amt9': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '100' // Default value if user doesn't change it
	},
	'amt10': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Default Round by', // Appears next to field
		'type': 'float', // Makes this setting a text field
		'default': '250' // Default value if user doesn't change it
	}
});

$("<div style='position:absolute; top:5px; left:420px; font-size:10px;' id='roundshopper'>Roundshopper active. <a href='#'>roundshopper settings</a></div>").insertAfter('body');

$("#roundshopper").live('click',function(){GM_config.open();});

//Load cutoff and rounding rules
bound1 = GM_config.get('bound1');
bound2 = GM_config.get('bound2');
bound3 = GM_config.get('bound3');
bound4 = GM_config.get('bound4');
bound5 = GM_config.get('bound5');
bound6 = GM_config.get('bound6');
bound7 = GM_config.get('bound7');
bound8 = GM_config.get('bound8');
bound9 = GM_config.get('bound9');
amt1 = GM_config.get('amt1');
amt2 = GM_config.get('amt2');
amt3 = GM_config.get('amt3');
amt4 = GM_config.get('amt4');
amt5 = GM_config.get('amt5');
amt6 = GM_config.get('amt6');
amt7 = GM_config.get('amt7');
amt8 = GM_config.get('amt8');
amt9 = GM_config.get('amt9');
amt10 = GM_config.get('amt10');

$(".t14, .price, .priceLarge, .mbcPriceCell").each(function (i) {
	var old = parseFloat($(this).text().replace(",","").substr(1));
	if(!isNaN(old)){
		switch(true)
		{
			case (old<bound1): // default $1.00 with $0.10 rounding
			$(this).text("$"+(Math.round(old*(1/amt1))/(1/amt1)).toFixed(2));
			break;
			case (old<bound2): // default $5.00 with $0.25 rounding
			$(this).text("$"+(Math.round(old*(1/amt2))/(1/amt2)).toFixed(2));
			break;
			case (old<bound3): // default $10.00 with $0.50 rounding
			$(this).text("$"+(Math.round(old*(1/amt3))/(1/amt3)).toFixed(2));
			break;
			case (old<bound4): // default $25.00 with $1.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt4))/(1/amt4)).toFixed(2));
			break;
			case (old<bound5): // default $50.00 with $5.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt5))/(1/amt5)).toFixed(2));
			break;
			case (old<bound6): // default $100.00 with $10.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt6))/(1/amt6)).toFixed(2));
			break;
			case (old<bound7): // default $250.00 with $25.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt7))/(1/amt7)).toFixed(2));
			break;
			case (old<bound8): // default $500.00 with $50.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt8))/(1/amt8)).toFixed(2));
			break;
			case (old<bound9): // default $1000.00 with $100.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt9))/(1/amt9)).toFixed(2));
			break;
			default: // default $250.00 rounding
			$(this).text("$"+(Math.round(old*(1/amt10))/(1/amt10)).toFixed(2));
		}
	}	
});
