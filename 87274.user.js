// ==UserScript==
// @name			Ikariam Spy Tracker
// @namespace		userscripts.org
// @homepage		http://userscripts.org/scripts/show/87274
// @description		Take control of your spies with Spy Tracker. Send spies, execute spy missions and pillage using the compact pad interface. Resource information is collected from spy reports and combined with cached target city data to provide an overview of available resources. Tested with v0.4.2.
// @version			1.0.1
// @include			http://s*.ikariam.*/index.php?action=Espionage*
// @include			http://s*.ikariam.*/index.php?view=safehouse*
// @include			http://s*.ikariam.*/index.php?view=safehouseReports*
// @include			http://s*.ikariam.*/index.php?view=plunder*
// @include			http://s*.ikariam.*/index.php?view=city*
// @include			http://s*.ikariam.*/index.php?view=island*
// @include			http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*
// @include			http://s*.ikariam.*/index.php?view=militaryAdvisorCombatReports*
// @include			http://s*.ikariam.*/index.php?view=premiumDiplomacyAdvisor
// @include			http://s*.ikariam.*/index.php?view=premiumMilitaryAdvisor
// @include			http://s*.ikariam.*/index.php?view=sendSpy*
// @include			http://s*.ikariam.*/index.php?view=spyMissions*
// @include			http://s*.ikariam.*/index.php
// @exclude			http://support*.ikariam.*/*
// @license        	GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html), Copyright (c) 2011, bt_viper
// ==/UserScript==
//
// Version history:
// 1.0.1/29.03.2011 Fix: Wrong report ages and negative production rates sometimes displayed in city tooltip
// 1.0.0/28.03.2011	Feature: Support for Ikariam v0.4.2 with the whole new spy system
//					Feature: Daily production rate calculation and prediction of current resource amounts
//					Feature: Confirm removal of city from Spy Tracker
//					Feature: Compact Send Spy and Spy Mission views (large images removed, layout optimised)
//					Feature: Version update notification mechnism, update button displayed in pad header when update available
//					Change: Removed "Enhanced by Spy Tracker" from pillage view
//					Fix: Visiting a city view disabled "Send Spy" -button
// 0.9.1/29.11.2010 Feature/fix: Multiwarehouse support. Warehouse level is the sum of all the warehouse levels
// 0.9.0/29.11.2010	Feature: Mouseover tooltip displaying city details and associated spy reports
//					Feature: Calculation and display of resource growth rate in tooltip
//					Feature: Spy Mission button, visible after a warehouse spy report has been visited
//					Feature: Send Spy button, visible after a spy has been sent to the city
//					Feature: Display accurate journey time in city tooltip
//					Feature: Display details of last report in pillage/plunder view
//					Feature: Sort pad by clicking on table column headers
// 					Feature: Show script version in pad
// 					Change: New database structure, old data discarded (restored if reverting to old version of the script)
//					Change/fix: Pad visible in city and island views even when there is no view defined in url like after selecting city from dropdown
//					Feature/change: Display pad in island view
//					Change: City link will jump to island view instead of city view
//					Change: Store maximum of 8 reports per city
//					Fix: Show luxury resource symbol if a non-empty report exists even if last report is empty
//					Fix: "Jump to island view" tooltip on name even if no link is available
//					Fix: -1h displayed as information age after manual clear
//					Fix: Clickable elements not visualised properly
// 0.1.9/5.10.2010	Fix: Calculation of information age should use server time not local
// 0.1.8/4.10.2010	Feature: Multidomain/server support, separate Spy Tracker databases for each.
// 0.1.7/4.10.2010	Fix: Safelevels of ACTIVE cities are slightly incorrect (~1 ship)
// 0.1.6/4.10.2010	Feature: Set city active/inactive by clicking the total lootable value.
//					Inactive city name displayed in italic. Warehouse safelevels 
//					calculated according to this setting.

// 0.1.5/4.10.2010	Feature: Pad displayed in safehouse view
//					Feature: Display time elapsed since last spy report or user performed clearing
//					Fix: Wrong dominant luxury resource image sometimes displayed
//					Fix: Journey time transparent background color wrong
//					Fix: City name too close to table border
//					Fix: Wall icon too wide and unclear
//					Fix: Luxury resource tooltip does not describe the logic
//					Fix: Wood icon displayed even if total lootable = 0
// 0.1.4/4.10.2010	Bug fix: Conflict with "City Select Re-orderer" script. Spy Tracker was unable to 
//					initialise properly if "City Select Re-orderer" was not running.
// 0.1.3/4.10.2010	Some dead code removed and more debugging messages added
// 0.1.2/3.10.2010	Syslogging enabled for beta testing purposes
// 0.1.1/3.10.2010	Fix: Invalid link and journey time displayed if no city information available
// 0.1.0/3.10.2010 	Initial Release 
// 
//
// Known problems:
// - NaN displayed as wall level if no wall in target city

/* Internal todo
- 
*/

/* Roadmap
[HIGH] Automatically fill maximum spies to be used in spy mission
[HIGH] Storing of latest garrison information (minimum as text)
[MED] Command pad on top with multiselection feature.
[MED] Command Pad - Selection checkboxes for cities. Highlight selected rows.
[MED] Command Pad - Auto spy mission (warehouse) launching from pad. Single or multiple cities.
[MED] Summary tooltip displaying status of all hideouts and their spies (this would be propably considered a Ikariam Plus feature)
[MED] Settings dialog
[MED] Add more info to tooltip
  * User actions (pillage, clear total lootable)
  * Pillage results
  * Other spy mission results (especially garrison with troop information)
[MED] Deduct send out ships on pillaging mission automatically from total lootable
[MED] Gather information from combat reports
[MED] Combat reports - Calculate and display whether the pillage was complete or not (are more resources available)
[LOW] Indication of column sorted by
[LOW] Filter spy cities based on current city selection
[LOW] Propose needed troops in the pillage view based on the wall level
[LOW] Use Visual Map map component for visualising the current status of each tracked city
[LOW] Set wall and warehouse levels manually by clicking some field/button in pad
[LOW] "Add to Spy Tracker" button to island view (like in Favorite Targets)
[LOW] Gather information from Spy house
[LOW] Localisation (multilanguage)
[LOW] All images should be inline with correct size
 */
const version = '1.0.1';
const scriptURL = 'http://userscripts.org/scripts/source/87274.user.js'
const scriptMetaURL = 'http://userscripts.org/scripts/source/87274.meta.js'
const scriptHomepage = 'http://userscripts.org/scripts/show/87274';
const updateCheckInterval = 24*60*60*1000; //24 hours
const versionTag = '// @version';

const syslogLogLevel = 2;  // Higher number results in finer logging, 1-4
const syslogJavaConsoleEnabled = true;
const syslogFirebugEnabled = true;
const currentDBVersion = '3b';
const maxSpyReportsPerCity = 8;

//var autoFillMaxSpiesForMission = true; // not yet working
var compactSendSpyView = true;
var compactSpyMissionView = true;
var updateButton = null;

