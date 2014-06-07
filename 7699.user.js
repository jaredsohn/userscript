// ==UserScript==
// @name            Engelsk-Dansk
// @description     Select a word, and immidiately see the translation (English to Danish). The script looks up the word in ordbogen.com. If you dont have an account, you will only be able to look up two words a day.
// @source          http://userscripts.org/scripts/show/7699
// @identifier      http://userscripts.org/scripts/source/7699.user.js
// @version         1.1.1
// @date            2007-02-26
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         *
// ==/UserScript==

/*
Based on "QuickiWiki" by script by Tarmle (http://www.ruinsofmorning.net/greasemonkey/)
*/

// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------

function autoupdate() {
    // only check for updates one time a day
    var d = new Date();
    if (GM_getValue('lastcheck') == d.getDate()) {
        return
    }
    GM_setValue('lastcheck',d.getDate());
    
    // check for update
    GM_xmlhttpRequest({
        method:"GET",
        url:'http://userscripts.org/scripts/source/7699.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version         1.1.1') == -1) {
                var elmInsertPoint = document.body;
                var elmA = document.createElement("a");
                elmA.setAttribute("href", "http://userscripts.org/scripts/source/7699.user.js");
                elmA.appendChild(document.createTextNode('Der er en ny version af "Engelsk-Dansk" scriptet. Klik her for at installere'));
                elmInsertPoint.insertBefore(elmA, elmInsertPoint.firstChild);
            }
        }
    });
}
autoupdate();

// ------------------------------------------------------------------------------------
//                              Part 1: The rest
// ------------------------------------------------------------------------------------

d = document;

// Build QWBox //
qwbox = document.createElement('div');
qwbox.setAttribute('id', 'QuickiWikiBox');
qwbox.setAttribute('style', "display: none; z-index: 1000; font-size: 8pt; font-family: Verdana,sans-serif; text-decoration: none; line-height: 1.1em; position: fixed; top: 0px; right: 0px; width: 260px; background: white; border-left: solid 1px #555; border-bottom: solid 1px #555; color: #222; text-align: left; padding: 3px;");
d.body.appendChild(qwbox);

// QWBox Content //
// Selected text quote area//
/*
nlnk = d.createElement('a');
nlnk.setAttribute('title', "From Greasemonkey User Script 'qwikiwiki.user.js'");
nlnk.setAttribute('style', 'display: block; padding: 2px; text-decoration: none; color: #337;');
ntxt = d.createTextNode('Look Up');
nlnk.appendChild(ntxt);
qwbox.appendChild(nlnk);
qdiv = d.createElement('div');
qdiv.setAttribute('style', 'border: solid 1px #555; margin: 1px; padding: 2px; background: #dde;');
qdiv.setAttribute('id', 'QWBoxQuote');
qwbox.appendChild(qdiv);
*/

// Prevent miss-clicks from hiding QWBox //
window.QWBpointer = false;
qwbox.addEventListener('mouseover', function(e){
	window.QWBpointer = true;
	d.getElementById('QuickiWikiBox').style.borderLeft = 'solid 1px #77f';
	d.getElementById('QuickiWikiBox').style.borderBottom = 'solid 1px #77f';
}, false);
qwbox.addEventListener('mouseout', function(e){
	window.QWBpointer = false;
	d.getElementById('QuickiWikiBox').style.borderLeft = 'solid 1px #555';
	d.getElementById('QuickiWikiBox').style.borderBottom = 'solid 1px #555';
}, false);


