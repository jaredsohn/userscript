// ==UserScript==
// @name           4chan-jetpack-greasemonkey-version
// @namespace      lalla
// @description    read the name you fucking retard i hate you
// @include        http://*.4chan.org/*
// ==/UserScript==



// was copied from my shit addon @ jetpack

//also auto nokoer

document.getElementsByName("email")[0].value = "noko";

//also the game


// TAKEN FROM USERSCRIPT "4chan expander" -- sorry but no name was avilable for credit.
var maxWidth = 1000, //set image max-width in px (default:1000)
	f=document.getElementsByTagName('form'),
	d=document.createElement('div'),
	a=document.createElement('a');
if(!f||!f[1]) return;
f=f[1];
d.setAttribute('style','text-align:center;font-weight:bold;font-size:120%');
a.setAttribute('onclick',"for (var j=0,i;i=document.body.getElementsByTagName('img')[j];j++){if (i.src.match('thumb')){i.removeAttribute('width');i.removeAttribute('height');i.setAttribute('style','max-width:"+maxWidth+"px');i.setAttribute('src',i.parentNode.href);i.setAttribute('src',i.parentNode.href);}}")
a.href="javascript://";
a.textContent="expand all";
d.appendChild(a);
f.insertBefore(d,f.firstChild);

/*pre*/

const op = 1;
const tip = document.createElement('div');
tip.id = 'bw-tooltip';
tip.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
tip.innerHTML = '<table><tr><td id="bw-tipcell" style="padding: 10px"></td></tr></table>';
document.body.appendChild(tip);

show = (<r><![CDATA[
        const td = document.getElementById('bw-tipcell');
        [td.innerHTML, td.className] = @tipinfo@;
        td.removeChild(td.getElementsByTagName('input')[0]);
        this.onmousemove(event);
        document.getElementById('bw-tooltip').style.display = 'block';
]]></r>).toString().replace(/\s{2,}/gm, '');

track = (<r><![CDATA[
        const TIP_X_OFFSET = 45, TIP_Y_OFFSET = 120;
        const tip = document.getElementById('bw-tooltip');
        const tip_height = parseInt(
            document.defaultView.getComputedStyle(tip, '').getPropertyValue('height'));
        const cursor_rel_y = event.pageY - window.scrollY;
        const tip_abs_bottom = event.pageY - TIP_Y_OFFSET + tip_height;
        const vp_bottom = window.scrollY + window.innerHeight;

        tip.style.top = cursor_rel_y < TIP_Y_OFFSET || tip_height > window.innerHeight ? event.pageY - cursor_rel_y :
        tip_abs_bottom > vp_bottom ? event.pageY - TIP_Y_OFFSET - (tip_abs_bottom - vp_bottom) : 
        event.pageY - TIP_Y_OFFSET + 'px';

        tip.style.left = event.pageX + TIP_X_OFFSET + 'px';
]]></r>).toString().replace(/\s{2,}/gm, '');

Array.forEach(document.getElementsByClassName('quotelink'), function(qt) {
    if (! (id = qt.hash.split('#')[1]) ) return; 
    if (id == op) {
        qt.innerHTML += ' (OP)';
        tipinfo = '[document.body.innerHTML.match(/<span class="filesize">[^]+?<\\/blockquote>/), ""]';
    } else if (!document.getElementById(id)) {
        qt.innerHTML += ' (CNS)';
        return;
    } else {
        tipinfo = '[document.getElementById(' + id + ').innerHTML, "replyhl"]';
    }

    qt.setAttribute('onmouseout', "document.getElementById('bw-tooltip').style.display='none'"); 
    qt.setAttribute('onmousedown', "document.getElementById('bw-tooltip').style.display='none'"); 
    qt.setAttribute('onmouseover', show.replace("@tipinfo@", tipinfo));
    qt.setAttribute('onmousemove', track);
});

/*end of pre*/