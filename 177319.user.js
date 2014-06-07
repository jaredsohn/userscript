// ==UserScript==
// @name       Mac String Crash Fix
// @namespace   http://userscripts.org/users/470323
// @description Fixes the string that causes mac apps to fail and crash. Just for Maria <3
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// @version       1.3
// ==/UserScript==

// For testing
// document.body.style.background = "#FF00FF";

// Borrowed from: http://userscripts.org/scripts/review/41369
// Thanks, Joe.
// Too lazy to right my own regex to replace this sheeeeeet

var words = 
    {
        // Syntax: 'Search word' : 'Replace word',
        "سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ":"[MAC CRASH FIX]",
        "":""
    };


// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() 
{
    return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

// Function to decide whether a parent tag will have its text replaced or not
function isOkTag(tag) 
{
    return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}

// Convert the "words" JSON object to an Array
var regexs= new Array(), replacements=new Array();
for(var word in words) 
{
    if(word != "") 
    {
        regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
        replacements.push(words[word]);
    }
}

// Do the replacement
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) 
{
    if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) 
    {
        for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
    }
}