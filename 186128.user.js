// ==UserScript==
// @name          Torrentz.eu: magnet and direct link +Direct Download Link by Mandy
// @description	  Automatically adds direct .torrent and magnet links on Torrentz.eu — So easy your mom could use it. Tested in Firefox and Chrome.
// @author       Mandy Magic
// @homepage      http://bfred.it/public/11/old-facebook-chat
// @include       *://torrentz.*
// @match         *://torrentz.com/*
// @match         *://torrentz.eu/*
// @icon          http://i.imgur.com/XN2jS.png
// @screenshot    http://i.imgur.com/gYIlR.png
// @screenshot    http://cl.ly/6kwz/b.png
// @version       2.32
//
// @date	2012-06-07
// @copyright	2012+, http://bfred.it
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
//
// internal name: Quick Torrentz
// formerly: Torrentz.eu for Your Mom


var hexlower;     //for converting uppercase HEX code to lower case
var foldername;   //getting folder name of the torrent
var folname;      //temporary variable for storing foldername
var tlinks=document.getElementsByTagName("dl");     //array that stores all the resultring torrents when we search
//console.log(tlinks);



(function () {
	var $ = unsafeWindow.jQuery || (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}()).jQuery,
	css = [
	".qt_links a{display: inline-block; width:10px ; height: 18px; margin-right: 4px; text-align: center; -webkit-border-radius: .3em; -moz-border-radius: 3px; line-height:1em; text-decoration:none !important; vertical-align:top; }",
	".qt_magnet,.qt_cache.Zoink,.qt_cache.Boxopus-23,.qt_cache.Boxopus-24{width:18px !important; background-image: url(http://i.imgur.com/1yfjx.png); background-repeat: no-repeat; background-position: 2px top}",
	".qt_cache:nth-child(n+3){position: absolute; display: none; }",
	"dl:hover .qt_cache{display: inline-block}",
	".qt_cache.Torcache{right: -12px;}",
	".qt_cache.Torrage{right: -24px;}",
	".qt_cache.Boxopus-23{right: -56px;}",
	".qt_cache.Boxopus-24{right: -76px;}",
	".qt_cache.Boxopus{right: -88px;}",
	".qt_cache.Put-IO{right: -36px;}",


	
	".qt_magnet{background-color: #FFB090; }",
	".qt_cache{background-color: #336699; } ",
	".qt_links a:hover{background-color: #FF5511;}",
	
	".qt_cache.Boxopus-23{background-color: #00CCFF; } ",
	".qt_cache.Boxopus-24{background-color: #00CCFF; } ",
	".qt_cache.Boxopus{background-color: #00CCFF; } ",
	".qt_cache.Put-IO{background-color: #00CCFF; } ",
	
	".qt_separator{color:transparent !important; cursor:default !important;}",
	"div.results > dl > dt {width: 648px !important; } ",
	"div.results > dl > dd{width: 350px !important;} ",
	"div.results > dl:hover > dd > span.v {position:relative;left: -66px; background: white;}",
	//"div.results > dl:hover > dd > span.v:before {content: attr(title); }",
	
	".qt_links{float: left; width: 70px; position:relative; top: -3px; opacity: .7; }",
	"dl:hover .qt_links{opacity:1}",
	".u {background-repeat: no-repeat; background-position: 5px center}",
	"span.Magnet   {background-image: url('http://upload.wikimedia.org/wikipedia/commons/c/c2/Magnet-icon.gif')}",
	"span.Torrage {background-image: url('http://torrage.com/favicon.png')}",
	"span.Torcache {background-image: url('http://torcache.net/favicon.ico')}",
	"span.Zoink   {background-image: url('http://zoink.it/favicon.ico')}",
	"span.Zbigz {background-image: url('http://zbigz.com/favicon.ico')}",
	"span.Furk {background-image: url('http://www.ebestbuyvn.com/membership/furk.net.png')}",
	"span.Boxopus {background-image: url('http://www.boxopus.com/favicon.png')}",
	"span.Boxopus-23 {background-image: url('http://www.boxopus.com/favicon.png')}",
  "span.Boxopus-24 {background-image: url('http://www.boxopus.com/favicon.png')}",
	"span.Put-IO {background-image: url('http://www.put.io/favicon.ico')}",

	];
	css = css.join("\n");
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	$(function (){
		function getHosts(hex) {
		hexlower=hex.toLowerCase();
		if(folname==null)
        {
          for(var i=0;i<tlinks.length-1;i++)
              {
                var tempstr,temphex;
                temphex=tlinks[i].childNodes[0].innerHTML.substr(10,40);
                tempstr=tlinks[i].childNodes[0].firstElementChild.innerHTML;
                tempstr=tempstr.replace('<b>','');
                tempstr=tempstr.replace('</b>','');
                //alert(temphex);
                 if(hexlower==temphex)
                    {
                      foldername=tempstr;
                      folname=null;
                      break;
                    } //end of if cond 
              }//endof for loop
        } //endof if cond
		
		
			return {
				'Zoink':'http://zoink.it/torrent/'+hex+'.torrent',
				'Torcache':'http://torcache.net/torrent/'+hex+'.torrent',
				'Torrage':'http://torrage.com/torrent/'+hex+'.torrent',
				'Zbigz':'http://zbigz.com/myfiles?url='+hex,
				'Furk':'https://www.furk.net/users/files/add?info_hash='+hex,
				'Boxopus':'http://dl21.boxopus.com/'+hexlower+'.zip?filename='+foldername,
				'Boxopus-23':'http://dl23.boxopus.com/'+hexlower+'.zip?filename='+foldername,
				'Boxopus-24':'http://dl24.boxopus.com/'+hexlower+'.zip?filename='+foldername,
				'Put-IO':'http://put.io/default/magnet?url=http://torcache.net/torrent/'+hex+'.torrent'

			}
			
			
		}
		$('.results h2, .download dd').filter(':contains(S'+'p'+'on'+'so'+'red)').parents('dl,.results').remove();
		
		$('.download h2').each(function(){//needed to avoid html-to-dom on unnecessary pages
			var
				$this = $(this),
				name = $this.children('span').text(),
				hex = document.location.pathname.substring(1).toUpperCase(),
				//hexlower = document.location.pathname.substring(1).toLowerCase();
				linksString = ['<dl><dt><a href="magnet:?xt=urn:btih:'+hex+'&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%2Fannounce"><span class="u Magnet">Magnet Link</span> <span class="n">'+name+'</span></a></dt><dd>Magnet link</dd></dl>'],
				hosts = getHosts(hex);
				
			for(host in hosts)
				linksString.push('<dl><dt><a href="'+hosts[host]+'"><span class="u '+host+'">'+host+'</span> <span class="n">'+name+'</span></a></dt><dd>.torrent Cache</dd></dl>');
				
			//add space
			linksString.push('<dl><dt><a><span class="n qt_separator">Hey there! I didn\'t expect you here!</span></a></dt></dl>');
			$(linksString.join('')).insertAfter(this);
		})
		document.onclick = function () {}; 
		function addLinksToSearchResult() {
			var
				$link = $(this),
				hex = $link.attr('href').substring(1).toUpperCase(),
				linksString = ['<span class="qt_links">'],
				hosts = getHosts(hex);
			if($link.parents('dl').find('.qt_links').length) {
				return;
			}
			linksString.push('<a class="qt_magnet" href="magnet:?xt=urn:btih:'+hex+'&tr=http%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com" title="Magnet link">');
			for(host in hosts)
				linksString.push('<a class="qt_cache '+host+'" href="'+hosts[host]+'" title="'+host+': direct link to .torrent file">');
			
			linksString.push('</span">');
			$(linksString.join('')).prependTo($link.parents('dl').children('dd'))
		}
		$('.results dt a').each(addLinksToSearchResult);
		$('.loader').parent('div[id]').add('#popular')
		.on('DOMSubtreeModified',function () {
			var $container = $(this).off('DOMSubtreeModified'); 
			setTimeout(function () {
				$container
				.find('dt a')
				.each(addLinksToSearchResult)
			}, 1)
		});
	});//on ready
})(); 


