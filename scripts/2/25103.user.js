// ==UserScript==
// @name            Nonsens-generator
// @namespace       http://www.rosell.dk/gm/
// @version         0.1.5
// @date            2007-06-02
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/
// @include         *
// ==/UserScript==
// update-message   Der er en ny version af "Nonsens-generator"-scriptet.<br>bla bla<br>Klik <a href="http://www.rosell.dk/gm/konkretist.user.js">her</a> for at installere<br>Klik <a href="http://userscripts.org/scripts/show/25103">her</a> for at gå til script-siden (på userscripts.org)

// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------


function autoupdate() {
    if (self == top) return
    if (window.location.protocol == 'https:') return
    var countdown = GM_getValue('countdown');
    GM_setValue('countdown', countdown - 1);
    if (countdown>0) return
    var daysSinceLastInstall = (Math.floor(new Date().getTime() / 60000) - GM_getValue('install-time')) / 60 / 24;
    GM_setValue('countdown', daysSinceLastInstall<7 ? 100:1000);
    
    // check for update
    get('http://www.rosell.dk/gm/nonsens-generator.user.js', function (s) {
        if (s.indexOf('@version         0.1') == -1) {
            var div = document.createElement("div");
            document.body.insertBefore(div, document.body.firstChild);
            div.innerHTML = s.match(/update-message\s*(.*)/)[1];            
            GM_setValue('countdown', 5);
        }
    });
}
if (GM_getValue('version') != "0.1") {
    GM_setValue('version', "0.1");
    GM_setValue('install-time', Math.floor(new Date().getTime() / 60000));
    GM_setValue('countdown', 20);
}

autoupdate();

// ---------------------------
//      General functions
// ---------------------------
/*
 *  multisplit
 *  Like "split", but this one is capable of having several split characters
 *  Returns both the array of content between split chars, and array of split chars found. With these two arrays, its possible to join it back to a string with multijoin
 */
function multisplit(s, aSplitChars) {
    var a = []
    // find positions of split chars, and push them to a
    for (var i=0; i<aSplitChars.length; i++) {
        var c = aSplitChars[i];
        var pos = -1;
        while (true) {
            pos = s.indexOf(c, pos+1);
            if (pos == -1) break;
            a.push(pos)
        }
    }
    a.push(s.length);
	
    a.sort(function (a,b){return (a-b)});
    var aContent = [];
    var aSeperators = [];
    var pos = -1;
    if (a[0] == 0) {
        while (a[pos+1] == pos + 1) {
            pos++
        }
        aSeperators.push(s.substr(0, pos + 1));
    }
    else {
        aSeperators.push('');
    }
    for (var i=pos+1; i<a.length; i++) {
        aContent.push(s.substr(pos+1, a[i] - pos - 1));
        var start = a[i];
        while (a[i+1] == a[i] + 1) i++
        aSeperators.push(s.substr(start, a[i]-start+1));
        pos = a[i];
    }
    return [aContent, aSeperators];
}


function multijoin(aContent, aSeperators) {
    var s=aSeperators[0];
    for (var i=0; i<aContent.length; i++) {
        s+=aContent[i]
        s+=aSeperators[i+1]
    }
    return s;
}

function getSelectedTextNodes() {
    var selectedRange = window.getSelection().getRangeAt(0);
    var a = [];
    var range = document.createRange();
    function r(n) {
        for (var i=0;i<n.childNodes.length; i++) {
            r(n.childNodes[i]);
        }
        if (n.nodeType == 3) {
            // START_TO_START = 0, START_TO_END = 1, END_TO_END = 2, END_TO_START = 3
            // 1=before, 0=equal, -1=after
            range.selectNode(n);
            // if range ends before selection, we cannot use it
            if (selectedRange.compareBoundaryPoints(3,range) == 1) return;

            // if range starts after selection, we cannot use it
            if (selectedRange.compareBoundaryPoints(1,range) == -1) return;
            
            a.push(n);
        }
    }
    r(selectedRange.commonAncestorContainer);
    return a;
}

// ---------------------------
//      Helping functions
// ---------------------------

