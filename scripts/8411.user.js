// ==UserScript==
// @name          Gmail Multiple Signatures, plus Float
// @namespace     
// @description    Applies different signatures (look for 'Use identity:') for writing gmail messages when different From: address is chosen. Right now, data has to be configured directly into this script. Click EDIT to configure your email and signatures: email_array, sig_array, col_array. Inserts signature above any quoted messages.
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
//
/////////////////////////////////////////////////////////////

// 31 May 2007: Clarified usage documentation within code below to better indicate what needs to be edited for use.
//
// 18 May 2007: Updated to reflect changes in Gmail's code. Replaced all instances (there are two) of "window.frames[0]" with "window.frames[1]".
//
//  9 April 2007: Hacked to insert signature before any quoted messages (both Forwards and Replies), instead of at end of email body.
//				  Options to insert signature at top of message too (scroll down and comment in/out lines in "htmlJS" method).
//
// 20 March 2006: Gmail UI reverted to using old 'id'. Perhaps they'd realised they broken so many scripts.
//                Patched and able to use both current and previous Gmail UI 'id' (Thanks to Michael Gilman for the heads-up)
//
// 16 March 2006: Fixed small issue on 'compose new' page.
//                Updated xpath on selecting <select /> node based on Gmail UI changes
//
// To setup, edit the 3 arrays in this script:
//    * email_array, 
//    * sig_array, 
//    * col_array,

// values must match GMail "From:" dropdown options
// values must match GMail "From:" dropdown options
email_array = [
  'your_email_address_1@gmail.com', 
  'your_email_address_2@email.com',
];

// replace "Sample line1" and "Sample line2" with lines 1 and 2 of your own signature;
// Note: your_email_address_1 uses the signature beginning with "Sample line1"
//       your_email_address_2 uses the signature beginning with "STRICTLY CONFIDENTIAL"
sig_array = [
  '-- \\n' +
    'Sample line1\\nSample line2\\n',
  '--\\n' +
    '<pre>\\n' +  
    'STRICTLY CONFIDENTIAL  -  This message, its contents and any files\\n' +
    'transmitted  with it are intended SOLELY for  the addressee(s) and\\n' +
    'blah blah blah\\n' +
	'</pre>\\n',    
];


col_array = [
  '#FFFFFF', // <-- color applies to signature 1
  '#F00000', // <-- color applies to signature 2
];

//
/////////////////////////////////////////////////////////////
//
// 28 August 2005
// - First release. Need to configure email, colors and signatures directly in Greasemonkey script: see below for email_array, sig_array, col_array
//
// ==/UserScript==

// function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698    
function addHTML (ele, html) {
  if (document.all)
    ele.insertAdjacentHTML('beforeEnd', html);
  else if (document.createRange) {
    var range = document.createRange();
    range.setStartAfter(ele.lastChild);
    var docFrag = range.createContextualFragment(html);
    ele.appendChild(docFrag);
  }
  else if (document.layers) {
    var l = new Layer(window.innerWidth);
    l.document.open();
    l.document.write(html);
    l.document.close();
    l.top = document.height;
    document.height += l.document.height;
    l.visibility = 'show';
  }
}

// helper function copied from "Google Image Relinker" Greasemonkey script
function selectNodes(doc, context, xpath) {
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );
   
   for (var x=0; x < result.length; x++) 
   {
    result[x] = nodes.snapshotItem(x);
   }
   
   return result;
}

function array_to_string(array) {
  str = "";
  for (i = 0; array && i < array.length ; i++ )
  {
    str = str + "\"" + array[i] + "\"";
    if ((i+1) < array.length)
    {
      str = str + ", ";
    }
  }
  return str;
}


