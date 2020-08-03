//SETTING URL
const deployedURL = null;
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $container = $('.container')
const $addinput = $('#fetch')

////FUNCTIONS
const getData = async () =>{
    //API CALL
    const response = await fetch(`${URL}/art`);
    const data = await response.json();
 console.log(data)
    //Populate Container with images
    data.forEach((piece) => {
    console.log(piece.name)
    
//    Set up and place for Gallery
    const $link = $('<a>').attr('href', '#exampleModal').attr('data-toggle', 'modal')
    const $image = $('<img>').attr('src', piece.url);
    $link.append($image)
    $container.append($link);

// Populate modal uniquely
        
    });
};

getData();