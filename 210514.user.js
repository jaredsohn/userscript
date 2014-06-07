// ==UserScript==
// @name          Immersive Immersion for Duolingo
// @namespace     http://expandier.co.uk/tutorials/web-programming/javascript/audio-playback-for-duolingo-translation-articles-immersive-immersion-script
// @description   Converts Duolingo sentences into auto during translation mode to create a more immersive
// @match   http://www.duolingo.com/*
// experience. Especially useful for learners who learn well though hearing aswellas reading.
// @version       1.1
// @grant         none
// ==/UserScript==
function exec(fn) {

    
var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    //document.body.removeChild(script); // clean up
}//End function exec





/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.
 
    Usage example:
 
        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );
 
        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }
 
    IMPORTANT: This function requires your script to have loaded jQuery.
*/
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
) {
    var targetNodes, btargetsFound;
 
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);
 
    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
 
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
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
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
//End wait for key elements.




waitForKeyElements ("#sentence-wrapper-10", doSomthing);



function doSomthing() {
    
        //Scroll to bottom of entire article 
    function t() {
            $(document).scrollTop($(document).height());
            setTimeout(t, 100)
    }
    
exec(function() {
var langDetect = duo.user.attributes.learning_language;
var delay = 0;
var sentence = document.getElementsByClassName('sentence-wrapper');
//alert(sentence.length + " sentences");

function playit(Chunks, ChunkNumber) {
	console.log("Function playit was called");
	var date = new Date().getTime();
	var query = encodeURI(Chunks[ChunkNumber]);
	var ttsQuery = 'http://translate.google.com/translate_tts?tl=' + langDetect + '&date=' + date + '&q=' + query;
	console.log(ttsQuery);
	var a = new Audio(ttsQuery);
	a.addEventListener('canplaythrough', function (ev) {
	    }, false);
	a.load();
	a.play();

	a.addEventListener("ended", function(){
	console.log("End of track " + ChunkNumber);
		//Incriment chunk number and check it's not greater than numChunks
		if(ChunkNumber < Chunks.length) {
			ChunkNumber = ChunkNumber + 1; //Incriment chunk number.
			console.log("Chunk num: " + ChunkNumber);

			if(ChunkNumber < Chunks.length) {
			playit(Chunks, ChunkNumber);
			}//Only play next chunk if exists.
		}else{
			console.log("ChunkNumber: (" + ChunkNumber + ") was not less than numChunks (" + numChunks + ")");
		}
	},false);
	
}




for (var x = 0; x < sentence.length; x++) {
    for (var i = 0; i < sentence[x].childNodes.length; i++) {
        if (sentence[x].childNodes[i].nodeType == 1 && sentence[x].childNodes[i].className.indexOf('show-hints') == 0) {
            console.log('ok');
            sentence[x].childNodes[0].childNodes[0].innerHTML;
            sentence[x].childNodes[0].childNodes[0].focus();
            sentence[x].childNodes[0].addEventListener('mouseover', function (e) {
                var sentenceId = e.target.parentNode.id;
                console.log(sentenceId);
                var sentenceObj = document.getElementById(sentenceId);
                var sentence = sentenceObj.childNodes[0].innerHTML;
                var length = sentence.length;
                var parts;
                parts = Math.ceil(length / 100);
                var index = 0;
                console.log('Number of parts: ' + parts);
                if (length > 100) {
				
			var chunks=[];//Array of chunks
			numChunks = parts;
console.log("long sentence...");
			//Loop put all parts of sentence into chunks array
			for(i=0;i<numChunks;i++){
				console.log('Part number: ' + i);
				chunks[i] = sentence.substr(index, 100);
				console.log('Chunk: ' + chunks[i]);
				index = index + 100;
				console.log('Index value: ' + index);
				numWords = chunks[i].replace(/(^\s*)|(\s*$)/gi, '');
				chunks[i] = chunks[i].replace(/[ ]{2,}/gi, ' ');
				chunks[i] = chunks[i].replace(/\n /, '\n');
				numWords = chunks[i].split(' ').length;
				console.log('Number of words in the chunk: ' + numWords);
				console.log('Chunk reads: ' + chunks[i]);
			}//End add each part of sentence to chunks array

			ChunkNumber = 0; //Initalise chunk number
			
			playit(chunks, ChunkNumber, langDetect);


                } else {
                    var date = new Date().getTime();
                    chunk = encodeURI(sentence);
                    var ttsQuery = 'http://translate.google.com/translate_tts?tl=' + langDetect + '&date=' + date + '&q=' + sentence;
                    //Remove &nbsb;
					ttsQuery = ttsQuery.replace('&nbsp;','');
                    console.log(ttsQuery);
                    var a = new Audio(ttsQuery);
                    a.addEventListener('canplaythrough', function (ev) {
                    }, false);
                    a.load();
                    a.play()
                }
            }, false)
        }
    }
}

});//End exec (send to head as script)
}//End function doSomthing
