// ==UserScript==
// @name           Kinozal_Kinopoisk_Menu
// @namespace      http://www.userscripts.org
// @include        *kinozal.tv/details.php*
// ==/UserScript==

function getElementsByClassName(cls)
{
    arr=new Array();
    i=0;

    element=document.getElementsByTagName("*");
    for(i=0; i<element.length; i++)
    {
        if(element.class==class)
        {
            arr[i]=element;
            i++;
        }
    }

    return arr;
}

document.styleSheets[1].insertRule(".my_vote {display: none}",0);
document.styleSheets[1].insertRule(".gray {display: none}",0);
document.styleSheets[1].insertRule(".omlet_searchpage {display: none}",0);

document.styleSheets[1].insertRule(".right ul {text-align: left; list-style: square inside url('/pic/lst.gif'); margin: 0; margin-top: 14px; padding: 0}",0);
document.styleSheets[1].insertRule(".right li {position: relative; margin: 3px}",0);
document.styleSheets[1].insertRule(".right .inactive {display: none}",0);

document.styleSheets[1].insertRule(".kp_ratio img {display: block; overflow: hidden; border: 0px #ccc solid;}",0);
document.styleSheets[1].insertRule(".pic {width: 58px; overflow: hidden; float: right; margin: 3px}",0);
document.styleSheets[1].insertRule(".pic img {width: 52px; border: 3px #ccc solid; display: block}",0);
document.styleSheets[1].insertRule(".kp_mn {background:#f1d29c;border:black 0px;height: 19px;}",0);
 
document.styleSheets[1].insertRule(".name {color: #007; font-family: arial; font-size: 12px;",0);
document.styleSheets[1].insertRule(".name a {color: #007}",0);
document.styleSheets[1].insertRule(".name .year {color: #f60; padding-left: 2px}",0);

var title = document.title.replace("::","/").split("/")[1];

var kinopoisk = "http://www.kinopoisk.ru";

var seachQuery = kinopoisk + '/level/7/type/all/find/' + encodeURIComponent(title) + '/set_result_type/full/';

GM_xmlhttpRequest(
	 {
	    method: 'GET',
	    url: seachQuery,
	    onload: function(response) {
		var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
		var doc = document.implementation.createDocument(null, null, dt);
		
		var html = document.createElement('html');
		html.innerHTML = response.responseText;
		doc.appendChild(html);

		
		var kp_mn = html.getElementsByClassName("element most_wanted")[0]

			if (kp_mn)
			{

			var title =  kp_mn.getElementsByClassName("name")[0];

			var rating =  kp_mn.getElementsByClassName("rating")[0];

						if (rating)
						{
							var filmID = title.innerHTML.match("/film/\\d*/")[0].split("/")[2];
							rating.innerHTML ='<a class="kp_ratio" href="' + kinopoisk + '/level/1/film/'+ filmID + '/"><img src="' + kinopoisk  + '/rating/' +  filmID + '.gif"/><a>';
						}

			var list = kp_mn.getElementsByClassName("links")[0];
					if (list)
					{
					var search = document.createElement('li');
					search.innerHTML = '<a href="' + seachQuery + '">search</a><s></s>';
					list.insertBefore(search,list.firstChild);
					}

			var pics = kp_mn.getElementsByClassName("pic")[0];
	
					if (pics)
					{
						pics.innerHTML = pics.innerHTML.replace('src=','');
						pics.innerHTML = pics.innerHTML.replace('title=','src=');
						pics.innerHTML = pics.innerHTML.replace('"/images/sm_','"' + kinopoisk + '/images/');

					}

			kp_mn.innerHTML = '<br><tr class=kp_mn><td><b>Kinopoisk.ru</b></td></tr>' + kp_mn.innerHTML ;

			var parent = document.getElementById("ratio_get").parentNode.parentNode.parentNode;
            
			parent.innerHTML = kp_mn.innerHTML;

			}
		}
	});