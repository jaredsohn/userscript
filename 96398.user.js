// ==UserScript==
// @name           HN filter by time
// @namespace      http://userscripts.org/scripts/show/47550
// @include        http://news.ycombinator.com/item?id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Adds "filter older ids" links to all comments on the HN post pages
// ==/UserScript==

var unit_to_mins_convertion = function(unit){
  return unit_to_mins_conv = {
    day: 1440,
    hour: 60,
    minute: 1,
  }[unit.replace(/s$/, '')];
}

function recency_label_to_minutes(label){
  var recency_parts = label.split(' ');
  amount = recency_parts[0];
  unit = recency_parts[1];
  return amount * unit_to_mins_convertion(unit);
}

var grease_hide_parents = function(){
  at_root = false
  curr = $(this).parents().eq(8);
  add_orphaned_flag(curr.find('table'));
  levels = 0; // just to make sure we dont do infinite looping of the DOM changes
  while(!at_root && levels < 50){
    if(curr.find('img').attr('width') == '0') {
      at_root = true
    }
    curr = curr.prev();
    curr.hide();
    levels += 1;
  }
  $(this).html('show parents');
  $(this).get(0).removeEventListener('click', grease_hide_parents, true)
  $(this).get(0).addEventListener("click", grease_show_parents, true);
}

var grease_show_parents = function(){
  at_root = false
  curr = $(this).parents().eq(8);
  remove_orphaned_flag(curr.find('table'));
  levels = 0; // just to make sure we dont do infinite looping of the DOM changes
  while(!at_root && levels < 50){
    if(curr.find('img').attr('width') == '0') {
      at_root = true
    }
    else {
      curr = curr.prev();
      remove_orphaned_flag(curr.find('table'));
      curr.find('.grease_show_parents').remove();
      curr.show();
    }
    levels += 1;
  }
  $(this).html('hide parents');
  $(this).get(0).removeEventListener('click', grease_show_parents, true)
  $(this).get(0).addEventListener("click", grease_hide_parents, true);
}

var grease_show_filter_older = function(id){
  $('#filter_on_id').val(id);
  $('#filter_on_recency').val('');
  filter_comments();
}

var reset_grease_filters = function(){
  grease_show_filter_older(0);
}

var parse_recency_label = function(html){
  return html.replace(/.* ([0-9]+ [a-z]+) ago.*$/, '$1');
}

var parse_id = function(html){
  return parseInt(html.replace(/^.*<a href="item\?id=([0-9]+)">.*$/, '$1'));
}

var parse_minutes = function(html){
  recency_label = parse_recency_label(comhead_html);
  return recency_label_to_minutes(recency_label);
}

$(document).ready(function(){
  $('.comhead').each(function(i){
    id = parse_id($(this).html());
    $(this).append(' | <a class="grease_filter_older" id="grease_filter_older_' + i + '" href="javascript:void(0)">filter older ids</a>')
    el = document.getElementById('grease_filter_older_' + i)
    el.addEventListener("click", (function(id){
      var local_id = id;
      return function(){
        grease_show_filter_older(local_id)
      }
    })(id), true);
  });
});

var add_orphaned_flag = function(el){
  el.css('border-top', '1px #ddd solid');
}
var remove_orphaned_flag = function(el){
  el.css('border-top', 'none');
}

var isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


var last_filters = {
  time: null,
  id: null
};
var filter_comments = function(){

  // Get the filter value
  minutes_filter = $('#filter_on_recency').val()
  if(isNumber(minutes_filter)) {
    max_age_mins = parseInt(minutes_filter);
  }
  else { // Allow for math-expressions by evaling the string if its not a number
    try {
      max_age_mins = eval(minutes_filter);
    }
    catch(e){
      return false;
    }
  }

  // Get the current id filter value
  filter_id = parseInt($('#filter_on_id').val())

  // Make sure the value is not identical to the last filtering, since that filter is already active
  if(max_age_mins == last_filters['time'] && filter_id == last_filters['id']) {
    return false;
  }
  last_filters = {
    time: max_age_mins,
    id: filter_id,
  };

  last_was_filtered = false;
  filtered_count = 0;
  // Filter comments
  $('.comhead').each(function(i){
    comhead_html = $(this).html();

    // Parse relevant values from the comment
    if(!isNaN(max_age_mins)) {
      minutes = parse_minutes(comhead_html);
      id = false;
    }
    else if(filter_id > 0){
      id = parse_id(comhead_html);
      minutes = false;
    }

    if(i != 0) { // Skips OP
      validates_as_recent = minutes && minutes <= max_age_mins
      validates_as_new_id = id && id > filter_id
      validates = (validates_as_recent || validates_as_new_id)
      if(!validates) {
        // console.log(comhead_html)
        // console.log(id + ' >= ' + filter_id + ', ' + validates_as_new_id)
        last_was_filtered = true
        $(this).closest('table').closest('tr').hide();
        filtered_count++;
      }
      else {
        if(last_was_filtered) {
          add_orphaned_flag($(this).parents().eq(4))
          $(this).children('.grease_show_parents').remove();
          if($(this).parents().eq(3).find('img').attr('width') != '0') {
            $(this).append('<span class="grease_show_parents"> | <a class="grease_show_parents" id="grease_show_parents_' + i + '" href="javascript:void(0)">show parents</a></span>')
            document.getElementById('grease_show_parents_' + i).addEventListener("click", grease_show_parents, true);
          }
        }
        else {
          remove_orphaned_flag($(this).parents().eq(4))
        }
        $(this).closest('table').closest('tr').show();
        last_was_filtered = false
      }
      last = $(this);
    }
    $('#filter_count').html(filtered_count + ' comments filtered' + (filtered_count > 0 ? '(esc resets)' : ''));
    if(filtered_count == 0) {
      $('.grease_show_parents').remove();
    }
  });
}

window.document.addEventListener("keyup", function(e){
  if(e.keyCode == 27) {
    reset_grease_filters()
  }
}, true);


filter_form =  '<div style="width:300px;padding-right:200px;float:right">';
filter_form += '<span id="filter_count" style="color:#333;height:16px;width:25px;font-size:12px">0 comments filtered</span>'
filter_form += '<input id="filter_on_recency" style="height:16px;font-size:12px;width:45px;;display:none" name="recency_filter"> ';
filter_form += '<input id="filter_on_id" style="height:16px;font-size:12px;width:63px;display:none" name="id_filter"/></div>';
$('.pagetop')[0].innerHTML += filter_form;
document.getElementById('filter_on_recency').addEventListener("keyup", function(){
  $('#filter_on_id').html('');
  filter_comments();
}, true);
