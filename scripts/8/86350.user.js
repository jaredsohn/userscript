// ==UserScript==
// @name           OKCupid Default to Private Answers
// @namespace      Cromagnon
// @description    Default to answering OKC questions privately
// @include        *.okcupid.com*/questions*
// @version        2.0.0415
// ==/UserScript==



// Insert CSS for custom elements.
//
function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(   '     div.big_dig #questions .question.private { background-color: #E9EAEE; }'
                + '\r\n div.big_dig #questions .question .footer { background-color: #EAEAEA; }'
                + '\r\n div.big_dig #questions .question.private .footer { background-color: #EFF0F4; }'
                + '\r\n div.big_dig #questions .question .answer_area a.permalink { float: right; }'
                + '\r\n div.big_dig #questions .question .answer_area .container.my_answer,'
                + '		div.big_dig #questions .question .answer_area .container.acceptable_answers { margin-right: 60px; }'
                + '\r\n div.big_dig #questions .question.cant_reanswer .reanswer_btn { display: inherit !important; }'
                + '\r\n div.big_dig #questions .question.cant_reanswer .cant_reanswer { display: none !important; }'
                + '\r\n div.big_dig #questions .question.cant_reanswer .skip_btn.inner { display: none; }'
                + '\r\n div.big_dig #questions .question.irrelevant .importance_radios { display: none; }'
                + '\r\n div.big_dig #questions .question.irrelevant .irrelevant_message { display: block; }'
              );



// answer whether the specified class is included in
//   the given className (string) OR the given node's .className
//
function hasClass(classNameOrNode, className) {

    var classes = classNameOrNode;
    
    if ((typeof classes) != (typeof "")) classes = classes.className;
    
    classes = classes.split(" ");
    
    return (classes.indexOf(className) != -1);
};



// add the specified class to the given className (string)
//   OR add the class to the given node's .className
//
//      returns either the new className (string)
//      or the original node with the new .className
//
function addClass(classNameOrNode, newClassName) {

    var className = classNameOrNode;
    
    if ((typeof className) != (typeof "")) className = className.className;
    
    if (className != null) {

        var classes = className.split(" ");
        
        var j = classes.indexOf(newClassName);
        
        if (j == -1) {
            
            className += " " + newClassName;

            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

            else classNameOrNode.className = className;
        };
    };

    return classNameOrNode;
};



// remove a specified class from the given className (string)
//   OR remove the class from the given node's .className
//
//      returns either the new className (string)
//      or the original node with the new .className
//
function removeClass(classNameOrNode, removeName) {

    var className = classNameOrNode;
    
    if ((typeof className) != (typeof "")) className = className.className;
    
    if (className != null) {

        var classes = className.split(" ");
        
        var j = classes.indexOf(removeName);
        
        if (j != -1) {
            
            classes.splice(j,1);
            
            className = classes[0];
            
            for (var i = 1; i < classes.length; i++)

            className += " " + classes[i];

            if (className == null)  className = "";

            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

            else classNameOrNode.className = className;
        };
    };

    return classNameOrNode;
};



// define my own "nextElement()" function for Element Nodes
//
//   returns the next sibling of the same *type* as the given node
//
function nextElement(element) {

    var next_element = element.nextSibling;
    
    while ((next_element != null) && (next_element.nodeType != element.nodeType))
    
        next_element = next_element.previousSibling;
    
    return next_element;
};



// define my own "previousElement()" function for Element Nodes
//
//   returns the previous sibling of the same *type* as the given node
//
function previousElement(element) {

    var prev_element = element.previousSibling;
    
    while ((prev_element != null) && (prev_element.nodeType != element.nodeType))
    
        prev_element = prev_element.previousSibling;
    
    return prev_element;
};



// Fix OKCupid's own bugs ...
//
//   They don't properly display/update the form for already answered questions
//   that are marked as irrelevant
//
function fixIrrelevance(question) {

    if (hasClass(question, "irrelevant")) return;

    var qid = question.id.substr(9);
    
    var irrelevant_radio = document.getElementById("importance_" + qid + "_5");
    
    if (irrelevant_radio == null) return alert("Irrelevant Radio Not Found for question # " + qid);
    
    var irrelevant_checkbox = document.getElementById("their_answer_any_" + qid);
    
    if (irrelevant_checkbox == null) return alert("Irrelevant CheckBox Not Found for question # " + qid);
    
    if (!irrelevant_checkbox.checked && (irrelevant_checkbox.getAttribute("checked") == null) &&
        !irrelevant_radio.checked && (irrelevant_radio.getAttribute("checked") == null))  return;

    var label = irrelevant_checkbox.parentNode;
    
    if (label.getAttribute("for") == ("their_answer_any_" + qid))  addClass(label, "checked");
    
    label = question.querySelector("label.importance_5");

    if (label.getAttribute("for") == ("importance_" + qid + "_5"))  addClass(addClass(label, "checked"), "highlighted");
    
    irrelevant_checkbox.setAttribute("checked","");
    irrelevant_radio.setAttribute("checked","");
    irrelevant_checkbox.checked = true;
    irrelevant_radio.checked = true;
    
    addClass(question, "irrelevant");
    
};



// Disable answering the given question
//
//   Go through and disable each input, add the disabled class to each label,
//   finally disable the submit button and mark the question div as disabled
//
function disableQuestion(question) {

    var inputs = question.getElementsByTagName("input");
    
    for(var i = 0; i < inputs.length; i++) inputs[i].disabled = true;
    
    var labels = question.getElementsByTagName("label");
    
    for(var i = 0; i < labels.length; i++) addClass(labels[i], "disabled");
    
    var answer_btn = document.getElementById("submit_btn_" + question.id.substr(9));
    
    if (answer_btn != null) addClass(answer_btn, "disabled");
    
    addClass(question, "disabled");

};



