// ==UserScript==
// @name           VKontakte groups show
// @namespace      http://humanless.ru/
// @description    Adds a group list to left of vkontakte.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==
  
window.addEventListener("load", function(){
  console.log('Start group moving');

  var script = "
  var aas = function () {
    return document.querySelectorAll.apply(document, arguments)
  }

  function show_supa_groups(){
    if (aas('#profile_full_info .profile_info .label a').length == 0) {return;}
    ajax.post('al_profile.php', {act: 'groups', id: cur.oid}, {onDone: function(label, text) { 
      var groups = aas('#profile_full_info .profile_info .label a')[0].parentNode.nextSibling.nextSibling.innerHTML;
      groups += text;
      if (ge('my-shiny-groups') == null) {
        var gr = document.createElement('div');
        gr.id = 'my-shiny-groups';
        ge('side_bar').insertBefore(gr, aas('#side_bar ol')[0].nextSibling);
      }
      ge('my-shiny-groups').innerHTML = groups;
    }})}
    show_supa_groups();
    setInterval(show_supa_groups, 10000);";
  
  
  var sc = document.createElement('script');
  sc.innerHTML = script;
  document.head.appendChild(sc);
});
