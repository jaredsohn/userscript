// ==UserScript==
// @name           Facebook Tycoons Hide/Show Businesses
// @namespace      HiddenChilli-Tycoons-Hide-Show-Businesses
// @description    Hide or show businesses in Facebook Tycoons (http://apps.facebook.com/supertycoons/).
// @include        http://tycoons.fb.crunchyroll.com/businesses*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function loadState() {
  var json = JSON.parse(GM_getValue('state', '[]'));
  if(json.length) {
    $(json).each(function(){
      var e = $('a[name="' + this.name + '"]:eq(0)').parents('tr:eq(0)');
      if(e[0]) {
        if(this.state == 0) e.nextAll('tr:lt(6)').hide();
      }
    })
  }
}

function saveState() {
  var json = [];
  $('td.name a').each(function() {
    var visible = ($(this).parents('tr:eq(0)').next().is(':visible')) ? 1 : 0;
    json.push({name: $(this).attr('name'), state: visible});
  });
  GM_setValue('state', JSON.stringify(json));
}

$('td.name').click(function(){
  $(this).parent().nextAll('tr:lt(6)').toggle();
  saveState();
});

$('.businesses-bulk-action-container').append(
'<input type="button" value="Toggle All" class="submit-blue" id="toggleAll"/>' + 
'<input type="button" value="Hide All" class="submit-blue" id="hideAll"/>' +
'<input type="button" value="Show All" class="submit-blue" id="showAll"/>');

$('#toggleAll').click(function() {
  $('td.name').each(function() {
    $(this).parent().nextAll('tr:lt(6)').toggle();
  });
  saveState();
});
$('#hideAll').click(function() {
  $('td.name').each(function() {
    $(this).parent().nextAll('tr:lt(6)').hide();
  });
  saveState();
});
$('#showAll').click(function() {
  $('td.name').each(function() {
    $(this).parent().nextAll('tr:lt(6)').show();
  });
  saveState();
});

loadState();