// ==UserScript==
// @name           CSM: Mail
// @namespace      http://userscripts.org/users/26666
// @description    Automatically quotes messages in replies and adds signature to every new message.
// @include        http://www*.cs-manager.com/csm/other/?p=other_info&s=mail&u=*
// @include        http://www*.cs-manager.com/csm/?p=manager_mail&s=new&m=*
// @version        0.2
// ==/UserScript==

/*
 For more information about special characters google "special characters javascript"
 
 Special characters:
 
CHAR    INFORMATION

\'  	Single quotation mark
\" 	Double quotation mark
\\ 	Backslash
\b 	Backspace
\f 	Form feed
\n 	New line
\r 	Carriage return
\t 	Horizontal tab
\ddd 	Octal sequence (3 digits: ddd)
\xdd 	Hexadecimal sequence (2 digits: dd)
\udddd 	Unicode sequence (4 hex digits: dddd)


 
 So, for EXAMPLE if you want your signature look like this:
 Lorem ipsum dolor sit amet,
 consectetuer adipiscing elit.
 "I love candies."
 John.
 
 According to the 'table' above you should put \n instead of pressing Enter key and \\" instead of "
 So it'd look like this:
 Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit.\n\\"I love candies.\\"\nJohn.
 
 Declare variable mySig with value Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit.\n\\"I love candies.\\"\nJohn.
 var mySig = "Lorem ipsum dolor sit amet,\nconsectetuer adipiscing elit.\n\\"I love candies.\\"\nJohn."
 

 Done. Now try it yourself. It isn't hard at all.
 
 If you aren't so advanced, change CSMPLAYER to your nickname below:
 
*/

var mySig = "Regards,\nCSMPLAYER";


//This function adds your signature to the textarea
function addSig(){
        this.value += "\n\n" + mySig;
        this.removeEventListener("blur", addSig, false);
        }

// XPath helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

// Wait until the page is fully loaded
window.addEventListener("load", function(){

	// if new mail
	if (document.getElementById("text") == undefined)
	{
		var textField = document.getElementById('mail_text');
	}
	else // if reply; I've rewritten whole quoting stuff
	{
		var textField = document.getElementById('text');
		
     		var whoWrote = document.evaluate("//form[@id=\"form\"]/table/tbody/tr[7]/td",
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		whoWrote = whoWrote.snapshotItem(0).textContent;

		var whatQuote = "";

		var whatWrote = $x("//form[@id=\"form\"]/table/tbody/tr[8]/td/p");
		whatWrote.forEach(function(el){
			whatQuote += "\n>" + el.textContent.replace(/\n/, "\n>");
		});

		textField.value = whoWrote + whatQuote + "\n\n";
	}

	textField.focus(); // cursor on textarea
	textField.addEventListener("blur", addSig, false); // add

}, false);