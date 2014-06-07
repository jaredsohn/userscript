// ==UserScript==
// @name        Link correctifier
// @namespace   pavel
// @include     http://*hqbdsm.com/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
  
  function decode64(input) {
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
       // dump("There were invalid base64 characters in the input text.\n" +
       //       "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
       //       "Expect errors in decoding.");
        return "";
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

     } while (i < input.length);

     return unescape(output);
  }

function Manipulate (jNode) {
    if (!(jNode.attr('href').match(/\/o4.php.*/))) {
        return;
    }
    href = jNode.attr('href');
    
    //newhref = href.replace(/([&?]r=)[^&]*/, '$11y')
    url = decode64(href.replace(/(.o4.php.p=)(.*)/, '$2'));
    
    if (url !== "") {
        url = url.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
        url = url.replace(/\*.*/, "");
        jNode.attr('href', "http://"+url);
        dump(url+"\n");
    }
}
dump("---------------------------------------------------\n");

waitForKeyElements ("a", Manipulate);

function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
)
{
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                500
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

/*
Exception: jNone is not defined
Manipulate@Scratchpad/1:55
@Scratchpad/1:109
.each@http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js:2
e.prototype.each@http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js:2
waitForKeyElements@Scratchpad/1:103
@Scratchpad/1:72
*/
/*
Exception: jNode.href is undefined
Manipulate@Scratchpad/1:55
@Scratchpad/1:109
.each@http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js:2
e.prototype.each@http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js:2
waitForKeyElements@Scratchpad/1:103
@Scratchpad/1:72
*/