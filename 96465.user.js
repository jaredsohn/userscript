// ==UserScript==
// @name            Hide The Sheep
// @namespace       sheephider
// @description     Hide the percentage of picks on ESPN Streak for the Cash
// @include         http://streak.espn.go.com/en/*
// @version         0.1.3
// ==/UserScript==
var elements = document.getElementsByTagName("table");
for (var i=0;i<elements.length;i++) {
    var elm = elements[i];
    var elm_class = elm.getAttribute("class");
    if(elm_class != null) {
        if(elm_class.indexOf("Over") == -1 && elm_class.indexOf("Red") == -1 && elm_class.indexOf("Grn") == -1){
            var tds = elm.getElementsByTagName("td");
            for (var j=0;j<tds.length;j++) {
                var td = tds[j];
                var td_class = td.getAttribute("class");
                if(td_class == 'mg-column6') {
                    td.innerHTML = '';
                }
            }          
        }
    }
}