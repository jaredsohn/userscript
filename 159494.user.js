// ==UserScript==
// @name           Pottermore Srbija
// @version        1.2
// @description    Srpski prevod sajta Pottermore!
// @author         Milan Lupin
// @homepage       http://userscripts.org/users/506327
// @id             http://userscripts.org/users/506327
// @namespace      http://userscripts.org/users/506327
// @icon           data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABAAEADASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAQQCBQYDAP/EAC8QAAIBAwQBAgQEBwAAAAAAAAECAwAEEQUSITFBE2EGFDJRInGBkRUWYnKh8PH/xAAaAQADAQADAAAAAAAAAAAAAAAAAQIDBAUG/8QAKREAAQMCAwcFAQAAAAAAAAAAAQACEQMhBBITBTFBUWGhwRQVgZGx8P/aAAwDAQACEQMRAD8Az2j/AAg+uaSlzZ6jbi8Z3RLSYbN5XBwr5xnBBwQPzrPCGT5gQFdsu/09rkLhs4wSeBzWg0Z3gtLGVJCZhcy+hGFOPUKquSfAAJPvVl8N21jFqJkXcX3GOYXiKWYMGAZQPpyQcg5yP87ahBMr0fuLqNSo194mPtUl38KarZWpuJ/khGIjNxfwsxUEgkANluj1mhpPw3da1YvPY3Vi86yGNbJpwk8uBn8CnhvPGc8GtLp2qNJDaB3tbXOizH1DbqUUtMT9G0gKuM4AwftU9AYXwnnuL6OZ7fWIboG2iCmf0InIWNQAAWHXHg+aWo6Ezj6wY7NEjp1j+usC0boiu0bqrEgMykAkdjPt5oyxSwvsljeNioYK6kHBGQefBBBrbnXtOk+HrB9X08XFu93e3UcYJ3JJvV1QfZG3FWHXmmNefTo72/1S+sk1C4vLkxwieVljiVY1Krx1nPGPYD3rVPELU7Sc0gPYePzBi3lYqXR9Sh0uDU3spvkZwSk4XcvDbeSPp545xnxScsUsLsksToy43KykEZGRn9K3xuxp1jbKZbi2sbS2nU27SkF/VwyxuvTEb2HI8Cs58RapfXYjSbVnnidIz8vkqAQi4Yr1z3+tDahJhTh9ovrVAyLGb35/sJKPUZorK3t4lVDBOZ0kGd24gDH2x+GmDrU/zMU0dvbxBH9QxxqQrtgjJ5z5qtAo1rkaV2TsHQeZc3n3T1tq9xabDEkW5IDACy7uNxbOD7n8q6vrt48fSLMJ45lkjUJtKBgOAP6u6R+XlEAnKERk4DHz/uDzUNpxnBx1mjTal6LDk5solM6hqDahFHG0EcSpJK4WPOMuckAHqmP5gv0uWmiZY9wTK4yNyqFDDPIOB2KrsUGGCQeCPB7o02qjg6BaGlsgT3uU2+qSyxbJkEuXcyFiRvDADbgddD9hU7jXbqe1e3MNqqPGI2IhG7H3BPINIVEilpt5KBgMODIYJRo4oVIVoFzAnjfxFGLWULysipvdiQuOBtHjr/nVQN8hyTYWnIPAVx+2G4PvS6RvK6oilnY4VR2TVh/CgllHPJIxZ3UBIwDlSQAR9+c89cY58SYCxcKbN/lcbqeNNRjlgihCRCLaoyVJVQTn785zXSTW7yXdv+XwxywFsg3cnvjPk12mt7a3uXb0YWsVbCS7i7S+ykEAnvJ4x3gcCqp1KsQVKHP0t2KBBSphjwLbkN7AYG3H9oqB6o0DTW68KIqINGhCnTQ1G6WNEWQKI4vRUqgBCZzjP5kn9TSeaOadikWh28Kxh1W43O00quAC6o0KENJ0pIx2M5z7YpGaaSeVpZXZ3Y5ZmPJrnmvUoASaxrTIC9UTRqJNCpf/2Q==
// @run-at         document-start
// @include        http://www.pixiv.net/*
// @include        http://dic.pixiv.net/*
// @include        http://www.tinami.com/*
// @include        http://seiga.nicovideo.jp/*
// @include        http://www.pottermore.com/*
// @include        https://www.pottermore.com/*
// @noframes
// ==/UserScript==

function setLocalObject(key, value){var str = JSON.stringify(value); if(typeof GM_setValue !== "undefined"){GM_setValue(key, str);} localStorage.setItem(key, str);}
function getLocalObject(key, def){var str = (typeof GM_getValue !== "undefined") ? GM_getValue(key) : localStorage.getItem(key); return str ? (function(){try{return JSON.parse(str);}catch(e){return def;}})() : def;}
function setSessionObject(key, value){sessionStorage.setItem(key, JSON.stringify(value));}
function getSessionObject(key, def){var str = sessionStorage.getItem(key); return str ? (function(){try{return JSON.parse(str);}catch(e){return def;}})() : def;}

function notify(msg, title, icon, callback){
    if(typeof GM_notification !== "undefined")
        GM_notification(msg, title, icon, callback);
    else if(callback)
        if(confirm(msg))
            callback();
    else
        alert(msg);
}

//transition to GM_setValue
if(GM_setValue && GM_getValue){
    if(!GM_getValue("PTP_Settings_110701") && localStorage.getItem("PTP_Settings_110701")){
        GM_setValue("PTP_Settings_110701", localStorage.getItem("PTP_Settings_110701"));
        notify("Settings copied to GM_setValue");
    }
    if(!GM_getValue("PTP_Custom") && localStorage.getItem("PTP_Custom")){
        GM_setValue("PTP_Custom", localStorage.getItem("PTP_Custom"));
        notify("Custom tags copied to GM_setValue");
    }
}

function ce(tag, attr){
    var el = document.createElement(tag);
    for(var x in attr)
        el.setAttribute(x, attr[x]);
    el.setAttribute("ptpel", "");
    return el;
}

var searchbar = ce("input");

