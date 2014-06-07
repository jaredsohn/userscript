// ==UserScript==
// @name           Favstar checker
// @revision       20120108
// @author         kazy111
// @namespace      http://kazy111.info/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @updateURL      http://kazy111.info/javascript/favstar_checker_new.user.js
// ==/UserScript==

(function (d, func) {
  var h = d.getElementsByTagName('head')[0];
  var id = Math.floor(Math.random()*10000);
  var s = d.createElement("script");
  s.textContent = "(function loader"+id+"(){if(window.jQuery){(" + func.toString() + ")(jQuery);}else{setTimeout(loader"+id+",500)}})();";
  h.appendChild(s);

})(document, function($) {

  var RetryCount = 5;
  var Service = "favstar";


  var Config = {};

  Config["favstar"] = {
    link_id:  'favstar_link',
    icon_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAtFBMVEVsMiQkSnQsSmwcTowUWqQUXqw8VnwcXqwUZLQUZrw0XpQsYpwcZrkUasQcarsUbsQcasTMNgwcbsTEPgQcbswccswcctQcdsycViTUQAQcdtRsakxEdqTcSgTcTgTcVgTcXATUZgTkZARshqTkagTkbgS0igTkeASMllTkfgTkhQTsggTshgTsigTskQTsmQTsngTspQT0qgT0rgT0sgT0tgT0vgT0wgz0xgT8ygT81QT83wRSvE8zAAAAu0lEQVR42i3NMU7DQBBA0T87u3YSHDAdinIEqLj/URCiB1MQ2Y53ZyYFeRd4cuLuMgCQaA0aTG/WGq1lEzeiXt+piokn9+vsXF4jtoRD5nlMAgHnH3BSfNvdEwToQdbDf+PjuonoA3X0iIjw2B91zlQMAXCvfB51l+roYRJmy4fvLMNpDSQLy+8A5GpbEMmUJVktJbP/0tItL840lAqq9bGzvp96m71srehgignxpxKaTbVzS+5J2YqD2w3GEXJNDOOvWAAAAABJRU5ErkJggg==',
    linkUrl:  function (userName) { return 'http://favstar.fm/users/' + userName + '/recent' }
  };
  Config["favolog"] = {
    link_id:  'favolog_link',
    icon_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUEAgTc3ATk5mz08jTU1qT8/gTc3JHn51nMzrxubwT8+hzs7kT09izk4nzU0rTMzsyiz3S8AAAAEHRSTlMA////////////////////wFCLQwAAAHFJREFUeNpj4BQNBYLACQxTQ8EgkkE0OK0UJMQQWv+/FSTEEPX/vyqYEf5/a/j30PqtQEZo2I/Q/lQgo/z4//L/pkDG/6fvX/wDqfmfWv//O4hhHBrx/ymIERoa/r80lCGmF2jIE6A5ohC7AhGWwpwBADe+PULzO6kPAAAAAElFTkSuQmCC',
    linkUrl:  function (userName) { return 'http://favolog.org/' + userName }
  };
  Config["twilog"] = {
    link_id:  'twilog_link',
    icon_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEU0zvyk5vxs2vzU9vxM0vy87vyE4vz0/vxEzvzk+vxc1vzM8vyU5vys6vx03vz8/vweJosJAAAAdklEQVR42mNIZAABNgGG/WAGowHD/q/CfL/YTykw7N+zn+cT/+4PQKn9PP/6b39gOG9z3vz7/OwPDIxfe3+KfwQq5ohigACmP3DGy78d9+eBGOX2Zz7XOwAZf4CmnFeAiHwCMljqgGoy5BUgOvZ/b4AwTl9hAADJbjKeSlu+gAAAAABJRU5ErkJggg==',
    linkUrl:  function (userName) { return 'http://twilog.org/' + userName }
  };
  Config["favotter"] = {
    link_id:  'favotter_link',
    icon_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAP9QTFRFAAAATdgcTNoUVdwgWN8ZX+AlYt8zY+QfZOQhZuUgZ+QqbOI3c+BNc+Y7dukqeOg9d+sleesofOk+ieVoiexHje5CkfA7lO9Lk/I0mOxrnO1tnO9dnPNBnu9lnvBdnvBgnfU5oe54ou54oPRDn/Y5pe5+qPZHqPZJqvg/rPlAsfVns/OBvfWKvPtTvftUvftVvPtZvvtbx/O0yPSvyfSxyvaqy/eozveo0Pe31Pe/1fe/1ffA3PjJ2/nF3vfV3/jR3/jW4PjX4fjX5fnc5vrZ5vra6vrk7Pvn7fvo7vvo7vvp7/zn7/zo8fzu9/31+P32+/76/v7+/v7///7/////RZ97LQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QwbByAOzH7F+AAAAKBJREFUGNNjYACDEChgQOXCRIC0s42VtbWlrRdEJCTEVMtQV19fz8AcLBASYiGjqaGmrq6ubAYRCNJWUdCxd3V1dQmE6PCTkxAz8fb29oEaGuIpIiouLy0tLWsMFfAQ4hMUAAGpAKgAPyeHpJKioqoRTAUvO5dTMBDA3OXBzcLqiOTyEHc2JmYHmDdAAv7CjDxuyAIhvnZuIUgCDMgeZwAAH5sodXzS7fwAAAAASUVORK5CYII=',
    linkUrl:  function (userName) { return 'http://favotter.matope.com/user/' + userName }
  };
  Config["twistar"] = {
    link_id:  'twistar_link',
    icon_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUEAgT80TY1svz86qas3/z899/n8/h0yPz8/fz844Pg4OD88cP81k6S1fzr6etUvPxS2yDQAAAAEHRSTlMA////////////////////wFCLQwAAAHFJREFUeNpjYMAAfG0LIIwVGV0Qxlv1tgVcq1YtYHiu39HW0dHRx/Bc6b9H5JkzO4AMpVJBQcEZQKkrmYKTjcNAapqFO3ZGMLxVcuvYGn1wBsMyJaWbQDU7GNjyQYzTQFMz0jpCQzseMDBwvQOCVwjLAeh+K/H+82CaAAAAAElFTkSuQmCC',
    linkUrl:  function (userName) { return 'http://twistar.cc/' + userName + '/faved' }
  };


  var retry = 0;

  window.addEventListener("hashchange",init);
  init();


  function init(){
    retry = 0;
    setTimeout(function(){
      makeLink(Service);
      setHandler();
    },1000);
  };

  function setHandler(){
  
    var deferMakeLink = function(){
      retry=0;
      setTimeout(function(){
        makeLink(Service);
      }, 500)
    };
    
    if($('.content-main').length > 0 &&
       $('.content-main .js-action-profile-name').length == 0){
      setTimeout(setHandler, 500);
    }
    
    $('.content-main,.dashboard,.permalink-tweet').on('click',
                                                      '.js-action-profile-name,.js-action-profile-avatar',
                                                      deferMakeLink);
  }


  function makeLink(setting){
    var user_name;
    var anchor_id;
    var parent;

    var link_id  = Config[setting].link_id;
    var icon_url = Config[setting].icon_url;
    var linkUrl  = Config[setting].linkUrl;
  
    var main_username = function(){
      try{
        var splitted = window.location.href.split('/')
          return splitted[4] == 'similar_to' ? splitted[5] : splitted[4];
      }catch(e){
        return null;
      }
    }

    var popup_username = function(){
      return $('#mini-profile h3.username a')[0].text.substr(1);
    }
  
    if( $('#mini-profile').length > 0 ){
      // popup profile
      anchor_id = link_id + '_popup';
      parent = $('#mini-profile h2.fullname');
      user_name = popup_username();
    } else if( $('.profile-card').length > 0 ) {
      // main profile
      anchor_id = link_id;
      parent = $('.profile-card .username');
      user_name = main_username();
    } else if(  $('.permalink-header').length > 0 ) {
      // main profile
      anchor_id = link_id;
      parent = $('.permalink .permalink-header');
      user_name = main_username();
    } else {
      parent = null;
    }

    if(document.getElementById(anchor_id))
      return;
    
    if(user_name && parent && anchor_id) {
      var anchor = $("<a target='_blank'>").attr({id:anchor_id,href:linkUrl(user_name)});
      var image = $('<img>').attr("src",icon_url);
      image.css({width:'16px',height:'16px',float:'none',margin:'0px 2px'});
      image.appendTo(anchor).parent().appendTo(parent);
    } else {
      if(retry++ < RetryCount) setTimeout(function(){makeLink(Service)}, 1000);
    }
  }
});
