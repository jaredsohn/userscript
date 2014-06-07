// ==UserScript==
	// @name           forums_asi
	// @fullname       Forums ASI
	// @author         http://userscripts.org/users/418866
	// @description    Une extension pour les forums du site Arrêt sur Images
	// @version        2.0.5
	// @date           04/11/2012
	// @icon           http://gemp.ch/forums-asi/firefox/icon-64.png
	// @require        http://gemp.ch/forums-asi/firefox/jquery-v2.js
	// @require        http://gemp.ch/forums-asi/firefox/jquery.tablesorter.min.js
	// @require        http://gemp.ch/forums-asi/firefox/jquery.easydate.js
	// @include        http://*.arretsurimages.net/forum*
	// @grant          none
// ==/UserScript==


/* ******************************************************************************
 * Extension pour les forums du site Arrêt sur Images
 * Version 2.0.5 - 04 novembre 2012
 * Fait par Gemp http://gemp.ch/forums-asi/
 * Aucune licence, z'en faites ce que vous voulez
 ****************************************************************************** */


unsafeWindow.jQuery(document).ready(function(){

  $('head').append('<link href="http://gemp.ch/forums-asi/firefox/forums-asi-v2.css" type="text/css" rel="stylesheet" media="screen">');


// copy

 /* ******************************************************************************
  * CORE: INFOS ET FONCTIONS GLOBALES
  ****************************************************************************** */
  var core = { 

    version:      '2.0.5',
    messname:     'v2',         // le nom du message qui s'affiche en haut et qui nomme le "cookie"
    messheight:   132,          // la hauteur du message en haut
    firefox:      true,         // ne sert plus
    debug:        false,        // pour avoir les messages console
    page:         '',           // contiendra le type de page sur lequel on est après core.detection
    idprefix:     'post-',      // le préfixe des div des commentaires 
    msgprefix:    'msg-',       // le préfixe des ancres
    newclass:     '.new-flag',  // la classe des "nouveau"
    votedclass:   '.vote',      // la classe du com qu'on a éventuellement voté -- est '.voter' sinon
    exturl: 'http://gemp.ch/forums-asi/', // safari.extension.baseURI, // 

    detection: function() { // savoir sur quelle page on est
      var page;
      var fid = $('#post-form input[name=forum_id]').val(); // l'id du forum
      var tid = $('#post-form input[name=thread]').val(); // l'id de l'article
      if (fid && tid) { // normalement on est sur un fil ou la preview
        core.forumID = fid; // on stocke dans core
        core.filID   = tid;
        if ($('#phorum').find('.message.prime:first').length) { // on est sur le fil
          page = 'fil';
        } else { // on est sur la preview ou l'accusé de réception d'un commentaire ?
          page = 'preview';
        }
      } else { // ailleurs
        var som = $('#phorum').find('td.col-titre');
        if (som.length >= 18) { // sommaire principal
          page = 'sommaire';
        } else  if (som.length) { // sous-sommaire d'une section
          page = 'sous-sommaire';
        } else {
          page = 'ailleurs';
        }
        // À FAIRE ÉVENTUELLEMENT LES PM :
        // $('form#phorum-mp-list') = inbox ou outbox
        // input hidden name="forler_id" value="inbox"
        // input hidden name="forler_id" value="outbox"
        // etc. -- a big pain
      }
      core.page = page;
      return page;
    },
    
    divID: function(id, diese) { // fabrique l'ID du div post-gemp 
      var diese = diese ? '#' : '';
      return diese + core.idprefix + id;
    },
    
    msgID: function(id, diese) { // fabrique le name des ancres 
      var diese = diese ? '#' : '';
      return diese + core.msgprefix + id;
    },
    
    makeQID: function(id) { // fabrique le QID, càd le PID préfixé de l'identifiant du forum
      return core.forumID+','+id;
    },

    checkstructure: function() { // vérifie si on a besoin de reconstruire la page        @@@@ À REFAIRE ?!!
      if ($('a[name^="'+ core.msgprefix +'"]:first').length) {
        return $('a[name^="'+ core.msgprefix +'"]:first').closest('div').attr('id').match(core.idprefix);
      } else {
        return false;
      }
    },

    sortByName:function(a, b){ // la gestion du sorting de la liste des gens 
      var aName = a.nom.toLowerCase();
      var bName = b.nom.toLowerCase(); 
      return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    },

    sortByDate: function(a, b){ 
      return ((a.tSort < b.tSort) ? -1 : ((a.tSort > b.tSort) ? 1 : 0));
    },

    sortByOrder: function(a, b){ 
      return ((a.nSort < b.nSort) ? -1 : ((a.nSort > b.nSort) ? 1 : 0));
    },
    
    sortByOption: function(arr){
      if (core.sort == 'linear') {
        return arr.sort(core.sortByOrder);
      } else {
        return arr.sort(core.sortByDate)
      }
    },
    
    // fonctions debuggage
    t: function(nom, end){
      if (core.debug) end ? console.timeEnd(nom) : console.time(nom)
    },
    log: function(what){
      if (core.debug) console.log(what);
    }
  } // core end



 /* ******************************************************************************
  * FAG: RECONSTRUCTION ET AJOUTS 
  ****************************************************************************** */
  var fag = { 

    rebuilded: false,

    init: function() { 

      timer.start();
      temps.asistart = temps.timestamp() - temps.transformDate('08:00', '12/09/2007')[0]; // les débuts d’ASI
      
      var page = core.detection(); // sur quelle page est-on
      
      core.egoName = $('#user-info .coleft').text(); // my name
      core.egoPID  = $('#post input[name=user_id]').val(); // my id
      core.egoQID  = core.makeQID(core.egoPID); // son propre qid tel qu'il est utilisé dans les liens

      if (page == 'fil') {
        // core.forumID = ''; // l'id du forum, déféni par core.detection
        // core.filID   = ''; // l'id de l'article, défini par core.detection
        fag.$messages = $('.message.prime:not(:first)').clone(); // mise de tous les commentaires en cache
        fag.$messages.find('.pas-elu').css('margin-top', '16px'); // hacks pour ces putain de CSS
        $('#phorum').find('div.nav:last').css('margin-top', '16px'); // hack
        // - Pour que "Répondre" sur l'article original ne mette plus un titre vide avec seulement "Re: "
        $('.message.prime:first .generic').append('<h2 style="display: none">'+ $('.message.prime:first h1').text() + '</h2>');
        
        core.people     = {}; // objet pour stocker les contributeurs
        core.peopleArr  = []; // array pour stocker le lien avec le contributeur
        core.fullArr    = []; // array pour stocker tous les commentaires
        core.fullTree   = []; // array de l'arbre de tous les commentaires --> NEW
        core.egoArr     = []; // array pour stocker l'ego (peuplée par core.people[core.egoPID])
        core.newArr     = []; // array pour stocker les nouveaux 

        gdb.init(); // rappel des nouveaux
        cykl.init(); // bon endroit ?

        core.needrebuild = !core.checkstructure(); // doit-on reconstruire? <------- à modifier ? @@@@
        if (core.needrebuild) { // plus vraiment nécessaire, vu qu'on ne "reconstruit" plus
          $('#btn_cycle .n').text('Reconstruction');
          setTimeout(fag.rebuild, 10); // on lance le rebuild avec un petit décalage
        } else { // fonctions aussi présentres dans fag.endbuild
          fag.construct();
        }
        keyb.init(); // bon endroit ?

      } else if (page == 'sommaire' || page == 'sous-sommaire') {
        sommaire.init();
      }
    },

    rebuild: function() { // "reconstruction" de la page, le terme est moins approprié
      // puisqu'à l'origine, je reconstruisais comme j'attendais qu'ASI le fasse en dur
      // ce qui n'arrivera sans doute jamais, donc je fais autrement

      core.t('rebuildfull');

      var niveaux = []; // array temporaire des niveaux
      var commentaires_id = []; // collection rapide des ID des commentaires
      var current_div = []; // l'array qui va contenir l'indication du niveau
      var $ancres = $('a[name^="msg"]'); // ancres en cache, supprimées à la première boucle
      
      // --> core.t('niveaux');

      $.each(fag.$messages, function(i, $v) { // première boucle
        var id = $ancres.eq(i).attr('name').substr(core.msgprefix.length); 
        commentaires_id.push(id); // on récupère l'ID depuis le href de l'ancre
        var niv = parseInt($(this).css('margin-left'), 10)/20;
        niveaux.push(niv); // on récupère l'indentation, seule indication de la structure
      });

      $ancres.remove(); // suppression des ancres en global
      
      // --> core.t('niveaux', true);
      
      for (var i = 0; i < fag.$messages.length; i++) { // seconde boucle
        var niv = niveaux[i];
        var id = commentaires_id[i];
        var $mess = fag.$messages.eq(i); // le message courant
        
        // --> core.t('wrap');

        // ON NE WRAPE PLUS, ON AJOUTE JUSTE ID ET CLASSES
        var div = core.divID(id);
        var classes = 'post-gemp niveau-'+niv+' reponse-ouverte';
        $mess.addClass(classes).attr('id', div); // --> NEW ajout de la classe au div existant
        
        var data = fag.infopeople(id, $mess, i); // on stocke les infos people
        data.nouveau = $(core.newclass, $mess).length; // si c'est un nouveau
        if (data.nouveau) core.newArr.push(data);  // on ajoute les nouveaux

        var nom = core.people[data.pid]['nom']; // on récupère le nom
        var ref = {'id': id, 'nom': nom}; // les données pour le lien éventuel à une réponse
        current_div[niv] = ref; // initialisation du niveau

        if (niv > 1) { // c'est une réponse, on ajoute les informations de son origine
          data.origine = current_div[niv-1]; // ... qui se trouvent un niveau plus haut
          // et on ajoute ce commentaire à tous les autres des niveaux précédents
          for (var j = 1; j < niv; j++) core.fullTree[current_div[j].id].push(id);
        }
        core.fullArr.push(data); // on stocke les données du commentaire
        core.fullTree[id] = []; // pour y mettre les éventuelles réponses

        // --> core.t('wrap', true);

      }

      fag.endbuild(); 
 
    },

    endbuild: function() { // fin de la "reconstruction" y'a plus grand chose 

      fag.rebuilded = true;

      // *--> 
      core.t('rebuildfull', true);

      $('#btn_cycle .n').text('Navigation');
      setTimeout(fag.construct, 10); // on lance la suite avec un petit décalage
      
    },

    construct: function() { // fabrication des éléments de navigation 
      
      // *--> 
      core.t('construct');
      
      for (var i = 0; i < core.fullArr.length; i++) { // 3e boucle

        // --> core.t('h2');
        
        var $mess = fag.$messages.eq(i); // le commentaire courant

        var m = core.fullArr[i]; // les infos du commentaire courant
        var id = m.id; 
        var niv = m.origine; // 

        var classe = core.fullTree[id].length ? 'repondu' : 'pas-de-reponse';
        $mess.addClass(classe).find('h2:first').attr('rel', id); // on stocke l'ID dans le titre
        // on pourrait virer ce stockage d'ID, mais bon, ça ne prend presque rien et c'est pratique

        if (niv) { // on est sur une réponse
          var refid  = m.origine.id;
          var refnom = m.origine.nom;
          $mess.find('.message-infos:first')
            .append(' en réponse à <b class="retour-com" rel="'+refid+'">'+refnom+' &nbsp; </b>');
        }
        // --> core.t('h2', true);

        fag.constructed = true;
        // *--> 
        core.t('construct', true);

      }

      fag.endfag();

    }, // construct end

    endfag: function() { // les fonctions appelées à la fin de construct, ça s'est étoffé

      // *--> 
      core.t('fagend');
      
      // on remplit l'array egoArr
      if (core.people[core.egoPID]) {
        core.egoArr = core.people[core.egoPID]['com'].slice(); // doit-on dupliquer?!
      }

      // les boutons d'ouverture et de fermeture des commentaires
      var bouton1 = $('<p class="seul">Ouvrir ce commentaire</p>');
      var bouton2 = $('<p class="ouvrir">Ouvrir toutes les réponses</p>');
      var bouton3 = $('<p class="fermer">Fermer les réponses</p>');
      var bouton = $(bouton1).add(bouton2).add(bouton3);

      fag.$messages.find('.message-user-info').append(bouton);

      $newfil = $('<div id="forums-asi-extended" />').append(fag.$messages); // on range nos clones

      $newfil.find('.post-gemp').each(function() { // on recrée les ancres
        $(this).before('<a name="'+ this.id.replace(core.idprefix, core.msgprefix) +'" />');
      });

      $('.message.prime:not(:first)').wrapAll('<div id="raz" />'); // on range tous les commentaires
      $('#raz').remove(); // on vire les commentaires rangés
      
      $newfil.insertAfter($('.messages_vote:first')); // insertion des clones

      // délégations des clicks des boutons et autres
      $('#forums-asi-extended h2').on('click', function() {
        $('.retour-btn').remove(); // au cas où, on supprime les boutons de retour *** faire une fonction ?
        window.location.hash = core.msgID( $(this).attr('rel') );
      });
      $('#forums-asi-extended .retour-com').on('click', function(){
        $('.retour-btn').remove();
        core.gotocom = 'reponse';
        $( core.divID($(this).attr('rel'), true) )
        .find('.message-infos:first')
        .append(' <b class="retour-btn" rel="'+ $(this)
        .parents().find('h2:first').attr('rel') +'"> Revenir à la réponse &nbsp; </b>')
        .find('.retour-btn')
        .click(function(){
          $('.retour-btn').remove();
          window.location.hash = core.msgID( $(this).attr('rel') );
          core.gotocom = 'origine';
        });
        var reltmp = $(this).attr('rel');
        $( core.divID(reltmp, true )).scrollView(); // pour être sûr
        window.location.hash = core.msgID( reltmp );
      });
      $('#forums-asi-extended .seul').on('click', function(){
        manip.ouvrirSeule(manip.idfromH2(this));
      });
      $('#forums-asi-extended .ouvrir').on('click', function(){
        manip.ouvrirToutes(manip.idfromH2(this));
      });
      $('#forums-asi-extended .fermer').on('click', function(){
        manip.fermerToutes(manip.idfromH2(this));
      });
      
      core.articleDate = temps.recupereDate( $(core.divID(core.filID, true)).find('.message-infos:first') );

      // pour ranger le header un peu
      $('.header-first-post')
      .insertAfter($('.messages_vote:first'))
      .before('<a name="liste-com"></a>')
      .wrap('<div class="message" />')
      .after('<div id="commentateurs" />')
      .after('<div id="gemp-options" />')
      .after('<span id="fagtimer" />');
      
      $('.header-first-post, #gemp-options, #fagtimer').hover(
      function(){
        if (keyb.altdown) {
          $('#gemp-options').hide(0);
          $('#fagtimer').show(0);
        }
      },function(){
        $('#gemp-options').show(0);
        $('#fagtimer').hide(0);
      });
      
      gdb.process();
      cykl.endbuild();
      faglist.init();
      fag.formFromFixForAsi();
      fag.eluscontexte();
      fag.vote();
      fag.linking();

      // pour essayer d'arriver où on veut dans la page
      if (window.location.hash.match(core.msgprefix)) {
        var finalgoto = function() {
          var hash = window.location.hash;
          $(hash.replace(core.msgprefix, core.idprefix)).scrollView(); 
        }
        setTimeout(finalgoto, 100);
      }
      aide.init();

      // *--> 
      core.t('fagend', true);

      timer.stop();
      core.log('timer: '+timer.totalTime);
      
      var t = 'Temps de reconstruction : <b>'+timer.formatTime()+'</b>';
      var m = "Réafficher le dernier message de l'extension";
      var v = ' (version: <a id="re-message">'+core.version+'</a>)'; 
      // - jQ: '+$().jquery+')';

      $('#fagtimer').html(t+v);

      $('#re-message').attr('title', "Réafficher le dernier message de l'extension")
      .css('cursor', 'pointer').click(function(){
        if (!$('#ifmess').length) { // pour ne pas l'afficher deux fois
          aide.message(core.messname, core.messheight, true); 
        }
        return false;
      });

    }, // fagend end

    infopeople: function(id, mess, order) { // les infos d'un commentaire 
      var identite = $('.message-infos a:first', mess);
      var qid = identite.attr('href').split('?')[1]; // identifiant asi --------> est en fait QID
      var pid = qid.split(',')[1];

      if ($.inArray(pid, core.peopleArr) < 0) { // s'il n'a pas d'entrée dans l'array des contributeurs
        core.peopleArr.push(pid); // dans l'array
        core.people[pid] = {}; // dans l'objet
        core.people[pid]['nom'] = identite.text();
        core.people[pid]['com'] = []; // l'array de tous ses commentaires
      }
      var infos  = $('.message-user-info:first', mess);
      var t = temps.recupereDate(infos);
      // PID != QID -- verif "store" @@@@
      var data = {'id': id, 'pid': pid, 'date': t[1], 'heure': t[2], 'tSort': t[0], 'nSort': order}; 

      core.people[pid]['com'].push(data);

      return data;
    },
    
    linking: function() { // rend les liens faits dans le même fil sans ouverture de fenêtre ou changement de page
      var local = new RegExp("http:\/\/(www\.)?arretsurimages\.net\/forum\/read\.php\?", "i");
      var vitedit = new RegExp("http:\/\/(www\.)?arretsurimages\.net\/vite-dit\.php#([\\d]+)", "i");
      $('.post-gemp .content a').each(function(){
        var h = this.href;
        if (h.match(local)) {
          var msg = "Lien vers un autre fil des forums d'ASI \nsur lequel il peut y avoir des ´nouveau´...!";
          $(this).wrap('<span />').attr('title', msg);
          $(this).parent()
          .append('<a href="'+h+'" title="'+msg+'" class="lien-interne">&nbsp;&#8634;</a>')
          .mouseenter(function(){
            var msg = "lien vers un commentaire du même fil, \ndonc ne changera pas de fenêtre";
            var local = new RegExp("http:\/\/(www\.)?arretsurimages\.net\/forum\/read\.php.\\d,"+core.filID+"[^#]*(#msg-[\\d,]+)", "i");
            if (m = h.match(local)) {
              $(this).parent().find('a')
              .attr({target: '_self', 'title': msg, href: m[2]})
              .eq(1).removeClass('lien-interne').addClass('lien-page');
            }
          });
        } else if (m = h.match(vitedit)) { // corriger les liens "ancres" vers les vite-dits
          // local en ancre:  http://www.arretsurimages.net/vite-dit.php#14552
          // absolus:         http://www.arretsurimages.net/vite.php?id=14552
          this.href = 'http://www.arretsurimages.net/vite.php?id='+m[2];
        }
      });
    },
    
    vote: function() {
      var v = $('.post-gemp .vote');
      if (v.length) v = manip.idfromH2(v);
      else v = false;
      fag.showvote(v);
      $('.post-gemp .vote, .post-gemp .voter').live('click', function(){
        var v = manip.idfromH2(this);
        fag.showvote(v);
      });
      
      // function voter(el,p) { // la fonction d'ASI - on n'override pas
      //  if ($(el).attr('class')=='vote') 
      //    return;
      //  $.get("voter.php", p ,
      //    function(){
      //      $('a.vote').text('VOTER');
      //      $('a.vote').addClass('voter');
      //      $('a.voter').removeClass('vote');
      //      $(el).text('VOTÉ');
      //      $(el).removeClass('voter');
      //      $(el).addClass('vote');
      //    });
      // 
      // }

    },
    
    showvote: function(id) { // indique son vote dans la barre et le marque s'il est élu
      var vote = '<img src="/forum/templates/asi/icon/message-elu.gif" />';
      var icon = '<img src="/forum/templates/asi/icon/voter.gif" />';
      if (id) {
        var lnk = '<a href="'+core.msgID(id, true)+'">_X_</a>';
        var txt = lnk.replace('_X_', ' votre vote');
        var opc = 1;
        vote = lnk.replace('_X_', vote);
        store.write('ego:vote', id);
      } else {
        var txt = ' pas de vote';
        var opc = .7;
      }
      var html = '<span style="opacity: '+opc+'" id="yourvote">'+vote+txt+'</span>';
      if ($('#yourvote').length) $('#yourvote').replaceWith(html)
      else $('#gemp-options').append(html);
      $('#youvoted').remove();
      $('.content-elu').each(function(){
        var elu = this.id.split('_')[1];
        if (elu == id) { // marquage de son vote s'il est élu
          var com = "Vous avez voté pour ce commentaire";
          $(this).parents().closest('.elu')
          .find('h2').prepend('<span id="youvoted" title="'+com+'">'+icon+'</span> ');
        }
      });
    },

    formHeader: function(source) {
      if (!source || !$(source).attr('id')) { 
        // on réinitialise, soit parce qu'on a cliqué sur le bouton, soit on est sur l'article original
        store.removeAsi('form');
        $('div#post').find('input[name=parent_id]').attr('value', core.filID).end()
        .find('h1').text('Ajouter un commentaire général').css('color', '#333'); 
      } else {
        if (core.page == 'fil') { // on est sur le fil
          var nom = $(source).find('.message-infos a').text();
          var de = nom.match(/^[aeiouyh]/i) ? "d'" : "de ";
          var heure = $(source).find('.message-user-info .heure').text();
          var txt = "Répondre au commentaire "+de+"<b style=\"color: #000; font-size: 105%\">"+nom+"</b> écrit à "+heure;
          store.writeAsi('form', txt);
        } else { // preview
          var txt = store.read('form');
        }
        if (txt != null) {
          var empty = $('<span id="formempty">Répondre en général</span>');
          $('div#post').find('h1').css('color', '#666').html(txt).append(empty); 
          $('#formempty').live('click', function(){
            fag.formHeader(false);
          });
        }
      }
    },

    // Je pense ça ne fonctionne pas...
    formFromFixForAsi: function() { // récup des fonctions du formulaire annulées par .clone() 
      // ajouts pour éviter les posts mal placés: 
      // si on suit un lien direct  read.php?9,1111531,1198278#msg-1198278
      // au lieu de                 read.php?9,1111531#msg-1198278
      // le "parent_id" est pré-rempli, donc on le réinitialise par sécurité, sauf sur la preview:
      if ($('#post').length) fag.formHeader(!fag.$messages.length > 0);

      $('a.repondre, a.citer').click(function(e){
        e.preventDefault();
        var div = $(this).parents('div.message:first');
        var id = new RegExp('([0-9]+)#REPLY').exec($('.repondre', div).attr('href'))[1];
        fag.formHeader(div); // ajout
        $('div#post')
        .find('h1,form').css('width','auto').end()
        .find('input[name=parent_id]').attr('value',id).end()
        .remove()
        .appendTo(div)
        .width(div.width());
        var subject = $('h2:first', div).text();
        subject = (subject.match(/^Re:/) ? "" : "Re: ")+subject;
        if ($('h2:first',div).find('span.new-flag').length>0) {
          subject = subject.replace(/nouveau *$/i,"");
        }
        $('#subject').attr('value',subject);
        if ($(this).hasClass('citer')) {
          // apparemment, c'est pas moi qui fait ça... je ne peux pas y toucher
          var txtQuote = '[quote]\n'+$('.content', div).text()+'\n[/quote]';
          $('#post-body textarea').value = txtQuote;
        }
      });
    },

    eluscontexte: function() { // gestion des liens "lire en contexte" des élus
      var elus = $('.messages_vote .elu');
      for(var i = 0; i < elus.length; i++) {
        elus.eq(i).find('a').last().click(function(){
          var id = this.href.match(/msg-(\d+)/)[1];
          window.location.hash = core.msgID(id, true);
          return false;
        });
      }
    },
  } // fag end



 /* ******************************************************************************
  * AIDE: AFFICHER L'AIDE ET NAVIGUER DEDANS
  ****************************************************************************** */
  var aide = { 
    
    init: function() {
      var title = "Aide pour l'extension Forums ASI";
      var $html = $('<span id="gemp-aide" title="'+title+'">aide</span>').click(function(){
        aide.disp();
      });
      if (core.page == 'sommaire' || core.page == 'sous-sommaire') {
        $('#search-area').before($html);
      };
      $('#gemp-options').append($html);
      
      
      
      if(core.debug) { // @@@@ DEBUG
        window.localStorage.removeItem('gemp:pref:'+core.messname); // réaffiche le dernier message
        // $('#gemp-aide').click();
      }



      aide.message(core.messname, core.messheight); // second élément: height
      
      
    },
    
    message: function(page, height, re) {
      var display = store.get('gemp:pref:'+page);
      if(store.get('gemp:pref:'+page) == null || re) { // on ne l'a jamais vu ou on veut le revoir
        var icon = '<img src="'+core.exturl+'/images/icon-92.png" id="iconmess" />';
        var height = height ? ' style="height: '+height+'px"' : '';
        var $iframe = $('<iframe id="ifmess" src="'+core.exturl+'messages/'+page+'.php"'+height+' />');
        var $bouton = $('<span id="closemess" rel="'+page+'">Fermer ce message</span>').click(function(){
          var url = $(this).attr('rel');
          $('#closemess').css('color', 'transparent');
          $('#ifmess, #closemess').animate({height: 1, opacity: .2}, 500, function(){
            $('#ifmess, #closemess, #iconmess').remove();
          });
          $('#iconmess').animate({left: -100, opacity: 0}, 500);
          store.set('gemp:pref:'+page, 1); // on dit qu'on est passé
        });
        $('#top').append(icon).append($iframe).append($bouton);
      }
    },
    
    disp: function() {
      var layer = ('<iframe id="aide-frame" src="'+core.exturl+'aide/index.php" />');
      var bouton = ('<span id="closeaide">Fermer l\'aide</span>');
      layer = ('<span id="aide-main" style="margin-top: -1000px">'+bouton+layer+'</span>');
      var $layer = $('<span id="aide-over">'+layer+'</span>').click(function(){
        $('#aide-main').animate({marginTop: '640px'}, 1000);
        $('#aide-over').animate({opacity: 0}, 1000, function(){
          $('#aide-over').remove();
        });
      });
      $('body').append($layer.css({opacity: 0}));
      $('#closeaide').click(function(){
        $('#aide-over').click();
      });
      // affichage
      $('#aide-main').animate({marginTop: 0}, 700);
      $('#aide-over').animate({opacity: 1}, 500, function(){
        
      });
    },
  } // aide end



 /* ******************************************************************************
  * CYKL: LA GESTION DU CYCLE WIDGET 
  ****************************************************************************** */
  var cykl = { 

    init: function() { 
      cykl.cycle = $('<div id="fix-gemp" class="cycle" />')
        .append('<span id="ego_cycle" />')
        .append('<span id="new_cycle" />')
        .append('<span id="com_cycle" />');
      cykl.btncycle();
      cykl.cycle.wrapInner('<div id="fix-cycle-inner" />').appendTo('body');
      
      // si on veut naviguer en lineaire ou en chronologique
      core.sort = store.get('gemp:pref:sort') != null ? store.get('gemp:pref:sort') : 'linear';
      
    }, // cykl.init end

    btncycle: function() { 
      var $base = $('<span id="btn_cycle" />'); // ATTENTION ! a changé d'ID ****
      $base.html('<i><img src="http://www.arretsurimages.net/forum/templates/asi/icon/monter.gif" alt="^" /></i>');
      if (core.needrebuild) {
        $base.append('<b id="rebuild" class="n">Reconstruction</b> ').addClass('loading');
        $('#rebuild').live('click', function(){
          $('#fix-gemp').hide(); // on permet de fermer le widget si on a interrompu le script
        }); // click: Annulation...?
      }
      cykl.cycle.append($base);
    },

    comment_cycle: function(type, obj, current) {
      core.t('comcykl');
      var total = obj.length;
      var num = '#'+type+'_num';
      if (type == 'com')       var cur_color = 'rgba(204,102,0,.1)'
      else if (type == 'ego')  var cur_color = 'rgba(0,102,0,.1)'
      else if (type == 'new')  var cur_color = 'rgba(255,0,0,.1)'
      if (keyb.altdown) {
        if (--current < 0) current = total-1; // si alt est enfoncé, on recule
      } else {
        ++current;
        if (type == 'new') store.currentCheck(current); // pour indiquer le nombre éventuel de non-lus
        if (current > total) current = 0;
      }
      if (current >= total) {
        current = -1;
        anchor = 'liste-com';
        $(num).html(total); 
      } else {
        $(num).html((current+1)+'/'+total);
        var pid = obj[current].id;
        var first = $( core.divID(pid, true) ).hasClass('niveau-1');
        anchor = core.msgID(pid);
      }
      var post = $( core.divID(pid, true) );
      core.t('manips');
      $('.retour-btn').remove();
      $('.com-origine, .goto-origine, .goto-reponse, .current') // goto-reponse est le "current", sauf en niveau-1
      .removeClass('com-origine goto-origine goto-reponse, .current')
      .find('.generic').css('background-color', 'transparent');
      core.t('manips',1);

      manip.ouvrirToutes(false);


      window.location.hash = anchor; // @@@@ ?????

      if (!first && anchor != 'liste-com') {
        var origineID = post.find('.retour-com').attr('rel');
        var origine = $(core.divID(origineID, true));
        if (!keyb.capdown) { // on ne va pas sur le commentaire d'origine si capslocl est on
          origine.scrollView();
          if (core.fullTree[origineID].length > 1) { // inutile de fermer s'il n'y a q'un commentaire
            manip.fermerToutes(origineID); 
          } else {
            manip.ouvrirToutes(origineID); // pour actualiser le message du bouton
          }
          origine.find('.content').addClass('com-origine'); // sinon, ça fout la zone avec window.location.hash
        }
        
        origine.addClass('goto-origine')
        .find('.message-infos:first').append(' <b class="retour-btn" rel="'+ core.divID(pid) +'">Aller au commentaire &nbsp; </b>')
        .find('.retour-btn').click(function(){
          $('#'+ $(this).attr('rel') ).scrollView();
          $(this).remove();
          core.gotocom = 'origine';
        }).end().end()
        .find('.content')
        .find('.develop').remove().end() // @@@@ ?
        .append('<span class="develop" title="Afficher l’intégralité du commentaire"><b> + </b></span>')
        .find('.develop').click(function(){
          $(this).parent().removeClass('com-origine');
        });
        manip.ouvrirSeule(post.addClass('goto-reponse').find('h2').attr('rel'));
        core.gotocom = !keyb.capdown ? 'reponse' : 'origine';
      }
      post.addClass('current').find('.generic:first').css('background-color', cur_color); // class & couleur
      core.t('comcykl',1);
      return current;
    },

    btnego: function() { // CIRCULATION DANS LES EGO 
      cykl.currentEgo = -1;
      var $egoStr = $('<span id="ego_cycle"><b id="ego_num">'+cykl.totalEgo+'</b> <b class="n">ego</b> </span>').click(function(){
        if (!cykl.testEgo) {
          core.t('egostart');
          for (i = 0; i < cykl.totalEgo; i++) {
            a = core.egoArr[i].id; 
            $( core.divID(a, true)+' .pas-elu h2:first').before('<b class="ego-badge badge">'+(i+1)+'</b>');
          }
          cykl.testEgo = true;
          core.t('egostart', true);
        }
        $('.badge').hide();
        $('.ego-badge').show();
        cykl.currentEgo = cykl.comment_cycle('ego', core.egoArr, cykl.currentEgo);
      });
      $('#ego_cycle').replaceWith($egoStr);
    },

    btnnew: function() { // CIRCULATION DANS LES NEW 
      cykl.currentNew = -1;
      var displayNew = cykl.totalNew;
      if (store.read('nouveaux:current')) {
        cykl.currentNew = store.read('nouveaux:current')-1;
        displayNew = (cykl.currentNew+1)+'/'+displayNew; 
      } 
      var $newStr = $('<span id="new_cycle"><b id="new_num">'+displayNew+'</b> <b class="n">nouveau</b> </span>').click(function(){
        if (!cykl.testNew) {
          for (i = 0; i < cykl.totalNew; i++) {
            a = core.newArr[i].id; 
            $( core.divID(a, true)+' .pas-elu h2:first').before('<b class="new-badge badge">'+(i+1)+'</b>');
          }
          cykl.testNew = true;
        }
        $('.badge').hide();
        $('.new-badge').show();
        cykl.currentNew = cykl.comment_cycle('new', core.newArr, cykl.currentNew);
      });
      $('#new_cycle').replaceWith($newStr);
    },

    show_people_comment: function(pid) { // CIRCULATION DANS LES COMMENTATEURS 
      $('#fix-gemp').hide(); // hack
      var anchor = 'liste-com';
      var com = core.people[pid].com.slice();
      // if (sort) com.sort(core.sortByDate); // on sort si on arrive depuis la liste, pas le standard "ego" @@@@ --> SORT
      core.sortByOption(com); // le nouveau sort, selon préfs
      cykl.currentCom = -1;
      $('.com-badge').remove();
      for (i=0; i<com.length; i++) {
        $( core.divID(com[i].id, true)+' .pas-elu h2:first').before('<b class="com-badge badge">'+(i+1)+'</b>');
      }
      var $comStr = $('<span id="com_cycle"><b id="com_num">'+com.length+'</b> <b class="n">'+core.people[pid].nom+'</b> </span>').click(function(){
        cykl.currentCom = cykl.comment_cycle('com', com, cykl.currentCom);
        $('.badge').hide();
        $('.com-badge').show();
      });
      $('#com_cycle').replaceWith($comStr);
      $('#fix-gemp').show();
    },

    show_recent_comment: function(str) { // CIRCULATION DANS LES RECENTS
      $('#fix-gemp').hide(); // hack
      var anchor = 'liste-com';
      // var r = core.recentArr.sort(core.sortByDate); //.reverse(); @@@@ --> old before sortByOption
      var r = core.recentArr;
      core.sortByOption(r); // le nouveau sort, selon préfs
      cykl.currentCom = -1;
      $('.com-badge').remove();
      for (i=0; i<r.length; i++) $( core.divID(r[i].id, true)+' .pas-elu h2:first').before('<b class="com-badge badge">'+(i+1)+'</b>');
      var $comStr = $('<span id="com_cycle"><b id="com_num">'+r.length+'</b> <b class="n">Depuis '+str+'</b> </span>').click(function(){
        cykl.currentCom = cykl.comment_cycle('com', r, cykl.currentCom);
        $('.badge').hide();
        $('.com-badge').show();
      });
      $('#com_cycle').replaceWith($comStr);
      $('#fix-gemp').show();
    },

    displaybuild: function(num, total) { // sert pour Firefox
      if ($('#btn_num').length < 1) $('#btn_cycle .n').after(' <b id="btn_num"></b> ');
      $('#btn_num').text(num+':'+total);
    },

    endbuild: function() { 
      //$.each(core.people, function(k, v){ core.peopleArr.push(v); }); // on transforme l'objet en array
      //core.peopleArr.sort(core.sortByName);
      cykl.totalNew = core.newArr.length;
      cykl.totalEgo = core.egoArr.length;
      cykl.testNew = false;
      cykl.testEgo = false;

      $('#btn_cycle').removeClass('loading').mouseover(function(){
        keyb.altdown ? $(this).attr('title', 'Revenir au sommaire ('+core.version+')') : $(this).attr('title', 'Revenir en haut');
      }).click(function(){
        // si alt est enfoncé, on revient au sommaire du forum, sinon en haut de la page
        keyb.altdown ? window.location = '/forum/' : window.location.hash = 'header-menu';
      });

      if (cykl.totalEgo > 0) cykl.btnego();
      if (cykl.totalNew > 0) cykl.btnnew();
    }
  } // cycl end



 /* ******************************************************************************
  * GDB: RAPPEL DES NOUVEAUX
  ****************************************************************************** */
  var gdb = { 

    prefix: 'gemp:',

    init: function() {
      if (core.page == 'fil' || core.page == 'preview') { // normalement on est sur un fil ou la preview
        gdb.nid = core.makeQID(core.filID);

        // ne fonctionne pas?! on ne se sert pas de ce 'securite' 
        var checkSecurite = store.read('securite');
        if (checkSecurite != null) {
          // faire un truc avec checkSecurite...?
        } else {
          var securite = [];
          $(core.newclass).each(function(){
            // securite.push($(this).what?????); // ne marche pas...
          }); 
          if (securite.length > 0) store.write('securite', securite); // pas la peine d'écrire si c'est vide
        }
      }
    },

    process: function() {

      if (core.page == 'fil' || core.page == 'preview') { // sur un fil ou la preview

        $('#fix-gemp').show(); // on a pu cliquer sur "Reconstruction" pendant le chargement
        $('.fix.cycle').css('display', 'none !important'); // in case

        gdb.restorenew = store.read('nouveaux:restore'); // on regarde si on veut les anciens "nouveau"
        gdb.lastvisit = store.read('ego:time'); // on lit l'heure de la dernière visite

        if (core.page == 'fil') { // normalement on est sur le fil lui-même
          if (fag.constructed) { 
            store.remove('securite'); // on supprime gdb.securite, in case
            // on est sur le fil donc on vide nouveaux:restore qu'on a stocké plus haut: on ne fait plus ça

            if (gdb.restorenew) {
              store.mergeNew() ; // merge newArr avec store.read('nouveaux')
              store.writeAsi('nouveaux', core.newArr); // on écrit les nouveaux
            } else { // on n'a pas demandé la restauration
              store.removeAsi('nouveaux'); // on réinitialise les nouveaux
            }
            store.writeAsi('ego', core.egoArr); // on écrit les ego s'il y en a, ou juste le timestamp
          } else { // on a eu un problème, le script ne s'est pas fini
            // *--> core.log('problème gdb process: '+ fag.constructed);
          }

        } else { // on est sur la preview
          // *--> core.log('-->preview: restore? ' + gdb.restorenew);
        }
        if (core.newArr.length) {
          var $checkrestore = $(' <span id="restorenew"><input type="checkbox" /> &nbsp;Garder les "nouveau"</span> ')
          .append(' <span class="newcount" />');
          if (gdb.restorenew) $('input', $checkrestore).attr('checked', true);

          $('#post-form input[name=finish]').after($checkrestore);
          $('#gemp-options').prepend($checkrestore.clone().attr('id', 'restorenewtop'));
          store.currentCheck(); // sans paramètre
          $('#restorenew input, #restorenewtop input').live('click', function(){
            store.restorenewToggle();
          });
        }
      }
    },

  }




 /* ******************************************************************************
  * STORE: LES FONCTIONS DE STOCKAGE
  ****************************************************************************** */
  var store = {

    set: function(what, entry) { // fontcion d'écriture globale, avec erreur "full" 
      if (!gdb.full) try { 
        window.localStorage.setItem(what, entry); 
        // --> core.log('[W]' + what + '//' + entry);
      } catch(e) { store.full(e); }
    },

    get: function(what) { // fonction de lecture globale, pas de gestion d'erreur === null 
      return window.localStorage.getItem(what);
    },

    del: function(what) { // fonction de supression globale, erreur possible? 
      try {
        // --> if (!what.match(/nouveaux/)) core.log('[D]' + what + ' // ' + window.localStorage.getItem(what)); // DEBUG
        window.localStorage.removeItem(what);
      } catch(e) {  }
    },

    write: function(what, entry, id) { // fonction écriture propore à un fil: nid + what
      var id = id || gdb.nid;
      id = store.makeNID(id);
      store.set(id + what, JSON.stringify(entry)); 
    },

    writeAsi: function(what, entry, id) { // écriture avec count et timestamp
      var id = id || gdb.nid;
      id = store.makeNID(id);
      store.set(id + what +':time', temps.timestamp());
      if (entry.length > 0) store.set(id + what,  JSON.stringify(entry));
    },

    read: function(what, id) { // lecture d'un unique storeWrite
      var id = id || gdb.nid;
      id = store.makeNID(id);
      return JSON.parse(store.get(id + what));
    },

    count: function(what, id) { // le nombre d'items d'un storeWriteAsi
      var id = id || gdb.nid;
      id = store.makeNID(id);
      return store.read(what, id) ? store.read(what).length : 0;
    },

    timeDiff: function(what, id) { // l'âge en secondes d'un storeWriteAsi
      var id = id || gdb.nid;
      id = store.makeNID(id);
      return temps.timestamp() - store.get(id + what +':time');
    },

    remove: function(what, id) { // on supprime un storeWrite
      var id = id || gdb.nid;
      id = store.makeNID(id);
      store.del(id + what);
    },

    removeAsi: function(what, id) { // on supprime tout un storeWriteAsi
      var id = id || gdb.nid;
      id = store.makeNID(id);
      // --> core.log('RemoveASI: ' + what+' ('+id+')');
      store.del(id + what);
      store.del(id + what +':time');
      store.del(id + what +':current');
      store.del(id + what +':restore');
      store.del(id + what +':vote'); // pour ego:vote
    },

    full: function(e) {
      if (e == QUOTA_EXCEEDED_ERR) { 
        alert('Votre base de données est pleine! Prévenez gemp...'); 
        gdb.full = true;
      }
    },

    mergeNew: function() { 
      // NB: si on fait un SORT, on ne peut plus savoir lesquels sont lus ou pas
      if (store.read('nouveaux')) {
        if (core.newArr.length > 0) {
          core.newArr = store.read('nouveaux').concat(core.newArr);
        } else {
          core.newArr = store.read('nouveaux');
        }
      }
    },
    
    removeNew: function(id) {
      var id = id || gdb.nid;
      // ---> core.log('>>> Effacement: '+id);
      store.removeAsi('nouveaux');
    },

    restorenewToggle: function() { 
      var current = store.read('nouveaux:current') || 0; // @@@@
      if (store.read('nouveaux:restore')) { // on a des "nouveau" stockés
        store.removeNew(); // était : store.removeConfirm(current); mais trop compliqué
        $('#restorenew input, #restorenewtop input').attr('checked', false);
      } else { // on n'a pas de nouveaux stockés
        store.writeAsi('nouveaux', core.newArr); // on écrit les nouveaux
        store.write('nouveaux:restore', core.newArr.length);
        store.write('nouveaux:current', cykl.currentNew+1);
        $('#restorenew input, #restorenewtop input').attr('checked', true);
      }
    },
    
    // NE SERT PLUS
    removeConfirm: function(current, id) { // message d'alerte éventuel *** NE SERT PLUS
      var id = id || gdb.nid;
      if (current && current >= 0 && current < gdb.restorenew) { // on avait des non-lus dans les gardés
        var c = gdb.restorenew - current;
        var s = c > 1 ? 's' : '';
        var v = c > 1 ? 'sont' : 'est';
        var p1 = c+' commentaire'+s+' conservé'+s+' '+v+' peut-être non-lu'+s+'.';
        var p2 = '<br>Voulez-vous vraiment effacer ?';
        jConfirm(p1+p2, "Confirmation", function(answer) {
          if (answer) {
            store.removeNew();
          } else {
            if (id == gdb.nid) { // on est sur le fil
              $('#restorenew input, #restorenewtop input').attr('checked', 'checked'); // on recoche
            }
          }
        });
      } else {
        store.removeNew();
      }
    },
    
    currentCheck: function(current) { 
      // pour vérifier si tous les new on été cliqués et ramener sur le bon
      var cur = store.read('nouveaux:current') || 0;
      var total = core.newArr.length;   // était store.count('nouveaux') mais on ne les stocke plus automatiquement
      if (current != null && cur < total && cur == current) { // si on a indiqué "current": on utilise la fonction à l'arrivée
        store.write('nouveaux:current', ++cur);
      }
      if (cur >= total) {
        $('#restorenew .newcount').html('');
        $('#restorenewtop').attr('title', 'apparemment tous lus');
      } else {
        var plur = total-cur > 1 ? 's' : '';
        var txt = 'peut-être '+(total-cur)+' non lu'+plur;
        $('#restorenew .newcount').html(' ('+txt+')');
        $('#restorenewtop').attr('title', txt);
      }
    },

    cleanup: function() {
      var now = temps.timestamp();
      var sho = temps.jour; // day
      var med = temps.semaine; // week
      var lon = temps.annee; // very late

      // --> core.log('cleanup?');
      
      store.cleanupdb(); // à déplacer ?

      var log = window.localStorage.length;
      for(var i = 0; i < log; i++) {
        if (localStorage.key(i) == null) break; // parce qu'on détruit des paquets
        var key = localStorage.key(i);
        if (key != null && key.match(/^gemp/)) {
          var k = key.split(':'); // k[0] == gemp
          if (k[3] == 'time') {
            var delay = now - window.localStorage.getItem(key);
            if (k[2] ==  'ego' && delay > lon) {
              ////////////////// store.removeAsi('ego', k[1]); // NE PAS VIRER, trop dangereux
            }
            if (k[2] ==  'nouveaux' && delay > med) { // ---> passer en sho ?
              store.removeAsi('nouveaux', k[1]); 
            }
            if (k[2] ==  'form' && delay > sho) {
              store.removeAsi('form', k[1]); 
            }
          }
        } else { // on a une merde
          // --> core.log('problème db: '+key);
        }
      }
    },

    cleanupdb: function() { // MAJOR CLEANUP
      if (store.get('gemp:cleanup2011') == null) {
        //localStorage.clear(); --------------> faire une alerte ou regarder pourquoi je faisais ça ?
        //store.set('gemp:cleanup2011', 1);
      }
      if(core.debug) window.localStorage.removeItem('gemp:cleanup2012'); // @@@@ DEBUG
      if (store.get('gemp:cleanup2012') == null) {
        var log = localStorage.length;
        for(var i = 0; i < log; i++) {
          var key = localStorage.key(i);
          if (key != null && key.match(/^gemp/)) {
            var k = key.split(':'); // k[0] == gemp
            if(k[2] != 'ego' && !k[1].match(/(^cleanup|^pref)/)) { //  on ne garde que ceux-là
              store.del(key);
            }
            if(k[3] == 'sort') { // normalement, c'est k[2]: gemp:pref:sort
              store.del(key); // juste pour ma base perso
            }
          } else { // on vire tout le reste
            store.del(key);
          }
        }
        store.set('gemp:cleanup2012', 1);
      }
    },

    makeNID: function(id){
      return gdb.prefix + id + ':';
    },

    /* documentation
    unique in array: http://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript
    webstorage: http://sixrevisions.com/html/introduction-web-storage/
    tuto: http://www.diveintojavascript.com/tutorials/web-storage-tutorial-creating-an-address-book-application 
    + link: http://www.diveintojavascript.com/javascript-apis/web-storage-dom-storage

    git add -u: http://stackoverflow.com/questions/572549/difference-of-git-add-a-and-git-add
    */
  } //  store end



 /* ******************************************************************************
  * TAGS: LE TAGUAGE DES CONTRIBUTEURS
  ****************************************************************************** */
  var tags = {
    
    init: function() {
      
    },




  } // tags end



 /* ******************************************************************************
  * FAGLIST: LES FONCTIONS COMPLÉMENTAIRES
  ****************************************************************************** */
  var faglist = {

    init: function() {
      var header = $('#phorum').find('.header-first-post:first');
      var com_num = core.fullArr.length;
      var plur = com_num > 1 ? 's' : '';
      var detail = '  • <a onclick="return false" style="font-size: 12px">détail</a>';

      header.html(com_num+' commentaire'+plur+' de '+core.peopleArr.length+' personne'+plur+detail)
      .css('cursor', 'pointer').css('color', '#000')
      .click(function(){
        if ( $('#commentateurs').html().length <= 1) {
          var increment = 0
          var html =  '<table id="all_com">';
          var table = [];
          table.push(faglist.faire_ligne('', 'nom', 'premier', 'dernier', true)); // header
          $.each(core.peopleArr, function(key, pid){
            var v = core.people[pid];
            v.com.sort(core.sortByDate); 
            var c = v.com.length;
            var p = v.com[0]; // le premier commentaire
            var d = v.com[c-1]; // le dernier commentaire
            table.push(faglist.faire_ligne(
              c, 
              '<a href="'+pid+'">'+v.nom+'</a>', 
              '<a href="'+core.msgID(p.id, true)+'">'+ p.heure +' - '+ p.date +'</a>', 
              '<a href="'+core.msgID(d.id, true)+'">'+ d.heure +' - '+ d.date +'</a>', 
              false
            ));
          });

          html += table.join("\n"); //.replace(/\d+§/, '');
          html += '</tr></table>'
          $('#commentateurs').html(html).css('margin-bottom', '16px');
          $('#all_com, #all_com a').css('font-size', '12px')
          .find('th').css({ fontWeight: 'bold', cursor: 'pointer', color: '#a4d658' }).end()
          .find('tr').css({
            marginBottom: '1px'
          }).find('.cnom a').click(function(e){
            e.preventDefault();
            cykl.show_people_comment( $(this).attr('href') );
            $(this).text = $(this).attr('href');
            return false;
          }).end()
          .find('.cnum').css({
            width: '30px',
            paddingRight: '6px',
            fontWeight: 'bold',
            color: '#fff',
            borderBottom: '1px solid #fff',
            backgroundColor: '#a4d658',
            textAlign: 'right'
          }).end().find('.cnom, .cprem, .cdern, .cplus').css({
            paddingLeft: '20px'
          }).end().end().tablesorter({ 
            dateFormat: 'uk',
            sortList: [[1,0]],
            headers: {  
              1: { sorter: 'linked-names'},
              2: { sorter: 'custom-date'},
              3: { sorter: 'custom-date'}
            }
          });

          faglist.sortchoice();
          faglist.recent();

        } else {
          $('#commentateurs').toggle();
        }
      }).after('<a name="liste-com"></a>');

      faglist.sorter();

      $('#all_com .cprem a, #all_com .cdern a').live({
        mouseenter: function() {
          var tmp = $(this).text().split('-');
          $(this).data('rel', {html: $(this).html()} );
          var inter = $.easydate.format_date( temps.transformDate( tmp[0], tmp[1] )[3] );
          $(this).html( inter );
        },
        mouseleave: function() {
          var restore = $(this).data('rel').html;
          $(this).html( restore );
        }
      });
    },

    sortchoice: function() {
      var sort = core.sort == 'linear' ? 0 : 1;
      var titre = "<b>Choix de l'ordre de navigation :</b> ";
      var line  = ' &nbsp; <input type="radio" name="choice" value="linear" /> Linéaire ';
      var chro  = ' &nbsp; <input type="radio" name="choice" value="chrono" /> Chronologique ';
      var choice = $('<span id="sortchoice">'+titre+line+chro+'</span>');
      choice.find('input:nth('+sort+')').attr('checked', true);
      choice.find('input').change(function(){
        var val = $('input:checked').val();
        store.set('gemp:pref:sort', val);
        core.sort = val;
      });
      
      $('#commentateurs').prepend( choice ); // on ajoute l'objet
    },

    recent: function() { // NOUVEAU: commentaires après une certaine date 
      var now = temps.timestamp();
      core.recentdata = {j: 0, h: 0, m: 0};
      core.sortedFullArr = core.fullArr.slice(); // duplication par slice() sans paramètre
      core.sortedFullArr.sort(core.sortByDate).reverse(); //.shift(); // on n'a plus besoin, on ne stocke plus le 1er

      if (gdb.lastvisit != null && now - gdb.lastvisit < temps.asistart) { // pas plus de 99 jours
        var lasttxt = "• votre dernière visite à " + temps.makeDate(gdb.lastvisit);
      } else {
        var lasttxt = "depuis une journée à " + temps.makeDate(now - temps.jour);
      }
      if (core.egoArr.length > 0) { // j'ai commenté, depuis le dernier commentaire?
        var com = core.people[core.egoPID]['com']; // on ne prend pas core.egoArr qui est trié par "order"
        var com = com.sort(core.sortByDate).reverse()[0];
        var lastcomtxt = '• votre dernier commentaire à '+ temps.makeDate(com.tSort);
      } else {
        var lastcomtxt = '&nbsp;';
      }
      var choix  = $('<span class="comchoix">0</span>'); // la case d'affichage des nombres
      var plus   = $('<span class="complus combouton"><b>+</b></span>'); // le bouton plus
      var moins  = $('<span class="commoins combouton"><b>–</b></span>'); // le bouton moins
      var select = $('<span class="comselect">').append(choix).append(plus).append(moins); // un sélecteur complet
      var selectJour   = select.clone().addClass('comjour').after('<b class="j"> jours </b>');
      var selectHeure  = select.clone().addClass('comheure').after('<b class="n">h </b>');
      var selectMinute = select.clone().addClass('comminute').after('<b class="n">min </b>');
      var selectwrap = $('<span class="selectwrap" />') // on wrappe...
      .append(selectJour).append(selectHeure).append(selectMinute); // ... avec toutes les cases

      var touscom   = '<h4 id="touscom" class="actif">Rechercher les commentaires depuis...</h4>';
      var tousliens = ''; // '<h4 id="tousliens">Tous les liens</h4>'; -----------------------------> à faire TODO
      var header = $('<span id="comheader" />')
      .append('<div>'+touscom+' &nbsp; '+tousliens+'</div>')
      .append('<span id="comlastvisit">'+lasttxt+'</span>')
      .append('<br><span id="comlastcomment">'+lastcomtxt+'</span>') // depuis son dernier commentaire
      .append(selectwrap)
      .append('<span id="comcommentsnum">&nbsp;</span>')

      var combefore = $('<span id="combefore" />')
      .append(header)
      .append('<span id="comcomments" />').append('<span style="clear:both" />')
      .wrapInner('<span class="wrap" />');

      $('#combefore .combouton').live('click', function() { // la fonction des boutons
        function pad(n) {return n<10 ? '0'+n : n} // in case
        var select = $(this).closest('.comselect'); // le sélecteur qui contient le
        var type = select.hasClass('comjour') ? 'j' : select.hasClass('comheure') ? 'h' : 'm'; // son type
        var max = type == 'j' ? Math.round(temps.asistart / temps.jour) : type == 'h' ? 23 : 55; // les valeurs maxi
        var choix = select.find('.comchoix'); // la case des chiffre...
        var num = parseInt(choix.text()); // ... et sa valeur
        var time = core.recentdata; // on récupère les infos globales
        var x = type == 'm' ? 5 : 1; // on incrémente de 5 min, le reste à l'unité
        if (keyb.altdown && type == 'j') x = 7; // par semaines avec alt appuyé
        var val = $(this).hasClass('complus') ? num+x : num-x; // on ajoute ou on retranche, selon le bouton cliqué
        val = val < 0 ? max : val > max ? 0 : val; // on vérifie les maximums
        choix.text(val); // on renseigne la case
        time[type] = val; // on update l'info dans l'objet "time"...
        core.recentdata = time; // ... qu'on met à jour dans le container global
        faglist.recentcheck(); // on affiche des résultats
      });
      $('#comlastvisit, #comlastcomment').live('click', function() {
        var str = $(this).text();
        var ts = temps.timestamp() - temps.transformDate(str)[0];
        var j = Math.floor(ts / temps.jour);
        var r = ts % temps.jour;
        var h = Math.floor(r / temps.heure);
        r = r % temps.heure;
        var m = Math.round(r / temps.minute);
        $('#combefore')
        .find('.comjour .comchoix').text(j).end()
        .find('.comheure .comchoix').text(h).end()
        .find('.comminute .comchoix').text(m);
        core.recentdata = {j: j, h: h, m: m};
        faglist.recentcheck(); // on affiche des résultats
      });

      $('#commentateurs').prepend( combefore ); // on ajoute l'objet
      // on force sa taille à celle du tableau des commentateurs
      var maxheight = $('#all_com').height() - $('#comheader').height() - 60; 
      if (maxheight > 80) $('#comcomments').css('max-height', maxheight+'px');
    },

    recentcheck: function() { // la fonction d'affichage de la liste
      core.recentArr = [];
      var w = temps.timestamp();
      var time = core.recentdata;
      var j = time.j * temps.jour;
      var h = time.h * temps.heure;
      var m = time.m * temps.minute;
      var t = w - (j+h+m);
      var n = 0; // le nombe de commentaires
      var e = 0; // le nombre de ses commentaires
      var table = '';
      for(var i = 0; i < core.sortedFullArr.length; i++) {
        var c = core.sortedFullArr[i];
        if (c.tSort > t) {
          n++;
          var self = '';
          var nom = core.people[c.pid]['nom']
          if (c.pid == core.egoPID) {
            self = ' class="self"';
            e++;
          }
          core.recentArr.push(c);
          table += '<tr'+self+'><td class="nom">'+nom+'</td>';
          table += '<td><a href="'+core.msgID(c.id, true)+'">'+c.heure+' – '+c.date+'</a></td>';
        }
      }
      var s = n > 1 ? 's' : ''; // le pluriel
      var quand = t < w-temps.asistart+temps.jour ? "les débuts d'ASI" : temps.makeDate(t);
      var result = '<span id="comresult">' + n + ' commentaire'+s+' depuis <b>'+ quand +'</b></span>';
      $('#comcommentsnum').html(result); 
      if (e > 0) $('#comcommentsnum').append(' ('+e+' des vôtres)')
      $('#comcomments').html('<table>'+table+'</table>');
      $('#comresult').click(function() {
        cykl.show_recent_comment( $(this).find('b').text() );
      });
    },


    sorter: function() { // réglages de tablesorter 
      $.tablesorter.addParser({ 
        id: 'linked-names', // set a unique id 
        is: function(s) {
          return false; // return false so this parser is not auto detected 
        },
        format: function(s) {
          return s.replace(new RegExp(/<.*?>/),'').toLowerCase(); // format your data for normalization
        },
        type: 'text'  // set type, either numeric or text
      }); 
      $.tablesorter.addParser({
        id: 'custom-date',
        is: function(s) {
          return s.match(new RegExp(/(\d+)/));
        },
        format: function(s) {
          s = s.replace(/[^\d]+/g, ' ').split(' ');
          return $.tablesorter.formatFloat(new Date(s[4], s[3]-1, s[2], s[0], s[1], 0).getTime());
        },
        type: 'numeric'
      });
    },

    ligne: '<tr><td class="cnum">_C_</td><td class="cnom">_N_</td><td class="cprem">_P_</td><td class="cdern_O_">_D_</td></tr>',

    faire_ligne: function(count, nom, first, last, ishead) {
      var ligne = faglist.ligne;
      var onlyone = first == last ? ' only-one' : '';
      if (ishead) ligne = '<thead>'+ ligne.replace(/td/g, 'th') +'</thead>';
      ligne = ligne.replace('_C_', count);
      ligne = ligne.replace('_N_', nom);
      ligne = ligne.replace('_P_', first);
      ligne = ligne.replace('_O_', onlyone);
      ligne = ligne.replace('_D_', last);
      return ligne;
    },
    
  }



 /* ******************************************************************************
  * SOMMAIRE: LA GESTION DU SOMMAIRE
  ****************************************************************************** */
  var sommaire = { 

    init: function() { 

      store.cleanup(); // regular cleanup ----------------------------------------------------------> à réactiver

      var newtest = false; // une variable pour voir si on ajoute une petite aide en haut
      $('#phorum table.list tr').each(function(){
        // on supprime la virgule dans le total
        var total = $(this).find('.total').text();
        if(total) {
          total = parseInt(total.replace(',', ''));
          $(this).find('.total').text(total);
        }
        if ($(this).find('div').hasClass('new')) { // nombre de nouveaux
          var nbrnew;
          var nbrsize = 'one';
          $(this).find('.new').each(function(intI,objNode ){
            var objChildNode = objNode.firstChild;
            while (objChildNode) {
              if (objChildNode.nodeType === 8) { // Check to see if this node is a comment
                nbrnew = parseInt(objChildNode.nodeValue.replace(/[^\d]+/g, ''));
              }
              objChildNode = objChildNode.nextSibling;
            }
          });
          if (nbrnew == undefined) nbrnew = '+';
          else nbrsize = nbrnew > 99 ? 'three' : nbrnew > 9 ? 'two' : 'one';
          $(this).addClass('with-new').find('.total')
            .append('<span class="new-badge-sommaire '+nbrsize+'-size">'+nbrnew+'</span>')
        }
        // egotrip et easydate
        var id = $(this).find('.col-titre h1 a');
        if (id.attr('href')) {
          var dernier = $(this).find('.dernier');
          var comdate = $('<span class="easydate">'+temps.recupereDate(dernier)[3]+'</span><br>');
          dernier
            .prepend(comdate)
            .prepend('<b>commentaire</b><br>');

          id = id.attr('href').split('?')[1];
          var egotime = store.read('ego:time', id);
          var egovote = store.read('ego:vote', id);
          if (egotime != null) {
            var egonum = store.read('ego', id);
            if (egonum && egonum.length > 0) { // badge
              var nbrego = egonum.length;
              var nbrsize = nbrego > 99 ? 'three' : nbrego > 9 ? 'two' : 'one';
              $(this).addClass('with-ego').find('.total')
                .append('<span class="ego-badge-sommaire '+nbrsize+'-size">'+nbrego+'</span>')
            }
            
            // dernière visite
            // var vote = egovote ? '<img src="/forum/templates/asi/icon/voter.gif" class="visitevote" />' :  '';
            var vote = egovote ? '<img src="/forum/templates/asi/icon/message-elu.gif" class="visitevote" />' :  '';
            var lastdate = '<span class="easydate" title="'+ new Date(egotime*1000) + '"></span>';
            dernier.append('<br/><br/><span class="visite"><b>visite</b> '+vote+'<br/>'+lastdate+'</span>');
          }
          var newget = store.read('nouveaux', id); // commentaires gardés
          if (newget && newget.length > 0) { // s'il y en a
            newtest = true;
            var newnbr  = newget.length; // leur nombre
            var plur1 = newnbr > 1 ? 's' : '';
            var newtext = newnbr+" commentaire"+plur1+" gardé"+plur1+" \n";
            var newread = store.read('nouveaux:current', id); 
            var newunread = newnbr-newread;
            var plur2 = newunread > 1 ? 's' : '';
            var newleft = newread < newnbr ? "Peut-être "+newunread+" non-lu"+plur2 : "Tous lus";
            var opacity = newread < newnbr ? '' : ' style="opacity: .4"'; // "+" translucide si on a tout lu
            var newhelp = "\nCliquez pour les effacer"
            $(this).find('.total') // 
            .prepend('<span class="keep-badge-sommaire" rel="'+id+'" title="'+newtext+newleft+newhelp+'"'+opacity+'>+</span>')
            .find($('.keep-badge-sommaire')).click(function(){ // suppression des gardés si on clique sur le +
              var id = $(this).attr('rel');
              store.removeAsi('nouveaux', id); // on supprime le storage
              $(this).animate({opacity: 0},'2000', function(){
                $(this).remove(); // on supprime le plus
                if (!$('.keep-badge-sommaire').length) $('.keep-badge-aide').remove(); // si y'en a pu on supprime l'aide
              });
            });
          }
        }
        $('.dernier .easydate').easydate();
      });
      if ((core.page == 'sommaire' || core.page == 'sous-sommaire') && $('.keep-badge-sommaire').length) {
        $('a.icon-feed').text('Flux RSS')
        .after('<span class="keep-badge-aide"><b>+</b> indique des commentaires gardés</span>');
      }
      aide.init();
      
    },
  }



 /* ******************************************************************************
  * KEYB: GESTION DES TOUCHES ALT, MAJ ET DES FLÈCHES
  ****************************************************************************** */
  var keyb = { 

    init: function() { 

      keyb.editing  = false;
      keyb.altdown  = false;
      keyb.capdown  = false;
      keyb.cmddown  = false;
      keyb.ctrldown = false;

      $(document).keydown(function(event){ 
        // http://www.webonweboff.com/tips/js/event_key_codes.aspx
        switch(event.keyCode) {
          case 17: // ctrl
            keyb.ctrldown = true;
            break;
          case 91: // cmd
            keyb.cmddown = true;
            break;
          case 18: // alt
            keyb.altdown = true;
            $('#btn_cycle').addClass('back-to-forum');
            break;
          case 20: // capslock
            keyb.capdown = true;
            break;
          case 37: // left arrow
            keyb.altdown = true;
            if (!keyb.editing && !keyb.cmddown && !keyb.ctrldown) $('#new_cycle').click();
            keyb.altdown = false;
            break;
          case 39: // right arrow
            if (!keyb.editing && !keyb.cmddown && !keyb.ctrldown) $('#new_cycle').click();
            break;
        }
      });
      $(document).keyup(function(event){
        switch(event.keyCode) {
          case 17: // ctrl
            keyb.ctrldown = false;
            break;
          case 91: // cmd
            keyb.cmddown = false;
            break;
          case 18:
            keyb.altdown = false;
            $('#btn_cycle').removeClass('back-to-forum');
            break;
          case 20:
            keyb.capdown = false;
            break;
        }
      });
      // Pour ne pas causer de problèmes avec la navigation par flèche
      // VERSION FF !
      $('#post input, #post textarea, #header-search-form input').live('focus', function(){
        keyb.editing = true;
      }).live('blur', function(){
        keyb.editing = false;
      });
    } // keyb.init end

  } // keyb end



 /* ******************************************************************************
  * FONCTIONS DIVERSES
  ****************************************************************************** */
  $.fn.scrollView = function() { 
   return this.each(function() {
     $('html, body').animate({
       scrollTop: $(this).offset().top
     }, 0);
   });
  }

  $.fn.parser = function() { // conditional JSON parser 
     return typeof this == 'string' ? JSON.parse(this) : this;
  }
  

  var manip = {
    
    idfromH2: function(it) {
      return $(it).parents('.post-gemp:first').find('h2').attr('rel');
    },

    fermerToutes: function(id) { 
      if (!id) {
        var divAll = $('.reponse-ouverte, .reponse-ouvrirtoutes');
      } else {
        var sep    = ','+core.divID('', true);
        var divAll = $(core.divID(id, true) + sep + core.fullTree[id].join(sep));
        var z = divAll.length -1;
        var txt = z > 1 ? 'Ouvrir les '+z+' réponses' : 'Ouvrir la réponse';
        $(core.divID(id, true)).find('.ouvrir:first').text(txt);
      }
      divAll
      .removeClass('reponse-ouverte reponse-ouvrirtoutes')
      .addClass('reponse-fermee')
      .eq(0)
      .removeClass('reponse-ouverte reponse-fermee')
      .addClass('reponse-ouvrirtoutes');
    },

    ouvrirToutes: function(id) { 
      if (!id) {
        var divAll = $('.reponse-fermee, .reponse-ouvrirtoutes');
      } else {
        var sep    = ','+core.divID('', true);
        var divAll = $(core.divID(id, true) + sep + core.fullTree[id].join(sep));
        var z = divAll.length -1;
        var txt = z > 1 ? 'Fermer les '+z+' réponses' : 'Fermer la réponse';
        $(core.divID(id, true)).find('.fermer:first').text(txt);
      }
      divAll
      .removeClass('reponse-fermee reponse-ouvrirtoutes')
      .addClass('reponse-ouverte')
      .eq(0)
      .removeClass('reponse-ouvrirtoutes reponse-fermee')
      .addClass('reponse-ouverte');
    },

    ouvrirSeule: function(id) { 
      var o = id; //this.find('h2').attr('rel');
      var divID = core.divID(o, true);
      var z = core.fullTree[o].length;
      var ouvr = z > 1 ? 'Ouvrir les '+z+' réponses' : 'Ouvrir la réponse';
      var ferm = z > 1 ? 'Fermer les '+z+' réponses' : 'Fermer la réponse';
      $(divID).find('.ouvrir:first').text(ouvr)
      $(divID).find('.fermer:first').text(ferm);
      $(divID) //.find('.message:first')
      .removeClass('reponse-fermee')
      .addClass('reponse-ouvrirtoutes');
    },
  
  }




 /* ******************************************************************************
  * TEMPS: FONCTIONS TEMPORELLES
  ****************************************************************************** */
  var temps = {

    minute:   60,
    heure:    3600,
    jour:     86400,
    semaine:  604800,
    mois:     2629744,
    annee:    31556926,
    maxjours: 8553600, // 99 jours

    timestamp: function() { // unix timestamp 
      var date = new Date();
      return parseInt(date.getTime()/1000); // secondes
    },

    makeDate: function(timestamp) { // faire une date à partir d'un timestamp
      function pad(n) {return n<10 ? '0'+n : n}  
      var t = timestamp || temps.timestamp();
      var n = new Date();
      var d = new Date(t*1000);
      var str = pad(d.getHours())+':'  
            + pad(d.getMinutes()) + ' le '
            + pad(d.getDate()) + '/'
            + pad(d.getMonth()+1) + '/'  
            + d.getFullYear();
      return str;
    },

    recupereDate: function(from) { // prend une date du site HH:MM DD/MM/YYYY et retourne ses valeurs
      var heure  = from.find('.heure').text();
      var date   = from.find('.date').text();
      return temps.transformDate(heure, date);
    },

    transformDate: function(heure, date) {
      if (heure.length) {
        var datestr = ':'+date || '';
        t = (heure+datestr).match(/(\d+)/g);
        datetime = new Date(t[4],t[3]-1,t[2],t[0],t[1],0,0); // date js
        ts = datetime.getTime()/1000; // timestamp pour faciliter le tri
        return [ts, date, heure, datetime]; // timestamp, date, heure, format Date()
      }
    },

  }



 /* ******************************************************************************
  * TIMER
  ****************************************************************************** */
  var timer = {
    totalTime: 0,
    startTime: 0,
    stopTime:  0,

    start: function(){
      var t = new Date();
      this.startTime = t.getTime();
    },

    stop: function(){
      var t = new Date();
      this.stopTime = t.getTime();
      this.totalTime = (this.stopTime - this.startTime)/1000;
    },

    formatTime: function() {
      var t = Math.round(timer.totalTime);
      var txt = t > 1 ? t + ' secondes' : t > 0 ? t + ' seconde' : "moins d'une seconde";
      return txt;
    }
  }



  fag.init(); // On commence...

});