var translations = {"katakana":{
},
"hiragana":{
"ぽ":"po"},
"page":{
"We use cookies to give you the very best experience on the Pottermore website and to allow you to make use of all our site features. If you continue without changing your cookie settings, you consent to receiving all cookies on our website. If you would like to, however, you can change these settings at any time.":"Koristimo kolačiće da bi Vam dali što bolje iskustvo na Pottermore sajtu i dozvolili Vam da možete da koristite sve stvari na sajtu. Ako nastavite, a pri tome ne promenite Vaša podešavanja kolačića, pristajete na prihvatanje svih kolačića na našem sajtu. Ako se ipak odlučite da ovo ne želite, možete promeniti podešavanja u bilo koje doba.",
"Find out more.":"Saznajte više.",
"J.K. Rowling's thoughts":"Pogledajte na pottermore.co.nr",
"by Arsenius Jigger":"od Arsenijusa Epruvete",
"by Quentin Trimble":"od Kventina Drhtavog",
"The Worst Birthday":"Najgori rođendan",
"Uniform":"Uniforma",
"First-year students will require:":"Učenicima prve godine potrebna su:",
"Three sets of plain work robes (black)":"Tri kompleta običnih radnih odora (crne)",
"One plain pointed hat (black) for day wear":"Jedan šešir sa šiljatim vrhom (crni) za preko dana",
"One pair of protected gloves (dragon hide or similar)":"Jedan par zaštitnih rukavica (zmijska koža ili slične)",
"One winter cloak (black, silver fastenings)":"Jedan zimski ogrtač (crni, srebrne kopče)",
"Please note that all pupils’ clothes should carry name tags":"Obratite pažnju na to da svaki komad odeće učenika ima aplikaciju sa imenom",
"Other Equipment":"Ostala oprema",
"1 wand (you will collect this last)":"1 čarobni štapić (ovo ćeš sakupiti na kraju)",
"1 cauldron (pewter, standard size 2)":"1 kotao (plehani, standardna veličina 2)",
"1 set glass phials or crystal phials":"1 komplet staklenih ili kristalnih epruveta",
"1 telescope":"1 teleskop",
"1 set brass scales":"1 komplet mesinganih terazija",
"Potage's":"Velika",
"Cauldron Shop":"Kotlarnica",
"Potage's Cauldron Shop":"Velika kotlarnica",
"- All Sizes - Copper, Brass, Pewter, Silver":"- Sve veličine - Bakar, Mesing, Pleh, Srebro",
"- Self-Stirring":"- Samomešajući",
"- Collapsible":"- Na rasklapanje",
"Size 2":"Veličina 2",
"Pewter Cauldron":"Plehani kotao",
"You have successfully bought this item.":"Uspešno si kupio ovu stvar",
"Exit shop":"Izađi",
"Students may also":"Učenici mogu da ponesu",
"an owl OR a cat OR a toad":"i sovu ILI mačku ILI žabu",
"Parents are reminded that first-years are not allowed their own broomsticks":"Podsećaju se roditelji da prvacima nije dozvoljeno posedovanje vlastitih metli",
"All students require the following items to attend Hogwarts. You already have your uniform, but you will need to buy everything else on your list, including one pet. You will get your wand later, so no need to look for this yet.":"Svi učenici moraju imati sledeću opremu da bi bili primljeni na Hogvorts. Ti već imaš svoju uniformu, ali ćeš morati kupiti sve ostalo na tvojoj listi, uključujući i ljubimca. Štapić ćeš dobiti kasnije, tako da ne troši vreme da ga pronađeš sada.",
"Dobby's Warning":"Dobijevo upozorenje",
"The Burrow":"Jazbina",
"At Flourish and Blotts":"Kod 'Kitnjavka i Mrljavka'", 
"The Whomping Willow":"Mlatarajuća vrba",
"Gilderoy Lockhart":"Gilderoj Lokhart",
"Mudbloods and Murmurs":"Blatokrvni i šaputanja",
"The Deathday Party":"Smrtodanska žurka",
"The Writing on the Wall":"Natpis na zidu",
"The Rogue Bludger":"Pomahnitala bladžerka",
"The Duelling Club":"Klub dvoboja",
"The Very Secret Diary":"Veoma tajni dnevnik",
"Cornelius Fudge":"Kornelijus Fadž",
"The Heir of Slytherin":"Sliterinov naslednik",
"Dobby's Reward":"Dobijeva nagrada",
"Owl Post":"Sovina pošta",
"Aunt Marge's Big Mistake":"Velika greška tetke Mardž",
"The Knight Bus":"Noćni viteški autobus",
"The Leaky Cauldron":"Probušeni kotao",
"The Dementor":"Dementor",
"Talons and Tea Leaves":"Kandže i listići čaja",
"The Boggart in the Wardrobe":"Bauk u ormanu",
"The door was hit with such force that it swung clean off its hinges and with a deafening crash landed flat on the floor...":"Vrata se otvoriše sa takvom silinom da su se izvalila iz šarki, i tresnuše svom snagom o pod...",
"Hagrid Arrives":"Hagridov dolazak",
"Harry Receives his Letter at Last":"Hari napokon prima svoje pismo",
"Ghost Plots":"Mesta Duhova",
"Killing Curse":"Ubijajuća kletva",
"Harry stretched out his hand at last to take the yellowish envelope, addressed in emerald green to Mr H Potter, The Floor, Hut-on-the-Rock, The Sea. He pulled out the letter and read...":"Hari ispruži ruku da bi konačno uzeo žućkasti koverat, adresiran smaragdno zelenim slovima na Gdin. H. Poter, Patos, Koliba-na-steni, More. On izvadi pismo i pročita...",
"You’ve found a chipped cup":"Našao si staru šoljicu",
"Good discovery! Add this cup to your Trunk and don’t forget to collect everything else that you find along the way.":"Odlično otkriće! Dodaj ovu šoljicu u tvoju Ostavu i ne zaboravi da sakupljaš sve ostalo što budeš nalazio tokom ove avanture.",
"‘It’s gettin’ late and we’ve got lots ter do tomorrow,’ said Hagrid loudly. ‘Gotta get up ter town, get all yer books an’ that.'":"'Već je kasno i imamo puno toga da uradimo sutra', reče Hagrid glasno. 'Moramo do grada, da ti uzmemo knjige i tako to.'",
"Moments in this chapter included an excerpt from the digital audio book of HARRY POTTER and the Philosopher's Stone.":"Momenti u ovom poglavlju imaju isečke iz audio knjige 'Hari Poter i kamen mudrosti'.",
"To continue listening you can purchase the digital audio book from the":"Ako želiš da nastaviš da slušaš ovu digitalnu audio knjigu možeš je naručiti iz ",
"Arriving at Diagon Alley":"Dolazak u Dijagon-aleju",
"Harry and Hagrid Visit Gringotts":"Hari i Hagrid posećuju Gringots",
"Ollivanders":"Olivander",
"It's your shopping list - well found!":"To je tvoj spisak knjiga i opreme - dobro nađeno!",
"Be sure to pick this up because it lists the books and equipment you need for Hogwarts.":"Budi siguran da si pokupio ovaj spisak, jer je ovo spisak knjiga i opreme koja ti je potrebna za Hogvorts.",
"You’ve discovered ‘Clothing’ by J.K. Rowling":"Otkrio si tekst 'Oblačenje' od Dž.K. Rouling",
"Clothing":"Oblačenje",
"Daily Prophet":"Dnevni prorok",
"Cats":"Mačke",
"Goblins":"Goblini",
"Dedalus Diggle":"Dedalus Digl",
"Griphook":"Griphuk",
"Doris Crockford":"Doris Krokford",
"Flourish":"Kitnjavko",
"and":"i",
"Blotts":"Mrljavko",
"Hedwig":"Hedviga",
"Madam Malkin":"Madam Aljkavuša",
"Tom the Barman":"Barmen Tom",
"Shopping list":"Spisak knjiga i opreme",
"The brick he had touched quivered – it wriggled – in the middle, a small hole appeared – it grew wider and wider – a second later they were facing an archway large enough even for Hagrid, an archway on to a cobbled street which twisted and turned out of sight...":"Cigla koju je dotakao se zatrese - poče da se odvaja - u sredini se pojavi rupica - koja je postajala sve šira i šira - i sekund kasnije pred njima je bio lučni prolaz, dovoljno velik da i Hagrid prođe, izlaz na kaldrmisanu ulicu koja je krivudala i gubila se iz vida...",
"Your account is ready to open":"Tvoj sef je spreman da ga otvoriš",
"Open an account and use your Galleons to buy everything on your shopping list before you get yourself a wand. You can check your balance at any time by clicking Gringotts at the top of the page.":"Otvori jedan sef i koristi tvoje galeone da bi kupio sve sa spiska knjiga i opreme pre nego što uzmeš sebi štapić. Možeš da proveriš tvoje stanje u sefu ubilo koje doba, klikom na Gringots na vrhu stranice.",
"Witches and wizards store their money in Gringotts Wizarding Bank.":"Veštice i čarobnjaci čuvaju svoj novac u Čarobnjačkoj banci Gringots.",
"The bank, run by goblins, towers over the other shops with its snowy white façade and bronzed, guarded doors.":"Banka, kojom rukovode goblini, izdiže se iznad ostalih prodavnica i ima snežnobelu fasadu i dobro čuvana bronzana vrata.",
"Gringotts vaults are buried deep below its main hall, accessed by taking bumpy, speedy cart rides through the rocky underground caverns. There are few safer places in the wizarding world than Gringotts Wizarding Bank.":"Sefovi Gringotsa su ukopani duboko ispod glavne dvorane, i jedino im se može prići divljom, brzom vožnjom vagonetom kroz stenovitu pećinu. Postoji samo nekoliko bezbednijih mesta u čarobnjačkom svetu od Čarobnjačke banke Gringots.",
"You can spend your Galleons in Diagon Alley at some of the most fascinating wizarding shops in the world.":"Možeš potrošiti svoje galeone u Dijagon-aleji u nekim od najfascinirajućih čarobnjačkih prodavnica na svetu.",
"A pair of goblins bowed them through the silver doors and they were in a vast marble hall...":"Par goblina ih uz naklon uvede kroz srebrna vrata, i oni se nađoše u prostranoj mermernoj dvorani...",
"by Miranda Goshawk":" od Mirande Sove",
"Wizarding Money":"Čarobnjački novac",
"Eeylops Owl Emporium":"Ijlopova prodavnica sova",
"Madam Malkin's Robes for All Occasions":"Madam Aljkavušine odore za sve prilike",
"Now you can read exclusive new material from J.K. Rowling on wizard clothing.":"Sada možeš da pročitaš novi ekskluzivni materijal od Dž.K. Rouling o čarobnjačkom oblačenju.",
"‘Can we buy all this in London?’ Harry wondered aloud.":"'Možemo li sve to da kupimo u Londonu?', glasno se upita Hari.",
"‘If yeh know where to go,’ said Hagrid...":"'Jakako, samo ak' znaš gde da ideš', reče Hagrid...",
"Welcome to Diagon Alley":"Dobrodošao u Dijagon-aleju",
"This cobbled street sells everything from cauldrons to cats. You’ll need to open your account at Gringotts to buy the books and equipment you need for Hogwarts, but first you’ll need to find your shopping list...":"Ova kaldrma prodaje sve od kotlova do mačaka. Prvo ćeš morati da otvoriš svoj sef u Gringotsu da bi kupio knjige i operemu koja ti treba za Hogvorts, ali pre svega moraš da nađeš svoj spisak knjiga i opreme...",
"Harry Goes Shopping":"Hari ide u kupovinu",   
"‘An’ here’s Harry!’ said the giant.":"'A, eve Harija!', reče džin.",
"Harry looked up into the fierce, wild, shadowy face and saw that the beetle eyes were crinkled in a smile...":"Hari pogleda u to žustro, divlje i senovito lice, i vide da su mu oči nalik bubama osmehnuto skupile...",
"Collect the candle":"Sakupi sveću",
"Put this in your Trunk; you may need it in the future.":"Stavi ovo u svoju Ostavu; možda će ti trebati u budućnosti.",
"Congratulations! J.K. Rowling’s ‘Ghost Plots’ is now unlocked":"Čestitamo! Tekst 'Mesta Duhova' od Dž.K. Rouling je otključan",
"Discover how the author created plots which were never used in the books.":"Otkrij kako je autorka smislila mesta koja se nikada nisu pominjala u knjigama.",
"A man appeared on the corner the cat had been watching, appeared so suddenly and silently you’d have thought he’d just popped out of the ground. The cat’s tail twitched and its eyes narrowed...":"Na uglu koji je mačka motrila pojavi se čovek, tako iznenada i tiho kao da je iznikao iz zemlje. Mačka mahnu repom, a oči joj se suziše...",
"Your owl will bring you messages":"Tvoja sova će ti donositi obaveštenja i poruke",
"Perched at the top of your Gateway, your owl will bring you Pottermore updates such as news and friend requests. Once you’ve checked your messages, you can return to the Moment you were in by clicking the storyline bar at the bottom of your page.":"Smeštena na vrhu Kapije, sova će ti donositi Pottermore obaveštenja kao što su novine i zahtevi za prijateljstvo. Kada odgledaš svoju poruku, možeš da se vratiš na momenat na koji si stao klikom na tabelu priče, koja se nalazi na dnu ekrana.",
"A low rumbling sound had broken the silence around them. It grew steadily louder as they looked up and down the street for some sign of a headlight; it swelled to a roar as they both looked up at the sky – and a huge motorbike fell out of the air and landed on the road in front of them...":"Dubok, brundav zvuk naruši tišinu oko njih. Postajao je sve jači dok su oni gledali niz ulicu čekajući da se pojavi svetlost fara; brektanje se pretvori u grmljavinu u trenutku kad oboje pogledaše ka nebu - i ogroman motocikl stuši se iz vazduha i slete na drum ispred njih...",
"The Cupboard Under the Stairs":"Ostava ispod stepeništa",
"Start of Chapter 1: The Boy Who Lived":"Početak I poglavlja: Dečak koji je preživeo",
"End of Chapter 1: The Boy Who Lived":"Kraj I poglavlja: Dečak koji je preživeo",
"The Trip to the Zoo":"Put u Zoo-vrt",
"Start collecting":"Počni sa sakupljanjem",
"You never know what is hiding in a Moment so have a good look around for items to collect and add to your Trunk. Remember, whenever you leave a Moment, you can click the storyline bar to get back to where you were.":"Nikada ne znaš šta se krija u momentu, zato gledaj dobro oko sebe, pronađi stvari i dodaj ih u Ostavu. Zapamti, kad god napustiš momenat, možeš da klikneš na tabelu priče i vratiš se gde si bio.",
"Well done! You’ve found the alarm clock":"Bravo! Našao si sat na alarm",
"Why not start your collection by putting this in your Trunk? Click 'Collect'.":"Zašto ne počneš sa sakupljanjem, stavljanjem ovog sata u tvoju ostavu? Klikni na 'Sakupi'.",
"Mrs Figg":"Gospođa Fig",
"Vernon & Petunia Dursley":"Veron i Petunija Darsli",
"Dudley Dursley":"Dadli Darsli",
"Harry was used to spiders, because the cupboard under the stairs was full of them, and that was where he slept...":"Hari se već navikao na paukove, pošto ih je bilo mnogo u ostavi ispod stepenica, gde je on spavao.",
"You’ve unlocked ‘Vernon and Petunia Dursley’ by J.K. Rowling!":"Otključao si 'Veron i Petunija Darsli' od Dž.K. Rouling!",
"Read new writing from J.K. Rowling in which she reveals some facts about this Muggle couple. Keep checking the signs because more new material will be revealed as the story progresses.":"Pročitaj nove tekstove od Dž.K. Rouling u kojima otkriva neke stvari o ovom normalskom bračnom paru. Proveravaj stalno viseće znako jer će još novog materijala biti otkriveno kako priča koju istražuješ napreduje.",
"The snake suddenly opened its beady eyes. Slowly, very slowly, it raised its head until its eyes were on a level with Harry’s...":"Zmija iznenada otvori svoje prodorne oči. Lagano, vrlo lagano, podizala je glavu dok joj se oči nisu našle u istoj ravni sa Harijevim...",
"Piers Polkiss":"Pirs Polkis",
"Boa Constrictor":"Boa Constrictor (Udav)",
"This specimen was bred in the zoo":"Ovaj primerak uzgojen je u zoološkom vrtu.",
"Boa constrictors can grow up to four metres long. They eat anything they set their sights on including birds, pigs and monkeys. They do this by grabbing their prey, wrapping their bodies around their victims until they suffocate, and finally swallowing them whole.":"Udavi mogu da narastu i do četiri metra. Jedu sve u šta mogu da zabodu kljove, uključujući i ptice, svinje i majmune. Love tako što zgrabe svoj plen, obmotaju svoje teleo oko žrtve dok se ne uguše i na kraju ih progutaju cele.",
"Don’t worry, we keep the boa constrictors in our zoo well fed!":"Ne brinite se, mi naše udave dobro nahranimo!",
"Everybody knew that Dudley’s gang hated that odd Harry Potter in his baggy old clothes and broken glasses, and nobody liked to disagree with Dudley’s gang.":"Svi su znali da Dadlijeva družina mrzi tog čudnog Harija Potera u dronjavoj odeći i s polomljenim naočarama, a niko nije hteo da se zamera Dadlijevoj bandi.",
"End of Chapter 2: The Vanishing Glass":"Kraj II poglavlja: Staklo koje nestaje",
"End of Chapter 3: The Letters from No One":"Kraj III poglavlja: Pisma niotkoga",
"End of Chapter 4: The Keeper of the Keys":"Kraj IV poglavlja: Čuvar ključeva",
"End of Chapter 5: Diagon Alley":"Kraj V poglavlja: Dijagon-aleja",
"End of Chapter 6: The Journey from Platform Nine and Three-Quarters":"Kraj VI poglavlja: Polazak sa perona devet i tri četvrtine",
"End of Chapter 7: The Sorting Hat":"Kraj VII poglavlja: Šešir za razvrstavanje",
"End of Chapter 8: The Potions Master":"Kraj VIII poglavlja: Majstor napitaka",
"End of Chapter 9: The Midnight Duel":"Kraj IX poglavlja: Ponoćni dvoboj",
"End of Chapter 10: Hallowe'en":"Kraj X poglavlja: Noć veštica",
"End of Chapter 11: Quidditch":"Kraj XI poglavlja: Kvidič",
"End of Chapter 12: The Mirror of Erised":"Kraj XII poglavlja: Ogledalo Ejnduž",
"End of Chapter 13: Nicolas Flamel":"Kraj XIII poglavlja: Nikolas Flamel",
"End of Chapter 14: Norbert the Norwegian Ridgeback":"Kraj XIV poglavlja: Norbert, norveški šiljkoleđi",
"End of Chapter 15: The Forbidden Forest":"Kraj XV poglavlja: Zabranjena šuma",
"End of Chapter 16: Through the Trapdoor":"Kraj XVI poglavlja: Kroz vratanca na podu",
"End of Chapter 17: The Man with Two Faces":"Kraj XVII poglavlja: Čovek s dva lica",
"Start of Chapter 2: The Vanishing Glass":"Početak II poglavlja: Staklo koje nestaje",
"Start of Chapter 3: The Letters from No One":"Početak III poglavlja: Pisma niotkoga",
"Start of Chapter 4: The Keeper of the Keys":"Početak IV poglavlja: Čuvar ključeva",
"Start of Chapter 5: Diagon Alley":"Početak V poglavlja: Dijagon-aleja",
"Start of Chapter 6: The Journey from Platform Nine and Three-Quarters":"Početak VI poglavlja: Polazak sa perona devet i tri četvrtine",
"Start of Chapter 7: The Sorting Hat":"Početak VII poglavlja: Šešir za razvrstavanje",
"Start of Chapter 8: The Potions Master":"Početak VIII poglavlja: Majstor napitaka",
"Start of Chapter 9: The Midnight Duel":"Početak IX poglavlja: Ponoćni dvoboj",
"Start of Chapter 10: Hallowe'en":"Početak X poglavlja: Noć veštica",
"Start of Chapter 11: Quidditch":"Početak XI poglavlja: Kvidič",
"Start of Chapter 12: The Mirror of Erised":"Početak XII poglavlja: Ogledalo Ejnduž",
"Start of Chapter 13: Nicolas Flamel":"Početak XIII poglavlja: Nikolas Flamel",
"Start of Chapter 14: Norbert the Norwegian Ridgeback":"Početak XIV poglavlja: Norbert, norveški šiljkoleđi",
"Start of Chapter 15: The Forbidden Forest":"Početak XV poglavlja: Zabranjena šuma",
"Start of Chapter 16: Through the Trapdoor":"Početak XVI poglavlja: Kroz vratanca na podu",
"Start of Chapter 17: The Man with Two Faces":"Početak XVII poglavlja: Čovek s dva lica",
"The escape of the Brazilian boa constrictor earned Harry his longest-ever punishment...":"Bekstvo brazilskog udava donelo je Hariju najdužu kaznu koju je ikada dobio...",
"Harry Receives a Mysterious Letter":"Hari dobija tajna pisma",
"The Hut on the Rock":"Kolibica na vrhu stene",
"The Smallest Bedroom":"Najmanja spavaća soba",
"Harry picked it up and stared at it, his heart twanging like a giant elastic band. No one, ever, in his whole life, had written to him. Who would?...":"Hari ga podiže i zapilji se u njega, dok mu se srce trzalo kao džinovski lastiš. Njemu niko nikada u životu nije pisao. A i ko bi mogao?...",
"You’ve noticed the salt and pepper":"Primetio si so i biber",
"Why not add them to your Trunk? Click ‘Collect’.":"Zašto ih ne dodaš u Ostavu? Klikni na 'Sakupi'.",
"This item has been added to your Trunk.":"Ova stvar je dodata u tvoju Ostavu.",
"You’ve discovered the hammer and nails":"Otkrio si čekić i eksere",
"Well found! Now you can add these useful tools to your collection. Click 'Collect' to add to your Trunk.":"Veoma dobro nađeno! Sada možeš da dodaš ove korisne alatke u tvoju kolekciju. Klikni na 'Sakupi' da bi dodao u svoju Ostavu.",
"You’ve found the postcard":"Našao si razglednicu",
"Well spotted! Click ‘Collect’ to add it to your Trunk.":"Veoma si dobro to uočio! Klikni na 'Sakupi' da bi dodao u svoju Ostavu.",
"Have you checked your profile?":"Da li si proverio svoj profil?",
"Everyone in Pottermore has a profile. It is your own personal page, which will grow and evolve as you move through Pottermore. You can find it by clicking the crest shield below the Pottermore logo.":"Svi na Pottermore-u imaju profil. To je tvoja osobna stranica, koja će rasti i razvijati se kako budeš napredovao kroz Pottermore. Možeš da ga vidiš klikom na grb u obliku štita koji se nalazi ispod Pottermore-ovog logoa.",
"Hut on the rock":"Koliba na steni",
"Exactly what he was looking for, none of them knew.":"Očito je mislio da ovde nema šanse da ih bilo ko poseti po ovakvoj olusi, ne bi li im uručio poštu...",
"Well done! You’ve discovered some seashells":"Bravo! Našao si morske školjke",
"You know what to do! Click ‘Collect’ to add to your Trunk.":"Znaš šta da radiš! Klikni na 'Sakupi' da dodaš u Ostavu.",
"You’ve stumbled across some seaweed!":"Posrnuo si preko nekih morskih algi!",
"It might be wet and slimy, but click 'Collect' to add to your Trunk.":"Možda će biti mokro i sluzavo, ali klikni na 'Sakupi' da dodaš u Ostavu.",
"Someone was outside, knocking to come in.":"Neko je spolja lupao na vrata, želeći da uđe.",
"You don't have a wand yet - you will have a chance to get one later in the story":"Još uvek nemaš štapić - imaćeš šansu da dobiješ jedan ako nastaviš da istražuješ poglavlja",
"You don’t have any friends on Pottermore yet. If you know someone, why not add them as a friend?":"Još uvek nemaš nijednog prijatelja na Pottermore-u. Ako poznaješ nekoga, zašto ga ne dodaš za prijatelja?",
"Add friends now":"Dodaj sada prijatelja",
"Update status...":"Objavi status...",
"No House":"Nema kuće",
"Be patient, this page will be unlocked very soon":"Budi strpljiv, ova stranica će biti otključana uskoro",
"Parts of the experience are locked so that the story is not spoiled for you.":"Neki delovi avanture su trenutno zaključani da ti ne bi dali spojlere.",
"Clocks are useful for keeping track of time.":"Satovi su korisni da bi znao koliko je sati.",
"These are essential in a typical Muggle toolbox.":"Ovo su važne stvari u svakom normalnoj normalskoj kutiji za alate.",
"A postcard of one of London's famous red buses.":"Razglednica na kojoj se nalazi jedan od poznatih londonskih crvenih autobusa.",
"Salt and pepper add flavour to many things.":"So i biber daju ukus mnogim stvarima.",
"Often found beside the sea and can be collected as a hobby.":"Obično se nalazi pored mora, a sakupljanje školjki može da bude hobi.",
"Slimy when wet but, once dry, becomes hard and crackly.":"Sluzava dok je vlažna, ali jednom kada se osuši, postaje paperjasta i lomljiva.",
"Your email address is:":"Tvoja imejl adresa je:",
"Your country:":"Tvoja država je:",
"Your language of choice:":"Tvoj izabrani jezik je:",
"Personal details":"Lični podaci",
"Password details":"Detalji šifre",
"Your password is:":"Tvoja šifra je:",
"Email settings":"Podešavanja imejla",
"We can send you email updates whenever something has happened on Pottermore. You can change your email settings at any time.":"Možemo da ti šaljemo novosti preko imejla svaki put kada se nešto desi na Pottermoreu. Možeš da promeniš svoja imejl podešavanja kada god hoćeš.",
"Would you like email notifications?":"Da li hoćeš imejl obaveštenja",
"Yes":"Da",
"No":"Ne",
"If you choose not to receive emails, you will still receive notifications when you log in to Pottermore. The owl sitting on your Gateway will show how many new messages you have.":"Ako si izabrao da ne primaš imejlove, još uvek ćeš dobijati obaveštenja kada si prijavljen na Pottermore. Sova koja sedi na tvojoj Kapiji će ti pokazati koliko novih obaveštenja/poruka si dobio.",
"You have chosen to receive emails in the following format:":"Izabrao si sledeći format imejlova koji će ti pristizati:",
"Text":"Tekstualno",
"Spoiler Warning settings":"Podešavanje upozorenja od spojlera",
"Red Quill entries from J.K. Rowling contain information from across the seven books and beyond. If you have not read all the books in the series then this entry may contain information that could spoil your enjoyment of later books.":"Tekstovi za crvenim perom od Dž.K. Rouling sadrže informacije iz više od sedam knjiga. Ako ih nisi sve pročitao, ovi tekstovi imaju neke informacije koje bi mogle pokvariti celo tvoje uživanje u sledećim knjigama koje budeš čitao.",
"Spoiler Warning":"Upozorenje od spojlera",
"On":"Uključeno",
"Off":"Isključeno",
"Delete your account":"Izbriši svoj nalog",
"You can permanently delete your Pottermore account here, but we would be sad to see you go.":"Možeš odmah ovde da izbrišeš svoj Pottermore nalog, ali bilo bi nam žao da te vidimo kako odlaziš.",
"Delete account":"Izbriši nalog",
"English - UK":"Srpski",
"Serbia":"Srbija",
"Swishy":"Elastičan",
"Pliant":"Savitljiv",
"Quite Bendy":"Dobrano savitljiv",
"Fairly bendy":"Nimalo savitljiv",
"Unyielding":"Nesavitljiv",
"Reasonably supple":"Umereno gibak",
"Supple":"Gibak",
"Surprisingly swishy":"Poprilično šibajuć",
"Swishy":"Šibajući",
"Hard":"Čvrst",
"Solid":"Tvrd",
"Very flexible":"Veoma fleksibilan",
"Quite flexible":"Poprilično fleksibilan",
"Slightly Yielding":"Neznatno savitljiv",
"Slightly springy":"Neznatno elastičan",
"Rigid":"Krut",
"Stiff":"Ukrućen",
"Brittle":"Lomljiv",
"Add nickname":"Dodaj nadimak",
"Notifications":"Obaveštenja",
"October 2015":"Oktobar 2015.",
"November 2015":"Novembar 2015.",
"December 2015":"Decembar 2015.",
"January 2016":"Januar 2016.",
"February 2016":"Februar 2016.",
"March 2016":"Mart 2016.",
"April 2016":"April 2016.",
"May 2016":"Maj 2016.",
"June 2016":"Jun 2016.",
"July 2016":"Jul 2016.",
"August 2016":"Avgust 2016.",
"September 2016":"Septembar 2016.",
"October 2016":"Oktobar 2016.",
"November 2016":"Novembar 2016.",
"December 2016":"Decembar 2016.",
"January 2017":"Januar 2017.",
"February 2017":"Februar 2017.",
"March 2017":"Mart 2017.",
"April 2017":"April 2017.",
"May 2017":"Maj 2017.",
"June 2017":"Jun 2017.",
"July 2017":"Jul 2017.",
"August 2017":"Avgust 2017.",
"September 2017":"Septembar 2017.",
"October 2017":"Oktobar 2017.",
"November 2017":"Novembar 2017.",
"December 2017":"Decembar 2017.",
"January 2011":"Januar 2011.",
"February 2011":"Februar 2011.",
"March 2011":"Mart 2011.",
"April 2011":"April 2011.",
"May 2011":"Maj 2011.",
"June 2011":"Jun 2011.",
"July 2011":"Jul 2011.",
"August 2011":"Avgust 2011.",
"September 2011":"Septembar 2011.",
"October 2011":"Oktobar 2011.",
"November 2011":"Novembar 2011.",
"December 2011":"Decembar 2011.",
"January 2018":"Januar 2018.",
"February 2018":"Februar 2018.",
"March 2018":"Mart 2018.",
"April 2018":"April 2018.",
"May 2018":"Maj 2018.",
"June 2018":"Jun 2018.",
"July 2018":"Jul 2018.",
"August 2018":"Avgust 2018.",
"September 2018":"Septembar 2018.",
"October 2018":"Oktobar 2018.",
"November 2018":"Novembar 2018.",
"December 2018":"Decembar 2018.",
"May 2013":"Maj 2013.",
"June 2013":"Jun 2013.",
"July 2013":"Jul 2013.",
"August 2013":"Avgust 2013.",
"September 2013":"Septembar 2013.",
"October 2013":"Oktobar 2013.",
"November 2013":"Novembar 2013.",
"December 2013":"Decembar 2013.",
"March 2013":"Mart 2013.",
"February 2013":"Februar 2013.",
"January 2013":"Januar 2013.",
"June 2012":"Jun 2012.",
"July 2012":"Jul 2012.",
"August 2012":"Avgust 2012.",
"September 2012":"Septembar 2012.",
"October 2012":"Oktobar 2012.",
"November 2012":"Novembar 2012.",
"December 2012":"Decembar 2012.",
"April 2013":"April 2013.",
"January 2014":"Januar 2014.",
"February 2014":"Februar 2014.",
"March 2014":"Mart 2014.",
"April 2014":"April 2014.",
"May 2014":"Maj 2014.",
"June 2014":"Jun 2014.",
"July 2014":"Jul 2014.",
"August 2014":"Avgust 2014.",
"September 2014":"Septembar 2014.",
"October 2014":"Oktobar 2014.",
"November 2014":"Novembar 2014.",
"December 2014":"Decembar 2014.",
"January 2015":"Januar 2015.",
"February 2015":"Februar 2015.",
"March 2015":"Mart 2015.",
"April 2015":"April 2015.",
"May 2015":"Maj 2015.",
"June 2015":"Jun 2015.",
"July 2015":"Jul 2015.",
"August 2015":"Avgust 2015.",
"September 2015":"Septembar 2015.",
"Go to Friends":"Idi u spisak prijatelja",
"Your friend requests:":"Tvoji zahtevi za prijateljstvo:",
"Friend requests":"Zahtevi za prijateljstvo",
"When someone requests to be your friend, please make sure you know who they are before you accept.":"Kada ti neko pošalje zahtev za prijateljstvo, molimo te uveri se da znaš ko je pre nego što prihvatiš.",
"Hide this for now":"Sakrij ovo",
"Accept":"Prihvatam",
"Ignore":"Ignoriši",
"Book 1":"Prva knjiga",
"Book 2":"Druga knjiga",
"Book 3":"Treća knjiga",
"Book 4":"Četrta knjiga",
"Book 5":"Peta knjiga",
"Book 6":"Šesta knjiga",
"Book 7":"Sedma knjiga",
"Flying Motorbike":"Leteći motocikl",
"Sirius Black":"Sirijus Blek",
"Professor McGonagall":"Profesorka Mek Gonagal",
"End of Chapter 1":"Kraj I poglavlja",
"End of Chapter 2":"Kraj II poglavlja",
"End of Chapter 3":"Kraj III poglavlja",
"End of Chapter 4":"Kraj IV poglavlja",
"End of Chapter 5":"Kraj V poglavlja",
"End of Chapter 6":"Kraj VI poglavlja",
"End of Chapter 7":"Kraj VII poglavlja",
"End of Chapter 8":"Kraj VIII poglavlja",
"End of Chapter 9":"Kraj IX poglavlja",
"End of Chapter 10":"Kraj X poglavlja",
"End of Chapter 11":"Kraj XI poglavlja",
"End of Chapter 12":"Kraj XII poglavlja",
"End of Chapter 13":"Kraj XIII poglavlja",
"End of Chapter 14":"Kraj XIV poglavlja",
"End of Chapter 15":"Kraj XV poglavlja",
"End of Chapter 16":"Kraj XVI poglavlja",
"End of Chapter 17":"Kraj XVII poglavlja",
"End of Chapter 18":"Kraj XVIII poglavlja",
"End of Chapter 19":"Kraj XIX poglavlja",
"End of Chapter 20":"Kraj XX poglavlja",
"End of Chapter 21":"Kraj XXI poglavlja",
"End of Chapter 22":"Kraj XXII poglavlja",
"End of Chapter 23":"Kraj XXIII poglavlja",
"End of Chapter 24":"Kraj XXIV poglavlja",
"End of Chapter 25":"Kraj XXV poglavlja",
"End of Chapter 26":"Kraj XXVI poglavlja",
"End of Chapter 27":"Kraj XXVII poglavlja",
"End of Chapter 28":"Kraj XXVIII poglavlja",
"End of Chapter 29":"Kraj XXIX poglavlja",
"End of Chapter 30":"Kraj XXX poglavlja",
"End of Chapter 31":"Kraj XXXI poglavlja",
"End of Chapter 32":"Kraj XXXII poglavlja",
"End of Chapter 33":"Kraj XXXIII poglavlja",
"End of Chapter 34":"Kraj XXXIV poglavlja",
"End of Chapter 35":"Kraj XXXV poglavlja",
"End of Chapter 36":"Kraj XXXVI poglavlja",
"End of Chapter 37":"Kraj XXXVII poglavlja",
"End of Chapter 38":"Kraj XXXVIII poglavlja",
"End of Chapter 39":"Kraj XXXIX poglavlja",
"Measurements":"Merenja",
"He couldn’t know that at this very moment, people meeting in secret all over the country were holding up their glasses and saying in hushed voices: ‘To Harry Potter – the boy who lived!’":"Nije mogao znati da se baš u tom trenutku ljudi širom zemlje tajno sastaju i, dižući čaše prigušenim glasovima nazdravljaju: - Za Harija Potera - dečaka koji je preživeo!",
"Start of Chapter 1":"Početak I poglavlja",
"Start of Chapter 2":"Početak II poglavlja",
"Start of Chapter 3":"Početak III poglavlja",
"Start of Chapter 4":"Početak IV poglavlja",
"Start of Chapter 5":"Početak V poglavlja",
"Start of Chapter 6":"Početak VI poglavlja",
"Start of Chapter 7":"Početak VII poglavlja",
"Start of Chapter 8":"Početak VIII poglavlja",
"Start of Chapter 9":"Početak XIX poglavlja",
"Start of Chapter 10":"Početak X poglavlja",
"Start of Chapter 11":"Početak XI poglavlja",
"Start of Chapter 12":"Početak XII poglavlja",
"Start of Chapter 13":"Početak XIII poglavlja",
"Start of Chapter 14":"Početak XIV poglavlja",
"Start of Chapter 15":"Početak XV poglavlja",
"Start of Chapter 16":"Početak XVI poglavlja",
"Start of Chapter 17":"Početak XVII poglavlja",
"Start of Chapter 18":"Početak XVIII poglavlja",
"Start of Chapter 19":"Početak XIX poglavlja",
"Start of Chapter 20":"Početak XX poglavlja",
"Start of Chapter 21":"Početak XXI poglavlja",
"Start of Chapter 22":"Početak XXII poglavlja",
"Start of Chapter 23":"Početak XXIII poglavlja",
"Start of Chapter 24":"Početak XXIV poglavlja",
"Start of Chapter 25":"Početak XXV poglavlja",
"Start of Chapter 26":"Početak XXVI poglavlja",
"Start of Chapter 27":"Početak XXVII poglavlja",
"Start of Chapter 28":"Početak XXVIII poglavlja",
"Start of Chapter 29":"Početak XIX poglavlja",
"Start of Chapter 30":"Početak XXX poglavlja",
"Start of Chapter 31":"Početak XXXI poglavlja",
"Start of Chapter 32":"Početak XXXII poglavlja",
"Start of Chapter 33":"Početak XXXIII poglavlja",
"Start of Chapter 34":"Početak XXXIV poglavlja",
"Start of Chapter 35":"Početak XXXV poglavlja",
"Start of Chapter 36":"Početak XXXVI poglavlja",
"Start of Chapter 37":"Početak XXXVII poglavlja",
"Start of Chapter 38":"Početak XXXVIII poglavlja",
"Start of Chapter 39":"Početak XXXIX poglavlja",
"Nearly ten years had passed since the Dursleys had woken up to find their nephew on the front step...":"Prošlo je skoro deset godina od onog jutra kad su Darslijevi, probudivši se, zatekli svog nećaka pred ulaznim vratima...",
"Welcome to Pottermore by J.K. Rowling":"Dobrodošli na Pottermore od Dž.K. Rouling",
"Your Pottermore username is: ":"Tvoje Pottermore ime je: ",
"Not":"Nije",
"Explore":"Istraži",
"the stories in a whole new way, stepping into and exploring the key Moments of each chapter":"priče na potpuno novi način, prolazeći kroz glavne momente svakog poglavlja",
"Discover":"Otkrijte",
"new and exclusive writing from J.K. Rowling herself":"nove i ekskluzivne priče od Dž.K. Rouling",
"Experience":"Oseti",
"Diagon Alley and the Sorting Ceremony, cast spells, brew potions and duel other witches and wizards":"Dijagon-aleju i Ceremoniju Razvrstavanja, izgovaraj čini, kuvaj napitke i idi na duele sa drugim čarobnjacima i vešticama",
"Join in":"Uđi",
"life at Hogwarts, share comments, and help your house win the House Cup":"u život na Hogvortsu, podeli komentare i pomozi svojoj kući da osvoji Školski pehar",
"Find your friends":"Nađi tvoje prijatelje",
"If you have friends who have joined Pottermore, you can find them here. ":"Ako imaš prijatelje koji su se pridružili Pottermoreu, ovde možeš da ih nađeš. ",
"Username":"Korisničko ime",
"Find friend":"Nađi prijatelja",
"Explore Pottermore":"Istraži Pottermore",
"The magical Gateway":"Magična kapija",
"The Gateway is your homepage and shows where you are in the experience. You can return here at any time using the Pottermore logo at the top of the page. Click on Chapter 1 to begin.":"Kapija je tvoja početna strana i pokazuje na kom se poglavlju nalaziš trenutno. Možeš se uvek vratit ovde klikom na logo Pottermorea na vrhu strane. Klikni na poglavlje 1 da počneš.",
"You have not collected any objects yet":"Nisi sakupio još uvek nikakve predmete",
"You can collect objects as you explore the different Moments in the story, so add these items to your Trunk whenever you find them.":"Možeš da sakupljaš predmete kad istražuješ poglavlja. Svaki put kada vidiš neki predmet, klikni na njega i dodaj ga u ostavu.",
"You have not collected any Chocolate Frog Cards yet":"Nisi sakupio još uvek nikakve kartice čokoladnih žabica",
"You can collect Chocolate Frog Cards as you explore the different Moments in the story, so add them to your Trunk whenever you find them.":"Možeš da sakupljaš kartice čokoladnih žabica kad istražuješ poglavlja. Svaki put kada vidiš neku karticu čokoladnih žabica, klikni na nju i dodaj je u ostavu.",
"You have not collected any books yet":"Nisi sakupio još uvek nikakve knjige",
"You can collect a number of books as you explore the different Moments in the story. You can also buy books from Diagon Alley with the Galleons that you collect along the way.":"Možeš da sakupljaš knjige tako što ćeš ih nalaziti u poglavljima koje istražuješ. Takođe možeš da kupiš knjige u Dijagon-aleji sa galeonima koje ćeš nalaziti u poglavljima.",
"You don't have any friends on Pottermore yet. If you know someone, why not add them as a friend?":"Trenutno nemaš prijatelja na Pottermore-u. Ako znaš nekoga, zašto ga ne dodaš?",
"Would you like to add friends?":"Da li bi želeo da dodaš prijatelje?",
"You don't have any favourite characters yet":"Nemaš još uvek nikakvih omiljenih likova",
"You can save your favourite characters by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these characters at any time.":"Možeš da sačuvaš tvog omiljenog lika, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim likovima u bilo koje doba.",
"You don't have any favourite creatures yet":"Nemaš još uvek nikakvih omiljenih bića",
"You can save your favourite creatures by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these creatures at any time.":"Možeš da sačuvaš tvoje omiljeno biće, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim bićima u bilo koje doba.",
"You don't have any favourite places yet":"Nemaš još uvek nikakva omiljena mesta",
"You can save your favourite places by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these places at any time.":"Možeš da sačuvaš tvoje omiljeno mesto, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim mestima u bilo koje doba.",
"You can save your favourite objects by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these objects at any time.":"Možeš da sačuvaš tvoje omiljene predmete, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim predmetima u bilo koje doba.",
"You can save your favourite potions by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these potions at any time.":"Možeš da sačuvaš tvoje omiljene napitke, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim napicima u bilo koje doba.",
"You can save your favourite spells by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these spells at any time.":"Možeš da sačuvaš tvoje omiljene čini, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim činima u bilo koje doba.",
"You can save your favourite chapters by clicking ‘Add to Favourites’ whenever you discover them in the story. You can then return to read about these chapters at any time.":"Možeš da sačuvaš tvoja omiljena poglavlja, klikom na 'Dodaj u omiljeno' kada god ih otkriješ u priči. Možeš da se vratiš i pročitaš sve o tim poglavljima u bilo koje doba.",
"You don't have any favourite chapters yet":"Nemaš još uvek nikakva omiljena poglavlja",
"You don't have any favourite spells yet":"Nemaš još uvek nikakve omiljene čini",
"You don't have any favourite objects yet":"Nemaš još uvek nikakve omiljene predmete",
"You don't have any favourite potions yet":"Nemaš još uvek nikakve omiljene napitke",
"Add friends":"Dodaj prijatelje",
"The story begins...":"Priča počinje...",
"Each chapter is brought to life through a series of key moments for you to explore. Reading the books at the same time will make this experience even more rewarding.":"Svako poglavlje je predstavljeno kroz nekoliko glavnih momenata koje ćeš istraživati. Čitanje knjiga u isto vreme napraviće ovo iskustvo još boljim.",
"Explore each Moment":"Istraži svaki momenat",
"There’s a lot to discover in Pottermore. Many Moments have more than one layer to explore: use your arrow buttons (or double-click) to zoom in and out, and search for hidden items to collect.":"Ima mnogo toga da se otkrije na Pottermoreu. Mnogi momenti imaju više od jednog sloja da se istraži: korsiti tvoje strelice na tastaturi (ili klikni dva puta) da bi približio ili odaljio, traži skrivene objekte i sakupi ih.",
"Discover new writing from J.K. Rowling":"Otkrij nove tekstove od Dž.K. Rouling",
"Pottermore contains extensive new material from J.K. Rowling which is not available anywhere else. Look out for the quill on the hanging sign to read this exclusive content.":"Pottermore sadrži obiman novi materijal od Dž.K. Rouling koji nije dostupan nigde drugde. Pronađi pero na okačenom znaku i pročitaj ekskluzivne dodatke.",
"You’ve discovered ‘Number Four, Privet Drive’ by J.K. Rowling!":"Otrkio si 'Šimširova ulica, broj 4.' od Dž.K. Rouling!",
"Congratulations! You’ve unlocked new material from J.K. Rowling in which she reveals the inspiration behind the Dursleys’ home. Look out for more new writing from the author in the hanging signs on the left-hand side of your page, marked with a quill.":"Čestitamo! Otvorio si novi materijal od Dž.K. Rouling u kome ona otrkiva inspiraciju za kuću Darslijevih. Vidi da li ima još novih tekstova od autora u visećim znakovima sa leve strane sajta označeno sa malim perom.",
"Look out for more new writing from the author in the hanging signs on the left-hand side of your page, marked with a quill.":"Vidi da li ima još novih tekstova od autora u visećim znakovima sa leve strane sajta označeno sa malim perom.",
"Read the hanging signs to learn more about characters and events. Keep checking back because the information will grow as you move through the story. You can also save entries to your Favourites to read later.":"Pročitaj okačene znakove da bi saznao više o likovima i događajima. Proveravaj što češće jer će se informacije o liku ili događaju stalno povećavati kada istražiš više poglavlja. Takođe možeš da sačuvaš sve tekstove u Omiljenom i pročitaš kasnije.",
"Read the signs":"Čitaj znakove",
"J.K. Rowling’s ‘Measurements’ is now unlocked for you to read":"Dž.K. Roulingov tekst o 'Merenjima' je otvoren za tebe da ga pročitaš",
"Discover J.K. Rowling’s thoughts on Muggle versus magic weights and measurements.":"Otkrij Dž.K. Roulingove misli o poređenju normalskih težina i merenja, i magičnih.",
"Put-Outer":"Ugasivač",
"Dumbledore uses this item – which looks like a silver cigarette lighter – to turn out all the lights on Privet Drive. Each time he clicks it, a light flickers out, eventually leaving the street in near-total darkness.":" Dambldor koristi ovu spravicu - koja liči na srebrni upaljač za cigarete - da ugasi sva svetla u Šimširovoj ulici. Svaki put kada klikne, svetlo izađe iz sijalice i ostavi ulicu u totalnoj tami.",
"Please type in your password to explore Pottermore":"Molimo Vas upišite Vašu šifru da biste istražili Pottermore",
"The ideal starting point for every student of Transfiguration.":"Odličan početak o preobražavanju za svakog učenika.",
"A concise, thoughtful and illuminating history of our world.":"Sažeta, promišljena i prosvetljujuća istorija našeg sveta",
"Feed your mind with the latest developments in wizardry with this in-depth study.":"Sa ovim dopunite vaš mozak sa znanjem najnovijih otkrića u čarobnjaštvu sa temeljnim objašnjenjima",
"More tales from adventurer Gilderoy Lockhart.":"Još pirča od avanturiste Gilderoja Lokharta.",
"Charm Your Own Cheese is a cookery book":"Začaraj sam svoj sir je knjiga o kuvanju.",
"Tried and tested tips to help you breed dragons, including the old-time favourite of brandy and chicken blood every half hour for newly-hatched chicks.":"Oprobani i testirani saveti koji će vam pomoći da odgajate zmajeve, uključujući i dobro poznatu mešavinu brendija i pileće krvi svakih pola sata za nedavno izlegnute zmajeve.", 
"Helga Hufflepuff Card":"Karitca Helge Haflpaf",
"Miranda Goshawk Card":"Kartica Mirande Sove",
"Privet Drive":"Šimširova ulica",
"Beatrix Bloxam Card":"Kartica Beatriks Bloks",
"Alberta Toothill Card":"Kartica Alberte Zubić",
"Beaumont Marjoribanks Card":"Kartica Beumonta Baštovana",
"Bowman Wright Card":"Kartica Boumena Rajta",
"Cassandra Vablatsky Card":"Kartica Kasandre Veblatski",
"Bridget Wenlock Card":"Kartica Bridžet Venlok",
"A Bertie Bott's Sugared Violet-Flavoured Bean":"Berti Botove bombone s ukusom ljubičice od marcipana",
"Circe Card":"Kartica čarobnice Kirke",
"Cliodna Card":"Kartica druidice Kliodine",
"Dymphna Furmage Card":"Kartica Dimfe Furidž",
"Edgar Stroulger Card":"Kartica Edgara Naučenjaka",
"Hengist of Woodcroft Card":"Kartica Hengista od Vudkrofta",
"Herpo the Foul Card":"Kartica Herpa Prljavog",
"Ignatia Wildsmith Card":"Kartica Ignacije Vildsmit",
"Joscelind Wadcock Card":"Kartica Džoseline Vodkok",
"Merwyn the Malicious Card":"Kartica Mervina Zlobnog",
"Mirabella Plunkett Card":"Kartica Mirabele Odbegulje",
"Montague Knightley Card":"Kartica Montagjea Skakača",
"Morgana Card":"Kartica Morgane",
"Newt Scamander Card":"Kartica Salamandera Skamandera",
"Paracelsus Card":"Kartica Paracelzusa",
"Albus Dumbledore Card":"Kartica Albusa Dambldora",
"Bertie Bott Card":"Kartica Berti Bota",
"Rowena Ravenclaw Card":"Kartica Rovene Revenklo",
"Salazar Slytherin Card":"Kartica Salazara Sliterina",
"Godric Gryffindor Card":"Kartica Godrika Grifindora",
"Merlin Card":"Kartica Merlina",
"Scullery Key":"Ključ kuhinjske peraonice",
"An Exploding Snap Pack":"Praskavi pucavci",
"Bottle of Skele-Gro":"Boca kostorasta",
"Dragon-dung Compost":"Mešavina zmajeve balege",
"Ginger Newt":"Đumbirov daždevnjak",
"Globe of the Moon":"Mesečev globus",
"Flesh-Eating Slug Repellent":"Sredstvo protiv mesožderskih puževa golaća",
"Prefect Badge":"Asistentska značka",
"Liquorice Wand":"Štapić od rogače",
"Jet Black Candle":"Ziftcrna voštana sveća",
"Lilac Ink":"Mastilo roze boje",
"Slimy Seaweed":"Sluzava morska alga",
"Winged Key":"Krilati ključ",
"Rock Cake":"Mramorni kolačići",
"Remembrall":"Nezaboravko",
"Magical Drafts and Potions":"Magijske smeše i napici",
"Horn of Bicorn":"Rog od dvoroga",
"Part 1":"Prvi deo",
"Part 2":"Drugi deo",
"Key ingredients":"Osnovni sastojci",
"Effects: Allows the drinker to temporarily assume the form of another person":"Efekat: Omogućava korisniku da trenutno uzme oblik druge osobe.",
"Some of these potions have effects almost too gruesome to think about.":"Neki od ovih napitaka imaju toliko jezive efekte da ih ne možeš ni smisliti.",
"Once you have the right ingredients you can begin to brew Polyjuice Potion. Some of the ingredients you require may be hard to find so you will need to be resourceful and eagle-eyed. The instructions have been split into two stages and you will have to complete stage one of the brewing process before you can move on to the second stage, even if you have all of the ingredients.":"Jednom kada imaš prave sastojke, možeš da počeneš sa kuvanjem Višesokovnog napitka. Neki od potrebne sastojke će biti teže naći, zato trebaš biti istrajan i da imaš oči sokolove. Instrukcije su podeljene u dva dela, a da bi prešli na drugi deo moraš prvo da završiš prvi, čak i ako imaš sve sastojke.",
"Take care and persevere, this is a complicated and challenging potion that even adult witches and wizards struggle to brew correctly.":"Vodi pažnju i budi istrajan, ovo je komplikovan i izazivajući napitak da se čak i odrasle veštice i čarobnjaci muče da ga skuvaju tačno.",
"Skin of Boomslang":"Koža zmije bumsleng",
"Slytherin Student Hair":"Vlas kose učenika iz Sliterina",
"Fluxweed":"Lažna nana",
"Cure for Boils":"Lek za čireve",
"Cures boils":"Leči čireve",
"Snake Fangs":"Zmijski očnjaci",
"Horned Slugs":"Rogati puževi",
"Dragon Liver":"Zmajeva jetra",
"Porcupine Quills":"Bodlje bodljikavog praseta",
"Exit Potion":"Izađi iz napitka",
"Practise brewing Cure for Boils":"Vežbaj pravljenje napitka za čireve",  
"Encyclopedia of Toadstools":"Enciklopedija otrovnih pečuraka",
"by Gilderoy Lockhart":" od Gilderoja Lokharta",
"by Newt Scamander":" od Salamandera Skamandera",
"by Kennilworthy Whisp":" od Kenilvortija Vispa",
"Moste Potente Potions":"Napici najdejstveniji",
"A Bertie Bott's Baked Bean-Flavoured Bean":"Berti Botove bombone s ukusom tosta",
"A Bertie Bott's Bogey-Flavoured Bean":"Berti Botove bombone s ukusom sline",
"A Bertie Bott's Sausage-Flavoured Bean":"Berti Botove bombone s ukusom kobasice",
"Knotgrass":"Čvornovata trava",
"Lacewing Flies":"Muve čipkastih krila", 
"Nature's Nobility: A Wizarding Genealogy":"Prirodna plemenitost: Čarobnjačka genealogija",
"From Egg to Inferno, A Dragon Keeper's Guide":"Od jaja do pakla, Vodič kroz čuvare zmajeva",
"Dragon Species of Great Britain and Ireland":"Vrste zmajeva u Velikoj Britaniji i Irskoj",
"Dragon Breeding for Pleasure and Profit":"Gajenje zmajeva radi zadovoljstva i zarade",
"Great Wizards of the Twentieth Century":"Veliki čarobnjaci dvadesetog veka",
"A Study of Recent Developments in Wizardry":"Studije o najnovijim dostignućima u čarobnjaštvu",
"Great Wizarding Events of the Twentieth Century":"Najveći čarobnjački događaji dvadesetog veka",
"Year with the Yeti":"Godina sa Jetijem",
"Important Modern Magical Discoveries":"Važna moderna magična otkrića",
"Modern Magical History":"Istorija moderne magije",
"Notable Magical Names of Our Time":"Značajna čarobnjačka imena našeg doba",
"Wizard's Chess Set":"Set za čarobnjački šah",
"Enchantment in Baking":"Čarolije za pečenje",
"One Minute Feasts - It's Magic!":"Gozba za minut - To je magija!",
"Wanderings with Werewolves":"Tumaranja sa vukodlacima",
"Voyages with Vampires":"Plovidba sa vampirima",
"Travels with Trolls":"Putovanje sa trolovima",
"Eels' Eyes":"Jeguljine oči",
"Sherbet Lemon":"Šerbet od limuna",
"A Bertie Bott's Chocolate-Flavoured Bean":"Berti Botove bombone s ukusom čokolade",
"A Bertie Bott's Coconut-Flavoured Bean":"Berti Botove bombone s ukusom kokosa",
"A Bertie Bott's Curry-Flavoured Bean":"Berti Botove bombone s ukusom karija",
"A Bertie Bott's Pepper-Flavoured Bean":"Berti Botove bombone s ukusom bibera",
"A Bertie Bott's Liver and Tripe-Flavoured Bean":"Berti Botove bombone s ukusom džigerice i škembića",
"A Bertie Bott's Overcooked Cabbage-Flavoured Bean":"Berti Borove bombone s ukusom prekuvanog kupusa",
"A Bertie Bott's Sardine-Flavoured Bean":"Berti Botove bombone s ukusom sardine",
"A Bertie Bott's Soap-Flavoured Bean":"Berti Botove bombone s ukusom sapuna",
"A Bertie Bott's Strawberry-Flavoured Bean":"Berti Botove bombone s ukusom jagoda",
"A Bertie Bott's Vomit-Flavoured Bean":"Berti Botove bombone s ukusom povraćke",
"Crystal Phials":"Kristalna flašica",
"Glass Phials":"Staklena flašica",
"Toffee":"Karamela",
"Magical Drafts and Potion":"Magijske smeše i napici",
"Arsenius Jigger":"Arsenius Epruveta",
"by Emeric Switch":" od Emerika Promenljivog",
"Magical Theory":"Teorija magije",
"by Adalbert Waffling":" od Adalberta Trabunjala",
"One Thousand Magical Herbs and Fungi":"1000 čarobnih trava i gljiva",
"by Phyllida Spore":" od Listice Spore",
"Holidays with Hags":"Raspust sa starim vešticama",
"Gadding with Ghouls":"Lutanje sa zlodusima",
"Buy":"Kupi",
"Flourish and Blotts":"Kitnjavko i Mrljavko",
"Apothecary":"Apoteka",
"by Bathilda Bagshot":" od Batilde Torbarke",
"Hogwarts: A History":"Hogvorts: Istorija",
"Magical Me":"Magičan ja",
"Quidditch through the Ages":"Kvidič kroz vekove",
"Fantastic Beasts and Where to Find Them":"Fantastične zveri i gde ih naći",
"Alarm Clock":"Sat na alarm",
"Bertie Bott's Every-Flavour Beans":"Berti Botove bombone svih ukusa",
"Brass Scales":"Vaga od mesinga",
"Brass Telescope":"Teleskop od mesinga",
"Candle":"Sveća",
"Dragon Egg":"Zamjevo jaje",
"Fire Tongs":"Hvataljke za vatru",
"Earmuffs":"Naušnjaci",
"Floo Powder":"Flu prašak",
"Grey Feather":"Sivo pero",
"Golden Snitch":"Zlatna skrivalica",
"Hammer and Nails":"Čekić i ekseri",
"Mask":"Maska",
"Moon Chart":"Karta meseca",
"Old Cup":"Stara šoljica",
"Nettle Wine":"Vino od koprive",
"Peacock Quill":"Paunovo pero",
"Postcard from London":"Razglednica iz Londna",
"Protective Gloves":"Zaštitne rukavice",
"Pruning Shears":"Makaze za obrezivanje",
"Quill":"Pero",
"Salt and Pepper Pots":"Bočice soli i bibera",
"Sea Shell":"Morska školjka",
"Second year Shopping List":"Spisak knjiga i opreme za drugu godinu",
"Shopping List":"Spisak knjiga i opreme",
"Signed Photo of Lockhart":"Potpisana slika Lokharta",
"Silver Scales":"Srebrna vaga",
"Small Trowel":"Mala lopatica",
"Sponge":"Sunđer",
"Star Chart":"Karta zvezda",
"Tea Cup":"Šoljica za čaj",
"Third Year Shopping List":"Spisak knjiga i opreme za treću godinu",
"Tiny Brass Compass":"Mali kompas od mesinga",
"Valentine's Day card":"Pismo za Dan zaljubljenih",
"Vault Key":"Ključ od sefa",
"Brass Cauldron":"Kotao od mesinga",
"Copper Cauldron":"Kotao od bakra",
"Material":"Materijal",
"Size":"Veličina",
"Brass":"Mesing",
"Copper":"Bakar",
"Use this cauldron":"Koristi ovaj kotao",
"Brewing potions takes time and great skill. Only one cauldron can be used at a time to brew potions, so choose wisely.":"Za kuvanje napitaka treba mnogo vremena i odlične sposobnosti. Samo jedan kotao može da se koristi dok se pravi napitak zato biraj mudro.",
"Buy cauldrons from Diagon Alley":"Kupi kotlove u Dijagon-aleji",
"Dragon Blood":"Zmajeva krv",
"Bat Wings":"Krila šišmiša",
"Honey":"Med",
"Lavender":"Lavanda",
"Leeches":"Pijavice",
"Peppermint":"Nana",
"Rose Oil":"Ružino ulje",
"Rose Thorns":"Ružino trnje",
"Unicorn Blood":"Jednorogova krv",
"Unicorn Horn":"Jednorogov rog",
"Your ingredients shelf":"Polica sa tvojim sastojcima",
"Dried Nettles":"Osušena kopriva",
"Curses and Counter-Curses":"Kletve i protivkletve",
"Vindictus Viridian":"Osvetnikus Zelembać",
"Tongue-Tying Spell":"Čin za svezan jezik",
"Jelly-Legs Curse":"Kletva gumenih nogu",
"Ties tongue in knot":"Vezuje jezik u čvor",
"Legs collapse":"Izaziva rušenje nogu",
"Leg-Locker Curse":"Čin vezivanja nogu",
"Binds legs":"Vezuje noge",
"Full Body-Bind":"Čin sputavanja celog tela",
"Paralyses":"Paralizira",
"Tickling Hex":"Golicljiva vradžbina",
"Tickles and weakens":"Izaziva golicanje i osećaj slabosti",
"Stickfast Hex":"Stopalolepljiva vradžbina",
"Sticks shoes to floor":"Lepi cipele za pod",
"You can play Wizard's Duel with the spells in this book for a chance to earn house points.":"Možeš da igraš Čarobnjačke duele sa činima iz ove knjige i osvojiš poene za svoju kuću",
"Bewitch your friends and befuddle your enemies with the latest revenges: Hair Loss, Jelly-Legs, Tongue-Tying and much, much more.":"Začarajte prijatelje i zbunite neprijatelje najnovijim vrstama osvete: Gubitak kose, Gumene noge, Svezan jezik i još mnogo, mnogo toga.",
"You can also practise some of the spells before you duel against an opponent - just look out for the 'Practise' buttons.":"Takođe možete i da vežbate ove čini pre čarobnjačkog duela - samo kliknite na dugme 'Vežbaj'.",
"The Dark Forces: A Guide to Self-Protection":"Mračne sile: Vodič za samozaštitu",
"Quentin Trimble":"Kventin Drhtavi",
"This book gives an excellent grounding in magical self-defence.":"Ova knjiga daje odlične osnove u magijskoj samoodbrani.",
"Miranda Goshawk":" Miranda Sova",
"by Cassandra Vablatsky":" od Kasandre Veblatski",
"Unfogging the Future":"Otkrivanje budućnosti",
"The Monster Book of Monsters":"Monstruozna knjiga monstruma",
"A Beginner's Guide to Transfiguration":"Početnički vodič kroz preobražavanje",
"Break with a Banshee":"Odmor s vilom zlosutnicom",
"Charm Your Own Cheese":"Začaraj sam svoj sir",
"Intermediate Transfiguration":"Umereno preobražavanje",
"Gilderoy Lockhart's Guide to Household Pests":"Priručnik za kućnu gamad",
"Your objects":"Broj predmeti",
"Books":"Knjige",
"Chocolate Frog Cards":"Kartice iz čokoladnih žabica",
"Send as gift":"Pošalji kao poklon",
"Previous":"Prethodno",
"Next":"Sledeće",
"Your books":"Broj knjiga",
"Your Chocolate Frog Cards":"Broj kartica iz čokoladnih žabica",
"A History of Magic":"Istorija magije",
"Badges":"Bedževi",
"Collecting":"Sakupljanje",
"Games":"Igre",
"Read About":"Pročitaj više",
"Collect":"Sakupi",
"You unlock the Pottermore badge!":"Osvoji si Pottermore značku",
"J.K. Rowling on the Hufflepuff common room":"Dž.K. Rouling o haflpafskom dnevnom boravku",
"J.K. Rowling on the Slytherin common room":"Dž.K. Rouling o sliterinskom dnevnom boravku",
"J.K. Rowling on the Gryffindor common room":"Dž.K. Rouling o grifindorskom dnevnom boravku",
"J.K. Rowling on the Ravenclaw common room":"Dž.K. Rouling o revenklovskom dnevnom boravku",
"Storyline":"Priče",
"Check your email regularly":"Proveri svoj imejl",
"Thank you for signing up to Pottermore. The sign up process is nearly complete. We will send you joining instructions to the following email address: ":"fjdfksdf",
"Brewed":"Napravljeni",
"Ingredients":"Sastojci",
"Cauldrons":"Kotlovi",
"Potion books":"Knjige napitaka",
"Your favourites":"Tvoje omiljeni",
"Your potions, ingredients, potion books and cauldrons":"Tvoji napici, sastojci, knjige napitaka i kotlovi",
"Sign in to Pottermore":"Prijavi se na Pottermore",
"Please enter your username":"Molimo Vas upišite Vaše korisničko ime",
"Forgotten your username?":"Zaboravili ste Vaše korisničko ime?",
"Please enter your password":"Molimo Vas upišite Vašu lozinku",
"Forgotten your password?":"Zaboravili ste Vašu lozinku?",
"Keep me signed in":"Ostavi me prijavljenog",
"Join Pottermore now":"Pridružite se Pottermore-u",
"Pottermore uses cookies as explained in our":"Pottermore koristi kolačiće kao što je objašnjeno u našoj ",
"To change your cookie settings please see our ":"Kako da promenite Vaše kolačiće pročitajte u našim ",
"pages.":" stranice.",
"Harry Potter and Pottermore Publishing Rights © J.K. Rowling":"Hari Poter i Pottermore izdavačka prava © Dž.K. Rouling",
"Harry Potter characters, names and related indicia are trademarks of and © Warner Bros. Ent. All Rights Reserved":"Likovi iz Hari Potera, imena i sve povezanosti su zaštitni znakovi od © Warner Bros. Ent. Sva prava zadržana",
"You will need to complete the brewing instructions in the right order within the time limit.":"Moraćeš da odradiš pravljenje napitka sa pravilnim redosledom instrukcija koje ti dajemo i sa vremenskim limitom.",
"Are you magical?":"Da li si magičan?",
"Hufflepuff":"Haflpaf",
"History of Hogwarts":"Istorija Hogvortsa",
"points":"poena",
"Slytherin":"Sliterin",
"Welcome":"Dobrodošao ",
"House points":"Kućni poeni ",
"Hello":"Zdravo",
"J.K. Rowling exclusive content":"Dž.K. Rouling ekskluzivni tekstovi",
"Chamber of Secrets":"Dvorana tajni",
"The Chamber of Secrets":"Dvorana Tajni",
"Chapter":"Poglavlje",
"The serpents parted as the wall cracked open, the halves slid smoothly out of sight, and Harry, shaking from head to foot, walked inside.":"Bla bla bla bla blakgeodfčwfewfkew",
"Back":"Nazad",
"people like this":"ljudi voli ovo",
"Like":"Sviđa mi se",
"View profile":"Pogledaj profil",
"New from J.K. Rowling":"Tekstovi na: pottermore.co.nr",
"Polyjuice Potion":"Višesokovni napitak",
"Comments":"Komentari",
"Drawings and pictures":"Crteži i slike",
"Show more":"Prikaži više",
"Add a drawing":"Dodaj crtež",
"Report drawing":"Prijavi crtež",
"Report this":"Prijavi ovo",
"Also in this chapter":"Takođe u ovom poglavlju",
"Harry Potter":"Hari Poter",
"Hermione Granger":"Hermiona Grejndžer",
"Characters":"Likovi",
"Read more":"Pročitaj više",
"Hogwarts School of Witchcraft and Wizardry":"Hogvorts škola magije i čarobnjaštva",
"Set Books":"Lista knjiga",
"Go shopping":"Idi u kupovinu",
"Galleons":" Galeoni",
"house points":" kućni poeni",
"Gryffindor":"Grifindor",
"Ravenclaw":"Revenklo",
"The Great Hall":"Velika sala",
"Headmaster:":"Direktor:",
"Professor Dumbledore":"Profesor Dambldor",
"Founders:":"Pronalazači:",
"Godric Gryffindor":"Godrik Grifindor",
"Salazar Slytherin":"Salazar Sliterin",
"Helga Hufflepuff":"Helga Haflpaf",
"Rowena Ravenclaw":"Rovena Revenklo",
"School leaders":"Lideri u bodovima",
"Most house points":"Najviše sakupljenih kućnih bodova",
"Wizard's Duel":"Čarobnjački dueli",
"Play Wizard's Duel":"Igraj čarobnjačke duele",
"Wizard's Duel leaderboard":"Tabela bodova dobijenih iz duela",
"Points":"Poeni",
"Students:":"Broj studenata:",
"HARRY POTTER and the Prisoner of Azkaban":"Hari Poter i zatvorenik iz Askabana",
"Unlike":"Ne sviđa mi se",
"Recent activity":"Skorašnje aktivnosti",
"Add Comment":"Dodaj komentar",
"The Polyjuice Potion":"Višesokovni Napitak",
"It took a long time to persuade Hermione to leave the bathroom. Moaning Myrtle sped them on their way with a hearty guffaw.":"Bla bla bla",
"Account settings":"Podešavanja naloga",
"Sign out":"Odjavi se",
"Before you can begin your Pottermore journey,":"Pre nego što počneš svoje Pottermore putovanje,",
"by J.K. Rowling":"od Dž.K. Rouling",
"Shop":"Prodavnica",
"The exclusive home of the Harry Potter eBooks and digital audio books":"Ekskluzivni deo sajta sa Hari Poter online i audio knjigama",
"Shop now":"Idi u kupovinu",
"Sign up":"Registruj se",
"Sign in":"Prijavi se",
"What is Pottermore?":"Šta je Pottermore?",
"Explore the Harry Potter stories in a whole new way and discover exclusive new writing from J.K. Rowling.":"Istražuj Hari Poter knjige na potpuno novi način, posebno napisano od strane Dž. K. Rouling.",
"The first story in the series, Harry Potter and the Philosopher’s Stone, is now ready for you to explore – but that’s just the beginning of the Pottermore journey…":"Prve priče iz knjige 'Hari Poter i kamen mudrosti' su spremne za tvoje istraživanje, ali to je samo početak Pottermore avanture...",
"Before you can begin your Pottermore journey, you need to find out whether or not you are magical …":"Pre nego što počneš tvoju Pottermore avanturu, moraš da saznaš da li si magičan ili ne ...",
"About Pottermore":"O Pottermore-u",
"Pottermore Shop":"Pottermore prodavnica",
"Pottermore Insider":"Blog Pottermore-a",
"Child Safety":"Bezbednost dece",
"Privacy Policy":"Politika privatnosti",
"Help":"Pomoć",
"Terms & Conditions":"Uslovi",
"Change language":"Promeni jezik",
"Pottermore is currently unavailable.":"Pottermore je trenutno nedostupan.",
"Please come back later and try again.":"Molimo Vas vratite se kasnije i probajte opet.",
"Cookies on Pottermore":"Kolačići na Pottermore-u",
"We use cookies to give you the very best experience on the Pottermore website and to allow you to make use of all our site features. If you continue without changing your cookie settings, you consent to receiving all cookies on our website. If you would like to, however, you can change these settings at any time. Find out more.":"Koristimo kolačiće da bi Vam dali odlično iskustvo na Pottermore-u i da bismo Vam obezbedili da koristite sve delove sajta. Ako nastavite bez menjanja podešavanja kolačića, saglasni ste da dajete kolačiće na našem sajtu. Ako želite, svakako, možete da promenite ova podešavanja kada god hoćete. Otkrijte više.",
"Continue":"Nastavite",
"The Boy Who Lived":"Dečak koji je preživeo",
"The Vanishing Glass":"Staklo koje nestaje",
"The Letters from No One":"Pisma niotkoga",
"The Keeper of the Keys":"Čuvar ključeva",
"Diagon Alley":"Dijagon-aleja",
"The Journey from Platform Nine and Three-Quarters":"Polazak sa perona devet i tri četvrtine",
"The Sorting Hat":"Šešir za razvrstavanje",
"The Potions Master":"Majstor napitaka",
"The Midnight Duel":"Ponoćni dvoboj",
"Hallowe'en":"Noć veštica",
"Quidditch":"Kvidič",
"The Mirror of Erised":"Ogledalo Ejnduž",
"Nicolas Flamel":"Nikolas Flamel",
"Norbert the Norwegian Ridgeback":"Norbert, norveški šiljkoleđi",
"The Forbidden Forest":"Zabranjena šuma",
"Through the Trapdoor":"Kroz vratanca na podu",
"The Man with Two Faces":"Čovek s dva lica",
"HARRY POTTER and the Philosopher's Stone":"Hari Poter i kamen mudrosti",
"and the Prisoner of Azkaban":" i zatvorenik iz Askabana",
"and the Chamber of Secrets":" i dvorana tajni",
"and the Goblet of Fire":" i vatreni pehar",
"and the Half-Blood Prince":" i polukrvni princ",
"and the Order of the Phoenix":" i red feniksa",
"and the Deathly Hallows":" i relikvije smrti",
"Ron Weasley":"Ron Vizli",
"*Harry Potter and the Prisoner of Azkaban*":"*Hari Poter i zatvorenik iz Askabana*",
"*Harry Potter and the Chamber of Secrets*":"*Hari Poter i dvorana tajni*",
"*Harry Potter and the Goblet of Fire*":"*Hari Poter i vatreni pehar*",
"*Harry Potter and the Half-Blood Prince*":"*Hari Poter i polukrvni princ*",
"*Harry Potter and the Order of the Phoenix*":"*Hari Poter i red feniksa*",
"*Harry Potter and the Deathly Hallows*":"*Hari Poter i relikvije smrti*",
"Buy the official Harry Potter eBooks and digital audiobooks from the":"Kupi zvanične Hari Poter eKnjige i digitalne audio knjige u",
"Add to Favourites":"Dodaj u omiljeno",
"Slytherin house":"Kuća Sliterina",
"Founder":"Pronalazač",
"House ghost":"Kućni duh",
"The Bloody Baron":"Krvavi baron",
"Slytherin will help you on the way to greatness":"Sliterin će ti pomoći na putu do moći",
"The Fat Friar":"Debeli Fratar",
"Those patient Hufflepuff are true and unafraid of toil":"Strpljivi Haflpafovci su pravedni i neuplašeni od rada",
"The Gray Lady":"Siva Dama",
"Wit beyond measure is man's greatest treasure":"Razum preko svake mere je najveće blago",
"Nearly Headless Nick":"Skoro-obezglavljeni Nik",
"Their daring, nerve and chivalry set Gryffindors apart":"Njihova smelost, strpljenje i viteštvo odvaja Grifindor od drugih",
"House Notices":"Kućna obaveštenja",
"Leaderboard":"Lideri u Bodovima",
"Gringotts Wizarding Bank":"Čarobna banka Gringots",
"vault":"sef",
"Your balance":"Stanje na računu",
"Go to Diagon Alley":"Idi u Dijagon-aleju",
"Exit bank":"Izađi iz banke",
"HARRY POTTER":"Hari Poter",
"and the Philosopher's Stone":"i kamen mudrosti",
"Friends on this chapter:":"Broj prijatelja na ovom poglavlju:",
"Explore Chapter":"Istraži poglavlje",
"Hufflepuff house":"Kuća Haflpafa",
"Gryffindor house":"Kuća Grifindora",
"Raveclaw house":"Kuća Revenkla",
"Mr and Mrs Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you’d expect to be involved in anything strange or mysterious, because they just didn’t hold with such nonsense...":"Gospodin i gospođa Darsli iz Šimširove ulice broj četiri s ponosom su isticali kako su oni sasvim normalni, moliću lepo. Od njih biste najmanje očekivali da budu umešani u nešto čudno ili tajanstveno, jer uopšte nisu trpeli takve gluposti...",
"Explore Chapter 1":"Istraži poglavlje",
"Explore Chapter 2":"Istraži poglavlje",
"Explore Chapter 3":"Istraži poglavlje",
"Explore Chapter 4":"Istraži poglavlje",
"Explore Chapter 5":"Istraži poglavlje",
"Explore Chapter 6":"Istraži poglavlje",
"Explore Chapter 7":"Istraži poglavlje",
"Explore Chapter 8":"Istraži poglavlje",
"Explore Chapter 9":"Istraži poglavlje",
"Explore Chapter 10":"Istraži poglavlje",
"Explore Chapter 11":"Istraži poglavlje",
"Explore Chapter 12":"Istraži poglavlje",
"Explore Chapter 13":"Istraži poglavlje",
"Explore Chapter 14":"Istraži poglavlje",
"Explore Chapter 15":"Istraži poglavlje",
"Explore Chapter 16":"Istraži poglavlje",
"Explore Chapter 17":"Istraži poglavlje",
"Explore Chapter 18":"Istraži poglavlje",
"Explore Chapter 19":"Istraži poglavlje",
"Explore Chapter 20":"Istraži poglavlje",
"Explore Chapter 21":"Istraži poglavlje",
"Explore Chapter 22":"Istraži poglavlje",
"Explore Chapter 23":"Istraži poglavlje",
"Explore Chapter 24":"Istraži poglavlje",
"Explore Chapter 25":"Istraži poglavlje",
"Explore Chapter 26":"Istraži poglavlje",
"Explore Chapter 27":"Istraži poglavlje",
"Explore Chapter 28":"Istraži poglavlje",
"Explore Chapter 29":"Istraži poglavlje",
"Explore Chapter 30":"Istraži poglavlje",
"Explore Chapter 31":"Istraži poglavlje",
"Explore Chapter 32":"Istraži poglavlje",
"Explore Chapter 33":"Istraži poglavlje",
"Explore Chapter 34":"Istraži poglavlje",
"Explore Chapter 35":"Istraži poglavlje",
"Explore Chapter 36":"Istraži poglavlje",
"Explore Chapter 37":"Istraži poglavlje",
"Explore Chapter 38":"Istraži poglavlje",
"Explore Chapter 39":"Istraži poglavlje",
"Number Four, Privet Drive":"Šimširova ulica, broj 4.",
"Read about":"Pročitaj više",
"Something Peculiar is Happening":"Nešto posebno se dešava",
"Objects":"Predmeti",
"Creatures":"Bića",
"Places":"Mesta",
"From the story":"Iz priče",
"Owls":"Sove",
"Harry is Delivered":"Hari je isporučen",
"Step":"Korak",
"We just need a few details so we can create your account for you.":"Treba nam samo nekoliko detalja da bismo ti napravili profil",
"When were you born?":"Kada si rođen?",
"January":"Januar",
"February":"Februar",
"March":"Mart",
"April":"April",
"May":"Maj",
"June":"Jun",
"July":"Jul",
"August":"Avgust",
"September":"Septembar",
"October":"Oktobar",
"November":"Novembar",
"December":"Decembar",
"We ask this because of our commitment to child safety":"Pitamo ovo zbog dečije bezbednosti",
"Congratulations!":"Čestitamo!",
"You are magical":"Ti si magičan",
"List of magical folk":"Lista magične dece",
"Ronald Weasley":"Ronald Vizli",
"Cho Chang":"Čo Čang",
"Vincent Crabbe":"Vinsent Kreb",
"Neville Longbottom":"Nevil Longbotom",
"Luna Lovegood":"Luna Lavgud",
"Draco Malfoy":"Drako Melfoj",
"Padma Patil":"Padma Petil",
"Pansy Parkinson":"Pensi Perkinson",
"Parvati Patil":"Parvati Petil",
"Ginevra Weasley":"Džinerva Vizli",
"Oliver Wood":"Oliver Drvce",
"Fred Weasley":"Fred Vizli",
"George Weasley":"Džordž Vizli",
"Lee Jordan":"Li Džordan",
"Lavender Brown":"Lavander Braun",
"Please choose your username":"Molimo te izaberi svoje ime",
"Choose a username that is easy for you to remember.":"Izaberi korisničko ime koje ćeš lako zapamtiti.",
"Why is this my username?":"Zašto je ovo moje korisničko ime?",
"We choose your username to protect your identity and ensure child safety.":"Izabrali smo ova korisnička imena da bi zaštitili tvoj indetitet i osigurali dečiju bezbednost.",
"Please type these two words into the box below, separated by a space.":"Molimo te prepiši ove dve reči u pravougaonik dole sa razmacima.",
"Type the two words:":"Prepiši dve reči:",
"We will send your joining instructions to:":"Poslaćemo ti sve instrukcije o priključivanju sajtu na:",
"Change":"Promeni",
"Create my account":"Napravi moj nalog",
"Member since":"Član od",
"Current house points":"Trenutni broj skupljenih poena",
"Total house points":"Ukupan broj skupljenih poena",
"Wand":"Štapić",
"Length":"Dužina",
"Wood":"Drvo",
"Cypress":"Čempres",
"Aspen":"Jasika",
"Beech":"Bukva",
"Blackthorn":"Trnjina",
"Black Walnut":"Crni orah",
"Cedar":"Kedar",
"Cherry":"Trešnja",
"Chestnut":"Kesten",
"Dogwood":"Sviba",
"Ebony":"Abonos",
"Elder":"Zova",
"Elm":"Brest",
"English Oak":"Engleski hrast",
"Fir":"Jela",
"Hawthorn":"Glog",
"Hazel":"Lešnik",
"Holly":"Zelenika",
"Hornbeam":"Grab",
"Larch":"Ariš",
"Laurel":"Lovor",
"Maple":"Javor",
"Pear":"Kruška",
"Pine":"Bor",
"Poplar":"Topola",
"Red Oak":"Crveni hrast",
"Redwood":"Sekvoja",
"Rowan":"Oskoruša",
"Silver lime":"Srebrna lipa",
"Spruce":"Smreka",
"Sycamore":"Smokva",
"Vine":"Vinova loza",
"Walnut":"Orah",
"Willow":"Vrba",
"Yew":"Tisovina",
"Spells":"Čini",
"Potions":"Napici",
"Friends":"Prijatelji",
"Your friends":"Tvoji prijatelji",
"View and manage":"Vidi i uredi",
"Trunk":"Ostava",
"Chapters":"Poglavlja",
"Favourites":"Omiljeno",
"Drawings":"Crteži",
"You haven’t added any drawings yet":"Nisi dodao još nijedan crtež",
"Your books, Chocolate Frog Cards and objects":"Tvoje knjige, kartice iz čokoladnih žabica i predmeti.",
"Your spells and spell books":"Tvoje čini i knjige čini",
"Spell books":"Knjige čini",
"The Standard Book of Spells, Grade 1":"Standardna knjiga čini, 1.godina",
"The Standard Book of Spells, Grade 2":"Standardna knjiga čini, 2.godina",
"by":"od ",
"Practise":"Vežbaj",
"Effects":"Efekti",
"feedback":"povratne informacije",
"Account Settings":"Podešavanja naloga",
"Book":"Knjiga",
"Current location":"Trenutna lokacija",
"chapter 1":"1. poglavlje",
"chapter 2":"2. poglavlje",
"chapter 3":"3. poglavlje",
"chapter 4":"4. poglavlje",
"chapter 5":"5. poglavlje",
"chapter 6":"6. poglavlje",
"chapter 7":"7. poglavlje",
"chapter 8":"8. poglavlje",
"chapter 9":"9. poglavlje",
"chapter 10":"10. poglavlje",
"chapter 11":"11. poglavlje",
"chapter 12":"12. poglavlje",
"chapter 13":"13. poglavlje",
"chapter 14":"14. poglavlje",
"chapter 15":"15. poglavlje",
"chapter 16":"16. poglavlje",
"chapter 17":"17. poglavlje",
"chapter 18":"18. poglavlje",
"chapter 19":"19. poglavlje",
"chapter 20":"20. poglavlje",
"chapter 21":"21. poglavlje",
"chapter 22":"22. poglavlje",
"chapter 23":"23. poglavlje",
"chapter 24":"24. poglavlje",
"chapter 25":"25. poglavlje",
"chapter 26":"26. poglavlje",
"chapter 27":"27. poglavlje",
"chapter 28":"28. poglavlje",
"chapter 29":"29. poglavlje",
"chapter 30":"30. poglavlje",
"chapter 31":"31. poglavlje",
"chapter 32":"32. poglavlje",
"chapter 33":"33. poglavlje",
"chapter 34":"34. poglavlje",
"chapter 35":"35. poglavlje",
"chapter 36":"36. poglavlje",
"chapter 37":"37. poglavlje",
"chapter 38":"38. poglavlje",
"chapter 39":"39. poglavlje",
"Enter":"Uđi",
"View by:":"Gledano pomoću:",
"Nickname":" Ime",
"Find friends":"Pronađi prijatelje",
"Challenge":"Izazovi me",
"Send gift":"Pošalji poklon",
"Remove friend":"Ukloni iz prijatelja",
"All":"Sve",
"Pottermore username":"Pottermore korisničko ime",
"Report user":"Prijavi korisnika",
"Show all":"Pokaži sve",
"View":"Vidi",
"Chapter 1":"I poglavlje",
"Chapter 2":"II poglavlje",
"Chapter 3":"III poglavlje",
"Chapter 4":"IV poglavlje",
"Chapter 5":"V poglavlje",
"Chapter 6":"VI poglavlje",
"Chapter 7":"VII poglavlje",
"Chapter 8":"VIII poglavlje",
"Chapter 9":"IX poglavlje",
"Chapter 10":"X poglavlje",
"Chapter 11":"XI poglavlje",
"Chapter 12":"XII poglavlje",
"Chapter 13":"XIII poglavlje",
"Chapter 14":"XIV poglavlje",
"Chapter 15":"XV poglavlje",
"Chapter 16":"XVI poglavlje",
"Chapter 17":"XVII poglavlje",
"Chapter 18":"XVIII poglavlje",
"Chapter 19":"XIX poglavlje",
"Chapter 20":"XX poglavlje",
"Chapter 21":"XXI poglavlje",
"Chapter 22":"XXII poglavlje",
"Chapter 23":"XXIII poglavlje",
"Chapter 24":"XXIV poglavlje",
"Chapter 25":"XXV poglavlje",
"Chapter 26":"XXVI poglavlje",
"Chapter 27":"XXVII poglavlje",
"Chapter 28":"XXVIII poglavlje",
"Chapter 29":"XXIX poglavlje",
"Chapter 30":"XXX poglavlje",
"Chapter 31":"XXXI poglavlje",
"Chapter 32":"XXXII poglavlje",
"Chapter 33":"XXXIII poglavlje",
"Chapter 34":"XXXIV poglavlje",
"Chapter 35":"XXXV poglavlje",
"Chapter 36":"XXXVI poglavlje",
"Chapter 37":"XXXVII poglavlje",
"Chapter 38":"XXXVIII poglavlje",
"Chapter 39":"XXXIX poglavlje",
"All students should have a copy of each of the following:":"Svi studenti bi trebali imati sledeće knjige:",
"The Standard Book of Spells, Grade 3":"Standardna knjiga čini, 3.godina",
"The Standard Book of Spells, Grade 4":"Standardna knjiga čini, 4.godina",
"The Standard Book of Spells, Grade 5":"Standardna knjiga čini, 5.godina",
"The Standard Book of Spells, Grade 6":"Standardna knjiga čini, 6.godina",
"The Standard Book of Spells, Grade 7":"Standardna knjiga čini, 7.godina",
"Buy ingredients from Diagon Alley":"Kupi sastojke u Dijagon-aleji",
"Brew this potion":"Skuvaj ovaj napitak",
"Friend found":"Pronađeni prijatelji",
"Add as a friend":"Dodaj za prijatelja",
"Cancel":"Otkaži",
"Edit":"Promeni",
"Unicorn":"Dlaka jednoroga",
"Phoenix Feather":"Pero feniksa",
"Dragon":"Zmajev srčani nerv",
"Report status":"Prijavi status",
"House":"Kuća",
"Everyone":"Svi",
"Display":"Pokaži",
"Birthday":"Datum rođenja",
"Hide":"Sakrij",
"Show":"Prikaži"},
"tag":{
"Series and Characters":{
"Series":{
"You will need to complete the brewing instructions in the right order within the time limit.":"Инструкциите за правење напиток морате да ги извршите по правилен редослед, во период од даденото време.",
"Are you magical?":"Дали си волшебен?",
"Hufflepuff":"Хафлпаф",
"History of Hogwarts":"Историја на Хогвортс",
"points":"поени",
"Slytherin":"Слитерин",
"Welcome":"Добредојдовте",
"House points":"Куќни поени",
"Hello":"Здраво",
"J.K. Rowling exclusive content":"Ексклузивна содржина од Џ. К. Роулинг",
"Chamber of Secrets":"Одаја на тајните",
"The Chamber of Secrets":"Одајата на тајните",
"Chapter":"Глава",
"The serpents parted as the wall cracked open, the halves slid smoothly out of sight, and Harry, shaking from head to foot, walked inside.":"Змиите се разделуваа како што вратата се отвораше, двете половини исчезнаа од видик и Хари, тресејќи се од глава до пети, влезе внатре.",
"Back":"Назад",
"people like this":"луѓе го сакаат ова",
"Like":"Ми се допаѓа",
"View profile":"Види профил",
"New from J.K. Rowling":"Содржини на pottermore.co.nr",
"Polyjuice Potion":"Повеќесоковен напиток",
"Comments":"Коментари",
"Drawings and pictures":"Цртежи и слики",
"Show more":"Прикажи повеќе",
"Add a drawing":"Додај цртеж",
"Report drawing":"Пријави цртеж",
"Report this":"Пријави го ова",
"Also in this chapter":"Исто така во оваа глава",
"Harry Potter":"Хари Потер",
"Hermione Granger":"Хермиона Грејнџер",
"Characters":"Ликови",
"Read more":"Прочитај повеќе",
"Hogwarts School of Witchcraft and Wizardry":"Хогвортс училиште за магии и волшебништво",
"Set Books":"Листа на книги",
"Go shopping":"Одете да пазарувате",
"Galleons":"Галеони",
"house points":"куќни поени",
"Gryffindor":"Грифиндор",
"Ravenclaw":"Ревенкло",
"The Great Hall":"Големата сала",
"Headmaster:":"Директор:",
"Professor Dumbledore":"Професор Дамблдор",
"Founders:":"Основачи:",
"Godric Gryffindor":"Годрик Грифиндор",
"Salazar Slytherin":"Салазар Слитерин",
"Helga Hufflepuff":"Хелга Хафлпаф",
"Rowena Ravenclaw":"Ровена Ревенкло",
"School leaders":"Лидери во поени",
"Most house points":"Најмногу куќни поени",
"Wizard's Duel":"Волшебнички дуели",
"Play Wizard's Duel":"Играј Волшебнички дуели",
"Wizard's Duel leaderboard":"Табела на поени добиени од Волшебничките дуели",
"Points":"Поени",
"Students:":"Број на студенти:",
"HARRY POTTER and the Prisoner of Azkaban":"Хари Потер и затвореникот од Аскабан",
"Unlike":"Не ми се допаѓа",
"Recent activity":"Последни активности",
"Add Comment":"Додај коментар",
"The Polyjuice Potion":"Повеќесоковниот напиток",
"It took a long time to persuade Hermione to leave the bathroom. Moaning Myrtle sped them on their way with a hearty guffaw.":"Им беше потребно долго време да ја убедат Хермиона да го напушти тоалетот. Плачливата Миртл им олесни во тоа со нејзиното гласно врискање.",
"Account settings":"Прилагодување на профилот",
"Sign out":"Одјави се",
"Before you can begin your Pottermore journey,":"Пред да ја започнете вашата Потермор авантура",
"by J.K. Rowling":"од Џ. К. Роулинг"
},
"Video Games":{
"永江衣玖":"Nagae Iku"},
}},"custom":{
}};


