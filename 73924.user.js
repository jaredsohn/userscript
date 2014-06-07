// ==UserScript==
// @name          Textarea backup (modified)
// @namespace     http://userscripts.ru/js/textarea-backup/
// @description   Retains text entered into textareas.
// @include       *
// @exclude       http://mail.google.com/*
// @exclude       https://mail.google.com/*
// @author        Nikita Vasilyev
// @author        Alexander Chudesnov
// @version       0.2
// @licence       MIT
// ==/UserScript==


(function(){

  var w = window.wrappedJSObject || window;
  var storage = w.localStorage || w.globalStorage;

  if (typeof storage == 'undefined') return;

  var textareas = document.getElementsByTagName('textarea');

  for (var i=0; i<textareas.length; i++) {
    textareas[i].addEventListener('dblclick',function(event){
		//alert('well at least we get an event');
		if (!event.target.name) return;
		if (event.target.value==""){
		  try {
			var value = storage[location.pathname + '#' + event.target.name];
		  } catch (e) {
			throw e;
		  }
		  if (value) event.target.value = value;
		}
	}, false);
	
    textareas[i].addEventListener('keyup', function(event){
      if (!event.target.name) return;
      storage[location.pathname + '#' + event.target.name] = event.target.value;
    }, false);

    textareas[i].form && textareas[i].form.addEventListener('submit', function(event){
      for (var i=0; i<textareas.length; i++) {
        if (textareas[i].form == event.target) {
          storage.removeItem(location.pathname + '#' + textareas[i].name);
        }
      }
    }, false);

  }

})();
