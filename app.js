//SETTING URL
const deployedURL = null;
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $container = $('.container')
const $addinput = $('#fetch')

////FUNCTIONS
const getData = async () =>{
    //API CALL
    ///////////////
    const response = await fetch(`${URL}/art`);
    const data = await response.json();
    //Populate Container with images
    ///////////////////////////////
    data.forEach((piece) => {
    const $link = $('<a>').attr('href', '#exampleModal').attr('data-toggle', 'modal')
    const $image = $('<img>').attr('src', piece.url);
    $link.append($image)
    $link.on('click', () => fillModal(piece))
    $container.append($link);
    });
};

const fillModal = (imageData) => {
    $('#exampleModalLabel').text(imageData.name)
    
    console.log(imageData)
};

getData();