// ==UserScript==
// @name           Batoto follows sorted
// @description    Arregla un problema con el ordenado de batoto, ademas añade botones para ordenar por fecha, nombre o numero de capitulos sin leer. Tambien arreglaun problema con las etiquetas (new)
// @namespace      Maleko
// @version	   1.5.2
// @include        http://www.batoto.net/*
// @match	   http://www.batoto.net/*
// @homepageURL    http://userscripts.org/scripts/show/159098
// @updateUrl      https://userscripts.org/scripts/source/159098.user.js
// @installURL     https://userscripts.org/scripts/source/159098.user.js
// @downloadUrl    https://userscripts.org/scripts/source/159098.user.js
// @updateVersion  5
// ==/UserScript==


var page=window.location.pathname;
document.getElementById('nav_menu_4_trigger').href='/follows_comics';

if(page=='/follows_comics')
{
	//follows

	var antiguo = document.getElementById("index_stats");
	antiguo.innerHTML=antiguo.innerHTML+'<div class="general_box alt clearfix" id="hook_watched_items"><h3 id="anonymous_element_7"><img src="http://www.batoto.net/forums/public/style_images/master/star.png" style="margin-right:5px;">Follows by Update (new follows)</h3><div class="recent_activity _sbcollapsable"><div id="tab_content_forums" class="tab_toggle_content"><a href="/myfollows">Right here!</a></div></div>';

	//Scripts externos (se cargaran asincronamente)
	var scripts = [
	   '//datejs.googlecode.com/svn/trunk/build/date-en-US.js'
	];


	function main() { // Se llamara al acabar de cargar las dependencias



		//T Objeto principal
		function bs(){

			jQuery(".ipb_table").css('clear','left');
			this.$main = jQuery(".ipb_table"); // La tabla que contiene la lista
			this.attach();		
			this.runByDate();
		}
		


		bs.prototype.attach = function() { // carga el html y codigo para mostrar el "script"
			var that = this;
			var lugarBotones = jQuery(".maintitle");
			lugarBotones.css('width','70px').css('float','left').css('margin-left','5px');

			// css
			var cssBoton = {
				"float":"left",
				"margin": "0px",
				"margin-right": "5px"
			};

			var claseBoton = "ipsButton";
			
			//html
			
			jQuery("<button>").css(cssBoton).addClass(claseBoton)
				.text("Update")
				.click(function(){ that.runByDate(); })
				.insertBefore(lugarBotones);

			jQuery("<button>").css(cssBoton).addClass(claseBoton)
				.text("Unread")
				.click(function(){ that.runByUnread(); })
				.insertBefore(lugarBotones);


			jQuery("<button>").css(cssBoton).addClass(claseBoton)
				.text("Name")
				.click(function(){ that.runByName(); })
				.insertBefore(lugarBotones);

			this.list = this.crearLista();
		}


		// Escribe la lista
		bs.prototype.runByDate = function() {
			this.write( this.sortDate(this.list) );
		}
		bs.prototype.runByName = function() {
			this.write( this.sortName(this.list) );
		}
		bs.prototype.runByUnread = function() {
			this.write( this.sortUnread(this.list) );
		}




		bs.prototype.crearLista = function() {
			var that = this;
			var res = [];
			var elm = false;
			this.$main.find("tr").each(function(i,v){
				if (!elm) {
					elm = {first: jQuery(v), second: false
					};
				} else {
					elm.second = jQuery(v);
					res.push(elm);
					elm = false;

				}
			});

			var cssNew = {
				"color": "red",
				"font-size":"8px",
				"padding-left":"5px"
			};

			//recorro la lista para cambiar los (new)
			for(var i in res)
			{
				if(!isNaN(i))
				{
					if(this.FindNew(res[i])!== -1)
					{
			    		if(this.findFin(res[i])>=this.findInicio(res[i]))
			    		{	//tiene (new) PERO el ultimo capitulo visto es igual o superior al publicado ¬¬
			    			res[i].second.find("sup").css("display","none");		
			    		}
			    	}
			    	else
			    	{
			    		//alert(this.findFin(res[i])+' '+this.findInicio(res[i]));
			    		if(this.findFin(res[i])<this.findInicio(res[i]))
			    		{	//no tiene new pero hay capitulos que aun no has leido
			    			var hor = res[i].second.find("a").eq(0);
			    			jQuery("<sup>").css(cssNew)
							.text(" (new)")
							.insertAfter(hor);
			    		}
			    	}
			    }
			}
			return res; 
		}


		

		// Devuelve la fecha de los elementos , usando el date.js
		bs.prototype.elmToDate = function(elm) {
			var ahora= new Date();

			var hor = elm.second.find("td").eq(1).text();
			hor = hor.replace(" - ", " ");
			hor = hor
					.replace("A month", "1 month")
					.replace("A week", "1 week")
					.replace("A day", "1 day")
					.replace("An hour", "1 hour")
					.replace("A minute", "1 minute")
					;


			//var dateobj = ahora - 10;
			var dateobj;
			if(hor.indexOf('[A]')!= -1)
			{
				dateobj = Date.parse('10 year ago');
			}
			else if(hor.indexOf('hours')!= -1)
			{
				//el estupido script de datejs no pilla cosas como hace 15 horas... pero pilla -15 h... bueno lo que sea >_<
				hor = hor.split(' ');
				hor=hor[0];
				dateobj = Date.parse('t - '+hor+' h');
			}
			else
				dateobj = Date.parse(hor);
			
			return dateobj;
		}
		
		//Devuelve el titulo
		bs.prototype.elmToTitle = function(elm) {
			return elm.first.find("td").eq(1).find("a strong").text();
		}


		bs.prototype.elmVers = function(elm) { //requiere optimización, no ganas
			elm=elm.replace(elm.match('v\\.*[0-9]{1,2}'),'');
			return elm;
		}

		//devuelve el ultimo cap leido
		bs.prototype.findInicio = function(elm) {
			
			var visto=elm.second.find("td").text();
			if(visto.match('v\\.*[0-9]{1,2}'))
			{
				visto=this.elmVers(visto);

			}
			visto=visto.match('Ch\\.[0-9]*\\.{0,1}[0-9]*');
			visto=String(visto).replace('Ch.','');		
			return visto;
		}

		bs.prototype.FindNew = function(elm) {

			var t=elm.second.find("td").text();
			var f=t.indexOf('(new)');
			return f;
		}

		//devuelve el ultimo cap añadido
		bs.prototype.findFin = function(elm) {
			
			var ult= elm.first.find("a").eq(2).text();
			if(ult.match('v\\.*[0-9]{1,2}'))
			{
				//si tiene version... la quito ¬¬
				visto=this.elmVers(ult);
			}

			ult=ult.match('Ch\\.[0-9]*\\.{0,1}[0-9]*');
			ult=String(ult).replace('Ch.','');
			if(!(ult>0))
				ult=0;		
			return ult;
		}


		//Devuelve el numero de caps sin leer
		bs.prototype.elmToUnread = function(elm) {

			var visto = this.findInicio(elm);
			var ult = this.findFin(elm);
			return visto-ult;
		}


		
		//Callbacks: devuelve comparacion entre elementos (-1, 0, 1)
		bs.prototype.sortByDateCallback = function(a,b) {
			var adate = this.elmToDate(a);
			var bdate = this.elmToDate(b);
			var dif=-1*Date.compare(adate, bdate);
			if(dif==0)
			{
				dif=this.sortByNameCallback(a,b);
			}
			return dif; //compara de menor a mayor y yo quiero la mayor (mas nueva) primera..
		}
		bs.prototype.sortByNameCallback = function(a,b) {
			var aname = this.elmToTitle(a);
			var bname = this.elmToTitle(b);
			return aname.localeCompare(bname);
		}
		
		bs.prototype.sortByUnreadCallback = function(a,b) {
			var anum = this.elmToUnread(a);
			var bnum = this.elmToUnread(b);
			var dev=0;
			if(anum>bnum)
				dev=1;
			else if(bnum>anum)
				dev=-1
			else
				dev=this.sortByNameCallback(a,b);
			return dev;
		}


		//Ordena por fecha y devuelve la lista
		bs.prototype.sortDate = function(list) {
			var that = this;
			list.sort(function(a,b){
				try {
					return that.sortByDateCallback(a,b);
				} catch(e) {
					return 0;
				}
			});
			return list;
		}
		
		//Ordena por nombre y devuelve la lista
		bs.prototype.sortName = function(list) {
			var that = this;
			list.sort(function(a,b){
				return that.sortByNameCallback(a,b);
			});
			return list;
		}
		
		//Ordena por mayor cantidad sin leer y devuelve la lista
		bs.prototype.sortUnread = function(list) {
			var that = this;
			list.sort(function(a,b){
				return that.sortByUnreadCallback(a,b);
			});
			list.reverse();
			return list;
		}


		// Vacia la lista para escribirla
		bs.prototype.write = function(list) {
			var that = this;
			this.$main.empty();
			jQuery.each(list,function(i,v){
				that.$main.append(v.first);
				that.$main.append(v.second);
			});
		}
		
		//Creamos el objeto
		try {
			new bs(); 
		} catch (err) {
			console.log(err);
		}
		
	}





	// Carga asincronamente los scripts del rain y luego vamos al main()
	var numScripts = scripts.length, loadedScripts = 0;
	var i, protocol = document.location.protocol;
	for (i = 0; i < numScripts; i++) {
	  var script = document.createElement("script");
	  script.setAttribute("src", protocol + scripts[i]);
	  script.addEventListener('load', function() {
	      loadedScripts += 1;
	      if (loadedScripts < numScripts) {
	        return;
	      }
	      var script = document.createElement("script");
	      script.textContent = "(" + main.toString() + ")();";
	      document.body.appendChild(script);
	    }, false);
	  document.body.appendChild(script);
	}


}