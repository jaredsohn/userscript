// ==UserScript==
// @name           Download SurfTheChannel videos
// @namespace      tag:brainonfire.net,2008-06-14:stcdownload
// @description    Decrypts the SurfTheChannel video source and adds a download link to the sidebar. This script is extremely powerful, and will contact an external keyserver whenever it discovers a movie it cannot download. The keyserver will generate a new userscript for you to download. Generally works for the Movies and TV sections, but content hosted by YouKu won't be downloadable.
// @include        http://www.surfthechannel.com/*
// @include        http://surfthechannel.com/*
// @version        1.3.0
// @changelog      Since 1.2: Fix bug that caused Part-finding to fail on first part.
// ==/UserScript==

var stcd =
{
	version: '1.0',
	srv: 'http://phyzomebox.no-ip.info/stc/unknown-skin.php'
};


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

/** Put a big ol' fail message at the top of the page */
function failMessage(msg)
{
	var failBar = document.createElement('p');
	failBar.appendChild(document.createTextNode('Userscript failure: '+msg));
	failBar.setAttribute('style', 'color: white; background-color: red; padding: 0.3em 0.6em; margin: 0; font-weight: bold; border: 3px solid white');
	document.body.insertBefore(failBar, document.body.firstChild);
	return;
}


//harvest data
var embed = $xpath('//div[@id="flashcontent2"]/embed[starts-with(@flashvars, "input_str=")]');

if(embed.length !== 1)
	return;

embed = embed[0];
var flashvars = embed.getAttribute('flashvars');

