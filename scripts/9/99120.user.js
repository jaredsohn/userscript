// ==UserScript==
// @name      twDesktop
// @namespace    http://itholic.org
// @description   Enable desktopNotifications in chrome just like googlemail
// @include   https://twitter.com/*
// @include   http://twitter.com/*
// ==/UserScript==
// UPDATE INFO http://itholic.org

// Version 0.1 stable

function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script); // run the script
	document.body.removeChild(script); // clean up
}

if (window.webkitNotifications) {

	window.addEventListener("load", function() {

		// script injection
		exec(function() {
	
			var popup, lastcount = 0;
		
			// fun w/ twitter's jQuery
			$(document).ready(function(){
		
				var popup;
		
				if ( window.webkitNotifications.checkPermission() ) {
					var dlg = new twttr.widget.Prompt({
						modal: true,
						template: {
						    title: "Do you want Twitter DesktopNotifications?",
						    content: (new twttr.views.Prompt({
						        ok: _("Yes"),
						        cancel: _("No")
						    })).html()
						},
						callback: twttr.bind( this, function(){ window.webkitNotifications.requestPermission() } )
					});
					dlg.open();
				}
			
				window.onfocus = function() { $("body").attr("meta-focused","1"); };
				window.onblur = function() { $("body").attr("meta-focused","0"); };

				$(document).bind("newItemsCountChanged", function(event,count){ 

					if ( count != lastcount && count != 0 && window.webkitNotifications.checkPermission() == 0 && $("body").attr("meta-focused") == "0" )
					{
						if ( popup != null )
						{
							popup.cancel();
						}

						var html = '<?xml version="1.0" encoding="utf-8"?>'+"\n"+ 
								'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'+"\n"+
								'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de-DE">'+"\n"+
								'<body style="margin:5px;">'+"\n"+
							   		'<div style="height:62px;background: url(data:image/jpg;base64,'+
								   					'/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPD'+
								   					'QwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoP'+
								   					'Dxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAA'+
								   					'RCAA+AFoDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAABQYEBwECAwgA/8QAORAAAgEDAgQFAg'+
								   					'IHCQEAAAAAAQIDAAQRBSEGEjFREyJBYXEUkQeBMmKSobHR8BUWIyQzQkNEY/H/xAAaAQACAwEBAAAAA'+
								   					'AAAAAAAAAAEBQACAwEG/8QAJREAAgICAQQCAgMAAAAAAAAAAQIAAwQREgUhIjFBURORFGGh/9oADAMB'+
								   					'AAIRAxEAPwC3pohLPIWw2G5fMoPoP51CgurWW9e2MUalSQGKrhuXqPyqc7jxpx/6HP7IpL1EfU3b2zt'+
								   					'DDC91Msks6ZUHmJA9s/yrWmsOTuDZFrVaK/cbnSF8rGkBx1IVTipOmL4ZdNuinb5b+VK/D+iQWF49zD'+
								   					'd2kpCFOS1UADOP0sH222ppsW/xpfZV/i1UdVU6B3Na2Zl2w0ZNofqmpLZIORDNKSB4aEZx3PaonFmsr'+
								   					'oumeLkeLK3hx5Gdz649qRm1dp1yznJ3OT19/mi8TEa4cviA52euOeA9xxs+IzkLfW5iPqyNzCj1vcQ3'+
								   					'ESyQOroehBqpLm/yCA2/bNSNA4ll0u9XxCXtnYCRc9B0z8j+FF39N0nJP1AMXq5L8LO4PzLX23rVmCq'+
								   					'WJ2AycDNaQXEN1CJbeRJEYbMpyKBcRz6jp7RXVjPG0bHkeGUDHN1BBG/zSpKy7BfmPLbRWnP2IbtLu3'+
								   					'vI/FtpUkTuDXfmXuPvVOLqep6HPJNFccviDzgYIPrsPamjS+ItQn020mdpGaSFGLYXclQe1HW9OdD2P'+
								   					'aA43UUuXuO4jFzM15eqATyy9v1VqDd6WZppJ4XMbyf6ivDzo/pkjIOce+/qNhRS90HTL+bx7u1SSQgb'+
								   					'muH91dFH/Rj/ACzQCsVOxGDorjTCD7HS/prxZ2kiJVCipBb+GDnHXzHPTYbUX0xj9Zcq2QVjjznv56i'+
								   					'3HDiPA8EN9dR274DRMwkUrkEjzZIzjGxqQ8Fvoel3Mmn2XMI0aTwY9jIQOnzioSXMiqqLoeoifjNeeC'+
								   					'+lRxFJJMsxj5gCBsA39e9JiySxru2w7HpUk6nY8R8Uz6zfWttYxW8XPIjzlhK+QFJ5ttsZwB96icQ69'+
								   					'aXjEW8hklX/AHLCQqqf1j1+O9GU9VOLeuJwJ+z8DcX5HTf5aNeGA1/s5PqaeOLcsxlxzYI2xjOawLvz'+
								   					'ddqGG5ZgOVjv6DetEmBcqD0r0WyfcSHHXXYR40bXL+AIlvMwJOFwcHHz6/B2qdecTTSkC/md3Q+VDjA'+
								   					'PwAP35pFgvXhbKkj3re9uJJQZ4wWKjzL7d6yNVfLkVlONxPHkdSbreqGVWf1AJAq5tC0OKDRNPhkQ88'+
								   					'drGrZ7hQKpDg6wk4l4ns7MLmBHE07DoEU5P32H516NA2FK+o3+QVI76bjCtCWmaAcUa5Npb21taxxme'+
								   					'75lSSRsKhGNyPXr3FMB6Uj/AIpwiXR7eSG4WG9jnH04b/kJ6qNu2/5Uux1VrQGEOyi4pYodGEbzi6zt'+
								   					'tLE0pQXbZVbcPk8wJHUdBt1oFb8Ylf8AMS3bs5G8TKojb2AxkfOfnPSq11y8ljl8KRnd16sertUCx1V'+
								   					'Y75Ip7ZrlJcqYXDAtkY2x6/0aati0UVliNxOLcrIZdNqOXHXBQKLxLoUImsnCzy2w2IB3yPb19qrK5u'+
								   					'5ru5CZ5FQZSNdwcdSc7sfc16Z4Ktb+34bs7fVkVZUjAWPGWRPQMehbHXG1cta4E4b1lxLeaZEs4ORLD'+
								   					'mNs/K4zQH50LhnGyPR/qNhUwQgGeb1lkZeVmwvYDGa2SQxYYdO3erM4r/Ci5hla44efxouvgSMA6/B6'+
								   					'H91IU3D2spqDac2nzG8C8xgC+bHfHamteQjDYMAapgdETMDCbHKc5+9EIVyOYZ8uzEbGh3DWjajqWtf'+
								   					'2Vacn1ao78kjcvLy9Qex6U4aNwjrOqTXca8lleWoQPBcow5w2dww69O1brk1AbYwS3FsJ8BJHA/EFhw'+
								   					'zdXLz2Yb6krzSw/pbenL7k+lXNFIJI0kAYBlBAOQRmqksOC+J7S9ilS0s+aKQOrvMGXI9cYzVjRycQ+'+
								   					'GviW2mc+BzYnkxn9ilOctTuGQj9xjgm5EK2Q1QzWdFtNXEH1YkIgYsgRyu5GPSilYwO1LlYqdiMWUMN'+
								   					'GVNxLwrpq6nHyWF3H5G5WjkJIdiMMxx0HQD3PWm7gnTLeytgq6JDZSg7yDLs3uWbLU14FfYFQvYx8mM'+
								   					'gRFHiAJhRio15dGBTjGfepeK5TW8cwwwrgloi69xTq9veRxafbGRACZCYwAdtuVy2B9jQOz166Mjazq'+
								   					'DBJfNErYJKR56Dp1O5qwbvQIJsnOKD33Ck1wnJaXiwcxPOWUklehx79vSsmUg8gZcHY0RFuK+SbiC01'+
								   					'W2jjW6MeJLlF8zxnbB+ceu+Ke7DUzOBzqCTtn1oJYcCR2OpQz21xi3MZE6tktI/oc9P/gpptdOht8Y3'+
								   					'xXaueiXPecfW/GSlIZQd6+Kj3+9bAADArOK0lZ//2Q==) no-repeat left center;'+
							   				'font-family:Verdana;font-size:10pt;padding:10px;padding-left:115px;line-height: 62px;">'+
								   		( count != 1 
								   				? _("{{count}} new tweets", { count: count } ) 
								   				: _("1 new tweet")
								   		).replace(/(\d+)/,'<span style="font-weight:bold">$1</span>')+
							   		'</div>'+"\n"+
								'</body>'+"\n"+
								'</html>';

						// Show the popup
						popup = window.webkitNotifications.createHTMLNotification("data:text/html;charset=utf-8,"+encodeURIComponent(html));
						popup.onclick = function(x) { window.focus(); this.cancel(); popup = null; };
						popup.show();
						lastcount = count;
					}				
				});
			});
		});

	}, false);

} else {

	var dlg = new twttr.widget.Prompt({
	    modal: true,
	    template: {
	        title: "Sorry, your Browser doesn't support DesktopNotifications.",
	        content: (new twttr.views.Prompt({
	            ok: _("Yes")
	        })).html()
	    }
	});
	dlg.open();
}