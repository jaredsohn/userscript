// ==UserScript==
// @name           Magyar-eRepublik mod by via_mala
// @namespace      http://userscripts.org/users/87322
// @description    Az eRepublik magyar fordítása: eRepHun. Renszarv eredeti forráskódját Lopici Gaspar felturbózta, így már az AJAX-os szövegek is lefordíthatóakká váltak. A szövegeket via_mala (tolojeno) bővítgette ki.
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
"Lopici Gaspar" : "Lopici Gaspar (<a href = 'http://userscripts.org/scripts/show/48700'>eRepHun script fejlesztés</a>)",
"via_mala" : "via_mala (<a href = 'http://userscripts.org/scripts/show/48700'>eRepHun fordítás</a>)",
// 2009.04.21. via_mala added
"no active battles" : "nincs aktív csata",
"Buy extra storage" : "További tárolóhely vásárlása",
"Buy wellness" : "Gyógyszer vásárlás",
"days" : "napok",
"months" : "hónapok",
"years" : "évek",
"online" : "belépve",
"Check your unlocked features" : "Vizsgáld meg a zárolt jellemzőidet",
"No shouts posted by this Citizen yet" : "Ez a polgár még nem kiáltott be semmit",
"Fights" : "Küzdelmek",
"See all donations" : "Az összes adomány",
"Show all donations" : "Az összes adomány",
"Price with taxes" : "Adóval megnövelt ár",
"Show candidate list" : "Jelöltlista",
"Show candidates list" : "Jelöltlista",
"See candidate list" : "Jelöltlista",
"No candidate proposed" : "Nincs javasolt jelölt",
"Candidate" : "Jelölt",
"candidates" : "jelöltek",
"You haven't worked today." : "Ma még nem dolgoztál",
"You have not worked today." : "Ma még nem dolgoztál",
"Skill" : "Képesség",
"Apply" : "Jelentkezés",
"You are already an employee. To get this job please quit your current job." : "Már alkalmazásban állsz. Csak akkor jelentkezhetsz erre a munkára, ha előbb felmondasz a jelenlegi munkahelyeden.",
"Work" : "Dolgozok",
"Back to company" : "Vissza a céghez",
"Back to army" : "Vissza a hadsereghez",
"You haven't trained today" : "Ma még nem edzettél",
"You have not trained today" : "Ma még nem edzettél",
"Train" : "Edzek",
"Training" : "Edzés",
"Train bonus" : "Edzési bónusz",
"Strength gained" : "Erő növekedés",
"Show my offers" : "Ajánlataim",
"Post new offer" : "Új ajánlatom",
"Exchange rate" : "Átváltási árfolyam",
"Job market" : "Álláspiac",
"Get Wellness" : "Légy egészségesebb",
"eRepublik Birthday" : "eRepublik-beli születésnap",
"Get Extra Storage" : "Kell még rakhely",
"Show all employees" : "Az összes alkalmazott",
"Show active wars" : "Aktív háborúk",
"Basic productivity" : "Alap termelékenys.",
"Total productivity" : "Összes. termelékenys.",
"Work Bonus" : "Munka bónusz",
"more events" : "a többi esemény",
"National" : "Belföldi",
"International" : "Nemzetközi",
"Top rated" : "Legnépszerűbb",
"Latest" : "Friss",
"Shouts" : "Bekiáltások",
"Shout" : "Bekiált",
"Shout something:" : "Bekiáltani ezt:",
"Official" : "Hivatalos",
"Everyone" : "Mindenki",
"Daily salary" : "Napi bér",
"Last presence" : "Legutóbb jelenvolt",
"Salary / day" : "Bér / nap",
"Never worked" : "Még nem dolgozott",
"Minimum country wage :" : "Országos minimálbér:",
"Company page" : "Cég adatlapja",
"Search citizen" : "Keresendő polgár",
"Rec exchange rate" : "Ajánlott átváltási arány",
"Sell" : "Elad",
"Industry" : "Iparág",
"Create new company" : "Új vállalat alapítása",
"Create company" : "Vállalat alapítása",
"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : "Az eRepublik arany a fő referenciapont minden helyi valutához és mindenféle további eRepublik-beli jellemzőket lehet rajta venni.",
"Select amount" : "Mennyiség kiválasztása",
"Go to eRepublik" : "Vissza az eRepublik-ba",
"Citizen fee" : "Polgár költsége (az állomot terheli)",
"Gross domestic product (GDP)" : "Bruttó hazai termék (GDP)",
"Gross Domestic Product" : "Bruttó hazai termék",
"Monthly exports" : "Havi export",
"Monthly imports" : "Havi import",
"Inflation" : "Infláció",
"Country President" : "Államelnök",
"General" : "Tábornok",
"Send message" : "Üzenet küldése",
"Add as a friend" : "Felvétel barátok közé",
"Remove friend" : "Barát törlése",
"Offer a gift" : "Ajándék felkínálása",
"Pending" : "Folyamatban",
"Accepted" : "Elfogadva",
"Rejected" : "Elutasítva",
// 2009.04.28. via_mala added
"ACCEPTED" : "Elfogadva",
"REJECTED" : "Elutasítva",
"You are not a president or a congress member in this country." : "Nem vagy államelnöke sem kongresszusi képviselője az országnak.",
"Law proposals" : "Törvény beterjesztések",
"War status" : "Háború állapota",
"Active wars" : "Aktív háborúk",
"Ended wars" : "Befejezett háborúk",
"Countries involved" : "Érintett országok",
"All countries" : "Minden ország",
"Company market" : "Cégpiac",
"Show all members" : "Tagok listája",
"Show results" : "Eredémények",
"Final Results" : "Végeredémények",
"Member of" : "Párttagság",
"No. of votes" : "Szavazatok",
"Total votes" : "Összes szavazat",
"You cannot work today because the company does not have enough raw materials for products. We have just sent an alert to the general manager about this issue." : "Ma nem tudsz dolgozni, mert a vállalatnak nincs elég nyersanyaga a termékekhez. Ezennel értesítjük a vezérigazgatót a fennálló helyzetről.",
"You cannot work today because the company does not have enough money to pay you. We have just sent an alert to the general manager about this issue." : "Ma nem tudsz dolgozni, mert a vállalatnak nincs elég pénze a béredhez. Ezennel értesítjük a vezérigazgatót a fennálló helyzetről.",
"Become a citizen" : "Legyél te is polgár",
"It's 100% free and only takes a minute or two" : "Teljesen ingyenes és csak 1-2 percet vesz igénybe",
"It's 100% free and" : "Teljesen ingyenes",
"only takes a minute or two" : "és csak 1-2 percet vesz igénybe",
"Enter the new world" : "Lépj be az Új Világba",
// via_mala: temp multiplicity: átmeneti ismétlés a JS kód javításáig
"Citizen name" : "Polgár neve",
"Citizen Name" : "Polgár neve",
"4-30 characters" : "4-30 betű",
"Password" : "Jelszó",
"Retype" : "Jelszó megismétlése",
"Retype password" : "Jelszó megismétlése",
"Location" : "Lakhely",
"Email must be valid for registration, so do not cheat" : "A regisztrációhoz valódi email cím kell, szóval ne kamuzz",
"Birthday" : "Születésnap",
"Gender" : "Nem",
"Male" : "Férfi",
"Female" : "Nő",
"I agree with the Terms of Service" : "Elfogadom a Működési Szabályzatot",
"Sign up for the weekly newsletter" : "Feliratkozom a heti hírlevélre",
"Minimum number of characters is 6" : "Legalább 6 betűből kell álljon",
"Forgot password?" : "Elfelejtetted a jelszavad?",
"Remember me" : "Emlékezz rám",
"Land skill" : "Földműv. képesség",
"Manufacturing skill" : "Ipari képesség",
"Constructions skill" : "Építési képesség",
"Debate Area" : "Vitatér",
"New" : "Új",
"Old" : "Régi",
"Value added tax (VAT)" : "Általános fogyasztási adó (ÁFA)",
"Import Tax" : "Vám",
"Income Tax" : "Személyi jövedelemadó",
"The law voting process takes 24 hours." : "A törvényre 24 óráig tart a szavazás",
"Only congress members and country presidents have the right to vote." : "Csak az országgyűlési képviselők ill. az államelnök szavazhatnak.",
"Show all law proposals" : "Az összes előterjesztés",
"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Egy párthoz a bemutatkozó oldalán csatlakozhatsz vagy ha egyik sem felel meg neked, akkor megalakíthatod a saját pártodat. Párttagnak kell lenni ahhoz, hogy országgyűlési képviselővé vagy miniszterelnökké válhass.",
"You do not have a newspaper" : "Nincs hírlapkiadód",
"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Az újság egy hatékony módja annak, ha közölni akarsz valamit az eRepublik világával. További információk az eRepublik Wiki-ben. Hozd létre a saját hírlapodat!",
"Weapon" : "Fegyver",
"Items" : "Tárgyak",
"Money" : "Pénz",
"Drag and drop items from your inventory to the donation area" : "Húzd át a saját felszerelésedből az adomány területre",
"Your inventory" : "Felszerelésed",
"Donation" : "Adományozás",
"All donations" : "Az összes adomány",
"My Organizations" : "Saját szervezeteim",
"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Ahhoz, hogy szervezetként beléphess előbb polgárként ki kell lépned, és szervezet a felhasználóját és jelszavát kell megadnod.",
"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization."
: "Ha a polgári felhasználód maga is egy szervezetet reprezentál, amelyet az eRepublik beta verziójában hoztak létre, akkor kérünk, küldj egy levelet a szerződés formanyomtatványt használva (Egyebek kategória), hogy hivatalosan is átírjuk szervezetté.",
"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned."  : "2008.december 15. után minden ilyen, szervezetté át nem alakított felhasználót hamisnak tekintünk és ki lesz tiltva.",
"After 5 days the alerts are automatically deleted" : "5 nap után az figyelmeztető üzenetek automatikusan törlődnek",
"Select All" : "Mindet kiválaszt",
"change your location" : "költözés",
"train" : "edzés",
"send initiations to your friends to join eRepublik" : "eRebublik meghívók küldése a barátdaidnak",
"Name" : "Név",
"Country" : "Ország",
"Experience points" : "Tapasztalati pont",
"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Nyersanyagokat csak a vállalati felhasználóként belépve vásásrolhatsz (a képernyő jobb felső részén választhatod ki, ha van vállalatod) vagy ha szervezetként vagy bejelentkezve",
"There are no offers on the marketplace for this industry" : "Jelenleg ezen iparág piacán nincs ajánlat",
"Minimum skill" : "Minimális képesség",
"Minimum Skill" : "Minimális képesség",
"You do not have the required skill for this position" : "Nincs meg a kellő képességed ehhez a pozícióhoz",
"Country - Society" : "Ország - Társadalom",
"There are no discovered resources in this region yet" : "Ebben a régióban még nincsenek felfedezett erőforrások",
"Defense system" : "Védelmi rendszer",
"Select a party" : "Válassz egy pártot",
"to show it's Candidates" : "hogy megtekinthesd a jelöltjeit",
"Permanently banned" : "Végérvényesen kitiltva",
"There are no active battles in this war" : "Nincs aktív csata ebben a háborúban",
"You are now an employee of this company" : "Immár ennek a cégnek az alkalmazottja vagy",
"Do you agree?" : "Egyetértesz?",
"One more thing..." : "Még egy apróság ...",
"Complete the captcha challenge in order to prove you are human" : "Írd le a képen látható szavakat, bizonyítandó, hogy emberi lény vagy",
"War > Battlefield" : "Háború > Csatatér",
// 2009.05.08 via_mala: temp multiplicity: átmeneti ismétlés a JS kód javításáig
"Weak fight, Private!" : "Halovány küzdelem, közlegény!",
"Weak fight, Corporal!" : "Halovány küzdelem, tizedes!",
"Weak fight, Sergeant!" : "Halovány küzdelem, őrmester!",
"Weak fight, Lieutenant!" : "Halovány küzdelem, hadnagy!",
"Weak fight, Captain!" : "Halovány küzdelem, százados!",
"Weak fight, Colonel" : "Halovány küzdelem, ezredes!",
"Weak fight, General" : "Halovány küzdelem, tábornok!",
"Weak fight, Field Marshal!" : "Halovány küzdelem, marsall!",
"Good fight, Private!" : "Szép küzdelem, közlegény!",
"Good fight, Corporal!" : "Szép küzdelem, tizedes!",
"Good fight, Sergeant!" : "Szép küzdelem, őrmester!",
"Good fight, Lieutenant!" : "Szép küzdelem, hadnagy!",
"Good fight, Captain!" : "Szép küzdelem, százados!",
"Good fight, Colonel" : "Szép küzdelem, ezredes!",
"Good fight, General" : "Szép küzdelem, tábornok!",
"Good fight, Field Marshal!" : "Szép küzdelem, marsall!",
"Impressive fight, Private!" : "Hatásos küzdelem, közlegény!",
"Impressive fight, Corporal!" : "Hatásos küzdelem, tizedes!",
"Impressive fight, Sergeant!" : "Hatásos küzdelem, őrmester!",
"Impressive fight, Lieutenant!" : "Hatásos küzdelem, hadnagy!",
"Impressive fight, Captain!" : "Hatásos küzdelem, százados!",
"Impressive fight, Colonel" : "Hatásos küzdelem, ezredes!",
"Impressive fight, General" : "Hatásos küzdelem, tábornok!",
"Impressive fight, Field Marshal!" : "Hatásos küzdelem, marsall!",
"Weapon quality" : "Fegyver minőség",
"You do not have any active job offers" : "Jelenleg nincs állásajánlat",
"Forfeit Points" : "Büntető pontok",
"Unlock Features" : "Jellemző előhozása",
"Continue" : "Tovább",
"Experience level" : "Tapasztalati szint",
"A taste of what you can do in eRepublik" : "Ízelítő az eRepublik-ban elérhető dolgokból",
"Welcome, your aspirations as a citizen of the New World  can change the course of history. While interacting with other citizens, you can fulfill those endeavors by developing your career in economics, politics, the military or the media ." : "Üdvözlünk! Polgári törekvéseid az Új Világban megváltoztathatják a történelem folyamát. Miközben aktív kapcsolatot ápolsz a többi polgárral, addig elérheted céljaidat a gazdasági, politikai, hadi ill. a média karriered fejlesztésével.",
"Below are several career paths you can take in eRepublik, roll over each one to learn more or just click continue to enter eRepublik." : "Lentebb számos eRepublik-beli karrier út látható, <strong>tartsd az egér mutatót föléjük</strong> hogy többet megtudj róluk, vagy egyszerűen csak klikkelj a Tovább gombra, hogy belépj az eRepublik-ba.",
"roll over" : "tartsd az egér mutatót föléjük",
"Hard worker" : "A Munka Hőse",
"economics" : "gazdaság",
"politics" : "politika",
"military" : "hadászat",
"media" : "média",
"manager" : "menedzser",
"Recruit" : "Újonc",
"Soldier" : "Katona",
"Super soldier" : "Veterán katona",
"Ranked" : "Rangos",
"soldier" : "katona",
"Battle hero" : "Harci hős",
"Resistance" : "Felkelés",
"leader" : "vezető",
"Resistance" : "Felkelés",
"hero" : "hőse",
"Society" : "Társadalom",
"builder" : "építő",
"Voter" : "Szavazó",
"Party Member" : "Párt tag",
"Parlament candidate" : "Parlamenti képviselőjelölt",
"Congress Member" : "Kongresszus tag",
"Party president candidate" : "Pártvezető jelölt",
"Party founder" : "Párt alapító",
"President candidate" : "Elnökjelölt",
"Country<br /> President" : "Államelnök",
"You have succesfully edited your profile" : "A profilod szerkesztése sikerült",
"All industries" : "Minden iparág",
"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Minden meghívottad után 5 aranyat kapsz, amikor eléri a 6-os szintet",
"Your name:" : "Neved:",
"Your friend's email:" : "A barátod email címe:",
"Use commas to separate multiple email addresses" : "Használj vesszőket több email cím elválasztására",
"Add from adress Book" : "Hozzáadás a címtárból",
"Send invitation" : "Meghívó elküldése",
"Your friendship request has been sent." : "Barátságkérésed elküldve.",
"No activity" : "Nincs tevékenység",
"You can login and start playing. Have fun!" : "Bejelentkezhetsz a játék megkezdéséhez. Jó szórakozást!",
"Click here to login now" : "Bejelentkezéshez klikkelj ide",
"Not a citizen yet?" : "Még nem vagy polgár?",
"Take the tour" : "Nézz körül!",
"Join now" : "Csatlakozz!",
"It's free" : "Ingyenes",
"Login" : "Belépés",
"My places > Company" : "Vállalat",
"You do not have a job" : "Nincs munkahelyed",
"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "Találj munkát vagy alapíts céget! Ha van munkád, akkor minden nap fizetést kapsz amikor dolgozol. (Ne aggódj, az eRebublik-ban ez jóval érdekesebb és gyorsabb, mint a valóságban.)",
"Find a job" : "Találj munkát!",
"Own a company" : "Alapíts céget!",
"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "A saját cég a gazdagság elsődleges forrása lehet, de előtte biztosnak kell lenned benne, hogy van elég pénzed ahhoz, hogy fizetni tudd a jövendőbeli munkásaid bérét, tehát, hogy nem fogsz csődbe menni.",
"Conquest wars" : "Hódító háborúk",
"Resistance wars" : "Szabadságharcok",
"Lieutenant" : "Hadnagy",
"Captain" : "Százados",
"Colonel" : "Ezredes",
"Field Marshall" : "Marsall",
"Field Marshal" : "Marsall",
"You do not have the necessary amount of Gold to start a resistance war." : "Nincs elegendő aranyad szabadságharc indításához",
"Start a Resistance War" : "Szabadságharc indítása",
"Please enter a valid amount value with at most 2 decimals." : "Kérlek adj meg egy érvényes összeget legalább 2 tizedes jeggyel.",
"The company cannot trade with this country due to a trade embargo decided by Congress." : "A cég nem kereskedhet ezzel az országgal, mivel a kongresszus kereskedelmi embargót szavazott meg ellene.",
"The company cannot trade with this country due to a trade embargo." : "A cég nem kereskedhet ezzel az országgal kereskedelmi embargó miatt.",
"The company offers no products in this market" : "A cég ezen a piacon nem kínál terméket",
"News" : "Hírek",
"more news" : "további hírek",
"Supporting parties" : "Támogató pártok",
"% of votes" : "szavazatok %-a",
"Badges" : "Jelvények",
"RSS Feed" : "RSS követés",
"Debates concerning economic activities." : "A gazdasági tevékenységeket érintő viták.",
"Sharing opinions concerning social interactions." : "Oszd meg a társadalmi kapcsolatokat érintő gondolataidat",
"The place for those who are interested in political activities." : "A politkai tevékenységek iránt érdeklődők helye",
"Keeping in touch with other citizen regarding the eRepublik warfare." : "Tartsd fenn a kapcsolatot a polgárokkal az eRepublik háborúzást illetően",
"Discussions" : "Eszmecsere",
"Help" : "Segítség",
"Contracts" : "Szerződések",
"Rules" : "Szabályok",
"Guidelines for a better New World." : "Irányelvek egy jobb Új Világhoz",
"Suggestions" : "Javaslatok",
"Imagination is the only limit for changing the future." : "A jövő megváltoztatásának csak a képzelet szab határokat",
"Open letters" : "Nyílt levelek",
"Contests" : "Versenyek",
"Announcements" : "Hirdetmények",
"Buy or sell companies" : "Cégek adás-vétele",
"Topics" : "Témák",
"Posts" : "Hozzászólások",
"Last Message" : "Utolsó üzenet",
"The New World" : "Az Új Világ",
"Join party" : "Csatlakozni a párthoz",
"Congratulations, you are now a party member!" : "Gratulálunk! Immár párttag vagy!",
"Create newspaper" : "Hírlap létrehozása",
"Requirements" : "Követelmények",
"Cost" : "Költségek",
"Newspaper details" : "A hírlap részletei",
"Newspaper name" : "A hírlap címe",
"Newspaper Avatar" : "A hírlap képe",
"only JPG files allowed" : "csak JPG képek megengedettek",
"Create" : "Létrehoz",
"Your account" : "Számlád",
"Organizations created by you:" : "Általad életre hívott szervezetek:",
"You have not created any organization yet." : "Még nem hívtál életre egyetlen szervezetet sem.",
"Create organization" : "Szervezet létrehozása",
"Organization details" : "A szervezet részletei",
"Organization name" : "A szervezet címe",
"Organization logo" : "A szervezet logó képe",
"Your email address:" : "Elektronikus levelezési címed:",
"eRepublik region" : "eRepublik régió",
"Complete the challenge:" : "Oldd meg:",
"Register" : "Regisztrál",
"Countries" : "Országok",
"Companies" : "Vállalatok",
"Parties" : "Pártok",
"Newspapers" : "Hírlapok",
"Sales" : "Eladások",
"Subscribers" : "Előfizetők",
"Region" : "Régió",
"All regions" : "Minden régió",
"Sort by" : "Rendezési feltétel",
"No. of Employees" : "Alkalmazottak száma",
"Top Citizens" : "Vezető polgárok",
"Top Companies" : "Vezető cégek",
"Top Countries" : "Vezető országok",
"Top Parties" : "Vezető pártok",
"Top News" : "Vezető hírlapok",
"( Average Experience )" : "( Átlagos tapasztalat )",
"Population number" : "Népesség",
"Unemployment rate" : "Munkanélküliségi ráta",
"Exports" : "Kivitel",
"Imports" : "Behozatal",
"No. of companies" : "Vállalatok száma",
"No. of newspapers" : "Hírlapok száma",
"GDP" : "Bruttó hazai termék",
"No citizen found that match your criteria." : "Nem található a kritériumnak megfelelő polgár",
"Select industry" : "Válassz iparágat",
"Top rated news" : "A legnépszerűbb hírek",
"Latest news" : "A legfrissebb hírek",
"Latest events" : "A legfrissebb események",
"Skip" : "Átugorni",
"eRepublik Shop" : "eRepublik Bolt",
"Make changes" : "Hajtsd végre a módosítást",
"Company for sale" : "Eladó vállalatok",
"Fire" : "Felmondás",
"Finances" : "Pénzügyek",
"Upgrade Quality level" : "Minőségi szint lépés",
"Buy raw materials" : "Nyersanyagok vásárlása",
"Donate raw materials" : "",
"Update" : "Szint lépés",
"Remove" : "Eltávolít",
"Buy market license" : "Piaci engedély vásárlás",
"Add a job offer" : "Állásajánlat meghirdetése",
"Edit details" : "Részletek szerkesztése",
"Sell company" : "Cég eladás",
"Your offer was removed" : "Az ajánlatodat törölték",
"Newer" : "Frissebb",
"Older" : "Régebbi",
"new comment" : "új hozzászólás",
"Show proposed members of congress" : "A javasolt képviselők",
"Winner" : "Győztes",
"One" : "Egy",
"Fight for resistance" : "Harc a felkelők oldalán",
"Fight for defenders" : "Harc az elnyomók oldalán",
"Buy Wellness Box" : "Vásárolj gyógyszeres ládát",
"Donate raw materials" : "Nyersanyag adományozás",
"You do not own any gifts." : "Nincs egyetlen ajándékod sem",
"You cannot join this fight because your country is not involved in the war" : "Nem harcolhatsz ebben a küzdelemben, mert az országod nem érintetett ebben a háborúban",
"Issue Money" : "Pénz kibocsátás",
"You can't become a soldier" : "Nem lehetsz katona",
"What is eRepublik?" : "Mi az eRebublik?",
"Think you can do better?" : "Gondolod, hogy neked jobban menne?",
"Fight for your country" : "Harcolj a hazádért",
"Win the Congress elections" : "Nyerj a kongresszusi választásokon",
"Won the Congress elections" : "Nyert a kongresszusi választásokon",
"Win the Presidental elections" : "Nyerj az elnökválasztáson",
"Win the Presidential elections" : "Nyerj az elnökválasztáson",
"Won the Presidental elections" : "Nyert az elnökválasztáson",
"Media Mogul" : "Média mogul",
"Reach the highest total damage in one battle" : "Érd el a legmagasabb sebzési értéket egy csatában",
"Reached the highest total damage in one battle" : "Elérte a legmagasabb sebzési értéket egy csatában",
"The offer is no longer valid." : "Az ajánlat már nem érvényes.",
"The skill of producing food, weapons, gifts and moving tickets." : "Élelem, fegyver, ajándék és repülőjegy előállítás képessége.",
"The skill of gathering raw materials like grains, iron, wood, diamonds, and oil." : "Nyersanyag, mint gabona, érc, fa, gyémánt és olaj (ki)termelés képessége.",
"The skill of building houses, hospitals and defense systems." : "Ház-, kórház- és védelmi rendszer építés képessége.",
"Training improves your strength, thus increasing basic damage." : "Az edzés megerősít, így növeli az alap sebzést.",
"You haven't posted any currency exchange offer yet." : "Még nem tettél fel valuta váltási ajánlatot.",
"Peace Proposal" : "Békeajánlat",
"New Citizen Fee" : "Új állampolgár költsége",
"New Citizen Message" : "Új üdvözlő szöveg",
"Top countries in eRepublik" : "Legjobb országok az eRepublik-ban",
"" : "",
"" : "",
"" : "",
"" : "",
"" : "",
"" : "",

