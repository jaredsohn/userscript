// ==UserScript==
// @name           RTM Keyboard Shortcuts
// @namespace      http://www.lingnik.com/
// @description    Shows keyboard shortcuts for Remember the Milk before the body of RTM pages.
// @author         Taylor J. Meek
// @homepage       http://www.lingnik.com/software/rtmkbd/
// @include        https://www.rememberthemilk.com/*
// @include        http://www.rememberthemilk.com/*
// @exclude        http://www.rememberthemilk.com/services/modules/gmail/*
// ==/UserScript==

var shorts = 'Add(t)&nbsp; &nbsp;Complete(c)&nbsp; &nbsp;Postpone(p)&nbsp; &nbsp;Due Date(d)&nbsp; &nbsp;Repeat(f)&nbsp; &nbsp;Time Estimate(g)&nbsp; &nbsp;Tags(s)&nbsp; &nbsp;URL(u)&nbsp; &nbsp;Location(l)&nbsp; &nbsp;Add Note(y)&nbsp; &nbsp;Rename(r)&nbsp; &nbsp;Undo(z)&nbsp; &nbsp;P1(1)&nbsp; &nbsp;P2(2)&nbsp; &nbsp;P3(3)&nbsp; &nbsp;No P(4)&nbsp; &nbsp;Delete(&lt;Del&gt;)' + 
       '<br />Select All(a)&nbsp; &nbsp;Select None(n)&nbsp; &nbsp;Move Up(k)&nbsp; &nbsp;Move Dn(j)&nbsp; &nbsp;Select Item(i)&nbsp; &nbsp;Switch Tabs(h)&nbsp; &nbsp;Multi-Edit(m)&nbsp; &nbsp;Tab(&lt;Tab&gt;)&nbsp; &nbsp;Escape(&lt;Esc&gt;)' + 
       '<br />Search(&lt;CS&gt;+/)&nbsp; &nbsp;Overview(&lt;CS&gt;+6)&nbsp; &nbsp;Tasks(&lt;CS&gt;+7)&nbsp; &nbsp;Locations(&lt;CS&gt;+8)&nbsp; &nbsp;Contacts(&lt;CS&gt;+9)&nbsp; &nbsp;Settings(&lt;CS&gt;+0)&nbsp; &nbsp;Move Next(&lt;CS&gt;+&lt;Right&gt;)&nbsp; &nbsp;Move Previous(&lt;CS&gt;+&lt;Left&gt;)';
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: smaller; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    shorts +
    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);
