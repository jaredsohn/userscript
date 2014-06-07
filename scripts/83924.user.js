// ==UserScript==
// @name           DS - DualForum
// @namespace      Die Stämme
// @author	   still80
// @description    ReadMarker fuer dual account
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.nl/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==


/*
changelog
v0.0.1 - initial release
v0.0.2 - opera support, an dieser Stelle ein Dankeschoen an Hypix fuer die Bereitstellung seiner storage klasse
v0.0.3 - overview
*/






// Storage-Klasse
// Autor: Hypix
// Zur freien Verwendung
function Storage(prefix,forceGM)
{
  var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
  var win = gm ? unsafeWindow : window;
  var ls = false;
  var intGetValue;
  var intSetValue;
  var prefix = prefix;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
  if( !ls && !gm )
    throw("Keine geeignete Speichermöglichgkeit gefunden");
  if( forceGM && gm || !ls)
  {
    if( gm )
    {
      prefix = prefix + "_" + document.location.host.split('.')[0];
      intSetValue = function(key,value) 
      {
        GM_setValue(prefix+"_"+key,value);
      };
      intGetValue = function(key,defaultValue)
      {
        return GM_getValue(prefix+"_" + key, defaultValue);
      }
      this.deleteValue = function(key)
      {
        GM_deleteValue(prefix+"_"+key);
      }
      this.listValues = function(re)
      {
        var allkeys = GM_listValues();
        var serverKeys = [];
        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
        if( typeof(re) != "undefined" )
          var reKey = new RegExp(re);
        for( var i = 0; i < allkeys.length; i++ )
        {
          var res = allkeys[i].match(rePrefix);
          if( res )
          {
            if( reKey ) 
            {
              res = res[1].match(reKey);
              if( res )
                serverKeys.push(res);
            }
            else
              serverKeys.push(res[1]);
          }
        }
        return serverKeys;
      }
    }
  }
  else if( ls )
  {
    intSetValue = function(key,value) 
    {
      localStorage.setItem(prefix+"_"+key, value );
    };    
    intGetValue = function(key,defaultValue)
    {
      var value = localStorage.getItem(prefix+"_"+key);
      if( value )
        return value;
      else
        return defaultValue;
    };
    this.deleteValue = function(key)
    {
      localStorage.removeItem(prefix+"_"+key);
    }
    this.listValues = function(re)
    {
      var keys = [];
      var rePrefix = new RegExp("^"+prefix+"_(.*)$");
      if( typeof(re) != "undefined")
        var reKey = new RegExp(re);
      for( var i = 0; i < win.localStorage.length; i++ )
      {
        var res = localStorage.key(i).match(rePrefix);
        if( res )
        {
          if( reKey ) 
          {
            res = res[1].match(reKey);
            if( res )
              keys.push(res);
          }
          else
            keys.push(res[1]);
        }
      }
      return keys;
    }
  }
  this.clear = function(re)
  {
    var keys = this.listValues(re);
    for( var i = 0; i < keys.length; i++ )
      this.deleteValue(keys[i]);
  }
  this.setValue = function(key,value)
  {
    switch( typeof(value) )
    {
      case "object":
      case "function":
        intSetValue(key,"j"+JSON.stringify(value));
        break;
      case "number":
        intSetValue(key,"n"+value);
        break;
      case "boolean":
        intSetValue(key,"b" + (value ? 1 : 0));
        break;
      case "string":
        intSetValue(key,"s" + value );
        break;
      case "undefined":
        intSetValue(key,"u");
        break;
    }
  }  
  this.getValue = function(key,defaultValue)
  {
    var str = intGetValue(key);
    if( typeof(str) != "undefined" )
    {
      switch( str[0] )
      {
        case "j":
          return JSON.parse(str.substring(1));
        case "n":
          return parseFloat(str.substring(1));
        case "b":
          return str[1] == "1";
        case "s":
          return str.substring(1);
        default:
          this.deleteValue(key);
      }
    }
    return defaultValue;
  }
  this.getString = function(key)
  {
    return intGetValue(key);
  }
  this.setString = function(key,value)
  {
    intSetValue(key,value);
  }
}

