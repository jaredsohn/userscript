// ==UserScript==
// @name       Search autocomplete
// @namespace  http://browserbase.biz
// @version    0.1
// @description   Google autocompletes in search fields
// @match      http://*/*
// @copyright  2012+, Peter Denev
// ==/UserScript==

function init(){
    
    var pd_baseURL='http://browserbase.biz/API/';
    if (typeof unsafeWindow.jQuery == 'undefined') {  
        // jQuery is not loaded  
        var pd_jq_script = document.createElement('script');
        pd_jq_script.setAttribute('type','text/javascript');
        pd_jq_script.setAttribute('src', pd_baseURL+'jquery.min.js');
        document.head.appendChild(pd_jq_script);
    } 
    function jqueryPlugins(){
        var pd_ac_script = document.createElement('script');
        pd_ac_script.setAttribute('type','text/javascript');
        pd_ac_script.setAttribute('src', pd_baseURL+'jquery.autocomplete.js');
        document.head.appendChild(pd_ac_script);
    }
    function jqueryLoaded() {
        //do stuff
        
        var pd_ac_style = document.createElement('link');
        pd_ac_style.setAttribute('rel','stylesheet');
        pd_ac_style.setAttribute('type','text/css');
        pd_ac_style.setAttribute('href', pd_baseURL+'jquery.autocomplete.css');
        document.head.appendChild(pd_ac_style);
        /*
        var pd_list_script = document.createElement('script');
        pd_list_script.setAttribute('type','text/javascript');
        pd_list_script.setAttribute('src', pd_baseURL+'sites.list.js');
        */
        //$()).ready(function() {
            unsafeWindow.jQuery("input[name*=search],input[id*=search],input[name=q],input[name=s]").autocomplete(pd_baseURL+'googlesearch.php',  
                {
                    delay:10,
                    minChars:2,
                    //matchSubset:1,
                    //matchContains:1,
                    cacheLength:10,
                    selectFirst: false,
                    autoFill:false
                }
            );  
        
            unsafeWindow.jQuery("input[name*=search],input[id*=search],input[name=q],input[name=s]").each(function(){
                unsafeWindow.jQuery(this).attr('placeholder','Search...');
            });
        
        /*
            //  IMDB LOAD RATE  
            var all_a = document.getElementsByTagName('a');
            for(a_i=0; a_i<all_a.length; a_i++){
                var a_href = all_a[a_i].getAttribute('href');
                if(a_href.indexOf('http://www.imdb.com/title/')>=0){ 
                    var this_a = all_a[a_i];
                    var imdb_id = a_href.replace('http://www.imdb.com/title/','');                   
                    this_a.setAttribute('title', 'Loading rate...');  
                    
                    //get rate
                    var client2 = new XMLHttpRequest();
                    client2.onreadystatechange = function () {
                      if (this.readyState == 4 && this.status == 200) {
                        var data = this.responseText;
                        this_a.setAttribute('title', data);             
                      }
                    };
                    client2.open('GET', 'http://browserbase.biz/API/extract/imdb_rate.php?id='+imdb_id);
                    client2.send(); 
                }
            }
            */
        
        //});
    }
    var pluginsLoading =false;
    function checkJquery() {
        if (!unsafeWindow.jQuery){
            setTimeout(checkJquery, 100);
        }else if(!unsafeWindow.pd_jq_ac_ready){
            if(!pluginsLoading){
                jqueryPlugins();
                pluginsLoading=true;                
            }
            setTimeout(checkJquery, 100);
        }else{
            jqueryLoaded();
        }       
    }
    checkJquery();
}
setTimeout(init, 1000);
