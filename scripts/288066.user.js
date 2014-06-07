// ==UserScript==
// @name       	Drone.X
// @namespace   Mafiawars
// @description tmp drone hosting
// @include     http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook-ca2.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook-ca2.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook-ca2.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     5.56a
// ==/UserScript==

function injectScript(source) {
    // Utilities
    var isFunction = function (arg) {
            return (Object.prototype.toString.call(arg) == "[object Function]");
        };
    var jsEscape = function (str) {
            // Replaces quotes with numerical escape sequences to
            // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
            if (!str || !str.length) return str;
            // use \W in the square brackets if you have trouble with any values.
            var r = /['"<>\/]/g,
                result = "",
                l = 0,
                c;
            do {
                c = r.exec(str);
                result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
            } while (c && ((l = r.lastIndex) > 0))
            return (result.length ? result : str);
        };
    var bFunction = isFunction(source);
    var elem = document.createElement("script"); // create the new script element.
    var script, ret, id = "";
    if (bFunction) {
        // We're dealing with a function, prepare the arguments.
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            var raw = arguments[i];
            var arg;
            if (isFunction(raw)) // argument is a function.
            arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
            arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
            arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
            arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else arg = raw.toString(); // Anything else number/boolean
            args.push(arg); // push the new argument on the list
        }
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();";
        elem.id = id;
    } else // plain string, just copy it over.
    {
        script = source;
    }
    elem.type = "text/javascript";
    elem.innerHTML = script;
    // insert the element into the DOM (it starts to execute instantly)
    document.head.appendChild(elem);
    if (bFunction) {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete(elem);
        // see if our returned value was thrown or not
        if (ret.throwValue) throw (ret.callResult);
        else return (ret.callResult);
    } else // plain text insertion, return the new script element.
    return (elem);
}
var myscript = function(){
var version='v5.56a';
	var DroneLog = [];
	var DebugLog = [];
	var IceKillLog = [];
	var loot_item=[],loot_count,loot_log,l_log='',loot_img,total_loot=0,tehcount,temp='';
	var DebugOnOff = 0, DebugText = 'Disabled', DebugIt = false;
	var AddSecondsCount = 0, AddSecondsText = 'Disabled', AddSec = 'false';

	var DroneXtimer;
	var worstitems;
/*Skill Point Stuff*/
	var SkillPointAssinRunning = false;
	var SPAvaiable;
	var SkillsTo;
/*Error counters*/	
	var erz500 = 0;
	var ajax_error = 0;
	var badupdate = 0;
	var startFL = 1;
	var Fateler0z = 0;
	var BBlock = 0;
	var crewposted = 0;
	
	var JobSC = 0;
	var runonce = false;
	var wazfirst;

	var targets = [];
	var target;

	var StaminaWord;
	var StaminaLocation;
	var StaminaDestination;
	var StaminaTab;

	var RobOutta = false;
/*Start Background Img Randomizer*/	
	var DXBGcurrentdate = 0;
	var DXBGimage_number = 0;
	var DXBGimage = new ImageArray(2);
		DXBGimage[0] = 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/empire/london_hp_bg.png';
		DXBGimage[1] = 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/crafters_choice/hellish_hydraulics/popup_bg.jpg';
	var DXBGrand = 60/DXBGimage.length;
/*End Background Img Randomizer*/	
	var BUECURR = false;
	var ENCURR = false;
	var BUEEC = 0;
	var CTPRB = 0;
/*Robbing Vars*/
	var robCiti;
	var slotsrobbed = 0;
	var onfirstrobpageload = true;
	var RobSpreesLeft = 0;
/*Bandits*/	
	var BanditPassIs = false;
	var CashBanditCount = false;
	var BUBT = 6;
/*Custom Jobs*/	
	var CJSO = false;
/*Autostart*/	
	var AutostartStopped = false;
	var ARS = false;
/**/
	var Bandit_type;
	var crewMembers;
	var Bandit_Elim;
/*Start Arena Vars*/	
	var ArenaGrabStamIsFirst = true;
	var ArenaReq;
	var arenalogs=[],
	loglines = 12,
	looted = {},
	arena_running=false,
	mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
	mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength'),
	socke, // websocket
	socke_lobby,
	currdata, // copy of data
	cmdqueue=[],
	meid, //me
	poweratt = undefined,
	poweruplist = {},
	playerinfo={},
	playerids={},
	starting_in,
	starting_in_counter,
	stam_on_start=-1,
	healed_in,
	healed_in_counter,
	itemdatabase={},
	worstitems,
	stats = { arenas:0,crests:0, xp:0, stamina:0, respect_start:0, respect:0, ranks:[0,0,0,0,0,0]},
	powerup_status = {},
	last_update = 0,
	conn_checker,
    healtimer=[0,0,0,0,0,0],
	replenish=0,
	protect = {},
	powerup_command = { count:{},active:-1,target:undefined },
	over_table = false,
	reconnect_retry = 0,
	ArenaNFO = false,
	arenalist=[];
/*End Arena Vars*/	
	var Drone = {
		iLike: '<iframe src="http://www.facebook.com/plugins/like.php?app_id=219527258096177&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGuessX-Scripts%2F131414080285469&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:20px;" allowTransparency="true"></iframe>',
		CurrentLevel: $('#user_level').text(),
		StartLevel: $('#user_level').text(),
		Running:{
			Paused: true
		},
		BankInfo:{
			cash_in_hand:0
		},
		Images: {
			Play: 'data:image/gif;base64,R0lGODlhEAAQAMQAAP8A/2K1SIHOEXbIAIPTHZXbMIDRFnbIAXfJA33OEM/vqIbWJHrMC5HLf3jKB/D/3/X/6fn/8uz/1ej/zJjcRc7vpv3/+qHfVP///+T/xAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAVqICCOZEk2QaqmTRlUSizHVTA21LXs/H5RLUCAQCRgikib0MA0WCzNpjKQqCYiWGt1yugyIGCIlzF1mB2P9OPsmCLeCIkc/p4e7ofJBI+fDv4DGYCDSg0Ch4iJh0FCBY6PkEo3KyuMJpcjIQA7',
			Pause: 'data:image/gif;base64,R0lGODlhEAAQAOYAAP8A/zaa/3O4/xal/6jd//L6//r9/87s/8bp/+r3/+Dz/////9bv/xel/xim/xun/xyn/1zA/1a+/0q5/y6u/yWr/x6o/3nL/0S3/yGp/6fd/xqn/2fE/zmz/zmy/2jF/yKq/4rS/27H/3bK/026/zOw/zGw/z+0/1q//0i4/0O2/0m5/3HI/zax/3fK/ySq/067/1O8/1G8/1m//y2u/z20/2HC/5DU/3vM/1C7/yis/x+o/zCv/6vf/3LI/4vS/yOq/zqz/23H/z+1/z60/zuz/zWx/1i+/1vA/2LC/2rF/33N/0u6/2bE/3PJ/yyu/3jL/2nF/y+v/yms/2TD/4nR/6re/xmm/2DC/ySr/3rM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAewgACCg4SFhAIBiYqJAoUBPQSRkRoaBFYBgwI3IThaFxdQLiNLP1WNAAFOPiwLCyJCrUpRH5ioHE1UBgY2WLoRSCi1ATNHEgUFMTLHMCRMwhMrKQkJGCrTQ0Q1wkVBHQoKLUbfJjxSwhQ0TwwMUzrrFVkvwkAgGQcHOxb3EBAPwhsbriBA4MDBwAYNBtQSMKChwwYOHljIUOEUKgolPJzAMCGHhAhJamVatMiioZODAgEAOw%3D%3D',
			Stop: 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7',
			En2xp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACc0lEQVR42mL8//8/Ay6gOuPA/NsZDomaqqIcl7Y7X2ZlZWJBV7Nozd1FAAHEhMsATjVDARlzBwcuIJ0TLZ/DysCgwvD7nwIyfvro47O44pP1AAGE0xABz/gEHyEGBQGv+IQoN+lohl//GFDwzz8Pchsv5YLUAgQQC06v+CXEy7EzMFhrCRUIcjD/Z/jxB0V+2fb7y9bteXwOxAYIIKyG8NgEGuTMWS8ACq4ymdPiQAM4kOW//fjLsPHgl40LNkurMTIyMQAEECNvzvxGXmkFOWluBgYWXgEBDhUDAyagJ6NlGBS+3znBEMcyg4HnzytcDn7Qt/ZxP0AAMYJiR7JmQ394cECAiTCDAiNQhhFMMDBITxNisNdkw2lA2YrP5V1bv64CCCBGWBRz+RYGOJX19/tLMyhwsoDNYPj+8Q1cB+uZqQzx/6bADShe+aW4d9f3dSAOQAAxIqcTVkVDAa2e/ft1uL4bMLKwMjAyMTP8//+P4f+fPww1tz1+aDI/BIXNg9xV33InH/ixBaYPIIBQAvb3/fMfBGY++fLo+ycGRlY2BkZmoPS/vwwmDxYyCEl/ZmD4+/dB+qrv6TOP/dqFrA8ggFDSCYu2o8L/v/8Z/v7+A8R/Gf6y8TL8AdLdAmsY/v/6y+CzmLUG3QAQAAggFJcwG/oH/Hn/2oaRi2/Pv9cPH/2andEca8a35o8Kp7LlsyKBZ5pfRLGFMEAAMYDCBIbZuu/vZ++6vZvFvSAAxFcRZGD5Vsm6VdfKuoK9+85etp77+5HVwzBAAKFwmEr3z0fmz/dmagzXZLSA8ZnLUOVhGCCAGLAJwnCgKoMRPnkYBggwAB7mUT+/Zgm1AAAAAElFTkSuQmCC',
			Iced: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADqklEQVR42n2Ta2xTZRjH3/f0nNP2nLOWsq7rZa5sa0fZunZZN5GNKChu3IIEEyNM5QsaSVBH1KAQDXgLX7yERBYJEjMj6Lwsi9FNccwbDq24K3bdupWVsWE7Dyvtzjk9l/e1IfGDmPD/9P/wf578kuf5Q3AblW7aSyR62tHtMvBfs2zrIVjkb1oTcFnvddu4aoeF9SzjKEdW0YCcUzIYIwEDkAYEFRMEebD74nTPyCstl28uqDny07YqO3M0VG71SoggBZ7XGJOJSMs6iCgCeG00LuZIZAA4I2OUjqfE6+3fTi7wovouDLx2/v67Vlo/u5rMkKSqASDlMCUJFMsYCQOBcKnXkfWWWCiXmV4Ymc2kT3w9RhggKKqvdoLfk7nvYd2xP061BJyPUZKIBsOT2o3FLIxHZnCR2aDzldtVf1PNAkPB3GhsIdM3mLDkvYkjRX2Zz0NEee0wXP32r8f33Od5ggIIn/tmLBsen2dZPQlMJEChymLgrSpJv9cb+Ws6nrQ3hCpNqZk4tlkNOtbmghcS1zfD1W/82Na23f+mtCTjL/vG8aXJeWxmaejgIM4TKJ47lqNjp/vJ8emU1rguSPl9bnJkKolkmoOxqalGuPalT5tbNzf1XEtllDwmLS3lcIHEKzablajy2pAMoNj53SgzNBqTdFCBz7S1sh+cjaqcmdPJitwM17/8yT11gWD/n9F5XFtTAilVBV4LqQqSBravWQExxOjp9h/UcHQO+ioc5INb7iSPfPibuKrETGMduQ/uODX8pIOljquSDNYHnUBczCof916SAm4L9fyukN5IU6j5YOfSaPQKqPCWGZ7bu5H+qn9CczFAJozMR3B3Z/T0znr7Qw6OJoYTaaQqGIRjPDAzJG7xW1Q7R+OdR3ulsdg1xVNZRr6w526LXhSxmuefvSF3wWe7Jzr2rVvxiJWjQCQp4p9jvPBLZC7V4ncW6pGScxeyxte7ItrlOV59aneTye0wkXYdAoSGQMf5Ky/Cje8MbHnr0dpu1kATEELAUhDE53m+2rXcIuc0VUNYuzCbIQssBSQvyCAeS4JVdgYMzwl97V+c23bzlR9+f7h1R8hx2F5oLKVIQmdi9ASFEc6fG3B6gugaSoE4L2Kck4EoqtGB2N/7zx5Y2/ufMjkfOKgvr6mtrlrpa2istO4KlprrixgK0bSOOXRmCOL8eFYlTg6ELx6YOfm48L823qq6/R3uDY0NmyqK2eDVRSnRE574PPzq1olbc/8A2rymL02d5P0AAAAASUVORK5CYII=',
			Killed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAD/UlEQVR42mJkwAMS5NWZFjy8+Q+fGoAAYoQxmjg4GQMY/1sKWho5cSgoa3PIyKgw8wlJ/vv4meHP75+f//77/43x//+PbAz/7/z+8fX886XLt2u9+/AAIIDABtwSF/Xj0dbs4DW3VGX59o3l7d8ff/nYOZnY379lZP72l+G/jsF/Bmnpf/+42D7/+/n3459b19+/6ut48/7X76kAAQBBAL7/Ad4WFUUTNzus9uXgBPsKBQD4BwH/8w8JBQgLCwL8Cgr/GBEf9A0lKQUBISHs+8zK8eCWjgL+DAkVFTI6AAK8wsACAEEAvv8B6BYfnhdMTF70BwD+3tvL/fT28QHO8PP/EhMLAxskJPwuGCzs/wsM+fHVzfPqu7YR/wwMDvMKEAciGSICB9HQgAIAQQC+/wHWJC6WKGVlZv0HBv/YyrD05c3NC/4OEgAKDwT+ETQ5ABoYJ/HklIzp4O7oGC4jLA7e8+3/BRAZAx0FCAHyw8dKAgBBAL7/AWJrl3CbLQmN+vfx/+C7qv/i29r/CwwKAf4cHP8UJiv7DyMo/siRiATa6+r9QhsnBRctMwT0zsj+EPX3AdLm5zoCAEEAvv8BuSouRj1cW7f26OP78dXNBvn9+P/oGBT7ExUWAhIkLv4D9vn32qqiCtHf3Pj+/gABYVtrC+KelfwPBQkD+vj6RgIAQQC+/wG6LzE/MzEsv+vc0/8XKTQB+wsHAPsvLvwA9vIAFlNbAf/9//7SZlz87MjFAQwsNgQ6TFQE1nxw9w0oKwYF/P5sAgBBAL7/Aew3OmgAHhqW+gH9ABBFTQDx/ff74a2d+AwwMgUlc4MHBQsK/p5LUvX5z70AIhoiCEhvfQbhs6T9+yEh+gz9/6UCAEEAvv8B8kVKpgtnaVYCHRoC9czL/v/9+QD5x8EAAQ8R/wZOVPwCHBr/uFta+Ofg1fsyDxMEOXSEEfQLAv/7//36/t7frwIAQQC+/wHvXV+iEH1+XAAZGQAAztD/9by89u++uusNUlIT+QwK+QkiIAnRiYz9A9bL/DZmeA4DKy8E/BkUAPwC/wDkoKF5AojxkYGut8z85RsZBfiZGJiYGBh4uBm+3rj5jttIX/D/z29//v8Fgr0HWVhFJVkYXrxi+HDnAgOLvgHDv1Mn94ZcZfQDCCBwUn7laBfNEZfSwC0hLcfIxs7MKCrCxMDM+J9BXJSBgY+P6cfC+Qx/b93+/4P5PzBf/Li57gVbYdbS3h0gvQABBM9MUv5V7GpaOtrhPL9NA0X+Ronq6ZgwSoj+Y+Tk5rpUVs74lY3z55c/THPaP/CW79/Q/g2mDyCAGHFlU6PCRfIN4j899fj+69/7wvCo/LPU2tPNPrfQ1QEEGADHlqBOy+nxvAAAAABJRU5ErkJggg==',
			fb_icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC',
			BGJICZCI: 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/crafters_choice/hellish_hydraulics/popup_bg.jpg',
			Exit: 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/iced.png'
		},
		Check: {
			CurrentEnergyRatio: 0,
			CurrentStamRatio: 0,
			CombinedRatios:0,
			LevelupPause: 0
		},
		updateStats:function(multipler, stats_div){
			var stat_count = parseInt($('#'+stats_div).text());
			if(stats_div == 'ArenaIC'){
				stat_count = 0;
			}
			nmult = parseInt(multipler);
			stat_count = (stat_count + nmult);
			if(stats_div == 'ArenaIC'){
				$('#icedsome').text(stat_count);
			}else{
				$('#'+stats_div).text(stat_count);
			}
		},
		userStats: {
			firstRun: true,
			start_group_atk: 0,
			start_group_def: 0,
			group_atk: 0,
			group_def: 0
		},   
		JobOptions: {
			JobPrimaryOrSecondary: 'PrimaryEnergyInfo',
			RatioingJob: false,
			NormalUntillJob: false,
			DoExtraJob: false,
			BlockMe: false,
			DoExtraStam: 0,
			RatioStam: false,
			NormStamUntil: false
		}, 
		CJ:{
            abnotherjob: new Array()
		},
		Storing: {
			/*Menu Options*/
			PrimaryEnergyInfo: 31,
			SecondaryEnergyInfo: 80,
			PrimaryStaminaInfo: 2,
			BUEnergyInfo: 5,
			JobberCheck: 0,
			/**/
			IsCustom: false,
			RadioCheck: 0,
			CustomJobCount: 0,
            defaultCustomJob : 0,
			/*Job Options*/
			JobsPerSecondSpeed: 1,
			JobsPerSecond: 1000,
			LevelupHelper: true,
			/*Fight Menu*/
			FightCityMenu: 0,
			FightCity: 1,
			FightsPerSecondSpeed: 3,
			FightsPerSecond: 333,
			bursts: 3,
			Healingat: 30,
			RecheckTarget: 5,
			Blacklist: new Array(),
			/*Rob Menu*/
			RobCityMenu: 0,
			RobCity: 0,
			RobSquadMenu: 0,
			Robsquads: false,
			/*Bandit Menu*/
			BanditGamblerXP: false,
			BanditGamblerCSH: false,
			BanditJob: false,
			BanditElapsedTimerXP: 4,
			BanditElapsedTimerCash: 4,
			lolzatcash: false,
			BanditCSHCheck: 4,
			BanditXPCheck: 1,
			BanditJOBCheck: 1,
			/*Spend/Restart Menu*/
			SpendWhich: 0,
			SpendingThis: 'energy',
			SkillSpending: 0,
			SkillToSpend: 'none',
			Restart: true,
			RestartIn: 5,
			/*Arena Menu*/
			ArenaCostMenu: 1,
			arenaSAO: false,
			arenaSA: true,
			arenaSAV: 5000,
			arenaPA: true,
			arenaNOA: 3,
			arenaSET: 0,
			arenaSS: true,
			arenaSSA: true,
			arenaBKS: 20,
			arenaBK: false,
			arenaSON: 0,
			arenaSOV: 0,
			arenaSP: false,
			/*Misc Menu*/
			AutopostingCrew: false,
			CrewAmount: 18,
			ABank: false,
			BankAmount: 5000,
			isAutoRun: false,
			/*Secondary Options*/
			NormalUntillValue: 0,
			RatioingJobValue: 0,
			NormalStamUntillValue: 0,
			RatioingStamValue: 0,
			/*Kami Stuff*/
			WhoToKill: 41236137,
			KamiURL: 'https://apps.facebook.com/inthemafia/profile.php?id=',
			/**/
			hazseen: false
		}
	};
	
	var DroneXJobMap = new Array(
		{name: "New York"},
		{name: "Fight a Haitian Gang [1.60]", button: 17, city: 1, cost: 5, tab: 3, isOldCity: true, isUsingButton: false, isTheXP: 8},
		{name: "Smuggle Thai Gems [1.56]", button: 19, city: 1, cost: 16, tab: 4, isOldCity: true, isUsingButton: false, isTheXP: 25},
		{name: "Repel the Yakuza [1.81]", button: 29, city: 1, cost: 11, tab: 5, isOldCity: true, isUsingButton: false, isTheXP: 20},
		{name: "Muscle in on a Triad Operation [1.95]", button: 65, city: 1, cost: 40, tab: 8, isOldCity: true, isUsingButton: false, isTheXP: 78},
		{name: "Settle a Beef... Permanently  [1.9167]", button: 69, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 69},
		{name: "Buy Off a Federal Agent [2.16]", button: 70, city: 1, cost: 31, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 67},
		{name: "Make Arrangements for a Visiting Don [1.9167]", button: 74, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 69},
		{name: "Travel to the Old Country [1.9565]", button: 76, city: 1, cost: 46, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 90},
		{name: "Brazil"},
		{name: "Run a Collection Plate Con [1.38]", button: 9, city: 7, cost: 82, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 113},
		{name: "Assassinate a Politician at a Museum Gala [1.47]", button: 11, city: 7, cost: 115, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 169},
		{name: "Give Chase to the Neo-Imperium [1.98]", button: 59, city: 7, cost: 756, tab: 5, isOldCity: false, isUsingButton: true, isTheXP: 1500},
		{name: "Bribe a Taubate Prison Worker [2.22]", button: 87, city: 7, cost: 648, tab: 8, isOldCity: false, isUsingButton: true, isTheXP: 1430},
		{name: "Assassinate the Neo-Imperium's Primary Heads [2.19]", button: 95, city: 7, cost: 810, tab: 8, isOldCity: false, isUsingButton: true, isTheXP: 1770},
		{name: "Chicago"},
		{name: "Secure Hooch to Sell in Your Joint [2.14]", button: 10, city: 8, cost: 324, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 692},
		{name: "Case Warehouses on North Side [2.13]", button: 12, city: 8, cost: 378, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 807},
		{name: "Flee the Scene Before the Police Arrive [1.96]", button: 48, city: 8, cost: 1350, tab: 6, isOldCity: false, isUsingButton: true, isTheXP: 2650},
		{name: "London Districts 3-8"},
		{name: "Approach The Police With Leads [2.05]", button: 19, city: 9, cost: 702, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 1440},
		{name: "Run The Racket [1.98]", button: 32, city: 9, cost: 1134, tab: 4, isOldCity: false, isUsingButton: true, isTheXP: 2240},
		{name: "Pay Off Your Debts [1.99]", button: 38, city: 9, cost: 1180, tab: 5, isOldCity: false, isUsingButton: true, isTheXP: 2360},
		{name: "Run Your Empire [2.24]", button: 39, city: 9, cost: 1080, tab: 5, isOldCity: false, isUsingButton: true, isTheXP: 2420},
		{name: "Ambush The Convoy Transporting The Gang Boss [2.09]", button: 43, city: 9, cost: 1240, tab: 6, isOldCity: false, isUsingButton: true, isTheXP: 2590},
		{name: "Forge The Reports [2.18]", button: 45, city: 9, cost: 1350, tab: 6, isOldCity: false, isUsingButton: true, isTheXP: 2930},
		{name: "Chase Down Your Son's Kidnappers [2.23]", button: 52, city: 9, cost: 1188, tab: 7, isOldCity: false, isUsingButton: true, isTheXP: 2650},
		{name: "Sneak Into The Manor [2.19]", button: 53, city: 9, cost: 1026, tab: 7, isOldCity: false, isUsingButton: true, isTheXP: 2240},
		{name: "Retire To The Isle Of Wight [2.23]", button: 56, city: 9, cost: 1240, tab: 7, isOldCity: false, isUsingButton: true, isTheXP: 2760},
		{name: "Investigate The Trail Of The Puzzle Box [2.25]", button: 58, city: 9, cost: 972, tab: 8, isOldCity: false, isUsingButton: true, isTheXP: 2180},
		{name: "Steal The Puzzle Box [2.13]", button: 61, city: 9, cost: 1240, tab: 8, isOldCity: false, isUsingButton: true, isTheXP: 2650},
		{name: "Fight Off The Police [2.28]", button: 62, city: 9, cost: 1188, tab: 8, isOldCity: false, isUsingButton: true, isTheXP: 2700},
		{name: "London District 9"},
		{name: "Set Up A Drug Racket From Your Kebab Shop (2.19)", button: 65, city: 9, cost: 972, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2132},
		{name: "Expand The Business With Turkish Smugglers' Help (2.19)", button: 66, city: 9, cost: 1026, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2247},
		{name: "Reap The Benefits (2.23)", button: 67, city: 9, cost: 1242, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2765},
		{name: "Suspect Foul Play (2.19)", button: 68, city: 9, cost: 1080, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2362},
		{name: "Silence Your Disloyal Associates (2.13)", button: 69, city: 9, cost: 1242, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2650},
		{name: "Pretend To Be A Survivor (2.13)", button: 70, city: 9, cost: 1188, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2535},
		{name: "Get Compensation From Insurance Company (2.05)", button: 71, city: 9, cost: 1350, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2765},
		{name: "Open Various Branches Across London But Beware (2.05)", button: 72, city: 9, cost: 1404, tab: 9, isOldCity: false, isUsingButton: true, isTheXP: 2880},
		{name: "London District 10"},
		{name: "Queue Up At The Grande Stadium For The Game (2.13)", button: 73, city: 9, cost: 972, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2132},
		{name: "Enjoy The Game At Rival Team's Cost (2.25)", button: 74, city: 9, cost: 972, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2247},
		{name: "Go To A Pub To Celebrate Your Team's Win (2.23)", button: 75, city: 9, cost: 1188, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2765},
		{name: "Poke Your Team's Victory In Rival Fans' Faces (2.23)", button: 76, city: 9, cost: 1242, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2362},
		{name: "Defend Yourself From The Rival's Fans (2.23)", button: 77, city: 9, cost: 1188, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2650},
		{name: "Make A Run For It And Hide (2.19)", button: 78, city: 9, cost: 1080, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2535},
		{name: "Speak To Your Uncle With Connections (2.22)", button: 79, city: 9, cost: 1296, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2765},
		{name: "Make The Club Pay For Their Disrespect (2.23)", button: 80, city: 9, cost: 1242, tab: 10, isOldCity: false, isUsingButton: true, isTheXP: 2880},
		{name: "South Africa \"Cape Town\""},
		{name: "Help Out At The Shipwreck (1.75)", button: 1, city: 10, cost: 7834, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 13740},
		{name: "Steal The Cargo Of Diamonds (1.95)", button: 2, city: 10, cost: 7975, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 15512},
		{name: "Hunt For The Highest Bidder (1.98)", button: 3, city: 10, cost: 7834, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 15512},
		{name: "Rally The Union To Join Your Operation (1.99)", button: 4, city: 10, cost: 7834, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 15623},
		{name: "Hide Your Shipment (2.02)", button: 5, city: 10, cost: 10946, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 22160},
		{name: "Discover A Rat In Your Operation (2.02)", button: 6, city: 10, cost: 10946, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 22160},
		{name: "Hire The Mafia As Muscle (2.05)", button: 7, city: 10, cost: 14074, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 28808},
		{name: "Protect Your Shipment Into International Waters (2.13)", button: 8, city: 10, cost: 9383, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 19944},
		{name: "Join Forces With The Mafia (2.13)", button: 9, city: 10, cost: 12510, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 26592},
		{name: "Set Up A Diamond Smuggling Racket (2.24)", button: 10, city: 10, cost: 10946, tab: 1, isOldCity: false, isUsingButton: true, isTheXP: 24487},
		{name: "South Africa \"The Limpopo River\""},
		{name: "Steal A Diamond At Work (1.82)", button: 11, city: 10, cost: 10946, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 19944},
		{name: "Defend Yourself Against The Supervisors (1.95)", button: 12, city: 10, cost: 12510, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 24376},
		{name: "Distract The Guards (2.02)", button: 13, city: 10, cost: 10946, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 22160},
		{name: "Loot The Safe Of Diamonds (1.89)", button: 14, city: 10, cost: 14074, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 26592},
		{name: "Locate The Militia By The River (1.89)", button: 15, city: 10, cost: 15247, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 28808},
		{name: "Trade Diamonds For High-Grade Weapons (2.1)", button: 16, city: 10, cost: 15794, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 33240},
		{name: "Incite The Miners to Riot (2.13)", button: 17, city: 10, cost: 15638, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 33240},
		{name: "Wage War Against The Mining Corporation (2.09)", button: 18, city: 10, cost: 14074, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 29362},
		{name: "Establish Yourself As A Rebel Leader (2.19)", button: 19, city: 10, cost: 17202, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 37672},
		{name: "Distribute The Spoils Of War (2.27)", button: 20, city: 10, cost: 15638, tab: 2, isOldCity: false, isUsingButton: true, isTheXP: 35456}, 
		{name: "South Africa \"Bloemfontein\""},
		{name: "Accept The Job For A Top-Secret Mission (1.89)", button: 21, city: 10, cost: 9383, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 17728},
		{name: "Reach The Medical Facility Without Being Noticed (2.13)", button: 22, city: 10, cost: 9383, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 19944},
		{name: "Dodge All High Security Elements (2.02)", button: 23, city: 10, cost: 10946, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 22160},
		{name: "Gain Access To The Disease Containment Chamber (2.13)", button: 24, city: 10, cost: 9383, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 19944},
		{name: "Eliminate An Unexpected Roadblock (2.02)", button: 25, city: 10, cost: 10946, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 22160},
		{name: "Open The Virus Vault With Protective Gear (2.23)", button: 26, city: 10, cost: 10946, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 24376},
		{name: "Take What You Came For (2.13)", button: 27, city: 10, cost: 12510, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 26592},
		{name: "Flee The Scene Without Leaving A Trail (2.20)", button: 28, city: 10, cost: 14074, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 31024},
		{name: "Be At The Right Place At The Right Time (2.18)", button: 29, city: 10, cost: 15247, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 33240},
		{name: "Sell The Virus To The Highest Bidder (2.29)", button: 30, city: 10, cost: 14105, tab: 3, isOldCity: false, isUsingButton: true, isTheXP: 32287},
		{name: "South Africa \"Kimberley\""},
		{name: "Spy On The Witch Doctor (1.786)", button: 31, city: 10, cost: 6336, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 11313},
		{name: "Discover The Secret Location Of The Herbs (1.877)", button: 32, city: 10, cost: 5544, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 10404},
		{name: "Fake An Injury And Seek Doctor's Aid (1.913)", button: 33, city: 10, cost: 7128, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 13636},
		{name: "Offer A Contract To The Witch Doctor (1.9)", button: 34, city: 10, cost: 6732, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 12788},
		{name: "Threaten The Doctor To Part With His \"Herbal Meds\" (2.127)", button: 35, city: 10, cost: 8910, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 18949},
		{name: "Gather A Mob To Force Doctor To Agree (1.99)", button: 36, city: 10, cost: 7920, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 15757},
		{name: "Set Doctor's House On Fire As A Warning (2.225)", button: 37, city: 10, cost: 9551, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 21252},
		{name: "Discover That The Doctor Has Escaped (2.162)", button: 38, city: 10, cost: 9979, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 21575},
		{name: "Launch A Manhunt For Doctor (2.254)", button: 39, city: 10, cost: 10692, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24100},
		{name: "Ensure That The Doctor Is In The Boss' Clutches (2.294)", button: 40, city: 10, cost: 11404, tab: 4, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26161},
		{name: "South Africa \"Mafikeng\""},
		{name: "Refuse To Poach For Rhino Horns And Ivory (1.874)", button: 61, city: 10, cost: 8208, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 15300},
		{name: "Give In To Militant Pressure To Poach (1.913)", button: 62, city: 10, cost: 8640, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 16500},
		{name: "Track Down And Hunt Rhinos (2.154)", button: 63, city: 10, cost: 8942, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 19200},
		{name: "Make A Futile Attempt To Escape Rangers (2.184)", button: 64, city: 60, cost: 8164, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 17800},
		{name: "Endure Torture During Interrogation (2.211)", button: 65, city: 10, cost: 9331, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 20600},
		{name: "Cut A Deal With Rangers (2.224)", button: 66, city: 10, cost: 9720, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 21600},
		{name: "Lead Rangers To Closest Militant Hideout (2.232) ", button: 67, city: 10, cost: 11275, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 25100},
		{name: "Take Cover From Gunfire (2.246)", button: 68, city: 10, cost: 11664, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26200},
		{name: "Expose Other Militant Pockets (2.296)", button: 69, city: 10, cost: 12441, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 28500},
		{name: "Become An Informer For The Rangers (2.313)", button: 70, city: 10, cost: 13996, tab: 7, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 32300},
		{name: "South Africa \"Nelspruit\""},
		{name: "Launch An Assault On The Football Stadium (2.090)", button: 71, city: 10, cost: 8080, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 16900},
		{name: "Demand That The President Be Surrendered To You (1.926)", button: 72, city: 10, cost: 8640, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 16600},
		{name: "Give The President Time To Escape (2.267)", button: 73, city: 10, cost: 8780, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 19900},
		{name: "Launch Deadly Virus Grenades Into The Crowd (2.196", button: 74, city: 10, cost: 8630, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 18900},
		{name: "Abduct The Nation's Most Influential Media Mogul (2.296)", button: 75, city: 10, cost: 10500, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24100},
		{name: "Blow Up The Grounded Blimp To Cover Your Escape (2.241)", button: 76, city: 10, cost: 8160, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 18200},
		{name: "Secure The Hideout While You Wait For The Boss (2.311)", button: 77, city: 10, cost: 11600, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26900},
		{name: "Persuade The Mogul To Join Your Cause (2.282)", button: 78, city: 10, cost: 10800, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 24800},
		{name: "Release Footage Of The President Abandoning The Stadium Victims (2.366)", button: 79, city: 10, cost: 12700, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 30100},
		{name: "Influence Public Opinion Through The Mogul's News Networks (2.395)", button: 80, city: 10, cost: 14300, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 342000},
		{name: "South Africa \"De Aar\""},
		{name: "Take Control Of The Leading Political Party (2.23)", button: 92, city: 10, cost: 11900, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 26600},
		{name: "Organize Terror Attacks By Your Militants (2.30)", button: 93, city: 10, cost: 12500, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 28500},
		{name: "Declare A State Of Emergency In The Country (2.25)", button: 95, city: 10, cost: 13900, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 31300},
		{name: "Establish Martial Law (2.32)", button: 96, city: 10, cost: 13500, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 31400},
		{name: "Publicize Your Philanthropy To Win Public Approval (2.29)", button: 98, city: 10, cost: 14400, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 33200},
		{name: "Get Sworn In As President (2.42)", button: 99, city: 10, cost: 13500, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 32600},
		{name: "Offer Your Associates Key Roles In The Cabinet (2.42)", button: 100, city: 10, cost: 17300, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 42100}
		);
	
	var DroneXBUJobMap = new Array(
		{name: "New York"},
		{name: "Fight a Haitian Gang [1.60]", button: 17, city: 1, cost: 5, tab: 3, isOldCity: true, isUsingButton: false, isTheXP: 8},
		{name: "Smuggle Thai Gems [1.56]", button: 19, city: 1, cost: 16, tab: 4, isOldCity: true, isUsingButton: false, isTheXP: 25},
		{name: "Repel the Yakuza [1.81]", button: 29, city: 1, cost: 11, tab: 5, isOldCity: true, isUsingButton: false, isTheXP: 20},
		{name: "Muscle in on a Triad Operation [1.95]", button: 65, city: 1, cost: 40, tab: 8, isOldCity: true, isUsingButton: false, isTheXP: 78},
		{name: "Settle a Beef... Permanently [1.91]", button: 69, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 69},
		{name: "Buy Off a Federal Agent [2.16]", button: 70, city: 1, cost: 31, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 67},
		{name: "Make Arrangements for a Visiting Don [1.91]", button: 74, city: 1, cost: 36, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 69},
		{name: "Travel to the Old Country [1.95]", button: 76, city: 1, cost: 46, tab: 9, isOldCity: true, isUsingButton: false, isTheXP: 90},
		{name: "London"},
		{name: "Fight Off The Police [2.28]", button: 62, city: 9, cost: 1188, tab: 8, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 2700}
	);
	
	var DroneXStaminaMap = new Array(
		{name: "Robbing", button: "0", city: 1, cost: 50, tab: 5, isRobbing: true, isFighting: false, isGroupPeople: false, isHopper: false, isArena: false, isKami: false},
		{name: "Arena"},		
		{name: "Spartacus", button: "0", city: 1, cost: 500, tab: 5, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: false, isArena: true, isKami: false},
		{name: "Fighting"},
		{name: "Fight List Fighting", button: 0, city: 1, cost: 75, tab: 1, isRobbing: false, isFighting: true, isGroupPeople: false, isHopper: false, isArena: false, isKami: false},
//		{name: "Fight Specific Opponents", button: 0, city: 1, cost: 75, tab: 1, isRobbing: false, isFighting: false, isGroupPeople: true, isHopper: false, isArena: false, isKami: false},
//		{name: "MWLists", button: 0, city: 1, cost: 75, tab: 1, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: true, isArena: false, isKami: false},
		{name: "Kami", button: 0, city: 1, cost: 75, tab: 1, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: true, isArena: false, isKami: true},
		{name: "SA Fight Jobs"},
		{name: "Gain The Cooperation Of Key Members Of Parliament [2.18]", button: 91, city: 10, cost: 0, tab: 10, isRobbing: false, isFighting: false, isGroupPeople: false, isHopper: false, isArena: false, isKami: false, isVegas: false, isTheXP: 9630},
		{name: "Double Cross And Have Them Eliminated (2.22)", button: 94, city: 10, cost: 0, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 11000},
		{name: "Offer Restitution To Terror Attack Victims (2.27)", button: 97, city: 10, cost: 0, tab: 10, isOldCity: false, isUsingButton: true, isVegas: false, isTheXP: 12500}
	);
	
/*Background Img Randomizer*/	
	function ImageArray (n) {
		this.length = n;
		for (var i =1; i <= n; i++) {
			this[i] = ' '
		}
	}
	
	function randomimage() {
		DXBGcurrentdate = new Date()
		DXBGimage_number = DXBGcurrentdate.getSeconds()
		DXBGimage_number = Math.floor(DXBGimage_number/DXBGrand)
		return(DXBGimage[DXBGimage_number])
	}
/*Background Img Randomizer*/	

	function create_div() {
		if(document.getElementById('gxDiv')) {
			document.getElementById('gxDiv').innerHTML = config_html;
		} else {
			var gxDiv=document.createElement("div");
			gxDiv.id = 'gxDiv';
			content.insertBefore(gxDiv, content.firstChild);
			document.getElementById('gxDiv').innerHTML = config_html;
		}
	}

	var content=document.getElementById('content_row');
	var mystylez = '<style type="text/css">'+
		'.arena_usepowerup { cursor:pointer; }'+
		'.arena_notusepowerup { cursor:default; }'+
		'.arena_puclick { cursor:pointer; }'+
		'.arena_punoclick { cursor:default; }'+
		'.arena_pufull { opacity:1; }'+
		'.arena_puhalf { opacity:0.6; }'+
		'.arena_puoff { opacity:0.2; }'+
		'.arena_puactive { border:1px solid white; }'+
		'.arena_punormal { border:1px solid #101010; }'+
		'.arena_offsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-10px -5px;padding-left: 30px;}'+
		'.arena_defsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-230px -110px;padding-left: 30px;}'+
	'</style>';

	readSettings();
	var config_html =
	'<div class="messages" style="margin:5px; background: url('+randomimage()+') no-repeat; background-size: 100%;">'+
	'<div>' +
	'<p align="left" style="margin-top:-1px;">&nbsp;' + Drone.iLike + '</p>' +
	'<p align="right" style="margin-top:-38px; margin-right:-6px; margin-bottom:-4px;">' +
	'<a id="Settings" class="sexy_button_new short black" href="#"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png" style="vertical-align:text-top;"></span></span></a>' +
	'&nbsp;<a id="DroneXHome" class="sexy_button_new short gold" TARGET="_blank" href="http://www.mrsimy0.net/Mafia"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif" style="vertical-align:text-top;"><font>Drone.&#12324; ' + version + '</font></span></span></a>' +
	'&nbsp;<a id="DroneXDonate" TARGET="_blank" href="http://www.mrsimy0.net/Mafia/donate.html" class="sexy_button_new short black"><span><span><span class="cash"></span></span></span></a>' +
	'&nbsp;<a id="DroneStart" class="sexy_button_new short green"><span><span>Go!</span></span></a>' +
	'&nbsp;<a id="close" class="sexy_button_new short black" ><span><span><img src="'+Drone.Images.Exit+'"></span></span></a>&nbsp;' +
	'</p>' +
	'</div>' +
	'<br>'+
	'<span style="background:url(https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/cautionTopIcon.png) no-repeat 5px 5px; padding:5px 0px 5px 30px;" id="SettingsNoti">No Settings Detected!</span>'+
	'<div id="MainOpt"></div>'+ 
	'<div id="droneconfig" style="display:none"><h3 style="text-align:center;">Drone.&#12324; Config</h3>'+
	'<fieldset><legend><select id="DX_Opts"><option value="0">Job Options</option><option value="1">Fight Options</option><option value="2">Robbing Options</option><option value="3">Bandit Options</option><option value="4">Spending/Restart</option><option value="5">Arena Options</option><option value="6">Misc</option></select></legend>' + 
'<div id="DX_Job_Opts">'+
	'Do <input id="DXJPS" type="integer" value="'+Drone.Storing.JobsPerSecondSpeed+'" style="resize:none;width:10px;"> Jobs a second'+
	'<br style="line-height: 30px;">Attempt to level account if short by just a little <input id="Fake_BU" type="checkbox" />'+
	'<span id="Fake_BU_row"><br style="line-height: 30px;">';
	config_html += 'Backup Energy Job:&nbsp;<select id="DXBUEnergyOpt" onChange="BackupEnergySelector(this.selectedIndex)">';
		for (i = 0; i < DroneXBUJobMap.length; i++) {
			config_html += '<option value="' + i + '">' + DroneXBUJobMap[i].name + "</option>"
		}
	config_html += '</select> Requires:&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/><span id="DX_BUNRGReqs">0</span></span>';
	config_html += '<br style="line-height: 30px;">Adding Seconds Into Timestamp is: <a id="AddSeconds" href="#"><span id="TimeStampSeconds">' + AddSecondsText + '</span></a>'+
	'<br style="line-height: 30px;">Debug For Sim is: <a id="DebugChange" href="#"><span id="DebugGUI">' + DebugText + '</span></a>'+

'</div>'+ 

'<div id="DX_Fight_Opts">'+
	'Fight in&nbsp;<select id="DXFC" onChange="FightCitySelector(this.value)"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option><option value="5">South Africa</option></select>'+
	'<br style="line-height: 30px;">Do <input id="DXFPS" type="integer" value="'+Drone.Storing.FightsPerSecondSpeed+'" style="resize:none;width:10px;"> Hits a second'+
	'<br style="line-height: 30px;">Bursts: <input id="setBursts" type="text" value="'+Drone.Storing.bursts+'" maxlength="1" style="width:10px;" /> <span class="more_in">(Max: 4)</span>'+
	'<br style="line-height: 30px;">Heal @: <input id="setreheal" type="text" value="'+Drone.Storing.Healingat+'" style="width:40px;" /> <span class="more_in">(Minimum: 21)</span>'+
	'<br style="line-height: 30px;">Recheck Target every: <input id="FakeRefresh" type="text" value="'+Drone.Storing.RecheckTarget+'" style="width:18px;" /> Seconds... <span class="more_in">(Minimum: 5)</span>'+
	'<br style="line-height: 30px;">BlackList: <textarea id="SpecialChars" class="sexy_input"></textarea>'+
	'</div>'+

'<div id="DX_Robbing_Opts">'+
	'Rob in&nbsp;<select id="DXRC" onChange="RobCitySelector(this.value)"><option value="0">New York</option><option value="1">Las Vegas</option><option value="2">Brazil</option><option value="3">Chicago</option><option value="4">London</option><option value="5">South Africa</option></select>'+
	'<br style="line-height: 30px;">Use Robsquads <select id="DXRS" onChange="RobSquadsOnOff(this.value)"><option value="0">No!</option><option value="1">Yes!</option></select>'+
'</div>'+

'<div id="DX_Bandits_Opts">'+
	'XP Bandit <select id="XPBanO" onChange="BanditXPCheck(this.selectedIndex)"><option value="0">Kill When Detected!</option><option value="1">Kill with 1 minute to go</option><option value="2">Kill with 2 minutes to go</option><option value="3">Kill with 3 minutes to go</option>'+
	'</select>'+
    '<br style="line-height: 30px;">Cash Bandit <select id="CSHBanO" onChange="BanditCSHCheck(this.selectedIndex)"><option value="0">Kill When Detected!</option><option value="1">Kill with 1 minute to go</option><option value="2">Kill with 2 minutes to go</option><option value="3">Kill with 3 minutes to go</option><option value="4">Keep Jobbing Thru it</option></select>'+
    '<br style="line-height: 30px;">Job Bandit <select id="JOBBanO" onChange="BanditJOBCheck(this.selectedIndex)"><option value="0">Kill When Detected!</option><option value="1">Wait it out!</option></select>'+
'</div>'+

'<div id="DX_Spending_Opts">'+
	'Spend: <select id="DXSW" onChange="SpendWhichSelector(this.value)"><option value="0">Energy First</option><option value="1">Stamina First</option><option value="2">Toe to Toe</option><option value="3">Only Energy</option><option value="4">Only Stamina</option></select>'+
    '<br style="line-height: 30px;">Apply Skillpoints: <select id="DXSS" onChange="SkillSpending(this.value)"><option value="0">No!</option><option value="1">Attack</option><option value="2">Defense</option><option value="3">Health</option><option value="4">Energy</option><option value="5">Stamina</option></select>'+
	'<br style="line-height: 30px;">Restart: <input id="Fake_restart" type="checkbox" /> &nbsp; <span id="Fake_restart_row"><br>Restart in: <input id="FakeRestarttime" type="text" value="'+Drone.Storing.RestartIn+'" maxlength="4" style="width:10px;" /> Minute(s). <span class="more_in">(Minimum: 1)</span></span>'+
'</div>'+

'<div id="DX_Arena_Opts">'+
	'Join:&nbsp;<select id="DXAC" onChange="ArenaSelector(this.value)"><option value="0">20 Stamina</option><option value="1">100 Stamina</option><option value="2">500 Stamina</option></select> Arenas.</br>'+
	'<span id="Arena_Switch_O"><input type="checkbox" id="arena_switch" checked class="DX_Config"/>&nbsp;Switch 500 Arenas to 100 Arenas When Below <input type="text" value="'+Drone.Storing.arenaSAV+'" id="arena_switch_v" class="DX_Config" style="width:30px;"> Stamina</br></span>'+
	'Powerattack:&nbsp;<input type="checkbox" id="arena_powerattack" checked class="DX_Config"/>&nbsp;Number of attacks:&nbsp;<input type="text" id="arena_numatt" value="'+Drone.Storing.arenaNOA+'" title="Number of attacks to batch, maximum=3" style="width:10px;"/></br>'+
	'Target to attack:&nbsp;<select id="arena_seltarget" title="Decide target priority"><option value="lowhealth">Lowest health alive</option><option value="highhealth">Highest health</option><option value="mostpoints">Most points alive</option><option value="leastpoints">Least points alive</option><option value="mostrespect">Most respect alive</option><option value="leastrespect">Least respect alive</option><option value="allalive">Attack all alive</option><option value="leastdiff">Least difficulty</option></select></br>'+
	'Don\'t attack defense shielded players: <input type="checkbox" id="arena_skipshield" checked class="DX_Config" title="Skip def shielded players" /></br>'+
	'Don\'t attack attack shielded players: <input type="checkbox" id="arena_skipshield_a" checked class="DX_Config" title="Skip att shielded players" /></br>'+
	'Use kamikazi at the last <input type="text" value="'+Drone.Storing.arenaBKS+'" id="arena_boostkami_s" class="DX_Config" style="width:16px;">s of the battle: <input type="checkbox" id="arena_boostkami" class="DX_Config"/></br>'+
	'Stop attacking:&nbsp;<select id="arena_stopon" title="In-arena play style"><option value="never">never (attack until stamina is gone)</option><option value="stop">now (do not attack)</option><option value="leading">when having the lead by a specific number of points</option><option value="leading3">when having the 3rd place by a specific number of points</option><option value="leading5">when having the 5th place by a specific number of points</option><option value="staminaused">when specific amount of stamina used</option><option value="staminaleft">when specific amount of stamina left</option></select><span id="show_stopon_value"> value: <input type="text" id="arena_stoponvalue" value="'+Drone.Storing.arenaSOV+'" style="width: 40px;" /></span></br>'+
	'Do not sort player list: <input type="checkbox" id="arena_sortplayer" class="DX_Config" /></br>'+
'</div>'+

'<div id="DX_Misc_Opts">'+
	'<input type="checkbox" id="APFC" class="DX_Config" />&nbsp;Autopost for crew when below&nbsp;<input id="CrewAmount" type="text" value="'+Drone.Storing.CrewAmount+'" maxlength="2" style="width:15px;" /><span class="more_in"><font size="2"> Disable if you experience issues from autoposting</font></span></br>'+
	'<input type="checkbox" id="Autobank" class="DX_Config" />&nbsp;AutoBank Above <input id="BankingAmount" type="text" value="'+Drone.Storing.BankAmount+'" maxlength="5" style="width:38px;" /> <span class="more_in"><font size="2">(Minimum: 9 & NY Disabled)</span></br>'+
	'Autorun <input type="checkbox" id="DXautoruning" class="DX_Config" /></br>'+
'</div>'+
	'</fieldset><br>'+
	'<hr></div>'+

	'<div id="mainstats" style="display:none;">'+
	'<div>'+
	'<div style="float:left">'+
		'<span id="IRJ" style="display:none"><font color="gold">&nbsp;Jobs Done&nbsp;</font>:<span id="JobsDone">0</span></span>'+
		'<span id="IRFOB" style="display:none"><font color="gold">&nbsp;Fobs Done&nbsp;</font>:<span id="FobsDone">0</span></span>'+
		'<span id="IRA" style="display:none"><font color="gold">&nbsp;Arenas Joined</font>:&nbsp;<span id="ArenasJoined">0</span></span>'+
		'<span id="IRR" style="display:none"><font color="gold">&nbsp;Robbing In&nbsp;</font>:<span id="RobCiti" class="more_in">Loading...</span>&nbsp;&nbsp;'+
		'<font color="gold">Boards Cleared</font>&nbsp;:&nbsp;<span id="Bcleared" class="more_in">0</span></span>'+
		
	'</div>'+
	'<div style="float:right">Ratios&nbsp;:<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif"><span id="nrg_ratio_reqd">0</span>&nbsp;&nbsp;<img width="12" height="12" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"><span id="sta_ratio_reqd">0</span>&nbsp;&nbsp;<img src="' + Drone.Images.En2xp + '"><span id="comb_ratio_reqd" class="more_in">0</span></div><br>' +
	'</div>'+
	'<div style="clear:both">'+
	'<div style="float:left;">'+
		'<font color="gold">&nbsp;In Action&nbsp;&nbsp;&nbsp;</font>:<span id="ActiRes">Loading...</span>'+
	'</div>'+
	'<div style="float:right">Fighting&nbsp;:<img src="' + Drone.Images.Iced + '" title="Iced">&nbsp;:&nbsp;<span id="icedsome">0</span>&nbsp;&nbsp;<img src="' + Drone.Images.Killed + '" title="Killed">&nbsp;:&nbsp;<span id="killedsome">0</span></div><br>' +
	'</div>'+
	'<div style="clear:both">'+
	'<div style="float:left">'+
		'<font color="gold">&nbsp;Weapons&nbsp;&nbsp;&nbsp;</font>:<span class="group_attack" title="Current Mafia Attack score" id="DX_atk_ttl">n/a</span>&nbsp;<span title="Mafia attack score gained this session" class="good" id="DX_atk_inc">+0</span>&nbsp;<span class="group_defense" title="Current Mafia Defense score" id="DX_def_ttl">n/a</span>&nbsp;<span title="Mafia defense score gained this session" class="good" id="DX_def_inc">+0</span>'+
	'</div>'+
	'<div style="float:right"><span id="SBTD" style="display:none"><span id="SBT"><span class="bad">Bandit Detected!</span></span></span> Bandits Killed : <span id="BanditsKilled">0</span>/<span id="BanditsTotal">0</span></div>'+
	'</div>'+
	'<div style="clear:both">'+
	'<div style="float:left">'+
		''+
	'</div>' +
	'<div style="float:right">Levelups&nbsp;:<span class="gold_star" title="Levelups"></span><span id="Levelscleared">0</span></div>'+
	'</div>'+
	'<div style="clear:both;>'+
	'<div style="float:left">'+
		'<span id="IRS" style="display:none"><font color="gold">&nbsp;Time Started</font>:&nbsp;<span id="ClockedIn" class="more_in">0:00</span> '+
		'<font color="gold">Time Finished</font>:&nbsp;<span id="ClockedOut" class="more_in">0:00</span></span>'+
	'</div>'+
	'<div style="clear:both; display:none;" id="IKL">'+
		'<table>'+
		'<tr>'+
			'<td width="50px" valign="top"><a href="#" id="Flog_show">FightLog</a> <input type="text" id="IKlog_size" value="5" class="sexy_input" style="width:16px"></input></td>'+
			'<td width="1px" valign="top">:</td>' +
			'<td valign="top" colspan="2">Ice/Kill Log<br><span id="iskl"></span></td>'+
		'</tr>'+
		'</table>'+
	'</div>'+
	'<div style="clear:both;">'+
		'<div style="float:left">'+
		'<table>'+
		'<tr>'+
			'<td width="50px" valign="top"><a href="#" id="loot_show">Loot</a></td>'+
			'<td width="1px" valign="top">:</td>' +
			'<td valign="top" colspan="2">Levelup Loot Log<br><span id="loot_log"></span></td>'+
		'</tr>'+
		'</table>'+
		'</div>'+
		'<div style="float:right"></div>'+
		'<div style="float:right"></div>'+
	'</div>'+
	'</div>'+
	'<div style="clear:both;">'+
		'<div style="float:left">'+
		'<table>'+
		'<tr>'+
			'<td width="50px" valign="top"><font color="gold">Status</font></td>'+
			'<td width="1px" valign="top">:</td>' +
			'<td id="DroneXStatus" valign="top" colspan="2">Drone Loaded...</td>'+
		'</tr>'+
		'</table>'+
		'</div>'+
	
	'</div>'+
	'<div id="gxRDivS" style="clear:both; display:none;">'+
	mystylez+
	'<table style="width:100%;">'+
			'<tr><td>Connection:</td><td><span id="arena_connstatus">-</span> <span id="arena_connstatus2"></span></td></tr>'+
		'<tr><td valign="top">Time left:</td><td colspan="2"><span id="arena_timeleftbar"></span></td></tr>'+
		'<tr><td valign="top">Power-Ups<br /><span class="more_in">(Click to use)</span>:</td><td colspan="2" valign="top"><span id="arena_powerups"></span></td></tr>'+
		'<tr><td>Stamina:</td><td colspan="2"><span class="stamina" id="arena_me_st">0</span>, next +<span id="arena_replenish">?</span> in <span id="arena_me_sr">0</span>s, used: <span class="stamina" id="arena_me_stused">0</span></td></tr>'+
		'<tr><td>Health:</td><td colspan="2"><span class="health" id="arena_me_health">100</span>% &nbsp; <span id="arena_healin"></span></td></tr>'+
		'<tr><td colspan="3">'+
			'<table id="arena_table" style="width:100%; border: 1px solid black;">'+
			'<tr>'+
			'<th style="height:20px; width:65px; padding:3px;">Rank<img height="16" width="16" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/item_treasure_chest_key.gif" id="arena_lockrank" style="display:none;"/></th>'+
			'<th style="padding:3px;">Opponent</th><th style="padding:3px;">Info</th><th style="padding:3px;">Respect</th><th style="width:65px;padding:3px;">Health</th><th style="padding:3px;">Score</th><th style="width:80px;padding:3px;">Shields</th><th style="padding:3px;">Intervene</th></tr>'+
			'<tr id="arena_op0"><td style="padding:3px;"><span id="arena_rank0">#1</span></td><td style="padding:3px;"><span id="arena_name0">Opponent 0</span></td><td style="padding:3px;"><span id="arena_diff0" class="difficulty"></span></td><td style="padding:3px;"><span id="arena_respect0" class="respect">0</span></td><td style="padding:3px;"><span class="health" id="arena_health0">0</span></td><td style="padding:3px;"><span id="arena_score0">0</span></td><td style="padding:3px;"><span id="arena_pu0"></span></td><td style="padding:3px;"><span id="arena_usepu0"></span></td></tr>'+
			'<tr id="arena_op1"><td style="padding:3px;"><span id="arena_rank1">#2</span></td><td style="padding:3px;"><span id="arena_name1">Opponent 1</span></td><td style="padding:3px;"><span id="arena_diff1" class="difficulty"></span></td><td style="padding:3px;"><span id="arena_respect1" class="respect">0</span></td><td style="padding:3px;"><span class="health" id="arena_health1">0</span></td><td style="padding:3px;"><span id="arena_score1">0</span></td><td style="padding:3px;"><span id="arena_pu1"></span></td><td style="padding:3px;"><span id="arena_usepu1"></span></td></tr>'+
			'<tr id="arena_op2"><td style="padding:3px;"><span id="arena_rank2">#3</span></td><td style="padding:3px;"><span id="arena_name2">Opponent 2</span></td><td style="padding:3px;"><span id="arena_diff2" class="difficulty"></span></td><td style="padding:3px;"><span id="arena_respect2" class="respect">0</span></td><td style="padding:3px;"><span class="health" id="arena_health2">0</span></td><td style="padding:3px;"><span id="arena_score2">0</span></td><td style="padding:3px;"><span id="arena_pu2"></span></td><td style="padding:3px;"><span id="arena_usepu2"></span></td></tr>'+
			'<tr id="arena_op3"><td style="padding:3px;"><span id="arena_rank3">#4</span></td><td style="padding:3px;"><span id="arena_name3">Opponent 3</span></td><td style="padding:3px;"><span id="arena_diff3" class="difficulty"></span></td><td style="padding:3px;"><span id="arena_respect3" class="respect">0</span></td><td style="padding:3px;"><span class="health" id="arena_health3">0</span></td><td style="padding:3px;"><span id="arena_score3">0</span></td><td style="padding:3px;"><span id="arena_pu3"></span></td><td style="padding:3px;"><span id="arena_usepu3"></span></td></tr>'+
			'<tr id="arena_op4"><td style="padding:3px;"><span id="arena_rank4">#5</span></td><td style="padding:3px;"><span id="arena_name4">Opponent 4</span></td><td style="padding:3px;"><span id="arena_diff4" class="difficulty"></span></td><td style="padding:3px;"><span id="arena_respect4" class="respect">0</span></td><td style="padding:3px;"><span class="health" id="arena_health4">0</span></td><td style="padding:3px;"><span id="arena_score4">0</span></td><td style="padding:3px;"><span id="arena_pu4"></span></td><td style="padding:3px;"><span id="arena_usepu4"></span></td></tr>'+
			'<tr id="arena_op5"><td style="padding:3px;"><span id="arena_rank5">#6</span></td><td style="padding:3px;"><span id="arena_name5">Opponent 5</span></td><td style="padding:3px;"><span id="arena_diff5" class="difficulty"></span></td><td style="padding:3px;"><span id="arena_respect5" class="respect">0</span></td><td style="padding:3px;"><span class="health" id="arena_health5">0</span></td><td style="padding:3px;"><span id="arena_score5">0</span></td><td style="padding:3px;"><span id="arena_pu5"></span></td><td style="padding:3px;"><span id="arena_usepu5"></span></td></tr>'+
			'</table>'+
			'</td></tr></table></div>'+
	'<div id="ArenaDisplay1" style="clear:both;display:none;">'+
		'<div style="float:left">'+
		'<table>'+
		'<tr>'+
			'<td width="73px" valign="top"><a href="#" id="toggleArenastats">Arena Stats</a></td>'+
			'<td width="1px" valign="top">:</td>' +
			'<td valign="top" colspan="2">Arena Stats<br><span id="arena_allstats"></span></td>'+
		'</tr>'+
		'</table>'+
		'</div>'+
	'</div>'+	
	'<div id="ArenaDisplay2" style="clear:both;display:none;">'+
		'<div style="float:left">'+
		'<table>'+
		'<tr>'+
			'<td width="73px" valign="top"><a href="#" id="toggleArenaloot">Arena Loot</a></td>'+
			'<td width="1px" valign="top">:</td>' +
			'<td valign="top" colspan="2">Arena Loot Log<br><span id="arena_lootlog"></span></td>'+
		'</tr>'+
		'</table>'+
		'</div>'+
	'</div>'+
	'<div style="clear:both">'+
		'<table>'+
		'<tr>'+
			'<td width="50px" valign="top"><a href="#" id="log_show">Log</a> <input type="text" id="log_size" value="15" class="sexy_input" style="width:16px"></input></td>'+
			'<td width="1px" valign="top">:</td>' +
			'<td id="Testlog" valign="top" colspan="2">Drone Loaded...</td>'+
		'</tr>'+
		'</table>'+
	'</div>'+
	'<div id="gxRDivS" style="display:none"></div>' +
	'</div>';


	if (!document.getElementById("gxDiv")) {
        create_div();
		setTimeout(makemeopts,50);
	}else{
		alert('Already Running');
	}
	
	document.getElementById("Settings").onclick = function () {
		UpdateConfig(document.getElementById("DX_Opts").selectedIndex);
		if(document.getElementById('droneconfig').style.display == "none"){
			$('#Settings').addClass('green').removeClass('black');
			$('#droneconfig').show();
		}else{
			$('#Settings').addClass('black').removeClass('green');
			$('#droneconfig').hide();
		}
	}
	
	$('#log_size').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1) {
			this.value = 1;
		}
	});
	
	$('#IKlog_size').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1) {
			this.value = 1;
		}
	});	
	
	$('#FakeRestarttime').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1) {
			this.value = 1;
		}
		Drone.Storing.RestartIn = this.value;
		writeSettings();
	});
	
	$('#CrewAmount').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) > 32 || parseInt(this.value) < 1) {
			this.value = 18;
		}
		Drone.Storing.CrewAmount = this.value;
		writeSettings();
	});
	
	$('#BankingAmount').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 9) {
			this.value = 100;
		}
		Drone.Storing.BankAmount = this.value;
		writeSettings();
	});
	
	$('#DXJPS').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1 || parseInt(this.value) > 4) {
			this.value = 1;
		}
