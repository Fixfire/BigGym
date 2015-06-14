$(document).ready(documentReady);

var ordering;
function documentReady(){
    console.log("I'm ready");
    loadCategories();
}


// Funciton that loads all the elements of the Categories page.
function loadCategories(){

    console.log("Loading categories");
    
    document.title="All courses categories";
    
    $.ajax({
        method: "POST",
        crossDomain: true, 
        url: "http://bigbiggym.altervista.org/server/getAllCourseCategories.php", 
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
                el += "<img class=\"img-hover img-responsive\" src=\"images/" + categories[i].Name + "/main.jpg\"  height=\"300\" width=\"300\" >";
                el += "</a>";
                el += "</div>";
                el += "</div>";
                el += "<hr>";

            }
           
            console.log(el);
            $("#categoryList").html(el);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}


  




