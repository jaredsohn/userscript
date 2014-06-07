// ==UserScript==
// @name           Xhodon-Test
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @namespace      Xhodon
// @description    Addon for Xhodon - Testversion
// @author         Pitti68
// @email          pitti68@go4more.de
// @license        GPL v2
// @include        http://*.xhodon.*
// @exclude        http://forum.xhodon.*
// @exclude        http://wiki*.xhodon.*
// @exclude        http://chat.xhodon.*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @version        0.1
// @history        0.1    09/27/2013: Initial version.
// ==/UserScript==

// Print a debug message on the console. Does nothing if debug_mode is false.
var xVersion="0.1";
var xID="xxxxxx";
var debug_mode=false;
var debug=((debug_mode&&console&&typeof (console.log)=='function')?function (text) {console.log(text);}:function (text) {});

//********************
// Save/Load DataStack
function serialize (mixed_value) {
  var _getType=function (inp) {
    var type=typeof inp,match;
    var key;
    if (type=='object' && !inp) return 'null';
    if (type=="object") {
      if (!inp.constructor) return 'object';
      var cons=inp.constructor.toString();
      if (match=cons.match(/(\w+)\(/)) cons=match[1].toLowerCase();
      var types=["boolean","number","string","array"];
      for (key in types) {if (cons==types[key]) {type=types[key]; break;}}
    }
    return type;
  };
  var type=_getType(mixed_value);
  var val,ktype='';
  switch (type) {
  case "function": val=""; break;
  case "undefined": val="N"; break;
  case "boolean": val="b:"+(mixed_value?"1":"0"); break;
  case "number": val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value; break;
  case "string": val="s:"+mixed_value.length+":\""+mixed_value+"\""; break;
  case "array":
  case "object":
    val="a";
    var count=0;
    var vals="";
    var okey;
    var key;
    for (key in mixed_value) {
      ktype=_getType(mixed_value[key]);
      if (ktype=="function") continue;
      okey=(key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
      vals+=serialize(okey)+serialize(mixed_value[key]);
      count++;
    }
    val+=":"+count+":{"+vals+"}"; break;
  }
  if (type!="object"&&type!="array") val+=";";
  return val;
}
function unserialize (data) {
  var error=function(type,msg,filename,line) {throw new window[type](msg,filename,line);};
  var read_until=function (data,offset,stopchr) {
    var buf=[];
    var chr=data.slice(offset,offset+1);
    var i=2;
    var datalength=data.length;
    while(chr!=stopchr) {
      if ((i+offset)>datalength) error('Error','Invalid');
      buf.push(chr);
      chr=data.slice(offset+(i-1),offset+i);
      i+=1;
    }
    return [buf.length,buf.join('')];
  };
  var read_chrs=function(data,offset,length) {
    buf=[];
    for (var i=0; i<length; i++) {
      var chr=data.slice(offset+(i-1),offset+i);
      buf.push(chr);
    }
    return [buf.length,buf.join('')];
  };
  var _unserialize=function(data,offset) {
    if (!offset) offset=0;
    var buf=[];
    var dtype=(data.slice(offset,offset+1)).toLowerCase();
    var dataoffset=offset+2;
    var typeconvert=new Function('x','return x');
    var chrs=0;
    var datalength=0;

    switch (dtype) {
    case "i":
      typeconvert=new Function('x','return parseInt(x)');
      var readData=read_until(data,dataoffset,';');
      var chrs=readData[0];
      var readdata=readData[1];
      dataoffset+=chrs+1;
      break;
    case "b":
      typeconvert=new Function('x','return (parseInt(x)==1)');
      var readData=read_until(data,dataoffset,';');
      var chrs=readData[0];
      var readdata=readData[1];
      dataoffset+=chrs+1;
      break;
    case "d":
      typeconvert=new Function('x','return parseFloat(x)');
      var readData=read_until(data,dataoffset,';');
      var chrs=readData[0];
      var readdata=readData[1];
      dataoffset+=chrs+1;
      break;
    case "n":
      readdata=null;
      break;
    case "s":
      var ccount=read_until(data,dataoffset,':');
      var chrs=ccount[0];
      var stringlength=ccount[1];
      dataoffset+=chrs+2;
      var readData=read_chrs(data,dataoffset+1,parseInt(stringlength));
      var chrs=readData[0];
      var readdata=readData[1];
      dataoffset+=chrs+2;
      if (chrs!=parseInt(stringlength) && chrs!=readdata.length) {error('SyntaxError','String length mismatch');}
      break;
    case "a":
      var readdata={};
      var keyandchrs=read_until(data,dataoffset,':');
      var chrs=keyandchrs[0];
      var keys=keyandchrs[1];
      dataoffset+=chrs+2;
      for (var i=0; i<parseInt(keys); i++) {
        var kprops=_unserialize(data,dataoffset);
        var kchrs=kprops[1];
        var key=kprops[2];
        dataoffset+=kchrs;
        var vprops=_unserialize(data,dataoffset);
        var vchrs=vprops[1];
        var value=vprops[2];
        dataoffset+=vchrs;
        readdata[key]=value;
      }
      dataoffset+=1;
      break;
    default:
      error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);
      break;
    }
    return [dtype,dataoffset-offset,typeconvert(readdata)];
  };
  return _unserialize(data,0)[2];
}


var server="";
var page="";



//****************************************************
// allgemeine Funktionen
//****************************************************
// aktuelle Seite abfragen
var currentServer=function() {
  var erg=/http:\/\/([^\.]*)\.xhodon.*/;
  var res=erg.exec(document.location);
  return (res&&res.length>1)?res[1]:"";
};
var currentPage=function() {
  var hash=document.location.hash;
  var pos=hash.indexOf(".php");
  var slashPos=hash.lastIndexOf("/",pos);
  if ( pos==-1||slashPos==-1) {return {name:false};}
  var page=hash.substring(slashPos+1,pos);
  if(page=="index") {
    var slashPos2=hash.lastIndexOf("/",slashPos-1);
    var page=hash.substring(slashPos2+1,slashPos);
  }
  return {name:page};
};
// Helden-ID abfragen
var HeroID=function(ref) {
	var hero_ref=/heros.php\?numeric\[hero_id\]=(\d+)/.exec(ref);
	return (hero_ref&&hero_ref.length>=1)?hero_ref[1]:-1;
};



//****************************************************
// Initialisierung
//****************************************************
var Init=function() {
	server=currentServer();
  page=currentPage();
  var count=0;
}



// Stores the original xhodon function that gets executed after ajax loads.
var orig=unsafeWindow.ajax_load;
unsafeWindow.ajax_load=function (display) {
  orig(display);
  if (display==false) {
    setTimeout(function() {
      Init();
    },1);
  }
}
