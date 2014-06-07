// ==UserScript==
// @name        JavaBaker - StackOverflow
// @namespace   JavaBaker
// @version     1
// @include http://stackoverflow.com/*
// @include https://stackoverflow.com/*
// @include stackoverflow.com/*
// test
// @grant       none
// ==/UserScript==
$("code").click( function(event)
{
   var code=encodeURIComponent($(this).text());
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