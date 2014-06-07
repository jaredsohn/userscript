// ==UserScript==
// @name        VoF Forum Anonymizer
// @namespace   DScript
// @description Consume a topic objectively by masking sender names
// @include     http://www.vof.se/forum/viewtopic.php*
// @include     http://www.vof.se/forum/posting.php*
// @require     http://code.jquery.com/jquery.min.js
// @require     http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @version     3
// ==/UserScript==

Array.prototype.deterministicShuffle=function(seed){
    var temp,j;

    for(var i=0; i<this.length; i++){
        // Select a "random" position.
        j = (seed % (i+1) + i) % this.length;

        // Swap the current element with the "random" one.
        temp=this[i];
        this[i]=this[j];
        this[j]=temp;

    }

    return this;
}

var settings = {

   init: function () {
      GM_registerMenuCommand('Anonymiseringsinställningar', function() { console.log(typeof GM_config); GM_config.open(); });

      GM_addStyle('#GM_config { width: 500px !important; height: 160px !important; }');

      var styles = [
         '#GM_config_header { margin-bottom: 10px important; }',
         '#GM_config_field_Aliases { width: 485px; }'
      ];

      GM_config.init('Anonymiseringsinställningar', styles.join(''), {
          'Aliases': {
             label: 'Alias <span style="font-weight: normal !important;">(kommaseparerad lista, därefter "User #1, #2...")</span>', 
             type: 'text', 
             default: "Adam, Adrian, Agnes, Albin, Alex, Alexander, Alfred, Ali, Alice, Alicia, Alma, Alva, Alvin, Amanda, Anna, Annie, Anton, Aron, Arvid, Astrid, August, Axel, Benjamin, Carl, Casper, Charlie, Colin, Cornelia, Daniel, David, Ebba, Ebbe, Eddie, Edith, Edith, Edvin, Edward, Elias, Elin, Elina, Elis, Elise, Ella, Ellen, Ellie, Elliot, Elsa, Elton, Elvin, Elvira, Emelie, Emil, Emilia, Emma, Emmy, Erik, Ester, Evelina, Felicia, Felix, Filip, Filippa, Frank, Freja, Frida, Gabriel, Greta, Gustav, Hampus, Hanna, Hannes, Harry, Hedda, Hedvig, Henry, Hilda, Hjalmar, Hugo, Ida, Ines, Ines, Ines, Ines, Ingrid, Iris, Isabella, Isabelle, Isak, Ivar, Jack, Jacob, Jasmine, Joel, John, Joline, Joline, Jonathan, Josef, Josefin, Julia, Julian, Juni, Kevin, Klara, Leah, Leah, Leia, Leo, Leon, Levi, Liam, Lilly, Lina, Linn, Linnea, Linus, Lisa, Liv, Livia, Livia, Loke, Lova, Love, Lovisa, Lucas, Ludvig, Lykke, Maja, Majken, Malte, Maria, Matilda, Matteo, Matteo, Max, Maximilian, Meja, Melissa, Melker, Melvin, Milo, Milo, Milton, Minna, Mio, Mira, Moa, Mohamed, Molly, My, Märta, Namn, Nathalie, Nellie, Neo, Nils, Noah, Noel, Nora, Nova, Novalie, Oliver, Olivia, Olle, Oscar, Otto, Rasmus, Ronja, Rut, Saga, Sam, Sam, Samuel, Sara, Sebastian, Selma, Sigge, Signe, Sigrid, Simon, Siri, Sixten, Sofia, Sofie, Stella, Stina, Svante, Svea, Tage, Thea, Theo, Theodor, Tilda, Tilde, Tim, Tindra, Tove, Tuva, Tyra, Valter, Vera, Vidar, Viggo, Viktor, Viktoria, Vilda, Vilgot, Ville, Vincent, Wilhelm, William, Wilma, Wilmer"
          }
      });

   },

   saveTopic: function () {
      var t = forumAnonymizer[forumAnonymizer.getSkin()].getTopicId();
      GM_setValue('topic:'+t, JSON.stringify({ names: users.names, timestamp: new Date().getTime() }));

      settings.clearOldTopics();
   },

   loadTopic: function () {
      var t = forumAnonymizer[forumAnonymizer.getSkin()].getTopicId();
      var obj = JSON.parse(GM_getValue('topic:'+t, '{}'));

      if('names' in obj) {
         users.names = obj.names;
      }

      users.aliases = settings.aliases().deterministicShuffle(t);
   },

   clearOldTopics: function () {
      GM_listValues().forEach(function(v) {
         if(v.indexOf('topic:') == 0) {
            var t = JSON.parse(GM_getValue(v, '{}'));
            var y = new Date();
            y.setDate(y.getDate()-1);

            if(y > t.timestamp) {
               GM_deleteValue(v);
            }
         }
      });
   },

   enabled: function() {
      if(arguments.length == 0)
         return GM_getValue('enabled', true);

      var on = !!arguments[0];
      GM_setValue('enabled', on);
   },

   aliases: function() {
      return GM_config.get('Aliases').split(',').map(function(v) { return v.trim(); });
   }

};

