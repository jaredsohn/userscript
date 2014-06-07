// ==UserScript==
// @name LIFE Mesajda Gulucuk
// @namespace http://userscripts.org/users/life
// @description OGame: LIFE Mesajda Gülücük
// @date 2012-07-03
// @version 4.1
// @creator LIFE
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=writemessage*
// @include http://*.ogame.*/game/index.php?page=alliance*
// @run-at document-end
// ==/UserScript==

function addSmiley(smiley) {
	var message = document.forms[0].text;
	var selStart = message.selectionStart, selEnd = message.selectionEnd;
	var str = " " + smiley;
	message.value = message.value.substring(0,selStart) + str + message.value.substring(selEnd);
	selStart += str.length;
	message.setSelectionRange(selStart,selStart);
	message.focus();
	document.getElementById("cntChars").textContent = message.textLength;
}

var strFunc = (function(){
	var smilies = new Array();
	smilies.push(new Array(":D","data:image/gif;base64,R0lGODlhDwAPALMAAAAAAP///4uYp52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///yH5BAEAAA8ALAAAAAAPAA8AQARa8EkJap0UgRA294AAPEBTmgyAGMAwUoNrhSIGOI3DLMpKvIDFbFipAVgdTjL0ss0wzl3vcJncTDdGolJwkRi4Rk676ooACpASdKZ+1h8joVBZ05okmmBffUQAADs="));
	smilies.push(new Array(":O","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVtoCSKQFmOpMIsi1kexSAAEvDYtwMoCFDQpIKQMJAJZigA5AFxNBg8AxDQcCybzygBCUAgEoBE4gAwApMuFNoJBZ9rywjTseDBaADrTUl/FWYADFUOOiVjBjKGCosuZWY1BgeSJkZIIyVHmSciIQA7"));
	smilies.push(new Array("?(","data:image/gif;base64,R0lGODlhDwAWAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8IycpJSkrJyktJystKSsvKy0vKy0xKy8xLS8xMTExLS8zLzEzP/78EwoHEwcKChMHBxMKCgcTBwoTGxYIKB8WOioaFQwEFw4KCAgEEggEHAgEJggEMAgEOggECAgSEggSHAgSJggSMAgSOggSCAggEgggHAggJgggMAggOgggCAguEgguHAguJgguMAguOgguCAg8Egg8HAg8Jgg8MAg8Ogg8HxMMIxUOCBIEEhIEHBIEJhIEMBIEOhIECBISEhISHBISJhISMBISOhISCBIgEhIgHBIgJhIgMBIgOhIgCBIuEhIuHBIuJhIuMBIuOhIuCBI8EhI8HBI8JhI8MBI8OhI8JhcQKhkTCBwEEhwEHBwEJhwEMBwEOhwECBwSEhwSHBwSJhwSMBwSOhwSCBwgEhwgHBwgJhwgMBwgOhwgCBwuEhwuHBwuJhwuMBwuOhwuCBw8Ehw8HBw8Jhw8MBw8Ohw8LB0YLyIaCCYEEiYEHCYEJiYEMCYEOiYECCYSEiYSHCYSJiYSMCYSOiYSCCYgEiYgHCYgJiYgMCYgOiYgCCYuEiYuHCYuJiYuMCYuOiYuCCY8EiY8HCY8JiY8MCY8OiY8MiQbNCgdCDAEEjAEHDAEJjAEMDAEOjAECDASEjASHDASJjASMDASOjASCDAgEjAgHDAgJjAgMDAgOjAgCDAuEjAuHDAuJjAuMDAuOjAuCDA8EjA8HDA8KbK8MDA8OjA8NiogOCwkCDoEEjoEHDoEJjoEMDoEOjoECDoSEjoSHDoSJjoSMDoSOjoSCDogEjogHDogJjogMDogOjogCDouEjouHDouJjouMDcwOjouCDo8Ejo8HDo8Jjo8MDo8Ojo8OjAnPDUuAA4AABgAACgAADQANDQAKCgAGBgADg4ADgAAGAAAKAAANAAANAA0KAAoGAAYDgAOAAAOAAAYAAAoAAA0P/78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAPoALAAAAAAPABYABwifAPXpmyBQIMGCBwcqVHiQYMKFBgtCfEhRosWLEisixMgRI4CPHzl+lCAhwgMHISUCqEChAkmTDhoAKLiyZUsJEE7GnKkPQMuPFHB+3NlTAsuPLiEMbaBgpNGbJU82YNAUQASSWGHGXFD1QQQIYLVurerggVmzDtIu4Nq0Z1qUIAGw5QmgAcqYDRosAKCgrcC6eRms7euXJl/CVUXGtRgQADs="));
	smilies.push(new Array("8-)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVqoCSKQFmOpMIsLKMkyFEMAiABT1Q+zlLKNlJhSBjQBDUUAPKAOBouhCEIaDhM2BIhCUAgAInwYQBABpVYFPrpSpxGy1yzp4gVbNnSNQ9gWEtQCiUGNCUJCoiIMGNHeAYHB1lISXBlkzVnIQA7"));
	smilies.push(new Array(";(","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVtoCSKQFmOpMIsrIkcwSAAEvBE5eMs5VHQpILQJCgCSZAHxNFgKBAGIKDhSC6bTwNhVkMgEqaSjIuqhcujEtMJPtaSEeXu6aMBqjb54gkozAAMVA5rCgkwMiUJCothAANjdgYHB41FZCQAlkZHIQA7"));
	smilies.push(new Array("8o","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIsLKMkyFEMAiABT6A/zqIHBRupQDQJjkIS5AFxNFwIgxDQcPycjB+hdkMgEgnTgMZF3UxJcwn7Oo0Aywizp4gFbw5IABBo+vgFNQAMVQ5sCQcGNCUJCo4KJgdjSDcGB5cAQWRlJABHn24SIQA7"));
	smilies.push(new Array(":]","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIAy8IoCXIAgwBIwGM+zmIWN1JhSBjUBDYUAPKAOBovhCEIaDiYTqhCSkgCEIiEOHEwIoNKExqFAzxfidNo+Yg0e9sDEHd9+J0LeQU2AAwNbm8wMzUlCQoKaiZHNwAGB5cGQ0dJcwBIn3ISIQA7"));
	smilies.push(new Array(":(","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAV0YCSKQFmOpMIsLKMkyFEMAhABD/48zqIggIKNVCgSBjRBDQWA5BwNBgBhGAIaDkgJKgUYCMspMEE+DADKIdOkRt0A3Ndp1Mw9ID0FQGaDO0t4CyUyNQAMWA5xCQcGNCUJCpFsAEhpNwYHmQZFSUt0aEppaiEAOw=="));
	smilies.push(new Array("=)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIAy8IoCXIAgwBIwBM9ubMAssKNVCgSBjWBDQWAPCCOxgthGAIaDicguqISlkAEIEE+DADKIdOkRuG2Uthp1NQ1fcCDEJd98KA/QTYADFgOVy8ABwY1JQkKAAqSMWZoYAYHM2xKS3SWnHMSIQA7"));
	smilies.push(new Array("X(","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsi1kexSAAEvBE5QO0AEyThSBhIBPMUACIztFgABCGH6DhUEKYDAWUcHwCEuDEgQg4omqu86iEVSROa2VkCdD6alVd0sGDzQAMVA5tYgYyJQkKCnVuCAcARTQABgeVBkFFZiRlRkZwEiEAOw=="));
	smilies.push(new Array(":)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsLKMkyFEMAiABT1Q+zlLKNlJhSBjQBDUUAPKAOBouhCEIaDiYTqhCSkgCEAhAYnwYAJBBpSmNugGersRptMw1e1vg7fooOX0AMjUADFYOcC8HBjQlCQoACpEwZWdeBgcHa5VJdJtoaSEAOw=="));
	smilies.push(new Array(":P","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzG5/kTlCS////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAPAA8AQAVzICWKQFmOpMIAy8IoCXIAgwBQwBOVj7OUh8KNVCiaBMghCfKAOBovhGEIaDiYTqhCSrDhEIgEQDKR0JIokkmZLj1fYjaAGWn6tsEb4PooOX8AQTYADFYObzAHBjUlCQoKayY1XgAGBzMSmQBIXiMlnElKIQA7"));
	smilies.push(new Array(";)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsLKMkyFEMAiABD/7kSynbpIKQMKAJaigA5AFxNFwIAxDQcCybT0WUgAQgEICE+DAAHIFJExp1AzhdidNI+YgwHQvt72bNlfA+BTUADFUOby8HBjQlCQoACpEwZGZdBgcHapVIc5tnaCEAOw=="));
	smilies.push(new Array(":rolleyes:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAVrYCSKQFmOpMIsJaMkZTEIQAQ8JuDkRU0WQMJgJqChAJAHxNFwIQw+QAOp3DmhRgACkegmDgNA0XfMocpMF4xsS5aWLMChZ9vhkID4QdyaOqwAXwAzJQkKh4cJCGBENQAGB3s5RUYjJZRjZCEAOw=="));
	smilies.push(new Array(":baby:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///5ums6SuuqOtuamyvay1wKu0v4uYp5Whrp6ptZ2otK+4wrC5w7nByre/yHeHmLK7xLzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAAPAA8AAAVw4CSKQFmO6FRGAFMMJwo4jwM0wKsA4/xINYDhRVjwVL+HMjIcFHmACK3kYJaKiFJDumowSgpBtrWNRLxERWJcYBgMputiXRoUCoCDXg9YZ1UDMAcQhAcACH8qCgR5e4aIRyoLRnGQKSWImTEpKnEpIQA7"));
	smilies.push(new Array(":evil:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIsLKMkyFEMAiABT/k8zqKUBRupQCQMSoIaCgB5QBwNF8IgBDQcEFPDZCAoAQhEYpw4HAFK1M0kVK+hrsRpxHxEnD1FLHjD5pg9JTI1AAxXDnAvBwY0JQkKkJAwZmhfBgeYBkRIaSSVSYQjIQA7"));
	smilies.push(new Array(":tongue:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAVtYCSKQFmOpAIsLKMkyFEAAhABD/48zqIggNkoWCgQBgOB0jaEPCCOhgthYAIaDidU+jMQajcEImEqJcGoWzk9BERdZCbJaXKYZDa3cwf1xQo1AAxYDm8vBwZJJQkqZWVLNwYHkyZnaCQ0SktyIQA7"));
	smilies.push(new Array(":supa:","data:image/gif;base64,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"));
	smilies.push(new Array(":ra:","data:image/gif;base64,R0lGODlhJwASAPcAAAAAAAAAVQAAqv///wAkAAAkVQAkqgAk/wBJAABJVQBJqgBJ/wBtAABtVQBtqgBt/wCSAACSVQCSqgCS/wC2AAC2VQC2qgC2/wDbAADbVQDbqgDb/wD/AAD/VQD/qgD//yQAACQAVSQAqiQA/yQkACQkVSQkqiQk/yRJACRJVSRJqiRJ/yRtACRtVSRtqiRt/ySSACSSVSSSqiSS/yS2ACS2VSS2qiS2/yTbACTbVSTbqiTb/yT/ACT/VST/qiT//0kAAEkAVUkAqkkA/0kkAEkkVUkkqkkk/0lJAElJVUlJqklJ/0ltAEltVUltqklt/0mSAEmSVUmSqkmS/0m2AEm2VUm2qkm2/0nbAEnbVUnbqknb/0n/AEn/VUn/qkn//20AAG0AVW0Aqm0A/20kAG0kVW0kqm0k/21JAG1JVW1Jqm1J/21tAG1tVW1tqm1t/22SAG2SVW2Sqm2S/222AG22VW22qm22/23bAG3bVW3bqm3b/23/AG3/VW3/qm3//5IAAJIAVZIAqpIA/5IkAJIkVZIkqpIk/5JJAJJJVZJJqpJJ/5JtAJJtVZJtqpJt/5KSAJKSVZKSqpKS/5K2AJK2VZK2qpK2/5LbAJLbVZLbqpLb/5L/AJL/VZL/qpL//7YAALYAVbYAqrYA/7YkALYkVbYkqrYk/7ZJALZJVbZJqrZJ/7ZtALZtVbZtqrZt/7aSALaSVbaSqraS/7a2ALa2Vba2qra2/7bbALbbVbbbqrbb/7b/ALb/Vbb/qrb//9sAANsAVdsAqtsA/9skANskVdskqtsk/9tJANtJVdtJqttJ/9ttANttVdttqttt/9uSANuSVduSqtuS/9u2ANu2Vdu2qtu2/9vbANvbVdvbqtvb/9v/ANv/Vdv/qtv///8AAP8AVf8Aqv8A//8kAP8kVf8kqv8k//9JAP9JVf9Jqv9J//9tAP9tVf9tqv9t//+SAP+SVf+Sqv+S//+2AP+2Vf+2qv+2///bAP/bVf/bqv/b////AP//Vf//qv///yH5BAEAAAMALAAAAAAnABIAQAjEAAcIFAigYMGBCBMqXIgQgBcA//5BjDjRoEWDETNSBAdOoKQ2DEOKHJkQgB+HJx96SQmA5ABJAtvAjFnyy5+LXx6OvAiAY0iHXrx88TP0z0mXA0DS9BiJ4EOeFr+0JDnz502JGSFCnagxa0+fIi8iHTuwoJ+VQQ+S3bmyoE2pQKeOVJp0IF2TOYei9fPHqFSqMKtWHeCwYlaKOhVulVvyKlaKkLtK9gpWcVuuBdOWtKixIMeOdBs6/CP0KVmDa1OrXk0yIAA7"));

	var hasClass = function(element, className) {
		return ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1);
	}

	var funcSmilies = function() {
		var form = document.forms[0];
		if (!form) return;
		var div = document.createElement("div");
		for (var i = 0; i < smilies.length; i++) {
			div.innerHTML += "<a href=\"javascript:addSmiley('"+smilies[i][0].replace(/'/g,"\\'")+"')\"><img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' /></a> ";
		}
		div.style.textAlign = "center";
		div.style.height = "100px";
		div.style.overflow = "auto";
		var cell = form.text.parentNode.previousElementSibling;
		if (cell && cell.nodeName.toLowerCase() == "td") {
			div.style.width = "100%";
			cell.appendChild(document.createElement("br"));
			cell.appendChild(document.createElement("br"));
			cell.appendChild(div);
		} else {
			var message = form.text;
			var message_div = message.parentNode;
			var parentDiv = message_div;
			do {
				parentDiv = parentDiv.parentNode;
			}while(parentDiv && parentDiv.nodeName.toLowerCase() != "div");
			parentDiv.style.position = "relative";
			div.style.position = "absolute";
			div.style.width = "120px";
			div.style.marginLeft = "20px";
			if (hasClass(parentDiv, "textWrapperSmall")) {
				div.style.top = "10px";
			} else {
				div.style.top = "50%";
				div.style.marginTop = "-50px"; // -div.style.height / 2
			}
			message.style.width = "580px";
			message_div.style.width = "590px";
			message_div.style.marginLeft = "140px";
			message_div.parentNode.insertBefore(div, message_div);
		}
	}

	if (document.location.href.indexOf("page=alliance") != -1) {
		$("#eins").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

			funcSmilies();
		});
	} else {
		funcSmilies();
	}

	if (document.location.href.indexOf("page=showmessage") != -1) {
		var note = document.getElementById("messagebox").getElementsByClassName("note")[0];
		if (note && document.getElementById("melden")) {
			var rep_smilies = function(value,index) {
				for (var i = index; i < smilies.length; i++) {
					var pos = value.search(new RegExp(smilies[i][0].replace(/([\\[\](){}.+*?^$|-])/g,"\\$1"),"i"));
					if (pos != -1) {
						value = rep_smilies(value.substring(0,pos),i+1) + "<img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' />" + rep_smilies(value.substring(pos+smilies[i][0].length),i);
						break;
					}
				}
				return value;
			}

			var sort_smilies = function(a,b) { return b[0].length-a[0].length; }
			smilies.sort(sort_smilies);

			note.innerHTML = rep_smilies(note.innerHTML,0).replace(/&lt;3/g,"&#x2665;");
			initCluetip();
		}
	}
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = addSmiley.toString() + "\n(" + strFunc + ")();";
document.body.appendChild(script);

