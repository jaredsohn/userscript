// ==UserScript==
// @name       Quora Me Not
// @author     zanazev
// @version    1.2
// @updateURL http://userscripts.org/scripts/source/156617.user.js
// @description  Unblurs the blurred answers for unregistred users. 
// @description  A red button saying "Unblur loaded answers." should appear in the top right corner of a topic, after the page is loaded. Please give the script some time to unblur the images, it has to make additional AJAX server calls. 
// @description  Also Removes the annoying "You must be signed in to use Quora." message, in case it shows up. 
// @include    http://*quora.com/*
// @include    https://*quora.com/*
// @grant      none. 
// @copyright  Your mom
// @icon       http://quora.com/favicon.ico
// ==/UserScript==

//class selectors in this script are inspired by replaceContentInContainer from http://stackoverflow.com/a/3808886/1916182
function delByClassOrId(matcher) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        
        if((' ' + elems[i].className + ' ').indexOf(''+matcher)
                > -1) {
            elems[i].parentNode.removeChild(elems[i]);
        }
        
        //quora updated the wrapper to be identified by id, so we will check that too
        if((' ' + elems[i].id + ' ').indexOf(''+matcher)
                > -1) {
            elems[i].parentNode.removeChild(elems[i]);
        }
    }
}

//first, remove the annoying sign up wrapper
delByClassOrId("modal_signup_wrapper");

function xml_req(where,target_href){  
    var htr=new XMLHttpRequest();
    htr.open("GET",target_href,true);
    htr.send();
    
		htr.onreadystatechange = function() {
			if (htr.readyState == 4 && htr.status == 200) {
		    var doc=htr.responseText;
		    //very prone to change
		    var final_string=doc.substring(doc.indexOf('answer_content"'));
		    final_string=final_string.substring(final_string.indexOf('_container'));
		    final_string=final_string.substring(final_string.indexOf('>')+1,final_string.indexOf('_menu"'));
		    final_string=final_string.substring(0, final_string.lastIndexOf('<div') );
		    final_string=final_string.substring(0, final_string.lastIndexOf('</div>') );
		    
        where.innerHTML=final_string;
			}
		}
}

//function used to unblur the images
function cleanQuora(){
    //look for the blurred answers
    var elems = document.getElementsByTagName("*"), i;
    
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + "blurred_answer" + ' ')
                > -1) {
            //get its parent for navigation
            var parent=elems[i].parentNode;
          	var answer_holder=parent.parentNode.parentNode.parentNode;
            //parent should be answer_content
            parent.innerHTML = "Unblurring... <img src='http://d1vgw4v7ja2ido.cloudfront.net/-6e797f99a0bd554c.gif' />";
              
						//quora seems to have deleted the "related answers" section
						//i have cleaned up the additional stuff related to it from the code
						//however, i am leaving the "quoraURLfriendly" function in the code, as might come in handy in future  
            
            if(
							(answer_holder.children[0].children[0].children[0].children[0])&&
							(answer_holder.children[0].children[0].children[0].children[0].children[0])&&
							(answer_holder.children[0].children[0].children[0].children[0].children[0].children[0])&&
							(answer_holder.children[0].children[0].children[0].children[0].children[0].children[0].firstChild)
						){
          		//this checks for the "originally answered" answers. their permalink is different from other answers on the current page
          		//prone to change...
          		var base=(answer_holder.children[0].children[0].children[0].children[0].children[0].children[0].firstChild.href);
						}else{
							//regular answer
							var base=document.URL;
						}
						
            var answer_string=parent.parentNode.parentNode.parentNode.getAttribute( 'id' );
            answer_string=answer_string.substring(3);
            var target_href=forgeAnswerLink(base,answer_string);  
            
            var final_string=xml_req(parent,target_href);
        }
    }
}

function forgeAnswerLink(base,answerid){
	if(base.lastIndexOf("#")!=-1){
		base=(base.substring(0, base.lastIndexOf("#") ));
	}
	if(base.lastIndexOf("?")!=-1){
		base=(base.substring(0, base.lastIndexOf("?") ));
	}
	
	return (base+"/answers/"+answerid);
}

/* not used atm, might use again in future
	
	function quoraUrlFriendly(str){
  goodchars=/[a-zA-Z0-9]/;
  var result='';
  
  hadonce=true;
  for(var i=0;i<str.length;i++){
  
    if(str.indexOf('behaviour')>-1){
      //alert(str[i]);
    }
  
    if(goodchars.test(str[i])){
      result+=str[i];
      hadonce=false;
    }else{
      if((str[i]=='\'')||(str[i]=='“')||(str[i]=='”')){
        //specially treated chars
        //might have not caught all of them
        if(str[i]=='“')
          result+='%E2%80%9C'; //“
        if(str[i]=='”')
          result+='%E2%80%9D'; //“
          
      }else{
        if(!hadonce){
          result+='-';
          hadonce=true;
        }
      }
    }
  }
  
  if(result[result.length-1]=='-')
    result=result.substring(0,result.length-1);
  
  return result;
}*/

//create the button
document.addEventListener("DOMContentLoaded", function(){
    //to make sure...
		delByClassOrId("modal_signup_wrapper");
		
		var clear_button = document.createElement("div");	
		//generated @ http://www.cssbuttongenerator.com/
		var nicebutton="-moz-box-shadow:inset 0px 1px 0px 0px #faf2fa;-webkit-box-shadow:inset 0px 1px 0px 0px #faf2fa;box-shadow:inset 0px 1px 0px 0px #faf2fa;background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #f07676), color-stop(1, #bd3131) );background:-moz-linear-gradient( center top, #f07676 5%, #bd3131 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f07676', endColorstr='#bd3131');background-color:#f07676;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #c21f1f;display:inline-block;color:#080508;font-family:arial;font-size:15px;font-weight:bold;padding:6px 24px;text-decoration:none;text-shadow:1px 1px 0px #E95C5C;";
		clear_button.innerHTML = '<div style="text-align:center;width:213px;font-size:1.8em;'+nicebutton+'"><a href="#quorasucks" style="color:black;">Unblur loaded answers.<br /><span style="font-size:0.65em;">(may take a while!)</span></a> </div>';
		
		var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
    		//used to look for signup_column before. revert back to it in case of problems
        if((' ' + elems[i].className + ' ').indexOf(' ' + 'signup_column' + ' ')
                > -1) {
						clear_button.addEventListener("click", cleanQuora, false); 
            elems[i].insertBefore(clear_button, elems[i].firstChild);
            
        }
    }
},false);

