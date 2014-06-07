// ==UserScript==
// @name           BvS_-_SirDuck_Marketplace
// @namespace      SirDuck
// @include        *animecubed.com/billy/bvs/villagemarketplace*
// ==/UserScript==



// Global-ish variables
var objItemList = [];


// Classes for storing repeated data
function objItem(name,buyprice)
{
   this.name = name;
   this.minprice = -1;
   this.count = 0;
   this.buyprice = buyprice;
   this.item = null;
}


function initialize_perms()
{
   // Setup objItemList with hardcoded values

   var KAI_MULT = 0.7;

/*** BEGINNING OF PERM TEMPORARY ARRAY ****/

   var tempArr = [

   /* (buyprice) , (item_name)  */

// Candy Items
         -1      , "Candy Items:",

      50000      , "Book of Follet",
      50000      , "Whip of Rosa",
      50000      , "Bat of Casper",
      50000      , "Bow of Windia",
     150000      , "Hat of Sakyura",

// Party House Items
         -1      , "Party House Items:",

   20000000      , "Over 11000",
          0      , "Pinchy Claw",
    2000000      , "BillyCon Emblem",
     170000      , "Sevens Trophy",
     700000      , "Claymore",

// Phase items (?)
         -1      , "Phase items (?):",

    2000000      , "Kimono of Shadows",
    1300000      , "Voice Enslaver",
    1300000      , "Tickling Death",
    1300000      , "Prancing Haze",
    1300000      , "Wanton Rose",

// Minor Kai Drops
         -1      , "Minor Kai Drops:",

KAI_MULT *     600000      , "Amalga Eye",
KAI_MULT *     350000      , "Bear Coat",
KAI_MULT *     900000      , "Big Mouth",
KAI_MULT *     450000      , "Book of Spoilers",
KAI_MULT *     500000      , "Carapace Armor",
KAI_MULT *     750000      , "Catgirl Entourage",
KAI_MULT *     400000      , "Claw Card",
KAI_MULT *    2000000      , "Dramatic Monologue",
KAI_MULT *    1000000      , "Driving Music",
KAI_MULT *     450000      , "Firebrand",
KAI_MULT *     500000      , "Fruits Basket",
KAI_MULT *     750000      , "Go Piece",
KAI_MULT *     350000      , "Granola Camouflage",
KAI_MULT *     500000      , "Groupies",
KAI_MULT *     500000      , "Hacksaw",
KAI_MULT *     475000      , "Helix Tattoo",
KAI_MULT *    1200000      , "Huggly Teddybear",
KAI_MULT *     900000      , "Kaiju Memento",
KAI_MULT *    1000000      , "Lab Coat",
KAI_MULT *     550000      , "Late-Night Snack",
KAI_MULT *     600000      , "Lightning Draw",
KAI_MULT *     475000      , "Magical Wand",
KAI_MULT *     550000      , "Merchant Sigil",
KAI_MULT *     700000      , "Money Printer",
KAI_MULT *     500000      , "Monkey Cymbals",
KAI_MULT *     375000      , "Perfect Hair",
KAI_MULT *     500000      , "Persocom",
KAI_MULT *    1200000      , "Pink Skull",
KAI_MULT *     650000      , "Plug Suit",
KAI_MULT *     700000      , "Poisoned Daggers",
KAI_MULT *     450000      , "Pokerballs",
KAI_MULT *     850000      , "Polar Star",
KAI_MULT *     600000      , "Power Over 9000",
KAI_MULT *     500000      , "Red Water",
KAI_MULT *     750000      , "Regalia",
KAI_MULT *    2000000      , "Rocket Punch",
KAI_MULT *    1300000      , "Senjutsu Reserves",
KAI_MULT *    1000000      , "Shiny Belt",
KAI_MULT *    1000000      , "Something Good",
KAI_MULT *     500000      , "Soul of Steel",
KAI_MULT *    1250000      , "Spirit of the Demon of the Sand",
KAI_MULT *    1250000      , "Spirit of the Nine-Tailed Fox",
KAI_MULT *    1700000      , "Student ID",
KAI_MULT *     950000      , "Thunderclaw Ring",
KAI_MULT *    1250000      , "Tire Tracks",
KAI_MULT *     340000      , "Troll Account",
KAI_MULT *     450000      , "Vampire Cloak",

// Major Kai Drops
         -1      , "Major Kai Drops:",

KAI_MULT *    2000000      , "Avant-Guards",
KAI_MULT *    2000000      , "Crystal Tumblers",
KAI_MULT *    1700000      , "Flaming Spit Technique",
KAI_MULT *    3250000      , "\'Goodbye Kitten\' Pink Taser",
KAI_MULT *    2000000      , "Makeshift Booth",
KAI_MULT *    2000000      , "Parting Gifts",
KAI_MULT *    2000000      , "Pokey Stick",
KAI_MULT *    2500000      , "Quality Cookware",
KAI_MULT *    2000000      , "Remote Scout",
KAI_MULT *    1750000      , "Sad Robot",
KAI_MULT *    2000000      , "Surplus Ordnance",
KAI_MULT *    3000000      , "Time Reversal Cube",
KAI_MULT *    1500000      , "Training Montage",
KAI_MULT *    2000000      , "Zombja Survival Guide",

// Golden Items
         -1      , "Golden Items:",

    250000       , "Golden Band of Courage",
    250000       , "Golden Band of Power",
    250000       , "Golden Band of Wisdom",
    250000       , "Golden Collar of Courage",
    250000       , "Golden Collar of Power",
    250000       , "Golden Collar of Wisdom",
    250000       , "Golden Star of Courage",
    250000       , "Golden Star of Power",
    250000       , "Golden Star of Wisdom",

// Reaper and Monochrome
         -1      , "Reaper / Monochrome Items:",

      10000      , "Heck Butterfly",
      10000      , "Swallowtail Butterfly",
      10000      , "Soul Glove",


// End of non-perm items
         -1      , "END PERM ITEM LIST"
      ];

/*** END PERM TEMPORARY ARRAY ****/

   // Add to the item list from the temporary array
   for (var i=0; i<tempArr.length; i+=2)
      objItemList.push( new objItem(tempArr[i+1], tempArr[i]) );

}

