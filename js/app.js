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

function renderWithMustache() {
    HornsPicture.allHornsPics.forEach(value => {
        const divHtmlElement = $('#template').html();
        const outputFromMustache = Mustache.render(divHtmlElement, value);

        $('main').append(outputFromMustache);
    });
}

function renderDropdown() {

    console.log(HornsPicture.allHornsPics);
    if ($('select:contains(Filter by Keyword)').length === 0) {
    $('select').append(`<option value = "template">Filter by Keyword</option>`);
    console.log($('option'));
    }

    $('select').append(`<option value = "template">Filter by Keyword</option>`);

    HornsPicture.allHornsPics.forEach(value => {
        if ($(`select:contains(${value.keyword})`).length === 0) {
            $('select').append(`<option value = "${value.keyword}">${value.keyword}</option>`);
        }
    });
}

function buildPage(arr) {
    arr.forEach(value => {
        new HornsPicture(value.description, value.horns, value.url, value.keyword, value.title);
    });
    renderWithMustache();
    renderDropdown();
}

$.ajax('data/page-1.json').then(callbackFunction);
$.ajax('data/page-2.json').then(callbackFunction2);

function callbackFunction(jsonArray) {

    jsonArray.forEach(value => pageOneArray.push(value));
    buildPage(pageOneArray);
}

function callbackFunction2(jsonArray) {
    jsonArray.forEach(value => pageTwoArray.push(value));
}

$('#page-1').on('click', function () {
    $('div').remove();
    HornsPicture.allHornsPics = [];
    $('select').empty();
    buildPage(pageOneArray);
});
$('#page-2').on('click', function () {
    $('div').remove();
    HornsPicture.allHornsPics = [];
    $('select').empty();
    buildPage(pageTwoArray);
});

$('select').on('change', function (event) {
    $('div').hide();
    $('div:contains(' + event.target.value + ')').show();
});

const sortFunction = (arr) => {
    arr.sort((a, b) => {
        if (a.horns > b.horns) {
            return 1;
        } else if (a.horns < b.horns) {
            return -1;
        } else {
            return 0;
        }
    });
    $('div').remove();
    HornsPicture.allHornsPics = [];
    buildPage(arr);
    return arr;
};

$('#sort').on('click', function () {
    sortFunction(HornsPicture.allHornsPics);
});
