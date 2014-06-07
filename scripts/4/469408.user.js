// ==UserScript==
// @name        Poker Prover
// @namespace   BvS-ZeConster
// @description BvS Poker: hotkeys and determines if you can Prove a win
// @include     http://*animecubed.com/billy/bvs/shop-pokerplay.html
// @version     1.12
// @grant       none
// ==/UserScript==

//possible states:
//1: discard: 1/2/3/4/5/d, determine hand, determine checkboxes for discarding
//2: check/showdown/prove: c/s/p, determine hand, calculate prover
//3: fold/cAll: f/a
var allownumbersandd = false;
var allowcsp = false;
var allowfa = false;
var discardcheckboxes = new Array();
var mycards = new Array();
for (var i = 0; i < 5; i++) {		mycards[i] = 1;	}
var remaining = new Array();
for (var i = 0; i < 52; i++) {		remaining[i] = 1;	}
var remainingpersuit = new Array();
for (var i = 0; i < 4; i++) {		remainingpersuit[i] = 13;	}
var remainingpervalue = new Array();
for (var i = 0; i < 13; i++) {		remainingpervalue[i] = 4;	}
var thisbutton = null;
var proveitbackup = null;

if (document.documentElement.innerHTML.contains("discard1.gif") || document.documentElement.innerHTML.contains("discard0.gif")) {
	allownumbersandd = true;
	determineHandDiscard();
	for (var i = 0; i < 5; i++) {
		discardcheckboxes[i] = document.getElementsByName("cardx"+mycards[i])[0];
	}
} else if (document.documentElement.innerHTML.contains("cardfold.gif")) {
//check this first, since the "Showdown!" will also be there now
	allowfa = true;
	determineHandOther();
	findNondiscarded();
	var maxenemyvalue = calculateValue(remaining,remainingpersuit,remainingpervalue,true);
	
	//step 1: prepare an empty hand
	var fourcardhands = new Array();
	var fourcardpersuit = new Array();
	var fourcardpervalue = new Array();
	for (var hand = 5; hand < 6; hand++) {
		fourcardhands[hand] = new Array();
		fourcardpersuit[hand] = new Array();
		fourcardpervalue[hand] = new Array();
		for (var i = 0; i < 52; i++) {	fourcardhands[hand][i] = 0;	}
		for (var i = 0; i < 4; i++) {	fourcardpersuit[hand][i] = 0;	}
		for (var i = 0; i < 13; i++) {	fourcardpervalue[hand][i] = 0;	}
	}
	
	//step 2: only use index 5, which is for your actual hand
	for (var i = 0; i < 5; i++) {
		var num0to51 = mycards[i];
		var value = (num0to51 - num0to51%4)/4;
		var suit = num0to51%4;
		for (var hand = 5; hand < 6; hand++) {
			fourcardhands[hand][num0to51] = fourcardhands[hand][num0to51] + 1;
			fourcardpersuit[hand][suit] = fourcardpersuit[hand][suit] + 1;
			fourcardpervalue[hand][value] = fourcardpervalue[hand][value] + 1;
		}
	}
	var mycurrentscore = calculateValue(fourcardhands[5],fourcardpersuit[5],fourcardpervalue[5],true);
	//alert(maxenemyvalue+","+mybestscore);
	
	//step 4: translate the best enemy score and own 4-card score back into words
	var enemystr = translateScore(maxenemyvalue,true);
	var mycurrentstr = translateScore(mycurrentscore,true);
	var addthistext =			"<br>"+mycurrentscore + " = current score ("+mycurrentstr+")";
	addthistext = addthistext + "<br>"+maxenemyvalue + " = current best enemy score ("+enemystr+")";
	if (mycurrentscore == maxenemyvalue) {
		addthistext = addthistext + "<br>Worst case, you will <b>tie</b> this hand: calling is safe";
	} else if (mycurrentscore > maxenemyvalue) {
		addthistext = addthistext + "<br>You'll <b>win</b> this! Call!";
	} else {
		addthistext = addthistext + "<br>You may <b>lose</b> if you Call now.";
	}
	var breakhere = document.documentElement.innerHTML.indexOf("<hr>");
	var part1 = document.documentElement.innerHTML.substring(0,breakhere);
	var part2 = document.documentElement.innerHTML.substring(breakhere);
	document.documentElement.innerHTML = part1+addthistext+part2;
} else if (document.documentElement.innerHTML.contains("cardshow.gif")) {
	allowcsp = true;
	determineHandOther();
	findNondiscarded();
	//debug();
	var maxenemyvalue = calculateValue(remaining,remainingpersuit,remainingpervalue,true);
	
	//step 1: prepare the 5 potential 4-card hands
	var fourcardhands = new Array();
	var fourcardpersuit = new Array();
	var fourcardpervalue = new Array();
	for (var hand = 0; hand < 6; hand++) {
		fourcardhands[hand] = new Array();
		fourcardpersuit[hand] = new Array();
		fourcardpervalue[hand] = new Array();
		for (var i = 0; i < 52; i++) {	fourcardhands[hand][i] = 0;	}
		for (var i = 0; i < 4; i++) {	fourcardpersuit[hand][i] = 0;	}
		for (var i = 0; i < 13; i++) {	fourcardpervalue[hand][i] = 0;	}
	}
	
	//step 2: load 4 of the 5 cards into each potential 4-card hand; index 5 is for your actual hand
	for (var i = 0; i < 5; i++) {
		var num0to51 = mycards[i];
		var value = (num0to51 - num0to51%4)/4;
		var suit = num0to51%4;
		for (var hand = 0; hand < 6; hand++) {
			if (i != hand) {
				fourcardhands[hand][num0to51] = fourcardhands[hand][num0to51] + 1;
				fourcardpersuit[hand][suit] = fourcardpersuit[hand][suit] + 1;
				fourcardpervalue[hand][value] = fourcardpervalue[hand][value] + 1;
			}
		}
	}
	
	//step 3: compare each of the hands and take the best
	var scores = new Array();
	for (var hand = 0; hand < 5; hand++) {
		scores[hand] = calculateValue(fourcardhands[hand],fourcardpersuit[hand],fourcardpervalue[hand],false);
	}
	var mybestscore = Math.max(scores[0],scores[1],scores[2],scores[3],scores[4]);
	var mycurrentscore = calculateValue(fourcardhands[5],fourcardpersuit[5],fourcardpervalue[5],true);
	//alert(maxenemyvalue+","+mybestscore);
	
	//step 4: translate the best enemy score and own 4-card score back into words
	var enemystr = translateScore(maxenemyvalue,true);
	var mybeststr = translateScore(mybestscore,false);
	var mycurrentstr = translateScore(mycurrentscore,true);
	var addthistext =			"<br>"+mycurrentscore + " = current score ("+mycurrentstr+")";
	addthistext = addthistext + "<br>"+mybestscore + " = current best 4-card score ("+mybeststr+")";
	addthistext = addthistext + "<br>"+maxenemyvalue + " = current best enemy score ("+enemystr+")";
	if (mybestscore == maxenemyvalue) {
		addthistext = addthistext + "<br>You will <b>tie</b> if you Prove now!";
	} else if (mybestscore > maxenemyvalue) {
		addthistext = addthistext + "<br>You will <b>win</b> if you Prove now!";
	} else {
	//	if (document.getElementById("show3") != null) {
	//		document.getElementById("show3").disabled = true;
	//	}
		if (document.forms.namedItem("redraw3") != null) {
			proveitbackup = document.forms.namedItem("redraw3").innerHTML;
			document.forms.namedItem("redraw3").innerHTML = "Prove Disabled (hit e to enable)";
		}
		addthistext = addthistext + "<br>You will <b>lose</b> if you Prove now!";
		if (mycurrentscore == maxenemyvalue) {
			addthistext = addthistext + "<br>Worst case, you will <b>tie</b> this hand: Showdown is safe";
		} else if (mycurrentscore > maxenemyvalue) {
			addthistext = addthistext + "<br>You will always <b>win</b> if you Showdown and they call";
		} else {
			addthistext = addthistext + "<br>You may <b>lose</b> if you Showdown and they call";
		}
	}
	var breakhere = document.documentElement.innerHTML.indexOf("<hr>");
	var part1 = document.documentElement.innerHTML.substring(0,breakhere);
	var part2 = document.documentElement.innerHTML.substring(breakhere);
	document.documentElement.innerHTML = part1+addthistext+part2;
}


