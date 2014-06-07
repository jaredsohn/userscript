// ==UserScript==
// @name        ImagesToolSuite
// @namespace   ImagesToolSuite
// @include     http://*
// @version     0.1
// @grant       GM_addStyle

// ==/UserScript==

function showLinks(){
    lista=document.links;
    var res=new Array();
    var links=new Array();
    var h=0;
    for(i=0;i<lista.length;i++){

        res=lista.item(i).href.split('.')
        if(res[res.length-1]=="jpg" || res[res.length-1]=="jpeg" || res[res.length-1]=="JPG" || res[res.length-1]=="JPEG"){
            links[h]=lista.item(i).href;
            h++;
        }

    }
    
    if(links.length>1){
        alert(links);
    }
    else{
        var links2= new Array();
        var nodeList=document.querySelectorAll(".imagenGenerada");
        for (var i = 0, length = nodeList.length; i < length; i++) {
            links2[i] = nodeList[i].src;
        }
        alert(links2);

    }

    
}


function fastNudes(){


    GM_addStyle(" img { width: auto; height: auto; }  body { text-align:center; } ");

    lista=document.links;
    var res=new Array();
    var links=new Array();
    var h=0;
    for(i=0;i<lista.length;i++){

        res=lista.item(i).href.split('.')
        if(res[res.length-1]=="jpg" || res[res.length-1]=="jpeg" || res[res.length-1]=="JPG" || res[res.length-1]=="JPEG"){
            links[h]=lista.item(i).href;
            h++;
        }

    }


    for(i=0;i<links.length;i++){

        img=document.createElement("img");
        br=document.createElement("br");
        img.src=links[i];

        document.body.appendChild(img);
        document.body.appendChild(br);

    }

}
    

function embedImageViewer(){

    var h=window.innerHeight;
    var hr=h-25;

    GM_addStyle(" #_visor_{ color:white;text-align:center; height:" + h +"px; background-color:black; }  #_visor_ > img { width: auto; max-height:"+ hr + "px; } ");


    lista=document.links;
    var res=new Array();
    var links=new Array();
    var h=0;
    for(i=0;i<lista.length;i++){

        res=lista.item(i).href.split('.')
        if(res[res.length-1]=="jpg" || res[res.length-1]=="jpeg" || res[res.length-1]=="JPG" || res[res.length-1]=="JPEG"){
            links[h]=lista.item(i).href;
            h++;
        }

    }


    br=document.createElement("br");
    div=document.createElement("div");
    div.id="_visor_";

    button1=document.createElement("button");
    button1.addEventListener("click", retrocederImagen, false);
    button1.innerHTML="previous";


    button2=document.createElement("button");
    button2.addEventListener("click", avanzarImagen, false);
    button2.innerHTML="next";


    spanI=document.createElement("span");
    spanI.id="valorI";

    spanI.innerHTML=0;

    spanF=document.createElement("span");
    spanF.id="valorF";

    spanF.innerHTML="/"+(links.length-1);

    img=document.createElement("img");
    img.id="_imagen_";
    img.src=links[0];




    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(br);
    div.appendChild(img);

    div.appendChild(spanI);
    div.appendChild(spanF);


    document.body.appendChild(div);


}


function retrocederImagen(){

    var i=parseInt(document.getElementById("valorI").innerHTML);
    if(i-1<0) return;
    var IMG=document.getElementById("_imagen_");
    IMG.src=links[i-1];
    document.getElementById("valorI").innerHTML=i-1;

}
function avanzarImagen(){

    var i=parseInt(document.getElementById("valorI").innerHTML);
    if(i+1>=links.length)return;
    var IMG=document.getElementById("_imagen_");
    IMG.src=links[i+1];
    document.getElementById("valorI").innerHTML=i+1;

}



function fnc(){
    GM_addStyle(" .imagenGenerada { width: auto; height: auto; }  body { text-align:center; }");
    var i;
    var url=document.getElementById("URLImagen").value;
    var ini=document.getElementById("inicio").value;
    var fin=document.getElementById("fin").value;
    var ext=document.getElementById("ext").value;
    var zero=document.getElementById("zero").checked;
    
    if(zero){
        for(i=ini;i<=fin;i++){
            if(i<=9){
                buttonY=document.createElement("img");
                buttonY.setAttribute("src", url+'0'+i+ '.' + ext );
                buttonY.setAttribute("class", "imagenGenerada" );
                document.body.appendChild(buttonY);
            }
            else{
                buttonY=document.createElement("img");
                buttonY.setAttribute("src", url+i+ '.' + ext );
                buttonY.setAttribute("class", "imagenGenerada" );
                document.body.appendChild(buttonY);
            }
        }
    }
    else{
        for(i=ini;i<=fin;i++){
            buttonY=document.createElement("img");
            buttonY.setAttribute("src", url+i+ '.' + ext );
            buttonY.setAttribute("class", "imagenGenerada" );
            document.body.appendChild(buttonY);
        }
    }
    
}
    
var isCtrl = false;
document.addEventListener('keydown', key_Down, true);


function key_Down(e){
    if(e.which == 17) isCtrl=true;
    if(e.which ==  57  && isCtrl == true) {
        
        buttonX=document.createElement("button");
        buttonX.addEventListener("click", embedImageViewer, false);
        buttonX.innerHTML="Show Gallery";
        document.body.appendChild(buttonX);
        
        
        
        buttonX=document.createElement("button");
        buttonX.addEventListener("click", fastNudes, false);
        buttonX.innerHTML="Show Images";
        document.body.appendChild(buttonX);
        
        buttonX=document.createElement("button");
        buttonX.addEventListener("click", fnc, false);
        buttonX.innerHTML="Generate Images";
        document.body.appendChild(buttonX);

        buttonY=document.createElement("input");
        buttonY.setAttribute("id", "URLImagen");
        buttonY.setAttribute("placeholder", "URL base");
        buttonY.setAttribute("type", "text");
        buttonY.setAttribute("size", "100");
        document.body.appendChild(buttonY);

        buttonY=document.createElement("input");
        buttonY.setAttribute("id", "inicio");
        buttonY.setAttribute("type", "text");
        buttonY.setAttribute("placeholder", "ini");
        buttonY.setAttribute("size", "2");
        document.body.appendChild(buttonY);

        buttonY=document.createElement("input");
        buttonY.setAttribute("id", "fin");
        buttonY.setAttribute("type", "text");
        buttonY.setAttribute("placeholder", "fin");
        buttonY.setAttribute("size", "2");
        document.body.appendChild(buttonY);

        buttonY=document.createElement("input");
        buttonY.setAttribute("id", "ext");
        buttonY.setAttribute("type", "text");
        buttonY.setAttribute("placeholder", "ext");
        buttonY.setAttribute("size", "3");
        document.body.appendChild(buttonY);
        
        
        
        
        buttonY=document.createElement("input");
        buttonY.setAttribute("id", "zero");
        buttonY.setAttribute("type", "checkbox");
        document.body.appendChild(buttonY);
        

        buttonX=document.createElement("button");
        buttonX.addEventListener("click", showLinks, false);
        buttonX.innerHTML="Show Links";
        document.body.appendChild(buttonX);
        
        
        
        
    }





}