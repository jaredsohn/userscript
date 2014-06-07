// ==UserScript==
// @name           SalonKillFile
// @namespace      http://salon.maow.net/
// @description    Block annoying spammers and trolls ruining Salon.com
// @include        http://letters.mobile.salon.com/*
// @include        http://letters.salon.com/*
// @version        1.3.2
// @author         Ronald Barnes (Salon@maow.net)
// ==/UserScript==

// Change Log:
// -----------
//	1.0.0		Re-wrote Tiemo's code, added commentary.
//	1.0.1		Added Expire function through checkExpired()
//	1.1.0		Added Auto-ban of spammers
//	1.2.0		Updated banned-content list from server
//	1.2.0		Cleaned up more CSS code to fix Alan's odd problem:
//					if letters archive, output NO CSS.
//				This problem was never able to be recreated on my end, but
//					now skipping CSS on archive pages AND on "Most Read", etc.
//	1.2.1		Moved Auto-ban feature into separate RB.util class.
//	1.2.2		Modified checkExpired(): tweaked return value ...AND...
//					changed to confirm() box, so if user presses OK, script
//					auto-loads new SKF from repo, re-installing itself
//	1.2.3		Added counter to pages loads: every 5th load, update the 
//					banned-content list.
//	1.2.4		Modified string-trim of authors name for user names like ? ≠ !
//					inside getAuthorFromLetterElement() (parsed to "" on mobile
//					before the fix, hence didn't even get buttons)
//					2010/11/16  Ron
//	1.2.5		Mouse-Over/Out events on most buttons
//					2010/11/18	Ron
//	1.2.6		Mouse-Over/Out events on Show/Hide post buttons
//					2010/11/19	Ron
//	1.2.7		Mouse-Over/Out: all buttons have an ID, which is based on the
//					letter number.  One eventMouseOverAnyButton function and
//					one eventMouseOutAnyButton function replaced individual
//					functions for each button (which was a temp hack to make it
//					work - proof of concept.
//					Now animations work in Chrome too.
//					2010/11/22	Ron
//	1.3			Opera support added: some copied code, which then caused Chrome
//					to fail.  Finally copied GM_addStyle, renamed it 
//					GM_addStyleOpera() and got it to work.
//					2010/11/26	Ron
//	1.3.1		Fixed expiresDate and updated styles on mobile after major
//					revamp of CSS at Salon.com
//					2010/11/30	Ron
//	1.3.2		Fixed more styles on mobile after major
//					revamp of CSS at Salon.com
//					2010/12/01	Ron


// @namespace)_orig      http://language-grammar.blogspot.com/2009/04/filter-for-salon-letters.html
//	This script was "stolen" from "Frankly, My Dear" at the above blogspot.com site:
//	Modified for mobile, then for favourites as well as kills, then modified
//	again for normal letters.salon.com pages by Ronald Barnes (c) 2010/08/13
//
// Tero massively updated my changes and now the script is a proper JS object,
//	with methods and properties, and much more CSS.
//	Tero's site is: http://tech.nimbus.fi