translations.custom = getLocalObject("PTP_Custom", {});

var settings = getLocalObject("PTP_Settings_110701",
                              {
                                  translate_text_nodes: true,
                                  translate_value_nodes: true,
                                  translate_title_nodes: false,
                                  translate_page_titles: true,
                                  translate_pages: true,
                                  translate_tags: true,
                                  transliterate_katakana: false,
                                  transliterate_hiragana: false,
                                  quick_translate_enabled: true,
                                  hide_ads: true,
                                  visible_highlighting: true
                              });

var tempsettings = getSessionObject("PTP_Settings_110701",
                                    {
                                        menu_up: false,
                                        last_tab: "ptp_options_tab",
                                        last_cat: "",
                                        last_subcat: "",
                                        last_tag_action: "ptp_tags_searchbar",
                                    });


/*JSON FUNCTIONS*/
function mergeJSON(obj1, obj2){
    var newobj = {};
    for(var z in obj1)
        newobj[z] = obj1[z];
    for(var z in obj2)
        newobj[z] = obj2[z];
    return newobj;
}

function sortJSONByValue(obj){
    var newobj = {};
    var temp = [];
    for(var key in obj)
        temp.push(obj[key]);
    temp.sort();
    for(var i = 0; i < temp.length; i++)
        for(var key in obj)
            if(obj[key] == temp[i]){
                newobj[key] = temp[i];
                break;
            }
    return newobj;
}

