// ==UserScript==
// @name           Imagehoster Direct Image
// @require        http://exoware.de/projects/userscript/?id=56274
// @include        http://img*.imagevenue.com/img.php?image=*
// @include        http://www.imagebanana.com/view/*
// @include        http://imagebanana.com/view/*
// @include        http://img*.imagebanana.com/view/*
// @include        http://www.myimg.de/?img=*
// @include        http://myimg.de/?img=*
// @include        http://img*.imageshack.us/i/*
// @include        http://uprus.net/viewer.php?file=*
// @include        http://www.uprus.net/viewer.php?file=*
// @include        http://piccow.com/viewer.php?file=*
// @include        http://www.piccow.com/viewer.php?file=*
// @include        http://img*.pic-bunker.org/index.php?id=*
// @include        http://downlr.com/view/full/*
// @include        http://www.downlr.com/view/full/*
// @include        http://img*.hotlinkimage.com/img.php?id=*
// @include        http://theblindduck.net/viewer.php?file=*
// @include        http://www.theblindduck.net/viewer.php?file=*
// @include        http://imagesup.de/picture.php?code=*
// @include        http://www.imagesup.de/picture.php?code=*
// @include        http://tinypic.com/view.php?pic=*
// @include        http://www.tinypic.com/view.php?pic=*
// @include        http://i.imagehost.org/view/*/*
// @include        http://kingpic.net/show/*
// @include        http://www.kingpic.net/show/*
// @include        http://abload.de/image.php?img=*
// @include        http://www.abload.de/image.php?img=*
// @include        http://bildercache.de/anzeige.html?dateiname=*
// @include        http://www.bildercache.de/anzeige.html?dateiname=*
// @include        http://picfront.org/d/*/*
// @include        http://www.picfront.org/d/*/*
// @include        http://picscrazy.com/view/*
// @include        http://www.picscrazy.com/view/*
// @include        http://img*.picfoco.com/img.php?id=*
// @include        http://img*.cocoimage.com/img.php?id=*
// @include        http://imagearn.com/image*
// @include        http://www.imagearn.com/image*
// @include        http://hostingimage4u.com/viewer.php?file=*
// @include        http://www.hostingimage4u.com/viewer.php?file=*
// @include        http://*.imagehaven.net/img.php?id=*
// @include        http://sharenxs.com/view/?id=*
// @include        http://www.sharenxs.com/view/?id=*

// @include        http://imagearn.com/gallery.php?id=*
// @include        http://www.imagearn.com/gallery.php?id=*
// @version        1.0.5e
// ==/UserScript==

function checkIMG()
{
	var img;
	try{
	if(checkURL("imagevenue.com") || checkURL("downlr.com"))
	{
		img = document.getElementById("thepic").src;
	}

	else if(checkURL("imagearn.com"))
	{
		//gallery code instead of direct link
		if(location.href.indexOf('imagearn.com/gallery.php?id=') != -1)
		{
			var links = document.getElementsByTagName('a');			
			for(var i=links.length; i--;) {
				var a = links[i];
				if(a.href.indexOf('http://www.imagearn.com/image.php?id=') != -1)
				{
					var img_ = a.getElementsByTagName('img')[0].src;
					img_ = img_.replace('http://thumbs2.imagearn.com/', 'http://img.imagearn.com/imags/');
					a.href = img_;
				}
			}
			return;
		}
		else
			img = document.getElementById("img").src;
	}
	
	else if(checkURL("imagebanana.com") || checkURL("cocoimage.com"))
	{
		img = document.getElementById("img").src;
	}
	else if(checkURL("hotlinkimage.com") || checkURL("picfoco.com"))
	{
		var body = document.body.innerHTML;
		var r=0, l = body.indexOf('window.location="');
		if(l !== -1)
		{
			l = body.indexOf('"', l)+1;
			r = body.indexOf('"', l);
			img = body.substring(l, r);
		}
		else{
			img = document.getElementById("img").src;
		}
	}
	
	else if(checkURL("myimg.de"))
	{
		img = document.getElementById("theimg").src;
	}

	else if(checkURL("imageshack.us"))
	{
		img = document.getElementById("fullimg").src
	}

	else if(checkURL("uprus.net") || checkURL("theblindduck.net"))
	{
		img = document.getElementById("page_body").getElementsByTagName("img")[0].src
	}

	else if(checkURL("piccow.com"))
	{
		img = document.body.getElementsByTagName("img")[1].src
	}

	else if(checkURL("pic-bunker.org"))
	{
		img = document.getElementById("divBody").getElementsByTagName("img")[0].src
	}

	else if(checkURL("imagesup.de"))
	{
		img = document.getElementById("content").getElementsByTagName("img")[0].src
	}

	else if(checkURL("tinypic.com"))
	{
		img = document.getElementById("imgElement").src;
	}

	else if(checkURL("imagehost.org") || checkURL("abload.de") || checkURL("imagehaven.net"))
	{
		img = document.getElementById("image").src;
	}

	else if(checkURL("kingpic.net") || checkURL("bildercache.de"))
	{
		img = document.getElementById("bild").src;
	}

	else if(checkURL("picfront.org"))
	{
		img = document.getElementById("pic").src;
	}
	
	else if(checkURL("picscrazy.com"))
	{
		img = document.getElementsByTagName('img')[0].src;
	}
	
	else if(checkURL("hostingimage4u.com"))
	{
		img = document.getElementById("page_body").getElementsByTagName("img")[1].src
	}
	
	else if(checkURL("sharenxs.com"))
	{
		img = document.body.getElementsByTagName("center")[0].getElementsByTagName("img")[0].src;
	}

	}
	catch(e)
	{
		img = undefined;
	}
	if(img != undefined)
	{
		window.location = img;
	}
}

function checkURL(imageHost)
{
	if(location.host.search(imageHost) >= 0) return true
}


if ( typeof unsafeWindow === 'object' )
{
	//document.body.style.display = "none"
	//window.stop()
	checkIMG()	
}
else
{
	document.addEventListener( 'DOMContentLoaded', function()
	{
		//document.body.style.display = "none"
		//window.stop()
		checkIMG()
	}, false );
}