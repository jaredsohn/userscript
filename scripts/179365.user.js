// ==UserScript==
// @name        Banear Trolls Meneame
// @namespace   http://nimdraug.com
// @description Oculta comentarios de trolls de meneame
// @version     1
// @grant       none
// @include					*meneame.net/*
// ==/UserScript==
//

//VARIABLES DE USUARIO

//Escribe aqui la lista de trolls que quieres ocultar (distingue mayúsculas y minúsculas!)
var trollList = ["troll_1","troll_2","troll_3"];

//Escribe aqui el tipo de ocultamiento que quieres 
// 0 - Ocultamiento total, no aparece nada
// 1 - El comentario aparece, pero se elimina el texto
// 2 - El comentario aparece, pero se reemplaza el texto por las frases al azar que tu quieras
var banType = 2;

//Escribe aqui las frases que quieres que reemplacen al texto del troll
var banText = [
   "Esta noticia me parece muy interesante, así como los comentarios de mis compañeros de Menéame. Un saludo.", 
   "[EDITADO] Iba a escribir una troleada de las mías, pero estoy intentando cambiar.", 
   "No estoy de acuerdo con la noticia, pero respeto otras opiniones distintas a la mía.",
   "Muy interesante, gracias al autor de la noticia.",
   "Me interesa este tema, creo que buscaré más información en fuentes objetivas y de reconocido prestigio para poder entablar alguna discusión productiva sobre el mismo.",
   "Totalmente de acuerdo.",
   "[EDITADO] Había escrito algo sin sentido, pero lo he pensado mejor. Cuando tenga una opinión formada sobre el tema volveré a comentar. Disculpas."]
   ;


//VARIABLES DE PROGRAMA
var lPosCommentsList = 0;
var lPos = 0;
var lPosComment = 0;
var lPosUpVote = 0;



//Busca la lista de comments
lPosCommentsList = document.body.innerHTML.search('<ol class="comments-list">');
if (lPosCommentsList > 0)
{
    //Parsea la lista por las etiquetas <li>
    var arrayComments=document.body.innerHTML.substr(lPosCommentsList,document.body.innerHTML.length-lPosCommentsList).split("<li>");

    for (var i=0; i<arrayComments.length; i++)
    {
        for (var j=0; j<trollList.length; j++)
        {
            //Busca coincidencia con los nombres de troll
            lPos = arrayComments[i].search('href="/user/'.concat(trollList[j]));
            if (lPos > 0)
            {
                switch(banType)
                {
                    case 0:
                        document.body.innerHTML = document.body.innerHTML.replace(arrayComments[i].substr(0,arrayComments[i].search("</li>")+5),"");   
                        break;

                    case 1:
                        lPosComment = arrayComments[i].search('</a>');
                        if (lPosComment > 0)
                        {
                            document.body.innerHTML = document.body.innerHTML.replace(arrayComments[i].substr(lPosComment,arrayComments[i].search("</div>")-lPosComment),"&nbsp;&nbsp;  ");
                        }
                        break;

                    case 2:
                        lPosComment = arrayComments[i].search('</a>');                        
                        if (lPosComment > 0)
                        {
                            document.body.innerHTML = document.body.innerHTML.replace(arrayComments[i].substr(lPosComment+4,arrayComments[i].search("</div>")-lPosComment-4),"&nbsp;&nbsp;  ".concat(banText[Math.floor((Math.random()*banText.length))]));                            
                        }
                        lPosUpVote = arrayComments[i].search('href="javascript:menealo_comment');                        
                        if (lPosUpVote > 0)
                        {
                            document.body.innerHTML = document.body.innerHTML.replace(arrayComments[i].substr(lPosUpVote,arrayComments[i].search('<img')-lPosUpVote-1)," ");                            
                        }
                        break;

                }
                break;                
            }
        }
    }
}