// inbox, topselect id=tamu, bottom select id=bamu
if (document.getElementById("compose_form"))
{
  nodes = selectNodes(document, document.body, "//a[contains(@href, 'applyIdentityFn')]");
  if (nodes && nodes.length > 0) {
	  // don't re-do on refresh
	  return;
  }

  htmlJS = 
    "<script language='javascript'>\n" + 
    "<!-- \n" + 
    "color_array = [" + array_to_string(col_array) + "];\n" +
    "email = [" + array_to_string(email_array) + "];\n" +
    "sig = [" + array_to_string(sig_array) + "];\n" +
    "\n" +
    "function addHTML (ele, html) {\n" + 
    "  if (document.all)\n" + 
    "    ele.insertAdjacentHTML('beforeEnd', html);\n" + 
    "  else if (document.createRange) {\n" + 
    "    var range = document.createRange();\n" + 
    "    range.setStartAfter(ele.lastChild);\n" + 
    "    var docFrag = range.createContextualFragment(html);\n" + 

//	insert signature at bottom of email
//	"    ele.appendChild(docFrag);\n" + 

//	insert signature at top of document body (instead of bottom)
//	" ele.insertBefore(docFrag,ele.firstChild);\n" + 

//	insert signature before quoted messages (forwards and replies) -- update of 4/9/2007
    "    var bForward=false;\n" + 
    "    var cNode=ele.firstChild;\n" + 
    "    while(cNode){\n" + 
    "      if (cNode.nodeName==='#text'){\n" +
    "        if (cNode.nodeValue==='---------- Forwarded message ----------'){bForward=true;break;}\n" +
    "      }\n" +
    "      cNode=cNode.nextSibling;\n" +
    "    }\n" + 
    "    if(bForward){\n" + 
    "      ele.insertBefore(docFrag,cNode);\n" + 
    "    }else{\n" + 
    "      var xpath=\"//div/span[@class='gmail_quote']\";\n" + 
    "      var qNodes=document.evaluate(xpath,ele,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);\n" + 
    "      if (qNodes.snapshotLength>0){ele.insertBefore(docFrag,qNodes.snapshotItem(qNodes.snapshotLength-1).parentNode);}\n" + 
    "      else{ele.appendChild(docFrag);}\n" + 
    "    }\n" + 
    "  }\n" + 
    "  else if (document.layers) {\n" + 


    "  }\n" + 
    "  else if (document.layers) {\n" + 
    "    var l = new Layer(window.innerWidth);\n" + 
    "    l.document.open();\n" + 
    "    l.document.write(html);\n" + 
    "    l.document.close();\n" + 
    "    l.top = document.height;\n" + 
    "    document.height += l.document.height;\n" + 
    "    l.visibility = 'show';\n" + 
    "  }\n" + 
    "}\n" + 
    "function applyIdentityFn(array_int) {\n" + 
    "  form = document.getElementById('compose_form');\n" + 
    "  \n" +
    "  if (! form.from || ! form.from.options) {\n" +
    "    alert('First, make sure your From: field select-able!');\n" +
    "    return;\n" +
    "  }\n" +
    "  \n" +
    "  form.from.value = email[array_int];\n" + 
    "  document.body.style.backgroundColor = color_array[array_int];\n" +
    "  if (form.ta_compose) {\n" + 
	"    if (sig[array_int].indexOf('<pre>') != -1) {\n" + 
    "      form.ta_compose.value = form.ta_compose.value + \n" +
    "        '\\n' + sig[array_int].replace(/<(|\\/)pre>/g, '');\n" +
    "    } else {\n" + 
    "      form.ta_compose.value = form.ta_compose.value + \n" +
    "        '\\n' + sig[array_int];\n" +
    "    }\n" + 
    "  } else if (window.frames.length > 0) {\n" +
	  "    if (sig[array_int].indexOf('<pre>') != -1) {\n" + 
	  "      addHTML(window.frames[1].document.body, sig[array_int]);\n" +  
    "    } else {\n" + 
    "      addHTML(window.frames[1].document.body, sig[array_int].replace(/\\n/g, '\\n<br/>'));\n" +
    "    }\n" + 
    "  } else if (form.msgbody) {\n" + 
    "    form.msgbody.value = form.msgbody.value + \n" +
    "      '\\n' + sig[array_int];\n" +
    "  } else {\n" +
    "    // alert('no change');\n" +
    "  }\n" +
    "  \n" +
    "}\n" +
    "// -->\n" + 
    "</script>\n" +
    "";
  // appending client-side javascript to document
  addHTML(document.body, htmlJS);

  // placing email addy links at the footer
  email_href = '<div class="tbcs">Use identity:';
  for (i = 0; i < email_array.length ; i++ )
  {
    email_href = email_href + "<a href='javascript: applyIdentityFn(\"" + i + "\");'>" + email_array[i] + "</a>";
    if ((i+1) < email_array.length)
    {
      email_href = email_href + ', ';
    }
  }
  email_href = email_href + '</div>';
  nodes = selectNodes(document, document.body, "//select[@id = 'cbam' or @id = 'ctam' or @name = 'from']");
  for (i = 0; nodes && i < nodes.length; i++)
  {
    addHTML((nodes[i].name == 'from' ? nodes[i].parentNode : nodes[i].parentNode.parentNode), email_href);
  }
  nodes = selectNodes(document, document.body, "//select[@id = 'cbamu' or @id = 'ctamu']");
  for (i = 0; nodes && i < nodes.length; i++)
  {
    addHTML(nodes[i].parentNode, email_href);
  }  
}

