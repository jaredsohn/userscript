// ==UserScript==
// @name          Add [QE] to 'zine Forums
// @namespace     http://websandbox.net/
// @description	This adds a QuickEdit feature to the MozillaZine forums. 
// @include       http://forums.mozillazine.org/viewtopic.php*
// ==/UserScript==
// Author: jonnyq (jon@websandbox.net)



(function() { 
var edits = [];
var http = [];
var forms = [];

var as = document.getElementsByTagName("a");
var c = 0;


for(var i = 0; i < as.length; i++) { 
	if(as[i].getAttribute("href") && as[i].getAttribute("href").indexOf("posting.php?mode=editpost") > -1) {
		edits[c] = as[i]; 
		c++;
	}
}

newdocs = []; 
test_http =[];
for(var i = 0; i < edits.length; i++) { 
newdocs[i] = document.createElement("div");
newdocs[i].setAttribute("tabindex",i);
var sFxn = "if(details.readyState != 4) return false;";
sFxn +=    " newdocs["+i+"].innerHTML = details.responseText;";
sFxn +=    " callBack(newdocs["+i+"]);";
GM_xmlhttpRequest({ 
 method:"GET",
 url:edits[i].href,
 onload: new Function("details",sFxn)
});
}

callBack = function(div) { 
var index = div.getAttribute("tabindex");


var xml = div;

var link = edits[index];

/* walk through the tree to get the desired element */
var post = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

if(post.tagName != "TR") return false;
post = post.previousSibling;
while(!post.tagName) post = post.previousSibling; 
post = post.firstChild;  
while(!post.tagName) post = post.nextSibling;
post = post.nextSibling;
while(!post.tagName) post = post.nextSibling; //  by now we have the actual TD that contains the post.

forms = new Array();
forms[index] = createForm(xml);
forms[index].setAttribute("tabindex",index);
forms[index].style.display = "none";

// alert(forms[index].innerHTML);

post.style.position = "relative";
post.appendChild(forms[index]);


var newlink = document.createElement("a");

newlink.appendChild(document.createTextNode("[QE]"));
newlink.setAttribute("tabindex",index);
newlink.addEventListener("click",function() { 

var i = div.getAttribute("tabindex");
var xpath = "//form[@tabindex = '"+i+"']";
var f = (document.evaluate(xpath, document, null, XPathResult.ANY_TYPE,null).iterateNext());
f.style.display = "block";

},false);

link.parentNode.appendChild(newlink);

}

function createForm(doc) { 
  var form = document.createElement("form");


  form.setAttribute("action","posting.php");
  form.setAttribute("method","post");

  var fieldset = document.createElement("fieldset");
  form.appendChild(fieldset);
  
  var legend = document.createElement("legend");
  legend.appendChild(document.createTextNode("Quick Edit"));
  legend.style.fontSize = "10pt";
  fieldset.appendChild(legend);

  var table = document.createElement("table");
  fieldset.appendChild(table);
  var row1 = document.createElement("tr");
  table.appendChild(row1);
  var td1 = document.createElement("td");
  td1.style.width = "100%";
  row1.appendChild(td1);


  var thisTa = doc.getElementsByTagName("textarea")[0]; 
  var newta = document.createElement("textarea");
  td1.appendChild(newta);
  newta.setAttribute("name","message");
  newta.appendChild(document.createTextNode(thisTa.value));
  newta.style.width = "100%";
  newta.style.height = "100px";

  var td2 = document.createElement("td");
  td2.style.fontSize = "8pt"
  td2.style.fontFamily = "monospace";
  td2.style.whiteSpace = "nowrap";
  row1.appendChild(td2);

  inputs = doc.getElementsByTagName("input");
  for(var i = 0; i < inputs.length; i++) { 
      var label = document.createElement("label");
      if(false) 1;
      else if(inputs[i].name == "disable_html") {
		var newi = document.createElement("input");
		label.appendChild(newi);
		newi.setAttribute("type","checkbox");
		newi.setAttribute("name",inputs[i].name);
		newi.setAttribute("value",inputs[i].value);
		if(inputs[i].getAttribute("checked")) newi.setAttribute("checked","checked")
		
		label.appendChild(document.createTextNode("<code>"));
		label.style.textDecoration = "line-through";
		label.setAttribute("title","Disable HTML in this post");

		td2.appendChild(label);
		td2.appendChild(document.createElement("br"));
	}
      else if(inputs[i].name == "disable_bbcode") {
		var newi = document.createElement("input");
		label.appendChild(newi);
		newi.setAttribute("type","checkbox");
		newi.setAttribute("name",inputs[i].name);
		newi.setAttribute("value",inputs[i].value);
		if(inputs[i].getAttribute("checked")) newi.setAttribute("checked","checked")
		
		label.appendChild(document.createTextNode("[code]"));
		label.style.textDecoration = "line-through";
		label.setAttribute("title","Disable BBCode in this post");

		td2.appendChild(label);
		td2.appendChild(document.createElement("br"));
	}
      else if(inputs[i].name == "disable_smilies") {
		var newi = document.createElement("input");
		label.appendChild(newi);
		newi.setAttribute("type","checkbox");
		newi.setAttribute("name",inputs[i].name);
		newi.setAttribute("value",inputs[i].value);
		if(inputs[i].getAttribute("checked")) newi.setAttribute("checked","checked")
		
		var img = document.createElement("img");
		img.src = "data:image/gif;base64,R0lGODlhDwAPALMNAEVFRf%2FqAAAAAP%2F%2F%2F%2F%2FOAP%2FJAP%2B0AP6dAP%2F%2Bk%2F%2F9E%2F%2F%2Fx%2F%2F%2F6%2F%2FlAAAAAAAAAAAAACH5BAEAAA0ALAAAAAAPAA8AAARZsEkJap241aUQIhcGcEkSnMQBTEBnnnC6aogpwHcAasqbB7mCCoD4wXCGSlHAbDqTANtgSh0IClACsEq9qjRaAfe6AxMYTvKXQiAU3m9ZpmKoG4YZlmU2iQAAOw%3D%3D";
		img.alt = ":-)";
		label.appendChild(document.createTextNode("No"));
		label.appendChild(img);
		label.setAttribute("title","Disable smilies in this post");

		td2.appendChild(label);
		td2.appendChild(document.createElement("br"));
	}
      else if(inputs[i].name == "attach_sig") {
		var newi = document.createElement("input");
		label.appendChild(newi);
		newi.setAttribute("type","checkbox");
		newi.setAttribute("name",inputs[i].name);
		newi.setAttribute("value",inputs[i].value);
		if(inputs[i].getAttribute("checked")) newi.setAttribute("checked","checked")
		
		label.appendChild(document.createTextNode("Sign"));
		label.setAttribute("title","Attach Signature");

		td2.appendChild(label);
		td2.appendChild(document.createElement("br"));
	}
      else if(inputs[i].name == "notify") {
		var newi = document.createElement("input");
		label.appendChild(newi);
		newi.setAttribute("type","checkbox");
		newi.setAttribute("name",inputs[i].name);
		newi.setAttribute("value",inputs[i].value);
		if(inputs[i].getAttribute("checked")) newi.setAttribute("checked","checked")
		
		var img = document.createElement("img");
		img.src = "data:image/gif;base64,R0lGODlhDwAPAMQdAP%2FqAEVFRf%2FOAP%2FJAP%2F9E%2F%2B0AP6dAP%2F%2Bk%2F%2F%2Fx391AP%2FlAAAAAL%2BvAP%2F%2F68W1Bi8vL9LBBfPfBHFvV3JwWL%2BwAEpHKbGiAgMDA21rUxQUFOnXBvvnAFNPJgAAAAAAAAAAACH5BAEAAB0ALAAAAAAPAA8AAAVpYCeKQVmOaFc2yHEIJxqwBAHcghGMQWsnCwZORzrYAEAhbtc7Ii%2BUG2CgCxillox0Wigdto7KdtANOAEOzrgs2G4gUgWV2b5JHpPbAEYSCBQAGhgRcjk7fQIDioqGKSUFkAVVKTwmhyMhADs%3D";
		img.alt = "Notify";
		label.appendChild(img);
		label.setAttribute("title","Notify me when a reply is posted");

		td2.appendChild(label);
		td2.appendChild(document.createElement("br"));
	}
  	else if((inputs[i].type == "checkbox" && inputs[i].getAttribute("checked")) ||
               inputs[i].type == "hidden" || 
              (inputs[i].type == "text" || !inputs[i].type)) {
		newi = document.createElement("input");
  	      fieldset.appendChild(newi);
		newi.setAttribute("type","hidden");
		newi.setAttribute("name",inputs[i].name);
		newi.setAttribute("value",inputs[i].value);
        }
  }
  buttondiv = document.createElement("div");
  fieldset.appendChild(buttondiv);
  buttondiv.style.textAlign = "center";
  var preview = document.createElement("input");
  preview.setAttribute("type","submit");
  preview.setAttribute("value","Preview");
  preview.setAttribute("name","preview");
  buttondiv.appendChild(preview);
  
  buttondiv.appendChild(document.createTextNode(" "));


  var submit = document.createElement("input");
  submit.setAttribute("type","submit");
  submit.setAttribute("value","Submit Changes");
  submit.setAttribute("name","post");
  buttondiv.appendChild(submit); 

  buttondiv.appendChild(document.createTextNode(" "));

  var cancel = document.createElement("input");
  cancel.setAttribute("type","button");
  cancel.setAttribute("value","Cancel");
  buttondiv.appendChild(cancel); 
  cancel.addEventListener("click",function() { this.parentNode.parentNode.parentNode.style.display = "none"; },false);


  return form;
  
  
}




})()


