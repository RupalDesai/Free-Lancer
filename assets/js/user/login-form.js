//
$(document).ready(function() {
    $("#login-btn").on('click', function() {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const form = $("#login-form");
        const email = $("#email").val();
        const password = $("#password").val();

        var message = "";
        
        if (email.length > 0) {
            if (regex.test(email)) {
                if (password.length > 0 && password.length == 8) {
                    const formData = {
                        email: email,
                        password: password
                    }
                    submitLoginForm(formData);    
                } else {
                    message = "Please provide a valid password!";
                }
            } else {
                message = "Invalid email address!";
            }
        } else {
            message = "Please provide an email id!";
        }  
    });
});

function submitLoginForm(formData) {
    $.ajax({
        url: "/user/login",
        type: "post",
        dataType: "json",
        data: JSON.stringify(formData),
        success: function(data) {
            $("#alert").addClass("alert-success");
            $("#alert-msg").html("Successfully logged in");
            setTimeout(() => {
                window.location.href = '/user/dashboard'
            }, 600);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#alert").addClass("alert-error");
            if(xhr.status === 400) {
                $("#alert-msg").html(xhr.message);
            }
        },
        contentType: "application/json"
    });
}