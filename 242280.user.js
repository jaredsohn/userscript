// ==UserScript==
// @name        Guardian portal finder
// @namespace   com.resistance.superior
// @include     http://www.ingress.com/intel
// @version     1
// @grant       none
// ==/UserScript==

XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;

var myOpen = function(method, url, async, user, password) {
    //do whatever mucking around you want here, e.g.
    //changing the onload callback to your own version
	this.addEventListener("readystatechange", function(event) {  
   
    if(this.readyState == 4){
       var self = this;
       var response = {
         method: method,
         url: url,
         responseText: self.responseText
      };
      //console.log(response.method);  
	  var obj = jQuery.parseJSON( response.responseText );
        try {
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var time = new Date();
            var datePortal = obj.captured.capturedTime;
            var diffDays = Math.round(Math.abs((datePortal - time.getTime())/(oneDay)));
            
            console.log(obj.captured.capturingPlayerId + " has this portal " + diffDays + " day(s)");
            if(diffDays > 40)
            {
            	alert(obj.captured.capturingPlayerId + " has this portal " + diffDays + " day(s)");
                //var lat = obj.locationE6.lngE6.substr(0, 3) + "." + obj.locationE6.lngE6.substr(3);
                //var lng = insertAt(obj.locationE6.lngE6, 2, ".");;
                var lng = obj.locationE6.lngE6.toString();
                var lngResult = lng.substr(0, 1) + "." + lng.substr(1);
                var lat = obj.locationE6.latE6.toString();
                var latResult = lat.substr(0, 2) + "." + lat.substr(2);
                
                //alert("test" + output);
                var url = "http://www.ingress.com/intel?ll="+latResult+","+lngResult+"&z=17";
                console.log(url);
                window.history.pushState("string", "Title", url);
            }
        } catch(err) {}
    }
  }, false);
    //call original
    this.realOpen (method, url, async, user, password);
}  


//ensure all XMLHttpRequests use our custom open method
XMLHttpRequest.prototype.open = myOpen ;