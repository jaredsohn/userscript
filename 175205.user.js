// ==UserScript==
// @name Alerte sonore CCM
// @description Ajoute une notification sonore au forum commentcamarche.net
// @match http://www.commentcamarche.net/forum/*
// @updateURL http://userscripts.org/scripts/source/175205.user.js
// @version 1.1
// ==/UserScript==
// Changelog:
//  1.1: Requêtes asynchrones plutôt que synchrones, ça bloquait la page
//       et empêchait d'écrire toute les 10 secondes
//
// Par défaut, les scripts se lance à la fin, sauf si on précise @run-at document-start
// Aussi, fuck JQuery et autre, c'est lourdingue, NATIVE JS WINS EVERYTHING
// Le son vient de http://www.freesound.org/people/qubodup/sounds/168709/
// Découpé avec audacity, encodé en OGG Vorbis qualité -1.

var Update_Interval = 10000;

var sound = "data:audio/ogg;base64,T2dnUwACAAAAAAAAAAAIGg8pAAAAANQNt6kBHgF2b3JiaXMAAAAAAQB3AQAAAAAA/////wAAAADJ\
AU9nZ1MAAAAAAAAAAAAACBoPKQEAAAAGs61xDz3/////////////////NQN2b3JiaXMtAAAAWGlw\
aC5PcmcgbGliVm9yYmlzIEkgMjAxMDExMDEgKFNjaGF1ZmVudWdnZXQpAAAAAAEFdm9yYmlzH0JD\
VgEAAAEAFGNWKWaZUpJbihlzmDFnGWPUWoolhBRCKKVzVlurKbWaWsq5xZxzzpViUilFmVJQW4oZ\
Y1IpBhlTEltpIYQUQgehcxJbaa2l2FpqObacc62VUk4ppBhTiEromFJMKaQYU4pK6Jxz0DnmnFOM\
Sgg1lVpTyTGFlFtLKXROQgephM5SS7F0kEoHJXRQOms5lRJTKZ1jVkJquaUcU8qtpphzjIHQkFUA\
AAEAwEAQGrIKAFAAABCGoSiKAoSGrAIAMgAABOAojuIokiI5kmM5FhAasgoAAAIAEAAAwHAUSZEU\
y9EcTdIszdI8U5ZlWZZlWZZlWZZd13VdIDRkFQAAAQBAKAcZxRgQhJSyEggNWQUAIAAAAIIowxAD\
QkNWAQAAAQAIUR4h5qGj3nvvEXIeIeYdg9577yG0XjnqoaTee++99x5777n33nvvkWFeIeehk957\
7xFiHBnFmXLee+8hpJwx6J2D3nvvvfeec+451957752j3kHpqdTee++Vk14x6Z2jXnvvJdUeQuql\
pN5777333nvvvffee++9955777333nvvrefeau+9995777333nvvvffee++9995777333nvvgdCQ\
VQAAEAAAYRg2iHHHpPfae2GYJ4Zp56T3nnvlqGcMegqx9557773X3nvvvffeeyA0ZBUAAAgAACGE\
EFJIIYUUUkghhhhiyCGHHIIIKqmkoooqqqiiiiqqLKOMMsook4wyyiyjjjrqqMPOQgoppNJKC620\
VFtvLdUehBBCCCGEEEIIIYQQvvceCA1ZBQCAAAAwxhhjjEEIIYQQQkgppZRiiimmmAJCQ1YBAIAA\
AAIAAAAsSZM0R3M8x3M8x1M8R3RER3RER5RESbRETfREUTRFVbRF3dRN3dRNXdVN27VVW7ZlXddd\
XddlXdZlXdd1Xdd1Xdd1Xdd1XbeB0JBVAAAIAABhkEEGGYQQQkghhZRSijHGGHPOOSA0ZBUAAAgA\
IAAAAEBxFEdxHMmRJMmyLM3yLM8SNVMzNVNzNVdzRVd1Tdd0Vdd1Tdd0TVd0Vdd1XVd1Vdd1Xdd1\
Xdc0Xdd1XdN1Xdd1Xdd1Xdd1XRcIDVkFAEgAAOg4juM4juM4juM4jiQBoSGrAAAZAAABACiK4jiO\
4ziSJEmWpVma5VmiJmqiqIqu6QKhIasAAEAAAAEAAAAAACiWoimapGmaplmapmmapmmapmmapmma\
pmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmkaEBqyCgCQAABQcRzHcRzHkRzJkRxH\
AkJDVgEAMgAAAgBQDEdxHEeSLMmSNMuyNE3zRFF0TdU0XdMEQkNWAQCAAAACAAAAAABQLEmTNE3T\
NEmTNEmTNE3TNEfTNE3TNE3TNE3TNE3TNE3TNE3TNE3TNE3TNE3TNE3TNE3TLMuyLMuyLCA0ZCUA\
AAQAwFpttdbaKuUgpNoaoRSjGivEHKQaO+SUs9oy5pyT2ipijGGaMqOUchoIDVkRAEQBAADGIMcQ\
c8g5J6mTFDnnqHRUGggdpY5SZ6m0mmLMKJWYUqyNg45SRy2jlGosKXbUUoyltgIAAAIcAAACLIRC\
Q1YEAFEAAIQxSCmkFGKMOacYRIwpxxh0hjEGHXOOQeechFIq55h0UErEGHOOOaicg1IyJ5WDUEon\
nQAAgAAHAIAAC6HQkBUBQJwAgEGSPE/yNFGUNE8URVN0XVE0VdfyPNP0TFNVPdFUVVNVZdlUVVe2\
PM80PVNUVc80VdVUVdk1VVV2RVXVZdNVddlUVd12bdnXXVkWflFVZd1UXVs3VdfWXVnWfVeWfV/y\
PFX1TNN1PdN0XdV1bVt1Xdv2VFN2TdV1ZdN1Zdl1ZVlXXVm3NdN0XdFVZdd0Xdl2ZVeXVdm1ddN1\
fVt1XV9XZVf4ZVnXhVnXneF0XdtXXVfXVVnWjdmWdV3Wbd+XPE9VPdN0Xc80XVd1XdtWXdfWNdOU\
XdN1bVk0XVdWZVnXVVeWdc80Xdl0XVk2XVWWVdnVdVd2ddl0Xd9WXdfXTdf1bVu3jV+Wbd03Xdf2\
VVn2fVV2bV/WdeOYddm3PVX1fVOWhd90XV+3fd0ZZtsWhtF1fV+VbV9YZdn3dV052rpuHKPrCr8q\
u8KvurIu7L5OuXVbOV7b5su2rRyz7gu/rgtH2/eVrm37xqzLwjHrtnDsxm0cv/ATPlXVddN1fd+U\
Zd+XdVsYbl0YjtF1fV2VZd9XXVkYblsXhlv3GaPr+sIqy76w2rIx3L4tDLswHMdr23xZ15WurGML\
v9LXjaNr20LZtoWybjN232fsxk4YAAAw4AAAEGBCGSg0ZEUAECcAYJEkUZQsyxQlyxJN0zRdVTRN\
15U0zTQ1zTNVTfNM1TRVVTZNVZUtTTNNzdNUU/M00zRVUVZN1ZRV0zRt2VRVWzZNVbZdV9Z115Vl\
2zRNVzZVU5ZNVZVlV3Zt2ZVlW5Y0zTQ1z1NNzfNMU1VVWTZV1XU1z1NVzRNN1xNFVVVNV7VV1ZVl\
y/NMVRM11/REU3VN17RV1VVl2VRV2zZNVbZV19VlV7Vd35Vt3TdNVbZN1bRd1XVl25VV3bVtW9cl\
TTNNzfNMU/M8UzVV03VNVXVly/NU1RNFV9U00XRVVXVl1XRVXfM8VfVEUVU10XNN1VVlV3VNXTVV\
03ZVV7Vl01RlW5ZlYXdV29VNU5Vt1XVt21RNW5Zt2RdeW/Vd0TRt2VRN2zZVVZZl2/Z1V5ZtW1RN\
WzZNV7ZVV7Vl2bZtXbZtXRdNVbZN1dRlVXVdXbZd3ZZl29Zd2fVtVXV1W9Zl35Zd3RV2X/d915Vl\
XZVV3ZZlWxdm2yXbuq0TTVOWTVWVZVNVZdmVXduWbVsXRtOUZdVVddc0VdmXbVm3ZdnWfdNUZVtV\
Xdk2XdW2ZVm2dVmXfd2VXV12dVnXVVW2dV3XdWF2bVl4XdvWZdm2fVVWfd32faEtq74rAABgwAEA\
IMCEMlBoyEoAIAoAADCGMecgNAo55pyERinnnJOSOQYhhFQy5yCEUFLnHIRSUuqcg1BKSqGUVFJq\
LZRSUkqtFQAAUOAAABBgg6bE4gCFhqwEAFIBAAyOY1meZ5qqquuOJHmeKKqq6/q+I1meJ4qq6rq2\
rXmeKJqm6sqyL2yeJ4qm6bqurOuiaZqmqrquLOu+KIqmqaqyK8vCcKqq6rquLNs641RV13VlW7Zt\
4VddV5Zt27Z1X/hV15Vl27ZtXReGW9d93xeGn9C4dd336cbRRwAAeIIDAFCBDasjnBSNBRYashIA\
yAAAIIxByCCEkEFIIaSQUkgppQQAAAw4AAAEmFAGCg1ZEQDECQAAiFBKKaXUUUoppZRSSimlklJK\
KaWUUkoppZRSSimlVFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSiml\
lFLqKKWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKqaSUUkoppZRSSimllFJKKaWUUkoppZRS\
SimllFJKKaWUUkoppZRSSimllFJKKaWUUUoppZRSSimllFJKKaWUSkoppZRSSimllFJKKaWUUkop\
pZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWU\
UkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJK\
KaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimV\
UkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUAgCkIhwApB5MKAOFhqwEAFIBAABjlFIKOuic\
Q4wx5pyTTjqIGHOMOSmptJQ5ByGUlFJKKXPOQQillJRa5hyEklJLLaXMOQilpJRaS52UUlKqqbUW\
QymltFRTTS2WlFKKqdYYY00ptdRai7XG2lJrrcUYa6w1tVZbjC3GWmsBADgNDgCgBzasjnBSNBZY\
aMhKACAVAAAxRinGnIMQOoOQUs5BByGEBiGmnHMOOugUY8w5ByGEECrGGHMOQgghZM45Bx2EEkLJ\
nHMOQgghlNJBCCGEEEoJpYMQQgghhFBKCKGEUEIopZQQQgghlFBKKSGEEkIpoZRSQgglhFBKKaUU\
AABY4AAAEGDD6ggnRWOBhYasBACAAAAgZaGGkCyAkGOQXGMYg1REpJRjDmzHnJNWROWUU05ERx1l\
iHsxRuhUBAAAIAgACDABBAYICkYhCBDGAAAEITJDJBRWwQKDMmhwmAcADxAREgFAYoKi1YUL0MUA\
LtCFuxwQgiAIgiAsGoACJMCBE9zgCW/wBDdwAh1FSR0EAAAAAIABAHwAABwUQEREcxUWFxgZGhsc\
HR4BAAAAAGACAB8AAMcHEBHRXIXFBUaGxgZHh0cAAAAAAAAAAAAQEBAAAAAAAAgAAAAQEE9nZ1MA\
BAj+AAAAAAAACBoPKQIAAACPvN9dLxppGBkbGRkaGhwcZCAfGiAfH2BiVlVPR0xIQUQ+REJERkdL\
SU5KTVRPSElQT0wyrNzXtqteiesCAKCY42jGZylAxUJ313tuVAJyyFUxigoYX/Qur1Jq/lejXrE9\
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"


