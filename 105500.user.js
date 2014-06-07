// ==UserScript==
// @name           CS2 sys-sec Navigation
// @namespace      CS
// @description    adds sector and system direct jump buttons on sys, sec, and galaxy view.
// @include        http://*.chosenspace.com/index.php
// @include        http://*.chosenspace.com/index.php?view=sector*
// @include        http://*.chosenspace.com/index.php?go=scan_sector*
// @include        http://*.chosenspace.com/index.php?go=scan_grid*
// @include        http://*.chosenspace.com/index.php?view=system*
// @include        http://*.chosenspace.com/index.php?view=galaxy*
// @exclude        http://*.chosenspace.com/index.php?go=scan_grid&sortnum=*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
/****************************************************************************
/ var xxx=false;     | jump to the same grid/sector you're in
/ var xxx=true;      | randomly choose a grid/sector as destination
/ var xxx=?;         | jump to grid/sector number ?
****************************************************************************/
var gridSECTOR=true;
var sectorSYSTEM=true;
var gridSYSTEM=true;
/****************************************************************************
/ var jumptypeXXX=true;          | use Lightspeed
/ var jumptypeXXX=false;         | use Hyperjump
****************************************************************************/
var jumptypeGRID=true;
var jumptypeSECTOR=true;
var jumptypeSYSTEM=false;
/****************************************************************************
/ var display=true;       | use edge positioned NW NE SW SE triangles
/ var display=false;      | use circle-like positioned NW NE SW SE triangles
****************************************************************************/
var display=true;
/****************************************************************************
/ var three=true;   | show system, sector, and grid movement (small buttons!)
/ var three=false;  | show only system and sector movement
****************************************************************************/
var three=true;
/****************************************************************************
/ var middle=true;   | give the middle buttons scan click abilities
/ var middle=false;  | just leave them as non-clickables descriptions
****************************************************************************/
var middle=true;
/****************************************************************************
/ var jumpbox=true;   | show a Jump box below the navigation
/ var jumpbox=false;  | don't show the jump box
****************************************************************************/
var jumpbox=false;
/****************************************************************************
/ BLACKLIST : Never jump here. See presets provided for the Syntax!
/ ! be careful where to set the commas, and where not                     !
/ ! You can omit the 'n' (name) setting, but not the 's' (state) setting  !
/ ! note that only TRUE will stop the use. FALSE is like not setting.
/ ! you might use the false setting to name a grid. (see planets)
/ ! Grid 0 (zero) blocks the whole sector. present ones are sun sectors.
****************************************************************************/
var blacklist={
	0:{'n':'Generic System Name', /*example set up for the blacklist and some explanations.*/
		1:{ /*this is only a comment, it will not affect the script execution in any way. Name omitted for the sector here.*/
			2:{'n':'Generic Grid Name','s':true}, /*this grid is blocked. the script will look for another grid. note the commma! it is set because there is another value following this grid declaration.*/
			3:{'n':'Generic Grid Name','s':false} /*this grid is open. the script will fly into it. note the missing commma! it is not set, because it is the end of the grid declaration. it works the same for the system and sector declarations!*/
		}
	},
	133:{'n':'Arcas Expanse'
	},
	147:{'n':'Asterion Expanse'
	},
	148:{'n':'Regulus Expanse'
	},
	149:{'n':'Hathor Expanse'
	},
	150:{'n':'Nespian System',
		22:{'n':'Nespia I',
			190:{'n':'Nespia I','s':false},191:{'n':'Nespia I','s':false},210:{'n':'Nespia I','s':false},211:{'n':'Nespia I','s':false}},
		88:{'n':'Lax',
			190:{'n':'Lax','s':false},191:{'n':'Lax','s':false},210:{'n':'Lax','s':false},211:{'n':'Lax','s':false}},
		100:{'n':'Nespia II',
			190:{'n':'Nespia II','s':false},191:{'n':'Nespia II','s':false},210:{'n':'Nespia II','s':false},211:{'n':'Nespia II','s':false}},
		132:{'n':'Vobis',
			190:{'n':'Vobis','s':false},191:{'n':'Vobis','s':false},210:{'n':'Vobis','s':false},211:{'n':'Vobis','s':false}},
		207:{'n':'Rakus',
			190:{'n':'Rakus','s':false},191:{'n':'Rakus','s':false},210:{'n':'Rakus','s':false},211:{'n':'Rakus','s':false}},
		291:{'n':'Wahur',
			190:{'n':'Wahur','s':false},191:{'n':'Wahur','s':false},210:{'n':'Wahur','s':false},211:{'n':'Wahur','s':false}},
		304:{'n':'Mantia',
			190:{'n':'Mantia','s':false},191:{'n':'Mantia','s':false},210:{'n':'Mantia','s':false},211:{'n':'Mantia','s':false}},
		337:{'n':'Serio',
			190:{'n':'Serio','s':false},191:{'n':'Serio','s':false},210:{'n':'Serio','s':false},211:{'n':'Serio','s':false}},
		388:{'n':'Nespia III',
			190:{'n':'Nespia III','s':false},191:{'n':'Nespia III','s':false},210:{'n':'Nespia III','s':false},211:{'n':'Nespia III','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	151:{'n':'Newhope Expanse'
	},
	152:{'n':'Polaris Expanse'
	},
	153:{'n':'Basian System',
		64:{'n':'Taris',
			190:{'n':'Taris','s':false},191:{'n':'Taris','s':false},210:{'n':'Taris','s':false},211:{'n':'Taris','s':false}},
		95:{'n':'Cerea',
			190:{'n':'Cerea','s':false},191:{'n':'Cerea','s':false},210:{'n':'Cerea','s':false},211:{'n':'Cerea','s':false}},
		143:{'n':'Trennok',
			190:{'n':'Trennok','s':false},191:{'n':'Trennok','s':false},210:{'n':'Trennok','s':false},211:{'n':'Trennok','s':false}},
		200:{'n':'Basia VI',
			190:{'n':'Basia VI','s':false},191:{'n':'Basia VI','s':false},210:{'n':'Basia VI','s':false},211:{'n':'Basia VI','s':false}},
		213:{'n':'Basia IX',
			190:{'n':'Basia IX','s':false},191:{'n':'Basia IX','s':false},210:{'n':'Basia IX','s':false},211:{'n':'Basia IX','s':false}},
		257:{'n':'Mertis',
			190:{'n':'Mertis','s':false},191:{'n':'Mertis','s':false},210:{'n':'Mertis','s':false},211:{'n':'Mertis','s':false}},
		269:{'n':'Kaas',
			190:{'n':'Kaas','s':false},191:{'n':'Kaas','s':false},210:{'n':'Kaas','s':false},211:{'n':'Kaas','s':false}},
		314:{'n':'Prema',
			190:{'n':'Prema','s':false},191:{'n':'Prema','s':false},210:{'n':'Prema','s':false},211:{'n':'Prema','s':false}},
		365:{'n':'Basia VII',
			190:{'n':'Basia VII','s':false},191:{'n':'Basia VII','s':false},210:{'n':'Basia VII','s':false},211:{'n':'Basia VII','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	168:{'n':'Tyrian System',
		59:{'n':'Tyria VI',
			190:{'n':'Tyria VI','s':false},191:{'n':'Tyria VI','s':false},210:{'n':'Tyria VI','s':false},211:{'n':'Tyria VI','s':false}},
		85:{'n':'Tyria I',
			190:{'n':'Tyria I','s':false},191:{'n':'Tyria I','s':false},210:{'n':'Tyria I','s':false},211:{'n':'Tyria I','s':false}},
		133:{'n':'Saren',
			190:{'n':'Saren','s':false},191:{'n':'Saren','s':false},210:{'n':'Saren','s':false},211:{'n':'Saren','s':false}},
		204:{'n':'Durrok',
			190:{'n':'Durrok','s':false},191:{'n':'Durrok','s':false},210:{'n':'Durrok','s':false},211:{'n':'Durrok','s':false}},
		250:{'n':'Tyria VII',
			190:{'n':'Tyria VII','s':false},191:{'n':'Tyria VII','s':false},210:{'n':'Tyria VII','s':false},211:{'n':'Tyria VII','s':false}},
		267:{'n':'Velos',
			190:{'n':'Velos','s':false},191:{'n':'Velos','s':false},210:{'n':'Velos','s':false},211:{'n':'Velos','s':false}},
		314:{'n':'Fariss',
			190:{'n':'Fariss','s':false},191:{'n':'Fariss','s':false},210:{'n':'Fariss','s':false},211:{'n':'Fariss','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	169:{'n':'Memorial Expanse'
	},
	170:{'n':'Midway Expanse'
	},
	171:{'n':'Perennis Expanse'
	},
	172:{'n':'Raxian System',
		45:{'n':'Raxia VI',
			190:{'n':'Raxia VI','s':false},191:{'n':'Raxia VI','s':false},210:{'n':'Raxia VI','s':false},211:{'n':'Raxia VI','s':false}},
		77:{'n':'Tanis',
			190:{'n':'Tanis','s':false},191:{'n':'Tanis','s':false},210:{'n':'Tanis','s':false},211:{'n':'Tanis','s':false}},
		107:{'n':'Aeten',
			190:{'n':'Aeten','s':false},191:{'n':'Aeten','s':false},210:{'n':'Aeten','s':false},211:{'n':'Aeten','s':false}},
		130:{'n':'Raxia IX',
			190:{'n':'Raxia IX','s':false},191:{'n':'Raxia IX','s':false},210:{'n':'Raxia IX','s':false},211:{'n':'Raxia IX','s':false}},
		197:{'n':'Raxia VIII',
			190:{'n':'Raxia VIII','s':false},191:{'n':'Raxia VIII','s':false},210:{'n':'Raxia VIII','s':false},211:{'n':'Raxia VIII','s':false}},
		205:{'n':'Zeta',
			190:{'n':'Zeta','s':false},191:{'n':'Zeta','s':false},210:{'n':'Zeta','s':false},211:{'n':'Zeta','s':false}},
		229:{'n':'Raxia VII',
			190:{'n':'Raxia VII','s':false},191:{'n':'Raxia VII','s':false},210:{'n':'Raxia VII','s':false},211:{'n':'Raxia VII','s':false}},
		275:{'n':'Brax',
			190:{'n':'Brax','s':false},191:{'n':'Brax','s':false},210:{'n':'Brax','s':false},211:{'n':'Brax','s':false}},
		330:{'n':'Soror',
			190:{'n':'Soror','s':false},191:{'n':'Soror','s':false},210:{'n':'Soror','s':false},211:{'n':'Soror','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	173:{'n':'Ursa Expanse'
	},
	188:{'n':'Iota Expanse'
	},
	189:{'n':'Altian System',
		23:{'n':'Altia VII',
			190:{'n':'Altia VII','s':false},191:{'n':'Altia VII','s':false},210:{'n':'Altia VII','s':false},211:{'n':'Altia VII','s':false}},
		107:{'n':'Altia IX',
			190:{'n':'Altia IX','s':false},191:{'n':'Altia IX','s':false},210:{'n':'Altia IX','s':false},211:{'n':'Altia IX','s':false}},
		116:{'n':'Aruk',
			190:{'n':'Aruk','s':false},191:{'n':'Aruk','s':false},210:{'n':'Aruk','s':false},211:{'n':'Aruk','s':false}},
		129:{'n':'Freya',
			190:{'n':'Freya','s':false},191:{'n':'Freya','s':false},210:{'n':'Freya','s':false},211:{'n':'Freya','s':false}},
		144:{'n':'Ares',
			190:{'n':'Ares','s':false},191:{'n':'Ares','s':false},210:{'n':'Ares','s':false},211:{'n':'Ares','s':false}},
		199:{'n':'Altia VI',
			190:{'n':'Altia VI','s':false},191:{'n':'Altia VI','s':false},210:{'n':'Altia VI','s':false},211:{'n':'Altia VI','s':false}},
		268:{'n':'Altia VIII',
			190:{'n':'Altia VIII','s':false},191:{'n':'Altia VIII','s':false},210:{'n':'Altia VIII','s':false},211:{'n':'Altia VIII','s':false}},
		284:{'n':'Ventani',
			190:{'n':'Ventani','s':false},191:{'n':'Ventani','s':false},210:{'n':'Ventani','s':false},211:{'n':'Ventani','s':false}},
		333:{'n':'Jakar',
			190:{'n':'Jakar','s':false},191:{'n':'Jakar','s':false},210:{'n':'Jakar','s':false},211:{'n':'Jakar','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	190:{'n':'Solian System',
		55:{'n':'Kryos',
			190:{'n':'Kryos','s':false},191:{'n':'Kryos','s':false},210:{'n':'Kryos','s':false},211:{'n':'Kryos','s':false}},
		68:{'n':'Solia VIII',
			190:{'n':'Solia VIII','s':false},191:{'n':'Solia VIII','s':false},210:{'n':'Solia VIII','s':false},211:{'n':'Solia VIII','s':false}},
		106:{'n':'Primus',
			190:{'n':'Primus','s':false},191:{'n':'Primus','s':false},210:{'n':'Primus','s':false},211:{'n':'Primus','s':false}},
		172:{'n':'Solia II',
			190:{'n':'Solia II','s':false},191:{'n':'Solia II','s':false},210:{'n':'Solia II','s':false},211:{'n':'Solia II','s':false}},
		177:{'n':'Omnis',
			190:{'n':'Omnis','s':false},191:{'n':'Omnis','s':false},210:{'n':'Omnis','s':false},211:{'n':'Omnis','s':false}},
		224:{'n':'Mirnok',
			190:{'n':'Mirnok','s':false},191:{'n':'Mirnok','s':false},210:{'n':'Mirnok','s':false},211:{'n':'Mirnok','s':false}},
		288:{'n':'Exillis',
			190:{'n':'Exillis','s':false},191:{'n':'Exillis','s':false},210:{'n':'Exillis','s':false},211:{'n':'Exillis','s':false}},
		337:{'n':'Aquila',
			190:{'n':'Aquila','s':false},191:{'n':'Aquila','s':false},210:{'n':'Aquila','s':false},211:{'n':'Aquila','s':false}},
		395:{'n':'Solia VII',
			190:{'n':'Solia VII','s':false},191:{'n':'Solia VII','s':false},210:{'n':'Solia VII','s':false},211:{'n':'Solia VII','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	191:{'n':'Atra Expanse'
	},
	192:{'n':'Jexian System',
		69:{'n':'Ezra',
			190:{'n':'Ezra','s':false},191:{'n':'Ezra','s':false},210:{'n':'Ezra','s':false},211:{'n':'Ezra','s':false}},
		94:{'n':'Netrea',
			190:{'n':'Netrea','s':false},191:{'n':'Netrea','s':false},210:{'n':'Netrea','s':false},211:{'n':'Netrea','s':false}},
		101:{'n':'Jexia VII',
			190:{'n':'Jexia VII','s':false},191:{'n':'Jexia VII','s':false},210:{'n':'Jexia VII','s':false},211:{'n':'Jexia VII','s':false}},
		125:{'n':'Capek',
			190:{'n':'Capek','s':false},191:{'n':'Capek','s':false},210:{'n':'Capek','s':false},211:{'n':'Capek','s':false}},
		214:{'n':'Jexia I',
			190:{'n':'Jexia I','s':false},191:{'n':'Jexia I','s':false},210:{'n':'Jexia I','s':false},211:{'n':'Jexia I','s':false}},
		227:{'n':'Jahib',
			190:{'n':'Jahib','s':false},191:{'n':'Jahib','s':false},210:{'n':'Jahib','s':false},211:{'n':'Jahib','s':false}},
		273:{'n':'Gratia',
			190:{'n':'Gratia','s':false},191:{'n':'Gratia','s':false},210:{'n':'Gratia','s':false},211:{'n':'Gratia','s':false}},
		331:{'n':'Trellum',
			190:{'n':'Trellum','s':false},191:{'n':'Trellum','s':false},210:{'n':'Trellum','s':false},211:{'n':'Trellum','s':false}},
		347:{'n':'Jexia IX',
			190:{'n':'Jexia IX','s':false},191:{'n':'Jexia IX','s':false},210:{'n':'Jexia IX','s':false},211:{'n':'Jexia IX','s':false}},
		363:{'n':'Jexia VIII',
			190:{'n':'Jexia VIII','s':false},191:{'n':'Jexia VIII','s':false},210:{'n':'Jexia VIII','s':false},211:{'n':'Jexia VIII','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	193:{'n':'Antares Expanse'
	},
	208:{'n':'Zarian System',
		23:{'n':'Zaria VIII',
			190:{'n':'Zaria VIII','s':false},191:{'n':'Zaria VIII','s':false},210:{'n':'Zaria VIII','s':false},211:{'n':'Zaria VIII','s':false}},
		58:{'n':'Arcas',
			190:{'n':'Arcas','s':false},191:{'n':'Arcas','s':false},210:{'n':'Arcas','s':false},211:{'n':'Arcas','s':false}},
		89:{'n':'Zaria II',
			190:{'n':'Zaria II','s':false},191:{'n':'Zaria II','s':false},210:{'n':'Zaria II','s':false},211:{'n':'Zaria II','s':false}},
		124:{'n':'Teag',
			190:{'n':'Teag','s':false},191:{'n':'Teag','s':false},210:{'n':'Teag','s':false},211:{'n':'Teag','s':false}},
		155:{'n':'Cetus',
			190:{'n':'Cetus','s':false},191:{'n':'Cetus','s':false},210:{'n':'Cetus','s':false},211:{'n':'Cetus','s':false}},
		225:{'n':'Lapsus',
			190:{'n':'Lapsus','s':false},191:{'n':'Lapsus','s':false},210:{'n':'Lapsus','s':false},211:{'n':'Lapsus','s':false}},
		250:{'n':'Zaria IX',
			190:{'n':'Zaria IX','s':false},191:{'n':'Zaria IX','s':false},210:{'n':'Zaria IX','s':false},211:{'n':'Zaria IX','s':false}},
		256:{'n':'Beslan',
			190:{'n':'Beslan','s':false},191:{'n':'Beslan','s':false},210:{'n':'Beslan','s':false},211:{'n':'Beslan','s':false}},
		328:{'n':'Lutra',
			190:{'n':'Lutra','s':false},191:{'n':'Lutra','s':false},210:{'n':'Lutra','s':false},211:{'n':'Lutra','s':false}},
		358:{'n':'Zaria I',
			190:{'n':'Zaria I','s':false},191:{'n':'Zaria I','s':false},210:{'n':'Zaria I','s':false},211:{'n':'Zaria I','s':false}},
		393:{'n':'Zaria VII',
			190:{'n':'Zaria VII','s':false},191:{'n':'Zaria VII','s':false},210:{'n':'Zaria VII','s':false},211:{'n':'Zaria VII','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	209:{'n':'Allansia Expanse'
	},
	210:{'n':'Veranza Expanse'
	},
	211:{'n':'Casian System',
		117:{'n':'Satus',
			190:{'n':'Satus','s':false},191:{'n':'Satus','s':false},210:{'n':'Satus','s':false},211:{'n':'Satus','s':false}},
		131:{'n':'Zaran',
			190:{'n':'Zaran','s':false},191:{'n':'Zaran','s':false},210:{'n':'Zaran','s':false},211:{'n':'Zaran','s':false}},
		165:{'n':'Kallos',
			190:{'n':'Kallos','s':false},191:{'n':'Kallos','s':false},210:{'n':'Kallos','s':false},211:{'n':'Kallos','s':false}},
		189:{'n':'Casia VII',
			190:{'n':'Casia VII','s':false},191:{'n':'Casia VII','s':false},210:{'n':'Casia VII','s':false},211:{'n':'Casia VII','s':false}},
		242:{'n':'Casia V',
			190:{'n':'Casia V','s':false},191:{'n':'Casia V','s':false},210:{'n':'Casia V','s':false},211:{'n':'Casia V','s':false}},
		256:{'n':'Vega',
			190:{'n':'Vega','s':false},191:{'n':'Vega','s':false},210:{'n':'Vega','s':false},211:{'n':'Vega','s':false}},
		327:{'n':'Tapek',
			190:{'n':'Tapek','s':false},191:{'n':'Tapek','s':false},210:{'n':'Tapek','s':false},211:{'n':'Tapek','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	212:{'n':'Wartorn Expanse'
	},
	213:{'n':'Farian System',
		94:{'n':'Ramura',
			190:{'n':'Ramura','s':false},191:{'n':'Ramura','s':false},210:{'n':'Ramura','s':false},211:{'n':'Ramura','s':false}},
		126:{'n':'Magus',
			190:{'n':'Magus','s':false},191:{'n':'Magus','s':false},210:{'n':'Magus','s':false},211:{'n':'Magus','s':false}},
		149:{'n':'Faria V',
			190:{'n':'Faria V','s':false},191:{'n':'Faria V','s':false},210:{'n':'Faria V','s':false},211:{'n':'Faria V','s':false}},
		203:{'n':'Vaku',
			190:{'n':'Vaku','s':false},191:{'n':'Vaku','s':false},210:{'n':'Vaku','s':false},211:{'n':'Vaku','s':false}},
		235:{'n':'Lyra',
			190:{'n':'Lyra','s':false},191:{'n':'Lyra','s':false},210:{'n':'Lyra','s':false},211:{'n':'Lyra','s':false}},
		331:{'n':'Equis',
			190:{'n':'Equis','s':false},191:{'n':'Equis','s':false},210:{'n':'Equis','s':false},211:{'n':'Equis','s':false}},
		367:{'n':'Faria VII',
			190:{'n':'Faria VII','s':false},191:{'n':'Faria VII','s':false},210:{'n':'Faria VII','s':false},211:{'n':'Faria VII','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	228:{'n':'Lyrian System',
		125:{'n':'Birnax',
			190:{'n':'Birnax','s':false},191:{'n':'Birnax','s':false},210:{'n':'Birnax','s':false},211:{'n':'Birnax','s':false}},
		156:{'n':'Sigma',
			190:{'n':'Sigma','s':false},191:{'n':'Sigma','s':false},210:{'n':'Sigma','s':false},211:{'n':'Sigma','s':false}},
		203:{'n':'Lyria II',
			190:{'n':'Lyria II','s':false},191:{'n':'Lyria II','s':false},210:{'n':'Lyria II','s':false},211:{'n':'Lyria II','s':false}},
		293:{'n':'Remus',
			190:{'n':'Remus','s':false},191:{'n':'Remus','s':false},210:{'n':'Remus','s':false},211:{'n':'Remus','s':false}},
		338:{'n':'Cenix',
			190:{'n':'Cenix','s':false},191:{'n':'Cenix','s':false},210:{'n':'Cenix','s':false},211:{'n':'Cenix','s':false}},
		371:{'n':'Lyria VI',
			190:{'n':'Lyria VI','s':false},191:{'n':'Lyria VI','s':false},210:{'n':'Lyria VI','s':false},211:{'n':'Lyria VI','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	229:{'n':'Pulsar Expanse'
	},
	230:{'n':'Genian System',
		85:{'n':'Pallidus',
			190:{'n':'Pallidus','s':false},191:{'n':'Pallidus','s':false},210:{'n':'Pallidus','s':false},211:{'n':'Pallidus','s':false}},
		116:{'n':'Volan',
			190:{'n':'Volan','s':false},191:{'n':'Volan','s':false},210:{'n':'Volan','s':false},211:{'n':'Volan','s':false}},
		140:{'n':'Genia VI',
			190:{'n':'Genia VI','s':false},191:{'n':'Genia VI','s':false},210:{'n':'Genia VI','s':false},211:{'n':'Genia VI','s':false}},
		208:{'n':'Genia VII',
			190:{'n':'Genia VII','s':false},191:{'n':'Genia VII','s':false},210:{'n':'Genia VII','s':false},211:{'n':'Genia VII','s':false}},
		234:{'n':'Aeger',
			190:{'n':'Aeger','s':false},191:{'n':'Aeger','s':false},210:{'n':'Aeger','s':false},211:{'n':'Aeger','s':false}},
		292:{'n':'Genia VIII',
			190:{'n':'Genia VIII','s':false},191:{'n':'Genia VIII','s':false},210:{'n':'Genia VIII','s':false},211:{'n':'Genia VIII','s':false}},
		297:{'n':'Rumino',
			190:{'n':'Rumino','s':false},191:{'n':'Rumino','s':false},210:{'n':'Rumino','s':false},211:{'n':'Rumino','s':false}},
		327:{'n':'Darnak',
			190:{'n':'Darnak','s':false},191:{'n':'Darnak','s':false},210:{'n':'Darnak','s':false},211:{'n':'Darnak','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	231:{'n':'Exile Expanse'
	},
	232:{'n':'Volian System',
		12:{'n':'Volia VII',
			190:{'n':'Volia VII','s':false},191:{'n':'Volia VII','s':false},210:{'n':'Volia VII','s':false},211:{'n':'Volia VII','s':false}},
		69:{'n':'Verdus',
			190:{'n':'Verdus','s':false},191:{'n':'Verdus','s':false},210:{'n':'Verdus','s':false},211:{'n':'Verdus','s':false}},
		77:{'n':'Takar',
			190:{'n':'Takar','s':false},191:{'n':'Takar','s':false},210:{'n':'Takar','s':false},211:{'n':'Takar','s':false}},
		175:{'n':'Adari',
			190:{'n':'Adari','s':false},191:{'n':'Adari','s':false},210:{'n':'Adari','s':false},211:{'n':'Adari','s':false}},
		198:{'n':'Volia VIII',
			190:{'n':'Volia VIII','s':false},191:{'n':'Volia VIII','s':false},210:{'n':'Volia VIII','s':false},211:{'n':'Volia VIII','s':false}},
		205:{'n':'Arium',
			190:{'n':'Arium','s':false},191:{'n':'Arium','s':false},210:{'n':'Arium','s':false},211:{'n':'Arium','s':false}},
		212:{'n':'Volia IX',
			190:{'n':'Volia IX','s':false},191:{'n':'Volia IX','s':false},210:{'n':'Volia IX','s':false},211:{'n':'Volia IX','s':false}},
		249:{'n':'Volia I',
			190:{'n':'Volia I','s':false},191:{'n':'Volia I','s':false},210:{'n':'Volia I','s':false},211:{'n':'Volia I','s':false}},
		291:{'n':'Volia II',
			190:{'n':'Volia II','s':false},191:{'n':'Volia II','s':false},210:{'n':'Volia II','s':false},211:{'n':'Volia II','s':false}},
		321:{'n':'Volia VI',
			190:{'n':'Volia VI','s':false},191:{'n':'Volia VI','s':false},210:{'n':'Volia VI','s':false},211:{'n':'Volia VI','s':false}},
		327:{'n':'Uran',
			190:{'n':'Uran','s':false},191:{'n':'Uran','s':false},210:{'n':'Uran','s':false},211:{'n':'Uran','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	233:{'n':'Imperial Expanse',
		170:{
			190:{'n':'WTO minefield','s':true}
		}
	},
	248:{'n':'Meridian Expanse'
	},
	249:{'n':'Omnian System',
		74:{'n':'Prolix',
			190:{'n':'Prolix','s':false},191:{'n':'Prolix','s':false},210:{'n':'Prolix','s':false},211:{'n':'Prolix','s':false}},
		127:{'n':'Rhinaxi',
			190:{'n':'Rhinaxi','s':false},191:{'n':'Rhinaxi','s':false},210:{'n':'Rhinaxi','s':false},211:{'n':'Rhinaxi','s':false}},
		139:{'n':'Omnia VI',
			190:{'n':'Omnia VI','s':false},191:{'n':'Omnia VI','s':false},210:{'n':'Omnia VI','s':false},211:{'n':'Omnia VI','s':false}},
		212:{'n':'Omnia VII',
			190:{'n':'Omnia VII','s':false},191:{'n':'Omnia VII','s':false},210:{'n':'Omnia VII','s':false},211:{'n':'Omnia VII','s':false}},
		217:{'n':'Zohar',
			190:{'n':'Zohar','s':false},191:{'n':'Zohar','s':false},210:{'n':'Zohar','s':false},211:{'n':'Zohar','s':false}},
		245:{'n':'Qualis',
			190:{'n':'Qualis','s':false},191:{'n':'Qualis','s':false},210:{'n':'Qualis','s':false},211:{'n':'Qualis','s':false}},
		293:{'n':'Gennok',
			190:{'n':'Gennok','s':false},191:{'n':'Gennok','s':false},210:{'n':'Gennok','s':false},211:{'n':'Gennok','s':false}},
		318:{'n':'Vorax',
			190:{'n':'Vorax','s':false},191:{'n':'Vorax','s':false},210:{'n':'Vorax','s':false},211:{'n':'Vorax','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	250:{'n':'Darkened Expanse'
	},
	251:{'n':'Adarian System',
		95:{'n':'Antar',
			190:{'n':'Antar','s':false},191:{'n':'Antar','s':false},210:{'n':'Antar','s':false},211:{'n':'Antar','s':false}},
		127:{'n':'Raxis',
			190:{'n':'Raxis','s':false},191:{'n':'Raxis','s':false},210:{'n':'Raxis','s':false},211:{'n':'Raxis','s':false}},
		214:{'n':'Nakara',
			190:{'n':'Nakara','s':false},191:{'n':'Nakara','s':false},210:{'n':'Nakara','s':false},211:{'n':'Nakara','s':false}},
		222:{'n':'Adaria IV',
			190:{'n':'Adaria IV','s':false},191:{'n':'Adaria IV','s':false},210:{'n':'Adaria IV','s':false},211:{'n':'Adaria IV','s':false}},
		266:{'n':'Acrus',
			190:{'n':'Acrus','s':false},191:{'n':'Acrus','s':false},210:{'n':'Acrus','s':false},211:{'n':'Acrus','s':false}},
		318:{'n':'Ceti',
			190:{'n':'Ceti','s':false},191:{'n':'Ceti','s':false},210:{'n':'Ceti','s':false},211:{'n':'Ceti','s':false}},
		329:{'n':'Adaria V',
			190:{'n':'Adaria V','s':false},191:{'n':'Adaria V','s':false},210:{'n':'Adaria V','s':false},211:{'n':'Adaria V','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	252:{'n':'Cephalus Expanse'
	},
	253:{'n':'Desian System',
		50:{'n':'Xenox',
			190:{'n':'Xenox','s':false},191:{'n':'Xenox','s':false},210:{'n':'Xenox','s':false},211:{'n':'Xenox','s':false}},
		145:{'n':'Inibi',
			190:{'n':'Inibi','s':false},191:{'n':'Inibi','s':false},210:{'n':'Inibi','s':false},211:{'n':'Inibi','s':false}},
		174:{'n':'Dahir',
			190:{'n':'Dahir','s':false},191:{'n':'Dahir','s':false},210:{'n':'Dahir','s':false},211:{'n':'Dahir','s':false}},
		189:{'n':'Desia VII',
			190:{'n':'Desia VII','s':false},191:{'n':'Desia VII','s':false},210:{'n':'Desia VII','s':false},211:{'n':'Desia VII','s':false}},
		246:{'n':'Ferox',
			190:{'n':'Ferox','s':false},191:{'n':'Ferox','s':false},210:{'n':'Ferox','s':false},211:{'n':'Ferox','s':false}},
		292:{'n':'Zethus',
			190:{'n':'Zethus','s':false},191:{'n':'Zethus','s':false},210:{'n':'Zethus','s':false},211:{'n':'Zethus','s':false}},
		336:{'n':'Desia IV',
			190:{'n':'Desia IV','s':false},191:{'n':'Desia IV','s':false},210:{'n':'Desia IV','s':false},211:{'n':'Desia IV','s':false}},
		382:{'n':'Desia V',
			190:{'n':'Desia V','s':false},191:{'n':'Desia V','s':false},210:{'n':'Desia V','s':false},211:{'n':'Desia V','s':false}},
		190:{'n':'Sun',0:{'s':true}},191:{'n':'Sun',0:{'s':true}},210:{'n':'Sun',0:{'s':true}},211:{'n':'Sun',0:{'s':true}}
	},
	254:{'n':'Heavenly Expanse'
	},
	268:{'n':'Utopian Expanse'
	}
}
/****************************************************************************
/ Congratulations, you've reached the end of the blacklist! :)
/ if you want you can here change the background colours
/ for those special cases. play with them if you like, but don't change
/ the syntax. you change only the hex values for the colours inside the "
/            enjoy and thanks for using this script.                   Layze
****************************************************************************/
var sunny="CD9B1D";
var blocked="8B0000";
var gridshift="00688B";
var planetc="7A18B2";
var targetsystem="1B8900";
/****************************************************************************
/****************************************************************************
/
/                     ! No Changes beyond this point !
/
/***************************************************************************
/***************************************************************************/
// This function needs maintenance when new systems get opened or existing ones closed. Keep this out of users hands. for now.
function checksys(sys){
	var ret='';
	// check for sun system
	switch(sys){
		case 150: case 153: case 168: case 172: case 189: case 190: case 192: case 208:
		case 211: case 213: case 228: case 230: case 232: case 249: case 251: case 253:
		ret+='#u#';
	}
	// check for north-west border system
	if((sys>=147&&sys<=153)||sys==133||sys==188||sys==208||sys==228||sys==248||sys==268)
		ret+='#nw#';
	// check for north border system
	if((sys>=147&&sys<=152)||sys==133||sys==254)
		ret+='#n#';
	// check for north-east border system
	if((sys>=147&&sys<=151)||sys==133||sys==153||sys==173||sys==193||sys==213||sys==233||sys==253||sys==254)
		ret+='#ne#';
	// check for east border system
	if(sys==133||sys==153||sys==173||sys==193||sys==213||sys==233||sys==254||sys==268)
		ret+='#e#';
	// check for south-east border system
	if((sys>=248&&sys<=254)||sys==133||sys==153||sys==173||sys==193||sys==213||sys==268)
		ret+='#se#';
	// check for south border system
	if((sys>=249&&sys<=254)||sys==147||sys==268)
		ret+='#s#';
	// check for south-west border system
	if((sys>=250&&sys<=254)||sys==147||sys==148||sys==168||sys==188||sys==208||sys==228||sys==248||sys==268)
		ret+='#sw#';
	// check for west border system
	if(sys==133||sys==147||sys==168||sys==188||sys==208||sys==228||sys==248||sys==268)
		ret+='#w#';
	return ret;
}
// keep this check outside the blacklist and update along with checksys function. same reason as above.
function checkplanet(sy,se){
	switch(sy){
	case 150:switch(se){
		case 22: case 88: case 100: case 132: case 207: case 291: case 304: case 337: case 388: return true;
		default: return false;}
	case 153:switch(se){
		case 64: case 95: case 143: case 200: case 213: case 257: case 269: case 314: case 365: return true;
		default: return false;}
	case 168:switch(se){
		case 59: case 85: case 133: case 204: case 250: case 267: case 314: return true;
		default: return false;}
	case 172:switch(se){
		case 45: case 77: case 107: case 130: case 197: case 205: case 229: case 275: case 330: return true;
		default: return false;}
	case 189:switch(se){
		case 23: case 107: case 116: case 129: case 144: case 199: case 268: case 284: case 333: return true;
		default: return false;}
	case 190:switch(se){
		case 55: case 68: case 106: case 172: case 177: case 224: case 288: case 337: case 395: return true;
		default: return false;}
	case 192:switch(se){
		case 69: case 94: case 101: case 125: case 214: case 227: case 273: case 331: case 347: case 363: return true;
		default: return false;}
	case 208:switch(se){
		case 23: case 58: case 89: case 124: case 155: case 225: case 250: case 256: case 328: case 358: case 393: return true;
		default: return false;}
	case 211:switch(se){
		case 117: case 131: case 165: case 189: case 242: case 256: case 327: return true;
		default: return false;}
	case 213:switch(se){
		case 94: case 126: case 149: case 203: case 235: case 331: case 367: return true;
		default: return false;}
	case 228:switch(se){
		case 125: case 156: case 203: case 293: case 338: case 371: return true;
		default: return false;}
	case 230:switch(se){
		case 85: case 116: case 140: case 208: case 234: case 292: case 297: case 327: return true;
		default: return false;}
	case 232:switch(se){
		case 12: case 69: case 77: case 175: case 198: case 205: case 212: case 249: case 291: case 321: case 327: return true;
		default: return false;}
	case 249:switch(se){
		case 74: case 127: case 139: case 212: case 217: case 245: case 293: case 318: return true;
		default: return false;}
	case 251:switch(se){
		case 95: case 127: case 214: case 222: case 266: case 318: case 329: return true;
		default: return false;}
	case 253:switch(se){
		case 50: case 145: case 174: case 189: case 246: case 292: case 336: case 382: case 190: return true;
		default: return false;}
	default: return false;}
}
function row(){
	var ret=document.createElement("div");
	ret.setAttribute('style','overflow:hidden;display:table;');
	return ret;
}
function cell(content,width,align){
	var ret=document.createElement("span");
	if(width==undefined)width="auto";
	if(align==undefined)align="center";
	ret.setAttribute('style','float:left;width:'+width+';text-align:'+align);
	ret.appendChild(content);
	return ret;
}
function button(off,width,height,btitle,value,backgroundcolor,backgroundpicture,onclick){
	var newButton=document.createElement('input');
	newButton.type='button';
	if(width!='')width+='px';
	else width='auto';
	if(height!='')height+='px';
	else height='auto';
	var bgc='width:'+width+';height:'+height+';';
	var bakb='background:url(data:image/png;base64,';
	var bake=') no-repeat center;background-size:'+width+' '+height+';-moz-background-size:'+width+' '+height+';-o-background-size:'+width+' '+height+';-webkit-background-size:'+width+' '+height+';-khtml-background-size:'+width+' '+height+';';
	if(backgroundpicture!='')bgc+=bakb+backgroundpicture+bake;
	else bgc+=bakb+itrans+bake;
	if(backgroundcolor!='')bgc+='background-color:#'+backgroundcolor+'!important;'
	newButton.value=value;
	if(off){
		if(onclick==''){
			bgc+='border:1px solid transparent;';
			newButton.setAttribute('disabled','disabled');
		}else newButton.className='forms_btn_off';
	}else{
		newButton.className='forms_btn';
		newButton.setAttribute('onclick',onclick);
	}
	newButton.setAttribute('style','margin:2px 2px;'+bgc);
	if(btitle!='')newButton.setAttribute('title',btitle);
	return newButton; 
}
var title=''; // declare it globally for sake of easier coding here
function checkBlackList(sy,se,gr,type){
	if(sy in blacklist){
		if(se in blacklist[sy]){
			if(0 in blacklist[sy][se]&&blacklist[sy][se][0]['s']){
				if(type=='e'||type=='g')return true;
				var secOriginal=se;
				while(se in blacklist[sy]){
					if(0 in blacklist[sy][se]&&blacklist[sy][se][0]['s']){
						se++;
						if(se>400)se=1;
						if(secOriginal==se){
							return true;
						}
					}
					else break;
				}
			}
			if(type=='e'&&se in blacklist[sy]&&'n' in blacklist[sy][se])title=blacklist[sy][se]['n'];
			var gridOriginal=gr;
			while(se in blacklist[sy]&&gr in blacklist[sy][se]){
				if(blacklist[sy][se][gr]['s']){
					gr++;
					if(gr>400)gr=1;
					if(gridOriginal==gr){
						return true;
					}
				}
				else break;
			}
			if(type=='g'&&gr in blacklist[sy][se]&&'n' in blacklist[sy][se][gr])title=blacklist[sy][se][gr]['n'];
		}
		if(type=='y'&&sy in blacklist&&'n' in blacklist[sy])title=blacklist[sy]['n'];
	}
	if(type=='y')return se+'#'+gr;
	else return gr;
}
function makelink(sy,se,gr,type){
	return "location.href=\'"+newRef+"functions/"+type+".php?system_id="+sy+"&sector_id="+se+"&grid_id="+gr+"\';"
}
function makeSCANlink(sy,se,gr,type){
	var scntype="";
	if(type==1)scntype+="trails";
	else{
		if(type==2)scntype+="sector&view=sector&system_id="+sy+"&sector_id="+se;
		else scntype+="grid&view=sector&system_id="+sy+"&sector_id="+se+"&grid_id="+gr;
	}
	return "location.href=\'"+newRef+"index.php?go=scan_"+scntype+"\';"
}
function random(type,thing){
	if(type===true){
		return Math.floor((Math.random()*400)+1);
	}else if(type===false){
		if (thing=='g') return grid;
		else return sector;
	}else{
		if(type<=0) return 1;
		else if(type>=401) return 400;
		else return type*1;
	}
}
function jumptype(thisone){
	if(thisone)return "lightspeed";
	else return "hyperjump";
}
// we need to make execution wait a bit because otherwise it messes sometimes.
var date=new Date();
var curDate=null;
do{curDate=new Date();}
while(curDate-date<500);
// now that we waited a bit go on.
var alltags,thistag,newContent,getsys,system,sector,grid;
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	jumptypeSYSTEM=jumptype(jumptypeSYSTEM);
	jumptypeSECTOR=jumptype(jumptypeSECTOR);
	jumptypeGRID=jumptype(jumptypeGRID);
	getsys=thistag.getAttribute('onclick');
	system=(getsys.split("system_id=")[1].split("&")[0])*1;
	sector=(getsys.split("sector_id=")[1].split("&")[0])*1;
	grid=(getsys.split("grid_id=")[1].split("'")[0])*1;
	var itrans="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAACcAAAAnASoJkU8AAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";
	var isys="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAABrSURBVDhPY2AYBSMsBA4cOPAfhGHeRmaDxNDl0OVRggubQbgMxGcp3FBctsHEiTIEPUbRvYzL6zDv4/UysuH4wg6bI7AmNajrGNEDnxCfYMRgU4BLjGgvD0huAbqOaUAspp+lQC+CU8DQBwCY23UjyxMFegAAAABJRU5ErkJggg==";
	var isys_s="iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAQUlEQVQ4T2NgGDBw4MCB/yCMywE45emvEeREXLYScg3Ye+iKiNIECxiYYpI0oWsmOZrJsg1fQBF0Adk2EjSZXAUAQJNn4UU55B0AAAAASUVORK5CYII=";
	var isec="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAABSSURBVDhPY2AYBSMsBA4cOPAfhmFeRxYDsZGDBF0tSnBhUwxSgC6ObBE2NtxQYjTiNQBbbBLyMskGoocPLi/j8g1twxDmGqrF8gjLIaPepSgEANMShRg8krbSAAAAAElFTkSuQmCC";
	var isec_s="iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAOUlEQVQ4T2NgGFBw4MCB//gwTsdRrJFkb8NsJFsjupMJGoTLj0RrJKgQXQHV/UjQQLLjkWS/kaMBAOjIqM1moh7TAAAAAElFTkSuQmCC";
	var igrid="iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAR0lEQVQ4T2NgGFBw4MABRiD+jw3jdBg+TTCDsGrGKwnUgVOekEZ8TgX7jeRARreR6AAi5FSy/UhUyJIcl6CAIUsTySFKjgYAN/6qEN27MX8AAAAASUVORK5CYII=";
	var iul="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAWElEQVQ4T+3SwQkAIAgF0EZyGGd0DjczOggRFZreUvi3zzt8bO3vAwCxxLzSwIjoGEQUMzaKCjKzrHFjN/AJO4HP2A4MYSsYxmYwBVMwDVPQ9WdVrgVyFuiG1oRkHkNG9QAAAABJRU5ErkJggg==";
	var iul_s="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAWUlEQVQ4T2NgGAWjITAEQsDAwOA/MZhor4AMW7ZsGU4cEhLyn2jDQAphBh44cOA/OibZMHwGkmUYLgPJNgybgRQZhm4gxYYhG0gVw2AGUs0wmIEkpbNBrxgAsZeEZJo/qHoAAAAASUVORK5CYII=";
	var iu="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAATElEQVQ4T2NgGBbAwMDgPwhTxTMgg5YtWwbGFBsKM+zAgQP/QZgiQ9ENo8hQXIaRZSghw0gyFGRYSEgISZjiiKJK0hk1ZDQERnwIAADYSovt1CMJUQAAAABJRU5ErkJggg==";
	var iur="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAXUlEQVQ4T2NgGAXIIWBgYPCfGExSqIWEhPxftmwZTgyykCQDQYpBhh44cAADgywiy0BchlJkIDZDKTYQ3VCqGIhsKNUMhBlKVQNhhpIdy7jSGtUNJDlRj2oYBiEAAD/ghGQkrQaGAAAAAElFTkSuQmCC";
	var iur_s="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAXUlEQVQ4T2NgGAWjITCIQsDAwOA/MZgkJ4eEhPxftmwZTgyykCQDQYpBhh44cAADgywiy0BchlJkIDZDKTYQ3VCqGIhsKNUMhBlKVQNhhpIdy7jSGtUNJDlRU0MDABtUhGTYhtHlAAAAAElFTkSuQmCC";
	var il="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAWUlEQVQ4T2NgGAXoIWBgYPCfaqECMiwkJIQ6BoIMW7ZsGXUMhBl24MAByg1ENoxiA9ENo8hAbIYNLgNBaY2qXoYlXqpGCjZDB2fCRnYp1VyIbCjVCofhaRAAZYiL7e1ricUAAAAASUVORK5CYII=";
	var ir="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAVklEQVQ4T2NgGAX4QsDAwOA/VUMoJCTkP1UNBRm4bNky6hkKMvDAgQPUMxRmINUMRTaQKoaiG0ixoTQ3kOIYp1mkUOwyWHajScKmatajqmFULWUG1DAA+SiL7c4mPCcAAAAASUVORK5CYII=";
	var idl="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAWElEQVQ4T2NgGAWjIUBZCBgYGPynzAQ03SADQ0JCqGcoyMBly5ZRz1CYgQcOHKCOocgGUsVQdAMpNhSbgRQZistAsg2FGQiKaWyY5CQFMpAYTNXEP/QNAwBpjoRk4mEckgAAAABJRU5ErkJggg==";
	var idl_s="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAVklEQVQ4T2NgGPLAwMDgP1U9ATIwJCSEeoaCDFy2bBn1DIUZeODAAeoYimwgVQxFN5BiQ7EZSJGhuAwk21CYgaCYxoZJTlIgA4nBVE38o4aNhgCFIQAAjhqEZPK/ND0AAAAASUVORK5CYII=";
	var id="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAUUlEQVQ4T2NgGAWjITAaAgMdAgYGBv9DQkJIwiA9eN0NUrBs2bL/Bw4cwItBaggaBrOJkKEkGUbIULIMw2UoRYahG0oVw5ANJToCBjqpErQfAIZmi+2RB5KFAAAAAElFTkSuQmCC";
	var idr="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAVUlEQVQ4T2NgGAWjIUD/EDAwMPhPNVtDQkL+U81AkGHLli2jjoEgww4cOEAdA2GGUcVAZMMoNhDdMIoMxGYY2QbCYhMUo9gwSckGpJgYTLWEPTQNAgAimIRkYY/+agAAAABJRU5ErkJggg==";
	var idr_s="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAVUlEQVQ4T2NgGFbAwMDgP9U8FBIS8p9qBoIMW7ZsGXUMBBl24MAB6hgIM4wqBiIbRrGB6IZRZCA2w8g2EBaboBjFhklKNiDFxGCqJexRg0ZDgIYhAAD3yIRkKBSJDQAAAABJRU5ErkJggg==";
	var newRef=location.href.split('/');
		newRef=newRef[0]+"//"+newRef[2]+"/";
	var newtr=document.createElement("tr");
		var main=document.createElement("td");
			main.setAttribute("colspan",3);
			main.setAttribute("align","left");
		newtr.appendChild(main);
	thistag.parentNode.parentNode.parentNode.insertBefore(newtr,thistag.parentNode.parentNode.parentNode.nextSibling);
	if(!display){
		iul=iul_s;
		iur=iur_s;
		idl=idl_s;
		idr=idr_s;
	}
	var buttonsize=20;
	if(three){
		buttonsize=14;
		isys=isys_s;
		isec=isec_s;
	}
	var sun=checksys(system);
	/*************************************
	/ System Navigation Block
	*************************************/
	var sym={
		'l':{'sy':system-1,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'r':{'sy':system+1,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'u':{'sy':system-20,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'd':{'sy':system+20,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'ul':{'sy':system-21,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'ur':{'sy':system-19,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'dl':{'sy':system+19,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''},
		'dr':{'sy':system+21,'se':random(sectorSYSTEM,'s'),'gr':random(gridSYSTEM,'g'),'c':'','b':false,'t':''}
	}
	// find galaxy borders
	var borg='unexplored System';
	if(sun.search(/#nw#/)>=0){sym.ul.b=true;sym.ul.t=borg;}
	if(sun.search(/#n#/)>=0){sym.u.b=true;sym.u.t=borg;}
	if(sun.search(/#ne#/)>=0){sym.ur.b=true;sym.ur.t=borg;}
	if(sun.search(/#e#/)>=0){sym.r.b=true;sym.r.t=borg;}
	if(sun.search(/#se#/)>=0){sym.dr.b=true;sym.dr.t=borg;}
	if(sun.search(/#s#/)>=0){sym.d.b=true;sym.d.t=borg;}
	if(sun.search(/#sw#/)>=0){sym.dl.b=true;sym.dl.t=borg;}
	if(sun.search(/#w#/)>=0){sym.l.b=true;sym.l.t=borg;}
	// check blacklist
	checkbl=checkBlackList(sym.ul.sy,sym.ul.se,sym.ul.gr,'y');
	if(checkbl===true){
		sym.ul.b=true;
		sym.ul.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.ul.gr!=checkbl[1]){
			sym.ul.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.ul.c=gridshift;
		}
		if(sym.ul.se!=checkbl[0]){
			sym.ul.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.ul.c=gridshift;
		}
	}
	if(sym.ul.t!=''){}
	else if(title=='')sym.ul.t=sym.ul.sy;
	else{sym.ul.t=title;title='';}
	checkbl=checkBlackList(sym.u.sy,sym.u.se,sym.u.gr,'y');
	if(checkbl===true){
		sym.u.b=true;
		sym.u.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.u.gr!=checkbl[1]){
			sym.u.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.u.c=gridshift;
		}
		if(sym.u.se!=checkbl[0]){
			sym.u.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.u.c=gridshift;
		}
	}
	if(sym.u.t!=''){}
	else if(title=='')sym.u.t=sym.u.sy;
	else{sym.u.t=title;title='';}
	checkbl=checkBlackList(sym.ur.sy,sym.ur.se,sym.ur.gr,'y');
	if(checkbl===true){
		sym.ur.b=true;
		sym.ur.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.ur.gr!=checkbl[1]){
			sym.ur.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.ur.c=gridshift;
		}
		if(sym.ur.se!=checkbl[0]){
			sym.ur.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.ur.c=gridshift;
		}
	}
	if(sym.ur.t!=''){}
	else if(title=='')sym.ur.t=sym.ur.sy;
	else{sym.ur.t=title;title='';}
	checkbl=checkBlackList(sym.l.sy,sym.l.se,sym.l.gr,'y');
	if(checkbl===true){
		sym.l.b=true;
		sym.l.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.l.gr!=checkbl[1]){
			sym.l.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.l.c=gridshift;
		}
		if(sym.l.se!=checkbl[0]){
			sym.l.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.l.c=gridshift;
		}
	}
	if(sym.l.t!=''){}
	else if(title=='')sym.l.t=sym.l.sy;
	else{sym.l.t=title;title='';}
	checkbl=checkBlackList(sym.r.sy,sym.r.se,sym.r.gr,'y');
	if(checkbl===true){
		sym.r.b=true;
		sym.r.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.r.gr!=checkbl[1]){
			sym.r.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.r.c=gridshift;
		}
		if(sym.r.se!=checkbl[0]){
			sym.r.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.r.c=gridshift;
		}
	}
	if(sym.r.t!=''){}
	else if(title=='')sym.r.t=sym.r.sy;
	else{sym.r.t=title;title='';}
	checkbl=checkBlackList(sym.dl.sy,sym.dl.se,sym.dl.gr,'y');
	if(checkbl===true){
		sym.dl.b=true;
		sym.dl.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.dl.gr!=checkbl[1]){
			sym.dl.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.dl.c=gridshift;
		}
		if(sym.dl.se!=checkbl[0]){
			sym.dl.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.dl.c=gridshift;
		}
	}
	if(sym.dl.t!=''){}
	else if(title=='')sym.dl.t=sym.dl.sy;
	else{sym.dl.t=title;title='';}
	checkbl=checkBlackList(sym.d.sy,sym.d.se,sym.d.gr,'y');
	if(checkbl===true){
		sym.d.b=true;
		sym.d.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.d.gr!=checkbl[1]){
			sym.d.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.d.c=gridshift;
		}
		if(sym.d.se!=checkbl[0]){
			sym.d.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.d.c=gridshift;
		}
	}
	if(sym.d.t!=''){}
	else if(title=='')sym.d.t=sym.d.sy;
	else{sym.d.t=title;title='';}
	checkbl=checkBlackList(sym.dr.sy,sym.dr.se,sym.dr.gr,'y');
	if(checkbl===true){
		sym.dr.b=true;
		sym.dr.c=blocked;
	}else{
		checkbl=checkbl.split('#');
		if(sym.dr.gr!=checkbl[1]){
			sym.dr.gr=checkbl[1];
			if(gridSYSTEM!==true)sym.dr.c=gridshift;
		}
		if(sym.dr.se!=checkbl[0]){
			sym.dr.se=checkbl[0];
			if(sectorSYSTEM!==true)sym.dr.c=gridshift;
		}
	}
	if(sym.dr.t!=''){}
	else if(title=='')sym.dr.t=sym.dr.sy;
	else{sym.dr.t=title;title='';}
	// create the display
	var subdiv=document.createElement('div');
	subdiv.setAttribute('style','height:auto;width:auto;float:left;margin:2px 0px 0px 0px');
	main.appendChild(subdiv);
	var newrow=row();
	newrow.appendChild(cell(button(sym.ul.b,buttonsize,buttonsize,sym.ul.t,'',sym.ul.c,iul,makelink(sym.ul.sy,sym.ul.se,sym.ul.gr,jumptypeSYSTEM))));
	newrow.appendChild(cell(button(sym.u.b ,buttonsize,buttonsize,sym.u.t,'',sym.u.c ,iu ,makelink(sym.u.sy ,sym.u.se ,sym.u.gr ,jumptypeSYSTEM))));
	newrow.appendChild(cell(button(sym.ur.b,buttonsize,buttonsize,sym.ur.t,'',sym.ur.c,iur,makelink(sym.ur.sy,sym.ur.se,sym.ur.gr,jumptypeSYSTEM))));
	subdiv.appendChild(newrow);
	var newrow=row();
	newrow.appendChild(cell(button(sym.l.b ,buttonsize,buttonsize,sym.l.t,'',sym.l.c ,il ,makelink(sym.l.sy ,sym.l.se ,sym.l.gr ,jumptypeSYSTEM))));
	if(middle) newrow.appendChild(cell(button(false,buttonsize,buttonsize,'Galaxy Layer / Trailscan','','',isys,makeSCANlink(system,sector,grid,1))));
	else newrow.appendChild(cell(button(true,buttonsize,buttonsize,'System Jumping (Galaxy Layer)','','',isys,'')));
	newrow.appendChild(cell(button(sym.r.b ,buttonsize,buttonsize,sym.r.t,'',sym.r.c ,ir ,makelink(sym.r.sy ,sym.r.se ,sym.r.gr ,jumptypeSYSTEM))));
	subdiv.appendChild(newrow);
	var newrow=row();
	newrow.appendChild(cell(button(sym.dl.b,buttonsize,buttonsize,sym.dl.t,'',sym.dl.c,idl,makelink(sym.dl.sy,sym.dl.se,sym.dl.gr,jumptypeSYSTEM))));
	newrow.appendChild(cell(button(sym.d.b ,buttonsize,buttonsize,sym.d.t,'',sym.d.c ,id ,makelink(sym.d.sy ,sym.d.se ,sym.d.gr ,jumptypeSYSTEM))));
	newrow.appendChild(cell(button(sym.dr.b,buttonsize,buttonsize,sym.dr.t,'',sym.dr.c,idr,makelink(sym.dr.sy,sym.dr.se,sym.dr.gr,jumptypeSYSTEM))));
	subdiv.appendChild(newrow);
	/*************************************
	/ Sector Navigation Block
	*************************************/
	var sem={
		'l':{'sy':system,'se':sector-1,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'r':{'sy':system,'se':sector+1,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'u':{'sy':system,'se':sector-20,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'd':{'sy':system,'se':sector+20,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'ul':{'sy':system,'se':sector-21,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'ur':{'sy':system,'se':sector-19,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'dl':{'sy':system,'se':sector+19,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''},
		'dr':{'sy':system,'se':sector+21,'gr':random(gridSECTOR,'g'),'c':'','b':false,'t':''}
	}
	// check for the sun!
	if(sun.search(/#u#/)>=0){
		starSW: switch(sector) {
			case 169: sem.dr.se+=42; sem.dr.c=sunny; break starSW;
			case 170: sem.d.se+=40; sem.d.c=sunny; sem.dr.se+=21; sem.dr.c=sunny; break starSW;
			case 171: sem.d.se+=40; sem.d.c=sunny; edownleft+=19; edlsu=sunny; break starSW;
			case 172: sem.dl.se+=38; sem.dl.c=sunny; break starSW;
			case 189: sem.r.se+=2; sem.r.c=sunny; sem.dr.se+=21; sem.dr.c=sunny; break starSW;
			case 209: sem.r.se+=2; sem.r.c=sunny; sem.ur.se-=19; sem.ur.c=sunny; break starSW;
			case 192: sem.l.se-=2; sem.l.c=sunny; sem.dl.se+=19; sem.dl.c=sunny; break starSW;
			case 212: sem.l.se-=2; sem.l.c=sunny; sem.ul.se-=21; sem.ul.c=sunny; break starSW;
			case 229: sem.ur.se-=38; sem.ur.c=sunny; break starSW;
			case 230: sem.u.se-=40; sem.u.c=sunny; sem.ur.se-=19; sem.ur.c=sunny; break starSW;
			case 231: sem.u.se-=40; sem.u.c=sunny; sem.ul.se-=21; sem.ul.c=sunny; break starSW;
			case 232: sem.ul.se-=42; sem.ul.c=sunny; break starSW;
		}
	}
	// get system borders!
	borg='System Border';
	if(sector >= 21 && sector <= 380){}
	else if(sector >= 1 && sector <= 20){sem.ul.b=true; sem.ul.t=borg; sem.u.b=true; sem.u.t=borg; sem.ur.b=true; sem.ur.t=borg;}
	else if(sector >= 381 && sector <= 400){ sem.dl.b=true; sem.dl.t=borg; sem.d.b=true; sem.d.t=borg; sem.dr.b=true; sem.dr.t=borg;}
	var name=sector.toString();
	var x=name.length;
	var mid=name.charAt(x-2);
	LRBtn: if(mid%2==0) {
		var last=name.charAt(x-1);
		switch(last){
			case "1" : sem.ul.b=true; sem.ul.t=borg; sem.l.b=true; sem.l.t=borg; sem.dl.b=true; sem.dl.t=borg; break LRBtn;
			case "0" : sem.ur.b=true; sem.ur.t=borg; sem.r.b=true; sem.r.t=borg; sem.dr.b=true; sem.dr.t=borg; break LRBtn;
		} 
	}
	// check blacklist
	var checkbl;
	checkbl=checkBlackList(sem.ul.sy,sem.ul.se,sem.ul.gr,'e');
	if(checkbl===true){
		sem.ul.b=true;
		sem.ul.c=blocked;
	}else if(sem.ul.gr!=checkbl){
		sem.ul.gr=checkbl;
		if(gridSECTOR!==true)sem.ul.c=gridshift;
	}
	if(sem.ul.t!=''){}
	else if(title=='')sem.ul.t=sem.ul.se;
	else{sem.ul.t=title;title='';}
	checkbl=checkBlackList(sem.u.sy,sem.u.se,sem.u.gr,'e');
	if(checkbl===true){
		sem.u.b=true;
		sem.u.c=blocked;
	}else if(sem.u.gr!=checkbl){
		sem.u.gr=checkbl;
		if(gridSECTOR!==true)sem.u.c=gridshift;
	}
	if(sem.u.t!=''){}
	else if(title=='')sem.u.t=sem.u.se;
	else{sem.u.t=title;title='';}
	checkbl=checkBlackList(sem.ur.sy,sem.ur.se,sem.ur.gr,'e');
	if(checkbl===true){
		sem.ur.b=true;
		sem.ur.c=blocked;
	}else if(sem.ur.gr!=checkbl){
		sem.ur.gr=checkbl;
		if(gridSECTOR!==true)sem.ur.c=gridshift;
	}
	if(sem.ur.t!=''){}
	else if(title=='')sem.ur.t=sem.ur.se;
	else{sem.ur.t=title;title='';}
	checkbl=checkBlackList(sem.l.sy,sem.l.se,sem.l.gr,'e');
	if(checkbl===true){
		sem.l.b=true;
		sem.l.c=blocked;
	}else if(sem.l.gr!=checkbl){
		sem.l.gr=checkbl;
		if(gridSECTOR!==true)sem.l.c=gridshift;
	}
	if(sem.l.t!=''){}
	else if(title=='')sem.l.t=sem.l.se;
	else{sem.l.t=title;title='';}
	checkbl=checkBlackList(sem.r.sy,sem.r.se,sem.r.gr,'e');
	if(checkbl===true){
		sem.r.b=true;
		sem.r.c=blocked;
	}else if(sem.r.gr!=checkbl){
		sem.r.gr=checkbl;
		if(gridSECTOR!==true)sem.r.c=gridshift;
	}
	if(sem.r.t!=''){}
	else if(title=='')sem.r.t=sem.r.se;
	else{sem.r.t=title;title='';}
	checkbl=checkBlackList(sem.dl.sy,sem.dl.se,sem.dl.gr,'e');
	if(checkbl===true){
		sem.dl.b=true;
		sem.dl.c=blocked;
	}else if(sem.dl.gr!=checkbl){
		sem.dl.gr=checkbl;
		if(gridSECTOR!==true)sem.dl.c=gridshift;
	}
	if(sem.dl.t!=''){}
	else if(title=='')sem.dl.t=sem.dl.se;
	else{sem.dl.t=title;title='';}
	checkbl=checkBlackList(sem.d.sy,sem.d.se,sem.d.gr,'e');
	if(checkbl===true){
		sem.d.b=true;
		sem.d.c=blocked;
	}else if(sem.d.gr!=checkbl){
		sem.d.gr=checkbl;
		if(gridSECTOR!==true)sem.d.c=gridshift;
	}
	if(sem.d.t!=''){}
	else if(title=='')sem.d.t=sem.d.se;
	else{sem.d.t=title;title='';}
	checkbl=checkBlackList(sem.dr.sy,sem.dr.se,sem.dr.gr,'e');
	if(checkbl===true){
		sem.dr.b=true;
		sem.dr.c=blocked;
	}else if(sem.dr.gr!=checkbl){
		sem.dr.gr=checkbl;
		if(gridSECTOR!==true)sem.dr.c=gridshift;
	}
	if(sem.dr.t!=''){}
	else if(title=='')sem.dr.t=sem.dr.se;
	else{sem.dr.t=title;title='';}
	// create the display
	var subdiv=document.createElement('div');
	if(three)subdiv.setAttribute('style','height:auto;width:auto;float:left;margin:2px 2px 0px 2px');
	else subdiv.setAttribute('style','height:auto;width:auto;float:right;margin:2px 0px 0px 0px');
	main.appendChild(subdiv);
	var newrow=row();
	newrow.appendChild(cell(button(sem.ul.b,buttonsize,buttonsize,sem.ul.t,'',sem.ul.c,iul,makelink(sem.ul.sy,sem.ul.se,sem.ul.gr,jumptypeSECTOR))));
	newrow.appendChild(cell(button(sem.u.b ,buttonsize,buttonsize,sem.u.t,'',sem.u.c ,iu ,makelink(sem.u.sy ,sem.u.se ,sem.u.gr ,jumptypeSECTOR))));
	newrow.appendChild(cell(button(sem.ur.b,buttonsize,buttonsize,sem.ur.t,'',sem.ur.c,iur,makelink(sem.ur.sy,sem.ur.se,sem.ur.gr,jumptypeSECTOR))));
	subdiv.appendChild(newrow);
	var newrow=row();
	newrow.appendChild(cell(button(sem.l.b ,buttonsize,buttonsize,sem.l.t,'',sem.l.c ,il ,makelink(sem.l.sy ,sem.l.se ,sem.l.gr ,jumptypeSECTOR))));
	if(middle) newrow.appendChild(cell(button(false,buttonsize,buttonsize,'System Layer / Scan System','','',isec,makeSCANlink(system,sector,grid,2))));
	else newrow.appendChild(cell(button(true,buttonsize,buttonsize,'Sector Jumping (System Layer)','','',isec,'')));
	newrow.appendChild(cell(button(sem.r.b ,buttonsize,buttonsize,sem.r.t,'',sem.r.c ,ir ,makelink(sem.r.sy ,sem.r.se ,sem.r.gr ,jumptypeSECTOR))));
	subdiv.appendChild(newrow);
	var newrow=row();
	newrow.appendChild(cell(button(sem.dl.b,buttonsize,buttonsize,sem.dl.t,'',sem.dl.c,idl,makelink(sem.dl.sy,sem.dl.se,sem.dl.gr,jumptypeSECTOR))));
	newrow.appendChild(cell(button(sem.d.b ,buttonsize,buttonsize,sem.d.t,'',sem.d.c ,id ,makelink(sem.d.sy ,sem.d.se ,sem.d.gr ,jumptypeSECTOR))));
	newrow.appendChild(cell(button(sem.dr.b,buttonsize,buttonsize,sem.dr.t,'',sem.dr.c,idr,makelink(sem.dr.sy,sem.dr.se,sem.dr.gr,jumptypeSECTOR))));
	subdiv.appendChild(newrow);
	/***************************************************
	/ Grid Navigation Block - only do when three is true
	****************************************************/
	if(three){
	function ckplanet(gr){
		if(!planet)return false;
		switch(gr){
			case 190: case 191: case 210: case 211: return true;
			default: return false;
		}
	}
	var grm={
		'l':{'sy':system,'se':sector,'gr':grid-1,'c':'','b':false,'t':''},
		'r':{'sy':system,'se':sector,'gr':grid+1,'c':'','b':false,'t':''},
		'u':{'sy':system,'se':sector,'gr':grid-20,'c':'','b':false,'t':''},
		'd':{'sy':system,'se':sector,'gr':grid+20,'c':'','b':false,'t':''},
		'ul':{'sy':system,'se':sector,'gr':grid-21,'c':'','b':false,'t':''},
		'ur':{'sy':system,'se':sector,'gr':grid-19,'c':'','b':false,'t':''},
		'dl':{'sy':system,'se':sector,'gr':grid+19,'c':'','b':false,'t':''},
		'dr':{'sy':system,'se':sector,'gr':grid+21,'c':'','b':false,'t':''}
	}
	var planet=checkplanet(system,sector);
	if(planet&&grid==190){
		grm.ul.gr=169; grm.u.gr=170; grm.ur.gr=172;
		grm.l.gr=189; grm.r.gr=212;
		grm.dl.gr=229; grm.d.gr=231; grm.dr.gr=232;
	}else{
		borg='Sector Border';
		// get sector borders - we don't need to check them when we're on a planet. saves some time.
		if(grid >= 21 && grid <= 380){}
		else if(grid >= 1 && grid <= 20){grm.ul.b=true; grm.u.b=true; grm.ur.b=true; grm.ul.t=borg; grm.u.t=borg; grm.ur.t=borg;}
		else if(grid >= 381 && grid <= 400){grm.dl.b=true; grm.d.b=true; grm.dr.b=true; grm.dl.t=borg; grm.d.t=borg; grm.dr.t=borg;}
		var name=grid.toString();
		var x=name.length;
		var mid=name.charAt(x-2);
		LRBtn: if(mid%2==0) {
			var last=name.charAt(x-1);
			switch(last){
				case "1" : grm.ul.b=true; grm.l.b=true; grm.dl.b=true; grm.ul.t=borg; grm.l.t=borg; grm.dl.t=borg; break LRBtn;
				case "0" : grm.ur.b=true; grm.r.b=true; grm.dr.b=true; grm.ur.t=borg; grm.r.t=borg; grm.dr.t=borg; break LRBtn;
			}
		}
	}
	// check blacklist
	var checkbl;
	checkbl=checkBlackList(grm.ul.sy,grm.ul.se,grm.ul.gr,'g');
	if(checkbl===true){
		grm.ul.b=true;
		grm.ul.c=blocked;
	}else if(grm.ul.gr!=checkbl){
		grm.ul.gr=checkbl;
		grm.ul.c=gridshift;
	}
	if(grm.ul.t!=''){}
	else if(title=='')grm.ul.t=grm.ul.gr;
	else{grm.ul.t=title;title='';}
	checkbl=checkBlackList(grm.u.sy,grm.u.se,grm.u.gr,'g');
	if(checkbl===true){
		grm.u.b=true;
		grm.u.c=blocked;
	}else if(grm.u.gr!=checkbl){
		grm.u.gr=checkbl;
		grm.u.c=gridshift;
	}
	if(grm.u.t!=''){}
	else if(title=='')grm.u.t=grm.u.gr;
	else{grm.u.t=title;title='';}
	checkbl=checkBlackList(grm.ur.sy,grm.ur.se,grm.ur.gr,'g');
	if(checkbl===true){
		grm.ur.b=true;
		grm.ur.c=blocked;
	}else if(grm.ur.gr!=checkbl){
		grm.ur.gr=checkbl;
		grm.ur.c=gridshift;
	}
	if(grm.ur.t!=''){}
	else if(title=='')grm.ur.t=grm.ur.gr;
	else{grm.ur.t=title;title='';}
	checkbl=checkBlackList(grm.l.sy,grm.l.se,grm.l.gr,'g');
	if(checkbl===true){
		grm.l.b=true;
		grm.l.c=blocked;
	}else if(grm.l.gr!=checkbl){
		grm.l.gr=checkbl;
		grm.l.c=gridshift;
	}
	if(grm.l.t!=''){}
	else if(title=='')grm.l.t=grm.l.gr;
	else{grm.l.t=title;title='';}
	checkbl=checkBlackList(grm.r.sy,grm.r.se,grm.r.gr,'g');
	if(checkbl===true){
		grm.r.b=true;
		grm.r.c=blocked;
	}else if(grm.r.gr!=checkbl){
		grm.r.gr=checkbl;
		grm.r.c=gridshift;
	}
	if(grm.r.t!=''){}
	else if(title=='')grm.r.t=grm.r.gr;
	else{grm.r.t=title;title='';}
	checkbl=checkBlackList(grm.dl.sy,grm.dl.se,grm.dl.gr,'g');
	if(checkbl===true){
		grm.dl.b=true;
		grm.dl.c=blocked;
	}else if(grm.dl.gr!=checkbl){
		grm.dl.gr=checkbl;
		grm.dl.c=gridshift;
	}
	if(grm.dl.t!=''){}
	else if(title=='')grm.dl.t=grm.dl.gr;
	else{grm.dl.t=title;title='';}
	checkbl=checkBlackList(grm.d.sy,grm.d.se,grm.d.gr,'g');
	if(checkbl===true){
		grm.d.b=true;
		grm.d.c=blocked;
	}else if(grm.d.gr!=checkbl){
		grm.d.gr=checkbl;
		grm.d.c=gridshift;
	}
	if(grm.d.t!=''){}
	else if(title=='')grm.d.t=grm.d.gr;
	else{grm.d.t=title;title='';}
	checkbl=checkBlackList(grm.dr.sy,grm.dr.se,grm.dr.gr,'g');
	if(checkbl===true){
		grm.dr.b=true;
		grm.dr.c=blocked;
	}else if(grm.dr.gr!=checkbl){
		grm.dr.gr=checkbl;
		grm.dr.c=gridshift;
	}
	if(grm.dr.t!=''){}
	else if(title=='')grm.dr.t=grm.dr.gr;
	else{grm.dr.t=title;title='';}
	if(ckplanet(grm.ul.gr))grm.ul.c=planetc;
	if(ckplanet(grm.u.gr))grm.u.c=planetc;
	if(ckplanet(grm.ur.gr))grm.ur.c=planetc;
	if(ckplanet(grm.l.gr))grm.l.c=planetc;
	if(ckplanet(grm.r.gr))grm.r.c=planetc;
	if(ckplanet(grm.dl.gr))grm.dl.c=planetc;
	if(ckplanet(grm.d.gr))grm.d.c=planetc;
	if(ckplanet(grm.dr.gr))grm.dr.c=planetc;
	// create the display
	var subdiv=document.createElement('div');
	subdiv.setAttribute('style','height:auto;width:auto;float:right;margin:2px 0px 0px 0px');
	main.appendChild(subdiv);
	var newrow=row();
	newrow.appendChild(cell(button(grm.ul.b,buttonsize,buttonsize,grm.ul.t,'',grm.ul.c,iul,makelink(grm.ul.sy,grm.ul.se,grm.ul.gr,jumptypeGRID))));
	newrow.appendChild(cell(button(grm.u.b ,buttonsize,buttonsize,grm.u.t,'',grm.u.c ,iu ,makelink(grm.u.sy ,grm.u.se ,grm.u.gr ,jumptypeGRID))));
	newrow.appendChild(cell(button(grm.ur.b,buttonsize,buttonsize,grm.ur.t,'',grm.ur.c,iur,makelink(grm.ur.sy,grm.ur.se,grm.ur.gr,jumptypeGRID))));
	subdiv.appendChild(newrow);
	var newrow=row();
	newrow.appendChild(cell(button(grm.l.b ,buttonsize,buttonsize,grm.l.t,'',grm.l.c ,il ,makelink(grm.l.sy ,grm.l.se ,grm.l.gr ,jumptypeGRID))));
	if(middle) newrow.appendChild(cell(button(false,buttonsize,buttonsize,'Sector Layer / Scan Grid','','',igrid,makeSCANlink(system,sector,grid,3))));
	else newrow.appendChild(cell(button(true,buttonsize,buttonsize,'Grid Jumping (Sector Layer)','','',igrid,'')));
	newrow.appendChild(cell(button(grm.r.b ,buttonsize,buttonsize,grm.r.t,'',grm.r.c ,ir ,makelink(grm.r.sy ,grm.r.se ,grm.r.gr ,jumptypeGRID))));
	subdiv.appendChild(newrow);
	var newrow=row();
	newrow.appendChild(cell(button(grm.dl.b,buttonsize,buttonsize,grm.dl.t,'',grm.dl.c,idl,makelink(grm.dl.sy,grm.dl.se,grm.dl.gr,jumptypeGRID))));
	newrow.appendChild(cell(button(grm.d.b ,buttonsize,buttonsize,grm.d.t,'',grm.d.c ,id ,makelink(grm.d.sy ,grm.d.se ,grm.d.gr ,jumptypeGRID))));
	newrow.appendChild(cell(button(grm.dr.b,buttonsize,buttonsize,grm.dr.t,'',grm.dr.c,idr,makelink(grm.dr.sy,grm.dr.se,grm.dr.gr,jumptypeGRID))));
	subdiv.appendChild(newrow);
	}
	/***************************************************
	/ Added Improved Jump Box - only do when set true
	****************************************************/
	if(jumpbox){
	function checkopen(s){
		if(s==133)return true;
		if(s>=147&&s<=153)return true;
		if(s>=168&&s<=173)return true;
		if(s>=188&&s<=193)return true;
		if(s>=208&&s<=213)return true;
		if(s>=228&&s<=233)return true;
		if(s>=248&&s<=254)return true;
		if(s==268)return true;
		return false;
	}
	var subdiv=document.createElement('div');
	subdiv.setAttribute('style','float:none;');
	main.appendChild(subdiv);
	var subspan=document.createElement('span');
	subspan.setAttribute('style','height:auto;width:auto;float:left;text-align:center;margin:10px 0px 0px 0px');
	subdiv.appendChild(subspan);
	var jbsel=document.createElement('select');
	jbsel.id='jsys';
	jbsel.className='forms';
	jbsel.style.margin='0px 2px 0px 0px';
	var jsys=1;
	while(jsys<=400){
		if(checkopen(jsys)){
			var jbselopt=document.createElement('option');
			if(jsys==system)jbselopt.selected="selected";
			jbselopt.value=jsys;
			if(jsys in blacklist&&'n' in blacklist[jsys])jbselopt.textContent=blacklist[jsys]['n'];
			else jbselopt.textContent=jsys;
			jbsel.appendChild(jbselopt);
		}
		jsys++;
	}
	subspan.appendChild(jbsel);
	subspan.appendChild(document.createElement('br'));
	subspan.appendChild(document.createTextNode('Sector:'));
	var child=document.createElement('input');
		child.type='text';
		child.id='jsec';
		child.className='forms_txt';
		child.style.width='22px';
		child.style.margin='2px 4px 0px 0px';
		child.maxLength=3;
		child.setAttribute('onKeyPress',"var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);
	subspan.appendChild(document.createTextNode('Grid:'));
	child=document.createElement('input');
		child.type='text';
		child.id='jgrid';
		child.className='forms_txt';
		child.style.width='22px';
		child.style.margin='2px 0px 0px 2px';
		child.maxLength=3;
		child.setAttribute('onKeyPress',"var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);

	subspan=document.createElement('span');
	subspan.setAttribute('style',"height:auto;width:auto;float:right;margin:10px 0px 0px 0px;");
	subdiv.appendChild(subspan);
	var ishow="iVBORw0KGgoAAAANSUhEUgAAAAsAAAAjCAYAAABCU/B9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAfklEQVQ4T71TgQ3AIAjT/5/is20mM3GMQhU3E6PBim3BUn4ZInLoaT7cQNaBGUdgKImmgTJM0YD00jS+sy4v0BLXYy/eW8qd57z0B0ahboIbWBvo2le3L9LNv8cNnSX8arQbtNfLvTFeDN2gwR2o14ceBKJL7vo8XRTa6wh4Ao0Z+zcpAaPjAAAAAElFTkSuQmCC"
	var view="if(document.getElementById('jsec').value==''||document.getElementById('jgrid').value==''){alert('Please fill all fields');return false}location.href='index.php?view=sector&system_id='+parseFloat(document.getElementById('jsys').value)+'&sector_id='+parseFloat(document.getElementById('jsec').value)+'&grid_id='+parseFloat(document.getElementById('jgrid').value);";
	subspan.appendChild(button(false,'11','35','Show Target Location','','',ishow,view));

	subspan=document.createElement('span');
	subspan.setAttribute('style','height:auto;width:auto;float:right;margin:10px 0px 0px 0px');
	subdiv.appendChild(subspan);
	var jls="if(document.getElementById('jsec').value==''||document.getElementById('jgrid').value==''){alert('Please fill all fields');return false}location.href='functions/lightspeed.php?system_id='+parseFloat(document.getElementById('jsys').value)+'&sector_id='+parseFloat(document.getElementById('jsec').value)+'&grid_id='+parseFloat(document.getElementById('jgrid').value);";
	subspan.appendChild(button(false,'25','','Lightspeed','LS','','',jls));
	subspan.appendChild(document.createElement('br'));
	var jhj="if(document.getElementById('jsec').value==''||document.getElementById('jgrid').value==''){alert('Please fill all fields');return false}location.href='functions/hyperjump.php?system_id='+parseFloat(document.getElementById('jsys').value)+'&sector_id='+parseFloat(document.getElementById('jsec').value)+'&grid_id='+parseFloat(document.getElementById('jgrid').value);";
	subspan.appendChild(button(false,'25','','Hyperjump','HJ','','',jhj));
	subspan=document.createElement('span');
	subspan.setAttribute('style','clear:both');
	subdiv.appendChild(subspan);
	}
}
