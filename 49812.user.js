scr_meta=<><![CDATA[
// ==UserScript==
    // @name           MyBuxManager
    // @namespace      MyBuxManager
    // @description    MyBuxManager manages all your bux websites from just one page!
    // @version        1.3.7
    // @license        GNU GPL
    // @include        *
    // @exclude        *obeus.com*
    // @exclude        *paydotcom*
    // @exclude        *sometrics.com*
    // @exclude        *xoads.com*
    // @exclude        *bidsystem.com*
    // @exclude        *newgrounds.com*
    // @exclude        *1800banners.com*
    // @exclude        *textadmarket.com*
    // @exclude        *entireweb.com*
    // @exclude        *siambt.com*
    // @exclude        *bidvertiser.com*
    // @exclude        *adscampaign.com*
    // @exclude        *1800banners.com*
    // @changelog      First rebuild, some changes and fixes. Initially imported from MyBuxManager (http://userscripts.org/scripts/show/41469).
// ==/UserScript==
]]></>;

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

 **************************************************************************/

/**************************************************************************

    As said by greyg00:
    This Script has been written to demonstrate that any protection can be violated.
    I do NOT encourage it's usage whenever it is against websites' TOS or law.
    I am not responsible for any illegal usage of this code, which is freely 
    distributed and available to everybody.

 **************************************************************************/

//\\//\\///\\//\\//\\//\\//\\///\\//\\//\\//\\//\\///\\//\\//\\//\\//\\///\\//\\//\\//
//										    //
//		Originally made by greyg00					    //
//				Modified and edited by Emiliano Sauvisky	    //
//										    //
//\\//\\///\\//\\//\\//\\//\\///\\//\\//\\//\\//\\///\\//\\//\\//\\//\\///\\//\\//\\//


var container, mySidebar, ads;      //TABLES
var header, footer, lastARLink,generalShadow, checkBoxList, registrationBox, regContainer;  //AUTOREG
var postData = '';
var shift = 0;              // When a website is deleted clicking the red X, shift is updated in order to keep showing consequent websites added in the correct line
var runningLoads=0;         // Webs currently loading, initially zero
var lastLinks;              // When all the links of a website are visited, lastLinks contains all the links that have been visited, and during the following fetch of the links it's used to verify that the previous links have in fact been clicked
var linksArray = new Array(), webArray = new Array();
var date = new Date();
var addBSrc,remBSrc,addButton;
var processDivInt, totalLinks=0, processedLinks=0;          // Progression bar

var surfWeb     = Array(/\/?u=v/gi,/\/index.php\?option=surf/gi,/\/surf.ptc/gi,/\/surf1.php/gi,/\/ads.php/gi,/\/surf_ads_think.php/gi,/\/surf.php/gi,/\/surf1.php/gi,/\/bannersurf.php/gi,/\/viewads.php/gi,/\/?p=surf/gi,/\/browse.php/gi,/\/surfadz.php/gi,/\/index.php\?page=surf/gi,/\/\?p=surf/gi);
var surfAd      = Array("ad=","id=","h=","k=","l=");
var surfPages   = Array("http://www.10ads.info/index.php/surf.php", "http://ads2getrefs.com/index.php?option=surf", "http://adster.gr/surf.php?r=", "http://advertising4you.net/surf.php?r=", "http://alterbux.org/surf.php?r=", "http://anbux.com/surf.php?r=", "http://ara-bux.com/surf.php", "http://argentoptc.com/surf.php?r=", "http://beanybux.com/bannersurf.php", "http://beanybux.com/surf.php", "http://bonbux.com/surf.php?r=", "http://www4.bux.to/surf.php", "http://bux3.com/surf.php", "http://buxclick.ic.cz/surf.php?r=", "http://buxclicks.net/surf.php", "http://buxfly.com/surf.php", "http://buxluz.webcindario.com/surf.php", "http://buxp.info/surf1.php", "http://casadelclick.info/surf.php", "http://cash-bux.com/surf.php?r=", "http://cashmybux.com/surf.php", "http://chillbux.com/surf.php", "http://clickmybux.com/surf.php", "http://clix.uuuq.com/surf.php?r=", "http://clix4free.info/surf.php?r=", "http://dingobux.com/surf.php", "http://evobux.info/surf.php?r=", "http://www.extra10.com/surf.php", "http://extraearn.yw.sk/surf.php?r=", "http://fazebux.com/surf.php", "http://geebux.com/surf.php?r=", "http://gobux.biz/surf.php?r=", "http://gotcent.com/surf.php?r=", "http://greatbux.eu/surf.php?r=", "http://huge-returns.com/surf.php?r=", "https://www.incrasebux.com/index.php?option=surf", "http://isabelmarco.com/?p=surf", "http://longstarbux.com/surf.php?r=", "http://makemybux.com/surf.php", "http://max-ptc.com/surf.php", "http://mayaptc.com/surf.php?r=", "http://megabux.info/viewads.php", "http://monkeybux.com/index.php?option=surf", "http://newadbux.eu/surf.php?r=", "http://osoclick.com/surf.php", "http://paid-bux.info/surf.php", "http://pandabux.com/surf.php", "http://www.perfectbux.com/all_ads.php", "http://www.perfectbux.com/index.php?page=surf-ads", "http://ptc.easyclicks.gr/surf.php", "http://ptc.1ptc.gr/surf.php", "http://richclix.com/surf.php", "http://simplebux.co.cc/surf.php?r=", "http://smurfybux.com/surf.php?r=", "http://stablebux.info/index.php?option=surf", "http://suissebux.altervista.org/surf.php?r=", "http://superads.altervista.org/surf.php?r=", "http://superbux.info/surf.php", "http://surfmypage.netsons.org/surf.php", "http://taketheglobe.com/ads.php", "http://technobux.net/surf.ptc", "http://twocentbux.hu.cz/surf.php?r=", "http://unclebux.com/surf.php", "http://v2.taketheglobe.com/ads.php", "http://weekendbux.com/surf.php?r=", "http://wirebux.com/surf.php?r=", "http://zakeebux.com/surf.php?r=", "http://theclixworld.com/index.php?view=click", "http://www.theclickers.net/ptc/index.php?view=account&ac=click", "http://www.pilhaclicks.com/viewads.php");
var textFilter  = Array(/cheat/i,/donotclick/i,/loseall/i,/delete/i,/dontclick/i);
var toRegister  = Array();

for(var i in surfWeb){
    if (surfWeb[i].test(location.href)){
        var ref = '/' + surfWeb[i].toString().replace("\/gi",'').replace("\/\\/",'');
        break;
    }
}
if(!ref)
    for(var l in surfAd){
        var ad = new RegExp(surfAd[l]);
    }

visit();
if (ref)                                                    //Start!
    isNotRunning();                                         //  ||
//                                                          //  ||
//                                                          //  \/
function isNotRunning(){                                    //Checks if the script is already running, in which case it wont start

    GM_setValue("nowRunning",Math.ceil(Math.random()*10000));

    var now = GM_getValue("nowRunning");
    setTimeout(function()
    {
        if(GM_getValue("nowRunning")!=now)
            return;
        setInterval( function()
        {
            GM_setValue("nowRunning",Math.ceil(Math.random()*10000));
        },2000);
        start();
    },2000);

    var cookies = document.cookie.split(";");                                       //Cookies Lifetime Extender!
    for(var x in cookies)                                                           //
        document.cookie = cookies[x] + ';expires=Thu, 01-Jan-2050 12:34:58 GMT;'    //
}


