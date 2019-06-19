// Bread Crumbs

var breadCrumbLinks = $(".breadCrumbs").find("a");

breadCrumbLinks.each(function(i, el) {
  var chevron = $('<i class="fas fa-chevron-down"></i>');
  if (i !== breadCrumbLinks.length - 1) {
    $(el).append(chevron);
  } else {
    $(el).replaceWith("<p>" + $(el).text() + "</p>");
  }
});

// Main Img

var mainImage = $(".imageWrapper img");

var currentImage = 0;

var altImagesContainer = $(".imagesWrap"),
  allImages = altImagesContainer.find("img"),
  imagesCount = allImages.length;

allImages.each(function(i, el) {
  $(el).data("position", i);
  $(el).on("click", function() {
    console.log("test");
    var position = $(this).data("position");
    updateSlider($(this).data("position"));
  });
});

var altCount = $(".altCount");

altCount.text(currentImage + 1 + " of " + imagesCount);

$(altImagesContainer).draggable({
  axis: "x",
  containment: [imagesCount * -93, 0, 20, 0],
  drag: function(event, ui) {
    var oldValue = 0;
    currentImage = Math.ceil(ui.position.left / -110);
    if (currentImage != oldValue) {
      updateMainImage(currentImage);
      oldValue = currentImage;
    }
    altCount.text(currentImage + 1 + " of " + imagesCount);
  }
});

altImagesContainer.css("--n", imagesCount);

var listOfShoes = [
  "./assets/img/mainShoe.jpg",
  "./assets/img/mainShoe.jpg",
  "./assets/img/secondShoe.jpg",
  "./assets/img/mainShoe.jpg",
  "./assets/img/secondShoe.jpg",
  "./assets/img/mainShoe.jpg",
  "./assets/img/secondShoe.jpg",
  "./assets/img/mainShoe.jpg",
  "./assets/img/secondShoe.jpg",
  "./assets/img/mainShoe.jpg"
];

function updateMainImage(newImage) {
  mainImage.attr("src", listOfShoes[newImage]);
}

function updateSlider(position) {
  altImagesContainer.css("left", position * -101);
  altCount.text(position + 1 + " of " + imagesCount);
  updateMainImage(position);
}

// Price

var price = "30.00";

var formattedPrice = price.split(".");

$(".price h2").text("$" + formattedPrice[0]);
$(".price span").text(formattedPrice[1]);
