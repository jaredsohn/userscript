// ==UserScript==
// @name            GO Pipeline Whitelist
// @description     Whitelist for pipelines to display in GO
// @include         /go/home/
// @include         /go/pipelines/
// @include         /go/admin/pipelines/
// ==/UserScript==

(function() {

var keep = [
"Pipeline1",
"Pipeline2"
];

    // Pipeline page
setInterval(function(){
    try {
        var parent = document.getElementById("pipeline_groups_container");
        var divs = parent.children;
        var remove = new Array();
        for (var i = 0; i < divs.length; i++) {
            var persist = false;
            for (var j = 0; j < keep.length; j++) {
                if (divs[i].id.indexOf(keep[j]) != -1) persist = true;
            }    
                
            if (persist == false) remove.push(divs[i]);
        }
        
        for (var i = 0; i < remove.length; i++) {
            parent.removeChild(remove[i]);
        }
    } catch(err) { }
}, 1000);

    // Admin page
setInterval(function(){
    try {
        var divs = document.getElementsByClassName("group pipeline_group");
        var remove = new Array();
        for (var i = 0; i < divs.length; i++) {
            var persist = false;
            for (var j = 0; j < keep.length; j++) {
                if (divs[i].children[0].innerHTML.indexOf(keep[j]) == 0) persist = true;
            }    
        
            if (persist == false) remove.push(divs[i]);
        }
        
        for (var i = 0; i < remove.length; i++) {
            remove[i].parentNode.removeChild(remove[i]);
        }
    } catch(err) { }
}, 1000);

console.log("$('#pipelines_selector_pipelines input[type=checkbox]').not(':checked').parent().hide();");

})();