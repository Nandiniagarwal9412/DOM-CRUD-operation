const createBtn=document.querySelector("#create");
const formDiv=document.querySelector(".form");
const overlay=document.querySelector(".overlay");
const cross=document.querySelector(".top");
const form=document.querySelector("form");
const productDiv=document.querySelector(".products");
const submitButton=document.querySelector("#function");
const productsArr=[];
let updateIndex=null;
let ui=()=>{
    productDiv.innerHTML="";
    productsArr.forEach((elem,index)=>{
    productDiv.innerHTML+=`
    <div class="product-card">
            <div class="img">
                <img src="${elem.imageUrl}" alt="">
            </div>
            <div class="text">
                <h3>${elem.productName}</h3>
                <p>${elem.productDescription}</p>
                <p>${elem.productPrice}</p>
            </div>
            <div class="btns">
                <button onclick="updateProduct('${elem.productName}')">Update</button>
                <button onclick="deleteProduct('${index}')">Delete </button>
            </div>
        </div>`
    })
}
let deleteProduct=(index)=>{
productsArr.splice(index,1);
ui();
}
let updateProduct=(name)=>{
    formDiv.style.display = "block";
    submitButton.textContent="Update";
    let product=productsArr.find((elem)=>elem.productName==name);
    updateIndex=productsArr.findIndex((elem)=>elem.productName==name);
    console.log(updateIndex);
    form[0].value=product.productName;
    form[1].value=product.productDescription;
    form[2].value=product.productPrice;
    form[3].value=product.imageUrl;
}
createBtn.addEventListener("click", () => {
    formDiv.style.display = "block";
    overlay.style.display = "block";
});
cross.addEventListener("click", () => {
    formDiv.style.display = "none";
    overlay.style.display = "none";
});
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let productName=event.target[0].value;
    let productDescription=event.target[1].value;
    let productPrice=event.target[2].value;
    let imageUrl=event.target[3].value;
    if(productName.trim()===""||productDescription.trim()===""||productPrice.trim()===""||imageUrl==="") {
        alert("Please fill all the fields");
        return;
    }
    let obj={
        productName,
        productDescription,
        productPrice,
        imageUrl
    }
    if(updateIndex!=null){
     productsArr[updateIndex]=obj;
     updateIndex=null;
    }else{
     productsArr.push(obj);
    }
    ui();
    form.reset();
    formDiv.style.display = "none";
    overlay.style.display = "none";
});