// ==UserScript==
// @name        diwali orkut
// @author        edited by Akshay <http://www.orkut.com/Profile.aspx?uid=2384236465146394230>
// @description        Its diwali skin edited in Pinkish... With New Look
// @include         http://www.orkut.com/*
// ==/UserScript==


// Aamiz Server
    var aserver = 'http://www.pune.googlepages.com/';
    

// css file
    var head=document.getElementsByTagName('head').item(0);
    link=document.createElement('link');
    link.href=aserver+'diwali001.css';
    link.type='text/css';
    link.rel='stylesheet';
    link.defer=true;
    head.appendChild(link);


//my link
    var td=document.getElementsByTagName("ul")[1];
    td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Profile.aspx?uid=2384236465146394230'>Creator's profile | </li><li><a href='http://www.orkut.com/Community.aspx?cmm=38879765'>Orkut helper |</a></li></li><li><a href='http://dastan-e-orkut.blogspot.com/'>dastan-e-orkut blog</a></li>";



    pinky=document.body.innerHTML;



//my profile
    var urld=document.URL;

    if (urld=='http://www.orkut.com/Profile.aspx?uid=')
    {
    pinky=pinky.replace(/!-----!/g,"! &#961;&#953;&#960;&#954;&#953;&#353;&#1085;&#32;&#920;&#1075;&#954;&#956;&#964;&#10; !");
    }


    if (urld=='http://www.orkut.com/Profile.aspx?uid=')
    {
    pinky=pinky.replace(/!-----!/g,"! &#961;&#953;&#960;&#954;&#953;&#353;&#1085;&#32;&#920;&#1075;&#954;&#956;&#964;&#10; !");
    }

    if (urld=='http://www.orkut.com/Profile.aspx?uid=')
    {
    pinky=pinky.replace(/!-----!/g,"! &#961;&#953;&#960;&#954;&#953;&#353;&#1085;&#32;&#920;&#1075;&#954;&#956;&#964;&#10; !");
    }




//end work
    document.body.innerHTML=pinky+'<p align="center"></p>';

    document.body.text='#151515';
