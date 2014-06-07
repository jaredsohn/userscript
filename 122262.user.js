// ==UserScript==
// @name       ISC logger
// @include    http://iscx.dcc.ttu.ee/xxx.asp*
// @version    0.1
// @copyright  2011+, Raidok
// ==/UserScript==


window.onload = go();

var type = "";

function go() {
    if (document.getElementById("TaskField")) {
        type = "problem";
        postProblem();
    } else if (document.body.innerHTML.search("Vastus oli:") != -1) {
        type = "answer";
        postAnswer();
    } else {
        type = "generic";
        postGeneric();
    }
}

function postProblem() {
    GM_setValue('answer_flag', true);
    postData(
        "&heading="+getHtmlById("headingDIV")+
        "&given="+getHtmlById("givenDIV")+
        "&picture="+getHtmlById("pictureDIV")+
        "&problem="+getHtmlById("problemDIV")+
        "&hints="+getHtmlById("hintsDIV")+
        "&problem="+getHtmlById("problemDIV")+
        "&answerarea="+getHtmlById("answerDIV"));
}

function postAnswer() {
    if (GM_getValue('answer_flag') === true) {
        postData(
            "problem_id="+GM_getValue('id')+
            "&body="+getHtmlByTag("body"));
        GM_setValue('answer_flag', false);
    } else {
        GM_log("Vastust ei salvestatud, sest küsimust ei ole ka salvestatud!");
    }
}

function postGeneric() {
    postData(
        "body="+getHtmlByTag("body"));
}

function postData(data) {
    GM_log("PostType:"+type);
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.barsbite.com/req/",
        data: "tag=isclog&type="+type+"&"+data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            var match = response.responseText.match("\\(([0-9]+)\\)");
            GM_log("Vastus: "+response.responseText+"|| id:"+match[1]);
            GM_setValue('id', match[1]);
        }
    });
}

function getHtmlByTag(tag) {
    return encodeURIComponent(document.getElementsByTagName(tag)[0].innerHTML);
}

function getHtmlById(id) {
    return encodeURIComponent(document.getElementById(id).innerHTML);
}