var users = {

   names: [ ],
   aliases: [ ],
   
   anonymize: function(name) {
      name = name.trim();
      var ix = users.names.indexOf(name);
      if(ix == -1) {
         users.names.push(name);
         ix = users.names.length-1;
      }
      return users.getAliasForNum(ix+1);
   },

   getAliasForNum: function(num) {
      if(users.aliases.length >= num)
         return users.aliases[num-1];

      return 'User&nbsp;#'+ (num-users.aliases.length);
   },

   deanonymize: function(name) {
      var num = users.aliases.indexOf(name);
      if(num == -1) {
         num = parseInt(name.substring(6), 10) + users.aliases.length - 1;
      }
      return users.names[num];
   },

   isSelf: function(name) {
      var logoutText = $('a[href^="./ucp.php?mode=logout"]').text().trim();
      return logoutText == 'Logga ut [ ' + name.trim() + ' ]';
   }

};

var forumAnonymizer = {

   getSkin: function() {
      return $('link[rel=stylesheet]').attr('href').indexOf('subsilver2') >= 0 ? 'subsilver' : 'prosilver';
   },

   init: function() {

      settings.init();
      settings.loadTopic();

      if(settings.enabled()) {
         forumAnonymizer[forumAnonymizer.getSkin()].anonymizePage();
      }

      $('form[name=postform], #postform').submit(function() {
          forumAnonymizer[forumAnonymizer.getSkin()].deanonymizeInput(true);
      });

      $(document).on('click', '.deanon-quote', forumAnonymizer[forumAnonymizer.getSkin()].deanonymizeQuote);
      settings.saveTopic();

      forumAnonymizer.appendToggle();
   },

   appendToggle: function() {
      var on = settings.enabled();
      var div = $('<div />', { 'class': 'anon-toggle' })
         .append(
            $('<a />', { text: on ? 'Anonymisering: PÅ' : 'Anonymisering: AV', href: 'javascript:void(0);' }).click(function() {
               var on = !settings.enabled();
               settings.enabled(on);
               $(this).text(on ? 'Anonymisering: PÅ' : 'Anonymisering: AV');
               forumAnonymizer[forumAnonymizer.getSkin()][on ? 'anonymizePage' : 'deanonymizePage']();
            })
         )
         .css({
            padding: 5,
            border: '1px solid black',
            'border-width': '0 0 1px 1px',
            'background-color': 'white',
            '-webkit-border-bottom-left-radius': 5,
            '-moz-border-radius-bottomleft': 5,
            'border-bottom-left-radius': 5,
            position: 'fixed',
            right: 0,
            top: 0,
            'z-index': 100
         })
         .appendTo('body');
   },

   anonymizeQuote: function() {
      var name = $(this).text();
      name = name.substring(0, name.length-7);

      if(users.isSelf(name)) return;
      $(this).html('<span class="anon">' + users.anonymize(name) + '</span> <a href="javascript:void(0);" class="deanon-quote">[avanonymisera]</a> skrev:');
   }

};

