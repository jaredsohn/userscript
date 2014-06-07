// ==UserScript==
// @name           SoftPaqDownloadHelper
// @namespace      http://userscripts.org/users/83191
// @match          http://h20000.www2.hp.com/bizsupport/TechSupport/SoftwareIndex.jsp*
// ==/UserScript==

var hp_blue_light = "#0098f6";

var hp_green_light = "#64b900";
var hp_green_dark = "#298527";

var hp_pink_light = "#f44ab7";
var hp_pink_dark = "#cc0066";

var hp_orange_light = "#eb5f01";

var hp_gray_light = "#898b8f";
var hp_gray_dark = "#3d393b";

nowDate = new Date();

// Find all rows
allrows = document.evaluate(
          "/html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);

// Loop through rows
for (var i = 0; i < allrows.snapshotLength; i++) {
    thisRow = allrows.snapshotItem(i);
    
    // Is this the right kind of row?
    if (thisRow.childElementCount == 6) {
    
        // Read SoftPaq update date
        itemUpdateDate = new Date(thisRow.children[1].lastChild.textContent);
        
        ageInMilliSecs = nowDate.getTime() - itemUpdateDate.getTime();
        ageInDays = Math.round(ageInMilliSecs / 1000 / 60 / 60 / 24);

        // Create background color depending on age
        if (ageInDays < 30) {
        color = "#FF4D4D";
        }
        else if (ageInDays < 60) {
        color = "#FFA64D";
        }
        else if (ageInDays < 90) {
        color = "#FFFF4D";
        }
        else {
        color = "#FFFFFF";
        }
        
        // Apply row background color
        // thisRow.style.backgroundColor = color;





        // Read form action-attribute
        var action = thisRow.children[5].children[0].getAttribute("action");
        
        // Extract SoftPaq-number from action-attribute
        var myre= /sp\d\d\d\d\d.exe/g ;
        var spfilename = action.match(myre)[0];
        var spnumber = spfilename.match(/sp\d\d\d\d\d/g);
        
        // Extract ftp-url for decent presentation
        var ftpurl = decodeURIComponent(action).split("&")[4].split("=")[1];

        // Create new element for SoftPaq-number display
        var spelem = document.createElement("div");
        spelem.innerHTML = '<div style="padding: 4 4 4 4; ' +
            'border: 1px solid #000000;  ' +
            'font-size: normal; background-color: ' + 
            color + '; ' +
            'color: #000000;"><p style="margin: 2px 0 1px 0;"> ' +
            spnumber +
            '</p><a href="'+ ftpurl.replace(".exe",".cva") +'">CVA</a>'+
            '|<a href="'+ ftpurl +'">EXE</a></div>';
        
        // Insert SoftPaq-number display
        thisRow.children[5].insertBefore(spelem, thisRow.children[5].firstChild)

    }

}
