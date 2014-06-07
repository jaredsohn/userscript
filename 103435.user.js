// ==UserScript==
// @name       AutoBuild
// @namespace  http://userscripts.org/scripts/show/103435
// @version    2.7.2
// @description  GW Hack
// @include    http://www*.globalwarfaregame.com/src/main_src.php*
// @icon       http://images.wikia.com/wowwiki/images/8/8b/Inv_misc_bag_enchantedmageweave.png
// @copyright  2011+, You
// ==/UserScript==

(function(){
unsafeWindow.AutoBuilder = {
    Init: function () {
        console.warn("init");
        if(!document.getElementById("citysel_1"))
        {
            setTimeout("AutoBuilder.Init();",2000);
            console.warn("waiting");
        }
        else
        {
            document.onkeypress = this.SendStuff;
            for(var i = 1; i <= this.NumCity; i++)
            {
                this.BuildBool[i] = [];
                for(var j = 0; j <= 23; j++)
                    this.BuildBool[i][j] = false;
                
                this.RsrchBool[i] = [];
                for(var j = 0; j <= 16; j++)
                    this.RsrchBool[i][j] = false;
                
                this.TrainBool[i] = 1;
                this.TrainNum[i] = 100;
                this.DfnceBool[i] = 52;
                this.DfnceNum[i] = 100;
                this.Error[i]=[];
                for(var j = 0; j <= 4; j++)
                    this.Error[i][j]=0;
            }
            setTimeout("AutoBuilder.CreateInterface();",2000);
            setInterval("AutoBuilder.CorrectOptions();",2000);
        }
    },
    
    CorrectOptions: function () {
        arStrings = unsafeWindow.arStrings;
        Modal = unsafeWindow.Modal;
        citysel_click = unsafeWindow.citysel_click;
        Building = unsafeWindow.Building;
        Barracks = unsafeWindow.Barracks;
        Walls = unsafeWindow.Walls;
        Research = unsafeWindow.Research;
        Coliseum = unsafeWindow.Coliseum;
        Greenhouse = unsafeWindow.Greenhouse;
        seed = unsafeWindow.seed;
        March = unsafeWindow.March;
        currentcityid = unsafeWindow.currentcityid;
        
        
        var cty = this.GetCurrentCity();
        try{
            for(var j = 0; j <= 23; j++)
                document.getElementById('chk' + j).checked = this.BuildBool[cty][j];
            for(var j = 1; j <= 16; j++)
                if(j!=7)
                    document.getElementById('chkr' + j).checked = this.RsrchBool[cty][j];
            
            document.getElementById('chka' + this.TrainBool[cty]).checked = true;
            if(this.TrainNum[cty] == -1)
            {
                document.getElementById('chkMAX').checked = true;
                document.getElementById('chkaNum').disabled = true;
            }
            else
            {
                document.getElementById('chkaNum').value = this.TrainNum[cty];
                document.getElementById('chkMAX').checked = false;
                document.getElementById('chkaNum').disabled = false;
            }
            
            document.getElementById('chkd' + this.DfnceBool[cty]).checked = true;
            if(this.DfnceNum[cty] == -1)
            {
                document.getElementById('chkdMAX').checked = true;
                document.getElementById('dfnceNum').disabled = true;
            }
            else
            {
                document.getElementById('dfnceNum').value = this.DfnceNum[cty];
                document.getElementById('chkdMAX').checked = false;
                document.getElementById('dfnceNum').disabled = false;
            } 
        }catch(e){}
    },
    
    BuildTimer: [],
    RsrchTimer: [],
    TrainTimer: [],
    DfnceTimer: [],
    MarchTimer: [],
    
    BuildBool: [],
    RsrchBool: [],
    TrainBool: [],
    TrainNum: [],
    DfnceBool: [],
    DfnceNum: [],
    Error: [],
    SendIt: false,
    
    BookMarkPlace: 4,
    
    NumCity: 3,
    
    STRTIME: [,"Build","Rsrch","Train","DFNCE","MARCH"],
    
    STRTYPEPOS: [,"0px 0px",,,"-35px 0px","-70px 0px","-105px 0px","-140px 0px","-210px 0px","-175px 0px","-280px 0px","-315px 0px",
              "0px -35px","-35px -35px",,,"-245px 0px","-245px -35px","-210px -35px", "-280px -35px"],
    
    SendStuff: function(evt) {
        var evt  = (evt) ? evt : ((event) ? event : null);
        if (evt.keyCode == 96)
        {            
            if (AutoBuilder.SendIt == false)
                AutoBuilder.SendIt = true;
            else
                AutoBuilder.SendIt = false;
            console.log("Send It = " + AutoBuilder.SendIt);
        }
    },
    ClearFB: function() {
        try{
            document.getElementsByClassName("fb_dialog_close_icon")[0].click();
            Modal.hideModalAll();
        }catch(e){}   
    },
    CreateInterface: function () {
        var i = 1;
        while(document.getElementById('citysel_'+i))
            i++;
        this.NumCity = i-1;
        
        if(seed.player.name == "BagMaster" || seed.player.name == "Oiler")
        {
            this.SendIt = true;
            setTimeout("AutoBuilder.CollectInt();",2000);
            setTimeout("window.frames[0].src = window.frames[0].src",10000000);
        }
        
        var hackDiv = this.MakeOptDiv();
        hackDiv.setAttribute('id', 'hack');
        hackDiv.style.height = '58px';
        hackDiv.style.width = '240px';
        hackDiv.style.left = '495px';
        hackDiv.style.fontSize = '8px';
        hackDiv.style.overflow = 'auto';
        document.getElementById("mainbody").appendChild(hackDiv);
        this.UpdateDiv("Started....Ready",1);
        
        var optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'optDiv');
        optDiv.style.width = '168px';
        optDiv.style.borderColor='#000 #CF6801 #000 #000';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(1));
        optDiv.innerHTML += "<br>";
        
        for(var i = 0; i <= 23; i++)
        {
            var opt = document.createElement('input');
            opt.setAttribute('type', 'checkbox');
            opt.setAttribute('id', 'chk' + i);
            opt.setAttribute('onclick', 'AutoBuilder.BuildBool[AutoBuilder.GetCurrentCity()][' + i + '] = this.checked;');
            optDiv.appendChild(opt);
            optDiv.innerHTML += (arStrings.buildingName["b" + i] + '<br>');
        }
        optDiv.scrollTop = 0;
        for(var i = 1; i <= this.NumCity; i++)
            for(var j = 0; j <= 23; j++)
                document.getElementById('chk' + j).checked = this.BuildBool[i][j];
        
        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'sciDiv');
        optDiv.style.left = '169px';
        optDiv.style.width = '165px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(2));
        optDiv.innerHTML += "<br>";
        
        for(var i = 1; i <= 16; i++)
        {
            if(i!=7)
            {
                var opt = document.createElement('input');
                opt.setAttribute('type', 'checkbox');
                opt.setAttribute('id', 'chkr' + i);
                opt.setAttribute('onclick', 'AutoBuilder.RsrchBool[AutoBuilder.GetCurrentCity()][' + i + '] = this.checked;');
                optDiv.appendChild(opt);
                optDiv.innerHTML += (arStrings.techName["t" + i] + '<br>');
            }
        }
        optDiv.scrollTop = 0;
        for(var i = 1; i <= this.NumCity; i++)
            for(var j = 1; j <= 16; j++)
                if(j!=7)
                    document.getElementById('chkr' + j).checked = this.RsrchBool[i][j];
        
        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'trainDiv');
        optDiv.style.left = '331px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(3));
        optDiv.innerHTML += "<br>";
        
        var opt = document.createElement('input');
        opt.setAttribute('type', 'number');
        opt.setAttribute('min', 0);
        opt.setAttribute('step', 100);
        opt.setAttribute('id', 'chkaNum');
        opt.setAttribute('value', 100);
        opt.setAttribute('onKeyUp', 'AutoBuilder.TrainNum[AutoBuilder.GetCurrentCity()] = this.value;');
        opt.style.width = '100px';
        opt.style.marginLeft = '5px';
        opt.style.backgroundColor = 'black';
        opt.style.border='1px solid #CF6801';
        opt.style.color='#BBB';
        optDiv.appendChild(opt);
        opt = document.createElement('input');
        opt.setAttribute('type', 'checkbox');
        opt.setAttribute('id', 'chkMAX');
        opt.setAttribute('onclick', 'document.getElementById("chkaNum").disabled = this.checked; if(this.checked){AutoBuilder.TrainNum[AutoBuilder.GetCurrentCity()] = -1;}else{AutoBuilder.TrainNum[AutoBuilder.GetCurrentCity()] = document.getElementById("chkaNum").value;}');
        opt.style.marginLeft = '5px';
        optDiv.appendChild(opt);
        optDiv.innerHTML += 'max<br>';
        for(var i = 1; i <= 19; i++)
        {
            if(i!=2 && i!=3 && i!=14 && i!=15)
            {
                opt = document.createElement('input');
                opt.setAttribute('type', 'radio');
                opt.setAttribute('name', 'troop');
                opt.setAttribute('id', 'chka' + i);
                opt.setAttribute('onclick', 'AutoBuilder.TrainBool[AutoBuilder.GetCurrentCity()] = ' + i + ';');
                optDiv.appendChild(opt);
                optDiv.innerHTML += (arStrings.unitName["u" + i] + '<br>');
            }
        }
        optDiv.scrollTop = 0;
        document.getElementById('chka1').checked = true;
        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'dfnceDiv');
        optDiv.style.top = '30px';
        optDiv.style.left = '331px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(4));
        optDiv.innerHTML += "<br>";
        
        opt = document.createElement('input');
        opt.setAttribute('type', 'number');
        opt.setAttribute('min', 0);
        opt.setAttribute('step', 100);
        opt.setAttribute('id', 'dfnceNum');
        opt.setAttribute('value', 100);
        opt.setAttribute('onKeyUp', 'AutoBuilder.DfnceNum[AutoBuilder.GetCurrentCity()] = this.value;');
        opt.style.width = '100px';
        opt.style.marginLeft = '5px';
        opt.style.backgroundColor = 'black';
        opt.style.border='1px solid #CF6801';
        opt.style.color='#BBB';
        optDiv.appendChild(opt);
        opt = document.createElement('input');
        opt.setAttribute('type', 'checkbox');
        opt.setAttribute('id', 'chkdMAX');
        opt.setAttribute('onclick', 'document.getElementById("dfnceNum").disabled = this.checked; if(this.checked){AutoBuilder.DfnceNum[AutoBuilder.GetCurrentCity()] = -1;}else{AutoBuilder.DfnceNum[AutoBuilder.GetCurrentCity()] = document.getElementById("dfnceNum").value;}');
        opt.style.marginLeft = '5px';
        optDiv.appendChild(opt);
        optDiv.innerHTML += 'max<br>';
        for(var i = 52; i <= 55; i++)
        {
            opt = document.createElement('input');
            opt.setAttribute('type', 'radio');
            opt.setAttribute('name', 'dfnc');
            opt.setAttribute('id', 'chkd' + i);
            opt.setAttribute('onclick', 'AutoBuilder.DfnceBool[AutoBuilder.GetCurrentCity()] = ' + i + ';');
            optDiv.appendChild(opt);
            optDiv.innerHTML += (arStrings.fortName["f" + i] + '<br>');
        }
        optDiv.scrollTop = 0;
        document.getElementById('chkd52').checked = true;
        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'marchDiv');
        optDiv.style.zIndex = '999999';
        optDiv.style.top = '30px';
        optDiv.style.left = '169px';
        document.getElementById("mainbody").appendChild(optDiv);
        optDiv.appendChild(this.CreateButtons(5));
        optDiv.innerHTML += "<br>";
        
        optDiv.innerHTML += "&nbsp;BM#:";
        opt = document.createElement('input');
        opt.setAttribute('id', 'marchBM');
        opt.setAttribute('type', 'number');
        opt.setAttribute('value', 4);
        opt.style.width = '40px';
        opt.setAttribute('onKeyUp', 'AutoBuilder.BookMarkPlace = this.value;');
        optDiv.appendChild(opt);
        optDiv.innerHTML += "<br>";
        
        var n = 2
        for(var i = 1; i <= 19; i++)
        {
            if(i!=2 && i!=3 && i!=14 && i!=15)
            {
                opt = document.createElement('div');
                opt.style.height = '35px';
                opt.style.width ='35px';
                opt.style.position = 'relative';
                if(n>2)
                    opt.style.top = (Math.floor((n-2)/2)*-61) + 'px';
                if(n%2)
                    opt.style.left = '90px';
                else
                    opt.style.left = '10px';
                
                opt.style.background  = "transparent url('/img/gw/icons/icon_troops_sprite01_35.png') no-repeat " + this.STRTYPEPOS[i];
                optDiv.appendChild(opt);   
                opt = document.createElement('input');
                opt.setAttribute('id', 'troopNum'+i);
                opt.setAttribute('type', 'number');
                opt.setAttribute('min', 0);
                opt.setAttribute('step', 1000);
                opt.setAttribute('value', 0);
                opt.setAttribute('onclick', '');
                opt.style.width = '50px';
                opt.style.position = 'relative';
                if(n>2)
                    opt.style.top = (Math.floor((n-2)/2)*-61) + 'px';
                if(n%2)
                    opt.style.left = '90px';
                else
                    opt.style.left = '10px';
                
                optDiv.appendChild(opt);
                n++;
            }
        }
        
        try{
            Resource.DailyReward.claim();
            Resource.DailyReward.claim();
            FortunasGamble.chooseMmbCard(2);
            FortunasGamble.chooseMmbCard(2);
            Modal.hideModalAll();
            setTimeout("Modal.hideModalAll();",4000);
        }catch(e){}
    },
    CreateButtons: function (actionType) {
        var buttonDiv = document.createElement('div');
        buttonDiv.style.height = '24px';
        buttonDiv.style.width = '113px';
        buttonDiv.style.top = '2px';
        buttonDiv.style.left = '2px';
        buttonDiv.style.position = 'relative';
        buttonDiv.style.backgroundColor = '#000';
        
        var labl = document.createElement('div');
        labl.style.height = '24px';
        labl.style.width = '65px';
        labl.style.top = '-9px';
        labl.style.position = 'relative';
        labl.style.display = 'inline-block';
        labl.style.textAlign = 'center';
        labl.style.fontWeight = '900';
        labl.style.fontSize = '18px';
        labl.style.backgroundColor = '#000';
        labl.style.webkitUserSelect = "none";
        labl.style.MozUserSelect = "none";
        labl.innerHTML = this.STRTIME[actionType];
        
        var butGo = this.MakeButton();
        butGo.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat -48px 0";
        butGo.setAttribute('onClick', 'AutoBuilder.Stop(false,' + actionType + ');');
        
        var butSp = this.MakeButton();
        butSp.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat -72px 0";
        butSp.style.webkitTransform = "rotate(180deg)";
        butSp.style.MozTransform = "rotate(180deg)";
        butSp.setAttribute('onClick', 'AutoBuilder.Stop(true,' + actionType + ');');
        
        if(actionType ==1)
        {
            buttonDiv.style.width = '161px';
            
            var butOp = this.MakeButton();
            butOp.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat -24px 0";
            butOp.style.webkitTransform = "rotate(90deg)";
            butOp.style.MozTransform = "rotate(90deg)";
            butOp.setAttribute('onClick', 'AutoBuilder.OpenOptions();');
            buttonDiv.appendChild(butOp);
            
            var butGp = this.MakeButton();
            butGp.style.background = "transparent url('/img/gw/buttons/button_modal_base_max_24.jpg') no-repeat 0 0";
            butGp.setAttribute('onClick', 'AutoBuilder.CollectInt();');
            buttonDiv.appendChild(butGp);
        }
        else
            buttonDiv.style.left = '26px';
        buttonDiv.appendChild(labl);
        buttonDiv.appendChild(butGo);
        buttonDiv.appendChild(butSp);
        
        return buttonDiv;
    },
    MakeOptDiv: function () {
        var optDiv = document.createElement('div');
        optDiv.style.height = '28px';
        optDiv.style.width = '160px';
        optDiv.style.top = '0px';
        optDiv.style.left = '0px';
        optDiv.style.position = 'absolute';
        optDiv.style.backgroundColor = 'black';
        optDiv.style.opacity = 0.85;
        optDiv.style.color = '#CF6801';
        optDiv.style.fontFamily = 'monospace'; 
        optDiv.style.fontSize = '12px';
        optDiv.style.textTransform = 'uppercase';
        optDiv.style.zIndex = "9999";
        optDiv.style.overflow = 'hidden';
        optDiv.style.border='2px solid #000';
        optDiv.style.borderColor='#000 #000 #000 #CF6801';
        optDiv.style.webkitUserSelect = 'none';
        optDiv.style.MozUserSelect = "none";
        return optDiv;
    },
    MakeButton: function () {
        var but = document.createElement('a');
        but.style.height = '24px';
        but.style.width = '24px';
        but.style.top = '0px';
        but.style.left = '0px';
        but.style.padding = '0px';
        but.style.display = 'inline-block';
        but.style.position = 'relative';
        but.setAttribute('onMouseOver', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " -48px";');
        but.setAttribute('onMouseOut', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " 0px";');
        but.setAttribute('onMouseDown', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " -24px";');
        but.setAttribute('onMouseUp', 'this.style.backgroundPosition = this.style.backgroundPosition.split(" ")[0] + " -48px";');
        return but;
    },
    OpenOptions: function () {
        try{
        unsafeWindow.update_seed_ajax(true);
        unsafeWindow.Bookmark.open();
        var book = document.getElementById('bookmarksBox').style;
        book.overflowY='scroll';
        book.overflowX='hidden';
        book.height='200px';
        }catch(e){}
        if(parseInt(document.getElementById('optDiv').style.height) < 400)
        {
            document.getElementById('optDiv').style.height = '500px';
            document.getElementById('sciDiv').style.height = '325px';
            document.getElementById('trainDiv').style.height = '325px';
            document.getElementById('dfnceDiv').style.top = '329px';
            document.getElementById('dfnceDiv').style.height = '135px';
            document.getElementById('marchDiv').style.top = '329px';
            document.getElementById('marchDiv').style.height = '550px';
        }
        else
        {
            document.getElementById('optDiv').style.height = '28px';
            document.getElementById('sciDiv').style.height = '28px';
            document.getElementById('trainDiv').style.height = '28px';
            document.getElementById('dfnceDiv').style.top = '30px';
            document.getElementById('dfnceDiv').style.height = '28px';
            document.getElementById('marchDiv').style.top = '30px';
            document.getElementById('marchDiv').style.height = '28px';
        } 
    },
    UpdateDiv: function(a,cty) {
        var hackDiv = document.getElementById("hack");
        hackDiv.innerHTML = hackDiv.innerHTML + cty + ":" + a + "<br>";
        hackDiv.scrollTop = hackDiv.scrollHeight;
    },
    DisplayTime: function(a) {
        var currentTime = new Date ( );
        currentTime.setTime( currentTime.getTime() + a*1000 );
        var currentHours = currentTime.getHours ();
        var currentMinutes = currentTime.getMinutes ();
        var currentSeconds = currentTime.getSeconds ();
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
        var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        currentHours = ( currentHours == 0 ) ? 12 : currentHours;
        var rtrn = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
        return (rtrn);
    },  
    SwitchTo: function(a) {
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a)); 
        citysel_click(document.getElementById('citysel_' + a));      
    },
    GetCurrentCity: function() {
        for(var i = 1; i <= this.NumCity; i++)
            try{
                if(document.getElementById('citysel_' + i).className.search('unselected') < 0)
                    return i;
            }catch(e){}
        return 'ERROR';
    },
    Collect: function (cty) {
        this.SwitchTo(cty);
        unsafeWindow.update_seed_ajax(true);
        setTimeout("Coliseum.openEvent(1);",1000);
        if(cty==3)
             setTimeout("Greenhouse.openEvent(1);",3000);
        setTimeout("Modal.hideModalAll();",4000);
        this.UpdateDiv("Collecting Monies...",cty);
    },
    SendFarm: function (cty) {
        this.SwitchTo(cty);
        Modal.hideModalAll();
        setTimeout("AutoBuilder.FarmIt();",10);
        this.UpdateDiv("Sending Farm...",cty);
    },
    FarmIt: function () {
        if(!document.getElementById('march_content'))
        {
            //trans:1 reinfce:2 reass:5 atk:4
            try{March.open(1,0,0)}catch(e){};
            setTimeout("AutoBuilder.FarmIt();",500);
        }
        else
        {            
            if(seed.player.name == "BagMaster")
                document.getElementById('marchBM').value = 54;
            else
                console.log(seed.player.name);
            if(currentcityinfo[1] == "SuckaTown")
            {
                var ind;
                if(Math.random() < 0.5)
                    ind = 0;
                else
                    ind = 1;
                try{                
                    March.maxTroop(9);
                    document.getElementById('modal_attack_unit_ipt_9').value /= 2;
                }catch(e){}
                try{ 
                    March.maxTroop(19);
                    document.getElementById('modal_attack_unit_ipt_19').value /= 2;
                }catch(e){}
                March.maxResource(1);
                document.getElementById('modal_attack_resource_1').value /= 2;
                March.checkResourceInput(document.getElementById('modal_attack_resource_1'));
                document.getElementById('bookmarkDropdown')[ind+1].selected = 1;
                March.selectAttackBookmark(document.getElementById('bookmarkDropdown'));
                March.check('normal');
            }
            else
            {
                try{
                    March.maxTroop(9);
                }catch(e){}
                try{
                    March.maxTroop(19);
                }catch(e){}
                //March.maxResource(1);
                
                for(var i = 0; i <= 6; i++)
                {
                    March.maxResource(i);
                    if (i==1)
                    {
                        document.getElementById('modal_attack_resource_1').value -= 100000;
                        if(document.getElementById('modal_attack_resource_1').value < 0)
                            document.getElementById('modal_attack_resource_1').value = 0;
                    }
                    March.checkResourceInput(document.getElementById('modal_attack_resource_'+i));
                }
                document.getElementById('bookmarkDropdown')[parseInt(document.getElementById('marchBM').value)].selected = 1;
                March.selectAttackBookmark(document.getElementById('bookmarkDropdown'));
                March.check('normal');
            }       
        }
    },
    CollectInt: function () {
        for(var i = 1; i <= this.NumCity; i++)
        {
            setTimeout("AutoBuilder.Collect(" + i + ");",(i - 1)*4000);
            if(this.SendIt)
                setTimeout("AutoBuilder.SendFarm(" + i + ");",(i + 3)*9000);
        }
        setTimeout("AutoBuilder.CollectInt();", 7500000);
    },
    Build: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
                this.SwitchTo(cty);
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ");",2000);
        }
        else
        {
            if(Building.Queue.first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('build event at: ' + AutoBuilder.DisplayTime(Building.Queue.first().timeRemaining)," + cty + "); Modal.hideModalAll();",2000);
                this.Error[cty][0] = 0;
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ")",Building.Queue.first().timeRemaining*1000+10000*Math.random());
            }
            else
            {
                var minT = 1;
                var minL = 10;
                var minS = 0;
                
                var a = $H(seed.buildings["city" + currentcityid]);    
                a.each(function (b) 
                {
                    var tmpT = parseInt(b[1][0]);
                    var tmpL = parseInt(b[1][1]);
                    if(tmpL < minL && AutoBuilder.BuildBool[cty][tmpT])
                    {
                        minL = tmpL;
                        minT = tmpT;
                        minS = parseInt(b[0].substr(3,b[0].length));
                    }
                });
                if(minL >= 9)
                {
                    clearTimeout(this.BuildTimer[cty]);
                    this.UpdateDiv("building disabled.",cty);
                    return;
                }
                this.UpdateDiv(arStrings.buildingName["b" + minT] + " Level " + minL + " at " + minS,cty);
                if(this.Error[cty][0] < 5)
                    Building.buildCheck(minT,minL,minS);
                else
                {
                    this.Stop(true,0);
                    return;
                }   
                this.Error[cty][0]++;
                
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ");",2000);
            }
        }
    },
    Resrch: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
            this.SwitchTo(cty);
            clearTimeout(this.RsrchTimer[cty]);
            this.RsrchTimer[cty] = setTimeout("AutoBuilder.Resrch(" + cty + ");",2000);
        }
        else
        {
            if(Research.Queue.first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('rsrch event at: ' + AutoBuilder.DisplayTime(Research.Queue.first().timeRemaining)," + cty + "); Modal.hideModalAll();",2000);
                this.Error[cty][1] = 0;
                clearTimeout(this.RsrchTimer[cty]);
                this.RsrchTimer[cty] = setTimeout("AutoBuilder.Resrch(" + cty + ")",Research.Queue.first().timeRemaining*1000+10000*Math.random());
            }
            else
            {
                for(var i = 1; i <= 16; i++)
                {
                    try{
                        var c = parseInt(seed.tech["tch" + i]);
                        var j = Research.checkreq(i, c + 1);
                        var n = (j[3].indexOf(0) < 0);
                        if(n && this.RsrchBool[cty][i])
                        {
                            if(this.Error[cty][1] < 5)
                                Research.upgrade(i,c+1);
                            else
                            {
                                this.Stop(true,1);
                                return;
                            }  
                            this.Error[cty][1]++;
                            this.UpdateDiv(arStrings.techName["t" + i] + " Level " + (c + 1),cty);
                            setTimeout("AutoBuilder.ClearFB();",3000);
                            break;
                        }
                    }catch(e){}  
                }
                
                clearTimeout(this.RsrchTimer[cty]);
                this.RsrchTimer[cty] = setTimeout("AutoBuilder.Resrch(" + cty + ");",2000);
            }
        }
    },
    Train: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
            this.SwitchTo(cty);
            clearTimeout(this.TrainTimer[cty]);
            this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ");",2000);
        }
        else
        {
            if(Barracks.Queue.activeSlots().first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('train event at: ' + AutoBuilder.DisplayTime(Barracks.Queue.timeRemaining())," + cty + "); Modal.hideModalAll();",2000);
                this.Error[cty][2] = 0;
                clearTimeout(this.TrainTimer[cty]);
                this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ")",Barracks.Queue.timeRemaining()*1000+10000*Math.random());
            }
            else
            {
                if(this.Error[cty][2] < 5)
                    for(var i = 1; i <= 19; i++)
                    {
                        try{
                            if(this.TrainBool[cty] == i)
                            {
                                if(this.TrainNum[cty] == -1)
                                    Barracks.trainUnit(i, Barracks.trainMax(i), 0);
                                else
                                    Barracks.trainUnit(i, this.TrainNum[cty], 0);
                                this.Error[cty][2]++;
                            }
                        }catch(e){}  
                        
                    }
                else
                {
                    this.Stop(true,2);
                    return;
                }  
                
                clearTimeout(this.TrainTimer[cty]);
                this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ");",2000);
            }
        }
    },
    Dfnce: function(cty) {
        Modal.hideModalAll();
        if(document.getElementById('citysel_' + cty).className.search('unselected') >= 0)
        {
            this.SwitchTo(cty);
            clearTimeout(this.DfnceTimer[cty]);
            this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");",2000);
        }
        else
        {
            if(Walls.Queue.activeSlots().first() != null)
            {
                setTimeout("AutoBuilder.UpdateDiv('dfnce event at: ' + AutoBuilder.DisplayTime(Walls.Queue.timeRemaining())," + cty + "); Modal.hideModalAll();",2000);
                this.Error[cty][3] = 0;
                clearTimeout(this.DfnceTimer[cty]);
                this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ")",Walls.Queue.timeRemaining()*1000+10000*Math.random());
            }
            else
            {
                if(this.Error[cty][3] < 5)
                    for(var i = 52; i <= 55; i++)
                    {
                        try{
                            if(this.DfnceBool[cty] == i)
                            {
                                if(this.DfnceNum[cty] == -1)
                                    Walls.trainDefense(i, Walls.trainMax(i), 0);
                                else
                                    Walls.trainDefense(i, AutoBuilder.DfnceNum[cty], 0);
                                this.Error[cty][3]++;
                            }
                        }catch(e){}  
                    }
                else
                {
                    this.Stop(true,3);
                    return;
                }
                
                
                clearTimeout(this.DfnceTimer[cty]);
                this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");",2000);
            }
        }
    },
    March: function (cty,forceWait) {
        if(forceWait = undefined)
            forceWait = false;
        if(!document.getElementById('march_content'))
        {
            Modal.hideModalAll();
            //trans:1 reinfce:2 reass:5 atk:4
            March.open(4);
            clearTimeout(this.MarchTimer[cty]);
            this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");",3000);
        }
        else
        {
            var m = 0;
            var allactive = true;
            $H(seed.outgoing_marches["c" + currentcityid]).each(function (o) {
                h = o[0].split("m")[1];
                var i = o[1];
                var t = parseInt(i.returnUnixTime, 10) - unixtime();
                if(t > m)
                    m = t;
                if(seed.outgoing_marches["c" + currentcityid]["m" + h].marchStatus == 0)
                    allactive = false;
            });
            if(allactive || forceWait)
            {
                setTimeout("AutoBuilder.UpdateDiv('March event at: ' + AutoBuilder.DisplayTime(" + m + ")," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.MarchTimer[cty]);
                this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");",m*1000+10000*Math.random());
            }
            else
            {
                var selGen = false;
                for(var i = 1; i <= 19; i++)
                {
                    if(i!=2 && i!=3 && i!=14 && i!=15)
                    {
                        try{
                            document.getElementById('modal_attack_unit_ipt_' + i).value = document.getElementById('troopNum'+i).value;
                            selGen = true;
                        }catch(e){}
                    }
                }
                if(selGen == false)
                {
                    clearTimeout(this.MarchTimer[cty]);
                    this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ", true);",3000);
                }
                var listitems= document.getElementById("generalsContainer").getElementsByTagName("li");
                for (i=listitems.length; i>=0; i--)
                {
                    try{
                        if(listitems[i].getElementsByClassName('energy').length != 0)
                        {
                            listitems[i].focus();
                            listitems[i].onclick();
                            break;
                        }
                    }catch(e){}
                }
                document.getElementById('bookmarkDropdown')[this.BookMarkPlace].selected = 1;
                March.selectAttackBookmark(document.getElementById('bookmarkDropdown'));
                March.check('normal');
                this.BookMarkPlace++;
                document.getElementById('marchBM').value = this.BookMarkPlace;
                clearTimeout(this.MarchTimer[cty]);
                this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");",5000);
            }
        }
    },
    Stop: function (go, bra) {
        var cty = this.GetCurrentCity();
        if(go)
        {
            this.Error[cty][bra] = 0;
            switch (bra)
            {
                case 1:
                    clearTimeout(this.BuildTimer[cty]);
                    break;
                case 2:
                    clearTimeout(this.RsrchTimer[cty]);
                    break;
                case 3:
                    clearTimeout(this.TrainTimer[cty]);
                    break;
                case 4:
                    clearTimeout(this.DfnceTimer[cty]);
                    break;
                case 5:
                    clearTimeout(this.MarchTimer[cty]);
                    break;
           }
           this.UpdateDiv("Stopped " + this.STRTIME[bra] + "....",cty);
        }
        else
        {
            this.UpdateDiv("Started " + this.STRTIME[bra] + "....",cty);
            switch (bra)
            {
                case 1:
                    clearTimeout(this.BuildTimer[cty]);
                    this.BuildTimer[cty] =setTimeout("AutoBuilder.Build(" + cty + ");",100);
                    break;
                case 2:
                    clearTimeout(this.RsrchTimer[cty]);
                    this.RsrchTimer[cty] =setTimeout("AutoBuilder.Resrch(" + cty + ");",100);
                    break;
                case 3:                    
                    clearTimeout(this.TrainTimer[cty]);
                    this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ");", 100);
                    if(document.getElementById('chkMAX').checked)
                        this.TrainNum[cty] = -1;
                    else
                        this.TrainNum[cty] = parseInt(document.getElementById('chkaNum').value);
                    break;
                case 4:                    
                    clearTimeout(this.DfnceTimer[cty]);
                    this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");", 100);
                    if(document.getElementById('chkdMAX').checked)
                        this.DfnceNum[cty] = -1;
                    else
                        this.DfnceNum[cty] = parseInt(document.getElementById('dfnceNum').value);
                    break;
                case 5:
                    clearTimeout(this.MarchTimer[cty]);
                    this.MarchTimer[cty] = setTimeout("AutoBuilder.March(" + cty + ");", 100);
                    break;
             }
        }
    }
}
setTimeout("AutoBuilder.Init();",2000);
})();