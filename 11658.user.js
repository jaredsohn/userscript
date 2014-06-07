// ==UserScript==
// @name           deviantART Quick Notes
// @namespace      http://solitude12.deviantart.com/
// @description    Creates a popup box, when clicked on "Send A Note" on any userpage, that allows you to send a note! It's quick, easy, and efficient!
// @include        http://*.deviantart.com/
// ==/UserScript==

if (document.getElementById("exitlinker")){
/*
Script (c) Solitude - http://solitude12.deviantart.com
PLEASE dont COPY :|
*/
const deviantNAME = window.location.host.substring(0, window.location.host.indexOf(".")).toLowerCase();
document.getElementById('deviant-commands').innerHTML = document.getElementById('deviant-commands').innerHTML.replace(/<a href=\"http:\/\/my.deviantart.com\/notes\/(.*)\">Send a note<\/a>/, '<a style="cursor:pointer;" id="notesbuttontoclickplz">Send a note</a>');
var iscreated=false;
function removeME(id){
	document.getElementsByTagName('body')[0].removeChild(document.getElementById(id));
}
function createbox(){
	iscreated=true;
	var box = document.createElement('div');
	box.setAttribute("id","daquicknotesbox");
	box.setAttribute("style", "background-color: #FFFFFF; opacity: 0.95; position: absolute; z-index:10000; left:auto;  width: 350px; padding: 20px; border-width: 1px; border-color: #374341; border-style: solid; font-size: 8.5pt; color: #333333;");
	box.style.top = (window.innerHeight/2) - (325/2) + "px";
	box.style.left = (window.innerWidth/2) - (350/2) + "px";
	document.getElementsByTagName('body')[0].appendChild(box);
	box.innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.0</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><table style="width:100%;"><tr><td style="width:10%;">Subject:</td><td><input type="text" id="notessubject" style="width:100%"/></td></tr><tr><td style="width:10%;">Message:</td><td><textarea id="notesmessage" style="width:100%; height:200px;"></textarea></td></tr><tr><td></td><td align=right><input type="submit" id="sendnote" value="Send!"/></td></tr></table>';
	
	document.getElementById('daquicknotesboxclose').addEventListener('click', function(e){
		removeME('daquicknotesbox');
		iscreated=false;
	}, false);

	document.getElementById('sendnote').addEventListener('click', function(e){
		var subject = document.getElementById('notessubject').value;
		var message = document.getElementById('notesmessage').value;
		if (!subject || !message) {alert('You forgot something!'); return;}
		document.getElementById('daquicknotesbox').innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.0</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><img src="http://www.famfamfam.com/lab/icons/silk/icons/time.png"/><b>Sending Note...</b><br/><br/><br/><br/></div>';
		message += "<br />---<br /><sup>Sent using <b><a href=\"http://www.deviantart.com/deviation/63032228/\">deviantART Quick Notes</b></a> v2.0 by :devSolitude12:</sup>";
		var daDATA = encodeURI('ref=' + window.location.href + '&recipients=' + deviantNAME + '&subject=' + subject + '&body=' + message);
		GM_xmlhttpRequest({
			method:"POST",
			url:"http://my.deviantart.com/notes/send",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: daDATA, 
			onload: function (responseDetails) { 
				if (responseDetails.statusText == 'OK'){
					document.getElementById('daquicknotesbox').innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.0</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><b>Message Sent!</b><br/><br/><br><br></div>';
					setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('daquicknotesbox'))", 1000);
				} else {
					document.getElementById('daquicknotesbox').innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.0</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><b>Oops! There was an error!</b><br><br></div>';
					setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('daquicknotesbox'))", 1000);	
				} 
			},
			onerror: function(responseDetails){			
				document.getElementById('daquicknotesbox').innerHTML = '<img id="close" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.0</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><b>Oops! There was an error!</b><br><br></div>';
				setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('daquicknotesbox'))", 1000);
			}   
		});
		iscreated=false;
	}, false);

}

document.getElementById('notesbuttontoclickplz').addEventListener('click', function(e){
	if (!iscreated)
	createbox();
}, false);
}