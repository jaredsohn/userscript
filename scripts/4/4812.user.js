/*

	Pennypacker v1.1, July 22 2006
	http://phasetwo.org/pennypacker
	Developed by Anson Parker [ansonparker@gmail.com]

*/
// ==UserScript==
// @name          Pennypacker
// @namespace     http://phasetwo.org/pennypacker
// @description	  Rate & tag Penny Arcade comics
// @include       http://*penny-arcade.com/comic*
// @include       http://localhost/phasetwo/pennypacker*
// ==/UserScript==

var PENNYPACKER = {

		_pp: this,
		_url_base: 'http://phasetwo.org/pennypacker/',
		_api_path:  'api/',
		_strip: null,
		_meta: null,
		_version: '1.1',
		_location: window.location.href,
		
		getStripInfo: function(strip_uid,strip_title,pp)
		{
				var url = this._url_base+this._api_path+'getstripinfo?imagepath='+strip_uid+'&title='+escape(strip_title)
				GM_xmlhttpRequest({
					method:"GET",
					url: url,
					headers:{
						"User-agent":"Pennypacker Client v"+this._version,
						"Accept":"text/javascript",
						"PP-Referer": this._location
					},
					onload: function(details) {
						try { pp.parseResponse(details); } catch (err) { alert(err.message); pp.renderError(err); return; }
						pp.renderStripDetails();
					},
					onerror: function(err) {
						pp.renderError(new Error("Unable to load strip information. Transport error."));
					}
				});	
		},

		addToFaves: function(pp)
		{
				var url = this._url_base+this._api_path+'addstripasfavourite?strip_id='+this._strip.id;
				GM_xmlhttpRequest({
				  method:"GET",
				  url:url,
				  headers:{
					"User-agent":"Pennypacker Client v"+this._version,
					"Accept":"text/javascript",
					},
				  onload:function(details) {
					try { pp.parseResponse(details); } catch (err) { pp.renderError(err); return; }
					pp.renderStripDetails();
				  },
				  onerror: function(err) {
					pp.renderError(new Error("Unable to fave strip. Transport error."));
				  }
				});	
		},

		addTag: function(pp)
		{
				var tag = document.getElementById('ppnewtag').value;
				if(!tag)
				{
					alert('no tag');
					return;
				}
				
				// remove outer white space and convert to lowercase
				tag = tag.replace(/^\s*(.*?)\s*$/g,"$1");
				tag = tag.toLowerCase();
				
				if(tag.length == 0)
				{
					alert('empty tag!');
					return;
				}
				
				var url = this._url_base+this._api_path+'addstriptag?strip_id='+this._strip.id+'&tag='+escape(tag);
				GM_xmlhttpRequest({
					method:"GET",
					url:url,
					headers:{
						"User-agent":"Pennypacker Client v"+this._version,
						"Accept":"text/javascript",
					},
					onload:function(details) {
						document.getElementById('ppnewtag').value = '';
						try { pp.parseResponse(details); } catch (err) { pp.renderError(err); return; }
						pp.renderStripDetails();
					},
					onerror: function(err) {
						pp.renderError(new Error("Unable to add strip tag. Transport error."));
					}
				});	
		},
		
		delTag: function(pp,id,nm)
		{
		
			if(!confirm('Are you sure you want to delete this tag? ('+nm+')'))
				return
								
				var url = this._url_base+this._api_path+'delstriptag?tagid='+id;
				GM_xmlhttpRequest({
					method:"GET",
					url:url,
					headers:{
						"User-agent":"Pennypacker Client v"+this._version,
						"Accept":"text/javascript",
					},
					onload:function(details) {
						document.getElementById('ppnewtag').value = '';
						try { pp.parseResponse(details); } catch (err) { pp.renderError(err); return; }
						pp.renderStripDetails();
					},
					onerror: function(err) {
						pp.renderError(new Error("Unable to delete that tag. Transport error."));
					}
				});	
		},
		
		parseResponse: function(resp)
		{
				
				var resptext = resp.responseText;
				
				if(!resptext)
					throw new Error('No response returned from Pennypacker server');
				
				var strip = null;
				try { strip = eval('(' + resptext + ')'); } catch (e) {
					throw new Error('Could not understand response from Pennypacker server: ' + resptext);
				}
				
				if(strip.error)
					throw new Error('Code ' + strip.error.code + ': ' + strip.error.message);
				
				if(!strip.strip)
					throw new Error('No comic strip returned from Pennypacker server');
				
				this._strip = strip.strip;
				this._meta  = strip.meta;
				
		},
		
		renderStripDetails: function()
		{
				document.getElementById('favebox').innerHTML = this._strip.favourites;
				
				var tags = this._strip.tags;
				if(tags && tags.length > 0)
				{
					var tagdisp = new Array(this._strip.tags.length);
					for(var i=0;i<tags.length;i++)
					{
						tagdisp[i] = '<a href="' + this._url_base + 'tag/'+tags[i].name+'">'+tags[i].name+'</a>';
						if(tags[i].deletable)
							tagdisp[i]+='<a class="deltag" href="#" onclick="PENNYPACKER.delTag(PENNYPACKER,'+tags[i].id+',\''+tags[i].name+'\'); return false;"><img src="'+this._url_base+'img/trash.gif" alt="Delete tag" title="Delete tag" width="9" height="10" /></a>'
					}
					tagdisp = tagdisp.join(', ');
					document.getElementById('pptags').innerHTML = tagdisp;
				} else {
					document.getElementById('pptags').innerHTML = '<em>No tags</em>';
				}
				
				// discoverer?
				if(this._strip.isNew)
				{
					var upgrade = document.createElement('div')
					upgrade.className = 'messagebox'
					upgrade.innerHTML = '<strong>*Congratulations:</strong> You are the first Pennypacker user to discover this strip. Keep it up and you\'ll become one of our <a href="http://phasetwo.org/pennypacker/giants/">Giants of Arcade</a>'
					var comicdiv = document.getElementById('comic');
					comicdiv.appendChild(upgrade)
				}				
				
				// check version
				if(this._meta && parseFloat(this._version) < parseFloat(this._meta.version))
				{
					var upgrade = document.createElement('div')
					upgrade.className = 'messagebox'
					upgrade.innerHTML = 'There is a new version (v' + this._meta.version + ') of Pennypacker available. <a href="http://phasetwo.org/pennypacker/pennypacker.user.js">Download here</a>'
					var comicdiv = document.getElementById('comic');
					comicdiv.appendChild(upgrade)
				}
				
				// check for messages
				if(this._meta && this._meta.message && this._meta.message.length > 0)
				{
					var upgrade = document.createElement('div')
					upgrade.className = 'messagebox'
					upgrade.innerHTML = this._meta.message
					var comicdiv = document.getElementById('comic');
					comicdiv.appendChild(upgrade)
				}
				
		},
		
		renderError: function(err)
		{
				alert('Error: ' + err.message);		
		}
};
unsafeWindow.PENNYPACKER = PENNYPACKER;

