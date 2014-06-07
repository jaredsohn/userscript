// ==UserScript==
// @name			Popup search
// @author			lkytal
// @namespace	Lkytal
// @include		*
// @require		http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @version		2.3.2
// @icon			http://lkytal.qiniudn.com/ic.ico
// @grant			GM_xmlhttpRequest
// @grant			GM_addStyle
// @grant			unsafeWindow
// @grant			GM_openInTab
// @grant			GM_setClipboard
// @grant			GM_getClipboard
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_registerMenuCommand
// @updateURL		https://userscripts.org/scripts/source/187031.meta.js
// @downloadURL	https://userscripts.org/scripts/source/187031.user.js
// ==/UserScript==

if (window != window.top || window.document.title === "") {
	return;
}

var tipdown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAXElEQVQYlYXMsQ5AQBREUSoVjQ+f+S0lSi2livJlr4ZEZDcmud3JVJIW2yPQVqXZPmwjaQXqEuJJ0vCLbrgDfRZFxBsH0GTRCybbcxF9HhPQZdEHbkUUEUg6JU0Xm2KvCU6v27kAAAAASUVORK5CYII=";

var tipup = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAZElEQVQYlXXMIQ4CMBBE0UWhwHDw+ddCAhILEgWy4WNo0tAyyZidly1AwNba1CSvJOf6h/oduC/RAN7qfkJ9BC7VM6LhQ1O3E+pN8lAPNeYHHGsV4PkFN3WzREmuwEndLUFVfQC3Xa8Jl+92RAAAAABJRU5ErkJggg==";

var tip = tipdown;

var baiduico = "data:image/png;base64,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";

var bingicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACeklEQVRYhe2Wy2sTURTGu1fapOZRTKj2kaag1VaTNA9NjHkWLS3diC5q6wNc+A+EIkVw40ZRFBeuirgQF1JfuFBboYiIzb2TmdimCA0YWyupqalBTRo/F4M3KE0mhrR2kQsfDHPvOfOb794zZ6qErlb8T1VVACoAFYANDcD7dKAWFahFBd7TvL4AvE8HobsNqSmK1FuC6WP71gQiP4C3GeGe3fg9Zk54EHI35ub9evBenSi/fm0AhJ5dDCAy4Abn0ILa1CCGGlCrCsLhnRAO7QAxK0CMMlBb3R+QZQUId7ch0u9EYuwBVhs/s1l8fnIX00dtIEY5eF9LeQG+RWfYdeLZKGaHTiLS70TkuAvR4TP48vIpm19+MwFqURZ1ZooGAIAf8+/B2TWgZgVCzm0IuRtFHagH6awF72vBytek6EgmDWpVSTpRNEA2k0awYxN4T1PeZCFXA6hZwWKWxh+CWtXlAYhdHgK3f6ukpdSqxqfb11kcMckLVknhMuxtZ4lmA4MIOeslATiHFrFLARbH2TUFtyE/gF8PYpKzRIuP7oAYZZIAwY7NWJ6cEM/BSgbEIINQigNCVys4uwZz187nPkan/CCdW1Z9I96rAzHIMBsYZOuj505Lula4F/j1CO6tRnz0Fku6MHIF1KIEMclBrSpQqwrEKANn1yJ+b4Stm795EcRUW3oZ/r0V7872IZOI50ryYwzJV2NIvh5HenGB3f8eiyIy4AK1KCUfXhQAK7GD2xHcU42pI2bM3biApRePkQoHkQpPIvH8Pj5cHUa4tx3EUIOQq6GonP8EIEoP3tPEegK1KEXZ6sA5tCV1y439Q1IBqABUANZDvwDe9YuA3jr3dgAAAABJRU5ErkJggg==";

