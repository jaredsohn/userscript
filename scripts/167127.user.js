// ==UserScript==
// @name         Mantidae
// @namespace    mantis.mantidae
// @author       Corey Aufang
// @description  UI improvements for MantisBT
// @version      1.1
//
// @require      http://code.jquery.com/jquery-2.0.0.min.js
// @require      http://code.jquery.com/ui/1.10.3/jquery-ui.min.js
// @resource     jquery_ui_css http://code.jquery.com/ui/1.10.3/themes/base/jquery-ui.css
//
// @resource     animated-overlay.gif http://code.jquery.com/ui/1.10.1/themes/base/images/animated-overlay.gif
// @resource     ui-bg_flat_75_ffffff_40x100.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_flat_75_ffffff_40x100.png
// @resource     ui-bg_highlight-soft_75_cccccc_1x100.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_highlight-soft_75_cccccc_1x100.png
// @resource     ui-bg_glass_75_e6e6e6_1x400.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_glass_75_e6e6e6_1x400.png
// @resource     ui-bg_glass_75_dadada_1x400.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_glass_75_dadada_1x400.png
// @resource     ui-bg_glass_65_ffffff_1x400.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_glass_65_ffffff_1x400.png
// @resource     ui-bg_glass_55_fbf9ee_1x400.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_glass_55_fbf9ee_1x400.png
// @resource     ui-bg_glass_95_fef1ec_1x400.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_glass_95_fef1ec_1x400.png
// @resource     ui-icons_222222_256x240.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-icons_222222_256x240.png
// @resource     ui-icons_888888_256x240.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-icons_888888_256x240.png
// @resource     ui-icons_454545_256x240.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-icons_454545_256x240.png
// @resource     ui-icons_2e83ff_256x240.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-icons_2e83ff_256x240.png
// @resource     ui-icons_cd0a0a_256x240.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-icons_cd0a0a_256x240.png
// @resource     ui-bg_flat_0_aaaaaa_40x100.png http://code.jquery.com/ui/1.10.1/themes/base/images/ui-bg_flat_0_aaaaaa_40x100.png
//
// ==/UserScript==

jQuery.noConflict();



