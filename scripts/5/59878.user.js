// ==UserScript==
// @name           Zendesk: Add Signature
// @namespace      http://www.shannonkleiner.com
// @description    Automatically adds the agent's signature to the comment field in Zendesk if the ticket is assigned to that agent
// @include        http://*.zendesk.com/*
// ==/UserScript==

/*************************************

INSTRUCTIONS
Change the following information in the specified sections directly below this instruction area (below the next line of asterisks), starting with the "// Your information" section (only modify the text within the quotation marks):

1. Your information > name
Must exactly match your name as it appears in Zendesk.

2. Your information > title
Your position title.

3. Your information > extension
Your phone extension -- just the numbers.

4. Your information > signoff
Signature signoff ("Sincerely," "Regards," et cetera).

5. Company information > company
Your company's name.

6. Company information > phone
Your company's main phone number.

7. Initial greeting > firstword
The first part of the greeting; could be something like "Hello", "Hey", or "Hi there".

8. "Contact Me" section > sentence
This is a sentence that can appear before your signoff & signature.

9. "Contact Me" section > sentenceAdd
Put 1 if you want the above sentence added to the top of your signature. Put 0 if not.

*************************************/

// Your information
name = "Joe Smith";
title = "General Manager";
extension = "1234";
signoff = "Best regards,"

// Company information
company = "ACME Industries";
phone = "800-555-6789";

// Initial greeting
firstWord = "Hi";

// "Contact Me" section
sentence = "If you have any further questions or concerns, please don't hesitate to let me know!"
sentenceAdd = 1;

/*************************************
DON'T EDIT BELOW THIS LINE
*************************************/

// Grabs the client's first name
requester = document.getElementById('zendesk_ticket_requester').innerHTML;
if(requester.indexOf(",") > -1) {
	requester = ", "+(requester.split(", "))[1]+",\n\n";
} else {
	requester = ", "+(requester.split(" "))[0]+",\n\n";
}

// Creates the initial greeting with the client's first name
greeting = firstWord+requester;

// Compiles signature
sig = signoff+"\n\n"+name+"\n"+title+"\n"+company+"\n"+phone+", ext. "+extension;

// Determines ticket assignee
assigneeIndex = document.getElementById('ticket_assignee_id').selectedIndex;
assigneeValue = document.getElementById('ticket_assignee_id') [assigneeIndex].innerHTML;

// Sees if there's any content in the textarea already
comment = document.getElementById('comment_value').value;

// Adds signature
if (assigneeValue == name && comment == "" && sentenceAdd == 1) {
	document.getElementById('comment_value').innerHTML=greeting+"\n\n"+sentence+"\n\n"+sig;
} else if (assigneeValue == name && comment == "" && sentenceAdd == 0) {
	document.getElementById('comment_value').innerHTML=greeting+"\n\n"+sig;
}