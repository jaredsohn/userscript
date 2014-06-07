// ==UserScript==
// @name           FetLife Cleaner
// @version        1.1.2
// @namespace      tzflc
// @url            https://fetlife.com/groups/44357
// @author         Trapzilla
// @description    Cleans up some of the clumsy and cluttered interface of FetLife.
// @include        https://fetlife.com/*
// ==/UserScript==

function tzflcmyfetlister (tzflcmyinto,tzflcmyfets)
{
    for (var i = 0; i < tzflcmyinto.length ; i++)
    {
        tzflcmyfetsnum = tzflcmyinto[i].match(/fetishes\/[0-9]*/).toString().match(/[0-9]*$/);
        tzflcmyfets[tzflcmyfetsnum] = new Array();
        tzflcmyfets[tzflcmyfetsnum]['ic'] = 'into';
        if (tzflcmyinto[i].indexOf('(giving)')>=0)
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'giving';
        }
        else if (tzflcmyinto[i].indexOf('(receiving)')>=0)
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'receiving';
        }
        else if (tzflcmyinto[i].indexOf('(watching)')>=0)
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'watching';
        }
        else if (tzflcmyinto[i].indexOf('(wearing)')>=0)
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'wearing';
        }
        else if (tzflcmyinto[i].indexOf('(watching others wear)')>=0)
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'watchwear';
        }
        else if (tzflcmyinto[i].indexOf('(everything to do with it)')>=0)
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'etdwi';
        }
        else
        {
            tzflcmyfets[tzflcmyfetsnum]['gr'] = 'else';
        }
    }
    return tzflcmyfets
}


function tzflcfetcolapser (ic,label,name,fetarray)
{
    if (fetarray.length <= 0)
    {
        return '';
    }
    else if (fetarray.length <= 40)
    {
        return '<span style="font-size:125%">'+label+fetarray.length+':</span> '+fetarray.join(', ')+'<hr />';
    }
    else
    {
        return '<a  name="tzflc-'+ic+'-'+name+'"></a><span style="font-size:125%">'+label+fetarray.length+':</span> <span id="tzflc-'+ic+'-'+name+'-short">'+fetarray.slice(0,30).join(', ')+' <a href="javascript:tzflcfetlength(\''+ic+'\',\''+name+'\',\'long\');">[+]'+(fetarray.length-30)+' more</a></span><span id="tzflc-'+ic+'-'+name+'-long" style="display:none;">'+fetarray.join(', ')+' <a href="javascript:tzflcfetlength(\''+ic+'\',\''+name+'\',\'short\');">[-]'+(fetarray.length-30)+' less</a></span><hr />';
    }
}


