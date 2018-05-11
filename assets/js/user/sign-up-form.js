
//
$(document).ready(function() {
    $("#signup-btn").on('click', function() {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const form = $("#signup-form");
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const cPassword = $("#confirm-password").val();

        var message = "";
        if (username.length > 0 && username.length <= 10) {
            if (email.length > 0) {
                if (regex.test(email)) {
                    if (password.length > 0 && password.length == 8) {
                        if (cPassword.length > 0) {
                            if (password === cPassword) {
                                const formData = {
                                    username: username,
                                    email: email,
                                    password: password
                                }
                                submitSignupForm(formData);
                            } else {
                                message = "Passwords does not match!";
                            }    
                        } else {
                            message = "Please retype the password in confirm password field!";
                        }
                    } else {
                        message = "Please provide a valid password!";
                    }
                } else {
                    message = "Invalid email address!";
                }
            } else {
                message = "Please provide an email id!";
            }
        } else {
            message = "Invalid username! Username could have maximum 10 letters.";
        }
    });
});

function submitSignupForm(formData) {
    $.ajax({
        url: "/user/sign-up",
        type: "post",
        dataType: "json",
        data: JSON.stringify(formData),
        success: function(data) {
            $("#alert").addClass("alert-success");
            $("#alert-msg").html("Account successfully created");
            setTimeout(() => {
                window.location.href = '/user/dashboard'
            }, 600);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            $("#alert").addClass("alert-error");
            if(xhr.status === 400) { // receiving 404 status code
                $("#error-login-message").html(xhr.message);
            }
        },
        contentType: "application/json"
    });
}