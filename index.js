let itemsContainer1 = document.getElementById("clothing-container");
let itemsContainer2 = document.getElementById("accessories-container");
fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
.then(res => res.json())
.then((productList)=>{
    for(let product of productList){
        let item = document.createElement("div");
        item.className = "item";
        let itemLink = document.createElement("a");
        itemLink.href = `/product/details.html?p=${product.id}`;
        let itemImage = document.createElement("div");
        itemImage.className = "item-image";
        let image = document.createElement("img");
        image.src = product.preview;
        let itemContent = document.createElement("div");
        itemContent.className = "item-content"
        let itemHeading = document.createElement("h3");
        itemHeading.className = "item-heading";
        itemHeading.textContent = product.name;
        let itemBrand = document.createElement("h4");
        itemBrand.className = "item-brand";
        itemBrand.textContent = product.brand;
        let itemPrice = document.createElement("h3");
        itemPrice.className = "item-price";
        itemPrice.textContent = product.price;
        itemImage.appendChild(image);
        itemLink.appendChild(itemImage);
        item.appendChild(itemLink);
        itemContent.appendChild(itemHeading);
        itemContent.appendChild(itemBrand);
        itemContent.appendChild(itemPrice);
        item.appendChild(itemContent);
        if(product.isAccessory){
            itemsContainer2.appendChild(item)
        }
        else{
            
            itemsContainer1.appendChild(item);
        }
    }
});
$('.carousel').carousel({
    interval: 2000,
    pause: true
});
var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];
var totalCount = 0;
for(var i=0; i<productList.length; i++) {
    totalCount = totalCount + productList[i].count;
}
$('#cart-total').html(totalCount);