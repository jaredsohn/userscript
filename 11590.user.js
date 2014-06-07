// ==UserScript==
// @name          formBackup
// @description   sends the data to multiple servers
// @version       193
// @author        Kazuyoshi Tlacaelel <kazu.php@gmail.com>
// ==/UserScript==

//{{{ todo

/**
 * todo
 * select boxex onchange submits and such
 */
//}}}
//{{{ templates

templates_en = {
    DEBUG               : "DEBUG        : $msg",
    ERROR               : "ERROR        : $msg",
    OUTPUT              : "OUTPUT       : ",
    LOG                 : "LOG          : $msg",
    undefined           : "Error no template to display was found!",
    executing           : "executing",
    unpacking           : "unpacking",
    warning             : "warning",
    result              : "result",
    exception           : "exception",
    notice              : "notice",
    form_is             : "Is form         ",
    form_has_action     : "Form has action ",
    form_has_id         : "Form has id      ",
    form_id             : "Form id          ",
    question            : "Would you like to $msg ?",
    stopped_cause       : "Stopped process because",
    _default            : "Default ",
    url_error           : "The url : $uri is not valid ",
    success             : "<strong>Sucscess </strong> : $msg ",
    a_proceed           : "Proceed",
    input_fom           : "Please provide a form to bind with this document",
    cant_use_form       : "Cannot use the form",
    please_wait         : "Please wait",
    will_use_form       : "The form is good! hang on!",
    using_saved_form    : "Using saved form",
    a_save_form         : "Save the form",
    saving_form         : "Saving form",
    form_validating     : "Validating the form please wait",
    no_forms_to_bind    : "There are no forms to bind",
    forms_binded        : "Forms were binded successfuly",
    form_was_saved      : "The form was saved!",
    form_legend         : "Please input your form! \n",
    end_of_script       : "Script is shutting down good bye !"
}


templates_es = {
    DEBUG               : "DEBUG        : $msg",
    ERROR               : "ERROR        : $msg",
    OUTPUT              : "RESPUESTA    : ",
    LOG                 : "LOG          : $msg",
    undefined           : "Error no se pudo hallar ninguna respuesta del programa",
    executing           : "ejecutando",
    unpacking           : "desempacando",
    warning             : "atencion",
    result              : "resultado",
    exception           : "ecepcion",
    notice              : "note               ",
    form_is             : "Se ha encontrado una forma",
    form_has_action     : "La forma tiene action ",
    form_has_id         : "La forma tiene id  ",
    form_id             : "id de la forma     ",
    question            : "Le gustaria $msg ?",
    stopped_cause       : "El processo se termino porque ",
    _default            : "Default ",
    url_error           : "El url : $uri no es valido! ",
    success             : "<strong>exito </strong> : $msg ",
    a_proceed           : "Continuar",
    input_fom           : "Por favor agrege la forma que quiera combinar con este documento",
    cant_use_form       : "La forma recibida no se puede usar",
    please_wait         : "Por favor espere",
    will_use_form       : "La forma recibide se puede utilizar, por favor espere!",
    using_saved_form    : "Usando la forma que se habia guardado anteriormente",
    a_save_form         : "Guardar la forma",
    saving_form         : "Guardando la forma",
    form_validating     : "La forma se esta validando favor de esperar",
    no_forms_to_bind    : "No existe ninguna forma en este documento para combinar",
    forms_binded        : "Las formas fueron combinadas con exito!",
    form_was_saved      : "La forma se ha guardado!",
    form_legend         : "Por favor agreaga tu forma! \n",
    end_of_script       : "El programa dejara de operar."
}


