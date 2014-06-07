// ==UserScript==
// @name AutoMessagerie2ParLaForge
// @namespace InGame
// @author Odul
// @date 26/02/2014
// @version 1.01
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License

// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
//recherche des contacts fonctionnelle
// ==/UserScript==

toSearch = "";        

var e = new Array();
e["Odul"] = "Piaf"; //Exemple.

(function() { 
       
if(typeof localStorage=='undefined')
    alert("Vous ne pouvez pas utiliser cette version de la mise à jour. Veuillez contacter Odul");
    
var search = document.createElement('div');
search.id='searchMessage';
search.setAttribute("style", "margin-bottom: 6px;");
$('#liste_messages')[0].insertBefore(search,$('#liste_messages .content')[0]);    
   

var input = document.createElement("input");
input.type = "text";
input.placeholder = "Chercher un contact ou un sujet..";
input.setAttribute("style", "border: none;border-bottom: 1px dashed #666;background: none;padding: 4px 2%;color: #FFF;width: 90%; bottom: 4px; left: 2.5%;");

search.appendChild(input);    
 
    $('#liste_messages #searchMessage input').keyup(function () {
        

       var auth = localStorage.getItem('majForge_Messagerie2.0');
       if(auth!=null && auth=="on") 
       {
       var oldtoSearch = toSearch;
       toSearch = $(this).val().toLowerCase();

       if(oldtoSearch == "")
          loadResults();
       filterResults();
       }
       else alert("Vous n avez pas l autorisation d'utiliser cette mise a jour. Contactez Odul");
    });
    
    $("#zone_messagerie .titre").html($("#zone_messagerie .titre").html().replace("Messagerie", "Messagerie 2.0 par La Forge"));
    $("#zone_messagerie .titre").css("height","15px");
    
    
     $('#zone_messagerie .content li').each(function () { 
       var auth = localStorage.getItem('majForge_Messagerie2.0');
       if(auth!=null && auth=="on") 
           for (key in e) 
             $(this).find('.couleur5:first').html($(this).find('.couleur5:first').html().replace(key, e[key]));
    });
    
})();


function loadResults() {
    if ($('#zone_messagerie .loader').data('canLoad') == false)
      return true;
    var id_folder = $('#current_folder').attr('data-id');
    var numero = $('#zone_messagerie .content li:last-child');
        numero = numero.length ? numero.attr('data-numero') : 0;
    $('#zone_messagerie .loader').css('visibility', 'visible');
    $('#zone_messagerie .loader').data('canLoad', false);
    $.post('./Menu/Messaging/OpenFolder', {
        id_folder: id_folder,
        numero: numero
    }, function (xml) {
        $('#zone_messagerie .loader').css('visibility', 'hidden');
        setTimeout($('#zone_messagerie .loader').data('canLoad', true), 1000);
        if (xml_result(xml)) {
            newResults = false;
            $(xml).find('folder_content li').each(function () { 
             var auth = localStorage.getItem('majForge_Messagerie2.0');
             if(auth!=null && auth=="on") 
                   for (key in e) 
                      $(this).find('.couleur5:first').html($(this).find('.couleur5:first').html().replace(key, e[key]));
                $(this).clone().appendTo($('#zone_messagerie .content ul'));
                newResults = true;
            });
            
            nav.getMessagerie().handleDrag();
            
            if(newResults == true)
            {
               filterResults();
               loadResults();
            }
         }
    });
}


function filterResults(){
    
            var list = $('#liste_messages .content .couleur5');
            var listTitres = $('#liste_messages .content .message_titre');

            var regNom = new RegExp("^" +toSearch, "g");
            var regSujet = new RegExp(toSearch, "g");
    
            for (var i = 0; i < list.length; i = i+2)
            {
                if(!list[i].innerHTML.toLowerCase().match(regNom) && !listTitres[i/2].innerHTML.toLowerCase().match(regSujet))
                  list[i].parentNode.style.display='none';
                else
                  list[i].parentNode.style.display='block';
            }
}



MenuMessagerie.prototype.openFolder = function (id_folder) {
    $.post('./Menu/Messaging/OpenFolder', {

        id_folder: id_folder
    }, function (xml) {
        if (xml_result(xml)) {
       
            
            $('#current_folder').text($(xml).find('folder_name').xml()).attr('data-id', id_folder);
            
            $('#liste_messages .content ul').html("");
            $(xml).find('folder_content li').each(function () {      
             var auth = localStorage.getItem('majForge_Messagerie2.0');
             if(auth!=null && auth=="on") 
                  for (key in e) 
                   $(this).find('.couleur5:first').html($(this).find('.couleur5:first').html().replace(key, e[key]));               
                $(this).clone().appendTo($('#zone_messagerie .content ul'));

            });
      //      $('#liste_messages .content').html($(xml).find('folder_content').xml());
            
                               
            $('#folder_list .folder').removeClass('selected');
            $('#folder_' + id_folder).addClass('selected');
            if (parseInt(id_folder) > 0)
                $('#liste_messages .onlyMyFolders').show();
            else
                $('#liste_messages .onlyMyFolders').hide();
            $('#liste_messages .onMessageSelected').hide();

            nav.getMessagerie().handleDrag();
            
            if(toSearch != "")
            {
                filterResults();
                loadResults();
            }
        }
    });
}



MenuMessagerie.prototype.loadFolderContent = function () {
    if ($('#zone_messagerie .loader').data('canLoad') == false)
        return true;
    var id_folder = $('#current_folder').attr('data-id');
    var numero = $('#zone_messagerie .content li:last-child');
    numero = numero.length ? numero.attr('data-numero') : 0;
    $('#zone_messagerie .loader').css('visibility', 'visible');
    $('#zone_messagerie .loader').data('canLoad', false);
    $.post('./Menu/Messaging/OpenFolder', {
        id_folder: id_folder,
        numero: numero
    }, function (xml) {
        $('#zone_messagerie .loader').css('visibility', 'hidden');
        setTimeout($('#zone_messagerie .loader').data('canLoad', true), 1000);
        if (xml_result(xml)) {
            $(xml).find('folder_content li').each(function () {
                var auth = localStorage.getItem('majForge_Messagerie2.0');
                if(auth!=null && auth=="on") 
                   for (key in e) 
                      $(this).find('.couleur5:first').html($(this).find('.couleur5:first').html().replace(key, e[key]));                               
                $(this).clone().appendTo($('#zone_messagerie .content ul'));
            });
            nav.getMessagerie().handleDrag();
        }
    });
}