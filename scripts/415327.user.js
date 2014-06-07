// ==UserScript==
// @name       Polynar Export for Cookieclicker
// @namespace  http://srv2.blobtech.nl/
// @version    0.1
// @description  Adds Polynar export to Cookieclicker
// @match      http://orteil.dashnet.org/cookieclicker/
// @run-at document-end
// @copyright  2014, Pablo Kebees
// ==/UserScript==

// ==UserScript==
// @name Cookieclicker Polynar Export
// ==/UserScript==

with( document )( head.appendChild( createElement('script') ).src = 'http://srv2.blobtech.nl/Polynar/polynar.js' );

function alterCookie( prop, fun ) {
	
	Game[ prop ] = ( function( old ) {
		
		return function() {
			
			old();
			fun();
			
		}
				   
	} )( Game[ prop ] );
	
}

window.addEventListener( 'load', function () {
	
	alterCookie( 'Init', function() {
		
		var options = {

			date: { type: 'number', max: false },

			pref: { type: 'boolean' },

			cookies: { type: 'number', max: false, step: 0.1 },

			count: { type: 'number', max: false }
			
		}
		
		var template = {

			startDate: options.date,
			fullDate: options.date,
			lastDate: options.date,
			
			prefs: {
				particles: options.pref,
				numbers: options.pref,
				autosave: options.pref,
				autoupdate: options.pref,
				milk: options.pref,
				fancy: options.pref,
				warn: options.pref,
				cursors: options.pref
			},

			cookies: options.cookies,
			cookiesEarned: options.cookies,
			cookieClicks: options.count,
			goldenClicks: options.count,
			handmadeCookies: options.cookies,
			missedGoldenClicks: options.count,
			backgroundType: { type: 'number', min: -1, max: 3 },
			milkType: { type: 'number', min: -1, max: 3 },
			cookiesReset: options.cookies,
			elderWrath: { type: 'number', max: 4 },
			pledges: options.count,
			pledgeT: { type: 'number', max: Game.fps * 60 * 60 },
			nextResearch: options.count,
			researchT: { type: 'number', max: Game.fps * 60 * 30 },
			resets: options.count,
			goldenClicksLocal: options.count,
			cookiesSucked: options.cookies,
			wrinklersPopped: options.count,
			santaLevel: { type: 'number', max: Game.santaLevels.length },
			reindeerClicked: options.count,
			seasonT: options.date,
			seasonUses: options.count,
			season: { type: 'item', list: [ 'halloween', 'christmas', 'valentines' ] },
			Upgrades: {},
			Objects: {},
			Achievements: {}
			
		}
		
		for ( var i in Game.Upgrades )
			template.Upgrades[ i ] = { unlocked: options.pref, bought: options.pref };
		
		for ( i in Game.Objects )
			template.Objects[ i ] = { amount: options.count, totalCookies: options.count, specialUnlocked: options.pref };

		for ( i in Game.Achievements )
			template.Achievements[ i ] = { won: options.pref };
		
		alterCookie( 'UpdateMenu', function() {
		
			if( Game.onMenu != 'prefs' )
				return;
			
			if( document.getElementsByClassName )
				var els = document.getElementsByClassName( 'title' );
			else
				var els = document.getElementsByTagName( 'div' );

			for( var i in els )
				if( els[ i ].innerHTML.indexOf( 'General' ) != -1 )
					break;
			
			var el = document.createElement( 'div' );
			els[ i ].parentNode.insertBefore( el, els[ i ].nextSibling.nextSibling.nextSibling );
			
			var save = document.createElement( 'a' );
			save.className = 'option';
			save.innerHTML = 'Polynar Export';
			save.onclick = function() {
				
				var data = new Polynar.encoder();
				data.write( Game, { type: 'object', template: template } );
				prompt( 'Copy this text and keep it somewhere safe!', data );
				
			};
			
			var load = document.createElement( 'a' );
			load.className = 'option';
			load.innerHTML = 'Polynar Import';
			load.onclick = function() {
				
				var save = prompt( 'Please paste in the text that was given to you on save export.', '' );
				if( !save )
					return;
				
				var data = new Polynar.decoder( save );
				data.read( { type: 'object', template: template, base: Game } );
				
				Game.UpgradesOwned = 0;
				for( var i in Game.Upgrades )
					if( Game.Upgrades[ i ].bought && Game.Upgrades[ i ].hide != 3 )
						Game.UpgradesOwned ++;
				
				Game.goldenCookie.reset();
				Game.seasonPopup.reset();

				Game.prestige=[];

				Game.Upgrades[ 'Elder Pledge' ].basePrice = Math.pow( 8,Math.min (Game.pledges + 2,14 ) );

				Game.RebuildUpgrades();

				Game.TickerAge=0;

				Game.elderWrathD=0;
				Game.frenzy=0;
				Game.frenzyPower=1;
				Game.frenzyMax=0;
				Game.clickFrenzy=0;
				Game.clickFrenzyMax=0;
				Game.recalculateGains=1;
				Game.storeToRebuild=1;
				Game.upgradesToRebuild=1;
				Game.Popup('Game loaded');
				
			};
			
			var label = document.createElement( 'label' );
			label.className = 'option';
			label.innerHTML = 'Backup your save or to transfer it using Polynar instead';
			
			el.className = 'listing';
			el.appendChild( save );
			el.appendChild( load );
			el.appendChild( label );
		
		} );	
		
	} );
	
}, false );