// ==UserScript==
// @name        Neopets: Training School Helper
// @namespace   userscripts.org
// @include     http://www.neopets.com/island/training.phtml?type=status*
// @include	http://*www.neopets.com/safetydeposit.phtml?*obj_name=&category=2
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var debug = true;
// GM_log(location.href);

function checkSDB(code){
	if($("tr:contains(" + code + "):last").length > 0){
		var exist = 1;
	}else{
		var exist = 0;
	}
	return exist;
}

$dontHave = "Need to buy: ";

if(location.href == "http://www.neopets.com/safetydeposit.phtml?offset=0&obj_name=&category=2" && GM_getValue("codes")  !== undefined){
	GM_log(GM_getValue("codes"));
	$needed = GM_getValue("codes");
	var codestones = $needed.split(",");
	var j = 1;
	for(i = 0;i < codestones.length;i++){
		$exists = checkSDB(codestones[i]);
		if($exists == 1){
			$thisVal = Number($("tr:contains(" + codestones[i] + "):last td:last input").val());
			$("tr:contains(" + codestones[i] + "):last td:last input").val($thisVal + 1);
			GM_log("filling in " + (i + 1) + " codestone"); 
		}else{
			if(j > 1){
				$dontHave = $dontHave + codestones[i] + " Codestone, ";
			}else{
				$dontHave = $dontHave + codestones[i] + " Codestone. ";
			}
		}
	}
	if($dontHave.length == 13){
		alert("All codestones needed are in SDB");
		// submit form
		// $("input[type='submit'][value='Move Selected Items']").submit();
	}else{
		alert($dontHave);
		// submit form
		// $("input[type='submit'][value='Move Selected Items']").submit();
	}
	GM_deleteValue("codes");
}
else if(GM_getValue("done") == 1){
	alert("Course Finished!");
}
else if($("td:contains('This course has not been'):last").length > 0){
	$("td:contains('This course has not been paid for'):last p").before("<br><br><b><a href='#' id='sdb'>Check SDB</a></b><br>");

	$codestones = $("td:contains('This course has not been'):last p").text();
	$codesNeeded = $codestones.split(" Codestone");
	$codesNeeded.pop();
	// alert($codesNeeded);

	$("#sdb").click(function(){
		$codes = $codesNeeded[0] + "," +$codesNeeded[1] + "," + $codesNeeded[2];
		GM_setValue("codes",$codes);
		GM_log(GM_getValue("codes"));
		location.href = "http://www.neopets.com/safetydeposit.phtml?offset=0&obj_name=&category=2";
	});

}
else{
	$fullTime = $("td:contains('Time till course'):last b").text();
	
	$timeLeft = $fullTime.split(",");	

	$hours = $timeLeft[0].replace(' hrs','');
	$hours = $hours.replace(' ','');

	$minutes = $timeLeft[1].replace(' minutes','');
	$minutes = $minutes.replace(' ','');

	$seconds = $timeLeft[2].replace(' seconds','');
	$seconds = $seconds.replace(' ','');

	$totalInSeconds = Number($hours * 60 * 60) + Number($minutes * 60) + Number($seconds);

	if(debug){
		GM_log($hours + " hours, " + $minutes + " minutes, " + $seconds + " seconds left");
		GM_log($totalInSeconds + " seconds left total");
	}

	function toTime(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return (h + " hrs, " + m + " minutes, " + s + " seconds");
	}

	var timer = setInterval(function(){ 
		if($totalInSeconds > 0){
			var test = toTime($totalInSeconds--);
			$("td:contains('Time till course'):last b").text(test);
		}else{
			GM_setValue("done",1);
			window.location.reload();
		}
	}, 1000);
}