// Selected Text Event Function // 
window.QWSelectEvent  = function () {
	// Was this a miss-click? //
	if (window.QWBpointer) {return;} 

	// Ensure QWBox is available //
	if (box = document.getElementById('QuickiWikiBox')) {
		// Good, lets go //
		// Check for selected text //
		if (window.getSelection() > '') {
			// Get Text //
			seltxt = window.getSelection();
			seltxt = String(seltxt);
			seltxt = seltxt.replace(/(^\s+|\s+$)/g, '');

			// Kill HTML //
			seltxt = seltxt.replace(/"/g, "'");
			seltxt = seltxt.replace(/>/g, '&gt');
			seltxt = seltxt.replace(/</g, '&lt');

			// Hide on Big Selections //
			if (seltxt.length > 40) {box.style.display = 'none'; return;}

			// Truncate on Long Selections //
			//if (seltxt.length > 30) {seltxt = seltxt.substring(0,30);}

			// QWBox Content //
			// Selected text quote //
			/*qbox = d.getElementById('QWBoxQuote');
			kids = qbox.childNodes;
			for (i in kids) {if (kids[i].nodeType) {qbox.removeChild(kids[i]);}}
			qtxt = d.createTextNode(seltxt);
			qbox.appendChild(qtxt);*/

                        lookup(seltxt);
			// Wikipedia links //
			//wphref = 'http://en.wikipedia.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
			//d.getElementById('QWBwikipediaLSW').setAttribute('href', wphref);
			//d.getElementById('QWBwikipediaLNW').setAttribute('href', wphref);


			box.style.display = 'block';
		} else {
			// Hide QWBox if there is no selection //
			box.style.display = 'none';
		}
	} else {
		// Call the whole thing off //
		//clearInterval(window.QuickieWikiIID);
		document.removeEventListener('mouseup', window.QWSelectEvent,false);
		return;
	}
}


// Set Up Selection Event Watch //
document.addEventListener('mouseup', window.QWSelectEvent, false);
//window.QuickieWikiIID = setInterval(window.QWSelectEvent, 2000);

function lookup(word) {
    qwbox.innerHTML = 'Looking up: ' + word;
    //    headers: {'UserAgent': 'Mozilla/4.0 (compatible)'},
    GM_xmlhttpRequest({
        method:"GET",
        url:"http://ordbogen.com/opslag.php?dict=enda&word=" + word,
        onload:function(result) {
            if (result.status != 200) {
                qwbox.innerHTML = "Kunne ikke slaa ordet op<br>Server fejl:" + result.status;
                return
            }
            var s = result.responseText;
            var s2 = '';
            var pos1 = 0;
            var pos2 = 0;
            qwbox.innerHTML = 'Lookup finished';
                        
            while (true) {
                pos1 = s.indexOf('<div style="padding-bottom:8px">', pos2);
                if (pos1 == -1) break;
                pos2 = s.indexOf('</div>', pos1);
                if (pos2 == -1) break;
                var pos3 = s.indexOf('javascript:toggle', pos1);
                if (pos3 == -1) {
                    s2 += s.substr(pos1, pos2-pos1+6);
                }
                else {
                    s2 += s.substr(pos1, pos3-pos1);
                    var id = s.substr(pos3+19, s.indexOf("'", pos3+19) - pos3-19);
                    s2 += "javascript:var st=document.getElementById('" + id + "').style; st.display = (st.display=='none'?'block':'none');"//.style.display = "block").getElementById("daen_1"))
                    //s2 += "javascript:alert('" + id + "')";
                    pos3 = s.indexOf(';',pos3);
                    s2 += s.substr(pos3, pos2-pos1+6);
                }
            }
            if (s2.length==0) {
                // Alle gratisopslag er brugt
                if (s.indexOf("Alle gratisopslag er brugt") > 0) {
                    qwbox.innerHTML = "Kunne ikke slaa ordet op<br>Alle gratisopslag er brugt"
                    return
                }

                // Dine daglige opslagsord i ordbogen Engelsk-Dansk er opbrugt for det netvýrk du befinder dig pý. Hvis du har yderligere behov for at lave opslag, kan vi foreslý dig at kýbe adgang til ordbogen.
                if (s.indexOf("Dine daglige opslagsord") > 0) {
                    qwbox.innerHTML = "Kunne ikke slaa ordet op<br>Dine daglige opslagsord i ordbogen Engelsk-Dansk er opbrugt for det netvaerk du befinder dig paa."
                    return
                }

                // Not logged in
                if (s.indexOf("re logget ind for at") > 0) {
                    qwbox.innerHTML = "Kunne ikke slaa ordet op<br>Ej logget ind"
                    return
                }

                qwbox.innerHTML = s;
            }
            else {
                qwbox.innerHTML = s2;
            }
        }
    });
}

