// ==UserScript==
// @name       TestLink
// @namespace  http://localhost/testlink-1.9.5/
// @version    0.1
// @description  adding hotkeys to TestLink pages. 
// @include      http://localhost/testlink-1.9.5/*
// @copyright  2012+, Eugene Nichegovskiy
// @run-at document-end
// ==/UserScript==
/*
 * F2 - to save test cases, test steps; F3 - save test case and go to create one more test
 * F7 - create test case, test steps.
 * n,f,b,p - hot-keys for test exectuion statuses not_run, failed, blocked,passed
 * tested under Chrome browser. Hotkeys works if focus out of fkeditor frame.
*/
function initSetResults(){
    //n - not run
    //f - failed
    //p - passed
    //b - blocked
    
	var getTC_id,
	status,
	statusN = "status_id_n",
	statusB = "status_id_b",
	statusF = "status_id_f",
	statusP = "status_id_p",
	btnSave = "save_results[id]",
    btnNext = "save_and_next[id]",
        //if status passed or not run click button Save and move to next
        //if status blocked, failed click button Save execution, because users needed to add bugs and comments.
	hotKeySave = false,
    hotKeyNext = false;
	document.onkeydown = function(event) {
		var keyCode = ('which' in event) ? event.which : event.keyCode;
		switch (keyCode) {
  		  case 78: //n
		    getTC_id = document.getElementsByTagName("textarea")[0].getAttribute('id').replace(/[^\d\.\-\ ]/g, '');
 		    status = statusN.replace("id",getTC_id);
		    hotKeyNext = true;
		  break;
  		  case 80: //p
		    getTC_id = document.getElementsByTagName("textarea")[0].getAttribute('id').replace(/[^\d\.\-\ ]/g, '');
                console.log(getTC_id);
 		    status = statusP.replace("id",getTC_id);
		    hotKeyNext = true;
		  break;
  		case 66: //b
		    getTC_id = document.getElementsByTagName("textarea")[0].getAttribute('id').replace(/[^\d\.\-\ ]/g, '');
 		    status = statusB.replace("id",getTC_id);
		    hotKeySave = true;
		  break;
  		case 70: //f
		    getTC_id = document.getElementsByTagName("textarea")[0].getAttribute('id').replace(/[^\d\.\-\ ]/g, '');
 		    status = statusF.replace("id",getTC_id);
		    hotKeySave = true;
		  break;
		}
		if (hotKeySave){
 		   document.getElementById(status).click();
           document.getElementsByName(btnSave.replace("id",getTC_id))[0].click();
        } else if (hotKeyNext){
 		   document.getElementById(status).click();
           document.getElementsByName(btnNext.replace("id",getTC_id))[0].click();
        }
				
	};
}
function initSaveTestcase(elName){
//F2 - Save TestCase
//F3 - Save TestCase and Create one more.
	document.onkeydown = function(event) {
    	var keyCode = ('which' in event) ? event.which : event.keyCode;
		switch (keyCode) {
            case 113:
                if (document.getElementById("stay_here") != null){                
                	document.getElementById("stay_here").checked = false;
                    document.getElementById("do_create_button").click();
                }
                if (document.getElementById("do_update_step") != null){
                    document.getElementById("do_update_step").click();
                }
            break;
            case 114:
                if (document.getElementById("stay_here") != null){                
                	document.getElementById("stay_here").checked = true;
                	document.getElementById("do_create_button").click();
                }
            break;
            case 118:
                if (document.getElementsByName(elName) != null){   
    				document.getElementsByName(elName)[0].click();
                }
            break; 
        }
    };
}

var frameHref = window.frames.location.href;
//Test Executions
if (frameHref.indexOf("execSetResults")!=-1){
    window.onload = initSetResults();
}
//Save new TestCase/TestSteps
if ((frameHref.indexOf("tcEdit") != -1) || (frameHref.indexOf("edit=testcase") != -1)) {
   window.onload = initSaveTestcase("create_step"); 
}
// Create TestCase
if (frameHref.indexOf("test_specification&edit=testsuite") != -1){
    //create test case
   window.onload = initSaveTestcase("create_tc");
}
