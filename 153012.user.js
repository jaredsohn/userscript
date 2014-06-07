// ==UserScript==
// @name        Ghost Trappers Whiskey Changer
// @namespace   Hazado
// @description Change Magic Potions into Pre-FB changes Whiskeys
// @include     *www.ghost-trappers.com*
// @exclude     *www.ghost-trappers.com/fb/talent_calculator.php*
// @exclude     *www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=talents*
// @exclude     *www.ghost-trappers.com/fb/donate.php*
// @version     1.5
// ==/UserScript==

//Change Disclaimer to let you know all drinks are actually alcoholic
if (document.getElementById('baitDisclaimer') != null) document.getElementById('baitDisclaimer').innerHTML = 'Disclaimer<br>All beverages in Ghost Trappers are <b>alcoholic<\/b><br><a href="http://www.aa.org" target="_blank">Please drink responsibly</a><br><a onclick="closeBaitDisclaimerPopup()"><i>(close)<\/i><\/a>';

DocumentTemp = document.body.innerHTML;
//Change stuff at the bar
DocumentTemp = DocumentTemp.replace(new RegExp("button_mix_mocktails.png",'g'),"button_mix_cocktails.png");
DocumentTemp = DocumentTemp.replace(new RegExp("scotch_headline2_bar_v2.jpg",'g'),"scotch_headline2_bar.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("Choose the magic potion to mix:",'g'),"Choose the whisky to mix:");
DocumentTemp = DocumentTemp.replace(new RegExp("Amount of mocktails to mix:",'g'),"Amount of cocktails to mix:");
DocumentTemp = DocumentTemp.replace("Mix your mocktails at the bar.","Mix your cocktails at the bar.");
DocumentTemp = DocumentTemp.replace('Charles the barkeeper: "Hello agent, how are you? Care for a drink? If you need the finest brands in all of Scotland then please check out my stock. Should you be interested in the art of mixing mocktails, I can hook you up with recipes - but you must bring the juices along. Enjoy your stay at S.C.O.T.C.H.!"','Charles the barkeeper: "Hello agent, how are you? Care for a drink? If you need the finest brands in all of Scotland then please check out my stock. Should you be interested in the art of mixing cocktails, I can hook you up with recipes - but you must bring the juices along. Enjoy your stay at S.C.O.T.C.H.!"');

//Silver Star Series to Jimmy Stalker Series
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_silverstar_green.png",'g'),"icon_whisky_jimmystalker.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_silverstar_blue.png",'g'),"icon_whisky_jimmystalker_12yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_silverstar_purple.png",'g'),"icon_whisky_jimmystalker_30yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_silverstar_green.jpg",'g'),"whisky_01_jimmystalker_10yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_silverstar_blue.jpg",'g'),"whisky_01_jimmystalker_12yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_silverstar_purple.jpg",'g'),"whisky_01_jimmystalker_30yo.jpg");
DocumentTemp = DocumentTemp.replace("This popular magic potion is a solid base for attracting the most common ghosts. However, more rare ghosts prefer more magical stuff. Recommended if you want to avoid stronger ghosts.", "This popular blend is a solid base for attracting the most common ghosts. However, more rare ghosts prefer single malts. Recommended if you want to avoid stronger ghosts.");
DocumentTemp = DocumentTemp.replace(new RegExp("Silver star - green", 'g'),"Jimmy Stalker 10 y.o.");
DocumentTemp = DocumentTemp.replace('The "blue" version is a very special magic potion  for rookies and experienced players alike. Due to its top-secret production process, it adds power to your trap.',"The older vintage is a very special whisky for rookies and experienced players alike. Due to its top-secret blending process, it adds power to your trap.");
DocumentTemp = DocumentTemp.replace(new RegExp("Silver star - blue", 'g'),"Jimmy Stalker 12 y.o.");
DocumentTemp = DocumentTemp.replace('Silver star "purple" is an extremely rare and exquisite potion full of arcane secrets. It can only be found in places where no agent should go alone.',"Jimmy Stalker 30 y.o. is an extremely rare and exquisite vintage full of arcane secrets. It can only be found in places where no agent should go alone.");
DocumentTemp = DocumentTemp.replace(new RegExp("Silver star - purple", 'g'),"Jimmy Stalker 30 y.o.");

//Moonshadow Series to McMillian Series
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_moonshadow_green.png",'g'),"icon_whisky_mcmillan.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_moonshadow_blue.png",'g'),"icon_whisky_mcmillan_15yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_moonshadow_purple.png",'g'),"icon_whisky_mcmillan_20yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_moonshadow_green.jpg",'g'),"whisky_01_mcmillan_12yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_moonshadow_blue.jpg",'g'),"whisky_01_mcmillan_15yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_moonshadow_purple.jpg",'g'),"whisky_01_mcmillan_20yo.jpg");
DocumentTemp = DocumentTemp.replace("This magic potion is a good start for daring hunters who venture into the more scary locations since it might attract some stronger ghosts.","A single malt that has matured in sherry casks. A good start for experienced hunters who venture into the more scary locations since it might attract some stronger ghosts.");
DocumentTemp = DocumentTemp.replace(new RegExp('Moonshadow - green', 'g'), "McMillan 12 y.o.");
DocumentTemp = DocumentTemp.replace('Using the "blue" version of Moonshadow is such a clever move that the reward for catching ghosts with it is slightly increased.', "Using the older version of the McMillan, which has matured in old sherry casks, is such a clever move that the reward for catching ghosts with it is slightly increased.");
DocumentTemp = DocumentTemp.replace(new RegExp('Moonshadow - blue', 'g'), "McMillan 15 y.o.");
DocumentTemp = DocumentTemp.replace("This special magic potion is reserved only for New Year's and other special occasions. It's so explosive that ghosts think that fireworks have gone off in their heads.", "This special vintage is reserved only for New Year's. It's so strong that ghosts think that fireworks have gone off in their heads.");
DocumentTemp = DocumentTemp.replace(new RegExp('Moonshadow - purple', 'g'), "McMillan 20 y.o.");

//Moormist Series
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_moormist_green.png",'g'),"icon_whisky_moormist.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_moormist_blue.png",'g'),"icon_whisky_moormist_21yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_moormist_purple.png",'g'),"icon_whisky_moormist_30yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_moormist_green.jpg",'g'),"whisky_01_moormist_15yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_moormist_blue.jpg",'g'),"whisky_01_moormist_21yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_moormist_purple.jpg",'g'),"whisky_01_moormist_30yo.jpg");
DocumentTemp = DocumentTemp.replace("This potent magic potion attracts the rarer ghosts of Scotland. An excellent choice for experienced hunters.","This peaty single malt attracts the rarer ghosts of Scotland. An excellent choice for experienced hunters.");
DocumentTemp = DocumentTemp.replace(new RegExp("Moormist - green", 'g'),"Moormist 15 y.o.");
DocumentTemp = DocumentTemp.replace("Enigmatic flavour, yet very mild. This mildness is almost mystical in nature and Ghosts are rumoured to bring more money along when they suspect this fantastic magic potion.", "Peaty flavour, yet very mild. This mildness is almost mystical in nature and Ghosts are rumoured to bring more money along when they suspect this fantastic vintage.");
DocumentTemp = DocumentTemp.replace(new RegExp("Moormist - blue", 'g'),"Moormist 21 y.o.");
DocumentTemp = DocumentTemp.replace("The purple version is a very rare, special potion that can only be found in the most secret and strangest locations, i.e., game rooms, theatres and museums.", "Moormist 30 y.o. is a very rare, special vintage that can only be found in the most secret and strangest locations, i.e., game rooms, theatres and museums.");
DocumentTemp = DocumentTemp.replace(new RegExp("Moormist - purple", 'g'),"Moormist 30 y.o.");

//Glengreen Series
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_glengreens_green.png",'g'),"icon_whisky_glengreen.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_glengreens_blue.png",'g'),"icon_whisky_glengreen_25yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_glengreens_purple.png",'g'),"icon_whisky_glengreen_35yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_glengreens_green.jpg",'g'),"whisky_01_glengreen_18yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_glengreens_blue.jpg",'g'),"whisky_01_glengreen_25yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_glengreens_purple.jpg",'g'),"whisky_01_glengreen_35yo.jpg");
DocumentTemp = DocumentTemp.replace("Glengreen is a very strong magic potion that will attract almost all ghosts. Truely for veterans and those who are not easily scared!","Glengreens is a very well-rounded single malt that will attract almost all ghosts. Truely for veterans and those who are not easily scared!");
DocumentTemp = DocumentTemp.replace(new RegExp("Glengreen - green", 'g'),"Glengreens 18 y.o.");
DocumentTemp = DocumentTemp.replace("The blue version is a very well-rounded magic potion that all ghosts crave. No surprise that agents will yield slightly better results when using it.", "This vintage is a very well-rounded whisky that all ghosts crave. No surprise that you will yield slightly better results when using it.");
DocumentTemp = DocumentTemp.replace(new RegExp("Glengreen - blue", 'g'),"Glengreens 25 y.o.");
DocumentTemp = DocumentTemp.replace("The rare version of the Glengreen magic potions was supposed to be lost forever on the lost island, but now that the Q-section has been able to open a portal, some bottles can be salvaged by brave agents.","The rare version of the Glengreens whiskies was supposed to be lost forever on the lost island, but now that the Q-section has been able to open a portal, some bottles can be salvaged by brave agents.");
DocumentTemp = DocumentTemp.replace(new RegExp("Glengreen - purple", 'g'),"Glengreens 35 y.o.");

//Whisperwind Series to Port Karrie Series
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_whisperwind_green.png",'g'),"icon_whisky_portkarrie_21yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_whisky_whisperwind_blue.png",'g'),"icon_whisky_portkarrie_28yo.png");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_whisperwind_green.jpg",'g'),"whisky_02_portkarrie_21yo.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("whisky_whisperwind_blue.jpg",'g'),"whisky_02_portkarrie_28yo.jpg");
DocumentTemp = DocumentTemp.replace("This magic potion was developed by a femme fatale. So it consists of many tears, broken hearts and many sorrows. Exactly the stuff  that some ghosts find attractive!","Port Karrie is named after a famous femme fatale that was legendary for stealing men's hearts and money. A strong malt with a mystical flavour.");
DocumentTemp = DocumentTemp.replace(new RegExp("Whisperwind - green", 'g'),"Port Karrie 21 y.o.");
DocumentTemp = DocumentTemp.replace("This magic potion was developed by a femme fatale. So it consists of many tears, broken hearts and many sorrows. Exactly the stuff  that some ghosts find attractive! The blue version even adds more melancholy.", "Port Karrie is named after a famous femme fatale that was legendary for stealing men's hearts and money. A strong malt with a mystical flavour.");
DocumentTemp = DocumentTemp.replace(new RegExp("Whisperwind - blue", 'g'),"Port Karrie 28 y.o.");
DocumentTemp = DocumentTemp.replace(new RegExp("Whisperwind - purple", 'g'),"Port Karrie 31 y.o.");

