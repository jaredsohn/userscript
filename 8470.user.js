// ==UserScript==
// @name	Bad Guy Sticker
// @namespace	http://www.ruinsofmorning.net/greasemonkey/
// @description	Tag products in Amazon from companies that threaten our freedom in the name of so-called Intellectual Property.
// @author	Tarmle (http://www.ruinsofmorning.net)
// @version	v0.9.4 - Lists 2007-04-11
// @include	http://*.amazon.*/*
// @include	http://*.hmv.co.uk/*
// ==/UserScript==

d = document;

parts = 10; // Number of partial matches to show.

badguys = new Array(); partials = new Array();
cmatch = new Array(); pmatch = new Array();
messages = new Array(); comp = ''; ctype = '';

// Extract company name from Amazon product page //
listitems = d.getElementsByTagName('li');
for (li in listitems) {
	ih = prepString(listitems[li].innerHTML);

	// Test for company feild
	if (m = ih.match(/(Publisher|Studio|Label):\s*(.*?)$/)) {
		ctype = m[1];
		comp = m[2];
		break;
	}
}

// Extract company name from HMV product page //
if (comp == '') {
	paraitems = d.getElementsByTagName('p');
	for (pi in paraitems) {
		if (!paraitems[pi].attributes) {continue;}
		if (paraitems[pi].getAttribute('class') == 'extra-info') {
			ph = prepString(paraitems[pi].innerHTML);
			if (m = ph.match(/(Publisher|Studio|Label):\s*(.*?)(?:\n|\t|<)/)) {
				ctype = m[1];
				comp = m[2];
				break;
			}
		}
	}
}

// Test company name against Bad Guy lists //
found = false;
if (comp > '') {
	// Parse Bad Guy Lists 
	bgl();

	// Define Regular Expressions
	rcomp = comp.replace(/[.()]/g,'');	// Remove problem chars for testing
	rcomp = rcomp.replace(/&amp;/g, '&');	// Trade HTML ents
	cre = new RegExp('^'+rcomp+'$', 'i');	// Exact Match RE
	pre = new RegExp(rcomp, 'i');		// Partial Match RE

	// Search Lists
	for (i in badguys) {
		mcount = 0;
		efound = false;
		for (bg in badguys[i]) {
			// Test for exact company match (if required) //
			rbadguy = badguys[i][bg].replace(/[.()]/g,'');
			if (!efound) {
				if (cre.test(rbadguy)) {
					found = true;
					efound = true;
					cmatch[i] = true;
					continue;
				}
			}

			// Test for partial company match //
			rpre = new RegExp(rbadguy, 'i');
			if (pre.test(rbadguy) || rpre.test(comp)) {
				found = true;
				partials.push(badguys[i][bg] + ' (' + i + ')');
				pmatch[i] = true;
			}
		}
	}
}

// Create Warning Message //
if (found) {
	// Basic Sticker Area //
	warn = d.createElement('div');
	warn.setAttribute('id', 'BagGuysSticker');
	warn.setAttribute('style', "font: normal 7pt verdana,sans-serif; position: fixed;"+
	"top: 40px; right: 80px; width: 250px; background: black; border: dashed 4px yellow; color: white;");

	// Identify Script //
	warn.innerHTML = '<div style="font-size: 10pt; border-bottom: dashed 4px yellow; padding: 2px; text-align: center;">'+
	'<a title="From Greasemonkey Script \'badguysticker.user.js\'" style="color: yellow; text-decoration: none; font-weight: bold;">BAD GUY INFORMATION STICKER</a></div>';

	// Show Found Company Name //
	if (comp) warn.innerHTML += '<div style="font-size: 9pt; padding: 2px; margin: 3px;"><b>' + ctype + ':</b> ' + comp + '</div>';

	// Add Absolute Match Indicators //
	cert = false;
	for (i in cmatch) {
		cert = true;
		warn.innerHTML += '<div style="background: red; text-align: center; margin: 3px; padding: 3px; font-size: 11pt;"><b>'+i+'</b></div>';
	}

	// Add Possible Match Indicators //
	poss = false;
	for (i in pmatch) {
		if (cmatch[i]) {continue;}
		poss = true;
		warn.innerHTML += '<div style="background: #f80; text-align: center; margin: 3px; padding: 3px; font-size: 11pt;"><b>Possible ' + i + '</b></div>';
	}

	// Show Partial Match List //
	if (partials.length > 0) {
		if (partials.length > parts) {partials.splice(parts, (partials.length)-parts);}
		warn.innerHTML += '<div style="text-align: left; margin: 3px;"><b>Partial Name Matches:</b>'+
		'<ul style="margin: 1px; padding: 0px; padding-left: 20px; list-style-type: disc;"><li style="margin: 0px;">' + partials.join('</li><li style="margin: 0px;">') + '</li></ul></div>';
	}

	// Add Random Warning Message //
	minsert = messages[Math.round(Math.random()*(messages.length-1))];
	if (poss && !cert) {minsert = minsert.replace(/ will /, ' might ');}
	warn.innerHTML += '<div style="margin: 3px; padding: 2px; border: solid 2px red; font-size: 9pt; font-weight: bold;'+
	'text-align: center; background: white; color: red;">' + minsert + '</div>';

	// Add Click-Hide //
	warn.innerHTML += '<div style="text-align: center; font-size: 7pt; margin: 3px;">Click to Hide</div>';
	warn.addEventListener('click', function(){warn.style.display = 'none';}, false);

	d.body.appendChild(warn);
}


// FUNCTIONS //

// Prepare content for searching //
function prepString(c) {
	c = String(c); // Turn HTML content to string
	c = c.replace(/(<[^>]*?>)/g, ''); // Remove HTML
	return c;
}

