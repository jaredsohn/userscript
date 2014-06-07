// ==UserScript==
// @name           hurrrddddurrrrr
// @namespace      127.0.0.1
// @author         botnet/aperture
// @contact        o0101000 (aim/yim)
// @include        http://boards.adultswim.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cherne.net/brian/resources/jquery.hoverIntent.js
// ==/UserScript==
		
var init = $('.MessageStatusIcon');	

//preview compatibility fixes
var css = "position:fixed; "
        + "z-index:9999; "
        + "display: none;"
        + "color: #ccc;"
        + "font-size: 11px;"
        + "font-family: Arial, sans-serif;"
        + "background:#000; "
        + "left: " + (window.innerWidth/3) + "px;" 
        + "top: " + (window.innerHeight/4) + "px;"
        + "max-width: " + (window.innerWidth/2) + "px;"
        + "min-width: 100px;"
        + "min-height: 100px;"
        + "max-height: " + (window.innerHeight-window.innerHeight/4-50) + "px;"
        + "border: 1px #808080 solid; "
        + "margin: 0; "
        + "padding: 5px; "
        + "overflow: hidden;";

	var display = document.createElement('div');
	display.setAttribute('id', 'content');
	display.setAttribute("style", css);
	document.body.appendChild(display);     

	

	var dispConfig = {
		over: function(){
			var thread = 'http://boards.adultswim.com' + $(this).parent().parent().find('.page-link').attr('href').replace('/jump-to/first-unread-message', '');
			var currentEye = $(this);
			$.get(thread, {}, function(page){
				var post3 = [];
				var post1 = page.split('<div class="lia-message-body-content">');
				var post2 = post1[1].split("</div>");
				post3 = post2[0].split("<div style");
				var offset = $(currentEye).parent().offset();
				$('#content').html(post3[0]);
				$('#content').css('top', offset.top - $(window).scrollTop());
//change 1				
				$('#content').css('left', offset.left + 250);        //change offset to 250 to not cover textarea
				$('#content').show(500);                            //switch to show() to avoid opacity problem
//change 1
			});
		},
		timeout: 0,
		out: function(){
			display.style.display = 'none';
		}
	};
	$(init).hoverIntent(dispConfig);
//change 2
	$('td:not(".messageStatusIconColumn")').click(function(){     //keep preview open during reply (it will close on submit/cancel or if user clicks anywhere else within the thread listing table)
//change 2
		display.style.display = 'none';
});

//end preview fixes
//begin quick reply
var qcss = '<style type="text/css">'
	+'body{height:100px;}'
	+'*{background:transparent;'
	+'	color: #ccc;'
	+'  -moz-border-radius:10px; -webkit-border-radius:10px;}'
	+'  textarea#lia-body.lia-form-body-input{'
	+'  padding:3px;'
	+'  border:1px solid #ccc;'
	+'  width:175px;}'
	+' .lia-form-validation-help-text{display:none;}'
	+'.lia-button-wrapper{'
	+'	padding-left:10px;'
	+'	padding-right:10px;}	'
	+'div.lia-quilt-column-alley.lia-quilt-column-alley-left{height:5px;}'
	+'.lia-button{border:1px solid #ccc;}'
	+'	</style>';
var box = document.createElement("iframe");	
var notice = document.createElement("div");	

