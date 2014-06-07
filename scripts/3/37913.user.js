// ==UserScript==
// @name           JvCiter
// @namespace       
// @description    Ajoute la fonction "citer" aux forums de jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @author         Mega
// @date           01/01/09 - 19/10/10
// ==/UserScript==

$ = unsafeWindow.jQuery;

var Global = {
	mode: function(type) {
		switch (type) {
			case "i" : return parseInt(location.href.toString().split("/")[4].split("-")[0]); break;
			default  : return location.href.toString().split("/")[4].split("-")[0]; break;
		}
	},
	repondre: function() {
		return self.location.href.toString().replace(/(http:\/\/www.jeuxvideo.com\/forums\/)1(\-[^"]+)/, "$1" + "3" + "$2") + "#form_post";
	},
	formulaire: "newmessage"
}

var Image = { /* ----- Les url des boutons et images ----- */
	citer:			"http://www.noelshack.com/uploads/citer052028.gif",
	windowMin: 		"http://oslo.addworks.fr/mega/jvm/img/window-min.png",
	windowMax: 		"http://oslo.addworks.fr/mega/jvm/img/window-max.png",
	windowClose:  	"http://oslo.addworks.fr/mega/jvm/img/window-close.png",
	citerPlus: 		"http://s2.noelshack.com/uploads/images/1888925288580_add.png",
	citerMoins: 	"http://s2.noelshack.com/uploads/images/7241019215661_remove.png"
}

var Creation = {
	a: function(id, className, href, html, title, target) {
		var obj = document.createElement("a");
		if (id && id != null) obj.id = id;
		if (className && className != null) obj.className = className;
		if (href && href != null) obj.href = href;
		if (html && html != null) obj.innerHTML = html;
		if (title && title != null) obj.title = title;
		if (target && target != null) obj.target = target;
		return $(obj);
	},
	img: function(id, className, src, alt, title) {
		var obj = document.createElement("img");
		if (id && id != null) obj.id = id;
		if (className && className != null) obj.className = className;
		if (src && src != null) obj.src = src;
		if (alt && alt != null) obj.alt = alt;
		if (title && title != null) obj.title = title;
		return $(obj);
	},
	get: function(elm, id, className, title) {
		var obj = document.createElement(elm);
		if (id && id != null) obj.id = id;
		if (className && className != null) obj.className = className;
		if (title && title != null) obj.title = title;
		return $(obj);
	},
	css: function(type, href, rel) {
		var obj = document.createElement("link");
			obj.type = type;
			obj.href = href;
			obj.rel = rel;
		return $(obj);
	},
	script: function(type, src) {
		var obj = document.createElement("script");
			obj.type = type;
			obj.src = src;
			obj.async = false;
		document.getElementsByTagName("head")[0].appendChild(obj);
		return $(obj);
	}
}

var GM = {
	setArray: function(name, array) {
		setTimeout(function() {GM_setValue(name, uneval(array));}, 0);
	},
	getArray: function(name, defaut) {
		return eval(GM_getValue(name, defaut));
	},
	del: function(name) {
		setTimeout(function() {GM_deleteValue(name);}, 0);
	}
}

var M = function(o, t) {
	if (!t) t = "i";
	
	var pseudo = (t == "i") ? $(".d_pseudo", o).text() : $(".d_pseudo", o);
	var date = $(".d_date", o).text().split("\n")[1];
	var post = (t == "i") ? $.trim($(".d_post", o).html()) : $(".d_post", o);
	var ancre = (t == "i") ? self.location.href.split("#")[0].split("?")[0].replace("/3-", "/1-") + "#" + o.id : $(".d_ancre", o);
	var set = function() {
		$("#" + o.id).data("date", $(".d_date", o).text().split("\n")[1]);
		$("#" + o.id).data("post", $.trim($(".d_post", o).html()));
	}
	var get = function(name) {
		return $("#" + o.id).data(name);
	}
	
	return {pseudo: pseudo, date: date, post: post, ancre: ancre, set: set, get: get}
}

var Citer = {
	selection: new Array(),
	restore: function() {
		this.selection = GM.getArray("Citer.selection", "[]");
		this.window();
		if (this.selection.length > 0) {
			for (var i = 0; i < this.selection.length; i++) this.toMessage(this.selection[i][0], "Posté " + this.selection[i][1], this.selection[i][2], this.selection[i][4]);
		}
	},
	toString: function(html) {
		html = html.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 ");
		html = html.replace(/<a href="([^"]+)">[^"]+<\/a>/g, "$1");
		html = html.replace(/<a href="([^"]+)" target="[^"]+">[^"]+<\/a>/g, "$1");
		html = html.replace(/<a href="([^"]+)" target="[^"]+" rel="[^"]+">[^"]+<\/a>/g, "$1");
		html = html.replace(/<br>/g, "\n");
		html = html.replace(/\n{2}/g, "\n");
		html = html.replace(/&gt;/g, ">");
		html = html.replace(/&lt;/g, "<");
		return $.trim(html);
	},
	getData: function(obj) {
		// On récupère les données
		var pseudo = M(obj).pseudo;
		var date = "le " + M(obj).get("date");
		var post = M(obj).get("post");
		var ancre = M(obj).ancre;
		// On met dans le tableau de sélection
		if (!new RegExp(ancre).test(this.selection)) {
			this.selection.push(new Array(pseudo, date, post, ancre, "jvf"));
			GM.setArray("Citer.selection", this.selection);
			return { nouveau: true, pseudo: pseudo, date: date, post: post };
		} else return { nouveau: false };
	},
	toMessage: function(pseudo, date, post, style) {
		var liPseudo = Creation.get("li", null, "c_pseudo").text(pseudo);
		if (Global.mode("i") == 3) {
			Creation.img(null, "com_cit", Image.citerPlus, "Intégrer cette citation", "Intégrer cette citation").click(function() {
				var index;
				var find = $(this).parent().parent().html();
				$("#windowContent ul").each(function(i) {if ($(this).html() == find) index = i;});
				if ($("#windowContent ul").length > 1) {
					$(this).parent().parent().effect("transfer", {to: $("#" + Global.formulaire)}, 500, function() {
						Citer.write(index);
						this.parentNode.removeChild(this);
						$("#windowContent ul").css("margin-bottom", "8px");
						$("#windowContent ul:last").css("margin-bottom", "0px");
						Citer.selection.splice(index, 1);
						$("#nb_cit").text((Citer.selection.length > 1) ? Citer.selection.length + " messages cités" : "Un seul message cité");
						GM.setArray("Citer.selection", Citer.selection);
					}).hide();
				} else {
					$("#window").effect("transfer", {to: $("#" + Global.formulaire)}, 500, function() {
						Citer.write(0);
						Citer.selection = new Array();
						GM.del("Citer.selection");
						$("#windowContent").empty();
					}).css("display", "none");
				}	
			}).appendTo(liPseudo);
		}
		Creation.img(null, "com_cit", Image.citerMoins, "Supprimer cette citation", "Supprimer cette citation").click(function() {
			var index;
			var find = $(this).parent().parent().html();
			$("#windowContent ul").each(function(i) {if ($(this).html() == find) index = i;});
			if ($("#windowContent ul").length > 1) {
				$(this).parent().parent().slideUp("normal", function() {
					this.parentNode.removeChild(this);
					$("#windowContent ul").css("margin-bottom", "8px");
					$("#windowContent ul:last").css("margin-bottom", "0px");
					Citer.selection.splice(index, 1);
					$("#nb_cit").text((Citer.selection.length > 1) ? Citer.selection.length + " messages cités" : "Un seul message cité");
					GM.setArray("Citer.selection", Citer.selection);
				});
			} else {
				$("#window").hide("normal", function() {
					$("#windowContent").empty();
					Citer.selection = new Array();
					GM.del("Citer.selection");
				});
			}
		}).appendTo(liPseudo);
		var liDate = Creation.get("li", null, "c_date").text(date);
		var liPost = Creation.get("li", null, "c_post").html(post);
		var liStyle = Creation.get("li", null, "c_style");
		Creation.get("span").addClass("c_s_jvf").addClass(style == "jvf" ? "c_s_me" : "c_s_not").text("JVF").click(function() {
			if ($(this).hasClass("c_s_not")) {
				var index;
				var find = $(this).parent().parent().html();
				$("#windowContent ul").each(function(i) {if ($(this).html() == find) index = i;});
				Citer.selection[index][4] = "jvf";
				GM.setArray("Citer.selection", Citer.selection);
				$(this).toggleClass("c_s_me");
				$(this.nextSibling).toggleClass("c_s_me");
				$(this).toggleClass("c_s_not");
				$(this.nextSibling).toggleClass("c_s_not");
				this.blur();
			}
		}).appendTo(liStyle);
		Creation.get("span").addClass("c_s_jvm").addClass(style == "jvm" ? "c_s_me" : "c_s_not").text("JVM").click(function() {
			if ($(this).hasClass("c_s_not")) {
				var index;
				var find = $(this).parent().parent().html();
				$("#windowContent ul").each(function(i) {if ($(this).html() == find) index = i;});
				Citer.selection[index][4] = "jvm";
				GM.setArray("Citer.selection", Citer.selection);
				$(this).toggleClass("c_s_me");
				$(this.previousSibling).toggleClass("c_s_me");
				$(this).toggleClass("c_s_not");
				$(this.previousSibling).toggleClass("c_s_not");
				this.blur();
			}
		}).appendTo(liStyle);
		Creation.get("ul").append(liPseudo).append(liDate).append(liPost).append(liStyle).appendTo("#windowContent");
		$("#windowContent ul").css("margin-bottom", "8px");
		$("#windowContent ul:last").css("margin-bottom", "0px");
	},
	write: function(i) {
		var formulaire = document.getElementById(Global.formulaire);
		switch (this.selection[i][4]) {
			case "jvf":
				formulaire.value += "| " + this.selection[i][3] + "\n";
				formulaire.value += "| Citation de : " + this.selection[i][0] + "\n";
				formulaire.value += "| Date du message : " + this.selection[i][1] + "\n";
				formulaire.value += "| Contenu du message :\n| " + this.toString(this.selection[i][2]).replace(/\n/g, "\n| ") + "\n\n+> \n\n";
			break;
			case "jvm":
				formulaire.value += "¦ " + this.selection[i][0] + " a écrit " + this.selection[i][1] + "....\n";
				formulaire.value += "¦ •\n";
				formulaire.value += "¦ " + this.toString(this.selection[i][2]).replace(/\n/g, "\n¦ ") + "\n";
				formulaire.value += "¦ •\n";
				formulaire.value += "¦ " + this.selection[i][3] + "\n\n+> \n\n";
			break;
		}
	},
	button: function(obj) {
		var img = Creation.img(null, "b_citer", Image.citer, "Citer", "Citer");
		var a = Creation.get("a").css({cursor: "pointer", marginRight: "4px"}).append(img).click(function() {
			var maCitation = Citer.getData(obj);
			if (maCitation.nouveau) {
				if ($("#window").css("display") == "block") {
					$(this).effect("transfer", {to: $("#window")}, 500, function() {
						Citer.toMessage(maCitation.pseudo, "Posté " + maCitation.date, maCitation.post, "jvf");
					});
					this.blur();
				} else {
					Citer.toMessage(maCitation.pseudo, "Posté " + maCitation.date, maCitation.post, "jvf");
					if ($("#windowOpen").css("display") == "none") {
						$("#windowOpen").css("display", "block").css("visibility", "hidden");
						$(this).effect("transfer", {to: $("#windowOpen")}, 500, function() {
							$("#windowOpen").css("visibility", "visible");
						});
						this.blur();
					} else {
						$("#windowOpen").effect("highlight", "fast");
					}
				}
				$("#nb_cit").text((Citer.selection.length > 1) ? Citer.selection.length + " messages cités" : "Un seul message cité");
			}
		});
		$(".pseudo", obj).append(a);
	},
	window: function() {
		var imgWclose = Creation.img("windowClose", null, Image.windowClose, "Fermer", "Fermer");
		var divWt = Creation.get("div", "windowTop").append(Creation.get("div", "titre_citer").append(Creation.img(null, null, Image.citer))).append("Liste des citations").append(imgWclose);
		var divWc = Creation.get("div", "windowContent");
		var tr = Creation.get("tr");
		if (Global.mode("i") == 1) tr.append(Creation.get("td").css({textAlign: "left", width: "65px"}).append(Creation.a("cit_rep", null, null, "Répondre", "Répondre")).append(" |"));
		if (Global.mode("i") == 3) tr.append(Creation.get("td").css({textAlign: "left", width: "88px"}).append(Creation.a("cit_int", null, null, "Tout intégrer", "Tout intégrer")).append(" |"));
		tr.append(Creation.get("td").css("text-align", "left").append(Creation.a("cit_sup", null, null, "Tout supprimer", "Tout supprimer")));
		tr.append(Creation.get("td").css("text-align", "right").append(Creation.get("span", "nb_cit").text(Citer.selection.length > 0 ? (Citer.selection.length > 1 ? Citer.selection.length + " messages cités" : "Un seul message cité") : "")));
		var divWb = Creation.get("div", "windowBottom").append(Creation.get("table").css("width", "100%").append(tr));
		Creation.get("div", "window").append(divWt).append(divWc).append(divWb).appendTo($("body"));
		Creation.get("div", "windowOpen", null, "Ouvrir la liste des citations").css("display", (this.selection.length == 0) ? "none" : "block").append(Creation.img(null, null, Image.citer)).appendTo($("body"));
		
		$("#window").bind("mouseover", function() {
			$(this).draggable({
				opacity: 0.8,
				handle: $("#windowTop"),
				containment: "document"
			});
			$(this).die("mouseover");
		});
		$("#windowOpen").bind("click", function() {
			$("#window").css("display", "block").css("visibility", "hidden");
			$(this).effect("transfer", {to: $("#window")}, 500, function() {$("#window").css("visibility", "visible");}).css("display", "none");
			this.blur();
			return false;
		});
		$("#windowClose").bind("click", function() {
			$("#windowOpen").css("display", "block").css("visibility", "hidden");
			$('#window').effect("transfer", {to: $("#windowOpen")}, 500, function() {$("#windowOpen").css("visibility", "visible");}).css("display", "none");
		});
		$("#cit_rep").click(function() {
			window.location.href = Global.repondre();
		});
		$("#cit_int").click(function() {
			$("#window").effect("transfer", {to: $("#" + Global.formulaire)}, 500, function() {
				for (var i = 0; i < Citer.selection.length; i++) Citer.write(i);
				$("#windowContent").empty();
				Citer.selection = new Array();
				GM.del("Citer.selection");
			}).css("display", "none");
		});
		$("#cit_sup").click(function() {
			$("#window").hide("normal", function() {
				$("#windowContent").empty();
				Citer.selection = new Array();
				GM.del("Citer.selection");
			});
		});
	},
	main: function() {
		this.restore();
		$('div[id^="message_"]', '#col1').each(function() {
			Citer.button(this);
		});
	}
}

function MessParam() {
	$(".pseudo > strong").addClass("d_pseudo");
	$(".pseudo > a").css("margin-right", "1px").addClass("b_cdv");
	$(".date").addClass("d_date");
	$(".date > a").addClass("b_alerte");
	$(".post").addClass("d_post");
	$(".ancre").addClass("d_ancre");
	$('div[id^="message_"]', '#col1').each(function() {M(this).set();});
}

function ExternFiles() {
	$("head").append(Creation.css("text/css", "http://oslo.addworks.fr/mega/jvm/css/jvm.css", "stylesheet")); // Css
	$("head").append(Creation.script("text/javascript", "http://oslo.addworks.fr/mega/jvm/js/jquery-ui-1.8.5.custom.min.js")); // Js
}

function main() {
	// Les scripts externes
	ExternFiles();
	// Paramétrage des données
	MessParam();
	// Les fonctions
	Citer.main(); // Citer
	// On vide le champs en mode 3
	if (Global.mode("i") == 3) $("#newmessage").empty().focus();
}

main();
