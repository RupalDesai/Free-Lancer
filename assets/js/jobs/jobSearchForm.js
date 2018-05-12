
function searchListJob() 
{   
    var searchIn = document.getElementById("searchInput").value;    
   
   //alert(searchIn);
    
   let formData = {
    inputTech: searchIn
}

    getSearchResults(formData);
   
}


function getSearchResults(formData) 
{
    console.log("formData is ",formData)
    $.ajax({
        url: "/info/job/job2",
        type: "POST",
        data: JSON.stringify(formData),
        success: function(data) {
            getHTML(data.data);
        },

        error: function(xhr, ajaxOptions, thrownError) 
        {
            if(xhr.status === 400) { // receiving 404 status code
                showAlert(false, thrownError);
            }
        },
        dataType: "json",
        contentType: "application/json"
    });
}

function getHTML(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += '<li><article class="company">' +
                '<h2><a href="/info/companyDetails/' + data[i].name + '">' + data[i].name + '</a></h2>' +
                getList(data[i].projects) + 
                '</article></li>';
    }
    document.getElementById("companyList").innerHTML = str;
}

function getList(projects) {
    var str = '';
    for (var i = 0; i < projects.length; i++) {
        str += '<h2><a href="/info/jobDetails/' + projects[i]._id +'>'+ projects[i].position + '</a></h2>';
    }
    return str;
}


