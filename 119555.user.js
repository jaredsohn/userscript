// ==UserScript==
// @version	1.0
// @name          Blogger Article Tools(Send Trackbacks,Delicious,Tumblr,Related Articles Search)
// @description   It offers simple but powerful functions to google blogger user. Send Trackbacks, Delicious Link, Tumblr Link and Related Articles Search from Google. (by dorajistyle)
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @license	(CC) BY 3.0 ; http://creativecommons.org/licenses/by/3.0/
// @author	JoongSeob Vito Kim (dorajissanai@nate.com)
// @copyright	JoongSeob Vito Kim (http://userscripts.org/users/dorajistyle)
// @icon	http://i786.photobucket.com/albums/yy144/dorajistyle/Blog/favicon.png
// @namespace	http://userscripts.org/users/119555/scripts
// @source	http://userscripts.org/scripts/show/119555
// @identifier	http://userscripts.org/scripts/source/119555.user.js
// @include htt*://*blogger.com/blogger.g?*#editor/target=post*
// @include htt*://*blogger.com/blogger.g?*#allposts*
// @include htt*://*blogger.com/blogger.g?*
// @grant   GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant   GM_xmlhttpRequest
// ==/UserScript==

saved_hash = window.location.hash;
trackback_manager();
setInterval(observe_hash,1000);


function observe_hash() {
	if(saved_hash != window.location.hash) {
		trackback_manager();
		saved_hash = window.location.hash;
		//GM_log("Hash Changed : "+saved_hash);
	}
}

