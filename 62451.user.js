// ==UserScript==
// @name		   Ref Comment
// @include        http://www.neobux.com/?u=c&s=r*
// @include        https://www.neobux.com/?u=c&s=r*
// ==/UserScript==

var url=document.location.toString();
var title = document.title.toString();



//Variaveis globais
var donatepaypal = "http://i27.tinypic.com/142y268.gif";
            var table = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
          document,
            null,
           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
           null).snapshotItem(0);



var h = document.getElementsByTagName('h1')[0].innerHTML;
if(h.indexOf('YOUR')==0)
	{
	var txt_donate = "Ref comment script t&aacute;mogat&aacute;sa";
	var txt_define = "Megjegyzés a következő reffel kapcsolatosan:";
	}

if(h.indexOf('OS')==0)
	{
	var txt_donate = "Ref comment script t&aacute;mogat&aacute;sa";
	var txt_define = "Defina uma comentário para";
	}

if(url.indexOf('&ss3')>1)
{
	var div = document.getElementById('jo0');

	var newdiv = document.createElement('div');
		newdiv.innerHTML='<br>';
		newdiv.setAttribute('style','padding-top:2px;');

	var script = document.createElement('script');
	var text = document.createTextNode("new Tip('paypalbutton', '"+txt_donate+"',{style:'darkgrey',width:'auto',stem:'leftTop',delay:'0.01',hook:{tip:'leftTop',target:'rightTop'},offset:{x:0,y:0}});");
		script.appendChild(text);
		newdiv.appendChild(script);

	var a = document.createElement('a');
		a.setAttribute('target','_blank');
		a.href = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=danilo_mk2%40hotmail%2ecom&lc=BR&item_name=Donate&item_number=Script%20Ref%20Comment&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted';

		newdiv.appendChild(a);
	var img = document.createElement('img');
		img.id='paypalbutton';
		img.src=donatepaypal;
		img.border="0";
		a.appendChild(img);

		div.appendChild(newdiv);

	var div = document.getElementById('jo1');

	var center = document.createElement('center');

	var newdiv = document.createElement('div');
		newdiv.innerHTML='<br>';
		newdiv.setAttribute('style','padding-top:2px;');
        center.appendChild(newdiv);
	var script = document.createElement('script');
	var text = document.createTextNode("new Tip('paypalbutton', '"+txt_donate+"',{style:'darkgrey',width:'auto',stem:'leftTop',delay:'0.01',hook:{tip:'leftTop',target:'rightTop'},offset:{x:0,y:0}});");
		script.appendChild(text);
		newdiv.appendChild(script);

	var a = document.createElement('a');
		a.setAttribute('target','_blank');
		a.href = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=danilo_mk2%40hotmail%2ecom&lc=BR&item_name=Donate&item_number=Script%20Ref%20Comment&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted';

		newdiv.appendChild(a);
	var img = document.createElement('img');
		img.id='paypalbutton';
		img.src=donatepaypal;
		img.border="0";
		a.appendChild(img);

		div.appendChild(center);
}


// if referidos alugados
if(url.indexOf('&ss3=2')>1)
	{

	//Definindo colunas
var col_NUMERACAO =0;
var col_BANDEIRA = 1;
var col_BAND_ESCONDIDA = 2;
var col_USERNAME = 3;
//Definindo colunas - FIM
	}

	//if referidos diretos
if(url.indexOf('&ss3=1')>1)
	{

		//Definindo colunas
var col_NUMERACAO =0;
var col_USERNAME = 1;
//Definindo colunas - FIM
	}


//Inserindo o script com as funcoes

function clean_t(id,tmp){
		var dica = document.getElementById('info_'+id);
	       	//dica.addEventListener("click", foo(id,tmp), false); //2nd - add ONCLICK with new comment for this ref
   			GM_setValue(id,tmp);
}

var tr = table.getElementsByTagName('tr');

function foo(id,thecomment) {
    return function () {
if(thecomment!=undefined)
	{
	var tmp = prompt(''+txt_define+' '+id,thecomment);
    } else {
	var tmp = prompt(''+txt_define+' '+id);
    }

	if(tmp || tmp=="")
		{

		var dica = document.getElementById('info_'+id);
				if(dica.getElementsByTagName('script').length>0){
				dica.removeChild(dica.getElementsByTagName('script')[0]);
				}

		if(tmp==""){
				dica.setAttribute('style','cursor:pointer;background:url(http://i26.tinypic.com/hwiirk.png);background-repeat:no-repeat;');
				}
		if(tmp!=""){
				dica.setAttribute('style','cursor:pointer;background:url(http://i30.tinypic.com/35a0svd.png);background-repeat:no-repeat;');
				}

			var script=document.createElement('script');
				tmp = escape(tmp);
			var text = document.createTextNode("new Tip('info_"+id+"', unescape('"+tmp+"'),{style:'darkgrey',width:'auto',stem:'leftTop',delay:'0.01',hook:{tip:'leftTop',target:'rightTop'},offset:{x:0,y:0}});");
				script.type = 'text/javascript';
				script.appendChild(text);
			    dica.appendChild(script);


		dica.removeEventListener("click", clean_t(id,tmp), false); //1st - remove event and go to CLEAN_T()


if(tmp=="")
		{
		GM_deleteValue(id);
		}
		}


    }
 }

for(var i =1;i<tr.length;i++)
	{
    if(tr[i].getAttribute('onmouseover')!=null)
    {
	var td = tr[i].getElementsByTagName('td')[col_USERNAME];
	var username = td.innerHTML.split('&nbsp;')[0];     //Ajeitar isso quando for usar na real

	//Definindos os valores
	if(GM_getValue(username)!=undefined)
		{
		button = "http://i30.tinypic.com/35a0svd.png"; //ativo
 		} else {
 		button = "http://i26.tinypic.com/hwiirk.png"; //botao desativado
 		}

	td.innerHTML='';
	//Adiciona o botao para editar
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

 	//so adiciona a TIP se gm_getValue for diferente de undeffiner
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