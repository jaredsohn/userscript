// ==UserScript==
// @name           VIP Soho.com.co 
// @namespace      www.twitter.com/alejo0317
// @description    Con este script podrás ver todas las imagenes reservadas solo para suscritos a la revista ademas podras quitar la molesta publicidad
// @include        http://soho.com.co/wf_InfoGaleriasMujeres.aspx?IdGal=*
// @include        http://*.soho.com.co/wf_InfoGaleriasMujeres.aspx?IdGal=*
// ==/UserScript==
function rmpub(){
 while (document.getElementsByTagName("EMBED").length) {
      var b=document.createElement("DIV");
      b.style.width=(document.getElementsByTagName("EMBED")[0].width)?document.getElementsByTagName("EMBED")[0].width:"";
      b.style.height=(document.getElementsByTagName("EMBED")[0].height)?document.getElementsByTagName("EMBED")[0].height:"";
      document.getElementsByTagName("EMBED")[0].parentNode.replaceChild(b,document.getElementsByTagName("EMBED")[0]);
   }
}

function rmimgs(){
    var images = document.getElementsByTagName('img');
    for (var n = images.length; n--> 0;) {
      var img = images[n];
      //alert(img.src.substring(0, 28))
      if (img.src=="http://www.soho.com.co/img/gal_bloqueada.png" || img.src=="http://digital.semana.com/2010/Today/fondo_soho_Octubre.jpg" || img.src=="http://soho.com.co/img/gal_bloqueada.png" || img.src=="img/gal_bloqueada.png" || img.src.substring(0, 28)=="http://ads.us.e-planning.net"){
         img.setAttribute("src", "");
         
     }
    }
}

function reemplazajs(){
var hrefs=document.getElementsByTagName('a');
for (var n = hrefs.length; n--> 0;){
    var href=hrefs[n];
    if (href.href.substring(0, 20)=="javascript:switchImg"){
        var par=href.href.split(",");
        for (var i = par.length; i--> 0;){
            ubi=par[i].indexOf("'", 0)+1;
            ubf=par[i].indexOf("'", ubi);
            par[i]=par[i].substring(ubi, ubf)
        }
        
        var arreglado="javascript:switchImg('galerias_new/mod_"+par[3]+"/f"+par[1]+".jpg', '"+par[1]+"', '"+par[2]+"','"+par[3]+"');";
        href.setAttribute("href", arreglado);
    }
}
}
rmpub();
rmimgs();
reemplazajs();




