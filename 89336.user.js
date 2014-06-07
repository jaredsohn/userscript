// ==UserScript==
// @name           Multikudos
// @namespace      http://userscripts.org/users/38722
// @description    Teller opp antall kudos, og lar deg bytte ut kudos med hva du vil
// @include        http://underskog.no/*
// @include        http://www.underskog.no/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/62718.user.js
//
// @version        2.01
// 
// @history        2.01 Forbedra og fiksa bug i funksjonen som fikser stor forbokstav
// @history        2.0 Innstillinger kan nå gjøres via Greasemonkeys "User Script Commands"-meny
// @history        2.0 Lagt til mulighet for å velge om antall kudos skal telles
// @history        2.0 Lagt til mulighet for å velge kolonposisjon i telleteksten
// @history        1.0 Første versjon
// ==/UserScript==


var kudos_entall = "";
var kudos_flertall = "";
var kudos_blocks;


Config.scriptName = "Multikudos";
Config.footerHtml = '<span style="font-size:.9em;">Obs: Du må laste om sidene for å se endringene dine.</span>';
Config.tabs = {
	"Kudostelling":{
		fields:{
			tell_kudos:{
				type:'checkbox',
				label:'Telle kudos?',
				text:'Ja takk, tell kudosene mine!',
				value:true,
			},
			kolonposisjon:{
				type:'select',
				label:'Kolonposisjon',
				options:{
					"Ikke bruk kolon":"0",
					"X kudos: fra …":"1",
					"X kudos fra: …":"2"
				},
				value:"1"
			}
		}
	},
	"Kudostekst":{
		html:'<p>Vil du gi og få noe annet enn kudos?</p>',
		fields:{
			kudos_entall:{
				type:'text',
				label:'Entallsform',
				text:'(f.eks. <strong>klem</strong>)',
				value:"kudos"
			},
			kudos_flertall:{
				type:'text',
				label:'Flertallsform',
				text:'(f.eks. <strong>klemmer</strong>)',
				value:"kudos"
			}
		}
	}
};

function do_the_magic() {
	kudos_blocks = document.evaluate(
		'//span[@class="kudos_block"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
	);
	kudos_entall = GM_getValue("kudos_entall");
	if (kudos_entall == null) {
		kudos_entall = "kudos";
		GM_setValue("kudos_entall",kudos_entall);
	}
	kudos_flertall = GM_getValue("kudos_flertall");
	if (kudos_flertall == null) {
		kudos_flertall = "kudos";
		GM_setValue("kudos_flertall",kudos_flertall);
	}
	count_them();
	replace_them();
}; // Ends do_the_magic


function count_them() {
	var num_blocks = kudos_blocks.snapshotLength;
	var re = /<a [^>]*class="username"/g;
	for (var i = 0; i < num_blocks; i++) {
		var kudos_block = kudos_blocks.snapshotItem(i);
		var matches = kudos_block.innerHTML.match(re);
		if (matches!=null) {
			num_matches = matches.length;
			var kudos_string = "";
			if (GM_getValue("tell_kudos")==true){
				kudos_string = num_matches + " " + (num_matches==1?kudos_entall:kudos_flertall) + 
					(GM_getValue("kolonposisjon")==1?":":"") + " fra" + (GM_getValue("kolonposisjon")==2?":":"");
			}
			else {
				kudos_string = upper_case_first((num_matches==1?kudos_entall:kudos_flertall)) + " fra"
			}
			kudos_block.innerHTML = kudos_block.innerHTML.replace(/Kudos fra/,kudos_string);
		}
	}
}


function replace_them() {
	var num_blocks = kudos_blocks.snapshotLength;
	var re1 = /Kudos!/g;
	var re2 = /Gi kudos/g;
	if (kudos_entall!="kudos") {
		for (var i = 0; i < num_blocks; i++) {
			var kudos_block = kudos_blocks.snapshotItem(i);
			kudos_block.innerHTML = kudos_block.innerHTML.replace(re1,upper_case_first(kudos_entall)+"!");
			kudos_block.innerHTML = kudos_block.innerHTML.replace(re2,"Gi "+kudos_entall);
		}
	}
}


function upper_case_first(str) {
	return str.replace(/^./, function(txt){return txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase();});
}


var vis_valg = function() {
	Config.show();
}


GM_registerMenuCommand("Multikudos-valg", vis_valg, "k", "control alt", "k");
window.addEventListener("load", function() { do_the_magic() }, false);


//.user.js