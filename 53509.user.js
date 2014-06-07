// Inline UserInfo (HexSex Style)
// version 1.4.3
// Copyright (c) 2008-2009, mcm69, tender, inga
// Released under the GPL license
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Inline UserInfo (HexSex Style)
// @namespace     http://leprosorium.ru/*
// @description   Show additional user info for leprosorium.ru.
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==

// all patch by //tender

function onLoad()
{
	var div_obj = null;
	var c_link = null;
	var hid = 0;
	var tid = 0;
	var div_html = "";
	var inRun = 0;

	// create a hidden div
	div_obj = document.createElement("div");
	div_obj.id = "hoverinfo";
	div_obj.style.display="none";
	div_obj.style.position="absolute";
	div_obj.style.border="1px solid #aaa";
	div_obj.style.minWidth="200px";
	div_obj.style.minHeight="100px";
	div_obj.style.zIndex="99";
	div_obj.style.color="#999";
	div_obj.style.fontSize="10px";
	div_obj.style.padding="10px 10px 50px 10px";
	div_obj.style.whiteSpace="nowrap";
	div_obj.addEventListener("mouseover", hoverDiv, false);
	div_obj.addEventListener("mouseout", hideDiv, false);
	//div_obj.style.background = "black url(http://www.picamatic.com/show/2008/10/14/02/54/1181194_16x16.gif) center center no-repeat";
	div_obj.style.background = "url('http://www.picamatic.com/show/2008/10/14/02/54/1181194_16x16.gif')";
	document.body.appendChild(div_obj);
     
	var dt = document.createElement('div');
	document.body.insertBefore(dt, document.body.firstChild);     
     
    
	for (i=0;i<document.links.length;i++)
	{
		var a=document.links[i].getAttribute("href")
		var u = a.match(/\/users\/(.+)/); //
	
		if (u)
		{
			var l = document.links[i];
			
			l.setAttribute("usernum", u[1]);
			l.addEventListener('mouseover', mouseOver, false);
			l.addEventListener('mouseout', mouseOut, false);
		}
       
	}
      
	
	
	
	function mouseOver(e)
	{
		e = e || window.event

		if (e.pageX == null && e.clientX != null ) 
		{ 
			var html = document.documentElement
			var body = document.body

			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
		}


		div_obj.style.left = e.pageX  + 'px';
		div_obj.style.top = e.pageY + 'px';

		clearInterval(hid);
		tid = setInterval(hoverInfo, 1500);
		c_link = this;
	}
	
	
	
	
	
      
	function mouseOut(e) 
	{
		clearInterval(tid);
		hid = setInterval(hideDiv, 500);
	}
      


	function hoverDiv() 
	{
		clearInterval(hid);
	}


	
	function hideDiv(e) 
	{
		if (e == null) return;		
        	
		var t = e.relatedTarget;
		if(t && (	t.id == "inline_userlink" || 
					t.id == "hoverinfo" || 
					t.id == "user_pic" || 
					t.id == "user_pic_link" ||
					t.id == "user_post"||
					t.id == "user_comm" ||
					t.id == "tbl" ||
					t.id == "tbl_tr" ||
					t.id == "td_text_head" ||
					t.id == "inga"
    		  )) 
		{
			return;
        }
        
		div_obj.style.display="none";
		clearInterval(hid);
	}

	
//	alert(typeof(GM_xmlhttpRequest));
	
	function GM_xmlhttpRequest_Opera(options) {
	
	  var request = new XMLHttpRequest(), validEvents = { onload: null, onerror: null, onreadystatechange: null };
	  
	  function addXMLHttpRequestListener(request, eventName, callback) {
		request[eventName] = function(event) {
		  var responseDetails = {
			responseText: request.responseText
			,readyState: request.readyState
			,responseHeaders: (request.readyState == 4 ? request.getAllResponseHeaders() : '')
			,status: request.readyState == 4 ? request.status : 0
			,statusText: request.readyState == 4 ? request.statusText : ''
		  };
		  callback.call(null, responseDetails);
		}
	  }

	  // add event listeners
	  for (var eventName in validEvents) {
		if (options[eventName])
		  addXMLHttpRequestListener(request, eventName, options[eventName]);
	  }

	  // open the connection
	  request.open(options.method, options.url, true);

	  // set the headers
	  for (var header in options.headers) {
		request.setRequestHeader(header, options.headers[header]);
	  }
	  
	  // send the data
	  request.send(options.data);
	  return request;
	}


      // simplified version
    function resourceText(url, callback, callbackerror, postfields)
    {
		var options = {
          'url':url,
          'method':( !postfields ? 'get' : 'post' ),
          'headers':{
          'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20080404'
          },
          'onload':function(e)
          {
            //alert(e.status);
            if (e.status == 200) {
              callback(e.responseText) 
            } else {
              callbackerror(e.responseText);
            } 
          },
          'onerror':function(e)
          {
            callback(e.responseText);
          }
        };
  					
        if (!postfields)
        {
          var postdata = '';
          for ( n in postfields )
          {
            postdata += '&' + n + '=' + encodeURIComponent(postfields[n]);
          }
          data = postdata.substr(1);
      
          options.headers["Content-type"] = "application/x-www-form-urlencoded";
          options.headers["Content-length"] = postdata.length;
          options.data = postdata;
        }
	
	   try
	   {
			if (window.opera)
			{
				GM_xmlhttpRequest_Opera(options);
			} else	
		   {
				GM_xmlhttpRequest(options);
		   }
	   }
	   catch (e) 
	   {
	    alert(e);
	   }
    }
		
      
	function parse_APIUserInfo(user, response)
	{
		var eblozor = "http://faces.leprosorium.com/image.php?cat=&image=";
		var eblozor_full = "http://faces.leprosorium.com/full.php?cat=&img=";
        
		div_html +="<td id=inga style=\"text-align: right;\">";
       
		var s0 = '';
       
		s0 += '<a id=\"user_pic_link\" href=\"'+eblozor_full+user+'.jpg'+'\" target=\"_new\">';
		s0 += '<img style=\"border: 1px solid #aaa; padding: 5px;\" id=\"user_pic\" src=\"'+eblozor+user+'.jpg\" alt=\"">';
		s0 += ' <\/a>';
       
		div_html +=s0;
		div_html +="</td></table>";
			
		div_html += "<div id=inga style=\"font-size: 11px;\">Здесь с "+response.regdate+", ";
		div_html += "пригласил <a id=user_post target=\"_new\" href=\"http://leprosorium.ru/users/"+response.invited_by+"\">"+response.invited_by+"</a>.<br />";
      
		var link_comm = "http://leprosorium.ru/users/"+user+"/comments/";
		var link_post = "http://leprosorium.ru/users/"+user+"/posts/";

		div_html +=	'Посты и комментарии: <b id=inga>'+response.posts+'</b>/<b id=inga>'+response.comments+'</b>.<br>';
			
			
		div_html +=	"<div id=inga style=\"font-size: 11px;\">Карма/рейтинг: <b id=inga>"+response.karma+"</b>/<b id=inga>"+response.rating+"</b>, c голосом <b id=inga>"+response.voteweight+"</b>.<br>";

		div_html +="Насрал/насрано: <b id=inga>"+response.karmavote+"</b>/";
		div_html +="<b id=inga>"+response.hiskarmavote+"</b><br>";

		div_obj.style.background = "white url('http://pit.dirty.ru/lepro/408/design/20593-20090426-171808-fe325365ba79417ac36dce49265d787e.gif') bottom repeat-x";
		div_obj.innerHTML = div_html;
	}
      

	
	
	
	function get_LepraAPI_UserInfo(usernum, user)
	{
       resourceText("http://leprosorium.ru/api/lepropanel/"+usernum,
        function(result)
        {
            var response = eval("(" + result + ")");
            parse_APIUserInfo(user, response);
        },
        function(result)
        {
          div_obj.innerHTML = "Балет!";
        }
        );
		return; 
	}
      

	
	
	
	function parse_BaseInfo(html, user)
	{
		var m;
      
		//реальное имя, город
		m = html.match(/<div class=\"userbasicinfo\">\s*<h3>(.+)\s*<\/h3>\s*<div class=\"userego\">\s*(.+)\s*<\/div>/);
      
		var extinfo = "";
		
		if (m) 
		{
			if (m[1])
				extinfo+=m[1];
				extinfo+=",<br/>";
			if (m[2])
				extinfo+=m[2];
		}

		// лепрономер
		var uid = 0;

		m = html.match(/<div class=\"vote\"\s*uid=\"(.+)\">/);

		if (m) 
		{
			uid = m[1];
		}
      
		// жопка для юзера
		var ugopka = "Жопок нет";
		m = html.match(/<div class=\"usernote_inner\"\s*id=\"js-usernote_inner\">(.+)<\/div>/);
		if (m)
		{
			ugopka = m[1];
		}

		div_html +="<table id=tbl style=\"padding: 0; width: 100%; margin: 0 0 5px 0; \"><tr id=tbl_tr><td id=td_text_head>";
		div_html += "<p id=inga style=\"background-color: red; padding: 5px 0 5px 35px; background: url(http://leprastuff.ru/data/img/20090711/9f4634efeeaf3e55e5ac6a8d634f98d6.gif) left top no-repeat;\">";
		div_html += "<strong id=inga style=\"font-size: 18px; font-family: Verdana, Tahoma, sans-serif; letter-spacing: -1px; color: #aaa; \">";
		div_html += "<a id=\"inline_userlink\" title=\""+ugopka+"\" href=\"http://leprosorium.ru/users/"+user+"\" target=\"_new\">"+user+"</a> ";
		div_html += "<sup id=inga style=\"font-size: 10px; font-weight: normal;\">( "+uid+" ) &nbsp;</sup></strong></p>";
       
		div_html += "<div id=inga style=\"font-family: Verdana, Tahoma, Arial, sans-serif; padding: 2px 5px 2px 14px; color: #aaa; font-size: 12px; background-image: url(http://img.dirty.ru/lepro/post-icon.gif); background-position: left 5px; background-repeat: no-repeat;\"><b id=inga>"+extinfo+".</b></div><br>";
		div_html +="</td>";
		return uid; 
	}


	
	
	function get_UserInfo(user)
	{
       resourceText("http://leprosorium.ru/users/"+user,
        function(result)
        {
           var response = result;
           var uid = parse_BaseInfo(response, user);
           get_LepraAPI_UserInfo(uid, user);
        },
        function(result)
        {
          div_obj.innerHTML = "Балет!";
        }        
        );
		return;
	}

      function get_Eblo(user){
       resourceText("http://faces.leprosorium.com/image.php?cat=&image="+user,
        function(result)
        {
          alert(result);
          get_UserInfo(user);
        },
        function(result)
        {
          get_UserInfo(user);
        }        
       );
      }
    
	
	function hoverInfo() 
	{
		clearInterval(tid);
       
		div_html="";
		var login = c_link.getAttribute("usernum");
		div_obj.innerHTML = "...";
		div_obj.style.display= "block";
		div_obj.style.background = "#fff url(http://www.picamatic.com/show/2008/10/14/02/54/1181194_16x16.gif) center center no-repeat";
      
		// получим всю нужную информацию из профайла....
    //get_Eblo(login);
		get_UserInfo(login);
	}
}


(function() {
   window.addEventListener("load", function(e) {
     onLoad();
   }, false);
})();
