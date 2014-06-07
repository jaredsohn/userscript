// ==UserScript==
// @name           IGN Boards: Hidden Poll Option
// @description    Display the hidden option in board polls
// @namespace      http://yabd.org/
// @include        http://*boards.ign.com/*
// @include        http://blogs.ign.com/*
// @version        1.1.1
// @icon	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAKlBMVEXz8/Pf3987gaNGptdJwf43t/ciouISktMkYjcrgUUsmU4ilUUUiTgMfy/vZI6zAAAAe0lEQVR4Xo2Q0Q2AIAxECxPABgR3cxb985vhGjfACVCCaHItJr7P17ukOesIMJYETcROuEUk33FNWA4oKihK3EWCSVXWztYFoIXxgMOE+OMRXgjDDoSunPEQiUyqkm4+Pj0zcIw/XV5w5EobeQ4oKihK2kWCSVWmlz8jX4KXNlKM8mM7AAAAAElFTkSuQmCC
// ==/UserScript==

var poll = document.getElementById("boards_poll_wrapper");
if (poll != null) {
	var polloptions = document.evaluate('//div[@class="boards_poll_result_answer"]', poll, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var realvotes = 0;
	var numoptions = 0;
	var finaloption;
	
	for (var j=0; j<polloptions.snapshotLength; j++) {
		finaloption = polloptions.snapshotItem(j);
		var votestr = finaloption.textContent;
		var par = votestr.lastIndexOf('(');
		if (par >= 0) {
			realvotes += parseInt(votestr.substr(par+1));
			numoptions++;
		}
	}
	var pollentries = document.evaluate('.//div[@class="boards_poll_info"]', poll, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var pollentry = pollentries.snapshotItem(0);
	var totalvotes = 0;
	var match = /\s(\d+)\s/.exec(pollentry.textContent);
	totalvotes = parseInt(match[1]);
	var votebuttons = document.evaluate('.//div[@class="boards_poll_vote_button"]', poll, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var votebutton = votebuttons.snapshotItem(0);
	var canvote = (votebuttons.snapshotLength > 0) && (numoptions < 11);
	if (numoptions < 2 || realvotes < totalvotes) {
		var wrapper = document.createElement("div");
		// boards erroneously use id instead of class
		wrapper.id = (numoptions % 2 == 0) ? "boards_poll_result_wrapper" : "boards_poll_result_wrapper_alt";
		wrapper.setAttribute("class", "hiddenoption");
		
		if (canvote) {
			var indiv = document.createElement("div");
			indiv.setAttribute("class", "boards_poll_result_radio_choice");
			var in1 = document.createElement("input");
			in1.setAttribute("type", "radio");
			in1.id = "answer";
			in1.setAttribute("value", numoptions+1);
			in1.setAttribute("name", "answer");
			in1.setAttribute("style", "margin-left:5px;margin-right:15px");
			indiv.appendChild(in1);
			wrapper.appendChild(indiv);
		}
		
		var choicerow = document.createElement("div");
		choicerow.setAttribute("class", "boards_poll_choice_row");
		var answer = document.createElement("div");
		answer.setAttribute("class", "boards_poll_result_answer");
		var hiddenvotes = totalvotes - realvotes;
		answer.appendChild(document.createTextNode("Hidden Option (" + hiddenvotes + " vote" +
			(hiddenvotes == 1 ? "" : "s") + ")"));
		var cleardiv = document.createElement("div");
		cleardiv.setAttribute("class", "clear");
		choicerow.appendChild(answer);
		choicerow.appendChild(cleardiv);
		wrapper.appendChild(choicerow);
		
		var bar = document.createElement("div");
		bar.setAttribute("class", "boards_poll_results_bar_display");
		var bimg = document.createElement("img");
		bimg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALBAMAAACufOGlAAAAIVBMVEUMfy8RhDUUiTgcjz8hlUUpmUstmU4tkUwrgUUnbTwkYjc01auVAAAAEElEQVQIHWNZxcDA8p44DADk6AotgWTHzQAAAABJRU5ErkJggg==";
		bimg.setAttribute("height", "11px");
		bimg.setAttribute("width", Math.round(hiddenvotes * 100 / totalvotes) + "%");
		var percent = (Math.round(hiddenvotes * 10000 / totalvotes) / 100) + "%";
		bimg.setAttribute("title", percent);
		bimg.setAttribute("alt", percent);
		bar.appendChild(bimg);
		wrapper.appendChild(bar);
		// assumes there is a nextsibling, there always is though.
		poll.insertBefore(wrapper, finaloption.parentNode.parentNode.nextSibling);
	} else if (canvote) {
		var indiv = document.createElement("div");
		indiv.setAttribute("class", "boards_poll_result_radio_choice");
		var in1 = document.createElement("input");
		in1.setAttribute("type", "radio");
		in1.id = "answer";
		in1.setAttribute("value", numoptions+1);
		in1.setAttribute("name", "answer");
		in1.setAttribute("style", "margin-left:5px;margin-right:15px");
//		indiv.appendChild(in1);
		votebutton.insertBefore(in1, votebutton.firstChild);
//		btn.parentNode.insertBefore(indiv, btn);
	}
}
