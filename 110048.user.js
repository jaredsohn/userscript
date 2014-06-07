// ==UserScript==
// @name           kraut_master
// @namespace      kraut
// @include        http://krautchan.net/b/*
// @grant none
// @version 3
// ==/UserScript==

kraut_master=true;

loadJQuery = function(callback){
    var script=document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


var start = function(){
    /** add a Settings option
     * name: name of the option for set/get Methods later
     * default_value: default, if not changed by user
     * type: one of: bool/int
     * friendly_name: description shown in the settings dialog
     */
    var addSetting = function(name, default_value, type, friendly_name){
        name = "kraut_settings_"+name;
        //console.log("add: "+name);
        if(localStorage.getItem(name) == null){
            //console.log("set default: "+name)
            localStorage.setItem(name, default_value);
        }
        /* widgets for different settings types */
        var html_widget;
        if(type=="bool"){
            html_widget = "<input id='"+name+"' name='"+name+"' type='checkbox' />";
        }else if(type=="int"){
            html_widget = "<input id='"+name+"' name='"+name+"' type='number' size='4' />";
        }
        /* create and append the widget and label to the settings dialog */
        var html_label_start="<label style='display:block;height:30px;line-height:15px;padding:0 0 0 45px;'>";
        var html_label_end = "</label>";
        var html_setting = html_label_start + html_widget + "&nbsp;" + friendly_name+ html_label_end;

        /* insert in alphabetic order */
        var inserted = false;
        jQuery("#kraut_settings label").each(function(index, element){
            var name_other = jQuery(element).children("input").attr("id");
            if(name_other > name){
                jQuery(element).before(html_setting);
                inserted = true;
                return false; //break the .each
            }
        })
        if(!inserted){
            jQuery("#kraut_settings").append(html_setting);
        }

        /* load values or defaults, bind change handlers */
        if(type=="bool"){
            var value = localStorage.getItem(name);
            if(value == null){
                //console.log("return default: "+name)
                value = default_value;
            }
            if(value == "true"){
                value = true;
            }else if(value == "false"){
                value = false;
            }
            jQuery("#"+name).attr('checked', value);
            /* change handler */
            jQuery("#"+name).bind("click", function(){
                localStorage.setItem(""+name, jQuery(this).is(':checked'));
            });
        }else if(type=="int"){
            var value = localStorage.getItem(name);
            if(value==null){
                value=default_value
            };
            jQuery("#"+name).attr('value', value);
            /* change handler */
            jQuery("#"+name).bind("keyup", function(){
                var value = Number(jQuery(this).val());
                if(!isNaN(value)){
                    localStorage.setItem(name, value);
                }
            })
        }
    };

    var getSetting = function(name, default_value){
        name = "kraut_settings_"+name;
        //console.log("get: "+name);
        var value;
        if(localStorage.getItem(name) == null){
            value = default_value;
        }else{
            value = localStorage.getItem(name);
            if(value == "true"){
                value = true;
            }else if(value == "false"){
                value = false;
            }
        }
        return value;
    };

    var html_settings_dialog = "<div id='kraut_settings_dialog' style='clear:both;border:1px solid #444;margin: 30px 0'><h2>Einstellungen</h2><div id='kraut_settings' style='-moz-column-count: 4'></div></div>";

    $.noConflict();
    document.addSetting=addSetting;
    document.getSetting=getSetting;

    jQuery("center").prepend(html_settings_dialog);
    jQuery('div:contains("RSS /")').prepend('[<a id="kraut_settings_button" href="#">Einstellungen</a>] ');
    jQuery('#kraut_settings_button').bind("click", function(){
        jQuery('#kraut_settings_dialog').toggle(Number(document.getSetting("openDelay", "300")));
    });
    document.addSetting("openDelay", "300", "int", "Animationsdauer beim Öffnen der Einstellungen");
    jQuery('#kraut_settings_dialog').toggle(0);



}

loadJQuery(start);

