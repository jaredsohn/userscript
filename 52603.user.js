// ==UserScript==
// @name           Maze Defense Scraper - Phone Home
// @namespace      http://userscripts.org/scripts/show/52603
// @description    Scrapes full wave data from a MD wave.
// @include        http://apps.new.facebook.com/mazedefense/mymaze.aspx*
// @include        http://apps.facebook.com/mazedefense/mymaze.aspx*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.js
// @require	   http://www.thomasfrank.se/downloadableJS/jsonStringify.js

//set this variable to true to activate the script.

var THIS_SCRIPT_PHONES_HOME = GM_getValue("OKTOSEND",false);

if (THIS_SCRIPT_PHONES_HOME == false) {
	var answer = confirm("Do you want to enable the Maze Defense Scraper?\n Enabling this will cause the script to send information to google.");
	if (answer){
		GM_setValue("OKTOSEND",true);
		THIS_SCRIPT_PHONES_HOME == true;
	}
}

if (THIS_SCRIPT_PHONES_HOME == true) {
	
	rank = $(".md_hierarchy_name:last div:last").text().replace("Title: ","");

	levelObj   = {"diff":[{"monWave":[],"card":{"cardType":-1,"power":0,"cardWave":[]},"money":0},
			      {"monWave":[],"card":{"cardType":-1,"power":0,"cardWave":[]},"money":0},
			      {"monWave":[],"card":{"cardType":-1,"power":0,"cardWave":[]},"money":0},
			      {"monWave":[],"card":{"cardType":-1,"power":0,"cardWave":[]},"money":0},
			      {"monWave":[],"card":{"cardType":-1,"power":0,"cardWave":[]},"money":0},
			      {"monWave":[],"card":{"cardType":-1,"power":0,"cardWave":[]},"money":0}]
			      };

	$(":contains['fbjs_fbml_string']").filter("script").each(function (){
		foo = $(this).html();
		money = /d([0-9])money=new fbjs_fbml_string\("([0-9]+)/g;
		moneyR = money.exec(foo) 


		card = /d([0-9]+)card=new fbjs_fbml_string.*card([0-9]+).png/g
		cardR = card.exec(foo);

		power = /md_card_label\\">([0-9]+)/g
		powerR = power.exec(foo);

		cardMonster = /((?:monster)[0-9]+|empty)\.png/gm;


		if (cardR != null){
			//alert(cardR[1]);
			//alert(powerR[1]);
			levelObj.diff[cardR[1]].card.cardType = cardR[2];
			levelObj.diff[cardR[1]].card.power = powerR[1];
			levelObj.diff[cardR[1]].difficulty = cardR[1];
			i=0;
			while ( (cm = cardMonster.exec(foo)) != null){
				levelObj.diff[cardR[1]].card.cardWave[i++] = cm[1];
				//alert(cardR[1]+" "+ (i++) +" "+cm[1]);
			}

			//alert(levelObj.diff[cardR[1]].card.cardWave);

		}

		if (moneyR != null){
			levelObj.diff[moneyR[1]].money = moneyR[2];
			//alert(levelObj.diff[moneyR[1]].money);	

		}

		waves = /([0-9]+).new/;

		wavesR = waves.exec(foo);

		monsterCount = /\\"md_monster_top\\"><b>([0-9]+)/g;
		monsterType = /Monsters\\\/monster([0-9]+).png/g;
		monsterHP = /alt=\\"Hit points\\" \\\/><div>([0-9]+)/g;
		monsterSpeed = /"Speed\\" \\\/><div>([0-9.]+)/g;


		if (wavesR != null){
			//alert(wavesR);
			monWav = [];
			i=0;
			while ( (mc = monsterCount.exec(foo)) && (mt = monsterType.exec(foo)) && (mh = monsterHP.exec(foo)) && (ms = monsterSpeed.exec(foo))){
				monWav[i++] = {"count":mc[1],"type":mt[1],"hp":mh[1],"speed":ms[1]};
			}
			levelObj.diff[wavesR[1]].monWave = monWav;
		}


	});


	JSONstring.compactOutput=true;     
	JSONstring.includeProtos=false;     
	JSONstring.includeFunctions=false;     
	JSONstring.detectCirculars=false;          
	JSONstring.restoreCirculars=false;

	oldS = GM_getValue("oldS","");
	
	var s=JSONstring.make(levelObj);
	if (oldS != s || true) {
		
		GM_setValue("oldS",s);
		
		pass = {"entry.0.single":"test", "entry.0.single":"test"};
		if ($("#app14618023107_difficulty").text().length > 1) {

			GM_xmlhttpRequest({
			  method: "POST",
			  url: "http://spreadsheets.google.com/formResponse?formkey=cmNoWldiaDU2a2gyUkNtUjZwMlFUNlE6MA..",
			  data: "entry.0.single="+s+"&entry.2.single="+rank,
			  headers: {
			    "Content-Type": "application/x-www-form-urlencoded"
			  },
			  onload: function(response) {
			     alert($(response.responseText).filter(".ss-container").text().replace("Create your own form","").replace("\n",""));
			  }
			});


		//$.post("http://spreadsheets.google.com/formResponse?formkey=cmNoWldiaDU2a2gyUkNtUjZwMlFUNlE6MA..", pass );
		}
	}

	//alert(s);
	//alert("hello");
}
// ==/UserScript==