// Restore functionality to the Re-answer button
//
//   We should be able to review our own answer to a question, even if it can't
//   be re-answered.  CSS now properly enables display and functionality, but
//   here we copy the time-to-wait before reanswering into the displayed button
//   and properly disable inputs.
//
function restoreReanswerBtn(question) {

    if (!hasClass(question, "cant_reanswer")) return;

    var cant_reanswer = document.getElementById("cant_reanswer_" + question.id.substr(9));
            
    if (cant_reanswer == null) return alert("Can't Reanswer span not found!");
    
    var reanswer_btn = previousElement(cant_reanswer);
    
    if (reanswer_btn.innerHTML == "Re-answer") reanswer_btn.innerHTML = cant_reanswer.innerHTML;
    
    if (hasClass(question, "cant_reanswer") && !hasClass(question, "disabled"))
    
        disableQuestion(question);

};



// Add a direct link used to answer the given question
//
function addPermalink(question) {

    var qid = question.id.substr(9);

    var qform = document.getElementById("answer_" + qid);
    
    if (qform == null) return;

    var permalink = document.getElementById("permalink_" + qid);
    
    if (permalink != null) return;
    
    permalink = document.createElement("a");
    permalink.id = "permalink_" + qid;

    permalink.className = "permalink";
    permalink.href = "/questions?rqid=" + qid;
    permalink.innerHTML = "permalink";

    qform.insertBefore(permalink, qform.firstChild);
};



// Add a direct link used to filter matches who have answered the given question in public
//
function addMatchSearchLink(question) {

    if (hasClass(question, "not_answered")) return;

    var qid = question.id.substr(9);

    var qform = document.getElementById("answer_" + qid);
    
    if (qform == null) return;

    var match_search_link = document.getElementById("match_search_" + qid);
    
    if (match_search_link != null) return;
	
	var acceptable_mask = (document.getElementById("their_answer_any_" + qid).checked) ? 30 : 0;
	
	for(var i = 1; i < 5; i++) {

        var answer = document.getElementById("their_answer_" + i + "_" + qid);
		
		if ((answer != null) && (answer.checked))  acceptable_mask |= 1 << i;

	};
	
	if (acceptable_mask == 0) acceptable_mask = 30;
    
    match_search_link = document.createElement("a");
    match_search_link.id = "match_search_" + qid;

    match_search_link.className = "permalink";
    match_search_link.href = "/match?timekey=1&matchOrderBy=SPECIAL_BLEND&use_prefs=1&discard_prefs=1&count=18&filter1=65," + qid + "," + acceptable_mask;
    match_search_link.innerHTML = "match-search";
	
    qform.insertBefore(match_search_link, qform.firstChild);

	var acceptable_answers = qform.querySelector(".container.acceptable_answers");
	
	if (acceptable_answers == null) return;
	
	acceptable_answers.parentNode.insertBefore(match_search_link, acceptable_answers);
	
};



// Make answering questions Privately the default option
//
function checkAnswerPrivately(question) {

    if (hasClass(question, "cant_reanswer")) return;

    var checkbox = document.getElementById("private_" + question.id.substr(9));
    
    if (checkbox == null) return;
    
    checkbox.setAttribute("checked","");
    checkbox.checked = true;
    
    addClass(checkbox.parentNode, "checked");
    
    if (hasClass(question,"not_answered") || hasClass(question,"answering")) {
        
        removeClass(question, "public");
        addClass(question, "private");
    };
};



// The page has been updated ... make sure to process all new items
//
var static_trigger_once;
function pageUpdated(e) {

    if (static_trigger_once == null)

        static_trigger_once = setTimeout(iterateOverEachQuestion, 1000);
	
};



// Process each and every question on the page
//
function iterateOverEachQuestion() {

    static_trigger_once = null;  //clear call lock
    
    var questions = document.getElementById("questions");

    // Fix OKCupid's own bugs ...
    //   they'll insert a duplicate question div/form when the "new" question being answered
    //   is one of the 10 most recently answered questions, and they fail to properly disable
    //   every input and the submit/answer button when they try to disable "cant_reanswer" questions

    var new_question = questions.querySelector("div#new_question div.question");
    
    if (new_question != null) {
    
        var dupes = questions.querySelectorAll("div#" + new_question.id);
        
        if (dupes.length > 1) dupes[1].parentNode.removeChild(dupes[1]);
        
        if (hasClass(new_question, "disabled")) {
        
            disableQuestion(new_question);
            addClass(new_question, "cant_reanswer");
        };
    };
    
    questions = questions.querySelectorAll("div.question");
    
    for(var i = 0; i < questions.length; i++) {

        var question = questions[i];
        
        var qid = question.id;

        if ((qid == null) || (qid.substr(0,9) != "question_")) continue;
        
        checkAnswerPrivately(question);

        addPermalink(question);

        restoreReanswerBtn(question);
        
        fixIrrelevance(question);

        addMatchSearchLink(question);

    };
};



// Main Function -- use to call other functions in order
//
function init() {

    var questions = document.getElementById("questions");

    if (questions == null) return;

    questions.parentNode.addEventListener("DOMNodeInserted", pageUpdated, false);

    iterateOverEachQuestion();
    
};

init();
