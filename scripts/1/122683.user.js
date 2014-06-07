// ==UserScript==
// @name           teamfuddle
// @namespace      dogself.com
// @description    lock tickets on unfuddle
// @include        https://*unfuddle.com/*
// ==/UserScript==

//SETTINGS:
var MY_NAME = 'dave' 


//IMPLEMENT:
var URL = function(evt, ticket){ 
  //this url must take the following 3 params and use pusher this PUSHER_KEY to push to PUSHER_CHAN

  //the server side code mus trigger an event 'evt' to the chan 'teamfuddle' and the object it triggers should look like this:

  //{'ticket':ticket, 'user':user, 'time': utc_now()}
  return 'http://company.com/teamfuddle/'+evt+'/'+ticket+'/'+MY_NAME+'/';
};

var PUSHER_KEY = 'xxxx'; // your pusher key
var PUSHER_CHAN = 'teamfuddle';
var DEBUG = true;


// NO TOUCH:
var channel;



var style = "\
  .ticket-locked {margin-right:5px;border:1px solid red; padding:4px; color:red;} \
";

log('starting');
loadDependancies(runScript);

function runScript(){

    Pusher.log = function(message) {
      log(message);
    };

    // Flash fallback logging - don't include this in production
    WEB_SOCKET_DEBUG = true;

    var pusher = new Pusher(PUSHER_KEY);
    channel = pusher.subscribe(PUSHER_CHAN); 

    log(channel);
    var findT = function(){
        var $t = $("#content #ticket_show");
        if($t.length){
            if(!$t.data('gm-found')){
                $t.data('gm-found', true);
                onTicket();
            }
        }
        setTimeout(findT, 300);
    }
    setTimeout(findT, 100);

   
   
}

function onTicket(){

    log('looking at a ticket')
    var ticket = $("#ticket_show .number:first").text().substring(1);
    var $menu = $('#ticket_show .side_menu:first');
    var $lock = $("<a href='#' class='ticket-lock'>Lock Ticket</a>");
    $menu.append($("<li>").append($lock));

    $lock.click(function(){
        $this = $(this);
        if($this.text() != 'Unlock Ticket'){
            sneakyXHR(URL('lock', ticket), function(d){
                if(d != 'ok'){
                    $this.text('Lock Ticket');
                    alert('Teamfuddle: error pushing unlock event');
                }
            });
            $this.text('Unlock Ticket');
        } else {
            sneakyXHR(URL('unlock', ticket), function(d){
                if(d != 'ok'){
                    $this.text('Unlock Ticket');
                    alert('Teamfuddle: error pushing lock event');
                }
            });
            $this.text('Lock Ticket');
        }
        return false;
    });

    channel.bind('lock', function(e){
        log('event: lock - ticket: '+e.ticket+' user:'+e.user +' on:'+e.time);
        setValue(e.ticket, e);
        if(e.ticket == ticket){
            lockTicket(e);
        }
    });

    channel.bind('unlock', function(e){
        log('event: unlock - ticket: '+e.ticket+' user:'+e.user +' on:'+e.time);
        deleteValue(e.ticket, e);
        if(e.ticket == ticket){
            unlockTicket();
        }
    });

    channel.bind('check', function(e){ //a client is asking everyone else if a ticket is locked
        log('event: check - ticket: '+e.ticket+' asker:'+e.user +' on:'+e.time);
        getValue(ticket, function(v){
            if(v){ //ticket is locked
                sneakyXHR(URL('check-ack', ticket), function(d){});
            }
        });
    });

    channel.bind('check-ack', function(e){ //some client responded that the ticket we are looking at should be locked (and we didnt know this)
        log('event: check-ack - ticket: '+e.ticket+' answerer:'+e.user +' on:'+e.time);
        setValue(e.ticket, e);
        if(e.ticket == ticket){
            lockTicket(e);
        }
    });


    getValue(ticket, function(v){
        if(v){
            lockTicket(v); 
        } else {
            sneakyXHR(URL('check', ticket), function(d){});
        }
    });
}

function lockTicket(e){
    unlockTicket();
    if(e.user = MY_NAME){
        e.user += " (ME)"
        $('.ticket-lock').text('Unlock Ticket');
    } else {
        $('.ticket-lock').text('Steal Lock');
    }
    $('#show_ticket_render h2').append('<div class="ticket-locked">TICKET IS LOCKED BY '+e.user+' AT '+e.time+'</div>');
}

function unlockTicket(){
    $('.ticket-lock').text('Lock Ticket');
    $('.ticket-locked').remove();
}


/* UTIL METHODS */
function setValue(name,value) {
    var h = {val:value};
    var str = JSON.stringify(h);
    window.setTimeout(function() {
            GM_setValue(name, str);
    });       
}

function deleteValue(name,value) {
    window.setTimeout(function() {
        GM_deleteValue(name, value);
    });       
}

function getValue(name, cb) {
    window.setTimeout(function() {
        var val = GM_getValue(name);
        var h = {val: null}
        if(val){
            log('parsing json: '+val);
            h = JSON.parse(val);
        }
        cb(h.val);
    });
}

function addStyleText(text){
  var head = document.getElementsByTagName('head')[0],
  style = document.createElement('style'),
  rules = document.createTextNode(text);
 
  style.type = 'text/css';
  if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
  else
    style.appendChild(rules);
  head.appendChild(style);
}

function addScript(url){
    var s = document.createElement('script');
    s.src = url;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
}

function log(msg){
  if(DEBUG){
    unsafeWindow.console && unsafeWindow.console.log(msg)
  }
}

function sneakyXHR(url, cb){
  setTimeout(function(){
    GM_xmlhttpRequest({
      method: 'GET',
      'url': url,
      headers: {
        'Accept': 'application/atom+xml,application/xml,text/xml'
      },
      onload: function(responseDetails) {
        var text = responseDetails.responseText;
        cb(text, responseDetails);
      }
    });
  }, 1)
}


var gvar=function() {} // Global variables
function GM_ApiBrowserCheck() { 

  if(window.navigator.vendor.match(/Google/)) {
        var div = document.createElement("div");
        div.setAttribute("onclick", "return window;");
        unsafeWindow = div.onclick();


        const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts
        if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
        if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
        GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
        GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
          var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
          var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
          if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
          return sel;
        }
        var needApiUpgrade=false;
        if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
          needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
        }
        if(typeof(GM_setValue)!='undefined') {
          var gsv=GM_setValue.toString();
          if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
          else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
        } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

        if(needApiUpgrade) {
          GM_log('Try to recreate needed GM Api...');
          var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
          if(ws=='object') {
            GM_log('Using localStorage for GM Api.');
            GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
            GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
            GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
          } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
            GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
            GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
            GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
            GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
          }
          if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
          if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
          if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
            GM_log('Using XMLHttpRequest for GM Api.');
            GM_xmlhttpRequest=function(obj) {
              var request=new XMLHttpRequest();
              request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
              request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
              try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
              if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
              request.send(obj.data); return request;
        } } }
    }
}
GM_ApiBrowserCheck();

function loadDependancies(boostrapFn) {
  addStyleText(style);
  addScript('http://js.pusherapp.com/1.10/pusher.min.js');

  var check = function(){
    log("waiting for dependancies to load: "+ typeof unsafeWindow.jQuery+ ", "+ typeof unsafeWindow.Pusher);
    if(typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.Pusher == 'undefined' ){
      window.setTimeout(check, 500);
    }    else {
      jQuery = $ = unsafeWindow.jQuery;
      Pusher = unsafeWindow.Pusher;
      boostrapFn();
    }
  }
  check();
}