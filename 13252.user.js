//Released under the GPL license
//http://www.gnu.org/copyleft/gpl.html
//-------------------------------------------------------------------------------------------------
// ==UserScript==
// @name           3DStructureView
// @author         Harini Gopalakrishnan 
// @namespace      ChemicalBioGrid
// @desc           View 3D Structures using Jmol
// @include        http://pubchem.ncbi.nlm.nih.gov/summary/*
// @include        http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=search&db=pccompound*
// @include        http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=pccompound*
//-------------------------------------------------------------------------------------------------

// Update check
var d = new Date();
var curr_date = d.getDate();
var date_last_checked= GM_getValue("check_updates", 0);
if (date_last_checked != curr_date)
{
  GM_setValue("check_updates", curr_date);
  // Modified the code by Seifer at http://userscripts.org/users/33118
  script_name = '3DStructureView.user.js';
  script_num = '8033';
  script_href = "http://blueobelisk.svn.sf.net/svnroot/blueobelisk/userscripts/trunk/3DStructureView.user.js";
  script_as_text = "http://blueobelisk.svn.sourceforge.net/viewvc/*checkout*/blueobelisk/userscripts/trunk/3DStructureView.user.js?content-type=text%2Fplain";
  script_version=1.0;
  script_updatetext='ADD UPDATE TEXT HERE';

  GM_xmlhttpRequest({
      method: "GET",
      url: script_as_text,
      onload: function(responseDetails) {
        var text = responseDetails.responseText;
        var update_version = text.substring(text.indexOf("script_version=")+15,text.indexOf("\n",text.indexOf("script_version="))-2);
        var update_text = text.substring(text.indexOf("script_updatetext=")+19,text.indexOf("\n",text.indexOf("script_updatetext="))-3);
      if(update_version > script_version) {
          newversion = document.createElement("div");
          newversion.setAttribute("id", "gm_update_alert");
          newversion.setAttribute("style", "background-color:yellow; width:100%; position:absolute; z-index:99; top:0px; left:0px; text-align:center; font-size:11px; font-family: Tahoma");
          newversion.innerHTML = "<a href='#' onclick='document.body.removeChild(document.getElementById(&quot;gm_update_alert&quot;))' style='color:red'>Close</a><font color='yellow'>--------</font><font color='red'>There is a new version of the &quot;"+script_name+"&quot; script. You are currently running version "+script_version+".</font><br><font color='yellow'>----------------</font>The latest version is "+update_version+". <a href='#' onclick='document.getElementById(&quot;gm_update_alert_info&quot;).setAttribute(&quot;style&quot;, &quot;display:block&quot;)' style='color:green'>Click here for more info</a> or <a style='color:green' href='" + script_href + "'><b>Click here to download the latest version</b></a><span id='gm_update_alert_info' style='display:none'><b>Here's a short description of the latest update...</b><br>"+update_text+"</span>";
          document.body.appendChild(newversion);
        }
      }
  });
}



//URL Check
var gProxy = null;
var url=window.location+'';
if(url.indexOf("http://pubchem.ncbi.nlm.nih.gov/summary/")+1>0)
 {
  //alert(url);
  //alert(url.indexOf("http://pubchem.ncbi.nlm.nih.gov/summary/"));

   run_3DData();
 }
else
 {
  if(url.indexOf("http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=pccompound")+1>0)
   {
    //alert(url.indexOf("http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=pccompound"));

    run_3DSummary();
   }

   else
     {
      if(url.indexOf("http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=search&db=pccompound")+1>0)
       {
        //alert(url);
        //alert(url.indexOf("http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=search&db=pccompound"));

         run_3DSummary();

       }
     }  

 }


// programs to view 3Ddata in the individual molecule page 
function run_3DData() 
{
  
  if (!document.body || typeof(document.body.innerHTML) == "undefined") 
  {
    return false;
  }
  var xPathResult = document.evaluate(
    './/text()[normalize-space(.) != ""]',
    document.body,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
   );

  var cid=document.getElementsByName('goentrezcid')[0].innerHTML;
  Translate_3DData(cid);

}

