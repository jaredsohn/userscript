// ==UserScript== 
// @name Greenfilter block cultural marxist propaganda (German)
// @namespace none 
// @description Fight political correctness, browse with freedom of thought 
// @include * 
// @version 0.1
// @homepage http://userscripts.org/scripts/
// ==/UserScript==

/* 
   If you plan on editing this script and publishing your own version
   the following lines must be included somewhere in your source code
   somewhere between lines 1 and 40. 

   Based on Jmaxxz vulgar word blocker @version 3.01.04, which in turn
   is based on a script in Mark Pilgram's upcoming "Dive into
   Greasemonkey" The Jmaxxz Vulgar Word Blocker can be found at:
   http://userscripts.org/scripts/show/2287 A Special thank you goes
   to rschultz2002 and Giorgio Maone for their help in the making of
   this script */ 










//WARNING
// DO NOT SCROLL DOWN this script contains language that
// may be offensive.


















    (function() { 
        var bad = [], good = [], modifiers = [];


        // START CONFIGURATION 

        populate({  
                // This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently 

                // Terms are listed as comma separated couples of words, in the form 
                // "Bad word": "replacement"
                // You can place an optional modifier after a slash ("/") at the end of the bad word. 
                // The supported modifier "c", standing for "context",
                // which means that the word could be "not evil", but you are just changing it to be on the safe side, 
                // and thus it should not be replaced in domain names (i.e. it doesn't cause redirections) 

                //The support modifier "r", standing for redirect 
                //This means a word will not be changed except in domain names (i.e. the word will only cause redirects)


                // The support modifier "n", stands for new
                // it does not change how the word is handled by the script,
                // rather it is just so the developer know what he/she has changed in the latest build
                // incase something goes wrong 
 

                // [Place custom word list below] 

                //safe replace (i.e. words which means that the word could be "not evil", but you are just  
                //changing it to be on the safe side)

 		"Al-Quaida": "All-Muslim-Djihad",

                    //B
                    // "BITCHING" : "COMPLAINING",
                    // "bottleguy/r": "google",
		"Bundespräsident Wulff": "Türkenaugust Wulff",
                    "Bundespräsident Christian Wulff": "Bundespräsident und Hochverräter Christian Wuff",
		    "mit Betroffenheit": "mit gespielter Betroffenheit",
		    "mit Empörung": "mit scheinbarer Empörung",
		    "biologistisch": "vernünftig",
                    "biologistischen": "vernünftigen",

                    //C
		"Claudia Roth": "Claudia Fatima Rotz",
		    "Daniel Cohn-Bendit": "Daniel Pädo-Bandit",
                    "Cohn-Bendit": "Pädo-Bandit", 
                    //D
 
                    //E

                    //F
 
                    //G
		"von den Grünen": "von den einwanderungspolitischen Triebtätern",
		    "die Grünen": "die grünen Staatsfeinde",
                    "Die Grünen": "Die grünen Verfassungsfeinde",
                    "Den Grünen": "Den grünen Deutschenhassern",
                    "der Grünen": "der grünen Demokratiefeinde",
                    //H
                    // "What the hell": "What the!?",
                    // "WHAT THE HELL": "WHAT THE!?",

                    //I
		    "Islam ": "Islam-Faschismus ",
		    "Integration": "Islamisierung",
		    "Islamisten": "Moslems",

                    //J
                    // "Jackass/c": "Donkey",

                    //K

                    //L

                    //M
		    "multikulturelle": "gutmenschlich faschistische",

                    //N

                    //O

                    //P
                    // "Pussy cat/c": "Kitty cat",
                    // "Pussycat/c": "Kitty cat",
		    "Protestanten": "Protestunten",
                    //Q

                    //R
		    "Rechtspopulist": "Widerstandskämpfer",

                    //S
		    "Südländer": "Moslems",
		    "Europaabgeordnete Martin Schulz": "Blockwart Martin Schulz",
		    "Europaparlamentarier Martin Schulz": "Vaterlandsverräter Martin Schulz",

                    //T

                    //U

                    //V

                    //W

                    //X

                    //Y

                    //Z   

  
      

  
         
  
                    // [End of custom word list]   
                    }, "g"); 

        populate({
                // This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same. 

                // Terms are listed as comma separated couples of words, in the form 
                // [Place custom word list below]

                //safe replace (i.e. words which means that the word could be "not evil", but you are just  
                //changing it to be on the safe side)

                //A
                // "asshole": "nitwit",

                    //B

                    //C

                    //D

                    //E

                    //F

                    //G

                    //H

                    //I

                    //J

                    //K

                    //L

                    //M

                    //N

                    //O

                    //P

                    //Q

                    //R

                    //S

                    //T

                    //U

                    //V

                    //W

                    //X

                    //Y

                    //Z 
                    // [End of custom word list]
                    //test
                    // "1t2e3s4t5test/r": "google", 

                    }, "gi"); 



        // END CONFIGURATION (don't touch anything below, unless you know what you're doing... 

        function populate(replacements, flags) { 
            var word, modPos, mod; 
            for(var key in replacements) { 
                if((modPos = key.indexOf("/")) > -1) { 
                    mod = key.substring(modPos + 1); 
                    word = key.substring(0, modPos); 
                } else { 
                    mod = ""; 
                    word = key; 
                } 
                modifiers.push(mod); 
                bad.push(new RegExp(word, flags)); 
                good.push(replacements[key]); 
            } 
        } 



        // this function does the replacements 
        function sanitize(s, noContext, notredirect) { 
        
            for (var j = 0; j < bad.length; j++) { 
                if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") !=-1 ) {  
                    continue;
                } 
                s = s.replace(bad[j], good[j]);
            } 
            return s;  
        } 

        // replace in title 
        if(document.title) 
            {
                var temp = sanitize(" "+document.title+" ", false , true);
                document.title = temp.substring(1,temp.length -1);
        
            }

        // replace in body text 
        var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
        for (var i = 0; i < textnodes.snapshotLength; i++) { 
            node = textnodes.snapshotItem(i);
            node.data = sanitize(" "+node.data+" ", false, true);
            node.data = node.data.substring(1,node.data.length -1);
        }

    })();


