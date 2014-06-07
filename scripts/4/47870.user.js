// ==UserScript==
// @name           Group 3 Final Iteration Sideshow
// @description    Group 3's temporary iteration for CS324.
// ==/UserScript==

// Copyright 2008 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* @author clchen@google.com (Charles L. Chen, author, unless otherwise noted)
* @author dwighta@bgsu.edu (Dwight Albright, modifier -- see line comments)
* @author bhedric@bgsu.edu (Benjamin Hedrick, modifier -- see line comments)
* @author dnetry@bgsu.edu (Daniel Netry, modifier -- see line comments)
* @author jpocino@bgsu.edu (Jason Pocino, modifier -- see line comments)
* @author cszynko@bgsu.edu (Christopher Szynkowski, modifier -- see
line comments)
* @author kgyoung@bgsu.edu (Kyle Young, modifier -- see line comments)
*/



/**
 * @fileoverview AxsJAX to enhance accessibility
 * of Skel. 
 *
 * This is a skeleton AxsJAX script - when you start using it,
 * you should do a global replace of "axsSkel" with 
 * "axsWhateverYourAppNameIs" and update this fileoverview.
 *
 * @author clchen@google.com (Charles L. Chen)
 */
// create namespace
var axsSkel = {};

/**
 * These are strings to be spoken to the user
 * @type string
 */
axsSkel.HELP = 'The following shortcut keys are available. ';


/**
 * The AxsJAX object that will do the tickling and speaking.
 * @type AxsJAX?
 */
axsSkel.axsJAXObj = null;
/**
 * The AxsNav object that will handle navigation.
 * @type AxsNav?
 */
axsSkel.axsNavObj = null;

/**
 * The AxsSound object that will play earcons
 * @type AxsSound?
 */
axsSkel.axsSoundObj = null;

/**
 * The PowerKey object that will provide a quick search
 * @type PowerKey?
 */
axsSkel.pkObj = null;

/**
 * The AxsLens object that will magnify content.
 * @type AxsLens?
 */
axsSkel.axsLensObj = null;

/**
 * The magnification factor for the AxsLens object.
 * @type number
 */
axsSkel.magSize = 1.5;

/**
 * Initializes the AxsJAX script
 */
axsSkel.init = function(){
  axsSkel.axsJAXObj = new AxsJAX(true);
  axsSkel.axsNavObj = new AxsNav(axsSkel.axsJAXObj);

  //Add event listeners
  document.addEventListener('DOMNodeInserted',
                            axsSkel.nodeInsertedHandler,
                            true);
  document.addEventListener('DOMAttrModified',
                            axsSkel.attrModifiedHandler,
                            true);
  document.addEventListener('keypress', axsSkel.keyHandler, true);

	//cnrString base code and hotkeys contributed by Jason Pocino
var cnrString = '<cnr next="DOWN j" prev="UP k">' +  
	//Search functionality provided by Dan Netry and Ben Hedrick
			'  <target title="Search the FuMP" hotkey="s" action="CALL:axsSkel.showSearchBox">' +
			'    /html' +
			'  </target>' +
	//Fump pages tabs enabled by Ben Hedrick and Dan Netry
			'  <list title="Other FuMP pages" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[2]/td[3]/table/tbody/tr[2]/td/a' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

	//title organization code contributed by Dan Netry with assistance from Chris Szynkowski and Dwight Albright
			'  <list title="Sideshow pages" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[4]/td/div/a' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +

			'  <list title="First Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[9]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[9]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[5]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Second Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[15]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[15]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[11]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Third Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[21]/td[1]' +
			'    </item>' +	
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[21]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[17]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Fourth Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[27]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[27]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[23]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Fifth Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[33]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[33]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[29]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Sixth Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[39]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[39]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[35]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Seventh Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[45]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[45]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[41]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			'  <list title="Eigth Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[51]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[51]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[47]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'	.' +
			'    </target>' +
			'  </list>' +
			

                     '</cnr>';

  axsSkel.axsNavObj.navInit(cnrString, null);

  axsSkel.axsLensObj = new AxsLens(axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setLens(axsSkel.axsLensObj);
  axsSkel.axsLensObj.setMagnification(axsSkel.magSize);

  axsSkel.axsSoundObj = new AxsSound(true);
  axsSkel.axsNavObj.setSound(axsSkel.axsSoundObj);

  axsSkel.pkObj = new PowerKey('available actions', axsSkel.axsJAXObj);
  axsSkel.axsNavObj.setPowerKey(axsSkel.pkObj, '.');

  //Delete the next line when you are done with your script.
  //alert('AxsSkel loaded and initialized!');
};

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsSkel.nodeInsertedHandler = function(evt){
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
};

/**
 * Handler for DOMAttrModified events. 
 * @param {Object} evt A DOMAttrModified event.
 */
axsSkel.attrModifiedHandler = function(evt){
  var attrib = evt.attrName;
  var newVal = evt.newValue;
  var oldVal = evt.prevValue;
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
};

/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsSkel.keyHandler = function(evt){
  //If Ctrl is held, it must be for some AT. 
  if (evt.ctrlKey) return true;

  if (evt.keyCode == 27){ // ESC
    axsSkel.axsJAXObj.lastFocusedNode.blur();
    return false;
  }

  if (axsSkel.axsJAXObj.inputFocused) return true;

  var command = axsSkel.keyCodeMap[evt.keyCode] ||
                axsSkel.charCodeMap[evt.charCode];

  if (command) return command();

  return true;
};

/**
 * Map from key codes to functions
 */
axsSkel.keyCodeMap = {
  // Map additional keyboard behavior that involves key codes here
};

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
function openPage() {
	
}
//showSearchBox function contributed by 
axsSkel.showSearchBox = function(){
    var textbox = document.getElementsByName('search_text');
    textbox[0].focus();
}

axsSkel.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsSkel.magSize -= 0.10;
         axsSkel.axsLensObj.setMagnification(axsSkel.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsSkel.magSize += 0.10;
         axsSkel.axsLensObj.setMagnification(axsSkel.magSize);
         return false;
       },
  // ? (question mark)
  63 : function() {
         var helpStr = axsSkel.HELP +
                       axsSkel.axsNavObj.localHelpString() +
                       axsSkel.axsNavObj.globalHelpString();
         axsSkel.axsJAXObj.speakTextViaNode(helpStr);
         return false;
       }
};

axsSkel.init();

