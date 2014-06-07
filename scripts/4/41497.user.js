// ==UserScript==
// @name        MyTog Cleaner
// @version     1.5.1
// @author      ryuk156
// @include     http://www.greek-team.cc/*
// @include     http://greek-team.cc/*
// @grant       none
// @description    Cleans up mytog.net by removing extraneous visual elements
// ==/UserScript==


function del(node) {if (node) node.parentNode.removeChild(node);}

function xpath (p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) 
		arr.push(item);
    return arr;
};

//do something for every result of an xpath
function forall(xpath,f) { 
  var results=document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<results.snapshotLength; i++) f(results.snapshotItem(i));
}

function checkforflash(potl_item){                    // checks the element passed to it for Flash content
    if (potl_item.hasAttribute("flashvars") ){
        return true
    };
        
    if (potl_item.hasAttribute("type") && potl_item.getAttribute("type").match(/flash|shockwave/)){
        return true
    };
        
    if (potl_item.hasAttribute("src") && potl_item.getAttribute("src").match(/.swf|shockwave|flash|eyewonder/)){
        return true
    };
			
    if (potl_item.innerHTML.match(/.swf|shockwave|flash|eyewonder/)) {
		return true
    };
        
    return false;
};

function show_hide_div(node){            // places the button-like div before the node
    var placeholder=document.createElement("div");
    savedDisplay =  node.style.display;
    placeholder.setAttribute("class", "BlockFlash2");
			
    node.parentNode.insertBefore(placeholder,  node);  
    node.style.display='none';                // hides the  node node
    node.on=false;
			
    placeholder.style.cursor='pointer';
    placeholder.style.background='orange';     // don't like orange buttons? Change color here.
    placeholder.style.textAlign='center';
    placeholder.style.textTransform='capitalize';
    placeholder.style.color='black';
    placeholder.innerHTML="[Show]";
        
    placeholder.addEventListener( 'click',     // the on/off switch
        function() {
            placeholder=this;
            node=this.nextSibling;            // acts on the  node-containing node following the div
            if ( node.on) {
                node.style.display='none';
                node.style.visibility = 'hidden';
                placeholder.innerHTML="[Show]";
                node.on=false;
            } else {
                node.style.display=savedDisplay;  // reveals the node
				node.style.visibility='visible';
                placeholder.innerHTML="[Hide]";
				//placeholder.style.display='none';
                node.on=true;
            }
        }, true );
        
    return true;
}

// firefox creates alot of random useless empty text nodes;
// i get rid of them (mostly as a result of lazy coding)
  forall("//text()",function(node){ if(!/[^\n\r\t\v]/.test(node.nodeValue)) del(node);});

// remove flash
  xpath("//embed").forEach(function(embed) {            // put all embed objects in array and check each
	if (embed.parentNode.nodeName != "OBJECT" && embed.parentNode.style.display != "none"){       // handle embeds within objects as objects
		if(checkforflash(embed)){embed.style.display='none';};
	};
  });
        
  xpath("//object").forEach(function(object) {     
    if(checkforflash(object)){object.style.display='none';};
  });
  
// Find Torrents element on left column
  var torrentElements=document.evaluate("//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  var torrentsNode;
  for (var i=0; i<torrentElements.snapshotLength; i++) {
	if (torrentElements.snapshotLength>0 && torrentElements.snapshotItem(i).innerHTML=="Torrents") {
		if (torrentElements.snapshotItem(i).parentNode.className=="tbtbot") {
			torrentsNode=torrentElements.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		}
	}
  }
  
// Move General and Support elements on left column
  var nodesToMove=document.evaluate("//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<nodesToMove.snapshotLength; i++) {
	//if (nodesToMove.snapshotItem(i).textContent==(/General|Support/)) {
	if (nodesToMove.snapshotItem(i).textContent=="General" || nodesToMove.snapshotItem(i).textContent=="Support") {
		if (nodesToMove.snapshotItem(i).parentNode.className=="tbtbot") {
			del(nodesToMove.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
			if (torrentsNode)
				torrentsNode.parentNode.insertBefore(nodesToMove.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, torrentsNode.nextSibling);
		}
	}
  }

// remove unnecessary elements
var sponsors=document.evaluate("//b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<sponsors.snapshotLength; i++) {
	if (sponsors.snapshotItem(i).textContent.match(/Sponsor|VIP|Partner-Site|Partner-Sites|.*Promo$|Ads/)) {
		if (sponsors.snapshotItem(i).parentNode.className=="tbtbot") {
			del(sponsors.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		}
	}
  }

// Find empty td element on main column
  var tds=document.evaluate("//td[@rowspan]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  var showAll;
  for (var i=0; i<tds.snapshotLength; i++) {
	showAll=tds.snapshotItem(i);
  }
  
// move go button
var inputs=document.evaluate("//input[@value='Go!']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<inputs.snapshotLength; i++) {
		del(inputs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		if (showAll)
			showAll.parentNode.insertBefore(inputs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, showAll);
			del(showAll);
  }
  
// remove flash
 var iframe=document.evaluate("//iframe",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<iframe.snapshotLength; i++) {
		del(iframe.snapshotItem(i));
  }
  
// make text area smaller and remove comment box entirely
 var textarea=document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<textarea.snapshotLength; i++) {
		textarea.snapshotItem(i).cols = "80";
		textarea.snapshotItem(i).rows = "5";
		del(textarea.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode);
  }
  
// remove right header ads
 var ads=document.evaluate("//td[@id='header_right_cell']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<ads.snapshotLength; i++) {
		del(ads.snapshotItem(i));
  }
  
// remove custom bottom links
 var ads=document.evaluate("//a[@href[contains(.,'diaxeirospoihmata')]]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<ads.snapshotLength; i++) {
		del(ads.snapshotItem(i));
  }