//		var SimMath = 1000/this.value;
//		logit(SimMath);
		Drone.Storing.JobsPerSecondSpeed = this.value;
		Drone.Storing.JobsPerSecond = parseInt(Math.floor(1000/this.value));
		writeSettings();
	});
	
	$('#DXFPS').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1 || parseInt(this.value) > 4) {
			this.value = 3;
		}
		Drone.Storing.FightsPerSecondSpeed = this.value;
		Drone.Storing.FightsPerSecond = parseInt(Math.floor(1000/this.value));
		writeSettings();
	});
	
	$('#FakeRefresh').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 5) {
			this.value = 5;
		}
		Drone.Storing.RecheckTarget = this.value;
		writeSettings();
	});
	
	$('#setBursts').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) > 4 || parseInt(this.value) < 1) {
			this.value = 3;
			Drone.Storing.bursts = parseInt(this.value)
			logmsg('Bursts set to: '+Drone.Storing.bursts, 'log');
		}else{
			Drone.Storing.bursts = parseInt(this.value)
			logmsg('Bursts set to: '+Drone.Storing.bursts, 'log');
		}
		writeSettings();
	});
	
	
	$('#arena_numatt').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) > 3 || parseInt(this.value) < 1) {
			this.value = 3;	
		}
		Drone.Storing.arenaNOA = parseInt(this.value)
		writeSettings();
	});
	
	$('#arena_switch_v').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1) {
			this.value = 5000;	
		}
		Drone.Storing.arenaSAV = parseInt(this.value)
		writeSettings();
	});
	
	$('#arena_boostkami_s').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1) {
			this.value = 20;	
		}
		Drone.Storing.arenaBKS = parseInt(this.value)
		writeSettings();
	});
	
	$('#arena_stoponvalue').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 0) {
			this.value = 0;	
		}
		Drone.Storing.arenaSOV = parseInt(this.value)
		writeSettings();
	});
	
	
	$('#SpecialChars').bind('keyup',function() {
		writeSettings();
	});
	
	$('#setreheal').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 21) {
			this.value = 30;
			Drone.Storing.Healingat = parseInt(this.value)
			logmsg('Healing at: '+Drone.Storing.Healingat, 'log');
		}else{
			Drone.Storing.Healingat = parseInt(this.value)
			logmsg('Healing at: '+Drone.Storing.Healingat, 'log');
		}
		writeSettings();
	});	
	
