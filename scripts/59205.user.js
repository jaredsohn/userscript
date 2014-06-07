// ==UserScript==
// @name           Mafia Wars Wall Auto Help
// @namespace      MafiaWarsWallAutoHelp
// @include        http://www.facebook.com/home.php?*
// @require        http://www.mediafire.com/file/iymmlmtdfw4/library.js
// @resource       styles http://www.mediafire.com/file/wmnggww11gn/whelp.css
// @version        1.5.2
// @contributor    Aidas Josas
// @contributor    Rio Lukito
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
var styles = GM_getResourceText('styles');
style.innerHTML = styles;
head.appendChild(style);

var _set = new Object;
var _appImg = new Object;
var _act_array = new Object;
var _act_do_array = new Object;
var blinking, getNewsData;

_set = {
	'jobs':{
		'city':{
			'1':{
				'type':{
					'success':{
						'active':true,
						'value':GM_getValue('jobs_1_success_value', 0),
						'total':GM_getValue('jobs_1_success_total', 0)
					},
					'unsuccess':{
						'active':true,
						'value':GM_getValue('jobs_1_unsuccess_value', 0),
						'total':GM_getValue('jobs_1_unsuccess_total', 0)
					},
					'percent':{
						'active':true,
						'value':GM_getValue('jobs_1_percent_value', 0),
						'total':GM_getValue('jobs_1_percent_total', 0),
						'formula_value':'calcProc(success_value,unsuccess_value)',
						'formula_total':'calcProc(success_total,unsuccess_total)'
					},
					'experience':{
						'active':true,
						'value':GM_getValue('jobs_1_experience_value', 0),
						'total':GM_getValue('jobs_1_experience_total', 0)
					},
					'money':{
						'active':true,
						'value':GM_getValue('jobs_1_money_value', 0),
						'total':GM_getValue('jobs_1_money_total', 0)
					}
				}
			},
			'2':{
				'type':{
					'success':{
						'active':true,
						'value':GM_getValue('jobs_2_success_value', 0),
						'total':GM_getValue('jobs_2_success_total', 0)
					},
					'unsuccess':{
						'active':true,
						'value':GM_getValue('jobs_2_unsuccess_value', 0),
						'total':GM_getValue('jobs_2_unsuccess_total', 0)
					},
					'percent':{
						'active':true,
						'value':GM_getValue('jobs_2_percent_value', 0),
						'total':GM_getValue('jobs_2_percent_total', 0),
						'formula_value':'calcProc(success_value,unsuccess_value)',
						'formula_total':'calcProc(success_total,unsuccess_total)'
					},
					'experience':{
						'active':true,
						'value':GM_getValue('jobs_2_experience_value', 0),
						'total':GM_getValue('jobs_2_experience_total', 0)
					},
					'money':{
						'active':true,
						'value':GM_getValue('jobs_2_money_value', 0),
						'total':GM_getValue('jobs_2_money_total', 0)
					}
				}
			},
			'3':{
				'type':{
					'success':{
						'active':true,
						'value':GM_getValue('jobs_3_success_value', 0),
						'total':GM_getValue('jobs_3_success_total', 0)
					},
					'unsuccess':{
						'active':true,
						'value':GM_getValue('jobs_3_unsuccess_value', 0),
						'total':GM_getValue('jobs_3_unsuccess_total', 0)
					},
					'percent':{
						'active':true,
						'value':GM_getValue('jobs_3_percent_value', 0),
						'total':GM_getValue('jobs_3_percent_total', 0),
						'formula_value':'calcProc(success_value,unsuccess_value)',
						'formula_total':'calcProc(success_total,unsuccess_total)'
					},
					'experience':{
						'active':true,
						'value':GM_getValue('jobs_3_experience_value', 0),
						'total':GM_getValue('jobs_3_experience_total', 0)
					},
					'money':{
						'active':true,
						'value':GM_getValue('jobs_3_money_value', 0),
						'total':GM_getValue('jobs_3_money_total', 0)
					}
				}
			}
		}
	},
	'boots':{
		'hc':{
			'value':GM_getValue('boots_hc_value', 0),
			'total':GM_getValue('boots_hc_total', 0)
		},
		'm':{
			'value':GM_getValue('boots_m_value', 0),
			'total':GM_getValue('boots_m_total', 0)
		},
		'epe':{
			'value':GM_getValue('boots_epe_value', 0),
			'total':GM_getValue('boots_epe_total', 0)
		}
	},
	'menu':{
		'statistic':{
			'name':'Statistic',
			'body':'tab_statistic'
		},
		'setting':{
			'name':'Settings',
			'body':'tab_settings'
		},
		'about':{
			'name':'About',
			'body':'tab_about'
		}
	},
	'wars':{
		'success':{
			'value':GM_getValue('wars_success_value', 0),
			'total':GM_getValue('wars_success_total', 0)
		},
		'unsuccess':{
			'value':GM_getValue('wars_unsuccess_value', 0),
			'total':GM_getValue('wars_unsuccess_total', 0)
		},
		'experience':{
			'value':GM_getValue('wars_experience_value', 0),
			'total':GM_getValue('wars_experience_total', 0)
		}
	},
	'sett':{
		'general':{
			'name':'General',
			'body':'tab_general_statistic'
		},
		'position':{
			'name':'Position',
			'body':'tab_position_statistic'
		},
		'layouts':{
			'name':'Layouts',
			'body':'tab_layouts_statistic'
		}
	},
	'stat':{
		'jobsny':{
			'type':'job',
			'city':1,
			'name':'New York',
			'body':'tab_job_statistic'
		},
		'jobscuba':{
			'type':'job',
			'city':2,
			'name':'Cuba',
			'body':'tab_job_statistic'
		},
		'jobsmoscow':{
			'type':'job',
			'city':3,
			'name':'Moscow',
			'body':'tab_job_statistic'
		},
		'wars':{
			'name':'Wars',
			'body':'tab_wars_statistic'
		},
		'boosts':{
//			'type':'boost',
			'name':'Boosts',
			'body':'tab_boost_statistic'
		},
		'total':{
			'name':'Total',
			'body':'tab_total_statistic'
		}
	},
	'display':GM_getValue('display', 'home_stream'),
	'app':{
		'version':'1.5.2',
		'developer':'Aidas Josas',
		'url':'http://userscripts.org/scripts/source/59020.user.js'
	},
	'ext_url':'http://www.josas.lt/mw/',
	'startstop':GM_getValue('startstop', 'play'),
	'app_id':'10979261223',
	'url':{
		'link':'http://www.facebook.com/ajax/intent.php',
		'query':'filter=app_10979261223&newest={0}&ignore_self=true&load_newer=true&request_type=4&__a=1',
		'action_url':'http://apps.facebook.com/inthemafia/index.php'
	},
	'app_setting':{
		'get_news_interval':GM_getValue('get_news_interval', 5),
		'log_size':GM_getValue('log_size', 10),
		'perday':GM_getValue('perday', 1),
		'viewactionlog':GM_getValue('view_action_log', 1)
	},
	'actions':{
		'iced_brag':{
			'execute':0,
			'type':'boots',
			'icon':'atack',
			'replace_pattern':/(.in.(<[a-zA-Z\/][^]*>))/g,
			'message_data_pattern':/(<a\b[^>]*>(.*?)<\/a>)|(<img[^>]+\>)|(\sfrom\s(.*))/g,
			'message_return':'$1',
			'boots':true,
			'controller':'index',
			'action':'iced_boost_claim'
		},
		'level_up_brag':{
			'execute':0,
			'type':'boots',
			'icon':'protect',
			'replace_pattern':/(.in.(<[a-zA-Z\/][^]*>))/g,
			'message_data_pattern':/(<a\b[^>]*>(.*?)<\/a>)|(<img[^>]+\>)|(\sfrom\s(.*))/g,
			'message_return':'$1',
			'boots':true,
			'controller':'index',
			'action':'levelup_boost_claim'
		},
		'requestjobhelpshort':{
			'execute':1,
			'type':'jobs',
			'icon':'newyork',
			'replace_pattern':/(.in..(<[a-zA-Z\/][^]*>))/g,
			'message_data_pattern':/.*<span[^>]?class=\"good\"[^>]*>(\d+).*<\/span>.*?<strong class="money">\$([\+-]*\d+\,?\d*)<\/strong>.*/,
			'used_currency':'$',
			'message_return':'You received <b>$1</b> experience points and <b>$<span>$2</span></b>',
			'experience':'$1',
			'money':'$2',
			'controller':'job',
			'action':'give_help'
		},
		'requestjobhelpshort_cuba':{
			'execute':1,
			'type':'jobs',
			'icon':'cuba',
			'replace_pattern':/(.in.(<[a-zA-Z\/][^]*>))/g,
			'message_data_pattern':/.*<span[^>]?class=\"good\"[^>]*>(\d+).*<\/span>.*?<strong class="money">C\$([\+-]*\d+\,?\d*)<\/strong>.*/,
			'used_currency':'C$',
			'message_return':'You received <b>$1</b> experience points and <b>C$<span>$2</span></b>',
			'experience':'$1',
			'money':'$2',
			'controller':'job',
			'action':'give_help'
		},
		'moscow_social_job':{
			'execute':1,
			'type':'jobs',
			'icon':'moscow',
			'replace_pattern':/((<[a-zA-Z\/][^](.*?)>)|(.Mafia Wars:))/g,
			'message_data_pattern':/.*<span[^>]?class=\"good\"[^>]*>(\d+).*<\/span>.*?<strong class="money">R\$([\+-]*\d+\,?\d*)<\/strong>.*/,
			'used_currency':'R$',
			'message_return':'You received <b>$1</b> experience points and <b>R$<span>$2</span></b>',
			'experience':'$1',
			'money':'$2',
			'controller':'episode',
			'action':'give_help_moscow_social'
		},
		'give_help_moscow_social':{
			'execute':0,
			'type':'jobs',
			'icon':'atack',
			'controller':'',
			'action':''
		},
		'moscow_social_boss_job':{
			'execute':1,
			'type':'jobs',
			'icon':'moscow',
			'replace_pattern':/((<[a-zA-Z\/][^](.*?)>)|(.Mafia Wars:))/g,
			'message_data_pattern':/.*<span[^>]?class=\"good\"[^>]*>(\d+).*<\/span>.*?<strong class="money">R\$([\+-]*\d+\,?\d*)<\/strong>.*/,
			'used_currency':'R$',
			'message_return':'You received <b>$1</b> experience points and <b>R$<span>$2</span></b>',
			'experience':'$1',
			'money':'$2',
			'controller':'episode',
			'action':'give_help_moscow_boss'
		},
		'story_war_helped':{
			'execute':0,
			'type':'wars',
			'icon':'war',
			'replace_pattern':/(.in.(<[a-zA-Z\/][^]*>))/g,
			'controller':'war',
			'action':'view'
		},
		'story_war_declared':{
			'execute':0,
			'type':'wars',
			'icon':'war',
			'replace_pattern':/(.in.(<[a-zA-Z\/][^]*>))/g,
			'controller':'war',
			'action':'view'
		}
	},
	'errors':{
		0:{
			'error_pattern':/<span[^>]?class=\"bad\"[^>]*>(.*?)[\!.*].*<\/span>*/,
			'error_message':'$1!'
		},
		1:{
			'error_pattern':/(You are too late)[\!.*].*/,
			'error_message':'$1!'
		},
		2:{
			'error_pattern':/(You have already received your free boost)[\!.*].*/,
			'error_message':'$1!'
		},
		3:{
			'error_pattern':/<span[^>]?class=\"bad\"[^>]*>(.*?)[\!.*].*<\/span>.*/,
			'error_message':'$1!'
		}
	}
};

