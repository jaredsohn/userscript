// ==UserScript==
// @name        Rally Enhancements
// @namespace	http://redhat.com/
// @version     1.16
// @description Highlight task owners on iteration status page
// @match       http://*.rallydev.com/#/*/oiterationstatus*
// @match       https://*.rallydev.com/#/*/oiterationstatus*
// @run-at      document-end
// @grant       none
// ==/UserScript==

/** 
 * Allows a function defined in the userscript to be directly injected into the body.
 * Normally, user scripts are run without access to all other page scripts.
 * 
 * Per http://stackoverflow.com/questions/5092726/make-my-userscript-wait-for-other-scripts-to-load#answer-5092864
 * See also: http://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions
 */ 
function injectFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}

/**
 * This function is injected into the page so it can utilize Rally's ExtJS instance
 */
function injectedFunction() {
  
  var team_members_selector = 'select[name=agileOwner] optgroup[label=Team Members] option';
  var team_self_selector = 'select[name=agileOwner] option:nth-child(3):first';
  team_members_selector += ', ' + team_self_selector;
  var task_owner_selector = '.cn_owner0';
  
  /**
   * Wait for ExtJS library to be loaded and
   * wait for the user story owner drop-down node to be loaded
   */ 
  function waitForFullPageLoad(){
    if(typeof Ext === "undefined" || typeof Ext4 === "undefined" || 
        Ext4.query(team_members_selector).length == 0) {
      window.setTimeout(waitForFullPageLoad, 250);
    }
    else {
      myLazyFunction();
    }
  }
  
  /**
   * This is the function that actually does the work
   */ 
  function myLazyFunction() {      
    Ext.onReady(function() {        
      Ext.util.CSS.createStyleSheet('.highlightOwner { background-color: yellow!important; }');
      Ext.util.CSS.createStyleSheet('.dimOwner { background-color: #454545!important; }');
      var nullOwner = 'No one';
      
      function highlightOwner(owner) {
          Ext4.select(task_owner_selector).each(function(node){ 
              var cols = Ext4.get(node.dom.parentNode).select('td');
              var nodeValue = Ext.util.Format.trim(node.dom.textContent)
              if(nodeValue == owner && owner != nullOwner) { 
                  cols.addCls('highlightOwner'); 
              } 
              else { 
                  //cols.addCls('dimOwner');
                  cols.removeCls('highlightOwner'); 
              } 
          });
      }
      
      var highlightOwnerHandler = function(evt) {
          highlightOwner(evt.target.value);
      }
      
      // copy team members from user story owner drop-down
      var taskOwners = [];
      Ext4.query(team_members_selector).each(function(node){ 
          taskOwners.push(node.textContent); 
      });
      taskOwners.sort();
      taskOwners.unshift(nullOwner);
      // create drop-down and add event handler
      var div = document.createElement('div');
      Ext4.get(div).setStyle('text-align', 'center');
      var label = document.createElement('label');
      label.innerHTML = "<strong>Highlight Task Owner: </strong>";
      var node = document.createElement('select');
      node.id = "taskOwner";
      for(var i=0; i<taskOwners.length; i++) { 
          var valueNode = document.createElement('option');
          valueNode.value = taskOwners[i];
          valueNode.innerHTML = taskOwners[i];
          node.appendChild(valueNode);
      }
      Ext4.get(node).addListener('change', highlightOwnerHandler);
      div.appendChild(label);
      div.appendChild(node);
      Ext4.get(div).insertAfter(Ext4.get('page-header'));
    });
  }

  // begin waiting for page load
  waitForFullPageLoad();

}

// Inject the function and execute it:
injectFunction(injectedFunction, true);