var ticon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABzUlEQVRYhe2WTWsTURSGr5iQNOkIgvgDJEIXdqUrUTeltFt3gr/And3afZcuzbo/IC5qksnMtCITrYYWlGAJBKW0fpCNLSiBgtXHxQkmMvdOZkhCicyBs5rLOc+d856Xq9i8wFmmSgASgOkE8CxzThzAzUDtHJRVMG0VGyIegJOCl9fg8zra6DyFipoQgJsDNyuNvLweAMC/In9p7ABlBUcvpEm3DdvX9QAnX2Aj+iiiAThpeH3j30aN2/C9qYdo3hedjAXAs+CZgtNusJE3Yx5FRYE3OwYAW0Hrob5JexUOi/pvn4qRBBkO4OUFwBRbF6WJ8fslcGdGAKgo6JT0xfcfQ7W3+3sP9Gd+vJfxbZoFaQZwM+AXzLcr92bsWaL6n8f6c7vL4JyPCeBZ0uDkq77o27tyeyctaSuoXzXD2mZB6gHcLLya1xfrfhBH3F2CnYV+Nm5BfS6Yb27C88sxAf4ajx8EcDPmm+ri96/eSup1EKKBnCh4MA6eQPtRPAC/EGrN4VtQVfBxrV+sFrJyuuiUhnrBEB+YlVEAvLsH37biAdhKvGQkJ3TS0LgDO4vxmrdWBGAkJxz0BCclphI1a9HeBVP6JkwAEoD/CeAP3U729kMHHe8AAAAASUVORK5CYII=";

var gicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACcElEQVRYhe2VX0hTcRTHD0SP9SjUQ4hKbv4pm1u6JhFEVCL2ENGD0UME9haUFAQh0kM9xvRubnebRpFSIVELyRXhsheVIT1kWYIz1MwMy9Qo49PDT7cR5lZe7aH94Dzc3733fD/nd875HZGmMv6ppQHSAGmAv/rJb0c8OxB3AeLKU+YuQDxFiK9kFQH8dkQzs655Nxd6GwmP9TEyM8HIzAThsT4uRnQ2tVYi9TmIb6fBALoV0Yt5MhoBoGUwhD1YzcYb+8m6fYRzPS4W19sv45jbqlKDSEnca2Fz66GYgPhK1LHrNsRfqp49RYgzi2uv22OA0rjNAAB/Keub98TF3fm/j0y3srf9NFp/G+LMRgKOFQIEHIgzm3ezkwBUPjqvIl02VTbEsz018aQAug17sDoefapRGdYF7kJuDoYA6H7/AtHMxoonBdDMDEwNA3Av2oW48tcawMTQ9CgAkQ+vEM20xgCufEIj3fEaqM9ZugYCDsRrUSnSTHHTrSsE8Fo48fRyDKA8VKOEfhXXbdRG/AB8/jbDwKdhxmc/cqyzLjnEsi8DuxBXXgxg/sc84sxS+wnfbLi+j4yWCkS3kXnrcELXZCbvmqRH5LVQ3lETc/p4tBe5ukXdgImgfjuiW8m5czQOoOUaANBUhjTkUhvxxRw/n3yDeItVzr0WdfnoNsRdSEZLxSoALEAceHiGxHV/+BlVnXXYg9U4HpziePgSPRP9cUh3gYEAC+mQhq0c7DhLYCDIy6kos9/nmJv/SnR6jLvRMCe7rqjhpJkMmAVLFqZDVXZjoZqIiy3nylN7Xouqh1T9/TGA0ZYGSAP89wA/AZoF9N4ossasAAAAAElFTkSuQmCC";

var ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC2ElEQVRYhe2Wy08TURTGSboAlSjKq5SQSlH6cCsLYuIf4FpXLF2oTQpaSqf0YWdciAjRaOKKGGJIQEOIzxgFhZXEKIpPBExQjKJ27i2UdphOp+VzUSEhU8baoiamJ/k2d07u97v33HPn5u05FcS/VF4OIAfwXwBYuCB2n6SochNUMARahkDvobBwfwjAxFLs9FBUupKG207wOHBpAV2PRLyZk/GBxHFxREC5k/wS4rcALByFjiEw+Cj8dyK49SqK4SkJESkBAJgNxuG8HsahrhAujy6hfVBAtZduDICJpdjRTNDzRIRaXBhZwuZGHsUOgraNAjCzFGVOAiokVM1XYi6UQGETD+ZGBDW+LAEsXBBFdh5T3+WUZnJiOeX46EwMx64uwpAtQLWX4mjfosLg3oQELUOw9TiPylaCkWlJkdPQHYIh2xKUthDMBuNrJp74JkNjDWCXj6LWT1Hjo9BYA3gfkBV5ZS0kcwAzR1HZShQr896OoK49iP3n5ldVdyYI9m5EkVvmJLBw6++CKkCtn6K+Yz5ljdON+o55GP0ZAlS1EnQ+ELIC2NeZIYCFoyh28CknbegOId/GY3szWaMCGw+NNbCqfBuvaq4KYPBSHOlNnn4htrbV3n6VUWDjYf5ZWwtHUe4kaOwPo29MxJXHInqfijg7lMVFpHMRDL6TwEcSONgVUuzCwHgURXYeJQ6CLU08mgfCihz7QDjzNixtIRCkZZwfFqCxBvCRxhUGADBDUo9PB2QU2XnVDlAFKHEk2+9wzyL0HgqdiyhKsV4siAloGQIzq26uClDBELz+IuPmyygKm3joGIJNjTzCkvr/4NpzEcUOAlMa5qoAJjZ5wz37FMOLzzH0j0fROyZib1sQRpaifUjAw0kJY7MxDE1KOH1fgJGlqGDI6uHMCmAFQuci0LkIqtwEejeF0U9hZCn07uTbQMskv+s9NO1Vpw3wN5QDyAHkAH4APkBEEJ/n2M4AAAAASUVORK5CYII=";

var currentURL, txt = '';

var InTextBox = function (selection)
{
	$('textarea, input[type=text], *[contenteditable="true"]', document).each(function (i)
	{
		if (selection.containsNode(this, true))
		{
			return true;
		}
	});

	return false;
};

var getLastRange = function (selection)
{
	var lastRange = selection.getRangeAt(selection.rangeCount - 1);
	for (var r = selection.rangeCount - 1; r >= 0; r--)
	{
		if (!selection.getRangeAt(r).collapsed)
		{
			lastRange = selection.getRangeAt(r);
			break;
		} else
		{
			//alert("invalid range found");
		}
	} //fix Firefox bug? with selecting backwards: it creates an range at the end that is collapsed
	return lastRange;
};

var get_offsets_and_remove = function ($test_span)
{
	var curr_elem = $test_span[0];
	var total_offsetTop = 0;
	var total_offsetLeft = 0;
	while (curr_elem != null)
	{
		total_offsetTop += curr_elem.offsetTop;
		total_offsetLeft += curr_elem.offsetLeft;
		curr_elem = curr_elem.offsetParent;
	}
	var span_ht = $test_span.height();
	$test_span.remove();
	return [total_offsetTop, total_offsetLeft, span_ht];
};

var get_selection_offsets = function (selection)
{
	var $test_span = $('<span class="smarterwiki-popup-bubble-test-span" style="display:inline;">x</span>');
	//"x" because it must have a height

	var lastRange = getLastRange(selection);

	var newRange = document.createRange();
	newRange.setStart(lastRange.endContainer, lastRange.endOffset);
	newRange.insertNode($test_span[0]);

	return get_offsets_and_remove($test_span);
};

var fixPos = function (sel)
{
	var offsets = get_selection_offsets(sel);
	var offsetTop = offsets[0];
	var offsetLeft = offsets[1];

	if( bDis == 0 ) //DownSide
	{
		offsetTop += 1.1 * offsets[2];
	}
	else
	{
		offsetTop = offsetTop - 2 - $('#ShowUpBox').height();
	}

	var m_left = $('#ShowUpBox').width();
	var fix = 0;

	if (offsetLeft - m_left < 4)
	{
		fix = 4 - offsetLeft + m_left;
	}

	$('#ShowUpBox').css("top", offsetTop + "px").css("left", (offsetLeft - m_left + fix) + "px");

	$('#popuptip').css('margin-left', (m_left - 20 - fix));
};