function start(){                                           //SurfPage & Script is not already running

    document.title = 'MyBuxMan| ' + document.title;

    addGlobalStyle();

    /////////////THE BUTTONS ADD and REMOVE//////////////////////////
    addBSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWdJREFUeNqUU81OwkAQ/na7sKUlQBCVi4knj76C0Yt3L5xNfBbfwYSTL+DJiwcTn8MT/iQcoIQALQW642wFJbU1Osl2Z5rv63zzU0FEyNpZV1zydbEOLeDm8YrusziFfOvU2+65dcyKMBnEr+z+IMsCcmTzaU9hLSzOAxWRoWQJ2vEghVMEKSSTlh58VUdZuDZe5Cbg5hzz3dp6Z/i0K9pPM1d0xGFwyLgTdrZlBLZhD+WKs/8lRSjsNJvwPB8QQKPRQIJVJxgGHcPexhZR0rNkWdtzIaStQaLkuNBKIU5mEELAkIH2HbR0DQsz5z4STEIYvoRkyf1Bb+av58k2sQ/34Gg3lWi43e/Pg2WmbrGRbWupfpNTu51OZ6dlz0E0tjx0+VxnyKHizRmxM8psWEgsl0giSUzaHMa9/XVUEiRSLeIzdv4zZ7lh/WZF5Kr9YeJwxanTr+jcJSkg343782ArfsoDfQgwAMpEdbvnG/5sAAAAAElFTkSuQmCC';
    remBSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALWSURBVHjaTMhfTBt1AAfw7+/3u2uv7Qyaops4TWGNLs0MCPri0G0RzYCHujkhgWUsW7I3Jc6Y+EqijzM++IKGB2PIaGa2bBkJIWJItoyIE/YnSwftwZXuStc/17WF3l3v7vfzlc/jh+RyeUBi4BwoDUX+Onhtrc/1GCwfgeJ4kImAhUCsMnz40v6r/31rs6AnCRc0tbWG9ZSK+vmeKweGvvokO9y1sK5p0FMbUFUd6bSK5VPR8dYvL47fGXv/Hz29jqSmAqVtA8mTb03mf/nezX7XJwq/TojV463Xs3kDeiGLlWPhK9u/TYjMN4Pi2eRl9/7A6zPFnAay+EFwPvLpwEfNoq5wSqHIQQQOdyNz7feiiXo+cubCu3i6gqbNIfsCsF962awszCdILpdD5mzndPDAGyOKrIC7AiIkEIgdRYsL6Oo9+Bo2KJFQM3dh5atzkcSTfrq5mQH/YXa0kdensIexa6Fi2nsLVr465f2Y6NfTSZBssQzm7oAyBffjndNtr7aMOD6KoGBoeDZCNATuNJEplpa6/3z8IfwczOWgxBVgLATu2WhUGlFCFdDtMsxSDXKtCaOsw5EYzJ1ygMoeqCfDkhmoxDzwpsDfJ6LT4Xfe7qlubaJWt1A3CqgWdXDDxE62hHB7d9f8sUM/+z0XftcB5SUDsx9HbofbYiOOlmJOwwaaLmRGQCQZ3PVgNsrwMk+w/83Y+M3ejnlq2CCT7fgp2tH2NS+UmW1SUFkGZQ7UF/wPj0i9sZBo94gE12FgfgH2WtDJaLmr9Ivl7cva03qCc24yJwBF7GKtSG59/nDt3NBysiNZE3OuZEPxmiCEY2PDWPxsuTBGnSbB4KP0qFoVifArFlaqZGnooRYH90OQIM6sZOJq3n7g2xeAWq/dOP2vFpcEASk8r2LXqkAwipkj0emBu6ujhAsQm0PIDHAd+EPUN3P0veuXVp/FLdHwQkEZ/w8AkWN3G8jclxYAAAAASUVORK5CYII%3D';
    addButton = document.createElement('a');
    addButton.setAttribute('class', 'addWeb');
    addButton.innerHTML = '<IMG SRC="'+addBSrc+'" ALT="ADD" border="0">';
    addButton.href = 'javascript:void(0)';
    addButton.addEventListener('click', registerWeb, false);
    ////////////////////END OF BUTTONS///////////////////////////////

    var scripts = [
    'http://script.aculo.us/prototype.js',
    'http://script.aculo.us/effects.js',
    'http://script.aculo.us/controls.js'
    ];
    for (i in scripts) {
        var script = document.createElement('script');
        script.src = scripts[i];
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    ////////////////webArray contains the list of websites to visit///////////
    webArray = eval(GM_getValue('webArray', '[]'));
    lastLinks = new Array(webArray.length);                 //Array needed to check whatever or not links are being clicked
    //    if(date.getDate()+''+date.getMonth() != GM_getValue('lastUpdatecheck'))
    checkForUpdates();
    for(var el in webArray)
        addLine(webArray[el], ++el);
    addLine();
}


/////entry is the text of the new lineNumber, if not specified a new lineNumber with textbox is created
function addLine(entry, lineNumber){
    if (!container){                                             //creates the yellow table (only the first time)

        var firstTime = true;

        container = document.createElement('div');
        container.setAttribute("id", "MBM_container");
        container.innerHTML = '<p style="font-size: 160%;"><b>MyBuxManager</b></p>';

        generalShadow = document.createElement('div');
        generalShadow.setAttribute("id","MBM_generalShadow");
        document.body.appendChild(generalShadow);

        var suggestionsDiv = document.createElement('div');
        suggestionsDiv.setAttribute("id","MBM_suggestion");
        suggestionsDiv.setAttribute("class","autocomplete");
        document.body.appendChild(suggestionsDiv);

        var processDiv = document.createElement('div');
        processDiv.setAttribute("class","progress-container");
        processDiv.setAttribute("style","display:none;");
        processDivInt = document.createElement('div');
        processDivInt.setAttribute("style","width: 0%; z-index: 1;");
        processDiv.appendChild(processDivInt);

        createSidebar();

        var myAds = document.createElement('div');
        myAds.setAttribute("id", "MBM_ads");
   /*   var adsFrame = document.createElement('iframe');
        adsFrame.width = '480';
        adsFrame.height = 'auto';
        adsFrame.frameborder = 'no';
        adsFrame.marginwidth="0";
        adsFrame.marginheight="0";
        adsFrame.scrolling = 'no';
        adsFrame.setAttribute('style', "border-width:0px;");
//      adsFrame.src = 'http://bannerbdo.comli.com/'; */
        

        container.appendChild(myAds);
        container.appendChild(processDiv);
        document.body.appendChild(container);
    }

    var delButton = document.createElement('a');                     //the close button must be created every time a lineNumber is added
    delButton.innerHTML = '<IMG SRC="'+remBSrc+'" ALT="REMOVE" border="0">';
    delButton.href = 'javascript:void(0)';
    delButton.addEventListener('click', unregisterWeb, false);

    var leftColumn = document.createElement('div');                    //left column containing the input box and the websites name
    leftColumn.setAttribute("class", "MBM_leftcolumn");
    var centerColumn = document.createElement('div');                  //right column containing the buttons
    centerColumn.setAttribute("class", "MBM_centercolumn");
    var rightColumn = document.createElement('div');                //right column containing the buttons
    rightColumn.setAttribute("class", "MBM_rightcolumn");

    var tableLine = document.createElement('div');                   // the line, containing left, central and right column
    tableLine.setAttribute("class", "MBM_tableline");
    tableLine.appendChild(leftColumn);
    tableLine.appendChild(centerColumn);
    tableLine.appendChild(rightColumn);
    container.appendChild(tableLine);

    if(entry){
        tableLine.setAttribute("id", 'MBM_line_'+entry);
        leftColumn.innerHTML = '<a HREF = "'+entry+'" target="_blank"><font color="Black">'+entry+'</font></a>';
        rightColumn.appendChild(delButton);
    }
    else{
        tableLine.setAttribute("id", 'MBM_newwebline');
        leftColumn.innerHTML = '<input type="text" id="MBM_suggestionText" size="70%" value='+document.location+'>';
        rightColumn.appendChild(addButton);
    }


    if(firstTime)
        insertScript('new Autocompleter.Local("MBM_suggestionText","MBM_suggestion",'+uneval(surfPages)+',{fullSearch:true, partialSearch:true});');

    if(entry)// && entry.match(/mybux/))
        var load = setInterval( function()
        {
            if(runningLoads < 8){                               // Max 8 websites loading simultaneously
                runningLoads++;
                getLinks(entry, lineNumber);
                clearInterval(load);
                return;
            }
        },2000);
    return;
}

function createSidebar(){
    mySideBar = document.createElement('div');
    mySideBar.setAttribute("id", "MBM_sidebar");
    document.body.appendChild(mySideBar);

    //HIDE-SHOW BUTTON
    var sClose = document.createElement('div');
    sClose.innerHTML = '<IMG SRC="data:image/png;base64,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%3D" ALT="HIDE/SHOW" TITLE="HIDE/SHOW" border="0">';
    sClose.addEventListener('click', function(e)
    {
        if(generalShadow){
            generalShadow.style.display = 'none';
            generalShadow.style.opacity =.0;
        }
        if(regContainer)
            regContainer.style.display = 'none';
        if(container.style.display == 'none')
            container.style.display = 'inline';
        else
            container.style.display = 'none';
    }, false);
    mySideBar.appendChild(sClose);

    //AUTOREGISTER BUTTON
    var ARIcon = document.createElement('div');
    ARIcon.innerHTML = '<IMG SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAACdBJREFUaIHVWmuMVdUV/vY+577H4SHyalNsoyAEG1+VSkdsDZW0MyGKVaFYtcJErYKGxvKor1YYbEzqI7S0aYy1WKM0qaCodcBYU40OgoNgBR/FVhgFZoZh7tzHuefstVZ/nHvvnLlzL8O9FBtWsubsnL332t+39lr7ce4oEcHJLPr/DeB45aQnYJ8owzva2y+wLOsGEelk5t+ec+65nSdiHHUicmDnu+9eKiKtImIBgNb6Pa31jKlnn93zvx6r5hnY2tY2ORwOTyUy28+/4Bt7g3VEdAMZY3HeOZbWU+1weBqAvwXbtb+zfQaAsX3pzJYZF198uBYcNeXA21u33hwKhXaJyHqtrfd2tLfPDda7uZwiJogwRBieMcg5TiLYZkd7+2OAeg1Qz9TF47veevPNqV8Ige3bt49SSj3kOI6VyWSQzWZjxpi1O9p3TAKArW1tZ7DIZUSMgjIzROSmFza9GAaA9vb2Ba7r3pjJZJDJZOB53njbtlfVQqDqHNi+bdsEx3H+zcz9RpRCNBo9orVuY5aLHMepF+EB/WzbRiQS+UApdcB13Utc1x1Qr7V+41sNDQ3VEqg6B0K2/WnKmL8AuKrwTkSQyWSGh0KhWcYYEBGUUgP65XI5MPMkpdQkz/MGGhVhEXm8WixADSH09XPOEWZ+kolQUGEGGYNsJgPPcyHMCNYX2uRyDpxsdlAdMyVdJ/vHWggMOQPPb3xuQiwWHdfV3d0+d968HAAw85cEApSLPin+qSwlYasUQqzUWAAdALCltfUrIjL+cFfX+9fMn588mqmj5sCWzZsXxePx1VqphLas3YboCeN5Ua3Vkkw6U4+SMBlgGAooVItUpCQisCwL8Vhsl+d5T8ZisfEislBEEkS0N5lMXvm9xsYdVRNobW0dF4tGO3K5nPI8Lz9IHFprpDNpeJ43KM6VUhAREBGICAXbWmtYlgVL+xFbOqKIIBaLIRKJwHVdOI4DEUE0GoVlWW/2pfoaGhubGGWkYgjFo9GxqXRKeZ4HrTWIDHI5pwjUBzsAPjzP8+Md2KG13qa13isiEc/zJnme902l1Om2bcOyrUFhlE6nkEr1FQkDQDqVQjgSmTh82PAogExVBDo7O/dYtvUJgK8Ss++2vMOFBQU/KgUwC4wxUEq1RqLRlY1NTf8otffxRx/Gdu/eM8d13fuMMWfYtu3bC/LI2ycqOFuQdbLPXDZrVlnwwBA58PzGjVOI6Q8QTC8Nl4KICAwRwpHIvbNnz/5lRWN52b5t24h9+/Y9ScZ837YrryEiAiisEcHSK+bMqY0AAGz5+2Yr2d37FgQXlKtnYcRi8VWNTU13DQU+IPaGZ599zXje9EK4DAKm8OAVV/7gZ0MZGnIfmPnt7xIErxITStUQwbJDbVWCBwAzZsyYa5VS6XJ2iQmAGhSGNRFYv/6Zia7nXc3sn2mCqpRCIpG4v0rwAICLpk//JByJrGOWQXaJGK7nNW/a+NywoeyUDaGnn3rqUmZeAoU4gAsBJPoX9XxHAOFIZN/s2bPPDIXDuVpIbNm8eUZPT89rnuei1L4v8hmA3RAcsGxrxTVz531a2mJQFv153bqzWPglpVT4aBuqUhq2bb9XK3gAGDtu3Pu9vUd6mHlEhSbj8wr2ePKmFzZNa2psMsEG5UKokZnDTIxKSoYAEWitD9QKHgCmTp2aBNArLBXHCuh5R7oPTym1MWgGjDEflztNBkV88BAgUbHRMUhnV1dYBOHgrj1I+veKdCgU+qy0etAMkDabROQxosKKMDh5/UQjEJmJx0Pgg927vywiow1R+TGYQIZARCkWvmXe/PldQxK48fpmWtDcvFCUTLZt+0IRbiEmDi5xzAzPc2E8M3lrW1vNJNKZ9EzXdW0iM3AZ9Z23Xyk1X2s9BQoTFyxsXlfORsWtsLn5pj354tu//93a04X5h8HTJxMjm81Gurq6FgFYVAN+5WSdW7LZTHFJLogAsLV1/4KFzU8NZeSYLjRMnKFi2PSfNFOpFNLp9E1vvP76RdWib3355btTqdQUx3ECIemrf9Fhd2grx3CUWPPoo80isgZAuLROhBGNxjB6zJgDo047bWZDQ8M/j2XQV7ZsuaG7u/vxQ4cOQphRbg8Qkf9ora+9bfHi12sm8OjDD60RkVvLbzL+uEyERF0dRp02+nB9ff2imTNnVpz2jo6Oul07d67o7e1d3tV5yL9TaF3xAuff+mT+HUt+WtFmRQJrHnnkdNdzPznarasgzIxoJIqRI0ciUVfXFo3Gno5EI20jRozoMK4b7jlyZILneTMdx5mXTPZOOHz4MIgIlQ5yAwBC7bVDobMWLV7slauvfJ5ViBJzJd8Pkmwmg45sBvF4Ylo8kZgWiURw4PPPHYhoQxTOOQ5S6RRyjlO8EDHR0IaVStTHh1kAqiQg6iMy9KpS+E5xN1HqXwBsCCaoMpcRYaCvL4lkshdKa2ilowDA7Ce9Ujq/2kj+UhToKwIo9SFETgHUOKDwTn61YOFCpxLMinN42+2LKefmZovgHmZ6AkrNXbps+RnhSPRMZv6Tv1Zzvxa/wPmIhAVEBkSm/51I8bQZ7GsMGQGuX7ps+STbsieJyJ3E9IQAc5ct//lDFZ2MGr9OP9Cy6lIieqXqjhVERHruuufekbX0renjrut55wXX7eNVZo63rFx5fi1Yqv60+EDLquFMdGfpe//Or/KxPrhfYaKV8sslbSK5XO5uAJdXi6fqGcg6zjBiHl16sGOmlZFI+BJAVhATDTqcCXcrhTmWZZ3Lwhuo5ABHZMZWiwWoIQdSbhYt99z3rFLqcqDozfWrVj9wTaHNXSuWbxKRxmA/27aX/eL+lb8CgN88/OvQZwcP7QHwNd+GQGv9k5Utq9dWS2DIGbCVCqo6JRKHiFxnjHlQBK8SmZaDBw/9WCmllVIWAHie1130bj7OXdfdm7dn3XrHEk8rPYuIHmeRF40xN69sWb3WVkrltTjmUKJEpNDQzquVf+p8WedVFcoEGAApAHEADoB6K39WEss6cuN1P7rz1FGjlvr54OfFrp27ml5qbX3H8vuAgHS+byj/HG75qSQAOPBkvzkY/riUfxojUiRgA6gDUJ8HFc4bLiWiCkQK1jWg835SAJQAHAqHzdVXXXX7qaeObGDm3P79+5/+64aNGzQQU/13LBF/7xOr/10BuJQB7gFw4X9iTAJIGRFTIGABiMG/IkYD4I82E4X5VaVl8gfOjh87ZlRfss/ty2SSGkgEAkICz2D5aJ4vkHDgz17WiFAxifNhNCBUSsAGZyCoQBkyeRQEQFm+AyqBDr4LKpd5Fssmj/u4fycuJJoZ6IiKUtrOHOf4J+SH7i9STvr/lTjpCfwX7w6KQ9QaUhIAAAAASUVORK5CYII%3D" ALT="Registration Helper" TITLE="Registration Helper" border="0">';
    ARIcon.addEventListener('click', startAR, false);
    mySideBar.appendChild(ARIcon);

    //SCRIPT'S PAGE BUTTON
    var goToScript = document.createElement('div');
    goToScript.innerHTML = '<IMG SRC="data:image/png;base64,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" ALT="Home" TITLE="Go to Script\'s page" border="0">';
    goToScript.addEventListener('click', function(e){
        GM_openInTab('http://userscripts.org/scripts/show/49812');
    }, false);
    mySideBar.appendChild(goToScript);

    regContainer = document.createElement('div');
    regContainer.setAttribute("id","MBM_regContainer");
}

function getLinks(webPage, lineNumber){

    var d = webPage.split('/')[0]+'//'+webPage.replace(/http(.?):\/\//,'').split('/')[0]+'/';
    editStatus('Loading Page...', lineNumber);

    GM_xmlhttpRequest({
        'url':webPage,
        'method':('GET'),
        'headers':{
            'Referer':webPage,
            'Content-Type':('application/xml')
        },
        'onload':function(responseDetails)
        {
            editStatus('Getting Links...', lineNumber);

            var login, login1, login2=false, div;

            if(document.getElementById(d)){
                div = document.getElementById(d);
                div.innerHTML = '';
            }
            else{
                div = document.createElement('div');
                div.setAttribute('style','display:none;visibility:hidden;');
                div.setAttribute('id',d);
                div.innerHTML = '';
                document.body.appendChild(div);
            }

            var fetchedHTML = responseDetails.responseText;
            if(!/<body[^>]*>/i.test(fetchedHTML))                                   // Fix bux3.com & buxclicks.net
                fetchedHTML = '<body>'+fetchedHTML;                                 // fucked up html with no <body> tags
            if(!/<\/body>/i.test(fetchedHTML))
                fetchedHTML += '</body>';
            fetchedHTML = fetchedHTML.split(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
            div.innerHTML = fetchedHTML;

            if(webPage.match(/cash-harvest.com/i)){//} || webPage.match(/seven-bux.com/i)){
                if(webPage.match("view=account&ac=earn")){                                  //If page is EARNINGSAREA
                    var clicklinks = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"view=account&ac=click")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    clicklinks = clicklinks.snapshotItem(0).href.replace(/http(.?):\/\/(.*).(.*)\/(\??)/,d);
                    getLinks(clicklinks,lineNumber);
                    return;
                }
                if(!(webPage.match("view=account&ac=click") || webPage.match("view=click&sid"))){                                //If page isn't SURFPAGE then is the homepage
                    try{
                        if(webPage.match(/cash-harvest.com/i))
                            var earningsArea = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"view=account&ac=earn")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                        if(webPage.match(/seven-bux.com/i))
                            var earningsArea = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"view=click&sid")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                        earningsArea = earningsArea.snapshotItem(0).href.replace(/http(.?):\/\/(.*).(.*)\/(\??)/,d);
                        getLinks(earningsArea,lineNumber);
                    }
                    catch(e){
                        runningLoads--;
                        editStatus("Error: Login!", lineNumber);
                        setTimeout(function(){
                            getLinks(webPage,lineNumber);
                            return;
                        },60000);
                        return;
                    }
                    return;
                }
                runningLoads--;
                go(d, lineNumber);
                return;
            }

            if (webPage.match(/argentinaptc.com.ar/)){
                var updatedURL = document.getElementById(d).innerHTML.match(/surf.php\?ver=(\d+)"/)[1];
                if(!webPage.match(updatedURL)){
                    getLinks('http://argentinaptc.com.ar/surf.php?ver='+updatedURL, lineNumber);
                    return;
                }
            }

            login = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"login") or (contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"login")) and(not (text()))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            login1 = document.getElementById(d).innerHTML.match(/\?u=l/i)                   //neobux & others
            login2 =document.evaluate('//div[contains(@id,"'+d+'")]//form[(contains(@action,"login.php"))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //buxfly

            if (login.snapshotItem(0) || login1 || login2.snapshotItem(0)) {
                runningLoads--;
                editStatus("Error: Login!", lineNumber);
                setTimeout(function(){
                    getLinks(webPage,lineNumber);
                    return;
                },60000);
                return;
            }
            runningLoads--;
            go(d, lineNumber);
        }
    });
    return;
}

