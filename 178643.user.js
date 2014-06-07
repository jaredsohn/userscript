// ==UserScript==
// @name           Hudson : Integração com Mantis
// @namespace      http://gm.wesley.eti.br
// @description    Envia comentários ao mantis baseados nas informações obtidas nas builds do hudson/jenkins
// @include        /^https?:\/\/.*\/job\/[\w% -]+\/changes$/
// @version        2.2.1
// @language       pt-br
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=178643
// @resource       meta https://github.com/w35l3y/userscripts/raw/master/scripts/178643.user.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml https://github.com/w35l3y/userscripts/raw/master/resources/html/updaterWindowHtml
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       jobs http://pastebin.com/download.php?i=xzKNyumC
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       templates http://pastebin.com/download.php?i=btV4urde
// @require        /scripts/source/63808.user.js
// @require        /scripts/source/56489.user.js
// @require        /scripts/source/85618.user.js
// @require        /scripts/source/87940.user.js
// @require        /scripts/source/87942.user.js
// @require        /scripts/source/292725.user.js
// @require        /scripts/source/288385.user.js
// @require        /scripts/source/176400.user.js 
// @require        http://pastebin.com/download.php?i=5Ji72UdS
// @require        /scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        2.2.0 Adicionada possibilidade de funcionar em diversos sistemas do hudson e mantis ao mesmo tempo
// @history        2.1.1 Ajustado para funcionar também quando a url possuir caractere de espaço
// @history        2.0.8 Simplificado o template dos comentários
// @history        2.0.6 Ajustado <a href="https://github.com/w35l3y/userscripts/blob/master/includes/163374.user.js">Includes : WinConfig</a> para permitir mover a janela
// @history        2.0.4 Resolvido problema no parser da data
// @history        2.0.0 Substituído todos os alert, confirm e prompt pelas alternativas em <a href="//userscripts.org/scripts/show/163374">Includes : WinConfig</a>
// @history        1.2.1 Adicionado ícone de ajuda (?) nos campos
// @history        1.2.1 Adicionada a possibilidade de processar builds de outras pessoas
// ==/UserScript==

