// ==UserScript==
// @name           Neopets - NeoQuest II Trainer V2.0
// @namespace      Steinn
// @description    Automatically Plays Neoquest II. Custom select actions.
// @include        http://www.neopets.com/games/nq2/nq2.phtml*
// @include        *nqiitrainer.6te.net/*
// @include       *nqiitrainer.freevar.com*
// @include       *stive.knoxx.net/neopets*
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @cfu:url        http://userscripts.org/scripts/source/52339.user.js
// @cfu:version    3.2.0.1
// ==/UserScript==

unsafeWindow.confirm=function(){return true;} //Coment this lines to remove auto-confirm

// set defaluts value if it´s your first acess
try
{
    if (GM_getValue("onoff")==undefined)
    {
        GM_setValue("onoff", true);
        var hi = confirm("This its your first visit on Neoquest Trainer. For read the instrucions, click ok. If you wanna skip instructions, click cancel.")
        if(hi)
        {
            alert('In older version, you usted see a right bar in the right side of the page and a remote control page with your all configuration. For that, i have to change the layout, if i do that you can got iced.');
            alert('For fix that, you will configure all your settings on a external page');
            alert('You can add the configuration page in your bookmarks, for easy open that. Or click right button in GM icon,go to User Script Commands, and click open configuration page.');
            alert('To enable |  disabled th script, click in tools >User Script Commands.');
            alert('Thanks for read this.');
            GM_openInTab('nqiitrainer.freevar.com');
            GM_openInTab('nqiitrainer.6te.net');
        }
        GM_setValue("healingitem", 30011);
        GM_setValue("mipsyact", 1);
        GM_setValue("Path", 2);
        GM_setValue("selectids", '1|1');
        GM_setValue("pathIndex", 0);
        GM_setValue("Velmhast", false);
        GM_setValue("remote", true);
        GM_setValue("flee", true);
        GM_setValue("from", "1500");
        GM_setValue("to", "2500");
        GM_setValue("damage", false);
        GM_setValue("damageid", 30103);
    }
}
catch (ex) { }
if((GM_getValue("selectids")==undefined) || (GM_getValue("selectids")==null)){
    GM_setValue("selectids", '1|1');
}
if((location.href.match('nqiitrainer.freevar.com')) || (location.href.match('stive.knoxx.net/neopets') || (location.href.match('http://nqiitrainer.6te.net/'))))
{
    function getid(id){
        ids = GM_getValue('selectids').split('|');
        switch(id){            
            case '1':
                return ids[0];
            break;
            case '2':
                return ids[1];
            break;
        }
    }

    // Set defalut value to Boxes
    document.getElementById('directions').value = GM_getValue('Path');
    function setDeFaultBox()
    {
            if(GM_getValue("onoff")==true){
                document.getElementById('links').getElementsByTagName('a')[0].style.color="black";
                document.getElementById('links').getElementsByTagName('a')[1].style.color="red";
            }
            if(GM_getValue("onoff")==false)    {
                document.getElementById('links').getElementsByTagName('a')[0].style.color="green";
                document.getElementById('links').getElementsByTagName('a')[1].style.color="black";
            }
            if(GM_getValue("remote")==true){
                document.getElementsByName('remote')[0].parentNode.style.color="black";
                document.getElementsByName('remote')[1].parentNode.style.color="red";
                document.getElementsByName('remote')[1].checked=true; 
            }
            if(GM_getValue("remote")==false){
                document.getElementsByName('remote')[0].parentNode.style.color="green";
                document.getElementsByName('remote')[1].parentNode.style.color="black";
                document.getElementsByName('remote')[0].checked=true; 
            }
            if(GM_getValue("flee")==true){
                document.getElementsByName('flee')[0].parentNode.style.color="black";
                document.getElementsByName('flee')[1].parentNode.style.color="red";
                document.getElementsByName('flee')[1].checked=true; 
            }
            if(GM_getValue("flee")==false){
                document.getElementsByName('flee')[0].parentNode.style.color="green";
                document.getElementsByName('flee')[1].parentNode.style.color="black";
                document.getElementsByName('flee')[0].checked=true; 
            }
            document.getElementsByTagName("select")[0].selectedIndex = getid('1');
            document.getElementsByTagName("select")[1].selectedIndex = getid('2');        
            document.getElementById('damage').value = GM_getValue('damageid');
            if ((GM_getValue("damage")==false)) document.getElementById('checkdamage').checked=true; 
            if ((GM_getValue("damage")==true)) document.getElementById('checkdamage').checked=false;                 
            document.getElementById('pathindex').value = GM_getValue('pathIndex');
            document.getElementById("heal").value = GM_getValue('healingitem');
            document.getElementById("to").value = GM_getValue('to');
            document.getElementById("from").value = GM_getValue('from');
            switch(GM_getValue('mipsyact')){
                case 1:
                case 2:
                    document.getElementById('mipsyact').value = "9201";
                    document.getElementsByTagName("select")[2].selectedIndex = 1;                
                    document.getElementById('mipsyact').value = "9201"; 
                    document.getElementsByTagName("select")[2].selectedIndex = 1;
                break;
                case 3:
                case 4:
                    document.getElementById('mipsyact').value = "9202";
                    document.getElementsByTagName("select")[2].selectedIndex = 2;
                    document.getElementById('mipsyact').value = "9202";
                    document.getElementsByTagName("select")[2].selectedIndex = 2;
                break;
            }
            if(((GM_getValue('mipsyact')==1)) || ((GM_getValue('mipsyact')==3))) document.getElementById('opcao').checked=true; 
            if(((GM_getValue('mipsyact')==2)) || ((GM_getValue('mipsyact')==4))) document.getElementById('opcao').checked=false; 
    }    
        setDeFaultBox();
        document.getElementById("autoupdate").addEventListener('click', function() {setDeFaultBox();}, false);

        //Add functions to selects, like fill in the boxs the values, selectindex
        document.getElementsByTagName("select")[0].selectedIndex = getid('1');
        document.getElementsByTagName("select")[1].selectedIndex = getid('2');        
        document.getElementById("autoupdate").addEventListener('click', function() {setDeFaultBox();}, false);

        // Add function to links Enabled, disabled
        document.getElementById('links').getElementsByTagName('a')[0].addEventListener('click', function() {GM_setValue('onoff', false); this.style.color="green"; document.getElementById('links').getElementsByTagName('a')[1].style.color="black"}, false);            
        document.getElementById('links').getElementsByTagName('a')[1].addEventListener('click', function() {GM_setValue('onoff', true); clearTimeout(timeout); this.style.color="red"; document.getElementById('links').getElementsByTagName('a')[0].style.color="black"}, false);
        
        document.getElementsByName('remote')[0].addEventListener('click', function() {GM_setValue('remote', false); document.getElementsByName('remote')[0].parentNode.style.color="green"; document.getElementsByName('remote')[1].parentNode.style.color="black"}, false);
        document.getElementsByName('remote')[1].addEventListener('click', function() {GM_setValue('remote', true); document.getElementsByName('remote')[1].parentNode.style.color="red"; document.getElementsByName('remote')[0].parentNode.style.color="black"}, false);            
        document.getElementsByName('flee')[0].addEventListener('click', function() {GM_setValue('flee', false); document.getElementsByName('flee')[0].parentNode.style.color="green"; document.getElementsByName('flee')[1].parentNode.style.color="black"}, false);
        document.getElementsByName('flee')[1].addEventListener('click', function() {GM_setValue('flee', true); document.getElementsByName('flee')[1].parentNode.style.color="red"; document.getElementsByName('flee')[0].parentNode.style.color="black"}, false);                
        
        // Funtion to save configurations on right bar
        function saveconfig() { 
            var pass = true;
            if((document.getElementById('heal').value=="") || (document.getElementById('damage').value=="") || (parseFloat(document.getElementById('to').value)-parseFloat((document.getElementById('from').value)<700)) || (document.getElementById('from').value<700) || (document.getElementById('from').value==document.getElementById('to').value) || (document.getElementById('to').value=="")|| (document.getElementById('from').value=="") || (document.getElementById('mipsyact').value==""))
            {
                pass = false;
            }
            if((document.getElementById('heal').value=="")) alert('Please select a valid value for heal item'); else GM_setValue('healingitem', document.getElementById('heal').value); 
            if((document.getElementById('damage').value=="")) alert("Plase select a valid damage item"); else GM_setValue('damageid', document.getElementById('damage').value); 
            if((document.getElementById('checkdamage').checked==true)) GM_setValue('damage', false);
            if((document.getElementById('checkdamage').checked==false)) GM_setValue('damage', true);    
            if((document.getElementById('mipsyact').value=="")) alert('Please select a valid item for mipsy action'); 
            else
            {
                if(document.getElementById('mipsyact').value==9201)
                {
                    if((document.getElementById('opcao').checked==true)) GM_setValue("mipsyact", 1);
                    if((document.getElementById('opcao').checked==false)) GM_setValue("mipsyact", 2);
                }
                if(document.getElementById('mipsyact').value==9202)
                {
                    if((document.getElementById('opcao').checked==true)) GM_setValue("mipsyact", 3);
                    if((document.getElementById('opcao').checked==false)) GM_setValue("mipsyact", 4);
                }
            }
            if (pass) {
                    alert('Settings saved sucessfully!');
                    var kkk = [document.getElementsByTagName('select')[0].selectedIndex, document.getElementsByTagName('select')[1].selectedIndex];
                    GM_setValue('selectids', kkk.join('|'));
                    GM_setValue("from", document.getElementById("from").value); 
                    GM_setValue("to", document.getElementById("to").value);
                }
            else{
                alert("Plase select a valid Refresh time. OBS.: i will not let you use values less than 700 mileseconds");
            }
        }
        
            //Function to start remote control
            function start() 
            {
                GM_setValue("Path", document.getElementById('directions').value);
                GM_setValue("pathIndex", document.getElementById('pathindex').value);
                GM_setValue("remote", false);
                GM_setValue("onoff", false);
                document.getElementsByName('remote')[0].checked=true;
                document.getElementById('links').getElementsByTagName('a')[0].style.color="green";
                document.getElementById('links').getElementsByTagName('a')[1].style.color="black";
                document.getElementsByName('remote')[0].parentNode.style.color="green";
                document.getElementsByName('remote')[1].parentNode.style.color="black";                
                alert("\t\tSettings saved.\nTo changes take effect refresh neoquest page;")
            }
            
            // Add events to start | save settings
            document.getElementById("formclick").addEventListener("click", saveconfig, true);
            document.getElementById("formsubmit").addEventListener("keydown", function(e){
                if (e.keyCode == 13){
                    saveconfig();
                }
            }, true);
            document.getElementById("startremoteclick").addEventListener("click", start, true);
            document.getElementById("startremote").addEventListener("keydown", function(e){
                if (e.keyCode == 13){
                start();
                }
            }, true);            
}
//Finish configuration region