function sortJSONByKey(obj){
    var newobj = {};
    var temp = [];
    for(var key in obj){temp.push(key);}
    temp.sort();
    for(var i = 0; i < temp.length; i++)
        for(var key in obj)
            if(key == temp[i]){
                newobj[key] = obj[key];
                delete obj[key];
                break;
            }
    return newobj;
}

function reverseJSON(obj){
    var newobj = {};
    for(var key in obj)
        newobj[obj[key]] = key;
    return newobj;    
}

function getNestedProperties(obj){
    var newobj = {};
    var current;
    for(var x in obj){
        current = obj[x];
        if(typeof current === "object"){
            var subproperties = getNestedProperties(current);
            for(var y in subproperties)
                newobj[y] = subproperties[y];
        }
        else if(obj.hasOwnProperty(x))
            newobj[x] = current;
    }
    return newobj;
}   

var compiledTranslations = {};
var compiledTransliterations = {};

if(settings.translate_tags)
    compiledTranslations = mergeJSON(getNestedProperties(translations.tag), translations.custom);
if(settings.translate_pages)
    compiledTranslations = mergeJSON(translations.page, compiledTranslations);
if(settings.transliterate_katakana)
    compiledTransliterations = mergeJSON(translations.katakana, compiledTransliterations);
if(settings.transliterate_hiragana)
    compiledTransliterations = mergeJSON(translations.hiragana, compiledTransliterations);

