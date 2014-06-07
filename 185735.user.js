// ==UserScript==
// @name        Naver Translation
// @namespace   http://sc-wu.com/gm/
// @description Translations alongside comics on Naver
// @include     *comic.naver.com/webtoon/*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*
    Scott Wu
    funnytrees
    47be1f67c35cb3bd7fdaae284c21c69a
 */

window.addEventListener("load",scwu_main,false);

var scwu_load_tl = function() {
    var loc = document.getElementById('scwu_tl_loc').value;
    console.log("Getting translations from: " + loc);
    scwu.xmlHttpRequest({
        method : "GET",
           url : loc,
        onload : function(response) {
            console.log("Recieved response");
            scwu.tl_response = response;
            if (response) {
                console.log("Successfully loaded translation");
                //console.log(response.responseText);
                scwu.tl_data = JSON.parse(response.responseText.replace(/\/\/.+?\n/g,""));
                if (scwu.tl_data) {
                    scwu.show_tl();
                }
            }
        },
       onerror : function(responseText) {
            console.log("Error loading translations");
        }
    });
}

// comic_view_area

var scwu = {};
function scwu_main() {
    console.log("Naver Translation Tool is loading...");
    
    scwu.base = document.getElementById("comic_view_area");
    
    scwu.control = document.createElement("div");
    scwu.control.id = "scwu_control";
    scwu.control.base_left = scwu.base.offsetLeft + scwu.base.offsetWidth - 160;
    scwu.control.base_top = 50;
    
    scwu.create = document.createElement("div");
    scwu.create.id = "scwu_create";
    scwu.create.base_left = position(scwu.base).left - 50;
    scwu.create.base_top = 400;
    
    scwu.guide = document.createElement("div");
    scwu.guide.id = "scwu_guide";
    
    scwu.output = document.createElement("div");
    scwu.output.id = "scwu_output";
    
    scwu.xmlHttpRequest = GM_xmlhttpRequest;
    
    scwu.control_styles = {
                "position" : "absolute",
                     "top" : scwu.control.base_top + "px",
                    "left" : scwu.control.base_left + "px",
                  "zIndex" : "1000",
        
                   "width" : "200px",
                 "padding" : "5px",
        
         "backgroundColor" : "#FFFFFF",
                  "border" : "1px solid grey",
           "border-radius" : "5px",
                  "cursor" : "move",
               "textAlign" : "center"
    };
    scwu.box_styles = {
                "position" : "absolute",
                    "left" : (scwu.base.offsetWidth-160) + "px",
                  "zIndex" : "1000",
                
                   "width" : "200px",
                 "padding" : "5px",
    
                  "border" : "1px solid black",
           "border-radius" : "5px",
               "textAlign" : "left"
    };
    scwu.create_styles = {
                "position" : "fixed",
                     "top" : scwu.create.base_top + "px",
                    "left" : scwu.create.base_left + "px",
                  "zIndex" : "1000",
                 
                   "width" : "200px",
                 "padding" : "5px",
                   
         "backgroundColor" : "#FFFFFF",
                  "border" : "1px solid grey",
           "border-radius" : "5px",
                  "cursor" : "move",
               "textAlign" : "center"
    };
    scwu.guide_styles = {
                "position" : "fixed",
                     "top" : scwu.create.base_top + "px",
                    "left" : "0px",
                  "zIndex" : "900",
                  
                   "width" : "99%",
                  "height" : "2px",
                 "display" : "none",
                 
         "backgroundColor" : "#0000FF"
    };
    scwu.output_styles = {
                "position" : "fixed",
                     "top" : "20%",
                    "left" : "20%",
                  "zIndex" : "1000",
                  
                   "width" : "60%",
                  "height" : "60%",
                 "padding" : "10px",
                 
                  "border" : "1px solid black",
         "backgroundColor" : "#FFFFFF"
    };
    scwu.exports = [ "x" , "y" , "width" , "height" , "text" ];
    
    scwu.tl_data = new Array(0);
    scwu.tl_boxes = new Array(0);
    
    scwu.setDraggable = function(element) {
        element.addEventListener("mousedown",function(event) {
            element.dragging = true;
            element.move_xorg = event.clientX;
            element.move_yorg = event.clientY;
            //console.log("MD");
        },false);
        window.addEventListener("mouseup",function(event) {
            if (element.dragging) {
                element.dragging = false;
                var rel_left = element.base_left + event.clientX - element.move_xorg;
                var rel_top = element.base_top + event.clientY - element.move_yorg;
                element.base_left = rel_left;
                element.base_top = rel_top;
                element.style.left = rel_left + "px";
                element.style.top = rel_top + "px";
                //console.log("MU");
            }
        },false);
        window.addEventListener("mousemove",function(event) {
            if (element.dragging) {
                var rel_left = element.base_left + event.clientX - element.move_xorg;
                var rel_top = element.base_top + event.clientY - element.move_yorg;
                element.style.left = rel_left + "px";
                element.style.top = rel_top + "px";
                //console.log("MM");
            }
        },false);
    };
    
    scwu.show_tl = function() {
        var translation = scwu.tl_data;
        var new_box;
        for (var i=0; i<translation.length; i++) {
            new_box = document.createElement("div");
            new_box.innerHTML = translation[i].text;
            
            for (var s in scwu.box_styles) {
                new_box.style[s] = scwu.box_styles[s];
            }
            
            if (translation[i].style) {
                for (var s in translation[i].style) {
                    nex_box.style[s] = translation[i].style[s];
                }
            }
            
            new_box.style.top = translation[i].y + "px";
            if (translation[i].x) new_box.style.left = translation[i].x + "px";
            if (translation[i].width) new_box.style.width = translation[i].width + "px";
            if (translation[i].height) new_box.style.height = translation[i].height + "px";
            
            scwu.tl_boxes.push(new_box);
            scwu.base.appendChild(new_box);
        }
    };
    
    scwu.create_tl = function() {
        scwu.base.appendChild(scwu.create);
        scwu.base.appendChild(scwu.guide);
        
        for (var s in scwu.create_styles) {
            scwu.create.style[s] = scwu.create_styles[s];
        }
        
        for (var s in scwu.guide_styles) {
            scwu.guide.style[s] = scwu.guide_styles[s];
        }
        
        scwu.create.style.top = (scwu.create.base_top) + "px";
        scwu.guide.style.top = (scwu.create.base_top) + "px";
    };
    
    scwu.close_tl = function() {
        scwu.base.removeChild(scwu.create);
        scwu.base.removeChild(scwu.guide);
    };
    
    scwu.insert_tl = function(t) {
        var new_data = {
            y : window.pageYOffset + scwu.create.base_top - position(scwu.base).top,
            text : t.replace(/\n/g,""),
            removed : false
        };
        scwu.tl_data.push(new_data);
        
        var new_box;
        new_box = document.createElement("div");
        new_box.innerHTML = [
            "<button onclick=\"scwu.remove_tl(" + scwu.tl_boxes.length + ")\">X</button>",
            new_data.text,
            ].join("");
        
        for (var s in scwu.box_styles) {
            new_box.style[s] = scwu.box_styles[s];
        }
        
        new_box.style.top = new_data.y + "px";
        if (new_data.x) new_box.style.left = translation[i].x + "px";
        if (new_data.width) new_box.style.width = translation[i].width + "px";
        if (new_data.height) new_box.style.height = translation[i].height + "px";
        
        scwu.tl_boxes.push(new_box);
        scwu.base.appendChild(new_box);
    };
    
    scwu.insert_tl_guide = function(b) {
        if (b) {
            scwu.guide.style.top = (scwu.create.offsetTop + 16) + "px";
            scwu.guide.style.display = "block";
        }
        else {
            scwu.guide.style.display = "none";
        }
    };
    
    scwu.remove_tl = function(i) {
        scwu.base.removeChild(scwu.tl_boxes[i]);
        scwu.tl_data[i].removed = true;
        scwu.tl_boxes[i].style.display = "none";
    };
    
    scwu.convert_tl = function() {
        var out = "[\n";
        var first = true;
        var ft;
        for (var i=0; i<scwu.tl_data.length; i++) {
            if (scwu.tl_data[i].removed) continue;
            if (first) first = false;
            else out += ",\n";
            
            if (scwu.tl_data[i].text) scwu.tl_data[i].text = scwu.tl_data[i].text.replace(/"/g,"\\\"");
            
            ft = true;
            out += "\t{"
            for (var j in scwu.tl_data[i]) {
                if (scwu.exports.indexOf(j)<0) continue;
                if (ft) ft = false;
                else out += " , ";
                out += "\"" + j + "\" : \"" + scwu.tl_data[i][j] + "\"";
            }
            out += "}";
        }
        out += "\n]";
        scwu.base.appendChild(scwu.output);
        document.getElementById("scwu_tl_out").value = out;
    };
    
    scwu.close_out = function() {
        scwu.base.removeChild(scwu.output);
    };
    
    scwu.setDraggable(scwu.control);
    scwu.setDraggable(scwu.create);
    
    for (var s in scwu.control_styles) {
        scwu.control.style[s] = scwu.control_styles[s];
    }
    
    for (var s in scwu.output_styles) {
        scwu.output.style[s] = scwu.output_styles[s];
    }
    
    var control_info = document.createElement("div");
    var button_load = document.createElement("div");
    var button_create = document.createElement("div");
    var button_convert = document.createElement("div");
    
    button_load.addEventListener("click",scwu_load_tl,false);
    button_create.addEventListener("click",scwu.create_tl,false);
    button_convert.addEventListener("click",scwu.convert_tl,false);
    
    control_info.innerHTML = "<b><u>Naver Translation</u></b><br />Translation URL:<br /><input type=\"text\" id=\"scwu_tl_loc\" style=\"width: 95%\" />";
    button_load.innerHTML = "<button style=\"width: 99%\">Load Translation</button>";
    button_create.innerHTML = "<button style=\"width: 99%\">Create Translation</button>";
    button_convert.innerHTML = "<button style=\"width: 99%\">Generate Code</button>";
    
    /*
    scwu.control.innerHTML = [
        "<b><u>Naver Translation</u></b><br />",
        "<input type=\"text\" id=\"scwu_tl_loc\" style=\"width: 95%\" /><br />",
        "<button onclick=\"scwu.load_tl(document.getElementById('scwu_tl_loc').value);\">Load Translation</button><br />",
        "<button onclick=\"scwu.create_tl();\">Create Translation</button><br />",
        "<button onclick=\"scwu.convert_tl();\">Generate Code</button><br />",
        ].join("");
    */
    scwu.control.appendChild(control_info);
    scwu.control.appendChild(button_load);
    scwu.control.appendChild(button_create);
    scwu.control.appendChild(button_convert);
    
    scwu.create.innerHTML = [
        "<span ",
        "onmouseover=\"scwu.insert_tl_guide(true);\" ",
        "onmouseout=\"scwu.insert_tl_guide(false);\" ",
        "onmousemove=\"scwu.insert_tl_guide(true);\">",
        "<span onclick=\"scwu.close_tl();\" style=\"font-weight: bold; font-size: 16px; cursor: pointer;\">X</span>",
        " Insert translation: <button ",
        "onclick=\"scwu.insert_tl(document.getElementById('scwu_tl_ins').value); document.getElementById('scwu_tl_ins').value = '';\"",
        ">&gt;&gt;&gt;</button></span><br />",
        "<textarea style=\"width: 100%;\" id=\"scwu_tl_ins\"></textarea>",
        ].join("");
    scwu.output.innerHTML = [
        "<span onclick=\"scwu.close_out();\" style=\"font-weight: bold; font-size: 16px; cursor: pointer;\">X</span>",
        " Copy the translations below:<hr />",
        "<textarea style=\"width: 100%; height: 95%;\" id=\"scwu_tl_out\"></textarea>",
        ].join("");
    
    unsafeWindow.scwu = scwu;
    scwu.base.appendChild(scwu.control);
}

var position = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};