function initialize_nonperms()
{
   // Setup objItemList with hardcoded values

/*** BEGINNING OF NONPERM TEMPORARY ARRAY ****/

   var tempArr = [

   /* (buyprice) , (item_name)  */

// Super Potion Ingredients
         -1      , "Super Potion Ingredients:",

       1000      , "Tasty Tonic",
       1000      , "Tasty Twig",
       2000      , "Twigpile",

       2000      , "Power Flower",
       2000      , "Powerful Potion",
       4500      , "Powerpack",

        500      , "Tasty Burger",

       5500      , "Glowing Goo",
       5500      , "Milkshake",
       5500      , "Emergency Rations",
       5500      , "The Right Stuff",
       5500      , "Cure Right Wounds",

       5000      , "Super Potion",

// Ingredient hunt mixing
         -1      , "Ingredient Hunt Items:",

       5500      , "Monochrome Flower",
      11000      , "Monochrome Pheromone",

      11000      , "Stark Moonlight",
      22000      , "Make-Out Mood Enhancer",

       2500      , "Ebony Sand",
       5000      , "Reversing Hourglass",

       2000      , "DayShade",
       2000      , "NightShade",
       4000      , "Rotating Timesphere",

      40000      , "Dark Water",
      70000      , "Dark Mixture",
      80000      , "Dark Draft",

          0      , "Smokestack",
          0      , "Smokeblossom",
          0      , "Ashen Film",
       7500      , "Ashen War Paint",

      50000      , "Dehydrated Sammich",

// Essences
         -1      , "Essences:",

      20000      , "Essence of Water",
      20000      , "Essence of Wind",
      20000      , "Essence of Fire",
      20000      , "Essence of Lightning",
      20000      , "Essence of Earth",

// Valuable Ally Drops
         -1      , "Ally Drop Items:",

       1000      , "Smoke Bombs",
      10000      , "TACO",
       2000      , "Food Pills",
       1500      , "Billy Bucket",
       3000      , "Storybook Page",
       1200      , "Holy Arrow",
       1100      , "Invisible Sandwich",
       8000      , "Silver Elixir",

// Expensive Potions
         -1      , "Overpriced Beverages:",

     150000      , "Golden Potion",
   10000000      , "Sho Nuff Elixir",
     500000      , "Heartsong Elixir",
    1000000      , "Ninja-Mas Cookie",
     900000      , "SNAKE Oil",
     250000      , "SNAKE Oil Lite",
     250000      , "RoboPotion",

// WK Rewards
         -1      , "WorldKaiju Rewards",

    2000000      , "OxyBlast",
    2000000      , "Essential Stash",
    2000000      , "Yoki Essence",
    2000000      , "DG Cells",
    2000000      , "Under 11000",
    
    1000000      , "Stock Certificate",
    1000000      , "Eventful Fanfare",
    1000000      , "Awkward Silence",
    1000000      , "Firefly Cage",
    1000000      , "Strange Candy",

    1000000      , "Major Crane",



// Wasteland Items
         -1      , "Wasteland Crafting Items:",

        400      , "Fur Square",
        600      , "Sticky Thread",
       2500      , "Ash-Covered Tile",
       1250      , "Ash-Covered Coin",
       2500      , "Ash-Covered Rare Coin",
       2000      , "Ash-Covered Gem",
       4000      , "Ash-Covered Rare Gem",
       3000      , "Ash-Covered Ring",
       5000      , "Ash-Covered Rare Ring",
        500      , "Ash-Covered Shaft",
       1200      , "Ash-Covered Rare Shaft",
       1100      , "Ash-Covered Rune",
     250000      , "Rare Ash-Covered Rune",

// Runes
         -1      , "Runes:",

      15000      , "Fox Rune",
      15000      , "Lightning Rune",
      15000      , "Mantis Rune",
      15000      , "Ocelot Rune",
      15000      , "Snake Rune",
      15000      , "Wolf Rune",

     250000      , "Crying Rune",
     250000      , "Laughing Rune",
     250000      , "Screaming Rune",
     250000      , "Raging Rune",

// Random and don't know
         -1      , "Miscellaneous Maybe Useful:",

      40000      , "Juiceglass",
       25000      , "Drunken Pirate Flag",
      25000      , "Red and Black Shades",
       25000      , "Manji Headlights",
       1000      , "Errant Bit",

// End of non-perm items
         -1      , "END NONPERM ITEM LIST"
      ];

/*** END NONPERM TEMPORARY ARRAY ****/
   
   // Add to the item list from the temporary array
   for (var i=0; i<tempArr.length; i+=2)
      objItemList.push( new objItem(tempArr[i+1], tempArr[i]) );

}

