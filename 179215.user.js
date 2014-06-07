/**
 * Copyright (c) 2013 jgb
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// ==UserScript==
// @name        Real time questions for Stack Exchange
// @description This script provides real time updates and filtering of active questions for all SE sites
// @namespace   http://stackapps.com/q/4352/22584
// @downloadURL http://userscripts.org/scripts/source/179215.user.js
// @version     0.3 Beta
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @include     http://*.stackexchange.com/questions
// @include     http://*.stackexchange.com/questions?*
// @include     http://*.stackexchange.com/questions/tagged/*
// @include     http://stackoverflow.com/questions
// @include     http://stackoverflow.com/questions?*
// @include     http://stackoverflow.com/questions/tagged/*
// @include     http://serverfault.com/questions
// @include     http://serverfault.com/questions?*
// @include     http://serverfault.com/questions/tagged/*
// @include     http://superuser.com/questions
// @include     http://superuser.com/questions?*
// @include     http://superuser.com/questions/tagged/*
// @include     http://askubuntu.com/questions
// @include     http://askubuntu.com/questions?*
// @include     http://askubuntu.com/questions/tagged/*
// ==/UserScript==



(function(win) {
  var $, se, SE_RealTime;
  
  if (!win.StackExchange) {
    console.log('window.StackExchange is undefined');
    return;
  } else {
    se = win.StackExchange;
  }
  
  SE_RealTime = function() {
    var tab, title, activeItems, showFavoriteTagsOnly, 
        favoriteTags, showQuestionsOnly;
    

    function updateTitle() {
      setTimeout(function () {
          if (activeItems)
            win.document.title = '('+activeItems+') ' + title;
          else
            win.document.title = title;
      }, 200);
    }
    

    function getFavoriteTags() {
      return $("#interestingTags a").map(function () {
        return $(this).text()
      }).get();
    }


    function initialize() {
      $('#tabs .youarehere').removeClass('youarehere');
      tab.addClass('youarehere');
      tab.unbind('click');
      reset();
        
      if (history.pushState) {
        history.pushState('questions', title, '/questions#realtime');
      }
        
      favoriteTags = getFavoriteTags();
      if (favoriteTags.length)
        showFavoriteTagsOnly = getValue('watchFavoriteOnly', false);
      else
        showFavoriteTagsOnly = false;

      showQuestionsOnly = getValue('watchQuestionsOnly', false);
      

      addStyle(
        '#questions .new-post-activity, .pager, .page-sizer {display:none}' +
        '.rtbar {text-align:right; font-size:90%; border-bottom: 1px solid #CCC; margin:15px 0;  padding-bottom:15px}' +
        '.rtbar > * {margin-left:15px}'
      );
        
      var toolbar = $('<div>').addClass('rtbar');
        
      var favoriteOnly = $('<span>');
      var cb = $('<input>');
      cb.attr('type', 'checkbox');
      cb.attr('id', 'rtfavoriteonly');
      cb.attr('checked', showFavoriteTagsOnly);
      cb.change(toggleFavoriteOnly);
      favoriteOnly.append(cb);
      favoriteOnly.append(' <label for="rtfavoriteonly">Favorite Tags only</label>');
      toolbar.append(favoriteOnly);
        
        
      var questionsOnly = $('<span>');
      var cbq = $('<input>');
      cbq.attr('type', 'checkbox');
      cbq.attr('id', 'rtquestionsonly');
      cbq.attr('checked', showQuestionsOnly);
      cbq.change(toggleQuestionsOnly);
      questionsOnly.append(cbq);
      questionsOnly.append(' <label for="rtquestionsonly">Questions only</label>');
      toolbar.append(questionsOnly);
        

      toolbar.append(
        $('<a>')
          .text('Remove questions')
          .attr('title', "Click to clean recent questions or pres key 'e'")
          .click(reset)
      );
        
      $('#questions').before(toolbar);
        
      $(win.document).keypress(function(e){ if(e.charCode==101) reset();});
      
      // At least FF on SO needs (re)init
      se.realtime.init('ws://sockets.ny.stackexchange.com');
      se.realtime.subscribeToActiveQuestions(
        155,                 // maybe the site-id (155=stackexchange?)
        'questions-active',  // queue there is also a queue: questions-newest
        null,                // Array of tags
        null,                // ?unused?
        null,                // Array of tags. Treat only posts including all
        null,                // boolean use short time units s instead of secs
        addQuestion          // Callback function
      );
    }
    

    function reset() {
      // Items get class complete after 200ms. 
      // This prevents erasing items just "arrived"
      if (!activeItems)
        $('#questions').empty();
      else
        $('#questions .complete').remove();

      activeItems=0;
      updateTitle();
    }
    

    function toggleFavoriteOnly() {
      showFavoriteTagsOnly = $(this).is(':checked');
        
      if (showFavoriteTagsOnly) 
        favoriteTags = getFavoriteTags();
        
      if ( showFavoriteTagsOnly && !favoriteTags.length ) {
        showFavoriteTagsOnly=false;
        se.helpers.showErrorMessage($('div.rtbar'), 'No favorite Tags found');
        $(this).attr('checked', false);
      }
        
      setValue('watchFavoriteOnly', showFavoriteTagsOnly)
    }
    
    
    function toggleQuestionsOnly() {
      showQuestionsOnly = $(this).is(':checked');
      setValue('watchQuestionsOnly', showQuestionsOnly)
    }
    
    
    function getValue(name, defaultValue) {
      if (typeof GM_getValue == 'function')
        return GM_getValue(name, defaultValue);
      else
        return defaultValue;
    }
    
    
    function setValue(name, value) {
      if (typeof GM_setValue == 'function')
        GM_setValue(name, value);
    }
    
    function addStyle(css) {
      if (typeof GM_addStyle == 'function')
        return GM_addStyle(css);
      
      var style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    
    function addQuestion(q) {
      // only catch questions from the origin site
      if (window.location.host != q.siteBaseHostAddress) return updateTitle();
        
      if (showFavoriteTagsOnly) {
        var hit=false;
        for (tag in q.tags) {
          if (favoriteTags.indexOf(q.tags[tag]) !== -1) {
            hit=true;
            break;
          } 
        }
        if (!hit) return updateTitle();
      }
      
      $.ajax({url: '/posts/' + q.id + '/questions-active'}).done(function(r) {
        var item = $(r);
            
        if (showQuestionsOnly && !item.find('.status.unanswered').length)
          return updateTitle();
        
        // See reset()
        setTimeout(function(){ item.addClass('complete')}, 200);

        $('#questions').prepend(item);
        activeItems++;
        updateTitle();
      });
    }
    
    
    title = 'Realtime Questions - ' + se.options.site.name;
    tab = $('<a>').click(initialize);
    tab.text('real-time');
    tab.appendTo('#tabs');
  }
  
  se.ready(function() {
    $ = win.jQuery;
    SE_RealTime();
  });

})(typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