$(init).click(function(){
	$(notice).html('loading');
	$(this).parent().next().find('.MessageSubjectCell').append(notice);
	$(box).attr('id', 'replyframe');
	$(box).attr('src', 'about:blank');
	$(box).css({'display':'none','border':'none','position':'relative', 'width':'220px', 'height': '100px', 'overflow':'hidden'});
	$(this).parent().next().find('.MessageSubjectCell').append(box);
	
	var href = $(this).parent().next().find('.page-link').attr('href');

$.get(href, {}, function(page){
		
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    var doc = document.implementation.createDocument('', '', dt);
    var html = doc.createElement('html');
	html.innerHTML = page;
    doc.appendChild(html);
		
	var replywindow = box.contentDocument;
    replywindow.body.style.display = 'block';
    replywindow.body.innerHTML = qcss + $(doc).find('.lia-message-quick-reply').parent().html();
    $(replywindow).find('#submitContext_1').click(function(){
		$('#replyframe').slideToggle(500);
		$('#content').hide();
	});
    $(replywindow).find('#submitContext_0').click(function(){
		$('#replyframe').slideToggle(500);
		$('#content').hide();
	});
	
	$(box).slideDown(600);
	$(notice).html(' ');
});

});
//end quickreply
//begin link icon to actual link
var url;
var linkurl = document.createElement('div');
var conf = {
	over: function(e){
		
			var top = e.pageY-25;
			var left = e.pageX+5;
			$(linkurl).css({'display':'none','border':'none','position':'absolute', 'top':top, 'left':left});
			$(this).parents('.MessageSubjectCell').append(linkurl);
		
			$.get($(this).parent().find('a').attr('href').replace('/jump-to/first-unread-message', ''),{}, function(data){
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('', '', dt);
			var html = doc.createElement('html');
			html.innerHTML = data;
			doc.appendChild(html);
			url = $(doc).find('.lia-message-body-content').find('a').attr('href');
			$(linkurl).html(url);
			$(linkurl).show();
			});
			},
			timeout: 0,
			out: function(){
			$(linkurl).hide();
			}
		};

$('img[title="Contains a hyperlink"]').each(function(){
		$(this).attr('title', '');
		$(this).hoverIntent(conf);
		$(this).click(function(){
			$.get($(this).parent().find('a').attr('href').replace('/jump-to/first-unread-message', ''),{}, function(target){
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('', '', dt);
			var html = doc.createElement('html');
			html.innerHTML = target;
			doc.appendChild(html);
			window.open($(doc).find('.lia-message-body-content').find('a').attr('href'));
		});
	});
});

$(document).click(function(){
	$(linkurl).hide();
	});
