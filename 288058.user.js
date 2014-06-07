// ==UserScript==
// @name        GLB2 - Rearrange Blocking Skills
// @namespace   pbr/glb2_rbs
// @include     http://glb2.warriorgeneral.com/game/player/*
// @copyright   2014, pabst
// @license     (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/4.0/
// @version     14.01.28
// @grant       none
// ==/UserScript==

window.setTimeout( function() {
	console.log("Rearrange start");
    pageMod();
	console.log("Rearrange end");
}, 100);

function pageMod() {
    var skillNames = ["pass_block_technique", "pass_block_power", "pass_block_awareness", 
                      "run_block_technique", "run_block_power", "run_block_awareness",
                      "lead_block_awareness", "block_consistency"];
    
    var el = [];
    for each (var s in skillNames) {
       el[s] = document.getElementById(s);
       if (el[s] === null) {
          if (s === "lead_block_awareness") {
             handleCenter();              
          }
          else {
              console.log("blocking skill '"+s+"' not found.  exiting.");
          }
          return;
       }
    }

    console.log("all found for normal");
    for (var i=1; i<skillNames.length; i++) {
       var s = skillNames[i];
       console.log("removing "+s);
       el[s].parentNode.removeChild(el[s]);
    }

    var newSkillNames = ["pass_block_technique", "run_block_technique", 
                         "pass_block_power",     "run_block_power", 
                         "pass_block_awareness", "run_block_awareness",
                         "block_consistency",    "lead_block_awareness"];
    for (var i=1; i<newSkillNames.length; i++) {
       console.log("adding "+newSkillNames[i]);
       el[newSkillNames[0]].parentNode.appendChild(el[newSkillNames[i]]);
    }
}

function handleCenter() {
    var skillNames = ["pass_block_technique", "pass_block_power", "pass_block_awareness", 
                      "run_block_technique", "run_block_power", "run_block_awareness",
                      "block_consistency"];
    
    var el = [];
    for each (var s in skillNames) {
       el[s] = document.getElementById(s);
       if (el[s] === null) {
           console.log("blocking skill '"+s+"' not found.  exiting.");
           return;
       }
    }

    console.log("all found for center");
    for (var i=1; i<skillNames.length; i++) {
       var s = skillNames[i];
       console.log("removing "+s);
       el[s].parentNode.removeChild(el[s]);
    }

    var newSkillNames = ["pass_block_technique", "run_block_technique", 
                         "pass_block_power",     "run_block_power", 
                         "pass_block_awareness", "run_block_awareness",
                         "block_consistency"];
    for (var i=1; i<newSkillNames.length; i++) {
       console.log("adding "+newSkillNames[i]);
       el[newSkillNames[0]].parentNode.appendChild(el[newSkillNames[i]]);
    }
}
