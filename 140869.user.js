// ==UserScript==
// @name       HipChat Cleaner Tabs When Many
// @namespace  http://aspectized.com/
// @version    2.3
// @description HipChat having 5+ channels is not easy to see channel names. This script modifies CSS and makes names better and cleaner
// @match      https://gameboxed.hipchat.com/chat
// @copyright  2012+, Tomasz Nazar
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/sugar/1.3/sugar.min.js
// ==/UserScript==

var INTERVAL_FOR_UPDATES = 500;
var getSizeBasedOnChannelNumber = function(size){
  if (size >= 13)
    return 6;
  else if (size == 12)
    return 8;
  else if (size == 11)
    return 9;
  else if (size == 10)
    return 11;
  else if (size == 9)
    return 15;
  else if (size == 8)
    return 16;
  else if (size == 7)
    return 19;
  else
    return 100;
}

var check = function(){
  //Shrink left-top logo
  $('.logo').find('img').attr('width', '0px');
  $('#tabs').css('left', '15px');

  //Shrink right-top links
  $('#action_tabs').find('a').css('padding-left', '5px');
  $('#action_tabs').find('a').css('padding-right', '5px');
  $('#action_tabs').find('img').css('left', '0px');
  $('#action_tabs').find('a.download').html('App');

  channels = $('#tabs').find('li').length;
  nameLength = getSizeBasedOnChannelNumber(channels);

  $('#tabs').find('li').each(
      function(idx, element){
        realName = $(element).attr('jid');
        realName = realName.replace("@conf.hipchat.com","")
        realName = realName.replace("private","")
        words = realName.spacify().words();

        words.splice(0,1);

        words = words.join('-').substr(0,nameLength);
        name = words.charAt(0).toUpperCase() + words.slice(1); //capitalize
        privateName = "PRIV-"+name;

        if (name != ''){
          if (!$(element).find('.public').hasClass('hcXyz')){
            $(element).find('.public').addClass('hcXyz');
            $(element).find('.private').addClass('hcXyz');
          };

          $(element).find('.public').html(name);
          $(element).find('.private').html(privateName);

          //$(element).find('.close').remove();
          $(element).find('.hcXyz').css('padding', '2px 7px 2px 2px');
          $(element).find('.hcXyz').css('text-transform', 'capitalize'); //not working
          $(element).find('.hcXyz').css('background-image', 'none');

          $(element).find('a').css('padding-left', '3px');
          $(element).css('margin', '0px');
          $(element).css('padding', '0px');
        }
      }
  );
};

$(document).ready(function() {
  setInterval(check, INTERVAL_FOR_UPDATES);
});
