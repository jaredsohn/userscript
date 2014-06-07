// ==UserScript==
// @name       Inet kundvagn BB kod
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Exporterar en kundvagn från Inet till BB kod så man kan infoga den i ett forum.
// @match      http://www.inet.se/kundvagn
// @match      https://www.inet.se/kundvagn
// @copyright  2012+, Jesper Sundberg a.k.a Chawan / Chawan123
// ==/UserScript==

//Declare variables
var mainDiv = document.getElementById('main');
var targetDiv;
var divs = document.getElementsByTagName("div");

//Loop the page and find the right div
for(var i = 0; i < divs.length; i++) {
    if(divs[i].getAttribute('style') == 'overflow: auto; padding-top: 10px;') {
        targetDiv = divs[i];
        addButton();
    }
}

function addButton() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('style', 'float: left;');
    
    // Create the button and set its attributes
    var inputButton = document.createElement('input');
    inputButton.name = 'showbbCode';
    inputButton.type = 'button';
    inputButton.value = "BB Kod";
    inputButton.addEventListener("click", displayCode, true);
    
    // Append the button to the div
    newDiv.appendChild(inputButton); 
    targetDiv.insertBefore(newDiv, targetDiv.childNodes[8]);
}

function displayCode() {
    
    var parent = document.getElementById("main");
    var tables = parent.getElementsByTagName("table");
    var table = tables[0];
    var imgRow = table.tBodies[0].rows[1];
    var FinishedCode;
    
    //alert(table.tBodies[0].rows[1].cells[1].innerText);
    
    for(var x = 0; x < table.tBodies[0].rows.length; x++) {
        //document.write(table.getElementsByTagName('img')[x].src);
        if(table.tBodies[0].rows[x].innerText != undefined)
        {   
            var currentTD = table.tBodies[0].rows[x];
            
            FinishedCode = FinishedCode + (" [IMG]" + table.getElementsByTagName('img')[x].src + '[/IMG]');
            FinishedCode = FinishedCode + ('[URL="' + "http://www.inet.se" + currentTD.getElementsByTagName('a')[0].getAttribute('href') + '"]' + table.tBodies[0].rows[x].childNodes[3].innerText + "[/URL]");
            FinishedCode = FinishedCode + (" Antal: " + currentTD.getElementsByTagName('input')[0].value + " st");
            FinishedCode = FinishedCode + (" Summa: " + currentTD.getElementsByTagName('td')[5].innerText);
            FinishedCode = FinishedCode + ('<br>');
        } 
    }
    FinishedCode = FinishedCode.replace("undefined ", "");
    writeBbCode(FinishedCode);
    function writeBbCode(content) {
        top.consoleRef=window.open('','bbkod',
                                   'width=350,height=250'
                                   +',menubar=0'
                                   +',toolbar=1'
                                   +',status=0'
                                   +',scrollbars=1'
                                   +',resizable=1')
            top.consoleRef.document.writeln(
                '<html><head><title>BB Kod</title></head>'
                +'<body bgcolor=white onLoad="self.focus()">'
                +content
                +'</body></html>'
            )
                top.consoleRef.document.close()
                    }
}