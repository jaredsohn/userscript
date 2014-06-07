// ==UserScript==
// @name          Profanity Filter
// @namespace     http://www.someurlthingherethatsprettyunique.com/blah/ProfanityFilter
// @description	Version 1.0: Filters profanity from website.  Edit the array profanity to control which words are removed from pages and replaced with ***.
// @include         *
// ==/UserScript==

/*

  Author: MCE
  
  Significantly rewritten other replacement scripts to noticably improve performance and add pseudo-threading to gradually replace words on larger pages.
  
  Version: 1.0
    1.0 - First Release

  Competing scripts and extensions:
   * http://www.arantius.com/article/arantius/clean+language/
   
   Improvements Needed:
   * Filter HTML attributes (ALT, TITLE, TOOLTIP, etc)
   * Add an interface to manage the words by turning this into an extension.

*/

// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.

(function() {

	//some performance settings
	var MillisecondsPauseBetweenBatches=3;
	var NodesPerBatch = 20;
	var ReplacementText = "***";
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=[
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lezes', 'lezzzy',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'tranny',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'homophobic',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lezphobic',
	
	
	
	'fagphobic',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lesbianphobism',
	
	
	
	
	
	'lesbophobic',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lesbianas',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'homophobia', 'homophobia', 'LESIAN',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'dykeie',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'twink',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'dykeland',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	'Fagerland',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'homophobe',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  
	'Gayye',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'gayette',
	
	
	'fagel',
	
	'fageit',









































	
	
	
	
	'Fagdragon',
	'Fagdrew',
	'fagdroid',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'faging',
	
	'fage',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'faggotry',
	'Faged',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'fagic',
	
	
	
	
	'homos',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lesbochoism',
	
	
	
	
	'lesbist',
	
	
	
	
	
	
	'lesbianism',
	
	
	
	
	
	
	
	'lesbeian',
	
	'trans women',
	'trans man',
	'trans male',
	'trans female',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'ladyboys',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'transexualism',
	
	
	
	
	'transsexualism',
	
	
	
	
	
	'fagin',
	
	
	
	
	
	'ladyboys', 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lesbeas',
	
	
	
	
	










	'ladyboys',

	'transvestism',







	
	'fagin',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'fag',
	
	
	
	
	
	
	
	
	
	
	
	
	
	'Gayle',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'ladygirl',
    'ladyboy',
	'dike',
	'dyke',
	
	'lesbea',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'gays', 'lesbians',
	
	
	
	
	
	
	
	
	'lezy',
	
	'lezys',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'dyke-like',
	
	
	
	'gays',
	
	'gayley',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'dykeified',
	
	
	
	
	
	'lesbianz',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'ladyboy',
	
	
	
	
	
	
	
	
	
	
	
	
	'lezified',
	
	
	
	
	'lesbeaed',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lesbify',
	
	
	
	
	
	
	
	
	
	
	
	'lesbian',
	
	
	'lesbianified',
	
	
	
	
	
	
	
	
	
	
	
	'transgendered',
	
	
	'lezzy', 'lesbian',
	
	
	
	
	
	
	
	
	
	
	
	
	'lez',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'leasy',
	
	
	
	
	
	
	
	
	
	
	'lezzy', 'lesbian',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'faggoted',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'transgendred', 'transexual', 'transsexual', 'faggit',
	
	
	'same-sex', 'same sex', 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'queers', 'queered', 'lesbofied',
	
	
	
	
	
	'lesbea',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'Gayley',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 'men seeking men', 'women seek women',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'women looking for women',
	'men looking for men',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'faggy',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'lady boy', 'transgeral', 'transgender', 'dike',
	
	
	'gayest', 'lez', 'faggest', 'lesbianism', 'gayism', 'gayer', 'lesbianer', 'same-sex', 'same sex', 'lesbianest', 'faggit',  'fagbag', 'fagtard', 'lezzie ', 'lesbo', 'dyke ',
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	'same-sex',
	'same sex',
	
	
	
	
	
	
	
	
	
	
	
	
	
	'wop','whoar','wetback','wank','twaty','teets','spunk','spic','smut','sleaze','slag','shittings','shitting','shitters','shitted','shits','shitings','shiting','shitfull','shited','shemale','sheister','sh!t','scrotum','schlong','qweef','queer','queef','pussys','pusse','pricks','pr0n','pornos','pissoff','phukked','phuking','phuked','phuk','phuck','phonesex','pecker','orgasims','orgasim','motherfucks','motherfuckings','motherfucking','motherfuckin','motherfuckers','motherfucker','motherfucked','motherfuck','mothafucks','mothafuckings','mothafucking','mothafuckin','mothafuckers','mothafucker','mothafucked','mothafuckaz','mothafuckas','mothafucka','mothafuck','merde','horniest','hore','hooker','honkey','homo','hoer','hardcoresex','hard on','h4x0r','h0r','guinne','gazongers','gaysex','gay','gangbangs','gangbanged','fux0r','furburger', 'fags','fagots','fagot','faggs','faggot','faggit','fagging','fagget','fag','ejaculation','dyke',
	
	
	
	
	
	
	
	'transgenders',
	'gayophoe',
	'lesbianphobe',
	
	
	
	
	
	
	'belly whacker','beastility','beastiality','beastial','asskisser','assholes','asses','ass lick','faggot','fagget','fag','gay','gays','gayed','lesbians','lesbos','lesbian','homosexuality','homosexuals','homosexual',
	'leba',
	'lez',
	'lebas',
	'lebz',
	'hermaphrodite',
	'hermaphrodites',
	
	
	
	'transsexual',
	'gaylord',
	'transsexuals',
	'bisexuals',
	'cross-sexuals',
	'cross-sexual',
	'cross-sex',
	'chad bono',
	'lgbt',
	'queer',
	'drag queen',
	'drag king',
	
	'bi-curious',
	'asexual',
	'gaylord',
	'homosexism',
	'lebaism',
	
	
	'transgender',
	'transgender',
	'transfeminism',
	'homo',
	'bisexualed',
	'gaytube',
	'GLBT',
	'LBGT',
];

	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="\\b("+badwords.join("|")+")\\b";
	bw=new RegExp(bw, "gi");

	//do the title first
	document.title=document.title.replace(bw, ReplacementText);

	function CleanSome() 
	{		
		var el;
		var newval="";
		var data = "";
		var loopCount = 0;
		while ((el=els.snapshotItem(i++)) && (loopCount <= NodesPerBatch)) 
		{
			data = el.data;
			newval = data.replace(bw, ReplacementText);
			if (newval.length != data.length ||  newval != data)
			{
				//check the length first since its quicker than a a string comparison.
				//only change the value if we need to. its quicker.
				el.data = newval;
			}
			loopCount++;
		}
		
		if (el != null)
		{
			//more work left to do
			i--;
			GoNow(MillisecondsPauseBetweenBatches);
		}
		else
		{
			//we're done
			DoneNow();
		}
	}
	
	function DoneNow()
	{
		var et = new Date().valueOf();
		//alert("Milliseconds to complete: " + (et - st).toString()); //timer code
	}

	function GoNow(WaitUntil)
	{
		window.setTimeout(CleanSome, WaitUntil); 
	}
	
	//spin the initial "thread"
	GoNow(0);

})
();
