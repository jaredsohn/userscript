// ==UserScript==
// @name        OKC Personality Trait Highlighter
// @namespace   Cromagnon
// @description Highlights the personality traits you designate
// @include     *.okcupid.com/profile/*/personality*
// @version     1.0.0222
//
// === GM_ API ===
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==



// Global Variables

var Highlight_Neutral_Traits;
var Highlight_Good_Traits;
var Highlight_Bad_Traits;



// Insert CSS for custom elements.
//
function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(   '     div#main_column.personality div.pt_row {background: #AAAAAA;}'
		+ '\r\n div#main_column.personality div.pt_row p label {cursor: inherit;}'
		+ '\r\n div#main_column.personality div.pt_row p span {color: #FFFFFF; font-size: 80%; font-weight: bold; text-align: left;}'
		+ '\r\n div#main_column.personality div.pt_row p.right span {text-align: right;}'
		+ '\r\n div#main_column.personality div.pt_row p span.highlight {background: #5E1196; padding: 0;}'
		+ '\r\n div#main_column.personality div.pt_row p span.green_flag {background: #327E00; padding: 0;}'
		+ '\r\n div#main_column.personality div.pt_row p span.red_flag {background: #DD325E; padding: 0;}'
              );




// return the profile name of the currently logged in user
//
function getMyName() {

    var screenname = window.SCREENNAME;
	
	if (screenname != null) return screenname;
	
	screenname = unsafeWindow.SCREENNAME;
	
	if (screenname != null) return screenname;

    var link = document.querySelector("a.username");
    
    if (link == null) return null;
    
    return link.innerHTML;
    
};



// Cycle  the clicked on axis through various highlighting options
// 
function cycleHighlightTrait(e) {

    e.preventDefault();

    var target_graph = e.target.parentNode;
    
    while(target_graph.nodeName != "DIV") target_graph = target_graph.parentNode;
    
    if (target_graph.className != "pt_row") return ("OKC Trait Highlighter encountered an unexpected error!");
    
    var measure = target_graph.getElementsByTagName("span")[0];
    
    if (measure == null) return ("OKC Trait Highlighter encountered an unexpected error!");
    
    var label = target_graph.getElementsByTagName("label")[0];
    
    if (label == null) return ("OKC Trait Highlighter encountered an unexpected error!");
    
    var axis = label.innerHTML.substr(5);
    
    var more = (label.innerHTML.substr(0,4).toLowerCase() == "more");
    
    var highlight = Highlight_Neutral_Traits.indexOf(axis);
    
    var good = Highlight_Good_Traits.indexOf(axis);
    
    var bad = Highlight_Bad_Traits.indexOf(axis);
    
    var describe_next_option = " ** ERROR ** ";
    
    if (highlight != -1) {
    
        Highlight_Neutral_Traits.splice(highlight,1);
	
	Highlight_Good_Traits.push(axis);
	
	measure.className = (more ? "green_flag" : "red_flag");
	
        describe_next_option = (more ? "red flag" : "green flag");
    
      } else if (good != -1) {
    
        Highlight_Good_Traits.splice(good,1);
	
	Highlight_Bad_Traits.push(axis);
	
	measure.className = (more ? "red_flag" : "green_flag");
	
        describe_next_option = "*not* highlight";
    
      } else if (bad != -1) {
    
        Highlight_Bad_Traits.splice(bad,1);
	
	measure.className = "";
	
        describe_next_option = "highlight";
    
      } else {

        Highlight_Neutral_Traits.push(axis);

        measure.className = "highlight";

	describe_next_option = (more ? "green flag" : "red flag");
	
      };

    var links = target_graph.getElementsByTagName("a");
    
    for(j = 0; j < links.length; j++)
    
        links[j].setAttribute("title", "click to " + describe_next_option);
    
    setTimeout(saveUserOptions, 100);
};



