// ==UserScript==
// @name        Moodle Suite
// @namespace   http://userscripts.org/users/392674
// @description Suite per al Moodle
// @include     *://noumoodle.bernatelferrer.cat/*
// @include     *://192.168.0.9/*
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @version     0.1.4
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

var timetable = function() {
    // - - - VARIABLES - - - //

    //Es pot espandir, només cal tenir en compte de mantenir la estructura com ara.
    //És important que el format de les hores sigui "hora:minuts - hora:minuts"
    //Haurá d'estar en format de 24 hores.
    var hores = [
            "15:15 - 16:10",
            "16:10 - 17:05",
            "17:05 - 18:00",
            "18:00 - 18:30",  //Pati
            "18:30 - 19:25",
            "19:25 - 20:20",
            "20:20 - 21:15"
        ];

    //Es faran servir d'ara endavant per referisr-se a les assignatures
    //Plantilla: "id": ["nom llarg", "direcció web"],
    //Si no te web deixar ""
    var x_id = {
            "m04": ["SO xarxes", "/course/view.php?id=329"],
            "m06": ["Seguretat", "/course/view.php?id=50"],
            "m07": ["Serveis", "/course/view.php?id=301"],
            "m08a": ["WebApp (M)", "/course/view.php?id=310"],
            "m08b": ["WebApp (C)", "/course/view.php?id=310"],
            "m10": ["Empresa", "/course/view.php?id=413"],
            "tut": ["Tutoria", "/course/view.php?id=324"],
            "pti": ["Pati", "http://xkcd.com"]
        };

    //Aquesta és la informació de la taula de l'horari.
    //La primera hora correspon a la primera classe de cada dia.
    var horari = {
        dilluns: [
            "m07",
            "m07",
            "tut",
            "pti",
            "m08a",
            "m08a"
        ],
                
        dimarts: [
            "m06",
            "m06",
            "m07",
            "pti",
            "m07",
            "m04"
        ],
                
        dimecres: [
            "",
            "m06",
            "m06",
            "pti",
            "m10",
            "m04",
            "m04"
        ],
                
        dijous: [
            "m08a",
            "m08b",
            "m08b",
            "pti",
            "m04",
            "m04"
        ],
                
        divendres: [
            "m08b",
            "m08b",
            "m10",
            "pti",
            "m07",
            "m07"
        ]
    };

    // - - - VARIABLES - - - //
    //(No editar res per sota d'aquí)

    //NO BAIXIS MéS!!!!!

    //Index per trobar el nom del dia de la setmana a aprtir del numero
    var index_dies = Object.keys(horari);

    //Posem el nombre de classes al dia més llarg correctament
    var clases = 0, dia;
    for (dia in horari) {
        if (horari[dia].length > clases) {
            clases = horari[dia].length;
        }
    }

    function addCSS() {
        //Per la classe highlighted
        $("<style>").text("#timetable_table tr>td.current_class{background-color:#8AE62E; border: 3px solid green};").appendTo("head");
    }

    function addGUI() {
        //Boté a la barra superior del moodle
        $(".yui3-menuitem").closest("ul").append($("<li class='yui3-menuitem'><a class='yui3-menuitem-content' id='timetable_button'>Horari</a></li>"));
        
        //Div amagat per a la taula
        $("#page-content").prepend($("<div style='padding-left: 50px;' id='timetable_container'><br><p><h1>HORARI</h1></p><table id='timetable_table' class='generaltable'></table></div>").hide());
        var table = $("#timetable_table"), row = $("<tr class='custom_table_header'>"), dia, text;
        
        row.append($("<td style='border: 0px'><span id='timetable_update_button'>Actualitzar</span></td>")); //  Cel·la 0, 0
        for (dia in horari) {
            text = $("<span style='font-size=40px; font-weight:bold;'>").text(dia.charAt(0).toUpperCase() + dia.slice(1));
            row.append($("<td>").addClass("r0").append(text));
        }
        table.append(row);
        
        var hora;
        for (hora = 0; hora < clases; hora++) {
            if (hora % 2 === 0) {
                row = $("<tr>").addClass("r0");
            } else {
                row = $("<tr>").addClass("r1");
            }
            
            row.append($("<td class='custom_table_hour'>").text(hores[hora]));
            
            for (dia in horari) {
                var class_obj = x_id[horari[dia][hora]];
                if (class_obj !== undefined) {  //Hi ha classe
                    var content;
                    
                    if (class_obj[1] === "") {  //No hi ha link
                        content = $("<span>").text(class_obj[0]);
                    } else {  //Si link
                        content = $("<a>");
                        content.prop("href", class_obj[1]);
                        content.text(class_obj[0]);
                    }
                    
                    row.append($("<td>").append(content));
                } else {  //No hi ha classe, cel·la buida
                    row.append($("<td>"));
                }
            }
            
            table.append(row);
        }
    }

    function always2(i) {
        i = i.toString();
        if (i.length < 2) {
            i = "0"+i;
        }
        return i;
    }

    function updateTable() {
        //Busquem quina hora és
        //current será l'index de l'array hores
        var date = new Date(), i, hora, hora1, hora2, current = -1;
        
        for (i = 0; i < clases; i++) {
            hora = hores[i].split(" - ");
            
            hora1 = new Date();
            hora1.setHours(parseInt(hora[0].split(":")[0]));
            hora1.setMinutes(parseInt(hora[0].split(":")[1]));
            
            hora2 = new Date();
            hora2.setHours(parseInt(hora[1].split(":")[0]));
            hora2.setMinutes(parseInt(hora[1].split(":")[1]));
            
            if (hora1 <= date && date <= hora2) {
                current = i;
            }
        }
        
        //Traiem qualsevol cel·la marcada
        $(".current_class").removeClass("current_class");
        
        //Afegim la classe CSS a la cel·la correcte
        if (current > -1 && date.getDay() > 0) {
            var td = $("#timetable_table").find("tr").eq(current + 1).find("td").eq(date.getDay());
            if (td.html() !== "") {
                td.addClass("current_class");
            }
        }
        
    }

    function main() {
        $(document).ready(function () {
            console.log("Initializing timetable");

            addCSS();
            addGUI();
            
            $("#timetable_button").click(function () {  //Horari
                console.log("clicked timetable");
                
                $("#timetable_container").slideToggle();
            });
            
            $("#timetable_update_button").click(function () {  //Actualitza Horari
                console.log("clicked update timetable");
                
                updateTable();
            });
            
            updateTable();
            setInterval(updateTable, 1000);
            
            console.log("Timetable ok");
        
        });
    }

    main();
};

