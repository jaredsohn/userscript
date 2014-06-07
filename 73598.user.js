// ==UserScript==
// @name           Magic
// @namespace      *www.tmgame.ru*
// @include        http://*tmgame.ru/game.php*
// ==/UserScript==
var divPr;
var actions;
var tpActions;
(function(){

   refresh();
}
)();

function refresh(){



   /*GM_xmlhttpRequest({
      method: 'GET',
      //  url: 'http://www.tmgame.ru/xml/persxml.php',
      url: 'http://www.tmgame.ru/xml/spellxml.php?'+rand(1000,9999),
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      }
      ,
      onload: function(responseDetails) {*/
         /*var parser = new DOMParser();
         var resp=responseDetails.responseText;
         var bstop=false;
         var ind=0;
         var lastInd=20;
         var debug=0;
 
         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('root');
         actions = dom.getElementsByTagName('cont');
         tpActions = new Array();
         var art_id = new Array();
         var str='';*/
		
         divPr = document.createElement("div");
         divPr.innerHTML = '';
         divPr.setAttribute("style",'position:absolute;cursor:pointer;top:0px;left:0px;background:#F2D48C;padding: 3px 3px;');
         document.getElementsByTagName('body')[0].appendChild(divPr);
		var ClearMagic = document.createElement("b");
		ClearMagic.innerHTML = 'Сбросить магию <br>----------<br>';
		ClearMagic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(ClearMagic);
		ClearMagic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'reset=1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

			var SRMagic = document.createElement("b");
			SRMagic.innerHTML = 'Школа рыцарей<br><br>';
			SRMagic.setAttribute("style",'color:#FF7F50;');
			divPr.appendChild(SRMagic);
			SRMagic.addEventListener('click', bar=function(){
					  GM_xmlhttpRequest({
					  method: 'POST',
					  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
					  data: 'data=3%2C12%2C1',
					  headers: {
			 'User-agent': 'Mozilla/4.0 (compatible)',
			 'Accept': 'application/atom+xml,application/xml,text/xml',
			 'Content-Type': 'application/x-www-form-urlencoded',
			},	  
			onload: function(){}
			}); }, false);
			//refresh();


	  var BBMagic = document.createElement("b");
		BBMagic.innerHTML = 'Боевое безумие 1<br>';
		BBMagic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(BBMagic);
		BBMagic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C3%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  var BB2Magic = document.createElement("b");
		BB2Magic.innerHTML = 'Боевое безумие 2<br><br>';
		BB2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(BB2Magic);
		BB2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C3%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  
	  var DV1Magic = document.createElement("b");
		DV1Magic.innerHTML = 'Двойная атака 1<br>';
		DV1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(DV1Magic);
		DV1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C19%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var DV2Magic = document.createElement("b");
		DV2Magic.innerHTML = 'Двойная атака 2<br><br>';
		DV2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(DV2Magic);
		DV2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C19%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var RU1Magic = document.createElement("b");
		RU1Magic.innerHTML = 'Разящий удар 1<br>';
		RU1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(RU1Magic);
		RU1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C20%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var RU2Magic = document.createElement("b");
		RU2Magic.innerHTML = 'Разящий удар 2<br>';
		RU2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(RU2Magic);
		RU2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C20%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);


	  var RU3Magic = document.createElement("b");
		RU3Magic.innerHTML = 'Разящий удар 3<br><br>';
		RU3Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(RU3Magic);
		RU3Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C20%2C3',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var PR1Magic = document.createElement("b");
		PR1Magic.innerHTML = 'Противостояние 1<br>';
		PR1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(PR1Magic);
		PR1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C8%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var PR2Magic = document.createElement("b");
		PR2Magic.innerHTML = 'Противостояние 2<br><br>';
		PR2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(PR2Magic);
		PR2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C8%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var JA1Magic = document.createElement("b");
		JA1Magic.innerHTML = 'Яростный отпор 1<br>';
		JA1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(JA1Magic);
		JA1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C21%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var JA2Magic = document.createElement("b");
		JA2Magic.innerHTML = 'Яростный отпор 2<br><br>';
		JA2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(JA2Magic);
		JA2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C21%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var OU1Magic = document.createElement("b");
		OU1Magic.innerHTML = 'Ответный удар 1<br>';
		OU1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(OU1Magic);
		OU1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C22%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var OU2Magic = document.createElement("b");
		OU2Magic.innerHTML = 'Ответный удар 2<br>';
		OU2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(OU2Magic);
		OU2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C22%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);	  

	  var OU3Magic = document.createElement("b");
		OU3Magic.innerHTML = 'Ответный удар 3<br><br>';
		OU3Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(OU3Magic);
		OU3Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C22%2C3',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var PMMagic = document.createElement("b");
		PMMagic.innerHTML = '------------<br>Путь мага<br><br>';
		PMMagic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(PMMagic);
		PMMagic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C13%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  var L1Magic = document.createElement("b");
		L1Magic.innerHTML = 'Лечение 1<br>';
		L1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(L1Magic);
		L1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C2%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var L2Magic = document.createElement("b");
		L2Magic.innerHTML = 'Лечение 2<br><br>';
		L2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(L2Magic);
		L2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C2%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  var MO1Magic = document.createElement("b");
		MO1Magic.innerHTML = 'Молния 1<br>';
		MO1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(MO1Magic);
		MO1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C1%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var MO2Magic = document.createElement("b");
		MO2Magic.innerHTML = 'Молния 2<br><br>';
		MO2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(MO2Magic);
		MO2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C1%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
