// ==UserScript==
// @name           Kamerka
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @description    Skrypt dodaje ikonę kamerki na profilu - link do transmisji.
// @version        1.2
// @copyright      2014, suchar
// ==/UserScript==
var $ = unsafeWindow.$;
	var l = $("#profile-actions h1");
	if (l != null){
        var a = document.createElement("A");
        a.href = "/kamerka/" + unsafeWindow.profile_login;

        var p = document.createElement("IMG");
        if (unsafeWindow.profile_transmission) {
           p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAK7gAACu4BrzForAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAABF0lEQVQ4T43TvUoDQRDA8ZDCKphSRBDEIk1atRCJrdj5Bja2KVKYIqSTYGElmCcIeQRBEUt9AxUsBEkbQjCkEdf/yGyYm9vDFD9ud77u2OVKIYSMo5u7FWyi7HMpmQ1NTUwR8IGGzacsFhQfaqM1xjpauMaBbRZ2wBVi4yVedP2oT/GNnaIBXVPYx7uuZ5BhEpN9p2iAHNxEi6IvvGGOT42dJgcIkvt4wDPuCxxjFedoxMY6NiBfYb8g5RYDXffigB5+8KqJZWUGSEAOzBd5cp1tXS8G1LCNNfx3Bnuo4Ay7fwMsglXYN8oNbPm6KBeg2A+48DVWLkCD3EZsHqHia6xcgIaOGXDi815mQ0MZT5CfaGhzaaH0C+XrmI3JqdeQAAAAAElFTkSuQmCC";
        } else {
           p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAK7QAACu0BAohJwQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAABGklEQVQ4T4XTMUtCURjGcWlokhwjBCEaXFrLQUR3t76BS6tDw22INrk0ODX4CcQPcAcHkcb8BiU0BNEqEYmLdPs/co6cezzehh/3nJf3fTzc4y2kabqVJIkcooIDs8/lF7r4Rop3NOH3ZLibFjToWuAEN3hEA+5MJqAPO/iAF7N+Mk9Z4wLBgHvYxgHezHoJhamm/R2CAXpxX7Ah8oM5VvgwtQ6CAVLHFDNM9mjjCBGadvAcZegU7glCxhiadWwDYvziFf5AnkyACnphfpNP13lr1tuAKs5wjP/eQQ1FXOPSBrhKcH9RN3CKUO/OLYgf0EOobyNU1G3Y4U/ouKG+jcwmiiI99U+zAVemtpdf0Cf8DH1EIw3nBySFP18sgjmoCVAjAAAAAElFTkSuQmCC";
        }
        p.title = "Kamerka"; 
		p.style.position = "relative";
		p.style.top = "3px";
		p.style.marginLeft = "4px";
		a.appendChild(p);
        l.append(a);
	}
