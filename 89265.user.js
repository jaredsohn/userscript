// ==UserScript==
// @name           Freebase boyfriend
// @author         Spencerwater
// @namespace      http://spencerwaterbed.com/soft/bookmarklet
// @description    query freebase in natural language by simply typing, from any website
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js

// ==/UserScript==

 
  
 
 
	var url = document.location + ''; 
	jQuery('body').prepend('<span id=\'funel\' style=\'position:absolute; top:50px; left:200px; z-index:9999;float:right; display:inline-block; background:white;\'><span class=\'human\' style=\'position: absolute;text-align: center;float:right;width: 250px;min-height: 20px;_height: 20px;background: #000;opacity: 0.8;-moz-opacity: 0.8; filter:alpha(opacity=80); color: #fff;z-index: 100000;padding: 10px;font-size: 30px;-moz-border-radius:10px;-webkit-border-radius: 10px;-o-border-radius: 10px; border-radius: 10px;\'><input type=\'text\' id=\'humantext\' value=\'\' style=\'width:200px; font-family:Sans-serif; font-size:1em; background:black; color:white; border:0px;\'/></span><span id=\'thefbanswer\' style=\'position:absolute; color:black;font-size:15px; border-style:solid; border-width:1px; border-color:black; top:10px; left:350px; z-index:9999;float:right; display:inline-block; background: white;opacity: 0.9;-moz-opacity: 0.9; filter:alpha(opacity=90);-moz-border-radius:10px;-webkit-border-radius: 10px;-o-border-radius: 10px; border-radius: 10px; \'></span></span>');
	  

	   
	   
	//   jQuery('#humantext').focus();
document.getElementById(#humantext').focus();
	    function fadeout(){jQuery('.human').fadeOut('slow', function() {  }); }
	    
   var t= setTimeout( fadeout,2000);
   var t2;
	   
	   document.addEventListener('keypress', function(e) {
if(jQuery("textarea:focus").length==0 && $("input:focus").length==0){
 if(jQuery('.human').css('display')=='none'){
 var unicode=e.keyCode? e.keyCode : e.charCode;
unicode=String.fromCharCode(unicode);
jQuery('#humantext').attr('value',unicode);
}

 jQuery('.human').fadeIn('fast', function() {  });
//jQuery('#humantext').focus();
}
	   },false);
	   
var pin=false;
/*keep answer around*/	   
jQuery('#thefbanswer').hover(
  function () {
    if(!pin){jQuery(this).css('border-width','2px');
    }
  }, 
  function () {
    if(!pin){jQuery(this).css('border-width','1px');
     t2= setTimeout(" jQuery(' #thefbanswer').fadeOut('slow', function() {  }); ",1000);}/*for hide the input*/
  });
  
  jQuery('#thefbanswer').click(function(){clearTimeout(t2);if(pin){pin=false}else{pin=true;$(this).css('border-width','2px');};});

	   
	var timeoutID;   
	   jQuery('#humantext').keyup(function(){ 
	   
	      try{window.clearTimeout(timeoutID);}catch(e){}/*for fast typing*/
      timeoutID = window.setTimeout(run, 800);
   
      clearTimeout(t);
	
          function run()
      { 
		    
	   jQuery("#thefbanswer").html('<img src=\'http://acre.freebase.com/api/trans/raw/guid/9202a8c04000641f800000000abf4b47\'>');
	   jQuery('.human, #thefbanswer').css('display','inline');
	   
	      var q=jQuery("#humantext").attr("value");
q=encodeURI(q);
   $.getJSON("http://westport.spencermountain.user.dev.freebaseapps.com/jsonp?q="+q+"", 
          function(data){  $("#thefbanswer").html(JSON.stringify(data)); 
          var j=JSON.parse($("#thefbanswer").html());
          var all='';
          try{
          for(var i in j.response.result.answerid)
          {all+='<tr style=\'height:50px;\'><td style=\'width:50px;\'><a href=\'http://freebase.com/view'+j.response.result.answerid[i]+'\'><img style=\'border:0px;\' src=\'http://www.freebase.com/api/trans/image_thumb'+j.response.result.answerid[i]+'?errorid=/m/0djw4wd\''+j.response.result.answerid[i]+'/></a></td><td style=\'width:200px\'><a href=\'http://freebase.com/view'+j.response.result.answerid[i]+'\'>'+j.response.result.answer[i]+'</a></td></tr>';
          }}catch(e){}
          if(all=='')
          {for(var i in j.response.result.answer)
           {all+=j.response.result.answer[i]+'<p></p>';
           }
          }
          jQuery("#thefbanswer").html('<table>'+all+'</table>');
          
          t=setTimeout(fadeout,5000);/*for hide the input*/

	
                      });
	   
	   
	         
	   }
	   
	   
	   
	   });
	   

	   