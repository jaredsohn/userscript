// ==UserScript==
// @id             forums.whirlpool.net.au-54dbf10e-a3ae-45a2-81cb-2028810cf729@WP
// @name           WP - has anyone responded to me?
// @version        1.0
// @namespace      WP
// @author         Yansky
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// @description    
// @include        http://forums.whirlpool.net.au/user/*
// @run-at         document-end
// ==/UserScript==

var threads = document.querySelector('#threads');

var newColG = document.createElement('col');
newColG.setAttribute('style','width: 2em;');

var colG = threads.querySelector('colgroup');

colG.appendChild(newColG);

var th = threads.querySelector('thead');

var thtr = th.querySelector('tr');


var newtd1 = document.createElement('td');

var newtdButt = document.createElement('button');
newtdButt.innerHTML='>';
newtdButt.setAttribute('title','try to use sparingly');

newtd1.appendChild(newtdButt);



thtr.appendChild(newtd1);


newtdButt.addEventListener('mouseup',function(e){

	var titleLinks = document.querySelectorAll('#threads tr:not(.section) td.title>a');
	
	[].forEach.call(titleLinks, function (item, index, array) {
	
		GM_xmlhttpRequest({
			storedItem:item,
			method: "GET",
			url:"http://webcache.googleusercontent.com/search?q=cache:forums.whirlpool.net.au/archive/"+item.href.split('/forum-replies.cfm?t=')[1],
			onload: function(response) {
				
				let storedItem=this.storedItem;

				var newTD = document.createElement('td');
				
				if(response.status===200){
					var doc = document.implementation.createHTMLDocument('');
					doc.documentElement.innerHTML = response.responseText;
					
					var uInfo = document.querySelector('.userinfo a>span');

					var refAs=jQuery('.reference>a:contains('+uInfo.textContent+')', doc);		

					if(refAs.length>0){

						var theoneattheend = refAs.length-1;
					
						var iTXS = refAs[theoneattheend].textContent.split(' writes...')[0];

						if(iTXS===uInfo.textContent){

							var postN = refAs[theoneattheend].parentNode.parentNode.previousElementSibling.firstElementChild.getAttribute('name');
							var threadNum = item.href.split('/forum-replies.cfm?t=')[1];
							newTD.innerHTML = '<a href="http://forums.whirlpool.net.au/archive/'+threadNum+'#'+postN+'" title="Takes you to the most recent response">&nbsp;'+refAs.length+'</a>';
						}
					}
					else{
						newTD.innerHTML = '&nbsp; 0 ';
					}				
				}
				else if(response.status===404 || response.status===304){
					newTD.innerHTML = '&nbsp; N/A ';
					newTD.title = 'Information Not Available';
				}
				
				storedItem.parentNode.parentNode.appendChild(newTD);
				
			}
		});		
		
	
	});
	

},false);

