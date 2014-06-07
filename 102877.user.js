scr_meta=<><![CDATA[ //auto-update data
// ==UserScript==
// @name            fonst00f
// @namespace      http://userscripts.org/users/332789
// @version v0.6
// @description    merger of fonrank and fonatk, plus whatever else I add.. lol.
// @include         *fallofnations.com*
// ==/UserScript==
]]></>.toString(); //auto-update data end
// filtering -- $($("#ranks").children().get(1)).children().each(function(i){that = $(this); if(that.children().get(5).innerHTML > 1){that.hide()}})
// 
//$($("#ranks").children().get(1)).children().each(function(i){that = $(this); karma = (-Math.ceil((((that.children().get(0).innerHTML-$("#statsRank").html().substr(1))/($("#ranks").children().children().length-1)*10)*10))/10); that.append($("<td>"+karma+"</td>"));})
//$($("#ranks").children().get(1)).children().each(function(i){that = $(this); console.log(((that.children().get(0).innerHTML-$("#statsRank").html().substr(1))))})
var $ = unsafeWindow.jQuery;
var done = true;
var rankeded = false;
if (/^.*?fallofnations\.com\/rankings\.asp\?.*?&hax=1/.test(unsafeWindow.location)) {
    done = false;
    rankeded = true;
    var ts = document.createElement('script');
    ts.src = "http://wedding.it202.net/images/jquery.tablesorter.min.js";
    ts.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(ts);
    delete ts;
    if ($("#profile")[0]) {
        document.getElementsByTagName("table")[3].id = "ranks";
    } else {
        document.getElementsByTagName("table")[2].id = "ranks";
    }
    var lolwait = document.createElement("div");
    lolwait.innerHTML = "Loading.";
    lolwait.style.backgroundColor = "blue";
    lolwait.id = "lolwait";
    $("#ranks").before(lolwait);
    delete lolwait;
    window.fetching = true;
    window.loadingWait = false;
    window.lawl = document;
    window.LOL_wait = function() {
        if (window.loadingWait && window.hasItLoaded) {
            window.loadingWait = false;
            window.lawl = tehframe.contentDocument;
            if ($("#profile")[0]) {
                var lolwut = window.lawl.getElementsByTagName("table")[3].childNodes[1];
            } else {
                var lolwut = window.lawl.getElementsByTagName("table")[2].childNodes[1];
            }
            lolwut.removeChild(lolwut.firstChild);
            var omnom = lolwut.getElementsByTagName("tr");;
            while(omnom.length) {
                omnom[0].setAttribute("class", "");
                document.getElementById("ranks").childNodes[1].appendChild(omnom[0]);
            }
        } else if (window.loadingWait && !window.hasItLoaded) {
            window.setTimeout(window.LOL_wait, 1000);
            return;
        }
        if (window.fetching) {
            window.hasItLoaded = false;
            if ($("#profile")[0]) {
                var zonk = window.lawl.getElementsByTagName("table")[2].childNodes[1].childNodes[0].childNodes[1].getElementsByTagName("a");
            } else {
                var zonk = window.lawl.getElementsByTagName("table")[1].childNodes[1].childNodes[0].childNodes[1].getElementsByTagName("a");
            }
            var next = false;
            if (zonk.length == 1 && zonk[0].innerHTML == "Next Page") {
                next = zonk[0].href;
            } else if (zonk.length == 2) {
                next = zonk[1].href;
            }
            if (next) {
                $("#fuckme").remove();
                tehframe = document.createElement('iframe');
                tehframe.src = next+"#ohgodno";
                tehframe.style.display = "none";
                tehframe.id = "fuckme";
                document.body.appendChild(tehframe);
                $("#fuckme").load(function() {
                    window.hasItLoaded = true;
                });
                window.loadingWait = true;
                window.setTimeout(window.LOL_wait, 1000);
                return;
            } else {
                window.fetching = false;
                wat = document.createElement('thead');
                wat.appendChild($('#ranks').children()[0].firstChild);
                if ($("#profile")[0]) $(wat.childNodes[0]).append($("<th>Karma</th>"));
                $('#ranks').prepend(wat);
                var soup = $("#ranks").children()[1].getElementsByTagName('tr');
                var nom;
                var totalwealth = 0;
                for (x=0;x<soup.length;x++) {
                    id = soup[x].childNodes[2].innerHTML.match(/user\.asp\?user=([0-9]+)/)[1];
                    soup[x].childNodes[0].innerHTML = /#([0-9]+)/.exec(soup[x].childNodes[0].innerHTML)[1];
                    soup[x].childNodes[1].innerHTML = soup[x].childNodes[1].innerHTML.replace(/,/g,'');
                    soup[x].childNodes[3].innerHTML = soup[x].childNodes[3].innerHTML.replace(/,/g,'');
                    soup[x].childNodes[4].innerHTML = soup[x].childNodes[4].innerHTML.replace(/,/g,'');
                    soup[x].childNodes[5].innerHTML = soup[x].childNodes[5].innerHTML.replace(/,/g,'');
                    wealth = soup[x].childNodes[6].innerHTML.replace(/.*>/g,'').replace(/,/g,'');
                    totalwealth += parseInt(wealth);
                    soup[x].childNodes[6].innerHTML = wealth;
                }
                $($("#ranks").parent().children()[3]).after("<b>Total wealth: " + totalwealth + "</b>");
                delete totalwealth;
                if ($("#profile")[0]) $($("#ranks").children().get(1)).children().each(function(i) {
                    that = $(this); 
                    karma = (-Math.ceil((((that.children().get(0).innerHTML-$("#statsRank").html().substr(1))/($("#ranks").children().children().length-1)*10)*10))/10); 
                    if (karma > 10) {
                        karma = 10;
                    }
                    that.append($("<td>"+karma+"</td>"));
                    delete karma;
                });
                $('#ranks').tablesorter({
                    headers: {
                        0: {sorter: 'ranks'},
                        1: {sorter: 'fuckingdecimal'},
                        3: {sorter: 'fuckingdecimal'},
                        5: {sorter: 'fuckingdecimal'},
                        6: {sorter: 'fuckingdecimal'}
                    }
                });
                $("#ranks").bind("sortStart",function() { 
                    $("#lolwait").show(); 
                }).bind("sortEnd",function() { 
                    $("#lolwait").hide(); 
                }); 
                $("#lolwait").hide();
                done=true;
                if(/loldongs/.test(unsafeWindow.location)) {
                    alert("Look, this is maybe cheating. It might not be allowed. Use at your own risk.");
                    $("#ranks").after("<table id='targets'></table>");
                    $("#targets").after("<a href='javascript:AndaleAndale()'>AndaleAndale</a>");
                    $("#targets").after("<table id='hits'></table>");
                    var soup = $("#ranks").children()[1].getElementsByTagName('tr');
                    for (x=0;x<soup.length;x++) {
                        id = soup[x].childNodes[2].innerHTML.match(/user\.asp\?user=([0-9]+)/)[1];
                        nammon = soup[x].childNodes[2].innerHTML.match(/<a.*?>(.*?)<\/a>/)[1];
                        soup[x].childNodes[2].innerHTML = soup[x].childNodes[2].innerHTML.replace(/\/user\.asp\?user=([0-9]+)/,'javascript:queue('+id+',\''+nammon+'\');');
                    }
                    unsafeWindow.queue = function(id, name) {
                        $("#targets").append("<tr><td><a href='javascript:nothing();' onClick='javascript:dequeue(this);'>" + name + "</a></td><td class='ids'>"+ id +"</td></tr>");
                    };
                    unsafeWindow.nothing = function() {};
                    unsafeWindow.dequeue = function(death) {
                        $(death.parentNode.parentNode).remove();
                    }
                    unsafeWindow.AndaleAndale = function() {
                        targets = $(".ids");
                        for(x=0;x<targets.length;x++) {
                            $.post('/game/index.asp?action=attack', { target: targets[x].innerHTML, type: 'both', turns: 15 }, function(t) {
                                var stats = t;
                                if (stats.error)
                                {
                                    alert(stats.error);
                                    return false;
                                }
                                $('#hits').append(stats);
                            }, 'json');
                        }
                    };
                }
            }
        }
    }
    function GM_wait() {
        if (typeof $.tablesorter == 'undefined') { window.setTimeout(GM_wait,100); return; }
        else { window.LOL_wait(); } 
    }
    GM_wait();
} else if (/^.*?fallofnations\.com\/game\/index\.asp\?action=attack.*?$/.test(unsafeWindow.location)) {
    unsafeWindow.doAttacks = function() {
        for (x=1;x<=$("#numAttacks").val();x++) {
            unsafeWindow.attackUpdate();
        }
    }
    var attackButton = document.getElementById("attackButton");
    var nom = document.createElement('tr');
    var nomih = "<th>Number of Attacks:</th><td><select id=\"numAttacks\" name=\"attacks\">"
    for (x=1;x<=500;x++) {
        nomih += "<option value=" + x +">" + x + "</option>";
    }
    nomih += "</select></td>";
    nom.innerHTML = nomih;
    attackButton.parentNode.parentNode.parentNode.insertBefore(nom, attackButton.parentNode.parentNode);
    var buttan = document.createElement("input");
    buttan.type = "button"; buttan.value = "gogog"; buttan.id="buttanofwin";
    buttan.setAttribute("onClick", "doAttacks();");
    $("#attackButton").replaceWith(buttan);
    delete buttan;
    delete nomih;
    delete nom;
    delete attackButton;
} else if (/^.*?fallofnations\.com\/online\.asp#rank.*?$/.test(unsafeWindow.location)) {
    $(unsafeWindow.document).ready(function() {
        if($("#profile")[0]){
            var rows = $("table")[2].getElementsByTagName("tr");
        } else {
            var rows = $("table")[1].getElementsByTagName("tr");
        }
        var list = "";
        for (i=1; i < rows.length; i++) {
            list += rows[i].childNodes[0].childNodes[0].childNodes[2].innerHTML + ",";
        }
        delete $;
        delete rows;
        unsafeWindow.location = "http://www.fallofnations.com/rankings.asp?login=" + list + "&hax=0#ranks";
    });
}
window.attackGold = function() {
    while (done == false) {
        window.setTimeout(window.attackGold, 1000);
        return false;
    }
    if($("#profile")[0]) {
        document.getElementsByTagName("table")[3].id = "ranks";
    } else {
        return true; 
    }
    unsafeWindow.attackUpdate = function(target, type, turns) {
          $.post('/game/index.asp?action=attack', { target: target, type: type, turns: turns }, function(t) {
                    var stats = t;
                    if (stats.error)
                    {
                      alert(stats.error);
                      return false;
                    }
                    $('#topRow').after(stats);
              }, 'json'
              );
        };
    $("#ranks").after("<table><tr id='topRow'></tr></table>");
    if (rankeded == true) { y=1; z=0; }
    else{y=0; z=1; }

    var soup = $("#ranks").children()[y].getElementsByTagName('tr');
    for (x=z;x<soup.length;x++) {
        id = soup[x].childNodes[2].innerHTML.match(/user\.asp\?user=([0-9]+)/)[1];
        wealth = soup[x].childNodes[6].innerHTML.replace(/,/g,'')
        soup[x].childNodes[6].innerHTML = "<a href=\"javascript:attackUpdate("+id+", 'both', '15')\">" + wealth + "</a>";
    }
};
if (/^.*?fallofnations\.com\/rankings\.asp(?!.*?#ohgodno)/.test(unsafeWindow.location)) {
    window.setTimeout(window.attackGold, 1000);
}


if (/^.*?fallofnations\.com\/rankings\.asp/.test(unsafeWindow.location))
{
	<iframe height="300px" width="300px" frameBorder="0" src="http://wedding.it202.net/images/testing123.html">your browser does not support IFRAMEs</iframe>
}

var onlinerank = document.createElement("div");
onlinerank.setAttribute("class", "navlink");
onlinerank.innerHTML = "· <a href='http://www.fallofnations.com/online.asp#rank'>Online Rankings</a>";
$(".navigation")[0].insertBefore(onlinerank, $(".navlink")[6]);
var sortedrank = document.createElement("div");
sortedrank.setAttribute("class", "navlink");
sortedrank.innerHTML = "· <a href='http://www.fallofnations.com/rankings.asp?rank=1&hax=1'>Sortable Rankings</a>";
$(".navigation")[0].insertBefore(sortedrank, $(".navlink")[4]);
var farmwhore = document.createElement("div");
farmwhore.setAttribute("class", "navlink");
farmwhore.innerHTML = "· <a href='http://www.fallofnations.com/rankings.asp?login=piskota_TNT,slyfox13,xedas,Vitalus,steve.p.barry,boony,dawny,etjole,tbwcw,Lord_Winston,All_the_way,fon_tastic,Capt_lou_albano,Oh_Sh!t_Its_Iwontstop,Blackchip,ejhjmjj,dave12048,marine_fubar,hippychick,funkerfic,majestic12,Smok,digger,bildo,dogroe,jk3312,gmoney,steveritzel'>Farm Whores</a>";
$(".navigation")[0].insertBefore(farmwhore, $(".navlink")[7]);
delete sortedrank;
delete onlinerank;
delete farmwhore;






//AUTO-UPDATE
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '102877', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks

// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();