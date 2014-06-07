// ==UserScript==
// @name        Correctionmodule OOPF
// @namespace   http://userscripts.org/users/479521
// @description This is a tool for displaying the correct alternative when done on boarman's test of the course OOPF.
// @include     https://googledrive.com/host/0ByDY13m8ZksQS1RKMVFUeTZmek0/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     2.0
// @grant       none
// ==/UserScript==

var info = document.createElement("div");
info.id = "info_CM_OOPF";
info.innerHTML = "CorrectionModule On &copy; Matz Larsson 2013";
info.style.display = "inline-block";
info.style.padding = "8px 12px";
info.style.backgroundColor = "#eee";
info.style.color = "#111";
info.style.border = "1px solid #c00";

//Rotation
var div = document.createElement("div");
div.visibility = "hidden";
document.body.appendChild(div);
if(div.style.webkitTransform)info.style.webkitTransform = "rotate(90deg)";
if(div.style.mozTransform)info.style.mozTransform = "rotate(90deg)";
if(div.style.msTransform)info.style.msTransform = "rotate(90deg)";
if(div.style.oTransform)info.style.oTransform = "rotate(90deg)";

document.body.appendChild(info);

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){    
    $(".myButton").click(function(){
        var num = 0;
        $("form").each(function(){
            var qid = "cid"+num;
            var valid = true;
            num++;
            $(this).children().each(function(){
                if($(this).prop("tagName") == "P"){
                    $(this).attr("id", qid);
                }else if($(this).prop("tagName") == "INPUT"){
                    if(($(this).is(':checked') && $(this).attr("value") != 1) || (!$(this).is(':checked') && $(this).attr("value") == 1)){
                        valid = false;
                    }
                }
            });
            
            if(document.getElementById(qid)){
                $("#"+qid).css("background-color", (valid?"rgba(0, 170, 0, 0.7)":"rgba(210, 0, 0, 0.8)")).css("padding", "8px 15px");
            }else{
                alert("no element header found");
            }
        });
    });
}); 