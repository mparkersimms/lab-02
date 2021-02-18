const pageOneArray = [];
const pageTwoArray = [];


function HornsPicture(desc, horns, url, keyword, title) {
    this.description = desc;
    this.horns = horns;
    this.url = url;
    this.keyword = keyword;
    this.title = title;
    HornsPicture.allHornsPics.push(this);
}
HornsPicture.allHornsPics = [];

console.log(HornsPicture.allHornsPics);

function renderImages() {    
    console.log('test');
    console.log(HornsPicture.allHornsPics);
    HornsPicture.allHornsPics.forEach( value => {
        console.log(value);
        const $divCopy = $('div:first-child').clone();
        $divCopy.find('h2').text(value.title);
        $divCopy.find('img').attr('src', value.url);
        $divCopy.find('p').text(value.description);
        $divCopy.attr('id', value.title);
        $divCopy.find('h3').text(value.keyword);
        $('main').append($divCopy);
    });
}
function renderWithMustache () {
    HornsPicture.allHornsPics.forEach( value => {
        const divHtmlElement = $('#template').html();
        const outputFromMustache = Mustache.render(divHtmlElement, value);

        $('main').append(outputFromMustache);
    });
}



function renderDropdown() {
    // $('select').append('<option>filterByKeyword</option>');
    
    console.log(HornsPicture.allHornsPics);
    HornsPicture.allHornsPics.forEach(value => {
        console.log('test3');
        if ($(`select:contains(${value.keyword})`).length === 0) {
            console.log($(`select:contains(${value.keyword})`).length);
            $('select').append(`<option value = "${value.keyword}">${value.keyword}</option>`);
        }
        // $('option').attr('value',value.keyword);
    });
}

function buildPage(arr) {
    // $('main').empty();
    console.log('test2');
    console.log(pageOneArray);
    arr.forEach(value => {
        new HornsPicture (value.description, value.horns, value.image_url, value.keyword, value.title);
    });
    renderWithMustache();
    // renderImages();
    renderDropdown();
}


// buildPage(pageOneArray);
// console.log(pageOneArray);

$.ajax('data/page-1.json').then(callbackFunction);
$.ajax('data/page-2.json').then(callbackFunction2);

function callbackFunction(jsonArray) {

    console.log(jsonArray);
    jsonArray.forEach(value => pageOneArray.push(value));
    // pageOneArray.forEach(function (hornsObject) {
    //     new HornsPicture(hornsObject.description, hornsObject.horns, hornsObject.image_url, hornsObject.keyword, hornsObject.title);
    // });
    console.log(HornsPicture.allHornsPics);
    // buildPage(pageOneArray);
}

function callbackFunction2(jsonArray) {
    
    console.log(jsonArray);
    jsonArray.forEach(value => pageTwoArray.push(value));
}

$('#page-1').on('click', function(){
    console.log('you clicked a button');
    buildPage(pageOneArray);
});
$('#page-2').on('click', function(){
    console.log('you clicked a button');
    buildPage(pageTwoArray);
});



// HornsPicture.allHornsPics.forEach(value => value.renderDropdown());
// renderDropdown();


// function callbackFunction2(jsonArray2) {

//     console.log(jsonArray2);

//     jsonArray2.forEach(function (hornsObject) {
//         new HornsPicture(hornsObject.description, hornsObject.horns, hornsObject.image_url, hornsObject.keyword, hornsObject.title);
//     });

//     HornsPicture.allHornsPics.forEach(value => value.renderImages());
//     // HornsPicture.allHornsPics.forEach(value => value.renderDropdown());
//     // renderDropdown();
//     renderDropdown();
// }

$('select').on('change', function (event) {
    $('div').hide();
    console.log(event.target.value);
    $('div:contains(' + event.target.value + ')').show();
    console.log((event.target.value).typeOf);
});


console.log($('h1').text());

console.log($.ajax('data/page-1.json'));


const sortFunction = (arr) => { 
    console.log('tried to sort');
    arr.sort((a,b) => {
        if (a.horns > b.horns){
            return 1;
        }else if (a.horns < b.horns) {
            return -1;
        }else {
            return 0;
        }
    });
    console.log(arr)
    buildPage(arr);
    return arr;
};
$('#sort').on('click', function(){
    console.log('you clicked sort');
    sortFunction(HornsPicture.allHornsPics);
});
