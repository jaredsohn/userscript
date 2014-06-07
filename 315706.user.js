// ==UserScript==
// @name       Priori-Incantatem.sk ~ Tajomná komnata: input -> textarea
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  prerobenie políčka na písanie v TK na textarea namiesto inputu :) jednoduchšie povedané: any to zobrazovalo viac riadkov, nie len jeden :) funkčné by mali byť ako smaile, tak aj ja formátovanie
// @match      http://www.priori-incantatem.sk/chat/input.php
// @copyright  2012+, You
// ==/UserScript==

    var textarea = document.createElement("textarea");
    textarea.setAttribute("class", "input");
    textarea.setAttribute("rows", 2);
    textarea.setAttribute("cols", 100);
    
    
    
    var defInput = document.getElementsByName("sprava")[0];
    defInput.setAttribute("style", "display: none;");
    
    defInput.parentNode.appendChild(textarea);
    
    textarea.onkeyup = function(event) {
        console.log(this);
        if (event.keyCode == 13) {
            document.getElementsByName("message")[0].submit();
            return false;
        } else {
            defInput.value = this.value;
        }
    }
    
    document.getElementsByName("komu")[0].onchange = function(event){
        console.log(event);
        textarea.focus();
        return true;
    }
    
    var inputs = document.getElementsByTagName("input");
    var buttons = new Array();
    for (var i = 0; i < inputs.length; i++){
        if (inputs[i].type == "button")
            buttons.push(inputs[i]);
    }
    buttons[0].onclick = function(event) {
        console.log(event);
        surroundText("[b]", "[/b]", textarea);
        defInput.value = textarea.value;
    }
    buttons[1].onclick = function(event) {
        console.log(event);
        surroundText("[i]", "[/i]", textarea);
        defInput.value = textarea.value;
    }
    buttons[2].onclick = function(event) {
        console.log(event);
        surroundText("[u]", "[/u]", textarea);
        defInput.value = textarea.value;
    }
    
    
    
    var smaile = document.getElementsByClassName("m2");
    var txtsm = Array();
    for (var s = 0; s < smaile.length; s++) {
        txtsm.push(smaile[s].onclick.toString().split("'")[1]);
        smaile[s].setAttribute("s", s);
        if (smaile[s].onclick) {
            smaile[s].onclick = function(event) {
                replaceText(txtsm[this.getAttribute("s")], textarea);
                defInput.value = textarea.value;
            }
        }
        
    } 