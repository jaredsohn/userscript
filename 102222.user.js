// ==UserScript==
// @name TW Pro Extender szerverhibára!
// @description Extends the functionality of the TW Pro script by NEXTON and Lekensteyn
// @author Old Ingyombingyom&LorenzoHUN
// @namespace http://userscripts.org/scripts/show/93874
// @include http://*.thewest.*/game.php*
// @include http://*.thewest.*/forum.php*
// @history         1.13/2011.03.29 Small bugfix with hiding weared
// @history         1.12/2011.03.12 Fixing problem with popups of traders items if job name too long
// @history         1.11/2011.03.07 Fixed compatibility issues with TW Pro+ by Zyphir (http://userscripts.org/scripts/show/92414)
// @history         1.11/2011.03.07 Added option to hide best item for job in bag if it is already weared
// @history         1.10/2011.01.14 Trader timed link fixed
// @history         1.09/2011.01.13 Added online version checking
// @history         1.09/2011.01.13 Trader buttons link changed on normal worlds
// @history         1.08/2011.01.07 Trader buttons link changed on beta worlds
// @history         1.07/2011.01.05 Added settings windows to control the scripts functions
// @history         1.06/2011.01.04 Added possibility to control the scripts functions with cookies:
// @history         1.06/2011.01.04 twproext_seticons, twproext_smallskillicons, twproext_fixduel and twproext_addtrader, 
// @history         1.06/2011.01.04 set any of them to 0 to turn the function off
// @history         1.05/2011.01.02 Last fix removed. Problem fixed in TW Pro itself
// @history         1.04/2011.01.01 Fixing disappearing inventoty in shops in Opera browser
// @history         1.03/2011.01.01 Fixed script activation problem if browser loads scripts in wrong order
// @history         1.02/2010.12.31 Adding button to left menu for Trader with color changing timer
// @history         1.02/2010.12.31 if time less than 1 hour to yellow
// @history         1.02/2010.12.31 if time less than 10 minute to red 
// @history         1.02/2010.12.31 if time is up, auto opens Trader window
// @history         1.01/2010.12.30 Fixing game bug at duel page (motivation and pager disappears in opera when mouse over)
// @history         1.00/2010.12.30 Initial release
// @history         1.00/2010.12.30 Adds Shortcut icons to item sets in the inventory
// @history         1.00/2010.12.30 Replaces skill images in inventory with smaller ones
// ==/UserScript==

