//SETTING URL
const deployedURL = null;
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $container = $('.container');
const $addinput = $('#submit')
const $openForm= $('.fetch');
const $editButton = $('#edit');
const $del = $('#del');

////FUNCTIONS
const getData = async () =>{
    //  API CALL
    ///////////////
    const response = await fetch(`${URL}/art`);
    const data = await response.json();
    //Populate Container with images
    
    data.forEach((piece) => {
    const $link = $('<a>').attr('href', '#exampleModal').attr('data-toggle', 'modal')
    const $image = $('<img>').attr('src', piece.url);
    $link.append($image);
    $link.on('click', () => fillModal(piece));
    $container.append($link);
    });
};
//  DISPLAY IMAGES WITH NO FILTER FOR HOMEPAGE
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

////  ADD ART

$openForm.on('click', () => openForm())
const openForm = () =>{
    $('#choice').toggle(700);
    
};
//Make fields appear

const getOptions = (choice) =>{
    $('.input-group').css('display', 'none')

    if(choice == 'Comic'){
        $('#dDiv').toggle(700);
        $('#nDiv').toggle(700);
        $('#mDiv').toggle(700);
        $('#uDiv').toggle(700);
        $('#pDiv').toggle(700);
        $('#submit').toggle(700);
    }
    else if(choice == 'Illustration'){
        $('#dDiv').toggle(700);
        $('#nDiv').toggle(700);
        $('#mDiv').toggle(700);
        $('#uDiv').toggle(700);
        $('#cDiv').toggle(700);
        $('#submit').toggle(700);
    }
    else{
        $('#dDiv').toggle(700);
        $('#nDiv').toggle(700);
        $('#mDiv').toggle(700);
        $('#uDiv').toggle(700);
        $('#submit').toggle(700);
    };
   
}

$('select#choice').on('change', () => {
    x = $('#choice').val();
    getOptions(x);
});

//COLLECT DATA FROM CREATE FORM

$addinput.on('click', () => createArt());

const createArt = async () => {
    x = $('#choice').val();
    let newArt =''
    if(x == 'Illustration'){
        newArt ={
            name: $('#name').val(),
            medium: $('#medium').val(),
            artType: x,
            description: $('#description').val(),
            url: $('#url').val(),
            context: $('#context').val()

        }
    }
    else if (x == 'Comic'){
        newArt ={
            name: $('#name').val(),
            medium: $('#medium').val(),
            description: $('#description').val(),
            url: $('#url').val(),
            page: $('#page').val(),
            genre: $('#genre').val()
        }
    }
    else {
        newArt ={
            name: $('#name').val(),
            medium: $('#medium').val(),
            description: $('#description').val(),
            url: $('#url').val()
        }
    }
//SEND REQUEST TO API  
    console.log(newArt)
}





/////////////////////////////////
getData();