// ==UserScript==
// @name           mfisn inline images + videos
// @namespace      http://mfisn.com/
// @description    inline + on demand display of mfisn images + videos
// @include        *mfisn.com*
// ==/UserScript==

var link_handlers = [{

   // image
  'regex':  new RegExp('\.(jpe?g|gif|png)$', 'i'),
  'nregex': new RegExp('\\?.+\.[^.]+$'),
  'write_handler': function(link) {

    var image = $('<a href="#"><img border="0" src="' + link.attr('href') + '"></a>');
    $('#lol_' + link.data('mfisn_id')).append(image);
    image.click(function(){
      $(this).parent().hide();
      return false;
    });

  }

}, {

  // youtube
  'regex':   new RegExp('youtube\.com/watch\\?v=([^&]+)', 'i'),
  'write_handler': function(link, match) {

    // write a div to page then attempt to write flash to it
    swfobject.embedSWF(
      'http://www.youtube.com/v/' + match[1] + '?hl=en&fs=1&ap=%2526fmt%3D18', 
      'lol_' + link.data('mfisn_id'),
      "640", "385", "8"
    );

  }

}, {

  // liveleak
  'regex':   new RegExp('liveleak\.com/view\\?i=([^&]+)', 'i'),
  'write_handler': function(link, match) {

    // write a div to page then attempt to write flash to it
    swfobject.embedSWF(
      'http://www.liveleak.com/e/' + match[1], 
      'lol_' + link.data('mfisn_id'),
      "450", "370", "8"
    );

  }

}, {

  // funnyordie
  'regex': new RegExp('funnyordie\.com/videos/([a-z0-9]+)', 'i'),
  'write_handler': function(link, match) {

    swfobject.embedSWF(
      'http://www2.funnyordie.com/public/flash/fodplayer.swf?' + match[1],
      'lol_' + link.data('mfisn_id'),
      "464", "388", "8", '', {'key': match[1]}
    );

  }

}, {

  // vimeo
  'regex': new RegExp('vimeo\.com/([0-9]+)', 'i'),
  'write_handler': function(link, match) {

    swfobject.embedSWF(
      'http://vimeo.com/moogaloop.swf?clip_id=' + match[1],
      'lol_' + link.data('mfisn_id'),
      "640", "360", "8"
    );

  }

}, {

  // myspace
  'regex': new RegExp('vids\.myspace\.com/.+?videoid=([0-9]+)', 'i'),
  'write_handler': function(link, match) {

    swfobject.embedSWF(
      'http://mediaservices.myspace.com/services/media/embed.aspx/m=' + match[1] + ',t=1,mt=video',
      'lol_' + link.data('mfisn_id'),
      "425", "360", "8"
    );

  }

}];

// no referrer regex
var nr_reg  = new RegExp('^http://mfisn.com/out/', 'i');

// mfisn id regex
var m_id_reg = new RegExp('ID#[^0-9]+([0-9]+)');

// used for writing out flash
var swfobj_js = document.createElement('script');
swfobj_js.src = 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js'
swfobj_js.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(swfobj_js);

// used for doing your mom
var jquery_js = document.createElement('script');
jquery_js.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
jquery_js.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jquery_js);

// wait for jquery + swfobject to be loaded before continuing
function js_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined' ||
     typeof unsafeWindow.swfobject == 'undefined') {
    window.setTimeout(js_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    swfobject = unsafeWindow.swfobject;
    lolmfisn();
  }
}
js_wait();

function lolmfisn() {

  $('div.pub a.actual, div.link a.actual').each(function(){

    var link = $(this);
    var href = link.attr('href');

    // ignore no referrer links
    if (href.match(nr_reg)) {
      return;
    }

    // get mfisn id
    var match = link.parent().parent().html().match(m_id_reg);
    var mfisn_id;
    if (match) {
      mfisn_id = match[1];
    } else {
      return;
    }

    var match;

    for (var x=0;x<link_handlers.length;x++) {
      if (match = href.match(link_handlers[x].regex)) {

        // ignore certain types of this link
        if (link_handlers[x].nregex != 'undefined' && href.match(link_handlers[x].nregex)) {
          break;
        }

        link
            .css('text-decoration', 'underline') // underline
            .data('lol_idx', x)                  // store which handler in ele
            .data('mfisn_id', mfisn_id)          // store mfisn id in ele
            .click(function() {                  // apply click function

              // restore link obj + handler + href
              var link    = $(this);
              var handler = link_handlers[link.data('lol_idx')];

              var href  = link.attr('href');

              // id of display element
              var disp_id = 'lol_' + link.data('mfisn_id');

              if (link.data('loled')) {

                // link currently dispayed, just toggle visibility
                $('#' + disp_id).toggle();
                return false;

              } else {

                // see if other links are displayed
                var loled_links = link.siblings('a.actual').filter(function(){
                  return $(this).data('loled');
                });

                if (loled_links.length) {

                  // another link is currenly displayed, mark as not displayed
                  // and remove display element
                  loled_links.data('loled', 0);
                  $('#' + disp_id).remove();

                }

                // add display div
                link.parent().append('<div id="' + disp_id + '"></div>');

                // mark link as displayed
                link.data('loled', 1);

                // write content to div, supplying link + match obj
                handler.write_handler(link, href.match(handler.regex));

                link.siblings('object').css('display', 'block');

              }

              return false;

            });

        break;
      }
    }

  });

  var id_reg = new RegExp("'ID[^0-9]+([0-9]+)");
  $('div.pub, div.link').each(function(){
    var id_match = $(this).html().match(id_reg);
    if (id_match) {
      var div = $('<div style="margin: 0 0 0 4px;padding:0px;float: right;"><a href="#" title="reply" style="margin:0px;padding:0px;color:blue;font-size: 9px;text-decoration:none;">r</a></div>')
      .find('a')
        .click(function(){
          $('#nav_1').show();
          $('#nav_1 input[name=url]').focus().val('[re: #' + id_match[1] + ']');
          return false;
        })
      .end();
      $(this).prepend(div);
    }
  });

}
