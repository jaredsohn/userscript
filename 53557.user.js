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
	answers_yes.push("Martin Hes pohodář?");
	 answers_yes.push("Kos pohodář?");
	   answers_yes.push("Pešák pohodář?");
	     answers_yes.push("Rysová pohodář?");
	       answers_yes.push("Pojezný Hes pohodář?");
	       answers_yes.push("Chládková Hes pohodář?");
	       answers_yes.push("Fryč pohodář?");
	       answers_yes.push("Petrů Hes pohodář?");
	       answers_yes.push("Pinková Hes pohodář?");
	       answers_yes.push("Millerová Hes pohodář?");
	       answers_yes.push("Krkušič Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       answers_yes.push("Martin Hes pohodář?");
	       
	       
	       
	 answers_yes.push("Bětka Michnová pěkné oči");
	   answers_yes.push("Najmanova pěkné oči");
	   answers_yes.push("Mesarosova pěkné oči");
	   answers_yes.push("Rysová pěkné oči");
	   answers_yes.push("Chládková pěkné oči");
	   answers_yes.push("Pinková pěkné oči");
	   answers_yes.push("Millerová pěkné oči");
	   answers_yes.push("Krkušič pěkné oči");
	   answers_yes.push("Kepplová pěkné oči");
	   answers_yes.push("Krulíková pěkné oči");
	   answers_yes.push("Heroutová pěkné oči");
	   answers_yes.push("Foltýnová pěkné oči");
	   answers_yes.push("Malinská pěkné oči");
	   answers_yes.push("Mazáčová pěkné oči");
	   answers_yes.push("Černá pěkné oči");
	   answers_yes.push("Němcová pěkné oči");
	   answers_yes.push("Thu pěkné oči");
	   answers_yes.push("Limberková pěkné oči");
	   answers_yes.push("Rosenberg pěkné oči");
	   answers_yes.push("Krauskopfová pěkné oči");
	   
	   
	  answers_yes.push("Bětka Michnová obléká pěkně");
	   answers_yes.push("Najmanova obléká pěkně");
	   answers_yes.push("Mesarosova obléká pěkně");
	   answers_yes.push("Rysová obléká pěkně");
	   answers_yes.push("Chládková obléká pěkně");
	   answers_yes.push("Pinková obléká pěkně");
	   answers_yes.push("Millerová obléká pěkně");
	   answers_yes.push("Krkušič obléká pěkně");
	   answers_yes.push("Kepplová obléká pěkně");
	   answers_yes.push("Krulíková obléká pěkně");
	   answers_yes.push("Heroutová obléká pěkně");
	   answers_yes.push("Foltýnová obléká pěkně");
	   answers_yes.push("Malinská obléká pěkně");
	   answers_yes.push("Mazáčová obléká pěkně");
	   answers_yes.push("Černá obléká pěkně");
	   answers_yes.push("Němcová obléká pěkně");
	   answers_yes.push("Thu obléká pěkně");
	   answers_yes.push("Limberková obléká pěkně");
	   answers_yes.push("Rosenberg obléká pěkně");
	   answers_yes.push("Krauskopfová obléká pěkně");
	   
	   
  answers_yes.push("Bětka Michnová pohodář");
	
	   answers_yes.push("Mesarosova pohodář");
	   answers_yes.push("Rysová pohodář");
	   answers_yes.push("Chládková pohodář");
	   answers_yes.push("Pinková pohodář");
	   answers_yes.push("Millerová pohodář");
	   answers_yes.push("Krkušič pohodář");
	   answers_yes.push("Kepplová pohodář");
	   answers_yes.push("Krulíková pohodář");
	   answers_yes.push("Heroutová pohodář");
	   answers_yes.push("Foltýnová pohodář");
	   answers_yes.push("Malinská pohodář");
	   answers_yes.push("Mazáčová pohodář");
	   answers_yes.push("Černá pohodář");
	   answers_yes.push("Němcová pohodář");
	   answers_yes.push("Thu pohodář");
	   answers_yes.push("Limberková pohodář");
	   answers_yes.push("Rosenberg pohodář");
	   answers_yes.push("Krauskopfová pohodář");
	   
	   
	   	 answers_yes.push("Bětka Michnová vypadá dobře v mini-sukni");
	   answers_yes.push("Najmanova vypadá dobře v mini-sukni");
	   answers_yes.push("Mesarosova vypadá dobře v mini-sukni");
	   answers_yes.push("Rysová vypadá dobře v mini-sukni");
	   answers_yes.push("Chládková vypadá dobře v mini-sukni");
	   answers_yes.push("Pinková vypadá dobře v mini-sukni");
	   answers_yes.push("Millerová vypadá dobře v mini-sukni");
	   answers_yes.push("Krkušič vypadá dobře v mini-sukni");
	   answers_yes.push("Kepplová vypadá dobře v mini-sukni");
	   answers_yes.push("Krulíková vypadá dobře v mini-sukni");
	   answers_yes.push("Heroutová vypadá dobře v mini-sukni");
	   answers_yes.push("Foltýnová vypadá dobře v mini-sukni");
	   answers_yes.push("Malinská vypadá dobře v mini-sukni");
	   answers_yes.push("Mazáčová vypadá dobře v mini-sukni");
	   answers_yes.push("Černá vypadá dobře v mini-sukni");
	   answers_yes.push("Němcová vypadá dobře v mini-sukni");
	   answers_yes.push("Thu vypadá dobře v mini-sukni");
	   answers_yes.push("Limberková vypadá dobře v mini-sukni");
	   answers_yes.push("Rosenberg vypadá dobře v mini-sukni");
	   answers_yes.push("Krauskopfová vypadá dobře v mini-sukni");
	   
	   
	   	    	 answers_yes.push("Bětka Michnová je sexy");
	   answers_yes.push("Najmanova je sexy");
	   answers_yes.push("Mesarosova je sexy");
	   answers_yes.push("Rysová je sexy");
	   answers_yes.push("Chládková je sexy");
	   answers_yes.push("Pinková je sexy");
	   answers_yes.push("Millerová je sexy");
	   answers_yes.push("Krkušič je sexy");
	   answers_yes.push("Kepplová je sexy");
	   answers_yes.push("Krulíková je sexy");
	   answers_yes.push("Heroutová je sexy");
	   answers_yes.push("Foltýnová je sexy");
	   answers_yes.push("Malinská je sexy");
	   answers_yes.push("Mazáčová je sexy");
	   answers_yes.push("Černá je sexy");
	   answers_yes.push("Němcová je sexy");
	   answers_yes.push("Thu je sexy");
	   answers_yes.push("Limberková je sexy");
	   answers_yes.push("Rosenberg je sexy");
	   answers_yes.push("Krauskopfová je sexy");
	   
	   
	   
	    answers_yes.push("Bětka Michnová v županu");
	   answers_yes.push("Najmanova v županu");
	   answers_yes.push("Mesarosova v županu");
	   answers_yes.push("Rysová v županu");
	   answers_yes.push("Chládková v županu");
	   answers_yes.push("Pinková v županu");
	   answers_yes.push("Millerová v županu");
	   answers_yes.push("Krkušič v županu");
	   answers_yes.push("Kepplová v županu");
	   answers_yes.push("Krulíková v županu");
	   answers_yes.push("Heroutová v županu");
	   answers_yes.push("Foltýnová v županu");
	   answers_yes.push("Malinská v županu");
	   answers_yes.push("Mazáčová v županu");
	   answers_yes.push("Černá v županu");
	   answers_yes.push("Němcová v županu");
	   answers_yes.push("Thu v županu");
	   answers_yes.push("Limberková v županu");
	   answers_yes.push("Rosenberg v županu");
	   answers_yes.push("Krauskopfová v županu");
	   
	   
	   	   	 answers_yes.push("Bětka Michnová má hezk");
	   answers_yes.push("Najmanova má hezk");
	   answers_yes.push("Mesarosova má hezk");
	   answers_yes.push("Rysová má hezk");
	   answers_yes.push("Chládková má hezk");
	   answers_yes.push("Pinková má hezk");
	   answers_yes.push("Millerová má hezk");
	   answers_yes.push("Krkušič má hezk");
	   answers_yes.push("Kepplová má hezk");
	   answers_yes.push("Krulíková má hezk");
	   answers_yes.push("Heroutová má hezk");
	   answers_yes.push("Foltýnová má hezk");
	   answers_yes.push("Malinská má hezk");
	   answers_yes.push("Mazáčová má hezk");
	   answers_yes.push("Černá má hezk");
	   answers_yes.push("Němcová má hezk");
	   answers_yes.push("Thu má hezk");
	   answers_yes.push("Limberková má hezk");
	   answers_yes.push("Rosenberg má hezk");
	   answers_yes.push("Krauskopfová má hezk");
	   
	   
	    	   	 answers_yes.push("Bětka Michnová svým rodičům či přátelům");
	   answers_yes.push("Najmanova svým rodičům či přátelům");
	   answers_yes.push("Mesarosova svým rodičům či přátelům");
	   answers_yes.push("Rysová svým rodičům či přátelům");
	   answers_yes.push("Chládková svým rodičům či přátelům");
	   answers_yes.push("Pinková svým rodičům či přátelům");
	   answers_yes.push("Millerová svým rodičům či přátelům");
	   answers_yes.push("Krkušič svým rodičům či přátelům");
	   answers_yes.push("Kepplová svým rodičům či přátelům");
	   answers_yes.push("Krulíková svým rodičům či přátelům");
	   answers_yes.push("Heroutová svým rodičům či přátelům");
	   answers_yes.push("Foltýnová svým rodičům či přátelům");
	   answers_yes.push("Malinská svým rodičům či přátelům");
	   answers_yes.push("Mazáčová svým rodičům či přátelům");
	   answers_yes.push("Černá svým rodičům či přátelům");
	   answers_yes.push("Němcová svým rodičům či přátelům");
	   answers_yes.push("Thu svým rodičům či přátelům");
	   answers_yes.push("Limberková svým rodičům či přátelům");
	   answers_yes.push("Rosenberg svým rodičům či přátelům");
	   answers_yes.push("Krauskopfová svým rodičům či přátelům");
	   
	   
	   	   
	    	   	 answers_yes.push("Bětka Michnová umí dobře líbat");
	   answers_yes.push("Najmanova umí dobře líbat");
	   answers_yes.push("Mesarosova umí dobře líbat");
	   answers_yes.push("Rysová umí dobře líbat");
	   answers_yes.push("Chládková umí dobře líbat");
	   answers_yes.push("Pinková umí dobře líbat");
	   answers_yes.push("Millerová umí dobře líbat");
	   answers_yes.push("Krkušič umí dobře líbat");
	   answers_yes.push("Kepplová umí dobře líbat");
	   answers_yes.push("Krulíková umí dobře líbat");
	   answers_yes.push("Heroutová umí dobře líbat");
	   answers_yes.push("Foltýnová umí dobře líbat");
	   answers_yes.push("Malinská umí dobře líbat");
	   answers_yes.push("Mazáčová umí dobře líbat");
	   answers_yes.push("Černá umí dobře líbat");
	   answers_yes.push("Němcová umí dobře líbat");
	   answers_yes.push("Thu umí dobře líbat");
	   answers_yes.push("Limberková umí dobře líbat");
	   answers_yes.push("Rosenberg umí dobře líbat");
	   answers_yes.push("Krauskopfová umí dobře líbat");
	   
	   
	   
	   	    	   	 answers_yes.push("Bětka Michnová tajného ctitele");
	   answers_yes.push("Najmanova tajného ctitele");
	   answers_yes.push("Mesarosova tajného ctitele");
	   answers_yes.push("Rysová tajného ctitele");
	   answers_yes.push("Chládková tajného ctitele");
	   answers_yes.push("Pinková tajného ctitele");
	   answers_yes.push("Millerová tajného ctitele");
	   answers_yes.push("Krkušič tajného ctitele");
	   answers_yes.push("Kepplová tajného ctitele");
	   answers_yes.push("Krulíková tajného ctitele");
	   answers_yes.push("Heroutová tajného ctitele");
	   answers_yes.push("Foltýnová tajného ctitele");
	   answers_yes.push("Malinská tajného ctitele");
	   answers_yes.push("Mazáčová tajného ctitele");
	   answers_yes.push("Černá tajného ctitele");
	   answers_yes.push("Němcová tajného ctitele");
	   answers_yes.push("Thu tajného ctitele");
	   answers_yes.push("Limberková tajného ctitele");
	   answers_yes.push("Rosenberg tajného ctitele");
	   answers_yes.push("Krauskopfová tajného ctitele");
	   
	   
	   	   
	   	    	   	 answers_yes.push("Bětka Michnová dobrý sportovec");
	   answers_yes.push("Najmanova dobrý sportovec");
	   answers_yes.push("Mesarosova dobrý sportovec");
	   answers_yes.push("Rysová dobrý sportovec");
	   answers_yes.push("Chládková dobrý sportovec");
	   answers_yes.push("Pinková dobrý sportovec");
	   answers_yes.push("Millerová dobrý sportovec");
	   answers_yes.push("Krkušič dobrý sportovec");
	   answers_yes.push("Kepplová dobrý sportovec");
	   answers_yes.push("Krulíková dobrý sportovec");
	   answers_yes.push("Heroutová dobrý sportovec");
	   answers_yes.push("Foltýnová dobrý sportovec");
	   answers_yes.push("Malinská dobrý sportovec");
	   answers_yes.push("Mazáčová dobrý sportovec");
	   answers_yes.push("Černá dobrý sportovec");
	   answers_yes.push("Němcová dobrý sportovec");
	   answers_yes.push("Thu dobrý sportovec");
	   answers_yes.push("Limberková dobrý sportovec");
	   answers_yes.push("Rosenberg dobrý sportovec");
	   answers_yes.push("Krauskopfová dobrý sportovec");

	
	
//parts of questions answered "no"
var answers_no = new Array();
	answers_no.push("Kuba Rozsypal v županu");
	answers_no.push("Petržilka v županu");
	
		  answers_yes.push("Bětka Michnová je panic");
	   answers_yes.push("Najmanova je panic");
	   answers_yes.push("Mesarosova je panic");
	   answers_yes.push("Rysová je panic");
	   answers_yes.push("Chládková je panic");
	   answers_yes.push("Pinková je panic");
	   answers_yes.push("Millerová je panic");

	   answers_yes.push("Kepplová je panic");
	   answers_yes.push("Krulíková je panic");
	   answers_yes.push("Heroutová je panic");
	   answers_yes.push("Foltýnová je panic");
	   answers_yes.push("Malinská je panic");
	   answers_yes.push("Mazáčová je panic");
	   answers_yes.push("Černá je panic");
	   answers_yes.push("Němcová je panic");
	   answers_yes.push("Thu je panic");
	   answers_yes.push("Limberková je panic");
	   answers_yes.push("Rosenberg je panic");
	   answers_yes.push("Krauskopfová je panic");
	   
	   
	   
	   
	  answers_yes.push("Bětka Michnová neměl/a nosit těsné oblečení");
	   answers_yes.push("Najmanova neměl/a nosit těsné oblečení");
	   answers_yes.push("Mesarosova neměl/a nosit těsné oblečení");
	   answers_yes.push("Rysová neměl/a nosit těsné oblečení");
	   answers_yes.push("Chládková neměl/a nosit těsné oblečení");
	   answers_yes.push("Pinková neměl/a nosit těsné oblečení");
	   answers_yes.push("Millerová neměl/a nosit těsné oblečení");
	   answers_yes.push("Krkušič neměl/a nosit těsné oblečení");
	   answers_yes.push("Kepplová neměl/a nosit těsné oblečení");
	   answers_yes.push("Krulíková neměl/a nosit těsné oblečení");
	   answers_yes.push("Heroutová neměl/a nosit těsné oblečení");
	   answers_yes.push("Foltýnová neměl/a nosit těsné oblečení");
	   answers_yes.push("Malinská neměl/a nosit těsné oblečení");
	   answers_yes.push("Mazáčová neměl/a nosit těsné oblečení");
	   answers_yes.push("Černá neměl/a nosit těsné oblečení");
	   answers_yes.push("Němcová neměl/a nosit těsné oblečení");
	   answers_yes.push("Thu neměl/a nosit těsné oblečení");
	   answers_yes.push("Limberková neměl/a nosit těsné oblečení");
	   answers_yes.push("Rosenberg neměl/a nosit těsné oblečení");
	   answers_yes.push("Krauskopfová neměl/a nosit těsné oblečení");
	   
	   
	   
	   
	   
	   	 answers_yes.push("Bětka Michnová povrchní");
	   answers_yes.push("Najmanova povrchní");
	   answers_yes.push("Mesarosova povrchní");
	   answers_yes.push("Rysová povrchní");
	   answers_yes.push("Chládková povrchní");
	   answers_yes.push("Pinková povrchní");
	   answers_yes.push("Millerová povrchní");
	   answers_yes.push("Krkušič povrchní");
	   answers_yes.push("Kepplová povrchní");
	   answers_yes.push("Krulíková povrchní");
	   answers_yes.push("Heroutová povrchní");
	   answers_yes.push("Foltýnová povrchní");
	   answers_yes.push("Malinská povrchní");
	   answers_yes.push("Mazáčová povrchní");
	   answers_yes.push("Černá povrchní");
	   answers_yes.push("Němcová povrchní");
	   answers_yes.push("Thu povrchní");
	   answers_yes.push("Limberková povrchní");
	   answers_yes.push("Rosenberg povrchní");
	   answers_yes.push("Krauskopfová povrchní");



function doitall() {
	var question = document.getElementById("app51254684277_question_txt").innerHTML;
	var answered = false;
	
	//if app runs out of questions
	if (question == ""){
		document.getElementById("auto_skip").click();
	}
	
	//if new question
	if (question != questionold){
		//"yes" answers		
		for (var i = 0; i < answers_yes.length; i++){
			if (question.indexOf(answers_yes[i]) >= 0){
				document.getElementById("auto_yes").click();
				answered == true;
				break;
			}
		}
		
		//"no" answers
		if (answered == false){
			for (var i = 0; i < answers_no.length; i++){
				if (question.indexOf(answers_no[i]) >= 0){
					document.getElementById("auto_no").click();
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
		
		//time in ms
		t = setInterval(doitall, 1000);
	}
}

//initiates
var questionold = "";
init = setInterval(starter, 1000);
