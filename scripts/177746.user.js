// ==UserScript==
// @name       KingdomsTool
// @namespace  http://rkTool/
// @version    1.1
// @description Renaissance Kingdoms automatic work tool + menu
// @include    http://*.renaissancekingdoms.com/*
// @include    http://*.krolestwa.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @copyright  2013, jabiel
// ==/UserScript==

if(typeof maybeObject!='undefined'){
    console.log('already ex');
   }

var rkTool = (function() {
	var tmr1;
    var timerEnabled = GM_getValue('timerEnabled', true);
    var timerGlobal = 0;
    var timerAction = 0;
    var timerRandom = 10;
    var loggedIn = true;
    var labels = {};
    

	function startWork(duration)
    {
        $('body').append('<form id="myStartWork" action="Action.php?action=338&amp;n=624&amp;t=mine" method="POST"><input type="hidden" name="duree" value="'+duration+'" id="Mine624"></form>');
        $('#myStartWork').submit();
    }
    
    function isWorking()
    {
        if($('#jaugeActivite').length)
        {
            return $('#jaugeActivite').is(':visible');
        }
             
        return false;
    }

    
    function tmrSecnd()
    {
        if (!timerEnabled)
            return;
        timerGlobal++;
        
        if(timerRandom > 0)
        {
            timerRandom = timerRandom -1;
        }
        else 
        {
            if(timerGlobal < 15) 
            {
                quickAction();
            } else
            {
                
                if(timerGlobal > 240)
                {
                	window.location.href = 'http://www.krolestwa.com/EcranPrincipal.php?l=2';
                }
                
                if(!isWorking())
                {
                	startWork(1);
                }
            }
            timerRandom = Math.floor((Math.random()*10)+1) * 20;
        }
            
        
        $('#tmr-status').text(timerRandom);
    }
        
    function quickAction()
    {
        if(!loggedIn)
        {
            window.location.href = $('.FBconnect').attr('href');
        }
        
        if(isWorking())
        {
            $("#myspan1").text('Status: working');
        } else
        {
            $("#myspan1").text('Status: not working, trying to start work');
        }
    }
    
    function drawMenuStyle()
    {
        var iStyle = null;
        var elStyle = document.createElement("style");
        var s ="";
        s+="#pub{padding:5px;z-index=99;overflow:visible;}";
        s+="#nav, #nav ul {padding: 0;margin: 0;list-style: none;line-height:1;z-index:999999;}";
        s+="#nav a {display: block;width: 10em;margin:3px;z-index:999999;}";
        s+="#nav li {float: left;width: 10em;background:#FFFFDF;border:1px solid black;padding:3px 0 3px 0;height:15px;z-index:999999}";
        s+="#nav li li {background:#F3EBBC;z-index:999999}";
        s+="#nav li ul {position: absolute;width: 10em;left: -999em;margin-left:-3px;z-index:999999}";
        s+="#nav li ul ul {margin: -17px 0 0 10em;z-index:999999}";
        s+="#nav li:hover ul ul{left: -999em;}";
        s+="#nav li:hover ul, #nav li li:hover ul {left: auto;}";
        
        elStyle.innerHTML=s;
        document.body.insertBefore(elStyle, iStyle);
    }
    
    function drawMenuLink(id, label, param)
    {
        if(param)
            param = "&"+param;
        else 
            param = "";
        return "<li><a href='EcranPrincipal.php?l="+id+param+"'>"+label+"</a></li>";    
    }
    
    function translateTo(l)
    {
        labels.My = "Me";
        labels.MyPlace = "My place";
        labels.MyPlaceInventory = "Place inventory";
        labels.MyField1 = "My field 1";
        labels.MyField2 = "My field 2";
        labels.MyInventory = "My inventory";
        labels.MyMail = "My mail";
        labels.MyEvents = "Events";
        labels.Job = "Jobs";
        labels.Town = "Town";
        labels.Townhall = "Townhall";
        labels.JobOffers = "Job offers";
        labels.BuyLand = "Buy land";
        labels.Votes = "Elections";
        
        labels.Market = "Market";
        labels.Taxes = "Taxes";
        labels.Medics = "Medics";
        labels.Galleries = "Galleries";
        labels.Pubs = "Pubs";
        labels.Hurch = "Hurch";
        labels.Castle = "Castle";
        labels.Courd = "Court";
        labels.Univerity = "Univerity";
        labels.Surroundings = "Surroundings";
        labels.Shortcuts = "My shortcuts";
        
        if(l == "pl")
        {
            labels.My = "Ja";
            labels.MyPlace = "Moja posiadłości";
            labels.MyPlaceInventory = "Inwentarz posiadłości";
            labels.MyField1 = "Moje pole 1";
            labels.MyField2 = "Moje pole 2";
            labels.MyInventory = "Mój stan posiadanie";
            labels.MyMail = "Moja poczta";
            labels.MyEvents = "Wydarzenia";
            labels.Job = "Praca";
            
            labels.Town = "Miasto";
            labels.Townhall = "Ratusz";
            labels.JobOffers = "Oferty pracy";
            labels.BuyLand = "Handel gruntami";
            labels.Votes = "Wybory";
            
            labels.Market = "Targ";
            labels.Taxes = "Podatki";
            labels.Medics = "Lekarze";
            labels.Galleries = "Galerie";
            labels.Pubs = "Karczmy";
            labels.Hurch = "Kosciół";
            labels.Castle = "Zamek";
            labels.Courd = "Sąd";
            labels.Univerity = "Uniwersytet";
            labels.Surroundings = "Okolice";
            labels.Shortcuts = "Moje skróty";
        } 
    }
    
    function drawMenu()
    {
    var m ="";
	m += "<div style='float:left;z-index:9999999;padding-top:6px;padding-left:2px;'><ul id='nav'>";
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=2'>"+labels.My+"</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=1'>"+labels.MyPlace+"</a>";
					m+="<ul>";
					    m+=drawMenuLink(1, labels.MyPlaceInventory, "a=1");
					    m+=drawMenuLink(1, labels.MyField1, "a=2");
					    m+=drawMenuLink(1, labels.MyField2, "a=3");
					m+="</ul>";
				m+="</li>";
				m+=drawMenuLink(2, labels.MyInventory, "a=1");
				m+=drawMenuLink(2, labels.MyMail, "a=2");
				m+=drawMenuLink(2, labels.MyEvents, "a=3");
				m+=drawMenuLink(8, labels.Job, "a=1");

			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=0'>"+labels.Town+"</a>";
			m+="<ul>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=3'>"+labels.Townhall+"</a>";
					m+="<ul>";
					   m+=drawMenuLink(3, labels.Votes, "a=1");
					   m+=drawMenuLink(3, labels.JobOffers, "a=2");
					   m+=drawMenuLink(3, labels.BuyLand, "a=3");
					m+="</ul>";
				m+="</li>";
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=6'>"+labels.Market+"</a>";
					m+="<ul>";
						m+=drawMenuLink(6, labels.Taxes, "a=1");
						m+=drawMenuLink(6, labels.Medics, "a=2");
						m+=drawMenuLink(6, labels.Galleries, "a=3");
					m+="</ul>";
				m+="</li>";
				m+=drawMenuLink(5, labels.Pubs);
				m+=drawMenuLink(4, labels.Hurch);
				m+=drawMenuLink(7, labels.Castle);
				m+=drawMenuLink(7, labels.Courd, "a=1");
				m+=drawMenuLink(7, labels.Univerity, "a=2");
				m+="<li>";
					m+="<a href='EcranPrincipal.php?l=8'>"+labels.Surroundings+"</a>";
					m+="<ul>";
						m+=drawMenuLink(8, labels.Job, "a=1");
						m+=drawMenuLink(8, "Grupy i armie", "a=2");
						m+=drawMenuLink(8, "Info o miastach", "a=3");
						m+=drawMenuLink(8, "Moja grupa", "a=4");
					m+="</ul>";
				m+="</li>";
			m+="</ul>";
		m+="</li>";
		
		m+= "<li>";
		m+= "<a href='EcranPrincipal.php?l=1'>"+labels.Shortcuts+"</a>";
			m+="<ul>";
			m+=drawMenuLink(8, labels.Job, "a=1");
			m+="</ul>";
		m+="</li>";

	m+="</ul></div>";
	
	$('.zoneHeaderRight').append(m);
	
    }
    
    

    
    return { // public interface
        Init: function () {
            console.log('rkTool.Init()');
        
            var lang = 'en';
            var url = window.location.href;
            if ( url.indexOf("krolestwa") >= 0)
                lang = "pl";
            translateTo(lang);
            
            
            if ($(".FBconnect").length){
                loggedIn = false;
            }
            
            if(loggedIn)
            {
                $('.decoCarteContainer').append('<div id="myContainer" style="background-color:white;position:absolute;top:5px;left:250px;width:220px;height:36px;text-align:left;padding:4px;"><div id="mypnl1"></div><span id="myspan1"></span></div>');
                
                $('#mypnl1').append('timer: <span id="tmr-status"></span> | <a href="javascript:" id="tmr-toggle">pause</a>');
                drawMenuStyle();
                drawMenu();
                               
            } else
            {
                $('body').append('<div id="myContainer" style="background-color:white;position:absolute;top:40%;left:40%;width:320px;height:56px;text-align:left;padding:4px;"><h1>You are logged OUT</h1>loging back in <span id="tmr-status"></span></div>');
            }
            
            $("#tmr-toggle").click(function(){
                timerEnabled = !timerEnabled;
                GM_setValue('timerEnabled',timerEnabled);
                
            });
            tmr1 = setInterval(function(){tmrSecnd()},1000);
            
        }
    };
})();


$(function(){
    rkTool.Init();
});

// usuwa reklamy
$('.espace_pub_contenu_2').remove();
$('.zonePubDroite').remove();
$('.nonNoble').removeClass('nonNoble');
$('.cadre_interieur_centre_pub').addClass('cadre_interieur_centre_nonpub').removeClass('cadre_interieur_centre_pub');
