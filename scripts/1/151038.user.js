// Retrieve documents listed on Pubmed via DOI, if available
// --------------------------------------------------------------------
// This script inserts links to doi.org into a pubmed page. It obtains
// the DOI identifiers through the webservice at http://www.pmid2doi.org/
//
// This is a Greasemonkey user script for Firefox. To use it, first install
// Greasemonkey, then install this script through Greasemonkey.
// --------------------------------------------------------------------
// version 1.1
// 2012-10-26
// Copyright (c) 2012, Michael Palmer (mpalmer at uwaterloo dot ca)
// Released under the GPL license
// --------------------------------------------------------------------

// ==UserScript==
// @name          pmid2doi.user.js
// @namespace     http://science.uwaterloo.ca/~mpalmer
// @description   Greasemonkey script that inserts links to DOI identifiers into Pubmed pages. This provides direct access to full text for many papers (particularly older ones) for which Pubmed itself does not link to the full text versions.
// @include       http://www.ncbi.nlm.nih.gov/pubmed*
// ==/UserScript==


/*
   pmid2doi web service
   example request: http://www.pmid2doi.org/rest/json/batch/doi?pmids=[1,2,3]
*/

pmid2doi_url_template = ["http://www.pmid2doi.org/rest/json/batch/doi?pmids=[","]"];
doi_base_url = "http://dx.doi.org/";


function findPmids(){
    // find all the pmids displayed on this page. Return the dl tags,
    // not the numbers yet; we will need the tags for navigating the page.
    var dls = document.getElementsByTagName('dl');
    var pmids = [];
    for (var i=0; i<dls.length; i++) {
        var dl = dls[i];
        if (dl.className=='rprtid') pmids.push(dl);
    }
    return dls;
}

function isAbstractPage(){
    // inspect the document and see whether we should do something.
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++){
        var mt = metas[i];
        if (mt.name=='ncbi_report') {
            doctype = mt.content;
            if (doctype=='abstract') return true;
            return false;
        }
    }
}

function processDois(response, pmid_dict){
    // process the dois that we retrieved from the server
    var pmid2dois=eval('('+response.responseText+')');

    for (var i=0; i<pmid2dois.length; i++){
        var dict = pmid2dois[i];
        var doi = dict['doi'];

        if (doi == undefined) continue;

        var pmid = dict['pmid'];
        var htmlParent = pmid_dict[pmid];
        appendDoiLink(doi, htmlParent);
    }
}

function appendDoiLink(doi, parentDiv){
    // append link with doi to htmlParent

    var link = document.createElement("a");
    link.href = doi_base_url + doi;
    link.title="Read full text on publisher's site via doi.org";

    var linkText = document.createTextNode("Full text via doi.org");
    link.appendChild(linkText);

    // parentDiv.style.marginTop="12px";
    parentDiv.style.marginBottom="12px";

    link.style.fontWeight="bold";
    link.style.fontSize="10px";
    link.style.textDecoration="none";
    link.style.color="#02A";
    link.style.padding="4px";
    link.style.paddingLeft="10px";
    link.style.paddingRight="10px";
    link.style.border="1px solid #02A"; // #D39";
    link.style.backgroundColor="#E8EEFF";
    link.style.borderRadius="4px";

    parentDiv.appendChild(link);
}

function retrieveDois(pmid_dict){
    // get any number of DOIS for pmids
    var pmid_list = [];
    for (var pmid in pmid_dict) pmid_list.push(pmid);

    pmid_string = pmid_list.join(',');
    var request_url = pmid2doi_url_template.join(pmid_string);

    GM_xmlhttpRequest({
    method:"GET",
    url: request_url,
    onload:function(response) {
        processDois(response, pmid_dict);
    }
    });
}

function processMultiPage(pmid_tags){
    // process a page with multiple PMIDS
    var orphan_pmids = {};
    var n_orphans = 0;

    for (var i=0; i<pmid_tags.length; i++){
        var pmt = pmid_tags[i];
        var container = pmt.parentNode.parentNode.parentNode;
        var imgs = container.getElementsByTagName('img');

        if (imgs.length>0 && imgs[0].title.match('^Read full text')){
            continue; // this pmid already has a full text link
        }

        var ddtags = pmt.getElementsByTagName('dd');
        var pmid = ddtags[0].innerHTML;

        var cc = container.childNodes;
        for (var j=0; j<cc.length; j++){
            var refChild = cc[j];
            if (refChild.className=='morecit') {
                break;
            }
        }

        var newDiv = document.createElement('div');
        container.insertBefore(newDiv, refChild);

        newDiv.style.marginTop="12px";

        orphan_pmids[pmid] = newDiv;
        n_orphans ++;
    }

    if (n_orphans > 0) retrieveDois(orphan_pmids);
}

function processSinglePage(pmid_tag){
    // insert link into single record page if needed
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        var title = imgs[i].title;
        if (title.match('^Read full text')) {return; }
    }

    // link is missing - find place to insert it
    var startFromDiv = document.getElementById("pubmed_favoritesad");
    var pDiv = startFromDiv.parentNode.parentNode.parentNode.parentNode;

    // create and insert wrapper div for the link
    var myDiv = document.createElement('div');
    pDiv.insertBefore(myDiv, pDiv.firstChild);

    myDiv.style.marginTop="4px";
    myDiv.style.display="block";

    var ddtags = pmid_tag.getElementsByTagName('dd');
    var pmid = ddtags[0].innerHTML;

    var orphan_pmids = {};
    orphan_pmids[pmid] = myDiv;

    retrieveDois(orphan_pmids);
}

function processPage(){
    // determine if this is an abstract page that should be mangled;
    // if it is, decide whether it displays one or more abstracts
    if (!isAbstractPage()) return;

    var pmid_tags = findPmids();
    if (pmid_tags.length==1) processSinglePage(pmid_tags[0]);
    else processMultiPage(pmid_tags);
}

window.addEventListener("load", function(e){
    processPage();
}, false);