/*	$('.DX_Config input,select,textarea').change(function(){
		writeSettings();
	});
*/

	document.getElementById("arena_seltarget").selectedIndex = Drone.Storing.arenaSET;
	document.getElementById("arena_stopon").selectedIndex = Drone.Storing.arenaSON;
	if(document.getElementById("arena_stopon").selectedIndex > 1) {
		$('#show_stopon_value').show();
	} else {
		$('#show_stopon_value').hide();
	}
	document.getElementById("arena_seltarget").onchange = ArenaSavr;
	document.getElementById("arena_stopon").onchange = ArenaSavr;
	
	$("input.DX_Config:checkbox").change(function(){
		ArenaSavr();
	});
	
	function ArenaSavr(){
		logit('saving');
		if (document.getElementById("arena_powerattack").checked) {
			Drone.Storing.arenaPA = true;
		}else{
			Drone.Storing.arenaPA = false;
		}
		if (document.getElementById("arena_switch").checked) {
			Drone.Storing.arenaSA = true;
		}else{
			Drone.Storing.arenaSA = false;
		}
		if (document.getElementById("arena_skipshield").checked) {
			Drone.Storing.arenaSS = true;
		}else{
			Drone.Storing.arenaSS = false;
		}
		if (document.getElementById("arena_skipshield_a").checked) {
			Drone.Storing.arenaSSA = true;
		}else{
			Drone.Storing.arenaSSA = false;
		}
		if (document.getElementById("arena_boostkami").checked) {
			Drone.Storing.arenaBK = true;
		}else{
			Drone.Storing.arenaBK = false;
		}
		if (document.getElementById("arena_sortplayer").checked) {
			Drone.Storing.arenaSP = true;
		}else{
			Drone.Storing.arenaSP = false;
		}
		if(document.getElementById("arena_stopon").selectedIndex > 1) {
			$('#show_stopon_value').show();
		} else {
			$('#show_stopon_value').hide();
		}
		if (document.getElementById("DXautoruning").checked) { 
			Drone.Storing.isAutoRun = true;
		}else {
			Drone.Storing.isAutoRun = false;
		}
		if (document.getElementById('Autobank').checked) {
			Drone.Storing.ABank = true;
		}else{
			Drone.Storing.ABank = false;
		}
		if (document.getElementById("APFC").checked) {
			Drone.Storing.AutopostingCrew = true;
		}else {
			Drone.Storing.AutopostingCrew = false;
		}
		Drone.Storing.arenaSON = document.getElementById("arena_stopon").selectedIndex;
		Drone.Storing.arenaSET = document.getElementById("arena_seltarget").selectedIndex;
		Drone.Storing.arenaSON = document.getElementById("arena_stopon").selectedIndex;
		writeSettings();
	}
	
	if (Drone.Storing.arenaPA){
		document.getElementById("arena_powerattack").checked = true;
	}
	else {
		document.getElementById("arena_powerattack").checked = false;
	}
	if (Drone.Storing.arenaSA){
		document.getElementById("arena_switch").checked = true;
	}
	else {
		document.getElementById("arena_switch").checked = false;
	}
	if (Drone.Storing.arenaSS){
		document.getElementById("arena_skipshield").checked = true;
	}
	else {
		document.getElementById("arena_skipshield").checked = false;
	}
	if (Drone.Storing.arenaSSA){
		document.getElementById("arena_skipshield_a").checked = true;
	}
	else {
		document.getElementById("arena_skipshield_a").checked = false;
	}
	if (Drone.Storing.arenaBK){
		document.getElementById("arena_boostkami").checked = true;
	}
	else {
		document.getElementById("arena_boostkami").checked = false;
	}
	if (Drone.Storing.arenaSP){
		document.getElementById("arena_sortplayer").checked = true;
	}
	else {
		document.getElementById("arena_sortplayer").checked = false;
	}
	if (Drone.Storing.isAutoRun){
		document.getElementById("DXautoruning").checked = true;
	}else {
		document.getElementById("DXautoruning").checked = false;
	}
	if (Drone.Storing.ABank) {
		document.getElementById("Autobank").checked = true;
	}
	if (Drone.Storing.AutopostingCrew) {
		document.getElementById("APFC").checked = true;
	}	
	
	if (Drone.Storing.Restart){
		$('#Fake_restart_row').show();
		document.getElementById("Fake_restart").checked = true;
	}
	else {
		$('#Fake_restart_row').hide();
		document.getElementById("Fake_restart").checked = false;
	}
	
	if(Drone.Storing.hazseen){
		document.getElementById("SettingsNoti").style.display = 'none';
	}else{
		document.getElementById("SettingsNoti").style.display = '';
	}

	$('#Fake_restart').change(function() {
		if ($('#Fake_restart').is(':checked')) {
			$('#Fake_restart_row').show();
			Drone.Storing.Restart = true;
		}
		else {
			$('#Fake_restart_row').hide();
			Drone.Storing.Restart = false;
		}
		writeSettings();
	});
	
	if (Drone.Storing.LevelupHelper){
		$('#Fake_BU_row').show();
		document.getElementById("Fake_BU").checked = true;
	}
	else {
		$('#Fake_BU_row').hide();
		document.getElementById("Fake_BU").checked = false;
	}

	if(Drone.Storing.Blacklist != ''){
		var a = unescape(Drone.Storing.Blacklist[0]);
		for(var i = 1; i < Drone.Storing.Blacklist.length; i++){
			a+='\n'+unescape(Drone.Storing.Blacklist[i])
		}
		document.getElementById('SpecialChars').value = a;
	}

	$('#Fake_BU').change(function() {
		if ($('#Fake_BU').is(':checked')) {
			$('#Fake_BU_row').show();
			Drone.Storing.LevelupHelper = true;
		}else {
			$('#Fake_BU_row').hide();
			Drone.Storing.LevelupHelper = false;
		}
		writeSettings();
	});
	
	$('.arena_att').click(function(){
		attack($(this).attr('data-id'),1);
		return false;
	});
	
	/*On the fly menus*/
	FightCitySelector = function (n) {
		if (Drone.Storing.FightCityMenu != n) {
			Drone.Storing.FightCityMenu = n;
			writeSettings();
		}
		switch (parseInt(n)) {
			case 0:
				Drone.Storing.FightCity = 1;
				break;
			case 1:
				Drone.Storing.FightCity = 5;
				break;
			case 2:
				Drone.Storing.FightCity = 7;
				break;
			case 3:
				Drone.Storing.FightCity = 8;
				break;
			case 4:
				Drone.Storing.FightCity = 9;
				break;
			case 5:
				Drone.Storing.FightCity = 10;
				break;	
		}
		if(Drone.Storing.PrimaryStaminaInfo > 3){
			StaminaDestination = Drone.Storing.FightCity;
			switch (parseInt(n)) {
				case 0:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 15;
					break;
				case 1:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 15;
					break;
				case 2:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 75;
					break;
				case 3:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 75;
					break;
				case 4:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 75;
					break;
				case 5:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 75;
					break;	
			}
		}	
	};
	
	RobCitySelector = function (n) {
		if (Drone.Storing.RobCityMenu != n) {
			Drone.Storing.RobCityMenu = n;
			writeSettings();
		}
		switch (parseInt(n)) {
			case 0:
				Drone.Storing.RobCity = 1;
				robCiti = 'New York';
				break;
			case 1:
				Drone.Storing.RobCity = 5;
				robCiti = 'Las Vegas';
				break;
			case 2:
				Drone.Storing.RobCity = 7;
				robCiti = 'Brazil';
				break;
			case 3:
				Drone.Storing.RobCity = 8;
				robCiti = 'Chicago';
				break;
			case 4:
				Drone.Storing.RobCity = 9;
				robCiti = 'London';
				break;
			case 5:
				Drone.Storing.RobCity = 10;
				robCiti = 'South Africa';
				break;
		}
		if(Drone.Storing.PrimaryStaminaInfo == 1){
			StaminaDestination = Drone.Storing.RobCity;
			switch (parseInt(n)) {
				case 0:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 20;				
					break;
				case 1:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 25;
					break;
				case 2:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 20;
					break;
				case 3:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 20;
					break;
				case 4:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 20;
					break;
				case 5:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 10;
					break;	
			}
		}
	};

	RobSquadsOnOff = function (n) {
		if (Drone.Storing.RobSquadMenu != n) {
			Drone.Storing.RobSquadMenu = n;
			writeSettings();
		}
		switch (parseInt(n)) {
			case 0:
				Drone.Storing.Robsquads = false;
				break;
			case 1:
				Drone.Storing.Robsquads = true;
				break;
		}		
	}
	
	ArenaSelector = function (n) {
		if (Drone.Storing.ArenaCostMenu != n) {
			Drone.Storing.ArenaCostMenu = n;
			writeSettings();
		}
		if(Drone.Storing.PrimaryStaminaInfo == 2){
			switch (parseInt(n)) {
				case 0:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 20;
					Drone.Storing.arenaSAO = false;
					$('#Arena_Switch_O').hide();
					ArenaReq = 'sw';
					break;
				case 1:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 100;
					Drone.Storing.arenaSAO = false;
					$('#Arena_Switch_O').hide();
					ArenaReq = 'lw';
					break;	
				case 2:
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = 500;
					Drone.Storing.arenaSAO = true;
					$('#Arena_Switch_O').show();
					ArenaReq = 'hw';
					break;
			}
		}
	};
	
	SpendWhichSelector = function (n) {
		if (Drone.Storing.SpendWhich != n) {
			Drone.Storing.SpendWhich = n;
			writeSettings();
		}
		switch (parseInt(n)) {
			case 0:
				Drone.Storing.SpendingThis = 'energy';
				break;
			case 1:
				Drone.Storing.SpendingThis = 'stamina';
				break;
			case 2:
				Drone.Storing.SpendingThis = 'toe2toe';
				break;
			case 3:
				Drone.Storing.SpendingThis = 'jnrg';
				break;
			case 4:
				Drone.Storing.SpendingThis = 'jstam';
				break;
		}
	};

	SkillSpending = function (n) {
		if (Drone.Storing.SkillSpending != n) {
			Drone.Storing.SkillSpending = n;
			writeSettings();
		}
		switch (parseInt(n)) {
			case 0:
				Drone.Storing.SkillToSpend = 'none';
				SkillsTo = 'None';
				break;
			case 1:
				Drone.Storing.SkillToSpend = 'attack';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-attack.gif"/> Attack!';
				break;
			case 2:
				Drone.Storing.SkillToSpend = 'defense';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-defense.gif"/> Defense!';
				break;
			case 3:
				Drone.Storing.SkillToSpend = 'max_health';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-health.gif"/> Health!';
				break;
			case 4:
				Drone.Storing.SkillToSpend = 'max_energy';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/> Energy!';
				break;
			case 5:
				Drone.Storing.SkillToSpend = 'max_stamina';
				SkillsTo = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"/> Stamina!';
				break;
		}
	};
	
	BackupEnergySelector = function (n) {
		if (Drone.Storing.BUEnergyInfo != n) {
			Drone.Storing.BUEnergyInfo = n;
			writeSettings();
		}
		$('#DX_BUNRGReqs').text(DroneXBUJobMap[Drone.Storing.BUEnergyInfo].cost);
	};
	
	BanditXPCheck = function(n){
		if (Drone.Storing.BanditXPCheck != n){
			Drone.Storing.BanditXPCheck = n;
			writeSettings();
		}
		switch(parseInt(n)){
			case 0:
			Drone.Storing.BanditGamblerXP = false;
			Drone.Storing.BanditElapsedTimerXP = 4;
			break;
			case 1:
			Drone.Storing.BanditGamblerXP = true;
			Drone.Storing.BanditElapsedTimerXP = 1;
			break;
			case 2:
			Drone.Storing.BanditGamblerXP = true;
			Drone.Storing.BanditElapsedTimerXP = 2;
			break;
			case 3:
			Drone.Storing.BanditGamblerXP = true;
			Drone.Storing.BanditElapsedTimerXP = 3;
			break;
		}
	};
	
	BanditCSHCheck = function(n){
		if (Drone.Storing.BanditCSHCheck != n){
			Drone.Storing.BanditCSHCheck = n;
			writeSettings();
		}
		switch(parseInt(n)){
			case 0:
			Drone.Storing.BanditGamblerCSH = false;
			Drone.Storing.lolzatcash = false;
			Drone.Storing.BanditElapsedTimerCash = 4;
			break;
			case 1:
			Drone.Storing.BanditGamblerCSH = true;
			Drone.Storing.lolzatcash = false;
			Drone.Storing.BanditElapsedTimerCash = 1;
			break;
			case 2:
			Drone.Storing.BanditGamblerCSH = true;
			Drone.Storing.lolzatcash = false;
			Drone.Storing.BanditElapsedTimerCash = 2;
			break;
			case 3:
			Drone.Storing.BanditGamblerCSH = true;
			Drone.Storing.lolzatcash = false;
			Drone.Storing.BanditElapsedTimerCash = 3;
			break;
			case 4:
			Drone.Storing.BanditGamblerCSH = false;
			Drone.Storing.lolzatcash = true;
			Drone.Storing.BanditElapsedTimerCash = 4;
			break;
		}
	};
	
	BanditJOBCheck = function(n){
		if (Drone.Storing.BanditJOBCheck != n){
			Drone.Storing.BanditJOBCheck = n;
			writeSettings();
		}
		switch(parseInt(n)){
			case 0:
			Drone.Storing.BanditJob = true;
			break;
			case 1:
			Drone.Storing.BanditJob = false;
			break;
		}
	};
	


	$('#arena_table').hover(function(){
		over_table = true;
		$('#arena_table').css('border-color','#444');
		$('#arena_lockrank').show();
	},function(){
		over_table = false;
		$('#arena_table').css('border-color','black');
		$('#arena_lockrank').hide();
	});
	
	document.getElementById("DXBUEnergyOpt").options[0].disabled = "disabled"; //Title
	document.getElementById("DXFC").options[1].disabled = "disabled";
	document.getElementById("DXRC").options[1].disabled = "disabled";
	if(parseInt(document.getElementById("user_max_stamina").innerHTML) < 3000){
		document.getElementById("DXAC").options[2].disabled = "disabled";
	}else{
		document.getElementById("DXAC").options[0].disabled = "disabled";
	}
	$('#DXBUEnergyOpt option:eq(' + Drone.Storing.BUEnergyInfo + ')').prop('selected', true);
		BackupEnergySelector(Drone.Storing.BUEnergyInfo);

	$('#DXSS option:eq(' + Drone.Storing.SkillSpending + ')').prop('selected', true);
		SkillSpending(Drone.Storing.SkillSpending);
	
	$('#DXFC option:eq(' + Drone.Storing.FightCityMenu + ')').prop('selected', true);
		FightCitySelector(Drone.Storing.FightCityMenu);
	
	$('#DXRC option:eq(' + Drone.Storing.RobCityMenu + ')').prop('selected', true);
		RobCitySelector(Drone.Storing.RobCityMenu);
	
	$('#DXRS option:eq(' + Drone.Storing.RobSquadMenu + ')').prop('selected', true);
		RobSquadsOnOff(Drone.Storing.RobSquadMenu);
		
	$('#DXAC option:eq(' + Drone.Storing.ArenaCostMenu + ')').prop('selected', true);
		ArenaSelector(Drone.Storing.ArenaCostMenu);		
	
	$('#DXSW option:eq(' + Drone.Storing.SpendWhich + ')').prop('selected', true);
		SpendWhichSelector(Drone.Storing.SpendWhich);
		
	$('#JOBBanO option:eq('+Drone.Storing.BanditJOBCheck+')').prop('selected', true);
	BanditJOBCheck(Drone.Storing.BanditJOBCheck);
	
	$('#CSHBanO option:eq('+Drone.Storing.BanditCSHCheck+')').prop('selected', true);
	BanditCSHCheck(Drone.Storing.BanditCSHCheck);
	
	$('#XPBanO option:eq('+Drone.Storing.BanditXPCheck+')').prop('selected', true);
	BanditXPCheck(Drone.Storing.BanditXPCheck);	
	
	document.getElementById("DroneStart").onclick = function () {
		if(!runonce && Drone.Storing.IsCustom){
			if(document.getElementById("job_selector").value == "new"){
				alert('No Custom Job Selected!')
				return;
			}
		}
		AutostartStopped = true;
		var jrv = parseFloat(document.getElementById("postformid1").value);
		Drone.Storing.RatioingJobValue = jrv.toPrecision(3);
		Drone.Storing.NormalUntillValue = parseInt(document.getElementById("postformid2").value);
		writeSettings();
		$('#eenstaaa').hide();
		clcikbutton('none');
	}
	
	$('#close').click(function(){
		clearstuff();
		CJSO = false;
		try {
			socke.close();
		} catch(noopenedyet) {}
		try {
			socke_lobby.close();
		} catch(noopenedyet) {}
		Drone.Running.Paused = true;
		$('#gxDiv').remove();
	});
		
	PrimaryEnergySelector = function (n) {
		if (Drone.Storing.PrimaryEnergyInfo != n) {
			Drone.Storing.PrimaryEnergyInfo = n;
			writeSettings();
		}
	};
	
	SecondaryEnergySelector = function (n) {
		if (Drone.Storing.SecondaryEnergyInfo != n) {
			Drone.Storing.SecondaryEnergyInfo = n;
			writeSettings();
		}
	};

	PrimaryStaminaSelector = function (n) {
		if (Drone.Storing.PrimaryStaminaInfo != n) {
			Drone.Storing.PrimaryStaminaInfo = n;
			writeSettings();
		}
		//$('#DX_StamReqs').text(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost);
		if(parseInt(n) == 0){
				StaminaWord = 'rob';
				StaminaLocation = 'robbing';
				StaminaDestination = Drone.Storing.RobCity; 
				StaminaTab = 'robbing';
				document.getElementById("KamiDiv").style.display = 'none';
				RobCitySelector(Drone.Storing.RobCityMenu);
		}else if(parseInt(n) == 2){
				StaminaWord = 'spart';
				StaminaLocation = 'none';
				StaminaDestination = 1; 
				StaminaTab = 'SpartHome';
				document.getElementById("KamiDiv").style.display = 'none';
				ArenaSelector(Drone.Storing.ArenaCostMenu);
		}else if(parseInt(n) == 4){ //<and less than xyz
				StaminaWord = 'fightlist';
				StaminaLocation = 'fight';
				StaminaDestination = Drone.Storing.FightCity;
				StaminaTab = '0';
				document.getElementById("KamiDiv").style.display = 'none';
				FightCitySelector(Drone.Storing.FightCityMenu);
		}else if(parseInt(n) == 5){
				StaminaWord = 'fight';
				StaminaLocation = 'fight';
				StaminaDestination = Drone.Storing.FightCity;
				StaminaTab = '1';
				document.getElementById("KamiDiv").style.display = '';
				FightCitySelector(Drone.Storing.FightCityMenu);
		}else if(parseInt(n) > 5){
				StaminaWord = 'fob';
				StaminaLocation = 'job';
				StaminaDestination = DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].city; 
				StaminaTab = DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].tab;
				document.getElementById("KamiDiv").style.display = 'none';
//function Dotravel(destination, from, tab, callback) {
//Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
		}
	};
	
	RadioCheck = function(n){
		if (Drone.Storing.RadioCheck != n){
			Drone.Storing.RadioCheck = n;
			writeSettings();	
		}

		switch(parseInt(n)){
			case 0:
				document.getElementById("hardcoded").style.display = '';
				document.getElementById("UserChoice").style.display = 'none'
				document.getElementById("hardcodedopts").checked = true;
				Drone.Storing.IsCustom = false;
				CJSO = false;
			break;
			case 1:
				document.getElementById("hardcoded").style.display = 'none';
				document.getElementById("UserChoice").style.display = ''
				document.getElementById("customcodedop").checked = true;
				bringupjobinfo();
				Drone.Storing.IsCustom = true;
				CJSO = true;
			break;
		}
	}		
	
	JobberCheck = function(n){
		if (Drone.Storing.JobberCheck != n){
			Drone.Storing.JobberCheck = n;
			writeSettings();
		}

		switch(parseInt(n)){
			case 0:
			$('#RatioJobRow').hide();
			$('#SecondryJobRow').hide();   
			$('#NormalUntillJobRow').hide();
			Drone.JobOptions.RatioingJob = false;
			Drone.JobOptions.NormalUntillJob = false;
			SecondaryJobbing = false;
			break;
			case 1:
			$('#RatioJobRow').show();
			$('#SecondryJobRow').show();
			$('#NormalUntillJobRow').hide();
			Drone.JobOptions.RatioingJob = true;
			Drone.JobOptions.NormalUntillJob = false;
			var jrv = parseFloat(document.getElementById("postformid1").value);
			Drone.Storing.RatioingJobValue = jrv.toPrecision(3);
			SecondaryJobbing = true;
			break;
			case 2:
			$('#RatioJobRow').hide();
			$('#SecondryJobRow').show();          
			$('#NormalUntillJobRow').show();
			Drone.JobOptions.RatioingJob = false;
			Drone.JobOptions.NormalUntillJob = true;
			Drone.Storing.NormalUntillValue = parseInt(document.getElementById("postformid2").value);
			SecondaryJobbing = true;
			break;
		}
	}
	
	CustomJobCheck = function(n){
		if (Drone.Storing.defaultCustomJob != n){
			Drone.Storing.defaultCustomJob = n;		
		}
		$('#DX_CJNRGReqs').text(Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].energy)
	}
	
	function makemeopts(){
		var rightnow = Math.round(new Date().getTime() / 1000);
		if (localStorage.getItem("DroneX_CJ55")) {
			Drone.CJ.abnotherjob = JSON.parse(localStorage.getItem("DroneX_CJ55"));
		}
		var mainOpts_html = '<div id="eenstaaa" style="display:block"><fieldset id="FAKE_opt_target"><legend>Energy/Stamina</legend>Energy:<input type="radio" name="optjobs" id="hardcodedopts" value="0" onChange="RadioCheck(this.value)">Hard Coded<input name="optjobs" id="customcodedop" type="radio" value="1" onChange="RadioCheck(this.value)">Custom Jobs';
mainOpts_html += '&nbsp;<span id="hardcoded"><br>&nbsp;<select id="DXPrimaryEnergyOpt" onChange="PrimaryEnergySelector(this.selectedIndex)">';
        for (i = 0; i < DroneXJobMap.length; i++) {
            mainOpts_html += '<option value="' + i + '">' + DroneXJobMap[i].name + "</option>"
        }
	mainOpts_html += '</select>';/* Requires:&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/><span id="DX_NRGReqs">0</span>*/
	mainOpts_html += '&nbsp;<select id="ENNRN" onChange="JobberCheck(this.selectedIndex)">'+
		'<option value="0" href="#" id="NormJob">Normal Click</option>'+
		'<option value="1" href="#" id="RatioJob">Untill Ratio</option>'+
		'<option value="2" href="#" id="NormJobUntil">Normal Untill/NE</option>'+
	'</select>&nbsp;&nbsp;'+
	'<span id="RatioJobRow" style="display:none">'+  
		'is <input style="resize:none;width:35px;" value="'+Drone.Storing.RatioingJobValue+'" id="postformid1">'+
	'</span>'+
	'<span id="NormalUntillJobRow" style="display:none">'+
		'<input style="resize:none;width:40px;" value="'+Drone.Storing.NormalUntillValue+'" id="postformid2"> Energy Left.'+
	'</span>'; 
	mainOpts_html += '<span id="SecondryJobRow" style="display:none"><br>&nbsp;<select id="DXSecondaryEnergyOpt" onChange="SecondaryEnergySelector(this.selectedIndex)">';
        for (i = 0; i < DroneXJobMap.length; i++) {
            mainOpts_html += '<option value="' + i + '">' + DroneXJobMap[i].name + "</option>"
        }
	mainOpts_html += '</select></span></span>';
	
	mainOpts_html += '&nbsp;<span id="UserChoice" style="display:none"><br>&nbsp;<select id="job_selector" onChange="CustomJobCheck(this.selectedIndex)"><option value="new">Custom Jobs</option>';	
	for (i = 0; i < Drone.CJ.abnotherjob.length; i++) {
            mainOpts_html += '<option value="' + i + '">' + Drone.CJ.abnotherjob[i].name + "</option>"
        }
	mainOpts_html += '</select>';/* Requires:&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/><span id="DX_CJNRGReqs">0</span>*/
	mainOpts_html += '<br style="line-height: 30px;">&nbsp;<a href="#" id="DCJ" class="sexy_button_new short orange"><span><span><img style="vertical-align:text-top;" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/iced.png">Delete Custom Jobs</span></span></a></span>';	
/*	
		mainOpts_html += '<br>&nbsp;'+'<select id="DXPrimaryEnergyOpt" onChange="PrimaryEnergySelector(this.selectedIndex)">';
        for (i = 0; i < DroneXJobMap.length; i++) {
//			if(i > 16 && rightnow > 1371884267){
//				mainOpts_html += '<option style="background: url(http://mrsimy0.net/Imgs/rp_icon_old.png) no-repeat left;padding-left:20px;" value="' + i + '" disabled>' + DroneXJobMap[i].name + "</option>";
//			}else if(i > 2){
//				mainOpts_html += '<option value="' + i + '">' + DroneXJobMap[i].name + "</option>";
//			}else{
				mainOpts_html += '<option value="' + i + '">' + DroneXJobMap[i].name + "</option>";
//			}
		}
		mainOpts_html += '</select> Requires:&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif"/><span id="DX_NRGReqs">0</span>';	
//		mainOpts_html += '</span>';			
*/		mainOpts_html += '<br>&nbsp;Stamina:<br>&nbsp;<select id="DXPrimaryStaminaOpt" onChange="PrimaryStaminaSelector(this.selectedIndex)">';
        for (i = 0; i < DroneXStaminaMap.length; i++) {
            mainOpts_html += '<option value="' + i + '">' + DroneXStaminaMap[i].name + "</option>"
        }
		mainOpts_html += '</select>'; //Requires:&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif"/><span id="DX_StamReqs">0</span>';
		mainOpts_html += '<span id="KamiDiv" style="display:none"><br>&nbsp;Player to Attack <span class="more_in">(Copy the link from a Player Profile Page)</span><br/>' + 
	'&nbsp;<input type="text" id="FAKE_target_url" value="'+Drone.Storing.KamiURL+'" style="font-size: 11px; background-color: black; color:#52E259; font-weight:bold;" size="112"/></span>';
		mainOpts_html += '</fieldset><br><hr></div>';
		document.getElementById('MainOpt').innerHTML = mainOpts_html;
		document.getElementById("DXPrimaryEnergyOpt").options[0].disabled = "disabled";
		document.getElementById("DXPrimaryEnergyOpt").options[9].disabled = "disabled";
		document.getElementById("DXPrimaryEnergyOpt").options[15].disabled = "disabled";
		document.getElementById("DXPrimaryEnergyOpt").options[19].disabled = "disabled";
		document.getElementById("DXPrimaryEnergyOpt").options[32].disabled = "disabled";//Current SD?
		document.getElementById("DXPrimaryEnergyOpt").options[41].disabled = "disabled";//Pay to play SD?		
		document.getElementById("DXPrimaryEnergyOpt").options[50].disabled = "disabled";//Pay to play SD?	
		document.getElementById("DXPrimaryEnergyOpt").options[61].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXPrimaryEnergyOpt").options[72].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXPrimaryEnergyOpt").options[83].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXPrimaryEnergyOpt").options[94].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXPrimaryEnergyOpt").options[105].disabled = "disabled";//Pay to play SD?		
		document.getElementById("DXSecondaryEnergyOpt").options[0].disabled = "disabled";
		document.getElementById("DXSecondaryEnergyOpt").options[9].disabled = "disabled";
		document.getElementById("DXSecondaryEnergyOpt").options[15].disabled = "disabled";
		document.getElementById("DXSecondaryEnergyOpt").options[19].disabled = "disabled";
		document.getElementById("DXSecondaryEnergyOpt").options[32].disabled = "disabled";//Current SD?
		document.getElementById("DXSecondaryEnergyOpt").options[41].disabled = "disabled";//Pay to play SD?		
		document.getElementById("DXSecondaryEnergyOpt").options[50].disabled = "disabled";//Pay to play SD?	
		document.getElementById("DXSecondaryEnergyOpt").options[61].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXSecondaryEnergyOpt").options[72].disabled = "disabled";//Pay to play SD?		
		document.getElementById("DXSecondaryEnergyOpt").options[83].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXSecondaryEnergyOpt").options[94].disabled = "disabled";//Pay to play SD?
		document.getElementById("DXSecondaryEnergyOpt").options[105].disabled = "disabled";//Pay to play SD?			
	//	document.getElementById("DXSecondaryEnergyOpt").options[77].disabled = "disabled";		
