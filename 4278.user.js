////////////////////////////////////////////////
//IE Media Mimic 0.8.6b User Script           //
//Verison 0.8.6b                              //
//05/09/2006                                  //
//Author: Vectorspace                         //
////////////////////////////////////////////////

// ==UserScript==
// @name            IE Media Mimic
// @version         0.8.6b
// @namespace       http://homepage.ntlworld.com/vectorspace/greasemonkey/
// @description     Version 0.8.6b. Mimics the way that IE uses WMP to play most media files.
// @include         *
// ==/UserScript==

//              *v0.8.6b: Fixes minor bug in settings window code (basic settings default
//                button does not reset convert pages automatically setting

//             	*Converts bgsound to embed, adding width=0 height=0 autostart=1 to simulate
//                bgsound properties
//              *For all object and embed statements, finds file extension and checks
//                against list - if found converts to WMP plugin type/parameters. If could not
//                convert based on file extension, scans MIME type against type list and
//                converts if found.
//              *Converts by adding type application/x-mplayer2 - this forces Firefox to use
//                WMP plugin
//              *Updates following parameters:
//                  *Converts all true/false parameters (axcept loop and playcount) to 1/0
//                  *loop=infinite or loop=-1 to playcount=true
//                  *loop=false to playcount=1
//                  *loop=0 removed
//                  *all other loop values straight to playcount
//                  *hidden=0 to width=0 height=0
//                  *strips search parameters from source file url while determining file
//                    extension ('?' and all after)
//                  *Converts Uimode parameter:
//                      *Uimode=none - showcontrols=0 showstatusbar=0
//                      *All other Uimode values to showcontrols=1 showstatusbar=1
//              *If width or height is absent, set to minimum
//                  *width minimum is 280
//                  *height minimum is height of controls (44) if visible, plus height of
//                    status bar (23) if visible, plus 3/4 of width if is video
//                  *If width or height is specified as a percentage, calculations are based
//                    on dimensions as rendered by Firefox.
//              *Also converts WMP ActiveX objects to regular WMP objects
//                  *Only works for specific classid's (WMP classid's)
//                  *renames url parameter to fileName
//                  *removes classid and codebase attributes
//                  *then converts like any other object
//                  *ActiveX conversion disableable, and can be set to only convert
//                    objects if file extension is in list
//              *NEW IN 0.8.6: Manual page conversion now possible, through keyboard shortcuts
//                and menu items in Tools > User Script Commands:
//                  *Convert Page - refreshes current page, conversion performed after refresh
//                      *"Convert Page"  menu item
//                      *"Ctrl+Shift+C" keyboard shortcut. 
//                  *Quick Convert - converts without refreshing page, but cannot fully
//                    convert frameset pages with frames from different domains.
//                      *"Quick Convert" menu item
//                      *"Ctrl+Shift+Q" keyboard shortcut
//                    warning spawned if Quick Convert cannot convert page
//              *NEW IN 0.8.6: HTML interface for editing settings, accessed through
//                "Tools > User Script Settings > IE Media Mimic: Settings" menu item
//                Changeable settings:
//                  *Convert ActiveX objects yes/no
//                  *Convert ActiveX objects even if file type is not in list yes/no
//                  *Convert BGsound tags yes/no
//                      *Convert pages automatically yes/no
//                      *Lists of video/audio MIME/File types changeable
//                  *Warning on Quick Convert failure
//                Settings are saved with Firefox's settings (about:config/prefs.js, as
//                Greasemonkey settings)