var fixPosEvt = function (sel, e)
{
	var offsets = get_selection_offsets(sel);
	var offsetTop = offsets[0];
	var offsetLeft = offsets[1];

	if( offsetLeft < e.pageX - 300 )
	{
		offsetLeft = e.pageX;
	}

	if( bDis == 0 ) //DownSide
	{
		offsetTop += 1.1 * offsets[2];
	}
	else
	{
		offsetTop = offsetTop - 2 - $('#ShowUpBox').height();
	}

	var m_left = $('#ShowUpBox').width();
	var fix = 0;

	if (offsetLeft - m_left < 4)
	{
		fix = 4 - offsetLeft + m_left;
	}

	$('#ShowUpBox').css("top", offsetTop + "px").css("left", (offsetLeft - m_left + fix) + "px");

	$('#popuptip').css('margin-left', (m_left - 20 - fix));
};

$(document).mousedown(function (event)
{
	$('#popupwapper').show();
	$('#Gspan').empty();
	$('#ShowUpBox').hide();
});

function getTag(name, parent)
{
	if (!parent)
		return document.getElementsByTagName(name);
		
	return parent.getElementsByTagName(name);
}

function extractResult(html)
{
	var html2 = html.match(/<body[^>]*>([\s\S]+)<\/body>/)[1]; //select body content
	html2 = html2.replace(/<script[^<]+<\/script>/ig, '');

	$('#divExtract').remove();
	var divExtract = document.createElement('div');
	divExtract.setAttribute('id','divExtract');
	document.body.appendChild(divExtract);
	$('#divExtract').css('display','none');
	divExtract.innerHTML = html2;

	var translation = document.getElementById('result_box').textContent;

	$('#Gspan').html('<a style="text-decoration:none;" href="' + currentURL + '" target="_blank">' + translation + '</a>');
	
	$('#Gspan').find('a').attr('target', '_blank').attr('class', 'gootranslink');

	if (document.getElementById('dict'))
	{
		try
		{
			var details_link = getTag('a', document.getElementById('dict_head'))[0].cloneNode(true);
			document.getElementById('dict').appendChild(details_link);
			document.getElementById('dict').removeChild(document.getElementById('dict_head'));
			var dict = document.getElementById('dict').innerHTML;
			document.getElementById('Gspan').innerHTML += '<br><br><div id="dict" style="background-color:transparent; color:#000000; padding:0; -moz-border-radius:3px; margin:0 auto;overflow:hidden;">' + dict + '</div>';
		} 
		catch (e)
		{
		}
	}	
}

var MouseIn = 0, bTrans = 0;

var TimeOutHide = function ()
{
	if(MouseIn == 0 && bFade && !bTrans)
	{
		$('#ShowUpBox').fadeOut(800);
	}
};

