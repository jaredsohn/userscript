// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer"

// ==UserScript== 
// @name          Jer's Wonderful World of Internet
// @namespace     none
// @description   Make the internet clean...sort of
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    " shit ": " poo ",  
    "mother fucker": "mother trucker",
    " fucker": "trucker",
    "fuck": "flip",   
    " damn": " dang", 
    " hell ": " H-E-double-hockey-sticks ", 
    " bastard": " illegitimate child ", 
    " cock ": " cack ", 
    " cunt": " uncouth word ", 
    "bitch": "witch", 
    " dick ": " Ricardo ", 
    " fuck": " flip", 

    " shit": " poo",
    "shit": "poo",


    "die,": "assume room tempurature," ,
    "died,": "assumed room tempurature," ,

    " die ": " assume room tempurature " ,
    " died ": " assumed room tempurature " ,

	"National Organization of Women": "National Organization of Gals (formerly National Organization of Women)",



    " Shit ": " Poo", 
    "Fuck": "Flip", 
    " Fucker": "Trucker", 
    "Mother Fucker": "Mother Trucker",  
    " Damn": " Dang", 
    " Hell ": " H-E-double-hockey-sticks ", 
    " Bastard": " Illegitimate child ", 
    " Cock ": " Cack ", 
    " Cunt": " Lady ", 
    "Bitch": "Witch", 
    " Dick Cheney": " Dick GO-FLIP-YOURSELF Cheney",

    " Shit": " Poo",
    "Shit": "Poo",


    " SHIT ": " POO", 
    "FUCK": "FLIP", 
    " FUCKER": "TRUCKER", 
    "MOTHER FUCKER": "MOTHER TRUCKER",  
    " DAMN": " DANG", 
    " HELL ": " H-E-DOUBLE-HOCKEY-STICKS ", 
    " BASTARD": " ILLEGITIMATE CHILD ", 
    " COCK ": " CACK ", 
    " CUNT": " LADY ", 
    "BITCH": "WITCH", 
    " DICK ": " RICARDO ",
    " ASS ": " BOTTOM ",
    "-ASS ": "-BOTTOM ",
    " SHIT": "POO",

    " goddamn": " hot dang", 
    " goddammit": " dad blast it", 
    " pussy": " wussy", 
    " penis": " unit", 
    " John F. Kerry,": " John Failed-to-beat-W Kerry",
    " John F. Kerry": " John Failed-to-beat-W Kerry",
    " ballsack": " scrotum",  
    " ass ": " bottom ",
    "-ass ": "-bottom ", 
    " faggot": " male of different sexual orientation", 
    " nigger": " (a black person looked upon unfavorably)", 
    " nigga": " (friend)", 
    " Nigga": " Pal", 

 
    "Howard Dean,": "Howard Dean, a very small man, ", 
    "Howard Dean ": "Howard Dean, who once famously yelled YAAAAA, ", 
    "Harry Reid,": "Harry Reid, boil on the bottom of Mormonism,",
    "Harry Reid": "Harry Reid, boil on the bottom of Mormonism,", 
    "Jesse Jackson": "The uhh Reverennnnnd Jacks-hnnnnn", 
   "Jesse Jackson,": "The uhh Reverennnnnd Jacks-hnnnnn,",


    " President Bush,": " President Bush, leader of the free world,",
    " President Bush": " President Bush, leader of the free world,",
    " George Bush,": " George Bush, a fearless defender of freedom,",
    " George Bush": " George Bush, a fearless defender of freedom,",
    
    " George W. Bush,": " George Wails-on-terrorism Bush, a fearless defender of freedom,",
    " George W. Bush": " George Wails-on-terrorims Bush, a fearless defender of freedom,",

    " John Ashcroft,": " John Ashcroft, a fine adinistrator of justice and talented singer,", 
    " John Ashcroft ": " John Ashcroft, a fine adinistrator of justice and talented singer,", 
    "Ann Coulter,": "Ann Coulter, who would make a wonderful justice on the U.S. Supreme Court", 
   "Ann Coulter": "Ann Coulter, who would make a wonderful justice on the U.S. Supreme Court", 

    "Rush Limbaugh,": "Rush Limbaugh, may his name be praised, ", 
    "Rush Limbaugh": "Rush Limbaugh, may his name be praised, ", 
    " Reagan": " Reagan, our finest president, ", 
    "niggaz": "folks of African American heritage", 
    "Senator Kerry,": "Senator Kerry, who once served in Vietnam, ",
    "Senator Kerry": "Senator Kerry, who once served in Vietnam, ", 
    "John Kerry,": "John Kerry, the haughty-looking French failed presidential candidate, who, by the way, once served almost five months in Vietnam",
    "John Kerry": "John Kerry, the haughty-looking French failed presidential candidate, who, by the way, once served almost five months in Vietnam", 
    " lick my": " let's discuss", 
    "CNN,": "CNN, the Clinton News Network,",
    "CNN": "CNN, the Clinton News Network,",
    "Al Gore,": "Algore (one word)," ,
	"Dan Rather": "Dan Blather",
	"Louis Farrakhan": "Louis 'Calypso Louis' Farrakhan",
	"The Clinton Library": "The Clinton Library And Massage Parlor",
	"Guantanamo Bay, Cuba": "Club Gitmo",
	"Robert Byrd": "Robert 'Sheets' Byrd",
	"Face the Nation": "Deface the Nation",
	"Dick Durban": "Dick Turban",
	"Tom Harkin": "Tom 'Dung Heap' Harkin",
	"enviornmental activist": "enviornmentalist wacko",
	"Katrina Vanden Heuvel": "Hurricane Katrina vanden Heuvel",
	"Patrick Leahy": "Patrick Leakey Leahy",
	"Pat Leahy": "Pat Leakey Leahy",
	"Frank Lautenberg ": "Frank The Laut Lautenberg ",
	"Peace activists": "Peaceniks",


	"Dan Rather,": "Dan Blather,",
	"Louis Farrakhan,": "Louis 'Calypso Louis' Farrakhan,",
	"Clinton Library,": "Clinton Library And Massage Parlor,",
	"Guantanamo Bay, Cuba,": "Club Gitmo,",
	"Robert Byrd,": "Robert 'Sheets' Byrd,",
	"Face the Nation,": "Deface the Nation,",
	"Dick Durban,": "Dick Turban,",
	"Tom Harkin,": "Tom 'Dung Heap' Harkin,",
	"enviornmental activist": "enviornmentalist wacko",
	"Katrina Vanden Heuvel,": "Hurricane Katrina vanden Heuvel,",
	"Patrick Leahy,": "Patrick Leakey Leahy,",
	"Pat Leahy,": "Pat Leakey Leahy,",
	"Frank Lautenberg, ": "Frank The Laut Lautenberg, ",
	"Peace activists,": "Peaceniks,",




    "Teddy Kennedy,": "Teddy Kennedy, who once committed manslaughter (but was probably drunk at the time),",
    "Senator Kennedy,": "Senator Kennedy, the pink-faced Senator from Boston,", 
    "Edward Kennedy,": "Edward Kennedy, the pink-faced Senator from Boston," ,
    "Ed Kennedy,": "Ed Kennedy, the hard-drinking Senator from Boston," ,
    "Nancy Pelosi,": "Nancy Pelosi, left-coast windbag extrordinare," ,
    "Hillary Clinton,": "Hillary 'The Smartest Woman in the World' Clinton",
    "Hillary Rodham Clinton,": "Hillary Mrs. Bill Clinton", 
    "Tony Blair,": "George Bush's unlikely liberal ally in the war on terrorism, Tony Blair", 
    "Madonna,": "Madonna (once a hottie, now a sad shell of her former self and religious idiot)" ,
    "John Edwards,": "John 'Breck Girl' Edwards," ,
    "Al Gore": "Algore (one word)" ,


    "Teddy Kennedy": "Teddy Kennedy, who once committed manslaughter (but was probably drunk at the time),",
    "Senator Kennedy": "Senator Kennedy, the pink-faced Senator from Boston,", 
    "Edward Kennedy": "Edward Kennedy, the pink-faced Senator from Boston," ,
    "Ed Kennedy": "Ed 'The Swimmer'Kennedy," ,
    "Nancy Pelosi": "Nancy Pelosi, left-coast windbag extrordinare," ,
    "Hillary Clinton": "Hillary Miss Love, Cuddles, and Warmth Clinton", 
    "Hillary Rodham Clinton": "Hillary Rodham Bill'S old lady Clinton", 
    "Tony Blair": "George Bush's unlikely liberal ally in the war on terrorism, Tony Blair",
    "John Edwards": "John 'The Breck Girl' Edwards" , 
    "Madonna": "Madonna (now a sad, old shell of her former self)" 



    };

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();
