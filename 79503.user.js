// ==UserScript==
// @name			Oros Language Pack
// @namespace		oroslanguagepack
// @description		Language Pack for Oros
// @include			http://*.ogame.*/game/index.php?*
// @require			http://userscripts.org/scripts/source/74440.user.js
// @version			1.2.5
// ==/UserScript==

/* @Translators
	How to translate Oros :
	* copy the text between the "START COPY HERE" and "END COPY HERE"
	* paste it just BEFORE the "PASTE HERE" at the end of the file
	* change "en" in the text you just paste by your language as it appears in the Ogame url (for exemple org, fr, de, es, it, ...)
	* translate only the part that are between ' or "
	* if you see "{0}" (or any number within the {}), don't translate it ^^
	* you have to put a backslash "\" before all ' or ", depending on the one you choose to start the string
		example:
			don't write 'My tailor isn't "rich"' but 'My tailor isn\'t "rich"'
			don't write "My tailor isn't "rich"" but "My tailor isn't \"rich\""
*/
var TXT = {
	/* START COPY HERE */
	en: {
		general: {
			on: 'on',
			off: 'off',
			save: 'Save',
			saveSuccess: 'Save successed',
			saveFailed: 'Save failed',
			production: { long: 'Production', short: 'Prod' },
			consumption: { long: 'Consumption', short: 'Cons' },
			endTimeConstruction: 'Construction end time',
			total: 'Total',
			remaining: 'remaining',
			missing: 'missing',
			needed: 'needed',
			notdone: 'Not done yet. Check back on version updates.',
			date: 'Date',
			activity: 'Activity',
			attack: 'Attack',
			copy: 'Copy',
			state: 'State',
			time: 'Time',
			init: 'Reset',
			version: 'Version',
			active: 'Active'
		},
		calc: {
			title: 'Calculator',
			converter: 'Converter',
			shortDeut: 'Deut.',
			valueError: 'The value "{0}" isn\'t a correct value !',
			totalLink: 'Click here to set the calculator resources to this cost.',
			missingLink: 'Click here to set the calculator resources to the missing cost.'
		},
		dailyTransport: {
			title: 'Daily Transport',
			nextPlanet: 'Next planet',
			done: 'Daily transport complete'
		},
		date: { //@Translators: in the "date" section, put 2 backslash "\\" before all the following letters : d m y h n s z
			day: [
				{ short: 'Su', long: 'Su\\n\\da\\y' },
				{ short: 'Mo', long: 'Mo\\n\\da\\y' },
				{ short: 'Tu', long: 'Tue\\s\\da\\y' },
				{ short: 'We', long: 'We\\d\\ne\\s\\da\\y' },
				{ short: 'Th', long: 'T\\hur\\s\\da\\y' },
				{ short: 'Fr', long: 'Fri\\da\\y' },
				{ short: 'Sa', long: 'Satur\\da\\y' }
			],
			month: [
				{ short: 'Ja\\n', long: 'Ja\\nuar\\y' },
				{ short: 'Feb', long: 'Februar\\y' },
				{ short: 'Mar', long: 'Marc\\h'},
				{ short: 'Apr', long: 'April'},
				{ short: 'Ma\\y', long: 'Ma\\y'},
				{ short: 'Ju\\ne', long: 'Ju\\ne'},
				{ short: 'Jul', long: 'Jul\\y' },
				{ short: 'Aug', long: 'Augu\\st'},
				{ short: 'Sep', long: 'Septe\\mber' },
				{ short: 'Oct', long: 'October' },
				{ short: 'Nov', long: 'Nove\\mber' },
				{ short: 'Dec', long: 'Dece\\mber' },
			],
			timespan: {
				year: {short: 'y', long: 'Year'},
				month: {short: 'M', long: 'Month'},
				week: {short: 'w', long: 'Week'},
				day: {short: 'd', long: 'Day'},
				hour: {short: 'h', long: 'Hour'},
				minute: {short: 'm', long: 'Minute'},
				second: {short: 's', long: 'Second'}
			}
		},
		resources: {
			metal: { long: 'Metal', short: 'm' }, // /!\ "M" is used for million (depending on your language)
			cristal: { long: 'Crystal', short: 'c' },
			deuterium: { long: 'Deuterium', short: 'd' },
			energy: { long: 'Energy', short: 'e' },
			mmet: { long: 'Metal Mine', short: 'mmet' },
			mcri: { long: 'Crystal Mine', short: 'mcry' },
			mdet: { long: 'Deuterium Synthesizer', short: 'mdet' },
			ces: { long: 'Solar Plant', short: 'sp' },
			cef: { long: 'Fusion Reactor', short: 'fr' },
			hmet: { long: 'Metal Storage', short: 'smet' },
			hcri: { long: 'Crystal Storage', short: 'scri' },
			hdet: { long: 'Deuterium Tank', short: 'sdet' }
		},
		station: {
			time: 'Time gained',
			slot: 'Maximum usable fields',
			network: 'This Research Lab is part of the Intergalactic Research Network which is level {0}.',
			rob: { long: 'Robotic Factory', short: 'RF' },
			cspa: { long: 'Shipyard', short: 'SY' },
			lab: { long: 'Research Lab', short: 'Lab' },
			silo: { long: 'Missile Silo', short: 'Silo' },
			depo: { long: 'Alliance Depot', short: 'AD' },
			nan: { long: 'Nanite Factory', short: 'NAN' },
			ter: { long: 'Terraformer', short: 'Terra' },
		},
		shipyard: {
			cle: { long: 'Light Fighter', short: 'LF' },
			clo: { long: 'Heavy Fighter', short: 'HF' },
			crois: { long: 'Cruiser', short: 'CR' },
			vb: { long: 'Battleship', short: 'BS' },
			traq: { long: 'Battlecruiser', short: 'BC' },
			bomb: { long: 'Bomber', short: 'Bomb' },
			dest: { long: 'Destroyer', short: 'Dest' },
			edlm: { long: 'Deathstar', short: 'RIP' },
			pt: { long: 'Small Cargo Ship', short: 'SC' },
			gt: { long: 'Large Cargo Ship', short: 'LC' },
			vc: { long: 'Colony Ship', short: 'CS' },
			rec: { long: 'Recycler', short: 'Rec' },
			esp: { long: 'Espionage Probe', short: 'Probe' },
			ss: { long: 'Solar Satellite', short: 'Sat' }
		},
		defense: {
			lm: { long: 'Rocket Launcher', short: 'RL' },
			lle: { long: 'Light Laser', short: 'LL' },
			llo: { long: 'Heavy Laser', short: 'HL' },
			gauss: { long: 'Gauss Cannon', short: 'Gauss' },
			ion: { long: 'Ion Cannon', short: 'Ion' },
			pla: { long: 'Plasma Turret', short: 'PT' },
			pb: { long: 'Small Shield Dome', short: 'SSD' },
			gb: { long: 'Large Shield Dome', short: 'LSD' },
			mic: { long: 'Anti-Ballistic Missile', short: 'ABM' },
			mip: { long: 'Interplanetary Missile', short: 'IPM' }
		},
		options: {
			langTitle: 'Language',
			tabs: { general: 'General', page: 'Pages' },
			calc: { title: 'Calculator', show: 'Show' },
			dailyTransport: {title: 'Daily Transport', active: 'Active', main: 'Homeland' },
			date: {
				title: 'Date & Time',
				format: 'Display format of dates',
				complete: 'Show full date',
				formatHelp: '<table class="zebra" cellpadding="0" cellspacing="0">'
					+ '<tr><th colspan="3">Available date format</th></tr>'
					+ '<tr><th>Format</th>	<th>Description</th>						<th>Example</th></tr>'
					+ '<tr><td>dddd</td>	<td>Day name</td>							<td>Monday</td></tr>'
					+ '<tr><td>ddd</td>		<td>Short day name</td>						<td>Mo</td></tr>'
					+ '<tr><td>dd</td>		<td>Day (2 digits)</td>						<td>01</td></tr>'
					+ '<tr><td>d</td>		<td>Day</td>								<td>1</td></tr>'
					+ '<tr><td>mmmm</td>	<td>Month name</td>							<td>January</td></tr>'
					+ '<tr><td>mmm</td>		<td>Short month name</td>					<td>Jan</td></tr>'
					+ '<tr><td>mm</td>		<td>Month (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>m</td>		<td>Month</td>								<td>1</td></tr>'
					+ '<tr><td>yyyy</td>	<td>Year</td>								<td>2010</td></tr>'
					+ '<tr><td>yy</td>		<td>Year (2 digits)</td>					<td>10</td></tr>'
					+ '<tr><td>hh</td>		<td>Hour (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>h</td>		<td>Hour</td>								<td>1</td></tr>'
					+ '<tr><td>nn</td>		<td>Minute (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>n</td>		<td>Minute</td>								<td>1</td></tr>'
					+ '<tr><td>ss</td>		<td>Second (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>s</td>		<td>Second</td>								<td>1</td></tr></table><br />'
					+ 'By default : "ddd dd/mm/yy hh:nn:ss" soit "Sa 26/06/10 16:30:45"<br />'
					+ 'To use one of the special chars above, write two backslashes "\\" before.'
					+ 'For example, "hh\\hnn\\mss\\s" give "16h30m45s"'
			},
			pages: {
				buildings: 'Resources & Station',
				research: 'Research',
				shipyard: 'Shipyard',
				defense: 'Defense',
				defenceOptimizer: 'Defense optimizer',
				showConso: 'Show consumption',
				showCost: 'Show cost',
				showEndTime: 'Show construction end time',
				showOptimizer: 'Show optimizer',
				showProd: 'Show production',
				messages: 'Messages',
				showShortcut: 'Show shortcuts',
				galaxy: 'Galaxy',
				showDebris: 'Show debris\' resources',
				minDebris: 'Display in red debris that contain more than ...',
				showColors: 'Show colors on all the line (inactive, vacation, strong, weak)',
				showDestroyed: 'Show available colony slot and destroyed planet in red<br />(only if you have at least one available colony slot)'
			}
		},
		oros: { 
			tabs: { home: 'Home', sim: 'Simulator & Tools', options: 'Options' }
		},
		setup: {
			title: 'Setup',
			step: 'step',
			step1: {
				desc: 'First of all, you need to visit at least two different planets to get all planets\' informations.',
				info: 'Click on a different planet on the right to continue.'
			},
			step2: {
				desc: 'Now that Oros know your planets, click on the Oros button to access Oros Home, Simulators and Options pages.',
				info: 'Click on the Oros button at the bottom of Ogame menu to continue.'
			},
			step3: {
				desc: 'This is the main frame for Oros. Here you\'ll find oros\' options, tools and help.',
				info: 'Click on the Options tab to continue.'
			},
			step4: {
					desc: '<p>General options allow you to enable/disable tools. Pages\' options will let you choose which information'
						+ ' you want to see on the Ogame pages.</p>'
						+ '<p>This is the last step of this setup. Visit each resources, station, shipyard and defenses pages'
						+ ' (as well as one research page) to get all your account informations. If you have the commander account,'
						+ ' you can just go to the Empire page to get everything, excepts constructions\' end time.</p>'
						+ '<p>After you finish this, you might want to check out Oros\' tutorials on Oros\' home page.</p>',
					info: 'Choose your home planet then click the "Save" button to finish the setup.'
			}
		},
		msg: {
			read: 'Mark as read',
			selected: 'Delete selected',
			notSelected: 'Delete not selected',
			shown: 'Delete shown',
			all: 'Delete all',
			empty: 'Empty',
			restore: 'Restore marked',
			restoreAll: 'Restore all'
		},
		home: {
			tabs: { home: 'Home', tuto: 'Tutorials', translation: 'Translations'},
			tuto: {
				desc: 'Do you want to know what Oros can do ?',
				info: 'Click on the button below or on the tab above to get on a tour of Oros.',
				btn: 'Start the tutorial',
				infoEnhancment: {
					desc: '',
					prod: '',
					cons: '',
					cefprod: '',
					cefcons: '',
					sat: '',
					research: '',
					cost: ''
				},
				calc: {
					desc: '',
					info: ''
				},
				dailyTransport: {
					desc: '',
					info: ''
				},
			},
			welcome: 'Welcome in Oros (Ogame Redesign Ouadjet Script) !',
			develop: 'Developped by Ouadjet, 2009-2010',
			homepage: 'View home page',
			reset: {
				title: 'Reset Oros',
				desc: 'Did you find bugs in Oros ? Did you installed it a long time ago, and many new versions have come ?',
				info: 'Reset your settings and data could help fixing bugs due to evolution.'
			}
		},
		sim: {
			tabs: { spy: 'SpyTool', grav: 'Graviton', costs: 'Construction' },
			spytool: { 
				state: ['Ok', 'Poor', 'Stronger', 'More probes', 'Too old', ''],
				supprAll: 'Delete all spy reports',
				minTotal: 'Minimum total resources to be "Ok" (set 0 to take each resource into account)',
				minM: 'Minimum metal to be "Ok"',
				minC: 'Minimum crystal to be "Ok"',
				minD: 'Minimum deuterium to be "Ok"',
				validTime: 'Time before it\'s "Too old"'
			},
			grav: {
				cspahelp: 'The shipyard is used to speed up your ships construction.<br/>'
					+ 'Enter the wanted level to get the total cost to it displayed on the right.',
				nanhelp: 'The nanite factory is used to speed up your ships construction.<br/>'
					+ 'Enter the wanted level to get the total cost to it displayed on the right.',
				labhelp: 'The research lab is necessary to research the graviton technology. It has to be level 12.<br/>'
					+ 'Enter the wanted level to get the total cost to it displayed on the right.',
				sshelp: 'Satellites are used to get enough energy to research graviton. You need 300k energy to do it.<br/>'
					+ 'The number on the right side of the image is the needed amount taking into account'
					+ ' your actual energy production.',
				gthelp: 'Large cargo ships are used to deliver the resources for satellites to be done at once.<br/>'
					+ 'In the bottom right corner, it displays the needed amount and in the top right corner you will find'
					+ ' the missing amount, taking into account ships on your main planet (defined in the options).',
				rechelp: 'Recyclers are used to get back the cristal when the research is done and your satellites are down.<br/>'
					+ 'In the bottom right corner, it displays the needed amount and in the top right corner you will find'
					+ ' the missing amount, taking into account ships on your main planet (defined in the options).',
				totalhelp: 'The total shows the total amount of resources needed to build everything and the time needed to'
					+ ' get all this resources taking into account your overall production and your home planet\'s stock.<br/>'
					+ 'Add/Remove an item from it by clicking on the <Take into account> link in front of each element.'
			}
		},
		update: {
			title: 'A new version of Oros is available.',
			help: '|Click here to go to the script\'s page.'
		},
		hint: {
			nextProd: 'Production at next level',
			curProd: 'Current production',
			diff: 'Difference between the two',
			energyLeft: 'Energy left on the planet after the construction',
			ssProd: 'Production per satellite',
			ssProdn: 'Production of {0} satellite(s)',
			nextCons: 'Consumption at next level',
			curCons: 'Current consumption',
			nextConsD: 'Deuterium consumption at next level',
			curConsD: 'Current deuterium consumption',
			deutLeft: 'Deuterium production after the construction',
			nextStock: 'Max stock at next level',
			curStock: 'Current max stock',
			rob: 'Used by Resources & Station',
			cspa: 'Used by Shipyard & Defense',
			nan: 'Used by Resources, Station, Shipyard & Defense',
			lab: 'Used by Research. Take into account the Intergalactic Research Network',
			nextSlot: 'Max planet slot after construction',
			curSlot: 'Current max planet slot'
		}
	},
	/* END COPY HERE */
	fr: {
		general: {
			on: 'on',
			off: 'off',
			save: 'Sauvegarder',
			saveSuccess: 'La sauvegarde a réussie',
			saveFailed: 'La sauvegarde a échouée',
			production: { long: 'Production', short: 'Prod' },
			consumption: { long: 'Consommation', short: 'Conso' },
			endTimeConstruction: 'Fin de la construction',
			total: 'Total',
			remaining: 'Restant',
			missing: 'Manquant',
			needed: 'Nécessaire',
			notdone: 'Pas encore fait. Veuillez revérifier lors des prochaines mises à jour.',
			date: 'Date',
			player: 'Joueur',
			coordinate: 'Coordonnées',
			activity: 'Activité',
			attack: 'Attaquer',
			copy: 'Copier',
			state: 'Etat',
			time: 'Temps',
			init: 'Réinitialiser',
			version: 'Version',
			active: 'Activer'
		},
		calc: {
			title: 'Calculette',
			shortDeut: 'Deut.',
			valueError: 'La valeur "{0}" n\'est pas une valeur correcte !',
			totalLink: 'Cliquez ici pour placer ce coût dans la calculette.',
			missingLink: 'Cliquez ici pour placer le coût manquant dans la calculette.'
		},
		dailyTransport: {
			title: 'Transport journalier', 
			nextPlanet: 'Planète suivante',
			done: 'Transport journalier terminé !'
		},
		date: { //@Translators: in the "date" section, put 2 backslash "\\" before all the following letters : d m y h n s z
			day: [
				{ short: 'Di', long: 'Di\\ma\\nc\\he' },
				{ short: 'Lu', long: 'Lu\\n\\di' },
				{ short: 'Ma', long: 'Mar\\di' },
				{ short: 'Me', long: 'Mercre\\di' },
				{ short: 'Je', long: 'Jeu\\di' },
				{ short: 'Ve', long: 'Ve\\n\\dre\\di' },
				{ short: 'Sa', long: 'Sa\\me\\di' }
			],
			month: [
				{ short: 'Ja\\nv', long: 'Ja\\nvier' },
				{ short: 'Fév', long: 'Février' },
				{ short: 'Mar\\s', long: 'Mar\\s'},
				{ short: 'Avril', long: 'Avril'},
				{ short: 'Mai', long: 'Mai'},
				{ short: 'Jui\\n', long: 'Jui\\n'},
				{ short: 'Juil', long: 'Juillet' },
				{ short: 'Août', long: 'Août'},
				{ short: 'Sept', long: 'Septe\\mbre' },
				{ short: 'Oct', long: 'Octobre' },
				{ short: 'Nov', long: 'Nove\\mbre' },
				{ short: 'Déc', long: 'Déce\\mbre' },
			],
			timespan: {
				year: {short: 'an', long: 'Année'},
				month: {short: 'M', long: 'Mois'},
				week: {short: 'S', long: 'Semaine'},
				day: {short: 'j', long: 'Jour'},
				hour: {short: 'h', long: 'Heure'},
				minute: {short: 'm', long: 'Minute'},
				second: {short: 's', long: 'Seconde'}
			}
		},
		resources: {
			metal: { long: 'Métal', short: 'm' }, // /!\ "M" is used for million (depending on your language)
			cristal: { long: 'Cristal', short: 'c' },
			deuterium: { long: 'Deuterium', short: 'd' },
			energy: { long: 'Energie', short: 'e' },
			mmet: { long: 'Mine de Métal', short: 'mmet' },
			mcri: { long: 'Mine de Cristal', short: 'mcri' },
			mdet: { long: 'Synthétiseur de Deuterium', short: 'mdet' },
			ces: { long: 'Centrale électrique solaire', short: 'ces' },
			cef: { long: 'Centrale électrique de fusion', short: 'cef' },
			hmet: { long: 'Hangar de métal', short: 'hmet' },
			hcri: { long: 'Hangar de cristal', short: 'hcri' },
			hdet: { long: 'Réservoir de deutérium', short: 'hdet' }
		},
		station: {
			time: 'Gain de temps',
			slot: 'Nombre maximal de cases utilisables',
			network: 'Ce laboratoire de recherche fait partie du Réseau de Recherche Intergalactique qui est de niveau {0}.',
			rob: { long: 'Usine de robots', short: 'Robots' },
			cspa: { long: 'Chantier spatial', short: 'CS' },
			lab: { long: 'Laboratoire de recherche', short: 'Labo' },
			depo: { long: 'Dépôt de ravitaillement', short: 'Dépôt' },
			silo: { long: 'Silo de missiles', short: 'Silo' },
			nan: { long: 'Usine de nanites', short: 'Nanite' },
			ter: { long: 'Terraformeur', short: 'Terra' },
		},
		shipyard: {
			cle: { long: 'Chasseur léger', short: 'CLe' },
			clo: { long: 'Chasseur lourd', short: 'CLo' },
			crois: { long: 'Croiseur', short: 'Croiseur' },
			vb: { long: 'Vaisseau de bataille', short: 'VB' },
			traq: { long: 'Traqueur', short: 'Traq' },
			bomb: { long: 'Bombardier', short: 'Bomb' },
			dest: { long: 'Destructeur', short: 'Dest' },
			edlm: { long: 'Étoile de la mort', short: 'EDLM' },
			pt: { long: 'Petit transporteur', short: 'PT' },
			gt: { long: 'Grand transporteur', short: 'GT' },
			vc: { long: 'Vaisseau de colonisation', short: 'Colo' },
			rec: { long: 'Recycleur', short: 'Rec' },
			esp: { long: 'Sonde d`espionnage', short: 'Sonde' },
			ss: { long: 'Satellite solaire', short: 'Sat' }
		},
		defense: {
			lm: { long: 'Lanceur de missiles', short: 'LM' },
			lle: { long: 'Artillerie laser légère', short: 'LLe' },
			llo: { long: 'Artillerie laser lourde', short: 'LLo' },
			gauss: { long: 'Canon de Gauss', short: 'Gauss' },
			ion: { long: 'Artillerie à ions', short: 'Ion' },
			pla: { long: 'Lanceur de plasma', short: 'Plasma' },
			pb: { long: 'Petit bouclier', short: 'PB' },
			gb: { long: 'Grand bouclier', short: 'GB' },
			mic: { long: 'Missile d`interception', short: 'MIC' },
			mip: { long: 'Missile Interplanétaire', short: 'MIP' }
		},
		options: {
			langTitle: 'Langue',
			tabs: { general: 'Général', page: 'Pages' },
			calc: { title: 'Calculette', show: 'Afficher' },
			dailyTransport: {title: 'Transport journalier', active: 'Activer', main: 'Planète mère' },
			date: {
				title: 'Date & Heure',
				format: 'Format d\'affichage des dates',
				complete: 'Afficher la date complète',
				formatHelp: '<table class="zebra" cellpadding="0" cellspacing="0">'
					+ '<tr><th colspan="3">Formats de date disponibles</th></tr>'
					+ '<tr><th>Format</th>	<th>Description</th>						<th>Exemple</th></tr>'
					+ '<tr><td>dddd</td>	<td>Nom du jour</td>						<td>Lundi</td></tr>'
					+ '<tr><td>ddd</td>		<td>Nom du jour abrégé</td>					<td>Lu</td></tr>'
					+ '<tr><td>dd</td>		<td>Numéro du jour (sur 2 chiffres)</td>	<td>01</td></tr>'
					+ '<tr><td>d</td>		<td>Numéro du jour</td>						<td>1</td></tr>'
					+ '<tr><td>mmmm</td>	<td>Nom du mois</td>						<td>Janvier</td></tr>'
					+ '<tr><td>mmm</td>		<td>Nom du mois abrégé</td>					<td>Janv</td></tr>'
					+ '<tr><td>mm</td>		<td>Numéro du mois (sur 2 chiffres)</td>	<td>01</td></tr>'
					+ '<tr><td>m</td>		<td>Numéro du mois</td>						<td>1</td></tr>'
					+ '<tr><td>yyyy</td>	<td>Année</td>								<td>2010</td></tr>'
					+ '<tr><td>yy</td>		<td>Année (sur 2 chiffres)</td>				<td>10</td></tr>'
					+ '<tr><td>hh</td>		<td>Heure (sur 2 chiffres)</td>				<td>01</td></tr>'
					+ '<tr><td>h</td>		<td>Heure</td>								<td>1</td></tr>'
					+ '<tr><td>nn</td>		<td>Minute (sur 2 chiffres)</td>			<td>01</td></tr>'
					+ '<tr><td>n</td>		<td>Minute</td>								<td>1</td></tr>'
					+ '<tr><td>ss</td>		<td>Seconde (sur 2 chiffres)</td>			<td>01</td></tr>'
					+ '<tr><td>s</td>		<td>Seconde</td>							<td>1</td></tr></table><br />'
					+ 'Par défaut : "ddd dd/mm/yy hh:nn:ss" soit Sa 26/06/10 16:30:45<br />'
					+ 'Pour utiliser l\'un des caractères spéciaux, utiliser un "\\" devant.'
					+ 'Par exemple, "hh\\hnn\\mss\\s" donne 16h30m45s'
			},
			pages: {
				buildings: 'Ressources & Installations',
				research: 'Recherche',
				shipyard: 'Chantier spatial',
				defence: 'Défense',
				defenceOptimizer: 'Optimiseur de défense',
				showConso: 'Afficher la consommation',
				showCost: 'Afficher le coût',
				showEndTime: 'Afficher la date et l\'heure de fin de construction',
				showOptimizer: 'Afficher l\'optimisation',
				showProd: 'Afficher la production',
				messages: 'Messages',
				showShortcut: 'Afficher les raccourcis',
				galaxy: 'Galaxie',
				showDebris: 'Afficher les ressources des débris',
				minDebris: 'Afficher en rouge les débris qui contiennent plus de ...',
				showColors: 'Afficher la couleur sur toute la ligne (inactif, vacances, fort, faible)',
				showDestroyed: 'Affiche les places disponibles et les planètes détruites en rouge<br />(seulement si vous avez au moins un emplacement de colonie libre)'
			}
		},
		oros: {
			tabs: { home: 'Accueil', sim: 'Simulateur', options: 'Options' }
		},
		setup: {
			title: 'Installation',
			step: 'Etape',
			step1: {
				desc: 'Voud devez d\'abord visiter au moins deux différents aperçu pour collecter les informations des planètes.',
				info: 'Cliquez sur une planète différente à droite pour continuer.'
			},
			step2: {
				desc: 'Maintenant qu\'Oros connait vos planètes, cliquez sur le bouton Oros pour accéder aux simulateurs, outils et options.',
				info: 'Cliquez sur le bouton Oros en bas du menu d\'Ogame pour continuer.'
			},
			step3: {
				desc: 'Voici la fenêtre principale d\'Oros. ici vous pourrez trouver les outils, les simulateurs, les options et les nouvelles sur Oros (via Facebook).',
				info: 'Cliquez sur l\'onglet Options ci-dessus pour continuer.'
			},
			step4: {
					desc: '<p>Les options générales vous permettent d\'activer/de désactiver les outils.'
						+ ' Les options de page vous permettront de choisir quelles informations ajouter aux différentes pages.</p>'
						+ '<p>C\'est la dernière étape de cette installation. Visitez chaque page ressources, installations, chantier spatial et défense'
						+ ' (ainsi qu\'une page de recherche) to obtenir toutes les informations sur votre compte. Si vous avez le compte commandant,'
						+ ' vous pouvez visiter la page Empire pour tout obtenir, sauf l\'heure de fin de contruction.</p>'
						+ '<p>Après avoir fini, vous pourriez vouloir obtenir plus d\informations sur ce qu\'Oros peut faire en visitant la page Facebook (sur l\'accueil d\'Oros.</p>',
					info: 'Choisissez votre planète mère puis cliquez sur "Sauvegarder" pour terminer l\'installation.'
			}
		},
		msg: {
			read: 'Marquer comme lu',
			selected: 'Effacer sél.',
			notSelected: 'Effacer non sél.',
			shown: 'Effacer affichés',
			all: 'Tout effacer',
			empty: 'Vider',
			restore: 'Restaurer sél.',
			restoreAll: 'Tout restaurer'
		},
		home: {
			tabs: { home: 'Accueil', translation: 'Traductions'},
			welcome: 'Bienvenue dans Oros (Ogame Redesign Ouadjet Script) !',
			develop: 'Developpé par Ouadjet, 2009-2010',
			homepage: 'Voir la page d\'accueil',
			reset: {
				title: 'Réinitialiser Oros',
				desc: 'Avez-vous trouver des bugs dans Oros ? L\'avez-vous installé depuis longtemps et plusieurs nouvelles versions ont été installées depuis ?',
				info: 'Réinitialiser vos paramètres et données peut aider à résoudre des bugs dû aux évolutions.'
			}
		},
		sim: {
			tabs: { spy: 'Espionnage', grav: 'Graviton', costs: 'Construction' },
			spytool: {
				state: ['Ok', 'Pauvre', 'Trop Fort', 'Plus de sondes', 'Trop vieux', ''],
				supprAll: 'Supprimer tous les rapports',
				minTotal: 'Montant minimum de ressources pour être "Ok" (entrer 0 pour prendre en compte chaque type de ressource séparement)',
				minM: 'Montant de métal minimum pour être "Ok"',
				minC: 'Montant de cristal minimum pour être "Ok"',
				minD: 'Montant de deuterium minimum pour être "Ok"',
				validTime: 'Temps avant d\'être "Trop vieux"'
			},
			grav: {
				cspahelp: 'Le chantier spatial est utilisé pour augmenter la vitesse de production de vos vaisseaux.<br/>'
					+ 'Entrez le niveau souhaité pour obtenir le coût de l\'évolution à droite.',
				nanhelp: 'L\'usin de nanite est utilisé pour augmenter la vitesse de production de vos vaisseaux.<br/>'
					+ 'Entrez le niveau souhaité pour obtenir le coût de l\'évolution à droite.',
				labhelp: 'Le laboratoire de recherche est obligatoire pour effectuer la recherche Graviton. Il doit être de niveau 12.<br/>'
					+ 'Entrez le niveau souhaité pour obtenir le coût de l\'évolution à droite.',
				sshelp: 'Les satellites sont utilisés pour obtenir l\'énergie nécessaire pour rechercher le graviton.'
					+ ' Vous avez besoin de 300k énergie pour cela.<br/>'
					+ 'Le chiffre affiché en bas à droite de l\'image est la nombre de satellites dont vous avez besoin.'
					+ ' Le nombre en haut à droite indique le nombre de satellites restant à construire.',
				gthelp: 'Les grands transporteurs sont utilisés pour transporter les ressources afin de créer les satellites en 1 fois.<br/>'
					+ 'En bas à droite de l\'image, vous trouverez le nombre nécessaire et en haut à droite le nombre manquant'
					+ ', en prennant en compte le nombre de vaisseaux de votre planète mère (définie dans les options).',
				rechelp: 'Les recycleurs sont utilisé pour récupérer le cristal une fois que la recherche est faite et que vos satellites sont détruits.<br/>'
					+ 'En bas à droite de l\'image, vous trouverez le nombre nécessaire et en haut à droite le nombre manquant'
					+ ', en prennant en compte le nombre de vaisseaux de votre planète mère (définie dans les options).',
				totalhelp: 'Le total affiche le total de ressources nécessaires pour tous construire ainsi que le temps nécessaire'
					+ ' pour tout obtenir en tenant compte de votre production totale (toutes planètes confondues) et du stock de votre planète mère.<br/>'
					//+ 'Add/Remove an item from it by clicking on the <Take into account> link in front of each element.'
			}
		},
		update: {
			title: 'Une nouvelle version d\'Oros est disponible.',
			help: '|Cliquez ici pour installer la nouvelle version.'
		},
		hint: {
			nextProd: 'Production au niveau suivant',
			curProd: 'Production actuelle',
			diff: 'Différence entre les deux',
			energyLeft: 'Energie restante sur la planète après construction',
			ssProd: 'Production par satellite',
			ssProdn: 'Production de {0} satellites',
			nextCons: 'Consommation au niveau suivant',
			curCons: 'Consummation actuelle',
			nextConsD: 'Consommation de deutérium au niveau suivant',
			curConsD: 'Consommation actuelle de deutérium',
			deutLeft: 'Production de deutérium après construction',
			nextStock: 'Capacité de stockage au niveau suivant',
			curStock: 'Capacité de stockage actuelle',
			rob: 'Utilisé pour la construction des bâtiments',
			cspa: 'Utilisé pour la construction des vaisseaux et des défenses',
			nan: 'Utilisé pour la construction des bâtiments, vaisseaux et défenses',
			lab: 'Utilisé pour les recherches. Prend en compte le Réseau de Recherche Intergalactique',
			nextSlot: 'Nombre de cases utilisables après construction',
			curSlot: 'Nombre de cases utilisables actuel'
		}
	},
	de: {
		general: {
			on: 'An',
			off: 'Aus',
			save: 'Speichern',
			saveSuccess: 'Speichern erfolgreich',
			saveFailed: 'Speichern fehlgeschlagen',
			production: { long: 'Produktion', short: 'Prod' },
			consumption: { long: 'Verbrauch', short: 'Verb' },
			endTimeConstruction: 'Konstruktion fertigstelluings Zeit',
			total: 'Total',
			remaining: 'verbleibend',
			missing: 'fehlend',
			needed: 'benötigt',
			notdone: 'Noch nicht fertig. Überprüfen sie auf Versions-Updates.',
			date: 'Datum',
			player: 'Spieler',
			coordinate: 'Koordinaten',
			activity: 'Aktivität',
			attack: 'Angriff',
			copy: 'kopieren',
			state: 'Zustand'
		},
		calc: {
			title: 'Rechner',
			shortDeut: 'Deut.',
			valueError: 'Der Wert "{0}" ist kein richtiger Wert !'
		},
		dailyTransport: {
			title: 'täglicher Transport',
			nextPlanet: 'Next planet',
			done: 'Daily transport complete'
		},
		date: { //@Translators: in the "date" section, put 2 backslash "\\" before all the following letters : d m y h n s z
			day: [
				{ short: 'So', long: 'So\\nn\\ta\\g' },
				{ short: 'Mo', long: 'Mo\\n\\ta\\g' },
				{ short: 'Di', long: 'Die\\ns\\ta\\g' },
				{ short: 'Mi', long: 'We\\d\\ne\\s\\da\\y' },
				{ short: 'Do', long: 'Do\\nn\\ers\\ta\\g' },
				{ short: 'Fr', long: 'Frei\\ta\\g' },
				{ short: 'Sa', long: 'Sams\\ta\\g' }
			],
			month: [
				{ short: 'Ja\\n', long: 'Ja\\nuar' },
				{ short: 'Feb', long: 'Februar' },
				{ short: 'Mär', long: 'März'},
				{ short: 'Apr', long: 'April'},
				{ short: 'Ma\\i', long: 'Ma\\i'},
				{ short: 'Ju\\ni', long: 'Ju\\ni'},
				{ short: 'Jul', long: 'Jul\\i' },
				{ short: 'Aug', long: 'Augu\\st'},
				{ short: 'Sep', long: 'Septe\\mber' },
				{ short: 'Okt', long: 'Oktober' },
				{ short: 'Nov', long: 'Nove\\mber' },
				{ short: 'Dez', long: 'Deze\\mber' },
			],
			timespan: {
				year: {short: 'J', long: 'Jahr'},
				month: {short: 'M', long: 'Monat'},
				week: {short: 'W', long: 'Woche'},
				day: {short: 'T', long: 'Tag'},
				hour: {short: 'S', long: 'Stunde'},
				minute: {short: 'M', long: 'Minute'},
				second: {short: 'S', long: 'Sekunde'}
			}
		},
		resources: {
			metal: { long: 'Metall', short: 'Met' }, // /!\ "M" is used for million (depending on your language)
			cristal: { long: 'Kristall', short: 'Kris' },
			deuterium: { long: 'Deuterium', short: 'Deut' },
			energy: { long: 'Energie', short: 'En' },
			mmet: { long: 'Metall Mine', short: 'MetMi' },
			mcri: { long: 'Kristall Mine', short: 'KriMi' },
			mdet: { long: 'Deuterium Synthesizer', short: 'DeutSyn' },
			ces: { long: 'Solarkraftwerk', short: 'Solarkr' },
			cef: { long: 'Fusions Reaktor', short: 'FusReak' },
			hmet: { long: 'Metallspeicher', short: 'Metsp' },
			hcri: { long: 'Kristallspeicher', short: 'Krissp' },
			hdet: { long: 'Deuteriumtank', short: 'Deutta' }
		},
		station: {
			rob: { long: 'Roboterfabrik', short: 'Robo' },
			cspa: { long: 'Schiffswerft', short: 'Werft' },
			lab: { long: 'Forschungslabor', short: 'Lab' },
			silo: { long: 'Rakentensilo', short: 'Silo' },
			depo: { long: 'Allianzdepot', short: 'Depot' },
			nan: { long: 'Nanitenfabrik', short: 'Nani' },
			ter: { long: 'Terraformer', short: 'Terra' },
		},
		shipyard: {
			cle: { long: 'Leichter Läger', short: 'LJ' },
			clo: { long: 'Schwerer Jäger', short: 'SJ' },
			crois: { long: 'Kreuzer', short: 'Xer' },
			vb: { long: 'Schlachtschiff', short: 'SS' },
			traq: { long: 'Schlachtkreuzer', short: 'SXer' },
			bomb: { long: 'Bomber', short: 'BB' },
			dest: { long: 'Zerstörer', short: 'Zerri' },
			edlm: { long: 'Todesstern', short: 'RIP' },
			pt: { long: 'Kleiner Transporter', short: 'KT' },
			gt: { long: 'Großer Tranpsoter', short: 'GT' },
			vc: { long: 'Kolonieschiff', short: 'Kolo' },
			rec: { long: 'Recycler', short: 'Rec' },
			esp: { long: 'Spionagesonde', short: 'Spio' },
			ss: { long: 'Solarsatellite', short: 'Sat' }
		},
		defense: {
			lm: { long: 'Raketenwerfer', short: 'Rak' },
			lle: { long: 'Leichtes Lasergeschütz', short: 'LL' },
			llo: { long: 'Schweres Lasergeschütz', short: 'SL' },
			gauss: { long: 'Gaußkanone', short: 'Gauß' },
			ion: { long: 'Ionengeschütz', short: 'Ion' },
			pla: { long: 'Plasmawerfer', short: 'Plasma' },
			pb: { long: 'Kleine Schildkuppel', short: 'KSK' },
			gb: { long: 'Große Schildkuppel', short: 'GSK' },
			mic: { long: 'Abfangrakete', short: 'Abfa' },
			mip: { long: 'Interplanetarrakete', short: 'IPR' }
		},
		options: {
			tabs: { general: 'General', page: 'Seite' },
			calc: { title: 'Rechner', show: 'zeige' },
			dailyTransport: {title: 'täglicher Transport', active: 'aktiv', main: 'Heimatplanet' },
			date: {
				title: 'Datum & Uhrzeit',
				format: 'Datumsformat',
				complete: 'zeige gesamtes Datum',
				formatHelp: '<table class="zebra" cellpadding="0" cellspacing="0">'
					+ '<tr><th colspan="3">verfügbares Datumsformat</th></tr>'
					+ '<tr><th>Format</th>	<th>Beschreibung</th>						<th>Beispiel</th></tr>'
					+ '<tr><td>TTTT</td>	<td>Name des Tages</td>							<td>Montag</td></tr>'
					+ '<tr><td>TTT</td>		<td>kurzer Tagname</td>						<td>Mo</td></tr>'
					+ '<tr><td>TT</td>		<td>Tag (2 Buchstaben)</td>						<td>01</td></tr>'
					+ '<tr><td>T</td>		<td>Tag</td>								<td>1</td></tr>'
					+ '<tr><td>MMMM</td>	<td>Name des Monats</td>							<td>January</td></tr>'
					+ '<tr><td>MMM</td>		<td>kurzer Name des Monats</td>					<td>Jan</td></tr>'
					+ '<tr><td>MM</td>		<td>Monat (2 Buchstaben)</td>					<td>01</td></tr>'
					+ '<tr><td>M</td>		<td>Monat</td>								<td>1</td></tr>'
					+ '<tr><td>JJJJ</td>	<td>Jahr</td>								<td>2010</td></tr>'
					+ '<tr><td>JJ</td>		<td>Jahr (2 Buchstaben)</td>					<td>10</td></tr>'
					+ '<tr><td>SS</td>		<td>Stunde (2 Buchstaben)</td>					<td>01</td></tr>'
					+ '<tr><td>S</td>		<td>Stunde</td>								<td>1</td></tr>'
					+ '<tr><td>mm</td>		<td>Minute (2 Buchstaben)</td>					<td>01</td></tr>'
					+ '<tr><td>m</td>		<td>Minute</td>								<td>1</td></tr>'
					+ '<tr><td>ss</td>		<td>Sekunde (2 Buchstaben)</td>					<td>01</td></tr>'
					+ '<tr><td>s</td>		<td>Sekunde</td>								<td>1</td></tr></table><br />'
					+ 'Standart : "TTT TT/MM/JJ SS:mm:ss" soit "Sa 26/06/10 16:30:45"<br />'
					+ 'Um eines der indviduellen vorgaben zu nutzen, setzt zwei "\\" vor dieses.'
					+ 'Zum Beispiel, "SS\\Smm\\mss\\s" give "16S30m45s"'
			},
			pages: {
				buildings: 'Ressourcen',
				research: 'Forschung',
				shipyard: 'Schiffswerft',
				defense: 'Verteidigung',
				defenceOptimizer: 'Verteidigungs Optimierer',
				showConso: 'zeige Verbrauch',
				showCost: 'Show kosten',
				showEndTime: 'zeigen das Ende der Bauzeit',
				showOptimizer: 'zeige Optimierer',
				showProd: 'zeige Produkiton'
			}
		},
		oros: {
			tabs: { sim: 'Simulatoren & Tools', options: 'Optionen' },
			welcome: 'Willkommen bei Oros (Ogame Redesign Ouadjet Script) !'
		},
		sim: {
			tabs: { spy: 'Spionage Tool', grav: 'Gravitation', costs: 'Konstruktion' },
			spytool: {
				state: ['Ok', 'zu schwach', 'zu stark', 'mehr Spionageberichte', 'zu alt', ''],
				supprAll: 'lösche alle Spionageberichte'
			}
		},
		update: {
			title: '|UPDATE für Oros verfügbar|',
			help: '|Click here to install the new version'
		}
	}
	/* PASTE HERE */
};

unsafeWindow.orosTranslations = TXT;