// Ende Storage-Klasse



















// Dual-Forum


function reset(){
	var storage = new Storage("prefix",false);
	storage.setValue("ds_dualforum", "");
	storage.setValue("ds_dualforum_ov", "");
}

function string_replace(haystack, find, sub) {
    return haystack.split(find).join(sub);
}

if (location.href.match("screen=view_thread&thread")) {
	var storage = new Storage("prefix",false);
	var visthreads = document.getElementsByClassName("igmline small");
	var posts;
	var newposts = "";
	var data = storage.getValue("ds_dualforum");
	
	if (data != null) {
		posts = data.split(";");
	} else posts = new Array();

	for (i = 0; i < visthreads.length; i++ ) {
		var link = visthreads[i].getElementsByTagName("a")[1];
		var buildanchor = false;

		if (link!=undefined) { // thread closed or insufficient priviliges
			var post = link.href.substring(link.href.indexOf('quote_id')+9, link.href.lastIndexOf('&'));
			var hasread = false;
			for (j = 0; j < posts.length; j++) {
				if (posts[j]==post) hasread = true;
			}
			var img = document.createElement("IMG");
			img.src = (hasread) ? "/graphic/dots/green.png?1" : "/graphic/dots/red.png?1";
			if (!hasread) {
				newposts += ";" + post;
				if (!buildanchor) {
					var anchorTag = document.createElement("a"); 
					anchorTag.appendChild(document.createTextNode(" "));
					anchorTag.setAttribute("id", "lur"); 
					anchorTag.href = "#lastunread";
					visthreads[i].appendChild(anchorTag);
					buildanchor = true;
				}
			}
			visthreads[i].appendChild(img);
			/*if (i == visthreads.length-1) {
				var input_clear = document.createElement('input');
  				input_clear.setAttribute('type','button');
  				input_clear.setAttribute('value','alle Gelesen-Markierungen löschen');
  				input_clear.addEventListener('click',reset,false);
  				visthreads[i].appendChild(input_clear);
			}*/
		}
	}
	if (document.getElementById("lur")) document.getElementById("lur").focus();
	if (newposts.length > 0) storage.setValue("ds_dualforum", data + newposts);
}

if (location.href.match("screen=view_forum&forum_id=")) {
	var storage = new Storage("prefix",false);
	var vis = document.getElementsByClassName("vis");
	var tds = vis[0].getElementsByTagName("td");
	var threadid;
	var postcount;

	var posts;
	var newposts = "";
	var data = storage.getValue("ds_dualforum_ov");
	if (data != null) {
		posts = data.split(";");
	} else posts = new Array();

	for(var i = 0; i < tds.length; i++) {
		if (i % 4 == 0) {
			var link = tds[i].getElementsByTagName("a")[0];
			if (link!=undefined) { // thread closed or insufficient priviliges
				threadid = link.href.substring(link.href.indexOf('&thread_id=')+11, link.href.length);
			}
		}
		if ((i+1) % 4 == 0) {
			postcount = tds[i].textContent;

			var threadinDB = false;
			var hasread = false;
			for (j = 0; j < posts.length; j++) {
				var p = posts[j].split("-");
				if (p[0]==threadid) {
					threadinDB = true;
					if (p[1]==postcount) {
						//hasread-markierung
						hasread = true;
					} else {
						//hasnotread
						data = string_replace(data, ";"+threadid+"-"+p[1], ";"+threadid+"-"+postcount);
					}
				}
			}
			var img = document.createElement("IMG");
			img.src = (hasread) ? "/graphic/dots/green.png?1" : "/graphic/dots/red.png?1";
			tds[i].appendChild(img);
			

			if (!threadinDB) newposts += ";" + threadid + "-" + postcount;
		}
	}
	storage.setValue("ds_dualforum_ov", data + newposts);
}

