// ==UserScript==
// @name       Volleyball - a Sandcastle Builder script
// @version    1.62
// @description   auto ninja, keyboard multi-clicker, QQ to blackprint converter, and time crystal harvester.  Meant to compliment beachball. By Mechtroid.
// @match      http://castle.chirpingmustard.com/castle.html
// ==/UserScript==
var helpText = function(){var helpstring = 
    'Each feature is toggled by inputting their keycode, the two letters after their name.  Change a feature\'s settings by pressing * then their keycode.' + '\n' +
    'Auto Ninja (AN): Automatically ninjas Newpixbots if ninja stealth is greater than or equal to '+ AN.Power + ' (0 always ninjas). (*AN to change stealth threshold)' + '\n'+ 
    'Skeleton Key (SK): Automatically opens ' + SK.Power + ' locked vaults every mNP at a cost of question qubes. (*SK to change number of vaults)' + '\n'+
    'Keyboard Clicker (KC): Automatically clicks the beach ' + KC.Clicks + ' times whenever you press Z. (*KC to change number of clicks)'+'\n'+
    'Time Harvest (TH): Automatically harvests flux crystals every ONG. (*TH to toggle between harvesting flux crystals and ONG)'+'\n';
 return helpstring;
};
var showHelp = function(){alert(helpText());};
var kfa = 1; // Script startup status (0 = disabled, 1 = enabled)
var kfaMenuActive = 0;
var key = '';
var prevKey = '';
var prev2Key = '';

var AN = {Desc:'Auto Ninja',Abbv:'an',State:0,Freq:5.001,Power:0,RunOnce:0};
AN.Action = function (){
    if (AN.State * kfa)
    {
        
        if (!(Molpy.npbONG) && !(Molpy.ninjad) && !Molpy.Got('Temporal Rift') && (Molpy.ninjaStealth >= AN.Power))
        {
            Molpy.ClickBeach();
            AN.Action();
            return;
        }
        if(AN.RunOnce == 0)
        {
           window.setTimeout(AN.Action, AN.Freq * 1000);
        }
        else
        {
            Molpy.Notify('Ninja Check');
            AN.RunOnce = 0; 
        }
    }
};
AN.ChangeStealth = function(){AN.Power = window.prompt('Enter minimum stealth level before ninjaing. (0 to always ninja)',AN.Power);};
AN.CurrentPowerDesc = function(){return 'current stealth threshold: ' + Molpify(AN.Power);};
AN.Toggle = function() {toggleTimeout(AN);};
AN.Option8 = function(){AN.ChangeStealth();};



var SK = {Desc:'Skeleton Key',Abbv:'sk',State:0,Freq:1,Power:10};
SK.Action = function (){
    var vault = Molpy.Boosts['Locked Vault'];
    var oldBP = Molpy.Level('Blackprints');
    if (SK.State * kfa)
    {
        if (Molpy.Spend({QQ:SK.Power*5*SK.Freq}))
        {
            Molpy.boostSilence++;
            var pages = vault.power*SK.Power + (SK.Power + 1)*(SK.Power / 2);
            if(Molpy.Got('VV')) pages = Molpy.VoidStare(pages, 'VV');
            Molpy.Add('Blackprints', Math.floor(pages*Molpy.Papal('BlackP')));
            vault.power += SK.Power;
            Molpy.boostSilence--;
            Molpy.Notify('Gained ' + Molpify(Molpy.Level('Blackprints') - oldBP,3) + ' Blackprints.');
        }
        window.setTimeout(SK.Action, SK.Freq * 3600);
    }
};
SK.ChangeVaults = function(){SK.Power = SK.Freq * window.prompt('Enter number of vaults to open per mNP.',SK.Power);};
SK.CurrentPowerDesc = function(){return 'opens ' + (SK.Power / SK.Freq) + ' vaults per mNP.';};
SK.Toggle = function(){toggleTimeout(SK);};
SK.Option8 = function(){SK.ChangeVaults();};



var TH = {Desc:'Time Harvest',Abbv:'th',State:1 , Freq:5,Power:0};
TH.Action = function (){
    var tl = Molpy.Boosts['Time Lord'];
    if (TH.State * kfa)
    {
        if ((Molpy.Level('Time Lord') < tl.bought) && Molpy.Got('Flux Harvest'))
        {
            Molpy.Notify('Harvesting!');
            Molpy.FluxHarvest();
            TH.Action();
        }
        else if (((tl.Level <= tl.bought) && (tl.bought < 100)) && (!!TH.Power == !!Molpy.Got('Temporal Rift')))
        {
            Molpy.Notify('Jumping!');
            Molpy.RiftJump();
            AN.RunOnce = 1;
            AN.Action(); //So you can ninja if you get an ONG.
            TH.Action();
            return;
        }
        window.setTimeout(TH.Action, TH.Freq * 1000);
    } 
};
TH.ToggleTimeTravel = function (){
    TH.Power = (TH.Power+1) % 2;
    Molpy.Notify('TH Mode: ' + TH.CurrentPowerDesc() );
};
TH.ModeDesc = ['Harvesting Flux Crystals (Won\'t trigger ONGs)','Harvesting ONGs (When you get a Temporal Rift, will travel through time)'];
TH.CurrentPowerDesc = function () {return TH.ModeDesc[TH.Power];};
TH.Toggle = function(){toggleTimeout(TH);};
TH.Option8 = function(){TH.ToggleTimeTravel();};