function determineHandOther() {
	// this doesn't work properly for discard checkboxes since the cards aren't in proper order per value
	var handno = 0;
	for (var value = 12; value > -1 && handno < 6; value--) {
		for (var suit = 0; suit < 4 && handno < 6; suit++) {
			var i = value*4+suit;
			var str = "/card"+i+".gif";
			if (document.documentElement.innerHTML.contains(str)) {
				mycards[handno] = i;
				remaining[i] = 0;
				remainingpervalue[value] = remainingpervalue[value] - 1;
				remainingpersuit[suit] = remainingpersuit[suit] - 1;
				handno = handno + 1;
			}
		}
	}
	//alert(mycards[0]+","+mycards[1]+","+mycards[2]+","+mycards[3]+","+mycards[4]);
	//debug();
}

function determineHandDiscard() {
	var str = document.documentElement.innerHTML;
	for (var handno = 0; handno < 5; handno++) {
		var index1 = str.indexOf("cardx")+5;
		str = str.substring(index1);
		var index2 = str.indexOf("\"");
		i = str.substring(0,index2);
		var suit = i%4;
		var value = (i-suit)/4;
		mycards[handno] = i;
		remaining[i] = 0;
		remainingpervalue[value] = remainingpervalue[value] - 1;
		remainingpersuit[suit] = remainingpersuit[suit] - 1;
	}
}
function findNondiscarded() {
	var alltables = document.getElementsByTagName("table");
	var thistable = 0;
	for (var i = 0; i < alltables.length; i++) {
		if (alltables[i] != null && alltables[i].innerHTML.contains("Clubs<br>Diamonds")) {
			thistable = i;
		}
	}
	var tablediscards = document.getElementsByTagName("table")[thistable];
	for (var value = 0; value < 13; value++) {
		var thiscolumn = tablediscards.getElementsByTagName("tr")[0].getElementsByTagName("td")[value+1];
		//lists all 2s, 3s, etc.: [font color="000000"] if discarded, [font color=999999"] otherwise
		//alert(thiscolumn.innerHTML);
		var tempstrings = new Array();
		tempstrings[0] = thiscolumn.innerHTML;
		var index1 = tempstrings[0].indexOf("font color=")+12;
		tempstrings[1] = tempstrings[0].substring(index1);
		var index2 = tempstrings[1].indexOf("font color=")+12;
		tempstrings[2] = tempstrings[1].substring(index2);
		var index3 = tempstrings[2].indexOf("font color=")+12;
		tempstrings[3] = tempstrings[2].substring(index3);
		var index4 = tempstrings[3].indexOf("font color=")+12;
		tempstrings[4] = tempstrings[3].substring(index4,index4+6);
		tempstrings[1] = tempstrings[1].substring(0,6);
		tempstrings[2] = tempstrings[2].substring(0,6);
		tempstrings[3] = tempstrings[3].substring(0,6);
		//now we're down to 4 values of either "000000" or "999999"
		for (var suit = 0; suit < 4; suit++) {
			var num0to51 = suit + value*4;
			if (tempstrings[suit+1].contains("000000")) {	//this card has been discarded
				remaining[num0to51] = 0;
				remainingpersuit[suit] = remainingpersuit[suit] - 1;
				remainingpervalue[value] = remainingpervalue[value] - 1;
			}
		}
	}
	//debug();
}

