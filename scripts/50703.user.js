// ==UserScript==
// @name           Tibia Boss Monster Checker
// @namespace      BossMonster
// @include        http://www.tibia.com/community/?subtopic=killstatistics
// ==/UserScript==


    //Words to look for.
    var wordArray = ["Ashmunrah","dryads","Rahemos","lavaholes","mechanical fighters","hell holes","mad technomancers","Sharptooth","Splasher","Inky","Thalas","Total","shredderthrowers","flamethrowers","players","Zugurosh","zombies","Yalaharis","Yakchal","wyverns","wyrms","witches","wisps","wolves","wild warriors","werewolves","Webster","wasps","war wolves","warlocks","Vashresamun","vampire","valkyries","Ushuriel","Ungreez","toads","tigers","tortoises","thieves","The weakened Count","The Pit Lord","The Obliverator","The Masked Marauder","The Hairy One","The Hag","The Dark Dancer","The Count","terror","tarantulas","Svoren","stalkers","squirrels","spit nettles","spirits of","spectres","sons of","snakes","smugglers","slimes","Slim","skunks","skeleton","sibangs","serpent","seagulls","scorpions","scarabs","rotworms","Rocky","rift","rats","rabbits","quara","Pythius","priestesses","poachers","plaguethrowers","plaguesmiths","pirate","pigs","phantasms","parrots","pandas","Orcus","orc","Omruc","Norgle","nomads","nightstalkers","nightmare","necromancer","mutated","mummies","Morik","monks","Massacre","Mahrdis","magicthrowers","Overlords","Azerus","minotaur","merlkins","blobs","elementals","Marziel","marid","mammoths","magic pillars","mad scientists","Madareth","lost souls","lizard","lions","liches","Lersatio","Latrivan","larvas","Kreebosh","Koshei","kongras","juggernauts","troll","infernalists","ice witches","hydras","hyaenas","huskies","hunters","heroes","hellspawns","hellhounds","Achad","Hellgorak","haunted","hands of cursed fate","grim","Grimgor","gozzler","Golgordan","goblin","Gnorre","gladiators","acid blobs","amazons","the cult","ancient scarabs","Annihilon","Arthei","assassins","Avalanche","Axeitus Headbanger","frogs","badgers","bandits","banshees","barbarian","bats","bears","behemoths","beholders","betrayed","black knights","sheep","blightwalkers","crabs","Bloodpaw","djinns","bog raiders","bonebeasts","Boreth","Bovinus","braindeaths","bugs","butterflies","carniphi","carrion","cats","cave rats","centipedes","chakoya","chickens","cobras","cockroaches","Colerian","crazed","crocodiles","crypt shamblers","spiders","cursed gladiators","cyclop","golem","Darakan","dark","death blobs","Deathbringer","deathspawns","deer","defiler","demon","destroyers","diabolic","Dipthrah","penguin","diseased","dogs","dragon","Drasilla","dreadbeasts","dwarf","dworc","earth elementals","efreet","elder","(elemental forces)","elephants","elf","elves","energy","Fallen","fire","flamingoes","frost","Frost","furies","gang m","gargo","gazer","ghost","ghoul"]

    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
   
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
        for(i in wordArray) {
            $("TD:contains('" + wordArray[i] + "')").each(function() {
                $(this.parentNode).remove();
            });   
        }
    }