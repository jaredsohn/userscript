// ==UserScript==
// @name           KoL Wiki Helper
// @description    Provides assistance with editing the KoL Wiki
// @include        *kingdomofloathing.com/desc_item.php?whichitem=*
// @include        *127.0.0.1:600*/desc_item.php?whichitem=*
// ==/UserScript==

/*
Current Version: 0.1
Version History:
0.1 Initial release:
    *Parses item pop-ups into wiki format

To Do:
*Clan Trophies
*Effects
*Skills
*Outfits
*Adventure text
*Automatically output table rows for equipment/mechanics lists
*Try to automatically glean ItemID from HTTP request to store/closet
*Automatically populate adventure/location text on "page not created"
*/

var ScriptURL = "http://userscripts.org/scripts/show/51501";
var CurrentVersion = 0.1;

/******************************************************************************/

// utility function that needs to be defined prior to pattern definitions
// return a lowercase abbreviation of class given a title-cased plural of it
// return "1" if not in dictionary (all classes)
function ClassAbbrev() {
  if (arguments.length >= 2) {
    switch (arguments[1]) {
      case "Seal Clubbers": return "sc";
      case "Turtle Tamers": return "tt";
      case "Pastamancers": return "pm";
      case "Saucerors": return "s";
      case "Disco Bandits": return "db";
      case "Accordion Thieves": return "at";
      default: return "1";
    }
  } else {
    return "1";
  }
}

// duplicated nuisance text
FooterText = (
  "(?:Type:|Selling Price:|Cannot be discarded|Cannot be traded|" +
  "Free pull from Hagnk's|</blockquote>|" +
  "\\(Meat Pasting component\\)|\\(Meatsmithing component\\)|" +
  "\\(Cocktailcrafting ingredient\\)|\\(Cooking ingredient\\)|" +
  "\\(Jewelrymaking component\\))"
);

// pop-up parsing patterns
// see Parser() for documentation
PatsKoL = [
  ["haiku", "<img [^>]+?><blockquote>"],
  [
    "image",
    "(?:<blockquote>)?<img src=\"http://images\.kingdomofloathing\.com/" +
      "([\\s\\S]*?/[^/]*?\.gif)"
  ],
  ["name", "<center><img [\\s\\S]+?><br><b>([\\s\\S]+?)</b></center><p>"],
  ["desc", "<p><blockquote>([\\s\\S]+?)<br>(?:<br>)?" + FooterText],
  ["haikuname", "<img [\\s\\S]+?><blockquote><b>([\\s\\S]+?)</b><br>"],
  [
    "haikudesc",
    "(?!<p>)<blockquote><b>(?:[\\s\\S]+?)</b><br>([\\s\\S]+?)<br><br>" +
      FooterText
  ],
  ["paste", "<br>\\(Meat Pasting component\\)"],
  ["smith", "<br>\\(Meatsmithing component\\)"],
  ["cocktail", "<br>\\(Cocktailcrafting ingredient\\)"],
  ["cook", "<br>\\(Cooking ingredient\\)"],
  ["jewelry", "<br>\\(Jewelrymaking component\\)"],
  ["type", "<br>Type: <b>([\\s\\S]+?)</b>"],
  [
    "alsocombat",
    "<br>Type: <b>[\\s\\S]+?</b><br>\\(can also be used in combat\\)"
  ],
  [
    "power",
    "<br>(?:Power|Damage Reduction|Capacity): <b>(\\d+?(?: per level)?)</b>"
  ],
  [
    "powertype",
    "<br>(Damage Reduction|Capacity): <b>\\d+?(?: per level)?</b>"
  ],
  ["stat", "<br>(Muscle|Mysticality|Moxie) Required: <b>\\d+?</b>"],
  ["statreq", "<br>(?:Muscle|Mysticality|Moxie) Required: <b>(\\d+?)</b>"],
  ["level", "<br>Level required: <b>(\\d+)</b>"],
  ["outfit", "<br>Outfit: <b>([\\s\\S]+?)</b>\\."],
  ["autosell", "<br>Selling Price: <b>(\\d+) Meat\\.</b>"],
  ["cost", "<br>Cost: <b>(\\d+?) Meat</b>"],
  ["notrade", "<br>Cannot be traded"],
  ["nodiscard", "<br>Cannot be discarded"],
  ["gift", "<br><b>Gift Item</b>"],
  ["quest", "<br><b>Quest Item</b>"],
  [
    "enchantment",
    "<center>Enchantment:<br><b><font color=\"?blue\"?>([\\s\\S]+?)" +
    "(?:(?:<br>)+\\(Bonus for (?:Seal Clubbers|Turtle Tamers|Pastamancers|" +
      "Saucerors|Disco Bandits|Accordion Thieves) only\\))?(?:<br>)*" +
      "</font></b></center>"
  ],
  [
    "enchclass",
    "(?:<br\\s*/?><br\\s*/?>)" +
      "\\(Bonus for (Seal Clubbers|Turtle Tamers|Pastamancers|" +
      "Saucerors|Disco Bandits|Accordion Thieves) only\\)</font></b></center>",
    ClassAbbrev
  ],
  [
    "critical",
    "<br><b>NOTE:</b> If you wear multiple items that increase your Critical " +
      "Hit multiplier, only the highest multiplier applies\\."
  ],
  [
    "nohardcore",
    "<br><b>NOTE:</b> This item cannot be equipped while in Hardcore\\."
  ],
  [
    "mpreduce",
    "<br><b>NOTE:</b> Items that reduce the MP cost of skills will not do so" +
      " by more than 3 points, in total\\."
  ],
  [
    "limit",
    "<br><b>NOTE:</b> You may not equip more than one of this item at a time\\."
  ],
  ["hagnk", "<br>Free pull from Hagnk's"],
  [
    "spelltype",
    "<br><b>NOTE:</b> This item only works for ([\\s\\S]+?) Spells\\."
  ],
  [
    "class",
    "<p><font color=\"?blue\"?><b>Only " +
      "(Seal Clubbers|Turtle Tamers|Pastamancers|" +
      "Saucerors|Disco Bandits|Accordion Thieves) " +
      "may use this item\\.</b></font>",
    ClassAbbrev
  ],
  [
    "grantskill",
    "<br><b>NOTE:</b> This item grants a skill(?: that can only be used by " +
      "(Seal Clubbers|Turtle Tamers|Pastamancers|" +
      "Saucerors|Disco Bandits|Accordion Thieves))?\\.",
    ClassAbbrev
  ],
  [
    "lounge",
    "<br><b>NOTE:</b> When used, this item will be installed in your " +
      "Clan Hall's VIP Lounge, and will be usable by anybody in your Clan " +
      "with VIP Lounge access\\."
  ],
  [
    "bluenote",
    "<p><font color=\"?blue\"?><b>" +
      "(?!Only " +
      "(?:Seal Clubbers|Turtle Tamers|Pastamancers|" +
      "Saucerors|Disco Bandits|Accordion Thieves) " +
      "may use this item\\.)" +
      "([\\s\\S]+?)</b></font>"
  ]
];

// patterns to tidy enchantment text into Wiki format
PatsEnchantmentClean = [
  [
    "eltdmg",
    "^\\+(\\d+) (?:<font color=\"?(?:blue|red|blueviolet|gray|green)\"?>)" +
      "(Cold|Hot|Sleaze|Spooky|Stench) Damage(?:</font>)$",
    "+$1 {{element|$2}}"
  ],
  [
    "eltspelldmg",
    "^\\+(\\d+(?: Damage)?) to " +
      "(?:<font color=\"?(?:blue|red|blueviolet|gray|green)\"?>)" +
      "(Cold|Hot|Sleaze|Spooky|Stench) Spells(?:</font>)$",
    "+$1 to {{element|$2|Spells}}"
  ],
  [
    "eltpassive",
    "Deals (\\d+(?:\-\\d+)) " +
      "(?:<font color=\"?(?:blue|red|blueviolet|gray|green)\"?>)" +
      "(Cold|Hot|Sleaze|Spooky|Stench) Damage</font> to attackers$",
    "Deals $1 {{element|$2}} to attackers"
  ],
  ["intrinsic", "^Intrinsic effect: ([\\s\\S]+)$", "Intrinsic effect: [[$1]]"]
];

