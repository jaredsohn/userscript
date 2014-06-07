// ==UserScript==
// @name       Kentico CMS Manage Fields (Enhanced)
// @namespace  http://www.bizstream.com/
// @version    0.16
// @description  Clone Fields for Document Types and Custom Tables
// @match      http://*/CMSModules/DocumentTypes/Pages/Development/DocumentType_Edit_Fields.aspx*
// @match      http://*/CMSModules/CustomTables/CustomTable_Edit_Fields.aspx*
// @copyright  2013+, BizStream
// @author     BizStream, Mark Schmidt
// @iconURL	   http://blog.falcon-software.com/wp-content/uploads/2012/11/Kentico_2D_base_width1200px.jpg
// @iconURL    http://media-cache-ec2.pinterest.com/avatars/bizstream-1347482411_600.jpg
// ==/UserScript==


var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
script.addEventListener('load', function(){ 
    $jq = unsafeWindow['jQuery'];
    $jq.noConflict();
	
    // v6.0 = .FieldPanelRightWrapper
    // v7.0 = #m_c_FieldEditor_pnlRightWrapper
    var $inputPanel = $jq(".FieldPanelRightWrapper,#m_c_FieldEditor_pnlRightWrapper");
    
    $jq("#m_c_FieldEditor_btnNewAttribute").after('<div id="m_c_FieldEditor_btnCloneAttribute" title="CLONE attribute" style="margin-bottom:10px;width:24px;height:24px;cursor:pointer;background-size:100% 100%;background:url(http://cdn1.iconfinder.com/data/icons/starwars/icons/32/clone-old.png) no-repeat center center;"></div>');
    
    $jq("#m_c_FieldEditor_btnCloneAttribute").click(function(e) {
        setCookie("cloneField", "1");
        
        var aKeyVals = {};
        $inputPanel.find("input,select,textarea").each(function() {
            var $this = $jq(this);
            setCookie("cloneKeyVal_"+ $this.attr("id"), $this.val());
        });
        
        $jq("#m_c_FieldEditor_btnNewAttribute").click();
        e.preventDefault();
        return false;
    });
    
    // run any clone events that need to be run
    if (getCookie("cloneField") == "1") {
        //alert("finish clone: "+ getCookie("cloneField"))

        $inputPanel.prepend("<h2>Field has been cloned...</h2><p>Change the <b>Column name</b> and click save</p>")
        
        $jq("#m_c_FieldEditor_dc_txtAttributeName").val( getCookie("cloneKeyVal_m_c_FieldEditor_dc_txtAttributeName") )
        $jq("#m_c_FieldEditor_dc_drpAttributeType").val( getCookie("cloneKeyVal_m_c_FieldEditor_dc_drpAttributeType") )
        $jq("#m_c_FieldEditor_dc_txtAttributeSize").val( getCookie("cloneKeyVal_m_c_FieldEditor_dc_txtAttributeSize") )
        $jq("#m_c_FieldEditor_dc_chkAllowEmpty"   ).prop('checked', (getCookie("cloneKeyVal_m_c_FieldEditor_dc_chkAllowEmpty") == "on" ? true : false ) );
        $jq("#m_c_FieldEditor_dc_txtDefaultValue").val( getCookie("cloneKeyVal_m_c_FieldEditor_dc_txtDefaultValue") )

        $jq("#m_c_FieldEditor_chkDisplayInForm"   ).prop('checked', (getCookie("cloneKeyVal_m_c_FieldEditor_chkDisplayInForm") == "on" ? true : false ) );
        $jq("#m_c_FieldEditor_fa_txtFieldCaption_textbox").val( getCookie("cloneKeyVal_m_c_FieldEditor_fa_txtFieldCaption_textbox") )
        $jq("#m_c_FieldEditor_fa_drpControl_uniSelector_drpSingleSelect").val( getCookie("cloneKeyVal_m_c_FieldEditor_fa_drpControl_uniSelector_drpSingleSelect") )


        $jq("#m_c_FieldEditor_cs_form_Options_txtValue").val( getCookie("cloneKeyVal_m_c_FieldEditor_cs_form_Options_txtValue") )
        
        
        /*
        $jq(document.cookie.split(";")).each(function() {
            var keyVal = this;
            if (keyVal.substr(0, 13) == "cloneKeyVal_") {
               alert(keyVal);
            }
        });
		debugger;
        */
        

        setCookie("cloneField", "0");
    }
    
}, false);



function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}