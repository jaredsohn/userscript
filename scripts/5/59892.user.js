// ==UserScript==
// @name           Hubdub Power Player Pack Extensions
// @namespace      http://www.vanderkruijs.net/dev/userscripts/hubdub/powerplayerpack/
// @version        1.1.1
// @description    Hubdub "Power Player Pack Extensions" focus on the power player aspect of Hubdub. It assembles parts which enable users to concentrate on predicting and market management. Each of these parts can be enabled and disabled individually. 
// @author         Constantinus van der Kruijs
// @copyright      2009, Constantinus van der Kruijs (http://www.vanderkruijs.net/)
// @include        http://www.hubdub.com/*
// @homepage       http://www.vanderkruijs.net/dev/userscripts/hubdub/powerplayerpack/
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/string.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/cookies.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/request.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/gm_userconfig.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubpage.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubmarkets.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubmarketenums.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubmultipurposebox.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/marketwatch/script/hubdubmarketwatchlist.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/marketwatch/script/hubdubmarketwatch.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/marketwatch/script/hubdub_market_watch.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/indexinfo/script/indexinfopresenter.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/indexinfo/script/indexinforeaderaol.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/indexinfo/script/indexinforeadermsn.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/indexinfo/script/hubdub_index_info.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/exportpredictions/script/hubdub_export_predictions.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/newsbox/script/newsboxpresenter.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/newsbox/script/newsboxreadergoogle.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/newsbox/script/newsboxreaderyahoo.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/newsbox/script/hubdub_newsbox.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/custompredictions/script/hubdub_custom_prediction.js?1.1.1
// ==/UserScript==


if (request.getQueryParameter("noenhancements"))
	return;

var gm_config = hubdubPage.addConfig(
    "59892", "1.1.1", 
    "Power Player Pack",
    {
        marketwatchEnabled:{ section: ["<b>Market Watch</b>"], label:'Enabled', 
            type:'checkbox', default:true },
            
        marketwatchWatchedMarkets:{ label:"Id's of monitored markets. One id per line.",
            type:'textarea', default:'' },
            
        marketwatchUpdateInterval:{ label:"Time in seconds between two reloads of an list item.",
            type:'float', default:'30' },
     
        indexinfoEnabled:{ section: ["<b>Index Info</b>"], label:'Enabled', 
            type:'checkbox', default:true },
     
        indexinfoSource:{ label: 'Data source',
            type: 'select', default: 'msn',
            options: { msn: 'MSN Money', aol: 'AOL Money & Finance' } },
            
        indexinfoAdditional:{ label: 'Always show',
            type: 'select', default: 'none',
            options: { none: '(none)', DJIA: 'DJIA', NASDAQ: 'NASDAQ', NIKKEI: 'Nikkei', HANGSENG: 'Hang Seng', FTSE: 'FTSE 100', DAX: 'DAX', CAC40: 'CAC40' } },
            
        indexinfoInterval:{ label: 'Update interval',
            type: 'int', default: '15' },
        
        newsboxEnabled:{ section: ["<b>News Box</b>"], label:'Enabled', 
            type:'checkbox', default:true },
     
        newsboxSource:{ label: 'Data source',
            type: 'select', default: 'google',
            options: { google: 'Google news', yahoo: 'Yahoo! News' } },
			
        newsboxRemoveOriginal:{ label: 'Remove Hubdub News Box',
            type: 'checkbox', default: true },
            
        
        exportopenpredictionsEnabled:{ section: ["<b>Export Open Predictions</b>"], label:'Enabled', 
            type:'checkbox', default:true },
        
        custompredictionsEnabled:{ section: ["<b>Custom Predictions</b>"], label:'Enabled', 
            type:'checkbox', default:true },

        custompredictionsValues:{ label:"Values of the prediction buttons, one per line",
            type:'textarea', default:'1000' },
        
        custompredictionsRemoveExisting:{ label:'Remove original buttons', 
            type:'checkbox', default:true }

    }
);

if (gm_config.get("marketwatchEnabled"))
    hubdub_market_watch(gm_config);
    
if (gm_config.get("indexinfoEnabled"))
    hubdub_index_info(gm_config);
        
if (gm_config.get("exportopenpredictionsEnabled"))
    hubdub_export_open_predictions(gm_config);
	
if (gm_config.get("custompredictionsEnabled"))
    hubdub_custom_predictions(gm_config);
	
if (gm_config.get("newsboxEnabled"))
    hubdub_newsbox(gm_config);