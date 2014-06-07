// ==UserScript==
// @name           fasil
// @namespace      http://userscripts.org/scripts/show/129848
// @description    delete all facebook messages
// @author         t3r4z1
// @version        1.1
// @include        http*://www.facebook.com/messages*
// @homepage       http://userscripts.org/users/t3r4z1
// ==/UserScript==

function araHedefTumSilBtn() {
	if(/\/messages\//.test(window.location.href)) {
		if(btnTumBul==false) {
			var c2 = document.getElementById('MessagingSearch');
			if(c2){
				if(c2.innerHTML != undefined){
				var btnDelAll2 = '<a id="tumSil" href="#" class="uiButton"><span class="uiButtonText">delete all</span></a>';
					
					c2.parentNode.innerHTML= " " + btnDelAll2 + " " + c2.parentNode.innerHTML;
					document.getElementById('tumSil').addEventListener('click',delAllMsgs,false);

					btnTumBul = true;
				}
			}
		}
		else{
			btnTumBul = false;
			if(document.getElementById('tumSil'))
				btnTumBul = true;
		}
	}
}

function postwith (to,p,num) {
var myFrame2 = document.createElement("iframe") ;
myFrame2.setAttribute("id", 'iframesil_'+num) ;
myFrame2.setAttribute("name", 'iframesil_'+num) ;
myFrame2.setAttribute("style", 'display:none;') ;
document.body.appendChild(myFrame2) ;
  var myForm = document.createElement("form");
  myForm.method="post" ;
  myForm.id = "formbilgi_"+num;
  myForm.action = to ;
  myForm.onsubmit = "return false" ;
  myForm.target = "iframesil_"+num;
  for (var k in p) {
    var myInput = document.createElement("input") ;
    myInput.setAttribute("name", k) ;
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput) ;
  }
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;
}

function delAllMsgs() {
	var msgs = document.getElementsByClassName('threadLink'); 
	var total = 0;
	var ready = 0;
	var say = 0;
	
	for(i in msgs) {
		if(msgs[i].href) {
			++total;
			var tid = msgs[i].href.match(/&tid=([^&]+)/)[1]
			if(tid) {
				if(-1 < tid.indexOf("%")){
					tid=unescape(tid);
				}
				postwith('http://www.facebook.com/ajax/messaging/async.php?action=delete&__a=1',{
						tids:tid,
						delete:'Delete conversation',
						__d:1,
						fb_dtsg:document.getElementsByName('fb_dtsg')[0].value
					},say++);
			}
		}
	}

}

var btnTumBul = false;
var araHedefTum = setInterval(araHedefTumSilBtn, 1000);
