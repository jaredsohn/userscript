// ==UserScript==
// @name           fs-profile-search
// @version        0.1.1.5
// @namespace      http://userscripts.org/users/500511
// @author         formerlyanon
// @description    Client-side search for formspring profiles
// @updateURL      http://userscripts.org/scripts/source/155725.user.js
// @include        http://www.formspring.me/*
// @exclude        http://www.formspring.me/account/*
// @exclude        http://www.formspring.me/activity/
// @exclude        http://www.formspring.me/*/smiles
// @exclude        http://www.formspring.me/*/questions
// @run-at         document-end
// ==/UserScript==

var sdiv = document.createElement("div");
sdiv.innerHTML = "<div class='module'><form id='searchform' action='javascript:void(0);'><input type='text' id='searchtext' value='' placeholder='Search' maxlength='500' class='autogrow' style='width:227px'><input type='submit' id='searchbutton' class='button_grey_med' style='display: none' value='Search' /></form></div>"
var rnav = document.getElementById("rnav module");
rnav.parentNode.insertBefore(sdiv, rnav.nextSibling);

var pdiv = document.createElement("div");
pdiv.setAttribute("style", "display:none; padding-left:225px; padding-top:15px; text-align:center; float:left; font-size: 14px;");
pdiv.innerHTML = "<img src='http://i.minus.com/if4Z4ebfGUuNo.gif' style='float:left; padding-right: 5px' id='progressindicator' /><div id='progress' style='float:right'>0% loaded</div>";
var header = document.getElementById("header");
header.getElementsByClassName("wrapper")[0].style.display = "inline-block";
header.getElementsByClassName("wrapper")[0].parentNode.style.textAlign = "center";
var nav = document.getElementById("nav");
nav.style.display = "inline-block";
nav.style.cssFloat = "right";
nav.parentNode.insertBefore(pdiv, nav);

document.getElementById("searchform").onsubmit = function(){ search(document.getElementById("searchtext").value); };

var container = document.getElementById("questions_answered_more_link");
var adiv = document.createElement("div");
container.appendChild(adiv);

var link = document.getElementById("questions_answered_more_link").getElementsByTagName("a")[0];
var total = link.getAttribute("total");
var username = link.getAttribute("username");

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var searching = false;
var observer;

/*
var storekey = username + "_responses";
var firstqid;
var lastqid;
var sr;

window.onbeforeunload = function() { localStorage[storekey] = adiv.innerHTML; }
*/

function get_qid(question) { return question.getAttribute("rel"); }

function search(q)
{
    /*
    if(localStorage[storekey]) {
        sr = document.createElement("div");
        sr.innerHTML = localStorage[storekey];
        var myq = sr.getElementsByClassName("question profile-stream");
        firstqid = get_qid(myq[0]);
        lastqid = get_qid(myq[myq.length-1]);
    }
    */
    test_responses(document, q);
    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for(i = 0; i < mutation.addedNodes.length; i++) {
                test_responses(mutation.addedNodes[i], q);
            }
        });
    });
    observer.observe(adiv, { childList: true });
	var questions = document.getElementsByClassName("question profile-stream");
	var qid = get_qid(questions[questions.length-1]);
    if(!searching) {
        fetch_responses(qid);
        searching = true;
        pdiv.style.display = "inline-block";
    }
}

function test_responses(base_elem, q)
{
    var questions = base_elem.getElementsByClassName("question profile-stream");
    for(i = 0; questions[i]; i++) {
        questions[i].style.display = "none";
    }
    //alert("testing " + questions.length + " responses");
    regex = new RegExp(q, "i");
    for(i = 0; questions[i]; i++) {
        test_response(questions[i], regex);
    }
}

function test_response(response, regex)
{
    if(regex.test(response.textContent)) response.style.display = "block";
    else response.style.display = "none";
}

function fetch_responses(lr)
{
    link.style.display = "none";
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.formspring.me/profile/moreQuestions/"+username+"?ajax=1&start="+lr,
		onload: function(response) {
            var rdiv = document.createElement('div');
            rdiv.className = "question-page";
            rdiv.innerHTML = /"questions":"(.*?)[^\\]"/.exec(response.responseText)[1].replace(/\\[ntr]/g,'').replace(/\\\//g,'/').replace(/\\"/g,'"').replace(/\\u(....)/g,'&#x$1;');
            adiv.appendChild(rdiv);
        	var questions = document.getElementsByClassName("question profile-stream");
        	var qid = get_qid(questions[questions.length-1]);
        	document.getElementById("progress").innerHTML = Math.floor(100*questions.length/total)+"% loaded";
        	if(questions.length == total) document.getElementById("progressindicator").style.display = "none";
            if(qid != lr) {
                /*
                if(qid <= firstqid) {
                    var questions = document.getElementsByClassName("question profile-stream");
                    while(get_qid(questions[questions.length-1]) <= firstqid) { questions[questions.length-1].parentNode.removeChild(questions[questions.length-1]); }
                    for(i = 0; sr.getElementsByClassName("question-page")[i]; i++) adiv.appendChild(sr.getElementsByClassName("question-page")[i]);
                    firstqid = 0;
                    qid = lastqid;
                }
                */
                fetch_responses(qid);
            }
		}
	});
}