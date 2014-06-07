  // ==UserScript==
  // @name           BumpNumbering
  // @namespace      //
  // @description    Auto-generates incremental text for bumps (or any other purpose)
  // @include        *.gaiaonline.com/forum/*
  // ==/UserScript==
  
  function createAddButton()
  {
    var addButton = document.createElement('a');
    addButton.className = "cta-button-md gray-button";
    addButton.setAttribute("title","add topic to bump list");
    addButton.setAttribute("id", "addButton");
    //addButton.setAttribute("href", "");
    
    var addInner = '<span>Add</span>';
    addButton.innerHTML = addInner;
    
    var buttonBox = document.getElementById("navlinks_pag");
    var reportLink = document.getElementById("hdr_report_links");
    if (reportLink != null)
    buttonBox.childNodes[1].childNodes[3].insertBefore(addButton, buttonBox.childNodes[1].childNodes[3].childNodes[4]);
    
    addButton.addEventListener('click',addOptions, false);
  }
  
  function createRemButton()
  {
    var RemButton = document.createElement('a');
    RemButton.className = "cta-button-md gray-button";
    RemButton.setAttribute("title","Remove topic from bump list");
    RemButton.setAttribute("id", "RemButton");
    //addButton.setAttribute("href", "");
    
    var RemInner = '<span>Remove</span>';
    RemButton.innerHTML = RemInner;
    
    var buttonBox = document.getElementById("navlinks_pag");
    var reportLink = document.getElementById("hdr_report_links");
    if (reportLink != null)
    buttonBox.childNodes[1].childNodes[3].insertBefore(RemButton, buttonBox.childNodes[1].childNodes[3].childNodes[4]);
    
    RemButton.addEventListener('click',remOptions, false);
  }
    
function addOptions()
{
  var options = document.createElement("div");
  options.className ="optionsBox";
  options.setAttribute("id", "optionsBox");
  var innerOptions = '<i class = "boxHeader">Set your post format for this thread</i><textarea id="optionsText" tabindex ="2"></textarea><a id="optionSubmit" class="cta-button-sm"><span>Save Format</span></a><a id="optionCancel" class="cta-button-sm"><span>cancel</span></a>';
  options.innerHTML = innerOptions;
  var docBox = document.getElementById("navlinks_pag");
  docBox.appendChild(options);
  var setLink = document.getElementById("optionSubmit");
  setLink.addEventListener('click', setFormatValue, false);
  var cancelLink = document.getElementById("optionCancel")
  cancelLink.addEventListener('click', cancelFormatValue, false);
}
      
function remOptions()
{
  var src = document.location.href;
  var splitPage = src.split("/");
  var formatKey = splitPage[5] +"Post Format";
  var countKey = splitPage[5] + "Post Number"; 
  GM_deleteValue(formatKey);
  GM_deleteValue(countKey);
  var RemButton = document.getElementById("RemButton");
  var buttonBox = document.getElementById("navlinks_pag");
  alert("Thread removed from bump list");    
  buttonBox.childNodes[1].childNodes[3].removeChild(RemButton);
  createAddButton();
  var fillButton = document.getElementById("fillButton");
  var qrBox = document.getElementById("qr_container");
  qrBox.childNodes[1].removeChild(fillButton);
}

function cancelFormatValue()
{
  var docBox = document.getElementById("navlinks_pag");
  var options = document.getElementById("optionsBox");
  docBox.removeChild(options);
}
      
function setFormatValue()
  {
    var src = document.location.href;
    var splitPage = src.split("/");
    var formatContent = document.getElementById("optionsText");
    
    var postFormat = formatContent.value;
    var formatKey = splitPage[5] +"Post Format";
    var countKey = splitPage[5] + "Post Number";
    
    if(postFormat != "" && postFormat != "you cannot leave this blank")
    {
      GM_setValue(formatKey, postFormat);
      GM_setValue(countKey, 1);
      
      cancelFormatValue();
      checkThread();
      alert("Post format saved");
    }
    else{
      formatContent.value = "you cannot leave this blank";
      formatContent.className ="redText";
      setTimeout(clearText, 5000); 
    }
  }
  