// menu
	"Home" : "Otthon",
	// 2009.04.24 via_mala fixed
	"Donate" : "Adományoz",
	"Rank"   : "Rang",
	// 2009.05.10 via_mala fixed
	"Company" : "Cég",
	"Profile" : "Profil",
	"Party" : "Pártok",
	"Newspaper" : "Újságok",
	"Army" : "Hadsereg",
	// 2009.04.29 via_mala fixed
	"Country administration" : "Állam irányítás",
	// 2009.04.24 via_mala added
	"Country Administration" : "Állam irányítás",
	"Organizations" : "Szervezetek",
	"Market place" : "Piac",
	"Monetary market" : "Valuta piac",
	"Human Resources" : "Állás ajánlatok",
	"Companies for sale" : "Eladó cégek",
	"Get gold &amp; extras" : "Arany &amp; extrák",
	"Rankings" : "Rangsor",
	"Social stats" : "Szociális statisztikák",
	"Economic stats" : "Gazdasági statisztikák",
	// 2009.05.09 via_mala fixed
	"Political stats" : "Politikai adatok",
	"Military stats" : "Katonai adatok",
	"Tools" : "Eszközök",
	"Forum" : "Fórum",
	"News" : "Újság",
	"Invite friends" : "Barátok meghívása",
	"Career path" : "Karrier útvonal",
	"Ok, thanks, next tip" : "Köszi, kérem a következő tippet",
	"Select" : "Válassz",

	"Marketplace" : "Piac",
	"Wars" : "Háborúk",

