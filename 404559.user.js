// ==UserScript==
// @name       MyUTSouthwestern Proxy
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.1
// @description  Use the MyUTSouthwestern Proxy to access MP3s without VPN
// @match      http://medschool.swmed.edu/*
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

//minified load and execute code for loading jQuery if needed
//from here: http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

//the followling line of code would reload jQuery and then execute main
//loadAndExecute("//medschool.swmed.edu/assets/js/libs-core/jquery-1.7.2.min.js",main);

//however, jQuery is already loaded by the page
//we can just execute the code by inserting the function into the page
execute(useMyUTSWProxy);



function useMyUTSWProxy() {

	//changes server to use myutsouthwestern.swmed.edu proxy
	//server is just the domain, no protocol. server = "swcurwebs.swmed.org"
    //apply to those ending with ext only
    function applyProxyToServerExt(server,ext) {
        //apply to mp3s only for now since video does not work
        $('a[href ^= "http://' + server + '"][href $= "' + ext + '"]').each( function(i,a) {
            var href = $(a).attr('href');
            href = href.replace('http://'+server,'https://myutsouthwestern.swmed.edu');
            fileAndQuery = href.match(/[^\/]+$/);
            href = href.replace(fileAndQuery,'');
            $(a).attr('href',href+",DanaInfo=" + server + "+" + fileAndQuery);
           
        });
	}
	//changes server to use myutsouthwestern.swmed.edu proxy
	//server is just the domain, no protocol. server = "swcurwebs.swmed.org"
    function applyProxyToServer(server) {
        //apply to mp3s only for now since video does not work
        $('a[href ^= "http://' + server + '"]').each( function(i,a) {
            var href = $(a).attr('href');
            href = href.replace('http://'+server,'https://myutsouthwestern.swmed.edu');
            fileAndQuery = href.match(/[^\/]+$/);
            href = href.replace(fileAndQuery,'');
            $(a).attr('href',href+",DanaInfo=" + server + "+" + fileAndQuery);
           
        });
	}
    
    applyProxyToServerExt('swcurwebs.swmed.org','.mp3');
    applyProxyToServer('tlinux.swmed.edu');
    //not working with video
    //applyProxyToServer('swcurwebsf.swmed.org');
}