//		document.getElementById("DXPrimaryStaminaOpt").options[0].disabled = "disabled";//title
//		document.getElementById("DXPrimaryStaminaOpt").options[1].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[2].disabled = "disabled";
		document.getElementById("DXPrimaryStaminaOpt").options[1].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[2].disabled = "disabled";
		document.getElementById("DXPrimaryStaminaOpt").options[3].disabled = "disabled";
		document.getElementById("DXPrimaryStaminaOpt").options[6].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[4].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[5].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[6].disabled = "disabled";//title
//		document.getElementById("DXPrimaryStaminaOpt").options[4].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[8].disabled = "disabled";//title
//		document.getElementById("DXPrimaryStaminaOpt").options[9].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[10].disabled = "disabled";//title
//		document.getElementById("DXPrimaryStaminaOpt").options[11].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[12].disabled = "disabled";
//		document.getElementById("DXPrimaryStaminaOpt").options[10].disabled = "disabled";
		
		$('#DXPrimaryEnergyOpt option:eq(' + Drone.Storing.PrimaryEnergyInfo + ')').prop('selected', true);
			PrimaryEnergySelector(Drone.Storing.PrimaryEnergyInfo);
		$('#DXSecondaryEnergyOpt option:eq(' + Drone.Storing.SecondaryEnergyInfo + ')').prop('selected', true);
			SecondaryEnergySelector(Drone.Storing.SecondaryEnergyInfo);
		$('#DXPrimaryStaminaOpt option:eq(' + Drone.Storing.PrimaryStaminaInfo + ')').prop('selected', true);
			PrimaryStaminaSelector(Drone.Storing.PrimaryStaminaInfo);
		$('#ENNRN option:eq('+Drone.Storing.JobberCheck+')').prop('selected', true);
			JobberCheck(Drone.Storing.JobberCheck);
	
//		$('#FAKE_target_url').val('https://apps.facebook.com/inthemafia/profile.php?id=');
		
		$("#FAKE_target_url").change(function () {
			targets = [];
		});
		
		$('[name^="optjobs"] option:eq('+Drone.Storing.RadioCheck+')').prop('selected', true)
		RadioCheck(Drone.Storing.RadioCheck);		
		
		document.getElementById("job_selector").options[0].disabled = "disabled";
		if (Drone.Storing.CustomJobCount > 0){
			$('#job_selector option:eq('+Drone.Storing.defaultCustomJob+')').prop('selected', true)
			CustomJobCheck(Drone.Storing.defaultCustomJob);
		}	
		
		document.getElementById("DCJ").onclick = function () {
//			Deleting CustomJobs	
//			if deleteing customjobs, 
//			remove the job div completely	
			$('#eenstaaa').remove();
//			reset the cj vars
			Drone.Storing.CustomJobCount = 0;
			Drone.Storing.defaultCustomJob = 0;
			Drone.CJ.abnotherjob = new Array();
//			remove the localstoragefile	
			localStorage.removeItem("DroneX_CJ55");
//			because they are saved in localstorage!!
//			then reinstall the div
			makemeopts();
	}

	}
	
	function UpdateConfig(value) {
		value = parseInt(value);
        value === 0 ? $("#DX_Job_Opts").show() : $("#DX_Job_Opts").hide(), 
		value === 1 ? $("#DX_Fight_Opts").show() : $("#DX_Fight_Opts").hide(), 
		value === 2 ? $("#DX_Robbing_Opts").show() : $("#DX_Robbing_Opts").hide(), 
		value === 3 ? $("#DX_Bandits_Opts").show() : $("#DX_Bandits_Opts").hide(), 
		value === 4 ? $("#DX_Spending_Opts").show() : $("#DX_Spending_Opts").hide(), 
		value === 5 ? $("#DX_Arena_Opts").show() : $("#DX_Arena_Opts").hide(),
		value === 6 ? $("#DX_Misc_Opts").show() : $("#DX_Misc_Opts").hide()
    }
	
	$("#DX_Opts").change(function () {
		UpdateConfig(this.value);
	})
	
//	document.getElementById("DX_Opts").options[1].disabled = "disabled";
//	document.getElementById("DX_Opts").options[2].disabled = "disabled";
//	document.getElementById("DX_Opts").options[3].disabled = "disabled";
//	document.getElementById("DX_Opts").options[6].disabled = "disabled";
	
//	$('#FAKE_target_url').val('https://apps.facebook.com/inthemafia/profile.php?id=');
/*	document.getElementById("DSSpendWhich").selectedIndex = 4;
	document.getElementById("DSSpendWhich").options[0].disabled = "disabled";
	document.getElementById("DSSpendWhich").options[1].disabled = "disabled";
	document.getElementById("DSSpendWhich").options[2].disabled = "disabled";
	document.getElementById("DSSpendWhich").options[3].disabled = "disabled"; */
//			logit(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost)
	
	function clcikbutton(msg){
		if (Drone.Running.Paused) {
			Drone.Running.Paused = false;
			SkillPointAssinRunning = false;
			ARS = false;
			pausing(3,'<span class="good">Starting in </span>',saveit);
			document.getElementById("DroneStart").setAttribute("class", "sexy_button_new short green");
			document.getElementById("DroneStart").innerHTML = "<span><span>Running</span></span>";
		} else {
			clearstuff();
			if(msg != 'none'){
				logmsg(msg, 'log');			
			}
			if(arena_running){
				ARS = true;
				logmsg('Pausing after arena finishes..', 'log');
			}else{
				logmsg('Drone Stopping', 'log');
				logmsg('Drone Stopped', 'status');
			}
			Drone.Running.Paused = true;
			arena_running = false;
			SkillPointAssinRunning = false;
			document.getElementById("DroneStart").setAttribute("class", "sexy_button_new short red");
			document.getElementById("DroneStart").innerHTML = "<span><span>Stopped</span></span>";
			return;
		}
	};

	function clearstuff(){
		BUBT = 6;
		BanditPassIs = false;
		clearInterval(DroneXtimer);
	}

	document.getElementById("log_show").onclick = function () {
		$('#Testlog').toggle();
		return false;
	};

	document.getElementById("Flog_show").onclick = function () {
		$('#iskl').toggle();
		return false;
	};

	document.getElementById("loot_show").onclick = function(){
		$('#loot_log').toggle();
		return false;
	};
	
	document.getElementById("toggleArenaloot").onclick = function(){
		$('#arena_lootlog').toggle();
		return false;
	};
		
	document.getElementById("toggleArenastats").onclick = function(){
		$('#arena_allstats').toggle();
		return false;
	};
		
	document.getElementById("DebugChange").onclick = function () {
		DebugOnOff++;
		DebugOnOff = (DebugOnOff > 1) ? 0 : DebugOnOff;
		switch (DebugOnOff) {
		case 0:
			DebugIt = false;
			DebugText = document.getElementById("DebugGUI").innerHTML = "Disabled";
			break;
		case 1:
			DebugIt = true;
			DebugText = document.getElementById("DebugGUI").innerHTML = "On";
			break;
		}
		return false
	};
	
	document.getElementById("AddSeconds").onclick = function () {
		AddSecondsCount++;
		AddSecondsCount = (AddSecondsCount > 1) ? 0 : AddSecondsCount;
		switch (AddSecondsCount) {
		case 0:
			AddSec = 'false';
			AddSecondsText = document.getElementById("TimeStampSeconds").innerHTML = "Disabled";
			break;
		case 1:
			AddSec = 'true';
			AddSecondsText = document.getElementById("TimeStampSeconds").innerHTML = "On";
			break;
		}
		return false
	};
	
	$('#arena_lootlog').hide();
	$('#arena_allstats').hide();
	
	function bringupjobinfo(){
		try{
			if($("#dronex_job").length > 0){
				return;
			}
		} catch (err){}
		
		$('.job').each(function(index){
            var job_div = $(this)
            //if we are allready attached to the job skip and check next
            if  ($(job_div,'#dronex_job').find('#dronex_job').length > 0){
				return true
            }
            var our_button = $(job_div).find('.uses.clearfix')
            var job_id_div = $(job_div).attr('id');
            var job_id = /(\d+)/.exec(job_id_div)[0]
            $(our_button).append( '<span id="dronex_job"><a class="sexy_button_new short black dronex_job" href="#" job_id="'+job_id_div+'" title="Add this job to Drone.&#12324;"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"></span></span></a></span>');
		});
		
		//bind our buttons to process
		$('.dronex_job').click(function(){
			if(Drone.CJ.abnotherjob.length > 9){
				alert('Drone will only store 10 jobs max!');
				return;
			}
			Drone.Storing.CustomJobCount++;
			if(Drone.CJ.abnotherjob.length == 0){
				Drone.Storing.CustomJobCount = 0;
			}
			var job_id_div = $(this).attr('job_id');
            //extract from the clicked button 
            var name = $.trim($('#'+job_id_div).find('.job_details > h4').text());
			if($('#spockholm_toolbar').length > 0){
				var GetName = parseStuff($('#'+job_id_div).find('h4').text());
				if(GetName){
					name = GetName.name + " ("+GetName.ratio+")";
				}
			}
			var job_id = /(\d+)/.exec(job_id_div)[0]
			var energy = $('#'+job_id_div).find('.uses.clearfix').find('.energy').attr('current_value');
			var experience = $('#'+job_id_div).find('.pays.clearfix').find('.experience').attr('current_value');
			var link = $('#'+job_id_div).find('div[class^="job_details clearfix"] a[id^="btn_dojob_"]');
			var linkp2 = $(link).prop('href');
			var tab = /tab=(\d+)/.exec(linkp2)[1];
			var city = /xw_city=(\d+)/.exec(linkp2)[1];
			//push to array    
            var new_job = {name:name,job_id:job_id,energy:energy,experience:experience,tab:tab,city:city}
			Drone.CJ.abnotherjob.push(new_job);
			if (Drone.CJ.abnotherjob.length > 0){
				//push job to the job selector
				$('#job_selector').append($("<option></option>").attr("value",Drone.Storing.CustomJobCount).text(name));
				
			}  
		})
	}
	
	function parseStuff( str ) { // By Esa
		var re = /^(.*?)(?=x(\d+)\s*\(([0-9.]+)\)).*?(?=Gaining: (\d+)exp).*?(?=Left: (\d+)).*?(?=Cash: (-?[0-9.]+))/
		var matches = str.match( re );
		if( matches && matches.length == 7 ) {
			return {
				name: matches[1].trim(),
				times: parseInt( matches[2], 10 ),
				ratio: parseFloat( matches[3] ),
				gaining: parseInt( matches[4], 10 ),
				left: parseInt( matches[5], 10 ),
				cash: parseFloat( matches[6] )
			}
		}
		return null;
	}
	
	function saveit(){
		if(Drone.Running.Paused){
			return;
		}
//		Drone.Storing.PrimaryEnergyInfo = document.getElementById("DSSpendWhich").selectedIndex;
//		Drone.UseWhatFirst = document.getElementById("DSSpendWhich").selectedIndex;
		if(!runonce){
			if(Drone.Storing.IsCustom){
			//DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]]
				DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].name = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].name;
				DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].job_id;
				DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].city;
				DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].energy;
				DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].tab;
				DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].experience;
				
/*				DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].name = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].name;
				DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].button = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].job_id;
				DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].city = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].city;
				DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].cost = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].energy;
				DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].tab = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].tab;
				DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].isTheXP = Drone.CJ.abnotherjob[Drone.Storing.defaultCustomJob-1].experience;*/
				if(DebugIt){logit('name: '+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].name+'\nbutton: '+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button+'\ncity: '+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city+'\ncost: '+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost+'\ntab: '+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab+'\nisTheXP: '+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP);}
				CJSO = false;
			}
			runonce = true;
			$('#mainstats').show();	
			var jVersion = $.ui ? $.ui.version || "pre 1.6" : 'jQuery-UI not detected';
			logmsg('<span class="gold_star"></span> <span class="good">jQuery Version '+jVersion+'</span>', 'log');
//			loadInventory(saveit);
			saveit(); //remove when uncommenting above
			return;
		}
		/*saving custom jobs*/
		Drone.Storing.KamiURL = $('#FAKE_target_url').val();
		if(Drone.Storing.IsCustom){
			localStorage.setItem("DroneX_CJ55", JSON.stringify(Drone.CJ.abnotherjob));
		}
		/*end saving*/
		if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isArena){
			$('#ArenaDisplay1').show();
			$('#ArenaDisplay2').show();
		}
		ArenaGrabStamIsFirst = true;
		check_skills(checkit);
	}
	
	function KamiLink(){
		if(Drone.Running.Paused){
			return;
		}
		targets = [];
		var a = /":"(.+)"/.exec(decode_link($('#FAKE_target_url').val()));
		if (a) {
			Drone.Storing.KamiURL = $('#FAKE_target_url').val();
			logmsg('loading profile page...', 'log');
			var url = 'xw_controller=stats&xw_action=view&user='+a[1];
			request(url,function (response) {
				setTimeout(function () {
					parse_profile_page(response);
				}, 3000) ; 
			});	
        } else {
			clcikbutton('<span class="bad">Problem With Profile Link</span> Copy the link from profile page'); 
		}
	}
	
	function decode_link(a) {
        var b = /\?next_params=(.+)/.exec(a);
        b && (a = atob(decodeURIComponent(b[1]))); 
		a = a.replace(/&amp;/g, "&");
		a = a.replace(/&quot;/g, '"'); 
		a = a.replace(/\+/g, " ");
		a = a.replace(/%22/g, '"'); 
		a = a.replace(/%2C/g, ","); 
		a = a.replace(/%3A/g, ":"); 
		a = a.replace(/%7B/g, "{"); 
		a = a.replace(/%7C/g, "|"); 
		return a = a.replace(/%7D/g, "}")
    }
	
	function parse_profile_page(response) {
		if(Drone.Running.Paused){
			return;
		}
	    if (/ERROR 500/.test(response)) {
                i_fight.fighting = false;
				HitKami();
        } else {	
		response = response.replace(/<img/ig, '<noimg');
		if (response.length == 0) {
			logmsg('Borked response, 0 size, retrying...', 'log');
			KamiLink();
			return;
		}
		logmsg('Reading profile page...', 'log');
		try {
			var button = $(response).find('.impulse_buy:first').attr('href');
			if (button) {
				button = button.replace(/&amp;/g,'&').replace(/remote\/html_server.php\?/,'');
				var text = $(response).find('div[class*="stats_title"]').html();
				var family = $(response).find('div[class*="stats_title"] span:first').html();
				var level = 1;
				if (lev = /Level (\d+) (Fearless|Maniac|Mogul)/i.exec(text)) {
					level = parseInt(lev[1]);
				}
				var type = 'Unknown';
				if (ty = /Level (\d+) (Fearless|Maniac|Mogul)/i.exec(text)) {
					type = ty[2];
				}
				var name = 'NoName';
				if (na = /"(.*?)" level/.exec(text.replace(family,''))) {
					name = na[1];
				}

				if (/attack_pop/.test(button)) {
					var pid = /opponent_id=p%7C(\d+)/.exec(button)[1];
					targets.push({"pid":pid,"button":button,"name":name,"family":family,"family_id":0,"level":level,"type":type});
					logmsg('Profile page read successfully...', 'log');
					nxt_step();
					return;
				}
				else {
					clcikbutton('No attack button found on profile page. Could be a mafia member? (case a)');
					return;
				}
			}
			else {
				clcikbutton('No attack button found on profile page. Could be a mafia member?');
				return;
			}
		}
		catch (profile_error) {
			if(DebugIt){logit('Profile Parse Error: '+profile_error.lineNumber+profile_error.line+' :'+profile_error.message);}
			KamiLink();
			return;
		}
		}
	}
	
	function profile_link() {
		if (!isNaN(targets[0].family_id) && targets[0].family_id > 1) {
			return '<a href="http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22'+btoa(targets[0].family_id)+'%22%7D" target="_blank" title="Family id '+targets[0].family_id+'"><span style="color:red;">'+targets[0].family+'</span></a> <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].name+'</a> Level '+targets[0].level;
		}
		else {
			return '<a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].name+'</a> Level '+targets[0].level;
		}
	}
	
	/*function profile_link() {
		return '<a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].name+'</a> Level '+targets[0].level;
	} */
	
	function nxt_step() {
		if(Drone.Running.Paused){
			return;
		}
		logmsg(profile_link()+' Loaded..', 'status');
		setTimeout(function () {
			HitKami();
		}, 5000) ; 
		
	}
	
	function HitKami(){
		if(Drone.Running.Paused){
			return;
		}
		if(targets.length == 0){
			pausing(3,'<span class="good">Getting required info in </span>',function(){
				KamiLink();
			});
			return;
		} 
	    if(!document.evaluate('//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Rivals")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0){
			pausing(3,'<span class="good">Refreshing Rivals Page in </span>',function(){
				Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
					SetDiv(StaminaWord)
				});
			});
			return;
        }
		var isalive = $('#btn_attack_p'+targets[0].pid).parent().parent().children(0).attr('class');
		if(isalive == 'fight_list_player_dead'){
			var wait = parseInt($('#FakeRefresh').val());
			pausing(wait,'<span class="good">Rechecking Rivals Page in </span>',function(){
				Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
					SetDiv(StaminaWord)
				});
				logmsg('Player is Iced/Killed, Rechecking...','log')
			});
			return;
		}else{
			var fightlist = document.getElementsByClassName('action');
			var i;
			for(i = startFL; i < fightlist.length; i++){
				try{
					fightlist[i].firstElementChild.href = fightlist[i].firstElementChild.href.replace(/opponent_id=p%7C\d+/,'opponent_id=p%7C'+targets[0].pid);
					i_fight.targetlink = fightlist[i].firstElementChild.href;
					i_fight.targetlink = i_fight.targetlink.substr(i_fight.targetlink.indexOf('?')+1);
					break;
				}catch(pagenull){
					if(Fateler0z > 2){
						logmsg('Er0z? '+i,'log')
						logmsg('Er0z? '+fightlist.length,'log')
						clcikbutton('Er0z? '+pagenull);
						return;
					}
					startFL++;
					Fateler0z++;
					HitKami();
					return;
				}
			}
			startFL = 0;
			Fateler0z = 0;
			if (i_heal.current_health() < 30 || i_heal.current_health() < Drone.Storing.Healingat) {
				i_heal.me(HitKami);
				return;
			}
			if(parseInt(document.getElementById("user_stamina").innerHTML) < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
				check_skills(checkit);
//				clcikbutton('Stamina under 25.');
				return;
			}
			spendSkillsChkr();
			attack_person(i_fight.targetlink);
		}
	}
	
	var i_fight = {
		errors: 0,
		fighting: false,
		attacks_needed_to_ice: false,
		defenders_first_percent: false,
		attacks_to_win: 0,
		targetlink: 0,
		pid: null,
		target_list: [],
		black_list: {
			list: [],
			add: function (pid) {
				var mw_pid = fight_list.current_target
				if (pid && pid.length > 0) mw_pid = pid
					i_fight.black_list.list.push(mw_pid.id);
					logmsg('<span class="bad">Black listed ' + mw_pid.name + '</span>', 'log');
			},
			check: function (pid) {
				var mw_pid = i_fight.pid
				if (pid && pid.length > 0) mw_pid = pid
					return i_fight.black_list.list.indexOf(mw_pid) > -1
			}
		}
	}

	function fixModuleUIerror(){
		window.ModuleUI = new Object();
		window.ModuleUI = {
			dimButton: function(btn) {
				if ($('.'+btn+":visible").prop('disabled') == 'disabled') {
					return false;
				}
				$('.'+btn).prop('disabled','disabled');
				$('.'+btn).css('opacity', 0.5);
				return true;
			},
			undimButton: function(btn) {
				$('.'+btn).removeAttr('disabled');
				$('.'+btn).css('opacity', 1.0);
			},
			reloadModule: function(module, extra_data) {
			},
			nothing: function() {
			},
			redirectToInventory: function() {
			}	
		};
	}

	function substr(string, SearchStart, SearchEnd) {
		try {
			var nStartPos = 0
			var nEndPos = 0
			var nStartIndex = 0
			var bUseLastIndex = 0;
			var bIndex, aIndex = string.indexOf(SearchStart, nStartIndex);
			if (aIndex === -1) {
				return false;
			}
			if (bUseLastIndex !== true) {
				bIndex = string.indexOf(SearchEnd, aIndex + Math.max(nStartPos, 1));
			} else {
				bIndex = string.lastIndexOf(SearchEnd);
			}
			if (bIndex === -1) {
				return false;
			}
			aIndex += nStartPos;
			bIndex += nEndPos;
			return string.substr(aIndex, bIndex - aIndex);
		} catch (e) {
			return false;
		}
	}

   function iTrim(text) {
        if (typeof ($) !== 'undefined') {
            return $.trim(text);
        } else {
            return text.replace(/^\s*|\s*$/, '');
        }
    }
	
	String.prototype.trunc = function(n){
		return this.substr(0,n-1)+(this.length>n?'..':'');
	};     

	function rivalpagechk(){
		if(Drone.Running.Paused){
			return;
		}
		if(targets.length == 0){
			pausing(3,'<span class="good">Getting required info in </span>',function(){
				KamiLink();
			});
			return;
		} 
	    if(!document.evaluate('//li[contains(@class, "tab_on tab_middle")]//a[contains(., "Rivals")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0){
			pausing(3,'<span class="good">Refreshing Rivals Page in </span>',function(){
				Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
					SetDiv(StaminaWord)
				});
			});
			return;
        }
		var buttontoclick = $('#btn_attack_p'+targets[0].pid)
		if(!buttontoclick){
			KamiLink();
			return;
		}
		var isalive = $('#btn_attack_p'+targets[0].pid).parent().parent().children(0).attr('class');
		if(isalive == 'fight_list_player_dead'){
			pausing(5,'<span class="good">Rechecking Rivals Page in </span>',function(){
				Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
					SetDiv(StaminaWord)
				});
				logmsg('Player is Iced/Killed, Rechecking...','log')
			});
			return;
		}else{
			i_fight.targetlink = $('#btn_attack_p'+targets[0].pid).href;
			if (typeof(i_fight.targetlink) == 'undefined') {
				targets = [];
				rivalpagechk();
				return;
			}
			if (i_heal.current_health() < 30 || i_heal.current_health() < Drone.Storing.Healingat) {
				i_heal.me(rivalpagechk);
				return;
			}
			if(parseInt(document.getElementById("user_stamina").innerHTML) < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
				check_skills(checkit);
//				clcikbutton('Stamina under 25.');
				return;
			}
			attack_person(i_fight.targetlink);
		}
	}
	
	var fight_list = {
		target_list: [],
		updatelist: function (callback) {
			function processlist(htmlText) {
				$(htmlText).find('tr:has(td.fight_list_player_alive)').each(function (index, element) {
					var target_link = $(element).find('.action').find('a').attr('href');
					var target_level = iTrim($(element).find('.fight_list_level_alive').text())
					var target_name = iTrim($(element).find('.fight_list_name_area').find('a').text())
					if (target_name.length < 1) {
						var target_name_r = iTrim($(element).find('.fight_list_name_area').text())
						target_name = iTrim(/^(.*)$/m.exec(target_name_r)[0]);
					}
//					try{
//						var target_rtag = iTrim($(element).find('.fight_list_name_area').find('a').attr('href'))
//						var target_rtagis = /&id=(\d+)/.exec(target_rtag)[1];
//					}catch(err){}
//					logit('target_link: '+target_link+' target_level: '+target_level+' target_name: '+target_name+' Red Tag is: '+target_rtagis)
					var target_id = iTrim(uSplit(target_link).opponent_id)
					var attacker = {
						'link': target_link,
						'level': target_level,
						'name': target_name,
						'id': target_id
					}
//					logit('debug for sim: '+target_id)
					if (/bot/.test(target_id)) {
						logmsg('skipped target -> <span class="bad">' + target_name + '</span> is boss bot', 'log');
					} else if (target_id && i_fight.black_list.check(target_id) == false) {
						fight_list.target_list.push(attacker)
					} else {
						logmsg('skipped target -> ' + target_id + ' in black list', 'log');
					}
				})
				if (fight_list.target_list.length > 0) {
					logmsg('Added <span class="good">(' + fight_list.target_list.length + ')</span> live targets to list', 'log')
					if (typeof (callback) == 'function') {
						callback && callback()
						return;
					}
				} else {
					if(Drone.Running.Paused){
						return;
					}
					logmsg('fight_list.updatelist(callback); ', 'debug')
					fight_list.updatelist(callback);
				}
			}
			if (fight_list.available()) {
				logmsg('fight_list.available()', 'debug')
				callback && callback()
			} else {
				ajax_error = 0;
				request('xw_controller=fight&xw_action=view',function(response){processlist(response);})
			}
		},
		available: function () {
			return (fight_list.target_list.length > 0)
		},
		current_target: '',
		getTarget: function () {
			var rand_id = Math.floor(Math.random() * fight_list.target_list.length)
			var send_target = fight_list.target_list[rand_id]
			fight_list.target_list.splice(rand_id, 1);
			fight_list.current_target = send_target;
			return send_target
		}
	}
	
	function uSplit(url) {
		/*Splits a url from url encode string */    
        var cUrl = new Object();
        try {
            url = url.replace(/&amp;/g, '&');
            url = url.replace(/&quot;/g, '"');
            if (url.indexOf('?') !== -1) {
                url = String(url.split('?')[1]);
            }
            $.each(url.split('&'), function(p, param) {
                if ((p = param.split('=')).length === 2) {
                    cUrl[p[0]] = unescape(p[1]);
                }
            });
        } catch (err) {
            logmsg(err, 'log');
        }
        return cUrl;
	}
	
	function fightlist() {
		if(Drone.Running.Paused){
			return;
		}
		if ($('#inner_page').attr('class') != 'fight_controller'){
            pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
						SetDiv(StaminaWord)
				});
            });
			return;
		}
		if(parseInt(document.getElementById("user_stamina").innerHTML) < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			checkit()
			return;
		}
		if (i_heal.current_health() < Drone.Storing.Healingat){
			i_heal.me(fightlist);
			logmsg('need to heal then go back to fight list','log')
			return;
		}
		if (fight_list.target_list.length > 0){
			attack_FL();
		}else{
			logmsg('updating target list...','log')
			fight_list.updatelist(function(){attack_FL();})
		}
	}	
	
	function attack_FL(){
		ajax_error = 0;
		if(Drone.Running.Paused){
			return;
		}
		if(parseInt(document.getElementById("user_stamina").innerHTML) < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			checkit()
			return;
		}
		target = fight_list.getTarget();
		logmsg('Retrieved '+target.name+' from targetlist','log')
		if (document.getElementById('SpecialChars').value != '') {
			var isBlacklisted = document.getElementById('SpecialChars').value.split('\n');
			for (i = 0; i < isBlacklisted.length; i++) {
				if (target.name.indexOf(isBlacklisted[i]) != -1) {//target_id
					logmsg('<span class="bad">Skipping <font color="gold">' + target.name + '</font> because of BlackList!</span>', 'log');
					i_fight.fighting = false;
					fightlist();
					return
				}
			}
		}
		logmsg('<span class="good">Attacking</span> '+target.name+' from targetlist','status')
		i_fight.fighting = true;
		request(target.link,function(response){
			if(Drone.Running.Paused){
				return;
			}
			logmsg('Checking '+target.name,'log')
			if (/ERROR 500/.test(response)){
				logmsg('Ajax Error','debug')
				if (ajax_error > 3){
					i_fight.fighting = false;
					fightlist();
				}else{
					logmsg('retrying a ajax fix ','debug')
					setTimeout(function(){attack_FL(target.link)},Drone.Storing.FightsPerSecondSpeed)
					ajax_error++;
				}     
			}else{
				var fight_result_log = substr(response,'fight_result = ',';FightV2.attack');
				if (fight_result_log === false){
					if(badupdate > 2){
						badupdate = 0;
						logmsg('Forcing a heal to update the game..','log')
						i_heal.me(fightlist);
						return;
					}
					badupdate++;
					logmsg('bad fight results heading back to fightlist','log')
					i_fight.fighting = false;
					fightlist();
					return false;
				}
				badupdate = 0;
				var fight_result = [];
				eval("result = " + fight_result_log + ";")
				i_fight.attacks_needed_to_ice = false;
				try{
					var health_pct = fight_result.defender.current_health_pct;
					i_fight.defenders_first_percent = health_pct;
				}catch(e){return;}
				fixModuleUIerror();
				try{$('#inner_page').html('<div id="fight_module2" style="position:relative:top:1000px">'+response+'</div>')}catch(e){}
				$('#wrapper_items_won').remove();
				$(".fv2_widget_all_wrappers").hide();  
				if (health_pct != false && health_pct > 0 && parseFightResults(fight_result) == true){
					i_fight.errors = 0;
					logmsg(target.name+' is alive '+i_fight.defenders_first_percent+'% health left attacking.','log')
					logmsg('<span class="good">Attacking</span> '+target.name, 'status')
					repeat_attack()
					return;
				}else{
					i_fight.fighting = false;
					if (i_heal.current_health() < 30){
						i_heal.me(fightlist);
						logmsg('need to heal then go back to fight list','log')
						return
					}else{
						fightlist()
					}
					return;
				}
			}
		})    
	}

	function attack_person(link) {
		if(Drone.Running.Paused){
			return;
		}
		i_fight.fighting = true;
		if (i_heal.current_health() < 30 || i_heal.current_health() < Drone.Storing.Healingat) {
			i_heal.me(HitKami);
			return;
		}
		if(parseInt(document.getElementById("user_stamina").innerHTML) < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			check_skills(checkit);
			return;
		}
		request(link, function (response) {
			if (/ERROR 500/.test(response)) {
               i_fight.fighting = false;
				HitKami();
			} else {	
				var fight_result_log = substr(response, 'fight_result = ', ';FightV2.attack');
				if (fight_result_log === false) {
					i_fight.fighting = false;
					HitKami();
					return false;
				}
				var fight_result = [];
				eval("result = " + fight_result_log + ";")
				i_fight.attacks_needed_to_ice = false;
				try {
					var health_pct = fight_result.defender.current_health_pct;
					i_fight.defenders_first_percent = health_pct;
				} catch (e) {
					return;
				}
				fixModuleUIerror();
				try {
					$('#inner_page').html('<div id="fight_module2" style="position:relative:top:1000px">' + response + '</div>')
				} catch (e) {}
				spendSkillsChkr();
				$('#wrapper_items_won').remove();
				$(".fv2_widget_all_wrappers").hide();
				if (health_pct != false && health_pct > 0 && parseFightResults(fight_result) == true) {
					i_fight.errors = 0;
					logmsg(profile_link()+' is alive ' + i_fight.defenders_first_percent + '% health left attacking.', 'log');
					logmsg('Attacking ' + profile_link()+'', 'status')
					repeat_attack()
					return;
				} else {
					i_fight.fighting = false;
					if (i_heal.current_health() < 30 || i_heal.current_health() < Drone.Storing.Healingat) {
						i_heal.me(HitKami);
						return
					} else {
						HitKami();
					}
				}
				return;
			}
		});
	}

	function repeat_attack() {
		if(Drone.Running.Paused){
			return;
		}
		var target_url = $('#fightV2PowerAtkBtn').attr('href');
		target_url = target_url.replace('use_boost=1', '')

		function rapid_attack() {
			if(Drone.Running.Paused){
				return;
			}
			if(parseInt(document.getElementById("user_stamina").innerHTML) < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
				checkit()
				return;
			}
			var attack_url = target_url;
			ajax_error = 0;
			if (i_heal.current_health() > 100) {
				attack_url = target_url.replace(/click_amt=(\d+)/, 'click_amt='+Drone.Storing.bursts)
				logmsg('Using burst attack  (x'+Drone.Storing.bursts+')', 'log');
			} 
			spendSkillsChkr();
			attack_url = attack_url.substr(attack_url.indexOf('?')+1);
			setTimeout(function () {
				request(attack_url, doattack)
			}, Drone.Storing.FightsPerSecondSpeed)
		}

		function doattack(r) {
			if(Drone.Running.Paused){
				return;
			}
			ajax_error = 0;
			if (/ERROR 500/.test(r)) {
				i_fight.fighting = false;
				if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isFighting){
					fightlist();
				}else{
					HitKami();
				}
			} else {
				if (parse_attack(r) === true) {
					if (i_heal.current_health() < Drone.Storing.Healingat) {
						i_heal.me(rapid_attack)
						logmsg('pausing attack, cant attack need to heal...', 'log');
						return;
					} else {
						rapid_attack();
					}
				} else {
					i_fight.fighting = false;
					if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isFighting){
						logmsg('finished attacking target returning to fight page', 'log');
						fightlist();
					}else{
						logmsg('finished attacking target returning to rivals page', 'log');
						HitKami();
					}
					return;
				}
			}
		}
		rapid_attack()
	}

	function parse_attack(htmlResponse) {
		if(Drone.Running.Paused){
			return;
		}
		var response = htmlResponse;
		var opponent = [];
		try {
			var fight_data = JSON.parse(response.replace(/^(\s\d\s+)/, ''));
			window.user_fields_update(fight_data.user_fields);
			window.user_info_update(fight_data.user_fields, fight_data.user_info);
		} catch (err) {}
		opponent = fight_data.fight_result;
		window.FightV2.powerAttack(fight_data);
		if (fight_data.fight_result == false) {
			if (i_fight.errors > 3) {
				i_fight.errors = 0;
				return false;
			} else {
				i_fight.errors++;
				return true
			}
		}
		if (i_fight.defenders_first_percent == false) {
			i_fight.defenders_first_percent = opponent.defender.current_health_pct;
		} else {
			var pct_deal = i_fight.defenders_first_percent - opponent.defender.current_health_pct;
			i_fight.attacks_to_win = Math.abs(Math.ceil(opponent.defender.current_health_pct / (pct_deal / opponent.power_attack.won)));
		}
		var parsefight_results = parseFightResults(opponent);
		if (opponent.defender.current_health_pct > 0 && parsefight_results == false) {
			return parseFightResults(opponent)
		} else {
			if (parsefight_results == true && opponent.defender.current_health_pct > 0) {
				return true
			} else {
				return false;
			}
		}
	}
 
	function parseFightResults(results_check) {
		if (results_check.feed_js){
			var feed = substr(results_check.feed_js, 'var feed = {', 'MW.Feed');
			try {
                eval ( feed );
                var link = feed.link;
                var description = feed.description;
				description = description.replace(/ (Need to whack|Think you can|Need help icing|Test your mettle|Get a free fight boost to) [^\.]+\./g, "");
                logmsg(description, 'icekill');
            }catch(err) {
               logmsg(err,'debug')
            }
		}
		try{  
			if (results_check.power_attack.won < 1 ) {
				if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isFighting){
					i_fight.black_list.add();
					return false;
				}else{
					return true;
				}
			} 
		}catch(e) {
			logmsg('e'+e,'debug')
		}  
		if (results_check.you_just_iced) {
			/*if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isFighting){
				logmsg('Iced ' + target.name, 'log');
			}else{
				logmsg('Iced ' + profile_link(), 'log');
			} */
			Drone.updateStats(1, 'icedsome');
			return false;
		} else if (results_check.you_just_killed) {
			/*if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isFighting){
				logmsg('Iced ' + target.name, 'log');
			}else{
				logmsg('Iced ' + profile_link(), 'log');
			}*/
			Drone.updateStats(1, 'killedsome');
			return false;
		} else if (results_check.ice_was_just_stolen) {
			return false;
		} else if (results_check.isWin) {
			return true;
		} else if(results_check.isWin == false){
			if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isFighting){
				return false;
			}else{
				return true;
			}
		}else {
			return false;
		}
	}

