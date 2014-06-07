// ==UserScript==
// @name	  CKDBSIG
// @namespace	  
// @description	  Gives buttons to add Signature and/or Farm Town Link.
// @version	  0.0.1
// @include	  http://www.facebook.com/*
// @author	  Pete McDermott (Thanks to Chris465)
// ==/UserScript==




if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  run();
}

function addChar(txtarea,charac){
	var intEnd = txtarea.selectionEnd;
	var intStart = txtarea.selectionStart;
	
	var Start = (txtarea.value).substring(0,intStart);
	
	var End = (txtarea.value).substring(intEnd);
	
	var text = charac ;
	text += (txtarea.value).substring(intStart,intEnd);

	
	txtarea.value = Start + text + End;
	txtarea.selectionStart = intStart;
	txtarea.selectionEnd = intEnd;
} 



function run () {	
  	var them = document.getElementsByTagName("textarea");
  	for(var i = them.length - 1; i >= 0; i--) {
    	tweak_textarea(them[i]);
	}
  return;
}


function tweak_textarea (t) {
  var d	  = t.ownerDocument;
  var p   = t.parentNode;
  var n   = t.nextSibling;


//<button type="button" style="font: bold 12px Arial">B</button>
	buttonSign = d.createElement('button');
	buttonSign.setAttribute('type','button');
	buttonSign.setAttribute('style','font: bold 12px Arial');
	buttonSign.appendChild(d.createTextNode("Sign"));
  	buttonSign.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonSign.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	p.appendChild(buttonSign);
	//p.insertBefore(buttonSign, t);
//<button type="button" style="font: bold 12px Arial">B</button>
	buttonLink = d.createElement('button');
	buttonLink.setAttribute('type','button');
	buttonLink.setAttribute('style','font: bold 12px Arial');
	buttonLink.appendChild(d.createTextNode("Link"));
  	buttonLink.style.display = document.defaultView.getComputedStyle(t, null).getPropertyValue("display");
  	buttonLink.style.visibility = document.defaultView.getComputedStyle(t, null).getPropertyValue("visibility");
	p.appendChild(buttonLink);
	//p.insertBefore(buttonLink, t);

/* edit - after ## addchar ( t," ######## to the next quotes
*/
buttonSign.addEventListener('click', function(event) {
  	addChar ( t," ADDyourSIGNATUREhere ");
  	return;
  	}, true
  );

/* edit - after ## adchar ( t," ###### (only if the Facebook URL needs changing) - to the next quotes
*/  
buttonLink.addEventListener('click', function(event) {
  	addChar ( t,"http://apps.facebook.com/farmtown/play/?farm_id=");
  	return;
  	}, true
  );
  
  	

  return;
}


// End

