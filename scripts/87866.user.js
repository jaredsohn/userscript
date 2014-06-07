// ==UserScript==
// @match         http://*/*
// @name          Convert Legacy YouTube Includes
// @namespace     http://aprotim.com/userscripts
// @description	  Replaces old <object> youtube includes with the new <iframe>
// @version     0.2
// @author      aprotim_aprotim_com
// @license       LGPLv3 http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf("," +
                         b.toLowerCase()) != -1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}

var yt_urls = /^https?:\/\/(?:www\.)?youtube.com\/v\/([^&?]*)(.*)?/

function FindYouTubeEmbeds() {
  var yt_embeds = [];
  var embeds_xpath = document.evaluate('//object/param[@name="movie" and starts-with(@value, "http://www.youtube.com/")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var el = embeds_xpath.iterateNext();
  while (el) {
    yt_embeds.push({node: el.parentNode, url: el.value});
    el = embeds_xpath.iterateNext();
  }
  return yt_embeds;
}

function CreateNewEmbed(vid_id, embed_width, embed_height){
  return create('iframe', {class: 'youtube-player', type: 'text/html',
                           width: embed_width, height: embed_height,
                           frameborder: '0', border: '0',
                           src: 'http://www.youtube.com/embed/' + vid_id})
}

function ReplaceYouTubeEmbed(old_embed){
  var vid_id = old_embed.url.match(yt_urls)[1];
  var vid_height = parseInt(old_embed.node.height) + 5;
  var vid_width = old_embed.node.width;
  var new_node = CreateNewEmbed(vid_id, vid_width, vid_height);
  old_embed.node.parentNode.replaceChild(new_node, old_embed.node);
}

var embeds = FindYouTubeEmbeds();
for (var i in embeds) {ReplaceYouTubeEmbed(embeds[i])}