forumAnonymizer.subsilver = {

   getTopicId: function() {
      return $('#pageheader a').attr('href').match(/[&?]t=(\d+)/)[1];
   },

   anonymizePage: function() {
      if(location.href.indexOf('/viewtopic.php') > 0) {
         $('#pagecontent > .tablebg').slice(1,-1).each(forumAnonymizer.subsilver.anonymizePost);
      } else if(location.href.indexOf('/posting.php') > 0) {
         forumAnonymizer.subsilver.anonymizePostHistory();
         forumAnonymizer.subsilver.anonymizeInput();
      }
   },

   deanonymizePage: function() {
      if(location.href.indexOf('/viewtopic.php') > 0) {
         $('#pagecontent > .tablebg').slice(1,-1).each(forumAnonymizer.subsilver.deanonymizePost);
      } else if(location.href.indexOf('/posting.php') > 0) {
         forumAnonymizer.subsilver.deanonymizePostHistory();
         forumAnonymizer.subsilver.deanonymizeInput();
      }
      $('.deanon-quote').each(forumAnonymizer.subsilver.deanonymizeQuote);
   },

   deanonymizeQuote: function() {
      $(this).closest('.quotetitle').find('.anon').text(users.deanonymize($(this).closest('.quotetitle').find('.anon').text()));
      $(this).remove();
   },

   anonymizeInput: function() {
      var repl = $('textarea[name=message]').val().replace(/\[quote="([^{]*?)"\]/g, function(str, name) { return '[quote="{' + users.anonymize(name) + '}"]'; });
      $('textarea[name=message]').val(repl);
   },

   deanonymizeInput: function(hide) {
      var repl = $('textarea[name=message]').val().replace(/\{([^}]*)}/g, function(str, name) { return users.deanonymize(name) || str; });
      $('textarea[name=message]').val(repl);
      if(!!hide) $('textarea[name=message]').hide();
   },

   anonymizePostHistory: function() {
      $('.postauthor').each(function() {
          var name = $(this).text();
          if(!users.isSelf(name))
             $(this).html(users.anonymize(name)).data('color', $(this).css('color')).css('color','#000');
      });

      $('.quotetitle').each(forumAnonymizer.anonymizeQuote);
   },

   deanonymizePostHistory: function() {
      $('.postauthor').each(function() {
          var name = $(this).text();
          if(!users.isSelf(name))
             $(this).html(users.deanonymize(name)).css('color', $(this).data('color'));
      });
   },

   anonymizePost: function() {
      var name = $('.postauthor', this).text();

      if(!users.isSelf(name)) {

         $('.postauthor', this)
            .html(users.anonymize(name))
            .data('color', $('.postauthor', this).css('color'))
            .css('color', '#000');

         $('.profile .postdetails, .profile table', this).hide();

         var deanonymizer = $('<div/>', { 'class': 'deanonymize' })
            .append($('<button/>', { text: 'Avanonymisera' }).click(forumAnonymizer.subsilver.deanonymizePost))
            .css('width', 150)
            .appendTo($('.profile', this).first());

         $('.gensmall a:contains("' + name + '")', this).html(users.anonymize(name));

         $('.postbody:eq(1)', this).hide();

      }

      $('.quotetitle', this).each(forumAnonymizer.anonymizeQuote);
   },

   deanonymizePost: function() {
      var post = $(this).closest('.tablebg');
      var anon = post.find('.postauthor').text();
      post.find('.postauthor')
         .text(users.deanonymize(anon))
         .css('color', post.find('.postauthor').data('color'));
      post.find('.deanonymize').remove();
      post.find('.profile .postdetails, .profile table').show();
      post.find('.postbody:eq(1)').show();
      post.find('.gensmall a:contains("'+anon+'")').text(users.deanonymize(anon));
   }

};

