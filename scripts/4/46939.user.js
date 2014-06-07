// ==UserScript==
// @name           Group 3 Iteration 4 temp
// @namespace      Group3
// @include        http://www.thefump.com/
// @include        http://thefump.com/
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
			'  <target title="Go to archive" hotkey="a" action="CALL:axsSkel.goToArchive">' +
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

	//title organization code contributed by Dan Netry with assistance from Kyle Young, Chris Szynkowski and Dwight Albright
			'  <list title="Latest Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' + 
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[8]/td[*]/a' +
			'    </item>' +
	// Read Item text enabled by Jason Pocino and Dan Netry
			'    <item>' +
			'    /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[9]/td[2]/table/tbody/tr[2]/td' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[4]/td[2]' +
			'    </item>' + 
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Second Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[20]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[16]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Third Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[26]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[22]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Fourth Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[32]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[28]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Fifth Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[38]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[34]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Sixth Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[44]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[40]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Seventh Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[50]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[46]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Eigth Fump" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	 /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[56]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[52]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

			'  <list title="Artist Info" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[6]/td[2]/p[2]' +
			'    </item>' +
			'  </list>' +
		
			'  <list title="Latest Sideshow" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[67]/td[1]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[67]/td[*]/a' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[63]/td[2]' +
			'    </item>' +
			'    <target title="Open this link" hotkey="ENTER">' +
			'      .' +
			'    </target>' +
			'  </list>' +

// Fump News enabled by Jason Pocino and Dan Netry

			'  <list title="Latest Fump News" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[76]/td[2]/b' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[74]/td[2]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[76]/td[2]' +
			'    </item>' +
			'  </list>' +

			'  <list title="Second Fump News" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[79]/td[2]/b' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[77]/td[2]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[79]/td[2]' +
			'    </item>' +
			'  </list>' +

			'  <list title="Third Fump News" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[82]/td[2]/b' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[80]/td[2]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[82]/td[2]' +
			'    </item>' +
			'  </list>' +

			'  <list title="Fourth Fump News" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[85]/td[2]/b' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[83]/td[2]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[85]/td[2]' +
			'    </item>' +
			'  </list>' +

			'  <list title="Fifth Fump News" next="RIGHT l" prev="LEFT h" fwd="n" back="p">' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[88]/td[2]/b' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[86]/td[2]' +
			'    </item>' +
			'    <item>' +
			'	/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[88]/td[2]' +
			'    </item>' +
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

//goToArchive function contributed by 
axsSkel.goToArchive = function(){
    var textbox = document.getElementsByName('archivePic');
    textbox[0].parentElement().focus();
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
