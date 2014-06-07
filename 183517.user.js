// ==UserScript==
// @name        LDO issue insert
// @namespace   nooooord
// @description Inserts template for context addition on issue page
// @require     http://codeorigin.jquery.com/jquery-1.10.2.min.js
// @require     http://codeorigin.jquery.com/ui/1.10.3/jquery-ui.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.js
// @resource    uicss http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @resource    addcss http://scripts.1dea.ru/userscripts/ldo/issueinsert/ldo_issueinsert.css
// @resource    tpl http://scripts.1dea.ru/userscripts/ldo/issueinsert/template.txt
// @include     https://drupal.org/node/add/project-issue*
// @version     v1.11
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest 
// ==/UserScript==

GM_addStyle(GM_getResourceText ("uicss"));
GM_addStyle(GM_getResourceText ("addcss"));
var template = GM_getResourceText("tpl");
var button = '<button type="button" id="t_insert">Insert template</button>';
var sid = $(location).attr('href').split('sid=')[1];
$('#node_project_issue_form_group_issue_metadata .fieldset-wrapper').prepend(button);

var comment = '<div id="comment"><textarea></textarea></div>';
$('body').append(comment);


//**************** HTML ****************//
var context = '<div id="context"></div>';
var c_input = '\
  <tr class="error">\
    <td class="incontext"><input /></td>\
    <td class="incomment"><span class="area0">comment</span><textarea></textarea></td>\
    <td class="del"><span title="Delete line" class="del">-</span></td>\
  </tr>';

  
//************** HANDLERS **************//

// renumerate tr
function enum_span() {
  var count = 0;
  $('.incomment span').removeClass();
  $('.incomment span').each(function() {
    $(this).addClass('area-' + count);
    count++;
  });
}

// recheck errors in dialog
function recheck_error() {
  if ($('#context .error').length || !$('#context tr').length) {
    $('button.insert').button('disable');
  } else {
    $('button.insert').button('enable');
  }
}

// add_context_line handler
$(document).on('click', '.incomment span', function() {
  $('#comment textarea').val($(this).next().val());
  current_id = $(this).attr('class');
  current_context = $('span.' + current_id).closest('tr').find('.incontext input').val();
  $('#comment').dialog({
    width : 300,
    title : 'Comment "' + current_context + '"',
    resizable: false,
    buttons: [{
      text  : 'Save',
      class : 'save',
      click : function() {
        var this_button = $('.incomment span.' + current_id);
        var this_comment = $('#comment textarea').val();
        this_button.next().val(this_comment);
        (this_comment.length) ?  this_button.css('background', '#dafbd7') : this_button.css('background', 'none')
        $(this).dialog('close');
      }
    }]
  });
});

// add_context_line handler
$(document).on('click', 'a.add', function() {
  $(this).before(c_input);
  enum_span();
  $('#context input:last').focus();
  $('#comment').dialog('close');
  return false;
});

// context_del handler
$(document).on('click', 'span.del', function() {
  $(this).closest('tr').remove();
  enum_span();
  recheck_error();
});

// check dialog fields fill
$(document).on('focusout', '#context input', function() {
  if ($(this).val()) {    
    $(this).closest('tr').removeClass('error');
  } else {
    $(this).closest('tr').addClass('error');
  }
  recheck_error();
});


//*************** INSERT ***************//
$(document).on('click', '#t_insert', function() {
  $('#context').remove();
  $('#page-subtitle').after(context);
  $('#context').append(c_input).append('<a class="add">Add context</a>').dialog({
    minWidth : 350,
    title    : 'Contexts for SID: ' + sid,
    buttons  : [{
      text  : 'Insert template',
      class : 'insert',
      click : function() {
        $('#edit-field-issue-version-und').val($('#edit-field-issue-version-und option:eq(1)').val());
        $('#edit-field-issue-component-und').val('Code');
        $('#edit-field-issue-category-und').val('2');
        
        // context gathering
        var context_list = '<ul>';
        var context_array = [];
        $('#context .incontext input').each(function() {
          this_comment = $(this).closest('tr').find('.incomment textarea').val();
          this_context = $(this).val();
          context_array.push([this_context, this_comment]);
          if (this_comment.length) this_comment = '(' + this_comment + ')';
          context_list += '\n  <li><strong>' + this_context + '</strong> ' + this_comment + '</li>';
        });
        context_list += '\n</ul>';
        context_array = JSON.stringify(context_array);
        $.cookie('ldo_context', context_array);
        
        // string + f
        GM_xmlhttpRequest({
          method: "GET",
          url: 'https://localize.drupal.org/translate/source-details/' + sid,
          onload: function(data) {
            
            // get string
            string_item = $(data.responseText).find('.item-list:first li');
            string = string_item.html();
            string_for_title = string_item.text();
            
             // set title of issue
            if (string_for_title.length > 25) {
              var string_for_title = string_for_title.substr(0, 24) + '…';
            }
            $('#edit-title').val('Context requred for string "' + string_for_title + '" (SID: ' + sid + ')');
            
            // get module name
            var mname_raw = $('#edit-field-project-und-0-target-id').val();
            var module_name = mname_raw.substr(0, mname_raw.lastIndexOf(' ('));
            
            // replace <> to &xx; for raw insert
            var clear_string = string
              .replace(/>/g, '&gt;')
              .replace(/</g, '&lt;');
            
            // insert final template
            var final_template = template
              .replace('%module_name%', module_name)
              .replace('%sid%', sid)
              .replace('%string%', clear_string)
              .replace('%context_list%', context_list);
              
            // insert final template
            $('#edit-body-und-0-value').val(final_template);
            
            // turn off Insert button
            $('#t_insert').css({background : '#bbb', cursor : 'default'}).prop('disabled', true);
            $('#context').dialog('close');
          }
        });
      }
    }]
  });
  
  // $.cookie('ldo_context', '');
  if ($.cookie('ldo_context').length) {
    $('#context tr').remove();
    var context_array = JSON.parse($.cookie('ldo_context'));
    context_array.forEach(function(arr) {
      $('#context a.add').before(c_input);
      $('#context tr:last input').val(arr[0]);
      $('#context tr:last textarea').val(arr[1]);
      if (arr[1].length) $('#context tr:last .incomment span').css('background', '#dafbd7');
    });
    $('#context tr').removeClass('error');
    // Add new button to dialog
    var buttons = $('#context').dialog('option', 'buttons');
    buttons.push({
      text  : 'Clear cache',
      click : function() {
        $('#context tr').remove();
        recheck_error();
        $('#context a.add').before(c_input);
        $.removeCookie('ldo_context');
      }
    });
    $('#context').dialog('option', 'buttons', buttons);
  }
  recheck_error();
  enum_span();
});