// handle non-GreaseMonkey browsers
var insertWindow = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var sie = insertWindow.document.createElement('script');
sie.type = 'text/javascript';
if(typeof uneval == 'undefined') function uneval(o){return o.toString()};
sie.text = "(" + uneval(function(){
	twproext_version = '1.13';
	var twproext_langs = {};
	// begin translations
	twproext_langs.en = {
		SETICONS: 'Icons for item sets in Inventory',
		SMALLSKILLICONS: 'Smaller icons for skills in Inventory',
		FIXDUEL: 'Fix bug in duel window for Opera',
		ADDTRADER: 'Add button to Trader with timer',
		HIDEWEARED: 'Hide item in bag if already weared',
		CHECKVERSION: 'Check version',
		RELOADBROWSER: 'Reload browser window to apply!',
		YOUVERSION: 'Warning! Your version of TW Pro Extender is: ',
		LASTVERSION: 'The latest online version is: ',
		URL: 'http://userscripts.org/scripts/show/93874'
	}
	twproext_langs.hu = {
		SETICONS: 'Ikonok a szettekhez a h\xE1tizs\xE1kban',
		SMALLSKILLICONS: 'Kisebb szak\xE9rtelem ikonok a h\xE1tizs\xE1kban',
		FIXDUEL: 'Bug jav\xEDt\xE1sa a p\xE1rbaj ablakban Opera b\xF6ng\xE9sz\u0151h\xF6z',
		ADDTRADER: 'Gomb a keresked\u0151h\xF6z id\u0151z\xEDt\u0151vel',
		HIDEWEARED: 'Viselt t\xE1rgyak elrejt\xE9se a zs\xE1kban',
		CHECKVERSION: 'Verzi\xF3 ellen\u0151rz\xE9s',
		RELOADBROWSER: 'Friss\xEDtsd a b\xF6ng\xE9sz\u0151 ablakot a be\xE1ll\xEDt\xE1sok \xE9rv\xE9nyes\xEDt\xE9s\xE9hez!',
		YOUVERSION: 'Figyelem!\nAz \xE1ltalad haszn\xE1lt TW Pro Extender verzi\xF3sz\xE1ma: ',
		LASTVERSION: 'A legfrissebb online verzi\xF3: ',
		URL: 'http://userscripts.org/scripts/show/93874'
	}
	var twproext_lang = twproext_initLang();
	var twproext_authors = "Old Ingyombingyom";

	function twproext_initLang(){
		var twproext_langname = '';
		var cookie = document.cookie.match(/twpro_lang=([a-z_]+)/i);
		if(cookie) {
			if(!twproext_langs[twproext_langname=cookie[1].toLowerCase()]) {
				twproext_langname = 'en';
			}
		}
		else{
			twproext_langname = location.host.match(/the-?west\.([.a-z]+)$/i);
			if (twproext_langname) {
				twproext_langname = twproext_langname[1].toLowerCase();
			} else {
				twproext_langname = "???";
			}
			if (twproext_langname == "net") { // English world
				twproext_langname = "en";
			} else if (twproext_langname == "no.com") { // Norwegian
				twproext_langname = "no";
			} else if (twproext_langname == "com.br") { // Brasil
				twproext_langname = "br";
			} else if (twproext_langname == "com.pt") { // Portuguese
				twproext_langname = "pt";
			} else if (twproext_langname == "org") { // Turkey
				twproext_langname = "tr";
			}
		}
		if(!twproext_langs[twproext_langname]){ twproext_langname = 'en'; }
		return twproext_langs[twproext_langname];
	}

	if ((window.location.href.indexOf('.thewest.') != -1 ) && window.location.href.indexOf('game') != -1 && typeof TheWestApi != 'undefined') {
		function twproext_injectScript(){
			TWProExt.version = twproext_version;
			TWProExt.lang = twproext_lang;
			TWProExt.prefs = {'seticons':1,'smallskillicons':1,'fixduel':1,'addtrader':1,'hideweared':1,'checkversion':0};
			TWProExt.prefHints = {
				'seticons': TWProExt.lang.SETICONS,
				'smallskillicons': TWProExt.lang.SMALLSKILLICONS,
				'fixduel': TWProExt.lang.FIXDUEL,
				'addtrader': TWProExt.lang.ADDTRADER,
				'hideweared': TWProExt.lang.HIDEWEARED,
				'checkversion': TWProExt.lang.CHECKVERSION
			};
			var twproext_insertList = "twproext_xhtml = '<div id =\"display_sets\" style=\"z-index:2;position:absolute;right:3px;top:105px;\">';\n"+"for (var twpro_set in TWProExt.twproext_setInfo){\n"+"\ttwproext_xhtml += '<a href=\"javascript:void(0)\"><img id=\"twpro_set_filters_'+twpro_set+'_bg\" src=\"images/inventory/bag.png\" style=\"position:float;z-index:1;width:20px;height:20px;\"/><img id=\"twpro_set_filters_'+twpro_set+'\" alt=\"\" src=\"'+TWProExt.twproext_setInfo[twpro_set].image+'\" style=\"position:float;z-index:2;width:20px;height:20px;margin-left:-20px;opacity:0.5;\" onmouseover=\"if(this.style.opacity!=1){this.setOpacity(0.8);}\" onmouseout=\"if(this.style.opacity!=1){this.setOpacity(0.5);}\" onclick=\"TWProExt.twproext_show_set(\\''+twpro_set+'\\')\"/></a><br>';\n"+"}\n"+"twproext_xhtml += '</div>';\n"+"twpro_data.page += twproext_xhtml;\n";
			var old_sort_png = 'http://twpro.lekensteyn.nl/sort.png';
			var new_sort_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAiCAYAAACN1jGgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAALXBJREFUeNqsu3l8Xdd137v2PvN053uBi5EEwAkUSUnUbNkkFVsyFTnNa02+pIkSy3kfqcmz9CLHceM2r7zMa/KeP7Ylf6TGLpnmY9VO3Bb42HFSV0ocKaCsyRIFcQZJEAAB4gJ3ns65Zz577/cHKZmiSIpyu/+8n3v22cPaa629ft+D4LLGDjwq1C4Yd+JG469CQFrF0L7hJ42/yG1aT6Ri+RE4O/eVCOEs4/ilqhd+Tu0deH18374QIcTgQxoDQHPPF/pBQb/BScmptfHeo2jz3gB+gcYYQ4cOHeJmazXt+BztsQOK1+VTnXVJs71nzx4fIUQ/ap8TbILr/N1qpsOcdJeYnh8GvBOQnMLh1U8k167s3v14cCPz/KjzmCw+LR8L53OZpWyn8zJ0C4UCBYCrjn9iYoKrz78Te/XEieR969e3Y+N3d/bu3Us+4mvRgQMH+D4AwU1GOCgTHF8rRa5rM9tG0tJSORaGERpK5m0lx1xZHvbefQdjDPjLeyraQzk1rDyO/uGfsk3LlpZSqV+zbt/ySgakWlSt/Hr5pz+Lt+IJi3fdnJVO/knkRY+OA8xetIfrt5mJCUHlXxkNaqc+E8VvU45b/mKhUKhfWqAbblNTU/yXvzaZ6Ti0j1JvW6XDfscOIsPzyWtnF+nzPzh88HRhYmK5sPfGjZGxAj744wvJRav06bpt3h1SX3ZCTymbtbEcl5hRG+ip7uTkKQAI/lcZy8TEHm7/8f3pqnj2To9Gn0cR/l4+m35999hY64W5ueDKNWWMoe9/+/+LVWvWw3bV/tWTwvLzawL6vampqcbOnTvJjRjzgQMHhFKp1HP27Nmhs8Qb5BDVMIAUnA1bIQVPFPgR3/fvJ5TKJCSvyh11plGdO/XMM4XzzSZ0AYC+z2Bi7xxTWLO9pd1oKS3HRSbAiC3Jv1mP/O/3IpS0Jdm30pm3+E7rtqhjrqGb9fVvvDG5BADuhw02Plw1iC08gMLa2kZ1cast6YM7duwwGWP+jZ7ciYkJ7qUT7eFaN3p8dqX7Sc/1k03LyzqezyGANRhzD23oRbP4zVbhmWeeP/zEEw/6N9LvoUOAS3azt2jX/0W9U9vSCbpGEPi81emqLun2r88PrXiJ0rcmJiZWfoET/cGNYweEc8fPbSiF83tOsbOf9eepZJjaKGrgZViXduCiwbyvTU7uF87MLI9bzebv9GJr4xuvnOvz79xe61k4+Y/Ts7M1xlh0vXU8cOCA0KosjNer7S8dn5m/s1Fa1GgUYgQEU8oiQIhxmBMRhhjGHNaSua2xeMrjmbcqc85/yAznfwAAFn7Pgqem+LBtptxjp5RFP0AdjMHwAw0vrnzc6ro9JIwwX2+o6smT2/WlZZVXVY7EYql2OxAAAH3YIuGwrjHm3cWiIG3Vz99itTo3uW7NuJFn321zVT5Ra3u/fvRc87OdRmV9Xm2rODKxEDTQGqWhkm5tYGH+/L3deutPy81T66ampnjGGLqeAT7//DPSCTfFdUjZ8QIXd1zLaFkto9lqGWHLFzRb0VkIm3wSjJixYnxiYkJk7MbH/MHQVxBL82dvr0iNb5+kM/+nf5zkbi3dNN1n95f9dsCFYYSuFrrm32n3YRJ+uYezRnf0hEJaCkbLK8t/sLw09/HqoJD4sHWsL53OmM3WF04dO/Lg4tnjY0pk9eU12tuj0FxeZ315jfX3SCzbK0VSVvQF3mkmXbOe9x172+nTZ3737Zd+lgGAn4ek8vkTSdg49r9br7+VXJYliGJx1tduY6FYTFnbbtrYoURsZFK0OTzsJS2Tk5ZXOadjpburHn+5+5yYmODuGa4mIi4UQ4eLqCox7PiIsFoeqJ9AEPKYtFO+b91rdGeW5/7p3y+dn/ojYrp2lEqsbQzc/aR3tZPCGEP/6t9/P1Vq+A/VWmZPVnZJRhfqhioqOMR4U56VkkootiyKePDTcR1tNE1zCQC61zKWmraYne12xjpRwOFQ76YV/qdlXB5nlBrMpigGKu0zci4WsXye1m43FztrBXb+1MzBR08CHHQ+ar7y7NwT4rGF1u11qH/tSOPUrewUDW9tbTmRD/OLpXLZstpmPYoa/ge9y9NyhNjWdru9eZvkRDjw6T19CvfiSmWkWq7tqS83Vw4deu5tAPCu9X7LNZVapX776upqIqcAGkjpYf+awTLPCyECBOjSFjJKWde2hUqlmqc8EYBX+HqrnWKsy7/PYPDPpmOs2fpkh+OMSl8fVXpznnb4HdmoN3XbdXf4GAkixweiri4iRrUgCHp8Eg2HoakwxtC7m3znxnqMeOQ3sde+VQLSQC4OGGARke46wVseZcjDWTXSZGH+MzFk34Yj1Q8IY4EdVTpi90/NycljV8sVEELsc3/07TAKQsf3A1p0gc8luAwA5kFQQlkVVu4aEH+GgK7IIhZ7kop5vQ1cgGm91ab3F7uVX2t3Wz0C5uv9Sm46L2VXO9jMiCLPDSg9rpiTStV4R6iZrX+5XF1JJCN9fmN+7MmpqanTu3btim7UYCZhUmgj7rZmVPv627Vjt3pHfXZ7fetKhmXOdEzzTBSQeTUpVneOfS44dKjAfm5ogPZ/pdpDnO7vjihOplRuqG+er+MH18XQgBIoxbn5O3t6em/TMsY8Y6xyrYS/VelwruepPIdwVhdB19XqmnUbvzw0Nl4nQcQDRMADgO37+PCrUzka2H+qKEofVmKwWo3AIxe3hL9k/dj+1V9W3flFvU4pdrLZrjI8dBKfm9+idEy1sVLaWs1l5yXTyiffmh4mgsBqY6OtKJ2uxBJxdskdvjdJFFkCZx4bJ35jDaM+jzgFAfNFGloyIjYyuIDTuVNZap1N2w0CNRNFLs4tCJ6UEKWNIgCEV0ukN49rNTjtPpOJS6lqPdh0oshiBABHkYAPF/lNm7Dq9GWk2b6c9JqqwWIsFnOvddr/7V89qbZde1vbam6oO60eL3DXt+T2hhRndA1eD+WEaAuy3LU0z/BDK13r1GNWw1S1SBQzqfjt3W6pVCgUmjeStBcmCuLcmSPba1zn60cbJ2/tHOvgW0o31Xuh93QQBG8jhI4iyVhKp9PdK/t77rmCxAWlcdqpbtho2MYR4iHTi5AmALs9L5EfnllMVoYGdvb05t4+dOhQ65o5oQiAPIREgQMehxAGHlmamwtDJOYRQn0I8RxQygch6cdacpskKSkEALIkUEojgEt+jwcAaP71szob6rs3fPV1vYZ55ud7qno6+ff8YP+wZpoaP3eea64bfUX/5U9dcKNoXAJmxPyoLjvWsloqIZicfC9+vnkmY9474jwXhOG073S/Cn55m8RFIkIYGPGAhA4AYxA4Dbza5PBS0yAuN9ASU7ee073RVDzhpSYmJtyrJZdfevhh95vffO6QBPKfVOrh7680ow0LTZR2HJdbLHPxSpe/J2lEg6sj3Pe39Ot/sWfPTnq1xUMIsacmCr4VheWQhMyyLd53fcGzfdmSLC/JxSjHY9ZEZow6jAWBj0zbEllIkS6oCo/wZrft/HTHDmhffgUuFAo4uyerRlBLya7cSS6MdAEAljbMrG+z7p/MtM/csnKiwm9aXtsdRAOzLMJviaJ42IjEBS+mfMBY2MQE99Xpl0cjx/6DYcFOxakNCQFIShG4lMyhHo3j+3SHO/b2kVuVeOJmLZ5ehENQZoxd9db07g8IAEgU5EurS99cOL/AMUACAAbGMEKIicCoLDLCYwBgmLv01GUehjs6mw5bnUccCmkm8KSHke6adtPXsynKMcaEel3qOmZeum3bf11XbZ0XZuf/jJw8k6IIfZJuHY+9YTa+DwAtAGB79+4ljLFGcWHlZy2m/DGleiHHLd3Gk7ZAQhcopRARgEoLYL6uk6K/wRcT4y0D95kqyGEQoPBaJ3V6epqrcpqQyEpn+xLC/t5WeJc76/9fbdbJDCZCUg5V8UI1GO2azV9PgD7z7LPP/gNjzLra4jWgozjU2+KGXsJ3fJ7aBIuCxOKyQaiKMGYoFHyOtVxTciKH8xyfZwFFNnVxRCIJIODed91nBX5pTh1uoPLHOoH5a34Q/A8jbf1IVRSwaPNfHg9nbj0/WxT7F3LhKBlbkTh1muPwW6omz//rr/yZdbVQ8t25uQQi5LOR1bhpOO7oIo1wQsKo3xCQIWKIiRg+sUaF/3yi01tZXvx8Kd+7/GJP/NAnYb91pYf2A4CIoEuGQ4FRBhD6IDLqUopcAAaEYgAGwBDlgcN5hLDAKEOAeABJvGgwrFDA9pG3dDi/lA49nxv1fJZ55fX1BmO/TxBKeY6LZImq7Qulm43+vnQ+JPfXzp7LdtYMLfmNVh6dW9jLyerrU1MFc9euQvTuCWaMedyP97+6KvJ/KvDRf6RWMBBGLjAGEBIAJ+Spg9IO6CNtSc+dMZKJFw0jdkxS0s0HH3yQXC1Jfflcsde26W+tNKKP52Paj8QYHEml3C6NnPjmgaCc81nslbNBzGlVhwPb/zyAODc9ffDkpRD3vpD0u//1EaFqtjOtWlsBi+EY0eigknc0Q6tUcTvnuB6XQoar0hxbdkqqb/mIOQywgRhGHMMY01pt/L1NmTufSLvM+sOz+NwDRa6cr6udsS2djbGkEm8WlZXPnp2bTyjnMFkfjtV03jjCYfSaIQkzd9x9f+dqxvL2gQPC35w5OWrVG//bzbKjZLCLMKUQEzGsTYogcgAiBrQtK6FbcgGenV9am18zujO3XD43PZ0/d7XiH3vXvSAEoqxUhkdGf1/g8ByJMCPURyEIwFGKiqXSaKdR/qYAMMDxPEuk4uAFF2MSv5DPG/H2wL3s1df1NiHQ5nnUMS0ZAZKBMUAIgRRFGC+uJNjo6MbA6e5uSAqy1o5MBptkhn03I48NyhKkeACILnf7rFDw2rcJS4GnBlEIUG4hiAhHOUQwBxHmWVfieWYbhvZ6LqW/Lui54u7du69ZHFtcCYzZFeeBsxfa2+OiP7hpTWJCFiWeYI34wHVdwhs07ICII4wxZEQOr11YiM5daTAIIfa1f/hajbbOHAwkJ8GpaF2ajzM1rTebcleMPIo7gSmGfiBukEeq2WSqXGKVpI88eSje11IE2aWUsGx25r1QTJuK1WWrL1Zw7Z5FsThQBWtEULkvxkEjF+orafuMjbd3NtsZIXtWRPxrqqQcV1L5xrUS51frSymNp7+l4O7wRs3VxCjEIWWs7QNpeZRzAoYMnoEhINg5pMD88Y5ROn/+05lcz2HhxMgqY6zzPs8qSsAcDzDmAaMIMMcjNZ7iXMsKXd9mAAAhBpzN9SSHjfj22aNtFfEiQ5xASBgx/90cRls+l6Km80ibofSsrrPi+nUhE0UbgPlcGEFvo671L69oRrWqd3zv3qplZ0MAL5LFhrZm7M1sdVEVdX15oaZ9IJQs7gDRCKUht10TlysOzNcSYYQTbl6tiTJyJQmHoGOrq4iowoVKY/fu3dcsv+/du5f82TPP15qa+eJxxxwpNsMxP0JfoFiO1zs+93LXGfUDi9ehzcYHFScdE+oSz18zIbXvt91Nzw0e6h/qsbFNP04Y2ryi1dJO5K1zPReHQcg1HU8sBeX43X23HB6LD50mJIjLvBJkYsnXU/l86+WXa+/1/+j2R90/f+n/nUqLieQiXvl/eAw9C0Yxw7oM/FkH1q0ORn3Qv8pj4S1ekaf1lFR+/PHHgyeeeOKqV/4Tr/x9r12v7bgnZol8YINDCLiEofmOz52ouGhThme6KCAMACkFw7oE5o6fON6bHhq6O57JHJ+enrYvPyhRFDICLBRklYUYIc8PeubOnvsGi1w/IiEwQMCQCO1KkQdgBua4mB5PhQGhUG+0oete8jDakaOyt1xKlSnjSsODgbtt20wil/17iadzXEAiY2HhE/Fq7bNOGOq1ZudelzHM2w5LV6patmvfA55zv9xo/ZsZPdO8cuIkMLOEhF9ots30YivRXRG2mphL2TyudHvEc31x2o2HtCWQyDECJcIfdtsY693ddLyDf/2pLULqzIXgl5tON1c3TS5yTQyKJwzHkb+pV2gN9Buncyn1iKZLi5s3J67qsQqoQBkrmG+8cfOrc8XO3EJn/lNVu/54rV41TMuUwzDEkRXiJm7LfjLQRtcMTauGch6HzJNiqMVxyc7lSSpCCE5NTFiVePkdC7wVLzmTXuqu8uw8gfy5BF0TDnbiauyIIkiHBYE/39s7bl/rcARBWVM1+WMLx85nz7W6wiILgTHGKAPwIwYjCQEWWj5b6VzcxJAC2CFBZSs0ms3WLseyX7Ysa/Hy6u9Y31qnYTWOO7Y7jICqKOxwruv0I4iAUgaIRYAxBZ8R4DmOadkBV8n0NYtz51OyLNdFhY8AAPhqX6o/fGOaLyHE/HTKTPRmn08O9X9XkqKS2OFo/vTpGejL3+tWq2PdpQtGffOmd5JRtElaWPxjq2uBI0p12LwplV+XL155Y6Dhad2zaoONsLfCkhtPxXBfIIrisiCuWfBpNg1w5p+zbshR4qUwJuq7ifO1DGbvXkSmpqaW3jrhf30wLU412vYDb57pPGRiJ3vXiGgO5GNnMin1lKHrx3VFPSrp3Pzk5Mw1ayUIFShjzGu/8MLqdOvosWazaVpVS5B8DvEUgW8zpssqQAA6iaiXza4/DwDeyy+/TAuFx670XmxyZiZK7UjNp6LGX0II+/AKy8XOS2xNZ9Dv1frmRF46LKriGV3vbV9PYjAMjTme58ycL63MkBAhjtcBIe7imAEAGAKG2OULFRCKBEWjnCiLDNE+p7aoT05OugBw8T2qWnUa5acEWV8ritI2XcohHhGAyMfAKAAChDiRMMYAcVyE5HRrudaNL69W59ePrvn6rbcPVQAA+Ho2z1VH1qxUEObYujVLalJ7UxD04m/8xsMOAMCxublVO5063D5+ircliXZ6e4/LhDTM2dmtlihxaNtN78hbN6h9vX3CpRyGAQDs27cDz/wUy6G/9DYktDdleZAJSAxkRToj6WgRXI2jgnRCF8xPcLJY5wkIAIDZxSrgNY1m165dEWNsdXJyst1qVRbiirhqdcWP5+OimUxpx1IJ7XVJS82LYqz20EPT3j/7Z9evk1xK0INj3z82uzUZfqfmVpFG+UzkM9nVQy6vZlspPbkoYdl0XTfcvXs32bVr11XHVygU6IEDB+xww8IR3JBXc8W4NtIaJOvUDcWUlnpV4KQjsiyWm81meL0x+b7hJBH6uw1bbj05NDq4iwB3L6E0DcDw9XAAzGGaSqdXZUUvcTES7HlgD7tsbNFTTz11IqMv/DvTc764UiytiSJfRIwoiIGEOE7EPEOMhDxhwBrtst9stk5v3jz2rW3b1h3at+8pFwCADyPp9XDT+sekwcGt6XQGZ1LJoyDL75XnWaFQeS0u/htVj62PDGOT2Jc7Q7V4EeLxHprU+8ThIUvJZBdXV1evKLbtJDHhyJlISf/fKt7Ex0JIgABtVeVqnY7sgZiEZIb9BKnBjCBmOKzo1qFDh2Dnzp0frs8jRBlj9vT09BlBOF62bflv46oUV2Wuku5LlQCy3kUF9zM3JGoihNjExIQpGf4PB4ezswoRNkYRyBQAFEEMY6pezKZ6F+7fvftDUY5HH300Ml8vzSt1dJBS75OxdBpkIs/xmH9V1tU5TctaX/ziB7wTuvwic6k00Tr03HMnOxpzOl3zNAkigzHA158HUEHi66lYdtY0he6V3vrJJ5/0ntu//+WjrdXTmsyruZ7BTDJpbAVga4MgGKYAkmu7WczzK81G9y+OeafOr1uXKwPE7UsH6+JAJyYmOEmSVMuy0MaNG13LspgxO4sWkkl6afDo6aeflgcGEnpWQCEkwHMHeljzzaZkGAYrl8veY489Fl0tnDDG0NwLL4hyIoErohhZlsXeleMLhQJ+6KE8Z1kiZxhbyPbt26OPypwwxvD09DRnWRYHANGNSv3X6usnP/mJAnZF6zLEySRikRQxQVDc3bt/w0YI3ZBS/Z3vFGQ7hKFWxdxIfCQSQiuSpi7GYmb1iSeevRJdQDt37uQsy0LT09OkUCjAu7lRoVDAe/aM89PTniDL1ns3MsmSkW94V5ljFgYAiJ/Nhh+2DowxdPDgQV7zfcWWArHd7orgOrjlBTzHobCnZ2398cffzwCxK1VXxgC9MfmUXPObQ5bpxiKfOsPJ+PzLSxCMj8uGVymuEyRRDH0WyNgvZsdz9Z07933oBr2rGM+98Kx4znWzXbK2sXfvXu9GOJprltsLBXzHHSnBqzfjXbclZ7RkO2fn3e2PPhr9IgbD2AT30t/MJTw3iAuYD1u+J3Zarbggie3eKFp58Iln/Y9geOjgwYN8qVQSoFrFkMtFABAVCgVy+ZwZAzQ5OSEAtBTbdlAQqPaLL75IJycnybUE0/n5d2LvvHMqceut97RHR0fNXwSgmpqa4rqzs6KbjHAQEByPXwlQ8Sifz3djMde7EqBCV4JE//0/dYerrdLn25Z3u+OEfrqnZ9/47fecKZ54Z8NKqfjHksQDpYwzdOlooif3l3t+K15C6IYgKPTD//yVVOTbn4jLsaOknVvd/fhHp9gKhQK+ZdDRSo1OLyXhMIm8e13XG+ZF7c2I4BOahC/wWaH82GMHw4+ywS/9zZ+n6tW5HY7duC2iAJ4XJMrVzi2aKp3J9/d+7ZEt+Vl0qTD5v6IVCgU8Pp43LMtf025aWzRVdTgSvPXDFw7VXnjhhasCVN/+9rcTiwtzDx87cepX+/r6/n5sbOx769atq+7Zs4d+FICq264NUsaGMMY6QliO/KARUurxAjfi+dH9lBI5lYy9KkvSTKXeOLlp08Biswndffv2vR+gOvQciDYJRqyuf0vHcra6TsiSSef+2uJMmZckWZR4pGvaCRKRXstybtFjwdDc3B11eE+aui7Vhn74fUsPLXd9hyFF60+8NjMzWbqW0HitRb5rABLzjdqnGtXGw67nD9uO32N1PYUy2C3wXCefM95KQurZ559//NiDD96wV0DNZjFpmvVPNBvWDtPxM54fyPWmHRd4vj8eT7z1kxbUfxFC8JrGMjCQaFTtT5bKtU83WtXxgd7ef/K9bhkAzKup9ZOTk8K5c+duarUan8cYj7722mv5IAgqvb29/zg9PX1DAFWlUhmvVqtfmpk5dWe5XNaiKOIAADFGIwDMMEIiwjjGcRxOJBJb4/GYhxCs8jz/HwYGYu8HqAAAaqSj2qZ1S73VHff8MIY40K1ud5fdjbJhxITAD9O2be+wXWerJPKeIimSs1C/LqT0c6ptB5aIZHie199s1j7ltasjrttSCoXCDcNI27eDvGJV7iytlB9vtKy7ZIGjrhvonh+qqizo3a4/Mnu+9plWrfNHyzNs7dTUFP9hG3fgwAFhZnKSB9ENPD+UW5bT32jZ+Vq9m26brkAo1SHyNwZ2MPCxcdmYmirw/3No5gS3devWZNE0dywXV3+zVi3vTCdiZVni5xw3pGEYXhWgeuedd/rCMPwyzwuDAwMDZVEUB1dWVv5geXn5EysrK6nJyUl8fYBqKdNpN79w/NixB8+enR2jlPUZRqxH0/ScYcT7DMPo13Q9q2maJMuy4Hle0jStvG2722ZOnf3dl146+n6AqlAo4DDoJEzb2ma7fkpVRJ/DmHZMZ00m4/bxiogYAJIEvsGACLYT9Dp2ELe8ECP0/jmyQgFPjo+jPXv2MID9sH8/gCTVBJOyeBQRvWt7Y7rX2dReai7df/948NBDB6Jq1ce7dzfDa4U3xhj64cEn42an/kC1bo2LAgeKKi9JojAYRoTmc/HjvMD3Om7AA2IpUeJ7U8Hy8rWU24mJCS6rXEjW6gv56WYgYUR8WY1NI9zZFUUk5QUhkkWB5FKaJcqc2O1a21dKjQ1sGZ35TuFzpx8pPOd9VIAKYBL/+MdRcnZ2cdfy8urv2WZ7PJWKLYuCcG7pwlLzIkA1dxWAalJmjG3rdDqbDMOIwjDURkZG+IWFhbWVSuWzpVJpNZVKmddDZcuWpbZazdtXS6WErusok8lEQ0NDZZ7nw8tvaIwxcBxHKJfLvaIoCjzP881mM0UpfT9ANT4OvFeOBm0nWAsAYGjyUhiSlO0GBg29m5EhLUuC0BVEaS4kDAVRcE9Io3iVuCK7pDm9mwe99neDWtovxv5p8mnAmkru3oqoWZyP+ZE3zBjoGCM+8P31XbOx3O6YWcdyBF5E4o//y8BxxljzamIcQoh9/5v/Bw2jiHe8gHM8JKQcb0hVRRISGqqKMrelJ//fCIOmosg0mUl1+AEZXWvzfvSj/Uaz2rqn3ajd12o7G0WJL8eMxKlMUj/Tbnf7FFlQUwnNymX0IgbEr5RWP7NUbG7SNHGuJ5f74sTExOxHSTgnJydxFEXJlZWV+5aXi19oNurbMulYXZT5U41Oe+baABVDX/nKV3o8z/tXuq7HqtVqfHZ2lm3evNnTdV2dn5+/q6en5/V4PD53iYW56oGzrAZ2HFe9FG5A07TK6Ojol0dHR2tBEPA8zwOlFDmOwx0/frxveXm5IMtyXlEUCIIACCHwPoNJgqssevZNtuP3K4rYicf0113H2+r6wXrLtj4hyNJLThBKYatzF0KIqopYFyXR7O2VGcD+9wFUVVIRec/c4LvWCKkDYF7wGSGy59ujjBGN53Houe7IqreS6Np+ynH8vKLJCwOAvnH8J99zGWPO1bxCHStthpUf6LJ8h2W7G4ul9noOIcEPIyjXWvdwPG5oicx8IpVf6M3GKuPjWe9acV1lIJa71lir7dxdb3Y3EEKZonbvNBSxHTOUQNMkiOtyG3Mcbnbsm8rVzli9YSWDQBEH+oSN2axd+oDAd53QBwDxWq388dXV1UdrlfLNsZjiq4p8yvW8wwixawJUTz/9tMxYtNmyrOF0Or1cKpU013UlURTR0NAQOX78eHJwcHBnLpc7PDk52WKMXWPOIiDwkMDzgBCCIAjo0tISwRj3IYT6AQADAB+G4SBjbKskSUmEEAiCwBhj4F9SH/n33P1ffinRdaytrhfomVTsXMxIvsJzltl13b5m2x5LJbOTQ4ODzyAW5REDCXjekwWhhbETAexjAIX3yu1TU4VO0w3nwyDY3LXt2wCByAC4KKRGRGiMUCpbdpAzLSdhdX0tbiiN3l5tyojrShdsDSYnvfdK2pe1J554Npj48987LGDhj227/dvNlnVXo20P2rbPr0Z0yLL9hw29+TGzt/WfHHv9D+/4pZ3kWoW65/+q4BEmVD2fKI4bqK4X8q2Oo6uK6Mfjiidj3gtCEqs3u7rnBVLH8tQwIpjnsMjzdG1Uq0zD5KR1xTjRxMQEVpSW1GopSJZlb2Zmhg0PD8c6zer21WLp4ZVi8TZRRChm6GcJJT+TJOmtawFUExMT3NGjR0e7XfeLmqYlOY6jsiwjTdOYqqpdwzAiTdN63nnnnZtjsdg2WZYXp6eny9dNgBEChBAQQnqLxeI35ufnOcaY8K4dYIxFxpjMGONFUQSO497XD//uJwyEoN4oIgMcRkxThLKiCQ2G4kcFvn2fadlDvu8O9KwZ/qkgRCfbq427HLt5d6PbvKn5qslmZ/9w+nKvsGtXIXr++WfKnF96iTLGOa57R0SIERESI4QqISGy1XVzbdM1FFns5rLGybiuljDiQsSECPbMsGvdtA5NAnCJ8Czzep5eKq5uD6PiV6KI9mfSWjcMiVKpmdsqDev3/ICd/973vv46ANhXC0l/870/lH3fGXYcL27ZHud6IZIlEQkCxsCAA4R8hIGYLSfu+qHoeiEOQwKW7eMgBMpziF5RLUFTU1NSs7na02yidZ7X0COLTq9du9YhvnPbaqXxmZXS6scYC+VUIrPIC/xhDl0foKpWqwlK6V7btjfmcrkOQkhQFIUmEgkiiqKjKAoZGxvzpqene4rF4u/09vYW6/X6TwGgfeXN82JYid4rwFFKURRFAAAupdS97HcAAAFj3IsxFiilCCEEkiT93GCCckMmONoIAAlDk3yEmVGv1z/NGKIchxnGSLK65u3NcuUHooBJp127Q5Hlju2F622n/vkkVhvT09Ozl8vpDz74RDD1ne8soF71Bb5Rci3LvMd1/WxEqEIiKkYREUWBi3JpfSEZM47I8dhxRe9Zig/e3UVoM73q144/+mZspTp3r2W1tqtGbDqTjh93up2zUUS0gd7E0SAkiTPzlZs6LWcNZu6vyGHtwlShML+r8MH6iW85kmnaa2vNbtzs+kiRhSib1s1UXGkHEdEdx1cNXakn4mro1ayk70dqEBBgjBEeA6GiwC5PMaemprharThQq7Xvt6zunZ7n5BK69pohWLONdndseXn503bXSuYyiYaiyB8KUB04cEA4c+bMaLvd/hVd1zlRFANKqSzLcpTJZDie5wFjzPr6+lZLpdLwwsLC8NDQ0H3VanFuenrautbXk+8q65IkVUZHR5/EGC8EQfDef3me5+r1+vrl5eWvMcb6eZ5nyWQSguDniCYiUWg4vrnNtJxBL4iSYaN7MzS6mxkAQwASxyG+bTkjKcfLx9I6tjDmJD35VlZLvRHzXC2eSEXWiR9zl4uPAMB2fu5z/osvfrUcdMSa7fiJZtsZYAAiz+EIcxg4jIkkCnVFTx5NK/mZsptu3Dc+fs2C2/nVc0arXH3oQqn+oCTVfynXm/6uJAiOLPEhALaiKNB9LwJAiMcI9QCgrDQeu3ApbLDLQ9J/P1Bo6Ib/t8lkd5OiSMOJmGynE2qJ5zmoN7vrHDeQXT/M9PckzqwdSi9IAj/sBZGYz8UvqJrqCAKiV95J2m1TN83OdtPsbvc8LxP6YY/leiv1enOoUav1a5ocxAz9tMDhVz8MoKrX6ylZFn+L43A6FoutAIBEKUWu6wqO43BhGCqSJNmKorDR0VHz8OHDyQsXLtyfy+XeJORE8cr8ShQBPAcBx3GAEAKMMRiGgRljwC7p3pRSFI/HNUmSbqnVairP8wxjTMMwZO/lMFNTU1xl9m97Ko3KurbpJniOCznM2Qjji/9ALOB5pLpumCDEv9XzBY8wpgpYMLX+odOc3SIy1xN87FeMEB75YAHOLJtqrdEYr9bNLZbtxWRZCBAAhy5uIKKUMZ7HnVzPSPfjH/uVa4p7FwXCQqtR677aMf0dEXVuDYJoCCNQLduLn5kr/5Lt+jxlFA31JVu6oZRkzEcAA1c1voce3ee+8Nf7XxYEqcGIP84LpB/CqK/etrZ2HV/3g4j3/EgDhvo2rR/6bk+293shIbIqy14qlT0hJrL2ngf2vHcyd+7cSS5cOLWsKdLPbNsdx5hLe36Qb5tmf7lcjgOiOB43lngev3kjANUrr7zS1263702n0wEhRA3DUIiiCDUaDX5lZYXL5XKGKIoBQghUVSWpVIo7ceJE78DAwD35fP7YwYMHrwCoMKMAoSzLDCGEgiDomZ2d/QYhJLgUmi5+Ll0scoyxGMdxRiwWCwkhqNFogOtePB18rfay3LXszVbXG0EYRf29yX+MJ5IvAZKKDCMW+t31nVbr4TAkQ45n3StL3MkwCGOh5wmd6lIM+2AIiJsD+PwHXODMzH7BNu3RdsvcGUZEzKT1RUNTSpRSalreUERYr+tHGccL1a5b/lCAas+effZz3/ryi+tG3HSpUnvE6vp9tuMlu47PiQIPMUO2+3tzS/me+FupRPqIGtOrfip71UryJfXVOnTouXdCs7vYrMzdurS4dOdKqbOxYzl6EFLkuAEihOph6MfWjqw5wXOxqqhLYSRI1oULon3XXYhdCVC95VV+5mrKHYTQWK1WG261WrJlWTjfk24bunJUkj4coGq1WrphGPfOzMz0drvdxMVqLLu08ZGQyWRQs9nU2+22AgBACIEwDLlOp6M3m82d7XZ7asuWLe8DqPr6+hzHah93bGeYAaiUUs513f53PQxjDDDGEEURcBzHMpmMm0qlmnNzcylZluuKolwEqDrlRqJrNe/rOn5ekaVmLJGa6l/b/3xOzDeDdJKdPfzSnGvhOymFkUbTHleU2NGQULFjN+9DDmKBHyiJtPPtQ4cOnb+c6QUAWD0lKxx4G3RVqaaS8SOiJPiKpBQxx5dbHXOwVq9/lkQ0HvhhasVx5e1Xod0/sMmFQvW/jAz9tZZMHXE6zXsWFlc/RxnLjQ5nL/RkYkdSqeQxQzUWdT13Vs2vLd1zzy5yvf4AwHv7wIHamaa/Uq5Z8WbHkQkhJAwpiwhBPC9FmDEhAgh6RmKVH/+4FOzbd1XBlU3OzETr1uWKqidMN9vkFsuyBMsysSKLXjIZmxVE/q0bAag0TWNBEDjz8/MrjDGMMdYAgLs45J9/VcEuQ6gIIaGiKFQQBIlS2ler1d4HUKmqWjUb5ackWVoriuI2RVHRpee4d/vhOI5cekcky3KrWq3GV1dX5kdH13799tvvughQ6YLGWwCeLAsXUnH9rG7ETibyscZt9zzmAgD8w3e/tBr64Q/Mrt9PKMiiJK9Iolhpt5ufYJQqmVz2JSOWEQcGXO7yXIExhl588asQizJnRTU5L/KiQAlFesxYRjGtipp1QRCkOc8zf0lTZTsNHAewA18vWQMAQIUCZYw1JiefPgyd1WVDVWueb9+eSurVWDw5o8aSpyQpVuVi8c7dd+/xb0Snuu2xx8IDBx5dGAr6/qOhNn8bMCQ8L9SDMOJSSX05noidMzjRUZRkVCg8FhUKhWvVW+jExISNeedk4LtOGPphzFD93mx6JRGLvyoIwg0BVKIo2ul0+odbt249NjQ0dB/HcR8jhKQZY9f1whhjmk6nV3VdKcViseCBBx74AECl6Qv/zvGcLy4XK2vCKBKBMRUQiBhjkeM4RCnlKaW00+n4jUbz9ObNo9/atm3joX379rmX6gYF0Sk3BqOQronFFNaf7jm5Er3V2Lt3krxXFf3m/ng5KK+XFdyT6+1dpICb3UYzRykkkqlEW9F7lmtusnXlqWFsgjt0qKaAA3pAqIIY+Ckstr/63Rf9zZs3sx3jWbVhl/J6KsV6Ysl6G9Z0P8Lnp2hiYgIL9ozhB3Y6GdcUkI1OekBvLCy86O/dO0k/Cj7BGEPPPfdknOtGYxjhwSCKRMKAaJIYxZOJoto7PPfyy0vmh4mPF/v5Vk+z2thbrdcfEgXO4Tj+LM/jVxXdOKrr2fJjjz0W3th4npMURRlzHGdNEATGhxkMQogKgtBIpdTZ9eu51fHxPeEVPAt6bv9+6WhrNVcsNtSBnp5MMq3fTAkbCUgwQCmVHMfN8hy/0mpYf3Hs1Knz999/a1lVh+zCxYN6EW+Ymprije6s2BAVJIoL/q4rZHzGGJqZmRSspbJME72h78+ErpviFIUTpJpP7t4zECB0dRdbKBTwb//2sNhoBNiy1geXgz2MMbR//37ujjtS3G5lC0G7dpFfgJFBExMTOGvbAiwtRTv37fufAKgAzc09I5bP8qofUKyqMgMA8KVYUKuBe6NSwFNPPaVoQjBWqba2MUYEQllRUNDcwIBeeuSRgg8fQZ0fHx/nW60Wn0wmPzTHq9VqkM1mSfajAFSarzSbXcl1A8F1Hey1A15OiEEqNdC4GkD1/w8AxOR/hkNcu4YAAAAASUVORK5CYII=';
			TWProExt.twproext_failure = false;
			TWProExt.twproext_failureInject = false;
			TWProExt.twproext_failureRollback = [];
			TWProExt.twproext_active = true;
			function getPCookie(n){var c='; '+document.cookie+';',s='; twproext_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
			for(var pref in TWProExt.prefs){
				if(getPCookie(pref) == ''){ document.cookie = 'twproext_'+pref+'='+TWProExt.prefs[pref]+'; max-age=5184000'; }
				TWProExt.prefs[pref] = parseInt(getPCookie(pref));
			}

			if (TWPro.twpro_insertList.toString().search(/http:\/\/twpro\.lekensteyn\.nl\/sort\.png/) != -1) {
				TWProExt.twproext_failureRollback.unshift('TWPro.twpro_insertList = ' + TWPro.twpro_insertList.toString());
				try{
					eval('TWPro.twpro_insertList = ' + TWPro.twpro_insertList.toString().replace(old_sort_png,new_sort_png));
				}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
			}

			if(TWProExt.prefs['seticons'])
			{
				TWProExt.twproext_setInfo = {};
				TWProExt.twproext_setInfo.set_farmer = {image:"images/items/yield/mini/pitchfork.png"};
				TWProExt.twproext_setInfo.set_indian = {image:"images/items/head/mini/indian_hat.png"};
				TWProExt.twproext_setInfo.set_mexican = {image:"images/items/head/mini/mexican_sombrero.png"};
				TWProExt.twproext_setInfo.set_pilgrim_male = {image:"images/items/head/mini/pilger_hat.png"};
				TWProExt.twproext_setInfo.set_pilgrim_female = {image:"images/items/head/mini/pilger_cap.png"};
				TWProExt.twproext_setInfo.set_quackery = {image:"images/items/yield/mini/potion.png"};
				TWProExt.twproext_setInfo.set_dancer = {image:"images/items/yield/mini/umbrella.png"};
				TWProExt.twproext_setInfo.set_gentleman = {image:"images/items/yield/mini/cane.png"};
				TWProExt.twproext_setInfo.set_sleeper = {image:"images/items/head/mini/sleep_cap.png"};
				TWProExt.twproext_setInfo.season_set = {image:"images/items/yield/mini/dfgrocket1a.png"};
				TWProExt.twproext_setInfo.fireworker_set = {image:"images/items/yield/mini/bucket_fire.png"};
				TWProExt.twproext_setInfo.gold_set = {image:"images/items/left_arm/mini/golden_rifle.png"};
				TWProExt.twproext_setInfo.greenhorn_set = {image:"images/items/neck/mini/greenhorn_neck.png"};
//				alert('// Original TWPro.twpro_insertList:\n'+TWPro.twpro_insertList.toString());
//				alert('// Inject this:\n'+twproext_insertList);
				if (TWPro.twpro_insertList.toString().search(/twproext_show_set/) == -1 && TWPro.twpro_insertList.toString().search(/twpro_show_set/) == -1) {
					try{
						eval('TWPro.twpro_insertList = ' + TWPro.twpro_insertList.toString().substring(0,TWPro.twpro_insertList.toString().length-1) + twproext_insertList +"}");
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
				}
//				alert('// New TWPro.twpro_insertList:\n'+TWPro.twpro_insertList.toString());
			}
			if(TWProExt.prefs['smallskillicons'])
			{
				var old_skill = [], new_skill = [];
				old_skill[1] = 'var currentJobSkillsDivs = document.getElementById("twpro_currentJobSkills").getElementsByTagName("div");';
				new_skill[1] = 'document.getElementById("twpro_currentJobSkills").innerHTML = "";\nvar currentJobSkillsDivs = document.getElementById("twpro_currentJobSkills").getElementsByTagName("div");';

				old_skill[2] = 'currentJobSkillsDivs[j++].className = "skill_box skill_" + TWPro.skill_to_AttNum[skill_name][0] + " img" + TWPro.skill_to_AttNum[skill_name][1];';
				old_skill[4] = "currentJobSkillsDivs[j++].className = 'skill_box skill_'+TWPro.skill_to_AttNum[skill_name][0]+' img'+TWPro.skill_to_AttNum[skill_name][1];";
				new_skill[2] = "currentJobSkillsDivs[j++].innerHTML = '<img src=\"..\/images\/skill\/skills_'+TWPro.skill_to_AttNum[skill_name][0]+'.png\" width=\"138\" height=\"55\" style=\"margin-left:-'+(28*TWPro.skill_to_AttNum[skill_name][1])+'px\">';";

				old_skill[3] = 'currentJobSkillsDivs[j - 1].title = Character.skill_titles[skill_name];';
				old_skill[5] = 'currentJobSkillsDivs[j-1].title = Character.skill_titles[skill_name];';
				new_skill[3] = "currentJobSkillsDivs[j-1].title = Character.skill_titles[skill_name];\ncurrentJobSkillsDivs[j-1].style.height = '27px';\ncurrentJobSkillsDivs[j-1].style.width = '27px';\ncurrentJobSkillsDivs[j-1].style.overflow = 'hidden';\ncurrentJobSkillsDivs[j-1].style.cssFloat = 'left';";

				old_skill[6] = 'var specialMessage = TWPro.specialMessages';
				new_skill[4] = '$("twpro_currentJobSkills").style.top = "14px";\n$("twpro_currentJobSkills").style.left = "14px";\n$("twpro_currentJobSkills").style.overflow = "auto";\n$("twpro_currentJobSkills").style.width = "276px";\nvar specialMessage = TWPro.specialMessages';
				
				
				if (TWPro.twpro_changeJob.toString().search(/\/images\/skill\/skills_/) == -1) {
					TWProExt.twproext_failureRollback.unshift('TWPro.twpro_changeJob = ' + TWPro.twpro_changeJob.toString());
					try{ 
						eval('TWPro.twpro_changeJob = ' + TWPro.twpro_changeJob.toString().replace(old_skill[1],new_skill[1]).replace(old_skill[2],new_skill[2]).replace(old_skill[3],new_skill[3]).replace(old_skill[4],new_skill[2]).replace(old_skill[5],new_skill[3]).replace(old_skill[6],new_skill[4]));
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
				}
//				alert('// New TWPro.twpro_changeJob:\n'+TWPro.twpro_changeJob.toString());
			}
			if(TWProExt.prefs['fixduel'])
			{
//				to fix game bug in duel window
				if (TWPro.twpro_injectionSwitch.toString().search(/twproext_operaduelfix/) == -1) {
					TWProExt.twproext_failureRollback.unshift('TWPro.twpro_injectionSwitch = ' + TWPro.twpro_injectionSwitch.toString());
					try{ 
						var find_pos = ''
						if(TWPro.twpro_injectionSwitch.toString().search(/case 'after':/) != -1){ find_pos = "case 'after':"; }
						if(TWPro.twpro_injectionSwitch.toString().search(/case "after":/) != -1){ find_pos = 'case "after":'; }
						if(find_pos){
							var inject_pos = TWPro.twpro_injectionSwitch.toString().substring(0,TWPro.twpro_injectionSwitch.toString().indexOf(find_pos)).lastIndexOf('break;')-1;
							var newfunc = TWPro.twpro_injectionSwitch.toString().substring(0,inject_pos) + "else if (twpro_extendeName == 'duel') { TWProExt.twproext_operaduelfix(); }\n" + TWPro.twpro_injectionSwitch.toString().substring(inject_pos);
							eval('TWPro.twpro_injectionSwitch = ' + newfunc); 
						}
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
//					alert('// New TWPro.twpro_injectionSwitch:\n'+TWPro.twpro_injectionSwitch.toString());
				}
			}
			if(TWProExt.prefs['addtrader'])
			{
				if (ItemTraderpage.setTime.toString().search(/twproext_TraderSetTime/) == -1) {
					TWProExt.twproext_failureRollback.unshift('ItemTraderpage.setTime = ' + ItemTraderpage.setTime.toString());
					try{
						eval('ItemTraderpage.setTime = ' + ItemTraderpage.setTime.toString().substring(0,ItemTraderpage.setTime.toString().length-1) + "TWProExt.twproext_TraderSetTime(time,servertime);\n" +"}");
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
				}
				TWProExt.twproext_addTraderButton();
			}
			if(TWProExt.prefs['hideweared'])
			{
				if (TWPro.twpro_highlight.toString().search(/Wear\.wear[twpro_item\.type]\.obj\.item_id==twpro_item\.item_id/) == -1) {
					TWProExt.twproext_failureRollback.unshift('TWPro.twpro_highlight = ' + TWPro.twpro_highlight.toString());
					try{
						var old_line ="var twpro_item = bagitems[twpro_bag].obj;";
						var new_line ="var twpro_item = bagitems[twpro_bag].obj;\nif(typeof Wear.wear[twpro_item.type] != 'undefined' && Wear.wear[twpro_item.type].obj.item_id==twpro_item.item_id){ continue; }";
						eval('TWPro.twpro_highlight = ' + TWPro.twpro_highlight.toString().replace(old_line,new_line));
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
				}
			}
			
			// some temporary bugfixes without config
				if (TWPro.twpro_updateInternalJobInfo.toString().search(/twpro_job\*1/) != -1) {
					TWProExt.twproext_failureRollback.unshift('TWPro.twpro_updateInternalJobInfo = ' + TWPro.twpro_updateInternalJobInfo.toString());
					try{
						var old_index ="parseInt(twpro_job)";
						var new_index = "twpro_jobCount";
						eval('TWPro.twpro_updateInternalJobInfo = ' + TWPro.twpro_updateInternalJobInfo.toString().replace(/twpro_job\*1/g,new_index).replace(old_index,new_index));
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
				}
				if (ItemPopup.prototype.getXHTML.toString().search(/alt=\\*"\\*" style=\\*"position:absolute\\*"/) != -1) {
					TWProExt.twproext_failureRollback.unshift('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString());
					try{
						eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/alt=(\\*)"\\*" style=\\*"position:absolute\\*"/, 'alt=$1"$1" style=$1"position:relative$1"'));
					}catch (e) { TWProExt.twpro_failureInject = true; alert(e); }
				}

			var twpro_support = document.getElementById("twpro_support");
			var twproext_link = document.createElement("a");
			twproext_link.appendChild(document.createTextNode("Extender"));
			twproext_link.href = "http://userscripts.org/scripts/show/93874";
			twproext_link.target = "_blank";
			twpro_support.appendChild(document.createTextNode(" \u2551TW Pro "));
			twpro_support.appendChild(twproext_link);
			twpro_support.appendChild(document.createTextNode(" "+TWProExt.version+" "));
			var twproext_configBtn = document.createElement("a");
			twproext_configBtn.href = 'javascript://Click here to configure TW Pro Extender';
			twproext_configBtn.onclick = function(){ TWProExt.twproext_Config(); };
			twproext_configBtn.innerHTML = '<img id="twproext_config_button" title="TW Pro Extender ' + AjaxWindow.possibleValues['settings'] + '" width="25" height="14" style="background: url(/img.php?type=menu) repeat scroll -128px -181px transparent; vertical-align: text-top;" src="images/transparent.png">';
			twpro_support.appendChild(twproext_configBtn);
			if (TWProExt.twpro_failureInject) {
				TWProExt.twproext_throwFailure();
			}
			if(TWProExt.prefs['checkversion']){ TWProExt.twproext_versionCheck(); }
		}
		
		function twproext_Config(){
			var twproext_xhtml = '<div id="twproext-settings-container">';
			for(var pref in TWProExt.prefs){
				twproext_xhtml += '<div style="padding: 5px;"><label>';
				twproext_xhtml += '<input type="checkbox" id="twproext_' + pref + '" name="twproext_' + pref + '" ' + (TWProExt.prefs[pref] ? 'checked="checked"' : '') + ' /> ' + TWProExt.prefHints[pref] + '';
				twproext_xhtml += '</label></div>';
//				if(getPCookie(pref) == ''){ document.cookie = 'twproext_'+pref+'=1'; }
//				TWProExt.prefs[pref] = parseInt(getPCookie(pref));
			}
			twproext_xhtml += '<div style="text-align: center; padding: 5px; color: red; font-weight: bold;"><label>'+TWProExt.lang.RELOADBROWSER+'</label></div>';
			var header = '<div>TW Pro Extender</div>';
			header += '<span>' + AjaxWindow.possibleValues['settings'] + '</span>';
			showMessage(twproext_xhtml, header, 360, 300, [
				["ok", function() {
					for(var pref in TWProExt.prefs){
//						$('twproext-settings-container').getElement('#twproext_'+pref);
						new_pref = $('twproext-settings-container').getElement('#twproext_'+pref).checked ? 1 : 0;
						document.cookie = 'twproext_'+pref+'='+new_pref+'; max-age=5184000';
						TWProExt.prefs[pref] = parseInt(new_pref);
					}
				}],
				["cancel"]
			], true);
		}
		
		function twproext_throwFailure() {
			if (TWProExt.twproext_failure) return;
			TWProExt.twproext_failure = true;
			for (var twpro_i = 0; twpro_i < TWProExt.twproext_failureRollback.length; twpro_i++) {
				eval(TWProExt.twproext_failureRollback[twpro_i]);
			}
		}

		function twproext_TraderSetTime(time,servertime){
			var timer = $('traderbutton_timer');
			var autoclose = timer.innerHTML.length?false:true;
			TWProExt.twproext_TraderTime = time*1000;
			TWProExt.twproext_TraderTimediff = new Date().getTime()-servertime*1000;
			if(TWProExt.twproext_TraderTimer) window.clearInterval(TWProExt.twproext_TraderTimer);
			TWProExt.twproext_TraderTimer = window.setInterval(TWProExt.twproext_TraderUpdateTimer,500);
			if(autoclose){ AjaxWindow.close('item_trader'); }
		}
		
		function twproext_TraderUpdateTimer(){
			var timer = $('traderbutton_timer');
			if(!timer){ return; }
			var t = new Date().getTime()-TWProExt.twproext_TraderTimediff;
			var dt = (TWProExt.twproext_TraderTime-t)/1000;
			if(dt<600){ timer.style.color = "red"; }
			else if(dt<3600){ timer.style.color = "yellow"; }
			else{ timer.style.color = "white"; }
			if(dt>0){
				timer.innerHTML = dt.formatDuration();
			}
			else{
				window.clearInterval(TWProExt.twproext_TraderTimer);
				AjaxWindow.show('item_trader', {action: 'index', h: h});
			}
		}

		function twproext_addTraderButton() {
			var trader_jpg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBGRXhpZgAASUkqAAgAAAABAGmHBAABAAAAGgAAAAAAAAABAIaSAgASAAAALAAAAAAAAABDcmVhdGVkIHdpdGggR0lNUAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAZAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDz24mitI4x5Fs26FSAY1JJwM5/PPPXn8c77ZL/AHYP+/Cf4U/UP+Phf+uUf/oIqpWCWh0lj7ZL/dg/78J/hQL2YDhYf+/Cf4VXop2EWft8/pD/AN+E/wAKPt8/pD/34T/Cq1FFkBZ+3z+kP/fhP8KPt8/pD/34T/Cq1FFkBZ+3z+kP/fhP8KPt8/pD/wB+E/wqtRRZAWft8/pD/wB+E/wpft8/pD/34T/CqtFFkBtW9yl3HIDFApELEgRqCDg4x+WeOnFdj4Y8KW+p2zX9/wDubKI4RfLXfMR1JyOEzkADk9c157Yf8fX/AGzk/wDQDXov9vpaaVZWr/dCgyIe4x/k1jOXK7I1pw5zsLHwd4Pvbd/9EhLYI3JI2VPrgn+deV6t4f1LR7a5N/boiLL5cUzKq+Zz1THXjrXctFO8MULRKxMYZSgLYBx19643xezLdWtlvytqjsPTkqPrmpjM1nQsr3Mi60+S6SN4oW3CFMMOjHaOD+H86zPsN5/z6T/9+z/hUPY0nc1utDmJ/sN5/wA+k/8A37NO/s+8xn7LN/3waqmlj6UXEWf7Ovf+fWb/AL4NH9n3n/PrN/3wahooux2Jv7Pvf+fWb/vg0f2de/8APrN/3wahpKLsCf8As+8/59Zv++DR/Z97/wA+k3/fBqE0UXYE39n3v/PpN/3waP7Pvf8An1m/74NQUtF2Br2unyWqSPLC27yXyx6Kdp4H4GrU9/KbqwafSnuIbc5Gxjhh6MMVz6/fH1qeocU3dlRk47HoVrrzPaJbzPeWwTdkQScOp+7kjqcflXJ6zJNeX012y7YxEsY3/eY5HP6E5rJooUUVKo2f/9k=';
			var menuElem = new Element('div',{'id':'menu_item_trader', styles:{background:'url('+trader_jpg+') 0px 0px'}});
			menuElem.innerHTML = '<a href="#" onclick="AjaxWindow.show(\'item_trader\', {action: \'index\', h: h});"><span id="traderbutton_timer" style="display: block; text-align: center; margin-left: -10px; padding-top: 4px;"></span></a>';
			menuElem.injectAfter($('menu_inventory'));
			var marginTop =  parseInt($('workbar_left').getStyle('margin-top')) + 27;
			$('workbar_left').setStyle('margin-top', marginTop + 'px');
			AjaxWindow.show('item_trader', {action: 'index', h: h});
			AjaxWindow.toggleSize('item_trader','item_trader');
		}
		
//		to fix game bug in duel window
		function twproext_operaduelfix(){
			var duel_page_npc_duels = document.getElementById('duel_page_npc_duels');
			duel_page_npc_duels.innerHTML = duel_page_npc_duels.innerHTML.replace(/\<strong\>/gi,"").replace(/\<\/strong\>/gi,"");
		}
		
		var last_set_search = '';
		function twproext_show_set(set_searched){
			var new_search = document.getElementById('twpro_set_filters_'+set_searched);
			var friendlyName = TWPro.set_names[set_searched];
			if (friendlyName.charAt(0)=="<"){ friendlyName = set_searched; }
			var search = decodeURIComponent(encodeURIComponent(friendlyName).replace(/'/g, "\\'"));
			var query = document.getElementById('twpro_searchinventory').value==search?'':search;
			document.getElementById('twpro_searchinventory').previousSibling.style.display = query?'none':'';
			document.getElementById('twpro_searchinventory').value = query;
			if(search){
				new_search.setOpacity(1);
				if(last_set_search){
					var last_search = document.getElementById('twpro_set_filters_'+last_set_search);
					last_search.setOpacity(last_set_search==set_searched?0.8:0.5);
				}
				last_set_search = set_searched;
			}else{
				new_search.setOpacity(0.8);
				last_set_search = search;
			}
			TWPro.twpro_searchInventory(true);
		}
		
		function twproext_versionCheck(){
			var twpro_script=document.createElement('script');
			twpro_script.type='text/javascript';
			twpro_script.src='http://userscripts.org/scripts/source/94478.user.js?'+Math.floor(Math.random()*10000);
			document.body.appendChild(twpro_script);
		}
		
		var load_twproext_etc_Counter = 0;
		var load_twproext_etc_Timer = 0;
		function load_twproext_etc_Try(){
			load_twproext_etc_Counter++;
			if(load_twproext_etc_Timer && load_twproext_etc_Counter > 10){
				window.clearInterval(load_twproext_etc_Timer);
			}
			load_twproext_etc();
		}
		
		function load_twproext_etc() {
			if(parseFloat(TheWestApi.version) < 1.3){ return; }
			if(typeof window.TWPro != 'undefined' && typeof window.TWProExt == 'undefined'){
				load_twproext_etc = Function("");
				if(load_twproext_etc_Timer){ window.clearInterval(load_twproext_etc_Timer); }
				try{
					window.TWProExt = {};
					TWProExt.twproext_injectScript = twproext_injectScript;
					TWProExt.twproext_Config = twproext_Config;
					TWProExt.twproext_TraderSetTime = twproext_TraderSetTime;
					TWProExt.twproext_TraderUpdateTimer = twproext_TraderUpdateTimer;
					TWProExt.twproext_addTraderButton = twproext_addTraderButton;
					TWProExt.twproext_throwFailure = twproext_throwFailure;
					TWProExt.twproext_operaduelfix = twproext_operaduelfix;
					TWProExt.twproext_show_set = twproext_show_set;
					TWProExt.twproext_versionCheck = twproext_versionCheck;
					TWProExt.twproext_injectScript();
				}catch(e){alert(e)}
			}
			if(typeof window.TWProExt == 'undefined' && !load_twproext_etc_Timer){
				load_twproext_etc_Timer = window.setInterval(load_twproext_etc_Try,500);
			}
		}
		if (typeof window.addEvent == "function") {
			window.addEvent("domready", load_twproext_etc);
		} else {
			if (typeof window.addEventListener == "function") {
				window.addEventListener("DOMContentLoaded", load_twproext_etc, false);
				// in case DOMContentLoaded is not supported:
				setTimeout(load_twproext_etc, 1500);
			} else {
				setTimeout(load_twproext_etc, 10);
			}
		}
	}
}) + ")();";
insertWindow.document.body.appendChild(sie);
