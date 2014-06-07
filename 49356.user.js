// ==UserScript==
// @name           JvNewLook
// @namespace       
// @description    Nouvelle intégration des posts
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @Author         Mega
// @Date           26/05/09 - 17/10/10
// ==/UserScript==

String.prototype.toRegExp = function() {
	return 	this.replace(/([\\\.\$\[\]\(\)\{\}\^\?\*\+\-])/g, "\\$1")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;")
				.replace(/&/g, "&amp;");
}

String.prototype.getMode = function() {
	var mode = this.split("/")[4].split("-")[0];
	if (isNaN(parseInt(mode))) return mode;
	else return parseInt(mode);
}

$ = unsafeWindow.jQuery;

var Global = {
	url: location.href.toString()
}

var Image = { /* ----- Les url des boutons et images ----- */
	rangs: {
		src: "url(http://oslo.addworks.fr/mega/jvm/img/rangs.png) ",
		carton:		"center top no-repeat",
		bronze:		"center -29px no-repeat",
		argent:		"center -59px no-repeat",
		or:			"center -89px no-repeat",
		rubis:		"center -119px no-repeat",
		diamant:	"center -149px no-repeat"
	}
}

var Creation = {
	get: function(elm, params) {
		if (!elm) {
			GM_log("\nCreation.get(elm, [params]): elm est obligatoire.");
			return;
		}
		if (params && typeof params !== "object" && typeof params !== "string") {
			GM_log("\nCreation.get(elm, [params]): le type de params est incorrect.\nType demandé: object ou string.\nType défini: " + (typeof params) + ".");
			return;
		}
		var obj = document.createElement(elm);
		if (params) {
			if (typeof params === "object") for (att in params) $(obj).attr(att, params[att]);
			else obj.id = params;
		}
		return $(obj);
	}
}

var M = function(o, t) {
	if (!t) t = "i";
	
	var pseudo = (t == "i") ? $(".d_pseudo", o).text() : $(".d_pseudo", o),
		date = $(".d_date", o).text().split("\n")[1],
		post = (t == "i") ? $.trim($(".d_post", o).html()) : $(".d_post", o),
		ancre = (t == "i") ? self.location.href.split("#")[0].split("?")[0].replace("/3-", "/1-") + "#" + o.id : $(".d_ancre", o),
		cdv = (t == "i") ? $(".b_cdv", o).attr("href") : $(".b_cdv", o),
		set = function(name, value) {
			if (name && value) $("#" + o.id).data(name, value);
		},
		get = function(name) {
			return $("#" + o.id).data(name);
		};
	
	return {pseudo: pseudo, date: date, post: post, ancre: ancre, cdv: cdv, set: set, get: get};
}

