// ==UserScript==
// @name           DinoRPGFaster
// @namespace      DinoRPGFaster
// @description    Permet d'accélerer le jeu dinoRPG avec les dialogues, n'affiche plus les erreurs et navihue plus rapidement entre les dinoz by Daxou31
// @include        http://www.dinorpg.com/*
// ==/UserScript==


var notification = document.getElementById( "notification" );
if ( notification != null )
{
	document.body.removeChild( notification );
}

var answers = document.getElementById( "answers" );
if ( answers != null )
{
	answers.style.display = "block";
}

var finish = document.getElementsByClassName( "button bSmall" )[0];
if ( finish != null )
{
	finish.style.display = "block";
}

var ul = document.getElementById( "dinozList" ).getElementsByTagName( "ul" )[0];
var liste = ul.getElementsByTagName( "li" );
if ( liste != null && liste.length != 0 )
{
	var idPrec = null;
	var idSuiv = null;
	var idLead = null;
	var idUp = null;
	var idDead = null;
	var idBestPrec = null;
	var idBestSuiv = null;
	var max = liste.length;
	var follow = false;
	var afterSelected = false;
	
	for( var i=0; i< max; i++ )
	{
		if ( follow && !getType( liste[i] , "follow" ) )
		{
			idLead = getLink( liste[i] );
			follow = false;
		}
		
		if ( liste[i].className.match( /\bselected\b/g ) )
		{
			afterSelected = true;
			if ( i+1 < max )
			{
				idSuiv = getLink( liste[i+1] );
				if ( getType( liste[i+1] , "follow" ) )
				{
					follow = true;
				}
			}
			if ( i > 0 )
			{
				idPrec = getLink( liste[i-1] );
			}
		}
		
		if ( getType( liste[i] , "level" ) )
		{
			idUp = getLink( liste[i] ) + "/act/levelup";
		}
		
		if ( liste[i].className.match( /\bdead\b/g ) )
		{
			idDead = getLink( liste[i] );
		}
		
		if ( !liste[i].className.match( /\boff\b/g ) && !liste[i].className.match( /\bselected\b/g ) && afterSelected == false )
		{
			idBestPrec = getLink( liste[i] );
		}
		
		if ( !liste[i].className.match( /\boff\b/g ) && !liste[i].className.match( /\bselected\b/g ) && afterSelected == true && idBestSuiv == null )
		{
			idBestSuiv = getLink( liste[i] );
		}
	}
		
	var prec = document.createElement( "a" );
	if ( idPrec != null )
	{
		prec.href = idPrec;
		prec.setAttribute( "style" , "float: left;" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/small_browse_prev.gif";
		img.alt = "<-";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Dinoz Precedent</div>','smallTip')" );
		
		prec.appendChild( img );
	}
		
	var bestPrec = document.createElement( "a" );
	if ( idBestPrec != null )
	{
		bestPrec.href = idBestPrec;
		bestPrec.setAttribute( "style" , "float: left; margin-left: 12px;" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/small_browse_begin.gif";
		img.alt = "<<";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Dinoz Precedent Non fatiqué</div>','smallTip')" );
		
		bestPrec.appendChild( img );
	}
	
	var up = document.createElement( "a" );
	if ( idUp != null )
	{
		up.href = idUp;
		up.setAttribute( "style" , "float: right;margin-right: 12px;" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/small_lup.gif";
		img.alt = "UP";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Aller au dinoz qui Level UP</div>','smallTip')" );
		
		up.appendChild( img );
	}
	
	
	var lead = document.createElement( "a" );
	if ( idLead != null )
	{
		lead.href = idLead;
		lead.setAttribute( "style" , "float: right;margin-right: 12px;" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/small_leader.gif";
		img.alt = "No Suiv";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Sauter les dinoz qui suivent</div>','smallTip')" );
		
		lead.appendChild( img );
	}
		
	var bestSuiv = document.createElement( "a" );
	if ( idBestSuiv != null )
	{
		bestSuiv.href = idBestSuiv;
		bestSuiv.setAttribute( "style" , "float: right; margin-right: 12px;" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/small_browse_end.gif";
		img.alt = ">>";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Dinoz Suivant Non fatiqué</div>','smallTip')" );
		
		bestSuiv.appendChild( img );
	}
	
	var suiv = document.createElement( "a" );
	if ( idSuiv != null )
	{
		suiv.href = idSuiv;
		suiv.setAttribute( "style" , "float: right" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/small_browse_next.gif";
		img.alt = "->";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Dinoz Suivant</div>','smallTip')" );
		
		suiv.appendChild( img );
	}
	
	var dead = document.createElement( "a" );
	if ( idDead != null )
	{
		dead.href = idDead;
		dead.setAttribute( "style" , "float: right; margin-right: 12px;" );
		
		var img = document.createElement( "img" );
		img.src = "/img/icons/act_resurrect.gif";
		img.alt = "X(";
		img.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
		img.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Dinoz Mort</div>','smallTip')" );
		img.setAttribute( "style" , "width: 16px; height: 16px;" );
		
		dead.appendChild( img );
	}
	
	var help = document.createElement( "a" );
	help.href = "http://daxou.fr";
	help.setAttribute( "target" , "_blank" );
	var imgHelp = document.createElement( "img" );
	imgHelp.src = "/img/icons/small_missAct.gif";
	imgHelp.alt = "?";
	imgHelp.setAttribute( "style" , "float: right; margin-right: 12px;" );
	imgHelp.setAttribute( "onmouseout" , "mt.js.Tip.hide()" );
	imgHelp.setAttribute( "onmouseover" , "mt.js.Tip.show(this,'<div class=\\'content\\'>Créé par DaXou31</div>','smallTip')" );
	help.appendChild( imgHelp );
	
	
	var p = document.createElement( "p" );
	p.appendChild( prec );
	p.appendChild( bestPrec );
	p.appendChild( suiv );
	p.appendChild( bestSuiv );
	p.appendChild( dead );
	p.appendChild( up );
	p.appendChild( lead );
	p.appendChild( help );
	p.setAttribute( "style" , "height: 10px;" );
	
	document.getElementById( "dinozList" ).insertBefore( p , ul );

}
else
{
	alert( "Vous n'avez pas de dinoz !" );
}


function getLink( li )
{
	var href = li.getElementsByTagName( "a" )[0].href;
	return href;
}

function getType( li , type )
{
	var a = li.getElementsByTagName( "a" )[0];
	var name = getNameContent( a.getElementsByTagName( "span" ) );
	
	var imgs = name.getElementsByTagName( "img" );
	var max = imgs.length;
	
	for ( var i=0; i<max; i++ )
	{
		var img = imgs[i].src;
		
		if ( type == "follow" && img.match( /\bsmall_follow.gif\b/g ) )
		{
			return true;
		}
		else if ( type == "leader" && img.match( /\bsmall_leader.gif\b/g ) )
		{
			return true;
		}
		else if ( type == "level" && img.match( /\bsmall_lup.gif\b/g ) )
		{
			return true;
		}
	}
	return false;
}

function getNameContent( spans )
{
	var max = spans.length;
	for( var i=0; i<max; i++ )
	{
		if ( spans[i].className.match( /\bname\b/g ) )
		{
			return spans[i];
		}
	}
}


// button bSmall -- dead