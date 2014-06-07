// ==UserScript==
// @name        quickNA
// @namespace   fixer
// @include     https://*/admin/custom_lists/*/data_entry*
// @version     1
// ==/UserScript==


function addbuttons(){
    var divs = document.getElementsByClassName("custom_listing");
    var correctDivs = new Array();
    for(var i = 0; i<divs.length; i++){
        if(divs[i].id.substr(0,14)=="custom_listing"){
            correctDivs.push(divs[i]);
        }
    }

    for(var i = 0; i<correctDivs.length; i++){
        var fastButton = document.createElement("button");
        fastButton.type = "button";
        fastButton.setAttribute("style", "float:right");
        fastButton.innerHTML = "quick NA";
        fastButton.addEventListener("click", function(e){
            var inputs = e.target.parentNode.getElementsByTagName("input");
            for(var i = 0; i<inputs.length; i++){
                if(inputs[i].type == "radio" && inputs[i].value=="7" && inputs[i].id.substring(9) =="signup_call_contact_status_id_7"){
                    inputs[i].checked = "true";
                }
                if(inputs[i].type == "submit" && inputs[i].name == "commit"){
                    console.log("clicking");
                    inputs[i].click();
                    e.target.parentNode.style.display = "none";
                    addbuttons();
                }
            }
        });
        
        var fastButton2 = document.createElement("button");
        fastButton2.type = "button";
        fastButton2.setAttribute("style", "float:right");
        fastButton2.innerHTML = "quick NI";
        fastButton2.addEventListener("click", function(e){
            var inputs = e.target.parentNode.getElementsByTagName("input");
            for(var i = 0; i<inputs.length; i++){
                if(inputs[i].type == "radio" && inputs[i].value=="6" && inputs[i].id.substring(9) =="signup_call_contact_status_id_6"){
                    inputs[i].checked = "true";
                }
                if(inputs[i].type == "submit" && inputs[i].name == "commit"){
                    console.log("clicking");
                    inputs[i].click();
                    e.target.parentNode.style.display = "none";
                    addbuttons();
                }
            }
        });
        if(correctDivs[i].getElementsByTagName("button").length==0){ 
            correctDivs[i].insertBefore(fastButton, correctDivs[i].children[1]);
            correctDivs[i].insertBefore(fastButton2, correctDivs[i].children[1]);
        }
    }   
}
addbuttons();
window.setInterval(addbuttons, 1000);
