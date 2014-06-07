// ==UserScript==
// @name RomaAS
// @namespace http://www.businesslynch.ru/2013/09/alexa-rank.html
// @version 0.1
// @description AlexaRank.
// ==/UserScript==
<html>
<head>
<title>Alexa compare rank</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
</head>
<body>
Website - URL without "http://"</br>
Period - 2y or 7m or 17d
</br>
</br>

<script type="text/javascript">
$(document).ready(function() {
var alexaCompare = {
url: 'http://traffic.alexa.com/graph?w=400&h=220&o=f&c=1&y=t',
defaultColor: 'f8f9fc',

isValidDomain: function(domain) {
var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
return domain.match(re);
},

isHexCode: function(code) {
//var re = new RegExp(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
var re = new RegExp(/^[0-9A-F]{6}$/i);
return code.match(re);
},

appendWebsite: function() {
$("#website_area").append("<div class=\"website_row\"><label for=\"\">Website: </label><input type=\"text\" name=\"websites[]\" placeholder=\"example.com\"></div>");
},

resetWebsite: function() {
$("#website_from")[0].reset();
$(".website_row:not(:first)").remove();
$("#website_graph").hide();
},

run: function() {
var
url, w = [];

$("input[name=\"websites[]\"]").each(function() {
var website = $(this).val();
if(alexaCompare.isValidDomain(website)) {
w.push(website);
}
});

if(w.length == 0) {
return false;
}

url = this.buildRequestUrl(w);
$("#website_graph").attr("src", url).show();
},

buildRequestUrl: function(website) {
var
s, color = $("#graph_color").val(), period = $("#graph_period").val();

if(!this.isHexCode(color)) {
color = this.defaultColor;
}

s = "&b="+color + "&r=" + period;
for(i = 0; i < website.length; i++) {
s += "&u=" + website[i];
}
return this.url + s;
},

};

$("#website_reset").click(function() { alexaCompare.resetWebsite() });
$("#website_compare").click(function() { alexaCompare.run() });
$("#website_add").click(function() { alexaCompare.appendWebsite() });
});
</script>


<form id="website_from" method="post">
<div id="website_area">
<div class="website_row">
<label for="">Website: </label>
<input name="websites[]" placeholder="example.com" type="text">
</div>
<!-- end of website_row -->

</div>
<!-- end of website_area -->

<label for="graph_color">Color:</label>
<input id="graph_color" maxlength="6" type="text" value="f8f9fc"><br>
<label for="graph_period">Period:</label>
<input id="graph_period" maxlength="6" type="text" value="6m"><br>
<button id="website_add" type="button">Add Website</button>
<button id="website_compare" type="button">Compare</button>
<button id="website_reset" type="button">Reset</button>

</form>

<br/>
<img id="website_graph" style="display: none;">
</body>
</html>