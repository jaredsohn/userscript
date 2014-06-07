// ==UserScript==
// @name           facebook.com - friend facts - auto clicker
// @namespace      www.reeloo.net
// @description    silvers for you instantly - with question filtering
// @include        http://apps.facebook.com/friendfactoids/
// @include        http://apps.new.facebook.com/friendfactoids/
// ==/UserScript==


//question filtering
//
//if an answer is "Do You think that Mike sleeps with teddy bear?"
//choose the longest and most meaningful part of that sentece without friend name
//
//ie. "Do You think that" is wrong and not meaningful at all!
//ie. "sleeps with teddy bear" is just OK!
//
//so the line added would be:
//
//answers_yes.push("sleeps with teddy bear");
//for "yes" answers
//
//answers_no.push("sleeps with teddy bear");
//for "no" answers
//


//parts of questions answered "yes"
var answers_yes = new Array();
	answers_yes.push("sleeps with teddy bear");
	answers_yes.push("can keep a secret");
	answers_yes.push("has ever lied to avoid a date");
	answers_yes.push("to someone you are trying to impress");
	answers_yes.push("you travel around the world");
	answers_yes.push("has ever skinny-dipped");
	answers_yes.push("has ever lied to avoid a date");
	answers_yes.push("sings when drunk");
	answers_yes.push("parents/family");
	answers_yes.push("loyal friend");
	answers_yes.push("good friend");
	answers_yes.push("good athlete");
	answers_yes.push("is dependable?");
	answers_yes.push("has a nice smile?");
	answers_yes.push("is trustworthy?");
	answers_yes.push("is congenial?");
	answers_yes.push("is well-mannered?");
	answers_yes.push("will have beautiful children?");
	answers_yes.push("has a nice smile?");
	answers_yes.push("has a secret crush?");
	answers_yes.push("is cute?");
	answers_yes.push("has a nice smile?");
	answers_yes.push("is attractive?");
	answers_yes.push("is fashionable?");
	answers_yes.push("is charismatic?");
	answers_yes.push("an inviting smile?");
	answers_yes.push("you go skinny dipping");
	answers_yes.push("good in a bathing suit?");
	answers_yes.push("Have you ever had a dream about");
	answers_yes.push("have beautiful children?");
	answers_yes.push("well-dressed?");

//parts of questions answered "no"
var answers_no = new Array();
	answers_no.push("you embarassed to be around");
	answers_no.push("is superficial");
	answers_no.push("is a narcissist");
	answers_no.push("skipped out on a bar tab");
	answers_no.push("is vain?");
	answers_no.push("is naive?");
	answers_no.push("is outrageous?");
	answers_no.push("is reckless?");
	answers_no.push("is sassy?");
	answers_no.push("is a virgin?");


function doitall() {
	var question = document.getElementById("app51254684277_question_txt").innerHTML;
	var answered = false;
		
	//checks "don't notify this friend" 
	document.getElementById("app51254684277_nonotifs").checked = true;
	
	//if app runs out of questions
	if (question == ""){
		document.getElementById("auto_skip").click();
	}
	
	//if new question
	if (question != questionold){
		
		//"yes" answers		
		for (var i = 0; i < answers_yes.length; i++){
			if (question.indexOf(answers_yes[i]) >= 0){
				//document.getElementById("auto_yes").click();
				answered == true;
				break;
			}
		}
		
		//"no" answers
		if (answered == false){
			for (var i = 0; i < answers_no.length; i++){
				if (question.indexOf(answers_no[i]) >= 0){
					//document.getElementById("auto_no").click();
					answered == true;
					break;
				}
			}
		}
		
		//skip
		if (answered == false){
			document.getElementById("auto_skip").click();
		}
		
		//makes question old
		questionold = question;
	}
}


//waits till page is loaded completely
function starter(){
	if ( !document.getElementById("app51254684277_question_txt") ){
	}
	else{
		clearInterval(init);
		
		//creates clickable buttons
		var skip = document.getElementById("app51254684277_question_skip");
		var skip_onclick = skip.getAttribute("onclick");
		skip.parentNode.innerHTML = "<input type=\"button\" value=\"skip\" id=\"auto_skip\" onClick=\""+skip_onclick+"\" />"+skip.parentNode.innerHTML;
		
		var no = document.getElementById("app51254684277_question_no");
		var no_onclick = no.getAttribute("onclick");
		no.parentNode.innerHTML = "<input type=\"button\" value=\"no\" id=\"auto_no\" onClick=\""+no_onclick+"\" />"+no.parentNode.innerHTML;
		
		var yes = document.getElementById("app51254684277_question_yes");
		var yes_onclick = yes.getAttribute("onclick");
		yes.parentNode.innerHTML = "<input type=\"button\" value=\"yes\" id=\"auto_yes\" onClick=\""+yes_onclick+"\" />"+yes.parentNode.innerHTML;
		
		//unchecks "insert poll on friend's wall"
		document.getElementById("app51254684277_post_poll").checked = false;
		
		//hides "don't notify this friend" as it stays visualy unchecked (flustering), even thought it's checked in real
		document.getElementById("app51254684277_nonotif_wrapper").style.display = "none";
		
		//time in ms
		t = setInterval(doitall, 1000);
	}
}

//initiates
var questionold = "";
init = setInterval(starter, 1000);