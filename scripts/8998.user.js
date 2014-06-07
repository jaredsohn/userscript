// ==UserScript==
// @name unjustify te
// @author Madhu Prakash Surapaneni (aka Prakasam)
// @author Veeven (original)
// @include *
// @version 0.2
// @description  "Unjustifies abnormally appearing text (esp. Telugu <te>) on web pages"
// ==/UserScript==

    javascript: ele = document.getElementsByTagName("*");

    for (i = 0; i < ele.length; i++) {
    
       var alignment = document.defaultView.getComputedStyle(ele[i], null).getPropertyValue("text-align");
       
       var spacing = document.defaultView.getComputedStyle(ele[i], null).getPropertyValue("letter-spacing");
       
       if (alignment == "justify") {
          ele[i].style.textAlign = "left";
       }
       
       if (spacing != "normal") {
          ele[i].style.letterSpacing = "normal";
       }
       
    }
    
    void 0;
    