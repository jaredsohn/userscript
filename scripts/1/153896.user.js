// ==UserScript==
// @name        eL's OGame Helper
// @namespace   lward.co.za
// @version     11
// @updateURL   https://userscripts.org/scripts/source/153896.meta.js
// @downloadURL	https://userscripts.org/scripts/source/153896.user.js
// @grant       none
// @-run-at      document-start
// @include     http://*.ogame.org/game/index.php?page=*
// ==/UserScript==
var img_rec = 'data:image/png;base64,R0lGODlhEQARAPf/AANlIpLmrhmrSwFTGRGBNSPHWR2+UyG2Ux2mSxamRxGXPSHCWRCNORy0TxmuTB6nSxWjRQFbHwNYHRu2UBy3URK5Sgx+MB2rSgt+MNnn3UmuawmAMef47QBlGwx/MRGVPSO1VRK4SQp/MUjceSLmZf3//xCLOZzbsVjBfI78slTfhBu0T+X96y/Ta8vp1BCxRTu4ZSnragBQEgl/MjSXVB7AVRq1TxKROQ6VO5DqrQt3LBG5Sjm5Zrj9zwBTFgp/MAaHMzvxeROiQxWhQrP/zizMYSO4V9j75RGTQCLDVwzHSxnFUhu6UR26Ufb/+hmnSxWxSc3w1Xf7pTSvXFLaghekRmTejQJaHtb85DrVbPP99iPcYhmpS4DeoS34dIzqrR2mSaPZsxvSWQB0JAt/MyC7Viz0cB22UB23UBq0T/3//RGTOxGVP3zbnvj+/V7YhQ6UOZnJqZDorSO2VQqDMR60Twx5L/P/+RqyTCLIWQFdHQJcHxeoSbLXvhK1SRqSQW34nZPCpBOTPqj7wxaWPrbkxBOhRRm0T079iV77kyatVWTsksX+2R54OyfLYSrPaDX6eRSfRjG4YK/vxpXgrULEbgVtKIPDmR/FVkOSXBq+UST5bB69VGGyfSTPXXi5jBqkTGHjj6DUszKyXD73f378qPn9/CLMWfv9/VLdgBO7TgFvJGPYicjw1UXXdQR4KtP+4QVwKBq1TCjhZuz+8u/+9Ry0UTzHaySCRY/nrBupS4X7rQ+VPBesSiuqVYTipo/prgeXOirIYfj++RjRVhSAOQFxJxiwSrPxyRCFNvP/9xyzUCzxcQSVNRy2UNT43xiqSUXwfhq0Tpvlsxy1TwKKMRCQO5HYqwBxIQu6RxSgRR2sTgmbOQifO6HZtCfEX/n//CXVYQyWOiTkZeD96pnLqi/5deT56jWvYCK3VgqAMo7UpAxyLQt7Lgp8LguENvP++BOKOxqwTmbQiwVkIiLKWh/CVRCOOiDcXgNeHRWoSBGuRRKsRQx+Mf///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP8tsyXNxooJFM44ozChQZpDeP5xGZIAGr8XfipU2BHCz75eT/Q5kBXJAZR50wIAyyEnV4AuZY4lMMBJmzxVVo4o86fGyR1/k5ZQS1BggSEbBfBFS1SqBwt4phaJ4cTHURIhaE6RAIQlRSJEUgYF2WIP2qMFEJp4ikGKnBtajHaZMzMLk4AW2wTVCMdsE5EStYbBguRlXD0I3xDooaNgjisqyJ6B+0JME48b9EA88NGIgLhreUaoCJUlG4o4xiIYeSAjU7lmJ9780pJKyS0Ol8bsSYdgALsMYWC0YXWuiLAo/jphu3IAzIAOgfwVklSJEpNWqFzQWBXhAKgBAHB9TerjbQq6daI0xHtlSUKdKhL6AakWzJciXaO6ceN17x2AC3/kQ4YJ96wBxwds4KAAEtYwkEwshPxDQDsWWPDDDBuIoI4HGLhjhw7F/BMQADs=';
var img_att = 'data:image/png;base64,R0lGODlhEQARAPf/AMNRPb1RP/5uVqJHN5hCNJdAMs9YRMpUP8lVQbdOO3c1JplCM7hUQXQxJemCb/3//8dXQshWQshWQcdVQZlBM7hPPblUQZlBMvri3v7///qgkL5WQdGAcaVHNvPPx/qVf/tmS79TP/6FbvHk4PfW1PppUdBZRfxpUIU0JqtDMv7a09VeSshoVYg8LfdqTIs2J/yEb89iUKhENP7k4chXQapGM79NOXgzKKtEMqZIOPiqm8ZaRphBM5M/MNhjTvbk3+pwWsxYQMNTQW4mG/7t68JTP+m8tMt0ZZI4KNxoU/339/mYhd6Je82Jfp1NPe1uVuOEddFbSMVUQcdWQvlsUeWLe7BGMuakl8ZYRb9mVfz+/sFRPapMO/yKcu7a1uzb2PyEbc5dTLZFMdV8bv/9+qtFNPuXgZpCM7VHM+VWPvzSyfzSy7xPO8NUQMZPO300KKlFMvnx761LOqdLOcdSPnQrHfrx79FsWatKN55ENZI9MftnSthiTXgzJb5SP/HIwsxSPqlHOeaBbv1pTchbR7tKOf2Whvnp5OV4ZeJ9af2BaLZTQcx3a/3Vz+Kso8xUQeuqoI09MM55bbhTQPSDbqxEL93Hwd3KyOfTz+7Uz/qSf9RqVvyQe/Xt6tFYQ+/h3dFeR7d/d/pkR/349cpXQ9FdSP3g29y5tKRIN3MxJnUwI8ZsXNRjTuZZRM5VPut4ZuzOyeemnMVaRs2xrcZYR71rWe29tOfFvPz///XPx/r3969HN/2GcadXSpVDNb1JNd5cSMBQRPubhr1PPctbSPza0chOOK5gU7RNPNl7bf39+6lxZ6lHNtNgS/qUgf3EuplPQc5bRbREMtixquFVPuSNfflmSoY2KvXY1II4LIU5LYs1KMNWQ91qUcZMOahTRf3NxPHQytFbR/jY0/nw7rtQPbVPOu+AbJVBMs1jUMZRPLhUQnApHf7//ppCNP38/NJrWvvx76pIN/ZoUp1GNbVRPcdbR9JkULtRP7pQPrlOPNVdScFpV3oyJv///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9BQBABAo0JB0gdQCAhwpQpE/4FM5cvwBZvxGIESRfGGAA/AfAJkYCsiDpPVzqNa5UrDqQVgNqUM2EgAYBoHvytcbaHEzh/2HzQGbZPXAI3ttotAQFDAJgTmsj8ccWGTyk0Yx7osFZsxiAVpqhoyMDkVxJQYoyMmvcMlzBRZt6pcUEknI1uG5glc1DiQxdFjXiJMCSAEpQKzdb1O5ZFSiIgr36ce+IgCota2WRZGDKr065bugSlQUQuU6FPl1QRYsBumb8mtA5hoEYi3j0O/kLVscegwTVLSo6YqAasCit4djDp6bNjUgMU0L74c3Tn0aZYykb02qYAy6JU2l44TJmmxYs0WA9OfUPS4ga3egooDJBRiZ8kfYxWWamRI0+2EFy8wcMAHcgDRwpy4FAGHoGgQk8kc/zjCw8LVEjBGQu4s8AFBaDTAwH/BAQAOw==';
var img_esp = 'data:image/png;base64,R0lGODlhEQARAPf/AKqPJaeMJIVuGZ+EHYt0G1lICVxNC7OXJ6ySJqyRJKmOI6eMIqaLJF9PDZyCIWZVEf7//6GGIq+UJ7KVJ6eNJn1pFn1pFf///86sK66RJntlFa6SJWJSGMivRn5pF3xmFYhxGaSIIb+gLXplFerWgLycI8ikIs3DmLeZKZN7H9vEcNHInvPip5qDIPfmnK6RJHdjFa2SJuvfuK+UKamNHvTYXryeKqGHIK6QI5J7Hq+SJpuBIXJdE7aYKH5pFtPHnpJ7G/jvy8O1f6mdbZuBFrOYKfz+/aKGIdrKi5uKO+XbttHCf5B1FZyBG8zClNrGft/QksaqMeniwsuqLbyfLfz++tHIpLCVJayQJs2xN9+3HbCUKmhTBXxmE76iJrakY5J6HYBqGJZ6DOTFQ4lwE+rbqvry0lhHC7ueKoRtEci0ZvHfkrafRqKIIolzG39qG/TYYZN7Hq6TJ6SJIcCiK7eXJnFfE5Z+HW9bEc2sK9OvKbWbK35oFrCSJ3plFPfoq/z78vv14f7998q9iZN8H/Lu1v3//8/Ahop0HdfDZY11HHFbCevlyaKCC7WcKtfJiv798+fGTMakK8WlLVxLDdDAg9GxL9m1KNHAetXCed66Md29O5uAGZ2CH/r467SZKrWbKI93G82rLPbz5L60fbWXKfXu0e3kxpB7Ieno3rCRGseoK7eWHP7++9TLqFhKBfjll97CVaWKI6aKI/fqr6aXV35pFb+tWPDah/Deid/SloZ1JWpYD6GFIPfz4u7fneDRmeDSnZF5HdTFi8usMfXx4P357J+AD/z67+bFR450EKyOGVVCA+jdqObete7goX1pHVZHCvz00ti4QoFtF3JfE8qwNoZwHLKNDvLelKGII+HcvaOJIdHDkIlyGfb2831oGG9cEfXXYI94HJN6Hua9IK6TJuG+NKWJIMikIMCiKZx/FbWXJq+RKK+TKH5qFpZ8HL6hLG1ZELmYEpyBIKCGIXVjFP7++LWaKrCUKLGVKJKGT31oF7CTJnxmFwAAACH5BAEAAP8ALAAAAAARABEAAAj/AP/FaJchho58EiTImeEuA4IEOP5x6xRhToAE/Q4cmKCvD4BZ2m4EeLFjARYUdFaJwpBnyiQbExREqMOuBYBSkvRoGhMp2blLGKiYO6IOjYMNJSyRCIKsCiAz2Tal69EmiggHyzqYggTBkDEIEIwFSsQqhLV469R4YrHGiAtxsFrlwgXoEbosNGqNUqHlj6Aa0uDco1UuVqEvXhhwsHKoUaYLz6b9uvAEGxInDz5RYLYv1YktznwRKyYDVLdvQ17toVCAyy5XjIKVMdFM16ltSRY1cMQ6XBdlbJQAmwdFyi0iaewZwMfgjDwNiMRUWqIK07Bj8KjZMVBEVjRe1cKQTCH1Y9AKIUyujcBj4Eo9ShVAhLrDaUCvAU3oASEg4IGCFA2A4w0B44ARRw6EkCOMIm4IwAMq/7zhDx8W+GCBBxXY8g4/H/gBAzT/BAQAOw==';

