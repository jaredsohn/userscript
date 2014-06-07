// ==UserScript==
// @name          test_openomy
// @namespace	  ysn
// @description	  test GM js access to openomy
// @include       http://www.openomy.com/*
// ==/UserScript==


utils = new OpenomyUtils();

unsafeWindow.next = function() {
   ojs =  new Openomy();

   //ojs.get_all_tags();
   //ojs.create_tag('aaa2',cb);
   //ojs.delete_tag('25610');
   //ojs.add_file('a');
}

unsafeWindow.test = function() {
   var debug = document.getElementById('user_see');
   debug.innerHTML = document.getElementById('user_in').value;
   var argv = document.getElementById('user_in').value.split();
   var argc = argv.length
   if( argc < 1)return;
   var s = '';
   var ojs =  new Openomy();  

   var print_all = function(files) {
      for(var k in files)
         s+= files[k].id+' '+ files[k].name + '\n';
      debug.innerHTML = s;
   }

   if(argv[0] == 'tags') {
     ojs.get_all_tags(print_all);
   } else if (argv[0] == 'files') {
     ojs.get_all_files(print_all);
   } else if (argv[0] == 'reset_token') {
     ojs.reset_token();
   }
}
document.body.innerHTML = '<input type=text id=user_in size=60> <input type=submit VALUE="Search" onclick=window.test()>'
+ '<br><textarea id=user_see cols=80>what user will see</textarea>' + document.body.innerHTML;

//----------------------------------------
var priv_key="13073834";

// App key to be set here
var app_key="4ea1becb50a2d67b92e8e934afcf3356";


function OpenomyFile (file_id, file_name) {
   this.id = file_id;
   this.name = file_name;
}

OpenomyFile.prototype.download_file_url  = function ( base_url, file_token) {
   var paramlist = {};
   paramlist['fileToken'] = file_token;
   //var cksum = utils.get_md5_sig(paramlist);
   var url = utils.download_url + "?" + utils.encode_params(paramlist);
   return url;
};

// timeout="10"
OpenomyFile.prototype.retrieve_file = function (handle, timeout) {
   paramlist = {};
   paramlist['method'] = "Files.GetFile";
   paramlist['fileID'] = this.id;
   if(timeout)paramlist['timeout'] = timeout;
   else paramlist['timeout'] = '10';
   //cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);

   var cb = function(d){
      var url = d.getElementsByTagName("baseurl")[0].textContent;
      var token = d.getElementsByTagName("filetoken")[0].textContent;
      GM_log(token+url);
      if(handle)handle(url,token);  
   }

   //url = this.download_file_url(base_url, file_token);
   //urllib.urlretrieve(url, local_filename);
   
   utils.urlopen(url, cb);
};


function OpenomyTag( tag_id, tag_name){
   this.id = tag_id;
   this.name = tag_name;
   this.file_list = [];
}

OpenomyTag.prototype.get_all_files = function (handle){
   paramlist = {};
   paramlist['method'] = "Tags.GetTag";
   paramlist['tagID'] = this.id;

   //cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);
   var cb = function(d) {
      var objs = d.getElementsByTagName("file");
      var files = new Array();
      for (var i = 0; i < objs.length; i++) {
         var f = new OpenomyFile(objs[i].getAttribute("id"),
                                 objs[i].textContent);
         files.push(f);
      }
      if(handle)handle(files);
   }  

   utils.urlopen(url, cb);
};

OpenomyTag.prototype.get_file_by_name = function OpenomyTag_get_file_by_name(filename){
   for (file in this.file_list){
      if (file.get_name() == filename)
         return file;
   }
};


// Miscellaneous utilities
function OpenomyUtils(){
   this.base_api_url = "http://www.openomy.com/api/rest/";
   this.download_url = "http://www.openomy.com/api/download/";
   this.base_login_url = "http://www.openomy.com/api/login/";
   this.conf_token = undefined;
};

// Obtain an MD5 signature for the given paramater list. This has be to be passed for every command
// default: use_conf_token = 1
OpenomyUtils.prototype.get_md5_sig = function (paramlist, use_conf_token ){
   locallist = paramlist;
   locallist['applicationKey'] = app_key;
   if (use_conf_token == undefined){
      locallist['confirmedToken'] = this.conf_token;
   }

   var keylist = new Array;  for(var k in locallist) keylist.push(k);
   keylist.sort();
  
   var sig_str = "";
   for (k in keylist){
      sig_str += keylist[k] + "=" + locallist[keylist[k]];
   }       
   sig_str += priv_key;
   //GM_log("sig: "+sig_str);

   return hex_md5(sig_str);
   //md5.new(sig_str).hexdigest();
};