function process_itemprices(item, name, unitprice)
{
   for (var i=0; i<objItemList.length; i++)
      if (objItemList[i].buyprice != -1 && name == objItemList[i].name)
      {
         // Update item listing count and minprice
         objItemList[i].count++;

         if (objItemList[i].minprice == -1 || objItemList[i].minprice > unitprice)
         {
            objItemList[i].minprice = unitprice;
            objItemList[i].item = item;
         }

         // Return true if we are under the buy price
         return (unitprice <= objItemList[i].buyprice ? true : false);
      }

    if (i == objItemList.length)
    {
	objItemList.push(new objItem(name, 0));
    }

   return false;
}

function process_item(item)
{
   // Item is the <tr></tr> element in the item list table

   // Get the item properties
   var item_name          = item.childNodes[1].childNodes[0].childNodes[0].innerHTML;
   var item_id            = item.childNodes[0].childNodes[0].value;
   var item_qty           = /\(Qty: ([^\)]+)\)/.exec(item.childNodes[1].innerHTML)[1];
   var item_totalpricestr = /^([^\s]+) Ryo/.exec(item.childNodes[2].innerHTML)[1];
   var item_unitpricearr  = /<i>\(([^\s]+) each\)/.exec(item.childNodes[2].innerHTML);

   var item_unitprice;

   // Remove any commas from the price strings
   if (item_unitpricearr)
      item_unitprice = item_unitpricearr[1].replace(/,/g,"");
   else
      item_unitprice = item_totalpricestr.replace(/,/g,"");

   // Item price processing
   var item_color    = process_itemprices(item, item_name, parseInt(item_unitprice) );
   
   if (item_color)
      item.style.backgroundColor = "rgb(100,255,100)";

   item.innerHTML += "<td style=\"white-space: nowrap;\">id: " + item_id + "&nbsp;&nbsp;&nbsp;&nbsp;</td>";
}



