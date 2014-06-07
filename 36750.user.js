// ==UserScript==
// @name           ilovecinema - profile movie filter
// @namespace      http://userscripts.org/users/28106
// @include        http://ilovecinema.ru/users/*/films/
// ==/UserScript==

function init() {
  options = '<div style="float: right;" id="gm_filter_options">'
            + '<span style="margin: 0 1px 0 0; padding: 0 14px; border: 1px solid #EAEAEA"><input type="checkbox" val="like" rel="3" checked disabled /></span>'
            + '<span style="margin: 0 1px 0 0; padding: 0 14px; border: 1px solid #EAEAEA"><input type="checkbox" val="hate" rel="4" checked disabled /></span>'
            + '<span style="margin: 0 1px 0 0; padding: 0 14px; border: 1px solid #EAEAEA"><input type="checkbox" val="seen" rel="5" checked disabled /></span>'
            + '<span style="margin: 0 1px 0 0; padding: 0 14px; border: 1px solid #EAEAEA"><input type="checkbox" val="want" rel="6" checked disabled /></span>'
          + '</div>';

  $('.profile .main .indent p.cap:first').prepend(options).append(' (<span id="gm_filter_count">'+$('table.films tr').length+'</span>)');
  $('#gm_filter_options span').click(function(e) {
    if($(e.target).is(':checkbox')){
      refilter();
      return null;
    }
    
    $this = $(':checkbox', this);
    if($this.is(':disabled')) {
      $this.removeAttr('disabled');
    }
    else {
     $this.attr('disabled', true);
    }
    
    refilter();
  });
}

function refilter(){
  hasquery = false;
  criteria = new Object();
  // Criteria for hide
  $('#gm_filter_options :checkbox').not(':disabled').each(function() {
    $this = $(this);
    criteria[$this.attr('rel')] =  $this.is(':checked') ? false : $(this).attr('val');
    hasquery = true;
  });
  
  if(hasquery) {
    query = new Array;
    for(rel in criteria) {
      query.push('td:eq(' + rel + ') img[src$=' + ( criteria[rel] ? criteria[rel] + '.gif' : 'none.gif' ) + ']');
    }
    query = 'table.films tr:has(' + query.join(',') + ')'

    $('table.films tr:hidden').show();
    $(query).hide();
  }
  else {
    $('table.films tr:hidden').show();
  }
  $('#gm_filter_count').html($('table.films tr:visible').length);
}



$ = unsafeWindow.jQuery;
if(!$) {
	alert("GM script need page to have jQuery");
}
else {
  init();
}