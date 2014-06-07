// ==UserScript==
// @name           Stack Overflow Chat Favicon Notifier
// @namespace      Aditya V. Mukherjee
// @namespace      Y. Jiang
// @description    Watches the SO Chat for new messages, and changes the Favicon accordingly. Fixed to work with Chrome. Also uses CANVAS to draw the favicon, less dependent on images.
// @include        http://chat.stackoverflow.com/rooms/*
// @include        http://chat.meta.stackoverflow.com/rooms/*
// ==/UserScript==

(function() {

    var title = document.title,
        SO_favicon_base64 = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAbGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf8AAAAAAAAAAGxsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/AAAAAAAAAABsbG3/bGxt/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsbG3/bGxt/wAAAAAAAAAAbGxt/2xsbf8AAAAAbGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf8AAAAAbGxt/2xsbf8AAAAAAAAAAGxsbf9sbG3/AAAAAGxsbf9sbG3/bGxt/2xsbf9sbG3/bGxt/2xsbf9sbG3/AAAAAGxsbf9sbG3/AAAAAAAAAABsbG3/bGxt/wAAAAAAAAAAAAAAAAAAAAAAAAAAVHibFE94oDxKeKRkRHiqkUx4ohlsbG3/bGxt/wAAAAAAAAAAAAAAAAAAAABLeKMPPHixUj54sIQ+eLC5Pniw3j54sP8/eK//QXet/0J2q/9Ed6k+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPXiwKkF4rf9BeK3/QXit/0J3q+xFdqnAQ3erhTt7s1Qqg8VSFY3cWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD94rwlCeKxzRHaqUUR2qis7e7MIAAAAABiM2QwJk+hyA5fv4gKX7v8AmfIbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZPoGQOX7oIDlu7tBZXs/wSX6+wJkeqCHXjmTiBy6QIAAAAAAAAAAAAAAAAAAAAAAAAAAA+R4QICl+4kA5fuhgWW7PMGlev/BpXr6wSY64MNjOkQJ23lTC9j5PwuZOSBAAAAAAAAAAAAAAAAAAAAAAAAAAAElu0JBpXr1QaV6/8GlevpBpbrfASY6xcAAAAAK2fkNi5k5PgsZuT4LGbkRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaV62wGlet+BZbrFQAAAAAAAAAALWTkIi1l5OUsZuT/LGbkWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmPkDyxl5MssZuT/LGbkewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmPkAixm5K0sZuT/LGbkoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmTkAixm5JMsZuT/LGbkwCxm5AcAAAAAAAAAAAAAAAAAAAAAgAEAAIAB8L+f+QAAkAkAAJAJAACfAQAA4AcAAOAHAADggwAA/gEAAPABAADwIQAA+MP///+H////DwAA/g8AAA==",
        canvas = document.createElement('canvas'),
        ctx, img = new Image();
	img.src = SO_favicon_base64;

    /**
     * thanks to Raynos (http://stackoverflow.com/users/419970/raynos)
     */
    var Shape = function() {};
    Shape.prototype = {
        sin: function(degrees) {
            return Math.sin(degrees * Math.PI / 180);
        },
        cos: function(degrees) {
            return Math.cos(degrees * Math.PI / 180);
        },
        drawStar: function(x, y, radius, points, context) {
            var r = Math.sqrt(2 * Math.pow(radius, 2));
            context.moveTo(x, y);
            for (var i = 0; i < points; i++) {
                x += r * this.cos(i * (360 / points));
                y += r * this.sin(i * (360 / points));
                context.lineTo(x, y);

                x += r * this.cos(120 + i * (360 / points));
                y += r * this.sin(120 + i * (360 / points));
                context.lineTo(x, y);
            }
        }
    };

    var max = 30;

    function changeFavicon(src) {
        var link = document.createElement('link');

        link.id = 'favicon';
        link.rel = 'shortcut icon';
        link.type = "image/png";
        link.href = src;

	oldLink = document.getElementsByTagName('link');
        for (i = 0; i < oldLink.length; i++){
            if (oldLink[i].getAttribute('rel').indexOf('shortcut') > -1) { //remove old LINK element
                document.head.removeChild(oldLink[i]);
                break;
	    }
	}

        document.head.appendChild(link);
    }

    setInterval(function() {

        if (title !== document.title) {
            title = document.title;
            var times, mention = false,
            ctitle = title;

            if (title.indexOf('(') === 0) {
                ctitle = title.substring(1, title.indexOf(')'));
                if (ctitle.indexOf('*') > -1) {
                    mention = true;
                    if (ctitle.length === 1) {
                        times = 0;
                    } else {
                        times = parseInt(ctitle, 10);
                    }
                } else {
                    times = parseInt(ctitle, 10);
                }
            } else {
                times = 0;
            }

            if (times === 0) {
                changeFavicon(SO_favicon_base64);
                return;
            }

            if (canvas.getContext) {
                canvas.height = canvas.width = 16; // set the size
                ctx = canvas.getContext('2d');

		ctx.drawImage(img, 0, 0);

		ctx.fillStyle = (mention) ? 'rgba(107, 162, 73, 1)' : 'rgba(227, 66, 52, 1)';
		var starDimensions = {
		    x: function() {
			if (times < 10)    { return 14; }
			else         { return 14; }
		    },
		    y: function() { return 6; },
		    r: function() {
			if (times < 10 || times > max) { return 1.4; }
			else { return 1.6; }
		    }
		};
		(new Shape()).drawStar(starDimensions.x(), starDimensions.y(), starDimensions.r(), 16, ctx);
		ctx.fill();

		ctx.font = 'bold ' + ((times > max) ? 20 : 9) + 'px "Helvetica Neue", sans-serif';
		ctx.fillStyle = '#FFF';
		var textDimensions = {
		    x: function() {
			if (times < 10) { return 8; }
			else if (times < 20) { return 4; }
			else if (times > max) { return 6; }
			else { return 5; }
		    },
		    y: function() {
			if (times > max) { return 20; }
			else { return 13; }
		    }
		};
		ctx.fillText((times > max) ? "*" : times, textDimensions.x(), textDimensions.y());
		changeFavicon(canvas.toDataURL('image/png'));        
	    }
        } //if
    }, 1000);
    console.log('SOCFN loaded » ' + (new Date()).getTime());
})();