// Encode parameters for including in the URL
// use_conf_token = 1
OpenomyUtils.prototype.encode_params = function(paramlist, cksum, use_conf_token){
   var cksum = this.get_md5_sig(paramlist,use_conf_token);
   locallist = paramlist;
   locallist['applicationKey'] = app_key;
   if (use_conf_token == undefined){
      locallist['confirmedToken'] = this.conf_token;
   }
   locallist['signature'] = cksum;

   var keys = new Array;  for(var k in locallist) keys.push(k);
   keys.sort();
  
   var str = "";
   for (k in keys)
      str += escape(keys[k]) + '=' + escape(locallist[keys[k]])+ '&';

   return str.substring(0,str.length-1);
};

// Create the body for a POST request
// From: http://berserk.org/uploadr/
//  BOUNDARY = '-----'+mimetools.choose_boundary()+'-----
OpenomyUtils.prototype.encode_multipart_formdata = function(fields, files, BOUNDARY){
   var CRLF = '\r\n';
   var L = [];
   if(!BOUNDARY){
      var daytime = new Date();
      BOUNDARY='-----'+hex_md5(daytime.getTime())+'-----'; ;
   }
   for (var k in fields){   
      L.push('--' + BOUNDARY);
      L.push('Content-Disposition: form-data; name="'+k+'"');
      L.push('');
      L.push(fields[k]);
   }
   for (var k in files){
      //=ysn filetype = mimetypes.guess_type(filename)[0] or 'application/octet-stream';
      var a = files[k];
      filetype = 'image/gif';
      L.push('--' + BOUNDARY);
      L.push('Content-Disposition: form-data; name="'+a.key+'"; filename="'+a.filename+'"');
      L.push('Content-Type: '+ filetype);
      L.push('');
      L.push(a.value);

      L.push('--' + BOUNDARY + '--');
      L.push('');
      body = L.join(CRLF);
      content_type = 'multipart/form-data; boundary='+ BOUNDARY; // XXX what if no files are encoded
   }
   return {content_type:content_type, body:body};
};

// Build a urllib2 HTTP POST request
// From: http://berserk.org/uploadr/
//  txheaders=None
OpenomyUtils.prototype.build_request = function (theurl, fields, files, txheaders){
   var a = this.encode_multipart_formdata(fields, files);
   if (! txheaders){ txheaders = {};}
   txheaders={'Content-type': a.content_type,'Content-length': a.body.length};
   GM_log(a.content_type+'\n'+a.body.length);
   GM_log(a.body);
   GM_xmlhttpRequest({
      method:'POST',
            url: theurl,
            headers: txheaders,
            data: a.body,
            onload:function(results){
            GM_log(results.responseText);
         }

      })  
   
};

OpenomyUtils.prototype.is_success = function (d){
   return (d.getElementsByTagName("success")[0]) ? 1 : 0;
};


OpenomyUtils.prototype.urlopen = function (url, func){
   GM_log('get'+url);
   GM_xmlhttpRequest({
      method:'GET',
            url: url,
            onload:function(results){
            var d = toDOM(results.responseText);
            if (utils.is_success(d)){
               GM_log(results.responseText);
               //TODO explain why can not use func.apply(d);
               if(func)func(d);
            }else{
               GM_log(results.responseText);
               // something wrong, clear token
		GM_setValue('cfm_token', '' );
   		GM_setValue('uncfm_token','');
            }
         }
      });
};

// The main class
function Openomy(){
    this.taglist = [];
    this.filelist = [];

    // util.conf_token
    var cfm_token =  GM_getValue('cfm_token');

    // If there is no confirmed token specified, then obtain one: let the user authenticate
    if (cfm_token == undefined || cfm_token.length != 40){
       this._obtain_confirmed_token();
       //assert (len(utils.conf_token) != 40)
    } else {
       utils.conf_token = cfm_token;
       GM_log(cfm_token.length+'cfm_token'+cfm_token);
    }
};
Openomy.prototype.reset_token = function (){
   GM_setValue('cfm_token', '' );
   GM_setValue('uncfm_token','');
};
// Obtain a confirmed token for the application
Openomy.prototype._obtain_confirmed_token = function (){
   var uncfm_token = GM_getValue('uncfm_token');
   if (uncfm_token == undefined || uncfm_token.length != 32 ){
      // Get an unconfirmed token first
      this._get_unconfirmed_token();
      return;
   }
   
   // Now that the app is authorized, obtain a confirmed token
   this._get_confirmed_token(uncfm_token);

};

