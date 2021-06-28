var url = new URL(window.location.href);
var product_id = url.searchParams.get("p");
var currentObj = null
fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${product_id}`).then(res => res.json()).then(productData => {
    currentObj = productData;
    var main_image = document.getElementById("main-image");
    main_image.src = productData.photos[0];
    var product_name = document.getElementById("product-name");
    product_name.textContent = productData.name;
    var product_brand = document.getElementById("product-brand");
    product_brand.textContent = productData.brand;
    var price_color = document.getElementById("price-color");
    price_color.textContent = productData.price;
    var product_description = document.getElementById("product-description");
    product_description.textContent = productData.description;
    var product_images = document.getElementsByClassName("product-images");
    var product_images = product_images[0];
    for (var i = 0; i < productData.photos.length; i++) {
    var image_div = document.createElement("img");
    image_div.src = productData.photos[i];
    image_div.id = "product-image-" + i;
    image_div.className = "clickable";
    image_div.onclick = imgClick;
    product_images.appendChild(image_div);
    }
    function imgClick() {
        imgClicked = document.getElementById(this.id);
        clickable_images = document.getElementsByClassName("clickable");
        for(var img of clickable_images){
            img.classList.remove("clicked");
        }
        imgClicked.classList.add("clicked");
        main_image.src = imgClicked.src;
    }
});
var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];
var totalCount = 0;
for(var i=0; i<productList.length; i++) {
    totalCount = totalCount + productList[i].count;
}
$('#cart-total').html(totalCount);

$("#add-to-cart").click(function() {
    $('#add-to-cart').addClass('bigger');
    setTimeout(function() {
        $('#add-to-cart').removeClass('bigger');
    }, 200)

    

    console.log(productList);

    var foundAtPos = -1;
    for(var i=0; i < productList.length; i++) {
        if(parseInt(productList[i].id) == parseInt(currentObj.id)) {
            foundAtPos = i;
        }
    }

    if(foundAtPos > -1) {
        productList[foundAtPos].count = productList[foundAtPos].count + 1;
        console.log(productList[foundAtPos].count);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    } else {
        currentObj.count = 1;
        productList.push(currentObj);
        console.log(productList);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    }
    var totalCount = 0;
    for(var i=0; i<productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }
    $('#cart-total').html(totalCount);
});