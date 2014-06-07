// Monks eRepublik Congress Check Script
// Version 0.13
// 2009/09/16
// Edited by diarworld
//
// ==UserScript==
// @name          Shaolin Donation Script
// @namespace     http://www.erepublik.com/*/referrer/Publius
// @description   Helper functions for congressional donation laws for eRussia
// @include       http://ww*.erepublik.com/*/*/law/*
// ==/UserScript==

var allPs, proposal, official_orgs, target_org, valid_org;
official_orgs = ["Arschmann", "ser4ik", "Icewood", "denise.milani", "jujuzz", "mitrrich", "FemtoS"];
allPs = document.evaluate(
    "//p[@class='largepadded']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//First <P> captured is proposer, second <p> is the proposal text
//<p class="largepadded">Proposed by&nbsp;<a class="dotted" href="/en/citizen/profile/1257356">Potaatti</a>,&nbsp;yesterday</p>

proposal = allPs.snapshotItem(1);

var 

regex = /Proposed by (.*?)\?/ig 
propMatch = proposal.textContent.match(regex)
if(propMatch != null) {
    //It is a donation proposal
    target_org = propMatch.join("");
    target_org = target_org.substring(target_org.indexOf('accounts')+12, target_org.length-1);
    valid_org = false;
    for(var i = 0; i < official_orgs.length; i++) {
        if(target_org.toLowerCase() == official_orgs[i].toLowerCase()) {
            valid_org = true;
        }
    }

    if(valid_org){
        //Real Org
        GM_addStyle(".indent { background-color: #c5e5ba;}");
    }
    else{
        //Fake Org
        GM_addStyle(".indent { background-color: #e55252;}");
    }
}