var NewLook = {
	urls: new Array(),
	list: function() {
		$('div[id^="message_"]', '#col1').each(function() {
			if (!new RegExp(M(this).pseudo.toRegExp(), "i").test(NewLook.urls))
			NewLook.urls.push(new Array(M(this).pseudo, M(this).cdv));
		});
	},
	layout: function() {
		$('div[id^="message_"]', '#col1').each(function() {
			var obj = this;
			var pseudo = M(obj, "o").pseudo.css({display: "block", marginBottom: "5px"});
			if (pseudo.get("defaultPseudoColor") === undefined || pseudo.get("defaultPseudoColor") === pseudo.css("color")) {
				if (pseudo.hasClass("moderateur")) pseudo.css("color", "#008000");
				else pseudo.css("color", "#C00");
			}
			var img = Creation.get("img").css({padding: "0px", margin: "5px auto", display: "block"}).attr("src", "http://www2.noelshack.com/uploads/rip045441.jpg");
			var avatar = M(obj, "o").cdv.empty().html(img).css({textAlign: "center"});
			var nbpost = Creation.get("span", {className: "nb_posts"}).css({fontSize: "10px", fontWeight: "bold"}).text("☼");
			var date = Creation.get("span", {className: "d_date"}).css({fontSize: "10px", marginTop: "12px", display: "block"}).html(M(obj).date.replace(" à ", "<br>"));
			var post = M(obj, "o").post.css({background: "none", listStyle: "none", border: 0, paddingLeft: "5px", display: "block"});
			var ancre = M(obj, "o").ancre.css({position: "absolute", listStyle: "none", margin: "-18px 0px 0px -80px"});
			// Le message
			var table = Creation.get("table").css("width", "100%");
			// Case gauche
			var tr = Creation.get("tr");
			var td = Creation.get("td").css({textAlign: "center", verticalAlign: "top", padding: "10px", width: "110px"});
			switch ($(obj).attr("class")) {
				case "msg msg1" : td.css("border-right", "1px solid #c0d7ed"); break;
				case "msg msg2" : td.css("border-right", "1px solid #d1d1d1"); break;
			}
			td.append(pseudo).append(avatar).append(nbpost).append(date);
			tr.append(td);
			// Case droite
			var b = Creation.get("b").text("Contenu du message :");
			var minTd = Creation.get("td").css("text-align", "left").append(b);
			var minTr = Creation.get("tr").append(minTd);
			var allButtons = $(".pseudo a, .date a", obj);
			var minTd = Creation.get("td").css("text-align", "right").append(allButtons);
			minTr.append(minTd);
			var minTable = Creation.get("table").css({width: "100%", borderBottom: "1px solid rgb(200,200,200)"}).append(minTr);
			var div = Creation.get("div").css({padding: "5px 0px 0px 5px", marginLeft: "-3px"}).append(minTable);
			var td = Creation.get("td").css({padding: "0px 0px 20px 0px", verticalAlign: "top"}).append(div).append(post);
			tr.append(td);
			var td = Creation.get("td").css({padding: "0px", verticalAlign: "bottom"}).append(ancre);
			tr.append(td);
			table.append(tr);
			// Le post est prêt
			$(obj).empty().html(table);
		});
	},
	main: function() {
		this.list();
		this.layout();
		$.each(NewLook.urls, function(i, obj) {
			$.get(obj[1], function(data) {
				var banni = $("p", data).hasClass("banni");
				$('.d_pseudo:contains(' + obj[0] + ')', '#col1').each(function() {
					var parent = $(this).parent().parent().parent().parent();
					if (!banni) {
						var pseudo = M(parent, "o").pseudo;
						var couleur = $("#pseudo h1", data).hasClass("sexe_f") ? "#ff3399" : "#0066cc";
						var avatar = $("#pt_avatar img", data).attr("src");
						var nbpost = $("#pt_nbpost", data).find("h2:first").text().replace(/([^ ]) .*/, "$1") + " posts";
						var rang = Creation.get("div").css({margin: "auto", background: Image.rangs.src + Image.rangs[$("#td_rang strong", data).text().toLowerCase()], width: "25px", height: "20px"});
						if (pseudo.get("defaultPseudoColor") === undefined || pseudo.get("defaultPseudoColor") === pseudo.css("color")) {
							if (!pseudo.hasClass("moderateur")) pseudo.css("color", couleur);
						}
						if (pseudo.hasClass("moderateur")) M(parent, "o").set("defaultPseudoColor", "008000");
						else M(parent, "o").set("defaultPseudoColor", couleur.replace('#', ''));
						M(parent, "o").cdv.find("img").attr("src", avatar);
						$(".nb_posts", parent).text(nbpost);
						rang.insertAfter($(".nb_posts", parent));
					} else M(parent, "o").set("defaultPseudoColor", "C00");
				});
			});
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
}

function main() {
	// Paramétrage des données
	MessParam();
	// NewLook
	NewLook.main();
	// On vide le champs en mode 3
	if (Global.url.getMode() === 3) $("#newmessage").empty().focus();
}

main();
