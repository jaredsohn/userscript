// ==UserScript==
// @name        sa smiliees filter
// @namespace   poop
// @include     http://forums.somethingawful.com/misc.php?action=showsmilies
// @version     1
// @grant       none
// ==/UserScript==

(function($){
  var $groups = $('.smilie_group').each(function(){
    var $group = $(this);
    var $groupH3 = $group.prev('h3');
    $group.data('prevH3', $groupH3);
  });
  var filterObjs = [];
  buildFilterObjs();
  
  //builds the input box where you can type in
  var $filterInput = $('<input>', {type:'text', placeholder:'Type part of a smilie\'s name or description to find it!'})
    .css({
      fontSize : '20px',
      width: 600
    })
    .on('keyup', filter)
    .insertBefore($('.smilie_group:eq(0)').prev('h3')) //yeeEEEEEAAAAAAHhhh
  ;
  
  //populates attrs for filtering
  function buildFilterObjs(){
    filterObjs = [];
    $('.smilie').each(function(){
      var $smilie = $(this);
      var $img = $('img', $smilie);
      var str = [
        $('.text', $smilie).text(),
        $img.attr('src').replace(/http:\/\/f?i?|\.somethingawful\.com\/|(forumsystem|smilies|images|emoticons)\/?/g, ''),
        $img.attr('title')
      ].join(' ');
      filterObjs.push({
        el : $smilie,
        str : str
      });
    });
  }
  
  //filters!
  function filter(e){
    //if they press ESC, then clears it
    if(e.keyCode == 27){
      $filterInput.val('');
    }
    var val = $filterInput.val();
    //this neato regex stolen from datatables.net
    var regexStr = ('^(?=.*?' + regQuote(val).split(' ').join(')(?=.*?') + ').*$');
    var regex = new RegExp(regexStr, 'i');
    var valids = [];
    var invalids = [];
    
    //finds which smilies to show/hide
    for(var a = 0; a < filterObjs.length; a+=1){
      var filterItem = filterObjs[a];
      if(regex.test(filterItem.str)){
        valids.push(filterItem.el);
      }
      else{
        invalids.push(filterItem.el);
      }
    }
    
    //shows/hides the smilies
    $(invalids).each(function(){
      $(this).css('display', 'none'); // hide
    });
    $(valids).each(function(){
      $(this).css('display', 'list-item'); // show [sic]; '' = return to original value
    })
    
    //hides the groups that dont have anything showing
    $groups.each(function(){
      var $group = $(this);
      var $groupH3 = $group.data('prevH3');
      var $visibleSmiliesInGroup = $('.smilie:visible', $group);
      if($visibleSmiliesInGroup.length > 0){
        $groupH3.show();
      }
      else{
        $groupH3.hide();
      }
    });
  }
  
  //slashes regex characters so we can do the neato datatables thing easily
  function regQuote(str, delimiter){
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
  }
})(unsafeWindow.jQuery);
