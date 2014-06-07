	// ==UserScript==
	// @name           Script pour RTF
	// @namespace      non
	// @include        http://apps.facebook.com/castle_age/*
	// ==/UserScript==
	
	// 
	function getHelpNumber ( texte )
	{
		var maReg = new RegExp( "([0-9]+)(th|st|nd|rd)", "gi" ) ;
		var resultat = texte.match( maReg ) ;
		
		if ( resultat )
		{
			var chaine ="" ;
			for ( i=0; i<resultat.length; i++ )
			var chaine = chaine + resultat[i] + "\n" ;
			 
			return chaine;
		}
		else
			return "Already assisted";
	}
	
	//
	function getFormName( texte )
	{
		var maReg = new RegExp( "app46755028429_form_[a-z0-9]+\"", "gi" ) ;
		var resultat = texte.match( maReg ) ;
		
		if ( resultat )
		{
			var chaine ="" ;
			for ( i=0; i<resultat.length; i++ )
			var chaine = chaine + resultat[i] + "\n" ;
			 
			return chaine;
		}
		else
			return false
	}


	function getCookie(c_name)
	{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1)
		{
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
		}
	  }
	return "";
	}

	// Text Area Datas
	textArea = document.getElementById('app46755028429_comment_text_area'); 
	
	// Div with help status datas
	resultContainer = document.getElementById('app46755028429_results_main_wrapper'); 
	
	if (resultContainer != null)
	{
		// This is our helper position
		var position = getHelpNumber(resultContainer.innerHTML);
		var tinyurl = getCookie("tinyurl");
		textArea.innerHTML = position + " - FR :) / PRTF " + tinyurl + " ^_^";
		
		// This is the area where we can find the form ID
		var formArea = document.getElementById("app46755028429_chat_log");
		// This is the form ID
		var formName = getFormName(formArea.innerHTML);
		
		if (formName != false)
		{
			formName = formName.replace("\"", "");
			
			//alert(formName + "\n" + "app46755028429_form_4bfc0cd5adb8sdf6d0604");
			
			// submit the form
			//app46755028429_form_4bfc0cd5adb8sdf6d0604
	
			
			//document.getElementById(formName).submit();
		}
	}