function Translate_3DData(cid)
  {
    if (!gProxy) {
        var listener = { 

          // gets called once the proxy has been instantiated
          onLoad: function (aProxy) 
          {
 
            gProxy = aProxy;
            gProxy.setListener(listener);
            requestTranslation(cid);
          },
         
          // gets called if an error occurs
          onError: function (aError) 
          {
 
            alert("An error has occured: " + aError);
          },
      
          // callback function is hardcoded to {methodname}Callback
          getStructureByCIDCallback  : function (aResult) 

          {
 
           writeApplet_3DData(aResult);
         }

        };

         createProxy(listener);
      } 

      else 
      {
        requestTranslation(cid);
      }

    }

    function createProxy(aCreationListener)
   {
      try 
     {
       var factory = new WebServiceProxyFactory();
       factory.createProxyAsync("http://cheminfo.informatics.indiana.edu/Struct3D.xml", "Struct3D", "", true, aCreationListener);

 
      }
      catch (ex)
     {
        alert("Failed creating the proxy: "+ ex);
      }

    }


    function requestTranslation(cid)
   {

      if (gProxy) {
       try
      {

        var getStructureByCIDRequest = new Object();
        gProxy.getStructureByCID(cid);
       }
      catch(ex)
        {
         alert('Error in service execution'+ex);
         }
  
      } else {
        alert("Error: Proxy hasn't been set up correctly!");
      }

   }

function writeApplet_3DData(aResult)
 {
    try
 {
   //create script tag and refer Jmol.js to it
    var scripttag=document.createElement('script');

    
   //append script tag before head
    var headElement=document.getElementsByTagName('head');
    var newElement=headElement[0].firstCild; 
    headElement[0].insertBefore(scripttag,newElement);
    
    var molecule='';
    //loop to remove the '\n'
    for(i=0;i<aResult.length;i++)
      {
         if(aResult[i]=='\n' || aResult[i]=='\r')
           {
             //encode so that it does not get corrupted while passing as a query string.    
             molecule=molecule+"\\\\n\\\" \+ \\n\"";
            }
         else
            {

             if(aResult[i]=='<' || aResult[i]=='>')
                {
                  //alert('The incorrect symbol is:'+i+aResult[i]+":"+aResult[i+1] );
                  if(aResult[i]=='<') 
                     {   molecule=molecule+"\<"; }
                   else
                     { molecule=molecule+"\>"; }                    

                }   
           else 
            {
             molecule=molecule+aResult[i];
            }

           }
 
     }

   aResult=molecule;

   //initialize javascript text for body element

 var scripttag=document.createElement('script');
 scripttag.setAttribute('type','text/javascript');	

 scripttag.innerHTML="\nfunction openwindow()\n{"+
      "\n mywin=window.open(\"\",'3D Structure','width=415,height=450');\n"+     
      "\n mywin.document.write('<html><head>\\n<script type=\"text/javascript\" src=\" http://cheminfo.informatics.indiana.edu/JmolFolder/Jmol.js\"> </script></head>');"+ 
      "\n mywin.document.write(\"<body>\\n<script type='text/javascript'> \\n jmolInitialize(' http://cheminfo.informatics.indiana.edu/JmolFolder/');\");"+
      "\n mywin.document.write('\\n var molecule\=\" "+aResult+" \";\\n jmolAppletInline(400,molecule);');"+
      "\n mywin.document.write('\\n document.write(\"<br><br><font size=2><b> 3D Structure Provided by<a href=http://www.chembiogrid.org/cheminfo/p3d/ target=_new>Pub3D</a>, part of <a href=http://www.chembiogrid.org target=_new>Chembiogrid.org</a></b></font>\");</script></body></html>');"+
       "mywin.document.close();\n"+
      "}";




 var formElement=document.getElementsByTagName('body');
 var newElement=formElement[0].firstChild;
 formElement[0].insertBefore(scripttag,newElement);
       

var cidElement=document.getElementsByName('goentrezcid')[0].parentNode.parentNode;
var functionnode=document.createElement('span');
functionnode.setAttribute('id','appletholder');

var newNode=cidElement.parentNode;
newNode.insertBefore(functionnode,cidElement); 

document.getElementById('appletholder').setAttribute('align','right');
document.getElementById('appletholder').innerHTML="<font color='white'>View</font><b>3D View: </b><a href='javascript:openwindow()'>3DView(Jmol)</a>";


//link to download the sdf file
var textdata=aResult;

 var scripttag=document.createElement('script');
 scripttag.setAttribute('type','text/javascript');
 scripttag.innerHTML="\n function downloaddata()\n{"+ 
           "\n mywin=window.open(\"\",'3D Structure Data','width=500,height=500');\n"+
           "\n mywin.document.write('<html><body><span id=txtholder></span><script>var textnode=document.createElement(\"textarea\");');"+
          "\n mywin.document.write('textnode.defaultValue\=\" "+textdata+" \" ;textnode.cols=\"55\";\\n textnode.rows=\"25\";');\n"+
          "\n mywin.document.write('var parentnode=document.getElementById(\"txtholder\").appendChild(textnode);');\n"+ 
           "\n mywin.document.write('\\n document.write(\"<br><br><font size=2><b> 3D Structure data Provided by<a href=http://www.chembiogrid.org/cheminfo/p3d/ target=_new>Pub3D</a>, part of <a href=http://www.chembiogrid.org target=_new>Chembiogrid.org</a></b></font>\");</script></body></html>');"+
            "\n mywin.document.close();\n"+
            "}";


var formElement=document.getElementsByTagName('body');
var newElement=formElement[0].firstChild;
formElement[0].insertBefore(scripttag,newElement);

var cidElement=document.getElementsByName('goentrezcid')[0].parentNode.parentNode;
var functionnode=document.createElement('span');
functionnode.setAttribute('id','downloadbox');

var newNode=cidElement.parentNode;
newNode.insertBefore(functionnode,cidElement); 

document.getElementById('downloadbox').setAttribute('align','right');
document.getElementById('downloadbox').innerHTML="&nbsp;<font size='2'><b>Get 3D Data:</b><a href='javascript:downloaddata()'>SDF Format</a></font>";



 }
catch(ex)
  {
        alert('Error Writing Applet'+ex);
    }

 }
    

