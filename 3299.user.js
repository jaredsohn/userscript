/*
    Ever look at a MySpace account and immediately get blasted with the
    worst music you've ever heard? Ever open a few contact tabs at once
    and get the wonderful effect of hearing three peoples miniplayers
    battling for control of your speakers? Fear no more! The MySpace
    Media Remover is here!

    Eric Lammertsma
*/


// ==UserScript==
// @name            Automatic MySpace Media Remover
// @version         1.5
// @description     (2008-11-10) Removes most media on MySpaces pages including the MySpace Miniplayer, Flash animations, Windows Media and now also all iFrames in which many things are hidden lately, such as applications. Each media element is replaced by a notification box (in the style of the users MySpace) that allows you to easily toggle its visibility.
// @include         *myspace.tld/*
// ==/UserScript==

(function () {

        var version = 1.5;

        var embedeles = new Array();
        iframeeles = document.getElementsByTagName("iframe");
        var objecteles = new Array();
        objecteles = document.getElementsByTagName("object");
        //alert(embedeles.length);
        //alert(objecteles.length);

        var i;
        var medias = new Array();
        var len1 = iframeeles.length;
        var len2 = objecteles.length;
        for (i=0; i<len1; i++) {
          medias.push(iframeeles[i]);
        }
        for (i=0; i<len2; i++) {
          medias.push(objecteles[i]);
        }

        var players = new Array(medias.length);
	for(i=0;i<medias.length;i++)
	{
		var media = medias[i];
               	var placeholder = document.createElement("div");
	        var content1 = "<table width='100%'><tr><td>This ";
	        var content2 = "media";
	        if(media.id.match(/mp3|miniplayer/) || media.name.match(/mp3|miniplayer/) || media.name=="mp3player")
		{
			content2 = "Miniplayer";
                }
                var content3 = " is disabled.<br /><span style='font-size:10px;'>Click here to enable it.</span>";
                var content4 = "</td></tr></table>";
                placeholder.innerHTML = content1 + content2 + content3 + content4;
                placeholder.class = 'orangetext';
		placeholder.style.cursor = 'pointer';
		media.on = false;
		placeholder.id = "place"+i;
                var player = media;
	        if(player.parentNode.tagName.match(/object/i))
	        {
                        player = player.parentNode;
                }
		player.id = "player"+i;
		player.parentNode.insertBefore(placeholder, player);
		players[i] = player;

		placeholder.addEventListener('click', function() {
                        var content1 = "<table width='100%'><tr><td>This ";
        	        var content2 = "media";
        	        player = players[this.id.substr(5)];
        	        if (player)
        	        {
                	        if(player.id.match(/mp3|miniplayer/) || player.name.match(/mp3|miniplayer/) || player.name=="mp3player")
                        	{
                        		content2 = "Miniplayer";
                                }
                                var content4 = "</td></tr></table>";
                		if (media.on) {
                                        player.style.display = 'none';
                			this.innerHTML = "<table width='100%'><tr><td>Click to enable Miniplayer.</td></tr></table>";
                                        var content3 = " is disabled.<br /><span style='font-size:10px;'>Click here to enable it.</span>";
                			media.on = false;
                		} else {
                			player.style.display = 'block';
                			this.innerHTML = "<table width='100%'><tr><td>Click to disable Miniplayer.</td></tr></table>";
                                        var content3 = " is enabled.<br /><span style='font-size:10px;'>Click here to disable it.</span>";
                			content4 = content4 + "<br />"
                                        media.on = true;
                		}
                        this.innerHTML = content1 + content2 + content3 + content4;
                        } else {
                                alert('Automatic MySpace Media Remover Error:\n\nCannot enable the media object, because index #'+this.id.substr(6)+' isn\'t defined. Check for an updated version (you have version '+version+')!');
                        }
		}, true);

		player.style.display = 'none';

	}

}



)();
