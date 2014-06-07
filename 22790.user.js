// My WeShow Widget Panel
// version 0.0.001
// 2005-05-02
// Copyright (c) 2008, Everton Fraga
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "My WeShow Widget Panel", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          My WeShow Widget Panel
// @namespace     http://www.evertonfraga.com
// @description   Improve your My WeShow (http://www.weshow.com/my) experience on creating Widgets. 
// @include       http://www.weshow.com/my/*/*/widget/*/config
// ==/UserScript==


init = function(){
	//global variables
		var textarea = document.getElementsByTagName('textarea')[0];
		var textareaContainer = textarea.parentNode;
		
	//a bit of styling
		textarea.style.width = '580px'
		textarea.style.height = 'auto'
		textarea.rows = 20

	//global functions
	is_int = function(num){
		return !isNaN(num);
	}

	addCode = function(str){
		textarea = document.getElementsByTagName('textarea')[0]
		textarea.value += str+"\n";
		return textarea.focus()
	}

		
	setTitle = function(){
		var wurl = window.location
		var match = /[0-9]+/.exec(wurl)
		var promptTitle = prompt('Type the title for your Widget', 'My Widget')
		
		if(promptTitle!=null && promptTitle!=""){		
			addCode("<script type=\"text/javascript\"> //Changes the title\n$('"+match+"-head').down().update('<span class=\"titBullet\">&raquo;</span><strong>"+promptTitle+"</strong>');\n</script>")
		}
	}

	setOpacity = function(){
		var promptOpacity = prompt('Type the desired opacity for your Applications: (from 0 to 100)', 70)
		
		if(is_int(promptOpacity)){
			addCode("<style> /* Sets Transparency*/\n.list1{\n \tbackground-color:#EFF4FF;\n \topacity: ."+promptOpacity/10+";\n \tfilter: alpha(opacity="+promptOpacity+");}\n #CENTER, #RIGHT{\n \tbackground-color:transparent;\n }\n</style>")
		}
	}

	increaseTextField = function(){
		var textarea = document.getElementsByTagName('textarea')[0];
		if(textarea.rows<=50){
			textarea.rows +=2;
		}
	}
	
	decreaseTextField = function(){
		var textarea = document.getElementsByTagName('textarea')[0];
		if(textarea.rows>=5){
			textarea.rows -=2;
		}
	}
	
	//set style
	textareaContainer.innerHTML += '<style>#gmPanel a{padding:3px 7px; margin:3px; background-color:#FFFABF; border:1px solid #DFA60D; color:#000; font-family:"trebuchet ms"; font-weight:bold; font-size:11.5px; color:#7F5E07} #gmPanel a:hover{background-color:#FFFCDF; border:1px solid #DFA60D; text-decoration:none} </style>';
	
	//creates the panel container
	var gmPanel = document.createElement('div');
	gmPanel.id = 'gmPanel'
	gmPanel.style.textAlign = 'right'
	
	textareaContainer.appendChild(gmPanel);
	
	//gmPanel.innerHTML += "";
	btLabels = ['Title', 'Opacity', '+', '-'];
	btHints = ['Change your Widget title', 'Apply transparency on the applications', 'Increase the Textfield\'s height', 'Decrease the Textfield\'s height'];
	btActions = [setTitle, setOpacity, increaseTextField, decreaseTextField];
	for(i=0; i<btActions.length; i++){
		var btPanel = document.createElement("a");
		btPanel.innerHTML = btLabels[i];
		btPanel.href = 'javascript:void(0)';
		btPanel.title = btHints[i];
		btPanel.addEventListener("click", btActions[i], false);
		gmPanel.appendChild(btPanel);
		btPanel = null;
	}
	
}

window.addEventListener('load', init, false);