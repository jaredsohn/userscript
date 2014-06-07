// ==UserScript==
// @name           indicPost
// @namespace      teluguOrkut
// @author         Siva
// @include        http*.orkut.*CommMsgPost?*
// ==/UserScript==

scraapText="scra"+"pText";
// get the default textarea
msgBox=document.getElementById('messageBody');
// change it's id to scraap Text so that the transliteration script can work on it
msgBox.id=scraapText;
// since the event handlers are overriden, alternate method is used to update char count
setInterval ( "updateCharCount('"+scraapText+"','charCount',2048)", 1000 );

// container
span=document.createElement('span');
span.setAttribute("class","r_button_span");
span.innerHTML='<div id="scra'+'pInputContainer"><div class="lf para scra'+'pbox"><div class="lf"><div id="hosted"></div></div></div><script type="text/javascript">JSHDF["Transliteration.language"]="te";</script>';

// add the container to the parent of the msgbox
msgBox.parentNode.appendChild(span);

// transliteration script is added here
script= document.createElement('script');
script.src="http://static1.orkut.com/js/gen/orkut-transliteration007.js";
msgBox.parentNode.appendChild(script);