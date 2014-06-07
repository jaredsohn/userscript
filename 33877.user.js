// ==UserScript==
// @name           Wykop (zakopy)
// @namespace      wykop
// @include        http://www.wykop.pl/*
// ==/UserScript==

//window.addEventListener("load",
//	function()
//	{
		var result = document.evaluate("//div[@class='wykop-details']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var ajax = new XMLHttpRequest();
		var i = -1;
		var id;
		var k;
		function uzupelnij()
		{
			i++;
			var details	= result.snapshotItem(i);
			id			= details.parentNode.id.substring(7);
			if (id==0)
				uzupelnij();
			GM_log ('link-id = '+id);
		}
		
		function pobierz()
		{
			var ajax = new XMLHttpRequest();
			ajax.open('GET', "http://www.wykop.pl/link/"+id+"/raporty", true); // http://www.wykop.pl/link/80981/raporty
			ajax.onreadystatechange = function (aEvt)
			{
				if (ajax.readyState == 4)
				{
					if(ajax.status == 200)
					{
						var r = ajax.responseText;
						var start = r.indexOf("<p>Liczba wszystkich raportów ");
						var end = r.indexOf("<h4>Zakopujący");
						var text = "zakopów ("+r.substring(start+30, end-48)+")";
						if	(r.indexOf("Podaj powód zakopu")!=-1)
						{
							var start = r.indexOf("report[link_id]");
							var end = r.indexOf("Statystyki zakopów");
							var stampCode = r.substring(start+95,end-154);
							GM_log(text);
							GM_log(stampCode);
						
							var details			= result.snapshotItem(i);
							var info			= details.getElementsByTagName('ul')[0];
							var zakopListItem	= document.createElement('li');
							var zakopLink		= document.createElement('a');
							var form            = document.createElement('form');
							var reasons			= new Array(5);
							{
								reasons[0]			= "duplikat";
								reasons[1]			= "spam";
								reasons[2]			= "informacja nieprawdziwa";
								reasons[3]			= "treść nieodpowiednia";
								reasons[4]			= "nie nadaje się";
							}
							var reportBody      = document.createElement('fieldset');
							var linkId          = document.createElement('input');
							var stamp			= document.createElement('input');
							var submit          = document.createElement('input');
							var zakopsubmit		= document.createElement('fieldset');
							
							zakopListItem.style.background = 'transparent url(/imgdesign/ico_tiny_zakop.gif) no-repeat scroll 0pt 2px';
							
							zakopLink.href = "javascript:void(0);";
							zakopLink.setAttribute('onclick', "var form = document.getElementById('zakopForm' + " + id + "); form.style.display = form.style.display == 'none' ? 'block' : 'none';");
							zakopLink.appendChild(document.createTextNode(text));
							
							form.action = 'http://www.wykop.pl/report/create';
							form.method = 'post';
							form.style.display = 'none';
							form.style.borderTop = '1px #EFF3F6 solid';
							form.style.borderBottom = '1px #EFF3F6 solid';
							form.style.marginTop = '1em';
							form.style.padding = '.5em';
							form.id = 'zakopForm' + id;
							
							for ( var j=1; j<6; j++)
							{
								var reason = document.createElement('input');
								var span = document.createElement('span');
								var label = document.createElement('label');
								
								reason.id = 'reason'+j;
								reason.type = 'radio';
								reason.name = 'report[body]';
								reason.value = j;
								
								//label.forName = 'reason'+j;
								
								label.appendChild(document.createTextNode(reasons[j-1]));
								
								span.appendChild(reason);
								span.appendChild(label);
								span.appendChild(document.createElement('br'));
								reportBody.appendChild(span);
							}
							
							linkId.className = 'hidden';
							linkId.type = 'hidden';
							linkId.name = 'report[link_id]';
							linkId.value = id;
							
							stamp.className = 'hidden';
							stamp.type = 'hidden';
							stamp.name = 'stamp';
							stamp.value = stampCode;
							
							submit.type = 'submit';
							submit.name = 'commit';
							submit.value = 'Zakop!';
							submit.className = 'submit-button';
							
							zakopsubmit.className = 'zakop-submit';
							zakopsubmit.appendChild(linkId);
							zakopsubmit.appendChild(stamp);
							zakopsubmit.appendChild(submit);
							
							form.appendChild(reportBody);
							form.appendChild(zakopsubmit);
							
							zakopListItem.appendChild(zakopLink);
							info.appendChild(zakopListItem);
							details.appendChild(form);
						}
						else
						{
							var details			= result.snapshotItem(i);
							var info			= details.getElementsByTagName('ul')[0];
							var zakopListItem	= document.createElement('li');
							var zakopLink		= document.createElement('a');
							zakopListItem.style.background = 'transparent url(/imgdesign/ico_tiny_zakop.gif) no-repeat scroll 0pt 2px';
							zakopLink.href = "javascript:void(0);";
							zakopLink.appendChild(document.createTextNode(text));
							zakopListItem.appendChild(zakopLink);
							info.appendChild(zakopListItem);
						}
												
						//zakopLink.appendChild(document.createTextNode(text));
						//zakopListItem.appendChild(zakopLink);
						//info.appendChild(zakopListItem);
						GM_log('Child append succesfull');
						
						if(i<result.snapshotLength-1)
						{
							uzupelnij();
							pobierz();
						}
					}
					else;
						//alert("Błąd podczas ładowania strony\n");
				}
			}
			ajax.send(null);
		}
		if(result.snapshotLength>0)
		{
			GM_log('links to precide: '+result.snapshotLength);
			uzupelnij();
			pobierz();
		}
	//}
//, false);

