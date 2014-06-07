// ==UserScript==
// @name iStads Print
// @namespace http://au.dk
// @description Print functionality
// @include https://istads.au.dk/*
// ==/UserScript== 

var getElementByXpath = function (path) {
  return document.evaluate(path, document, null, 9, null).singleNodeValue;
};

    unsafeWindow.PrintElem = function(elem)
    {
        var target = document.getElementById(elem);
        var wrap = document.createElement('div');
        wrap.appendChild(target.cloneNode(true));
        Popup(wrap.innerHTML);
    }

    function Popup(data) 
    {
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>Stads+ Printer</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.print();
        mywindow.close();

        return true;
    }



var table = document.getElementById("stadsGrid")

if(table != null){
    var rowButton = getElementByXpath("/html/body/div/table[2]/tbody/tr/td[2]/table/tbody/tr/td/div/table/tbody/tr");
    var td = document.createElement("td");
    var functionText = "PrintElem('stadsGrid')";
    td.innerHTML = '<input type="button" value="Print table" onclick="' + functionText + '" />';
    rowButton.appendChild(td);
}    

