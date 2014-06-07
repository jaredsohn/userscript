// ==UserScript==
// @name Redmine Submit Guard
// @namespace http://twitter.com/foldrr/
// @include http://*/redmine/projects/*/issues/new
// @include http://*/redmine/issues/*
// ==/UserScript==

(function(){
    var form = document.getElementByID("issue-form");
    var inputs = form.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        if(inputs[i].type == "text"){
            inputs[i].addEventListener('keypress', function(e){
                if(e.keyCode == 13){
                    e.stopPropagation();
                    e.preventDefault();
                }
            }, true);
        }
    }
})();