/**
 *  Get a random noun, and bent it
 */
function getRandomNoun(gender, bojning, id, callback) {
    // frequencies of words starting with each letter (a-å)
    // (q has weight 0 since no Danish 5-letter nouns start with q):
    // sum of all frequencies: 64018
    var hyppighed = [3194, 4540, 759, 2651, 1556, 5221, 2658, 3141, 1890, 526,4979, 2327, 3086, 1665, 2074, 3480, 0, 2455, 8460, 3845, 2315, 2230, 78, 20, 102, 77, 262, 252, 175];

    // pick random (weighted) starting letter:
    var r = Math.floor(Math.random()*64018);
    //var r = Math.floor(Math.random()*3194);
    var sum = hyppighed[0]
    var startbogstav = 0
    while (sum<r) {
        startbogstav+=1;
        sum+=hyppighed[startbogstav]
    }

    var bogstavhyppighed = hyppighed[startbogstav]
    var startindex = Math.floor(Math.random()*bogstavhyppighed);

    // translate from chosen character code into actual letter

    switch (startbogstav) {
        case 26:
            startbogstav = 'æ';
            break
        case 27:
            startbogstav = 'ø';
            break
        case 28:
            startbogstav = 'å';
            break
        default:
            startbogstav = String.fromCharCode(startbogstav+97);
    }
    
	function doRequest() {
		GM_xmlhttpRequest({
			method:"GET",
			url:'http://www.retskrivningsordbogen.dk/ro/dataservlet?p1=' + startbogstav + '&p2=false&p3=' + startindex + '&p4=' + (startindex + 40),
			onload:function(result) {
				var s = result.responseText;
				//var re = new RegExp("sb.</a></i>, -?([^\.\,]*" + gender + ")[\., ]", "i");
				//var result = s.match(re)
				//alert("gender:" + gender)

				var pos = s.indexOf('<div');
				s = s.substr(pos, s.lastIndexOf('</div>') - pos);
				var a = s.split("<p>");
				
				var re = new RegExp("<b>([^<]*).*?sb\.</a></i>, (.*?)</p>", "i");
				for (var i=0; i<a.length; i++) {
					var s=a[i];
					var result = s.match(re);
					if (result) {
						var word = result[1];
						var rest = result[2];
						var bent = bentIt(word, rest, bojning, gender)
						if (bent) {
							callback.call(null, bent, id);
							return
						}
					}
				}
				startindex+=40;
				if (startindex > bogstavhyppighed) startindex=0;
				doRequest();
			}
		})
	}
	doRequest();
}


// returnerer bøjet ord, eller false (hvis ikke det kan bøjes - eller køn er galt)
function bentIt(word, rest, bojning, gender) {
    var first = rest.match(/([^., <]*)/i)[1];
    if (first.charAt(first.length - 1) != gender) {
        //alert('wrong gender: "' + first.charAt(first.length - 1) + '" is not: "' + gender + '"')
        return false;
    }
    function helper() {
        var b = bojning;
        switch (b) {
            case "ental, ubestemt":
                return word;
            case "ental, bestemt":
                // hvis der blot står "en" eller "et", betyder det at ordet næppe forekommer i bestemt form sigularis "køb dig en badminton"
                if (rest.match(/^e[nt][., <]/)) return false;
                if (rest.charAt(0) == "-") return word + rest.match(/^-(.*?)[., <]/)[1];
                return rest.match(/(.*?)[., <]/)[1];
            case "flertal, ubestemt":
                var form = rest.match(/^.*, (.*?)[., <]/);
                if (!form) return false;
                if (form[1].charAt(0) == "-") return word + form[1].substr(1);
                return form[1];
            case "flertal, bestemt":
                var m = rest.match(/bf.<.a> <a class="popup" href="javascript:;" title="pluralis .flertal.">pl.<.a><.i> (.*?)[., <]/)
                if (m) {
                    if (m[1].charAt(0) == "-") return word + form[1].substr(1);
                    return m[1];
                }
                else {
                    // Hvis ikke der er angivet "bf. pl.", så er det bare at tilføje endelsen "-ne"
                    var ub = bentIt(word, rest, "flertal, ubestemt", gender);
                    if (!ub) return false
                    return ub + "ne";
                }
        }
    }
    var ejefald = (bojning.indexOf('ejefald') > 0)
    if (ejefald) bojning = bojning.replace(/, ejefald/, '');
    var b = helper();
    if (!b) return b;
    if (ejefald) b+='s';
    return b;
}

