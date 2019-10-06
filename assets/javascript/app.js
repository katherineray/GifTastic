$(document).ready(function)  {

    var animals = ["aardvark", "bird", "cat", "dog", "elephant", "fox", "giraffe", "horse", "impala", "jaguar", "kangaroo", "lemur", "manatee", "numbat", "octopus", "penguin", "quokka", "red panda", "sea lion", "tapir", "uakari", "vervet monkey", "wallaby", "zebra"];

    
// Create function to make buttons to be added to page
function createButtons(arrayToUse, classToAdd, areaToAddTo) {
   $(areaToAddTo).empty();

   for (var i = 0; i < arrayToUse.length; i++) {
    var a = $("<button>")
    a.addClass(classToAdd); //<button id="anything" data-type='dog'></button>
    a.attr("data-type", arrayToUse[i]); //<button text='dog'id="anything" data-type'dog'></button>
    a.text(arrayToUse).append(a);
   }
}

$(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");
    
    var type = $(this).attr("data-type"); //aardvark, cat, dog
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=h6u0TjDm9AQ9JtEWGR9EwWY8kYcOTLgt"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            var results = response.data;
            console.log(results)

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class=\"animal-item\">);

                var rating = results[i].rating;

                var p = $("p").text("Rating:  " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var animalImage = $("<img>");
                animalImage.attr("src", still); // <img src= "https://media2.giphy.com......gif"> 
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated); // <img data-animate=" url "></img>
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#animals").append(animalDiv);
            }
        });
});

$(document).on("click", ".animal-image", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("input").eq(0).val();

        if (newAnimal.length > 2) {
            animals.push(newAnimal);
        }

        populateButtons(animals, "animal-button", "#animal-buttons");
    });

    populateButtons(animals, "animal-button", "#animal-buttons");

}