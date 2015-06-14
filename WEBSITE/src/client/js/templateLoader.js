$(document).ready(basic_load);

// Funciton that loads the template in the html page.
function basic_load(){
    $("#nav").load("header.html");
    $("footer").load("footer.html");
}