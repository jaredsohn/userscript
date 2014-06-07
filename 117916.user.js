// ==UserScript==
// @name           FaceBook - JavaExpresso EXPLOIT - Reply Button Patch
// @description    The great!
// @include        *facebook*
// @version         1.1(beta)
// ==/UserScript==

(function(d){

    const DEBUG = true;

    const script_id = 117809;
   

    function getButtonText()
    {
        return text[lang] ? text[lang] : text['en'];
    }

    function simulateKeyEvent(keyCodeArg, element)
    {
        var evt = document.createEvent("KeyboardEvent");
                  evt.initKeyEvent ("keypress", true, true, window,
                  0, 0, 0, 0,
                  keyCodeArg, 0);

        element.dispatchEvent(evt);

        return false;
    }

    function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
    
	delete parent, link, url;
    }

    
			}

        try {
        
            

	    if (textarea = gBox(parent.parentNode)) {
		textarea.focus();

            if (textarea.value == '') last_insert = null;

            if (string != last_insert) { 
                pretext = textarea.value.substring(0, textarea.selectionStart);
                posttext = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
                textarea.value = pretext + insert_text + posttext;

                simulateKeyEvent(39, textarea);

                last_insert = string;
            }
	    } //end gBox
        } catch (e) {
            log(e);
        }

        delete parent, link, string, first_name, insert_text, commentsWrapper, textarea, pretext, posttext, uid, xjson, getid;
        return false;
    }


    var divs_length_before = 0;

    function addButtons()
    {
        var divs = d.getElementsByClassName('commentActions');
        var div, button;

        for (i = 0; i <= divs.length-1; i++) {
            div = divs[i];

            if (div.className.indexOf(gm_class) >= 0) {
                if (button = div.getElementsByClassName('replyButton')[0])
                    button.addEventListener('click', makeCall, false);

                continue;
            }

            div.className += gm_class;

            // create & add reply button
            button = d.createElement('a');
            button.setAttribute('class', 'replyButton');
            button.innerHTML = button_text;

            button.addEventListener('click', makeCall, false);

            // add separator
            div.innerHTML += ' · ';

            div.insertBefore(button, null);
        }

        delete divs, div, button;
        return false;
    }

    /* Start Script */
    if (content = d.getElementById('content')) {
        button_text = getButtonText();
        addButtons();
        var t;
        content.addEventListener('DOMNodeInserted', function() { clearTimeout(t); t = setTimeout(addButtons, 125); }, false);
    }

    /* AutoUpdater */
    if (typeof autoUpdate == 'function') {
        autoUpdate (script_id, script_version);
    }

})(document);