if(window.name=='lw-fleet-auto')
{
	window.setTimeout(function ()
	{
		var next = $('#continue');
		if(next.length == 0)
			next = $('#start');
		if(next.length != 0)
			next[0].click();
		else
			window.close();
	},100);
}
if(window.name=='lw-fleet-auto-retreat')
{
	window.setTimeout(function ()
	{
		var next = $('#continue');
		if(next.length == 0)
			next = $('#start');
		if(next.length != 0)
			next[0].click();
		else
			window.close();
	},100);
}


$('#mmonetbar').css({display:'none'});
//$('body').children().first().removeClass('contentBoxBody');
$('#menuTable .premiumHighligt').parent().css({display:'none'})
$('#menuTable .menu_icon>img').parent().css({visibility:'hidden'})
var shop = $('[href*="index.php?page=shop#page=inventory"]').css({background:'black'});
$('#officers').append(shop);
shop.children()[0].style.border = '0px';
$('.build-faster').css({display:'none'});
$('div#info ul#resources li span.value span').css({fontSize:'11px'});
$('#banner_skyscraper iframe').attr('height','100');

$('#box').append('<div id="lw-tools" style="position:absolute;min-height: 600px; top: 40px; left: 1005px;"></div>')
$('#lw-tools').append($('.content-box-s'));