// liste over 120 mest brugte ord: http://www.blogbogstaver.dk/ordkloeveren/2006/01/nu_er_det_jo_s.html
// "viser,kender,for,lade,lader,ham,have,hele,men,os,skal,tog,ved,fortsætter" bruges sjældent som substantiv 
var sIkkeSubstantiver = ',mit,en,nogen,dine,svag,af,sit,end,altid,bløde,eller,føre,går,holder,tvinges,søger,indre,din,alt,længes,al,slags,stod,egen,flere,ny,aldrig,slut,sluts,at,du,viser,kender,lade,lader,er,være,bliver,bort,da,de,dem,den,der,deres,det,dig,dog,et,fik,fin,for,forbi,fordi,fra,fri,få,gik,glad,godt,ham,hans,har,havde,have,hele,heller,hen,hende,her,hun,hvad,hvem,hver,hvilke,hvis,hvor,i,igen,ikke,ind,jeg,jer,jeres,jo,kan,kom,kommer,kun,kunne,lang,lidt,lige,lille,løb,man,mange,med,meget,men,mere,mig,min,mod,må,ned,nej,noget,nok,nu,når,og,også,om,op,os,over,på,sagde,se,selv,sidste,sig,siger,sin,sine,skal,skulle,små,som,stor,store,så,til,tog,ud,under,var,ved,vi,ved,ville,være,været,fortsætter,finder,'
var words = [];

/*
 *  Analyze word (noun)
 *
 *  Note: p.t kan funktionen kun analysere navneord
 *  
 *  Callback bliver kaldt med resultatet:
 *
 *  òrdforme: fx "substantiv", "substantiv,verbum" eller "ukendt"
 *
 *  for navneord:
 *  grundform: ie "vinge"
 *  bojning: ie "flertal, ubestemt"
 *  kon: gender ("t" or "n")
 *  
 */
function analyzeNoun(word, id, callback) {
    //alert(word)
    GM_xmlhttpRequest({
        method:"GET",
        url:'http://cst.dk/cgi-bin/defisto/defistony?q='+word,
        onload:function(result) {
			var s = result.responseText;
			
			var aCheckFor = ['substantiv','verbum','adjektiv','adverbium','præposition','unik','konjuktion'];
            var aOrdforme = [];
			
			
			for (var i=0; i<aCheckFor.length; i++) {
				var pos = s.indexOf('&ndash;&nbsp;' + aCheckFor[i]);
				if (pos > 0) aOrdforme.push(aCheckFor[i]);
			}
			sOrdforme = aOrdforme.join(',');
            
			var pos = s.indexOf('&ndash;&nbsp;substantiv');
            if (pos>0) {
                var bojning = '(ental, ubestemt)';
                var grundform = '';
                var kon = "t";   // "t" eller "n"
                var sProblems = '';
				
                // find bøjning
                pos2 = s.indexOf('&rarr;(', pos);
                if (pos2 > 0) {
                    pos2+=7;
                    bojning = s.substr(pos2, s.indexOf(')', pos2) - pos2);
                    
                    // find grundform
                    pos3 = s.indexOf('(ental, ubestemt)', pos);
                    if (pos3 > 0) {
                        pos3 = s.lastIndexOf('</a>', pos3);
                        var pos4 = s.lastIndexOf('>', pos3);
                        pos4++;
                        grundform = s.substr(pos4, pos3 - pos4);
                    }
                    
                    // find køn
                    // todo: ord som "lader" og "slut" er et problem
                    pos3 = s.indexOf('(ental, bestemt)', pos);
                    if (pos3 > 0) {
                        pos3 = s.lastIndexOf('</a>', pos3);
                        kon = s.charAt(pos3-1);
                        if ((kon == "n") || (kon == "t")) {
							
                        }
						else {
							sProblems += "Køn kunne ikke bestemmes. ";
							kon = 't';
						}
                    }
                    else {
                        if (GM_getValue("not_bentable_in_ental_bf") == null) {
                            GM_setValue("not_bentable_in_ental_bf", ",")
                        }
                        if (GM_getValue("not_bentable_in_ental_bf").indexOf("," + word + ",") == -1) {
                            GM_setValue("not_bentable_in_ental_bf", GM_getValue("not_bentable_in_ental_bf") + word + ",");
                        }
						kon = "t"
                    }
                    
                }
                else {
					sProblems += "Fandt ikke bøjning. ";
                }
				callback.call(null, id, sOrdforme, [grundform, bojning, kon]);
            }
            else {
                //document.title = "Ikke navneord: " + word;
                if (GM_getValue("not_noun").indexOf("," + word + ",") == -1) {
                    GM_setValue("not_noun", GM_getValue("not_noun") + word + ",");
                }
				callback.call(null, id, sOrdforme);
            }
        }
    });
}