function tzflcfetlister (ic,tzflcinto,tzflcmyfets)
{
    var tzflcintogiving = new Array();
    var tzflcintoreceiving = new Array();
    var tzflcintowatching = new Array();
    var tzflcintowearing = new Array();
    var tzflcintowatchwear = new Array();
    var tzflcintoetdwi = new Array();
    var tzflcintoelse = new Array();
    var givingi = 0;
    var receivingi = 0;
    var watchingi = 0;
    var wearingi = 0;
    var watchweari = 0;
    var etdwii = 0;
    var elsei = 0;
    
    for (var i = 0; i < tzflcinto.length ; i++ )
    {
        tzflcintonum = tzflcinto[i].match(/fetishes\/[0-9]*/).toString().match(/[0-9]*$/);
        
        if (tzflcinto[i].indexOf('(giving)')>=0)
        {
            tzflcintogiving[givingi]=tzflcinto[i].replace(' <span class="quiet smaller">(giving)</span>','');
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                if (tzflcmyfets[tzflcintonum]['gr']=='receiving'||tzflcmyfets[tzflcintonum]['gr']=='etdwi')
                {
                    tzflcintogiving[givingi]=tzflcintogiving[givingi].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
                }
                else
                {
                    tzflcintogiving[givingi]=tzflcintogiving[givingi].replace('<a href','<a style="font-weight:bold;" href');
                }
            }
            givingi++;
        }
        else if (tzflcinto[i].indexOf('(receiving)')>=0)
        {
            tzflcintoreceiving[receivingi]=tzflcinto[i].replace(' <span class="quiet smaller">(receiving)</span>','');
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                if (tzflcmyfets[tzflcintonum]['gr']=='giving'||tzflcmyfets[tzflcintonum]['gr']=='etdwi')
                {
                    tzflcintoreceiving[receivingi]=tzflcintoreceiving[receivingi].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
                }
                else
                {
                    tzflcintoreceiving[receivingi]=tzflcintoreceiving[receivingi].replace('<a href','<a style="font-weight:bold;" href');
                }
            }
            receivingi++;
        }
        else if (tzflcinto[i].indexOf('(watching)')>=0)
        {
            tzflcintowatching[watchingi]=tzflcinto[i].replace(' <span class="quiet smaller">(watching)</span>','');
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                if (tzflcmyfets[tzflcintonum]['gr']=='etdwi')
                {
                    tzflcintowatching[watchingi]=tzflcintowatching[watchingi].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
                }
                else
                {
                    tzflcintowatching[watchingi]=tzflcintowatching[watchingi].replace('<a href','<a style="font-weight:bold;" href');
                }
            }
            watchingi++;
        }
        else if (tzflcinto[i].indexOf('(wearing)')>=0)
        {
            tzflcintowearing[wearingi]=tzflcinto[i].replace(' <span class="quiet smaller">(wearing)</span>','');
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                if (tzflcmyfets[tzflcintonum]['gr']=='watchwear'||tzflcmyfets[tzflcintonum]['gr']=='etdwi')
                {
                    tzflcintowearing[wearingi]=tzflcintowearing[wearingi].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
                }
                else
                {
                    tzflcintowearing[wearingi]=tzflcintowearing[wearingi].replace('<a href','<a style="font-weight:bold;" href');
                }
            }
            wearingi++;
        }
        else if (tzflcinto[i].indexOf('(watching others wear)')>=0)
        {
            tzflcintowatchwear[watchweari]=tzflcinto[i].replace(' <span class="quiet smaller">(watching others wear)</span>','');
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                if (tzflcmyfets[tzflcintonum]['gr']=='wearing'||tzflcmyfets[tzflcintonum]['gr']=='etdwi')
                {
                    tzflcintowatchwear[watchweari]=tzflcintowatchwear[watchweari].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
                }
                else
                {
                    tzflcintowatchwear[watchweari]=tzflcintowatchwear[watchweari].replace('<a href','<a style="font-weight:bold;" href');
                }
            }
            watchweari++;
        }
        else if (tzflcinto[i].indexOf('(everything to do with it)')>=0)
        {
            tzflcintoetdwi[etdwii]=tzflcinto[i].replace(' <span class="quiet smaller">(everything to do with it)</span>','');
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                tzflcintoetdwi[etdwii]=tzflcintoetdwi[etdwii].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
            }
            etdwii++;
        }
        else
        {
            tzflcintoelse[elsei]=tzflcinto[i];
            if (tzflcmyfets[tzflcintonum] != undefined && location.pathname != tzflcmypage)
            {
                if (tzflcmyfets[tzflcintonum]['gr']=='etdwi')
                {
                    tzflcintoelse[elsei]=tzflcintoelse[elsei].replace('<a href','<a style="font-weight:bold;background-color:#880000;" href');
                }
                else
                {
                    tzflcintoelse[elsei]=tzflcintoelse[elsei].replace('<a href','<a style="font-weight:bold;" href');
                }
            }
            elsei++;
        }
    }
    
    tzflcintoelse = tzflcfetcolapser(ic,'','else',tzflcintoelse);
    tzflcintogiving = tzflcfetcolapser(ic,'Giving ','giving',tzflcintogiving);
    tzflcintoreceiving = tzflcfetcolapser(ic,'Receiving ','receiving',tzflcintoreceiving);
    tzflcintowatching = tzflcfetcolapser(ic,'Watching ','watching',tzflcintowatching);
    tzflcintowearing = tzflcfetcolapser(ic,'Wearing ','wearing',tzflcintowearing);
    tzflcintowatchwear = tzflcfetcolapser(ic,'Watching others wear ','watchwear',tzflcintowatchwear);
    tzflcintoetdwi = tzflcfetcolapser(ic,'Everything to do with ','etdwi',tzflcintoetdwi);
    
    document.getElementById('tzflc-'+ic).innerHTML = tzflcintoelse+tzflcintogiving+tzflcintoreceiving+tzflcintowatching+tzflcintowearing+tzflcintowatchwear+tzflcintoetdwi;
}



