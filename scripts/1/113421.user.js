// ==UserScript==
// @name           Ebay dispute calculator
// @namespace      ryotsuke
// @description
// @include        http://my.ebay.co.uk/*    
// @include        http://my.ebay.com/*    
// ==/UserScript==

function getElementsByClassName(classname_, node, tagName)  {
    var tagName=(typeof(tagName) === 'undefined')?"*":tagName;
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var classes = classname_.split(','); 
    
    for(cid in classes) {
    var classname = classes[cid];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName(tagName);
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    }
        
    return a;
}
function leadingZero(str) {
	if((""+str).length<2) return "0"+str;
	return (""+str);
}
function formatDate(day, month, year) {
	return leadingZero(day)+"."+leadingZero(month)+"."+year;
		
}

function run() {
    
    var spans = getElementsByClassName("g-vxsB,g-v33", null, "span");
    
    for(var i = 0; i < spans.length; i++) {
       var span = spans[i];       
       if(span.innerHTML.indexOf("Sale date")>=0) {
          var div = span.parentNode;
          var date = div.childNodes[1];
          var dt = date.innerHTML.split('/');          

          var dateFrom = new Date(2000+parseInt(dt[2], 10), parseInt(dt[1], 10)-1, parseInt(dt[0], 10), 0,0,0,0);
          var dateContactSeller = new Date(2000+parseInt(dt[2], 10), parseInt(dt[1], 10)-1, parseInt(dt[0], 10), 0,0,0,0);
          var dateOpenDispute = new Date(2000+parseInt(dt[2], 10), parseInt(dt[1], 10)-1, parseInt(dt[0], 10), 0,0,0,0);
          var dateCriticalDispute = new Date(2000+parseInt(dt[2], 10), parseInt(dt[1], 10)-1, parseInt(dt[0], 10), 0,0,0,0);          
	  if(window.location.href.indexOf("my.ebay.com")>=0) {
	          dateFrom = new Date(2000+parseInt(dt[2], 10), parseInt(dt[0], 10)-1, parseInt(dt[1], 10), 0,0,0,0);
        	  dateContactSeller = new Date(2000+parseInt(dt[2], 10), parseInt(dt[0], 10)-1, parseInt(dt[1], 10), 0,0,0,0);
	          dateOpenDispute = new Date(2000+parseInt(dt[2], 10), parseInt(dt[0], 10)-1, parseInt(dt[1], 10), 0,0,0,0);
        	  dateCriticalDispute = new Date(2000+parseInt(dt[2], 10), parseInt(dt[0], 10)-1, parseInt(dt[1], 10), 0,0,0,0);          			
	  }
         
          dateContactSeller.setDate(dateContactSeller.getDate()+30); 
          dateOpenDispute.setDate(dateOpenDispute.getDate()+43);  
          dateCriticalDispute.setDate(dateCriticalDispute.getDate()+45);
           
          var str = "<br><span class='g-vxsB'>Sale date:</span> <span class='g-vxs'>"+formatDate(dateFrom.getDate(), (dateFrom.getMonth()+1) , dateFrom.getFullYear())+"</span>"; 
          str+= "<br><span class='g-vxsB'>Contact seller:</span> <span class='g-vxs'>"+formatDate(dateContactSeller.getDate(),(dateContactSeller.getMonth()+1),dateContactSeller.getFullYear())+"</span>";
          str+= "<br><span class='g-vxsB'>Open dispute:</span> <span class='g-vxs'>"+formatDate(dateOpenDispute.getDate(),(dateOpenDispute.getMonth()+1),dateOpenDispute.getFullYear())+"</span>";
          str+= "<br><span class='g-vxsB' style='color: red;'>Last day:</span> <span class='g-vxs'>"+formatDate(dateCriticalDispute.getDate(),(dateCriticalDispute.getMonth()+1),dateCriticalDispute.getFullYear())+"</span>";
          str+= "<br><span><br></span>";
          
          if(div.className.indexOf('in')<0) {
              div.className = div.className + " in";
              div.innerHTML = str; 
          }    
       }
    }
}

setTimeout('run()', 1000); /* Ugly hack for ajax :) */
