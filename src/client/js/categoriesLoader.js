$(document).ready(documentReady);

var ordering;
function documentReady(){
    console.log("I'm ready");
    loadCategories();
}


function getPath(name) {
    name = name.replace(" ", "");
    return name;
}

function loadCategories(){

    console.log("Loading categories");
    
    document.title="All courses categories";
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getAllCourseCategories.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var categories = JSON.parse(response);
            var el = "";
            for (var i=0; i<categories.length; i++) {
                
                el+= "<div class=\"row\">";
            
                
                el += "<div class=\"col-md-7\" id=\"categoryDetail\">";
                el += "<h3>" + categories[i].Name + "</h3>"
                el += "<p >" + categories[i].ShortDescription + "</p>";
                el += "<a class=\"btn \" id=\"std-btn\" href=\"#\">More Info</a>";
                el += "<a class=\"btn second-btn\" id=\"std-btn\" href=\"coursesbycategory.html?cat=" + categories[i].Name + "\">Courses</a>";
                el += "</div>";
                el += "<div class=\"col-md-5\">";
                el += "<a href=\"#\">";
                var path = getPath(categories[i].Name);
                el += "<img class=\"img-hover img-responsive\" src=\"images/" + path + "/main.jpg\"  height=\"300\" width=\"300\" >";
                el += "</a>";
                el += "</div>";
                el += "</div>";
                el += "<hr>";

            }
           
            console.log(el);
            $("#categoryList").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}


  




