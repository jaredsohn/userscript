// ==UserScript==
// @name        LDO context issue generator
// @namespace   nooooord
// @description Allows to automation creating of context issue for LDO
// @require     http://codeorigin.jquery.com/jquery-1.10.2.min.js
// @require     http://codeorigin.jquery.com/ui/1.10.3/jquery-ui.min.js
// @resource    uicss http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @resource    addcss http://scripts.1dea.ru/userscripts/ldo/issuegen/ldo_issuegen.css
// @include     https://localize.drupal.org*
// @version     v1.21
// @grant       GM_openInTab 
// @grant       GM_xmlhttpRequest 
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

GM_addStyle (GM_getResourceText ("uicss"));
GM_addStyle (GM_getResourceText ("addcss"));


//==============================//
//========== functions =========//

$(document).on('click', '#mname button', function() {
  var mname = $(this).closest('tr').find('input');
  if (!mname.val()) {
    mname.effect('highlight', {color: '#fbc0c9'});
    return;
  } else {
    GM_openInTab('https://drupal.org/node/add/project-issue/' + mname.val() + '?sid=' + sid);
    $(this).css('background', '#b2f5bf');
  }
});


//==============================//
//====== interface sources =====//
    
// open_dialog link
$('td.sid').append('<a href="#" class="context">C</a>');

// HTML-source
var mname = '<div id="mname" class="dialog"><table></table></div>';
var f_input = '\
  <tr class="f_input">\
    <td><a href=""></a></td>\
    <td><input class="mname" /></td>\
    <td><button>Create issue</button></td>\
  </tr>';



//==============================//
//======== processing ==========//

$('a.context').click( function() {
  sid = $(this).prev('a').attr('href').split('sid=')[1];
  $('.dialog').remove();    
      
  // Get the modules index page
  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://scripts.1dea.ru/userscripts/ldo/issuegen/index_show.php',
    onload: function(data) {
      // index data processing
      var raw_arr = data.responseText.split('<br />');
      index_arr = [];
      for (var i = 0; i < raw_arr.length; i++) {
        var line_arr = raw_arr[i].split('@_@');
        var r_name = line_arr[0];
        var m_name = line_arr[1];
        index_arr[r_name] = m_name;
      }
      console.log('Index request is done. Count = ' + raw_arr.length);
      
      // Get the string information page
      $.get('https://localize.drupal.org/translate/source-details/' + sid, function(data) {
        arr = [];  
        $(data).find('h3:contains("Used at the")').next('.item-list').find('li').each(function(i) {
          var r_name = $(this).find('em').text().split(':')[0];
          $(this).find('span, em').remove();
          var versions_arr = $(this).text().split(',');
          var last_ver = $.trim(versions_arr[versions_arr.length-1]);
          if (last_ver[0] < 7) return; // 7.x+ modules filter
          m_name = index_arr[r_name];
          arr.push([r_name, m_name]);
        });
        console.log('This SID related modules count = ' + arr.length);
        
        // Fill in mname fields
        function mname_dialog(array, callback) {
          $('td.sid:first').append(mname);
          $('#mname').dialog({
            position  : {my: 'center', at: "center top+300", of: window},
            width     : 'auto',
            minHeight : 40,
            title     : 'Input machine names of modules (SID: ' + sid + ')'
          });          
          // module lines
          arr.forEach(function(array, index) {
            $('#mname table').append(f_input);
            $('.f_input:last a').attr({
              'href'   : 'http://google.ru/search?q=Drupal+project+"' + array[0] + '"',
              'target' : '_blank',
              'title'  : 'Find ' + array[0] + ' in Google'
            }).text(array[0]);
            $('.f_input:last input.mname').val(array[1]);
          });
        }
        
        if (arr.length) {
          mname_dialog(arr, function (array) {arr = array;});
        } else {
          alert('SID "' + sid + '" has not related 7.x+ modules. Sorry :(');
        }
        
      });
    }
  });
  return false;
});