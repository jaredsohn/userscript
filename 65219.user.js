// ==UserScript==
// @name          BB.com R/P De-religionizer
// @description	  Some people who don't believe in God don't talk about him 12 hours a day.
// @include       http://forum.bodybuilding.com/forumdisplay.php?f=72*
// @exclude       
// ==/UserScript==

(function() {
    	var allTR;
    	var patt;
	var allIG = new Array(
	"god",
	"jesus",
	"mohammed",
	"muhammed",
	"islam",
	"muslim",
	"bahai",
	"baha\'i",
	"heaven",
	"christian",
	"santa",
	"satan",
	"emmanuel",
	"immanuel",
	"religion",
	"hadith",
	"q.*u.*r.*a.*n",
	"koran",
	"kuran",
	"bible",
	"talmud",
	"ten commandments",
	"atheist",
	"christ",
	"prayer",
	"meditation",
	"preacher",
        "catholic",
        "reincarnation",
	"evolution",
	"creationism",
	"religio",
	"theis",
	"adam.*eve",
	"jewish",
	"akr",
	"jf1",
	"manofhorror555", // 5,000 retarded threads about creationism
	"scripture",
	"The_Reaper",  // needs eval
	"Harbinger", // needs eval
	"kingtego", // needs eval
	"1meBERMUDA" // holy shit this guy is more retarded than even akr
	);
	
	var myMatch = new RegExp();
    	
	allTR = document.getElementsByTagName('a');
	// Remove posts that fit the criteria
	for (var i = 0; i < allTR.length; i++) {
		for (var x in allIG) {
		    var myMatch = RegExp(allIG[x], "gim");
		    if(allTR[i].innerHTML.match(myMatch)){
			    allTR[i].parentNode.parentNode.parentNode.style.display="none";
	    		}
    		}
    	}

	allTR = document.getElementsByTagName('span');
	// Remove posts that fit the criteria
	for (var i = 0; i < allTR.length; i++) {
		for (var x in allIG) {
		    var myMatch = RegExp(allIG[x], "gim");
		    if(allTR[i].innerHTML.match(myMatch)){
			    allTR[i].parentNode.parentNode.parentNode.style.display="none";
	    		}
    		}
    	}


    	
})();