hexlower = document.location.pathname.substring(1).toLowerCase();


if((document.getElementsByClassName("files")[0]))
 {
    if(foldername==null)
    foldername=document.getElementsByClassName("files")[0].getElementsByClassName("t")[0].innerHTML;
    
    var myDiv1 = document.createElement("div");
    myDiv1.id = 'myDiv1';
    myDiv1.className='files';
    document.body.appendChild(myDiv1);

    var downloadhead = document.createElement('h2');
    //downloadhead.style="font-size: 20px; text-decoration: none";
    downloadhead.innerHTML="Download here from BoxOpus----Links Redirection by Mandy";
    myDiv1.appendChild(downloadhead);

    var filenames=document.getElementsByClassName("files")[0].getElementsByTagName("li")[1].childNodes[0].childNodes;
    //alert(filenames.length);///returns no.of entries in li in ul;
    for(var i=0;i<filenames.length;i++)
      {
        var myDiv;
       
        ////////////////////////////////////
        if(foldername==filenames[i].firstChild.data.trim())
        {
        var abc='http://dl21.boxopus.com/'+hexlower+"/"+filenames[i].firstChild.data;//gooddd
        var abc1='http://dl23.boxopus.com/'+hexlower+"/"+filenames[i].firstChild.data;//gooddd
        var abc2='http://dl24.boxopus.com/'+hexlower+"/"+filenames[i].firstChild.data;//gooddd
        
        }
        else
        {
        var abc='http://dl21.boxopus.com/'+hexlower+"/"+foldername+"/"+filenames[i].firstChild.data;//gooddd
        var abc1='http://dl23.boxopus.com/'+hexlower+"/"+foldername+"/"+filenames[i].firstChild.data;//gooddd
        var abc2='http://dl24.boxopus.com/'+hexlower+"/"+foldername+"/"+filenames[i].firstChild.data;//gooddd
       
        
        }
        
        
        
        for (var y=0;y<3;y++)
          {
            var linkText;
            myDiv = document.createElement("div");
            myDiv.id = 'myDiv';
            myDiv.className='files';
            document.body.appendChild(myDiv);

            var a = document.createElement('a');
            a.style="font-size: 13px; text-decoration: none";
            
            if(y==0)
              {
                linkText = document.createTextNode('Server'+' '+(21)+'... '+filenames[i].firstChild.data);
                a.href = abc;
              }
            else if(y==1)
              {
                linkText = document.createTextNode('Server'+' '+(22+y)+'...'+filenames[i].firstChild.data);
                a.href = abc1;
              }
            else if(y==2)
              {
                linkText = document.createTextNode('Server'+' '+(22+y)+'... '+filenames[i].firstChild.data);
                a.href = abc2;
              }
            a.appendChild(linkText);
            a.title = filenames[i].firstChild.data;

            myDiv.appendChild(a);

         }
        var linebreak=document.createTextNode('----------------------------------------------------------------'+'------------------------------------------------------------------'+'------------------------------------------------------------------');
        document.body.appendChild(linebreak);
       
     }
 }
folname=foldername;


//alert('abc');