function Init()
{
	var $DivBox = $( '<span id="ShowUpBox"></span>' );
	$('body').append( $DivBox );
	$DivBox.hide();
	
	$DivBox[0].style.cssText = "width:auto;position:absolute;z-index:10240;display:inline;line-height:0;vertical-align:baseline;opacity:0.9";

	$DivBox.on("mouseup", function (event)
	{
		event.stopPropagation();
		
		if (event.which == 3)
		{
			event.preventDefault();
			GM_setClipboard(document.defaultView.getSelection().toString());
			$('#ShowUpBox').remove();
			Init();
		}
		else if (event.which == 2)
		{
			event.preventDefault();
			GM_openInTab( document.defaultView.getSelection().toString() );
		}
	});
	$DivBox.on("mousedown", function (event)
	{
		event.stopPropagation();
	});
	$DivBox.on("dblclick", function (event)
	{
		event.stopPropagation();
	});

	$('#ShowUpBox').hover(function ()
	{
		$(this).css('opacity', '1.0');
		MouseIn = 1;
	}, function ()
	{
		$(this).css('opacity', '0.87');
		MouseIn = 0;
		setTimeout(TimeOutHide, 5500);
	});

	$DivBox.append($('<span id=showupbody></span>'));
	$('#showupbody')[0].style.cssText = "display: block;border:solid 2px rgb(144,144,144);border-radius:5px ;background:-moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%);";

	$('#showupbody').append( $('<span id=popupwapper></span>') );

	$('#popupwapper').css({
		"margin-top": "3.8px",
		"margin-bottom": "4px",
		"display": "block",
		"line-height": "0",
		"margin-left": "2px",
		"margin-right": "2px"
	});
	$('#popupwapper').css("background", "-moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%);");

	$('#popupwapper').append($('<a id=gtransicon href="javascript:void(0)"></a>'));
	$('#gtransicon').append($('<img id=gtrans src="' + ticon + '"></img>'));

	$('#gtrans').on("click", function (event)
	{
		event.preventDefault();
		var u = "http://translate.google.cn/translate_a/t?client=t&hl=zh-CN&sl=auto&tl=zh-CN&text=" + txt;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: u,
			onload: function (responseDetails)
			{
				var Rtxt = eval("(" + responseDetails.responseText + ")");

				currentURL = "http://www.google.com.hk/translate_t?text=" + txt + "&langpair=auto|auto";
				var Rst = '<a style="text-decoration:none;" href="'+currentURL +'" target="_blank">' + Rtxt[0][0][0] + '</a><br /><ul style="font-size:13px;">';
				
				if ( txt.indexOf(Rtxt[0][0][0]) != -1 || Rtxt[0][0][0] == '')
				{
					GM_xmlhttpRequest({
						method: 'GET',
						url: currentURL,
						onload: function (response)
						{
							extractResult(response.responseText);
						}
					});

					return;
				}

				try
				{
					$.each(Rtxt[1], function (index)
					{
						Rst += '<li>' + Rtxt[1][index][0] + ':';

						$.each(Rtxt[1][index][2], function (idx)
						{
							if (Rtxt[1][index][2][idx][3] > 0.005)
							{
								Rst += Rtxt[1][index][2][idx][0] + ',';
							}
						}
                        );

						Rst += '</li>';
					});

					Rst += '</ul>';
				}
				catch(e)
				{
					currentURL = "http://www.google.com.hk/translate_t?text=" + txt + "&langpair=auto|auto";

					GM_xmlhttpRequest({
						method: 'GET',
						url: currentURL,
						onload: function (response)
						{
							extractResult(response.responseText);
						}
					});
				}
				
				$('#Gspan').append($('<div style="padding:5px;">' + Rst + '</div>'));
				$('#popupwapper').hide();
				$('#Gspan').show();

				bTrans = 1;
				fixPos(sel);
			}
		});
	});

	$('#popupwapper').append($('<a id=openurl href="" target="_blank"></a>'));
	$('#openurl').append($('<img id=iconie src="' + ie + '"></img>'));
	$('#openurl').on("click", function (event)
	{
		$('#ShowUpBox').hide();
	});
		
	$('#popupwapper').append($('<a id=sbaidu href="" target="_blank"></a>'));
	$('#sbaidu').append('<img src="' + baiduico + '">');
	$('#sbaidu').on("click", function (event)
	{
		$('#ShowUpBox').hide();
	});
	
	$('#popupwapper').append($('<a id=sbing href="" target="_blank"></a>'));
	$('#sbing').append('<img src="' + bingicon + '">');
	$('#sbing').on("click", function (event)
	{
		$('#ShowUpBox').hide();
	});

	$('#popupwapper').append($('<a id=sgoogle href="" target="_blank"></a>'));
	$('#sgoogle').append($('<img id=gicon src="' + gicon + '"></img>'));
	$('#sgoogle').on("click", function (event)
	{
		$('#ShowUpBox').hide();
	});
	
	if( !bOpen )
	{
		$('#openurl').hide();
	}
	
	if( !bBaidu )
	{
		$('#sbaidu').hide();
	}

	if( !bBing )
	{
		$('#sbing').hide();
	}

	if( !bGoogle)
	{
		$('#sgoogle').hide();
	}

	if( !bPopNewTab)
	{
		$DivBox.find('a').attr('target', '_self');
	}
	else
	{
		$DivBox.find('a').attr('target', '_blank');
	}

	if( bDis == 1)
	{
		tip = tipup;
		$DivBox.append( $('<span id=popuptip></span>') );
		$('#popuptip').css({
			'margin-top': '-2px',
			'margin-bottom': '0px'
		});
	}
	else
	{
		tip = tipdown;
		$DivBox.prepend( $('<span id=popuptip></span>') );
		$('#popuptip').css({
			'margin-top': '0px',
			'margin-bottom': '-2px'
		});
	}
	
	$('#popuptip').css('background', 'url(' + tip + ') 0px 0px no-repeat transparent');
	$('#popuptip').css({
		'display': 'inline-block',
		'clear': 'both',
		'height': '9px',
		'width': '9px'
	});
	
	$('#showupbody').append( $('<span id=Gspan></span>') );
	$('#Gspan').empty().hide().css({
							"line-height": "normal",
							"width": "auto",
							"font-size": "16px",							
						});
						
	$('#ShowUpBox img').css({
		"margin-left": "2px",
		"margin-right": "2px",
		"height": "20px",
		"width": "20px",
		"border-radius": "1px",
		"padding": "0px"
	});

	$DivBox.hide();
}

