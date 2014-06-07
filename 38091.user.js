// ==UserScript==
// @name           Google Finance Env
// @description    Display environmental information from greenerone.com on Google Finance
// @include        http://finance.google.com/*
// @version        1.0
// ==/UserScript==

var companyName;
var page;
var ave_rating = 0;

function getCo()
{
    var co = document.title.split(" - ");   //the name is nestled inbetween these in the title
    companyName = co[1];                //first element is the full name element
    var remove_items = ["Inc.", "Corporation", "Limited", "Co.", 
    "The", "Company", "(", "USA", ")", "CO", "LTD", "MOTOR", "Motor", "Corp.", ",", "ADR", "."];    //list of undesirable elements in the name
    
    //removes elements in remove_items from the company name
    for(i in remove_items)
    {
        companyName = companyName.replace(remove_items[i], "");
    }
}

function setPage()
{
    page = "http://www.greenerone.com/search?q="+companyName;
}

function getRating(text)
{
    var ratings = Array();
    var split_txt = text.split("images/s-gi");
    var total = 0;
    
    for(i in split_txt)
    {
        if(i > 0)
        {
            var rate = +split_txt[i][0];
            if(rate > 0 && rate <= 9)
            {
                if(rate == 1)
                {
                    if(split_txt[i][1] == 0)
                    {rate = 10;}
                }
                ratings.push(rate);
            }
        }
    }
    
    for(i in ratings)
    {
        total += ratings[i];
    }
    ave_rating = Math.round(total/ratings.length);
    if(!(ave_rating > 0 && ave_rating <= 9))
    {ave_rating = "No rating yet";}
    //used for debugging
    //alert("Average: "+ave_rating+"\nTotal: "+total+"\nName: "+companyName+"\nNumber of products: "+ratings.length);
    //alert("Ratings: "+ratings);
}

function displayRating()
{
    var div = document.getElementsByTagName("div");
    var rating_loc;
    for(i=0;i< div.length;i++)
    {
        rating_loc = div[i];
        var clas = rating_loc.getAttribute("class");
        if(clas == "tophdg")
        {
            var rating_elem = document.createElement("h3");
            rating_elem.setAttribute("id", "envRating");
            rating_elem.setAttribute("style","color: green;");
            rating_elem.appendChild(document.createTextNode(" Environmenal Rating: "+ave_rating));            
            rating_loc.appendChild(rating_elem);
        }
    }

}

window.addEventListener('load', function(){
	getCo();
	setPage();
	GM_xmlhttpRequest({
	    method: "GET",
	    url: page,
	    onload: function(responseDetails)
	    {
	        if(responseDetails.status == 200)
	        {
	            getRating(responseDetails.responseText);
	            displayRating();
	        }
	        else
	        {
	            alert("Failure: " + responseDetails.status);
	        }
	    }});	        
}, true);
