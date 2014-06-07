// ==UserScript==
// @name           cleanjunk
// @namespace      http://cleanjunk.netmaster.com.ua
// @description    Clean the junk, ADieouS
// @include        *
// ==/UserScript==
function FillSpace(w,o)
{
    d=w.document.createElement('div');
    d.style.width=o.width;
    d.style.height=o.height;
    o.parentNode.replaceChild(d,o);
}

function CleanObjects(w,t)
{
    os=w.document.getElementsByTagName(t);
    for ( i=os.length-1;i>=0;i-- )
    {
        FillSpace(w,os[i]);
    }
}

function CleanImages(w)
{
    g=w.document.images;
    for ( k=g.length-1;k>=0;k-- )
        if ( {'21x21':1,'48x48':1,'88x31':1,'88x33':1,'88x62':1,'90x30':1,'90x32':1,'90x90':1,'100x30':1,'100x37':1,'100x45':1,'100x50':1,'100x100':1,'100x275':1,'110x55':1,
             '120x60':1,'120x90':1,'120x120':1,'120x234':1,'120x240':1,'120x400':1,'120x500':1,'120x600':1,'120x800':1,'125x60':1,'125x125':1,'125x250':1,'125x400':1,'125x600':1,
             '125x800':1,'130x60':1,'130x65':1,'132x70':1,'140x55':1,'146x60':1,'150x60':1,'150x100':1,'150x150':1,'155x275':1,'155x470':1,'160x80':1,'160x600':1,'180x30':1,
             '180x66':1,'180x150':1,'194x165':1,'200x60':1,'230x30':1,'230x33':1,'230x60':1,'234x60':1,'234x68':1,'240x80':1,'280x280':1,'320x5':1,'300x60':1,'300x100':1,
             '336x280':1,'350x300':1,'392x72':1,'400x40':1,'430x225':1,'440x40':1,'468x60':1,'470x60':1,'550x5':1,'600x30':1,'720x300':1,'728x90':1,'750x100':1,'850x120':1
             }[g[k].width+'x'+g[k].height] )
            FillSpace(w,g[k]);
}

function cleanjunk()
{
    CleanObjects(window,'iframe');
    CleanObjects(window,'embed');
    CleanObjects(window,'object');
    CleanObjects(window,'applet');
    CleanImages(window);
}

cleanjunk();