//$('.member_score').each(function(){this.textContent += ' - ' + this.title;});

$('head').append
('<style>\n'
+'#overview #planet{background:#000000 !important;}\n'
+'.lw-spyh-bad td {background:#400000 !important;}\n'
+'.lw-spyh-ok td {background:#003000 !important;}\n'
+'.lw-spyh-ok2 td {background:#002040 !important;}\n'
+'#lw-tools .content-box-s .content table.construction {font-size: 11px; margin: 0; padding: 3px;}\n'
+'.lw-btn {opacity:0.1;}\n'
+'tr:hover .lw-btn {opacity:0.3;}\n'
+'tr .lw-btn:hover {opacity:0.7;}\n'
+'.lw-btn-on {opacity:1;}\n'
+'</style>'
);

var mkbtn = function(img,title,href,onclick)
{
	return '<a title="'+(title||'')+'" href="'+(href||'javascript:void(0)')+'" onclick="'+(onclick||'')+'" style="margin:0px 2px 0px 0px;" class="lw-btn"><img src="'+img+'"></a>';
};

var spy_ajax = function(ctx,g,s,p,t)
{
	$(ctx).attr('class','lw-btn-on');
	var coord1 = 'coords='+g+'%3A'+s+'%3A'+p;
	var coord2 = 'galaxy='+g+'&system='+s+'&position='+p+'&type='+t;
	$.ajax({url: '/game/index.php?page=minifleet&ajax=1&'+coord1+'&'+coord2+'&mission=6&owncoords=0&shipCount=1&speed=10', context:ctx}).done(spy_ajax_done);
};