_appImg['bg'] = '<img src="data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q%3D%3D" />';
_appImg['beta'] = '<img src="data:image/gif;base64,R0lGODlhIwAOANU/AOvaPdWqAL6oANiuANi0APDTALOaAP/5knJoAPjEAPzoAPXaAFBIAP7bAPDYANatAO/FAJGFAO7KAN+9AOXDAOC2AP/sVPrgAOzRAMSvAB4bANS/AP/KAOXKAObAANa9AIx+ANS2AProO/nUAOq5AO3NAIR2APfucu28APDOAMyzAN3DAKKSAPLMALigANS5APjnAOTHAP/RANTAC9bHAIRvANq+ANvHAMu9AdGnAGBTAIJ7Bv/eDv/dCgAAAAAAACH5BAEAAD8ALAAAAAAjAA4AAAb/wJ/QRywaj8ikT8j09Z6Wp3RKrVKXwx5mgzttvq+Q+BUOEc7nwWP9COTevaUTcwOcDieRw4HpFwoYKSUpfy0SEBAShygkJBVxThsdIgcHDJcICwoGlwwmNp0MNQ0dDDoNMhwcCZA9Kh0XIic+CBk+EQoRPjgqHwUqCD4qLw0sGsIjq6xErjENMBY+DDsaNLm3ERkjDboXCxcaCOEjCSjLThkrCwsw0hEaETC6ESACLQUgPgsjHz4Z1AsgoEDRSoCNAg4u3FJw6YIuGAsOtcj3J1gRFhAcFQxRooQDHxoY+HCBTxoDBB4omPDRMZyDBRp0eKgwoJULFRRidBDA80UMRwoqXLgw4KJChRwGJgwwgJOCAAM0A8T54URABRsTsk54QWDAAAIVugYIwGbN2ABe3UzN8oSHW7dt38KVOxfu2iZK8urF8iMIADs%3D" />';
_appImg['atack'] = '<img src="data:image/gif;base64,R0lGODlhDQANANU/AKJRAP/LNP/dNP/KIv2uAMmHAOyXAP/pfP/eQ7VkAfisAEA8LOWNAP+9CkgkDeejAIhIA92OAP/ODmtEDf/EAf+9ADErHF02Df/PE/y3ALVrAGMyCv/mhk9LLyccFhsYGf/TJaeRO9PCav/fYqeWLP/UE//hRv+0DvC6QqeDDrWiHPecAP/GCtGeAoVXCvDcXKebSdOwWLF3CP/ic//sdvWnAIRuDWMtB3toDXYuAnU/CqJgAm9KDXBZDXtrLf///yH5BAEAAD8ALAAAAAANAA0AAAZ3wJ+wAxP+FiqjkkY6vnBK48HkEwl6xo4UIUCUbEJLaMbhjEASTBrd+qUGgQGLQs8UIB6hb9Co+CsPOx9CCzEBDRmJCg8FPEcoJzU1BAQ1ERo7Gi4yExc8BgYMEQk3Dg4bSisJEAkADlFCDDkfF66wFgl5PzqoQkEAOw%3D%3D" />';
_appImg['protect'] = '<img src="data:image/gif;base64,R0lGODlhEAAQAOZbAP///0OLy2Gi12qp2gwMDMbGxkSMy3t7e5+fnzAwMG9vb6KiolRUVH5+fvT4+1dXV/Pz8wYGBvf39yEhIfn5+be3t1FRUeTk5MnJydbW1ufn5+/1+ejw9hsbG1eEqGKm2VGX0S19wUeOyGmo2VGY0TiEyEh0mOfv9jeEyFyh1itVeTNghyFYhjRtl0VpiTtff4Whu32btl6i10KGuzhdfjlefT6JyjuGyC9zsEhrikSGvC11tXqatVF1kkqQxU2V0V1/m2mo2sva6GCEnz1ggOvx9oKgujJ8vurw9kOLyoulus3b6TuHyENpiEpsi+fv9ThihEmVz1+i1jyIyi1zrkGLyjFgiyx7wlKd0neUrF+CnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFsALAAAAAAQABAAAAezgFuCWwQWCBISCBYEg4MKFRQAABxPkhQVCo0aAA4cSh5WWScOABqNBQA5LT4yJTssLwAFjQsAUCRSI0lVTCoAC40HAC4gAgMGATc0AAeNDwBOP8bIKEQAD40JAEAi0wFHPQAJjQQAMDPeVDEAjI0XRjopQQE2ODwXjYIFSyZRH1NXVgiZla8BgA1DsIRosgFAg3yCGEAAoKUGAAgMIA6agKEIEgwTNDaKkCFDBJH5OnTQGAgAOw%3D%3D" />';
_appImg['newyork'] = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQfAKurq7y8vBEREbKyspqamkhISIWFhVxcXGZmZjIyMgYGBiQkJH9/f8bGxldXVzk5OURERFFRUdPT03FxcT4+Pra2tqenp6Kiop2dnUBAQNfX13d3d8DAwJCQkMnJyQAAACH5BAEAAB8ALAAAAAAQABAAAAV94CeOnyCQKHpsafsRleKSSsMl8/hoHIsKBQikUMBIAgAI5ZFImBABj0QjaVQG14shIvssDIBAYACwYBiRBUqBwFgsF8KGcmoZ4h0DAtdSWAgTBwgIDl0oGQATDwsUDnstEwwPJwIZDlxrBhmGCgkRdSMLhSkLD4YlpyQCMiEAOw%3D%3D" />';
_appImg['cuba'] = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQfANiJFm9HCwwIAjkrGLV0FOypReWSGNqUL/C4aKVpEZiBX+yjOu6uUoZVDUQrB+mYIj41KEc1G/PHhuacLyoaBOmdLphiD/TNku6yWlQ1CNulVVdFLH9hNIJaI9e0ggAAACH5BAEAAB8ALAAAAAAQABAAAAVw4CeOnyCQKLpxafsp2umOgoc58zhcWJIKEYgQopAwJpGB0mHqMBCSiwRRWFgPhICMQqgUGIvKA5CloAQNw+NhACQyshRhTG7gWoIDwNLoa1sRExYOFBkBdi0dBEwlhn8kAgRwNA6PIxSWl4yXcWcnIQA7" />';
_appImg['moscow'] = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAPlnSflkQ/dcNPZZLetaQfZXKfVVI+1TK/VSHfRPF/JOGPRMEexKGPJJDOtFC8tBMNo6CtI1CcsxCL8xGsAtEsIrB7ckBqsjFqMbDqkbBJ4bFKEWBJwWDJQNAoUEAf///yH5BAEHAB8ALAAAAAAQABAAAAVw4CeOn+eRKHpNafs9x+mOHjFs88gBQ5R6GI1Q8wgUFBiOcmOiFAQBQEBgQFgZEIusA0kYCojEwpHtoDyVxmLRcEQyshRkTK7gWh6GQ1Lpa1sYChIbHRkWdi0UEEwlhn8kHhBwNBuPIx2Wl4yXcWcnIQA7" />';
_appImg['war'] = '<img src="data:image/gif;base64,R0lGODlhEAAQANU/ANVbbJmZmkVHRikpKVVZWq2fnux4itCxt8fIx76WnBYWFjU1NYyNjaVweJOSlNxqdysVF3t6fgcGBnR0daOhp76/vnZze7lcZOaMmq6Bh7KtrpN8hIJCSaCXmIGFi6qurmVjYm1jZGhpapOLjHRoa1EpLnJvdt9KUeyQoZ+foLKJkeBpfE5QUO/w8FRJTOJTXpSVmudVZNHR0sdkb91wfICAgIR0d7t3g2VeZamnq7NWXPJugGRWXH9BR4BfXAAAACH5BAEAAD8ALAAAAAAQABAAAAaJwJ9wSCwaj0OJUFBTiByBQIohWAxSFeEA8SFUWjJExOKBRSZCBYlAGBU6HQvFQclFhJtXiMVAaDQmA0UDADsJAiA8LjgBCkUJJzE+IgsiCgMTSkMDNAYABJcDCgQOmkI2KwYNggsCLI5FGQ8oKrCmRTcPGAe3Rw0XM7xIQyU9HDrDQxDLvcnOQkEAOw%3D%3D" />';
_appImg['play'] = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGsSURBVDiNpZM/SyNBGMafmdsdljWXRq4QJaIHZkVsDItR7kMogoK94hUWV1x39V1xjSjBQg4/gfgZJI0QUttaBPHiJdlsloWZzLtjIRuzmHABB95i/ry/eZ73nWHGGLxnsK39/S8Afn/M5cr5fH6ipDAM0YuiWwDfLQAnRwcHpQ3fxwfOJwJQkuC2ViufX1ycWI7jlLxiEX87HSRJMhGAcw7P8+C6bskSQiCIIgzXQiqFp8dHzBUKYyExY3AcB5yIoLUGEQ2iLyXOKhVcX10h6vUye2mkORYAaK0zdK01pJS4qVZRq9exs72NldVVMMbeKLGMMSMBSikAgFIKfy4v4RWL2NvdRW6oU8aYFwVElK0yEaSUg7kQApu+j9mZGbTDMKtgnIVUwbrv4+vhIWKl0Gy3M+eMMaMtEBGmXBffjo/xeWkJrSB4432ggDEGrXWmQMK2UTk9xb8gwFOrNTIxbbtl2za63S5c1wUfeokPzebYW5MkQRzHEELAWpyfv2s0GsujWvS/sVAo3Fn+2tpPIvrR6nQWZL8/oAzjXhdZatF8mp6+55z/Yu/9zs+e29iUS1YO2wAAAABJRU5ErkJggg%3D%3D" />';
_appImg['stop'] = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFpSURBVDiNpZM/T8JAGMafO++apiALcYXgQl0hJJg4C4vEkRBXEr+Am7MOLmwOfAv8DqYJH4DVgcVEU6mlSdv741ALFqrB8E6Xy/P+8jzve0e01tinyOVgcAbg4bBYbJdKpZ2aPM/Dp+87AG4YgNH1cNg8bbVwQOlOAKkUnOm0/Tgej5hpmk27Xser60IptROAUgrbtmFZVpMZhoEP30c6i2C5xNNkktt40evBKhQSHSEwTRNMSgkhxEoURxGeHScX0O12IU1zHUVKMABZgBCIoigXEAuR0QIA01pnLoUQCMMwFyA2AFrrxIGUcm1LqV8dSKUyWgDbEeQfDmSeg80InHNc9fu5AM759gwIIRBCgBACINnxeaeTC/B8fxUhXTvjnGOxWMCyLNDvl/jmurmAtJRSCIIAhmGAHVers/l8fpI6+E/VKpUZazUad1LK23fXrYVxvKL8xK0vk5PBuT4ql18opfdk3+/8BarBtyUl0y8hAAAAAElFTkSuQmCC" />';
_appImg['reset'] = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIrSURBVDiNpZPPSxtBGIafGZN1q2kU1wY9lKTgj3hVRAuFeNfaePUu9Oapt156acVevPXgX2APgj1VzEWQIHhXEFIKCkYhJuuuyWYzu9NDzGrbi+AHL8x8wzy878eM0FrzlBL55eU3wNfnicRsMpl81KWbmxsc1z0EPsSAjfcrK1Ovp6fpkvJRgCAMOTw6mv22ubkRM01zKjs+zmW1ShiGhGHI6ekp5XKZpu+TTqfJpNOYphkBpJRks1l6enqmYoZhUHNdtNa4rkuhUKByfc1QKoXR3c3+/j57vk9ubo7RkZEIUhcC0zSJBUGAUgqtNT93d3Edh7fz81iDgwBorSkWixT29uhLJrEs6z5KECABlFKUSiV+lUrkcjn6+vtRSrXBSiG0pun7/NjZoXhwQOXqCqUUADGtNUopzs7OkFKSSqWiQ4AuKanf3mLXati1Go7jMDMzQ+vOtexYqTcatJQiCIK/5Lda5HI5pBA0Gg3yCwt4vk8QBO2BdiJYAwOULy4oX15G9juqN5vkFxeZGBvDGhq6j6c1shMhk8mQ6O3l+9YWjuP8B3mZTrO0tITneVEPQAohUEohpeRdPs/5+Tnr6+tsb29TqVSiKA3P49bzon0EiMfj2LaN7/sMDw+zurrKyOgoJ8fHXN1N+1/5vo9t2xiGgfi0tnb8LJGYEEI86hk/rGa9fhKbnpz8HATBx0q1+qrZakWUh7j7ZntlxOP6hWX9llJ+EU/9zn8AuNBXPy00JEcAAAAASUVORK5CYII%3D" />';
_appImg['totalreset'] = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHmSURBVDiNpZM9S1tRGMd/5+Tcm+RiQ1C6KnYxQkAwBKPtVPwADbUlKHQT+gW6dW6HLm4d3ApCaId8BJGSEglIwcG1Q5YOJU2MCTf3Oed2iObFFir4n87zPDz/l3M4Ko5j7gP1bHf3CfDhwdxcKZPJ3Gmp2+1y2es1gDcGOHi9v1/YLBZJaH0nAuscjWaz9PHw8MCkUqlCbmWFn+02zjkARAQAY8w/a601uVyOIAgKxvd9fvd63NyFiPC5WiWZTFIulwGo1WqEYcjLSmVM0leKVCqFsdaOFUSEL9Uq38/PR3UUAdA8OwPAWcuLKRJrLWbaohMhEiG6Xvx2ejqTPRLBiSBTPRPH8ZgAoFKp4BlDvdGYWX5cKvF8Zwd3LQQQx/HIgbV2ouIcYu3YxQ3EWsIoQt96qZkIsbXUajW+1uvcxvHJCSJCuVxGJRITB9MRPGOYz2YZDocAvNrbA+DT0REA89ksOpEgmopslFKICEoprLU83d4mHQQE6TT5tTUAgnSa/mDA5tYWgzAcqwMYz/PodDoEQYDWmksRihsbOOfoDwYArObzo9nVFcBo1u/j+z7m0dLSRavVWlVK/ZX7f1heXLwwxfX1d9bat7/a7eUwisYs03ST5ujke178cGHhh9b6vbrvd/4DZPfoqld/9XkAAAAASUVORK5CYII%3D" />';
_appImg['update'] = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANkSURBVDiNdVNfTFt1FP5+90/bW9py27UbtmxQVzXbXDPUbsm2B51ubL4QdWZ7QHlYTEb2NBMT8MGA0YwXEkmUEkckSmNctiaicQnJcMQI6wojSGB0lk6Bha6dQO9t7y29t70/X2TBJfuS83LO+U6+c3I+QinF0zA0NDwEAE1NjU1PbaKUPo5IJNoQj09nLl8ePAOASSTu64nEfb115JTj6/7vzsTj05lIJNqwlUO2Kmhu/uD1cLjnxtqaVJE3JP0a+cpC+Q3U230glEeuKGPq5/kLgxd+6v08+f7hXDEzTiil6O///oDb7Tarqlo6cuTgHdm6ynSvfIJa+3YIrAkWzgQra4bAmSCXSkgXHix7bK6dyUdxngAgw8O/pYPBvTsUpVipdtnY07dPwrHNDkKAmfw9MCAokzL22wMIOffBwvEo6Arm43ETSylFR8dnyp49e095PG62c/Rj3LUnkNPzmM/+aWz/Qxzz/lhvsS6arTnvCpEMCRzMUPQCmG2lTwmlFIQQZmQkVggE/MK7o41YcmXKMiulaiXH9Xtn0x8CwNudJ9foiX+cds4JjepQKyocTInjenr6Izdv3n6rpmaHoCgqqiGClh/GNbY06agyX9k8cKDqxc7SL+UvGg68ArfogYWtUudmEt9y09MzjKKU+bq63RBFG16qCiFD1h9kjIdzG6zu2hzQ4Dv0yPpCNVjGBimjYGZxlk8m7zKPV7h0qU/atWu3zbffTEfTv6Y79Y5mv+CSnhU8f4uwyueL3XO1O+ufm5pKkcW/UoX29vPVlFKDUEoRDg++SSl/zev1CX5/DVRh1cjKmcW8IXd7WZ8isq52j7smIEsqs7SUxfLyUrFSKZ1ubX3vOkMIISsr2V5RdAmqKhm5XB5uxssc9B+uO+p77cvnn9k34K8LBMp6hZFlBaoqGx6PR8hmV3sJIYSjlNLGxqazY2M3RLOZz128+NHvWklk86sqY7WaQQCsr+eYSqUCTStUBgbCRzVNE3nenKOU0v+9cl/fNy+HQocmJGmtbBgaDQaDJkIIZmfnNJ43EafTzcVi46Fz51rubHKYrcaKxca5yclYNhq90nL8+BtCKrWgLCwklWPHXhWuXv2hZWLiVjYWu8Vt5ZAn7UwIIfS/ZFdXVxQA2tra3nmytol/AQgLqPoZ9gARAAAAAElFTkSuQmCC" />';
_appImg['loader'] = '<img src="data:image/gif;base64,R0lGODlhEAALAPQAABgYGOjCITQvGD02GCglGOK9IOjCIcGiH31qHJmBHU9EGcurH6qPHXZlHJV+HUtBGcinH+S+IKeNHSonGDYxGCAeGLmcHjMtGCAfF1JHGmRWG0I6GSQiGAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA" />';
_appImg['boostepe'] = '<img src="data:image/gif;base64,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%3D%3D" />';
_appImg['boosthc'] = '<img src="data:image/gif;base64,R0lGODlhHgAeAPcAAAAAAGAYBOPKrSIiIo5pSiEJBH9SM0QeEXVzbWFCLbNuQhAAAEc0J8xmM3UUCLudgjcPB2BRQf///4RBI7mFY7mRbSofGWQ4IBINC6hvQ6WLdFxGM00xIffo2YAyD/uEP4FhRCMQCpJWL2IsFickIXVrXHlDJLZ/UVEgEaKBa5FFIgQHCGxjVkkMBBoGAox3Yk1MSDEPB8txPE5CNaVyVG5IL4pRLfn18XIoC5A7HJyUiUAmFy8eFC0uLGAfDVovHBcXESkDAMyZZuvezX1JK3xgRJNiPXM+ItGshDwXClErF0BBPGE6JiIVDYNSMoeDexYCAAgAABkPCX1eREoWB5xsQhAKB1hYVOR7PWw0GngeAHZBJZtxU6yEZmFHNzsgEr2OeaU+HOfWxstrOjQoIFM6KKmUfoJKKat3TH0rFSkKBItXNE0lFo0xF1g/LY1kQ5ddNLGkkXxNMzAZElUSASAUDlwnFAsNDlE2I0ohCD8NAG03HWEQCL+JWDYYECgGAK2Ma2QwGjoiGaNgPHokEBAQD3NWPXNEL3ApEUsmFIJcPSEKBUo3KGwhDVZGPFwyIhcSDr+Lar2iiXNKKTMzM4I3GqF4UadKJKyQdfjs1plrRxcJB3tFKGpURY5GJKBUOZ1JJZNwWtJ1Pz8sHy8eF2g9LigZEG9FNsCVcG46IAkIB0kgEZNqSFciEYJLMTAHAlVBMComIRocG31jTD0sH089L5NhQ5dbPCoTDVspHGI0I0Y6L2krEYtdPYw9GUooF0EQCT0nGj8XDVtHOW0/J/r6920YAH51athfL3AVCrWMY6VrSvfm3oIzGYZlTX9tWK2Ea2dhW0YKBYxQM34tCpI6HpxlPEIZCKyTgq55TllDNX1NN1IPB2AYBr6OYqyLcH5VN3RLLqh5Wf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAOMALAAAAAAeAB4AAAj/AAcIHEiwoMGDAwEoXMiwocOHAi08nEhxocBaFTM6FGiKVZEIElVppChQFZ5smoyMYtCEzMiNAwDEAgeHiJNwCXo1ifLSYkxBZZw4SZWKyAkjfng2XIFhosAojAigcZIlC7EfNt5IbKjAhAuRDQUCKKLM2hZegbw4WmWiVyyGTEQpKbVqU9gBs6bIyWDjAqxh2sjgatVrKwAZoFSR6fTIjxWfZWBxMXBkD5MfB0K4gJKECBCFWCrZXbGrVK45CsWqCsbKVapHbCCoWeRiQZILqr58sANloSoLUlIPsFKHRy9OWUawSaJGjYvnEFQgQ9boEIkVMEdJUXQG+YEYagqI/3++oNWlZmHGTIujI1pM4VEKaYKzZs8q2QWek1/Qhk81UNSIcYMAkhxTCABiReDNMlWYkIUwMeRHXgg+OMCNL7zkMAQSIlBxCjaFCLRBEUL0YQ1lrfxgB1Fs2EFIMtKkEYg' +
			'xYEjQQQV2JKLLC2KBUAUHpkCixBl7cIKHFUAMQkULjYyAwyc3SCBBMZlUEUUoAs3AShPYWWCBJUTssNA2niAyAiIBSCKljah8EcUpArkR3EJewCIIQ7HcQkgjEEShRBddOPNLDH4IUoNAITTEAAM8MHRHCt38EQUUUMzxCweMwNLJKHKI1RAQdTTF0DMTvLIApZSSUgYDIfzBhacMWWWAAXYMLXECHfpttsCuC7hSAqwLGULLQxr4osdmqEKxAArfhPgeQ5BA8hAMkWgBjH67/oAJJQg+O9ITkXigRxBB5GGLGT0I15NCCDxAAQ3ifMPCgequC4AsV1xBCVg+IeTvvwIFBAA7" />';