// country page
	"On the Map" : "Térképen",
	// 2009.04.23. via_mala fixed
	"Total citizens" : "Teljes népesség",
	"New citizens today" : "Új lakók ma",
	"Average citizen level" : "Lakók átlag szintje",
	"Online now": "Jelenleg belépve",
	"Citizens" : "Polgárok",
	"Who" : "Kik",
	"details" : "részletek",
	"Society" : "Társadalom",
	"Economy" : "Gazdaság",
	"Politics" : "Politika",
	"Military" : "Katonaság",
	"Administration" : "Adminisztráció",

// countries
	"Argentina" : "Argentína",
	"Australia" : "Ausztrália",
	"Austria" : "Ausztria",
	"Bosnia and Herzegovina" : "Bosznia-Hercegovina",
	"Brazil" : "Brazília",
	"Bulgaria" : "Bulgária",
	"China" : "Kína",
	"Croatia" : "Horvátország",
	"Canada" : "Kanada",
	"Czech Republic" : "Cseh Köztársaság",
	"Denmark" : "Dánia",
	"Estonia" : "Észtország",
	"Finland" : "Finnország",
	"France" : "Franciaország",
	"Germany" : "Németország",
	"Greece" : "Görögország",
	"Hungary" : "Magyarország",
	"Indonesia" : "Indonézia",
	"Ireland" : "Írország",
	"Israel" : "Izrael",
	"Italy" : "Olaszország",
	"Iran" : "Irán",
	"Japan" : "Japán",
	"Latvia" : "Lettország",
	"Lithuania" : "Litvánia",
	"Malaysia" : "Malajzia",
	"Mexico" : "Mexikó",
	"Moldavia" : "Moldova",
	"Netherlands" : "Hollandia",
	"Norway" : "Norvégia",
	"Pakistan" : "Pakisztán",
	"Philippines" : "Fülöp-szigetek",
	"Poland" : "Lengyelország",
	"Portugal" : "Portugália",
	"Romania" : "Románia",
	"Serbia" : "Szerbia",
	"Singapore" : "SzingapĂşr",
	"South Africa" : "Dél-Afrika",
	"South Korea" : "Dél-Korea",
	"Slovakia" : "Szlovákia",
	"Slovenia" : "Szlovénia",
	"Switzerland" : "Svájc",
	"Spain" : "Spanyolország",
	"Sweden" : "Svédország",
	"Russia" : "Oroszország",
	"Thailand" : "Thaiföld",
	"United Kingdom" : "Egyesült Királyság",
	"Ukraine" : "Ukrajna",
	"USA" : "Amerikai Egyesült Államok",
	"Turkey" : "Törökország",
	"World" : "Világ",
