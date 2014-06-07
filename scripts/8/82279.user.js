// ==UserScript==
// @name           BitMeTV Favorite Categories
// @namespace      BitMeTV
// @author         mikembm
// @description    Allows you to filter torrents by favorite categories
// @include        *www.bitmetv.org/browse.php*
// ==/UserScript==

var p = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    p = div.onclick();
};

var $ = p.jQuery;

var torrents = $("td.latest").parent();

torrents.parent().find("tr:first")
  .append(
    '<td class="colhead" align="right">'+
    '<a href="#" class="toggle-fav">Favorite</a>'+
    '</td>'
  )
  .parent().prepend(
    '<tr class="fav-message">'+
    '<td colspan="12">You are filtering by favories. Click "Favorite" below to toggle</td>'+
    '</tr>'
  );
  $('.fav-message td')
    .css({
      'text-align': 'center',
      'background': '#FEEFB3',
      'border': '1px solid #9F6000',
      'color': '#9F6000',
      'padding': '3px'
    })
    .parent().hide();
    
if(localStorage.getItem('fav_state'))
  updateFavorites();

$('.toggle-fav').click(function(){ 

  if(localStorage.getItem('fav_state'))
    localStorage.removeItem('fav_state');
  else
    localStorage.setItem('fav_state', '1');
    

  updateFavorites();

  return false;
});

function updateFavorites(){
  torrents.each(function(){
    var id = getCatID($(this));
    var row = $(this);

    if(localStorage.getItem('fav_state')){
      if(localStorage.getItem('fav_'+id))
        row.show();
      else
        row.hide();
        
      $('.fav-message').show();
    }
    else{
      row.show();
      $('.fav-message').hide();
    }  
  });
}


$(torrents).each(function(){
  var id = getCatID($(this));
  var row = $(this);

  if(localStorage.getItem('fav_'+id))
    var option = '<a href="#" class="favorite-del">Del</a>';
  else
    var option = '<a href="#" class="favorite-add">Add</a>';

  row.append(
    '<td class="latest" align="center">' +
    option +
    '</td>'
  );
});


var add_click = function(){
  var id = getCatID($(this).parent().parent());
  
  torrents.each(function(){
    if(id == getCatID($(this))){
      $("td:last a", $(this))
        .fadeOut(400, function(){
          $(this).parent()
            .html('<a href="#" class="favorite-del">Del</a>')
            .find('a')
              .click(del_click);
      });
    }
  });
  
  localStorage.setItem('fav_'+id, '1');
  
  return false;
};


var del_click = function(){
  var id = getCatID($(this).parent().parent());
  
  torrents.each(function(){
    if(id == getCatID($(this))){
      
      $("td:last a", $(this))
        .fadeOut(400, function(){
          $(this).parent()
            .html('<a href="#" class="favorite-add">Add</a>')
            .fadeIn()
            .find('a')
              .click(add_click);
        });
      
      if(localStorage.getItem('fav_state'))
        $(this).hide();
    }
  });
  
  localStorage.removeItem('fav_'+id);

  
  return false;
};

$('.favorite-add').click(add_click);
$('.favorite-del').click(del_click);


function getCatID(e){
  var id = e.find('td:first a').attr('href');
  return id.substring(5, id.length);
}