// -------------------
//      Main stuff
// -------------------

function replaceNounsWithRandomNouns(node, bAcceptAll) {
    if (GM_getValue("not_noun") == null) GM_setValue("not_noun", ",");
    
    var aMultiSplit = multisplit(node.data, [' ',String.fromCharCode(160),'.',',',';',':','!','?','\n'])
        
    var a = aMultiSplit[0];
	var countdown = a.length;
	var rapport_noun = '';
	var rapport_notnoun = '';
	
    for (var i=0; i<a.length; i++) {
        var word = a[i].toLowerCase();
        if (
			(word == '') ||
            (sIkkeSubstantiver.indexOf(','+word.toLowerCase()+',') >= 0) ||
            (GM_getValue("not_noun").indexOf("," + word + ",") != -1)) {
				countdown--;
				continue;
		}
		
        word = escape(word);
		var id = i;
        analyzeNoun(word, id, function(id, sOrdformer, resultat) {
			countdown--;
			var bAccept = (bAcceptAll ? (sOrdformer.indexOf('substantiv') >= 0) : (sOrdformer == 'substantiv'));
			if (bAccept) {
				var grundform = resultat[0];
				var bojning = resultat[1];
				var kon = resultat[2];
				
				rapport_noun += a[id] + ' (Grundform:' + grundform + ', Bøjning:' + bojning + ', Køn:' + kon + ')\n';

            //alert('Ord: "' + a[id] + '"\nGrundform: "' + grundform + '"\nBøjning: ' + bojning)
				getRandomNoun(kon, bojning, id, function(randomNoun, id) {
					a[id] = randomNoun;
					node.data = multijoin(a, aMultiSplit[1]);
				})
			}
			else {
				rapport_notnoun += a[id] + ':' + resultat + '\n';
			}
			if (countdown == 0) {
				//alert('Navneord:\n'+rapport_noun+'\n\nIkke navneord:\n'+rapport_notnoun);
			}
        })
    }
}
function replaceNounsWithRandomNouns1(node) {
	replaceNounsWithRandomNouns(node, true);
}
function replaceNounsWithRandomNouns2(node) {
	replaceNounsWithRandomNouns(node, false);
}

window.LIPKeyPressEvent = function(e) {
    var a = getSelectedTextNodes();
    var functions = {
        U: function upperCase(node) {node.data = node.data.toUpperCase()},
        S: function scrambleWords(node) {
            var a = node.data.split(' ');
            for (var i=0; i<a.length; i++) {
                var ran = Math.floor(Math.random()*a.length);
                var temp = a[i];
                a[i] = a[ran];
                a[ran] = temp;
            }
            node.data = a.join(' ');
        },
        N: replaceNounsWithRandomNouns1,
		n: replaceNounsWithRandomNouns2
    }
    var f = functions[String.fromCharCode(e.charCode)];
    if (f) {
        for (var i=0; i<a.length; i++) {    
            f.call(null, a[i]);
        }
    }
}

document.addEventListener('keypress', window.LIPKeyPressEvent, false);
