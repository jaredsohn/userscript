// ==UserScript==
// @name        Tribunal Auto Punish
// @namespace   modern.elementfx.com
// @include     *.leagueoflegends.com/tribunal/*
// @version     4
// @grant       none
// ==/UserScript==


var minimumReportsToPunish = 2;


var TribAP = {
	'dom': {},
	
	'init': function ()
	{
		TribAP['dom']['limit']  = document.getElementById('finished_info_title');
		TribAP['dom']['start']  = document.getElementById('hammer_start');
		TribAP['dom']['guide']  = document.getElementById('guidelines_buttons');
		TribAP['dom']['timer']	= document.getElementById("clock");
		TribAP['dom']['punish'] = document.getElementsByClassName('punish')[0];
		TribAP['dom']['pardon'] = document.getElementsByClassName('pardon')[0];
		TribAP['dom']['reports'] = document.getElementsByClassName("total-reports-fill")[0];
	},
	
	'get_page': function ()
	{
		var page = false;
		
		if (TribAP['dom']['punish'])
		{
			page = 'punish';
		}
		else
		{
			if (TribAP['dom']['limit'])
			{
				if (TribAP['dom']['limit'].innerHTML.toLowerCase().indexOf('recess') > -1)
				{
					page = 'recess';
				}
				else
				{
					page = 'limit';
				}
			}
			else
			{
				if (TribAP['dom']['start'])
				{
					page = 'start';
				}
				else
				{
					if (TribAP['dom']['guide'])
					{
						page = 'guidelines';
					}
				}
			}
		}
		
		return page;
	},

	'process': function (page)
	{
		if (page)
		{
			console.log('TAP: ' + page);
		}
		
		switch (page)
		{
			case 'punish':
				// remove the timer and click the punish button
				TribAP['util'].remove_countdown();
				setTimeout(TribAP.judge, 2500);
			break;
			
			case 'limit':
			case 'recess':
				// refresh page after 30 seconds
				setTimeout(function () { window.location.href = window.location.href }, 30000);
			break;
			
			case 'start':
				TribAP['dom']['start'].children[0].click();
			break;
			
			case 'guidelines':
				TribAP['dom']['guide'].children[1].click();
			break;
			
			default:
				console.log('TAP: Page not recognized');
			break;
		}
	},
	
	
	'judge': function ()
	{
		// console.log(TribAP['dom']['reports'].innerHTML);
		var reports = parseInt(TribAP['dom']['reports'].innerHTML);
		
		if (reports > minimumReportsToPunish)
		{
			console.log(reports + ' reports... Punishing');
			setInterval(function () { TribAP['util'].punish() }, 1000);
		}
		else
		{
			console.log(reports + ' reports... pardoning');
			setInterval(function () { TribAP['util'].pardon() }, 1000);
		}
	},
	
	
	
	
	
	
	

	'util': {
		'remove_countdown': function ()
		{
			if (TribAP['dom']['timer'])
			{
				TribAP['dom']['timer'].innerHTML = 0;
			}
		},
		
		'punish': function ()
		{
			if (TribAP['dom']['punish'].className.indexOf("disabled") == -1)
			{
				TribAP['dom']['punish'].click()
			}
		},
		
		'pardon': function ()
		{
			if (TribAP['dom']['pardon'].className.indexOf("disabled") == -1)
			{
				TribAP['dom']['pardon'].click()
			}
		}
	}
}

TribAP.init();
TribAP.process( TribAP.get_page() );