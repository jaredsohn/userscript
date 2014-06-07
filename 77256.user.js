// ==UserScript==
// @name           Dev Script
// @namespace      http://userscripts.org/users/167599
// @author         Brenflakes
// @version        1.3
// @description    Official Announcements from the eAustralian Government and Military
// @include        http://www.erepublik.com/en
// ==/UserScript==
var style= (<r><![CDATA[
		.style {background-color:#eafaff;border:1px solid #d0faff;float:right;margin-top:2px;border:1px solid #daeeee;color:grey;}
		.aclass:hover {color: slategrey; text-decoration: none}



	]]></r>).toString();

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://community.auserepublik.com/index.php?topic=9075.0',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('div class="botslice_quote".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var title = tags[0];
			var message = tags[1];
			var url = tags[2];
			var date = tags[3];
			var who = tags[4];
GM_addStyle(style);
			latest=document.getElementById('latestnews');
			header1 = document.createElement("table");
			header1.innerHTML = '<div><div class="title"><h1>eAustralia Military Orders</h1></div>';

			message0 = document.createElement("div");
			message0.innerHTML = '<div class="style"><b>' + title + '</b> :<br> ' + message + '<br>&nbsp;<br><center>[<a class="aclass" href=' + url + ' target=new>Fight Here!</a>]</center><br>Last updated by <b>' + who + '</b> on <b> ' + date + '</b><br>&nbsp;<br><center>[<a class="aclass" href=http://www.erepublik.com/en/newspaper/aus-department-of-defence-187245/1>Aus Department of Defence Newspaper</a>]</center>';
			
			footer = document.createElement("h3");
			footer.textContent = '                               ';
			
            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
				latest.parentNode.insertBefore(header1, latest);
                latest.parentNode.insertBefore(message0, latest);
				latest.parentNode.insertBefore(footer, latest);
            
            }
		}	
		}
	);

	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://community.auserepublik.com/index.php?topic=9102.0',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('div class="botslice_quote".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var title = tags[0];
			var message = tags[1];
			var url = tags[2];
			var urltext = tags[3];
			var date = tags[4];
			var who = tags[5];

			latest=document.getElementById('shouts');
			header = document.createElement("table");
			header.innerHTML = '<div class="title"><h1>Official eAustralia News</h1></div>';
			
			message1 = document.createElement("div");
			message1.innerHTML = '<div class="style"><b>' + title + '</b> :<br> ' + message + '<br>&nbsp;<br><center>[<a class="aclass" href=' + url + ' target=new>'+ urltext + '</a>]</center><br>Last updated by <b>' + who + '</b> on <b> ' + date + '</b><br>&nbsp;<br><center>[<a class="aclass" href="http://www.auserepublik.com" target="new">eAustralia Website</a>] [<a class="aclass" href="http://community.auserepublik.com" target="new">Forums</a>] [<a class="aclass" href="http://www.auserepublik.com/irc/index.html" target="new">#ausrep IRC</a>]</center>';
			
			footer = document.createElement("h3");
			footer.textContent = '                               ';
			
            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
				latest.parentNode.insertBefore(header, latest);
				latest.parentNode.insertBefore(message1, latest);
                latest.parentNode.insertBefore(footer, latest);
            
            }
		}	
		}
	);

