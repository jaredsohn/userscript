// ==UserScript==
// @name           OffLiberty
// @namespace      off_               
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js   
// @include        http://offliberty.com*
// ==/UserScript==
                      
$(document).ready(function(){
		    
     function filterData(data){
	  data = data.replace(/<?\/body[^>]*>/g,'');
	  data = data.replace(/[\r|\n]+/g,'');
	  data = data.replace(/<--[\S\s]*?-->/g,'');
	  data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
	  data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
	  data = data.replace(/<script.*\/>/,'');
	  data = data.replace(/[\ ]+/,'');
	  return data;
     }
     $("#track").removeAttr('disabled');
     //get playlist id
     $("#track").change(function(e){
	  val = $(this).val();          
	  var patt1=/www\.youtube\.com\/playlist\?list\=([A-Za-z0-9-_]+)/gi;        
	  playlist = val.match(patt1);
	  if(playlist!=null){
	       
	       $("#track").attr('disabled', 'disabled');
	       $("#button").remove();	      

	       playlist = playlist[0].replace("www.youtube.com/playlist?list=","");
              
	       //get vidz
	       url = "http://www.youtube.com/playlist?list="+playlist;	
	       url2 = "http://query.yahooapis.com/v1/public/yql?"+"q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(url)+"%22&format=xml'";
        
	       $.get(url2, function(results){       
		    var patt1 = new RegExp("v=([A-Za-z0-9-_]+)&amp;list="+playlist,"g");
		    results = results.match(patt1);
		    videos = [];			 
		    for(i=0;i<results.length;i++){
			 vid = results[i].replace("v=","").replace("&amp;list="+playlist,"");
			 if(videos.join().indexOf(vid)==-1){
			      videos.push(vid);	
	     
			      url3 = "http://www.youtube.com/watch?v="+vid;		     
			      
			      $.ajax({
				   url: url3, 
				   error: function(XMLHttpRequest, textStatus, errorThrown){
					if(XMLHttpRequest.status==404){
					     var patt = new RegExp("v=([A-Za-z0-9-_]+)","gi");
					     results2 = patt.exec(this.url);
					     $("#"+results2[1]).css('background','red');					     
					     $(".red").show();
					}
				   },
				   success: function(results2){	
					results2 = filterData(results2);
					var patt1 = new RegExp("<title>([A-Za-z0-9\ -_\.\,\(\)]+)<\/title>","gi");
					results2 = patt1.exec(results2);
					if(results2){
					     results2 = results2[1].replace("- YouTube","");					     
					     var patt = new RegExp("v=([A-Za-z0-9-_]+)","gi");
					     resultsc = patt.exec(this.url);
					     $("#"+resultsc[1]).html(results2);
					}
				   }
			      });

			      
			      $('fieldset').append("<a href='#' id='"+vid+"' class='download' style='width:400px;background:url(http://offliberty.com/img/wait.gif) -10px -10px;' >"+vid+"</a><br/><br/>");
             
			      //get name or remove
			      
			      var dataString = "track=" + encodeURIComponent("http://www.youtube.com/watch?v="+vid) + "&refext=" + encodeURIComponent("http://offliberty.com/");
			      $.ajax({
				   type: "POST",
				   url: "http://offliberty.com/off.php",
				   data: dataString,
				   timeout: 3600000,
				   success: function (msg) {
					if (msg.indexOf("offliberty_giewu_bernardo_new") != -1) {				     
					     return false;
					} else {				
					}
					
					var trimmed = /http:\/\/k[0-9]+\.offliberty\.com\/([A-Za-z0-9-_]+)\.mp3/.exec(msg);
					if(trimmed){
					     $("#"+trimmed[1]).attr('href',trimmed[0]).css('background','#f6ff00');
					}else{
					     var patt = new RegExp("v=([A-Za-z0-9-_]+)","gi");
					     resd = patt.exec(decodeURIComponent(this.data));
					     $("#"+resd[1]).css('background','pink');		
					     $("#"+resd[1]).css('b','pink');	
					     $(".pink").show();
					}
				   }
			      }); 
			 }
		    }
	       });       
	       
	       $('fieldset').append("<span class='red' style='dispaly:none;'>red - 404 not found </span><br/>");
	       $('fieldset').append("<span class='pink' style='dispaly:none;'>pink - other error(maybe limit?) </span><br/><br/>");
        
	  }else{
        
        
        
	  }
        
       
   
        
     });
        
  
        
  
   
});
