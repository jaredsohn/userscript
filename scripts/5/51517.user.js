// ==UserScript==
// @name           Suomenkielinen eRepublik
// @description    Pelaa eRepublikkiä suomenkielisenä
// @include        http://www.erepublik.com/*
// @exclude 	   http://www.erepublik.com/en/forum*
// ==/UserScript==


var regexps = {};

regexps["^January (.*)"] = "tammikuu $1";
regexps["^February (.*)"] = "helmikuu $1";
regexps["^March (.*)"] = "maaliskuu $1";
regexps["^April (.*)"] = "huhtikuu $1";
regexps["^May (.*)"] = "toukokuu $1";
regexps["^June (.*)"] = "kesäkuu $1";
regexps["^July (.*)"] = "heinäkuu $1";
regexps["^August (.*)"] = "elokuu $1";
regexps["^September (.*)"] = "syyskuu $1";
regexps["^October (.*)"] = "lokakuu $1";
regexps["^November (.*)"] = "marraskuu $1";
regexps["^December (.*)"] = "joulukuu $1";
regexps["^You worked (\\d*) days in a row.You have (\\d*) more days until you receive a 'Hard Worker' Medal"] = "Olet työskennellyt $1 päivää putkeen. Vielä $2 päivää, että saat seuraavan ahkera työntekijä saavutuksen.";
regexps["You worked (\\d*) days in a row.You have one more day until you receive a 'Hard Worker' Medal"] = "Olet työskennellyt $1 päivää putkeen. Kun työskentelet vielä päivän, saat ahkera työntekijä saavutuksen.";
regexps["^(\\d*) allies(\\s*)$"] = "$1 liittolaista";
regexps["(\\s*)Expires in (\\d*) days"] = "Voimassa vielä $2 päivää";
regexps["^(\\d*) comments$"] = "$1 kommenttia";
regexps["$(\\d*) months"] = "$1 kuukautta";
regexps["^(\\d*) hours ago$"] = "$1 tuntia sitten";
regexps["^(\\d*) minutes ago$"] = "$1 minuuttia sitten";
regexps["$ minutes ago$"] = "$1 minuuttia sitten";
regexps["^(\\d*) days ago$"] = "$1 päivää sitten";
regexps["^Regions \\((\\d*)\\)"] = "Alueet ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Ystävät ($1)";
regexps["^All employees \\((\\d*)\\)"] = "Kaikki työntekijät ($1)";
regexps["^(\\d*) months ago"] = "$1 kuukautta sitten";
regexps["^Comments(.*)"] = "Kommentit $1";
regexps["^(\\d*) active battles$"] = "$1 aktiivista taistelua";
regexps["^(\\d*) has secured this region$"] = "$1 on turvannut alueen";
regexps["^(\\d*) has conquered this region$"] = "$1 on vallannut alueen";
regexps["^(\\d*) congress members$"] = "$1 eduskunnan jäsentä";
regexps["^(\\d*)  of Congress$"] = "$1 eduskunnasta";
regexps["^(\\d*) hours$"] = "$1 tunnin pästä";
regexps["^(\\d*) days|days $"] = "$1 päivän pästä";
regexps["^ (\\d*)  candidates $"] = "$1 ehdokasta";
regexps["^Active resistance wars in (.*)"] = "Aktiiviset vapaussodat";
regexps["^Active wars in (.*)"] = "Aktiiviset sodat";
regexps["(\\s*)Expires in (\\d*) hours"] = "Voimassa vielä $2 tuntia";
regexps["^Official candidates (.*)"] = "Viralliset ehdokkaat ($1)";
regexps["^supported by (.*) parties"] = "tukevia puolueita $1";
regexps["(\\s*)Next elections in(\\d*)"] = "Seuraavat vaalit";
regexps["^Official candidates"] = "Läpi pääsevät";
regexps["^Wildcards"] = "Villit kortit";
regexps["^Not qualified"] = "Eivät pääse läpi";
regexps["(.*) hours ago(.*)"] = "$1 tuntia sitten";
regexps["(.*) minutes ago(.*)"] = "$1 minuuttia sitten";
regexps["^(\\W*)of the New World(\\t*)"] = "";
regexps["You have succesfully bought (.*) products for (.*)."] = "Olet onnistuneesti ostanut $1 tuotetta hintaan $2.";
regexps["You have succesfully bought 1 product for (.*)."] = "Olet onnistuneesti ostanut 1 tuotteen hintaan $1.";
regexps["^Do you agree to represent your party in the congress election in (.*)?"] = "Lupaatko edustaa puoluettasi eduskuntavaaleissa alueella $1"; 
regexps["You have successfully donated (.*). This amount will appear shortly in the citizen/organization account."] = "Olet onnistuneesti lahjoittanut $1. Tämä summa ilmestyy pian kansalaisen/organisaation tilille.";
regexps["^You cannot resign from your job until (.*)-(.*)-(.*) (.*)."] = "Voit erota työpaikastasi vasta $3.$2.$1 klo $4.";
regexps["Sorry, you need to reach experience level (\\d) in order to send invitations\\."] = "Sinun kokemustasosi täytyy olla $1, että voit lähettää kutsuja.";
regexps["^You received (.*) wellness from hospital."] = "Sait $1 pistettä terveyttä sairaalasta.";
regexps["You have successfully moved to (.*)"] = "Olet muuttanut onnistuneesti kohteeseesi $1";
regexps["(\\d*) active battles"] = "$1 taistelua";
regexps["show all accounts (.*)"] = "kaikki tilit ($1)";



//Kuukaudet
	regexps["^Jan0(\\d)"] = "tam 0$1";
	regexps["^Jan1(\\d)"] = "tam 1$1";
	regexps["^Jan2(\\d)"] = "tam 2$1";
	regexps["^Jan3(\\d)"] = "tam 3$1";
	regexps["^Feb0(\\d)"] = "hel 0$1";
	regexps["^Feb1(\\d)"] = "hel 1$1";
	regexps["^Feb2(\\d)"] = "hel 2$1";
	regexps["^Mar0(\\d)"] = "maa 0$1";
	regexps["^Mar1(\\d)"] = "maa 1$1";
	regexps["^Mar2(\\d)"] = "maa 2$1";
	regexps["^Mar3(\\d)"] = "maa 3$1";
	regexps["^Apr0(\\d)"] = "huh 0$1";
	regexps["^Apr1(\\d)"] = "huh 1$1";
	regexps["^Apr2(\\d)"] = "huh 2$1";
	regexps["^Apr3(\\d)"] = "huh 3$1";
	regexps["^May0(\\d)"] = "tou 0$1";
	regexps["^May1(\\d)"] = "tou 1$1";
	regexps["^May2(\\d)"] = "tou 2$1";
	regexps["^May3(\\d)"] = "tou 3$1";
	regexps["^Jun0(\\d)"] = "kes 0$1"
	regexps["^Jun1(\\d)"] = "kes 1$1";
	regexps["^Jun2(\\d)"] = "kes 2$1";
	regexps["^Jun3(\\d)"] = "kes 3$1";
	regexps["^Jul0(\\d)"] = "hei 0$1";
	regexps["^Jul1(\\d)"] = "hei 1$1";
	regexps["^Jul2(\\d)"] = "hei 2$1";
	regexps["^Jul3(\\d)"] = "hei 3$1";
	regexps["^Aug0(\\d)"] = "elo 0$1";
	regexps["^Aug1(\\d)"] = "elo 1$1";
	regexps["^Aug2(\\d)"] = "elo 2$1";
	regexps["^Aug3(\\d)"] = "elo 3$1";
	regexps["^Sep0(\\d)"] = "syy 0$1";
	regexps["^Sep1(\\d)"] = "syy 1$1";
	regexps["^Sep2(\\d)"] = "syy 2$1";
	regexps["^Sep3(\\d)"] = "syy 3$1";
	regexps["^Oct0(\\d)"] = "lok 0$1";
	regexps["^Oct1(\\d)"] = "lok 1$1";
	regexps["^Oct2(\\d)"] = "lok 2$1";
	regexps["^Oct3(\\d)"] = "lok 3$1";
	regexps["^Nov0(\\d)"] = "mar 0$1";
	regexps["^Nov1(\\d)"] = "mar 1$1";
	regexps["^Nov2(\\d)"] = "mar 2$1";
	regexps["^Nov3(\\d)"] = "mar 3$1";
	regexps["^Dec0(\\d)"] = "jou 0$1";
	regexps["^Dec1(\\d)"] = "jou 1$1";
	regexps["^Dec2(\\d)"] = "jou 2$1";
	regexps["^Dec3(\\d)"] = "jou 3$1";

