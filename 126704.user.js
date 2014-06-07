// ==UserScript==
// @name          Key Frequency Map
// @namespace     http://userscripts.org/users/thingy
// @description   Uploads a key frequency map of the current selection to imgur.com. Use Alt-f to activate, a url will apear in the top right on success.
// @include       http://*
// ==/UserScript==

var data = {
    keyboard: function (ctx) {
    	ctx.save();
    	
    	ctx.fillStyle = '#fff';
    	ctx.strokeStyle = 'rgba(0,0,0,1)';
    	
    	ctx.lineWidth = 1;
    	ctx.fillRect(0, 0, 382, 155);
    	ctx.strokeRect(2, 3, 378, 150);
    	
    	for (var i = 1; i < 5; i++) {
        	ctx.beginPath();
	    	ctx.moveTo(2,   3 + data.height * i);
	    	ctx.lineTo(379, 3 + data.height * i);
	    	ctx.lineTo(2,   3 + data.height * i);
	    	ctx.stroke();
	    	ctx.closePath();
    	}
    	var vert = [[2, 13], [41, 13], [47, 11], [59,10]];
    	for (var i = 0; i < vert.length; i++) {
    		for (var j = 0; j <= vert[i][1]; j++) {
    			var x = vert[i][0] + j * data.width;
    			var y = 3 + data.height * i;
    			
	        	ctx.beginPath();
		    	ctx.moveTo(x, y);
		    	ctx.lineTo(x, y + data.height);
		    	ctx.stroke();
		    	ctx.closePath();
		    	
		    	if (j < vert[i][1]) {
			    	var charlow = data.lines[i * 2][j];
			    	var charhigh = data.lines[i * 2 + 1][j];
			    	if (charlow == charhigh) {
			    		ctx.strokeText(charlow.toUpperCase(), x + 10, y + 20);
			    	} else {
			    		ctx.strokeText(charhigh, x + 10, y + 12);
			    		ctx.strokeText(charlow, x + 10, y + 24);
			    	}
		    	}
    		}
    	}
    	var special = [
            { name: 'del', box: [340,3,39,30], start: 18, unused: 1 },
    	    { name: 'tab', box: [2,33,39,30], start: 8 },
    	    { name: '\u23ce', box: [333,63,46,30], start: 18 }, // return
    	    { name: 'caps', box: [2,63,45,30], start: 8, unused: 1 },
    	    { name: 'shift', box: [2,93,57,30], start: 8, unused: 1 },
    	    { name: 'shift', box: [319,93,60,30], start: 34, unused: 1 },
    	    { name: 'ctrl', box: [2,123,34,30], start: 8, unused: 1 },
    	    { name: 'alt', box: [70,123,34,30], start: 12, unused: 1 },
    	    { name: 'alt', box: [277,123,34,30], start: 12, unused: 1 },
    	    { name: 'ctrl', box: [345,123,34,30], start: 12, unused: 1 },
    	    { box: [36, 123, 34, 30], unused: 1 },
    	    { box: [311, 123, 34, 30], unused: 1 }
        ];
    	
    	ctx.fillStyle = 'rgba(0,0,0,0.1)';
    	for (var i = 0; i < special.length; i++) {
    		var s = special[i];
    		ctx.strokeRect(s.box[0], s.box[1], s.box[2], s.box[3]);
    		if (s.name)
    			ctx.strokeText(s.name, s.box[0] + s.start, s.box[1] + 20);
    		if (s.unused)
    			ctx.fillRect(s.box[0], s.box[1], s.box[2], s.box[3]);
    	}
    	ctx.restore();
    },
    lines: [
        '`1234567890-=', '~!@#$%^&*()_+',
        'qwertyuiop[]\\', 'qwertyuiop{}|',
        'asdfghjkl;\'', 'asdfghjkl:"',
        'zxcvbnm,./', 'zxcvbnm<>?'
    ],
    positions: [[2,3],[2,3], [41,33],[41,33], [47,63],[47,63], [59,93],[59,93]],
    width: 26, height: 30,
    special: {
        10: [333,63,46,30], // return
        32: [104,123,173,30], // space
        9: [2,33,39,30] // tab
    }
};

