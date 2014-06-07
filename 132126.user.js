// ==UserScript==
// @name           S2-layer functions list
// @namespace      http://yoksel.ru/
// @description    Add the functions list to page with layer source.
// @include        *layersource.bml*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle("  \
#funcIndex{  \
    position: fixed;  \
    right: 5px;   \
    top: 15px;  \
    width: 300px;  \
    max-height: 93%;  \
    padding: 5px 5px 5px;  \
    overflow-y: hidden;  \
    background: rgba(255,255,255,0.9);  \
    border: 1px solid #DDD;  \
    font: 12/1.2 Arial;  \
    }  \
#funcIndex DIV {  \
    float: left;  \
    clear: both;  \
    width: auto;  \
    padding: 3px 5px;   \
    }   \
#funcIndex A,  \
#funcIndex A:visited {  \
    color: steelblue;  \
    }  \
.current {  \
    background: lightseagreen;   \
    }  \
#funcIndex .current,      \
#funcIndex .current A {  \
    font-weight: bold;  \
    text-decoration: none;  \
    color: #FFF;  \
    }  \
#funcIndex DIV#layerName {  \
    width: 290px;  \
    background: navajowhite;  \
    }  \
#layerName span {  \
    font-weight: bold;  \
    font-size: 18px;  \
    }  \
#layerName A,  \
#layerName A:visited{  \
    float: right;  \
    padding: 0 5px;  \
    line-height: 22px;  \
    color: #333;  \
    }      \
#switchList {  \
    margin: 10px 0px;  \
    }      \
#switchList span {  \
    padding: 3px 5px;  \
    cursor: pointer;  \
    }      \
#switchList .active-item {  \
    background: gold;  \
    cursor: default;  \
    }  \
#functions,#propgroups,#classes {  \
    display: none;  \
    }  \
#funcIndex .active-list {  \
    display: block;  \
    width: 290px;  \
    height: 550px;  \
    margin-bottom: 5px;  \
    padding-bottom: 10px;  \
    overflow-y: scroll;  \
    }   \
.ancor {  \
    display: inline-block;  \
    width: 1px;  \
    height: 1px;  \
    }     \
      \
.navajowhite {  \
    background: navajowhite;  \
    }  \
.gold {  \
    background: gold;  \
    }  \
.salmon {  \
    background: salmon;  \
    }  \
.yellowgreen {  \
    background: yellowgreen;  \
    }  \
.palegoldenrod {  \
    background: palegoldenrod;  \
    }  \
.lavender {  \
    background: lavender;  \
    }  \
.powderblue {  \
    background: powderblue;  \
    }  \
.steelblue {  \
    background: steelblue;  \
    }  \
.teal {  \
    background: teal;  \
    }  \
.maroon {  \
    background: maroon;  \
    }  \
      \
.highlight {  \
    background: gold;  \
    }      \
  \
.str {  \
    padding: 0 5px;  \
    background: #DDD;  \
    font-size: 10px;  \
    color: #AAA;  \
    }      \
");