document.onmouseup = function (event)
{
	if (event.which != 1)
	{
		return;
	}

	if( bCtrl && !event.ctrlKey)
	{
		return;
	}

	var sel = document.defaultView.getSelection();
	seltxt = sel.toString();

	if (seltxt == '' || InTextBox(sel))
	{
		return;
	}

	//GM_setClipboard(seltxt);
	txt = encodeURIComponent(seltxt);

	$('#ShowUpBox').fadeIn(150);
	fixPosEvt(sel, event);

	MouseIn = 0;
	bTrans = 0;
	setTimeout(TimeOutHide, 6000);
	
	try
	{
		$('#sbaidu').attr('href','http://www.baidu.com/s?wd=' + txt );
		$('#sbing').attr('href','http://cn.bing.com/search?q=' + txt + '&form=MOZSBR');
		$('#sgoogle').attr( 'href','https://www.google.com/#newwindow=1&q=' + txt );

		var UrlText = seltxt;
		if (UrlText.indexOf('http') == -1)
		{
			UrlText = 'http://' + UrlText;
		}
		$('#openurl').attr('href',UrlText);
	}
	catch(e) {}
};

var _style_setted = 0;

function OpenSet() 
{
	if (_style_setted == 0) 
	{
		$('#popup_setting').css('top','140px');

		_style_setted = 1;
	}
}