const IMAGES =
{
	abort:				'skin/interface/btn_abort.gif',
	buildingWall:		'data:image/gif;base64,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',
	buildingWarehouse: 	'data:image/gif;base64,R0lGODlhJAAZAPcAACwmJOSWPIxeLLSqpHBiXOzYpPy+ZFBCNJx+XOTe1LSWfIxKLKR6RExGRJxuXMyufJCCfKxiRIR0XODWxNTCpNy6hFwyJHxeRKGalHROLPzy1FA2JPHixPzOhLSKXJRuTHxybOSqTExCPLyWfKSOfLy2rOjSpKReRHRqXFxSROjYzPTGhLSKRPr07EE3NKSKZPzq1LyYZKR6TMSqlIRmREguHKxMLNTGtLSmlHxubGdaVPzerGRKNI9+bJSKjNxuRJR6ZPjevGxONIl6bLyifMC5tH9rXF5DLJSKfI9zXNS+nPTqzOjOnLiQZHRaRPz67Pzi1LShjOTChKiilFE+LPHlzFtKPJ+SjMy2lDcwLL+jjNyiRIxqPLyypOzatOi6fKx3XNhqRGFVTPHJlEk+NKyCTGxmVKxaPOTKtHhUNH1tZPTalO7YrOzm1KCWjMSCPOTevG5gVPz15Ec4LLSCbJx2TOSqbF9GPLSSfODQtO/ezPTu5NSmXLqrnJyGdIV6dMS+tJBYRJBkPOyeVPe2XIxqVFw6JMSsjNRuVLBoRNSKbLySVKSOdMB+PHw6JNS+pOTCfOSuXPz+/OSqjF5ORKRyPKyGXMSWjEQmHKRiJMRePLx2XL5YNNyeRHxWJKySbPzWjMR2VPzCdKROLMyGXPzSnNSmjKyqrNy+jKyenJmOhEAwJLSmnOzitIx+dMSmhH5mVOy+bIRuVGBOPJeKhOHCjJ9/ZIJyZNDDrHx2dO/HjPT29PTr3J57VNDJvPTcxGBGNI92ZLSObPTm3MSynNSmTKh4ZLGFVHRWPPnZnMyiZOSaRJyGfHxiTPzz3PzmxGxWRLyWbIRoTMSilMymfPz99GxWTKyajMSGRMSunFw+LKSShJyCdODe3KyWhHJqZGxaTKminEQ+PNzKvOnexJh2VMyKdNC+rOy6hPTSpJR6bKSKfLyyrOzm3PzezPTu7MS+vPzitOzCjDQqJLiupHFmXFRGNFRKRJSGfHxSLFQ6JPTmxIJ2bFJGPKBiRGRWRCH5BAEAAJIALAAAAAAkABkABwj/ACUJHEiwYMEEvgwqXMhwYDVuCuQUkNOwosJq3aoBWnXoRbZuFkNK8mVKiw06d6hIQ3FKZEN3ivqoc8ApTKB5VoTAc6mwxSROiYydsdnADIAsG1yEq8ZTYIsguoQFA4PoBycLIlxAgzbLiLiELqtx2PFAGrB+YryF0sTJUZZ7/azMscbLJZRoqKLwuCN3XhxGpDSNWoDJxQErlOqGbGEE3wxj5uL0m5flE5MViWycgEXJyiwrvBRXfKKjh5Ec0y7BklArWYVy/gqlQEGmnz17wRBgEb3QmQ4cV9yAuDYiWS1LEcAg5qfjABlgR2qkQdaC4a49U3RI4KeqixoMYPxt/7pzBYQrEGLmUEmTwZAQfazeLcSF716cP3HE1ZsSB48RP9+48k0zToCzCjgffCAIMnN808cTTA3UzitN1INENrnEkQUAOtwChCq0qPIHJUdoA4w1wHBRThxqsIOBGsSQs4tAchBRiQc9DIDLOVqokQU4cfSAAS20GHHEBlRoA4st2tAQDg5/8DNEPhecwxQvljDQhBy49DGACnpkc0sctlyhCgj/1HBEFLCIccs44SBBwC2y9MLCIiQ8IRA1nhyyhxYaUEBPEcNEEYcRbvyhBj6AcEPGHD4UgY8a/NxSxzEx1MIBQRxYcowcepDDgR64wOMLGkmsk8QQKpRADyvspKfCjytG9CLAG+iwESFBS5igCxsctELOHhMUsc0NjyhxQxHMADIAP98M0csx2CwjDwy7GvTEGkywMUYyUoAyRh5BeAHHBCJCwI8tMsTQyRf7ZLtQNc+UIkosxUACSgdstFEFAfVAkEQvDEQySDrO8PSEMwWYwAchhBigSx5/BCNIGcp8EYQGejY1kAbxEBLCFgE0kkkjdgTRsccFVfNEFb/84m0V8jIUEAA7',
	clear: 				'data:image/gif;base64,R0lGODlhIAAgAPcAAAQCBIx+BNzCDOS+fFRCBMy+NJx+bMSiFHxabOzeXOzWNPzuhHRiDCwaRCQiBJSCPPzuXPTidOTSHNTCTLyeTIxuVOTWTIxiHMSWDBwSBFxSBNzKNPTmXDwyBIxelMy2PNzGJLyORLx+HMyiXHxyBNzKRGxCDPzynNSeRPTiVOTKDOTWROzaLDQWBPTmbFQ+LOSuXAwKBOzebFwqBJxyJOTSNGQ6DJR2jIRuFMR+FNzOXMy2FJR2XPzylCwqBJyCRPzudPzqdOTSLPTeTKSWJHRSFPTmZNyqXNymTOTKHGRCFNS+RIRefOzeZPTePPz2jOTOTBwaBDw6BMSaVJyKDGRKBNS+POTWPPzujKyGNOTSJOzWVJRmLPTqXNS6ROTOLNSWNMSGHMymZIR2BGxKDNzKFAwKDOTSPJx2rOzaXMyyNPz2dMyOLOTOVAQGBIx+DExGBHxShHRmFDQiBOzefLSeVJxqJBwWDHReDOTOPIxmnMy6PNzKLHxuDOTSRPz2pMyeVFw+bJx+pLyqNGxeFKyaHDQeBNSybNSyJMyaRJRynOzWbLR6JHxqJPzubPzqTHRqBMy6LDwqDLSaLMymVLyKPOzeRIRahIR2FEQ2DMSCJPTmfEQ+DMyKJNzGFEQSBBwOBJx+TPzyfNSaPHxODNyqVGRSDOzeVHxSHNSqZIxenNSeTJR2lLyGNPTiXCwmBOzaTOTONNSmXOTORBQOBPTibFw+DDQuBOzWLPzqZIxifOziZCQeBEQ+BOzaPOzWJOTOFJSCDLyiVOzaNPzyhBwWBGxGDPz2nPTmVOzeLPTqbIRyFMSCFPzydOTOHOTSTNTCPPzyjOzaVMySLOTSVOzifHxyDOzabPTqfOy+fNS+NOzSHPzmXOzWRKRyJOzSNPzqXNSmZOTKFOzSPAwGBFRGBNS6POTKLPTiZABlHACDFwB8AAG4ZABkZACDgwB8fBoASAAAHAAAFwAAAAAwYQAA/QAAAAAAAAARAAAAAAAAAAAAABVxtgA56gDXRwBaACH5BAEAAAAALAAAAAAgACAABwj/AAEIHEiwoMGDCBMinGPLRguFEAuSIzNFzIAsoCJqNHaIywxK4QxphDhnRCpDhgCFyDBS4YVsq0h5O1KkZcJPFGAgQVGqkkibB03IQjFqVCJjQA/GoIFiGhswdlgmLWioFZswnRhJmjqwA5xbVTTlyCFCCdeBY9AleIYIAzNUtM4CMNOIDpA1RnZpY+BGbiBBNwzUKfEohTQqMbhy4sFKERo9ukJ5KdCLK6RTxHQIq8DEg6pLL7iSkPHEkSMIlvb8QBCnwVQNTZ40A5KryxAnyQo8uJNUyrNoooAYyZWihi9cLPKUA+qgQDRiPdB14dCtxjAtEs4wsBmjEJZoJyK4wwKXIpYCXEmAnVnW0k0wbMc2bZLWBVktPyy0eFJxBdPIGG9scowFMqThCjLKXPMNegKosAIOI5FQyx8b+BGBNBwYUY0fuEjgyTnAWIDHSD5EwgcIF6aQiwxtfPOLOHxQ44w0HbQUQwCuRAALNy5AAwUuzpTRRh6/QFGMTeRYI00QC0BjxTjbiJPHBF/4MkhfQL1CxCw7LOKLBF8soYYQpxByFi99fLCFNFscYI4RUEQhFwAx8JKJKQQsM4kcc/bpZ0EBAQA7',
	city: 				'skin/layout/city.gif',
	crate:				'skin/layout/crate.gif',
	growth:				'skin/icons/income_positive.gif',
	info:				'data:image/gif;base64, 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',
	journeyTime: 		'data:image/gif;base64, R0lGODlhJAAWAPcAAP333fa9P8PyXG7bSb2yj2TcL/fVSP///8i2iikcDOjYflVCLXbgN+aqOm3eM6eab4VWH8+aPG4qCrJvJZfoR7XvVYbkP6/tUqDqS37iO4/mQ1XYKH5pT7vwWNz0i6XabqfsTlzaK+Xo6u71yo5BCUzWKb5rF9PDZJB6X+GgMbFkFk3XJOHInfrist3xt0HUHsjDrvLaq9O7k0fVIdnZl63pf6zohpdDDvT20vj21/v329HPwn3gSzvSHO/v8N/gnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAkABYABwj/AAEIHEiwoMGDCBMeDMCwocOGERoEUKhQYoAGDVJEUHFDggQSKlRASEAx4YQUGDNuJOGRhIkJExaUHIjDxcAHCxLo3MlT5wIEMwWOYFAjh0AWHB4QWMp0KU4ZQYUycMDDZgsUB7IeEMFVxI4dC1pEBTDUQYECNnQQeKBVK1cUHAx6EEC3wgUQGChosJBh6tkNA348OKHghGEUaznEkFvXLl69fP2G2LCixIelhSM84IBCLOPGj/f2NTu58osBNAiwQLEAKsK5oPOKlkx5xoseJRAoWPBAIewOjmVHJl37NFsFBHgvPvg7OOTRfytfzoo8+U/msYVDn4waho8DChREV1jKYQGLsWQlp4VBXUEKmOTjji1bFUAL9uDdT4AAYemC5UENVdRRxynQQAT78ZecawHaJNBDED6E3kAYNXSgCR19ZIJIJE0IgEUGXBQBhi29NJKHKAIQEAA7',
	luxuryWorker:		'skin/characters/40h/luxuryworker_r.gif',
	pillage:			'data:image/gif;base64,R0lGODlhMgAiAMQAAOF7WmBLMeiEYvrEg+aBXlMXAbVeQKZRM9x1U24qEpNDJsNlQ71hQM5sSqR9V6aDWUAzH4E3HffCf9NvTXthQoxpR8pnR8loRuR/Xl8cAq9eQKteP6F7VnpgQvvGhEI2ISH5BAAAAAAALAAAAAAyACIAAAX/YOWM5GOeaKqWbNsGlSTPXm3feK4PPO3LnxhlSCwaO8ikcsk8FiVBCYVDrVqv2Kw2G+hAhRwBYYwpm8/otHoNwHS/0jB5Tq+z7+d3tCO3jw0JBm1+dAYRB3d6YGKEBAkZGQoIhA0KkBmDfooDfIyenweXGYJ1BqIKjQKbnZ+tCKKjdKGiDamrfa2eEbCoYpaiEbl0t8KfE7CRAr+0xYzEzYzHp8uXtamqXnu4qQ2XCtSQ1tfP12Pd38jieATEme7vABPgGRfw9m7ZYPf289/777cQCBxIsOCBBch+GThQsOHAgBMiSpwoUUGBQBkKFIikUUGCAgcoiox4a2SDkygbzXy8GApjAY8aE6ScmfKWhQs4b+bceSGCxo0KFuA8sPIiz6M4bQpdynTpt6JBhVr8eUBD06sWlGJ12jFCgoNMvR7SCHbrglsM0qpVe3AqyLVw07o9aCBuWrR2GVz0+Tbv2qkRLOXFW7dw3ZiHDCte7HHq4rqEF/8M9LiyoZ+VIysOxdLy4gM/FWTO54GPAQ2oU6tezbq169W3Xm+YTbu27du4ba+qAOGD79/AgwsfTry3cQikOwRYzry58+fQo0v3EGWH9evYrRffzr178RAAOw%3D%3D',
	remove: 			'data:image/gif;base64,R0lGODlhEAAQAPcAAAQCBDQ2NHwCBGQeHBweHDQGBBQODIQODBwCBJQeHJwODERGRKQmJBwKDJQiJKQWFHQyNHwKDDQSFCwCBBQCBCQODIQSFJwSFFRSVFQaHBwGBKQaHFxKTLQmJIwyNAwGBHwGBFQCBJQODKQiJIwKDEwSFCwSFKwSFLQqLAwCBDw+PHQiJBwiJBQSFIwODCQCBJweHKQODExKTCQKDJwiJKwWFGw2NIQKDCwGBBQGBCwODJQSFKQSFFweHCQGBKQeHGRKTJQyNIQGBFwCBFQSFLwqLJHYAHxaAIWAAedDwoEDQnwAfgAVAAAAABYAAAAAAGAlAQMAAAAAAAAAAMjsATjqABoTAAAAAKgDAHrWABbYAABaAACAAQBDwgADQgAAfn4FBQAAAAAAAMAAAABWWAAF6wCLEwAAAP+Isf9Cwv8D2P8AWv+Ee/8Aw/8A2P8AWgAAAAAAAAABAAAAAAABAAAAAAACAAAAAACgFQAAABYAJQAAAJAfAOkAnxMAgAAAfNIRMOYAHIEAF3wAAKgEAHoAABYAAAAAAEsDB+MAAIEAAHwAAEAAAHgAAFAAAAAAAKgAAHoAEAEAFwAAAGwEAAAAAAAAAAAAAMxQAOjJABMAAAAAAACoAADqAAATAAAAAAi1APwrABODAAB8ACAACOkAn5AAgHwAfGAA/wAA/5EA/3wA//8AAP8An/8AgP8AfF1pKAA8AJGTAHx8AOowKPQcAIAXAHwAAABkWABk8RaDEwB8AAD//wD//wD//wD//6gAAHoAABYAAAAAAACM1AHq6wATEwAAAABkxgBkPACDTAB8APcItPT864ATE3wAALggd+rpEBOQTwB8AKhA6Ho86xaTEwB8AAL/ZAD/ZAD/gwD/fAAwjAAc7QAXEwAAAABk1gBk/wCD/wB8fwDQZADr7QATEwAAAAAXMABlHACDFwB8AAG4ZABkZACDgwB8fBoAMAAAHAAAFwAAAAAwUAAAyQAAAAAAAAARAAAAAAAAAAAAABVxtgA56gDXRwBaACH5BAEAAAAALAAAAAAQABAABwjOAAEAyOBBh8CDABoE6XFwwIYYHSQgrFAkxoYVAHL8uMDjRESBFE884LFhRooLFx7U8KijQZETNXjwuEABAA6OKj2igDnyQoGDN3k8GCm050+EPhTIHDrTJ8KDJRSgnErkKUgGIqZeEDHCxNMZNEjs2CGi7A4SMLwKbJDghou3cN/eSGAQgAMQB9y6wIHg7YEDQhJ8oHCjcOEJAl8UjlAYAYAQIG4I8IFQg4AbIIYINGDDAhAVMjBgkKGCgwUILQQSCKBiQWjRoxeoCMACQEAAOw==',
	reset:				'data:image/gif;base64,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',
	resourceWood:		'skin/resources/icon_wood.gif',
	resourceWine:		'skin/resources/icon_wine.gif',
	resourceMarble:		'skin/resources/icon_marble.gif',
	resourceGlass:		'skin/resources/icon_glass.gif',
	resourceSulfur:		'skin/resources/icon_sulfur.gif',
	sendSpy:			'data:image/jpg;base64,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',
	sigma:				'skin/layout/sigma.gif',
	spyMission:			'skin/layout/icon-mission.gif',
	time:				'skin/resources/icon_time.gif'
};

