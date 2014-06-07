// ==UserScript==
// @name           Pluginy Ghulka dla Ogniska
// @namespace      jb_ognisko_ghulk
// @description    Jakiestam eksperymenty
// @include        http://ognisko.heroes.net.pl/
// ==/UserScript==

addEventListener(window, 'load', kod_on_load); //dodajemy kod OnLoad

function kod_on_load() {
        
	var fieldset = document.getElementsByTagName('fieldset')[0];
        var body = document.getElementsByTagName('body');
        var inbox = document.getElementById('inbox');


        var style_box = document.createElement('style');
        style_box.innerHTML = "\n   #drzemka_button {"
+ "\n           border: 1px solid black;"
+ "\n           color: white;"
+ "\n           font-size: 10px;"
+ "\n           background-color: black;"
+ "\n           opacity: 0.5;"
+ "\n           width: 70px;"
+ "\n           height: 13px;"
+ "\n           text-align: center;"
+ "\n           padding-top: 3px;"
+ "\n           }"
+ "\n   #drzemka_button:hover {"
+ "\n            border: 1px solid white;"
+ "\n            cursor: pointer;"
+ "\n            opacity: 0.8;"
+ "\n            }"
+ "\n   #tekst_drzemki {"
+ "\n             color: white;"
+ "\n             background-color: black !important;"
+ "\n             opacity: 0.6;"
+ "\n            }"
+ "\n   #tekst_drzemki:hover {"
+ "\n             opacity: 0.9;"
+ "\n            }"
+ "\n   #respirator_button {"
+ "\n       height: 13px;"
+ "\n       left: 80px;"
+ "\n       position: absolute;"
+ "\n       top: 47px;"
+ "\n       width: 13px;"
+ "\n   }"
+ "\n  .wzywacz_oposow {"
+ "\n       position: absolute;"
+ "\n       right: 0;"
+ "\n       top: 0%;"
+ "\n       text-align: center;"
+ "\n       width: 50px;"
+ "\n       font-size: 10px;"
+ "\n       cursor: pointer;"
+ "\n       }";
        var head = document.getElementsByTagName("head")[0];
        style_box = head.insertBefore(style_box, null);
        
        
        // Tworzymy i konfigurujemy pole tekstowe z tekstem drzemki        
        var male_pole_tekstowe = document.createElement('input');
        male_pole_tekstowe.setAttribute('id', 'tekst_drzemki');
        male_pole_tekstowe.setAttribute('type', 'text');
        male_pole_tekstowe.value = '/nap';
        male_pole_tekstowe.setAttribute('class', 'pole_drzemki');
        
        
        // umieszczamy je w dobrym miejscu
        male_pole_tekstowe = fieldset.insertBefore(male_pole_tekstowe, null);
        var drzemka_button = document.createElement('div');
        drzemka_button.setAttribute("id", "drzemka_button");
        drzemka_button.innerHTML = 'drzemka';
        drzemka_button = fieldset.insertBefore(drzemka_button, null);
        drzemka_button.setAttribute('class', "przycisk drzemka");
        drzemka_button.setAttribute('onClick', "drzemanie_start();");
        var respirator_button = document.createElement('input');
        respirator_button.setAttribute("id", "respirator_button");
        respirator_button.setAttribute("name", "respirator_button");
        respirator_button.setAttribute("type", "checkbox");
        respirator_button.setAttribute("title", "Czy podtrzymywać obecność na ognisku?");
        respirator_button.setAttribute('class', 'respirator_checkbox');
        
        respirator_button = fieldset.insertBefore(respirator_button, null);
        
        var dzwiek_oposow = document.createElement('audio');
        dzwiek_oposow.setAttribute("id", "dzwiek_oposow");
        
        dzwiek_oposow.setAttribute("src", "http://ginden.boo.pl/download/ktos_potrzebuje_oposow.ogg");
        dzwiek_oposow.setAttribute("style", "display: none;");
        dzwiek_oposow.setAttribute("controls", "");
        dzwiek_oposow = fieldset.insertBefore(dzwiek_oposow, null);
        
        var wzywacz_oposow = document.createElement('div');
        wzywacz_oposow.setAttribute('id', "wzywacz_oposowo");
        wzywacz_oposow.setAttribute('onclick', "wezwij_oposy();");
        wzywacz_oposow.setAttribute('class', "wzywacz_oposow");
        wzywacz_oposow.innerHTML = '<img style="height: 48px; width: 48px;" src="http:\/\/i.imgur.com\/ahRbG.png"><br \/>Wezwij OPOSy...';
        wzywacz_oposow = fieldset.insertBefore(wzywacz_oposow, null);
        
        
        
        var skrypt = document.createElement('script');
            skrypt.setAttribute("type", "text/javascript"); //javascript
        skrypt = fieldset.insertBefore(skrypt, null);
        function respirator() {
            var req2 = new XMLHttpRequest();
            req2.open("POST", "http://ognisko.heroes.net.pl/jbapp/chat/ognisko/odpowiedz.json", true);
            req2.setRequestHeader("Accept", "text/plain, */*");
            req2.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            req2.send("message=/typing");
        }
        
        function ChatPluginPing() {
                        ChatPluginBase.apply( this, arguments );
                        this.name = "ping";
                        this._notify = function( action, data, node ) {
                           
                       if (data.message == 'wzywa OPOSy...' && data.me == true && localStorage.getItem('czy_opos') == 1) {
                            
                            document.getElementById('dzwiek_oposow').play();
                            
                        }
         
                        return data;
                   
                        };
        };
        function ChatPluginGhulkOptions() {
                        ChatPluginBase.apply( this, arguments );
                        this.name = "GhulkOptions";
                        this._notify = function( action, data, node ) {
                            if (data == 'message=%2Fset+opos+1') {
                                localStorage.setItem('czy_opos', 1);
                                return null;
                                
                            }
                            if (data == 'message=%2Fset+opos+0') {
                                localStorage.setItem('czy_opos', 0);
                                return null;
                                
                            }                            
                             return data;
                        };
        };              
        function wezwij_oposy() {
            var req3 = new XMLHttpRequest();
            req3.open("POST", "http://ognisko.heroes.net.pl/jbapp/chat/ognisko/odpowiedz.json", true);
            req3.setRequestHeader("Accept", "text/plain, */*");
            req3.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            req3.send("message=%2Fme+wzywa+OPOSy...");            
            
        }


        jakas_tam_zmienna =  'var czy_drzemie = 0; \n'
        + respirator
        + '\n ChatPluginPing.prototype = new ChatPluginBase(); \n'
        + ChatPluginPing
        + '\n'
       + 'ChatPluginGhulkOptions.prototype = new ChatPluginBase(); \n'
        + ChatPluginGhulkOptions
        + '\n'
        + 'plugins.attach("message.display", new ChatPluginPing()); \n'
       + 'plugins.attach("message.write", new ChatPluginGhulkOptions()); \n'
        + wezwij_oposy
        + '\n'        
        + 'function chrapanie() { \n' //  czyli wywalanie /nap
            + 'var formularz =  document.getElementsByTagName("form")[0]; \n'
            + 'var inbox = document.getElementById("inbox"); \n'

    
            + 'if (czy_drzemie == 1) { \n'
                + 'var req = new XMLHttpRequest(); \n'
                + 'req.open("POST", "http://ognisko.heroes.net.pl/jbapp/chat/ognisko/odpowiedz.json", true); \n'
                + 'req.setRequestHeader("Accept", "text/plain, */*"); \n'
                + 'req.setRequestHeader("X-Requested-With", "XMLHttpRequest"); \n'
                + 'req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"); \n'
                + ''
                + ''
                + ''
                + 'var czy_respirowac = document.getElementById("respirator_button").checked; \n'
                + 'var temp_zmienna = document.getElementById("tekst_drzemki").value; \n'
                + 'if (czy_respirowac == true) { \n'
                    + 'temp_zmienna = ""; \n'
                    + 'respirator(); \n'
                    + '} \n'
                + 'req.send("message=\" + temp_zmienna+ \""); \n'
                + '} \n'
            + '} \n \n \n'
        + 'function drzemanie_start() { \n'
        
            + 'czy_drzemie = 1 - czy_drzemie; \n'
            + 'if (czy_drzemie == 1) \n'
            + 'tekst = "wstań"; \n'
            + 'else \n'
            + 'tekst = "drzemka"; \n'
            + 'document.getElementById("drzemka_button").innerHTML =  tekst; \n'
            
            + '}\n'
        + 'window.setInterval(chrapanie, 252000); \n' // 4.2 minuty

        
        
        skrypt.innerHTML = jakas_tam_zmienna;
	}


 
function addEventListener(element, eventName, callback, useCapture) {
	if (element.addEventListener) {
	  element.addEventListener(eventName, callback, useCapture || false);
	} else if (element.attachEvent) {
	  element.attachEvent('on' + eventName, callback);
	} else {
	  return false;
	}
	return true;
}