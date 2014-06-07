// ==UserScript==
// @name           craigslist bs filter
// @namespace      http://anerroroccurredwhileprocessingthisdirective.com
// @description    Remove bullsh*t marketing buzzwords from craigslist
// @include        http://*.craigslist.org/*
// ==/UserScript==

(function(d){

  dict = {
    "cute": "small",
    "breathtaking": "nice",
    "(definitely|definately|definitaly)? ?won'?t last": "",
    "will not last": "",
    "luxurious": "",
    "(ultra )?luxury": "",
    "affordable": "",
    "h+u+g+e+": "large",
    "sexy?": "",
    "gigantic": "large",
    "spacious": "large",
    "cozy": "small",
    "high end( space| apt| apartment)?": "",
    "oversized": "large",
    "(a )?must see( space| apt| apartment)?": "",
    "great( space |apt |apartment)?": "",
    "humongous": "large",
    "vast": "large",
    "charming": "",
    "ton": "lot",
    "white glove": "",
    "gigant": "large",
    "(best|super|amazing|insane|crazy )?(ever )?deal( ever)?": "",
    "must see": "",
    "very": "",
    "mint( condition)?": "",
    "pristine": "",
    "lovely": "",
    "seductive": "",
    "(simply )?amazing": "nice",
    "(the )?(true )?definition of elegance": "",
    "look no further": "",
    "stunn?ing": "",
    "lux": "",
    "(just )?(came )?back on the market": "",
    "coll?oss?al": "large",
    "beautiful( space| apt| apartment)?": "",
    "beauty": "",
    "fully renovated": "renovated",
    "bache?lor pad": "",
    "new to the market": "",
    "brand new": "",
    "superb(ly)?": "",
    "elegant": "",
    "golden": "",
    "gorgeous": "",
    "incred(i|a)ble( value)?": "",
    "x-?large": "large",
    "extra": "",
    "giant": "large",
    "massive": "large",
    "enormous": "large",
    "astronomic(al)?": "large",
    "excessive": "",
    "immense": "large",
    "jumbo": "large",
    "mammoth": "large",
    "monstrous": "large",
    "tremendous": "large",
    "under ?market": "",
    "masterpiece": "",
    "magnificent": "",
    "hot": "",
    "underpriced": "",
    "unique": "",
    "jaw dropping": "",
    "wow": "",
    "x+l": "",
    "insane": "",
    "crazy": "",
    "super": "",
    "ultra": "",
    "unreal": "",
    "terrific": "",
    "paradise": "",
    "sweet": "",
    "fabulous": "",
    "fantastic": "",
    "spotless": "",
    "unrivaled": "",
    "finishes": "",
    "classy": "",
    "stupendous": "",
    "ridiculous": "",
    "awesome": "",
    "exclusive": "",
    "chic": "",
    "sick": "",
    "so+": "so",
    "rare": "",
    "!+": ".",
    "\\.+": ".",
    ",+": ",",
    "'+": "'",
    '"+': '"',
    '/+': '/',
    'x+': 'x',
    'aaa+': 'a',
    'eee+': 'ee',
    'iii+': 'i',
    'ooo+': 'oo',
    'uuu+': 'u',
    'yyy+': 'y'
  }

  function properCase(str) // thx Greg Dean at stackoverflow
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  function clean_title(a)
  {
    var txt = a.innerHTML;

    // get rid of non important chars
    txt = txt.replace(/&[a-z0-9]+;/ig, " ");
    txt = txt.replace(/[^0-9A-Za-z.,\/\'\"]/g, " ");

    // remove repeating spaces
    txt = txt.replace(/ +/g, " ");

    // unspace spaced out words
    txt = txt.replace(/ +([^a0-9]) +/ig, "$1");

    for (word in dict)
    {
      var re = new RegExp(word, "ig");
      txt = txt.replace(re, dict[word]);
    }
    
    // properly space commas or periods
    txt = txt.replace(/([a-z0-9])(\\.|,)([a-z0-9])/ig, "$1$2 $3");

    // remove ugly casing
    txt = properCase(txt);

    a.innerHTML = txt;
  }

  function main()
  {
    var anchors = d.getElementsByTagName('a');
    for (var i=0; i<anchors.length; i++) 
    {
      if (anchors[i].href.match(/[0-9]{10}.html$/i))
	clean_title(anchors[i]);
    }
  }

  main();
}(document));
