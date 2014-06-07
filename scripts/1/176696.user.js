// ==UserScript==
// @name        MyFitnessPal Macro Fix
// @namespace   http://userscripts.org/users/529952
// @description Enhanced Macro Goals for MyFitnessPal. Set percentages in 1% increments, set targets in grams, set one of the three macros to  automatically fill any remaining calories in your daily goal that are not allocated to the other two macros. Details at http://karoshiethos.com/2013/08/13/javascript-bookmarklet-for-enhanced-macro-goals-in-myfitnesspal/
// @include     /https?://(www.)?myfitnesspal.com/account/change_goals_custom\/?/
// @version     1.3
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
	defaultTypeOptions: '<option value="percentage" selected="selected">%</option><option value="grams">g</option><option value="fill">&harr;</option>',
	initialize: function()
	{
		$('[id^="cwfix_"]').remove();

		RefreshNutrients = this.refreshNutrientsOverride;
		CarbAdjust = ProteinAdjust = FatAdjust = function(){return true;};

		var totalCals = CwFix.getTotalCals();

		$.each(this.macros, function(currMacroName, currMacro)
		{
			$('#goals_'+currMacroName+'_ratio').off('change');
			$('#goals_'+currMacroName+'_ratio').empty();

			for(var i=0;i<=100;i++)
			{
				$('#goals_'+currMacroName+'_ratio').append('<option value="'+i+'"> '+i+'%</option>');
			}

			$('#goals_'+currMacroName+'_ratio').change(CwFix.handlePercentageChange);

			$('#goals_'+currMacroName+'_ratio').before('<select id="cwfix_coltype_'+currMacroName+'">'+CwFix.defaultTypeOptions+'</select>');
			$('#cwfix_coltype_'+currMacroName).change(CwFix.handleTypeChange);

			var gramCount = parseInt($('#'+currMacroName+'_target').text(), 10);
			$('#goals_'+currMacroName+'_ratio').before('<input type="text" size="4" id="cwfix_graminput_'+currMacroName+'" style="display: none;">').val(gramCount);

			timed_field_observer("#cwfix_graminput_"+currMacroName, function()
			{
				CwFix.handleGramInputChange("cwfix_graminput_"+currMacroName);
			});
		});

		CwFix.resetPercentagesFromGrams();

		$('#custom-goals').submit(this.handleFormSubmit);

		var cwFixCookie = CwFix.getCookie();

		if(cwFixCookie!==null && typeof cwFixCookie === 'object')
		{
			var validData = true;
			$.each(cwFixCookie, function(currMacroName, currMacro)
			{
				if(parseInt($('#goals_'+currMacroName+'_ratio').val(), 10) !== parseInt(Math.round(currMacro.p), 10))
				{
					validData = false;
				}
			});

			if(validData)
			{
				$.each(cwFixCookie, function(currMacroName, currMacro)
				{
					$('#cwfix_coltype_'+currMacroName).val(currMacro.t);
					$('#cwfix_graminput_'+currMacroName).val(currMacro.g);
					$('#'+currMacroName+'_target').text(currMacro.g);
				});

				CwFix.handleTypeChange();
			}
			else
			{
				alert('Your macros have changed since the last time you used the bookmarklet, please reset them and save.');
			}
		}
	},
	refreshNutrientsOverride: function()
	{
		var totalCals = CwFix.getTotalCals();

		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			if($('#cwfix_coltype_'+currMacroName).val()==='percentage')
			{
				var newGramTarget = Math.round((CwFix.getTotalCals()*($('#goals_'+currMacroName+'_ratio').val()/100))/currMacro.calsPerGram);
				$('#'+currMacroName+'_target').text(newGramTarget);
			}
		});

		CwFix.updateFill();
	},
	resetPercentagesFromGrams: function()
	{
		var totalCals = CwFix.getTotalCals();

		$.each(this.macros, function(currMacroName, currMacro)
		{
			$('#goals_'+currMacroName+'_ratio').empty();
			var selected = $('#goals_'+currMacroName+'_ratio').val();

			for(var i=0;i<=100;i++)
			{
				$('#goals_'+currMacroName+'_ratio').append('<option value="'+i+'"> '+i+'%</option>');
			}

			var gramCount = parseInt($('#'+currMacroName+'_target').text(), 10);

			var currPercentage = Math.round(100/(totalCals/(gramCount*currMacro.calsPerGram)));

			$('#goals_'+currMacroName+'_ratio').val(currPercentage);
		});
	},
	getTotalCals: function()
	{
		var re_del = new RegExp('\\' + $('#delimiter').val(),"g");
		var re_sep = new RegExp('\\' + $('#separator').val(),"g");
		var calorie_multiplier = $('#calorie_multiplier').val() - 0;
		return (document.getElementById('goals_nutrient_calories').value.replace(re_del,'').replace(re_sep,'.') - 0) * calorie_multiplier;
	},
	updateFill: function()
	{
		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			if($('#cwfix_coltype_'+currMacroName).val()==='fill')
			{
				var allocatedCals = 0;

				allocatedCals += (currMacroName!=='carb') ? (parseInt($('#carb_target').text(), 10)*4):0;
				allocatedCals += (currMacroName!=='protein') ? (parseInt($('#protein_target').text(), 10)*4):0;
				allocatedCals += (currMacroName!=='fat') ? (parseInt($('#fat_target').text(), 10)*9):0;

				var remainingCals = CwFix.getTotalCals()-allocatedCals;

				var newGramTarget = Math.round(remainingCals/currMacro.calsPerGram);
				var newPercentageTarget = Math.round(100/(CwFix.getTotalCals()/(newGramTarget*currMacro.calsPerGram)));

				newGramTarget = (newGramTarget<0) ? 0:newGramTarget;

				$('#'+currMacroName+'_target').text(newGramTarget);
				$('#goals_'+currMacroName+'_ratio').val(newPercentageTarget);
			}
		});
	},
	handleGramInputChange: function(elId)
	{
		var macroName = elId.substring(16,elId.length);

		$('#'+macroName+'_target').text(parseInt($('#cwfix_graminput_'+macroName).val(), 10));

		CwFix.updateFill();
	},
	handlePercentageChange: function()
	{
		var macroName = $(this).attr("id").substring(14, $(this).attr("id").length);
		macroName = macroName.substring(0, macroName.length-6);

		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			if(currMacroName==macroName)
			{
				var newGramTarget = Math.round((CwFix.getTotalCals()*($('#goals_'+macroName+'_ratio').val()/100))/currMacro.calsPerGram);
				$('#'+macroName+'_target').text(newGramTarget);
			}
		});

		CwFix.updateFill();
	},
	handleTypeChange: function()
	{
		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			if($('#cwfix_coltype_'+currMacroName).val()=='fill')
			{
				$('#cwfix_graminput_'+currMacroName).hide();

				$("select[id^='cwfix_coltype_']").each(function(elPos, el)
				{
					if($(el).attr('id')!='cwfix_coltype_'+currMacroName)
					{
						$("#"+$(el).attr('id')+" option[value='fill']").remove();
					}
					else
					{
						$('#goals_'+currMacroName+'_ratio').hide();
					}
				});

				CwFix.updateFill();
			}
			else
			{
				var fillAvailable = true;
				$("select[id^='cwfix_coltype_']").each(function(elPos, el)
				{
					fillAvailable = ($(el).val()=='fill') ? false:fillAvailable;
				});

				if(fillAvailable)
				{
					$("select[id^='cwfix_coltype_']").each(function(elPos, el)
					{
						var currSelected = $(el).val();

						$(el).empty();
						$(el).html(CwFix.defaultTypeOptions);
						$(el).val(currSelected);
					});
				}

				if($('#cwfix_coltype_'+currMacroName).val()=='percentage')
				{
					var newGramTarget = Math.round((CwFix.getTotalCals()*($('#goals_'+currMacroName+'_ratio').val()/100))/currMacro.calsPerGram);

					if(!isNaN(newGramTarget))
					{
						$('#'+currMacroName+'_target').text(newGramTarget);
					}

					$('#goals_'+currMacroName+'_ratio').show();
					$('#cwfix_graminput_'+currMacroName).hide();
				}
				else
				{
					$('#goals_'+currMacroName+'_ratio').hide();
					$('#cwfix_graminput_'+currMacroName).show();

					var newGramTarget = parseInt($('#cwfix_graminput_'+currMacroName).val(), 10);
					if(!isNaN(newGramTarget))
					{
						$('#'+currMacroName+'_target').text(newGramTarget);
					}
					else
					{
						$('#cwfix_graminput_'+currMacroName).val(parseInt($('#'+currMacroName+'_target').text()));
					}
				}
			}
		});
	},
	handleFormSubmit: function()
	{
		var totalCals = CwFix.getTotalCals();
		var fillPresent = false;

		var totalPercentage = 0;
		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			currMacro.colType = $('#cwfix_coltype_'+currMacroName).val();
			currMacro.gramCount = parseInt($('#'+currMacroName+'_target').text(), 10);
			currMacro.percentage = (100/(totalCals/(currMacro.gramCount*currMacro.calsPerGram)));

			totalPercentage += currMacro.percentage;

			if(currMacro.colType=='fill')
			{
				fillPresent = true;
			}
		});

		if(totalPercentage <= 99 || totalPercentage >= 101)
		{
			alert('Macros are out of range, please adjust your choices to meet your total of '+$('#goals_nutrient_calories').val()+' calories');
			return false;
		}
		else if(totalPercentage!==100)
		{
			var offset = (100-(totalPercentage));

			if(fillPresent)
			{
				$.each(CwFix.macros, function(currMacroName, currMacro)
				{
					if(currMacro.colType=='fill')
					{
						currMacro.percentage += offset;
					}
				});
			}
			else
			{
				$.each(CwFix.macros, function(currMacroName, currMacro)
				{
					if(offset>0)
					{
						currMacro.percentage -= (offset/3);
					}
					else if(offset<0)
					{
						currMacro.percentage += (offset/3);
					}
				});
			}
		}

		$.each(CwFix.macros, function(currMacroName, currMacro)
		{
			$('#goals_'+currMacroName+'_ratio').remove();
			$('#custom-goals').append('<input type="hidden" name="goals['+currMacroName+'_ratio]" value="'+currMacro.percentage+'">');
		});

		CwFix.setCookie();
	},
	setCookie: function()
	{
		var payload = {};

		$.each(this.macros, function(currMacroName, currMacro)
		{
			payload[currMacroName] = {
				t: currMacro.colType,
				p: currMacro.percentage,
				g: currMacro.gramCount
			};
		});

		var today = new Date();
		var expire = new Date();

		expire.setTime(today.getTime() + 3600000*24*3650);
		document.cookie = "cwfix="+encodeURIComponent(JSON.stringify(payload))+";expires="+expire.toGMTString();
	},
	getCookie: function ()
	{
		var cwFixCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwfix\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		return JSON.parse(decodeURIComponent(cwFixCookie));
	}
};

CwFix.initialize();
