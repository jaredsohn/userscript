// ==UserScript==
// @name		   Just test
// @include        http://www.neobux.com/?u=c&s=r*
// @include        https://www.neobux.com/?u=c&s=r*
// ==/UserScript==

var url=document.location.toString();


//Global Variables
var table = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
          document,
            null,
           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
           null).snapshotItem(0);



var h = document.getElementsByTagName('h1')[0].innerHTML;
if(h.indexOf('YOUR')==0)
	{
	var txt_define = "Define a comment for";
	}

if(h.indexOf('OS')==0)
	{
	var txt_define = "Defina uma comentário para";
	}

// if referrals are rented
if(url.indexOf('&ss3=2')>1)
	{
		var col_NUMBER =0;
		var col_FLAGS = 1;
		var col_HIDDEN = 2;
		var col_USERNAME = 3;
		var col_LASTCLICK = 6;
		var col_CLICKS = 7;
	}

	//if referrals are directs
if(url.indexOf('&ss3=1')>1)
	{
		var col_NUMBER =0;
		var col_USERNAME = 1;
		var col_LASTCLICK = 4;
		var col_CLICKS = 5;
	}


//Inserting the script with the functions
function clean_t(id,tmp){
		var tip = document.getElementById('info_'+id);
	       	//tip.addEventListener("click", foo(id,tmp), false); //2nd - add ONCLICK with new comment for this ref
   			GM_setValue(id,tmp);
}

var tr = table.getElementsByTagName('tr');

function foo(id,thecomment) {
    return function () {
if(thecomment!=undefined)
	{
	var tmp = prompt(''+txt_define+' '+id,unescape(thecomment));
    } else {
	var tmp = prompt(''+txt_define+' '+id);
    }

	if(tmp || tmp=="")
		{

		var tip = document.getElementById('info_'+id);
				if(tip.getElementsByTagName('script').length>0){
				tip.removeChild(tip.getElementsByTagName('script')[0]);
				}

		if(tmp==""){
				tip.setAttribute('style','cursor:pointer;background:url(http://i26.tinypic.com/hwiirk.png);background-repeat:no-repeat;');
				}
		if(tmp!=""){
				tip.setAttribute('style','cursor:pointer;background:url(http://i30.tinypic.com/35a0svd.png);background-repeat:no-repeat;');
				}

			var script=document.createElement('script');
				tmp = escape(tmp);			
			var text = document.createTextNode("new Tip('info_"+id+"', unescape('"+tmp+"'),{style:'darkgrey',width:'auto',stem:'leftTop',delay:'0.01',hook:{tip:'leftTop',target:'rightTop'},offset:{x:0,y:0}});");
			
				script.type = 'text/javascript';
				script.appendChild(text);
			    tip.appendChild(script);


		tip.removeEventListener("click", clean_t(id,tmp), false); //1st - remove event and go to CLEAN_T()


if(tmp=="")
		{
		GM_deleteValue(id);
		}
		}


    }
 }

for(var i = 1;i < tr.length; i++)
	{
    if(tr[i].getAttribute('onmouseover')!=null)
		{
			var td = tr[i].getElementsByTagName('td')[col_USERNAME];
			var username = td.innerHTML.split('&nbsp;')[0];
			//var tdclick = tr[i].getElementsByTagName('td')[col_CLICKS];
			//var clicks = tdclick.innerHTML.split('&nbsp;')[0];
			//clicks = parseInt(clicks);
			var tdlastClick = tr[i].getElementsByTagName('td')[col_LASTCLICK];
			var lastClick = tdlastClick.innerHTML.split('[')[1].split(' ')[0];
			lastClick = parseInt(lastClick);
			
			// this works for directs only
			// it says how long referral has not clicked
			if(url.indexOf('&ss3=1')>1)
			{
				if(lastClick > 4)
				{
					var typeis = typeof(GM_getValue(username));
					if(typeis == "number" || typeis == "undefined")
						GM_setValue(username, lastClick);
				}
			}
			
			if(GM_getValue(username)!=undefined)
				{
				button = "http://i30.tinypic.com/35a0svd.png"; //active
				} else {
				button = "http://i26.tinypic.com/hwiirk.png"; //not active
				}

			td.innerHTML='';
			//Adds the button
			var comment = document.createElement('table');
			comment.setAttribute('style','width:100%;');

			tdum = document.createElement('td');
			tdum.innerHTML = username;
			comment.appendChild(tdum);
			tddois = document.createElement('td');
			tddois.setAttribute('style','cursor:pointer;background:url(\''+button+'\');background-repeat:no-repeat;');
			tddois.setAttribute('id','info_'+username);
			tddois.setAttribute('width','16px');
			tddois.setAttribute('height','16px');
			tddois.innerHTML='&nbsp;&nbsp;&nbsp;';

			tddois.addEventListener("click", foo(username,GM_getValue(username)), false);
			tddois.align='right';

			//so adds to the TIP if GM_getValue is different from undefined
			if(GM_getValue(username)!=undefined)
				{
					script=document.createElement('script');
					var text = document.createTextNode("new Tip('info_"+username+"', unescape('"+GM_getValue(username)+"'),{style:'darkgrey',width:'auto',stem:'leftTop',delay:'0.01',hook:{tip:'leftTop',target:'rightTop'},offset:{x:0,y:0}});");
					script.type = 'text/javascript';
					script.appendChild(text);
					tddois.appendChild(script);
				}

			comment.appendChild(tddois);

			td.appendChild(comment);
		}
	}