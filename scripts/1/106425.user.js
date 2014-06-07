// ==UserScript==
// @name      RiMiSan- Redmine Open Update On Top
// @namespace  http://rimisan.com.br/
// @version    0.3
// @description  Force Redmine issue pages to display the update form on the top of the notes list. Good for those who changed settings to display note list in descendant order.
// @include    http://*/issues/*
// @copyright  2011+, Glauco Basilio | RiMiSan
// ==/UserScript==

(function(){
    
    window.addEventListener("load", 
                            function(e) {
                                //carregando o jquery
                                j=document.createElement("SCRIPT");
                                j.src="http://code.jquery.com/jquery-latest.pack.js";
                                document.getElementsByTagName("HEAD")[0].appendChild(j);

                                j.onload = function(){
                                    jQuery.noConflict();
                                    jQuery(
                                        function(){
                                            jQuery('#history').prepend(jQuery('#update'));
                                        }
                                    );
                                   
                                }
                                
                            }, false);
    
})();