//end link icon	
//begin emoticons
var em1 = '<img src="data:image/png;base64,';
var em2 = '">'
var ignignokt = 'R0lGODlhEAANAKEAAP///wAA/wD/AP///yH5BAEKAAMALAAAAAAQAA0AAAIsnC1yqYcMk3uRzcFC0vIKHl3Yt1leZRpgwILfwI6oFMszvMzdFaji0VLVDAUAOw==';
var err = 'R0lGODlhEAAQAOe6AA8VxRAWxREXxRUUxhYUxhQaxRYbxxcdxhoUxxsUxx0Uxx0Xxx8Zxx4YyB0jySAUyCEUyCIUyCUUyCcUySIZySMaySYbySkUySoUySsUyi4TyiwUyjQTyzUTyzYTyzsTzDoVzD0TzSQpyS0iyi0yzC40zTU6zTk9zjtA0D9D0UMTzkYTzkgTz0kTz0oTz04S0FES0FIS0FQS0VYS0VoS0mIS02MS02IW1GgS1GoS1WwR1W0R1XAR1nIR1nkR13oU13oR2HsR2H0R2H4R2H8R2EpP001S1E5U1Vpe13FT2mhs22ls2mls22tu23N43nd63nh73nt+33+C4IIR2YUR2YcR2oYS2YwQ25AQ25EQ25EQ3JIX3JcQ3ZgQ3ZwQ3p0Q3p8Q3qIQ36UQ36YQ36oP4KwP4K4P4bAP4bIP4bMP4rcP4rgP4rkP47oP47sP47wP470P45Bp4aR55sAP5MEP5MMP5MQP5ccO5cwO5s0O5s4O5s8O59IO59MO59YO6NgO6NkO6NsO6d4O6d8O6cEm5uAO6uUO6uYO6+YZ6+gn7OIz7Ok17eo47spM6sxP6uxC7+1h8fBy8/F484uO45ea5pib5qOm6aSm6aao6qqs67a47rm77r2+77/A8MGO7PKB9POH9fKJ9fe3+fi8+cXH8cfI8tLT9NPU9NbX9fnD+vrM+/rQ+/vc/OLj+OXm+f3n/f3s/f3u/vT0/fj4/fj4/v75/v/5//39/v7+/v7+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAAQABAAAAhYAP8JHDjw0CGCCBEaTCjQoEOHDP89fBjxEICJACpadHhxoUKDYjZCJNixo0iLAzMaNGnyH4CXDSdSdJlRosWXL0fWtCnTI8GeIxnW3BnRpUCiCXEehTkwIAA7';
var awesome = ''
+'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAO'
+'xAAADsQBlSsOGwAAAAd0SU1FB9oHCwQeFNPCjYYAAATISURBVEjH5ZZ7TJV1GMc/v/ccDkeBEFFB'
+'piJOwwRFQGHzQi5nUabm8jJymdfl0v5QmtqU5maulZqmttpqtsxb3iubkra8lhwu3vCyKQLnKCYo'
+'CgcQfof3ffoDOEPJ0tr6p+ef9/m9++35/J7n+/ye94X/wNTjbuzWJXjFjCmx9TZ7AJ7rVXy57Wo2'
+'+Fz/GjJ0YPeUeTOiVw9K6JjaOyFMqNUKBGwKbAHknyqn4MK9nLmLz2X6qHM9MSTr7YS89xbEDrBZ'
+'ICiUEkRAKUAUogREYWBR44PFHxSe+/TrS4MeG5L345j85MTgeOu+qVqCtuwUBOWHNEcQMILscuJE'
+'ZeHwCQeTH45nPPzCdeDl/ORnO8cTFKAMpfyBRKTZVQgWhqEwwttjhLfDsINVY6phqaHx2zeMyP/L'
+'TBbMTMgrdt/q7yVF3bzhZvKLkLUwHqtGo5RCaDq9KDtT5x+hxkzE4QjBabnYtHYwYloYoU55Y/av'
+'ezbtLcr4syqlTHu1hz567LgWEZ2clKQBvfGjodosmqita5O1WTRJS/kUPTi+s3Z73FpE9Jo1azSg'
+'UxIitNyaqs2iSbr0t/EaSGlTrs1r01bflzjShg9rrn2TfbyxFCPU6V//cqiMUePm0b1bdwAiIiIA'
+'yC28R/YBNwA9ogJZt2xQZhtIZES7VFv7Hk0AEfLz8zFNk8TUMXDfBBEMpTh80sPYMemINGEzMjKw'
+'LAvvvUq+O3QFQymsRpPwsMDxLbHtLc7IkV1Zv6Mar7cGyzQRwG6z4a2qhiAHymfSIr3b7SYqqmsr'
+'SYULFy/iDHQCglIG6WmRPAAJDQ5cQZCStH6X1KI5sU13ARCB1NhOUNuvqYACU17pzedbFnLsB/1g'
+'mxoBTJ/8DJY0ocM6t3uwu6KjQrNKCsdmUdWAn+C35vvQuhGNVqK1MstsJqBQjgCMbpsd/kxKy6qy'
+'MVXWkZw7fLvfQ6BT+cVXrZ485PuDA5aGDasGY3k1SkFVZQMPa+K6dO4uQ5I6sePgDW7utBNiBDz2'
+'+FTAicrrFL5+l7heQYhYuM5WtoGwa38pS+f1JTm+Awd3VhMTEta2co8ygTvBDeSeqaBfryCUUlTc'
+'qctp08IF56uXqzCnzMzoTUHDTRzKhkI1DxKFEr/XfHb1wLqmsYEunZxNmXUIlC+2uH9uA9l3uGT5'
+'rm3FCt1A+tRI3L4qLBG/wILC1D5sdgexKUlExkRTV1uLiOBUARTUlzH6hWgQYes3xXI098ayNuUC'
+'yLtcn/z8CPI/WTKAnvuymSMJKGXDEvDVa8bNn0vi6JH4auqwOQK4Xexh9/ur2eM+TeaiOKS+Dk95'
+'I0tWXUl95BT+cH3u+YlzTu62B9nl6N7hbKg+jVYWWBbps6fRLy2VhqoaLMui8X49Xfr04XJsB7q+'
+'ZPJuZix19XYKr3qTSzy3zv6tjpPHxmSV5Y3Xv7vG6YFPh+tRqqeW814tpyq05N7RctyjP3tnpY7r'
+'FaO3rhuqpew1fd01Xq/MGvjcE30ZhwyKSpg+ITpn1ry+xvfbr7EvuwQaO1NVW4sKvEv6kG7MmtkX'
+'Gk0O/HT7/JylZ950X6/I+0c/ErExkSlvTeu+uuNTttTE/uGEBDkor/By5oIXn0nOV3vKMnMLPC7+'
+'F/YHmekXyWCZXX0AAAAASUVORK5CYII=';

