// ==UserScript==
// @name          LUEseries
// @description   LUElinks series for stuff
// @namespace	http://userscripts.org/scripts/review/53687
// @include http://series.endoftheinter.net/main.php*
// @include https://series.endoftheinter.net/main.php*
// ==/UserScript==

// Version 2
// ~Kalphak

document.title = 'End of the Internet - TV Series';

var url = document.URL;

ss = url.split('?');

var sle = ss.length;


if (sle > 1){

cur = ss[1];

function load(purl){
GM_xmlhttpRequest({
    method: 'GET',
    url: purl,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/plain'
    },
    onload: function(responseDetails) {
    arts = responseDetails.responseText;
    var articles = new Array();
    articles = arts.split('\n');
//alert(articles)
    var l = articles.length;
  //  var ts = '<tr><td width="75%" valign="top" style="padding: 2px 5px 0px 0px"><table class="grid"><tr><th width="50%">&nbsp; < Back to series</th><th width="50%"> </th></tr>';
    var ts = '<tr><td width="75%" valign="top" style="padding: 2px 5px 0px 0px"><table class="grid">';
var y = "0";
var c = "";
var my = "0";
var m = "0";

i = 0;
while(l!=i){
    if (articles[i].match("<s>") != null){
            ts += '<th colspan="2">' + articles[i+1] + '</th>';
            i=i+3;
        }else if (articles[i].match("<c>") != null){
            c = ' rowspan="' + articles[i+1] + '" ';
            y = articles[i+1];
            i=i+3;
            ts += '<tr><td>' + articles[i] + '</td><td' + c + '><a href="' + articles[i+1] + '">' + articles[i+2] + '</a></td></tr>';
            i=i+3;
	}else if (articles[i].match("<end>") != null){
	    ts += '<tr><th colspan="2"><a href="http://series.endoftheinter.net/main.php">< Back to series</a></th></tr>';
        i++;
	}else if (articles[i].match("<m>") != null){
            m = ' rowspan="' + articles[i+1] + '" ';
            my = articles[i+1];
            i=i+3;
            ts += '<tr><td' + m + '>' + articles[i] + '</td><td><a href="' + articles[i+1] + '">' + articles[i+2] + '</a></td></tr>';
            i=i+3;
	    
	}else{
            
    		if (articles[i+1].match("---") == null){
			

                    y--;
                    my--;
                    
                    if (y > 0){
                        ts += '<tr><td>' + articles[i] + '</td></tr>';
			i++;
		    }else{
                        
                    if (my > 0){ 
                        ts += '<tr><td><a href="' + articles[i] + '">' + articles[i+1] + '</a></td></tr>';
                        i=i+2;
                    }else{
                        ts += '<tr><td>' + articles[i] + '</td><td><a href="' + articles[i+1] + '">' + articles[i+2] + '</a></td></tr>';
                        i=i+3;                    
		    }
		    }


		}else{
                    
                    ts += '<tr><td>' + articles[i] + '</td><td>Link Missing</td></tr>';
                    i=i+3;  		
                }
	}
}
ts += '</table></td></tr>';
var top = document.getElementsByTagName("table")[0];
top.innerHTML = ts;
	}
});
}

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://luecat.com/eti/lls/ss.txt',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/plain'
    },
    onload: function(responseDetails) {
    var list = responseDetails.responseText;
    sses = list.split('\n');
    sses.sort()
    var sl = sses.length;
    var z = 0;
for (i=0;i<sl;i++){
var a = sses[i].split("|")[0];
var b = sses[i].split("|")[1];
	if (b == cur){
document.getElementsByTagName('h1')[0].innerHTML = a;
load ('http://luecat.com/eti/lls/' + b + '2.txt');
document.title += ' - ' + a;
z = 1;
break;
	}
}
if (z == 0){
window.location.pathname = "main.php";
alert ("Series not found.")
}
}
});
}else{

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://luecat.com/eti/lls/ss.txt',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/plain'
    },
    onload: function(responseDetails) {
    var list = responseDetails.responseText;
    sses = list.split('\n');
    sses.sort()
    var sl = sses.length;
    var ts = '<tr><td width="75%" valign="top" style="padding: 2px 5px 0px 0px"><table class="grid"><tr><th colspan="2">List of TV Series</th></tr>';

for (i=0;i<sl;i++){
var a = sses[i].split("|")[0];
var b = sses[i].split("|")[1];

ts += '<tr><td><center><a href="?' + b + '">' + a + '</a></center></td>';

}
ts += '</table></td></tr>';
var top = document.getElementsByTagName("table")[0];
top.innerHTML = ts;
document.getElementsByTagName('h1')[0].innerHTML = 'TV Series';
}
});
}