///////////////////////////////////////////////////////////////////
// A Lot of Code Here Is From:
//           Script : Bux : Browse Ads
//                    Automatically browses ads on bux sites
//       Written by : w35l3y
//      Script Page : http://userscripts.org/scripts/show/38967
//          Website : http://gm.wesley.eti.br/bux
//////////////////////////////////////////////////////////////////

function go(referer, lineNumber){

    var place = referer.replace(/http(.?):\/\//,'').split('/')[0];
    place = place.replace(/www(\d?)./,'');

    switch (place)
    {
	case 'pilhaclicks.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@onclick,"cashads.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/&code="(\d+)">/)[1];

                    return 'visit.php?ad='+ad+'&code='+verify;
                }],
                time:30, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case '10ads.info':
        case 'ads2getrefs.com':
        case 'ara-bux.com':
        case 'beanybux.com':
        case 'bux3.com':
        case 'buxclicks.net':
        case 'buxvision.com':
        case 'buyas.info':
        case 'incrasebux.com':
        case 'max-ptc.com':
        case 'monkeybux.com':
        case 'osoclick.com':
        case 'paid-bux.info':
        case 'pandabux.com':
        case 'stablebux.info':
        case 'trafficbux.info':
        case 'unclebux.com':
        case 'world-clix.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    try{
                        var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                        var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                        return '/success.php?ad='+ad+'&code='+code+'&verify=1';
                    }
                    catch(e){
                        if (place.match('bux3.com')){
                            GM_openInTab('https://bux3.com/hash.swf');
                            return '';
                        }
                    }
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'cashmybux.com':
        case 'clickmybux.com':
        case 'earnmybux.com':
        case 'makemybux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                    return '/success.php?ad='+ad+'&code='+code+'&verify=1';
                }],
                time:30, //30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'adster.gr':
        case 'advertising4you.net':
        case 'anbux.com':
        case 'argentoptc.com':
        case 'bonbux.com':
        case 'buxclick.ic.cz':
        case 'buxluz.webcindario.com':
        case 'buxzone.net':
        case 'cash-bux.com':
        case 'clix4free.info':
        case 'clix.uuuq.com':
        case 'extraearn.yw.sk':
        case 'fazebux.com':
        case 'geebux.com':
        case 'gobux.biz':
        case 'gotcent.com':
        case 'greatbux.eu':
        case 'huge-returns.com':
        case 'longstarbux.com':
        case 'mayaptc.com':
        case 'megabux.info':
        case 'newadbux.eu':
        case 'paid4clickz.com':
	case 'ptc.easyclicks.gr':
        case 'sakul.cz':
        case 'simplebux.co.cc':
        case 'smurfybux.com':
        case 'surfmypage.netsons.org':
        case 'superads.altervista.org':
        case 'twocentbux.hu.cz':
        case 'weekendbux.com':
        case 'wirebux.com':
        case 'yup-money.com':
        case 'zakeebux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/successp.php?ad='+ad+'&verify='+verify;
                }],
                time:30, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'bux.to':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    return '/success.php'
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'casadelclick.info':
        case 'suissebux.altervista.org':
        case 'superbux.info':
        case 'evobux.info':
        case 'alterbux.org':
	case 'ptc.1ptc.gr':
        case 'splurgebux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var extra = '';
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    if(e.responseText.match(/name="+window.name/i))
                        extra = '&name=';
                    return '/success.php?ad='+ad+'&verify='+verify+extra;
                }],
                time:30, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'argentinaptc.com.ar':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.responseText.match(/<input type="hidden" name="id" value="(\d+)">/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    var code = e.responseText.match(/&verify(\d+)=/)[1];
                    var x = screen.width + "%20x%20" + screen.height;
                    return '/success.php?ad='+ad+'&verify'+code+'='+verify+'&datos='+x+'%20Netscape';
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxdotcom.com':	// time untested
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"viehw.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/success.php?ad='+ad+'&verify='+verify;
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxfly.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var key = e.responseText.match(/var key=(\d+)/)[1];
                    var adid = e.responseText.match(/var adid=(\d+);/)[1];
                    var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
                    for(var num=0;num<4;num++){
                        if(e.responseText.match('id="button'+num+'"><img src="clickpictures/'+key+'.png"')) 
                            return '/viewfinal.php?button_clicked='+num+'&ad='+adid+'&pretime='+pretime+'';
                    }
                }],
                time:31,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxup.com':	// time untested
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"viewpaid.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/success.php?ad='+ad+'&verify='+verify;
                }],
                time:30,	// 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'cash-harvest.com':
	case 'theclickers.net':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"click.php?id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var key = e.responseText.match(/show="Click (\d+)"/i)[1];
                    var toReturn = e.responseText.match(/id=(\d+)&pretime=(\d+)&sid=(\w+)&sid2=(\w+)&siduid=(\d+)&/gi)[0];
		    var id = e.finalUrl.match(/id=(\d+)/)[1];
                    for(var num=0;num<4;num++){
                            return('/ptc/clickfinal.php?button_clicked='+num+'&id='+id);
                    }
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'dingobux.com':
        case 'chillbux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"click.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    try{
                        var key = e.responseText.match(/var key=(\d+)/)[1];
                        var adid = e.responseText.match(/var adid=(\d+);/)[1];
                        var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
                        for(var num=0;num<4;num++){
                            if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.png"'))
                                return '/clickfinal.php?button_clicked='+num+'&ad='+adid+'&pretime='+pretime+'';
                        }
                    }
                    catch(e){
                        GM_openInTab('http://'+place+'/hash.swf');
                    }
                }],
                time:31,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'eurovisits.org':
	case 'bux.gs':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"adclick.php?ID=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    return '/'+e.responseText.match(/finished\.php\?ad=\d+&code=[0-9a-f]+/);
                }],
                time:30,	// 30
                lineNumber:lineNumber
            }, 0);
            break;

        case 'isabelmarco.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"?p=view&ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/?p=success&ad='+ad+'&verify='+verify;
                }],
                time:30, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'perfectbux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"&ad_id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    return e.responseText.match(/success\.location\.href = '(?:https?:\/\/(?:www\d*\.)?perfectbux\.com)?(.+?)';/)[1];
                }],
                time:30, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'richclix.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"viewb.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    try{
                        var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    }
                    catch(e){
                        return '';
                    }
                    try{
                        var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    }
                    catch(e){
                        verify = '';
                    }
                    return '/successb.php?ad='+ad+'&verify='+verify;
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
	case 'hitzmagic.com':
	case 'waoindia.com':
        case 'taketheglobe.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var extra = '';
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    if(e.responseText.match(/name="+window.name/i))
                        extra = '&name=';
                    return '/success.php?ad='+ad+'&verify='+verify+extra;
                }],
                time:30, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'technobux.net':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.ptc?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                    return('/success.ptc?ad='+ad+'&code='+code+'&verify=1');
                }],
                time:10, // 10
                lineNumber:lineNumber
            }, 0);
            break;
        case 'thinkbux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//form[@action="view.php"]/input[@name="ad"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.responseText.match(/<input type="hidden" name="id" value="(\d+)">/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/success.php?ad='+ad+'&verify='+verify;
                }],
                time:25, // 25
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxp.info':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                    return '/success.php?ad='+ad+'&code='+code+'&verify=1';
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'extra10.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"click.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var key = e.responseText.match(/Please Click (\d+)/i)[1];
                    var toReturn = e.responseText.match(/ad=(\d+)&pretime=(\d+)/gi)[0];
                    for(var num=0;num<4;num++){
                        if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.gif"')){
                            return '/clickfinal.php?button_clicked='+num+'&'+toReturn;
                        }
                    }
                }],
                time:31,
                lineNumber:lineNumber
            }, 0);
            break;
	case 'theclixworld.com':
            surfAds({
                ads:document.evaluate('//div[contains(@id,"'+referer+'")]//a[contains(@href,"gpt.php?v=entry") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var id = e.responseText.match(/var id="(\d+)"/)[1];
                    var key = e.responseText.match(/var key="(\d+)"/)[1];
                    var type = e.responseText.match(/var type="(\w+)"/)[1];
                    var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
                    var url_variables = e.responseText.match(/sid=([\w\d]+)&sid2=(\d+)&type=(\w+)&siduid(\d+)&/gi)[0];
			for(var num=0;num<4;num++){
                                if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.gif"'))
                                    return 'gpt.php?v=verify&buttonClicked='+num+'&id='+id+'&type='+type+'&pretime='+pretime+'&'+url_variables+'';
                            }
                        }],
                        time:0,
                        lineNumber:lineNumber
                    }, 0);
              break;

	case 'nomincashout.com':
            surfAds({
                ads:document.evaluate('//div[contains(@id,"'+referer+'")]//a[contains(@href,"cks.php?k=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"470423208DCE534320520DEC954C4B522C1C1A")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
               	referer:[referer,function(e)
                {
                    return '/cmp.php?complete&'
                }],
		        time:30,
		        lineNumber:lineNumber
            }, 0);
              break;

        //        case 'my-ptr.com':
        //            surfAds({
        //                ads:document.evaluate('//div[contains(@id,"'+referer+'")]//a[contains(@href,"runner.php?PA=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
        //                referer:[referer,function(e)
        //                {
        //                    return '&FR=1';
        //                }],
        //                time:10,
        //                lineNumber:lineNumber
        //            }, 0);
        //            break;
        //        case 'seven-bux.com':
        //            surfAds({
        //                ads:document.evaluate('//div[contains(@id,"'+referer+'")]//a[contains(@href,"gpt.php?v=entry") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
        //                referer:[referer,function(e)
        //                {
        //                    var id = e.responseText.match(/var id="(\d+)"/)[1];
        //                    var key = e.responseText.match(/var key="(\d+)"/)[1];
        //                    var type = e.responseText.match(/var type="(\w+)"/)[1];
        //                    var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
        //                    var url_variables = e.responseText.match(/sid=([\w\d]+)&sid2=(\d+)&type=(\w+)&siduid(\d+)&/gi)[0];
        //                    for(var num=0;num<4;num++){
        //                        if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.gif"'))
        //                            return 'gpt.php?v=verify&buttonClicked='+num+'&id='+id+'&type='+type+'&pretime='+pretime+'&'+url_variables+'';
        //                    }
        //                }],
        //                time:31,
        //                lineNumber:lineNumber
        //            }, 0);
        //            break;
        default: editStatus('Error: Functions Not Defined For This Website', lineNumber);
    }
}