/*		var NMMagic = document.createElement("b");
		NMMagic.innerHTML = 'Неизвестная магия<br>';
		NMMagic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(NMMagic);
		NMMagic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C17%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);*/
	  
	  
	  
	  var PS1Magic = document.createElement("b");
		PS1Magic.innerHTML = 'Пробуждение силы 1<br>';
		PS1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(PS1Magic);
		PS1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C23%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var PS2Magic = document.createElement("b");
		PS2Magic.innerHTML = 'Пробуждение силы 2<br><br>';
		PS2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(PS2Magic);
		PS2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C23%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var VS1Magic = document.createElement("b");
		VS1Magic.innerHTML = 'BC 1<br>';
		VS1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(VS1Magic);
		VS1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C24%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var VS2Magic = document.createElement("b");
		VS2Magic.innerHTML = 'BC 2<br>';
		VS2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(VS2Magic);
		VS2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C24%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  var VS3Magic = document.createElement("b");
		VS3Magic.innerHTML = 'BC 3<br><br>';
		VS3Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(VS3Magic);
		VS3Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C24%2C3',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var RK1Magic = document.createElement("b");
		RK1Magic.innerHTML = 'Ритуал крови 1<br>';
		RK1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(RK1Magic);
		RK1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C25%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var RK2Magic = document.createElement("b");
		RK2Magic.innerHTML = 'Ритуал крови 2<br><br>';
		RK2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(RK2Magic);
		RK2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C25%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var XA1Magic = document.createElement("b");
		XA1Magic.innerHTML = 'Хаос 1<br>';
		XA1Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(XA1Magic);
		XA1Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C26%2C1',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);

	  var XA2Magic = document.createElement("b");
		XA2Magic.innerHTML = 'Хаос 2<br>';
		XA2Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(XA2Magic);
		XA2Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C26%2C2',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  var XA3Magic = document.createElement("b");
		XA3Magic.innerHTML = 'Хаос 3<br>';
		XA3Magic.setAttribute("style",'color:#FF7F50;');
		divPr.appendChild(XA3Magic);
		XA3Magic.addEventListener('click', bar=function(){
                  GM_xmlhttpRequest({
				  method: 'POST',
				  url: 'http://www.tmgame.ru/action.php?xml=1&acode=mgtreesv',
				  data: 'data=3%2C26%2C3',
				  headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
		 'Content-Type': 'application/x-www-form-urlencoded',
      },
	  
	  onload: function(){}
	  }); }, false);
	  
	  
	  //}
   //});
}

function getURL(vUrl){
   GM_xmlhttpRequest({
      method: "GET",
      url: vUrl,
      onload: function(responseDetails){
      }

   }
   );
}


function rand(Min,Max){
   var iMin=parseInt(Min);
   var iMax=parseInt(Max);

   return (Math.floor(((Math.random()*(iMax-iMin+1))+iMin)));
}


function normalize(link){
   var lnk=link;
   for (var q=0;q<=lnk.length;q++){
      if (lnk.charAt(q)=='!'){
         lnk=lnk.slice(0,q)+'='+lnk.slice(q+1);
      }
      if (lnk.charAt(q)=='@'){
         lnk=lnk.slice(0,q)+'&'+lnk.slice(q+1);
      }
   }
   return(lnk);
}