var meatwad = ''
+'R0lGODlhGQAZAIQZAP39/bkPAA0JCTQ0NFkRBlNTU8kUAMIRAM8WADMJBEJCQpANAXwiEMcuFdFQ'
+'MZgpE9zKoI+Pj9R6UdgaAL45Hq0XBuEeAMoiCrRrSP///////////////////////////yH5BAEA'
+'AB8ALAAAAAAZABkAAAXJ4CeOZGmeaKqWwie0azkE04QghnELBKxat6AklzsQfkAE5EYkQgKLwWkR'
+'DDaLh2zgdFhWr9lw1mT7NsXagM9VxYHFgfh2JLg5mGd03KEeNcx5YXJxMAMXVm9wg3Q3EFcGWQKC'
+'cRRQdA94RJEHCT0JAT0VCyUVj1kLnAAAEQQABX0kFG8JqAcCAAEFAAkVJgIPBo5ikoMEFbAlBMCQ'
+'Yp+DlicEDA9oB88LCWss0hAHF9YBlaIJMR8JDNLHC6AJ5OUuLwTZ2e/19u8hADs=';

var frylock = ''
+'iVBORw0KGgoAAAANSUhEUgAAABEAAAAZCAYAAADXPsWXAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'
+'/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB9oHDhQpF/E0L0oAAAVHSURBVDjL'
+'bZR9bJtXFYef+374246dxHGc1E2a0s6lH2uDlrVrhjpY0bZsgQrQxMfEJIT4kICtCKlCUBjaEAhW'
+'GELTJo1IpWItjA5pG0KrhrSu1VaxQZYSuqRrmyZp4ySN39qx/fr9vvzRpbSC31/36N7fo3PO1Tnw'
+'gR79xs4HDvz4noGVeN+jgw8dfm7P3wH2fmt776t//OLJtWvyxReev+/goac/9UZ7W0fyyR8ODXzz'
+'qzui2oqpd214Z0+vtjg0dIv/yfu7Gpbth9cURe/+72//0Wf29DYXrizvzHZGzIHbM5979tmLDx75'
+'/Y4DviOGRw/bRfXx7939q+F71/dGY8qxVIvy8JaNrfrqQiLx7mjlt/396UShK97i+YFWq3nlylX3'
+'Yl9H/gvTs9ULOwdbv/L228u/6MnkRtUvfX7jYCrrPbG2u2NoudFcP3PeU/Id8YdU3Wtpaw/jOFKT'
+'Ab3vTVZ/c9eu3IMO5i1t7ZHCpbl6dlOxfet0qZJTiNibBz7SpqnxRsGqq+ktWxP3yZCZX7c+yXLV'
+'kcmklk1n9NyLR+em0ml9OJHUSSZF7+pVCRqW2Xpxqj6mtGXCP3Bc6dUbrqi7y2zpT7K4YIue1Qks'
+'yxflsoVty+Yj3173eCym0ah7MhJRCYdV6Xh+rfAh/YRy6LF/+YsLzZltt7aRSoWYulDD9QI6O2JY'
+'lo9lByBldPvt2dsuTNVkd3dcGBUbs+mJhukf2fud4+PKbYZ6xBw1+oyKw6YNGd47WyUUUgDw/IBw'
+'WOC4Pq2ZMLouxPvnqvT1paibDi9+/Z//BlDS4difU887TLxeJpuNgJAk4zpXKzahkIofBNeAnsQw'
+'bArdcWbHq2g/WWJHuk0CqLtbc0ELysPH/jqNfNfCtgOqUUm2EEMqkqYXEGhgVj3G/1Ai+lqT+J9q'
+'5Dydx5Zm9182G3Pi4Ppb10xZjdN7Mh2JX8/PsLezBzcIOGM2MHSPIBDkAo1iJIZQBFKAAOZdm0+c'
+'+YcAUJ4x5o2PpjLzb1TLcijewtOLsxiBSyqssSucZnc0TV80yvHGVcatOr6UACz63nmAfD6P8tbS'
+'QnV6cX7+jleOilNDH6cYifHMwmXiispFx2LMqnOoXGJbPMnGaAJVCAAM3/sbQKlUQgE4V6+/qUvJ'
+'Ewee5IETr7H7ju1kVZ1G4HO+tszdW7ayuHsXr+DgS0kgJRO2dXxl7hSAyVjo2Pl9+zFdl0JXF/nV'
+'PQRSkpSC6KeHqd01SOXkmwwTQgWqgc/meOLUCkSsHI4Vt0lTUfA0jT7XRwmF0IVgrGoQF4K1iTSe'
+'kAgEZc8tn2hUN0x/bPDKyMjItUwAZnz3dJ8eZh0KaiiEADwp+XAyjR6J4CFBgpQSH1l6eblsjoyM'
+'/LccgCnHfglACIHCtccqYAcBBT1CsHInhDQ8t/SOUTZv6gmArYiX6r7PrGPzy1qJkFA47TT4rjvH'
+'JcdGFQIpJQLErOtMAPImSFdXFzmUmXnPqf9MK/N+Z4in3CscjJlEW+M8pVWo+B7KB987bpnvcIOu'
+'N3ZXqjWur0qdSqjKpgEnwipFpyp9RrGYjAakPPi56JSBkGLz2FsbgTMr3us79vVlw+wP4ud+qnZu'
+'qqu+/EvjqujRQjyS6EBxpdwnF8VRpzzpO8H0jQAA9cbARps4m/S/1vB9RtNSRALo9jUOqzUx5jYP'
+'HT574Z7jVeN3AOl0GsuyboZ0trdyZclYqEvG6+3hz4ZDmpiLCl7VTCaa5smxyUvDAxs6gstLDYDr'
+'gP9RPpsBYFWu7c7+YqF259Y+u7im68taSA8DFAqF/+v7DxKFZ6+gXn2PAAAAAElFTkSuQmCC';