var folders = function() {
    function tagThings() {
        $(".accesshide:contains('Carpeta')").closest(".activityinstance").addClass("custom_folder");
    }

    function addCSS() {
        $("<style>").text(".custom_folder {margin-left:-15px;display:table;}").appendTo("head");
    }

    function addGUI() {
        //Carpetes
        $(".custom_folder").closest(".activity").append($("<div class='tree_container'></div>").hide());
        $(".custom_folder").prepend($("<span class='moar_btn' style='display:table-cell;vertical-align:middle;'><a href=javascript:void(0) style='margin-right:5px;'><img alt='+' src='http://www.irisana.com/img/plus-icon.gif'></img></a></span>"));
    }

    function main() {
        $(document).ready(function () {
            console.log("Initializing moodle folders");
            
            tagThings();
            addCSS();
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
            
            // Va automáticament a la última pestanya
            $(".yui3-tabview-list").find("li").last().click();
            
            console.log("Folders ok");
        
        });
    }

    main();
};

var activity_checker = function() {
    var total = 0;
    var count = 0;
    var checked = false;

    function tagThings() {
        $(".accesshide:contains('Tasca')").closest(".activityinstance").addClass("custom_activity").addClass("custom_activity_1");
        
        $(".accesshide:contains('Tasca (2.2)')").closest(".activityinstance").removeClass("custom_activity_1").addClass("custom_activity_2");
        

        $(".custom_activity").find(".activityicon").addClass("single_check");
    }

    function addCSS() {                                            
        $("<style>").text(".activity_done {background-color:#80FF80}").appendTo("head");
        $("<style>").text(".activity_passed {background-color:#FF9999}").appendTo("head");
        $("<style>").text(".activity_pending {background-color:#FFFF00}").appendTo("head");
        $("<style>").text(".activity_unknown {background-color:#C0C0C0}").appendTo("head");
    }

    function addGUI() {
        //Comprovar activitats
        $(".yui3-menuitem").closest("ul").append($("<li class='yui3-menuitem'><a class='yui3-menuitem-content' id='check_button'>Comprovar activitats</a></li>"));
        
        //Comprovar activitats d'una secció només
        waitForKeyElements(".yui3-tab-panel", function(node) {
            node.prepend($("<div style='text-align:right;float:right;margin:2px;padding:5px;'><a href='javascript:void(0)'><span class='tab_check' style='margin:2px;padding:5px;background-color:#2775c4;border:solid 2px;border-color:#043667;border-radius:5px;color: white;'>Comprovar</span></a></div>"));
            
            //Necessita estar qui, per que quan s'executa main, aixo encara no existeix.
            node.find(".tab_check").click(function () {
                total = 0;
                count = 0;
                populateSection($(this).closest(".yui3-tab-panel"));
            });
        });
        
        //Per que el clic a la imatge de la activitat no tingui cap efecte
        $(".single_check").each(function () {
            $(this).prependTo($(this).parent().parent());
            //$(this).wrap();
        });
        
        //Percentatge
        $("#page").before($("<div align='center' style='width:100%;position:fixed;z-index:999;'><div id='progress_aligner' align='left'><div id='progress_container' style='display:none;'><div id='progress' align='center' style='height:15px;background-color:#1ee713;border:solid 2px;border-color:#17a30f;width:0%;'><span id='progress_display'>0%</span></div></div></div>"));
        $("#progress_aligner").width($("#menuwrap").width());
    }

    function populateActivity(custom_activity_node) {
        custom_activity_node = $(custom_activity_node);
        
        if (custom_activity_node.hasClass("custom_activity")) {
            console.log("checking activity");
            
            if (custom_activity_node.hasClass("custom_activity_1")) {
                $.get(custom_activity_node.find("a").prop("href")).done(function (data) {
                    count += 1;
                    updateProgress();
                    var page = $($.trim(data));
                    
                    if (page.find(".submissionstatussubmitted").length > 0) {
                        if (page.find(".plugincontentsummary").length === 0) {
                            custom_activity_node.addClass("activity_pending");
                        } else {
                            custom_activity_node.addClass("activity_done");
                            if (page.find(".feedbacktable").length > 0) {
                                var cont = $("<div class='sub_container'></div>").hide();
                                cont.append(page.find(".feedbacktable"));
                                custom_activity_node.after(cont);
                                
                                //Button
                                custom_activity_node.append($("<span class='sub_btn'> [comentari]</span>"));
                                $(".sub_btn").unbind("click").click(function () {
                                    console.log("clicked submission moar");
                                    $(this).parent().parent().find(".sub_container").slideToggle();
                                });
                            }
                        }
                    } else {
                        if (page.find(".overdue").length > 0) {
                            custom_activity_node.addClass("activity_passed");
                        } else {
                            custom_activity_node.addClass("activity_pending");
                            var remaining = page.find(".lastrow").find(".lastcol").text();
                            custom_activity_node.append($("<span>").text(" [Temps restant: " + remaining + " ]"));
                        }
                    }
                });
            }
        } else {
            console.log("bad activity");
        }
    }

    function populateSection(section_node) {
        console.log("checking section");
        
        var section = $(section_node);
        
        $.each(section.find(".custom_activity"), function(a, b) {
            populateActivity(b);
            total += 1;
        });
    }

    function populateTab(tab_node) {
        console.log("checking tab");
        var tab_position = $(tab_node).prevAll().length;
        var section = $("[id*='section-']")[tab_position];
        
        populateSection(section);
    }

    function updateProgress() {
        var percent = (count / total) * 100;
        
        if (percent > 0 && percent < 100) {
            console.log("update progress:", percent);
            $("#progress_container").show();
            $("#progress").css("width", percent + "%");
            $("#progress_display").text(percent.toString().slice(0,2) + "%");
        } else {
            $("#progress_container").hide();
        }
    }

    function checkAllActivities() {
        if (checked === true) {
            alert("Ja comprovat!");
        } else {
            console.log("checking all activities");
            checked = true;
            
            var tabs = $(".yui3-tab");
            if (tabs.length >= 1) {
                total = 0;
                count = 0;
                $.each(tabs, function(a, b) {
                    populateTab(b);
                });
            } else {
                count = 0;
                total = $(".custom_activity").length;
                $.each($(".custom_activity"), function(a, b) {
                    populateActivity(b);
                });
            }
        }
    }

    /*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
        that detects and handles AJAXed content.

        Usage example:

            waitForKeyElements (
                "div.comments"
                , commentCallbackFunction
            );

            //--- Page-specific function to do what we want when the node is found.
            function commentCallbackFunction (jNode) {
                jNode.text ("This comment changed by waitForKeyElements().");
            }

        IMPORTANT: This function requires your script to have loaded jQuery.
    */
    function waitForKeyElements (
        selectorTxt,    /* Required: The jQuery selector string that
                            specifies the desired element(s).
                        */
        actionFunction, /* Required: The code to run when elements are
                            found. It is passed a jNode to the matched
                            element.
                        */
        bWaitOnce,      /* Optional: If false, will continue to scan for
                            new elements even after the first match is
                            found.
                        */
        iframeSelector  /* Optional: If set, identifies the iframe to
                            search.
                        */
    ) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined") {
            targetNodes     = $(selectorTxt);
        } else {
            targetNodes     = $(iframeSelector).contents ()
                                               .find (selectorTxt);
        }

        if (targetNodes  &&  targetNodes.length > 0) {
            btargetsFound   = true;
            /*--- Found target node(s).  Go through each and act if they
                are new.
            */
            targetNodes.each ( function () {
                var jThis        = $(this);
                var alreadyFound = jThis.data ('alreadyFound')  ||  false;

                if (!alreadyFound) {
                    //--- Call the payload function.
                    var cancelFound     = actionFunction (jThis);
                    if (cancelFound) {
                        btargetsFound   = false;
                    } else{
                        jThis.data ('alreadyFound', true);
                    }
                }
            } );
        }
        else {
            btargetsFound   = false;
        }

        //--- Get the timer-control variable for this selector.
        var controlObj      = waitForKeyElements.controlObj  ||  {};
        var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
        var timeControl     = controlObj [controlKey];

        //--- Now set or clear the timer as appropriate.
        if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
            //--- The only condition where we need to clear the timer.
            clearInterval (timeControl);
            delete controlObj [controlKey];
        }
        else {
            //--- Set a timer, if needed.
            if ( ! timeControl) {
                timeControl = setInterval ( function () {
                        waitForKeyElements (    selectorTxt,
                                                actionFunction,
                                                bWaitOnce,
                                                iframeSelector
                                            );
                    },
                    300
                );
                controlObj [controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj   = controlObj;
    }
    
    function main() {
        $(document).ready(function () {
            console.log("Initializing Activity checker");
            
            tagThings();
            addCSS();
            addGUI();
            
            $("#check_button").click(function () { //Tasques
                checkAllActivities();
            });
            
            $(".single_check").click(function () {
                populateActivity($(this).closest(".custom_activity"));
            });
            
            console.log("Activity checker ok");
            
            if (window.location.hash === "#check_all") {
                checkAllActivities();
            }
        });
    }

    main();
};

var easter_eggs = function() {
    var valentines = function() {
        var s=document.createElement('style');
        s.innerHTML = "@keyframes hearts {to {font-size:0;}}";
        document.getElementsByTagName('head')[0].appendChild(s);
        
        function heart(x, y, size) {
            var e = document.createElement("div");
            e.innerHTML = "?";
            e.style.fontSize = (size) + "px";
            e.style.color = "red";
            e.style.position = "fixed";
            e.style.top = (y)+"px";
            e.style.left = (x)+"px";
            e.style.marginTop = "0px";
            e.addEventListener("animationend", function(){e.remove();});
            document.body.appendChild(e);
            e.style.MozAnimation = "hearts 3s";
        }
        function randomHeart() {heart(Math.random()*window.screen.width,Math.random()*window.screen.height, 70);}
        randomHeart();
        setInterval(randomHeart, 2000);
        
        var count=0;
        function trail(e) {
            if (count > 5) {
                count = 0;
                heart(e.clientX, e.clientY, 20);
            } else {
                count = count + 1;
            }
            
        }
        window.addEventListener("mousemove", trail);
    };
    var catalonia = function() {
        function flag(x, y, h, w) {
            var e = document.createElement("img");
            e.src = "//upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/200px-Flag_of_Catalonia.svg.png";
            e.style.position = "fixed";
            e.style.top = (y) + "px";
            e.style.left = (x) + "px";
            e.style.height = (h) + "px";
            e.style.width = (w) + "px";
            e.style.display = "block";
            e.style.transformOrigin = "0 0";
            document.body.appendChild(e);
            return e;
        }
        flag(0, 0, 30, window.screen.width);
        flag(30, 0, 30, window.screen.height).style.transform = "rotate(90deg)";
    };
    
    var dateObject = new Date();
    var day = dateObject.getDate();
    var month = dateObject.getMonth()+1;
    var year = dateObject.getFullYear();
    
    if (day == 14 && month == 2) {valentines();}  //san valentin
    if (day == 11 && month == 9) {catalonia();}  //diada de catalunya
};

function main() {
    easter_eggs();

    var url = window.location.href;

    if (/.*:\/\/noumoodle\.bernatelferrer\.cat\/.*/.test(url) || /.*:\/\/192\.168\.0\.9\/.*/.test(url)) {
        console.log("timetable");
        timetable();
    }

    if (/.*:\/\/noumoodle\.bernatelferrer\.cat\/course\/.*/.test(url) || /.*:\/\/192\.168\.0\.9\/course\/.*/.test(url)) {
        console.log("course");
        activity_checker();
        folders();
    }
}

main();