// Insert links for the given trait graph
// 
function hook_graph(graph) {

    if (graph.className != "pt_row") return;
    
    var measure = graph.getElementsByTagName("span")[0];
    
    if (measure == null) return;
    
    measure.innerHTML = "&nbsp;" + measure.style.width + "&nbsp;";
    
    var label = graph.getElementsByTagName("label")[0];
    
    if (label == null) return;
    
    var axis = label.innerHTML.substr(5);
    
    var more = (label.innerHTML.substr(0,4).toLowerCase() == "more");
    
    var highlight = (Highlight_Neutral_Traits.indexOf(axis) != -1);
    
    var good = (Highlight_Good_Traits.indexOf(axis) != -1);
    
    var bad = (Highlight_Bad_Traits.indexOf(axis) != -1);
    
    measure.className = highlight ? "highlight" : good ? (more ? "green_flag" : "red_flag") : bad ? (more ? "red_flag" : "green_flag") : "";
    
    var describe_next_option = highlight ? "green flag" : good ? "red flag" : bad ? "*not* highlight" : "highlight";
    
    if (!more && (describe_next_option.indexOf("flag") != -1)) describe_next_option = (describe_next_option == "green flag") ? "red flag" : "green flag";
    
    var link = document.createElement("a");

    link.href = "#";

    link.setAttribute("style", "color: inherit;");
    link.setAttribute("title", "click to " + describe_next_option);
    
    link.addEventListener("click", cycleHighlightTrait, false);
    
    label.parentNode.insertBefore(link,label);
    label.parentNode.removeChild(label);
    link.appendChild(label);

    link = document.createElement("a");

    link.href = "#";
    link.setAttribute("title", "click to " + describe_next_option);
    
    link.addEventListener("click", cycleHighlightTrait, false);
    
    measure.parentNode.insertBefore(link,measure);
    measure.parentNode.removeChild(measure);
    link.appendChild(measure);

};



// Save persistent user options with GM stored values
//
function saveUserOptions() {

    var username = getMyName();
    
    var aliases = GM_getValue(username + ".aliases");
    
    aliases = (aliases == null) ? [] : aliases.split(",");
    
    aliases.push(username);
    
    for(var i = 0; i < aliases.length; i++) {

      if (Highlight_Neutral_Traits.length == 0) GM_deleteValue(aliases[i] + ".highlight_traits");
    
        else GM_setValue(aliases[i] + ".highlight_traits", Highlight_Neutral_Traits.toString());
	
      if (Highlight_Good_Traits.length == 0) GM_deleteValue(aliases[i] + ".highlight_good_traits");
    
        else GM_setValue(aliases[i] + ".highlight_good_traits", Highlight_Good_Traits.toString());
	
      if (Highlight_Bad_Traits.length == 0) GM_deleteValue(aliases[i] + ".highlight_bad_traits");
    
        else GM_setValue(aliases[i] + ".highlight_bad_traits", Highlight_Bad_Traits.toString());
	
    };
};



// Load persistent user options from GM stored values
//
function loadUserOptions() {

    var username = getMyName();
    
    Highlight_Neutral_Traits = GM_getValue(username + ".highlight_traits");
    
    Highlight_Neutral_Traits = (Highlight_Neutral_Traits == null) ? [] : Highlight_Neutral_Traits.split(",");

    Highlight_Good_Traits = GM_getValue(username + ".highlight_good_traits");
    
    Highlight_Good_Traits = (Highlight_Good_Traits == null) ? [] : Highlight_Good_Traits.split(",");

    Highlight_Bad_Traits = GM_getValue(username + ".highlight_bad_traits");
    
    Highlight_Bad_Traits = (Highlight_Bad_Traits == null) ? [] : Highlight_Bad_Traits.split(",");

};



// Main function
//
function init() {

  var graphs = document.getElementById("main_column");

  if (graphs == null) return;
  if (graphs.className != "personality") return;
  
  loadUserOptions();
 
  graphs = graphs.getElementsByTagName("div");

  for(var i = 0; i < graphs.length; i++)  hook_graph(graphs[i]);

};



// Call our main function.
//

init();

//end