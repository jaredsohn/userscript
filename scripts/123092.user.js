// ==UserScript==
// @name           Search Engine minify url
// @description    Removes all extra unneeded/long url  (location bar) when searching Bing/Google/Yahoo! Motty Katan(c) 13-01-2012 last updated 14-01-2012   
// @include http://*.google.*/webhp*
// @include https://*.google.*/webhp*
// @include http://*.google.*/
// @include https://*.google.*/
// @include http://*.google.*/search*
// @include https://*.google.*/search*
// @include http://*.bing.*/
// @include http://*.bing.*/?FORM*
// @include http://*.bing.*/search*
// @include http://*.bing.*/?scope=web*
// @include http://*.search.yahoo.*/
// @include http://*.search.yahoo.*/search*
// ==/UserScript==
//14-01-2012 Added Bing and subsequently changed the user script name from Google minify url to Search Engine minify url 
//21-01-2012 Added Yahoo! + Chrome compability, still onkeypress is not dealt with so clicking enter key on chrome will 
//           get you the old url result.
(function(){
	//1. Google doesn't like method POST so altering form.action is not a good idea (to +=q=value)...
	//2. Don't want to overwrite onsubmit event attribute since it's a bad practice. this has concequences... see next.
	//3. Currently pressing on back doesn't show the query... which is bad, but not terrible.
	//4. Generally speeking Google's code was never something bright or effective. Up until a few years
	//   they used <font> tags! 
	//4.1. Currently they (Google but also Bing) don't watch the onkeypress event for "enter" key pressed...
	//4.2. Google uses <button> (in it's search results) instead of <input type=submit> as in it's root page.
	//     using the buttons is bad... no onsubmit event as expected... 
	
	//in case Google ever adds onkeypress... try to avoid multi callings	
	var bSubmited = false;
	var sInputTextName = "q";
	var asInputEventAdded = new Array(); 
	function handleQuery(e, bSkipDefaultPreventionCheck)
	{
		var oForm = getForm(e);
		var oInput = getInput(oForm);  	
		function submitData(){			
			sHref = location.protocol+"//"+location.host+"/";
			sAction = oForm.action;
			//clean action since it may contain a full url
			sAction = sAction.replace(sHref, "");
			//Yahoo! adds more arguments after search
			sAction = sAction.replace(/(.+\/)?(search)(;.+)/,"$1$2");
			window.location.replace(sHref + sAction + "?" + oInput.name + "=" + oInput.value);
		}		

		//if the user typed something in the search, Google won't prevent the submit!
		//yet this is unreliable due to constraints (caller maybe not just form but input or button)
		if (bSkipDefaultPreventionCheck || e.defaultPrevented!==true || oInput.value.length) {
			bSubmited = true;
			
			//OK then, we will say va-t-on to all addition to the query (get)
			//this was sufficient, though when clicking back the buttons were missing...
			//so I tried some new code, but location.href failed... and it seem that
			//both codes segments needs one another			
			var nLength = oForm.elements.length;
			var i=0;
			while(i<nLength)
			{
				if (oForm.elements.item(i).type!="text"){
					oForm.elements.item(i).parentNode.removeChild(oForm.elements.item(i));
					nLength--;
				} else {
					i++;
				}
			}			
			submitData();	
		}
	}
	
	function getForm(e)
	{
		return (typeof(e.target.form)!="undefined") ? e.target.form : e.target;
	}
	
	function getInput(oForm)
	{
   		//yes most chances are there won't be a change in the famous "q" for input query
		//nevertheless I'm opting against hard coding it (Yahoo! is using a "p")
		aoInput = document.evaluate( "descendant::input[@type='text']", oForm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		oInput = null;		
		if (aoInput.snapshotLength == 1) {
			oInput = aoInput.snapshotItem(0);			 
		}
		return oInput;	
	}
	
	function submitForm(e)
	{
		var oForm = getForm(e);		
		//work nicely inside a sandbox
		oForm.removeEventListener("submit", arguments.callee);
		handleQuery(e, false);
		//only if not submited
		if (!bSubmited) {
			oForm.addEventListener("submit", arguments.callee);
		}
	}

	//switching to containt for future support (such as Yahoo!) 	  
	aoForms = document.evaluate( "//form[contains(@action,'/search')]", window.document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var j=0;
	while(j<aoForms.snapshotLength)
	{
		oForm = aoForms.snapshotItem(j++);

		oInput = getInput(oForm);
		if (oInput) {
			sInputTextName = oInput.name; 
		} else {
			oInput = document.getElementsByName(sInputTextName)[0];		
		}
			
		function camalCase(sProperty)
		{		                              
			return sProperty.charAt(0).toUpperCase() + sProperty.slice(1); 
		}

	    //make sure the input is inside the same form
		aoInputSubmit = document.evaluate( "descendant::input[@type='submit' and count(ancestor::form)=1]", oForm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	    //this is good
	    if (aoInputSubmit.snapshotLength) {
			oForm.addEventListener("submit", submitForm);
			for(var i=0;i<aoInputSubmit.snapshotLength;i++)
			{
				asSavedStyle = new Array();
				oComputedStyle = window.getComputedStyle(aoInputSubmit.snapshotItem(i));
				for(var k=0;k<oComputedStyle.length;k++)
				{					
					asSavedStyle[oComputedStyle[k]] = oComputedStyle.getPropertyValue(oComputedStyle[k]);
				}
				aoInputSubmit.snapshotItem(i).type = "button";
				aoInputSubmit.snapshotItem(i).addEventListener("click", submitForm);
				for (sStyle in asSavedStyle)
				{
					//Won't work: oComputedStyle.setProperty(sStyle, asSavedStyle[sStyle],"");
					sCamalStyleStyle = sStyle.replace(/([^-]+)-?([^-]+)?-?([^-]+)?-?([^-]+)?/,function(){
						var i=2;
						var sReturnVal = "";
						if (arguments.length>4){
						sReturnVal = arguments[1];
							while (i<5 && typeof(arguments[i])!="undefined" && arguments[i].length)
							{
								sReturnVal += arguments[i].charAt(0).toUpperCase() + arguments[i].slice(1);
								i++;	
							}
						}
						return sReturnVal;
					});
					aoInputSubmit.snapshotItem(i).style[sCamalStyleStyle] = asSavedStyle[sStyle];
				}
				oComputedStyle = null;				 
			}
		} else {
			//annoying!
			aoButtonSubmit = document.evaluate( "//button[@type='submit']", oForm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );	 	
			if (aoButtonSubmit.snapshotLength) {
				for (var i=0; i< aoButtonSubmit.snapshotLength; i++)
				{
					//have no other option but to change type to "button" from "submit"
					aoButtonSubmit.snapshotItem(i).type = "button";
					aoButtonSubmit.snapshotItem(i).addEventListener("click", submitForm);	
				}
			}
		}
		
		if (typeof(asInputEventAdded[oInput.name])=="undefined") {
			oInput.addEventListener("keypress", function(e) {
			asInputEventAdded[oInput.name] = 1;
				if (e.which==13 && !bSubmited) {
					//sandbox (a weak one)
					this.removeEventListener("keypress", arguments.callee);
					//Note: trying to form.submit won't do, have to call the function manually
					//since again the hook is done by adding listener and can't prevent
					//as well as onkeypress html event attribute.
					handleQuery(e, true);
					this.addEventListener("keypress", arguments.callee, false);
				}
			}, false);
		}		 
	}
})();