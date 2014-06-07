// ==UserScript==
// @name       lowbird viewer
// @namespace  http://www.staringowl.com
// @version    0.1
// @description  www.lowbird.com viewer
// @include    *www.lowbird.com*
// @copyright  Doron Shem Tov
// ==/UserScript==


var con = document.getElementById("content");

document.body.innerHTML = con.outerHTML;

var x = document.getElementsByTagName("script");

for(var i = 0 ; i < x.length ; i++)
    {
        x[i].parentNode.removeChild(x[i]);
    }

var y = document.getElementsByTagName("iframe");

for(var i = 0 ; i < y.length ; i++)
    {
        y[i].parentNode.removeChild(y[i]);
    }


var z = document.getElementsByTagName("object");

for(var i = 0 ; i < y.length ; i++)
    {
        z[i].parentNode.removeChild(z[i]);   
    }

var w = document.getElementById("viewer").getElementsByTagName("div");

var counter = 0;
for(var i = 0 ; i < w.length ; i++)
    {
        var cl = w[i].getAttribute('class');
        if(cl == 'center')
        {
            counter++;
            if(counter == 4)
            {
                w[i].setAttribute('style','display: none');
            }
        }
        
    }


function nav(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {

        var prv = document.getElementById("prevBar").getAttribute('href');
        var nxt = document.getElementById("nextBar").getAttribute('href');
        switch (evt.keyCode) {
            case 37: // left
                if(prv != null)
                {
                    document.location = prv;
                }
                break;    
            case 39: // right
                if(nxt != null)
                {
                    document.location = nxt;
                }
                break;    
         }
    }
}

document.onkeydown = nav;
