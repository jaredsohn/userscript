// ==UserScript==
// @name            InsultMacro   
// @namespace       robotnudist@gmail.com
// @description     expands pie-eating cock monster to a randomly generated insult
// @include         *
// ==/UserScript==

function choice(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function randomInsult() {
    adj_one = ["lazy", "stupid", "insecure", "idiotic", "slimy", "slutty", 
               "smelly", "pompous", "communist", "dicknose", "pie-eating", 
               "racist", "elitist", "white trash", "drug-loving", "butterface", 
               "tone-deaf", "ugly", "creepy"]
    adj_two = ["douche", "ass", "turd", "rectum", "butt", "cock", "shit", 
               "crotch", "bitch", "turd", "prick", "slut", "taint", "fuck", 
               "dick", "boner", "shart", "nut", "sphincter"]
    noun = ["pilot", "canoe", "captain", "pirate", "hammer", "knob", "box", 
            "jockey", "nazi", "waffle", "goblin", "blossom", "biscuit", "clown",
            "socket", "monster", "hound", "dragon", "balloon"]
    return choice(adj_one)+" "+choice(adj_two)+" "+choice(noun);
};

function capInitial(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function insultMacro(e) {

    if (!e) var e = window.event;

    // which textarea are we in
    thisarea = (e.target) ? e.target : e.srcElement;
    // replace text
    vv = thisarea.value;
    vv = vv.replace(/(\\)?\\insult/g, function ($0, $1) { return $1?$0: randomInsult();});
    vv = vv.replace(/(\\)?\\Insult/g, function ($0, $1) { return $1?$0: capInitial(randomInsult());});
    thisarea.value = vv;
}

function addTextAreaHandler(e) {
    
    console.debug(e.target.tagName)
    var target = e.target ? e.target : e.srcElement;
    if (target.tagName == "TEXTAREA")
        if (target.addEventListener)
            target.addEventListener("keydown",insultMacro,0);
        else if (target.attachEvent)
            target.attachEvent("onkeydown",insultMacro);
}

function Init () {
    var form = document
    if ("onfocusin" in form) {  // Internet Explorer
        // the attachEvent method can also be used in IE9,
        // but we want to use the cross-browser addEventListener method if possible
        if (form.addEventListener) {    // IE from version 9
            form.addEventListener ("focusin", addTextAreaHandler, false);
        }
        else {
            if (form.attachEvent) {     // IE before version 9
                form.attachEvent ("onfocusin", addTextAreaHandler);
            }
        }
    }
    else {
        if (form.addEventListener) {    // Firefox, Opera, Google Chrome and Safari
            // since Firefox does not support the DOMFocusIn/Out events
            // and we do not want browser detection
            // the focus and blur events are used in all browsers excluding IE
            // capturing listeners, because focus and blur events do not bubble up
            form.addEventListener ("focus", addTextAreaHandler, true);
        }
    }
}

Init();
