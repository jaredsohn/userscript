// ==UserScript==
// @name              XKCD tooltip
// @namespace      http://userscripts.org/users/lorentz
// @description     This script puts the xkcd tooltip under the picture and adds a link to explainxkcd.com
// @include           http://xkcd.com/*
// @include           http://www.xkcd.com/*
// @include           http://what-if.xkcd.com/*
// @grant              none
// @version           1
// @icon                http://s3.amazonaws.com/uso_ss/icon/78091/large.png?1398164995
// @updateURL      https://userscripts.org/scripts/source/78091.meta.js
// @downloadURL  https://userscripts.org/scripts/source/78091.user.js
// ==/UserScript==

/**
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
var addAfter = function (dom, newNode){
    dom.parentNode.insertBefore(newNode, dom.nextSibling);
}

var addTitleBox = function(img, after) {
      var title = img.title;
      if(title.length == 0)
	 return;
      //img.title='';
    
      var titleBox = document.createElement('div');
      titleBox.innerHTML = title;
      titleBox.style.backgroundColor='#FFF36F';
      titleBox.style.fontVariant='normal';
      titleBox.style.border='1px solid #7F7F7F';
      titleBox.style.padding='2px';
      titleBox.style.width='60%';
      titleBox.style.margin='auto';
      titleBox.style.fontSize='70%';
  
      addAfter(after,titleBox);
      return titleBox;
}

window.onload = function() {  
  var comicBox = document.getElementById('comic');
  
  if (comicBox) {
      var img = comicBox.getElementsByTagName('img')[0];
      
      var titleBox = addTitleBox(img,comicBox);
    
    
    
      var name = document.getElementById('ctitle').innerHTML;
      var a = document.createElement('a');
      var id = document.location.href.split('/')[3];
      a.href = 'http://www.explainxkcd.com/wiki/index.php?title=' + id;
      a.innerHTML = 'explain this';
      addAfter(titleBox,a);
  }
  
  var article = document.getElementsByTagName('article');
  if(article.length > 0){
    var imgs = article[0].getElementsByTagName('img');
    for (var i =0 ; i<imgs.length ; i++){
        addTitleBox(imgs[i], imgs[i]);
    }
  }

};  
