var myaccount = myaccount || {};

myaccount.confirmDialog = (function () {
    var confirmAction;
    var confirmCallbackOptions = {};

    function setupModalTriggers()
    {
        $('a[data-method="confirm"], input[data-method="confirm"]').on('click', function (e) {
            e.preventDefault();
            setAction(e.currentTarget.href);
            setText($(this).attr("data-message"));
            show();
        });
    }

    function setText(text) {
        $('#confirm-modal .modal-body').text(text);
    }

    function show() {
        $('#confirm-modal').modal('show');
    }

    function setAction(action) {
        confirmAction = action;
    }

    function setUpModalButtons(options)
    {
        $('#confirm-modal .btn').on('click', function (e) {
            $('#confirm-modal').modal('hide');
        });

        $('#confirm-modal .btn-primary').on('click', function (e) {
            $('#confirm-modal').modal('hide');
            if (typeof confirmAction === 'function') {
                confirmAction(confirmCallbackOptions);
            } else if (typeof confirmAction !== 'undefined') {
                window.location = confirmAction;
            }
        });
    }

    return {
        init: function () {
            setupModalTriggers();
            setUpModalButtons();
        },

        create: function(text, options, action) {
            confirmCallbackOptions = options;
            setAction(action);
            setText(text);
            setUpModalButtons();
            show();
        }
    }
})();