function translateTree(root, translationObject, transliterationObject){
    function translateNodes(nodes, to, tlo){
        function hasProperty(o){
            var ret = false;
            for(var x in o)
                if(o.hasOwnProperty(x)){
                    ret = true;
                    break;
                }
            return ret;
        }
        var node = null;
        var text, trans = "";
        var haveto = hasProperty(to);
        var havetlo = hasProperty(tlo);
        if(haveto || havetlo){
            for(var i = 0, l = nodes.snapshotLength; i < l; i++){
                node = nodes.snapshotItem(i);
                if(!(text = node.nodeValue.replace(/^\s*/, "").replace(/\s*$/, "")))
                    continue;
                if(haveto && !(trans = to[text]) && /\d+/.test(text)){
                    var tn, sn = [];
                    var numtext = text; //create copy of text to do number replacement on
                    while(tn = numtext.match(/\d+/)){
                        sn.push(tn[0]);
                        numtext = numtext.replace(/\d+/, "[[D]]");
                    }
                    if(trans = to[numtext])
                        while(sn.length)
                            trans = trans.replace(/\[\[D\]\]/, sn.shift());
                }
                if(havetlo && !trans){
                    trans = "";
                    for(var ki = 0, kl = text.length; ki < kl; ki++){
                        var kana = text.charAt(ki);
                        var tl = tlo[kana];
                        if(tl)
                            trans += tl;
                        else
                            trans += kana;
                    }
                }
                if(trans)
                    node.nodeValue = trans;
            }
        }
    }
    
    if(settings.translate_text_nodes)
        translateNodes(document.evaluate('.//text()[not(ancestor::*[@ptpel] or ancestor::script or ancestor::style) and normalize-space(.)!=""]', root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), translationObject, transliterationObject);
    if(settings.translate_value_nodes)
        translateNodes(document.evaluate('.//@value[not(ancestor::*[@ptpel] or ancestor::input[@id="suggest-input" or @class="query" or @id="form2" or @id="search_keyword" or @id="bar_search"]) and normalize-space(.)!=""]', root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), translationObject, transliterationObject);
    if(settings.translate_title_nodes)
        translateNodes(document.evaluate('.//@title[not(ancestor::*[@ptpel]) and normalize-space(.)!=""]', root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), translationObject, transliterationObject);
}