Openomy.prototype._get_unconfirmed_token =  function (){
   paramlist = {};
   paramlist['method'] = "Auth.GetUnconfirmedToken";
   //cksum = utils.get_md5_sig(paramlist, 0);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist, 0);

   var cb = function (d){
      var uncfm_token = d.getElementsByTagName("unconfirmedtoken")[0].textContent;
      GM_log(uncfm_token.length+'uncfm_token ' + uncfm_token);
      
      // Prompt the user to authorize the app in the browser and respond back
      paramlist = {};
      paramlist['unconfirmedToken'] = uncfm_token;
      cksum = utils.get_md5_sig(paramlist, 0);
      url = utils.base_login_url + "?" + utils.encode_params(paramlist, cksum, 0);
      GM_setValue('uncfm_token', uncfm_token);
      window.location = url;
   };

   utils.urlopen(url, cb);

};

Openomy.prototype._get_confirmed_token = function( uncfm_token){
   paramlist = {};
   paramlist['method'] = "Auth.GetConfirmedToken";
   paramlist['unconfirmedToken'] = uncfm_token;
   //cksum = utils.get_md5_sig(paramlist, 0);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist, 0);

   var cb = function (d) {
      var cfm_token = d.getElementsByTagName("confirmedtoken")[0].textContent;
      utils.cfm_token = cfm_token;
      GM_log('cfm_token' + cfm_token);
      GM_setValue('cfm_token', cfm_token);      
   }

   utils.urlopen(url, cb);
};

Openomy.prototype.get_all_tags =  function(handle){
   paramlist = {};
   paramlist['method'] = "Tags.GetAllTags";
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);
   
   var cb =  function (d) {
      var taglist = [];
      var dTags = d.getElementsByTagName("tag");
      for (var i = 0; i < dTags.length; i++) {
         var tag = new OpenomyTag( dTags[i].getAttribute("id"),
                                   dTags[i].textContent);
         GM_log(tag.name);
         taglist.push(tag);
      }
      if(handle)handle(taglist);
   }
   utils.urlopen(url, cb);
};                

Openomy.prototype.create_tag =  function (tag_name, handle){
   paramlist = {};
   paramlist['method'] = "Tags.CreateTag";
   paramlist['tagName'] = tag_name;
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);
   var cb= function(d){
      //print "Tag", tag_name, "created successfully";
      var dtag =  d.getElementsByTagName("tag")[0];
      var t = new OpenomyTag(dtag.getAttribute("id"),
                             dtag.textContent);
      if(handle)handle(t);
   };

   utils.urlopen(url, cb);
};
			
Openomy.prototype.delete_tag =  function (tag_id, handle){
   paramlist = {};
   paramlist['method'] = "Tags.DeleteTag";
   paramlist['tagID'] = tag_id;
   //   cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);
   utils.urlopen(url);
};

			
Openomy.prototype.add_file_to_tag = function( file_id, tag_id, handle){
   paramlist = {};
   paramlist['method'] = "Tags.AddFileToTag";
   paramlist['tagID'] = tag_id;
   paramlist['fileID'] = file_id;
   //   cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);

   utils.urlopen(url);
};

Openomy.prototype.delete_file_from_tag = function(file_id, tag_id, handle){
   paramlist = {};
   paramlist['method'] = "Tags.DeleteFileFromTag";
   paramlist['tagID'] = tag_id;
   paramlist['fileID'] = file_id;
   // cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);

   utils.urlopen(url);
};
			
Openomy.prototype.get_all_files = function(handle){
   paramlist = {};
   paramlist['method'] = "Files.GetAllFiles";
   //   cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist);
   var cb = function(d) {
      var objs = d.getElementsByTagName("file");
      var files = new Array();
      for (var i = 0; i < objs.length; i++) {
         var f = new OpenomyFile(objs[i].getAttribute("id"),
                                 objs[i].textContent);
         files.push(f);
      }
      if(handle)handle(files);
   }
   utils.urlopen(url, cb);
};

