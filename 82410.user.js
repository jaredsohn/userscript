// ==UserScript==
// @name	Pub's eRep Menu Fix
// @version	0.20
// @description	Adds links to the main menu that the admins forgot
// @author Publius
// @namespace http://www.erepublik.com/en/referrer/Publius
// @match http://www.erepublik.com/*
// @match http://economy.erepublik.com/*
// @include	http://www.erepublik.com/*
// @include http://economy.erepublik.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var lang = location.href.match(/\/[^w\/]\w+/)[0].substr(1,2);
    if($("div.xprank").text() == "Or"){
        //Smaller menu for orgs
        var org_number = $("a.citizen_name").attr("href").match(/\d+/)[0];
        $("#menu2 li").eq(1).after('<li id="secondtier"><a href="http://www.erepublik.com/'+lang+'/my-places/newspaper">Newspaper</a></li>'+
                                   '<li id="secondtier"><a href="' + $('.flagholder > a').attr('href') + '">Country Info Center</a></li>'+
                                   '<li id="secondtier"><a href="http://www.erepublik.com/'+lang+'/chat/rooms">Chat Rooms</a></li>');
        $("#menu2 li").eq(0).after('<li id="secondtier"><a href="http://economy.erepublik.com/'+lang+'/my-places/company/'+ org_number +'">My Companies</a></li>');
    }
    else{
        //Larger menu for citizens

        //Add locations
        $("#menu2 li").eq(1).after('<li id="secondtier"><a href="http://www.erepublik.com/'+lang+'/my-places/party">Party</a></li>'+
                                   '<li id="secondtier"><a href="http://www.erepublik.com/'+lang+'/my-places/newspaper">Newspaper</a></li>'+
                                   '<li id="secondtier"><a href="' + $('.flagholder > a').attr('href') + '">Country Info Center</a></li>'+
                                   '<li id="secondtier"><a href="http://www.erepublik.com/'+lang+'/chat/rooms">Chat Rooms</a></li>'+
                                   '<li id="secondtier"><a href="http://www.erepublik.com/'+lang+'/my-places/organizations">Organizations</a></li>');
        $("#menu2 li").eq(0).after('<li id="secondtier"><a href="http://economy.erepublik.com/'+lang+'/work">Company</a></li>'+
                                   '<li id="secondtier"><a href="http://economy.erepublik.com/'+lang+'/train">Training Grounds</a></li>'+
                                   '<li id="secondtier"><a href="http://economy.erepublik.com/'+lang+'/study">Library</a></li>'+
                                   '<li id="secondtier"><a href="http://economy.erepublik.com/'+lang+'/entertain">Residential District</a></li>');

        //Add treasure map
        $("#menu6 a").after('<ul><li><a href="http://www.erepublik.com/'+lang+'/treasure-map">Treasure Maps</a></li></ul>');
        $("#menu6 > ul > li > a").css({'background':'url("/images/parts/map-erepublik-logged.png") no-repeat scroll 0 -940px transparent', 'color':'#808080', 'display':'block', 'float':'left', 'font-size':'12px', 'height':'27px', 'padding':'13px 15px 0 28px', 'text-decoration':'none', 'width':'135px'});
        $("#menu6 > ul > li > a").hover(function(){
            this.style.background = 'url("/images/parts/map-erepublik-logged.png") no-repeat scroll 0 -899px transparent';
            this.style.color = '#FFFFFF';
            }, function() {
            this.style.background = 'url("/images/parts/map-erepublik-logged.png") no-repeat scroll 0 -940px transparent';
            this.style.color = '#808080';
        });
    }

    $("li#secondtier").css({'padding-left':'15px'});
    $("li#secondtier > a").css({'padding-right':'5px', '-moz-border-radius':'5px', '-webkit-border-radius':'5px', 'border-radius':'5px', 'width':'125px'});
    $("li#secondtier > a").hover(function(){
        this.style.background = '#53b3d3';
        }, function() {
        this.style.background = 'url("/images/parts/map-erepublik-logged.png") no-repeat scroll 0 -940px transparent';
    });
}

// load jQuery and execute the main function
addJQuery(main);