function translateDocTitle(translationObject, transliterationObject){
    var title = document.title;
    var tt = title.match(/「(.*?)」/);
    if(tt){
        var temp = document.createElement("div");
        var tr = "";
        if(/\s/.test(tt[1])){
            tt = tt[1].split(" ");
            for(var i = 0; i < tt.length; i++){
                temp.appendChild(document.createTextNode(" "));
                temp.appendChild(document.createTextNode(tt[i]));
            }
            temp.removeChild(temp.firstChild);
        }
        else
            temp.appendChild(document.createTextNode(tt[1]));
        
        translateTree(temp, translationObject, transliterationObject);
        title = title.replace(title.match(/「(.*?)」/)[1], temp.innerHTML);
    }
    document.title = title;
}

//CREATE UI ELEMENTS//
var fragment = document.createDocumentFragment();
var ptp_menu = ce("div", {"id": "ptp_menu", "style": "width: 100%; height: 160px; position:fixed; bottom: -165px; overflow: hidden; background-color: white; display: none; z-index: 9999;"});    
/*var shadow = null;
var csr = undefined;
if(ptp_menu.webkitCreateShadowRoot)
{
    shadow = ptp_menu.webkitCreateShadowRoot();
    fragment = shadow;
}
   
else if (window.WebKitShadowRoot){
    shadow = new WebKitShadowRoot(ptp_menu);
    fragment = shadow;
}*/
ptp_menu.innerHTML = ""
    +"<table id='ptp_tabs' class='tv'>"
    +    "<tr>"
    +        "<td style='width: 94%;'><div id='ptp_options_tab' class='tv_tab'>Podešavanja</div></td>"
    +        "<td style='width: 1%;'><div id='ptp_custom_tab' class='tv_tab'></div></td> "
    +        "<td style='width: 1%;' white-space: nowrap;><div id='ptp_google_tab' class='tv_tab'></div></td>"
    +        "<td style='width: 1%;'><div id='ptp_tags_tab' class='tv_tab'></div></td>"
    +        "<th style='width: 3%;'><div id='ptp_menu_close' class='tv_tab'>⨯</div></th></tr></table>"
    
    +"<table id='ptp_options' style='width: 100%; height: 95%; float: left; opacity: 1;'>"
    +    "<tr>"
    +        "<td style='width: 25%; vertical-align: top;'>"
    +            "<div class='section'>"
    +                "<b class='section_head'>Glavna podešavanja</b><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Prevodi linkove na sajtu.' style='cursor: help;'>Prevod linkova</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Prevod tastera' style='cursor: help;'>Prevod tastera</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Prevod oblačića.' style='cursor: help;'>Prevod oblačića</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Prevod naslova' style='cursor: help;'>Naslovi tekstova</span></span></div></td>"
    +        "<td style='width: 25%; vertical-align: top;'>"
    +            "<div class='section'>"
    +                "<b class='section_head'>Prevodi</b><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Srpski prevod sajta Pottermore' style='cursor: help;'>Srpski jezik</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Makednoski prevod sajta Pottermore' style='cursor: help;'>Makedonski jezik</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Neodrađeno' style='cursor: help;'>/</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Neodređeno' style='cursor: help;'>/</span></span></div></td>"
    +        "<td style='width: 25%; vertical-align: top;'>"
    +            "<div class='section'>"
    +                "<b class='section_head'>Dodatna podešavanja</b><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Prevod se učitava kada i stranica' style='cursor: help;'>Brzi prevodi(Čim se stranica učita)</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Sakrij reklame sa sajta.' style='cursor: help;'>Sakrij reklame</span></span><br/>"
    +                "<span>"
    +                    "<input type='checkbox'>"
    +                    "<span title='Ako je crna pozadina, tekst će se automatski prebaciti u belu' style='cursor: help;'>Promena boje teksta</span></span></div></td>"
    +         "<td style='width: 25%; vertical-align: top;'>"
    +             "<div class='section'>"
    +                 "<b class='section_head'>Prevodi sa vašeg kompjutera</b><br/>"
    +                 "<table>"
    +                     "<tr>"
    +                         "<td>Podešavanja</td>"
    +                        "<td><input id='ptp_save' type='button' value='Sačuvaj'> (Napravite prevod na kompjuteru i ubacite ge na sajt)</td>"
    +                     "<tr>"
    +                         "<td>Prikaži vaše prevode</td>"
    +                         "<td><input id='ptp_export' type='button' value='Prikaži'></td></tr>"
    +                       "<tr>"
    +                         "<td colspan='2'><input id='ptp_import' type='file'></td></tr></table></div></td></tr></table>"

    
    +"<table id='ptp_tags' style='height: 95%; width: 100%; opacity: 1; display: none;'>"
    +    "<tr>"
    +        "<td style='width: 20%; vertical-align: top;'>"
    +            "<div  class='section'>"
    +                "<b class='section_head'>Kategorije</b><br/>"
    +                "<div id='ptp_tags_cats' style='height: 100%; width: 100%; white-space: nowrap; overflow: auto; overflow-x: hidden;'></div></div></td>"
    +        "<td style='width: 20%; vertical-align: top;'>"
    +            "<div  class='section'>"
    +                "<b class='section_head'>Potkategorije</b><br/>"
    +                "<div id='ptp_tags_subcats' style='height: 100%; width: 100%; white-space: nowrap; overflow: auto; overflow-x: hidden;'></div></div></td>"
    +        "<td style='width: 20%; vertical-align: top;'>"
    +            "<div  class='section'>"
    +                "<b class='section_head'>Prevodi</b><br/>"
    +                "<div id='ptp_tags_taglist' style='height: 100%; width: 100%; white-space: nowrap; overflow: auto; overflow-x: hidden;'></div></div></td>"
    +        "<td style='width: 20%; vertical-align: top;'>"
    +            "<div  class='section'>"
    +                "<b class='section_head'>Opcije prevoda</b><br/>"
    +                "<div>"
    +                    "<form id='ptp_tags_actions'>"
    +                        "<input id='ptp_tags_searchbar' name='ptp_tag_action' value='ptp_tags_searchbar' type='radio'> Dodaj u pretraživač<br/>"
    +                        "<input id='ptp_tags_newtab' name='ptp_tag_action' value='ptp_tags_newtab' type='radio'> Pretraži u novoj kartici<br/>"
    +                        "<input id='ptp_tags_pixpedia' name='ptp_tag_action' value='ptp_tags_pixpedia' type='radio'> Enciklopedija<br/>"
    +                        "<input id='ptp_tags_pixpedia_google' name='ptp_tag_action' value='ptp_tags_pixpedia_google' type='radio'> Enciklopedija Gugla<br/></form></div></div></td></tr></table>"
    
    +"<table id='ptp_custom' border='1' style='width: 100%; height: 100%; float: left; overflow-x: hidden; overflow-y: auto; opacity: 1; display: none;'>"
    +        "<tr>"
    +            "<td style='width: 10%; height: 10%;'><input id='ptp_custom_add' style='width: 100%;' type='button' value='Dodaj'></td>"
    +            "<td style='width: 40%; height: 10%;'><input id='ptp_custom_en' placeholder='Srpski' style='width: 97.5%;'></td>"
    +            "<td style='width: 40%; height: 10%;'><input id='ptp_custom_ja' placeholder='Engleski' style='width: 97.5%;'></td></tr>"
    +        "<tr>"
    +            "<td style='width: 100%; height: 100%; vertical-align: top;' colspan='3'>"
    +                "<div style='width: 100%; height: 95px; overflow-y: auto; overflow-x: hidden;'>"
    +                    "<table id='ptp_custom_list' style='width: 100%;' border='1'></table></div></td></tr></table>"
    
    
    +"<table id='ptp_google' style='width: 100%; height: 100%; float: left; opacity: 1; display: none;'>"
    +        "<tr style='text-align: center;'>"
    +            "<td style='vertical-align: top;'>"
    +                "<textarea id='ptp_google_en' style='width: 97.5%; height: 117px;' placeholder='Engleski'></textarea></td>"
    +            "<td style='text-align: center; vertical-align: top;'>"
    +                "<input id='ptp_google_en2ja' type='button' value='→' style='width: 100%;'><br/>"
    +                "<input id='ptp_google_addcustom' type='button' value='C' style='width: 100%; position: relative; top: 23.5px;'><br/>"
    +                "<input id='ptp_google_ja2en' type='button' value='←' style='width: 100%; position: relative; top: 47px;'></td>"
    +            "<td style='vertical-align: top;'>"
    +                "<textarea id='ptp_google_ja' style='width: 97.5%; height: 117px;' placeholder='Japanese'></textarea></td></tr></table>";

