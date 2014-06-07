// ==UserScript==
// @name        Coursera Lecture Video Download Link Generator
// @namespace   coursera_download
// @description Generates a link to download the Coursera video lectures
// @include     *coursera*/lecture/index*
// @version     1.1
// @grant       none
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100);
   } else {
      $ = unsafeWindow.jQuery; addVidLink();
   }
}

GM_wait();

// All your GM code must be inside this function
function addVidLink() {

	// see if links are already available, if so, skip the scripts
	d = document.getElementsByClassName('icon-download-alt resource');
	if (d.length > 0)
	{
		return;
	}

	d = document.getElementsByTagName('a');
	var max = 0;
	for (i = 0; i < d.length; i++)
	{
		if (d[i].hasAttribute("data-lecture-id"))
		{
			if (++max < 1)
			{
				break;
			}
			//alert(d[i].getAttribute("data-lecture-id"));
			var cleanString = d[i].text.replace(/[:|&%<>-]/g, "");
			d[i].text = cleanString;
			
			var iClass = document.createElement('i');
			iClass.className = "icon-download-alt resource";
			var vidLink = document.createElement('a'); 
			vidLink.target = "_blank";
			vidLink.setAttribute('data-placement', 'above');
			vidLink.setAttribute('rel', 'twipsy');
			vidLink.setAttribute('title', 'Video (MP4)');
			vidLink.setAttribute('download', cleanString+'.mp4');
			vidLink.id = d[i].getAttribute('data-lecture-view-link');
			//vidLink.href = "javascript: window.location.href=parseURL('"+d[i].getAttribute('data-lecture-view-link')+"')";
			//vidLink.onclick = "alert(parseURL('"+d[i].getAttribute('data-lecture-view-link')+"'));window.location.href=parseURL('"+d[i].getAttribute('data-lecture-view-link')+"')";

			//vidText=document.createTextNode('Hello');
			vidLink.appendChild(iClass);

			d[i].parentNode.appendChild(vidLink);

			parseURL(d[i].getAttribute('data-lecture-view-link'));
		}
	}
}

function parseURL(lecture) {
	//alert(lecture);


	$.ajax({
          url: lecture,
          dataType: 'text',
		  fail: function() { alert('error'); },
		  success: function(data) 
		  {
				//alert(data);
              
				var vidType = "mp4";

				var startOfString = "source type=\"video/mp4\" src=\"";
				var preStart = data.indexOf(startOfString);
				var start = preStart + startOfString.length;
				//alert(preStart);
				if (preStart == -1) // not found
				{
					vidType = "webm"
					startOfString = "source type=\"video/webm\" src=\"";
					start = data.indexOf(startOfString) + startOfString.length;
				}
				var end = data.indexOf("."+vidType, start);
				//alert(start);
				//alert(end);
				var newHref = data.substring(start, end)+'.mp4';
				//alert(newHref);

				$("a").each(function(index)
				{
					if (this.id==lecture)
					{
						this.href = newHref;
						//alert (this.id);
						return false;
					}
				});
				
				/*
				var sources = $(data).find('source');
				$(sources).each(function(s)
				{
					if (this.type == "video/mp4")
					{
						//alert(this.src);
						var newHref = this.src;

						$("a").each(function(index)
						{
							if (this.id==lecture)
							{
								//alert(index + ': ' + this.id);
								this.href = newHref;
								//alert (this.id);
								return false;
							}
						});

						//return sources[s].src;
					}
				});
				*/

          }
    });
}