var i_heal = {
    current_health: function () {
        if (User) {
            return (parseInt(User.health));
        } else {
            return (parseInt($('#user_health').text()));
        }
    },
    max_health: function () {
        return (parseInt($('#user_max_health').text()));
    },
    need_to_heal: function () {
        if (i_heal.current_health() < i_heal.max_health()) {
            return true;
        } else {
            return false;
        }
    },
    running: false,
    me: function (callback) {
		if (i_heal.running == true) return false;
			function checkHealer(html) {
            try {
                var heal_timer = parseInt(/waitHealTimer:\s*(-?\d+),/i.exec(html)[1]);
            } catch (e) {
                heal_timer = 1
            }
            if (heal_timer > 1) {
                var time_to_wait = heal_timer + 1;
				pausing(time_to_wait,'<span class="good">Healing in  </span>',function(){
					i_heal.iHeal(callback);
				});
            } else {
                i_heal.iHeal(callback)
            }
        }
        if (i_heal.current_health() < Math.ceil(i_heal.max_health() / 2 + 20)) {
            i_heal.running = true;
            i_heal.AjaxIt('xw_controller=hospital&xw_action=view', checkHealer);
        } else {
            i_heal.running = false;
            if (typeof (callback) == 'function') callback && callback()
        }
    },
    iHeal: function (callback) {
		if(Drone.Running.Paused){
						return;	
		}
		CurrAttMSG = $('#DroneXStatus').text();
		logmsg('<span class="good">Healing...</span>', 'status');
        i_heal.AjaxIt('xw_controller=hospital&xw_action=heal', function (htmlresponse) {
            try {
                i_heal.running = false;
                var response = iTrim(htmlresponse);
                var user_update = JSON.parse(response);
                var hospital_success = JSON.parse(response).hospital_success;
                var hospital_message = JSON.parse(response).hospital_message;
                var waitHealTimer = JSON.parse(response).waitHealTimer;
                var current_health = parseInt(JSON.parse(response).current_health);
                user_fields_update(user_update.user_fields);
                user_info_update(user_update.user_fields, user_update.user_info);
            } catch (e) {}
            if (/The doctor healed/.test(hospital_message)) {
				logmsg(hospital_message, 'log');
				logmsg(CurrAttMSG, 'status');
            } else {
                if (waitHealTimer > 1 && current_health > i_heal.max_health()) {
                  	logmsg('Heal timer is @ ' + waitHealTimer + ' seconds before heal (shouldnt have landed here)', 'log');
					pausing(time_to_wait,'<span class="good">Healing in  </span>',function(){
						 i_heal.iHeal(callback);
					});
                    return false;
                }
            }
            if (typeof (callback) == 'function') callback && callback()
        });


    },
    AjaxIt: function (url, callback) {
        ajax_error = 0;
        User.clicks++;
        var prams = {
            'ajax': 1,
            'sf_xw_user_id': User.id,
            'sf_xw_sig': local_xw_sig,
            'liteload': 1,
            'cb': User.id + parseInt(new Date().getTime().toString().substring(0, 10)),
            'xw_client_id': 8,
            'xw_city': 1,
            'xcity': 1,
            'xw_person': User.id.substr(2),
            'clicks': User.clicks
        };

        function process_ajax() {
            $.ajax({
                type: "POST",
                url: '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?' + url,
                data: prams,
                success: function (htmlresponse) {
					if(Drone.Running.Paused){
						return;	
					}
                    var response = iTrim(htmlresponse);
                    try { 
                        var user_update = JSON.parse(response);
                        user_fields_update(user_update.user_fields);
                        user_info_update(user_update.user_fields, user_update.user_info);
                    } catch (e) {}
                    callback(htmlresponse)
                },
                error: function (opponent) {
                    if (ajax_error > 3) {
                        if (typeof (callback) == 'function') callback && callback()
                        return false;
                    } else {
                        ajax_error++;
						setTimeout(function () {
                            process_ajax();
                        }, 350)
                    }
                }
            });
        }
        process_ajax()
    }
}

	
	function checkit(){
		if(Drone.Running.Paused){
			return;
		}
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
		if(DoesIHaveEnergy < DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost && DoesIHaveStamina < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			check_skills(checkit);
			return;
		}
		if(Drone.Storing.SpendingThis == 'jnrg' && DoesIHaveEnergy < DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			if(Drone.Storing.LevelupHelper){
				if(DoesIHaveEnergy >= DroneXBUJobMap[Drone.Storing.BUEnergyInfo].cost){
					logit('Going to Energy Backup');
					BUEEC = DoesIHaveEnergy;
					pausing(3,'<span class="good">Traveling to Backup Energy Location in </span>',function(){
						Dotravel(DroneXBUJobMap[Drone.Storing.BUEnergyInfo].city, 'job', DroneXBUJobMap[Drone.Storing.BUEnergyInfo].tab, function(){
							SetDiv('BUnrg')
						});
					});
					return;	
				}
			}else if(Drone.Storing.Restart) { //Restart on?
				var wait = parseInt($('#FakeRestarttime').val()*60);
				pausing(wait,'<span class="bad">Spent all Energy, Restarting in </span>', function(){
					check_skills(checkit);
				});
			}else{
				//timestamp the finish. TODO
				clcikbutton('Spent all Energy Stopped');
			}
			return;
		}
		if(Drone.Storing.SpendingThis == 'jstam' && DoesIHaveStamina < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			if(Drone.Storing.Restart) { //Restart on?
				var wait = parseInt($('#FakeRestarttime').val()*60);
				pausing(wait,'<span class="bad">Spent all Stamina, Restarting in </span>', function(){
					check_skills(checkit);
				});
			}else{
				//timestamp the finish. TODO
				clcikbutton('Spent all Stamina Stopped');
			}
			return;
		}
		if(['jnrg','energy','toe2toe'].indexOf(Drone.Storing.SpendingThis) !== -1 && DoesIHaveEnergy >= DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){ 
			logmsg('Energy Locked in!', 'log');
		//	logmsg('Energy Locked in ckit1', 'log');
                        pausing(3,'<span class="good">Traveling in </span>',function(){
                            Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
                                SetDiv('nrg')
                            });
                        });
			return;
		} //DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city
		if(['stamina','toe2toe','jstam'].indexOf(Drone.Storing.SpendingThis) !== -1 && DoesIHaveStamina >= DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){ 
			logmsg('Stamina Locked in!', 'log');
                        pausing(3,'<span class="good">Traveling in </span>',function(){
                            Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
                                SetDiv(StaminaWord)
                            });
                        });
			return;
		}
		if(DoesIHaveEnergy < DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			logmsg('Stamina Locked in!', 'log');
                pausing(3,'<span class="good">Traveling in </span>',function(){
					Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
						SetDiv(StaminaWord)
                    });
                });
		}else{
			logmsg('Energy Locked in!', 'log');
			//logmsg('Energy Locked in ck2', 'log');
				pausing(3,'<span class="good">Traveling in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
                    });
                });
		}
	}

	function SetDiv(type){
		if(Drone.Running.Paused){
			return;
		}
		RobOutta = false;
		arena_running = false;
		BanditPassIs = false;
		BUBT = 6;
		document.getElementById("SBTD").style.display = 'none';
		$('#gxRDivS').hide();
		if(type == 'BUnrg'){
			BUECURR = true;
			document.getElementById('ActiRes').innerHTML = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">' +DroneXBUJobMap[Drone.Storing.BUEnergyInfo].name;
			document.getElementById("IRJ").style.display = '';
			document.getElementById("IRFOB").style.display = 'none';
			document.getElementById("IRA").style.display = 'none';
			document.getElementById("IKL").style.display = 'none';
			document.getElementById("IRR").style.display = 'none';	
			ENCURR = true;
			setTimeout(BUPreJob, 500);
			return;
		}
		BUECURR = false;
		BUSCURR = false;
		if(type == 'nrg'){
			document.getElementById('ActiRes').innerHTML = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">' +DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].name;
			document.getElementById("IRJ").style.display = '';
			document.getElementById("IRFOB").style.display = 'none';
			document.getElementById("IRA").style.display = 'none';
			document.getElementById("IKL").style.display = 'none';
			document.getElementById("IRR").style.display = 'none';			
			ENCURR = true;
			setTimeout(PreJob, 500);
			return;
		}
		document.getElementById('ActiRes').innerHTML = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_stamina_16x16.png">' +DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].name;
		if(type == 'fight'){
			ENCURR = false;
			document.getElementById("IRJ").style.display = 'none';
			document.getElementById("IRFOB").style.display = 'none';
			document.getElementById("IRA").style.display = 'none';
			document.getElementById("IKL").style.display = '';
			document.getElementById("IRR").style.display = 'none';
			setTimeout(HitKami, 500);
			return;
		}
		if(type == 'rob'){
			ENCURR = false;
			document.getElementById('RobCiti').innerHTML = robCiti;
			document.getElementById("IRJ").style.display = 'none';
			document.getElementById("IRFOB").style.display = 'none';
			document.getElementById("IRA").style.display = 'none';
			document.getElementById("IKL").style.display = 'none';
			document.getElementById("IRR").style.display = '';
//			logmsg('Div is setup for stamina', 'log');
			setTimeout(PreRob, 500);
			//PreJob();
			return;
		}
		if(type == 'fightlist'){
			ENCURR = false;
			document.getElementById("IRJ").style.display = 'none';
			document.getElementById("IRFOB").style.display = 'none';
			document.getElementById("IRA").style.display = 'none';
			document.getElementById("IKL").style.display = '';
			document.getElementById("IRR").style.display = 'none';
			setTimeout(fightlist, 500);
			return;
		}
		if(type == 'spart'){
			ENCURR = false;
			$('#gxRDivS').show();
			document.getElementById("IRJ").style.display = 'none';
			document.getElementById("IRFOB").style.display = 'none';
			document.getElementById("IRA").style.display = '';
			document.getElementById("IKL").style.display = 'none';
			document.getElementById("IRR").style.display = 'none';
			setTimeout(startarena, 500);
			return;
		}
		if(type == 'fob'){
			ENCURR = false;
			document.getElementById("IRJ").style.display = 'none';			
			document.getElementById("IRFOB").style.display = '';
			document.getElementById("IKL").style.display = 'none';
			document.getElementById("IRR").style.display = 'none';
			setTimeout(startFobbing, 500);
			return;
		}
	}
	
	function PreRob(){
		if(Drone.Running.Paused){
			return;
		}
		var DoesIHaveStam = parseInt(document.getElementById('user_stamina').innerHTML);
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		if(Drone.Storing.SpendingThis == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			check_skills(checkit);
			return;
		}
		if (DoesIHaveStam < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost) {
			check_skills(checkit);
			return;
		}
		spendSkillsChkr();
		if(Drone.Storing.Robsquads){
			if(onfirstrobpageload){
				RobSpreesLeft = $('#call_sprees_left').text();
				onfirstrobpageload = false;
			}
			if(RobSpreesLeft <= 0){
				logmsg('<span class="bad">No more Sprees Left!, Turning them off!</span>', 'log');
				RobSquadsOnOff(0);
				PreRob();
				return;
			}
			var StamForBoard = parseInt($('#oneClickRobAll').text().substring(9));
			if(StamForBoard > DoesIHaveStam){
				var tmpstam = DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost
				DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = StamForBoard;
				setTimeout(function () {
					DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = tmpstam;
				}, 15000)
				logmsg('<span class="bad">Not enough stamina to use a robsquad!</span>', 'log');
				check_skills(checkit);
				return;		
			}
			logmsg('<font color="gold">Robbing Board Using Robsquads!</font>', 'status');
			logmsg('Robbing Slots!', 'log');
			RobRequest('remote/html_server.php?xw_controller=robbing&xw_action=rob_all&xw_city='+Drone.Storing.RobCity, function(msg){chkRobSquad(msg);});
			RobSpreesLeft--;
			return;
		}
		logmsg('<font color="gold">Robbing Board!</font>', 'status');
		logmsg('Robbing Slots!', 'log');
		var slotcount = 8;
		for (var i=8; i >=0; i--) {
			RobRequest('remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city='+Drone.Storing.RobCity+'&slot='+slotcount, function(msg){chkRob(msg);});
			slotcount--;
		}
	}
	
	function chkRobSquad(msg){
		if(Drone.Running.Paused){
			return;
		}
		if(msg.indexOf('You are now LEVEL')!=-1) {
			logmsg('<span class="good">Levelup!</span>', 'log');
			grab_bonus();
		}
		spendSkillsChkr();
		if(/You did not have a 1/.test(msg)){
			RobSpreesLeft = 0;
			logmsg('<span class="bad">You did not have a 1-Click Robbery boost to use!</span>', 'log')
			RobSquadsOnOff(0);
			PreRob();
			return;
		}
		if(/You do not have enough stamina to rob/.test(msg)){
			check_skills(checkit);
			return;
		}
		refb();
	}
	
	function chkRob(msg){
		if(Drone.Running.Paused){
			return;
		}
		if(msg.indexOf('You are now LEVEL')!=-1) {
			logmsg('<span class="good">Levelup!</span>', 'log');
			grab_bonus();
		}
		spendSkillsChkr();
		if(/You do not have enough stamina to rob/.test(msg)){
			if(RobOutta){
				logit('Blocker is in place!');
				return;
			}
			RobOutta = true;
			check_skills(checkit);
			return;
		}
		slotsrobbed++;
		if((/ROBBERY SUCCESS!/.test(msg))){
//			logerr('Robbing Success');
		}
		if((/FAILED/.test(msg))){
//			logerr('Robbing Failed');
		}
		if(slotsrobbed == 9){
			refb();
		}
	}
		
	function refb(){
		if(Drone.Running.Paused){
			return;
		}
		Drone.updateStats(1, 'Bcleared');
		slotsrobbed = 0;
		RobRequest('remote/html_server.php?xw_controller=robbing&xw_action=refresh', function(msg){
			if(msg.indexOf('You are now LEVEL')!=-1) {
				logmsg('<span class="good">Levelup!</span>', 'log');
				grab_bonus();
			}
		PreRob();
		});
	}
	
	function RobRequest(url, handler, errorhandler) {
		if(Drone.Running.Paused){
			return;
		}
		ajax_error = 0;
		if(url.indexOf('html_server.php') >= 0){
			url = url.substr(url.indexOf('?')+1);
		}
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: function(e){
				if (/ERROR 500/.test(e)) {
                    if (ajax_error < 5) {
						setTimeout(function () {
							RobRequest(url,handler);
						}, 333)
						ajax_error++
					}
				}else{
				    var response = iTrim(e);
                    try { 
                        var user_update = JSON.parse(response);
                        user_fields_update(user_update.user_fields);
                        user_info_update(user_update.user_fields, user_update.user_info);
                    } catch (err) {}
					handler(e)
                }
			},
			error: function (e) {
                if (ajax_error > 2) {
					if (/OK/.test(e)) {
					}
                } else {
					setTimeout(function () {
						RobRequest(url,handler);
                    }, 333)
                    ajax_error++
                }
			}
		});
	}

	function check_skills(handler) {
		if(Drone.Running.Paused){
			return;
		}
		logmsg('Checking Energy & Stamina', 'log');
		CloseDoopidPopup();
		request('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&city=7&xw_client_id=8',function(msg){
			if(msg.indexOf('ERROR 500: response never closed')!=-1){
				pausing(3,'<span class="bad">Zynga Error, retry in </span>',function(){
					check_skills(handler);
				});
				return;
			}
			try {
				var data = JSON.parse(msg);
				document.getElementById('user_energy').innerHTML = data.user_fields.user_energy;
				document.getElementById('user_stamina').innerHTML = data.user_fields.user_stamina;
			} catch(e) {
				pausing(5,'<span class="bad">Error parsing JSON, retry in </span>',function(){
					check_skills(handler);
				});
				return;
			}
			var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
			var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
			logmsg('You have <img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif"> '+DoesIHaveEnergy+' <img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_stamina_16x16.png"> '+DoesIHaveStamina, 'log');
			var can_restart = true;
			if(DoesIHaveEnergy > DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost||DoesIHaveStamina > DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
				can_restart = true;
			} else {
				arena_running = false;
				can_restart = false;
			}
			if (can_restart) {
				handler();
			} else {
				if(DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isArena && DoesIHaveStamina < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost && ArenaGrabStamIsFirst){
					ArenaGrabStamIsFirst = false;
					logmsg('Checking for lost Stamina from Arena.', 'log');
					request('remote/html_server.php?xw_controller=index&xw_action=view',function(hpmsg){
						try {
							var data = iTrim(hpmsg);
							var aastamina = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(data)[1];
							document.getElementById('user_stamina').innerHTML = aastamina;
							check_skills(checkit);
							return;
//							logit('is: '+aastamina)
						} catch(e) {
							logit(e)
							pausing(5,'<span class="bad">Error parsing JSON, retry in </span>',function(){
								check_skills(checkit);
							});
							return;
						}
					});
					return;
				}
				if(Drone.Storing.LevelupHelper){
					if(['jnrg','energy','toe2toe','stamina'].indexOf(Drone.Storing.SpendingThis) !== -1 && DoesIHaveEnergy >= DroneXBUJobMap[Drone.Storing.BUEnergyInfo].cost){
						BUEEC = DoesIHaveEnergy;
						pausing(3,'<span class="good">Traveling to Backup Energy Location in </span>',function(){
							Dotravel(DroneXBUJobMap[Drone.Storing.BUEnergyInfo].city, 'job', DroneXBUJobMap[Drone.Storing.BUEnergyInfo].tab, function(){
								SetDiv('BUnrg')
							});
						});
						return;	
					}else{
						logmsg('Not enough resources to use Backup Options', 'log');
					}
				}
				if(Drone.Storing.Restart) { //Restart on?
					var wait = parseInt($('#FakeRestarttime').val()*60);
					pausing(wait,'<span class="bad">Restarting in </span>',saveit);
				}else{
					//timestamp the finish. TODO
					clcikbutton('Not enough energy/stamina');
				}
			}
		});
	}

	function Dotravel(destination, from, tab, callback) {
		if(Drone.Running.Paused){
			return;
		}
		CloseDoopidPopup();
	    var userid = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
		var fromCity = CurrentCity();
        var url = 'html_server.php?xw_controller=travel&xw_action=travel';
        var data = {
				'ajax': 1,
                'liteload': 1,
                'sf_xw_user_id': userid,
                'sf_xw_sig': local_xw_sig,  
                'cb': (userid + parseInt(new Date().getTime().toString().substring(0, 10))),
                'xw_client_id': 8,
                'destination': destination || 1,
                'from': from || 'job',
                'tab': tab || 1,
                'zone': 1
            };
			
			if(tab == 'robbing'){
				delete data.tab;	
			}
			if(tab == 'SpartHome'){
				if (typeof callback == 'function'){
					callback && callback();
				}
				return;
			}
			
/*			if(from == 'stats'){
				data.user = 123456789;
				delete data.tab;
			}
			if(from == 'fight'){
				url = 'html_server.php?xw_controller=fight&xw_action=view';
				delete data.from;
				delete data.destination;
			} */
			//remote/html_server.php?xw_controller=fight&xw_action=view&tab=0'
        $.ajax({
			url:url,
			data:data,
            success: function (htmlText) {
				if(Drone.Running.Paused){
					return;
				}
                var $htmlText = $(htmlText);
                $('#inner_page').empty();
                $('#inner_page').html(htmlText);
				User.page = setCurrentCity(htmlText);
                if (fromCity != (CurrentCity($htmlText))) {
					if (typeof callback == 'function'){
						callback && callback();
					}
				}
			},
			error: function (){
				pausing(5,'<span class="bad">Error traveling, retry in </span>',function(){
					Dotravel(destination, from, tab, function(){
						callback();
					});
				});
			}
        });
        function CurrentCity(html) {
            var CityData = html || document.body.innerHTML;
            var CurrentCityr;

            if (/current_city_id'.\s*=\s*parseInt."(\d)".;/i.test(CityData)) {
                CurrentCityr = /current_city_id'.\s*=\s*parseInt."(\d)".;/i.exec(CityData)[1];
            } else {
                CurrentCityr = String($(CityData).find('#mw_city_wrapper').attr('class')).substring(7);
            }
            return (CurrentCityr)
        }
    }
	
	function setCurrentCity(shtml) {
		// get User object, error free, undefined if not found.
		var usr = User&&User.page ? User : (unsafeWindow||window||{}).User;
		if (!(usr && usr.page)){
			// in case no User object, some weird thing happens, abort.
			if(DebugIt){logit('Fatal error: No user object found.');}
		} else {
			// only if response is a valid string
			if (typeof shtml === 'string') {
				// match only in full page loads.
				var page_rex = /Page:\s*([a-zA-Z]*)_controller/i;
				// test if the page is a full page load
				if (page_rex .test(shtml)) {
					// assign page name to User.page game var.
					usr.page = page_rex.exec(shtml)[1];
					// assign page name to game inner div.
					$('#inner_page').attr('class', usr.page + '_controller');
				}
			}
		// end else
		}
		// return current page, if assign fails, return the old one.
		return usr.page;
	}

	function request(url, handler, errorhandler) {
		if(Drone.Running.Paused){
			return;
		}
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if(url.indexOf('html_server.php') >= 0){
			url = url.substr(url.indexOf('?')+1);
		}
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	} 

	function loadInventory(callback) {
		logmsg('Attempting Inventory Load...', 'status');
		User.clicks++;
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+'xw_controller=inventory&xw_action=view&from_controller=inventory',
			data: params,
			cache: false,
			success: function(response){
				var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
				worstitems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
				for (x in ZyngaItems) {
					ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
					itemdatabase[ZyngaItems[x].id] = ZyngaItems[x];
				}
				logmsg('<span class="good">Inventory load complete.</span>', 'log');
				if (typeof callback == 'function'){
					callback && callback();
				}
			},
			error: function(){
				logmsg('<span class="bad">Inventory Load failed!</span>', 'log');
				if (typeof callback == 'function'){
					callback && callback();
				}			
			}
		});
	}