templates_jp = {
    DEBUG               : "デバグ        : $msg",
    ERROR               : "エラー        : $msg",
    OUTPUT              : "アウトプット  : ",
    LOG                 : "ログ          : $msg",
    undefined           : "エラー、アウトプットはありません",
    executing           : "実行中",
    unpacking           : "パッケジーを開いています",
    warning             : "Warning",
    exception           : "exception",
    result              : "結果",
    notice              : "お知らせ",
    form_is             : "フォームがみつかりました、少々お待ちください",
    form_has_action     : "フォームの「　action　」みつかりました、少々お待ちください",
    form_has_id         : "フォームの「　id　」みつかりました、少々お待ちください",
    form_id             : "フォームの「　id　」",
    question            : "$msgしますか?",
    stopped_cause       : "エラー、プログラムをストップされました！",
    _default            : "Default ",
    url_error           : "$uri　のURLは正しくでありません! ",
    success             : "<strong>exito </strong> : $msg ",
    a_proceed           : "formBackupのプログラムを使用",
    input_fom           : "組み合わせたいフォームを入力をして下さい。",
    cant_use_form       : "入力したフォームは組み合わせる事は出来ませんでした！",
    please_wait         : "少々お待ちください。",
    will_use_form       : "入力したフォーム組み合わせる事は出来ます、少々お待ちください",
    using_saved_form    : "保存されましたフォーム使用しています。",
    a_save_form         : "このフォームを保存する",
    saving_form         : "フォーム保存しています。",
    form_validating     : "フォームのバリデーション中です、少々お待ちください。",
    no_forms_to_bind    : "このページには組み合わせられるフォームみつかりませんでした。",
    forms_binded        : "このページにあるフォームを組合す事を終了しました。",
    form_was_saved      : "フォームの保存しました！",
    form_legend         : "このページと組み合わせたいフォームを入力してください。 \n",
    end_of_script       : "プログラムは終了しました。"
}

//}}}
//{{{ TemplateAccessObject

/**
 * template access object
 * contains abasic set of tools to access a template object
 */
TemplateAccessObject = {

    /**
     * specifies the string that is used during the binding
     *
     * @var object RegExp
     */
    binding : new RegExp(/\$\w*/),

    /**
     * in javascript constructors change so do instances so we will be
     * checking for no functions included in the object. in the mean time
     *
     * @param object $template_object the template object to check for
     * @return boolean
     */
    isTemplateObject : function($template_object)
    {
        if (!$template_object instanceof Object)
            return false;
        for (var property in $template_object) {
            if (typeof $template_object[property] == 'function')
                return false;
        }
        return true;
    },

    /**
     * checks if a template exists
     *
     * @param   string $template_name the name of the template to check for
     * @return boolean
     */
    exists : function($template_name)
    {
        for (var $property in this.getTemplateObject()) {
            if ($property == $template_name)
                return true;
        }
        return false;
    },

    /**
     *
     * todo check if the object is valid and if it has a defines default object
     * return '_default' string otherwise.
     * the templates object should define its own default template with a
     * proeprty
     * called 'APP_DEFAULT'
     */
    default : function()
    {
        return '_default';
    },

    /**
     * gets the template data as it exists on hard memory
     *
     * @param  string $template_name the name of the template to load
     * @return string
     */
    raw : function($template_name)
    {
        if (this.exists($template_name))
            return String(eval("this.getTemplateObject()." + $template_name));
    },

    /**
     * finds out if a template contains binds within
     *
     * @return boolean
     */
    binds : function($template_name)
    {
        return Boolean(this.raw($template_name).match(this.binding));
    },

    /**
     * gets the template binds the parameters within if any, and
     * returns the results as a string
     *
     * @param   string $template_name the name of the template load
     * @param   object $params the keys of the object will be searched and
     * replaced with the values of that key
     * @return  string
     */
    bind : function($params, $template_name)
    {
        var $template = this.raw($template_name);
        for (var $property in $params) {
            eval('$template = $template.replace(/[$]' +
            $property + '/g, $params[$property])');
        }
        return new String($template);
    }
}

//}}}
//{{{ models