function calculateValue(allcards, persuit, pervalue, handsof5allowed) {
	//note: use 0-12, and high card for straights
	var bstrflush = false;	var bflush = false;		var bstraight = false;	var bfullhouse = false;
	var bquads = false;		var btrips = false;		var bonepair = false;	var btwopair = false;
	for (var value = 0; value < 13; value++) {
		if (pervalue[value] == 4) {	bquads = true;	btrips = true;	bonepair = true;	}
		if (pervalue[value] == 3) {					btrips = true;	bonepair = true;	}
		if (pervalue[value] == 2) {									bonepair = true;	}
	}
	//for two pairs and full house, go over things twice, I guess
	for (var value1 = 0; value1 < 13; value1++) {
		for (var value2 = value1+1; value2 < 13; value2++) {
			if (pervalue[value1] >= 2 && pervalue[value2] >= 2) {
				btwopair = true;
				if (handsof5allowed && pervalue[value1]+pervalue[value2] >= 5) {
					bfullhouse = true;
				}
			}
		}
	}
	var higheststraighthighcard = -1;		var higheststraightflushhighcard = -1;
	if (handsof5allowed) {
		for (var suit = 0; suit < 4; suit++) {	if (persuit[suit] >= 5) {	bflush = true;	}	}
		for (var value = -1; value < 9; value++) {
			var newvalue = value;	if (value == -1) {	newvalue = 12;	}
			if (pervalue[newvalue] != 0 && pervalue[value+1] != 0 && pervalue[value+2] != 0 && pervalue[value+3] != 0 && pervalue[value+4] != 0) {
				bstraight = true;	higheststraighthighcard = value+4;
				//check for straight flush, with [12],[0],[1],[2],[3] for aces-low
				var suit0 = allcards[newvalue*4+0] + allcards[(value+1)*4+0] + allcards[(value+2)*4+0] + allcards[(value+3)*4+0] + allcards[(value+4)*4+0];
				var suit1 = allcards[newvalue*4+1] + allcards[(value+1)*4+1] + allcards[(value+2)*4+1] + allcards[(value+3)*4+1] + allcards[(value+4)*4+1];
				var suit2 = allcards[newvalue*4+2] + allcards[(value+1)*4+2] + allcards[(value+2)*4+2] + allcards[(value+3)*4+2] + allcards[(value+4)*4+2];
				var suit3 = allcards[newvalue*4+3] + allcards[(value+1)*4+3] + allcards[(value+2)*4+3] + allcards[(value+3)*4+3] + allcards[(value+4)*4+3];
				if (suit0 == 5 || suit1 == 5 || suit2 == 5 || suit3 == 5) {	//5 sequential cards remain,
					bstrflush = true;	higheststraightflushhighcard = value+4;
				}
			}
		}
	}
	//different values of each kind:
	//straight flush: 10 (ace low - 10 low)					*4       =      40
	//four of a kind: 13									*48      =     624
	//full house: 156 (13 trips, 12 pair)					*24      =    3744
	//flush: 1277 (13!/8!/5!, -10 for straight flushes)		*4       =    5108
	//straight: 10 (ace low - 10 low)						*(4^5-4) =   10200 (no flushes)
	//three of a kind: 858 (13 trips, 12*11/2 kickers)		*4*4*4   =   54912
	//two pair: 858 (12+11+..+2+1 pairs, 11 kickers)		*6*6*4   =  123552
	//one pair: 2860 (13 pair, 12*11*10/6 kickers)			*6*4*4*4 = 1098240
	//scum: 1277 (13!/8!/5!, -10 for straights)				*(4^5-4) = 1302540 (no flushes)
	
	//values to be used (without taking disappeared values into account, except for the highest value):
	//0		scum:		368713 (12*13^4+11*13^3+10*13^2+9*13+7)		AKQJ9
	//400k	one pair:	 28362 (12*13^3+11*13^2+10*13  +9)			AAKQJ
	//450k	two pair:	  2181 (12*13^2+11*13  +10)					AAKKQ
	//475k	trips:		    12										AAA--
	//500k	straight:	    12										AKQJT
	//525k	flush:		368713 (12*13^4+11*13^3+10*13^2+9*13+7)		AKQJ9
	//925k	full house:	   167 (12*13+11)							AAAKK
	//950k	4 of a kind:    12										AAAA-
	//975k	straight flush: 12										AKQJT
	//NOTE: for 4-of-a-kind and 3-of-a-kind the kickers don't matter
	//alert(bstrflush+","+bflush+","+bstraight+","+bfullhouse+"\n"+bquads+","+btrips+","+btwopair+","+bonepair+"\n"+higheststraighthighcard+","+higheststraightflushhighcard);
	var besthandvalue = -1;
	if (bstrflush) {
		besthandvalue = 975000+higheststraightflushhighcard;
	} else if (bquads) {
		for (var value = 12; value > -1; value--) {
			if (pervalue[value] == 4) {
				besthandvalue = 950000+value;
				value = -1;
			}
		}
	} else if (bfullhouse) {
		for (var value1 = 12; value1 > -1; value1--) {
			if (pervalue[value1] == 3) {
				for (var value2 = 12; value2 > -1; value2--) {
					if (value2 != value1 && pervalue[value2] >= 2) {
						besthandvalue = 925000+13*value1+value2;
						value1 = -1;	value2 = -1;
					}
				}
			}
		}
	} else if (bflush) {
		var suitvalues = new Array();
		suitvalues[0] = 0;	suitvalues[1] = 0;	suitvalues[2] = 0;	suitvalues[3] = 0;
		for (var suit = 0; suit < 4; suit++) {
			if (persuit[suit] >= 5) {
				for (var v1 = 12;     v1 > 3; v1--) {
				if (allcards[v1*4+suit] == 1) {
					for (var v2 = v1 - 1; v2 > 2; v2--) {
					if (allcards[v2*4+suit] == 1) {
						for (var v3 = v2 - 1; v3 > 1; v3--) {
						if (allcards[v3*4+suit] == 1) {
							for (var v4 = v3 - 1; v4 > 0; v4--) {
							if (allcards[v4*4+suit] == 1) {
								for (var v5 = v4 - 1; v5 > -1; v5--) {
								if (allcards[v5*4+suit] == 1) {
									suitvalues[suit] = v1*169*169 + v2*169*13 + v3*169 + v4*13 + v5;
									v1 = -1; v2 = -1; v3 = -1; v4 = -1; v5 = -1;
								}	}
							}	}
						}	}
					}	}
				}	}
			}
		}
		besthandvalue = 525000+Math.max(suitvalues[0],suitvalues[1],suitvalues[2],suitvalues[3]);
	} else if (bstraight) {
		besthandvalue = 500000+higheststraighthighcard;
	} else if (btrips) {
		for (var value = 12; value > -1; value--) {
			if (pervalue[value] == 3) {
				besthandvalue = 475000 + value;
				value = -1;
			}
		}
	} else if (btwopair) {
		for (var value1 = 12; value1 > -1; value1--) {
		if (pervalue[value1] == 2) {
			for (var value2 = value1-1; value2 > -1; value2--) {
			if (pervalue[value2] == 2) {
				if (handsof5allowed) {
					for (var value3 = 12; value3 > -1; value3--) {
					if (pervalue[value3] == 1) {
						besthandvalue = 450000 + value1*13*13 + value2*13 + value3;
						value1 = -1;	value2 = -1;	value3 = -1;
					}	}
				} else {
					besthandvalue = 450000 + value1*13*13 + value2*13;
					value1 = -1;	value2 = -1;
				}
			}	}
		}	}
	} else if (bonepair) {
		for (var value1 = 12; value1 > -1; value1--) {
		if (pervalue[value1] == 2) {
			for (var value2 = 12; value2 > -1; value2--) {
			if (pervalue[value2] == 1) {
				for (var value3 = value2-1; value3 > -1; value3--) {
				if (pervalue[value3] == 1) {
					if (handsof5allowed) {
						for (var value4 = value3-1; value4 > -1; value4--) {
						if (pervalue[value4] == 1) {
							besthandvalue = 400000 + value1*13*13*13 + value2*13*13 + value3*13 + value4;
							value1 = -1;	value2 = -1;	value3 = -1;	value4 = -1;
						}	}
					} else {
						besthandvalue = 400000 + value1*13*13*13 + value2*13*13 + value3*13;
						value1 = -1;	value2 = -1;	value3 = -1;
					}
				}	}
			}	}
		}	}
	} else {	//scum
		for (var v1 = 12; v1 > -1; v1--) {
		if (pervalue[v1] == 1) {
			for (var v2 = v1-1; v2 > -1; v2--) {
			if (pervalue[v2] == 1) {
				for (var v3 = v2-1; v3 > -1; v3--) {
				if (pervalue[v3] == 1) {
					for (var v4 = v3-1; v4 > -1; v4--) {
					if (pervalue[v4] == 1) {
						if (handsof5allowed) {
							for (var v5 = v4-1; v5 > -1; v5--) {
							if (pervalue[v5] == 1) {
								besthandvalue = v1*169*169 + v2*169*13 + v3*169 + v4*13 + v5;
								v1 = -1; v2 = -1; v3 = -1; v4 = -1; v5 = -1;
							}	}
						} else {
							besthandvalue = v1*169*169 + v2*169*13 + v3*169 + v4*13;
							v1 = -1; v2 = -1; v3 = -1; v4 = -1;
						}
					}	}
				}	}
			}	}
		}	}
	}
	return besthandvalue;
	//0		scum:		371293 (13^5)
	//400k	one pair:	 28561 (13^4)
	//450k	two pair:	  2197 (13^3)
	//475k	trips:		  2197 (13^3)
	//500k	straight:	    10
	
	//allcards, persuit, pervalue
}