function clearText()
  {
    var formatContent = document.getElementById("optionsText");
    formatContent.className =""; 
    if(formatContent.value == "you cannot leave this blank")
    {
      formatContent.value = ""  ;
    }
  }
    
  function createFillButton()
  {
      var qrBox = document.getElementById("qr_container");
      var fillButton = document.createElement('a');
      fillButton.className = "cta-button-sm";
      fillButton.setAttribute("id", "fillButton");
      fillButton.setAttribute("title","fill out post format"); 
      var addInner = '<span>Fill</span>';
      fillButton.innerHTML = addInner; 
      qrBox.childNodes[1].appendChild(fillButton); 
      fillButton.addEventListener('click', fillFormat, false);
  }
  
  function createChangeButton()
  {
      var qrBox = document.getElementById("qr_container");
      var changeButton = document.createElement('a');
      changeButton.className = "cta-button-sm";
      changeButton.setAttribute("id", "changeButton");
      changeButton.setAttribute("title","Change your post format"); 
      var changeInner = '<span>Change</span>';
      changeButton.innerHTML = changeInner; 
      qrBox.childNodes[1].appendChild(changeButton); 
      changeButton.addEventListener('click', changeOptions, false);
  }
  
    function createVarButton()
  {
      var qrBox = document.getElementById("qr_container");
      var varButton = document.createElement('a');
      varButton.className = "cta-button-sm";
      varButton.setAttribute("id", "varButton");
      varButton.setAttribute("title","Change your post number"); 
      var varInner = '<span>Post number</span>';
      varButton.innerHTML = varInner; 
      qrBox.childNodes[1].appendChild(varButton); 
      varButton.addEventListener('click', varOptions, false);
  }
  
   function varOptions()
{
  var options = document.createElement("div");
  options.className ="optionsBox";
  options.setAttribute("id", "optionsBox");
  var innerOptions = '<i class = "boxHeader">Enter new post number.</i><textarea id="optionsText" tabindex ="2" value ="1" height="25px"></textarea><a id="optionSubmit" class="cta-button-sm"><span>Save post number</span></a><a id="optionCancel" class="cta-button-sm"><span>cancel</span></a>';
  options.innerHTML = innerOptions;
  var docBox = document.getElementById("navlinks_pag");
  docBox.appendChild(options);
  var setLink = document.getElementById("optionSubmit");
  setLink.addEventListener('click', changeVarValue, false);
  var cancelLink = document.getElementById("optionCancel")
  cancelLink.addEventListener('click', cancelFormatValue, false);
}
  
  function changeVarValue()
  {
    var src = document.location.href;
    var splitPage = src.split("/");
    var formatContent = document.getElementById("optionsText");
    var postFormat = parseInt(formatContent.value);
    var postVar = formatContent.value;
    var countKey = splitPage[5] +"Post Number";
    
    if(postFormat != "" && postFormat != "you cannot leave this blank")
    {
      GM_setValue(countKey, postVar);
         
      cancelFormatValue();
      alert("Post number saved");
      checkThread();
    }
    else{
      formatContent.value = "you cannot leave this blank";
      formatContent.className ="redText";
      setTimeout(clearText, 5000); 
    }
  }
  
  function changeOptions()
{
  var options = document.createElement("div");
  options.className ="optionsBox";
  options.setAttribute("id", "optionsBox");
  var innerOptions = '<i class = "boxHeader">Set your post format for this thread</i><textarea id="optionsText" tabindex ="2"></textarea><a id="optionSubmit" class="cta-button-sm"><span>Save Format</span></a><a id="optionCancel" class="cta-button-sm"><span>cancel</span></a>';
  options.innerHTML = innerOptions;
  var docBox = document.getElementById("navlinks_pag");
  docBox.appendChild(options);
  var setLink = document.getElementById("optionSubmit");
  setLink.addEventListener('click', changeFormatValue, false);
  var cancelLink = document.getElementById("optionCancel")
  cancelLink.addEventListener('click', cancelFormatValue, false);
}

function changeFormatValue()
  {
    var src = document.location.href;
    var splitPage = src.split("/");
    var formatContent = document.getElementById("optionsText");
        var postFormat = formatContent.value;
    var formatKey = splitPage[5] +"Post Format";
    
    if(postFormat != "" && postFormat != "you cannot leave this blank")
    {
      GM_setValue(formatKey, postFormat);
         
      cancelFormatValue();
      alert("Post format saved");
      checkThread();

    }
    else{
      formatContent.value = "you cannot leave this blank";
      formatContent.className ="redText";
      setTimeout(clearText, 5000); 
    }
  }

  
  function fillFormat()
  {
      var postBox = document.getElementById("qr_text");
      var src = document.location.href;
      var splitPage = src.split("/");
      var formatKey = splitPage[5] +"Post Format";
      var countKey = splitPage[5] + "Post Number";
      var postNumber = GM_getValue(countKey);
      var postFormat = GM_getValue(formatKey);
      postFormat = postFormat.replace("%postnumber%", "" + postNumber);
      postBox.value = postFormat;
      GM_setValue(countKey, (parseInt(postNumber)+ 1));
    }
  
  function checkThread()
  {
    var src = document.location.href;
    var splitPage = src.split("/");
    var formatKey = splitPage[5] +"Post Format";
    if(GM_getValue(formatKey) != null)
    {
      var addButton = document.getElementById("addButton");
      var buttonBox = document.getElementById("navlinks_pag");
      buttonBox.childNodes[1].childNodes[3].removeChild(addButton);
      createFillButton();
      createChangeButton();
      createVarButton();
      createRemButton();
    }
  }
      
      GM_addStyle('.optionsBox{position:fixed!important; margin-left:auto!important; margin-right:auto!important; top:150px!important; height:220px!important; width:300px!important; border:1px solid #000!important;z-index:999!important; background:#EBEFF2!important;-moz-border-radius:5px!important;}'+
'#optionsText{height:100px!important; width:250px!important;margin:25px!important;}'+
'.boxHeader{padding:25px!important;line-height:30px!important;font-size:16px!important;text-decoration:none!important;}'+
'.optionsBox .cta-button-sm{margin-left:25px!important;}'+
'.redText{color:#f00;font-size:16px!important;}'+
'#fillButton, #changeButton, #varButton{float:right!important;margin-right:15px!important; margin-top:10px!important;}'+
'.cta-button-md:hover, .cta-button-sm:hover{cursor:pointer!important;}');
      
    createAddButton();
    checkThread();