(function()
	{
	// Hide posts by these persons, based on Salon.com user name
	//	(listed in no particular order, juggled names to keep lines < 80 chars)
	//	new String(author_kill_list = 'zorkna,Conversing with a hairdryer,'
	author_kill_list = ('' ) ;
		/*
		+ 'zorkna,Conversing with a hairdryer,'
		+ 'Goat Gouda Blueberry,good celery!,'
		+ 'Conversing with a hairdrier,Steelhoof,Barry Soetoro,yigroo,'
		+ 'Cognitive Infiltration,WILLIEMOJORISIN,rockybalboa,haufenmist,'
		+ 'The Fanzine for Democrats!,Lord Karth,zungtow,Laurel962,'
		+ 'Bell Factory,raymundohpl,hinckleybuzzard,slu111,JaaZee,Liberty2Day,'
		+ 'Walter E. Haas,Antipropaganda,groundzero1,LLL LLL,austinboy,'
		+ 'said dustari,DDSSRR,ehillesum,Big_Brotha,Elizabeth_Montagu,'
		+ 'Etrigonie,ertigonie,quester51,morefunky,nolongerlaidback,'
		+ 'homonculus,Hopey Changey,frances bavier,Old Joe,boomzer1,Tbmichael,'
		+ 'Liberty and Freedom,youngservative,something really stinks,'
		+ 'Granitepaw,Swampgator,liecatcher,D Bowman,Sketchbook,Molly McFly,'
		+ 'Flintstone,Yminale,A21A24,zungtow,Steelhoof,Steelh00f,'
		+ 'help4mac,Elephantman,Wuggypow,get_involved,Drunk in Church,' 
		+ 'Big_Rick,Kegan05,voozing,gedicht,Danny Walsh,mvpeach2,jkcomm1,'
		+ 'bluebeagler,blancpsace,Emma Coven,Gunteacher,moonlighter,vooying,'
		+ 'bserius,fitness101,cobzy,fdeelin,oda7103sf,jearonso,'
		+ 'beckpalinareright,Crippled Epistemology,siempre,Clement R Knorr,'
		+ 'shoptrade96,Skimission,zoowing,olivepit3,haha33,shoestrade42,'
		+ 'tlwinslow,Trickle Down,bluetick,goodgoodadvice,caca21,haha57,haha96,'
		+ 'haha001,gaga87,sasa53,kzzbj1,gaga44,another,jaja96,jaja61,jaja94,'
		+ 'qeqe10,Jinghoo,Robertocon,Hitler works at Walmart,Blondie_4414,'
		+ 'hunthorse,Parson Jim,OzzieMandias,'
		+ 'Wolfwhistle'
		).split(/,/) ;	
		*/
			// spammers caught by content now:
			// WaggyMow, "wow, dude" guy is caught on content now.
			//	quner528,
		//	+ 'Old Poor Richard,JackSparx,foolardi,BobTheCarpenter,NotOrbitBoy,






	// favourite_file is for users whose posts are regularily enjoyable to read:
	//	We'll highlight these with a green border
	//
	//	I like the anticipation of the green border scrolling up as I read
	//	earlier letters...
	//
	// I might have gotten a bit carried away with these, and I promoted myself
	//	into this list too.
	//	new String(favourites_list = 'SalonRon,mattielisbon,FryCookFromVenus,'
	favourites_list = (''
/*
		+ 'Amity,AJCalhoun,SalonRon,mattielisbon,FryCookFromVenus,'
		+ 'Rocky57,Dr. Zachary Smith,Publicola,paulpsd7,fletc3her,julwat,'
		+ 'cabdriver,fightthetheocracy!,Phylmom,Jacksonian,James Levy,'
		+ 'confusion8,Cuchulain2007,trjones1,Little Brother,'
		+ 'kiwi_in_aus,rrheard,Steve Fox,JugSouthgate,MacK,Bombzombie,'
		+ 'Slackie Onassis,BernieO,steambadger,gkrevvv,robwriter,'
		+ 'porsadgai,bigguns,bobbyjoe,mattwa33186,Juliebird,SkyBeaver,' 
		+ 'mattconnolly,K. Trout,Chris Dowd,Publican,susan sunflower,'
		+ 'IraqVetForHumanRights,asianshoebox,medicinepark,Alkaline,'
		+ 'Susan Wood,indyotto,drdave39,Diogenes,Platypus,'
		+ 'behindthecurtain,Hans B,h_lance,immoderateCentrist,dust1969,'
		+ 'Odin\'s legacy,DLF,pinkoursula,jochebed,'
		+ 'SamuelAAdams,BronxBomber621,angrypoodle,watchdog2u,Diable4,'
		+ 'Mr Bass Man,StronglyIndependent,VeronikaViking,G-S.,luckycat,'
		+ 'okieprof,had_enough,calgodot,Uncle Fester,Randy Stone,'
		+ 'zeroworker,toritto,bluetexan,Hoosier Daddy,tomdarch,RepZero,'
		+ 'hbookbinder,Legal_Beagle_Mo,JoeMommaSan,'
		+ 'Marjorie,jim_joe,StephenAshley,WmBlackstone,wysiwyg,Democritus,'
		+ 'Ted Frier,flaglesspirate,swinick,ehs284,MarionNYC,Dyspeptic Lawyer,'
		+ 'thorin01,Discoursarian,Jeff Davis,anitamurie,RepublicOfLaw,'
		+ 'Jeff Myers,MRossignol,peeps1,gooners,dkissam,G. L.,bekabot,'
		+ 'Northwestwoods,_Rojo_,Hey Skipper,Aeronneous,Stephan Wilkinson,'
		+ 'Scott A Martin,'
		// following users contacted me in response to SalonTrollBeGone:
		+ 'maisiecat54,teresa,PreviouslyCRL'
*/
			);	//	.split(/,/) ;



	// Do not hide these persons, ever (even if they fully quote a spammer):
	var white_list = ('SalonRon').split(',');



	// make special markup on Salon staffers: an incomplete list...
	//	Must be re-loaded into persistence.
	Salon_staff_list = ('Matt Zoller Seitz,Gene Lyons,Scott Rosenberg,'
		+ 'Andrew O\'Hehir,Joan Walsh,Glen Greenwald,Patrick Smith,Libmomrn,'
		+ 'Lev Raphael,Dan Gillmor,justinelliott,GlennGreenwald,'
		+ 'Kerry Lauerman'
			).split(/,/) ;









	// Hide posts by post content. Please note that . must be written as \\.
	//	Some of them are redundant as spammers changed URLs often.
	// REPEAT: periods must be written as \\.
	// REPEAT: . must be written as \\.
	content_kill_list = new String(''
		+ 'fashiongoods\\.us,fashiongoods,shoes3,\\.privacy-web\\.,'
		+ '\\.web-privacy\\.,-privacy\\.,privacy-,soozone\\.com,'
		+ 'buyshopping\\.us,===== ?http://,\\.tc,anon\\.at\\.'
		+ ',\\w+\\.us'
		);


	try
		{
		var savedRegex = GM_getValue( 'SKF.content_kill_list', '' ) ;
	    }
	catch (e)
		{
		//	GM_log('ERROR: caught error accessing GM_getValue().');
		}
	if ( savedRegex )
		{
		content_kill_list = savedRegex ;
		GM_log('content_kill_list updated from GM_persistence to\n\n['
			+ content_kill_list + ']' ) ;
		}
	else
		{
		try
			{
			GM_setValue( 'SKF.content_kill_list', content_kill_list.toString());
		    }
		catch (e)
			{
			//	GM_log('ERROR: caught error accessing GM_setValue().');
			}
		/*
		GM_log( 'content_kill_list updated into GM_persistence\n\n'
			+ '[' + content_kill_list + ']' ) ;
		*/
		}

		// regexp for post content (catch spammers by message content):
		// regexp for post content (catch spammers by message content):
		content_kill_list_regexp = new RegExp( 
			content_kill_list.replace(/, */g, "|"), "i");


	//	GM_log( content_kill_list_regexp ) ;








//	Next styles are from Tero.  I had some worked out for the differences 
//	between mobile & normal pages, but this is FAR more extensive and I shall
//	have to thoroughly review to brush up on the finer points of CSS.  (rb)
//
//	Okay, now been heavily modified by Ron to show / suppress lines, show
//	the Permalink on mobile pages, etc.
//
/*** Stylesheets *************************************************************/
/*** Stylesheets *************************************************************/
/*** Stylesheets *************************************************************/

// Normal styles for non-mobile site:
var normal_styles = '														\
/* Blockquotes in mobile have indent, nothing else, fix it:	*/				\
/* Blockquotes in mobile have indent, nothing else, fix it:	*/				\
/*	In non-mobile, they are a 1px vertical line: too tiny, fix it too:	*/	\
#letters_archive.posts_xxx,	\
blockquote																	\
	{																		\
	border-left: 5px solid #ccc !important;									\
	padding-left: 15px;														\
	border-right: 5px solid #ccc !important;								\
	padding-right: 15px;													\
	}																		\
	\
/** Modify "Flag" as inappropriate text area: it goes to 3rd column	**/		\
/** Modify "Flag" as inappropriate text area: it goes to 3rd column	**/		\
TEXTAREA																	\
	{																		\
    width: 100%;															\
	}																		\
/** END Modify "Flag" as inappropriate text area	**/						\
	\
	\
/** Modify "Send a letter to the editor" to make full column width	**/		\
/** Modify "Send a letter to the editor" to make full column width	**/		\
input[type=text_test]															\
	{	\
	width: 95% !important;			\
	border: 5px solid #ccc !important;									\
	background: red !important;	\
	}	\
.text_test															\
	{	\
	width: 95%;			\
	border: 5px solid #c00 !important;									\
	background: green;	\
	}	\
	\
	\
/* The black "Read the Article" button and the red "Post a letter about		\
	this article" button wrap awkwardly and have rounded outer edges but	\
	the edges that ought to touch (if not for the wrapping) are 90° angles,	\
	making them look odd.													\
	This should make all corners rounded.									\
	*/																		\
a.read_article_source,														\
a.read_article_closed														\
	{																		\
	border-radius: 8px 8px 8px 8px;											\
	-moz-border-radius: 8px 8px 8px 8px;									\
	-webkit-border-radius: 8px 8px 8px 8px;									\
	-o-border-radius: 8px 8px 8px 8px;									\
	margin-bottom: 2px;														\
    border: 1px solid #00f ;	/* Added by RON */							\
	}																		\
a.post_letter																\
	{																		\
	border-radius: 8px 8px 8px 8px;											\
	-moz-border-radius: 8px 8px 8px 8px;									\
	-webkit-border-radius: 8px 8px 8px 8px;									\
	-o-border-radius: 8px 8px 8px 8px;									\
	margin-top: 2px;														\
    border: 1px solid #00f ;	/* Added by RON */							\
	}																		\
	\
	\
/*** ban message ***/                                                         \
.SalonKillFile-ban															\
	{                                                       				\
	display: none;                                                            \
	height: 30px;                                                             \
	margin-top: 5px;													\
	margin-bottom: 5px;													\
	}                                                                         \
.SalonKillFile-ban, .SalonKillFile-ban * 									\
	{                       												\
    font-size: 11px;                                                          \
    line-height: 25px;                                                        \
    color: #900;                                                              \
	}																		\
	\
	\
/* RON: Show Post / Hide Post "button":  */                                   \
.SalonKillFile-ban A														\
	{																		\
    color: #fff            ;                                                  \
    background-color: #900 ;                                                  \
    border: 1px solid #00f ;	/* Added by RON */						\
    white-space: nowrap;                                                      \
	padding: 3px;															\
    font-size: 11px;                                                          \
	line-height: 23px;                                                        \
    margin: 10px 10px !important;                                           \
    border-radius: 10px !important;                                           \
    -moz-border-radius: 7px;                                                  \
	-webkit-border-radius: 7px;                                               \
	-o-border-radius: 7px;                                                  \
	}																		\
	\
	\
/* unnecessary, as .SalonKillFile-ban is now removed from non-banned		\
	messages by updateClasses()	*/											\
.SalonKillFile-author-banned .SalonKillFile-ban								\
	{																		\
    display: block;                                                           \
	}                                                                         \
	\
	\
/* Next, show the "user is banned" msg, which is prepended to truncated		\
	full message	*/		\
.SalonKillFile-author-banned												\
	{																		\
    height: 30px;	/* trimmed a bit of subject out by shrinking (RON) */	\
    overflow: hidden;                                                         \
    color: #911;															\
    /* When users with long user_names are banned, the "Show post" wrapped! */ \
    /* Oops, putting nowrap here makes "Show post" present one line of 		\
    	unwrapped text for the message: must add normal; elsewhere.		*/	\
	white-space: nowrap;													\
	/*	border-bottom: 1px solid #555 !important;					*/		\
	/* Commented out for now. Some day these will work.						\
		transition: height 5s linear;										\
		-moz-transition: height 1s ease-in-out;								\
		-o-transition: height 1s ease-in-out;								\
		-webkit-transition: height 0.5s ease-out;							\
	   	-webkit-transition: height 0.5s ease-in;                            \
		*/																	\
	-webkit-transition-property: height, opacity;			 				\
	-webkit-transition-duration: 0.25s;										\
	-webkit-transition-timing-function: ease-out;							\
	-moz-transition-property: height, top, left, opacity; 				\
	-moz-transition-duration: 0.5s, 5s, 1s, 4s;						\
	-moz-transition-timing-function: ease-out;								\
	-o-transition-property: height, top, left, opacity; 				\
	-o-transition-duration: 0.5s, 5s, 1s, 4s;						\
	-o-transition-timing-function: ease-out;								\
/*	-webkit-box-shadow: 2px 2px 1px black;									\
	-moz-box-shadow: 2px 2px 1px black;										\
*/	\
	}																		\
	\
	\
/* Show the entire banned msg (event when "Show post" button clicked) */	\
.SalonKillFile-ban-show														\
	{																		\
	height: auto !important;                                                  \
	/* When showing banned message, make sure it wraps! Else one wide line of \
		text for subject, one for entire message.  NoWrap is required when	\
		banned users with long names cause the "Show post" button to wrap */ \
	white-space: normal;                                                      \
	\
	/* Next is important to remove double set of dotted lines below			\
		the showing (full display) of banned messages.						\
		The first line is attached to li.letter_entry_footer and			\
		the other on SalonKillFile-author-banned (gives line under 			\
		the truncated, "messages from X are banned" & before next letter)	\
		*/																	\
	/*	border-bottom: none !important;		*/	/* Salon uses grey on LI */	\
	\
	/* Commented out for now. Some day these will work.						\
		transition: height 5s linear;										\
		-moz-transition: height 1s ease-in-out;								\
		-o-transition: height 1s ease-in-out;								\
		-webkit-transition: height 0.5s ease-out;							\
		*/																	\
	-webkit-transition-property: height, opacity;			 				\
	-webkit-transition-duration: 0.25s;										\
	-webkit-transition-timing-function: ease-out;							\
	-moz-transition-property: height, top, left, opacity; 				\
	-moz-transition-duration: 0.5s, 5s, 1s, 4s;						\
	-moz-transition-timing-function: ease-out;								\
	-o-transition-property: height, top, left, opacity; 				\
	-o-transition-duration: 0.5s, 5s, 1s, 4s;						\
	-o-transition-timing-function: ease-out;								\
	-moz-box-shadow: 5px 5px 5px #888; padding: 0px 10px 0px 20px !important;\
	-webkit-box-shadow: 5px 5px 5px #888; padding: 0px 10px 0px 20px !important;\
	-o-box-shadow: 5px 5px 5px #888; padding: 0px 10px 0px 20px !important;\
	box-shadow: 5px 5px 5px #888; padding: 0px 10px 0px 20px !important;\
/*	border-bottom: 1px dotted #0f0 !important;						*/		\
	margin-bottom: 20px !important;											\
	padding-left: 0px !important;											\
	padding-bottom: 5px !important;											\
	padding-right: 5px !important;											\
	}																		\
	\
	\
	\
/*** END of ban message ***/												\
	\
	\
/* buttons */																\
/* buttons */																\
/* buttons */																\
	\
	\
/* Here is the SPAN that contains the buttons (some of them hidden) */		\
.SalonKillFile-buttons				\
	{								\
	padding: 2px;					\
	/* Remove underline of links on normal pages		*/					\
	/* In normal, non-mobile, the buttons wrap, becoming vertically aligned: \
		Added the white-space: nowrap; to fix it				*/	\
    white-space: nowrap;                                                      \
	/*	border: 1px solid #444 ;	*/										\
	font-size: xx-small;													\
	}																		\
	\
	\
.SalonKillFile-button-remove-ban,                                          \
.SalonKillFile-button-ban-author											\
	{																		\
	color: #922 !important;													\
    background-color: #fdd;                                                   \
    border: 1px solid #00f ; \
    border-radius: 10px !important; \
	-moz-border-radius: 10px;                                                 \
	-webkit-border-radius: 10px;                                                 \
	-o-border-radius: 10px;                                                 \
	}																		\
	\
	\
.SalonKillFile-button-SKF-help,												\
.SalonKillFile-button-remove-highlight,                                    \
.SalonKillFile-button-highlight-author										\
	{																		\
	color: #292 !important;													\
    background-color: #dfd;                                                   \
    border: 1px solid #00f;													\
	border-radius: 10px !important;											\
	-moz-border-radius: 10px;                                                 \
	-webkit-border-radius: 10px;                                                 \
	-o-border-radius: 10px;                                                 \
	}																		\
	\
	\
.SalonKillFile-button-remove-ban,                                          \
.SalonKillFile-button-remove-highlight,                                    \
.SalonKillFile-button-ban-author,                                          \
.SalonKillFile-button-highlight-author										\
	{																		\
    display: none;                                                            \
    padding: 3px;                                                             \
	line-height: 23px;                                                        \
    white-space: nowrap;                                                      \
	}																		\
	\
	\
.SalonKillFile-author-banned .SalonKillFile-button-remove-ban,				\
.SalonKillFile-author-normal .SalonKillFile-button-ban-author,          	\
.SalonKillFile-author-normal .SalonKillFile-button-highlight-author,    	\
.SalonKillFile-author-highlight .SalonKillFile-button-remove-highlight		\
	{																		\
    display: inline;                                                          \
	}																		\
	\
	\
/* on MouseOver, highlight buttons:	*/										\
.SalonKillFile-mouse-over									\
	{																		\
    border: 1px solid #00f ; \
	-webkit-box-shadow: 3px 3px 5px 1px #888; padding: 5px 5px 5px 5px !important;\
	-moz-box-shadow: 3px 3px 5px 1px #888; padding: 5px 5px 5px 5px !important;\
	-o-box-shadow: -3px -3px 5px 1px #888; padding: 5px 5px 5px 5px !important;\
	box-shadow: 3px 3px 5px 1px #888; padding: 5px 5px 5px 5px !important;\
	/* next removes underline from button text when hover/mouse-over:	*/	\
	text-decoration: none!important;										\
	}																		\
	\
	\
/* When user un-bans a user, remove the fancy drop-shadow	*/				\
.SalonKillFile-author-normal												\
	{																		\
	-webkit-box-shadow: none !important;									\
	-moz-box-shadow: none !important;										\
	-o-box-shadow: none !important;										\
	box-shadow: none !important;										\
	}																		\
	\
	\
.SalonKillFile-button-SKF-help												\
	{																		\
	color: #000 !important;													\
	background-color: #aaa;													\
	padding: 3px;															\
	display: inline !important;												\
	\
/*	postition: absolute !important;											\
	right: 25px !important;													\
*/	\
	}																		\
/*** end of buttons ***/													\
	\
	\
	\
/*** highlights ***/                                                          \
/*** highlights ***/                                                          \
/*** highlights ***/                                                          \
.SalonKillFile-author-highlight												\
	{																		\
	border: 3px double #090 !important;                                       \
    padding: 1px 5px 20px !important;                                              \
/*	padding: 2px 6px !important;                                            */ \
	border-radius: 10px;                                                      \
	-moz-border-radius: 10px;                                                 \
	-webkit-border-radius: 10px;                                              \
	-o-border-radius: 10px;                                                 \
	}																		\
	\
	\
.SalonKillFile-author-staff													\
	{																		\
    border: 3px double #00f !important;                                        \
    padding: 1px 5px 20px !important;                                              \
    border-radius: 10px;                                                      \
	-moz-border-radius: 10px;                                                 \
	-webkit-border-radius: 10px;                                              \
	-o-border-radius: 10px;                                                 \
	}																		\
	\
/*** end of highlights ***/													\
' ;

// Mobile styles are ADDED to normal styles
// Mobile styles are ADDED to normal styles
// Mobile styles are ADDED to normal styles
var mobile_styles = '                                                         \
/*** changes ***/                                                             \
/*	Ron! */		\
	\
/* permalinks are hidden in mobile, so try to add them by over-riding:	*/	\
/* permalinks are hidden in mobile, so try to add them by over-riding:	*/	\
.permalink, .label_explain													\
	{																		\
	display: inline !important ;											\
	font-size: 0.85em;														\
	} 																		\
	\
	\
/* fix lack of bottom border line in mobile pages:	*/						\
/* fix lack of bottom border line in mobile pages:	*/						\
.letter_entry_footer														\
	{																		\
	border-bottom: 1px dotted #66727B !important;							\
	padding-bottom: 10px !important;										\
	}																		\
	\
/* move author name back to right side	*/									\
.byline																		\
	{																		\
	float: right;															\
	}																		\
	\
	\
/* Make "read users other letters" link smaller than users name */			\
.read_more_letters															\
	{																		\
	font-size: 0.5em;														\
	/* also, move it below authors name */									\
	display: block;															\
	}																		\
	\
/* Make subscribers have the star image appear: */							\
.premium																	\
	{																		\
	background: url("http://images.salon.com/src/star_premium.gif") no-repeat right top transparent;							\
	padding: 0 24px 0 0;													\
	}																		\
	\
/* published date is as large as subject and letter text */					\
.publish_date																\
	{																		\
	font-size: 0.5em !important;											\
	}																		\
	\
/* letter subject is no larger than rest of letter, just emboldened */		\
h3																			\
	{																		\
	font-size: 1.25em !important;											\
	}																		\
	\
/* fix the "View: Newest First / Oldest First: word "View" is at RIGHT */	\
#desc_letters_radio, label, #asc_letters_radio								\
	{																		\
	margin-top: 1em !important;												\
	float: none !important;													\
	}																		\
	\
/* Again fix View: Newest/Oldest: add the soft background like the 			\
	non-mobile site has */													\
#letter_view_controls														\
	{																		\
	background: none repeat scroll 0 0 #F6F6F6;								\
	}																		\
	\
/* The black "Read the Article" button and the red "Post a letter about		\
	this article" button wrap awkwardly and have rounded outer edges but	\
	the edges that ought to touch (if not for the wrapping) are 90° angles,	\
	making them look odd.													\
	This should make all corners rounded.									\
	*/																		\
a.read_article_source,														\
a.read_article_closed														\
	{																		\
	padding: 5px;															\
	margin: 5px, 5px, 5px, 5px;												\
	line-height: 2em;														\
    border: 1px solid #00f ;	/* Added by RON */							\
	background-color: black;												\
	color: white;															\
	font-size: 0.5em;															\
	font-weight: bold;														\
	font-family: arial,sans-serif;											\
	text-transform: uppercase;												\
	}																		\
a.post_letter																\
	{																		\
	padding: 5px;															\
	margin: 5px, 5px, 5px, 50px;												\
	line-height: 2em;														\
    border: 1px solid #00f ;	/* Added by RON */							\
	color: white;															\
	font-size: 0.5em;															\
	font-weight: bold;														\
	font-family: arial,sans-serif;											\
	text-transform: uppercase;												\
	background: none repeat scroll 0 0 #CC0000;								\
	}																		\
	\
.SalonKillFile-ban-show														\
	{																		\
    height: auto !important;                                                  \
	/* Next is important to remove double set of dotted lines below			\
		the showing (full display) of banned messages.						\
		The first line is attached to li.letter_entry_footer and			\
		the other on SalonKillFile-author-banned (gives line under 			\
		the truncated, "messages from X are banned" & before next letter)	\
		*/																	\
	border-bottom: none !important;			/* Salon uses grey on LI */		\
	}									\
	\
	\
.SalonKillFile-author-banned	                                              \
	{                                                                         \
	height: 39px ; /* height of the displayed msg: Only button & banned msg */ \
	border-bottom: 1px dotted #66727B ;		/* Salon uses grey on LI */		\
/*	height: 75px ;  // this includes banned letter subject.                 */\
/*	border-bottom: 1px dotted #000 ;                                        */ \
	}																		\
	\
	\
.SalonKillFile-author-highlight,                                           \
.SalonKillFile-author-staff													\
	{																		\
    margin: 5px !important;                                                 \
    padding-bottom: 0px !important;										\
	}																		\
/*** end of mobile changes ***/												\
' ;
/*** End of configuration, Main Program begins *******************************/


	// THE END of manual configuration...
	// THE END of manual configuration...
	// THE END of manual configuration...
	// THE END of manual configuration...
	// THE END of manual configuration...
	// THE END of manual configuration...
	// THE END of manual configuration...







	// here we make a JS Object for the Salon Kill File:
	// here we make a JS Object for the Salon Kill File:
	// here we make a JS Object for the Salon Kill File:
	var SKF = {
		id: 'SalonKillFile',  	// Id used in many places
		mode: 'normal',			// Website mode: 'normal' or 'mobile'
		authors: {},			// authors object: {'name: value, 'name' value,}
		letterElements: [],		// array of letter elements
		// note the comma above, after square brackets: means there's More. (rb)


		// Put in a forced upgrade as there are bugs to be ironed out still,
		//	plus some more re-writing of Tero's code:
		expiresDate: "2010/12/31",

		// Grab the revision number for auto-update-checking. This value
		//	is to be filled in by SVN propset keywords:
		revisionNum: '$Revision: 21 $',





	// make an object for the ALL authors from all lists above + persistence:
	// make an object for the ALL authors from all lists above + persistence:
	// make an object for the ALL authors from all lists above + persistence:
	buildAuthorsList: function() 
		{
	    SKF.authors = {} ;

	    // Create authors object from user's lists above (kill, highlight, etc.)
	    // Using a numeric value is nifty as it allows 'promotion' when merging
	    //	with GreaseMonkey persistence.

		// if we have never stored any authors in persistence, this will stay 0:
		var numAuthorsListed = 0 ;

	    for (var i = author_kill_list.length; i--; )
	    	{
	    	SKF.authors[author_kill_list[i]] = -1;
	    	numAuthorsListed++ ;
	    	}
		for (var i = white_list.length; i--; )
			{
			SKF.authors[white_list[i]] = 0 ;
	    	numAuthorsListed++ ;
			}
		for (var i = favourites_list.length; i--; )
			{
			SKF.authors[favourites_list[i]] = 1;
	    	numAuthorsListed++ ;
			}
	    for (var i = Salon_staff_list.length; i--; )
	    	{
	    	SKF.authors[Salon_staff_list[i]] = 2 ;
	    	numAuthorsListed++ ;
	    	}



		// GM Persistence allows the changes a user makes take precidence over 
		//	updated script lists.  Sweet!
		//
	    // Join persistence to authors object. In conflict persistence wins. 
	    //	(Tero's work!)
	    try
	    	{
		    var persistence = JSON.parse( GM_getValue( 'SKFauthors', '{}') ) ;
		    }
		catch (e)
			{
			//	GM_log('ERROR: caught error accessing GM_getValue().');
			}

		// if we have never stored any authors in persistence, this will stay 0:
		var numAuthorsPersistence = 0 ;

		// go through all authors in persistence (GreaseMonkey storage):
		for (var name in persistence)
			{
			// we've found some authors in persistence, count them
			numAuthorsPersistence++ ;

			// see if name in persistence matches any author in any list above:
	        if (name in SKF.authors)
				{
				// you can promote, but you cannot demote [Tero]
				//
				// Ron's modification(s):
				//	Clarifying: you can promote someone by clicking button
				//	Highlight Author, storing that 'promotion' in persistence.
				//
				//	Here we resolve those diffenences against the lists above.
				//	Persistence settings take precident over lists above, as
				//	the button click was likely more recent than the lists
/*
			GM_log('Matched [' + name + '] SKF.ranking=' + SKF.authors[name] 
				+ '    persistence.ranking=' + persistence[name] ) ;
				if (SKF.authors[name] > persistence[name])
					{
            		GM_log( "Demoting author " 
            			+ name 
            			+ ' from '
            			+ SKF.authors[name] 
            			+ ' to ' 
            			+ persistence[name] 
            			+ '\n\nWhere -1=banned, 0=whitelisted, 1=favourite, '
            			+ 'and 2=SalonStaff'
            			+ '\n\n...as the rankings were different between script '
            			+ 'lists '
            			+ 'and GreaseMonkey persistent memory (which is where '
            			+ 'your changes when clicking buttons are saved).'
            			+ '\n\nWe are going to use the persistent ranking.'
            			) ;

					SKF.authors[name] = persistence[name];
					}
            	else
					*/
					{
					SKF.authors[name] = persistence[name];
					}
				}
        	else
        		{
        		// persistence name is not in our authors list, add it:
            	SKF.authors[name] = persistence[name];
        		}
			// store this now
			try
				{
				GM_setValue( 'SKFauthors', JSON.stringify( SKF.authors) ) ;
			    }
			catch (e)
				{
				GM_log('ERROR: caught error accessing GM_setValue().');
				}
			}

		// if no authors found in persistence, add user's list now:
		if ( numAuthorsPersistence == 0 )
			{
			try
				{
				GM_setValue( 'SKFauthors', JSON.stringify( SKF.authors) ) ;
				GM_log( 'Added list of '
					+ numAuthorsListed
					+ ' authors to GreaseMonkey persistence, i.e.\nBrowser memory: '
					+ 'upon upgrading this script, your favourites will be saved.' 
					//	+ JSON.stringify( SKF.authors)
					) ;
			    }
			catch (e)
				{
				//	GM_log('ERROR: caught error accessing GM_getValue().');
				}
			}
		} // end of buildAuthorsList: function()
		,




		// create an element for each letter on the page:
		// create an element for each letter on the page:
		// create an element for each letter on the page:
		buildLetterElements: function()
			{
			// NOTE that Salon.com changed their style sheet(s) about 5pm,
			//	2010/11/30, so need a new method of detecting "mode"
			//
			if (document.getElementById('letters') )
				{
				SKF.mode = 'normal' ;
				}
			else if (document.getElementById('mobile') )
				{
				SKF.mode = 'mobile' ;
				}
			else
				{
				SKF.mode = 'unknown' ;
				}
			GM_log( '! SKF.mode=[' + SKF.mode + ']' ) ;

			// get all DIVs with class=letter (normal letters page):
			var letters = TN.class.getElementsByClass('letter', 
				document, 'DIV') ;
	        SKF.letterElements = letters ;
			GM_log('Found ' + letters.length + ' letters.') ;
return ;

			// get all DIVs with class=letter (normal letters page):
			var letters = TN.class.getElementsByClass('letter', 
				document, 'DIV') ;
			if (letters)
				{
				GM_log('Found ' + letters.length 
					+ ' NORMAL letters, testing next for ARCHIVE page.' );


				// look in the LAST letter (as the Most Popular, Most Active,
				//	etc. get the first 5 elements and haven't got a footer:
				var elem = TN.class.getElementsByClass('letter_entry_footer', 
					letters[letters.length], '*' ) ;
				if (!elem)
					{
					GM_log('Found letters "Normal" ARCHIVE page.' ) ;
					SKF.mode = 'archive' ;
					}
				else
					{
					SKF.mode = 'normal' ;
					}
		        SKF.letterElements = letters ;
				}
			else
				{
				// get all DIVs with class=letter_node (mobile letters page),
				// but only if nothing found on normal parsing (save a lookup):
				var letterNodes = TN.class.getElementsByClass('letter_node', 
					document, 'LI') ;
				if (letterNodes)
					{
					GM_log('Found ' + letterNodes.length 
						+ ' Mobile Letters: testing for ARCHIVE page.' );
					var elem = TN.class.getElementsByClass('letter_entry_footer'
						, letterNodes ) ;
					if (elem)
						{
						GM_log('Found letters "Mobile" ARCHIVE page.' ) ;
						SKF.mode = 'archive' ;
						}
					else
						{
						GM_log('Found NON-ARCHIVE Mobile page.' ) ;
						SKF.mode = 'mobile';
						// set to letterNodes:
						SKF.letterElements = letterNodes ;
						}
					}
				else
					{
					GM_log('Cannot determine Normal or Mobile site.\n\n"?"');
					}
				}
			GM_log( 'SKF.mode=[' + SKF.mode + ']' ) ;
			}
		,




		// push the styles defined above into web page:
		// push the styles defined above into web page:
		// push the styles defined above into web page:
		addStylesToWebPage: function()
			{
			if (SKF.mode == 'archive' )
				{
				GM_log('NOT adding CSS styles to Letters Archive page.' ) ;
				}
			else
				{
				GM_addStyle( normal_styles ) ;
				if (SKF.mode == 'mobile')
					{
					// mobile ADDs to normal styles
					GM_addStyle( mobile_styles) ;
					}
				}
			}
		,






		// update page's letters, adding CSS based on author and their ranking:
		// update page's letters, adding CSS based on author and their ranking:
		// update page's letters, adding CSS based on author and their ranking:
		updateClasses: function()
			{
			// array of all four possible author classes:
			var classes = [
				SKF.id +'-author-banned',
				SKF.id +'-author-normal',
				SKF.id +'-author-highlight',
				SKF.id +'-author-staff'
				] ;



			// cycle through all letters, parsing author and their ranking:
			// cycle through all letters, parsing author and their ranking:
			// cycle through all letters, parsing author and their ranking:
			for (var letterIndex = SKF.letterElements.length; letterIndex--; )
				{
				var elem = SKF.letterElements[letterIndex] ;
				var author = SKF.getAuthorFromLetterElement( elem) ;
				var ranking = author in SKF.authors ? SKF.authors[author] : 0 ;

				// increment ranking by 1 to make trolls (-1) = 1st array index:
				++ranking;


				// cycle through classes (banned to staff) removing existing:
				// cycle through classes (banned to staff) removing existing:
				for (var cssIndex = classes.length; cssIndex--; )
					{
					TN.class.remove( elem, classes[cssIndex]) ;
					}


				// test for content match to spam via content_kill_list_regexp:
				// test for content match to spam via content_kill_list_regexp:
				// test for content match to spam via content_kill_list_regexp:
				//
				// First, get the content_kill_list from GreaseMonkey's
				//	persistent memory, as it may have been updated since
				//	this script started (via asyncronous XMLHTTPrequest() )
				try
					{
					content_kill_list = GM_getValue( 'SKF.content_kill_list', 
						content_kill_list ) ;
					}
				catch (e)
					{
					//	GM_log('ERROR: caught error accessing GM_getValue().');
					}

				// Recreate the regexp based on possibly new content_kill_list:
				content_kill_list_regexp = new RegExp( 
					content_kill_list.replace(/, */g, "|"), "i") ;


				// test for content match to spam via content_kill_list_regexp:
				// test for content match to spam via content_kill_list_regexp:
				var matchedText = elem.innerHTML.match(
					content_kill_list_regexp ) ;
				if ( matchedText 
					&& SKF.authors[author] != -1	// already banned
					&& SKF.authors[author] != 0 	// has had ban removed
					&& SKF.authors[author] != 1 	// favourites don't spam(?)
					&& SKF.authors[author] != 2 	// Salon staff won't spam(?)
					)
					{
					alert( 'Spam Filter Auto-Ban Feature: Banning Author\n'
						+ '\nAuthor=' + author 
						+ '\nMatched Content="' + matchedText + '"'
						//	+ '\nAuthor Ranking=' + SKF.authors[author] 
						) ;
					// demote author's ranking to banned:
					SKF.authors[author] = -1 ;
					// set the CSSclasses array index to 'banned':
					ranking = 0 ;
					// update GreaseMonkey persistence to new authors list:
					GM_setValue( 'SKFauthors', JSON.stringify( SKF.authors) ) ;
					}
				// now, add the class for THIS author (banned, staff, etc.):
				// now, add the class for THIS author (banned, staff, etc.):
				// UNLESS this is a user's letters "archive" or a Most Read box:
				// UNLESS this is a user's letters "archive" or a Most Read box:
				if (SKF.mode == 'archive' || TN.class.contains( elem, 'clearfix'))
					{
//					GM_log('Skipping CSS on archival / "clearfix" CSS item.') ;
					}
				else
					{
					TN.class.add( elem, classes[ranking] ) ;
					// When user un-bans someone, also remove the SKF-ban-show
					//	style, which has to be applied to make the un-ban 
					//	button visible:
					//
					// That is, for non-banned users, remove SKF-ban-show CSS,
					//	IF it exists:
					if ( ranking > 0 
						&& TN.class.contains(elem, SKF.id+'-ban-show'))
						{
	// If element has -ban-show and ranking > spammer, it WAS banned and
	//	when it was un-banned the "Hide post" button didn't update, so
	//	if user re-bans it, the hidden banned msg shows, with a "Hide post" 
	//	button.
	// Fix by toggling the button, then removing the -ban-show altoghether.
						var button = TN.class.getElementsByClass( 
							SKF.id +'-ban-message-button', elem, 'A')[0] ;
						button.innerHTML = 'Show post' ;
						button.title = 'Show post' ;
						button.href = 'javascript://Show Post';
						TN.class.remove( elem, SKF.id +'-ban-show' );
						GM_log( "updateClasses() Removed SKF-ban-show on "
							+ "non-banned user " + author );
						}
					}
				}
			}
		,




		// parse the Author's name (Salon UserID) from that part of letter:
		// parse the Author's name (Salon UserID) from that part of letter:
		// parse the Author's name (Salon UserID) from that part of letter:
		getAuthorFromLetterElement: function(letterElement)
			{
		    var author = '' ;
			//	GM_log( 'getAuthorFromLetterElement(): SKF.mode=' + SKF.mode ) ;
		    switch (SKF.mode)
		    	{
		    	// CHANGED: 2010/11/30: Mobile now shares styles with Normal:
		        case 'normal':
				case 'mobile':
					var elem = TN.class.getElementsByClass('letter_author', 
						letterElement) ;
        		    if (elem)
        		    	{
        		    	// skip over Tero's (TN's) personal library:
						// var author = TN.str.trim(elem[0].innerHTML) ;
						var author = elem[0].innerHTML ;
						// remove beginning em dash:
						author = author.replace(/^\u2014\s*/, '') ;
						}
					break ;

				case 'mobile_pre_updated_CSS':
				var elem = TN.class.getElementsByClass('letter_entry_author', 
					letterElement) ;
				if (elem)
					{
					// Ron: 2010/11/16  User ? ≠ ! not parsed in Mobile:
					// Ron: 2010/11/16  User ? ≠ ! not parsed in Mobile:

       		    	// skip over Tero's (TN's) personal library:
					//	var author = TN.str.trim(elem[0].innerHTML);
					var author = elem[0].innerHTML ;
					//	GM_log('Author starting [' + author + ']');

					// remove beginning -- and white space
					// changed regex as \s doesn't seem to work
					author = author.replace(/^--[ \n\r\t]+/, '') ;

					// remove possible <a>-tag (useful when "link @ sig" used)
					//	changed by removing $ anchor, as it failed 
					//	I'm really unimpressed with JS regexps: I prefer Perl.
					author = author.replace(/^<a [^>]*>\s*/, '') ;
					// remove possible </a>-tag
					author = author.replace(/<\/a>/, '') ;

					// Ron's trim function: needs to allow user ? ≠ ! to parse:
					// Ron's trim function: needs to allow user ? ≠ ! to parse:
					// Ron's trim function: needs to allow user ? ≠ ! to parse:
					author = author.replace(/^[ \n\r\t]+/, '') ;
					// trim final white space (includes newline char(s)!)
					author = author.replace(/[ \n\r\t]+$/, '') ;
					// GM_log( 'Author final name = "' + author + '"' ) ;
					}
				break ;

				// shouldn't happen:
		        default:
					var elem = TN.class.getElementsByClass('letter', 
						letterElement) ;
        		    if (elem)
        		    	{
        		    	// skip over Tero's (TN's) personal library:
						// var author = TN.str.trim(elem[0].innerHTML) ;
						var author = elem[0].innerHTML ;
						// remove beginning em dash:
						author = author.replace(/^\u2014\s*/, '') ;
						break ;
						}
					break ;
				}	// end of SWITCH (SKF.mode)
			return author ;
			}
		,







		// create all elements that compose the web page:
		// create all elements that compose the web page:
		// create all elements that compose the web page:
		createElements: function()
			{
			// cycle through each letter, applying CSS based on author's rank:
			for (var i = SKF.letterElements.length; i--; )
//			for (var i = 0; i < SKF.letterElements.length; i++ )
				{
/*
				// for fun, add the mouse-over/out events to each letter,
				//	just to see what it looks like:
				SKF.letterElements[i]['id'] = SKF.id + '-letter-' + i ;

				GM_log('createElements() Letter ID=[' 
					+ SKF.letterElements[i]['id'] + ']');

				// on MouseOver, highlight the LETTER:
				SKF.bindEvent(SKF.letterElements[i], 'mouseover',
					SKF.eventMouseOverAnyButton, SKF.letterElements[i]) ;
				// on MouseOut, un-highlight the button:
				SKF.bindEvent(SKF.letterElements[i], 'mouseout',
					SKF.eventMouseOutAnyButton, SKF.letterElements[i]) ;
*/
				// isolate letter's author's name:
				var author = SKF.getAuthorFromLetterElement(
					SKF.letterElements[i] ) ;
				// GM_log( 'createElements() found author=[' + author + ']' ) ;

				// the "banned message" is prepended to letter:
				// Added "i" to vars passed: build an ID into the buttons:
				SKF.createBanMessage( SKF.letterElements[i], author, i) ;

				// the action buttons are appended to end of letter:
				// Added "i" to vars passed: build an ID into the buttons:
				SKF.createActionButtons( SKF.letterElements[i], author, i) ;
				}
			}
		,





		// this is the event that will ban author (bound to button pressed):
		// this is the event that will ban author (bound to button pressed):
		// this is the event that will ban author (bound to button pressed):
		eventBanAuthor: function( author)
			{
			// -1 is numeric code for banned:
			SKF.authors[author] = -1 ;
			// re-save authors list to persistence:
			GM_setValue( 'SKFauthors', JSON.stringify( SKF.authors) ) ;
			// update all elements in page with fresh CSS based upon authors:
			SKF.updateClasses() ;
			}
		,




		// this is the event that will RESET author (bound to button pressed):
		// this is the event that will RESET author (bound to button pressed):
		// this is the event that will RESET author (bound to button pressed):
		eventNormalizeAuthor: function( author)
			{
			// 0 = normal (whitelisted) author:
			SKF.authors[author] = 0 ;
			// setting to 0 because deleting can confuse un-ban (re-auto-bans):
			//	delete SKF.authors[author] ;
			// re-save authors list to persistence:
			GM_setValue( 'SKFauthors', JSON.stringify( SKF.authors) ) ;
			// update all elements in page with fresh CSS based upon authors:
			SKF.updateClasses() ;
			//	GM_log( 'eventNormalizeAuthor' ) ;
			}
		,



		// this is the event that will highlight author:
		// this is the event that will highlight author:
		// this is the event that will highlight author:
		eventHighlightAuthor: function( author)
			{
			// 1 = numeric code for highlighted favourite:
			SKF.authors[author] = 1 ;
			// re-save authors list to persistence:
			GM_setValue( 'SKFauthors', JSON.stringify( SKF.authors) ) ;
			// update all elements in page with fresh CSS based upon authors:
			SKF.updateClasses() ;
			//	GM_log( 'eventHighlightAuthor' ) ;
			}
		,



		// this is the event that will give SKF Help:
		// this is the event that will give SKF Help:
		// this is the event that will give SKF Help:
		eventSKFhelp: function( author)
			{
			//	GM_log( 'eventSKFhelp()' ) ;
			GM_openInTab( 'http://salon.maow.net/' ) ;
			}
		,



		// create the banned message(s), each letter gets hidden "banned!" msg:
		// create the banned message(s), each letter gets hidden "banned!" msg:
		// create the banned message(s), each letter gets hidden "banned!" msg:
		createBanMessage: function( letterElement, author, letterNum)
			{
/*
			GM_log( 'createBanMessage(' 
				+ letterNum 
				+ ') found author=[' 
				+ author 
				+ ']') ;
*/

			// ensure an author was provided:
			if (!author) return ;

			// create a new DIV in document
			var container = document.createElement( 'DIV') ;

			// apply SalonKillFile-ban class to our new DIV:
			container.className = SKF.id +'-ban' ;

			// add a new SPAN to document:
			var elem = document.createElement( 'SPAN') ;

			// create the "banned" message
			elem.innerHTML = 'User "' + author + '" is banned.' ;

			// set class of the SPAN part of the ban message:
			elem.className = SKF.id +'-ban-message';

//			container.id = SKF.id + '-' + letterNum ;
//			GM_log( 'createBanMessage() elem.id=[' + container.id + ']' );

			// append the SPAN to the DIV:
			container.appendChild( elem) ;

			// create a Show Post button: .SalonKillFile-ban A {
			var button = document.createElement('A') ;

			// assign an href (link) to button:
			button.href = 'javascript://Show Post' ;
			button.title = 'Show Post';
			// add text label to button:
			button.innerHTML = 'Show post' ;

			// give each button an ID for mouse-over/out events:
			button.id = SKF.id + '-ban-message-button-' + letterNum ;

			// -ban-message-button class = display: inline;
			button.className = SKF.id +'-ban-message-button' ;

			// bind to button, when clicked, show/hide, this letter:
			SKF.bindEvent( button, 'click', 
				SKF.eventToggleHide, letterElement) ;


			// on MouseOver, highlight the button:
			SKF.bindEvent(button, 'mouseover',
				SKF.eventMouseOverAnyButton, button) ;
			// on MouseOut, un-highlight the button:
			SKF.bindEvent(button, 'mouseout',
				SKF.eventMouseOutAnyButton, button) ;


			// add button to container (a DIV with already appended SPAN)
			container.appendChild( button) ;

			// insert letterElement into container at beginning, or simply
			//	append it to container if no container children yet:
			SKF.appendFirst( letterElement, container) ;
			}
		,



		// when button pressed, toggle the Show/Hide functionality:
		// when button pressed, toggle the Show/Hide functionality:
		// when button pressed, toggle the Show/Hide functionality:
		eventToggleHide: function(letterElement)
			{
			//	GM_log( 'eventToggle()!' ) ;

			// create a button from this letter's ban button, with CSS class of
			//	SKF-ban-message-button, and a "A" tag
			var button = TN.class.getElementsByClass( 
				SKF.id +'-ban-message-button', letterElement, 'A')[0] ;
			// if the letter has a "Show" button,
			if (TN.class.contains(letterElement, SKF.id +'-ban-show') )
				{
				button.title = 'Show post' ;
				button.href = 'javascript://Show Post';
				button.innerHTML = 'Show post' ;
				TN.class.remove( letterElement, SKF.id +'-ban-show') ;
				}
			else
				{
				button.innerHTML = 'Hide post' ;
				button.title = 'Hide Post';
				button.href = 'javascript://Hide Post';
				TN.class.add(letterElement, SKF.id +'-ban-show') ;
				}
//	GM_log( 'eventToggleHide() Button.innerHTML=[' + button.innerHTML + ']' ) ;
			}
		,



		// when button moused-over, highlight the button somehow:
		// when button moused-over, highlight the button somehow:
		// when button moused-over, highlight the button somehow:
		eventMouseOverAnyButton: function( buttonObj )
			{
			//	GM_log( 'eventMouseOverAnyButton(' + buttonObj['id'] + ')!' ) ;

			TN.class.add(buttonObj, SKF.id +'-mouse-over') ;
			}
		,

		// when button moused-out, un-highlight the button somehow:
		// when button moused-out, un-highlight the button somehow:
		// when button moused-out, un-highlight the button somehow:
		eventMouseOutAnyButton: function( buttonObj )
			{
			//	GM_log( 'eventMouseOutAnyButton(' + buttonObj['id'] + ')!' ) ;

			TN.class.remove(buttonObj, SKF.id +'-mouse-over') ;
			}
		,
















		// bind elements of event 'type' to handler, which acts upon parameter:
		// bind elements of event 'type' to handler, which acts upon parameter:
		// bind elements of event 'type' to handler, which acts upon parameter:
		bindEvent: function( elem, type, handler, parameter)
			{
			//	GM_log('bindEvent( handler=[' + handler + ']' ) ;
			// add listener for type(=click), where handler = function(e):
			elem.addEventListener( type, function(e)
				{
				// Used to stop the event from bubbling farther up the tree:
				//	Mozilla Name: stopPropagation()
				e.cancelBubble = true ;
				handler( parameter) ;
		        return false ;
		        // false below means don't "useCapture", but bubble event up:
				}, false ) ;

			// why reset elem here?  Anonymous functions don't release memory?
			elem = null ;
			}
		,








		// create the action buttons:
		// create the action buttons:
		// create the action buttons:
		createActionButtons: function( letterElement, author, letterNum)
			{
/*
			GM_log( 'createActionButtons(' 
				+ letterNum
				+ ') found author=[' + author + ']') ;
*/

			// we need an author, else forget it:
			if (!author) return ;


			// put the action buttons into a span (with whitespace: nowrap;!):
			var container = document.createElement( 'SPAN') ;

			// set a CSS class name SalonKillFile-buttons to the span:
			container.className = SKF.id +'-buttons' ;

			// first create a blank button:
			var button = null ;

			// create an array of OBJECTS with text, class, & events of buttons)
			var buttons = [
				{
				text: 'KillFile Help',
				class: SKF.id + '-button-SKF-help',
				event: SKF.eventSKFhelp,
				event_mouse_over: SKF.eventMouseOverAnyButton,
				event_mouse_out: SKF.eventMouseOutAnyButton,
				id: SKF.id + '-button-SKF-help-' + letterNum,
				}
				,
				{
				text: 'Remove ban',
				class: SKF.id + '-button-remove-ban',
				event: SKF.eventNormalizeAuthor,
				event_mouse_over: SKF.eventMouseOverRemoveBan,
				event_mouse_out: SKF.eventMouseOutRemoveBan,
				event_mouse_over: SKF.eventMouseOverAnyButton,
				event_mouse_out: SKF.eventMouseOutAnyButton,
				id: SKF.id + '-button-remove-ban-' + letterNum,
				}
				,
				{
				text: 'Remove highlight',
				class: SKF.id + '-button-remove-highlight',
				event: SKF.eventNormalizeAuthor,
				event_mouse_over: SKF.eventMouseOverRemove,
				event_mouse_out: SKF.eventMouseOutRemove,
				event_mouse_over: SKF.eventMouseOverAnyButton,
				event_mouse_out: SKF.eventMouseOutAnyButton,
				id: SKF.id + '-button-remove-highlight-' + letterNum,
				}
				,
				{
				text: 'Ban author',
				class: SKF.id + '-button-ban-author',
				event: SKF.eventBanAuthor,
				event_mouse_over: SKF.eventMouseOverBan,
				event_mouse_out: SKF.eventMouseOutBan,
				event_mouse_over: SKF.eventMouseOverAnyButton,
				event_mouse_out: SKF.eventMouseOutAnyButton,
				id: SKF.id + '-button-ban-author-' + letterNum,
				}
				,
				{
				text: 'Highlight author',
				class: SKF.id + '-button-highlight-author',
				event: SKF.eventHighlightAuthor,
				event_mouse_over: SKF.eventMouseOverHighlight,
				event_mouse_out: SKF.eventMouseOutHighlight,
				event_mouse_over: SKF.eventMouseOverAnyButton,
				event_mouse_out: SKF.eventMouseOutAnyButton,
				id: SKF.id + '-button-highlight-author-' + letterNum,
				}
				] ;

			// Cycle through buttons, add all 4 buttons to container:
			// WHY? we only display 2 of them at most, don't we?
			//	Because, SKF-button-remove-highlight and SKF-button-remove-ban
			//	are hidden from display but are in the HTML.
			for (var i = buttons.length; i--; )
				{
				// create a button: .SalonKillFile-ban A {
				button = document.createElement('A') ;
				// add href link to button, with status message of button text:
				button.href = 'javascript://' + buttons[i]['text'] ;
				// add a title property to have a pop-up bubble say same thing:
				button.title = buttons[i]['text'] ;
				// add text to button:
				button.innerHTML = buttons[i]['text'];
				// add CSS class to button:
				button.className = buttons[i]['class'];
				// bind this button, onClick, to appropriate event per author:
				SKF.bindEvent(button, 'click',  buttons[i]['event'], author) ;

				// add an ID to each button, based upon letter number, to make
				//	mouse-over/out easier:
				button.id = buttons[i]['id'] ;


				/* I don't like how the mouse-over, mouse-out performs:
					too much lag on FireFox, error on Chrome and the rather
					rudimentary style initially applied turns me off, so 
					no more of these two events.	*/
				/* I've put it BACK on, because removing updateClasses() on
					each mouse-over/out sped things up a LOT	*/
				// on MouseOver, highlight the button:
				SKF.bindEvent(button, 'mouseover',
					buttons[i]['event_mouse_over'], button) ;

				// on MouseOut, un-highlight the button:
				SKF.bindEvent(button, 'mouseout',
					buttons[i]['event_mouse_out'], button) ;
				// append a blank text node to document as space between buttons
				container.appendChild(document.createTextNode(' ') ) ;
				// append our button as a child of the SPAN container:
				container.appendChild(button) ;
				}


			// create element for footer of letter
			var elem = null ;

			// our footer content dependes upon mobile vs normal letters page:
			switch (SKF.mode)
				{
		    	// CHANGED: 2010/11/30: Mobile now shares styles with Normal:
		        case 'normal':
				case 'mobile':
					// this is the normal letters.salon.com:
					elem = TN.class.getFirstChild( letterElement, 
						'letter_entry_footer') ;
					break ;

				case 'mobile_pre_updated_CSS':
					// this is the mobile site: letters.mobile.salon.com:
					elem = TN.class.getFirstChild( letterElement, 
						'letter_entry_author_more') ;
					break ;
				}



			// if we didn't find a proper footer, we're done here
			// Note that Salon's mobile letters archive uses normal footers,
			//	and the normal letters archive uses no footers, 
			//	so in either case elem is null.
			if (!elem) return ;


			// Add SPAN container to letter element:
			elem.appendChild( container) ;
			}
		,















		// if there are no child elements to insert before, then just append:
		// if there are no child elements to insert before, then just append:
		// if there are no child elements to insert before, then just append:
		appendFirst: function( elem, child)
			{
			// test elem for existing children
			if ( elem.children.length != 0)
				{
				// children found, insert child before first current one:
				elem.insertBefore( child, elem.children[0]) ;
				}
			else
				{
				// no existing children, simply append to element
				elem.appendChild( child) ;
				}
			}
		,




		// initialize our script
		// initialize our script
		// initialize our script
		init: function()
			{
			// If current date is after expiresDate, give warning and exit:
			// this version is not QUITE ready for full distribution, so expire:
			if ( RB.util.checkScriptExpired() ) return false ;

			// see if we're running the current version of the script:
			//	SKF.checkNewVersion() ;

			// parse the letters into the SKF object's SKF.letterElements:
			SKF.buildLetterElements() ;
			// if no letters found (mobile or regular), return:
			if (SKF.letterElements.length == 0) return ;
			// add authors and their ranking (-1=kill,+1=Fave,+2=SalonStaff)
			SKF.buildAuthorsList() ;
			// put styles from above into web page:
			SKF.addStylesToWebPage() ;
			// update the class applied to each letter based upon author's rank:
			SKF.updateClasses() ;
			// create all elements that compose the web page:
			SKF.createElements() ;

			// update list of banned content from server:
			RB.util.updateBannedContentList() ;
			}
			,


		} // END of var SKF object def
	;




/*** Tools and libraries *****************************************************/

/** RB CSS Class Tools
 *
 *  Version 1.0, 2010-11-09
 *  Requires JavaScript 1.3 or better
 *
 *  Copyright (c) 2010 Ronald Barnes (ron(at-sign)maow_dot_net)
 *  All worldwide rights reserved.
 *
 *
 */


// initialize object RB (Ronald Barnes):
// initialize object RB (Ronald Barnes):
// initialize object RB (Ronald Barnes):
var RB = RB || { } ;

// define a util object inside RB object: access via: RB.util.functionName()

RB.util = 
	{
	initialized: true,   /** This library is always available */



	// attempt to get an updated banned-content list:
	// attempt to get an updated banned-content list:
	// attempt to get an updated banned-content list:
	updateBannedContentList: function()
		{
		//	GM_log( 'Beginning GM_xmlhttpRequest()' ) ;

		// define the modulus: interval between re-fetching banned content list,
		//	based on this many page loads:
		var everyNthPage = 5 ;

		// It's probably best to update banned-content list every, say, 10 page
		//	loads.  I'm not sure the exact number, but EVERY page load is too
		//	much.   (Ron)  (Switching it to 5 for now...)
		try
			{
			var totalLettersPagesLoaded = 
				GM_getValue( 'SKF.totalLettersPagesLoaded', 0 );
		    }
		catch (e)
			{
			//	GM_log('ERROR: caught error accessing GM_getValue().');
			}

		// increment the number of pages loaded (this runs each letters page):
		totalLettersPagesLoaded++ ;
		// store the current number of pages loaded back into persistence:
		GM_setValue( 'SKF.totalLettersPagesLoaded', totalLettersPagesLoaded);


		// now, if this # pages loads is NOT modulus 10 == 0 (i.e. every 10th),
		//	return.  We ONLY load on the 10th page load(s).
//		if ( totalLettersPagesLoaded > 0 && totalLettersPagesLoaded % 10 == 0)
		var remainder = totalLettersPagesLoaded % everyNthPage ;
		if ( remainder )
			{
			GM_log( 'GM_xmlhttpRequest() skipping update of banned-content '
				+ 'list: ' + (everyNthPage - remainder) 
				+ ' more page(s) to load.' );

			return ;
			}



		GM_xmlhttpRequest(
			{
	    	method: 'GET',
	    	url: 'http://www.maow.net/cgi-bin/getSKF_banned_content.php',

	    	onload: function(responseDetails)
				{
				GM_log( 'GM_xmlhttpRequest() Updated banned-content list.');
				// onload happens when XmlHttpRequest is *finished*:
				//
				// see if new ban list is different from current one:
				var savedBanList ;
				var newBanList ;
				try
					{
					savedBanList = GM_getValue( 'SKF.content_kill_list', 
						content_kill_list ) ;
					newBanList = 
						responseDetails.responseText.replace( /[^\w!-]$/, '' );
				    }
				catch (e)
					{
					//	GM_log('ERROR: caught error accessing GM_getValue().');
					}

				if ( savedBanList != newBanList )
					{
					GM_log('New BANNED CONTENT downloaded!' ) ;
					content_kill_list = newBanList ;
					try
						{
						GM_setValue( 'SKF.content_kill_list', newBanList ) ;
					    }
					catch (e)
						{
						//	GM_log('ERROR: caught error accessing GM_getValue().');
						}

					GM_log('Banned Content list ending onload()\n\n'
						+ 'New content list: [' 
						+ content_kill_list 
						+ ']'
						) ;
					SKF.updateClasses() ;
					//				return ;
					}

				return ;
				}
				,



	    	onerror: function(responseDetails)
				{
				// onerror happens when XmlHttpRequest has *failed*:
				//
				GM_log('ERROR checking for updated banned-content list:'
					+ '\n\n' + responseDetails.responseText
					) ;

				return ;
				}
			}	// end of object built for xmlhttprequest
		) ;	// end of GM_xmlhttprequest() call
		}	// end of updateBannedContent()
		,




		// If current date is after expiresDate, give upgrade warning and exit:
		// If current date is after expiresDate, give upgrade warning and exit:
		// If current date is after expiresDate, give upgrade warning and exit:
		//	NOTE: this is to push out cleaner code, after a bit of time to 
		//	clean it a bit, and to test the traffic that the auto-spam-update
		//	generates.
		checkScriptExpired: function()
			{
			var dateNow = new Date() ;
			var expiresDate = new Date( SKF.expiresDate ) ;
			if ( dateNow > expiresDate )
				{
				var reInstall = confirm( "This version of the " 
					+ SKF.id
					+ " has expired.  Beta testing is nearly complete."
					+ "\n\n"
					+ "Would you like to install the most-recent version "
					+ "from http://salon.maow.net?"
					+ "\n\nNote that any changes you made to various users "
					+ "will be maintained after upgrading!\n\n"
					+ "Thank you for using the SalonKillFile"
					+ '\n\nexpiresDate = [' + expiresDate + ']\n\n'
					+ 'dateNow = [' + dateNow + ']'
					) ;
				if (reInstall == true)
					{
					location.href= 'http://www.maow.net/svn/pub/'
						+ 'salonkillfile/salonkillfile.user.js' ;

					// since user clicked "OK" on new install, give them a 
					//	formatted page, regardless if the later "Discard"ed the
					//	installation:
					return false ;
					}
				return true ;
				}
			return false ;
			}
			,







		// See if a new version of this script is available:
		// See if a new version of this script is available:
		// See if a new version of this script is available:
		checkNewVersion: function()
			{
			var revisionNum = SKF.revisionNum ;
			revisionNum = revisionNum.replace( /\$/g, '' ) ;
			revisionNum = revisionNum.replace( / +$/g, '' ) ;

			//	alert( "Current script version:\n" + revisionNum ) ;
			return true ;
			}
			,

	}	// end of RB object def
		// end of Ron's tools...
		// end of Ron's tools...
		// end of Ron's tools...






/*** Tools and libraries *****************************************************/

/** TN CSS Class Tools
 *
 *  Version 1.0, 2007-6-28
 *  Requires JavaScript 1.3 or better
 *
 *  Copyright (c) 2007 Tero Niemi (talamus(at-sign)gmail_dot_com)
 *  All worldwide rights reserved.
 *
 *
 *  Some minor re-formatting and documentation added by Ronald Barnes, simply
 *	as a learning project.  The code completed and made fully functional by
 *	Tero Niemi.
 *
 *
 *  Tools to manipulate CSS classes in DOM element objects.
 *
 *  The following methods are defined:
 *      TN.class.contains(obj, 'cls') - Does element contain CSS class?
 *      TN.class.add(obj, 'cls')      - Add class into element
 *      TN.class.remove(obj, 'cls')   - Remove class from element
 *
 *      TN.class.getFirstChild(obj, 'cls')
 *                          - Return the first child with required class
 *
 *      TN.class.getElementsByClass('cls'[, root][, 'TAG'])
 *                          - Return all elements with required class
 */
var TN = TN || { };
TN.class = 
	{
	initialized: true,   /** This library is always available */

	/** TN.class.contains(DOMobj, CSSclass)
	 *
	 *  Does element contain CSS class?
	 *	Each element can have classes applied, this will confirm if CSSclass is.
	 *
	 *  @param DOMobj    (Element)   Dom element object
	 *  @param CSSclass  (String)    Class name
	 *  @returns         (Boolean)   True if contains, False otherwise
	 */
	contains: function( DOMobj, CSSclass)
		{
		// if DOMobj is null or doesn't have .className, return false:
		// .className contains the value(s) of the class attribute(s) of the 
		//	specified element.
		if (!DOMobj || !DOMobj.className) return false ;

		//	GM_log( 'DOMobj.className=:' + DOMobj.className + ':  and seeking :' 
		//	+ CSSclass + ':' ) ;

		// pad .className with spaces so our CSSclass can be matched ala \w
		var str = ' ' + DOMobj.className + ' ' ;

		// if DOMobj.className contains isolated CSSclass, return its offset,
		//	i.e. true, if not exist, .indexOf will return false:
		return ( str.indexOf(' ' + CSSclass + ' ') >= 0 ) ;
		}
	,



/** TN.class.add(obj, cls)
 *
 *  Add class into element only if it is not already there.
 *
 *  @param obj    (Element)   Dom element object
 *  @param cls    (String)    Class name
 */
add: function(obj, cls) {
    if (!obj || TN.class.contains(obj, cls)) return;
    if (!obj.className) {
        obj.className = cls
    } else {
        obj.className += ' ' + cls;
    }
},

/** TN.class.remove(obj, cls)
 *
 *  Remove class from element, safely and cleanly.
 *
 *  This function is quick because it doesn't use
 *  regular expressions!
 *
 *  @param obj    (Element)   Dom element object
 *  @param cls    (String)    Class name
 */
remove: function(obj, cls) {
    if (!obj || !obj.className) return;
    cls = ' ' + cls + ' ';
    var str = ' ' + obj.className + ' ';
    if (cls == str) {
        obj.className = '';
        return;
    }
    var pos = str.indexOf(cls);
    if (pos < 0) return;
    str = str.substring(pos ? 1 : 0, pos)
        + str.substring(pos + cls.length - (pos ? 1 : 0), str.length - 1);
    obj.className = str;
},

/** TN.class.getFirstChild(obj, cls)
 *
 *  Returns first child of the element with required class.
 *
 *  @param obj  (Element)   Dom element object
 *  @param cls  (String)    Class name
 *  @returns    (Element)   First child with class, null if none
 */
getFirstChild: function(obj, cls) {
    if (!obj || !obj.childNodes) return null;
    for (var i = 0; i < obj.childNodes.length; ++i) {
        if (TN.class.contains(obj.childNodes[i], cls)) {
            return obj.childNodes[i];
        }
    }
    return null;
},

/** TN.class.getElementsByClass(cssClass[, root][, DOMtag])
 *
 *  Returns array of elements with required class.
 *
 *  @param cssClass (String)    [CSS] Class name
 *  @param [root]   (Element)   Root node to start searching, default: document
 *  @param [DOMtag] (String)    DOM Tag type to search, default: '*' (i.e. DIV)
 *  @returns        (Array)     Array of elements, null if none
 */
	getElementsByClass: function(cssClass, root, DOMtag)
		{
		// if starting point not specified, assume "document", i.e. whole page
		// Note that only the descendants of this element are included in 
		//	the search, but not the element itself.
		root = root || document ;
		// if no tag specified, search for any DOM object with such class:
	    DOMtag = DOMtag || '*' ;

		// if getElementsByTagName is not supported, return null
		//	(when might this happen?)
	    if (!root.getElementsByTagName) return null;

//GM_log( 'getElementsByClass(' + cssClass + ', ' + root + ', ' + DOMtag + ')' ) ;

		// define our return value (which is an array or null):
	    var classElements = new Array() ;


		// Get everything with DOM type "tag" from starting point of root:
		// Note that only the descendants of this element are included in 
		//	the search, but not the element itself.
	    var allElements = root.getElementsByTagName( DOMtag) ;

		// cycle through any found elements, putting matches into our return array:
		for (var i = allElements.length; i--; )
	    	{
	    	// see if we have a match to user's CSS class:
			if (TN.class.contains(allElements[i], cssClass))
				{
				// we have a match, so append it to our return value array:
				classElements.push( allElements[i]) ;
				}
			}
		// return found matches, or null if nothing matched:
		return (classElements.length)?(classElements):(null) ;
		}

}; /*** /TN.class ***/











/*** GM_getValue and GM_setValue for Google Chrome ***************************/

if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported") > -1) {
    if (typeof localStorage !== "undefined") {
		// alert('Chrome and Opera follow this path...') ;

        this.GM_getValue = function(key, def) {   return localStorage[key] || def; };
        this.GM_setValue = function(key, value) { return localStorage[key] = value; };
    } else {
        this.GM_getValue = function(key, def) {   return def; };
        this.GM_setValue = function(key, value) { return null; };
    }
}



// for OPERA, remap GM_log to opera.postError: (RON)
// for OPERA, remap GM_addStyle to GM_addStyleOpera (defined further down)
try
	{
	var isOpera = null;
	isOpera = opera.postError ;
	this.GM_log = function(message) { return opera.postError( message) ; } ;
	this.GM_addStyle = GM_addStyleOpera ;
	// next still fails due to out-of-domain security block:
	this.GM_xmlhttpRequest = GM_xmlhttpRequestOpera ;
	//	alert( 'Opera?!? Should be ONLY Opera!');

	// remap xmlhttpRequest on non-Firefox browsers, as there is a 
	//	out-of-domain security error:  (RON)
	this.GM_xmlhttpRequest = function(){ GM_log('Chrome/Opera: Skipping update-'
		+ 'banned-content list to avoid security error.'); return false; };
	}
catch(e)
	{
	// error: Chrome follows THIS path
	//	alert( "Error: this should be Chrome or Firefox.");
	}


/* GM_addStyle() came from 
	http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js,
	which was found at:
	http://www.howtocreate.co.uk/operaStuff/userJavaScript.html#compatibility
	where the following GM_addStyleOpera() was found, where it was called
	GM_addStyle(), however Chrome kept parsing the function and loading it,
	even though it was in a code block try-ing to avoid that. (RON)

	The following copyright notice appears to apply not only to the (uncopied)
	GM_xmlhttpRequest() function:
	*/

/* GM_xmlhttpRequest implementation adapted from the
Turnabout GM compatibility library:
http://www.reifysoft.com/turnabout.php
Used under the following license:

 Copyright (c) 2005, Reify Software, Inc.
 All rights reserved.

 Redistribution and use in source and binary forms,
 with or without modification, are permitted provided
 that the following conditions are met:

 1) Redistributions of source code must retain the
    above copyright notice, this list of conditions
    and the following disclaimer.
 2) Redistributions in binary form must reproduce the
    above copyright notice, this list of conditions
    and the following disclaimer in the documentation
    and/or other materials provided with the
    distribution.
 3) Neither the name of the Reify Software, Inc. nor
    the names of its contributors may be used to
    endorse or promote products derived from this
    software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS
 AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED    
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
 USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
 USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 OF SUCH DAMAGE.

*/
 
//yes, I know the domain limitations, but it's better than an outright error
function GM_xmlhttpRequestOpera(details) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var responseState = {
            responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
            responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
            readyState:xmlhttp.readyState,
            responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
            status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
            statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
        }
        if (details["onreadystatechange"]) {
            details["onreadystatechange"](responseState);
        }
        if (xmlhttp.readyState==4) {
            if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                details["onload"](responseState);
            }
            if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                details["onerror"](responseState);
            }
        }
    }
    try {
      //cannot do cross domain
      xmlhttp.open(details.method, details.url);
    } catch(e) {
      if( details["onerror"] ) {
        //simulate a real error
        details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
      }
      return;
    }
    if (details.headers) {
        for (var prop in details.headers) {
            xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
    }
    xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
}

function GM_addStyleOpera(css) {
	var NSURI = 'http://www.w3.org/1999/xhtml';
	var hashead = document.getElementsByTagName('head')[0];
	var parentel = hashead || document.documentElement;
	var newElement = document.createElementNS(NSURI,'link');
	newElement.setAttributeNS(NSURI,'rel','stylesheet');
	newElement.setAttributeNS(NSURI,'type','text/css');
	newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
	if( hashead ) {
		parentel.appendChild(newElement);
		} else {
		parentel.insertBefore(newElement,parentel.firstChild);
		}
	}


/*** JSON for browsers without JSON ******************************************/

if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
































	/*** Launch SalonKillFile *************************************************/
	SKF.init() ;


	} // END of function() that starts the whole script / object
)() ; // eof
