// ==UserScript==
// @name           MMA Pro Fighter - Auto Sparring
// @namespace      MMA Pro Fighter - Auto Sparring
// @description    Automatically spars with all your friends, requires manual entry of friend IDs.
// @include        http://mmaprod-78065944.us-west-1.elb.amazonaws.com/?*
// ==/UserScript==

//--------------------------------------------
//  SET TO YOUR FRIENDS IDS
//--------------------------------------------
GM_setValue('Friends','1002300,2159836');
//--------------------------------------------

document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
};

function gotoNextFriend() {
 var Friend = GM_getValue('Friend',0);
 var Friends = GM_getValue('Friends').split(',');

 GM_setValue('Friend',Friend+1);

 if (Friends[Friend] == null || Friends[Friend] == '' || Friends[Friend] == 0) {GM_setValue('Friend',0); Friend = 0;}
 window.location = 'http://mmaprod-78065944.us-west-1.elb.amazonaws.com/?url=fighters/view/'+Friends[Friend];
}

function fireEvent(obj,evt){

        var fireOnThis = obj;
        if( document.createEvent ) {
          var evObj = document.createEvent('MouseEvents');
          evObj.initEvent( evt, true, false );
          fireOnThis.dispatchEvent(evObj);
        } else if( document.createEventObject ) {
          fireOnThis.fireEvent('on'+evt);
        }
}

if (document.title == 'MMA Pro Fighter') {

 if (window.location.href.indexOf("http://mmaprod-78065944.us-west-1.elb.amazonaws.com/?url=fighters/view/") != -1) {
  if (document.getElementsByClassName('sparring-link feedback small-redbutton rounded')[0].innerHTML == 'Spar!') fireEvent(document.getElementsByClassName('sparring-link feedback small-redbutton rounded')[0],'click');
  gotoNextFriend();
  return;
 }

 gotoNextFriend();
 
}