var spy_ajax_done = function(r)
{
	if(r.split(' ')[0]=='600')
		$(this).parent().children('input')[0].checked=true; 
	else
		$(this).attr('class','lw-btn');
};

var att_clk = function(ctx,g,s,p,t,n)
{
	$(ctx).attr('class','lw-btn-on');
	var coord2 = 'galaxy='+g+'&system='+s+'&position='+p+'&type='+t;
	window.open('index.php?page=fleet1&'+coord2+'&mission=1&routine=16&am202='+n,'lw-fleet-auto').focus();
};


unsafeWindow.spy_ajax = spy_ajax;
unsafeWindow.att_clk = att_clk;

$(document.body).ajaxComplete(function(e, xhr, settings)
{
	var pp = settings.url.split('/index.php?');
	if(pp[1]=='page=messages')
	{
		var rx_ok2 = localStorage.getItem('spyh_ok2');
		$('#messageContent').append('<div><input type="text" value="'+(rx_ok2 || '')+'" onchange="localStorage.setItem(\'spyh_ok2\',this.value)" style="width:100%" /></div>');
		var rx_space = /\s*/g;
		var rx_ok = /(Anti-Ballistic Missiles|Interplanetary Missiles)\s*[0-9]+/g;
		rx_ok2 = new RegExp('('+(rx_ok2 || 'cantmatch')+'|Small Cargo|Large Cargo|Colony Ship|Recycler|Espionage Probe|Solar Satellite)\\s*[0-9]+','g');
		var sr = $("[id=showSpyReportsNow]")
		for(var i = 0; i < sr.length; i++ )
		{
			var s = $(sr[i]);
			var sc = s.children('.fleetdefbuildings');
			var pi = s.children('.material').children().children().children('th').first().children('span').last()[0];
			var ppp = s.parent().parent().prev();
			var coord = $(ppp.children()[2]).children().first().children().first().text().split('[')[1].split(']')[0].split(':');
			$(ppp.children()[2]).children().first().children().first()[0].firstChild.textContent = '';
			$(ppp.children()[2]).children().first().children().first().prepend(' ('+(pi.outerHTML)+') ');
			var pppc = ppp.children().first();
			ppp.children().css({whiteSpace:'nowrap'});
			pppc.append(mkbtn(img_esp,'Send Probes','','spy_ajax(this,'+coord[0]+','+coord[1]+','+coord[2]+',1)'));
			var cargos = $(pppc).parent().next().find('[name=am202]');
			if(cargos.length > 0)
				pppc.append(mkbtn(img_att,'Farm','','att_clk(this,'+coord[0]+','+coord[1]+','+coord[2]+',1,'+cargos[0].textContent+')'));

			if(sc.length < 2)
			{
				ppp.addClass('lw-spyh-bad');
			}
			else
			{
				var t = $(sc[0]).children().children().children('td').text() + $(sc[1]).children().children().children('td').text();
				t = t.replace(rx_ok, '');
				if(t.replace(rx_space,'') == '') 
				{
					ppp.addClass('lw-spyh-ok');
				}
				else
				{
					t = t.replace(rx_ok2, '');
					if(t.replace(rx_space,'') == '') 
					{
						ppp.addClass('lw-spyh-ok2');
					}
				}
			}
		}
	}
});

