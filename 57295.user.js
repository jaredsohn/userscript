// ==UserScript==
// @name          Yahoo / Ymail Login
// @namespace     mailto:novemliu@gmail.com
// @description   without type the mail service name
// @include       http*://login.yahoo.com/config*
// ==/UserScript==

init();

//-------------------------------------------------------------------

function init(){
		createDropdown();
	}
	
	function createDropdown(){
		var yreglgtb = document.getElementById('yreglgtb');
		var newTd = document.createElement("td");
		var _2ndtr = (((yreglgtb.getElementsByTagName('tbody'))[0]).getElementsByTagName('tr'))[1];
		var insideDiv = (_2ndtr.getElementsByTagName('div'))[0];
		
		var mailDropdown = document.createElement("SELECT");
		mailDropdown.setAttribute("name", "targetMail");
		addOption(mailDropdown,"@ymail.com","@ymail.com");
		addOption(mailDropdown,"@yahoo.com","@yahoo.com");
		
		removeChildrenFromNode(insideDiv);
		
		insideDiv.className = "";
		insideDiv.appendChild(mailDropdown);
		
		/* Create custom js functions */
		document.getElementsByTagName('head')[0].appendChild(createJsFunction());
		
		/* Change login_form behaviors */
		document.forms['login_form'].setAttribute("onsubmit", "return customhash2(this)");
	}
	
	function changeStyles(){
		document.getElementById('username').setAttribute("style", "width:139px;");
	}
	
	function addOption(selectbox,text,value ){
		var optn = document.createElement("OPTION");
		optn.text = text;
		optn.value = value;
		selectbox.options.add(optn);
	}
	
	function removeChildrenFromNode(node){
	   var len = node.childNodes.length;

		while (node.hasChildNodes())
		{
		  node.removeChild(node.firstChild);
		}
	}
	
	function createJsFunction(){
		var scriptTag = document.createElement("script");
		var codeStr = "function customhash2(obj) { \n" +
					    "\t\t" + "alert('called!'); document.forms['login_form'].login.value+= document.forms['login_form'].targetMail.value ; \n" +
						"\t\t" + "return hash2(obj); \n" +
						"}";
		scriptTag.innerHTML = codeStr;
		return scriptTag;
	}

//-------------------------------------------------------------------