// ==UserScript==
// @name         nCore Tools
// @version      4.0.0
// @description  nCore Tools - Tegyük jobbá az nCore oldalt!
// @namespace    nCoreToolsV4
// @icon         http://static.ncore.cc/styles/ncore.ico
// @include      htt*://ncore.cc/*
// @include      htt*://ncore.nu/*
// @match        http://ncore.cc/*
// @match        http://ncore.nu/*
// @match        https://ncore.cc/*
// @match        https://ncore.nu/*
// @grant        GM_info
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// @author       Kecs.es
// @copyright    2013+, Kecs.es
// ==/UserScript==
var $ = unsafeWindow.jQuery;
//$.noConflict();
/*! nCore Tools */
var text = {
    yes                 : "Igen",
    no                  : "Nem",
    adminLink           : "nCore Tools",
    header              : "nCore Tools beállítások",
    removeAds           : "Reklámok eltávolítása:",
    removeAdsComment    : "Abban az esetben, ha kikapcsolod a reklámokat, kérlek <a href='donate.php'>támogasd</a> az oldalt, hiszen fenntartási költségeiket a reklámbevételekből fedezik!",
    openSearch          : "Kereső kinyitása:",
    openSearchComment   : "Kinyitja a letöltési oldalon található keresőt és a fölösleges térközöket eltávolítva csökkenti annak magasságát.",
    embedImages         : "Képek beágyazása:",
    embedImagesComment  : "Beágyazza a torrentek leírásában található előnézeti képeket a letöltési oldalon. Igazodik a <a href='profile.php?action=config&w=torrent'>Torrent beállítások</a> alatt taláható \"Képek megjelenítése\" értékhez, azaz <i>Egyszerű</i> beállításnál új ablakban nyitja meg a képeket, míg <i>Animált</i> esetben a ClearBox kezeli majd.",
    embedImagesOpen     : "Megnyitás új ablakban...",
    addDownloadLink     : "Letöltési link beágyazása:",
    addDownloadLinkComment: "Minden egyes torrenthez odarak egy közvetlen letöltési linket, így nem kell a torrenteket lenyitni ahhoz, hogy le lehessen őket tölteni.",
    customSearch        : "Új szűrő megjelenítése:",
    customSearchComment : "A letöltési oldalon található keresőhöz hozzáadja a feltöltési időre vonatkozó szűrőt",
    searchPattern       : "Torrent kiemelő:",
    searchPatternComment: "Ebben a beviteli mezőbe olyan szavak vagy reguláris kifejezések írhatóak (minden sorba egy), amelyeket a script a torrentek nevében fog keresni, és ha rátalál, akkor azt jól láthatóan kiemeli. Segítség reguláris kifejezésekhez:<br /><a href='http://vbence.web.elte.hu/regex_leiras.html' target='_blank'>Mi is az a RegExp</a> és <a href='http://regexpal.com/' target='_blank'>Online RegExp tester</a> (case insensitive legyen bepipálva)",
    searchPatternError  : "Hibás az egyik torrent kiemelő minta!\n\nÉrintett: [PATTERN]\nHiba: [ERROR]",
    csUpload            : "Feltöltési idő szerint",
    csUploadWeek1       : "Utóbbi 1 hétben" ,
    csUploadWeek2       : "Utóbbi 2 hétben" ,
    csUploadMonth       : "Utóbbi 1 hónapban" 
}
var tools = {
    pattern0 : new RegExp("^https?\:\/\/ncore\.(nu|cc|us)\/?$","i"),
    pattern1 : new RegExp("index\.php","i"), 
    pattern2 : new RegExp("torrents\.php","i"),
    pattern3 : new RegExp("profile\.php.+action\=config","i"),
    pattern4 : new RegExp("w\=tools","i"),
    //pattern5 : new RegExp("action\=details","i"),
    img : {
        download  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAoFJREFUeJx1kstL1FEYhp9zzsw45VxSs5Fuk8NITldqMCWKIDCQiogW0UKoDCKCWrUOoj+gVYsocNGiRWBEi6A2CQXahJV2WdSgdNGiJh3NnzO/c2mhjZL2rc7ifR/e872fYIlJH01f3X9sf6ee0VMCgQqryOO7j2/l7+Wv/KsNLAVINTZmujpOrdeeDwJUOMhwLt+UJ79IuyRg2vzSH6cGMZ7BAQGtmBbjZimtWvCWbeeyNzP70scbdsR2xxpCcc+N4zHOpCkw7Sbiq1NrW+q31x38nBt9ALhFCULN5fa9h7PrjO9RcB8IBiUAvnaksisbk7tk45MHuZG/5kWATi8z3P+qt97f4sLxQIyIWIF1mh+M8b00SmSw2jtd3vPpGe8Xf+FEe/Ptg61Nh6rfI/WMJyKp1axZniYarAXrk+iTtLxLy6aGug2ZVCL1qO9DTwVw+dKZqx3ZVR0DAy9qvn7+JnhTxo0Itmw+QKxUz5cbz7G9RX4WCvLr6BfasptSieTWxNP+1w8DAL8nJ5sS1SI1EqlhWbQWJSR+0THWk8M5qJuKUJWO4pxFOkNUlKLC2UxlB8boeFAb9rVuxvkeQkhAYLSPEALZkATncA4sIEtFgk7GKgCrjRZYVm5s5VH3NRz2n7YFAF7ZcqTrIt9z95kpq1IF4CQ+QoKqAhViZ3brAnOlMQZeDEEoPJfEzgOEFT5qtnNjDK8GhnAVo6gAjJk9RhkIYayeBxhEGTl7EkoptjUnsdYgpcLaOZNSvHw7AoDWGmdZkEBILQWApf3kBf437S0OEKhQECtMqZIvHCZ59vjh60gZcDgnhQQxF93N78ACdfFIdaFQLHbfuX9+osTwHy4bB5h5T+YrAAAAAElFTkSuQmCC",
        watched   : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIQDictt+6SdwAAAehJREFUOMuVk8FKG2EUhb87mc40iTODEJlK7UZDxCCGQUqaMASCSGODdBe6ECJddOcwG/EJXBt0ZcBCwEVJVgWtr1AIPoBQXAQKhRZc1EBJMX831hLItPbAvYvL4Ttnc4UIhfDIgLcAA3jdgC/jfHoUwISjeXgOcAFHQHWcT4tI91KwWlhY0J6kUloKVkPw7g0wYS8NemJ3l0yzSRp0E/buBQihOAXFbLksej6Pns+TLZdlCoohFPmXdqB7AsNep6M8z1Oe56lep6NOYLgD3b82CGHFhaWM74vh+ziOg+M4GL5PxvfFhaUQViIBJuxnwUgEAaJpWJaFZVmIppEIArJgmLA/FhDC+jSk5woFjFIJEcG2bWzbRkQwSiXmCgWmIR3C+gggBDGgsXibruk6IvKngQiarpMIAhbBMKARgsDtCuHVLLReLC8bk2dnEIuhlKLf7wOQTCYREbi54WptjQ/n54NLqDfgnYQQewxXT8GaPz7mYbWKUgqlFLVaDYB2u42IICL8OD3lYmODLnz/DJOawGYczJlcjnilcmcUEVzXxXXdkVu8UmEmlyMOpsCmbMPXl5CaPThgol6/S/89wAhARLhutbjc2uI9fJNDGD4DecD/6SfwEZT+CQ4H8GYi4i+idA3DHjR/AZfefQgctOETAAAAAElFTkSuQmCC"
    },
    vars: [ "removeAds", "openSearch", "embedImages", "searchPattern", "addDownloadLink", "customSearch" ],
    signature : function() {
        var container = document.createElement('div');
        container.setAttribute("style", "float:right;padding: 0px 10px;"); 
        container.innerHTML = "<a href='profile.php?action=config&w=tools'>nCore Tools v" + GM_info.script.version + " ReWrite Tech Preview Edition by Kecs</a>";
        var fobox_fej = document.getElementsByClassName("fobox_fej");
        if ( fobox_fej != null && fobox_fej != undefined ) {
            if ( fobox_fej[0] != null && fobox_fej[0] != undefined ) {
                fobox_fej[0].appendChild(container);
            }
        }
    },
    addMenuLink : function() {
        var list = document.getElementsByClassName("wiki_ul"); list = list[0];
        var li = document.createElement("li");
        li.innerHTML = "<a id='tools' href='javascript:return false;'>"+text.adminLink+"</a>";
        list.appendChild(li);
        document.getElementById("tools").addEventListener("click",tools.showAdmin,false);
    },
    showAdmin : function() {
        var userbox = document.getElementsByClassName("userbox_all"); userbox = userbox[0];
        if( userbox.parentNode.name == "profil_beallitasa" ) {
            var userboxAll = document.createElement("div");
            userboxAll.className = "userbox_all";
            userboxAll.innerHTML = userbox.innerHTML;
            userbox.parentNode.parentNode.removeChild(userbox.parentNode);
            document.getElementById("profil_right").appendChild(userboxAll);
            var header = document.getElementsByClassName("userbox_fej"); header = header[0];
            header.innerHTML = text.header;
            var userbox = document.getElementsByClassName("userbox_tartalom"); userbox = userbox[0];
            var content = "<table border='0' cellpadding='5' cellspacing='0'><tbody>";
            content += tools.prepareValue("removeAds",     text.removeAds,     text.removeAdsComment);
            content += tools.prepareValue("openSearch",    text.openSearch,    text.openSearchComment);
            content += tools.prepareValue("embedImages",   text.embedImages,   text.embedImagesComment);
            content += tools.prepareValue("addDownloadLink",text.addDownloadLink,text.addDownloadLinkComment);
            content += tools.prepareValue("customSearch",  text.customSearch,  text.customSearchComment);
            content += tools.prepareValue("searchPattern", text.searchPattern, text.searchPatternComment); 
            content += "</tbody></table>";
            userbox.innerHTML = content;
            document.getElementById("removeAds").addEventListener("change",    tools.saveValue,false);
            document.getElementById("openSearch").addEventListener("change",   tools.saveValue,false); 
            document.getElementById("embedImages").addEventListener("change",  tools.saveValue,false); 
            document.getElementById("addDownloadLink").addEventListener("change",tools.saveValue,false); 
            document.getElementById("customSearch").addEventListener("change", tools.saveValue,false);
            document.getElementById("searchPattern").addEventListener("change",tools.saveValue,false);
        }
    },
    prepareVars : function() {
        for( var i = 0; i < tools.vars.length; i++ ) {
            if( GM_getValue( tools.vars[i] ) == undefined ) {
                if( tools.vars[i] == "searchPattern" ) {
                   GM_setValue(tools.vars[i], ""); 
                } else {
                   GM_setValue(tools.vars[i], 1);
                }
            }
        }        
    },
    prepareValue : function(id, label, comment) {
        var value = GM_getValue(id);
        if( id == "searchPattern" ) {
            return "<tr><td class='profil_doboz'>"+label+"</td><td class='profil_box'>" + 
                   "<textarea class='beviteliMezo3' id='"+id+"'>"+value+"</textarea>" +
                   "<p class='comment'>"+comment+"</p></td></tr>";
        } else { 
            var showYes = ""; var showNo = "";
            if ( parseInt(value) ) { showYes = "selected='selected'"; } else { showNo = "selected='selected'"; }
            return "<tr><td class='profil_doboz'>"+label+"</td><td class='profil_box'><select class='valasztasMezo' id='"+id+"'><option value='1' "+showYes+">"+text.yes+"</option><option value='0' "+showNo+">"+text.no+"</option></select><p class='comment'>"+comment+"</p></td></tr>";
        }
    },
    saveValue : function() {
        GM_setValue(this.id, this.value);
    }
}
var ncore = {
    removeAdsMain : function() {
        var value = GM_getValue("removeAds");
        if ( parseInt(value) ) {
            var ads = document.getElementsByClassName("news_block_right");  if( ads.length > 0 ) { 
                var adc = ads[0].getElementsByTagName("center");
                if( adc.length > 0 ) {
                	for( var i = 0; i < adc.length; i++) { 
                        adc[i].style.display = "none"; 
                    }	
                }
            }
        }
    },
    removeAdsTorrent : function() {
        var value = GM_getValue("removeAds");
        if ( parseInt(value) ) {
            // Felső reklám
            var content = document.getElementsByClassName("banner");  if( content != null && content != undefined && content.length > 0 ) { for(var i = 0; i < content.length; i++) { content[i].style.display = "none"; } }
            // Akciós reklám pontért
            var plus50p = document.getElementById("plus50pont");      if( plus50p != null && plus50p != undefined ) { plus50p.style.display = "none";  }
            // Felső reklám v2
            var plus50p = document.getElementById("upperad");      if( plus50p != null && plus50p != undefined ) { plus50p.style.display = "none";  }
            // Alsó reklám v2
            var plus50p = document.getElementById("bottomad");      if( plus50p != null && plus50p != undefined ) { plus50p.style.display = "none";  }
            // Alsó reklám és a torrent részletei oldalon
            //var center = document.getElementsByTagName("center");    for( var i = 0; i < center.length; i++) { var a = center[i].getElementsByTagName("a"); for( var j = 0; j < a.length; j++ ) { if( a[j].target == "_blank" ) { a[j].style.display = "none"; } } }
            // A torrent részletei oldaon található reklám
            var plus50p = document.getElementById("detailsad");      if( plus50p != null && plus50p != undefined ) { plus50p.style.display = "none";  }
        }
    },
    openSearchBox : function () {
        var value = GM_getValue("openSearch");
        if ( parseInt(value) ) {
            var kategoriak  = document.getElementById("kategoriak");  if( kategoriak  != null && kategoriak  != undefined ) { kategoriak.style.display  = "block"; }
            var letoltes_hr = document.getElementById("letoltes_hr"); if( letoltes_hr != null && letoltes_hr != undefined ) { letoltes_hr.style.display = "block"; }
            var panel_stuff = document.getElementById("panel_stuff"); if( panel_stuff != null && panel_stuff != undefined ) { panel_stuff.style.display = "none"; }
        }
    },
    addCustomSearch : function() {
        var value = GM_getValue("customSearch");
        if ( parseInt(value) ) {
            if ( document.getElementById("cimke_text") ) {
            	cell = document.getElementById("cimke_text").parentNode.parentNode.nextSibling.nextSibling;
                cell.setAttribute("style","padding-left: 19px;");
                
                var select = document.createElement('select');
                    select.setAttribute("id", "csUpload");
                    select.setAttribute("class", "valasztasMezo");
                
                var option0 = document.createElement('option');
                    option0.setAttribute("value","0");
                    //option0.setAttribute("selected","selected");
                    option0.innerHTML = text.csUpload;
                    select.appendChild(option0);
    
                var option1 = document.createElement('option');
                    option1.setAttribute("value","7");
                    option1.innerHTML = text.csUploadWeek1;
                    select.appendChild(option1);
    
                var option2 = document.createElement('option');
                    option2.setAttribute("value","14");
                    option2.innerHTML = text.csUploadWeek2 ;
                    select.appendChild(option2);
    
                var option3 = document.createElement('option');
                    option3.setAttribute("value","30");
                    option3.innerHTML = text.csUploadMonth;
                    select.appendChild(option3);            
                
                cell.appendChild(select);
                document.getElementById("csUpload").addEventListener("change",ncore.filterUpload,false);
            }
        }    	
    },
    filterUpload : function() {
        var csUpload = document.getElementById("csUpload");
        var value = csUpload.options[csUpload.selectedIndex].value;
    },
    torrentIterator : function() {
        var content = document.getElementsByClassName("box_torrent_all");
        if( content != null && content != undefined && content.length > 0 ) {
            var torrents = content[0].getElementsByClassName("box_torrent");
            // Kiemelés vizsgálata
            var searchPattern = GM_getValue("searchPattern"); var patterns = new Array();
            if( searchPattern  != null && searchPattern  != undefined && searchPattern != "" ) { try { var p = searchPattern.split("\n"); for( var i = 0; i < p.length; i++ ) { patterns.push(eval("/"+p[i]+"/gi")); } } catch(e) { if( e.name == "SyntaxError" || e.name == "ReferenceError") { var msg = text.searchPatternError.replace("[PATTERN]", p[patterns.length]); msg = msg.replace("[ERROR]", e.message); alert(msg); } else { throw e; } } }
            // Torrentek feldolgotása
            for(var i = 0; i < torrents.length; i++) {
                var box = torrents[i].getElementsByClassName("torrent_txt");
                if( box == null || box == undefined || box.length == 0 ) { box = torrents[i].getElementsByClassName("torrent_txt2"); }
                var name = box[0].childNodes[1].title;
                var tid  = box[0].childNodes[1].href.match(/(\d+$)/g);
                // pattern ellenőrzés
                if( patterns.length > 0 ) {
                    for(var j = 0; j < patterns.length; j++) {
                        if( name.match(patterns[j]) ) {
                            var wLink = document.createElement("div");
                            wLink.setAttribute("style","float:right;height:16px;margin:7px 0 0 4px;width:16px;");
                            wLink.innerHTML = "<img src='" + tools.img.watched + "' />";
                            box[0].style.width = "325px";
                            box[0].parentNode.appendChild(wLink);
                        }
                    }
                }
                // Képbeágyazás indítása                
                var value = GM_getValue("embedImages");
                if ( parseInt(value) ) {
                    box[0].childNodes[1].removeAttribute("href");
                    box[0].childNodes[1].removeAttribute("onclick");
                    box[0].childNodes[1].style.cursor = "pointer"; 
                    box[0].childNodes[1].setAttribute("rel",tid);
                    box[0].childNodes[1].addEventListener("click",ncore.ajax,false);
                }
                // Download Link beágyazása
                var value = GM_getValue("addDownloadLink");
                if ( parseInt(value) ) {
                    var dlDiv = document.createElement('div');
                    dlDiv.setAttribute("style", "float:right;width:16px;height:16px;margin:7px 0px 0px 5px;");
                    dlDiv.innerHTML = "<a href='torrents.php?action=download&id="+tid+"'><img src='" + tools.img.download + "' /></a>"                   
                    box[0].parentNode.appendChild(dlDiv);                    
                }
            }
        }
    },
    ajax : function() {
        var element = document.getElementById( this.rel );
        var loading = "<div class=\"torrent_lenyilo_lehetoseg\"><div class=\"lehetosegek\">Lehet\u0151s\xE9geid:</div><div class=\"letoltve\"><a href=\"torrents.php?action=download&id="+this.rel+"\"><img src=\"styles/div_link.gif\" class=\"torr_reszletek_btn\"></a></div><div class=\"letoltve_txt\"><a href=\"torrents.php?action=download&id="+this.rel+"\">Torrent let\xF6lt\xE9se</a></div></div><div class=\"torrent_lenyilo_tartalom\"><div style=\"margin:10px 0;text-align:center\"><img src=\"styles/ajax.gif\" title=\"T\xF6lt\xE9s...\" /></div></div><div class=\"torrent_lenyilo_lab\"></div>";
        if (element.innerHTML == "" || element.innerHTML == loading) {
            element.innerHTML = loading;
            element.style.display = element.style.display == "none" ? "block" : "none";
            $.get('ajax.php?action=torrent_drop&id='+this.rel,function(data){
                ncore.embedImages(element, data);
            });
        } else {
            element.style.display = element.style.display == "none" ? "block" : "none";
        }
    },
    embedImages : function(element, data) {
    	element.innerHTML = data;
        //Előnézeti képek beágyazása
        var previews = element.getElementsByClassName("attached_link");
        var rel = "";
        var fancy = true;
        if( previews.length > 0 ) {
        	for(var i = 0; i < previews.length; i++) {
                if( previews[i].parentNode.className == "fancy_groups" ) {
                    // Animált képek -> fancybox
                    rel = previews[i].parentNode.rel;
                    previews[i].src = previews[i].parentNode.href;
                } else {
                    // Egyszerű képmegjelenítés -> újablakban
                    ncore.embedImagesAjax(previews[i]);
                    fancy = false;
                }
                previews[i].style.border = "0px";
                previews[i].style.width = "auto";
                previews[i].style.height = "auto";
                previews[i].style.maxWidth = "280px";
                previews[i].style.maxHeight = "500px";
                previews[i].parentNode.parentNode.removeAttribute("class");
            }
        }
        //Méret középre igazítása
        var previewsizes = element.getElementsByClassName("kepmeret_txt");
        if( previewsizes.length > 0 ) {
        	for(var i = 0; i < previewsizes.length; i++) {
            	previewsizes[i].style.textAlign = "center";
            }
        }
        //Egyéb képek beágyazása
        var otherimages = element.getElementsByClassName("description");
        if( otherimages.length > 0 ) {
            for(var i = 0; i < otherimages.length; i++) {
                if(otherimages[i].parentNode.title == "Csatolt kép megnyitása" ) {
                    otherimages[i].parentNode.removeAttribute("title");

                    var spoiler = otherimages[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    if( spoiler.className == "bb-quote" ) {
                    	spoiler.parentNode.removeChild(spoiler.previousSibling);
                        spoiler.removeChild(spoiler.firstChild);
                        spoiler.firstChild.style.display = "block";
                        spoiler.removeAttribute("class"); 
                    }

                    var imageURL = otherimages[i].parentNode.href;
                    var image = document.createElement('img');
                    image.setAttribute("style", "border:0px;max-width:600px;max-height:400px;");//;max-width:870px; 
                    image.src = imageURL;                    
                    
                    otherimages[i].parentNode.appendChild(image);
                    otherimages[i].parentNode.className = "fancy_groups";
                    otherimages[i].parentNode.rel = rel;
                    otherimages[i].style.display = "none";
                    otherimages[i].parentNode.parentNode.parentNode.removeChild(otherimages[i].parentNode.parentNode.nextSibling.nextSibling);
                    
                    //Link hozzáadása
                    if( fancy ) {
                        var link = document.createElement('a');
                        link.href = imageURL;
                        link.target = "_blank";
                        link.innerHTML = text.embedImagesOpen;
                        link.style.fontStyle = "italic";
                        link.style.display = "block";
                        otherimages[i].parentNode.parentNode.appendChild(link);
                    }
                }
            }
        }
        //FancyBox inicializálása        
        if( fancy ) {
            //alert("uW:"+unsafeWindow.jQuery);
            //alert("rel:"+rel.substr(1));
            //alert("$:"+);
            $("#"+rel.substr(1)+" .fancy_groups").fancybox({
                'overlayColor'	: '#000',
                'overlayOpacity': 0.9,
                'onStart'		: unsafeWindow.disableKeys,
                'onClosed'		: unsafeWindow.enableKeys
            });
            /*
            unsafeWindow.jQuery("#"+rel.substr(1)+" .fancy_groups").fancybox({
                'overlayColor'	: '#000',
                'overlayOpacity': 0.9,
                'onStart'		: unsafeWindow.disableKeys,
                'onClosed'		: unsafeWindow.enableKeys
            });
            */
        }
    },
    embedImagesAjax : function(element) {
        $.get(element.parentNode.href,function(data){
        	var image = data.match(/\<img.+src\=\"(.+\.(?:jpe?g|png|bmp|gif|tiff?))\"/i);
            element.src = image[1];
        });
    }    
}
try
{
    tools.prepareVars();    
    tools.signature();
    if(tools.pattern2.exec(document.location)) {
        ncore.removeAdsTorrent();
        ncore.openSearchBox();
        ncore.addCustomSearch();
        ncore.torrentIterator();
    } else if(tools.pattern1.exec(document.location) || tools.pattern0.exec(document.location)) {
        ncore.removeAdsMain();        
    } else if(tools.pattern3.exec(document.location)) {
        tools.addMenuLink();
        if(tools.pattern4.exec(document.location)) {
            tools.showAdmin();
        }
    }
} catch(e) {
    alert("Nem várt hiba történt az nCore Tools futtatása közben!\n\n"+e.name.toString()+"\n"+e.message);
}
//alert("ok");