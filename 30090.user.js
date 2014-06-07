// ==UserScript==
// @name           OpenCommonText
// @namespace      http://pcrusier.fortunecity.com
// @description    Open links with matching text
// @include        http://*
// @exclude        http://userscripts.org/*
// ==/UserScript==

var OPENS_PER_BUTTON_PRESS = 9;                            /* max pages to open at once                                                   */
// this function is called when the button is pressed
stinkNext = function(pages)
{
    var DELAY_BETWEEN_OPENS = 100;
   // if first time, establish the text from the 1st list box item


    if (!document.stinkText) {
        document.stinkText = document.getElementById('octsel').options[0].value;
    }
    var intext = unescape(document.stinkText);

   // if needed, initialize the list of links for this link text selection


    if (!document.stinkList) {
        document.stinkList = [];                           // list of link hrefs for this link text
        document.stinkIndex = 0;                           // current start position in list
        var knownLinks = [];                     // links already seen. used to weed out multiple opens
        var documentLinks = document.getElementsByTagName('a'); // all anchors in document

        for (a = 0; a < documentLinks.length; a++) {
            if (documentLinks[a].text.replace(/[0-9]*$/g, '').replace(/^\s+|\s+$/g, '') == intext) {
                var linkHref = documentLinks[a].href.substring(documentLinks[a].href.lastIndexOf('http'));

                if (!knownLinks[linkHref])
                    document.stinkList[document.stinkList.length] = linkHref;
                knownLinks[linkHref] = true;
            }
        }
    }
    var e = Math.min(document.stinkIndex+pages, document.stinkList.length);
    var wait = 0;

    // run through the list for the next 9 or so items and update the
    // button accordingly.

    for (; document.stinkIndex < e; document.stinkIndex++) {
        // open windows and disable button until last open is done.
        var bButtonDisableStatus = document.stinkIndex < e-1;

        bButtonDisableStatus = bButtonDisableStatus|document.stinkIndex == document.stinkList.length-1;
        var buttonText;

        if (document.stinkIndex == document.stinkList.length-1)
            buttonText = "Done";
        else
            if (document.stinkIndex < e-1)
                buttonText = "Wait...";
            else
                buttonText = "Open "+(e+1)+" to "+Math.min(e+pages, document.stinkList.length)+" of "+document.stinkList.length;
        var url = unescape(document.stinkList[document.stinkIndex]);
        var amp = url.indexOf('&');
        var que = url.indexOf('?');

        if (amp > -1)
            if ((que == -1) || (amp < que)) {
                url = url.substring(0, amp);               // remove amp junk
                document.stinkList[document.stinkIndex] = escape(url);
            }
   //              cmd="alert(unescape(\""+document.stinkList[document.stinkIndex]+"\"))";
        var cmd = "window.open(unescape(\""+document.stinkList[document.stinkIndex]+"\"))";

        setTimeout(cmd+";document.getElementById(\"bx\").disabled="+bButtonDisableStatus+";document.getElementById(\"bx\").value=\""+buttonText+"\"",
            wait);
        wait += DELAY_BETWEEN_OPENS;
    }
}


function start()
{
    var f = document.getElementsByTagName('a');
    var dothis = 0;
    var textsOfLinks = [];
    var textCounts = [];
    var knownTexts = [];
    var knownLinks = [];
    var a;
    var text = '';
    var m = 0;

    document.stinkText = '';
    for (a = 0; a < f.length; a++) {
        var t = f[a].text.replace(/[0-9]*$/g, '').replace(/^\s+|\s+$/g, '');
        var linkHref = f[a].href.substring(f[a].href.lastIndexOf('http'));

        if (t && t != '') {
            if (!knownTexts[t]) {
                textsOfLinks[textsOfLinks.length] = t;
                knownTexts[t] = true;
            }
            if (!knownLinks[linkHref])
                knownLinks[linkHref] =[];
            if (!knownLinks[linkHref][t])
                textCounts[t] = (textCounts[t])?textCounts[t]+1:1;
            knownLinks[linkHref][t] = true;
        }
    }

    // build list of text links that will become the drop down list

    var options=[];
      for (a = 0; a < textsOfLinks.length; a++) {
	        text = textsOfLinks[a];
	        if (textCounts[text] > 2) {
 	           options[options.length]= "<option value='"+escape(text)+"'>"+text+" ("+textCounts[text]+") </option>";
	   //        options[options.length]= "<option value='"+(a+10000)+"'>"+(a+10000)+"</option>";
	            if (document.stinkText == '')
	                document.stinkText = escape(text);
	        }
	    }

    // sort options case insensitively

    comparitor=function(a,b){return ((unescape(a).toLowerCase() < unescape(b).toLowerCase())?-1:1)};
	options.sort(comparitor);

    // build dropdown list

    var inner = "<select id='octsel' ";
    inner += "style='font-family:arial,helvetica;font-size:9pt;text-align:right' ";
    inner += "onchange=\"javascript:document.stinkText=this.options[this.selectedIndex].value;document.stinkList=null;o=document.getElementById('bx');o.value=unescape(document.stinkText);o.disabled=false\">";
    for (a=0;a<options.length;a++)
	    inner+=options[a];
    inner += '</select>';

	// Insure that there is at least 1 set of links with more than 2 target urls
    for (a = 0; a < textsOfLinks.length; a++) {
        if (textCounts[textsOfLinks[a]] > m) {
            m = textCounts[textsOfLinks[a]];
        }
    }

    // if needed, create button and dropdown and add them as a <div> to the DOM

    if (m > 2) {
        var btn = document.createElement('div');
        btn.setAttribute("id", 'octbtn');
        var lf = stinkNext.toString().replace(/\"/g,"'"); // ';
        inner += "&nbsp;<input id=bx value=\""+unescape(document.stinkText)+
            "\" type=button onclick=\"javascript:eval("+lf+"("+OPENS_PER_BUTTON_PRESS+"))\">";
        inner += "&nbsp;<img onclick='javascript:document.getElementById(\"octbtn\").style.display=\"none\"' ";
        inner+="src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMApgDKAPCwRIwtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADG0lEQVR42gEQA+/8Af///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBQQQAAADV0ckAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACssLgAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAACwwOCwwOAAAAAAAAAAAAAAAACwwOCwwOAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAADU0MgAAAAsMDgAAAAAAAAsMDgAAADU0MgAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAA1NDIAAAALDA4LDA4AAAA1NDIAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAANTQyAAAAAAAANTQyAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAsMDgAAAAAAAAsMDgAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAALDA4AAAA1NDI1NDIAAAALDA4AAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAACwwOAAAANTQyAAAAAAAANTQyAAAACwwOAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAADU0MgAAAAAAAAAAAAAAAAAAADU0MgAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAKywuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpsrwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK9FMsMjnBxYAAAAAElFTkSuQmCC\" width=\"16\" height=\"16\">";
        btn.innerHTML = inner;
        btn.setAttribute('style', "position:absolute;top:.5em;right:.5em;z-index:30;background:tan;padding:0.3em;border:black solid 1px;-moz-border-radius:8px;white-space:nowrap");
        document.body.appendChild(btn);
    }
}

start();
