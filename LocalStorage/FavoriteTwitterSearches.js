var tags;

function loadSearches() {
    if (!sessionStorage.getItem("herePreviousLy")) {
        sessionStorage.setItem("herePreviously", "true");
        document.getElementById("welcomeMessage").innerHTML = "Welcome to the Favorite Twitter Searches App";
    }

    var length = localStorage.length;
    tags = [];

    for (var i = 0; i < length; ++i) {
        tags[i] = localStorage.key(i);
    }

    tags.sort();

    var markup = "<url>";
    var url = "http://search.twitter.com/search?q=";

    for (var tag in tags) {
        var query = url + localStorage.getItem(tags[tag]);
        markup += "<li><span><a href = '" + query + "'>" + tags[tag] +
            "</a></span>" +
            "<input id = '" + tags[tag] + "type = 'button'" +
            "value = 'Delete' onclick = 'deleteTag(id)'>";
    }

    markup += "</url>";
    document.getElementById("searches").innerHTML = markup;
}

function clearAllSearches() {
    localStorage.clear();
    loadSearches();
}

function saveSearch() {
    var query = document.getElementById("query");
    var tag = document.getElementById("tag");
    localStorage.setItem(tag.value, query.value);
    tag.value = "";
    query.value = "";
    loadSearches();
}

function deleteTag(tag) {
    localStorage.removeItem(tag);
    loadSearches();
}

function editTag(tag) {
    document.getElementById("query").value = localStorage[tag];
    document.getElementById("tag").tag = tag;
    loadSearches();
}

function start() {
    var saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", saveSearch, false);
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clearAllSearches, false);
    loadSearches();
}

window.addEventListener("load", start, false);
