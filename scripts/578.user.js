// ===UserScript===
//
// @name		Yahoo Mail Username Assistant
// @description		provides a drop-list of yahoo mail login names.
// @include		*mail.yahoo.com*
// @include		*login.yahoo.com*
// ===/UserScript===
//
// In answer to a request on the wiki, this script
// saves a clickable list of yahoo usernames to select
// from on the login page. Any time a new name is used,
// it gets automatically added to the list, so to start
// the list, you have to type in the first name. Remembers
// the last username used and automatically populates the 
// input box with it. There's probably a simple way to 
// re-enable the browser's native form-remembering, 
// but this way is more fun.
//
// License: http://gnu.org/copyleft/gpl.html
// Complaints: cwf [] axlotl [] net
//
// Clear the list by uncommenting the first line
// and loading mail.yahoo.com once.


(function()
{
	//GM_setValue('uNameArray', '');
	function infectStyles(css)
	{
		var h, s;
		h=document.getElementsByTagName('head')[0];
		if(!h){return;}
		s=document.createElement('style');
		s.type='text/css';
		s.innerHTML=css;
		h.appendChild(s);
	}

	var input, uNames, submit, login, loginWidth, loginDefault;
	input = document.evaluate(
		"//input[@name='login']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	login = input.snapshotItem(0);
	
	if(loginDefault = GM_getValue('ymunDefault')){
		if(loginDefault != ''){
			login.value = loginDefault;
		}
	}

	loginWidth = document.defaultView.getComputedStyle(login,'').getPropertyValue('width');
	with (login.style) {
		background = "#f0ffff";
	}

	if (uNames = eval(GM_getValue('uNameArray'))){
		if (uNames != null && uNames != ''){
			var nameDiv = drawNames();
			login.appendChild(nameDiv);
		}
	} else {
		uNames = new Array();
	}

	function drawNames()
	{
		nameDiv = document.createElement('div');
		nameDiv.setAttribute('id','nameDiv');
		with (nameDiv.style) {
			position= "absolute";
			width = loginWidth;
			margin = "0 0 0 15px";
			background = "#b6c7e5";
			border = "1px solid #250175";
			opacity = ".9";
		}
		var nameList = document.createElement('ul');
		nameList.setAttribute('id','nameList');

		var listItem;
		if (typeof(uNames.length) != 'undefined'){
			for (var i = 0; i < uNames.length; i++){
				listItem = document.createElement('li');
				listItem.setAttribute('class','listItem');
				listItem.innerHTML = uNames[i];
				nameList.appendChild(listItem);
			}
		}
		nameDiv.appendChild(nameList);
		return nameDiv;
	}

	
	login.addEventListener('keypress',
		function(event)
		{
			var removeMe;
			if(removeMe = document.getElementById('nameDiv')){
				removeMe.parentNode.removeChild(removeMe);
				with (login.style) {
					background = "#fff";
				}
			}
		},
		false);
	
	
	var items = document.evaluate(
		"//li[@class='listItem']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for ( var j=0; j<items.snapshotLength; j++){
		items.snapshotItem(j).addEventListener('click',
		function(event)
		{
			login.value = event.target.innerHTML;
			var removeMe = document.getElementById('nameDiv');
			removeMe.parentNode.removeChild(removeMe);
			with (login.style) {
				background = "#fff";
			}
		},
		false);
	}

	document.login_form.onsubmit = function()
	{
		var addName = true;
		var newName = login.value;
		if (uNames.length > 0 ){
			for (var i=0; i < uNames.length; i++){
				if(uNames[i] == newName){
					addName = false;
					break;
				}
			}
		}
		if (addName){
			uNames.unshift(newName);
		}
		GM_setValue('ymunDefault', login.value);
		GM_setValue('uNameArray', uneval(uNames));
	}

	infectStyles(
		'#nameDiv {'+
		'-moz-border-radius: 6px;'+
		'}'+
		'#nameList li{'+
		'margin: 2px 5px 2px -35px;'+
		'border: 1px solid #b6c7e5;'+
		'padding-left: 4px;'+
		'color: #3a3a3a'+
		'}'+
		'#nameList li:hover{'+
		'background: #fff;'+
		'color: #250175;'+
		'cursor: pointer;'+
		'-moz-border-radius: 3px;'+
		'border: 1px solid #250175;'+
		'}'+
		'ul#nameList {'+
		'list-style-type: none ! important;'+
		'margin: 0;'+
		'font-family: arial, "ms trebuchet", sans-serif;'+
		'}'
		);

})();
