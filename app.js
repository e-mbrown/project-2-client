//SETTING URL
const deployedURL = null;
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $container = $('.container');
const $addinput = $('#fetch');
const $editButton = $('#edit');
const $del = $('#del');

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
    $link.append($image);
    $link.on('click', () => fillModal(piece));
    $container.append($link);
    });
};

const fillModal = (imageData) => {
    $('#info').empty();
    $('#img').empty();
    $('#exampleModalLabel').text(imageData.name);
    const $img = $('<img>').attr('src', imageData.url).attr('id', 'imgM');
    const $description = $('<p>')
    // Populate based on type of image
        if(imageData.artType == 'Sketch'){
            $description.text(`${imageData.description}. It's made using ${imageData.medium}.`);
        }
        else if(imageData.artType == 'Comic'){
            $description.text(`${imageData.description}. It's made using ${imageData.medium} and is in the ${imageData.genre} genre. This is page ${imageData.page}`);
        }
        else{
            $description.text(`${imageData.description}. It's made using ${imageData.medium} and is in the ${imageData.genre} genre.`);
            const $context = $('<h3>').text(imageData.context)
            $('#info').append($context)
        }
    const $extra = $('<p>').text(`This was added on ${imageData.createdAt} and updated ${imageData.__v} times.`)
    $('#info').append($description, $extra);
    $('#img').append($img);

};

getData();