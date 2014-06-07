// ==UserScript==
// @name           SMF - Multiedit.
// @namespace      http://dttvb.yi.org/
// @include        *index.php?topic=*.*
// @include        *index.php/topic,*.*
// @description    Edit more than one messages at a time.
// ==/UserScript==

(function() {

//
// The Multiedit Userscript
//                  for Simple Machines Forum 1.1.
//

//
// I said for Simple Machines Forum 1.1.
// You're not.
//
if (!unsafeWindow.smf_scripturl)
	return;

//
// This script only applies for the view topic.
//
if (!unsafeWindow.modify_msg)
	return;

//
// The ultimate function. What does it do?
// Uh... I didn't remember... Forget it.
//
function theUltimateFunction() {
	
}

//
// Make w an alias of unsafeWindow.
//
var w = unsafeWindow;

//
// The buffer!!
//
var bfs = {};
var sss = '';

//
// When the original message has been recieved.... What should I do....??
//
function quoteFastRecieved(XMLDoc) {

	//
	// Precreate the variable.
	//
	var text = '';
	var subject = '';

	//
	// Grab the message ID.
	//
	var cur_msg_id = XMLDoc.getElementsByTagName("message")[0].getAttribute("id");
	
	//
	// Create the buffer.
	//
	bfs[cur_msg_id] = {};

	//
	// Get the message...
	//
	for (var i = 0; i < XMLDoc.getElementsByTagName("message")[0].childNodes.length; i++)
		text += XMLDoc.getElementsByTagName("message")[0].childNodes[i].nodeValue;
	
	//
	// Add the message part into the buffer.
	//
	bfs[cur_msg_id].mdiv = document.getElementById(cur_msg_id);
	bfs[cur_msg_id].msg  = w.getInnerHTML(bfs[cur_msg_id].mdiv);

	//
	// Now I have the message buffer so I can safely REPLACE!!!
	//
	text = text.replace(/\$/g, "{&dollarfix;$}");
	text = w.smf_template_body_edit.replace(/name="message"/, 'name="message_' + cur_msg_id + '"').replace(/modify_cancel\(/, 'modify_cancel(\'' + cur_msg_id + '\'').replace(/modify_save\(/, 'modify_save(\'' + cur_msg_id + '\',').replace(/%body%/, text).replace(/%msg_id%/g, cur_msg_id.substr(4));
	text = text.replace(/\{&dollarfix;\$\}/g,"$");
	w.setInnerHTML(bfs[cur_msg_id].mdiv, text);
	
	//
	// Do the same to subject.
	//
	bfs[cur_msg_id].sdiv = document.getElementById('subject_' + cur_msg_id.substr(4));
	bfs[cur_msg_id].subj = w.getInnerHTML(bfs[cur_msg_id].sdiv);

	subject = XMLDoc.getElementsByTagName("subject")[0].childNodes[0].nodeValue;
	subject = subject.replace(/\$/g,"{&dollarfix;$}");
	subject = w.smf_template_subject_edit.replace(/name="subject"/, 'name="subject_' + cur_msg_id + '"').replace(/%subject%/, subject);
	subject = subject.replace(/\{&dollarfix;\$\}/g,"$");
	w.setInnerHTML(bfs[cur_msg_id].sdiv, subject);

	//
	// We've finished loading, haven't we?
	//
	if (typeof w.ajax_indicator == "function")
		w.ajax_indicator(false);

}

//
// We've finished the modification.
//
function modify_done(XMLDoc, cur_msg_id) {

	//
	// Get the message, body, and errors.
	//
	var message = XMLDoc.getElementsByTagName("smf")[0].getElementsByTagName("message")[0];
	var body = message.getElementsByTagName("body")[0];
	var error = message.getElementsByTagName("error")[0];

	if (body) {
		//
		// Show the new body.
		//
		var bodyText = '';
		for (i = 0; i < body.childNodes.length; i++)
			bodyText += body.childNodes[i].nodeValue;

		bodyText = bodyText.replace(/\$/g,"{&dollarfix;$}");
		bodyText = w.smf_template_body_normal.replace(/%body%/, bodyText);
		bodyText = bodyText.replace(/\{&dollarfix;\$\}/g,"$");
		w.setInnerHTML(bfs[cur_msg_id].mdiv, bodyText);
		bfs[cur_msg_id].msg = bodyText;

		//
		// Subject too...
		//
		var subject = message.getElementsByTagName("subject")[0];
		var subject_text = subject.childNodes[0].nodeValue;
		subject_text = subject_text.replace(/\$/g,"{&dollarfix;$}");
		var subject_html = w.smf_template_subject_normal.replace(/%msg_id%/g, cur_msg_id.substr(4)).replace(/%subject%/, subject_text);
		subject_html = subject_html.replace(/\{&dollarfix;\$\}/g,"$");
		w.setInnerHTML (bfs[cur_msg_id].sdiv, subject_html);
		bfs[cur_msg_id].sobj = subject_html;

		//
		// Update the subject at the top...if it is the first message.
		//
		if (subject.getAttribute("is_first") == 1) {
			var subject_top = smf_template_top_subject.replace(/%subject%/, subject_text);
			subject_text = subject_text.replace(/\{&dollarfix;\$\}/g,"$");
			w.setInnerHTML (w.document.getElementById("top_subject"), subject_text);
		}

		//
		// Modified..when?
		//
		if (w.smf_show_modify) {
			var cur_modify_div = document.getElementById('modified_' + cur_msg_id.substr(4));
			w.setInnerHTML(cur_modify_div, message.getElementsByTagName("modified")[0].childNodes[0].nodeValue);
		}
	//
	// What? An error?
	//
	} else if (error) {
		setInnerHTML(document.getElementById("error_box"), error.childNodes[0].nodeValue);
		document.forms.quickModForm.message.style.border = error.getAttribute("in_body") == "1" ? "1px solid red" : "";
		document.forms.quickModForm.subject.style.border = error.getAttribute("in_subject") == "1" ? "1px solid red" : "";
	}

	//
	// Finish.
	//
	if (typeof window.ajax_indicator == "function")
		ajax_indicator(false);
}


//
// The cool cancel function.
//
w.modify_cancel = function(msg_id) {
	//
	// Let's restore it.
	//
	bfs[msg_id].mdiv.innerHTML = bfs[msg_id].msg;
	bfs[msg_id].sdiv.innerHTML = bfs[msg_id].subj;
	return false;
};

//
// The save function.
//
w.modify_save = function(msg_id, cur_session_id) {
	//
	// Create the post data.
	//
	var x = [];
	x[x.length] = 'subject=' + escape(w.textToEntities(w.document.quickModForm['subject_' + msg_id].value.replace(/&#/g, "&#38;#"))).replace(/\+/g, "%2B");
	x[x.length] = 'message=' + escape(w.textToEntities(w.document.quickModForm['message_' + msg_id].value.replace(/&#/g, "&#38;#"))).replace(/\+/g, "%2B");
	x[x.length] = 'topic=' + w.smf_topic;
	x[x.length] = 'msg=' + parseInt(msg_id.substr(4));

	//
	// Start sending.
	//
	if (typeof w.ajax_indicator == "function")
		w.ajax_indicator(true);
	w.sendXMLDocument(w.smf_scripturl + "?action=jsmodify;topic=" + w.smf_topic + ";sesc=" + sss + ";xml", x.join("&"), function(x) {
		modify_done (x, msg_id)
	});

	return false;
};

//
// Let's modify the modify_msg function.
// This code was from xml_topics.js but many parts were deleted.
//
w.modify_msg = function(msg_id, cur_session_id) {
	//
	// What browser you're using!
	//
	if (!w.XMLHttpRequest)
		return;

	//
	// Load the document.
	//
	sss = cur_session_id;
	if (typeof w.ajax_indicator == "function")
		w.ajax_indicator(true);
	w.getXMLDocument(w.smf_scripturl + '?action=quotefast;quote=' + msg_id + ';sesc=' + cur_session_id + ';modify;xml', quoteFastRecieved);
}

})();