_appImg['boostm'] = '<img src="data:image/gif;base64,R0lGODlhHgAeAOYAAAAAAEEuGh8TCGYzM3tiSyIiIg4IAlY+IzEgEIhvV21YQko1IEI/PyofEysmJBQRETkpGWFOQDMzM5mBbR0TDRIOCQcEAVdBK3FaQ0s6KVpJOGVQOzctJEM0K4RZTH1nUF9KNSkbDjAjGCAfGks/Mk5IQ19WT1E8KRoOAyEWChAJBa1/cQkHBWpOQignKkIpGRcXGVtGMTsvJEs3IkU4KiAYFpJ5ZCgYChgQCDg5PG5SLykgGAkFAlkwL2BEOmNNOFRIPmZYSlJBL3tlTxYLAnJcRyYjI0IxIBoVEEIpIYJrU01DOVhMQYxyXWVSP45eU2tWS7GDdEU7MiUkJjcjESAYD0c5Ly0aF1RAK2pVQFlDL0EzMDEpIWlTPDcmJkpISRcUEGhNMFJKSm5bSY92X////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAGUALAAAAAAeAB4AAAf/gAWCg4SFhoeDAABcERkEGkIaHVYkXIqXmJkAggAcESIBWRoaCmNHIj8kmqubBRYVAFUxDDk5X0A/Mjg0HBasmJyKMhouNV4uSyBFsL+ZwQAxUh1RKz4PWEo0FTvcNc3PMVwdJCMRSBlkXSBDEzZNEd6rzxk7VwM9LTVCHz9dG0NKCBBQEM9ZgUsiRNTw8ARKDQ1BFmDZoGADiBhCjqjAhKPVJSQQwGxZMuKGGCZUYhAoAiIDhAVaIGy0QEOGx0szFOLAIcVEzBknMmQIIGJGkSIhaBQh0OCmoqAjqkgooeFIgBkuGzQIcWRDAiENYgTg4VRFgBM7mAg5MYNKAC1Z/wJovQHhhBIFCBB0dFpBxBEKOg4cyQsB24wbAgQgOJIFQ9NLz3BAABXmhIgGoDIk+HGDSIq8WAiIAHZQkdkQC45oSRFCxMsPCgSoUJF3AYEjpDERvfFlB5HWrj9kueHLAAIIXbTkvtRgshEHnhsgoCI8xaUUVLCcYAG5tKK+RypI2EmF9ZAYOy8hOOtL0TNFEI7gKKAihfUGH0QQgcAdgIHsezmlyGIVFACDAfAtgwIEVVy3wA7dZSLAAgLA4IIiPMzgBAACNNAeADxAQEOEmBgQQBUsXAgACqkAgEMImYSQQXvvwdeUAwNiACEODWJSxRE0enfJZJvAkgEG3AnAzE8lqJF4iQXxAQDDFCpkAUJiN2yECQJCOKmIBSKcoAILMOCQhXwCEPGhfwH80F+NOBxxwWMANLBkjAss0GONBoQQQoDNVEDBmO4hYuihgwQCADs%3D" />';
_appImg['header1'] = '<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4TIaaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA0LjIuMi1jMDYzIDUzLjM1MTczNSwgMjAwOC8wNy8yMi0xODoxMToxMiAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBGaXJld29ya3MgQ1M0PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDA5LTA5LTMwVDE3OjI0OjI5WjwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDA5LTA5LTMwVDE3OjI2OjM4WjwveG1wOk1vZGlmeURhdGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL2pwZWc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgIC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" />';
_appImg['header2'] = '<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4TIaaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA0LjIuMi1jMDYzIDUzLjM1MTczNSwgMjAwOC8wNy8yMi0xODoxMToxMiAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBGaXJld29ya3MgQ1M0PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDA5LTA5LTMwVDE3OjI1OjEzWjwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDA5LTA5LTMwVDE3OjI2OjQyWjwveG1wOk1vZGlmeURhdGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL2pwZWc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgIC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%3D%3D" />';
_appImg['header3'] = '<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4TIaaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA0LjIuMi1jMDYzIDUzLjM1MTczNSwgMjAwOC8wNy8yMi0xODoxMToxMiAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBGaXJld29ya3MgQ1M0PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDA5LTA5LTMwVDE3OjI1OjIxWjwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDA5LTA5LTMwVDE3OjI2OjQ1WjwveG1wOk1vZGlmeURhdGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL2pwZWc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
			'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7/2wBDAAICAgICAgICAgIDAgICBAUEAgIEBQYFBQUFBQYHBgYGBgYGBwcICAkICAcKCgsLCgoODg4ODg4ODg4ODg4ODg7/2wBDAQMDAwYFBgsHBwsODAoMDhEQEBAQEREODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wAARCAAZAVMDAREAAhEBAx' +
			'EB/8QAHQAAAgIDAQEBAAAAAAAAAAAAAgMBBAAFBggHCf/EADsQAAEDAwIFAQYEBAQHAAAAAAECAwQABREGIQcSEzFBIhQjMkJRcRVhgZEIJDOxFyVSoTRDYpLB0eH/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKhEBAAICAQMDAwMFAAAAAAAAAAECAxESBBMhMVGhFEFxBWGBIjJCkeH/2gAMAwEAAhEDEQA/APwYtrUR64W9m4LfbgOvNomOMJSp0IUoBRQlRSkqx2yRUtXqbXX8ONl07O0bC0pq+7ap/H76zY76qRbmoRhuvbp6YEp7q+lDh5jyj01U0Zxkclxr4T6P4XR9Nu6b1ndtYHUTslKJEu3N29tCIvIF4AkyFE8zgx4xv9KV6aXjybkHA3hBZ+LE7UKL9q+RpC22NMZDUmNCE516RLUsNoKFPx0oQA2oqWVbbbVNK7XlycW7408AZ3Cxi236wTLvrHQ8xIRO1U9bTERFklRCWnS27Ja5XR6mldT1jcDFK9NKxZtvg0M28Sopubshq19RP4i7GSlbyWs+stoWpKVKA7Akfesqw3tPh7HuX8MWjYd30bBg8Sr9PtupHZDd0u34Owj2JLMBU9Kw37aesFoG3qT+9dHZcv1Mn2f+GbRc/VV7sDvEjUce3wY9udsl8FnjH2ty4mQEoWyZw6IT0Dk8ysb5HbK7B/VS86SWtBCRfYllvl9nezzFNabnyWI7TciOOVIW+hDii0or5jspQCceTXNasO3HezvtR6J4U2+VChac4sP3tliyRpt9vJtqksquT0haFxIjTjjL3TbY5HOdQJPrGBgZqcUJr1U+xMXh7oRXTZe4xW1MhDim56G4Di0J9Sm+Zlan2+oApJUrIT6PUnmOEldkfW/s4m+We1WKbGi2vULGpmXojEiRNYRyJbecB6jB9awS2R8QOCCDtWWSunRhyc4awJQtKvG21Q2a8elWKDY2Euqf5TnpKx/sKaY8mJV7xSRjYD/ekqIWHQ9yIURhI+GkJgIeCCMKx+XimSyttt1vnRs4nuPzoDXe8aUeoNgfUKBoyalDyQ8yrtjnbPfJ2oNrFIKcoWCkijatMCR6U+Sae0ysnC0/THakNITzDcH7ihWllHPlXzEdk/8AulK4qpJlBcp9lPjt9x8VOY8M6W3eYU3rgtpxxtCeVQ25z2/aqr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%3D%3D" />';
