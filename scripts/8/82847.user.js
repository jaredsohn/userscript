// ==UserScript==
// @name        congreso bolivia
// @version 	0.20
// @description	Adds a link to the donating org and flags congress donations as verified/unverified
// @author      Publius, modified cbravo
// @namespace   http://www.erepublik.com/en/referrer/Publius
// @match       http://www.erepublik.com/*/Bolivia/law/*
// @include	    http://www.erepublik.com/*/Bolivia/law/*
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
    var official_orgs = ["Ministerio de Industria","Banco Nacional de Bolivia"];

    //If there's a match to this regex, proposal_text will be an array of (full proposal, donation org)
    var proposal_text = $("div.indent > p.largepadded").text().match(/Do you agree to transfer \d+ \w+ from the country accounts to (.*?)\?/i);

    //Check if this is a donation proposal
    if(proposal_text){
        //Add a link to search for the org 
        $("div.indent > p.largepadded").html(proposal_text[0].replace(proposal_text[1],'<a href="http://www.erepublik.com/en/search/?q=' + proposal_text[1].split(" ").join("+") + '&commit=">' + proposal_text[1] + '</a>'));

        //Add the verified/unverified textholder
        $("div.indent > p.largepadded").after('<div class="largepadded" id="verified" style="text-align:center"></div>');

        if($.inArray(proposal_text[1],official_orgs) == -1){
            //Unverified org
            $("#verified").html('<span class="reject">ILEGAL</span>');
        }
        else{
            //Verified org
            $("#verified").html('<span class="accept">LEGAL</span>');
        }
    }
    //si no entro con ingles, puede ser en espanhol.
    else
    {
        proposal_text = $("div.indent > p.largepadded").text().match(/¿Accedes a transferir \d+ \w+ de las cuentas del país a (.*?)\?/i);

	if(proposal_text){
        //Add a link to search for the org 
        $("div.indent > p.largepadded").html(proposal_text[0].replace(proposal_text[1],'<a href="http://www.erepublik.com/en/search/?q=' + proposal_text[1].split(" ").join("+") + '&commit=">' + proposal_text[1] + '</a>'));

        //Add the verified/unverified textholder
        $("div.indent > p.largepadded").after('<div class="largepadded" id="verified" style="text-align:center"></div>');

        if($.inArray(proposal_text[1],official_orgs) == -1){
            //Unverified org
            $("#verified").html('<span class="reject">ILEGAL</span>');
        }
        else{
            //Verified org
            $("#verified").html('<span class="accept">LEGAL</span>');
        }
    }
    }
}

// load jQuery and execute the main function
addJQuery(main);