// ==UserScript==
// @name StudiVz/MeinVz - Emotions4Vz
// @author Lukasz Wolejko-Wolejszo
// @description Emoticons f√ºr studiVz/meinVz Nachrichten
// @include http://www.studivz.net/*
// @include http://www.meinvz.net/*
// @include http://www.studiqg.fr/*
// @include http://www.studiln.it/*
// @include http://www.studentix.pl/*
// @include http://www.estudiln.net/*
// ==/UserScript==

//July 14th, 2008 - v0.4 - Smileys jetzt in gewohner Notation
//July 13th, 2008 - v0.3 - Smileys auch bei MeinVz
//July 13th, 2008 - v0.2 - Smileys in allen Nachrichten
//July 12th, 2008 - v0.1 - Smileys bei neuen Nachrichten

addEventListener('load', function(event){
	//Array und Variablen Kram
    var aktiv; var sp = new Array(); var sc = new Array(); var st = new Array();
    
	//Bilder URLs
	sp[0]="mVZ_Emoticon_15.gif"; for(i=1;i<39;i++){ sp[i]="sVZ_Emoticon_"+i+".gif "; }

	//Codes
	sc=Array(
		"$%&1899","$%&1","$%&2","$%&3","$%&4","$%&5","$%&6","$%&7","$%&8","$%&9","$%&10","$%&11","$%&1521","$%&1747","$%&1853",
		"$%&1897","$%&1903","$%&2189","$%&2276","$%&2376","$%&2454","$%&2365","$%&2471","$%&2498","$%&2571","$%&2588","$%&3333","$%&4444","$%&4578","$%&5555",
		"$%&5783","$%&5912","$%&6173","$%&6262","$%&6398","$%&7834","$%&7867","$%&7912","$%&8121"
		);
	
	//Neue Codes
    st[0] = Array("(meinvz)","(meinVz)");
	st[1] = Array(":-)", ":)");
	st[2] = Array(":-D", ":D", "xD", "=D", ":d", ":-d");
	st[3] = Array(";-)", ";)");
	st[4] = Array(":-(", ":(");
	st[5] = Array(":-P", ":-p", ":p", ":P");
	st[6] = Array(":'(", ":'-(", ":,(");
	st[7] = Array("(blush)",":-*)");
	st[8] = Array("(inlove)");
	st[9] = Array(":-O", ":-o", ":O", ":o");
	st[10] = Array(":-s", ":s", ":-S", ":-s");
	st[11] = Array("(S)", "(s)", "(sleep)");
	st[12] = Array(":-X");
	st[13] = Array(":@", ":-@");
	st[14] = Array(":?", ":-?");
	st[15] = Array("(studiVz)","(studivz)");
    st[16] = Array("(skull)");
	st[17] = Array(":-/");
	st[18] = Array(":*",":-*");
	st[19] = Array("(!)");
	st[20] = Array("(?)");
	st[21] = Array("(sun)");
	st[22] = Array("(rain)");
	st[23] = Array(":-|", ":|");
	st[24] = Array("]:-)", ">:-)", ">:)", "}:->", "(6)","(devil)");
	st[25] = Array("0:-)", "0:)","(angel)");
	st[26] = Array("(H)", "(h)");
	st[27] = Array("(BH)", "(bh)", "Bh");
    st[28] = Array("(hot)");
	st[29] = Array("(hug)");
	st[30] = Array("(g)", "(G)");
	st[31] = Array("(peace)","(p)");
	st[32] = Array("(berlin)","(b)");
	st[33] = Array("(cake)");
	st[34] = Array("B)", "B-)", "8)", "8-)");
    st[35] = Array("(coffee)");
	st[36] = Array("<:o)", "<:O)","(party)");
	st[37] = Array("(xmas)");
	st[38] = Array("(y)", "(Y)");
    
	//Textbox zur√ºckgeben
    function findTextarea(){
        var ta = document.getElementsByTagName("textarea"); var rt = false;     
        for (i = 0; i < ta.length; i++) if (ta[i].id.indexOf("Messages_message", 0) != -1) rt = ta[i];	
        return rt;      
    }
    
    
    //Hinzuf√ºgen
    function add_emoticon(ob){
    	c=ob.parentNode;
		el=document.createElement("label");
		el.setAttribute("for","Messages_emotionslist");
		el.innerHTML = "Emotions:";	
		c.appendChild(el);
		
        mt = document.createElement("div");
        mt.className = "buttonArea";
		mt.style.background="#FFE0E0";		
		mt.style.border="1px solid #000000";
		mt.style.padding="3px";
		mt.style.float="left";
		mt.style.marginTop="-10px";
		mt.style.width="76%";
        mt.style.fontSize = "11px";
        mt.align = "left";
        ob.form.appendChild(mt);
        
        for (i = 0; i < sp.length; i++) {
            mm = document.createElement("a"); mm.href = "javascript:void(0);";
            mm.innerHTML = "<img src='http://static.pe.studivz.net/Img/Smiley/" + sp[i] + "' title='" + sc[i] + "'> ";
			
            mm.addEventListener("click", function(event){
                var current_ta = findTextarea();
                var title = this.getElementsByTagName('img')[0].getAttribute("title");
                
                for (i = 0; i < sc.length; i++) if (sc[i] == title) { 
					if (st[i].length > 0) title = st[i][0]; 
					break;
                 }
                

                if (current_ta) {
                    var startPos = current_ta.selectionStart;
                    var endPos = current_ta.selectionEnd;
                    
                    current_ta.value = current_ta.value.substring(0, startPos) +" "+title+" "+ current_ta.value.substring(endPos, current_ta.value.length);
                    
                    startPos += title.length+2;
                    current_ta.focus();
                    current_ta.selectionStart = startPos;
                    current_ta.selectionEnd = startPos;                 
                }
            }, true);
			   
            mt.appendChild(mm);
        }
               
        //F√ºr das √úbersetzen
        var replace_on_submit = function(event){
            var current_ta = findTextarea();
             var s = current_ta.value;
                    
             for (i = 0; i < st.length; i++) for (j = 0; j < st[i].length; j++) s = s.split(st[i][j]).join(sc[i]); 
                    
             current_ta.value = s;
        }
        
        var submit_button = ob.form.getElementsByTagName('input');
        var b_s = false;
        for (i = 0; i < submit_button.length; i++) if ((submit_button[i].type == "submit") || (submit_button[i].type == "button")) {
                submit_button[i].addEventListener("mousedown", replace_on_submit, false);
                b_s = true;
            }      
    }
    
	//F√ºr alle b√∂sen Ajax Aufrufe
    function ajax_call(){
        if (aktiv) window.clearInterval(aktiv);
        
        aktiv = window.setInterval(function(){
            var mb = findTextarea();
            
            if (mb) { if (aktiv) window.clearInterval(aktiv); 
				add_emoticon(mb.parentNode);
            }
        }, 500);
    }
    
	//Bei Nachrichten
    if((document.location.href.indexOf("Messages/Write", 0) != -1)) {
        var mb = document.getElementById("Messages_message");
        if (mb) {
            add_emoticon(mb.parentNode);
        }
    }
	//Bei Antworten etc.
    else {
        var il = document.getElementsByTagName('a');
        
        for (i = 0; i < il.length; i++) 
			if ((il[i].href.indexOf("Messages/Reply", 0) != -1) || 
				(il[i].href.indexOf("Messages/ForwardMessage", 0) != -1) || 
				(il[i].href.indexOf("Messages/Inbox", 0) != -1)) il[i].addEventListener("click", ajax_call, false);
    }
    
}, false);