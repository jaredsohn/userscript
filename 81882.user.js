// ==UserScript==
// @name           WBB search imdb
// @namespace      Yawn.
// @include        http://www.warez-bb.org/search.php
// ==/UserScript==

var ischecked = false;

function popimdb()
{
	var keywords = document.getElementById("imdbtext").value;
	GM_xmlhttpRequest({
  		method:"GET",
  		url:"http://www.google.co.uk/search?hl=en&q=imdb " + keywords,
  		headers:{
    			"User-Agent":"monkeyagent"
    		},
  		onload:function(details) {
    			//Search Results</h2><div><ol><!--m--><li class=g><h3 class=r><a href="http://www.imdb.com/title/tt0118480/
    			res = details.responseText;
    			var regex = /http:\/\/www\.imdb\.com\/title\/tt[0-9]+\//i;
    			var imdb = res.match(regex);
    			document.getElementById("search_keywords").setAttribute("value", imdb);
  		}
	});
}

function setup()
{
	if(ischecked == true)
	{
		ischecked = false;
		var box = document.getElementById("search_keywords");
		box.parentNode.removeChild(document.getElementById("imdbtext"));
		box.parentNode.removeChild(document.getElementById("imdbbr"));
		box.parentNode.removeChild(document.getElementById("klbl"));
		box.parentNode.removeChild(document.getElementById("imdblbl"));
		var options = document.getElementsByTagName("option");
              	for(i=0;i<options.length;i++)
              	{
              		if(options[i].getAttribute("value") == "-1" || options[i].getAttribute("value") == "24" || options[i].getAttribute("value") == "58")
              		{
              			options[i].selected = false;
              		}
              		else
              		{
              			options[i].selected = true;
              		}
              	}
	}
	else
	{
		ischecked = true;
              	var box = document.getElementById("search_keywords");
              	var newbox = document.createElement("input");
              	newbox.setAttribute("type", "text");
              	newbox.setAttribute("size", "30");
              	newbox.setAttribute("id", "imdbtext");
              	newbox.setAttribute("class", "post");
              	newbox.setAttribute("style", "width: 300px;");
             	var br = document.createElement("br");
             	br.setAttribute("id", "imdbbr");
              	box.parentNode.insertBefore(newbox, box);
              	box.parentNode.insertBefore(br, box);
              	var label = document.createElement("label");
              	label.setAttribute("id", "klbl");
              	label.innerHTML = "Film/TV name: ";
              	box.parentNode.insertBefore(label, newbox);
              	var label = document.createElement("label");
              	label.setAttribute("id", "imdblbl");
              	label.innerHTML = "IMDB link: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
              	box.parentNode.insertBefore(label, box);
              	var options = document.getElementsByTagName("option");
              	for(i=0;i<options.length;i++)
              	{
              		if(options[i].getAttribute("value") == "4" || options[i].getAttribute("value") == "57")
              		{
              			options[i].selected = true;
              		}
              		else
              		{
              			options[i].selected = false;
              		}
              	}
              	var radio = document.getElementsByTagName("input");
              	for(j=0;j<radio.length;j++)
              	{
              		if(radio[j].getAttribute("value") == "msgonly")
              		{
              			radio[j].setAttribute("checked", "checked");
              			break;
              		}
              	}
              	newbox.addEventListener("blur", popimdb, false);
        }
}

var check = document.createElement("input");
check.setAttribute("type", "checkbox");
check.setAttribute("id", "imdbcheck");
check.addEventListener("click", function(){setup();}, false);
var label = document.createElement("label");
label.innerHTML = "Search IMDB link";
var box = document.getElementById("search_keywords");
box.parentNode.appendChild(check, box);
box.parentNode.appendChild(label, box);