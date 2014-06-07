// ==UserScript==

// @name           Nanowrimo Daily Wordcount

// @namespace      http://glennji.com/userscripts

// @description    Show how close to your daily wordcount you are for Nanowrimo

// @include        http://docs.google.com/Doc?docid=*

// @include        https://docs.google.com/Doc?docid=*

//

// Modified by Arthaey Angosii <arthaey@gmail.com> to add:

//  * Set your own word count goal by clicking on the word count.

//  * More accurate calculation of how many words you must write each day.

//  * See how many words per day you need to write by hovering over the word count.

//  * Show word count in menu bar as red/blue text. (In the original script, the

//    word count is floating on the right, slightly overlapping the Save buttons,

//    with a red background and white text.)

//  * Trigger recount when clicking on File > Save.

//  * Script runs on both http and https URLs.

// ==/UserScript==

(function (){



    window.cookieName = 'wordCountGoal';

    window.wordCountGoal = GM_getValue(cookieName, 50000);



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



    window.updateNanoCount = function(e) {

        wc = window.parent.document.getElementById('wordCount');
        wcl = window.parent.document.getElementById('wordCountLabel');
        nanon = window.parent.document.getElementById('nanowrimologo');

        if (wc != null) {

            var today = new Date();

            var dayOfMonth = today.getDate();

            // based on http://snippets.dzone.com/posts/show/2099

            var daysInThisMonth = 32 - new Date(today.getYear(), today.getMonth(), 32).getDate();



            var wordsPerDay = wordCountGoal / daysInThisMonth;
            var txt = textcount();
            var txtFormatted = formatNumber(txt);

            var difference = Math.ceil(dayOfMonth * wordsPerDay) - txt;



            wc.innerHTML = formatNumber(difference);
            wc.title = txtFormatted + ' words in total';



            if (difference > 0) {

                wc.className = 'redAlert';

                wordsPerDay = Math.ceil(difference / (daysInThisMonth - dayOfMonth));

                wcl.title = 'Write ' + wordsPerDay +

                    ' words per day to reach ' + wordCountGoal + ' words.';
                nanon.style.display = 'none';

            } else if (difference < 0) {

                wc.className = 'blueMonday';

                wc.innerHTML = '+' + formatNumber(-difference);

                wcl.title = "You're done! :)"
                nanon.style.display = 'inline';

            } else {

                wc.className = 'betOnBlack';

                wcl.title = "You're done! :)"
                nanon.style.display = 'inline';

            }

        }

    }



    /**

    * Handle all keypresses, we are looking for an ALT-C key-combo. Since we can't detect

    * Two keys being pressed at the same time, we first make sure the ALT key was pressed

    * then we wait to see if the C key is pressed next

    */

    window.checkNanoKeys = function(e){

        //Check to see if 'S' is pressed after ALT

        if(e.keyCode == 83 && ctrlKey){

            updateNanoCount(e);

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

        '#nanocounty {'+

        '  display: inline;' +

        '  position: absolute;' +

        '  margin: 0;' +

        '  padding-right: 0.4em;' +
        '  top: 0.2em;' +

        '  left: auto;' +

        '  right: 0;' +

        '  bottom: auto;' +

        '  font-family: Verdana, sans-serif;' +

        '  font-size: small;' +

        '  line-height: 150%;' +

        '  text-align: center;' +

        '}' + 

        '#nanocounty label {'+

        '  font-weight: bold;' +

        '  padding-right: 0.5em;' +

        '}' + 

        '#wordCount.redAlert {' +

        '  color: red;' +

        '}' + 

        '#wordCount.blueMonday {' +

        '  color: blue;' +

        '}' + 

        '#wordCount.betOnBlack {' +

        '  color: black;' +

        '}' +
        '#nanowrimologo {' +

        '  color: #ff5555;' +
        '  font-family: serif;' +
        '  font-weight: bold;' +
        '  font-size: 0.7em;' +
        '  margin-left: 0.4em;' +
        '  margin-top: -0.2em;' +
        '  text-decoration: none;' +
        '  border: 1px solid #cdcdcd;' +
        '  padding: 0.2em;' +
        '  text-align: center;' +
        '  display: none;' +

        '}' 

    );



    window.promptWordCountGoal = function(e) {

        var newGoal = prompt('What is your word count goal for this month?', wordCountGoal);

        if (newGoal == null || newGoal == '') return;



        newGoal = parseInt(newGoal);

        if (isNaN(newGoal)) {

            alert("The value '" + newGoal + "' is not a number.");

        } else {

            GM_setValue(cookieName, newGoal);

            wordCountGoal = newGoal;

            updateNanoCount();

        }

    }



    window.addEventListener('load', function() {

        document.getElementById('docs-titlebar-save').addEventListener('click',updateNanoCount,false);

        document.getElementById('w-save').addEventListener('click',updateNanoCount,false);

        document.getElementById('m-save').addEventListener('click',updateNanoCount,false);



        wc = window.document.getElementById('wordCount');

        if (wc == null) {

            div = document.createElement('div');

            div.id = 'nanocounty';

            label = document.createElement('label');
            label.id = 'wordCountLabel';

            label.innerHTML = 'Words Left Today:';

            wordCount = document.createElement('span');

            wordCount.id = 'wordCount';
            logo = document.createElement('a');
            logo.href = "http://www.nanowrimo.org/";
            logo.target = "_blank";
            logo.description = "Nanowrimo Website";
            logo.innerHTML = "N";
            logo.id = 'nanowrimologo';
            logo.title = "go to Nanowrimo.org";



            div.appendChild(label);

            div.appendChild(wordCount);
            div.appendChild(logo);

            document.getElementById('editor-menubar').appendChild(div);



            label.addEventListener('click',promptWordCountGoal,false);

        }



        updateNanoCount();

    }, false);



    //Capture all onkeydown events, so we can filter for our key-combo

    window.addEventListener('keydown',checkNanoKeys,false);

    window.addEventListener('keyup',resetKeys,false);



})();