/*Start Msg System*/
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0)? delay = 1000 : delay = 100;
		if (typeof message == 'function') {
			resume_func = message;
			message = null;
		}
		if (message) {
			message = message;
		}
		else {
			message='Pausing';
		}
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {
			logmsg(message+' <span id="minutes">'+minutes+' minute'+(minutes==1?'':'s')+'</span> <span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...', 'status');
		}
		else {
			logmsg(message+' <span id="minutes"></span><span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...', 'status');
		}
		DroneXtimer = setInterval(function(){
			if (seconds%60 == 0) {
				minutes--;
			}
			seconds--;
			if (document.getElementById('minutes')) {
				document.getElementById('minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if (document.getElementById('seconds')) {
				document.getElementById('seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}
			else {
				clearInterval(DroneXtimer);
			}
			if (seconds <= 0) {
				clearInterval(DroneXtimer);
				if (typeof resume_func == 'function') {
					resume_func();
				}
			}
		},delay);
	}

	function logmsg(msg, log) {
		if(Drone.Running.Paused){
			return;
		}
		RatioChecker();
		/*if (Drone.userStats.master > 0 || Drone.userStats.wheel > 0 || Drone.userStats.bag > 0) {
			var jobsdonecurrent = (parseInt($('#JobsDone').text())+parseInt($('#FobsDone').text()));
			var masterratio = ' <span class="more_in">('+parseFloat(Drone.userStats.master/jobsdonecurrent*100).toFixed(0)+'%)</span>&nbsp;';
			var wheelratio = ' <span class="more_in">('+parseFloat(Drone.userStats.wheel/jobsdonecurrent*100).toFixed(0)+'%)</span>&nbsp;';
			var bagratio = ' <span class="more_in">('+parseFloat(Drone.userStats.bag/jobsdonecurrent*100).toFixed(0)+'%)</span>&nbsp;';
			document.getElementById('topmafia_stats').innerHTML = (Drone.userStats.master>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">x'+Drone.userStats.master+masterratio:'')+(Drone.userStats.wheel>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">x'+Drone.userStats.wheel+wheelratio:'')+(Drone.userStats.bag>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_cash_16x16_01.gif">x'+Drone.userStats.bag+bagratio:'');
		}*/
		if(log == 'status'){
			$('#DroneXStatus').html(msg);
			return;
		}
		if(log == 'icekill'){
			IceKillLog.unshift(timestamp()+msg);
			var LogEntry = IceKillLog.length;
			var limit = parseInt($('#IKlog_size').val());
			IceKillLog.length = (LogEntry < limit) ? LogEntry: limit;
			document.getElementById('iskl').innerHTML = '';
			var LogCount = '';
			for (LogEntry = 0; LogEntry < IceKillLog.length; LogEntry++) {
				LogCount += IceKillLog[LogEntry] + '<br>'
			}
			$('#iskl').html(LogCount);
			return;
		}
		if(DebugIt){
			logit(msg);
			log = 'debug';
		}
		if(log == 'log'){
			DroneLog.unshift(timestamp(AddSec)+msg);
			var LogEntry = DroneLog.length;
			var limit = parseInt($('#log_size').val());
			DroneLog.length = (LogEntry < limit) ? LogEntry: limit;
			document.getElementById('Testlog').innerHTML = '';
			var LogCount = '';
			for (LogEntry = 0; LogEntry < DroneLog.length; LogEntry++) {
				LogCount += DroneLog[LogEntry] + '<br>'
			}
			$('#Testlog').html(LogCount);
		}
		if(log == 'debug'){
			DebugLog.unshift(timestamp('true')+msg);
			var LogEntry = DebugLog.length;
			var limit = parseInt($('#log_size').val());
			DebugLog.length = (LogEntry < limit) ? LogEntry: limit;
			document.getElementById('Testlog').innerHTML = '';
			var LogCount = '';
			for (LogEntry = 0; LogEntry < DebugLog.length; LogEntry++) {
				LogCount += DebugLog[LogEntry] + '<br>'
			}
			$('#Testlog').html(LogCount);
		}
	}

	function timestamp(sec) {
		var now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		if(sec =='true') {
			return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
		} else {
			return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
		}
	}
	
	function logit(msg) {
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	
/*End Msg System*/
/*Start Arena Coding*/
	var powerups = {
		1:{name:"Stamina Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_staminarefill_01.png"},
		2:{name:"Arena Health Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_arenahealthrefill_01.png"},
		3:{name:"Meta Flair",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_quartflair_01.png"},
		4:{name:"Pain Killer",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_painkiller_01.png"},
		5:{name:"Kamikaze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_suckerpunch_01.png"},
		6:{name:"Drained",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_drained_02.png"},
		7:{name:"Reflector",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_reflector_01.png"}
		//8:{name:"Freeze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_freeze_01.png"}
		//9:{name:"Dual Strike",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_dualstrike_01.png"}
		
	};

	var difficulty = [
		'Easy',
		'Normal',
		'Hard'
	];

	var r_difficulty = {
		'Easy':0,
		'Normal':1,
		'Hard':2
	};
	
	function startarena(){
		set_progress_bar(0,0,'');	
		logmsg('<span class="bad">Not started yet!</span>', 'status');
		if(!arena_running) {
			arena_running = true;
			//check_skills(join_arena);
			join_arena();
		}
	}
	
	function set_progress_bar(value,of,text){
		var pc=100-parseInt(value/of*100);
		if(pc<0) { pc=0; }
		if(pc>100) { pc=100; }
		
		if($('#spartacusbar').length>0) {
			$('#spartacusbar > div').css('width',pc+'%');
			$('#spartacusbar p').text(text);

			if(pc>=88) {
				$('#spartacusbar').removeClass('gold').addClass('ruby');
			} else {
				$('#spartacusbar').removeClass('ruby').addClass('gold');
			}
		} else {
			$('#arena_timeleftbar').html(''+
				'<div class="bossInfo">'+
				'<div style="position:relative; height:25px; ">'+
				'<div id="spartacusbar" class="progressBar gold dark_border" style="width:588px; float:left;">'+
				'<div style="width: '+pc+'%;"></div><p style="text-align:center;">'+text+'</p>'+
				'<div style="width: '+pc+'%;"><p style="text-align:center;color:#FFFFFF;">'+text+'</p></div></div>'+
				'</div>'+
				'<div class="progBackground" style="display: none;"></div>'+
				'<div class="clearfix" style="clear:both;"></div></div>');
		}
	}
	
	function join_arena() {
		//check if Spartacus is still running
		if ($('#gxRDivS').length == 0) {
			arena_running = false;
			return;
		}
		if(Drone.Running.Paused){
			return;
		}
		/* initialize vars */
		cmdqueue=[];
		meid=null;
		poweratt = undefined;
		poweruplist = {};
		playerinfo={};
		playerids={};
		stam_on_start = -1;
		powerup_status = {};
		powerup_command = { count:{},active:-1,target:undefined };
		protect = {};
		$('span[id*="arena_rank"]').html('');
		$('span[id*="arena_pu"]').html('');
		$('span[id*="arena_name"]').html('');
		$('span[id*="arena_respect"]').html('');
		$('span[id*="arena_diff"]').html('');
		$('span[id*="arena_health"]').html('');
		$('span[id*="arena_score"]').html('');
		$('span[id*="arena_usepu"]').html('');
		/* join */
		ArenaNFO = false;
		logmsg('Joining arena...', 'log');
		var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
		if(DoesIHaveStamina == 0){
			DoesIHaveStamina = parseInt($('#arena_me_st').text());
		}
		var type = ArenaReq;
		if(Drone.Storing.arenaSAO && DoesIHaveStamina <= Drone.Storing.arenaSAV) {
			logmsg('Switched arenas to 100 stamina ones...', 'log');
			type = "lw";
		}
		replenish=(type=="sw"?2:(type=="lw"?10:50));
		$('#arena_replenish').text(replenish);
		request('xw_controller=Lobby&xw_action=join_arena&arenaType='+type+'&xw_client_id=8',function(msg){
			//console.log(msg);
			var json = JSON.parse(msg);
			if(json.data.success == 1) {
				arena_running = true;
				if(json.data.message=="User is in another arena") {
					logmsg('<span class="good">Successfully re-joined Arena.</span>', 'log');
				} else {
					logmsg('<span class="good">Successfully joined Arena...</span>', 'log');
				}
				Drone.updateStats(1, 'ArenasJoined');
				$('#user_stamina').text('0');
				load_arena();
			}
			else {
				if (json.data.message.indexOf('Refresh to claim your rewards from the previous Arena')!=-1) {
					logmsg('Claiming your rewards from the previous Arena', 'log');
					get_rewards();
				}
				else if(json.data.message.indexOf('have enough stamina to join this arena')!=-1) {
					logmsg('Not enough Stamina.', 'log');
					arena_running = false;
					check_skills(checkit);
					return;
				}
				else if(json.data.message.indexOf('Unable to join')!=-1) {
					var wait = Math.floor(Math.round((Math.random() * 8))+2);
					logmsg('<span class="bad">Unable to join this Arena. Join another one. Trying again in '+wait+'s...</span>', 'log');
					setTimeout(join_arena,wait*1000);
				}
				else {
					logmsg('<span class="bad">Could not join,</span> msg='+json.data.message, 'log');
					arena_running = false;
					check_skills(checkit);
					return;
				}
			}

		},function(){
			logmsg('<span class="bad">Error on trying to join</span>', 'log');
			arena_running = false;
			check_skills(checkit);
			return;
			// script ends here
		});
	}

	function load_arena(){
		request('xw_controller=Lobby&xw_action=loadArena&xw_client_id=8&exit=t',function(msg){
			var m;
			if(m = /viewObj.init\(\"([^\"]*)\",/.exec(msg)) {
				var wslink = m[1];
				connect_arena(wslink);
			}
			if (m = /MW.lobbyViewObj.getSendMsg\(\'([\d\,]+)\', \'([^\']*)\'/.exec(msg)) {
				if(socke_lobby && m[1]) {
					socke_lobby.send('{"Id":'+User.id.substr(2)+',"Cmd":"sendMsg","Args":["'+m[1]+'"],"Extra":["'+m[2]+'"]}');
				}
			}
		},function(){
			logmsg('<span class="bad">Error on trying to load</span>', 'log');
			load_arena();
		});
	}

	function connect_arena(sockenurl) {
		socke=new WebSocket(sockenurl);
		socke.onopen=function(){
			logmsg('<span class="good">Connected to Arena.</span>', 'log');
			conn_checker = setInterval(check_connection,100);
		};
		socke.onmessage=function(msg){


//			log('Received:'+msg.data);
			var json=JSON.parse(msg.data);
			try {
				if((json.mi.ammo==-1) && (json.ac)) {
					if(json.ac.substr(0,1)=="2") {
						if(json.ac.substr(2,1)=="1") {
							logmsg('<span class="good">Successfully escaped! Brave Sir Robin ran <a href=\"http://www.youtube.com/watch?v=BZwuTo7zKM8&feature=player_detailpage#t=59s\" target=\"_blank\">away away!</a></span>', 'log');
							// give me my stamina back!
							request('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8',function(){
								logmsg('<span class="good">Stamina retrieved</span>', 'log');
							});
						} else {
							logmsg('<span class="bad">Could not leave, too late. You are trapped in here, good luck.</span>', 'log');
						}
					}
				}
			} catch(all) {console.log(all);}
			
			update_info(json);
			decide_actions();
			send_queue();


		};
		socke.onclose=function(){
			last_update=0;
			clearInterval(conn_checker);
			$('#arena_connstatus').html('-');
			set_progress_bar(0,0,'');
			
			if(currdata && (currdata.s==2)) {
				console.log(currdata);
				try {
					if((currdata.s<1) && (currdata.mi.ammo==-1)){
						arena_running = false;
						return;
					}
				} catch(all) {console.log(all);}
			
				reconnect_retry++;
				if(reconnect_retry>3) {
					logmsg('Probably lost connection, not retrying again.', 'log');
				} else {
					logmsg('Probably lost connection, reconnecting', 'log');
					join_arena();
				}
			} else if (currdata.s==4) {
				logmsg('Closed connection, challenge decline or expired.', 'log');
				// give me my stamina back!
				request('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8',function(){
					logmsg('<span class="good">Stamina retrieved</span>', 'log');
				});	
			}
			else
			{
				reconnect_retry = 0;
				get_rewards();
			}
		};
	}


	function check_connection(){
		if(!arena_running) {
			clearInterval(conn_checker);
		}
		
		if(last_update>0){
			var res,gap=(new Date()).getTime()-last_update;
			if(gap<600) {
				res='<span class="good">Good!</span>';
			} else if(gap<1200) {
				res='<span style="color:orange;font-weight:600;">Slow...</span>';
			} else {
				res='<span class="bad">Stalled!</span>';
			}
			$('#arena_connstatus').html(res);
		}
	}
	
	function get_rewards(handler) {
		request('xw_controller=Arena&xw_action=rewards&xw_client_id=8',function(msg){
			parse_loot(msg);
			arena_running = false;
			setTimeout(function(){ getStats(displayMafiaStats); },2000);			
		});
	}
	
	function delayArenaChk(){
		var DoesIHaveStamina = parseInt($('#arena_me_st').text());
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		if(Drone.Storing.SpendingThis == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			check_skills(checkit);
			return;
		}else if(Drone.Storing.SpendingThis == 'jnrg'){
			check_skills(checkit);
			return;
		}else if(DoesIHaveStamina < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			check_skills(checkit);
		}else{
			join_arena();
		}
	}
			
	
	function am_i_leading_by(points) {
		var i,best_player_points=0;
		for(i in currdata.pi) {
			if(i!=meid) {
				if(currdata.pi[i].sc>best_player_points) { best_player_points=currdata.pi[i].sc;}
			}
		}
		var my_score=currdata.pi[meid].sc;
		return my_score-points>best_player_points;
	}

	// sorry, too lazy to make a generic function. If you steal this code, feel free to improve it.
	function am_i_targeting(points,targetrank) {
		var scores=[];
	
		for(i in currdata.pi) {
			if(i!=meid) {
				scores.push(currdata.pi[i].sc);
			}
		}
		
		scores.sort(function(a,b){return b-a;});
		
		var my_score=currdata.pi[meid].sc;
		
		return my_score-points>scores[targetrank-1];
	}
			
	function decide_allowed_to_attack(){
		try {
			var stopon = $('#arena_stopon').val();
			var stoponval = parseInt($('#arena_stoponvalue').val());
			var stamused = stam_on_start-currdata.mi.st;

			if(currdata.pi[meid].ph==0) { return false; } // me dead
			if(currdata.mi.st<10) { return false; } // no stam
			if((currdata.mi.st<50) && (poweratt)) { return false; } // no stam
			switch(stopon) {
				case "never": return true;
				case "stop": return false;
				case "leading": return !am_i_leading_by(stoponval);
				case "leading3": return !am_i_targeting(stoponval,3);
				case "leading5": return !am_i_targeting(stoponval,5);
				case "staminaused": return stamused<stoponval;
				case "staminaleft": return currdata.mi.st>stoponval;
			}
		} catch(err) {}
		return true;
	}

	function decide_who_to_attack(count){
		var i,list=[];
		// override active?
		
		if(powerup_command.target!==undefined) {
			//console.log('override');
			
			if((currdata.pi) && (currdata.pi[powerup_command.target]) && (currdata.pi[powerup_command.target].ph>0)) {
				for(i=0;i<count;i++) {
					list.push(powerup_command.target);
				}
				//console.log('override, successful:'+JSON.stringify(list));
				return list;
			} else {
				// target is not alive anymore
				powerup_command.target = undefined;
				$('.arena_kill').removeClass('arena_puactive').addClass('arena_punormal');
				// continue with normal selection
				//console.log('override not successful');
			}					
		}
		
		var target=$('#arena_seltarget').val();
		if(powerup_status.kami_active) { target="highhealth"; }
		var skipshield_d=$('#arena_skipshield').is(':checked');
		var skipshield_a=$('#arena_skipshield_a').is(':checked');
		var bestid=-1,best=0;
		for(i in currdata.pi) {
			if(i!=meid) {
				if(!protect[i]) {
					if((currdata.pi[i].ph>0)) {
						if(!(
							(skipshield_d && (currdata.pi[i].pu>1)) ||
							(skipshield_a && (currdata.pi[i].pu%2==1))
						)){
							var val;
							switch(target) {
								case "lowhealth": val=100-currdata.pi[i].ph; break;
								case "highhealth": val=currdata.pi[i].ph; break;
								case "leastpoints": val=1000000-currdata.pi[i].sc; break;
								case "mostpoints": val=currdata.pi[i].sc;break;
								case "leastrespect": val=10000-playerinfo[i].respect; break;
								case "mostrespect": val=playerinfo[i].respect; break;
								case "allalive": val=1; break;
								case "leastdiff": val=3-r_difficulty[playerinfo[i].diff]; break;
							}
							if(val>best) {
								list=[];
								list.push(i);
								best=val;
							} else if(val==best) {
								list.push(i);
							}
						}
					}
				}
			}
		}
		
		if(list.length==0) {
			//console.log('doh, no target.');
		} else if(list.length>count) {
			list=list.slice(0,count);
		} else if(list.length<count) {
			while(list.length<count) {
				list.push(list[0]);
			}
		}
		return list;
	}

	function decide_actions(){
		var numatt = parseInt($('#arena_numatt').val()) || 3;
		if(numatt>3) { numatt=3; }
		
		if(currdata.s==2) { // fight active
			if($('#arena_powerattack').is(':checked')) {
				poweratt_on();
			} else {
				poweratt_off();
			}
			// power ups
			var usekami=$('#arena_boostkami').is(':checked');
			if(usekami && !powerup_status.kami_used) {
				var kamitime = parseInt($('#arena_boostkami_s').val());
				if(currdata.t<kamitime) {
					use_powerup(5);
				}
			}
			
			// send queued powerup
			if(powerup_command.active!=-1) {
				cmdqueue.push('3:'+powerup_command.active);
				if ((powerup_command.active==1) || (powerup_command.active==2)) { // don't retry heal or stam refill
					powerup_command.active = -1;
					$('.arena_boost.arena_puactive').removeClass('arena_puactive').addClass('arena_punormal');
					$('.arena_boost2.arena_puactive').removeClass('arena_puactive').addClass('arena_punormal');
				}
			}

			if(decide_allowed_to_attack()) {
				var i,who=decide_who_to_attack(numatt-cmdqueue.length);
				for(i=0;i<who.length;i++) {
					attack(who[i],1);
				}
			}
			//console.log(cmdqueue);
		}
	}
	
	function parse_loot(msg){
		window.eikea=msg;
		var $msg=$('<div>'+msg+'</div>');
		var rewards={},arena={};
		rewards.xp=parseInt($msg.find('.xp_earned > .value').text());
		rewards.respect=parseInt($msg.find('.respect_earned > .value:first').text());
		if($msg.find('.respect_earned > .label:last').text().indexOf('Crests')!=-1) {
			rewards.crests=parseInt($msg.find('.respect_earned > .value:last').text()) || 0;
		}
		rewards.stam_cur=parseInt($msg.find('.stamina_stats > .current').text());
		rewards.stam_total=parseInt($msg.find('.stamina_stats > span:last').text());
		rewards.rank=$msg.find('.rank_holder > .position').text();
		if(currdata) {
			rewards.stamused=(stam_on_start - currdata.mi.st);
		}
		rewards.ratio=(rewards.xp / rewards.stamused).toFixed(2);
		rewards.loot=[];
		rewards.points=parseInt($('#arena_score'+meid).text());
		
		var loot_strings=[];
		$($msg.find('#your_reward_list > .arena_fight_rewards_item_container')).each(function(){
			var loot = {};
			loot.name = $(this).find('.arena_reward_items_bg > .name').text().trim() || $(this).find('.arena_reward_items_special_bg > .name').text().trim();
			loot.id = $(this).find('.arena_reward_items_bg img').attr('item_id') || false;
			loot.src = $(this).find('.arena_reward_items_bg img').attr('src') || $(this).find('.arena_reward_items_special_bg img').attr('src');
			loot.quantity = parseInt($(this).find('.qty').text().trim().substr(2)) || 1;
			loot.attack = parseInt($(this).find('.attack').text().trim()) || 0;
			loot.defense = parseInt($(this).find('.defense').text().trim()) || 0;
			rewards.loot.push(loot);
			loot_strings.push('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		});
		if(rewards.crests){
			var loot={ name:"Crests", src:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/crestlogo_16.png",quantity:rewards.crests };
			rewards.loot.push(loot);
			loot_strings.unshift('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		}
		// console.log(rewards);
		logmsg('Result: '+rewards.rank+' Place: <span class="experience">'+rewards.xp+' ('+rewards.ratio+')</span> <span class="respect">'+(rewards.respect>0?'+':'')+rewards.respect+'</span>', 'log');
		write_loot();

		var logline='Results: ';
		var opponents=0, opponentname='';
		$($msg.find('.standings_list')).each(function(){
			var pos=$(this).find('.pos').text();
			var name=$(this).find('.name').text();
			var resp=$(this).find('.respect_wrapper').html();
			var powerups='';
			$(this).find('.powerups_used img').each(function(){
				powerups+='<img src="'+this.src+'" width="16" height="16" />';
			});
			logline+=pos+'. '+name+' <span class="respect">'+resp+'</span> '+powerups+' ';
			if(pos==parseInt(rewards.rank)) { stats.respect=parseInt(resp); }
			opponents++;
			if(!$(this).hasClass('its_me')) { opponentname=name; }
			
		});
		logmsg(logline, 'log');
		
		// arena list
		arena.rank=parseInt(rewards.rank);
		arena.stam=rewards.stamused>0?rewards.stamused:0;
		arena.points=rewards.points;
		arena.crests=rewards.crests;
		arena.opponents=opponents;
		arena.opponentname=opponentname;
		arena.diff='';
		$('span[id*="arena_diff"]').each(function(){arena.diff+=$(this).text().substr(0,1);})		
		arenalist.push(arena);

		if(msg.indexOf('You are now LEVEL')!=-1) {
			Drone.CurrentLevel = $('#user_level').text();
//			logmsg('<span class="good">Levelup!</span>', 'log');
			grab_bonus();
		}
		stats.stamina+=rewards.stamused;
		stats.xp+=rewards.xp;
		stats.arenas++;
		stats.ranks[parseInt(rewards.rank)-1]++;
		stats.crests+=rewards.crests;
	}

	function add_loot(item) {
		var id = (Util.isset(item.id) ? item.id : item.name);
		if (typeof looted[id] == 'object') {
			looted[id].quantity += item.quantity;
		}
		else {
			looted[id] = {
				"id": id, "name": item.name, "src": item.src, "quantity": item.quantity, "attack":item.attack, "defense":item.defense
			}
		}
	}

	function sort_loot(){
		var x,list = [];
		for (x in looted) {
			list.push(x);
		}
		list.sort(function(a,b){
			if(looted[a].name=="Ices") { return -1; }
			if(looted[b].name=="Ices") { return 1; }
			if(looted[a].name=="Crests") { return -1; }
			if(looted[b].name=="Crests") { return 1; }
			return compare(max(looted[a].attack,looted[a].defense),max(looted[b].attack,looted[b].defense));
		});
		return list;
	}

	function write_loot() {
		var sorted=sort_loot();
		var loothtml = '<table>';
		for (i=0;i<sorted.length;i++) {
			var loot = looted[sorted[i]];
			var image = '<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" title="'+loot.name+'" width="16" height="16" />';
			if (itemdatabase[loot.id]) {
				var loot2 = itemdatabase[loot.id];
				var attack = '', defense = '', improves = false, improve = '';
				if (loot2.attack > 0) {
					attack = '['+loot2.attack+'A';
					if(worstitems[itemdatabase[loot.id].type].att<loot2.attack) {
						improves = true;
						improve += '<span class="attack good">+'+(loot2.attack - worstitems[itemdatabase[loot.id].type].att)+'</span> ';
					}
				}
				if (loot2.defense > 0) {
					defense = loot2.defense+'D]';
					if(worstitems[itemdatabase[loot.id].type].def<loot2.defense) {
						improves = true;
						improve += '<span class="defense good">+'+(loot2.defense - worstitems[itemdatabase[loot.id].type].def)+'</span>';
					}
				}
				var have = loot.quantity;

				have = (loot2.quantity>0?' <span class="more_in">Have: '+(loot2.quantity+loot.quantity)+'</span>':'');
				loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td><td>'+image+'<span style="'+(improves?"color:yellow;":"")+'">'+loot2.name+'</td><td>'+attack+'</td><td>'+defense+'</span></td><td>'+improve+'</td><td>'+have+'</td></tr>';
			}
			else
			{
				if(loot.name=="Ices") {
					Drone.updateStats(loot.quantity, 'ArenaIC');
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td><span style="color: #609AD1; font-weight:bold;">'+image+loot.name+'</span></td><td></tr>';
				} else {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td>'+image+loot.name+'</td><td></tr>';
				}
			}
		}
		loothtml += '</table>';
		$('#arena_lootlog').html(loothtml);
	}
	
	function get_stage(i) {
		if(i==0) { return "Waiting for more player"; }
		if(i==1) { return "Waiting for Start"; }
		if(i==2) { return "Fighting"; }
		if(i==3 && ARS) { return "Drone Stopped"; }
		else if(i==3 && !ARS) { return "Finished"; }
		return "Unknown:"+i;
	}

	function send_queue() {
		if(cmdqueue.length>0) {
			var string='{"Nonce":'+currdata.mi.ammo+',"CMD":"'+cmdqueue.join(';')+'"}'
			cmdqueue=[];
			socke.send(string);
		}
	} 
	
	function attack(i,num) {
		var j;
		for(j=0;j<num;j++) {
			cmdqueue.push("1:"+i);
		}
	}
	
	function poweratt_on() {
		if(poweratt!==true) {
			cmdqueue.push("2:1");
			poweratt=true;
		}
	}
	
	function poweratt_off() {
		if(poweratt!==false) {
			cmdqueue.push("2:0");
			poweratt=false;
		}
		return false
	}
	
	function use_powerup(id) {
		powerup_command.active=id;
	}
	
	function getStats(handler) {
		request('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&city=7&xw_client_id=8',function(msg){
			if(msg.indexOf('ERROR 500: response never closed')!=-1){
				pausing(3,'<span class="bad">Zynga Error, retry in </span>',function(){
					getStats(handler);
				});
				return;
			}
			var data = JSON.parse(msg);
			update_game_ui_sp(data);
			stats.mafiaatt=parseInt(data.fightbar.group_atk);
			stats.mafiadef=parseInt(data.fightbar.group_def);
			stats.stam=parseInt(data.user_fields.user_max_stamina);
			stats.worstitems=data.worstitems;
			if(handler) { handler(); }
		});
	}
	
	function sdiff(num,color) {
		if(num==0) {
			return '&plusmn;0';
		} else if(num>0) {
			return '+'+num;
		} else {
			return num;
		}
	}
	
	function cmp(v1,v2){
		return (v1>v2?-1:(v1<v2?1:0));
	}


	var Ping = {
		inUse:false,
		start:0,
		ping:function(ip, callback) {
			if(!this.inUse) {

				this.inUse = true;
				this.callback = callback
				this.ip = ip;

				var _that = this;

				this.img = new Image();

				this.img.onload = function() {_that.good();};
				this.img.onerror = function() {_that.good();};

				this.start = (new Date()).getTime();
				this.img.src = "http://" + ip + '?id='+Math.random(4);
				this.timer = setTimeout(function() { _that.bad();}, 1500);
			}
		},
		good:function(){
			if(this.inUse) {
				this.inUse = false;
				this.callback((new Date()).getTime()-this.start);
				clearTimeout(this.timer);
			}
		},
		bad:function(){
			if(this.inUse) {
				this.inUse = false;
				this.callback(-1);
			}
		}
	}

	function update_game_ui_sp(object) {
		if (Util.isset(object.user_fields)) {
			user_fields_update(object.user_fields);
			user_info_update(object.user_fields, object.user_info);
			if (Util.isset(object.user_fields.zmc_event_count)) {
				$('#zmc_event_count').text(object.user_fields.zmc_event_count);
			}
		}
		if (Util.isset(object.questData)) {
			MW.QuestBar.update(object.questData);
		}
	}	

	function loadStats(){
		getStats(function(){
			// save first stats
			stats.start_mafiaatt=stats.mafiaatt;
			stats.start_mafiadef=stats.mafiadef;
//			displayMafiaStats();
			loadInventory();
		});
	}
	function isArray(obj) {
		return obj.constructor == Array;
	}
		loadStats(); // mafia att, def and inventory

	function displayMafiaStats(){
		/*$('#arena_strength_stats').html('');
        $('#arena_strength_stats').append(mafia_attack+' '+commas(stats.mafiaatt)+' (<span class="'+(stats.mafiaatt-stats.start_mafiaatt >= 0?'good">+':'bad">')+''+commas(stats.mafiaatt-stats.start_mafiaatt)+'</span>) ');
		$('#arena_strength_stats').append(mafia_defense+' '+commas(stats.mafiadef)+' (<span class="'+(stats.mafiadef-stats.start_mafiadef >= 0?'good">+':'bad">')+''+commas(stats.mafiadef-stats.start_mafiadef)+'</span>) ');*/
		setTimeout(function(){ delayArenaChk(); },1000);		
		display_all_stats();
	}


	function display_all_stats(){
		var html='';
		html+='Total arenas: '+stats.arenas+' ';
		html+='[';
		html+=stats.ranks[0]+'&times1st, ';
		html+=stats.ranks[1]+'&times2nd, ';
		html+=stats.ranks[2]+'&times3rd, ';
		html+=stats.ranks[3]+'&times4th, ';
		html+=stats.ranks[4]+'&times5th, ';
		html+=stats.ranks[5]+'&times6th';
		html+=']<br />';

		html+='Respect: <span class="respect">'+stats.respect+' ('+sdiff(stats.respect - stats.respect_start)+')</span> ';
		if(stats.crests) {
			html+='Crests: <span class="arena_mastery_crests">'+sdiff(stats.crests)+'</span> ';
		}
		html+='<span class="experience">'+stats.xp+'</span> ';
		html+='<span class="stamina">'+stats.stamina+'</span> ';
		html+='<span class="experience">'+(stats.stamina==0?0:(stats.xp/stats.stamina).toFixed(2))+'</span> ';

		$('#arena_allstats').html(html);
	}
	function max(a,b){
		return a>b?a:b;
	}
	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
	}
	function commas(s) {
		var d;
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}
	function compare(a,b) {
		if (a==b) { return 0; }
		if (a>b) { return -1; }
		return 1;
	}
	
	function update_info(data) {
		if(data.s==2) {
			// update last data received
			if(last_update>0) {
				var newtime=(new Date()).getTime();
				last_update=newtime;
			} else {
				last_update=(new Date()).getTime();
			}
		}
		set_progress_bar(data.t,data.s==2?90:20,data.t+' seconds left');
		if(data.s==1) {
			starting_in = unix_timestamp()+data.t;
			clearInterval(starting_in_counter) ;
			starting_in_counter = setInterval(function(){
				if(starting_in < unix_timestamp()) {
					clearInterval(starting_in_counter) ;
				} else {
					set_progress_bar(parseInt(starting_in - unix_timestamp()),20,starting_in - unix_timestamp()+' seconds left');
				}
			},1000);
			if(data.mi) {
				stam_on_start = data.mi.st; // save at start
			}
		}
		else {
			clearInterval(starting_in_counter);
		}
		if(data.mi && (stam_on_start==-1)) {
			stam_on_start = data.mi.st;
		}
		$('#DroneXStatus').html(get_stage(data.s));
		if(data.s<1) {
			$('#DroneXStatus').append(' <a href="#" id="arena_leave">(leave)</a>');
			$('#arena_leave').click(function(){
				socke.send('{"Nonce":-1,"CMD":"2"}');
				return false;
			});
		}
		if(data.s==2) {
			if(!ArenaNFO){
				ArenaNFO = true;
				RatioChecker('isArena')
				for(var nfo=0;nfo<7;nfo++) {
					var lolcheatr = $('#arena_infobox'+nfo).attr('data-id');
					load_player_profile(lolcheatr,nfo);
				}			
			}
		}
		// enemy powerups
		for(i in data.pi) {
			var pi=data.pi[i];
			// thanks for Alex for this idea
			if(pi.ph == 0){
				if(healtimer[i]<10) {
					healtimer[i] = unix_timestamp() + 10;
					$('#arena_usepu'+i+' > .arena_boost').removeClass('arena_puclick').addClass('arena_punoclick').removeClass('arena_pufull').addClass('arena_puoff');
					$('#arena_usepu'+i+' > .arena_kill').removeClass('arena_puclick').addClass('arena_punoclick').removeClass('arena_pufull').addClass('arena_puoff');
					$('#arena_usepu'+i+' > .arena_boost2').removeClass('arena_punoclick').addClass('arena_puclick').removeClass('arena_puoff').addClass('arena_pufull');
				}
				var t=(healtimer[i] - unix_timestamp()); if(t<1) { t=1; }
				$('#arena_health'+i).html('<span class="bad">in '+t+'s</span>');
			} else {
				$('#arena_health'+i).html(pi.ph.toFixed(1)+'%');

					$('#arena_usepu'+i+' > .arena_boost').removeClass('arena_punoclick').addClass('arena_puclick').removeClass('arena_puoff').addClass('arena_pufull');
					$('#arena_usepu'+i+' > .arena_kill').removeClass('arena_punoclick').addClass('arena_puclick').removeClass('arena_puoff').addClass('arena_pufull');
					$('#arena_usepu'+i+' > .arena_boost2').removeClass('arena_puclick').addClass('arena_punoclick').removeClass('arena_pufull').addClass('arena_puoff');
				
			}
			if(unix_timestamp()>healtimer[i]) {
				healtimer[i] = 0;
			}

			$('#arena_score'+i).html(pi.sc);
			var puhtml='';
			if(pi.pu>1) { puhtml+='<span class="arena_defsh">&nbsp;</span> '; }
			if(pi.pu%2==1) { puhtml+='<span class="arena_offsh">&nbsp;</span> '; }
			$('#arena_pu'+i).html(puhtml);
		}
		if(data.mi) {
			$('#arena_me_st').html(data.mi.st);
			//$e('me_ammo').html(data.mi.ammo);
//			$e('me_pst').html(data.mi.pst);
			if(data.mi.pui) {
				update_powerups(data.mi.pui);
			}
			$('#arena_me_sr').html(data.mi.sr);

			if(currdata && currdata.mi) {
				if(data.mi.st>currdata.mi.stam+100) { // used used a stam refill
					logmsg('Used a stamina refill!', 'log');
					stam_on_start += (data.mi.st-currdata.mi.stam);
				}
			}
			$('#arena_me_stused').html(stam_on_start - data.mi.st);
		}

		// healing timer
		if(meid) {
			$('#arena_me_health').removeClass('good').removeClass('bad').addClass(data.pi[meid].ph>0?'good':'bad').html(data.pi[meid].ph);
			if((data.pi[meid].ph==0) && (currdata.pi[meid].ph>0)) {
				healed_in=unix_timestamp()+10;
				clearInterval(healed_in_counter);
				healed_in_counter = setInterval(function(){
					if(unix_timestamp()>healed_in) {
						clearInterval(healed_in_counter);
						$('#arena_healin').html('');
					} else {
						$('#arena_healin').html('Healing in '+(healed_in - unix_timestamp())+'s');
					}
				},1000);
			} else {
				try {
					$('#arena_healin').html('');
					clearInterval(healed_in_counter);
				} catch(e){ }
			}
		}

		for(i in data.pi) {
			if((data.pi[i].pid) && (!playerids[data.pi[i].pid])) {
				playerinfo[i]={ id:data.pi[i].pid };
				playerids[data.pi[i].pid]=i;
				if(data.pi[i].pid==User.id.substr(2)) {
					meid=i;
				}

				request('xw_controller=Arena&xw_action=getSingleUserData&pid='+data.pi[i].pid+'&xw_client_id=8',function(msg){
					var id,json=JSON.parse(msg);
					for(id in json.data.result) {
						var nr=playerids[id];
						playerinfo[nr].name=json.data.result[id].name;
						playerinfo[nr].respect=json.data.result[id].playerRespect.replace(',','').replace('K','000');
						playerinfo[nr].diff=difficulty[json.data.result[id].defenseFlag+json.data.result[id].mafiaDefenseFlag];
						if(id == User.id.substr(2)) {
							$('#arena_name'+nr).html('<span id="spartacus_hover'+nr+'"><img src="'+json.data.result[id].pic+'" width="32" height="32" /><span class="good">Me!</span></span>');
							$('#arena_diff'+nr).html('<div class="difficulty">-</div>');
							if(!stats.respect) { stats.respect_start=json.data.result[id].playerRespect.replace(',','').replace('K','000'); }
							$('#arena_usepu'+nr).html(
								'<img src="'+powerups[2].pic+'" width="24" height="24" data-id="2" '+$c('boost2',['puoff','punoclick','punormal'])+' title="Use health boost">'+
								'<img src="'+powerups[3].pic+'" width="24" height="24" data-id="3" '+$c('boost',['pufull','puclick','punormal'])+' title="Use meta flair">'+
								'<img src="'+powerups[4].pic+'" width="24" height="24" data-id="4" '+$c('boost',['pufull','puclick','punormal'])+' title="Use pain killer">'+
								'<img src="'+powerups[7].pic+'" width="24" height="24" data-id="7" '+$c('boost',['pufull','puclick','punormal'])+' title="Use reflector">'
							);
						}
						else {
							var m;
							if(m=/\d+_(\d+)_\d+/.exec(json.data.result[id].pic)) {
								$('#arena_name'+nr).html('<span id="spartacus_hover'+nr+'"><img src="'+json.data.result[id].pic+'" width="32" height="32" /><a href="https://www.facebook.com/'+m[1]+'" target="_blank">'+playerinfo[nr].name+'</a></span>');
							} else {
								$('#arena_name'+nr).html('<span id="spartacus_hover'+nr+'"><img src="'+json.data.result[id].pic+'" width="32" height="32" />'+playerinfo[nr].name+'</span>');
							}
							$('#arena_name'+nr).append('<span data-id="'+id+'" id="arena_infobox'+nr+'" style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');
							$('#arena_diff'+nr).html('<div class="difficulty">'+playerinfo[nr].diff+'</div>');
							var target='https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/leaderboard/leaderboardTarget.png';
							var defense='https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-defense_04.gif';
							$('#arena_usepu'+nr).html(
								'<img src="'+powerups[5].pic+'" width="24" height="24" data-nr="'+nr+'" data-id="5" '+$c('boost',['pufull','puclick','punormal'])+' title="Nuke opponent (Kamikaze)">'+
								'<img src="'+powerups[6].pic+'" width="24" height="24" data-nr="'+nr+'" data-id="6" '+$c('boost',['pufull','puclick','punormal'])+' title="Use drain on opponent">'+
								'<img src="'+target+'" width="24" height="24" data-nr="'+nr+'" '+$c('kill',['pufull','puclick','punormal'])+' title="Hit this player until dead" >'+
								'<img src="'+defense+'" width="24" height="24" data-nr="'+nr+'" '+$c('protect',['puhalf','puclick','punormal'])+' title="Do not attack this player (click to enable, click again to disable)" >'
							);
						}
						$('#arena_name'+nr).append('<span data-id="'+id+'" id="arena_infobox'+nr+'" style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');

						$('#arena_respect'+nr).html(playerinfo[nr].respect);
						var testnumbs = 'spartacus';
						$('#spartacus_hover'+nr).hover(function(event){
							var num=this.id.substr(6+testnumbs.length);
							var id = $('#arena_infobox'+num).attr('data-id');
							$('#arena_infobox'+num).css("top",event.pageY+'px').css("left",(event.pageX-100)+'px');
							if(!$('#arena_infobox'+num).attr('spdone')) {
								$('#arena_infobox'+num).html('Profile loading...');
								load_player_profile(id,num);
							}
							$('#arena_infobox'+num).show();
						},function(){
							var num=this.id.substr(6+testnumbs.length);
							$('#arena_infobox'+num).hide();
						});
						/* intervene, protect */
						$('#arena_usepu'+nr,' > .arena_protect').click(function(){
							var pnr=$(this).attr('data-nr');
							if(protect[pnr]) {
								delete protect[pnr];
								$(this).removeClass('arena_pufull').addClass('arena_puhalf');
							} else {
								protect[pnr] = 1;
								$(this).removeClass('arena_puhalf').addClass('arena_pufull');
							}
						});
						/* intervene, kill */
						$('#arena_usepu'+nr,' > .arena_kill').click(function(){
							if($(this).hasClass('arena_puclick')) { // only when active
								var pnr=$(this).attr('data-nr');
								if(powerup_command.target==pnr) { // turn off
									$(this).removeClass('arena_puactive').addClass('arena_punormal');
									powerup_command.target=undefined;
								} else if (powerup_command.target===undefined) { // no target yet
									$(this).removeClass('arena_punormal').addClass('arena_puactive');
									powerup_command.target=pnr;
								} else { // switch target
									$('#arena_usepu'+powerup_command.target,' > img.arena_kill').removeClass('arena_puactive').addClass('arena_punormal');
									$(this).removeClass('arena_punormal').addClass('arena_puactive');
									powerup_command.target=pnr;
								}
							}
						});
						/* intervene, boost */
						$('#arena_usepu'+nr+' > .arena_boost, #arena_usepu'+nr+' > .arena_boost2').click(function(){
							//console.log('click');
							if($(this).hasClass('arena_puclick')) { // only when active
								var puid=$(this).attr('data-id');
								var pnr=$(this).attr('data-nr');
								$('.arena_boost.arena_puactive').removeClass('arena_puactive').addClass('arena_punormal');
								$(this).removeClass('arena_punormal').addClass('arena_puactive');
								powerup_command.active = puid;
								powerup_command.target = pnr;
							}
						});
					}
				});
			}
		}
		// sort player and rank
		var rank=[];
		for(i in playerinfo) {
			rank.push(i);
		}
		rank.sort(function(a,b){return cmp(data.pi[a].sc, data.pi[b].sc);});
		for(i=0;i<rank.length;i++){
			if(!$('#arena_sortplayer').is(':checked')) {
				if(!over_table) {
					$('#arena_table').append($('#arena_op'+rank[i]));
				}
			}
			$('#arena_rank'+rank[i]).html('#'+(i+1));
		}
		// save old
		currdata=data;
	}	
	
	function load_player_profile(id,nr) {
		$('#arena_infobox'+nr).attr('spdone','true');
		request('xw_controller=stats&xw_action=view&user='+btoa('p|'+id),function(result){
			var $msg=$('<div>'+result.replace(/<img/g,'<noimg')+'</div>');
			window.eike1=result;
			window.eike2=$msg;
			try {
				var name=$msg.find('.stats_title_text').html().re('a> ([^>]*)"');
				var level=$msg.find('.stats_title_text').html().re('level (\\d*)');
				var tag=$msg.find('.stats_title_text > a').text().trim();
				var llink=$msg.find('.stats_title_text > a').attr('href');
				var arena_stats=$msg.find('#arena_collection .collection_list').text().trim().replace(/s*\n\s*/g,"<br />").replace(/:/g,': ');
				var mafia=$msg.find('a:contains("Ask Mafia to Attack")').length==0;
				var fid=atob(unescape(llink.re('id=([^&]*)&')));
			} catch(nofam) {
				var name=$msg.find('.stats_title_text').text().trim().re('"(.*)"');
				var tag="no family";
				var llink='';
			}
			var html='Full name: '+name+'<br />'+
			'Family: '+tag+' ('+fid+')<br/>'+
			'Level: '+level+'<br />'+
			(mafia?'<span class="good">In your mafia</span>':"Not a mafia member")+'<br /><br />'+
			arena_stats;
			$('#arena_infobox'+nr).html(html);
			if(tag&&llink) {
				$('#spartacus_hover'+nr+' > img').after(
					'<a href="http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=clan&xw_action=view&xw_city=7&mwcom=1&id='+escape(btoa(fid))+'&from_red_link=1" class="mw_new_ajax" selector="#inner_page"><span style="color:red">'+tag+'</span></a> '
				);
			}
		});
	}

	function $c(element,spockclasses,otherclasses) {
		var i,str=' class="arena_'+element+'';
		if($.isArray(spockclasses)) {
			for(i=0;i<spockclasses.length;i++) {
				str+=' arena_'+spockclasses[i];
			}
		}
		if($.isArray(otherclasses)) {
			for(i=0;i<otherclasses.length;i++) {
				str+=' '+otherclasses;
			}
		}
		str+='"';
		return str;
	}
	
	String.prototype.re = function(regex){
		var r=new RegExp(regex);
		var m;
		if(m=r.exec(this)) {
			return m[1];
		} else {
			return '';
		}
	}

	function update_powerups(pui) {
		var html='<table><tr>';
		var i,pups=pui.split('|');
		for(i=0;i<pups.length;i++) {
			var pup=pups[i].split(',');
			var m=(pup[0].indexOf('-')===0);
			pup[0]=Math.abs(pup[0]);
			poweruplist[pup[0]]={ num:pup[2],cooldown:pup[1],type:m }
			if((powerup_command.count[pup[0]]!=pup[2]) && (powerup_command.active==pup[0])) {
				powerup_command.active=-1;
				$('.arena_boost.arena_puactive').removeClass('arena_puactive').addClass('arena_punormal');
			}
			powerup_command.count[pup[0]]=pup[2];
		}
		for(i in powerups) {
			if(poweruplist[i].cooldown>0) {
				html+='<td valign=top style="text-align:center;"><img class="arena_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
				html+='<br /><span title="On cooldown or active">A/C</span> '+poweruplist[i].cooldown+'s</span>';
			} else if (powerup_command.active==i) {
				html+='<td valign=top style="text-align:center;"><img class="arena_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num+
				'<br /><span title="Firing (sending command to server)">Fire</span>';
			} else {
				html+='<td valign=top style="text-align:center;"><img class="arena_usepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
				html+='<br /><span id="arena_pustatus'+i+'"></span>';
			}
			html+='</td>';
		}
		html+='</table>';
		if(poweruplist[5].cooldown>0) {
			powerup_status.kami_active = true;
			powerup_status.kami_used = true;
		}

		$('#arena_powerups').html(html);
		$('.arena_usepowerup').click(function(){
			var id=$(this).attr('data-id');
			logmsg('Using powerup: '+powerups[id].name, 'log');
			$('#arena_pustatus'+id).html('<span title="Firing (sending command to server)">Fire</span>');
			use_powerup(id);
			return false;
		});
	}
/*End Arena Coding*/
	
	function startFobbing(){
		if (Drone.Running.Paused) {
	        return;
	    }
		if (/These loot drops are needed for this job/.test(document.body.innerHTML)) {
	        clcikbutton('<span class="bad">Not enough consumables..</span>');
	        return;
	    }
	    if (/You do not have enough cash to do this job/.test(document.body.innerHTML)) {
	        clcikbutton('<span class="bad">Not enough cash..</span>');
	        return;
	    }
	    if (/There are no secret districts currently open!/.test(document.body.innerHTML)) {
	        clcikbutton('<span class="bad">Secret District Appears to of gone walkies..</span>');
	        return;
	    }
		if (/- Locked/.test(document.body.innerHTML)) {
			clcikbutton('<span class="bad">Secret District Not unlocked!</span>');
			return;		
		}
		if (/MW: This link has expired. Please reload./.test(document.body.innerHTML)) {
	        logmsg('<span class="bad">Refreshing Session!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
	    }
		if (/Your session has timed out. Click any button to resume playing./.test(document.body.innerHTML)) {
	        logmsg('<span class="bad">Refreshing Session!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
	    }
		var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
	    if (onMarketPlace > 0) {
			logmsg('<span class="bad">Marketplace Tab, Why i go here..!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
	    }
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	    var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	    var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		spendSkillsChkr();
		UpdateCashInHand();
		if(Drone.Storing.ABank){
			BastardTehBanker();
		}
		try {
			var d;
			d = '';
			var mynuma = DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost;
			var myxpnum = DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isTheXP;
			var energycostme = $('#job-id-' + DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].button + ' > .job_details.clearfix > .uses.clearfix > .stamina').attr('current_value');
			if(energycostme == null){
				logit('ererer');
				setTimeout(PreJob, 500);
				return;
			}
			var xppayme = $('#job-id-' + DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].button + ' > .job_details.clearfix > .pays.clearfix > .experience').attr('current_value');
			if (mynuma != energycostme) {
				DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost = energycostme;
				DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].isTheXP = xppayme;
				d = 'Learnt new stamina cost, stamina cost per job is now ' + energycostme + ' & XP Payout is ' + xppayme + '';
				logmsg(d, 'log');
			}	        
	    } catch (err) {}
		if(Drone.Storing.SpendingThis == 'energy' && DoesIHaveEnergy > DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			check_skills(checkit);
			return;
		}
		if (DoesIHaveStamina < DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost) {
			check_skills(checkit);
			return;
		}
		CloseDoopidPopup();
		setTimeout(dofobjobnow, 50);
	}
	
	function dofobjobnow() {
		CloseDoopidPopup();
		var clickMe = document.getElementById('btn_dojob_' + DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].button);
		if (clickMe == null) {
			logmsg('<span class="bad">Url Not Found!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(StaminaDestination, StaminaLocation, StaminaTab, function(){
					SetDiv(StaminaWord)
				});;
			});
			return;
		}
		clickMe.click()
		Drone.updateStats(1, 'FobsDone');
		logmsg('Doing Fob: <font color="gold">'+DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].name+'</font>', 'status');
		logmsg('Repeating Fob..', 'log');
		setTimeout(startFobbing, 1000);
		return;
	}
	
/*Start Jobbing Code*/
	function PreJob(){
		if (Drone.Running.Paused) {
	        return;
	    }
	    if (/These loot drops are needed for this job/.test(document.body.innerHTML)) {
	        clcikbutton('<span class="bad">Not enough consumables..</span>');
	        return;
	    }
	    if (/You do not have enough cash to do this job/.test(document.body.innerHTML)) {
	        clcikbutton('<span class="bad">Not enough cash..</span>');
	        return;
	    }
	    if (/There are no secret districts currently open!/.test(document.body.innerHTML)) {
	        clcikbutton('<span class="bad">Secret District Appears to of gone walkies..</span>');
	        return;
	    }
		if (/- Locked/.test(document.body.innerHTML)) {
			clcikbutton('<span class="bad">Secret District Not unlocked!</span>');
			return;		
		}
		if (/MW: This link has expired. Please reload./.test(document.body.innerHTML)) {
	        logmsg('<span class="bad">Refreshing Session!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
	    }
		if (/Your session has timed out. Click any button to resume playing./.test(document.body.innerHTML)) {
	        logmsg('<span class="bad">Refreshing Session!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
	    }		
	    var onMarketPlace = document.evaluate('//div[contains(@class, "marketplace_controller")]//a[contains(., "ALL ITEMS")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0;
	    if (onMarketPlace > 0) {
			logmsg('<span class="bad">Marketplace Tab, Why i go here..!</span>', 'log');
			pausing(3,'<span class="good">Traveling in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
	    }
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	    var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	    var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		JobSC = 0;
		spendSkillsChkr();
		UpdateCashInHand();
		if(Drone.Storing.ABank){
			BastardTehBanker();
		}
		if(Drone.JobOptions.BlockMe){
			if(DoesIHaveEnergy > (CTPRB+10)){
				Drone.JobOptions.BlockMe = false;
				CTPRB = 0;
			}
		}
		try{	
			var hazbeenposted = $('#btn_crew_recruit').text();
			var tellmeNow = /Ask/g;
			var Annnnd = tellmeNow.test(hazbeenposted);
			if(parseInt(document.getElementById('btn_queue').childNodes[0].childNodes[0].childNodes[2].innerHTML) <= Drone.Storing.CrewAmount && Annnnd && Drone.Storing.AutopostingCrew){
				if(crewposted == 0){
					crewposted = 1;
					AjxCrewRequest('html_server.php?xw_controller=job&xw_action=view&xw_city='+MyLocation()+'&xw_person='+ User.id, function (jsonData) {
						var doRecruitButtonFeed = substr(jsonData, 'doRecruitButtonFeed: function() {', 'MW.Feed(feed)');
						if(doRecruitButtonFeed && /accept_city_crew_feed/.test(doRecruitButtonFeed)) {
							doRecruitButtonFeed = doRecruitButtonFeed + ' end_of_crew'
							var feed = substr(doRecruitButtonFeed, 'var feed = {', 'end_of_crew');
							eval(feed);
							feed.autoPublish = true;
							window.MW.Feed(feed)
							logmsg('<span class="good">Crew was under 18, so have posted for some..</span>', 'log');
						}else{
							logmsg('<span class="bad">Issues Posting for crew!</span>', 'log')
						}
					});
					setTimeout(function () {
						crewpostr();
					}, 1000*60*60); 
				}
			}
		}catch(err){}
		if(SecondaryJobbing && ChangeToSecondary() && !Drone.JobOptions.BlockMe){
			if(isBandit()){
				if (Bandit_type != "Cash Bandit" && Bandit_type != "Job Bandit") {
					if ($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0) {
						logmsg('<span class="bad">MW Not displaying Bandit properly!</span>', 'log');
						pausing(3,'<span class="good">Traveling in </span>',function(){
							Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
								SetDiv('nrg')
							});
						});
						return;
					}
					if(crewMembers == 0){
						logmsg('<span class="bad">Not Killing '+Bandit_type+'... Because no Crew!</span>', 'log');
						BanditPassIs = false;
						BUBT = 6;
						Drone.updateStats(1, 'BanditsTotal');
						pausing(5*60,'<span class="good">Waiting out '+Bandit_type+'.. Restarting in </span>',function(){
							Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
								SetDiv('nrg')
							});
						});
						return;
					}else{
						logmsg('<span class="bad">Attempting to Kill '+Bandit_type+'...</span>', 'log');
						Bandit_Elim.click();
						BanditPassIs = false;
						Drone.updateStats(1, 'BanditsKilled');
						Drone.updateStats(1, 'BanditsTotal');
						BUBT = 6;
						pausing(5,'<span class="good">Refreshing Tab in </span>',function(){
							Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
								SetDiv('nrg')
							});
						});
						return;
					}
				}
			}
			logmsg('Switching to secondary job...', 'log');
			Drone.JobOptions.JobPrimaryOrSecondary = "SecondaryEnergyInfo";
			pausing(3,'<span class="good">Switching to secondary job in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			return;
		}
		if(SecondaryJobbing && ChangeToPrimary()){
			if(isBandit()){
				if (Bandit_type != "Cash Bandit" && Bandit_type != "Job Bandit") {
					//Deal with bandits been detected
					if ($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0) {
						logmsg('<span class="bad">MW Not displaying Bandit properly!</span>', 'log');
						pausing(3,'<span class="good">Traveling in </span>',function(){
							Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
								SetDiv('nrg')
							});
						});
						return;
					}
					if(crewMembers == 0){
						logmsg('<span class="bad">Not Killing '+Bandit_type+'... Because no Crew!</span>', 'log');
						BanditPassIs = false;
						BUBT = 6;
						Drone.updateStats(1, 'BanditsTotal');
						pausing(5*60,'<span class="good">Waiting out '+Bandit_type+'.. Restarting in </span>',function(){
							Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
								SetDiv('nrg')
							});
						});
						return;
					}else{
						logmsg('<span class="bad">Attempting to Kill '+Bandit_type+'...</span>', 'log');
						Bandit_Elim.click();
						BanditPassIs = false;
						Drone.updateStats(1, 'BanditsKilled');
						Drone.updateStats(1, 'BanditsTotal');
						BUBT = 6;
						pausing(5,'<span class="good">Refreshing Tab in </span>',function(){
							Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
								SetDiv('nrg')
							});
						});
						return;
					}
				}
			}
			logmsg('Switching back to primary job...', 'log');
//			logmsg('Switching back to primary job...', 'status');
			Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyInfo";	
			pausing(3,'<span class="good">Switching back to primary job in </span>',function(){
				Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
					SetDiv('nrg')
				});
			});
			
			return;
		}
		if(Drone.Storing.SpendingThis == 'stamina' && DoesIHaveStamina > DroneXStaminaMap[Drone.Storing.PrimaryStaminaInfo].cost){
			check_skills(checkit);
			return;
		}
		if(Drone.Storing.SpendingThis == 'jstam'){
			check_skills(checkit);
			return;
		}
		CloseDoopidPopup();
		document.getElementById("SBTD").style.display = 'none';
		if(isBandit() && DoesIHaveEnergy < DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			if ($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0) {
				logmsg('<span class="bad">MW Not displaying Bandit properly!</span>', 'log');
				pausing(3,'<span class="good">Traveling in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
					});
				});
				return;
			}
			if(Bandit_type == "Job Bandit"||Bandit_type == "Cash Bandit"){
				logmsg('<span class="bad">Not bothering to Kill '+Bandit_type+'...</span>', 'log');
				check_skills(checkit);
				return;
			}else{
				logmsg('<span class="bad">Attempting to Kill '+Bandit_type+'...</span>', 'log');
				Bandit_Elim.click();
				BanditPassIs = false;
				Drone.updateStats(1, 'BanditsKilled');
				Drone.updateStats(1, 'BanditsTotal');
				BUBT = 6;
				pausing(5,'<span class="good">Refreshing Tab in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
					});
				});
				return;
			}
		} 
		try {
	        if (!DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isOldCity) {
	            var d;
	            d = '';
	            var mynuma = DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost;
	            var myxpnum = DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP;
	            var energycostme = $('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button + ' > .job_details.clearfix > .uses.clearfix > .energy').attr('current_value');
				if(energycostme == null){
					logit('ererer');
					setTimeout(PreJob, 500);
					return;
				}
	            var xppayme = $('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button + ' > .job_details.clearfix > .pays.clearfix > .experience').attr('current_value');
	            if (mynuma != energycostme) {
	                DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost = energycostme;
	                DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP = xppayme;
	                d = 'Learnt new energy cost, energy cost per job is now ' + energycostme + ' & XP Payout is ' + xppayme + '';
	                logmsg(d, 'log');
	            }
	        }
	    } catch (err) {}
		if(DoesIHaveEnergy < DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost){
			if(DoesIHaveEnergy > DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].cost && DoesIHaveEnergy < DroneXJobMap[Drone.Storing.SecondaryEnergyInfo].cost){
				//logit('sending from here');
				logmsg('Switching back to primary job...', 'log');
				Drone.JobOptions.DoExtraJob = false;
				Drone.JobOptions.BlockMe = false;
				CTPRB = 0;
				Drone.JobOptions.JobPrimaryOrSecondary = "PrimaryEnergyInfo";	
				pausing(3,'<span class="good">Switching back to primary job in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
					});
				});
				return;
			}else{
				check_skills(checkit);
				return;
			}
		}
		if (isBandit()) {
			crewMembers = parseInt(document.getElementById('btn_queue').childNodes[0].childNodes[0].childNodes[2].innerHTML);
	        if ($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a').length == 0) {
				logmsg('<span class="bad">MW Not displaying Bandit properly!</span>', 'log');
				pausing(3,'<span class="good">Traveling in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
					});
				});
				return;
			}
			document.getElementById("SBTD").style.display = '';
			var sillyBTimer = $('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-timer').text();
			var texBandit = parseInt(sillyBTimer);
			if(isNaN(texBandit)){
				sillyBTimer = 'Not detected';
				texBandit = parseInt(BUBT);
			}else{
				BUBT = sillyBTimer;
			}
	        if (crewMembers == 0) {
				logmsg('<span class="bad">Not Killing '+Bandit_type+'... Because no Crew!</span>', 'log');
				BanditPassIs = false;
				BUBT = 6;
				Drone.updateStats(1, 'BanditsTotal');
				pausing(5*60,'<span class="good">Waiting out '+Bandit_type+'.. Restarting in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
					});
				});
				return;
	        }
			if(Bandit_type == "Job Bandit"){
				Drone.updateStats(1, 'BanditsTotal');
				if(Drone.Storing.BanditJob){
					logmsg('<span class="bad">Attempting to Kill '+Bandit_type+'...</span>', 'log');
					Bandit_Elim.click();
					BanditPassIs = false;
					BUBT = 6;
					Drone.updateStats(1, 'BanditsKilled');
					pausing(3,'<span class="good">Refreshing Tab in </span>',function(){
						Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
							SetDiv('nrg')
						});
					});
					return;
				}else{
					logmsg('<span class="bad">Not Killing '+Bandit_type+'...</span>', 'log');
					BanditPassIs = false;
					BUBT = 6;
					pausing(5*60,'<span class="good">Waiting out '+Bandit_type+'.. Restarting in </span>',function(){
						Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
							SetDiv('nrg')
						});
					});
					return;
				}
			}else if(Bandit_type == "Cash Bandit"){
				if(Drone.Storing.lolzatcash){
					setTimeout(doenergyjobnow, 50);
					BanditPassIs = true;
					if(!CashBanditCount){
						CashBanditCount = true;
						Drone.updateStats(1, 'BanditsTotal');
					}
					return;
				}
				if(!Drone.Storing.BanditGamblerCSH || texBandit <= Drone.Storing.BanditElapsedTimerCash){
					logmsg('<span class="bad">Attempting to Kill '+Bandit_type+'...</span>', 'log');
					Bandit_Elim.click();
					BanditPassIs = false;
					BUBT = 6;
					Drone.updateStats(1, 'BanditsKilled');
					Drone.updateStats(1, 'BanditsTotal');
					pausing(3,'<span class="good">Refreshing Tab in </span>',function(){
						Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
							SetDiv('nrg')
						});
					});
					return;
				}
			}else if(Bandit_type == "XP Bandit"){
				if(!Drone.Storing.BanditGamblerXP || texBandit <= Drone.Storing.BanditElapsedTimerXP){
					logmsg('<span class="bad">Attempting to Kill '+Bandit_type+'...</span>', 'log');
					Bandit_Elim.click();
					BanditPassIs = false;
					BUBT = 6;
					Drone.updateStats(1, 'BanditsKilled');
					Drone.updateStats(1, 'BanditsTotal');
					pausing(3,'<span class="good">Refreshing Tab in </span>',function(){
						Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
							SetDiv('nrg')
						});
					});
					return;
				}
			}
			BanditPassIs = true;
	    }
		if(!DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isOldCity){
			if($('#job-id-'+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length == 0){
				BanditPassIs = false;
				BUBT = 6;
				CashBanditCount = false;
				document.getElementById("SBTD").style.display = 'none';
			}
		}
		setTimeout(doenergyjobnow, 50);
	}
	
	function crewpostr(){
		crewposted = 0;
		return false;
	}
	
	function AjxCrewRequest(url, handler, errorhandler) {
        var xw_city = /xw_city=(\d+)/.exec(document.body.innerHTML)[1];  
        var AjaxErrorCount = 0;
		if(url.indexOf('html_server.php') >= 0){
			url = url.substr(url.indexOf('?')+1);
		}
        User.clicks++;
        var params = {
            'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': User.id,
            'sf_xw_sig': local_xw_sig,
            'xw_client_id': 8,
            'xw_city': xw_city,
            'skip_req_frame': 1,
            'clicks': User.clicks
        };
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';

        function processRequest() {
            $.ajax({
                type: "POST",
                url: preurl+url,
                data: params,
                cache: false,
                success: function (e) {
                    handler(e)
                },
                timeout: 30000,
                error: function (msg) {
                    AjaxErrorCount++;
                    if(AjaxErrorCount > 5) {
                        return false;
                    } else {
                        setTimeout(function () {
                            processRequest();
                        }, 333)
                    }
                }
            });
        }
        processRequest()
    }
	
	function ChangeToSecondary(){
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		if(!Drone.JobOptions.DoExtraJob){
			if((DoesIHaveEnergy <= Drone.Storing.NormalUntillValue||DoesIHaveEnergy < DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].cost) && DoesIHaveEnergy >= DroneXJobMap[Drone.Storing.SecondaryEnergyInfo].cost && Drone.JobOptions.NormalUntillJob){
				Drone.JobOptions.DoExtraJob = true;
				return true;
			}else if(Drone.Check.CombinedRatios <= Drone.Storing.RatioingJobValue && Drone.JobOptions.RatioingJob && DoesIHaveEnergy > DroneXJobMap[Drone.Storing.SecondaryEnergyInfo].cost){
				Drone.JobOptions.DoExtraJob = true;
				return true;
			}
		}
		return false;
	} 
	
	function ChangeToPrimary(){
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
		if(Drone.JobOptions.DoExtraJob){
			if ((DoesIHaveEnergy > Drone.Storing.NormalUntillValue || DoesIHaveEnergy > DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].cost && DoesIHaveEnergy < DroneXJobMap[Drone.Storing.SecondaryEnergyInfo].cost) && Drone.JobOptions.NormalUntillJob){
				Drone.JobOptions.DoExtraJob = false;
				return true;
			}else if(Drone.Check.CombinedRatios > Drone.Storing.RatioingJobValue && DoesIHaveEnergy > DroneXJobMap[Drone.Storing.PrimaryEnergyInfo].cost && DoesIHaveEnergy < DroneXJobMap[Drone.Storing.SecondaryEnergyInfo].cost && Drone.JobOptions.RatioingJob){
				Drone.JobOptions.DoExtraJob = false;
				Drone.JobOptions.BlockMe = true;
				CTPRB = DoesIHaveEnergy;
				return true;
			}else if (Drone.Check.CombinedRatios > Drone.Storing.RatioingJobValue && Drone.JobOptions.RatioingJob){
				Drone.JobOptions.DoExtraJob = false;
				return true;
			}
		}
		return false;		
	}
	
	function isBandit(){
		if(!DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isOldCity){
			if ($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length > 0) {
				crewMembers = parseInt(document.getElementById('btn_queue').childNodes[0].childNodes[0].childNodes[2].innerHTML);
				Bandit_type = $('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').children('.bandit-wrapper-inner').children('.bandit-desc').text();
				Bandit_Elim = $('#job-id-'+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-'+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).find('.bandit-eliminate-btn > a');
				return true;
			}
		}else{
			return false;
		}
	}
	
	function doenergyjobnow() {
//	    if (Drone.Check.AmAwake) {
//	        return;
//	    }
//	    Drone.Check.AmAwake = true;
//	    setTimeout(ResetR, 700);
		var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	    var DoesIHaveStamina = parseInt(document.getElementById('user_stamina').innerHTML);
	    var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		CloseDoopidPopup();
	    if(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isUsingButton) {
	        var clickMe = document.getElementById('btn_dojob_' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button);
	        if (clickMe == null) {
				logmsg('<span class="bad">Url Not Found!</span>', 'log');
				pausing(3,'<span class="good">Traveling in </span>',function(){
					Dotravel(DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].city, 'job', DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].tab, function(){
						SetDiv('nrg')
					});
				});
				return;
	        }
	        var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
	        var DoesIHaveExp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
			clickMe.click()
            Drone.updateStats(1, 'JobsDone');
			logmsg('Doing Job: <font color="gold">'+DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].name+'</font>', 'status');
            logmsg('Repeating Job..', 'log');
