// ==UserScript==
// @name           infobox availability
// @namespace      
// @description    get availability in box
// @include        http://www.indianrail.gov.in/*
// ==/UserScript==

      var url = "http://www.indianrail.gov.in/acc_avl.html";
  
       

       

       
  
      // Created by avg, modified by JoeSimmons
  
      function create(a,b,c) {
  
              var ret=document.createElement(a.toLowerCase());
   
              if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
  
                      else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
 
                      else ret[prop]=b[prop];

              if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);

              return ret;

      }

       
 
      <!-- Codes by Quackit.com -->
<script type="text/JavaScript">
<!--
function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}
//   -->
</script>
<p>
<a href="javascript:timedRefresh(2000)">Refresh this page in 2 seconds</a> |
<a href="javascript:timedRefresh(5000)">Refresh this page in 5 seconds</a>
</p>
</div>

      }
 
       

      document.body.appendChild(create("div", {id:"frame_holder"}, new Array(
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 1
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 2
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 3
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 4
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 5
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 6
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 7
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}), // 8
      create("iframe", {src:url, style:"width:90%; height:400px;", onload:reload}) // 9
      )));