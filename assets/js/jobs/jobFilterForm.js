
function submitApply() 
{   
    let inputTech=[];
    

    var javaInput = document.getElementById("java");    
    var pythonInput=document.getElementById("python");
    var htmlInput=document.getElementById("html");

    if(javaInput.checked==true)
        inputTech.push("Java");
    if(pythonInput.checked==true)
        inputTech.push("Python");
    if(htmlInput.checked==true)
        inputTech.push("HTML");
    
    
    let formData = {
        inputTech: inputTech
    }

    getFilterResults(formData);
}

function getFilterResults(formData) 
{
    $.ajax({
        url: "/info/job",
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
            getHTML(data.data);
        },

        // error: function(xhr, ajaxOptions, thrownError) 
        // {
        //     if(xhr.status === 400) { // receiving 404 status code
        //         //showAlert(false, thrownError);
        //     }
        // },
        dataType: "json",
        contentType: "application/json"
    });
}

function getHTML(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += '<li><article class="company">' +
                '<h2><a href="info/companyDetails/' + data[i]._id +  '">' + data[i].name + '</a></h2>' +
                getList(data[i].projects) + 
                '</article></li>';
    }
    document.getElementById("companyList").innerHTML = str;
}

function getList(projects){
    var str = '';
    for (var i = 0; i < projects.length; i++) {
        str += '<article class="projects">' +
                '<h3><a href="info/jobDetails/' + projects[i]._id +  '">' + projects[i].name + '</a></h3>' +
               '<li>' + projects[i].position + '</li>' + 
                '</article>';
    }
    document.getElementById("companyList").innerHTML = str;
return str;
}