// economy
	"Treasury" : "Kincstár",
	"All accounts" : "Az összes számla",
	"Country trading embargoes" : "Kereskedelmi embargók",
	"Taxes" : "Adók",

	"Salary" : "Bér",
	"Minimum" : "Minimum",
	"Average" : "Átlag",
// company
	"Office" : "Iroda",
	// 2009.04.21. via_mala fixed
	"You have already worked today." : "Ma már dolgoztál.",
	"Come back tomorrow." : "Gyere vissza holnap.",
	"Resign" : "Felmond",
	"Employees" : "Munkások",
	"Raw materials" : "Nyersanyagok",
	"See all employees" : "Az összes munkás megtekintése",
	// 2009.04.21. via_mala fixed
	"Go to marketplace" : "Irány a piac",
	"Products" : "Termékek",

	"Grain" : "Búza",
	"Food" : "Élelmiszer",
	"Gift" : "Ajándék",
	"Weapon" : "Fegyver",
	"Moving Tickets" : "Repülőjegyek",
	"Diamonds" : "Gyémántok",
	"Iron" : "Vas",
	"Oil"  : "Olaj",
	"Wood" : "Fa",
	"House" : "Ház",
	"Hospital" : "Kórház",
	"Defense System" : "Védelmi Rendszer",