var mastershake = ''
+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'
+'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHDhQrHFTQlEAAAAOUSURBVDjL'
+'jZRZTFxVGMf/595htjswSAcYyEzZCijYNoNQjbTGmKBp0phu9qFGX014MyY+uMVIusSYmJgYjdFo'
+'jWB8IGWwi0mrXSbBEsi0BaGV0g5hKNYw7Qyz3LnLnPP5UJhaYEr/Lydn+51z/t93PoYVat24qebt'
+'zj3NFUrplpt351+/oy6+X6FJp9658CPWEltue/Z3Dz5TVrMrUFkPNWdCEJ8bjl4rcdmdt3Z/90EA'
+'BSQtA56rae102hz4Jnz6SMORg6zx6Bt+t1U52lBWlcEjZFlqxXvBL/0j0b9N6NzY3f4CBkYvQhcm'
+'BKH0cQAYmZ7MAEBdXR0GRi/evxYXZhGkkkcBmM9Xjbm5+eW+56NPPm33VHgDOc6fLpGKOhSSa+IO'
+'doqbuRuGroUH+/uuXjj/xzUA2L7jRTCXzSb1fP5Vi6vY/f3Wto52m82KkeEh8rjtLGdySLIMzg3E'
+'7qbR+NRmVPv8+OvqZTF2ebQ7q6l9rLf/9C+NT7Yc0OLzaNpUBrvding8CafigM1aDre7FKHQWWzr'
+'aEX09j+orqrE+MQ8UhoDJ6bJjQ31Ow7u3/VsXe1GSJId4+PXkdU4/L5GuFzFAAC/vxbT01HEFuIo'
+'Lq5Ec1MT6muqcSJ4vB8A2JWJKSIiQQUkxKopYRgGybJcLgGgP0PnQoKIERVwmrFVQ8Fg8CbnfEEC'
+'gODgic/iaQMr1wkhYBgGOOf5MSICEWFgIPhxPg/2vLozNLuQFhuKbVIymcTQ0BAMw4DFYoHH40E8'
+'Hoeu63A4HOjq6oKmabyz8/mTvb0/3acGtm5xTM7ey2i6Sel0epUHyWSScrlc3gtVVVNer9cOANKb'
+'B5rr9r6sb5udGtdNkqAoSv66sVgMMzMzUFUVsiznvThz5vdsRbloBgAc/zZwLDu1nfp++JBimYKB'
+'eCgCx75+ixJjnXTo3ZZuaSrC2+4tkvrv7XBKNwmPI6GOYPKWQc0NjgSqvNXuQ4cPSwB23riTXff4'
+'VCpFT5Rg3xc9raGVYPf5K7PrAiKRCD0I6VJBaWtrA4DFbFZF1uDrvUB9kGBLgHA4DACQGVMTag5E'
+'hb3gnCfXKmkAgKIiSyKe4WCMrQkhIsiynCoIENxEIsOR1sy18h+MMQghREHAhlKXRkyisaiGiWgG'
+'uvHwHwBAiqIYa9ZEADj368+veX21rwjZ/pLD4dwcuW6tVOwWOG1SQnAezqjqb8OXLp38/57/AMnT'
+'Sa6iBWxQAAAAAElFTkSuQmCC';


