// ==UserScript==
// @name           Hobowars University Solver
// @namespace      http://userscripts.org/users/90928
// @description    Solves Hobowars University on the page 
// @description    Script by Amirreza Abdolmaleki HW1 Hatemaker(1417502) University solver algorithm by Mike Vogt. HW1 orber(81042) HW2 orber (6836)  
// @include        http://www.hobowars.com/game/*cmd=uni*
// @copyright      Amirreza Abdolmaleki
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

(function(){
var CC1 = 0, CC2 = 0, CC3 = 0, CC4 = 0, RR1 = 0, RR2 = 0, RR3 = 0, RR4 = 0;
var oldCC1 = 0, oldCC2 = 0, oldCC3 = 0, oldCC4 = 0, oldRR1 = 0, oldRR2 = 0, oldRR3 = 0, oldRR4 = 0;
var temp, moves, bestMoves = 0, bestScore = 0;

var dots         = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array (1, 1, 1, 1), Array(1, 1, 1, 1));
var currentScore = 0;
var solved       = false;

var elem = 'tr';
var el = document.getElementsByTagName(elem);
var f = '"><b>•</b></a>';

var d = 0;

	for(var z=0; z<el.length; z++){
   		g= ' '+el[z].childNodes[0].innerHTML;
    
	    var s = g.indexOf(f);

		    if (s == 58) {v = z; break;}
   
		}
		
	for(var a=v; a<v+4; a++){
		for(var b=1; b<5; b++){
			var g = el[a].childNodes[b].innerHTML;
			var h = g.substring(g.length-3,g.length-2);
				switch(h) {
					case('d'):
						dots[a-v][b-1] = 0;
						break

					case('o'):
						dots[a-v][b-1] = 1;
						break

					case('n'):
						dots[a-v][b-1] = 2;
						break

						}
					}
				}


    for(var i = 0; i <= 2; ++i) {
        for(var j = 0; j <= 2; ++j) {
            for(var k = 0; k <= 2; ++k) {
                for(var l = 0; l <= 2; ++l) {
                    for(var m = 0; m <= 2; ++m) {
                        for(var n = 0; n <= 2; ++n) {
                            for(var o = 0; o <= 2; ++o) {
                                for(var p = 0; p <= 2; ++p) {
                                    var tempScore = 0;

                                    var array1 = Array(i, j, k, l);
                                    var array2 = Array(m, n, o, p);
                                    for(var a = 0; a < 4; ++a) {
                                        for(var b = 0; b < 4; ++b) {
                                            temp = dots[a][b] + array1[a] + array2[b];
                                            while(temp > 2) { temp -= 3; }
                                            tempScore += temp;
                                        }
                                    }
                                    tempScore -= 16;
                                    moves = i + j + k + l + m + n + o + p;

                                    if((tempScore > bestScore) || (tempScore == bestScore && moves < bestMoves)) {
                                        bestMoves = moves;
                                        bestScore = tempScore;
                                        CC1 = i;
                                        CC2 = j;
                                        CC3 = k;
                                        CC4 = l;
                                        RR1 = m;
                                        RR2 = n;
                                        RR3 = o;
                                        RR4 = p;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
	
    if(RR1 || oldRR1) { el[v-1].childNodes[2].innerHTML = ((oldRR1 && !RR1)? "" : RR1) + '<br>' + el[v-1].childNodes[2].innerHTML; d=+1; }
    if(RR2 || oldRR2) { el[v-1].childNodes[4].innerHTML = ((oldRR2 && !RR2)? "" : RR2) + '<br>' + el[v-1].childNodes[4].innerHTML; d=+1}
    if(RR3 || oldRR3) { el[v-1].childNodes[6].innerHTML = ((oldRR3 && !RR3)? "" : RR3) + '<br>' + el[v-1].childNodes[6].innerHTML; d=+1}
    if(RR4 || oldRR4) { el[v-1].childNodes[8].innerHTML = ((oldRR4 && !RR4)? "" : RR4) + '<br>' + el[v-1].childNodes[8].innerHTML; d=+1}
    if(CC1 || oldCC1) { el[v].childNodes[0].innerHTML = ((oldCC1 && !CC1)? "" : CC1) + ' ' + el[v].childNodes[0].innerHTML; d=+1}
    if(CC2 || oldCC2) { el[v+1].childNodes[0].innerHTML = ((oldCC2 && !CC2)? "" : CC2) + ' ' + el[v+1].childNodes[0].innerHTML; d=+1}
    if(CC3 || oldCC3) { el[v+2].childNodes[0].innerHTML = ((oldCC3 && !CC3)? "" : CC3) + ' ' + el[v+2].childNodes[0].innerHTML; d=+1}
    if(CC4 || oldCC4) { el[v+3].childNodes[0].innerHTML = ((oldCC4 && !CC4)? "" : CC4) + ' ' + el[v+3].childNodes[0].innerHTML; d=+1}
    oldRR1 = RR1;
    oldRR2 = RR2;
    oldRR3 = RR3;
    oldRR4 = RR4;
    oldCC1 = CC1;
    oldCC2 = CC2;
    oldCC3 = CC3;
    oldCC4 = CC4;
    solved = true;
	if(d == 0){el[v-1].childNodes[1].innerHTML = '&#10003;'} 
		else{el[v-1].childNodes[1].innerHTML = 'X'}
})();