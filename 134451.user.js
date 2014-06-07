// ==UserScript==
// @name       		Facebook Mesaj Silici
// @version     	08.07.2012
// @namespace  		fbms
// @copyright		RedSoldier
// @description		Tek Tuşla İster Teker Teker İster Toplu Toplu Mesajlarınızı Silin
// @author			RedSoldier (Can You Subscribe ? http://www.facebook.com/RedSoldier41)
// @include     	http://*.facebook.com/*
// @include    		https://*.facebook.com/*
// @require    		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

function dump_script(callback) {
  script = document.createElement('script');
  script.textContent = '(' + callback.toString() + ')();';
  document.body.appendChild(script);
}


function core_script() {

  var load_jquery = function(callback) {
    var callback_wrapper = function() {
      $.noConflict(); // This needs to be called ASAP
      callback();
    }

    if(typeof jQuery == 'undefined') { // Do we already have jQuery?
      // This doesn't seem to work the way i expected. I thought Scriptish would install a global jQuery variable,
      // yet the googleapis version gets downloaded with Scriptish too. FIXME
      script = document.createElement('script');
      script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
      script.addEventListener('load', callback_wrapper);
      document.body.appendChild(script);
    } else {
      callback_wrapper();
    }
  }

  /*
   * A debug function.
   * */
  var debug = function(msg, lvl) {
    prefix = 'FB Mesajları Sil: ';
    if(lvl && lvl == 'error') {
      console.log(prefix+msg);
    } else {
      // console.log(prefix+msg);
    }
  }

  /*
   * Adds all event listeners after jQuery is fully loaded
   * */
  var listen = function() {
    var q = jQuery;
  
    /*
    * Variable determines if replace_buttons is running.
    * */
    var running = false;

    /*
     * Does the main job; replaces all site buttons with the superior ones.
     * Gets executed multiple times per pageload, for example after
     * Facebook's javascript changed something.
     * */
    var replace_buttons = function() {
      if (running || q('#MessagingDashboard').length == 0) {
        return;
      }
      running = true;
      try {
        if (q('#MessagingThreadlist').length == 0) {
          // Single view of messaging thread
          debug('Detected single view');
          if (q('#QuickDelete').length == 0) {
            actions = q('#MessagingFrame').find('.uiHeaderActions');
            tid = actions.find('input[name=tid]').first().attr('value');
            if (tid) {
              elem = q('<a class="uiButton uiButtonConfirm uiToolbarItem" id="QuickDelete" role="button" rel="dialog" title="Bu Konuşmayı Sil"><span class="uiButtonText">Sil</span></a>');
              elem.attr('href','/ajax/messaging/async.php?action=deleteDialog&tid='+encodeURIComponent(tid));
              elem.attr('ajaxify','/ajax/messaging/async.php?action=deleteDialog&tid='+encodeURIComponent(tid));
              elem.insertAfter(actions.find('div.uiToolbarContent > div > .uiToolbarItem:first-child'));
            }
          }
        } else {
          // We are in the overview of all messages
          // Avoid false positives by class and structure matching. Better than URLs.
          debug('Detected overview');
          if(q('.deleteLink').length == 0) {
            q('li.threadRow a.archiveLink, li.threadRow a.unarchiveLink').each(function() {
              a_orig = q(this);
              a = a_orig.clone(); // Make a deep copy. This will clone the original button and append the clone on it
              a.attr('ajaxify', a.attr('ajaxify').replace('action=tag&','action=delete&'));
              a.attr('title', 'Bu Görüşmeyi Sil');
              a.addClass('deleteLink archiveLink').removeClass('unarchiveLink'); // deleteLink for reference, the rest for styling
              a.css('display', 'block'); // Facebook removes archiveLinks with CSS in archive view

              a.find('input').attr('value', 'D');
              l = a.find('label.uiCloseButton');
              if (l.attr('class')) {
                l.attr('class', 'uiCloseButton uiCloseButtonSmall uiDeleteButton');
              }
              
              a.insertAfter(a_orig);

              if(a_orig.hasClass('archiveLink')) {
                a_orig.remove(); // It is confusing if two buttons have the same icon, so we remove the original button
              }
            });
          }

          // Add "Delete All" button on top
          if(q('#QuickDelete').length == 0) {
            toolbar_button = q('<a href="#" class="uiButton uiButtonConfirm uiToolbarItem" id="QuickDelete" role="button" title="Tüm Konuşmaları Sil"><span class="uiButtonText">Hepsini Sil</span></a>');
            toolbar_button.click(function(){
              if(confirm('Tüm mesajları silmek istediğine emin misin ?')) {
                q('a.deleteLink').each(function(){
                  console.log(this);
                  $(this).click(); // I don't know how it works but it does
                });
              }
            });
            toolbar_button.insertAfter('div.uiToolbarContent > div > .uiToolbarItem:first-child');
          }
        }
      }
      catch(e){ debug('Exception:'+e, 'error') };
      running = false;
    };

    jQuery(document).ready(replace_buttons);
    jQuery(document).bind('DOMNodeInserted', replace_buttons);
  }

  // load jquery and add event handlers
  load_jquery(listen);
}

// dump the script in the DOM
dump_script(core_script);
