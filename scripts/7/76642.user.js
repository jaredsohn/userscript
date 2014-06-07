// ==UserScript==
// @name           NewCdvGlobale
// @namespace       
// @description    CdvGlobale pour les nouvelles cdv de jvc
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/CdvGlobale
// @include        http://www.jeuxvideo.com/profil/*.html
// @include        http://94.23.24.151/*
// ==/UserScript==

String.prototype.equals = function(str) {
	return this.toLowerCase() == str.toLowerCase();
}

String.prototype.formatPost = function() {
	var num = "";
	var cpt = 0;
	for (var u = this.length - 1; u >= 0; u--) {
		cpt++;
		if (cpt == 4) {
			num = "." + num;
			cpt = 1;
		}
		num = this[u] + num;
	}
	return num;
}

Array.prototype._sort = function() {
	var stop = false;
	while (!stop) {
		stop = true;
		for (var i = 1; i < this.length; i++) {
			if (this[i].toString().toLowerCase() < this[i - 1].toString().toLowerCase()) {
				var temp = new Array();
				temp[0] = this[i - 1];
				this[i - 1] = this[i];
				this[i] = temp[0];
				stop = false;
			}
		}
	}
}

Array.prototype._doublon = function(sorted) {
	var temp = new Array(this[0]);
	for (var i = 1; i < this.length; i++) {
		var nb = 0;
		for (var u = 0; u < temp.length; u++) {
			if (this[i].toString().toLowerCase() == temp[u].toString().toLowerCase()) nb++;
		}
		if (nb == 0) temp.push(this[i]);
	}
	if (sorted && sorted == true) temp._sort();
	return temp;
}

RegExp.prototype._test = function(str) {
	return new RegExp(
		this.source
			.replace(/([\\\.\$\[\]\(\)\{\}\^\?\*\+\-])/g, "\\$1")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;")
			.replace(/&/g, "&amp;"),
			"i"
	).test(str);
}

$ = unsafeWindow.jQuery;

