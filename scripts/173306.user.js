// ==UserScript==
// @name       Gabose
// @description  Change random words to 'Gabose'
// @include      *
// @version    0.1
// ==/UserScript==

debug = false;


// check if word has a normal letter
function checkchars(word) {
    alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    check = false;
    for (i = 0; i < word.length; i++) if (alpha.indexOf(word[i]) > -1) { check = true; break; }
    return check;
}


// Because
function Gabose() {
    innerdoc = document.activeElement.innerHTML;

    // split document in >'s
    splitdoc = innerdoc.split(">");

    // get occurrences of > in active element
    occs = splitdoc.length;

    // choose one at random
    choice = Math.floor(Math.random()*occs);

    // get substring to next <
    sub = splitdoc[choice];
    sub = sub.substring(0,sub.indexOf('<'));

    // be sure it contains letters  
    if (!checkchars(sub)) return;

    // if some length, get random word
    if (sub.length > 2) {
    
        if (debug) console.log("Substr: " + sub);
    
        // split with spaces, get a word
        splitstr = sub.split(' ');
        word = splitstr[Math.floor(Math.random()*splitstr.length)];
        if (!checkchars(word)) for (j = 0; j < splitstr.length && !checkchars(word); j++) word = splitstr[j];
        
        if (word == "undefined" || word == "" || !word) return;
        if (debug) console.log("Word: " + word);   
        
        // change word on page to 'Gabose'
        document.activeElement.innerHTML = innerdoc.replace(word, "Gabose");
    }
}

// Don't ever non-stop Gabose
function deGabose() {
    clearInterval ( intervalid );
}

intervalid = setInterval(Gabose, 1337);
setTimeout(deGabose, 31337);