//Nessy Golden Reserve
DocumentTemp = DocumentTemp.replace('Rumoured to use the magical waters of Loch Ness, this legendary magic potion will attract all ghosts of Scotland, even prize ghosts, ghost monsters and some ghosts that are only attracted to "Nessy\'s"! The power of that potion is so strong that neither ghosts will steal it nor does it fail to attract a ghost. Simply liquid magic! Only available through donations. Help to improve Ghost Trappers in adding more unique features and being even more fun!','Rumoured to be distilled with the waters of Loch Ness, this legendary whisky will attract all rare ghosts of Scotland, even prize ghosts, ghost monsters and some ghosts that are only attracted to "Nessy\'s"! The power of this whisky is so strong that neither ghosts will steal it nor does it fail to attract a ghost. Simply liquid magic! Only available through donations. Help to improve Ghost Trappers in adding more unique features and being even more fun!');
DocumentTemp = DocumentTemp.replace('Rumoured to be blessed with the waters of Loch Ness, this great magic potion has a very high attraction rate for all rare ghosts of Scotland, also for prize ghosts! The power of that magic potion is so strong that neither ghosts will steal it nor angels will touch it and that you can hunt more often with it. Simply liquid magic! Only available through donations. Help to improve Ghost trappers in adding more unique features and being even more fun!','Rumoured to be distilled with the waters of Loch Ness, this legendary whisky will attract all rare ghosts of Scotland, even prize ghosts, ghost monsters and some ghosts that are only attracted to "Nessy\'s"! The power of this whisky is so strong that neither ghosts will steal it nor does it fail to attract a ghost. Simply liquid magic! Only available through donations. Help to improve Ghost Trappers in adding more unique features and being even more fun!');

