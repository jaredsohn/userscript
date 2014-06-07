// ==UserScript==
// @name           Hubdub Community Pack Extensions
// @namespace      http://www.vanderkruijs.net/dev/userscripts/hubdub/communitypack/
// @version        1.1.1
// @description    This extensions pack focusses on the community aspect of Hubdub. It contains three parts which enables users to interact more with each other: Chat, Market Rating, Market Responses and Text Formatting. 
// @author         Constantinus van der Kruijs
// @copyright      2009, Constantinus van der Kruijs (http://www.vanderkruijs.net/)
// @include        http://www.hubdub.com/*
// @homepage       http://www.vanderkruijs.net/dev/userscripts/hubdub/communitypack/
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/string.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/gm_userconfig.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/cookies.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/libs/request.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubpage.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubmarkets.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/libs/hubdubmultipurposebox.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/chat/script/hubdub_chat.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/chat/script/chatinvites.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/chat/script/onlineindicator.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/chat/script/inviteswindow.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/marketrating/script/hubdub_market_rating.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/marketresponses/script/hubdub_market_responses.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/textformatting/script/hubdub_textformatting.js?1.1.1
// @require        http://www.vanderkruijs.net/dev/userscripts/hubdub/textformatting/script/editor.js?1.1.1
// ==/UserScript==

if (request.getQueryParameter("noenhancements"))
	return;

var gm_config = hubdubPage.addConfig(
    "59830", "1.1.1", 
    "Community Pack",
    {
        chatEnabled:{ section: ["<b>Chat</b>"], label:'Enabled', 
            type:'checkbox', default:true },
/*    
        chatOnMarketPage:{ label:'Integrate chat on market pages', 
            type:'checkbox', default:true },
*/
        chatGlobal:{ label:'Integrate global chat on each page',
            type:'checkbox', default:true },
        chatShowAvailability:{ label:'Show availability for chat',
            type:'checkbox', default:true },
        chatPlaySounds:{ label:'Play a sound signal everytime a new message comes in',
            type:'checkbox', default:true },
        
        marketRatingEnabled:{ section: ["<b>Market Rating</b>"], label:'Enabled', 
            type:'checkbox', default:true },
        
        marketRatingResponses:{ section: ["<b>Market Responses</b>"], label:'Enabled', 
            type:'checkbox', default:true },

        textformattingEnabled:{ section: ["<b>Text Formatting</b>"], label:'Enabled', 
            type:'checkbox', default:true }
            
    }
);


if (gm_config.get("chatEnabled"))
    hubdub_chat(gm_config);

if (gm_config.get("marketRatingResponses"))
    hubdub_market_responses(gm_config);
    
if (gm_config.get("marketRatingEnabled"))
    hubdub_market_rating(gm_config);
    
if (gm_config.get("textformattingEnabled"))
    hubdub_textformatting(gm_config);