var ptp_menu_open = ce("div", {"class": "tv_tab", "style": "width: 3.5%; position: fixed; right: 0px; bottom: 0px; background-color:rgba(94, 158, 206, 0.5); z-index:9002;"});
ptp_menu_open.textContent = "Srpski";

var ptp_auto_container = ce("div", {"style": "position: absolute; z-index: 9999999;"});
var ptp_auto = ce("table", {"style": "width: 100%; background-color: rgb(255, 255, 255); font-size: 11px; border: 1px solid rgb(183, 183, 183); overflow-x: hidden; display: none;"});
ptp_auto_container.appendChild(ptp_auto);

fragment.appendChild(ptp_menu);
fragment.appendChild(ptp_menu_open);

function _(id){return fragment.querySelector("#" + id);}
var ptp_menu_close = _("ptp_menu_close");
var ptp_options_tab = _("ptp_options_tab");
var ptp_options = _("ptp_options");
var ptp_save = _("ptp_save");
var ptp_export = _("ptp_export");
var ptp_import = _("ptp_import");

var ptp_custom_tab = _("ptp_custom_tab");
var ptp_custom = _("ptp_custom");
var ptp_custom_add = _("ptp_custom_add");
var ptp_custom_en = _("ptp_custom_en");
var ptp_custom_ja = _("ptp_custom_ja");
var ptp_custom_list = _("ptp_custom_list");

var ptp_google_tab = _("ptp_google_tab");
var ptp_google = _("ptp_google");
var ptp_google_ja2en = _("ptp_google_ja2en");
var ptp_google_en2ja = _("ptp_google_en2ja");
var ptp_google_addcustom = _("ptp_google_addcustom");
var ptp_google_ja = _("ptp_google_ja");
var ptp_google_en = _("ptp_google_en");

var ptp_tags_tab = _("ptp_tags_tab");
var ptp_tags = _("ptp_tags");
var ptp_tags_cats = _("ptp_tags_cats");
var ptp_tags_subcats = _("ptp_tags_subcats");
var ptp_tags_taglist = _("ptp_tags_taglist");
var ptp_tags_actions = _("ptp_tags_actions");

//PAGE FORMATTING//    
var ptp_css = ""
    +    "a.PTPa{display: block; cursor: pointer; width: 100%; padding-left: 3px;}"
    +    "a.PTPa:hover{background-color: rgb(204, 238, 255);}"
    +    "td.PTPtd{padding-top: 2px; padding-bottom: 2px; padding-left: 3px; padding-right: 3px;}"
    +    ".unit-rating{z-index: 0;}"
    
    +".tv {"
    +"  padding: 0px;"
    +"  float: none;"
    +"  width: 99.5%;"
    +"  margin-top: -1px"
    +"}"
    
    +".tv_tabs {"
    +"  margin-bottom: -2px;"
    +"  float: left;"
    +"  background-color:#d0d9d9;"
    +"}"
    
    +".tv_selected {"
    +"  background-color:#ffffff !important;"
    +"  border-bottom-style: none !important;"
    +"}"
    
    +".tv_tab {"
    +"  white-space: nowrap;"
    +"  overflow: hidden;"
    +"  background-color:#efefef;"
    +"  cursor:pointer;"
    +"  width: 98%;"
    +"  text-align: center;"
    +"  vertical-align: middle;"
    +"  float: left;"
    +"  padding: 3px;"
    +"  margin-right: 1px;"
    +"  margin-bottom: -1px;"
    +"  border-radius: 3px 3px 0px 0px;"
    +"  border: 2px black solid;"
    +"}"
    
    +".tv_contents {"
    +"  min-height: 400px;"
    +"  border-radius: 0px 3px 3px 3px;"
    +"  border: 1px black solid;"
    +"  background-color:#efefef;"
    +"}"
    
    +".section {"
    +"  vertical-align: top;"
    +"  width: 85%;"
    +"  height: 100px;"
    +"  float: left;"
    +"  display: block;"
    +"  border-radius: 3px 3px 3px 3px;"
    +"  border: 1px black solid;"
    +"  padding: 0px 10px 15px 10px;"
    +"  margin: 10px;"
    +"}"
    
    +".section_td {"
    +"  float: left;"
    +"  width: 730;"
    +"}"
    
    +".section_head {"
    +"  padding: 3px;"
    +"  display: inline;"
    +"  position:relative;"
    +"  top: -8px;"
    +"  left: -2px;"
    +"  background-color:#ffffff;"
    +"}";