models = {

    start : function(fc)
    {
        return 'question,getform';
    },

    undefined : function(fc)
    {
        var $str = "No model defined !";
        // fc.oh.add($str);
        try {
            throw new Error($str);
        } catch (e) {
            fc.log('ERROR', 'warning', e.message + " " + e.stack);
        }
    },

    getform : function(fc)
    {
        if (fc.getCookie().length) {
            if (!fc.parser.setFormRawCode(fc.getCookie()))
                return 'cant_use_form';
            if(fc.parser.isValidForm()) {
                document.body.innerHTML += "<div id=c_____form_container_ " +
                    "style='position:absolute;height:0;width:0; overflow:hidden;'>"+
                    fc.getCookie() +
                    "</div>";
                return 'using_saved_form,bindForms';
            }
        }
        if (confirm(fc.template.bind(
                        {msg:fc.template.raw('a_proceed')},
                        fc.getTemplateName()))
                ) {
            return 'input_fom,showGUI';
        }
        return 'end_of_script';
    },

    showGUI : function(fc)
    {
        var  $d = document,
             $p = $d.createElement('pre'),
             $t = $d.createElement('textarea'),
             $b = $d.createElement('input'),
             $r = $d.createElement('br'),
             $style = new String();

        $p.setAttribute('id', fc.gui_container_id);
        $style = "position:absolute; left:20%; top:100; display:block;";
        $p.setAttribute('style', $style);
        $t.setAttribute('id', fc.gui_textarea_id);
        $t.setAttribute('style', "width:700; height:240;");
        $b.setAttribute('value', fc.template.raw('a_save_form'));
        $b.setAttribute('type', 'button');
        $b.setAttribute('onclick', "fc.unpack('please_wait,hideGUI')");
        $p.innerHTML = fc.template.raw('form_legend');
        $p.appendChild($t);
        $p.appendChild($r);
        $p.appendChild($b);
        document.body.appendChild($p);
        return 1;
    },

    hideGUI : function(fc)
    {
        if (!fc.parser.setFormRawCode(fc.$(fc.gui_textarea_id).value))
            return 'cant_use_form';
        fc.$(fc.gui_container_id).style.display = 'none';
        return 'form_validating,validateForm';
    },

    validateForm : function(fc)
    {
        if (fc.parser.isValidForm()) {
            if (fc.parser.hasId()) // todo, generate id
                fc.log('DEBUG', 'form_is', fc.parser.isForm());
                fc.log('DEBUG', 'form_has_action', fc.parser.hasAction());
                fc.log('DEBUG', 'form_has_id', fc.parser.hasId());
                fc.log('DEBUG', 'form_id', fc.parser.getId());
                return 'will_use_form,askToSaveForm';
        }
        return 'cant_use_form';
    },

    /**
     *
     */
    askToSaveForm : function(fc)
    {
        if (confirm(fc.template.bind(
                        {msg:fc.template.raw('a_save_form')},
                       'question'
                        ))) {
                return 'saving_form,saveForm';
        }
        return 'please_wait,bindForms';
    },

    /**
     *
     */
    saveForm : function()
    {
        document.cookie = "formBackup=" + fc.$(
                fc.gui_textarea_id
                ).value.replace(
                    /\n|\r/g,
                    '/n'
                    ).replace(
                        /;/g,
                        '@!'
                        );
        return 'form_was_saved,getform';
    },

    /**
     */
    bindForms : function(fc)
    {
        var i = 0,
            e = 0,
            B = document.body,
            F = document.forms,
            node = null,
            bind = F[fc.parser.getId()],
            binde = F[fc.parser.getId()].elements,
            E = null;

        if (F.length < 1)
            return 'no_forms_to_bind';

        for (; i < F.length; i ++) {
            if (fc.parser.getId() != F[i].id) {
                fc.log('DEBUG', 'notice', "parsing form no. " + i);
                F[i].id = fc.uid();
                fc.log('DEBUG', 'notice', "creating form id :" + F[i].id);
                for (; e < F[i].elements.length; e ++) {
                    E = F[i].elements[e];
                    if (E.type) {
                        if (E.type == ('submit')) {
                            fc.log('DEBUG', 'notice', "removing button of type :"
                                    + E.type);
                            // F[i].removeChild(E);
                            E.setAttribute('type', 'hidden');
                        } else {
                            fc.log('DEBUG', 'notice', "ignoring the removal of  :"
                                    + E.type);
                        }
                    }
                }
                e = 0;

                // add  ( the binding fields )
                // copy the binding-form's elements to all the forms
                // except the submit buttons
                // ( submit buttons are removed if any are found )
                for (; e < binde.length; e ++) {
                    if (binde[e].type != 'submit') {
                        node = binde[e].cloneNode(true);
                        node.setAttribute('remove', true);
                        F[i].appendChild(node);
                    } else {
    fc.log('DEBUG', 'notice', "removing binding-form's element of type :" + E.type);
                        bind.removeChild(binde[e]);
                        e--;
                    }
                }

                // append a submit button at the very end of the binded forms
                Submit_button = document.createElement('input');
                Submit_button.setAttribute('type', "button");
                Submit_button.setAttribute('value', "Submit");
                var $submit = "fc.submit_id = '" + F[i].id +
                        "'; fc.unpack('please_wait,submit')";
                fc.log('DEBUG', 'notice', "creating submit button:" + $submit);
                Submit_button.setAttribute( 'onclick', $submit);
                F[i].appendChild(Submit_button);
            }
        }
        bind.innerHTML = '';
        return 1;
    },

    submit : function(fc)
    {
        var F = document.forms,
            i = 0,
            e = 0,
            S = F[fc.submit_id],
            Se = S.elements,
            B,
            Be,
            $data = fc.getCookie(),
            ok;
        ok  = fc.parser.setFormRawCode($data);
        if (!ok) {
            return 'cant_use_form';
        }
        B   = F[fc.parser.getId()];
        Be  = B.elements;
        for (;i < S.length;) {
            if (Se[i].length) {
                fc.log('DEBUG', 'notice', 'Multiple value element found :' 
                        + Se[i].length);
                for (var ite = 0; ite < Se[i].length; ite ++) {
                    var $input = document.createElement('input');
                    $input.setAttribute('name', Se[i].name + "[]");
                    $input.setAttribute('type', 'hidden');
                    if (Se[i][ite].selected || Se[i][ite].checked) {
                        fc.log('DEBUG', 'notice',
                                'Adding option ratio or checkbox: '
                                + $input.name + " = " + Se[i][ite].value);
                        $input.setAttribute('value', Se[i][ite].value);
                        B.appendChild($input);
                    } else {
                        fc.log('DEBUG', 'notice', 'ignoring:'
                                + Se[i][ite]);
                    }
                }
            } else {
                var $input = document.createElement('input');
                $input.setAttribute('name', Se[i].name);
                $input.setAttribute('value', Se[i].value);
                $input.setAttribute('type', 'hidden');
                fc.log('DEBUG', 'notice', ' copying ' 
                        + $input.type + ' = ' + $input.value);
                B.appendChild($input);
            }
            if (Se[i].getAttribute('remove')) {
                fc.log('DEBUG', 'notice', " erasing element " + Se[i].name);
                S.removeChild(Se[i]);
                i --;
            }
            i ++;
        }
        if (fc.send) {
            F[fc.parser.getId()].submit();
            F[fc.submit_id].submit();
        }
        return 1;
    }
}