forumAnonymizer.prosilver = {

   getTopicId: function() {
      return $('#page-body h2 a').attr('href').match(/[&?]t=(\d+)/)[1];
   },

   anonymizePage: function() {
      if(location.href.indexOf('/viewtopic.php') > 0) {
         $('.post').each(forumAnonymizer.prosilver.anonymizePost);
      } else if(location.href.indexOf('/posting.php') > 0) {
         forumAnonymizer.prosilver.anonymizePostHistory();
         forumAnonymizer.prosilver.anonymizeInput();
      }
   },

   deanonymizePage: function() {
      if(location.href.indexOf('/viewtopic.php') > 0) {
         $('.post').each(forumAnonymizer.prosilver.deanonymizePost);
      } else if(location.href.indexOf('/posting.php') > 0) {
         forumAnonymizer.prosilver.deanonymizePostHistory();
         forumAnonymizer.prosilver.deanonymizeInput();
      }
      $('.deanon-quote').each(forumAnonymizer.prosilver.deanonymizeQuote);
   },

   deanonymizeQuote: function() {
      $(this).closest('cite').find('.anon').text(users.deanonymize($(this).closest('cite').find('.anon').text()));
      $(this).remove();
   },

   anonymizeInput: function() {
      var repl = $('textarea[name=message]').val().replace(/\[quote="([^{]*?)"\]/g, function(str, name) { return '[quote="{' + users.anonymize(name) + '}"]'; });
      $('textarea[name=message]').val(repl);
   },

   deanonymizeInput: function(hide) {
      var repl = $('textarea[name=message]').val().replace(/\{([^}]*)}/g, function(str, name) { return users.deanonymize(name) || str; });
      $('textarea[name=message]').val(repl);
      if(!!hide) $('textarea[name=message]').hide();
   },

   anonymizePostHistory: function() {
      $('.author strong').each(function() {
          var name = $(this).text();
          if(!users.isSelf(name))
            $(this).html(users.anonymize(name)).data('color', $(this).css('color')).css('color', '#000');
      });

      $('cite').each(forumAnonymizer.anonymizeQuote);
   },

   deanonymizePostHistory: function() {
      $('.author strong').each(function() {
          var name = $(this).text();
          if(!users.isSelf(name))
             $(this).html(users.deanonymize(name)).css('color', $(this).data('color'));
      });
   },

   anonymizePost: function() {
      var name = $('.postprofile dt a:last', this).text();

      if(!users.isSelf(name)) {

         $('.postprofile dt a:last', this)
            .html(users.anonymize(name))
            .data('color', $('.postprofile dt a:last', this).css('color'))
            .css('color', '#000');

         $('.author strong', this)
            .html(users.anonymize(name))
            .css('color', '#000');

         $('.postprofile dt img', this).hide();

         $('.postprofile dd', this).hide();

         $('.notice a:contains("' + name + '")', this).html(users.anonymize(name));

         var deanonymizer = $('<div/>', { 'class': 'deanonymize' })
            .append($('<button/>', { text: 'Avanonymisera' }).click(forumAnonymizer.prosilver.deanonymizePost))
            .appendTo($('.postprofile dt', this).first());

         $('.signature', this).hide();

      }

      $('cite', this).each(forumAnonymizer.anonymizeQuote);
   },

   deanonymizePost: function() {
      var post = $(this).closest('.post');
      var anon = post.find('.postprofile dt a:last').text();
      post.find('.author strong')
         .text(users.deanonymize(anon))
         .css('color', post.find('.postprofile dt a:last').data('color'));
      post.find('.postprofile dt a:last')
         .text(users.deanonymize(anon))
         .css('color', post.find('.postprofile dt a:last').data('color'));
      post.find('.postprofile dt img').show();
      post.find('.postprofile dd').show();
      post.find('.signature').show();
      post.find('.deanonymize').remove();
      post.find('.notice a:contains("'+anon+'")').text(users.deanonymize(anon));
   }

};


forumAnonymizer.init();

/* TODO: 
 * citat utan användarnamn?
 * ignorerade användare?
 * byt ut namn i brödtext?
 * posthistory kan inte avanonymiseras post för post f.n.
 */