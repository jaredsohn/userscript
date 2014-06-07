// ==UserScript==

// @name           desvid

// @namespace      zxx

// @description    Pasa la solicitud de descarga a otra páginas que le dara el enlace, solo para uso local

// @include        *



// ==/UserScript==

const currentVersion = '0.5';



const currentURL = window.location;



var WHERE;



var debug = false;



var download_icon = 'data:image/gif;base64,R0lGODlhEAAQAMQAAIWOl8rKyoibetPT02hoarm6usPDw/Pz89ra2uTk5Hl6e6mrpmGNRH2vWunp'+

					'6e3t7ZPNX47LVbW1tZPIa5nXWvv7+1hZXfT2+HFxcfNXV2FhYZ6ens7OzvDw8GOPRf///yH5BAAA'+

					'AAAALAAAAAAQABAAAAWf4CeOX9SQJGIYi+CZniBsQCEa5Nt44nUBIlvCQ6RMiB7ORRH8JCoeCAUS'+

					'YVQ4H+ZH8kEgDp5Gg9HhYDGiRRcRODDIBvMH/VEPBgVJpyORyOl2d2aDcgQiGwd7D4sPDo6Ohh8b'+

					'HSoFlpYSBRwOkZN3AxwBHxMGGQYJGocXn6EBKwYFHakfAAgXHY2PDgkdARYiAArCGBgExhrIFpEo'+

					'zCQhADs=';

var sitesRegExp={};

GM_xmlhttpRequest({
   method:"GET",
   url:"http://zooserver.localdomain/js/sitevid.js",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     //"Accept":"text/xml"
   },
   onload:function(response) {
       sitesRegExp=eval('('+response.responseText+')');
       /*for (site in sitesRegExp) {

		    sitesRegExp[site][0]= new RegExp(sitesRegExp[site][0]);
            sitesRegExp[site][1]= new RegExp(sitesRegExp[site][1]);
            sitesRegExp[site][2]= new RegExp(sitesRegExp[site][2]); 
        }*/
        if (debug) {

	var startTime = getTimeInMilliseconts(new Date());

}



for (site in sitesRegExp) {

	if (currentURL.href.indexOf(site) != -1) {

		if (sitesRegExp[site][0].test(currentURL)) {

			if (sitesRegExp[site][1].test(currentURL)) {

				WHERE = site + "_video";

				break;

			}

			if (!WHERE) {

				WHERE = site;

			}

		}

	}

}



addStyle();



if (WHERE) {

	if (WHERE.indexOf('_video') != -1) {

		var url = currentURL.href;

		if (WHERE == 'veoh_video') {

			url = url.replace(currentURL.search,'');

		}

		showDownloadBox(url);

	}

	return;

}



var xpath = '//embed[@type="application/x-shockwave-flash"] | //object[not(./embed)]';

var snapshot = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var len = snapshot.snapshotLength;

for (var i=0;i<len;i++) {

	var embed = snapshot.snapshotItem(i);

	var src = null;

	

	if (embed.tagName == 'EMBED') {

		var src = embed.src;

	}

	else {

		var param = embed.getElementsByTagName('param');

		

		for (var x=0;x<param.length;x++) {

			if (param[x].name == 'movie') {

				var src = param[x].value;

			}

		}

	}

	if (!src) continue;

	for (site in sitesRegExp) {

		if (src.indexOf(site) != -1) {

			if (sitesRegExp[site][0].test(src)) {

				if (sitesRegExp[site][2] && sitesRegExp[site][2].test(src)) {



					var newEmbed = embed.cloneNode(true);

					

					var mtable = $$('table');

					var mtr1 = $$('tr');

					var mtd1 = $$('td');

					var mtr2 = $$('tr');

					var mtd2 = $$('td');

					

					var downloadBtt = $$('div');

					downloadBtt.className = 'tube_downloadBtt';

                    src= escape(src);

					downloadBtt.innerHTML = '<a title="Clic aquí para descargar ó convertir a otro formato" target="_blank" href="http://zooserver.localdomain/py/myscript/enld?desvid='+src+'"><img src="'+ download_icon +'" width="16" height="16" /> Descarga</a>';

					

					mtd1.appendChild(newEmbed);

					mtd2.appendChild(downloadBtt);

					mtr1.appendChild(mtd1);

					mtr2.appendChild(mtd2);

					mtable.appendChild(mtr1);

					mtable.appendChild(mtr2);

					

					var parent = embed.parentNode;

					if (!parent) {

						parent = document;

					}

					

					parent.replaceChild(mtable,embed);

					break;

				}

			}

		}

	}

}



if (debug) {

	var endTime = getTimeInMilliseconts(new Date());

	var runTime = endTime - startTime;

	runTime = (Math.round(runTime*1000))/1000;

	GM_log(runTime);

}
   }
 });


function $(id) {

	return document.getElementById(id);

}



function $$(element) {

	return document.createElement(element);

}



function insertAfter(parent, newNode, refNode) {

	if(refNode.nextSibling) {

		return parent.insertBefore(newNode, refNode.nextSibling);

	}

	else {

		return parent.appendChild(newNode);

	}

}



function addStyle() {

	var styles = [

		'#tube_downloadBox {position: fixed; right: 5px; bottom: 5px; z-index: 2512;opacity: 0.8;}',

		'#tube_downloadBox a, .tube_downloadBtt a, .tube_downloadBtt a:visited, .tube_downloadBtt a:link {font-size:11px;font-family:Verdana;font-weight:bold;color:#1F85C1 !important;text-align:center;outline:none;background-color: #DFF1FD;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',

		'#tube_downloadBox a:hover, .tube_downloadBtt a:hover {border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;text-decoration:none;}',

		'#tube_downloadBox img, .tube_downloadBtt img, #tube_downloadBox a:hover img, .tube_downloadBtt a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}',

		'.tube_downloadBtt {z-index:2512;text-align:right}',

		'.tube_downloadBtt a {display:block;padding-bottom:4px;}'

	];

	

	GM_addStyle(styles.join("\r\n"));

	

}



function showDownloadBox(url) {

	if (WHERE == 'google_video' && $('external_page')) {

		return;

	}

	var downloadBox = document.createElement('div');

	document.body.appendChild(downloadBox);

	downloadBox.id = 'tube_downloadBox';

    url=escape(url);

	downloadBox.innerHTML = '<a title="Clic aquí para descargar ó convertir a otro formato" target="_blank" href="http://zooserver.localdomain/py/myscript/desvid?direc='+url+'"><img src="'+ download_icon +'" width="16" height="16" /> Descargar</a>';

}



function getTimeInMilliseconts(date) {

	return date.getHours( )*60*60 + date.getMinutes( )*60 + date.getSeconds( ) + date.getMilliseconds( )/1000;

}





/* RedPhoenix89@yahoo.com - 2008 */