(function()
{
//******************************************************************
//Initial Script Operations
//******************************************************************

        //Global variables/settings
    var currentDocument         //Current document object
    var maxFrameLvl=3           //Number of frame levels down to convert
    var frameAccessError=false  //Frame access denied flag
    var autoConvStatus=false    //Convert status (auto/manual) flag
    var winArray=new Array()    //Array of window objects
    var settingsWindow          //Settings popup window object
    var crossDomSub=false       //Page is sub frame from different domain flag
    var autoConvert=GM_getValue("autoConvert")          //Get stored Auto conversion setting
    var specialConvert=GM_getValue("specialConvert")    //get stored forced conversion setting

    if((autoConvert)||(specialConvert))                 //If auto or special conversion flag is set
        autoConvStatus=true                             //Set automatic conversion status flag to true

    if(top==self)                                       //If window is top (not a sub frame)
        top.addEventListener("load",initialise,false)   //Add event listener to window  - initialise script on window load

    else                                                //Else if window is a sub frame
        initialise()                                    //Initialise script immediately

//******************************************************************
//Script Initialisation Functions
//******************************************************************

    //=================================================
    //initialise()
    //Called by window load event (top frame) or
    //immediately (sub frame). Registers menu commands
    //and calls initialisation functions 
    //=================================================
    function initialise()
    {
        winArray.push(self)     //Add current window object to window array

        if(top==self)           //If window is top (not a sub frame)
        {
            if(specialConvert)  //If conversion is forced
                GM_setValue("specialConvert",false) //Clear specialConvert setting      

            frameTree()         //Generate array of page window objects
    
            //GM_registerMenuCommand("IE Media Mimic: Convert Page    Ctrl+Shift+C",function(){GM_setValue("specialConvert",true),top.location.reload();})  //Register Convert Page menu item
            GM_registerMenuCommand("IE Media Mimic: Convert Page    Ctrl+Shift+C",reloadConvert)  //Register Convert Page menu item
            GM_registerMenuCommand("IE Media Mimic: Quick Convert    Ctrl+Shift+Q",convertPage) //Register Soft Convert menu item
            GM_registerMenuCommand("IE Media Mimic: Settings",openSettingsWindow)               //Register Settings menu item
            GM_registerMenuCommand("IE Media Mimic: About",aboutScript)                         //Register About menu item
            top.removeEventListener("load",initialise,false)     //Remove window load listener
        }
        else                        //Else if page is a sub frame
        {
            try
            {
                top.document.body   //Attempt access to body of top frame
            }
            catch(err)
            {
                crossDomSub=true    //If cannot access top frame, set cross domain subframe flag to true
            }
        }
        addKeyListeners()   //Add keydown listeners
    
        if(autoConvStatus)  //If auto convert flag is set
            convertPage()   //Convert Page
    }

    //=================================================
    //frameTree()
    //Navigates the sub frames of document, recursively
    //generating array of window objects of all sub
    //frames
    //=================================================
    function frameTree(thisWin,lvl)
    {
        var validFrame
        if(thisWin==undefined)  //If thisWin argument not present, set to document
            thisWin=window
        
        if(lvl==undefined)      //If lvl argument not present, set to 0 (top level)
            lvl=0

        if(lvl<=maxFrameLvl)    //If current level less than or equal to max
        {
            for (var i=0;i<thisWin.frames.length;i++)   //For all sub frames of this window object
            {
                validFrame=true                         //Set valid frame flag to true
                try
                {
                    thisWin.frames[i].document.body     //Attempt to access sub frame
                }
                catch(err)                              //If access is denied
                {
                    validFrame=false                    //Clear validFrame flag
                    frameAccessError=true               //Set frame access error flag
                }
                if (validFrame)                         //If frame access was allowed
                {
                    winArray.push(thisWin.frames[i])    //Add frame to array of window objects
                    frameTree(thisWin.frames[i],lvl+1)  //Call frameTree for current frame window
                }
            }
        }
    }

    
    //=================================================
    //keyStart()
    //Keyboard shortcut to initiate page conversion.
    //Called by document keydown listener
    //=================================================
    function keyStart(event)
    {
        if((event.altKey==0)&&((event.shiftKey==1)&&(event.ctrlKey==1)))  //If Shift & Ctrl keys are pressed but Alt isn't
        {
            if(event.keyCode==67)                   //If C key is pressed
            {reloadConvert()
                /*GM_setValue("specialConvert",true)  //Set special convert setting
                top.location.reload()               //Force page reload*/
            }
            else if (event.keyCode==81)   //Else if Q key is pressed
            {
                autoConvStatus=false    //Clear auto converted status flag
                convertPage()           //Convert page
            }
        }
    }

    //=================================================
    //addKeyListeners()
    //Adds event listeners to document.
    //=================================================
    function addKeyListeners()
    {
        for(var i=0;i<winArray.length;i++)                              //for all window objects in array
            winArray[i].document.addEventListener("keydown",keyStart,false)  //Add key down listener to document object(for keyboard shortcut initiate)

        document.addEventListener("unload",cleanupKeyListeners,false)   //Add window unload listener (to remove listeners)
    }
    
    //=================================================
    //cleanupKeyListeners()
    //Removes event listeners from document. Called by
    //window unload lisneter.
    //=================================================
    function cleanupKeyListeners()
    {
        for(var i=0;i<winArray.length;i++)                                  //for all window objects in array
            winArray[i].document.removeEventListener("keydown",keyStart,false)  //Remove key down listener to document object

        document.removeEventListener("unload",cleanupKeyListeners,false)    //Remove window unload listener
    }

    //=================================================
    //aboutScript()
    //Launch alert with about script info
    //=================================================
    function aboutScript()
    {
        var about="IE Media Mimic 0.8.6b\n\nAuthor: Vectorspace\n05/09/2006\nhttp://homepage.ntlworld.com/vectorspace/greasemoneky/\n\nModifies embedded audio/video on all web pages to play in Firefox more like how they would play in IE.\n\nTo trigger the conversion of a web page:\n* Click \"Tools\" &gt; \"User Script Commands\" > \"IE Media Mimic: Convert Page\"\n* Use the keyboard shortcut Ctrl+Shift+C\nThis will cause the page to refresh, so any data you have entered into the page may be lost.\n\nTo perform a Quick Conversion:\n* Click \"Tools\" >; \"User Script Commands\" > \"IE Media Mimic: Quick Convert\"\n* Use the keyboard shortcut Ctrl+Shift+Q\nThe page will covert instantly without refreshing, but Quick Convert cannot always access every part of some pages.\n\nTo modify the script settings click Tools > \"User Script Commands\" > \"IE Media Mimic: Settings\"\n\n--------------------------\n\nChanges from v0.8.6a:\n* Minor bug fix in settigns window code\n\n--------------------------\n\nChanges from v0.8.4:\n* Replaced original (0.8.4) settings code with true xhtml-crafted settings page\n* Two manual conversion options added (convert and Quick convert), triggerable through keyboard shortcuts or menu items\n* can be set to convert automatically\n* Major re-write of initialisation and and conversion triggering code to support manually-triggerable conversions\n* removal of experimental code from 0.8.3\n* added about menu item"
        alert(about)
    }

    //=================================================
    //reloadConvert()
    //Add unload event listener to window object to
    //trigger auto conversion on refresh and reload
    //page
    //=================================================
    function reloadConvert()
    {
        window.addEventListener("unload",forceAutoConvert,false)    //Add unload listener to window
        top.location.reload()                                       //Force page reload
    }

    //=================================================
    //forceAutoConvert()
    //On window unload, set specialConvert setting to
    //true to force auto conversion then remove event
    //listener
    //=================================================
    function forceAutoConvert()
    {
        GM_setValue("specialConvert",true)                          //Set special convert setting
        window.removeEventListener("unload",forceAutoConvert,false) //Remove unload listener
    }

//******************************************************************
//Page Media Conversion Functions
//******************************************************************

    //=================================================
    //convertPage()
    //Initiate page conversion
    //=================================================
    function convertPage()
    {
        processSettings()   //Get stored variables

        if(autoConvStatus)  //If page is converting automatically
            var winCount=1  //Only convert first object on array of window objects (current document)
        else
            var winCount=winArray.length    //Else convert all of them

        for(i=0;i<winCount;i++)             //for all window objects in page
        {
            currentDocument=winArray[i].document    //Set currentDocument to the document of current window object

            if(convBg)                  //If convert BGsound flag set, replace bgsound tags to embed tags
                replaceBgsound()
    
            scanEmbed()                 //Scan and convert embed tags
            scanObject()                //Scan and convert object tags
        }

        if(!autoConvStatus)             //If page is not auto-converting
        {
            if((crossDomSub)||(frameAccessError))   //If page is cross-domain subframe or top frame cannot access all child frames
                quickConvertError()                 //Throw Quick Convert Fail error message
        }

        autoConvStatus=false                        //Clear auto conversion status flag
    }

    //=================================================
    //quickConvertError()
    //Throws error message on Quick Convert failure
    //(if script is set to) with option to perform
    //full conversion
    //=================================================
    function quickConvertError()
    {
        //Error Message
        var errorMsg="IE Media Mimic\nERROR - Quick Conversion failed.\n\nQuick Convert cannot convert all parts of this page.\nClick OK to perform a standard conversion - the page will refresh so any data you have entered in the page may be lost."

        //Throw error message
        if((qcfAlert)&&(confirm(errorMsg)))     //If message reply was Ok and script is set to convert page
        {
            GM_setValue("specialConvert",true)  //Set special convert setting (to force auto convert)
            top.location.reload()               //Force page reload
        }
    }
    
    //=================================================
    //processSettings()
    //Retrieves stored settings, sets any undefined
    //settings to default
    //=================================================
    function processSettings()
    {
    //--------------------------------
    //Default settings definitions
    //--------------------------------
        //Basic Settings
        autoConvertDefault=false    //Set to true for pages to convert automatically, instead of when triggered
        convAxDefault=true          //Set to true to convert ActiveX objects
        forceAxDefault=true         //Set to true and all WMP ActiveX objects are converted, regardless of file type
        convBgDefault=true          //Set to true to convert bgsound tags
        qcfAlertDefault=true        //Set to true to show alert if Quick Convert fails
    
            //WMP ClassID list
        classIdList=new Array(
        "clsid:6bf52a52-394a-11d3-b153-00c04f79faa6",
        "clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95")
//CLSID:05589FA1-C356-11CE-BF01-00AA0055595A
    
            //Audio file extensions (comma separated string)
        audioExtListDefault="mp3,m3u,mid,midi,smf,wav,aiff,aif,wma,wax"
            //Video file extensions (comma separated string)
        videoExtListDefault="mp4,mpeg,mpg,avi,asf,asx,wm,wmv,wvx"
            //Merge lists
        extListDefault=audioExtListDefault+","+videoExtListDefault
    
            //Audio MIME Types
        audioMIMEListDefault="audio/mpeg,audio/x-mpeg,audio/mp3,audio/x-mp3,audio/mpeg3,audio/x-mpeg3,audio/x-mpegurl,audio/mpegurl,audio/mp4,audio/mid,audio/x-midi,audio/midi,audio/x-wav,audio/wav,audio/aiff,audio/x-aiff,audio/x-ms-wma,audio/x-ms-wax"
            //Video MIME Types
        videoMIMEListDefault="video/mp4,video/mpeg,video/x-mpeg,video/x-msvideo,video/msvideo,video/avi,application/asx,application/x-mplayer2,video/x-ms-asf-plugin,video/x-ms-asf,video/x-ms-wm,video/x-ms-wmv,video/x-ms-wvx"
            //Merge lists
        MIMEListDefault=audioMIMEListDefault+","+videoMIMEListDefault
    
    //--------------------------------
    //Get/set saved basic settings
    //--------------------------------
        var temp=GM_getValue("autoConvert")                 //Get stored autoConvert setting
        if(temp==undefined)                                 //If not present
            GM_setValue("autoConvert",autoConvertDefault)   //Set stored autoConvert setting to default
        autoConvert=GM_getValue("autoConvert")              //Set active autoConvert setting to stored setting
    
        var temp=GM_getValue("convAx")                      //Get stored convAx setting
        if(temp==undefined)                                 //If not present
            GM_setValue("convAx",convAxDefault)             //Set stored convAx setting to default
        convAx=GM_getValue("convAx")                        //Set active convAx setting to stored setting
    
        var temp=GM_getValue("convBg")                      //Get stored convBg setting
        if(temp==undefined)                                 //If not present
            GM_setValue("convBg",convBgDefault)             //Set stored convBg setting to default
        convBg=GM_getValue("convBg")                        //Set active convBg setting to stored setting
    
        var temp=GM_getValue("forceAx")                     //Get stored forceAx setting
        if(temp==undefined)                                 //If not present
            GM_setValue("forceAx",forceAxDefault)           //Set stored forceAx setting to default
        forceAx=GM_getValue("forceAx")                      //Set active forceAx setting to stored setting
    
        var temp=GM_getValue("qcfAlert")                    //Get stored qcfAlert setting
        if(temp==undefined)                                 //If not present
            GM_setValue("qcfAlert",qcfAlertDefault)         //Set stored qcfAlert setting to default
        qcfAlert=GM_getValue("qcfAlert")                    //Set active qcfAlert setting to stored setting
    
    //--------------------------------
    //Get/set saved file extension lists
    //--------------------------------
        var temp=GM_getValue("audioExtList")                    //Get stored audioExtList setting
        if(temp==undefined)                                     //If not present
            GM_setValue("audioExtList",audioExtListDefault)     //Set stored audioExtList to default
        audioExtArray=GM_getValue("audioExtList").split(",")    //Convert stored audioExtList to array, store in active audioExtArray setting
    
        var temp=GM_getValue("videoExtList")                    //Get stored videoExtList setting
        if(temp==undefined)                                     //If not present
            GM_setValue("videoExtList",videoExtListDefault)     //Set stored videoExtList to default
        
        videoExtArray=GM_getValue("videoExtList").split(",")    //Convert stored audioExtList to array, store in active videoExtArray setting
    
        extArray=audioExtArray.concat(videoExtArray)            //Merge active audio/videoExtArray settings
    
    //--------------------------------
    //Get/set saved MIME extension lists
    //--------------------------------
        var temp=GM_getValue("audioMIMEList")                   //Get stored audioMIMEList setting
        if(temp==undefined)                                     //If not present
            GM_setValue("audioMIMEList",audioMIMEListDefault)   //Set stored audioMIMEList to default
        audioMIMEArray=GM_getValue("audioMIMEList").split(",")  //Convert stored audioMIMEList to array, store in active audioMIMEArray setting
    
        var temp=GM_getValue("videoMIMEList")                   //Get stored videoMIMEList setting
        if(temp==undefined)                                     //If not present
            GM_setValue("videoMIMEList",videoMIMEListDefault)   //Set stored videoMIMEList to default
        videoMIMEArray=GM_getValue("videoMIMEList").split(",")  //Convert stored videoMIMEList to array, store in active videoMIMEArray setting
    
        MIMEArray=audioMIMEArray.concat(videoMIMEArray)         //Merge active audio/videoMIMEArray settings
    }

    //=================================================
    //scanEmbed()
    //Scans embed statements and calls convertEmbed if
    //embed is suitable for conversion
    //=================================================
    function scanEmbed()
    {
        var embeds=currentDocument.getElementsByTagName("embed")       //Get references to all embeds in document
        var src
        var type
        var srcConvert=0
        var index
        var index2
        var ext
        var loop
        var hidden
        var isVideo=0
    
        for(var i=0;i<embeds.length;i++)                    //For all embed statements
        {
            srcConvert=0                                    //Reset flags
            isVideo=0
    
    //--------------------------------
    //Get source and type
    //--------------------------------
            src=embeds[i].src                               //Get the src attribute for current embed
            type=embeds[i].type                             //Get type attribute
            if(type)                                        //If type is present
                type=type.toLowerCase()                     //Convert to lower case
    
    //--------------------------------
    //Attempt conversion based on file extension
    //--------------------------------
            if(src)                                         //If src attribute is present
            {
                src=src.toLowerCase()                           //Convert to lower case
                index2=src.indexOf("?")                         //Get position of first '?'
                if(index2==-1)                                  //if no ?
                    index2=src.length                           //Set index2 to length of src
                index=src.substring(0,index2).lastIndexOf(".")  //Get position of last dot in src before index2
                if(index!=-1)                                   //dot found
                {
                    ext=src.substring(index+1,index2)       //Extension = all string after dot and before ?/end
                    for(var j=0;j<extArray.length;j++)      //For all extensions in list
                    {
                        if(ext==extArray[j])                //If extension matches entry in list
                        {
                                                            //If extension is video extension or type contains "video".
                            if(j>=audioExtArray.length || type.indexOf("video")!=-1)
                                isVideo=1                   //Set isVideo flag
    
                            convertEmbed(embeds[i],isVideo) //Convert embed
                            srcConvert=1                    //Set converted flag
                            break                           //Break out of for all extensions loop
                        }
                    }
                }
            }
    
    //--------------------------------
    //Attempt conversion based on type
    //--------------------------------
            if(!srcConvert && type)                     //If did not convert based on src and type is present, try type
            {
                for(var j=0;j<MIMEArray.length;j++)     //For all extensions in list
                {
                    if(type.indexOf("video")!=-1)       //If type contains "video"
                        isVideo=1                       //set isVideo flag.
                    if(type==MIMEArray[j])              //If extension matches entry in list
                    {
                        convertEmbed(embeds[i],isVideo) //Convert embed
                        srcConvert=1                    //Set converted flag
                        break                           //Break out of for all extensions loop
                    }
                }
            }
        }
    }
    
    //=================================================
    //scanObject()
    //Scans object statements and calls convertObject()
    //if object is suitable for conversion
    //=================================================
    function scanObject()
    {
        var objects=currentDocument.getElementsByTagName("object")         //Get references to all objects in document
        var params=new Array()
        var srcParam
        var srcConvert=0
        var foundAx=0
        var index
        var index2
        var src
        var ext
        var isVideo=0
    
        for (var i=0;i<objects.length;i++)                  //For all objects
        {
            foundAx=0                                       //Reset flags
            srcConvert=0
            isVideo=0
            
    //--------------------------------
    //Check if classId is WMP classid
    //--------------------------------
            classId=objects[i].getAttribute("classid")      //Get object ClassID
            if(classId && convAx)                           //If ClassID found and COnvert AxtiveX flag set
            {
                classId=classId.toLowerCase()               //Convert to lower case
                for(var j=0;j<classIdList.length;j++)       //For all ClassId's in list
                {
                    if(classId==classIdList[j])             //If extension matches entry in list
                    {
                        foundAx=1                           //Set found ActiveX object flag
                        break                               //Break out of for all classid's loop
                    }
                }
            }
    
    //--------------------------------
    //Create array of object parameters
    //--------------------------------
            params.length=0
            var k=0
            for(var j=0;j<objects[i].childNodes.length;j++)                     //For child nodes in object
            {
                if(objects[i].childNodes[j].nodeName.toLowerCase()=="param")    //If node is a param tag
                {
                    params.length=params.length+1
                    params[k]=objects[i].childNodes[j]                          //Store reference to node
                    k++
                }
            }
    
    //--------------------------------
    //Get source url
    //--------------------------------
            src=0
            
            srcParam=findParam(params,"fileName")           //Find object parameter fileName value
            if(srcParam)
                src=srcParam.getAttribute("value")
    
            if(!src)                                        //If source has not been found, find object attribute fileName path
                src=objects[i].getAttribute("fileName")
    
            if(!src)                                        //If source has not been found, find object parameter src value
            {
                srcParam=findParam(params,"src")
                if(srcParam)
                    src=srcParam.getAttribute("value")
            }
    
            if(!src)                                        //If source has not been found, find object attribute src path
                src=objects[i].getAttribute("src")
    
            if(!src)                                        //If source has not been found, find object attribute data path
                src=objects[i].getAttribute("data")
    
            if(!src && foundAx)                             //If source has not been found and ActiveX object detected, find object parameter url value (ActiveX object)
            {
                srcParam=findParam(params,"url")
                if(srcParam)                                //If found, rename to fileName
                {
                    srcParam.setAttribute("name","fileName")
                    src=srcParam.getAttribute("value")
                }
            }
    
    //--------------------------------
    //Get type
    //--------------------------------
            type=objects[i].type                        //Get type attribute
            if(type)                                    //If type is present
                type=type.toLowerCase()                 //Convert to lower case
    
    //--------------------------------
    //Attempt conversion based on file extension
    //--------------------------------
            if(src)                                         //If src attribute was found
            {
                src=src.toLowerCase()                           //Convert to lower case
                index2=src.indexOf("?")                         //Get position of first '?'
                if(index2==-1)                                  //if no ?
                    index2=src.length                           //Set index2 to length of src
                index=src.substring(0,index2).lastIndexOf(".")  //Get position of last dot in src before index2
                if(index!=-1)                                   //dot found
                {
                    ext=src.substring(index+1,index2)       //Extension = all string after dot and before ?/end
    
                    for(var j=0;j<extArray.length;j++)      //For all extensions in list
                    {
                                                            //If extension matches entry in list and object is not ActiveX object
                        if( (ext==extArray[j]) && (!objects[i].getAttribute("classid") ||  foundAx==1) )
                        {
                            if(j>=audioExtArray.length || type.indexOf("video")!=-1)
                                isVideo=1                   //If extension is video extension or type contains "video", set isVideo flag.
                                
                            convertObject(objects[i],params,isVideo)       //Convert object
                            srcConvert=1                    //Set converted flag
                            break                           //Break out of for all extensions loop
                        }
                    }
                }
            }
    
    //--------------------------------
    //Attempt conversion based on type
    //--------------------------------
            if(!srcConvert && type)                     //If did not convert based on src and type is present, try type
            {
                for(var j=0;j<MIMEArray.length;j++)     //For all extensions in list
                {
                    if(type==MIMEArray[j])              //If extension matches entry in list
                    {
                        if(type.indexOf("video")!=-1)   //If type contains "video"
                           isVideo=1                    //set isVideo flag.
                        convertObject(objects[i],params,isVideo)        //Convert object
                        srcConvert=1                    //Set converted flag
                        break                           //Break out of for all extensions loop
                    }
                }
            }
            
    //--------------------------------
    //Force conversion of all WMP ActiveX objects
    //--------------------------------
            if( (!srcConvert && foundAx) && (forceAx) ) //If object has not converted, object is ActveX object and forceAx setting is set
            {
                convertObject(objects[i],params,1)      //Convert object (assume video)
            }
        }
    }
    
    //=================================================
    //replaceBgsound()
    //Finds all bgsound stataments and replaces them
    //with embeds
    //=================================================
    function replaceBgsound()
    {
        var bgsounds=currentDocument.getElementsByTagName("bgsound")    //Get references to all bgsounds in document
        var newEmbed
        
        for (var i=0;i<bgsounds.length;i++)                             //For all bgsound tags
        {
            newEmbed=currentDocument.createElement("embed")             //Create new embed statement
            
            attrib=bgsounds[i].attributes                                                   //Record attributes of current bgsound statement
            for(j=0;j<attrib.length;j++)                                                    //for every attribute
                newEmbed.setAttribute(name=attrib[j].nodeName,value=attrib[j].nodeValue)	//copy to new embed statement
    
            newEmbed.setAttribute("autostart","1")                      //Set autostart to 1
            newEmbed.setAttribute("width","0")                          //Set width to 0
            newEmbed.setAttribute("height","0")                         //Set height to 0
            //newEmbed.setAttribute("type","application/x-mplayer2")
    
            if(currentDocument.body)                                    //If document has body element
                currentDocument.body.appendChild(newEmbed)              //Add new embed to end of body
            else                                                        //Else insert new embed after current bgsound statement
                bgsounds[i].parentNode.insertBefore(newEmbed, bgsounds[i])
    
            bgsounds[i].parentNode.removeChild(bgsounds[i])             //Remove bgsound tag
        }
    }
    
    //=================================================
    //convertObject()
    //converts some object statement parameters to WMP
    //compatable versions
    //=================================================
    function convertObject(object,params,isVideo)
    {
        //var autostart2=0
        //var status2=0

        object.removeAttribute("classid")                       //Remove ActiveX classid & codebase attributes
        object.removeAttribute("codebase")
    
    //--------------------------------
    //Convert all true/false attributes/parameters to 1/0
    //--------------------------------
        var excludes=new Array("loop", "playcount")     //Attributes/parameters that are allowed true/false values, must be lower case
        var name
        var value
        var found
    
        //Convert attributes
        for (var i=0;i<object.attributes.length;i++)    //For all attributes in object
        {
            found=0                                     //Reset flag
            for (var j=0;j<excludes.length;j++)         //For all Attributes/parameters to be excluded
            {
                name=object.attributes[i].nodeName      //Get name
                name=name.toLowerCase()                 //Convert to lower case
                if(name==excludes[j])                   //If name found
                {
                    found=1                             //Set flag
                    break                               //Break out of for all Attributes/parameters to be excluded loop
                }
            }
            if(!found)                                  //If name was not found
            {
                value=object.attributes[i].nodeValue    //Get value
                value=value.toLowerCase()               //Convert to lower case
                if(value=="true")                       //If it equals true, set to 1
                    object.setAttribute(name,"1")
                else if(value=="false")                 //else if it equals false, set to 0
                    object.setAttribute(name,"0")
            }
        }
        //Convert parameters
        for (var i=0;i<params.length;i++)               //For all parameters
        {
            found=0                                     //Reset flag
            for (var j=0;j<excludes.length;j++)         //For all Attributes/parameters to be excluded
            {
                name=params[i].getAttribute("name")     //Get name
                name=name.toLowerCase()                 //Convert to lower case
                if(name==excludes[j])                   //If name found
                {
                    found=1                             //Set flag
                    break                               //Break out of for all Attributes/parameters to be excluded loop
                }
            }
            if(!found)                                  //If name was not found
            {
                value=params[i].getAttribute("value")   //Get value
                value=value.toLowerCase()               //Convert to lower case
                if(value=="true")                       //If it equals true, set to 1
                    params[i].setAttribute("value","1")
                else if(value=="false")                 //else if it equals false, set to 0
                    params[i].setAttribute("value","0")
            }
        }
    
    //--------------------------------
    //Convert loop attribute/parameter to playcount
    //--------------------------------
        var loop1=object.getAttribute("loop")           //Get loop attribute/parameter
        var loopParam=findParam(params,"loop")
        if(loopParam)
            var loop2=loopParam.getAttribute("value")
    
        var playcount1=object.getAttribute("playcount") //Get playcount attribute/parameter
        var playcount2=findParam(params,"playcount")
    
        if(loop1)                                       //If loop attribute is present
        {
            loop1=loop1.toLowerCase()                   //Convert to lower case
            if(loop1=="infinite" || loop1=="-1")        //If incompatable infinite value
            {
                object.setAttribute("playcount","true") //convert to playcount=true
                object.removeAttribute("loop1")         //remove loop
            }
            else if(loop1==0)                           //If loop = zero
                object.removeAttribute("loop1")         //remove loop
    
            else if(loop1=="false")                     //If loop = false
            {
                object.setAttribute("playcount","1")    //set playcount to value of loop
                object.removeAttribute("loop1")         //remove loop
            }
    
            else if(loop1)                              //If loop = other non-zero value
            {
                object.setAttribute("playcount",loop1)  //set playcount to value of loop
                object.removeAttribute("loop1")         //remove loop
            }
        }
    
        if(loop2)                                           //If loop parameter is present
        {
            loop2=loop2.toLowerCase()                       //Convert to lower case
            if(loop2=="infinite" || loop2=="-1")            //If incompatable infinite value
            {
                if(playcount2)                              //If playcount parameter is present, remove it
                    playcount2.parentNode.removeChild(playcount2)
                loopParam.setAttribute("name","playcount")  //convert loop to playcount=true
                loopParam.setAttribute("value","true")      //convert loop to playcount=true
            }
            else if(loop2==0)                               //If loop = zero
                loopParam.parentNode.removeChild(loopParam) //remove loop
    
            else if(loop2=="false")                         //If loop = false
            {
                if(playcount2)                              //If playcount parameter is present, remove it
                    playcount2.parentNode.removeChild(playcount2)
                loopParam.setAttribute("name","playcount")  //convert to playcount=true
                loopParam.setAttribute("value","1")         //convert to playcount=true
            }
    
            else if(loop2)                                  //If loop = other non-zero value
            {
                if(playcount2)                              //If playcount parameter is present, remove it
                    playcount2.parentNode.removeChild(playcount2)
                loopParam.setAttribute("name","playcount")  //convert to playcount=true
                loopParam.setAttribute("value",loop2)       //convert to playcount=true
            }
        }
    
    //--------------------------------
    //Convert Uimode
    //--------------------------------
        var uimodeParam=findParam(params,"Uimode")
        if(uimodeParam)                                     //If starts bar parameter is present
            var uimode=uimodeParam.getAttribute("value").toLowerCase()    //get value, in lower case
    
        if(uimode=="none")                                  //If uimode is none
        {
            var statusParam=findParam(params,"ShowStatusBar")
            if(statusParam)                                     //If status bar parameter is present
                statusParam.setAttribute("value","0")           //set value to 0
    
            var controlsParam=findParam(params,"showControls")
            if(controlsParam)                                   //If show controls parameter is present
            {
                controlsParam.setAttribute("value","0")             //Set value to 0
                uimodeParam.parentNode.removeChild(uimodeParam)     //Remove Uimode parameter
            }
            else                                                //Else if showControls attribute is not present
            {
                uimodeParam.setAttribute("name","showControls")     //Change Uimode parameter name to showControls
                uimodeParam.setAttribute("value","0")               //Change Uimode parameter value t0 0
            }
        }
    
        else if(uimode!=undefined)
        {
            var statusParam=findParam(params,"ShowStatusBar")
            if(statusParam)                                     //If status bar parameter is present
            {
                statusParam.setAttribute("value","1")               //set value to 1
                uimodeParam.parentNode.removeChild(uimodeParam)     //Remove Uimode parameter
            }
            else                                                //Else if showStatusBar attribute is not present
            {
                uimodeParam.setAttribute("name","showStatusBar")    //Change Uimode parameter name to showControls
                uimodeParam.setAttribute("value","1")               //Change Uimode parameter value t0 0
            }
    
            var controlsParam=findParam(params,"showControls")
            if(controlsParam)                                   //If show controls parameter is present
                controlsParam.setAttribute("value","1")         //Set value to 1
        }
    
    //--------------------------------
    //Correct Width and Height
    //--------------------------------
        var widthPerc=false
        var heightPerc=false

        var statusParam=findParam(params,"ShowStatusBar")
        if(statusParam)                                     //If status bar parameter is present
            var status=statusParam.getAttribute("value")    //get value

        var displayParam=findParam(params,"ShowDisplay")
        if(displayParam)                                    //If show display parameter is present
            var display=displayParam.getAttribute("value")  //get value

        var hidden=object.getAttribute("hidden")            //Get hidden attribute
        if(!hidden)                                         //If attribute is not present
        {
            var hiddenParam=findParam(params,"hidden")      //Get hidden parameter
            if(hiddenParam)
                hidden=hiddenParam.getAttribute("value")
        }

        var width=object.getAttribute("width")                      //Get width attribute
        if ((width)&&(width.lastIndexOf("%")==width.length-1))      //Check to see if percentage, set flag if is
            widthPerc=true

        var height=object.getAttribute("height")                    //Get height attribute
        if ((height)&&(height.lastIndexOf("%")==height.length-1))   //Check to see if percentage, set flag if is
            heightPerc=true

        if(!height && widthPerc)                                //if height not specified and width is percentage
        {
            var width2=object.offsetWidth                       //Get rendered width of object
            if(width2==0 && parseInt(width,10)!=0)              //If rendered width is zero but specified is not (i.e. if object not rendered)
            {
                var newObject=object.cloneNode(true)                //Clone object
                newObject.setAttribute("type","text/html")          //Set type to text/html (render without loading a plugin)
                object.parentNode.insertBefore(newObject,object)    //Insert cloned object to trigger re-rendering
                object.parentNode.removeChild(object)               //Remove original object
                object=newObject                                    //Set old object to equal cloned object
                width2=object.offsetWidth                           //Get rendered width
            }
            width=width2                                        //Set width variable to rendered width
        }

        if(!width && heightPerc)                                //if width not specified and height is percentage
        {
            var height2=object.offsetHeight                     //Get rendered height of object
            if(height2==0 && parseInt(height,10)!=0)            //If rendered height is zero but specified is not
            {
                var newObject=object.cloneNode(true)                //Clone object
                newObject.setAttribute("type","text/html")          //Set type to text/html (render without loading a plugin)
                object.parentNode.insertBefore(newObject,object)    //Insert cloned object to trigger re-rendering
                object.parentNode.removeChild(object)               //Remove original object
                object=newObject                                    //Set old object to equal cloned object
                height2=object.offsetHeight                     //Get rendered height
            }
            height=height2                                      //Set height variable to rendered height
        }

        var controlsParam=findParam(params,"showControls")
        if(controlsParam)                                       //If showcontrols parameter is present
            var controls=controlsParam.getAttribute("value")    //Get showcontrols attribute
    
        var maxWidth=280                            //Max width for controls=280
        if(!width)                                  //If width not present
            object.setAttribute("width",maxWidth)   //Set to 280
    
        var maxHeight=44            //Height for controls=44
        if(controls=="0")           //If show controls is 0/false
            maxHeight=0             //set maxheight to 0
        if(status=="1")             //If status bar parameter is present and set
            maxHeight=maxHeight+23  //increase maxheight by 13
        if(display=="1")            //If show display parameter is present and set
            maxHeight=maxHeight+74  //Increast height by 74

        var vidHeight=maxWidth*3/4                              //Standard video height=3/4 of control width
        if(width)                                               //If width present, set vid height to 3/4 of width
            vidHeight=parseInt(width,10)*3/4
    
        if(!height && isVideo)                                  //If height not present and isVideo flag set
            object.setAttribute("height",maxHeight+vidHeight)   //Set height to control height + video height
    
        else if (!height)                                       //Else if height is not present
            object.setAttribute("height",maxHeight)             //Set to maxHeight
    
    //--------------------------------
    //Convert hidden to width/height=0
    //--------------------------------
        if(hidden=="1")                                 //If a hidden attribute/parameter is present and set to 1
        {
            object.setAttribute("width","0")            //Set width and height to 0 and remove hidden attribute
            object.setAttribute("height","0")
        }

        object.setAttribute("type","application/x-mplayer2")    //Set type to WMP type
        var newObject=object.cloneNode(true)                    //Clone object tag
        object.parentNode.insertBefore(newObject,object)        //Insert cloned object into document (to refresh plugin)
        object.parentNode.removeChild(object)                   //Remove original object
    }
    
    //=================================================
    //findParam()
    //Searches array of param tags for param with specific name
    //=================================================
    function findParam(params, name)
    {
        var paramName
        name=name.toLowerCase()                         //Convert specified name to lower case
        for (var j=0;j<params.length;j++)               //For all parameters in object
        {
            paramName=params[j].getAttribute("name")    //Get name of parameter
            if(paramName.toLowerCase()==name)           //If has correct name
                return params[j]                        //Return parameter value
        }
        return 0                                        //Return 0 if nothing found
    }
    
    //=================================================
    //convertEmbed()
    //converts some embed statement parameters to WMP
    //compatable versions
    //=================================================
    function convertEmbed(embed,isVideo)
    {

    //--------------------------------
    //Convert all true/false attributes/parameters to 1/0
    //--------------------------------
        var excludes=new Array("loop", "playcount")     //Attributes/parameters that are allowed true/false values, must be lower case
        var name
        var value
        var found
    
        //Convert attributes
        for (var i=0;i<embed.attributes.length;i++)     //For all attributes in object
        {
            found=0                                     //Reset flag
            for (var j=0;j<excludes.length;j++)         //For all Attributes/parameters to be excluded
            {
                name=embed.attributes[i].nodeName       //Get name
                name=name.toLowerCase()                 //Convert to lower case
                if(name==excludes[j])                   //If name found
                {
                    found=1                             //Set flag
                    break                               //Break out of for all Attributes/parameters to be excluded loop
                }
            }
            if(!found)                                  //If name was not found
            {
                value=embed.attributes[i].nodeValue     //Get value
                value=value.toLowerCase()               //Convert to lower case
                if(value=="true")                       //If it equals true, set to 1
                    embed.setAttribute(name,"1")
                else if(value=="false")                 //else if it equals false, set to 0
                    embed.setAttribute(name,"0")
            }
        }
    
    //--------------------------------
    //Convert loop to playcount
    //--------------------------------
        var loop=embed.getAttribute("loop")             //Get loop attribute
        if(loop)                                        //If loop attribute is present
        {
            loop=loop.toLowerCase()                     //Convert to lower case
            if(loop=="infinite" || loop=="-1")          //If incompatable infinite value
            {
                embed.setAttribute("playcount","true")  //convert to playcount=true
                embed.removeAttribute("loop")           //remove loop
            }
            else if(loop==0)                            //If loop = zero
                embed.removeAttribute("loop")           //remove loop
    
            else if(loop=="false")                      //If loop = false
            {
                embed.setAttribute("playcount","1")     //set playcount to value of loop
                embed.removeAttribute("loop")           //remove loop
            }
    
            else if(loop)                               //If loop = other non-zero value
            {
                embed.setAttribute("playcount",loop)    //set playcount to value of loop
                embed.removeAttribute("loop")           //remove loop
            }
        }

    //--------------------------------
    //Correct width and height
    //--------------------------------
        var widthPerc=false
        var heightPerc=false

        var width=embed.getAttribute("width")                       //Get width attribute
        if ((width)&&(width.lastIndexOf("%")==width.length-1))      //Check to see if percentage, set flag if is
            widthPerc=true

        var height=embed.getAttribute("height")                     //Get height attribute
        if ((height)&&(height.lastIndexOf("%")==height.length-1))   //Check to see if percentage, set flag if is
            heightPerc=true

        if(!height && widthPerc)                                //if height not specified and width is percentage
        {
            var width2=embed.offsetWidth                        //Get rendered width of object

            if(width2==0 && parseInt(width,10)!=0)              //If rendered width is zero but specified is not (i.e. if object not rendered)
            {
                var newEmbed=embed.cloneNode(true)              //Clone embed
                newEmbed.setAttribute("type","text/html")       //Set type to text/html (render without loading a plugin)
                embed.parentNode.insertBefore(newEmbed,embed)   //Insert cloned embed to trigger re-rendering
                embed.parentNode.removeChild(embed)             //Remove original embed
                embed=newEmbed                                  //Set old embed to equal cloned embed
                width2=embed.offsetWidth                        //Get rendered width
            }
            width=width2                                        //Set width variable to rendered width
        }

        if(!width && heightPerc)                                //if width not specified and height is percentage
        {
            var height2=embed.offsetHeight                      //Get rendered height of object
            if(height2==0 && parseInt(height,10)!=0)            //If rendered height is zero but specified is not (i.e. if object not rendered)
            {
                var newEmbed=embed.cloneNode(true)              //Clone embed
                newEmbed.setAttribute("type","text/html")       //Set type to text/html (render without loading a plugin)
                embed.parentNode.insertBefore(newEmbed,embed)   //Insert cloned embed to trigger re-rendering
                embed.parentNode.removeChild(embed)             //Remove original embed
                embed=newEmbed                                  //Set old embed to equal cloned embed
                height=embed.offsetHeight                       //Get rendered height
            }
            height=height2                                      //Set height variable to rendered height
        }

        var maxWidth=280                            //Max width for controls=280
        if(!width)                                  //If width not present
            embed.setAttribute("width",maxWidth)    //Set to 280
    
        var status=embed.getAttribute("ShowStatusBar")  //Get ShowStatusBar attribute
        var controls=embed.getAttribute("showcontrols") //Get showcontrols attribute
        var display=embed.getAttribute("ShowDisplay")   //Get showDisplay attribute
        
        var maxHeight=44                //Max height for controls=44
        if(controls=="0")               //If show controls is 0/false
            maxHeight=0                 //set maxheight to 0
        if(status=="1")                 //If status bar is present
            maxHeight=maxHeight+23      //increase maxheight by 13
        if(display=="1")                //If show display parameter is present and set
            maxHeight=maxHeight+74      //Increast height by 74
     
        var vidHeight=maxWidth*3/4                              //Standard video height=3/4 of control width
        if(width)                                               //If width present, set vid height to 3/4 of width
            vidHeight=parseInt(width,10)*3/4
    
        if(!height && isVideo)                                  //If height not present and isVideo flag set
            embed.setAttribute("height",maxHeight+vidHeight)    //Set height to control height + video height
    
        else if(!height)                                        //else if height not present
            embed.setAttribute("height",maxHeight)              //Set to maxHeight


    //--------------------------------
    //Convert hidden to width/height=0
    //--------------------------------
        var hidden=embed.getAttribute("hidden")     //Get hidden attribute
        if(hidden)                                  //If hidden attribute is present
        {
            hidden=hidden.toLowerCase()             //Convert to lower case
            if(hidden=="1" || hidden=="true")       //If hidden attribute is set
            {
                embed.setAttribute("width","0")     //Set width and height to 0 and remove hidden attribute
                embed.setAttribute("height","0")
                embed.removeAttribute("hidden")
            }
        }
        
        embed.setAttribute("type","application/x-mplayer2")	//Set type to WMP type
        var newEmbed=embed.cloneNode(true)                 	//Clone embed tag
        embed.parentNode.insertBefore(newEmbed,embed)     	//Insert cloned embed statement into document (to refresh plugin)
        embed.parentNode.removeChild(embed)                 //Remove original embed tag
    }
    
//******************************************************************
//Settings Popup Window functions
//******************************************************************
    
    //=================================================
    //openSettingsWindow()
    //Opens settings window, sets variable values in
    //settings window javascript
    //=================================================
    function openSettingsWindow()   //Create settings window
    {
        processSettings()           //Reload settings
    
        //Define html for settings window
        var settingsHTML="<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\n<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en-gb\" xml:lang=\"en-gb\">\n<head>\n  <meta content=\"text/html; charset=ISO-8859-1\" http-equiv=\"content-type\" />\n  <title>IE Media Mimic Options</title>\n  <style type=\"text/css\">\n    body,input,select\n    {\n      font-size: 8pt;\n      font-family: Arial;\n    }\n    \n    .left\n    {\n      float: left;\n    }\n    \n    .l1\n    {\n      float: left;\n      width: 100%;\n    }\n    \n    .list\n    {\n      float: left;\n      position: absolute;\n      bottom: 0px;\n      visibility: hidden;\n    }\n  </style>\n\n  <script type=\"text/javascript\">\n/* <![CDATA[ */\n\n//=================================================\n//Variable definitions, filled by GM script before\n//page launch\n//=================================================\n        //Default Settings\n    var convAxDefault=\"\"\n    var forceAxDefault=\"\"\n    var convBgDefault=\"\"\n    var qcfAlertDefault=\"\"\n    var autoConvertDefault=\"\"\n    var audioExtListDefault=\"\"\n    var videoExtListDefault=\"\"\n    var audioMIMEListDefault=\"\"\n    var videoMIMEListDefault=\"\"\n\n        //Current Settings\n    var convAx=\"\"\n    var forceAx=\"\"\n    var convBg=\"\"\n    var qcfAlert=\"\"\n    var autoConvert=\"\"\n    var audioExtList=\"\"\n    var videoExtList=\"\"\n    var audioMIMEList=\"\"\n    var videoMIMEList=\"\"\n\n/* ]]> */\n  </script>\n\n  <script type=\"text/javascript\">\n/* <![CDATA[ */\n\n//=================================================\n//populateForm()\n//Populates page settings form elements from\n//settings variables\n//=================================================\n    function populateForm()\n    {\n        getId(\"convBg\").checked=convBg              //Set convBg checkbox\n        getId(\"convAx\").checked=convAx              //Set convAx checkbox\n        getId(\"forceAx\").checked=forceAx            //Set forceAx checkbox\n        getId(\"qcfAlert\").checked=qcfAlert          //Set qcfAlert checkbox\n        getId(\"autoConvert\").checked=autoConvert    //Set autoConvert checkbox\n\n            //Clear null options in select tags\n        var sels=document.getElementsByTagName(\"select\")    //Get array of select objects\n        for(var i=0;i<sels.length;i++)                      //For all select tags\n            sels[i].options.length=0                        //Set no. of options to 0\n\n        addOpt(\"vidFileList\",videoExtList)          //Add video extension list to video extention select tag\n        addOpt(\"vidMIMEList\",videoMIMEList)         //Add video MIME Type list to video MIME Type select tag\n        addOpt(\"audFileList\",audioExtList)          //Add audio extension list to video extention select tag\n        addOpt(\"audMIMEList\",audioMIMEList)         //Add audio MIME Type list to video MIME Type select tag\n    }\n\n//=================================================\n//defaultBasic()\n//Repopulate basic settings with default settings\n//=================================================\n    function defaultBasic()\n    {\n        getId(\"convBg\").checked=convBgDefault           //Set convBg checkbox to default\n        getId(\"convAx\").checked=convAxDefault           //Set convAx checkbox to default\n        getId(\"forceAx\").checked=forceAxDefault         //Set forceAx checkbox to default\n        getId(\"qcfAlert\").checked=qcfAlertDefault       //Set qcfAlert checkbox to defaul\n        getId(\"autoConvert\").checked=autoConvertDefault //Set autoConvert checkbox to default\n    }\n\n//=================================================\n//hide()\n//Hide advanced settings divs by settings style\n//position to absolute, locaiton to far top, and\n//visibility to hidden\n//=================================================\n    function hide(objs,all)\n    {\n        objs=objs.split(\",\")                            //Convert list of object names to array\n        for(var i=0;i<objs.length;i++)                  //For all object names\n        {\n            getId(objs[i]).style.position=\"absolute\"    //Set object position to absolute\n            getId(objs[i]).style.bottom=\"0px\"           //Set object location to top of page\n            getId(objs[i]).style.visibility=\"hidden\"    //Set object visbility to hidden\n\n            if(all)             //If all to be hidden, revert position of bottom div to static\n                getId(\"audMIMEDiv\").style.position=\"static\"\n        }\n    }\n\n//=================================================\n//show()\n//Show divs hidden by hide()\n//=================================================\n    function show(obj)\n    {\n        getId(obj).style.position=\"static\"      //Set position to static\n        getId(obj).style.bottom=\"auto\"          //location to auto\n        getId(obj).style.visibility=\"visible\"   //visibility to visible\n    }\n\n//=================================================\n//clearRad()\n//Uncheck advanced settings radio buttons\n//=================================================\n    function clearRad()\n    {\n        rads=document.getElementsByName(\"listRad\")  //Get array of all radio buttons\n        for(var i=0;i<rads.length;i++)              //For all radio buttons\n        {\n            rads[i].checked=false                   //Uncheck radio button\n        }\n    }\n\n//=================================================\n//addOpt()\n//Add option tag child to select tag\n//=================================================\n    function addOpt(sel,val)\n    {\n        val=val.split(\",\")                          //Convert list of values to array\n        for(var i=0;i<val.length;i++)               //For all option tag values\n        {\n            if(val[i]!=\"\")                          //If current value is not empty\n            {\n                var newOpt=document.createElement(\"option\") //Create new option tag\n                newOpt.innerHTML=val[i]                     //Set innerHTML to value\n                newOpt.setAttribute(\"value\",val[i])         //Set value attribute to value\n                getId(sel).appendChild(newOpt)              //Append to select tag child nodes\n            }\n        }\n    }\n\n//=================================================\n//remOpt()\n//Remove selected option tags from select tag\n//=================================================\n    function remObjs(sel)\n    {\n        sel=getId(sel)                      //Get select object\n        while(sel.selectedIndex!=-1)        //While there is an option selected\n        {\n            sel.remove(sel.selectedIndex)   //Remove selected option\n        }\n    }\n\n//=================================================\n//forceAxState()\n//Enable/Disable secondary ActiveX option (forceAx)\n//depending on state of primary option (convAx)\n//=================================================\n    function forceAxState()\n    {\n        if(getId(\"convAx\").checked) //If convAx checkbox is checked, remove disable attribute from forceAx checkbox and set text colour to default\n            getId(\"forceAx\").removeAttribute(\'disabled\'),getId(\'forceAxText\').style.color=\'\'\n        else        //Else add disable attribute from forceAx checkbox and set text colour to grey\n            getId(\"forceAx\").setAttribute(\'disabled\',1),getId(\'forceAxText\').style.color=\'rgb(153, 153, 153)\'\n    }\n\n//=================================================\n//getId()\n//Shortcut call to document.getElementById()\n//=================================================\n    function getId(obj)\n    {\n        return document.getElementById(obj)\n    }\n\n/* ]]> */\n  </script>\n</head>\n\n<body style=\"background-color: rgb(212, 208, 200);\" onload=\"populateForm(),forceAxState()\"\n      id=\"http:__homepage.ntlworld.com_vectorspace_greasemonkey_IE_Media_Mimic\">\n\n  <div style=\"width: 275px;\">\n\n    <div style=\"text-align: center;\">\n      <h1>IE Media Mimic 0.8.6</h1>\n      <h2>Settings Page</h2>\n    </div>\n\n    <hr />\n    <h3>Basic settings</h3><input name=\"basicDefault\" value=\"Reset to default\" onclick=\"defaultBasic()\" type=\"button\" />\n    <br />\n    <br />\n    <input id=\"convBg\" type=\"checkbox\" />Convert BGsound Tags\n    <br />\n    <input id=\"convAx\" onchange=\"forceAxState()\" type=\"checkbox\" />Convert WMP ActiveX Objects\n    <br />\n\n    <span id=\"forceAxText\" style=\"margin-left: 40px;\">\n      <input id=\"forceAx\" type=\"checkbox\" />even if file type is not in file types list\n    </span>\n\n    <br />\n    <input id=\"autoConvert\" type=\"checkbox\" />Convert pages automatically\n    <br />\n    <input id=\"qcfAlert\" type=\"checkbox\" />Show alert on Quick Convert failure\n    <br />\n    <input  name=\"showAdvanced\" onchange=\"if(this.checked){getId(\'advanced\').style.visibility=\'visible\'}else{getId(\'advanced\').style.visibility=\'hidden\',hide(\'vidFileDiv,vidMIMEDiv,audFileDiv,audMIMEDiv\',1)}clearRad();\"\n            type=\"checkbox\" />Show Advanced Settings\n    <br />\n    <br />\n    <hr />\n\n    <div id=\"advanced\" style=\"visibility: hidden;\">\n      <h3>Advanced Settings</h3>\n\n      <div class=\"l1\">\n        <input name=\"listRad\" onchange=\"show(\'vidFileDiv\'),hide(\'vidMIMEDiv,audFileDiv,audMIMEDiv\')\" type=\"radio\" />Video File Types\n      </div>\n\n      <div id=\"vidFileDiv\" class=\"list\">\n        <select class=\"left\" id=\"vidFileList\" multiple=\"multiple\" size=\"5\">\n          <option>null</option>\n        </select>\n        <div class=\"left\">\n          <input value=\"Add\" onclick=\"text=prompt(\'Enter type and click \\\'OK\\\' to add.\\n\\nTo enter multiple types, separate wth a comma. e.g.\\ntype1,type2,type3\');addOpt(\'vidFileList\',text);\" type=\"button\" />\n          <br />\n          <input value=\"Remove Selected\" onclick=\"remObjs(\'vidFileList\')\" type=\"button\" />\n          <br />\n          <br />\n          <input value=\"Reset to Default\" onclick=\"getId(\'vidFileList\').options.length=0;addOpt(\'vidFileList\',videoExtListDefault)\" type=\"button\" />\n        </div>\n      </div>\n\n      <br />\n\n      <div class=\"l1\">\n        <br />\n        <input name=\"listRad\" onchange=\"show(\'vidMIMEDiv\'),hide(\'vidFileDiv,audFileDiv,audMIMEDiv\')\" type=\"radio\" />Video MIME Types\n      </div>\n\n      <div id=\"vidMIMEDiv\" class=\"list\">\n        <select class=\"left\" id=\"vidMIMEList\" multiple=\"multiple\" size=\"5\">\n          <option>null</option>\n        </select>\n        <div class=\"left\">\n          <input value=\"Add\" onclick=\"text=prompt(\'Enter type and click \\\'OK\\\' to add.\\n\\nTo enter multiple types, separate wth a comma. e.g.\\ntype1,type2,type3\');addOpt(\'vidMIMEList\',text);\" type=\"button\" />\n          <br />\n          <input value=\"Remove Selected\" onclick=\"remObjs(\'vidMIMEList\')\" type=\"button\" />\n          <br />\n          <br />\n          <input value=\"Reset to Default\" onclick=\"getId(\'vidMIMEList\').options.length=0;addOpt(\'vidMIMEList\',videoMIMEListDefault)\" type=\"button\" />\n        </div>\n      </div>\n\n      <br />\n      <br />\n\n      <div class=\"l1\">\n        <br />\n        <input name=\"listRad\" onchange=\"show(\'audFileDiv\'),hide(\'vidFileDiv,vidMIMEDiv,audMIMEDiv\')\" type=\"radio\" />Audio File Types\n      </div>\n\n      <div id=\"audFileDiv\" class=\"list\">\n        <select class=\"left\" id=\"audFileList\" multiple=\"multiple\" size=\"5\">\n          <option>null</option>\n        </select>\n        <div class=\"left\"><input value=\"Add\" onclick=\"text=prompt(\'Enter type and click \\\'OK\\\' to add.\\n\\nTo enter multiple types, separate wth a comma. e.g.\\ntype1,type2,type3\');addOpt(\'audFileList\',text);\" type=\"button\" />\n          <br />\n          <input value=\"Remove Selected\" onclick=\"remObjs(\'audFileList\')\" type=\"button\" />\n          <br />\n          <br />\n          <input value=\"Reset to Default\" onclick=\"getId(\'audFileList\').options.length=0;addOpt(\'audFileList\',audioExtListDefault)\" type=\"button\" />\n        </div>\n      </div>\n\n      <br />\n      <br />\n\n      <div class=\"l1\">\n        <br />\n        <input name=\"listRad\" onchange=\"show(\'audMIMEDiv\'),hide(\'vidFileDiv,vidMIMEDiv,audFileDiv\')\" type=\"radio\" />Audio MIME Types\n      </div>\n\n      <div id=\"audMIMEDiv\" class=\"list\" style=\"position: static;\">\n        <select class=\"left\" id=\"audMIMEList\" multiple=\"multiple\" size=\"5\">\n          <option>null</option>\n        </select>\n        <div class=\"left\">\n          <input value=\"Add\" onclick=\"text=prompt(\'Enter type and click \\\'OK\\\' to add.\\n\\nTo enter multiple types, separate wth a comma. e.g.\\ntype1,type2,type3\');addOpt(\'audMIMEList\',text);\" type=\"button\" />\n          <br />\n          <input value=\"Remove Selected\" onclick=\"remObjs(\'audMIMEList\')\" type=\"button\" />\n          <br />\n          <br />\n          <input value=\"Reset to Default\" onclick=\"getId(\'audMIMEList\').options.length=0;addOpt(\'audMIMEList\',audioMIMEListDefault)\" type=\"button\" />\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"l1\" style=\"text-align: right;\">\n      <br />\n      <hr />\n      <input id=\"save\" value=\"Save Changes\" type=\"button\" />\n      <input value=\"Cancel\" onclick=\"window.close()\" type=\"button\" />\n    </div>\n\n  </div>\n</body>\n</html>"

        //Add default variable values to settins window html
        //Basic settings
        settingsHTML=settingsHTML.replace(/autoConvertDefault=\"\"/,"autoConvertDefault="+autoConvertDefault)
        settingsHTML=settingsHTML.replace(/convAxDefault=\"\"/,"convAxDefault="+convAxDefault)
        settingsHTML=settingsHTML.replace(/forceAxDefault=\"\"/,"forceAxDefault="+forceAxDefault)
        settingsHTML=settingsHTML.replace(/convBgDefault=\"\"/,"convBgDefault="+convBgDefault)
        settingsHTML=settingsHTML.replace(/qcfAlertDefault=\"\"/,"qcfAlertDefault="+qcfAlertDefault)
    
        //Advanced settings
        settingsHTML=settingsHTML.replace(/videoExtListDefault=\"\"/,"videoExtListDefault=\""+videoExtListDefault+"\"")
        settingsHTML=settingsHTML.replace(/videoMIMEListDefault=\"\"/,"videoMIMEListDefault=\""+videoMIMEListDefault+"\"")
        settingsHTML=settingsHTML.replace(/audioExtListDefault=\"\"/,"audioExtListDefault=\""+audioExtListDefault+"\"")
        settingsHTML=settingsHTML.replace(/audioMIMEListDefault=\"\"/,"audioMIMEListDefault=\""+audioMIMEListDefault+"\"")
    
        //Add variable values to settins window html
        //Basic settings
        settingsHTML=settingsHTML.replace(/autoConvert=\"\"/,"autoConvert="+autoConvert)
        settingsHTML=settingsHTML.replace(/convAx=\"\"/,"convAx="+convAx)
        settingsHTML=settingsHTML.replace(/forceAx=\"\"/,"forceAx="+forceAx)
        settingsHTML=settingsHTML.replace(/convBg=\"\"/,"convBg="+convBg)
        settingsHTML=settingsHTML.replace(/qcfAlert=\"\"/,"qcfAlert="+qcfAlert)
    
        //Advanced settings
        settingsHTML=settingsHTML.replace(/videoExtList=\"\"/,"videoExtList=\""+GM_getValue("videoExtList")+"\"")
        settingsHTML=settingsHTML.replace(/videoMIMEList=\"\"/,"videoMIMEList=\""+GM_getValue("videoMIMEList")+"\"")
        settingsHTML=settingsHTML.replace(/audioExtList=\"\"/,"audioExtList=\""+GM_getValue("audioExtList")+"\"")
        settingsHTML=settingsHTML.replace(/audioMIMEList=\"\"/,"audioMIMEList=\""+GM_getValue("audioMIMEList")+"\"")
    
        //Open Settings window
        settingsWindow=window.open("","settingsWindow","height=588,width=298,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,status=yes")
        settingsWindow.document.write(settingsHTML)     //Write html to window
        settingsWindow.document.close()                 //Close document to writing

        //Add Settings Window Listeners
        settingsWindow.document.getElementById("save").addEventListener("click", saveSettings, false);  //Add click event listener to Save Settings button, calls saveSettings()
        settingsWindow.addEventListener("unload", cleanupSettingsListeners, false);                     //Add unload event listener to window, calls cleanupListeners()
    }
    
    //=================================================
    //saveSettings()
    //Gets form values from settings page and stores
    //them. Triggered by event listener on 'Save
    //Settings' button
    //=================================================
    function saveSettings()
    {
            //Get values from page form elements and save
        GM_setValue("autoConvert",settingsWindow.document.getElementById("autoConvert").checked)
        GM_setValue("forceAx",settingsWindow.document.getElementById("forceAx").checked)
        GM_setValue("convAx",settingsWindow.document.getElementById("convAx").checked)
        GM_setValue("convBg",settingsWindow.document.getElementById("convBg").checked)
        GM_setValue("qcfAlert",settingsWindow.document.getElementById("qcfAlert").checked)
    
            //Get values from settings page select objects
        GM_setValue("videoMIMEList",optionToString("vidMIMEList"))
        GM_setValue("videoExtList",optionToString("vidFileList"))
        GM_setValue("audioMIMEList",optionToString("audMIMEList"))
        GM_setValue("audioExtList",optionToString("audFileList"))
    
        alert("Settings Updated")           //Alert user
        
        settingsWindow.close()              //Close Settings Window
    }
    
    //=================================================
    //optionToString()
    //Gets select object name as argument, returns
    //comma-separated string made up from text of
    //select options
    //=================================================
    function optionToString(select)
    {
        var temp=""                         //Define temp as string
        var options=settingsWindow.document.getElementById(select).options   //Get options of select object
    
        for (var i=0;i<options.length;i++)  //For all options in select object
        {
            if(i!=0)                        //If not the first option
                temp=temp+","               //Add a comma to the end of the string
            temp=temp+options[i].text       //Add text of current option to end of string
        }
        return temp                         //Return string
    }
    
    //=================================================
    //cleanupSettingsListeners()
    //Remove event listeners from settings window,
    //triggered by settings window unoad event
    //=================================================
    function cleanupSettingsListeners()
    {
            //Remove Save Settings button listener
        settingsWindow.document.getElementById("save").removeEventListener("click", saveSettings, false);
            //Remove window unload listener
        settingsWindow.removeEventListener("unload", cleanupSettingsListeners, false);
    }
}
)();