var spaceghost = ''
+'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'
+'TDt6I/d/AA6HmgEkGu3HAAAAAElFTkSuQmCC';


var mudkip = ''
+'iVBORw0KGgoAAAANSUhEUgAAABMAAAAZCAYAAADTyxWqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'
+'/wD/oL2nkwAAAAlwSFlzAAALEQAACxEBf2RfkQAAAAd0SU1FB9oHDwMoG0BMgLAAAATSSURBVDjL'
+'lVVpbFRVGD33LbNPX2fa6TIM3WixQAcErKViwEItQSx1pwQTaoOiIJqyBQykNVqMIBUxbCVKWZTY'
+'KKaIIC5IFCKgAaEQu8zQBW2ZztBttvfm9b3rD2IFUpSePzf33HtO7s1373eAO5C98RAAoOz9nRNW'
+'V39S8mx5VaoW9wYyFPlU2drxSdPmXmQEGzzuhkikv3fxmRXP1zgfzcbR7369qxkzFGlKG1caAgdR'
+'lqnOJGjYWEe1s6wi4b+M7mrG8PoRhDAAQKiqUD46nleMtkoAWLrkheGZUVVtICwHqgxQhtcQWY6A'
+'sdpLAGDb9j3DM+utP31AlkRQlRKqMyPs90NnG8E4RyWnDOuahSUvom7HlsZuX99xT1cPeoIyVIWC'
+'cDzipxaOH5bZVzW7kQVA8vdsi0hSRJEH6M26EyhGW9ywC3AZwPFV877mtPoGhmUICEBVFZzZ7Lh1'
+'37R5pbfp2FsnFZVbkGChuPyHGxSgjgm5sdpY+wzCcmBYFlJ/f5Kz+BVzijMH7lPH2tuuXBjUHty/'
+'E+Sj/YdsGq3hwIXfTm2v2vh23enL3ZiaZcVzVftmRKeOOShCF+cPyyAMQ8O+60QfEw8l0O8XXfUn'
+'Gz3h+a01q4IAcHhNHrgenyfzgdz8gqTkjIJ4e9rmqVnWlUUb9xtHZ46p4wWLydUVpAAhoJToY+JB'
+'AbBanUEvCIVzfSc+n10+uyUiK91zN3y7jp2elz8ywZ5cyvE8NRitD02amNPmCfYWswkp030iQ/2h'
+'CCG9ngDltRxhWMLwOvhqNwdYU5R2prkjXZbEbJlyHRpLzFF2wcKlvCiJrwdDIUIYDj0SyXtG/Cwn'
+'e6CR/yWcSCTOBO/JL9iQr5MxpY4loCqVJVHHKSK9j/cRVpVh1PFZgpbJZqSIHDIYBa/BKMD7p5tm'
+'d9cIrCoZrFIHXXpjFxRFgTB5JmtOzSIqpZClMBHGTYGWaqCEQmAJQXdAPv2zy1/EtV1tChjN1maD'
+'gbUZYxyECwoYGRUBpSBpGgW5jZ+iOSoXKqFgm8/DIAYgd7TDCkqkWAuarrur9Vq+ofabMyLzbuXa'
+'gCSKv8sDA2DDHljULlAKKCqFT2KRLrdgYqcLUzwuFCgBFFmiUeycSKPSU+AXnJUVe39aHJGVrQDA'
+'AUBnZ9uRRIZ/ifU2sf0kilzyEbBSH7yqHoG+MGIdFmQKNug1eoQHIrgQuEEkhlaXr1m+rmTJSqzf'
+'/p4y+GhPfn/ElZaaMT+oGm313Sb6Y+IsEmF4XLEXwMPEIUxVhKiEv6Qgzvo8OO+ncEuclDJ+UuOX'
+'O9659vCrlWg/d+LfHzAqLeWww5Fe1ks0JJQ0hnq1iYQxWSBH2ykCfcTKc1A4DXX3STQAHhpHahJv'
+'zyiNS05zntq2vnbwZKWLlmHf3l392ZMfvOSjmgJRY9SLHW0hVR1QOXM0x0lBGOUQOj0dJxpaXC8z'
+'hLYqEbGdQPmh4+zxD3ytTV23ZcCy197Ah1s34LEVmyr4xIxy0XttD9Xrb5jH5qyUW+qbA1cuZQS8'
+'V0efO1bbfGdjmFC0EBfr9g4RJuuqRucuLvdOKyoeCQD5b37cml+++61/1h95YsG9RdWc1ZuG6lHk'
+'/sx0AQDWLl+EYaHw8YKb45xZmPHkvEE+d87T/6v9G70PFdgr03GrAAAAAElFTkSuQmCC';