//}}}
//{{{ ModelAccessObject
ModelAccessObject = {

    /**
     * checks if a model exists
     *
     * @param   string $model_namethe name of the model to check for
     * @return boolean
     */
    exists : function($model_name)
    {
        for (var $property in this.getModelObject()) {
            if ($property == $model_name)
                return true;
        }
        return false;
    }
}
//}}}
//{{{ htmlTool

htmlTool = {

    // [<]form.*\r*\n*.*<[^f]+form>
    // ([<]form.*\r*\n*.*</form>)
    regex_form_tag  : new RegExp("([<]form[^>]*>)", "gim"),
    regex_form      : new RegExp("(^.*$)", "gmi"),
    regex_action    : new RegExp(
            "([< ]form[^>]*action[=\"' ]*)([^\\W]*\.[^\\W]*)([^$]*)" , "gmi"),
    regex_id        : new RegExp("(.*(?:id[=\"' ]*)([^\"' >]*).*)" , "gim"),
    form_code       : new String(),

    /**
     * @return boolean
     */
    setFormRawCode : function($code)
    {
        if (
                (
                    (typeof $code == 'string')
                 || ($code instanceof String)
                )
                && ($code.length > 0)
            ) {
            this.form_code = $code;
            return true;
        }
        return false;
    },

    getFormRawCode : function()
    {
        return this.form_code;
    },

    getAction : function()
    {
        return this.extractForm().replace(this.regex_action, "$2");
    },

    getFormTag : function()
    {
        return new String(this.extractForm().match(this.regex_form_tag, "$1"));
    },

    extractForm : function()
    {
        return this.form_code.replace(this.regex_form, "$1");
    },

    isForm : function()
    {
        return Boolean(this.extractForm().match(this.regex_form));
    },

    hasAction : function()
    {
        return Boolean(this.extractForm().match(this.regex_action));
    },

    hasId : function()
    {
        return Boolean(this.getFormTag().match(/(id[="' ]*)([^\"' >]*)/gim));
    },

    isValidForm : function()
    {
        return Boolean(this.isForm() && this.hasId() && this.hasAction());
    },

    getId : function($id)
    {
        return this.getFormTag().replace(this.regex_id, '$2');
    }
}

//}}}
//{{{ OutputHandlerTools


OutputHandlerTools = {

    output : new Array(),
    _log : '',
    output_prefix : new String(),
    c : 0,
    display : 0, 

    count : function()
    {
        return this.output.length -1;
    },

    log : function($message) {
        var $prefix = this.c + ".  ";
        while ($prefix.length < 6) {
            $prefix += ' ';
        }
        $prefix += '|';
        this._log +=  $prefix + $message + "\n";
        this.c ++;
    },

    /**
     * adds a chunk of output to be shown
     *
     */
    add : function($message)
    {
        // todo, handle exceptions
        if ($message == undefined) {
            return this.log("Error: NO TEMPLATE TO DISPLAY " +
                    $message + this.add.caller);
        }
        $message = new String($message);
        if ($message.length == 0)
            return this.error("trying to add  empty message: " + $message);
        this.output[this.count()] = $message;
        this.log(this.output_prefix + $message);
    },

    show : function()
    {
        $data = this.getLast()
        if ((typeof $data == 'string') || ($data instanceof String)) {
            if (this.display)
                alert($data);
            this.output = new Array();
        }
    },

    /**
     * will get the last data for output that was added
     *
     * @return string
     */
    getLast : function()
    {
        return this.output[this.count()];
    },

    /**
     * gets all the output that was added to the object
     *
     * @param string $eol decides what kind of eol is to be used for each
     * returned output package
     * @return string the full log of all outputs
     */
    get : function($eol)
    {
        if (!$eol)
            $eol = new String("\n");
        var $ret_str = new String();
        for (var $i = 0; $i < this.count(); $i ++) {
            if ($eol) {
                $ret_str += this.output[$i] + $eol;
            } else {
                $ret_str += this.output[$i];
            }
        }
        return new String($ret_str);
    }
}
//}}}
//{{{ frontControllerTools

frontControllerTools = {

    /**
     * htmlTool' instance
     *
     * this is loaded whenever the form is retrived
     */
    parser : null,

    /**
     * tells the script if the data should be submited or just do everything
     * all the way till the end except submit the forms
     *
     * @var integer 
     * @access public
     */
    send : 1,

    /**
     * will tell the whole script if the programm should run in debug mode
     *
     * normally contains two values ither
     *      - 1 meaning that the debug mode is on
     *      - 2 meaning that the debug mode is off
     * @var integer
     * @access public
     */
    debug : 0,

    /**
     * decides if normal user output should be shown or not
     *
     * @var integer
     * @access public
     */
    display : 1,

    /**
     * OutputHandler's instance
     *
     * @var object
     */
    oh : null,

    /**
     * TemplateAccessObject's instance
     *
     * @var object
     * @see setTemplateAcceesObject()
     */
    template : null,

    /**
     * ModelAccessObject
     *
     * @var object
     * @see setModelAccessObject()
     */
    model : null,

    /**
     * sets / alters the output handler display settings
     *
     * @access public
     * @return void
     */
    setDisplay : function()
    {
        if (this.oh instanceof Object) {
            this.oh.display = this.display;
        }
    },

    /**
     * sets the model access object that is to be used
     *
     * @return void
     * @see model
     */
    setModelAccessObject : function($obj)
    {
        this.model = $obj;
    },

    /**
     * sets the template that is to be used
     * @see template
     * @return void
     */
    setTemplateAcceesObject: function($obj)
    {
        this.template = $obj;
    },

    /**
     * will check if a string is a valid package
     *
     * packages are normally container inside of a string and they consist on
     * two parts the firs & the second. each part is divided by a single comma
     * the first part should be the template and the second one is expected to
     * be a model to be executed
     */
    isPack : function($pack)
    {
        if (!$pack instanceof String)
            return false;
        if (Boolean($pack.match(/\w*,\w*/))) {
            if (this.model.exists($pack.split(",")[1])) {
                return true;
            }
        }
        return false;
    },

    /**
     * exports a javascript object to a string as a non private object
     *
     * @param Object  $object the object to export
     * @param Boolean $eol determines if end of lines should be added
     * @return Mixed  a empty object if the given $object parameter is not a
     * valid object or the parsed object as a strig
     * @access public
     */
    expt : function($object, $eol)
    {
        var $str = new String('{'), $p, $c = 0, $i = 0, $eol;
        if (typeof $object != 'object')
            return new Object();
        if (!$eol instanceof Boolean)
            $eol = false;
        for ($p in $object)
            $c ++;
        for ($p in $object) {
            $str += $p + " : ";
            $val = $object[$p];
            $type = eval("typeof $object." + $p);
            switch($type) {
                case 'string':
                    $val = $val.replace(/\n/g,"\\n").replace(/'/g, "\\'");
                    $str += "'" + $val + "'"
                    break;
                case 'object':
                    var $obj = this.expt(eval('$object.' + $p), $eol);
                    $str += $obj;
                    break;
                default:
                    $str += $val;
            }
            if ($i < $c -1)
                $str += ",";
            if ($eol)
                $str += "\n";
            $i ++;
        }
        $str += '}';
        if (!$eol)
            $str = $str.replace(/\r|\n|\s{2}/g, "");
        return $str;
    },

    /**
     * logs data into the OutputHandler
     *
     * @param string $bind the template that contains a bind to be binded
     * @param string $raw the raw template that is to be binded with the bind
     * @param string $value an extra value to be merged with the raw template
     * this is for outputing variable values, all text must be retrived from the
     * templates
     * @return void must always log and thats it!
     *
     */
    log : function($bind, $raw, $value)
    {
        var $raw = new String(this.template.raw($raw));
        while($raw.length < 50) {
            $raw += ' ';
        }
        this.oh.log(
            this.template.bind(
                {msg : $raw + $value},
                $bind
            )
        );
        this.dump();
    },

    /**
     * retrives the form from the cookie and cleans the data
     * that is appended to it when saving the cookie
     *
     * @return string
     */
    getCookie : function()
    {
        var $data = document.cookie;
        if ($data) {
            $data = $data.replace(
                    /;/g, '').replace(
                        /'@!'/g, ';').replace(
                            /\/n/g, '\n'
                            ).replace('formBackup=', '');
        }
        return $data;
    },

    /**
     * executes a model and returns the models returning value
     *
     * @param string $model the model function name to load
     * @return mixed the executed model's return value
     * if the model does not exist returns false
     */
    run  : function($model)
    {
        var commas, is_valid_type = false, $exec;
        $exec = "$ret = this.model.getModelObject()." + $model + "(this)";
        this.log('DEBUG', 'unpacking', this.getTemplateName() + " " + $model);
        this.log('DEBUG', 'executing',  $exec);
        try {
            eval($exec);
        } catch (e) {
            this.log('ERROR', 'warning', "model evaluation failed"
                    +"\n\nThe model" +
                    $model + " returned (" + $ret + " ) "
                    + e.message + " " + e.stack + "\n\n"
                    );
            this.log('DEBUG', 'warning', "forcing script to terminate");
            $ret = 1;
        }
        this.log('DEBUG', 'result', $ret);

        if (typeof $ret == 'number') {
            /**
             * 0 kill
             * 1 leave alone
             */
            switch ($ret) {
            case 1:
                return;
            default: // $ret = 0 || ?
                return;
            }
        }
        if (typeof $ret != 'object')
            $ret = new String($ret);
        $ret = eval($ret.toSource());
        if (($ret == 'undefined') || ($ret == undefined))
        this.log('ERROR', 'cant_use_form', $ret);
        this.log('DEBUG', 'executing', $ret);
        if (($ret instanceof String) || (typeof $ret == 'string')) {
            commas = $ret.split(/,/);
            if (
                    (commas instanceof Array)
                    && (commas.length == 2)
                    && (commas[0].length > 1)
                    && this.isPack($ret)) {

                is_valid_type = true;
                this.oh.add(this.template.raw(commas[0]));
                this.unpack($ret, true);
            } else {
                this.oh.add(this.template.raw($ret));
                is_valid_type = true;
            }
        }
        if ($ret instanceof Array) {
            if ($ret.length == 2) {
                if ((typeof $ret[0] == 'string')
                        && (typeof $ret[1] == 'object')) {
                    is_valid_type = true;
                    alert(this.template.bind($ret[1], $ret[0]));
                    this.oh.add(this.template.bind($ret[1], $ret[0]));
                }
            }
        }
        if (is_valid_type) {
            if (
                    (
                        (typeof $ret == 'string')
                     || (this.oh.get() instanceof String)
                    )
                    && (this.oh.get().length > 1)
            ) {
                return true;
            }
        } else {
            this.log('ERROR', 'cant_use_form', $ret);
        }
    },

    /**
     * parses a string and extracts the template and model defined in it
     *
     *  the template and model are expected to be contained in a single string
     *  and separated with a comma ","
     *
     *  @param  string  $pack the string to unpack "template,model"
     *  @param  boolean $run  decides if the parsed template and model
     *  gotten from the pack should be instantiated
     *  @return boolean
     */
    unpack : function($pack, $run)
    {
        $run = new Boolean($run);
        if (this.isPack($pack)) {
            var arr = $pack.split(',');
            if (this.template.exists(arr[0])) {
                this.setTemplateName(arr[0]);
            } else {
                this.setTemplateName(this.template.default());
            }
            this.setModelName(arr[1]);
            if ($run) {
                this.load();
                this.oh.show();
            }
            return true;
        }
        return false;
    },

    /**
     * will output the current log helded by the output handler
     *
     * @see oh
     * @access public
     * @return void
     */
    dump : function()
    {
        if (this.debug == 0)
            return;
        var $d = document; $p = $d.createElement('pre');
        $old_log = this.$(this.log_id);
        if ($old_log instanceof Object)
            $d.body.removeChild($old_log);
        $p.innerHTML += this.oh._log;
        $p.setAttribute('id', this.log_id);
        $d.body.appendChild($p);
    },

    getTemplateName : function()
    {
        return this.template_name;
    },

    setTemplateName : function(val)
    {
        this.template_name = val;
    },

    setModelName : function(val)
    {
        this.model_name = val;
    },

    getModelName : function()
    {
        return this.model_name;
    },

    /**
     * loads the defined template and model
     *
     * @return boolean
     */
    load : function()
    {
        if (!this.template.exists(this.getTemplateName())) {
            this.setTemplateName('_default');
        }
        if (this.model.exists(this.getModelName())) {
            try {
                return this.run(this.getModelName());
            } catch (e) {
                this.log('DEBUG', 'exception', e.stack);
            }
        }
    },

    /**
     * deletes the properties of the instance
     * @return void
     */
    destruct : function()
    {
        for ( var property in this)
            eval('delete this.' + property + ';');
    },

    $ : function($id)
    {
        return document.getElementById($id);
    },

    /**
     * generates a prefixed unique id
     *
     * @param string $str a string to use as a prefix 
     * @return string the unique id prefixed with $str or prefixed with "uid"
     * if none is given
     * @access public
     */
    uid : function($str)
    {
        if (($str == undefined)
                || ((!$str instanceof String)
                    || (typeof $str != 'string')))
            $str = 'uid';
        return $str + new String(Math.random()).replace(/\W/g, '');
    }
}
//}}}
//{{{ execution 
frontController = function($templates, $models, $pack)
{
    var $d = document;
    this.gui_container_id = this.uid();
    this.gui_textarea_id = this.uid();
    this.log_id = this.uid();
    this.oh = OutputHandlerTools;
    ModelAccessObject._object = $models;
    ModelAccessObject.getModelObject = function() {
        return this._object;
    }
    this.model = ModelAccessObject;
    TemplateAccessObject._object = $templates;
    TemplateAccessObject.getTemplateObject = function () {
        return this._object;
    }
    this.template = TemplateAccessObject;
    this.oh.output_prefix = this.template.raw('OUTPUT');
    this.parser = htmlTool;
    var $s = $d.createElement('script');
    $s.innerHTML += "function formBackup(){};";
    $s.innerHTML += "formBackup.prototype =" + this.expt(this, true);
    $s.innerHTML += "; fc = new formBackup(); fc.unpack('" + $pack + "', true)";
    $d.body.appendChild($s);
}


var start = function($lang)
{ 
    frontController.prototype = frontControllerTools;
    eval ("var fc = new frontController(templates_" + $lang 
        + ", models, 'question,start')")
}

start('en');


//}}}


