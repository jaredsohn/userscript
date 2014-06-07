// ==UserScript==
// @name        toggle unread
// @namespace   http://fluidapp.com
// @description it toggles is:unread from the search string
// @include     *
// @author      Jared Grippe jared@jaredgrippe.com
// ==/UserScript==

(function () {
    if (!window.fluid) return;
      
    var canvas_frame = document.getElementById('canvas_frame');
    if (!canvas_frame) return;
    if (!("contentDocument" in canvas_frame)) return;

    var $ = function(id){
      var e = canvas_frame.contentDocument.getElementById(id);
      return e;
    };


    setTimeout(function(){

      var search_the_web_button = $(':r8');
      var d = document.createElement('div');
      d.appendChild(search_the_web_button.cloneNode(true));
      d.innerHTML = d.innerHTML.replace(/Search the Web/,'Unread');
      var toggle_unread_button = d.firstChild;
      toggle_unread_button.id = "toggle_unread";
      toggle_unread_button.style.marginRight = '10px';
      search_the_web_button.parentNode.insertBefore(toggle_unread_button,search_the_web_button);

      var search_field = $(':ra');
      toggle_unread_button.toggle = function(){
        var search = search_field.value;
        search = search.indexOf('is:unread') > 0 ? search.replace(/\s*is:unread\s*/ig,' ') : search+' is:unread';
        window.location.hash = 'search/'+search.replace(/\s+/g,' ');
      };
      toggle_unread_button.setAttribute('onclick','this.toggle();');

    }, 1000);
})();