function translateScore(numerical,handsof5allowed) {
	var description = "";
	if (numerical >= 975000) {
		var highcard = numerical-975000;
		description = "Straight Flush, " + translateCardToEnglish(highcard) + " high";
	} else if (numerical >= 950000) {
		var quads = numerical-950000;
		description = "4 of a Kind: " + translateCardToEnglish(quads);
	} else if (numerical >= 925000) {
		var cards = numerical - 925000;
		var pair = cards%13;
		var trips = (cards - pair)/13;
		description = "Full House: " + translateCardToEnglish(trips) + " over " + translateCardToEnglish(pair);
	} else if (numerical >= 525000) {
		var cards = numerical - 525000;
		var c5 = cards%13;	cards = (cards - c5)/13;
		var c4 = cards%13;	cards = (cards - c4)/13;
		var c3 = cards%13;	cards = (cards - c3)/13;
		var c2 = cards%13;	cards = (cards - c2)/13;
		var c1 = cards;
		description = "Flush: " + translateCardToEnglish(c1) + "/" + translateCardToEnglish(c2) + "/" + translateCardToEnglish(c3) + "/" + translateCardToEnglish(c4) + "/" + translateCardToEnglish(c5);
	} else if (numerical >= 500000) {
		var highcard = numerical-500000;
		description = "Straight: " + translateCardToEnglish(highcard) + " high";
	} else if (numerical >= 475000) {
		var trips = numerical-475000;
		description = "3 of a Kind: " + translateCardToEnglish(trips);
	} else if (numerical >= 450000) {
		var cards = numerical - 450000;
		var kicker = cards%13;	cards = (cards-kicker)/13;
		var hipair = cards%13;	cards = (cards-hipair)/13;
		var lopair = cards;
		if (handsof5allowed) {
			description = "Two pair: " + translateCardToEnglish(hipair) + " and " + translateCardToEnglish(lopair) + ", with " + translateCardToEnglish(kicker);
		} else {
			description = "Two pair: " + translateCardToEnglish(hipair) + " and " + translateCardToEnglish(lopair);
		}
	} else if (numerical >= 400000) {
		var cards = numerical - 400000;
		var c3 = cards%13;	cards = (cards - c3)/13;
		var c2 = cards%13;	cards = (cards - c2)/13;
		var c1 = cards%13;	cards = (cards - c1)/13;
		var pair = cards;
		if (handsof5allowed) {
			description = "Pair: " + translateCardToEnglish(pair) + ", with " + translateCardToEnglish(c1) + "/" + translateCardToEnglish(c2) + "/" + translateCardToEnglish(c3);
		} else {
			description = "Pair: " + translateCardToEnglish(pair) + ", with " + translateCardToEnglish(c1) + "/" + translateCardToEnglish(c2);
		}
	} else {
		var cards = numerical;
		var c5 = cards%13;	cards = (cards - c5)/13;
		var c4 = cards%13;	cards = (cards - c4)/13;
		var c3 = cards%13;	cards = (cards - c3)/13;
		var c2 = cards%13;	cards = (cards - c2)/13;
		var c1 = cards;
		if (handsof5allowed) {
			description = "High card " + translateCardToEnglish(c1) + ", with " + translateCardToEnglish(c2) + "/" + translateCardToEnglish(c3) + "/" + translateCardToEnglish(c4) + "/" + translateCardToEnglish(c5);
		} else {
			description = "High card " + translateCardToEnglish(c1) + ", with " + translateCardToEnglish(c2) + "/" + translateCardToEnglish(c3) + "/" + translateCardToEnglish(c4);
		}
	}
	return description;
}

