// ==UserScript==
// @name            Colorful Text Ratings
// @namespace       tag://kongregate
// @description     Changes somewhat ambiguous star rating to a color-coded text rating of the game
// @author          Matthew Ammann
// @include         http://www.kongregate.com
// @include         http://www.kongregate.com/
// @include         http://www.kongregate.com/*games*
// @include         http://www.kongregate.com/accounts/*/favorites
// @include         http://www.kongregate.com/collabs*
// @include         http://www.kongregate.com/collabs/*/*
// @include         http://www.kongregate.com/contests
// @include         http://www.kongregate.com/contests/
// @date            04/03/11
// @version         1.4
// ==/UserScript==

var count = 0;

function colorBG(element, rating)
{
	if(rating >= 4.5)
		element.style.background = "blue";
	else if(rating >= 4.0)
		element.style.background = "green";
	else if(rating >= 3.5)
		element.style.background = "orange";
	else if(rating >= 3.0)
		element.style.background = "red";
	else if(rating >= 2.5)
		element.style.background = "purple";
	else if(rating >= 2.0)
		element.style.background = "grey";
	else 
		element.style.background = "black";	
}

GM_registerMenuCommand("Text Rating -> Number of Decimal Points", decimalsPrompt)
var decimalPoints = GM_getValue("decimals", 2);

addGlobalStyle('.rating { font: 1.1em Lucida Grande,Verdana,Arial,sans-serif ! important }');
addGlobalStyle('.rating ul { background: none ! important; width: 22px ! important}');
addGlobalStyle('.rating ul li { text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 22px !important; padding: 2px 2px 3px 3px}');
addGlobalStyle('.star-rating { font-size: 11px ! important }');
addGlobalStyle('.star-rating ul { background: none ! important; width: 30px ! important}');
addGlobalStyle('.star-rating ul li { text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 22px !important; padding: 2px 2px 3px 3px}');
addGlobalStyle('.collabs_rating ul { background: none ! important; width: 35px ! important}');
addGlobalStyle('.collabs_rating ul li { text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 30px ! important; padding: 2px 2px 3px 3px}');
addGlobalStyle('.browse_rating ul { background: none ! important; width: 35px ! important}');
addGlobalStyle('.browse_rating ul li{ width: 21px ! important; text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; padding: 1px 1px 1px 2px}');
addGlobalStyle('.featured_game_info ul { background: none ! important; width: 35px ! important; height: 15px ! important}');
addGlobalStyle('.featured_game_info ul li:first-child{ width: 25px ! important; text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; padding: 2px 3px 2px 3px}');
addGlobalStyle('.game_rating ul { background: none ! important; width: 35px ! important}');
addGlobalStyle('.game_rating ul li{ width: 22px ! important; text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; padding: 1px 1px 1px 2px; margin-left: 7px}');
addGlobalStyle('.more_ind_game ul { background: none ! important; width: 22px ! important}');
addGlobalStyle('.more_ind_game ul li { text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 22px !important; padding: 2px 2px 3px 3px}');
addGlobalStyle('.shared_content_rating ul { background: none ! important; width: 22px ! important}');
addGlobalStyle('.shared_content_rating ul li { text-indent: 0px ! important; -moz-border-radius: 5px; -webkit-border-radius: 5px; width: 22px !important; padding: 2px 2px 3px 3px}');

var path = location.pathname;
var pathArray = path.split("/");

//This modifies ratings on the homepage only
if(pathArray[1] == "")
{
	var featuredRatings = document.getElementsByClassName("ratings");

	for(i=0; i < featuredRatings.length; i++)
	{
		var rating = cleanUpRatingText(featuredRatings[i].querySelector("li"), "featured");
		featuredRatings[i].querySelector("li").innerHTML = rating;

		styleText(featuredRatings[i]);
		colorBG(featuredRatings[i].querySelector("li"), Number(rating));
		setWidth(featuredRatings[i], decimalPoints);
		
		//alert(featuredRatings[i].parentNode.parentNode.querySelector ("dl.featured_game_desc>dt>a"))
	}
}

var ratingsArray = document.getElementsByClassName("current-rating");

for(i=0; i < ratingsArray.length; i++)
{
	var ancestor2 = up(ratingsArray[i], 2);
	
	if(ancestor2.className != "my_rating lbOn" && ancestor2.className != "rate_art_sound" && ancestor2.className != "details bd" && 
		ancestor2.id != "star_ratings_block" && ancestor2.id != "quicklinks_star_ratings_block")	
	{
		var filteredRating;
	
		if(ancestor2.className == "collabs_rating")
		{
			var betterRatingNode = ancestor2.getElementsByTagName("em")[0];
			filteredRating = cleanUpRatingText(betterRatingNode);
			
			ancestor2.removeChild(betterRatingNode);
			colorBG(ratingsArray[i], filteredRating);
		}
		else if(ancestor2.parentNode.className == "graybg")
		{
			var betterRatingNode = ancestor2.getElementsByClassName("num_rating")[0];
			//alert(filteredRating)
			filteredRating = cleanUpRatingText(ratingsArray[i]);
			console.log(filteredRating);
			colorBG(ratingsArray[i], filteredRating);
			
			ancestor2.removeChild(betterRatingNode);
			ratingsArray[i].style.setProperty("width", "30px", "important");
			ratingsArray[i].addEventListener("click", function(){getPreciseRating(this)}, false);
		}
		else if(ancestor2.className == "shared_content_rating")
		{
			setPosition(ratingsArray[i]);
			cleanUpRatingText(ratingsArray[i]);
			colorBG(ratingsArray[i], ratingsArray[i].innerHTML);
		}
		else
		{
			ancestor = up(ratingsArray[i], 5);
		
			if(ancestor.className == "callout_listing")
				ratingsArray[i].addEventListener("mouseover", function(){getPreciseRating(this)}, false);
			else
				ratingsArray[i].addEventListener("click", function(){getPreciseRating(this)}, false);
			
			cleanUpRatingText(ratingsArray[i]);
			colorBG(ratingsArray[i], ratingsArray[i].innerHTML);
		}

		styleText(ratingsArray[i]);
	}//end if
} //end for

