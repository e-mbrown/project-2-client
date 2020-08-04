//SETTING URL
const deployedURL = null;
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
const $container = $('.container');
const $addinput = $('#submit')
const $openForm= $('.fetch');
const $editButton = $('.edit');
const $del = $('.del');
const $editSubmit = $('.editSubmit')


////FUNCTIONS
const getData = async () =>{
    //  API CALL
    ///////////////
    const response = await fetch(`${URL}/art`);
    const data = await response.json();
    //Populate Container with images
    
    data.forEach((piece) => {
    const $link = $('<a>').attr('href', '#exampleModal').attr('data-toggle', 'modal');
    const $image = $('<img>').attr('src', piece.url);
    $link.append($image);
    $link.on('click', () => fillModal(piece));
    $container.prepend($link);
    });
};
//  FILL MODAL
const fillModal = (imageData) => {
    // Refreshes Modal
    $('#info').empty();
    $('#img').empty();
    $('.input-group').css('display', 'none');
    $editSubmit.css('display', 'none')
    $('.form-control').val('');
    
    $('#exampleModalLabel').text(imageData.name);
    const $img = $('<img>').attr('src', imageData.url).attr('id', 'imgM').attr('class', imageData.artType);
    const $description = $('<p>')
    //DELETE ID
    $del.attr('id', `${imageData._id}`)
    $del.on('click', deleteArt);
    // SUBMIT EDIT BUTTON ID
    
    $editSubmit.attr('id',`${imageData._id}`)
    const id = $editSubmit.attr('id')
    $editSubmit.on('click', (id) => updateArt(id))

    // POPULATE MODAL BASED ON IMAGE TYPE
        if(imageData.artType == 'Sketch'){
            $description.text(`${imageData.description}. It's made using ${imageData.medium}.`);
        }
        else if(imageData.artType == 'Comic'){
            $description.text(`${imageData.description}. It's made using ${imageData.medium} and is in the ${imageData.genre} genre. This is page ${imageData.page}`);
        }
        else{
            $description.text(`${imageData.description}. It's made using ${imageData.medium}.`);
            const $context = $('<h3>').text(imageData.context)
            $('#info').append($context)
        }
    const $extra = $('<p>').text(`This was added on ${imageData.createdAt} and updated ${imageData.__v} times.`)
    $('#info').append($description, $extra);
    $('#img').append($img);

};

////  ADD ART
///////////////////////

$openForm.on('click', () => openForm())
const openForm = () =>{
    $('#choice').toggle(700);
    
};
//Make fields appear for add

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
            artType: x,
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
            artType: x,
            description: $('#description').val(),
            url: $('#url').val()
        }
    }
    //SEND REQUEST TO API  
    const response = await fetch(`${URL}/art`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newArt)
    });
    // Update DOM
    $container.empty();
    getData();
}
//  DELETE ART
///////////////////////////

const deleteArt = async (event) => {
    //REQUEST
   const response = await fetch(`${URL}/art/${event.target.id}`, {
     method: "delete"
   })
   // Update DOM
    $container.empty();
    getData();  
}
///Update Art
///////////////////
$editButton.on('click', (event) => editForm(event))
const id = `${$editSubmit.attr('id')}`
//Make Update Form appear
const editForm = (event) =>{
    const choice =(`${$('#imgM').attr('class')}`)
    $('#edDiv').toggle(700);
    $('#enDiv').toggle(700);
    $('#emDiv').toggle(700);
    $editSubmit.toggle(700);
    if(choice == 'Comic'){
        $('#euDiv').toggle(700);
        $('#epDiv').toggle(700);
    }
    else if(choice == 'Illustration'){
        $('#euDiv').toggle(700);
        $('#ecDiv').toggle(700);
    }
    else{
        $('#euDiv').toggle(700);
    };
    $('#editUrl').val(`${$('#imgM').attr('src')}`)
}


const updateArt = async(id) =>{
    //create updatedArt
    let updatedArt = ''
    let y = ''
    let link =$('#editUrl').val()
    let x = `${$('#imgM').attr('class')}`;
    console.log(x)
    if(x == 'Illustration'){
        y = "illust"
        updatedArt ={
            _id: id.target.id,
            name: $('#editName').val(),
            medium: $('#editMedium').val(),
            artType: x,
            description: $('#editDes').val(),
            url: link,
            context: $('#editContext').val()
            
        }
    }
    else if (x == 'Comic'){
        y = 'comic'
        updatedArt ={
            _id: id.target.id,
            artType: x,
            name: $('#editName').val(),
            medium: $('#editMedium').val(),
            description: $('#editDes').val(),
            url: $('#editUrl').val(),
            page: $('#editPage').val(),
            genre: $('#editGenre').val()
        }
    }
    else {
        y = 'sketch'
        updatedArt ={
            _id: id.target.id,
            artType: x,
            name: $('#editName').val(),
            medium: $('#editMedium').val(),
            description: $('#editDes').val(),
            url: $('#editUrl').val()
        }
    }
        //put request
    const response = 
    await fetch(`${URL}/art/${y}/${id.target.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedArt)
    });
    // Update DOM
    $container.empty();
    getData(); 
}


/////////////////////////////////
getData()