const HTML_ELEMENT =
{
	br:			'br',
	div:		'div',
	tbody: 		'tbody',
	tr:			'tr',
	th:			'th',
	td:			'td',
	img:		'img',
	a:			'a',
	h1:			'h1',
	h2:			'h2',
	h3:			'h3',
	h4:			'h4',
	h5:			'h5'
};

const PAD_HEADER_IMAGES = [
	[IMAGES.city, 'City name. Click item to jump to island view. Click here to sort by this column. Italic = INACTIVE, bold = ACTIVE.', 20],
	//[IMAGES.buildingWall, 'Wall level', 15],
	[IMAGES.journeyTime, 'Journey time. Click here to sort by this column.', 20],
	[IMAGES.sigma, 'Total lootable resources (in ships) taking into accound warehouse level and if city is inactive. Click value to toggle city ACTIVE/INACTIVE. Click here to sort by this column.', 10],
	[IMAGES.luxuryWorker, 'Luxury resource with largest amount (if atleast 25% of wood amount). Click here to sort by this column.', 15],
	[IMAGES.time, 'Time since last spy report or user cleared total lootable. Click here to sort by this column.', 12],
	['', 15],
	['', 15],
	['', 15],
	['', 15],
	['', 15],
	['', 15]
];

const RESOURCE_IMAGES = [
	[IMAGES.resourceWood],
	[IMAGES.resourceWine],
	[IMAGES.resourceMarble],
	[IMAGES.resourceGlass],
	[IMAGES.resourceSulfur]
];

const SPYTRACKER_SORT_COLUMNS = [
	'cityName',
	'journeyTime',
	'totalLootable',
	'luxuryResource',
	'reportTime'
];

const SPYTRACKER_ACTIONS = {
	SendSpy:	0,
	Pillage: 	1,
	Clear:		2
};

const SPYTRACKER_PADVIEWS = {
	empty: '',
	city:  'city',
	Espionage: 'Espionage',
	island: 'island',
	militaryAdvisorMilitaryMovements: 'militaryAdvisorMilitaryMovements',
	militaryAdvisorCombatReports: 'militaryAdvisorCombatReports',
	plunder: 'plunder',
	premiumDiplomacyAdvisor: 'premiumDiplomacyAdvisor',
	premiumMilitaryAdvisor: 'premiumMilitaryAdvisor',
	safehouse: 'safehouse',
	safehouseMissions: 'safeHouseMissions',
	safehouseReports: 'safehouseReports',
	sendSpy: 'sendSpy'
};

const SPYTRACKER_PADVIEWSIBLINGS = {
	empty: 'breadcrumbs',
	city: 'information',
	Espionage: 'backTo',
	island: 'actioncontainer',
	militaryAdvisorMilitaryMovements: 'breadcrumbs',
	militaryAdvisorCombatReports: 'breadcrumbs',
	plunder: 'backTo',
	premiumDiplomacyAdvisor: 'backTo',
	premiumMilitaryAdvisor: 'backTo',
	safehouse: 'reportInboxLeft',
	safehouseMissions: 'backTo',
	safehouseReports: 'backTo',
	sendSpy: 'backTo',
	spyMissions: 'backTo'
};