function insert_minprices(buylist)
{
   var firstrow = buylist.childNodes[1].childNodes[1].childNodes[1].childNodes[0];
   
   var newNode;
   var cnt = 0;

   for (var i=0; i<objItemList.length; i++)
   {
      // Descriptive row insert for buyprice == -1
      if (objItemList[i].buyprice == -1)
      {
         newNode = firstrow.cloneNode(true);
         newNode.style.backgroundColor = "rgb(200,200,255)";
         newNode.childNodes[0].innerHTML = "";
         newNode.childNodes[1].innerHTML = "<b><i><span>" + objItemList[i].name + "</span></i></b></td>";
         newNode.childNodes[2].innerHTML = "";
         newNode.childNodes[3].innerHTML = "";
         newNode.style.height = "25px";

         firstrow.parentNode.insertBefore(newNode, firstrow);
      }

      // Early continue if no itemtype for sale
      if (objItemList[i].minprice == -1)
         continue;

      // Clone the node to be added
      newNode = objItemList[i].item.cloneNode(true);

      // Set color scheme (green if buy, alternating blue/white otherwise)
      if (objItemList[i].minprice <= objItemList[i].buyprice) // good price
         newNode.style.backgroundColor = "rgb(100,255,100)";
      else if (objItemList[i].minprice > 2 * objItemList[i].buyprice) // overpriced
         newNode.style.backgroundColor = "rgb(255,130,130)";
      else if (objItemList[i].minprice > 1.7 * objItemList[i].buyprice) // moderate high price
         newNode.style.backgroundColor = "rgb(255,255,90)";
      else
         newNode.style.backgroundColor = (cnt%2 == 0 ? "rgb(230,230,255)" : "rgb(255,255,255)");

      // Show number of listings
      newNode.childNodes[3].innerHTML = "Listed: " + objItemList[i].count + "&nbsp;&nbsp;&nbsp;&nbsp;";

      // Insert the node
      firstrow.parentNode.insertBefore(newNode, firstrow);

      // Increment count of actual items inserted
      cnt++;
   }

   // One final blank row before original entries
   newNode = firstrow.cloneNode(true);
   newNode.innerHTML = "";
   newNode.style.height = "15px";
   firstrow.parentNode.insertBefore(newNode, firstrow);

}


try
{
   // Determine which page we are on (recent, perms, or non-perms)

   var buylist_iterator = 
       document.evaluate(
       '//form[@name="buylist"]',
       document,
       null,
       XPathResult.ANY_TYPE,
       null);

   var buylist = buylist_iterator.iterateNext();

//   var page_str = buylist.previousSibling.childNodes[0].innerHTML;

   // page_type = [0: recent, 1: perms, 2: non-perms]
   var page_type;
   
   if (document.body.innerHTML.indexOf("Non-Permanent Items:") > 0)
      page_type = 2;
   else if (document.body.innerHTML.indexOf("Permanent Items:") > 0)
      page_type = 1;
   else if (document.body.innerHTML.indexOf("Last 25 Listings:") > 0)
      page_type = 0;
   else
   {
      page_type = 0;
      buylist.previousSibling.childNodes[0].innerHTML = "";
   }


   // Call initialization routines as appropriate
   switch (page_type)
   {
   case 0:
      initialize_nonperms();
      initialize_perms();
      break;
   case 1:
      initialize_perms();
      break;
   case 2:
      initialize_nonperms();
      break;
   }



   // Extract the row elements for each item available
   var tr_iterator = document.evaluate(
                     '//form[@name="buylist"]/div/table/tbody/tr',
                     document, 
                     null, 
                     XPathResult.ANY_TYPE, 
                     null);

   var item;
   var item_list = [];

   while ( item = tr_iterator.iterateNext() )
      item_list.push(item);
   

   // Process each item of the table in turn
   for (var i=0; i<item_list.length; i++)
      process_item (item_list[i]);
   

   // Modify the table width
   item_list[0].parentNode.parentNode.width = 490;
   item_list[0].parentNode.parentNode.parentNode.style.width = "510px";
   item_list[0].parentNode.parentNode.parentNode.style.height = "45em";


   // Add the minimum price entries to top on perms/nonperms page
   if (page_type == 1 || page_type == 2)
      insert_minprices(buylist);

   // Try to free up firefox storage...
   objItemList = [];
   
}
catch(err)
{
   var objDiv = document.createElement("div"); 
   document.body.appendChild(objDiv);
   objDiv.innerHTML = "Error: " + err.name +
                      "\nMessage: " + err.message;
   objDiv.style.color = "White";
}








