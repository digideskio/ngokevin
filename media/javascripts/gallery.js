// gallery.js - creates links to albums based on the album slugs defined in
// wok's markdown files, grabs album previews

// retrieve slugs to determine what directory albums are in
var album_slugs = document.getElementsByClass("album-slug");
var album_titles = document.getElementsByClass("album-title");

// create array of relative paths to albums
var album_dirs = new Array();
for (var index in album_slugs) {
    album_dirs.push("/images/gallery/" + album_slugs[index].innerHTML + "/");
}

// make request to index of album directories and add html to array
var album_htmls = new Array();
for (var index in album_dirs) {
    var request = makeHttpObject();
    request.open("GET", album_dirs[index], false);
    request.send(null);
    album_htmls.push(request.responseText);
}

// for each album, create an array of images within them to use as previews
var image_preview_arrays = new Array();
var image_regex = /href="(.*.(jpg|png))"/gi;
for (var index in album_htmls) {
    var images = new Array();
    while (match = image_regex.exec(album_htmls[index])) {
        var a = document.createElement("a");
        a.href = album_slugs[index].innerHTML;

        var img = document.createElement("img");
        img.src = album_dirs[index] + match[1];

        a.appendChild(img);
        images.push(a);
    }
    image_preview_arrays.push(images);
}

var gallery = document.getElementById("gallery");
for (var index in image_preview_arrays) {

    // make a new row every four albums
    if (index % 4 == 0) {
        var row = document.createElement("div");
        row.className = "row";
        gallery.appendChild(row);
    }

    // create a div for the album to separate it
    var div = document.createElement("div");
    div.id = "album-preview";
    div.className = "span4";
    div.appendChild(image_preview_arrays[index][0]);
    row.appendChild(div);
}

