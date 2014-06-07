// ==UserScript==
// @name          Better Gmail: Gadget Supported Mini Wide
// @version       4.15
// @description   Better Gmail: Gadget Supported Mini Wide
// @author        dfeng
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==


(function(){
  BottomStuff = 1 // 0: Don't show Footer. 1: Only show the Account Activity. 2: Show ALL
  startMinimised = false // start showing only the message pane (YOU NEED TO KNOW KEYBOARD SHORTCUTS - press '?' to learn them)
  var x = "Bu"
  var y = "nH"
  var z = "iY"
  var w = "ha"
  var p = "Bs"
  var css = " table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div."+w+" span { padding: 0px 6px 1px 6px !important; }"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div."+w+" span u { text-decoration: none !important; line-height: 13px !important; margin-top: 20px !important; }"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div."+w+" span img { display: all !important; }"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div.hj > div.hk { padding: 0 !important; float: right !important; margin-right: 10px ! important; }"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div[class=\""+y+"\"]>div[class=\""+y+"\"]>div.u8 { display: none !important; }"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div[class=\""+y+"\"]>div[class=\""+y+"\"]>div."+y+">div.hj>div.hk { display: block !important; }"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div.u5 { padding: 0px !important; display: inline !important; background: transparent; position:absolute; right:0px;}"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div.u5>div.fO { z-index:999; border: none !important; margin-right:0px !important; padding-bottom:0px !important; padding-top:8px !important; display: inline !important; background:transparent url(?ui=2&view=dim&iv=189npc5qjfphb&it=ic) no-repeat scroll -40px -40px; position:absolute; right:0px; width:8px !important; height:5px !important; overflow:hidden !important;}"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div.u5>div.fO:hover { z-index:1000; border-bottom: 1px black solid !important; border-left: 1px black solid !important; padding: 10px !important; display: inline !important; position:absolute; background: white !important; right:0px; width:auto !important;height:auto !important;}"
          +" div.oM { display: none !important;}"
          +" table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div { width: auto !important; padding-right: 5px !important; }"
          +" td[class=\""+x+"\"] { width: 100% !important; }"
          +" h1.ha {z-index:2 !important;padding-top:10px !important;}"
          + "div.hx {padding-top:8px !important;}"
  
  switch(BottomStuff) {
    case 0:
      css += "div[class=\""+y+" l2 ov\"] { display: none !important} ";
      break;
    case 1:
      css += "div[class=\""+y+" l2 ov\"]>div>div:not([class='l6']) { display: none !important} ";
      break;
  }
  
  if (/WebKit/.test(navigator.userAgent))
    {
      css += " table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div.hj { position: absolute !important; right: 0px !important; z-index:0 !important; top: 5px !important; padding:0px !important;}"
    } else {
       css += " table[class=\""+p+" "+y+" "+z+"\"] td."+x+">div."+y+">div."+y+" div.hj { position: absolute !important; right: 0px !important; z-index:0 !important; top: 37px !important; padding:0px !important;}"
    }
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		var text = document.createTextNode(css)
		node.appendChild(text);
		heads[0].appendChild(node);
	}  
  
  var j = true
    
  function toggle_gm()
  {
    if (j) {
      css = ".aC {display:none !important;} .aC + div.nH > div.no > div:nth-child(2) {display:none !important;} .aC + div.nH > div.no > div:nth-child(3) {width:100% !important;} .aC + div.nH > div.no {width:100% !important;} div.nn {width:100% !important;}"
      text.nodeValue = text.nodeValue + css
    }
    else {
      text.nodeValue = text.nodeValue.substring(0,text.nodeValue.length-243)
    }
    j = !j
  }

  function GRT_key(event) {
    element = event.target;
    elementName = element.nodeName.toLowerCase();
    if (elementName == "input" || elementName == "textarea") return true;
    if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.metaKey) {
      toggle_gm();
    }
    return true;
  }
  if (startMinimised) toggle_gm()
  document.addEventListener("keydown", GRT_key, false);
})();
