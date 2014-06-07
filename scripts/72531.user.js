// ==UserScript==
// @name           add note
// @namespace      http://example.net
// @include        http://*
// @version        0.5
// @description    Legger til mulighet for notatbokser på alle sider 
// ==/UserScript==

function log(){
   if(typeof console != "undefined" && console.log) {
      console.log.apply(console, arguments);    
   }    
    
}

var noteStyle = "div.gm-note-added{ color: black; background: #F2FFE1; width: 400px; height: 20px; min-height: 200px; position:absolute; border:1px solid #83D13D; padding: 5px; -moz-border-radius: 5px;}";
var bStyle = "div.boldify{margin: 3px; display: inline; clear: none; padding: 1px; border: 1px solid black; width: 10px;}";
var tStyle = "iframe.gm-note-text{width: 99%; height: 99%; border:none; }";


var note = document.createElement("div");
note.className = "gm-note-added";
note.designMode = "On";

var tools = document.createElement("div");
tools.className = "gm-note-toolbar";
tools.style.paddingBottom = "3px";
note.appendChild(tools);



var b = document.createElement("button");
b.className ="boldify";

b.innerHTML = "Bold";

tools.appendChild(b);

var f = document.createElement("select");
f.className = "fontify";
f.innerHTML = "<option>skriftstørrelse</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option>";



tools.appendChild(f);

var textContainer = document.createElement("iframe");

textContainer.className = "gm-note-text";
note.appendChild(textContainer);
textContainer.designMode = "On";


var events = ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" ");

function stopEvents(e){
    e.stopPropagation();
}


for(var i=0, len=events.length; i < len; i++) {
    note.addEventListener(events[i], stopEvents, false);    
}




function getPos(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
	return [posx, posy];
}

function getHeight(el, doc){
   doc = (doc || document);
   
   return doc.defaultView.getComputedStyle(el, "").getPropertyValue("height").split("px")[0];
   
   
   
}



// http://norskwebforum.no/viewtopic.php?f=29&t=43342&

document.addEventListener("click", function(e){
    var globalStyles = document.getElementById("gm-note-style");
    var doc = document.body || document.documentElement;  
    if(!globalStyles) {
      
      var globalStyles = document.createElement("style");
      globalStyles.id = "gm-note-style";
      globalStyles.textContent = "@media print { div.gm-note-toolbar{ display: none;}  } div.gm-note-toolbar{ margin-top: -20px;}\n" +
      noteStyle + "\n" + bStyle + "\n" + tStyle;
      doc.appendChild(globalStyles);
      
    }
    
    
    
    if ( (e.ctrlKey || e.metaKey) && e.shiftKey && e.altKey) {
        e.preventDefault();
        var xy= getPos(e);
        var x = (xy[0] + 10) + "px";
        var y = (xy[1] + 10) + "px";
        
        var clone = note.cloneNode(true);
        clone.style.left = x;
        clone.style.top = y;
        log("adding note at x=" + x + ", y=" + y);
        doc.appendChild(clone);
        
        var tb = clone.querySelector("iframe").contentWindow;
        
        tb.document.write('<head><style>br[_moz_editor_bogus_node]{display:none;}</style></head><body contenteditable="true">Din tekst her..</body>');
        tb.document.close();
        var idoc = tb.document;
        
        var b = clone.querySelector("button.boldify");
        b.addEventListener("click", function (e2) {
            e2.preventDefault();
            log("boldifing!");
            idoc.execCommand("bold", false, null);
            idoc.body.focus();
            
        }, false);
        
        
        clone.querySelector("select.fontify").addEventListener("change", function (e2) {
          e2.preventDefault();
          log("setting font size!");
          var idx = this.selectedIndex;
          // First one is always a label
          if (idx != 0) {
            var selected = this.options[idx].value;
            idoc.execCommand("fontsize", false, selected);
            this.selectedIndex = 0;
            idoc.body.focus();
          }
          
        }, false);
        
        function updateHeight(e2){
            
            log(e2.type, "!!"); 
         
            var iheight = getHeight(idoc.body, idoc);
            var elheight = getHeight(clone);
            
            log("iheight:", iheight);
            log("element height:", elheight);
            
            //standard height
            var s = 200;
            
            //avoid scrollbar, increase height of container instead
            if ((elheight >= s && iheight-10 >= s)  ) {
               log("setting element height to", (iheight + 90));
               clone.style.height = (iheight + 90) + "px";
            } else if(elheight > s && iheight < s) {
               clone.style.height = s + "px";
            }
            
        }
        
        idoc.addEventListener("keydown", updateHeight, false);
        idoc.addEventListener("keyup", updateHeight, false);
        
    }

}, false);