var KC = {Desc:'Keyboard Clicker', Abbv:'kc',State:1, Power:2};
KC.Key = 'z'; // Default key for keyboard clicking
KC.Clicks = Math.pow(10, KC.Power);
KC.Notify = 'clicks';
KC.AddPower = function(){
    KC.Power++;
    KC.Notify = 'clicks';
    if (KC.Power > 3)
    {
        KC.Power = 0;
        KC.Notify = 'click';
    }
    KC.Clicks = Math.pow(10, KC.Power);
    Molpy.Notify(KC.CurrentPowerDesc() + ' per keypress');
};
KC.CurrentPowerDesc = function(){
    return KC.Clicks + ' ' + KC.Notify;
};
KC.Toggle = function(){
    KC.State = (KC.State + 1) % 2;
    if (KC.State == 0)
    {
        Molpy.Notify('Keyboard clicker DISABLED');
    }
    else if (KC.State == 1)
    {
        Molpy.Notify('Keyboard clicker ENABLED, Z to click');
    }
};
KC.Option8 = function(){KC.AddPower();};


var scriptStatus = function (int){
    var scriptIsCurrently = '';
    if (int >= 1)
    {
        scriptIsCurrently = 'ENABLED';
    }
    else if (int == 0)
    {
        scriptIsCurrently = 'DISABLED';
    }
        
    return scriptIsCurrently;
};
var status = function(obj){
    var foo = '';
    return foo + obj.Desc + ' = ' + scriptStatus(obj.State);
};
var reportScriptStatus = function (){
    if (kfa == 0)
    {
        Molpy.Notify('Scripts are currently ' + scriptStatus(kfa));
        Molpy.Notify('Type \"id\" to enable');
    }
    else if (kfa == 1)
    {
        Molpy.Notify(status(SK) + ' (' + SK.CurrentPowerDesc() + ')' );
        Molpy.Notify(status(KC) + ' (' + KC.Key + ' = ' + KC.CurrentPowerDesc() + ')' );
        Molpy.Notify(status(AN) + ' (' + AN.CurrentPowerDesc() + ')' );
        Molpy.Notify(status(TH) + ' (' + TH.CurrentPowerDesc() + ')' );
    }
    return;
};



window.setTimeout(
    function () {    
    Molpy.Notify('Scripts are currently ' + scriptStatus(kfa));
    Molpy.Notify('Type \"id\" to toggle scripts');
    Molpy.Notify('Press \"0\" (zero) for script status');
    Molpy.Notify('Press \"?\" (or /) for help');
    }, 5000);

var defaultKeys = function(obj)
{
	if((prevKey == obj.Abbv[0]) && (key == obj.Abbv[1]))
	{
		if(prev2Key == '*' || prev2Key == '8')
		{
			obj.Option8();
		}
		else
		{
			obj.Toggle();
		}
        prevKey = key = '';
		return true;
	}
	return false;
};

Molpy.UserScripts = function (k){
    key = String.fromCharCode(k.keyCode || k.charCode).toLowerCase();
    if(key == '/' || key == '?')
    {
        showHelp();
    }
    if (key == 'd' && prevKey == 'i')
    {
        if (kfa == 1)
        {
            kfa = 0;
            Molpy.Notify('Scripts DISABLED - id to re-enable');
        }
        else if (kfa == 0)
        {
            kfa = 1;
            Molpy.Notify('Scripts ENABLED - Press ? for help');
        }
    }
    if (key == '0')
    {
        reportScriptStatus();
    }
    
	if (kfa == 0)
    {
        if (key == '+' || key == KC.Key)
        {
            Molpy.Notify('Scripts are currently DISABLED');
            Molpy.Notify('Type \"id\" to enable');
        }
    }
    else if (kfa == 1)
    {
        if (KC.State == 1)
        {
            if (key == KC.Key && (Molpy.npbONG == 1 || Molpy.ninjad == 1))
            {
                if (KC.Power == 0)
                {
                    Molpy.ClickBeach();
                }
                else if (KC.Power > 0)
                {
                    var i = 0;
                    while (i < KC.Clicks)
                    {
                        Molpy.ClickBeach();
                        i++;
                    }
                }
            }
        }
		
        defaultKeys(AN);
        defaultKeys(SK);
        defaultKeys(TH);
        defaultKeys(KC);
    }
    prev2Key = prevKey;
    prevKey = key;
};

window.onkeypress = Molpy.UserScripts;


var toggleTimeout = function (obj){
    if (obj.State == 0)
    {
        obj.State = 1;
        window.setTimeout(obj.Action, obj.Freq * 1000);
        Molpy.Notify(obj.Desc + ' ENABLED');
    }
    else if (obj.State == 1)
    {
        window.clearTimeout(obj.Action);
        obj.State = 0;
        Molpy.Notify(obj.Desc + ' DISABLED');
    }
    return;
};

var initializeTimeout = function (obj){
    if (kfa && obj.State)
    {
        window.setTimeout(obj.Action, obj.Freq * 1000);
    }
};
initializeTimeout(SK);
initializeTimeout(TH);
initializeTimeout(AN);