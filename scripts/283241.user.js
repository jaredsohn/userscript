// ==UserScript==
// @name       Corazón de Melón ver todas las fotos
// @namespace  CorazonDeMelon
// @version    0.3
// @description  Muestra todas las fotos
// @include http://www.corazondemelon.es/illustrations.kiss
// @run-at document-end
// @copyright  2014+, Ricardo
// ==/UserScript==

var xmlhttp;
if (window.XMLHttpRequest) {xmlhttp = new XMLHttpRequest();}
else {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var xmlDoc = xmlhttp.responseXML;
        $xml = $( xmlDoc );
		$avatarfull = $xml.find(".avatarfull");
        hair = $avatarfull.find(".hair")[0].src;
        eyes = $avatarfull.find(".eyes")[0].src;

        var patron = /[^\/]*.png/
        hair = hair.match(patron)[0];

        // haircut
        patron= /^[^\/_]*_/
        var haircut = hair.match(patron)[0];
        haircut = haircut.substring(0,haircut.length - 1);
        // haircolor
        var haircolor = hair.replace(haircut+"_","");
        haircolor = haircolor.substring(0,haircolor.length - 4);
        // eyecolor
        patron= /[^\/]*.png/
        var eyecolor = eyes.match(patron)[0];
        eyecolor = eyecolor.substring(0,eyecolor.length - 4);

        Main_Function(haircut,haircolor,eyecolor);
    }
}
xmlhttp.open("GET", "http://www.corazondemelon.es/placard.kiss", true);
xmlhttp.responseType = "document";
xmlhttp.send();

function Main_Function(haircut,haircolor,eyecolor){
    var UserStyle = "haircut=" + haircut + "&haircolor=" + haircolor + "&eyecolor=" + eyecolor;
    var UserStyleEyeNO = "haircut=" + haircut + "&haircolor=" + haircolor + "&eyecolor=no";
    var NoStyle = "haircut=no&haircolor=no&eyecolor=no";
    var pictures = document.getElementById('pictures');
    var fotos = pictures.getElementsByTagName("img");

    for(var i=0, len = fotos.length; i < len; i++)
    {
        if(fotos[i].src.indexOf("padlock") !== -1 ){

            fotos[i].onerror = function(){
                if( this.src.indexOf("id=155") !== -1 || this.src.indexOf("id=162") !== -1 || this.src.indexOf("id=217") !== -1)
                    this.src = this.src.replace(NoStyle,UserStyleEyeNO);
                else
                    this.src = this.src.replace(NoStyle,UserStyle);
                var link = this.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
                this.parentNode.href = link;
            };
            
            //fotos[i].src = fotos[i].src.replace("padlock","thumbnail");
            fotos[i].src = fotos[i].src.replace("http://www.corazondemelon.es/assets/picture.kiss!padlock","assets/picture.kiss!thumbnail");
            
            if(fotos[i].src.indexOf("id=134") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=143") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyleEyeNO);
            }
            else if(fotos[i].src.indexOf("id=202") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=203") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=204") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=215") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=216") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=217") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyleEyeNO);
            }
            else if(fotos[i].src.indexOf("id=218") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=234") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=233") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=232") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=231") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            else if(fotos[i].src.indexOf("id=230") !== -1){
                fotos[i].src = fotos[i].src.replace(NoStyle,UserStyle);
            }
            var id = "imagen"+i;
            fotos[i].id = id;
            var link = fotos[i].src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
            $("#"+id).wrap("<a href='" + link + "'></a>'");
            
            //fotos[i].outerHTML = "<a href = " + link + ">" + fotos[i].outerHTML + "</a>";

        }
    }
    // Imágenes especiales
    var img;
    pictures = pictures.getElementsByTagName("div")[0];
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=225&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+225;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=226&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+226;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=227&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+227;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=228&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+228;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=229&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+229;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=240&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+240;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=241&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+241;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=242&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+242;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=243&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+243;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=244&haircut=no&haircolor=no&eyecolor=no&resolution=web");
    var id = "imagenEspecial"+244;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    img = img_create("http://www.corazondemelon.es/assets/picture.kiss!thumbnail?id=246&" + UserStyle + "&resolution=web");
    var id = "imagenEspecial"+246;
    img.id = id;
    var link = img.src.replace("http://www.corazondemelon.es/assets/picture.kiss!thumbnail","assets/picture.kiss!normal");
    pictures.appendChild(img);
    $("#"+id).wrap("<a href='" + link + "'></a>'");
    
    $('#pictures a').lightBox();
}

function img_create(src) {
    var img = document.createElement('img');
    img.src= src;
    return img;
}
