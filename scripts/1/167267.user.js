// ==UserScript==
// @name       YouTube Age Restriction Unblocker
// @namespace  http://www.wobhosting.com/
// @version    1.1
// @description  The name! ;)
// @match      http://www.youtube.com/watch?v=*
// @copyright  2013+ Joshua Garde Productions (Distributed with Creative Commons Licencing)
// ==/UserScript==

if(document.getElementById('watch7-player-unavailable'))
    alert("The content you are about to view may be inappropriate for audiences under the age of 18. Viewer discretion is advised. Please continue at your own risk.\n\n~YouTube Age Restriction Unblocker")
    var vidid=document.URL
    vidid = vidid.replace("http://www.youtube.com/watch?v=","")
    element = document.getElementById("watch7-player-unavailable")
    element.parentNode.removeChild(element)
	element = document.getElementById('player-unavailable')
    element.parentNode.innerHTML = '<iframe width="640" height="390" src="http://www.youtube.com/embed/' + vidid + '?showinfo=0&autoplay=1" frameborder="0" allowfullscreen</iframe>'
    document.body.innerHTML = document.body.innerHTML.replace("This video has been age-restricted based on our", "This is supposted to be blocked, but you've installed the YouTube Age Restriction Unblocker! Want more info? Please read YouTube's ");