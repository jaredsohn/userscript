// ==UserScript==
// @name DoopeSucks
// @description Fixes a bad search box
// @include http://www.doopes.com*
// @include http://doopes.com*
// @run-at document-end
// ==/UserScript==


var DOOPES = function () {
    var newDate = new Date();
    var today = newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDay();

    document.getElementById("from").value = "2000-01-01";
    document.getElementById("from").type = "hidden";
    
    document.getElementById("to").value = today;
    document.getElementById("to").type = "hidden";

    document.getElementById("tofield").style.display = "none";
    document.getElementById("fromfield").style.display = "none";
    document.getElementById("display_mode").style.display = "none";

    document.getElementById("c_all").click();

    document.getElementById("name_filter").style.paddingLeft = "448px";

    document.getElementById("num").value = 4;

    document.getElementById("exc").type = "hidden";

    document.getElementById("actions").style.cssFloat = "none";
    document.getElementById("actions").style.clear = "both";

    document.getElementById("actions").style.marginLeft = "auto";
    document.getElementById("actions").style.marginRight = "auto";
    document.getElementById("actions").style.paddingTop = "15px";
    document.getElementById("actions").style.width = "10em";

}

new DOOPES();