var Global = {
	section: function() {
		if (location.href.toString().match(/^http:\/\/www\.jeuxvideo\.com\/forums\//)) return "forums";
		if (location.href.toString().match(/^http:\/\/www\.jeuxvideo\.com\/profil\//)) return "profil";
		return 0;
	},
	mode: function(type) {
		switch (type) {
			case "i" : return parseInt(location.href.toString().split("/")[4].split("-")[0]); break;
			default  : return location.href.toString().split("/")[4].split("-")[0]; break;
		}
	}
}

var Image = {
	cdvPlus: 		"http://www.noelshack.com/up/aac/add-d449773483.png",
	cdvMoins: 		"http://www.noelshack.com/up/aac/remove-5b2d504044.png"
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
	}
}

var GM = {
	set: function(name, value) {
		setTimeout(function() {GM_setValue(name, value);}, 0);
	},
	get: function(name, defaut) {
		return GM_getValue(name, defaut);
	},
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

var CdvGlobale = {
	selection: new Array(),
	list: function() {
		$("#listeCdv").empty();
		var arr = $.trim(this.selection[3]).split(" ");
		for (var i = 0; i < arr.length; i++) {
			Creation.get("div").css({margin: "0px", padding: "0px 2px"})
				.mouseover(function() {
					$(this).css("background", "#BDDFEF");
					$("img:eq(1)", this).show();
				})
				.mouseout(function() {
					$(this).css("background", "");
					$("img:eq(1)", this).hide();
				})
				.append(Creation.img(null, null, "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif").css("margin", "0px 8px -3px 4px"))
				.append(Creation.a(null, null, "http://www.jeuxvideo.com/profil/" + arr[i] + ".html", arr[i], "Voir le profil de " + arr[i], "profil").css({fontWeight: "bold", display: "inline"}))
				.append(Creation.img("S" + i, null, "http://www.noelshack.com/voir/130309/edit-Copie025810.png", "S", "Supprimer cette cdv")
					.css({marginRight: "5px", marginTop: "-12px", cursor: "pointer", background: "#036", display: "none"})
					.attr("align", "right")
					.click(function() {
						var temp = $.trim(CdvGlobale.selection[3]).split(" ");
						if (temp.length > 2) {
							temp.splice(this.id.substr(1), 1);
							CdvGlobale.selection[3] = " " + temp.join(" ") + " ";
							GM.setArray("CdvGlobale.selection", CdvGlobale.selection);
							CdvGlobale.list();
						} else {
							if (!confirm("Il faut deux pseudos minimum pour la cdv globale.\nTout supprimer ?")) return 0;
							CdvGlobale.selection = new Array();
							GM.del("CdvGlobale.selection");
							CdvGlobale.page();
						}
					}))
				.appendTo($("#listeCdv"));
		}
		$("#nbCdvAssociees").text(arr.length);
	},
	page: function() {
		/* Initialisation */ {
		var obj = $("#col1").empty();
		var obj2 = $("#col2").empty().css({lineHeight: 1.2, marginTop: "5px"});
		$("#banner").hide();
		$("#pub_carre1").hide();
		$("#pub_carre2").hide();
		}
		
		/* En-tête de la page */ {
		var divHaut = Creation.get("div").css({border: "1px solid", marginTop: "5px"});
		Creation.get("div").css({textAlign: "center", background: "#999"})
			.append(Creation.get("b").css({fontSize: "20px", fontFamily: "Lucida", color: "#FFF"}).text("Module de carte de visite globale"))
			.appendTo(divHaut);
		var div = Creation.get("div").css({textAlign: "center", padding: "3px 0px", background: "#EFF4FC"})
			.append(Creation.get("span").css({fontSize: "16px", fontFamily: "Times New Roman"}).text("Rassemblez vos cdv pour avoir un compteur général"))
			.appendTo(divHaut);
		obj.append(divHaut);
		}
		
		/* Gestion de ma cdv */ if (this.selection.length > 0) {
		var divGDMC = Creation.get("div", "divGDMC");
		Creation.get("div").css({paddingLeft: "10px", marginTop: "20px", background: "url(http://image.jeuxvideo.com/css_img/defaut/bloc1_h3.png) right top"})
			.append(Creation.get("b").css({color: "#FFF", fontSize: "17px", fontVariant: "small-caps"}).text("Gestion de ma cdv"))
			.appendTo(divGDMC);
		var divG = Creation.get("div").css({border: "1px solid #BDDFEF", padding: "10px", background: "#F8FAFC"});
			divG.append(Creation.get("b").css({fontSize: "1.1em", color: "#036", marginBottom: "-8px", display: "block"}).text("Ma configuration"))
				.append(Creation.get("br"))
				.append(Creation.get("b").css({color: "#C00", fontFamily: "Arial", fontSize: "0.9em", marginRight: "17px"}).text("Nom :"))
				.append(Creation.get("input", "m_nomCdvGlobale").attr({type: "text", maxLength: "20"}).css({width: "190px", fontSize: "12px", marginRight: "30px"}).val(CdvGlobale.selection[0]))
				.append(Creation.get("b").css({color: "#C00", fontFamily: "Arial", fontSize: "0.9em", marginRight: "17px"}).text("Sexe :"))
				.append(Creation.get("label").css("font-size", "12px").text("M"))
				.append(Creation.get("input", "m_sexeM").attr({type: "radio", checked: CdvGlobale.selection[1]}).css("margin-right", "10px").click(function() {
					$("#m_sexeF").attr("checked", false);
				}))
				.append(Creation.get("label").css("font-size", "12px").text("F"))
				.append(Creation.get("input", "m_sexeF").attr({type: "radio", checked: !CdvGlobale.selection[1]}).css("margin-right", "30px").click(function() {
					$("#m_sexeM").attr("checked", false);
				}))
				.append(Creation.img(null, null, "http://www.noelshack.com/voir/130309/btn071821.png", "Modifier").css({cursor: "pointer", marginBottom: "-3px"}).click(function() {
					var nom = $("#m_nomCdvGlobale").val().replace(/^\s+|\s+$/g, "");
					if (nom == "") {
						alert("Entrez un nom pour la cdv globale.");
						return 0;
					}
					CdvGlobale.selection[0] = $("#m_nomCdvGlobale").val();
					CdvGlobale.selection[1] = $("#m_sexeM").attr("checked");
					GM.setArray("CdvGlobale.selection", CdvGlobale.selection);
					alert("Modifications enregistrées.");
				}))
				.append(Creation.get("br"))
				.append(Creation.get("br"))
				.append(Creation.get("input", "entete").attr({type: "checkbox", checked: CdvGlobale.selection[2]}).css("margin-right", "5px").click(function() {
					CdvGlobale.selection[2] = $(this).attr("checked");
					GM.setArray("CdvGlobale.selection", CdvGlobale.selection);
				}))
				.append(Creation.get("b").css("font-family", "Arial").text("Ne pas afficher cette partie."))
				.append(Creation.get("br"))
				.append(Creation.get("br"))
				.append(Creation.get("b").css({display: "block", fontSize: "1.1em", color: "#036", marginBottom: "-5px"}).text("Ajouter des cdv supplémentaires"))
				.append(Creation.get("br"))
				.append(Creation.get("textarea", "a_listeCdv").css({height: "80px", fontSize: "12px", marginLeft: "-2px"}))
				.append(Creation.img(null, null, "http://www.noelshack.com/voir/130309/btn_ajouter000387.png", "Ajouter").css({cursor: "pointer", margin: "4px"}).click(function() {
					var liste = $("#a_listeCdv").val().replace(/^\s+|\s+$/g, "");
					if (liste == "") return 0;
					$("#loadstate").text("0%");
					$("#load").show();
					var tmp = liste.replace(/\s+/g, " ").split(" ");
					var arr = $.grep(tmp, function(elm, i) {
						var bool = true;
						if (elm.length < 3 || elm.length > 15) bool = false;
						$.ajax({
							type: "get",
							url : "http://www.jeuxvideo.com/profil/" + elm + ".html",
							async: false,
							success: function(data) {
								if ($(".banni", data).is("p") && $(".banni", data).text() == "Ce pseudo n'existe pas.") bool = false;
							}
						});
						$("#loadstate").text(parseInt(100 / tmp.length * i) + "%");
						return bool;
					});
					var yet = $.trim(CdvGlobale.selection[3]).split(" ");
					arr = $.merge(yet, arr)._doublon(true);
					CdvGlobale.selection[3] = " " + arr.join(" ") + " ";
					GM.setArray("CdvGlobale.selection", CdvGlobale.selection);
					$("#load").hide();
					$("#a_listeCdv").val("");
					CdvGlobale.list();
				}))
				.append(Creation.get("br"))
				.append(Creation.get("br"));
		var divB = Creation.get("div").css({borderTop: "1px dotted rgb(153,153,153)", borderBottom: "1px dotted rgb(153,153,153)", padding: "10px 0px", marginBottom: "10px"});
		Creation.get("div").css({textAlign: "center", padding: "1px", background: "#BDDFEF", width: "220px"})
			.append(Creation.get("b").css({color: "#036", fontSize: "15px", fontVariant: "small-caps"}).text("- Les cdv associées -"))
			.appendTo(divB);
		Creation.get("div", "listeCdv").css({border: "1px solid #BDDFEF", width: "220px", maxHeight: "120px", overflow: "auto"}).appendTo(divB);
		Creation.get("div").css({textAlign: "left", padding: "1px", background: "#BDDFEF", width: "80px"})
			.append(Creation.get("b").css({color: "#036", fontSize: "12px", marginLeft: "5px"}).text("TOTAL CDV :"))
			.appendTo(divB);
		Creation.get("div").css({textAlign: "right", padding: "1px", margin: "-18px 0 0 80px", background: "#BDDFEF", width: "140px"})
			.append(Creation.get("b", "nbCdvAssociees").css({color: "#036", fontSize: "13px", marginRight: "5px"}))
			.appendTo(divB);
		divB.appendTo(divG);
		Creation.img(null, null, "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif").css("margin", "0px 8px -3px 4px").appendTo(divG);
		Creation.get("a").css({cursor: "pointer", fontWeight: "bold"}).text("Supprimer la cdv globale....").click(function() {
			if (!confirm("Confirmez-vous la suppression de la cdv globale ?")) return 0;
			CdvGlobale.selection = new Array();
			GM.del("CdvGlobale.selection");
			CdvGlobale.page();
		}).appendTo(divG);
		Creation.img(null, null, "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif").css("margin", "0px 8px -3px 105px").appendTo(divG);
		var a = Creation.get("a").css({cursor: "pointer", fontWeight: "bold"}).text("Faire une sauvegarde des pseudos....").click(function() {
				$("#contenuSave").val($.trim(CdvGlobale.selection[3]));
				$("#divSave").show();
			}).appendTo(divG);
		divGDMC.append(divG).appendTo(obj);
		this.list();
		}
		
		/* Partie de sauvegarde des liens */ {
		var div = Creation.get("div", "divSave").css({marginTop: "20px", padding: "0px", display: "none"});
		Creation.get("div").css({paddingLeft: "10px", background: "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top", borderLeft: "1px solid rgb(153,204,0)"})
			.append(Creation.get("b").css({color: "#FFF", fontSize: "17px", fontVariant: "small-caps"}).text("Sauvegarde des pseudos"))
			.append(Creation.get("b").css({color: "#FFF", fontSize: "17px", fontVariant: "small-caps", marginLeft: "240px", cursor: "pointer"}).text("fermer").click(function() {
				$("#divSave").hide();
			}))
			.appendTo(div);
		Creation.get("textarea", "contenuSave").css({height: "100px", width: "528px", margin: "0px", border: "1px solid rgb(153,204,0)"})
			.appendTo(div);
		obj.append(div);
		}
		
		/* Nouvelle Cdv */ {
		Creation.get("div").css({paddingLeft: "10px", marginTop: "20px", background: "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top"})
			.append(Creation.get("b").css({color: "#FFF", fontSize: "17px", fontVariant: "small-caps"}).text("Nouvelle cdv"))
			.appendTo(obj);
		Creation.get("div").css({border: "1px solid rgb(153,204,0)", padding: "10px"})
			.append(Creation.get("b").css("font-size", "12px").text("Nom de la cdv globale :"))
			.append(Creation.get("br"))
			.append(Creation.get("input", "c_nomCdvGlobale").attr({type: "text", maxLength: "20"}).css({width: "501px", fontSize: "12px", marginBottom: "5px"}))
			.append(Creation.get("b").css("font-size", "12px").text("Liste des pseudos à fusionner (séparés par un retour à la ligne ou un espace) :"))
			.append(Creation.get("br"))
			.append(Creation.get("textarea", "c_listeCdv").css({height: "80px", fontSize: "12px"}))
			.append(Creation.img(null, null, "http://image.jeuxvideo.com/pics/recherche_bt_valider.gif", "Valider").css({marginTop: "5px", cursor: "pointer"}).click(function() {
				if (CdvGlobale.selection.length > 0) {
					if (!confirm("Une cdv globale existe déjà. Elle sera supprimée.\nConfirmez-vous la suppression ?")) return 0;
				}
				var nom = $("#c_nomCdvGlobale").val().replace(/^\s+|\s+$/g, "");
				var liste = $("#c_listeCdv").val().replace(/^\s+|\s+$/g, "");
				if (nom == "") {
					alert("Vous n'avez pas entré de nom pour la cdv globale.");
					return 0;
				}
				if (liste == "") {
					alert("Vous n'avez pas entré de pseudos à regrouper.");
					return 0;
				}
				$("#loadstate").text("0%");
				$("#load").show();
				var tmp = liste.replace(/\s+/g, " ").split(" ");
				var arr = $.grep(tmp, function(elm, i) {
					var bool = true;
					if (elm.length < 3 || elm.length > 15) bool = false;
					$.ajax({
						type: "get",
						url : "http://www.jeuxvideo.com/profil/" + elm + ".html",
						async: false,
						success: function(data) {
							if ($(".banni", data).is("p") && $(".banni", data).text() == "Ce pseudo n'existe pas.") bool = false;
						}
					});
					$("#loadstate").text(parseInt(100 / tmp.length * i) + "%");
					return bool;
				});
				arr = $.merge([], arr)._doublon(true);
				if (arr.length < 2) {
					$("#load").hide();
					alert("Vous devez entrer au minimum deux pseudos à regrouper.");
					return 0;
				}
				CdvGlobale.selection = new Array($("#c_nomCdvGlobale").val(), true, false, " " + arr.join(" ") + " ");
				GM.setArray("CdvGlobale.selection", CdvGlobale.selection);
				$("#load").hide();
				CdvGlobale.page();
			}))
			.appendTo(obj);
		}
		
		/* Convertir des old saves */ {
		var div = Creation.get("div").css({position: "fixed", width: "300px"});
		Creation.get("div").css({paddingLeft: "10px", background: "url(http://image.jeuxvideo.com/css_img/defaut/bloc3_h3.png) right top"})
			.append(Creation.get("b").css({color: "#FFF", fontSize: "17px", fontVariant: "small-caps"}).text("Extraction de pseudos"))
			.appendTo(div);
		Creation.get("div").css({background: "#ededed", border: "1px solid rgb(50,83,97)", padding: "1px 4px 4px 3px"})
			.append(Creation.get("p").html("Exemple :<br><font style='color: #0a77b8;'>http://[...].cgi?pxo=<b>Mega</b>&dxo=[...]&k=[...]</font> +> Mega").css("margin-bottom", "4px"))
			.append(Creation.get("b").text("Liens séparés par un espace ou un retour à la ligne :"))
			.append(Creation.get("textarea", "oldurl").css({width: "285px", height: "100px", fontSize: "10px"}))
			.appendTo(div);
		Creation.get("div").css({textAlign: "right", paddingRight: "10px", background: "url(http://s2.noelshack.com/uploads/images/18396012444777_bloc3_h3.png) left top no-repeat"})
			.append(Creation.get("b").css({color: "#FFF", fontSize: "17px", fontVariant: "small-caps", cursor: "pointer"}).text("extraire").click(function() {
				var liste = $("#oldurl").val().replace(/^\s+|\s+$/g, "");
				if (liste == "") return 0;
				var arr = liste.replace(/\s+/g, " ").split(" ");
				var rst = new Array();
				$(arr).each(function() {
					if (this.match(/http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=(.+)&dxo=....\-..\-..&k=.+/, "$1"))
					rst.push(this.replace(/http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=(.+)&dxo=....\-..\-..&k=.+/, "$1"));
				});
				$("#oldurl").val(rst.join(" "));
			}))
			.appendTo(div);
		obj2.append(div);
		}
		
		/* Loading */ {
		Creation.get("div", "load")
			.css({position: "fixed", zIndex: 11, top: 0, left: 0, width: "100%", height: "100%", background: "black", opacity: "0.8", display: "none"})
			.append(Creation.img(null, null, "http://s2.noelshack.com/uploads/images/19128651173577_loading51.gif")
				.css({position: "fixed", top: window.innerHeight / 2 - 62 + "px", left: window.innerWidth / 2 - 62 + "px", opacity: "0.3"}))
			.append(Creation.get("b", "loadstate")
				.css({position: "fixed", top: window.innerHeight / 2 - 10 + "px", left: window.innerWidth / 2 - 18 + "px", display: "block", width: "40px", color: "#FFF", fontSize: "18px", textAlign: "center", opacity: "0.3"}))
			.appendTo($("body"));
		}
	},
	show: function() {
		var pseudo = unsafeWindow.pseudo;
		if (new RegExp(" " + pseudo + " ")._test(this.selection[3])) {
			if (!this.selection[2]) Creation.get("li")
				.css("border", 0)
				.append(Creation.get("span")
					.attr("class", this.selection[1] ? "sexe_m" : "sexe_f")
					.css("font-size", "18px")
					.text(this.selection[0]))
				.insertBefore($("#pseudo").css("border-left", "solid #DDD 1px"));
			Creation.img("load", null, "http://s2.noelshack.com/uploads/images/4354894676979_loading1.gif")
				.css("margin-top", "2px").insertAfter("#rang");
			var count = 0, nb = 0;
			var arr = $.trim(this.selection[3]).split(" ");
			var select = Creation.get("select").change(function() {
				location.href = "http://www.jeuxvideo.com/profil/" + this.value + ".html";
			});
			for (var i = 0; i < arr.length; i++) Creation.get("option").text(arr[i]).attr("selected", arr[i].equals(pseudo)).appendTo(select);
			var table = Creation.get("table").css("width", "100%").attr({cellspacing: 0, cellpadding: 0});
			Creation.get("tr")
				.append(Creation.get("td").html("<b>" + arr.length + " cartes de visite regroupées :</b>"))
				.append(Creation.get("td").css("text-align", "right").append(select))
				.appendTo(table);
			Creation.get("div", "pt_nbposttotal", "portlet")
				.append(Creation.get("div", "txt_nbposttotal", "portlet-header").html("<h2>0 messages <span>postés au total</span></h2>"))
				.append(Creation.get("div", null, "portlet-content").append(table))
				.insertAfter("#pt_nbpost");
			$(arr).each(function() {
				$.get("http://www.jeuxvideo.com/profil/" + this + ".html", function(data) {
					count++;
					nb += parseInt($("#pt_nbpost", data).find("h2:first").text().replace(/([^ ]) .*/, "$1").replace(/\./g, ""));
					$("#txt_nbposttotal").html("<h2>" + nb.toString().formatPost() + " messages <span>postés au total</span></h2>");
					if (count == arr.length) $("#load").hide();
				});
			});
		}
	},
	main: function() {
		this.selection = GM.getArray("CdvGlobale.selection", "[]");
		switch (Global.section()) {
			case "forums":
				var li = document.createElement("li");
				var a = document.createElement("a");
					a.innerHTML = "Gestion Cdv";
					a.title = "Gestion Cdv";
					a.href = "http://www.jeuxvideo.com/forums/CdvGlobale";
					a.target = "cdvglobale";
				li.appendChild(a);
				document.getElementById("menu_interactif").getElementsByTagName("ul")[0].appendChild(li);
			break;
			case "profil":
				if (this.selection.length > 0) this.show();
			break;
		}
		if (Global.mode() == "CdvGlobale") this.page();
	}
}

function MessParam() {
	$(".pseudo > strong").addClass("d_pseudo");
	$(".pseudo > a").css("margin-right", "1px").addClass("b_cdv");
}

function main() {
	// Paramétrage des données
	MessParam();
	// Les fonctions
	CdvGlobale.main(); // Cdv globale
	// On vide le champs en mode 3
	if (Global.mode("i") == 3) $("#newmessage").empty().focus();
}

main();
