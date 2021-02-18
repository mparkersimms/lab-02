function buildPage (arr) {
    arr.forEach (value) {
        new HornsPicture (value.description, value.horns, value.url, value.keyword, value.title)
        
    };
}






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

HornsPicture.prototype.renderImages = function () {

    const $divCopy = $('div:first-child').clone();

    $divCopy.find('h2').text(this.title);
    $divCopy.find('img').attr('src', this.url);
    $divCopy.find('p').text(this.description);
    $divCopy.attr('id', this.title);
    $divCopy.attr('class', this.keyword);

    $('main').append($divCopy);

};




function renderDropdown() {
    // $('select').append('<option>filterByKeyword</option>');
    console.log(HornsPicture.allHornsPics);
    HornsPicture.allHornsPics.forEach(value => {
        console.log('test');
        if ($(`select:contains(${value.keyword})`).length === 0) {
            console.log($(`select:contains(${value.keyword})`).length);
            $('select').append(`<option>${value.keyword}</option>`);
        }
    });
}
// $.ajax('data/page-1.json').then(callbackFunction);
$.ajax('data/page-1.json').then(buildPage(jsonArray));
$.ajax('data/page-2.json').then(callbackFunction2);

function callbackFunction(jsonArray) {

    console.log(jsonArray);

    // jsonArray.forEach(function (hornsObject) {
    //     new HornsPicture(hornsObject.description, hornsObject.horns, hornsObject.image_url, hornsObject.keyword, hornsObject.title);
    // });
    
    HornsPicture.allHornsPics.forEach(value => value.renderImages());
    // HornsPicture.allHornsPics.forEach(value => value.renderDropdown());
    // renderDropdown();
    renderDropdown();
}
buildPage(jsonArray);
// function callbackFunction2(jsonArray2) {

//     console.log(jsonArray2);

//     jsonArray2.forEach(function (hornsObject) {
//         new HornsPicture(hornsObject.description, hornsObject.horns, hornsObject.image_url, hornsObject.keyword, hornsObject.title);
//     });

//     HornsPicture.allHornsPics.forEach(value => value.renderImages());
//     // HornsPicture.allHornsPics.forEach(value => value.renderDropdown());
//     // renderDropdown();
//     renderDropdown();
}

$('select').on('change', function (event) {
    $('div').hide();
    console.log(event.target.value);
    $('div:contains(' + event.target.value + ')').show();
    console.log((event.target.value).typeOf);
});


console.log($('h1').text());

console.log($.ajax('data/page-1.json'));
