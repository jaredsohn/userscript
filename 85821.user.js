// ==UserScript==
// @name           grepoLinks
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.*/game/*
// @version        1.3.2
// @description    Enhanced your town links
// @source         http://userscripts.org/scripts/show/85821
// ==/UserScript==

(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var lang = (n[1] || 'en'), server = (n[1] + n[2]);
    var townId = parseInt(uW.Game.townId, 10);
    
    function update(){
      if (uW.Layout.town_list_toggle){
        setTimeout(update,200);
        return;
      }
      if (!$('#town_list').is(':visible')){
        return;
      }
      $('#town_list').css('z-index',9);
      $('#town_link_clicked_menu').css('z-index',301);
      $('#town_list a').each(function(i, e){
          var url = $(e).attr('href');
          var m = /[?&]town_id=(\d+)/.exec(url);
          if (m && m[1]) {
            var newurl = "return Layout.townLinkClicked(this, " + m[1] + ", '0', '/game/map?target_town_id=" + m[1] + "&town_id=" + townId + "', '_self')";
            $(e).addClass('gpT');
            $(e).after('<a href="#" onclick="' + newurl + '"><img src="http://static.grepolis.com/images/game/temp/bbcode_town.png"/></a>');
          }
       });
    }

    uW.Layout.toggleTownList=createSequence(uW.Layout.toggleTownList,function(){
      setTimeout(update, 200);
    });

function createSequence(method, fcn, scope){
        return (typeof fcn != 'function') ?
                this :
                function(){
                    var retval = method.apply(this || window, arguments);
                    fcn.apply(scope || this || window, arguments);
                    return retval;
         };
}

})();

