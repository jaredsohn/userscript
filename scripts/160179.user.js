// ==UserScript==
// @name       Redmine Quick Jump Sort and direct jump
// @version    0.4
// @description  Sorts redmines project_quick_jump_box and enhances redmine by project shortcuts
// @match      https://yourredmineserver.com/*
// @namespace  https://yourredmineserver.com/*
// @copyright  2013+, bestmacfly
// @author bestmacfly
// ==/UserScript==

//please configure shortcuts here
var project_shortcuts=new Array();
project_shortcuts["c"]="project identifier 1";
project_shortcuts["v"]="project identifier 2";
project_shortcuts["d"]="project identifier 3";

//to which target would you like to jump when shortcut is pressed?
//possible values e.g: overview, issues, welcome

var project_shortcuts_target="issues"; 

//please configure projects that should be removed from list
var project_remove=new Array("project identifier 1","project identifier 2");

//please do not change following code!

function compare(a,b) {
    var atext=a.text;
    var btext=b.text;
  if (atext.toUpperCase() < btext.toUpperCase())
     return -1;
  if (atext.toUpperCase()  > btext.toUpperCase())
    return 1;
  return 0;
}

//Get selectbox
var selectBox=document.getElementById("project_quick_jump_box");

//Copy text uand value to array. In addition uppercase variant is copied for better sorting.
//start with third element, the first and second are labels
var options=new Array();
var index=0;
for(var i=2;i<selectBox.options.length;i++){
    var currentOption=selectBox.options[i];
//Check if option is on removelist
    var remove=false;
    for(var ri=0;ri<project_remove.length;ri++){
        if(currentOption.value.indexOf("/"+project_remove[ri]+"?")>-1){
        	remove=true;
            break;
        }
    }
    if(!remove){
    if(currentOption.text.indexOf("»")>-1){ //subprojects shouldnt be sorted -> at the moment this only works for ONE subproject
    	options[index-1].subOption=currentOption;
    }else{
    	options[index++]=currentOption;
    }
}
}

for(i=selectBox.options.length;i>1;i--) {
	selectBox.options[i] = null;
}

//sort
options.sort(compare);

//Build up new optionlist
for(i=0;i<options.length;i++){
		selectBox.options[selectBox.options.length]=options[i];
    	if(options[i].subOption!=null)
            selectBox.options[selectBox.options.length]=options[i].subOption;
}

//Jump to project on key pressed
function keyPressed(char){
	var project=project_shortcuts[String.fromCharCode(char)];
    if(project!=undefined)
    {
        window.location.href="/projects/"+project+"?jump="+project_shortcuts_target;
    }
}

//Register listener for key actions
document.addEventListener('keypress', function(e) {
		e = e || window.event;
		var char = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if(typeof e.target.type == "undefined" || !e.target.nodeName.match(/input|select|textarea/i)) keyPressed(char);
	}, true);