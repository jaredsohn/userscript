// ==UserScript==

// @name           Fight Engine Rewrite

// @namespace      MassiveFighting

// @description    Rewrite the fight engine output

// @include        http://www.massivefighting.com/fighting.asp?fight=*

// ==/UserScript==

function xpath(query) {
  return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function escapeRegExp(s){
  return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}

// Enter your fighter name below using \xa0 inbetween the name and nickname
mfrg = /Joe\xa0Your Mom\xa0Mama/;

var punchregexp = new Array(
  /(.*) turns to the left, and launches a brutal turning back fist/,
  /(.*) ducks a punch and counters/,
  /punch but (.*) quickly turn and a sharp elbow hits/,
  /(.*) leans away from (.*) and hits (.*) with a Back fist/,
  /A nice hammer fist from (.*) makes/,
  /(.*) hits (.*) with a hook/,
  /brutal series of punches from (.*)/
);

var opppunchregexp = new Array(
  /punch right on the chin of (.*), rocks him/
);

var tdregexp = new Array(
  /beautiful head lock hip toss from (.*), shakes/,
  /double leg takedown from (.*)/,
  /and (.*) are quickly on top/,
  /comes to close to (.*) and ended upp in a high toss/,
  /(.*) makes an advance foot sweep/,
  /(.*) makes a single leg takedown/,
  /(.*) makes a reverse throw/,
  /(.*) grabs a hold of/,
  /and (.*) attacks on ground and are now in side/
);

var tdoregexp = new Array(
  /A inside reap on (.*) and the fight/
);

var standup = new Array(
  /Well defended ground game/,
  /Judge decide to start/,
  /Sprawling/
);

var kickre = new Array(
  /(.*) creating some distance with/,
  /Push kick from (.*)/,
  /Brutal head kick from (.*) and/,
  /(.*) moves to the side, unload a side kick/,
  /(.*) hits a nice leg kick/
);

var kickore = new Array(
  /there was no chance for (.*) to see that one/,
  /A running knee to the face of (.*)/
);

var gnpre = new Array(
  /Body punches from (.*)/,
  /Punch to the head from (.*)/,
  /Knees to the body from (.*)/,
  /(.*) mounts and are able to ground and pound/,
  /in the face from (.*) in mount position/
);
  
var attregexp = new Array(
  /(.*) tries the Omaplata/,
  /(.*) looking to find a way to lock in the kamura/,
  /and (.*) might be able to finish the fight/,
  /(.*) almost has the anaconda grip/,
  /(.*) have (.*) in a knee bar/,
  /(.*) makes a switch and tries/,
  /Great switch from (.*) resulting in/,
  /(.*) tries to get a heel hook/,
  /(.*) rolls over and tries to lock in the rear/,
  /(.*) tries a arm triangle/
);

var oppattregexp = new Array(
  /Guillotine choke on (.*)/
);

var hitarray = new Array( 0,0,0,0,0 );
var gothitarray = new Array( 0,0,0,0,0 );
// 0 = boxing, 1 = kicking, 2 = bjj, 3 = gnp, 4 = tkd
var hit = 0;
var gothit = 0;
var box = 0;
var kck = 0;
var bjj = 0;
var gnp = 0;

GM_log("Entering script");	
areas = xpath('//td');
for (var i = 0; i < areas.snapshotLength; i++) {
  text = areas.snapshotItem(i);
  if (text.firstChild.face == 'verdana' && text.firstChild.size == 1) {
    // Don't add to the text childnodes array during the loop
    var tkdnodes = new Array;
    var standnodes = new Array;
    FIGHTLOOP:
    for (var j = 0; j < text.firstChild.childNodes.length; j++) {
      fightline = text.firstChild.childNodes[j];
      if (fightline.nodeName == '#text') {
        // Process text here
        ftext = fightline.nodeValue;
	for (var stindex = 0; stindex < standup.length; stindex++) {
	  if (standup[stindex].test(ftext)) {
	    standnodes.push(text.firstChild.childNodes[j+1]);
	    continue FIGHTLOOP;
	  }
	}
	for (var tdindex = 0; tdindex < tdregexp.length; tdindex++) {
	  if (tdregexp[tdindex].test(ftext)) {
	    ftext.match(tdregexp[tdindex]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		hitarray[4]++;
		hit++;
		fightline.nodeValue = "+ TKD " + ftext;
		tkdnodes.push(text.firstChild.childNodes[j]);
	    } else {
		gothitarray[4]++;
		gothit++;
		fightline.nodeValue = "- TDK " + ftext;
		tkdnodes.push(text.firstChild.childNodes[j]);
	    }
	    continue FIGHTLOOP;
	  }
	}
	for (var tdoindex = 0; tdoindex < tdoregexp.length; tdoindex++) {
	  if (tdoregexp[tdoindex].test(ftext)) {
	    ftext.match(tdregexp[tdindex]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		gothitarray[4]++;
		gothit++;
		fightline.nodeValue = "- TKD " +ftext;
		tkdnodes.push(text.firstChild.childNodes[j]);
	    } else {
		hitarray[4]++;
		hit++;
		fightline.nodeValue = "+ TKD " +ftext;
		tkdnodes.push(text.firstChild.childNodes[j]);
	    }
	    continue FIGHTLOOP;
	  }
	}
	for (var pindex = 0; pindex < punchregexp.length; pindex++) {
	  if (punchregexp[pindex].test(ftext)) {
	    ftext.match(punchregexp[pindex]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		hitarray[0]++;
		hit++;
		fightline.nodeValue = "+ BOX " + ftext;
	    } else {
		gothitarray[0]++;
		gothit++;
		fightline.nodeValue = "- BOX " + ftext;
	    }
	    continue FIGHTLOOP;
	  } // end if punchregexp ftext
	} // end for pindex
	for (var poindex = 0; poindex < opppunchregexp.length; poindex++) {
	  if (opppunchregexp[poindex].test(ftext)) {
	    ftext.match(opppunchregexp[poindex]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
	      gothitarray[0]++;
	      gothit++;
	      fightline.nodeValue = "- BOX " + ftext;
	    } else {
	      hitarray[0]++;
	      hit++;
	      fightline.nodeValue = "+ BOX " + ftext;
	    }
	    continue FIGHTLOOP;
	  } // end if opp ftext
	} // end for poindex
	for (var n = 0; n < kickre.length; n++) {
	  if (kickre[n].test(ftext)) {
	    ftext.match(kickre[n]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		hitarray[1]++;
		hit++;
		fightline.nodeValue = "+ KCK " + ftext;
	    } else {
		gothitarray[1]++;
		gothit++;
		fightline.nodeValue = "- KCK " + ftext;
	    }
	    kck++;
	    continue FIGHTLOOP;
	  }
	}
	for (var n = 0; n < kickore.length; n++) {
	  if (kickore[n].test(ftext)) {
	    ftext.match(kickore[n]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		gothitarray[1]++;
		gothit++;
		fightline.nodeValue = "- KCK " + ftext;
	    } else {
		hitarray[1]++;
		hit++;
		fightline.nodeValue = "+ KCK " + ftext;
	    }
	    kck++;
	    continue FIGHTLOOP;
	  }
	}
	for (var n = 0; n < gnpre.length; n++) {
	  if (gnpre[n].test(ftext)) {
	    ftext.match(gnpre[n]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		hitarray[3]++;
		hit++;
		fightline.nodeValue = "+ GNP " + ftext;
	    } else {
		gothitarray[3]++
		gothit++;
		fightline.nodeValue = "- GNP " + ftext;
	    }
	    continue FIGHTLOOP;
	  }
	}
	for (var areindex = 0; areindex < attregexp.length; areindex++) {
          if (attregexp[areindex].test(ftext)) {
	    ftext.match(attregexp[areindex]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
		hitarray[2]++;
		hit++;
		fightline.nodeValue = "+ BJJ " + ftext;
	    } else {
		gothitarray[2]++;
		gothit++;
		fightline.nodeValue = "- BJJ " + ftext;
	    }
	    continue FIGHTLOOP;
          } // end if regexptest ftext
	} // end for areindex
	// Try again with the smaller opp attack array
	for (var areindex = 0; areindex < oppattregexp.length; areindex++) {
	  if (oppattregexp[areindex].test(ftext)) {
	    ftext.match(oppattregexp[areindex]);
	    fname = RegExp.$1;
	    if (mfrg.test(fname)) {
	      gothitarray[2]++;
	      gothit++;
	      fightline.nodeValue = "- BJJ " + ftext;
	    } else {
	      hitarray[2]++;
	      hit++;
	      fightline.nodeValue = "+ BJJ " + ftext;
	    }
	    continue FIGHTLOOP;
	  } // end if oppattregexp
	} // end for areindex
      } // end if nodename
    } // end for j
  // Now add in all the nodes for takedowns/standups
  for (var j = 0; j < tkdnodes.length; j++) {
    var h = document.createElement("div");
    h.innerHTML = "<BR>**TAKEDOWN** <BR>";
    text.firstChild.insertBefore(h,tkdnodes[j]);
  }
  for (var j = 0; j < standnodes.length; j++) {
    var h = document.createElement("div");
    h.innerHTML = "** STANDING **<BR>";
    text.firstChild.insertBefore(h,standnodes[j]);
  }
  var h = document.createElement("div");
  h.innerHTML = "Attacks: ";
  h.innerHTML += hit;
  h.innerHTML += " Attacked: " + gothit;
  h.innerHTML += "<BR>Box: (" + hitarray[0] + "," + gothitarray[0] + ")";
  h.innerHTML += " Kick: (" + hitarray[1] + "," + gothitarray[1] + ")";
  h.innerHTML += " Tkd: (" + hitarray[4] + "," + gothitarray[4] + ")";
  h.innerHTML += "<BR>BJJ: (" + hitarray[2] + "," + gothitarray[2] + ")";
  h.innerHTML += " GnP: (" + hitarray[3] + "," + gothitarray[3] + ")";
  text.insertBefore(h,text.firstChild);
  } // end if text firstchild
} // end for i

