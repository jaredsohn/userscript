// Congressional Donation Script eRussia (eRep)
// Version 0.13
// 2009/09/16
// Edited by diarworld
//
// ==UserScript==
// @name          Congress Donation eRussia (eRep)
// @namespace     http://www.erepublik.com/*/referrer/Publius
// @description   Helper functions for congressional donation laws for eRussia
// @include       http://ww*.erepublik.com/*/Russia/law/*
// ==/UserScript==

var allPs, proposal, official_orgs, target_org, valid_org;
official_orgs = ["eRussian Fund", "Russian Treasury"];
allPs = document.evaluate(
    "//p[@class='largepadded']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//First <P> captured is proposer, second <p> is the proposal text
proposal = allPs.snapshotItem(1);

var regex = /Do you agree to transfer \d+ \w+ from the country accounts to (.*?)\?/ig
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
        GM_addStyle(".indent { background-color: #3C0;}");
    }
    else{
        //Fake Org
        GM_addStyle(".indent { background-color: #F00;}");
    }
}
