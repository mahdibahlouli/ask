/** 
* Defaults for Validator, to fit in with Twitter Bootstrap CSS
*/
var formSubmitting = false;
jQuery.validator.setDefaults({

		errorElement: "span",
		errorClass: "help-inline",

		errorPlacement: function(error, element) {
			if (element.parent().nextAll('.error-container').length > 0) {
				element.parent().nextAll('.error-container').append(error);
			} else if (element.parent().find('.error-container').length > 0) {
				element.parent().find('.error-container').append(error);
			} else {
				var errorContainer = $('#' + error.attr('id') + '-container');
				if (errorContainer.length > 0) {
					error.appendTo(errorContainer);
				} else {
					error.insertAfter(element);
				}
			}
		},	 
    	
    	highlight: function(element, errorClass) {
   			$(element).parents('.control-group').addClass('error');
 		},

 		unhighlight: function(element, errorClass) {
 			$(element).parents('.control-group').removeClass('error');
 		}

 		,submitHandler: function(form) {
			if(formSubmitting) {
				return;
			}
			formSubmitting = true;
			$(".submit-loader").addClass('active');
			form.submit();
		}
});

/** 
* Extra Validator Methods
*/

//Match password2 field with password1
$.validator.addMethod("password_match", function(e) { 		
	return e == $("#password1").val();
}, oMyAccountTranslator.trans('js.same_value'));
jQuery.validator.classRuleSettings.passwordMatch = { password_match: true };

//MAC Address Validator

$.validator.addMethod("mac_address", function(value, element) {
	var re = /^([0-9A-F]{2}\:){5}[0-9A-F]{2}$|^([0-9A-F]{2}\-){5}[0-9A-F]{2}$|^([0-9A-F]{2}\ ){5}[0-9A-F]{2}$|^[0-9A-F]{12}$/i;
	return re.test(value);

}, oMyAccountTranslator.trans('js.invalid_mac'));
jQuery.validator.classRuleSettings.MACAddress = { mac_address: true };




