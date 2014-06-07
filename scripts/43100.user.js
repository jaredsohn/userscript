// ==UserScript==
// @name            Youtube video download
// @namespace       Youtube
// @include         http://youtube.com/watch?v=*
// @include         http://*.youtube.com/watch?v=*
// ==/UserScript==


mNewObj = document.createElement("iframe");
mNewObj.id = "frmdownload";
mNewObj.height = "0";
mNewObj.width = "0";
mNewObj.src = "";
document.getElementsByTagName("body")[0].appendChild(mNewObj);

  var ni = document.getElementById('watch-vid-title');

  var newdiv = document.createElement('div');
  newdiv.setAttribute('id',"download");


  newdiv.innerHTML = '<br><input type="image" name="Download This YouTube Video" title="Download This YouTube Video" src="http://www.mazzzzz.org/download.bmp" id="download" onclick=\'javascript:document.getElementById("frmdownload").src="http://www.techcrunch.com/ytdownload3.php?url="+escape(window.location)+"&submit=Get+Video";\' alt="Download This YouTube Video">';
  ni.appendChild(newdiv);


//.user.js