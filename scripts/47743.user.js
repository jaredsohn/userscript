// ==UserScript==
// @name           Group 4 Iteration 5
// @description    Group 4's fifth iteration for CS324.
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

/**
 * @fileoverview AxsJAX to enhance accessibility
 * of Skel. 
 *
 * This is a skeleton AxsJAX script - when you start using it,
 * you should do a global replace of "axsSkel" with 
 * "axsWhateverYourAppNameIs" and update this fileoverview.
 *
 * @author clchen@google.com (Charles L. Chen)
 * @modified by Chris Mares, Guodong Zhu, Kevin Culler and Martez Mott
 */
// create namespace
var axsSkel = {};

/**
 * These are strings to be spoken to the user
 * @type string
 */
axsSkel.HELP = 'Note. Once in the searchfield hit Tab twice to exit. The following shortcut keys are available. ';


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
  
  // Following cnrString code written by Chris Mares, Guodong Zhu, Kevin Culler and Martez Mott 

 var cnrString = '<cnr next="RIGHT l" prev="LEFT h">' +
 
		'<list title="Arcticle" hotkey="r" next="DOWN j" prev="UP k">'+
		' <item>'+
		'  .//tr[2]/td[1]/p[1 and 2]'+
		' </item>'+
		'</list>'+
		
		'<target title="Search The BBC" hotkey="s" ' +
		'       action="CALL:axsSkel.showSearchBox">' +
		'           /html' +
		'</target>' +
		
		'<target title="Search Travel" hotkey="q" ' +
		'       action="CALL:axsSkel.showTravelBox">' +
		'           /html' +
		'</target>' +
 
		  '  <list title="Feature Story" hotkey="f" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpFeatureBoxInt\']'+
                  '    </item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
		  '  </list>' +
		  
		  
                  '  <list title="More Top Stories" hotkey="m" next="DOWN j" prev="UP k">' +
		  '     <item> ' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'a\']/h2' +
		  '    </item>' +
		  
		  '     <item> ' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'a\']/div[3]/div[1]/ol[@id=\'nhlines\']/li[*]/p' +
		  '    </item> ' +
		  
                  '    <item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'a\']/div[3]/div[2]/ul/li[*]/p' +
                  '    </item>' +
		  
                  '    <item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'a\']/div[3]/div[3]/div/ul/li[*]/p' +
                  '    </item>' +
		  
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="World Service News In 32 Langauges" hotkey="o" next="DOWN j" prev="UP k">' +
		  '     <item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'p\']/h2' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="TV Channels" hotkey="v" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'f\']/h2' +
		  '	</item>' +
		  
		  '	<item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'f\']/div[@id=\'int\']/div/ul[*]/li[*]' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="Children" hotkey="c" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'i\']/h2' +
		  '	</item>' +
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[4]/div[@id=\'hpColOne\']/div[@id=\'i\']/div[2]/div[1]/a[*]' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="Sports" hotkey="p" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'b\']/h2' +
		  '	</item>' +
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'b\']/div[3]/div[1]/ol[@id=\'shlines\']/li[*]/p' +
		  '	</item>' +
		  
                  '    <item>' +
		  '     /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'b\']/div[3]/div[2]/ul/li[*]/p'+
                  '    </item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="Travel" hotkey="t" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'v\']/h2' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +

		  
		  '  <list title="Radio" hotkey="r" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/h2' +
		  '	</item>' +
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/div[2]/div/ol/li/div/p[1]' +
		  '	</item>' +
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/div[2]/div/ol/li/div/p[4]' +
		  '	</item>' +	

		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/div[2]/div/ol/li/div/ul/li/*' +
		  '	</item>' +	

		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/div[2]/div/ol/li/div/p[5]/a[*]' +
		  '	</item>' +	
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/div[2]/div/ol/li/div/p[5]/a[3]' +
		  '	</item>' +	
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[5]/div[@id=\'hpColTwo\']/div[@id=\'g\']/div[2]/div/div/ul/li[*]' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="Business and Money" hotkey="b" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpColThreeContainer\']/div[@id=\'hpColThree\']/div[@id=\'n\']/h2' +
		  '	</item>' +
		  
		  '	<item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[1]/ul[5]/li[*]' +
		  '	</item>' +
		  
		  '	<item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpColThreeContainer\']/div[@id=\'hpColThree\']/div[@id=\'n\']/div[3]/div[1]/div[1]/table/tbody/tr[*]' +
		  '	</item>' +

		  
		  '	<item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpColThreeContainer\']/div[@id=\'hpColThree\']/div[@id=\'n\']/div[3]/div[1]/div[2]/table/tbody/tr[*]' +
		  '	</item>' +
		  
		  '	<item>' +
		  '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpColThreeContainer\']/div[@id=\'hpColThree\']/div[@id=\'n\']/div[3]/div[1]/div[3]/ul/li[*]' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  
                  '  <list title="Weather" hotkey="w" next="DOWN j" prev="UP k">' +
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpColThreeContainer\']/div[@id=\'hpColThree\']/div[@id=\'c\']/h2' +
		  '	</item>' +
		  
		  '	<item>' +
		  '      /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[1]/ul[6]/li[*]' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		  
		  '  <list title="Radio1" hotkey="b" next="DOWN j" prev="UP k">' +
		  
		  '	<item>' +
		  '     /html/body[@id=\'homenew\']/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'onairbanner\']/div[@id=\'onairmain\']/div[@id=\'onairlinkwrap\']/div[@id=\'onairlinks\']/ul/li[1]' +
		  '	</item>' +
		  
		  '	<item>' +
		  '     /html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'onairbanner\']/div[@id=\'onairmain\']/div[@id=\'onairlinkwrap\']/div[@id=\'onairlinks\']/ul/li[1]' +
		  '	</item>' +
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
                  '  </list>' +
		   
		  ' <list title="Explore the BBC" hotkey="e" next="DOWN j" prev="UP k">'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/h3[1]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/ul[1]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/h3[2]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/ul[2]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/h3[3]'+
		  '    </item>'+

		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/ul[3]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/h3[4]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/ul[4]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/h3[5]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/ul[5]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/h3[6]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[2]/ul[6]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[3]/h3[1]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[3]/ul[1]/li[*]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[3]/h3[2]'+
		  '    </item>'+
		  
		  '    <item>'+
		  '    /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpLowerPanel\']/div[@id=\'hpDirectory\']/div/div[3]/ul[2]/li[*]'+
		  '    </item>'+
		  
		  '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
		  
		  '  </list>'+
		  
		  
		  '  <list title = "BBC site information" hotkey="i" next="DOWN j" prev="UP k">'+
		 '    <item>'+
		 '       /html/body/div[@id=\'blq-accesslinks\']/ul/li[*]'+
		 '    </item>'+
		 '    <item>'+
		 '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-banner\']/ul[*]/li[*]'+
		 '    </item>'+
		 '    <item>'+
		 '       /html/body/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'hpFooter\']/ul/li[*]/a'+
		 '    </item>'+
		 '    <item>'+
		 '       /html/body/div[@id=\'blq-footer\']/ul[*]/li[*]'+
		 '    </item>'+
		 '    <target title="Go to result" hotkey="ENTER">' +
                  '      .//a' +
                  '    </target>' +
		  ' </list>'+
		  
		  '<list title="Search Results" fwd="DOWN j" back="UP k">' +
			'   <item>' +
			'   	/html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'primary\']/div/ul[*]/*' +
			'  </item>'+
			
			'    <target title="Next page" trigger="listTail">' +
			'      /html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'primary\']/div/div[2]/a | /html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'primary\']/div/div/a[2]'+
			'    </target> ' +
			
			'    <target title="Previous Page" trigger="listHead">' +
			'      /html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'primary\']/div/div/a[1]'+
			'    </target> ' +
			
			
			'    <target title="Go to result" hotkey="n">' +
			'      /html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'primary\']/div/div[2]/a | /html/body/div[@id=\'blq-container\']/div[@id=\'blq-container-inner\']/div[@id=\'blq-main\']/div[@id=\'blq-content\']/div[@id=\'primary\']/div/div/a[2]'+
			'    </target>' +
		
			'    <target title="Go to result" hotkey="ENTER">' +
			'      .//a' +
			'    </target>' +
			
		' </list>' +
		  

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

axsSkel.showSearchBox = function(item){
    var textBox=null;
    var textBoxB = null;
    textBox = document.getElementById('searchfield');
    textBoxB = document.getElementById('blq-searchbox');
	
     if(textBox != null){
	textBox.value = null;
	 textBox.focus();
     }
     
     if(textBoxB != null){
         textBoxB.value = null;
         textBoxB.focus();
     }
    
    
}


axsSkel.showTravelBox = function(item){
    
    var textBox = document.getElementById('lpSearch');
    textBox.focus();
}





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
  
  
  /*46 : function() {
      alert('Here');
      var = axsSkel.axsNavObj.nextItem();
      return true;
      }*/

};

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
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
