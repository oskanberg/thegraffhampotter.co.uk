var listingSection;
var API_URL = '/api/v1/listings';
var numElements = 0;

function createNewListing(etsyURL, title, description, imageURL) {
    // if even number, must need a new row (2 per row)
    if (numElements % 2 === 0) {
        currentRow = document.createElement('div');
        currentRow.className = 'row';
        listingSection.appendChild(currentRow);
    }
    var newItem = '<div class="6u 12u(narrower)"><section><a href="' + etsyURL + '" class="image featured"><img src="' +
        imageURL + '" alt="" /></a><header><h3>' + title + '</h3></header><p>' + description + '</p></section></div>';
    currentRow.innerHTML += newItem;
    numElements++;
}

function loadItems(start, end) {
    var url = API_URL + "?start=" + start + "&end=" + end;
    getJSON(url, function(listings) {
        var l;
        for (var i = 0; i < listings.length; i++) {
            l = listings[i];
            if (l !== null) {
                createNewListing(l.Url, l.Title, l.Description, l.Images[0].Url_570xN, l.Images[0].Url_570xN);
            }
        }
    });
}

function loadNListings(n) {
    loadItems(numElements, numElements + n);
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(xhr.response);
        }
    };
    xhr.send();
}
