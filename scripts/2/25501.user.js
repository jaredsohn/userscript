// ==UserScript==
// @name           Picasaweb - show filename
// @namespace      http://ajnasz.hu/picasaweb-show-filename
// @description    show the name of selected file next to the input field
// @include        http://picasaweb.google.com/lh/webUpload*
// ==/UserScript==


(function() {
  appendFileName = function(event) {
    if(this.parentNode.getElementsByTagName('strong').length > 0) {
      this.parentNode.removeChild(this.parentNode.getElementsByTagName('strong')[0])
    }
    var s = document.createElement('strong');
    s.setAttribute('style', 'margin-left: 5px;');
    s.setAttribute('title', this.value);
    s.appendChild(document.createTextNode(this.value.replace(/.+\/([^\/]+)$/,'$1')));
    this.parentNode.appendChild(s);
    event.preventDefault();
  };

  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type == 'file') {
      inputs[i].addEventListener('change', appendFileName, false);
    }
  }
})();
