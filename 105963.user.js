// ==UserScript==
// @name           Flea(s) Market
// @namespace      http://www.stuffedpelican.com/projects/kol/
// @description    Gives you the option of selling more than one of something in the flea market
// @include        http://*.kingdomofloathing.com/town_sellflea.php*
// ==/UserScript==

// nb: hosted on clump's userscripts page pending the original
// author's return.

switch(document.location.pathname) {
    case "/town_sellflea.php":
        var paragraph = getParagraph();
        
        var inputs = paragraph.getElementsByTagName("input");
        var lastInput = inputs[inputs.length-1];
        var selectInput = paragraph.getElementsByTagName("select")[0];
        var priceInput;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute("name") == "sellprice")
                priceInput = inputs[i];
        }
    
        myTextNode1 = document.createTextNode("Quantity ");
        myInput = document.createElement("input");
        myInput.setAttribute("id", "quantity");
        myInput.setAttribute("value", "1");
        myInput.setAttribute("type", "text");
        myInput.setAttribute("size", "2");
        myInput.setAttribute("maxlength", "2");
        myInput.style.border = "1px black solid";
        myInput.style.margin = "0px 40px 0px 0px";
        myBRNode = document.createElement("br");
        myBRNode2 = document.createElement("br");
        
        paragraph.insertBefore(myInput, paragraph.childNodes[3]);
        paragraph.insertBefore(myTextNode1, paragraph.childNodes[3]);
        paragraph.insertBefore(myBRNode, paragraph.childNodes[3]);
        paragraph.insertBefore(myBRNode2, lastInput);
        
        //lastInput.setAttribute("type", "button");
        var form = document.getElementsByTagName("form")[0];
        form.addEventListener("submit", getQuantity, false);
        
        
        if (GM_getValue("count", 0) == 0) {
            // yeahhhh
        } else if (GM_getValue("count") < 0) {
            GM_setValue("count", 0);
        } else {
            GM_setValue("count", GM_getValue("count")-1);
            myInput.setAttribute("value", GM_getValue("count"));
            priceInput.value = GM_getValue("price");
            
            var soptions = selectInput.options;
            var found = false;
            for (var i = 0; i < soptions.length; i++) {
                if  (GM_getValue("item") == soptions[i].value) {
                    selectInput.selectedIndex = i;
                    found = true;
                    document.getElementsByTagName("form")[0].submit();
                }
            }
            if (!found) {
                alert("You are all out of that item");
                GM_setValue("count", 0);
            }
        }
    break;
}

function getQuantity() {
    var paragraph = getParagraph();
    var myInput = document.getElementById("quantity");
    var quantity = myInput.value;
    var selectInput = paragraph.getElementsByTagName("select")[0];
    var option = selectInput.options[selectInput.selectedIndex].value;
    var inputs = document.getElementsByTagName("input");        
    var priceInput;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("name") == "sellprice")
            priceInput = inputs[i];
    }
    
    if (priceInput.value > 0 && priceInput.value != "" && option != 0 && quantity > 0) {
        GM_setValue("count", quantity-1);
        GM_setValue("item", option);
        GM_setValue("price", priceInput.value);
    }
    document.getElementsByTagName("form")[0].submit();
}

function getParagraph() {
    var td = document.getElementsByTagName("form")[0].parentNode.parentNode;
    var center = td.getElementsByTagName("center")[1];
    var paragraph = center.getElementsByTagName("p")[0];
    return paragraph;
}
