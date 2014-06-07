// ==UserScript==
// @name           FaceBook | uTube QuikWind
// @namespace      flienteen
// @include        http://*facebook.com*
// @version        1.0
// ==/UserScript==

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-latest.js';
document.getElementsByTagName('head')[0].appendChild(script);

script.addEventListener('load', function()
{ 
	$j = unsafeWindow['jQuery']; 	$j.noConflict();


	var yW=310;
	var yH=251;
	var Lnb=0;

 
function QB_mkLink()
{

	$j('.uiAttachmentTitle a[href*="youtube.com"]').parent().each(function()
	{ 
		var plusParent = this;

	  if ($j("a",plusParent).size() == 1)
	  {
		$j(plusParent).append(' <a style="color:red" href="#">[+]</a>');

		var lHref = $j(plusParent).children('a').eq(0).attr('href').replace(/.+v=/, '').replace(/\&.+/, '');
		var lName = $j(plusParent).children('a').eq(0).text();
		var lActor= $j(plusParent).parents('li').find('a.actorName').eq(0).text();
		var yC = ($j(plusParent).parents('li').offset().top)+10;

		$j('a[href*="#"]', plusParent).eq(0).one('click', function(e) //apasam plusiku
		{ 
			$j('div#QB_Div').show(500);
			$j('a#f_div_close').click(function(){$j('div#QB_Div').hide(500);});

			
			var tag=(++Lnb)+'. <a id="'+lHref+'" yC="'+yC+'" actor="'+lActor+'" href="youtube:'+lHref+'" onClick="return false;" style="display:inline;">'+lName+'</a><br>';
			$j("div#QB_Div_List").append(tag); //adaugat Lku in lista

			$j('div#QB_Div_List  a#'+lHref).click(function(e)
			{ 
				var $aLista=$j(this);
				$aLista.parent().find('a').css('background',null);
				$aLista.css('background','#cddaf5');

				var Obj = '<object width="'+yW+'" height="'+yH+'"><param name="movie" value="http://www.youtube.com/v/'+lHref+'&autoplay=1&hl=en_US&rel=0&color1=0x3a3a3a&color2=0x999999"></param><embed src="http://www.youtube.com/v/'+lHref+'&autoplay=1&hl=en_US&rel=0&color1=0x3a3a3a&color2=0x999999" type="application/x-shockwave-flash" width="'+yW+'" height="'+yH+'"></embed></object>';
				$j("div#QB_Box").show(100, function()
				{
						$j(this).find('div#QB_video').html(Obj);
						$j(this).find('input').val('http://youtu.be/'+lHref);
						$j(this).find('em:eq(0)').html('Posted by '+lActor);
						$j(this).find('span').click(function(){$j('div#QB_Box input').select();});
						$j(this).find('a#f_QB_audio').text('[a]');
				}).hover(function() 
				{
						$j(this).find("em:eq(0)").animate({opacity: "show", top: "-15"}, "slow");
				}, function() 
				{
						$j(this).find("em:eq(0)").animate({opacity: "hide", top: "-25"}, "fast");

				});


				$j('a#f_QB_close').click(function(){$j('div#QB_Box').hide(500); $aLista.css('background',null);});



				var ObjAudio='<iframe src="http://www.youtube.com/watch?v='+lHref+'" scrolling="no" frameborder="0" allowTransparency="true" style="border:none; overflow:hidden; width:0px; height:0px"></iframe><br><br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<img src="http://funkyimg.com/u2/497/902/music.png" width="213" height="201" />';					
				$j('a#f_QB_audio').unbind("click");					
				$j('a#f_QB_audio').click(function()
				{
					if ($j(this).text()=='[a]')
					{
						$j(this).text('[v]');
						$j('div#QB_video').css('height',yH).html(ObjAudio);
					} else {
						$j('div#QB_video').html(Obj);
						$j(this).text('[a]');
					}
				});



				$j('a#f_QB_like').unbind("click");
				$j('a#f_QB_like').click(function()
				{
					var yCur = $j(window).scrollTop();
					$j(window).scrollTop($aLista.attr('yC'));
			
					 if ($j("a",plusParent).size() == 2)
						$j(plusParent).append(' <a id="back" style="color:green" href="#">[b]</a> <em style="display:none;">  scroll back</em>')
					.click(function(e)
					{//.animate({scrollTop: yCur}, 1000);
						$j('a#back, em', this).remove();
						$j(window).scrollTop(yCur);
					})
					.hover(function()
					{
						$j('em', this).animate({opacity: "show", top: "-25"}, "fast");
					}, function(){$j('em', this).animate({opacity: "hide", top: "-35"}, "fast");});		
					//$j(this).unbind("click");
				});

			});//apasat pe cintec din lista

		});//apasat pe plusik

	  }//no dupe

	});//each all <a>

}//function end


	fOn();
	fShBox();



	function fOn()
	{
		$j("body[class*='home'], body[class*='profile']").append('<style type="text/css">#QB_Div {position: fixed;display: none;z-index: 200;float: right;bottom:50px;right:50px;}#QB_Div_List{	overflow: auto; } #QB_Div table {border: 1px solid #b3b3b3; background-color: #ffffff;} a.hilite { background:#cddaf5;text-decoration:none; }</style>' //CSS
			+'<div id="QB_Div"><table width="180" border="0" cellspacing="0" cellpadding="0"><tr><td nowrap><center style="cursor:default">YouTube Quick List</center></td><td align="right"><a id="f_div_close" href="#">[ x ]</a></td></tr><tr><td colspan="2"  nowrap="nowrap"><div id="QB_Div_List"></div></td></tr></table></div>');
	}


	function fShBox()
	{		
		$j("body[class*='home'], body[class*='profile']").append('<style type="text/css">#QB_Box {display: none;position: fixed;z-index: 200;float: right;bottom:50px;left:3px; 	/*width:'+(yW+5)+'; height:'+(yH+5)+'; background-color: #3a3a3a;*/} #QB_Box em {position: absolute;text-align: center;font-style: normal;z-index: 222;display: none;}</style>' +
		'<div id="QB_Box"><table style="background-color:#000; color:#CCC;"  width="310" border="0" cellspacing="0" cellpadding="0"><tr><td><em style="color:#666666;"></em></td></tr><tr><td style="padding:2px;"><span style="cursor:default">Copy:</span> <input type="text" size="24" readonly style="background-color:#000;color:#CCC;border:none; text-indent:inherit; font-size:10px;" value="" onClick="this.select();"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="f_QB_like" href="#">Like</a> &nbsp;&nbsp;<a id="f_QB_audio" href="#">[a]</a> <a id="f_QB_close" style="float:right;" href="#">[ x ]</a></td></tr><tr><td valign="middle" align="center"><div id="QB_video">div</div></td></tr></table></div>'); 
	}

	function fPlusik()
	{		
		$j("body[class*='home'], body[class*='profile']").append('<style type="text/css">#QB_plusik {display: block;position: fixed;z-index: 200;bottom:3px;left:3px;  background-color: #eceff5;font-size:24px;color:#3b5998;cursor:pointer;border: 1px solid #b3b3b3;text-align:center;}</style>' + '<div id="QB_plusik">+</div>');
	}

	fPlusik();

	$j('div#QB_plusik').click(function()
	{
		QB_mkLink();
		noApps();
	});
	QB_mkLink();

	function noApps()
	{
		$j('li').each(function(e)
		{
			$j(this).find('div.clearfix a[href*="apps.facebook.com"]')
				.parents('li').fadeOut("slow");
			$j(this).find('a[href*="note.php?note"]').css({'background-color' : '#C6DC86'})
				.parents('li').css({'display':'none'});

		});
	}



		$j(document).ready(function() 
		{ 
			noApps();		
		});

	

}, false);
