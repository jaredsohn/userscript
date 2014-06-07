// ==UserScript==
// @name        JavaBaker - GitHub
// @namespace   JavaBaker
// @version     1
// @include http://github.com/*
// @include https://github.com/*
// @include github.com/*
// @grant       none
// test
// ==/UserScript==
$("pre").click( function(event)
{
   var code = "";
   var codeLines = document.getElementsByClassName("line");
   var arr = Array.prototype.slice.call( codeLines );
   for(var i = 0; i < arr.length; i++)
   {
        code = code + $(arr[i]).text() + "\n";
   }
   alert(codeLines);
   code = encodeURIComponent(code);
   var url = ""+code;
   var form = document.createElement("form");
		    form.setAttribute("method", "post");
		    form.setAttribute("action", "http://gadget.cs.uwaterloo.ca:2145/snippet/getapitreefromcode_graph.php");
            form.setAttribute("target", "newwin");
		        var hiddenField = document.createElement("input");		
		        hiddenField.setAttribute("name", "pastedcode");
		        hiddenField.setAttribute("id", "pastedcode"); 
		        hiddenField.setAttribute("value", code);
		        form.appendChild(hiddenField);
		        form.onSubmit=window.open('','newwin','height=600,width=800,resizable=yes,location=no,scrollbars=yes,channelmode=yes,left='+screen.width/3+',height='+screen.height/3);
		        document.body.appendChild(form);    // Not entirely sure if this is necessary			
		        form.submit();

});