//Special Edition Magic Potions

//Avalanche
DocumentTemp = DocumentTemp.replace("Although avalanches are a bad thing, this magic potions deserves that name because it can infuse agents with a force-of-nature-like buff.","Although avalanches are a bad thing, these whiskies deserves that name because it can infuse agents with a force-of-nature-like buff.");
//Belt of Venus
DocumentTemp = DocumentTemp.replace("Belt of Venus is a multy-layered magic potions. Each layer symbolizes one power of the elements.","Belt of Venus is a multy-layered whisky. Each layer symbolizes one power of the elements.");
//Condensed halo
DocumentTemp = DocumentTemp.replace("A magic potion that has a relatively high attraction combined with the power to purify infernal traps.","A whisky that has a relatively high attraction combined with the power to purify infernal traps.");
DocumentTemp = DocumentTemp.replace(new RegExp("Condensed halo", 'g'),"Condensed Halo");
//Liquid ember
DocumentTemp = DocumentTemp.replace("Liquid ember is a magic potion that is often attractive to vampire lords and ladies..","Liquid ember is a whisky that is often attractive to vampire lords and ladies..");
//Pumpkin punch
DocumentTemp = DocumentTemp.replace('A pumpkin punch potion can only be produced during Halloween. Its mystic properties have an extremely high influence on midnight ghosts.','A pumpkin punch whisky can only be produced during Halloween. Its mystic properties have an extremely high influence on midnight ghosts.');
DocumentTemp = DocumentTemp.replace(new RegExp("Pumpkin punch", 'g'),"Pumpkin Punch");
//Secret Eye
DocumentTemp = DocumentTemp.replace(new RegExp("Secret eye magic potions are made from centuries-old recipes, hoarded by the confectioner ghost and other secret ghost families. These magic potions are extremely hard to come by and are best saved for those times when you are trying to find a secret ghost.", 'g'),"Secret eye whiskies are made from centuries-old recipes, hoarded by the confectioner ghost and other secret ghost families. These whiskies are extremely hard to come by and are best saved for those times when you are trying to find a secret ghost.");
//Shadetouch
DocumentTemp = DocumentTemp.replace(new RegExp("These magic potions are extremely hard to come by and are reserved for special agents. Shadetouch even attracts ghosts that would normally only be attracted by Nessy's.", 'g'),"These whiskies are extremely hard to come by and are reserved for special agents. Shadetouch even attracts ghosts that would normally only be attracted by Nessy's.");
DocumentTemp = DocumentTemp.replace(new RegExp("Shadetouch green",'g'),"Shadetouch 15 y.o.");
DocumentTemp = DocumentTemp.replace(new RegExp("Shadetouch blue",'g'),"Shadetouch 35 y.o.");
DocumentTemp = DocumentTemp.replace(new RegExp("Shadetouch purple",'g'),"Shadetouch 50 y.o.");