_appImg['save'] = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZBJREFUeNqckz1LxEAQhmeTNGIjWliJIKKltWCjWAgWWihW1hYHgthb2Fmo1aE2dld5wtlZCFoINv4C/8EVnk0u2a8k7jvJHmejOQeGbDLvM7s7MxFFUdD5Taegf9jxwbYQZ812sbyyTr3PLm2tLtQCH54/aHJqmt5enyjIsoyMsWSNqQVDDy0YrKPMWveinZs/QWi0LrVgwEbIhI/wYcvznIW8oxPCsYZ7PdgImZSCK0JBEcC63MUwiGRwb4iDARtBxB8cmCQJpWlKUkpO5HdFYlgQBBSGIWv9JpHmBJKUg65bL7VbCEZzApdNSkVj4xMjzQAYsJHR5Qm8fbl5+M3iuM/Pmdk5Ajs4AcO9LjX210gIwQ7D/X0NUMgrd81+HA9OEKCSWit2FAZ2enlHt/fvg+rDfft8B6Avu+Aq7UFdtbIUKQbxbnnYypbqKsZdwCDZaro4gXsC8oNiq+R+oIaHiOPoQqd1ITb3Dov5xSVuC6CTo10Wx3xX+WMWdDVg7E4rfGBjpzHyL/3YbopvAQYALTKvvIqUmbwAAAAASUVORK5CYII%3D" />';