var jj = /^(\w+:\/\/[\w:.\/-]+\/)job\/([\w -]+)\/changes$/.test(decodeURIComponent(location.href)) && [RegExp.$1, RegExp.$2],
jobs = JSON.parse(GM_getValue("jobs", "{}")),
jobsInfo = JSON.parse(GM_getResourceText("jobs")),
debug = GM_getValue("debug", false),
types = ["add", "delete", "edit"],
infos = [],
refresh = false,
userType = {"":"",",":"", "|":"Revisor", "/":""},
processaUrl = function (str) {
	if (/^(\w+:\/\/)([\w.]+)(?::(\w+))?@([\w:.\/-]+\/)([\w \|%-]+)?/.test(str)) {
		return {
			host			: RegExp.$1 + RegExp.$4,
			username	: RegExp.$2,
			password	: RegExp.$3,
			path			: RegExp.$5
		};
	}
},
requestPassw = {},
process = function (jobName, loc, doc, info) {
	refresh = true;

	var job = jobs[jobName],
	nn = [jobs[jobName] && jobs[jobName].last || 0, /\d+/.test(xpath("string(id('main-panel')/h2[1]/a/@href)", doc)) && RegExp["$&"] || 0],
	contiuar = function (bb) {
		refresh = false;

		var history = [],
		createInfo = function (obj, b) {
			if (!~obj.added.indexOf(b.block.index)) {
				obj.added.push(b.block.index);

				var help = document.createElement("img");
				help.setAttribute("src", "/static/58ced3f3/images/16x16/help.png");
				help.setAttribute("style", "cursor: pointer");

				help = obj.node.parentNode.insertBefore(help, obj.node.nextSibling);
				help.parentNode.insertBefore(document.createTextNode(" "), help);
				infos.push(help);

				help.addEventListener("click", function (e) {
					WinConfig.init({
						title	: "Informações da build",
						type	: WinConfig.WindowType.EXPLANATION,
						size	: ["600px", 0],
						description	: Template.get("buildInformations", {
							status: b.status,
							text	: b.note,
						}),
					});
				}, false);
			}
		},
		getTemplate = function (block, build) {
			var context = {
				build	: build,
				block	: JSON.parse(JSON.stringify(block)),	// creates a clone
			};

			for each (var f in context.block.files) {
				f.categoryString = (~f.category?jobInfo.categories[1][f.category][1]:jobInfo.categories[0]);
				f.typeString = jobInfo.types[f.type + 1];

				if (-1 == f.category) {
					f.hasTest = "-";

					for each (var ff in context.block.files) {
						if (ff.name != f.name && ff.name.replace("src/test/java", "src/main/java").replace(/Test\.java$/, ".java") == f.name) {
							f.hasTest = "+";
							ff.hasPair = true;

							break;
						}
					}
				}
			}

			for (var f in context.block.files) {
				if (context.block.files[f].hasPair) {
					delete context.block.files[f];
				}
			}

			return Template.get(jobInfo.template, context);
		},
		jobInfo = jobsInfo["_"],
		urlMantis = {};
		for each (var url in info.mantis.urls.split(/[\r\n]+/).filter(function (a) {
			return a.length > 0;
		}).map(processaUrl)) {
			urlMantis[url.path] = url;
		}
		if (jobName in jobsInfo) {
			for (var i in jobsInfo[jobName]) {
				jobInfo[i] = jobsInfo[jobName][i];
			}
		}

		for (var i in jobInfo.categories[1]) {
			jobInfo.categories[1][i][0] = new RegExp(jobInfo.categories[1][i][0]);
		}

		if (!job) {
			job = jobs[jobName] = {last:0, builds:{}};
		}
		if (bb) {
			job.last = bb;
		}

		(function recursive (details, index) {
			if (index < details.length) {
				//console.log("Reading content of details #" + details[index].index);

				HttpRequest.open({
					url			: details[index].link,
					method		: "get",
					onsuccess	: function (xhr) {
						var blocos = details[index].blocks = [],
						ibloco = -1;
						job.status = details[index].status = xpath("string(id('main-panel')/h1/img/@alt)", xhr.response.xml);

						for each (var row in xpath("id('main-panel')/table/tbody/tr", xhr.response.xml)) {
							if ("pane" == row.getAttribute("class")) {
								ibloco = -1;
								var text = row.textContent.replace(/��/g, "?").trim();

								for each (var a in blocos) {

									if (a.text == text) {
										ibloco = a.index;
										break;
									}
								}

								if (!~ibloco) {
									var b = {
										index		: ibloco = blocos.length,
										owner		: xpath("string(.//a[contains(@href, '/user/')]/text())", row),
										mantis		: [],
										users		: [],
										files		: [],
										text		: text,
									},
									fText = (xpath(".//div[@class = 'changeset-message']", row)[0] || row.firstElementChild).innerHTML.replace(/<br ?\/?>/g, "\n");

									if (/\s*(?:\[(?:mantis)?\s*([a-z]*\d+(?:\s*[\|,\/e]\s*[a-z]*\d+)*)\s*\])\s*(?:\[\s*(\w+(?:[\|\.\s,\/-]*\w+)*)\s*\])?\s*([^]+)\s*$/.test(fText) || 
										/\s*(?:\[(?:mantis)?\s*([a-z]*\d+(?:\s*[\|,\/e]\s*[a-z]*\d+)*)\s*\])?\s*(?:\[\s*(\w+(?:[\|\.\s,\/-]*\w+)*)\s*\])\s*([^]+)\s*$/.test(fText)) {
										b.mantis = RegExp.$1;
										b.users = RegExp.$2;
										b.description = RegExp.$3.replace(/��/g, "?").trim().replace(/(\w)(\?+)(\w)/g, function ($0, $1, $2, $3) {
											if (~"aeiou".indexOf($1)) {
												if ($2 + $3 == "??e") {
													return $1 + "çõe";
												} else if ($2 + $3 == "??o") {
													return $1 + "ção";
												}
											}/* else if ($2 + $3 == "?o") {
												return $1 + "ão";
											}*/

											switch ($0) {
												case "a?a"	:
												case "a?o"	:
												case "a?u"	:
												case "e?o"	:
												case "i?o"	:
												case "o?o"	:
													return $1 + "ç" + $3;
												default		:
													return $0;
											}
										});

										b.mantis = b.mantis.split(/\s*[\|,\/e]\s*/).filter(function($0) {return $0.length}).map(function ($0) {
											return (/([a-z]+)?(\d+)$/.test($0)?{
												number: RegExp.$2 || $0,
												prefix: RegExp.$1 || "",
												info	: urlMantis[RegExp.$1 || ""],
											}:{
												number: $0,
												prefix: "",
												info	: urlMantis[""],
											});
										});
										b.users = b.users.trim().replace(/\s+/g, " ").split(/\s*(?:(?=[\|,\/])|(?:\s+e\s+))\s*/).filter(function($0) {return $0.length > 3}).map(function (value, index) {
											var p = value.replace(/\s+/g, "").search(/\w/),
											s = value.substring(0, p) || (index?",":"");

											return {
												username	: value.substring(p),
												separator	: s,
												type			: userType[s],	// tipos: "" (desenvolvedor) "," (reservado) "|" (revisor [programador em par]) "/" (revisor)
											};
										});
									}

									blocos.push(b);
								}
							} else if (~ibloco && 3 == row.cells.length) {
								var f = {
									type	: /\/document_(\w+)/.test(xpath("string(./img/@src)", row.cells[0])) && types.indexOf(RegExp.$1),
									name	: row.cells[2].textContent.trim(),
									version	: row.cells[1].textContent.trim(),
									category: -1,
								};

								if (2 == f.type && ~f.name.indexOf("/Attic/")) {
									f.type = 1;
									f.name = f.name.replace("/Attic", "");
								}

								for (var c in jobInfo.categories[1]) {
									if (jobInfo.categories[1][c][0].test(f.name)) {
										f.category = parseInt(c, 10);
									}
								}

								blocos[ibloco].files.push(f);
							}
						}

						job.last = details[index].index;
						WinConfig.init({
							title				: "Build #" + job.last,
							size				: ["300px", 0],
							description	: "A build já foi processada.<br /><br />Deseja reprocessá-la?",
							condition		: function (cb) {
								if (job.last in job.builds) {
									if (debug || info.reprocessBuild & 2) {
										return 0;
									} else if (info.reprocessBuild & 1) {
										return -1;
									}
								}
								return 1;
							},
							load				: function () {
								if (blocos.length) {
									job.builds[job.last] = [];
									//console.log(details[index]);

									(function recursive2 (blocoIndex) {	// lista de blocos
										if (blocoIndex < blocos.length) {
											var bloco = blocos[blocoIndex];

											bloco.files.sort(function (a, b) {
												if (a.category == b.category) {
													//if (a.type == b.type) {
													if (a.name == b.name) {
														return (a.version > b.version?1:-1);
													} else {
														return (a.name > b.name?1:-1);
													}
													//} else {
													//	return (a.type > b.type?1:-1);
													//}
												} else {
													return (a.category > b.category?1:-1);
												}
											});

											//console.log(bloco);

											WinConfig.init({
												title				: "Citação",
												description	: Template.get("citation", {
													url		: loc.host,
													block	: bloco,
//													user	: bloco.owner,
//													mantis: bloco.mantis,
												}),
												condition	: function () {
													if (bloco.mantis.length && !~(info.hudson.citation || "").split(/\s*,\s*/).indexOf(bloco.owner)) {
														if (loc.username == bloco.owner || ~(info.hudson.others || "").split(/\s*,\s*/).indexOf(bloco.owner)) {
															return 1;
														} else { // if (~bloco.users.indexOf(info.mantis.username))
															for each (var u in bloco.users) {
																for each (var uu in urlMantis) {
																	if (u.username == uu.username) {
																		return -1;
																	}
																}
															}
														}
													}
													return 0;
												},
												load		: function () {
													WinConfig.init({
														title	: "Quantidade de arquivos",
														description	: Template.get("numberOfFiles", {
															url		: loc.host,
															job		: jobName,
															id		: details[index].index,
															block	: bloco,
//															index	: bloco.index,
//															mantis: bloco.mantis,
//															files	: bloco.files,
														}),
														condition	: function () {
															return 1;
															if (bloco.files.length <= 20) {
																return 1;
															} else {
																return -1;
															}
														},
														load		: function () {
															var text = getTemplate(bloco, details[index]),
															jx = job.builds[job.last][job.builds[job.last].push({
																block	: bloco,
																note	: text,
																status	: [],
															}) - 1];

															createInfo(details[index], jx);

															(function recursive3 (mIndex) {
																if (mIndex < bloco.mantis.length) {
																	var mantis = bloco.mantis[mIndex],
																	build = jx,
																	srp = (2 > info.requestPassword);

																	WinConfig.init({
																		name	: mantis.info.host + mantis.info.username,
																		title	: "Senha",
																		type	: WinConfig.WindowType.PROMPT,
																		description	: Template.get("requestPassword", {
																			mantis	: mantis,
																		}),
																		fields : [{
																			focused	: true,
																			name	: "text",
																			type	: WinConfig.FieldType.PASSWORD,
																		}],
																		store	: srp,
																		force	: true,
																		condition	: function (cfg) {
																			if (mantis.info.password || cfg.text && (!info.requestPassword || requestPassw[this.name])) {
																				return 1;
																			} else {
																				return -1;
																			}
																		},
																		load	: function (cfg) {
																			var passw = requestPassw[this.name] || mantis.info.password || cfg.text;
																			if (passw) {
																				requestPassw[this.name] = passw;
																				var pl = new SOAPClientParameters();

																				pl.add("username", mantis.info.username || "");
																				pl.add("password", passw);
																				pl.add("issue_id", mantis.number);
																				pl.add("note", {
																					text: text,
																				});

																				if (debug) {
																					setTimeout(function () {build.status.push({mantis:mantis, code:Math.random(), message:"Teste"});}, 3000);

																					recursive3(++mIndex);
																				} else {
																					WinConfig.init({
																						title				: "Anotação Build #" + job.last,
																						description	: Template.get("addNote", {
																							url		: mantis.info.host,
																							mantis: mantis.number,
																							text	: text,
																						}),
																						size	: ["700px", 0], 
																						condition	: function () {
																							if (info.mantis && info.mantis.urls) {
																								return -1;
																							} else {
																								return 0;
																							}
																						},
																						load		: function () {
																							//console.log("Sending comment to mantis #" + mantis);
																							SOAPClient.invoke(mantis.info.host + "api/soap/mantisconnect.php", "mc_issue_note_add", pl, true, function (r, xhr) {
																								if (r instanceof Error) {
																									build.status.push({mantis:mantis, code:1, message:r.fileName});
																								} else if (r) {
																									build.status.push({mantis:mantis, code:0, message:"Comment added sucessfully."});

																									alert(r);
																									//console.log(r);
																								} else {
																									build.status.push({mantis:mantis, code:2, message:xhr.responseText || "(empty string)"});
																								}

																								recursive3(++mIndex);
																							});
																						},
																						unload	: function () {
																							build.status.push({mantis:mantis, code:3, message:"Comment was not sent."});

																							recursive3(++mIndex);
																						}
																					});
																				}
																			} else {
																				recursive3(++mIndex);
																			}
																		}
																	});
																} else {
																	recursive2(++blocoIndex);
																}
															}(0));
														},
														unload	: function () {
															recursive2(++blocoIndex);
														}
													});
												},
												unload	: function () {
													recursive2(++blocoIndex);
												}
											});
										} else {
											if (!debug) {
												GM_setValue("jobs", JSON.stringify(jobs));
											}

											recursive(details, ++index);
										}
									}(0));
								} else {
									setTimeout(recursive, 50, details, ++index);
								}
							},
							unload			: function () {
								//console.log("Build #" + job.last + " was processed already.");

								setTimeout(recursive, 50, details, ++index);
							}
						});
					}
				}).send();
			} else if (details.length) {
				for (var i in job.builds) {
					var k = parseInt(i, 10);

					if (!~history.indexOf(k) || !job.builds[i].length) {
						delete job.builds[k];
					}
				}

				if (!debug) {
					GM_setValue("jobs", JSON.stringify(jobs));
				}

				WinConfig.init({
					title	: jobName,
					type	: WinConfig.WindowType.SUCCESS,
					size	: ["300px", 0],
					description	: "Processamento concluído com sucesso!",
				});
			}
		}(xpath("id('main-panel')/h2/a", doc).map(function ($0) {
			var dateArr = function (month, day, apm, yhms) {
				var m = 1+(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"].indexOf(month.toLowerCase()) % 12),
				result = [day, m, yhms[0], (((("pm" == apm.toLowerCase()) ^ (12 == yhms[1])?12:0) + parseInt(yhms[1], 10))%24), yhms[2], yhms[3]].map(function ($0) {
					return ("00" + $0).substr(-2);
				});
				result[2] = yhms[0];

				return (m?result:[]);
			},
			date = /(\w+) (\d+), (\d+(?:[\/: ]\d+)+)(?: ([ap]m))?/i.test($0.textContent) && dateArr(RegExp.$1, RegExp.$2, RegExp.$4, RegExp.$3.match(/\d+/g)) || /\d+(?:[\/: ]\d+)+/.test($0.textContent) && RegExp['$&'].match(/\d+/g),
			obj = {
				index	: /#(\d+)/.test($0.textContent) && parseInt(RegExp.$1, 10) || undefined,
				date	: date.length && ([date[0], "/", date[1], "/", date[2], " ", date[3], ":", date[4], ":", date[5]].join("") || new Date([date[2], "/", date[1], "/", date[0], " ", date[3], ":", date[4], ":", date[5]].join(""))) || undefined,
				link	: loc.host + "job/" + jobName + "/" + $0.getAttribute("href"),
				job		: jobName,
				node	: $0,
				added	: [],
				status	: "Pending",
			};
			history.push(obj.index);

			if (obj.index in job.builds) {
				for each (var x in job.builds[obj.index]) {
					createInfo(obj, x);
				}
			}

			return obj;
		}).filter(function ($0) {
			return $0.index > job.last;
		}).sort(function (a, b) {
			return a.index - b.index;
		}), 0));
	};

	if (debug) {
		continuar("0");
	} else {
		WinConfig.init({
			title				: jobName,
			type				:	WinConfig.WindowType.PROMPT,
			description	: Template.get("buildNumber", {
				value	: nn[0],
			}),
			size				: ["350px", 0],
			default			: {
				text	: nn[1]
			},
			condition		: function () {
				if (info.lastBuild & 1 && nn[0] != nn[1] || info.lastBuild & 2) {
					return -1;
				} else {
					return 0;
				}
			},
			load				: function (cfg) {
				contiuar(cfg.text);
			},
			unload			: function () {
				contiuar(false);
			}
		});
	}
},
next = function (cfg, cb) {
	if (cfg && cfg.hudson && cfg.hudson.urls && jj) {
		for each (var i in infos) {
			i.parentNode.removeChild(i);
		}
		infos = [];

		for each (var url in cfg.hudson.urls.split(/[\r\n]+/).map(processaUrl)) {
			if (jj[0] == url.host) {
				var jL = url.path.split(/\s*\|\s*/),
				ijl = jL.indexOf(jj[1]);
				if (~ijl) {
					process(jL[ijl], url, document, cfg);
				} else {
					(function recursive1 (jobsList, index) {
						if (index < jobsList.length) {
							HttpRequest.open({
								url			: url.host + "job/" + jobsList[index] + "/changes",
								method		: "get",
								onsuccess	: function (xhr) {
									process(jobsList[index], url, xhr.response.xml, cfg);

									setTimeout(recursive1, 350, jobsList, ++index);
								}
							}).send();
						} else if (jobsList.length) {
						}
					}(jL, 0));
				}
				break;
			}
		}
	} else if (cb) {
		return cb();
	}
},
win = new WinConfig({
	title	: "Integração com Mantis : Configurações",
	type	: WinConfig.WindowType.CUSTOM,
	size	: ["400px", 0],
	store	: true,
	default	: {
		group	: {
			mantis	: {
				urls	: "http://",
			},
			hudson	: {
				urls	: location.protocol + "//" + location.host + "/" + (jj?jj[1]:""),
			},
			lastBuild		: 0,
			reprocessBuild	: 0,
		}
	},
	load		: function (cfg) {
		/*if (!/\/$/.test(cfg.group.mantis.urls) && cfg.group.mantis.urls.length) {
			cfg.group.mantis.url += "/";
		}
		if (!/\/$/.test(cfg.group.hudson.url) && cfg.group.hudson.url.length) {
			cfg.group.hudson.url += "/";
		}*/

		return next(info = cfg.group, function () {
			WinConfig.init({
				title	: "Dados incorretos",
				type	: WinConfig.WindowType.ERROR,
				size	: ["300px", 0],
				description	: "Certifique-se de ter preenchido os dados corretamente.<br />Caso tenha alguma dúvida em algum campo, pressione o ícone (?) próximo ao campo.",
				parent: this,
			});

			return false;
		}.bind(this));
	},
	fields	: [{
		name	: "settingsHotKey",
		label	: "Configurações",
		key		: "hotkey",
		callback: function (event, win) {
			win.open();
		},
	}, {
		name	: "refreshHotKey",
		label	: "Atualização",
		key		: "hotkey",
		default	: {
			keyCode	: "A".charCodeAt(0),
		},
		callback: function (event, win) {
			if (!refresh) {
				var xInfo = JSON.parse(JSON.stringify(win.get("group")));
				xInfo.lastBuild = 2;
				next(xInfo);
			}
		},
	}, {
		name	: "group",
		nogroup	: true,
		type	: WinConfig.FieldType.GROUP,
		fields	: [{
			name	: "hudson",
			type	: WinConfig.FieldType.GROUP,
			label	: "Hudson",
			fields	: [{
				name		: "urls",
				label		: "Urls",
				description	: "Páginas do Hudson ou Jenkins separadas por linha.<br /><br /><b>Formato:</b><br />protocolo://usuario@host[:porta]/job1|job2|jobN<br /><b>Exemplo:</b><br />http://w35l3y@domain3.com:8080/job1|job2<br />http://w35l3y@domain4.com/hudson/job3<br /><br />A porta é opcional.",
				type		: WinConfig.FieldType.TEXT,
				format		: WinConfig.FieldFormat.STRING,
				multiple	: true,
				help		: true,
			}, {
				name		: "others",
				label		: "Usuários",
				description	: "Lista de usuários separados por vírgula.<br /><br />Às vezes acontece por exemplo de um caso que você estava demandado para fazer ter sido resolvido por meio da correção de outra pessoa em outro caso.<br /><br />Útil quando você precisa comentar no lugar de alguma pessoa que não usa o script. Caso contrário, mantenha o valor em branco",
				type		: WinConfig.FieldType.TEXT,
				format		: WinConfig.FieldFormat.STRING,
				help		: true,
			}],
		}, {
			name	: "mantis",
			type	: WinConfig.FieldType.GROUP,
			label	: "Mantis",
			fields	: [{
				name		: "urls",
				label		: "Urls",
				description	: "Páginas do Mantis separadas por linha.<br /><br /><b>Formato:</b><br />protocolo://usuario[:senha]@host[:porta]/[prefixo]<br /><b>Exemplos:</b><br />http://w35l3y:123xpto@domain1.com:8080/<br />http://w35l3y@domain2.com/q<br /><br />A senha é opcional. Caso não a informe, ela será pedida posteriormente.<br />A porta é opcional.<br />O prefixo do mantis é opcional. Duas urls não podem conter o mesmo prefixo. Ele serve para identificar qual sistema o mantis informado faz parte.",
				type		: WinConfig.FieldType.TEXT,
				format		: WinConfig.FieldFormat.STRING,
				multiple	: true,
				help		: true,
			}],
		}, {
			name	: "lastBuild",
			label	: "Perguntar última build",
			type	: WinConfig.FieldType.CHECK,
			format	: WinConfig.FieldFormat.NUMBER,
			empty	: 0,
			value	: [{
				value	: 0,
				label	: "Nunca",
				help	: true,
				description	: "Nunca pergunta pela última build processada e sempre continua o processo de quando parou pela última vez.",
			}, {
				value	: 1,
				label	: "Diferente",
				help	: true,
				description	: "Só pergunta quando a build mais recente for diferente da última que foi processada.",
			}, {
				value	: 2,
				label	: "Sempre",
				help	: true,
				description	: "Sempre pergunta, independente da última build que foi processada.<br /><br />Útil por exemplo quando falta energia ou precisa forçar o reinício da máquina.",
			}],
		}, {
			name	: "reprocessBuild",
			label	: "Reprocessar build",
			type	: WinConfig.FieldType.CHECK,
			format	: WinConfig.FieldFormat.NUMBER,
			empty	: 0,
			value	: [{
				value	: 0,
				label	: "Nunca",
				help	: true,
				description	: "Nunca reprocessa builds já processadas.",
			}, {
				value	: 1,
				label	: "Perguntar",
				help	: true,
				description	: "Pergunta caso builds já processadas sejam detectadas.",
			}, {
				value	: 2,
				label	: "Sempre",
				help	: true,
				description	: "Reprocessa builds já processadas sem perguntar.<br /><br />Não aconselhável pois o histórico é perdido.",
			}],
		}, {
			name	: "requestPassword",
			label	: "Perguntar senha",
			type	: WinConfig.FieldType.CHECK,
			format	: WinConfig.FieldFormat.NUMBER,
			empty	: 0,
			value	: [{
				value	: 0,
				label	: "Uma vez",
				help	: true,
				description	: "Pergunta pela senha apenas uma vez e a armazena para ser usada porteriormente.",
			}, {
				value	: 1,
				label	: "Primeira",
				help	: true,
				description	: "Pergunta pela senha uma vez a cada execução. A senha é armazenada.",
			}, {
				value	: 2,
				label	: "Sempre",
				help	: true,
				description	: "Pergunta pela senha sempre que ela for exigida. Não armazena a senha.",
			}],
		}],
	}],
});

next(win.get("group"));
