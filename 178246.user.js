// ==UserScript==
// @name           kopierpaste 2.0
// @namespace      krautchan-kopierpasten
// @description    Kopierpaste einfuegen
// @include        http://krautchan.net/*
// @include        http://www.krautchan.net/*
// @include        https://krautchan.net/*
// @include        https://www.krautchan.net/*
// ==/UserScript==

var pasta_lists=[];

var main = function (){
    var callback = function() {
        function filter_selects(evt){
            fill_pasta_select(evt);
            fill_category_select();
        }
        function fill_category_select(){
            var category_select = jQuery("#category_select");
            var searchbox = jQuery("#pasta_searchbox");
            searchterm = searchbox.val();
            category_select.html("");
            var categories = [];
            for(list_index in pasta_lists){
                pasta_list = pasta_lists[list_index];
                for(category in pasta_list){
                    if(categories.indexOf(category) == -1){
                        pastas = pasta_list[category];
                        has_pastas = false;
                        for(pasta_name in pastas){
                            if(pastas[pasta_name].match(new RegExp(searchterm, "i"))){
                                has_pastas = true;
                                break;
                            }
                        }
                        if(has_pastas){
                            categories.push(category);
                        }
                    }
                }
            }
            categories = categories.sort(function(a, b){return a.toUpperCase() > b.toUpperCase()});
            jQuery(categories).each(function(){
                var option = jQuery("<option>");
                var categoryname = this.toString()
                option.val(categoryname).text(categoryname);
                category_select.append(option);
            });
        }
        function fill_pasta_select(evt){
            var pasta_select = jQuery("#pasta_select");
            pasta_select.html("");
            var category_select = jQuery("#category_select");
            var category = category_select.val();
            var searchterm = jQuery("#pasta_searchbox").val();
            var pasta_names = [];
            var pastas = {}
            for(list_index in pasta_lists){
                var list = pasta_lists[list_index];
                if(list[category_select.val()] != undefined){
                    for(pasta_name in list[category]){
                        var pasta = list[category][pasta_name];
                        if(pasta.match(new RegExp(searchterm, "i"))){
                            pasta_names.push(pasta_name);
                            pastas[pasta_name] = pasta;
                        }
                    }
                }
            }
            pasta_names = pasta_names.sort(function(a, b){return a.toUpperCase() > b.toUpperCase()});
            jQuery(pasta_names).each(function(){
                var option = jQuery("<option>");
                var pasta_name = this.toString()
                var pasta = pastas[pasta_name];
                option.val(pasta).text(pasta_name);
                pasta_select.append(option);
            });
        }
        function add_pasta(evt){
            var category = prompt("Kategorie:");
            var name = null;
            if(category != null){
                name = prompt("Name:");
            }
            if(name != null){
                var index = pasta_lists.length - 2; // the script export functions are the last item
                pasta_list = pasta_lists[index];
                if(pasta_list[category] == undefined){
                    pasta_list[category] = {};
                }
                pasta_list[category][name] = jQuery("#postform_comment").val()+"\n";
                localStorage.setItem("own_pastas", JSON.stringify(pasta_list));
                fill_category_select();
                fill_pasta_select();
            }
            return false;
        }
        function remove_pasta(evt){
            var category = jQuery("#category_select").val();
            var pasta_name = jQuery("#pasta_select").find(":selected").text();
            var pasta_list = pasta_lists[pasta_lists.length - 2]; // the script export functions are the last item
            if(!category || !pasta_name){
                alert("Keine Paste ausgewählt");
            }else{
                if(pasta_list[category] == undefined || pasta_list[category][pasta_name] == undefined){
                    alert("Es können nur selber hinzugefügte Pasten gelöscht werden.");
                }else{
                    delete pasta_list[category][pasta_name];
                    if(Object.keys(pasta_list[category]).length == 0){
                        delete pasta_list[category];
                        fill_category_select();
                    }
                    fill_pasta_select();
                    localStorage.setItem("own_pastas", JSON.stringify(pasta_list));
                }
            }
            return false;
        }
        function import_pastas(evt){
            var input = jQuery("#postform_comment").val();
            var error = false;
            var pasta_list = pasta_lists[pasta_lists.length - 2];
            try{
                var own_pastas_list = JSON.parse(input);
                if(typeof own_pastas_list == "object"){
                    for(category in own_pastas_list){
                        if(typeof category != "string"){
                            error=true;
                            break;
                        }
                        if(Object.keys(pasta_list).indexOf(category) == -1){
                            pasta_list[category] = {};
                        }
                        if(typeof own_pastas_list[category] == "object"){
                            for(pasta_name in own_pastas_list[category]){
                                var pasta = own_pastas_list[category][pasta_name];
                                if(typeof pasta != "string"){
                                    error = true;
                                }else{
                                    pasta_list[category][pasta_name] = pasta;
                                }
                            }
                        }else{
                            error = true;
                        }
                    }
                }else{
                    error = true;
                }
            }catch(e){
                console.log(e);
                error = true;
            }
            if(error){
                alert("Syntaxfehler. Syntax: {\"Kategorie\": {\"Name\": \"Inhalt\", ...}, ...}");
            }else{
                fill_category_select();
                fill_pasta_select();
                localStorage.setItem("own_pastas", JSON.stringify(pasta_list));
                alert("Import erfolgreich.")
            }
            return false;
        }
        jQuery.noConflict();
        table=jQuery("#postform_table");
        var label_td = jQuery("<td>").addClass("label").text("Kopierpaste:");
        var searchbox = jQuery("<input type=\"search\">")
            .attr("autocomplete", "off")
            .attr("id", "pasta_searchbox").keyup(filter_selects);
        var clearbutton = jQuery("<span>").text("[x]").css("cursor", "pointer")
                .click(function(evt){jQuery("#pasta_searchbox").val("");filter_selects()})
        var category_select = jQuery("<select>").attr("id", "category_select")
            .attr("size", "10").change(fill_pasta_select)
        var copypasta_select = jQuery("<select>").attr("id", "pasta_select")
            .attr("size", "10").change(function(evt){
                jQuery("#postform_comment").attr(
                    "value",
                    jQuery("#postform_comment").attr("value")+this.value);
            })
        var add_link = jQuery("<a>").text("Paste hinzufügen").attr("href", "#")
            .click(add_pasta);
        var remove_link = jQuery("<a>").text("Paste löschen").attr("href", "#")
            .click(remove_pasta);
        var import_link = jQuery("<a>").text("Pasten importieren").attr("href", "#")
            .click(import_pastas);
        var spacer = jQuery("<span>").text(" ");
        var spacer2 = jQuery("<span>").text(" ");
        var pastas_td = jQuery("<td>").attr("align", "left")
            .append(searchbox)
            .append(clearbutton)
            .append("<br>")
            .append(category_select)
            .append(copypasta_select)
            .append("<br>")
            .append(add_link)
            .append(spacer)
            .append(remove_link)
            .append(spacer2)
            .append(import_link);

        tr = jQuery("<tr>").attr("id", "postform_row_pastas")
             .append(label_td).append(pastas_td);
        table.find("#postform_row_sage").after(tr);

        fill_category_select();
        jQuery("#postform").submit(function(){
            jQuery("#postform_row_pastas").remove();
        });
    }
    var exportScript = function(own_pastas){
        own_pasta_index = pasta_lists.length - 1 // script export not added, yet
        if(own_pastas == 0){
            // own_pastas are excluded
            my_pasta_lists = pasta_lists.slice(0, own_pasta_index);
        }else if(own_pastas == 1){
            my_pasta_lists = pasta_lists;
            // avoid empty array
            if(Object.keys(my_pasta_lists[own_pasta_index]).length == 0){
                my_pasta_lists = my_pasta_lists.slice(0, own_pasta_index);
            }
        }else if(own_pastas == 2){
            // we want only the own_pastas, even when they are {}
            my_pasta_lists = pasta_lists.slice(own_pasta_index, own_pasta_index+1);
        }
        var script = "// ==UserScript==\n"+
        "// @name           kopierpaste 2.0\n"+
        "// @namespace      krautchan-kopierpasten\n"+
        "// @description    Kopierpaste einfuegen\n"+
        "// @include        http://krautchan.net/*\n"+
        "// @include        http://www.krautchan.net/*\n"+
        "// @include        https://krautchan.net/*\n"+
        "// @include        https://www.krautchan.net/*\n"+
        "// ==/UserScript==\n\n"+
        "var pasta_lists=" + JSON.stringify(my_pasta_lists)+";\n\n"+
        "var main = "+
        main.toString()+
        "\n"+"main();";
        return script;
    }

    var own_pastas = JSON.parse(localStorage.getItem("own_pastas"));
    if(own_pastas == null){
        own_pastas = {}
    }
    pasta_lists.push(own_pastas);

    var exportOwnPastas = function() {
        return localStorage.getItem("own_pastas");
    }
    var exportAllPastas = function() {
        return JSON.stringify(pasta_lists);
    }
    pasta_lists.push({" Script ": {
        "Script Export (ohne eigene Pasten)": exportScript(0),
        "Script Export (mit allen Pasten)": exportScript(1),
        "Script Export (nur eigene Pasten)": exportScript(2),
        "Eigene Pasten": exportOwnPastas(),
        "Alle Pasten": exportAllPastas(),
    }});

    //fix for non-mozilla browsers
    if (typeof unsafeWindow == "undefined") {
        unsafeWindow = window;
    }

    if(typeof jQuery == 'undefined'){
        var script = document.createElement("script");
        unsafeWindow.pasta_lists=pasta_lists;
        script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }
}
main();
