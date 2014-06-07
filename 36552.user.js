// ==UserScript==
// @name           IPViewer
// @namespace      http://www.amuseplayer.com
// @description    Display your ip address.
// @include        http://*
// @include        https://*
// @exclude        *.js
// @exclude        *.txt
// @exclude        *.pdf
// ==/UserScript==


var str = '<div id="ipinfo" title="Toggle IP Info" style="border: 1px solid rgb(153, 153, 153); margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0%; position: fixed; right: 0px; bottom: 2px; width: 400px; height: 40px; text-align: left; cursor: pointer; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; color: rgb(51, 51, 51); z-index: 999; font-size:12px; font-style:normal;font-weight:normal;font-family: arial, lucida console, sans-serif"><img  src="data:image/gif;base64,R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh%2BQQJCAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV%2BlMGLApWwUzw1jsIwAh%2BQQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pBKhRSkYLvM7Ab%2FOGThoE2%2BQExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt%2FwCAAh%2BQQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4EcySA8l0Alo0yA8cw%2B9TIgAh%2BQQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7" width="16px" height="16px" /></div>';
function localIp(resText) {
        var result = resText.responseText.replace("<span class='orange'>", "local Ip: ");
        result = result.replace("</span>&nbsp;", " ");
        GM_setValue("localIp", result);
        
}               

function pageIp(resText) {
        var result = resText.responseText.match(/>\d+\.\d+\.\d+\.\d+/g);
            str = result[result.length-1];
            str = str.replace(">", "");
        GM_setValue("prevIp", str);
        update(2, str);
}

function queryIp(resText) {
      
        var str = resText.responseText.split('</span>')[1];
        var prevIp = GM_getValue("prevIp");
        var local = GM_getValue("localIp");
      
        var ipinfo = document.getElementById('ipinfo');
        str = prevIp + str;
        ipinfo.innerHTML = "page Ip: " + str + "<br />" + local;
        GM_setValue("prevIp", str);
}

function islocalIpTimeout()
{
    var curTime;
    curTime = (new Date()).getHours() * 60 + (new Date()).getMinutes();
    var prevCheck = GM_getValue("prevCheck");
    var interval = GM_getValue("checkInterval");
    if(typeof(interval) == 'undefined')
    {
            interval = 5;
            GM_setValue('checkInterval', 5);
    }
    if((typeof(prevCheck) == 'undefined') || curTime - prevCheck > interval)
    {
            GM_setValue("prevCheck", curTime);
            return true;
    }
    else
    {
            return false;
    }
}

var g_loaded = false;

function display()
{
       // for iframe-ed pages
   if(window.parent.document.location != document.location)
   {
            return;
   }
   // for AJAX called pages && shut-cut keys
    if(g_loaded)
    {
            var ipinfo = document.getElementById('ipinfo');
            ipinfo.style.display = (ipinfo.style.display != 'none' ? 'none' : '');
            if(!islocalIpTimeout())return;
    }
    else
    {
            var div = document.createElement("div");
            div.innerHTML = str;
            document.body.appendChild(div);
            g_loaded = true;
    }
   
           var local = GM_getValue("localIp");
    var uplocal = false;
    if( (typeof(local) == 'undefined') || local == "" || islocalIpTimeout())
    {
            update(1);
            uplocal = true;
    }
   
    var domain = GM_getValue("prevDomain");
    if( (typeof(domain) == 'undefined') ||
                    (domain != window.location.hostname) || uplocal)
    {
            GM_setValue("prevDomain", window.location.hostname);
            update(0);
    }
    else
    {
            var prevIp = GM_getValue("prevIp");
            var local = GM_getValue("localIp");
            var ipinfo = document.getElementById('ipinfo');
            ipinfo.innerHTML = "page Ip: " + prevIp + "<br/>" + local;
    }
}

window.addEventListener("keyup", function(e) {   
       //F2
       if(e.keyCode != 113) return;
       display();
}, false);

var clkcnt = 0;
var lastclk = 0;
var enableclk = GM_getValue('enableClk');
if(typeof(enableclk) != 'undefined' && enableclk == true)
{
	window.addEventListener("click", function(e) {
	    if(e.button != 0) return;
	      
	    var curTime = (new Date()).getTime();
	    if(curTime - lastclk > 1000)clkcnt = 0;
	    if(clkcnt & 1)
	    {
	         if(curTime - lastclk < 500)
	         {
	             display();
	         }
	    }
	    lastclk = curTime;
	    clkcnt++;
	}, false);
}
else
{
	GM_setValue('enableClk', false);
}

function faces(resText)
{
        alert(resText.responseText);
}
      
function update() {      
  try {                  
    var addr;
    var callback;
    action = arguments[0];
    if(action == 0) {
     addr = "http://ping.eu/action.php?host=" + window.location.hostname +"&atype=3";
     callback = pageIp;
    }
    else if(action == 1) {
            
     addr = "http://www.ip.cn/getip.php?action=getip";
     callback = localIp;
    }
    else if(action == 2) {
            addr = 'http://www.ip.cn/getip.php?action=queryip&ip_url=' + arguments[1];
            callback = queryIp;
    }
    var tmp = {
    method:"GET",
    url:addr,
    headers:{
      "User-Agent":"Mozilla/5.0",
      "Accept":"text/xml"
    },
     onload:callback
    };
    GM_xmlhttpRequest(tmp);
    }catch(e){/*alert(e);*/}
                       
}