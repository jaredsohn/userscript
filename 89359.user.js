// ==UserScript==
// @name           Super Imgur Script
// @namespace      leroy_twiggles
// @description    Better reddit + imgur integration
// @include        http://www.reddit.com/*
// @include        about:blank?imgur&*
// ==/UserScript==


//Functions
function writeerr(arg_message)
{
  document.body.appendChild(document.createTextNode('ERROR: ' + arg_message));
}

//Options settings
var options_showing = false;
var options_box = null;

//Current options
var opt_size = GM_getValue('super_imgur_script__image_size_limit', 20000);
var opt_hide_animated = GM_getValue('super_imgur_script__hide_animated', true);

//Show the options box
function showoptions()
{
  //Close if option
  if (options_showing) closeoptions();
  
  //Options box html
  options_box = document.createElement('div');
  var options_html = 
    '<div>'
    +'<strong>Max size for original images:</strong> <input id="opt_size" type="test"/><br/>'
    +'<strong>Hide animated gifs until loaded:</strong> <input id="opt_hide_gifs" type="checkbox"/><br/>'
    +'<input type="button" id="opt_save" value="Save"/> <input type="button" id="opt_cancel" value="Cancel"/> '
    +'</div>';
  options_box.innerHTML = options_html;
  options_box.className = 'optionsbox';
  document.body.appendChild(options_box);  
  
  //Event hookup
  document.getElementById('opt_save').addEventListener('click',saveoptions,false);
  document.getElementById('opt_cancel').addEventListener('click',closeoptions,false);
  document.getElementById('opt_size').value = opt_size;
  document.getElementById('opt_hide_gifs').checked = opt_hide_animated;
  
  //Showing
  options_showing = true;
}

//Close the options box
function closeoptions()
{
  options_box.parentNode.removeChild(options_box);
  options_showing = false;  
  options_box = null;
}

function saveoptions()
{
  //Get the values
  var val = document.getElementById('opt_size').value;
  if (!val.match(/^[0-9]+$/))
  {
    alert('Error:  Size must be an integer.');
    return;
  }
  opt_size = parseFloat(val);
  
  opt_hide_animated = document.getElementById('opt_hide_gifs').checked;
  
  //Save the value
  GM_setValue('super_imgur_script__image_size_limit', parseFloat(opt_size));
  GM_setValue('super_imgur_script__hide_animated', opt_hide_animated);
  
  //Close
  closeoptions();
}

