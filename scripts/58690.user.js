// ==UserScript==
// @name           Document Viewer
// @author          alexandrius
// @versio           1.7
// @include        *
// @description    Web Based Document Viewer
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (i=0; i<links.length; i++)
	if(re=links[i].href.match(/.*(\.pdf$)/i))
	  links[i].setAttribute("onclick","if(!confirm('PDF Document;\\nOK: To Open\\nCancel: To Continue Downloading'))return true;window.open('http://docs.google.com/gview?embedded=true&url='+this.href,'gp','height=700,width=800');return false;");
for (i=0; i<links.length; i++)
	if(re=links[i].href.match(/.*(\.doc$)|(\.docs$)|(\.docs$)|(\.odt$)|(\.sxw$)|(\.rtf$)/i))
	  links[i].setAttribute("onclick","if(!confirm('Text Document;\\nOK: To Open\\nCancel: To Continue Downloading'))return true;window.open('http://viewer.zoho.com/api/view.do?cache=false&url='+this.href,'gp','height=700,width=800');return false;");
for (i=0; i<links.length; i++)
	if(re=links[i].href.match(/.*(\.xls$)|(\.csv$)|(\.sxc$)|(\.ods$)|(\.xlsx$)/i))
	  links[i].setAttribute("onclick","if(!confirm('SpreadSheet Document;\\nOK: To Open\\nCancel: To Continue Downloading'))return true;window.open('http://viewer.zoho.com/api/view.do?cache=false&url='+this.href,'gp','height=700,width=800');return false;");
for (i=0; i<links.length; i++)
	if(re=links[i].href.match(/.*(\.ppt$)|(\.pptx$)|(\.pps$)|(\.odp$)|(\.sxi$)/i))
	  links[i].setAttribute("onclick","if(!confirm('Presentation Document;\\nOK: To Open\\nCancel: To Continue Downloading'))return true;window.open('http://viewer.zoho.com/api/view.do?cache=false&url='+this.href,'gp','height=700,width=800');return false;");