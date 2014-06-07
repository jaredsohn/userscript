// ==UserScript==
// @name      Spotify Remote
// @version    6.20.8.25
// @description  enter something useful
// @include	http://localhost/spotify/*
// @include	https://embed.spotify.com/*
// @include	http://embed.spotify.com/*
// @copright Musch ned wisse
// ==/UserScript==

var local = true;
var cnt = 0;
var intval = [];
var funcs = [];
var lastval = [];



document.addEventListener('DOMContentLoaded',function(){

    if (window.location.hostname.indexOf("spotify.com") != -1) {
        local = false;
    }
        log("Script start");
    if(GM_getValue("cnt") == undefined){
            GM_setValue("cnt", 0);
    }else{
        cnt = GM_getValue("cnt");
    }
    if(!local){
        
        setInterval(function(){
            var val = GM_getValue("cnt");
            if(val > cnt){
                cnt = val;
                var ret = eval(GM_getValue("command"));
                GM_setValue(cnt, ret);
            }
        }, 5);
        document.ret = function(e, d){
            GM_setValue("res" + e, d);
        }
        syncWithSrv();
    }else{
        log("Init");
        document.cmd = function(e, a){
            cnt++;
            var async = false;
            if (e.indexOf("ASYNCRETURN") != -1){
                e = e.replace("ASYNCRETURN", "function(d){ document.ret(" + cnt + ", d);}");
               
                async = true;
            }
            GM_setValue("command", e);
            
    		GM_setValue("cnt", cnt);
            funcs[cnt] = a;
  
            if(async){
                lastval[cnt] = undefined;
                GM_setValue("res" +cnt, "undefined");
                var evaltext = "intval[" + cnt + "] = setInterval(function(){"+
                	"var returnvar = GM_getValue('res" + cnt + "');"+
                    
                     "if(returnvar != 'undefined'){"+
                 	"if(typeof(funcs[" + cnt + "]) == 'function'){funcs[" + cnt + "](returnvar);$('#load').hide(500);}"+
                    "GM_setValue('res" + cnt + "', 'undefined');lastval[" + cnt + "] = returnvar;}"+
            	"}, 10);";
                
                eval(evaltext);
            }else{
                
          	  eval("intval[" + cnt + "] = setInterval(function(){"+
                	"if(GM_getValue(" + cnt + ") != undefined){"+
             	    "if(typeof(funcs[" + cnt + "]) == 'function'){funcs[" + cnt + "](GM_getValue(" + cnt + "));}"+
                    	"clearInterval(intval[" + cnt + "]);"+
                	"}"+
            	"}, 10);");
            }   
		}
        
    }

});

function log(e){
    console.log(location.host + ": " + e);
}

function syncWithSrv(){
    $.get("http://localhost/spotify/checkCmd.php", function(e){ 
    	eval(e);
        syncWithSrv();
    });
}