function getPreciseRating(elem)
{
	var linkNode;
	var ancestor2 = up(elem, 2);
	var ancestor3 = up(elem, 3);
	var ancestor5 = up(elem, 5);

	if(ancestor2.className == "rating")
		linkNode = ancestor3.querySelector("dt a").href;
	else if(ancestor2.className == "browse_rating" || ancestor5.className == "contests")
		linkNode = ancestor3.querySelector("td a").href;
	else if(ancestor3.className == "more_ind_game")
		linkNode = ancestor2.querySelector("a").href;
	else if(ancestor2.className == "shared_content_rating")
		linkNode = ancestor3.querySelector("h3 a").href;
	
	var URL = linkNode + "/metrics.json";

	var xhr = new XMLHttpRequest(); 
	xhr.onload = function(){
		if(xhr.readyState == 4 && xhr.status < 400){
		
			var response = JSON.parse(xhr.responseText);
			var preciseRating = response.rating;
			preciseRating = preciseRating.toFixed(decimalPoints);
			elem.innerHTML = preciseRating;
			
			setPosition(elem);
			setWidth(elem);
			colorBG(elem, preciseRating);
		}
	}
		
	xhr.open("GET", URL, true);
	xhr.send(""); 
}

function setWidth(elem)
{
	var width, liWidth;
	var ancestor2 = up(elem, 2);
	var ancestor3 = up(elem, 3);

	if(elem.parentNode.className == "featured_game_info")
	{
		if(decimalPoints == 3)
		{
			width = "45px";
			liWidth = "33px";
		}
		else if(decimalPoints == 4)
		{
			width = "50px";
			liWidth = "40px";
		}

		elem.getElementsByTagName("li")[0].style.setProperty("width", liWidth, "important");
	}
	else if(ancestor2.className == "rating" || elem.parentNode.className == "collabs_rating" ||
			ancestor3.className == "more_ind_game")
	{
		if(decimalPoints == 2)
			width = "30px";
		else if(decimalPoints == 3)
			width = "38px";
		else if(decimalPoints == 4)
			width = "45px";
	}
	else
	{
		if(decimalPoints == 2)
			width = "32px";
		else if(decimalPoints == 3)
			width = "36px";
		else if(decimalPoints == 4)
			width = "43px";
	}
	
	elem.style.setProperty("width", width, "important");
}

function decimalsPrompt()
{
	var input = prompt("Please enter the number of decimal points you would like the script to show, as a number between 2 and 4.");
	
	GM_setValue("decimals", input);
}

function setPosition(elem)
{			
	var ancestor2 = up(elem, 2);
	var ancestor5 = up(elem, 5);

	if(ancestor5.className == "callout_listing")
	{
		if(decimalPoints == 2)
			ancestor2.style.right = "17px";	
		else if(decimalPoints == 3)
			ancestor2.style.right = "24px";	
		else if(decimalPoints == 4)
			ancestor2.style.right = "31px";	
	}		
	
	else if(ancestor2.className == "shared_content_rating")
		elem.parentNode.style.right = "5px";
}


function cleanUpRatingText(element) {
	var rating;
	var ancestor2 = element.parentNode.parentNode;
	
	if(element.innerHTML.indexOf("(") != -1)
	{
		//alert("is graybg");
		var betterRatingNode = ancestor2.getElementsByClassName("num_rating")[0];
		element.innerHTML = ancestor2.querySelector(".num_rating").innerHTML.replace(/^.*(\d\.\d+).*$/, function(match, rating){
			rating = Number(rating).toFixed(decimalPoints);
			return rating;
		});
		alert(rating);
	}
	else
	{
		element.innerHTML = element.innerHTML.replace(/^.*(\d\.\d+).*$/, function(match, rating){
			rating = parseFloat(rating).toFixed(decimalPoints);
			return rating;
		});
	}
	return rating;
	
}

function styleText(element)
{
	element.style.color = "white";
	element.style.fontWeight = "bold";
	element.parentNode.style.height = "15 px";
}

function up(element, selector) {
	if(typeof selector == "number") {
		while (selector--)
			element = element.parentNode;
	} else {
		while (!element.mozMatchesSelector(selector))
			element = element.parentNode;
	}
	return element;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
