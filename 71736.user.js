// ==UserScript==
// @name            Informator
// @namespace       www.erepublik.com
// @author          F@zi
// @description     Informator
// @version         0.1
// @include         http://www.erepublik.com/en
// @include         http://www.erepublik.com/pl
// ==/UserScript==

(function(undefined)
{
    var url = 'http://docs.google.com/View?id=0AdveTRJTHRnTZGZ6a3JuYmRfMjVja21oc2ptcA';

    /* ---------------------------------- */
    // Magic, do not touch! ;)
    var imEr = "/images/parts/icon_political_reject_default.gif";
    var imOK = "/images/parts/icon_political_propose_default.gif";

    function parseData(s)
    {
        try
        {
            s = s.replace(/\r\n/g, "").replace(/\n/g, "");
            var doc = s.match(/<div id="doc-contents">(.*)<br clear="all"/m)[1];
            doc = doc.replace(/<\/?.+?>/g, "").replace(/&#(\d+);/g, function(wholematch, firstmatch){
                return String.fromCharCode(+firstmatch);}
            );
            //doc = doc.replace(/ÂŤ/, '<').replace(/Âť/, '>');
            var d = doc.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0*39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

            displayFrame(d);
        }
        catch(e)
        {
            displayErrFrame("BĹ?? odczytu, sprĂłbuj pĂłĹşniej.");
            throw e;
        }
    }

    function displayFrame(d, im)
    {
        if(im == undefined)
            im = imOK;
            
        if(d == undefined)
            d = "";
        
        var infoDiv = document.createElement('div');
        infoDiv.className = 'box';
        infoDiv.innerHTML = '\
        <div class="title"><h2 style="font-size: x-large;" id="Informator">Informator</h2></div>\
        <div class="latest_events box">\
            <div class="item elem">\
                <div class="iconholder"><img class="test" src="'+im+'" alt=""/></div>\
                <div class="holder">\
                    <p style="color: #000000;">'+d+'<br/>\
                </div>\
            </div>\
        </div>';
        
        latestNews = document.getElementById('latestnews');
        latestNews.parentNode.insertBefore(infoDiv, latestNews);
        
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#Informator", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
            }
        }

        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + genFlash + ')();'

        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    function displayErrFrame(d)
    {
        displayFrame(d, imEr)
    }

    function loadURL_GM(url, xhr)
    {
        if(xhr == undefined)
            xhr = GM_xmlhttpRequest;
    
        xhr({
            method: "GET",
            url: url,
            onload: function(response)
            {
                parseData(response.responseText);
            },
            onerror: function(response)
            {
                displayErrFrame("(GM) BĹ?? "+response.status+" ("+response.statusText+") podczas Ĺ?dowania strony.");
            }
        });
    }

    try
    {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response)
            {
                parseData(response.responseText);
            },
            onerror: function(response)
            {
                displayErrFrame("(GM) BĹ?? "+response.status+" ("+response.statusText+") podczas Ĺ?dowania strony.");
            }
        });
    }
    catch(e)
    {
        displayErrFrame("Naruszenie zasad dostÄ?u.");
        throw e;
    }
})();
