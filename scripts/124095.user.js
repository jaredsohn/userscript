// ==UserScript==
// @name           TF2R Loss Counter
// @description    Counts the number of consecutive loss notifications in tf2r from start, that have not been removed
// @include        http://tf2r.com/notifications.html
// @updateURL      https://userscripts.org/scripts/source/124095.meta.js
// @version        1.4.3
// ==/UserScript==


var links234 = document.getElementsByClassName("notif");
var index = 0;
var losscounter = 0;
var wincounter = 0;

while(links234[index]) {
	if(links234[index].textContent.match("won")) {
		if(!losscounter) wincounter++;
		else break;
	}
	else if(links234[index].textContent.match("participated")) losscounter++;
	index++;
}
if(index){
	var ace = document.createElement("div");
	ace.setAttribute("class","nav_font_s");
	ace.setAttribute("id","counter");
	if(wincounter){
		ace.setAttribute("style","color: lime");
		ace.textContent = "Congratulations! After " + losscounter + " losses you have won " + wincounter + " items! ";
	}
	else{
		ace.setAttribute("style","color: red");
		ace.textContent = "You have lost " + losscounter + " consecutive raffles! ";
	}
	var base = document.createElement("span");
	base.setAttribute("style","cursor: pointer; color: aqua;");
	base.textContent = "CLEAR";
	base.addEventListener('click', function(){
		var notdel;
		var i;
		var total=0;
		var totdel = 0;
		var errors = "<br />";
		var numerrors = 0;
		
		function delnot(iid){
			var delobject = "deleteNotification=true&nid="+iid;
			var httpRequest = new XMLHttpRequest();
			
			httpRequest.onreadystatechange = function(){
				if (httpRequest.readyState === 4) {
					var jsobj = JSON.parse(httpRequest.responseText);
					if (jsobj.status == "ok") {
						links234[numerrors].parentNode.removeChild(links234[numerrors]);
						totdel++;
					}
					else if(jsobj.status == "fail") {
						errors += iid + " " + jsobj.message + "<br />";
						numerrors++;
					}
					ace.innerHTML = "Deleted " + totdel + " out of " + total + " notifications with " + numerrors + " errors." + errors;
				}
			};
			httpRequest.open('POST', 'http://tf2r.com/job.php', false);
			httpRequest.setRequestHeader('Accept', 'application/json, text/javascript, *');
			httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			httpRequest.send(delobject);
		}		

		total = links234.length;

		ace.setAttribute("style","color: cyan");
		while(links234[numerrors]){
			notdel = links234[numerrors].getElementsByClassName('notifDel');
			delnot(notdel[0].getAttribute('iid'));
		}
	},true);
	ace.appendChild(base);

	links234[0].parentNode.insertBefore(ace,links234[0]);
}