//Lakiehdotukset/Eventit
	regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "Haluatko siirtää $1 maan tileiltä $2 organisaatiolle?";
	regexps["Citizen fee change from (.*) to (.*)"] = "Vanhan kansalaismaksun ($1) muuttaminen uuteen ($2).";
	regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "Hyväksytkö ehdotuksen painaa $1 $2 Kullalla.";
	regexps["Do you agree on the text used by the president to welcome new Citizens in your country\\?"] = "Hyväksytkö tämän tekstin käytettäväksi uusien pelaajien viestinä?";
	regexps["Do you agree that (.*) should buy a hospital of quality (\\d+) from (.*) company at the price of (.*) for (.*)\\?"] = "Hyväksytkö, että alueelle $5 ostetaan tason $2 sairaala yhtiöltä $3 hintaan $4?";
	regexps["Do you agree that (.*) should buy a defense system of quality (\\d+) from (.*) company at the price of (.*) for (.*)\\?"] = "Hyväksytkö, että alueelle $5 ostetaan tason $2 puolustusjärjestelmä yhtiöltä $3 hintaan $4?";
	regexps["A congress donation to (.*) was proposed"] = "Eduskunta ehdotti lahjoitusta organisaatiolle $1";
	regexps["The proposal for a congress donation to (.*) was rejected"] = "Lahjoitus organisaatiolle $1 hylättiin";
	regexps["(.*) made a donation to (.*)"] = "Lahjoitus $2 -organisaatiolle hyväksyttiin.";
	regexps["A deployment of a new defence system was proposed in (.*)."] = "Puolustusjärjestelmän ostamista alueelle $1 ehdotettiin.";
	regexps["A deployment of a new hospital was proposed in (.*)."] = "Sairaalan ostamista alueelle $1 ehdotettiin";
	regexps["A new defense system was bought in (.*)."] = "Uusi puolustusjärjestelmä ostettiin alueelle $1";
	regexps["A new hospital was bought in (.*)."] = "Uusi sairaala ostettiin alueelle $1.";
	regexps["A president impeachment against (.*) was proposed"] = "Presidentin ($1) erotusta ehdotettiin";
	regexps["A money issuing of (.*) was proposed"] = "Rahaa ($1) ehdotettiin painettavaksi";
	regexps["The proposal of issuing (.*) was rejected"] = "Rahanpainoehdotus $1 painamisesta hylättiin";
	regexps["The proposal of issuing (.*) was accepted"] = "Rahanpainoehdotus $1 painamisesta hyväksyttiin";
	regexps["President of (.*) proposed a new welcome message for new citizens."] = "Presidentti ehdotti uutta tervetuloviestiä uusille pelaajille";
	regexps["(.*) now has a new welcoming message for new citizens."] = "Maalla on nyt uusi tervetuloviesti";
	regexps["(.*) issued (.*)"] = "Rahanpainoehdotus $2 painamisesta hyväksyttiin";
	regexps["(.*) was secured by (.*) in the war versus the Resistance Force"] = "Alue $1 turvattiin sodassa vastarintaa vastaan";
	regexps["(.*) now has a new citizen fee"] = "Maalla on nyt uusi kansalaismaksu";
	regexps["(.*) has a new minimum wage"] = "Maalla on nyt uusi minimipalkka";
	regexps["President of (.*) proposed to stop the trade with (.*)"] = "Presidentti ehdotti kauppasaartoa maalle $2";
	regexps["^A resistance has started in (.*)"] = "Vapaussota on alkanut alueella $1";
	regexps["(.*) was conquered by the Resistance Force in the war versus (.*)"] = "Vastarinta valtasi alueen $1 vapaussodassa";
//	regexps["(.*) attacked (.*), (.*)"] = "$1 hyökkäsi alueelle $2, $3";
//	regexps["(.*) was conquered by (.*) in the war versus (.*)"] = "$2 valtasi alueen $1 sodassa $3 vastaan";
//Alertit
	regexps["has transfered (.*) to your account.(\\v*)"] = "on siirtänyt $1 sinun tilillesi. ";
	regexps["We inform you that(.*)have been sold for (.*) from the citizen account using the offer posted on the "] = "Ilmoitamme, että $1 on myyty hintaan $2 kansalaisen tililtä tarjouksessa, jonka teit ";
	regexps["The General Manager of "] = "";
	regexps[" has modified your salary from (.*) to (.*)."] = " yhtiön toimitusjohtaja on muuttanut nykyisen palkkasi ($1) uudeksi ($2)."
	regexps["We inform you that (.*) have been sold for (.*) from the company account using the offer posted on the "] = "Ilmoitamme, että $1 on myyty hintaan $2 yhtiön tililtä tarjouksessa, jonka teit ";
	regexps["There is no more food in your inventory. Without food to eat your Citizen loses (.*) wellness each day until he dies. To avoid death by starvation we advise you to buy food from the "] = "Sinulla ei ole enää ruokaa varastossa. Ilman ruokaa kansalaisesi menettää $1 pistettä terveyttä päivittäin. Välttääksesi nälkäkuoleman, osta ruokaa <a href='h/en/market/country-0-industry-0-quality-0'>marketista</a>";
	regexps["You have received 1 gift of quality (.*) from "] = "";
	regexps["Congratulations, you have reached experience level (\\d*) and you have received as a reward 5 Gold. To reach level (\\d*) you need (\\d*) experience points."] = "Onnittelut, olet saavuttanut kokemustason $1 ja olet saanut palkinnoksi 5 kultaa. Saavuttaaksesi tason $2, tarvitset $3 kokemuspistettä.";
	regexps["Congratulations, your citizenship application in (.*) has been accepted! You now have the right to vote, join a political party and run in elections."] = "Onnittelut, sinun kansalaisuushakemuksesi maahan $1 on hyväksytty. Sinulla on nyt oikeus äänestää vaaleissa, liittyä puolueeseen tai asettua ehdolle vaaleissa.";