document.addEventListener('keypress', function (e) {
    var text = window.getSelection().toString();
    if (e.altKey && e.keyCode == 402 && text.length) {
        var canvas = document.createElement("canvas");
        canvas.width = 382;
        canvas.height = 155;
        
        var ctx = canvas.getContext("2d");
        data.keyboard(ctx);
                    
        // calculate key frequency
        var dist = {};
        var max = 0;
        for (var i = 0; i < text.length; i++) {
            var c = text[i].toLowerCase().charCodeAt(0);
            if (data.special[c] || !/\s/.test(text[i])) {
                dist[c] = dist[c] ? dist[c] + 1 : 1;
                if (dist[c] > max) max = dist[c];
            }
        }
        
        // consolidate drawing positions... this is for keys with two or more characters
        var drawAt = {};
        for (var cc in dist) {
            var c = String.fromCharCode(cc);
            var pos;
            if (data.special[cc]) {
                pos = data.special[cc];
            } else {
                for (var j = 0; j < data.lines.length; j++) {
                    var lineIdx = data.lines[j].indexOf(c);
                    if (lineIdx >= 0) {
                        pos = [
                            data.positions[j][0] + lineIdx * data.width,
                            data.positions[j][1],
                            data.width,
                            data.height
                        ];
                        break;
                    }
                }
            }
            
            if (pos) {
	            var drawAtIndex = pos.join(',');
	            drawAt[drawAtIndex] = (drawAt[drawAtIndex] ? drawAt[drawAtIndex] : 0) + dist[cc];
            }
        }
        
        // actually draw
        for (var n in drawAt) {
            var pos = n.split(',');
            // this is slightly adjusted so it's never fully opaque
            var opacity = Math.round(Math.log(drawAt[n] + 1) / Math.log((max + 1) * 1.2) * 10000) / 10000;
            ctx.fillStyle = "rgba(255, 0, 0, " + opacity + ")";
            ctx.fillRect(+pos[0] + 1, +pos[1] + 1, +pos[2] - 2, +pos[3] - 2);
            console.log(n, opacity);
        }

        var dataurl;
        try {
            dataurl = canvas.toDataURL('image/jpeg', 0.9);
        } catch(e) {
            dataurl = canvas.toDataURL();
        }
        
        var style = function (div) {
        	div.style.position = 'fixed';
        	div.style.bottom = '10px';
        	div.style.right = 0;
        	div.style.background = '#030';
        	div.style.color = '#fff';
        	div.style.padding = '12px';
        	div.style.margin = '12px';
        	div.style.zIndex = '9999999999';
        };
        
        var confirm = document.createElement('div');
        style(confirm);
        var image = new Image();
        image.src = dataurl;
        image.style.display = 'block';
        confirm.insertBefore(image);
        var upBtn = document.createElement('button');
        upBtn.textContent = 'upload';
        upBtn.addEventListener('click', function () {
        	confirm.parentNode.removeChild(confirm);
        	
            var req = new XMLHttpRequest();
            req.open('POST', 'http://api.imgur.com/2/upload.json', true);
            
            req.onload = function (e) {
                if (req.status >= 200 && req.status < 300) {
                    var data = JSON.parse(req.responseText);
                    
                    var successDiv = document.createElement("div");
                    style(successDiv);
                    
                    var link = document.createElement("a");
                    link.target = "_blank";
                    link.href = data.upload.links.imgur_page;
                    link.textContent = data.upload.links.imgur_page;
                    link.addEventListener('click', function () { successDiv.parentNode.removeChild(successDiv); });
                    successDiv.insertBefore(link);
                    document.body.insertBefore(successDiv);
                } else {
                    alert('error uploading file');
                }
            };
            
            var send = new FormData();
            send.append('type', 'base64');
            send.append('key', 'aef5338c741bd86bed5cdc491c096f99');
            send.append('name', 'selection.jpg');
            send.append('title', 'Key frequency map');
            send.append('caption', text);
            send.append('image', dataurl.split(',')[1]);
            req.send(send);
        });
        confirm.insertBefore(upBtn);
        var cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'cancel';
        cancelBtn.addEventListener('click', function () { confirm.parentNode.removeChild(confirm); });
        confirm.insertBefore(cancelBtn);
        document.body.insertBefore(confirm);
    }
});
