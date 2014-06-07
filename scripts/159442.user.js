// ==UserScript==
// @name           Outil Mesure Signature   
// @description    Determine les dimensions de chaque signature sur le forum des RR
// @include        http://forum.lesroyaumes.com/*
// ==/UserScript==

   
   // Definition REGEX
   var regex = /(.+)([_]{17})(<br>){1}(.+)/;
   var regex2 = /\n/g;
   
   // On recupère tous les RP
   var query = document.querySelectorAll('span.postbody');
   
   // On traite les RP un par un
   for (var i = 0, q = query.length; i < q; i++)
   {
      if (query[i])
      {
         // On selectionne le RP ayant subir des modifications
         RP = query[i];
         
         // On supprime les retours inutiles
         RP = RP.innerHTML.replace(regex2, '');
            
         if(regex.exec(RP))
         {
            // On remplace les captures dans l'ordre et on ajoute une balise div
            text = RegExp.$1 + RegExp.$2 + RegExp.$3 + '<div id="banniere'+i+'" style="display: inline-block;">' + RegExp.$4 + '</div>';
            // On affiche le nouveau RP
            query[i].innerHTML = text;   
            
            // On recupere les dimensions de la balise div ajouté précedemment
            Largeur = document.getElementById("banniere"+i+"").offsetWidth;
            Hauteur = document.getElementById("banniere"+i+"").offsetHeight;
            
            Infraction = "";
            if(Largeur > 600)
            {
               Largeur = '<span style="color: yellow; font-weight: bold;">'+ Largeur +'</span>';
               Infraction = 'style="color: white; background-color: red; padding: 5px;"';
            }
            if(Hauteur > 200)
            {
               Hauteur = '<span style="color: yellow; font-weight: bold;">'+ Hauteur +'</span>';
               Infraction = 'style="color: white; background-color: red; padding: 5px;"';
            }
            
         
            // On affiche le resultat
            query[i].innerHTML += '<br><br><p '+Infraction+'>Dimension bannière: (Largeur: '+ Largeur + ' px et hauteur: '+ Hauteur +' px)</p>';
         }    
      }
   }