//check key DB
//setup constants
var knownSkins =
{
	'1':
	[
		'53245346354634563247123YjQ1ZTc1OTI5OT401823741237409812734083428034532828928384944213412344',
		'1234123412735723450982734509827345982345OT3748102349871230489712304987059823405981233848848392983829204982310948234059823450982345',
		'841239048809809809238409309109108123478901234jEjdQjd71230497123047123409871230498712309487120938471029347810982374292890820938120495994928393810991928384'
	],

	'2':
	[
		'1349834568902348908903456ASdfed890345890245892345890345689034568903428901328902463890435679Fdsa083456890dfsafsqt434',
		'123345358931942135asdrq325jqwer231451kl23412341452334528925436jk436264536jk345l3345233245k456813458903145803245',
		'345895468903458903428902348D9435895489456897453897342789234187912378934789578945789435asdD78931247S892789asdsFGfs0231589071258790236407892657089'
	],

	'3':
	[
		'23988905348903451890456298071345908342689045678905627890234607893457809342576324789025634780923457890256789023adgs780gfeqw7890qtag78DSA52345ASee',
		'284328248902435890234890453893548902345890354890158901238902634789026347894358715437890325708914537809623478092564asdfagAase355387903245',
		'34129842378931204798345702124986984647890341252346579193758342658347981587749023487509234978523704895723045897s348907adsf9087a39873'
	],

	'4':
	[
		'3952437890346570923470913527890249078460789534680792436078934527890236478904356SDrtwsdfgsfgd234782347247809245378092345780243578093123424278',
		'53764972809567513208957240695730198740342761019237852039847590234875019837528340572345292107895340798',
		'5346890312306543778347890462323470580791237089153279082346780623479081345780912358914570894367890457890340789342675089235'
	],

	'5':
	[
		'2378902345780234582d34578902g3G4578DS9023478902345790832456789123679812367893451689asd7153g467985123679159678145678943678923456789061567157689253678925',
		'26746137029347230459870948752010347202349750430985723049572108074570237453892475098275097543059872523845029381890234857097',
		'1273408917234097145234asfa52345723490578234059732405987dfsa09874350987as0d9f78097843205897203489752038947509283475098712048971203894'
	],

	'6':
	[
		'5324j65745768567435257097142098rf07af8130298742078f0asd7f137490982743013927409351234jklq5h4243hkl52hj345kjl2345jkl23h4lj5kh1l2khj34123lkh',
		'326746759665764634512334895456726435133j52h54hjl3456hlj4567hjlk312klhj1234ghjk1234ghjkbm2345b34263745674356523412',
		'4643458l657j736l234kj3142kjh534hlkjh847lk3j45h123lkhj41lkj4h5354l7kh56h96789hj80764573645213245234634564575456756523142354345623wel4jhk13253457456763454353124535474565343456345'
	],

	'7':
	[
		'435253765049678523019583245345h2435123412kl412564576547623542536658780789845kj647756734573457890243790823434270527347503701430746adf1234712389',
		'f24634h7jkl342jh42453455436kjlhgsdfthj456234kl5jhtadlflv3245357456jl7j234l5134123hjk4h326456jkl2345hj234kj5h',
		'j65k34l53125flv3452351234kjh1234123j4j123jgh45675768234534746573241514324flv3452345234512433456j15314324'
	],

	'8':
	[
		'645776324157890234578092347081235708923147809123789afds789035278903217844783flv128231812382345',
		'54675644536345789043789053467089523478901234789454678342324flv3874123902arsdf34127839041234',
		'4657362132475677354412348970as78979fdas7890789014327890a7890sdfa7089as70df70flv132741209384123894'
	],

	'9':
	[
		'2761758091537890263470893524780912347809132789fa78901342781427890312478903412781flv12381238341289123891428038041023adfs38094123',
		'373564789345892351840987fds1234708912347891209348flv12347982340673240894342789026347098123789031247890234170892347890flv324523',
		'324758310912347012937f7as0d9785412370470238478189g73174890123748912flv13241874905498753412347896435987456x43252345'
	],

	'10':
	[
		'r2381490fasd890r3091248490q8230958adsf890358490123849130289412394890flv374123984712983472834967523918423894a9sdf97834127894',
		'312472378490230189237r7098670893456789037908123478913flv34123784901237423405789w7asd87913879014',
		'32453238724589z890fsad7089q34590812377r90flv7324890138as0df7089531428479123794'
	],

	'13':
	[
		'wrucasachechachusechevetaphekasewrujethesafranapechawepEcrecatru',
		'YAqazetHuspaYUgawreCruxuHatHAdePhaTHEJuprephaBasPebabrUZusubUhax',
		'yequQAqabaNujeweDEswukayasaDRuJespuduspASavupasegAnuqatuvuquxuva'
	],

	'12':
	[
		'trustedrafrecraDruchakecHepRuyachEcafejeprudRuBrutredrUvucruSast',
		'dreGuraSpemunuPunexANuhevAbRUxequpuCRukUSWuPhuFrewArakuTruwaDRec',
		'yuhecraTebrayanaspathuswechemepaGAPhUdunuQEFAdaqaSpuFapHuxaYemAc'
	],

	'15':
	[
		'TaswaPReXefePhuwubabrusweWruChedRepraTHeNuyeyUtutejAtHepAjeterAc',
		'cHujeswArevuzubrezUdEswePaPhexefAwrUceDutrUfrusathatranuwrEHewre',
		'wuspUPhujafakuteFufuvaWrugespaZaspuPracrequspamaraswufuvevupruwe'
	],

	'11':
	[
		'HatuFuswecruspuspupreZERaxUtrEdREpHaGavagebunahaqeFesumawREPrutR',
		'mAprucufrayAXuvepRuwucredRusezeBrezathaspachukUphamukeNufrechedr',
		'bruHAdraqUwetUHEKujaguyUPrUtHaYAStebaDusPebusPePAsaRaSwefraZAnUw'
	],

	'14':
	[
		'frerETusecrAveswajeWrusTuwruPraTutheDuwraqaBacuxUxebaPETEcEtRunE',
		'xEhunUbamAchecrePUsAsUveSeFustumehATarucEnEPheSwuVamubAzemespape',
		'suHEdefucERedUxephuZErEPrUmEstEFrePrufebabewrUcrethaMadruRawrast'
	],


};

//find sidebar
var sidebar = $xpath('//div[@class="item-summary-tr"]|//div[@id="video-right"]/div[@class="info"]|//div[@class="item-summary"]//div[@class="info"]'); //various versions
if(sidebar.length !== 1)
	failMessage('Could not find sidebar, please upgrade this greasemonkey script.', true);
sidebar = sidebar[0];
sidebar.style.height = 'auto';

//define actions

/**
 * Put the download (or info) link on the sidebar.
 */
function attachDownloadLink(linkInfo)
{
	var dl = document.createElement('a');
	dl.appendChild(document.createTextNode(linkInfo.text));
	dl.setAttribute('href', linkInfo.href);
	dl.style.backgroundColor = 'yellow';
	dl.style.color = 'blue';

	sidebar.insertBefore(dl, sidebar.firstChild);
}

/**
 * Retrieve data from a sidebar node's text().
 */
function extractSidebarField(textNodes)
{
	return textNodes.map(function(el){return el.textContent;}).join('').replace(/^\s*:\s*(.+?)\s*$/, '$1');
}

/**
 * Create a nice filename for this video. Returns null if cannot build.
 */