$(document).ready(function(){
	f_display(GM_getValue('display','home_stream'));
	st_events();
});

function f_display(){
	var f_arg = f_display.arguments
	switch(f_arg[0]){
		case 'home_stream':
			window_home_stream();
			break;
		case 'home_sidebar':
			window_home_sidebar();
			break;
		case 'tab_statistic':
			return tab_statistic();
			break;
		case 'tab_job_statistic':
			return tab_job_statistic(f_arg[1]);
			break;
		case 'tab_wars_statistic':
			return tab_wars_statistic();
			break;
		case 'tab_boost_statistic':
			return tab_boost_statistic();
			break;
		case 'tab_total_statistic':
			return tab_total_statistic();
			break;
		case 'tab_settings':
			return tab_settings();
			break;
		case 'tab_general_statistic':
			return tab_general_statistic();
			break;
		case 'tab_about':
			return tab_about();
			break;
		default:
			window_home_stream();
	}
}

function window_home_stream(){
	var _cs = '<div id="w-help-block0" style="background:#000000 url(' + stripURI(_appImg['bg']) + ') left top no-repeat">' + createTabs(_set.menu) + '</div>';
	$('#home_stream > div').prev('div:first').after(_cs);
	$('#home_stream > div:first').after(_cs);
	$('#w-help-block0').append(app_ver());
	$('#w-help-block0').append(app_control());
	$('#w-help-block0').append(app_log());
}

function createTabs(obj){
	if (count(obj) > 0){
		var _obj = '<ul>';
		for ( var i in obj ){
			_obj += '<li><a href="#' + i + '">' + obj[i].name + '</a></li>';
		}
		_obj += '</ul>';
		for ( var i in obj ){
			if (obj[i].type != undefined){
				if (obj[i].type == 'job'){
					_obj += '<div id="' + i + '" style="background:#181818 url(' + stripURI(_appImg['header' + obj[i].city]) + ') left bottom no-repeat">' + createTabsBody(obj[i].body,obj[i].type,obj[i].city) + '</div>';
				}
			}else{
				_obj += '<div id="' + i + '">' + createTabsBody(obj[i].body) + '</div>';
			}
		}
	}
	return _obj;
}

function createTabsBody(_bf,_ty,_ci){
	if (_ty){
		if (_ty == 'job'){
			if (typeof _bf == 'string' && eval('typeof ' + _bf) == 'function') {
				return f_display(_bf,_ci);
			}else{
				return 'No content for this tab. Coming soon. Look for updates.';
			}
		}
	}else{
		if (typeof _bf == 'string' && eval('typeof ' + _bf) == 'function') {
			return f_display(_bf);
		}else{
			return 'No content for this tab. Coming soon. Look for updates.';
		}
	}
}

function app_ver(){
	var _app_ver = '<div id="w-help-appver-box" style="background: transparent url(' + stripURI(_appImg['beta']) + ') 99% center no-repeat;"><div id="w-help-appver">version: ' + _set.app.version + '</div></div>';
	return _app_ver;
}

function app_control(){
	var _app_control = '<div id="w-help-appcontrol-box">' + 
	'<div id="w-help-appcontrol-title"><b>Control</b></div>' + 
	'<div id="w-help-appcontrol-control"><span id="w-help-blink">stoped</span>' + 
	'<img src="' + stripURI(_appImg['totalreset']) + '" alt="total reset" title="total reset" border="0" id="w-help-total-reset" class="w-help-appcontrol-button">' +
	'<img src="' + stripURI(_appImg['reset']) + '" alt="reset" title="reset" border="0" id="w-help-reset" class="w-help-appcontrol-button">' +
	'<img src="' + stripURI(_appImg[GM_getValue('startstop', 'stop')]) + '" alt="' + GM_getValue('startstop', 'stop') + '" title="' + GM_getValue('startstop', 'stop') + '" border="0" id="w-help-start-stop" class="w-help-appcontrol-button">' +
	'</div>' + 
	'</div>';
	return _app_control;
}

function app_log(){
	var _app_log = '<div id="w-help-log-box">' + 
	'<div id="w-help-log-title"><b>Action log</b></div>' + 
	'<div id="w-help-log-content"></div>' + 
	'</div>';
	return _app_log;
}

function tab_statistic(){
	var _tab_statistic = '<div id="w-help-s-body">' + createTabs(_set.stat) + '</div>';
	return _tab_statistic;
}

