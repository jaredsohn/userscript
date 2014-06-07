// ==UserScript==
// @name           Google Code Starred Projects + 
// @namespace      Umakanthan Chandran ( cumakt@gmail.com)
// @description    Manage your starred projects at profile's page
// @include        http://code.google.com/u/*
// @include 	   http://code.google.com/hosting/search?q=*	
// ==/UserScript==

	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };
	String.prototype.stripHTML = function () { return this.replace(/(<([^>]+)>)/ig,""); };
	var headTag = document.getElementsByTagName('head')[0].getElementsByTagName('script');
	codesite_token = headTag[0].innerHTML.split("=")[1].replace(/\"/g,'').replace(";","").toString().trim();	
	var urlImageOn = "http://www.gstatic.com/codesite/ph/images/star_on.gif";
	var urlImageOff = "http://www.gstatic.com/codesite/ph/images/star_off.gif";
	if(codesite_token != 'null' && !$('serp')) {
		userArray = location.href.split('com/u')
		user = userArray[1].replace('/','');		
		var classN = document.getElementsByClassName('rowmajor');
		child = classN[1].childNodes;
		star_links = child[1].getElementsByTagName('a');	
		for(i=0;i < star_links.length; i++) {
			var img = document.createElement('img');
			img.style.height = '15px';
			img.style.width = '15px';
			img.style.cursor = 'pointer';
			img.src = urlImageOn;
			img.addEventListener('click',function(){ CS_toggleStar(this, {'scope': 'projects',  'user': '_CURRENT_USER',  'item': this.nextSibling.innerHTML,  'token': codesite_token },  'star_msg',  'Starred (\x3ca href\x3d\x22/u/'+ user +'/\x22\x3eview starred projects\x3c/a\x3e)',  'Star this project'); },false);
			star_links[i].addEventListener('mouseover',function() { getProjectDetails(this); }, false);
			parent = star_links[i].parentNode;
			parent.insertBefore(img,star_links[i]);	
		}		
	}
	 if(codesite_token != 'null' && $('serp')){
	 	if($('gaia')) {
	 		gaia_user = $('gaia').innerHTML.stripHTML().trim().split('|')[0].split('@')[0];	
	 		user = gaia_user;
	 		//user = gaia[0].stripHTML();
	 		//GM_log(user);
		}
	 	className = $('serp').getElementsByClassName('name');
	 	for(i=0;i<className.length;i++){
	 		var img = document.createElement('img');
			img.style.height = '15px';
			img.style.width = '15px';
			img.src = urlImageOff;
			img.style.cursor = 'pointer';
			img.addEventListener('click',function(){
				item = this.parentNode.innerHTML.match(/href=\"\/p\/(.*?)\/\">/)[1]								
				CS_toggleStar(this, {'scope': 'projects',  'user': '_CURRENT_USER',  'item': item,  'token': codesite_token },  'star_msg',  'Starred (\x3ca href\x3d\x22/u/'+ user +'/\x22\x3eview starred projects\x3c/a\x3e)',  'Star this project');
			},false);
			 className[i].appendChild(img);
		}
	 }	
//pattern = /<div id="psum">(.*?)<\/div>/;
pattern = /<a id=\"project_summary_link\" (.*?)<\/a>/;

function getProjectDetails(thisPtr){
	//thisPtr.title = "Loading..."
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: thisPtr.href,
    		headers: {
        		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml',
    		},
    		onload: function(responseDetails) {    			    
    				resText = responseDetails.responseText.toString();    				    				
    				thisPtr.title = resText.match(pattern)[0].stripHTML();  
    			}
		});
	
}

//Original code by Google (COPYRIGHTED (c)Google)
var XH_ieProgId_;XH_XmlHttpInit_();function CS_toggleStar(el$703,args$704,star_msg_id$705,star_on_msg$706,star_off_msg$707){var starred$708=el$703.src.indexOf("star_off.gif")!=-1?1:0;el$703.src=starred$708?"http://www.gstatic.com/codesite/ph/images/star_on.gif":"http://www.gstatic.com/codesite/ph/images/star_off.gif";var star_msg_el$709=document.getElementById(star_msg_id$705);if(star_msg_el$709)star_msg_el$709.innerHTML=starred$708?star_on_msg$706:star_off_msg$707;CS_star={on_msg:star_on_msg$706,off_msg:star_off_msg$707,img_el:el$703,
msg_el:star_msg_el$709};args$704.starred=starred$708;CS_setStar(args$704)}function CS_setStar(args$710){CS_starXmlHttp=XH_ieProgId_?new ActiveXObject(XH_ieProgId_):new XMLHttpRequest;var setStarURL$711="/hosting/stars.do",data$712="";for(var i$713 in args$710)data$712+=i$713+"="+encodeURIComponent(args$710[i$713])+"&";XH_XmlHttpPOST(CS_starXmlHttp,setStarURL$711,data$712,CS_setStarCallback)}
function XH_XmlHttpInit_(){var XH_ACTIVE_X_IDENTS$581=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];if(typeof XMLHttpRequest=="undefined"&&typeof ActiveXObject!="undefined"){var i$582=0;for(;i$582<XH_ACTIVE_X_IDENTS$581.length;i$582++){var candidate$583=XH_ACTIVE_X_IDENTS$581[i$582];try{new ActiveXObject(candidate$583);XH_ieProgId_=candidate$583;break}catch(e$584){}}if(!XH_ieProgId_)throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed.");}}
function XH_XmlHttpPOST(xmlHttp$588,url$589,data$590,handler$591){xmlHttp$588.open("POST",url$589,true);xmlHttp$588.onreadystatechange=handler$591;xmlHttp$588.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xmlHttp$588.setRequestHeader("Content-Length",data$590.length);XH_XmlHttpSend(xmlHttp$588,data$590)}
function CS_setStarCallback(){CS_starXmlHttp.readyState==4&&CS_starXmlHttp.status==200&&CS_gotSetStar(CS_starXmlHttp.responseText)}
function XH_XmlHttpSend(xmlHttp$599,data$600){try{xmlHttp$599.send(data$600)}catch(e$601){log("XMLHttpSend failed "+e$601.toString()+"<br>"+e$601.stack);throw e$601;}};
function CS_gotSetStar(responseText$714){try{var args$716=eval("_d="+responseText$714),starred$717=args$716.starred;CS_star.img_el.src=starred$717?"http://www.gstatic.com/codesite/ph/images/star_on.gif":"http://www.gstatic.com/codesite/ph/images/star_off.gif";if(CS_star.msg_el)CS_star.msg_el.innerHTML=starred$717?CS_star.on_msg:CS_star.off_msg}catch(e$720){return null}};

function $(id) {
	return document.getElementById(id);	
}
