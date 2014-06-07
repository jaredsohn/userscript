// ==UserScript==
// @name           Llamador de Regla
// ==/UserScript==
if(typeof JuampiLoader!="undefined"&&typeof Juampi!="undefined"){Juampi.fnClose()}else{var JuampiLoader={};
JuampiLoader.bLoadingComplete=false;JuampiLoader.fnLoadFile=function(c,d){var a;if(d=="css"){a=document.createElement("link");
a.type="text/css";a.rel="stylesheet";a.href=c;a.media="screen";document.getElementsByTagName("head")[0].appendChild(a)
}else{if(d=="image"){var b=new Image(1,1);b.src=c}else{a=document.createElement("script");
a.type="text/javascript";a.language="JavaScript";a.src=c;document.getElementsByTagName("body")[0].appendChild(a)
}}};JuampiLoader.fnLoad=function(){if(typeof Juampi=="object"&&typeof jsCore=="object"){return 0
}var a=document.createElement("div");a.style.position="absolute";a.style.top="0";
a.style.left="0";a.style.color="white";a.style.padding="5px 10px";a.style.fontSize="11px";
a.style.fontFamily='"Lucida Grande", Verdana, Arial, Helvetica, sans-serif';a.style.zIndex="32501";
a.style.backgroundColor="#a2392d";a.setAttribute("id","LoadingJuampi");a.appendChild(document.createTextNode("Cargando Regla..."));
document.getElementsByTagName("body")[0].insertBefore(a,document.body.childNodes[0]);
JuampiLoader.fnLoadFile("http://misternot.fileave.com/Juampi.css","css");
JuampiLoader.fnLoadFile("http://userscripts.org/scripts/source/85600.user.js","js")
};JuampiLoader.fnLoad()};