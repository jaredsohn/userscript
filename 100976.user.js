// ==UserScript==
// @name            HKG !![$_$]!! Dirty Word v0.1
// @namespace       http://forum.vlshk.com
// @description     add a "Dirty Word" converter on reply page
// @include         http://forum*.hkgolden.com/post.aspx?*
// @include         http://forum*.hkgolden.com/view.aspx?*
// ==/UserScript==

// ===============
// Dirty Word v0.1 script by !![$_$]!! 2011-04-11
// ===============


// my forum : http://forum.vlshk.com
// please visit my forum to support me.


(function() {
	


	
	function insertAfter(newElement,targetElement)
	{
		var parent1 = targetElement.parentNode;
		if(parent1.lastChild == targetElement)
		{
		   parent1.appendChild(newElement);
		}
		else
		{
		   parent1.insertBefore(newElement,targetElement.nextSibling);
		}
	}



    var oNewSpan = document.createElement("span");
    temp='&nbsp;<span style="cursor:pointer;font-size:12px;" onclick="var result=\'\';var startPos =  document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').selectionStart;var endPos =  document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').selectionEnd;var selectedText = document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').value.substring(startPos, endPos); if(selectedText==\'\'){source=document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').value ;  for(i=0; i<source.length; i++){if(source.charCodeAt(i)!=10){ result += \'&#\' + source.charCodeAt(i) + \';\';}else{ result+=String.fromCharCode(10); } }  }else{ str1=document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').value.substring(0,startPos);	str2=document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').value.substring(endPos,document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').value.length); source=selectedText ;  for(i=0; i<source.length; i++){if(source.charCodeAt(i)!=10){ result += \'&#\' + source.charCodeAt(i) + \';\';}else{ result+=String.fromCharCode(10); } } result=str1+result+str2; } ; document.getElementById(\'ctl00_ContentPlaceHolder1_messagetext\').value=result; ">&#36681;&#25563;&#32232;&#30908;</span>';
    oNewSpan.innerHTML=temp;






	// if you have compatible problem with other script , you can edit this line
    insertAfter(oNewSpan,document.getElementById('ctl00_ContentPlaceHolder1_btn_Submit'));




})();