// Process all links first
window.addEventListener('load',function()
{
  //Safely
  try
  {
    //If I'm at about-blank?imgur
    if (document.location.href.match(/^about:blank\?imgur&/i))
    {      
      //Add style
      GM_addStyle('body { background: black; font-family: sans-serif; overflow-y: scroll; margin: 0px; padding: 8px; color: white; }');
      GM_addStyle('div.controlbox { width: 100px; position: fixed; top: 0px; right: 0px; }');
      GM_addStyle('a { display: block; padding: 3px; margin: 2px; background: #D5E1DD; border: 1px solid #747E80; text-decoration: none; color: black; font-size: 8pt; opacity: 0.5; min-width: 80px; text-align: right; }');
      GM_addStyle('a:hover { background: #F7F3E8; opacity: 1.0; }');
      GM_addStyle('a.spacebottom { margin-bottom: 16px; }');
      GM_addStyle('a.spacetop { margin-bottom: 16px; }');
      GM_addStyle('a.selected { background-image: url("data:image/gif;base64,R0lGODlhCgAKAIABADMzMwAAACH5BAEAAAEALAAAAAAKAAoAQAIRjI8AmLqs2HEvyRklrcZdzhQAOw=="); background-repeat: no-repeat; background-position: 4px 6px;  }');      
      GM_addStyle('.img_fit { width: 100%; height: 100%; background-repeat: no-repeat; background-size: contain; -moz-background-size: contain; }');
      
      GM_addStyle('div.optionsbox { background: rgba(0,0,0,0.9); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%;');
      GM_addStyle('div.optionsbox div { margin: 20px; width: 500px; margin-left: auto; margin-right: auto; background: black; padding: 20px; border: 2px solid white; }');
      GM_addStyle('.loadbutton { margin: 40px; width: 100px; }');

      //Versions      
      var versions = [
        { name: 'Original Image', suffix: '' },
        { name: 'Huge', suffix: 'h' },
        { name: 'Large', suffix: 'l' },
        { name: 'Medium', suffix: 'm' },
        { name: 'Small', suffix: 't' },
        { name: 'Big Square', suffix: 'b' },
        { name: 'Small Square', suffix: 's' }
        ];
      
      //Find the hash
      var hashmatch = document.location.href.match(/&hash=([^&]+)/i);
      if (!hashmatch) throw(new Error('No hash argument... something must be broken.'));
      var hash = decodeURIComponent(hashmatch[1]);
      var jsonurl = 'http://imgur.com/api/stats/'+hash+'.json';
      
      //Find the original URL
      var urlmatch = document.location.href.match(/&url=([^&]+)/i);
      if (!urlmatch) throw(new Error('No url argument... something must be broken.'));
      var url = decodeURIComponent(urlmatch[1]);
      
      //Link refs
      var linkrefs = {};
      var moderefs = {};
      var loadref = null;
      var force_hidden = false;
      var state_loading = true;
      
      //Set the title
      function settitle()
      {
        document.title = (state_loading ? '(load) ' : '') + 'imgur:' + hash;
      }
      settitle();
      
      //Set the favicon
      var doc_head = document.getElementsByTagName('head')[0];      
      function setfavicon(arg_src)
      {
        var favicon_tag = document.createElement('link');
        favicon_tag.setAttribute('rel','icon');
        favicon_tag.setAttribute('href',arg_src);
        doc_head.appendChild(favicon_tag);        
      }
            
      //Get the API
      GM_xmlhttpRequest({
        method: "GET",
        url: jsonurl,
        onerror: function()
        {
          //Just go to the original
          document.location.replace(url);
        },
        onload: function(response)
        {
          //Parse the JSON
          try
          {
            var obj = JSON.parse(response.responseText);
          }
          catch(e)
          {
            //Failed, bad JSON, just go to the original link
            document.location.replace(url);
          }
          
          //If an error, just go to the original link
          if (obj.error)
          {
            //Error, too bad
            document.location.replace(url);
            return;
          } 
          
          //Get properties
          var size = obj.stats.size;
          var extension;
          if (obj.stats.type.indexOf('jpeg') != -1) extension = 'jpg';
          else if (obj.stats.type.indexOf('png') != -1) extension = 'png';
          else if (obj.stats.type.indexOf('gif') != -1) extension = 'gif';
          else
          {
            //Unrecognized...  go to the real link
            document.location.replace(url);
            return;
          }
          var animated = !(obj.stats.animated == false || obj.stats.animated == 'false');          
          
          //Make the image
          var img_normal = document.createElement('img'); img_normal.className = 'img_normal';
          var img_shrink = document.createElement('img'); img_shrink.className = 'img_shrink';
          var img_fit = document.createElement('div'); img_fit.className = 'img_fit';
                    
          //Make a control box
          var controlbox = document.createElement('div');
          controlbox.className = 'controlbox';
          document.body.appendChild(controlbox);
          
          //Set the image src to a suffix
          var lastsuffix = null;
          function setimagesuffix(arg_suffix)
          {
            //Save the last
            lastsuffix = arg_suffix;
            
            //Set the image
            var src = 'http://i.imgur.com/'+hash+arg_suffix+'.'+extension+'#'+(new Date()).getTime();
            img_normal.setAttribute('src',src);
            img_shrink.setAttribute('src',src);
            img_fit.style.backgroundImage = 'url("'+src+'")';            
            
            //Walk all links
            for (var k in linkrefs) linkrefs[k].className = (arg_suffix == k ? 'selected' : '');
          }
          function recyclesuffix()
          {
            setimagesuffix(lastsuffix);
          }
          
          //Local make link function
          function makelink(arg_href, arg_text, arg_function, arg_data)
          {
            //Make the basic link
            var a = document.createElement('a');
            a.setAttribute('href', arg_href);
            a.appendChild(document.createTextNode(arg_text));
            controlbox.appendChild(a);
            
            //Add event listener
            a.addEventListener('click',
              function(e)
              {
                if (arg_function && !options_showing) { arg_function(arg_data); e.preventDefault(); }
                e.stopPropagation();
              }, false);
            
            //Return the link
            return a;
          }
          
          //Modes array
          var modes = [
              { name: 'Natural Size' },
              { name: 'Shrink' },
              { name: 'Fit' }
            ];        
          var MODE_NORMAL = 0;
          var MODE_SHRINK = 1;
          var MODE_FIT = 2;
          var MODE_WRAP = 2;
          var mode_current = MODE_NORMAL;
          function incmode(e)
          {
            setmode(mode_current+1 >= MODE_WRAP ? 0 : mode_current+1);
            e.preventDefault();
            e.stopPropagation();
          }
          function setmode(arg_mode)
          {
            mode_current = arg_mode;
            img_normal.style.display = (arg_mode == MODE_NORMAL && !force_hidden ? 'block' : 'none');
            img_shrink.style.display = (arg_mode == MODE_SHRINK && !force_hidden ? 'block' : 'none');
            img_fit.style.display = (arg_mode == MODE_FIT && !force_hidden ? 'block' : 'none');
            
            //Walk all links
            for (var k in moderefs) moderefs[k].className = (arg_mode == k ? 'selected' : '');
          }
          function remode()
          {
            setmode(mode_current);
          }   
                        
          //Pick which suffix to use
          var usesuffix = '';
          if (size > opt_size && !animated) usesuffix = 'h';
          
          //Add an original link
          var origlink = makelink(url, 'Original Link', null, null);

          //If not animated...
          if (!animated)
          {
            //Make all the links
            for (var i = 0; i < versions.length; i++)
            {
              var a = makelink('http://i.imgur.com/'+hash+versions[i].suffix+'.'+extension, versions[i].name, setimagesuffix, versions[i].suffix);
              if (i == 0) a.style.marginTop = '16px';
              linkrefs[versions[i].suffix] = a;
            }
          }
          
          //Make all the mode buttons
          for (var i = 0; i < modes.length; i++)
          {
            var a = makelink(document.location.href, modes[i].name, setmode, i);
            if (i == 0) a.style.marginTop = '16px';
            moderefs[i] = a;
          }
          
          //On image load
          function imgload()
          {
            //Loading state
            state_loading = false;
            settitle();
            setfavicon(img_normal.getAttribute('src'));
            
            //If loading button for animated gifs
            if (loadref)
            {
              loadref.setAttribute('value','Play');
              loadref.disabled = false;
              loadref.addEventListener('click',function()
              { 
                loadref.parentNode.removeChild(loadref);
                loadref = null;
                force_hidden = false;                
                recyclesuffix();
                remode();                
              },false);
            }
          }
          
          //Options button
          var optbutton = makelink(document.location.href, 'Options', showoptions, null);
          optbutton.style.marginTop = '16px';
          
          //Add image events
          img_normal.addEventListener('click', incmode, false);
          img_shrink.addEventListener('click', incmode, false);
          img_fit.addEventListener('click', incmode, false);          
          img_normal.addEventListener('load', imgload, false);
          
          //Set the mode
          var defmode = MODE_NORMAL;
          if (animated && opt_hide_animated)
          {
            //Note hidden
            force_hidden = true;
            
            //Add some UI
            loadref = document.createElement('input');
            loadref.className = 'loadbutton';
            loadref.setAttribute('type','button');
            loadref.setAttribute('value','Loading...');
            loadref.disabled = true;
            document.body.appendChild(loadref);
          }
          setmode(defmode);
          
          //Set the image
          setimagesuffix(usesuffix);
          document.body.appendChild(img_normal);
          document.body.appendChild(img_shrink);
          document.body.appendChild(img_fit);
          
          //Deal with "fit"...
          function fix_fit()
          {
            img_shrink.style.maxHeight = (window.innerHeight-16)+'px';
            img_shrink.style.maxWidth = (window.innerWidth-16)+'px';            
          }
          window.addEventListener('resize', fix_fit, false);
          fix_fit();
        }
          
        
      });      
    }
    //Otherwise
    else
    {
      //Loop over all links
      var ll = document.links;
      for (var i = 0; i < ll.length; i++)
      {
        //Get the link
        var l = ll[i];
        
        //If it links to imgur
        if (l.host.match(/imgur\.com$/))
        {
          //Ignore galleries
          if (l.pathname.indexOf('/a/') == 0 || l.pathname.indexOf('/gallery') != -1) continue;

          //Grab the hash code          
          var hashmatch = l.pathname.match(/\/([A-Za-z0-9]{5})([hlmtbs]?[\.](jpg|gif|png))?$/);
          if (hashmatch)
          {
            l.href = 'about:blank?imgur&hash='+encodeURIComponent(hashmatch[1])+'&url='+encodeURIComponent(l.href);
          }
        }    
      }
    }
  }
  catch(e)
  {
    writeerr(e.message);
  }
     
},false);