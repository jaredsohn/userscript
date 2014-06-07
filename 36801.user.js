// ==UserScript==
// @name           yJV
// @namespace      yJV
// @description    Permet l'affichage de vidéos, images, musiques et BBCode sur jv.com.
// @include        http://www.jeuxvideo.com/*
// ==/UserScript==

//Script par YliNG
//Je tiens à remercier deepblue, sans qui (vu mon niveau en js ><) le script n'aurait pas pu arriver si loin (Omg le kikoo).
//Je me dois aussi de lui faire sa pub : 
//www.deblan.fr son site web
//irc.deblan.fr son IRC :)

//->
//La partie BBCode est pompée du script de Cenobyte, et la partie qui remplace Début et FIn, et celle qui ajoute la liste des forums sont de deepblue.
//->

//Remplace respectivements Début et Fin par Première page et Dernière page
function jv_com_forumLinksDebutFin() 
{
  var a = document.getElementsByTagName('a');
	var c = a.length;
	for( var u=0; u<c; u++) 
  {
		if( a[u] ) 
		{
      if( a[u].innerHTML == 'Début' ) 
      {
        a[u].innerHTML = 'Première page';
     	}
     	
      if( a[u].innerHTML == 'Fin' ) 
			{
        a[u].innerHTML = 'Dernière page';
      }
      
      if( a[u].innerHTML == 'Liste des sujets') 
			{
        a[u].innerHTML = 'Liste des sujets</a>   '+listselectforums+'<a>';
      }
    }
  }
}
jv_com_forumLinksDebutFin();

//Liste des forums préférés à coté du titre du topic/nom du forum.
var listselectforums = '';
function jv_com_forumsLinksInList(bool) 
{
	if( document.getElementById('liste_forums') ) 
	{
		var a = (document.getElementById('liste_forums')).getElementsByTagName('a');
		var c = a.length;
		listselectforums+= '<select onchange="document.location=this.value" style="height: 20px; font-size: 11px;"><option><strong>Forums préférés :</strong></option>';
		for( var u=0; u<c; u++) 
		{
			if( a[u] ) 
			{
				listselectforums+='<option value="'+a[u].href+'">'+a[u].innerHTML+'</option>';
	    }
    }
    listselectforums+='<option value="http://www.jeuxvideo.com/forums/0-103-0-1-0-1-0-0.htm"><em>Modérateurs</em></option>';
		listselectforums+='<option value="http://www.jeuxvideo.com/forums.htm"><strong>Liste</strong></option>';
		listselectforums+='</select>';
    (document.getElementsByTagName('h3')[0]).innerHTML+='   '+listselectforums;
	}
}
jv_com_forumsLinksInList();

//Balise [youtube]
function jv_com_YoutubeBBcodeVideoHtml(link) 
{
  return '<object><embed src="http://www.youtube.com/v/'+link+'&hl=fr&fs=1&rel=0&color1=0x006699&color2=0x54abd6" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';
}

//Balise [hd]
function jv_com_HDYoutubeBBcodeVideoHtml(link) 
{
  return '<object><embed src="http://www.youtube.com/v/'+link+'&ap=%2526fmt%3D18&hl=fr&fs=1&rel=0&color1=0x006699&color2=0x54abd6" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';
}

//Balise [daily]
function jv_com_DailymotionBBcodeVideoHtml(link) 
{
  return '<object><embed src="http://www.dailymotion.com/swf/'+link+'&colors=background:47C7E6;glow:8EB6ED;foreground:212121;&related=0" type="application/x-shockwave-flash" width="420" height="226" allowFullScreen="true" allowScriptAccess="always"></embed></object>';
}

//Balise [b]
function jv_com_BBcodeStrong(link) 
{
  return '<div style="font-weight: bold; display: inline;">'+link+'</div>';
}

//Balise [i]
function jv_com_BBcodeItalic(link) 
{
  return '<div style="font-style: italic; display: inline;">'+link+'</div>';
}

//Balise [u]
function jv_com_BBcodeSoulign(link) 
{
  return '<div style="text-decoration: underline; display: inline;">'+link+'</div>';
}

//Balise [blue]
function jv_com_BBcodeBlue(link) 
{
  return '<div style="color: blue; display: inline;">'+link+'</div>';
}

//Balise [red]
function jv_com_BBcodeRed(link) 
{
  return '<div style="color: red; display: inline;">'+link+'</div>';
}

//Balise [green]
function jv_com_BBcodeGreen(link) 
{
  return '<div style="color: green; display: inline;">'+link+'</div>';
}

//Balise [quote]
function jv_com_BBcodeQuote(link) 
{
  return '<p style="background-color: #80B2F7; color: #0A77B8; font-weight: bold;"> Citation: <br /></p><div style="background-color: #80B2F7; color: #141414;">     '+link+'</div>';
}