// market
	"Quality Level" : "Minőségi szint",
	// 2009.04.21. via_mala fixed
	"All levels" : "Minden szintűt",
	"Level 1" : "1-es szintű",
	"Level 2" : "2-es szintű",
	"Level 3" : "3-as szintű",
	"Level 4" : "4-es szintű",
	"Level 5" : "5-ös szintű",

	"Provider" : "Eladó",
	"Quality" : "Minőség",
	"Stock" : "Készlet",
	"Buy" : "Vétel",
	"Market" : "Piac",

	"Market offers" : "Piaci ajánlatok",
	"Amount" : "Mennyiség",
	"Price" : "Ár",
	"Next" : "Következő",
	"Prev" : "Előző",
	// 2009.04.21. via_mala fixed
	"No products in this market" : "Nincs termék ezen a piacon",
	// 2009.04.21. via_mala deleted duplicatum
	// "Go to marketplace" : "A piac megtekintése",
	"Jobs available in this company" : "Munkahely ajánlatok ennél a cégnél",
	"You don't have any active job offers" : "Nincsen aktív ajánlat",
	"You didn't specify the amount of products you wish to buy" : "Nem adtad meg, hogy mennyit akarsz vásárolni",
	"You cannot trade with this country as you are at war with it" : "Nem kereskedhetsz ezzel az országgal, amíg háborúban álltok vele",

// region
	"Heal" : "Gyógyulás",
	// 2009.04.28. via_mala fixed
	"Constructions": "Építési",
	"Population": "Lakosság",
	// 2009.04.23. via_mala fixed
	"Productivity" : "Termelékenység",
	"Resistance War" : "Szabadságharc",
	"Resistance War Active" : "Szabadságharc zajlik",
	// 2009.04.29. via_mala fixed
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Nem indíthatsz felkelést ebben a régióban, mivel már a saját eredeti országához tartozik.",
	// 2009.04.29. via_mala added
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Nem indíthatsz felkelést ebben a régióban, mivel már a saját eredeti országához tartozik.",
	"Medium" : "Közepes",
	"High": "Magas",
	"Neighbors" : "Szomszédok",
// marketplace
	"Please select an Industry to see the marketplace offers" :
	"Válassz egy iparágat, hogy láthasd a piaci ajánlatokat",
	"Skill Level" : "Tudás szint",
	"All skills" : "Minden képességszinten",
	"All" : "Mindet",
// politics
	"President" : "Elnök",
	// 2009.04.29. via_mala fixed
	"Congress" : "Kongresszus",
// wars
	"no allies" : "nincs szöv.",
	"All wars" : "Az összes háború",
	"All resistance wars" : "Az összes szabadságharc",
	"All Alliances" : "Összes Szövetséges",
	"Alliances" : "Szövetségesek",
	"Military force" : "Katonai erő",
	"Average strength" : "Átlagos erő",
// army
	// 2009.04.21. via_mala fixed
	"You have trained today. You can train again tomorrow." : "Ma már edzettél. Holnap újra edzhetsz.",
	// 2009.04.21. via_mala added
	"My strength" : "Erőnlétem",
	"Force" : "Erő",
	"Military rank" : "Katonai rang",
	"Military achievements" : "Katonai eredmények",
	"Active wars list" : "Aktív háborúk listája",
	"Sergeant" : "Őrmester",
	"Corporal" : "Tizedes",
	"Private" : "Közlegény",

	"There are no resistance wars in this country." : "Nincs szabadságharc ebben az országban.",
	"until the region can be occupied or secured" : "amíg a régiót elfoglalhatják, vagy megvédhetik",
	"Attackable on President's decision" : "Támadható az Elnök döntése alapján",
	"Defense Points" : "Védelmi Pontok",
	"Go to Battlefield" : "Irány a csatatér",
	"see finished battles" : "befejezett csaták",
	// 2009.04.28. via_mala added
	"show finished battles" : "befejezett csaták",
	"Wars list" : "Háborúk listája",
	"War" : "Háború",
	"Battle history" : "Csata történet",
	"Fight" : "Harc!",
	"Hero" : "Hős",
// party
	"You are not a member of a party" : "Nem vagy párttag",
	"Join a party" : "Belépni egy pártba...",
	"Create new" : "Új létrehozása",
	"Join" : "Csatlakozás",
	"See all members" : "Tagok listája",
	"Donate Gold" : "Arany adományozása",
	"Members"  : "Tagok",
	"Orientation" : "Orientáció",

	"Center" : "Közép",
	"Anarchist" : "Anarchista",
	"Accounts" : "Számlák",
	"Elections" : "Választások",
	"Election results" : "Választási eredmények",
	"Next elections" : "Következő választás",
	"Next elections in" : "A következő választások ",
	"Next election in" : "A következő választás ",

	// 2009.04.29 via_mala fixed
	"Country Presidency" : "Államelnökség",
	"Party Presidency" : "Párt elnökség",
	"Party presidency" : "Párt elnökség",
	"Party President" : "Párt elnök",
	"See results" : "Eredmények",
	"Expires tomorrow" : "Lejár holnap",

