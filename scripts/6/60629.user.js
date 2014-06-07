// ==UserScript==
// @name           Persistent Word Count for Google Docs
// @namespace      http://glennji.com/userscripts
// @description    Keeps a word-count in the top right corner (save document to update).
// @include        http://docs.google.com/Doc?docid=*
// ==/UserScript==
(function (){

    window.ctrlKey = false;

    window.textcount = function() {
        text = window.parent.document.getElementById('wys_frame').contentDocument.body.innerHTML.replace(/<.*?>|\'/g, '');
        count = 0;
        words = text.match(/(\w+)/g);	
        if(words){
            count = words.length;
        }
        return count;
    }

    window.updateWordCount = function(e) {
        wc = window.parent.document.getElementById('wordcounty');
        if (wc != null) {
            wc.innerHTML = textcount();
        }
    }

	/**
	* Handle all keypresses, we are looking for an ALT-C key-combo. Since we can't detect
	* Two keys being pressed at the same time, we first make sure the ALT key was pressed
	* then we wait to see if the C key is pressed next
	*/
	window.checkKeys = function(e){	
		//Check to see if "C" is pressed after ALT	
		if(e.keyCode == 83 && ctrlKey){
			updateWordCount(e);
		} else if(e.keyCode == 17){
			ctrlKey = true;
		}
	}

    window.resetKeys = function(e) {
        ctrlKey = false;
    }

    window.formatNumber = function(nStr) {
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
		    x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(
    '#wordcounty {'+
    '  position: absolute;' +
    '  margin: 0;' +
    '  left: auto;' +
    '  right: 0;' +
    '  bottom: auto;' +
    '  top: 0;' +
    '  border-top: 1px solid silver;' +
    '  background: black;' +
    '  color: white;' +
    '  width: 4em;' +
    '  font-family: Verdana, sans-serif;' +
    '  font-size: small;' +
    '  line-height: 150%;' +
    '  text-align: center;' +
    '}');

    wc = window.document.getElementById('wordcounty');
    if (wc == null) {
        div = document.createElement('div');
        div.id = 'wordcounty';
    }

    window.addEventListener("load", function() {
	    document.getElementById('writely-button-save').addEventListener("click",updateWordCount,false);

	    document.getElementById('w-save').addEventListener("click",updateWordCount,false);
        document.body.appendChild(div);
        updateWordCount();
    }, false);

    //Capture all onkeydown events, so we can filter for our key-combo
    window.addEventListener('keydown',checkKeys,false);
    window.addEventListener('keyup',resetKeys,false);

})();