function translateCardToEnglish(value) {
	var strvalue = "";
	if (value == 12) {
		strvalue = "Ace";
	} else if (value == 11) {
		strvalue = "King";
	} else if (value == 10) {
		strvalue = "Queen";
	} else if (value == 9) {
		strvalue = "Jack";
	} else {
		strvalue = (value+2);
	}
	return strvalue;
}

function process_event(event) {
	if (event.keyCode == 49) {	//1
		if (allownumbersandd == true) {
			discardcheckboxes[0].checked = !(discardcheckboxes[0].checked);
		}
	} else if (event.keyCode == 50) {	//2
		if (allownumbersandd == true) {
			discardcheckboxes[1].checked = !(discardcheckboxes[1].checked);
		}
	} else if (event.keyCode == 51) {	//3
		if (allownumbersandd == true) {
			discardcheckboxes[2].checked = !(discardcheckboxes[2].checked);
		}
	} else if (event.keyCode == 52) {	//4
		if (allownumbersandd == true) {
			discardcheckboxes[3].checked = !(discardcheckboxes[3].checked);
		}
	} else if (event.keyCode == 53) {	//5
		if (allownumbersandd == true) {
			discardcheckboxes[4].checked = !(discardcheckboxes[4].checked);
		}
	} else if (event.keyCode == 68) {	//d: "discard"
		if (allownumbersandd == true) {
			thisbutton = document.forms.namedItem("redraw");
			clickButton();
		}
	} else if (event.keyCode == 67) {	//c: "check"
		if (allowcsp == true) {
			thisbutton = document.forms.namedItem("redraw1");
			clickButton();
		}
	} else if (event.keyCode == 83) {	//s: "showdown!"
		if (allowcsp == true) {
			thisbutton = document.forms.namedItem("redraw2");
			clickButton();
		}
	} else if (event.keyCode == 80) {	//p: "prove"
		if (allowcsp == true) {
			if (document.forms.namedItem("redraw3") != null) {
				thisbutton = document.forms.namedItem("redraw3");
				clickButton();
			}
		}
		//alert(event.keyCode);
	} else if (event.keyCode == 70) {	//f: "fold"
		if (allowfa == true) {
			thisbutton = document.forms.namedItem("redraw1");
			clickButton();
		}
	} else if (event.keyCode == 65) {	//a: "cAll"
		if (allowfa == true) {
			thisbutton = document.forms.namedItem("redraw2");
			clickButton();
		}
	} else if (event.keyCode == 69) {	//e: "escape"
		allownumbersandd = false;
		allowcsp = false;
		allowfa = false;
		if (document.forms.namedItem("redraw3") != null) {
			document.forms.namedItem("redraw3").innerHTML = proveitbackup;
		}
		alert("hotkeys disabled until next pageload, Prove It button re-enabled");
	}
}

function clickButton() {
	thisbutton.submit();	//comment this out to disable auto-clicking completely
}

function debug() {
	var dbgstr = new Array();
	dbgstr[0] = "";
	dbgstr[1] = "";
	dbgstr[2] = "";
	dbgstr[3] = "";
	dbgstr[4] = "";
	dbgstr[5] = "";
	for (var i = 0; i < 13; i++) {
		for (var j = 0; j < 4; j++) {
			if (remaining[i*4+j] == 1) {
				dbgstr[j] = dbgstr[j]+"x";
			} else {
				dbgstr[j] = dbgstr[j]+"-";
			}
		}
	}
	for (var i = 0; i < 4; i++) {		dbgstr[4] = dbgstr[4]+remainingpersuit[i]+"   ";	}
	for (var i = 0; i < 13; i++) {		dbgstr[5] = dbgstr[5]+remainingpervalue[i]+"   ";	}
	alert(dbgstr[0]+"\n"+dbgstr[1]+"\n"+dbgstr[2]+"\n"+dbgstr[3]+"\n"+dbgstr[4]+"\n"+dbgstr[5]);
}

document.documentElement.addEventListener("keyup", process_event, true);