//Now if´s not configuration page, start the functions
if(location.href.match('nq2/nq2.phtml')){    
function selectitem()
{
    switch(GM_getValue("healingitem"))
    {
        case "30011":
        GM_setValue("healingitem", '30012');
        break;
        case "30012":
        GM_setValue("healingitem", '30013');
        break;
        case "30013":
        GM_setValue("healingitem", '30014');
        break;        
        case "30014":
        GM_setValue("healingitem", '30021');
        break;    
        case "30021":
        GM_setValue("healingitem", '30022');
        break;
        case "30022":
        GM_setValue("healingitem", '30023');
        break;
        case "30023":
        GM_setValue("healingitem", '30031');
        break;
        case "30031":
        GM_setValue("healingitem", '30032');
        break;
        case "30032":
        GM_setValue("healingitem", '30033');
        break;
        case "30033":
        GM_setValue("healingitem", '30041');
        break;
        case "30041":
        GM_setValue("healingitem", '30042');
        break;
        case "30042":
        GM_setValue("healingitem", '30043');
        break;
        case "30043":
        GM_setValue("healingitem", '30051');
        break;        
        case "30051":
        GM_setValue("healingitem", '30052');
        break;
        case "30052":
        GM_setValue("healingitem", '30053');
        break;
        case "30053":
        GM_setValue("healingitem", '30011');
        break;

    }
}


var REFRESHS = Math.floor(Math.random() * parseFloat((GM_getValue("to")-GM_getValue("from")))) + parseFloat(GM_getValue("from"));
var scriptonoff = GM_getValue("onoff"); //Check if script ts enabled
if (GM_getValue("remote")==true)
{
    if (new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/nq2\/nq2\.phtml\?act=/i).test(location.href)) // alows you to enter inventory, shops without return to map.
    {
        scriptonoff = true;
    }
}
if ((new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/nq2\/nq2\.phtml\?act=move&dir=/i).test(location.href)) || (new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/nq2\/nq2\.phtml\?act=travel&mode=/i).test(location.href)) || (GM_getValue("remote")==false))
{
 scriptonoff = GM_getValue("onoff");
}
if (!scriptonoff){
    ff = xpath("//form[contains(@name, 'ff')]")[0];
    if(xpath("boolean(//img[contains(@src, '/nq2/x/com_begin.gif')])")){
        GM_setValue("hitTarget",5);
        GM_setValue("isHasted",false);
        GM_setValue("Velmhast",false);
        var timeout = setTimeout(function(){ location.href="http://www.neopets.com/games/nq2/nq2.phtml?start=1";}, REFRESHS-150);    
    }    
    if(xpath("boolean(//img[contains(@src, '/nq2/x/com_next.gif')])")){
        var timeout = setTimeout(function(){ unsafeWindow.setaction(1); ff.submit();}, REFRESHS-300);    
    }    
    if(xpath("boolean(//img[contains(@src, '/nq2/x/com_end.gif')])")){
        var timeout = setTimeout(function(){unsafeWindow.setaction(2); ff.submit();}, REFRESHS-150);
    }    
    if(xpath("boolean(//img[contains(@src, '/indexbak_oops_pt.png')])")){
        var timeout = setTimeout(function(){ location.href="http://www.neopets.com/games/nq2/nq2.phtml";}, 200);    
    }    
    if(xpath("boolean(//img[contains(@src, '/nq2/x/cont.gif')])")){    
        if(xpath("boolean(//a[contains(@href, 'nq2.phtml?finish=1')])")){
            setTimeout(function(){ location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";}, 800);    
        }
        else{
            var timeout = setTimeout(function(){ location.href="http://www.neopets.com/games/nq2/nq2.phtml";}, 800);        
            img = xpath("//img[contains(@src,'http://images.neopets.com/nq2/x/cont.gif')]");
            url = img.parentNode.href;
            if(!url.match("javascript"))
            {
                var timeout = setTimeout(function(){location.href=url;}, REFRESHS);
            }    
        }
    }    
    if(xpath("boolean(//img[contains(@src, '/nq2/x/tomap.gif')])")){    
        GM_setValue("hitTarget",5);
        GM_setValue("isHasted",false);
        GM_setValue("Velmhast",true);
        var timeout = setTimeout(function(){ location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";    }, REFRESHS-300);    
    }    
    if(xpath("boolean(//img[contains(@src, '/nq2/x/nav.gif')])")){    
    pathIndex = GM_getValue("pathIndex");
            if((GM_getValue("Path").length) != GM_getValue("pathIndex")){
                var timeout = setTimeout(function(){ unsafeWindow.dosub(GM_getValue('Path')[pathIndex]);  GM_setValue("pathIndex",parseFloat(GM_getValue("pathIndex"))+1); }, REFRESHS);
            }
            else{
                var open = confirm("You have arrived at your destination.\nOpen the configuration page?");
                if(open)
                {
                    GM_openInTab('http://stive.knoxx.net/neopets/');
                }
                GM_setValue("pathIndex",0)
                GM_setValue("toleft",0)
                GM_setValue("remote", true)
                GM_setValue("onoff", true)
            }
    }
    if(xpath("boolean(//img[contains(@src, '/nq2/x/com_atk.gif')])")){
        var haste = true;
        if(((GM_getValue('mipsyact')==1) || (GM_getValue('mipsyact')==3)))  haste = false;
        if(((GM_getValue('mipsyact')==1) || (GM_getValue('mipsyact')==2)))  mipsyfact = "9201";
        if(((GM_getValue('mipsyact')==3) || (GM_getValue('mipsyact')==4)))  mipsyfact = "9202";    
        var useid=-1; 
        var nxactor=1; 
        var fact=3; 
        var hitTarget = GM_getValue("hitTarget",5); 
        function checkhit(){
            if(!document.getElementsByName("ch"+GM_getValue("hitTarget",5))[0]){
                var enemytarget = document.getElementsByClassName("ch")[0].name;
                if((a=document.getElementsByClassName('ch200')[0])) enemytarget = a.name;
                if((enemytarget!="ch1") && (enemytarget!="ch2") && (enemytarget!="ch3") && (enemytarget!="ch4"))
                {
                    enemytarget = enemytarget.match(/ch([^&]+)/)[1];
                    GM_setValue("hitTarget", enemytarget);
                }
            }
        }
        checkhit();
        checkhit();
            if(!xpath("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue('healingitem') +"); document.ff.submit(); return false;;']", document, Boolean)){
                selectitem();
                if(!xpath("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue('healingitem') +"); document.ff.submit(); return false;;']", document, Boolean)){
                    selectitem();
                    if(!xpath("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue('healingitem') +"); document.ff.submit(); return false;;']", document, Boolean)){
                        selectitem();
                    }        
                }            
            }            
        
            var texts = document.getElementsByClassName('frame')[0].getElementsByTagName("font");
            var doMultipleTargets = 0;
            var j=0;
            var fleepss = true;
            for(j=0;j<texts.length;j++)
            {
                //Check if you have the damage item
                if(!xpath("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue("damageid") +"); document.ff.submit(); return false;;']", document, Boolean)){
                    GM_setValue("damage", true); // you don´t have, disable this option.
                }
                switch(texts[j].innerHTML)
                {
                case "<b>Rohane</b>":
                    if(GM_getValue("damage")==false){
                        fact=5;
                        useid = GM_getValue("damageid");
                    }
                    if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red")){
                        fact=5;
                        useid = GM_getValue("healingitem");
                        var fleepss = false;
                    }
                break;
                case "<b>Mipsy</b>":
                    nxactor=2;
                    fact= mipsyfact;
                    if(!haste){
                        if(!GM_getValue("isHasted")){
                            fact=9203;
                            GM_setValue("isHasted",true);
                        }
                    }
                    if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
                    {
                        fact=5;
                        useid = GM_getValue("healingitem");
                        var fleepss = false;
                    }
                    break;
                case "<b>Talinia</b>":
                    if(GM_getValue("damage")==false)
                    {
                        fact=5;
                        useid = GM_getValue("damageid");
                    }    
                    if(xpath("//a[contains(@onclick, 'setaction(9302)')]", document, Boolean)){
                        fact = 9302;
                    }
                    nxactor=3;
                    if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
                    {
                        fact=5;
                        useid = GM_getValue("healingitem");
                        var fleepss = false;
                    }
                    break;
            case "<b>Velm</b>":
                var l=0; 
                var fullhp = 0; 
                var allies = false;
                var fleepss = false;
                elements = xpath("//img[contains(@src, '/nq2/x/exp_green.gif')]");
                for (l = 0; l < elements.length; l++) {
                    if(xpath("boolean(//img[contains(@src, '/nq2/x/donothing.gif')])")){
                        allies = true;
                    }
                    if (allies) {
                        if (elements[l].src == "http://images.neopets.com/nq2/x/exp_green.gif") {
                            if (elements[l].width == 45) //45 is full health
                            {
                                fullhp++;
                            }
                        }
                    }
                }
                nxactor=4;
                fact=9402;
                if(fullhp == 4){
                    if(GM_getValue("Velmhast"))
                    {
                        fact=3;
                        if(GM_getValue("damage")==false)
                        {
                            fact=5;
                            useid = GM_getValue("damageid");
                        }    
                    }
                    else{
                        fact = 9403; //shielding
                        GM_setValue("Velmhast",true);
                    }
                }
                if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
                {
                    fact=5;
                    useid = GM_getValue("healingitem");
                    var fleepss = false;
                }
                break;
            }
        }
        function attack(){
                var timeout = setTimeout(function(){
                    with(unsafeWindow){
                        settarget(GM_getValue("hitTarget",5));
                        setaction(fact);
                        setitem(useid);
                    }
                    ff.submit();
                }, REFRESHS);
            }    
            if (GM_getValue("flee")==true){    
                attack();
            }
            if (GM_getValue("flee")==false){
                if(fleepss){
                    var timeout = setTimeout(function(){ unsafeWindow.setaction(4); ff.submit(); }, REFRESHS);
                }
                else{
                    attack();
                }
            }

    }
}

//AUTO TALKS
switch(location.href){
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718':
        setTimeout(function(){ location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=city';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=city':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=yes';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=yes':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=about';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=about':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=east';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=east':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=enter';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10801':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10801&say=key';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201&say=town';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201&say=town':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201&say=troubles';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=troubles';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=troubles':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=yes';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=yes':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=sympathize';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11204':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11204&say=rest';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11001':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11001&say=rest';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20510':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20510&say=join';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701&say=top';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701&say=top':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701&say=rest';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=who';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=who':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=join';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=join':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=skills&show_char=4';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=calm':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=home';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=curious':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=purpose';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=purpose':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=find';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=find':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=fates';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101&say=code';},  REFRESHS);
    break;            
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101&say=code':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101&say=medallion';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=town';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=town':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=impossible';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=impossible':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=find';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=we';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=we':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=vonroo';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=vonroo':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=sun';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=sun':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=ghosts';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101&say=okay';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101&say=okay':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101&say=hate';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=adventurers';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=adventurers':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=yes';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=yes':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=how';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=how':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=anything';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50701':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50701&say=rest';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=who':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=what';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=what':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=faerie';},  REFRESHS);
    break;        
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602&say=who';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602&say=who':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602&say=you';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=problem':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=key';},  REFRESHS);
    break;
     case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408':
     setTimeout(function(){ location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=do';}, REFRESHS);
     break;
     case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=do':
     setTimeout(function(){ location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=join';}, REFRESHS);
     break;
     case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10701':
     setTimeout(function(){ location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10701&say=rest';}, REFRESHS);
     break;
     case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708':
     setTimeout(function(){ location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708&say=city';}, REFRESHS);
     break;
     case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708&say=city':
     setTimeout(function(){ location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708&say=how';}, REFRESHS);
     break;     
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=key':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=terask';},  REFRESHS);
    break;    
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=terask':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=what';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=what':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=where';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=where':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=catch';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=catch':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=devils';},  REFRESHS);
    break;
    case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201':
        setTimeout(function(){location.href='http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest';},  REFRESHS);
    break;    
}

(function () {
    if(document.documentURI.substr(0,14)=="about:neterror")
    {
        location.href="http://www.neopets.com/games/nq2/nq2.phtml";
    }
})();
}
/** Memory release **/
window.addEventListener("unload",
    function ()
    {
        flee = null;
        useid = null;
        fact = null;
        nxactor = null;
        imagehelp = null;
        pass = null;
        REFRESHS = null;
        scriptonoff = null;
        img = null;
        url = null;
        pathIndex = null;
        walk = null;
        open = null;
        haste = null;
        useid = null;
        walk = null;
        nxactor = null;
        fact = null;
        hitTarget = null;
        doMultipleTargets = null;
        texts = null;
        item2 = null;
    }, false);