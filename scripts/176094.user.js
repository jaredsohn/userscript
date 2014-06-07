// ==UserScript==
// @name          OutOfMilk.com Shopping List Enhancements
// @version       0.1.4
// @description   Collection of HTML/CSS enhancements for various bugs and/or shortcomings
// @namespace     http://userscripts.org/users/377329
// @author        Jonathan Brochu (http://userscripts.org/users/377329)
// @license       GPLv3 or later (http://www.gnu.org/licenses/gpl-3.0.en.html)
// @include       http://www.outofmilk.com/ShoppingList.aspx*
// @grant         GM_addStyle
// ==/UserScript==

/***
 * History:
 *
 * 0.1.4  Changes made:
 *        - Changed how the initial width of the "Product History Management"
 *          dialog is set.
 *        - Implemented changes to add a "UPC" column to the product history
 *          table (by changing its jQuery UI dialog template; this is possible
 *          since the web service's "GetAllProductHistoryItems" method already
 *          returns the stored UPC value for each history item).
 *        - Removed keep-alive code since no longer necessary.
 *        (2013-08-19)
 * 0.1.3  Changes made:
 *        - Removed "!important" when setting the (initial) width property of
 *          the "Product History Management" dialog (since the specified width
 *          isn't meant to be permanent).
 *        (2013-04-05)
 * 0.1.2  Changes made:
 *        - Added javascript code to keep the session alive (without the
 *          need to refresh the page).
 *        (2013-04-04)
 * 0.1.1  Changes made:
 *        - Added column names for dialog "Product History Management".
 *        - Changed text alignment for (newly-named) column "Tax Exempt".
 *        (2013-04-04)
 * 0.1.0  First implementation. (2013-04-02)
 *
 */

