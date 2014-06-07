// ==UserScript==
// @name           PluginsLib - mhLogin - Tiberium Alliances
// @author         MrHIDEn(game:PEEU)
// @description    Easy login to C&C from the game site
// @downloadURL    https://userscripts.org/scripts/source/137955.user.js
// @updateURL      https://userscripts.org/scripts/source/137955.meta.js
// @description    YOU MUST EDIT email, password, server MANUALY. This is for security reason.
// @description    Alt+0 - Logout, Alt+1... - Login (1-9)
// @grant          none
// @include        http*://*tiberiumalliances.com/*
// @include        http*://*.alliances.commandandconquer.com/*
// @exclude        http*://*facebook.com/*
// @exclude        http*://*youtube.com/*
// @version        2.00
// ==/UserScript==
// @require http://www.example.com/example.js
// @resource resourceName http://www.example.com/example.png
// @require        http://localhost/marek/worker.js
/*NOTES
*/
try 
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;var cce=console.error;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;cce=f;}
  
  var pluginName = "mhLogin";  
  console.info(pluginName,location.href);

  //** IMPORTANT **//
  var defaultEmailPassword = ["fol@low.com", "PaSSword"];//EX ["fol@low.com", "PaSSword"]
  var Logins = [ 
    // "email","password","server" table
    // Replace your accounts details here. Maximum of accounts is 9.
    // EXAMPLE
    // "foo@wow.com", "PaSSword", "Beta 2", 
    // or "2" for/or "Beta 2" or "33" for/or "World 33",
    // "" means servers screen
    // IF email is EMPTY than EMAIL and PASSWORD will be taken from `defaultEmailPassword` !!!
    // "email1", "password1", "server1 name or empty"
      "", "", "",
      "", "", "1",
      "", "", "2",
      "", "", "41",
      "", "", "12",
      "", "", "33",
      "", "", "72",
      "", "", "75",
      "", "", ""
      // To logout press [Alt+0]. To change server press [Alt+1] (1..9). Enjoy new mhLogin script
  ];
  
  //FILL Logins
  for(var i=0; i<10; i++) {
    if(!Logins[3 * i - 2]) {
      Logins[3 * i - 3] = defaultEmailPassword[0];
      Logins[3 * i - 2] = defaultEmailPassword[1];
    } 
  }
  //TEST AREA
  function getDebug(pn) {
    //EX, var debug = (PluginsLib.Debug[pluginName].onFoo = {});
    //where onFoo is a particular entry which corresponds to debug ex debug.foo = 12 -> ...onFoo.foo = 12
    //or just, var debug = PluginsLib.Debug[pluginName];
    var debug = "PluginsLib.Debug." + pn;
    debug = debug.split('.');
    var o = window;
    for(var i=0; i<debug.length; i++) {
      if(typeof(o[debug[i]])=='object') o = o[debug[i]];
      else o = (o[debug[i]] = {});
    }
    return o;
  }          
  var debug = getDebug(pluginName + ".Main");  

  function getSS(key,dval) {
    //link = getSS("link",{"a":0,"id":1});
    dval = dval || null;
    var plkey = "PluginsLib." + pluginName + "." + key;
    var g = sessionStorage.getItem(plkey);
    if(g===null) {
      sessionStorage.setItem(plkey, JSON.stringify(dval));//save default
      return dval;
    }
    return JSON.parse(g);
  }
  function setSS(key,cval) {
    //setSS("link",link);
    cval = cval || null;
    var plkey = "PluginsLib." + pluginName + "." + key;
    sessionStorage.setItem(plkey, JSON.stringify(cval));
  }
  function getWN(key,dval) {
    //link = getWN("link",{"a":0,"id":1});
    //window.top.name or window.name
    dval = dval || null;
    var plkey = "PluginsLib." + pluginName + "." + key;
    if(window.name==="") window.name = "{}";
    var g = {};
    try{
      g = JSON.parse(window.name);
    }catch(ex){}
    if(typeof(g[plkey])=='undefined') {
      g[plkey] = dval;
      window.name = JSON.stringify(g);
      return dval;
    }
    return g[plkey];
  }
  function setWN(key,cval) {
    //setSS("link",link);
    cval = cval || null;
    var plkey = "PluginsLib." + pluginName + "." + key;
    if(window.name==="") window.name = "{}";
    var g = JSON.parse(window.name);
    g[plkey] = cval;
    window.name = JSON.stringify(g);
  }
  function getGM(key,dval) {
    //link = getGM("link",{"a":0,"id":1});
    dval = dval || null;
    var plkey = "PluginsLib." + pluginName + "." + key;
    var g = JSON.parse(GM_getValue(plkey, JSON.stringify(dval)));
    if(g===null) {
      GM_setValue(plkey, JSON.stringify(dval));//save default
      return dval;
    }
    return g;
  }
  function setGM(key,cval) {
    //setGM("link",link);
    cval = cval || null;
    var plkey = "PluginsLib." + pluginName + "." + key;
    GM_setValue(plkey, JSON.stringify(cval));
  }
  function getLS(key,dval) {
    //link = getLS("link",{"a":0,"id":1});
    dval = dval || null;
    //var skey = "PluginsLib." + pluginName + "." + key;
    var skey = key;
    var g = localStorage.getItem(skey);
    if(g===null) {
      localStorage.setItem(skey, JSON.stringify(dval));//save default
      return dval;
    }
    return JSON.parse(g);
  }
  function setLS(key,cval) {
    //setLS("link",link);
    cval = cval || null;
    //var skey = "PluginsLib." + pluginName + "." + key;
    var skey = key;
    localStorage.setItem(skey, JSON.stringify(cval));
  }
  var parseUrl = function(url) {
    // a=1&b=2&c
    var r = {};
    if(url.length === 0) return r;
    var a = url.split("&");
    for(var i=0; i<a.length; i++) {
      var p = a[i].split("=");
      r[p[0]] = p.length>1 ? p[1] : "";
    }
    return r;
  };
  var makePath = function(pathString){
    //EX var ps=makePath("PluginsLib.mhLogins");
    if(typeof(pathString)!='string' || pathString==="") return;//throw
    var a = pathString.split('.');
    var p = window;
    for(var k in a) {
      if(typeof(p[a[k]])=='object') p = p[a[k]];
      else p = p[a[k]] = {};
    }
  };
  var makePair = function(key,val) {
    return key + "=" + val.toString();
  };
  var setOverlay = function() {
    var txt = "Redirect.<br>Wait...";
    var divostyle = 
      'position:absolute;z-index:1000;background-color:#000;opacity:.60;filter:alpha(opacity=60);'+
      'width:100%;height:100%;left:0;top:0;';
    var divistyle = 
      'position:absolute;z-index:1001;background-color:rgba(0,0,0,0.6);'+
      'width:400px;height:100px;left:50%;top:50%;margin:-50px 0 0 -200px;'+
      'display:box;box-pack:center;box-align:center;'+
      'box-shadow: 6px 6px 3px orange;'+
      'text-align:center;font-size:22px;color:#fff;';
    var divo = document.createElement("div");
    var divi = document.createElement("div");
    divo.style = divostyle;
    divi.style = divistyle; 
    //divi.id = "overlayMessage";
    //divi.setAttribute("name", "overlayMessage");
    document.body.appendChild(divo);
    document.body.appendChild(divi);
    divi.innerHTML = '<p>' + txt + '</p>'; 
    //divo.hidden = true
    //divo.hidden = false
  };
  var Hash =  {
    parse: function() {
      //test location.hash = '#{"e":"abc","g":123}';
      //ex   hash = getHash({ex1:"AAA",ex2:777});
      var data = {};
      var j = {};
      try { 
        j = JSON.parse(decodeURI(document.location.hash.substr(1))); 
      }catch (ex){}
      for(var k in j) data[k] = j[k];
      return data;
    },
    make: function(data,prefix) {
      var hash = JSON.stringify(data);//encodeURI do we need that here?
      if(typeof(prefix)!='undefined' && prefix) hash = "#" + hash;
      return hash;
    },
    set: function(data) {
      var hash = JSON.stringify(data);//encodeURI do we need that here?
      //hash = "#" + hash;
      location.hash = hash;
      return hash;
    }
  };
  var redirectPage = function(url) {
    setOverlay();
    if(typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined') {   
      qx.core.Init.getApplication().setShowUnloadWarning(false);
    }
    window.location.assign(url);
    if(location.hostname == "www.tiberiumalliances.com" && location.pathname == (ln + "/game/world")) location.reload(true);
  };
  var receiveMessage = function(event) {//MSG RECEIVER
    var j;
    var data = event.data;
    if (event.origin === "https://gamecdnorigin.alliances.commandandconquer.com") {//< from to "www.tiberiumalliances.com"
      //console.log("receiveMessage 'gamecdnorigin' ",{data:data});
      if(data.indexOf('{"servers":') === 0) {
        j = JSON.parse(data);
        servers = j.servers;
        session = j.session;
        //ccl('rm servers',servers);
        setSS('servers',servers);
        Login(id,{type:"getServers",servers:servers,session:session});// login on particular server, if match your Logins[] list
      }
      else console.warn("Message:",{event_data:event.data});
    }
  };
  var getServers = function() {
    //ccl("getServers","location.href",location.href);
    if(typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined') {
      if(typeof(SessionId)=='undefined') {
        ccl('NO SessionId');
        Login(id);
        return;
      }
      var Request = function(w) {
        //ccl("Request");
        var rUrl = "https://gamecdnorigin.alliances.commandandconquer.com/Farm/Service.svc/ajaxEndpoint/";
        var rq = new qx.io.remote.Request(rUrl + "GetOriginAccountInfo", "POST", "application/json");
        rq.setProhibitCaching(false);
        rq.setRequestHeader("Content-Type", "application/json");
        var sb = new qx.util.StringBuilder(50);
        sb.add('{"session":"', SessionId, '"}');
        rq.setData(sb.get());
        rq.setTimeout(30 * 1000);//30s
        rq.addListener("completed", function (e) {
          var content = e.getContent();
          if(content.ErrorCode===0) {
            //ccl("completed");
            var servers = {d:{},c:0};
            for(var i=0; i<content.Servers.length; i++) {
              if(content.Servers[i].Account == content.Account) {
                var srv = {};//copy only needed values
                srv.Name = content.Servers[i].Name;
                srv.Url = content.Servers[i].Url;
                servers.d[content.Servers[i].Name] = srv;
                servers.c++;
              }
            }
            window.top.postMessage('{"servers":' + JSON.stringify(servers) + ',"session":"' + SessionId + '"}', "*");//call tiberium window, the top one
          }
          else setTimeout(getServers, 200);
        }, this);
        //TODO remove
        //rq.addListener("failed", function (e) {cce('Request f',e);}, this);
        //rq.addListener("timeout", function (e) {cce('Request t',e);}, this);
        //rq.addListener("aborted", function (e) {cce('Request a',e);}, this);
        rq.send();
      };
      Request(window);
    }
    else setTimeout(getServers, 200);
  };
  var Login = function(id,event) {
    //PREPARE
    var debug = (PluginsLib.Debug[pluginName].Login = {}); 
    id = parseInt(id,10);
    
    var link = Hash.parse();
    link.id = id;
    var hash = Hash.make(link,true);    
    debug.hash = hash;
    
    var k;
    var sn = "";
    if(id<0 || id>9) {
      console.error("Plugin 'mhLogin' Login 'id' is out of range. id:",id);
      return;
    }
    if (Logins.length === 0 || (id * 3) > Logins.length) {
      console.error("Plugin 'mhLogin' Login 'Logins' is invalid.");
      return;
    }
    sn = Logins[3 * id - 1];    
    
    //REDIRECT  
    if(id === 0) {
      console.warn("PluginsLib."+pluginName+' LOGOUT');
      redirectPage("https://www.tiberiumalliances.com/logout");
      return;
    }  
    else if(typeof(event)!='undefined') {
      if(event.type=="getServers" && sn) {
        var isUsingFacebook = function(){ 
          if (typeof (UsingFacebook) != 'undefined') return UsingFacebook == "True";
          else return false;
        };
        servers = event.servers;
        session = event.session;
        for(k in servers.d) {
          if(k.indexOf(sn) >= 0) {
            //sn match server.Name, submit
            console.info("PluginsLib."+pluginName+ " GOING ON '" + servers.d[k].Name +"'");
            if(label) label.innerHTML = "Going on '" + servers.d[k].Name +"'";
            var url = servers.d[k].Url;
            url = url.replace("http:", document.location.protocol);
            if (url.substr(url.length - 1, 1) == "/") url = url.substr(0, url.length - 1);
            if (window.location == window.parent.location || isUsingFacebook()) {
              var html;
              html = "<form name='loginform' id='loginform' action='" + url + "/index.aspx" + hash + "' method='post'>";
              html = html + "<input type='text' name='dummy' id='dummy' class='input' value=\"\" />";
              html = html + "<input type='hidden' name='SessionId' id='SessionId' class='input' value='" + session + "' />";
              if (typeof (UsingFacebook) != 'undefined') html = html + "<input type='hidden' name='UsingFacebook' id='UsingFacebook' class='input' value='True' />";
              if (typeof (Item) != 'undefined') html = html + "<input type='hidden' name='Item' id='Item' class='input' value='" + Item + "' />";
              html = html + "</form>";
              var div = document.createElement("div");
              div.style.width = 0;
              div.style.height = 0;
              div.innerHTML = html;
              document.body.appendChild(div);
              document.loginform.submit();
            }
            else top.location.href = "start.aspx?server=" + url + "&sessionID=" + session + hash;
            return;
          }
        }      
      }
      return;
    }
    else if (/\/login\/auth$/i.test(location.pathname)) {
      //LOGIN
      sn = Logins[3 * id - 1];
      var serverName = "";
      if(servers!==null) {
        for(k in servers.d) {
          if(k.indexOf(sn) >= 0) {
            console.lof("l Server.Name '" + servers.d[k].Name +"'");
            serverName = servers.d[k].Name;
            break;
          }
        }
      }
      console.warn(pluginName+' LOGIN ' + id + " " + sn);//+hash);
      var em = Logins[3 * id - 3];
      var pw = Logins[3 * id - 2];
      var form = document.querySelector("#loginForm");    
      debug.form = form;
      if(form!==null) {
        var flog = document.querySelector(".form-t-middle");
        if(flog) {
          flog.style='text-align:center;font-size:14px;';
          if(!serverName) serverName = sn;
          if(sn) flog.innerHTML = '<span style="color:yellow;">Loging to "' + serverName + '..."</span>';
          else flog.innerHTML = '<span style="color:yellow;">Loging to  "' + "choice page." + '"</span>';
        }
        form.action = "/j_security_check" + hash;
        form.elements.j_username.value = em;
        form.elements.j_password.value = pw;
        form.elements.web_remember_me.checked = true;
        if(document.querySelector("div#captcha-container") === null) {
          setOverlay();
          var btn = document.querySelector(".button-field");
          btn.value = btn.value + "...";
          form.submit();
        }
        else {
          console.warn("PluginsLib."+pluginName+" CAPTCHA stopped script. I will try again in 10 minutes.");
          if(flog) flog.innerHTML = '<span style="color:red;">CAPTCHA stopped script</span>';
          setTimeout(Login, 10*60*1000, 0);//m try again later, logout
          return;
        }
      }
    }
    else {
      //GO
      //https://www.tiberiumalliances.com/pt_PT/game/world
      console.warn("PluginsLib."+pluginName+' REDIRECT ');
      redirectPage("https://www.tiberiumalliances.com" + ln + "/game/world" + hash);
    }    
  };
  var Key = function(e) {
    //console.info("Key");
    var debug = (PluginsLib.Debug[pluginName].Key = {});
    debug.e = e;
    var k = String.fromCharCode(e.keyCode);
    // ALT+
    if (e.altKey && !e.altGraphKey && !e.ctrlKey && !e.shiftKey) {
      //console.log("Alt+"+k);	
      switch (k) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        Login(k);
        break;
      default:
        // other letters
      }
    }
    // CTRL+k
    else if (e.ctrlKey && !e.altGraphKey && !e.altKey && !e.shiftKey) {
    }
    // CTRL+ALT+k
    else if (e.ctrlKey && e.altKey && !e.altGraphKey && !e.shiftKey) {
    }
  };

  // MAIN
  var pn = window.location.pathname;
  var ln = "";
  if(/\/login\/auth$/i.test(pn)) ln = pn.replace(/\/login\/auth$/i,"");
  if(/\/home$/i.test(pn)) ln = pn.replace(/\/home$/i,"");
  if(/\/game\/world$/i.test(pn)) ln = pn.replace(/\/game\/world$/i,"");
  if(/\/game\/worldBrowser$/i.test(pn)) ln = pn.replace(/\/game\/worldBrowser$/i,"");

  makePath("PluginsLib."+pluginName);
  PluginsLib[pluginName] = {
    NAME: 'Login',
    PLUGIN: 'mhLogin',
    AUTHOR: 'MrHIDEn',
    VERSION: 2.00,
    REQUIRES: '',
    NEEDS: '',
    INFO: 'Easy Login/Logout script',
    WWW: 'http://userscripts.org/scripts/show/137955',
    SIZE: 0
  };

  //GLOBAL VARS
  var t;//temp
  var id;
  var servers = null;
  var session = null;
  var label = null;
  
  //PARSE id & a
  var link = Hash.parse();
  link.id = typeof(link.id)!='undefined' ? link.id : 1;
  var hash = Hash.make(link,true);
  //RESTORE
  id = link.id;
  
  if(/\/login\/auth$/i.test(location.pathname)) {
    //ccl("m \/login\/auth$/");
    //if(id>=0 && id<=10) {
      Login(id);
    //}
  }
  else if(/http.*:\/\/prodgame.*\.alliances\.commandandconquer\.com\/.*\/index.aspx.*/i.test(location.href)) {
    //ccl("m /http.*:\/\/prodgame.*\.alliances\.commandandconquer\.com\/.*\/index.aspx.*/");
  }
  else if(/\/game\/world$/i.test(location.pathname)) {
    //ccl("m \/game\/world$/");
    //ccw("this is: /game/world ",hash);
    label = document.querySelector("div.form-top");
    label.style = 'text-align:center;font-size:15px;color:orange;';
    if(Logins[3 * id - 1]==="") {
      t = "Choose server";
    }
    else {
      t = "Login to '" + Logins[3 * id - 1] + "'";
    }
    label.innerHTML = t;
  }
  else if(/WebWorldBrowser/i.test(location.pathname)) {
    //https://gamecdnorigin.alliances.commandandconquer.com
    //ccl("m \/WebWorldBrowser\/",window);
    getServers();//this will call back    
  }
  // Events
  document.addEventListener("keyup", Key, false);
  window.addEventListener("message", receiveMessage, false);
  //window.addEventListener('storage', storageChanged, false);
  // Done
  if(/http.*:\/\/prodgame.*\.alliances\.commandandconquer\.com\/.*\/index.aspx.*/i.test(location.href) || /\/home$/i.test(location.pathname) || /\/login\/auth$/i.test(location.pathname) || /\/game\/world$/i.test(location.pathname)) {
    console.info("Plugin 'mhLogin' lang:",ln);
    //console.info("Plugin 'mhLogin' LOADED @ " + location.href);
    console.info("Plugin 'mhLogin' LOADED @ " + location.host);
  }
}
catch (e) {
  console.error("Plugin 'mhLogin' ERROR", e);
}