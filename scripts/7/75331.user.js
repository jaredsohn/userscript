// ==UserScript==
// @name 		FMyLife.com Enhancer
// @author		FYLDeep, Sirin, Freeze
// @namespace		http://www.fmylife.com
// @description		Adds various useful features for the professional FML reader.
// @version		1.0.0

// @include		http://*.fmylife.com/*
// @include		https://*.fmylife.com/*
// @match		http://*.fmylife.com/*
// @match		https://*.fmylife.com/*
// ==/UserScript==

// This script was written by FMyLife.com commenter FYLDeep in collaboration with Sirin, and auxiliary improvements from Freeze.
// I hope it's useful.

// If you encounter any bugs, just let me know. If there's any features you would like to see added, let me know too, but nothing too ambitious!

// DISCLAIMER:
// USE THIS AT YOUR OWN RISK!
// THE DEVELOPERS OF THIS SCRIPT ARE NOT RESPONSIBLE FOR ISSUES RESULTING FROM THIS SCRIPT, NO MATTER HOW UNLIKELY.
// DO NOT USE THIS SCRIPT IF YOU DO NOT AGREE TO THIS.

//==========================================================================
//==========================The Declarations================================
//==========================================================================

// Change these constants to your liking

// Toggles various features on or off
// set collapse to zero to always show replies.
const optMessageAlert=true, optHighlight=true, optThreading=false, optNoLife=true, optPictures=true, optQuoteExtract=true, optWidescreen=false, width='1000px', collapse=30;

// Toggle the various highlighting groups on or off.
const optMe=true, optVIP=true, optBlacklist=true, optBlacklistHide=false;

// Enter your own values in the form of usernames, all lowercase.
// Commenters of some interest.
const vips=
['aback','allmidnighteyes','boatkicker','brave_sir_robin','callmehush','cinn','docbastard','doortje','dreamering','enonymous','every1luvsboners','flockz','flying_vegan','freeze','fyldeep','iamscrubs','imaginaryfoe','intoxicunt','kaysl','mcman','monikabug','mrsassypants','ohthebloodygore','perdix','redbluegreen','scaryymary','schizomaniac','sinkhole','sirebc','snickerdoodles','theirishjanedoe','upsidedownkayak','vasilisauzhasnaj','wisericky','zebidee'];

// Enter your own values in the form of usernames, all lowercase.
// Commenters urgently needing a full frontal lobotomy.
const blacklist=
['auz1_pride', 'ayame01', 'babiirawr','blue_coconuts','bmkc4','calyx','cowboyy','devore504','dirtyblond','hateevryone','haileyw15','in_some_bullshit','joooeee','lonkite101','marleytooyou','mierda2k','mvems','olpally','raleigh_bruh','rallets','rawrcupcakesz','stevenmx86','supportcommand','tkay94','twozerooz','vergaso','zachherbert'];

//============================================================================
//==================A bunch of nonsense. Please ignore========================
//============================================================================

//WARNING: Black magic found below. Modifying may result in being cursed.

