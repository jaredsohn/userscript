// ==UserScript==
// @name          tagthe.net-del.icio.us
// @namespace     http://www.knallgrau.at
// @description   Integrates TagThe.net into delicious
// @include       http://del.icio.us/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {

   function processRSSURL(rssURL) {
      var msg = "?url="+encodeURI(rssURL);

      GM_xmlhttpRequest( {
            method: 'GET',
               url: 'http://tagthe.net/api/' + msg,
               headers: {
               'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                  'Accept': 'application/atom+xml,application/xml,text/xml',
                  'Content-type':'application/x-www-form-urlencoded',
						'Accept-Charset': 'UTF-8'
                  },
               onload: processMeme
               } );
   }

   function getDimensions(xmlDoc) {
      var result = {};

      var dims = xmlDoc.getElementsByTagName("dim");

      var dimCount = dims.length;

      for(var i = 0; i < dimCount; i++) {
         var type = dims[i].getAttribute("type");
         
         if(!result[type])
            result[type] = [];

         var items = dims[i].getElementsByTagName("item");
         var itemCount = items.length;

         // loop through all item:
         for(var j = 0; j < itemCount; j++) {
            result[type].push(items[j].textContent);
         }
      }
      
      return result;
   }

   /**
    * Gets the response, creates the infobox and injects it into the current page
    */
   function processMeme(responseDetails) {
      resultXML = responseDetails.responseText;
      try {
         var parser;
         
         if(typeof(XPCNativeWrapper) == "function") {
	        var dp = new XPCNativeWrapper(window, "DOMParser()");
            parser = new dp.DOMParser();
         } else {
            parser = new DOMParser();
         }
         
         var xmlDoc = parser.parseFromString(resultXML, "application/xml");

         // extract dimensions and keywords
         var dimensions = getDimensions(xmlDoc);

         var infoBox = createHTML(dimensions);

         //var container = document.getElementById("rectags");
         var container = document.getElementById("memanageWait");
         
         //document.body.insertBefore(infoBox, document.body.lastChild);
         container.innerHTML = infoBox.innerHTML;
      } catch(e) {
         GM_log(e);
      }
   }
   
   function createHTML(dims) {
      var div = document.createElement("div");

      var topics = ["topic", "person", "metatopic", "location"];
      // add class = "bundle fold" id="memanage" as attributes
      for(var topic in topics) {
         try {
            var dimension = topics[topic];
            var tags = dims[ dimension ];
            if(tags) {
               var tagCount = tags.length;
               var a=[];
               for(var j = 0; j < tagCount; j++) {
                  var stripedTag = tags[j].replace(/\s+/g, "").toLowerCase();
            
                  a.push("<a  href='javascript:swap(\"");
                  a.push(stripedTag);
                  a.push("\")' class=\"tag\">");
                  a.push(stripedTag);
                  a.push("</a> ");
               }

               div.innerHTML = div.innerHTML + "<b>" + dimension + ": </b>" + a.join("") + "<br/>";
            }
         } catch(e) {
            // ignore - maybe the topic isnt available
         }
      }
      
      return div;
   }

   ////////////////////////[ Main Program ]////////////////////////

   if(document.location.href.match(/^http:\/\/del\.icio\.us\/[^\/\?]*\?.*url=.*$/)) {
      try {
         // url to be stored
         var rssURL = document.getElementsByName("oldurl")[0].value;
   
			//var container = document.getElementById("rectags");
         var container = document.getElementsByTagName("ul")[0];
			
			var li = document.createElement("li");
	      var cls = document.createAttribute("class");
	      cls.nodeValue = "bundle fold";
	      var sty = document.createAttribute("style");
	      sty.nodeValue = "display:block;";
	      var id = document.createAttribute("id");
	      id.nodeValue = "memanage";

	      li.setAttributeNode(cls);
	      li.setAttributeNode(sty);
	      li.setAttributeNode(id);

	      li.innerHTML = "<div style=\"cursor: pointer\" class=\"label arrow\"><span><a href=\"http://tagthe.net\">tagthe.net</a> suggestions</span></div><div id=\"memanageWait\">Connecting to tagthe.net and retrieving tags, please be patient...</div> ";

         container.insertBefore(li, container.firstChild);

         GM_log("Sending server requests for " + rssURL, 0);
         processRSSURL(rssURL); // asynchronous call
         // Execution is deferred to the onload event
      } catch(e) {
         GM_log(e);
      }
   }
})();