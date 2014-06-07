// ==UserScript==
// @name           Wikitionary Accessibility specification script
// @author         Justin Collier
// @author         Zach Heisler
// @author         Subomi Udunsi
// @author         Christopher Evans
// @author         Richard Latza
// @author         Heather Baldridge
// ==/UserScript==


                // Copyright 2008 Google Inc.
                        // 
                        // Licensed under the Apache License, Version 2.0 (the "License");
                        // you may not use this file except in compliance with the License.
                        // You may obtain a copy of the License at
                        // 
                        // http://www.apache.org/licenses/LICENSE-2.0
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
                        */
                        // create namespace
                        var axsSkel = {
                           }; 
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
                        axsSkel.init = function() {
                           axsSkel.axsJAXObj = new AxsJAX(true); 
                           axsSkel.axsNavObj = new AxsNav(axsSkel.axsJAXObj); 
                           //Add event listeners
                           document.addEventListener('DOMNodeInserted', axsSkel.nodeInsertedHandler, true); 
                           document.addEventListener('DOMAttrModified', axsSkel.attrModifiedHandler, true); 
                           document.addEventListener('keypress', axsSkel.keyHandler, true); 
                          var cnrString = '<cnr next="RIGHT l" prev="LEFT h">' +//Final file compiled by Justin Collier	
                                          //The following function was written by Chris Mares           //on 4-3-2009
                                          //and altered by Heather Baldridge	                        //added by Justin Collier
                                          '	<target title="Search Wiktionary" hotkey="s" action="CAL' + //4-2-2009
                                          'L:axsSkel.showSearchBox"> ' +								//Hotkeys added by Subomi Udunsi
                                          '		/html                                         ' +		//on 4-6-2009 unless otherwise stated
                                          '	</target>' +
                        				  // the following 8 lines of code was added by subomi Odunsi 4/17/09
                        		          // code sets focus to user name text box and password on login
                        		          // and create account page
                        		          '<target title="insert username" hotkey="u" onEmpty="list not available"' +
                        		          ' action="CALL:axsSkel.showUserNameBox">' +
                        		          '         /html' +
                        		          '</target>' +	
                        		          '<target title="insert password" hotkey="P" onEmpty="list not available"' +
                        		          ' action="CALL:axsSkel.showPasswordBox">' +
                        		          '         /html' +
                        		          '</target>' +		          
                                          '	<list title="Content Menu" next="DOWN j" prev="UP k" fwd' +			//Added by Richard Latza
                                          '="n" back="p">' +													//4-17-2009
                                          '		<item>' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/table[@i' +
                                          'd="toc"]/tbody/tr/td/ul/li[1]/a/span[2] |' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/table[@i' +
                                          'd="toc"]/tbody/tr/td/ul/li[*]/a/span[2] | ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/table[@i' +
                                          'd="toc"]/tbody/tr/td/ul/li[*]/ul/li[*]/a/span[2] | ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/table[@i' +
                                          'd="toc"]/tbody/tr/td/ul/li[*]/ul/li[*]/ul/li[*]/a/span[2] ' +
                                          '| ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/table[@i' +
                                          'd="toc"]/tbody/tr/td/ul/li[*]/ul/li[*]/ul/li[*]/ul/li[*]/a' +
                                          '/span[2]' +
                                          '		</item>' +
                                          '		<target title="Go to section" hotkey="ENTER">' +
                                          '                        ./a' +
                                          '		</target>' +
                                          '	</list>' +															//End Richard's Stuff
                                          '	<list title="Main Content" next="DOWN j" prev="UP k" fwd' +			//Added by Justin Collier
                                          '="n" back="p" hotkey="0">' +													//4-2-2009
                                          '		<item>' +														//modified 4-10-2009
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/h1 | ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'nten t"]/div[@id="content"]/div[@id="bodyContent"]/h2 | ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/h3 | ' +
                                          '			/html/body/div [@id="globalWrapper"]/div[@id="column-c' +
                                          'ontent"]/div[@id="content"]/div[@id="bodyContent"]/ul/li |' +
                                          ' ' +
                                          '			/html/body/div[@id ="globalWrapper"]/div[@id="column-c' +
                                          'ontent"]/div[@id="content"]/div[@id="bodyContent"]/ol/li |' +
                                          ' ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/p[not(a=' +
                                          '"")] | ' +
                                          '			/html/body/div[@id=" globalWrapper"]/div[@id="column-c' +
                                          'ontent"]/div[@id="content"]/div[@id="bodyContent"]/h4 | ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-co' +
                                          'ntent"]/div[@id="content"]/div[@id="bodyContent"]/h5 ' +
                                          '		</item> ' +
                                          '		<target title="Open result" hotkey="ENTER"> ' +
                                          '                        ./a' +
                                          '		</target>' +
                                          '	</list>' +															//end Justin's stuff
                                          '	<list title="Top Bar" next="DOWN j" prev="UP k" fwd="n" ' +			//Added by Richard Latza
                                          'back="p" hotkey="6" onEmpty="top bar is not available">' +			//4-2-2009
                                          '		<item>' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-on' +
                                          'e"]/div[@id="p-cactions"]/div/ul/li[*]/a' +
                                          '		</item> ' +
                                          '		<target title="Open result" hotkey="ENTER">' +
                                          '                        . ' +
                                          '		</target> ' +
                                          '	</list> ' +															
                                          '	<list title="Navigation" next="DOWN j" prev="UP k" fwd="' +			
                                          'n" back="p"> ' +														
                                          '		<item> ' +
                                          '                        /html/body/div[@id="globalWrapper' +
                                          '"]/div[@id="column-one"]/div[*]/h5' +
                                          '		</item>' +														
                                          '	</list>													           ' + //End Richard's Stuff
                                          '	<list title="Site Navigation" hotkey="1" next="DOWN j" p' +			//Added by Heather Baldridge
                                          'rev="UP k" onEmpty="List is not available"> ' +						//4-2-2009
                                          '		<item>		     				   ' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-on' +
                                          'e"]/div[@id="p-navigation"]/div/ul/li[*] ' +
                                          '		</item>' +
                                          '		<target title="Open result" hotkey="ENTER">' +
                                          '                        ./a ' +
                                          '		</target> 		' +
                                          '	</list> ' +																//end Heather's stuff
                                          '	<list title="Toolbox Links" hotkey="2" next="DOWN j" pre' +				//Added by Subomi Udunsi
                                          'v="UP k" onEmpty= "List not available"> ' +								//on 4-6-2009
                                          '		<item>' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-on' +
                                          'e"]/div[@id="p-tb"]/div[1]/ul/li[*]/a ' +
                                          '		</item> ' +
                                          '		<target title="Open result" hotkey="ENTER"> ' +
                                          '                        . ' +
                                          '		</target>	' +
                                          '	</list> 											 	     ' +
                                          '	<list title="In other projects" hotkey="3"  next="DOWN j' +
                                          '" prev="UP k" onEmpty="List is not available">' +
                                          '		<item>' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-on' +
                                          'e"]/div[@id="p-tb"]/div[2]/ul/li[*]' +
                                          '		</item>' +
                                          '		<target title="open result" hotkey="ENTER"> ' +
                                          '		           ./a ' +
                                          '		</target> ' +
                                          '	</list> ' +
                                          '	<list title="In other languages" hotkey="4"  next="DOWN ' +
                                          'j" prev="UP k" onEmpty="List is not available">' +
                                          '		<item>' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-on' +
                                          'e"]/div[@id="p-lang"]/div/ul/li[*]' +
                                          '		</item>' +
                                          '		<target title="open result" hotkey="ENTER">' +
                                          '		               ./a ' +
                                          '		</target> ' +
                                          '	</list>' +																
                                          '	<list title="Feedback links" hotkey="5" next="DOWN j" pr' +
                                          'ev="UP k" onEmpty="List is not available"> ' +
                                          '		<item>' +
                                          '			/html/body/div[@id="globalWrapper"]/div[@id="column-on' +
                                          'e"]/div[@id="p-feedback"]/div/ul[@id="fb_list"]/li[*]' +
                                          '		</item>                                             ' +
                                          '		<target title="Open result" hotkey="ENTER"> ' +
                                          '                        ./a ' +
                                          '		</target>' +
                                          '	</list> ' +
                                          '		<target title="Login create account" hotkey="7" onEmpty' +
                                          '="Login not available" trigger="listEntry"> 		          ' +
                                          '		          /html/body/div[@id="globalWrapper"]/div[@id="' +
                                          'column-one"]/div[@id="p-personal"]/div/ul/li[@id="pt-login' +
                                          '"]/a ' +
                                          '		</target> 		            			' +
                        				  // next four lines added by subomi Odunsi on 4/17/09	
                        		          '<list title="My account" hotkey="8" next="DOWN j" prev="UP k" onEmpty="user must login first ' +
                        		          'press hot key eight to login or create account"> <item>' +
                        		          '/html/body/div[@id="globalWrapper"]/div[@id="column-one"]/div[@id="p-personal"]/div/ul/li[*]' +  
                        		          '</item>' +
                        		          '  <target title="Open result" hotkey="ENTER">' +
                                          '      ./a' +
                                          '    </target>' +
                        		          '</list>' +    						
                                          '</cnr>';																//End Subomi's stuff
                                          	
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
                           //Following show functions written by Chris Mares, and altered by Heather Baldridge
                        axsSkel.showSearchBox = function(item){
                            
                            var textBox = document.getElementById("searchInput");
                            textBox.focus(); 
                            
                        }
                        // axsSkel.showUserNameBox and showPasswordBox added by subomi Odunsi on
                        // 4/17/09  Function written by Chris Mares and alterd by Subomi Odunsi
                        axsSkel.showUserNameBox = function(item){
                        
                            var userBox = document.getElementById("wpName1");
                            userBox.focus();
                        }
                        
                        axsSkel.showPasswordBox = function(item){
                        
                            var passBox = document.getElementById("wpPassword1");
                            passBox.focus();
                        }
                        
                        /**
                        * Handler for DOMNodeInserted events. 
                        * @param {Object} evt A DOMNodeInserted event.
                        */
                        axsSkel.nodeInsertedHandler = function(evt) {
                           var target = evt.target; 
                           // If the target node is something that should
                           // be spoken, speak it here.
                           }; 
                        /**
                        * Handler for DOMAttrModified events. 
                        * @param {Object} evt A DOMAttrModified event.
                        */
                        axsSkel.attrModifiedHandler = function(evt) {
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
                        axsSkel.keyHandler = function(evt) {
                           //If Ctrl is held, it must be for some AT. 
                           if (evt.ctrlKey) return true; 
                           if (evt.keyCode == 27) {
                              // ESC
                              axsSkel.axsJAXObj.lastFocusedNode.blur(); 
                              return false; 
                              }
                           if (axsSkel.axsJAXObj.inputFocused) return true; 
                           var command = axsSkel.keyCodeMap[evt.keyCode] || axsSkel.charCodeMap[evt.charCode]; 
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
                        * that the keycode has been handled.
                        */
                        axsSkel.charCodeMap = {
                           // Map additional keyboard behavior that involves char codes here
                           // - (minus symbol)
                           45 : function() {
                              axsSkel.magSize -= 0.10; 
                              axsSkel.axsLensObj.setMagnification(axsSkel.magSize); 
                              return false; 
                              }
                           , // = (equal symbol)
                           61 : function() {
                              axsSkel.magSize += 0.10; 
                              axsSkel.axsLensObj.setMagnification(axsSkel.magSize); 
                              return false; 
                              }
                           , // ? (question mark)
                           63 : function() {
                              var helpStr = axsSkel.HELP + axsSkel.axsNavObj.localHelpString() + axsSkel.axsNavObj.globalHelpString(); 
                              axsSkel.axsJAXObj.speakTextViaNode(helpStr); 
                              return false; 
                              }
                           }; 
                        axsSkel.init(); 
                        