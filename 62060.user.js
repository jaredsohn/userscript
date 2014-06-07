// ==UserScript==
// @name          Pointer UI enhancements
// @namespace     http://userscripts.org/users/117468
// @description   Various enhancements for browsing webpages with pointer like devices, eg. the Wiimote
// @include       http://*.wikipedia.org/*

// @require     http://www.speich.net/master/library/jsviz/0.3.3/layout/graph/ForceDirectedLayout.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/layout/view/SVGGraphView.js

// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/physics/ParticleModel.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/physics/Magnet.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/physics/Spring.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/physics/Particle.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/physics/RungeKuttaIntegrator.js

// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/util/Timer.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/util/EventHandler.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/io/DataGraph.js
// @require 	  http://www.speich.net/master/library/jsviz/0.3.3/io/HTTP.js

// @unwrap
// ==/UserScript==
//http://www.google.com/jsapi?key=ABQIAAAAMHBRA2vNtuuKmTZQB5EZFRS47Z4fpQzsOMcQuMlmake_IshowBR2tScIInGpoFHsnXT3xefXzfaRaQ

pointerUI = function(){

if (window == window.top){
  //unsafeWindow.document.body.innerHtml= '<iframe name="wikiframe" src="'+window.location+'"><iframe/>';
  //var elements = document.getElementsByTagName("*");
  var element = document.getElementById("globalWrapper");
  document.body.removeChild(element);
  
  var frameStyle = document.createElement("style");
  frameStyle.innerHTML = " //html { overflow: auto;}\
  html, body, div, iframe {margin: 0px; padding: 0px; height: 100%; border: none;}\
  iframe {display: block; border: none; overflow-y: auto; overflow-x: auto;}";
  document.body.appendChild(frameStyle);
  
  var iframe = document.createElement('iframe');
  //iframe only loads current page if you put garbage in the src, strangely enough
  iframe.src = ".";
  iframe.name = 'wikiframe';
  iframe.id = 'wikiframe';
  iframe.padding = '0px';
  iframe.frameborder = "0";
  iframe.marginheight="0";
  iframe.marginwidth="0";
  iframe.width="100%";
  iframe.height="100%";
  iframe.scrolling="auto";
  document.body.appendChild(iframe);
  
  iframe.addEventListener('load', frameLoaded, false);
  
  var overlayStyle = document.createElement("style");
  overlayStyle.innerHTML = "#overlayBox {\
    z-index: 10000;\
    //opacity: 0.5;   \
    //overflow: visible;\
    background-color:#ffffff;\
	position:fixed; top:0px; left:0px; width:100%; height:100%; vertical-align:middle;\
  }";
  document.body.appendChild(overlayStyle);
    
  var overlayDiv = document.createElement("div");
  overlayDiv.id = "overlayBox";
  //overlayDiv.style.display = "none";
  //overlayDiv.innerHTML = '<canvas id="overlayCanvas" width="640" height="480"></canvas>';
  //overlayDiv.innerHTML = '<p>Hallo text</p>';
  document.body.appendChild(overlayDiv);
  
  //overlayDiv.onselectstart= function(){return false};
  
}
function frameLoaded(){
	processNode(iframe.contentWindow.location+'', '#ff0000')
}

function getHistory(){
	var historyString = GM_getValue('wikihistory', null);
	if(historyString == null){
		return {};
	}
	return eval(historyString);
}

function storeHistory(history){
	var historyString = '({';
	for(var key in history){
		historyString += '"'+ key+'"'+ ' : ' +'"'+ history[key]+'"'+ ' ,';
	}
	historyString = historyString.substring(0,historyString.length -2);
	historyString += '})';
	
	GM_setValue('wikihistory', historyString);
}

document.addEventListener('keypress', keyEvent, false);

var history = getHistory();
var time = new Date().getTime();
history[''+time] = window.location;
storeHistory(history);


var pageDict = {};
var lastNode = null;

function processNode(url, color){
  var node = pageDict[url];
  
  if(node == undefined){
    node = new DataGraphNode();
    pageDict[url] = node;
    node.color= color;
    node.mass=.5;
    
    node.neighbors = {};
	
    node.title = url;
	
    layout.newDataGraphNode( node );
  }	
  
  if(lastNode != null && !(node.title in lastNode.neighbors)&& !(lastNode.title in node.neighbors)){
        layout.newDataGraphEdge(lastNode, node);
        node.neighbors[lastNode.title] = true;
        lastNode.neighbors[node.title] = true;
	}
	
	lastNode = node;
}

function createGraph(history){
	for (var time in history) {
	  processNode(history[time], '#bbbbff');
	}
}



function keyEvent(e){
	if(e.shiftKey && e.keyCode == 0){
		//DO NOT FORGET TO REMOVE THIS LATER
		//GM_deleteValue('wikihistory');		
		toggleViewGraph();
	}
}
function toggleViewGraph(){
		if (window == window.top){
		  var thediv = document.getElementById('overlayBox');
		  var theframe = document.getElementById('wikiframe');
		} else {
		  var thediv = parent.document.getElementById('overlayBox');
		  var theframe = parent.document.getElementById('wikiframe');
		}
		if(thediv.style.display == "none"){
			thediv.style.display = "";			
			theframe.style.display = "none";			
		}else{
			thediv.style.display = "none";
			theframe.style.display = "";			
		}
}


if (window == window.top){
  /////////////////////////////////

var layout = new ForceDirectedLayout( overlayDiv, true );

layout.config._default = {
	model: function( dataNode ) {
		return {
			mass: .5
		}
	},
	view: function( dataNode, modelNode ) {
		var regExpression = new RegExp("[^/]+","g");
		var str=dataNode.title;
		var bef=dataNode.title;

		do{
			bef=str;
			
			str=regExpression(dataNode.title);
		}while(str!=null)
		str=bef[0];
		
		do{
				bef=str;
				str=str.replace("_"," ");
		}while(str!=bef)
		
		var len = 0;
		var regExpression = new RegExp("[^]+","g");
		do{
			bef=regExpression.exec(str);
			if(bef){
				bef=bef[0];
				if(bef.length>len)
					len=bef.length;
			}
		}while(bef!=null)
	
	
		var SVGNS = "http://www.w3.org/2000/svg"; 
		var Group = document.createElementNS(SVGNS, "g"); 
		var Node = document.createElementNS(SVGNS, "circle"); 
		Node.setAttribute('stroke', '#888888');
		Node.setAttribute('stroke-width', '.25px');
		Node.setAttribute('fill', dataNode.color);
		Node.setAttribute('r', 50 + 'px');
		Group.appendChild(Node); 
		
		//node info
		var Node = document.createElementNS(SVGNS, "text"); 
		var Text = document.createTextNode(str); 
		Node.setAttribute('text-anchor', 'middle');
		Node.setAttribute('x', '0px');
		Node.setAttribute('y', '0px'); 
		Node.setAttribute('font-size', "18");
		Node.appendChild(Text);
		Group.appendChild(Node);
		Group.addEventListener('mousedown', (function(e){layout.handleMouseDownEvent(modelNode.id)}), false );
		Group.addEventListener('dblclick', (function(e){iframe.contentWindow.location.assign(dataNode.title); toggleViewGraph();}), false );
		return Group;
	}
}

layout.forces.spring._default = function( nodeA, nodeB, isParentChild ) {
  return {
    springConstant: 0.2,
    dampingConstant: 0.2,
    restLength: 150
  }
}

layout.forces.magnet = function() {
  return {
    magnetConstant: -400000,
    minimumDistance: 120
  }
}

layout.viewEdgeBuilder = function( dataNodeSrc, dataNodeDest ) {

    return {
      'stroke': dataNodeSrc.color,
      'stroke-width': '2px',
      'stroke-dasharray': '2,4'
     // 'EdgeDirection': 3
    }
}

layout.model.ENTROPY_THROTTLE=false;

Timer.init = function( timeout ) {
		this['timer'];
		this['TIMEOUT'] = timeout;
		this['BASE_TIMEOUT'] = timeout;
		this['interupt'] = true;
		this['subscribers'] = new Array();
		this.addEventListener('timeout',
			// notify subscribers and restart timer
			function() {
				this.notify();
				if ( !this.interupt ) { this.start(); }
			}
		, false);
	}
/////////////////////////////////
  
  createGraph(history);
  var buildTimer = new Timer( 1 );
  buildTimer.subscribe( layout );
  buildTimer.start();  
}

}
pointerUI();