//Balise [spoiler]
function spoil(cont, num) 
{
  return '<a style="cursor: pointer;" onclick="document.getElementById(\'hello'+num+'\').style.display=(document.getElementById(\'hello'+num+'\').style.display==\'none\')? \'block\' : \'none\';" >Afficher/Cacher le Spoiler</a><div style="display:none;border-style: solid; border-width: thin; background-color: white" id="hello'+num+'">'+cont+'</div>';
}

//Balise [font color]
function jvc_fontColor(color, link) 
{
  return '<div style="color: '+color+'; display: inline;">'+link+'</div>';
}

//Remplacement des balises
function jv_com_replaceBBcode() 
{
  if( document.getElementById('col1') ) 
  {
    var lis = document.getElementById('col1').getElementsByTagName("li");
    var c   = lis.length;
    for(var u=0; u<c; u++) 
    {
      if(lis[u]) 
      {
        if( lis[u].className == 'post') 
        {
          //[video]
          lis[u].innerHTML = (lis[u].innerHTML).replace(/\[video\](.+)\[\/video\]/g, jv_com_YoutubeBBcodeVideoHtml('$1'));
          //[youtube]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[youtube\](.+)\[\/youtube\]/g, jv_com_YoutubeBBcodeVideoHtml('$1'));
          //[hd]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[hd\](.+)\[\/hd\]/g, jv_com_HDYoutubeBBcodeVideoHtml('$1'));
		      //[daily]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[daily\](.+)\[\/daily\]/g, jv_com_DailymotionBBcodeVideoHtml('$1'));
		      //[b]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[b\](.+)\[\/b\]/g, jv_com_BBcodeStrong('$1'));
          //[i]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[i\](.+)\[\/i\]/g, jv_com_BBcodeItalic('$1'));
          //[u]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[u\](.+)\[\/u\]/g, jv_com_BBcodeSoulign('$1'));
		      //[blue]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[blue\](.+)\[\/blue\]/g, jv_com_BBcodeBlue('$1'));
          //[red]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[red\](.+)\[\/red\]/g, jv_com_BBcodeRed('$1'));
          //[green]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[green\](.+)\[\/green\]/g, jv_com_BBcodeGreen('$1'));
		      //[quote]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[quote\](.+)\[\/quote\]/g, jv_com_BBcodeQuote('$1'));
		      //[spoiler]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[spoiler\](.+)\[\/spoiler\]/g, spoil('$1'.toString(), u));
           //[font color=]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[font color="?(.+)"?\](.+)\[\/font\]/g, jvc_fontColor('$1'.toString(), '$2'.toString()));
        }
      }
    }

    var lis = document.getElementById('col1').getElementsByTagName("a");
    var c   = lis.length;
    for(var u=0; u<c; u++) 
    {
      if(lis[u]) 
      {
        if( lis[u].className == 'ltopic') 
        {
		      //[b]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[b\](.+)\[\/b\]/g, jv_com_BBcodeStrong('$1'));
          //[i]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[i\](.+)\[\/i\]/g, jv_com_BBcodeItalic('$1'));
          //[u]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[u\](.+)\[\/u\]/g, jv_com_BBcodeSoulign('$1'));
		      //[blue]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[blue\](.+)\[\/blue\]/g, jv_com_BBcodeBlue('$1'));
          //[red]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[red\](.+)\[\/red\]/g, jv_com_BBcodeRed('$1'));
          //[green]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[green\](.+)\[\/green\]/g, jv_com_BBcodeGreen('$1'));
          //[font color=]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[font color="?(.+)"?\](.+)\[\/font\]/g, jvc_fontColor('$1'.toString(), '$2'.toString()));
        }
      }
    }
    var lis = document.getElementById('col1').getElementsByTagName("h4");
    var c   = lis.length;
    for(var u=0; u<c; u++) 
    {
      if(lis[u]) 
      {
        if( lis[u].className == 'sujet') 
        {
		      //[b]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[b\](.+)\[\/b\]/g, jv_com_BBcodeStrong('$1'));
          //[i]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[i\](.+)\[\/i\]/g, jv_com_BBcodeItalic('$1'));
          //[u]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[u\](.+)\[\/u\]/g, jv_com_BBcodeSoulign('$1'));
		      //[blue]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[blue\](.+)\[\/blue\]/g, jv_com_BBcodeBlue('$1'));
          //[red]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[red\](.+)\[\/red\]/g, jv_com_BBcodeRed('$1'));
          //[green]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[green\](.+)\[\/green\]/g, jv_com_BBcodeGreen('$1'));
          //[font color=]
		      lis[u].innerHTML = (lis[u].innerHTML).replace(/\[font color="?(.+)"?\](.+)\[\/font\]/g, jvc_fontColor('$1'.toString(), '$2'.toString()));
        }
      }
    }
  }
}
jv_com_replaceBBcode();

//Affichage direct des vidéos youtube
function yYoutube(link,vid) 
{
  return '<div style="text-align: center;"><object><embed src="http://www.youtube.com/v/'+vid+'&hl=fr&fs=1&rel=0&color1=0x006699&color2=0x54abd6" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="99%" height="500"></embed></object></div><br />';
}