function tab_job_statistic(city){
	var _tab_job_statistic = '<table width="100%" border="0" cellspacing="2" cellpadding="0"><tbody><tr><td width="150" align="left" valign="middle">&nbsp;</td><td width="70" align="center" valign="middle" class="center"><b>Times</b></td><td align="center" valign="middle" class="center"><b>Total times</b></td></tr><tr><td width="150" align="left" valign="middle" class="w-help-good">Success</td>' +
	'<td width="70" align="center" valign="middle" class="w-help-good center" id="jobs_' + city + '_success_value">' + GM_getValue('jobs_' + city + '_success_value',0) + '</td>' +
	'<td align="center" valign="middle" class="w-help-good center" id="jobs_' + city + '_success_total">' + GM_getValue('jobs_' + city + '_success_total',0) + '</td>' +
	'</tr><tr><td width="150" align="left" valign="middle" class="w-help-bad">Unsuccess</td>' +
	'<td width="70" align="center" valign="middle" class="w-help-bad center" id="jobs_' + city + '_unsuccess_value">' + GM_getValue('jobs_' + city + '_unsuccess_value',0) + '</td>' +
	'<td align="center" valign="middle" class="w-help-bad center" id="jobs_' + city + '_unsuccess_total">' + GM_getValue('jobs_' + city + '_unsuccess_total',0) + '</td>' +
	'</tr><tr><td width="150" align="left" valign="middle" class="w-help-percent">Percent</td>' +
	'<td width="70" align="center" valign="middle" class="w-help-percent center"><span id="jobs_' + city + '_percent_value">' + GM_getValue('jobs_' + city + '_percent_value',0) + '</span>%</td>' +
	'<td align="center" valign="middle" class="w-help-percent center"><span id="jobs_' + city + '_percent_total">' + GM_getValue('jobs_' + city + '_percent_total',0) + '</span>%</td>' +
	'</tr><tr><td width="150" align="left" valign="middle">Experience</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="jobs_' + city + '_experience_value">' + GM_getValue('jobs_' + city + '_experience_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="jobs_' + city + '_experience_total">' + GM_getValue('jobs_' + city + '_experience_total',0) + '</td>' +
	'</tr><tr><td width="150" align="left" valign="middle">Money</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="jobs_' + city + '_money_value">' + GM_getValue('jobs_' + city + '_money_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="jobs_' + city + '_money_total">' + GM_getValue('jobs_' + city + '_money_total',0) + '</td>' +
	'</tr></tbody></table>';
	return _tab_job_statistic;
}

function tab_wars_statistic(){
	var _tab_wars_statistic = '<table width="100%" border="0" cellspacing="2" cellpadding="0"><tbody><tr><td width="150" align="left" valign="middle">&nbsp;</td><td width="70" align="center" valign="middle" class="center"><b>Times</b></td><td align="center" valign="middle" class="center"><b>Total times</b></td></tr><tr><td width="150" align="left" valign="middle" class="w-help-good">Win</td>' +
	'<td width="70" align="center" valign="middle" class="w-help-good center" id="wars_success_value">' + GM_getValue('wars_success_value',0) + '</td>' +
	'<td align="center" valign="middle" class="w-help-good center" id="wars_success_total">' + GM_getValue('wars_success_total',0) + '</td>' +
	'</tr><tr><td width="150" align="left" valign="middle" class="w-help-bad">Lost</td>' +
	'<td width="70" align="center" valign="middle" class="w-help-bad center" id="wars_unsuccess_value">' + GM_getValue('wars_unsuccess_value',0) + '</td>' +
	'<td align="center" valign="middle" class="w-help-bad center" id="wars_unsuccess_total">' + GM_getValue('wars_unsuccess_total',0) + '</td>' +
	'</tr><tr><td width="150" align="left" valign="middle">Experience</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="wars_experience_value">' + GM_getValue('wars_experience_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="wars_experience_total">' + GM_getValue('wars_experience_total',0) + '</td>' +
	'</tr></tbody></table>';
	return _tab_wars_statistic;
}

function tab_boost_statistic(){
	var _tab_boost_statistic = '<table width="100%" border="0" cellspacing="2" cellpadding="0"><tbody><tr><td width="150" align="left" valign="middle">&nbsp;</td><td width="70" align="center" valign="middle" class="center"><b>Times</b></td><td align="center" valign="middle" class="center"><b>Total times</b></td></tr><tr><td width="150" height="30" align="left" valign="middle" style="background:url(' + stripURI(_appImg['boosthc']) + ') left center no-repeat" class="padingleft35">Hot Coffee</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="boots_hc_value">' + GM_getValue('boots_hc_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="boots_hc_total">' + GM_getValue('boots_hc_total',0) + '</td>' +
	'</tr><tr><td height="30" width="150" align="left" valign="middle" style="background:url(' + stripURI(_appImg['boostm']) + ') left center no-repeat" class="padingleft35">Mutt</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="boots_m_value">' + GM_getValue('boots_m_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="boots_m_total">' + GM_getValue('boots_m_total',0) + '</td>' +
	'</tr><tr><td height="30" width="150" align="left" valign="middle" style="background:url(' + stripURI(_appImg['boostepe']) + ') left center no-repeat" class="padingleft35">Extra Pair of Eyes</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="boots_epe_value">' + GM_getValue('boots_epe_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="boots_epe_total">' + GM_getValue('boots_epe_total',0) + '</td>' +
	'</tr></tbody></table>';
	return _tab_boost_statistic;
}

function tab_total_statistic(){
	var _tab_total_statistic = '<table width="100%" border="0" cellspacing="2" cellpadding="0"><tbody><tr><td width="150" align="left" valign="middle">&nbsp;</td><td width="70" align="center" valign="middle" class="center"><b>Count</b></td><td align="center" valign="middle" class="center"><b>Total count</b></td></tr><tr><td width="150" align="left" valign="middle">Experience points</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="experience_points_value">' + GM_getValue('experience_points_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="experience_points_total">' + GM_getValue('experience_points_total',0) + '</td>' +
	'</tr><tr><td width="150" align="left" valign="middle">Boosts</td>' +
	'<td width="70" align="center" valign="middle" class="center" id="boosts_points_value">' + GM_getValue('boosts_points_value',0) + '</td>' +
	'<td align="center" valign="middle" class="center" id="boosts_points_total">' + GM_getValue('boosts_points_total',0) + '</td>' +
	'</tr></tbody></table>';
	return _tab_total_statistic;
}

function tab_settings(){
	var _tab_settings = '<div id="w-help-se-body">' + createTabs(_set.sett) + '</div>';
	return _tab_settings;
}

function tab_general_statistic(){
	var checked_perday = parseInt(GM_getValue('perday', 1),10) == 1 ? ' checked' : '' ;
	var checked_viewactionlog = parseInt(GM_getValue('view_action_log', 1),10) ==  1 ? ' checked' : '' ;
	var _tab_general_statistic = '<table width="100%" border="0" cellspacing="2" cellpadding="0"><tbody><tr>' +
	'<td width="30" align="left" valign="middle" class="center"><input type="text" name="get_news_interval" id="get_news_interval" value="' + GM_getValue('get_news_interval', 5) + '" size="2" maxlength="3" class="w-help-input num" /></td>' +
	'<td align="left" valign="middle">&nbsp;-&nbsp;Wall events refreshing interval in seconds from 1 to 999.</td>' +
	'</tr><tr>' +
	'<td width="30" align="left" valign="middle" class="center"><input type="text" name="log_size" id="log_size" value="' + GM_getValue('log_size', 10) + '" size="2" maxlength="3" class="w-help-input num" /></td>' +
	'<td align="left" valign="middle">&nbsp;-&nbsp;Number of records in <b>Action log</b> from 1 to 999.</td>' +
	'</tr><tr>' +
	'<td width="30" align="left" valign="middle"><input type="checkbox" name="perday" id="perday" value="1"' + checked_perday + '></td>' +
	'<td align="left" valign="middle">&nbsp;-&nbsp;Don\'t calculate if you help 25 friends per day per city.</td>' +
	'</tr><tr>' +
	'<td width="30" align="left" valign="middle"><input type="checkbox" name="view_action_log" id="view_action_log" value="1"' + checked_viewactionlog + '></td>' +
	'<td align="left" valign="middle">&nbsp;-&nbsp;Show <b>Action log</b>.</td>' +
	'</tr></tbody></table>' +
	'<hr>' +
	'<span id="general_save" class="w-help-button" style="background:#000000 url(' + stripURI(_appImg['save']) + ') 2px center no-repeat">save General settings</span>';
	return _tab_general_statistic;
}

function tab_about(){
	var _tab_about = '<div id="w-help-about">';
	for ( var i in _set.app ){
		if (i != 'url'){
			_tab_about += '<div><b>' + i + ':</b>&nbsp;' + _set.app[i] + '</div>';
		}
	}
	_tab_about += '<br><br>' +
	'<span id="w-help-update" class="w-help-button" style="background:#000000 url(' + stripURI(_appImg['update']) + ') 2px center no-repeat">check for Updates</span>' +
	'</div>';
	return _tab_about;
}






function st_events(){
	$('#w-help-blink').css('visibility','hidden');
	$('#w-help-block0 > ul').tabs({fx:{opacity:'toggle'}});
	$('#w-help-s-body > ul').tabs({fx:{opacity:'toggle'}});
	$('#w-help-se-body > ul').tabs({fx:{opacity:'toggle'}});
	if (GM_getValue('startstop', 'stop') == 'stop'){
		loadEvents();
		getNewsData = window.setInterval(loadEvents, (parseInt(GM_getValue('get_news_interval', 5)) * 1000));
	}

	var w_help_reset = document.getElementById('w-help-reset');
	w_help_reset.addEventListener('click',function(){
		if (window.confirm('Are you sure you want to reset primary count points?\n')) {
			w_help_resetValue('value');
		}
	},false);
	
	var w_help_total_reset = document.getElementById('w-help-total-reset');
	w_help_total_reset.addEventListener('click',function(){
		if (window.confirm('Are you sure you want to reset total count points?\n')) {
			w_help_resetValue('value');
			w_help_resetValue('total');
		}
	},false);
	
	if (GM_getValue('startstop', 'stop') == 'play'){
		blink($('#w-help-blink'),500,true);
	}else{
		loadEvents();
	}

	var w_help_start_stop = document.getElementById('w-help-start-stop');
	w_help_start_stop.addEventListener('click',function(){
		if (GM_getValue('startstop', 'stop') == 'stop'){
			GM_setValue('startstop', 'play');
			$('#w-help-start-stop').attr('src',stripURI(_appImg['play']));
			blink($('#w-help-blink'),500,true);
			clearTimeout(getNewsData);
		}else{
			GM_setValue('startstop', 'stop');
			$('#w-help-start-stop').attr('src',stripURI(_appImg['stop']));
			blink($('#w-help-blink'),500,false);
			$('#w-help-blink').css('visibility','hidden');
			loadEvents();
		}
	},false);

	var w_help_update = document.getElementById('w-help-update');
	w_help_update.addEventListener('click',function(){
		$('<br><br><div id="w-help-update-label" style="background:url(' + stripURI(_appImg['loader']) + ') left center no-repeat">&nbsp;</div>').insertAfter('#w-help-update');
		GM_xmlhttpRequest({
			method: 'GET',
			url: _set.app.url + '?source',
			onload: function(response){
				if (response.status != 200){
					return;
				}
				var r_version = response.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';
				if (r_version != _set.app.version) {
					var _mess = 'Version ' + r_version + ' is available! If you want to upgrade click <a href="' + _set.app.url + '">here</a>';
				} else {
					var _mess = 'You already have the latest version.';
				}
				$('#w-help-update-label').css('background','none').html(_mess);
			}
		});
	},false);

	var general_save = document.getElementById('general_save');
	general_save.addEventListener('click',function(){
		if ($('#perday').is(':checked')){
			GM_setValue('perday', 1);
			$('#perday').attr('checked', true);
		}else{
			GM_setValue('perday', 0);
			$('#perday').attr('checked', false);
		}
		if ($('#view_action_log').is(':checked')){
			GM_setValue('view_action_log', 1);
			$('#view_action_log').attr('checked', true);
			$('#w-help-log-box').show();
		}else{
			GM_setValue('view_action_log', 0);
			$('#view_action_log').attr('view_action_log', false);
			$('#w-help-log-box').hide();
		}
		GM_setValue('get_news_interval', $('#get_news_interval').val());
		GM_setValue('log_size', $('#log_size').val());
		alert('General settings save success.');
	},false);

	$(".num").keypress(function (e){ 
		if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57) && e.which!=46 && e.which!=44){
			return false;
		}
	});
}

function w_help_resetValue(type){
	for ( var i in _set ){
		if (isArray(_set[i]) && count(_set[i]) > 0){
			if (i == 'jobs'){
				var _set_c = _set[i].city;
				for ( var jc in _set_c ){
					var _set_t = _set_c[jc].type;
					for ( var jt in _set_t ){
						GM_setValue(i + '_' + jc + '_' + jt + '_' + type,0);
						$('#' + i + '_' + jc + '_' + jt + '_' + type).html(GM_getValue(i + '_' + jc + '_' + jt + '_' + type,0));
					}
				}
			}else if (i == 'boots' || i == 'wars'){
				var _set_b = _set[i]
				for ( var jc in _set_b ){
					GM_setValue(i + '_' + jc + '_' + type,0);
					$('#' + i + '_' + jc + '_' + type).html(GM_getValue(i + '_' + jc + '_' + type,0));
				}
			}
		}
	}
	GM_setValue('experience_points_' + type,0);
	GM_setValue('boosts_points_' + type,0);
	$('#experience_points_' + type).html(GM_getValue('experience_points_' + type,0));
	$('#boosts_points_' + type).html(GM_getValue('boosts_points_' + type,0));
}

function loadEvents(){
	var url = _set.url.link + '?' + _set.url.query.replace("{0}", timestamp());
//	clearTimeout(getNewsData);
	GM_xmlhttpRequest({
		url: url,
		method: 'get',
		onload: function(response){
			eval('var _rad = ' + response.responseText.split('for (;;);')[1] + ';');
			$('.UIStory', _rad.payload.html).each(function(i){
				var _tmp_array = {'user':{'name':'','link':''},'action':{'query':{'ztrack_category':''},'store':''}};
				$(this).children().each(function(q){
					if ($(this).hasClass('commentable_item') || $(this).hasClass('UIIntentionalStory_Header')){
						$(this).remove();
					}else if ($(this).hasClass('UIIntentionalStory_Pic')){
						_tmp_array['user'] = {'name':$(this).attr('title'),'link':$(this).attr('href'),'photo':$(this).find('img').attr('src')};
						$(this).remove();
					}else if ($(this).hasClass('UIStoryAttachment')){
						_tmp_array['action'] = {'query':getArgs($(this).children('.UIStoryAttachment_Media').find('a').attr('href')),'store':$(this).children('.UIStoryAttachment_Copy').find('div').html()};
					}
				});
				if (_tmp_array.action != '' && _tmp_array.action.query != '' && _tmp_array.action.query.ztrack_category != ''){
						if (_set.actions[_tmp_array.action.query.ztrack_category] != undefined){
							if (_set.actions[_tmp_array.action.query.ztrack_category].execute != undefined && _set.actions[_tmp_array.action.query.ztrack_category].execute == 1 && !_act_array[_tmp_array.action.query.sendkey]){
								_act_array[_tmp_array.action.query.sendkey] = _tmp_array;
							}
						}
				}
			});
		},
		onerror: function(response){
			alert(response);
		}
	});
	actionEvents();

}

function actionEvents(){
	for ( var i in _act_array ){
		if (_act_do_array[_act_array[i].action.query.sendkey] == undefined){
			_act_do_array[_act_array[i].action.query.sendkey] = {'start':1};
			var _rm1 = _set.actions[_act_array[i].action.query.ztrack_category].replace_pattern != undefined ? _act_array[i].action.store.replace(_set.actions[_act_array[i].action.query.ztrack_category].replace_pattern,'') : _act_array[i].action.store ;
			var _reg = new RegExp('(' + _act_array[i].user.name.split(' ')[0] + ')', 'gi');
			var _na = _act_array[i].user.name.split(' ')[0];
			_rm = _rm1.replace(_reg,'<a href="' + _act_array[i].user.link + '" target="_blank">$1</a>');
			var _im = _set.actions[_act_array[i].action.query.ztrack_category].icon != undefined ?  ' style="background:url(' + stripURI(_appImg[_set.actions[_act_array[i].action.query.ztrack_category].icon]) + ') left center no-repeat"': '' ;
			var _el_msg = '<div class="w-help-log-content-element" id="el_' + _act_array[i].action.query.sendkey + '"' + _im + '>' + 
			'<span class="w-help-time w-help-good">' + currentTime() + '</span>&nbsp;-&nbsp;' + _rm + '&nbsp;<span class="w-help-time w-help-percent">(in&nbsp;action...)</span>' + 
			'</div>';
			if ($('.w-help-log-content-element').length <= 0){
				$('#w-help-log-content').append(_el_msg);
			}else{
				$(_el_msg).insertBefore('.w-help-log-content-element:first');
			}
			if ($('.w-help-log-content-element').length > parseInt(GM_getValue('log_size', 10),10)){
				$('.w-help-log-content-element:last').remove();
//				//delete _act_array[_act_array[i].action.query.sendkey];
//				//delete _act_do_array[_act_array[i].action.query.sendkey];
			}
			loadActionPage(i);
		}
	}
}

function loadActionPage(id){
	eval('var param_array = ' + _act_array[id].action.query.next_params + ';');
	var query_link = '';
	for ( var i in param_array){
		query_link += '&' + i +'=' + param_array[i];
	}
	var action_link = _set.url.action_url + '?xw_controller=' + _set.actions[_act_array[id].action.query.ztrack_category].controller + '&xw_action=' + _set.actions[_act_array[id].action.query.ztrack_category].action + query_link;
	GM_xmlhttpRequest({
		url: action_link,
		method: 'get',
		onload: function(response){
			var _mb = /<td[^>]?class=\"message_body\"[^>]*>(.*?)<\/td>/.exec(response.responseText.toString());
			if (_mb){
				var error_message = checkError(_mb[1]);
				var experience = 0;
				var money = 0;
				var boots = '';
				if (!error_message){
					var success_message = _mb[1].replace(_set.actions[_act_array[id].action.query.ztrack_category].message_data_pattern, _set.actions[_act_array[id].action.query.ztrack_category].message_return);
					experience = _set.actions[_act_array[id].action.query.ztrack_category].experience != undefined ? parseInt(_mb[1].replace(_set.actions[_act_array[id].action.query.ztrack_category].message_data_pattern, _set.actions[_act_array[id].action.query.ztrack_category].experience)) : 0 ;
					money = _set.actions[_act_array[id].action.query.ztrack_category].money != undefined ? parseInt(_mb[1].replace(_set.actions[_act_array[id].action.query.ztrack_category].message_data_pattern, _set.actions[_act_array[id].action.query.ztrack_category].money).replace(',','')) : 0 ;
					boots = _set.actions[_act_array[id].action.query.ztrack_category].boots != undefined ? success_message : '' ;
					calculateAll(id,experience,money,boots,'success',error_message);
					$('#el_' + id).find('span:last').removeClass('w-help-percent').addClass('w-help-good').html('(<b>Success:</b> ' + success_message + '.)');
				}else{
					calculateAll(id,experience,money,boots,'unsuccess',error_message);
					$('#el_' + id).find('span:last').removeClass('w-help-percent').addClass('w-help-bad').html('(<b>Unsuccess:</b> ' + error_message + '.)');
				}
			}else if (!_mb && _set.actions[_act_array[id].action.query.ztrack_category].controller == 'war'){
				var html = $('<div>').append(response.responseText.toString()).remove().html();
				var tmp_array = new Object;
				var w = 0;
				if ($('#app' + _set.app_id + '_inner_page',html).find('a').length) {
					$('#app' + _set.app_id + '_inner_page',html).find('a').each(function(i){
						if ($(this).attr('href') != '#'){
							var link_tmp_array = getArgs($(this).attr('href').replace('&amp;','&'));
							if (link_tmp_array['xw_controller'] == 'war' && link_tmp_array['xw_action'] == 'attack'){
								tmp_array[w] = link_tmp_array;
								tmp_array[w]['link'] = $(this).attr('href');
								w++;
							}
						}
					});
				}
				if (w > 0){
//					warAction(id,tmp_array[0].link);
					warAction(id,tmp_array[count(tmp_array) - 2].link);
				}else{
					$('#el_' + id).find('span:last').removeClass('w-help-percent').addClass('w-help-bad').html('(<b>Unsuccess:</b> You are too late.)');
				}
			}
		}
	});
}

function warAction(id,link){
	GM_xmlhttpRequest({
		url: link,
		method: 'get',
		onload: function(response){
			var _mb = /<td[^>]?class=\"message_body\"[^>]*>(.*?)<\/td>.*/.exec(response.responseText.toString());
			if (_mb){
				var answer_array = /<div\b[^>]*>(.*)<span\b[^>]*>([A-Za-z]*)<\/span>[^>]*?(.*?)[.?!].*<span\b[^>]*>(\d+).*<\/span>[^>]*?(.*?)[.?!].*/.exec(_mb[1]);
				if (answer_array){
					if (answer_array[2] == 'WON'){
						var returned_message = _mb[1].replace(/<div\b[^>]*>(.*)<span\b[^>]*>([A-Za-z]*)<\/span>[^>]*?(.*?)[.?!].*<span\b[^>]*>(\d+).*<\/span>[^>]*?(.*?)[.?!].*/,'$1<b>$2</b>$3 and you gained $4$5.');
						var war_action = 'success';
					}else{
						var returned_message = _mb[1].replace(/<div\b[^>]*>(.*)<span\b[^>]*>([A-Za-z]*)<\/span>[^>]*?(.*?)[.?!].*<span\b[^>]*>(\d+).*<\/span>[^>]*?(.*?)[.?!].*/,'$1<b class="w-help-bad">$2</b>$3 and you gained $4$5.');
						var war_action = 'unsuccess';
					}
					var experience = parseInt(answer_array[4],10);
					calculateAll(id,experience,0,'',war_action,returned_message,'war');
				}else{
					var answer_array = /.*<span\b[^>]*>([A-Za-z]*)<\/span>[^>]*?(.*?)[.?!].*<span\b[^>]*>(\d+).*<\/span>[^>]*?(.*?)[.?!].*/.exec(_mb[1]);
					if (answer_array){
						if (answer_array[1] == 'WON'){
							var returned_message = answer_array[1].replace(/.*<span\b[^>]*>([A-Za-z]*)<\/span>[^>]*?(.*?)[.?!].*<span\b[^>]*>(\d+).*<\/span>[^>]*?(.*?)[.?!].*/,'You <b>$1</b>$2 and gained $3$4.');
							var war_action = 'success';
						}else{
							var returned_message = answer_array[1].replace(/.*<span\b[^>]*>([A-Za-z]*)<\/span>[^>]*?(.*?)[.?!].*<span\b[^>]*>(\d+).*<\/span>[^>]*?(.*?)[.?!].*/,'You <b class="w-help-bad">$1</b>$2 and gained $3$4.');
							var war_action = 'unsuccess';
						}
						calculateAll(id,experience,0,'',war_action,returned_message,'war');
					}else{
						$('#el_' + id).find('span:last').removeClass('w-help-percent').addClass('w-help-bad').html('(<b>Unsuccess:</b> ' + _mb[1] + ')');
					}
				}
			}else{
				$('#el_' + id).find('span:last').removeClass('w-help-percent').addClass('w-help-bad').html('(<b>Unsuccess:</b> Unknown error.)');
			}
		},
		onerror: function(response){
			alert(response);
		}
	});
}

function calculateAll(id,experience,money,boots,result,error_message,help_type){
	if (help_type == 'war'){
		var wars_value = (parseInt(GM_getValue('wars_' + result + '_value',0),10) + 1);
		var wars_total = (parseInt(GM_getValue('wars_' + result + '_total',0),10) + 1);
		var wars_experience_value = (parseInt(GM_getValue('wars_experience_value',0),10) + experience);
		var wars_experience_total = (parseInt(GM_getValue('wars_experience_total',0),10) + experience);
		GM_setValue('wars_' + result + '_value',wars_value);
		GM_setValue('wars_' + result + '_total',wars_total);
		GM_setValue('wars_experience_value',wars_experience_value);
		GM_setValue('wars_experience_total',wars_experience_total);
		$('#wars_' + result + '_value').html(GM_getValue('wars_' + result + '_value',0));
		$('#wars_' + result + '_total').html(GM_getValue('wars_' + result + '_total',0));
		$('#wars_experience_value').html(GM_getValue('wars_experience_value',0));
		$('#wars_experience_total').html(GM_getValue('wars_experience_total',0));
		var total_experience_value = (parseInt(GM_getValue('experience_points_value',0),10) + experience);
		var total_experience_total = (parseInt(GM_getValue('experience_points_total',0),10) + experience);
		GM_setValue('experience_points_value',total_experience_value);
		GM_setValue('experience_points_total',total_experience_total);
		$('#experience_points_value').html(GM_getValue('experience_points_value',0));
		$('#experience_points_total').html(GM_getValue('experience_points_total',0));
		$('#el_' + id).find('span:last').removeClass('w-help-percent').addClass('w-help-good').html('(<b>Success:</b> ' + error_message + ')');
	}else{
		eval('var param_array = ' + _act_array[id].action.query.next_params + ';');
		if (_set[_set.actions[_act_array[id].action.query.ztrack_category].type] != undefined){
			var type = _set.actions[_act_array[id].action.query.ztrack_category].type;
			var city = param_array.job_city;
			if (type == 'jobs'){
				var type_array = _set[type].city[city].type;
				for ( var i in type_array){
					if (type_array[i].formula_value == undefined && type_array[i].formula_total == undefined){
						for ( var q in type_array[i]){
							if (q != 'active' && q != 'formula_value' && q != 'formula_total'){
								if (i == 'experience'){
									var experience_points = (parseInt(GM_getValue(type + '_' + city + '_' + i + '_' + q,0),10) + experience);
									var total_experience_points = (parseInt(GM_getValue('experience_points_' + q,0),10) + experience);
									GM_setValue(type + '_' + city + '_' + i + '_' + q,experience_points);
									GM_setValue('experience_points_' + q,total_experience_points);
									$('#' + type + '_' + city + '_' + i + '_' + q).html(GM_getValue(type + '_' + city + '_' + i + '_' + q,0));
									$('#experience_points_' + q).html(GM_getValue('experience_points_' + q,0));
								}else if (i == 'money'){
									var money_points = (parseInt(GM_getValue(type + '_' + city + '_' + i + '_' + q,0),10) + money);
									GM_setValue(type + '_' + city + '_' + i + '_' + q,money_points);
									$('#' + type + '_' + city + '_' + i + '_' + q).html(GM_getValue(type + '_' + city + '_' + i + '_' + q,0));
								}else if (i == result){
									if (result == 'unsuccess'){
										if (parseInt(GM_getValue('perday', 1),10) == 1 && error_message != 'Sorry, you can only help 25 friends per day per city'){
											var jobs_points = (parseInt(GM_getValue(type + '_' + city + '_' + i + '_' + q,0),10) + 1);
											GM_setValue(type + '_' + city + '_' + i + '_' + q,jobs_points);
										}else if (parseInt(GM_getValue('perday', 1),10) != 1){
											var jobs_points = (parseInt(GM_getValue(type + '_' + city + '_' + i + '_' + q,0),10) + 1);
											GM_setValue(type + '_' + city + '_' + i + '_' + q,jobs_points);
										}
									}else if (result == 'success'){
										var jobs_points = (parseInt(GM_getValue(type + '_' + city + '_' + i + '_' + q,0),10) + 1);
										GM_setValue(type + '_' + city + '_' + i + '_' + q,jobs_points);
									}
									$('#' + type + '_' + city + '_' + i + '_' + q).html(GM_getValue(type + '_' + city + '_' + i + '_' + q,0));
								}
								var eval_point = parseInt(GM_getValue(type + '_' + city + '_' + i + '_' + q,0),10)
								eval('var ' + i + '_' + q + ' = eval_point');
							}
						}
					}else{
						eval('var percent_value = calcProc(success_value,unsuccess_value)');
						eval('var percent_total = calcProc(success_total,unsuccess_total)');
						GM_setValue(type + '_' + city + '_' + i + '_value',percent_value);
						GM_setValue(type + '_' + city + '_' + i + '_total',percent_total);
						$('#' + type + '_' + city + '_' + i + '_value').html(GM_getValue(type + '_' + city + '_' + i + '_value',0));
						$('#' + type + '_' + city + '_' + i + '_total').html(GM_getValue(type + '_' + city + '_' + i + '_total',0));
					}
				}
			}else if (type == 'boots'){
				if (boots == 'You received a Hot Coffee'){
					var boot_id = 'hc';
				}else if (boots == 'You received a Mutt'){
					var boot_id = 'm';
				}else if (boots == 'You received an Extra Pair of Eyes'){
					var boot_id = 'epe';
				}
				var type_array = _set[type];
				for ( var i in type_array[boot_id]){
					var boot_point = GM_getValue(type + '_' + boot_id + '_' + i,0);
					var total_boot_point = GM_getValue('boosts_points_' + i,0);
					GM_setValue(type + '_' + boot_id + '_' + i,(parseInt(boot_point) + 1));
					GM_setValue('boosts_points_' + i,(parseInt(total_boot_point) + 1));
					$('#' + type + '_' + boot_id + '_' + i).html(GM_getValue(type + '_' + boot_id + '_' + i,0));
					$('#boosts_points_' + i).html(GM_getValue('boosts_points_' + i,0));
				}
			}
		}
	}
}

function checkError(message){
	for ( var i in _set.errors){
		var exec_message = _set.errors[i].error_pattern.exec(message);
		if (exec_message){
			return exec_message[1];
		}
	}
	return false;
}





function stripURI(img) {
	var img = img.split('"')[1];
	return img.replace('" />','');
}

function count(obj){
	var _cou = 0;
	for ( var c in obj ){
		_cou++;
	}
	return _cou;
}

function blink(obj,delay,ss){
	if (ss){
		blinking = setInterval(function(){
			if($(obj).css("visibility") == "visible"){
				$(obj).css('visibility','hidden');
			}else{
				$(obj).css('visibility','visible');
			}
		},delay);
	}else{
		clearTimeout(blinking);
	}
}

function timestamp(){
	var _ct = new Date();
	var _cutct = _ct.toUTCString();
	var _tt = Date.parse(_cutct);
	return ((_tt / 1000) - 30);
}

function getArgs(url) {
	var args = new Object();
	if (url == undefined){
		var query = location.search.substring(1);
	}else{
		var url_array = url.split('?');
		var query = url_array[1];
	}
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}

function currentTime(){
	var _da = new Date();
	var _ch = parseInt(_da.getHours(),10) > 9 ? _da.getHours() : parseInt(_da.getHours(),10) > 0  ? '0' + _da.getHours() : '00';
	var _cm = parseInt(_da.getMinutes(),10) > 9 ? _da.getMinutes() : parseInt(_da.getMinutes(),10) > 0  ? '0' + _da.getMinutes() : '00';
	var _se = parseInt(_da.getSeconds(),10) > 9 ? _da.getSeconds() : parseInt(_da.getSeconds(),10) > 0  ? '0' + _da.getSeconds() : '00';
	return _ch + ':' + _cm + ':' + _se;
}

function calcProc(val1,val2){
	if (parseInt(val1) == 0 && parseInt(val2) == 0){
		return 0;
	}else{
		var sum = Math.round((100 / (parseInt(parseInt(val1),10) + parseInt(parseInt(val2),10))) * parseInt(parseInt(val1),10));
		return sum;
	}
}

function isArray(obj){
	if (typeof(obj.length) != 'undefined'){
		return false;
	}else{
		return true;
	}
}