// articles
	"Report abuse" : "Visszaélés jelentése",
	"one hour ago" : "egy órája",
	"Unsubscribe" : "Leiratkozás",
	"Subscribe" : "Feliratkozás",
	"Article RSS" : "Cikk RSS-e",
	// 2009.04.24 via_mala fixed
	"Your comment" : "Hozzászólásod",
	"View all comments" : "Az összes hozzászólás",
	"Subscribe to comments" : "Feliratkozás a hozzászólásra",
	"Unsubscribe to comments" : "Leiratkozás a hozzászólásról",
	"Post a comment" : "Küldd el a hozzászólásomat",
// news
	"You don't have a newspaper" : "Nem rendelkezel újsággal",

// profiles
	"Friends" : "Barátok",
	"Assets" : "Vagyon",
	"Press director" : "Újság főszerkesztő",
	"Inventory" : "Felszerelés",
	"Get Gold" : "Arany szerzése",
	"Career" : "Karrier",
	// 2009.04.24 via_mala fixed
	"Bio" : "Életrajz",
	"Employee" : "Dolgozó",
	"No political activity" : "Nem párt tag",
	"Wellness" : "Egészség",
	"Level" : "Szint",
	"Strength" : "Erő",
	"Experience" : "Tapasztalat",
	"Skills:" : "Képességek",
	"Land" : "Földművelési",
	"Manufacturing" : "Ipari",
	"Erepublik Age" : "Erepublikbeli kora",
	"Achievements" : "Eredmények",
	"Edit profile" : "Profil szerkesztése",
	"Edit Profile" : "Profil Szerkesztése",
	"Change residence" : "Lakóhely váltás",
	"Donations list" : "Adomány lista",

	"Your email here" : "Email címed",
	"Your birthday" : "Születésnapod",
	"Citizen Avatar" : "Avatárod",
	"Change password" : "Jelszó változtatás",

	// 2009.05.16. via_mala replaced
	// "Worked 30 days in a row" : "30 napig dolgozott egyhuzamban",
	// "Win the Congress elections": "Képviselő választást nyert",
// fight
	"Back to battlefield" : "Vissza a csatatérre",
	"Fight Again" : "Újra harcolni",
	"Fight bonus" : "Harci bónusz",

// messages
	"Inbox" : "Bejövő",
	"Sent" : "Elküldött",
	"Alerts" : "Figyelmeztetések",
	"Subscriptions" : "Feliratkozások",
	"new article" : "új cikk",
	"Delete" : "Töröld",
	"Read Message" : "Üzenet olvasása",
	"Reply" : "Válasz",
	"From" : "Feladó",
// flash menu
	"My places > Army" : "Katonaság",
	"My places > Newspaper" : "Újságok",
	"My places > Organizations" : "Szervezetek",

// menu
	"Find out more" : "Több erről",
	"logout" : "kilépés",
	"Logout" : "Kilépés"
};

