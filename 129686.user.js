// ==UserScript==
// @name          Pasteris Swear Masking v3
// @namespace     
// @description	This is Swear Masking v3, replacing the X back to the cartoon symbol.
// @include         *
// ==/UserScript==

(function() {

	//some performance settings
	var MillisecondsPauseBetweenBatches=3;
	var NodesPerBatch = 20;
	var ReplacementText = "!@#$";
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=['wtf','wop','whore','whoar','wetback','wank','vagina','twaty','twat','titty','titties','tits','testicles','teets','spunk','spic','snatch','smut','sluts','slut','sleaze','slag','shiz','shitty','shittings','shitting','shitters','shitter','shitted','shits','shitings','shiting', 'shitting', 'shittings', 'shitfull','shited','shit','shemale','sheister','sh!t','scrotum','screw','schlong','retard','qweef','queer','queef','pussys','pussy','pussies','pusse','punk','prostitute','pricks','prick','pr0n','pornos','pornography','porno','porn','pissoff','pissing','pissin','pisses','pissers','pisser','pissed','piss','pimp','phuq','phuks','phukking','phukked','phuking','phuked','phuk','phuck','phonesex','penis','pecker','orgasms','orgasm','orgasims','orgasim','niggers','nigger','nigga','nerd','muff','mound','motherfucks','motherfuckings','motherfucking','motherfuckin','motherfuckers','motherfucker','motherfucked','motherfuck','mothafucks','mothafuckings','mothafucking','mothafuckin','mothafuckers','mothafucker','mothafucked','mothafuckaz','mothafuckas','mothafucka','mothafuck','mick','merde','masturbate','lusting','lust','loser','lesbo','lesbian','kunilingus','kums','kumming','kummer','kum','kuksuger','kuk','kraut','kondums','kondum','kock','knob','kike','kawk','jizz','jizm','jiz','jism','jesus h christ', 'jesus fucking christ','jerk-off', 'jerk off','jerk','jap','jackoff','jacking off','jackass','jack-off','jack off','hussy','hotsex','horny','horniest','hore','hooker','honkey','homo','hoer','hell','hardcoresex','hard on','h4x0r','h0r','guinne','gook','gonads','goddamn','gazongers','gaysex','gay','gangbangs','gangbanged','gangbang','fux0r','furburger','fuks','fuk','fucks','fuckme','fuckings','fucking','fuckin','fuckers','fucker','fucked','fuck','fu','foreskin','fistfucks','fistfuckings','fistfucking','fistfuckers','fistfucker','fistfucked','fistfuck','fingerfucks','fingerfucking','fingerfuckers','fingerfucker','fingerfucked','fingerfuck','fellatio','felatio','feg','feces','fcuk','fatso','fatass','farty','farts','fartings','farting','farted','fart','fags','fagots','fagot','faggs','faggot','faggit','fagging','fagget','fag','ejaculation','ejaculatings','ejaculating','ejaculates','ejaculated','ejaculate','dyke','dumbass','douche bag','dong','dipshit','dinks','dink','dildos','dildo','dike','dick','damn','damn','cyberfucking','cyberfuckers','cyberfucker','cyberfucked','cyberfuck','cyberfuc','cunts','cuntlicking','cuntlicker','cuntlick','cunt','cunnilingus','cunillingus','cunilingus','cumshot','cums','cumming','cummer','cum','crap','cooter','cocksucks','cocksucking','cocksucker','cocksucked','cocksuck','cocks','cock','cobia','clits','clit','clam','circle jerk','chink','cawk','buttpicker','butthole','butthead','buttfucker','buttfuck','buttface','butt hair','butt fucker','butt breath','butt','butch','bung hole','bum','bullshit','bull shit','bucket cunt','browntown','browneye','brown eye','boner','bonehead','blowjobs','blowjob','blow job','bitching','bitchin','bitches','bitchers','bitcher','bitch','bestiality','bestial','belly whacker','beaver','beastility','beastiality','beastial','bastard','balls','asswipe','asskisser','assholes','asshole','asses','ass lick','ass','what the fuck','fuck you','go fuck yourself','screw you','jerk','f**k','f***','b****','sh*t','s***'];

	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="\\b("+badwords.join("|")+")\\b";
	bw=new RegExp(bw, "gi");

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

				el.data = newval;
			}
			loopCount++;
		}
		
		if (el != null)
		{
	
			i--;
			GoNow(MillisecondsPauseBetweenBatches);
		}
		else
		{
	
			DoneNow();
		}
	}
	
	function DoneNow()
	{
		var et = new Date().valueOf();
		
	}

	function GoNow(WaitUntil)
	{
		window.setTimeout(CleanSome, WaitUntil); 
	}
	
	//spin the initial "thread"
	GoNow(0);

})
();