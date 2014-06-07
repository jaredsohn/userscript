// ==UserScript==
// @name            Greasemonkey Wiki Edit: Enlarged Edit area
// @description     2009-12-15: 

// ==/UserScript==

/*
    (c) Aleksey Tyschenko

    Copy, use, modify, spread as you see fit.
*/


(function() {

    var GreasemonkeyWikiEdit =
    {
        go: function()
        {
            
                
                document.getElementById("wpTextbox1").setAttribute("cols", "120");
                document.getElementById("wpTextbox1").setAttribute("rows", "45");
            
        },

       
    }

    GreasemonkeyWikiEdit.go();

})();