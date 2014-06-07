// Livejournal Location of Anonymous Commenter
// Gavri Fernandez (gavri dot fernandez at gmail dot com)
// Homepage: http://ga-woo.livejournal.com/
//
// ------------x--------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	Livejournal Location of Anonymous Commenter
// @description		Livejournal Location of Anonymous Commenter
// @include      	http://*.livejournal.com/*.html*
// @namespace       	http://ga-woo.livejournal.com/
// ==UserScript==


var body = document.getElementsByTagName('body')[0];
body.innerHTML = body.innerHTML.replace(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\)/g, "$1)<span class='ipinfo'>$1</span>");
var spans = document.getElementsByTagName('span');
for(var i = 0; i < spans.length; i++) {
  if(spans[i].className == 'ipinfo') {
    var span = spans[i];
    var ip = spans[i].innerHTML;
    var url = 'http://api.hostip.info/get_html.php?ip=' + ip;
    GM_xmlhttpRequest({
          span:span,
          method: 'GET',
		    url: url,
		    onload: function(resp) {
		      var answer = resp.responseText;
		      var lines = answer.split("\n");
		      var city = lines[1].split(":")[1];
		      var country = lines[0].split(":")[1];
		      var output = city + "," + country;
		      output = output.replace(/\(..\)/, "");
		      this.span.innerHTML = output;
		    }
		    }
		      );
  }
}
