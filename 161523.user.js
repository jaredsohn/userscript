// ==UserScript==
// @id             twitchtvchatispotat@phob.net
// @name           Twitch.TV Chat is Potat
// @version        0.16
// @namespace      phob.net
// @author         wn
// @description    is potat
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/161523.meta.js
// ==/UserScript==


// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {

  // Only run on the main window
  if (self !== top) {
    return;
  }

  var oldFormatMessage = CurrentChat.format_message;

  var RosettaStone={amazink:"amazing",anser:"answer",bcus:"because",borink:"boring",brane:"brain",causink:"causing",cheter:"cheater",chust:"just",dameg:"damage",dat:"that",ecstra:"extra",egeins:"against",egual:"equal",ehelo:"(?:hello|hi|sup|whatsup|greetings|yo)",faike:"fake",ferlow:"fellow","for":"for (?:a|the)",gonn:"going to",grat:"great",happen:"happened",hapy:"happy",heff:"have",helpeng:"helping",hend:"hand",iknor:"ignore",improv:"improved",intirnet:"Internet",is:"(?:that|this) is","is of":"is a",jelos:"jealous",klasik:"classic","lessest top":"(?:worst|lower|least)",liyke:"like",luk:"look",luks:"looks",mby:"maybe",men:"man",meny:"many",Moldowa:"Moldovia",Moldowan:"Moldovian",Moldowas:"Moldova's",mor:"more",needink:"need(?:ing)?",nothink:"nothing",officialli:"official(?:ly)?",oky:"okay",onlain:"online",onli:"only",orginal:"original",piktur:"picture",palace:"place",populor:"popular",posibel:"possible",potat:"(?:awesome|cool|excellent)",probibli:"probably",propietaritat:"property",ragink:"raging",relaks:"relax",straikes:"strikes",stronk:"strong",than:"then",threde:"thread",time:"tyme",u:"you",ur:"your",undestent:"understand",viz:"with",waitink:"waiting",wepon:"weapon",wery:"very","))":/(?:\:|;|8|!)(?:D|\))/gi,"((":/(?:\:|;|8|!)\(/gi};

  for (var w in RosettaStone) {
    if (RosettaStone.hasOwnProperty(w)) {
      if ("string" === typeof RosettaStone[w]) {
        RosettaStone[w] = new RegExp("\\b" + RosettaStone[w].replace(/\\/g, "\\") + "\\b", "gi");
      }
    }
  }

  CurrentChat.format_message = function(aMsg) {
    if ("string" === typeof aMsg.message) {
      for (var w in RosettaStone) {
        if (RosettaStone.hasOwnProperty(w)) {
          aMsg.message = aMsg.message.replace(RosettaStone[w], w);
        }
      }
      if (0.05 > Math.random()) {
        aMsg.message = "HAROSH! " + aMsg.message;
      }
    }
    return oldFormatMessage.call(CurrentChat, aMsg);
  }

}); // end of call to contentEval