///////////////////////////////////////////////////////////////////
// The following function is the hearth of the scrtipt
// I've taken it from the following script
//           Script : Bux : Browse Ads
//                    Automatically browses ads on bux sites
//       Written by : w35l3y
//      Script Page : http://userscripts.org/scripts/show/38967
//          Website : http://gm.wesley.eti.br/bux
//////////////////////////////////////////////////////////////////
function surfAds(info, n)
{
    var ad, ads;
    var lineNumber = info.lineNumber;
    var d = info.referer[0].split('/')[0]+'//'+info.referer[0].replace(/http(.?):\/\//,'').split('/')[0]+'/';
    if(/10ads.info/.test(d))
        d += 'index.php/';
    ads = info.ads;

    try{
        ads.snapshotItem(0);
        ads = isCheatLink(ads)
        info.ads = ads;
        totalLinks += ads.length;
    }
    catch(e){}
    //    if(n==0){
    //        ads = isCheatLink(ads)
    //        info.ads = ads;
    //    }

    updateProgressBar();

    if ((ad = ads[n])){
        
        ad.href = ad.href.replace(/http(.?):\/\/(.*).(.*)\/(\??)/,d);
        
        //        GM_log(ad.href)
        //        surfAds(info,++n);
        //        return;

        //        if(n==0 && areEqual(ads,lastLinks[lineNumber])){                    // Check if links are always the same
        //            editStatus("Error: Links aren't being clicked!", lineNumber);   //   in which case it means they aren't being clicked
        //            setTimeout(function(){
        //                getLinks(info.referer[0],lineNumber);
        //            },10*60000);
        //            return;
        //        }

        if (ad.href.match('ucash.in'))                                      // Un-UCASH Links
            ad.href = ad.href.substring(24);

        //        if (/my-ptr.com/i.test(d)){                                   //ptr top frame // CashCrusader
        ////            info.referer[0] = ad.href;
        //            d = ad.href;
        //            ad.href += '&FR=1';
        //            GM_log(ad.href);
        //        }
        //        else

        var tmp = ad;
        var postData = '';
        if (ad.tagName=='INPUT'){                                           // gambiarra temporÃ¡ria
            postData = 'ad='+ad.value;
            return;
            tmp = document.createElement('a');
            tmp.setAttribute('href', '/view.php?ad='+ad.value);
        }
        var remain = " ("+(ads.length-n)+")";
        var t = info.time;
        editStatus(tmp.href+"... "+t+remain, lineNumber);

        GM_xmlhttpRequest({
            'url':tmp.href,
            'method':( postData ? 'post' : 'get' ),
            'headers':{
                'Referer':info.referer[0],
                'Content-Type':( postData ? 'application/x-www-form-urlencoded' : 'application/xml' )
            },
            'data':postData,
            'onload':function(e)
            {
                if(e.responseText.match('surftopframe')){
                    if(e.responseText.match('v=cheat')){        //cheat check
                        editStatus('Error: CheatCheck! Open one ad manually!', lineNumber);
                        return;
                    }
                    //                    info.referer[0] = ads.snapshotItem(n).href;
                    ads[n].href = e.responseText.match(/frame name="surftopframe" src="(\S*)"/i)[1];
                    surfAds(info, n);
                    return;
                }

                if (/^2/.test(e.status))
                {
                    var secs = setInterval( function()
                    {
                        editStatus(e.finalUrl + "... " + (--t) + remain, lineNumber);
                    }, 1000);

                    setTimeout(function()
                    {
                        clearInterval(secs);
                        editStatus(e.finalUrl + "... 0" + remain, lineNumber);

                        var url = info.referer[1](e);
                        if (url == 'error'){
                            editStatus('Error: Invalid Links', lineNumber);
                            return;
                        }

                        if (!!url)
                        {
                            var force_reload = setTimeout(function()
                            {
                                getLinks(info.referer[0],lineNumber);
                                return;
                            }, Math.max((info.time * 500)+5000, 10000));

                            GM_xmlhttpRequest({
                                'url':d+url,
                                'method':'get',
                                'headers':{
                                    'Referer':info.referer[0]
                                },
                                'onload':function(e)
                                {
                                    editStatus('...Link Processed'+ remain, lineNumber);
                                    setTimeout(function(){
                                        clearTimeout(force_reload);
                                        force_reload = null;
                                        if (!this.falseNegative){
                                            if ((info.referer[0].match('superbux.info') || info.referer[0].match('splurgebux.com')) && !ads[n].href.match(/ad=(\d+)/)[1].match('000000000000000')){
                                                var zeroed = ads[n].href.split('ad=');     //Bonus Multiplier!;)...exploits a bug of these bux so that every ad is clicked 16 times!
                                                ads[n].href = zeroed[0]+'ad=0'+ zeroed[1]
                                                surfAds(info, n);
                                                return;
                                            }
                                            else{
                                                surfAds(info, ++n);
                                                processedLinks++;
                                            }
                                        }
                                    }, info.time/10);
                                },
                                'onerror':function(e)
                                {
                                    clearTimeout(force_reload);
                                    force_reload = null;

                                    if (!this.falseNegative){
                                        surfAds(info, ++n);
                                        processedLinks++;
                                    }
                                },
                                'onreadystatechange':function(e)
                                {
                                    if (e.readyState == 2) // Sent
                                    {
                                        clearTimeout(force_reload);
                                        force_reload = null;

                                        this.waiting = setTimeout(function(e)
                                        {
                                            surfAds(info, ++n);
                                            processedLinks++;
                                            this.falseNegative = true;
                                        }, Math.max(info.time * 500, 10000), e);
                                    }
                                    else if (e.readyState == 4) // Received
                                    {
                                        clearTimeout(this.waiting);
                                        this.waiting = null;
                                        delete this.waiting;
                                    }
                                }
                            });

                        }
                        else if (!this.falseNegative){
                            surfAds(info, ++n);
                            processedLinks++;
                        }
                    }, t * 1000);
                }
                else if (!this.falseNegative){
                    surfAds(info, ++n);
                    processedLinks++;
                }
            },
            'onerror':function(e)
            {
                if (!this.falseNegative){
                    surfAds(info, ++n);
                    processedLinks++;
                }
            },
            'onreadystatechange':function(e)
            {
                if (e.readyState == 2) // Sent
                    this.waiting = setTimeout(function(e)
                    {
                        surfAds(info, ++n);
                        processedLinks++;
                        this.falseNegative = true;
                    }, Math.max(info.time * 500, 10000), e);
                else if (e.readyState == 4){ // Received
                    clearTimeout(this.waiting);
                    this.waiting = null;
                    delete this.waiting;
                }
            }
        });
    }
    else if (n)
    {
        editStatus("Reloading... (0)", lineNumber);
        lastLinks[lineNumber] = ads;
        getLinks(info.referer[0],lineNumber);
        return;
    }
    else
    {
        editStatus("DONE!", lineNumber);
        lastLinks[lineNumber] = null;
        setTimeout(function(){
            window.location.reload()
            return;
        }, Math.floor(120000+Math.random()*30000));
    }
}

function isCheatLink(ads){

    var legitLinks = new Array();

    for(var n=0; n<ads.snapshotLength; n++){

        var ad = ads.snapshotItem(n);

        var currentIsCheat = false;

        while(1){

            var img = ad.getElementsByTagName("img")[0];
            ad.textContent = ad.textContent.replace(/(\W*)/g,'');             //Deletes non alphanumeric characters to match "C**H E-A.T" and similar
    
            if(!ad.href.match(/(\d+)/)){
                currentIsCheat = true;
                break;
            }
  
            if(img)                           //Images Links
                if (img.src.length > 10){
                    //                                        GM_log(img.src+'<--------GOOD');
                    currentIsCheat = false;
                    break;
                }
            //                            else
            //                                GM_log(ad.textContent+'<----imgLength - '+img.src);
            if(ad.textContent.length < 5){
                //                                GM_log(ad.textContent+'<---textLength - '+ad.textContent.length);
                currentIsCheat = true;
                break;
            }

            for(var x in textFilter)
                if(textFilter[x].test(ad.textContent)){
                    //                                        GM_log(ad.textContent+'<---textFilter - '+textFilter[x]);
                    currentIsCheat = true;
                    break;
                }

            break;
        }
        
        if (!currentIsCheat)
            legitLinks.push(ad);
    }
    
    return legitLinks;
}


function startAR(){

    var checked = false;
    var tempArray = webArray.slice();

    container.style.display = 'none';
    regContainer.style.display = 'inline';
    if(generalShadow.style.display != 'inline'){
        generalShadow.style.display = 'inline';
        insertScript("Effect.Fade('MBM_generalShadow', { duration: 3.0, from: 0, to: 0.7 });");
    }

    if(regContainer.getElementsByTagName('div')[0])         //If it's not the first time the registration button is pressed
        return;

    checkBoxList = document.createElement('div');
    checkBoxList.setAttribute('id','MBM_REG_checkBoxList');
    regContainer.appendChild(checkBoxList);
    document.body.appendChild(regContainer);

    var checkForm = document.createElement('form');
    checkForm.setAttribute('name','test');
    checkBoxList.appendChild(checkForm);

    for(var x in surfPages){
        if(add(tempArray,surfPages[x])){                         //If i'm not already registered to this website add the checkbox

            var page = surfPages[x].split('/')[0]+'//'+surfPages[x].replace(/http(.?):\/\//,'').split('/')[0]+'/';

            var currentCBDiv = document.createElement('div');
            currentCBDiv.setAttribute('class','MBM_REG_checkBoxElement');

            var currentCBE = document.createElement('input');
            currentCBE.setAttribute('type','checkbox');
            currentCBE.setAttribute('name', 'MBM_registrations');
            currentCBE.valueALT = surfPages[x];
            currentCBE.setAttribute('value', surfPages[x]);

            if(checked) currentCBE.setAttribute('checked', true);

            currentCBDiv.appendChild(currentCBE);
            currentCBDiv.innerHTML += page;
            checkForm.appendChild(currentCBDiv);
        }
    }

    var toggleCheck = document.createElement('div');
    toggleCheck.setAttribute('style','position:fixed;bottom:48px;right:317px;');
    toggleCheck.innerHTML = '<IMG SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFkD87SZMt6cfF8vLy4eHhmiAamMs2gL8mgEsgjLSB9fX12trafR4Z6aekrR8Y+/v7pdJa4O/P5La0kE8dsJGP3t7e0zkswxwXxzcsicQ7isFK3lRB/Pz8nLFihB4Z6enp19fX6JeVm8xUqFEat7NNxcXF+/X11nZyuS0kuSEa1+u83Ew7ix8ZcYEoy+SH9vrtutiHmMsp8tvbrSEbhsIi0l5Z1JGN2EhCtSIb8Lm4kcYZ9cvKzczMpCEakh8ayCMcvby8aK0tfjUo5eXle7wiysnJ3UQ1q0tHmbk57+/v5YmF9OPilMgV25yZw0U8viMb0dDQ/vr6urm54FlEwsHB2z0w++3t1EIzyIeEsiEaebk32WpmhyccwCIbPoku27q4oXt5tjw2n9Bj1IeEm81cz5GKo9FMrtSLyeShi3kjhMEdoSAa0CMcmx4Yfr4e////xVpVRI8tcrQrn85rZ6Qt31pVk8gOps2KpyEapkI4xXt3yz8zd7oh7Ozsdbcq+Pj4jsUUh7N1kccUhcEkliAagsAljsUbcrYkm81NlcpS0y4kZqstqFxZbrIr1Uk5uX16bbIlm8OMo7Kge7wolctKVp4t7dfWvbu7jcUdxC0jxyIbksdWa7AshBwXx8bGzCIa9tTUUJktjR0X0nNuvTMquFpW7M7MxiMctCcfyh4YkMhHrCsadJ5v0B4X31I/yiMcqiEbebkpXKMtYagtzSQcfr4owyMci8QeicMgwL+/oM9F0M/PzMvL7rCvQIgylzAkzUpE0k9KoHMptyMcd7kn1emk+NbWkccuoM9Ryt7DmpxO3XRxv2Vg8O7izmdhyMfH5fK/s9hcYaBGcqIrdVQjuYNg8Pjinn0aryghqDQuqTUwoLhDk8VaybiLl8lXnooauyIbiJskgZ9moZU31NPTw8LCrycf4JOQoCUdo1BL3089SpE5vycf18GR3kM6fqN3k7p+tainoB4YtigYiMMal15bicMfrUIZ7+zssCMcwt+gxSggjcZJm80/1+qe/////B1HHAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAANGSURBVHjarJZ7SFNRHMftjzmDkMFkm5OENGhjKomvEFokohJqf1zGNDWypkNTSc3nJHyVtmwqGtRMJB/ofM7e+EdmBUpG0IsellmBr6TELBGV073n3HvuvW6WRp8/xv19z/cDl7GdcxzAFnGwHx/K0YRRaL7l7NqEEKSZJYjeWZVqtpcgZjU5fxGCwgg3jbEHkWYMIwiuYiOMSggV2U7D9PQY3dyMGwpDYYTR0nSTR5NFQkhG7QtBKpPF0meDpc9NG2dPGFJppeYDELPZTH/ASarSjtoKcVqttB2xYoibIr/dAFm7Gc5mqUliK0i00tuIhCEc3mcik2y9YDAlsOzB8dQcSlZMAXxhynBl4jAGGz4AzMFEKZPxBYNBOcFBCQ2fZJHoGaATQwBPkM0p+ZCGj2jA11GUvPsHDFplXKFFFruPj7IFiHxzI3MjB0RjnlTwUBbFEaIVUOhoZT3PEbJPkusrGlgi51jFU47Q2hFLcQokxtIsjTiWBkNKS30/UokimiMolv1InE8AkOhMPfl1ja0VB2NeU9GygiNMWmGNekTGl8ric5iILrjKEQInrRA4JOZbrQ9GLrMMJKHVNxzBmg8BtOHpMbx4h2ENBKJVKytE7UfQY8GY4+Jdml/DAMQwy1j4MH0SkoTGvfWp/gxlrwB4sgBXp7FQ6REhppKFNjR7+LOIFwrBOygsvGUEna5e5yEWCATp03A+7ppaxpBCpuHTAor0NlrQuWZkZHSOQ6OQeqHOjLMMn2BTgIQkJJB9oVBIGwIyOC/E9A8KOKAfn8419BZF6Oq4uLy8vIB8IRRQUAkmHArZrkV1iCLSUKvVj1eZoK4uRc0F/YHkj/oZKlYbnNTihn6cyAua2XpzOP2PO8NSIX/vLT9SgWcABpu9aJq9mE1An8VSI8+W1+BpZ/VMvBcWYvCuob/IUpPFPr+I92rE/cYqzr6kv2oXJ3eWxhneVqk/aAdvbr9q3Wasv2DD6Xi27l5ts93n3VjPyx0YB3sHSt51Pt5s3cX+kTV/iUcIaof8dNnwUCy5xuGzyzESlz8fu/Ns//nmzunabQybPdhrMxElm74JbM88SvJ1C1eH72T/3tbuGt3d/3A5+Y/CbwEGAIPwGeDMcFfJAAAAAElFTkSuQmCC" ALT="CHECK/UNCHECK" TITLE="CHECK/UNCHECK" border="0">';
    toggleCheck.addEventListener('click',function(e){
        checked = !checked;
        for (var i=0; i<document.getElementsByName('MBM_registrations').length; i++){
            document.getElementsByName('MBM_registrations')[i].checked = checked;
        }
    },false);

    checkBoxList.appendChild(toggleCheck);


    var submitButton = document.createElement('div');
    submitButton.setAttribute('style','position:fixed;bottom:0px;right:317px;');
    submitButton.innerHTML = '<IMG SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAABPRJREFUaIHtmV1sVEUUx//nfnd32y7QtGKi1hj0wQIFg+EB7JcafMEYE4zBjwQ0hvgs8QXFB0kk0QRCfDAxITGRByXKIwGsWiml2EgUhJhIm621NO1aaff7zszxodtyu3tbbrt1t016kpPZ2ZmcOb97zpmZvUvMjJUsWqUdKFVWASotqwCVlhUPYJRzsc/7Gt5h6FsZiV9q7NCxl5puZ0u1SeU6Bz67Et5tm1vPOOZGuGIAyVxPr8L4cwe28T+l2C1bChnaAx1CpTCe/AaSFSL2M08S6i+c6KW1pdgtG4CAvD8rhiFZYCLTjYwYRMRubSY0nD92iaKLtVs2AKlcloqh2AAQRiL7O9LuIGrsli26dl/n8Z7FRaJsAEppULiroDAS2ZtIi79R4zzVDKz/7uPuhUOUDYCh5ZgJXiUKYzJzAxl3GLXOzs06rT9/tIvWLMTunLvQ0a7oDiKqJbIAlLxTuboW/kCx3O43qFQa1c7jcIwGxFMXr0oVbzu4I/1vEMNFAKdv7tFuxbtPRqxHXg1bjQAALgGAQGCWiKeuQKoUQMVBJwCSM6ixm+CYdRhLXrwqOd7+7o70+IIBPvxx7faos+lS2GpEItcPsFq089PuMRQy4jYUCxBozpmSM6h1muAY6zCa7O7LybGnD7Wk5o1EEcAnlzY/a2przk7m+gGWwDwLLgiDzECWJGcQrdoIW49iNNnTJzDecWjnxJ255hfFk1njydwQmHWAHIDsJVHG7F1oLiUKIZ66jqycQF14+xPE68599NND4cAAUikoBTB0KKaKqEZVGEteQ1YksC7UvM1V5peBAWaeBldWiUIYTV6DUkDEenj3+52NbwcDqNBT91MiByPJ32Do1bCNuvcOf7+h6MpRdJ2WiiDV0hRu6UJgZoynYrCN6vrx9PAWAJ3eGcUAkiDlcgEAAAPpXApSAjoiRRlTBCAkQSwrAABgSJm5E7HrrxWO+KTQlC4nYSaYunn8UFvXSOGYbwottwgYmtktRd1h37HCLyRjGRUxoJF2y9bXvnhk1znfvPCrAVouRUykxTTN6Diy68LtueYUAbhCZYUiLMEVevHCABENGrrVfvz53oH5phYBVNsNl8cSQz8IJVuWlIGCXwuJKGboVtunL/Teuudcvx80B0+/Zo1mbrwMougS3UVdV+UOKCWb7j2VYqbmtJ7ce7k/kOVyvRfae3LbFzmZfWVeZ4hium62n3r95z+D2i3bmznXZcuV/mMMQCMaNDSz/dS+4M4D5QSQ0FzhP0ZEMdKs1q/euhIobbxSNgCltKzwiQARxWzbav12Ec4DCwAwaKacvXVNPt8V9lkwy1wOf7gSd3dnAgg0FIpWtZ7Z39Nv0MwCDAAiYG0aHuf0fF/3qOZpyaf1Anj7syCIaKJ5/4b+yKMhsFIgIrDAUPzqnT03v/41brxBD+YdV9OtQTTdl552WgUAKZindiGDaOp9H1ADIATAzsMYPhB+APDpz0Dw1LuN5KY3H9tn1RutnMbAX2dHToxcHxvSgVqv4/m20HmR1yyAFIAJAEnBLKYBdABVACIAHACWTzTmioBfGhXBMKAUkMzbdQGY+tQ6jNlOe9vCp54DkAGQAJAWzHLmHMjnoNfB+dLGT/0gZjHkPWMN4PzBzPNoIYzyfhZ5x5f8IPMUu68ELc6gUraT+P+SFf8n3ypApWUVoNLyHz7294lcHdLbAAAAAElFTkSuQmCC" ALT="GO!" TITLE="GO!" border="0">';
    submitButton.addEventListener('click',function(e)
    {
        checkBoxList.style.display = 'none';

        for (var i=0; i<document.getElementsByName('MBM_registrations').length; i++){
            if (document.getElementsByName('MBM_registrations')[i].checked==true)
                toRegister[toRegister.length] = document.getElementsByName('MBM_registrations')[i].value;
        }

        registrationBox = document.createElement('div');
        registrationBox.setAttribute("id","MBM_REG_registrationBox");

        header = document.createElement('div');
        header.setAttribute("id","MBM_header");
        header.setAttribute("style","color:white;height:70%;text-align:center; font-size:x-large; font-weight:bold; line-height:9em; background-image:url(http://www.info360.org/image/firefox_icon.png); background-repeat: no-repeat;background-position: 3% 5%; overflow-y:hidden;overflow-x:auto;");

        footer = document.createElement('div');
        footer.setAttribute("id","MBM_footer");
        footer.setAttribute("style","width:100%; height:30%; color:white; border-top:1px grey solid;overflow:hidden;");

        var leftC = document.createElement('div');
        leftC.setAttribute("id","MBM_REG_leftcolumn");
        leftC.innerHTML = '<IMG SRC="data:image/png;base64,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%3D%3D" ALT="SKIP" border="0">';
        leftC.innerHTML += '<span>Skip...</span>';
        leftC.addEventListener('click', function(e)
        {
            goAR();
        }, false);

        var rightC = document.createElement('div');
        rightC.setAttribute("id","MBM_REG_rightcolumn");
        rightC.innerHTML = '<IMG SRC="data:image/png;base64,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%3D" ALT="ADD" border="0"><span> Done!</span>';
        rightC.addEventListener('click', function(e)
        {
            registerWeb(lastARLink);
            //            addLine(lastARLink, webArray.length);
            goAR();
        }, false);

        footer.appendChild(leftC);
        footer.appendChild(rightC);

        registrationBox.appendChild(header);
        registrationBox.appendChild(footer);
        regContainer.appendChild(registrationBox);
        
        goAR();
        
    },false);
    checkBoxList.appendChild(submitButton);
}

function goAR(){

    if(toRegister.length == 0){

        header.textContent = 'All Websites Registered! Refresh to Update';

        footer.getElementsByTagName('div')[0].innerHTML = '<IMG SRC="data:image/png;base64,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%3D%3D" ALT="ADD" border="0"><span> Bo Back</span>'
        footer.getElementsByTagName('div')[0].addEventListener('click', function(e)
        {
            generalShadow.style.display = 'none';
            generalShadow.style.opacity =.0;

            regContainer.style.display = 'none';

            container.style.display = 'inline';
        }, false);

        footer.getElementsByTagName('div')[1].innerHTML = '<IMG SRC="data:image/png;base64,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%3D" ALT="ADD" border="0"><span> Refresh</span>'
        footer.getElementsByTagName('div')[1].addEventListener('click', function(e)
        {
            window.location.reload();
        }, false);
        
        return;
    }

    var web = toRegister[0].split('/')[0]+'//'+toRegister[0].replace(/http(.?):\/\//,'').split('/')[0]+'/';

    header.textContent = web;
    GM_openInTab(web);
    lastARLink = toRegister[0];
    toRegister.shift();
}

function updateProgressBar(){

    return;

    if(processedLinks == totalLinks){
        processedLinks = 0;
        totalLinks = 0;
    }
    if(processedLinks==0 || totalLinks==0)
        var percentage = 0;
    else
        var percentage = (100*processedLinks)/totalLinks;
        
    processDivInt.style.width = percentage+'%';
}

function editStatus(what,lineNumber){
    lineNumber = (lineNumber*1) + ((lineNumber-1)*3) + 4;
    var div = document.getElementById('MBM_container').getElementsByTagName('div')[lineNumber];
    if(what.length>200)
        what = '(...)'+what.substring(what.length-200);
    div.innerHTML = '<font color="Black">'+what+'</font>';
    return;
}

function registerWeb(txt){
    var newArray;
    var array = eval(GM_getValue('webArray'));
    if(!array)
        array = new Array;

    if(txt.length){
        var node = document.getElementById('MBM_newwebline');
        text = txt;
    }
    else{
        var node = this.parentNode.parentNode
        var text = node.getElementsByTagName('input')[0].value;
    }

    if(text.match(/(\S*)argentinaptc.com.ar\//i))
        text = text.match(/(\S*)argentinaptc.com.ar\//)[0];

    if(text.match(/(\S*)cash-harvest.com\//i))
        text = text.match(/(\S*)cash-harvest.com\//)[0];

    if(text.match(/(\S*)seven-bux.com\//i))
        text = text.match(/(\S*)seven-bux.com\//)[0];
    
    if ((newArray = add(array, text))){

        GM_setValue("webArray",uneval(newArray));                        //updates the array saved in memory
        webArray = newArray;
        
        if(node){
            node.parentNode.removeChild(node);
            addLine(text, shift+webArray.length);
            container.appendChild(node);
        }
    }
    else
    if(node)
        editStatus('ADS Page Already Added! / Invalid Page!',++webArray.length);
    return;
}

function add(ary, text){
    var x;
    var re = /\s/
    var toMatch = text;
    if (re.test(text) || text == '')                            //If text contains spaces or is empty, it's not a valid url
        return false;
    if(!text.match(/http(.?):\/\//))
        text = 'http://'+text;
    toMatch = toMatch.replace(/http(.?):\/\//i,'');
    toMatch = toMatch.replace(/www(\d?)./i,'');
    for (x in ary)
        if (ary[x].match(toMatch))                                     //If the page has already been inserted nothing is done
            return false;
    ary[ary.length] = text;
    ary.sort(sortFunction);
    return ary;
}

function sortFunction(a,b){
    a = a.replace(/http(.?):\/\//i,'');
    a = a.replace(/www(\d?)./,'');
    b = b.replace(/http(.?):\/\//i,'');
    b = b.replace(/www(\d?)./,'');
    return a>b;
}

function unregisterWeb(){
    node = this.parentNode.parentNode;
    var text = node.getElementsByTagName('div')[0].textContent
    insertScript('Effect.SlideUp("MBM_line_'+text+'");');
    shift += 1;
    webArray = remove(webArray,text);
    return;
}

function remove(ary, elem) {
    var x;
    for (x in ary)
        if (elem == ary[x])                                     //Scans the array looking for the website that has to be removed
            break;
    ary[x] = undefined;
    for (var i in ary) {                                        //keeps the array compacted, so that no empty values are present
        if (ary[i]==undefined || ary[i]==null || ary[i]=='')    //
            ary.splice(i, 1);                                   //This for cycle is written by: thespohtexperiment
    }                                                           //http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
    GM_setValue("webArray",uneval(ary));
    return ary;
}

function addGlobalStyle() {
    //
    ////////////////////////////////////////////CSS STYLES///////////////////////////////////////////////////
    //////////////////////////////NEEDED FOR TABLES//////////////////////////////
    /*-----The big blue table-----*/
    GM_addStyle(<><![CDATA[
        #MBM_container
        {
        position:fixed;
        top:5%;
        bottom:11%;
        left:5%;
        right:5%;
        margin:10px auto;
        width:auto;
        color:black;
        text-align:center;
        -moz-border-radius:2em;
        background-color:#A4D3EE;
        opacity:0.92;
        overflow:auto;
        }
        #MBM_container > div:hover
        {
        background-color:#87CEFA;
        }
        /*-----The left bar with the icons-----*/
        #MBM_sidebar
        {
        position:fixed;
        top:5px;
        left:0px;
        width:50px;
        text-align:center;
        -moz-border-radius-topright:1em;
        -moz-border-radius-bottomright:1em;
        background-color:#A4D3EE;
        opacity:0.9;
        z-index:1;
        overflow:hidden;
        }
        #MBM_sidebar div  {
        height:48px;
        overflow:hidden;
        }
        /*-----The lines of the table-----*/
        .MBM_tableline
        {
        width:auto;
        height:25px;
        border-bottom:1px #363636 dashed;
        overflow:hidden
        }
        .MBM_leftcolumn
        {
        position: absolute;
        left:5px;
        height:20px;
        width:45%;
        text-align:left;
        margin-top:5px;
        font-size:13px;
        font-weight:bold;
        overflow:hidden;
        }
        .MBM_centercolumn
        {
        position: absolute;
        margin-left:48%;
        margin-right:2%;
        text-align:left;
        margin-top:5px;
        font-size:13px;
        font-weight:bold;
        overflow:hidden;
        }
        .MBM_rightcolumn
        {
        position: absolute;
        right:5px;
        height:20px;
        width:2%;
        margin-top:5px;
        }
        #MBM_ads
        {
        visibility:hidden;
        }
        ]]></>);
    ////////////////////////NEEDED FOR AUTOCOMPLETITION////////////////////////
    GM_addStyle(<><![CDATA[
        div.autocomplete {
        margin:0px;
        padding:0px;
        width:250px;
        color:BLACK;
        background:#fff;
        border:1px solid #888;
        position:fixed;
        z-index:3000;
        }
        div.autocomplete ul {
        margin:0px;
        padding:0px;
        list-style-type:none;
        }
        div.autocomplete ul li.selected {
        background-color:#87CEFA;
        }
        div.autocomplete ul li {
        margin:0;
        padding:2px;
        height:32px;
        display:block;
        list-style-type:none;
        cursor:pointer;
        }
        ]]></>);
    ////////////////////////NEEDED FOR REGISTRATION HELPER///////////////////////////
    GM_addStyle(<><![CDATA[
        #MBM_generalShadow
        {
        position:fixed;
        top:0px;
        bottom:0px;
        right:0px;
        left:0px;
        display:none;
        background-color:black;
        opacity:.0;
        }
        #MBM_REG_registrationBox
        {
        position:fixed;
        top:30%;
        right:25%;
        left:25%;
        height:40%;
        min-height:300px;
        min-width:400px;
        -moz-border-radius:3em;
        background-color:BLACK;
        overflow:hidden;
        }
        #MBM_REG_checkBoxList
        {
        position:fixed;
        top:0px;
        left:300px;
        right:300px;
        bottom:0px;
        min-width:250px;
        text-align:left;
        background-color:#A4D3EE;
        overflow:auto;
        }
        .MBM_REG_checkBoxElement
        {
        width: auto;
        height: 25px;
        color: black;
        border-bottom: 1px grey dashed;
        overflow: hidden;
        }
        #MBM_REG_leftcolumn
        {
        float:left;
        height:100%;
        width:48%;
        margin-top:20px;
        margin-left:5px;
        color:red;
        text-align:center;
        font-size:x-large;
        }
        #MBM_REG_rightcolumn
        {
        float:right;
        height:100%;
        width:48%;
        margin-top:20px;
        margin-left:5px;
        color:LimeGreen;
        text-align:center;
        font-size:x-large;
        }
        ]]></>);
    ///////////////////////////STATS STYLES///////////////////////////////
    GM_addStyle(<><![CDATA[
        div.progress-container {
        position: fixed;
        bottom:0px;
        left:0px;
        right:0px;
        border: 1px solid GREEN;
        background-color: #C1FFC1;
        padding: 1px;
        }
        div.progress-container > div {
        background-color: #6E8B3D;
        height: 15px
        }
        ]]></>);
///////////////////////////////////////////////END OF CSS STYLES///////////////////////////////////////////////
}

function visit(){
    if(date.getDate()+''+date.getMonth() == GM_getValue('lastAdDay'))
        return;
    var elem = document.evaluate('//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=Math.ceil(Math.random()*2)-1; i<elem.snapshotLength;i++){
        if (elem.snapshotItem(i).href.match('b-264973846')){
            GM_openInTab(elem.snapshotItem(i).href);
            GM_setValue("lastAdDay",date.getDate()+''+date.getMonth());
            break;
        }
    }
}

function areEqual(a,b){                                         //Compares two NODE_SNAPSHOT_TYPE returns true is both contain the same links, false otherwise
    var elementA;
    if(a == null || b == null)
        return false;
    if(a.snapshotLength != b.snapshotLength)
        return false;
    for(var x=0;x<a.snapshotLength;x++){
        elementA = a.snapshotItem(x).href.match(/(\d+)/)[1];
        if(!b.snapshotItem(x).href.match(elementA)){
            return false;
        }
    }
    return true;
}

function insertScript (code){
    var script = document.createElement('script');
    script.innerHTML = code;
    document.body.appendChild(script);
}

function checkForUpdates(){                                                             //  Written By Greyg00
    ////////////////////////////////////////////////////////////////////////////////
    var scriptNumber = '49812';      //  Replace with userscript's script number///
    //////////////////////////////////////////////////////////////////////////////
    ///////////////////No need to edit code after this line//////////////////////

    var scriptName = /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1];
    var currentVersion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1];

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/'+scriptNumber+'.meta.js',
        onload: function(e) {
            var lastVersion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(e.responseText)[1];
            var lastChanges = /\/\/\s*@changelog\s*(.*)\s*\n/i.exec(e.responseText)[1];
            lastChanges = lastChanges.split('|');

            if (lastVersion != currentVersion){
                if(date.getDate()+''+date.getMonth() != GM_getValue('lastUpdatecheck')){
                    var newsDiv = document.createElement('div');
                    newsDiv.setAttribute('id','MBM_update_newsdiv');
                    newsDiv.setAttribute('style', 'position:fixed; top:35%; left:20%; right:20%; padding:10px; color:black; font-size:13px; font-weight:bold; background:#EEA2AD; opacity:0.85; border:1px RED solid; -moz-border-radius:2.4em; overflow:auto;')
                    newsDiv.innerHTML = '<p>A New Version of '+scriptName+' Is Available! Click the green icon to update!<p>';
                    for(var x in lastChanges){
                        newsDiv.innerHTML += '<p><li>' + lastChanges[x] + '</li></p>';
                        }
                        document.body.appendChild(newsDiv);
                    newsDiv.addEventListener('click', function(e){
                        GM_setValue("lastUpdatecheck",date.getDate()+''+date.getMonth());
                        insertScript('Effect.Fade("MBM_update_newsdiv");');
                    }, false);
                }
                
                var updatesButton = document.createElement('div');
                updatesButton.setAttribute('style', 'position:fixed; top:20px; left:50px; padding-left:5px; padding-right:2px; background:darkgreen; opacity:0.9; -moz-border-radius-topright:2.4em; -moz-border-radius-bottomright:2.4em;')
                updatesButton.innerHTML = '<IMG SRC="data:image/png;base64,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" ALT="Updates Available" TITLE="Updates Available" border="0">';
                updatesButton.addEventListener('click', function(e){
                    location.href = 'http://userscripts.org/scripts/source/49812.user.js';
                }, false);
                document.body.appendChild(updatesButton);
            }
        }
    });
}
