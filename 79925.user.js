// ==UserScript==
// @name           kk
// @include        http://www.facebook.com/profile.php?id=*
// ==/UserScript==

//alert('dadasdasdsfad');
var ele = document.getElementById('profile_action_send_message');
var evt = document.createEvent("HTMLEvents");
evt.initEvent('click', true, true ); // event type,bubbling,cancelable
ele.dispatchEvent(evt);

//fireEvent(ele,'click');

setTimeout("var sub = document.getElementById('subject'); sub.value = 'Hãy chia sẻ cảm xúc của bạn mỗi ngày';", 2000);

setTimeout("var status = document.getElementsByName('status'); status[0].value = 'Tham gia  Nhật ký nhé bạn http://www.facebook.com/NhatkyOnline';", 2000);

setTimeout("var status = document.getElementsByName('status')[0]; var evt = document.createEvent('HTMLEvents'); evt.initEvent('click', true, true ); status.dispatchEvent(evt);", 2200)

setTimeout("var lab = document.getElementsByTagName('label'); var evt = document.createEvent('HTMLEvents'); evt.initEvent('click', true, true ); lab[0].dispatchEvent(evt);", 2500);

function fireEvent(element,event) {
   if (document.createEvent) {
       // dispatch for firefox + others
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent(event, true, true ); // event type,bubbling,cancelable
       return !element.dispatchEvent(evt);
  }
}

function sendData(div){
   var par = document.getElementById(div);
   var sub = par.getElementById('subject');
   sub.value = 'Hãy chia sẻ cảm xúc của bạn hàng ngày';
}