// in a RE match return, return the first matched subgroup
function ReturnFirstGroup() {
  for (var N = 1; N < arguments.length; N++) {
   if (arguments[N]) {
      return arguments[N];
    }
  }
  return "";
}

// pattern order matters for stuff like "underwater only" tags
PatsEnchantmentParse = [
  [
    "mus",
    "^(?:((?:\\+|\\-)\\s*\\d+)\\s+)Muscle$|" +
      "^Muscle(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  [
    "muspct",
    "^(?:((?:\\+|\\-)\\s*\\d+%)\\s+)Muscle$|" +
      "^Muscle(?:\\s+((?:\\+|\\-)\\s*\\d+%))$",
    ReturnFirstGroup
  ],
  [
    "mys",
    "^(?:((?:\\+|\\-)\\s*\\d+)\\s+)Mysticality$|" +
      "^Mysticality(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  [
    "myspct",
    "^(?:((?:\\+|\\-)\\s*\\d+%)\\s+)Mysticality$|" +
      "^Mysticality(?:\\s+((?:\\+|\\-)\\s*\\d+%))$",
    ReturnFirstGroup
  ],
  [
    "mox",
    "^(?:((?:\\+|\\-)\\s*\\d+)\\s+)Moxie$|" +
      "^Moxie(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  [
    "moxpct",
    "^(?:((?:\\+|\\-)\\s*\\d+%)\\s+)Moxie$|" +
      "^Moxie(?:\\s+((?:\\+|\\-)\\s*\\d+%))$",
    ReturnFirstGroup
  ],
  ["hp", "^Maximum HP(?:\\s+((?:\\+|\\-)\\s*\\d+))$"],
  ["mp", "^Maximum MP(?:\\s+((?:\\+|\\-)\\s*\\d+))$"],
  ["hpmp", "^Maximum HP/MP(?:\\s+((?:\\+|\\-)\\s*\\d+))$"],
  [
    "weapon",
    "^(?:((?:\\+|\\-)\\s*\\d+)\\s+)Weapon Damage$|" +
      "^Weapon Damage(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  ["weaponpct", "^Weapon Damage(?:\\s+((?:\\+|\\-)\\s*\\d+%))$"],
  [
    "ranged",
    "^(?:((?:\\+|\\-)\\s*\\d+)\\s+)Ranged Damage$|" +
      "^Ranged Damage(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  ["rangedpct", "^Ranged Damage(?:\\s+((?:\\+|\\-)\\s*\\d+%))$"],
  [
    "spell",
    "^(?:((?:\\+|\\-)\\s*\\d+)\\s+)Spell Damage$|" +
      "^Spell Damage(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  [
    "spellpct",
    "^(?:((?:\\+|\\-)\\s*\\d+%)\\s+)Spell Damage$|" +
      "^Spell Damage(?:\\s+((?:\\+|\\-)\\s*\\d+%))$",
    ReturnFirstGroup
  ],
  [
    "init",
    "^(?:((?:\\+|\\-)\\s*\\d+%)\\s+)Combat Initiative$|" +
      "^Combat Initiative(?:\\s+((?:\\+|\\-)\\s*\\d+%))$",
    ReturnFirstGroup
  ],
  ["da", "^Damage Absorption(?:\\s+((?:\\+|\\-)\\s*\\d+))$"],
  ["dr", "^Damage Reduction:(?:\\s+((?:\\+|\\-)?\\s*\\d+))$"],
  [
    "fumble",
    "^(Never) Fumble$|^(Reduced chance) of fumbling$|" +
      "^([\\d.]+x) chance of Fumble$",
    ReturnFirstGroup
  ],
  ["meat", "^(?:((?:\\+|\\-)\\s*\\d+%)\\s*)Meat from Monsters$"],
  ["ml", "^(?:((?:\\+|\\-)\\s*\\d+)\\s*)to Monster Level$"],
  ["slimehate", "^Slime Hates It$"],
  ["crit", "^(?:((?:\\+|\\-)?\\s*\\d+(?:x|%))\\s*)chance of Critical Hit$"],
  ["mpreduce", "^(?:((?:\\+|\\-)?\\s*\\d+)\\s*)MP to use Skills$"],
  ["hobo", "^(?:((?:\\+|\\-)?\\s*\\d+)\\s*)Hobo Power$"],
  [
    "rollover",
    "^(?:((?:\\+|\\-)?\\s*\\d+)\\s*)Adventure\\(s\\) per day when equipped\\.?$"
  ],
  [
    "pvp",
    "^(?:((?:\\+|\\-)?\\s*\\d+)\\s*)PvP fight\\(s\\) per day when equipped\\.?$"
  ],
  [
    "items",
    "^(?:((?:\\+|\\-)\\s*\\d+%)\\s*)([\\s\\S]+)\\s*Drops? from " +
      "([\\s\\S]+)( \\(.+\\))?$",
    function () {
      return Strip(arguments[1] + " " + arguments[2] +
        (arguments[3] || " ") + (arguments[3] || "") +
        (arguments[4] || " ") + (arguments[4] || "")
      );
    }
  ],
  [
    "allattributes",
    "^All Attributes(?:\\s+((?:\\+|\\-)\\s*\\d+))$",
    ReturnFirstGroup
  ],
  [
    "allattributespct",
    "^All Attributes(?:\\s+((?:\\+|\\-)\\s*\\d+%))$",
    ReturnFirstGroup
  ],
  ["fam", "^(?:((?:\\+|\\-)\\s*\\d+)\\s*)(?:to )?Familiar Weight$"],
  ["songs", "^Allows you to keep (\\d+) songs in your head instead of 3\\.$"],
  [
    "mpregen", "^Regenerate ([\\d-]*) MP per adventure( \\(.+\\))?$",
    function () {
      return Strip(arguments[1] + " " + (arguments[2] || ""));
    }
  ],
  ["hpregen", "^Regenerate ([\\d-]*) HP per adventure$"],
  ["hpmpregen", "^Regenerate ([\\d-]*) HP and(?: \\1)? MP per adventure$"],
  [
    "stats",
    "^(?:((?:\\+|\\-)?\\s*.+)\\s*)(Muscle|Mysticality|Moxie)?" +
       "\\s*Stat(?:s|\\(s\\)) Per Fight$",
    "$1" + (" $2" || "")
  ],
  ["combatfreq", "^Monsters will be (more|less) attracted to you\\.?$"],
  ["intrinsic", "Intrinsic effect: \\[\\[([\\s\\S]*)\\]\\]"],
  [
    "res",
    "^(Slight|So-So|Serious|Stupendous|Superhuman|Sublime) " +
       "(?:Resistance to (All Elements)|" +
       "(Cold|Hot|Sleaze|Spooky|Stench) Resistance)$",
    function () {
      return arguments[1] + " " + (arguments[2] || arguments[3]);
    }
  ],
  [
    "slimeres",
    "^(Slight|So-So|Serious|Stupendous|Superhuman|Sublime) Slime Resistance$"
  ],
  [
    "elt",
    "^(?:((?:\\+|\\-)?\\s*\\d+)\\s*)\\{\\{element\\|" +
       "(Cold|Hot|Sleaze|Spooky|Stench)\\}\\}$",
    "$1 $2"
  ],
  [
    "eltspell",
    "^(?:((?:\\+|\\-)?\\s*\\d+)\\s*)(?:Damage )?to \\{\\{element\\|" +
       "(Cold|Hot|Sleaze|Spooky|Stench)\\|Spells\\}\\}$",
    "$1 $2"
  ],
  [
    "tunespell",
    "^All Spells Cast Are (Cold|Hot|Sleazy|Spooky|Stinky)$",
    function () {
      switch (arguments[1]) {
        case "Cold": return "Cold";
        case "Hot": return "Hot";
        case "Sleazy": return "Sleaze";
        case "Spooky": return "Spooky";
        case "Stinky": return "Stench";
      }
    }
  ],
  [
    "damagevs",
    "^(?:((?:\\+|\\-)?\\s*\\d+%?)\\s*)(?:Physical\\s*)?Damage (?:vs\\.|against) ([\\s\\S]+)$",
    "$1 $2"
  ],
  [
    "passive",
    "^Deals ([\\d-]*) \\{\\{element\\|(Cold|Hot|Sleaze|Spooky|Stench)\\}\\} " +
       "to attackers$|" +
       "^Deals ([\\d-]*) damage to attackers$|" +
       "^Damages Attacking Opponent\\s*(\\(.+\\))?$",
    function () {
      return
        (arguments[1] && arguments[1] + " " + arguments[2]) ||
        arguments[3] ||
        arguments[4] ||
        "some";
    }
  ],
  [
    "weaken",
    "Successful hit weakens opponent\\.",
  ],
  [
    "dbcombat",
    "(?:((?:\\+|\\-)?\\s*\\d+)\\s*) damage to Disco Bandit Combat Skills"
  ],
  ["diver", "Makes you a better diver"],
  [
    "oncritical",
    "^On Critical: ([\\s\\S]+)$|^([\\s\\S]+) on Critical Hit$|" +
      "^Critical Hits ([\\s\\S]+)$",
    ReturnFirstGroup
  ]
];

//songs has no mech page
//intrinsic has no mech page
//dbcombat has no mech page
MechanicsLinks = [
  [["mus", "muspct", "allattributes", "allattributespct"], "Muscle Modifiers"],
  [
    ["mys", "myspct", "allattributes", "allattributespct"],
    "Mysticality Modifiers"
  ],
  [["mox", "moxpct", "allattributes", "allattributespct"], "Moxie Modifiers"],
  [["hp", "hpmp"], "HP Increasers"],
  [["mp", "hpmp"], "MP Increasers"],
  [["weapon", "weaponpct", "elt", "damagevs"], "Bonus Weapon Damage"],
  [["ranged", "rangedpct"], "Bonus Ranged Damage"],
  [["spell", "spellpct", "eltspell"], "Bonus Spell Damage"],
  [["init"], "Combat Initiative"],
  [["da"], "Damage Absorption"],
  [["dr"], "Damage Reduction"],
  [["fumble"], "Fumble Chance"],
  [["meat"], "Meat from Monsters"],
  [["items"], "Items from Monsters"],
  [["ml", "weaken", "slimehate"], "Monster Level"],
  [["crit"], "Critical Hit Chance"],
  [["mpreduce"], "Skill MP Cost Modifiers"],
  [["hobo"], "Hobo Power"],
  [["rollover"], "Extra Rollover Adventures"],
  [["pvp"], "Extra PvP Fights"],
  [["fam"], "Familiar Weight"],
  [["hpregen", "hpmpregen"], "HP Restorers"],
  [["mpregen", "hpmpregen"], "MP Restorers"],
  [["stats"], "Stat Gains from Fights"],
  [["combatfreq"], "Combat Frequency"],
  [["res"], "Elemental Resistance"],
  [["slimeres"], "Slime Resistance"],
  [["tunespell"], "Elemental Spell Damage"],
  [["passive"], "Passive Damage"],
  [["oncritical"], "Critical Hit"],
  [["diver"], "Underwater adventuring"]
];

// plurals of weapons > 1 instance, for use in categories
var WeaponPlurals = [];
WeaponPlurals["blowgun"] = "blowguns";
WeaponPlurals["rifle"] = "rifles";
WeaponPlurals["yoyo"] = "yoyos";
WeaponPlurals["banjo"] = "banjos";
WeaponPlurals["bow"] = "bows";
WeaponPlurals["horn"] = "horns";
WeaponPlurals["saucepan"] = "saucepans";
WeaponPlurals["whistle"] = "whistles";
WeaponPlurals["accordion"] = "accordions";
WeaponPlurals["boomerang"] = "boomerangs";
WeaponPlurals["flute"] = "flutes";
WeaponPlurals["umbrella"] = "umbrellas";
WeaponPlurals["drum"] = "drums";
WeaponPlurals["guitar"] = "guitars";
WeaponPlurals["pistol"] = "pistols";
WeaponPlurals["axe"] = "axes";
WeaponPlurals["chefstaff"] = "chefstaves";
WeaponPlurals["knife"] = "knives";
WeaponPlurals["spear"] = "spears";
WeaponPlurals["flail"] = "flails";
WeaponPlurals["polearm"] = "polearms";
WeaponPlurals["whip"] = "whips";
WeaponPlurals["utensil"] = "utensils";
WeaponPlurals["crossbow"] = "crossbows";
WeaponPlurals["staff"] = "staves";
WeaponPlurals["club"] = "clubs";
WeaponPlurals["sword"] = "swords";

// style of the replacement text nudge
var NudgeStyle = "font-size:200%; font-weight:bold;";

/******************************************************************************/

// extract descid
function GetDescID() {
  Pat = Compile(
    "http://(?:127\\.0\\.0\\.1\\:600\d+|" +
    "(?:www\\d*\\.kingdomofloathing\\.com))" +
    "/desc_item\\.php\\?whichitem=([\\w\\-]+)"
  );
  Match = Pat.exec(document.location)
  if (Match) {
    return Match[1];
  } else {
    return "";
  }
}

// string repeater
function Repeat(InStr, Freq) {
  var OutStr = "";
  for (var N = 0; N < Freq; N++) {
    OutStr += InStr;
  }
  return OutStr;
}

// count the number of times a substring appears in a string
function Count(InString, SubString) {
  // don't want case insensitivity this time
  var Pat = new RegExp(Escape(SubString), "g");
  var NumMatches = 0;
  var Match;
  var TempString = InString;
  do {
    Match = Pat.exec(TempString);
    NumMatches += (Match != null);
  } while (Match != null);
  return NumMatches;
}

// prettyprint arrays for debugging
function PrintArray(InArr) {
  var OutStr = "";
  if (typeof(InArr) != "number") {
    OutStr += "[";
    for (var N = 0; N < InArr.length; N++) {
      OutStr += PrintArray(InArr[N]);
    }
    OutStr += "]";
  } else {
    OutStr += " " + InArr + " ";
  }
  return OutStr;
}

// strip leading/trailing whitespace
function Strip(InStr) {
  return InStr.replace(/^\s*([\s\S]*?)\s*$/, "$1");
}

// entity converter
function Entity2Unicode(InStr) {
  var Element = document.createElement("textarea");
  Element.innerHTML = InStr;
  return Element.value;
}

// for lazy typists
function Compile(Pat) {
  return new RegExp(Pat, "ig");
}

// escapes special RE characters
function Escape(InString) {
  // it's the backslash plague!
  var Pat = Compile("([.\\\\[\\](){}+\\-*?:!^$,|])");
  return InString.replace(Pat, "\\$1");
}

// find next place in given text where "parens" are matched
function FindBalancePos(InStr, Open, Close) {
  var PatOpen = Compile(Escape(Open));
  var PatClose = Compile(Escape(Close));
  var Pat = Compile("(" + Escape(Open) + ")|(" + Escape(Close) + ")");
  var NumOpen = NumClose = 0;
  var Match, GroupNum, NumOpen,  NumClose;
  do {
    Match = Pat(InStr);
    if (Match[1]) {
      GroupNum = 1;
      NumOpen += 1;
    }
    if (Match[2]) {
      GroupNum = 2;
      NumClose += 1;
    }
    if (NumOpen == NumClose) {
      return Pat.lastIndex;
    }
  } while (Match != null);
}

// function to combine string indices to determine how much has been parsed
// e.g., using slice-style notation, if [[1, 5], [10, 12], [15, 19]] of a
// string has been "used" and the next parsing operation uses [11, 14],
// this function returns the combined range [[1, 5], [10, 14], [15, 19]]
function CombineRanges(Old, Add) {
  if (Old.length == 0) {
    return [Add];
  } else {
    var OutList = new Array;
    var Existing, First, Pos, Current, TempRange;
    // find first existing range that comes after the add
    for (var N = 0; N < Old.length; N++) {
      Existing = Old[N];
      if (Add[0] <= Existing[1]) {
        First = N;
        break;
      }
      if (N == Old.length - 1) {
        First = Old.length;
      }
    }
    // ranges before this one do not overlap; output
    if (First != 0) {OutList = OutList.concat(Old.slice(0, First));}
    TempRange = [Add[0], Add[1]];
    if (First == Old.length) {
      // the add is past all existing ranges
      OutList.push(TempRange);
    } else {
      // the difficult case: the add is between extremes, and possibly
      // overlaps existing ranges
      Pos = First;
      while (Pos < Old.length) {
        Current = Old[Pos];
        if (
          (Current[0] <= TempRange[0] && TempRange[0] <= Current[1]) ||
          (Current[0] <= TempRange[1] && TempRange[1] <= Current[1]) ||
          (TempRange[0] <= Current[0] && Current[0] <= TempRange[1]) ||
          (TempRange[0] <= Current[1] && Current[0] <= TempRange[1])
        ) {
          // condense add with current if overlapped
          TempRange = [
            Math.min(TempRange[0], Current[0]),
            Math.max(TempRange[1], Current[1])
          ];
          // output if last in loop
          if (Pos == Old.length - 1) {
            OutList.push(TempRange);
          }
        } else {
          // not overlapped, so append and quit loop
          OutList.push(TempRange);
          break;
        }
        Pos += 1;
      }
      // tack on rest of list
      if (Pos <= Old.length) {
        for (var N = Pos; N < Old.length; N++) {
          OutList.push(Old[N])
        }
      }
    }
  }
  return OutList;
}

// calculate what parts of a string remain unparsed by flipping the parsed bits
// R is a list of 2-long lists, which are the slice delimiters of the parsed
// areas; Length is the total length of the input text
// returns a list of 2-long lists
function ComplementRange(R, Length) {
  if (R.length == 0) {
    return [[0, Length]];
  } else {
    var OutList = new Array;
    var Current = new Array;
    var Next = new Array;
    for (var Pos = 0; Pos < R.length; Pos++) {
      // check if first range starts at first character
      if (Pos == 0 && R[0][0] > 0) {
        OutList.push([0, R[0][0]]);
      }
      Current = R[Pos];
      if (Pos == R.length - 1) {
        // last range--output from end if applicable
        if (Current[1] < Length) {
          OutList.push([Current[1], Length]);
        }
      } else {
        // there is a next range--compute the unused space between
        Next = R[Pos + 1];
        OutList.push([Current[1], Next[0]]);
      }
    }
  }
  return OutList;
}

// function that returns a list with two components
// the second list component is a list of strings from the input text that
// weren't parsed
// the first is a dictionary of parsed fields from the HTML source
// call:
// *InText is the HTML source.
// *Fields is a list of lists instructing how each field is extracted from the
//  source.
// **The first component of each inner list is the field's name (text); the
//   output dictionary uses this as a key.
// **The second is a RE, possibly with groups, identifying how to extract
//   from the HTML.
// ***If it has groups, it will return the first group as the key value on
//    a match as a default; if it has no groups, it returns "1" on a match; on
//    a non-match, it returns a blank string. The defaults can be overridden
//    by the third component.
// **The third list component is optional, to override the default extraction
//   of field values. It performs RE replacement according to the RE pattern
//   (input previously) and the substitution string/function (the third list
//   component).
// e.g., Fields could be:
// [
//   [
//     "req",
//     "<br>(Muscle|Mysticality|Moxie) Required: <b>(\\d+?)</b>",
//     "$1 $2"
//   ],
//   [
//     "class",
//     "<p><font color=blue><b>Only "
//       "(Seal Clubbers|Turtle Tamers|Pastamancers|"
//       "Saucerors|Disco Bandits|Accordion Thieves) "
//       "may use this item.</b></font>",
//     Y // where Y is some function that takes a match object as input
//   ]
// ]
// *SingleParse is true/false, indicating whether the parser should stop once
//  the first pattern matches. Used for parsing enchantments one at a time;
//  no need to try every pattern once a match is found.
function Parser(InText, Fields, SingleParse) {
  if (SingleParse == null) {SingleParse = true;}
  var Item = [];
  var Parsed = new Array(0);
  var Unparsed, UnparsedStrings, SubStr;
  var Field, Pat, Match, Name, Extract;
  for (var N = 0; N < Fields.length; N++) {
    Field = Fields[N];
    Pat = Compile(Field[1]);
    Match = Pat.exec(InText);
    Name = Field[0];
    if (Field.length > 2) {
      Extract = Field[2];
    } else {
      // default is 1 or group 1
      if (Match != null && Match.length > 1) {
        Extract = "$1";
      } else {
        Extract = "1";
      }
    }
    if (Match) {
      Parsed = CombineRanges(Parsed, [Match.index, Pat.lastIndex]);
      Item[Name] = Strip(Match[0].replace(Pat, Extract));
    } else {
      if (! SingleParse) {Item[Name] = "";}
    }
    if (Match && SingleParse) {break;}
  }
  // done parsing requested fields; see which bits of the input weren't parsed
  Unparsed = ComplementRange(Parsed, InText.length);
  // can safely strip out remaning HTML tags and leading/trailing spaces
  PatTag = Compile("<(?!\!--)/?[\\s\\S]+?>");
  UnparsedStrings = [];
  for (N = 0; N < Unparsed.length; N++) {
    SubStr = Unparsed[N];
    TempStr = Strip(InText.slice(SubStr[0], SubStr[1]).replace(PatTag, ""));
    if (TempStr != "") {
      UnparsedStrings.push(TempStr);
    }
  }
  return [Item, UnparsedStrings];
}

// clean desc field
function CleanDescKoL(Body) {
  // save to retain comments
  Body = Strip(Body);
  var OrigBody = Body;
  PatPlan = Compile(
    "This detailed set of plans will teach you how to smith a fancy new " +
      "item:\n" +
      "<p><center><table style='border: 1px solid black;' cellpadding=5>" +
      "<tr><td align=center><img style='vertical-align: middle' " +
      "class=hand src='http://images\.kingdomofloathing\.com/itemimages/" +
      ".+?\.gif' onclick='descitem\(.+?\)'><br><b>" +
      "(.+?)</b></td></tr></table>"
  )
  Body = Body.replace(PatPlan, "{{plans|$1}}");
  Body = Body.replace(/\s+/ig, " "); // multispace -> space
  Body = Body.replace(/\s*<\s*br\s*\/?>\s*/ig, "<br />"); // standard <br />
  Body = Body.replace(/\s*<\/p>\s*/ig, ""); // strip closing </p>
  Body = Body.replace(/(<\/?)super>/ig, "$1sup>"); // <super> -> <sup>
  // small fonts: these can be nested, but none so far, so let's ignore it...
  Body = Body.
    replace(
      /<font size\s*=\s*\"?1\"?>([\s\S]*?)<\/font>/ig,
      "<small>$1</small>"
    );
  // handle whitespace/tag weirdness
  var PatOpen = Compile("(<(?!/)[^>]*?>)\\s+");
  var PatClose = Compile("\\s+(</[^>]*?>)");
  var Temp;
  while (true) {
    Temp = Body.replace(PatOpen, " $1");
    Temp = Temp.replace(PatClose, "$1 ");
    if (Temp == Body) {break;}
    Body = Temp;
  }
  // swap order of open/close <i/b> with <br />s
  var PatIB = Compile("(.*?)(<(?:b|i)>)(<br />)(.*?)");
  var PatIB2 = Compile("(.*?)(<br />)(</(?:b|i)>)(.*?)");
  while (true) {
    Temp = Body;
    Body = Body.replace(PatIB, "$1$3$2$4");
    Body = Body.replace(PatIB2, "$1$3$2$4");
    if (Temp == Body) {break;}
  }
  Body = Body.replace(/<br \/>\s*<p>/ig, "<p>"); // break-p renders to p
  Body = Body.replace(/(\s*<p>\s*){1,}/ig, "<p>"); // multiple p to single
  Body = Body.replace(/\s*<p>\s*/ig, "<br /><br />"); // <p> -> two breaks
  // break-comment -> comment-break
  PatBreakComment = Compile("(<br />)\\s*(<!--[\\s\\S]*?-->)");
  while (true) {
    Temp = Body;
    Body = Body.replace(PatBreakComment, "$2$1");
    if (Temp == Body) {break;}
  }
  // strip breaks from beginning/end
  while (true) {
    Temp = Body;
    Body = Body.replace(/^<br \/>|<br \/>$/ig, "");
    if (Temp == Body) {break;}
  }
  // collapse multiple <br />s into linebreaks
  Body = Body.replace(
    /((?:<br \/>){2,})/ig,
    function Break2Newline() {
      var Breaks = arguments[1].length / 6;
      return Repeat("\n", Breaks);
    }
  );
  Body = Body.replace(/<br \/>/ig, "<br />\n");
  Body = Body.replace(/ *\n */ig, "\n");
  // balance <i/b/small> for breaks
  var NewBody = "";
  var NumI = 0;
  var NumB = 0;
  var NumS = 0;
  var Line;
  var Lines = Body.split("\n");
  var PatNowiki = /^([\[\]*#;:{}])(.*)/i;
  for (var N = 0; N < Lines.length; N++) {
    Line = Lines[N];
    if ((NumB || NumI || NumS) && Line != "") {
      Line = Repeat("<b>", NumB) + Repeat("<i>", NumI) +
        Repeat("<small>", NumS) + Line
      NumI = NumB = NumS = 0
    }
    var TagArray = ["i", "b", "small"];
    var TagOpen, TagClose;
    for (var M = 0; M < TagArray.length; M++) {
      Tag = TagArray[M];
      TagOpen = "<" + Tag + ">";
      TagClose = "</" + Tag + ">";
      if (Count(Line, TagOpen) > Count(Line, TagClose)) {
        BR = (Line.lastIndexOf("<br />") == Line.length - 6)
        Line = Line.slice(0, -6 * BR) + TagClose + Repeat("<br />", BR);
        NumB += (Tag == "b");
        NumI += (Tag == "i");
        NumS += (Tag == "small");
      }
    }
    Line = Line.replace(PatNowiki, "<nowiki>$1</nowiki>$2");
    NewBody += Line + "\n";
  }
  Body = Strip(NewBody);
  // swap syntax
  Body = Body.replace(/<\/?b>/ig, "'''");
  Body = Body.replace(/<\/?i>/ig, "''");
  // reset comments
  var PatComment = Compile("(<!--[\\s\\S]*?-->)")
  var PatComment2 = Compile("(\\n*<!--[\\s\\S]*?-->)")
  var NewBody = "";
  var Prev = 0;
  var New, Orig;
  do {
    Match = PatComment.exec(Body);
    Orig = PatComment2.exec(OrigBody);
    if (Match) {
      NewBody += Body.slice(Prev, Match.index) + Orig[1];
      Prev = Match.index + Match[0].length;
    }
  } while (Match != null);
  Body = NewBody + Body.slice(Prev);
  return Body;
}

// clean up enchantment text for {{item}}
// this is not a complete enchantment parser
function StandardiseEnchantmentText(InText) {
  if (! InText) {
    return InText;
  } else {
    var CleanedList = [], Parsed;
    // process each line separately
    Enchantments = InText.split("<br>");
    for (var N = 0; N < Enchantments.length; N++) {
      Enchantment = Enchantments[N];
      var Parsed = Parser(Enchantment, PatsEnchantmentClean);
      if (Parsed[1].length) {
        // if unparsed components, just use the text as-is
        CleanedList.push(Parsed[1][0]);
      } else {
        var Executed = false;
        for (var Key in Parsed[0]) { // should be only one
          Executed = true;
          if (Parsed[0][Key]) {CleanedList.push(Parsed[0][Key]);}
        }
        if (! Executed) {CleanedList.push("");}
      }
    }
    return CleanedList.join("<br />");
  }
}

// parse enchantments into types so we know what See Also links are needed
// not everything is caught, as there are many exceptional cases
function ParseEnchantment(Item) {
  var Enchantments = Item["enchantment"];
  if (Enchantments == "") {
    return null;
  } else {
    var PatParen = Compile("^\\([^()]+\\)$");
    Enchantments = Enchantments.split("<br />");
    // remove previous blank entries if not parenthetical
    // have to handle N manually, as array is being edited
/*
    for (var N = 0; N < Enchantments.length;) {
      if (Enchantments[N] == "") {
        Enchantments.splice(N, 1);
      } else {
        N += 1;
      }
    }
*/
    var EnchantmentDict = [];
    // if next is parenthetical, append to previous
    var NewEnchantments = [];
    var Total = Enchantments.length;
    var Used = false;
    while (Enchantments.length != 0) {
      if (Enchantments.length == 1) {
        NewEnchantments.push(Enchantments[0]);
        Enchantments.splice(0, 1);
      } else {
        if (PatParen.exec(Enchantments[1])) {
          NewEnchantments.push(Enchantments[0] + " " + Enchantments[1]);
          Enchantments.splice(0, 2);
        } else {
          NewEnchantments.push(Enchantments[0]);
          Enchantments.splice(0, 1);
        }
      }
    }
    // parsing
    var Unparsed = [];
    for (var N = 0; N < NewEnchantments.length; N++) {
      Enchantment = NewEnchantments[N];
      Parsed = Parser(Enchantment, PatsEnchantmentParse);
      if (Parsed[1].length) {
        Unparsed.push(Parsed[1][0]);
      } else {
        for (var Key in Parsed[0]) { // should be only one
          if (Key in EnchantmentDict) {
            EnchantmentDict[Key].push(Parsed[0][Key]);
          } else {
            EnchantmentDict[Key] = [Parsed[0][Key]];
          }
          // no way of knowing intrinsic's/On Crit's enchantment
          if ("intrinsic" in Parsed[0] || "oncritical" in Parsed[0]) {
            Unparsed.push(Parsed[0][Key]);
          }
        }
      }
    }
    return [EnchantmentDict, Unparsed];
  }
}

// clean up parser output
function GeneralCleanupKoL(Item) {
  // switch in haiku format if applicable
  if (Item["haiku"]) {
    Item["name"] = Item["haikuname"];
    Item["desc"] = Item["haikudesc"];
    delete(Item["haikuname"]);
    delete(Item["haikudesc"]);
  }
  Item["desc"] = CleanDescKoL(Item["desc"]);
  Item["enchantment"] = StandardiseEnchantmentText(Item["enchantment"]);
  Item["parsedenchantment"] = ParseEnchantment(Item);
  // suppressed level requirements
  if (! Item["level"]) {
    var Type = Item["type"];
    if (Type == "food" || Type == "beverage" || Type == "booze") {
      Item["level"] = "1";
    }
  }
  // weapon types and subtypes
  var PatWeapon = Compile("^(ranged )?weapon \\((\\d)-handed (.*)\\)$");
  var Weapon = PatWeapon.exec(Item["type"]);
  Item["weapon"] = Repeat("1", (Weapon != null));
  Item["weaponrange"] = ((Weapon && Weapon[1] && String(Weapon[1])) || "");
  Item["weaponhands"] = ((Weapon && String(Weapon[2])) || "");
  var WeaponType = ((Weapon && String(Weapon[3])) || "");
  Item["weapontype"] = WeaponType;
  if (Weapon && ! Item["weaponrange"]) {
    if (
      WeaponType == "saucepan" || WeaponType == "utensil" ||
      WeaponType == "chefstaff" || Item["stat"] == "Mysticality"
    ) {
      Item["weaponrange"] = "mysticality";
    } else {
      Item["weaponrange"] = "melee";
    }
  }
}

// convert parsed item into a Wiki article
// <GM_ItemParser_Nudge></GM_ItemParser_Nudge> surround text
// which is to be formatted specially to remind users not to blindly
// copy & paste
function ConvertItem(
  Item, ItemID, Desc, IotM, NeedsContent, NeedsSpading, Recipe
) {
  // helper to make looping through consecutive {{item}} parameters
  // less painful to read
  function ListLooper(InArr) {
    var X;
    for (N = 0; N < InArr.length; N++) {
      X = InArr[N];
      if (Item[X]) {OutStr += "|\n" + X + "=" + Item[X];}
    }
  }

  var OutStr = "";
  var ItemType = Item["type"];
  var Usable = (ItemType.indexOf("usable") > -1);
  var Potion = (ItemType == "potion");
  var Combat = Boolean(ItemType.indexOf("combat") > -1 || Item["alsocombat"]);
  var Familiar = (ItemType == "familiar");
  var Food = (ItemType == "food" || ItemType == "beverage");
  var Booze = (ItemType == "booze");
  var Spleen = Boolean(Usable && Item["level"] && ! Item["class"]);

  // calculate a range of dates to automatically input Mr. Store dates
  var DateVar = new Date();
  var Year = DateVar.getUTCFullYear();
  var Month = DateVar.getUTCMonth();
  var Day = DateVar.getUTCDate();
  if (Day >= 20) {
    Month = (Month + 1) % 12;
    Year += (Month == 0);
  }
  Year = Year.toString();
  Month = Month.toString();
  Month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ][Month];
  var DateString = Month + " " + Year;
  if (ItemID == null) {ItemID = "";}
  if (Desc == null) {Desc = "";}

  if (NeedsContent) {
    OutStr +=
      "{{NeedsContent|<GM_ItemParser_Nudge>wut content</GM_ItemParser_Nudge>}}";
      "</GM_ItemParser_Nudge>}}";
  }
  if (NeedsSpading) {
    if (OutStr != "") {OutStr += "\n";}
    OutStr +=
      "{{NeedsSpading|<GM_ItemParser_Nudge>spade pls</GM_ItemParser_Nudge>}}";
  }
  // {{item}}
  if (OutStr != "") {OutStr += "\n";}
  OutStr += "{{item|\nitemid=" + ItemID + "|\ndescid=" + Desc;
  ListLooper([
    "desc", "paste", "smith", "cocktail", "cook", "jewelry",
    "type", "power", "powertype"
  ]);
  if (Item["stat"] || Item["statreq"]) {
    OutStr +=
      "|\nstat=" + Item["stat"] + "|\nstatreq=" + Item["statreq"];
  }
  ListLooper(["level", "alsocombat", "outfit"]);
  if (Item["nodiscard"]) {OutStr += "|\nautosell=0";}
  ListLooper(["autosell", "cost", "notrade", "gift", "quest", "enchantment"]);
  ListLooper([
    "critical", "nohardcore", "mpreduce", "limit", "hagnk", "class",
    "enchclass", "spelltype", "grantskill", "lounge", "bluenote", "haiku"
  ]);
  OutStr += "}}";
  // other standard sections
  if (Recipe) {
    OutStr += "\n\n==Recipe==";
    OutStr += "<GM_ItemParser_Nudge>\ntailor to suit</GM_ItemParser_Nudge>" +
      "\n{| class=\"recipe\"" +
      "\n|- class=\"row1\"" +
      "\n! {{cocktail}} {{combine}} {{cook}} {{jewelry}} {{smith}} " +
      "{{Grimacite smith}} {{advcocktail}} {{SalCocktail}} {{armorcraft}} " +
      "{{expensivejewelry}} {{improve}} {{kick}} {{pasta}} {{sauce}} " +
      "{{shcocktail}} {{supersmith}} {{WayofSauce}} {{deepsaucery}} " +
      "{{tempura}} {{add}} {{multiuse}} {{pixel}} {{spore}} {{starcombo}} " +
      "{{staffcrafting}} {{supertinker}} {{untinker}} {{weave}}" +
      "\n| [[ingredient 1]]" +
      "\n| [[ingredient 2]]" +
      "\n|- class=\"row2\"" +
      "\n! {{equals}}" +
      "\n| colspan=\"2\" | [[product]]" +
      "\n|}"
  } else { if (IotM) {
    OutStr += "\n\n==Obtained From==\n;Stores\n:[[Mr. Store]] " +
      "(<GM_ItemParser_Nudge>1 [[Mr. Accessory]]</GM_ItemParser_Nudge>)";
  } else {
    OutStr += "\n\n==Obtained From==" +
      "<GM_ItemParser_Nudge>" +
      "\n;[[Location]]\n:[[Monster]]\n:''[[Non-Combat]]''" +
      "\n;Items\n:[[Item]] (0-1) (''sometimes'')" +
      "\n;Stores\n:[[Store]] (0 Meat)" +
      "</GM_ItemParser_Nudge>";
  }}
  if (Potion || Usable || Combat || Familiar || Food || Booze || Spleen) {
    if (Food || Booze || Spleen) {
      if (Spleen) {
        OutStr += "\n\n==When Used==";
      } else {
        OutStr += "\n\n==When Consumed==";
      }
      OutStr += "\n{{useitem|\ntext=<GM_ItemParser_Nudge>?" +
        "</GM_ItemParser_Nudge>";
      OutStr += "|\nadv=|\nmus=gain |\nmys=gain |\nmox=gain |";
      OutStr += "\n<GM_ItemParser_Nudge>posteffect={{acquireEffect|effect=?|" +
        "duration=?}}|</GM_ItemParser_Nudge>\ntype=";
      if (Food) {OutStr += "food";}
      if (Booze) {OutStr += "booze";}
      if (Spleen) {OutStr += "spleen";}
      OutStr += "|\nlimiter=<GM_ItemParser_Nudge>?</GM_ItemParser_Nudge>" +
        "<!-- when the limiter is found, the " +
        "value in the category tag needs to be filled out too -->}}";
    }
    if (Potion || (! Spleen && Usable) || Combat || Familiar) {
      OutStr += "\n\n==When Used==";
      var MultiUses = ((Usable + Potion + Combat + Familiar) > 1);
      if (Familiar) {
        OutStr += Repeat("\n*''From inventory:''", MultiUses) +
          "\n{{useitem|\ntext=<GM_ItemParser_Nudge>?</GM_ItemParser_Nudge>" +
          "|\ntype=familiar}}";
      }
      if (Combat) {
        OutStr += Repeat("\n*''In combat:''", MultiUses) +
          "\n{{useitem|\ntext=<GM_ItemParser_Nudge>?</GM_ItemParser_Nudge>" +
          "|\ntype=combat}}";
      }
      if (Usable || Potion) {
        OutStr += Repeat("\n*''From inventory:''", MultiUses) +
          "\n{{useitem|\ntext=<GM_ItemParser_Nudge>?" +
          "|\neffect={{acquireEffect|effect=?|duration=?}}" +
          "</GM_ItemParser_Nudge>}}";
      }
    }
  }
  if (
    Item["paste"] || Item["smith"] ||
    Item["cook"] || Item["cocktail"] || Item["jewelry"]
  ) {
    OutStr += "\n\n==Uses==\n*[[]]";
  }
  var Notes = false;
  if (Item["type"] == "familiar") {
    OutStr += "\n\n==Notes==\n*Becomes a [[<GM_ItemParser_Nudge>" +
      "Some Familiar</GM_ItemParser_Nudge>]].";
    Notes = true;
  }
  if (IotM) {
    if (! Notes) {OutStr += "\n\n==Notes==";}
    OutStr += "\n*" + DateString + "'s " +
      "special of the month from [[Mr. Store]]." +
      "\n*Its [[Mr. Store]] description was:" +
      "\n*:<GM_ItemParser_Nudge>Description</GM_ItemParser_Nudge>"
  }
  // See Also
  ParsedEnchantments = Item["parsedenchantment"];
  if (ParsedEnchantments) {
    ParsedEnchantments = ParsedEnchantments[0];
    // clumsy, but it works
    var HasEnchantments = false;
    for (var Props in ParsedEnchantments) {
      HasEnchantments = true; break;
    }
    if (HasEnchantments) {
      OutStr += "\n\n==See Also==";
      for (var N = 0; N < MechanicsLinks.length; N++) {
        for (var M = 0; M < MechanicsLinks[N][0].length; M++) {
          if (
            MechanicsLinks[N][0][M] in ParsedEnchantments ||
            ( // handle shields specially
              MechanicsLinks[N][0][M] == "dr" &&
              ItemType == "off-hand item (shield)" &&
              Item["power"] && Item["powertype"] == "Damage Reduction"
            )
          ) {
            OutStr += "\n*[[" + MechanicsLinks[N][1] + "]]";
            break;
          }
        }
      }
      if ("elt" in ParsedEnchantments) {
        var Prismatic = true;
        var Elements = ["Cold", "Hot", "Sleaze", "Spooky", "Stench"];
        for (var N = 0; N < Elements.length; N++) {
          var Element = Elements[N];
          var PatElt = Compile("\\b" + Element + "\\b");
          var Matched = [];
          for (var M = 0; M <= ParsedEnchantments["elt"].length; M++) {
            if (PatElt.test(ParsedEnchantments["elt"])) {
              Matched.push(1); break;
            }
          }
          if (! Matched.length) {
            Prismatic = false;
            break;
          }
        }
        if (Prismatic) {OutStr += "\n*[[Prismatic Damage]]";}
      }
    }
  }
  // collection/category
  if (! Item["quest"]) {
    OutStr += "\n\n==Collection==\n<collection>" + ItemID + "</collection>";
  }
  if (IotM) {
    OutStr +=
      "\n\n{{iotm|duration=" + "<GM_ItemParser_Nudge>" + DateString +
      "</GM_ItemParser_Nudge>|before=<GM_ItemParser_Nudge>" +
      "sum nub 4got 2 update dis txt lol</GM_ItemParser_Nudge>|after=}}"
  }
  if (Food) {
    OutStr +=
      "\n\n[[Category:Food (By Fullness)|?, " +
      Item["name"].toLowerCase() + "]]";
  }
  if (Booze) {
    OutStr +=
      "\n\n[[Category:Booze (By Drunkenness)|?, " +
      Item["name"].toLowerCase() + "]]";
  }
  if (Spleen) {
    OutStr += "\n\n[[Category:Spleentacular Items (By Spleen Damage)|?, " +
      Item["name"].toLowerCase() + "]]";
  }
  if (Item["weapon"]) {
    var RangeType = Item["weaponrange"];
    RangeType =
      RangeType.slice(0, 1).toUpperCase() + RangeType.slice(1) + " Weapons";
    OutStr += "\n\n[[Category:" + RangeType + "]]";
    OutStr += "\n[[Category:" + Item["weaponhands"] + "-Handed Weapons]]";
    var OtherType;
    try {
      OtherType = WeaponPlurals[Item["weapontype"]];
      OtherType = OtherType.slice(0, 1).toUpperCase() + OtherType.slice(1);
    }
    catch (Exception) {
      OtherType = "Other Weapons";
    }
    OutStr += "\n[[Category:" + OtherType + "]]";
  }
  return OutStr;
}

/******************************************************************************/

// convert text to be displayed in a web browser
function Text2Web(InStr) {
  return InStr.replace(/</ig, "&lt;").replace(/>/ig, "&gt;")
    .replace(/\n/ig, "<br />")
}

// user interface helper
function CreateOption(Parent, Name, Type, Label, OtherAttributes) {
  var PatEvent = /^on[\w]*$/i;
  if (Parent.innerHTML != "") {
    Parent.appendChild(document.createElement("br"));
  }
  var NewNode = document.createElement("span");
  var NewOption = document.createElement("input");
  NewOption.setAttribute("type", Type);
  NewOption.setAttribute("name", Name);
  if (OtherAttributes) {
    var CurrAttr;
    for (var N = 0; N < OtherAttributes.length; N++) {
      CurrAttr = OtherAttributes[N];
      if (PatEvent.test(CurrAttr[0])) {
        NewOption.addEventListener(
          CurrAttr[0].slice(2).toLowerCase(), CurrAttr[1], true
        );
      } else {
        NewOption.setAttribute(CurrAttr[0], CurrAttr[1]);
      }
    }
  }
  NewNode.appendChild(NewOption);
  NewNode.appendChild(document.createTextNode(" " + Label));
  Parent.appendChild(NewNode);
}

// parse item from pop-up/user options and return a string to display
// for copy-paste
// Doc is the document node of the window being parsed (either the
// original pop-up or the replicated tab); the rest are the user checkboxes
function Item2String(Doc, ItemID, IotM, NeedsContent, NeedsSpading, Recipe) {
  var Desc = Doc.getElementById("description");
  var DescID = Desc.getAttribute("GM_ItemParser_DescID");
  PageText = Entity2Unicode(
    document.getElementById("description").innerHTML.replace(/<\/p>/ig, "").
      replace(/&nbsp;/ig, " ")
  ).replace(/<script[^>]*?>[\s\S]+?<\/script>/ig, "");
  var Item = Parser(PageText, PatsKoL, false);
  GeneralCleanupKoL(Item[0]);
  var OutString = ConvertItem(
    Item[0], ItemID, DescID, IotM, NeedsContent, NeedsSpading, Recipe
  );

  // convert tags to display as text; style nudge notes
  OutString =
    Text2Web(OutString).replace(/&lt;(\/?GM_ItemParser_Nudge)&gt;/ig, "<$1>");
  OutString =
    "<span style=\"font-family:Courier New;\">" + OutString.replace(
      /<GM_ItemParser_Nudge>/ig,
      "<span style=\"" + NudgeStyle + "\">"
    ).replace(/<\/GM_ItemParser_Nudge>/ig, "</span>") + "</span>";
  // print unparsed bits
  var EnchantmentArray = Item[0]["parsedenchantment"];
  if (EnchantmentArray && EnchantmentArray[1].length) {
    var UnparsedString = "<span style=\"color:red\">" +
      "Unparsed strings in enchantment (See Also " +
      "may need manual links):<ul>";
    for (var N = 0; N < EnchantmentArray[1].length; N++) {
      UnparsedString += "<li>" + Text2Web(EnchantmentArray[1][N]) + "</li>";
    }
    UnparsedString += "</ul><hr /></span>";
    OutString = UnparsedString + OutString;
  }
  if (Item[1].length) {
    var UnparsedString = "<span style=\"color:red\">" +
      "Unparsed portions of pop-up:<ul>";
    for (var N = 0; N < Item[1].length; N++) {
      UnparsedString += "<li>" + Text2Web(Item[1][N]) + "</li>";
    }
    UnparsedString += "</ul><hr /></span>";
    OutString = UnparsedString + OutString;
  }
  if ("image" in Item[0]) {
    var PatImage = /^([\s\S]*)\/([^/]*\.gif)$/i;
    var KoLImage = Item[0]["image"].replace(
      PatImage,
      "<span style=\"font-family:Courier New;\">" +
        "{{kolimage|$1|$2<span style=\"" + NudgeStyle + "\">" +
        "|renamed=1</span>}}</span>"
    )
    OutString = "<hr />Image copyright code:<br />" + KoLImage +
      "<br /><hr />" + OutString;
  }
  return OutString;
}

// refresh output on checkbox click
function RefreshOutput(Event) {
  // haxx0r document node of new tab
  var Doc;
  if (Event) {
    var Curr = Event.target, Prev = Event.target;
    while (true) {
      Curr = Curr.parentNode;
      if (Curr == null) {
        Doc = Prev; break;
      } else {
        Prev = Curr;
      }
    }
  } else {
    Doc = document;
  }
  var Form = Doc.forms.namedItem("GM_ItemParser_Options");
  var Input, ItemID, IotM, NeedsSpading, NeedsContent, Recipe
  if (Form) {
    Input = Form.elements.namedItem("GM_ItemParser_ID");
    ItemID = Input.value;
    ItemID = Strip(ItemID.replace(/[^\d\-]/ig, ""));
    Input = Form.elements.namedItem("GM_ItemParser_IotM");
    IotM = Input.checked;
    Input = Form.elements.namedItem("GM_ItemParser_NeedsContent");
    NeedsContent = Input.checked;
    Input = Form.elements.namedItem("GM_ItemParser_NeedsSpading");
    NeedsSpading = Input.checked;
    Input = Form.elements.namedItem("GM_ItemParser_Recipe");
    Recipe = Input.checked;
  } else {
    ItemID = ""; IotM = false; NeedsSpading = false; NeedsContent = false;
    Recipe = false;
  }
  var Output = Doc.getElementById("GM_ItemParser_Output");
  Output.innerHTML =
    Item2String(Doc, ItemID, IotM, NeedsContent, NeedsSpading, Recipe);
}

// replicate pop-up in tab/window with scrollbars enabled on button press
function Main() {
  var Window;
  // have to act differently depending on whether browser window has scrollbars
  // if no scrollbars (default FF interface), the pop-up can't have scrollbars
  // added, so copy data into a new window with scrollbars enabled
  // if scrollbars (e.g., Tab Mix Plus), just put everything onto the
  // pop-up itself
  var Node = document.getElementById("description");
  Node.setAttribute("GM_ItemParser_DescID", GetDescID());
  if (! window.scrollbars.visible) {
    var OrigSource = document.body.innerHTML;
    Window = window.open(
      "", "GM_ItemParser_Window", "width = 640, height = 480, scrollbars = yes"
    );
    Window.document.body.innerHTML = OrigSource;
    Node = Window.document.getElementById("GM_ItemParser_Activator");
    Node.parentNode.removeChild(Node);
  } else {
    Window = window;
  }

  // add more options to page
  Window.document.body.appendChild(document.createElement("hr"));
  var Options = document.createElement("form");
  Options.setAttribute("name", "GM_ItemParser_Options");
  Options.setAttribute(
    "style",
    "float:left; border-style:solid; border-width:1px; " +
      "margin-right:20px; padding:5px"
  );
  CreateOption(
    Options, "GM_ItemParser_IotM", "checkbox", "IotM",
    [["onClick", RefreshOutput]]
  );
  CreateOption(
    Options, "GM_ItemParser_NeedsContent", "checkbox", "NeedsContent",
    [["onClick", RefreshOutput]]
  );
  CreateOption(
    Options, "GM_ItemParser_NeedsSpading", "checkbox", "NeedsSpading",
    [["onClick", RefreshOutput]]
  );
  CreateOption(
    Options, "GM_ItemParser_Recipe", "checkbox", "Recipe",
    [["onClick", RefreshOutput]]
  );
  CreateOption(
    Options, "GM_ItemParser_ID", "text", "ItemID",
    [["size", "6"], ["onChange", RefreshOutput]]
  );
  Window.document.body.appendChild(Options);

  var Instructions = document.createElement("div");
  Instructions.setAttribute("id", "GM_ItemParser_Instructions");
  Instructions.setAttribute("style", "display:inline");
  Instructions.innerHTML =
    "<h2>Instructions</h2>" +
    "<p>Copy the item name under the image above. Paste that into the " +
    "KoLWiki's search box. If the article already exists, ur2slow :( " +
    "It may be necessary to disambiguate with parentheses (e.g., " +
    "<a href=\"http://kol.coldfront.net/thekolwiki/index.php/" +
    "Golden_ring_(item)\">golden ring</a>).</p>" +
    "<table><tr><td><ul><li>Check IotM to preload IotM skeleton</li>" +
    "<li>Check NeedsContent/Spading to preload tag</li>" +
    "<li>Check Recipe to preload a recipe template</li>" +
    "<li>Find the ItemID and input into the textbox " +
    "(<a href=\"http://kol.coldfront.net/thekolwiki/index.php/" +
    "Items_by_number\">how?</a>)</li>" +
    "<li>Copy and paste the output into the Wiki edit box</li>" +
    "<li>Anything in <span style=\"" + NudgeStyle + "\">this irritating " +
    "text style</span> will need to be edited, but " +
    "<b>preview everything</b> to make sure nothing went wrong</li>" +
    "<li>If this is a spleen item with no displayed level requirement, " +
    "\"level=1|\" will need to be added to the template</li>"
    "<li><a href=\"http://kol.coldfront.net/thekolwiki/index.php/" +
    "Special:Upload\">Upload</a> the image and put the copyright code " +
    "in the summary box (remove \"|renamed=1\" for images uploaded " +
    "with their original names)</li>" +
    "<li>Create item metadata by clicking on the right-floating link on the " +
    "item page and following the text hints</li></ul></td></tr></table><hr />"
  ;
  Window.document.body.appendChild(Instructions);
  var Output = document.createElement("div");
  Output.setAttribute("id", "GM_ItemParser_Output");
  Output.innerHTML = Item2String(document);
  Instructions.appendChild(Output);

  // asynch request should be done now; note if new version is available
  var WebVer = parseFloat(GM_getValue("WebVersion", "Error"));
  if (! isNaN(WebVer) && WebVer > CurrentVersion) {
    var NewElement = document.createElement('p');
    NewElement.setAttribute("style", "text-align: center");
    NewElement.style.fontSize = "small";
    NewElement.innerHTML =
      "New KoL Wiki Helper version " + WebVer + " available: " +
      "<a href=\"" + ScriptURL + "\">" + ScriptURL + "</a><hr />";
    document.body.insertBefore(NewElement, document.body.firstChild);
  }
}

/******************************************************************************/

// autoupdate code "adapted" from antimarty's fortune cookie script,
// in turn "adapted" from someone else's script
// such banditry
function GM_get(Target, Callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: Target,
    onload: function(Details) {
      if (typeof Callback == "function") {Callback(Details.responseText);}
    }
  });
}

// Check version number of script on the web
function CheckScriptVersion(Data) {
  // Preemptively set error, in case request fails...
  GM_setValue("WebVersion", "Error")
  var M = Data.match(
    /<p>Current Version: (\d+\.\d+)/i
  );
  if (M) {GM_setValue("WebVersion", M[1]);}
}

var Today = new Date();
var Year = String(Today.getUTCFullYear());
var Month = String(Today.getUTCMonth());
Month = Repeat("0", Month.length == 1) + Month;
var Day = String(Today.getUTCDate());
Day = Repeat("0", Day.length == 1) + Day;
Today = Year + Month + Day;
var LastCheck = GM_getValue("LastCheck", "00000000");
if (Today > LastCheck) {
  GM_get(ScriptURL, CheckScriptVersion);
  GM_setValue("LastCheck", Today);
}

/******************************************************************************/

// attach activation button to page
var Activator = document.createElement("div");
Activator.setAttribute("id", "GM_ItemParser_Activator");
Activator.setAttribute("style", "text-align:center");
CreateOption(
  Activator, "GM_ItemParser_Button", "button", "",
  [["value", "I Can Has Wiki"], ["onClick", Main]]
);
Activator.appendChild(document.createElement("hr"));
document.body.insertBefore(Activator, document.body.firstChild);

/******************************************************************************/

/* test suite:
propeller beanie (small, sup)
thin black candle (wacky formatting)
haiku katana (haiku format, unparsed enchantment)
Staff of the Greasefire
depantsing bomb (source code malformed; like sticker weapons)
mesh cap (intrinsic)
quasi-ethereal macaroni fragments (class only)
turtle pheromones (class only)
Gazpacho's Glacial Grimoire (PS spell)
Necrotelicomnicon (P spell)
stone baseball cap (line breaks)
rubber WWBBDD? bracelet (line breaks)
frigid hankyu (entities)
blue ribbon (entities)
acoustic guitar (<!-- comment -->)
bottle-rocket crossbow (unparsed)
slime-covered speargun (specific bonus damage)
jewel-eyed wizard hat (unparsed, comment)
Loaded serum blowgun (<small>)
Hodgman's disgusting technicolor overcoat (empty space in ench)
Infinitesimal IPA (non-standard descid)
dwarf bread (multiple uses)
baby killer bee (familiar hatchling note)
left-handed melodica (bonus for class x only)

container of spooky putty -- broken harshly; parse ItemBox
each enchantment, each item type, each parsing flag
*/