// ==UserScript==
// @name       Context Search for Kibana
// @namespace  https://vitalconnect.com/
// @version    0.1
// @description Useful. Userful. Useful.
// @match      https://*.vitalconnect.com/
// @include     /^https?://[^/]*\.vitalconnect\.com/.*$/
// @include     https://*.vitalconnect.com/*
// @copyright  2012+, Kesava Mallela
// ==/UserScript==

function main() {
  $(document).click(function() {
    var logrows_details = document.getElementsByClassName("logdetails");
    for(var i=0;i < logrows_details.length; i++) {
      console.log(this);
      var table = logrows_details[i];
      console.log(table);
      if (table != undefined) {
        var sessionid = table.getElementsByClassName("ATSYMfields.session_row")[0].lastElementChild.innerText;
        if (sessionid != undefined) {
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          var expdiv = document.createElement('div');
          var expdivtxt = document.createTextNode("Expand by 5 mins");
          var timestamp = new Date(table.getElementsByClassName("ATSYMtimestamp_row")[0].lastElementChild.innerText);
          var from = new Date(timestamp.getTime() - 300000);
          var to = new Date(timestamp.getTime() + 300000);

          if (to.getTime() > new Date().getTime()) {
            to = new Date();
          }

          expdiv.onclick = function(){
            window.hashjson.search = ' @fields.session:"' +  sessionid + '"';
            window.hashjson.timeframe = "custom";
            window.hashjson.time.from = from.format("yyyy-mm-ddTHH:MM:ss").replace('P', 'T') + "-07:00";
            window.hashjson.time.to = to.format("yyyy-mm-ddTHH:MM:ss").replace('P', 'T') + "-07:00";
            window.hashjson.time.user_interval = "0";
            window.hashjson.stamp = new Date().getTime();
            console.log(window.hashjson);
            dummy = window.hashjson;
            setHash(window.hashjson);
          }
            
          expdiv.appendChild(expdivtxt);
          td.appendChild(expdiv);
          tr.appendChild(td);
          table.appendChild(tr);
        } // End of session id
      } // end of table
    }
  });
};

var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);