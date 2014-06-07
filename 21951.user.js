// ==UserScript==
// @name           selectSearch
// @namespace      none
// @description    Search for options in select elements by double clicking on them.
// ==/UserScript==


var javascript = document.body.appendChild(document.createElement('script'));
javascript.type = 'text/javascript';
javascript.innerHTML = ""
+ "function set_event(element)"
+ "{ "
+ " var arrClicks = Array;"
+ " arrClicks[ element.id ] = 0; "
+ " if (element == null) return;"
+ " element.onblur = function resetClicks() { arrClicks[ this.id ] = 0; }; "
+ " element.onclick = function checkForClick() "
+ " {"
+ "  if( (arrClicks[ this.id ]++ % 2) == 0) return;"                    // Check for 'double clicks'
+ "  val = prompt('Search for:\\nPress cancel to display all.');"
+ "  for(i = this.options.length-1; i > 0; i--)"                        // Loop backwards.
+ "  {"
+ "    option = this.options[i]; "
+ "    if ( option.text.toLowerCase().indexOf(val) != -1 || val == null )"  // Entry(ies) found or nothing entered
+ "    {" 
+ "     if(val!=null) {option.selected = true;} "                           // If searching for a value, then select the first one.
+ "     option.style.display = 'block'; "                                   // Display found entries
+ "    } else { option.style.display = 'none';} "                           // Hide non found entries
+ "  }"
+ " this.onchange();"
+ " };"
+ "}"
+ "elements = document.getElementsByTagName('select');"                     // Do this for all select elements on the page.
+ "for(i = 0; i < elements.length; i++) "
+ "{ element = elements[i];"
+ "  if(!element.id) element.id='selectelement' + i;"
+ "  set_event(element)"
+ "}";