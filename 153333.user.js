// ==UserScript==
// @name        Laaptu Auto Guess by thefuturehack.blogspot.com
// @namespace   http://thefuturehack.blogspot.com/2012/12/laaptu-auto-guessing-script.html
// @include     http://www.laaptu.com/*
// @include     http://laaptu.com/*
// @include     http://*.laaptu.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     v.1.0
// ==/UserScript==
function random() {
    var random_number = Math.random();
    return Math.floor((random_number * 9) + 1);
}
$(function(){
	//alert("loaded");

    if(document.location=="http://www.laaptu.com/free_recharge_g1.php"){
		$("#g1").val(random());
		$("#g2").val(random());
		$("#g3").val(random());
		$("#g4").val(random());
		$("#g5").val(random());
		document.forms["guesf"].submit();
	}else if(document.location=="http://www.laaptu.com/guess_confirmation_g1.php"){
		document.forms["confirmform"].submit();
	}else if(document.location=="http://www.laaptu.com/guess-submitted-g1.php"){
		var link = $("#submit_btn_guess_submied").parent().attr('href');
		if(typeof link != "undefined"){
			window.location.href = link;
		}else{
			alert("Problem in Script");
		}
	}else if(document.location=="http://www.laaptu.com/free_recharge_g1_next.php"){
		$("#g1").val(random);
		$("#g2").val(random);
		$("#g3").val(random);
		$("#g4").val(random);
		$("#g5").val(random);
		document.forms["guesf"].submit();
	}else if(document.location=="http://www.laaptu.com/guess_confirmation_g1_next.php"){
		document.forms["confirmform"].submit();
	}else if(document.location=="http://www.laaptu.com/guess-submitted-g1_next.php"){
		var link = $("#submit_btn_guess_submied").parent().attr('href');
		if(typeof link != "undefined"){
			window.location.href = link;
		}else{
			alert("Problem in Script");
		}
	}
	if(document.location=="http://laaptu.com/free_recharge_g1.php"){
		$("#g1").val(random);
		$("#g2").val(random);
		$("#g3").val(random);
		$("#g4").val(random);
		$("#g5").val(random);
		document.forms["guesf"].submit();
	}else if(document.location=="http://laaptu.com/guess_confirmation_g1.php"){
		document.forms["confirmform"].submit();
	}else if(document.location=="http://laaptu.com/guess-submitted-g1.php"){
		var link = $("#submit_btn_guess_submied").parent().attr('href');
		if(typeof link != "undefined"){
			window.location.href = link;
		}else{
			alert("Problem in Script");
		}
	}else if(document.location=="http://laaptu.com/free_recharge_g1_next.php"){
		$("#g1").val(random);
		$("#g2").val(random);
		$("#g3").val(random);
		$("#g4").val(random);
		$("#g5").val(random);
		document.forms["guesf"].submit();
	}else if(document.location=="http://laaptu.com/guess_confirmation_g1_next.php"){
		document.forms["confirmform"].submit();
	}else if(document.location=="http://laaptu.com/guess-submitted-g1_next.php"){
		var link = $("#submit_btn_guess_submied").parent().attr('href');
		if(typeof link != "undefined"){
			window.location.href = link;
		}else{
			alert("Problem in Script");
		}
	}
});