// ==UserScript==
// @name           Lang-8 Highlight Entries in Target Language for Chrome
// @namespace      interpals
// @include        http://lang-8.com*
// @grant          none
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main(){
    function do_hilite(){
        var hilite_count = 0;
        
        var target_language = localStorage.target_language;
        if(!target_language){target_language = "";}
        target_language = target_language.toLowerCase();
    
        $("ul.language_status").each(function(n, o){
            var first_language = $(o.children[0]).text().trim();
            if(first_language.toLowerCase().indexOf(target_language) > -1){    
                hilite_count++;
                o.parentElement.parentElement.style.backgroundColor = "lightblue";
            }
        });
        
        console.log("hilited " + hilite_count + " elements");
    }    
    
    if(window.parent==window){        
        var target_language = localStorage.target_language;
        if(!target_language){target_language = "";}
        target_language = target_language.toLowerCase();
        
        if(!target_language){
            console.log("looking for target language");
            
            $("div.on_left > div.author_information > a.user_name").each(function(n, o){
                var my_profile_href = o.href.toString();
                var xhr = new XMLHttpRequest();
                xhr.onload = function(){
                    try{
                        var start_indx = xhr.responseText.indexOf("<dl class='vertical-spaced");
                        if(start_indx != -1){
                            var end_indx = xhr.responseText.substr(start_indx).indexOf("</dl>");
                            if(end_indx != -1){
                                end_indx += start_indx + 5;
                                
                                var mid_str = xhr.responseText.substring(start_indx,end_indx);
                                
                                var language_piece;
                                
                                var parser = new DOMParser();
                                language_piece = parser.parseFromString(mid_str, "text/xml");
                                
                                language_piece = language_piece.childNodes[0];
                                                                
                                var learning_flag = false;
                                for(var i = 0; i < language_piece.childNodes.length; i++){
                                    if(learning_flag){
                                        target_language = language_piece.childNodes[i].textContent.trim().toLowerCase();
                                        
                                        if(target_language == ""){continue;}
                                        
                                        console.log("target language is: " + target_language);
                                        localStorage.target_language = target_language;
                                        
                                        do_hilite();
                                        break;
                                    }
                                    
                                    if(language_piece.childNodes[i].textContent.toLowerCase() == "language of study"){                                        
                                        learning_flag = true;
                                    }
                                }
                            }
                        }else{
                            console.log("can't find element");
                        }
                    }catch(ex){
                        console.log("exception: " + ex);
                    }
                    
                }
                     
                xhr.open("GET",my_profile_href,false);
                xhr.send();
            });
        }else{
            console.log("target language is: " + target_language);
            do_hilite();
        }
    }
};

addJQuery(main);