Openomy.prototype.get_all_files_from_tags = function(){
   this.filelist = [];

   for (tag in this.taglist){
      this.filelist.extend(tag.get_all_files());
   }
   return this.filelist;
};

Openomy.prototype.get_tag_id_by_name = function(tag_name){
   for (tag in this.taglist){
      if (tag.get_name() == tag_name){
         return tag.get_id();
      }
   }
};

Openomy.prototype.get_tag_by_id = function(tag_id){
   for (tag in this.taglist){
      if (tag.get_id() == tag_id){
         return tag;
      }
   }
};

Openomy.prototype.get_tag_by_name = function(tagname){
   for (tag in this.taglist){
      if (tag.get_name() == tagname){
         return tag;
      }
   }
};

Openomy.prototype.get_file_id_by_name = function(file_name){
   for (file in this.filelist){
      if (file.get_name() == file_name){
         return file.get_id();
      }
   }
};

Openomy.prototype.get_file_by_name = function(file_name){
   for (file in this.filelist){
      if (file.get_name() == file_name){
         return file;
      }
   }
};

//tag_id = "0"
Openomy.prototype.add_file = function(local_filename, tag_id){
   paramlist = {};
   paramlist['method'] = "Files.AddFile";
   if(tag_id) paramlist['tagID'] = tag_id;
   else  paramlist['tagID'] = '0';
   cksum = utils.get_md5_sig(paramlist);

   paramlist['applicationKey'] = app_key;
   paramlist['confirmedToken'] = utils.conf_token;
   paramlist['signature'] = cksum;

   upload_file = new Array();
   upload_file.push({key:'fileField', filename:'test.gif',value:gIMG});


   req = utils.build_request(utils.base_api_url, paramlist, (upload_file));

   //f = urllib2.urlopen(req);

		
};			
Openomy.prototype.modify_file = function(local_filename, file_id){
   paramlist = {};
   paramlist['method'] = "Files.ModifyFile";
   paramlist['fileID'] = file_id;
   cksum = utils.get_md5_sig(paramlist);

   paramlist['applicationKey'] = app_key;
   paramlist['confirmedToken'] = utils.conf_token;
   paramlist['signature'] = cksum;

   upload_file = ('fileField', local_filename, open(local_filename, 'rb').read());

   req = utils.build_request(utils.base_api_url, paramlist, (upload_file));

   f = urllib2.urlopen(req);
   resp_data = f.read();
		
		if (utils.is_success(resp_data)){
			//print "File", local_filename, " uploaded(modified) successfully";

			// Refresh the file list
			this.get_all_files();
		} else{
                   //print "Error in uploading file", local_filename;
                   //print resp_data; 
                }
};
			
Openomy.prototype.delete_file = function(file_id){
   paramlist = {};
   paramlist['method'] = "Files.DeleteFile";
   paramlist['fileID'] = file_id;

   //cksum = utils.get_md5_sig(paramlist);
   url = utils.base_api_url + "?" + utils.encode_params(paramlist, cksum);

   utils.urlopen(url, this.proc_.delete_file );
};
Openomy.prototype.proc_delete_file = function (resp_data) {
   //print "File", file_id, "deleted successfully";

   // Ask all tags to refresh their file list
   this.get_all_files_from_tags();
   this.get_all_files();
};

function toDOM(s) {
  var parser = new DOMParser();
  return parser.parseFromString(s, "text/xml");
}

//-----------------------------------------------------------------

/* 
 * Thanks to Erik Arvidsson for this code, found at:
 * http://erik.eae.net/archives/2005/07/03/20.19.18/
 */
if (typeof DOMParser == "undefined") {
   DOMParser = function () {}

   DOMParser.prototype.parseFromString = function (str, contentType) {
      if (typeof ActiveXObject != "undefined") {
         var d = new ActiveXObject("MSXML.DomDocument");
         d.loadXML(str);
         return d;
      } else if (typeof XMLHttpRequest != "undefined") {
         var req = new XMLHttpRequest;
         req.open("GET", "data:" + (contentType || "application/xml") +
                         ";charset=utf-8," + encodeURIComponent(str), false);
         if (req.overrideMimeType) {
            req.overrideMimeType(contentType);
         }
         req.send(null);
         return req.responseXML;
      }
   }
}

/******************************************
 * The following comes from Paul Johnston.*
 * It is copyright Paul Johnston and is   *
 * distributed under a BSD license.       *
 *****************************************/
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}
/*
 0.1 proof of concept, http get works
*/
