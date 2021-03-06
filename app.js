//SETTING URL
const deployedURL ='https://imagerebs.herokuapp.com';
const URL = deployedURL ? deployedURL : "http://localhost:3000";

console.log(URL)

//GLOBAL VARIABLES
const $container = $('.container');
const $addinput = $('#submit')
const $openForm= $('.fetch');
const $editButton = $('.edit');
const $del = $('.del');
const $editSubmit = $('.editSubmit')

////FUNCTIONS
// Recycled hamburger code
const $menuBtn = $('.menub')
let menuOpen = false;
$($menuBtn).on('click', () =>{
    if(!menuOpen) {
        $menuBtn.attr('class', 'menub open')
        menuOpen = true;
        display()
    }else {
        $menuBtn.attr('class', 'menub')
        menuOpen = false;
        hide()
    }
})

const display = function (){
    $('#a, #i, #c, #s, #h ').show()
}
const hide = function(){
    $('#a, #i, #c, #s, #h ').hide()
}



/// fetch request
const getData = async () =>{
    //  API CALL
    ///////////////
    const response = await fetch(`${URL}/art`);
    const data = await response.json();
    console.log(data)
    //Populate Container with images
    
    data.forEach((piece) => {
    const $link = $('<a>').attr('href', '#exampleModal').attr('data-toggle', 'modal').attr('class', piece.artType);
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
   //   Refresh modal
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
    $('#submit').css('display', 'none')


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
// Captures select value to use to determine schema
$('select#choice').on('change', () => {
    x = $('#choice').val();
    getOptions(x);
});

//COLLECT DATA FROM CREATE FORM

$addinput.on('click', (event) => {
    event.preventDefault()
    createArt($('#url').attr('responseurl'))
});
//Multer Upload
const getUrl = async (event) => {
    let data = new FormData();
    data.append('file', $('#url')[0].files[0])
    
    console.log(data)
    let response = await fetch(`${URL}/api/upload`, {
        method: "post",
        body: data
    });
    let results = await response.json();
    createArt( await results);
}

// CREATE
const createArt = async (url) => {
    x = $('#choice').val();
    let newArt =''
    let uploaded = url;
    console.log(uploaded)
    if(x == 'Illustration'){
        newArt ={
            name: $('#name').val(),
            medium: $('#medium').val(),
            artType: x,
            description: $('#description').val(),
            url: uploaded,
            context: $('#context').val()

        }
    }
    else if (x == 'Comic'){
        newArt ={
            name: $('#name').val(),
            medium: $('#medium').val(),
            artType: x,
            description: $('#description').val(),
            url: uploaded,
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
            url: uploaded
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
/// Change gallery
$('#h').on('click', () => filter('Home'))
$('#c').on('click', () => filter('Comic'))
$('#i').on('click', () => filter('Illustration'))
$('#s').on('click', () => filter('Sketch'))
//$('#a').on('click', () => filter())

// Primitive filter feature sorts images on click

const filter = (num) =>{
    if(num == "Home") {
        $('.Comic').css('display', 'inline')
        $('.Illustration').css('display', 'inline')
        $('.Sketch').css('display', 'inline')
    }
    else{
        if(num == 'Comic'){
            $('.Comic').css('display', 'inline')
            $('.Illustration').css('display', 'none')
            $('.Sketch').css('display', 'none')
            console.log('comic click')
        }
        if(num == 'Illustration'){
            $('.Illustration').css('display', 'inline')
            $('.Comic').css('display', 'none')
            $('.Sketch').css('display', 'none')
        }
        if(num == 'Sketch'){
            $('.Sketch').css('display', 'inline')
            $('.Comic').css('display', 'none')
            $('.Illustration').css('display', 'none')
        }
    }
}


/////// Media query watcher
let x = window.matchMedia('(max-width: 790px)')

const mediaQ = () => {
    console.log($('body').width())
    if(x.matches){
        $('#media').removeClass('col')
        $('#media').addClass('col-12')
        $('#media2').removeClass('col-9')
        $('#media2').addClass('col-12')
    }
    else{
        $('#media').removeClass('col-12')
        $('#media').addClass('col')
        $('#media2').removeClass('col-12')
        $('#media2').addClass('col-9')
    }
}
mediaQ(x)
x.addListener(mediaQ)
/////////// AWS Set up

$('#url').on('change', () =>{
    const files = $('#url')[0].files;
    const file = files[0];
    if(file == null){
        return alert('No file selected.');
    }
    getSignedRequest(file);
    }
)
//// AWS signed url, a sort of permissions thing
const getSignedRequest = (file) =>{
    const files = file;
    console.log(files)
    const xml = new XMLHttpRequest();
    xml.open('GET', `${URL}/sign-s3?file-name=${encodeURIComponent(files.name)}&file-type=${encodeURIComponent(files.type)}`);
    xml.onreadystatechange = () => {
        if(xml.readyState === 4) {
            if(xml.status === 200){
                const response = JSON.parse(xml.responseText);
                uploadAWS(file, response.signedRequest, response.url);
                //captures url so it can be stored in the database later
                $('#url').attr('responseUrl',response.url)
            }
            else{
                alert('Could not get signed URL.')
            }
        }
    };
    console.log(xml)
    xml.send(file)
}
//// Actually sends file to my bucket
const uploadAWS = (file, signedRequest, url) =>{
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                // $('#name').val()= url
                console.log('Sucess')
            }
            else{
                alert('could not upload file.');
            }
        }
    };
    xhr.send(file)
}
/////////////////////////////////
getData()