/* So – to add YOUR Signature – scroll up and find my ADDyourSIGNATUREhere and simply edit the text in between the “ quotation marks ”

Sample ascii stuff you may want to use:

. • ั ๑ ๑ ۞ ۩ . ｡ . : * ★ ☆ εїз ℡ ❣ • ۰ • ● ○ ● ō ゃ ♥ ♡ ﺴ ☜ ☞ ☎ ☏♡ ⊙◎ ☺ ☻✖ ╄ ஐ ﻬ ► ◄ ▧ ▨ ♨ ◐ ◑ ↔ ↕ ▪ ▫ ☼ ♦ ▀ ▄ █▌ ▐░ ▒ ▬♦ ◊ ◦ ☼ ♠♣ ▣ ▤ ▥ ▦ ▩ ◘ ◙ ◈ ♫ ♬ ♪ ♩ ♭ ♪ の ☆ → あ ぃ ￡ ❤＃ ＠ ＆ ＊ ❁ ❀ ✿ ✾ ❃ ✺ ❇ ❈ ❊ ❉ ✱ ✲ ✩ ✫ ✬ ✭ ✮ ✰ ☆ ★ ✪ ¤ ☼ ☀ ☽ ☾ ❤ ♡ ღ☻ ☺ ❂ ◕ ⊕ ☉ Θ o O ♋ ☯ ㊝ ⊙ ◎ ۰ • ● ▪ ▫ ｡ ﾟ ๑ ☜ ☞ ♨ ☎ ☏ × ÷ ＝ ≠ ≒ ∞ ˇ ± √ ⊥▶ ▷ ◀ ◁ ☀ ☁ ☂ ☃ ☄ ★ ☆ ☇ ☈ ☉ ☊ ☋ ☌ ☍ ☑ ☒☢ ☸ ☹ ☺ ☻ ☼ ☽ ☾ ♠ ♡ ♢ ♣ ♤ ♥ ♦ ♧ ♩ ✙ ✈ ✉ ✌ ✁♝ ♞♯♩♪♫♬♭♮ ☎ ☏ ☪ ♈ ♨ ₪ ™ ♂✿ ♥ の ↑ ↓ ← → ↖ ↗ ↙ ↘ ㊣ ◎ ○ ● ⊕ ⊙ ○ △ ▲ ☆ ★ ◇ ◆ ■ □ ▽ ▼ § ￥ 〒 ￠ ￡ ※ ♀ ♂ &⁂ ℡ ↂ░ ▣ ▤ ▥ ▦ ▧ ✐✌✍✡✓✔✕✖ ♂ ♀ ♥ ♡ ☜ ☞ ☎ ☏ ⊙ ◎ ☺ ☻ ► ◄ ▧ ▨ ♨ ◐ ◑ ↔ ↕ ♥ ♡ ◊ ◘ ◙ ◦ ☼ ♠ ♣ ▣ ▤ ▥ ▦ ▩ ◘ ◙ ◈ ✄☪☣☢☠ ◦ ♠ ♣ ▣ ۰ • ● ❤ ●•۰► ◄ ▧ ▨ ↔ ↕ ▪ ▫ ☼ ♦♧♡♂♀♠♣♥❤☜☞☎☏⊙◎ ☺☻☼▧▨♨◐◑↔↕▪ ▒ ◊◦▣▤▥ ▦▩◘ ◈◇♬♪♩♭♪の★☆→あぃ￡Ю〓§♤♥▶¤๑⊹⊱⋛⋌⋚⊰⊹ ✲ ❈ ✲ ❈ ➹ ~.~ ◕‿- ❣ ✚ ✪ ✣ ✤ ✥ ✦❉ ❥ ❦ ❧ ❃ ❂ ❁ ❀ ✄ ☪ ☣ ☢ ☠ ☭ღღღ ▶ ▷ ◀ ◁ ☀ ☁ ☂ ☃ ☄ ★ ☆ ☇ ☈ ⊙ ☊ ☋ ☌ ☍• ิ . ั ♬✿ ☉♡ ♢ ♣ ♤ ♥ ♦ ♧ ♩ ✙✈ ✉ ✌ ✁ ✎ ✐ ❀ ✰ ❁ ❤ ❥ ❦❧ ➳ ➽

´¯˜”*°•♥•°*”˜¯`

´¯˜”*°•☆♥..♥☆•°*”˜¯`

.•*¨`*•♫.♥.♫•*`¨*•

ⓛⓞⓥⓔ

*•.¸★¸.•*

¸.•*´»★«`*•.¸

´¨`•°★★°•´¨`

☺ ღ†♥ Ƹ̵̡Ӝ̵̨̄Ʒ ♥†ღ ☺

*.:｡✿*ﾟﾟ･✿.｡.:*٩(͡๏̯͡๏)۶ ٩(͡๏̯͡๏)۶*.:｡✿*ﾟﾟ･✿.｡.:*

*.:｡✿*ﾟﾟ･✿.｡.:* ♥♥♥ ๏̯๏ ♥♥♥ *.:｡✿*ﾟﾟ･✿.｡.:*

|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅| ٩(̾●̮̮̃̾•̃̾)۶٩(-̮̮̃-̃ )۶.

¸.•¤**¤•.,¸^¸.•¤**¤•.,¸^¸.•¤**¤•.,¸^¸.•¤**¤•.,¸

എഴുതി ഓഗസ്റ്റ്ലെമായി ബന്ധിപ്പിക്കാന്വാള്

℡ ₪ ™ ㊣ ☃ ♀ ♂

ஐ ۞ Юの♨ ※ ☃

▶ ▷ ◀ ◁△ ▲ ▽ ▼

▣ ▤ ▥ ▦ ▧ ▨ ▩ ☑ ☒

¨˜°ºð_†_ðº°˜¨

เรเนอร์ รอย ออโดนา

Now we are ready to Save – you will be prompted (if you have any of the fancy characters from above) – That if you save as ANSI you will lose formatting – click ‘Cancel’ and from the drop down box – select ‘File Type’ as ‘UTF-8’

Save and you are DONE !
*/

