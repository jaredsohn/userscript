// ==UserScript==
// @name        remove top bar
// @namespace   http://fluidapp.com
// @description moves the space waisting search form to a menu option on the right
// @include     *calendar.google.com*
// @include     *google.com*calendar*
// @author      Jared Grippe jaredgrippe.com jared@jaredgrippe.com
// ==/UserScript==

(function () {
    if (window.fluid) {
      try{

        function $(id){
          return document.getElementById(id);
        }

        var search_form = document.forms[0];
        var top_bar = $('topBar');
        top_bar.style.display = 'none';
        top_bar.style.position = "absolute";
        top_bar.style.top = "85px";
        top_bar.style.left = "10px";
        top_bar.style.height = '37px';
        top_bar.style.width = '670px';
        top_bar.style.overflow = 'hidden';
        top_bar.style.zIndex = 10;
        top_bar.style.backgroundColor = "white";
        top_bar.style.borderColor = "black";
        top_bar.style.borderWidth = "1px";
        top_bar.style.borderStyle = "solid";


        var search = $('nav').firstChild.childNodes[4].cloneNode(true);
        var search_link = search.childNodes[0];
        search_link.id = "searchLink";
        search_link.innerHTML = 'Search';
        search_link.onclick = function(){
          top_bar.style.display = 'block';
          $('maininput').focus();
          return false;
        };
        $('nav').firstChild.appendChild(search);


        var cancel_link = document.createElement('a');
        cancel_link.href = "javascript:void(null);";
        cancel_link.innerHTML = 'cancel';
        cancel_link.className = "small";
        cancel_link.style.paddingLeft = '1em';
        function hideSearchForm(){
          top_bar.style.display = 'none';
        };
        cancel_link.onclick = hideSearchForm
        search_form.appendChild(cancel_link);

        search_form.onsubmit = hideSearchForm;
      }catch(e){
        alert('Greasemonkey Error: '+e.message);
      }
    }
})();