// ==UserScript==
// @name        Moodle Folders
// @namespace   http://userscripts.org/users/392674
// @description Ajudant per obrir carpetes
// @include     *://noumoodle.bernatelferrer.cat/course/*
// @include     *://192.168.0.9/course/*
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @version     1.0.1
// @grant       none
// ==/UserScript==

/*//Boilerplate for jQuery - start
//Code from http://snipplr.com/view/54863/wait-for-jquery-to-load/
var checker = 0;
 
function jqueryLoaded() {
    clearInterval(checker);
    //alert('jQuery is loaded, sire!');
    main();
}
 
function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
    }
    if (checker === 0) {
        //alert('Setting up interval');
        
        var el = document.createElement("script");
        el.src = "http://code.jquery.com/jquery-latest.min.js";
        document.getElementsByTagName("head")[0].appendChild(el);
        
        checker = window.setInterval(checkJquery, 100);
    }
}	
 
checkJquery();
//Boilerplate for jQuery - end*/

function tagThings() {
    $("img[alt='Carpeta']").closest(".activityinstance").addClass("custom_folder");
}

function addGUI() {
    //Carpetes
    $(".custom_folder").closest(".activity").append($("<div class='tree_container'></div>").hide());
    $(".custom_folder").prepend($("<span class='moar_btn'>+ </span>"));
}

function main() {
    $(document).ready(function () {
        console.log("Initializing moodle folders");
        
        tagThings();
        addGUI();
        
        $(".moar_btn").click(function () { //Carpetes
            console.log("clicked folder");
            var container = $(this).closest(".custom_folder");
            var dir = container.children("a").prop("href");
            var tree = container.closest(".activity").children(".tree_container");
            
            if (tree.is(":empty")) {
                tree.text("Loading...").slideToggle();
                tree.load(dir + " #folder_tree0", function (a, b, c) {
                    tree.hide();
                    tree.find("ul:eq(0)").replaceWith(tree.find("ul:eq(1)"));
                    tree.slideDown();
                });
            } else {
                tree.slideToggle();
            }
        });
        
        // Va automàticament a la última pestanya
        $(".yui3-tabview-list").find("li").last().click();
        
        console.log("Initialized ok");
    
    });
}

main();