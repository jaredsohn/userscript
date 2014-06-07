// ==UserScript==
// @name juick.copypostcommentnumber
// @description Добавляет кнопку для копирования номера поста/комментария в буфер обмена
// @namespace http://juick.com
// @include http://juick.com/*
// ==/UserScript==

var Clipboard = {
  copy: function(data) {
          var textArea = document.createElement("textarea");
          textArea.style.position = "absolute";
          textArea.style.left = "-100%";
          textArea.value = data;

          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("Copy");
          document.body.removeChild(textArea);
        }
};

function addCopyButton(el){
	var btn = document.createElement("img");
	
	btn.src = "data:image/gif;base64,R0lGODlhCgAMAKIAAP39/b+/v7y8vPLx8Xl5ecvLywAAAAAAACH5BAAAAAAALAAAAAAKAAwAAAMiWLG8CjDCJSUVOAM6ut8BkGmc14HiKKDmealoNRVEbddFAgA7";
	btn.setAttribute("text", el.innerText || el.innerHTML);
	btn.addEventListener('click', function(e){
		var text = e.target.getAttribute("text");

		if(text){
			Clipboard.copy(text);		
		}
	});
	el.parentNode.insertBefore(btn, el.nextSibling); //insertAfter
}

var elements = document.querySelectorAll(".liav small a")

for(var i = 0, n = elements.length; i < n; i += 1){
	text =  elements[i].innerText || elements[i].innerHTML;

	if(text[0] === "#"){
		addCopyButton(elements[i]);
	}
}

var mess = document.querySelector("small a");

if(mess.onclick.toString().indexOf("postform") !== -1){
	addCopyButton(mess);
}
