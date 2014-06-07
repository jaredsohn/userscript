// ==UserScript==
// @name Link Information Fetcher
// @author Joe Eiras
// @description Enables the user to query link information such as size, content-type, date and server software
// @include *
// ==/UserScript==

(function(){
        var req_hdr = "ujs_get_link_info\n";
        var frame_id = "ujs_get_link_info_iframe";
        
        var pingIt = function (functionName, timeoutValue, onLoadToo) {
                var functionNameInterval, functionNameNCalls = 0, success = 0;
                if (!timeoutValue) timeoutValue = 400; // Use default                
                var functionToCallOnLoad = function ()
                {functionToCall("load");clearInterval(functionNameInterval);}
                var functionToCall = function (reason) {
                        try {success = functionName(reason ? reason : "ping");}
                        catch (ex) { if(window.opera)window.opera.postError(ex); };
                        var isTimeout = ( (functionNameNCalls++ * timeoutValue) >= 10000 );
                        if (success || isTimeout){ // 10 seconds
                                clearInterval (functionNameInterval);
                                if(!onLoadToo) removeEventListener("load", functionToCallOnLoad, false);
                                if(reason != "timeout" && isTimeout)
                                        functionToCall("timeout");
                        }
                }
                functionNameInterval = setInterval(functionToCall, timeoutValue);
                addEventListener("load", functionToCallOnLoad, false);
        }
        
        document.addEventListener("message",function(ev){
                if( ev && ev.data && ev.data.length<=req_hdr.length || ev.data.substring(0,req_hdr.length)==req_hdr ){
                        //inside requesting iframe
                        if(window.opera){
                                window.opera.addEventListener("BeforeExternalScript",function(ejs){ejs.preventDefault();},false);
                                window.opera.addEventListener("BeforeScript",function(ejs){ejs.preventDefault();},false);
                                window.opera.addEventListener("BeforeEventListener",function(ejs){ejs.preventDefault();},false);
                        }
                        pingIt(function(){
                                while(document.body&&document.body.firstChild)
                                        document.body.removeChild(document.body.firstChild);
                        },200,1);
                        ujs_get_link_info(ev.data.substring(req_hdr.length),true);
                }
        },false);
        
        window.ujs_get_link_info = function(link,not_first_time){
                var server = "";
                var protocol = "";
                var hostname = "";
                var port = "";
                var path = "";
                
                if( link.match(/^((\w+):\/\/?([^\/:]+)(:(\d+))?\/)(.*)$/) ){
                        server = RegExp.$1;
                        protocol = RegExp.$2;
                        hostname = RegExp.$3;
                        if(RegExp.$5) port = RegExp.$5;
                        path = RegExp.$6;
                }
                
                if( protocol != "http" ){
                        alert("error - HTTP links only");
                        return;
                }
                
                if( location.hostname != hostname || location.port != port ){
                
                        if(not_first_time){//page redirected - second time the function is called
                                alert("error - server redirected link request.");
                                return;
                        }
                        
                        if( !document.body ){
                                alert("error - this document isn't a HTML page, which can't hold a iframe to get the remote link info.");
                                return;
                        }
                        
                        //link in a remote server
                        //load a default page in a iframe and use the xmlhttprequest from there
                        var ifr = document.getElementById(frame_id);
                        if( !ifr ){
                                ifr = document.createElement("iframe");
                                //the page doesn't load if the iframe has display none
                                ifr.setAttribute("frameborder","0");
                                ifr.setAttribute("style","width:0px;height:0px;visibility:hidden;");
                                ifr.id=frame_id;
                                document.body.appendChild(ifr);
                        }
                        ifr.setAttribute("src",server+"404.error.html");
                        //wait a bit until this usejs loads in that page
                        pingIt(function(reason){
                                if(ifr.contentDocument){
                                        ifr.contentDocument.postMessage(req_hdr+link);
                                        return 1;
                                }
                                if( reason == "timeout" ){
                                        alert("error - 10sec timeout communicating with "+server );
                                        return 1;
                                }
                        },200);
                        
                }else{
                        fetch_link(link);
                }
        }
        
        var fetch_link = function(link){
                var check_unknown = function (val){return val?val:'unknown';}
                var req = new XMLHttpRequest();
                req.open("HEAD", link, false);
                req.onreadystatechange = function () {
                        if (this.readyState == 4){
                                window.alert(
                                        "info of "+link+"\n"+
                                        "\nrequest status: "+this.status+
                                        "\nsize: "+(function(sz){
                                                if( !sz || isNaN(sz=parseInt(sz)) ) return 'unknown';
                                                if(sz<1024)return sz+' B';
                                                else if(sz<1024*1024)return (sz/1024|0)+' KiB';
                                                else if(sz<1024*1024*1024)return (sz/1024/1024|0)+' MiB';
                                                else if(sz<1024*1024*1024*1024)return (sz/1024/1024/1024|0)+' GiB';
                                        })(this.getResponseHeader("Content-Length"))+
                                        "\nmime-type: "+check_unknown(this.getResponseHeader("Content-Type"))+
                                        "\ndate: "+check_unknown(this.getResponseHeader("Date"))+
                                        "\nserver: "+check_unknown(this.getResponseHeader("Server"))
                                );
                        }
                };
                req.send("");
        }
})();