var SettingWin = function () 
{
	bOpen = GM_getValue("OpenUrl", 1);
	bBaidu = GM_getValue("BaiduIcon", 1);
	bBing = GM_getValue("BingIcon", 1);
	bGoogle = GM_getValue("GoogleIcon", 1);
	bFade = GM_getValue("PopupFade", 1);
	bCtrl = GM_getValue("PopupCtrl", 0);
	bDis = GM_getValue("DisPos", 0);
	bPopNewTab = GM_getValue("PopNewTab", 1);
	
	GM_setValue("OpenUrl", bOpen);
	GM_setValue("BaiduIcon", bBaidu);
	GM_setValue("BingIcon", bBing);
	GM_setValue("GoogleIcon", bGoogle);
	GM_setValue("PopupFade", bFade);
	GM_setValue("PopupCtrl", bCtrl);
	GM_setValue("DisPos", bDis);
	GM_setValue("PopNewTab", bPopNewTab);
	
	GM_addStyle('#popup_setting {text-align: justify;position:fixed;left:-moz-calc(50% - 330px);width:640px;background:#FFF;box-shadow:0 0 5px #222;padding:20px 10px 50px 20px;z-index:102400;-moz-transition:0.5s ease all;} #rol1,#rol2{text-align: justify;} #popup_save{display:inline-block;position:absolute;right:15px;bottom:10px;} .setting_sp_btn{height:18px;font-size:12px;padding:4px;-moz-user-select:none;cursor:default;position:relative;margin:5px;margin-right:60px;display:inline-block;} .setting_sp_btn.close{background:#DDD;border:none;} .setting_sp_btn::before{position:absolute;right:-26px;top:0;content:"";width:26px;height:26px;background:#6B4;-moz-transition:0.3s;} .setting_sp_btn.close::before{background:#C54;} .setting_sp_btn:hover{background:#DDD;} .setting_sp_btn:active{box-shadow:0 0 3px #999 inset;} .setting_btn_inside{font-size:16px;padding:4px;-moz-user-select:none;cursor:default;}.setting_btn_inside:hover{background:#DDD;}.setting_btn_inside:active{box-shadow:0 0 3px #999 inset;}');
	
	GM_registerMenuCommand("Popup Search设置", OpenSet, 'p');
	
	var StWin = document.createElement("div");
	StWin.id = "setting_wrapper";
	StWin.innerHTML += '<div id="popup_setting" style="top:-100%;"> <div style="font-size:16px;">PopUp设置:请选择需要显示的项目<br> </div> <div id="rol1"> <div id="Open_st" class="setting_sp_btn">选中视作链接打开按钮</div> <div id="Baidu_st" class="setting_sp_btn">Baidu搜索</div> <div id="Bing_st" class="setting_sp_btn">Bing搜索</div> <div id="Google_st" class="setting_sp_btn">Google搜索</div> </div> <div id="rol2"> <div id="Fade_st" class="setting_sp_btn">超时自动隐藏</div> <div id="Dis_st" class="setting_sp_btn">显示于文字上方</div> <div id="Tab_st" class="setting_sp_btn">新标签页打开</div> <div id="Ctrl_st" class="setting_sp_btn">仅按下Ctrl时显示</div> </div> <div id = "btnarea"> <div style="font-size:12px;bottom:13px;position:absolute;left:20px;">请在Greasemonkey的"用户脚本命令"菜单的"Popup Search设置"下打开此选项</div> <div id="popup_save" class="setting_btn_inside" style="display:inline-block;">Save</div> <div id="popup_close" class="setting_btn_inside" style="display:inline-block;position:absolute;right:85px;bottom:10px;">Close</div> </div> </div>';
	
	document.body.appendChild(StWin);

	$("#popup_close").click(function () {
		$("#popup_setting")[0].style.top = "-100%";
		_style_setted = 0;
	});

	$("#popup_save").click(function () {
		GM_setValue("OpenUrl", bOpen);
		GM_setValue("BaiduIcon", bBaidu);
		GM_setValue("BingIcon", bBing);
		GM_setValue("GoogleIcon", bGoogle);
		GM_setValue("PopupFade", bFade);
		GM_setValue("PopupCtrl", bCtrl);
		GM_setValue("DisPos", bDis);
		GM_setValue("PopNewTab", bPopNewTab);
		
		$("#popup_setting")[0].style.top = "-100%";
		_style_setted = 0;
		$('#ShowUpBox').remove();
		Init();
	});

	SetOpt = function ( btn, bVal )
	{
		if( bVal == 0 )
		{
			$(btn).attr("class", "setting_sp_btn close");
		}

		$(btn).click(function () {
			if (bVal) 
			{
				bVal = 0;
				$(btn).attr("class", "setting_sp_btn close");
			} 
			else 
			{
				bVal = 1;
				$(btn).attr("class", "setting_sp_btn");
			}
		});
	};

	
	if( bOpen == 0 )
	{
		$("#Open_st").attr("class", "setting_sp_btn close");
	}
	if( bBaidu == 0 )
	{
		$("#Baidu_st").attr("class", "setting_sp_btn close");
	}
	if( bBing == 0 )
	{
		$("#Bing_st").attr("class", "setting_sp_btn close");
	}
	if( bGoogle == 0 )
	{
		$("#Google_st").attr("class", "setting_sp_btn close");
	}
	if( bFade == 0 )
	{
		$("#Fade_st").attr("class", "setting_sp_btn close");
	}
	if( bCtrl == 0 )
	{
		$("#Ctrl_st").attr("class", "setting_sp_btn close");
	}
	if( bDis == 0 )
	{
		$("#Dis_st").attr("class", "setting_sp_btn close");
	}
	if( bPopNewTab == 0 )
	{
		$("#Tab_st").attr("class", "setting_sp_btn close");
	}

	$("#Tab_st").click(function () {
		if (bPopNewTab) {
			bPopNewTab = 0;
			$("#Tab_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bPopNewTab = 1;
			$("#Tab_st").attr("class", "setting_sp_btn");
		}
	});

	$("#Dis_st").click(function () {
		if (bDis) {
			bDis = 0;
			$("#Dis_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bDis = 1;
			$("#Dis_st").attr("class", "setting_sp_btn");
		}
	});
	
	$("#Open_st").click(function () {
		if (bOpen) {
			bOpen = 0;
			$("#Open_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bOpen = 1;
			$("#Open_st").attr("class", "setting_sp_btn");
		}
	});

	$("#Baidu_st").click(function () {
		if (bBaidu) {
			bBaidu = 0;
			$("#Baidu_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bBaidu = 1;
			$("#Baidu_st").attr("class", "setting_sp_btn");
		}
	});

	$("#Bing_st").click(function () {
		if (bBing) {
			bBing = 0;
			$("#Bing_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bBing = 1;
			$("#Bing_st").attr("class", "setting_sp_btn");
		}
	});

	$("#Google_st").click(function () {
		if (bGoogle) {
			bGoogle = 0;
			$("#Google_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bGoogle = 1;
			$("#Google_st").attr("class", "setting_sp_btn");
		}
	});

	$("#Fade_st").click(function () {
		if (bFade) {
			bFade = 0;
			$("#Fade_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bFade = 1;
			$("#Fade_st").attr("class", "setting_sp_btn");
		}
	});

	$("#Ctrl_st").click(function () {
		if (bCtrl) {
			bCtrl = 0;
			$("#Ctrl_st").attr("class", "setting_sp_btn close");
		} 
		else {
			bCtrl = 1;
			$("#Ctrl_st").attr("class", "setting_sp_btn");
		}
	});

	if( GM_getValue("PopupMenu", 0) )
	{
		var popupmenu = document.body.appendChild(document.createElement("menu"));
	
		popupmenu.outerHTML = '<menu id="userscript-popup" type="context"><menuitem id="Popupset" label="Popup Search设置"></menuitem></menu>';

		document.querySelector("#Popupset").addEventListener("click", OpenSet, false);

		document.body.addEventListener("contextmenu", function (){ document.body.setAttribute("contextmenu", "userscript-popup"); }, false);
	}
}
	
function Load()
{
	SettingWin();
	Init();

	//GM_setValue("PopupMenu",1);
	var UpdateAlert = GM_getValue("UpdateAlert", 0);
	
	if ( UpdateAlert < 2 )
	{
		GM_setValue("UpdateAlert", 2);
		
		//alert('Popup Search脚本更新, 请在Greasemonkey的"用户脚本命令"菜单的"Popup Search设置"下选择需要显示的项目');
		OpenSet();
	}
}

setTimeout(Load, 300);
