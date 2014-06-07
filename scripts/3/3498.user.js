// Based on Jer's WOnderful World of Internet, for the Limbaugh Fan

// ==UserScript== 
// @name          Limbaugh Lexicon Adder
// @namespace     none
// @description   Put Rush's commentary into your left-wing news as it happens
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
 



    "die,": "assume room tempurature," ,
    "died,": "assumed room tempurature," ,

    " die ": " assume room tempurature " ,
    " died ": " assumed room tempurature " ,

	"National Organization of Women": "National Organization of Gals (formerly National Organization of Women)",




 
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

    "Senator Kerry,": "Senator Kerry, who once served in Vietnam, ",
    "Senator Kerry": "Senator Kerry, who once served in Vietnam, ", 
    "John Kerry,": "John Kerry, the haughty-looking French failed presidential candidate, who, by the way, once served almost five months in Vietnam",
    "John Kerry": "John Kerry, the haughty-looking French failed presidential candidate, who, by the way, once served almost five months in Vietnam", 

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
    "Nancy Pelosi,": "Nancy America's Sweetheart Pelosi," ,
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
    "Nancy Pelosi": "Nancy Miss America Pelosi" ,
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