(function() {
    // constants
    var USERSCRIPT_NAME = 'OutOfMilk.com Shopping List Enhancements';
    
    // css definitions
    var css_fixes =
            '@namespace url(http://www.w3.org/1999/xhtml);\n' +
        // Changes & Overrides
            // background overlays for modal dialog with fixed postion
            '.ui-widget-overlay { position: fixed /* original: absolute */ !important ; }\n' +
            // "Product History Management" dialog - increase initial width
            //  '-> now done through javascript
            // //'div[aria-describedby="manageproducthistoryform"] { width: 80% /* original: 600px */ ; }\n' +
            // "Product History Management" dialog - take full parent's width for table within dialog
            'table.producthistory-table { width: 100% /* original: 550px */ !important ; }\n' +
            // "Product History Management" dialog - column headers
            'table#producthistorytable.table-default > tr:nth-child(1) > th:nth-child(1) > strong:before { ' +
                    'content: "Item" /* original: (none specified) */ !important ; }\n' +
            'table#producthistorytable.table-default > tr:nth-child(1) > th:nth-child(3) > strong:before { ' +
                    'content: "Tax Exempt" /* original: (none specified) */ !important ; }\n' +
            'table#producthistorytable.table-default > tr:nth-child(1) > th:nth-child(4) > strong:before { ' +
                    'content: "Category" /* original: (none specified) */ !important ; }\n' +
            'table#producthistorytable.table-default > tr:nth-child(1) > th:nth-child(5) > strong:before { ' +
                    'content: "UPC" /* original: (none specified) */ !important ; }\n' +
            'table#producthistorytable.table-default > tr:nth-child(1) > th:nth-child(6):before { ' +
                    'content: "Actions" /* original: (none specified) */ !important ; ' +
                    'text-align: center /* original: left (through inheritance) */ !important ; ' +
                '}\n' +
            'table#producthistorytable.table-default > tr:nth-child(1) > th:nth-child(5) { ' +
                    'text-align: center /* original: left (through inheritance) */ !important ; ' +
                '}\n' +
            // "Product History Management" dialog - values for column "Tax Exempt" centered horizontally
            'td.producthistorytaxfree { text-align: center /* original: left (through inheritance) */ !important ; }\n' +
            // "Edit Product History" dialog - wider "Description" field
            '#ctl00_ctl00_ContentPlaceHolder1_EditProductHistoryDialog1_txtEditProductHistoryDescription { ' +
                    'width: 350px /* original: (none specified) */ !important ; }\n' +
        // <END>
            '';
    
    // new "producthistory-template" template
    var templateProductHistory = function() {
/**HEREDOC
    <script type="producthistory-template">
        <# if(this.dataobjects.length > 0) { #>
            <tr>
                <th><strong></strong></th>
                <th><strong>Price</strong></th>
                <th><strong></strong></th>
                <th><strong></strong></th>
                <th><strong></strong></th>
                <th colspan="3"></th>
            </tr>
            <# $.each(this.dataobjects, function(i, object) { #>
            <tr>
                <td class="producthistoryid hidden">
                    <#= object.ID #>
                </td>
                <td>
                    <span class="producthistorydescription"><#= trimDescription(object.Description,60,"<acronym title=\"" + object.Description + "\">...</acronym>") #></span>
                </td>
                <td class="producthistoryprice">
                    <span><#= FormatNumberCurrency(object.Price) #></span>
                </td>
                <td class="producthistorytaxfree">
                    <span><#= object.TaxFree #></span>
                </td>
                <td>
                    <span><#= object.CategoryName #></span>
                </td>
                <td>
                    <span><#= object.UPC #></span>
                </td>
                <td>
                    <a href="javascript:void(0);" class="btn-default addproducthistory"><span>Add To List</span></a>
                </td>
                <td>
                    <a href="javascript:void(0);" class="btn-default editproducthistory"><span>Edit</span></a>
                </td>
                <td class="last-column">
                    <a href="javascript:void(0);" class="btn-default deleteproducthistory"><span>Delete</span></a>
                </td>
            </tr>
            <# }); #>
        <# } else { #>
            <tr>
                <td colspan="5">There are no items to display</td>
            </tr>
        <# } #>
    </script>
HEREDOC**/
    };
    
    // heredoc parser
    var getHeredoc = function(container, identifier) {
        // **WARNING**: Inputs not filtered (e.g. types, illegal chars within regex, etc.)
        var re = new RegExp("/\\*\\*" + identifier + "[\\n\\r]+[\\s\\S]*?[\\n\\r]+" + identifier + "\\*\\*/", "m");
        var str = container.toString();
        str = re.exec(str).toString();
        str = str.replace(new RegExp("/\\*\\*" + identifier + "[\\n\\r]+",'m'),'').toString();
        return str.replace(new RegExp("[\\n\\r]+" +identifier + "\\*\\*/",'m'),'').toString();
    };
    
    // template substitution
    var replaceDialogTemplate = function(templateName, newContent) {
        var scripts = document.getElementsByTagName('script');
        if (scripts.length > 0) {
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].getAttribute('type') == templateName) {
                    // replace template content
                    scripts[i].innerHTML = newContent.toString().replace(/^[\r\n\s]*<script[^>]*>|<\/script>[\r\n\s]*$/g, '');
                    return;
                }
            }
        }
    };
    
    // reference some outside objects
    window.console = window.console || (function() {
        if (typeof(unsafeWindow) == 'undefined') return { 'log': function() {} };
        return unsafeWindow.console;
    })();
    // self-explanatory
    document.addStyle = function(css) {
        if (typeof(GM_addStyle) != 'undefined') {
            GM_addStyle(css);
        } else {  
            var heads = this.getElementsByTagName('head');
            if (heads.length > 0) {
                var node = this.createElement('style');
                node.type = 'text/css';
                node.appendChild(this.createTextNode(css));
                heads[0].appendChild(node); 
            }
        }
    };
    
    // css injection
    document.addStyle(css_fixes);
    
    try {
        // replace template "producthistory-template"
        replaceDialogTemplate('producthistory-template', getHeredoc(templateProductHistory, 'HEREDOC'));
        // set initial width of "Product History Management" dialog
        // (and wait until dialogs are initialized)
        var $ = unsafeWindow.jQuery;
        $(document).ready(function () {
            $("#manageproducthistoryform").dialog('option', 'width', '80%');
        });
    } catch(err) {
        console.log(err);
    }
    
    console.log('User script "' + USERSCRIPT_NAME + '" has completed.');
})();