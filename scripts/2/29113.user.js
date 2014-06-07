// ==UserScript==
// @name           Picasaweb - show filename with preview
// @namespace      http://ajnasz.hu/picasaweb-show-filename-with-preview
// @description    show the name of selected file next to the input field
// @include        http://picasaweb.google.com/lh/webUpload*
// ==/UserScript==


(function() {
  var appendFileName = function(event) {
    if(this.parentNode.getElementsByTagName('strong').length > 0) {
      this.parentNode.removeChild(this.parentNode.getElementsByTagName('strong')[0])
    }
    var s = document.createElement('strong');
    s.setAttribute('style', 'margin-left: 5px;');
    s.setAttribute('name', this.name);
    s.appendChild(document.createTextNode(this.value.replace(/.+\/([^\/]+)$/,'$1')));
    s.addEventListener('click', GM_doPicasa, false);
    this.parentNode.appendChild(s);
    event.preventDefault();
  };
  var showImagePreview = function(input, pos) {
    var d = document.getElementById('GM_picasaPreview');
    if(!d) {
      var d = document.createElement('div');
      d.id = 'GM_picasaPreview';
      d.setAttribute('style', 'position:absolute;display:none;padding:3px;background-color:#fff;border:5px solid #9FC4FF;');
      var img = new Image();
      img.id = 'GM_picasaPreviewImage';
      img.setAttribute('style', 'width:400px;');
      d.appendChild(img);
      document.body.appendChild(d);
      var d = document.getElementById('GM_picasaPreview');
    }
    var img = document.getElementById('GM_picasaPreviewImage');
    if(img.getAttribute('name') != input.files.item(0).fileName) {
      img.src = 'data:' + input.files.item(0).getAsDataURL();
      img.setAttribute('name', input.files.item(0).fileName);
    }
    d.style.top = pos.y + 'px';
    d.style.left = pos.x + 'px';
    d.style.display = 'block';
    d.addEventListener('click', hideImagePreview, false);
  }
  var hideImagePreview = function() {
    var d = document.getElementById('GM_picasaPreview');
    d.style.display = 'none';
  }
  var GM_doPicasa = function(event) {
    var pos ={x: event.clientX, y: event.clientY};
    var input = document.getElementsByName(this.getAttribute('name'))[0];
    showImagePreview(input, pos);
  }

  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].type == 'file') {
      inputs[i].addEventListener('change', appendFileName, false);
    }
  }
})();
