// ==UserScript==
// @name       AutoBuild_ita
// @namespace  http://userscripts.org/scripts/show/107756
// @description  GW Powerbot_ita
// @version    2.7.1.ita
// @description  GW Powerbot italiano
// @include    http://www*.globalwarfaregame.com/src/main_src.php*
// @icon       http://images.wikia.com/wowwiki/images/8/8b/Inv_misc_bag_enchantedmageweave.png
// @translated in italiano
// ==/UserScript==

(function(){
unsafeWindow.AutoBuilder = {
    Init: function () {
        for(var i = 1; i <= this.NumCity; i++)
        {
            this.City[i] = [];
            for(var j = 0; j < 200; j++)
                this.City[i][j] = {level:10,type:0};    
            
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
        }
        
        setTimeout("AutoBuilder.CreateInterface();",10000);
        setInterval("AutoBuilder.CorrectOptions()",2000);
    },
    
    CorrectOptions: function () {
        arStrings = unsafeWindow.arStrings;
        Modal = unsafeWindow.Modal;
        changeview_fields = unsafeWindow.changeview_fields;
        citysel_click = unsafeWindow.citysel_click;
        Building = unsafeWindow.Building;
        Barracks = unsafeWindow.Barracks;
        Walls = unsafeWindow.Walls;
        Research = unsafeWindow.Research;
        Coliseum = unsafeWindow.Coliseum;
        Greenhouse = unsafeWindow.Greenhouse;
        
        
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
    
    City: [],
    BuildBool: [],
    RsrchBool: [],
    TrainBool: [],
    TrainNum: [],
    DfnceBool: [],
    DfnceNum: [],
    
    NumCity: 3,

    STRTIME: ["","Construz","Ricerche","Addestra","Difese"],
    
    
    ClearFB: function() {
        try{
            document.getElementsByClassName("fb_dialog_close_icon")[0].click();
            Modal.hideModalAll();
        }catch(e){}   
    },
    CreateInterface: function () {
        if(!document.getElementById('citysel_3'))
            if(!document.getElementById('citysel_2'))
                this.NumCity = 1;
            else
                this.NumCity = 2;
        
        var hackDiv = this.MakeOptDiv();
        hackDiv.setAttribute('id', 'hack');
        hackDiv.style.height = '58px';
        hackDiv.style.width = '240px';
        hackDiv.style.left = '680px';
        hackDiv.style.fontSize = '13px';
        document.getElementById("mainbody").appendChild(hackDiv);
        this.UpdateDiv("TOOLS....OPERTIVO",1);
//costruzioni      
        var optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'optDiv');
        optDiv.style.width = '200px';
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
        
 //ricerche       
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'sciDiv');
        optDiv.style.left = '202px';
        optDiv.style.width = '200px';
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
        
//addestramento
	       
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'trainDiv');
        optDiv.style.left = '406px';
	optDiv.style.width = '270px';
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
//difese        
        optDiv = this.MakeOptDiv();
        optDiv.setAttribute('id', 'dfnceDiv');
        optDiv.style.top = '30px';
        optDiv.style.left = '202px';
	optDiv.style.width = '200px';
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
        if(parseInt(document.getElementById('optDiv').style.height) < 400)
        {
            document.getElementById('optDiv').style.height = '500px';
            document.getElementById('sciDiv').style.height = '325px';
            document.getElementById('trainDiv').style.height = '325px';
            document.getElementById('dfnceDiv').style.top = '329px';
            document.getElementById('dfnceDiv').style.height = '135px';
        }
        else
        {
            document.getElementById('optDiv').style.height = '28px';
            document.getElementById('sciDiv').style.height = '28px';
            document.getElementById('trainDiv').style.height = '28px';
            document.getElementById('dfnceDiv').style.top = '30px';
            document.getElementById('dfnceDiv').style.height = '28px';
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
    GetCity: function(cty) {
        for(var i = 0; i < 200; i++)
        {
            try
            {
                var ran = 'slot_' + i;
                this.City[cty][i].type = parseInt(document.getElementById(ran).className.split("_")[1]);
                this.City[cty][i].level = parseInt(document.getElementById(ran).className.split("_")[2]);
            }catch(e){}
        }
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
        setTimeout("Coliseum.openEvent(1);",1000);
        if(cty==3)
             setTimeout("Greenhouse.openEvent(1);",3000);
        setTimeout("Modal.hideModalAll();",4000);
        this.UpdateDiv("RACCOLTA SOLDI...",cty);
    },
    CollectInt: function () {
        for(var i = 1; i <= this.NumCity; i++)
        {
            setTimeout("AutoBuilder.Collect(" + i + ");",(i - 1)*4000);
        }
        setTimeout("AutoBuilder.CollectInt();", 8000000);
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
                setTimeout("AutoBuilder.UpdateDiv('fine costruzione corrente alle: ' + AutoBuilder.DisplayTime(Building.Queue.first().timeRemaining)," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.BuildTimer[cty]);
                this.BuildTimer[cty] = setTimeout("AutoBuilder.Build(" + cty + ")",Building.Queue.first().timeRemaining*1000+10000*Math.random());
            }
            else
            {
                var minT = 1;
                var minL = 10;
                var minS = 0;
                this.GetCity(cty);
                for(var slt = 0; slt < 200; slt++)
                {
                    var tmpT = this.City[cty][slt].type;
                    var tmpL = this.City[cty][slt].level;
                    if(tmpL < minL && this.BuildBool[cty][tmpT])
                    {
                        minL = tmpL;
                        minT = tmpT;
                        minS = slt;
                    }
                }
                if(minL >= 9)
                {
                    clearTimeout(this.BuildTimer[cty]);
                    this.UpdateDiv("costruzione disattivata.",cty);
                    return;
                }
                this.UpdateDiv(arStrings.buildingName["b" + minT] + " Levello " + minL + " in " + minS,cty);
                Building.buildCheck(minT,minL,minS);
                this.City[cty][minS].level++
                
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
                setTimeout("AutoBuilder.UpdateDiv('fine ricerca corrente alle: ' + AutoBuilder.DisplayTime(Research.Queue.first().timeRemaining)," + cty + "); Modal.hideModalAll();",2000);
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
                            Research.upgrade(i,c+1);
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
                setTimeout("AutoBuilder.UpdateDiv('fine addestramento corrente alle: ' + AutoBuilder.DisplayTime(Barracks.Queue.timeRemaining())," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.TrainTimer[cty]);
                this.TrainTimer[cty] = setTimeout("AutoBuilder.Train(" + cty + ")",Barracks.Queue.timeRemaining()*1000+10000*Math.random());
            }
            else
            {
                for(var i = 1; i <= 19; i++)
                {
                    try{
                        if(this.TrainBool[cty] == i)
                        {
                            if(this.TrainNum[cty] == -1)
                                Barracks.trainUnit(i, Barracks.trainMax(i), 0);
                            else
                                Barracks.trainUnit(i, this.TrainNum[cty], 0);
                        }
                    }catch(e){}  
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
                setTimeout("AutoBuilder.UpdateDiv('fine difesea corrente alle: ' + AutoBuilder.DisplayTime(Walls.Queue.timeRemaining())," + cty + "); Modal.hideModalAll();",2000);
                clearTimeout(this.DfnceTimer[cty]);
                this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ")",Walls.Queue.timeRemaining()*1000+10000*Math.random());
            }
            else
            {
                for(var i = 52; i <= 55; i++)
                {
                    try{
                        if(this.DfnceBool[cty] == i)
                        {
                            if(this.DfnceNum[cty] == -1)
                                Walls.trainDefense(i, Walls.trainMax(i), 0);
                            else
                                Walls.trainDefense(i, AutoBuilder.DfnceNum[cty], 0);
                        }
                    }catch(e){}  
                }
                
                clearTimeout(this.DfnceTimer[cty]);
                this.DfnceTimer[cty] = setTimeout("AutoBuilder.Dfnce(" + cty + ");",2000);
            }
        }
    },
    Stop: function (go, bra) {
        var cty = this.GetCurrentCity();
        if(go)
        {
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
           }
           this.UpdateDiv("STOP " + this.STRTIME[bra] + "....",cty);
        }
        else
        {
            this.UpdateDiv("Inserimento " + this.STRTIME[bra] + "....",cty);
            switch (bra)
            {
                case 1:
                    changeview_fields(document.getElementById('mod_views_field'));
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
             }
        }
    }
}
    
setTimeout("AutoBuilder.Init();",2000);

})();