//			if(Drone.Storing.JobsPerSecondSpeed > 1 && JobSC < Drone.Storing.JobsPerSecondSpeed && $('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length != 1){
			if(Drone.Storing.JobsPerSecondSpeed > 1 && JobSC < Drone.Storing.JobsPerSecondSpeed && DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].cost * Drone.Storing.JobsPerSecondSpeed <= DoesIHaveEnergy && DoesIHaveExp > DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].isTheXP * Drone.Storing.JobsPerSecondSpeed){
				if($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length > -1 && BanditPassIs){
					JobSC++;
					setTimeout(doenergyjobnow, Drone.Storing.JobsPerSecond);
					return;
				}else if($('#job-id-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children('.job_additional_results').children('#loot-bandit-' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button).children().children('.bandit-wrapper').length == 0){
					JobSC++;
					setTimeout(doenergyjobnow, Drone.Storing.JobsPerSecond);
					return;
				}
			} 
            setTimeout(PreJob, 1000);
            return;
	    }else{
			Drone.updateStats(1, 'JobsDone');
			logmsg('Doing Job..', 'status');
			logmsg('Repeating Job..', 'log');
	        $('#city_job_' + DroneXJobMap[Drone.Storing[Drone.JobOptions.JobPrimaryOrSecondary]].button + ' > .job_action > a').click();
	        setTimeout(PreJob, 1000);
	        return;
	    }
	}
	
        function BUPreJob(){
                if(Drone.Running.Paused){
                        return;
                }
                var DoesIHaveEnergy = parseInt(document.getElementById('user_energy').innerHTML);
                if(DoesIHaveEnergy > (BUEEC+10)){
                        logmsg('<span class="good">Levelup Attempt Successful..</span>', 'log');
                        check_skills(checkit);
                        return;
                }
                if(DoesIHaveEnergy < DroneXBUJobMap[Drone.Storing.BUEnergyInfo].cost){
                        logmsg('<span class="bad">Levelup Attempt Failed!..</span>', 'log');
                        check_skills(checkit);
                        return;
                }
                spendSkillsChkr();
                if (/These loot drops are needed for this job/.test(document.body.innerHTML)) {
                clcikbutton('<span class="bad">Not enough consumables..</span>');
                return;
            }
            if (/You do not have enough cash to do this job/.test(document.body.innerHTML)) {
                clcikbutton('<span class="bad">Not enough cash..</span>');
                return;
            }
                if (/- Locked/.test(document.body.innerHTML)) {
                        clcikbutton('<span class="bad">Secret District Not unlocked!</span>');
                        return;        
                }
                if (/There are no secret districts currently open!/.test(document.body.innerHTML)) {
                        clcikbutton('<span class="bad">Secret District Expired..</span>');
                        return;        
                }      
                if (/MW: This link has expired. Please reload./.test(document.body.innerHTML)) {
                logmsg('<span class="bad">Refreshing Session!</span>', 'log');
                        pausing(3,'<span class="good">Traveling in </span>',function(){
                                Dotravel(DroneXBUJobMap[Drone.Storing.BUEnergyInfo].city, 'job', DroneXBUJobMap[Drone.Storing.BUEnergyInfo].tab, function(){
                                        SetDiv('BUnrg')
                                });
                        });
                        return;
            }          
                if (/Your session has timed out. Click any button to resume playing./.test(document.body.innerHTML)) {
                logmsg('<span class="bad">Refreshing Session!</span>', 'log');
                        pausing(3,'<span class="good">Traveling in </span>',function(){
                                Dotravel(DroneXBUJobMap[Drone.Storing.BUEnergyInfo].city, 'job', DroneXBUJobMap[Drone.Storing.BUEnergyInfo].tab, function(){
                                        SetDiv('BUnrg')
                                });
                        });
                        return;
            }          
                if (DroneXBUJobMap[Drone.Storing.BUEnergyInfo].isUsingButton) {
                        var clickMe = document.getElementById('btn_dojob_' + DroneXBUJobMap[Drone.Storing.BUEnergyInfo].button);
                        clickMe.click();
                }else{
                        $('#city_job_' + DroneXBUJobMap[Drone.Storing.BUEnergyInfo].button + ' > .job_action > a').click();
                }
                Drone.updateStats(1, 'JobsDone');
                logmsg('Doing Backup Job: <font color="gold">'+DroneXBUJobMap[Drone.Storing.BUEnergyInfo].name+'</font>', 'status');
            logmsg('Repeating Backup Job..', 'log');
                setTimeout(BUPreJob, 1000);
                CloseDoopidPopup();
        }
	
	function CloseDoopidPopup(){
		var actulevel = $('#user_level').text();
		if (actulevel != Drone.CurrentLevel && Drone.Check.LevelupPause == 0){
			Drone.Check.LevelupPause = 1;
			Drone.CurrentLevel = $('#user_level').text();
			setTimeout(mehleveler, 5000);
			grab_bonus();
		}
		if($('.pop_bg').length>0){
			$('.pop_bg').each( function(){
				var id = this.id;
				MW.Popup.hide( id.substr( id.lastIndexOf("_") +1 ) );
			});
		}
	}	
