// ==UserScript==
// @name        NouMoodle
// @namespace   http://userscripts.org/users/392674
// @description [Placeholder]
// @include     *://noumoodle.bernatelferrer.cat/course/*
// @include     *://192.168.0.9/course/*
// @version     1.1
// @grant       none
// ==/UserScript==

// - - - VARIABLES - - - //

var hores = ["8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", 
            "11:00 - 11:30", //Pati
            "11:30 - 12:30", "12:30 - 13:30", "13:30 - 14:30", ];
var horari = {
    dilluns: ["Sistemes", "Sistemes", "Anglés", "PATI", "Xarxes", "Xarxes", "FOL"],
    dimarts: ["Muntatge", "Muntatge", "Xarxes Locals", "PATI", "Tutoría", "Anglés"],
    dimecres: ["Ofimàtica", "Ofimàtica", "FOL", "PATI", "Sistemes", "Sistemes"],
    dijous: ["Muntatge", "Muntatge", "Ofimàtica", "PATI", "Xarxes", "Anglès", "FOL"],
    divendres: ["Xarxes", "Muntatge", "Muntatge", "PATI", "Ofimàtica", "Ofimàtica"]
};

// - - - VARIABLES - - - //
//(No editar res per sota d'aquí)

//Posem el nombre de classes bé
var clases = 0;

for (dia in horari){
    if (clases < horari[dia].length){
        clases = horari[dia].length
    };
};

//Boilerplate for jQuery - start
//Code from http://snipplr.com/view/54863/wait-for-jquery-to-load/
var checker = 0;
function jqueryLoaded() {
    clearInterval(checker);
    //alert('jQuery is loaded, sire!');
    main();
};
function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
    };
    if(checker == 0) {
        //alert('Setting up interval');
        checker = window.setInterval(checkJquery, 100);
    } else {
        el = document.createElement("script");
        el.src = "http://code.jquery.com/jquery-latest.min.js";
        document.getElementsByTagName("head")[0].appendChild(el);
    };
};
checkJquery();
//Boilerplate for jQuery - end

function tagThings(){
    $("img[alt='Carpeta']").closest(".activityinstance").addClass("custom_folder");
    $("img[alt='Tasca']").closest(".activityinstance").addClass("custom_activity");
    $("img[alt='Tasca (2.2)']").closest(".activityinstance").addClass("custom_activity_2");
};

function addCSS(){
    $("<style>").text(".activity_done {background-color:#80FF80}").appendTo("head");
    $("<style>").text(".activity_passed {background-color:#FF9999}").appendTo("head");
    $("<style>").text(".activity_pending {background-color:#FFFF00}").appendTo("head");
};

function addGUI(){
    //Carpetes
    $(".custom_folder").closest(".activity").append($("<div class='tree_container'></div>").hide());
    $(".custom_folder").prepend($("<span class='moar_btn'>+ </span>"));
    
    //Comprovar activitats
    $(".yui3-menuitem").closest("ul").append($("<li class='yui3-menuitem'><a class='yui3-menuitem-content' id='check_button'>Comprovar activitats</a></li>"));
    
    //Horari
    $(".yui3-menuitem").closest("ul").append($("<li class='yui3-menuitem'><a class='yui3-menuitem-content' id='timetable_button'>Horari</a></li>"));
    $("#page-content").prepend($("<div id='timetable_container'><br><p>HORARI</p><table id='timetable_table' class='generaltable'></table></div>").hide());
    var table = $("#timetable_table");
    
    var row = $("<tr>");
    row.append($("<td class='r0'>").text("")); //Cel·la esquerre superior (Blanc)
    for (dia in horari){
        var text = $("<span style='font-size=40px; font-weight:bold;'>").text(dia.charAt(0).toUpperCase() + dia.slice(1));
        row.append($("<td>").addClass("r0").append(text));
    };
    table.append(row);
    
    for (var hora=0; hora < clases; hora++){
        if (hora%2 == 0){
    		var row = $("<tr>").addClass("r0");
    	} else {
       		var row = $("<tr>").addClass("r1");
       	};
       	
       	row.append($("<td>").text(hores[hora]));
        
        for (dia in horari){
            row.append($("<td>").text(horari[dia][hora]));
        };
        
        table.append(row);
    };
};

function main(){
    $(document).ready(function(){
        console.log("Initializing moodle helper");
        
        tagThings();
        addCSS();
        addGUI();
        
        $("#timetable_button").click(function(){ //Horari
            console.log("clicked timetable");
            
            $("#timetable_container").slideToggle();
        });
        
        $(".moar_btn").click(function(){ //Carpetes
            console.log("clicked folder");
            var container = $(this).closest(".custom_folder");
            var dir = container.children("a").prop("href");
            var tree = container.closest(".activity").children(".tree_container");
            
            if (tree.is(":empty")){
                tree.text("Loading...").slideToggle();
                tree.load(dir + " #folder_tree", function(a, b, c){
                    tree.hide();
                    tree.find("ul:eq(0)").replaceWith(tree.find("ul:eq(1)"));
                    tree.slideDown();
                });
            } else {
                tree.slideToggle();
            };
        });
        
        $("#check_button").click(function(){ //Activitats
            console.log("checking activities");
            
            var all = $(".custom_activity"); //Entregues
            $.each(all, function(a, b){
                var current = $(b);
                
                $.get(current.find("a").prop("href")).done(function(data){
                    var page = $($.trim(data));
                    
                    if (page.find(".submissionstatussubmitted").length > 0){
                        current.addClass("activity_done");current.addClass("activity_done");
                        if (page.find(".feedbacktable").length > 0){
                            var cont = $("<div class='sub_container'></div>").hide();
                            cont.append(page.find(".feedbacktable"));
                            current.after(cont);
                            
                            //Afegim el botó
                            current.append($("<span class='sub_btn'> [comentari]</span>"));
                            $(".sub_btn").unbind("click").click(function(){
                                console.log("clicked submission moar");
                                $(this).parent().parent().find(".sub_container").slideToggle();
                            });
                        };
                    } else {
                        if (page.find(".overdue").length > 0){
                            current.addClass("activity_passed");
                        } else {
                            current.addClass("activity_pending");
                            var remaining = page.find(".lastrow").find(".lastcol").text();
                            current.append($("<span>").text(" [Temps restant: " + remaining + " ]"));
                        };
                    };
                });
            });
            
            var all = $(".custom_activity_2");  //Llistes (tasca 2.2)
            $.each(all, function(a, b){
                var current = $(b);
                
                $.get(current.find("a").prop("href")).done(function(data){
                    var page = $($.trim(data));
                    
                    if (page.find(".files").find("a").length > 0){
                        current.addClass("activity_done");
                        if (page.find(".feedback").length > 0){
                            var cont = $("<div class='sub_container'></div>").hide();
                            cont.append(page.find(".feedback"));
                            current.after(cont);
                            
                            //Afegim el botó
                            current.append($("<span class='sub_btn'> [comentari]</span>"));
                            $(".sub_btn").unbind("click").click(function(){
                                console.log("clicked submission moar");
                                $(this).parent().parent().find(".sub_container").slideToggle();
                            });
                        };
                    } else {
                        current.addClass("activity_pending");
                        var date = page.find(".c1").eq(1).text();
                        current.append($("<span>").text(" [Data d'entrega: " + date + " ]"))
                    };
                });
            });
            
        });
        
        console.log("Initialized ok");
    
    });
};