if(settings.hide_ads){
    ptp_css += ""
        +    "iframe{display: none !important}"
        +    ".ads_area{display: none !important}"
        +    ".popular-introduction{display: none !important}"
        +    ".require-premium{display: none !important}"
        +    ".user-ad-container{display: none !important}"
        +    ".ad-footer{display: none !important}";
    
    document.addEventListener('DOMContentLoaded', function(){
        var extlinks = document.evaluate("//a[@target='_blank']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < extlinks.snapshotLength; i++){
            var extlink = extlinks.snapshotItem(i);
            var exthref = extlink.getAttribute("href");
            if(exthref && /jump\.php\?/i.test(exthref))        
                extlink.setAttribute("href", decodeURIComponent(exthref.replace(/^\//, "").replace(/^jump\.php\?/i, "")));
        }
    }, false);
}

if(settings.visible_highlighting){
    ptp_css += ""
        +    "*::-moz-selection{background: #0000FF !important; color: #FFFFFF !important;}"
        +    "*::selection{background: #0000FF !important; color: #FFFFFF !important;}";
}

var newstyle = ce("style", {"type": "text/css"});
newstyle.appendChild(document.createTextNode(ptp_css));

//UI FUNCTIONS//
//MENU/GENERAL//
function show(el){el.style.display = "";}
function hide(el){el.style.display = "none";}

function animateBottom(el, bottom, jump, delay, callback){
    var sbottom = parseInt(el.style.bottom);
    if(sbottom !== NaN && sbottom !== bottom){
        if(Math.abs(sbottom - bottom) <= jump){
            if(callback)
                callback();
            return;
        }
        else if(sbottom < bottom)
            el.style.bottom = (sbottom + jump) + "px";
        else if(sbottom > bottom)
            el.style.bottom = (sbottom - jump) + "px";
    }
    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
    var nextcall = function(){animateBottom(el, bottom, jump, delay, callback);};
    if(raf)
        raf(nextcall);
    else
        setTimeout(nextcall, delay);
}

function handleTagClick(e){
    e.preventDefault();
    var jap = e.target.getAttribute("title");
    switch(tempsettings.last_tag_action){
        case "ptp_tags_searchbar":{
            if(!searchbar.value)
                searchbar.value = jap;
            else
                searchbar.value += " " + jap;
            searchbar.focus();
        } break;
        case "ptp_tags_newtab":{window.open("http://www.pixiv.net/search.php?word="  + jap + "&s_mode=s_tag");} break;
        case "ptp_tags_pixpedia":{window.open("http://dic.pixiv.net/a/"  + jap);} break;
        case "ptp_tags_pixpedia_google":{window.open("http://translate.google.com/translate?hl=en&sl=ja&tl=en&u=" + encodeURIComponent("http://dic.pixiv.net/a/" + jap));} break;
    }
}

function toggleMenu(){
    if(!tempsettings.menu_up){
        animateBottom(ptp_menu, 0, 10, 1, function(){return true});
        animateBottom(ptp_menu_open, -30, 2, 1, function(){hide(ptp_menu_open);});
        tempsettings.menu_up = true;
        show(ptp_menu);
    }
    
    else{
        animateBottom(ptp_menu, -170, 10, 1, function(){hide(ptp_menu);});
        animateBottom(ptp_menu_open, 0, 2, 1, function(){return(true)});
        tempsettings.menu_up = false;
        show(ptp_menu_open);
    }
    
    setSessionObject("PTP_Settings_110701", tempsettings);
}

function tabSwitch(target){
    var tabs = [ptp_options_tab, ptp_tags_tab, ptp_custom_tab, ptp_google_tab];
    var tables = [ptp_options, ptp_tags, ptp_custom, ptp_google];
    
    for(var i = 0; i < tabs.length; i++){
        var tab = tabs[i];
        var table = tables[i];
        if(tab == target){
            tab.setAttribute("class", "tv_tab tv_selected");
            show(table);
        }
        else{
            tab.setAttribute("class", "tv_tab");
            hide(table);
        }
    }
    tempsettings.last_tab = target.getAttribute("id");
    setSessionObject("PTP_Settings_110701", tempsettings);
}

//OPTIONS//
function saveSettings(){
    var inputs = ptp_options.getElementsByTagName("input");
    var i = 0;
    for(var setting in settings){
        if(inputs[i].getAttribute("type") == "checkbox")
            settings[setting] = inputs[i].checked;
        i++;
    };  
    setLocalObject("PTP_Settings_110701", settings);
    if(localStorage.getItem("PTP_Settings_110701") == JSON.stringify(settings))
        notify("Settings updated successfully!");
    else
        notify("Failed to save settings. Please check your localStorage permissions.");
}

function exportCustom(){
    var bg = ce("textarea", {"style":"height:100%;width:100%;background-color:#FFFFFF;position:fixed;"});
    document.body.innerHTML = "";
    bg.textContent = JSON.stringify(translations.custom);
    document.body.appendChild(bg);
    bg.select();
    document.title = "COPY TO TXT FILE";
}

function importCustom(e){
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e){
        try{
            translations.custom = mergeJSON(JSON.parse(e.target.result), translations.custom);
            setLocalObject("PTP_Custom", translations.custom);
            makeCustomRows();
            notify("Translations imported successfully!");
        }
        catch(err){notify("Error importing translations: " + err.message);}
    };
    reader.readAsText(file);
}

//TAG LIST//
function listCats(){
    ptp_tags_cats.innerHTML = "";
    ptp_tags_subcats.innerHTML = "";
    ptp_tags_taglist.innerHTML = "";
    for(var category in translations.tag){
        var a = ce("a", {"class": "PTPa", "cat": category});
        a.innerHTML = category;
        a.addEventListener("click", function(e){listSubcats(e.target.getAttribute("cat"));}, false);
        ptp_tags_cats.appendChild(a);
    }
}

function listSubcats(category){
    ptp_tags_subcats.innerHTML = "";
    ptp_tags_taglist.innerHTML = "";
    var catcache = translations.tag[category];
    for(var subcategory in catcache){    
        var a = ce("a", {"class": "PTPa", "cat": category, "sub": subcategory});
        a.innerHTML = subcategory;
        a.addEventListener("click", function(e){listTags(e.target.getAttribute("cat"), e.target.getAttribute("sub"));}, false);
        ptp_tags_subcats.appendChild(a);
    }
    tempsettings.last_cat = category;
    setSessionObject("PTP_Settings_110701", tempsettings);
}

function listTags(category, subcategory){
    ptp_tags_taglist.innerHTML = "";
    var subcache = translations.tag[category][subcategory];
    for(var tag in subcache){
        var a = ce("a", {"class": "PTPa", "title": tag});
        a.innerHTML = subcache[tag];
        a.addEventListener("click", function(e){handleTagClick(e)}, false);
        ptp_tags_taglist.appendChild(a);
    }
    tempsettings.last_subcat = subcategory;
    setSessionObject("PTP_Settings_110701", tempsettings);
}

function changeAction(){
    var actions = document.getElementsByName("ptp_tag_action");
    for(var i = 0; i < actions.length; i++)
        if(actions[i].checked){
            tempsettings.last_tag_action = actions[i].value;
            setSessionObject("PTP_Settings_110701", tempsettings);
        }
}

//CUSTOM translations//
function addCustom(eng, jap){
    translations.custom[jap] = eng;
    compiledTranslations[jap] = eng;
    setLocalObject("PTP_Custom", translations.custom);
    ptp_custom_ja.value = "";
    ptp_custom_en.value = "";
    makeCustomRows();
    var tempTrans = {};
    tempTrans[jap] = eng;
    translateTree(document.body, tempTrans, compiledTransliterations);
    if(settings.translate_page_titles)
        translateDocTitle(tempTrans, compiledTransliterations);
}

function delCustom(jap){
    var eng = translations.custom[jap];
    delete translations.custom[jap];
    delete compiledTranslations[jap];
    setLocalObject("PTP_Custom", translations.custom);    
    makeCustomRows();
    var tempTrans = {};
    tempTrans[eng] = jap;
    translateTree(document.body, tempTrans, compiledTransliterations);
}

function integrateCustom(){
    var choosePath = function(o, path){
        var msg = "";
        var choices = [];
        var choice = null;
        for(var x in o)
            if(typeof o[x] === "object"){
                msg += choices.length + " : " + x + "\n";
                choices.push(x);
            }
        if(choices.length > 0)
            choice = choices[parseInt(prompt(msg, ""))];
        return (choice !== null && choices.length > 0) ? choosePath(o[choice], (function(){path.push(choice); return path;}())) : path;
    };
    
    var path = [];
    var target = null;
    var temp = null;
    for(var jap in translations.custom){
        document.body.innerHTML = translations.custom[jap] + " / " + jap;
        target = translations;
        path = choosePath(translations, []);
        for(var i = 0; i < path.length; i++){
            temp = target[path[i]];
            if(temp)
                target = temp;
        }
        if(confirm("Add " + translations.custom[jap] + " / " + jap + " to\n\n" + path)){
            target[jap] = translations.custom[jap];
            target = sortJSONByValue(target);
        }
    }
    translations.custom = {};
    document.body.innerHTML = "var translations = " + JSON.stringify(translations).replace(/((",)|(:{)|("},))/gi, "$1<br\/>") + ";";
}
//window.addEventListener("DOMContentLoaded", function(){integrateCustom();}, false);

function makeCustomRows(){
    while(ptp_custom_list.firstChild)
        ptp_custom_list.removeChild(ptp_custom_list.firstChild);
    
    translations.custom = sortJSONByValue(translations.custom);
    
    for(var jap in translations.custom){
        var ncr = ce("tr");
        var ncd = ce("td", {"style": "width: 10%"});
        var ncdb = ce("input", {"type": "button", "value": "Izbriši", "style": "width: 100%", "jap": jap});
        ncdb.addEventListener("click", function(e){delCustom(e.target.getAttribute("jap"));}, false);
        ncd.appendChild(ncdb);
        ncr.appendChild(ncd);
        
        var nce = ce("td", {"style": "width: 40%", "onmouseover": "this.style.background='rgb(204, 238, 255)';", "onmouseout": "this.style.background='';"});
        var nca = ce("a", {"class": "PTPa", "title": jap, "href": "http://www.pixiv.net/tags.php?tag=" + jap});
        nca.appendChild(document.createTextNode(translations.custom[jap]));
        nca.addEventListener("click", function(e){handleTagClick(e);}, false);
        nce.appendChild(nca);
        ncr.appendChild(nce);
        
        var ncj = ce("td", {"style": "width: 40%"});
        ncj.appendChild(document.createTextNode(jap));
        ncr.appendChild(ncj);
        
        ptp_custom_list.appendChild(ncr);
    }
}

window.addEventListener("storage", function(e){
    if(e.key === "PTP_Custom"){
        translations.custom = getLocalObject("PTP_Custom", translations.custom);
        if(document.getElementById("ptp_custom"))
            makeCustomRows();
        translateTree(document.body, translations.custom, compiledTransliterations);
        if(settings.translate_page_titles)
            translateDocTitle(translations.custom, compiledTransliterations);
    }
}, false);

//GOOGLE TRANSLATE//
function requestTranslation(input, from, to, targetid){
    GM_xmlhttpRequest({
        method: "post",
        url: "http://translate.google.com/",
        data: "js=n&prev=_t&hl=en&ie=UTF-8&layout=2&eotf=0&sl=" + from + "&tl=" + to + "&text=" + input + "&file=",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        onload: function(response){
            var html = response.responseText; 
            html = html.match(/<span id=result_box.*?div>/)[0];
            html = html.replace(/<.*?>/g, "");
            var e = ce('div'); //These three lines are a workaround to unescape special HTML symbols like < and >
            e.innerHTML = html;
            html = e.childNodes[0].nodeValue;
            document.getElementById(targetid).value = html;
        }
    });
}

function quickTrans(e){
    if(e.altKey && (e.keyCode == 90 || e.keyCode == 88)){
        var text = window.getSelection().toString();
        if(text){
            if(!tempsettings.menu_up)
                toggleMenu();
            tabSwitch(ptp_google_tab);
            if(e.keyCode == 90){
                ptp_google_ja.value = text;
                ptp_google_ja2en.click();
            }
            else if(e.keyCode == 88){
                ptp_google_en.value = text;
                ptp_google_en2ja.click();
            }
        }
    }
}

function autoComplete()
{
    var query = searchbar.value.replace(/[^a-zA-Z 0-9 \- \+ \. \! \? \" \']+/gi, "").replace(/^\s*/gi, "");
    
    if(query){
        var tagquery = new RegExp("^" + query, "i");
        var query = new RegExp(query, "i");
        var tags = translations.tag;
        for(var category in tags){
            var np = ce("p", {"style": "font-size: 11px; font-weight: bold; text-align: center; cursor: default;"});
            np.appendChild(document.createTextNode(category));
            ptp_auto.appendChild(np);
            var catcache = tags[category];
            for(var subcategory in catcache){
                var subcache = catcache[subcategory];
                for(var jap in subcache){
                    if(tagquery.test(subcache[jap])){
                        var nsa = ce("a", {"class": "PTPa", "title": jap, "href": "http://www.pixiv.net/tags.php?tag=" + jap});
                        nsa.addEventListener("click", function(e){searchbar.value = searchbar.value.replace(query, ""); handleTagClick(e);}, false);
                        nsa.appendChild(document.createTextNode(subcache[jap]));
                        ptp_auto.appendChild(nsa);
                    }
                }
            }
        }    
        var cnp = ce("p", {"style": "font-size: 11px; font-weight: bold; text-align: center; cursor: default;"});
        cnp.appendChild(document.createTextNode("Custom"));
        ptp_auto.appendChild(cnp);
        
        for(var cjap in translations.custom){
            if(tagquery.test(translations.custom[cjap])){
                var cnsa = ce("a", {"class": "PTPa", "title": cjap, "href": "http://www.pixiv.net/tags.php?tag=" + cjap});
                cnsa.addEventListener("click", function(e){searchbar.value = searchbar.value.replace(query, ""); handleTagClick(e);}, false);
                cnsa.appendChild(document.createTextNode(translations.custom[cjap]));
                ptp_auto.appendChild(cnsa);
            }
        }    
        for(var i = 0; i < 6; i++){
            var headers = ptp_auto.getElementsByTagName("p");
            for(var j = 0; j < headers.length; j++){
                if(headers[j].nextSibling == headers[j + 1])
                    ptp_auto.removeChild(headers[j]);
            }
        }
    }
}

function onExists(getTargetFunc, callbackFunc){
    var handler = function(e){var target = getTargetFunc(e); if(target){document.removeEventListener("DOMNodeInserted", handler, false); callbackFunc();}};
    document.addEventListener("DOMNodeInserted", handler, false);
}

onExists(function(){return document.head;}, function(){
    document.head.appendChild(newstyle);
});

onExists(function(){return document.title;}, function(){
    if(settings.translate_page_titles)
        translateDocTitle(compiledTranslations, compiledTransliterations);
});

document.addEventListener("DOMContentLoaded", function(){
    translateTree(document.body, compiledTranslations, compiledTransliterations);
    searchbar = document.getElementById("suggest-input") || //pixiv.net
        		(function(){var x = null;if(x = document.getElementsByClassName("query"))return x[0];}()) || //dic.pixiv.net
            	document.getElementById("form2") || //nijie.info
                document.getElementById("search_keyword") || //tinami.com
                document.getElementById("bar_search") || // seiga.nicovideo.jp
                document.getElementById("bar_search") || // pottermore.com
          	    ce("input");
    if(searchbar.parentNode){
        function findPos(obj){    
            var curleft = 0, curtop = 0;
            if(obj.offsetParent){
                curleft = obj.offsetLeft;
                curtop = obj.offsetTop;
                while (obj = obj.offsetParent){
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                }
            }
            return [curleft,curtop];
        }
        var pos = findPos(searchbar);
        ptp_auto_container.style.left = (pos[0] - ptp_auto_container.clientWidth) + "px";
        ptp_auto_container.style.top = (pos[1] - ptp_auto_container.clientHeight + searchbar.clientHeight) + "px";
        ptp_auto_container.style.width = (searchbar.clientWidth) + "px";
        document.body.appendChild(ptp_auto_container);
        searchbar.addEventListener("keyup", function(){if(searchbar.value){ptp_auto.innerHTML = ""; autoComplete(); show(ptp_auto);} else hide(ptp_auto);}, false);
        searchbar.addEventListener("blur", function(){document.body.addEventListener("click", function(){hide(ptp_auto); document.body.removeEventListener("click", arguments.callee, false);}, false);}, false);
        searchbar.addEventListener("focus", function(){show(ptp_auto);}, false);
    }
    ptp_menu_open.addEventListener("click", function(){toggleMenu();}, false);
    ptp_menu_close.addEventListener("click", function(){toggleMenu();}, false);
    for(var i = 0, ptp_tabs = _("ptp_tabs").getElementsByTagName("td"); i < ptp_tabs.length; i++){ptp_tabs[i].addEventListener("click", function(e){tabSwitch(e.target)}, false);}
    ptp_save.addEventListener("click", function(){saveSettings();}, false);
    ptp_export.addEventListener("click", function(){exportCustom();}, false);
    ptp_import.addEventListener("change", function(e){importCustom(e);}, false);
    ptp_tags_actions.addEventListener("click", function(){changeAction();}, false);
    ptp_custom_add.addEventListener("click", function(){addCustom(ptp_custom_en.value, ptp_custom_ja.value);}, false);
    ptp_google_ja2en.addEventListener("click", function(){requestTranslation(ptp_google_ja.value, "ja", "en", "ptp_google_en");}, false);
    ptp_google_en2ja.addEventListener("click", function(){requestTranslation(ptp_google_en.value, "en", "ja", "ptp_google_ja");}, false);
    ptp_google_addcustom.addEventListener("click", function(){addCustom(ptp_google_en.value, ptp_google_ja.value); tabSwitch(ptp_custom_tab);}, false);
    if(settings.quick_translate_enabled){document.addEventListener("keydown", function(e){quickTrans(e);}, false);}
    
    //RESTORE MENU STATE// 
    tabSwitch(_(tempsettings.last_tab));
    var inputs = ptp_options.getElementsByTagName("input");
    
    var i = 0;
    for(var setting in settings){
        if(inputs[i].getAttribute("type") == "checkbox")
            inputs[i].checked = settings[setting];
        i++;
    }
    makeCustomRows();
    listCats();
    if(tempsettings.last_cat){
        listSubcats(tempsettings.last_cat);
        if(translations.tag[tempsettings.last_cat][tempsettings.last_subcat])
            listTags(tempsettings.last_cat, tempsettings.last_subcat);
    }
    
    _(tempsettings.last_tag_action).setAttribute("checked", "true");
    
    document.body.appendChild(fragment);
    
    if(tempsettings.menu_up){
        tempsettings.menu_up = false;
        toggleMenu();
    }
    
    var MutationObserver = MutationObserver || WebKitMutationObserver || MozMutationObserver;
    var observer = new MutationObserver(function(mutations){
        observer.disconnect();
        mutations.forEach(function(mutation){
            for(var i = 0; i < mutation.addedNodes.length; i++)
                translateTree(mutation.addedNodes[i], compiledTranslations, compiledTransliterations);
        });
        observer.observe(document.body, {subtree: true, childList: true});
    });
    observer.observe(document.body, {subtree: true, childList: true});
}, false);