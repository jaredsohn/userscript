// ==UserScript==
// @name        addundigg
// @namespace  http://userscripts.com
// @description Adds an "undigg" option for every digg story you have dugg so you don't have to go into your profile to undigg.
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==

//Find the username
if (document.body.innerHTML.match(/Add Your Comment/)) { //make sure this is a story page

if (document.body.innerHTML.match(/<li class="digg-it" id="diglink1"><span>dugg!<\/span><\/li>/)) {// make sure story has been dugg

if (document.body.innerHTML.match(/<li><a href="\/users\/([a-zA-Z0-9]+)">\1 profile<\/a><\/li>/)) { // make sure user is logged on

var username = RegExp.$1;

 

//Find the digg #..reportj(230939<--that is the number

document.body.innerHTML.match(/.*reportj\(([0-9]{6}).*/);

var diggid = RegExp.$1;
GM_log(diggid);
 //Create the URL that will undigg the story

var undiggurl = "http://digg.com/undig/" + username + "/" + diggid;

 

//Insert the undigg URL into the page

//Format of the thing to add: <span class="tool">category: <a href="/gaming">gaming</a></span>

var category = document.getElementsByTagName("span")[0];

var categoryParent = category.parentNode;

var thingtoinsertbefore = category.nextSibling;

var toInsert = document.createElement("span");

toInsert.innerHTML = "<a href=\"" + undiggurl + "\">undigg</a>";

toInsert.setAttribute("class", "tool");

categoryParent.insertBefore(toInsert, thingtoinsertbefore);

// Remove undigg link
document.addEventListener('click', function(event) {
    if (event.target.getAttribute('href') == undiggurl) {
		event.target.parentNode.removeChild(event.target);
	}

}, true);

}}} //End ifs, makes sure the user is logged on

// Auto add undigg link
if (document.body.innerHTML.match(/Add Your Comment/)) { //make sure this is a story page

if (document.body.innerHTML.match(/<li><a href="\/users\/([a-zA-Z0-9]+)">\1 profile<\/a><\/li>/)) { // make sure user is logged on

var username = RegExp.$1;
document.body.innerHTML.match(/.*reportj\(([0-9]{6}).*/);

var diggid = RegExp.$1;
// Remove undigg link
document.addEventListener('click', function(event) {
    if (event.target.getAttribute('href').match(/javascript:wrapper_full\([0-9],[0-9],[0-9]{5,},[0-9],[0-9],[0-9]\)/)) {
		var undiggurl = "http://digg.com/undig/" + username + "/" + diggid;

	var category = document.getElementsByTagName("span")[0];

	var categoryParent = category.parentNode;

	var thingtoinsertbefore = category.nextSibling;

	var toInsert = document.createElement("span");

	toInsert.innerHTML = "<a href=\"" + undiggurl + "\">undigg</a>";

	toInsert.setAttribute("class", "tool");

	categoryParent.insertBefore(toInsert, thingtoinsertbefore);

// Remove undigg link
document.addEventListener('click', function(event) {
    if (event.target.getAttribute('href') == undiggurl) {
		event.target.parentNode.removeChild(event.target);
	}

}, true);
	}

}, true);

}} //End ifs,
/*var addScript = document.createElement("script");
addScript.setAttribute("type", "text/javascript");
addScript.setAttribute("language", "javascript");
addScript.innerHTML = "function addUndigg() {" + atob("Ly9GaW5kIHRoZSB1c2VybmFtZQ0KaWYgKGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MLm1hdGNoKC9D b21tZW50Jm5ic3A7VmlldyZuYnNwO1RocmVzaG9sZDombmJzcDsvKSkgeyAvL21ha2Ugc3VyZSB0 aGlzIGlzIGEgc3RvcnkgcGFnZQ0KDQppZiAoZG9jdW1lbnQuYm9keS5pbm5lckhUTUwubWF0Y2go LzxsaSBjbGFzcz0iZGlnZy1pdCIgaWQ9ImRpZ2xpbmsxIj48c3Bhbj5kdWdnITxcL3NwYW4+PFwv bGk+LykpIHsvLyBtYWtlIHN1cmUgc3RvcnkgaGFzIGJlZW4gZHVnZw0KDQppZiAoZG9jdW1lbnQu Ym9keS5pbm5lckhUTUwubWF0Y2goLzxsaT48YSBocmVmPSJcL3VzZXJzXC8oW2EtekEtWjAtOV0r KSI+XDEgcHJvZmlsZTxcL2E+PFwvbGk+LykpIHsNCg0KdmFyIHVzZXJuYW1lID0gUmVnRXhwLiQx Ow0KDQogDQoNCi8vRmluZCB0aGUgZGlnZyAjLi5yZXBvcnRqKDIzMDkzOTwtLXRoYXQgaXMgdGhl IG51bWJlcg0KDQpkb2N1bWVudC5ib2R5LmlubmVySFRNTC5tYXRjaCgvLipyZXBvcnRqXCgoWzAt OV17Nn0pLiovKTsNCg0KdmFyIGRpZ2dpZCA9IFJlZ0V4cC4kMTsNCkdNX2xvZyhkaWdnaWQpOw0K IC8vQ3JlYXRlIHRoZSBVUkwgdGhhdCB3aWxsIHVuZGlnZyB0aGUgc3RvcnkNCg0KdmFyIHVuZGln Z3VybCA9ICJodHRwOi8vZGlnZy5jb20vdW5kaWcvIiArIHVzZXJuYW1lICsgIi8iICsgZGlnZ2lk Ow0KDQogDQoNCi8vSW5zZXJ0IHRoZSB1bmRpZ2cgVVJMIGludG8gdGhlIHBhZ2UNCg0KLy9Gb3Jt YXQgb2YgdGhlIHRoaW5nIHRvIGFkZDogPHNwYW4gY2xhc3M9InRvb2wiPmNhdGVnb3J5OiA8YSBo cmVmPSIvZ2FtaW5nIj5nYW1pbmc8L2E+PC9zcGFuPg0KDQp2YXIgY2F0ZWdvcnkgPSBkb2N1bWVu dC5nZXRFbGVtZW50c0J5VGFnTmFtZSgic3BhbiIpWzBdOw0KDQp2YXIgY2F0ZWdvcnlQYXJlbnQg PSBjYXRlZ29yeS5wYXJlbnROb2RlOw0KDQp2YXIgdGhpbmd0b2luc2VydGJlZm9yZSA9IGNhdGVn b3J5Lm5leHRTaWJsaW5nOw0KDQp2YXIgdG9JbnNlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50 KCJzcGFuIik7DQoNCnRvSW5zZXJ0LmlubmVySFRNTCA9ICI8YSBocmVmPVwiIiArIHVuZGlnZ3Vy bCArICJcIj51bmRpZ2c8L2E+IjsNCg0KdG9JbnNlcnQuc2V0QXR0cmlidXRlKCJjbGFzcyIsICJ0 b29sIik7DQoNCiANCg0KY2F0ZWdvcnlQYXJlbnQuaW5zZXJ0QmVmb3JlKHRvSW5zZXJ0LCB0aGlu Z3RvaW5zZXJ0YmVmb3JlKTsNCg0KfX19IC8vRW5kIGlmcywgbWFrZXMgc3VyZSB0aGUgdXNlciBp cyBsb2dnZWQgb24=" + "}"); 

document.head.insertBefore(addScript, document.head.childNodes[0]);*/
//window.setInterval(atob("Ly9GaW5kIHRoZSB1c2VybmFtZQ0KaWYgKGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MLm1hdGNoKC9D b21tZW50Jm5ic3A7VmlldyZuYnNwO1RocmVzaG9sZDombmJzcDsvKSkgeyAvL21ha2Ugc3VyZSB0 aGlzIGlzIGEgc3RvcnkgcGFnZQ0KDQppZiAoZG9jdW1lbnQuYm9keS5pbm5lckhUTUwubWF0Y2go LzxsaSBjbGFzcz0iZGlnZy1pdCIgaWQ9ImRpZ2xpbmsxIj48c3Bhbj5kdWdnITxcL3NwYW4+PFwv bGk+LykpIHsvLyBtYWtlIHN1cmUgc3RvcnkgaGFzIGJlZW4gZHVnZw0KDQppZiAoZG9jdW1lbnQu Ym9keS5pbm5lckhUTUwubWF0Y2goLzxsaT48YSBocmVmPSJcL3VzZXJzXC8oW2EtekEtWjAtOV0r KSI+XDEgcHJvZmlsZTxcL2E+PFwvbGk+LykpIHsNCg0KdmFyIHVzZXJuYW1lID0gUmVnRXhwLiQx Ow0KDQogDQoNCi8vRmluZCB0aGUgZGlnZyAjLi5yZXBvcnRqKDIzMDkzOTwtLXRoYXQgaXMgdGhl IG51bWJlcg0KDQpkb2N1bWVudC5ib2R5LmlubmVySFRNTC5tYXRjaCgvLipyZXBvcnRqXCgoWzAt OV17Nn0pLiovKTsNCg0KdmFyIGRpZ2dpZCA9IFJlZ0V4cC4kMTsNCkdNX2xvZyhkaWdnaWQpOw0K IC8vQ3JlYXRlIHRoZSBVUkwgdGhhdCB3aWxsIHVuZGlnZyB0aGUgc3RvcnkNCg0KdmFyIHVuZGln Z3VybCA9ICJodHRwOi8vZGlnZy5jb20vdW5kaWcvIiArIHVzZXJuYW1lICsgIi8iICsgZGlnZ2lk Ow0KDQogDQoNCi8vSW5zZXJ0IHRoZSB1bmRpZ2cgVVJMIGludG8gdGhlIHBhZ2UNCg0KLy9Gb3Jt YXQgb2YgdGhlIHRoaW5nIHRvIGFkZDogPHNwYW4gY2xhc3M9InRvb2wiPmNhdGVnb3J5OiA8YSBo cmVmPSIvZ2FtaW5nIj5nYW1pbmc8L2E+PC9zcGFuPg0KDQp2YXIgY2F0ZWdvcnkgPSBkb2N1bWVu dC5nZXRFbGVtZW50c0J5VGFnTmFtZSgic3BhbiIpWzBdOw0KDQp2YXIgY2F0ZWdvcnlQYXJlbnQg PSBjYXRlZ29yeS5wYXJlbnROb2RlOw0KDQp2YXIgdGhpbmd0b2luc2VydGJlZm9yZSA9IGNhdGVn b3J5Lm5leHRTaWJsaW5nOw0KDQp2YXIgdG9JbnNlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50 KCJzcGFuIik7DQoNCnRvSW5zZXJ0LmlubmVySFRNTCA9ICI8YSBocmVmPVwiIiArIHVuZGlnZ3Vy bCArICJcIj51bmRpZ2c8L2E+IjsNCg0KdG9JbnNlcnQuc2V0QXR0cmlidXRlKCJjbGFzcyIsICJ0 b29sIik7DQoNCiANCg0KY2F0ZWdvcnlQYXJlbnQuaW5zZXJ0QmVmb3JlKHRvSW5zZXJ0LCB0aGlu Z3RvaW5zZXJ0YmVmb3JlKTsNCg0KfX19IC8vRW5kIGlmcywgbWFrZXMgc3VyZSB0aGUgdXNlciBp cyBsb2dnZWQgb24=")+"GM_log('yo');", 1000); //1000 = 1 second

