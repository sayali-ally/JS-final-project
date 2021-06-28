var productList = window.localStorage.getItem('product-list');

productList = productList === null || productList === '' ? [] : productList;

productList = productList.length > 0 ? JSON.parse(productList) : [];
var totalCount = 0;

var totalAmount = 0;


for(var i=0; i<productList.length; i++) {
    var products = document.getElementById('product-list');
    var cardItem = document.createElement('div');
    cardItem.className = "card-item";
    
    
    var imageDiv = document.createElement('div');
    
    var image = document.createElement('img');
    
    image.src = productList[i].preview;
    
    image.class = "card-item-image"
    
    imageDiv.appendChild(image);
    
    cardItem.appendChild(imageDiv);
    
    var contentDiv = document.createElement('div');
    contentDiv.className = "card-item-content";
    
    var heading = document.createElement('h4');
    
    var itemCount = document.createElement('p');
    
    var subAmount = document.createElement('h3');
    
    heading.innerHTML = productList[i].name;
    
    itemCount.innerHTML = "x"+productList[i].count;
    
    subAmount.innerHTML = `Amount: ${productList[i].count*productList[i].price}`;
    
    contentDiv.appendChild(heading);
    
    contentDiv.appendChild(itemCount);
    
    contentDiv.appendChild(subAmount);
    
    cardItem.appendChild(contentDiv);
    
    products.appendChild(cardItem);
    
    totalCount = totalCount + productList[i].count;
    
    totalAmount = totalAmount + productList[i].count*productList[i].price;
}

$('#cart-total').html(totalCount);
$('#total-items').html(productList.length);
$('#total-amount').html(totalAmount);
$('#place-order').click(()=>{
    window.localStorage.removeItem('product-list');
    window.location.href = './order_confirmation.html';
})
