// ==UserScript==
// @name        Pub`s eRep Congress Donation Validator
// @version 	0.22
// @description	Adds a link to the donating org and flags congress donations as verified/unverified
// @author      Publius
// @require        http://sizzlemctwizzle.com/updater.php?id=57920&days=1&show
// @namespace   http://www.erepublik.com/en/referrer/Publius
// @match       http://www.erepublik.com/*/Mexico/law/*
// @include	    http://www.erepublik.com/*/Mexico/law/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var official_orgs = ["organizacion bancaria mexicana", "Sistema Nacional Financiero"];

    //If there's a match to this regex, proposal_text will be an array of (full proposal, donation org)
    var proposal_text = $("div.indent > p.largepadded").text().match(/Do you agree to transfer \d+ \w+ from the country accounts to (.*?)\?/i);

    //Check if this is a donation proposal
    if(proposal_text){
        //Add a link to search for the org 
        $("div.indent > p.largepadded").html(proposal_text[0].replace(proposal_text[1],'<a href="http://www.erepublik.com/en/search/?q=' + proposal_text[1].split(" ").join("+") + '&commit=">' + proposal_text[1] + '</a>'));

        //Add the verified/unverified textholder
        $("div.indent > p.largepadded").after('<div class="largepadded" id="verified" style="text-align:center"></div>');

        if($.inArray(proposal_text[1].toLowerCase(),official_orgs) == -1){
            //Unverified org
            $("#verified").html('<span class="reject">UNVERIFIED</span>');
        }
        else{
            //Verified org
            $("#verified").html('<span class="accept">VERIFIED</span>');
        }
    }
}

// load jQuery and execute the main function
addJQuery(main);