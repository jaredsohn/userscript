// ==UserScript==
// @name           EW Login
// @version        2.1
// @namespace      http://epicwar.baba0rum.com/
// @description    Connexion aux serveurs d'Epic War
// @include        http://*.epic-war.net/index/index.php
// @require        http://www.baba0rum.com/lib/babadom2.js
// ==/UserScript==

ewl = {
	
	/**********************************************************
	 * PREFERENCES
	 **********************************************************/
	prefs : {
		server: {
			/* Exemples:
			   serveur1 : { login1 : "pass1", login2 : "pass2", login3 : pass3 },
			   serveur2 : { login4 : "pass4", login5 : "pass5", login6 : pass6 },
			   serveur3 : { login7 : "pass7", login8 : "pass8", login9 : pass9 }
			*/
		}
	},
	// --------- FIN DES PREFERENCES ---------
	
	load : function()
	{
		if (dom.name("logon").length > 0 
		    && dom.name("user").length > 0 
		    && dom.name("pwd").length > 0 
		    && dom.name("uni").length > 0)
		{
			var a = [], servers = utils.keys(ewl.prefs.server);
			for(var s = 0; s < servers.length; s++)
				a.push(servers[s] + " (" + (s+1) + ")");
			var nserver = prompt("Serveur ?\n" + a.join(", "));
			if(nserver == 0)
			{
				var a = [];
				for(var server in ewl.prefs.server)
				{
					a.push("Serveur " + server.charAt(0).toUpperCase() + server.substr(1));
					for(var login in ewl.prefs.server[server])
						a.push("\t- " + login);
				}
				alert(a.join("\n"));
			}
			else if(typeof ewl.prefs.server[servers[nserver-1]] != "undefined")
			{
				dom.name("uni", 0).selectedIndex = (nserver-1);
				var server = ewl.prefs.server[servers[nserver-1]];
				var logins = utils.keys(server);
				var login, pass;
				if(logins.length > 1)
				{
					var b = [];
					for(var l = 0; l < logins.length; l++)
						b.push(logins[l] + " (" + (l+1) + ")");
					var nlogin = prompt("Personnage ?\n" + b.join(", "));
					if(typeof logins[nlogin-1] != "undefined")
					{
						login = logins[nlogin-1];
						pass = server[logins[nlogin-1]];
					}
					else
					{
						GM_log("Wrong character choice");
						return false;
					}
				}
				else if(logins.length == 1)
				{
					login = logins[0];
					pass = server[login];
				}
				if(login != "undefined" && login != "")
					dom.name("user", 0).value = login;
				if(pass != "undefined" && pass != "")
					dom.name("pwd", 0).value = pass;
				setTimeout("void(0)", 1000);
				if(typeof dom.name("logon", 0).elements[3] != "undefined")
					var button = dom.name("logon", 0).elements[3];
				else
				{
					for(var ninput = 0, input ; input = dom.tag(document, "input", ninput) ; ninput++)
					{
						if(dom.att(input, "type") == "image" && dom.att(input, "value") == "Connecter")
						{
							var button = input;
							break;
						}
					}
				}
				button.click();
			}
			else
			{
				GM_log("Wrong server choice");
				return false;
			}
		}
		else
		{
			GM_log("No login formulary on this page");
			return false;
		}
	}
};

ewl.load();

//.user.js
