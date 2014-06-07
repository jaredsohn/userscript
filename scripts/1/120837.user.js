// ==UserScript==
// @name           Pardus Multi Message
// @namespace      pardus.rukh.de
// @version        1.04w
// @author         Ivar (Artemis) - Slightly modified to only work on blank messages.
// @description    Enhances the Pardus message to allow multi recipients.
// @include        http://*.pardus.at/sendmsg.php
// ==/UserScript==

Array.prototype.unique = function() {
	var o = {}, i, l = this.length, r = [];    
	for(i=0; i<l;i+=1) 
		o[this[i]] = this[i];    
	for(i in o) r.push(o[i]);    
	return r;
};

var msgcount = 0;
var oldstyle;

var checkbutton = document.getElementsByName('checkname')[0];
var subject = document.getElementsByName('textfield')[0];
var body = document.getElementsByName('textarea')[0];

subject.style.width = '99.3%';

if(typeof checkbutton == "undefined") return;

checkbutton.parentNode.removeChild(checkbutton);

var oldrecp = document.getElementById('recipient2');

var newrecp = document.createElement('textarea');
newrecp.setAttribute('name', 'recipient');
newrecp.setAttribute('id', 'recipient2');
newrecp.setAttribute('tabindex', 1);
newrecp.setAttribute('title', 'Please enter a comma separated list of names.');
for (var i= body.style.length; i-->0;) {
    var n= body.style[i];
    newrecp.style.setProperty(n,
        body.style.getPropertyValue(n),
        priority= body.style.getPropertyPriority(n)
    );
}
newrecp.style.width = '99.3%';

oldrecp.parentNode.replaceChild(newrecp, oldrecp);

newrecp.parentNode.colSpan = '2';
subject.parentNode.colSpan = '2';
newrecp.parentNode.parentNode.removeChild(newrecp.parentNode.parentNode.lastChild.previousSibling);

var button = document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'Send');
button.style.width = '100px';
button.setAttribute('tabindex', 4);

button.addEventListener('click', function () { sendMessages(this); }, false);

var inp = document.getElementById('Send');
inp.parentNode.replaceChild(button, inp);

button.parentNode.style.width = '120px';

var p = document.createElement('p');
p.style.fontSize = '90%';
p.innerHTML = "Please be sure, whom you send a message and remember the <a href=\"http://www.pardus.at/index.php?section=rules\">Rule against Spamming</a>.";

document.getElementById('sendform').appendChild(p);

var bcc = document.createElement('input');
bcc.setAttribute('type', 'checkbox');

var atsig = document.getElementById('attach_signature');
atsig.parentNode.insertBefore(bcc, atsig);
atsig.parentNode.insertBefore(document.createTextNode('BCC'), atsig);

var error = false;

function getRecipients() {
	var arr = newrecp.value.replace(/(^\s*)|(\s*$)/g, "").split(",");

	for(var i = 0; i < arr.length; i++)
		arr[i] = arr[i].replace(/(^\s*)|(\s*$)/g, "");

	return arr.unique();
}

function sendMessages(button) {
	if(newrecp.value == "") {
		alert("Please enter at least one recipient!");
		newrecp.focus();
		return false;
	}

	if(body.value == "") {
		alert("Please enter a message!");
		body.focus();
		return false;
	}

	oldstyle = button.style.backgroundColor;
	button.style.backgroundColor = '#999';
	button.disabled = true;
	button.setAttribute('value', 'Sending...');

	newrecp.disabled = true;
	subject.disabled = true;
	body.disabled = true;

	error = false;
	
	var d = document.getElementById('errormsg');

	if(d != null)
		d.parentNode.removeChild(d);

	var recipients = getRecipients();

	msgcount = recipients.length;

	for(var i = 0; i < recipients.length; i++) {
		sendXMLHTTP(recipients[i], subject.value, body.value);
	}
}

function sendXMLHTTP(to, subj, msg) {
	var sig = document.getElementById('attach_signature');
	if(!sig.disabled)
		sig = "&attach_signature="+sig.value;
	else
		sig = "";

	if(!bcc.checked && getRecipients().length > 1) {
		msg += "\nCC: "+getRecipients().join(", ");
	}

	var post = "recipient="+encodeURIComponent(to)+"&textfield="+encodeURIComponent(subj)+ 
		    "&textarea="+encodeURIComponent(msg)+sig+"&Send=Send";

	GM_xmlhttpRequest({
		method: "POST",
		url: document.location,
		data: post,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": post.length
		},
		onload: function(response) {
			--msgcount;

			var nop = response.responseText.indexOf("This player does not exist!");
			var nos = response.responseText.indexOf("Sorry, you cannot send yourself messages");
	
			if(nop > -1) {
				error = true;
				button.disabled = false;
				button.style.backgroundColor = oldstyle;
				button.setAttribute('value', 'Send');

				newrecp.disabled = false;
				subject.disabled = false;
				body.disabled = false;

				var d = document.getElementById('errormsg');

				if(d == null) {
					var d = document.createElement('div');
					d.setAttribute('id', 'errormsg');
					d.style.color = '#c00';
					d.style.fontWeight = 'bold';

					var s = document.createElement('span');
	
					d.appendChild(document.createTextNode('The following pilots do not exist: '));
					d.appendChild(s);
					s.appendChild(document.createTextNode(to));
					d.appendChild(document.createElement('br'));
					d.appendChild(document.createTextNode('Be aware, that the rest of the messages are already on their way!'));

					newrecp.parentNode.appendChild(d);
				} else {
					d.children[0].appendChild(document.createTextNode(', '+to));
				}				
				
				newrecp.focus();
				return;
			} else if (nos > -1) {
				error = true;
				button.disabled = false;
				button.style.backgroundColor = oldstyle;
				button.setAttribute('value', 'Send');

				newrecp.disabled = false;
				subject.disabled = false;
				body.disabled = false;

				alert('You can not send a message to yourself!');
				newrecp.focus();
				return;
			}

			if(msgcount == 0 && !error) {
				var arr = getRecipients();

				if(arr.length > 1)
					alert("Send a message to the following pilots:\n"+arr.join("\n"));

				self.close();
			}
		}
	});
}

