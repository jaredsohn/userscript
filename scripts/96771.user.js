// ==UserScript==
// @name          clicksave
// @namespace     http://userscripts.org/users/pierr
// @description   click the words and it will be saved
// @copyright     pierr chen
// @contributor   pierr chen
// @include       http://*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.7
// ==/UserScript==


function debug (msg)
{
//	alert(msg)
}


function getSelText()
{
    var txt = '';
     if (window.getSelection) //firefox
	 {
			 txt = window.getSelection();
	 }
	 else if (document.getSelection)
	 {
			 txt = document.getSelection();
	 }
	 else if (document.selection)
	 {
			 txt = document.selection.createRange().text;
	 }
	 else return;

	 return txt
}

function containsOnlyLetters(checkString) {
        var tempString="";
        var pattern = /^[A-Za-z]$/;
        if(checkString != null && checkString != "")
        {
          for(var i = 0; i < checkString.length; i++)
          {
			debug(checkString.charAt(i)); 
            //equals each_char is ruby1.9 , not each_byte
			if (!checkString.charAt(i).match(pattern))
            {
              return false;
            }
          }
        }
        else
        {
          return false;
        }
        return true;
}
function saveSelText()
{

    var selObj = getSelText();
    //getSelText returns an DOM string instead of java script string
	var selText = getSelText().toString();
	//validate the select should only contains a-zA-Z
	if ( !containsOnlyLetters(selText))
	{
		debug("non-english selected ->" + selText);
		return;
	}
	
	if ((selText.length > 20) || (selText.length < 3) )
	{
		debug('unreasonable length ->' + selText.length);
		return;
	}
	
	//we have a meanful words to save now
	//try to capture the examples get the parents node's text
	var anchorNode = getSelText().anchorNode
	//anchorNode is a text node , should use data properties
	debug('example' + anchorNode.data);
	var context = anchorNode.data


	//get only the sentence the selection is in, assuming the range contains only 1 nodes
	
	var selRange = selObj.getRangeAt(0);
	var startOffset = selRange.startOffset;
	var endOffset = selRange.endOffset;
	//starNode = selRange.startContainer;	
	//endNode  = selRange.endContainer;	
	
	debug(context);
	//OK. let's split the sentence and select the
	//split the context to several sentences and choose the sentence that contains the words
	var r = context.split(/\.|\?|\!/).filter(function(x){
			//use jquery's utility function 
			debug("setence_each:" + x);
			if ($.inArray(selText, x.split(" ")) != -1)
			{ 
				return true;
			}else{
				return false;
			}
		}
	)	

	var example = "can not find the example";
	if (r.length != 0) 
	{
		example = r[0];
	}
	
	debug(example);
	{
	 	//var url = "http://localhost:3000/auto_create?content="+getSelText();
	 	var domain = "http://jdc.heroku.com"
	 	//var domain = "http://localhost:3000"
		var url = domain + "/auto_create";
       	
		//this will generate a 1002 error due to cross domain
		//$.get(url,{},false);
		$.ajax({
		type: 'GET',
		url:	url, 
		data: { 'content': selText , 'example': example},
		dataType: 'jsonp',
		jsonp:'jsonp_callback',
		success: function(data) {
			//alert(data);
		},
	});
	}
}

$(document).ready(function(){
	$(document).mouseup(function(){
		//alert('Handler for .mouseup called.');
		saveSelText()
	})

})