/*End Jobbing Code*/
	function mehleveler(){
		Drone.Check.LevelupPause = 0;
	}
	
	function grab_bonus() {
		if(Drone.Running.Paused){
			return;
		}
		DXLVLRequest('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city=1&mwcom=1&no_load=1&xw_client_id=8',function(page){
			if (page.indexOf('ERROR 500: response never closed')!=-1) {
				if(erz500 > 2){
//					logmsg('Err 500z, max out, stopping...', 'log');
					erz500 = 0;
					return;
				}
//				logmsg('Err 500z, retrying', 'log');
				erz500++;
				grab_bonus();
				return;
			} else {
				erz500 = 0;
				var data = JSON.parse(page.replace(/^(\s\d\s+)/,''));
				temp='';
				loot_log = [];
				temp = data.bonusName;
				temp = temp.replace(/A MYSTERY SHIPMENT CONTAINING /g,'');
				tehcount = 1;
/*				if(temp.match(/2 ANIMAL FEEDS/g)){
					tehcount = 2;
					temp = temp.replace(/^\d+\s+/,'');
				}else if(temp.match(/5 ANIMAL FEEDS/g)){
					tehcount = 5;
					temp = temp.replace(/^\d+\s+/,'');
				}
*/				if(temp.match(/2 /g)){
					tehcount = 2;
					temp = temp.replace(/^\d+\s+/,'');
				}else if(temp.match(/5 /g)){
					tehcount = 5;
					temp = temp.replace(/^\d+\s+/,'');
				}else if(temp.match(/3 /g)){
					tehcount = 3;
					temp = temp.replace(/^\d+\s+/,'');
				}				
				temp = temp.replace(/A /g,'');
				temp = temp.replace(/1 /g,'');
				temp = temp.replace(/AN /g,'');
				temp = temp.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
				if(temp.match(/ATTACK /g)){
					loot_img = 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/levelUpBonus/milestone-icon-atk-1.png';
				}else if(temp.match(/DEFENSE /g)){
					loot_img = 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/levelUpBonus/milestone-icon-def-1.png';
				}else{
					loot_img = data.bonusImage;
				}
				Add_to_loot(temp,tehcount,loot_img);
				loot_log[loot_log.length] =  '<img src="'+loot_img+'" style="width: 20px; height: 20px;"></img> '+temp;
				logmsg('<span class="good">Level <font color="gold">'+data.user_fields.user_level+'</font> You received: <font color="gold">'+data.bonusName+'</font></span>', 'log');
				Drone.updateStats(1, 'Levelscleared');
			}
		});
	};
	
	function Add_to_loot(loot,count,img){
		total_loot+=count;
		if(loot_item.length <= 0){
			loot_item[loot_item.length]=new Array(loot,count,img);
		} else{
			for(i=0; i<loot_item.length; i++){
				if(loot == loot_item[i][0]){
					loot_item[i][1]+=count;
					break;
				}else if(i==loot_item.length-1){
					loot_item[loot_item.length]=new Array(loot,count,img);
					break;
				}
			}
		}
		loot_item.sort();
		document.getElementById('loot_log').innerHTML = '';
		loot_item.reverse();
		try{
			l_log = '';
			for(l=(loot_item.length-1); l>=0; l--){
				l_log += '<span class="good">'+loot_item[l][1]+'x</span> <img src="'+loot_item[l][2]+'" style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> '+loot_item[l][0]+'<br>';
			}
			document.getElementById('loot_log').innerHTML = l_log;
		}catch(err){alert(err);}
	}	
	
	function DXLVLRequest(url, handler, errorhandler) {
		if(Drone.Running.Paused){
			return;
		}
		ajax_error = 0;
		if(url.indexOf('html_server.php') >= 0){
			url = url.substr(url.indexOf('?')+1);
		}
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			timeout: 10000,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}
		
	function spendSkillsChkr() {
		if(Drone.Running.Paused){
			return;
		}
		if(SkillPointAssinRunning){
		//	logit('SkillPoint In Progress, Blocked!')
			return;
		}
		SPAvaiable = parseInt($('#user_skill').text());
		if(SPAvaiable > 0 && Drone.Storing.SkillToSpend != 'none'){
			SkillPointAssinRunning = true;
			SpendSkillCycle();
		}
	}
		
	function SpendSkillCycle() {
		if(Drone.Running.Paused){
			return;
		}
		if(Drone.Storing.SkillToSpend == 'none'){
			SkillPointAssinRunning = false;
			return;
		}
	//	logit('Applying SkillPoints In Progress!')
		var url;
		var SkillPointNum;
		if(SPAvaiable >= 5 && SPAvaiable < 25){
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+Drone.Storing.SkillToSpend+'&upgrade_amt=5&no_load=1&source=level_up_popup';
		}else if(SPAvaiable >= 25 && SPAvaiable < 100){
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+Drone.Storing.SkillToSpend+'&upgrade_amt=25&no_load=1&source=level_up_popup';
		}else if(SPAvaiable >= 100){
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+Drone.Storing.SkillToSpend+'&upgrade_amt=100&no_load=1&source=level_up_popup';
		}else{
			url = 'xw_controller=stats&xw_action=upgrade&xw_city=7&upgrade_key='+Drone.Storing.SkillToSpend+'&upgrade_amt=1&no_load=1&source=level_up_popup';
		}
		if(url.match(/&upgrade_amt=5/g)){
			SkillPointNum = '5 Skillpoints';
		}else if(url.match(/&upgrade_amt=25/g)){
			SkillPointNum = '25 Skillpoints';
		}else if(url.match(/&upgrade_amt=100/g)){
			SkillPointNum = '100 Skillpoints';
		}else if(url.match(/&upgrade_amt=1&/g)){
			SkillPointNum = '1 Skillpoint';
		}
		DXSRequest(url,function(msg){
			if(Drone.Running.Paused){
				return;
			}
			logmsg('<span class="good">Applied <font color="gold">'+SkillPointNum+'</font> to:</span> <font color="gold">'+SkillsTo+'</font>', 'log')
			try{
				var data = JSON.parse(msg);
				user_fields_update(data.user_fields);
                user_info_update(data.user_fields, data.user_info);
				SPAvaiable = parseInt(data.user_fields.user_skill);
				if(SPAvaiable == 0){
					SkillPointAssinRunning = false;
//					logit('grabbing bonus')
					grab_bonus();
				}else{
					SpendSkillCycle();
				}
			}catch(errz){
//				logit('Failed!')
				setTimeout(SpendSkillCycle, 333);
			}
		});
	}
	
	function DXSRequest(url, handler, errorhandler) {
		if(Drone.Running.Paused){
			return;
		}	
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}
	
	function UpdateCashInHand(){
		var Currcity = MyLocation();
		switch (parseInt(Currcity)) {
			case 1:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g, '').replace(/\$/g, '');
				break;
			case 2:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g, '').replace(/C\$/g, '');
				break;
			case 3:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g, '').replace(/R\$/g, '');
				break;
			case 4:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g, '').replace(/B\$/g, '');
				break;
			case 5:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g, '').replace(/V\$/g, '');
				break;
			case 6:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_italy').innerHTML.replace(/,/g, '').replace(/L\$/g, '');
				break;
			case 7:
				Drone.BankInfo.cash_in_hand = document.getElementById('user_cash_brazil').innerHTML.replace(/,/g, '').replace(/BRL\$/g, '');
				break;
			case 8:
				var ModifyChicagoSign = document.getElementById('user_cash_chicago').innerHTML.replace(/,/g, '');
				Drone.BankInfo.cash_in_hand = ModifyChicagoSign.substring(1);
				break;
			case 9:
				var ModifyLondnSign = document.getElementById('user_cash_london').innerHTML.replace(/,/g, '');
				Drone.BankInfo.cash_in_hand = ModifyLondnSign.substring(1);
				break;
			case 10:
				var ModifySASign = document.getElementById('user_cash_southafrica').innerHTML.replace(/,/g, '');
				Drone.BankInfo.cash_in_hand = ModifySASign.substring(1);
				break;
		}
		if(isNaN(Drone.BankInfo.cash_in_hand)){
			Drone.BankInfo.cash_in_hand = 0;
		}
	}
	
	function BastardTehBanker() {
		if(BBlock == 0){
			BBlock = 1;
			var Currcity = MyLocation();
			if (Currcity == 1||Drone.BankInfo.cash_in_hand < Drone.Storing.BankAmount) { 
				BBlock = 0;
				return;
			}
			var url = 'html_server.php?xw_controller=bank&xw_action=deposit_all&xw_city=' + Currcity + '&amount='+Drone.Storing.BankAmount;
			var params = {
				'ajax': 1,
				'liteload': 1,
				'sf_xw_user_id': User.id,
				'sf_xw_sig': local_xw_sig
			};
			$.ajax({
				type: "POST",
				url: url,
				timeout: 30000,
				data: params,
				success: function (response) {
					if ((/user_cash_nyc":"([$\d,]+)"/.test(response))) {
						document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
						document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
						document.getElementById("user_cash_london").innerHTML = '£' + (/user_cash_london":"\\u00a3([\d,]+)"/.exec(response))[1];
						document.getElementById("user_cash_chicago").innerHTML = '¢' + (/user_cash_chicago":"\\u00a2([\d,]+)"/.exec(response))[1];
						document.getElementById("user_cash_southafrica").innerHTML = (/user_cash_southafrica":"([R \d,]+)"/.exec(response))[1];	
					}
				}
			});
			logmsg('Banked Some money..', 'log');
			setTimeout(Bankrr, 10000);
		}
	}

	function Bankrr(){
		BBlock = 0;
	}
	
	function MyLocation(){
		var here = /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1]; 
		return here;
	}
	
	function RatioChecker(isArena) { 
		var CurrentNRG = parseInt(document.getElementById('user_energy').innerHTML);
		var CurrentSTAM = parseInt(document.getElementById('user_stamina').innerHTML);
		if(isArena){
			CurrentSTAM = parseInt($('#arena_me_st').text());
		}
		var CurrentXP2LVL = parseInt(document.getElementById('exp_to_next_level').innerHTML);
		var NRGRATIOMATH = (CurrentXP2LVL/CurrentNRG);
		var STAMRATIOMATH = (CurrentXP2LVL/CurrentSTAM);
		var combinedEn2xp = (CurrentXP2LVL/(CurrentNRG+CurrentSTAM));
		Drone.Check.CurrentEnergyRatio = NRGRATIOMATH.toFixed(2);
		Drone.Check.CurrentStamRatio = STAMRATIOMATH.toFixed(2);
		Drone.Check.CombinedRatios = combinedEn2xp.toFixed(2); 
		document.getElementById('nrg_ratio_reqd').innerHTML = NRGRATIOMATH.toFixed(2);
		document.getElementById('sta_ratio_reqd').innerHTML = STAMRATIOMATH.toFixed(2);
		document.getElementById('comb_ratio_reqd').innerHTML = combinedEn2xp.toFixed(2);
	}

	function update_user_scores() {
		try{
			document.getElementById('DX_atk_ttl').innerHTML = Drone.userStats.group_atk;
			document.getElementById('DX_def_ttl').innerHTML = Drone.userStats.group_def;
			var attack_change = parseInt(parseInt(Drone.userStats.group_atk) - parseInt(Drone.userStats.start_group_atk));
			var ac_elt = document.getElementById('DX_atk_inc');
			if (attack_change >= 0) {
				ac_elt.innerHTML = '+' + attack_change;
				ac_elt.className = 'good';
			} else if (attack_change < 0) {
				ac_elt.innerHTML = attack_change;
				ac_elt.className = 'bad';
			}
			var defense_change = parseInt(parseInt(Drone.userStats.group_def) - parseInt(Drone.userStats.start_group_def));
			var dc_elt = document.getElementById('DX_def_inc');
			if (defense_change >= 0) {
				dc_elt.innerHTML = '+' + defense_change;
				dc_elt.className = 'good';
			} else if (defense_change < 0) {
				dc_elt.innerHTML = defense_change;
				dc_elt.className = 'bad';
			}
        }catch(err){
			if(DebugIt){logit('Stats Div not found.');}
		}
    }
	
	$("body").ajaxComplete(function (e, xhr, settings) {
		if(CJSO){
			bringupjobinfo();
		}
		if(!Drone.Running.Paused){
			var response = xhr.responseText;
			if ((/"group_atk"/.test(response))) {
				var b = eval('(' + response + ')');
				Drone.userStats.group_atk = b.fightbar.group_atk;
				Drone.userStats.group_def = b.fightbar.group_def;
				if(Drone.userStats.firstRun) {
					Drone.userStats.start_group_atk = b.fightbar.group_atk;
					Drone.userStats.start_group_def = b.fightbar.group_def;
					Drone.userStats.firstRun = false;
				}
				update_user_scores();
			}
		}
    });
/*Lazy Build for a test account...*/	
	var mylazybk = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
	if (mylazybk == 'p|150195276') {
		do_ajax('', 'remote/html_server.php?xw_controller=PropertyV2&xw_action=craft&xw_city=8&city_id=1&building_type=11&page_click=home_page&requesttype=json&recipe=5');
		do_ajax('', 'remote/html_server.php?xw_controller=PropertyV2&xw_action=craft&xw_city=8&city_id=1&building_type=12&page_click=home_page&requesttype=json&recipe=22');
		do_ajax('', 'remote/html_server.php?xw_controller=PropertyV2&xw_action=craft&xw_city=8&city_id=1&building_type=13&page_click=home_page&requesttype=json&recipe=37');
		do_ajax('', 'remote/html_server.php?xw_controller=PropertyV2&xw_action=craft&xw_city=8&city_id=1&building_type=14&page_click=home_page&requesttype=json&recipe=69');
		do_ajax('', 'remote/html_server.php?xw_controller=PropertyV2&xw_action=craft&xw_city=8&city_id=1&building_type=15&page_click=home_page&requesttype=json&recipe=116');
	}
	
/*Auto Start*/	
	if(Drone.Storing.isAutoRun){
		$('#DroneXStatus').html(timestamp('true')+' Drone Autostarting in 10 seconds... <a href="#" id="DXAUTO">(Stop!)</a>');
		$('#DXAUTO').click(function(){
			$('#DroneXStatus').html('Auto Start Stopped!');
			AutostartStopped = true;
			return false;
		});
		setTimeout(DXAS, 10000);
	}
	
	function DXAS(){
		if(!AutostartStopped){
			document.getElementById("DroneStart").click()
		}
	}
/*Start Saving Settings to Local Storage*/	
	function writeSettings(){
		try{
			if (document.getElementById('SpecialChars').value != '') {
				var a = document.getElementById('SpecialChars').value.split(/\n/g);
				Drone.Storing.Blacklist = new Array();
				for(var i = 0; i < a.length; i++){
					Drone.Storing.Blacklist[i] = escape(a[i])
				}
			}
		}catch(err){}
		if(wazfirst){
			wazfirst = false;
			try{localStorage.removeItem("DroneX_CJ55");}catch(errr){}
		}else{
			document.getElementById("SettingsNoti").style.display = 'none';
			Drone.Storing.hazseen = true;
		}
		localStorage.setItem("DroneX55", JSON.stringify(Drone.Storing));
	}

	function readSettings(){
		if (!localStorage.getItem("DroneX55")) { 
			wazfirst = true;
			writeSettings();
		} else {
			wazfirst = false;
			tempsettings = JSON.parse(localStorage.getItem("DroneX55"));
			if( Object.keys(tempsettings).length != Object.keys(Drone.Storing).length ) { 
				wazfirst = true;
				writeSettings();
			} else{
				Drone.Storing = tempsettings;
			}
		}
	}
/*End Saving Settings to Local Storage*/
};
injectScript(myscript);