function stringToBoolean(str){
	return (str == 'true');
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function roundToQuarter(num) {
	return (Math.round(num * 4) / 4).toFixed(2);
}

function sumArray(array) {
	var result = 0;
	for (var i in array) {
		if(typeof(array[i] == 'number')){result += array[i];}
	}
	return result;
}

function countArrayValues(a) {
	var b = {}, i = a.length, j;
	while(i--) {
		j = b[a[i]];
		b[a[i]] = j ? j+1 : 1;
	}
	return b;
}

function maxArrayCountValue(a) {
	var b = countArrayValues(a);
	var maxValue = 0, maxCount = 0;
	for (var i in b) {
		// value must be non-zero and there must be atleast two instances to be noted
		if((b[i] > maxCount) && (i > 0) && (b[i] > 1)) {
			maxValue = parseFloat(i);
			maxCount = b[i];
		}
	}
	return maxValue;
}

function divideArray(a, d) {
	var result = [];
	for (var i = 0; i < a.length; i++) {
		result.push(a[i]/d);
	}
	return result;
}


function formatTime(time, compact) {
	if (!compact) {
		var d = Math.floor(time / (60*24))
		var h = Math.floor((time-d*60*24) / 60);
		var m = Math.floor(time - 60*h - 60*24*d);
		//var s = Math.floor((time - 60*h-m) * 60);
		// minutes are always present, days and hours omitted if zero
		return (d > 0? d+"d ":"")+(h > 0? h+"h ":"")+m+"m";
	}
	else {
		// compact format
		// if under a day -> show hours
		if (time < (24*60)) {return Math.round(time/60)+'h';}
		// show days
		else {return Math.round(time/60/24)+'d';}
	}
}

function intToStringWithPad(num, padCount) {
	var result = num + '';
	while(result.length < padCount) {
		result = "0" + result;
	}
	return result;
}

function getHrefParam(href, param) {
  param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexStr = "[\\?&]"+param+"=([^&#]*)";
  var regex = new RegExp( regexStr );
  var results = regex.exec(href);
  if( results == null )
    return "";
  else
    return results[1];
}


	
function getRequestParam(param) {
  return getHrefParam(window.location.href, param);
}

function getElementsByClass (inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++){
    if (findIn == true){
        if (all[e].className.indexOf(className) > 0){
            elements[elements.length] = all[e];
        }
    } 
    else {
        if (all[e].className == className){
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
}

function getTimestamp() {
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	var month = currentTime.getMonth();
	var day = currentTime.getDay();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var ts = year + '-';
	if(month < 10){ts = ts + '0' + month + '-';}
	else{ts = ts + month + '-';}
	if(day < 10){ts = ts + '0' + day + ' ';}
	else{ts = ts + day + ' ';}
	if(hours < 10){ts = ts + '0' + hours + ':';}
	else{ts = ts + hours + ':';}
	if(minutes < 10){ts = ts + '0' + minutes + ':';}
	else{ts = ts + minutes + ':';}
	if(seconds < 10){ts = ts + '0' + seconds;}
	else{ts = ts + seconds;}
	
	return ts;	
}


/*
 *  Firebug console log
 */
function consoleLog(object){
	if(unsafeWindow.console){
		unsafeWindow.console.log(object);	
	}	
}

/*
 *  Firebug console dir
 */
function consoleDir(object){
	syslog('ConsoleDir: ' + arguments.callee.caller.name,1);
	if(unsafeWindow.console){
		unsafeWindow.console.dir(object);	
	}
}

/*
 *  Firebug console time
 */
function consoleTime(name){
	if(unsafeWindow.console){
		unsafeWindow.console.time(name);	
	}	
}

/*
*  Firebug console timeEnd
 */
function consoleTimeEnd(name){
	if(unsafeWindow.console){
		unsafeWindow.console.timeEnd(name);	
	}	
}


/*
 *  Generic syslog targeting Java and/or Firebug console 
 */
function syslog(logMessage, logLevel){
	if(logLevel == null){
		logLevel = 4;	
	}
	var syslogMessage = getTimestamp() + ' ' + arguments.callee.caller.name + ' ("' + logMessage + '")';
	// log only if loglevel lower than globally set log level
 	if(logLevel <= syslogLogLevel){
 		// Log into Java Console if enabled
		if(syslogJavaConsoleEnabled){
			GM_log(syslogMessage);	
		}
		// Log into Firebug if enabled
		if(syslogFirebugEnabled){
			consoleLog(syslogMessage);
		}
	}
}

function intToString(num){
	return num + '';
}

function getDomain(){
	return document.domain;
}

function htmlElement(element, childElement){
	result = document.createElement(element);
	result.setAttribute('class', 'spyTracker_' + element);
	if(childElement) {
		if(typeof childElement == "string") {
			result.innerHTML = childElement;
		}
		else {	
			result.appendChild(childElement);
		}
	}
	return result;
}

function htmlBr(childElement){
	return htmlElement(HTML_ELEMENT.br, childElement);
}

function htmlDiv(childElement){
	return htmlElement(HTML_ELEMENT.div, childElement);
}

function htmlH3(childElement){
	return htmlElement(HTML_ELEMENT.h4, childElement);
}

function htmlH4(childElement){
	return htmlElement(HTML_ELEMENT.h4, childElement);
}

function htmlH5(childElement){
	return htmlElement(HTML_ELEMENT.h5, childElement);
}

function htmlTableBody(childElement){
	return htmlElement(HTML_ELEMENT.tbody, childElement);
}

function htmlTableRow(childElement){
	return htmlElement(HTML_ELEMENT.tr, childElement);
}

function htmlTableHeaderCell(childElement) {
	return htmlElement(HTML_ELEMENT.th, childElement);
}

function htmlTableCell(childElement) {
	return htmlElement(HTML_ELEMENT.td, childElement);
}

function htmlImg(image, title, width, height){
	result = htmlElement(HTML_ELEMENT.img);
	result.setAttribute('src', image);
	if(title) result.setAttribute('title', title);
	if(width) result.setAttribute('width', width);
	if(height) result.setAttribute('height', height);
	return result;
}

function htmlAHref(url, childElement){
	result = htmlElement(HTML_ELEMENT.a, childElement);
	result.setAttribute('href', url);
	return result;
}

function htmlCheckbox() {
	result = document.createElement("input");
	result.setAttribute('type', 'checkbox');
	return result;
}

function htmlButton(text) {
	result = document.createElement("input");
	result.setAttribute('class', 'button');
	result.setAttribute('type', 'button');
	result.setAttribute('value', text);
	return result;
}



function ikariamGetServerTime(){
	return document.getElementById('servertime').textContent;
}

// http://ikariam.com/index.php?action=Espionage&function=executeMission&actionRequest=92eab364099d4d7962f0b235ad01b418&id=167891&position=11&spy=927075&mission=5
function ikariamIsSafeHouseReportsView()
{
	return ($('espionageReports') != null);
}


// http://ikariam.com/index.php?action=Espionage&function=executeMission&actionRequest=92eab364099d4d7962f0b235ad01b418&id=167891&position=11&spy=927075&mission=5
function ikariamIsSafehouseWarehouseReport()
{
	return (document.body.id == 'safehouseReports') && (getRequestParam('mission') == 5);
}




/*
 *   Returns an array containing a list of own cities
 *   Reads the information from the city selection drop down
 *   so can be called from any view
 */
function ikariamGetOwnCities(){
	var result = [];
	
	try {
		var tmpElements = document.getElementsByName('cityId');
		var citySelectElement = tmpElements[0];
		var cityElements = citySelectElement.childNodes;
	}
	catch(e) {
		syslog('Error retrieving own cities: "' + e.description + '"',1);
		return result;
	}

	// first two elements are not cities
	for (var i = 0; i < cityElements.length; i++) {
		// elements with no text are ignored
		if(cityElements[i].text) {
			var sc = new spyTrackerCity();
			sc.id = sc.name = cityElements[i].value;
			sc.selected = cityElements[i].selected;
			// depending on the chosen view mode (coordinates or resources) for
			// the city selection
			if (cityElements[i].className=='coords'){
				var str = cityElements[i].text;
				sc.name = str.substring(str.indexOf(']')+2, str.length);
				sc.island.parseCoordinatesFromString(str);
			}
			else {
				sc.name = cityElements[i].text
				sc.island.parseCoordinatesFromString(cityElements[i].title);
			}
			result.push(sc);
		}
	}
	
	return result;
}


function ikariamCityViewGetBuildingLevel(building) {
	var result = 0;
	var elements = getElementsByClass(document, building, false);
	for (var i=0; i < elements.length; i++) {
		// get the building title (eg. "Warehouse Level 10")
		var buildingTitleElements = elements[i].getElementsByTagName("a")[0].title.split(" ");
		// read the last item as the level
		result += parseInt(buildingTitleElements[buildingTitleElements.length-1].trim());
	}
	return result;
}

function ikariamGetCurrentView(){
	var result = getRequestParam('view');
	if(!result) {
		result = getRequestParam('action');
	}
	return result;
}

function ikariamIsCurrentView(name){	
	var result = name.localeCompare(ikariamGetCurrentView())
	return (result == 0);
}

function spyTrackerIsValidPadView(){
	var currentView = ikariamGetCurrentView();
	return ((currentView == '') || (SPYTRACKER_PADVIEWS[currentView] != null));
}

function spyTrackerGetPadSibling(){
	var elementId = SPYTRACKER_PADVIEWSIBLINGS[ikariamGetCurrentView()];
	// default to breadcrumbs (usually in case when there is no view at all available)
	if (!elementId) elementId = 'breadcrumbs';
	return $(elementId);
}

function ikariamspyTrackerReportTimeStampToDate(ts) {
	var tmpArray = ts.split(' ');
	var tmpDateArray = tmpArray[0].split('.');
	var tmpTimeArray = tmpArray[1].split(':');
	var year = parseInt(tmpDateArray[2],10);
	var month = parseInt(tmpDateArray[1],10)-1;
	var day = parseInt(tmpDateArray[0],10);
	var hours = parseInt(tmpTimeArray[0],10);
	var minutes = parseInt(tmpTimeArray[1],10);
	var seconds = parseInt(tmpTimeArray[2],10);
	var milliseconds = 0;
	// create new date object
	var result = new Date(year, month, day, hours, minutes, seconds, milliseconds);

	return result;
}


function dateToIkariamSpyTrackerTimeStamp(tsDate) {
	result = intToStringWithPad(tsDate.getDate(), 2) + '.';
	result = result + intToStringWithPad(tsDate.getMonth()+1, 2) + '.';
	result = result + tsDate.getFullYear() + ' ';
	result = result + intToStringWithPad(tsDate.getHours(), 2) + ':';
	result = result + intToStringWithPad(tsDate.getMinutes(), 2) + ':';
	result = result + intToStringWithPad(tsDate.getSeconds(), 2);
	return result;
}

function ikariamCityViewGetCityID(){
	var result = getRequestParam("id");
	syslog(result, 4);
	return result;
}

function ikariamCityViewGetCityName(){
	var elements = getElementsByClass(document, "city", false);
	if (elements[0]){
		var result = elements[0].innerHTML;
		syslog(result, 4);
		return result;
	}
}

function ikariamCityViewGetIsland(){
	var elements = getElementsByClass(document, "island", false);
	if (elements[0]){
		var result = new spyTrackerIsland();
		var href = elements[0].href;
		result.ID = href.substring(href.indexOf('id=') + 3);
		var str = elements[0].innerHTML;
		result.name = str.substring(0, str.indexOf('['));
		result.x = str.substring(str.indexOf('[')+1, str.indexOf(':'));
		result.y = str.substring(str.indexOf(':')+1, str.indexOf(']'));
		
		syslog(result, 4);
		return result;
	}
}

function ikariamPlunderViewGetTargetCityID(){
	var result = parseInt(getRequestParam("destinationCityId"));
	syslog(result, 4);
	return result;
}



function ikariamspyTrackerReportGetID(){
	var result = getRequestParam("reportId");
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetSpyHomeCityID(){
	var result = getRequestParam("id");
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetPosition(){
	var result = getRequestParam("position");
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetSpyID(){
	var result = getRequestParam("spy");
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetTargetTownName(){
	var result = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetTimeStamp(){
	var ikariamTimeStamp = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
	var result = ikariamTimeStamp;
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetAvailableResources(resourcesTable, resources){
	var listElements = resourcesTable.getElementsByTagName('tr');
	for (var i = 1; i < listElements.length; i++) {
		if(listElements[i].innerHTML.indexOf('icon_wood.gif') > 0) {
			var res = getElementsByClass(listElements[i], "count", false);
			resources[0] = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_wine.gif') > 0) {
			var res = getElementsByClass(listElements[i], "count", false);
			resources[1] = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_marble.gif') > 0) {
			var res = getElementsByClass(listElements[i], "count", false);
			resources[2] = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_glass.gif') > 0) {
			var res = getElementsByClass(listElements[i], "count", false);
			resources[3] = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_sulfur.gif') > 0) {
			var res = getElementsByClass(listElements[i], "count", false);
			resources[4] = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
	}
	syslog(resources, 4);
	return true;
}

function ikariamSendSpyViewGetSendSpyButton() {
	return $('plunderbutton');
}


function ikariamSendSpyViewGetDestinationCityId() {
	var result = getRequestParam("destinationCityId");
	syslog(result, 4);
	return result;
}

function ikariamSendSpyViewGetIslandId() {
	var result = getRequestParam("islandId");
	syslog(result, 4);
	return result;
}

function ikariamSendSpyViewGetDestinationCityName() {
	var elements = document.getElementsByClassName('journeyTarget clearfix');
	if(elements.length > 0) {
		result = rtrim(elements[0].childNodes[2].data);
	}
	else {result = '';}
	syslog(result, 4);
	return result;
}



// Compare function for sorting
function spyTrackerReportCompare(a,b) {
	return (b.ID - a.ID);
}

function spyTrackerReport() {
	this.ID = 0;
	this.spyHomeCityID = '';
	this.position = '';
	this.spyID = '';
	this.timeStamp = ikariamGetServerTime();
	this.cityName = '';
	this.resources = [0,0,0,0,0];
}

/* Extracts spy report information from Ikariam spy report page 
// url = http://.ikariam.com/index.php?action=Espionage&function=executeMission&actionRequest=8adce3ca1cef0c986b22310e369a0793&id=165808&position=11&spy=909058&mission=5
*/
spyTrackerReport.prototype.readFromIkariam = function(resourcesTable) {
	//this.spyHomeCityID = ikariamspyTrackerReportGetSpyHomeCityID();
	//this.position = ikariamspyTrackerReportGetPosition();
	//this.spyID = ikariamspyTrackerReportGetSpyID();	
	// will return false if no resources were found (spy got caught or noticed)
	return ikariamspyTrackerReportGetAvailableResources(resourcesTable, this.resources);
}

spyTrackerReport.prototype.getTimestampAsDate = function() {
	if(this.timeStamp != '') {return ikariamspyTrackerReportTimeStampToDate(this.timeStamp);}
	else {return null;}
}

spyTrackerReport.prototype.calculateTimeDiffAsDays = function(sr) {
	var ownTime = this.getTimestampAsDate();
	var otherTime = sr.getTimestampAsDate();
	var timeDiffInMs = ownTime.getTime() - otherTime.getTime();
	return (timeDiffInMs / (1000*60*60*24));
}


spyTrackerReport.prototype.getAgeAsString = function(compact) {
	if(this.timeStamp != '') {
		var ts = this.getTimestampAsDate();
		var now = ikariamspyTrackerReportTimeStampToDate(ikariamGetServerTime());
		var age = now.getTime() - ts.getTime();
		age = (age / (1000*60));
		return formatTime(age, compact);
	}
	else return '';
}

spyTrackerReport.prototype.getResourcesAsLootableShips = function(protectedAmount) {
	var result = [];
	for (var i in this.resources) {
		result[i] =  (this.resources[i]-protectedAmount)/500;
		if(result[i] < 0) {result[i] = 0;}
	}
	return result;
}

spyTrackerReport.prototype.getLootableTotal = function(protectedAmount) {
	return sumArray(this.getResourcesAsLootableShips(protectedAmount));
}


spyTrackerReport.prototype.getGrowths = function(previous, protectedAmount) {
	var result = [0, 0, 0, 0, 0];
	var currentLootable = this.getResourcesAsLootableShips(protectedAmount);
	var previousLootable = previous.getResourcesAsLootableShips(protectedAmount);
	for (var i = 0; i < result.length; i++){
		result[i] = currentLootable[i] - previousLootable[i];
		if(result[i] < 0) result[i] = 0;
	}
	return result;
}

spyTrackerReport.prototype.getTotalGrowth = function(previous, protectedAmount) {
	return sumArray(this.getGrowths(previous, protectedAmount));
}

spyTrackerReport.prototype.getGrowthRates = function(previous, protectedAmount) {
	var timeDiffInDays = this.calculateTimeDiffAsDays(previous);
	return divideArray(this.getGrowths(previous, protectedAmount), timeDiffInDays);
}

spyTrackerReport.prototype.getTotalGrowthRate = function(previous, protectedAmount) {
	return sumArray(this.getGrowthRates(previous, protectedAmount));
}

spyTrackerReport.prototype.toString = function() {
	var result = '';
	var tmpArray = [];
	tmpArray.push(this.ID);
	tmpArray.push(this.timeStamp);
	tmpArray.push(this.cityName);
	tmpArray.push(this.resources.join('/R/'));
	result = tmpArray.join('/SR/');
	return result;
}	

spyTrackerReport.prototype.fromString = function(str) {
	this.resources = [];
	var tmpArray = str.split('/SR/');
	var tmpArray2 = tmpArray.pop().split('/R/');
	for (i in tmpArray2) {this.resources[i]=parseInt(tmpArray2[i])};
	this.cityName = tmpArray.pop();
	this.timeStamp = tmpArray.pop();
	this.ID = tmpArray.pop();
}


function spyTrackerIsland() {
	this.ID = '';
	this.name = ''; 
	this.x = 0;
	this.y = 0;
}

spyTrackerIsland.prototype.parseCoordinatesFromString = function(str) {
	this.x = parseInt(str.substring(str.indexOf('[')+1, str.indexOf(':')));
	this.y = parseInt(str.substring(str.indexOf(':')+1, str.indexOf(']')));
}

/*
 *  Calculates distance between two islands
 */
spyTrackerIsland.prototype.getDistance = function(target) {
	return Math.sqrt(Math.pow(this.x-target.x,2)+Math.pow(this.y-target.y,2));
}

/*
 *  Returns the travel time in minutes between two islands
 *  If on same island, traveltime is 10
 */
spyTrackerIsland.prototype.getTravelTime = function(target) {
	var result = (1200/60) * this.getDistance(target);
	if (result == 0) {
		return 10;
	}
	else {
		return result;
	}
}

spyTrackerIsland.prototype.getTravelTimeAsString = function(target, compact) {
	if(this.name == ''){return '';}
	var time = this.getTravelTime(target);
	return formatTime(time, compact);
}

spyTrackerIsland.prototype.getTravelTimeAsCompactString = function(target) {
	return this.getTravelTimeAsString(target, true);
}
	
spyTrackerIsland.prototype.toString = function(str) {
	var tmpArray = [];
	tmpArray.push(this.ID);
	tmpArray.push(this.name);
	tmpArray.push(this.x);
	tmpArray.push(this.y);
	var result = tmpArray.join('/SI/');
	return result;
}

spyTrackerIsland.prototype.fromString = function(str) {
	if(str.length > 0) {
		var tmpArray = str.split('/SI/');
		this.ID = tmpArray.shift();
		this.name = tmpArray.shift();
		this.x = parseInt(tmpArray.shift());
		this.y = parseInt(tmpArray.shift());
	}
}


// Compare function for sorting cities (name)
function spyTrackerCityCompareByName(a,b) {
	return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

// Compare function for sorting cities (journey time)
function spyTrackerCityCompareByJourneyTime(a,b) {
	// Set selected own city as the source for journey time calculation
	var sourceCity = db.getSelectedOwnCity();
	var aJourneyTime = a.island.getTravelTime(sourceCity.island);
	var bJourneyTime = b.island.getTravelTime(sourceCity.island);
	return aJourneyTime-bJourneyTime;
}

// Compare function for sorting cities (total lootable)
function spyTrackerCityCompareByTotalLootable(a,b) {
	return b.getPredictedLootableTotal()-a.getPredictedLootableTotal();
}

// Compare function for sorting cities (luxury resource)
function spyTrackerCityCompareByLuxuryResource(a,b) {
	if(a.getLuxuryResourceIndex() != b.getLuxuryResourceIndex()) {
		return b.getLuxuryResourceIndex()-a.getLuxuryResourceIndex();
	}
	else {
		return spyTrackerCityCompareByTotalLootable(a,b);
	}
}

// Compare function for sorting cities (report time)
function spyTrackerCityCompareByReportTime(a,b) {
	if(!a.spyTrackerReports[0]) return -1;
	if(!b.spyTrackerReports[0]) return 1;
	return spyTrackerReportCompare(b.spyTrackerReports[0], a.spyTrackerReports[0]);
}

// http://ikariam.com/index.php?view=safehouseMissions&id=165808&position=11&spy=909058
function spyTrackerCity() {
	this.ID = 0;
	this.spyHomeCityID = '';
	this.position ='';
	this.spyID = '';
	this.name = '';
	this.island = new spyTrackerIsland();
	this.warehouseLevel = 0;
	this.wallLevel = 0;
	this.spyTrackerReports = [];
	this.spyTrackerActions = [];
	this.selected = false;
	this.active = true;
}



spyTrackerCity.prototype.spyWarehouseEnabled = function() {
	return (this.ID != 0);
}

spyTrackerCity.prototype.pillageEnabled = function() {
	return (this.ID != 0);
}

spyTrackerCity.prototype.sendSpyEnabled = function() {
	return ((this.ID != 0) && (this.island.ID != ''));
}


spyTrackerCity.prototype.addspyTrackerReport = function(sr) {
	var result = false;
	// add only if not already stored
	if(this.findIndexByID(sr.ID) == -1) {
		// insert the new spy report to the beginning of the array
		this.spyTrackerReports.unshift(sr);
		// store a maximum of maxSpyReportsPerCity
		while (this.spyTrackerReports.length > maxSpyReportsPerCity) {
			// remove items from the array until under the limit
			this.spyTrackerReports.pop();
		}
		result = true;
	}
	return result;
}

spyTrackerCity.prototype.findIndexByID = function(ID) {
	for (var i = 0; i < this.spyTrackerReports.length; i++) {
		if(this.spyTrackerReports[i].ID == ID) {
			return i;
			break;
		}
	}
	return -1;
}


spyTrackerCity.prototype.resetSpyReports = function(){
	var sr = new spyTrackerReport();
	sr.ID = ikariamspyTrackerReportTimeStampToDate(sr.timeStamp).getTime();
	this.addspyTrackerReport(sr);
}

spyTrackerCity.prototype.getProtectedResourcesAmount = function(){
	var result = 0;
	if (this.warehouseLevel > 0) {
		if (this.active) {result = 100 + this.warehouseLevel * 480;}
		else {result = 100 + this.warehouseLevel * 80;}
	}
	return result;
}

spyTrackerCity.prototype.getLootableTotal = function(ceilResult){
	var result = 0;
	if(this.spyTrackerReports.length > 0) {
		result = this.spyTrackerReports[0].getLootableTotal(this.getProtectedResourcesAmount());
		if(ceilResult) result = Math.ceil(result);
	}
	return result;
}

spyTrackerCity.prototype.getPredictedLootableTotal = function(ceilResult){
	var result = 0;
	if(this.spyTrackerReports.length > 0) {
		// don't ceil at this point
		var lootableTotal = this.getLootableTotal(false);
		var totalGrowthRate = this.getTotalGrowthRate();
		var sr = new spyTrackerReport();
		var timeDiffAsDays = Math.abs(this.spyTrackerReports[0].calculateTimeDiffAsDays(sr));
		result = lootableTotal + totalGrowthRate*timeDiffAsDays;
		if(ceilResult) result = Math.ceil(result);
	}
	return result;
}

spyTrackerCity.prototype.getGrowthRates = function(){
	// first gather growth rates from spy reports into an array
	var growthRates = [[],[],[],[],[]];
	var reports = this.spyTrackerReports;
	for (var i = 0; i < reports.length-1; i++) {
		var gr = reports[i].getGrowthRates(reports[i+1], this.getProtectedResourcesAmount());
		for (var j = 0; j < gr.length; j++) {
			// round values to 0, 0.25, 0.5 and 0.75
			growthRates[j].push(roundToQuarter(gr[j]));
		}
	}
	var result = [];
	// then find the non-zero values with most "hits"
	for (var i = 0; i < growthRates.length; i++) {
		result[i] = maxArrayCountValue(growthRates[i]);
	}
	return result;
}

spyTrackerCity.prototype.getTotalGrowthRate = function(){
	return sumArray(this.getGrowthRates());
}

spyTrackerCity.prototype.getLuxuryResourceIndex = function(){
	var luxuryIndex = 0;
	var woodAmount = 0;
	
	// find first non-empty report
	var sr = null;
	for (var i = 0; i < this.spyTrackerReports.length; i++) {	
		if(this.spyTrackerReports[i].getLootableTotal(this.getProtectedResourcesAmount()) > 0) {
			sr = this.spyTrackerReports[i];
			break;
		}
	}
	
	// if non-empty found, find correct luxury resource
	if(sr) {
		var tmpMax = 0;
		woodAmount = sr.resources[0];
		for (var i = 1; i < sr.resources.length; i++) {	
			// luxury amount must atleast 25% of wood amount to override it
			if(((sr.resources[i]) > woodAmount/4) && (sr.resources[i] > tmpMax)) {
				tmpMax = sr.resources[i];
				luxuryIndex = i;
			}
		}
	}
	if((luxuryIndex == 0) && (woodAmount == 0)) return null;
	else return luxuryIndex;
}

spyTrackerCity.prototype.getLuxuryResourceImage = function(){
	var luxuryIndex = this.getLuxuryResourceIndex();
	if (luxuryIndex != null) return RESOURCE_IMAGES[luxuryIndex][0];
	else return '';
}


spyTrackerCity.prototype.getAgeAsString = function(compact) {
	if(this.spyTrackerReports.length > 0) {return this.spyTrackerReports[0].getAgeAsString(compact);}
	else {return '';}
}	
	
spyTrackerCity.prototype.toggleActive = function() {
	this.active = !this.active;
}
	
spyTrackerCity.prototype.sort = function() {
	this.spyTrackerReports.sort(spyTrackerReportCompare);	
}

spyTrackerCity.prototype.toString = function(str) {
	var tmpArray = [];
	tmpArray.push(this.ID);
	tmpArray.push(this.spyHomeCityID);
	tmpArray.push(this.position);
	tmpArray.push(this.spyID);
	tmpArray.push(this.name);
	tmpArray.push(this.island.toString());
	tmpArray.push(this.warehouseLevel);
	tmpArray.push(this.wallLevel);
	tmpArray.push(this.active);
	for (var i = 0; i < this.spyTrackerReports.length; i++) {
		tmpArray.push(this.spyTrackerReports[i].toString());
	}
	var result = tmpArray.join('/SC/');
	return result;
}

spyTrackerCity.prototype.fromString = function(str) {
	if(str.length > 0) {
		var tmpArray = str.split('/SC/');
		this.ID = parseInt(tmpArray.shift());
		this.spyHomeCityID = tmpArray.shift();
		this.position = tmpArray.shift();
		this.spyID = tmpArray.shift();
		if(isNaN(this.ID)){this.ID = 0};
		this.name = tmpArray.shift();
		this.island.fromString(tmpArray.shift());
		this.warehouseLevel = parseInt(tmpArray.shift());
		this.wallLevel = parseInt(tmpArray.shift());
		this.active = stringToBoolean(tmpArray.shift());
		for (var i = 0; i < tmpArray.length; i++) {
			var sr = new spyTrackerReport();
			sr.fromString(tmpArray[i]);
			// items already in sorted order so push is ok
			this.spyTrackerReports.push(sr);
		}		
	}
}


function spyTrackerSettings() {
	this.name = 'spyTrackerSettings';
	this.sortByColumn = SPYTRACKER_SORT_COLUMNS[0];
}

spyTrackerSettings.prototype.toString = function() {
	var result = 'sortByColumn=' + this.sortByColumn;
	return result;
}

spyTrackerSettings.prototype.fromString = function(str) {
	var settings = str.split(';');
	for (var i = 0; i < settings.length; i++) {
		var setting = settings[i].split('=');
		if(setting[0] == 'sortByColumn') {
			this.sortByColumn = setting[1];
		}
	}
}

spyTrackerSettings.prototype.storeToGM = function() {
	var key = getDomain() + '.' + this.name;
	GM_setValue(key, this.toString());
}

spyTrackerSettings.prototype.loadFromGM = function() {
	var key = getDomain() + '.' + this.name;
	this.fromString(GM_getValue(key, ''));
}

function spyTrackerDB() {
	this.version = 'V0.1';
	this.settings = new spyTrackerSettings();
	this.ownCities = [];
	this.spyCities = [];
	this.spyTrackerReports = [];
}

spyTrackerDB.prototype.addCity = function(sc, cities) {
	// add city (own or spy) only if not already in DB
	var result = this.findCityByName(sc.name, cities);
	// if a new city
	if(!result) {
		result = sc;
		cities.push(result);
	}
	return result;
}

spyTrackerDB.prototype.removeSpyCityByName = function(name) {
	this.spyCities.splice(this.spyCities.indexOf(this.findSpyCityByName(name)),1);
}

spyTrackerDB.prototype.findCityByName = function(cityName, cities) {
	for (var i in cities) {
		if(cities[i].name == cityName) {
			return cities[i];
			break;
		}
	}
	return null;
}

spyTrackerDB.prototype.findOwnCityByName = function(cityName) {
	return this.findCityByName(cityName, this.ownCities);
}

spyTrackerDB.prototype.findSpyCityByName = function(cityName) {
	return this.findCityByName(cityName, this.spyCities);
}

spyTrackerDB.prototype.findSpyCityByID = function(ID) {
	for (var i in this.spyCities) {
		if(this.spyCities[i].ID == ID) {
			return this.spyCities[i];
			break;
		}
	}
	return null;
}

spyTrackerDB.prototype.isOwnCity = function(cityName) {
	return (this.findCityByName(cityName, this.ownCities) != null);
}

spyTrackerDB.prototype.isSpyCity = function(cityName) {
	return (this.findCityByName(cityName, this.spyCities) != null);
}

spyTrackerDB.prototype.readOwnCities = function(){
	this.ownCities = ikariamGetOwnCities();
}

spyTrackerDB.prototype.getSelectedOwnCity = function(){
	for (var i = 0; i < this.ownCities.length; i++) {
		if(this.ownCities[i].selected) {
			return this.ownCities[i];
			break;
		}
	}
	return null;
}



/*
 * Replaced by the mechanism to read all the own cities at startup 
spyTrackerDB.prototype.addOwnCity = function(sc) {
	return this.addCity(sc, this.ownCities);
}
*/

spyTrackerDB.prototype.addSpyCity = function(sc) {
	if(!this.isOwnCity(sc.name)){
		return this.addCity(sc, this.spyCities);
	}
	else {
		return null;
	}
	
}

spyTrackerDB.prototype.sort = function() {
	var compareFunction = null;
	syslog('SpyTracker.sort - sorting cities by: ' + this.settings.sortByColumn,1);
	// based on the sort column in settings define correct sort function
	if(this.settings.sortByColumn == SPYTRACKER_SORT_COLUMNS[0]) compareFunction = spyTrackerCityCompareByName;
	else if(this.settings.sortByColumn == SPYTRACKER_SORT_COLUMNS[1]) compareFunction = spyTrackerCityCompareByJourneyTime;
	else if(this.settings.sortByColumn == SPYTRACKER_SORT_COLUMNS[2]) compareFunction = spyTrackerCityCompareByTotalLootable;
	else if(this.settings.sortByColumn == SPYTRACKER_SORT_COLUMNS[3]) compareFunction = spyTrackerCityCompareByLuxuryResource;
	else if(this.settings.sortByColumn == SPYTRACKER_SORT_COLUMNS[4]) compareFunction = spyTrackerCityCompareByReportTime;
	else {
		syslog('Unknown sort column: ' + this.settings.sortByColumn,1);
		return;
	}
	// do the sort
	this.spyCities.sort(compareFunction);
	// sort also the spy reports inside the cities
	for (var i = 0; i < this.spyCities.length; i++) {
		this.spyCities[i].sort();
	}	
}




spyTrackerDB.prototype.toString = function(str) {
	var tmpArray = [];
	tmpArray.push(this.version);
	
	// spy cities
	var tmpSpyCities = [];
	for (var i = 0; i < this.spyCities.length; i++) {
		tmpSpyCities.push(this.spyCities[i].toString());
	}
	tmpArray.push(tmpSpyCities.join('/DB.1/'));
	
	var result = tmpArray.join('/DB/');
	return result;
}

spyTrackerDB.prototype.fromString = function(str) {
	if(str.length > 0) {
		var tmpArray = str.split('/DB/');
		// get version stored in db
		var dbVersion = tmpArray[0];
		// if versions do not match, alert user about resetting the db
		// do not load the rest of the db in this case
		if (this.version != dbVersion) {
			msg = 'Spy Tracker database version difference detected due to script update. Resetting the database.';
			alert(msg);
			syslog(msg,1);
			return;
		}
		// spy cities
		if(tmpArray[1]) {
			tmpSpyCities = tmpArray[1].split('/DB.1/')
			for (var i = 0; i < tmpSpyCities.length; i++) {
				var sc = new spyTrackerCity();
				sc.fromString(tmpSpyCities[i]);
				this.addSpyCity(sc);
			}
		}
	}
}

spyTrackerDB.prototype.viewCity = function() {
	syslog('SpyTracker - viewCity', 1);
	var sc = new spyTrackerCity();
	sc.name = ikariamCityViewGetCityName();
	// adds a new city or returns a reference to an existing one
	sc = this.addSpyCity(sc);
	// if is a spycity (sc not null)
	if(sc) {
		// update with new data
		sc.ID = ikariamCityViewGetCityID();
		sc.warehouseLevel = ikariamCityViewGetBuildingLevel('warehouse');
		sc.wallLevel = ikariamCityViewGetBuildingLevel('wall');
		sc.island = ikariamCityViewGetIsland();
		// sort the data
		this.sort();
		// stores the data
		this.storeToGM();
	}
}

// http://*.ikariam.com/index.php?view=spyMissions&id=69891
spyTrackerDB.prototype.viewSpyMissions = function() {
	syslog('Spy Tracker - viewSpyMissions', 1);
	// compact the view if so configured
	if(compactSpyMissionView) {
		var missionForm = $('missionForm');
		var missionWrappers  = missionForm.getElementsByClassName('missionWrapper');
		if (missionWrappers[1]) missionWrappers[1].style.display = 'none';
		if (missionWrappers[2]) missionWrappers[2].style.height = '35px';
		if (missionWrappers[3]) missionWrappers[3].style.height = '30px';
		if (missionWrappers[4]) missionWrappers[4].style.height = '230px';
		var spyCityMWs  = missionForm.getElementsByClassName('spyCity missionWrapper');
		if (spyCityMWs[0]) spyCityMWs[0].style.height = '50px';
	}
}


spyTrackerDB.prototype.viewSafeHouseReports = function() {
	syslog('Spy Tracker - viewSafeHouseReports', 1);
	var reportTable = $('espionageReports');
	var entries = reportTable.getElementsByClassName('entry');
	for(i=0; i < entries.length; i++ ) {
		// target city
		var entryId = entries[i].getAttribute('id');
		var targetCityName = trim(entries[i].getElementsByClassName('targetCity')[0].innerHTML);
		var timeStamp = trim(entries[i].getElementsByClassName('date')[0].innerHTML);
		syslog('City = ' + targetCityName + ' time = ' + timeStamp, 1);
		// find the associated report to this entry (if not found -> skip this entry)
		var reportId = entryId.replace('message', 'tbl_mail');
		var report = $(reportId)
		if(!report) continue;
		// try to find a report table (if not found -> skip this entry)
		var reportTable = report.getElementsByClassName('reportTable')[0];
		if(!reportTable) continue;
		// check if it contains resources (if not -> skip this entry)
		if(reportTable.getAttribute('id') != 'resources') continue;
		// create a new spy report
		var sr = new spyTrackerReport();
		sr.cityName = targetCityName;
		sr.timeStamp = timeStamp;
		sr.ID = ikariamspyTrackerReportTimeStampToDate(sr.timeStamp).getTime();
		// read the rest of the information from reportTable
		sr.readFromIkariam(reportTable);
		// adds a new city or returns a reference to an existing one
		var sc = new spyTrackerCity();
		sc.name = sr.cityName;
		sc = this.addSpyCity(sc);
		// add the report
		var newReport = sc.addspyTrackerReport(sr);
	}
	
	// sort the data
	this.sort();
	// stores the data
	this.storeToGM();
}

spyTrackerDB.prototype.viewPlunder = function() {
	syslog('SpyTracker - viewPlunder', 1);
	var sc = this.findSpyCityByID(ikariamPlunderViewGetTargetCityID());
	if(sc) {
		// fill in needed cargo ships
		var predictedLootableTotal = sc.getPredictedLootableTotal(true);
		$('extraTransporter').value = predictedLootableTotal;
		// show additional info after target city information
		var newSummary = document.getElementsByClassName('newSummary')[0];
		var div = htmlDiv(htmlImg(IMAGES.buildingWall, 'Wall Level', 20, 20));
		div.setAttribute('style', 'margin-left:20px');
		// Wall level
		var wallLevel = document.createElement('label');
		var labelStyle = 'margin-left: 5px; margin-right: 15px; font-size: 14px; font-weight:bold'
		wallLevel.setAttribute('style', labelStyle);
		wallLevel.textContent = sc.wallLevel;
		div.appendChild(wallLevel);
		// Lootable resources
		if(sc.spyTrackerReports[0]) {
			var growthRates = sc.getGrowthRates();
			var loot = sc.spyTrackerReports[0].getResourcesAsLootableShips(sc.getProtectedResourcesAmount());
			for (var i in loot) {
				div.appendChild(htmlImg(RESOURCE_IMAGES[i], '', 20, 20));
				var lootAmount = document.createElement('label');
				lootAmount.setAttribute('style', labelStyle);
				lootAmount.textContent = Math.ceil(loot[i]+growthRates[i]);
				div.appendChild(lootAmount);
			}
			// total lootable
			div.appendChild(htmlImg(IMAGES.sigma, '', 17, 17));
			var totalLootable = document.createElement('label');
			totalLootable.setAttribute('style', labelStyle);
			totalLootable.textContent = predictedLootableTotal;
			div.appendChild(totalLootable);
			// time since last report
			div.appendChild(htmlImg(IMAGES.time, '', 17, 17));
			var reportAge = document.createElement('label');
			reportAge.setAttribute('style', labelStyle);
			reportAge.textContent = sc.spyTrackerReports[0].getAgeAsString();
			div.appendChild(reportAge);
		}
		newSummary.parentNode.insertBefore(div, newSummary);
	}		
}


spyTrackerDB.prototype.viewSendSpy = function() {
	syslog('SpyTracker - viewSendSpy', 1);
	// Register onclick event handler to "Send Spy" button wih proper attributes
	var button = ikariamSendSpyViewGetSendSpyButton();
	if(button) {
		button.setAttribute('destinationCityId', ikariamSendSpyViewGetDestinationCityId());
		button.setAttribute('destinationCityName', ikariamSendSpyViewGetDestinationCityName());
		button.setAttribute('islandId', ikariamSendSpyViewGetIslandId());
		button.addEventListener('click', sendSpyButtonOnClickHandler, false);
	}
	
	// compact the view if so configured
	if(compactSendSpyView) {
		var missionForm = $('missionForm');
		var missionWrappers  = missionForm.getElementsByClassName('missionWrapper');
		// adjust the height of the text paragraph
		if (missionWrappers[0]) missionWrappers[0].style.height = '50px';
		// hide the large images
		if (missionWrappers[1]) missionWrappers[1].style.display = 'none';
	}
}

sendSpyButtonOnClickHandler = function() {
	var sc = new spyTrackerCity();
	sc.name = this.getAttribute('destinationCityName');
	// make sure the name was really found in earlier phase
	if(sc.name) {
		// Add's a new city or returns a reference to an existing one
		sc = db.addSpyCity(sc);
		// update with new data
		sc.ID = parseInt(this.getAttribute('destinationCityID'));
		sc.island.ID = this.getAttribute('islandId');
		// sort the data
		db.sort();
		// stores the data
		db.storeToGM();
	}
	else syslog('Target city name not found', 1);
}


function ikariamTooltipCell(image, text, imageWidth, imageHeight){
	text = text + '';
	var result = htmlDiv();
	result.setAttribute('class', 'unitBox');
	var divImg = htmlDiv(htmlImg(image, text, imageWidth, imageHeight));
	divImg.setAttribute('class', 'icon');
	divImg.setAttribute('style', 'width:40px; height:20px');
	var divText = htmlDiv(text);
	divText.setAttribute('class', 'count');
	divText.setAttribute('style', 'width:50px');
	divText.setAttribute('style', 'font-size:10px');
	result.appendChild(divImg);
	result.appendChild(divText);
	return result;
}


spyTrackerDB.prototype.updateSpyTrackerPad = function() {
	consoleTime('SpyTracker.UpdatePad.Init');
	
	// Get reference to target table in pad
	target = $('SpyTrackerPad');
	// If pad not initialised for some reason, just exit
	if(target == null) {
		syslog('Spy Tracker pad not initialised properly',1);
		return;
	}
	// Clear the table
	target.innerHTML = "";
	
	// Table body
	var srTableBodyElement = htmlTableBody();
	// Header row
	var srTableHeader = htmlTableRow();
	// Header row images
	for (i in PAD_HEADER_IMAGES){
		img = htmlImg(PAD_HEADER_IMAGES[i][0], PAD_HEADER_IMAGES[i][1], PAD_HEADER_IMAGES[i][2]);
		img.setAttribute('style', 'float:left');
		th = htmlTableHeaderCell(img);
		th.setAttribute('style', 'cursor: pointer; padding-left:1px');
		th.setAttribute('columnIndex', i);
		th.addEventListener('click', onPadTableHeaderClick, false);
		srTableHeader.appendChild(th); 
	}
	srTableBodyElement.appendChild(srTableHeader);
	
	// Set selected own city as the source for pillaging
	var sourceCity = this.getSelectedOwnCity();

	consoleTimeEnd('SpyTracker.UpdatePad.Init');

	consoleTime('SpyTracker.UpdatePad.Cities');
	
	// Spy cities		
	for (var i in this.spyCities) {
		// get reference to city
		var sc = this.spyCities[i];
		
		// city row
		var tr = htmlTableRow();
		// selection check box
		/*
		var cbSelection = htmlCheckbox();
		cbSelection.setAttribute('style', 'height:.6em;width:.6em;');
		var tdSelection = htmlTableCell(cbSelection);
		tr.appendChild(tdSelection);
		*/
		
		// show link to city if city id stored
		if(sc.ID != 0) {
			var tdName = htmlTableCell(htmlAHref('?view=island&cityId=' + sc.ID, sc.name));
			tdName.setAttribute('title', 'Jump to island view');
		}
		else {
			var tdName = htmlTableCell(sc.name);
			tdName.setAttribute('title', "Visit the city view to enable link to island view");
		}
		if (!sc.active){
			tdName.setAttribute('style', 'font-style:italic;font-weight:normal');
		}
		tdName.setAttribute('name', sc.name);
		tdName.setAttribute('onMouseOut', "this.style.backgroundColor = null;" +
												"this.firstChild.nextSibling.style.display = 'none'");
		tdName.addEventListener('mouseover', displayPadTooltip, false);
		tr.appendChild(tdName);
		// journey time
		var journeyTime = sc.island.getTravelTimeAsCompactString(sourceCity.island);
		tr.appendChild(htmlTableCell(journeyTime));
		// total lootable (predicted)
		var predictedLootableTotal = sc.getPredictedLootableTotal(false);
		var lootableTotal = sc.getLootableTotal(false);
		var tdLootable = htmlTableCell(intToString(Math.ceil(predictedLootableTotal)));
		tdLootable.setAttribute('id', sc.id);
		tdLootable.setAttribute('name', sc.name);
		if(sc.active) {tdLootable.setAttribute('title', 'City marked as ACTIVE. Click to toggle.');}
		else {tdLootable.setAttribute('title', 'City marked as INACTIVE. Click to toggle.');}
		if(predictedLootableTotal > lootableTotal) {
			tdLootable.setAttribute('style', 'cursor: pointer;font-weight:bold');
		}
		else {
			tdLootable.setAttribute('style', 'cursor: pointer');
		}
		
		tdLootable.setAttribute('onMouseOut', "this.style.backgroundColor = null; ");
		tdLootable.setAttribute('onMouseOver', "this.style.backgroundColor = '#E6E6FA'; ");									
		tdLootable.addEventListener('click', toggleActiveButtonOnClickHandler, false);
		tr.appendChild(tdLootable);
		// luxury resource (as image)
		tr.appendChild(htmlTableCell(htmlImg(sc.getLuxuryResourceImage(), null, 15)));
		// age of information (in compact format)
		var ageStr = sc.getAgeAsString(true);
		tdAge = htmlTableCell(ageStr);
		tr.appendChild(tdAge);
				
		// spy mission button (show only if target city id known)
		// ?view=spyMissions&id=36695 (id = target city id)
		if(sc.spyWarehouseEnabled()) {
			var url = '?view=spyMissions&id=' + sc.ID;
			var spyButton = htmlTableCell(htmlAHref(url, htmlImg(IMAGES.spyMission, 'Spy Missions', 15)));
			spyButton.setAttribute('style', 'cursor: pointer');
			tr.appendChild(spyButton);
		}
		else {
			tr.appendChild(htmlTableCell(''));
		}
		
		// pillage button (show only if target city id known)
		if(sc.pillageEnabled()) {
			var pb = htmlTableCell(htmlAHref('?view=plunder&destinationCityId=' + sc.ID, htmlImg(IMAGES.pillage, 'Pillage', 15)));
			pb.setAttribute('style', 'cursor: pointer');
			tr.appendChild(pb);
		}
		else {
			tr.appendChild(htmlTableCell(''));
		}

		// "Clear total lootable" button (always available)
		var clearButton = htmlTableCell(htmlImg(IMAGES.clear, 'Clear total lootable', 12));
		clearButton.setAttribute('name', sc.name);
		clearButton.addEventListener('click', clearButtonOnClickHandler, false);
		clearButton.setAttribute('style', 'cursor: pointer');
		tr.appendChild(clearButton);

		// send spy button (show only if enough information available)
		// ?view=sendSpy&destinationCityId=36695&islandId=374
		if(sc.sendSpyEnabled()) {
			var url = '?view=sendSpy&destinationCityId=' + sc.ID + '&islandId=' + sc.island.ID;
			var sendSpyButton = htmlTableCell(htmlAHref(url, htmlImg(IMAGES.sendSpy, 'Send Spy', 15)));
			sendSpyButton.setAttribute('style', 'cursor: pointer');
			tr.appendChild(sendSpyButton);
		}
		else {
			tr.appendChild(htmlTableCell(''));
		}

		// "Remove city" button (always available)
		var removeButton = htmlTableCell(htmlImg(IMAGES.remove, 'Remove city from Spy Tracker', 10));
		removeButton.setAttribute('name', sc.name);
		removeButton.addEventListener('click', removeButtonOnClickHandler, false);
		removeButton.setAttribute('style', 'cursor: pointer');
		tr.appendChild(removeButton);
		// append row to table
		srTableBodyElement.appendChild(tr);
		
	}
	consoleTimeEnd('SpyTracker.UpdatePad.Cities');
	target.appendChild(srTableBodyElement);
	
}


displayPadTooltip = function(e) {
	// city to display tooltip for
	var sc = db.findSpyCityByName(this.getAttribute('name'));
	var protectedResourcesAmount = sc.getProtectedResourcesAmount();
	// Set selected own city as the source for pillaging
	var sourceCity = db.getSelectedOwnCity();

	// just show tooltip if already created (and not already visible)
	if(this.firstChild.nextSibling) {
		if(this.firstChild.nextSibling.style.display == 'none') {
			this.firstChild.nextSibling.style.display = 'block';
			// horizontal position must be updated in case window size is modified after tooltip creation
			this.firstChild.nextSibling.style.left = $('container').offsetLeft + 200 + 'px';
			this.style.backgroundColor = '#E6E6FA';
		}
	}
	// otherwise create it
	else {
		// create an Ikariam like tooltip for name cell
		var divTooltip = htmlDiv(htmlH5('Spy Tracker details on "' + sc.name + '"'));
		divTooltip.setAttribute('class', 'tooltip2');
		// position relative to the left side of the main Ikariam container
		var left = $('container').offsetLeft + 200;
		divTooltip.setAttribute('style', 'display:block; z-index: 2000; position: fixed; top:200px; left:' + left + 'px');
		this.appendChild(divTooltip);

		// Add city information to tooltip
		divTooltip.appendChild(ikariamTooltipCell(IMAGES.city, '', 30));
		divTooltip.appendChild(ikariamTooltipCell(IMAGES.buildingWall, sc.wallLevel, 30));
		divTooltip.appendChild(ikariamTooltipCell(IMAGES.buildingWarehouse, sc.warehouseLevel, 30));
		divTooltip.appendChild(ikariamTooltipCell(IMAGES.journeyTime, sc.island.getTravelTimeAsString(sourceCity.island), 30));
		var growthRates = sc.getGrowthRates();
		var divTooltipCell = ikariamTooltipCell(IMAGES.time, sumArray(growthRates).toFixed(2), 10);
		divTooltipCell.childNodes[0].appendChild(htmlImg(IMAGES.growth, 'Growthrate', 10));
		divTooltip.appendChild(divTooltipCell);
		divTooltip.appendChild(ikariamTooltipCell(IMAGES.sigma, sc.getPredictedLootableTotal(true), 10));
				
		// add spy reports to tooltip
		for (var i = 0; i < sc.spyTrackerReports.length; i++) {
			divTooltip.appendChild(htmlBr());
			var sr = sc.spyTrackerReports[i];
			loot = sr.getResourcesAsLootableShips(protectedResourcesAmount);
			divTooltip.appendChild(ikariamTooltipCell(IMAGES.spyMission, '', 30));
			divTooltip.appendChild(ikariamTooltipCell(IMAGES.time, sr.getAgeAsString(false), 15));
			// lootable resources
			for (var j in loot) {
				divTooltip.appendChild(ikariamTooltipCell(RESOURCE_IMAGES[j], Math.ceil(loot[j]), 20));
			}
			// total amount
			divTooltip.appendChild(ikariamTooltipCell(IMAGES.sigma, Math.ceil(sumArray(loot)), 10));
			
			// calculate total growth and growth rate (as ships/day) for all but the last one
			if(i < (sc.spyTrackerReports.length-1)) {
				var prevSr = sc.spyTrackerReports[i+1];
				var totalGrowth = sr.getTotalGrowth(prevSr, protectedResourcesAmount);
				divTooltip.appendChild(ikariamTooltipCell(IMAGES.growth, totalGrowth.toFixed(2), 20));
				// calculate growth rate based on report dates
				if(totalGrowth > 0) {
					var timeDiffInDays = sr.calculateTimeDiffAsDays(prevSr);
					var growthRate = totalGrowth /  timeDiffInDays;
					var divTooltipCell = ikariamTooltipCell(IMAGES.time, growthRate.toFixed(2), 10);
					var img = htmlImg(IMAGES.growth, 'Growthrate', 10);
					divTooltipCell.childNodes[0].appendChild(img);
					divTooltip.appendChild(divTooltipCell);
				}
			}
		}
	}
}


/*
 * "this" refers to event sender, ResetResources button in 
   the spy tracker pad
*/ 
clearButtonOnClickHandler = function(){
	db.findSpyCityByName(this.getAttribute('name')).resetSpyReports();
	db.sort();
	db.storeToGM();
	db.updateSpyTrackerPad();
}

removeButtonOnClickHandler = function(){
	var cityName = this.getAttribute('name');
	if (confirm('Do you really want to remove "' + cityName + '" from Spy Tracker?')) {
		db.removeSpyCityByName(this.getAttribute('name'));
		db.storeToGM();
		db.updateSpyTrackerPad();
	}
}

toggleActiveButtonOnClickHandler = function(){
	db.findSpyCityByName(this.attributes[2].value).toggleActive();
	db.storeToGM();
	db.updateSpyTrackerPad();
}

onPadTableHeaderClick = function() {
	var columnIndex = parseInt(this.getAttribute('columnIndex'));
	if(SPYTRACKER_SORT_COLUMNS[columnIndex]) {
		db.settings.sortByColumn = SPYTRACKER_SORT_COLUMNS[columnIndex];
		db.storeSettings();
		db.sort();
		db.updateSpyTrackerPad();
	}
}


spyTrackerDB.prototype.debugPrint = function() {
	syslog('--------           spyTrackerDB debug start       -----------',1);
	syslog('Version: ' + this.version,1);
	syslog('Own cities:',1)
	for (var i = 0; i < this.ownCities.length; i++) {
		syslog(this.ownCities[i].toString(),1);
	}
	syslog('Spy cities:',1)
	for (var i = 0; i < this.spyCities.length; i++) {
		syslog(this.spyCities[i].toString(),1);
	}
	syslog('--------           spyTrackerDB debug end         -----------',1);
}

spyTrackerDB.prototype.storeToGM = function() {
	var key = getDomain() + '.SpyTrackerDB.' + currentDBVersion;
	GM_setValue(key, this.toString());
}

spyTrackerDB.prototype.loadFromGM = function() {
	var key = getDomain() + '.SpyTrackerDB.' + currentDBVersion;
	this.fromString(GM_getValue(key,''));
}

spyTrackerDB.prototype.loadSettings = function() {
	this.settings.loadFromGM();
}

spyTrackerDB.prototype.storeSettings = function() {
	this.settings.storeToGM();
}


function $(id){
	return document.getElementById(id);
}

function initSpyTrackerPad() 
{
	var container = $("container2");
	if (container == null) {
		syslog('Spy Tracker pad initialisation failed due to missing container',1);
		return false;
	}
	// find the correct sibling to attach the pad before
	var sibling = null;
	sibling = spyTrackerGetPadSibling();
	if(!sibling) {
		if ($('actioncontainer') && $('actioncontainer').nextSibling) {
			sibling = $('actioncontainer');
		}
		else if($('information') && $('information').nextSibling) {
			sibling = $('information');
		}
		else {
			syslog('Spy Tracker pad initialisation failed due to missing sibling',1);
			return false;
		}
	}
	
	// Add styles
	GM_addStyle('#SpyTrackerPad tr td { font-weight:normal; color:#7E4A21; font-size:11px; text-align: left; padding-left:2px }');
	
	// Pad frame div
	var padDiv = document.createElement('div');
	padDiv.setAttribute('class', 'dynamic');
	// Header
	var header = document.createElement('h3');
	header.setAttribute('class', 'header');
	header.style.padding = '1px';
	var heading = document.createElement('label');
	heading.textContent = 'Spy Tracker';
	header.appendChild(heading);
	var versionLabel = document.createElement('label');
	versionLabel.textContent = 'v' + version;
	versionLabel.style.fontSize = '10px';
	versionLabel.style.marginLeft = '4px';
	header.appendChild(versionLabel);
	//var infoImg = htmlImg(IMAGES.info, 'Spy Tracker Info', 15);
	//infoImg.style.position = 'absolute';
	//infoImg.style.left = '10px';
	//infoImg.style.top = '7px';
	//infoImg.addEventListener('mouseover', displayInfoTooltip, false);
	//header.appendChild(infoImg);

	// Update button
	updateButton = htmlButton('Update');
	updateButton.style.display = 'none';
	updateButton.style.margin = '0px 0px 0px 5px';
	updateButton.style.padding = '0px 0px 0px 0px';
	updateButton.style.fontSize = '9px';
	updateButton.addEventListener('click', onUpdateClick, false);
	header.appendChild(updateButton);
	padDiv.appendChild(header);
	
	// Command bar #### TBD
	// initCommandBar(padDiv);
	
	// Table container div
	var tableDiv = document.createElement("div");
	tableDiv.setAttribute('class', 'content');
	tableDiv.setAttribute('style', 'max-height: 350px; overflow: auto;');
	padDiv.appendChild(tableDiv);
	// Table itself
	var table = document.createElement("table");
	table.setAttribute('id', 'SpyTrackerPad');
	table.setAttribute('width', '100%');
	table.setAttribute('border', '0');
	tableDiv.appendChild(table);
	// Footer
	var footerDiv = document.createElement("div");
	footerDiv.setAttribute('class', 'footer');
	tableDiv.appendChild(footerDiv);
	if(sibling && sibling.nextSibling) container.insertBefore(padDiv, sibling.nextSibling);
	else {
		syslog('Unable to find correct place for pad',1);
		return false;
	}
	return true;
}

function onUpdateClick(e) {
	syslog('Spy Tracker - version update activated', 1);
	// hides the update button next time Spy Tracker is opened
	GM_deleteValue('SpyTracker.newVersion');
	// update check will be performed next time Spy Tracker is opened
	// (in case user cancels the installation)
	GM_deleteValue('SpyTracker.lastUpdateCheck');
	location.href = scriptURL;
}


/* Not used at the moment */
displayInfoTooltip = function(e) {
	// just show tooltip if already created (and not already visible)
	if(this.firstChild) {
		// ####
		syslog('displayInfoToolTip.show',1);
		if(this.firstChild.style.display == 'none') {
			this.firstChild.style.display = 'block';
			// horizontal position must be updated in case window size is modified after tooltip creation
			this.firstChild.style.left = $('container').offsetLeft + 200 + 'px';
			this.style.backgroundColor = '#E6E6FA';
		}
	}
	// otherwise create it
	else {
		// ####
		syslog('displayInfoToolTip.create',1);
		// create an Ikariam like tooltip for info image
		var divTooltip = htmlDiv(htmlH5('Spy Tracker info'));
		divTooltip.setAttribute('class', 'tooltip2');
		// position relative to the left side of the main Ikariam container
		var left = $('container').offsetLeft + 200;
		divTooltip.setAttribute('style', 'display:block; z-index: 2000; position: fixed; top:200px; left:' + left + 'px');
		this.appendChild(divTooltip);

		// Add city information to tooltip
		for (var i = 0; i < db.ownCities.length; i++) {
			divTooltip.appendChild(ikariamTooltipCell(IMAGES.city, db.ownCities[i].name, 30));
		}
	}
}


/* Not used at the moment */
function initCommandBar(parent) {
	var commandBar = document.createElement('table');
	commandBar.setAttribute('id', 'SpyTrackerCommandBar');
	commandBar.setAttribute('style', 'height: 20px;background: lightgray');
	commandBar.setAttribute('width', '100%');
	commandBar.setAttribute('class', 'content');
	// Row of command buttons
	var rowButtons = htmlTableRow();
	// "Spy Mission" button
	var spyButton = htmlTableHeaderCell(htmlImg(IMAGES.spyMission, 'Spy Warehouse', 20));
	spyButton.setAttribute('style', 'cursor: pointer');
	//spyButton.addEventListener('click', onSpyButtonClick);
	rowButtons.appendChild(spyButton);
	// "Pillage" button
	var pillageButton = htmlTableHeaderCell(htmlImg(IMAGES.pillage, 'Pillage', 20));
	pillageButton.setAttribute('style', 'cursor: pointer');
	rowButtons.appendChild(pillageButton);
	// "Clear total lootable" button
	var clearButton = htmlTableHeaderCell(htmlImg(IMAGES.clear, 'Clear total lootable', 20));
	//clearButton.addEventListener('click', clearButtonOnClickHandler, false);
	clearButton.setAttribute('style', 'cursor: pointer');
	rowButtons.appendChild(clearButton);
	// "Send Spy" button
	var sendSpyButton = htmlTableHeaderCell(htmlImg(IMAGES.sendSpy, 'Send Spy', 20));
	sendSpyButton.setAttribute('style', 'cursor: pointer');
	rowButtons.appendChild(sendSpyButton);
	// "Remove city" button
	var removeButton = htmlTableHeaderCell(htmlImg(IMAGES.remove, 'Remove city from Spy Tracker', 20));
	//removeButton.addEventListener('click', removeButtonOnClickHandler, false);
	removeButton.setAttribute('style', 'cursor: pointer');
	rowButtons.appendChild(removeButton);
	// finally first add the row of buttons to commandbar and then whole thing to parent
	commandBar.appendChild(rowButtons);
	parent.appendChild(commandBar);
}


function checkVersion() {
	// get the stored last update check time
	var lastUpdateCheck = parseInt(GM_getValue('SpyTracker.lastUpdateCheck', 0));
	var now = parseInt(new Date().getTime());
		
	// calculate time elapsed since last update check
	var performCheck = (isNaN(lastUpdateCheck) || ((now - lastUpdateCheck) > updateCheckInterval));
	
	// perform update check if necessary
	if (performCheck) {
		syslog('Spy Tracker performing update check', 1);
		// get the script source
		try	{
			GM_xmlhttpRequest({
				method: "GET",
				url: scriptMetaURL,
				onload: function(xhr) { checkVersionResponseHandler(xhr.responseText); }
			});
			GM_setValue('SpyTracker.lastUpdateCheck', '' + now);
		}
		catch(err) {
			syslog('checkVersion, GM_xmlhttpRequest failed: ' + err.description, 1);
		}
	}
	else {
		// also check if an update was found earlier on
		var newVersion = GM_getValue('SpyTracker.newVersion', '');
		if(newVersion != '') {
			updateButton.title = 'Update to ' + newVersion;
			updateButton.style.display = 'inline-block';
		}
	}
}

function checkVersionResponseHandler(responseText) {
	var lines = responseText.split('\n');
	var latestVersion = null;
	for(i=0; i < lines.length; i++ ) {
		if(lines[i].indexOf(versionTag) != -1) {
			// extract the version info from line (excluding any whitespace)
			latestVersion = lines[i].substr(versionTag.length).replace(/^\s*|\s*$/g,'');
		}
	}
	if(!latestVersion) {
		syslog('Spy Tracker - version information not found in the latest script source', 1);
		return;
	}
	if (version != latestVersion) {
		syslog('Spy Tracker, new version available (current: ' + version + ' new: ' + latestVersion + ')', 1);
		updateButton.title = 'Update to ' + latestVersion;
		updateButton.style.display = 'inline-block';
		GM_setValue('SpyTracker.newVersion', latestVersion);
	}
}
	  


/*  -----------------------------------------------------------------------------

	This is the SpyTracker "main function" which is executed whenever included 
	Ikariam page is visited

  -----------------------------------------------------------------------------*/
syslog('SpyTracker - Initialising pad',1);

consoleTime('SpyTracker.Total');
  
if(initSpyTrackerPad()){
	syslog('SpyTracker - Pad initialised successfully',1);
	
	// check for version updates (performed only once in 24h)
	checkVersion();
	
	var db = new spyTrackerDB();

	consoleTime('SpyTracker.Load');
	
	// Read own city information from city selection drop down
	db.readOwnCities();

	// Initialise spyTrackerDB by loading cached data
	db.loadFromGM();
	
	// Load the settings
	db.loadSettings();
	
	// Sort the database according to settings
	db.sort();
	
	consoleTimeEnd('SpyTracker.Load');

	consoleTime('SpyTracker.View');
	
	// safehouse reports view
	// collects all new reports (duplicates not added)
	if(ikariamIsSafeHouseReportsView()) {
		db.viewSafeHouseReports();
	}
		
	// city view
	if (ikariamIsCurrentView('city')) {
		db.viewCity();
	}
		
	// send spy view (view=sendSpy&destinationCityId=62499)
	if (ikariamIsCurrentView('sendSpy')) {
		db.viewSendSpy();
	}
		
	// spy missions view (view=spyMissions&id=70557)
	if (ikariamIsCurrentView('spyMissions')) {
		db.viewSpyMissions();
	}	
	consoleTimeEnd('SpyTracker.View');
	
	// update the pad view
	consoleTime('SpyTracker.PadUpdate');
	db.updateSpyTrackerPad();
	consoleTimeEnd('SpyTracker.PadUpdate');
	
	// pillage (plunder) view
	if (ikariamIsCurrentView('plunder')) {
		db.viewPlunder();
	}
	
	consoleTimeEnd('SpyTracker.Total');
	syslog('SpyTracker finished', 2);
}
else syslog('SpyTracker - Failed to initialise pad',1);