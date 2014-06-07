// ==UserScript==
// @name       RSI - Redmine My Page
// @namespace  http://rimisan.com.br/
// @version    0.2
// @description  Force ticket IDs links in redmine my page open in a blank window/tab and reload my page every 5 minutes
// @include    http://*/my/page
// @copyright  2011+, Glauco Basilio
// ==/UserScript==

(function(){
    
    window.addEventListener("load", 
                            function(e) {
                                //carregando o jquery
                                j=document.createElement("SCRIPT");
                                j.src="http://code.jquery.com/jquery-latest.pack.js";
                                document.getElementsByTagName("HEAD")[0].appendChild(j);
                                j.onload = function(){
                                    try{
                                        jQuery.noConflict();
                                        jQuery('.id a').attr('target','_blank');
                                        setTimeout(reload,300000);
                                    }catch(ex){alert(ex.message);}
                                    
                                };
                                
                                function reload(){
                                    window.location.reload();
                                }
                                
                            }, true);
    
})();