(function ($) {
    
  var resources = {
    'animated-overlay.gif': GM_getResourceURL('animated-overlay.gif'),
    'ui-bg_flat_75_ffffff_40x100.png': GM_getResourceURL('ui-bg_flat_75_ffffff_40x100.png'),
    'ui-bg_highlight-soft_75_cccccc_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_cccccc_1x100.png'),
    'ui-bg_glass_75_e6e6e6_1x400.png': GM_getResourceURL('ui-bg_glass_75_e6e6e6_1x400.png'),
    'ui-bg_glass_75_dadada_1x400.png': GM_getResourceURL('ui-bg_glass_75_dadada_1x400.png'),
    'ui-bg_glass_65_ffffff_1x400.png': GM_getResourceURL('ui-bg_glass_65_ffffff_1x400.png'),
    'ui-bg_glass_55_fbf9ee_1x400.png': GM_getResourceURL('ui-bg_glass_55_fbf9ee_1x400.png'),
    'ui-bg_glass_95_fef1ec_1x400.png': GM_getResourceURL('ui-bg_glass_95_fef1ec_1x400.png'),
    'ui-icons_222222_256x240.png': GM_getResourceURL('ui-icons_222222_256x240.png'),
    'ui-icons_888888_256x240.png': GM_getResourceURL('ui-icons_888888_256x240.png'),
    'ui-icons_454545_256x240.png': GM_getResourceURL('ui-icons_454545_256x240.png'),
    'ui-icons_2e83ff_256x240.png': GM_getResourceURL('ui-icons_2e83ff_256x240.png'),
    'ui-icons_cd0a0a_256x240.png': GM_getResourceURL('ui-icons_cd0a0a_256x240.png'),
    'ui-bg_flat_0_aaaaaa_40x100.png': GM_getResourceURL('ui-bg_flat_0_aaaaaa_40x100.png'),
  };
  
  var jquery_ui_css = GM_getResourceText('jquery_ui_css');
  var matches = jquery_ui_css.match(/url\(([^\)]+)\)/g);
  
  // Helper function that creates the @resource and resources code.
  (function jquery_ui_css_helper() {
    return;
    
    var header_results = [];
    var resources_results = [];
    for (var i in matches) {
      header_results[matches[i]] = matches[i].replace(/url\("?(images\/([^\)"]+))"?\)/, '// @resource     $2 http://code.jquery.com/ui/1.10.1/themes/base/$1');
      resources_results[matches[i]] = matches[i].replace(/url\("?(images\/([^\)"]+))"?\)/, "    '$2': GM_getResourceURL('$2'),");
    }
    for (var i in header_results) {
      console.log(header_results[i]);
    }
    
    for (var i in resources_results) {
      console.log(resources_results[i]);
    }
  })();
  
  
  for (var i in resources) {
    var reg = new RegExp('images/' + i, 'g');
    jquery_ui_css = jquery_ui_css.replace(reg, resources[i]);
  }
  GM_addStyle(jquery_ui_css);
  
  // domready code goes in here.
  $(function () {
    // $('<div>hello</div>').dialog();
    
    /**
     * This function "normalizes" the history and bug notes on a MantisBT issue page
     * 
     * @param {Object} $ This should be the jQuery object.
     */
    (function mantidae_normalize_history($) {
      
      var $bugnotes_container = $('#bugnotes #bugnotes_open').hide();
      
      var $history_container = $('#history #history_open').hide();
      
      var $bugnotes = $bugnotes_container.find('tr.bugnote').detach();
      
      var $history = $history_container.find('.row-category-history').nextAll().detach().filter(function () {
        return !$(this).find('td:nth-child(3)').text().match(/Note Added:/i);
      });
      
      if ($bugnotes.length > 0 && $history.length > 0) {
        
        // Remove spacers rows from table. Looks off if left.
        $bugnotes_container.find('tr.spacer').remove();
        
        $bugnotes.find('td.bugnote-public').each(function () {
          $(this).parent().attr('timestamp', Date.parse($.trim($(this).find('> span:nth-of-type(3)').text()).replace(' ', 'T')));
        });
        
        $bugnotes.find('td:nth-child(2)').attr('colspan', '3');
        
        $history.each(function () {
          $(this).attr('timestamp', Date.parse($.trim($(this).find('> td:nth-of-type(1)').text()).replace(' ', 'T')));
        });
        
        // Since notes are in the list before history, we can do a simple sort.
        var $sorted = $bugnotes.add($history).get().sort(function (a, b) {
          return parseInt($(a).attr('timestamp')) - parseInt($(b).attr('timestamp'));
        });
        
        $bugnotes_container.find('table tbody').append($sorted);
        
        $bugnotes_container.show();
      }
    })($);
    
    /**
     * Goal is to normalize issue updates to ensure notes are added with issue updates.
     * 
     * @param {Object} $ This should be the jQuery object.
     */
    (function mantidae_normalize_updates($) {
      
      // Hide the reassign and update status buttons from issue page.
      $('form[action="bug_assign.php"]').parent('td').hide();
      $('form[action="bug_change_status_page.php"]').parent('td').hide();
      
      var $update_form = $('form[action="bug_update.php"][name="update_bug_form"]')
      
      $update_form.find('table tbody > tr:nth-child(3) > td:nth-child(1)').first().each(function () {
        var $issue_num_td = $(this);
        var issue_num_text = $issue_num_td.text();
        var issue_number = $.trim(issue_num_text).match(/0+(\d+)/)[1];
        
        $issue_num_td.html($('<a />').text(issue_num_text).attr('href', '/view.php?id=' + issue_number));
      });
      
      $update_form.submit(function (event) {
        var $this = $(this);
        var error = false;
        
        var $bugnote_text = $this.find('textarea[name="bugnote_text"]');
        if ($.trim($bugnote_text.val()).length == 0) {
          error = true;
          alert('You must enter a note describing the reasoning for this update.');
          $bugnote_text.focus();
        }
        
        if (error === true) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
      
      
    })($);

  });
  
})(jQuery);
