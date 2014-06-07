// ==UserScript==
// @name           Old eRepublik icons
// @namespace      http://www.erepublik.com/en?RYO_E_IS_AWESOME
// @description    Changes the eRepublik items, skills and medals to their old style
// @include        http://www.erepublik.com/*
// ==/UserScript==

///// CHANGE THESE URLS TO THE URLS OF THE NEW IMAGES! /////

items = [ /// ITEMS HERE ///
["food", "http://666kb.com/i/bbnf50wy2v51cg6cg.gif"],
["gift", "http://666kb.com/i/bbnf69za1d40459nk.gif"],
["weapon", "http://666kb.com/i/bbnf6ujvvhi5qi140.gif"],
["movingtickets", "http://666kb.com/i/bbnf7hroizq5uvcps.gif"],
["grain", "http://666kb.com/i/bbnf7t9tqcqqhm6n4.gif"],
["diamonds", "http://666kb.com/i/bbnf87m3ja0ewpixs.gif"],
["iron", "http://666kb.com/i/bbnf8q29jse4sxbfk.gif"],
["oil", "http://666kb.com/i/bbnf8xwe8024q81ls.gif"],
["wood", "http://666kb.com/i/bbnf5teoosz43fmsg.gif"],
["house", "http://666kb.com/i/bbnf9aiwmceergrvk.gif"],
["hospital", "http://666kb.com/i/bbnf9iwd5dtxd7kf4.gif"],
["defensesystem", "http://666kb.com/i/bbnf9qrym05ju678g.gif"]
];
medals = [ /// MEDALS HERE ///
["hardworker_on", "http://666kb.com/i/bbnk1z3z4zxmg14bk.gif"],
["hardworker_off", "http://666kb.com/i/bbnk271uys66r278g.gif"],
["congressman_on", "http://666kb.com/i/bbnk2ghpohjct7l7k.gif"],
["congressman_off", "http://666kb.com/i/bbnk2n7xwmt3wpusg.gif"],
["president_on", "http://666kb.com/i/bbnk2v1lfvw044x0g.gif"],
["president_off", "http://666kb.com/i/bbnk332oqo5ucf0gw.gif"],
["mediamogul_on", "http://666kb.com/i/bbnk3elrsd49xjb4w.gif"],
["mediamogul_off", "http://666kb.com/i/bbnk3wuttdfgx6fc0.gif"],
["battlehero_on", "http://666kb.com/i/bbnk44l3pucjw7bxc.gif"],
["battlehero_off", "http://666kb.com/i/bbnk4bba5pgx0wu1s.gif"],
["resistance_on", "http://666kb.com/i/bbnk4gs9c8wzrhd7k.gif"],
["resistance_off", "http://666kb.com/i/bbnkcfoq8to43eucg.jpg"],
["supersoldier_on", "http://666kb.com/i/bbnk4t8wcu4fnxmow.gif"],
["supersoldier_off", "http://666kb.com/i/bbnk50mtbl9i75na8.gif"],
["society_builder_on", "http://666kb.com/i/bbnk57i13noc8rt40.gif"],
["society_builder_off", "http://666kb.com/i/bbnk5ecuaqhunx1cw.gif"]
];
skills = [ /// SKILLS HERE ///
["manufacturing", "http://666kb.com/i/bbnfvuntvcjxxm140.gif"],
["land", "http://666kb.com/i/bbnfvde6vpnrrm71c.gif"],
["constructions", "http://666kb.com/i/bbnfuwtp5osspd540.gif"],
["strenght", "http://666kb.com/i/bbnfvmxugj99mw3kw.gif"]
];

///// End of URLS /////

///// If this is set to true, the medal counter will appear at the bottom-left of the medals
const old_medal_counter = true;

items[0][1] += "#food.gif";
images = document.getElementsByTagName("img");
for (x in images)
{
 for (y in items)
 {
  if (images[x].src == "http://www.erepublik.com/images/parts/icon_industry_"+items[y][0]+".gif")
  {
   images[x].src = items[y][1];
   images[x].width = "55";
   images[x].height = "55";
   break;
  }
 }
 for (y in skills)
 {
  if (images[x].src == "http://www.erepublik.com/images/parts/icon_skill_"+skills[y][0]+".gif")
  {
   images[x].src = skills[y][1];
   images[x].width = "55";
   images[x].height = "55";
   break;
  }
 }
 for (y in medals)
 {
  if (images[x].src == "http://www.erepublik.com/images/achievements/icon_achievement_"+medals[y][0]+".gif")
  {
   images[x].src = medals[y][1];
   break;
  }
 }
}

if (old_medal_counter) GM_addStyle("ul.achiev .counter{margin:0 !important;top:-17px;}");