trim = function (str) {
    // 2009.05.16 via_mala modified
    // return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
    if (str==null) return str;
    return str.replace(/^(\s|&nbsp;)*/, "").replace(/(\s|&nbsp;)*$/, "");
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 szövetséges";
regexps["^Active wars in (.*)$"] = "Aktív háborúk $1-ban";
regexps["(\\s*)Expires in (\\d*) days"] = "Lejár $2 napon belül";
regexps["^(\\d*) comments$"] = "$1 megjegyzés";
regexps["(\\d*) hours ago"] = "$1 órája";
regexps["(\\d*) minutes ago"] = "$1 perce";
regexps["(\\d*) days ago"] = "$1 napja";
regexps["^Regions \\((\\d*)\\)"] = "Régiók ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Barátok ($1)";
// 2009.04.21. via_mala added
regexps["^(\\d*) months ago"] = "$1 hónapja";
regexps["^(\\d*) months"] = "$1 hónap";
regexps["^Comments(.*)"] = "Megjegyzések$1";
// 2009.04.21. via_mala added
regexps["^You worked (\\d*) days in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "Eddig $1 napot dolgoztál egyhuzamban. További $2 napot kell még dolgoznod, hogy a 'Munka Hőse Érdemrendet' megkapd";
regexps["^You worked( +)one day in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "Eddig egy napot dolgoztál egyhuzamban. További $2 napot kell még dolgoznod, hogy a 'Munka Hőse Érdemrendet' megkapd";
regexps["^Next election in (\\d*) day\\."] = "A következő választás $1 nap múlva esedékes.";
regexps["^(\\d) congress (.*) members"] = "A kongresszus létszáma $1 fő.";
regexps["^(\\d)% of Congress"] = "A kongresszustagok száma: $1";
regexps["^Amount to buy$"] = "Vásárolandó mennyiség";
regexps["(\\d*)\\.(\\d*)\\.(\\d*) - "] = "$3.$2.$1 - ";
regexps["Day (\\d+) of the New World"] = "Az Új Világ $2. napja";
regexps["^All employees \\((\\d*)\\)"] = "Az összes alkalmazott ($1)";
regexps["^Active resistance wars in (.*)"] = "Aktív függetlenségi háborúk $1 -ban/ben/on/en/ön";
regexps["^Official candidates \\((\\d*)\\)"] = "Hivatalos jelölt ($1)";
regexps["^Wildcards \\((\\d*)\\)"] = "Helyettes ($1)";
regexps["^Not qualified \\((\\d*)\\)"] = "Nem alkalmas ($1)";
regexps["Presence:  (\\d*)\\.(\\d*)%"] = "Részvételi arány: $1.$2";
regexps["^(\\d+) candidate(s)?$"] = "$1 jelölt";
regexps["^(\\d+) citizen(s)?$"] = "$1 polgár";
regexps["^You cannot resign from your job until (.*)"] = "$1 -ig nem mondhatsz fel a munkahelyeden";
regexps["^Proposed by (.*), (.*) hours ago"] = "Előterjesztve $1 által $2 órával ezelőtt";
regexps["^Tax change:(.*)"] = "Adó változtatás:$1";
regexps["^Successfuly transfered (.*) item\\(s\\) to (.*)\\."] = "Sikeres volt a(z) $1 tárgy átadása $2 -nak/nek.";
regexps["^You have successfuly offered a quality (\\d+) gift\\."] = "Sikeresen felajánlottál egy $1-es/as/ös szintű ajándékot.";
regexps["You have successfully donated (.*)\\. This amount will appear shortly in the citizen/organization account\\."] = "Sikeresen átadtál $1-t. Az összeg hamarosan megjelenik a polgár/szervezet számláján.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. Now you have the possibility to (.*)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Gratulálok, elérted a(z) $2 tapasztalati szintet! Most már van lehetőséged $3 -ra/re. A $4 szint eléréséhez $5 tapasztalati pontra van szükséged.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Gratulálok, elérted a(z) $2 tapasztalati szintet! A $3 szint eléréséhez $4 tapasztalati pontra van szükséged.";
regexps["Congratulations, you(r)? have reached experience level (\\d+) and you have received as a reward (\\d+) Gold\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Gratulálok, elérted a $2 tapasztalati szintet, amiért jutalmul $3 aranyat kaptál. A $4 szint eléréséhez $5 tapasztalati pontra van szükséged.";
regexps["^( *)The General Manager of"] = "A vezérigazgaztója ennek a cégnek:";
regexps["has modified your salary from (.*) to (.*)\\.( *)$"] = "a fizetésedet $1-ról/ről $2-ra/re módosította.";
regexps["We are sorry to inform you that the General Manager of (.*) has decided to fire you! But don't worry, you can get a new job or you can even buy a company\\."] = "Sajnálattal közöljük, hogy a $1 vezérigazgatója úgy döntött, hogy elbocsájt. Azonban semmi ok a bánkódásra, mert szerezhetsz új állást, vagy alapíthatsz saját vállalatot is.";
regexps["^Inbox \\(d+\\)"] = "Bejövő ($1)";
regexps["There is no more food in your inventory\\. Without food to eat your Citizen loses (\\d+) wellness each day until he dies\\. To avoid death by starvation we advise you to buy food from the (.*)"] = "Nincs több élelmiszered. Élelem nélkül a polgárod $1 egészség pontot veszít naponta, amíg végül éhenhal. Ezt elkerülendő javasoljuk, hogy vásárolj élelmiszert a piacon -->";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "Sikeresen vásároltál $1 terméket $3 -ért.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. Your current wellness is (.*)"] = "Nem szállhatsz be a küzdelembe, mert az egészséged nem éri el a $1-et/at/öt. Jelenleg $2 az egészséged.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\."] = "Nem szállhatsz be a küzdelembe, mert az egészséged nem éri el a $1-et/at/öt.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. You can get wellness from (.*)"] = "Nem szállhatsz be a küzdelembe, mert az egészséged nem éri el a $1-et/at/öt. Gyógyuláshoz a kórházba kell menned -->";
regexps["(\\d+) Citizens"] = "$1 polgár";
regexps["You received (\\d+) wellness from hospital\\."] = "Aranykezű doktorok összeférceltek és csinos nővérkék ápolgattak, úgyhogy $1-t nőtt az egészséged. :)";
regexps["You need at least (\\d+) Experience Points to join this fight"] = "Még legalább $1 tapasztalati pontra van szükséged, hogy beszállhass a küzdelembe";
regexps["President of (.*) has proposed an alliance with (.*)"] = "$1 miniszterelnöke szövetséget ajánlott $2-nak";
regexps["President of (.*) proposed an alliance with (.*)"] = "$1 miniszterelnöke szövetséget ajánlott $2-nak";
regexps["Citizen fee change from (.*) to (.*)"] = "Az állampolgár költségének megváltoztatása $1-ról/ről $2-ra/re";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "Egyetértesz-e azzal, hogy az állam pénztára átutaljon $1-t a(z) $2-nak/nek?";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "Egyetértesz-e azzal, hogy $1-ot kibocsássunk $2 aranyért?";
regexps["Do you agree that (.*) should buy a (.*) of quality (\\d+) from (.*) company at the price of (.*) for (.*)\\?"] = "Egyetértesz-e azzal, hogy $1-nak/nek meg kellene vennie egy $3 -es/as/ös szintű $2-t $5 -ért a $4 vállalattól $6 számára?";
regexps["Do you agree on the text used by the president to welcome new Citizens in your country\\?"] = "Egyetértesz-e az alábbi szöveggel, amellyel az államelnök köszönti az új polgárokat?";
regexps["The President of (.*) offered a sum of (.*) Gold to your National Treasury in return to a peace treaty with (.*)\\. <br><br>"] = "$1 miniszterelnöke $2 aranyat kínált a Nemzeti Kincstárnak a $3-i békemegállapodásért cserébe. <br><br>";
regexps["You have received (\\d+) gift of quality (\\d+) from"] = "Kaptál $1 darab $2 szintű ajándékot";
regexps["\\. Your wellness has been increased with (\\d+)\\."] = "-tól/től. Az egészséged $1 ponttal növekedett.";
regexps["(.*) has accepted your friendship request"] = "$1 elfogadta a barátkozási szándékodat";
regexps["supported by (\\d+) parties"] = "$1 párt által támogatva";
regexps["(\\d+)-(\\d+) characters max"] = "Max. $1-$2 karakter";
regexps[" has transfered (\\d+) product(s)? to your inventory\\. Check your"] = " átadott neked $1 terméket. Ellenőrizd az ";
regexps["donations list"] = " adomány listádat";
regexps[" has transfered (.*) to your account\\."] = " átutalt $1-t a számládra.";
regexps["(\\d+) active battles"] = "$1 aktív csata";
regexps["started by "] = "indította: ";
regexps["Total damage"] = "Teljes sebzés";
regexps["Basic damage"] = "Alap sebzés";
regexps["You can get wellness from: "] = "Gyógyulni itt tudsz: ",
regexps["You must be at least"] = "Legalább ilyen szintűnek kell lenned:";
regexps["to be able to train\\. Now, you can:"] = "hogy edzhess. Amit tehetsz:";
regexps["eRepublik is about changing the course of history in a huge virtual society\\. As a citizen in this New World of (.*) you have the power to make a difference and fulfill your economic, political or military goals like never possible before\\."] = "Az eRebublik arról szól, hogy változtassuk meg a történelem menetét egy hatalmas virtuális társadalomban. Az Új Világ $1 tagú társadalmának polgáraként hatalmadban áll változtatni és beteljesíteni gazdasági, politikai avagy katonai ambícióidat, ahogyan eddig még soha.";
regexps["Lead your citizens to prosperity as a country president or control the market as a rich company manager\\. With over (\\d+) countries, (.*) businesses, and varied country resources, your strategy and know-how can take you to the top\\."] = "Juttasd polgáraidat a jóléthez mint az állam elnöke vagy irányítsd a piacot mint gazdag cégvezető. Több mint $1 ország $2 vállalatával és az ország változatos erőforrásaival a stratégiád és a hozzáértésed a csúcsra juttathat.";
regexps["Become influential with the power of your words, win others over with your ideas, or interview celebrities - the choice is yours. By starting your own newspaper and networking with your fellow citizens the impact of your voice is up to you."] = "Válj befolyásossá a szavaid ereje által, győzz meg másokat az ötleteiddel, vagy interjúvolj meg hírességeket - a választás a tied. Saját hírlap alapításával és a polgártársaiddal való kapcsolatok kiépítésével a szavaid hatása rajtad múlik.";
regexps["Diplomacy helps, but when it comes to war you will need to get a weapon and defend your country's borders - or expand them\\. From showing your patriotism to being a mercenary, the future of the New World is in your hands\\."] = "A diplomácia sokszor segít, de amikor háborúra kerül a sor, akkor fegyvert kell ragadnod és meg kell védened országod határait - vagy ki kell terjesztened azokat. Hazafiasságod kimutatásától kezdve a zsoldosságig bezárólag az Új Világ jövője a te kezedben nyugszik.";
regexps["Work for (\\d+) days in a row"] = "Dolgozz $1 napig egyhuzamban";
regexps["Worked (\\d+) days in a row"] = "$1 napig dolgozott egyhuzamban";
regexps["Advance (\\d+) strength levels"] = "Lépj $1 erő szintet";
regexps["Advanced (\\d+) strength levels"] = "$1 erő szintet lépett";
regexps["Reach (\\d+) subscribers to your newspaper"] = "Hírlapod érje el a(z) $1 előfizetőszámot";
regexps["Reached (\\d+) subscribers to your newspaper"] = "Hírlapja elérte a(z) $1 előfizetőszámot";
regexps["Invite (\\d+) people to eRepublik and help them reach level (\\d+)"] = "Hívj meg $1 embert az eRepublik-ba és segíts nekik elérni a $2. szintet";
regexps["Invited (\\d+) people to eRepublik and help them reach level (\\d+)"] = "Meghívott $1 embert az eRepublik-ba és segített nekik elérni a $2. szintet";
regexps["Start a resistance war and liberate that region"] = "Indíts szabadságharcot és szabadítsd fel azt a régiót";
regexps["Started a resistance war and liberated"] = "Szabadságharcot indított és felszabadított";
regexps["regions\\."] = "régiót.";
regexps["National Rank"] = "Nemzeti rang";
regexps["wants to add you to (her|his) friends list\\. Will you accept\\?"] = "hozzá akar adni a barátjai listájához. Elfogadod?";
regexps["Sorry, you need to reach experience level (\\d) in order to send invitations\\."] = "Sajnálom, de előbb el kell érned a $1. szintet, hogy meghívót küldhess.";
regexps["The President of (.*) demanded a sum of (.*) Gold from your National Treasury in return to a peace treaty with (.*)\\."] = "$1 államelnöke $2 aranyat követel a Nemzeti Kincstáradtól a $3-val/vel kötendő békeszerződésért cserébe.";
regexps["(P|p)roposed by"] = "Előterjesztette:";
regexps["(T|t)oday"] = "ma";
regexps["(Y|y)esterday"] = "tegnap";
regexps["Mutual Protection Pact"] = "Kölcsönös védelmi egyezség / megnemtámadási szerződés";
regexps["Alliance"] = "Szövetség";
regexps["Trading Embargo"] = "Kereskedelmi embargó";
regexps["President of (.*) proposes to stop the trade with (.*)"] = "$1 elnöke javasolja a kereskedés beszüntetését $2-val/vel";
regexps["(F|f)ood"] = "élelmiszer";
regexps["(g|G)ift"] = "ajándék";
regexps["(w|W)eapon"] = "fegyver";
regexps["(g|G)rain"] = "búza";
regexps["(d|D)iamonds"] = "gyémántok";
regexps["(i|I)ron"] = "vas";
regexps["(o|O)il" ] = "olaj";
regexps["(w|W)ood"] = "fa";
regexps["(h|H)ouse"] = "ház";
regexps["(h|H)ospital"] = "kórház";
regexps["(d|D)efense system"] = "védelmi rendszer";
regexps["(G|g)(O|o)(L|l)(D|d)"] = "Arany";
regexps["(M|m)oving (T|t)ickets"] = "repülőjegyek";
regexps["has retreated from the battlefield"] = "visszavonult a csatából";

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

// 2009.05.11 via_mala delete>>
// translate = function(key) {
// 	if (strings[key]!==undefined) {
// 	    return strings[key];
// 	} else {
// 	    var key2 = trim(key);
// 	    if (strings[key2]!==undefined) {
// 		return strings[key2];
// 	    }
// 	}
// 	return undefined;
// };
// 2009.05.11 via_mala delete<<

// 2009.05.11 via_mala rewrite>>
// translateWithRegexp = function(key) {
// 	if (strings[key]!==undefined) {
// 	    return strings[key];
// 	} else {
// 	    var key2 = trim(key);
// 	    if (strings[key2]!==undefined) {
// 		return strings[key2];
// 	    }
// 	}
// 	return matchRegexps(key);
// };
translateWithRegexp = function(key) {
    var keyTrimmed = trim(key);
    var keyLower = keyTrimmed.toLowerCase ();
    var keyFirstUpper = keyLower.charAt(0).toUpperCase()+keyLower.substring(1);
    var keyCapitAllWord = capitAll(keyTrimmed);
	if (strings[key]!==undefined) {
      return strings[key];
	} else
	if (strings[keyTrimmed]!==undefined) {
	  return strings[keyTrimmed];
	} else
	if (strings[keyLower]!==undefined) {
	  return strings[keyLower];
	} else
	if (strings[keyFirstUpper]!==undefined) {
	  return strings[keyFirstUpper];
	} else
	if (strings[keyCapitAllWord]!==undefined) {
	  return strings[keyCapitAllWord];
	}
	return matchRegexps(key);
};
// 2009.05.11 via_mala rewrite<<

capitAll = function(str)
{
	str= str.toLowerCase().replace(/([-\.']) */g,'$1 ');
	//var rx= /\b([a-záéíóöőúüű'-\.]+)\b/ig;
	var rx= /\b([a-z'-\.]+)\b/ig;
	str= str.replace(rx,
			 function(w)
			 {
			   return w.charAt(0).toUpperCase()+w.substring(1);
			 }
			);
	return str.replace(/^ *|(\-|') *| *$/g,'$1');
};

var allTrans = {
    "input":"", "span":"", "a":"", "h2":"", "th":"", "td":"", "p":"", "strong":"", "div":""
    // 2009.04.28. via_mala added
    ,"i":"", "b":"", "em":"", "font":"", "h1":"", "li":"", "label":""
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
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}

var blockEvent = false;

function translateWholePage(e) {
// if (document.location.toString().indexOf("/country/military")!=-1) {
//    militaryPage();
//  }
  blockEvent = true;

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      // if ( node.tagName == "INPUT" && node.type == "button" )
      if ( node.tagName.toLowerCase () == "input" && node.type.toLowerCase () == "button" )
      {
        GM_log( node.value );
        var translation = translateWithRegexp(node.value);
        GM_log( translation );
        if (translation!==undefined) {
          node.value = translation;
        }
      }
      else if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        //if (node.childNodes.length<=6) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
  //            GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        //}
      }
    }
  }
  blockEvent = false;
}


function translateNode(e)
{
  if ( blockEvent ) return;
  blockEvent = true;
  var node = e.relatedNode;
  var translate = translateWithRegexp(node.innerHTML);
  if ( translate !== undefined )
  {
     node.innerHTML = translate;
     blockEvent = false;
     return;
  }
  for (var tagName in allTrans) {
    var tags = e.relatedNode.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      // if ( node.tagName == "input" && node.type == "button" )
      if ( node.tagName.toLowerCase () == "input" && node.type.toLowerCase () == "button" )
      {
        GM_log( node.value );
        var trans = translateWithRegexp(node.value);
        GM_log( trans );
        if (trans!==undefined) {
          node.value = trans;
        }
      }
      else if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
		//GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=6) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
            //  GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
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
  blockEvent = false;
}

window.addEventListener("load", function(e) {
  translateWholePage(e);
  fixFlash();
}, false);

document.addEventListener("DOMNodeInserted", translateNode, false);