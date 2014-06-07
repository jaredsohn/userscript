// ==UserScript==
// @name           Intersteno - monospace font
// @namespace      intersteno
// @include        http://*.intersteno.*
// ==/UserScript==
function changeFont() {
	if(document.getElementById('change_font').value) {
		var a=document.getElementsByTagName("applet")[0];
		a.SECONDARY_FONTNAME="Monospaced";
		a.remove(a.typingPanel);
		a.add("TypingPanel",a.typingPanel=new a.Packages.it.intersteno.TypingSoftware.TypingPanel(a.getAppletContext().getApplets().nextElement()));
		clearInterval(document.getElementById('change_font').value);
		void(0);
	}
}
var s=document.createElement('script');
s.innerHTML=changeFont;
document.body.appendChild(s);
var hidden_elm=document.createElement('input');
hidden_elm.id='change_font';
hidden_elm.type='hidden';
hidden_elm.value=setInterval("changeFont()", 1000);
document.body.appendChild(hidden_elm);