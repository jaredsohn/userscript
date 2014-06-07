// ==UserScript==
// @name       TNP Facelift
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  Beautify the horrible looking TNP notice board. Also comes with a handy navigation between adjacent pages
// @match      http://tp.iitkgp.ernet.in/notice/notice.php?sr_no=*
// @copyright  2012+, Ajay Viswanathan
// ==/UserScript==

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = ('a {background-color: rgb(235, 178, 30); border-radius: 5px; transition-property: background-color; transition-duration: 0.1s; transition-timing-function: linear; -webkit-transition-property: background-color; -webkit-transition-duration: 1s; -webkit-transition-timing-function: linear; } a:hover { background-color: #E1FF00; } ');
document.getElementsByTagName('head')[0].appendChild(style);

var pat = new RegExp('[0-9]+');
var id_no;
id_no = pat.exec(document.URL)[0]; //This stores the number of the current page
id_no++;
var next_num, prev_num;
next_num = id_no;
prev_num = id_no-2;

document.body.style.backgroundColor = '#f3f2ee';
document.body.style.fontFamily = "Droid Sans, Calibri, Helvetica, Arial";
document.body.style.lineHeight = '1.5em';
document.body.style.lineWidth = '60em';
document.body.style.fontSize = '16px';
document.body.style.marginLeft = '400px';
document.body.style.marginRight = '400px';
document.body.style.minWidth = '500px';

var headers;
var headerText;
var title;
var meta;
var content;
var attachments;

var footer = document.createElement("center");
var node = document.createTextNode("TNP Facelift (c) Ajay");
footer.appendChild(node);
footer.style.fontSize = '14px';
footer.style.padding = '10px';

var line = document.createElement("hr");
var gap = document.createElement("br");
var link2attachment = document.createElement("a");

var next = document.createElement("a");
node = document.createTextNode("Next ->");
next.appendChild(node);
next.href = 'http://tp.iitkgp.ernet.in/notice/notice.php?sr_no=' + next_num;
next.style.color = 'black';
//next.style.backgroundColor = '#E1FF00';
//next.style.borderRadius = '10px';
next.style.padding = '10px';
next.style.margin = '-10px';
next.style.position = 'relative';
next.style.right = '245px';
next.style.top = '100px';
var prev = document.createElement("a");
node = document.createTextNode("<- Prev");
prev.appendChild(node);
prev.href = 'http://tp.iitkgp.ernet.in/notice/notice.php?sr_no=' + prev_num;
prev.style.color = 'black';
//prev.style.backgroundColor = '#E1FF00';
//prev.style.borderRadius = '10px';
prev.style.padding = '10px';
prev.style.margin = '-10px';
prev.style.position = 'relative';
prev.style.right = '275px';
prev.style.top = '100px';

var doc;
doc = document.getElementsByTagName('body')[0];

var table;
table = document.getElementsByTagName('table')[0];
var lines;
lines = document.getElementsByTagName('hr')[0];

headerText = doc.getElementsByTagName('h3')[0];
headers = doc.getElementsByTagName('b'); //Gets the title and time of posting
content = doc.getElementsByTagName('div')[0]; //Get the rest of the content
attachments = doc.getElementsByTagName('a')[0]; //Get attachments if any

if (attachments) {
    link2attachment.href = attachments.href;
    link2attachment.textContent = attachments.textContent;
    link2attachment.style.color = 'black';
    link2attachment.style.backgroundColor = '#E1FF00';
    link2attachment.style.borderRadius = '10px';
    link2attachment.style.padding = '10px';
    link2attachment.style.margin = '-10px';
    link2attachment.id = 'attachment_link';
}

headerText.style.color = '#1f0909';
headerText.style.padding = '10px';
headerText.id = 'top_heading';

title = headers[0];
title.style.color = '#2F7474';
title.style.backgroundColor = '#D8D2D2';
title.style.borderRadius = '10px';
title.style.padding = '10px';
title.style.margin = '-10px';
title.id = 'notice_title';

meta = headers[1];
meta.style.color = '#91D3FF';
meta.style.backgroundColor = '#686868';
meta.style.borderRadius = '10px';
meta.style.padding = '10px';
meta.style.margin = '-15px';
meta.style.position = 'relative';
meta.style.right = '150px';
meta.style.top = '50px';
meta.id = 'date_time';

content.style.color = 'white';
content.style.backgroundColor = '#868686';
content.style.borderRadius = '10px';
content.style.padding = '10px';
//content.style.margin = '10px';
//content.style.width = '95%';
content.id = 'notice_text';

doc.removeChild(table);
doc.removeChild(lines);

doc.appendChild(meta);
doc.appendChild(prev);
doc.appendChild(next);
doc.appendChild(gap);
doc.appendChild(title);
doc.appendChild(content);
if (attachments) {
    doc.appendChild(link2attachment);
}
//doc.appendChild(gap);
doc.appendChild(footer);

//alert (meta.textContent);