//Affichage direct des vidéos dailymotion
function yDailymotion(link,vid) 
{
  return '<div style="text-align: center;"><object><embed src="http://www.dailymotion.com/swf/'+vid+'&colors=background:47C7E6;glow:8EB6ED;foreground:212121;&related=0" type="application/x-shockwave-flash" width="99%" height="500" allowFullScreen="true" allowScriptAccess="always"></embed></object></div><br />';
}

//Affichage direct du lecteur deezer
function ydeezer(link,zik) 
{
  return '<object width="220" height="55"><param name="movie" value="http://www.deezer.com/embedded/small-widget-v2.swf?idSong='+zik+'&colorBackground=0x555552&textColor1=0xFFFFFF&colorVolume=0x39D1FD&autoplay=0"></param><embed src="http://www.deezer.com/embedded/small-widget-v2.swf?idSong='+zik+'&colorBackground=0x525252&textColor1=0xFFFFFF&colorVolume=0x39D1FD&autoplay=0" type="application/x-shockwave-flash" width="220" height="55"></embed></object>';
}

//Affichage direct des images
function yImage(link,img) 
{
  return '<div style="text-align: center;"><a href="'+img+'"><img src="'+img+'" alt="'+img+'" style="max-width: 99%;" /></a><br /></div>';
}

//Masquage des spoilers (texte entre :spoilers:)
function yspoil(cont) 
{
  return '<img src="/smileys/63.gif" alt=":spoiler:"><br /><a style="cursor: pointer;" onclick="this.nextSibling.style.display=(this.nextSibling.style.display==\'none\')? \'block\' : \'none\';" >Afficher/Cacher le Spoiler</a><div style="display:none;border-style: solid; border-width: thin; background-color: white" >'+cont+'</div>';
}

//Citations JVF
function yCitation(citation, leReste) 
{

  return '<div style="width: 95%; padding:5px; border:1px solid #CCCCCC; margin:15px; margin-bottom: -27px;">'+citation+'</div>'+leReste;

}

//Implode
function myImplode(mwith, marray) {
  var c = marray.length-1;
  var r = '';
  for(var u=0; u<c; u++) {
    r+= marray[u]+mwith;
  }
  return r+marray[c];
}

//Affichages direct
function jv_com_replace() 
{
  var lis = (document.getElementById('col1') != null) ? document.getElementById('col1').getElementsByTagName("li") : document.getElementsByTagName("li");
  var c   = lis.length;
  for(var u=0; u<c; u++) 
  {
    if(lis[u]) 
    {
      if( lis[u].className == 'post') 
      {
        //Vidéos youtube
        lis[u].innerHTML = (lis[u].innerHTML).replace(/(<a href="http:\/\/.{2,3}\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(&amp;feature=.*)?"(.+)<\/a>)/gi, yYoutube('$1','$2'));
        
        //Vidéos dailymotion
		    lis[u].innerHTML = (lis[u].innerHTML).replace(/(<a href="http:\/\/.{2,3}\.dailymotion\.com\/(.+\/)?video\/([a-zA-Z0-9]{4,7})_.+"(.+)<\/a>)/gi, yDailymotion('$1','$3'));

		    //Musiques deezer
        lis[u].innerHTML = (lis[u].innerHTML).replace(/(<a href="http:\/\/www.deezer\.com\/track\/(.+)"(.+)<\/a>)/gi, ydeezer('$1','$2'));

		    //Images
		    lis[u].innerHTML = (lis[u].innerHTML).replace(/(<a href="(.+\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF))"(.+)<\/a>)/gi, yImage('$1','$2'));
		    
		    //Spoilers
		    lis[u].innerHTML = (lis[u].innerHTML).replace(/<img src="\/smileys\/63\.gif" alt=":spoiler:">([\s\S]*?)<img src="\/smileys\/63\.gif" alt=":spoiler:">/g, yspoil('$1'.toString()));
        
        //Citations JVF
        var splitted = lis[u].innerHTML.split('Citation de');

        if( splitted.length>1 ) 
        {

          var citation = lis[u].innerHTML.split('<br>"');
          citation[0] = citation[0].replace(/\|*/g, '');
          var citations = citation[0].split('<br>');
          citations[1] = citations[1].replace('Citation de : ', '');
          citations[0] = '';
          citations[2] = citations[2].replace('Date du message : ', 'Posté le ');
          citations[1] = '<strong style="font-size: 12px;">'+citations[1]+'</strong><div style="display:inline; float: right; margin-top: -15px; font-size: 10px;">'+citations[2]+'</div>';
          citations[1] = '<div style="margin-top: -20px; padding: 3px 0 3px; border-bottom: 1px dotted black;">'+citations[1]+'</div>';
          citations[2] = '';
          citations[3] = '';
          citations[4] = '<div style="margin-bottom: -70px;">&nbsp;</div>';
      
          var citationi = myImplode('<br>', citations);

          html = yCitation(citationi, citation[1]);
          lis[u].innerHTML = html;            

        }
      }
    }
  }
}
jv_com_replace();