function buildPrettyFileName()
{
	var showBlock = $xpath('.//*[span[@class="htitle"][text()="Show"]]/a/text()', sidebar);
	var titleBlock = $xpath('.//*[span[@class="htitle"][text()="Episode Title"]]/text()', sidebar);
	var seasonBlock = $xpath('.//*[span[@class="htitle"][text()="Season"]]/text()', sidebar);
	var episodeBlock = $xpath('.//*[span[@class="htitle"][text()="Episode"]]/text()', sidebar);
	var partsBlock = $xpath('.//*[span[@class="htitle"][text()="Parts"]]/text()', sidebar);

	var isSeries = (seasonBlock.length === 1) && (episodeBlock.length === 1);
	if(showBlock.length < 1 || titleBlock.length < 1 || partsBlock.length < 1)
	{
		failMessage('Could not read sidebar data: Show, title, parts. (Link will not be pretty-printed.)', false);
		return null;
	}

	var epiTitle = extractSidebarField(titleBlock);
	var partNum = extractSidebarField(partsBlock).replace(/^[, ]*Part ([0-9]+)[, ]*$/, '$1');
	if(/^[0-9]+$/.test(partNum) != true) // perhaps == " : N/A"
		partNum = null;
	
	// intro of name (none for a non-series)
	
	var prettyFileName = '';
	
	if(isSeries)
	{
		var showTitle = extractSidebarField(showBlock);	
		var episodeNum = extractSidebarField(episodeBlock);
		var seasonNum = extractSidebarField(seasonBlock);
		
		prettyFileName = showTitle+' S'+seasonNum+'E'+episodeNum+': ';
	}
	
	// feature title
	
	prettyFileName += epiTitle;
	
	// part number
	
	if(partNum !== null)
	{
		prettyFileName += ' (part '+partNum+')';
	}
	
	// extension
	
	prettyFileName += '.flv';
	
	return prettyFileName;
}

/**
 * Use a pretty download link if possible.
 */
function buildDownloadLink(stcLink)
{
	//can we parse it?
	var stcID = /^http:\/\/getlink.surfthechannel.com\/flv\/(([0-9a-z]|%2[BD])+={0,2}).flv$/gi.exec(stcLink);
	
	if(stcID === null) // well, we tried
		return stcLink;
	stcID = stcID[1];
	
	//encode pretty filename
	var prettyFileName = buildPrettyFileName();
	if(prettyFileName === null) // again, we tried
		return stcLink;
	
	//use a redirector service
	return 'http://lab.brainonfire.net/director/download.php/'+encodeURIComponent(prettyFileName)+'?stc='+encodeURIComponent(stcID);
}

/**
 * Ask a keyserver for help if the skinID is unknown.
 */
function resolveUnknownSkin(skinID)
{
	GM_xmlhttpRequest(
	{
		method: 'POST',
		url: stcd.srv,
		data: 'version=' + stcd.version + '&id=' + skinID,
		headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-STCD-check': 'yes'},
//		overrideMimeType: 'text/xml; charset=UTF-8',
		onerror: function(response)
		{
			attachDownloadLink({text: 'Unknown encryption keys, could not contact keyserver. Please try back tomorrow. If this persists, leave a comment on the userscript page.', href: usorgURL});
		},
		onload: function(response)
		{
			if(response.status !== 200)
			{
				attachDownloadLink({text: 'Unknown encryption keys, keyserver returned an error. Please try back tomorrow. If this persists, leave a comment on the userscript page. Error: '.response.responseText, href: usorgURL});
				return;
			}
			
			var linkInfo = eval('(' + response.responseText + ')');
			attachDownloadLink(linkInfo);
		}
	});
}

/**
 * Grab, decode, and display the download link.
 */
function displayDownloadLink()
{
	//grab input data
	var working = /^input_str=(.+?)&/.exec(flashvars)[1];
	var skinID = /&config=\/skin2\/dynamic\.php\?xmlnum=([0-9]+)[&-]/.exec(flashvars);
	attachDownloadLink
	if(skinID === null)
	{
		attachDownloadLink({text: 'Cannot determine skinID. Perhaps there is a newer version of the script?', href: usorgURL});
		return;
	}
		
	var skinID = skinID[1];

	if(!knownSkins[skinID])
	{
		resolveUnknownSkin(skinID, andThen);
		return; // we'll do this asynchronously
	}

	var skinKeys = knownSkins[skinID];

	//decrypt
	working = atob(working);

	var pass = undefined;
	for each(pass in skinKeys)
	{
		working = working.split(pass).join('');
	}

	working = atob(working);
	
	attachDownloadLink({text: 'Download FLV', href: buildDownloadLink(working)});
}

//Get it and display it
displayDownloadLink();