// individual molecule page  link population program ends

// functions to view the data in the summary page for all the molecules


function run_3DSummary() 
{
//alert("here");
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    return false;
    
  }


  var xPathResult = document.evaluate(
    './/text()[normalize-space(.) != ""]',
    document.body,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
   );

length_of_nodes=document.getElementsByName('uid').length;

for(var i=0;i<length_of_nodes;i++)
 {
  var cid=document.getElementsByName('uid')[i].value;

  Translate_3DSummary(cid,i);
}

}

  function Translate_3DSummary(cid,counter){

      if (!gProxy) {
        var listener = { 

          // gets called once the proxy has been instantiated
          onLoad: function (aProxy) 
          {
           // alert("Inside Onload");
            gProxy = aProxy;
            gProxy.setListener(listener);
            requestTranslation(cid);
          },
         
          // gets called if an error occurs
          onError: function (aError) 
          {
           //alert("Inside Error"); 
            alert("An error has occured: " + aError);
          },
      
          // callback function is hardcoded to {methodname}Callback
          getStructureByCIDCallback  : function (aResult) 

          {
           if(aResult)
            {
              writeApplet_3DSummary(aResult,counter);
            }
   
          }

        };
        
        createProxy(listener);
      } else {
        requestTranslation(cid);
      }
    }



function writeApplet_3DSummary(aResult,counter)
 {
    try
 {
   //create script tag and refer Jmol.js to it
    var scripttag=document.createElement('script');
    
   //append script tag before head
    var headElement=document.getElementsByTagName('head');
    var newElement=headElement[0].firstCild; 
    headElement[0].insertBefore(scripttag,newElement);
    
   var molecule='';
   //loop to remove the '\n'
   for(i=0;i<aResult.length;i++)
     {
        if(aResult[i]=='\n' || aResult[i]=='\r')
          {
            //encode so that it does not get corrupted while passing as a query string.    

                molecule=molecule+"\\\\n\\\" \+ \\n\"";


           }
        else
           {

            if(aResult[i]=='<' || aResult[i]=='>')
               {
                  //alert('The incorrect symbol is:'+i+aResult[i]+":"+aResult[i+1] );
                 if(aResult[i]=='<') 
                   {   //molecule=molecule+"&lt;";
                         molecule=molecule+"\<";       
                   }
                  else
                    { //molecule=molecule+"&gt;"; 
                        molecule=molecule+"\>";
                    }                    

                }   
           else 
            {
             molecule=molecule+aResult[i];
            }

           }
 
     }



   aResult=molecule;

  var datanode=document.createElement('input');
 datanode.setAttribute('id','dataholder');
 datanode.setAttribute('type','hidden');
// document.getElementById('dataholder').setAttribute('value','hello');
 datanode.value='hello';
 var formElement=document.getElementsByTagName('body');
 var newElement=formElement[0].firstChild;
 formElement[0].insertBefore(datanode,newElement);


  document.getElementById('dataholder').value=aResult;
  create_view_link(counter);

//   return(aResult);


 }
catch(ex)
  {
        alert('Error Writing Applet'+ex);
    }

 }
    