var squid = ''
+'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'
+'/wD/oL2nkwAAAAlwSFlzAAANEgAADRIBtYA3dAAAAAd0SU1FB9oHDwQsFcbXfjYAAAVWSURBVEjH'
+'tVZbTJRHFP5m998F98ZF9gbuAuIlrQhKdAtaERKpRRERQUXWhdZCqKZ9sdZYqdW0jX2qSdOqLUaT'
+'It5AQ0VsQTEaAUWxeL8UURBkYZeVBXaX/eH/d/pgsWK8gGnPy8w5kzPffHPOmTnAS2RxQhz+V9ma'
+'ngIAyM4y/pG/ZWv3hi/yfzKZTDlD66uyske1H3nesD3PBJtErdDcvlQh04dEx2zYSjmeJ65+56CH'
+'89xuqK9vyctdnZy+fAWKDx0cEYjwWWWbcRnW79mP5TqffZGW5vfk2vHwmmkgHp6HUMAIGYZRj9Pp'
+'Jpvb27mjR4rPjZSJ4Fll477D+DIrc1t0X2caa7dTjvIAFYICAAUIIRCJxTCajMGjuS7meYPPgMOg'
+'9jhpC8sTCXkC4HI6ARC0PmzFnVs3Ye7sDE9ZnCIp/a3UNWomAGCX+jshEBFCAfQ7cOn8BewtKMDF'
+'ujoAFIE6Hc3IyIiJjYub/sZMvtm9N3lmQiQVCUFpl4VMCAuBwk8BH4UPpDIZ/Pv7yRiJhGMYsQFA'
+'zRsxAYA+X42FCBji1W1DsFINtVqLk5UVOFN1GqzbjerqaiY8MvLTNwr8UxBvSaFILgWxmgHOA7af'
+'hU6vx/SoadAGBSE+Lg6+vn4h7xhmJg355ObmZuz6eZd8RtSMV6cwAOzMX48250BTYK8tT+l0CRvl'
+'/tAbDAgLmwiZQg4Rw0BAhOjp7cGNa9dqpVLJXGWA8tytOzfT/qxviLh6/er+1xbj05qJCe+ZY7XK'
+'e6IMJOTb7RjkPfBiRDhV8TuKCgvRbumgAkqJRq2BSOxFdeN05NGj1tKzZ88ueS2T7OzsqVeuXLFE'
+'REROCHPYotzOPlyTBaCuoRbHK47CTZyIT56DOQkx5K1pU8yWh9b3VcoAM8d5Tg0MuDeqVGq2ra3t'
+'5UxycnKETU1Nl2UyWaSHdeHtXjPtUQeQqIx0jBkrhYfjQAFQSgEAbA+Lh3+1+Xa2tvfsKSgcWeAL'
+'Cgp4jUazhHWz89w8pilXm0hU1jLwg0D0pNnwFyjx4G4zzM1mxE6NQ/WZmsd2i23FqwBeGRNjtjE8'
+'OnHGdYWfAsQDdHfY4WZZSP0lILwAvbZeaMerUFV+5uivPxYtHXUKr1r8kWBsoF+Vr9IXLOtG3fkL'
+'4EQclPoASORj4K0QQxuqQpe1i4aHT0mNnx8X+az/2s8+eTGT9Mw0FBeVIDU5VaOcrFwzd/7sfM7D'
+'EW6Ag9hbDJ7ygMcDSv5xowClHjj7nNTR5SQD7sELYsa7ts/pcNy/2XTCV6q419rRbjteevxfkHWb'
+'PmcsnY92TJ46MScwVIu7N5pgt3ZTp5slc+fHgPESUcIAlKcE5MnpqIdCyAhRd7qec9j6Ng9S3jGG'
+'8c5T+PuozM3m/oNFh/TDmBizjfs1IVoBIyI7rWabShOkOqAKDBDaLDb0PHac9AnwSQDhYe+2N0QY'
+'pk13uRxovvXgPiMWiyKiI3TmFvPjuqr6lSVFJRVDey5KWYSy0rIndZKSmoLDBw4fqT1TW6KSq/UB'
+'48YWK3xl92oq6z7+5YfdK2LnzfoKHK76NeonSiaI/Lu77BGs3d0YGDaufNOazQuC9SGxWp12UnCY'
+'zjR+YmjjxZr664lJC1B+rPzF2ZW0MMnLT+MHfoDjHtxtlCYsTrRbrB2x92+11FRWVtKvv9+Sceni'
+'Zeuxg2Wn1uWv6wrUBYXWVde6NFq1os/pyPUWe3/Xcq/t/Imy8lkjej0XJS+MWbly2bB/Y3XehzuG'
+'5qYPjIbklIVrX+SbmLTgzTuZ2e/OmpSZnflUT1u6NOs/bZXi4ucO01NTlwwbXyZ/A+sCLlIcPQUF'
+'AAAAAElFTkSuQmCC';	

