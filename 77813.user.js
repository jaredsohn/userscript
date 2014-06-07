// ==UserScript==
// @name           Vkontakte simple photo uploader
// @description    Sets HTML uploader by default and adds new fields automatically.
// @author         Kaktus & Alex7Kom
// @version        0.0.1
// @include        http://vkontakte.ru/photos.php?act=add*
// @include        http://vkontakte.ru/photos.php?*act=add*
// ==/UserScript==


(function(){
      document.getElementById('normal_upload').style.display="block";
      document.getElementById('flash_upload').style.display="none";
       
      document.getElementById('file3').setAttribute('onchange','myelem = this.cloneNode(true); myelem.removeAttribute("id"); myelem.removeAttribute("name"); myid = /file(\\d+)/.exec(this.id); myelem.setAttribute("id", "file"+(eval(myid[1]) + 1)); myelem.setAttribute("name", "file"+(eval(myid[1]) + 1)); this.parentNode.appendChild(myelem); this.removeAttribute("onchange");');
})();