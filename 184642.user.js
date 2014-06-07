// ==UserScript==
// @name          TweetDeck Growl JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Sends Growl notifications from the tweetdeck website when there is a new tweet, Number of columns gets registered with growl app
// @include       https://tweetdeck.twitter.com/*
// @version        1.71
//@date 2014-04-07
// ==/UserScript==

GrowlMonkey = function(){
    function fireGrowlEvent(type, data){
        var element = document.createElement("GrowlEventElement");
        element.setAttribute("data", JSON.stringify(data));
        document.documentElement.appendChild(element);

        var evt = document.createEvent("Events");
        evt.initEvent(type, true, false);
        element.dispatchEvent(evt);
    }
    
    return {
        register : function(appName, icon, notificationTypes){
            var r = {};
            r.appName = appName;
            r.icon = icon;
            r.notificationTypes = notificationTypes;
            fireGrowlEvent("GrowlRegister", r);
        },
        
        notify : function(appName, notificationType, title, text, icon){
            var n = {};
            n.appName = appName;
            n.type = notificationType;
            n.title = title;
            n.text = text;
            n.icon = icon;
            fireGrowlEvent("GrowlNotify", n);
        }
    }
}();

	try{
		function TweetDeckColumns(){
	       var Var="exist";
	       var i=0;
	       while (Var=="exist"){
	           if(document.getElementsByClassName('js-app-columns app-columns horizontal-flow-container without-tweet-drag-handles')[0].getElementsByTagName('section')[i]){
	               i+=1;
	               console.log("Column "+i+" exists");
	           }
	           else{
	               Var="doesn't exist";
	           }
	       }
	       columns=i;
	       return columns;
	   }
        function TweetDeckGrowlinit(appname,Columns){
            console.log('Starting TweetDeck Growl');
            
            var j;
            var ntNewTweet = {};
            var types=new Array();
            for(var i=1;i<=Columns;i++){
                j=i-1;
                ntNewTweet["Column"+i]={};
                ntNewTweet["Column"+i].name='column'+i+'NewTweet';
                ntNewTweet["Column"+i].displayName = 'Column '+i+' New Tweet';
                ntNewTweet["Column"+i].enabled = true;

                types [j]= ntNewTweet["Column"+i];
                //console.log("registering column"+i);
            }
            //console.log(types);
            GrowlMonkey.register(appname, "https://pbs.twimg.com/profile_images/3759540932/051e36e98a2b3776061fa6f611f5dcb0.png", types);
        }
        function defaultValues(oldtweet,tweet,Columns){
			var j;
            for(var i=1;i<=Columns;i++){
				j=i-1;
                oldtweet[j]="Dinosaur walks into a bar";
                tweet[j]="Dinosaur walks into a bar";
            }
            return [oldtweet,tweet];
        }
        function TweetDeckinterval(oldtweet,tweet,appname,Columns){
            var j,i;
			var column,TweetContainer;
            // multiple columns
            for(i=1;i<=Columns;i++){
                j=i-1;
				var ColumnHeader,ColumnHeaderAccount,account=null,image=null,retweeter="";
				
                console.log('Column '+i);
                oldtweet[j]=tweet[j];
				//default
				tweet[j]=null;
                //long way of getting to info, will use getElementsByClassName later
               column=document.getElementsByClassName('js-app-columns app-columns horizontal-flow-container without-tweet-drag-handles')[0].getElementsByTagName('section')[j];
               //console.log('column found');
               
               //column header
			   //trends compability problem
			   console.log(column.className);
				if(column.className=="js-column column  type-twitter"){
					ColumnHeader=column.getElementsByTagName('div')[0].getElementsByClassName('column-panel')[0].getElementsByTagName('header')[0].getElementsByTagName('h1')[0].innerHTML;
					ColumnHeaderAccount="";
				}
				else{
					ColumnHeader=column.getElementsByTagName('div')[0].getElementsByClassName('column-panel')[0].getElementsByTagName('header')[0].getElementsByTagName('h1')[0].getElementsByClassName('column-head-title')[0].innerHTML;
					//column header account
					ColumnHeaderAccount=column.getElementsByTagName('div')[0].getElementsByClassName('column-panel')[0].getElementsByTagName('header')[0].getElementsByTagName('h1')[0].getElementsByClassName('attribution txt-mute txt-sub-antialiased')[0].innerHTML;
					console.log("column Header:"+ColumnHeader+" account:"+ColumnHeaderAccount);
				}
				//column header length restriction to 40 characters
				if(ColumnHeader.length>40){
					ColumnHeader=ColumnHeader.substring(0,40)+"...";
				}
				
               if(column.getElementsByTagName('div')[0].getElementsByClassName('column-panel')[0].getElementsByClassName('column-content')[0].getElementsByClassName('js-column-scroller js-dropdown-container column-scroller scroll-v scroll-styled-v')[0].getElementsByClassName('js-chirp-container')[0]){
                    //compabitility issue with tweetdeck trends
                    TweetContainer=column.getElementsByTagName('div')[0].getElementsByClassName('column-panel')[0].getElementsByClassName('column-content')[0].getElementsByClassName('js-column-scroller js-dropdown-container column-scroller scroll-v scroll-styled-v')[0].getElementsByClassName('js-chirp-container')[0].getElementsByTagName('article')[0];
                    //console.log('TweetContainer');                    
                    if(!TweetContainer){
                        //empty column
                        console.log("EMPTY column");
                        /*var account=null;
                        tweet[j]=null;
                        var image=null;*/
                    }
                    //WARNING below
                    else if(TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0]){
                    	//check if it's a retweet
						console.log(TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByTagName('div')[0].className);
						console.log(TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByTagName('div')[1].className);
						console.log(TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByTagName('div')[2].className);
                    	if(TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByTagName('div')[0].className!="obj-left item-img tweet-img"){
							//div class tweet-context txt-small txt-mute padding-bs
							//div class nbfc
							//a
                    		retweeter=TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByClassName('tweet-context txt-small txt-mute padding-bs')[0].getElementsByClassName('nbfc')[0].getElementsByTagName('a')[0].innerHTML;
                    		retweeter="Retweeted by "+retweeter+"\n\n";
                    		console.log("retweeter:"+retweeter);
                    	}/*
                    	else{
                    		var retweeter="";
                    	}*/
                        var account=TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByTagName('header')[0].getElementsByClassName('account-link link-complex block')[0].getElementsByTagName('div')[1].getElementsByTagName('span')[0].getElementsByTagName('b')[0].innerHTML;
                        //console.log('account found'+account);
                        tweet[j]=TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByClassName('tweet-body')[0].getElementsByTagName('p')[0].innerHTML;
                        //console.log('tweet found');
                        image=TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('js-tweet tweet')[0].getElementsByTagName('header')[0].getElementsByClassName('account-link link-complex block')[0].getElementsByTagName('div')[0].getElementsByTagName('img')[0].src;
                        //console.log('image source: '+image);
                
                        //remove <...>
                        tweet[j]=removeHtml(tweet[j]);
                        console.log(account+': '+tweet[j]);
                    }
                    else{
                        //following me
                        if(TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('activity-header cf')[0]){
                            console.log("Someone is following me");
                            account=TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('activity-header cf')[0].getElementsByClassName('nbfc')[0].getElementsByTagName('a')[0].getElementsByTagName('b')[0].innerHTML;
							tweet[j]=account+" is following me";
                            image=TweetContainer.getElementsByTagName('div')[0].getElementsByClassName('account-summary cf')[0].getElementsByClassName('obj-left item-img')[0].getElementsByTagName('img')[0].src;
                        }
                        //dm
                        else if(ColumnHeader=="Messages"){
							console.log("DM column");
							account=TweetContainer.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('header')[0].getElementsByClassName('account-link link-complex block')[0].getElementsByClassName('nbfc')[0].getElementsByTagName('span')[0].getElementsByTagName('b')[0].innerHTML;
							//console.log('account found'+account);
							tweet[j]=TweetContainer.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByClassName('l-table')[0].getElementsByClassName('tweet-body l-cell')[0].getElementsByTagName('div')[0].getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML;
							//console.log('tweet found');
							image=TweetContainer.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('header')[0].getElementsByClassName('account-link link-complex block')[0].getElementsByClassName('obj-left item-img tweet-img')[0].getElementsByTagName('img')[0].src;
							//console.log('image source: '+image);
                	
                            //remove <...>
							tweet[j]=removeHtml(tweet[j]);
							//remove entities and replace
							tweet[j]=removeHtmlEntities(tweet[j]);
							console.log(account+': '+tweet[j]);
						}
                        //added to a list
                        else if(TweetContainer.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByClassName('pull-right icon icon-list activity-indicatior')[0]){
                            console.log("Someone added you to a list");
                            account=TweetContainer.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByClassName('nbfc').getElementsByTagName('a')[0].getElementsByTagName('b')[0].innerHTML;
                            var listname=TweetContainer.getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByClassName('nbfc').getElementsByTagName('strong')[0].getElementsByTagName('a')[0].innerHTML;
                            tweet[j]=account+" has added you to their list "+listname;
                        }
						else{
							console.log("no idea");
						}
                     }
                
                    if(oldtweet[j]!=tweet[j]){
                        //GrowlMonkey.notify("APPLICATION NAME", "NOTIFICATION TYPE", "TITLE", "TEXT", "ICON URL");
                        console.log("column"+i+"NewTweet");
                        GrowlMonkey.notify(appname,"column"+i+"NewTweet",account,retweeter+tweet[j]+"\n\n("+i+")"+ColumnHeader+" "+ColumnHeaderAccount,image);
                    }
                    else{
                        console.log('no new tweet');
                    }
                }
                else{
                    console.log("Column "+i+" DOESN'T EXIST");
                }
            }
            return [oldtweet,tweet];
        }
        function removeHtml(string){
            //find 1st occurence of <
            var lessthan=string.indexOf("<");
            while(lessthan!=-1){
                //console.log("check: "+tweet);
                //find 1st occurence of >
                var greaterthan=string.indexOf(">");
                //the html stuff
                var htmlstuff=string.substring(lessthan,greaterthan+1);
                //replacing html with nothing
                string=string.replace(htmlstuff,"");
                //update lessthan
                lessthan=string.indexOf("<");
            }
            //console.log("end of if statements");
            return string;
        }
        function removeHtmlEntities(string){
            var entitiesNumbers=["&#34;","&#39;","&#38;","&#60;","&#62;","&#160;","&#161;","&#162;","&#163;","&#164;",
            "&#165;","&#166;","&#167;","&#168;","&#169;","&#170;","&#171;","&#172;","&#173;","&#174;",
            "&#175;","&#176;","&#177;","&#178;","&#179;","&#180;","&#181;","&#182;","&#183;","&#184;",
            "&#185;","&#186;","&#187;","&#188;","&#189;","&#190;","&#191;","&#215;","&#247;"];
			var entitiesName=["&quot;","&apos;","&amp;","&lt;","&gt;","&nbsp;","&iexcl;","&cent;","&pound;","&curren;",
			"&yen;","&brvbar;","&sect;","&uml;","&copy;","&ordf;","&laquo;","&not;","&shy;","&reg;",
			"&macr;","&deg;","&plusmn;","&sup2;","&sup3;","&acute;","&micro;","&para;","&middot;","&cedil;",
			"&sup1;","&ordm;","&raquo;","&frac14;","&frac12;","&frac34;","&iquest;","&times;","&divide;"];
            var character=["\"","'","&","<",">"," ","¡","¢","£","¤",
            "¥","¦","§","¨","©","ª","«","¬","�­","®",
            "¯","°","±","²","³","´","µ","¶","·","¸",
            "¹","º","»","¼","½","¾","¿","×","÷"];
            var replace="yes";
            while(replace=="yes"){
                //replace
                for(var i=0;i<entitiesNumbers.length;i++){
                    var Number=string.indexOf(entitiesNumbers[i]);
					var Name=string.indexOf(entitiesName[i]);
                    if(Number!=-1){
                        string=string.replace(entitiesNumbers[i],character[i]);
                    }
					if(Name!=-1){
                        string=string.replace(entitiesName[i],character[i]);
					}
                }
                replace="no";
                //check if there is more replacements
                for(var i=0;i<entitiesNumbers.length;i++){
                    var Number=string.indexOf(entitiesNumbers[i]);
					var Name=string.indexOf(entitiesName[i]);
                    if(Number!=-1){
                        replace="yes";
                    }
					if(Name!=-1){
                        replace="yes";
					}
                }
            }
            return string;
        }
        function destroyGrowl(){
            var growlexist="exist";
            while( growlexist=="exist"){
                if(document.getElementsByTagName("growleventelement")[0]){
                    growlexist="exist";
                    var parent=document.getElementsByTagName("html")[0];
                    var child=document.getElementsByTagName("growleventelement")[0];
                    parent.removeChild(child);
                }
                else{
                    //doesn't exist
                    growlexist=" doesn't exist";
                }
            }
        }
        
        
        //Main Script starts here
        console.log("Starting TweetDeck Growl JPC")
        setTimeout(function(){
            var appname= 'TweetDeck Growl';
            //find out how many columns there are
            var Columns=TweetDeckColumns();
            TweetDeckGrowlinit(appname,Columns);
            tweet={};
            oldtweet={};
            var Myvar=defaultValues(oldtweet,tweet,Columns);
            oldtweet=Myvar[0];
            tweet=Myvar[1];
            setInterval(function(){
                Myvar=TweetDeckinterval(oldtweet,tweet,appname,Columns);
                oldtweet=Myvar[0];
                tweet=Myvar[1];
                destroyGrowl();
            },2000);            
        },10000);
    }
    catch(err){
        txt="There was an error on this page.\n";   
        txt+="Error description: " + err.message + "\n"; 
        txt+="Error line "+err.lineNumber+ "\n";
        txt+="Click OK to continue.\n";   
        console.log(txt);
    }
    console.log("end of loop");