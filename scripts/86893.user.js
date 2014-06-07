// ==UserScript==
// @name           Blackboard File Upload Fix for Firefox
// @namespace      BBFileUploadFixForFirefox
// @description    Allow all versions of Firefox to upload files to Blackboard.
// @include        https://blackboard.byu.edu/webapps/blackboard/assignments/student/do_assignment.jsp*
// @version        0.2
// @license        GNU General Public Licence
//
// @history
// 0.1 Original script
// 0.2 Fixed bug that I didn't catch before
//     Tested and works.
// ==/UserScript==



function init(){
	contentEval(FFBBFix);
}

function FFBBFix(){
	if(typeof FilePickerValidator_check != "function"){
		return;
	}
	
	if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
		var ffversion = RegExp.$1;
		if(ffversion < 3.0){
			alert("You must be using Firefox 3.0 or above to upload files.");
			return;
		}
			
		var newFunc = FilePickerValidator_check.toString();
		// Trim leading function information "function FilePickerValidator_check() { " and Trim ending function close "}"
		newFunc = newFunc.substring(43,newFunc.length-1);
		
		// Replace "firefox/3.0" with "firefox/[whatever version your're using]"
		newFunc = newFunc.replace('firefox/3.0','firefox/'+ffversion);
		
		// Create a new function from the string
		var changedFunc = new Function("",newFunc);
		
		// Change the FilePickervalidator_check function pointer to the new function
		FilePickerValidator_check = changedFunc;
		
		// Change function pointer that was previously set to the new function
		newFile.check = changedFunc;
	}
}

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

if (window.attachEvent) attachEvent("onload",init);
else addEventListener("load",init,false);