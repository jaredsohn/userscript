// ==UserScript==
// @name           2kewlPoll4DU
// @namespace      2kewl
// ==/UserScript==

var du = document.getElementById("message-text"),
	n = document.createElement("span"),
	f = document.getElementById("form2"),
	bb = document.getElementById("ed_toolbar_message-text"),
	op = f && (document.title.indexOf("Post a New Thread") == 0 || document.title.indexOf("Edit Discussion Thread") == 0),
	thread = document.getElementsByClassName("kewlPollStart").length,
	reply = f && !op && document.title.indexOf("Edit Post") == -1,
	btnStyle = {
		backgroundColor: "red",
		borderColor: "black",
		borderWidth: "3px",
		borderStyle: "solid",
		padding: "2px",
		marginLeft: "2px",
		cursor: "pointer",
		textAlign: "center"
	},
	frmStyle = {
		backgroundColor: "lightyellow",
		display: "block",
		cursor: "default",
		borderColor: "black",
		borderWidth: "3px",
		borderStyle: "solid",
		padding: "5px"
	};

function addKewlPoll(){
	var kewl = document.getElementById("kewlPoll") || document.createElement("div"),
		txt = document.createElement("textarea"),
		p = document.createElement("p"),
		n = document.createElement("span"),
		s = btnStyle;
	
	txt.id = "kewlPollChoices";
	txt.cols = "125";
	txt.rows = "14";
		
	s.width = "90px";
	stylize(n, s);

	n.innerHTML = "Create Poll";
	n.addEventListener("click", createKewlPoll, false);
	
	kewl.innerHTML = "";
	stylize(kewl, frmStyle);
	kewl.id = "kewlPoll";
	kewl.innerHTML = "Enter poll choices one per line:<br/>";
	kewl.appendChild(txt);
	kewl.appendChild(p);
	
	p.appendChild(n);
	
	du.parentNode.appendChild(kewl);
	du.style.display = "none";
};

function createKewlPoll(){
	var choices = document.getElementById("kewlPollChoices");
	
	removeKewlMarkup(du, "Poll");
	
	choices = choices.value.split("\n");	
	du.value += "[div class='kewlPollStart'][/div]";
	for (var i = 0; i < choices.length; i++){
		du.value += ("[div class='kewlChoice'][b]" + choices[i] + "[/b][div style='background-color:lightblue;margin:0 0 5px 0;padding:2px'][/div][/div]");
	}
	du.value += "[div class='kewlPollEnd'][/div]";
	document.getElementById("kewlPoll").style.display = "none";
	du.style.display = "block";
};

function removeKewlMarkup(n, x){
	var v0 = n.value,
		i0 = v0.indexOf("[div class='kewl" + x + "Start'"),
		s = "[div class='kewl" + x + "End'][/div]";

	if (i0 > -1){
		var i1 = v0.indexOf(s),
			v1 = v0.substr(0, i0);
		
		v1 += v0.substr(i1 + s.length);
		n.value = v1;
	}
};

function voteKewlPoll(){
	var choices = document.getElementsByClassName("kewlChoice"),
		ballot = document.getElementById("kewlBallot") || document.createElement("form"),
		p = document.createElement("p"),
		n = document.createElement("span"),
		s = btnStyle;

	if (!ballot.firstChild){
		for (var i = 0; i < choices.length; i++){
			var r = document.createElement("input"),
				s = document.createElement("span");

			r.value = i;
			r.name = "kewlVote";
			r.type = "radio";
			r.className = "kewlRadio";
			s.innerHTML = choices[i].innerHTML + "<br/>";
			ballot.appendChild(r);
			ballot.appendChild(s);
		}

		stylize(n, btnStyle);
		n.innerHTML = "Cast My Ballot";
		n.addEventListener("click", castKewlBallot, false);
	
		p.appendChild(n);
		
		ballot.id = "kewlBallot";
		ballot.appendChild(p);

		du.parentNode.appendChild(ballot);
	}

	stylize(ballot, frmStyle);
	
	du.style.display = "none";
};

function castKewlBallot(){
	var t = document.getElementById("title"),
		choices = document.getElementsByClassName("kewlRadio"),
		v;
	
	removeKewlMarkup(du, "Vote");

	for (var i = 0; i < choices.length; i++){
		var c = choices[i];
		if (c.checked){
			v = c.value;
			break;
		}
	}
	
	du.value += "[div class='kewlVoteStart' style='display:none;'][div class='kewlVote']" + v + "[/div][div class='kewlVoteEnd'][/div]";
	
	document.getElementById("kewlBallot").style.display = "none";
	du.style.display = "block";
	
	t.value = t.value || ".";
};

function resultsKewlPoll(){
	var choices = document.getElementsByClassName("kewlChoice"),
		votes = document.getElementsByClassName("kewlVote"),
		kewl = document.getElementsByClassName("kewlPollStart"),
		results = {};

	for (var i = 0; i < choices.length; i++){
		results[i] =  0;
		results.total = 0;
	}		

	for (var i = 0; i < votes.length; i++){
		results[votes[i].innerHTML]++;
		results.total++;
	}

	for (var i = 0; i < choices.length; i++){
			console.debug(i,choices[i],choices[i].innerHTML);
		var n = choices[i].lastChild,
			p = 100 * results[i]/(results.total || 1);
						
		n.innerHTML = Math.round(p) + "%";
		n.style.width = (5 * p) + "px";
	}
	
	for (var i = 0; i < kewl.length; i++){
		kewl[i].innerHTML = "<p><b>" + results.total + " votes cast</b></p>";
	}		
};

function stylize(n, props){
	for (var p in props){
		n.style[p] = props[p];
	}
};


if (op){
	stylize(n, btnStyle);
	n.innerHTML = "Add/Edit My Poll";
	n.addEventListener("click", addKewlPoll, false);
	bb.firstChild.appendChild(n);
}else if (reply){
	stylize(n, btnStyle);
	n.innerHTML = "Vote";
	n.addEventListener("click", voteKewlPoll, false);
	bb.firstChild.appendChild(n);
}else if (thread){
	resultsKewlPoll();
}