tzflcmypage = document.head.innerHTML.match(/\/users\/[0-9]*/);

var tzflcmyprofile = new XMLHttpRequest();  
tzflcmyprofile.open('GET', tzflcmypage, false);   
tzflcmyprofile.send(null);
if (tzflcmyprofile.status == 200)  
{
    tzflcmyprofile = tzflcmyprofile.responseText;
    tzflcmyinto = tzflcmyprofile.match(/<p><span class="quiet"><em>Into:<\/em><\/span> .*(?=\.<\/p>)/).toString().split('').reverse().join('').match(/.*(?= >naps\/<>me\/<:otnI>me<>"teiuq"=ssalc naps<>p<)/).toString().split('').reverse().join('').split(/, (?=<)/);
    tzflcmycurious = tzflcmyprofile.match(/<p><span class="quiet"><em>Curious about:<\/em><\/span> .*(?=\.<\/p>)/).toString().split('').reverse().join('').match(/.*(?= >naps\/<>me\/<:tuoba suoiruC>me<>"teiuq"=ssalc naps<>p<)/).toString().split('').reverse().join('').split(/, (?=<)/);
    var tzflcmyfets = new Array();
    tzflcmyfets = tzflcmyfetlister (tzflcmyinto,tzflcmyfets)
    tzflcmyfets = tzflcmyfetlister (tzflcmycurious,tzflcmyfets)
}
else
{
    tzflcmyfets = '';
}



if (window.location.pathname.indexOf('users/')==1)
{
    var newScript = document.createElement('script');
    newScript.appendChild(document.createTextNode('function tzflcfetlength (tzflcfetlengthinto,tzflcfetlengthgiving,tzflcfetlengthlong)\n    {\n        document.getElementById(\'tzflc-\'+tzflcfetlengthinto+\'-\'+tzflcfetlengthgiving+\'-\'+tzflcfetlengthlong).style.display=\'inline\';\n        if (tzflcfetlengthlong == \'long\')\n    {\n        tzflcfetlengthshort = \'short\';}else{tzflcfetlengthshort = \'long\';\n    window.location.hash=\'tzflc-\'+tzflcfetlengthinto+\'-\'+tzflcfetlengthgiving;\n    }\n    document.getElementById(\'tzflc-\'+tzflcfetlengthinto+\'-\'+tzflcfetlengthgiving+\'-\'+tzflcfetlengthshort).style.display=\'none\';\n}'));
document.body.appendChild(newScript);
        
    if (document.body.innerHTML.indexOf('<p><span class="quiet"><em>Into:<\/em><\/span>') > 0)
    {
        tzflcinto = document.body.innerHTML.match(/<p><span class="quiet"><em>Into:<\/em><\/span> .*(?=\.<\/p>)/).toString().split('').reverse().join('').match(/.*(?= >naps\/<>me\/<:otnI>me<>"teiuq"=ssalc naps<>p<)/).toString().split('').reverse().join('').toString().split(/, (?=<)/);
        document.body.innerHTML = document.body.innerHTML.replace(/<p><span class="quiet"><em>Into:<\/em><\/span> .*\.<\/p>/,'<span style="font-size:150%"><em>Into...</em></span><div id="tzflc-into"></div>');
        tzflcfetlister ('into',tzflcinto,tzflcmyfets);
    }
    
    if (document.body.innerHTML.indexOf('<p><span class="quiet"><em>Curious about:<\/em><\/span>') > 0)
    {
        tzflccurious = document.body.innerHTML.match(/<p><span class="quiet"><em>Curious about:<\/em><\/span> .*(?=\.<\/p>)/).toString().split('').reverse().join('').match(/.*(?= >naps\/<>me\/<:tuoba suoiruC>me<>"teiuq"=ssalc naps<>p<)/).toString().split('').reverse().join('').toString().split(/, (?=<)/);
        document.body.innerHTML = document.body.innerHTML.replace(/<p><span class="quiet"><em>Curious about:<\/em><\/span> .*\.<\/p>/,'<span style="font-size:150%"><em>Curious about...</em></span><div id="tzflc-curious"></div>');
        tzflcfetlister ('curious',tzflccurious,tzflcmyfets);
    }
}