// function that writes the 3DView link

function create_view_link(counter)
  {

//building string for populating the pop-up window with the 3D data


 
 var textmessage='hello';
 var scripttag=document.createElement('script');
 scripttag.setAttribute('type','text/javascript');	
 //var linkString="<script>function downloaddata(data)\\n{\\n var molecule\=\"+data+\";alert(molecule);}</script>"+
   //            "<a onclick\=return downloaddata(\'"+textmessage+" \')>Click to download 3D data</a></body></html>";


 scripttag.innerHTML="\nfunction openwindow()\n{"+
              "\n mywin=window.open(\"\",'3D Structure','width=415,height=450');\n"+     
 "\n mywin.document.write('<html><head>\\n<script type=\"text/javascript\" src=\" http://cheminfo.informatics.indiana.edu/JmolFolder/Jmol.js\"></script></head>');"+ 
      "\n mywin.document.write(\"<body>\\n<script type='text/javascript'> \\n jmolInitialize(' http://cheminfo.informatics.indiana.edu/JmolFolder');\");"+
      "\n mywin.document.write('\\n var molecule\=\" "+ document.getElementById('dataholder').value+" \";\\n jmolAppletInline(400,molecule);');"+

       "\n mywin.document.write('\\n document.write(\"<br><br><font size=2><b> 3D Structure Provided by<a href=http://www.chembiogrid.org/cheminfo/p3d/ target=_new>Pub3D</a>, part of <a href=http://www.chembiogrid.org target=_new>Chembiogrid.org</a></b></font>\");</script></body></html>');"+

       "mywin.document.close();\n"+

        "}";

 var formElement=document.getElementsByTagName('body');
 var newElement=formElement[0].firstChild;
 formElement[0].insertBefore(scripttag,newElement);


var cidElement=document.getElementsByName('uid')[counter].parentNode.parentNode;
var functionnode=document.createElement('span');
functionnode.setAttribute('id','appletholder');

var newNode=cidElement.parentNode;
newNode.insertBefore(functionnode,cidElement); 

document.getElementById('appletholder').setAttribute('align','right');
document.getElementById('appletholder').innerHTML="<font ><b>3D View: </b><a href='javascript:openwindow()'>3DView(Jmol)</a></font>";

//link to download the sdf file
var textdata=document.getElementById('dataholder').value;

 var scripttag=document.createElement('script');
 scripttag.setAttribute('type','text/javascript');
 scripttag.innerHTML="\n function downloaddata()\n{"+ 
           "\n mywin=window.open(\"\",'3D Structure Data','width=500,height=500');\n"+
           "\n mywin.document.write('<html><body><span id=txtholder></span><script>var textnode=document.createElement(\"textarea\");');"+
          "\n mywin.document.write('textnode.defaultValue\=\" "+textdata+" \" ;textnode.cols=\"55\";\\n textnode.rows=\"25\";');\n"+
          "\n mywin.document.write('var parentnode=document.getElementById(\"txtholder\").appendChild(textnode);');\n"+ 
           "\n mywin.document.write('\\n document.write(\"<br><br><font size=2><b> 3D Structure data Provided by<a href=http://www.chembiogrid.org/cheminfo/p3d/ target=_new>Pub3D</a>, part of <a href=http://www.chembiogrid.org target=_new>Chembiogrid.org</a></b></font>\");</script></body></html>');"+
           "\n mywin.document.close();\n"+
            "}";


 var formElement=document.getElementsByTagName('body');
 var newElement=formElement[0].firstChild;
 formElement[0].insertBefore(scripttag,newElement);
 

var cidElement=document.getElementsByName('uid')[counter].parentNode.parentNode;
var functionnode=document.createElement('span');
functionnode.setAttribute('id','downloadbox');

var newNode=cidElement.parentNode;
newNode.insertBefore(functionnode,cidElement); 
document.getElementById('downloadbox').setAttribute('align','right');
document.getElementById('downloadbox').innerHTML="&nbsp;<font color='black' size='2'><b>Get 3D Data:</b><a href='javascript:downloaddata()'>SDF Format</a></font>";


  }
    
    






    
    

