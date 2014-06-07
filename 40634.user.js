// ==UserScript==
// @name           OkCupid easy-read compare page
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/40634.user.js
// @description    Makes the personality comparison page actually readable, and linked from the personality awards on the profile page
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://www.okcupid.com/compare?*
// @include        http://www.okcupid.com/profile/*
// @exclude        http://www.okcupid.com/profile/*/pictures*
// @exclude        http://www.okcupid.com/profile/*/tests*
// @exclude        http://www.okcupid.com/profile/*/journal*
// @include        http://www.okcupid.com/profile/*/compare/*
// ==/UserScript==

if (location.pathname.match(/\/profile\/[^\/]+\/?$/)) {
  var user = location.pathname.split("/")[2];
  var url = "/profile/"+ user +"/compare/" + unsafeWindow.SCREENNAME;
  node({ after: $X('id("personality_awards")/p'),
	 tag: <p class="button white" style="margin-right: 10px;">
	        <a href={ url }>Compare</a></p> });
  throw null; // abort execution, silently
} else if (!location.pathname.match(/\/profile\/[^\/]+\/compare\//))
  throw null; // shouldn't (ever) run here

var icon_base = "http://cdn.okcimg.com/_img/layout2/profile/personality_icons/";
var traits = {
              Adventurous:"adventurous",               Lawful:"lawfulness",
               Aggressive:"aggressive",     "Life Experience":"life_experience",
                Ambitious:"ambition",                Literary:"litsiness",
                 Artistic:"artistic",                  Lonely:"loneliness",
                 Athletic:"athleticism","Experienced in Love":"love_experience",
               Attractive:"attractiveness","Desiring of Love":"love_want",
              Charismatic:"charisma",         "Old-Fashioned":"old_fashioned",
                    Cocky:"cockiness",             Optimistic:"optimism",
            Compassionate:"compassion",        "of a Planner":"planning",
              Competitive:"competitive",            Political:"political",
                     Cool:"coolness",                    Pure:"purity",
                 Creative:"creativity",             Radcliffy:"radcliffy",
                 Dominant:"dominant",              Republican:"republican",
                    Dorky:"dorkiness",               Romantic:"romantic",
             "Into Drugs":"drugs",                 Scientific:"scientific",
                Energetic:"energy",                Confidence:"self_confidence",
      "Economically Free":"freedom_economic",         Serious:"seriousness",
          "Socially Free":"freedom_social", "Desiring of Sex":"sex_want",
                 Friendly:"friendliness","Experienced in Sex":"sex_experience",
                   Giving:"giving",                  Trusting:"trusting",
                     Good:"goodness",               Spiritual:"spirituality",
              Spontaneous:"spontaneity",          Independent:"independence",
         "Less Emotional":"thinking_not_feeling",      Sloppy:"sloppiness",
                    Indie:"indie",                    Thrifty:"thriftiness",
"Mathematically Inclined":"intelligence_math",         Greedy:"greed",
      "Verbally Inclined":"intelligence_verbal",      Violent:"violence",
              Introverted:"introversion",             Wealthy:"wealth",
                    Kinky:"kinkiness",        "Well-Mannered":"well_mannered"
};

init();

function init() {
  GM_addStyle(<><![CDATA[

/* The whole first column is a waste of space */
table#compare_graphs col#trait,
table#compare_graphs thead th:first-child,
table#compare_graphs tbody tr td:first-child {
  display: none;
}

/* and the 2nd and 4th are way too wide */
table#compare_graphs col#diff {
  width: 65px;
}
table#compare_graphs col#average_percent {
  width: 40px;
}

/* so are all the header cells */
table#compare_graphs thead th p {
  margin: 10px 0;
}

/* and the difference-from-average counts */
table#compare_graphs .diff p {
  padding: 10px 0;
}

/* give the graphs nice underlines to signify who's what */
table#compare_graphs tbody td.chart_cell p.chart_set img {
  border-bottom: 2px solid #F9F9F9;
  padding-bottom: 2px;
}
table#compare_graphs p.chart_set {
  margin: 0 5px;
}

  ]]></>.toString());

  // Add icons and tooltips for lesser / greater:
  $x('id("compare_graphs")/tbody/tr').forEach(who_what);
}

function inverted_trait(what) {
  var other = what.replace(/^More /, "Less ");
  if (other != what) return other;
  return what.replace(/^Less /, "More ");
}

function icon_for_trait(what, not) {
  var icon = traits[what] || traits[what.replace("More ", "")];
  return icon && icon_base + (not ? "not_" : "") + icon + ".png";
}

function who_what(tr) {
  var whois = $X('td[1]', tr);
  var stats = whois.textContent.match(/(\S+) is ([-\w ]*?)\s*$/);
  var what = stats[2];
  var verb = /(Confidence|Life Experience)$/.test(what) ? " has " : " is ";
  var who = stats[1];
  var imore = icon_for_trait(what);
  var iless = icon_for_trait(what, "inverse");
  var graphs = $x('td[@class="chart_cell"]//img', tr);

  var p1 = $X('string(td[@class="names"]/p[1])', tr);
  var p2 = $X('string(td[@class="names"]/p[2])', tr);
  var g1 = graphs[0], c1 = "#5488C5", pl = p1; // will be the lesser weasel
  var g2 = graphs[1], c2 = "#E02895", pw = p2;
  var g3 = graphs[2];

  if (pl == who) [g1, g2, pl, pw, c1, c2] = [g2, g1, pw, pl, c2, c1];
  if ("Neither" == who) { pl = pw = "Neither"; c1 = c2 = "#F9F9F9"; }

  g2.title = g3.title = pw + verb + what; // g2 and 3 win!
  g1.title =            pl + verb + inverted_trait(what);

  g1.style.paddingLeft = g2.style.marginLeft = g3.style.marginLeft =
  g2.style.paddingRight = "73px";

  g1.style.background = 'url("'+ iless +'") no-repeat';
  g2.style.background = 'url("'+ imore +'") no-repeat right';

  g1.style.borderBottomColor = c1;
  g2.style.borderBottomColor = c2;
}
