// ==UserScript==
// @name           OkCupid seeks-what icons
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/44479.user.js
// @description    Shows icons above the profile picture, as per the choices in looking for, religion, drugs, smoking and drinking, for improved visibility of those traits. (Hover the icons for exact answers, if the choice in iconry is hard to grasp.)
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://www.okcupid.com/*
// ==/UserScript==

var iAmFoo = $X('//p[@class="adjectives"]');
var rowEnd = $X('./following-sibling::*[1]', iAmFoo);
var skinny = $X('//*[@class="skinny_contents"]');
var wanted = $X('.//*[contains(preceding-sibling::*/text(),"Looking For")]',
		skinny);

var base = "http://cdn.okcimg.com/_img/layout2/profile/personality_icons/";

var icon = {
  "New friends":"friendliness.png",
  "Long-term dating":"love_want.png", // "love_experience.png",
  "Short-term dating":"attractiveness.png", // "love_want.png",
  "Activity partners":"spontaneity.png",
  "Long-distance penpals":"intelligence_verbal.png",
  "Casual encounters (sex partners)":"sex_want.png",
  "nonsmoker":"not_drugs.png",
  "smoker":"drugs.png",
  "absolutist":"not_life_experience.png",
  "nonabsolutist":"life_experience.png",
  "nodrugs":"not_freedom_social.png",
  "drugs":"freedom_social.png",
  "religious":"spirituality.png",
  "atheist":"not_spirituality.png"
};

var religious = /atheism|agnosticism|^$/;
var seriosity = {
  "and very serious about it":		1.00,
  "and somewhat serious about it":	0.75,
  "but not too serious about it":	0.50,
  "and laughing about it":		0.25,
  "^$":					0.00
};

var drinkage = {
  "desperately":1.00,
  "very often": 1.00,
  "often":	0.75,
  "sometimes":	0.50,
  "rarely":	0.25,
  "n/a":	0.00
};

var drugs = {
  "often":	1.00,
  "sometimes":	0.50,
  "n/a":	0.00
};

if (wanted) wanted.textContent.split(/\s*,\s*/).forEach(lookingFor);

addIcon("Religion", religion);
addIcon("Drugs", drugging);
addIcon("Smokes", smoking);
addIcon("Drinks", drinking);

function lookingFor(what) {
  node({ before: rowEnd, tag: <img style="height: 35px; margin-left: 6px;"
	 src={base+icon[what]} title={"Looking for "+ what.toLowerCase()}/> });
}

function drinking(answer) {
  if ("no" == answer)
    return <img src={icon.absolutist} title="Does not drink"/>;
  var img = <img src={icon.nonabsolutist}/>;
  var amount = drinkage[answer];
  if (amount !== undefined) img.@style = "opacity: "+ amount + "; ";
  return img;
}

function smoking(answer) {
  if ("no" == answer)
    return <img src={icon.nonsmoker} title="Does not smoke"/>;
  var img = <img src={icon.smoker}/>;
  if ("yes" == answer) return img;
  img.@style = "opacity: "+ ("n/a" == answer ? 0.00 : 0.50) +"; ";
  return img;
}

function drugging(answer) {
  if ("never" == answer)
    return <img src={icon.nodrugs} title="Never takes drugs"/>;
  var img = <img src={icon.drugs}/>;
  var amount = drugs[answer];
  if (amount !== undefined) img.@style = "opacity: "+ amount + "; ";
  return img;
}

function religion(answer) {
  var img = <img src={religious.test(answer) ? icon.atheist : icon.religious}/>;
  for (var level in seriosity)
    if (answer.match(level))
      img.@style = "opacity: "+ seriosity[level] + "; ";
  img.@style = "margin-left: 11px; " + (img.@style || "");
  return img;
}


function addIcon(section, func) {
  var at = $X('.//*[contains(preceding-sibling::*/text(),"'+ section +'")]',
               skinny);
  var answer = at && trim(at.textContent.toLowerCase()).split(/\s+/).join(" ");
  var img = at && func(answer);
  if (img) {
    img.@src = base + img.@src;

    if (!img.@title.toString())
      img.@title = section +": "+ (answer || "?");

    var add = "float: left; height: 35px; margin-right: 6px;";
    img.@style = (img.@style || "") + add;

    node({ before: iAmFoo, tag: img });
  }
}

function trim(s) {
  return s.replace(/^\s+|\s+$/g, "");
}