function $(x) { return document.getElementById(x); }

function get_unread_posts() {
	var intervbox = $("myi_content").childNodes[1]; // 1 car le texte (espace?) est l'élément 0
	
	// au cas ou
	if (intervbox.tagName.toLowerCase() != "ul") {
		console.warn("CCM a du changer");
		return false;
	}
	
	var unread = [];
	var nodes = intervbox.childNodes;
	for (var i=0; i < nodes.length; i++) {
		var interv = nodes[i];
		if (interv.tagName && interv.tagName.toLowerCase() == "li") {
			var h3 = interv.childNodes[1]; // 1 car le texte (espace?) est l'élément 0
			var interv_link = h3.childNodes[3]; //get_elements(h3, "a")[1]
			var interv_child = interv_link.childNodes[0];
			var is_unread = (interv_child.tagName && interv_child.tagName.toLowerCase() == "strong");
			if (is_unread)
				unread.push(interv_link.href);
		}
	}
	return unread;
}

function update_topic_list(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://www.commentcamarche.net/forum/", true);
	xhr.send();
	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState==4 && xhr.status==200)
		{
			var new_document = document.implementation.createHTMLDocument("");
			new_document.documentElement.innerHTML = xhr.responseText;
			document.getElementById("myi_content").innerHTML = new_document.getElementById("myi_content").innerHTML;
			callback();
		}
	}
}

var ringed = [];
var loop_timeout;
function update_loop() {
	clearTimeout(loop_timeout);
	update_topic_list(function () {
		var unread = get_unread_posts();
		var do_ring = false;
		for (var i=0; i < unread.length; i++) {
			if(ringed.indexOf(unread[i]) === -1)
			{  
				ringed.push(unread[i]);
				do_ring = true;
			}
		}
		if (do_ring) {
			audio.play();
		}
		console.log("Liste topic mis a jour");
	});
	loop_timeout = setTimeout(update_loop, Update_Interval);
}

var audio = document.createElement("audio");
audio.src = sound;
ringed = get_unread_posts();
loop_timeout = setTimeout(update_loop, Update_Interval);