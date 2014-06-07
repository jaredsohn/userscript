// ==UserScript==
// @author         mugPuke
// @version        1.0.0.2
// @name           4Chan_OpenPix
// @namespace      mugPuke@pukeIn.Mug
// @include        *.4chan.org/*/res/*
// ==/UserScript==


//TODO find out how to open tabs in chunks

var mp_op = {
    
    limit: 50, //max to be opened pictures, 0 to deactivate
    timeoutMS: 2000, 
    selC: [],
    xpathResult : document.evaluate('id("delform")/div/div/div/div/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), 
    //------------------------------------------------------------------------------
    //mungushume    (https://userscripts.org/users/24722)
    //GoogleMonkeyR (https://userscripts.org/scripts/show/9310)
    buildElement : function(type, atArr, inner, action, listen)
    {
        var e = document.createElement(type);
        for (var at in atArr)
        {
            if (atArr.hasOwnProperty(at))
            {
                e.setAttribute(at, atArr[at]);
            }
        }
        if(action && listen)
        {
            e.addEventListener(action, listen, false);
        }
        if(inner)
        {
            e.innerHTML = inner;
        }
        return e;
    },
    //------------------------------------------------------------------------------
    appendNumberButtons: function()
    {
        console.log("appendNumberButtons");
        var buttonStartNumber
        var buttonEndNumber
        var textNode

        for ( var i=0 ; i < mp_op.xpathResult.snapshotLength; i++ )
        {
            buttonStartNumber = mp_op.buildElement("input", {type:"button", value:"S"+i},null,"click", function(i){ return function(I){mp_op.selC.startInput.value = i} }(i))
            buttonEndNumber   = mp_op.buildElement("input", {type:"button", value:"E"+i},null,"click", function(i){ return function(I){mp_op.selC.endInput.value = i} }(i))
            
            textNode = document.createTextNode(" -> ")
            mp_op.xpathResult.snapshotItem(i).appendChild(textNode)
            mp_op.xpathResult.snapshotItem(i).appendChild(buttonStartNumber)
            
            textNode = document.createTextNode(" - ")
            mp_op.xpathResult.snapshotItem(i).appendChild(textNode)
            mp_op.xpathResult.snapshotItem(i).appendChild(buttonEndNumber)
        }
    },
    
    open_pix : function()
    {
        console.log("open_pix");
        (function()
        {
            var start, 
                    end,
                    flag = false,
                    temp,
                    rounds;

            start = parseInt(mp_op.selC.startInput.value);
            end = parseInt(mp_op.selC.endInput.value);
            
            if(isNaN(start)) start = 0;
            if(isNaN(end)) end = mp_op.xpathResult.snapshotLength;
            
            if (start > mp_op.end)
            {
                temp = start;
                start = mp_op.end;
                end = temp;
            }
            
            if (mp_op.limit !=0 && mp_op.limit < (end - start)) 
            { 
                rounds = start + mp_op.limit-1;
                flag = true;
            }
            else rounds = end;
            
            mp_op.selC.startInput.value = rounds+1;
            mp_op.selC.endInput.value = end;
            
            for (i=start; i <= rounds; i++)
            {
                window.open(mp_op.xpathResult.snapshotItem(i).getElementsByTagName("a")[0].href,'');
            }

            if (flag)
            {
                console.log("ping0");
                window.setTimeout( function()
                {
                    console.log("ping");
                    mp_op.open_pix();  
                }, mp_op.timeoutMS );
            }
        })();
    },
    
    process : function()
    {
        console.log("process");
        mp_op.open_pix();
        //after chunks are loaded this should clear the endInput
        mp_op.selC.endInput.value = "";
    },
    
    buildGUI : function()
    {
        var buttonContainer = mp_op.buildElement("div", {id:"buttonContainer", style:"position:fixed; left:10px; top:30px"})
        var button = mp_op.buildElement("input", {type:"button", value:"Open Pix"},null,'click', mp_op.process)
        var startInput = mp_op.buildElement("input", {type:"text", size:"2", maxlength:"3", id:"startInput"})
        var endInput = mp_op.buildElement("input", {type:"text", size:"2", maxlength:"3", id:"endInput"})

        buttonContainer.appendChild(button)
        buttonContainer.appendChild(startInput)
        buttonContainer.appendChild(endInput)
        document.getElementsByTagName("body")[0].insertBefore(buttonContainer, document.getElementsByTagName("body")[0].firstChild)
    },
    
    buildSelectorCache: function()
    {
        console.log("buildSelectorCache");
        mp_op.selC = {
            startInput: document.getElementById("startInput"),
            endInput: document.getElementById("endInput"),
            container: document.getElementById("buttonContainer")
        }
    },
    
    init: function()
    {
        console.log("init");
        
        mp_op.appendNumberButtons();
        mp_op.buildGUI();
        mp_op.buildSelectorCache();
    }
}
mp_op.init();