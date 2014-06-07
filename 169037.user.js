// ==UserScript==
// @name       my.mail.ru Autoclose guestbookPublish_frame dialog
// @version    0.2
// @description  working @ tampermonkey since v3.. Автоматически закрывает фрейм добавления записи в гостевую на страницах приложений 'Мой Мир@Mail.ru'
// @include    http*://my.mail.ru/apps/*
// @copyright  2013, Alexxx
// ==/UserScript==

function closeGBPF() {
	try {
      var x=document.getElementById("guestbookPublish_frame"), y=(x.contentWindow || x.contentDocument);
      if (y.closeModal) {
        setTimeout(y.closeModal, 100);
      }
    }
    catch(e) { }
}

function addHandlers() {

  if (window.self == window.top) {
    setInterval( closeGBPF, 1000);
    //window.addEventListener('load', closeGBPF, false);
  }
}
addHandlers();