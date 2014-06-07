// ==UserScript==
// @name           OGame VersionCheck
// @namespace      OGame.Origin Versioncheck
// @description    Checks the OGame version for userscripts
// @version        1.4
// @author		Eleria, Francolino & Origin.team
// @include		http://*.ogame.*/game/index.php?*page=*
// ==/UserScript==

	// Call oGameVersionCheck(scriptName, testedOgameVersion, scriptUrl) at the beginning of your script - document.readyState must be 'interactive' or 'complete'
	// scriptName: name of your script / addon
	// testedOgameVersion: current Ogame version , e.g 5.1.0
	// scriptUrl: URL to your script page, e.g on userscripts.org 
	// For more details see http://board.origin.ogame.de/board6-origin/board38-tools-scripts-skins/4321-ogame-version-check-for-tools-scripts/
	function oGameVersionCheck(scriptName, testedOgameVersion, scriptUrl) {
		// default check false means script is not tested yet
		// default language for ogame.org
		var coms = {
				ae: {domain: 'AE.OGAME.ORG',	text: 'Scripts'		},
				ar: {domain: 'OGAME.COM.AR',	text: 'Scripts'		},
				ba: {domain: 'BA.OGAME.ORG',	text: 'Skripte'		},
				br: {domain: 'OGAME.COM.BR',	text: 'Scripts'		},
				cz: {domain: 'OGAME.CZ',		text: 'Skripty'		},
				de: {domain: 'OGAME.DE',		text: 'Scripts'		},
				dk: {domain: 'OGAME.DK',		text: 'Scripts'		},
				es: {domain: 'OGAME.COM.ES',	text: 'Scripts'		},
				fi: {domain: 'FI.OGAME.ORG',	text: 'Scripts'		},
				fr: {domain: 'OGAME.FR',		text: 'Scripts'		},
				gr: {domain: 'OGAME.GR',		text: 'Σενάρια'		},
				hr: {domain: 'HR.OGAME.ORG',	text: 'Skripte'		},
				hu: {domain: 'OGAME.HU',		text: 'Szkriptek'	},
				it: {domain: 'OGAME.IT',		text: 'Script'		},
				jp: {domain: 'OGAME.JP',		text: 'スクリプト'		},
				mx: {domain: 'MX.OGAME.ORG',	text: 'Scripts'		},
				nl: {domain: 'OGAME.NL',		text: 'Scripts'		},
				no: {domain: 'OGAME.NO',		text: 'Skript'		},
				pl: {domain: 'OGAME.PL',		text: 'Skrypty'		},
				pt: {domain: 'OGAME.COM.PT',	text: 'Scripts'		},
				ro: {domain: 'OGAME.RO',		text: 'Scripturi'	},
				ru: {domain: 'OGAME.RU',		text: 'сценарии'	},
				se: {domain: 'OGAME.SE',		text: 'Skript'		},
				si: {domain: 'OGAME.SI',		text: 'Skripti'		},
				sk: {domain: 'OGAME.SK',		text: 'Skripty'		},
				tr: {domain: 'TR.OGAME.ORG',	text: 'Scriptler'	},
				tw: {domain: 'OGAME.TW',		text: '脚本'		},
				us: {domain: 'OGAME.US',		text: 'Scripts'		},
				// MUST stay at the end to avoid matching on AR FI .....
				org:{domain: 'OGAME.ORG',		text: 'Scripts'		}
		};
	
		var domain							= document.location.hostname.toUpperCase(),
			server							= '',
			titleText						= '';
			
		for (var c in coms) {
			if ((coms[c].domain !== '') && (domain.indexOf(coms[c].domain) > -1)) {
				server						= c;
				titleText					= coms[c].text;
				break;
			}
		}
		// return immediately if site is not from ogame
		if (! server) { return false; }

		// get list (ul) for menubuttons left
		var MenuTableTools					= document.getElementById('menuTableTools');
		
		if (MenuTableTools) {	
		
			var Data						= document.getElementById('oGameVersionCheckData');
		
			if (! Data) {
				
				var ListElement				= document.createElement('li');
				ListElement.innerHTML		= '<div id="oGameVersionCheckData" style="display: none;"></div>'
											+ '<a id="oGameVersionCheckMenuButton" href="javascript:void(0)" class="menubutton"><span class="textlabel">'
											+ titleText + '</span></a>';

				// append new list entry on first place into toolbutton list
				if (MenuTableTools.childNodes.length) {
					MenuTableTools.insertBefore( ListElement, MenuTableTools.childNodes[0]);
				}
				else {
					MenuTableTools.appendChild(ListElement);
				}
				
				Data						= document.getElementById('oGameVersionCheckData');
				Data.parentNode.addEventListener('click', showTools, false);
			}

			if (Data) {
				
				var ogameVersion					= document.getElementsByName('ogame-version');
				ogameVersion						= (ogameVersion && ogameVersion.length) ? ogameVersion[0].content : '9.9.9';
					
				// compare versions
				var versionCheck					= (getVersion( testedOgameVersion ) >= getVersion( ogameVersion ));
				
				// save current script data in html
				var ScriptData						= document.createElement('span');
				ScriptData.style.display			= 'none';
				ScriptData.innerHTML				= '<span>' + scriptName + '</span><span>' + testedOgameVersion + '</span><span>' + scriptUrl + '</span><span>' + versionCheck + '</span>';
				Data.appendChild(ScriptData);
				
				var MenuButton						= document.getElementById('oGameVersionCheckMenuButton');
				
				// color red of menu button text if one script is not compatible
				if (MenuButton && ! versionCheck) {
					// Use higher number to avoid always orange button
					var count						= 6;
					
					if (localStorage) {
						var value					= localStorage.getItem('OGameVersionCheck') || '';
						count						= parseInt( value.split('|')[1], 10) || 0;
						// Reset count when new Ogame version
						if ( value.split('|')[0] != ogameVersion ) { count = 0; }
					}
					
					if ( count < 6 && MenuButton.style.color != '#FF4B00') {
						if (localStorage)			{ localStorage.setItem('OGameVersionCheck', ogameVersion + '|' + (++count) ); }
						MenuButton.style.color = '#FF4B00';
					}
				}
			}
		}
		
		// OK 3.00 - Parse version strings into integer (zb.: 4.1.3 --> 04010300)
		function getVersion(version) {
			// parse ogame-version into integer (zb.: 4.1.3 --> 04010300)
			var temp						= /(\d+)\D*(\d*)\D*(\d*)\D*(\d*)/.exec( (version) ? version.toString() : '' );
			return (temp) ? parseInt(('00' + temp[1]).slice(-2) + ('00' + temp[2]).slice(-2) + ('00' + temp[3]).slice(-2) + ('00' + temp[4]).slice(-2), 10) : 0;
		}
		
		function showTools() {
			
			var ContentWrapper				= document.getElementById('contentWrapper');
			if (ContentWrapper) {
				
				var content					= '',
					Inhalt					= document.getElementById('inhalt'),
					Container				= document.getElementById('oGameVersionCheck');
					
				if (Inhalt)					{ Inhalt.style.display						= (Container) ? 'block' : 'none'; }	
					
				if (Container) {
					ContentWrapper.removeChild( Container );
				}
				else {
				
					Container				= document.createElement('div');
					Container.id			= 'oGameVersionCheck';
				
					if (ContentWrapper.childNodes.length) {
						ContentWrapper.insertBefore( Container, ContentWrapper.childNodes[0] );
					}
					else {
						ContentWrapper.appendChild( Container );
					}	

					for (var i = 0; i < Data.childNodes.length; i++) {
						
						content				+= '<p style="padding: 3px 0px; color: ' + ( (Data.childNodes[i].childNodes[3].innerHTML == 'true') ? 'green' : '#FF4B00' ) + ';">'
											+ Data.childNodes[i].childNodes[0].innerHTML
											+ ' ( <a href="' + Data.childNodes[i].childNodes[2].innerHTML
											+ '" style="text-decoration: none;" target="_blank">link</a> )</p>';
					}

					content					= '<div style="background: url(&quot;http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif&quot;) no-repeat scroll 0px 0px transparent; height: 28px; margin-top: 8px; position: relative; text-align: center;">'
											+ '<div style="font: 700 12px/23px Verdana,Arial,Helvetica,sans-serif; color: rgb(111, 159, 200); padding-top: 3px;">' + titleText + '</div>'
											+ '</div>'
											+ '<div style="background: url(&quot;http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif&quot;) repeat-y scroll 5px 0px transparent; color: rgb(132, 132, 132); margin: 0px; padding: 17px 0px 10px; width: 100%; text-align: center;">'
											+ content
											+ '</div>'
											+ '<div style="background: url(&quot;http://gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif&quot;) no-repeat scroll 2px 0px transparent; height: 17px;"></div>';
												
					document.getElementById('oGameVersionCheck').innerHTML = content;		
				}
			}
		}
	}