$.noConflict(); 
jQuery(document).ready(function($) {

function print_functions_list(){    
    
    var functions_list = "";
    var propgroups_list = "";
    var classes_list = "";
    var layerName_text = "";
    var layerName = "";
    var f_counter = 0;
    var p_counter = 0;
    var c_counter = 0;
    var is_core = false;    
        
    $(".k").each(function(i){
        
        // ------------------- FUNCTIONS -----------------------
        
        if($(this).text() == "function"){
            
            f_counter++;
            $(this).before("<a name='func-" + f_counter + "' class='ancor'> </a>");
            
            var li_item = "";
            var item_count = 0;
            $(this).nextUntil(".b,.s").each(function(i,e){
                if(($(this).hasClass("i") || $(this).hasClass("k")) && $(this).text() != "builtin") {
                        $(this).addClass("palegoldenrod");
                        if(item_count > 0){
                            li_item += " :: ";
                            }
                        li_item += $(e).text();
                        item_count++;
                    }
                    
                });
            
            if(li_item != ''){
                functions_list += "<div>" + f_counter + ". <a href='#func-" + f_counter + "'>" + li_item + "</a></div>\n";
                }
        }
        
        // ------------------- PROPS -----------------------
        
        else if($(this).text() == "propgroup"){
            
            p_counter++;
            $(this).before("<a name='prop-" + p_counter + "' class='ancor'> </a>");
            
            var li_item = "";
            $(this).nextUntil("span:contains('{'),span:contains('=')").each(function(i,e){
                    $(this).addClass("powderblue");
                    li_item += $(e).text();
                });
    
            propgroups_list += "<div>" + p_counter + ". <a href='#prop-" + p_counter + "'>" + li_item + "</a></div>\n";
            }
        
        // ------------------- CLASSES -----------------------
        
        else if($(this).text() == "class" && is_core == true){

            c_counter++;
            $(this).before("<a name='class-" + c_counter + "' class='ancor'> </a>");
            
            var li_item = "";
            var item_count = 0;
            var prefix = "";
            
            $(this).nextUntil(".b,.s").each(function(i,e){
                if($(this).hasClass("i") || $(this).hasClass("k") || $(this).hasClass("t")) {
                    
                        $(this).addClass("navajowhite");
                    
                        if(item_count > 0){
                            li_item += " ";
                            }
                        if($(this).text() == "extends"){
                            prefix = " &mdash; ";
                            
                            li_item += "<i>" + $(e).text() + "</i>";
                            }
                            else {
                                li_item += $(e).text();
                                }
                        item_count++;
                    }
                    
                });
            
            if(li_item != ''){
                classes_list += "<div>" + c_counter + ". " + prefix + " <a href='#class-" + c_counter + "'>" + li_item + "</a></div>\n";
                } 
        }
        
        // ------------------- NAME OF LAYER -----------------------
        
        else if($(this).next().text() == "\"name\"" || $(this).next().text() == "name") {
            layerName_text = $(this).next(".s,.i").next(".p").next(".s").text();
            }
        
        // ------------------- TYPE OF LAYER -----------------------
        
        else if($(this).next().text() == "\"type\"" || $(this).next().text() == "type") {
            var type = $(this).next(".s,.i").next(".p").next(".s").text();
            type = type.replace(/\"/g,"");
            if(type == "core"){
                is_core = true;
                }
            }
    });
      
    
    layerName = layerName_text.replace(/\"/g,"");
    
    var indexContainer = "<a name='top' class='ancor'> </a><div id='funcIndex'> \
                          <div id='layerName'><span>" + layerName + "</span><a href='#top'>Наверх</a></div> \
                          <div id='switchList'>\
                              <span data-show='functions' class='active-item'>Functions</span>\
                              <span data-show='propgroups'>Propgroups</span>";
                              if(is_core){
                                  indexContainer += "<span data-show='classes' class='classesTab'>Classes</span>";
                                  }
                          indexContainer += "</div>\
                          <div id='functions' class='active-list'>" + functions_list + "</div>\
                          <div id='propgroups'>" + propgroups_list + "</div>\
                          <div id='classes'>" + classes_list + "</div></div>";
    
    $("body").prepend(indexContainer);
    
    // -------------------- SWITCH -----------------------------

    $("#switchList span").click(function(){
        if(!$(this).hasClass("active-item")){
            $(".active-item").removeClass("active-item");
            $(".active-list").removeClass("active-list");
            
            $(this).addClass("active-item");
            
            var show = $(this).attr("data-show");
            $("#"+show).addClass("active-list");
            
            }
        });
    
    // ------------------ CLICK ON LIST ITEMS -------------------------------
        
    $(".active-list a").live("click", function(){
        
        console.log("click");
        
        $(".current").removeClass("current");
        $(".highlight").removeClass("highlight");
        
        $(this).parent().addClass("current");
        
        var ancor = $(this).attr("href");
        ancor = ancor.substr(1,ancor.lenght);
        var ancor_obj = $("a[name='" + ancor + "']");
        var ancor_top = ancor_obj.position().top; 
       
        
        ancor_obj.nextUntil(".b,.s").each(function(i,e){//,.s
            if($(this).hasClass("i") || $(this).hasClass("k") || $(this).hasClass("t")) {
                $(this).addClass("highlight");    
                }    
            });
        $("body").scrollTop(ancor_top - 100);
    
        return false;
    });


    
}// end of function
                       
// -------------------- LINES NUMBERS --------------------------------------
  /* ---- Switch Off because works too long ----

    var all_text = $("pre").html();
    //console.log(all_text);
    var arr = all_text.split('\n');  
    
    console.log(arr);
    
    var out = "";
    
    $.each(arr,function(i){
        //console.log(i);
        out += "<span class=\"str\">" + i + "</span> " + arr[i] + "\n";
        });
    $("pre").html(out);
    
*/
// -------------------- IF CODE IS HIGHLIGHTED -----------------------------    

if($(".k").length > 0){
    print_functions_list();
}  

});