var strings = {

//Yläpalkki
	"Day " : "Uuden maailman päivä ",

// Valikot
	//My Places
		"Home" : "Koti",
		"Profile":"Profiili", 
		"Company" : "Yhtiö", 
		"Army" : "Armeija",
		"Party" : "Puolue", 
		"Newspaper" :"Sanomalehti",	
		"Country administration" : "Hallinto",
      	  	"Organizations" : "Organisaatiot",
		"Advertising Department" : "Mainostoimisto",
	//Market
		"Marketplace" : "Marketti",
		"Monetary market" : "Valuuttamarketti",
		"Job market" : "Työvoimatoimisto",
        	"Companies for sale" : "Myytävät yhtiöt",
        	"Get Gold &amp; Extras" : "Osta kultaa & extroja",
	//Info
		"Rankings" : "Rankings-listat",
		"Social stats" : "Sosiaaliset tilastot",
		"Economic stats" : "Taloudelliset tilastot",
		"Political stats" : "Poliittiset tilastot",
		"Military stats" : "Sotilaalliset tilastot",
		"Tutorials" : "Oppaat",
	//Community		
		"Invite friends" : "Kutsu ystäviä",
		"Elections" : "Vaalit",
		"Tools" : "Työkalut",
		"Forum" : "Foorumi (eng.)",
		"News" : "Uutiset",
		"eRepublik Shop" : "eRepublik-kauppa ",
		"Career path" : "Ura",
//Plato
	"Find a job" : "Etsi työpaikka",
	"I have nothing more to say at the moment" : "Minulla ei ole mitään sanottavaa juuri nyt",
	"I have something to say" : "Minulla on sanottavaa",
	"It will help you increase both your skill and savings." : "Se auttaa sinua kasvattamaan taitoasi ja säästöjäsi.",
	"Next " : "Seur",
	"Ok, thanks, next tip" : "Selvä, kiitos, seuraava vihje",
	"Skip" : "Ohita",
	"Vote" : "Äänestä",
	"You are in the right place at the right time to take advantage of your opportunities." : "Olet oikeassa paikassa oikeaan aikaan ottamassa hyödyn irti mahdollisuuksistasi.",
	"You are now officially known as a Hard Worker. Dreams create realities, through hard work." : "Sinut tunnetaan nyt ahkerana työntekijänä. Unelmat muuttuvat todeksi kovalla työllä.",
	"You are now officially known as Battle Hero. Only the dead have seen the end of the war." : "Sinut tunnetaan nyt taistelun sankarina. Vain kuolleet ovat nähneet sodan lopun.",
	"You should train today" : "Sinun pitäisi harjoitella tänään",
	"You should work today" : "Sinun pitäisi työskenellä tänään",
	"Your strength can make you a hero on the battlefield." : "Voimasi voi tehdä sinusta sankarin taistelukentällä",
	"Your vote is important as it can make a difference." : "Äänesi on tärkeä ja se voi muuttaa asioita.",

// Etusivu uloskirjautuneena
	"4 step" : "neljän askeleen",
	"Become a citizen" : "Liity eRepublikkiin",
	"Citizen name" : "Nimi",
	"Enter the new world" : "Kirjaudu sisään",
	"Find out more" : "Lue lisää",
	"Forgot password" : "Unohditko salasanan",
	"Forgot password?" : "Unohditko salasanan?",
	"Forum discussions" : "Foorumikeskusteluja",
	"more discussions" : "lisää keskusteluja",
	"Password" : "Salasana",
	"Provide the email adress you used for registration in order to reset your password." : "Kirjoita sähköpostiosoite, mitä käytit rekisteröitymiseen, palauttaaksesi salasanan. ",
	"Remember me" : "Muista minut",
	"Take the " : "Ota ",
	"top countries in eRepublik" : "eRepublikin suurimmat maat",
	"tour and find out why it's such a great game" : " kierros, niin näet miksi tämä on niin hyvä peli.",
	"What's happening in eRepublik?" : "Mitä tapahtuu eRepublikissa?",

// Etusivu sisäänkirjautuneena	
	"Advertise here" : "Mainosta täällä",
	"Congress election day" : "Eduskuntavaalipäivä",
	"Election day" : "Vaalipäivä",
	"Everyone" : "Kaikki",

	"International" : "Kansainväliset",
	"Latest" : "Uusimmat",
	"Military news" : "Sotatapahtumat",
	"more events" : "lisää tapahtumia",

	"more news" : "lisää uutisia",
	"National" : "Kansalliset",
	"Party election day" : "Puoluevaalipäivä",
	"President election day" : "Presidenttivaalipäivä",
	"Top rated" : "Suosituimmat",
	"Official" : "Viralliset",
	"one minute ago" : "minuutti sitten",

// Maintenance
	"Maintenance. We’ll be back soon." : "Huoltokatko. Palaamme pian.",

// Päätön kana
	"Page not found " : "Sivua ei löydy ",
	"The page you are looking for has not been found. However, if you believe that life isn't fair and the page should be at this address, you can " : "Sivua, jota etsit, ei löydy. Jos kuitenkin uskot, että elämä ei ole reilua ja sivun pitäisi olla täällä, voit ",
	"try again" : "yrittää uudelleen",
	" whenever you wish. " : " halutessasi. ",
	"Go to homepage" : "\&nbsp;&nbsp\<span class='dotted'>Etusivulle</span> | <a href='#' onclick='history.go(-1);return false;' class='dotted'>Takaisin edelliselle sivulle</a>\&nbsp;&nbsp\;",

// Eventit
	"16 - 23 Jan" : "16 - 23 tammikuuta",
	"16 - 23 Feb" : "16 - 23 helmikuuta",
	"16 - 23 Mar" : "16 - 23 maaliskuuta",
	"16 - 23 Apr" : "16 - 23 huhtikuuta",
	"16 - 23 May" : "16 - 23 toukokuuta",
	"16 - 23 Jun" : "16 - 23 kesäkuuta",
	"16 - 23 Jul" : "16 - 23 heinäkuuta",
	"16 - 23 Aug" : "16 - 23 elokuuta",
	"16 - 23 Sep" : "16 - 23 syyskuuta",
	"16 - 23 Oct" : "16 - 23 lokakuuta",
	"16 - 23 Nov" : "16 - 23 marraskuuta",
	"16 - 23 Dec" : "16 - 23 joulukuuta",
	"A new citizen fee was proposed" : "Uutta kansalaismaksua ehdotettiin",
	"A new minimum wage was proposed" : "Uutta minimipalkkaa ehdotettiin",
	"Finland now has a new welcoming message for new citizens." : "Suomella on nyt uusi tervetuloviesti",
	"Finland now has a new citizen fee" : "Suomella on nyt uusi kansalaismaksu",
	"No citizens found that match your criteria." : "Kukaan ei täsmää hakusanaasi.",
	"Party Presidents choose final Congress candidates today" : "Puolueen johtajat päättävät lopulliset ehdokaslistat tänään",
	"Place your Congress candidature" : "Aseta eduskuntaehdokkuutesi",
	"President of Finland proposed a new welcome message for new citizens." : "Suomen presidentti ehdotti uutta tervetuloviestiä uusille pelaajille",
	"The president impeachment proposal has been rejected" : "Presidentin erotusehdotus hylättiin",
	"The proposal for a minimum wage change was rejected" : "Ehdotus uudesta minimipalkasta hylättiin",
	"The proposal for a new citizen fee was rejected" : "Ehdotus uudesta kansalaismaksusta hylättiin",
	"The proposal for a new welcoming message for new citizens was rejected." : "Ehdotus uudesta uusienpelaajien viestistä hylättiin",
	"New taxes for defense system were proposed" : "Puolustusjärjestelmien verotusta ehdottettiin muutettavaksi",
	"New taxes for hospital were proposed" : "Sairaaloiden verotusta ehdotettiin muutettavaksi",
	"New taxes for diamonds were proposed" : "Timanttien verotusta ehdotettiin muutettavaksi",
	"New taxes for oil were proposed" : "Öljyn verotusta ehdotettiin muutettavaksi",
	"New taxes for wood were proposed" : "Puun verotusta ehdotettiin muutettavaksi",
	"New taxes for house were proposed" : "Talojen verotusta ehdotettiin muutettavaksi",
	"New taxes for moving tickets were proposed" : "Matkalippujen verotusta ehdotettiin muutettavaksi",
	"New taxes for weapon were proposed" : "Aseiden verotusta ehdotettiin muutettavaksi",
	"New taxes for iron were proposed" : "Raudan verotusta ehdotettiin muutettavaksi",
	"New taxes for gift were proposed" : "Lahjojen verotusta ehdotettiin muutettavaksi",
	"New taxes for grain were proposed" : "Viljan verotusta ehdotettiin muutettavaksi",
	"New taxes for food were proposed" : "Ruuan verotusta ehdotettiin muutettavaksi",
	"Taxes for food changed" : "Ruuan verotusta muutettiin",
	"Taxes for gift changed" : "Lahjojen verotusta muutettiin",
	"Taxes for weapon changed" : "Aseiden verotusta muutettiin",
	"Taxes for moving tickets changed" : "Matkalippujen verotusta muutettiin",
	"Taxes for grain changed" : "Viljan verotusta muutettiin",
	"Taxes for diamonds changed" : "Timanttien verotusta muutettiin",
	"Taxes for iron changed" : "Raudan verotusta muutettiin",
	"Taxes for oil changed" : "Öljyn verotusta muutettiin",
	"Taxes for wood changed" : "Puun verotusta muutettiin",
	"Taxes for house changed" : "Talojen verotusta muutettiin",
	"Taxes for hospital changed" : "Sairaaloiden verotusta muutettiin",
	"Taxes for defense system changed" : "Puolustusjärjestelmien verotusta muutettiin",
	"Tax proposal of tax changes for weapon were rejected" : "Aseiden veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for defense system were rejected" : "Puolustusjärjestelmien veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for hospital were rejected" : "Sairaaloiden veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for house were rejected" : "Talojen veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for wood were rejected" : "Puun veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for oil were rejected" : "Öljyn veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for iron were rejected" : "Raudan veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for diamonds were rejected" : "Timanttien veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for grain were rejected" : "Viljan veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for moving tickets were rejected" : "Matkalippujen veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for gift were rejected" : "Lahjojen veromuutosehdotus hylättiin",
	"Tax proposal of tax changes for food were rejected" : "Ruuan veromuutosehdotus hylättiin",

"New feature" : "Uusi ominaisuus",
// - My Places - //

// Profile
	
	" regions." : " aluetta",
	"Achievements" : "Saavutukset",
	"Add as a friend" : "Lisää ystäväksesi",
	"Advance 5 strength levels" : "Kehitä voimaa 5 tasoa",
	"Advanced 5 strength levels" : "Kehitti 5 tasoa voimaa",
	"Ambassador" : "Suurlähettiläs",
	"Assets" : "Varat",
	"Battle Hero" : "Taistelusankari",
	"Bio" : "Hahmo",
	"Career" : "Ura",
	"Change" : "Vaihda",
	"Change password" : "Vaihda salasana",
	"Change residence" : "Vaihda asuinpaikkaa",
	"Check your unlocked features" : "Tarkista avatut ominaisuudet",
	"Citizenship" : "Kansalaisuus",
	"Citizen Avatar" : "Avatar",
	"Compose message" : "Kirjoita viesti",
	"Congress Member" : "Eduskunnan jäsen",
	"Constructions" : "Rakennelmat",
	"Country President" : "Presidentti",
	"Donations list" : "Lahjoituslista",
	"edit profile" : "Muuta profiilia",
	"Edit Profile" : "Muuta profiilia",
	"Email must be valid for registration, so do not cheat" : "Osoitteen täytyy olla toimiva aktivointia varten, joten älä huijaa.",
	"Employee" : "Työnantaja",
	"Erepublik Age" : "eRepublik ikä",
	"eRepublik Birthday" : "eSyntymäpäivä",
	"Experience" : "Kokemus",
	"Fights" : "Taistelut",
	"Forfeit points" : "Rangaistuspisteet",
	"Friends" : "Ystävät",
	"Get Extra Storage" : "Lisää varastotilaa",
	"Get Gold" : "Osta kultaa",
	"Get Wellness" : "Hanki terveyttä",
	"Hard Worker" : "Ahkera työntekijä",
	"Inventory" : "Varasto",
	"Invite 10 people to eRepublik and help them reach level 6" : "Kutsu 10 ihmistä ja auta heidät tasolle 6 asti. ",
	"Invited 10 people to eRepublik and helped them reach level 6" : "Kutsui 10 ihmistä ja auttoi heitä saavuttamaan tason 6.",
	"item donations" : "tavaralahjoitukset",
	"Land" : "Raaka-aineet",
	"Level" : "Taso",
	"Manufacturing" : "Teollisuus",
	"Media Mogul" : "Mediamoguli",
	"monetary donations" : "rahalahjoitukset",
	"National Rank" : "Sijoitus",
	"No activity" : "Ei aktiivisuutta",
	"No political activity" : "Ei puolueessa",
	"Offer a gift" : "Anna lahja",
	"online" : "paikalla",
	"Party Member" : "Puolueen jäsen",
	"Press director" : "Lehti",
	"Reach 1000 subscribers to your newspaper" : "Saavuta 1000 tilaajaa sanomalehdellesi.",
	"Reach the highest total damage in one battle" : "Tee eniten vahinkoa taistelussa.",
	"Reached 1000 subscribers to your newspaper" : "Saavutti 1000 tilaajaa",
	"Reached the highest total damage in one battle" : "Teki eniten vahinkoa yhden taistelun aikana",
	"Remove friend" : "Poista ystävistäsi",
	"Report abuse" : "Ilmoita väärinkäytöksestä",
	"Represent your country (or eNation) in the real world" : "Edusta maatasi (tai eMaatasi) oikeassa maailmassa",
	"Resistance Hero" : "Vapaustaistelija",
	"Send message" : "Lähetä viesti",
	"Skills" : "Taidot:",
	"Society Builder" : "Yhteisön kasvattaja",
	"Start a resistance war and liberate that region" : "Aloita vastarinta ja vapauta alue",
	"Started a resistance war and liberated " : "Aloitti vastarinnan ja on vapauttanut ",
	"Strength" : "Voima",
	"Super Soldier" : "Super Sotilas",
	"Total damage\:" : "Kokonaisvahinko:",
	"Unemployed" : "Työtön",
	"Wellness" : "Terveys",
	"Win the Congress elections" : "Voita eduskuntavaalit",
	"Win the Presidential elections" : "Voita presidentinvaalit",
	"Won the Congress elections" : "Pääsi eduskuntaan",
	"Won the Presidential elections" : "Voitti presidentinvaalit",
	"Work for 30 days in a row" : "Työskentele 30 päivää putkeen",
	"Worked 30 days in a row" : "Työskenteli 30 päivää putkeen",
	"Your birthday" : "Syntymäpäiväsi",
	"Your email here" : "Sähköpostiosoitteesi",
	"Your friendship request has been sent." : "Sinun ystävyyspyyntösi on lähetetty.",

	//Muuttaminen
		"Current location" : "Nykyinen sijainti",
		"Moving ticket" : "Lipun taso",
		"New location:" : "Uusi sijainti",
		"Please choose a country you want to live in." : "Valitse maa mihin haluat muuttaa",
		"Please select a country" : "Valitse maa",
		"Please choose the region you want to live in" : "Valitse alue mihin haluat muuttaa",
		"You cannot move in this country because it is involved in a war with your country" : "Et voi muuttaa tähän maahan, koska se on maasi kanssa sodassa.",
		"You do not own a moving ticket. You can buy moving tickets from the marketplace." : "Sinulla ei ole matkalippua. Voit ostaa lipun marketista",
		"You have to resign from your current job first" : "Sinun täytyy erota työpaikastasi muuttaaksesi",
		"You must resign from your party first" : "Sinun täytyy erota puolueestasi ennen muuttoa",

// Yhtiö
	"Buy from market" : "Osta marketista",
	"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "Etsi työpaikka tai hanki yhtiö. Työpaikasta saat päivittäin rahaa, kunhan muistat työskennellä (älä huolehdi, työnteko eRepublikissa on paljon hauskempaa ja nopeampaa kuin oikeassa elämässä).",
	"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "Oman yhtiön omistaminen voi olla suuri hyvinvoinnin lähde, mutta varmista aluksi, että sinulla on tarpeeksi rahaa maksaa työntekijöitesi palkat, jotta et menisi konkurssiin.",
	"My places > Company" : "My places > Yhtiö",
	"Own a company" : "Omista yhtiö",
	"You do not have a job" : "Sinulla ei ole töitä",
	"Your companies" : "Sinun yhtiösi",

	//Yrityksen luonti
		"Company details" : "Yhtiön tiedot",
		"Create company" : "Luo yhtiö",
		"Please choose the industry" : "Valitse ala",

	// Yrityksen muokkaus
		"Company account" : "Yrityksen tili",
		"Company for sale" : "Yhtiö myynnissä",
		"Company logo" : "Yhtiön logo",
		"Company name" : "Yhtiön nimi",
		"Cost" : "Hinta",
		"Disscusion area" : "Keskustelualue",
		"Edit company details" : "Muuta yhtiön tietoja",
		"Edit details" : "Muuta tietoja",
		"Enter a price between 1 - 5000 Gold" : "Hinnan täytyy olla 1 - 5000 kullan välillä",
		"only" : "vain ",
		" pictures allowed" : " kuvat ovat sallittuja",
		"Sell company" : "Myy yhtiö",
		"Selling Price" : "Myyntihinta",		

	//Tilit
		"Accounts" : "Tilit",
		"Company accounts" : "Yhtiön tilit",
		"Finances" : "Rahat",
		"You can exchange money at the " : "Rahanvaihtopaikka: ",
		"Your accounts" : "Sinun tilisi",
	
	// Toimisto	
		"Come back tomorrow." : "Tule takaisin huomenna.",
		"Office" : "Toimisto",
		"Resign" : "Eroa",
		"Work" : "Tee työt",
		"You are now an employee of this company" : "Olet nyt tämän yhtiön työntekijä",
		"You have already worked today." : "Olet jo työskennellyt tänään.",
		"You have not worked today." : "Et ole työskennellyt tänään.",

	// Työskenteleminen
		"Back to company" : "Takaisin yhtiöön",
		"Basic productivity" : "Tuottavuus",
		"Construction skill" : "Taidon kasvu",
		"Land skill" : "Taidon kasvu",
		"Manufacturing skill" : "Taidon kasvu",
		"Total productivity" : "Kokonaistuotto",
		"Work Bonus" : "Työskentelybonus",

	//Työntekijät
		"Company page" : "Yhtiön sivu",
		"Daily salary" : "Päivittäinen palkka",
		"Employees" : "Työntekijät",
		"Fire" : "Erota",
		"Last presence" : "Viimeksi paikalla",
		"Minimum country wage :" : "Maan minimipalkka :",
		"Show all employees" : "Näytä kaikki työntekijät",
		"Skill" : "Taito",
		"Today" : "Tänään",
		"Yesterday" : "Eilen",
		"You have no employees. Post a job offer on your company homepage." : "Sinulla ei ole työntekijöitä. Yhtiön etusivulta voit laittaa työtarjouksia.",

	//Tuotteet
		"Cost " : "Hinta",
		"Defense System" : "Puolustusjärjestelmä",
		"Diamonds" : "Timantit",
		"Food" : "Ruoka",
		"Gift" : "Lahja",
		"Grain" : "Vilja",
		"Hospital" : "Sairaala",
		"House" : "Talo",
		"Iron" : "Rauta",
		"Level&nbsp;1" : "Taso 1",
		"Level&nbsp;2" : "Taso 2",
		"Level&nbsp;3" : "Taso 3",
		"Level&nbsp;4" : "Taso 4",
		"Level&nbsp;5" : "Taso 5",
		"Moving Tickets" : "Matkaliput",
		"Oil"  : "Öljy",
		"Products" : "Tuotteet",
		"Quality level" : "Laatu",
		"Stock" : "Varasto",
		"Upgrade quality level" : "Nosta firman tasoa",
		"Weapon" : "Ase",
		"Wood" : "Puu",

	//Raaka-aineet
		"Buy raw materials" : "Osta raaka-aineita",	
		"Donate raw materials" : "Lahjoita raaka-aineita",	
		"Raw materials" : "Raaka-aineet",
		"Show all donations" : "Lahjoituslista",

	//Myyntiosio
		"Amount" : "Määrä",
		"Buy export license" : "Osta vientilisenssi",
		"Buy market license" : "Osta vientilisenssi",
		"Go to marketplace" : "Markettiin",
		"Jobs available in this company" : "Vapaa työpaikat",
		"Market offers" : "Tarjoukset",
		"Price with taxes" : "Verollinen hinta",
		"Price" : "Hinta",
		"Price" : "Hinta",
		"Sell products here" : "Myy tuotteita täällä",
		"The company cannot trade with this country due to a trade embargo." : "Yhtiö ei voi myydä tuotteita maahan sodasta johtuvan kauppasaarron takia.",
		"The company cannot trade with this country due to a trade embargo decided by Congress." : "Yhtiö ei voi myydä tuotteita maahan kongressin päättämän kauppasaarron takia.",
		"The company offers no products in this market" : "Yhtiö ei myy tuotteita tämän maan markkinoilla.",	
		"You cannot trade with this country as you are at war with it" : "Et voi käydä kauppaa tämän maan kanssa, koska olet sodassa sen kanssa.",

	//Vapaat työpaikat
		"Jobs available in this company" : "Vapaat työpaikat",
		"Minimum Skill" : "Minimi taito",
		"You do not have any active job offers" : "Sinulla ei ole aktiivisia työtarjouksia",	
		"Your job offer has been successfully posted" : "Työtarjous on lisätty onnistuneesti",

// - ARMEIJA - //
	"Active wars list" : "Aktiiviset sodat",
	"Captain" : "Kapteeni",
	"Colonel" : "Eversti",
	"Corporal" : "Korpraali",
	"Field Marshal" : "Sotamarsalkka",
	"Force" : "Voima",
	"General" : "Kenraali",
	"Lieutenant" : "Luutnantti",
	"Military achievements" : "Sotasaavutukset",
	"Military rank" : "Sotilasarvo",
	"Private" : "Alokas",
	"Sergeant" : "Kersantti",
	"Train" : "Harjoittele",
	"You have not trained today" : "Et ole harjoitellut vielä tänään",
	"You have trained today. You can train again tomorrow." : "Olet jo harjoitellut tänään. Voit harjoitella huomenna uudelleen.",
	
	//Harjoittelu
		"Back to army" : "Takaisin armeijaan",
		"Show active wars" : "Näytä aktiiviset sodat",
		"Strength gained" : "Voiman kasvu",
		"Train bonus" : "Harjoittelubonus",
		"Training" : "Harjoittelu",

	//Sotalista
		"1 active battles" : "1 taistelu",
		"1 allies" : "1 liittolainen",
		"Active wars" : "Aktiiviset sodat",
		"All Alliances" : "Kaikki liitot",
		"All resistance wars" : "Vapaussodat",
		"All wars" : "Kaikki sodat",
		"Alliances" : "Liitot",
		"Average strength" : "Voimakeskiarvo",
		"Conquest wars" : "Valloitussodat",
		"Countries involved" : "Maat mukana",
		"Ended wars" : "Loppuneet sodat",
		"Military force" : "Armeijan voima",
		"no active battles" : "ei taisteluja",
		"no allies" : "ei liittolaisia",
		"Resistance wars" : "Vapaussodat",
		"show active battles" : "näytä aktiiviset taistelut",
		"Started by" : "Aloittaja: ",
		"started by" : "aloittaja: ",
		"Wars" : "Sodat",
		"War status" : "Sodan tila",
		"War types" : "Sodat",

	//War / Battlefield
		" fights" : " iskua",
		"Attackable on President's decision" : "Mahdollisuus hyökätä presidentin päätoksellä",
		"Battle history" : "Taisteluhistoria",
		"Conquer" : "Vaarassa",
		"Damage" : "Vaurio",
		"Defense Points" : "Puolustuspisteet",
		"Fight" : "Taistele!",
		"Go to Battlefield" : "Taistelukentälle",
		"Hero" : "Sankari",
		"Organizations cannot participate in a battle." : "Organisaatiot eivät voi taistella",
		"Secure" : "Turvassa",
		"show finished battles" : "loppuneet taistelut",
		"Still active" : "Vieläkin aktiivinen",
		"There are no active battles in this war" : "Tässä sodassa ei ole aktiivisia taisteluita.",
		"There are no finished battles in this war." : "Tässä sodassa ei ole loppuneita taisteluja.",
		"There are no resistance wars in this country." : "Tässä maassa ei ole aktiivisia vapaussotia.",
		"until the region can be occupied or secured" : "kunnes alue voidaan vallata tai varmistaa",
		"War" : "Sota",
		"Wars list" : "Sotalista",
		"You can get wellness from:" : "Jos tarvitset terveyttä mene sairaalaan » ",
		"You cannot join this fight because your country is not involved in the war" : "Et voi osallistua taisteluun, koska maasi ei ole osallisena sotaan.",
		"You cannot join this fight because your wellness must be at least 40. You can get wellness from " : "Jotta voit taistella, tarvitset vähintään 40 pistettä terveyttä. Saat terveyttä sairaalasta » ",
		"You need at least 35 Experience Points to join this fight" : "Tarvitset vähintään 35 kokemuspistettä ottaaksesi osaa tähän taisteluun",

	//FIGHT!/TAISTELE!
		"Amazing fight, Captain!" :  "Hämmästyttävä taistelu, Kapteeni!",
		"Amazing fight, Colonel!" :  "Hämmästyttävä taistelu, Eversti!",
		"Amazing fight, Corporal!" :  "Hämmästyttävä taistelu, Korpraali!",
		"Amazing fight, Field Marshal!" :  "Hämmästyttävä taistelu, Sotamarsalkka!",
		"Amazing fight, General!" :  "Hämmästyttävä taistelu, Kenraali!",
		"Amazing fight, Lieutenant!" :  "Hämmästyttävä taistelu, Luutnantti!",
		"Amazing fight, Private!" :  "Hämmästyttävä taistelu, Alokas!",
		"Amazing fight, Sergeant!" :  "Hämmästyttävä taistelu, Kersantti!",
		"Back to battlefield" : "Taistelukentälle",
		"Barbaric fight, Captain!" :  "Barbaarinen taistelu, Kapteeni!",
		"Barbaric fight, Colonel!" :  "Barbaarinen taistelu, Eversti!",
		"Barbaric fight, Corporal!" :  "Barbaarinen taistelu, Korpraali!",
		"Barbaric fight, Field Marshal!" :  "Barbaarinen taistelu, Sotamarsalkka!",
		"Barbaric fight, General!" :  "Barbaarinen taistelu, Kenraali!",
		"Barbaric fight, Lieutenant!" :  "Barbaarinen taistelu, Luutnantti!",
		"Barbaric fight, Private!" :  "Barbaarinen taistelu, Alokas!",
		"Barbaric fight, Sergean!" :  "Barbaarinen taistelu, Kersantti!",
		"Basic damage" : "Vaurio",
		"Buy Wellness Box" : "Osta terveyttä ",
		"Fight Again" : "Taistele uudelleen",
		"Fight bonus" : "Taistelubonus",
		"Fight for defenders" : "Auta puolustajia",
		"Fight for resistance" : "Auta vastarintaa",
		"Good fight, Captain!" : "Hyvä taistelu, Kapteeni!",
		"Good fight, Colonel" : "Hyvä taistelu, Eversti!",
		"Good fight, Corporal!" : "Hyvä taistelu, Korpraali!",
		"Good fight, Field Marshal!" : "Hyvä taistelu, Sotamarsalkka!",
		"Good fight, General" : "Hyvä taistelu, Kenraali!",
		"Good fight, Lieutenant!" : "Hyvä taistelu, Luutnantti!",
		"Good fight, Private!" : "Hyvä taistelu, Alokas!",
		"Good fight, Sergeant!" : "Hyvä taistelu, Kersantti!",
		"Impressive fight, Captain!" : "Vaikuttava taistelu, Kapteeni!",
		"Impressive fight, Colonel!" : "Vaikuttava taistelu, Eversti!",
		"Impressive fight, Corporal!" : "Vaikuttava taistelu, Korpraali!",
		"Impressive fight, Field Marshal!" : "Vaikuttava taistelu, Sotamarsalkka!",
		"Impressive fight, General!" : "Vaikuttava taistelu, Kenraali!",
		"Impressive fight, Lieutenant!" : "Vaikuttava taistelu, Luutnantti!",
		"Impressive fight, Private!" : "Vaikuttava taistelu, Alokas!",
		"Impressive fight, Sergeant!" : "Vaikuttava taistelu, Kersantti!",
		"Total damage" : "Kokonais vaurio",
		"Weak fight, Captain!" : "Heikko taistelu, Kapteeni!",
		"Weak fight, Colonel" : "Heikko taistelu, Eversti!",
		"Weak fight, Corporal!" : "Heikko taistelu, Korpraali!",
		"Weak fight, Field Marshal!" : "Heikko taistelu, Sotamarsalkka!",
		"Weak fight, General" : "Heikko taistelu, Kenraali!",
		"Weak fight, Lieutenant!" : "Heikko taistelu, Luutnantti!",
		"Weak fight, Private!" : "Heikko taistelu, Alokas!",
		"Weak fight, Sergeant!" : "Heikko taistelu, Kersantti!",
		"Weapon quality" : "Aseen laatu",

// - PUOLUE - //
	"Congratulations, you are now a party member!" : "Onnittelut, olet nyt puolueen jäsen!",
	"Create new" : "Luo uusi",
	"Donate Gold" : "Lahjoita kultaa",
	"Join a party" : "Liity puolueeseen",
	"Join party" : "Liity",
	"Join" : "Liity",
	"Members"  : "Jäsenet",
	"Orientation" : "Suuntautuminen",
	"Party Member , Congress Member" : "Puolueen jäsen, Eduskunnassa",
	"Party members" : "Puolueen jäsenet",
	"Party page" : "Puolueen sivu",
	"See all members" : "Kaikki jäsenet",
	"Show all members" : "Kaikki jäsenet",
	"You are not a member of a party" : "Et ole puolueen jäsen",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Voit liittyä puolueeseen puolueiden sivulta tai voit luoda oman puolueen, jos et löydä itsellesi sopivaa. Puolueen jäsenyys antaa sinulle mahdollisuuden päästä eduskuntaan tai jopa presidentiksi.",

	// Vaalit
		" candidate " : "ehdokas",
		" congress member" : " eduskunnan jäsen",
		"Candidate" : "Asetu ehdolle",
		"Congress member candidates" : "Eduskuntavaaliehdokkaat",
		"Country presidency" : "Maan presidenttiys",
		"Edit  the link to your presentation where you explain why citizens should vote for you in the Congress elections" : "Muokkaa vaalimainoksesi linkkiä",
		"Edit presentation" : "Muuta esittelyäsi",
		"link to an external web address or a " : "linkki ulkopuoliselle sivulle, artikkeliin tai ",
		"No candidate proposed" : "Ei ehdokasta",
		"No candidates applied yet" : "Ei vielä ehdokkaita",
		"of congress" : "",
		"One" : "Yksi",
		"one" : "Yksi",
		"Our next candidate" : "Seuraava ehdokkaamme",
		"Partial Results" : "Osittaiset tulokset",
		"Party candidates" : "Puolueen ehdokkaat",
		"Party presidency" : "Puolueen puheenjohtajuus",
		"Party President" : "Puolueen johtaja",
		"Presidential candidates" : "Presidenttiehdokkaat",
		"private forum" : "foorumille",
		"Provide a link to your presentation where you explain why citizens should vote for you in the congressional elections" : "Linkki vaalimainokseesi, jossa kerrto kansalaisille, että miksi juuri sinua pitäisi äänestää.",
		"Resign candidacy" : "Eroa ehdokkuudestasi",
		"Run for congress|Congress" : "Asetu ehdolle",
		"Show candidate list" : "Ehdokaslista",
		"Show candidates list" : "Ehdokaslista",
		"Show proposed members" : "Eduskuntavaaliehdokkaat",
		"Show results" : "Näytä tulokset",
		"Winner" : "Voittaja",

	//Puolueen luonti
		"6-30 characters max" : "6-30 merkkiä maksimissaan",
		"Create party" : "Luo puolue",
		"Economical orientation" : "Taloudellinen suuntautuminen",
		"Party details" : "Puolueen tiedot",
		"Party logo" : "Puolueen logo",	
		"Party name" : "Puolueen nimi",
		"Requirements" : "Vaatimukset", 
		"Social orientation" : "Sosiaalinen suuntautuminen",
		"Your account" : "Sinun tilisi",
// ORGANISAATIOT
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Kirjautuaaksesi organisaatiollesi, täytyy sinun kirjautua ulos ja kirjautua takaisin sisään käyttäen organisaation nimeä ja salasanaa.",
	"Logout" : "Uloskirjaus",
	"My Organizations" : "Organisaatiot",
	"Organizations created by you:" : "Sinun luomat organisaatiot:",

	//Luonti
		"4-30 characters max" : "4-30 kirjainta",
		"Complete the challenge:" : "Suorita haaste",
		"Create organization" : "Luo organisaatio",
		"eRepublik region" : "Alue",
		"Minimum number of characters is 6" : "Vähintään 6 kirjainta.",
		"Organization details" : "Organisaation tiedot",
		"Organization logo" : "Organisaation logo",
		"Organization name" : "Organisaation nimi",
		"Retype password" : "Kirjoita salasana uudelleen",
		"Your email address:" : "Sähköpostiosoitteesi",	

// Marketti
	"All levels" : "Kaikki tasot",
	"Buy" : "Osta",
	"Industry" : "Ala",
	"Level 1" : "Laatu 1 (Q1)",
	"Level 2" : "Laatu 2 (Q2)",
	"Level 3" : "Laatu 3 (Q3)",
	"Level 4" : "Laatu 4 (Q4)",
	"Level 5" : "Laatu 5 (Q5)",
	"Market" : "Maa",
	"No products in this market" : "Ei tuotteita marketissa",
	"Not enough money in your account" : "Tililläsi ei ole tarpeeksi rahaa.",
	"Please select an Industry to see the marketplace offers" : "Valitse tuote nähdäksesi tarjoukset",
	"Prev" : "Edel",
	"Provider" : "Myyjä",
	"Quality Level" : "Laatu",
	"Quality" : "Laatu",
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Raaka-aineita voi ostaa vain käyttäen yhtiön tiliä (valitse oikeasta yläkulmasta, jos sinulla on yhtiö) tai organisaatiolla.",
	"The offer is no longer valid." : "Tarjous ei ole enää voimassa",
	"There are no offers on the marketplace for this industry" : "Tämän alan tuotteita ei myydä tämän maan markkinoilla",
	"You have not specified the amount of products you wish to buy." : "Et valinnut ostettavan tuotteen määrää",

//Valuuttamarketti
	"Amount to buy" : "Määrä",
	"Exchange rate" : "Vaihtokurssi",
	"Monetary Market" : "Valuuttamarketti",
	"Post new offer" : "Uusi tarjous",
	"Rec exchange rate" : "Suositeltu vaihtokurssi",
	"Sell" : "Myy",
	"Show all offers" : "Kaikki tarjoukset",
	"Show my offers" : "Tarjoukseni",

//Työvoimatoimisto
	"All skills" : "Kaikki",
	"All" : "Kaikki",
	"Apply" : "Hyväksy",
	"Minimum skill" : "Minimi taito",
	"Skill level" : "Taito",
	"There are no job offers matching the selected criteria." : "Määritteitä vastaavia työtarjouksia ei löydy.",

//Myytävät yhtiöt
	"All industries" : "Kaikki alat",
	"Company market" : "Myytävät yhtiöt",
	"Create new company" : "Luo uusi yhtiö",

// - Info - //

// Maat
	"Argentina" : "Argentiina",
	"Austria" : "Itävalta",
	"Belgium" : "Belgia",
	"Bosnia and Herzegovina" : "Bosnia ja Hertsegovina",
	"Brazil" : "Brasilia",
	"Canada" : "Kanada",
	"China" : "Kiina",
	"Colombia" : "Kolumbia",
	"Croatia" : "Kroatia",
	"Czech Republic" : "Tsekki",
	"Denmark" : "Tanska",
	"Estonia" : "Viro",
	"Finland" : "Suomi",
	"France" : "Ranska",
	"Germany" : "Saksa",
	"Greece" : "Kreikka",
	"Hungary" : "Unkari",
	"Ireland" : "Irlanti",
	"Italy" : "Italia",
	"Japan" : "Japani",
	"Lithuania" : "Liettua",
	"Malaysia" : "Malesia",
	"Mexico" : "Meksiko",
	"Moldavia" : "Moldova",
	"Netherlands" : "Hollanti",
	"North Korea" : "Pohjois-Korea",
	"Norway" : "Norja",
	"Philippines" : "Philippiinit",
	"Poland" : "Puola",
	"Portugal" : "Portugali",
	"Russia" : "Venäjä",
	"South Africa" : "Etelä-Afrikka",
	"South Korea" : "Etelä-Korea",
	"Spain" : "Espanja",
	"Sweden" : "Ruotsi",
	"Switzerland" : "Sveitsi",
	"Thailand" : "Thaimaa",
	"Turkey" : "Turkki",
	"Ukraine" : "Ukraina",
	"United Kingdom" : "Iso-Britannia",
	"Venezuela" : "Venezuela",
	"World" : "Maailma",

//Tilastot
	"All countries" : "Kaikki maat",
	"Companies" : "Yhtiöt",
	"Countries" : "Maat",
	"Newspapers" : "Sanomalehdet",
	"Parties" : "Puolueet",

"Top Citizens" : "Parhaat kansalaiset",
	"Experience points" : "Kokemuspisteet",
	"Name" : "Nimi",
	"No." : "Nro.",

"Top Companies" : "Parhaat yhtiöt",
	"All regions" : "Kaikki alueet",
	"Defense system" : "Puolustusjärjestelmä",
	"Moving tickets" : "Matkaliput",
	"No. of Employees" : "Työntekijöiden lkm.",
	"Sales" : "Myynnit",

"Top News" : "Tilatuimmat lehdet",
	"Subscribers" : "Tilaajia",

"Top Countries" : "Suurimmat maat",
	"( Average Experience )" : "(Keskiarvoiset kokemuspisteet) ",
	"Average military strength" : "Keskiarvoinen voima",
	"Exports" : "Vienti",
	"GDP" : "BTK",
	"Gross Domestic Product" : "Bruttokansatuote",
	"Imports" : "Tuonti",
	"No. of companies" : "Yhtiöiden lukumäärä",
	"No. of newspapers" : "Sanomalehtien lkm.",
	"Population number" : "Asukasluku",
	"Unemployment rate" : "Työttömyysprosentti",

"Top Parties" : "Suurimmat puolueet",

// Sosiaaliset tilastot ja maiden sivujen ylävalikko
	"Administration" : "Hallitus",
	"Average citizen level" : "Keskimääräinen kansalaisten taso",
	"Citizenship requests" : "Kansalaisuushakemukset",
	"Citizen fee" : "Kansalaismaksu",
	"Citizens" : "Kansalaiset",
	"details" : "tiedot",
	"Economy" : "Talous",
	"Military" : "Armeija",
	"New citizens today" : "Uusia kansalaisia tänään",
	"On the Map" : "Kartalla",
	"Online now": "Nyt paikalla",
	"Online citizens" : "Nyt paikalla",
	"Politics" : "Politiikka",
	"Society" : "Yhteisö",
	"Total citizens" : "Kansalaisia yhteensä",
	"View requests" : "Näytä hakemukset",
	"Who" : "Ketkä?",
		"You have successfully applied for citizenship in this country. Your request has been saved and is waiting for congressional approval. You will be notified by an alert whenever your request has been processed." : "Olet onnistuneesti lähettänyt kansalaihakemuksen. Pyyntösi on tallennettu odottamaan eduskunnan hyväksyntää. Sinulle tulee ilmoitus siitä, kun hakemuksesi on hyväksytty.",
		"   Show citizenship applications    " : "Näytä kansalaisuushakemukset",
		"Citizenship applications" : "Kansalaisuushakemukset",
		"My citizenship request" : "Kansalaishakemukseni",
		"You don't have any citizenship request for this country. Do you wish to apply for citizenship?" : "Sinulla ei ole kansalaisuushakemusta tähän maahan. Haluatko hakea kansalaisuutta?",
		"Apply for citizenship" : "Hae kansalaisuutta",
		"Approved" : "Hyväksytty",
		"Citizen" : "Kansalainen",
		"Details" : "Tietoja",
		"Expires:" : "Vanhenee:",
		"Resident since:" : "Muuttopäivä",
		"Approved on" : "Hyväksytty",
		"Approved by" : "Hyväksyjä",
		"Next" : "Seur.",
		"Prev" : "Edel.",
		"This message will be displayed to the members of Congress who will be able to accept or deny your citizenship request." : "Tämä viesti näkyy eduskunnan jäsenille, ketkä voivat hyväksyä tai hylätä hakemuksesi.",
		"Please type in a short description why you are applying for citizenship" : "Kirjoita pieni viesti, jossa kerrot miksi haluat kansalaisuuden",
		"You have " : "Sinulla on ",
		" characters left" : " kirjainta jäljellä",
		"Or, " : "Tai, ",
		"cancel" : "peru",
		" request." : " hakemus",
		"There are no pending citizenship applications." : "Yhtään hyväksyntää odottavaa hakemusta ei ole.",
		"There aren't any approved citizenship applications." : "Yhtään hyväksyttyä hakemusta ei ole",
	//Alueiden sivut
		"Cost:" : "Hinta:",
		"Country - Society" : "Maa - Yhteisö",
		"Country" : "Maa",
        	"Heal" : "Paranna",
		"Neighbors" : "Naapurit",
		"Population": "Asukasluku",
		"Productivity" : "Tuottavuus",
		"Resistance War active" : "Aktiivinen vapaussota",
		"Resistance War Active" : "Aktiivinen vapaussota",	
		"Resistance War" : "Vapaussota",
		"Start a Resistance War" : "Aloita vapaussota",
		"Start a resistance war" : "Aloita vapaussota",
		"There are no discovered resources in this region yet" : "Alueella ei ole raaka-aineita.",
		"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Et voi aloittaa vapaussotaa tällä alueella, koska se kuuluu jo alkuperäiselle omistajalle.",
		"You do not have the necessary amount of Gold to start a resistance war." : "Sinulla ei ole tarpeeksi kultaa vapaussodan aloittamiseen.",

		//Suomen alueet
			"Aland" : "Ahvenanmaa",
			"Eastern Finland" : "Itä-Suomi",
			"Lapland" : "Lappi",
			"Southern Finland" : "Etelä-Suomi",
			"Western Finland" : "Länsi-Suomi",

	// talous
		"All accounts" : "Kaikki tilit",
		"Average" : "Keskimääräinen",
		"Country trading embargoes" : "Kauppasaarrot",
		"defense system" : "puolustusjärjestelmä",
		"diamonds" : "timantit",
		"Expires tomorrow" : "Loppuu huomenna",
		"food" : "ruoka",
		"gift" : "lahja",
		"Gold" : " Kultaa",
		"GOLD" : "KULTA",
		"grain" : "vilja",
		"Gross domestic product (GDP)" : "Brutto kansan tuote (BTK)",
		"hospital" : "sairaala",
		"house" : "talo",
		"Import Tax" : "Tuontivero",
		"Income Tax" : "Tulovero",
		"Inflation" : "Inflaatio",
		"iron" : "rauta",
		"Minimum" : "Minimi",
		"Monthly exports" : "Kuukautinen vienti",
		"Monthly imports" : "Kuukautinen tuonti",
		"moving tickets" : "liput",
		"oil"  : "öljy",
		"Salary" : "Palkat",
		"Taxes" : "Verot",
		"This country can trade with any other country in eRepublik." : "Tämä maa ei ole asettanut ketään kauppasaartoon, eikä kukaan ole saartanut heitä.",
		"Treasury" : "Valtion kassa",
		"VAT" : "ALV",
		"weapon" : "ase",
		"wood" : "puu",

//Poliittiset tilastot
	"Election results" : "Vaalien tulokset",
	"Next elections" : "Seuraavat vaalit",
	"President" : "Presidentti",


// Maan hallitus
	"Accepted" : "Hyväksytty",
	"ACCEPTED" : "HYVÄKSYTTY",
	"Congress" : "Eduskunta",
	"Country Administration" : "Maan hallitus",
	"For this law to be considered accepted it needs 66% of the Congress votes." : "Jotta tämä ehdotus katsotaan hyväksytyksi, täytyy 66% kongressista äänestää sen puolesta.",
	"No" : "Ei",
	"Only congress members and country presidents have the right to vote." : "Vain eduskunnan jäsenet ja presidentti voivat osallistua äänestykseen.",
	"Pending" : "Käynnissä",
	"Proposed by" : "Ehdottaja: ",
	"Rejected" : "Hylätty",
	"REJECTED" : "HYLÄTTY",
	"Show all law proposals" : "Näytä kaikki ehdotukset",
	"The law voting process takes 24 hours." : "Lakiäänestyksessä kestää 24 tuntia.",
	"Yes" : "Jaa",
	"You are not a president or a congress member in this country." : "Et ole tämän maan presidentti tai eduskunnan jäsen",

	//Edustajat
		"Ammount" : "Määrä",
		"Debate location (optional)" : "Keskustelualue (ei pakollinen)",
		"Hello, Congress Member" : "Hei, kansanedustaja",
		"Minimum wage" : "Minimipalkka",
		"New citizen fee" : "Uusi kansalaismaksu",
		"Set new" : "Aseta uusi",
		"Value added tax (VAT)" : "Arvonlisävero (ALV)",
		"Value Added Tax" : "Arvonlisävero (ALV)",


	"Law proposals" : "Lakiehdotukset",
		"Alliance" : "Liitto",
		"Attention: No VAT tax for raw materials " : "Huomio: Raaka-aineilla ei ole ALV:tä",
		"Buy Constructions" : "Osta rakennelmia",
		"Buy Constructions: Defense System" : "Osta rakennelmia: Puolustusjärjestelmä",
		"Buy Constructions: Hospital" : "Osta rakennelmia: Sairaala",
		"Debate Area" : "Keskustelu",
		"Declare War" : "Julista sota",
		"Issue Money" : "Paina rahaa",
		"Minimum Wage" : "Minimipalkka",
		"Mutual Protection Pact" : "Liitto (MPP)",
		"New Citizen Fee" : "Uusi kansalaismaksu",
		"New Citizen Message" : "Uusi kansalaisviesti",
		"New" : "Uusi",
		"Old" : "Vanha",
		"Peace Proposal" : "Rauhan ehdotus",
		"President Impeachment" : "Presidentin erotus",
		"Tax change: Defense System" : "Veromuutos: Puolustusjärjestelmät",
		"Tax change: Diamonds" : "Veromuutos: Timantit",
		"Tax change: Food" : "Veromuutos: Ruoka",
		"Tax change: Gift" : "Veromuutos: Lahjat",
		"Tax change: Grain" : "Veromuutos: Vilja",
		"Tax change: Hospital" : "Veromuutos: Sairaalat",
		"Tax change: House" : "Veromuutos: Talot",
		"Tax change: Iron" : "Veromuutos: Rauta",
		"Tax change: Moving Tickets" : "Veromuutos: Matkaliput",
		"Tax change: Oil" : "Veromuutos: Öljy",
		"Tax change: Weapon" : "Veromuutos: Aseet",
		"Tax change: Wood" : "Veromuutos: Puu",
		"Trading Embargo" : "Kauppasaarto",

// - Community - //

//Kutsu ystäviä
	"Accepted invites" : "Hyväksytyt kutsut",
	"Add from address book" : "Lisää osoitekirjasta",
	"All invites" : "Kaikki kutsut",
	"Bonus" : "Hyöty",
	"Date sent" : "Lähetyspäivä",
	"Email" : "Sähköposti",
	"Experience level" : "Kokemustaso",
	"invited via refferer link" : "Kutsuttu linkin kautta",
	"Invites status" : "Kutsujen tila",
	"Invites" : "Kutsut",
	"Not yet a citizen" : "\&nbsp;\Ei vielä kansalainen",
	"Pending invites" : "Odottavat kutsut",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." : "Laita tämä linkki foorumeille, blogeihin, lähetä pikaviestipalvelussa tai lähetä se sähköpostitse. Kun linkistä rekisteröityy pelaaja ja hän saavuttaa tason 6, saat 5 kultaa.",
	"Send email invite" : "Lähetä kutsu sähköpostitse",
	"Status" : "Tila",
	"Track invites" : "Jäljitä kutsuja",
	"Track Invites" : "Kutsujen jäljitys",
	"Use commas to separate multiple email addresses" : "Erota sähköpostiosoitteet pilkulla",
	"View the status of your invites and bonuses" : "Katso lähetettyjen kutsujen tilaa",
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Kun kutsumasi kansalainen saavuttaa tason 6, saat 5 kultaa.",
	"Your friend's email:" : "Ystäväsi sähköpostiosoite:",
	"Your name:" : "Sinun nimesi",
	"Your personal invitation link" : "Oma kutsulinkkisi",

//Vaalit
	"% of votes" : "% äänistä",
	"Congressional elections" : "Eduskuntavaalit",
	"Election" : "Vaali",
	"Final Results" : "Lopputulokset",
	"Member of" : "Puolue",
	"Month/Year" : "Kuukausi/Vuosi",
	"No data available yet" : "Ei tietoja saatavilla",
	"No presentation" : "Ei esittelyä",
	"No. of votes" : "Äänien lkm.",
	"Party elections" : "Puoluevaalit",
	"Presentation" : "Esittely",
	"Presidential elections" : "Presidentinvaalit",
	"Supporting parties" : "Kannattavat puolueet",

//Uutiset
	"Latest events" : "Tuoreet tapahtumat",
	"Latest news" : " Viimeisimmät uutiset",
	"Top rated news" : "Suosituimmat uutiset",

//Työkalut
	"Badges" : "Merkit",
	"Latest alliances" : "Uusimmat liitot",
	"Latest military events" : "Viimeisimmät sotatapahtumat",
	"Latest shouts" : "Uusimman shoutit",
	"Latest wars" : "Uusimmat sodat",
	"RSS Feed" : "RSS-syötteet",


// forum
	"Announcements" : "Ilmoitukset",
	"Asking other citizens questions that are not answered by Wiki or FAQ." : "Jos haluat tietää jotain eRepublikista ja sitä ei löydy wikistä, kysy sitä täällä.",
	"Business ideas and loan notices" : "Markkinaideat ja lainat.",
	"Buy or sell companies" : "Osta tai myy yrityksiä",
	"Buy or sell hospitals and defense system" : "Osta tai myy sairaaloita ja puolustusjärjestelmiä.",
	"Companies looking for workers" : "Työnantaja etsii työntekijää",
	"Content unrelated to eRepublik (that does not offend other citizens)." : "Kaikki mikä ei liity eRepublikkiin",
	"Contests" : "Kilpailut",
	"Contracts" : "Sopimukset",
	"Debates concerning economic activities." : "Keskustelua taloustilanteesta.",
	"Discussions" : "Keskustelut",
	"Editors' playground (event coverages &amp; wacky articles)." : "Päätoimittajien leikkikenttä, keskustele artikkeleista ja tapahtumista.",
	"eRepublik Arena" : "eRepublikin Areena",
    	"Forum index" : "Foorumin etusivu",
	"Guidelines for a better New World." : "Parempaa uutta maailmaa varten",
	"Help" : "Apua",
	"Imagination is the only limit for changing the future." : "Vain mielikuvitus on rajana.",
	"Keeping in touch with other citizens regarding the eRepublik warfare." : "Keskustelua liittyen sotiin.",
	"Last Message" : "Viimeisin viesti",
	"Minimum requirements: country, domain and quality" : "Vähimmäisvaatimukset: maa, ala, laatu.",
	"Minimum requirements: country, domain, quality, how many positions and, of course, salary." : "Vähimmäisvaatimukset: maa, ala, laatu, vapaiden paikkojen määrä ja palkka.",
	"Minimum requirements: quality and price" : "Vähimmäisvaatimukset: laatu ja hinta.",
	"New features, improvements and solved major issues will be announced and debated in this area." : "Uudet ominaisuudet, parannukset ja ratkaistut ongelmat ilmoitetaan täällä.",
	"New offers or decisions? Post your ad here." : "Uusia tarjouksia tai päätöksiä? Tämä on oikea paikka niiden ilmoittamiselle.",
	"New topic" : "Uusi aihe",
	"Official agreements between citizens, companies, countries, regions, parties or newspapers." : "Viralliset sopimukset kansalaisten, yhtiöiden, maiden, alueiden, puolueiden tai sanomalehtien välillä.",
	"Open letters" : "Avoimet kirjeet",
	"Other announcements" : "Osta, myy ja ilmoita",
	"Posts" : "Viestit",
	"Public messages for the eRepublik Staff." : "Julkiset viestit eRepublikin tiimille.",
	"Rules" : "Säännöt",
	"Shares, investments and partnerships" : "Osakkeet, sijoitukset ja yhtiökumppanuudet",
	"Sharing opinions concerning social interactions." : "Yhteisöllistä keskustelua.",
	"Suggestions" : "Ehdotukset",
	"The New World" : "Uusi maailma",
	"The Official Wiki of eRepublik - a tool for everyone." : "Keskustelua eRepublikin wikistä",
	"The place for those who are interested in political activities." : "Keskustelua politiikasta.",
	"Topics" : "Aiheet",
	"Updates" : "Päivitykset",


// Ura
	"General Manager" : "Toimitusjohtaja",
	"Hard worker" : "Hard worker",

// Viestit, Alertit ja Subit
	"After 5 days the alerts are automatically deleted" : "Viiden päivän jälkeen ilmoitukset poistetaan",	
	"Alerts" : "Ilmoitukset",
	"Delete" : "Poista",
	"From" : "Lähettäjä",
        "Inbox" : "Saapuneet",
	"items" : "tavaroita",
	"new article" : "uusi artikkeli",
	"Newer" : "Uudet",
	"Older" : "Vanhat",
	"Read Message" : "Lue viesti",
	"Reply" : "Vastaa",
	"Select all" : " Valitse kaikki",
	"Select All" : "Valitse kaikki",
	"Sent messages" : "Lähetetyt viestit",
	"Sent" : "Lähetetyt",
	"Subscriptions" : "Tilaukset",
	"To" : "Saaja",
	"Message" : "Viestin sisältö",
	"Subject" : "Aihe",
	"No messages found." : "Ei viestejä",
	"No new alerts." : "Ei uusia ilmoituksia",
	"Weekly news" : "Viikoittaiset uutiset",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik " : "Jokaviikkoinen viesti, joka kertoo suosituimmat uutiset, aktiiviset sodat, sotatapahtumat sekä viisi suurinta eRepublikin maata. ",
	"show example" : "Näytä esimerkki",
	"Turn ON" : "Päälle",
	"Turn OFF" : "Pois päältä",

	//Alertit
	"marketplace" : "",
	"monetary market" : "valuuttamarketissa",
	"You have worked for 30 days in a row and you are now known as a Hard Worker. An amount of 5 Gold was added to your account as a reward for your achievement. " : "Olet työskennellyt 30 päivää putkeen ja sinut tunnetaan nyt virallisesti ahkerana työntekijänä. Saavutuksestasi on lisätty 5 kultaa tilillesi.",
	". Your wellness has been increased with 1." : " on antanut sinulle yhden tason 1 lahjan. Terveytesi on kasvanut sen johdosta yhdellä pisteellä.",
	". Your wellness has been increased with 2." : " on antanut sinulle yhden tason 2 lahjan. Terveytesi on kasvanut sen johdosta kahdella pisteellä.",
	". Your wellness has been increased with 3." : " on antanut sinulle yhden tason 3 lahjan. Terveytesi on kasvanut sen johdosta kolmella pisteellä.",
	". Your wellness has been increased with 4." : " on antanut sinulle yhden tason 4 lahjan. Terveytesi on kasvanut sen johdosta neljällä pisteellä.",
	". Your wellness has been increased with 5." : " on antanut sinulle yhden tason 5 lahjan. Terveytesi on kasvanut sen johdosta viidellä pisteellä.",

// Flash otsikot
	"My places > Army" : "Armeija",
	"My places > Newspaper" : "Sanomalehti",
	"My places > Organizations" : "Organisaatiot",
	"My places > Party" : "Puolue",
	"War > Battlefield" : "Sota > Taistelukenttä",

// menu	
	"logout" : "Uloskirjaus",


//Sekalaiset
	"one month ago" : "kuukausi sitten",
	"Advertise here" : "Mainosta täältä",
	"Back" : "Takaisin",
	"Rank"   : "Sijoitus",
	"Region" : "Alue",
	"Select" : "Valitse",	
	" xp points " : " Kokemuspistettä ",
//Lahjoitus
	"All donations" : "Lahjoituslista",
	"Donate" : "Lahjoita",
	"Donation" : "Lahjoitus",
	"Drag and drop items from your inventory to the donation area" : "Raahaa ja pudota tavarat inventaariostasi lahjoitus alueelle",
	"Items" : "Tavaroita",
	"Money" : "Rahaa",
	"This citizen does not have any donations sent or received." : "Tällä kansalaisella ei ole lahjoituksia.",
	"Your inventory" : "Sinun inventaariosi",

// - Sanomalehti - //

// Artikkelit
	"Article RSS" : "RSS-syöte",
	"one hour ago" : "tunti sitten",
	"Post a comment" : "Kommentoi",
	"ShareThis" : "Jaa tämä",
	"Subscribe to comments" : "Tilaa kommentit",
	"Subscribe" : "Tilaa",
	"today" : "tänään",
	"Unsubscribe to comments" : "Lopeta kommenttien tilaus",
	"Unsubscribe" : "Lopeta tilaus",
	"View all comments" : "Näytä kaikki kommentit",
	"yesterday" : "eilen",
	"Your comment" : "Kommentoi",
	"You do not have a newspaper" : "Sinulla ei ole sanomalehteä",
	
	//Kirjoita artikkeli
		"1-80 characters max" : "1-80 kirjainta",
		"Article" : "Artikkeli",
		"only JPG files allowed" : "vain JPG kuvat sallittuja",
		"Picture" : "Kuva",
		"Title" : "Otsikko",
	//Sanomalehden luonti
		"6-25 characters max" : "6-25 kirjainta",
		"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Sanomalehti on hyva tapa saada tietoa eMaailman tapahtumista tai saada omat ajatukset kuulumaan. Luo siis sanomalehti.",
		"Change the location of your newspaper" : "Vaihda sanomalehden sijaintia",
		"Congratulations! Your newspaper details have been changed." : "Onnittelut! Sanomalehtesi tiedot on muutettu onnistuneesti.",
		"Create newspaper" : "Luo sanomalehti",
		"Edit newspaper details" : "Muuta tietoja",
		"Edit" : "Muokkaa",
		"Location" : "Sijainti",
		"Newspaper Avatar" : "Sanomalehden Avatar",
 		"Newspaper details" : "Sanomalehden tiedot",
		"Newspaper logo" : "Sanomalehden logo",
		"Newspaper name" : "Sanomalehden nimi",
		"Send a message to us via the " : "Jos haluat siirtää sanomalehden toiselle kansalaiselle tai organisaatiolle, lähetä viestiä ", 
		"This newspaper does not have any articles." : "Tällä lehdellä ei ole yhtään artikkelia.",
		"Write article" : "Kirjoita artikkeli",
		"You do not have any articles, if you want to write an article you should enter here:" : "Sinulla ei ole artikkeleita. Jos haluat kirjoittaa artikkelin mene tänne » "

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};



matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":"", "option":"", 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px;font-weight:bold;padding-top:5px;font-size:25px;color:#595959;'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}


window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);

window.addEventListener("dblclick", function(e) { 
  translateWholePage(e);
}, false);