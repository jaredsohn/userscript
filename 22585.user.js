    // ==UserScript==
    // @name           OGame - Administrar Alianza/Manage Alliance
    // @author         elpeter
    // @date           04-01-2008
    // @version        0.1.1
    // @namespace      http://userscripts.org/scripts/show/18914
   // @description    Agrega links para facilitar la administración de la alianza
    // @include                 http://*ogame*
    // ==/UserScript==
  
   // Vers. 0.1.1
   // Script Multi-language
   // Vers. 0.1.2
   // Turkish Added - Thanks Samet ^^
   // Vers 0.1.3
   // Added Top Alliances Link / Agregado link para Top de Alianzas
  
   if (document.URL.indexOf("game/index.php") > -1)
   {
       var Admin_text = 'Manage';
       var MemberList_text = 'Member List';
       var MemberAdmin_text = 'Manage Members';
       var SendCM_text = 'Send C.M.';
       var AllyTop_text = 'Top Alliances';
      
       //Detectamos el idioma del servidor
       var notdetected = false;
      
       var ogtitle = window.location.href;
       var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
       if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }
       var langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);
       if(langstr != null){ langstr = RegExp.$1; } else { langstr = checker((ogserver+"langstr"),"not"); notdetected = true; }
  
   //Modificamos los textos con referencia al idioma del servidor
      if (langstr=='es'){
       var Admin_text = 'Administrar';
       var MemberList_text = 'Lista Ordenada';
      var MemberAdmin_text = 'Admin. Miembros';
       var SendCM_text = 'Enviar C.C.';
       var AllyTop_text = 'Top Alianzas';
       }
      if (langstr=='org'){
       var Admin_text = 'Manage';
       var MemberList_text = 'Member List';
     var MemberAdmin_text = 'Manage Members';
       var SendCM_text = 'Send C.M.';
       var AllyTop_text = 'Top Alliances';
       }
       if (langstr=='tr'){ //thanks Samet ;)
       var Admin_text = 'Yönetici';
     var MemberList_text = 'Üye Listesi';
       var MemberAdmin_text = 'Üye Yönetimi';
       var SendCM_text = 'Sirküler Gönder';
       var AllyTop_text = 'En Iyi Ittifaklar';
      }
  
       var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
       var as = document.getElementsByTagName('a');
       for (var i = 0; i < as.length; i ++)
       {
  var cur_a = as[i];
           if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.tw/portal/') > -1) && cur_a.parentNode.tagName == 'FONT' && cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
           {
              var msg_tr = cur_a.parentNode.parentNode.parentNode.parentNode;
              var menu_table = msg_tr.parentNode;
              
               var ali_tr = document.createElement('tr');
               var ali_td = document.createElement('td');
               var ali_tr1 = document.createElement('tr');
               var ali_td1 = document.createElement('td');
               
              
                       
               ali_td.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=17">'+SendCM_text+'</a></font></</div>';
               ali_tr.appendChild(ali_td);
               menu_table.appendChild(ali_tr);
               ali_td1.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=4&sort1=3&sort2=0">'+MemberList_text+'</a></font></div>\n';
               ali_tr1.appendChild(ali_td1);
               menu_table.appendChild(ali_tr1);
               break;
          }
      }
 }