function trackback_manager(){
	$(function() {			
		var allpost = /#allpost/i.exec(window.location.hash);
		//GM_log("mode hash = "+allpost);
			if(allpost !=null) {
			i=0;			
			isIntervalRunning = setInterval( function(){
			  //GM_log("table length"+i+" : "+$('div.blogg-visible-on-select').length);
			  i++;
			  visible_on_select_div = $('div.blogg-visible-on-select')
			  if(visible_on_select_div.length>0) {
				links=new Array();
				visible_on_select_div.each(function(index){
				  //GM_log("mode each = "+$(this).find('a').length);
			if ($(this).find('a').length > 3) {
					$(this).bind('click',function (e) {
					GM_setValue('articleURL', $(this).find('a').eq(1).prop('href'));
					//GM_log("Finally! "+GM_getValue('articleURL'));
					});
				  }						   
				});		
				clearInterval(isIntervalRunning);
				GM_setValue('loaded', true);
			  }
			}, 500);		
		   }
		   //GM_log("Loaded! "+GM_getValue('loaded') +" value : "+GM_getValue('articleURL'));
		   var trackback_box = $("#trackback_box");
			if(GM_getValue('articleURL')) {
			
										
			var $body = $("#blogger-app");							
			var $optionHolder = $($body.find('div.optionHolder')[0]);	
			var url = GM_getValue('articleURL');
			var title_node = $('input.titleField.textField')[0];			                                     
			var text_node = $('#postingHtmlBox');						
			var trackback_form = "<div id='trackback_box'><div><div class='GMUUXGEDPIB selected'><div class='GMUUXGEDOIB blogg-title'> <a href='javascript:;' kind='click'> <span class='GMUUXGEDMIB'></span><span>Article Tools</span> </a> </div><div class='GMUUXGEDIKB'><span class='GMUUXGEDALB GMUUXGEDNHB'></span>Related Articles<br/><button type='button' id='link_r_article' class='blogg-button'>Get Articles</button><button type='button' id='more_articles' class='blogg-button'>More Articles</button><br/><ul id='r_article'/> </div><div class='GMUUXGEDIKB'><span class='GMUUXGEDALB GMUUXGEDNHB'></span><span>Trackbacks</span> </div><div class='GMUUXGEDIKB'><button type='button' id='send_trackback'  class='blogg-button blogg-primary'>Send</button>&nbsp;<button type='button' id='link_delicious' class='blogg-button'>Delicious</button>&nbsp;<button id='link_tumblr' class='blogg-button' type='button'>Tumblr</button><br/><span class='GMUUXGEDALB GMUUXGEDCIB'></span><span id='trackback_result'/><br/><textarea cols='100'rows='10' wrap='soft' style='width:100%' id='trackback_area'/></div></div> </div></div>";
			if (trackback_box.length > 0) {
				trackback_box.replaceWith(trackback_form);
			} else {
				$optionHolder.append(trackback_form);
			}
			
			var $trackback_area = $('#trackback_area')[0];									
				$('#send_trackback').click(function () {				  
				  var trackback_field = $($trackback_area).prop('value');
				  var title = $body.find(title_node).prop('value');
			      var excerpt = $body.find(text_node).prop('value').replace(/\n*<\/?[^>]+>\n*/gi, '').substring(0,200)+"...";			      			      			      			 				  				  																		
				  alert("Send trackback to : \n"+trackback_field);
				  var trackbacks = trackback_field.split(/\n/);
				  doTrackback(title,excerpt,trackbacks,url);
				});
				
				$('#link_delicious').click(function () {				  				  
				  var title = $body.find(title_node).prop('value');
			      var excerpt = $body.find(text_node).prop('value').replace(/\n*<\/?[^>]+>\n*/gi, '').substring(0,200)+"...";							  				  													      
			      var $tags_node = $($optionHolder.find('div')[7]);			      
			      var tags = $tags_node.text().replace(/\s/gi,'');
			      window.open("http://www.delicious.com/save?v=5&noui&jump=close&url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)+"&notes="+encodeURIComponent(excerpt)+"&tags="+tags,"_delicious");
				});
				
				$('#link_tumblr').click(function () {				  				  
				  var title = $body.find(title_node).prop('value');
			      var excerpt = $body.find(text_node).prop('value').replace(/\n*<\/?[^>]+>\n*/gi, '').substring(0,200)+"...";							  				  													      
			      window.open("http://www.tumblr.com/share/link?url="+encodeURIComponent(url)+"&name="+encodeURIComponent(title)+"&description="+encodeURIComponent(excerpt),"_tumblr");
				});
				
				$('#link_r_article').click(function () {				  				  
				var title = $body.find(title_node).prop('value');
				var left = title.indexOf(']') > -1 ? title.indexOf(']')+1 : 0;
				var right = title.indexOf('(') > -1 ? title.indexOf('(') : title.length;
				title = title.substring(left,right);				
				search_submit(title);
				$(this).hide();
				});												
				
				$('#more_articles').click(function () {	
				var title = $body.find(title_node).prop('value');
				var left = title.indexOf(']') > -1 ? title.indexOf(']')+1 : 0;
				var right = title.indexOf('(') > -1 ? title.indexOf('(') : title.length;
				title = title.substring(left,right);							  				  
				window.open("http://www.google.co.kr/search?num=50&hl=ko&lr=&newwindow=1&tbo=1&as_qdr=all&biw=1291&bih=618&noj=1&tbm=blg&q="+encodeURIComponent(title),"_search");	
				});																
																						
				GM_setValue('loaded', false);
				GM_setValue('articleURL',false);
			}
			else {
				if (trackback_box.length > 0) {
					trackback_box.html('');
				} 				
			}
		
	});
}

function doTrackback(title,excerpt,trackbacks,url) {      
   GM_log("Url :"+url+"\nExcerpt  : "+excerpt+"\ntitle : "+title+"\nTrackback total :"+trackbacks.length);		
   GM_setValue('success',0);
   GM_setValue('failed',0);
   GM_setValue('progress',0);
   GM_setValue('sending_count',0);
   GM_setValue('trackback_count',trackbacks.length);         
   GM_setValue('blogName',unsafeWindow.BloggerClientFlags[56]);      
   if(!trackbacks || !url)
      return;
   //for(i in trackbacks) trackback_submit(trackbacks[i],title,excerpt,url);
   for(i=0,len=trackbacks.length;i<len;i++) {
   //GM_log("trackbacks"+i+" : "+trackbacks[i]);   
   trackback_submit(trackbacks[i],title,excerpt,url);
   }   
}

function trackback_submit(trackback,title,excerpt,url) {
	var tb = trackback;
	header_data = {'User-Agent':'Trackback','Content-Type':'application/x-www-form-urlencoded;charset=utf8;'};
	input_data = 'url='+encodeURIComponent(url)
							   +'&title='+encodeURIComponent(title)
							   +'&blog_name='+encodeURIComponent(GM_getValue('blogName'))
							   +'&excerpt='+encodeURIComponent(excerpt);   
	   
   if(tb.trim().length == 0) {
	   GM_setValue('trackback_count',GM_getValue('trackback_count')-1);
	} else {		
		tb = tb.toLowerCase();
		if(tb.indexOf("http") == -1) tb = "http://"+tb;		
	   GM_setValue('sending_count',GM_getValue('sending_count')+1);
	   GM_setValue('trackback'+GM_getValue('sending_count'),tb);	   
	   window.setTimeout(GM_xmlhttpRequest({'method':'POST',
						 'url':tb,
						 'headers':header_data,
						 'onload':trackback_callback,
						  'data':input_data
						}), 3000);  	   
	}
}

function trackback_callback(data) {
  GM_setValue('progress',GM_getValue('progress')+1);
  var progress = GM_getValue('progress');
  var trackback_count =GM_getValue('trackback_count');
  var trackback_addr = GM_getValue('trackback'+progress);   
     try {		
	  $('#trackback_result').html("Sending...  "+progress+" / "+trackback_count);      
      var xmlDoc = $($.parseXML(data.responseText));      
      var error = parseInt(xmlDoc.find("error").text());                  
       switch(error) {
            case 0: 
            GM_log("Trackback Success("+trackback_addr+")");		    
			GM_setValue('success',GM_getValue('success')+1);   
            break;            
            default:
             var error_message = xmlDoc.find('message').text();
			 GM_log("Trackback Faild ("+trackback_addr+") : "+error_message);
			 GM_setValue('failed',GM_getValue('failed')+1);         
       }  
   } catch(e) {
      GM_log("Send Trackback Error : "+e);		    
      GM_setValue('failed',GM_getValue('failed')+1);               
   }
    $('#trackback_result').html("Total : <b>"+trackback_count+"</b> (<span style='color:blue'>Success : <b>"+GM_getValue('success')+"</b></span> , <span style='color:red'> Failed : <b>"+GM_getValue('failed')+"</b></span>)");   
}



function search_submit(title) {   

	var query= encodeURIComponent(title);		
	var surl = 'http://www.google.co.kr/search?num=10&newwindow=1&tbo=1&as_qdr=all&aq=f&aqi=&aql=&oq=&gs_rfai=&ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&tbm=blg&q='+query;
	$("#r_article").replaceWith("<ul id='r_article'><li><b>Now Loading...</b></li></ul>");
	
	GM_xmlhttpRequest({'method':'GET',
											 'url':surl,						
							 'onload':search_callback						  
							});						
}



function search_callback(data) {   
	//var parser = new DOMParser();
    //var xmlDoc = parser.parseFromString(data.responseText, "application/xml");
    //var xmlDoc = $($.parseXML(data.responseText));      
    //$xml = $( xmlDoc );
    
    var ol = $("#rso",data.responseText);
    var results = ol.find("div.vsc");
    //href =ol.find("a.l");
    //text = ol.find("span.st");
    var links = "<ul id='r_article'>";			     
    var href="";
    var text="";
    var h3="";
    var ra = [];
    var $v;
    var aho = "<a target='_ra' href='";
    var ato = "'>";
    var ac = "'</a>";
    for(i=0,len=results.length;i<len;i++) {
    $v = $(results[i]);
    h3 = $($v.find("a.l")[0]).text();
    href =$v.find("a.l")[0];    
	text_node = $v.find("div.st")[0];	
    if(text_node !== undefined) text = $(text_node).text();    
		links+="<li><b>";    
		links+=aho;
		links+=href;
		links+=ato;
		links+=h3;
		links+=ac;				
		links+="</b>";
		links+=text;
		links+="</li>";
		ra.push(h3);
    }
    links+="</ul>";
    $("#r_article").replaceWith(links);
        
}