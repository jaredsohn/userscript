// ==UserScript==
// @name       MyFitnessPal Food Diary Calorie Fix
// @namespace  http://userscripts.org/users/CaptainWillard
// @version    1.0
// @description  Fix incorrect calorie total in diary based upon actual macro counts
// @match      http://www.myfitnesspal.com/food/diary*
// @grant       none
// ==/UserScript==
window.CwFix = {
	macros: {
		carb: {
			'calsPerGram': 4
		},
		protein: {
			'calsPerGram': 4
		},
		fat: {
			'calsPerGram': 9
		}
	},
	initialize: function()
	{
		$('.food_container tfoot').find('td').each(function(i, el)
		{
			switch($(el).text().toLowerCase())
			{
				case 'carbs':
					CwFix.macros.carb.colIndex = i;
					break;
				case 'protein':
					CwFix.macros.protein.colIndex = i;
					break;
				case 'fat':
					CwFix.macros.fat.colIndex = i;
					break;
				case 'calories':
					CwFix.calorieColIndex = i;
					break;
			}
		});

		var indicesFound = true;

		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			indicesFound = (!currMacro.hasOwnProperty('colIndex')) ? false:indicesFound;
		});

		indicesFound = (!CwFix.hasOwnProperty('calorieColIndex')) ? false:indicesFound;

		if(indicesFound)
		{
			$('.food_container tr.total').each(function(i, el)
			{
				var newTotal = 0;

				$.each(CwFix.macros, function(currMacroName, currMacro)
				{
					newTotal += ($(':nth-child('+(currMacro.colIndex+1)+')', $(el)).text()*currMacro.calsPerGram);
				});

				$(':nth-child('+(CwFix.calorieColIndex+1)+')', $(el)).text(CwFix.addCommas(newTotal));

				if($(el).hasClass('remaining') && newTotal >=0)
				{
					$(':nth-child('+(CwFix.calorieColIndex+1)+')', $(el)).removeClass('negative');
					$(':nth-child('+(CwFix.calorieColIndex+1)+')', $(el)).addClass('positive');
				}
				else
				{
					$(':nth-child('+(CwFix.calorieColIndex+1)+')', $(el)).removeClass('positive');
					$(':nth-child('+(CwFix.calorieColIndex+1)+')', $(el)).addClass('negative');
				}
			});
		}
	},
	addCommas: function(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1))
		{
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}

		return x1 + x2;
	}
};

CwFix.initialize();