//Mixed Magic Potions

//Apple zapper
DocumentTemp = DocumentTemp.replace(new RegExp("misc_recipes_apple_zapper.jpg",'g'),"misc_recipes_applemanhattan.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("misc_apple_zapper.jpg",'g'),"misc_applemanhattan.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_cocktail_apple_zapper.png",'g'),"icon_cocktail_applemanhattan.png");
DocumentTemp = DocumentTemp.replace(new RegExp("applezapper_1.png",'g'),"applemanhattan_1.png");
DocumentTemp = DocumentTemp.replace(new RegExp("applezapper_2.png",'g'),"applemanhattan_2.png");
DocumentTemp = DocumentTemp.replace('An Apple zapper is a mocktail mixed with Midnight apple juice, which is very hard to come by. Ghosts know this and bring some extra money along.','An Apple Manhattan is mixed with Midnight apple juice, which is very hard to come by. Ghosts know this and bring extra money along.');
DocumentTemp = DocumentTemp.replace(new RegExp("Apple zapper",'g'),"Apple Manhattan");
DocumentTemp = DocumentTemp.replace(new RegExp("Apple Zapper",'g'),"Apple Manhattan");
//Black tartan
DocumentTemp = DocumentTemp.replace('Many a ghost had a sweet tooth in its mortal life, so it is not a surprise that some prefer the sweet, chocolate-like taste of a Black tartan.','Many a ghost had a sweet tooth in its mortal life, so it is not a surprise that some prefer the sweet, chocolate-like taste of a Black Tartan.');
DocumentTemp = DocumentTemp.replace(new RegExp("Black tartan",'g'),"Black Tartan");
//Black Widow
DocumentTemp = DocumentTemp.replace('A "Black Widow" is a very delicious mocktail. Actually, it is so delicious that it even has a slight chance to attract Ghost monsters!','A "Black Widow" is a very delicious cocktail. Actually, it is so delicious that it even has a slight chance to attract Ghost monsters!');
//Brainbuster - Need description to be able to change it, if needed
//Choco shock
DocumentTemp = DocumentTemp.replace(new RegExp("Choco shock",'g'),"Choco Shock");
//Braveheart
DocumentTemp = DocumentTemp.replace(new RegExp("misc_recipes_braveheart.jpg",'g'),"misc_recipes_robroy.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("misc_braveheart.jpg",'g'),"misc_robroy.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_cocktail_braveheart.png",'g'),"icon_cocktail_robroy.png");
DocumentTemp = DocumentTemp.replace(new RegExp("braveheart_1.png",'g'),"robroy_1.png");
DocumentTemp = DocumentTemp.replace(new RegExp("braveheart_2.png",'g'),"robroy_2.png");
DocumentTemp = DocumentTemp.replace("A Braveheart is a mocktail named after one of Scotland's most famous sons. This high amount of tradition cannot be withstood by many ghosts.","A Rob Roy is a cocktail named after one of Scotland's most famous sons. This high amount of tradition cannot be withstood by many ghosts.");
DocumentTemp = DocumentTemp.replace(new RegExp("Braveheart",'g'),"Rob Roy");
//Cherry bomb
DocumentTemp = DocumentTemp.replace("Cherry bombs have such an overwhelming taste, that ghosts are under the impression that really a bomb has exploded over their heads. This recipe is only available through Cherry Credits.","Cherry Bombs have such an overwhelming taste, that ghosts are under the impression that really a bomb has exploded over their heads. This recipe is only available through Cherry Credits.");
DocumentTemp = DocumentTemp.replace(new RegExp("Cherry bomb",'g'),"Cherry Bomb");
//Corpse reviver
DocumentTemp = DocumentTemp.replace("A sip of this mocktail can literally revive corpses. It tastes so great that even some nocturnal ghosts try to get their hands on it.","A sip of this cocktail can literally revive corpses. It tastes so great that even some nocturnal ghosts try to get their hands on it.");
DocumentTemp = DocumentTemp.replace(new RegExp("Corpse reviver",'g'),"Corpse Reviver");
//Crimson Mary - Need description to be able to change it, if needed
DocumentTemp = DocumentTemp.replace(new RegExp("Crimson mary",'g'),"Crimson Mary");
//Dark side of the moon - Need description to be able to change it, if needed
DocumentTemp = DocumentTemp.replace(new RegExp("Dark side of the moon",'g'),"Dark Side of the Moon");
//Devil Driver
DocumentTemp = DocumentTemp.replace("A Devil Driver is such a delicious mocktail that its attraction is simply irresistible to all ghosts! No matter where you are hunting, you cannot go wrong with it.","Devil Driver is such a delicious cocktail that its attraction is simply irresistible to all ghosts! No matter where you are hunting, you cannot go wrong with it.");
DocumentTemp = DocumentTemp.replace(new RegExp("Devil driver",'g'),"Devil Driver");
//Double feature
DocumentTemp = DocumentTemp.replace("The double feature is a mocktail that is very popular among all cineastic ghosts who are so snobby that are not interested in anything else. The double feature is the only bait to use in the show room of Sternham Castle if you want to catch the local ghosts.","The Double Feature is a cocktail that is very popular among all cineastic ghosts who are so snobby that are not interested in anything else. The Double Feature is the only bait to use in the show room of Sternham Castle if you want to catch the local ghosts.");
DocumentTemp = DocumentTemp.replace(new RegExp("Double feature",'g'),"Double Feature");
//Frozen mist
DocumentTemp = DocumentTemp.replace(new RegExp("Frozen mist",'g'),"Frozen Mist");
DocumentTemp = DocumentTemp.replace("A frozen mist is made from the mist and morning dew of the low lands and the Glengreen potions, resulting in a frosty, aromatic potion that many ghosts love.","A Frozen Mist is made from the mist and morning dew of the low lands and the Glengreens whiskies, resulting in a frosty, aromatic cocktail that many ghosts love.");
//Gentleman
DocumentTemp = DocumentTemp.replace(new RegExp("misc_recipes_gentleman.jpg",'g'),"misc_recipes_oldfashioned.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("gentleman_1.png",'g'),"oldfashioned_1.png");
DocumentTemp = DocumentTemp.replace(new RegExp("gentleman_2.png",'g'),"oldfashioned_2.png");
DocumentTemp = DocumentTemp.replace("A classic mocktail that is older than some of the ghosts. You can't do anything wrong with this one, although it is difficult to mix. Only true masters of the art of mixing can produce a perfect Gentleman. Using this mocktail will increase your rewards.","A classic cocktail that is older than some of the ghosts. You can't do anything wrong with this one, although it is difficult to mix. Only true masters of the art of mixing can produce a perfect Old Fashioned. Using this cocktail will increase your rewards.");
DocumentTemp = DocumentTemp.replace("A classic mocktail whose recipe is older than some of the ghosts. You can't do anything wrong with this one, although it is difficult to mix. Only true masters of the art of mixing can produce a true Gentleman. Using this mocktail will increase your rewards.","A classic cocktail that is older than some of the ghosts. You can't do anything wrong with this one, although it is difficult to mix. Only true masters of the art of mixing can produce a perfect Old Fashioned. Using this cocktail will increase your rewards.");
DocumentTemp = DocumentTemp.replace(new RegExp("Gentleman",'g'),"Old Fashioned");
//Green goddess
DocumentTemp = DocumentTemp.replace("When Charles the barkeeper feels that the agents of S.C.O.T.C.H. are in dire need of special bait, he will supply them with a mocktail made from a recipe only he knows.","When Charles the barkeeper feels that the agents of S.C.O.T.C.H. are in dire need of special bait, he will supply them with a cocktail made from a recipe only he knows.");
DocumentTemp = DocumentTemp.replace(new RegExp("Green goddess",'g'),"Green Goddess");
//Jack jones
DocumentTemp = DocumentTemp.replace(new RegExp("misc_recipes_jack_jones.jpg",'g'),"misc_recipes_jackfrost.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("jackjones_1.png",'g'),"jackfrost_1.png");
DocumentTemp = DocumentTemp.replace(new RegExp("jackjones_2.png",'g'),"jackfrost_2.png");
DocumentTemp = DocumentTemp.replace("A Jack Jones is such a sweet and strong mocktail it makes even the toughest ghosts very soft, allowing for sharper pictures to be taken. Those pictures are worth more experience points. ","A Jack Frost is such a sweet and strong cocktail it makes even the toughest ghosts very tipsy, allowing for sharper pictures to be taken. Those pictures are worth more experience points.");
DocumentTemp = DocumentTemp.replace("A Jack Jones is such a sweet and delicious mocktail it makes even the toughest ghosts soft, allowing for sharper pictures to be taken. Those pictures are worth more experience points.","A Jack Frost is such a sweet and strong cocktail it makes even the toughest ghosts very tipsy, allowing for sharper pictures to be taken. Those pictures are worth more experience points.");
DocumentTemp = DocumentTemp.replace(new RegExp("Jack jones",'g'),"Jack Frost");
DocumentTemp = DocumentTemp.replace(new RegExp("Jack Jones",'g'),"Jack Frost");
//Jesperian way
DocumentTemp = DocumentTemp.replace(new RegExp("Jesperian way",'g'),"Jesperian Way");
//Light of day
DocumentTemp = DocumentTemp.replace(new RegExp("Light of day",'g'),"Light of Day");
//Love potion
DocumentTemp = DocumentTemp.replace(new RegExp("Love potion",'g'),"Love Potion");
//Lucky punch
DocumentTemp = DocumentTemp.replace('The lucky punch is a mocktail that radiates pure luck to those who even touch the glass.','The Lucky Punch is a cocktail that radiates pure luck to those who even touch the glass.');
DocumentTemp = DocumentTemp.replace(new RegExp("Lucky punch",'g'),"Lucky Punch");
//Maß malt juice - Need link for mixing recipe
DocumentTemp = DocumentTemp.replace('Not all ghosts are curious to try new things, especially not the spoiled party ghosts, but those who try the famous German "Maß" during Oktoberfest will quickly note that non-alcoholic malt juice tastes great!', 'Not all ghosts are curious to try new things, especially not the spoiled party ghosts, but those who try the famous German "Maß" during Oktoberfest will quickly note it has a good punch!');
DocumentTemp = DocumentTemp.replace(new RegExp("Maß malt juice", 'g'),"Maß bier");
//Midnight rider
DocumentTemp = DocumentTemp.replace('After acquiring a few secret ingredients, Charles the barkeeper has managed to come up with two new mocktails that even midnight ghosts cannot resist during daytime.','After acquiring a few secret ingredients, Charles the barkeeper has managed to come up with two new cocktail that even midnight ghosts cannot resist during daytime.');
DocumentTemp = DocumentTemp.replace(new RegExp("Midnight rider",'g'),"Midnight Rider");
//Midnight smash
DocumentTemp = DocumentTemp.replace('After acquiring a few secret ingredients, Charles the barkeeper has managed to come up with two new mocktails that even midnight ghosts cannot resist during daytime.','After acquiring a few secret ingredients, Charles the barkeeper has managed to come up with two new cocktail that even midnight ghosts cannot resist during daytime.');
DocumentTemp = DocumentTemp.replace(new RegExp("Midnight smash",'g'),"Midnight Smash");
//Mistletoe
DocumentTemp = DocumentTemp.replace('If you want to taste the "spirit" of Christmas, then this is the mocktail for you. Only available from Santa or his three little Diviad helpers.','If you want to taste the "spirit" of Christmas, then this is the cocktail for you. Only available from Santa or his three little Diviad helpers.');
//Nightcap
DocumentTemp = DocumentTemp.replace('A nightcap is a very special mocktail that is really famous among the ghosts of Kirkyard Crypt.','A Nightcap is a very special cocktail that is really famous among the ghosts of Kirkyard Crypt.');
//North star - Need description to be able to change it, if needed
DocumentTemp = DocumentTemp.replace(new RegExp("North star",'g'),"North Star");
//Old Admiral
DocumentTemp = DocumentTemp.replace("The famous Old admiral from the Pusser's bar is said to cure terrible pain. In our case, ghosts are considered the terrible pain.",'The famous Painkiller from <a href="http://www.pussersbar.de/" target="_blank">Pusser\'s Bar</a> is said to cure terrible pain. In our case, ghosts are considered the terrible pain.');
DocumentTemp = DocumentTemp.replace('The famous "Old admiral" mocktail from the Pusser\'s bar is said to make you feel well even despite terrible pain. In our case, ghosts are considered the terrible pain.','The famous "Painkiller" cocktail from <a href="http://www.pussersbar.de/" target="_blank">Pusser\'s Bar</a> is said to cure terrible pain. In our case, ghosts are considered the terrible pain.');
DocumentTemp = DocumentTemp.replace(new RegExp("Old admiral",'g'),"Painkiller");
DocumentTemp = DocumentTemp.replace(new RegExp("Old Admiral",'g'),"Painkiller");
//Red nightmare
DocumentTemp = DocumentTemp.replace(new RegExp("Red nightmare",'g'),"Red Nightmare");
//Ruby tuesday
DocumentTemp = DocumentTemp.replace("The Ruby Tuesday is a mocktail whose recipe has been passed down from one generation of alchemists  to the next. To learn how to mix such a delicious mocktail, you have to prove yourself worthy to S.C.O.T.C.H. HQ and its staff!","The Ruby Tuesday cocktail's recipe has been passed down from one generation of barkeepers to the next. To learn how to mix such a delicious cocktail, you have to prove yourself worthy to S.C.O.T.C.H. HQ and its barkeep staff!");
DocumentTemp = DocumentTemp.replace(new RegExp("Ruby tuesday",'g'),"Ruby Tuesday");
//Scottish coffee - Need description to be able to change it, if needed
DocumentTemp = DocumentTemp.replace(new RegExp("Scottish coffee",'g'),"Scottish Coffee");
//Witch hunt
DocumentTemp = DocumentTemp.replace("A witch hunt is a very fancy mocktail that is best used to attract the legendary dragonrider ghost.","A witch hunt is a very fancy cocktail that is best used to attract the legendary dragonrider ghost.");
DocumentTemp = DocumentTemp.replace(new RegExp("Witch hunt",'g'),"Witch Hunt");



//Mixers
DocumentTemp = DocumentTemp.replace(new RegExp("icon_juice_kreepy_koko.png",'g'),"icon_juice_kreepykahlua.png");
DocumentTemp = DocumentTemp.replace(new RegExp("misc_kreepy_koko.jpg",'g'),"misc_kreepykahlua.jpg");
DocumentTemp = DocumentTemp.replace('Kreepy Koko is a rare import from the Caribbean. Its creamy flavour is the basis for sweet mocktails.','Kreepy Kahlua is a rare import from the Caribbean. Its creamy flavour is the basis for sweet cocktails.');
DocumentTemp = DocumentTemp.replace(new RegExp("Kreepy koko", 'g'),"Kreepy kahlua");
DocumentTemp = DocumentTemp.replace(new RegExp("Kreepy Koko", 'g'),"Kreepy kahlua");
DocumentTemp = DocumentTemp.replace(new RegExp("misc_widow_tears.jpg",'g'),"misc_widowvermouth.jpg");
DocumentTemp = DocumentTemp.replace(new RegExp("icon_juice_widow_tears.png",'g'),"icon_juice_widowvermouth.png");
DocumentTemp = DocumentTemp.replace('The sweet bitterness of widow tears comes from its secret ingredients: the tears of sorrow, shed by young widows.','The sweet bitterness of Widow vermouth comes from its secret ingredients: the tears of sorrow, shed by young widows.');
DocumentTemp = DocumentTemp.replace(new RegExp("Widow tears", 'g'),"Widow vermouth");
DocumentTemp = DocumentTemp.replace('Silver screen juice actually consists of coconut milk, but that would not sound too fitting for an ingredient of a double feature mocktail.','Silver screen juice actually consists of coconut milk, but that would not sound too fitting for an ingredient of a double feature cocktail.');

//Ghost Changes
DocumentTemp = DocumentTemp.replace(new RegExp("potionmaster", 'g'),"master distiller");
DocumentTemp = DocumentTemp.replace(new RegExp("Potionmaster", 'g'),"Master distiller");
DocumentTemp = DocumentTemp.replace(new RegExp("Greedy ghost", 'g'),"Distiller ghost");
DocumentTemp = DocumentTemp.replace(new RegExp("greedy ghost", 'g'),"distiller ghost");

//Misc Changes and Catch Alls
DocumentTemp = DocumentTemp.replace('Instead of malt juice Friar Benedict really has a weakness for magic potions. He helps S.C.O.T.C.H. agents to trap ghosts to eliminate the competition.','Instead of Maß bier Friar Benedict really has a weakness for whiskies. He helps S.C.O.T.C.H. agents to trap ghosts to eliminate the competition.');
DocumentTemp = DocumentTemp.replace(new RegExp("BURNER - This mechanism uses additional magic potions.",'g'),"BURNER - This mechanism uses additional whiskies.");
DocumentTemp = DocumentTemp.replace("Currencies are mainly used for buying things in Lady Bayoushi's. Some mocktail recipes require currencies, too.","Currencies are mainly used for buying things in Lady Bayoushi's. Some cocktail recipes require currencies, too.");
DocumentTemp = DocumentTemp.replace("Castle McWallace has a huge cellar that can store many a barrel of magic potions. No surprise that ghosts are attracted to this place.","Castle McWallace has a huge cellar that can store many a barrel of whisky. No surprise that ghosts are attracted to this place.");
DocumentTemp = DocumentTemp.replace("Visit the different departments of S.C.O.T.C.H. You will find mechanisms in the Q-section, magic circles in the laboratory and magic potions at the bar.","Visit the different departments of S.C.O.T.C.H. You will find mechanisms in the Q-section, magic circles in the laboratory and whiskies at the bar.");
DocumentTemp = DocumentTemp.replace("Juices are needed for mixing mocktails.","Juices are needed for mixing cocktails.");
DocumentTemp = DocumentTemp.replace(new RegExp("magic potions", 'g'),"whiskies");
DocumentTemp = DocumentTemp.replace(new RegExp("Magic Potions", 'g'),"Whiskies");
DocumentTemp = DocumentTemp.replace(new RegExp("Magic potions", 'g'),"Whiskies");
DocumentTemp = DocumentTemp.replace(new RegExp("magic potion", 'g'),"whisky");
DocumentTemp = DocumentTemp.replace(new RegExp("Magic Potion", 'g'),"Whisky");
DocumentTemp = DocumentTemp.replace(new RegExp("Magic potion", 'g'),"Whisky");
DocumentTemp = DocumentTemp.replace(new RegExp("Potions", 'g'),"Whiskies");
DocumentTemp = DocumentTemp.replace(new RegExp("Potion", 'g'),"Whisky");
DocumentTemp = DocumentTemp.replace(new RegExp("potions", 'g'),"whiskies");
DocumentTemp = DocumentTemp.replace(new RegExp("potion", 'g'),"whisky");
DocumentTemp = DocumentTemp.replace(new RegExp("mocktail", 'g'),"cocktail");
DocumentTemp = DocumentTemp.replace(new RegExp("mocktails", 'g'),"cocktails");

document.body.innerHTML = DocumentTemp;