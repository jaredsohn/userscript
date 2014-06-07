// ==UserScript==
// @name           add_friends_message(beta)
// @namespace      Joework
// @include        http://*.facebook.com/*
// ==/UserScript==
var mess_comment = "[==Mafia Wars==]";
var friendlist = "Mafia";
var reset_time = 2000;

var check_mess,check_count;
check_count = 0;
function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function event(evntname, obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent(evntname, true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(evt);}
function check_message() {
		var mess_links, thisLink;
		mess_links = xpath("//a[contains(@onclick,'showMessage')]");
		for(var i = 0; i < mess_links.snapshotLength; i++) {
			thisLink = mess_links.snapshotItem(i);
			var addtolist = xpath("//span[contains(text(),'加至名單中')]");
			if(addtolist.snapshotLength>0) {
			event('mousedown', addtolist.snapshotItem(0));
				var userlist = xpath("//a[@class='UISelectList_Label' and contains(text(),'"+friendlist+"')]");
				if(userlist.snapshotLength>0) {
					event('mouseup', userlist.snapshotItem(0));
				}
			}
			if(thisLink){
				event('click', thisLink);
				var tas = xpath("//textarea");
				for(var j = 0; j < tas.snapshotLength; j++) {
					this_tas = tas.snapshotItem(j).name;
					if(this_tas.indexOf("essage_")>0){
						mess_tas = j;
					}
				}
				tas.snapshotItem(mess_tas).value = mess_comment;
				var send_links = xpath("//input[@name='connect']");
				event('click',send_links.snapshotItem(0));
				check_count +=1;
				t=setTimeout(check_reset,reset_time);
				//window.clearInterval(check_mess);
			}
		}
}
function check_reset(){
	clearTimeout(t);
	check_count = 0;
}
function check_action(){
	if(check_count == 0){
		check_mess = setTimeout(check_message,1000);
	}else{
		if(t == null){
			t=setTimeout(check_reset,reset_time);
		}
	}
}
document.addEventListener('mouseup', function(event) {
	check_action();
}, true);