if(!document.URL.match(/.com\/(admin|joost)/gi))
{
	const ad=document.getElementById('ad_leaderboard');
	if(ad)
		ad.parentNode.removeChild(ad);
	var w=document.getElementById('content');
	var i;
	var dright=document.getElementsByClassName('droite');
	if(dright)dright=dright[0];
	
	function getFirstChildWithClass(n,cn)
	{
		if(n)
		{
			var i=-1,l=n.childNodes.length;
			while(++i<l)
				if(n.childNodes[i].className==cn)
					return n.childNodes[i];
		}
		return null;
	}
	function getLastChildWithClass(n,cn)
	{
		if(n)
		{
			var i=n.childNodes.length;
			while(i--)
				if(n.childNodes[i].className==cn)
					return n.childNodes[i];
		}
		return null;
	}

	function getFirstChild(p)
	{
		if(p)
		{
			var i=-1,l=p.childNodes.length;
			while(++i<l)
				if(p.childNodes[i].nodeType!=3)
					return p.childNodes[i];
		}
		return null;
	}
	function getLastChild(p)
	{
		if(p)
		{
			var i=p.childNodes.length;
			while(i--)
				if(p.childNodes[i].nodeType!=3)
					return p.childNodes[i];
		}
		return null;
	}
	function getNextSibling(n)
	{
		if(n)
			do{
				n=n.nextSibling;
			}while(n.nodeType!=1);
		return n;
	}
	function getPrevSibling(n)
	{
		if(n)
			do{
				n=n.prevSibling;
			}while(n.nodeType!=1);
		return n;
	}
	function stripSide(n)
	{
		if(n)
		{
			var i=n.childNodes.length;
			while(i--)
				if(!n.childNodes[i].className||n.childNodes[i].className.match(/publicite|autopromo|facebook_login|likebox/))
					n.removeChild(n.childNodes[i]);
		}
	}
	stripSide(getFirstChild(dright));
	stripSide(getLastChild(dright));
	/*
	if(!document.URL.match(/\/blog\//gi)&&optWidescreen)
	{
		dright.parentNode.style.width=width;
		w.style.width=dright.parentNode.offsetWidth-180+'px';
	}*/
	var qme='',me='';
	var um=document.getElementById('user_submenu');
	if(um)
	{
		qme=getFirstChild(getFirstChild(getFirstChild(getFirstChild(getFirstChild(um)))));
		qme=(qme.tagName=='A') ? qme.firstChild.nodeValue : '';
		me=qme.toLowerCase();
		/*
		//--------------------------New Message Alerts------------------------------
		// The id of the link taking you to your mailbox
		const messages=document.getElementById('unread_mps');
		//--------------Alert user to any new messages--------------------------
		if(messages&&optMessageAlert&&messages.innerHTML!='')
		{
			const t=messages.parentNode.parentNode.parentNode.style;
			t.border='2px solid';
			t.borderColor='#FD8';
			t.backgroundColor='#FCFFB3';
		}
		*/
	}
	//---------------------Comment Page Exculsives------------------------------

	if(document.URL.match(/\/(love|money|kids|work|health|intimacy|miscellaneous|animals|blog)\//gi))
	//only runs if the sub url is matched
	{
		//------------Quote Extaction option for Sirin's quote database-------------
		if(optQuoteExtract)
		{
			function decode(s) {
				var td = document.createElement('div');
				td.innerHTML = s.replace(/>/g, "&gt;").replace(/</g, "&lt;");
				return td.firstChild?td.firstChild.nodeValue:'';
			}
			function extract(e)
			{
				e=e.currentTarget.parentNode.parentNode.parentNode;
				var pos=0;
				while(e.childNodes[++pos].className.indexOf('texte') == -1);
				qta.value+='<<'+getName(e)+'>> '+decode(e.childNodes[pos].innerHTML.replace(/<.*?>/g,''))+'\n';
				if(qta.style.display='none')
					texttoggle();
			}
			function texttoggle()
			{
				if(qta.style.display=='none')
				{
					box.style.display=qs.style.display=qa.style.display=qta.style.display='';
					qt.innerHTML='Hide';
				}
				else
				{
					if(qta.value=='')
						box.style.display='none';
					qs.style.display=qa.style.display=qta.style.display='none';
					qt.innerHTML='Show';
				}
			}
			function addFML()
			{
				var fml=1;
				while(w.childNodes[++fml].className!='post article'&&fml<w.childNodes.length);
				qta.value= '['+decode(w.childNodes[fml].firstChild.innerHTML.replace(/<.*?>/g, ''))+']\n\n'+qta.value;
			}
			var qta=document.createElement('textarea');
			qta.style.width='400px';
			qta.style.height='300px';
			qta.style.padding='10px';
			qta.style.marginBottom='4px';
			qta.name='quote';

			var qcf=document.createElement('div');
			qcf.className='clearFloat';

			var qa=document.createElement('a');
			qa.innerHTML='Add the FML';
			qa.addEventListener('click',addFML,false);
			qa.style.cursor='pointer';
			qa.style.cssFloat='left';

			var qt=document.createElement('a');
			qt.innerHTML='Show';
			qt.style.cursor='pointer';
			qt.addEventListener('click',texttoggle,false);
			qt.style.cssFloat='right';

			var qs=document.createElement('a');
			qs.innerHTML="Add to Sirin's Quote Database";
			qs.addEventListener('click',function(){dk.submit();},false);
			qs.style.cursor='pointer';

			var box=document.createElement('div');
			box.style.zIndex='20';
			box.style.border='1px solid';
			box.style.backgroundColor='#FFC';
			box.style.marginLeft='60px';
			box.style.position='fixed';
			box.style.padding='10px';
			box.style.borderRadius='8px';
			box.style.WebkitBorderRadius='8px';
			box.style.MozBorderRadius='8px';
			box.style.right='10px';
			box.style.top='50px';
			qta.style.display=box.style.display='none';

			var dk = document.createElement('form');
			dk.action='http://www.sirinz.org/submit/';
			dk.method='post';
			dk.target='_blank';

			if(qme)
			{
				var qsub=document.createElement('input');
				qsub.type='hidden';
				qsub.name='submitter';
				qsub.value=qme;
				dk.appendChild(qsub);
			}
			dk.appendChild(qa);
			dk.appendChild(qt);
			dk.appendChild(qcf);
			dk.appendChild(qta);
			dk.appendChild(document.createElement('br'));
			dk.appendChild(qs);
			box.appendChild(dk);
			document.body.insertBefore(box,document.body.firstChild);
		}
		//--------------------------Highlighting------------------------------------
		function highlight(n,cD)
		{
			n=n.toLowerCase();
			if(optMe && n == me)
			{
				cD.style.backgroundColor='#C8F1F1';
				return true;
			}
			if(optVIP)
			{
				c=vips.length;
				while(c--)
					if(n == vips[c])
					{
						cD.style.backgroundColor='#D2EDD2';
						return true;
					}
			}
			if(optBlacklist)
			{
				c=blacklist.length;
				while(c--)
					if(n == blacklist[c])
					{
						if(optBlacklistHide)
							cD.style.display='none';
						else
							cD.style.backgroundColor='#CDCDCD';
						return false;
					}
			}
			return false;
		}
		var ui;
		function getName(cD)
		{
			ui=0;
			while(cD.childNodes[++ui].className!='userinfos');
			n=cD.childNodes[ui].firstChild;
			var y=n.childNodes[1].nodeValue;
			if(y.substring(y.indexOf('by',27)+3))
			{
				y=y.substring(y.indexOf('by',27)+3);
				n=y.substring(0,y.indexOf(' '));
			}
			else
			{
				n=n.childNodes[2];
				if(n.firstChild.tagName=='A')
					n=n.firstChild;
				n=n.innerHTML;
			}
			return n;
		}
		var currentPost=null;
		/*
		//--------------------------Thread Toggling---------------------------------
		function toggle(e)
		{
			var object=e.parentNode.parentNode.parentNode;
			//alert(object.id);
			var cN=object.nextSibling;
			while(cN=cN.nextSibling)
			{
				if(cN.className=='post')break;
				if(cN.nodeType!=3)
				{
					if(cN.className=='post reply')
					{
						if(cN.style.display=='none')
						{
							e.innerHTML='Hide'+e.innerHTML.substr(4);
							cN.style.display='';
						}
						else
						{
							e.innerHTML='Show'+e.innerHTML.substr(4);
							cN.style.display='none';
						}
					}
				}
			}
		}
		function tog(ref)
		{
			var x,rT;
			if(ref.parentNode.parentNode.className == '')
			{
				x=ref.parentNode.previousSibling;
				var pos=x.childNodes.length;
				while(x.childNodes[--pos].className!='userinfos');
				ref=x.childNodes[pos].firstChild.firstChild;
			}
			x=ref.parentNode.parentNode.parentNode;
			if((rT=x.nextSibling.style).display == 'none')
			{
				ref.innerHTML='Hide'+ref.innerHTML.substr(4);
				x.style.borderColor='#0E0';
				rT.display='';
			}
			else
			{
				ref.innerHTML='Show'+ref.innerHTML.substr(4);
				x.style.borderColor='#E00';
				rT.display='none';
			}
		}
		function togClick(e)
		{
			toggle(e.currentTarget);
		}
		*/

		function increment(name)
		{
			var v=list.length;
			while(v--)
				if(list[v][0]==name)
				{
					list[v][1]++;
					return;
				}
			list.push([name,1]);
		}
		var list=new Array();
		// checks for a linked comment
		var lC=document.URL, lF=lC.indexOf('#c');
		if(lF>-1)
			lC='c'+lC.substr(lF+3);
		//---------------------------No Life Stats----------------------------------
		if (optNoLife)
		{
			const pL=document.createElement('div');
			const pR=document.createElement('div');
			function nolife(e)
			{
				if(list.length)
				{
					bx.removeChild(bStats);
					pR.style.cssFloat='right';
					pR.style.padding='7px';
					pL.style.padding='7px';
					bx.appendChild(pR);
					bx.appendChild(pL);
					list.sort(how);
					makeList(false);
					var bL1=document.createElement('a');
					bL1.addEventListener('click',function(){expand(false)},false);
					bL1.style.cursor='pointer';
					bL1.innerHTML='Ten More';
					var bL2=document.createElement('a');
					bL2.addEventListener('click',function(){expand(true)},false);
					bL2.style.cursor='pointer';
					bL2.innerHTML='Expand All';
					bL2.style.paddingRight='10px';
					var bP=document.createElement('p');
					bP.style.textAlign='right';
					bP.style.fontSize='11px';
					bP.appendChild(bL1);
					bP.appendChild(document.createTextNode(' - '));
					bP.appendChild(bL2);
					bx.appendChild(bP);
				}
			}

			function how2(a,b)
			{
				var x=a[0].toLowerCase();
				var y=b[0].toLowerCase();
				return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			}
			function how(a,b)
			{
				return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : how2(a,b)));
			}
			function makeList(displayAll)
			{
				var y=0;
				while (list.length && (displayAll || y++<10))
				{
					var current=list.pop()
					var a=document.createElement('a');
					a.href='/member/'+current[0];
					a.innerHTML=current[0];
					pL.appendChild(a);
					pL.appendChild(document.createElement('br'));
					pR.innerHTML += current[1] + '<br />';
				}
			}
			function expand(displayAll)
			{
				makeList(displayAll);
				if(!list.length)
					bx.removeChild(bx.lastChild);
			}
			const bx=document.createElement('div');
			bx.className='box';
			const h=document.createElement('h4');
			h.innerHTML='No Life Stats';
			bx.appendChild(h);

			var bStats=document.createElement('a');
			bStats.addEventListener('click',nolife,false);
			bStats.style.cursor='pointer';
			bStats.style.padding='7px';
			bStats.innerHTML='Load';

			bx.appendChild(bStats);
			dright.insertBefore(bx, getLastChild(dright));

		}
		/*
		if(optThreading)
		{
			i=w.childNodes.length-1;
			do{
				if((cP=w.childNodes[i]).id&&cP.id[0]=='c')
				{
					//checks if post is a reply
					if(cP.className.match(/post reply|post highlight reply/))
					{
						//create a reply outer table
						var dP=document.createElement('div');
						dP.style.marginBottom='18px';

						var cL=document.createElement('div');
						cL.innerHTML='^<br/>|<br/>|<br/>|<br/>|';
						cL.style.color='#69c';
						cL.style.fontSize='20px';
						cL.className='post';
						cL.style.width='20px';
						cL.style.lineHeight='.3em';
						cL.style.display='table-cell';
						cL.style.padding='10px 0px';
						cL.style.backgroundColor='#BCD';
						cL.style.cursor='pointer';
						cL.addEventListener('click',togClick,false);
						cL.style.textAlign='center';

						var cR=document.createElement('div');
						cR.style.display='table-cell';
						//replies to original post
						var r=i,imp=false;
						do{
							if(process(w.childNodes[i]))
								imp=true;
							var n=w.childNodes[i].style;
							n.marginLeft='12px';
							n.width=w.offsetWidth-50+'px';
							cR.insertBefore(w.childNodes[i--],cR.firstChild);
						}while(w.childNodes[i].className.match(/post reply|post highlight reply/));
						r-=i;
						cR.lastChild.style.cssText+='margin-bottom:0 !important';

						//original post
						var pD=w.childNodes[i];
						//if the first comment is missing
						if(!pD.id)
						{
							var pH=document.createElement('div');
							pH.innerHTML='Place Holder';
							pH.className='post';
							w.insertBefore(pH,pD.nextSibling);
							pD=pH;
							pH=document.createElement('div');
							pH.className='clear';
							pD.appendChild(pH);
						}else
							if(process(pD))
								imp=true;
						pD.style.border='1px solid';
						pD.style.borderColor='#0E0';



						pD.parentNode.insertBefore(dP,pD.nextSibling);

						if(collapse>0 && r>=collapse && !imp)
							tog(l);
					}else
						process(cP);
				}
			}while (--i);

		}*/
		function process(cD)
		{
			if(cD.childNodes.length<5)
				return false;
			var n,c,z;

			n=getName(cD);
			var lT=cD.childNodes[ui].firstChild.firstChild;
			lT.addEventListener('click',function(n){n=n.currentTarget;n.innerHTML='Loading...';window.location.href=n.href;window.location.reload();},false);

			if(optQuoteExtract)
			{
				var cm=cD.childNodes.length;
				while(cD.childNodes[--cm].className.indexOf("texte")==-1);
					//if(!cm)
						//break;
				if(cm!=0)
				{
					ex=document.createElement('a');
					ex.innerHTML='Extract Quote';
					ex.addEventListener('click',extract,false);
					ex.style.cursor='pointer';

					var ep=document.createElement('p');
					ep.appendChild(ex);

					var er=document.createElement('div');
					er.style.marginTop='6px';
					er.className='userinfos';
					er.style.cssFloat='right';
					er.appendChild(ep);
					er.style.clear='right';

					cD.lastChild.style.marginTop='6px';
					cD.appendChild(er);
				}
			}
			if(optPictures)
			{
				var pos=cD.childNodes.length;
				while(cD.childNodes[--pos].className!='avatar_container'&&pos);
				if(pos)
				{
					z=cD.childNodes[pos];
					cD.removeChild(z);
					cD.insertBefore(z,cD.firstChild);
					pos=cD.childNodes.length-1;
					while(cD.childNodes[--pos].className!='clear'&&pos);
					cD.childNodes[pos].style.clear='right';

					var m=cD.offsetHeight-80;
					if(m<0)
						m=0;
					z.style.margin='-3px 10px '+m+'px -3px';
					z.style.cssFloat='left';
					z.style.height='66px';
					z.style.width='66px';
					z.style.borderWidth='2px';
					z=z.firstChild.firstChild;
					z.style.height='65px';
					z.style.width='65px';

					if(z.getAttribute('original'))
					{
						var j=z.parentNode;
						j.removeChild(z);
						jI=document.createElement('img')
						jI.src=z.getAttribute('original').replace('icon','mini');
						j.appendChild(jI);
					}
					else
					z.src=z.src.replace('icon','mini');
				}
			}
			if (optNoLife)
				increment(n);
			if(lF>-1 && cD.id==lC)
			{
				lT.innerHTML+=' <span style="color:#F00">Clear</span>';
				lT.addEventListener('click',function(){window.location.href=document.URL.substring(0,lC)},false);
				if (optHighlight)
					cD.style.backgroundColor='#FCFFB3';
				cD.scrollIntoView(true);
				return true;
			}
			//New shit-------------------------------------------------------------------------------------------
			/*
			if(cD.className=='post')
			{
				currentPost=cD;
				var l=document.createElement('a');
				var r=0;
				if(r==1)
					l.innerHTML='Hide this thread ('+r+' reply)';
				else
					l.innerHTML='Hide this thread ('+r+' replies)';
				l.style.cursor='pointer';
				l.addEventListener('click',togClick,false);

				var lP=document.createElement('p');
				lP.appendChild(l);

				var dR=document.createElement('div');
				dR.className='userinfos';
				dR.style.cssFloat='right';
				dR.style.clear='right';

				dR.appendChild(lP);
				currentPost.insertBefore(dR,currentPost.lastChild);

			}*/
			//New shit-------------------------------------------------------------------------------------------
			if(optHighlight)
				return highlight(n,cD);
			return false;
		}
		function processTarget(cD)
		{
			if(cD.nodeType==3)
				return false;
			process(cD.target);
		}
		w=getLastChildWithClass(w,'wrapper cf');
		w.removeChild(getLastChildWithClass(w,'cf'));
		i=w.childNodes.length;
		while(i--)
		{
			var cur=w.childNodes[i];
			if(cur.nodeType!=3 && cur.id.charAt(0)=='c' && cur.className=='post')
				process(cur);
		}
		getLastChildWithClass(w,'comments_display').addEventListener('DOMNodeInserted',processTarget,false);
	}
}
