// ==UserScript==
// @name           Mini Monito
// @namespace      http://el-monito.com/ga/
// @description    Adds a simple El Monito widget to your Google Analytics dashboard
// @include        https://www.google.com/analytics/reporting/dashboard*
// ==/UserScript==

{
    var profile_node = document.getElementById('profile');
    var profile_name = profile_node.options[profile_node.selectedIndex].text;
    var url = 'http://el-monito.com/ga/?name=' + escape(profile_name);

    var module = document.createElement('li');
    module.innerHTML =
        ('<div id="el_monito_module">'
         + ' <div class="dashboard_module">'
         + '  <h2><b><span>Availability</span></b></h2>'
         + '  <div id="el_monito_report">'
         + '   <div class="top_items">'
         + '    <iframe src="' + url + '" width="100%" frameborder="0"></iframe>'
         + '   </div>'
         + '  </div>'
         + '  <p><b><a href="http://el-monito.com/">measured by El Monito</a></b></p>'
         + ' </div>'
         + '</div>');

    var li_end = document.getElementById("right_after_pad");
    li_end.parentNode.insertBefore(module, li_end);
};