// Parse Bad Guy Lists and Warning Messages (processing blip) //
function bgl() {
	badguys["RIAA Member"] = String(''+
"112 - Bad Boy|112 Records|12 Girls|1500 Records|19 Records|2-4-1 Records|20th Century Fox|20th Centu"+
"ry Fox Home Ent|20th Century Fox Home Entertainment|2pac Int Unrel Mast|333 Music|3h|40 Records|456 "+
"Enterprises|4th & Broadway|5 Minute Walk Music|5.1 Entertainment|510 Records|550 Music|550/Fox|57 Re"+
"cords|7spin Music|911 Ent/ Red Ant|A & M|A&M Dreamworks|A&M Hip-O Compilations|A&M Jazz|A&M Premium|"+
"A&M Rap|A&M Records|A&M Super Budget|A&M Urban|A440 Records|Abacus Records|Abkco|Absolutely Kosher|A"+
"cony Records|Ad Records|Aeria Entertainment|Aezra Records|Afrt Music|Aftermath|Aftermath/Ruff Ryders"+
"|Aftermath/Shady|Aj Records|Alfanno|Alice Radio|All Saints|All Star|Alligator Records|Almo Sounds|Am"+
"60|Amaru|Amaru Ii|Amaru Records|American Gramaphone|American Recordings|Americana Music Association|"+
"Ami Music, Inc.|Amiata Records|Among Friends Records, Inc.|And 1|Andy Prieboy|Angel|Angel Special Im"+
"ports|Angel Wars|Angeles Records|Angels|Anime 18|Annabelle's Wish (Ralph Edwards Prod.)|Antilles|Ant"+
"ra Records|Apostrophe Records|Ardent Records|Aries Records|Arista|Arista-Profile|Ark 21|Ark/Bungalo|"+
"Arsenal|Artanis|Arte Nova|Artemis Sheridan Sq. – Canada|Artisan|Artistry|Arts Magic|Asian Pulp Cinem"+
"a|Astoria Entertainment|Astralwerks - Capitol|Astralwerks - Commercial Mktg|Astralwerks - Virgin|Asw"+
" Catalog|Asylum Records|Asylum//Arroyo|Atlantic|Atlantic Catalog Group|Atlantic Classics Crossover|A"+
"tlantic Nashville|Atlantic P&D|Ato Records|Ato/Galvanic|Audioslave Sony|Ava Records|Avatar Music|Ave"+
"nue Records|Avi|Aware|Aware Jv-Two Tier|Axiom|B-Dub|B-Rite|B.E.C.|Bacatranes|Back Porch|Back Porch -"+
" Catalog|Bad Boy Entertainment, Inc|Bad Boy Records|Badboy|Bajada/Lightyear|Ballers Entertainment|Ba"+
"llers Entertainment Catalog|Barak Entertainment|Barb Wire Productions|Barnes Williams Dvd|Basement R"+
"ecords|Bass Productions|Battery|Be Beautiful|Beat Club|Beatles|Beatmart|Beauty Records|Beggars Banqu"+
"et|Beginner's Bible|Beiler Bros. Records|Belart|Belly Soundtrack|Benson|Benz-Street Music|Berman Bro"+
"thers|Bernie Williams|Best Side|Best Side Catalog|Beyond Music|Bht Entertainment|Bibleman|Big 3 Ente"+
"rtainment|Big Baller|Big Cat/ Work|Big Dog Music|Big Game Ventures|Big Idea Post Mar/2004|Big Idea P"+
"roductions|Big Intertainment Grp 2ksounds|Big Machine|Big World|Bigtyme Records|Billy Corgan|Billy C"+
"rystal Project|Biv 10 Records|Black Out|Blackground Catalog|Blackground Records|Blackheart|Blind Pig"+
" Records|Bliss Productions|Blix Street|Blood and Fire|Blood Brothers Catalog|Blood Rush Records|Bloo"+
"dline Records|Bloodshot|Blue Gorilla|Blue Note|Blue Plate|Blue Thumb (Grp)|Blue Thumb (Verve)|Blue U"+
"nderground|Bluebird|Bmg|Bmg Classics|Bmg Classics Video|Bmg Heritage|Bmg Video (Discovery/Reebok)|Bm"+
"g/Provident|Bna Records|Bnb|Bob Marley Music|Bocelli-Sogno|Body Head Entertainment, Inc.|Bohemia|Bon"+
" Jovi Catalog|Bon Jovi Catalog Video|Bon Jovi Development|Boss Entertainment|Box Tunes|Branford Mars"+
"alis|Break 'Em Off Records|Breakaway|Brentwood Music|Broadway Mca|Brody Records – Jr. Label|Broken B"+
"ow Records|Broken Records|Brushfire Records, Inc.|Brutal Records|Buddha|Build Worldwide|Bullseye|Bun"+
"galo Records|Burn.Heart/ Epitaph|Burning Brides|Byo Records|Byrd Records|C-Loc Records|C2|Cadena Rec"+
"ords|Cadence Christian|Cake Records|Calliope|Caltex Records|Camino Records|Candle In The Wind|Cannan"+
"|Cap Nash Commercial Marketing|Capitol|Capitol Catalog|Capitol Commercial Marketing|Capitol Nashvill"+
"e|Capricorn|Cargo|Carnegie Kings|Casablanca Records|Cash Money Records|Catalog - Cmg|Catalyst|Cav|Ca"+
"viant|Ced Entertainment|Celtic Heartbeat|Central Park Media|Cgf Records Inc|Chamillionaire|Charisma "+
"Catalog|Charles Street Llc|Cheeba Sounds|Cheeba Sounds Catalog|Cherry Entertainment|Chignon Records|"+
"Children|Childrens Division|Chordant Distr 3rd Party|Christy Lane|Chronicles Compilations|Chronicles"+
" Reissues|Chronicles/Psm|Chrysalis|Chuck Life|Cintas Acuario|Cirque Du Soleil|City of Hope|Cj Latin|"+
"Cky|Classics|Classics Commercial Marketing|Classics For Pleasure|Clatown Records|Clean Slate|Clear C"+
"hannel|Clockwork|Cm Angel|Cm Apple|Cm Beatles|Cm Blue Note|Cm Budget Capitol|Cm Budget Capitol Nashv"+
"ille|Cm Budget Chordant Music Group|Cm Budget Chrysalis|Cm Budget Classics|Cm Budget Curb|Cm Budget "+
"Emi|Cm Budget Emi Latin|Cm Budget Jazz|Cm Budget King Biscuit Ent|Cm Budget Narada Catalog|Cm Budget"+
" Trs|Cm Budget Virgin Catalog|Cm Cap Nash Incremental|Cm Cap Nash Ua|Cm Capitol|Cm Capitol Nahsville"+
"|Cm Charisma|Cm Chrysalis|Cm Compilations|Cm Emi|Cm Emi Classics|Cm Emi Ua|Cm Garth Brooks|Cm Java|C"+
"m Noo Trybe|Cm Orpheus|Cm Pendulum|Cm Pointblank|Cm Rap-A-Lot Distributed|Cm Sbk|Cm Seraphim|Cm Trib"+
"al|Cm Trs|Cm Trs - Buddah Catalog|Cm Trs - Jaggo Records|Cm Vernon Yard|Cm Virgin|Cmc International|"+
"Cmf/Lost Highway|Cmg|Cmg Marketing Titles One|Cmm Ruff Ryders|Coda Records|Cold Sweat|Colli Park Mus"+
"ic|Colton Pda|Columbia|Columbia/ Broadway Masterworks|Columbus Records|Coming Home|Command|Common/ K"+
"anye West|Commotion|Compass|Compilations|Concord Records, Inc.|Conifer|Contraband|Convenant|Cool Spr"+
"ings Music|Coolhunter Records|Coolsville Productions|Copacabana Records|Copperfield|Corporate Thugz "+
"Entertainment|Costa Rola|Country Music Foundation/Lost Highway|Covenant Artists|Cpm Manga|Crammed Di"+
"sc|Crash Cinema|Crazy Cat|Creative Trust Wkshp/Provident|Creative Trust Workshop|Credential|Crescent"+
" Moon/Columbia|Crescent Moon/Epic|Crime Partners|Cross Movement Records|Crowne|Crystal Lewis|Csc Ent"+
"ertainment|Ctw/ Sesame Street|Cult Epics|Curb|Curb-Wynonna|Curb/Lost Highway|Curb/Rising Tide|Curb/U"+
"niversal|Curious George|Custm/Premium|Custm/Premium - Special Mkts|Cypress|Daddy Yankee|Dagger Recor"+
"ds|Damian Music|Damon Dash Music Group|Dancing Cat|Darkchild|Das|Dascolmel, Llc|Dascolvibe, Llc|Dash"+
" Records|Dashboard Confessional|Dayspring|Daywind|Daywind Music Group|Dc Flag/Red Ink/Epic|Dcc Compa"+
"ct Classics|Death Row|Death Row Extd Catalog|Death Row Extended|Death Row Frontline|Death Row Frontl"+
"ine Catalog|Death Row Gang Rela Catalog|Death Row Records|Death Row The Chroni Catalog|Death Row/Ama"+
"ru|Debris Records|Decca|Decca Uk|Decca Us|Decon|Def Jam|Def Jam Video|Def Jam West|Def Jam/Ral Tracs"+
"|Def Soul|Def Soul Classics|Def Soul Video|Deff Trapp|Defjam|Delicious Vinyl|Delos|Dembow Music|Deno"+
"n|Derrty Entertainment|Desert Mountain Media|Desert Storm|Dexterity - Bishop Td Jakes|Dgg|Dgg Video|"+
"Dhm|Diamond Productions|Diplomatic Man|Disa|Discipline Global Mb|Discotech Media|Dispatch|Disques Vo"+
"gue|Disturbing Tha Peace Recording, Inc|Divine Industries|Dkc|Dm Music|Dmc|Dmy|Dmz|Doggystyle Record"+
"s|Doghouse|Don Omar|Donavon Frankenreitr|Double Dragon|Doxology Records|Doyle/Kos Entertainment|Dr D"+
"ream|Dramatico Entertainment Ltd.|Dream Street|Dreamworks (1)|Dreamworks (2)|Dreamworks - Sharktales"+
"|Dreamworks - Shrek Ii|Dreamworks Geffen|Dreamworks Nashville|Dreamworks Pop New|Dreamworks Tracs|Dr"+
"eamworks Urban Music|Drive|Drive Thru|Dtp Recording, Inc.|Dualstar/(Olsen Twins)|Dualtone|Duck Down "+
"Music|Dv-8 Records|Dvd International|E Pluribus Unum (1)|E Pluribus Unum (2)|E2 Music|Eagle Eye Medi"+
"a|Eagle Records|Eagle Rock|Eaglevision|East Side Digital|Easydisc|Ecm|Eddie Soundtrack|Edimal Distri"+
"bution|Edimal Music Corp|Edito Classica|Edmonds Record Group|El Cartel|Elektra|Elektra Catalog Group"+
"|Element Records|Elementree Records|Ellipsis Arts|Elton John|Elvis Tribute Project|Emd Now Joint Ven"+
"ture Projects|Emergent Music Marketing|Emi|Emi Classics|Emi Gospel Label 3rd Party|Emi Gospel Music|"+
"Emi Latin|Emi Records|Eminent|Emperor Norton|Empire Records|Emusica|Enjoy First Look|Enjoy Records|E"+
"no|Epic|Epic Soundtrax|Epic Street|Epic/ Giant Step|Epic/ No Name|Epidrome|Epitaph Records|Equal Vis"+
"ion|Equal Vision/Columbia|Equinox Music|Erato|Essence Records|Essential Classics|Eureka|Eurodisc|Eve"+
"rland|Everwhere Music|Evolution Music|Facility|Family Guy Soundtrack|Fantasy Records|Fantoma|Farmclu"+
"b/Idj|Farmclub/Interscope|Farmclub/Universal|Fast Horse|Fat Beats|Fat Boy Music|Fat Wreck Chords|Fav"+
"ored Nations|Fdm Records|Ferret Music|Ferret/Columbia|Fervent Records|Fiddler Records|Fight Klub|Fin"+
"landia|First Night Records|Flagship Recordings|Flat Town Music Company|Flavor Unit Entertainment|Fla"+
"wless|Flicker Records|Flip Records|Floodgate Records|Flora|Flowmusic|Flying Fish|Flyte Time Records|"+
"Fonanata Island Merc|Fonosound|Fonovisa|Fonovisa Inc.|Fontana A&M|Fontana A&M Hip-O|Fontana Def Jam|"+
"Fontana Geffen|Fontana Interscope|Fontana Island Rec|Fontana London U.S.|Fontana Mca|Fontana Mca/ Na"+
"sheville|Fontana Mca/ Nashville|Fontana Motown|Fontana Mt Hip-O|Fontana Poly. Atlas|Fontana Uni Reco"+
"rds|Forefront|Forefront Label|Forefront Label 3rd Party|Forster Brothers Entertainment|Four Winds|Fo"+
"xy Brown - Bad Boy|Friday Records|From Rags To Riches|From The Bottom, Inc.|Fubu|Fugitive Records|Fu"+
"rious Records|G Love and Special Sauce|G-Unit Records|Gangland Record Corp|Gangsta Advisory|Garden C"+
"ity|Garmex|Garmex Records|Garth Brooks|Gasoline Alley|Gazillion Records|Gee Street|Geffen|Geffen (Tr"+
"acs)|Geffen Catalog Transfer|Geffen Catalog Transfer (Fontana)|Geffen Goldline|Genie Ent./Lightyear|"+
"Getting Out Our Dreams(Urban)|Gfunk|Gg&L Music|Ghetto Youth Intl|Ghostlight|Giant Records|Giant-Step"+
" Records|Gili Music|Glassnote|Gma Music|Gmp Records|Gold Circle|Gold Seal|Gold Star|Golden Books|Gom"+
"er Records|Good Time Jazz|Goodfellas Entertainment|Goodnews|Gospel|Gospo Centric|Gotee Records|Gr En"+
"tertainment|Graham Colton|Grammy Nominees Proj|Grand Royal|Grand Royal Catalog|Grandstand|Granite|Gr"+
"ateful Dead Production|Grateful Dead Records|Great Performances|Green Linnet|Greenhornes|Greenhorse "+
"Records, Inc.|Grindhouse|Groovin' Records|Groovpix|Ground Zero|Group - Argentina|Group - Brazil|Grou"+
"p - Centre|Group - Chile|Group - Mexico|Group - Other|Group - Spain|Group - Usa|Group - Venezuela|Gr"+
"p|Grp (Verve)|Gts|Gts Video|Guardian Studios|Guitian|Gunz Music, Inc|Guts & Grace|H-Town Records|Hal"+
"fnote|Hall of Fame|Hammer & Lace|Hannibal|Harmony|Harmony Records|Hbo/Wea|He Is Faithful Films|Heart"+
"beat|Heartcry|Here To Him|Heretic|Hidden Beach|Hieroglyphics|High Performance|High Street|High Wire "+
"Music|Higher Octave|Higher Octave Music|Higher Octave Music Catalog|Higher Octave Music Returns|High"+
"tone Records|Hillsboro Jazz|Hip-O|Hip-O Island|Hip-O Mercury Nashville|Hip-O Motown|Hip-O Records|Hi"+
"p-O Select (Am)|Hip-O Select (Mc)|Hip-O Select (Mt)|Hip-O Select (Pg)|Hip-O Uni Roy|Hip-O Universal "+
"Tv|Hkd Productions|Hola Records|Hollywood Records|Hollywood Visa|Holy Hip Hop|Home Sweet Home|Homela"+
"nd|House of Hits|Hush|Hush/ Plg|Hybrid/Metropolitan|I Am|I.E. Music|Ice Records|Icewater|Ig Records "+
"Inc|Imaginary Road|Immediate|Immortal Records|Immortal Records Catalog|Immortal/Columbia|Immortal/Ep"+
"ic|Import Music|Impulse (Grp)|Impulse (Verve)|In De Goot, Llc|In The Loop Records|Ind 4th & B 'Way|I"+
"nd Antilles|Ind Smash|Infinity Digital|Inner Knot|Innocent|Ino (Previously M2.0 Productions)|Inpop R"+
"ecords|Insane Clown Posse|Insider Trading Corporation|Integrity Media, Inc|Integrity, Inc|Integrity/"+
"Winans|Interhit Records|International Special Mkts|Interscope|Interscope (Tracs)|Interscope - A&M|In"+
"terscope Wea|Interscope/Island|Irock Entertainment|Irs Catalog|Irs Catalog Marketing|Island|Island D"+
"ef Jam|Island Hip-O Compilations|Island Independent|Island Jamaica|Island Mercury|Island Mercury Vid"+
"eo|Island Music Video|Island Poly|Island Poly Video|Island Records|Island Super Budget|Island Vinyl|"+
"J Records|J&N|J&N Media|Jack Johnson|Jackie Greene/Dig Split|Jade Records|Jaleo Records|Java Records"+
"|Jazz & Classics|Jazz Alliance International|Jazz Alliance Intl|Jazz Commercial Marketing|Jazz-Non U"+
"s|Jb Records|Jcor|Jersey Records|Jetset|Jimmy Franks Rec Co|Jin Records|Jireh|Jive Records|Joanna Le"+
"vesque|Journey Music|Kalimba Records|Karen|Karma Guard|Karuna|Kathie Hill Music|Kedar Entertainment,"+
" Inc.|Kemado|Kgb Records|Kicking Mule|Kid Rhino Misc.|Kinetic Records|King Communications|Kiss Video"+
"|Kksf|Koai|Kom-A-Day Records|Konvict Muzik|Korn The Artists|Krasnow|Krystal/The Firm|Kung Fu Records"+
"|Kwjz|La Calle Records|La Face|Lakeshore Records|Larrinaga Records|Last Gang|Latin Catalog|Latin Pop"+
"/Tropical|Latin Regional Mexican|Latin Special Markets|Latin World|Latino Budget Prod Pr|Latino Budg"+
"et Prod Uc|Laugh.Com|Left Eye|Legacy/ Columbia|Legacy/ Epic|Liars Inc(Foodchain)|Libertad|Lideres|Li"+
"deres2|Life Records|Lightstorm|Lightyear/Zebra|Lil Man|Liquird 8 Records|Little Dog Records|Living M"+
"usic|Living Stereo|Liz Phair|Ll Cool J. Inc|Lmc Record|Locomotive Music|Logic Records|London Poly Tv"+
"|London Red Ant|London Slash|London U.S.|London Video|Longevity Records (Nyc) Inc.|Lookout|Loose Can"+
"non|Loosegroove|Loretta Lynn Van Lear Rose|Los Cangri|Lost Highway|Loud|Loud Records|Loudes 68|Luaka"+
" Bop|Luaka Bop Catalog|Lucky Dog Monument|Ludacris|Ludacris/Disturbing Tha Peace Recordings, Inc.|Lu"+
"mberjack Fs|Lumberjack Pps|Luna Music|Luna Negra|Luny Tun|Lyle Lovett|Lyric Street|M.O.B. Music|M.T."+
" Enterprises, Dba Thuy Nga's|M2.0 Inc|Mach Entertainment|Machete Music|Machine Shop Recordings|Mad D"+
"ragon|Mad Science|Mad Yacht Records|Magaritaville|Magna Carta Records Ryko|Major Label Records|Major"+
" League Baseball|Maloof Records|Mammoth|Mango|Mango Tree Records|Manhattan Records (Angel)|Manhattan"+
" Records - Catalog|Many Roads Records|Maranatha!|Marc Broussard|Marinda Grace|Martha Steward Living|"+
"Martson Recording|Mas Entertainment|Mas Flow|Masion De Soul Records|Mass Appeal Entertainment|Master"+
"works Heritage|Masterworks Portrait|Matt Nathanson|Maverick Musica|Maverick Records|Mavericks|Max Me"+
"x Records|Max Weinberg 7|Maxjazz|Maxmexrecords|Mb Recordings|Mca|Mca Cranberries|Mca Special Product"+
"|Mca Tracs|Mdi/ Johnny Cash Gh|Mega Media Records|Megaforce Records|Megamusic|Melisma|Melisma - Cata"+
"log|Melodiya|Mercury Nashville|Mercury Nashville Video|Mercury Poly Tv|Mercury Pop|Mercury Pure|Merc"+
"ury R&B|Mercury Red Ant|Mercy Cuts|Merle Haggard|Metrix Music|Metro One Records|Mhb|Mic Mac Distribu"+
"tion|Mic Media/Lyricist Lourge|Michael Burns|Mid C Media|Mighty Horn|Milan (Jade Records)|Milan Ent."+
"|Milan Records|Milestone|Militia Group|Militia/Columbia|Miller Drive Inc.|Ministry of Sound|Mjj Musi"+
"c|Mo Thugs/Ruthless|Mock & Roll|Mock & Roll L.A.|Mock & Roll Records|Mock'N'Roll|Modular Jv|Mojo|Mon"+
"do Macabre|Mono Vs Stereo|Montbello/Virgin Joint Vent|Montbello/Virgin/Jv|Moonshine Conspiracy|Mop|M"+
"orado Music|Mordam Pps|Mosaic Media Group|Mosely Music|Mosh|Motown|Motown Hip-O Compilations|Motown "+
"New|Motown Premium|Motown R&B|Motown R&B/Universal|Motown Records|Motown Super Budget|Motown Video|M"+
"otown/Polygram Latino|Motown/Universal|Mouth Almighty|Moviso|Mozote Music|Mp Records|Mr. Incognito P"+
"roductions|Msc Music Entertainment|Mtv Networks|Music For Little People|Music One|Music Works/ Tomat"+
"o|Music World Music|Muxxic Latina|Mvp Records|My Space|Myrrh|N'Focus Entertainment|N2k/Warlock|Naive"+
"|Narada Productions|Narada Productions - Catalog|Narm Records|Nas|Nas/ Sony|National Own|National Re"+
"corder|Native Records|Near Mint Label Grp|Neptunes|Nettwerk Records|Neurodisc Records|Neurodisc Reco"+
"rds Catalog|Never So Deep|New Door Records|New Haven Records|New Media|New Records|New West|Next Nex"+
"t Entertainment|Next Plateau|Nick @ Nite|Nicky Jam|Night Man Records|Nimbus|Ninth Avenue Music, Inc."+
"|Nirvana Box Set|Nitro Records|No Limit Catalog|No Limit Extd Catalog|No Limit Extended|No Limit New"+
" Release|No Limit New Release Catalog|No Limit Records|Nonesuch|Noo Trybe|Noo Trybe Catalog|Noo Tryb"+
"e Catalogh|Noo Trybe Com Mkt|Noo Trybe Com Mktg Catalog|Noo Trybe Comm Mkt|Noontime|Noshame|Nothing "+
"Records|Novus|Novus Ordo|Now|Now 11|Now 13|Now 16|Now 20|Now 3|Now 4|Now 9|Now Christmas|Now Joint V"+
"enture|Npg Records|Npg Records (Prince)|Nu American Music|Nu Opp|Nu Tech|Nuendo Music Group|Nutone R"+
"ecords|Ny:La Music Inc|Octjay Records|Octone Records|Ode|Odyssey|Odyssey In Minds Eye|Oh Boy|Okeh|Ol"+
"e|Omni Records|On Point|One Label Llc|One Life One Love|Or Music|Orfeon|Organic Music, Llc|Organized"+
" Noise|Original Jazz Classics|Oro Musical|Orphanage|Orpheus|Other Distributed|Other Pop|Outburst Rec"+
"ords|Outlook Music|Outpost|Overall Records|Overbrook Music|P & A Records|P&A|P.A.L.|Pablo|Pakaderm|P"+
"allas Records|Palm Records|Palo Duro Records|Pangaea|Panik House Ent.|Parlophone|Pclc|Pclc Capricorn"+
"|Penalty Recordings (Ryko)|Perfect Image|Perspective|Philadelphia International Rec|Philips|Philips "+
"Video|Philo|Pimienta Records|Pimpking Music|Pina Records|Pinnacle Records|Pioneer|Platano Records|Pl"+
"atia Ent/New River Music|Platino Records|Platino/Fonovisa|Platinum|Player's Club|Point Music|Point o"+
"f Grace|Pointblank|Pointblank Catalog|Poly Tv|Poly Tv (Def Jam)|Poly Tv (Island)|Poly Tv (Motown)|Po"+
"ly/Atlas|Poly/Atlas Video|Polybeat Records|Polydor|Polydor Country|Polydor Country Video|Polydor/Pol"+
"ygram Latino|Polymedia|Portrait|Ppl Entertainment Group, Inc|Pra Records|Praise Gathering|Prawn Song"+
"|Premier Entertainment|Premium|Premium Latin|Prestige|Priority Frontline Catalog|Priority Special Ma"+
"rkets|Priority Special Mkts Catalog|Prisma|Private Music|Procan|Proclaim|Proper|Prorey|Prority|Prost"+
"hetic Records|Protel|Psm Records|Psychopathic Records|Punk Core|Pure Records|Pure Springs Music|Purp"+
"le Ribbon Entertainment|Push Records|Pussycat Dolls Jv|Pyramid|Pyramid Media|Pyramid Media Group|Q&W"+
"|Quango Records|Queen Latifah|Quiet Storm Records|Quinlan Road Ent.|Qwest Records|R.A.L.|R.A.L. Vide"+
"o|Radio Universal|Radioactive Records|Rainman|Ramex|Random House|Rap A Lot 2k Records|Rap A Lot Virg"+
"in Catalog|Rap-A-Lot|Rap-A-Lot 2k Records|Rap-A-Lot Dist. Catalog|Rap-A-Lot Distributed|Rap-A-Lot Vi"+
"rgin Catalog|Rasheeda|Rawkus Entertainment|Rawkus Records|Ray Boltz Music|Ray Boltz Spindust|Razor &"+
" Tie|Razor & Tie Direct|Razor & Tie Label|Razor Sharp|Rb Entertainment|Rca Records|Rca Records Nashv"+
"ille|Rca Special Products|Rca Victor|Rcc Records|Re: Think|Real Music|Real World - Catalog|Real Worl"+
"d Records|Rebel Records|Rebound Records|Red Ant|Red Boy Records|Red Dance/Epic|Red Dance/Sony Japan|"+
"Red Hot Organization|Red Ink/Atc|Red Ink/Epic|Red Ink/Pias|Red Ink/Smi Two Tier|Red Ink/Smi –Belguiu"+
"m|Red Ink/Trust Kill|Red Seal|Red Sky Entertainment|Red Star|Refuge Records|Reincarnate Music|Rejoic"+
"e|Relapse Records|Rendezvous|Reprise|Reserved|Resound|Respek Records|Restless Records|Reunion|Revill"+
"e (Nashville Star)|Rhino|Rhino Classical|Rhino P&D|Rhino Records|Rhino Video|Rhino Video/ Rhino|Rhin"+
"o-Sire|Rhino/Warner Bros.|Rhyme Syndicate Catalog|Rhythm Safari|Rica Songs For Life|Rick Rubin Enter"+
"tainment|Rifkind Entertainment|Right Minded Records|Rising Tide Nashville|Risky Business|Riverbend|R"+
"iverside|Rmm|Rmm Records|Roadrunner Records Inc.|Robbins Entertainment|Roc A Fella Catalog|Roc La Fa"+
"milia|Roc-A-Fella Records|Roc-A-Fella Shawn C|Roc-A-Fella Video|Rocket Records|Rocketown Records|Roc"+
"kstar Games|Rockview Records|Rodven|Rodven (Intl)|Rodven/Prodiscos|Rodven/Quality Rec|Rodven/Tejano "+
"Discos|Rodven/United Prod|Ron Smith|Rough Ryders Records|Rough Trade|Roughtrade|Rounder|Rowdy Record"+
"s Diary of A Mad Black Woman|Rpm / Legacy|Rpm/ Columbia|Ruff Ryders|Ruffhouse|Ruffhouse Records/ Ovu"+
"m|Ruffhouse Records/ Roc-A-Bloc|Ruffnation Music|Rufftown Ent.|Rust Records|Ruthless Records|Rx Reco"+
"rds|Ryan & Joey, Inc.|Rykodisc|S-Curve Records - Capitol|S-Curve Records - Emi|S-Curve Records Capit"+
"ol|S-Curve Records Catalog|S-Curve Records Distributed|S-Curve Records Emi|S-Curve Records Virgin|S-"+
"Curve(1) Records Distributed|Sai Records|Saja Records|Sambora|Samplers|Sanctuary|Savoy|Savoy Jazz|Sa"+
"voy Label Group|Scratchie|Sea Creatures|Sea Records|Seaview|Secret Mountain|Secret Sun Recordings|Se"+
"ga|Seiko Matsuda|Seismic Records|Selah|Seon|Serca Music|Serjical Strike|Seven|Sfjazz|Sgz Records|Sha"+
"dy Records|Shakti|Shakti - Catalog|Shamton Records|Shang|Shawn Carter|Shelter Records|Sheppard Lane "+
"Music|Shout! Factory|Show Dog|Shrapnel Records|Sick Wid It|Side One Dummy|Silas|Silent Giant|Silver "+
"Seal|Silvertone|Silverwave|Simplyred.Com|Sindrome Records|Sir George Records|Sire Record Group|Sixst"+
"eps|Skaggs Family Records|Skanless Records|Skyblaze|Skyblaze/Columbia|Slamm Dunk|Slash Distributed|S"+
"lash Warner|Slim Thug/Star Trak|Slip & Slide Records|Slipdisc|Smash|Smashing Pumpkins Catalog|Smith "+
"Music Group|Smithonian/Folkways|Smv|Snoop Bossin' Up Dvd|Snoop Dogg 40/40/20|Snoop Dogg 50/50|Snoop "+
"Dvd- Bossin' Up|So So Def Records|So So Def/ All Out Entertainment|Software Sculptors|Solid State Re"+
"cords|Sonique|Sony Bmg|Sony Broadway|Sony Classical|Sony Classical/ Sony Music Soundtrax|Sony Direct"+
"|Sony Discos|Sony Labels|Sony Masterworks|Sony Music Special Products|Sony Music Works|Sony Portrait"+
"|Sony Wonder|Sonybmg|Sonybmg U.S. Latin|Sought After Entertainment|Soulife Records|Soulwerkz|Sound G"+
"izmo|Sound Mex|Sound of Atlanta|Southern Signal Records|Sparrow|Sparrow Distributed 3rd Party Label|"+
"Sparrow Kids|Special Markets|Special Olympics|Special Olympics 4|Special Products|Specialty Records|"+
"Spin Art|Spirit Soundtrack|Spit Records|Spring Hill Music|Spring House|Sprout|Spv Records|Squint Ent"+
"ertainment|Star Search|Star Song|Star Time International|Star Trak Records|Stars + Stripes, Inc.|Sta"+
"rtime P&D|Startime Ps|Stax|Stolen Transmission, Llc|Stonecreek|Straight Face Records, Inc.|Straight "+
"Outta Labb|Straight Profit|Straight Profit Records|Straightway|Stretch Music|Stuart Hersch|Studio E "+
"Group|Suave House Ii|Suave Records|Sub City Records|Subversive Cinema|Sucka Free Records|Sugar Beats"+
"|Sugar Water|Sunnyside|Super Ego Records|Surco New|Surco Records|Surrender Records|Sustain Records, "+
"Llc|Swallow Records|Sybersound Records|Synapse Films|T-Town Music|T.J. Martell|Taang|Tabu Records|Ta"+
"koma|Talent Beach|Tanya Tucker|Tanya Tucker Distributed|Taseis|Teldec|Telethon|Tell It Productions|T"+
"erra|The Bravery|The Franchise/Interscope|The Inc.|The Mainstream Records Group Inc.|The Neptunes|Th"+
"e Platform Group, Llc|The Road To Eldorado|The Safe Side|The Source|The Start/The Label|The Ultimate"+
" Group, Inc.|The Wall|Thirsty Ear|Three Keys/Lightyear|Three Kings Dbc|Thrive Records|Thump Records|"+
"Tim Kerr|Tim Kerr New|Timbaland|Time Bomb|Time Home Entertainment|Time/Life|Time/Life Non Music Vide"+
"o|Titan Global|Toby Keith Last Lp|Tofu – Sony Japan|Tone Cool|Toni Braxton|Toonacious|Tooth & Nail|T"+
"ooth & Nail Cmg|Tooth & Nail Emi|Top Dawg Productions|Top Sail Productions|Toros Records|Track Facto"+
"ry|Trackmasters|Tradition|Traditional Records|Trauma Entertainment|Trauma Records|Travio Records|Tra"+
"vio Records P&D|Treat & Release|Trill Ent/Asylum|Triloka|Triple Crown|Troma|Troubadour|Trudy Greene|"+
"Trumpet Swan/ Lightyear|Trust Kill|Trustkill/Red Ink/Epic|Tuff Gong|Tuff Gong Records|Twins|Twism|Tw"+
"isted|Two Tomatoes|Tyler Perry, Inc.|Type A Records|U.S. Reissues|Ufocity.Cm|Ultimate Records|Ume #1"+
"'s|Ume Direct|Ume Premium (Am Admin)|Ume Premium (Mt Admin)|Umi Fontana|Undaground Recodz|Undefined|"+
"Underground Distributed Label|Underground Inc.|Union Music|Unison|United For Opportunity|Unitone|Uni"+
"versal|Universal Latino|Universal Music Canada|Universal Music Group|Universal Music Latino|Universa"+
"l Records|Universal Records New|Universal South|University Mg Dist|University Music|University Music"+
" Group|Univision|Univoces|Unsigned Hype|Untertainment|Up Above Records|Upstairs|Upstart|Uptown Recor"+
"ds -Urc|Urban Box Office|Us Manga|Utv Motwon|V2|V2 (Gee Street/Push Records/Delicious Vinyl)|V2/Push"+
"|Vagrant Records|Vagrant Records (Tvt)|Van Richter Records|Varese Sarabande|Varrick|Velocette Record"+
"s|Velour Recordings|Venemusic|Venevision|Verity|Verve|Verve Forecast|Verve Video|Vi Music|Vi Records"+
"|Victory|Victory Music|Victory Records|Victrola|Vidal Investment|Vineyard|Vintage Home Entertainment"+
"|Violator Records|Virgin|Virgin Catalog|Virgin Classics|Virgin Commercial Marketing|Virgin Special P"+
"rojects|Virgin Special Projects Catalog|Virtual Label|Visigoth|Vital|Viva Discos|Vivarte|Vivaton Rec"+
"ords|Voice For Music Production, Inc.|Volcano Ii|Volcano Iii|Volcom|Vox Lumania|Vp Music Richter Rec"+
"ords|Vp Records|Wacky World Studios|Walleska Serra|Walt Disney Records|Waltzing Bear|Wanna Blow, Inc"+
".|Warcon Entertainment, Llc|Warlock|Warner Alliance|Warner Bros.|Warner Bros./Elektra|Warner Brother"+
"s Publications|Warner Classics|Warner Fonit|Warner Home Video|Warner Jazz France/ Wsm|Warner Music L"+
"atina|Warner/Reprise Video|Wax Weinberg 7|Wbr/Rhino Direct|Wea|Wea Latina|Weacaribe|Weamex|Weapons o"+
"f Mass Entertainment|Weeds|Wet Cement|White Lion|Whitsett Hill|Whv/Lightyear|Wicklow|Will Smith|Wind"+
"-Up (Grass/Surefire)|Windham Hill|Winedark Records|Wjjz|Wnua|Wonder Boy Entertainment|Wonderland|Woo"+
"dstock|Word Entertainment|Word Special Projects|Word/Warner Bros.|Work|Worksong/Rhino/Hear Music|Wor"+
"ld Music Network|Worship Together|Wow Joint Venture|Wrechshop Records|Wrong Records|Ws/De Stijl|Wu M"+
"usic Group|Wu Tang Records Catalog|Wu-Tang Records|Wu-Tang Records Catalog|Wyatt|Wyonna|Xso Drive|Ya"+
"b Yum/ 550|Yash Raj Films Usa Inc.|Yclef Records|Yo! Mtv Raps|Z Records|Zappa|Zappa Rhino|Zebra/Ligh"+
"tyear|Zero Hour|Zoe|Zomba/Def Jam").split("|");

	badguys["MPAA Member"] = String(''+
"20th Century Fox|20th Century Fox Animation|20th Century Fox Home Entertainment|20th Century Fox Tel"+
"evision|Adelaide Productions|Adult Swim|American International Pictures|Animax|Axn|Barry & Enright P"+
"roductions|Blue Sky Studios|Bob Stewart Productions|Boomerang|Buena Vista|Buena Vista Home Entertain"+
"ment|Cartoon Network|Cartoon Network (Uk)|Cartoon Network Studios|Cartoon Network Too|Castle Rock En"+
"tertainment|Chuck Barris Productions|Columbia Pictures|Columbia Tristar|Dark Castle Entertainment|Dc"+
" Comics|Dreamworks|Dreamworks Home Ent|Dreamworks Home Ent.|Dreamworks Home Entertainment|Filmways|F"+
"ox|Fox Searchlight Pictures|Fox Studios Australia|Fox Studios Baja|Fox Television Studios|Foxvideo|G"+
"ame Show Network|Gametap|Go Fish Pictures|Grouper Networks|Heatter-Quigley Productions|Hollywood Pic"+
"tures|Hollywood Pictures Home Video|Merv Griffin Entertainment|Metro-Goldwyn-Mayer|Metro-Goldwyn-May"+
"er Animation|Mgm|Mgm Home Ent. (Europe) Ltd.|Mgm Home Entertainment|Mgm Interactive|Mgm Networks|Mgm"+
" Television|Mgm Worldwide Television|Miramax|Miramax Family Films|Miramax Films|Motion Picture Corpo"+
"ration of America|Movielink|Orion Pictures|Paramount|Paramount Classics|Paramount Home Entertainment"+
"|Paramount Home Entertainment (Uk)|Pixar Animation Studios|Pogo|Republic Pictures|Screen Gems|Screen"+
"blast|Soapcity|Sony Online Entertainment|Sony Pictures|Sony Pictures Animation|Sony Pictures Classic"+
"s|Sony Pictures Consumer Products|Sony Pictures Digital|Sony Pictures Digital Networks|Sony Pictures"+
" Family Entertainment Group|Sony Pictures Home Ent. Uk|Sony Pictures Home Entertainment|Sony Picture"+
"s Imageworks|Sony Pictures Mobile|Sony Pictures Network|Sony Pictures Studios|Sony Pictures Televisi"+
"on|Sony Pictures Television International|Sony Station|Soul Cinema|Spin|Streamline Pictures|Tbs|Tcm "+
"2|The Cw|The Samuel Goldwyn Company|The Wb|Tnt|Tnt Latin America|Toonami (Uk)|Touchstone Pictures|Tr"+
"istar Pictures|Triumph Films|Turner Classic Movies|Turner Entertainment|Turner Field|United Artists|"+
"United International Pictures|Universal|Universal Home Entertainment|Universal Pictures|Universal Pi"+
"ctures Video|Walt Disney|Walt Disney Feature Animation|Walt Disney Home Video|Walt Disney Pictures|W"+
"alt Disney Studios|Warner|Warner Animation|Warner Bros. Animation|Warner Bros. Entertainment|Warner "+
"Bros. Pictures|Warner Bros. Television|Warner Bros. Television Distribution|Warner Home Video|Warner"+
" Independent Pictures|Warner Pictures|Warner Television|Williams Street|Wtbs").split("|");

	badguys["BPI Member"] = String(''+
"1 Records|33 Rpm Ltd|7 World Music Ltd|7digital Media Ltd|A+E Records Ltd|A2 Records|A3 Music|Abunda"+
"nt Life Recording & Entertainment Co. Ltd|Ace Records Ltd|Acrobat Musicsltd|Adasam Ltd|Adventure Rec"+
"ords Ltd|Aegon Uk|Alamo Music Ltd|Albert Productions|All Around The World Productions Ltd|Angel Air "+
"Records|Angelic Music Ltd|Apollo Sound|Apple Corps Ltd|Aquarian Nation|Aqui Entertainment Ltd|Ariwa "+
"Sounds Ltd|Ashika|Asia Tv Ltd|Atlantic Uk Ltd|Awakening Records|Award Records|Back2forward Records|B"+
"ailey Promotions Ltd|Baker Tilly|Baseline Records|Beat Goes On Records|Beulah|Beyond Reality Music L"+
"td|Beyond The Sea Ltd|Big Bear Records|Blackrose Projects|Blueprint Software Ltd|Bmp - Broken Music "+
"Publishing (Uk) Ltd|Boss Music|Box Music Ltd|Brazen Records Ltd|Brewhouse Music|Bright New Day Recor"+
"ds Ltd|Brixton Urban Collective Ltd|Bronze Records Ltd|Brown Moose Ltd|Bt Retail|Bucks Music Group|B"+
"ut! Records|Buttercuts Ltd|Cake Group Ltd|Capital Music Uk Ltd|Capitol Music Uk|Caritas Records|Cent"+
" Records Ltd|Chandos Records Ltd|Cherry Red Records Ltd|Chevstar Records|Chrysalis Group Plc|Circle "+
"Records Ltd|Clear Sound and Vision|Coda Distribution Ltd|Collegium Records|Columbia Publishing Wales"+
" Ltd|Compadres In Chaos Ltd|Concept Holdings Ltd|Congo Music Ltd|Copyright Group|Coutts & Co|Crash R"+
"ecords|Creative Media Celebrity Production Ltd|D I Music|Da Recordings Ltd|Dave Clark International|"+
"Declan Colgan Music Ltd|Deeper Substance Ltd|Delta Music Plc|Deluxe Global Media Services|Demolition"+
" Records Ltd|Demon Music Group Ltd|Digitize Ventures Ltd|Disky Communications Ltd|Divine Art Ltd|Div"+
"ing Duck Recordings|Djm Ltd|Docdata Uk Ltd|Dorado Records Ltd|Dorigen Music Ltd|Dramatico Ltd|Dt Pro"+
"ductions Limited|Dulcima Records|Dutton Laboratories Ltd|E3 Records|Eagle Rock Entertainment Ltd|Ear"+
" Candy Records Ltd|Edj Records|Effin Records|Eg Records Ltd|Electromode Music Ltd|Elegian Records Lt"+
"d|Emi|Emi Music Uk & Ireland|Emi Records Ltd|Enterprise Records|Entertainment Media Research Ltd|Ero"+
"s International Ltd|Essential Music Group|Estaloka Music Ltd|Evangeline Records Ltd|Everyday Records"+
"|Fdm Records Ltd|Feeler-Head Records|Fiction Records Ltd|First Night Records Ltd|Flair Records|Folk "+
"Heritage|Foxy Records Ltd|Free2air Recordings|Freudiana Records Ltd|Fruit Pie Records|Furry Tongue R"+
"ecords|Gimell Records|Glasgow Records Ltd|Glasshouse Productions Ltd|Global Musik|Global Talent Grou"+
"p|Gold Mansion Records|Goldman Sachs International|Gotham Records|Gottdiscs Ltd|Gps Music Uk|Gramoph"+
"one Publications Ltd|Grand Avenue Music|Green Dragon Media Ltd|Green Pepper Junction|Greenroom Digit"+
"al|Greensleeves Records Ltd|Greentrax Recordings Ltd|Gridlockaz|Gronland Ltd|Halo Uk Records|Handlem"+
"an Uk Ltd|Harmonia Mundi (Uk) Ltd|Harmony Depot Records|Headroom Records Ltd|Hec Ltd|Hermanex Ltd|Hi"+
"ghnote Ltd|Hit Mania|Hollywood On Air|Homechoice|Honey Records Ltd|Hooj Choons|Horus Music|Hospital "+
"Records Ltd|Hux Records Ltd|Hyperion Records Ltd|Immtech|Independent Masters Ltd|Independiente|Inigo"+
" Recordings Ltd|Instant Karma Ltd|Invisible Hands Music|Island Universal Records Ltd|Jam Central Rec"+
"ords|Jedbrah Music|Jfc Records/Method Recordings Ltd|Jive Records|Junk Tv|Jusic International|K-Tel "+
"Entertainment (Uk) Ltd|Kamlee Records Ltd|Kickin Music Ltd|Kinetix|Kiss Records|Kizmet Records Uk Lt"+
"d|Krl|Kudos Records Ltd|Labrador Records|Landor Records Ltd|Levelsound Music Ltd|Liberty Bell Produc"+
"tions Ltd|Linn Records Ltd|Lobster Pot Records|Lock|Logic/Bmg|London Symphony Orchestra Ltd|Loving M"+
"onkey Productions Ltd|Lyrita Recorded Edition|Macrovision Uksltd|Madam Music Ltd|Madison Management|"+
"Maestro Music Entertainment|Magnet Records Ltd|Marathon Mediasinternational|Marionet Records|Market "+
"Square Music Ltd|Measured Records Ltd|Meem Music|Megabop Records Ltd|Mercury Records|Merrion Capital"+
" Group|Merrion Stockbrokers|Metronome Recordings Ltd|Milestone Design Services Ltd|Militant Entertai"+
"nment Ltd|Mohican Records Ltd|Monstermob Group Plc|Moshi Moshi Records Ltd|Most Records Ltd|Moviebox"+
" Birmingham Ltd|Moyst Music Ltd|Mpl Communications Ltd|Multiverse Ltd|Music Company (London) Ltd|Mus"+
"ic Factory Entertainment Group|Music Mercia|Music of Life|Music West Midlands|Muze Europe|Mvine Ltd|"+
"Mvls Records Ltd|Nachural Records|Napster Uk Ltd|National Geographic Channel|Nervous Records|New Wor"+
"ld Music Ltd|Nmc Recordings Ltd|Nokia Uk|Nomadic Music Ltd|Nomura International|Nova Sales and Distr"+
"ibution (Uk) Ltd|Nuff Music Ltd|Od2 Ltd|Ofw Entertainment|On Board Records|On The Run Productions|On"+
"e Fifteen Ltd|One Media Publishing Ltd|One Nation Exports Ltd|One Records|Oriental Star Agencies Ltd"+
"|Osmosis (Uk) Reords Ltd|Outer Recordings Ltd|Paradise Music|Pavilion Records Ltd|Pete Waterman Ltd|"+
"Pickwick Group Ltd|Pinnacle Entertainment|Plastic Head Records|Playbox Media Ltd|Pollytone Records|P"+
"olo Records|Polydor Records|Polyphonic Reproductions Ltd|Portalspace Records Ltd|Positive Thinking|P"+
"ower Records|President Records Ltd|Prism Leisure Corporation Plc|Proper Music Distribution Ltd|Pure "+
"Mint Recordings Ltd|Radio Computing Services Uk Ltd|Real Networks Ltd|Really Useful Records|Realtone"+
" Records Ltd|Recordstore.Co.Uk|Red Kite Records Ltd|Replay Music|Retrospective Recordings|Revolver M"+
"usic Ltd|Riverside Records Ltd|Roadrunner Records Ltd|Rock Action Records|Rolling Cube Records Ltd|R"+
"osc Records Ltd|Rsk Entertainment Ltd|Rubicon Records|Ruffa Lane Ltd|Rumour Records Ltd|Sadler Dale "+
"Records|Safesell Ltd|Sanctuary Records Group|Saregama Plc|Sbi Global Limited|Scottish Widows|Secret "+
"Records Ltd|Select Music & Video Distribution Ltd|Send The Light Ltd|Seven Things I Daren't Express "+
"Ltd|Shalit Global Music Ltd|Signum Records|Silva Screen Records|Silver Streak Records Ltd|Silvertone"+
" Records|Silverwood Music Group|Simplyred.Com Ltd|Six Thirty Records Ltd|Skandia|Snapper Music Plc|S"+
"omm Recordings|Songphonic Records Ltd|Sonic Vista Recordings Ltd|Sony Bmg|Sony Bmg Music Entertainme"+
"nt (Uk) Ltd|Sonybmg|Sos Records|Sounds Scary Ltd|Spark Worldwide Ltd|Split Records Ltd|Squeaky Recor"+
"ds Ltd|State 51|State Records Ltd|Steve Marriott Licensing Ltd|Stillwater Ltd|Stream|Streamline Musi"+
"c Ltd|Suburban Soul (Music) Ltd|Sunday Best Recordings|Survival Records Ltd|Swinglehurst Ltd|Symposi"+
"um Records|Tantrum Records|Tbrl Music|Tema Internationalsltd|Ten (The Entertainment Network)|That's "+
"Entertainment Recordssltd|The Bacon Empire Publishing Ltd|The Bank|The Carphone Warehouse|The Data B"+
"usiness Ltd|The Decca Music Group|The Flying Music Group Ltd|The Independent Record Company|The Orch"+
"ard|The Product Exchange Ltd|The Sixteen Productions Ltd|The Sound Foundation|The Storm Petrels|The "+
"Wye Record Company|The24 Ltd|There's A Riot Going Ons(Targo)|Thunderclap Ltd|Tip Top Video|Tko Licen"+
"sing Ltd|Toolroom Productions Ltd|Touchwood Records|Trinity Record Company Ltd|Triple A Records Ltd|"+
"Tsyt Music Ltd|Tunetribe|Twopointnine Ltd|U-Myx Ltd|Ubs|Underdogg Entertainment Ltd|Unicorn-Kanchana"+
" Records|Union Square Music Ltd|United Creative Arts (Uca)|Universal|Universal Music (Uk) Ltd|Untouc"+
"hables Records|Upbeat Recordings|Urban Precinct|V2 Music Ltd|Vantis Numerica|Vidzone Digital Media|V"+
"ip Records|Virgin Records|Vital Sales and Marketing Ltd|Wandering Star Records Ltd|Warner Bros Recor"+
"ds Uk|Warner Music (Uk) Ltd|Wea|Wea/London Records|Welsh Music Foundation Ltd|Wgic|Whatmusic Holding"+
"s|White Room Records Ltd|Wicked Records (Wales) Ltd|Wigmore Hall|Wildcard Records|Wildstar Records L"+
"td|Windsong International|Witchwood Media Ltd|Wooden Hill Recordings Ltd|Wot Records|Wurdamouth Reco"+
"rds Ltd|Wyastone Estate Ltd|Xkman.Com Ltd|Yahoo! Music|Yash Raj Films International Ltd|Yourrelease "+
"Ltd (Yr Media)|Zomba Records Ltd|Ztt Records Ltd").split("|");

	badguys["FACT Member"] = String(''+
"20th Century Fox|20th Century Fox Home Ent.|20th Century Fox Home Entertainment|Applied Optical Tech"+
"nologies|Ascent|Ascent Media Group|Ascent Media Group Ltd|Bbc|Blockbuster|British Broadcasting Corpo"+
"ration (Bbc)|British Sky Broadcasting|Bskyb|Buena Vista|Buena Vista Home Entertainment|Cea|Cinema Ex"+
"hibitors|Cinema Exhibitors Ass (Cea)|Cinram|Deluxe Film Services|Deluxe Laboratories|Deluxe Laborato"+
"ries Ltd|Deluxe Video Services|Dhl|Entertainment In Video|Filmbank|Granada Ventures|Macrovision|Metr"+
"o Goldwyn Meyer|Metro Goldwyn Meyer (M.G.M.)|Mgm|Mgm Home Ent. (Europe) Ltd.|Momentum Pictures|Momen"+
"tum Pictures Home Ent|Motion Picture Licensing Company|Motion Picture Licensing Company (Internation"+
"al) Ltd|Moving Print Distribution|Moving Print Distribution Ltd|Paramount|Pathé Film Distribution|Pr"+
"ism Leisure|Prism Leisure Corp. Plc|Sony Pictures|Sony Pictures Home Ent. Uk|Technicolor|United Arti"+
"sts Corp|United International Pictures|Universal|Universal Pictures|Universal Pictures Video|Univers"+
"al Video|V.H.S. Distribution|Vci|Vhs Distribution|Video Collection International|Video Collection In"+
"ternational (Vci)|Warner Brothers").split("|");

	messages = new Array("Money spent of this item will be used to develop systems designed to restrict your freedom.",
"Money spent on this item will be used to change laws in your country with the intention of restricting your freedom.",
"Money spent on this item will be used to pay lawyers to drag innocent people through court.",
"Money spent on this item will be used to pay for campaigns intended to terrorise consumers.",
"Money spent on this item will be used to limit the development of new technologies.",
"Buying this item will limit your freedom.",
"Money spent on this item will be used to persecute artists trying to build on existing culture.",
"Money spent on this item will be used by the music and movie industries to tighten their hold on our culture by lobbying to extend copyrights.",
"By purchasing this item you will be encouraging capricious litigation against people incapable of defending themselves.",
"Money spent on this item will be used to force other countries into compliance with so-called Intellectual Property standards regardless of their own position.");
}