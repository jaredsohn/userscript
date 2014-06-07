// ==UserScript==
// @name       Animenfo Customize
// @namespace  https://www.animenfo.com/radio/*
// @version    0.6
// @description  can rate a song without reload page anymore
// @match      https://www.animenfo.com/radio/*
// @copyright  2012+, You
// @run-at document-end
// ==/UserScript==

var url = window.location.toString() , i , j , userRating;
if(url.indexOf("nowplaying") != -1){
    function floodRating(){
        document.getElementsByName("rating")[0].onchange = function(){ userRating = this.selectedIndex; };
        if(!document.getElementsByClassName("ratesubmit")[0].disabled){ // available to rate songs
            if(userRating){ // user desire rate
                document.getElementsByName("rating")[0].selectedIndex = userRating;
                document.getElementById("np_rateButton").click();
                console.log("user desire rating " + (userRating + 1));
                userRating = null;
            }else if(document.getElementById("rateform").innerHTML.indexOf("Change your rating") === -1){ // new unrate song
                var detail = document.getElementById("np_time").parentNode.innerHTML;        
                var rating = detail.substring(detail.indexOf("g:") + 3 , detail.indexOf("/ 10") - 1);
                rating = isNaN(rating) ? 5 : Math.round(Math.random()) ? Math.floor(rating) - Number(Math.floor((Math.random()*20)+1) == 20) : Math.ceil(rating) + Number(Math.floor((Math.random()*10)+1) == 10);
                //rating = rating == 6? (Math.random() > 0.4)? 5 : (Math.random() > 0.4)? 7 : 6 : rating ;
                document.getElementsByName("rating")[0].selectedIndex = rating - 1;
                document.getElementById("np_rateButton").click();
                console.log("done " + rating);
            }
        }
        setTimeout(floodRating, Math.floor((Math.random()*5) + 5) * 1000);
    }    
    floodRating();
    var chatbox = document.getElementsByTagName("h3")[3];
    var styles = document.styleSheets;
    for (var i=0; i<styles.length; i++) {
		var rules = styles[i].cssRules || styles[i].rules;
		for (var j=0; j<rules.length; j++) {
            if (rules[j].selectorText === "span.staff_span") {
				rules[j].style.color = "rgb(224, 191, 107)";
                rules[j].style.textShadow = "0px 0px 5px rgba(163, 157, 156, 0.9)";
                return;
            }
        }
    }
}

var customize = document.getElementsByClassName("seriestag");
for(i=0; i<customize.length; i++){
    customize[i].setAttribute('style', "color : rgb(193, 133, 236) !important");
    for(j=0; j<customize[i].children.length; j++){
        customize[i].children[j].setAttribute('style', "color : rgb(193, 133, 236) !important");
    }
}