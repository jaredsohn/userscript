// ==UserScript==
// @name           AKKA/LAA + Youtube
// @namespace      akkalaa
// @description    AKKA/LAA lapā ir Youtube. Ko nu?
// @include        https://*akka-laa.lv/#*
// @include        https://*akka-laa.lv/
// ==/UserScript==

// oriģinālais kods, kas kalpo par pamatu šim GM scriptam:
// http://akkalaayoutubeproxy.wordpress.com/akkalaa-youtube-proxy/

add_video();

function add_video() {

		var doc = document;

        var default_video = 'yQFZcn-Nh_4';

		if(
			!doc || !doc.evaluate || !doc.location || !doc.location.hostname || !doc.location.pathname 
        ) {
			return;
		}

		var videos = [];
		try {
			if(doc.location.hash)
			{
				videos = doc.location.hash.substring(1).split(',');
			} else {
                videos = [];
            }
		} catch(e1) {
			videos = [];
		}

		if(videos.length == 0)
		{
			videos.push(default_video);
		}

		try {
			var nodeFound = doc.evaluate('/html/body/table/tbody/tr[2]/td[2]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		} catch(e2) {
			return;
		}

		var i;
		for(i = 0; i < videos.length; i++)
		{
			var o = doc.createElement("object");
			o.setAttribute("width", "425");
			o.setAttribute("height", "344");

			var p1 = doc.createElement("param");
			p1.setAttribute("name", "movie");
			p1.setAttribute("value", "http://www.youtube.com/v/" + videos[i] + "&hl=en&fs=1");

			var p2 = doc.createElement("param");
			p2.setAttribute("name", "allowFullScreen");
			p2.setAttribute("value", "true");

			var p3 = doc.createElement("param");
			p3.setAttribute("name", "allowscriptaccess");
			p3.setAttribute("value", "always");

			var embed = doc.createElement("embed");
			embed.setAttribute("src", "http://www.youtube.com/v/" + videos[i] + "&hl=en&fs=1");
			embed.setAttribute("type", "application/x-shockwave-flash");
			embed.setAttribute("allowscriptaccess", "always");
			embed.setAttribute("allowfullscreen", "true");
			embed.setAttribute("width", "425");
			embed.setAttribute("height", "344");

			o.appendChild(p1);
			o.appendChild(p2);
			o.appendChild(p3);
			o.appendChild(embed);

			var container = doc.createElement('div');
			var containerStyle = 'padding: 1em; width: 425px; height: 344px;';

            // Izceļam pārgudro runu
			if(videos[i] == 'yQFZcn-Nh_4')
			{
				containerStyle = containerStyle + " border: 1px solid red;";
			}
			container.setAttribute("style", containerStyle);
			container.appendChild(o);

			nodeFound.appendChild(container);
		}
		return;
};

