'use restrict';
document.getElementById("loginbtn").addEventListener("click", function () {
  document.getElementById("shopsection").style.display = "none";
  fetch("login.html")
    .then((response) => response.text())
    .then((data) => {
      const htmldoc = new DOMParser().parseFromString(data, 'text/html');
      document.getElementById("logincontainer").innerHTML = ""; // reset
      document.getElementById("logincontainer").appendChild(htmldoc.getElementById('login'));
      attachLoginSubmitListener();

      document.querySelector(".togglesign").addEventListener('click', function () {
        fetch("login.html")
          .then((res) => res.text())
          .then((html) => {
            const parsed = new DOMParser().parseFromString(html, 'text/html');
            document.getElementById("logincontainer").innerHTML = "";
            document.getElementById("logincontainer").appendChild(parsed.getElementById('signup'));
            attachSignupSubmitListener();

            document.querySelector(".togglesign").addEventListener('click', function () {
              fetch("login.html")
                .then((res2) => res2.text())
                .then((html2) => {
                  const parsed2 = new DOMParser().parseFromString(html2, 'text/html');
                  document.getElementById("logincontainer").innerHTML = "";
                  document.getElementById("logincontainer").appendChild(parsed2.getElementById('login'));
                  attachLoginSubmitListener();
                });
            });
          });
      });
    })
    .catch((error) => {
      console.error("error loading form", error);
    });
});

document.getElementById('shopnowbtn').addEventListener('click', function(e) {
  e.preventDefault();  
  const targetSection = document.getElementById('collections');
  
  if (window.getComputedStyle(targetSection).display === 'none') {
    alert("login please");
  } else {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});

function closebtn() {
  document.getElementById("logincontainer").innerHTML = "";
  document.getElementById("shopsection").style.display = "block";
}

//localstorage me jama kro
function attachSignupSubmitListener() {
  const signupForm = document.querySelector("#signup2 form");
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful! Please login.");
  });
}

function attachLoginSubmitListener() {
  const loginForm = document.querySelector("#login1 form");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("semail").value.trim();
    const password = document.getElementById("spassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      document.getElementById("contlog").innerHTML = `<a id="callbtn" href="#"><img src="./images/call.png" alt=""></a>
        <a id="wishlistbtn" href="wishlist.html"><img src="./images/wishlist.png" alt=""></a>
        <a id="cartbtn" href="cart.html"><img src="./images/cart.png" alt=""></a>
        <a id="personbtn" href="#"><img src="./images/person.png" alt=""></a>
        <a id="loginbtn" href="#"><img src="./images/login.png" alt=""></a>`;
      document.getElementById("logincontainer").innerHTML = "";
      document.getElementById('collections').style.display="block";
      document.getElementById("shopsection").style.display = "block";
    } else {
      alert("Invalid email or password.");
    }
  });
}

//collection ka js
document.querySelectorAll("#menu>ul>li").forEach(li => li.addEventListener('click', function () {
  document.querySelectorAll("#menu>ul>li").forEach(el => {
    el.style.backgroundColor = 'white';
    el.style.color = 'black';
    el.style.border = '1px solid lightgrey';
  });
  this.style.backgroundColor = 'rgb(38, 141, 224)';
  this.style.color = "white";
  this.style.border = 'none';
}));

//WISHLISEIT //notworking
document.querySelectorAll('.wishbtn').forEach(wisbtn => {
  wisbtn.addEventListener('click', function () {
    const productHTML = this.closest(".shoes").outerHTML;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.includes(productHTML)) {
      wishlist.push(productHTML);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert("Added to Wishlist!");
      const newwish = document.createElement('div');
      newwish.className = 'wishes';
      newwish.innerHTML = productHTML;
      document.querySelector('.wisheslist').appendChild(newwish);
    } else {
      alert("Already in Wishlist!");
    }
  });
});

//cart ka js
const addcarteBtn = document.getElementById('addcartbtn');
