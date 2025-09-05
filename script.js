// Daftar 10 produk dengan deskripsi
const products = [
  {id:1, name:"Sepatu adidas Brmd", price:1700000, img:"https://www.adidas.co.id/media/catalog/product/j/s/js3974_6_footwear_photography_front20lateral20top20view_grey.jpg", desc:"Jalani kehidupan ala pulau dengan sepatu yang menangkap tampilan dan nuansa era 80-an."},
  {id:2, name:"Sepatu Samba Jp", price:2200000, img:"https://www.adidas.co.id/media/catalog/product/j/q/jq9056_6_footwear_photography_front20lateral20top20view_grey.jpg", desc:"Sneakers putih simpel cocok untuk outfit casual sehari-hari."},
  {id:3, name:"Sepatu Samba Arsenal", price:1900000, img:"https://www.adidas.co.id/media/catalog/product/j/q/jq4037_6_footwear_photography_front20lateral20top20view_grey.jpg", desc:"Sepatu bola klasik yang diciptakan untuk fans Arsenal."},
  {id:4, name:"Sepatu Samba OG", price:2200000, img:"https://www.adidas.co.id/media/catalog/product/b/7/b75806_flt_ecom.jpg", desc:"Tampilan dan sensasi klasik dari Samba yang autentik."},
  {id:5, name:"Sepatu Samba FC Bayern", price:1900000, img:"https://www.adidas.co.id/media/catalog/product/j/q/jq4039_6_footwear_photography_front20lateral20top20view_grey.jpg", desc:"Sepatu bola adidas klasik yang diciptakan untuk penggemar FC Bayern."},
  {id:6, name:"SEPATU ADIDAS MUNCHEN EDGE ", price:4000000, img:"https://bimg.akulaku.net/goods/spu/86aa63b967ad4da19432c054dbbc99d81178.jpg", desc:"Sneakers retro gaya 90an yang sedang tren kembali."},
  {id:7, name:"Sepatu Adidas Dublin City Series", price:3250000, img:"https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/21/f199ba02-35dc-436d-ab26-49313abf3009.png", desc:" sepatu kets ikonik yang dirilis pada tahun 1976 sebagai bagian dari koleksi City Series yang terinspirasi dari kota-kota di Eropa. "},
  {id:8, name:"Adidas Manchester Spezial C.P. Company ", price:5500000, img:"https://senikersku.com/wp-content/uploads/2024/12/IH3312-2.png", desc:"Adidas Manchester Spezial C.P. Company Light Blue adalah bagian dari kolaborasi istimewa antara adidas dan C.P. Company untuk merayakan 10 tahun adidas Spezial.."},
  {id:9, name:"Adidas City Series Malmo ", price:3000000, img:"https://images.tokopedia.net/img/cache/700/VqbcmM/2024/7/20/87f51b58-c7e2-42ae-b587-fa4d3a7f6c05.png", desc:"meluncurkan Malmo pada tahun 70-an sebagai bagian dari paket City Series yang ikonis. Minimalis dan retro dengan sentuhan teras, siluetnya ditampilkan dalam warna-warna yang terinspirasi oleh kota Swedia ."},
  {id:10, name:"Sepatu Gazelle", price:1700000, img:"https://www.adidas.co.id/media/catalog/product/j/h/jh7219_6_footwear_photography_front20lateral20top20view_grey.jpg", desc:"Sejak tahun 1991, sepatu adidas Gazelle telah dikenal dengan desain sepanjang masa yang serbaguna. Upper berbahan suede pigskin menghasilkan tampilan dan sensasi premium, dan outsole dari bahan karet menawarkan traksi yang awet untuk membuatmu tetap fokus.."}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update jumlah keranjang
function updateCartCount(){
  document.querySelectorAll("#cartCount").forEach(el=>{
    el.textContent = cart.reduce((a,b)=>a+b.qty,0);
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render produk di products.html
if(document.getElementById("productList")){
  const container = document.getElementById("productList");
  products.forEach(p=>{
    const div = document.createElement("div");
    div.className="product-card";
    div.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p><strong>Rp${p.price.toLocaleString()}</strong></p>
      <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
    `;
    container.appendChild(div);
  });
}

// Tambah produk ke keranjang
function addToCart(id){
  const item = cart.find(i=>i.id===id);
  if(item){
    item.qty++;
  } else {
    const prod = products.find(p=>p.id===id);
    cart.push({...prod, qty:1});
  }
  updateCart();
  alert("Produk ditambahkan ke keranjang!");
}

// Ubah jumlah produk (+ / -)
function changeQty(id, delta){
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    cart = cart.filter(i=>i.id!==id);
  }
  updateCart();
}

// Render isi keranjang di checkout.html
function updateCart(){
  updateCartCount();
  if(document.getElementById("checkoutList")){
    const list = document.getElementById("checkoutList");
    list.innerHTML = "";
    let total = 0;
    cart.forEach(item=>{
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong> <br>
        Rp${item.price.toLocaleString()} x 
        <button onclick="changeQty(${item.id},-1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id},1)">+</button>
        = Rp${(item.price*item.qty).toLocaleString()}
      `;
      list.appendChild(li);
      total += item.price*item.qty;
    });
    document.getElementById("checkoutTotal").textContent = "Rp"+total.toLocaleString();
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

updateCart();

function updateCart(){
  updateCartCount();
  if(document.getElementById("checkoutList")){
    const list = document.getElementById("checkoutList");
    list.innerHTML = "";
    let subtotal = 0;
    cart.forEach(item=>{
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <strong>${item.name}</strong><br>
        Rp${item.price.toLocaleString()} x 
        <button onclick="changeQty(${item.id},-1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id},1)">+</button>
        = Rp${(item.price*item.qty).toLocaleString()}
      `;
      list.appendChild(li);
      subtotal += item.price*item.qty;
    });
    document.getElementById("checkoutSubtotal").textContent = "Rp"+subtotal.toLocaleString();
    const shipping = 20000;
    document.getElementById("checkoutTotal").textContent = "Rp"+(subtotal+shipping).toLocaleString();
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Simulasi submit form
document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("orderForm");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      alert("Pesanan berhasil diproses! Terima kasih sudah belanja 😊");
      localStorage.removeItem("cart");
      cart = [];
      updateCart();
      form.reset();
    });
  }
});

function updateCart(){
  updateCartCount();
  if(document.getElementById("checkoutList")){
    const list = document.getElementById("checkoutList");
    list.innerHTML = "";
    let subtotal = 0;
    cart.forEach(item=>{
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}" style="width:50px;vertical-align:middle;">
        <strong>${item.name}</strong><br>
        Rp${item.price.toLocaleString()} x 
        <button onclick="changeQty(${item.id},-1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id},1)">+</button>
        = Rp${(item.price*item.qty).toLocaleString()}
      `;
      list.appendChild(li);
      subtotal += item.price*item.qty;
    });
    document.getElementById("checkoutSubtotal").textContent = "Rp"+subtotal.toLocaleString();
    const shipping = cart.length > 0 ? 20000 : 0;
    document.getElementById("checkoutShipping").textContent = "Rp"+shipping.toLocaleString();
    document.getElementById("checkoutTotal").textContent = "Rp"+(subtotal+shipping).toLocaleString();
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Proses checkout
document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("orderForm");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();

      if(cart.length === 0){
        alert("Keranjang masih kosong!");
        return;
      }

      const nama = document.getElementById("nama").value;
      const email = document.getElementById("email").value;
      const telepon = document.getElementById("telepon").value;
      const alamat = document.getElementById("alamat").value;
      const pembayaran = document.querySelector("input[name='pembayaran']:checked").value;

      // Simpan pesanan (contoh sederhana)
      const order = {
        nama,email,telepon,alamat,pembayaran,
        cart, total: document.getElementById("checkoutTotal").textContent
      };
      console.log("Pesanan masuk:", order);

      alert("Terima kasih, "+nama+"! Pesanan kamu sudah diproses.\nMetode Pembayaran: "+pembayaran);
      
      // Reset
      localStorage.removeItem("cart");
      cart = [];
      updateCart();
      form.reset();
    });
  }
});
