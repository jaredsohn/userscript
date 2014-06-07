// ==UserScript==
// @name Youtube Embed Video Downloader
// @author Nightmare
// @namespace http://userbarmaker.com http://www.coinhop.com
// @version 1.0.0
// @description Show the real url to download youtube video
// @ujs:category browser: embed video downloader
// @ujs:published 05-11-2006 17:26
// @ujs:modified 05-11-2006 17:26
// ==/UserScript==

if (/http\:\/\/.*youtube.com\/.*v=.+/i.test(location.href)) { 
window.opera.addEventListener('BeforeEvent.load' // triggers right before the onload event
    ,function (e) { //calls an anonymouse function pass the event to the function
    // images and iframes fire the onload event, so make sure this is the document loading
      if (e.event.target instanceof Document) { 
        var targetElement, src, targetClass, a, a2, div, div2, t2, img, span, link_sponsor, randomnum;
    // if 'actionsDiv' doesnt exist or there are no embed tags, either means they changed the
    // page or the page is not loaded fully so there's nothing to do
	// prima era cos? >>> document.getElementById('ratingDivWrapper')
	// ora item 40 ? il div sotto il video su utube
    if ((targetElement = document.getElementsByTagName("div").item(40)) &&
        (src = document.getElementsByTagName('embed')[0].getAttribute('src'))) {
      // from here on just gets the data to form a proper link
          var div, a, img, span, l, id, t;
          id = src.replace(/.*\?.*video_id=([^&]+).*/i, '$1'); // seperated into three lines
          t = src.replace(/.*\?.+&t=([^&]+).*/i, '$1');        // for robustness and perhaps
          l = src.replace(/.*\?.+&l=([^&]+).*/i, '$1');        // harder to get around

          a = document.createElement('a');
          a.setAttribute('href', '/get_video?video_id='+id+'&l='+l+'&t='+t);
          a.setAttribute('class', 'noul');
		  a.setAttribute('target', '_blank');
		  a.setAttribute('title', 'Click to Open in a new page');

          img = document.createElement('img');
          img.setAttribute('src', 'img/fav_w_icon.gif');
          img.setAttribute('border', 0);
          img.setAttribute('class', 'alignMid');
          a.appendChild(img);
          a.appendChild(document.createTextNode(' '));

          span = document.createElement('span');
          span.setAttribute('class', 'eLink');
          span.appendChild(document.createTextNode('Download FLV'));
          a.appendChild(span);

          div = document.createElement('div');
          div.setAttribute('class', 'actionRow');
          div.appendChild(a);

		  targetElement.insertBefore(div, targetElement.firstChild);

			randomnum = Math.floor(Math.random()*5);
			var sponsor=new Array(5);
			sponsor[0]='http://userbarmaker.com/';
			sponsor[1]='http://www.coinhop.com/';
			sponsor[2]='http://userbarmaker.com/';
			sponsor[3]='http://www.coinhop.com/';
			sponsor[4]='http://fastg.org/';   
			link_sponsor = sponsor[randomnum];

		  a2 = document.createElement('a');
          a2.setAttribute('href', link_sponsor);
		  a2.setAttribute('target', '_blank');
		  a2.setAttribute('title', 'Click to Open in a new page');
          a2.setAttribute('class', 'noul');
          a2.appendChild(document.createTextNode(link_sponsor));
		  div2 = document.createElement('div');
          div2.setAttribute('style', 'text-align:center;width:100%;border-bottom: 1px #ccc solid;margin:0 0 4px 0;padding:0 0 4px 0');
		  div2.appendChild(document.createTextNode('UserScript sponsored by '));
		  div2.appendChild(a2);

		  t2 = document.getElementById("actionsAndStatsDiv");
		  t2.insertBefore(div2, t2.firstChild);
	  }
      }
    }
    ,false
  );
}