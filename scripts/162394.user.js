// ==UserScript==
// @name			LeLoMBriK
// @namespace		http://hayj.free.fr
// @description		Permet d'ouvrir la premiere video et la premiere image de la page d'accueil LeLoMBriK. Necessite d'autoriser l'ouverture de popup (onglets...) sur le site.
// @include			http://www.lelombrik.net/
// @grant			none
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

//window.open('http://hayj.free.fr');
//alert($('img[src=/images/icons/video.gif]')[0].attr("src"));
//window.close();

function videoImage($this)
{
    window.open("http://www.lelombrik.net/" + $this.nextAll("a").css('font-size', '1.5em').append('<<').prepend('>>').attr('href'));
}

$('img[src="/images/icons/image.gif"]').each(function(index)
{
	if(index == 1)
	{
		videoImage($(this));
	}
});

$('img[src="/images/icons/video.gif"]').each(function(index)
{
	if(index == 1)
	{
		videoImage($(this));
	}
});

var warning = false;

function autre(image)
{
	$('img[src="' + image + '"]').each(function(index)
	{
		if(index == 1)
		{
			$this = $(this);
			$this.nextAll("a").css('font-size', '1.5em').append('<<').prepend('>>');
			//$this.nextAll("a").css('color', 'red');
			warning = true;
		}
	});
}

autre("/images/icons/Games.gif");
autre("/images/icons/pictures.gif");
autre("/images/icons/sound.gif");
autre("/images/icons/loops.gif");
autre("/images/icons/fraise.ico");

if(warning)
{
	//alert("Attention, il y a un jeux, une animation, un son, un loops ou un sexy...");
}
else
{
	window.close();
}

/*window.open("http://www.lelombrik.net/index.php");
window.close();*/



