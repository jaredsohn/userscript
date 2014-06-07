// ==UserScript==
// @name			Multi-Lang Lookup Bar
// @namespace		http://wushi777.blogspot.com
// @description		Press "F4".  Version: 4.5.1
// @require			http://code.jquery.com/jquery-1.3.2.js
// ==/UserScript== 

if(document.documentElement.nodeName.search(/HTML/i) != -1)
{
	tmp = eval(GM_getValue("renderDomain"));
	try
	{
		if(top != window)
		$.each(tmp,	function(i, val) {
		    if(location.toString().match(i) != null)
		    {
			tmp[i]();
		    }
	     });
	}catch(e){
		$.each(tmp,	function(i, val) {
		    if(location.toString().match(i) != null)
		    {
			tmp[i]();
		    }
	     });
	}
    
   function notify(attrName,attrValue)
   {
   	   try{
   	   	   $("#multilanglookupbar_sensor",top.document).attr(attrName,attrValue);
   	   }catch(e){}
   }
	
   function triggerBar(e)
    {
		if(e.which==115)
		{
			try {
				$("#multilanglookupbar_sensor",top.document).attr("bar_trigger","true");
			}catch(e){}
		}
    }

    function setSelectedText(e)
    {
		if(e.which == 1 && $.trim(e.view.getSelection().toString()) != "")
		{
			try
			{
				GM_setValue("selectedText",e.view.getSelection().toString());
				$("#multilanglookupbar_sensor",top.document).attr("lookup","true");
				//  e.view.getSelection().removeAllRanges();
			}catch(e) {}
		}
    }
	
	addEventListener('keyup',triggerBar,false);
    document.addEventListener("mouseup",setSelectedText,false);

//*********************		Built-in Engine Block		*********************
    if(window == top)
    {
        if(!top.wrappedJSObject.multilanglookupbar)
        {
            top.wrappedJSObject.multilanglookupbar = {};
            top.wrappedJSObject.multilanglookupbar.lib = {};
        }

    top.wrappedJSObject.multilanglookupbar.lib['translate.google.com'] = function(thisEngine)
    {
        thisEngine.restrictedTextLength = 2000;
		
        thisEngine.parameters = 
        {
            	"Detect language":"auto",
            	"Afrikaans":"af",
               "Albanian":"sq",
            	"Arabic":"ar",
            	"Armenian":"hy",
            	"Azerbaijani":"az",
				"Basque":"eu",
            	"Belarusian":"be",
            	"Bulgarian":"bg",
			  	"Catalan":"ca",
			  	"Chinese (Simplified)":"zh-CN",
            	"Chinese (Traditional)":"zh-TW",
            	"Croatian":"hr",
            	"Czech":"cs",
            	"Danish":"da",
            	"Dutch":"nl",
            	"English":"en",
               "Estonian":"et",
			  	"Filipino":"tl",
			  	"Finnish":"fi",
            	"French":"fr",
               "Galician":"gl",
               "Georgian":"ka",
            	"German":"de",
            	"Greek":"el",
				"Haitian Creole":"ht",
				"Hebrew":"iw",
			  	"Hindi":"hi",
               "Hungarian":"hu",
               "Icelandic":"is",
			 	"Indonesian":"id",
			 	"Irish":"ga",
			 	"Italian":"it",
            	"Japanese":"ja",
            	"Korean":"ko",
				"Latvian":"lv",
				"Lithuanian":"lt",
				"Macedonian":"mk",
				"Malay":"ms",
               "Maltese":"mt",
				"Norwegian":"no",
				"Persian":"fa",
				"Polish":"pl",
				"Portuguese":"pt",
				"Romanian":"ro",
				"Russian":"ru",
				"Serbian":"sr",
				"Slovak":"sk",
				"Slovenian":"sl",
				"Spanish":"es",
				"Swahili":"sw",
				"Swedish":"sv",
               "Thai":"th",
               "Turkish":"tr",
				"Ukrainian":"uk",
				"Urdu":"ur",
				"Vietnamese":"vi",
				"Welsh":"cy",
				"Yiddish":"yi"
        };

        thisEngine.load = function(parameter)
        {
            pars = thisEngine.parameters.toSource();

            if(parameter) args = parameter.split(/\s+to\s+/);

            if(parameter && pars.indexOf(args[0]) != -1 && pars.indexOf(args[1]) != -1)
                $('#parameter',doc).html("<span id='para1'>" + args[0] + 
                "</span> to <span id='para2'>" + args[1] + "</span>");
            else 
               $('#parameter',doc).html( 
                "<span id='para1'>Detect language</span> to <span id='para2'>English</span>");

            delete args;delete pars;
        }

        thisEngine.showParameters = function()
        {
			  var $p1 	= $("#parameter #para1",doc);
			  var $p2 	= $("#parameter #para2",doc);

			  tmp = "<table style='-moz-user-select:none;border:0px;font:8pt tahoma'>";

            for(var key in thisEngine.parameters) 
                tmp += "<tr>"  +
                "<td>from</td><td class='parameter'><input  name='from' type='radio' value='" +  key + "' " +
					(key==$p1.text()?"checked":"") + "/>"     +  key  + "</td>" + 
                "<td>to</td><td " + (key=="Detect language"?"":"class='parameter'") + ">" + 
                (key=="Detect language"?"":("<input  name='to' type='radio' value='" +  key + "' " +
					(key==$p2.text()?"checked":"") + "/>"     +  key))  + "</td></tr>";

            tmp += "</table>";

            $("#selector",doc).html(tmp);

            delete tmp;

			$("#selector .parameter",doc).bind("click",parameterChanged);

          function parameterChanged(e)
          {
			  	lastQuery = "";
			  	var v = $(e.target).attr("value") || $(e.target).find("input").attr("value");
				var g = $(e.target).attr("name") || $(e.target).find("input").attr("name");

				$(e.target).find("input").attr("checked","true");
				switch(g)
				{
					case "from":
						$p1.html(v);break;
					case "to":
            			$p2.html(v);break;
				}

				saveSession(thisEngine.name,	$("#parameter",doc).text());
          }
        }
		
        thisEngine.doBeforeLookup = function()
        { 
            thisEngine.url = "http://translate.google.com/#" + 
                thisEngine.parameters[$("#parameter #para1",doc).text()]  +  "|"  + 
                thisEngine.parameters[ $("#parameter #para2",doc).text()] +	 "|"  + 
				 encodeURIComponent(GM_getValue("selectedText",""));
        }

        thisEngine.doAfterLookup = function()
        {
            //$("#result",doc).css("display","block").css("background-color","white");  
        }
		
		thisEngine.renderDomain	=
		{
			"http://translate.google.com/":function()
			{
				GM_addStyle("#gog, #gt-logo {display:none} #source {font:9pt tahoma} ");
			}
		}

   top.wrappedJSObject.multilanglookupbar.assemble = true;
	}
}
//*********************Built-in Engine Block End

if(window == top)
{
    lib = {};
    function assemble(record)
    {
        this.saveSession = saveSession;
        var extra = $("#extra",doc);
        for(var key in top.wrappedJSObject.multilanglookupbar.lib)
        {
            lib[key] = new Engine(top.wrappedJSObject.multilanglookupbar.lib[key],this);
            lib[key].name = key;
			 tmp = eval(GM_getValue("renderDomain"));
			 $.each(lib[key].renderDomain,	function(i, val) {
					 tmp[i] = val;
			 });
			 
			 extra.before("<span class='engine' engine='" + key +"'>" + key + "</span>");
			 GM_setValue("renderDomain",tmp.toSource());
			 delete tmp;
			 delete top.wrappedJSObject.multilanglookupbar.lib[key];
        }

		getEngine(lib[record]?record:
           									 (lib["babylon.com"]?"babylon.com":"I"));
        
        $(".engine",doc).unbind("click").click(getEngine);
    } 

    function getEngine(e)
    {
		lastQuery = "";
		
       $("#info",doc).html("");
       $(sensorElement).attr("selector","none").attr("extraInfo","false");

//		  var r = (typeof record=='string'?record:session.lastSelected);

		name = (typeof e == 'string')?e:this.textContent;

        if(engine &&  engine.name == name
				&& $("#extraInfo",doc).css("display") == "none") 
            return;

        if(lib[name])
        {
			 $("#extraInfo",doc).removeAttr("style");
			 $('.engine',doc).removeAttr("id");	
			 $("#mlevel1 > span[engine=" + name + "]",doc).attr("id","engine");

            saveSession("lastSelected",name);
            engine = lib[name];
            engine.load(session[name]);

			//if(lastQuery  == null) return;
			//lastQuery = "";
			//lookup();
        }

        delete name;
    }
	
    function lookup()
    {
        $("#info",doc).css("display","none");
        $(sensorElement).attr("selector","none").attr("extraInfo","false");

		if(verify() != true) return;
		
		engine.doBeforeLookup();
		engine.lookup();
		engine.doAfterLookup();
    }

    function verify(e)
    {		
	   	if( $("#multilanglookupbar").css("display") == "none") return;
		
        selectedText = $.trim(GM_getValue("selectedText",""));
	
        if(selectedText && selectedText != lastQuery)
        {
            if(engine.restrictedTextLength < selectedText.length)
            {
                $("#info",doc).css("display","block").html("Overlength !").fadeOut(3000);

                return;
            }
            lastQuery = selectedText;
            return true;
        }
		return false;
    }
	
    function saveSession(key,value)
    {
        if(key && value) session[key] = value;
        else if(key && !value && key in session) 
            delete session[key];
	
        GM_setValue("session",session.toSource());
    }
    
    function filter(e)
    {
    	if(e.attrName == "lookup" && e.newValue == "true")
    	{
    		lookup();
    		sensorElement.removeAttribute(e.attrName);
    	}
    	else if(e.attrName == "bar_trigger" && e.newValue=="true")
    		$(barElement).css("min-height","0px").slideToggle(1000, function(){
										$(barElement).css("min-height","15%");
										$(sensorElement).removeAttr("bar_trigger");
    									  });
    	else if(e.attrName == "extrainfo")
    		$("#extraInfo",doc).css("display",e.newValue);
    	else if(e.attrName == "heightctrl" && e.newValue=="true")
    		$(heightCtrlOutterElement).fadeIn(1000);
    	else if(e.attrName == "heightctrl" && e.newValue=="false")
    		$(heightCtrlOutterElement).fadeOut(1000);
    	else 	if(e.attrName == "selector" && e.prevValue != e.newValue)
    			triggerParameters(e.newValue);
    }
    
    function init()
    {
		engine = null;
		lastQuery = null;
		selectedText = null;
		GM_setValue("renderDomain",{}.toSource());

        try
        {
            session = eval(GM_getValue("session","({lastSelected:'babylon.com'})"));
            void session.lastSelected;
        }
        catch(e)
        {
            session = {lastSelected:'babylon.com'};
            GM_setValue("session",session.toSource());
        }

        $("#multilanglookupbar").css("height",GM_getValue("height","20%"));

        $('#extra',doc).click(function(){
        					 $(sensorElement).attr("extraInfo",$(sensorElement).attr("extraInfo")!="block"?"block":"none");
        			    });
        $('#heightCtrl',doc).click(function(){
        					 $(sensorElement).attr("heightCtrl","true");
        				});
        $("#hide",doc).click(function(){
        					 $("#mlevel4",doc).fadeIn(1000);
        					 $("#mlevel1,#mlevel2,#mlevel3",doc).hide(1000);
        					 saveSession("mainCtrl","hide")
        				});
        $("#show",doc).click(function(){
        					 $("#mlevel1,#mlevel2,#mlevel3",doc).show(1000);
        					 $("#mlevel4",doc).fadeOut(1000);
        					 saveSession("mainCtrl","show")
        				});
        $("#close",doc).click(function(){
        					  $(sensorElement).attr("bar_Trigger","true"); 
        			    });

        $('#parameter',doc).click(function(){
        					 $(sensorElement).attr("selector",$(sensorElement).attr("selector")!="block"?"block":"none");
        				});

        if(session.mainCtrl=="hide")
        {
        	$("#mlevel4",doc).css("display","block");
        	$("#mlevel1,#mlevel2,#mlevel3",doc).css("display","none");
        }
        
        sensorElement.addEventListener("DOMAttrModified",filter,false)

         $("#multilanglookupbar_heightCtrl").click(setHeight).mouseout(function(){
         					$(sensorElement).attr("heightCtrl","false");
         				});

        $("#lookup",doc).keyup(function(e){
							if(e.which ==13)
							{
								GM_setValue("selectedText",$(e.target).attr("value"));
								lookup();
							}
						});

       assemble(session.lastSelected);

        $("#extraInfo .homepage",doc).click(function(){
        						GM_openInTab(this.innerHTML);
        				});

        top.wrappedJSObject.multilanglookupbar.watch("assemble",
			function(id,oldValue,newValue)
			{
				if(newValue == true) assemble();
				return false;
			});
		
        delete init;
    }
    
	function setHeight(e)
	{
        $('#multilanglookupbar').css('height',  (window.innerHeight-e.clientY)+ "px");
		GM_setValue("height",$('#multilanglookupbar').css('height'));
	}

  function triggerParameters(flag)
  {
      lastQuery = "";
      
	  if(flag=="block")
	  {
		  $('#parameter',doc).css("color","#cc0066");
		  $("#selector",doc).show(1000).html("");
		  engine.showParameters();
	  }else
	  {
		  $('#parameter',doc).css("color","");
		  $("#selector",doc).fadeOut(1000);
	  }
  } 
  
  function Engine(init,context)
  {
      this.url = null;
      this.restrictedTextLength = 100;
	   this.renderDomain = {};
      
      //This method is invoked once engine is selected.
      this.load = function(parameter)
      {
		  var $p = $('#parameter',doc); 
          if(!this.parameters)
              $p.html("");
          else if(parameter && this.parameters.toSource().indexOf(parameter) != -1)
              $p.html(parameter);
          else 
              for(var key in this.parameters)
          {
              $p.html(key.match(/^\d+$/)?this.parameters[key]:key);
              break;
          }
          
          saveSession(this.name,$p.text());
      };
      
      this.showParameters = function()
      {
		   var $p = $("#parameter",doc);
		   var $ps = $("#selector",doc);
          for(var key in this.parameters)
          {
			  var k = (key.match(/^\d+$/)?this.parameters[key]:key);
			  $ps.append(
				  	"<div  class='parameter'><input type='radio' value='" +  k + "' " +
				(k==$p.text()?"checked":"") + "/>"     +  k + "</div>");
		  }
          
		  $("#selector .parameter",doc).bind("click",parameterChanged);
          
          function parameterChanged(e)
          {
			  	  lastQuery = "";
			  	var v = $(e.target).attr("value") || $(e.target).find("input").attr("value");
				  $("#selector input[value!=" + v + "]",doc).removeAttr("checked");
				  $(e.target).find("input").attr("checked","true");
				  $p.text(v);
                saveSession(engine.name,v);
          }
          
      };
	  
	  this.doBeforeLookup = function() {};
	  this.lookup = function()
	  {
	 	  try{
			  $('#result',doc).attr('src',engine.url);
		  }catch(e){$("#info",doc).html(e);}
	  };
	  this.doAfterLookup = function() {};
	  
      init(this,context);
  }
    
    //This method inject HTML code into Bar.
    function injectHTML(e)
    {
        doc =  barElement.contentDocument;

        doc.body.innerHTML = 	
            "<style type='text/css'>" + 
            ".rounded					{-moz-border-radius:5px;-webkit-border-radius:5px}"+
            ".overflow					{overflow-x:hidden;overflow-y:auto}" 		+
 //           ".cursor						{cursor:pointer;-moz-user-select:none}"	+
			 ".engine,#extra" +
			 									"{font:7pt tahoma;margin:0px 0px;padding:0px 5px 0px 0px}" +
			 "#mlevel1 >span:hover			{color:#00cc66}"+
			 "#engine					{color:#ccff00}"	+
			 "#extra						{color:red;padding:0px 5px 0px 2px}"+
			 "#heightCtrl				{color:#ff0066}" +
			 "#heightCtrl:hover	{color:#ff9999}" +
			 "#hide						{color:#00ffff}"	+
			 "#hide:hover				{color:#99ffff}"	+
			 "#close						{color:#66cc00}"+
			 "#close:hover			{color:#99ff99}"	+
			 "#heightCtrl,#hide,#close" +
			 									"{padding:0px 5px 0px 2px}" 	+
			 "#mlevel2					{text-align:center}"	+
			 "#parameter				{padding:0px 5px 0px 0px}"	+
            "#parameter:hover	{color:#cc0066}" 		+
            "#info							{display:none;position:fixed;bottom:70%;left:48%;z-index:5;opacity:0.8;" + 
            												"border:2px red solid;color:white;background-color:black;font-weight:bold;" +
    														"padding:0px 10px 0px 10px;text-align:center}"	+
			"#result,#extraInfo   {position:fixed;top:1px;width:100%;height:99%;margin:0px 0px;border:0px}"+
			"#result						{background-color:white}" 		+
			"#extraInfo					{display:none;z-index:6666}"	+
			"#mainCtrl					{position:fixed;z-index:7777;background-color:black !important;color:white;" +
													"top:10px;right:20px;opacity:0.8;padding:3px 5px !important}"+
			"#lookup					{float:right;width:60%;text-indent:2px;cursor:text;font:9pt tahoma}"	+
			"#selector					{position:fixed;top:30px;right:35%;width:30%;max-height:60%;background-color:black;" +
			 		"opacity:0.8;display:none;z-index:7776;overflow-x:hidden;overflow-y:auto}" +
           "#selector [class='engine']:hover   			{color:#99ff99}"  	+
           "#selector [class='parameter']:hover		{color:ff5555}" 			+
			"div[class='homepage']:hover	{text-decoration:underline}" 	+
           '.homepage				{margin:5px;font:bold 8pt tahoma;color:black}'	+
           "body							{margin:0px;border:0px;color:white;background-color:black}"+
           "#engine,#selector, #parameter,.parameter,#extra "  			+
												"{font-size:xx-small;font-family:tahoma}" 	+
           "#info,#engine,.engine, #extra, #heightCtrl, #hide,#show, #close,parameter, #parameter, .homepage" +
												"{cursor:pointer;-moz-user-select:none}" 		+
           "</style>" +
           "<style id='userStyle' type='text/css'></style>"			+
           "<iframe id='result' class='overflow'></iframe>"		+
           "<div id='mainCtrl' class='rounded'>"							+
					"<div id='mlevel1'>" 					+
						"<span id='info' class='rounded'></span>" 	+
						"<span id='extra'>I</span>"	+
					"</div>" +
					"<div id='mlevel2'>" +
						"<span id='parameter'></span>" +
					"</div>" +
					"<div id='mlevel3'>" +
						"<span id='heightCtrl'>&#11021;</span>" +
						"<span id='hide'>&#9748;</span>"		+
						"<span id='close'>&#9851;</span>"	+
						"<input id='lookup'></input>"		+
					"</div>" +
					"<div id='mlevel4' style='display:none;text-align:right'>" +
						"<span id='show'>&#9786;</span>" +
					"</div>" +					
            "</div>" +
			 "<div id='extraInfo' class='overflow'>" +
					'<div style="background-color:#99cc00;border:2px solid #339900;width:auto;margin:5px 0px 5px 5px">' +
						'<div class="homepage">http://userscripts.org/scripts/show/9671</div>' + 
						'<div class="homepage">http://userscripts.org/tags/multilanglookupbar</div>' +
						'<embed src="http://www.box.net/static/flash/box_explorer.swf?widgetHash=ba68knpelo&cl=0"' + 
						' width="460" height="345" wmode="transparent" type="application/x-shockwave-flash"/>' +
					'</div>'  +
			 "</div>"+
			 "<div id='selector' class='rounded'></div>";
            
        init();
        
        delete injectHTML;
    }
    
    //Create a iframe and add it to the top window.
    function createBar()
    {
        with(barElement  = document.createElement("iframe"))
        {
            setAttribute("id","multilanglookupbar");
            setAttribute("style",
            "display:none;position:fixed;margin:0px;border:0px;overflow:hidden;z-index:9999999;" +
                "height:20%;min-height:15%;max-height:100%;width:100%;left:0px;bottom:0px"); 
	        addEventListener("load",injectHTML,false);
        }
        
        with(sensorElement  = document.createElement("div"))
        {
            setAttribute("id","multilanglookupbar_sensor");
            setAttribute("style","display:none"); 
        }

        with(heightCtrlOutterElement  = document.createElement("div"))
        {
            setAttribute("id","multilanglookupbar_heightCtrl");
            setAttribute("style",
            "display:none;position:fixed;margin:0px;border:3px solid red;overflow:hidden;z-index:99999999;" +
            			 "top:-3px;opacity:0.5;background-color:black;height:100%;width:200px;right:40%"); 
        }
        
        document.documentElement.appendChild(barElement);
        document.documentElement.appendChild(sensorElement);
        document.documentElement.appendChild(heightCtrlOutterElement);

        delete createBar;
    }

    createBar();
 }
}