var buttondiv  = document.getElementById('buttons');
var comicdiv = document.getElementById('comic');
var comicstrip = document.getElementById('comicstrip');

/* is this a comic page? */
if (buttondiv && comicdiv && comicstrip)
{
		/* render content */
		GM_addStyle(".faveholder { font-size: 11px; width: 200px;}");
		GM_addStyle(".faveholder a { color: #fab60c; }");
		GM_addStyle(".faveholder table  { display: inline; border-collapse: collapse; padding: 0; margin: 0; }");
		GM_addStyle(".faveholder table td { padding: 0; padding-left: 3px; padding-right: 2px; }");
		GM_addStyle(".favebox { width:37px; height: 21px; overflow:hidden; font-family: arial; font-weight: bold; text-align: center; color: #fab60c; font-size: 11px; background-image: url('"+PENNYPACKER._url_base+"img/faves.gif'); }");
		
		GM_addStyle(".taghldr { font-family: arial; color: #fff; text-transform: uppercase; font-size: 10px;");
		GM_addStyle(".taghldr a { color: #fab60c; }");
		GM_addStyle(".taghldr table { width: 500px; margin: 16px auto; }");
		GM_addStyle(".taglabel { width: 60px; text-align: right; padding-right: 8px; font-family: arial; color: #fff; text-transform: uppercase; font-size: 10px;");
		GM_addStyle("#pptags { }");
		
		GM_addStyle(".messagebox { width: 500px; margin: 8px 0 8px 213px; font-size: 11px; font-family: arial; }");
		GM_addStyle(".messagebox a { color: #fab60c; }");
		GM_addStyle(".deltag img { vertical-align: bottom; padding-bottom: 1px; margin-left: 2px; margin-right: 1px; }");
		GM_addStyle(".tagbody img { vertical-align: middle; margin-left: 22px; }");
		
		/* faves function */
		var favhldr = document.createElement('span');
		favhldr.className='faveholder';
		favhldr.innerHTML = '<table><tr><td class="button"><div class="favebox" id="favebox"></div></td><td><a href="#" onclick="PENNYPACKER.addToFaves(PENNYPACKER);return false">Add to faves!</a></td></tr></table>';
		buttondiv.appendChild(favhldr);
		
		/* tags */
		var taghldr = document.createElement('div');
		taghldr.className = 'taghldr';
		taghldr.innerHTML = '<table><tr><td class="taglabel">Tags:</td><td id="pptags"></td></tr><tr><td class="taglabel">Add Tag:</td><td class="tagbody"><a href="'+PENNYPACKER._url_base+'" style="float:right"><img src="'+PENNYPACKER._url_base+'img/thep.gif" width="23" height="22" alt="Pennypacker" /></a><a href="'+PENNYPACKER._url_base+'you/" style="float:right"><img src="'+PENNYPACKER._url_base+'img/icon_yourpage.gif" width="69" height="19" alt="Pennypacker" class="yourpage" /></a><form action="" onsubmit=" try { PENNYPACKER.addTag(PENNYPACKER) } catch (err) { alert(err.message) }; return false;"><input type="text" id="ppnewtag" /> <input type="submit" value="Add"/></form></td></tr></table>';
		comicdiv.appendChild(taghldr);

		/* get strip info */		
		var actualstrip = comicstrip.firstChild;
		if(!actualstrip)
		{
			PENNYPACKER.renderError(new Error('Unable to find comic strip image'));
		} else {
			PENNYPACKER.getStripInfo(actualstrip.src,actualstrip.alt,PENNYPACKER);
		}
}
