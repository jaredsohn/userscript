// ==UserScript==
// @name           Dreamhost Pending Reward Days Calculator
// @namespace      http://www.devilsworkshop.org/dreamhost/
// @description    This script calculates number of days left for each pending reward @Dreamhost reward panel. Then it add info like "X Days Left" wherever applicable.
// @include        https://panel.dreamhost.com/index.cgi?tree=home.rew*
// ==/UserScript==

if(unsafeWindow.console.log){
		var GM_log = unsafeWindow.console.log;
	}

//global
var one_day = 1000*60*60*24;

window.addEventListener(
	'load',
	function() {
//code start
		if(document.body.innerHTML.match("Complete History of your DreamHost Rewards")){
			//Use xpath to get all rows first
			var rows = document.evaluate('/html/body/div[1]/div/div[4]/div[1]/table/tbody/tr', document, null, 7 , null);

			for ( i = 0; i < rows.snapshotLength - 2; i++){
				if(rows.snapshotItem(i).innerHTML.match("(pending)")){
					var tds = document.evaluate('td', rows.snapshotItem(i) , null, 7 , null);
					var cont = tds.snapshotItem(0).innerHTML.split(' ')[0].split('<i>')[1].split('-');
					var payDate = new Date();
					payDate.setYear(cont[0]);
					payDate.setMonth(cont[1]-1);
					payDate.setDate(cont[2]);
															
					var today = new Date();
										
					var diff = ( today.getTime() - payDate.getTime() )	/ one_day ;
					
					tds.snapshotItem(0).innerHTML += '<br/><i><b>' + ( 97 - Math.floor(diff) ) + ' days left</b></i>';
				}
			}
		}
//code end	
	},
	true);
