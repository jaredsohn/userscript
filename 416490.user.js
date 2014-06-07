// ==UserScript==
// @name sauvegardeMessagerieAncienneInterface
// @namespace InGame
// @author Odul
// @date 17/03/2014
// @version 1.03
// @description Sauvegarde des messages de l'ancienne interface
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://test.dreadcast.fr/Main
// @compat Firefox, Chrome
// ==/UserScript==
/* A LIRE :
Le script recupere l integralite des messages de l ancienne interface et affiche a la fin un code html.
Il faut en copier l integralite du texte de la fenetre (une fois ce popup ferme) en faisaint un petit ctrl a. Ouvre un nouveau fichier sur ta machine, enregistre le avec l extension .html, colle le texte copie dedans et hop. T as ta sauvegarde! Te reste plus qu a ouvrir ce fichier avec ton navigateur habituel. 
Les conversations sont ordonnees de la plus recente a la plus anciennce. Par contre au sein d une conversation les messages sont ordonnes du plus vieux au plus recent pour faciliter la lecture dans l'ordre chonologique de la conversation.

Pour que le script se lance il vous faut vous connecter a dreadcast a cette adresse : 
 http://test.dreadcast.fr/Main
*/
MenuMessagerie.prototype.update = function (html, textStatus) {
    $("#tmpListMessages").html(html);
    
    var messageslist = $('#tmpListMessages .message_list');
    for(i = 0; i< messageslist.size(); i++)
    {
        var id = messageslist[i].id.replace(/message_list_(\d+)$/, '$1');
        var textConv = "";
        
        //var messagesConvDiv = document.createElement('div');
        //messagesConvDiv.id='messagesConvDiv'+id;
        //messagesConvDiv.className = 'messageConvClass';

        //messagesDiv.appendChild(messagesConvDiv);
        
        var auteur =  $(messageslist[i]).find(".auteur")[0].innerHTML;
        var sujet = $(messageslist[i]).find(".sujet")[0].innerHTML;
        
        var url = 'Menu/Messaging/action=view&idconv=' + id;
    
        $.get(url, function (xml) {
            if (xml_result(xml)) {
                var idMessages = $(xml).find(".conversation");
                
                for(j = 0; j < idMessages.size(); j++)
                {
                    var idMess = $(xml).find(".conversation")[j].id.replace(/convers_(\d+)$/, '$1');
                    
                    var textMessage = "<div id='message"+id+"_"+idMess+"' class='messageClass'>";
                   // var message = document.createElement('div');
                    //message.id='message'+id+'_'+idMess;
                    //message.className = 'messageClass';
                    //messagesConvDiv.appendChild(message);            
        //            $('#messagesConvDiv'+id)[0].insertBefore(message,$('#messagesConvDiv'+id)[0].firstChild);
   
                    var tmp = $(xml).find(".conversation")[j];
                    var date = $(tmp).find("span")[0].innerHTML;
                    var nom = $(tmp).find("span")[1].innerHTML.replace("Message de ", "");

                    textMessage +="<div class='nomdateMessage'>"+nom +" "+date+"</div>";
                    //$('#message'+id+'_'+idMess).html("<div class='nomdateMessage'>"+nom +" "+date+"</div>");
                       
                    var urlMessage = 'Menu/Messaging/action=view&idconv=' + id + '&message=' + idMess;
                    
                    $.get(urlMessage, function (xml2) {
                       if (xml_result(xml2)) {
                           textMessage += $(xml2).find("message")[0].innerHTML;
                          //$('#message'+id+'_'+idMess).html($('#message'+id+'_'+idMess).html() + $(xml2).find("message")[0].innerHTML);                   
                       } 
                    });
                    
                    textConv = textMessage + "</div> "+textConv;
                }
            }
        });
        
        textConv = "<div id='messagesConvDiv' class='messageConvClass'>" + "<div class='titreMessage'>"+auteur+" "+sujet+"</div>" + textConv + "</div>";
        text += textConv;
    //    $('#messagesConvDiv'+id).html("<div class='titreMessage'>"+auteur+" "+sujet+"</div>" + $('#messagesConvDiv'+id).html());
    }
}

getNumberOfPages = function (html, textStatus) {
    $("#tmpListMessages").html(html);
    pages = $('#messages_options #pages span').last().text();;
    
}

alert("Il va vous falloir pas mal de patience. Le processus va durer un bon moment (pour 100 pages de messages ca m a prit 20 minutes.). Laissez tourner le script sur un onglet ouvert pendant que vous vacquez a vos occupations. Un pop up vous previendra quand c est termine, avec la marche a suivre pour sauvegarder sur votre machine vos messages. Ne faites pas attention a la tronche de ce qui s affiche, ca sera (un peu) plus lisible que ca sur votre fichier final."); 

$("#ingame").html(" ");
$("#ingame").css("background","none");
$.ajaxSetup({async: false});


var tmpListMessages = document.createElement('div');
tmpListMessages.id='tmpListMessages';
document.body.appendChild(tmpListMessages);
$('#tmpListMessages').css("display","none");

pages = 1;
engine.updateMenu('Messaging', 'folder=tous_les_messages&page=1', getNumberOfPages);

var text = "";

var pagesDiv = document.createElement('div');
pagesDiv.id='pagesDiv';
document.body.appendChild(pagesDiv);


//var messagesDiv = document.createElement('div');
//messagesDiv.id='messagesDiv';
//document.body.appendChild(messagesDiv);
//$('#messagesDiv').css("display","none");


for(page = 1; page <= pages; page++)
{
    $('#pagesDiv').text($('#pagesDiv').text() +" "+page);
    engine.updateMenu('Messaging', 'folder=tous_les_messages&page='+page, nav.getMessagerie().update);
//    text += $('#messagesDiv').html();
  //  $('#messagesDiv').html("");
}
text += "</div>";

$("#tmpListMessages").remove();
$("#pagesDiv").remove();


$("head").html(" ");
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.titreMessage { border-bottom : 1px solid; font-size: 20px; line-height:20px; text-transform:uppercase;}';
style.innerHTML += '.nomdateMessage { color: green; }';
style.innerHTML += '.messageClass { padding: 10px 10px 5px; border: 1px solid rgb(204, 204, 204); border-radius: 15px; margin: 10px 0px 20px; box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3) inset; background: none repeat scroll 0% 0% rgb(254, 254, 254);}';
style.innerHTML += '.messageConvClass { width: auto; background: none repeat scroll 0% 0% #D3D8D7; margin: 10px 0px 20px; box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3) inset; border-radius: 20px; padding: 20px 20px 10px; border: 2px solid black; }';

document.getElementsByTagName('head')[0].appendChild(style);

//var text = $("#ingame").html();
var header = $("head").html();
$("#ingame").html("");
$("#ingame").text("<html><head>"+header+"</head><body style='background-color:black;'>"+text+"</body></html>");


alert("La recuperation est terminee. Maintenant copie l integralite du texte de la fenetre (une fois ce popup ferme) en faisant un petit ctrl a. Ouvre un nouveau fichier sur ta machine, enregistre le avec l extension .html, colle le texte copie dedans et hop. T as ta sauvegarde. Te reste plus qu a ouvrir ce fichier avec ton navigateur habituel. Les conversations sont ordonnees de la plus recente a la plus anciennce. Par contre au sein d une conversation les messages sont ordonnes du plus vieux au plus recent pour faciliter la lecture dans l ordre chonologique de la conversation.");
