// ==UserScript==
// @name		AutoLepraCarPics
// @namespace		su.gornostaev
// @description		Показывает фото пепяки из постов "Покажите уже своё" рядом с ником лепера
// @version		1.6
// @author		Sergey TheDeadOne Gornostaev
// @license		GPL
// @include		http://auto.leprosorium.ru/comments/*
// @grant		none
// @downloadURL		https://userscripts.org/scripts/source/154390.user.js
// @updateURL		https://userscripts.org/scripts/source/154390.user.js
// ==/UserScript==

var maxPaneHeight = 700;
var maxPaneWidth = 700;

var objXHR = new XMLHttpRequest();
var image = document.createElement('img');
image.setAttribute('id', 'user_carpic');
image.setAttribute('src', 'http://gornostaev.su/media/images/g0000005/undefined.jpg');
image.setAttribute('alt', 'Загружается...');
/*
image.onload = function() {
  var ratio = maxPaneHeight/maxPaneWidth;
  if(this.height/this.width > ratio) {
    if(this.height > maxPaneHeight){
      this.width = Math.round(this.width*(maxPaneHeight/this.height));
      this.height = maxPaneHeight;
    }
  }
  else {
    if(this.width > maxPaneWidth) {
      this.height = Math.round(this.height*(maxPaneWidth/this.width));
      this.width = maxPaneWidth;
    }
  }
}
*/
image.onerror = function() {
  this.src = 'http://gornostaev.su/media/images/g0000005/undefined.jpg';
}

var block = document.createElement('div');
block.setAttribute('id', 'user_cardiv');
block.setAttribute('style', 'position:absolute;width:auto;border:1px #000000 solid;margin:5px;padding:5px;background-color:#FFFFFF;z-index:999;visibility:hidden;');
block.appendChild(image);
document.getElementsByTagName('body')[0].appendChild(block);

objXHR.open('GET', 'http://gornostaev.su/api/listLeproCars/', true);
objXHR.onreadystatechange = function() {
  if(objXHR.readyState == 4) {
    if(objXHR.status == 200) {
      //shit
      var cars = eval('(' + objXHR.responseText + ')');

      var divs = document.getElementsByTagName('div');
      for(i = 0; i < divs.length; i++) {
        if(divs[i].className.split('post tree').length > 1) {
          uid = parseInt(divs[i].className.split(' u')[1]);
          if(uid in cars) {
            var objImg = new Image();
            objImg.src = 'http://gornostaev.su/media/images/g0000005/u' + uid + '.jpg';

            divNode = divs[i].getElementsByTagName('div')[2];
            aNode = document.createElement('a');
            aNode.setAttribute('href', '#'+ uid);
            aNode.innerHTML = '<span class="reply_link">моё ведро</b>';
            aNode.addEventListener('mouseover',
              function(e) {
                var uid = this.href.split('#')[1];
                var divNode = document.getElementById('user_cardiv');
                document.getElementById('user_carpic').src = 'http://gornostaev.su/media/images/g0000005/u' + uid + '.jpg';
                divNode.style.top = (e.pageY - divNode.offsetHeight / 2) + 'px';
                divNode.style.left = (e.pageX + 20) + 'px';
                divNode.style.visibility = "visible";
              },
              false);
            aNode.addEventListener('mouseout',
              function() {
                document.getElementById('user_cardiv').style.visibility = "hidden";
              },
              false);
            divNode.appendChild(aNode);
          }
        }
      }
    }
  }
};
objXHR.send(null);