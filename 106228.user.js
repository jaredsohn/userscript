// ==UserScript==
// @name asdfasdasd
// ==/UserScript==
	    
		var Event = YAHOO.util.Event,
		Dom   = YAHOO.util.Dom,
		lang  = YAHOO.lang;

        Event.throwErrors = true;
	    var MyTutorial = new Tutorial();
	    
		var LocalizationStrings = {};
		LocalizationStrings['timeunits'] = {};
		LocalizationStrings['timeunits']['short'] = {};
		LocalizationStrings['timeunits']['short']['day'] = 'ي';
		LocalizationStrings['timeunits']['short']['hour'] = 'ساعة';
		LocalizationStrings['timeunits']['short']['minute'] = 'د';
		LocalizationStrings['timeunits']['short']['second'] = 'ث';
		LocalizationStrings['language']                     = 'ae';
		LocalizationStrings['decimalPoint']               = '.';
		LocalizationStrings['thousandSeperator']     = ',';
		
		LocalizationStrings['resources'] = {};
		LocalizationStrings['resources']['wood'] = 'مادة صناعية';
		LocalizationStrings['resources']['wine'] = 'مشروب العنب';
		LocalizationStrings['resources']['marble'] = 'رخام';
		LocalizationStrings['resources']['crystal'] = 'بلور';
		LocalizationStrings['resources']['sulfur'] = 'كبريت';
		LocalizationStrings['resources'][0] = LocalizationStrings['resources']['wood'];
		LocalizationStrings['resources'][1] = LocalizationStrings['resources']['wine'];
		LocalizationStrings['resources'][2] = LocalizationStrings['resources']['marble'];
		LocalizationStrings['resources'][3] = LocalizationStrings['resources']['crystal'];
		LocalizationStrings['resources'][4] = LocalizationStrings['resources']['sulfur'];


		LocalizationStrings['warnings'] = {};
		LocalizationStrings['warnings']['premiumTrader_lackingStorage'] = "Für folgende Rohstoffe fehlt dir Speicherplatz: $res";
		LocalizationStrings['warnings']['premiumTrader_negativeResource'] = "Du hast zuwenig $res für diesen Handel";
		LocalizationStrings['warnings']['tolargeText'] = 'انتباه! يشمل نصك على عدد حروف أكبر من العدد المسموح به!';

		IKARIAM = {
				phpSet : {
						serverTime : "1309964401",
						currentView : "city"
						},
				currentCity : {
						resources : {
								wood: 3000,
								wine: 3000,
								marble: 8000,
								crystal: 8000,
								sulfur: 8000						},
						maxCapacity : {
								wood: 33500,
								wine: 33500,
								marble: 31900,
								crystal: 33500,
								sulfur: 33500						}
				},
				view : {
						get : function() {
								return IKARIAM.phpSet.currentView;
								},
						is : function(viewName) {
								return (IKARIAM.phpSet.currentView == viewName)? true : false;
								}
						}
				};
				IKARIAM.time = {
						serverTimeDiff : IKARIAM.phpSet.serverTime*1000-(new Date()).getTime()
				};