$('.lia-message-body-content').each(function(){ 
	$(this).html($(this).html().replace(/:awesome:/ig, em1+awesome+em2).replace(/:err:/ig, em1+err+em2).replace(/:ignignokt:/ig, em1+ignignokt+em2).replace(/:meatwad:/ig, em1+meatwad+em2).replace(/:frylock:/ig, em1+frylock+em2).replace(/:mastershake:/ig, em1+mastershake+em2).replace(/:spaceghost:/ig, em1+spaceghost+em2).replace(/:mudkip:/ig, em1+mudkip+em2).replace(/:squid:/ig, em1+squid+em2));
});
//this breaks the spoiler function somehow. the below fixes it
		$('.lia-spoiler-link').each(function(){
			$(this).removeAttr('href');
			$(this).css('cursor', 'pointer');
			$(this).click(function(){
			$(this).parent().find('.lia-spoiler-content').css('display', 'block');
		});
});
//end emoticons
if(window.location.href.indexOf('replypage') == -1){
$('.lia-message-body-content').find('a[href$=".jpg"],a[href$=".png"],a[href$=".gif"]').each(function(){
	var expando = document.createElement('a');
	if($(this).parents('div').attr('class') == 'lia-message-body-content'){
	
	$(expando).html('<font style="font-size:8px;color:#ccc">[+]</font>');
	$(expando).insertAfter($(this));
	$(expando).css('cursor', 'pointer');
	var show = document.createElement('div');
	$(expando).toggle(function(){
		$(expando).html('<font style="font-size:12px;color:#ccc">[-]</font>');
		$(show).css('display', 'none');
		$(this).append(show);
		$(show).html('<img src=' + $(this).prev().attr('href') +' border=0 height=400');
		$(show).show(2000);
		
	}, function(){
		$(show).css('display', 'none');
		$(expando).html('<font style="font-size:8px;color:#ccc">[+]</font>');

		});
	}
});
}